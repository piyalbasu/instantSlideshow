var slideshow = {};

slideshow = (function() {

    var $sel = {
            blocker: $('#blocker'),
            wrapper: $('#wrapper'),
            ul: $('ul'),
            activeSlide: $('li:eq(1)'),
            prevSlide: $('li:eq(0)'),
            nextSlide: $('li:eq(2)'),
            caption: $('#caption'),
            swipeHandler: $('#swipeHandler')
        },

        base = 1,

        space = base,

        offSet,

        forward = false,

        direction,

        imgNumber,

        route,

        dropLi,

        goingHome;

    return {

        setCaption: function() {
            $sel.caption.addClass('capTrans').text(lines[base - 1]);
            $sel.caption.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
                function(e) {
                    $sel.caption.removeClass('capTrans');
                });
        },

        home: function() {
            route = (space) * 1024;
            $('li:eq(2)').css({
                'background': 'url(\'img/' + 1 + '.jpg\')',
                'margin-left': route + 'px'
            });


            offSet = space * 1024;
            goingHome = true;

            slideshow.wrapperAnimate();
            slideshow.homeBuilder();
        },

        homeBuilder: function() {
            $sel.wrapper.one('webkitTransitionEnd otransitionend msTransitionEnd transitionend',
                function(e) {

                    route = (space + 1) * 1024;
                    imgNumber = 2;

                    dropLi = $('li:eq(0)');
                    var node = document.createElement('li');
                    node.style.cssText = 'background:url(\'img/' + imgNumber + '.jpg\');margin-left:' + route + 'px';

                    $sel.ul.append(node);
                    dropLi.remove();
                    $sel.blocker.removeClass('show');
                    base = 1;
                    space++;

                });
        },

        builder: function() {

            $sel.wrapper.one('webkitTransitionEnd otransitionend msTransitionEnd transitionend',
                function(e) {

                    imgNumber = (forward === true) ? base + 1 : base - 1;
                    route = (forward === true) ? space * 1024 : (space - 2) * 1024;
                    dropLi = (forward === true) ? $('li:eq(0)') : $('li:eq(2)');

                    var node = document.createElement('li');
                    node.style.cssText = 'background:url(\'img/' + imgNumber + '.jpg\');margin-left:' + route + 'px';

                    if (forward === true) {
                        $sel.ul.append(node);

                    } else {
                        $sel.ul.prepend(node);

                    }

                    dropLi.remove();
                    $sel.blocker.removeClass('show');
                    slideshow.setCaption();

                });
        },


        wrapperAnimate: function() {
            $sel.wrapper.css({
                '-webkit-transform': 'translate3d(-' + (offSet) + 'px, 0, 0)',
                'transform': 'translate3d(-' + (offSet) + 'px, 0, 0)'
            });
            $sel.blocker.addClass('show');
        },

        slide: function() {


            $(document).on('swipeleft', '#swipeHandler', function(e) {
                slideshow.move(e);

            });

            $(document).on('swiperight', '#swipeHandler', function(e) {
                slideshow.move(e);
            });
        },

        move: function(e) {
            direction = (e.type === 'swipeleft') ? space : space - 2;
            forward = (e.type === 'swipeleft') ? true : false;

            offSet = direction * 1024;

            //animate the slide
            if (e.type === 'swiperight' && base > 1 || e.type === 'swipeleft' && base < maxNum) {
                $sel.blocker.addClass('show');
                slideshow.wrapperAnimate();
                slideshow.builder();

                if (e.type === 'swipeleft') {
                    base++;
                    space++;
                } else {
                    base--;
                    space--;
                }

            };
        },



        init: function() {
            //populate our first slides
            $sel.prevSlide.css('background', 'url(\'img/' + maxNum + '.jpg\')');
            $sel.activeSlide.css('background', 'url(\'img/' + 1 + '.jpg\')');
            $sel.nextSlide.css('background', 'url(\'img/' + 2 + '.jpg\')');
            slideshow.setCaption();

            $(document).on('click touchstart', '#homeBtn', function() {
                slideshow.home();

            });
            slideshow.slide();
        }
    } //end return
}());
