;window.KARIMHMAISSI = (function (jQuery) {

	"use strict";
	

	var init = function () {
		setHeightOfPortfolioItems();

		if(!isMobile()) {
			initPortfolioWaypoints();
		}

		velocityAnimations();
		
		initSlowScroll();

		initMobileMenu();
	};	

	var isMobile = function () {
		return $("body").width() < 	720;
	};

	var setHeightOfPortfolioItems = function () {
		
		if($("body").width() > 910) {
			// $(".portfolio-copy-wrapper").height($(".portfolio-image").height());
			$(".portfolio-image").height($(".portfolio-copy-wrapper").height() + "px");
			
		} else {
		}
		
	};


	var initPortfolioWaypoints = function () {
		var addWaypoint = function (i, el) {
			var $el = $(el);

			var $img = $el.find("img");
			var imgSrc = $img.attr("src");

			var waypointActivated = function (waypointElement) {

				//remove all gifs
				$(".portfolio-item").each(function (i, el) {
					var active = $(el).hasClass("active");
 
					if(active) {

						//static img
						$(el).find("img").attr("src", $(el).find("img").attr("src").replace(".gif", "_Static.gif"));
					}
				});

				//remove all active classes
				$(".portfolio-item").removeClass("active");

				$(waypointElement).addClass("active");

				//swap out static image for gif
				$img.attr("src", imgSrc.replace("_Static.gif", ".gif"));
			}



			//init waypoints
			$el.waypoint(function (direction) {
			
				if(direction === "down") waypointActivated(this.element);

			}, {offset: "50%"});

			$el.waypoint(function (direction) {
			
				if(direction === "up") waypointActivated(this.element);

			}, {offset: "5%"});
		};


		$(".portfolio-item").each(addWaypoint);	
	};

	var initSlowScroll = function  () {
	// https://css-tricks.com/snippets/jquery/smooth-scrolling/
	  $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top - 60
	        }, 600);
	        return false;
	      }
	    }
	  });
		
	};


	var velocityAnimations = function () {
		// $(".fade-up-in").velocity("transition.slideUpIn");	

		if(!isMobile()) {
			$(".nav-menu > li").velocity("transition.slideDownIn", {stagger: 150, display: "inline-block"});
		}
		$(".fade-down-in").velocity("transition.slideDownIn", { display: "block", delay: 0});

		$(".slide-up-in").velocity("transition.slideUpIn", {stagger: 150, display: "block", delay: 800, duration: 250});

		$(".experiences > span").velocity({"color": "#d8334a", translateX: 100}, {stagger: 150, display: "inline", delay: 1025, duration: 400});

	};


	var initMobileMenu = function () {
		
		var menuToggle = function (e) {
			e.preventDefault();
			var $el = $(this);

			// $("body").toggleClass("active");	

			if($("body").hasClass("active")) {
				$("body").removeClass("active");
				slideout.close();
			} else {
				if(!$("body").hasClass("active")) {
					$("body").addClass("active");
				}
				slideout.open();

			}


		};

		$(".menu-toggle-wrapper, .close-mobile-menu-btn").click(menuToggle);


		var slideout = new Slideout({
			"panel": $(".push").get(0),
			"menu": $("nav .collapse").get(0),
			"padding": 256,
			"tolerance": 70
		});


		slideout.on("open", function () {
			if(!$("body").hasClass("active")) {
				$("body").addClass("active");
			}


			
		});

		slideout.on("close", function () {
			$("body").removeClass("active");
		});


	};


	return {
		init: init
	}


}($));


$(function () {
	window.KARIMHMAISSI.init();
});

