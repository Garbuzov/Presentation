

/**
 *
 * @param $container
 * @param [params]
 * @constructor Slider
 */
var Slider = function($container, params) {

  /**
   * @type {jQuery}
   */
  this.container = $container;


  /**
   * @type {object}
   */
  this.params =  {
    'title' : '',
    'slide' : '.b_slide',
    'nav-class' : 'b_slide__nav',
    'nav-item-class' : 'b_slide__nav__item',
    'nav-item-active-class' : 'b_slide__nav__item--current',
    'current-class' : 'b_slide--current'
  };


  /**
   *
   * @type {jQuerн}
   */
  this.slides = $(this.container.find(this.params['slide']));


  /**
   * @type {number}
   */
  this.curSlide = 0;


  /**
   * @type {jQuery}
   */
  this.nav = null;


  /**
   * Начальная инициализация
   */
  this.__getSlide(0).addClass(this.params['current-class']);

  this.__setSlidesNav();
};


/**
 * @param index
 * @returns {jQuery}
 * @private
 */
Slider.prototype.__getSlide = function (index) {
  return this.slides.eq(index);
};


/**
 *
 * @param [index]
 * @returns {number}
 * @private
 */
Slider.prototype.__getNextIndex = function(index) {
  var index = (index !== undefined) ? index : this.curSlide;
  var next = 0;

  if (index + 1 < this.slides.length) {
    next = index + 1;
  }
  return next;
};


/**
 *
 * @param [index]
 * @returns {number}
 * @private
 */
Slider.prototype.__getPrevIndex = function(index) {
  var index = (index !== undefined) ? index : this.curSlide;
  var prev = this.slides.length - 1;

  if (index - 1 >= 0) {
    prev = index - 1;
  }
  return prev
};


/**
 *
 */
Slider.prototype.__setSlidesNav = function() {
  var self = this;
  var $nav = $('<div/>').attr('class', this.params['nav-class']);
  var $item = {};
  this.slides.each(function(index) {
    $item = $('<div/>').attr('class', self.params['nav-item-class']);
    $item.click(function(){
      self.goTo(index);
    });
    $nav.append($item);
  });

  this.nav = $nav.find('.' + this.params['nav-item-class']);
  this.__setActiveNav(0);

  $nav.appendTo(this.container);
};


/**
 *
 */
Slider.prototype.__setActiveNav = function(index) {
  this.nav.removeClass(this.params['nav-item-active-class'])
      .eq(index).addClass(this.params['nav-item-active-class']);
};


/**
 *
 * @param index
 */
Slider.prototype.goTo = function(index) {
  this.__getSlide(this.curSlide).removeClass(this.params['current-class']);
  this.__getSlide(index).addClass(this.params['current-class']);
  this.__setActiveNav(index);
  this.curSlide = index;
};


/**
 *
 */
Slider.prototype.showNextSlide = function() {
  if (this.curSlide < this.slides.length - 1){
    this.goTo(this.__getNextIndex(this.curSlide));
  }
};


/**
 *
 */
Slider.prototype.showPrevSlide = function() {
  if (this.curSlide > 0) {
    this.goTo(this.__getPrevIndex(this.curSlide));
  }
};


/**
 *
 * @returns {number}
 */
Slider.prototype.play = function() {
  var self = this;
  var slideAnimation = setInterval(function() {
    self.showNextSlide();
  }, 3000);
  return slideAnimation;
};




