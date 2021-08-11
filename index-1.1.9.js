// todo: merge with utm to href script
(function addUtmToForms() {
  const urlParams = new URLSearchParams(window.location.search.toLowerCase());

  const utm_source = { name: 'utm_source', value: urlParams.get('utm_source') };
  const utm_medium = { name: 'utm_medium', value: urlParams.get('utm_medium') };
  const utm_campaign = { name: 'utm_campaign', value: urlParams.get('utm_campaign') };
  const utm_content = { name: 'utm_content', value: urlParams.get('utm_content') };
  const utm_term = { name: 'utm_term', value: urlParams.get('utm_term') };

  const forms = document.querySelectorAll('form');
  const input = document.createElement('input');
  input.setAttribute('type', 'hidden');

  const allLabels = [utm_source, utm_medium, utm_campaign, utm_content, utm_term];

  allLabels.forEach((label) => {
    if (label.value) {
      input.setAttribute('name', label.name);
      input.setAttribute('value', label.value);

      forms.forEach((el) => {
        el.appendChild(input.cloneNode(true));
      });
    }
  });
})();

$(function () {
  // add utm_source param
  const urlParams = new URLSearchParams(window.location.search.toLowerCase());

  let _utm_source = '';
  const utm_source = urlParams.get('utm_source');
  let _utm_medium = '';
  const utm_medium = urlParams.get('utm_medium');
  let _utm_campaign = '';
  const utm_campaign = urlParams.get('utm_campaign');

  if (utm_source) {
    $('a').attr('href', (i, h) => {
      _utm_source = `utm_source=${utm_source}`;
      const sym = h.indexOf('?') !== -1 ? '&' : '?';
      return h + sym + `${_utm_source}`;
    });
  }
  if (utm_medium) {
    $('a').attr('href', (i, h) => {
      _utm_medium = `utm_medium=${utm_medium}`;
      const sym = h.indexOf('?') !== -1 ? '&' : '?';
      return h + sym + `${_utm_medium}`;
    });
  }
  if (utm_campaign) {
    $('a').attr('href', (i, h) => {
      _utm_campaign = `utm_campaign=${utm_campaign}`;
      const sym = h.indexOf('?') !== -1 ? '&' : '?';
      return h + sym + `${_utm_campaign}`;
    });
  }

  // modal window
  if (!localStorage.getItem('modalWasShown')) {
    setTimeout(() => {
      $('.open-modal').click();
      localStorage.setItem('modalWasShown', true);
    }, 3000);
  }

  if (!localStorage.getItem('modalCallWasShown') && !localStorage.getItem('modalWasShown')) {
    setTimeout(() => {
      $('.open-modal-call').click();
      localStorage.setItem('modalCallWasShown', true);
    }, 60000);
  }

  // constants
  const orange = '#d96e34';
  const purple = '#f1eafb';

  // home page
  // add arrows todo: redesign layout to remove this
  const addArrows = () => {
    $('h2.overview__h').each((i, e) => {
      const img = $('.hero .arrow__img').clone();
      img.css('position', 'absolute').css('top', $(e).position().top + parseInt($(e).css('margin-top')));
      img.removeClass('arrow__img');
      if ($(window).width() > 991) {
        img.appendTo('.overview__col-arrow');
      } else {
        if (i > 0) {
          img.css('max-width', $('.arrow__img').css('max-width'));
          img.appendTo('.overview__col-title');
        }
      }
    });
  };
  addArrows();

  // add notifications
  $('.notifications .w-dyn-item .notification').each((i, e) => {
    // item is enabled
    if (!$(e).hasClass('w-condition-invisible')) {
      // set name
      const name = $(e).find('.notification__name').text();
      $(e).attr('data-name', name);
      // show if not in sessionStorage
      if (sessionStorage.getItem(name) !== 'hide') {
        setTimeout(() => {
          // remove arrows to redraw when notification appear
          $('.overview__col-arrow').children().remove();
          $('.overview__col-title').find('img').remove();

          $(e).css('display', 'flex');
          $(e).hide();
          $(e).slideDown('300', function () {
            // redraw arrows
            addArrows();
          });
        }, 1800);
        // close on x click and remember to not show more
        $(e)
          .find('.notification__img')
          .on('click', () => {
            $(e).hide();
            sessionStorage.setItem(name, 'hide');

            // remove arrows to redraw when notification appear
            $('.overview__col-arrow').children().remove();
            $('.overview__col-title').find('img').remove();
            // redraw arrows
            addArrows();
          });
      }
    }
  });

  // email forms submit
  // todo: if two different ids still needed, at least rename the second one...
  $(
    '#email-form .btn, #email-form2 .btn, #email-form3 .btn, #email-form4 .btn, #email-form5 .btn, #email-form6 .btn, #modal-form-call .btn'
  ).on('click', function () {
    const formId = $(this).closest('form').attr('id');
    $(`#${formId}`).submit();
  });
  
  
  $('#add-inputs-1').on('click', function () {
    $('#referral-form .btn').removeClass( "btn--disable" )
  });
  $('#referral-form .btn').on('click', function () {
    const formId = $(this).closest('form').attr('id');
    if (!($(this).hasClass( "btn--disable" ))) {
      $(`#${formId}`).submit();
    }
  });

  $('#email-form, #email-form2').on('submit', function () {
    const id = $(this).attr('id');
    $('.w-form-done, .w-form-fail').hide();
    if ($(`#${id}`)[0].checkValidity()) {
      const email = $(`#${id} input[type=email]`).val();
      const name = $(`#${id} input[type=text]`) ? $(`#${id} input[type=text]`).val() : '';
      let url = `https://projects.breef.com/registration?email=${email}`;
      if (name) {
        url += `&name=${name}`;
      }
      if (_utm_source) {
        url += `&${_utm_source}`;
      }
      if (_utm_medium) {
        url += `&${_utm_medium}`;
      }
      if (_utm_campaign) {
        url += `&${_utm_campaign}`;
      }
      window.open(url);
    }
  });

  $('#email-form3').on('submit', function () {
    const id = $(this).attr('id');
    $('.w-form-done, .w-form-fail').hide();
    if ($(`#${id}`)[0].checkValidity()) {
      const email = $(`#${id} input[type=email]`).val();
      const name = $(`#${id} input[type=text]`) ? $(`#${id} input[type=text]`).val() : '';
      let url = `https://breef.chilipiper.com/book/me/caitlin-stower?email=${email}`;
      if (name) {
        url += `&name=${name}`;
      }
      if (_utm_source) {
        url += `&${_utm_source}`;
      }
      if (_utm_medium) {
        url += `&${_utm_medium}`;
      }
      if (_utm_campaign) {
        url += `&${_utm_campaign}`;
      }
      window.open(url);
    }
  });

  $('#email-form4').on('submit', function () {
    const id = $(this).attr('id');
    $('.w-form-done, .w-form-fail').hide();
    //     const service = $(`#${id} #bf-select option:selected`).text();
    let url = `https://projects.breef.com/registration`;
    //     if (service) {
    //         url += `?service=${service}`;
    //       }
    window.open(url);
  });

  $('#modal-form-call').on('submit', function () {
    const id = $(this).attr('id');
    $('.w-form-done, .w-form-fail').hide();
    if ($(`#${id}`)[0].checkValidity()) {
      let url = `https://breef.chilipiper.com/book/me/caitlin-stower/`;
      window.open(url);
    }
  });

  if ($('#download-form').length) {
    $('#download-form .btn').on('click', function () {
      $(`#download-form`).submit();
    });

    $('#download-form').on('submit', function () {
      if ($('#download-form').is(':invalid')) {
        return;
      } else {
        $('.modal-call').hide();
        localStorage.setItem('modalCallWasShown', true);
        let url = `https://drive.google.com/file/d/1LGo1bxkjBB811iIvQr6V9YqHNkyp2yjL/view?usp=sharing`;
        window.open(url);
        location.reload(true);
      }
    });
  }

  if ($('#download-form2').length) {
    $('#download-form2 .btn').on('click', function () {
      $(`#download-form2`).submit();
    });

    $('#download-form2').on('submit', function () {
      if ($('#download-form2').is(':invalid')) {
        return;
      } else {
        let url = `https://drive.google.com/file/d/1LGo1bxkjBB811iIvQr6V9YqHNkyp2yjL/view?usp=sharing`;
        window.open(url);
      }
    });
  }

  //   $('#referral-form').on('submit', function () {
  //     const id = $(this).attr('id');
  //     if (($(`#${id}`)[0].checkValidity()) && (!($( ".btn" ).hasClass( "btn--disable" )))){
  //       let url = `https://breef.chilipiper.com/book/me/caitlin-stower/`;
  //       window.open(url);
  //     }
  //   });

  //     else if (!($( ".btn" ).hasClass( "btn--disable" ))) {
  //       alert(`Please Refer a Brand, Marketer or Founder!`);
  //       e.preventDefault();
  //       return false;
  //     }

  //   function downloadFile() {
  //     const url =
  //       'https://drive.google.com/file/d/1LGo1bxkjBB811iIvQr6V9YqHNkyp2yjL/view?usp=sharing';
  //     fetch(url)
  //       .then((resp) => resp.blob())
  //       .then((blob) => {
  //         const url = window.URL.createObjectURL(blob);
  //         const a = document.createElement('a');
  //         a.style.display = 'none';
  //         a.href = url;
  //         a.download = 'Curated Marketing List 2021';
  //         document.body.appendChild(a);
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //       })
  //       .catch(() => console.log('file download error'));
  //   }

  // about page
  $('.a-cta .btn').on('click', () => {
    $('.a-cta form').submit();
  });

  // alternative tick script (not webflow hardcoded) to make list editable
  // todo: getBoundingClientRect?
  if ($('.pf__list-item-wrap').length > 0) {
    $.fn.isOnScreen = function () {
      var win = $(window);
      var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft(),
      };

      viewport.right = viewport.left + win.width();
      viewport.bottom = viewport.top + win.height();

      var bounds = this.offset();

      bounds.right = bounds.left + this.outerWidth();
      bounds.bottom = bounds.top + this.outerHeight();
      return !(
        viewport.right < bounds.left ||
        viewport.left > bounds.right ||
        viewport.bottom < bounds.top ||
        viewport.top > bounds.bottom
      );
    };

    $('.pf__list-item-wrap .pf__list-img').hide();
    $(window).scroll(function () {
      if ($('.pf__list-item-wrap').isOnScreen()) {
        $('.pf__list-item-wrap .pf__list-img').each((i, e) => {
          setTimeout(() => {
            $(e).show(200);
          }, 300 * i);
        });
      }
    });
  }

  // join-team page
  if (location.href.indexOf('join-team') !== -1) {
    let newHref = $('.menu__item--or').attr('href');
    const sym = newHref.indexOf('?') > -1 ? '&' : '?';
    newHref = newHref + sym + 'type=agency';
    $('.menu__item--or').attr('href', newHref);
  }

  // recovery page
  $('.btn-refer').on('click', () => {
    $('.refer form').submit();
  });

  // all hovers which not covered in webflow animations
  (function hovers() {
    $('.menu__item--or').hover(
      (e) => {
        if ($('.nav-wrap').hasClass('nav-wrap--home')) {
          $('.menu__item--or').css({
            // color: '#fff',
            'background-color': orange,
          });
          // $('.menu__item--or .menu-item__img').css('display', 'inline-block');
          // $('.menu__item--or .menu-item__img-hover').hide();
        } else {
          // $('.menu__item--or .menu-item__img').hide();
          // $('.menu__item--or .menu-item__img-hover').css('display', 'inline-block');
        }
      },
      (e) => {
        if ($('.nav-wrap').hasClass('nav-wrap--home')) {
          $('.menu__item--or').css({
            // color: orange,
            'background-color': purple,
          });
          // $('.menu__item--or .menu-item__img').hide();
          // $('.menu__item--or .menu-item__img-hover').css('display', 'inline-block');
        } else {
          // $('.menu__item--or .menu-item__img').css('display', 'inline-block');
          // $('.menu__item--or .menu-item__img-hover').hide();
        }
      }
    );

    $('.instagram').hover(
      function () {
        $(this).find('.socials__img').hide();
        $(this).find('.socials__img-hover').css('display', 'inline-block');
      },
      function () {
        $(this).find('.socials__img').css('display', 'inline-block');
        $(this).find('.socials__img-hover').hide();
      }
    );

    $('.twitter').hover(
      function () {
        $(this).find('.socials__img').hide();
        $(this).find('.socials__img-hover').css('display', 'inline-block');
      },
      function () {
        $(this).find('.socials__img').css('display', 'inline-block');
        $(this).find('.socials__img-hover').hide();
      }
    );

    $('.linkedin').hover(
      function () {
        $(this).find('.socials__img').hide();
        $(this).find('.socials__img-hover').css('display', 'inline-block');
      },
      function () {
        $(this).find('.socials__img').css('display', 'inline-block');
        $(this).find('.socials__img-hover').hide();
      }
    );

    $('.email').hover(
      function () {
        $(this).find('.socials__img').hide();
        $(this).find('.socials__img-hover').css('display', 'inline-block');
      },
      function () {
        $(this).find('.socials__img').css('display', 'inline-block');
        $(this).find('.socials__img-hover').hide();
      }
    );

    $('.tryloop').hover(
      (e) => {
        $('.tryloop__h').css('color', '#fff');
        $('.tryloop__img').hide();
        $('.tryloop__img-hover').css('display', 'inline-block');
      },
      (e) => {
        $('.tryloop__h').css('color', orange);
        $('.tryloop__img').css('display', 'inline-block');
        $('.tryloop__img-hover').hide();
      }
    );
  })();

  // pricing page, fix buttons level
  $('.starter .pricing__top').height($('.premium .pricing__top').height());
  $('.pricing__top, .pricing__bottom').css('opacity', 100);

  // tryloop
  if ($('.tryloop').length > 0) {
    let initWidth = $(window).width();
    let tryUsWidth;
    getTryUsWidth();

    if (!tryUsWidth) {
      return;
    }

    window.addEventListener('resize', function () {
      initWidth = $(window).width();

      getTryUsWidth();
      updateTryUs();
    });

    function getTryUsWidth() {
      const link = $('.tryloop-link');
      const linkWidth = link.outerWidth(true);
      if (linkWidth <= 0) {
        return;
      }
      const tryNum = Math.ceil(initWidth / linkWidth);
      tryUsWidth = tryNum * linkWidth;
    }

    function tryUs() {
      getTryUsWidth();
      const link = $('.tryloop-link');
      const linkWidth = link.outerWidth(true);
      if (linkWidth <= 0) {
        return;
      }
      const tryNum = Math.ceil(initWidth / linkWidth);

      if (link.length > 1) {
        $('#list1').remove();
        link.not(':first').remove();
      }

      for (let i = 0; i < tryNum - 1; i++) {
        link.first().clone().appendTo('.tryloop-list');
      }

      $('.tryloop-list-wrap').width(tryUsWidth * 3);

      const list = $('.tryloop-list');
      list.css('left', 0).attr('id', 'list2');
      list.first().clone().css('left', `-${tryUsWidth}px`).attr('id', 'list1').appendTo('.tryloop-list-wrap');

      anim1(tryUsWidth * 10);
      anim2(tryUsWidth * 10);
    }

    function anim1(sec) {
      $('#list2').animate(
        {
          left: tryUsWidth,
        },
        sec,
        'linear',
        () => {
          $('#list2').css('left', 0);
          anim1(tryUsWidth * 10);
        }
      );
    }

    function anim2(sec) {
      $('#list1').animate(
        {
          left: 0,
        },
        sec,
        'linear',
        () => {
          $('#list1').css('left', `-${tryUsWidth}px`);
          anim2(tryUsWidth * 10);
        }
      );
    }

    $('.tryloop-list-wrap').hover(
      () => {
        $('#list1').stop();
        $('#list2').stop();
      },
      () => {
        anim1((tryUsWidth - parseFloat($('#list2').css('left'))) * 10);
        anim2((tryUsWidth - (tryUsWidth + parseFloat($('#list1').css('left')))) * 10);
      }
    );

    setTimeout(tryUs, 600);

    function updateTryUs() {
      $('#list1').stop();
      $('#list2').stop();
      tryUs();
    }

    setInterval(updateTryUs, 1000 * 30);
  }

  // services auto scroll
  if ($('.services-list').length > 0) {
    $('.services-list .services-list__link').each((i, e) => {
      if (i < 7) {
        const clone = $(e).clone();
        clone.addClass('is-clone').appendTo('.services-list');
      }
    });

    var doc = window.document,
      context = doc.querySelector('.services-list'),
      clones = context.querySelectorAll('.is-clone'),
      disableScroll = false,
      scrollHeight = 0,
      scrollPos = 0,
      clonesHeight = 0,
      i = 0,
      pauseScroll = false;

    function getScrollPos() {
      return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
    }

    function setScrollPos(pos) {
      context.scrollTop = pos;
    }

    function getClonesHeight() {
      clonesHeight = 0;

      for (i = 0; i < clones.length; i += 1) {
        clonesHeight = clonesHeight + clones[i].offsetHeight;
      }

      return clonesHeight;
    }

    function reCalc() {
      scrollPos = getScrollPos();
      scrollHeight = context.scrollHeight;
      clonesHeight = getClonesHeight();

      if (scrollPos <= 0) {
        setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
      }
    }

    function scrollUpdate() {
      if (!disableScroll) {
        scrollPos = getScrollPos();

        if (clonesHeight + scrollPos >= scrollHeight) {
          // Scroll to the top when you’ve reached the bottom
          setScrollPos(1); // Scroll down 1 pixel to allow upwards scrolling
          disableScroll = true;
        } else if (scrollPos <= 0) {
          // Scroll to the bottom when you reach the top
          setScrollPos(scrollHeight - clonesHeight);
          disableScroll = true;
        }
      }

      if (disableScroll) {
        // Disable scroll-jumping for a short time to avoid flickering
        window.setTimeout(function () {
          disableScroll = false;
        }, 40);
      }
    }

    window.requestAnimationFrame(reCalc);

    context.addEventListener(
      'scroll',
      function () {
        window.requestAnimationFrame(scrollUpdate);
      },
      false
    );

    // window.addEventListener('resize', function () {
    //   window.requestAnimationFrame(reCalc);
    // }, false);

    // window.onload = function () {
    setScrollPos(
      Math.round(
        clones[0].getBoundingClientRect().top + getScrollPos() - (context.offsetHeight - clones[0].offsetHeight) / 2
      )
    );
    // };

    /* Auto scrolling */
    function autoScroll() {
      if (pauseScroll) {
        return;
      }
      if (scrollPos > 2) {
        // Added 2 pixel to make it able to scroll above top
        setScrollPos(getScrollPos() + 1); // Change to change speed
      }

      window.requestAnimationFrame(autoScroll);
    }

    autoScroll();

    $('.services-list').hover(
      () => {
        pauseScroll = true;
      },
      () => {
        pauseScroll = false;
        autoScroll();
      }
    );

    window.addEventListener('resize', function () {
      window.requestAnimationFrame(reCalc);
    });
  }

  $(window).scroll(function () {
    const windowHeight = window.innerHeight;
    $('.check-title').each(function (i, e) {
      const titleY = e.getBoundingClientRect().y;
      if (
        !$(this).data('opened') &&
        titleY > Math.round(windowHeight / 2) - 10 &&
        titleY < Math.round(windowHeight / 2) + 10
      ) {
        $(this)[0].click();
        $(this).data('opened', true);
      }
    });
  });

  // on resize
  window.onresize = function () {
    // pricing page
    $('.starter .pricing__top').height($('.premium .pricing__top').height());
    $('.pricing__top, .pricing__bottom').css('opacity', 100);

    // home page
    $('.overview__col-arrow img, .overview__col-title img').remove();
    addArrows();
  };
});

