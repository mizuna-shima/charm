# Charm.js
このページの解説は本サイトをベースにしています。  
より詳細な情報を入手するには本サイトにアクセスしてください。  
https://lanama.net/scripts/charm/


# Outline

## Charm.jsとは
Charm.jsは、名前変換小説サイト向けの名前変換スクリプト（JavaScript）です。  
JavaScriptがわからなくてもHTMLがわかれば少しのコードで導入することができます。  
名前変換小説、単語変換小説、夢小説などにどうぞ。

## Charm.jsの特徴
- JavaScriptファイルを読み込んで、変換したいテキストを特定のタグで囲むだけで使用可能
- 未登録時の名前をhtml側でページ毎に設定して使用
- スクリプトがhtmlから独立しているので管理が容易
- 他ライブラリやサーバーサイドに依存しないので、Charm.jsのみで使用可能（jQueryやPHPを用意しなくてOK）
- スクリプトファイルは軽め（14KBくらい）
- スマホでアクセスしても動く（例外はあるかも）
- CookieではなくLocalStorageまたはSessionStorageに保存

## カスタムを含む名前変換例・機能
- JavaScriptを修正しなくても、HTMLのタグを増やせば登録内容は追加可能
- カタカナ変換　（ひらがなで登録した名前をカタカナで表示可能）
- 省略表現　例：なまえ、という登録で「なーちゃん」など
- 詰まり表現　例：な、な、なまえ
- 区切り表現　例：な……ま……え
- 区切りの文字はタグの書き方次第でカスタム可能　例：な！ま！え！、なーまーえ
- 響き表現　例：……え……まえ
- 母音のばし　例：みょうじいいい、みょうじぃ
- classカスタム　従来のdata属性によるカスタム指定に加え、class属性を用いた指定が可能
- 一般的な登録ボタンと一時登録ボタン（ブラウザやタブを閉じると登録内容を自動削除することが可能）を選べる
- ブラウザ設定により登録できなくても登録フォームのあるページでは変換可能（v2.3～）

## Charm.jsで出来ないこと・ご注意
- InternetExplorer等の一部の環境では動作しません
- タグ打ちとファイルアップロードが必要なので、これらに関する知識は必要です
- サーバにアップロードしないで動作確認をすると、一部の機能は動きません
- 50文字を超える単語の登録（変更は可能ですがJSの修正が必要です）
- 日本語以外の名前変換はカスタムに対応していません

  
# ご利用条件
  
ライセンス（利用条件等を書いたもの）を確認し、同意できる方のみご利用ください。  
日本語版も英語版も内容は同じです。お好きな方をご確認ください。  
[ライセンス](LICENSE.txt)


# Charm.jsを使った名前変換ページ作成の基本

## charm.jsをダウンロード
このリポジトリから、名前変換スクリプトcharm.jsをダウンロード  
zipでダウンロードし、解凍してからサーバーにアップロード

## 名前登録ページでスクリプト本体を読み込み、指定のタグを入れる
```html
<!-- スクリプト読み込み -->
<script src="charm.js"></script>
```
```html
<!-- 名前入力フォーム -->
苗字 <input type="text" id="charmname1" class="charm">
みょうじ <input type="text" id="charmname2" class="charm">
名前 <input type="text" id="charmname3" class="charm">
なまえ <input type="text" id="charmname4" class="charm">

<!-- 登録ボタンと削除ボタン -->
<button type="button" id="charmset">登録</button>
<button type="button" id="charmsession">一時登録</button>
<button type="button" id="charmunset">削除</button>

<!-- 登録内容表示 -->
<span class="charmname1">苗字</span>
<span class="charmname2">みょうじ</span>
<span class="charmname3">名前</span>
<span class="charmname4">なまえ</span>
```
## 小説ページでスクリプト本体を読み込み、指定のタグを入れる

```html
<!-- スクリプト読み込み -->
<script src="charm.js"></script>
```
```html
<!-- 登録内容表示 -->
<span class="charmname1">苗字</span>
<span class="charmname2">みょうじ</span>
<span class="charmname3">名前</span>
<span class="charmname4">なまえ</span>
```
これで導入完了です。
詳しい解説は[Charm.jsをサイトに導入するための詳細手順](Tutorial.md)をご覧ください。

文字区切りや母音表示などの特殊な変換は [Charm.jsのカスタム変換](Custom.md) をご覧ください。

利用規約の不明点は [利用条件・その他のQ&A](FandA.md) をご覧ください。
