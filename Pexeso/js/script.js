// $('a[href*="#"]')
//         .not('[href="#"]')
//         .not('[href="#0"]')
//         .click(function(event) {
//             if (
//                 location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
//                 location.hostname == this.hostname
//             ) {
//                 var target = $(this.hash);
//                 target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//                 if (target.length) {
//                     event.preventDefault();
//                     $('html, body').animate({
//                         scrollTop: target.offset().top
//                     }, 1000, function() {
//                         var $target = $(target);
//                         $target.focus();
//                         if ($target.is(":focus")) {
//                             return false;
//                         } else {
//                             $target.attr('tabindex', '-1');
//                             $target.focus();
//                         };
//                     });
//                 }
//             }
//         });

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px 
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
*/