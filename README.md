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
yarn cdk deploy --context stage={stage} --profile {your profile}
# e.g.
yarn cdk deploy stg-hoge-stack --stage stage=stg --profile prj-dev
# ステージ指定が無ければデフォルトはdev
```

## Tips
