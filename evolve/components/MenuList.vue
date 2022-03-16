<template>
	<ul :class="{ 'sc-sidebar-menu uk-nav': isParent, 'sc-sidebar-menu-sub': !isParent }">
		<li v-for="item in menuItems" :key="item.id" :class="{'sc-has-submenu': item.submenu && item.submenu.length, 'sc-page-active': isActive(item) }">
			<nuxt-link v-if="item.page && item.page.length" :to="item.page">
				<span class="uk-nav-icon">
					<i :class="item.icon"></i>
				</span>
				<span class="uk-nav-title">
					{{ item.title }}
				</span>
			</nuxt-link>
			<a v-if="!item.page" href="javascript:void(0)" @click="toggleSection($event,item)">
				<span class="uk-nav-icon">
					<i :class="item.icon"></i>
				</span>
				<span class="uk-nav-title">
					{{ item.title }}
				</span>
			</a>
			<MenuList v-if="item.submenu && item.submenu.length" :menu-data="item.submenu"></MenuList>
		</li>
	</ul>
</template>

<script>
import { mapState } from 'vuex'
import jQuery from '~/plugins/jquery'
import { scMq, scVars } from '~/assets/js/scutum_common'
if(process.client) {
	const velocity  = require('velocity-animate')
}

export default {
	name: 'MenuList',
	props: {
		menuData: {
			type: Array,
			default: function () { return [] }
		},
		isParent: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			menuItems: null
		}
	},
	computed: {
		...mapState([
			'sidebarMainAccordionMode',
			'sidebarMainScrollToActive'
		])
	},
	mounted () {
		this.$nextTick(() => {
			this.menuItems = this.menuData;
			this.toggleParent();
		});
	},
	methods: {
		toggleSection: function (e) {
			e.preventDefault();
			const state = this.$store.state;
			const $el = $(e.target).closest('a');
			const $ul = $el.next('ul');
			const slideToogle = ($ul.length && $ul.is(':visible')) ? 'slideUp' : 'slideDown';
			const $sidebarMain = $('#sc-sidebar-main');
			velocity($ul[0], slideToogle, {
				duration: 280,
				easing: scVars.easingSwiftOut,
				begin: function () {
					if (slideToogle === 'slideUp') {
						$el.closest('.sc-has-submenu').removeClass('sc-section-active')
					} else {
						// accordion mode
						if (state.sidebarMainAccordionMode) {
							$el.closest('li').siblings('.sc-has-submenu').each(function () {
								velocity($(this).children('ul')[0], 'slideUp', {
									duration: 300,
									easing: scVars.easingSwiftOut,
									begin: function () {
										$(this).closest('.sc-has-submenu').removeClass('sc-section-active')
									}
								})
							})
						}
						$(this).closest('.sc-has-submenu').addClass('sc-section-active');
					}
				},
				complete: function () {
					if (slideToogle !== 'slideUp') {
						// scroll to active section
						if (state.sidebarMainScrollToActive) {
							velocity($el.closest('.sc-section-active')[0], "scroll", {
								duration: 400,
								easing: scVars.easingSwiftOut,
								container: $sidebarMain.find(".uk-offcanvas-bar"),
								offset: 1
							});
						}
					}
				}
			});
		},
		toggleParent: function (e) {
			const $sidebar = $('#sc-sidebar-main');
			if($sidebar) {
				$sidebar.find('.nuxt-link-active').closest('li').addClass('sc-page-active');
				$sidebar.find('.sc-page-active').each(function () {
					var $this = $(this);
					$this.parents('.sc-has-submenu').addClass('sc-section-active');
					$this.parents('ul').css({
						'display': 'block'
					});
				});
			}
		},
		isActive (item) {
			if(process.client) {
				return $nuxt.$route.matched.some(route => route.path === item.page)
			}
		}
	}
}
</script>
