$(document).ready(function() {
    // Nav effect
    $('.js--section-destinations').waypoint(function(direction) {
        if(direction == "down"){
            $('nav').addClass('nav-persistent');
        } else {
            $('nav').removeClass('nav-persistent');
        }
    }, {
        offset: '60px;'
    });
    // Scroll on arrow
    $('.js--scroll-to-destinos').click(function (){
        $('html,body').animate({scrollTop: $('.js--section-destinations').offset().top},1000);
    });
});