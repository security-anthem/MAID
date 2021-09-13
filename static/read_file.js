"use strict"
var uploadArea = document.getElementById('upload-area');
var result = document.getElementById('result');
var fileInput = document.getElementById('file-input');

uploadArea.addEventListener('dragover', function (e) {
    e.preventDefault();
    this.classList.add("over");
}, false);

uploadArea.addEventListener('dragleave', function (e) {
    this.classList.remove("over");
}, false);

fileInput.addEventListener('change', function () {
    resultFile(this.files[0]);
});

uploadArea.addEventListener('drop', function (e) {
    e.preventDefault();
    this.classList.remove("over");
    var files = e.dataTransfer.files; //ドロップしたファイルを取得
    if (files.length > 1) return alert('アップロードできるファイルは1つだけです。');
    fileInput.files = files; //inputのvalueをドラッグしたファイルに置き換える。
    resultFile(files[0]);
}, false);

function resultFile(file) {
    /* FileReaderで読み込み、analysis_controllerを実行。結果を画面に出力 */
    let fr = new FileReader();
    fr.readAsText(file);
    fr.onload = function () {
        let analysis_result = analysis_controller(fr.result);
        result.innerHTML = "";
        let send_form=document.createElement("form");
        send_form.setAttribute("action", "");
        send_form.setAttribute("method", "post");
        send_form.setAttribute("name", "send_form");
        send_form.appendChild(analysis_result);
        result.appendChild(send_form);
        document.send_form.submit();
        result.appendChild(analysis_result);
        
    };
}