/**
 * Created by chenlj on 2015/5/16.
 */
loadXML = function(xmlFile){
    var xmlDoc=null;
    //判断浏览器的类型
    //支持IE浏览器
    if(!window.DOMParser && window.ActiveXObject){
        var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
        for(var i=0;i<xmlDomVersions.length;i++){
            try{
                xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                break;
            }catch(e){
            }
        }
    }
    //支持Mozilla浏览器
    else if(document.implementation && document.implementation.createDocument){
        try{
            /* document.implementation.createDocument('','',null); 方法的三个参数说明
             * 第一个参数是包含文档所使用的命名空间URI的字符串；
             * 第二个参数是包含文档根元素名称的字符串；
             * 第三个参数是要创建的文档类型（也称为doctype）
             */
            xmlDoc = document.implementation.createDocument('','',null);
        }catch(e){
        }
    }
    else{
        return null;
    }

    if(xmlDoc!=null){
        try{
            xmlDoc.async = false;
            xmlDoc.load(xmlFile);
        }catch (e){
           //chrome
            try{
                var xmlhttp = new window.XMLHttpRequest();
                xmlhttp.open("GET",xmlFile,false);
                xmlhttp.send(null);
                xmlDoc = xmlhttp.responseXML.documentElement;
            }catch(ex){

            }
        }

    }
    return xmlDoc;
}

window.onload = function(){
    var xmldoc=loadXML('test.xml');

    var elements = xmldoc.getElementsByTagName("Company");

    for (var i = 0; i < elements.length; i++) {
        var name = elements[i].getElementsByTagName("cNname")[0].firstChild.nodeValue;
        var ip = elements[i].getElementsByTagName("cIP")[0].firstChild.nodeValue;
    }


}
