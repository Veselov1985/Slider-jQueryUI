(function ($) {
    $.fn.sliderUi=function (callSetting) {
         //опред доп настройки если не переданы польз
      var setting = $.extend({
          slideHeight: 600,
          slideWidth: 'auto',
          slideCont:'#slider',
          slideAuto:true,
          SlideSpeed : 700,
          TimeOut :3000,
          NeedLinks :true,
          slideControl:true,

      },callSetting ||{} );


        var cach;

        if(setting.slideHeight=='auto') {
            setting.slideHeight=$(window).height()-30;
            cach=true;
        }



            //bild Html


        function buildHtml (setting) {





         $(setting.slideCont+' img ').addClass("img-responsive img-fluid").wrapAll('<div class="sliderWrapper row"></div>').wrap('<div class="slides col-sm-12"></div>');


           if(setting.slideControl) {

           var control= '<a id="prewbutton" href="img/prev.png"></a><a id="nextbutton" href="img/next.png"></a>';

           $(".sliderWrapper").append(control);



               var $textSlide= $(setting.slideCont+" p").get();

               console.log($textSlide);
              if($textSlide.length>=0) {

                  $(setting.slideCont + ' img ').each(function (i) {

                      $(this).after($textSlide[i]);


                  })


              }











               if(setting.NeedLinks) {

                   var htmlLink="<div class='sli-links col-sm-12'>";

                   $(setting.slideCont +" div img").each(function (i) {
                   htmlLink+="<span class='control-slide'>"+i+"</span>";

               });
                   htmlLink+="</div>";

                   $(setting.slideCont).append( htmlLink);

               }

       };


       $(setting.slideCont).addClass('container-fluid').css({'width':setting.slideWidth});
      $('.sliderWrapper').css({'width':setting.slideWidth,'height':setting.slideHeight});



        };


        buildHtml (setting);






        $('.slides').css(
            {"position" : "absolute",
                "top":'0', "left": '0'}).hide().eq(0).show();
        var slideNum = 0;
        var slideTime;
        setting.img= $(setting.slideCont+" div img");
        var  amountslider  =setting.img.size();
        var animSlide = function(string){

            if(string==slideNum) return;
            clearTimeout(slideTime);
            $('.slides').eq(slideNum).fadeOut(setting.SlideSpeed);
            if(string == "next"){

                if(slideNum == (amountslider-1)){slideNum=0;}
                else{slideNum++}
            }
            else if(string == "prev")
            {
                if(slideNum == 0){slideNum=amountslider-1;}
                else{slideNum-=1}
            }
            else{
                slideNum = string;

            }
            $('.slides').eq(slideNum).fadeIn(setting.SlideSpeed, rotator);
            $(".control-slide.active").removeClass("active");
            $('.control-slide').eq(slideNum).addClass('active');
        }
        if(setting.NeedLinks){
            $('#nextbutton').click(function(e){
                e.preventDefault();
                animSlide("next");

            })
            $('#prewbutton').click(function(e){
                e.preventDefault();
                animSlide("prev");
            })
        }


        $(".control-slide:first").addClass("active");

        $('.control-slide').click(function(){
            var goToNum = parseFloat($(this).text());
            animSlide(goToNum);
        });


       if(setting.slideAuto) {

           var pause = false;
           var rotator = function () {
               if (!pause) {
                   slideTime = setTimeout(function () {
                       animSlide('next')
                   }, setting.TimeOut);
               }
           }
           $('#slider').hover(
               function () {
                   clearTimeout(slideTime);
                   pause = true;
               },
               function () {
                   pause = false;
                   rotator();
               });
           rotator();
       }





        $(window).on('resize load ',resizeAll );

            function resizeAll() {

                var $windowHeight=$(window).height();
                var $windowWidth =$(window).width();



                if(cach) {


                    $('.sliderWrapper').width($windowWidth-15).height($windowHeight-30);

                }

                var $nowWidth = $('.sliderWrapper').width();


                $('.slides img').each(function () {
                    $(this).width($nowWidth-30).height('auto');

                });



          var $nowheight= $('.slides').eq(slideNum).height();

           if($nowheight>=setting.slideHeight) return;



           $('.sliderWrapper').height($nowheight) ;



            }





    };
    
})(jQuery);