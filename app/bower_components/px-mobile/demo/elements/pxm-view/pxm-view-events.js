window.px = window.px || {};

function ontouch(el, callback) {
  var touchsurface = el,
    dir,
    swipeType,
    startX,
    startY,
    distX,
    distY,
    dist = 0,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 500, // maximum time allowed to travel that distance
    elapsedTime,
    startTime;

  var handletouch = callback || function(evt, dir, phase, swipetype, distance) {
    console.warn('handleTouch', evt, dir, phase, swipetype, distance);
  };

  var onTouchStart = function(e) {
    var touchobj = e.changedTouches[0];
    dir = 'none';
    swipeType = 'none';
    startX = touchobj.pageX;
    startY = touchobj.pageY;
    var startTime = new Date().getTime(); // record time when finger first makes contact with surface
    handletouch(e, 'none', 'start', swipeType, 0); // fire callback function with params dir="none", phase="start", swipetype="none" etc
    e.preventDefault();

  };

  var onTouchMove = function(e) {
    var touchobj = e.changedTouches[0];
    distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
    distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
    if (Math.abs(distX) > Math.abs(distY)) { // if distance traveled horizontally is greater than vertically, consider this a horizontal movement
      dir = (distX < 0) ? 'left' : 'right';
      handletouch(e, dir, 'move', swipeType, distX); // fire callback function with params dir="left|right", phase="move", swipetype="none" etc
    } else { // else consider this a vertical movement
      dir = (distY < 0) ? 'up' : 'down';
      handletouch(e, dir, 'move', swipeType, distY); // fire callback function with params dir="up|down", phase="move", swipetype="none" etc
    }
    e.preventDefault(); // prevent scrolling when inside DIV
  };


  var onTouchEnd = function(e) {
    var touchobj = e.changedTouches[0];
    elapsedTime = new Date().getTime() - startTime; // get time elapsed

    if (elapsedTime <= allowedTime) { // first condition for awipe met
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
        swipeType = dir; // set swipeType to either "left" or "right"
      } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
        swipeType = dir; // set swipeType to either "top" or "down"
      }
    }
    // Fire callback function with params dir="left|right|up|down", phase="end", swipetype=dir etc:
    handletouch(e, dir, 'end', swipeType, (dir === 'left' || dir === 'right') ? distX : distY);
    e.preventDefault();
  };


  touchsurface.addEventListener('touchstart', onTouchStart, false);
  touchsurface.addEventListener('touchmove', onTouchMove, false);
  touchsurface.addEventListener('touchend', onTouchEnd, false);

  touchsurface.addEventListener('dragstart', onTouchStart, false);
  touchsurface.addEventListener('drag', onTouchMove, false);
  touchsurface.addEventListener('dragend', onTouchEnd, false);

}


// USAGE:
/*
    ontouch(el, function(evt, dir, phase, swipetype, distance) {
      var touchreport = ''
      touchreport += '<b>Dir:</b> ' + dir + '<br />' // up down left right
      touchreport += '<b>Phase:</b> ' + phase + '<br />' //move / end
      touchreport += '<b>Swipe Type:</b> ' + swipetype + '<br />'
      touchreport += '<b>Distance:</b> ' + distance + '<br />'

      console.group('ontouch');
      console.log('Dir', dir);
      console.log('Phase', phase);
      console.log('Type', swipetype);
      console.log('Distance', distance);
      console.groupEnd();

      if(dir === 'left' && phase === 'end'){
        document.getElementById('appViews').prev();
      }
      if(dir === 'right' && phase === 'end'){
        document.getElementById('appViews').next();
      }
    });

*/


var ViewEventsBehavior = {

};

ViewEventsBehavior.attached = function() {
  console.warn('ViewEventsBehavior attached');
};

px.mobile.behaviors = px.mobile.behaviors || {};
px.mobile.behaviors.ViewEventsBehavior = ViewEventsBehavior;
