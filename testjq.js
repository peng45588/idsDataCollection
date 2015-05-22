/**
 * Created by Administrator on 2015/5/22.
 */
//在当前页面内追加换行标签和指定的HTML内容
function w( html ){
    document.body.innerHTML += "<br/>" + html;
}


var $li = $("li");
//同时向所有的li元素存储数据
$li.data("name", "CodePlayer");
$li.data("desc", "专注于编程开发技术分享");
$li.data("url", "http://www.365mini.com/");

var $n5 = $("#n5"); // 通过n4、n5、n6都可以读取数据
//返回键值name所对应的数据
w( $n5.data("name") ); // CodePlayer

//以对象形式返回所有的数据
var obj = $("#n5").data();
w("snow::");
for(var i in obj){
    w("snow::");
    w( i + "=" + obj[i] + "<br>");
}
w("snow::");
/*输出：
 name=CodePlayer
 desc=专注于编程开发技术分享
 url=http://www.365mini.com/
 */

//移除掉n4上存储的键名为name的数据
$li.removeData("name");
//虽然$li匹配3个li元素，但是读取数据只以第一个li元素n4为准，因此返回undefined
w( $li.data("name") ); // undefined
w("snow::");
var object = {
    name: "张三",
    age: 18,
    score: [87, 23, 56],
    options: { gender: "男", address: "水帘洞" }
};

//同时向所有的div元素以对象形式设置多个key-value数据
//value值可以是任意类型的数据，包括数组、对象等
$("div").data( object );

var $n2 = $("#n2"); // 通过n1、n2都可以读取数据
w( $n2.data("name") ); // 张三
w( $n2.data("score") ); // 87,23,56
w( $n2.data("options") ); // [object Object]