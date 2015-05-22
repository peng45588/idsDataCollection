/**
 * Created by Administrator on 2015/5/20.
 */

window.onload = function(){
    out4.innerHTML =getBrowserinfo();
    out4.innerHTML +=checkOs();
    out4.innerHTML +=getPageInfo();
    test.innerHTML = "snow";
};

var out1 = document.getElementById("mousemove");
var out2 = document.getElementById("mouseclick");
var out3 = document.getElementById("mousesite");
var out4 = document.getElementById("os");
var out5 = document.getElementById("mousebound");


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
    var windows = (navigator.userAgent.indexOf("Windows",0)!=-1)?1:0;
    var mac = (navigator.userAgent.indexOf("mac",0)!=-1)?1:0;
    var linux = (navigator.userAgent.indexOf("Linux",0)!=-1)?1:0;
    var unix = (navigator.userAgent.indexOf("X11",0)!=-1)?1:0;
    if(windows) osType = "MS Windows";
    else if(mac) osType = "Apple mac";
    else if(linux) osType = "Linux";
    else if(unix) osType = "Unix";
    return ",OS："+osType;
}
/**获取页面信息：标题，url，来源url PZ 15-5-20
 *
 */
function getPageInfo(){
    var title = document.title;
    var url = window.location.href;
    var sourceUrl = document.referrer;//未测试
    return ",页面标题:"+title+","+"Url:"+ url+","+"来源Url"+sourceUrl;
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
    //alert("keyCode"+keyCode+"按键时间："+time);
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
        out1.innerHTML = "srcElement=" + tagName +
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
        "[" + elementForClick.id + "]"+",点击时间为"+getTime();
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
/**鼠标滚轮事件 PZ 15-2-22
 *
 */
window.onscroll = function(){

}

var NumberOfMouseWheelRollEvents = 0; var NumberOfScrollEvents = 0;
function ScrollingDetected(evt)
{
    var TheEventObject = evt || event;
    if(window.addEventListener)
    {
        document.getElementById("wpxo").value = window.pageXOffset;
        document.getElementById("wpyo").value = window.pageYOffset;
        document.getElementById("ddsl").value = document.documentElement.scrollLeft;
        document.getElementById("ddst").value = document.documentElement.scrollTop;
        document.getElementById("dbsl").value = document.body.scrollLeft;
        document.getElementById("dbst").value = document.body.scrollTop;
        document.getElementById("wsx").value = window.scrollX;
        document.getElementById("wsy").value = window.scrollY;
    }
    else if(document.addEventListener)
    {
        document.getElementById("wpxo").value = window.pageXOffset ;
        document.getElementById("wpyo").value = window.pageYOffset ;
        document.getElementById("dbsl").value = document.body.scrollLeft ;
        document.getElementById("dbst").value = document.body.scrollTop ;
        document.getElementById("ddsl").value = document.documentElement.scrollLeft ;
        document.getElementById("ddst").value = document.documentElement.scrollTop ;
    }
    else if(document.all && document.compatMode && document.compatMode == "CSS1Compat")
    {
        document.getElementById("ddsl").value = document.documentElement.scrollLeft ;
        document.getElementById("ddst").value = document.documentElement.scrollTop ;
        /*
         document.getElementById("idTable").style.left = document.documentElement.scrollLeft + 100 + "px";
         document.getElementById("idTable").style.top = document.documentElement.scrollTop + 75 + "px";
         We assume here that position: fixed is supported in IE. In other words,
         this javascript application targets IE 7 and IE 8 and deliberately does
         not target IE 6 [anymore].
         */
        document.getElementById("dbsl").value = document.body.scrollLeft ;
        document.getElementById("dbst").value = document.body.scrollTop ;
    };
    document.getElementById("ScrollEvents").value = ++NumberOfScrollEvents;
    document.getElementById("et").value = TheEventObject.type;
}

function MouseWheelRollingDetected(evt) {
    var TheEventObject = evt || window.event;
    document.getElementById("MouseWheelRollEvents").value = ++NumberOfMouseWheelRollEvents;
    var DirectionUpOrDown = "?";
    if (window.event && event.wheelDelta) {
        document.getElementById("mw").value = event.wheelDelta;
        if (event.wheelDelta > 0) {
            DirectionUpOrDown = " \u2191 ";
        }
        else {
            DirectionUpOrDown = " \u2193 ";
        }
        ;
    }
    else if (evt.detail) {
        if (evt.detail < 0) {
            DirectionUpOrDown = " \u2191 ";
        }
        else if (evt.detail > 0)
        /*
         with Roll the wheel one notch to scroll: One screen at a time,
         evt.detail is == ±32768
         */
        {
            DirectionUpOrDown = " \u2193 ";
        }
        ;
    }
    ;
    document.getElementById("et").value = DirectionUpOrDown + TheEventObject.type + DirectionUpOrDown;
}
function init()
{
    document.getElementById("et").value = "load";

    /*
     ================================================
     Rolling the mouse wheel:
     associating a recording function to the event
     ================================================
     */

    if("onmousewheel" in document) // MSIE 6, MSIE 7, MSIE 8 and Safari 3+
    {
        document.onmousewheel = MouseWheelRollingDetected;
    }
    else // we first collapse the table cells for event.wheelDelta
    {
        if(navigator.product == "Gecko" && navigator.productSub && navigator.productSub > "20041010" && navigator.userAgent.indexOf("rv:1.8") != -1)
        /* Mozilla 1.8alpha; see bug 77019 and bug 242368; must be higher
         than 1.7.x; Mozilla 1.8a2 supports accordingly dynamic collapsing
         of rows in both border-collapse models but not 1.7.x versions */
        {
            document.getElementById("trmwDistanceDirection").style.visibility = "collapse";
        }
        else
        {
            document.getElementById("trmwDistanceDirection").style.display = "none";
        };
        // and then we register the rolling of the mousewheel event accordingly
        if(window.addEventListener)
        {
            window.addEventListener("DOMMouseScroll", MouseWheelRollingDetected, false);
            // Gecko-based browsers and Konqueror 4.x support DOMMouseScroll event
        };
    };

    /*
     ================================================
     Moving the mouse in the browser window viewport:
     associating a recording function to such event
     ================================================
     */

    if(window.addEventListener)
    {
        window.addEventListener("mousemove", MouseMoves, true);
    }
    else if(window.onmousemove)
    {
        window.onmousemove = MouseMoves;
    }
    else if(document.documentElement.onmousemove)
    {
        document.documentElement.onmousemove = MouseMoves;
    };

    /*
     ================================================
     Scrolling the browser window viewport:
     associating a recording function to such event
     ================================================
     */

    if(window.addEventListener) // Firefox 1+, Opera 9, Safari 3+, etc.
    {
        window.addEventListener("scroll", ScrollingDetected, false);
    }
    else if(document.addEventListener) // Opera 7, Opera 8
    {
        document.addEventListener("scroll", ScrollingDetected, false);
    }
    else if("onscroll" in self) // MSIE 6, 7 and MSIE 8
    {
        self.onscroll = ScrollingDetected;
    };

    if(typeof window.pageXOffset != "number")//typeof 用来检测给定变量的数据类型
    {
        document.getElementById("trwpxo").style.display = "none";
        document.getElementById("trwpyo").style.display = "none";
    };
    if(typeof window.scrollX != "number")
    {
        document.getElementById("trwsx").style.display = "none";
        document.getElementById("trwsy").style.display = "none";
    };
}

function MouseMoves(evt)
{
    if(window.addEventListener)
    {
        document.getElementById("ct").value = evt.target.nodeName;
    }
    else if (window.event)
    {
        document.getElementById("ct").value = event.srcElement.nodeName;
    };
}





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