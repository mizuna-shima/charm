# Charm.jsのカスタム変換

charm.jsはdata指定またはclass指定で特殊な表現をすることができます。
カスタム変換をする場合、タグの中身はカスタム後のデフォルト名を入れておくことをおすすめします。
閲覧者さんが名前を登録しない場合はそのまま表示されます。

```
data指定とclass指定はどちらの方がいいの？
data指定の方が表現の自由度は高いです。

class指定の場合、詰まりや母音のばし等の数指定は一つのspanタグで9回まで、「…」等の記号変更も決められた記号から選ぶことになります。

「サイト環境の都合でdataは使えない」「data指定がうまくいかない」というサイトではclass指定でカスタムしていただき、どちらも使える場合はわかりやすい方を選んでもらえたらと思います。

スクリプトとしては（基本的には）同じページにdata指定とclass指定のタグが混在しても動作します。
```
このページでは導入手順の例1を用いて説明しますが、classで呼び出す名前を変えればお好きな登録項目を使うことができます。

```html
<span class="charmname1">苗字</span>
<span class="charmname2">みょうじ</span>
<span class="charmname3">名前</span>
<span class="charmname4">なまえ</span>
```


## ひらがな→カタカナ変換

ひらがなの登録のみで、カタカナ表記を使うことができます。  
サンプルコードでいうところの「なまえ」を「ナマエ」として表示するには、以下のコードを設定します。  

### data指定：data-charm-kana="on"
```html
<span class="charmname4" data-charm-kana="on">ナマエ</span>
```
### class指定：charm_kana
```html
<span class="charmname4 charm_kana">ナマエ</span>
```

## カタカナ→ひらがな変換

カタカナの登録のみで、ひらがな表記を使うことができます。  
カタカナで呼ぶことが多い場合は閲覧者さんにはカタカナで登録してもらい、特殊な場面でのみこのカスタムでひらがな表記をする、等にどうぞ。  

### data指定：data-charm-hira="on"
```html
<span class="charmname4" data-charm-hira="on">なまえ</span>
```
### class指定：charm_hira
```html
<span class="charmname4 charm_hira">なまえ</span>
```

## カタカナひらがなMix変換

カタカナ、ひらがなどちらでも登録しても、一文字ずつカタカナ、ひらがなで表示することができます。  
「ゃ」「ょ」のような小さい文字や長音符がある場合は前の文字に合わせて変換します。  
不慣れな言葉で話しているような雰囲気が出ます。

### data指定：data-charm-mix="on"
```html
<span class="charmname4" data-charm-mix="on">ナまエ</span>
```
### class指定：charm_mix
```html
<span class="charmname4 charm_mix">ナまエ</span>
```

## イニシャル変換

ひらがな、またはカタカナで登録した名前の頭文字からイニシャルを半角英字の大文字で表示します。  
英字の名前はそのまま頭文字の英字を大文字にします。  
日本語表記で最もポピュラーなヘボン式ローマ字表記のルールに近いですが、現代の和名であまり使われない\[ゐ゙→E]「ぢゃ→J」など、一部は違う動きをします。  
現代の50音表にある文字 + 拗音（小さい文字）なしの濁音と半濁音は対応しているので、たいていの和風の名前はカバーできます。  
ひらがな、カタカナ、英字以外の文字に大しては何も表示しなくなります

### data指定：data-charm-initial="on"
```html
<span class="charmname4" data-charm-initial="on">N</span>
```
### class指定：charm_initial
```html
<span class="charmname4 charm_initial">N</span>
```

## 省略表現

登録した名前をすべて表示させずに、頭文字一文字や二文字といった省略表示ができます。  
「ゃ」「ょ」のような小さい文字や長音符がある場合は指定の文字数より多く切り出します。  
切り出す文字数はお好きな数字で自由に設定できますが、登録した名前が短い場合は指定数よりも少なくなります。

### data指定：data-charm-short="●"

一文字なら「data-charm-short="1"」、二文字なら「data-charm-short="2"」を追加します。  
数字部分は切り出し文字数です。

