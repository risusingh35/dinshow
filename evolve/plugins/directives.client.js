import Vue from 'vue'
import jQuery from './jquery'
import { scHelpers, sequenceShowSettings, scVars } from '~/assets/js/scutum_common'
require('~/plugins/velocity');

Vue.directive('cardFullscreen', {
	inserted: (el, binded, vnode) => {
		var $el = $(el);

		$el.on('click', function (e) {
			e.preventDefault();
			var $this = $(this);
			var $win = $(window);
			var $card = $this.closest('.uk-card');
			var card = {};

			card.width = $card.width();
			card.height = $card.height();
			card.offset = $card.offset();
			card.position = $card.position();

			if (!$card.hasClass('sc-card-fs-active')) {
				var scrollTop = $win.scrollTop();

				vnode.context.scrollbarDisable();

				$card
					.addClass('sc-card-fs-active sc-card-fs-animate')
					.css({
						'width': card.width,
						'height': card.height,
						'left': card.offset.left,
						'top': card.offset.top - scrollTop
					});

				$('<div class="sc-card-fs-placeholder" style="height:' + $card.height() + 'px">').insertBefore($card);

				velocity($card[0], {
					top: 0,
					left: 0,
					width: '100%',
					height: '100%'
				}, {
					delay: 280,
					duration: 560,
					easing: scVars.easingSwiftOut,
					begin: function () {
						$this.toggleClass('mdi-fullscreen mdi-fullscreen-exit');
					},
					complete: function () {
						$card.removeClass('sc-card-fs-animate');
						$win.resize();
					}
				});
			} else {
				var $placeholder = $('.sc-card-fs-placeholder');
				var placeholder = {};

				placeholder.width = $placeholder.width();
				placeholder.height = $placeholder.height();
				placeholder.offset = $placeholder.offset();

				$card.addClass('sc-card-fs-animate');

				velocity($card[0], {
					top: placeholder.offset.top - $win.scrollTop(),
					left: placeholder.offset.left,
					height: placeholder.height,
					width: placeholder.width
				}, {
					delay: 280,
					duration: 560,
					easing: scVars.easingSwiftOut,
					complete: function () {
						$card.removeClass('sc-card-fs-active sc-card-fs-animate');
						$this.toggleClass('mdi-fullscreen mdi-fullscreen-exit');
						$placeholder.remove();
						vnode.context.scrollbarEnable();
						// cleanup & trigger resize components
						velocity.hook($card, "top", '');
						velocity.hook($card, "left", '');
						velocity.hook($card, "width", '');
						velocity.hook($card, "height", '');
						$win.resize();
					}
				});
			}
		});
	}
});

Vue.directive('cardToggle', {
	inserted: (el, binded, vnode) => {
		var $el = $(el);
		$el.on('click', function (e) {
			e.preventDefault();
			var $this = $(this);
			var $card = $this.closest('.uk-card');
			var $cardContent = $card.find('.sc-card-content');

			if (!$card.hasClass('sc-card-minimized')) {
				$cardContent
					.height($cardContent.height())
					.css({ 'transition': 'none' });
				velocity($cardContent[0], 'slideUp', {
					duration: 280,
					easing: scVars.easingSwiftOut,
					begin: function () {
						$card.addClass('sc-card-minimized');
						$this.toggleClass('mdi-window-minimize mdi-window-maximize');
					},
					complete: function () {
						$cardContent.css({
							'transition': ''
						});
					}
				})
			} else {
				velocity($cardContent[0], 'slideDown', {
					duration: 280,
					easing: scVars.easingSwiftOut,
					begin: function () {
						$cardContent.css({ 'transition': 'none' });
						$card.removeClass('sc-card-minimized');
						$this.toggleClass('mdi-window-minimize mdi-window-maximize');
					},
					complete: function () {
						$cardContent.css({
							'height': '',
							'transition': ''
						});
					}
				})
			}
		});
	}
});

Vue.directive('cardRemove', {
	inserted: (el, binded, vnode) => {
		var $el = $(el);
		$el.on('click', function (e) {
			e.preventDefault();
			var $card = $el.closest('.uk-card');
			var $elToRemove = (binded.value && 'elToRemove' in binded.value) ? $card.closest(binded.value.elToRemove) : $card;
			$card.addClass('uk-animation-scale-up uk-animation-reverse');
			$card.one('webkitAnimationEnd animationend', function () {
				if (binded.value && typeof binded.value.noAutoRemove === 'undefined') {
					scHelpers.element.remove($elToRemove, 100);
				}
				if(binded.value && 'callback' in binded.value) {
					setTimeout(function () {
						binded.value.callback(binded.value.callbackParams || '');
					}, 100);
				}
			});
		});
	}
});

