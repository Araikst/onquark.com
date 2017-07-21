(function(){
    var menuItems         = [].slice.call( document.querySelectorAll( '.has-dropdown' ) ),
        menuSubs          = [].slice.call( document.querySelectorAll( '.dropdown-menu') ),
        selectedMenu      = undefined,
        holder			  = document.querySelector( '.dropdown-holder' ),
        subBg			  = document.querySelector( '.dropdown__bg' ),
        subBgBtm		  = document.querySelector( '.dropdown__bg-bottom' ),
        subArr			  = document.querySelector( '.dropdown__arrow' ),
        subCnt            = document.querySelector( '.dropdown__wrap' ),
        header			  = document.querySelector( '.main-nav' ),
        closeDropdownTimeout,

        startCloseTimeout = function (){
            closeDropdownTimeout = setTimeout( function() { closeDropdown() } , 50 );
        },

        stopCloseTimeout   = function () {
            clearTimeout( closeDropdownTimeout );
        },

        openDropdown      = function (el) {
            //- get offset position
            var headerMeta = header.getBoundingClientRect();
            //- get menu ID
            var menuId     = el.getAttribute( 'data-sub' );
            //- get related sub menu
            var menuSub    = document.querySelector( '.dropdown-menu[data-sub="'+menuId+'"]' );
            //- get menu sub content
            var menuSubCnt = menuSub.querySelector( '.dropdown-menu__content' )
            //- get bottom section of current sub
            // var menuSubBtm = menuSubCnt.querySelector('.bottom-section').getBoundingClientRect();
            //- get height of top section
            var menuSubTop = menuSubCnt.querySelector('.top-section').getBoundingClientRect();
            //- get menu position
            var menuMeta   = el.getBoundingClientRect();
            //- get sub menu position
            var subMeta    = menuSubCnt.getBoundingClientRect();

            //- set selected menu
            selectedMenu = menuId;

            //- Remove active Menu
            menuItems.forEach( function(el) { el.classList.remove( 'active' ) });
            //- Set current menu to active
            el.classList.add( 'active' );

            //- Remove active sub menu
            menuSubs.forEach( function(el) { el.classList.remove( 'active' ) });
            //- Set current menu to active
            menuSub.classList.add( 'active' );

            //- Set dropdown menu background style to match current submenu style
            subBg.style.opacity    = 1;
            subBg.style.left       = menuMeta.left - headerMeta.left - ( (subMeta.width / 2) - menuMeta.width / 2 ) + 'px';
            subBg.style.width      = subMeta.width+'px';
            subBg.style.height     = subMeta.height+'px';
            //- Set dropdown menu bottom section background position
            subBgBtm.style.top     = menuSubTop.height+'px';
            // console.log( menuSubBtm );

            //- Set Arrow position
            subArr.style.opacity  = 1;
            subArr.style.left     = menuMeta.left - headerMeta.left + menuMeta.width/2 - 10 + 'px';

            //- Set sub menu style
            subCnt.style.opacity = 1;
            subCnt.style.left    = menuMeta.left - headerMeta.left - ( (subMeta.width / 2) - menuMeta.width / 2 ) + 'px';
            subCnt.style.width   = subMeta.width+'px';
            subCnt.style.height  = subMeta.height+'px';

            //- Set current sub menu style
            menuSub.style.opacity = 1;

            header.classList.add('dropdown-active');

        },
        closeDropdown     = function () {
            //- Remove active class from all menu items
            menuItems.forEach( function(el) { el.classList.remove('active') } );
            //- Remove active class from all sub menus
            menuSubs.forEach ( function(el) {
                el.classList.remove( 'active' );
                el.style.opacity = 0;
            });
            //- set sub menu background opacity
            subBg.style.opacity   = 0;
            //- set arrow opacity
            subArr.style.opacity = 0;


            // unset selected menu
            selectedMenu = undefined;

            header.classList.remove('dropdown-active');
        };


    //- Binding mouse event to each menu items
    menuItems.forEach( function(el) {
        //- mouse enter event
        el.addEventListener( 'mouseenter', function() {
            stopCloseTimeout();
            openDropdown( this );
        }, false );
        //- mouse leave event
        el.addEventListener( 'mouseleave', function() { startCloseTimeout() }, false);

    } );

    //- Binding mouse event to each sub menus
    menuSubs.forEach( function(el) {
        el.addEventListener( 'mouseenter', function() { stopCloseTimeout() }, false );
        el.addEventListener( 'mouseleave', function() { startCloseTimeout() }, false );
    });
})();

(function() {
    if (!document.getElementById('home-canvas'))
        return;

    var width, height, canvas, ctx, circles, target, animateHeader = true;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = 590;
        target = {x: 0, y: height};

        canvas = document.getElementById('home-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        for(var x = 0; x < width*0.62; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }

    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = 590;
        canvas.width = width;
        canvas.height = height;
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;

        // constructor
        (function() {
            _this.pos = {};
            init();
        })();

        function init() {
            _this.pos.x = Math.random()*width;
            _this.pos.y = height+Math.random()*100;
            _this.alpha = 0.1+Math.random()*0.3;
            _this.scale = 0.1+Math.random()*0.32;
            _this.velocity = Math.random();
        }

        this.draw = function() {
            if(_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
            ctx.fill();
        };
    }

})();