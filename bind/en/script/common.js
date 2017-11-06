/**
 * Created by xiyu on 17/5/20.
 */
$(document).ready(function(){
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
        if (window.orientation === 180 || window.orientation === 0) {
            $('.orientation').hide();
            $('.window_mask').hide();
        }
        if (window.orientation === 90 || window.orientation === -90 ){
            $('.orientation').show();
            $('.window_mask').show();
        }
    }, false);
    var page=0,
        Top=0,
        pagesHeight=[];
    $('.page').each(function(){
       pagesHeight.push($(this).height());
    });
    $('.next').on('click',function(){
        page++;
        Top=sum(pagesHeight,page);
        $('.page1').animate({marginTop:-Top})
    });
    $('.pages li').on('click',function(){
        if($(this).hasClass('active')){
            return false;
        }
        page=$(this).attr('page');
        Top=sum(pagesHeight,page);
        $('.page1').animate({marginTop:-Top});
    });
    $('.page3 .pic img').click(function(){
        $('.page3 .mask').show();
        $('.page3 .pic_big').css({'margin-top':-($('.pic_big').height()/2),'margin-left':-($('.pic_big').width()/2)}).attr('src',$(this).attr('src')).show();
    });
    $('.page4 .pic img').click(function(){
        $('.page4 .mask').show();
        $('.page4 .pic_big').css({'margin-top':-($('.page4 .pic_big').height()/2),'margin-left':-($('.page4 .pic_big').width()/2)}).attr('src',$(this).attr('src')).show();
    });
    $('.pic_big').click(function(){
        $(this).parent().find('.mask').hide();
        $(this).hide();
    });
    $('.mask').click(function(){
        $(this).hide();
        $(this).parent().find('.pic_big').hide();
    });
    var startX=0,
        startY=0;
    $(document).on("touchstart", function(e) {
        startY = e.originalEvent.changedTouches[0].pageY;
    });
    $(document).on("touchend", function(e) {
        var moveEndY = e.originalEvent.changedTouches[0].pageY,
            Y = moveEndY - startY;
        $('body').die("touchmove");
        if ( Y > 100) {
            page--;
            if(page<0){
                page=0;
            }
            Top=sum(pagesHeight,page);
            $('.page1').animate({marginTop:-Top});
        }
        else if ( Y < -100 ) {
            page++;
            if(page>5){
                page=5;
            }
            Top=sum(pagesHeight,page);
            $('.page1').animate({marginTop:-Top});
        }
    });
    setInterval(function(){
        $(".next").animate({"opacity":"0.1"},1500).animate({"opacity":"1"},1500);
    },3000)
});
function sum(arr,num){
    var sum=0;
    for(var i=0;i<num;i++){
        sum+=arr[i];
    }
    return sum;
}