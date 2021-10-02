<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <title>MAID</title>
    <link rel="stylesheet" href="static/drag_and_drop.css">
    <link rel="stylesheet" href="static/base.css">
</head>

<body>
    <h1>MAID (Mail Detective) </h1>
    <h2>メールのアップロード</h2>
    <div id="upload-area">
        <p>Thunderbirdからメールをドラッグ＆ドロップもしくは以下のボタンから.emlファイルをアップロード</p>
        <input type="file" name="file" id="file-input">
    </div>
    <h2>分析結果</h2>
    {{result}}
    <div id="result">
        <div class="result-flex">
            <div class="square">
                <p>サーバ</p>
            </div>
            <div class="header-info">
                <p>
                    host：hostname.example.com<br>
                    IP：0.0.0.0<br>
                    SPF：Pass, DKIM:Pass, DMARC:Pass
                </p>
            </div>
        </div>
        <div class="result-flex">
            <div class="arrow">
                <div class="arrow-square"></div>
                <div class="arrow-traiangle"></div>
            </div>
            <div class="crypto-protocol">
                <p>
                    TLS1.0
                </p>
            </div>
        </div>
        <div class="result-flex">
            <div class="square">
                <p>サーバ</p>
            </div>
            <div class="header-info">
                <p>
                    host：hostname.example.com<br>
                    IP：0.0.0.0<br>
                    SPF：Pass, DKIM:Pass, DMARC:Pass
                </p>
            </div>
        </div>
        <div class="arrow">
            <div class="arrow-square"></div>
            <div class="arrow-traiangle"></div>
        </div>
        <div class="crypto-protocol"></div>
        <div class="result-flex">
            <div class="square">
                <p>受信者</p>
            </div>
            <div class="header-info">
                <p>
                    Deliver to：me@hostname.example.com
                </p>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="static/parse_email.js"></script>
    <script type="text/javascript" src="static/read_file.js"></script>
    <script type="text/javascript" src="static/eventlistener.js"></script>
    <script type="text/javascript" src="static/analyze_text.js"></script>
</body>

</html>
