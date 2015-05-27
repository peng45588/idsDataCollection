/**
 * Created by Administrator on 2015/5/20.
 */

var mousemoveout = document.getElementById("mousemove");
var mouseclickout = document.getElementById("mouseclick");
var mousesiteout = document.getElementById("mousesite");
var keycodeout = document.getElementById("keycode");
var os = document.getElementById("os");
var mouseboundout = document.getElementById("mousebound");
//TODO 暂时用来存储数据的控件，待改进 //要添加的例子：$test.data("snow",ss);$test.data(storeEnterPage);
window.$test = $("#test");
var i = 0;//用于存储key值的区分   key的设置为"operate"+i


/**检查浏览器信息 PZ 15-5-20
 *
 */
function getBrowserinfo(){
   return {browser:navigator.appName,browserVersion:parseFloat(navigator.appVersion)};
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
    return osType;
}
/**获取页面信息：标题，url，来源url PZ 15-5-20
 *
 */
function getPageInfo(){
    return {
        title : document.title,
        url : window.location.href,
        sourceUrl : document.referrer//未测试
    };
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
function KeyDown(event){
    var storeKeyDown = {
        keyCode : event.keyCode,
        time : getTime()
    };
    $test.data("operate"+i,storeKeyDown);
    keycodeout.innerHTML=("KeyCode:"+$test.data("operate"+i).keyCode+","+$test.data("operate"+i).time);
    i++;
    //alert("keyCode"+keyCode+"按键时间："+time);

}

/**获取鼠标放置在控件上的时间、控件信息 PZ 15-5-20
 *
 * tagName:如button h1之类
 * elementId:当前鼠标的element的id
 * time:当前时间
 */
var elementForMouseMove = null;var timeStart;
function MouseMove(e){
    //兼容ie firefox chrome
    if(!e){
        e = window.event;
    }else{
        e.srcElement = e.target;
    }
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
        //TODO
        /**存储用户指针在控件上的时间与控件的信息
         * 名称解释 {{elementtagName: 如BODY之类的标签, elementId: 标签的ID,
         *          timeContinue: 指针在控件上持续的时间, time: 指针开始放在控件上的时间}}
         */
        var storeMouseMove  = {
            elementTagName : tagName,
            elementId : elementForMouseMove.id,
            timeContinue : t,
            time : timeStart
        };
        $test.data("operate"+i,storeMouseMove);
        mousemoveout.innerHTML = "srcElement=" +$test.data("operate"+i).elementTagName +"[" + $test.data("operate"+i).elementId
            + "],时间为：" + $test.data("operate"+i).timeContinue + ",开始时间为"+$test.data("operate"+i).time;
        i++;
        //重新计时,记录时间
        startclock();
        timeStart = getTime();
    }else{
        //alert("undo"); //进入了这里面就是说鼠标一直在那个控件下，暂时不需要做什么额外的事情
    }
}

/**鼠标点击事件，获取点击控件信息 PZ 15-5-20
 *
 */
var elementForClick = null;
function Click(e){
    //兼容ie firefox chrome
    if(!e){
        e = window.event;
    }else{
        e.srcElement = e.target;
    }
    var tagName = e.srcElement.tagName;
    elementForClick = e.srcElement;
    var storeClick = {
        x : e.clientX,
        y : e.clientY,
        elementTagName : tagName,
        elementId : elementForClick.id,
        time : getTime()
    };
    $test.data("operate"+i,storeClick);
    mouseclickout.innerHTML = "点击了:（"+$test.data("operate"+i).x + "," + $test.data("operate"+i).y +
        ") srcElement=" + $test.data("operate"+i).elementTagName +
        "[" + $test.data("operate"+i).elementId + "]"+",点击时间为"+$test.data("operate"+i).time;
    i++;
}
/**判断鼠标是否在滑动 PZ 15-2-22
 * 每隔0.1s进行一次判断，若坐标不同则认为在滑动
 */
window.setInterval(judgeMouseMove(),100);
var mouseX1,mouseY1;
function judgeMouseMove(e){
    if(mouseX1!= e.clientX||mouseY1!= e.clientY){
        mouseX1 = e.clientX;
        mouseY1 = e.clientY;
        var storeMouseMove = {
            x : mouseX1,
            y : mouseY1,
            time :getTime()
        };
        $test.data("operate"+i,storeMouseMove);
        mousesiteout.innerHTML = "鼠标在滑动:("+ $test.data("operate"+i).x+","+ $test.data("operate"+i).y+")"
            +$test.data("operate"+i).time;
        i++;
    }
}
/**鼠标拖动选择事件，获取拖动起始点与结束点，以及被选中的范围内的组件 PZ 15-5-20
 *
 */
