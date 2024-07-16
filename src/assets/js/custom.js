const jQuery = require("jquery");


jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > 500) {
        jQuery('.header').addClass("fix");
    } else {
        jQuery('.header').removeClass("fix");
    }
});


jQuery(document).ready(function () {
    onloadmethod();

    /*Menu*/
    jQuery(".top-menu ul ul").parent().addClass("dropdown");
    jQuery(".top-menu ul li.dropdown").append("<span class='arrow'></span>");
    jQuery(".top-menu ul li.dropdown .arrow").click(function () {
        if (jQuery(this).parent().hasClass('open')) {
            jQuery(this).parent().removeClass("open")
        } else {
            jQuery(this).parent().addClass("open")
        }
    });

    // jQuery(".btn-topmenu").click(function (e) {
    //     e.stopPropagation();
    //     jQuery(this).toggleClass("on");
    // });

    jQuery(document).on("click",".btn-topmenu",function (e) {
        e.stopPropagation();
        jQuery(this).toggleClass("on");
    });


    // jQuery('.btn-topmenu').click(function (e) {
    //     e.stopPropagation();
    //     if (jQuery('#MainMenu').hasClass('open')) {
    //         jQuery('#MainMenu').removeClass('open');
    //         jQuery("body").removeClass("hidden-menu");
    //     } else {
    //         jQuery('#MainMenu').addClass('open');
    //         jQuery("body").addClass("hidden-menu");
    //     }
    // });

    jQuery(document).on("click",".btn-topmenu",function (e) {
        e.stopPropagation();
        if (jQuery('#MainMenu').hasClass('open')) {
            jQuery('#MainMenu').removeClass('open');
            jQuery("body").removeClass("hidden-menu");
        } else {
            jQuery('#MainMenu').addClass('open');
            jQuery("body").addClass("hidden-menu");
        }
    });


    // jQuery('.home-product-carousel').owlCarousel({
    //     loop: false,
    //     margin: 10,
    //     dots: true,
    //     autoplay: true,
    //     nav: false,
    //     navText: [,],
    //     responsive: {
    //         0: {
    //             items: 1
    //         },
    //         576: {
    //             items: 2,
    //         },
    //         768: {
    //             items: 4,
    //         },
    //         992: {
    //             items: 5,
    //         },
    //         1200: {
    //             items: 6
    //         },
    //         1400: {
    //             dots: false,
    //             nav: true,
    //             items: 6
    //         }
    //     }
    // });

    // jQuery('.testimonial-carousel').owlCarousel({
    //     loop: false,
    //     margin: 10,
    //     dots: true,
    //     autoplay: true,
    //     nav: false,
    //     navText: [,],
    //     items: 1,
    // })



});



jQuery(window).resize(function () {
    onloadmethod();
});

function onloadmethod() {
    var fullwidth = jQuery('.fullwidth').width();
    jQuery('.fullwidth').css('left', -fullwidth / 2)
}

// AOS.init();


// jquery(document).on('click', '#pull', function(){
//     // alert("success");
//      // menu.slideToggle(500);

//      jquery('#menu-bg').slideToggle(500);

//  });

    jQuery(document).ready(function () {
    // Get all sections that have an ID defined
    const sections = jQuery("section[id]");

    // Add an event listener listening for scroll
    jQuery(window).scroll(navHighlighter);

    function navHighlighter() {
        // Get current scroll position
        let scrollY = jQuery(window).scrollTop();

        // Now we loop through sections to get height, top and ID values for each
        sections.each(function () {
            const current = jQuery(this);
            const sectionHeight = current.outerHeight();
            const sectionTop = current.offset().top - 50;
            const sectionId = current.attr("id");

            /*
            - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
            - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as a selector
            */
            if (
                scrollY > sectionTop &&
                scrollY <= sectionTop + sectionHeight
            ) {
                jQuery(".navigation a[href*=" + sectionId + "]").addClass("active");
            } else {
                jQuery(".navigation a[href*=" + sectionId + "]").removeClass("active");
            }
        });
    }
});

// Refresh-to-top
jQuery(document).ready(function() {
    // Check if the page is being refreshed
    if (performance.navigation.type === 1) {
      // Scroll to the top of the page
      jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
    }
  });
// Refresh-to-top

// Sidebar Dashboard
jQuery(document).ready(() => {
    // Selecting all elements with class "arrow"
    let arrow = jQuery(".arrow");

    // Adding click event to each element with class "arrow"
    arrow.on("click", (e) => {
      // Selecting the main parent of the arrow
      let arrowParent = jQuery(e.target).parent().parent();
      
      // Toggling the "showMenu" class
      arrowParent.toggleClass("showMenu");
    });

    // Selecting elements with classes "sidebar" and "bx-menu"
    jQuery(document).on('click', '.bx-menu', function(){
        let sidebar = jQuery(".sidebar");
        sidebar.toggleClass("close");
    });

    // Selecting elements with class "res-close" to close sidebar and add class "close"
    jQuery(document).on('click', '.res-close', function(){
        let sidebar = jQuery(".sidebar");
        sidebar.addClass("close");
    });
});


//   jQuery(document).on('click', '.form-select.filter-item-select',function(){

//    });

   jQuery(document).ready(function() {
    jQuery('.form-select.filter-item-select').on('click', function() {
        jQuery('.form-select.filter-item-select ul').toggleClass('active');
    });
  });
  