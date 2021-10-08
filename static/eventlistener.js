"use strict"
var uploadArea = document.getElementById('upload-area');
var fileInput = document.getElementById('file-input');

uploadArea.addEventListener('dragover', function (e) {
    e.preventDefault();
    this.classList.add("over");
}, false);

uploadArea.addEventListener('dragleave', function (e) {
    this.classList.remove("over");
}, false);

fileInput.addEventListener('change', function () {
    readFile(this.files[0]);
});

uploadArea.addEventListener('drop', function (e) {
    e.preventDefault();
    this.classList.remove("over");
    var files = e.dataTransfer.files; //ドロップしたファイルを取得
    if (files.length > 1) return alert('アップロードできるファイルは1つだけです。');
    fileInput.files = files; //inputのvalueをドラッグしたファイルに置き換える。
    readFile(files[0]);
}, false);