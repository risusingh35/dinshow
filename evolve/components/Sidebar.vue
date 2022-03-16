<template>
	<aside id="sc-sidebar-main" class="sc-sidebar-info-fixed">
		<div id="sc-sidebar-main-offcanvas-bar" v-touch:swipe.left="closeSidebar" class="uk-offcanvas-bar">
			<div class="sc-sidebar-main-scrollable" data-sc-scrollbar="visible-y">
				<ScMenuList v-if="appEntries.length > 0" :menu-data="appEntries" :is-parent="true"></ScMenuList>
			</div>
		</div>
	</aside>
</template>

<script>
import { mapState } from 'vuex'
import ScMenuList from './navigation/MenuList';
import { scMq } from '~/assets/js/utils'

require('~/plugins/vue2-touch-events')

export default {
	name: 'ScSidebar',
	components: {
		ScMenuList
	},
	data: () => ({
		appEntries: [],
		search: ''
	}),
	computed: mapState([
		'vxSidebarMainExpanded',
		'vxAppVersion',
		'activeAppCode'
	]),
	watch: {
		'vxSidebarMainExpanded' (state) {
			if(scMq.mediumMax() || this.$store.getters['sidebarOffcanvasState']) {
				if (state) {
					UIkit.offcanvas('#sc-sidebar-main').show();
					if(this.$store.getters.offcanvasState) {
						this.$store.commit('offcanvasToggle', false);
					}
				} else {
					UIkit.offcanvas('#sc-sidebar-main').hide();
				}
			}
		},
		$route () {
			this.$nextTick(() => {
				if(scMq.mediumMax()) {
					this.$store.commit('sidebarMainToggle', false);
				}
			})
		},
		activeAppCode () {
			this.search = '';
			// this.getAppList();
		},
		appEntries (newEntry) {
			console.log("<<<<<<<< NEW APP ENTRY >>>>>>>>>>>", newEntry);
		}
	},
	mounted () {
		const self = this;
		this.$nextTick(() => {
			if(scMq.mediumMax() || this.$store.getters['sidebarOffcanvasState']) {
				// activate UIKit offcanvas
				UIkit.offcanvas(document.getElementById('sc-sidebar-main'), {
					overlay: true,
					container: '#nuxt-wrapper'
				});
				// update drop container
				UIkit.util.on('#sc-sidebar-main', 'hidden', function () {
					self.$store.commit('sidebarMainToggle', false);
				});
				self.$store.commit('sidebarMainToggle', false);
			}
		})

		this.getAppList();

	},
	methods: {
		async getAppList () {
			const response = await this.$axios
				.$get("/api/v1/evolve/appMenuList")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server"
					);
				});

			if (response.statusCode === 200) {
				console.log("APP LIST >>>", response);
				this.appEntries = response.result;
				// this.fetchMenuFromAppEntries(response.result);
			} else {
				this.notification("danger", 3000, "Error while getting menu list");
			}
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
		
		fetchMenuFromAppEntries (newAppEntries) {
			const appList = newAppEntries;

			if (Array.isArray(appList) && appList.length > 0) {
				Promise.all(appList.map(async (app)=> {
					const code = app.EvolveApp_Code;
					const menu = await this.fetchMenuFromApp(code);
					app.menuitems = menu;
					app.isOpen = false;
					return app;
				}))
					.then(val => {
						this.appEntries = val;
						console.log("RESOLVE ALL >>>>>>>>>>>", val);
					})
					.catch(err => {
						this.notification("danger", 3000, "Something went wrong");
					})
			}
		},

		closeSidebar (direction, event) {
			if (event.type === 'touchend') {
				this.$store.commit('sidebarMainToggle', false);
			}
		}
	}
}
</script>

<style>
</style>
