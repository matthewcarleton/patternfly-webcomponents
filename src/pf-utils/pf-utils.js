/**
 * --------------------------------------------------------------------------
 * PfUtil
 * Internal Utility Functions for Patternfly Web Components
 * --------------------------------------------------------------------------
 */

class PfUtil {

  constructor () {
    this.isMSIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) !== null) ? parseFloat( RegExp.$1 ) : false;
    this.isIE = /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  }

  addClass (el, c) { // where modern browsers fail, use classList
    if (el.classList) {
      el.classList.add(c);
    } else {
      el.className += ' ' + c;
      el.offsetWidth;
    }
  }

  removeClass (el, c) {
    if (el.classList) {
      el.classList.remove(c);
    } else {
      el.className = el.className.replace(c,'').replace(/^\s+|\s+$/g,'');
    }
  }

  getClosest (el, s) { //el is the element and s the selector of the closest item to find
    // source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
    const former = s.charAt(0);
    const latter = s.substr(1);
    for ( ; el && el !== document; el = el.parentNode ) {// Get closest match
      if ( former === '#' ) { // If selector is an ID
        if ( el.id === latter ) {
          return el;
        }
      } else if ( former === '.' ) {// If selector is a class
        if ( new RegExp(latter).test(el.className) ) {
          return el;
        }
      } else { // we assume other selector is tag name
        if ( el.nodeName === s ) {
          return el;
        }
      }
    }
    return false;
  }

  // tooltip / popover stuff
  isElementInViewport (t) { // check if this.tooltip is in viewport
    const r = t.getBoundingClientRect();
    return (
      r.top >= 0 &&
      r.left >= 0 &&
      r.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      r.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  getScroll () { // also Affix and scrollSpy uses it
    return {
      y: window.pageYOffset || document.documentElement.scrollTop,
      x: window.pageXOffset || document.documentElement.scrollLeft
    };
  }

  reflow (el) { // force reflow
    return el.offsetHeight;
  }

  once (el, type, listener, self) {
    let one = function (e) {
      try {
        listener.call(self, e);
      } finally {
        el.removeEventListener(type, one);
      }
    };

    el.addEventListener(type, one);
  }
}
let pfUtil = new PfUtil();
export {pfUtil};
