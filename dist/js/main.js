console.log(1);
'use strict';
var jsmenu = document.getElementById('js-menu');

jsmenu.addEventListener('click',function(){
  jsmenu.classList.toggle('is-open');
});

var jsmenuOverlay = document.getElementById('js-menu-overlay');
jsmenuOverlay.addEventListener('click',function(){
  jsmenu.classList.remove('is-open');
});