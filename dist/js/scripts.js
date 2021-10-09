console.log(1);
'use strict';
var jsmenu = document.getElementById('js-menu');

// jsmenu.addEventListener('click',function(){
//   jsmenu.classList.toggle('is-open');
// });

// var jsmenuOverlay = document.getElementById('js-menu-overlay');
// jsmenuOverlay.addEventListener('click',function(){
//   jsmenu.classList.remove('is-open');
// });



$(function(){


    // 繰り返し処理

  var thum=$('.fade-list-item'); //オブジェクトを取得
  var interval=100; //フェードインさせる間隔
  thum.each(function(i){
    $(this).delay(i*interval).queue(function(){
      $(this).css('opacity','1').css('transform','translateY(0)');
    });
  });

});


window.onload = function() {
  const spinner = document.getElementById('loading');
  spinner.classList.add('loaded');
  var slide01num = 0;
  $('.slider01').each(function(){


    $('#slide'+slide01num).slick({
      centerMode: true,
      autoplay:false,
      dots:true,
      variableWidth: true,
      focusOnSelect: true,
      asNavFor: "#slide_nav"+slide01num,
      prevArrow: '<div class="card-list__left-arrow icon icon-arrow_left"></div>',
      nextArrow: '<div class="card-list__right-arrow icon icon-arrow_right"></div>'
    });

    $('#slide_nav'+slide01num).slick({
      centerMode: true,
      autoplay:false,
      dots:true,
      asNavFor: "#slide"+slide01num,
      prevArrow: '<div class="card-detail__left-arrow icon icon-arrow_left"></div>',
      nextArrow: '<div class="card-detail__right-arrow icon icon-arrow_right"></div>',
      responsive: [{
        breakpoint: 768,　
        settings: {
          slidesToShow: 1
         }
     }]
    });
        slide01num++;
  }); 




// モーダルウィンドウを開く

  $('.js-modal-open').on('click', function(){
    var target = $(this).data('target');
    var modal = document.getElementById(target);
    scrollPosition = $(window).scrollTop();
    $('.card-detail__inner').addClass('star7');
    setTimeout(function(){
      $('body').addClass('fixed').css({'top': -scrollPosition});
      //$(modal).fadeIn();
      $(modal).addClass('open');
      return false;
    },300);


  });

// モーダルウィンドウを閉じる
var clickEventType = (( window.ontouchstart!==null ) ? 'click':'touchend');
$('.js-modal-close').on('click', function(e){
  e.preventDefault();
  $('body').removeClass('fixed');
  window.scrollTo( 0 , scrollPosition );
  $('.card-detail__inner').removeClass('star7');
  //$('.js-modal').fadeOut();
  $('.modal').removeClass('open');

  return false;
});

  $('.animate-hover').hover(
    function(){
      $(this).find('.icon-arrow_right').addClass('animated slideInLeft');
    },
    function () {
      $(this).find('.icon-arrow_right').removeClass('animated slideInLeft');
    }
  );

  $('.card-list__list-item').hover(
    function(){
      $(this).addClass('animated pulse');
    },
    function () {
      $(this).removeClass('animated pulse');
    }
  );
  // MicroModal.init();
  // var luminousTrigger = document.querySelectorAll('.luminous');
// if( luminousTrigger !== null ) {
//   new LuminousGallery(luminousTrigger);
// }
}

