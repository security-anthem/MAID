"use strict"

function makePostRequest(name, text){
    let textarea = document.createElement("textarea");
    textarea.setAttribute("name", name)
    textarea.innerHTML = text; /* 作ったtextarea要素に引数で受け取った文字列をそのまま入れる */

    let send_form=document.createElement("form");
    send_form.setAttribute("action", "");
    send_form.setAttribute("method", "post");
    send_form.setAttribute("name", "send_form");
    send_form.appendChild(textarea);
    document.body.appendChild(send_form);
    document.send_form.submit();
}
function readFile(file) {
    /* FileReaderで読み込み、parseEmailを実行。結果をmakePostRequestでサーバへ送信 */
    let fr = new FileReader();
    fr.readAsText(file);
    fr.onload = function () {
        let analysis_result = parseEmail(fr.result);
        makePostRequest("send_data", JSON.stringify(analysis_result));
    };
}