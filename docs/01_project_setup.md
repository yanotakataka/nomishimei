# チケット #01: プロジェクトセットアップと初期構築

## 概要
NomiShimeiアプリのExpo (React Native)プロジェクトの初期セットアップと基本構成の実装

## 要件
- Expo (React Native)プロジェクトの初期化
- iOS向けの設定
- 開発環境のセットアップ
- 基本的なプロジェクト構造の確立

## タスク

### 必須タスク
- [x] Expoプロジェクトの作成（完了済み）
- [x] TypeScriptの設定（完了済み）
- [x] ESLintとPrettierの設定
- [x] 基本ディレクトリ構造の作成
  - [x] `/src/components` - UIコンポーネント
  - [x] `/src/screens` - 画面コンポーネント
  - [x] `/src/utils` - ユーティリティ関数
  - [x] `/src/data` - お題データ
  - [x] `/src/types` - TypeScript型定義
  - [x] `/src/navigation` - ナビゲーション設定
- [x] React Navigationの導入と設定
- [x] 基本的なアプリケーション設定（app.json）
  - [x] アプリ名: NomiShimei
  - [x] iOS向けの設定
  - [x] アイコンとスプラッシュスクリーンの仮設定
- [x] 開発用スクリプトの設定（package.json）

### 技術選定
- [x] UIライブラリの選定（React Native Elementsを選択）
- [x] 状態管理ライブラリの選定（Context APIを選択）

## 完了条件
- Expoプロジェクトが正常に起動すること
- 基本的なナビゲーションが動作すること

## 依存関係
なし（最初のチケット）

## 見積もり工数
4時間

## 優先度
最高（ブロッカー）

## 備考
- クライアントサイド完結型のアーキテクチャのため、バックエンドの設定は不要
- 将来的なAndroid対応を考慮した設計にする