var downx = 0,downy = 0;
function MouseDown(e){
    //兼容ie firefox chrome
    if(!e){
        e = window.event;
    }else{
        e.srcElement = e.target;
    }
    downx = e.clientX;downy = e.clientY;
}
function MouseUp(e){
    //兼容ie firefox chrome
    //alert(s);
    if(!e){
        e = window.event;
    }else{
        e.srcElement = e.target;
    }
    if(downx== e.clientX&&downy== e.clientY){}
    else {
        var storeDrag = {
            xStart : downx,
            yStart : downy,
            xEnd : e.clientX,
            yEnd : e.clientY,
            time :getTime()
        };
        $test.data("operate"+i,storeDrag);
        mouseboundout.innerHTML = "起始点:(" + $test.data("operate"+i).xStart + "," + $test.data("operate"+i).yStart
            + "),结束点(" + $test.data("operate"+i).xEnd + ")," + $test.data("operate"+i).yEnd
            +",time:"+$test.data("operate"+i).time;
        i++;
    }
    //TODO 怎么获取坐标范围内的控件
}


/**鼠标滚轮事件及form值的显示 PZ 15-2-22
 *
 */
var NumberOfMouseWheelRollEvents = 0;
var NumberOfScrollEvents = 0;
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
    }

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

    }

    document.getElementById("et").value = DirectionUpOrDown + TheEventObject.type + DirectionUpOrDown;
}
function init()
{
    document.getElementById("et").value = "load";
    //TODO 存储os到data，并打出alert提示存入
    os.innerHTML = getBrowserinfo();
    var storeEnterPage = {
        browser:getBrowserinfo().browser,
        browserVersion:getBrowserinfo().browserVersion,
        OS:checkOs(),
        title : getPageInfo().title,
        url : getPageInfo().url,
        sourceUrl : getPageInfo().sourceUrl  //未测试
        };


    $test.data(storeEnterPage);
    os.innerHTML = "已存入：\r\nbrowser:"+$test.data("browser")+"\r\nbrowserVersion:"+$test.data("browserVersion")
        +"\r\nOS:"+$test.data("OS")+"\r\ntitle:"+$test.data("title")+"\r\nurl:"+$test.data("url")
        +"\r\nsourceUrl:"+$test.data("sourceUrl");

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
        }
        // and then we register the rolling of the mousewheel event accordingly
        if(window.addEventListener)
        {
            window.addEventListener("DOMMouseScroll", MouseWheelRollingDetected, false);
            // Gecko-based browsers and Konqueror 4.x support DOMMouseScroll event
        }
    }

    /*
     ================================================
     Moving the mouse in the browser window viewport:
     associating a recording function to such event
     ================================================
     */

    if(window.addEventListener)
    {
        window.addEventListener("mousemove", MouseMove, true);
        window.addEventListener("click", Click, true);
        window.addEventListener("mousedown", MouseDown, true);
        window.addEventListener("mouseup", MouseUp, true);
        window.addEventListener("keydown", KeyDown, true);
    }
    else if(window.onmousemove)
    {
        window.onmousemove = MouseMove;
        window.onclick = Click;
        window.onmousedown = MouseDown;
        window.onmouseup = MouseUp;
        window.onkeydown = KeyDown;
    }
    else if(document.documentElement.onmousemove)
    {
        document.documentElement.onmousemove = MouseMove;
        document.documentElement.onclick = Click;
        document.documentElement.onmousedown = MouseDown;
        document.documentElement.onmouseup = MouseUp;
        document.documentElement.onkeydown = KeyDown;
    }

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
    }

    if(typeof window.pageXOffset != "number")//typeof 用来检测给定变量的数据类型
    {
        document.getElementById("trwpxo").style.display = "none";
        document.getElementById("trwpyo").style.display = "none";
    }
    if(typeof window.scrollX != "number")
    {
        document.getElementById("trwsx").style.display = "none";
        document.getElementById("trwsy").style.display = "none";
    }
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


/**设置返回数据类型
 *
 */
