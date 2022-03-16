const jQuery = require('~/plugins/jquery');
const scutum = 'Scutum Admin Template';

export const scHelpers = {
	/**
	 * Hide element during transform
	 * @param el			element to hide
	 * @param delay			delay in ms
	 * @param elExcluded	excluded element from hidding
	 */
	'hideDuringTransform': function (el, delay, elExcluded) {
		$(el).addClass('sc-js-el-transform');
		if (elExcluded) {
			$(el).find(elExcluded).addClass('sc-js-el-transform-visible');
		}
		setTimeout(function () {
			$(el).removeClass('sc-js-el-transform');
			if (elExcluded) {
				$(el).find(elExcluded).removeClass('sc-js-el-transform-visible');
			}
		}, delay || 280)
	},
	/**
	 * Remove element from DOM
	 * @param {string} el       element class or id
	 * @param {number} delay    remove delay
	 */
	'elementRemove': function (el, delay) {
		if (delay) {
			setTimeout(function () {
				$(el).remove();
			}, delay)
		} else {
			$(el).remove();
		}
	},
	/**
	 * Check if RTL mode is active
	 * @returns {boolean}
	 */
	'isRTL': function () {
		var getComputedStyle = window.getComputedStyle || function (element) {
			return element.currentStyle;
		};
		var style = getComputedStyle($('html')[0]);
		return style.direction === 'rtl';
	},
	'validation': {
		/**
		 * Email address validation
		 * @param   {string} email
		 * @returns {boolean}
		 */
		'emailAddress': function (email) {
			var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?(25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.)((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
			return pattern.test(email);
		}
	},
	/**
	 * Merge defaults with user options
	 * @param defaults
	 * @param options
	 */
	'extend': function (defaults, options) {
		var extended = {};
		var prop;
		for (prop in defaults) {
			if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
				extended[prop] = defaults[prop];
			}
		}
		for (prop in options) {
			if (Object.prototype.hasOwnProperty.call(options, prop)) {
				extended[prop] = options[prop];
			}
		}
		return extended;
	},
	/**
	 * Split an array into multiple sub array
	 * @param arr
	 * @param n
	 * @returns {*}
	 */
	splitArr: function (arr, n) {
		return arr.reduce(function (a, i) {
			if (a[a.length - 1].length >= arr.length / n) {
				a.push([])
			}
			a[a.length - 1].push(i);
			return a;
		}, [[]])
	}
};

/**
 * Generate unique ID ()
 * @param length
 * @returns {string}
 */
export function uniqueID (length) {
	var id = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
	var _length = length || 8;
	for (var i = 0; i < _length; i++) {
		id += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return id;
}

/**
 * Check if device has hi-res display
 * @returns {boolean}
 */
export function isHiRes () {
	var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)";
	if (window.devicePixelRatio > 1) {
		return true;
	}
	return window.matchMedia && window.matchMedia(mediaQuery).matches;
}

export const scMq = {
	'smallMax': function () {
		if(process.client) {
			return window.matchMedia('(max-width: 959px)').matches
		} else {
			return null;
		}
	},
	'mediumMin': function () {
		if(process.client) {
			return window.matchMedia('(min-width: 960px)').matches
		} else {
			return null;
		}
	},
	'mediumMax': function () {
		if(process.client) {
			return window.matchMedia('(max-width: 1199px)').matches
		} else {
			return null;
		}
	},
	'largeMin': function () {
		if(process.client) {
			return window.matchMedia('(min-width: 1200px)').matches
		} else {
			return null;
		}
	},
	'largeMax': function () {
		if(process.client) {
			return window.matchMedia('(max-width: 1599px)').matches
		} else {
			return null;
		}
	},
	'xlargeMin': function () {
		if(process.client) {
			return window.matchMedia('(min-width: 1600px)').matches
		} else {
			return null;
		}
	}
};

export const scVars = {
	easingSwiftOut: [0.55, 0, 0.1, 1],
	customScrollbar: false
};

export const sequenceShowSettings = {
	animation: 'uk-animation-scale-up', // animation class
	duration: '320', // animation duration
	delay: 0.4, // animation delay
	target: '', // animated element
	repeat: false // repeat animation
};

/**
 * Custom colors (used in eg. charts)
 */
export const scColors = {
	'multi': ['#0288D1', '#FB8C00', '#689F38', '#7B1FA2', '#D32F2F', '#00796B'],
	'blue': ['#01579B', '#0288D1', '#03A9F4', '#4FC3F7', '#B3E5FC'],
	'green': ['#558B2F', '#689F38', '#7CB342', '#8BC34A', '#9CCC65'],
	'chart_a': ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']
};

export default scutum;
