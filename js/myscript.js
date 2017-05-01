/*
  20150919
*/


/*****Carousel*******/
(function($){
    /*** add number **/
    add();
   
    /*****popup *****/
    $(function() {
        $( "#dialog" ).dialog({
            autoOpen: false,
            show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        }
        });
            $( "#dialog" ).dialog( "open" );
    });

    /** cansoul **/
    var initHeight = $(window).height() - 60,
        $colorList = $('#color_list').find('.bgs_box'),
        $txtList = $('#txt_list').find('.item_txt'),
        $switchList = $('#switch_box').find('span'),
        timer = null,
        key = 1;
    
    //IE6 bug
    $switchList.eq(0).addClass('on');
    $txtList.eq(0).addClass('on');
    $colorList.eq(0).addClass('on');

    //高度调整
    $('#content').css('min-height',initHeight + 'px')
    //视窗变化时
    $(window).resize(function(){
        initHeight = $(window).height() - 60;
        $('#content').css('min-height',initHeight + 'px');
        if($(window).height() > 866){
            $('#ft_area').addClass('pst_ft');
        }else{
           $('#ft_area').removeClass('pst_ft'); 
        }
    })
    loadFinish();
    $('#switch_box').on('click','span',function(){
        var stepIndex = $switchList.index($(this));
        actFn(stepIndex);
    }).hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(function(){
            actFn(key);
        },5000) //时间控制
    })

    $('.s_arr').on('click','a',function(){
        var step = $('.s_arr').find('a').index($(this));
        $('#switch_box').find('span').each(function(i){
            var css=$(this).hasClass("on");
            if(css){
                if(step==0){
                    if(i==0){
                        step=3  
                    }else{
                        step=i-1;
                    }
                }else{
                    if(i==3){
                        step=0; 
                    }else{
                        step=i+1;
                    }
                }   
            }
        });
        actFn(step);
    }).hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(function(){
            actFn(key);
        },7000)
    })
    //底部位置调整
    if($(window).height() > 866){
        $('#ft_area').addClass('pst_ft');
    }else{
       $('#ft_area').removeClass('pst_ft'); 
    }
    //轮播
    function actFn(stepIndex){
        var stepIndex = stepIndex;
        $switchList.eq(stepIndex).addClass('on').siblings().removeClass('on');
        $colorList.stop().eq(stepIndex).animate({opacity:1},800).css({flter:"Alpha(Opacity=100)"}).siblings().animate({opacity:0},800);
        $txtList.eq(stepIndex).addClass('on').siblings().removeClass('on');
        key = stepIndex;
        $('.bgs_box').eq(key).find(".img_area").addClass('item_img_css3');
        $('.bgs_box').eq(key).siblings().find(".img_area").removeClass('item_img_css3');
        $('.bgs_box').eq(key).find(".footer").fadeIn(800);
        $('.bgs_box').eq(key).siblings().find(".footer").fadeOut(800);
        $(".item_txt").eq(key).addClass('item_txt_css3').siblings().removeClass('item_txt_css3');
        key++;
        if(key == $txtList.length){
            key = 0;
        }
    }
    //预加载banner动画背景图
    function preloadImages(){
        var arrImage = [];
        var parLen = arguments.length;
        var cur = 0;
        for (var i = 0; i < parLen; i++) {
            arrImage[i] = new Image();
            arrImage[i].onload = function(){
                if(cur == parLen -1){
                    loadFinish();   
                }
                cur++;
            };
            arrImage[i].src = arguments[i];
        }
    }
    function loadFinish(){
        $txtList.eq(0).addClass('item_txt_css3');
        $colorList.eq(0).find(".img_area").addClass('item_img_css3');
        //自动轮播
        timer = setInterval(function(){
            actFn(key);
        },7000);
    }
    var p  = 5;
    if(p == 1){
        SUDA.uaTrack("smheart", "pcnbl");
    }else if (p == 2){
        SUDA.uaTrack("smheart", "pcchuzi");
    }else if (p == 3){
        SUDA.uaTrack("smheart", "pcyanyuan");
    }else if (p == 4){
        SUDA.uaTrack("smheart", "pcbailing");
    }

    // css3 effects
        $('.topWinners').addClass('animated zoomIn');
        $('.step4').addClass('animated lightSpeedIn');
        $('header h1').addClass('animated rubberBand');
        $('.bgs_1').addClass('animated zoomInUp');
        $('#floatBanner').addClass('animated slideInDown');
        $('#da-thumbs > li').addClass('animated pulse');

    /*****solft and right silder banner *****/
		  $('.flexslider').flexslider({
		    animation: "slide"
		  });

})(jQuery)

/***** add munber *****/
    function fmoney(s, n) {  
        n = n > 0 && n <= 20 ? n : 2;  
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];  
        t = "";  
        for (i = 0; i < l.length; i++) {  
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
        }  
        return t.split("").reverse().join("") + "." + r;  
    }  
    
    function rmoney(s) {  
        return parseFloat(s.replace(/[^\d\.-]/g, ""));  
    }  
    var strold,strnew;
     function add(){
        $("#topWinnerslides").find(".add").each(function(i,n){        
              strold = $(n).html();
              strold=rmoney(strold);
              strold+=0.01;
              strnew=fmoney(strold,2 );
              $(n).html(strnew);                
        });
        setTimeout('add()',1000);
     }

      /***** floatBanner *****/
      var timer=null;

    function startMove(iTarget)
    {
        var oDiv=document.getElementById('floatBanner');

        clearInterval(timer);
        timer=setInterval(function (){
            var iSpeed=(iTarget-oDiv.offsetTop)/8;
            iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

            if(oDiv.offsetTop==iTarget)
            {
                clearInterval(timer);
            }
            else
            {
                oDiv.style.top=oDiv.offsetTop+iSpeed+'px';
            }
        },30);

    }
    function closedFloatBanner(){
        document.getElementById('floatBanner').style.display = document.getElementById('floatBanner').style.display=='none'?'block':'none';
    }

    