// import Vue from 'vue'
// import jQuery from './jquery'
// require('jquery-date-range-picker/src/jquery.daterangepicker');
// require('~/assets/scss/plugins/daterangepicker.scss');

// Vue.directive("dateRangePicker", {
// 	bind: (el, binding) => {
// 		let _config = {
// 			separator: '~',
// 			customArrowPrevSymbol: '<i class="mdi mdi-chevron-left"></i>',
// 			customArrowNextSymbol: '<i class="mdi mdi-chevron-right"></i>',
// 			startOfWeek: 'monday',
// 			customOpenAnimation: function (cb) {
// 				$(this).css({'transform': 'translateY(-20px)'}).fadeIn(280, cb).css({'transform': 'translateY(0)'});
// 			},
// 			customCloseAnimation: function (cb) {
// 				$(this).fadeOut(140, cb).css({'transform': 'translateY(-20px)'});
// 			}
// 		};
// 		const config = $.extend(_config, binding.value);
// 		const input = el.querySelector('input');
// 		if(input) {
// 			$(input).dateRangePicker(config);
// 		} else {
// 			$(el).dateRangePicker(config);
// 		}
// 		const $dpWrapper = $('.date-picker-wrapper');
// 		// style range input
// 		$dpWrapper.find('input[type="range"]').addClass('uk-range');
// 		// remove &nbsp; in shortcuts
// 		const $shortcuts  = $dpWrapper.find('.footer > .shortcuts');
// 		if($shortcuts.length)  {
// 			// $shortcuts.html().replace(/&nbsp;/g, '');
// 		}
// 	},
// 	unbind: (el, binding) => {
// 		const input = el.querySelector('input');
// 		if(input) {
// 			$(input).data('dateRangePicker').destroy();
// 		} else {
// 			$(el).data('dateRangePicker').destroy();
// 		}
// 	}
// });
