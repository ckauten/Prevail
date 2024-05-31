// variables
const textarea = document.getElementById('autoresizing');
const nav = document.querySelector('nav');

// hamburger visibility toggle
document.querySelector('.fa-bars').addEventListener('click', function () {
  document.querySelector('nav').classList.toggle('open');
  var nav = document.querySelector('nav');
  if (nav.classList.contains('visible')) {
    nav.classList.remove('visible');
    setTimeout(function () {
      nav.style.display = 'none';
    }, 500); //should match transition speed
  } else {
    nav.style.display = 'flex';
    setTimeout(function () {
      nav.classList.add('visible');
    }, 10);
  }
});

// home observer toggle depending on page
if (document.contains(document.querySelector('.output'))) {
  document.addEventListener('DOMContentLoaded', function () {
    // MutationObserver to watch for added elements and apply styles
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && node.tagName === 'LI') {
              if (node.classList.contains('user-message')) {
                node.classList.add('userLI'); // Add user styling class
              } else if (node.classList.contains('bot-message')) {
                node.classList.add('botLI'); // Add bot styling class
              }
            }
          });
        }
      });
    });

    // Start observing the chat container for child list item additions
    observer.observe(document.getElementById('chat-container'), { childList: true });

    // Text resizing function
    const textarea = document.getElementById('autoresizing');
    textarea.addEventListener('input', function () {
      this.style.height = 'auto'; // Reset the height
      this.style.height = this.scrollHeight + 'px'; // Set the height to scroll height
    });

    // Submit key listener
    const textInput = document.querySelector('textarea');
    textInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        generateText();
        textarea.value = ''; // Clear the textarea
      }
    });

    // Event listener for submit button click
    document.getElementById('submit').addEventListener('click', function (event) {
      event.preventDefault(); // Prevent the form from submitting normally
      generateText();
    });
  });
}

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

    // Update the chat container
    const chatContainer = document.getElementById('chat-container');

    // Create user message element
    const userMessageElement = document.createElement('li');
    userMessageElement.classList.add('chat-message', 'user-message'); // Add classes for styling
    userMessageElement.innerHTML = `<p class="chat user"><strong>User: </strong> ${prompt}</p>`;

    // Create bot message element
    const botMessageElement = document.createElement('li');
    botMessageElement.classList.add('chat-message', 'bot-message'); // Add classes for styling
    botMessageElement.innerHTML = `<p class="chat bot"><strong>Grace:</strong> ${chat}</p>`;

    // Append messages
    chatContainer.appendChild(userMessageElement);
    chatContainer.appendChild(botMessageElement);

    // Scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Clear the input field
    document.querySelector('textarea').value = '';
  } else {
    console.error('Error from server');
  }
}

// typewriter effect for text
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  this.txt = fullTxt.substring(0, this.txt.length + 1);

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 100 - Math.random() * 100; // Faster typing effect

  if (this.txt === fullTxt) {
    return; // Stop once the full text is typed
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff}';
  document.body.appendChild(css);
};

// background video function
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
      delay: 10000,
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
      }, 1000); // Adjust this to match the CSS transition duration
    }, settings.delay);
  })();
})();

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
