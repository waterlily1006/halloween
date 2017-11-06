/**
 * Created by xiyu on 17/9/25.
 */
$(window).load(function(){
    $('#page_box').css({'height':$(window).height()-$('.header').height()});
    $('.page').css({'height':$(window).height()-$('.header').height()});

    //change pages
    var page=0;
    $('.page1').css({'margin-top':-page*$('.page').height()});
    $('next').touchstart(function(){
        page++;
        if(page>3)page=3;
        $('.page1').css({'margin-top':-page*$('.page').height()});
    });
    $('prev').touchstart(function(){
        page--;
        if(page<0)page=0;
        $('.page1').css({'margin-top':-page*$('.page').height()});
    });
    //touch&move
    document.addEventListener('touchstart',function(ev){
        if (ev.target.tagName == 'A'||ev.target.tagName == 'a'){
            return;
        }
        var startY=0,
            y=0;
        startY=ev.targetTouches[0].pageY;
        function move(ev){
            y=ev.targetTouches[0].pageY-startY;
        }
        function end(){
            if(y<-50){
                $('.mask').hide();
                $('.big_pic').hide();
                page++;
                if(page>3)page=3;
            }else if(y>50){
                $('.mask').hide();
                $('.big_pic').hide();
                page--;
                if(page<0)page=0;
            }
            $('.page1').css({'margin-top':-page*$('.page').height()});
            document.removeEventListener('touchmove',move,false);
            document.removeEventListener('touchend',end,false);
        }
        document.addEventListener('touchmove',move,false);
        document.addEventListener('touchend',end,false);
        ev.preventDefault();
    },false);
    $('.more_btn').touchstart(function(){
        page++;
        if(page>3)page=3;
        $('.page1').css({'margin-top':-page*$('.page').height()});
    });
    $('.page2 .pic').touchend(function(){
        $('.mask').show();
        $('.big_pic').attr('src',$(this).attr('src')).css({'margin-top':-$('.big_pic').height()/2,'margin-left':-$('.big_pic').width()/2}).show();
    });
    $('.big_pic').touchstart(function(){
        $('.mask').hide();
        $('.big_pic').hide();
    });
    $('.mask').touchstart(function(){
        $('.mask').hide();
        $('.big_pic').hide();
    });
});