```html
<span class="charmname4" data-charm-short="1">な</span>
```
```html
<span class="charmname4" data-charm-short="2">なま</span>
```

### class指定：charm_short

class指定で省略表示をする場合は何文字の場合でもまず「charm_short」を追加します。  
デフォルトでは一文字切り出します。  

#### class追加オプション：charm_count●

二文字以上を切り出す場合は更に「charm_count●」を追加します。  
二文字なら「charm_count2」、三文字なら「charm_count3」のように「charm_count〇」を追加します（最大はcharm_count9）。

```html
<span class="charmname4 charm_short">な</span>
```

```html
<span class="charmname4 charm_short charm_count2">なま</span>
```

[カタカナ変換](#ひらがなカタカナ変換)と組み合わせたり、複数並べることでニックネームのような表現ができます。  
下のコードはどちらも「ナーちゃん」と表示します。
```html
<span class="charmname4" data-charm-kana="on" data-charm-short="1">ナ</span>ーちゃん
```
```html
<span class="charmname4 charm_kana charm_short">ナ</span>ーちゃん
```

この下のコードはどちらも「なまなまさん」と表示します。
```html
<span class="charmname4" data-charm-short="2">なま</span><span class="charmname4" data-charm-short="2">なま</span>さん
```
```html
<span class="charmname4 charm_short charm_count2">なま</span><span class="charmname4 charm_short charm_count2">なま</span>さん
```



## 先頭文字スキップ表現

登録した名前をすべて表示させずに、先頭の文字をスキップした名前で表示することができます。  
先頭の文字の後に「ゃ」「ょ」のような小さい文字や長音符がある場合は、指定の文字数より後ろから始まります。  
一文字で登録されている場合は何も表示されません。

### data指定：data-charm-skip="on"

data指定の場合は「data-charm-skip="on"」を追加します。 

```html
<span class="charmname4" data-charm-skip="on">まえ</span>
```

### class指定：charm_skip

class指定では「charm_skip」を追加します。 

```html
<span class="charmname4 charm_skip">まえ</span>
```

[カタカナ変換](#ひらがなカタカナ変換)と組み合わせることもできます。    
下のコードはどちらも省略表現を並べて併用し、「ナ……マエ……」と表示します。
```html
<span class="charmname4" data-charm-short="1" data-charm-kana="on">ナ</span>……<span class="charmname4" data-charm-skip="on" data-charm-kana="on">マエ</span>……
```
```html
<span class="charmname4 charm_short charm_kana">ナ</span>……<span class="charmname4 charm_skip charm_kana">マエ</span>……
```


## 末尾カット表現

登録した名前をすべて表示させずに、末尾の文字をカットして表示することができます。
末尾の文字に「ゃ」「ょ」のような小さい文字や長音符がある場合は、指定の文字数よりも多くカットします。  
一文字で登録されている場合は何も表示されません。

### data指定：data-charm-chop="on"

data指定の場合は「data-charm-chop="on"」を追加します。 

```html
<span class="charmname4" data-charm-chop="on">なま</span>
```

### class指定：charm_chop

class指定では「charm_chop」を追加します。 

```html
<span class="charmname4 charm_chop">なま</span>
```

[カタカナ変換](#ひらがなカタカナ変換)と組み合わせることもできます。    
下のコードはどちらも省略表現を並べて併用し、「ナマ……エ……」と表示します。
```html
<span class="charmname4" data-charm-chop="on" data-charm-kana="on">ナマ</span>……<span class="charmname4" data-charm-last="on" data-charm-kana="on">エ</span>……
```
```html
<span class="charmname4 charm_chop charm_kana">ナマ</span>……<span class="charmname4 charm_last charm_kana">エ</span>……
```


## 詰まり表現

詰まり表現では「な、な、なまえ」のように詰まってしゃべるような表現ができます。  
省略表現を使用しても同じ表現できますが、詰まり表現は「最初の一文字だけを複数回繰り返す」専用のカスタムです。  
「ゃ」「ょ」のような小さい文字や長音符がある場合は一緒に切り出します。  
「な、な、なまえ」を表現するには詰まりの最初の「な、な、」の繰り返し部分と、基本の「なまえ」表示を組み合わせて表示します。

### data指定：data-charm-call="stutter"
「data-charm-call="stutter"」の指定があると、最初の一文字をデフォルトでは2回、記号「、」を挟んで繰り返します。
```html
<span class="charmname4" data-charm-kana="on">ナマエ</span>
```
↑最後の「、」はタグの外に手入力で入れておきます。

上で作ったコードの後に、基本の「なまえ」を表示するタグを追加すると、「な、な、なまえ」と表示できます。
```html
<span class="charmname4" data-charm-call="stutter">な、な</span>、<span class="charmname4">なまえ</span>
```

#### data追加オプション：data-charm-stt-count="●"

詰まり回数を変更するには追加の指定をします。
詰まり回数三回なら「data-charm-stt-count="3"」、五回なら「data-charm-stt-count="5"」を追加します。

数字部分は詰まり回数です。詰まり回数は自由に設定できます。20でも30でも動きます。

```html
<span class="charmname4" data-charm-call="stutter" data-charm-stt-count="5">な、な、な、な、な</span>、<span class="charmname4">なまえ</span>
```
#### data追加オプション：data-charm-break="●"
挟む文字を変更するには追加の指定をします。

「data-charm-break="！"」のように表示したい文字を設定します。  
エンティティでの指定も可能です。例：data-charm-break="&#xff01;"
```html
<span class="charmname4" data-charm-call="stutter" data-charm-break="！">な！な</span>！<span class="charmname4">なまえ</span>
```


### class指定：charm_stutter
data属性指定と同じく、最初の一文字をデフォルトでは2回、記号「、」を挟んで繰り返す表示になります。
```html
<span class="charmname4 charm_stutter">な、な</span>、
```
↑最後の「、」はタグの外に手入力で入れておきます。

上で作ったコードの後に、基本の「なまえ」を表示するタグを追加すると、「な、な、なまえ」と表示できます。
```html
<span class="charmname4 charm_stutter">な、な</span>、<span class="charmname4">なまえ</span>
```
詰まり回数を変更するには追加の指定をします。指定できる回数は1～9です。  
詰まり回数一回なら「charm_count1」、九回なら「charm_count9」を追加します。数字部分は詰まり回数です。  

このコ一ドで「な、な、な、な、な、なまえ」になります。
```html
<span class="charmname4 charm_stutter charm_count5">な、な、な、な、な</span>、<span class="charmname4">なまえ</span>
```

#### class追加オプション：charm_count●

詰まり回数を変更するには追加の指定をします。指定できる回数は1～9です。  
詰まり回数一回なら「charm_count1」、九回なら「charm_count9」を追加します。数字部分は詰まり回数です。  

このコ一ドで「な、な、な、な、な、なまえ」になります。
```html
<span class="charmname4 charm_stutter charm_count5">な、な、な、な、な</span>、<span class="charmname4">なまえ</span>
```

#### class追加オプション：charm_symbol●

挟む文字を変更するには「charm_symbol08」のように追加の設定します。  
data属性とは違い、class指定は決まった文字から選んで指定します。  
どんな記号が使えるかは[class指定の記号と回数コード一覧](#class指定の記号と回数コード一覧)でご確認ください。  

このコードで「な！な！なまえ」になります。
```html
<span class="charmname4 charm_stutter charm_symbol08">な！な</span>！<span class="charmname4">なまえ</span>
```

# 区切り表現
区切り表現では「な……ま……え」「なーまーえ」のように一文字ずつ区切った表現ができます。  
「ゃ」「ょ」のような小さい文字や長音符がある場合は前の文字と一緒に区切ります。

### data指定：data-charm-call="pause"
「data-charm-call="pause"」の指定があると、一文字ずつ区切り、記号「……」を挟んで表示します。
```html
<span class="charmname4" data-charm-call="pause">な……ま……え</span>
```

#### data追加オプション：data-charm-break="●"

挟む文字を変更するには追加の指定をします。  

「data-charm-break="ー"」のように表示したい文字を設定します。  
エンティティでの指定も可能です。例：data-charm-break="&#x30fc;"  

このコードで「なーまーえ」になります。
```html
<span class="charmname4" data-charm-call="pause" data-charm-break="ー">なーまーえ</span>
```

### class指定：charm_pause
一文字ずつ区切り、data属性指定と同じくデフォルトでは記号「……」を挟んで表示します。
```html
<span class="charmname4 charm_pause">な……ま……え</span>
```

#### class追加オプション：charm_symbol●

挟む文字を変更するには「charm_symbol03」のように追加の設定します。  
data属性とは違い、class指定は決まった文字から選んで指定します。  
どんな記号が使えるかは[class指定の記号と回数コード一覧](#class指定の記号と回数コード一覧)でご確認ください。

このコードで「なーまーえ」になります。
```html
<span class="charmname4 charm_pause charm_symbol03">なーまーえ</span>
```

他の表現と同様に[カタカナ変換](#ひらがなカタカナ変換)も一緒に使えます。  
下のコードはどちらも「ナ☆マ☆エ」と表示します。
```html
<span class="charmname4" data-charm-kana="on" data-charm-call="pause" data-charm-break="☆">ナ☆マ☆エ</span>
```
```html
<span class="charmname4 charm_kana charm_pause charm_symbol27">ナ☆マ☆エ</span>
```

# 響き表現

響き表現は、名前の後ろの方の文字を切り出し、少しずつ増やして表示します。  
眠りから覚めるときに呼ばれているような「……え……まえ……なまえ」といった表現ができます。  
「ゃ」「ょ」のような小さい文字や長音符がある場合は前の文字と一緒に区切って表示します。  
「……え……まえ……なまえ」を表現するには響き部分の「……え……まえ……」と、基本の「なまえ」表示を組み合わせて表示します。  
デフォルトの響き回数は2回です。

### data指定：data-charm-call="echo"

```html
<span class="charmname4" data-charm-call="echo">……え……まえ……</span>
```
基本の「なまえ」を表示するタグを追加すると、「……え……まえ……なまえ」になります。
```html
<span class="charmname4" data-charm-call="echo">……え……まえ……</span><span class="charmname4">なまえ</span>
```

#### data追加オプション：data-charm-ech-count="●"
響き回数を変更するには追加の指定をします。  
一回なら「data-charm-ech-count="1"」、三回なら「data-charm-ech-count="3"」を追加します。  
数字部分は響き回数です。  
※響き回数は自由に設定できますが、登録した名前が短い場合は指定回数よりも響く回数が少なくなります。

```html
<span class="charmname4" data-charm-call="echo" data-charm-ech-count="1">……まえ……</span><span class="charmname4">なまえ</span>
```

#### data追加オプション： data-charm-break="●"
デフォルトで使用される「……」を変更するには追加の指定をします。  
「data-charm-break="――"」のように表示したい文字を設定します。  
エンティティでの指定も可能です。例：data-charm-break="&#x2015;&#x2015;"  

このコードで「――え――まえ――」になります。
```html
<span class="charmname4" data-charm-call="echo" data-charm-break="――">――え――まえ――</span>
```

### class指定：charm_echo
一文字ずつ区切り、data属性指定と同じくデフォルトでは記号「……」を挟んで表示します。
```html
<span class="charmname4 charm_echo">……え……まえ……</span>
```
基本の「なまえ」を表示するタグを追加すると、「……え……まえ……なまえ」になります。
```html
<span class="charmname4 charm_echo">……え……まえ……</span><span class="charmname4">なまえ</span>
```

#### class追加オプション：charm_count●

響き回数を変更するには追加の指定をします。指定できる回数は1～9です。  
響き回数一回なら「charm_count1」、九回なら「charm_count9」を追加します。  
数字部分は響き回数です。  
※登録した名前が短い場合は指定回数よりも響く回数が少なくなります。

```html
<span class="charmname4 charm_echo charm_count1">……まえ……</span>
```

#### class追加オプション：charm_symbol●

挟む文字を変更するには「charm_symbol08」のように追加の設定します。  
data属性とは違い、class指定は決まった文字から選んで指定します。  
どんな記号が使えるかは[class指定の記号と回数コード一覧](#class指定の記号と回数コード一覧)でご確認ください。  

このコードで「――え――まえ――」になります。
```html
<span class="charmname4 charm_echo charm_symbol04">――え――まえ――</span>
```

# 重複表現
重複表現は、文字を一文字ずつ区切って複数文字ずつ表示します。
バグった機械のように「名前」という登録だけで「名名前前」、「なまえ」で「ななままええ」といった表現ができます。
「ゃ」「ょ」のような小さい文字や長音符がある場合は前の文字と一緒に区切って表示します。

### data指定：data-charm-overlap="on"
これで「ななままええ」になります。デフォルトの重複回数は2回です。
```html
<span class="charmname4" data-charm-overlap="on">ななままええ</span>
```

#### data追加オプション：data-charm-ovl-count="●"
重複回数を変更するには追加の指定をします。
例えば、五回なら「data-charm-ovl-count="5"」を追加します。
数字部分は重複回数です。
※回数は自由に設定できますが、1指定だと重複しません。
```html
<span class="charmname4" data-charm-overlap="on" data-charm-ovl-count="5">なななななまままままえええええ</span>
```

### class指定：charm_overlap
これで「ななままええ」になります。data属性指定と同じく、デフォルトの重複回数は2回です。
```html
<span class="charmname4 charm_overlap">ななままええ</span>
```

#### class追加オプション：charm_count●
重複回数を変更するには追加の指定をします。
class指定の場合、指定できる回数は1～9です。  
重複回数が三回ら「charm_count3」、九回なら「charm_count9」を追加します。数字部分は重複回数です。
※回数は自由に設定できますが、1指定だと重複しません。

このコードで「なななななまままままえええええ」になります。
```html
<span class="charmname4 charm_overlap charm_count5">なななななまままままえええええ</span>
```

他の表現と同様に[カタカナ変換](#ひらがなカタカナ変換)も一緒に使えます。  
下のコードはどちらも「ナナナナママママエエエエ」と表示します。
```html
<span class="charmname4" data-charm-kana="on" data-charm-overlap="on" data-charm-ovl-count="4">ナナナナママママエエエエ</span>
```
```html
<span class="charmname4 charm_kana charm_overlap charm_count4">ナナナナママママエエエエ</span>
```


## 逆順表現

登録した名前を逆順に表示します。  
末尾の文字に「ゃ」「ょ」のような小さい文字や長音符がある場合は、前の文字と一緒に並べ替えます。  
なまえ→えまな、みょうじ→じうみょ という感じです。

### data指定：data-charm-chop="on"

data指定の場合は「data-charm-rev="on"」を追加します。 

```html
<span class="charmname4" data-charm-rev="on">えまな</span>
```

### class指定：charm_rev

class指定では「charm_rev」を追加します。 

```html
<span class="charmname4 charm_rev">えまな</span>
```

# 母音のばし表現

母音のばしは、ひらがな登録された名前の末尾の文字を母音にする機能です。  
あ行の名前は勿論、か～わ行、「ゃゅょ」のある拗音、濁音も「あいうえお」「ぁぃぅぇぉ」のどれかにします。  
「ん」と「ー」で終わる名前の場合はそのまま「ん」と「ー」にします。  
例として、「みょうじ」なら「い」か「ぃ」にします。  
基本の名前表示と組み合わせることで「みょうじいいいいいい！」のように叫ぶ表現や「みょうじぃ……」といった表現ができるようになります。  

今回は「みょうじ」で解説します。  

### data指定：data-charm-vowel="1"

これで「い」になります。
```html
<span class="charmname2" data-charm-vowel="1">い</span>
```
※data-charm-vowelの「1」は表示文字数ではありません。

### 小さい文字　data指定：data-charm-vowel="1"
これで「ぃ」になります。
```html
<span class="charmname2" data-charm-vowel-min="1">ぃ</span>
```
※data-charm-vowel-minを設定する場合、data-charm-vowelは使用しません。  
※data-charm-vowel-minの「1」は表示文字数ではありません。  

#### data追加オプション：data-charm-vowel="●"

数を追加するには追加の指定をします。  
二文字なら「data-charm-vowel-count="2"」、八文字なら「data-charm-vowel-count="8"」を追加します。  
数字部分は追加文字数です。追加文字数は自由に設定できます。20でも30でも動きます。  

このコードで「いいいいいいいいい」になります。
```html
<span class="charmname2" data-charm-vowel="1" data-charm-vowel-count="8">いいいいいいいいい</span>
```
基本の「みょうじ」表示と組み合わせることで、叫ぶ感じにできます。  
このコードで「みょうじいいいいいいいいい」になります。
```html
<span class="charmname2">みょうじ</span><span class="charmname2" data-charm-vowel="1" data-charm-vowel-count="8">いいいいいいいいい</span>
```

## class指定の記号と回数コード一覧

class指定での文字変更時に使用できる記号一覧です。

| 表示する文字 | class追加コード | 備考 |
|-------------|-----------------|------|
| …… | charm_symbol01  | |
| … | charm_symbol02 | |
| ー | charm_symbol03 | |
| ―― | charm_symbol04 | |
| 〰〰 | charm_symbol05 | |
| 〰 | charm_symbol06 | |
| 〜 | charm_symbol07 | |
| ！ | charm_symbol08 | |
| ！　 | charm_symbol09 | ！＋スペース |
| ？ | charm_symbol10 | |
| ？　 | charm_symbol11 | ？＋スペース |
| ? | charm_symbol12 | |
| ! | charm_symbol13 | |
| 、 | charm_symbol14 | |
| 。 | charm_symbol15 | |
| ・ | charm_symbol16 | |
| ,	 | charm_symbol17 | |
| ， | charm_symbol18 | |
| ∥ | charm_symbol19 | |
| / | charm_symbol20 | |
| ／ | charm_symbol21 | |
| ○○ | charm_symbol22 | |
| ○ | charm_symbol23 | |
| ×× | charm_symbol24 | |
| × | charm_symbol25 | |
| ☆☆ | charm_symbol26 | |
| ☆ | charm_symbol27 | |
| ★★ | charm_symbol28 | |
| ★ | charm_symbol29 | |
| ♡♡ | charm_symbol30 | |
| ♡ | charm_symbol31 | |
| ☆　 | charm_symbol32 | ☆＋スペース |
| ★　 | charm_symbol33 | ★＋スペース |
| ♡　 | charm_symbol34 | ♡＋スペース |
| ♪ | charm_symbol35 | |
| ♪　 | charm_symbol36 | ♪＋スペース |
| ！？ | charm_symbol37 | |
| ！？　 | charm_symbol38 | ！？＋スペース |
| っ | charm_symbol39 | |
| っ！ | charm_symbol40 | |
| っ！　 | charm_symbol41 | 末尾スペースあり|
| っ、 | charm_symbol42 | |
| っ…… | charm_symbol43 | |
| ッ | charm_symbol44 | |
| ッ！ | charm_symbol45 | |
| ッ！　 | charm_symbol46 | 末尾スペースあり |
| ッ、 | charm_symbol47 | |
| ッ…… | charm_symbol48 | |


class指定で設定できる回数コードはこちら。

| 回数 | class追加コード |
|------|----------------|
| 1 | charm_count1 | |
| 2 | charm_count2 | |
| 3 | charm_count3 | |
| 4 | charm_count4 | |
| 5 | charm_count5 | |
| 6 | charm_count6 | |
| 7 | charm_count7 | |
| 8 | charm_count8 | |
| 9 | charm_count9 | |