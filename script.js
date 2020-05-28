const vt = {};

vt.sideNav = function() {
  // scroll to section
  $('.nav__links__btn').on('click', function() {
    $('html, body').animate({
      scrollTop: $(`#${$(this).text()}`).offset().top - 65,
    }, 400, 'linear');
  })
}

vt.copyToClipboard = function(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}

vt.TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 8) || 1000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

vt.TxtRotate.prototype.tick = function() {
  const i = this.loopNum % this.toRotate.length;
  const fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  const that = this;
  let delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

vt.textAnimation = function() {
  const elements = document.getElementsByClassName('txt-rotate');
  for (let i=0; i<elements.length; i++) {
    const toRotate = elements[i].getAttribute('data-rotate');
    const period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new vt.TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
}

vt.init = function() {
  AOS.init();
  particlesJS.load('particles-js', './assets/particlesjs-config.json', function() {
    console.log('callback - particles.js config loaded');
  });
  
  vt.textAnimation(); // code by https://codepen.io/gschier/pen/jkivt
  vt.sideNav();
  // remove focus on mouseleave
  $('button, a, .container').on('mouseleave', function() {
    $(this).blur();
  });
  // copy email to clipboard on click
  $('.fa-copy').on('click', function() {
    vt.copyToClipboard('.contact__email');
  })
  // close hamburger on link click
  $('.nav__links__btn').on('click', function() {
    $("#toggle").prop("checked", false);
  })
}

$(function() {
  vt.init();
});
