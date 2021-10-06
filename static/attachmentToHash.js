function attachmentToHash(textEml){
    var strForSearch = 'Content-Type: multipart/mixed;';
    if(!textEml.includes(strForSearch)) {
        console.log('添付ファイルがありません');
        return [];
    }

    // boundaryを特定
    strForSearch = 'boundary="';
    var lenStrForSearch = strForSearch.length;
    var indexBoundaryStart = textEml.indexOf(strForSearch) + lenStrForSearch;
    if(indexBoundaryStart == -1 + lenStrForSearch){
        console.log('boundaryがありません');
        return [];
    } 
    var indexBoundaryEnd = textEml.indexOf('"', indexBoundaryStart);
    var boundary = textEml.slice(indexBoundaryStart, indexBoundaryEnd);

    // boudaryの後に続く二文字を取得
    // メールの最後には，boundaryの後に「--」が付く
    var strAfterBoundary = textEml.slice(indexBoundaryEnd, indexBoundaryEnd+2);

    var hashList = [];
    while(strAfterBoundary != '--'){

        // 添付ファイルの本文のindexを特定
        strForSearch = 'Content-Disposition: attachment;';
        var indexAttachmentStart = textEml.indexOf(strForSearch, indexBoundaryEnd);
        if(indexAttachmentStart == -1){
            console.log('「%s」が見つかりませんでした', strForSearch);
            break;
        }

        strForSearch = '\r\n\r\n';
        indexAttachmentStart = textEml.indexOf(strForSearch, indexAttachmentStart) + strForSearch.length;
        var indexAttachmentEnd = textEml.indexOf(boundary, indexAttachmentStart) - 4; // -4は2つのハイフンと改行文字の分
        
        // 添付ファイルの本文を取得
        var encodeAttachment = textEml.slice(indexAttachmentStart, indexAttachmentEnd);
        
        // 添付ファイルの本文をbase64でデコード
        var decodeAttachment = window.atob(encodeAttachment);
        
        // デコードした本文をfuzzy hash化し，リストに格納
        var hashAttachment = ssdeep.digest(decodeAttachment);
        hashList.push(hashAttachment);
        
        // boundaryの後に続く二文字を取得
        indexBoundaryEnd = textEml.indexOf(boundary, indexAttachmentEnd) + boundary.length;
        strAfterBoundary = textEml.slice(indexBoundaryEnd, indexBoundaryEnd+2);
    }

    return hashList;
}