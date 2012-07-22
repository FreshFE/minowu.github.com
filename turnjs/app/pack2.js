(function($){

    "use strict";

    var Turn = function(){
        this.initialize();
    };

    Turn.prototype = {

        // 初始化
        initialize: function(){
            $.extend(this.initSize, this.size);
            // this.setSize();
            this.setPosition();
        },

        // 默认参数
        initSize: {
            width: 500,         // 默认宽度
            height: 600,        // 默认高度
            zoom: 1             // 默认缩放比例
        },

        // 被设置尺寸
        size: {
            width: 500,         // 默认宽度
            height: 600,        // 默认高度
            zoom: 1             // 默认缩放比例
        },

        $el: $('#magazine'),

        zoomSize: function(){
            // this.size.width *= this.size.zoom;
            // this.size.height *= this.size.zoom;

            this.size.width = this.initSize.width * this.size.zoom;
            this.size.height = this.initSize.height * this.size.zoom
        },

        // 设置尺寸
        setSize: function(){
            this.$el.css({'width': (this.size.width * 2) + 'px', 'height': this.size.height + 'px'});
            $('.turn-page', this.$el).css({'width': this.size.width + 'px', 'height': this.size.height + 'px'});
            $('img', this.$el).css({'width': this.size.width + 'px', 'height': this.size.height + 'px'});
        },

        setImgSize: function(){
            $('img', this.$el).css({'width': this.size.width + 'px', 'height': this.size.height + 'px'});
        },

        setPosition: function(){
            var wrapperWidth = $('#wrapper').width(),
                wrapperHeight = $('#wrapper').height(),

                left = (wrapperWidth - (this.size.width * 2)) / 2;
                
                this.$el.css({'left': left});

            console.log(wrapperWidth, wrapperHeight, left);
        },

        setZoom: function(zoomNum){
            this.size.zoom = zoomNum;
            this.zoomSize();
            this.setImgSize();
        }

    };

    window.onload = function(){

        var turn = new Turn;

        var m = $('#magazine');
        
        m.turn({
            acceleration: true,
        });

        m.on('turned', function(event, page, pageObj) {
            console.log(event);
            console.log(page);
            console.log(pageObj);
        });

        setTimeout(function(){
            m.fadeIn('fast');
        },1000);

        m.fadeIn(600);

        $(window).on('keydown', function(e){
            if (e.keyCode == 37){
                m.turn('previous');
            }
            else if (e.keyCode==39){
                m.turn('next');
            }
        });

        $('.mag-btn-cover').on('click', function(){
            m.turn('page', 1);
            return false;
        });

        $('.mag-btn-preview').on('click', function(){
            m.turn('previous');
            return false;
        });

        $('.mag-btn-next').on('click', function(){
            m.turn('next');
            return false;
        });

        // $('.mag-btn-zoomin').on('click', function(){
        //     turn.zoom('zoomIn');
        //     return false;
        // });

        // $('.mag-btn-zoomout').on('click', function(){
        //     turn.zoom('zoomOut');
        //     return false;
        // });

        // zoom.in({ 
        //     element: document.querySelector( 'img' ) 
        // });

        // $()

        // document.querySelector( '#main' ).addEventListener( 'click', function( event ) {
        //     event.preventDefault();
        //     zoom.magnify({ element: event.target });
        // } );

        m.delegate('img', 'click', function(event){
            console.log(event.target);
            zoom.in({ 
                element: event.target,
                // scale: 3
            });
            return false;
        });

        // m.delegate('img', 'click', function(event){
        //     console.log(event.target);
        //     // zoom.in({ 
        //     //     element: event.target,
        //     //     scale: 3
        //     // });
        //     var zoomNum = 0.5;
        //     turn.setZoom(zoomNum);
        //     m.turn("zoom", zoomNum);
        //     return false;
        // });

    };

})(jQuery);