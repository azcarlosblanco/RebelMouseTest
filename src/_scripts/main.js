// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';

$(() => {
    
    //Gallery
    //Options
    var showNav = 1;
    var keyboardNav = 1;
    var showCaption = 1;
    var loop = 1;

    //Create overlay items
    var $overlay = $('<div id="overlay"></div>');
    var $image = $('<img>');
    var $holder = $('<div class="holder"></div>');
    var $caption = $('<p></p>');
    var $nav = $('<div class="nav"><a id="close" nohref><i class="far fa-times-circle"></i></a><a id="prev" nohref><span><i class="fas fa-arrow-left"></i></span></a><a id="next" nohref><span><i class="fas fa-arrow-right"></i></span></a></nav>');
    var glength = $('.gallery-img').length;
    var imageIndex, imageLocation, captionText, allowKeyboard;


    //Add overlay items to DOM
    $('#overlay img').before('');
    $holder.append( $image );
    $holder.append( $nav );
    if ( showCaption ){ $holder.append( $caption ); }
    if ( !showNav ){ $nav.hide(); }
    $overlay.append( $holder );
    $("body").append( $overlay );
    
    //Click Slidesshow
    $('.slideshow-container').click( function(event) {
        if (event.target.className == 'slideshow-container') $('img.gallery-img').first().trigger('click');
    });

    //Click image
    $('img.gallery-img').click( function(event) {
        imageLocation = $(this).attr("src");
       
        // index of clicked item
        imageIndex = $('img.gallery-img').index(this) + 1;
        
        //Image focused on
        $image.attr("src", imageLocation);
        
        //Add and remove active class on link
        $(this).addClass('active');
        $('img.gallery-img').not(this).removeClass('active');
        
        //Show alt attribute as caption
        captionText = $(this).attr("alt");
        $caption.text(captionText);
        
        allowKeyboard = 1;
        $overlay.show(); 
    });

    //Close overlay
    $image.click(function() {
        allowKeyboard = 0;
        $($overlay).hide();
    });

    $overlay.click(function(e) {
        if(e.target != this) return;
        $(this).hide();
    });

    $('#close').click(function() {
        $($overlay).hide();
    });

    //Cycle images
    $('#next').click(function() {
        //check to see if its the last image
        if (glength != imageIndex){
            $('.active').closest('.thumbnail').next().find('img.gallery-img').trigger('click');
        } else if (loop == 1){
            $('img.gallery-img').first().trigger('click');
        } 
    });

    $("body").keydown(function(e) {
        if (keyboardNav == 1 && allowKeyboard == 1) {
            if(e.which == 37) { $('#prev').trigger("click"); }
            else if(e.which == 39) { $('#next').trigger("click"); }	
            else if(e.which == 27) { $($overlay).hide(); }	
        }
    });

    $('#prev').click(function() {
        //check to see if its the first image	
        if (imageIndex != 1){
            $('.active').closest('.thumbnail').prev().find('img.gallery-img').trigger('click');	
        } else if (loop == 1){
            $('img.gallery-img').last().find('img').trigger('click');
        }  
    });

    // Responsive
    $(window).on('resize', function(){
        var win = $(this); //this = window
        if (win.width() >= 1050) {
            console.log('resize')
            $('.menu, .menu-secondary').css('display','flex');
         } else {
            $('.menu, .menu-secondary').css('display','none');
         }
    });

    $('.fas.fa-bars').click(function() {
        $('.menu, .menu-secondary').toggle();
    });
});
