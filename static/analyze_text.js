"use strict"

function decodeText(textEml, encoding){
    let cte;       //メール本文のエンコード方式
    let encodedTextBody,decodedTextBody;
    let textBodyStart,textBodyEnd;       //メール本文の開始位置・終了位置

    let strForSearch = 'Content-Type: multipart/';

    //マルチパート形式でない場合
    if(!textEml.includes(strForSearch)) {
        //メール本文のエンコード方式を取得
        let re = /Content-Transfer-Encoding[^;\r\n]*(base64|quoted-printable|8bit|7bit)[\r\n]/i;
        let cteStringLine = textEml.match(re);
        if (cteStringLine == null){
            console.log('Content-Transfer-Encoding is not found.'); //debug
            return [];
        }else{
            cte = cteStringLine[0].split(":",2)[1].split("\n")[0].replace(/[" "]/g,"").trim();
            console.log(cte); //debug
        }

        /* 
         メール本文を取得
         メールのヘッダと本文の間の空行をもとに本文の開始位置を特定
        */
        strForSearch = '\r\n\r\n';
        textBodyStart = textEml.indexOf(strForSearch, textBodyStart) + strForSearch.length;
        if(textBodyStart == -1 + strForSearch.length){
            console.log('Text slicing is failed.'); //debug
            return [];
        }
        else{
            textBodyEnd = textEml.length;
            //メール本文箇所を切り出し
            encodedTextBody = textEml.slice(textBodyStart, textBodyEnd);
            //不要なhtmlタグを削除
            encodedTextBody=encodedTextBody.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')
        }
    }   
    //マルチパート形式である場合
    else{
        console.log('本メールはマルチパート形式です');

        // boundaryを取得
        let boundary;
        let indexBoundaryStart,indexBoundaryEnd;
        strForSearch = 'boundary=';
        indexBoundaryStart = textEml.indexOf(strForSearch) + strForSearch.length;
        if(indexBoundaryStart == -1 + strForSearch.length){
            console.log('Boundary is not found.');//debug
            return [];
        }
        else{
            indexBoundaryEnd = textEml.indexOf('\r\n', indexBoundaryStart);
            boundary = textEml.slice(indexBoundaryStart, indexBoundaryEnd).replace(/[";\"\'"]/g,"").trim();
            console.log(boundary);//debug
        }

        //メール本文のエンコード方式を取得
        strForSearch = boundary;
        textBodyStart = textEml.indexOf(strForSearch, indexBoundaryEnd)+strForSearch.length+2;
        if(textBodyStart == -1 + strForSearch.length+2){
            console.log('Boundary is failed.');//debug
            return [];
        }
        else{
            textBodyEnd = textEml.indexOf(boundary, textBodyStart) - 4;
            encodedTextBody = textEml.slice(textBodyStart, textBodyEnd);
            let re = /Content-Transfer-Encoding[^;\r\n]*[\r\n]/i;
            let cteStringLine = encodedTextBody.match(re);
            if (cteStringLine == null){
                console.log('Content-Transfer-Encoding is not found.');//debug
                return [];
            }
            else{
                cte = cteStringLine[0].split(":",2)[1].split("\n")[0].replace(/[" "]/g,"").trim();
                console.log(cte);//debug
            }
        }

        // メール本文を取得
        strForSearch = '\r\n\r\n';
        textBodyStart = textEml.indexOf(strForSearch, textBodyStart) + strForSearch.length;
        if(textBodyStart == -1 + strForSearch.length){
            console.log('Text slicing is failed.'); //debug
            return [];
        }
        else{
            //メール本文箇所を切り出し
            encodedTextBody = textEml.slice(textBodyStart, textBodyEnd);   
        }                
    }

    console.log(encodedTextBody);//debug

    //メール本文をデコード
    //base64でエンコードされたメール本文をデコード
    if(cte.localeCompare("base64", undefined, {sensitivity:'base'}) == 0){
        decodedTextBody = decodeURIComponent(escape(window.atob(encodedTextBody)));
        console.log(decodedTextBody);//debug
    }
    //quoted-printableでエンコードされたメール本文をデコード
    else if(cte.localeCompare("quoted-printable", undefined, {sensitivity:'base'}) == 0){
        if(encoding.localeCompare("utf-8", undefined, {sensitivity:'base'}) == 0){
            const stringFromCharCode=String.fromCharCode;
            encodedTextBody = encodedTextBody.replace(/[\t\x20]$/gm,"").replace(/=?(?:\r\n?|\n)/g,"").replace(/=([a-fA-F0-9]{2})/g,function($0,$1){
                let codePoint = parseInt($1,16);
                return stringFromCharCode(codePoint);
            });
            decodedTextBody = decodeURIComponent(escape(encodedTextBody));
            console.log(decodedTextBody);//debug
        }
        else if(encoding.localeCompare("iso-2022-jp", undefined, {sensitivity:'base'})==0){
            //charset=iso-2022-jpである場合のデコード処理は未実装
        }
    }
    //その他(8bit/7bit)はデコードの処理を行わずそのまま出力
    else{
        decodedTextBody = encodedTextBody;
        console.log(decodedTextBody);//debug
    }

    return patternMatching(decodedTextBody);
}

function patternMatching(text){
    //事前に設定されたパターンがメール本文に含まれているかチェック
    let matchPatternsList = [];
    spamWordsList.forEach(function(element){
        let re = new RegExp(element, "ig");
        if(re.test(text)){
            matchPatternsList.push(element);
        }    
    });
    console.log(matchPatternsList);//debug
    return matchPatternsList;
} 