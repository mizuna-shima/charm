/*
拡張機能はスクリプト本体（charm.js）のコードの最後に追記するか、スクリプト本体の次に読み込んでください。
本体に追記する場合は、本体のバージョンアップ時に改めて追記するのを忘れないようにしてください。

拡張機能はそれぞれ独立しているので、必要なところだけを使うor不要な拡張を削除して使うことが出来ます。
*/

/********************************* spanタグ削除拡張ここから *********************************/
/**
 * 名前変換後にspanタグを削除する拡張機能
 * 
 * 指定されたクラス名を持つspanタグを削除し、その子要素のTextNodeを親要素に移動する
 * - 再登録を反映できるようにするため、登録のための入力欄があるページでは動作しません
 * - spanタグが無いので、リロードなしでは復元系機能は基本的に動かなくなります
 */
class ElementRemover {
  // 削除対象のクラス名共通文字
  static targetClass = 'charmname';

  /**
   * プラグインの実行メソッド
   * @returns {ElementRemover} インスタンス
   */
  static run = () => {
    let instance = new ElementRemover();
    instance.start();
    return instance;
  }
  /**
   * コンストラクタ
   */
  constructor() {
    this.nameClass = Charm.nameClass;
  }
  /**
   * 入力タグが存在するかどうかをチェック
   * @returns {boolean} 入力タグが存在する場合はtrue、それ以外はfalse
   */ 
  hasSyncTags = () => {
    return document.getElementsByClassName(this.nameClass).length > 0;
  }
  
  /**
   * spanタグを削除し、親要素のテキストノードを一つに結合する処理を開始
   */
  start = () => {
    // 再登録をできるようにするため、入力タグが存在する場合は処理をしない
    if (this.hasSyncTags()) return;
    // 削除対象のspanタグを取得
    const elms = this.getSpanElms();
    const elmsArray = Array.from(elms);
    // 親要素をセットにして保持
    const allParents = new Set(elmsArray.map(elm => elm.parentElement));
    // 各spanタグを処理
    elms.forEach(elm => {
      this.removeSpan(elm);
    });
    // 各親要素のテキストノードを結合
    allParents.forEach(parent => {
      this.combineTextNodes(parent);
    });
  }

  /**
   * spanタグを削除し、その子要素を親要素に移動
   * @param {HTMLElement} elm - 削除対象のspanタグ
   */
  removeSpan = (elm) => {
    const parent = elm.parentElement;
    // spanタグ内のテキストを取得
    const text = elm.textContent;
    // 親要素にテキストノードを追加
    parent.insertBefore(document.createTextNode(text), elm);
    // spanタグを削除
    parent.removeChild(elm);
  }

  /**
   * 親要素のすべてのテキストノードを一つに結合
   * @param {HTMLElement} parent - 親要素
   */
  combineTextNodes = (parent) => {
    let combinedText = '';
    const nodes = Array.from(parent.childNodes);
    const fragment = document.createDocumentFragment();
    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        // テキストノードを結合
        combinedText += node.nodeValue;
      } else {
        if (combinedText) {
          // 結合されたテキストをフラグメントに追加
          fragment.appendChild(document.createTextNode(combinedText));
          combinedText = '';
        }
        // その他のノードをフラグメントに追加
        fragment.appendChild(node);
      }
    });
    // 残った結合テキストをフラグメントに追加
    if (combinedText) {
      fragment.appendChild(document.createTextNode(combinedText));
    }
    // 親要素の内容を新しいフラグメントで置き換え
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
    parent.appendChild(fragment);
  }

  /**
   * 対象のspanタグを取得
   * @returns {Array} 対象のspanタグの配列
   */
  getSpanElms = () => {
    return document.querySelectorAll(`span[class*="${ElementRemover.targetClass}"]`);
  }
}
// 拡張を追加するコード
Charm.addEExtension("ElementRemover", ElementRemover);

/********************************* spanタグ削除拡張ここまで *********************************/



/********************************* デバッグモード拡張ここから *********************************/
/**
 * 変換した名前を色付けして動作確認しやすくする、デバッグモードを搭載する拡張機能
 * 
 * 指定された条件下で要素のスタイルを変更するデバッグ機能を追加
 * URLパラメータを使用してデバッグモードを制御することも可能
 * 対象のタグがない場合は機能しません
 */
class Debug {
  // 変換対象spanタグの文字色
  static textColor = '#dd1111';
  // 変換対象spanタグの背景色
  static backGroundColor = 'rgba(250, 250, 20, 0.8)';
  // URLパラメータで?debug=1のときだけ動かす:1 常にデバッグ表示:0
  static useParam = 1;

  /**
   * デバッグモードを実行する
   * localStorageまたはsessionStorageからデータを取得し、
   * 指定されたクラスを持つ要素のスタイルを変更し、デバッグクラスを追加する
   */
  static run = () => {
    // デバッグモードが無効なら実行しない
    if (this.useParam === 1 && !this.isDebugMode()) return;

    let getItem;
    // localStorageからデータを取得
    getItem = JSON.parse(localStorage.getItem(Charm.storageKeyName));
    if (!getItem) {
      // localStorageにデータがない場合はsessionStorageから取得
      getItem = JSON.parse(sessionStorage.getItem(Charm.storageKeyName));
    }

    if (getItem) {
      // 取得したデータのキーに基づいてクラスを持つ要素を操作
      Object.keys(getItem).forEach(key => {
        const elements = document.getElementsByClassName(key);
        Array.from(elements).forEach(element => {
          // 要素のスタイルを変更
          element.style.color = this.textColor;
          element.style.backgroundColor = this.backGroundColor;
          // デバッグクラスを追加
          element.classList.add('charm_debug');
        });
      });
    }
  }

