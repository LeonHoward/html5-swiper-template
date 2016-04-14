var app = app || {};

/*-- html5-template
====================================================== */
app.template = function(){};

/* loader */
app.template.loader = function(){};
app.template.loader.init= function(){
    // loader
    var getSource = function(){
        var res = [];
        return res;                 ///这个是预缓存，如果有loading页加载的情况，会显示loading,反之没有图片加载就不显示！
    }

    new mo.Loader(getSource(),{
        loadType : 1,
        minTime : 300,
        onLoading : function(count,total){
            //console.log('onloading:single loaded:',arguments)
            //$(".loader h1").html('LOADING ('+Math.round(count/total*100)+'%)');       //loading跳转的百分比
        },
        onComplete : function(time){
            //console.log('oncomplete:all source loaded:',arguments);            //loading完成时向服务器提交
            app.template.loader.destory();
            app.template.loader.done_callback.call();
        }
    });
   // $(".audio-icon").hide();
};
app.template.loader.done_callback = function(){};

app.template.loader.destory = function(){
    $(".loader").remove();                      //这个都是loading动画结束后的移除！
};

/* Landscape */
app.template.Landscape = function(){};
app.template.Landscape.init= function(){
    var Landscape = new mo.Landscape({
        pic: 'js/motion/landscape.png',
        picZoom: 3,
        mode:'portrait',//portrait,landscape
        prefix:'Shine'
    });
};

/* pageslide swiper */
app.template.swiper = function(){};
app.template.swiper.mySwiper = {};
app.template.swiper.init = function(){
    app.template.loader.done_callback = app.template.swiper.bind;
};
app.template.swiper.bind = function(){
    $(".swiper-container").css("display", "block");

    app.template.swiper.mySwiper = new Swiper ('.swiper-container', {
        speed:500,
        lazyLoading : true,
        lazyLoadingInPrevNext : true,
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
        direction : 'vertical',
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画 

            app.template.swiper.on_pageslideend(0);
        }, 
        onSlideChangeStart: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画

            app.template.swiper.on_pageslideend(swiper.activeIndex);
            //app.template.swiper.mySwiper.lockSwipes();                //这个是锁屏的命令！
        } 
    });

    //app.template.swiper.lock();
};
app.template.swiper.lock = function(){
    app.template.swiper.mySwiper.lockSwipes();
};
app.template.swiper.on_pageslideend = function(index){};

app.template.swiper.next = function(){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slideNext();
};

app.template.swiper.prev = function(){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slidePrev();
};

app.template.swiper.to = function(index){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slideTo(index);
};

app.template.touch = function(){};
app.template.touch.init = function(){

    // fastclick
    FastClick.attach(document.body);

    document.body.addEventListener("touchmove", function(e) {
        //e.stopPropagation();  // 阻止事件传递
        e.preventDefault();     // 阻止浏览器默认动作(网页滚动)
    });

    $("body").on("doubleTap longTap swipeLeft swipeRight", function(e){
         //e.stopPropagation();  // 阻止事件传递
        // e.preventDefault();   // 阻止浏览器默认动作(网页滚动)
        return false;
    });
};

app.template.data = {};
app.template.data.add = function(key, value){
    app.template.data[key] = value;
};
app.template.data.get = function(key){
    return app.template.data[key];
};

/*-- tools
====================================================== */
app.tools = function(){};
app.tools.random = function(n, m){
    var c = m-n+1;  
    return Math.floor(Math.random() * c + n);
};

app.tools.getpageurlwithoutparam = function(){
    var url = window.location.href;
    return url.substring(0, url.indexOf("?"));
};

app.tools.getbaseurl = function(){
    var url = window.location.href;
    return url.substring(0, url.lastIndexOf("/") + 1);
};

app.tools.gotourl = function(url){
    window.location.href = url;
};

app.tools.geturlparam = function(param){
    var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) 
        return unescape(r[2]);
    else
        return undefined;
};

app.tools.substr = function(str, len){
    if(str.length > len)
        str = str.substring(0, len) + "...";

    return str;
};

app.tools.platform = function(){};
app.tools.platform.os = "";
app.tools.platform.debug = ""; // 强制开始指定os模式
app.tools.platform.init = function(){
    var u = navigator.userAgent;

    if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1)
        app.tools.platform.os = "android";
    else if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))
        app.tools.platform.os = "ios";

    if(app.tools.platform.debug == "ios")
        app.tools.platform.os = "ios";
    else if(app.tools.platform.debug == "android")
        app.tools.platform.os = "android";
};

/*-- audio player
====================================================== */

/*-- p1
====================================================== */
app.p1 = function(){};
app.p1.init = function(){
    app.p1.show_e2_overlay();
    this.show_e2_animation();
};

app.p1.bind_touch_event = function(){

    // $(".p1 .e-3").on("touchend", function(){
    //     app.template.swiper.next();
    // });
};

app.p1.show_e2_animation = function(){
    // var resource = ["images/p1/e-2_animation/1.png"
    //                 , "images/p1/e-2_animation/2.png"
    //                 , "images/p1/e-2_animation/3.png"
    //             ];

    // $('#p1-e-2').html("");
    // var multiplePic = new mo.Film(document.querySelector('#p1-e-2'),{
    //     resource : resource,
    //     totalFrame : 3,
    //     playTime: 500
    // });

    // multiplePic.play(500);
};

app.p1.show_e2_overlay = function(){
    // window.overlay = new mo.Overlay({
    //     content: '<img class="disclaimerimg" src="images/p6/m-3.png" >',
    //     width: 480,
    //     height: 773
    // });

    // overlay.on('open', function(){
    //     $(".mo-pop").css({"top": "0px"});

    //     $('.mo-pop-wrap').on('touchend', function(){
    //         window.overlay.close();
    //     });
    // });
};


app.p1.destory = function(){  
};

/*-- p2
====================================================== */
app.p2 = function(){};
app.p2.init = function(){
};

app.p2.destory = function(){  
};
/*-- p3
====================================================== */
app.p3 = function(){};
app.p3.init = function(){
};
app.p3.destory = function(){                                        //destory必须要有，否则当前页面没有remove,动画会出现卡顿（因为还是在当前页面进行的事件）
};
/*-- p4
====================================================== */
app.p4 = function(){};
app.p4.init = function(){
};
app.p4.destory = function(){  
};
/*-- p5
====================================================== */
app.p5 = function(){};
app.p5.init = function(){
};
app.p5.destory = function(){  
};


/*-- for android
====================================================== */
var fuckandroid = {};
fuckandroid.app = function(){};
fuckandroid.app.p1 = function(){};
fuckandroid.app.p1.bind_touch_event = function(){
};

/*-- page init
====================================================== */
(function(){
    // 检测OS
    app.tools.platform.init();

    // 兼容android(如果开启android模式则重写响应函数用来)
    if(app.tools.platform.debug == "android"
     || app.tools.platform.os == "android")
    {
    }

    // 框架
    app.template.touch.init();
    app.template.swiper.init();
    app.template.loader.init();
    app.template.Landscape.init();
    //app.audio.init();
    //tracking.pv_byfrom();
    
    
    /* page init */
    app.p1.bind_touch_event();

    app.template.swiper.on_pageslideend = function(index){
        switch(index)
        {
            case 0:
                app.p1.init();
                break;
            case 1:
                app.p1.destory();
                app.p2.init();

                break;
            case 2:
                app.p2.destory();
                app.p3.init();
                break;
            case 3:
                app.p3.destory();
                app.p4.init();
                break;
            case 4:
                app.p4.destory();
                app.p5.init();
                break;
        }
    };

})();

