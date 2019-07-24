//Navigation Bar JS not using pj5
var nav = document.getElementById("cylon-eye");

$(document).ready(function() { //To animate make sure to define position type
    
    // The tabs on the side menu
    var tab = $("li");
    
    // The sliding guide to the left of the menu
    var eye = $("#guide");
    
    // Root of the anvigation bar
    var nav = $("#navigation");
    
    // Speed param of hover highlight
    var speed_highlight = 100;
    
    // The speed at which the guide will move
    var speed_hover = 350;
    
    // The initial spacing 
    var initial_offset = $("li.active").offset();
    
    // Moves the guide to the initial position near the active tab
    eye.animate({top: initial_offset.top}, 0);
    $("body").hide().fadeIn(2000);
    
    //Adding animation to make the greeting fade into the page
    $("#greeting").hide().fadeIn(3000);
    
    //When we hover over a tab create red border bottom
    tab.hover(function() {
        $(this).animate({borderBottomColor: "#fe0606", borderBottomStyle: "solid", borderBottomWidth: "5px"}, speed_highlight);
    }, function() {
        $(this).animate({borderBottomWidth: "0px"}, speed_highlight);
    });
    
    //When we hover over record pos in y direction and have the guide travel to that y-pos
    tab.mouseenter(function(){
        //First thing is to grab the position of the mouse but in particular the position of the box
        var offset = $(this).offset();
        eye.stop(true, false);//stopped bad queuing
        eye.animate({top: offset.top}, speed_hover);
    });
    
    tab.mouseleave(function(){
        var offset = $("li.active").offset();
        eye.stop(true, false);//stopped bad queueing
        eye.animate({top: offset.top}, speed_hover);
    });
    
    //In the case of a Resize event for the nav-bar
    $(window).resize(function(){
        var offset = $("li.active").offset();
        eye.stop(true, false);
        eye.animate({top: offset.top}, speed_hover);
    });
    
});