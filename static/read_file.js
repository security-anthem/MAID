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

function readFile(file){
    /* FileReaderで読み込み、parseEmailを実行。結果をmakePostRequestでサーバへ送信 */
    let fr = new FileReader();
    let decoder_utf8 = new TextDecoder();
    let re = /charset[^;\r\n]*[;\r\n]/i
    var encoding;
    fr.readAsArrayBuffer(file)
    fr.onload = function () {
        let buf = fr.result
        let text = decoder_utf8.decode(buf);
        let charset_string = text.match(re);
        if (charset_string===null){
            encoding = "UTF-8";/*文字コードがない場合はUS-ASCIIであるため、文字コードが何であってもよい */
        }else{
            encoding = charset_string[0].split("=",2)[1].split(";")[0].replace(/[\"\']/g,"").trim();
        }
        let decoder=new TextDecoder(encoding);
        text=decoder.decode(buf)
        //メール本文に含まれる特定文字列のパターンを取得
        let analysis_result = parseEmail(text, encoding);
        makePostRequest("send_data", JSON.stringify(analysis_result));
	//makePostRequest("send_data", analysis_result);
	console.log(1);
    };
}
