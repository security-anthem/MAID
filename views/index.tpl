%import html
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
    % if result!=None:
    <h2>分析結果</h2>
    <div id="result">
    <h3>概要</h3>
        <p>from: {{html.escape(result.get("from",""))}}</p>
        <p>reply-to: {{html.escape(result.get("reply-to",""))}}</p>
        <p>subject: {{html.escape(result.get("subject",""))}}</p>
        <p>添付ファイル</p>
        <ul>
            % for i in result.get("attach",[]):
            <li>hash: {{html.escape(i)}}</li>
            %end
        </ul>
        <p>検出されたパターン</p>
        <ul>
        % for i in result.get("pattern",[]):
            <li>{{html.escape(i)}}</li>
        %end
        </ul>
        <h3>配送経路</h3>
        <% 
        last_by=""
        for received in result.get("received",[]):
        %>
        <div class="result-flex">
            <div class="square">
            <p>サーバ</p>
            </div>
            <div class="header-info">
                <p>
                    {{html.escape(last_by)}}<br />
                    SPF: {{html.escape(str(received.get("spf",False)))}}, 
                    DKIM: {{html.escape(str(received.get("dkim",False)))}}, 
                    DMARC: {{html.escape(str(received.get("dmarc",False)))}}
                    {{html.escape(received.get("from",{}).get("display","")+"("+received.get("from",{}).get("ip","")+"["+received.get("from",{}).get("reverse","")+"])")}}
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
                    {{html.escape(received.get("protocol","")+received.get("ssl",""))}}
                </p>
            </div>
        </div>
        %last_by=received.get("by")
        % end
        <div class="result-flex">
            <div class="square">
            <p>サーバ</p>
            </div>
            <div class="header-info">
                <p>
                    {{html.escape(last_by)}}
                </p>
            </div>
        </div>
    </div>
    % end
    <script type="text/javascript" src="ssdeep/ssdeep.js"></script>    
    <script type="text/javascript" src="static/attachmentToHash.js"></script>    
    <script type="text/javascript" src="static/parse_email.js"></script>
    <script type="text/javascript" src="static/read_file.js"></script>
    <script type="text/javascript" src="static/eventlistener.js"></script>
    <script type="text/javascript" src="static/analyze_text.js"></script>
    <script type="text/javascript" src="static/spam_words_list.js"></script>
</body>

</html>
	