  /**
   * URLパラメータに?debug=1が含まれているかをチェックする
   * @returns {boolean} デバッグモードが有効かどうか
   */
  static isDebugMode = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('debug') === '1';
  }
}
// 拡張を追加するコード
Charm.addEExtension("Debug", Debug);

/********************************* デバッグモード拡張ここまで *********************************/



/********************************* 通常変換プレースホルダー置換ここから *********************************/

/**
 * 通常変換プレースホルダー置換
 * #登録id#で書いたプレースホルダーをspanタグに置換する
 */
class BeforeSpanReplacer {
  // 登録idとデフォルトネーム
  static replacements = {
    'charmname1': '苗字',
    'charmname2': 'みょうじ',
    'charmname3': '名前',
    'charmname4': 'なまえ',
  };

  // 置換対象のタグリスト
  static targetTags = [
    'p', 'ruby', 'rt', 'h1', 'h2', 'h3', 'h4', 'h5', 'li', 'th', 'td', 'a', 'span', 'div'
  ];

  /**
   * 置換処理を実行
   */
  static run = () => {
    this.replaceText();
  };

  /**
   * 指定されたタグ内のテキストを置換
   */
  static replaceText = () => {
    this.targetTags.forEach(tag => {
      const elements = document.querySelectorAll(tag);
      elements.forEach(elm => {
        this.replacePlaceholdersInElement(elm);
      });
    });
  };

  /**
   * 要素内のテキストノードのプレースホルダーを置換
   * @param {Element} element - 置換対象の要素
   */
  static replacePlaceholdersInElement = (element) => {
    const childNodes = Array.from(element.childNodes);
    childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const replacedNodes = this.createReplacementNodes(child.textContent);
        child.replaceWith(...replacedNodes);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        this.replacePlaceholdersInElement(child);
      }
    });
  };

  /**
   * テキスト中のプレースホルダーを置換して新しいノードを生成
   * @param {string} text - 置換対象のテキスト
   * @returns {Array} 置換後のノード配列
   */
  static createReplacementNodes = (text) => {
    const fragment = document.createDocumentFragment();
    const parts = text.split(new RegExp(`(#${Object.keys(this.replacements).join('#|#')}#)`));

    parts.forEach(part => {
      const key = part.replace(/#/g, '');
      if (this.replacements[key]) {
        const span = document.createElement('span');
        span.className = key;
        span.textContent = this.replacements[key];
        fragment.appendChild(span);
      } else {
        fragment.appendChild(document.createTextNode(part));
      }
    });
    return Array.from(fragment.childNodes);
  };
}

Charm.addExtension("BeforeSpanReplacer", BeforeSpanReplacer);

/********************************* 通常変換プレースホルダー置換ここまで *********************************/



/********************************* プルダウン登録内容をカテゴリ別に出し分けここから *********************************/

/**
 * プルダウン登録内容をカテゴリ別に出し分け
 * 登録ページ以外で置換処理を行う
 */
class AfterSwitchText {

  // 選択肢
  static values = ['白', '黒', '灰色'];

  // カテゴリ別テキスト
  static replaceList = {
    'place': ['雪国', '異国', '都会'],
    'cat': ['白い猫の妖精', '異界の黒猫', '銀色に輝く猫神'],
    'magic': ['白い花を咲かせる', 'ビターチョコを無限に生む', '銀の雨を降らせる'],
  };

  static run = () => {
    AfterSwitchText.start();
  };

  /**
   * 入力タグが存在するかどうかをチェック
   */ 
  static hasSyncTags = () => {
    return document.getElementsByClassName(Charm.nameClass).length > 0;
  };

  static start = () => {
    // 再変換では動かせないので、入力タグが存在する場合は処理をしない
    if (AfterSwitchText.hasSyncTags()) return;
    const elms = document.querySelectorAll('[data-charm-switch]');
    elms.forEach(elm => {
      const dataKey = elm.getAttribute('data-charm-switch');
      const text = elm.textContent.trim();
      let index = AfterSwitchText.values.indexOf(text);
      // 該当する値がない場合は最初の値を使用
      if (index === -1) {
        index = 0;
      }
      if (AfterSwitchText.replaceList[dataKey]) {
        elm.textContent = AfterSwitchText.replaceList[dataKey][index];
      }
    });
  };
}
// 拡張を追加するコード
Charm.addEExtension("AfterSwitchText", AfterSwitchText);

/********************************* プルダウン登録内容をカテゴリ別に出し分けここまで *********************************/



/********************************* 猫語置換ここから *********************************/

/**
 * 猫語置換
 * 登録ページ以外で猫語っぽく置換処理を行う
 */

class MeowConverter {
  static hiraganaClass = 'charm_meow';
  static katakanaClass = 'charm_meow_kana';

  static run = () => {
    MeowConverter.start();
  };

  /**
   * 入力タグが存在するかどうかをチェック
   */ 
  static hasSyncTags = () => {
    return document.getElementsByClassName(Charm.nameClass).length > 0;
  };

  static start = () => {
    // 再変換では動かせないので、入力タグが存在する場合は処理をしない
    if (MeowConverter.hasSyncTags()) return;

    // ひらがな指定クラス
    Array.from(document.getElementsByClassName(MeowConverter.hiraganaClass)).forEach(el => {
      el.textContent = el.textContent.replace(/な/g, 'にゃ').replace(/ナ/g, 'ニャ');
    });

    // カタカナ指定クラス
    Array.from(document.getElementsByClassName(MeowConverter.katakanaClass)).forEach(el => {
      el.textContent = el.textContent.replace(/な|ナ/g, 'ニャ');
    });
  };
}

// 拡張を追加
Charm.addEExtension('MeowConverter', MeowConverter);

/********************************* 猫語置換ここから *********************************/