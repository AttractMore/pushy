/*! Pushy - v1.3.0 - 2019-6-25
* Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
* https://github.com/christophery/pushy/
* by Christopher Yee
* Modified to remove jquery dependency RK December 2020*/

(function () {
	var pushy = document.getElementsByClassName('pushy')[0], //menu css class
		body = document.getElementsByTagName('body')[0],
		push = document.getElementsByClassName('push')[0], //css class to add pushy capability
		pushyLeft = 'pushy-left', //css class for left menu position
		pushyOpenLeft = 'pushy-open-left', //css class when menu is open (left position)
		pushyOpenRight = 'pushy-open-right', //css class when menu is open (right position)
		siteOverlay = document.getElementsByClassName('site-overlay')[0], //site overlay
    menuBtnClass = '.menu-btn'; //set default menu button CSS class
    menuBtnItem = document.getElementById('burger'),
		//menuLinkFocus = $(pushy.data('focus')), //focus on link when menu is open
		menuSpeed = 200, //jQuery fallback menu speed
    menuWidth = getWidth(pushy) + 'px';

	//css classes to toggle the menu
	   var menuBtn = menuBtnClass + ', .pushy-link';

	//css class to focus when menu is closed w/ esc key
	   var menuBtnFocus = menuBtnClass;

    var containerSelector = '#container';
    var container = containerSelector;

    document.addEventListener('keyup', function(e) {
      if (e.keyCode == 27) {

			//check if menu is open
			if( body.classList.contains(pushyOpenLeft) || body.classList.contains(pushyOpenRight) ){
				closePushy(); //close pushy

				//focus on menu button after menu is closed
				if(menuBtnFocus){
					menuBtnFocus.focus();
				}
			}
		}
	});

  function getWidth(el) {
      var d = /^\d+(px)?$/i;
      if (window.getComputedStyle) el = parseFloat(getComputedStyle(el, null).width.replace("px", ""));
      else {
          var c = el.currentStyle.width;
          if (d.test(c)) el = parseInt(c);
          else {
              d = el.style.left;
              var e = el.runtimeStyle.left;
              el.runtimeStyle.left = el.currentStyle.left;
              el.style.left = c || 0;
              c = el.style.pixelLeft;
              el.style.left = d;
              el.runtimeStyle.left = e;
              el = c;
          }
      }
      return el
  };

	function togglePushy() {
		//add class to body based on menu position
		if( pushy.classList.contains(pushyLeft) ){
			body.classList.toggle(pushyOpenLeft);
		}else{
			body.classList.toggle(pushyOpenRight);
		}
  }

	function closePushy(){
		if( pushy.classList.contains(pushyLeft) ){
			body.classList.remove(pushyOpenLeft);
		}else{
			body.classList.remove(pushyOpenRight);
		}
	}

	function openPushyFallback(){
		//animate menu position based on CSS class
		if( pushy.classList.contains(pushyLeft) ){
			body.classList.add(pushyOpenLeft);
			pushy.animate({left: "0px"}, menuSpeed);
			container.animate({left: menuWidth}, menuSpeed);
			//css class to add pushy capability
			push.animate({left: menuWidth}, menuSpeed);
		}else{
			body.classList.add(pushyOpenRight);
			pushy.animate({right: '0px'}, menuSpeed);
			container.animate({right: menuWidth}, menuSpeed);
			push.animate({right: menuWidth}, menuSpeed);
		}

		//focus on link in menu
		if(menuLinkFocus){
			menuLinkFocus.focus();
		}
	}

	function closePushyFallback(){
		//animate menu position based on CSS class
		if( pushy.classList.contains(pushyLeft) ){
			body.classList.remove(pushyOpenLeft);
			pushy.animate({left: "-" + menuWidth}, menuSpeed);
			container.animate({left: "0px"}, menuSpeed);
			//css class to add pushy capability
			push.animate({left: "0px"}, menuSpeed);
		}else{
			body.classList.remove(pushyOpenRight);
			pushy.animate({right: "-" + menuWidth}, menuSpeed);
			container.animate({right: "0px"}, menuSpeed);
			push.animate({right: "0px"}, menuSpeed);
		}
	}
	//toggle menu
	menuBtnItem.addEventListener('click', function(){
		togglePushy();
	});
	//close menu when clicking site overlay
	siteOverlay.addEventListener('click', function(){
		togglePushy();
	});
})();
