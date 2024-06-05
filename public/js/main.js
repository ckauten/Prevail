// Resources expansion logic
function expand(element) {
  if (element.classList.contains('expanded')) {
    element.classList.remove('expanded');
    document.querySelector('.resource-container').classList.remove('container-expanded');
    element.querySelector('.expanded-content').style.display = 'none';
    element.querySelector('.node-label').style.display = 'flex';
  } else {
    element.classList.add('expanded');
    document.querySelector('.resource-container').classList.add('container-expanded');
    element.querySelector('.expanded-content').style.display = 'flex';
    element.querySelector('.node-label').style.display = 'none';
  }
  if (window.innerWidth <= 980) {
    element.scrollIntoView({ block: 'start', behavior: 'smooth' });
  } else {
    element.scrollIntoView({ block: 'center' });
  }
}

// Emergency services expansion logic
document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('showEmergencyServices') === 'true') {
    const emergencyElement = document.querySelector('#emergency');
    if (emergencyElement) {
      expand(emergencyElement);
    }
  }
});

//FAQ expansion logic
function faqExpand(event) {
  if (event.classList.contains('faq-expanded')) {
    event.classList.remove('faq-expanded');
    event.querySelector('.bottom-faq').style.display = 'none';
    event.querySelector('.fa-chevron-down').classList.replace('fa-chevron-down', 'fa-chevron-right');
  } else {
    event.classList.add('faq-expanded');
    event.querySelector('.bottom-faq').style.display = 'flex';
    event.querySelector('.fa-chevron-right').classList.replace('fa-chevron-right', 'fa-chevron-down');
  }
}

function ESRedirect() {
  window.location.href = '/resources?showEmergencyServices=true';
}
(function () {
  'use strict';

  var $body = document.querySelector('body');

  // Methods/polyfills.

  // classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
  !(function () {
    function t(t) {
      this.el = t;
      for (var n = t.className.replace(/^\s+|\s+$/g, '').split(/\s+/), i = 0; i < n.length; i++) e.call(this, n[i]);
    }
    function n(t, n, i) {
      Object.defineProperty ? Object.defineProperty(t, n, { get: i }) : t.__defineGetter__(n, i);
    }
    if (!('undefined' == typeof window.Element || 'classList' in document.documentElement)) {
      var i = Array.prototype,
        e = i.push,
        s = i.splice,
        o = i.join;
      (t.prototype = {
        add: function (t) {
          this.contains(t) || (e.call(this, t), (this.el.className = this.toString()));
        },
        contains: function (t) {
          return -1 != this.el.className.indexOf(t);
        },
        item: function (t) {
          return this[t] || null;
        },
        remove: function (t) {
          if (this.contains(t)) {
            for (var n = 0; n < this.length && this[n] != t; n++);
            s.call(this, n, 1), (this.el.className = this.toString());
          }
        },
        toString: function () {
          return o.call(this, ' ');
        },
        toggle: function (t) {
          return this.contains(t) ? this.remove(t) : this.add(t), this.contains(t);
        },
      }),
        (window.DOMTokenList = t),
        n(Element.prototype, 'classList', function () {
          return new t(this);
        });
    }
  })();

  // canUse
  window.canUse = function (p) {
    if (!window._canUse) window._canUse = document.createElement('div');
    var e = window._canUse.style,
      up = p.charAt(0).toUpperCase() + p.slice(1);
    return p in e || 'Moz' + up in e || 'Webkit' + up in e || 'O' + up in e || 'ms' + up in e;
  };

  // window.addEventListener
  (function () {
    if ('addEventListener' in window) return;
    window.addEventListener = function (type, f) {
      window.attachEvent('on' + type, f);
    };
  })();

  // Play initial animations on page load.
  window.addEventListener('load', function () {
    window.setTimeout(function () {
      $body.classList.remove('is-preload');
    }, 100);
  });

  // Slideshow Background.
  (function () {
    // Settings.
    var settings = {
      // Images (in the format of 'url': 'alignment').
      images: {
        'images/left-bg.jpg': 'center',
        'images/right-bg.jpg': 'center',
      },

      // Delay.
      delay: 15000,
    };

    // Vars.
    var pos = 0,
      lastPos = 0,
      $wrapper,
      $bgs = [],
      $bg,
      k,
      v;

    // Create BG wrapper, BGs.
    $wrapper = document.createElement('div');
    $wrapper.id = 'bg';
    $body.appendChild($wrapper);

    for (k in settings.images) {
      // Create BG.
      $bg = document.createElement('div');
      $bg.style.backgroundImage = 'url("' + k + '")';
      $bg.style.backgroundPosition = settings.images[k];
      $wrapper.appendChild($bg);

      // Add it to array.
      $bgs.push($bg);
    }

    // Main loop.
    $bgs[pos].classList.add('visible');
    $bgs[pos].classList.add('top');

    // Bail if we only have a single BG or the client doesn't support transitions.
    if ($bgs.length == 1 || !canUse('transition')) return;

    window.setInterval(function () {
      lastPos = pos;
      pos++;

      // Wrap to beginning if necessary.
      if (pos >= $bgs.length) pos = 0;

      // Swap top images.
      $bgs[lastPos].classList.remove('top');
      $bgs[pos].classList.add('visible');
      $bgs[pos].classList.add('top');

      // Hide last image after a short delay.
      window.setTimeout(function () {
        $bgs[lastPos].classList.remove('visible');
      }, settings.delay / 2);
    }, settings.delay);
  })();
})();
