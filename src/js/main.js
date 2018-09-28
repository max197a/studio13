$(document).ready(function() {
  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

  ////////////
  // READY - triggered when PJAX DONE
  ////////////
  function pageReady() {
    legacySupport();
    // updateHeaderActiveClass();
    initHeaderScroll();

    // initPopups();
    initSliders();
    // initScrollMonitor();
    initMasks();
    initSelectric();
    initValidations();

    // initAos();

    // development helper
    _window.on("resize", debounce(setBreakpoint, 200));

    // AVAILABLE in _components folder
    // copy paste in main.js and initialize here
    // initPerfectScrollbar();
    // initLazyLoad();
    // initTeleport();
    // parseSvg();
    // revealFooter();
    // _window.on('resize', throttle(revealFooter, 100));
  }

  // this is a master function which should have all functionality
  pageReady();

  // some plugins work best with onload triggers
  _window.on("load", function() {
    // your functions
  });

  //////////
  // COMMON
  //////////
  // function initAos() {
  //   AOS.init();
  // }

  //////////
  // SLIDERS
  //////////

  function initSliders() {
    $("[js-slick-1]").slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      asNavFor: "[js-slick-1-1]"
    });
    $("[js-slick-1-1]").slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      asNavFor: "[js-slick-1]"
    });

    $("[js-slick-2]").slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      asNavFor: "[js-slick-2-1]"
    });
    $("[js-slick-2-1]").slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      asNavFor: "[js-slick-2]"
    });

    $("[js-slick-3]").slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      asNavFor: "[js-slick-3-1]"
    });
    $("[js-slick-3-1]").slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      asNavFor: "[js-slick-3]"
    });

    $("[js-slick-4]").slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      asNavFor: "[js-slick-4-1]"
    });
    $("[js-slick-4-1]").slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      asNavFor: "[js-slick-4]"
    });
  }

  function legacySupport() {
    // svg support for laggy browsers
    svg4everybody();

    // Viewport units buggyfill
    window.viewportUnitsBuggyfill.init({
      force: false,
      refreshDebounceWait: 150,
      appendToBody: true
    });
  }

  // Prevent # behavior
  _document
    .on("click", '[href="#"]', function(e) {
      e.preventDefault();
    })
    .on("click", 'a[href^="#section"]', function() {
      // section scroll
      var el = $(this).attr("href");
      $("body, html").animate(
        {
          scrollTop: $(el).offset().top
        },
        1000
      );
      return false;
    });

  // HEADER SCROLL
  // add .header-static for .page or body
  // to disable sticky header
  function initHeaderScroll() {
    _window.on(
      "scroll",
      throttle(function(e) {
        var vScroll = _window.scrollTop();
        var header = $(".header");
        var headerHeight = header.height();
        var firstSection =
          _document.find(".page__content div:first-child()").height() -
          headerHeight;
        var visibleWhen = Math.round(_document.height() / _window.height()) > 0;

        if (visibleWhen) {
          if (vScroll > headerHeight) {
            header.addClass("is-fixed");
          } else {
            header.removeClass("is-fixed");
          }
          if (vScroll > firstSection) {
            header.addClass("is-fixed-visible");
          } else {
            header.removeClass("is-fixed-visible");
          }
        }
      }, 10)
    );
  }

  ////////
  // PRELOADER
  ////////

  (function() {
    var $preloader = $(".preloader");

    $(window).on("load", function() {
      setTimeout(function() {
        $preloader.addClass("is-loaded");

        setTimeout(function() {
          // $preloader.remove();
          $("body").css("overflow", "visible");
        }, 1000);

        // new WOW().init();
        AOS.init({
          // delay: 500
        });
      }, 1500);
    });
  })();

  // // HAMBURGER TOGGLER
  // _document.on('click', '[js-hamburger]', function(){
  //   $(this).toggleClass('is-active');
  //   $('.mobile-navi').toggleClass('is-active');
  // });

  // function closeMobileMenu(){
  //   $('[js-hamburger]').removeClass('is-active');
  //   $('.mobile-navi').removeClass('is-active');
  // }

  // // SET ACTIVE CLASS IN HEADER
  // // * could be removed in production and server side rendering when header is inside barba-container
  // function updateHeaderActiveClass(){
  //   $('.header__menu li').each(function(i,val){
  //     if ( $(val).find('a').attr('href') == window.location.pathname.split('/').pop() ){
  //       $(val).addClass('is-active');
  //     } else {
  //       $(val).removeClass('is-active')
  //     }
  //   });
  // }

  // //////////
  // // MODALS
  // //////////

  // function initPopups(){
  //   // Magnific Popup
  //   var startWindowScroll = 0;
  //   $('[js-popup]').magnificPopup({
  //     type: 'inline',
  //     fixedContentPos: true,
  //     fixedBgPos: true,
  //     overflowY: 'auto',
  //     closeBtnInside: true,
  //     preloader: false,
  //     midClick: true,
  //     removalDelay: 300,
  //     mainClass: 'popup-buble',
  //     callbacks: {
  //       beforeOpen: function() {
  //         startWindowScroll = _window.scrollTop();
  //         // $('html').addClass('mfp-helper');
  //       },
  //       close: function() {
  //         // $('html').removeClass('mfp-helper');
  //         _window.scrollTop(startWindowScroll);
  //       }
  //     }
  //   });

  //   $('[js-popup-gallery]').magnificPopup({
  // 		delegate: 'a',
  // 		type: 'image',
  // 		tLoading: 'Загрузка #%curr%...',
  // 		mainClass: 'popup-buble',
  // 		gallery: {
  // 			enabled: true,
  // 			navigateByImgClick: true,
  // 			preload: [0,1]
  // 		},
  // 		image: {
  // 			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
  // 		}
  // 	});
  // }

  // function closeMfp(){
  //   $.magnificPopup.close();
  // }

  ////////////
  // UI
  ////////////

  // textarea autoExpand
  _document
    .one("focus.autoExpand", ".ui-group textarea", function() {
      var savedValue = this.value;
      this.value = "";
      this.baseScrollHeight = this.scrollHeight;
      this.value = savedValue;
    })
    .on("input.autoExpand", ".ui-group textarea", function() {
      var minRows = this.getAttribute("data-min-rows") | 0,
        rows;
      this.rows = minRows;
      rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
      this.rows = minRows + rows;
    });

  // Masked input
  function initMasks() {
    $("[js-dateMask]").mask("99.99.99", { placeholder: "ДД.ММ.ГГ" });
    $("input[type='tel']").mask("+38 (000) 000-0000", {
      // placeholder: "+38 (___) ___-____"
      placeholder: "Ваш телефон"
    });
  }

  // selectric
  function initSelectric() {
    $("select").selectric({
      maxHeight: 300,
      arrowButtonMarkup:
        '<b class="button"><svg class="ico ico-select-down"><use xlink:href="img/sprite.svg#ico-select-down"></use></svg></b>',

      onInit: function(element, data) {
        var $elm = $(element),
          $wrapper = $elm.closest("." + data.classes.wrapper);

        $wrapper.find(".label").html($elm.attr("placeholder"));
      },
      onBeforeOpen: function(element, data) {
        var $elm = $(element),
          $wrapper = $elm.closest("." + data.classes.wrapper);

        $wrapper
          .find(".label")
          .data("value", $wrapper.find(".label").html())
          .html($elm.attr("placeholder"));
      },
      onBeforeClose: function(element, data) {
        var $elm = $(element),
          $wrapper = $elm.closest("." + data.classes.wrapper);

        $wrapper.find(".label").html($wrapper.find(".label").data("value"));
      }
    });
  }

  ////////////
  // SCROLLMONITOR - WOW LIKE
  ////////////
  // function initScrollMonitor(){
  //   $('.wow').each(function(i, el){

  //     var elWatcher = scrollMonitor.create( $(el) );

  //     var delay;
  //     if ( $(window).width() < 768 ){
  //       delay = 0
  //     } else {
  //       delay = $(el).data('animation-delay');
  //     }

  //     var animationClass = $(el).data('animation-class') || "wowFadeUp"

  //     var animationName = $(el).data('animation-name') || "wowFade"

  //     elWatcher.enterViewport(throttle(function() {
  //       $(el).addClass(animationClass);
  //       $(el).css({
  //         'animation-name': animationName,
  //         'animation-delay': delay,
  //         'visibility': 'visible'
  //       });
  //     }, 100, {
  //       'leading': true
  //     }));
  //   });

  // }

  ////////////////
  // FORM VALIDATIONS
  ////////////////

  // jQuery validate plugin
  // https://jqueryvalidation.org
  function initValidations() {
    // GENERIC FUNCTIONS
    var validateErrorPlacement = function(error, element) {
      error.addClass("ui-input__validation");
      error.appendTo(element.parent("div"));
    };
    var validateHighlight = function(element) {
      $(element)
        .parent("div")
        .addClass("has-error");
    };
    var validateUnhighlight = function(element) {
      $(element)
        .parent("div")
        .removeClass("has-error");
    };
    var validateSubmitHandler = function(form) {
      $(form).addClass("loading");
      $.ajax({
        type: "POST",
        url: $(form).attr("action"),
        data: $(form).serialize(),
        success: function(response) {
          $(form).removeClass("loading");
          var data = $.parseJSON(response);
          if (data.status == "success") {
            // do something I can't test
          } else {
            $(form)
              .find("[data-error]")
              .html(data.message)
              .show();
          }
        }
      });
    };

    var validatePhone = {
      required: true,
      normalizer: function(value) {
        var PHONE_MASK = "+38 (XXX) XXX-XXXX";
        if (!value || value === PHONE_MASK) {
          return value;
        } else {
          return value.replace(/[^\d]/g, "");
        }
      },
      minlength: 11,
      digits: true
    };

    ////////
    // FORMS

    /////////////////////
    // REGISTRATION FORM
    ////////////////////
    $(".js-registration-form").validate({
      errorPlacement: validateErrorPlacement,
      highlight: validateHighlight,
      unhighlight: validateUnhighlight,
      submitHandler: validateSubmitHandler,
      rules: {
        name: "required",
        phone: "required"
        // phone: validatePhone
      },
      messages: {
        name: "Заполните это поле",
        phone: "Заполните это поле"
        // phone: {
        //     required: "Заполните это поле",
        //     minlength: "Введите корректный телефон"
        // }
      }
    });
  }

  // //////////
  // // BARBA PJAX
  // //////////
  // var easingSwing = [.02, .01, .47, 1]; // default jQuery easing for anime.js

  // Barba.Pjax.Dom.containerClass = "page";

  // var FadeTransition = Barba.BaseTransition.extend({
  //   start: function() {
  //     Promise
  //       .all([this.newContainerLoading, this.fadeOut()])
  //       .then(this.fadeIn.bind(this));
  //   },

  //   fadeOut: function() {
  //     var deferred = Barba.Utils.deferred();

  //     anime({
  //       targets: this.oldContainer,
  //       opacity : .5,
  //       easing: easingSwing, // swing
  //       duration: 300,
  //       complete: function(anim){
  //         deferred.resolve();
  //       }
  //     })

  //     return deferred.promise
  //   },

  //   fadeIn: function() {
  //     var _this = this;
  //     var $el = $(this.newContainer);

  //     $(this.oldContainer).hide();

  //     $el.css({
  //       visibility : 'visible',
  //       opacity : .5
  //     });

  //     anime({
  //       targets: "html, body",
  //       scrollTop: 1,
  //       easing: easingSwing, // swing
  //       duration: 150
  //     });

  //     anime({
  //       targets: this.newContainer,
  //       opacity: 1,
  //       easing: easingSwing, // swing
  //       duration: 300,
  //       complete: function(anim) {
  //         triggerBody()
  //         _this.done();
  //       }
  //     });
  //   }
  // });

  // // set barba transition
  // Barba.Pjax.getTransition = function() {
  //   return FadeTransition;
  // };

  // Barba.Prefetch.init();
  // Barba.Pjax.start();

  // Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {

  //   pageReady();
  //   closeMobileMenu();

  // });

  // some plugins get bindings onNewPage only that way
  function triggerBody() {
    _window.scrollTop(0);
    $(window).scroll();
    $(window).resize();
  }

  //////////
  // MEDIA Condition helper function
  //////////
  function mediaCondition(cond) {
    var disabledBp;
    var conditionMedia = cond.substring(1);
    var conditionPosition = cond.substring(0, 1);

    if (conditionPosition === "<") {
      disabledBp = _window.width() < conditionMedia;
    } else if (conditionPosition === ">") {
      disabledBp = _window.width() > conditionMedia;
    }

    return disabledBp;
  }

  //////////
  // DEVELOPMENT HELPER
  //////////
  function setBreakpoint() {
    var wHost = window.location.host.toLowerCase();
    var displayCondition =
      wHost.indexOf("localhost") >= 0 || wHost.indexOf("surge") >= 0;
    if (displayCondition) {
      var wWidth = _window.width();

      var content = "<div class='dev-bp-debug'>" + wWidth + "</div>";

      $(".page").append(content);
      setTimeout(function() {
        $(".dev-bp-debug").fadeOut();
      }, 1000);
      setTimeout(function() {
        $(".dev-bp-debug").remove();
      }, 1500);
    }
  }
});
