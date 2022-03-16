<template>
	<ul
		:class="{
			'sc-sidebar-menu uk-nav': isParent,
			'sc-sidebar-menu-sub': !isParent
		}"
	>
		<li
			v-for="item in appList"
			:key="item.EvolveApp_ID"
			:class="{
				'sc-has-submenu': true,
				'sc-page-active':  $route.path === item.EvolveApp_Url || pageChild(item),
				'sc-section-active': false,
				'sc-sidebar-menu-heading': item.EvolveApp_Name,
				'sc-sidebar-menu-separator': false
			}"
		>
			<!-- <div>
				<span v-if="item.EvolveApp_Icon" class="uk-nav-icon">
					<i :class="item.EvolveApp_Icon"></i>
				</span>
				<span class="uk-nav-title">
					{{ item.EvolveApp_Name }}
				</span>
			</div> -->

			<a href="javascript:void(0)">
				<span v-if="item.EvolveApp_Icon" class="uk-nav-icon">
					<i :class="item.EvolveApp_Icon"></i>
				</span>
				<span class="uk-nav-title">
					{{ item.EvolveApp_Name }}
				</span>
			</a>

			<!-- <a href="javascript:void(0)" @click.stop="toggleSection($event, item)">
				<span v-if="item.EvolveApp_Icon" class="uk-nav-icon">
					<i :class="item.EvolveApp_Icon"></i>
				</span>
				<span class="uk-nav-title">
					{{ item.EvolveApp_Name }}
				</span>
			</a> -->
			<transition
				:css="false"
				@enter="tEnter"
				@enter-cancelled="tEnterCancelled"
				@leave="tLeave"
				@leave-cancelled="tLeaveCancelled"
			>
				<ScMenuList v-if="item.submenu && item.submenu.length" v-show="item.isOpen" :menu-data="item.submenu"></ScMenuList>
			</transition>
		</li>
	</ul>
</template>

<script>
import { mapState } from 'vuex'
import { scVars } from '~/assets/js/utils'
import _ from 'lodash';

require('~/plugins/velocity.client.js');

export default {
	name: 'ScMenuList',
	props: {
		appData: {
			type: Array,
			default: null
		},
		isParent: Boolean
	},
	computed: {
		...mapState([
			'vxSidebarMainAccordionMode',
			'vxSidebarMainScrollToActive',
			'vxActiveLang'
		]),
		appList () {
			return this.appData;
		}
	},
	mounted() {
		console.log(this.appData);
	},
	methods: {
		pageChild (item) {
			return this.$nuxt.$route.matched.some(route => route.path === item.EvolveApp_Url)
		},
		toggleSection (e, item) {
			const state = this.$store.state;
			if (state.vxSidebarMainAccordionMode) {
				const items = _.filter(this.appList, {level: item.level});
				items.forEach(k => {
					if(k.title !== item.title) {
						k.isOpen = false;
					}
				});
			}
			item.isOpen = !item.isOpen;
		},
		setSectionOpen (item) {
			let subPages = this.getSubPages(item.submenu);
			if(subPages.length) {
				let isActive = subPages.some(path => {
					return this.$route.path.indexOf(path) === 0
				});
				if(isActive) {
					item.isOpen = true;
				}
			}
		},
		getSubPages (items) {
			let pages = [];
			items.forEach(k => {
				if (k.page !== 'undefinded' && k.page !== '') {
					pages.push(k.page)
				}
				if (typeof k.submenu !== 'undefined') {
					this.getSubPages(k.submenu);
				}
			});
			return pages;
		},
		tEnter (el, done) {
			const state = this.$store.state;
			velocity(el, 'slideDown', {
				duration: 280,
				easing: scVars.easingSwiftOut,
				complete () {
					if (state.vxSidebarMainScrollToActive) {
						velocity(el.closest('.sc-section-active'), "scroll", {
							duration: 360,
							easing: scVars.easingSwiftOut,
							container: document.getElementsByClassName('sc-sidebar-main-scrollable'),
							offset: 1
						});
					}
					done();
				}
			});
		},
		tEnterCancelled (el) {
			velocity(el, 'stop')
		},
		tLeave (el, done) {
			velocity(el, 'slideUp', {
				duration: 200,
				easing: scVars.easingSwiftOut,
				complete: done
			})
		},
		tLeaveCancelled (el) {
			velocity(el, 'stop')
		}
	}
}
</script>