// change intercom icon
const interval = setInterval(() => {
  // change intercom init icon
  if ($('.intercom-launcher').length) {
    const img = document.createElement('IMG');
    img.src = 'https://uploads-ssl.webflow.com/5e4d24d0d11c7440ba421ee3/5e53ee59678f9f69af229251_cloud.svg';
    $('.intercom-launcher div svg').first().remove();
    $('.intercom-launcher div').first().prepend(img);
    $('.intercom-launcher').css({ background: 'transparent', 'box-shadow': 'none' });
    clearInterval(interval);
  }
}, 100);

// change intercom iframe icon
const finterval = setInterval(() => {
  if ($('.intercom-launcher-frame').length) {
    $('.intercom-launcher-frame').css({
      'box-shadow': 'none',
      background: 'transparent',
    });

    const iframe = $($('.intercom-launcher-frame').get(0).contentWindow.document);

    const inter = setInterval(() => {
      if (iframe.find('.intercom-launcher').length) {
        const img = document.createElement('IMG');
        img.src = 'https://uploads-ssl.webflow.com/5e4d24d0d11c7440ba421ee3/5e53ee59678f9f69af229251_cloud.svg';
        iframe.find('.intercom-launcher div svg').first().remove();
        iframe.find('.intercom-launcher div').first().prepend(img);
        iframe.find('.intercom-launcher').css('background', 'transparent');

        clearInterval(inter);
      }
    }, 100);

    clearInterval(finterval);
  }
}, 100);

