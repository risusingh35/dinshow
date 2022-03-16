<template>
	<ul
		:class="{
			'sc-sidebar-menu uk-nav': isParent,
			'sc-sidebar-menu-sub': !isParent
		}"
	>
		<li
			v-for="item in menuSet"
			:key="item.id"
			:class="{
				'sc-has-submenu': item.menuitems && item.menuitems.length,
				'sc-page-active': $route.path === item.EvolveApp_Url || pageChild(item),
				'sc-section-active': item.isOpen,
			}"
		>
			<!-- <nuxt-link v-if="item.EvolveApp_Url && !item.menuitems" :to="item.EvolveApp_Url">
				<span v-if="item.EvolveApp_Icon" class="uk-nav-icon">
					<i :class="item.EvolveApp_Icon"></i>
				</span>
				<span class="uk-nav-title">
					{{ item.EvolveApp_Name }}
				</span>
			</nuxt-link> -->

			<nuxt-link v-if="item.page && !item.menuitems" :to="item.page">
				<span v-if="item.icon" class="uk-nav-icon">
					<i :class="item.icon"></i>
				</span>
				<span class="uk-nav-title">
					{{ item.title }}
				</span>
			</nuxt-link>

			<a href="javascript:void(0)" @click.stop="toggleSection($event, item)">
				<span v-if="item.EvolveApp_Icon" class="uk-nav-icon">
					<i :class="item.EvolveApp_Icon"></i>
				</span>
				<span class="uk-nav-title">
					{{ item.EvolveApp_Name }}
				</span>
			</a>


			<!-- <a v-if="item.EvolveApp_Url === '' && !item.menuitems" href="javascript:void(0)">
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
				<ScMenuList 
					v-if="item.menuitems && item.menuitems.length" 
					v-show="item.isOpen" 
					:is-parent="false"
					:menu-data="item.menuitems"
				>
				</ScMenuList>
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
		menuData: {
			type: Array,
			default: null
		},
		isParent: Boolean
	},
	data () {
		return {
			menuSet: []
		}
	},
	computed: {
		...mapState([
			'vxSidebarMainAccordionMode',
			'vxSidebarMainScrollToActive',
			'vxActiveLang'
		]),
		menuItems () {
			return this.menuData
		}
	},
	created () {
		this.menuItems.forEach(k => {
			if (typeof k.submenu !== 'undefined') {
				this.setSectionOpen(k)
			}
		});

		this.menuSet = this.menuItems.map(item => {
			item.isOpen = false;
			return item;
		});

		console.log("MENU SET >>>>", this.menuSet);
	},
	methods: {
		pageChild (item) {
			return this.$nuxt.$route.matched.some(route => route.path === item.page)
		},
		async toggleSection (e, item) {
			const state = this.$store.state;
			const appCode = item.EvolveApp_Code;
			let menu;

			if (state.vxSidebarMainAccordionMode) {
				const items = _.filter(this.menuItems, {level: item.level});
				items.forEach(k => {
					if(k.title !== item.title) {
						k.isOpen = false;
					}
				});
			}
			item.isOpen = !item.isOpen;

			if (item.isOpen === true) {
				menu = await this.fetchMenuFromApp(appCode);
			}
			else {
				menu = [];
			}

			this.menuSet = this.menuSet.map((appItem) => {
				if (appItem.EvolveApp_Code === appCode) {
					console.log("START ASSIGNMENT", menu);
					appItem.menuitems = menu;
				}
				return appItem;
			});

			console.log("NEW MENU SET >>>", this.menuSet);
		},

		async fetchMenuFromApp (appcode) {
			const payload = {
				EvolveApp_Code: appcode,
				EvolveMenu_Name: '',
			};
	
			const response = await this.$axios
				.$post("/api/v1/evolve/evolveMenuList", payload)
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server"
					);
				});

			if (response.statusCode === 200) {
				return response.result || [];
			} else {
				this.notification("danger", 3000, "Error while getting menu list");
			}
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
