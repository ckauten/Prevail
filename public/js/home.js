// variables
const textarea = document.getElementById('autoresizing');

//text resizing func
textarea.addEventListener('input', function () {
  this.style.height = 'auto'; // Reset the height
  this.style.height = this.scrollHeight + 'px'; // Set the height to scroll height
});

//event listeners for text boxes and button
document.querySelector('#submit').addEventListener('click', generateText);

//submit key listener
const textInput = document.querySelector('textarea');
textInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    generateText();
    textarea.value = '';
    // Perform desired actions here
  }
});

async function generateText() {
  const prompt = document.querySelector('textarea').value;
  const response = await fetch('chatPage/sendAiReq', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: prompt }),
  });

  if (response.ok) {
    const data = await response.json();
    const chat = data.text;
    document.querySelector('#output').textContent = chat;
    console.log(chat);
  } else {
    console.error(`"Error from server"`);
  }
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
      // Videos (in the format of 'url': 'alignment').
      videos: {
        'videos/purple.mp4': 'center',
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

    for (k in settings.videos) {
      // Create BG.
      $bg = document.createElement('video');
      $bg.src = k;
      $bg.style.objectFit = 'cover';
      $bg.style.position = 'absolute';
      $bg.style.top = '0';
      $bg.style.left = '0';
      $bg.style.width = '100%';
      $bg.style.height = '100%';
      $bg.autoplay = true;
      $bg.loop = true;
      $bg.muted = true;
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

      // Swap top videos.
      $bgs[lastPos].classList.remove('top');
      $bgs[pos].classList.add('visible');
      $bgs[pos].classList.add('top');

      // Hide last video after a short delay.
      window.setTimeout(function () {
        $bgs[lastPos].classList.remove('visible');
      }, settings.delay / 2);
    }, settings.delay);
  })();
})();