// recovery form validation
$(function () {
  if (location.pathname === '/recovery/apply') {
    let error;
    const query = new URLSearchParams(window.location.search.toLowerCase());
    if (query.get('utm_source')) {
      $('form').append(`<input type="hidden" name="utm_source" value="${query.get('utm_source')}"/>`);
    }
    if (query.get('utm_medium')) {
      $('form').append(`<input type="hidden" name="utm_medium" value="${query.get('utm_medium')}"/>`);
    }
    if (query.get('utm_campaign')) {
      $('form').append(`<input type="hidden" name="utm_campaign" value="${query.get('utm_campaign')}"/>`);
    }

    function formValid() {
      let isValid = true;
      $('.check-title').each(function () {
        const group = $(this).siblings('.check-group');
        const title = $(this).find('div').text();
        if (group.find('input').length) {
          const isRadio = group.hasClass('radio-group');
          if (isRadio) {
            let radioCount = 0;
            group.find('input').each(function () {
              if (this.checked) {
                radioCount++;
              }
            });
            if (radioCount !== 1) {
              error = title;
              isValid = false;
              return false;
            } else {
              isValid = true;
            }
          } else {
            let hasChecked = false;
            group.find('input').each(function () {
              if (this.checked) {
                hasChecked = true;
              }
            });
            if (!hasChecked) {
              error = title;
              isValid = false;
              return false;
            } else {
              isValid = true;
            }
          }
        }
        if (group.find('textarea').length) {
          if (!group.find('textarea').val()) {
            error = title;
            isValid = false;
            return false;
          }
        }
        if (!$('.btn').hasClass('btn--disable')) {
          error = title;
          isValid = false;
          return false;
        } else {
          isValid = true;
        }
      });

      return isValid;
    }

    $('.get-started-form .btn').on('click', function (e) {
      let reqFilled = true;
      $('.get-started-form input[required]').each(function () {
        if (!$(this).val()) {
          reqFilled = false;
        }
      });

      if (reqFilled) {
        if (!formValid()) {
          alert(`Please fill out the required field: ${error}`);
          e.preventDefault();
          return false;
        }
      }

      $('.get-started-form form').submit();
    });

    // checkbox to radiobutton
    $('.radio-group input').change(function () {
      const radioGroup = $(this).parent().parent();
      const allInputsInGroup = radioGroup.find('input');
      allInputsInGroup.each(function () {
        $(this).prop('checked', false);
      });
      $(this).prop('checked', true);
    });
  }
});
