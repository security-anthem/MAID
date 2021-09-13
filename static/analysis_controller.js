"use strict"
function analysis_controller(content) {
    /* contentについて分析を行い，DOM要素を返す． */
    var text = document.createElement('textarea');/* textarea要素を作成 */
    text.setAttribute("name", "send_data")
    text.innerHTML = content; /* 作ったtextarea要素に引数で受け取った文字列をそのまま入れる */
    return text; /* 作ったtextarea要素を返す */
}