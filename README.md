# 自動化(CI/CD) テンプレート

CI/CDに使用するCodeBuildなどの一式をデプロイするCDK。

## Overview

Formatter は prettier, Linter は eslint。

### 作成されるCodeBuildプロジェクトの種類

- フロントエンド 自動ビルド＆デプロイ
  - AWS環境ごとに1つ
- サーバーサイド アプリ 自動テスト
  - dev環境のみ
- サーバーサイド アプリ 自動ビルド
  - dev環境のみ
- CDK 全ての自動デプロイ
  - AWS環境ごとに1つ
- CDK アプリ関連スタックのみ自動デプロイ
  - AWS環境ごとに1つ

## Requirements

- Node >= v.18
- Yarn = 1.22.19

## Usage

### ライブラリのインストール

```sh
yarn
```

### Deployment

既存への更新の場合

```sh
yarn cdk deploy {your stack name} --context stage={stage} --profile {your profile}
# ex
yarn cdk deploy jmas-automation-stg-auto-deployment-frontend --stage stage=stg --profile prj-dev
# ステージ指定が無ければデフォルトはdev
```

env.yamlを経由した追加の環境変数はこのテンプレのままであれば特に何も不要。

**新アカウント・新リージョンへの初回デプロイ時は以下の手順が必要！！！**

1. build-stack.tsの「トリガー設定」とコメントが入っている、CodeBuildのProjectのsourceという項目の設定のところを丸ごとコメントアウト。
   1. ![Comment out](./Readme/comment-out-trigger-settings.PNG)
2. デプロイのコマンド実行。
3. AWSコンソールから、どれでもいいので作成したビルドプロジェクトのソース編集画面へ行き、GitHubリポジトリのOAuthサインインを行う。
4. AWSコンソールでの操作後、GitHubの画面へ行き、自分自身のユーザー設定画面のIntegrationのApplicationのページを開き、Authorized OAuth Appsのタブを開く。
   1. https://github.com/settings/applications
5. 作業中のリージョンのCodeBuildの登録が以下のような感じで来ているはず。
   1. ![Application list](./Readme/app-list.PNG)
6. その名前のリンクを押すと、詳細が開くので、Organization accessのところで今回アクセスしたいorganizationである"wwc-project"のGrantボタンを押す。（下記キャプチャは既に押してしまったのでチェックがついているが、まだ押してないと右側に"Grant"というボタンが出ているはず。）
   1. ![Grant](./Readme/grant.PNG)
7. 3で開いていたAWSコンソールのビルドプロジェクトのソース編集画面はキャンセルして閉じて良い。
8. 1でコメントアウトしたところを復活させて再度デプロイ

### その他メモ

- buildspecはassets以下のyaml群。
- CodeBuildの権限はassets/policy.jsonにて定義。
- 追加で入れたい環境変数があればenv.yamlに記載。
  - 例えばdockerhubへログインする際の情報。
  - 形式についてはTips参照。

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
yarn cdk deploy cf-stack-jmas-dev-auto-test-backend --profile jmas-dev

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

yarn cdk deploy --all --profile jmas-dev --require-approval never
yarn cdk deploy jmas-automation-stg-auto-deployment-frontend jmas-automation-stg-auto-deployment-cdk-app jmas-automation-stg-auto-deployment-cdk-all -c stage=stg --profile jmas-dev
```

### env.yamlで環境変数を追加する場合の形式

assets/env.yamlというファイルを作成し、以下の内容を記載する。

```yaml
# これが環境変数の名称となる
PARAM:
  # 値
  value: 平文
  # 環境変数としてそのまま載る場合はこの指定(secrets managerとマッピングすることも可能)
  type: PLAINTEXT
```
