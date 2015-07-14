$(document).ready(function(){
  //This is for the navigation bar for removing and toggling the active class
  $('li').on('click', function(){
    $('li').removeClass('active')//removes active class from all li elements
    $(this).toggleClass('active')//adds and allows for toggle of li active to class to a clicked element
  });
  //Create a function that will allow for this to apply in only one case in lieu of every element with this class
  
  function socialDropDown($socialTab, $socialContent, $socialTitle){
    $socialTab.on("click",function(){//on click
      $socialTab.toggleClass("social-js-1");//add the class 
      $socialContent.toggleClass("content-js-1");//add the class
      $socialTitle.toggleClass("title-js-1");//add the class
    
    });
  }
    //function ends
    socialDropDown( $('.social-tab-1'),$('.social-content-one'),$('.social-title-one'));
    socialDropDown($('.social-tab-2'), $(".social-content-two"),$("social-title-two"));
    socialDropDown($('.social-tab-3'), $(".social-content-three"),$("social-title-three"));
    socialDropDown($('.social-tab-4'), $(".social-content-four"),$("social-title-four"));
    
  //This will run code every second 
  setInterval(main, 1000);
 
function main(){//this is the function that is running every second 
    function description(slide, id){//this is the function that will apply the description animation
      if(slide.attr('class') == "active"){//checks if slide is active
        id.fadeIn().animate({bottom:'250'});//does animation
       }
      else {
       id.fadeOut().animate({bottom:'10'});//if slide is not active it resets
      }
    }
    
  description($('#slide1'), $('#slide_one_title'));//this is the function being called
  description($('#slide2'),$('#slide_two_title'));
  description($('#slide3'),$('#slide_three_title'));
};//end of time loop function 
});

