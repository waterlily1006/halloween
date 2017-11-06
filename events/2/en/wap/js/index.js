
  $(window).on("orientationchange",function(event){
    setTimeout(function(){
        if(window.orientation != 0){
            alert("Please check this page vertically"); 
        }
    },200)             
  });  


$(window).load(function(){


    function Page() {
    	this_ = this;
        this.pageMask = $("#page_mask");
        this.mubeiElems = $(".mubei_list li");
        this.frame = $(".frame");
        this.gang = $(".gang");
        this.title = $(".title");
        this.close = $(".close_btn");
        this.sImg = $(".img_list li");
        this.bImg = $(".big_img");
        //this.bottom = $(".bottom");
        this.bottom = $(".bottom2");
        this.width = 0;
        this.page = $("#page");
        this.html = $("html");
        // this.triangle = $(".triangle-right");
    }

    $.extend(Page.prototype, {

        init: function() {

            this_.bottom.show()
            this.handleResize();
            this.getImgListData();
            this.handleClickMubei();
            this.handleClickClose();
            this.handleClickImg();
            this.getWidth();
            this_.sImg.eq(0).find("b").css("display","block");
            // this.orientationchange();
            this.handleMubeiTouch();

             // this.handleNoBodyMove();
        },

        orientationchange: function(){
            window.addEventListener('orientationchange', function(event){
                if ( window.orientation == 180 || window.orientation==0 ) {
                }
                if( window.orientation == 90 || window.orientation == -90 ) {
                    alert("Please check this page vertically");
                }
            });
        },

        handleClickMubei: function() {
            this.mubeiElems.click(function(){
                this_.html.css("overflow-y","hidden");
                window.scrollTo(0,0);
                this_.page.css("overflow","hidden");
                this_.close.css("display","block");
                this_.pageMask.css("display","block");
                this_.gang.css("display","block");
                this_.gangIndex = $(this).index();
                this_.bottom.css("display","none");
                for(var i = 0 ; i < this_.title.length; i++){
                      this_.title.eq(i).css("display","none");
                }
                this_.title.eq(this_.gangIndex).css("display","block");
                this_.frame.eq(this_.gangIndex).css("display","block");
            })

        },
        handleMubeiTouch: function(){
           this.mubeiElems.on("touchstart", function (e) {

             newBackground='url("imgs/btn_envent_en_0' + ($(this).index()+1 )+'_hover.png")no-repeat center';
                console.log(0)
                $(this).find("a").css({"background":newBackground,"backgroundSize":"100% 100%"});
           });
            this.mubeiElems.on("touchmove", function (e) {
                console.log(1)
            });
            this.mubeiElems.on("touchend", function (e) {

             oldBackground='url("imgs/btn_envent_en_0' +($(this).index()+1) +'.png")no-repeat center';
                $(this).find("a").css({"background":oldBackground,"backgroundSize":"100% 100%"});
             });
        },


        handleNoBodyMove:function(){
            $('body').on('touchmove', function (event) {
                event.preventDefault();
            });
        },

        handleClickClose:function(){
            this.close.click(function(){
                this_.html.css("overflow-y","auto");
                this_.frame.css("display","none");
                $(this).css("display","none");
                this_.gang.css("display","none");
                this_.pageMask.css("display","none");
                this_.getWidth();
            })
        },

        handleClickImg:function(){
            this.sImg.click(function(){
                chooseIndex = $(this).index()+1;
                bSrc = "imgs/img_boss_0"+ chooseIndex + "_big.jpg";

                 for(var i = 0 ; i < this_.sImg.length; i++){
                    this_.sImg.eq(i).removeClass('img_active');
                    this_.sImg.eq(i).find("b").css("display","none");
                }
                $(this).addClass('img_active');
                $(this).find("b").css("display","block");
                this_.bImg.attr("src",bSrc);
                console.log(111)
            })
        },

        getImgListData: function(){
            $.ajax({
                url: "../wap/mock/index.json",
                success: $.proxy(this.handleGetDataSucc, this)
            })
        },

        handleDateSucc: function(data){
             console.log(data);
        },

        getWidth: function(){
            this_.bottom.css({"display":"block"});
            this_.width = $(window).width();
            //alert($('.foot').height())
            // if(this_.width >= 1536){
            //     this_.bottom.css("display","none");
            //     this_.bottom2.css("display","block");
            //     this_.bottom2.css({"height":"0.6rem","width":"100%","background":"#161616"});
            // }else{
            //     this_.bottom.show()
            //     this_.bottom2.hide()
            // }
            
            if($(window).height() > $('#page').height() + $('.foot').height()){
                this_.bottom.css({
                    position:'fixed',
                    left:'0',
                    bottom:'0'
                })
                
            }else{
                this_.bottom.css({
                    position: 'relative',
                    left: '0',
                    bottom: '0'
                })
                $(".logo_img").css({
                    'padding-top':'10px',
                })
                $(".txt_img").css({
                    'padding-top':'10px',
                })
            }

        },
        handleResize: function(){
            $(window).resize(function(event) {
                //window.location.reload();
                 this_.getWidth();
            });
        }
    });

    var page = new Page();
    page.init();

});
