# ECR CDK

ECRだけつくるCDK。

## Overview

Formatter は prettier, Linter は eslint。

以下のようなECRができる。

- 名前: {システム名}-{stage}-app
- 既存タグの上書き禁止
- 暗号化(KMSはAWSマネージド)
- ライフサイクルポリシー
  - タグが無くなったものは削除
  - 10000個より古いものは削除

## Requirements

- Node >= v.18
- Yarn = 1.22.19

## Usage

### ライブラリのインストール

```sh
yarn
```

### Deployment

```sh
yarn cdk deploy {your stack name} --context stage={stage} --profile {your profile}
# ex
yarn cdk deploy stg-hoge-stack --stage stage=stg --profile prj-dev
# ステージ指定が無ければデフォルトはdev
```

## Tips

### Commands

```sh
# dry run
yarn cdk diff --context stage={stage} --profile {your profile}
# 例
yarn cdk diff --context stage=stg --profile jmas-dev
# stage指定は無ければデフォルトdev
yarn cdk diff --profile jmas-dev

# 作成
# 全部
yarn cdk deploy --all --context stage={stage} --profile {your profile}
yarn cdk deploy --all --profile jmas-dev
# 特定スタック
yarn cdk deploy {your stack name} --context stage={stage} --profile {your profile}
yarn cdk deploy hoge-stack --profile jmas-dev

# 削除
yarn cdk destroy --all --context stage={stage} --profile {your profile}
yarn cdk destroy --all --context --profile jmas-dev

# 確認無し
yarn cdk deploy {your stack name} --context stage={stage} --profile {your profile} --require-approval never
yarn cdk destroy {your stack name} --context stage={stage} --profile {your profile} --force
yarn cdk deploy --all --profile jmas-dev --require-approval never

# format
yarn run format

# lint
yarn run lint

```
