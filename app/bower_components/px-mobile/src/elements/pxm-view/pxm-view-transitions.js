var transitions = [{
  leave: 'moveToLeft',
  enter: 'moveFromRight'
}, {
  leave: 'moveToRight',
  enter: 'moveFromLeft'
}, {
  leave: 'moveToBottom',
  enter: 'moveFromTop'
}, {
  leave: 'fade',
  enter: 'moveFromRight ontop'
}, {
  leave: 'fade',
  enter: 'moveFromLeft ontop'
}, {
  leave: 'fade',
  enter: 'moveFromBottom ontop'
}, {
  leave: 'fade',
  enter: 'moveFromTop ontop'
}, {
  leave: 'moveToLeftFade',
  enter: 'moveFromRightFade'
}, {
  leave: 'moveToRightFade',
  enter: 'moveFromLeftFade'
}, {
  leave: 'moveToTopFade',
  enter: 'moveFromBottomFade'
}, {
  leave: 'moveToBottomFade',
  enter: 'moveFromTopFade'
}, {
  leave: 'moveToLeftEasing ontop',
  enter: 'moveFromRight'
}, {
  leave: 'moveToRightEasing ontop',
  enter: 'moveFromLeft'
}, {
  leave: 'moveToTopEasing ontop',
  enter: 'moveFromBottom'
}, {
  leave: 'moveToBottomEasing ontop',
  enter: 'moveFromTop'
}, {
  leave: 'scaleDown',
  enter: 'moveFromRight ontop'
}, {
  leave: 'scaleDown',
  enter: 'moveFromLeft ontop'
}, {
  leave: 'scaleDown',
  enter: 'moveFromBottom ontop'
}, {
  leave: 'scaleDown',
  enter: 'moveFromTop ontop'
}, {
  leave: 'scaleDown',
  enter: 'scaleUpDown delay300'
}, {
  leave: 'scaleDownUp',
  enter: 'scaleUp delay300'
}, {
  leave: 'moveToLeft ontop',
  enter: 'scaleUp'
}, {
  leave: 'moveToRight ontop',
  enter: 'scaleUp'
}, {
  leave: 'moveToTop ontop',
  enter: 'scaleUp'
}, {
  leave: 'moveToBottom ontop',
  enter: 'scaleUp'
}, {
  leave: 'scaleDownCenter',
  enter: 'scaleUpCenter delay400'
}, {
  leave: 'rotateRightSideFirst',
  enter: 'moveFromRight delay20 ontop'
}, {
  leave: 'rotateLeftSideFirst',
  enter: 'moveFromLeft delay20 ontop'
}, {
  leave: 'rotateTopSideFirst',
  enter: 'moveFromTop delay20 ontop'
}, {
  leave: 'rotateBottomSideFirst',
  enter: 'moveFromBottom delay20 ontop'
}, {
  leave: 'flipOutRight',
  enter: 'flipInLeft delay500'
}, {
  leave: 'flipOutLeft',
  enter: 'flipInRight delay500'
}, {
  leave: 'flipOutTop',
  enter: 'flipInBottom delay500'
}, {
  leave: 'flipOutBottom',
  enter: 'flipInTop delay500'
}, {
  leave: 'rotateFall ontop',
  enter: 'scaleUp'
}, {
  leave: 'rotateOutNewspaper',
  enter: 'rotateInNewspaper delay500'
}, {
  leave: 'rotatePushLeft',
  enter: 'moveFromRight'
}, {
  leave: 'rotatePushRight',
  enter: 'moveFromLeft'
}, {
  leave: 'rotatePushTop',
  enter: 'moveFromBottom'
}, {
  leave: 'rotatePushBottom',
  enter: 'moveFromTop'
}, {
  leave: 'rotatePushLeft',
  enter: 'rotatePullRight delay180'
}, {
  leave: 'rotatePushRight',
  enter: 'rotatePullLeft delay180'
}, {
  leave: 'rotatePushTop',
  enter: 'rotatePullBottom delay180'
}, {
  leave: 'rotatePushBottom',
  enter: 'rotatePullTop delay180'
}, {
  leave: 'rotateFoldLeft',
  enter: 'moveFromRightFade'
}, {
  leave: 'rotateFoldRight',
  enter: 'moveFromLeftFade'
}, {
  leave: 'rotateFoldTop',
  enter: 'moveFromBottomFade'
}, {
  leave: 'rotateFoldBottom',
  enter: 'moveFromTopFade'
}, {
  leave: 'moveToRightFade',
  enter: 'rotateUnfoldLeft'
}, {
  leave: 'moveToLeftFade',
  enter: 'rotateUnfoldRight'
}, {
  leave: 'moveToBottomFade',
  enter: 'rotateUnfoldTop'
}, {
  leave: 'moveToTopFade',
  enter: 'rotateUnfoldBottom'
}, {
  leave: 'rotateRoomLeftOut ontop',
  enter: 'rotateRoomLeftIn'
}, {
  leave: 'rotateRoomRightOut ontop',
  enter: 'rotateRoomRightIn'
}, {
  leave: 'rotateRoomTopOut ontop',
  enter: 'rotateRoomTopIn'
}, {
  leave: 'rotateRoomBottomOut ontop',
  enter: 'rotateRoomBottomIn'
}, {
  leave: 'rotateCubeLeftOut ontop',
  enter: 'rotateCubeLeftIn'
}, {
  leave: 'rotateCubeRightOut ontop',
  enter: 'rotateCubeRightIn'
}, {
  leave: 'rotateCubeTopOut ontop',
  enter: 'rotateCubeTopIn'
}, {
  leave: 'rotateCubeBottomOut ontop',
  enter: 'rotateCubeBottomIn'
}, {
  leave: 'rotateCarouselLeftOut ontop',
  enter: 'rotateCarouselLeftIn'
}, {
  leave: 'rotateCarouselRightOut ontop',
  enter: 'rotateCarouselRightIn'
}, {
  leave: 'rotateCarouselTopOut ontop',
  enter: 'rotateCarouselTopIn'
}, {
  leave: 'rotateCarouselBottomOut ontop',
  enter: 'rotateCarouselBottomIn'
}, {
  leave: 'rotateSidesOut',
  enter: 'rotateSidesIn delay200'
}, {
  leave: 'rotateSlideOut',
  enter: 'rotateSlideIn'
}].reverse();

