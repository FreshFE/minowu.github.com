(function($){

    "use strict";

    // TODO: 自动适应屏幕尺寸
    // TODO: 添加hash相关性

    $(document).ready(function(){

        var magazine = $('#magazine'),
            zoomlayPage = $('#zoomlay-page'),
            zoomlay = $('#zoomlay'),
            allowZoom = true,
            doubleDisplay = true;

        function zoomShow(src, highSrc){

            // 插入低分辨率图片
            var low = '<img id="zoomlayLow" src="'+ src +'">';

            zoomlayPage.html(low);
            zoomlay.fadeIn(800);

            // 如果存在高分辨率图片
            // 插入zoomlay中，并等待加载完毕后替换low图片
            if(highSrc){
                var high = '<img id="zoomlayHigh" src="'+ highSrc +'">';
                zoomlayPage.append(high).hide();

                var $high = $('#zoomlayHigh'),
                    $low = $('#zoomlayLow');

                $high.load(function(){
                    $low.hide();
                    $high.show();
                });
            }
        }

        function zoomHide(){
            zoomlay.fadeOut('fast');
            zoomlayPage.empty();
        }

        // img click to zoom
        magazine.delegate('.page', 'click', function(event){
            console.log(allowZoom);
            console.log('你好');
            if(allowZoom){
                var selector = $(event.target),
                    img = $('img', selector),
                    src = img.attr('src'),
                    highSrc = img.attr('data-img');
                zoomShow(src, highSrc);
                return false;
            }
        });

        if(doubleDisplay){
            var turnSetting = {
                width: 1000,
                height: 600,
                // autoCenter: true
            };
        } else {
            var turnSetting = {
                width: 500,
                height: 600,
                display: 'single',
                // autoCenter: true
            };
        }

        magazine.turn(turnSetting);

        magazine.on("turning", function(event, page, view) {
            allowZoom = false;
        });

        magazine.on("turned", function(event, page, view) {
            allowZoom = true;
        });
        
        $(window).on('keydown', function(event){
            if (event.keyCode == 37){
                magazine.turn('previous');
            }
            else if (event.keyCode==39){
                magazine.turn('next');
            }
        });

        $('#mag-first').on('click', function(){
            magazine.turn('page', 1);
            return false;
        });

        $('#mag-preview').on('click', function(){
            magazine.turn('previous');
            return false;
        });

        $('#mag-next').on('click', function(){
            magazine.turn('next');
            return false;
        });

        function magToSingle(){
            magazine.turn('size', 500, 600);
            magazine.resize();
            magazine.turn("display", "single");
        }

        function magToDouble(){
            magazine.turn('size', 1000, 600);
            magazine.resize();
            magazine.turn("display", "double");
        }

        $('#mag-zoom').on('click', function(){
            $('img', magazine).css({'width': 250 + 'px', 'height': 300 + 'px'});
            magazine.turn('size', 500, 300);
            magazine.turn("resize");
            return false;
        });

        // zoomlay
        zoomlayPage.draggable();

        zoomlayPage.on('click', function(){
            zoomHide();
        });

    });

})(jQuery);