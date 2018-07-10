$(window).on("load",function(){ "use strict";
    $(".loader").fadeOut(800);
});

// NAVIGATION
jQuery(document).ready(function($){
	var mainHeader = $('.cd-auto-hide-header'),
		secondaryNavigation = $('.cd-secondary-nav'),
		//this applies only if secondary nav is below intro section
		belowNavHeroContent = $('.sub-nav-hero'),
		headerHeight = mainHeader.height();

	//set scrolling variables
	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 150;

	mainHeader.on('click', '.nav-trigger', function(event){
		// open primary navigation on mobile
		event.preventDefault();
		mainHeader.toggleClass('nav-open');
	});

	$(window).on('scroll', function(){
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame)
				? setTimeout(autoHideHeader, 250)
				: requestAnimationFrame(autoHideHeader);
		}
	});

	$(window).on('resize', function(){
		headerHeight = mainHeader.height();
	});

	function autoHideHeader() {
		var currentTop = $(window).scrollTop();

		( belowNavHeroContent.length > 0 )
			? checkStickyNavigation(currentTop) // secondary navigation below intro
			: checkSimpleNavigation(currentTop);

	   	previousTop = currentTop;
		scrolling = false;
	}

	function checkSimpleNavigation(currentTop) {
		//there's no secondary nav or secondary nav is below primary nav
	    if (previousTop - currentTop > scrollDelta) {
	    	//if scrolling up...
	    	mainHeader.removeClass('is-hidden');
	    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
	    	//if scrolling down...
	    	mainHeader.addClass('is-hidden');
	    }
	}

	function checkStickyNavigation(currentTop) {
		//secondary nav below intro section - sticky secondary nav
		var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();

		if (previousTop >= currentTop ) {
	    	//if scrolling up...
	    	if( currentTop < secondaryNavOffsetTop ) {
	    		//secondary nav is not fixed
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.removeClass('fixed slide-up');
	    		belowNavHeroContent.removeClass('secondary-nav-fixed');
	    	} else if( previousTop - currentTop > scrollDelta ) {
	    		//secondary nav is fixed
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.removeClass('slide-up').addClass('fixed');
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	}

	    } else {
	    	//if scrolling down...
	 	  	if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
	 	  		//hide primary nav
	    		mainHeader.addClass('is-hidden');
	    		secondaryNavigation.addClass('fixed slide-up');
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	} else if( currentTop > secondaryNavOffsetTop ) {
	    		//once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.addClass('fixed').removeClass('slide-up');
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	}

	    }
	}
}); // NAVIGATION


