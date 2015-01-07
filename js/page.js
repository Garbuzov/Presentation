/**
 *
 */
$(document).ready(function(){

  /**
   * Presentations Init
   */
  var PageControls = (function() {

    var curPresent = null;
    var animation = null;
    var activeClass = 'b_slide__wrapper--active';
    var $nav = $('.c_nav_menu');
    var $navItem = null;
    var $presentations = $('.b_slide__wrapper');

    var navItemClass = util.getBlockClass($nav) + '__item';
    var navItemActiveClass = navItemClass + '--active';

    $presentations.each(function(index) {
      var $gallery = $(this);
      var slider = new Slider($gallery);

      if (!curPresent) {
        curPresent = slider;
      }

      // Инициализация библиотеки презентаций
      $navItem = $('<li>' + 'Презентация ' + index + '</li>');
      $navItem.attr('class', navItemClass);

      $navItem.click(function(){
        $(this).addClass(navItemActiveClass)
            .siblings().removeClass(navItemActiveClass);
        $gallery.addClass(activeClass)
            .siblings().removeClass(activeClass);
        curPresent = slider;
        clearInterval(animation);
      });
      $nav.append($navItem);
    });

    $nav.children().eq(0).addClass(navItemActiveClass);
    $presentations.eq(0).addClass(activeClass);

    return {
      nextSlide : function() {
        curPresent.showNextSlide();
      },

      prevSlide: function() {
        curPresent.showPrevSlide();
      },

      play: function(){
        animation = curPresent.play();
      },

      pause: function() {
        clearInterval(animation);
      }
    }
  })();


  // Sidebar show/hide
  var $sidebar = $('.b_sidebar');

  $('.b_sidebar__label').click(function(){
    $sidebar.toggleClass('b_sidebar--active');
    $(this).find('.fa').toggleClass('fa-chevron-right').toggleClass('fa-chevron-left');
  });


  // Init of universal Control Panel
  var timeCounter = 0;
  var $controlPanel = $('.b_controls');

  setInterval(function(){
    timeCounter++;
    if (timeCounter > 2) {
      $controlPanel.removeClass('b_controls--visible');
    } else {
      $controlPanel.addClass('b_controls--visible');
    }
  }, 1000);

  $(document).mousemove(function(){
    timeCounter = 0;
  });

  $('.c_btn_next').click(function() {
    PageControls.nextSlide();
  });

  $('.c_btn_prev').click(function() {
    PageControls.prevSlide();
  });

  $('.c_btn_play').click(function() {
    var $element = $(this);

    if($element.data('state') === 'pause') {
      PageControls.pause();
      $element.data('state','play').find('.fa').removeClass('fa-pause').addClass('fa-play');
    } else {
      $element.data('state','pause').find('.fa').removeClass('fa-play').addClass('fa-pause');
      PageControls.play();
    }
  });
});

