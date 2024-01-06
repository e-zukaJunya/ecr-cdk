import * as cdk from 'aws-cdk-lib'
import 'source-map-support/register'
import * as consts from '../common/constants'
import * as utils from '../common/utils'
import { MainStack } from '../lib/build-stack'

const app = new cdk.App()
// contextからステージ名を取得(デフォルトdev)
const stage: string = app.node.tryGetContext('stage') ?? 'dev'
const context = utils.getStageContext(stage)

// 命名メソッド
const createResourceNameWithoutRp = utils.createResourceNameWithoutRp(consts.sysName)(stage)

// テスト サーバーサイド
const mainStack = new MainStack(app, createResourceNameWithoutRp('ecr'), {
    stage,
    context,
})

// リソースまとめてタグ付け
const stacks = [mainStack]
stacks.forEach((stack) => {
    cdk.Tags.of(stack).add('sysName', consts.sysName)
    cdk.Tags.of(stack).add('stage', stage)
})
