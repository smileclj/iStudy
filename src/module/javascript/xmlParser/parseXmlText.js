/**
 * Created by chenlj on 2015/5/15.
 */
loadXML = function(xmlString){
    var xmlDoc=null;
    //判断浏览器的类型
    //支持IE浏览器
    if(!window.DOMParser && window.ActiveXObject){   //window.DOMParser 判断是否是非ie浏览器
        var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
        for(var i=0;i<xmlDomVersions.length;i++){
            try{
                xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                xmlDoc.async = false;
                xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                break;
            }catch(e){
            }
        }
    }
    //支持Mozilla浏览器
    else if(window.DOMParser && document.implementation && document.implementation.createDocument){
        try{
            /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
             * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
             * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
             * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
             */
            domParser = new  DOMParser();
            xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
        }catch(e){
        }
    }
    else{
        return null;
    }

    return xmlDoc;
}


checkXMLDocObj = function(xmlString){
    var xmlDoc = loadXML(xmlString);
    if(xmlDoc==null){
        alert('您的浏览器不支持xml解析');
    }
    return xmlDoc;
}

window.onload = function(){
    var xmlStr = '<?xml version="1.0" encoding="utf-8"?><DongFang><Company><cNname>1</cNname><cIP>1</cIP></Company><Company><cNname>2</cNname><cIP>2</cIP></Company><Company><cNname>3</cNname><cIP>3</cIP></Company><Company><cNname>4</cNname><cIP>4</cIP></Company><Company><cNname>5</cNname><cIP>5</cIP></Company> <Company><cNname>6</cNname><cIP>6</cIP></Company></DongFang>';
    var xmldoc=loadXML(xmlStr)

    var elements = xmldoc.getElementsByTagName("Company");

    for (var i = 0; i < elements.length; i++) {
        var name = elements[i].getElementsByTagName("cNname")[0].firstChild.nodeValue;
        var ip = elements[i].getElementsByTagName("cIP")[0].firstChild.nodeValue;
    }

}
