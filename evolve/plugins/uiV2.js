// global styles
import Vue from 'vue'
import '~/assets/scss/v2/main.scss';
import AppIconButton from '~/components/AppIconButton';
import AppPrimaryLoader from '~/components/AppPrimaryLoader';
import AppSecondaryLoader from '~/components/AppSecondaryLoader';
import ProcessResult from '~/components/AppProcessResult';
import Button from '~/components/AppButton';
import Icon from '~/components/AppIcon';
import Modal from '~/components/AppModal';
import EvolveModule from '~/components/EvolveModule';
import EvolveModuleContent from '~/components/EvolveModuleContent';
import EvolveTopActionBar from '~/components/EvolveTopActionBar';
import LazyImage from '~/components/AppLazyImage';
import globalMixin from '~/mixins/global.js'

// use global mixin
Vue.mixin(globalMixin);

Vue.filter('truncateString', /** @param {string} val */ function (val) {
	const length = 15;

	if (val.length <= length) {
		return val;
	}
	return val.substring(0, length).concat('...');
});

Vue.component('app-icon', Icon);
Vue.component('app-icon-button', AppIconButton);
Vue.component('app-primary-loader', AppPrimaryLoader);
Vue.component('app-secondary-loader', AppSecondaryLoader);
Vue.component('app-process-result', ProcessResult);
Vue.component('app-button', Button);
Vue.component('app-modal', Modal);
Vue.component('evolve-module', EvolveModule);
Vue.component('evolve-module-content', EvolveModuleContent);
Vue.component('evolve-top-action-bar', EvolveTopActionBar);
Vue.component('app-lazy-image', LazyImage);