jQuery(function ($) {
	"use strict";

    //scroll sections on clicking Links
    $(".scroll").on('click', function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1000);
    });

    /* ================================== cover sliders start ============================ */
	    var swiper = new Swiper('.horizontal-slider', {
	        pagination: '.swiper-pagination',
	        slidesPerView: 3,
	        paginationClickable: true,
            //noSwipingClass:true,
            touchReleaseOnEdges:true,
	        spaceBetween: 0
	    });
        var swiper = new Swiper('.vertical-slider', {
            //pagination: '.swiper-pagination',
            slidesPerView: 3,
            //noSwipingClass:true,
            touchReleaseOnEdges:true,
            iOSEdgeSwipeDetection:true,
            //paginationClickable: true,
            touchRatio: 0,
            spaceBetween: 0,
            direction: 'vertical'
        });
        var swiper = new Swiper('.mrperfect', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev'
        });
        var swiper = new Swiper('.quiz-mrperfect', {
            pagination: '.swiper-pagination',
            paginationClickable: false
        });
        var swiper = new Swiper('.ceritanya', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev'
        });

        var swiper_quiz = new Swiper('.the-quiz', {
            pagination: '.swiper-pagination',
            paginationClickable: false,
            touchMoveStopPropagation:false,
            simulateTouch:false,
            resistance:false,
            grabCursor: false,
            touchReleaseOnEdges:true,
            allowSwipeToNext: true,
            allowSwipeToPrev: true,
            allowPageScroll: "true ",
            autoHeight:"true",
            nextButton: '.next-btn',
            prevButton: '.swiper-button-prev',
            slideToClickedSlide: true,
            touchRatio: 0
        });
        // Action Form
        $('.swiper-container').each(function(i, obj) {
            $(this).parent().find('.arrow-right-step1').on('click', function(e){
                var status_menikah = $('input[name="status_menikah"]:checked').length > 0;
                var base_url = $(this).data('url');
                $(".loader").fadeIn(500);
                if(status_menikah == true){
                    var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
                    $.ajax({
                        type:"GET",
                        url: base_url+'/questions-category',
                        data:{
                            id:$('input[name="status_menikah"]:checked').val(),
                            _token: CSRF_TOKEN
                        },
                        success: function(html){
                            if(html.status === '404'){
                                alert('Silahkan coba lagi');
                                window.location.href=base_url;
                            }else{
                                $('#questions-category').html(html);
                                $(".loader").fadeOut(500);
                                swiper_quiz.slideNext();
                            }
                        }
                    });
                    return false;
                }else{
                    $(".loader").fadeOut(500);
                    $('.mess_status_nikah').addClass('alert alert-danger');
                    $('.mess_status_nikah').html('Silahkan pilih status anda.');
                    return false;
                }
            });
            $(this).parent().on("click",".arrow-right-step2", function(){
                var option_question = $('input[name="option_question[]"]:checked').length > 0;
                $(".loader").fadeIn(100);
                if(option_question == true){
                    if(swiper_quiz.slideNext()){
                        $(".loader").fadeOut(500);
                    }
                }else{
                    $(".loader").fadeOut(500);
                    $('.mess_category').addClass('alert alert-danger');
                    $('.mess_category').html('Silahkan pilih minimal satu dari prioritas anda.');
                    return false;
                }
            });
            $(this).parent().on("click",".submit", function(){
                var base_url = $(this).data('url');
                var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
                $(".loader").fadeIn(500);
                $.ajax({
                    type:"POST",
                    url: base_url+'/quiz-proses',
                    data:$("#quiz-form").serialize(),
                    success: function(data){
                        $(".loader").fadeOut(500);
                        console.log(data);
                        if(data.status == 'success'){
                            window.location.href=data.url;
                        }else if(data.status == '404'){
                            alert('Silahkan coba lagi.');
                            window.location.href=base_url;
                        }else{
                            var errorString = '';
                            $.each( data.message, function( key, value) {
                                errorString += '<li>' + value + '</li>';
                            });
                            $('.mess').addClass('alert alert-danger');
                            $('.mess').html(errorString);
                        }
                    }
                });
                return false;
            });
        });
        // ./Action Form
        /*var swiper = new Swiper('.main-slider', {
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            speed: 1600,
            effect: "fade",
            loop: true,
            autoplay: 5000
        });*/

        /*var swiper = new Swiper('.parallax-slider', {
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            speed: 600,
            autoplay: 5000
        });*/


    // Embedded video modals

    $('iframe[data-provider]').each(function(){
        var provider = jQuery(this).attr('data-provider');
        var videoID = jQuery(this).attr('data-video-id');
        var autoplay = jQuery(this).attr('data-autoplay');
        var vidURL = '';

        if(provider == 'vimeo'){
            vidURL = "http://player.vimeo.com/video/"+videoID+"?badge=0&title=0&byline=0&title=0&autoplay="+autoplay;
            $(this).attr('data-src', vidURL);
        }else if (provider == 'youtube'){
            vidURL = "https://www.youtube.com/embed/"+videoID+"?showinfo=0&autoplay="+autoplay;
            $(this).attr('data-src', vidURL);
        }else{
            console.log('Only Vimeo and Youtube videos are supported at this time');
        }
    });

    // Video Modals

    jQuery('.close-iframe').click(function() {
        jQuery(this).closest('.modal-video').removeClass('reveal-modal');
        jQuery(this).siblings('iframe').attr('src', '');
        jQuery(this).siblings('video').get(0).pause();
    });

    // Local Videos

    $('section').closest('body').find('.local-video-container .play-button').click(function() {
        $(this).siblings('.background-image-holder').removeClass('fadeIn');
        $(this).siblings('.background-image-holder').css('z-index', -1);
        $(this).css('opacity', 0);
        $(this).siblings('video').get(0).play();
    });

    // Youtube Videos

    $('section').closest('body').find('.player').each(function() {
        var section = $(this).closest('section');
        section.find('.container').addClass('fadeOut');
        var src = $(this).attr('data-video-id');
        var startat = $(this).attr('data-start-at');
        $(this).attr('data-property', "{videoURL:'http://youtu.be/" + src + "',containment:'self',autoPlay:true, mute:true, startAt:" + startat + ", opacity:1, showControls:false}");
    });

	if($('.player').length){
        $('.player').each(function(){

            var section = $(this).closest('section');
            var player = section.find('.player');
            player.YTPlayer();
            player.on("YTPStart",function(e){
                section.find('.container').removeClass('fadeOut');
                section.find('.masonry-loader').addClass('fadeOut');
            });

        });
    }

    // Append .background-image-holder <img>'s as CSS backgrounds

    $('.background-image-holder').each(function() {
        var imgSrc = $(this).children('img').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('img').hide();
        $(this).css('background-position', 'initial');
    });

    // Fade in background images

    setTimeout(function() {
        $('.background-image-holder').each(function() {
            $(this).addClass('fadeIn');
        });
    }, 200);

    // Multipurpose Modals

    jQuery('.foundry_modal[modal-link]').remove();

    if($('.foundry_modal').length && (!jQuery('.modal-screen').length)){
        // Add a div.modal-screen if there isn't already one there.
        var modalScreen = jQuery('<div />').addClass('modal-screen').appendTo('body');

    }

    jQuery('.foundry_modal').click(function(){
        jQuery(this).addClass('modal-acknowledged');
    });

    $('.modal-container:not([modal-link])').each(function(index) {
        if(jQuery(this).find('iframe[src]').length){
        	jQuery(this).find('.foundry_modal').addClass('iframe-modal');
        	var iframe = jQuery(this).find('iframe');
        	iframe.attr('data-src',iframe.attr('src'));
            iframe.attr('src', '');

        }
        jQuery(this).find('.btn-modal').attr('modal-link', index);

        // Only clone and append to body if there isn't already one there
        if(!jQuery('.foundry_modal[modal-link="'+index+'"]').length){
            jQuery(this).find('.foundry_modal').clone().appendTo('body').attr('modal-link', index).prepend(jQuery('<i class="ti-close close-modal">'));
        }
    });

    $('.btn-modal').unbind('click').click(function(){
    	var linkedModal = jQuery('.foundry_modal[modal-link="' + jQuery(this).attr('modal-link') + '"]');
        jQuery('.modal-screen').toggleClass('reveal-modal');
        if(linkedModal.find('iframe').length){
            if(linkedModal.find('iframe').attr('data-autoplay') === '1'){
                var autoplayMsg = '&autoplay=1'
            }
        	linkedModal.find('iframe').attr('src', (linkedModal.find('iframe').attr('data-src') + autoplayMsg));
        }
        linkedModal.toggleClass('reveal-modal');
        return false;
    });

    jQuery('.close-modal:not(.modal-strip .close-modal)').unbind('click').click(function(){
    	var modal = jQuery(this).closest('.foundry_modal');
        modal.toggleClass('reveal-modal');
        if(typeof modal.attr('data-cookie') !== "undefined"){
            mr_cookies.setItem(modal.attr('data-cookie'), "true", Infinity);
        }
    	if(modal.find('iframe').length){
            modal.find('iframe').attr('src', '');
        }
        jQuery('.modal-screen').removeClass('reveal-modal');
    });

    jQuery('.modal-screen').unbind('click').click(function(){
        if(jQuery('.foundry_modal.reveal-modal').find('iframe').length){
            jQuery('.foundry_modal.reveal-modal').find('iframe').attr('src', '');
        }
    	jQuery('.foundry_modal.reveal-modal').toggleClass('reveal-modal');
    	jQuery(this).toggleClass('reveal-modal');
    });

    jQuery(document).keyup(function(e) {
		 if (e.keyCode == 27) { // escape key maps to keycode `27`
            if(jQuery('.foundry_modal').find('iframe').length){
                jQuery('.foundry_modal').find('iframe').attr('src', '');
            }
			jQuery('.foundry_modal').removeClass('reveal-modal');
			jQuery('.modal-screen').removeClass('reveal-modal');
		}
	});

}); //End jQuery



/* SLIDE IN PANEL */
jQuery(document).ready(function($){
    //open the lateral panel
    $('.cd-btn').on('click', function(event){
        event.preventDefault();
        $('.cd-panel').addClass('is-visible');
    });
    //clode the lateral panel
    $('.cd-panel').on('click', function(event){
        if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) {
            $('.cd-panel').removeClass('is-visible');
            event.preventDefault();
        }
    });
});
/* SLIDE IN PANEL END */

// Share Button //
/*$(document).ready(function () {
  FB.init({
    appId       : '276598076182564',
  });
    $('#share-facebook').click(function (e) {
        e.preventDefault();
        FB.ui({
            method: 'feed',
            name: 'Manulife #jadiAndalan',
            link: $(this).data('url'),
            caption: '',
            description: $(this).data('description'),
            picture :$(this).data('picture')
        },
        function(response) {
        if (response && response.post_id) {
          alert('Post was published.');
        } else {
          alert('Post was not published.');
        }
      });

    });
});*/
// ./Share Button //
