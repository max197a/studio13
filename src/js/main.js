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

    initPopups();
    initSliders();
    initMasks();
    initValidations();

    // development helper
    // _window.on("resize", debounce(setBreakpoint, 200));

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

        // $("body").css("overflow", "hidden");
        $("html").addClass("is-loaded");

        AOS.init();
      }, 1000);
    });
  })();

  // //////////
  // // MODALS
  // //////////

  function initPopups() {
    // Magnific Popup
    var startWindowScroll = 0;
    $("[js-popup]").magnificPopup({
      removalDelay: 500, //delay removal by X to allow out-animation
      callbacks: {
        beforeOpen: function() {
          this.st.mainClass = this.st.el.attr("data-effect");
        }
      },
      midClick: true
    });
  }

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
        success: function(data) {
          $(form).removeClass("loading");
          $.magnificPopup.open({
            items: {
              src: "#thankpopup",
              type: "inline"
            }
          });
        },
        error: function(data) {
          $.magnificPopup.open({
            items: {
              src: "#errorpopup",
              type: "inline"
            }
          });
        }
      });
      setTimeout(function() {
        $.magnificPopup.close();
      }, 50000);
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
      },
      messages: {
        name: "Заполните это поле",
        phone: "Заполните это поле"
      }
    });

    $(".js-registration-form2").validate({
      errorPlacement: validateErrorPlacement,
      highlight: validateHighlight,
      unhighlight: validateUnhighlight,
      submitHandler: validateSubmitHandler,
      rules: {
        name: "required",
        phone: "required"
      },
      messages: {
        name: "Заполните это поле",
        phone: "Заполните это поле"
      }
    });
  }

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