Vue.directive('columnHide', {
	inserted: (el) => {
		var $this = $(el);
		$this.find('.sc-js-column-collapse').on('click', function (e) {
			e.preventDefault();
			scHelpers.hideDuringTransform($this);
			$this.addClass('sc-column-collapsed');
		});
	}
});

Vue.directive('columnToggle', {
	inserted: (el) => {
		var $this = $(el);
		$this.find('.sc-js-column-collapse').on('click', function (e) {
			e.preventDefault();
			scHelpers.hideDuringTransform($this);
			$this.addClass('sc-column-collapsed');
		});
		$this.find('.sc-js-column-expand').on('click', function (e) {
			e.preventDefault();
			scHelpers.hideDuringTransform($this);
			$this.removeClass('sc-column-collapsed');
		});
	}
});

Vue.directive('sequenceShow', {
	inserted: (el, binded, vnode) => {
		setTimeout(function () {
			var $this = $(el);
			if ($this.hasClass('sc-sequence-show-processed')) {
				return;
			}
			var settings = JSON.parse(JSON.stringify(sequenceShowSettings));
			if (binded.value) {
				Object.keys(binded.value).forEach(function (item) {
					settings[item] = binded.value[item];
				});
			}
			var $target = (settings.target === '') ? $this.children() : $this.find(settings.target);
			var _repeat = settings.repeat;
			$target.each(function (index) {
				$(this).addClass('sc-sequence-show')
			});

			var thisOffset = $this.offset();
			$target.each(function (index) {
				var $el = $(this);
				var elementPosition = $el.position();
				var calculatedOffset = elementPosition.left * 0.8 + (elementPosition.top - thisOffset.top);
				var delay = parseFloat(calculatedOffset * settings.delay).toFixed(0);
				$el
					.css('-webkit-animation-delay', delay + 'ms').css('animation-delay', delay + 'ms')
					.css('-webkit-animation-duration', settings.duration + 'ms').css('animation-duration', settings.duration + 'ms');
				if (!$this.hasClass('sc-sequence-show-manual')) {
					$this.on('inview', function () {
						vnode.context.sequenceShowActivate($el, settings.animation, null, _repeat);
					});
				}
			});
			// show items when they are in view
			if (!$this.hasClass('sc-sequence-show-manual')) {
				if (typeof UIkit.scrollspy === 'function') {
					UIkit.scrollspy($this, {
						offset: 100
					});
				}
				$this.removeClass('uk-invisible');
			}
			$this.addClass('sc-sequence-show-processed');
		}, 100)
	}
});

Vue.directive('boxGradient', {
	inserted: (el, binded, vnode) => {
		const $this = $(el);
		const colors = binded.value.split(',');
		vnode.context.$nextTick(() => {
			$this.css({
				'background-color': colors[1],
				'background-image': 'linear-gradient( 135deg, ' + colors[0] + ' 10%, ' + colors[1] + ' 100%)'
			})
		})
	}
});

/**
 * Detect Clicks Outside an Element
 * v-closable="{ exclude: [], handler: '' }"
 * exclude: an array of id's of the elements that we don't want to trigger the outside-click event
 * handler: the name of the method that will handle the outside-click event
 *
 * https://medium.com/@Taha_Shashtari/an-easy-way-to-detect-clicks-outside-an-element-in-vue-1b51d43ff634
 */
let handleOutsideClick;
Vue.directive('closable', {
	bind (el, binding, vnode) {
		handleOutsideClick = (e) => {
			e.stopPropagation();
			const { handler, exclude } = binding.value;
			let clickedOnExcludedEl = false;
			if(typeof exclude !== 'undefined') {
				exclude.forEach(id => {
					if (!clickedOnExcludedEl) {
						const excludedEl = document.getElementById(id);
						clickedOnExcludedEl = excludedEl.contains(e.target);
					}
				});
			}
			if (!el.contains(e.target) && !clickedOnExcludedEl) {
				vnode.context[handler]()
			}
		};
		document.addEventListener('click', handleOutsideClick);
		document.addEventListener('touchstart', handleOutsideClick);
	},
	unbind () {
		document.removeEventListener('click', handleOutsideClick);
		document.removeEventListener('touchstart', handleOutsideClick);
	}
});
