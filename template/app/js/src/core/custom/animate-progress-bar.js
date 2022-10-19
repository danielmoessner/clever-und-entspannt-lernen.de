var AnimateProgressBar = (function() {

    function isElementInViewport(elem) {
        var bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Check if it's time to start the animation.
    function checkAnimation() {
        $( ".progress-bar-animated" ).each(function( index ) {
            var $elem = $(this)
            var elem = this
             // If the animation has already been started
            if ($elem.hasClass('w-100')) return;
            if (isElementInViewport(elem)) {
                // Start the animation
                $elem.addClass('w-100');
            }
        });
    }

    // Capture scroll events
    $(window).scroll(function(){
        checkAnimation();
    });

})();
