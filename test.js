/**
 * Created by Administrator on 2015/5/20.
 */

var test = document.getElementById("test");
test.onclick = function(){
    out4.innerHTML =getBrowserinfo();
    out4.innerHTML +=checkOs();
    out4.innerHTML +=getPageInfo();
    test.innerHTML = "snow";
};

var out1 = document.getElementById("out1");
var out2 = document.getElementById("out2");
var out3 = document.getElementById("out3");
var out4 = document.getElementById("out4");
var out5 = document.getElementById("out5");


/**检查浏览器信息 PZ 15-5-20
 *
 */
function getBrowserinfo(){
    var browser = navigator.appName;
    var browserVersion = parseFloat(navigator.appVersion);
    return "浏览器名称:"+browser+","+"浏览器版本:"+ browserVersion;
}
/**检查OS PZ 15-5-20
 *
 */
function checkOs(){
    var osType = "";
    windows = (navigator.userAgent.indexOf("Windows",0)!=-1)?1:0;
    mac = (navigator.userAgent.indexOf("mac",0)!=-1)?1:0;
    linux = (navigator.userAgent.indexOf("Linux",0)!=-1)?1:0;
    unix = (navigator.userAgent.indexOf("X11",0)!=-1)?1:0;
    if(windows) osType = "MS Windows";
    else if(mac) osType = "Apple mac";
    else if(linux) osType = "Linux";
    else if(unix) osType = "Unix";
    return "OS："+osType;
}
/**获取页面信息：标题，url，来源url PZ 15-5-20
 *
 */
function getPageInfo(){
    var title = document.title;
    var url = window.location.href;
    var sourceUrl = document.referrer;//未测试
    return "页面标题:"+title+","+"Url:"+ url+","+"来源Url"+sourceUrl;
}
/**获取当前时间 PZ 15-5-20
 * 可以根据这个来获取 进入页面的时间、离开页面的时间；example:2015-5-20 15:32:5 ms:680
 */
function getTime(){
    var d = new Date();
    return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+
        d.getHours()+":"+ d.getMinutes()+":"+ d.getSeconds()+" ms:"+ d.getMilliseconds();
}
/**获取按键信息(键值) PZ 15-5-20
 *
 */
var keyCode;
document.onkeydown = function(event){
    keyCode = event.keyCode;
    var time = getTime();
    alert("keyCode"+keyCode+"按键时间："+time);
};

/**获取鼠标放置在控件上的时间、控件信息 PZ 15-5-20
 *
 * tagName:如button h1之类
 * elementId:当前鼠标的element的id
 * time:当前时间
 */
var elementForMouseMove = null;var timeStart;
document.body.onmousemove = function(e){
    //兼容ie firefox chrome
    if(!e){
        e = window.event;
    }else{
        e.srcElement = e.target;
    }
    out3.innerHTML = "鼠标所在:("+ e.clientX+","+ e.clientY+")";
    //判断是否刚刚进入（即之前并没有在某个控件上），刚刚进入时 需要开始计时
    if(elementForMouseMove==null){
        //alert("start");
        startclock();
        elementForMouseMove = e.srcElement;
        timeStart = getTime();
    }
    //判断是否为上一个控件,若不是 则开始计时，并结束上一计时
    else if(elementForMouseMove != e.srcElement) {

        //alert("stop");
        stopclock();
        var tagName = e.srcElement.tagName;
        elementForMouseMove = e.srcElement;
        out1.innerHTML = "mousemove (" + e.clientX + "," + e.clientY + ") srcElement=" + tagName +
            "[" + elementForMouseMove.id + "],时间为：" + t + ",开始时间为"+timeStart;
        //重新计时,记录时间
        startclock();
        timeStart = getTime();
    }else{
        //alert("undo"); //进入了这里面就是说鼠标一直在那个控件下，暂时不需要做什么额外的事情
    }



};

/**鼠标点击事件，获取点击控件信息 PZ 15-5-20
 *
 */
var elementForClick = null;
document.body.onclick = function(e){
    //兼容ie firefox chrome
    if(!e){
        e = window.event;
    }else{
        e.srcElement = e.target;
    }
    var tagName = e.srcElement.tagName;
    elementForClick = e.srcElement;
    out2.innerHTML = "点击了:（"+e.clientX + "," + e.clientY + ") srcElement=" + tagName +
        "[" + elementForClick.id + "]"+",当前时间为"+getTime();
};

/**鼠标拖动选择事件，获取拖动起始点与结束点，以及被选中的范围内的组件 PZ 15-5-20
 *
 */
var downx,downy;
document.body.onmousedown = function(e){
    //兼容ie firefox chrome
    if(!e){
        e = window.event;
    }else{
        e.srcElement = e.target;
    }
    downx = e.clientX;downy = e.clientY;
};
document.body.onmouseup = function(e){
    //兼容ie firefox chrome
    if(!e){
        e = window.event;
    }else{
        e.srcElement = e.target;
    }
    out5.innerHTML = "起始点:("+downx+","+downy+"),结束点("+ e.clientX+","+ e.clientY;
    //TODO 怎么获取坐标范围内的控件
};











//计时器
var se,m=0,h=0,s=0,ss= 1,t;
function second(){
    if((ss%1000)==0){s+=1;ss=1;}
    if(s>0 && (s%60)==0){m+=1;s=0;}
    if(m>0 && (m%60)==0){h+=1;m=0;}
    ss+=1;
}
function startclock(){se=setInterval("second()",1);}
//function pauseclock(){clearInterval(se);}
function stopclock(){clearInterval(se);t=h+"时"+m+"分"+s+"秒"+ss+"毫秒";ss=1;m=h=s=0;}