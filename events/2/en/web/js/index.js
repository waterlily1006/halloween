$(window).load(function(){


    function Page() {
        this_ = this;
        this.mubeiElems = $(".mubei_list li");
        this.pageMask = $(".page_mask");
        this.closeBtn = $(".close_alert");
        this.frame = $(".frame");
        this.smallImgBox = $(".img_list li");
        this.bigImg = $(".big_img");
        this.frame = $(".frame");
        this.indexNum = 0;
        this.smallImgNum = 0;
        this.title = $(".cont_title");
        this.cont = $(".div_scroll div");
        this.finish = $(".finish");
        this.scroll = $(".div_scroll");
        this.ascroll = $(".scroll_container");
        this.bscroll = $(".scroll_absolute");
        this.cscroll = $(".div_scroll");
    }

    $.extend(Page.prototype, {

        init: function() {
            this.handleClickMubei();
            this.handleClickClose();
            this.handleClickSmallBoss();
            this.handleHoverMubei(); 
            this.handleResize();
            this.pageMask.css("display","none");
            this.frame.css("display","none");
            this.title.css("display","none");


        },

        handleClickMubei: function() {
             this.mubeiElems.click(function(){
                this_.indexNum = $(this).index();
                this_.pageMask.css("display","block");
                this_.frame.parent('div').css('left',0)
                this_.frame.eq(this_.indexNum).css("display","block");
                this_.title.css("display","none");
                this_.title.eq(this_.indexNum).css("display","block");
                //this_.frame.css({"top":"435px","left":"50%","margin-left":"-322px"});
             })
        },
        handleHoverMubei: function(){

            this.mubeiElems.mouseenter(function() {
                hoverIndex = $(this).index();
                newSrc = "imgs/btn_envent_en_0"+ (hoverIndex+1) + "_hover.png";
                console.log(newSrc)
                $(this).find("img").attr("src",newSrc);
            });
            this.mubeiElems.mouseleave(function() {
                for(var i = 0 ; i < this_.mubeiElems.length; i ++){
                  oldSrc = "imgs/btn_envent_en_0"+ (i+1) + ".png";
                  this_.mubeiElems.eq(i).find("img").attr("src",oldSrc);
                }
            });
        },

        handleClickClose: function(){
            this.closeBtn.click(function(){
                this_.pageMask.css("display","none");
                this_.frame.css("display","none");
            })
        },

        handleClickSmallBoss: function(){
             this.smallImgBox.eq(0).find('.triangle-right').css("display","block");
             this.smallImgBox.click(function(){
                for(var i = 0; i < this_.smallImgBox.length; i++){
                    this_.smallImgBox.eq(i).removeClass('img_active');
                    this_.smallImgBox.eq(i).find('.triangle-right').css("display","none");
                }

                $(this).addClass('img_active');
                this_.smallImgNum = $(this).index()+1;
                this_.bigSrc = "imgs/img_boss_0" + this_.smallImgNum + "_big.jpg"
                this_.bigImg.attr("src",this_.bigSrc);
                $(this).find('.triangle-right').css("display","block");

             })


        },
        handleResize: function(){

            $(window).resize(function () {   
                    //当浏览器大小变化时
        
            });

            $(window).scroll(function(){
               console.log(1)
            });
        }
    });

    var page = new Page();
    page.init();

});
