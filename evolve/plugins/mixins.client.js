import Vue from 'vue'
import jQuery from './jquery'
import { sequenceShowSettings, scVars } from '~/assets/js/scutum_common'
require('~/plugins/velocity');

Vue.mixin({
	methods: {
		buttonReplaceContent (e, html, animate, classToAdd) {
			var self = this;
			var $el = $(e.target).closest('a,button').addClass('uk-transform-origin-center');
			var _html = $el.html();
			var $_html = $('<span class="uk-invisible">' + _html + '</span>');

			$el.html($_html);
			var $children = $el.children();

			if (animate) {
				velocity($el[0], {
					scale: 0.1,
					opacity: 0
				}, {
					duration: 140,
					easing: scVars.easingSwiftOut,
					complete: function () {
						velocity($el[0], 'reverse', { delay: 150 });
						if (classToAdd) {
							$el.addClass(classToAdd);
						}
						setTimeout(function () {
							$children.html(html).removeClass('uk-invisible');
							$el.removeClass('uk-transform-origin-center');
						}, 200)
					}
				});
			} else {
				$el.html(html);
			}
		},
		buttonShowLoading (el, mode) {
			var $el = $(el.target).closest('a,button');
			if (!$el.children('.sc-js-el-hide').length) {
				var $_html = $('<span class="uk-invisible">' + $el.html() + '</span>');
				var style = mode || $el.attr('data-button-mode') ? 'style="border-color: rgba(0,0,0,.2);border-top-color: rgba(255,255,255,.9)"' : '';
				var $spinner = $('<span class="sc-spinner sc-spinner-small uk-hidden"' + style + '></span>');
				$el.html($_html).append($spinner);
			}
			var $wrapper = $('<div>', {
				'class': 'sc-button-wrapper',
				'css': {
					'width': $el.outerWidth()
				}
			});
			$el.wrap($wrapper);
			velocity($el[0], {
				width: $el.outerHeight(),
				minWidth: $el.outerHeight()
			}, {
				duration: 140,
				easing: scVars.easingSwiftOut,
				complete: function () {
					$el.addClass('sc-button-round sc-button-flex uk-flex-center');
					$el.children('.sc-spinner').removeClass('uk-hidden');
					$el.children('.uk-invisible').toggleClass('uk-hidden uk-invisible');
				}
			})
		},
		buttonHideLoading (el) {
			var self = this;
			var $el = $(el.target).closest('a,button');
			var $wrapper = $el.closest('.sc-button-wrapper');
			velocity.hook($el, "transition", 'none');
			velocity($el[0], {
				width: $wrapper.width(),
				minWidth: $wrapper.width()
			}, {
				duration: 140,
				easing: scVars.easingSwiftOut,
				begin: function () {
					$el.children('.sc-spinner').remove();
					$el.removeClass('sc-button-round sc-button-flex uk-flex-center');
				},
				complete: function () {
					var $children = $el.children();
					$el.unwrap($wrapper);
					velocity.hook($el, "transition", '');
					setTimeout(function () {
						$children.replaceWith($children[0].childNodes);
						// cleanup
						velocity.hook($el, "width", '');
						velocity.hook($el, "min-width", '');
					}, 150);
				}
			});
		},
		cardShowContent (card, preloader, callback) {
			var $card = $(card);
			if ($card.hasClass('sc-card-hidden')) {
				$card.removeClass('sc-card-hidden');
				if (preloader) {
					$card.find('.uk-spinner').remove();
				}
				if (typeof callback !== 'undefined' && typeof callback === 'function') {
					callback();
				}
			}
		},
		cardHideContent (card, preloader, callback) {
			var $card = $(card);
			if (!$card.hasClass('sc-card-hidden')) {
				$card.addClass('sc-card-hidden');
				if (preloader) {
					$card.append('<div data-uk-spinner="ratio: 2"></div>');
				}
				if (typeof callback !== 'undefined' && typeof callback === 'function') {
					setTimeout(function () {
						callback();
					}, 320)
				}
			}
		},
		scrollbarDisable () {
			$('html').css({ 'overflow': 'hidden' });
			$('body').css({ 'overflow': 'hidden' });
			$('#sc-header').css({ 'margin-right': this.getScrollbarWidth() });
		},
		scrollbarEnable () {
			$('html').css({ 'overflow': '' });
			$('body').css({ 'overflow': '' });
			$('#sc-header').css({ 'margin-right': '' });
		},
		getScrollbarWidth (width) {
			var parent, child;
			if (typeof width === 'undefined') {
				parent = $('<div style="width:50px;height:50px;overflow:auto"></div>').appendTo('body');
				child = parent.children();
				width = child.innerWidth() - child.height(99).innerWidth();
				parent.remove();
			}
			return width;
		},
		loaderShow (css, container, ratio, color) {
			// var $spinner = $('.sc-spinner-overlay');
			var $spinner = $('.sc-spinner-overlayTest');
			if ($spinner.length) {
				$spinner.remove();
			}
			var $body = $('body');
			var _container = container || $body;
			var spinner = css ? '<div class="sc-spinner"></div>' : '<div class="' + (color || 'md-color-light-blue-500') + '" data-uk-spinner="ratio: ' + (ratio || 1) + '"></div>';
			var fixed = (_container === $body) ? ' fixed' : '';
			//$(_container).append('<div class="sc-spinner-overlay' + fixed + '">' + spinner + '</div>');
			$(_container).append('<div style="" class="sc-spinner-overlayTest"  >' + spinner + '</div>');
			setTimeout(function () {
				// $('.sc-spinner-overlay').addClass('enter');
				// $('.sc-spinner-overlayTest').addClass('enter');
				$('.sc-spinner-overlayTest').css({ "text-align": "center", "z-index": "99999", "position": "fixed", "width": "100%", "height": "100%", "top": "0", "left": "0", "padding-top": "25%", "font-size": "100px", "right": "0", "bottom": "0", "background-color": "rgba(0, 0, 0, 0.74)", "cursor": "pointer" });
			}, 50)
		},
		loaderHide () {
			// var $spinner = $('.sc-spinner-overlay');
			var $spinner = $('.sc-spinner-overlayTest');
			// $spinner.removeClass('enter');
			$spinner.remove();
			// $spinner.css({ "text-align": "", "z-index": "", "position": "", "width": "", "height": '', "top": "", "left": "", "padding-top": "", "font-size": "", "right": "", "bottom": "", "background-color": "", "cursor": "" });
			setTimeout(function () {
			}, 300)
		},
		sequenceShowActivate (el, animation, callback, repeat, manual) {
			let $this = (manual) ? $(el) : $(el).closest('.sc-sequence-show');
			if (manual) {
				$(el).closest('.sc-sequence-show-manual').removeClass('uk-invisible');
			}
			let _animation = animation || $this.attr('data-sequence-animation') || sequenceShowSettings.animation;
			let _repeat = repeat || false;
			$this.addClass('sc-sequence-show-animate ' + _animation);
			$this.one('webkitAnimationEnd animationend', function () {
				if (!_repeat) {
					$this
						.css('-webkit-animation-delay', '').css('animation-delay', '')
						.css('-webkit-animation-duration', '').css('animation-duration', '')
						.removeClass('sc-sequence-show sc-sequence-show-animate')
						.removeClass(_animation);
				} else {
					$this
						.removeClass('sc-sequence-show sc-sequence-show-animate')
						.removeClass(_animation);
				}
			});
			if (typeof callback === "function") {
				$this.last().one('webkitAnimationEnd animationend', function () {
					callback();
				})
			}
		}
	}
});