function ViewTransitions() {
  var startElement = 0,
    animEndEventName = '',
    animEndEventNames = {
      'WebkitAnimation': 'webkitAnimationEnd',
      'OAnimation': 'oAnimationEnd',
      'msAnimation': 'MSAnimationEnd',
      'animation': 'animationend'
    };


  function getTransitionPrefix() {
    var v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];
    var b = document.body || document.documentElement;
    var s = b.style;
    var p = 'animation';


    if (typeof s[p] === 'string') {
      return 'animation';
    }

    p = p.charAt(0).toUpperCase() + p.substr(1);
    for (var i = 0; i < v.length; i++) {
      if (typeof s[v[i] + p] === 'string') {
        return v[i] + p;
      }
    }
    return false;
  }


  // animation end event name
  animEndEventName = animEndEventNames[getTransitionPrefix()];

  function init(selected) {
    startElement = selected;
    console.warn('ViewTransitions.init', selected);

    var views = document.querySelectorAll('pxm-view');
    views.each(function(el) {
      console.log(el);
      el.attr('data-originalClassList', el.attr('class'));
    });
    document.querySelectorAll('pxm-views').each(function(el) {
      el.attr('data-current', '0');
      el.attr('data-isAnimating', 'false');
      //  el.children(".et-page").eq(startElement).addClass('et-page-current');
    });



    // TODO: HACK
    views[selected].removeClass('next');
  }

  function animate(options) {
    var el = options.current;
    var wrapper = el.parent();
    var inClass = formatClass(el.inTrans);
    var outClass = formatClass(el.outTrans);

    var currPage = options.current;
    var nextPage = options.next;
    var endCurrPage = false;
    var endNextPage = false;


    //If wrapper is not animating
    if (wrapper.attr('data-isAnimating') === 'true') {
      console.log(wrapper, wrapper.attr('data-isAnimating'));
      return false;
    }

    //wrapper.attr('data-isAnimating', 'true');

    //Steps for animateion

    //Current Page



    //Each outclass, add to the current page.
    outClass.forEach(function(c) {
      currPage.addClass(c);
      console.warn('adding class', c);
    });

    //Listen for animation end event
    currPage.addEventListener(animEndEventName, function() {
      console.warn(animEndEventName, 'finished - removing handler');
      currPage.off(animEndEventName);
      endCurrPage = true;
      if (endNextPage) {
        onEndAnimation(currPage, nextPage, el);
      }
    });

    //Next Page
    inClass.forEach(function(c) {
      nextPage.addClass(c);
    });

    nextPage.addEventListener(animEndEventName, function() {
      console.warn('Adding event listener to nextPage');
      nextPage.off(animEndEventName);
      endNextPage = true;
      if (endCurrPage) {
        onEndAnimation(currPage, nextPage, el);
        if (options.callback) {
          options.callback(currPage, nextPage);
        }
      }
    });

    console.warn('animate element', options, animEndEventName, inClass, outClass);
    console.warn('wrapper', wrapper);
  }

  function formatClass(str) {
    var classes = str.split(' ');
    var output = [];
    for (var i = 0; i < classes.length; i++) {
      output.push('pt-page-' + classes[i]);
    }
    return output;
  }


  function onEndAnimation($outpage, $inpage, block) {
    resetPage($outpage, $inpage);
    $outpage.trigger('animation.out.complete');
    $inpage.trigger('animation.in.complete');
    block.attr('data-isAnimating', 'false');
    console.warn('onEndAnimation');
  }

  function resetPage($outpage, $inpage) {
    $outpage.attr('class', $outpage.attr('data-originalClassList'));
    $inpage.attr('class', $inpage.attr('data-originalClassList') + ' et-page-current');
    console.warn('resetPage');
  }


  return {
    init: init,
    animate: animate
  };
}
