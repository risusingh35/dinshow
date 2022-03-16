<template>
	<aside 
		id="app-sidebar" 
		ref="appSidebarRoot"
		:aria-collapsed="!collapsedSidebar"
	>
		<!-- @mouseenter="expandMenu"
		@mouseleave="collapseMenu" -->
		<!-- App top fixed sector -->
		<div class="fixed-sector">
			<!-- App sidebar search -->
			<app-sidebar-search 
				v-show="collapsedSidebar" 
				@searchinput="handleMenuSearch"
			/>
		</div>

		<!-- App sidebar toggler -->
		<app-sidebar-toggler 
			:collapsed="collapsedSidebar" 
			@toggle="handleToggleState"
		/>  

		<!-- App sidebar menu -->
		<app-sidebar-menu 
			:list="menu" 
			:collapsed="!collapsedSidebar"
		/>

		<!-- My Favourite -->
		<my-favourite :collapsed="!collapsedSidebar" /> 
	</aside>
</template>

<script>
/**
 * @typedef SidebarMenuItem 
 * @property {string} key - Item key
 * @property {string} icon - Icon name
 * @property {string} label - Item label
 * @property {string} url - Item url
 * @property {boolean} [active] - Active state
 */

import Menu from './Menu.vue';
import SearchBar from './SearchBar.vue';
import Toggler from './Toggler.vue';
import MyFavourite from './MyFavourite.vue';
import { mapState } from 'vuex'
// import MenuListVue from '../../eDefault/MenuList.vue';

export default {
	name: 'AppSidebar',

	components: {
		'app-sidebar-menu': Menu,
		'app-sidebar-search': SearchBar,
		'app-sidebar-toggler': Toggler,
		'my-favourite':MyFavourite
	},

	props: {
		'enableMenuSearch': {
			type: Boolean,
			default: false
		},
	},
    
	data () {
		return {
			/**
             * Menu items
             * @type {object[]}
             */
			menuitems: [],

			/**
			 * Local state of menu items
			 * @type {object[]}
			 */
			menu: [],
			linearMenu: [],

			search: ''
		}
	},

	computed: {
		...mapState(['activeAppCode', 'collapsedSidebar']),

		appSidebarRoot () {
			return this.$refs['appSidebarRoot'];
		}
	},

	watch: {
		search (newQuery) {
		 
			if (newQuery.length > 0) {
				 
				let filtered = this.linearMenu.filter(function (item) {
					const label = (item.title || '').toLowerCase();
					const input = newQuery.toLowerCase();
	
					if (label.indexOf(input) !== -1) {
							 return item;
					}
				});

				filtered = filtered.map(item => {
					item._isQuery = true;
					return item;
				});
				this.menu = filtered;
			}
			else {
				this.menu = this.menuitems;
			}

		},
		activeAppCode () {
			this.search = '';
			this.getMenuList();
		},
		menuitems (newItems) {
			this.menu = newItems;
		}
	},

	created () {
		this.$store.commit('collapseSidebar', true);
		this.getMenuList();
	},


	methods: {
		/**
		 * Handling toggle state of sidebar
		 * @param {boolean} mode - Collapse mode
		 */
		handleToggleState (mode) {
	
			// Update current state
			this.$store.commit('collapseSidebar', mode);
		},

		expandMenu () {
			// Update current state
			this.$store.commit('collapseSidebar', false);
		},

		collapseMenu () {
			// Update current state
			this.$store.commit('collapseSidebar', true);
		},
	
		handleMenuSearch (val) {
			if (this.enableMenuSearch) {
				this.search = val;
			}
		},

		createLinearArrayMenu () {
			let menu = [];
			for (let menuItem of this.menuitems) {
				if(Array.isArray(menuItem.submenu)) {
					for (let menuItemSub of menuItem.submenu) {
						if(menuItemSub.submenu != undefined && 0 < menuItemSub.submenu.length){
							for (let menuItemSubChild of menuItemSub.submenu) {
								if(menuItemSubChild.submenu != undefined && 0 < menuItemSubChild.submenu.length){
									for (let menuItemSubChildSub of menuItemSubChild.submenu) {
										if(menuItemSubChildSub.submenu != undefined &&  0 < menuItemSubChildSub.submenu.length){
											// last
										}else{
											if(menuItemSubChildSub.submenu == undefined ){
												menuItemSubChildSub.submenu = [];
											}
											menu.push(menuItemSubChildSub);
										}
									}
								}else{
									if(menuItemSubChild.submenu == undefined ){
										menuItemSubChild.submenu = [];
									}
									menu.push(menuItemSubChild);
								}
							}
						}else{
							menu.push(menuItemSub);
						}
					}
				}

				//if ('submenu' in menuItem && Array.isArray(menuItem.submenu)) {
				// console.log("menuItem.submenu>>>>>>>>>>>", menuItem.submenu);




				// if(0 < menuItem.submenu.length){
				// 	console.log("menuItem.submenu>>>>>>>>>>>", menuItem.submenu);
				// 	for (let menuItemSub of menuItem.submenu) {
				// 		console.log("menuItemSub.submenu>>>>>>>>>>>", menuItemSub.submenu.length);
						 
				// 		if(menuItemSub.submenu.length){
				// 			console.log("menuItemSub.submenu>>>>>>>>>>>", menuItemSub.submenu);
				// 		}else{
				// 			// menu.push(menuItemSub.submenu);		
				// 		}
								 
				// 	}	
				// }else{
				// 	menu.push(...menuItem.submenu);
				// }
					
					
			//	}
			}
			//console.log("menu>>>>>>", menu);
			this.linearMenu = menu;
			// return menu;
		},

		async fetchMenuList (query, code) {
			const payload = {
				EvolveApp_Code: code,
				EvolveMenu_Name: query
			};

			const response = await this
				.$axios
				.$post('/api/v1/evolve/evolveMenuList', payload)
				.catch((e) => {
					this.notification("danger", 3000, "Problem with connecting to server");
				});

			if (response.statusCode === 200) {
				this.menuitems = response.result;
				// console.log("MENU ITEMS >>>>>", response.result);
				this.createLinearArrayMenu();
			}
			else {
				this.notification("danger", 3000, "Error while getting menu list");
			}
		},

		async getMenuList () {
			const search = this.search, code = this.activeAppCode;

			await this.fetchMenuList(search, code);
		}
	},
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

#app-sidebar {
    display: grid;
    position: relative;
    grid-template-rows: 50px auto;
    width: 300px;
	height: calc(100vh - 30px);
    margin-top: 1.1rem;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    background-color: $bg;
    // border-width: 2px;
    // border-style: solid;
    // border-color: #000000; //$stroke;
    border-left-width: 0;
    transition: width 140ms ease, background-color 70ms linear;
	border-top-color: #FFFF;
    border-top-width: 0px;





	@media screen and (max-width: 767px) {
		position: fixed;
		top: 50px;
		bottom: 60px;
		height: auto;
		left: 1rem;
		width: 300px;
		z-index: 1000;
		border-bottom-left-radius: 12px;
      box-shadow: 4px 4px 18px $bg-4;
	}

    &[aria-collapsed] {
		 @media screen and (max-width: 767px) {
			 display: none;
		 }
        width: 65px;
        grid-template-rows: 10px auto;
    }

    &:hover {
        .toggler {
            display: initial;
        }
    }

    .fixed-sector {
       display: flex;
      flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}

@include use-dark {
    #app-sidebar {
        border-color: $stroke-dark-1;
        background-color: $bg-dark-1;
        color: $fr-dark-2;
    }
}
</style>