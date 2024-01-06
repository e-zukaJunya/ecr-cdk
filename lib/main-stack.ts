import * as cdk from 'aws-cdk-lib'
import { Duration } from 'aws-cdk-lib'
import * as ecr from 'aws-cdk-lib/aws-ecr'
import { Construct } from 'constructs'
import * as consts from '../common/constants'
import * as utils from '../common/utils'

export interface BuildStackProps extends cdk.StackProps {
    stage: string
    context: consts.StageContext
}

export class MainStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: BuildStackProps) {
        super(scope, id, props)

        const createRepoName = utils.createResourceNameWithoutRp(consts.sysName)(props.stage)

        // CDKでECRを定義
        const repository = new ecr.Repository(this, 'app-repo', {
            repositoryName: createRepoName('app'),
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            // 同一タグへの上書きを禁止
            imageTagMutability: ecr.TagMutability.IMMUTABLE,
            // 暗号化
            encryption: ecr.RepositoryEncryption.KMS,
            // ライフサイクルポリシーを定義
            lifecycleRules: [
                // タグ付けなしになったイメージをすぐに削除
                {
                    rulePriority: 1,
                    tagStatus: ecr.TagStatus.UNTAGGED,
                    // 1日以上経過したものに適用
                    maxImageAge: Duration.days(1),
                    description: 'delete untagged images',
                },
                // 10000個以上のイメージは削除
                {
                    rulePriority: 2,
                    maxImageCount: 10000,
                    description: 'delete images over 10000',
                },
            ],
        })
    }
}
