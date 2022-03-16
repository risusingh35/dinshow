import { version } from '~/package.json'; // Get Single version Value form JSON
import config from '~/evolve.config.json'; // Load Full Evolve Config JSON

export const state = () => ({
	appVersion: version,
	sidebarMainExpanded: true,
	sidebarMainAccordionMode: false,
	sidebarMainScrollToActive: false,
	cardFixed: false,
	headerExpanded: false,
	pageFixed: false,
	appTheme: 'theme-default',
	offcanvasPresent: false,
	offcanvasActive: false,
	evolveConfig: config, // Evolve Config Variable 
	//authUser: null
	loggedIn: false,
	strategy: "local",
	user: false,
	evolveUser: false,
	evolveHeaderData: [],

	collapsedSidebar: true,
	activeAppCode: null,
	activeApp: {
		NAME : "Evolve Apps",
		ICON : "mdi mdi-format-list-bulleted",
		CODE : "NOCODE",
		URL : "#"
	},
	activeFocusedMode: false,
	activeFinder: false,
	activeTheme: 'light',
	tabStack: [],
	tabStackParams: {},
	activeTab: null,
	favouriteChange : false,
	userUnit:[],
	notificationMsg :"this is test",
	enableFullscreen : 0
});

export const mutations = {
	sidebarMainToggle (state, expanded) {
		if (typeof expanded !== 'undefined') {
			state.sidebarMainExpanded = expanded
		} else {
			state.sidebarMainExpanded = !state.sidebarMainExpanded
		}
	},
	sidebarMainAccordionModeToggle (state) {
		state.sidebarMainAccordionMode = !state.sidebarMainAccordionMode
	},
	sidebarMainScrollToActiveToggle (state) {
		state.sidebarMainScrollToActive = !state.sidebarMainScrollToActive
	},
	setCardFixed (state, fixed) {
		state.cardFixed = fixed
	},
	setHeaderExpanded (state, expanded) {
		state.headerExpanded = expanded
	},
	setPageFixed (state, fixed) {
		state.pageFixed = fixed
	},
	setAppTheme (state, theme) {
		state.appTheme = theme
	},
	setOffcanvasPresent (state, present) {
		state.offcanvasPresent = present
	},
	offcanvasToggle (state, present) {
		state.offcanvasActive = present
	},
	evolveHeaderVariable (state, data) {
		console.log("evolveHeaderVariable:::", data)
		state.evolveHeaderData = data;
	},

	/**
	 * Change sidebar mode
	 * @param {object} state 
	 * @param {boolean} mode 
	 */
	collapseSidebar (state, collapsed) {
		state.collapsedSidebar = collapsed;
	},

	/**
	 * Change active app code
	 * @param {object} state 
	 * @param {string} code 
	 */
	changeActiveAppCode (state, code) {
		state.activeAppCode = code;
	},

	/**
	 * Change active app 
	 * @param {object} state 
	 * @param {object} data 
	 */
	changeActiveApp (state, data) {
		state.activeApp = data;
	},

	/**
	 * Change focused mode
	 * @param {object} state 
	 * @param {boolean} active 
	 */
	changeFocusedMode (state, active) {
		state.activeFocusedMode = active;
	},

	/**
	 * Change finder view
	 * @param {object} state 
	 * @param {boolean} active 
	 */
	CHANGE_FINDER_VIEW (state, active) {
		state.activeFinder = active;
	},

	/**
	 * Set active theme
	 * @param {object} state 
	 * @param {string} value 
	 */
	SET_THEME (state, value) {
		state.activeTheme = value;
	},

	/**
	 * Update tab stack
	 * @param {object} state 
	 * @param {any[]} value 
	 */
	UPDATE_TAB_STACK (state, value) {
		state.tabStack = value || [];
	},

	REMOVE_FIRST_TAB (state) {
		state.tabStack.shift();
	},

	ADD_TAB_STACK (state, val) {
		state.tabStack.push(val);
	},

	SET_TAB_PARAM (state, val) {
		state.tabStackParams[val.url] = val.params;
	},
	REMOVE_TAB_PARAM (state, url) {
		
		delete state.tabStackParams[url];
	},

	/**
	 * Change active tab
	 * @param {object} state 
	 * @param {string} value 
	 */
	CHANGE_ACTIVE_TAB (state, tab) {
		if (!tab) {
			state.activeTab = null;
			return;
		}
		let url = (typeof tab === 'object')? tab.url: tab;
		
		state.activeTab = url;

		/**  Start : EvolveV3TA Code */	
		this.$router.push({
			path: url,  
			query: state.tabStackParams[url]
		});
		/**  End : EvolveV3TA Code */	

	},

	CHANGE_FAV (state, status) {
		state.favouriteChange = (state.favouriteChange == true) ? false : true;
	},

	CLEAR_ALL_TAB (state) { // Remove All tab from 
		state.tabStack = [];
		state.tabStackParams=[];
		state.activeTab = null;
		//state.userUnit = [];
	},
	CLEAR_USER_UNIT (state, unitDetails) {
		state.userUnit = [];
	},


	ADD_USER_UNIT (state, unitDetails) {
		state.userUnit.push(unitDetails);

	//	console.log("state.userUnit>>>", state.userUnit);
	},
	NOTIFICAION_MSG (state, data) {
 
		state.notificationMsg = {
			msg:data.msg,
			time:data.time
		};
	 
	},


	
	/** full Screen  */
	FULL_SCREEN_MODE (state, data) {
		state.enableFullscreen = data;
	},


};

export const actions = {

	toggleSidebar ({ state, commit }) {
		commit('collapseSidebar', !state.collapsedSidebar);
	},

	toggleFocusedMode ({ state, commit }) {
		commit('changeFocusedMode', !state.activeFocusedMode);
	},

	async addNewTab ({ state, commit }, newTab) {
		console.log("newTab>>>>>", newTab);

		const checkLink = this.$router.resolve({
			path: newTab.url
		});
		console.log("checkLink >>>>", checkLink.route.name);
		if(checkLink.route.name != '404' && checkLink.route.name != null){

			const tab = state.tabStack.find(item => item.url === newTab.url);
			//console.log("tab>>>>>>>>", tab);
					
			// switch to specified tab if it already been exists in tabStack
			if (tab) {

				// console.log("tab.url>>>>>", tab.url);
				// commit('REMOVE_TAB_PARAM', tab.url);
				// commit('CHANGE_ACTIVE_TAB', tab.url);
				/**
				 * Remove One Tab if already exist.
				 */

				commit('REMOVE_TAB_PARAM', newTab.url);

				/** end */

				// return;
			}else{
				commit('ADD_TAB_STACK', newTab);

				/**
				 * Add New Menu 
				 */
				if(newTab.EvolveMenu_Id != undefined){
					await this.$axios.$post('/api/v1/evolve/addAction', { menuUrl: newTab.url, EvolveMenu_Id : newTab.EvolveMenu_Id, actionType : 'ADD'}).catch(e => {});
				}
				
			}

			if ('params' in newTab ) { //&& !(newTab.url in state.tabStackParams) // Set Params in Menu
				//console.log("Send Params......");
				commit('SET_TAB_PARAM', newTab);
			}

			// remove first tab to prevent tab stack overflow.
			if (state.tabStack.length > 5) { 
				commit('REMOVE_FIRST_TAB');
				return;
			}

			// if ('params' in newTab && !(newTab.url in state.tabStackParams)) {
			// 	commit('SET_TAB_PARAM', newTab);
			// }

			commit('CHANGE_ACTIVE_TAB', newTab.url);
		}else{
			state.notificationMsg = {
				msg:'Page Not available',
				time:3000
			};
		}
	},

	async removeOneTab ({ state, commit }, tabUrl) {
		let EvolveMenu_Id = "";
		if (tabUrl in state.tabStackParams) {
			EvolveMenu_Id = state.tabStackParams[tabUrl].EvolveMenu_Id;
			commit('REMOVE_TAB_PARAM', tabUrl);
		}

	 
		console.log("EvolveMenu_Id>>>>>", EvolveMenu_Id);

		/**
		* Remove Menu 
		*/
		if(EvolveMenu_Id != "" && EvolveMenu_Id != undefined){
			await this.$axios.$post('/api/v1/evolve/addAction', { menuUrl: tabUrl, EvolveMenu_Id : EvolveMenu_Id, actionType : 'REMOVE'}).catch(e => {});
		}

		const stack = state.tabStack.filter(tab => tab.url !== tabUrl);
		commit('UPDATE_TAB_STACK', stack);

		if (state.tabStack.length > 0 && state.activeTab === tabUrl){
			const firstTab = state.tabStack[state.tabStack.length-1];
			commit('CHANGE_ACTIVE_TAB', firstTab.url);
		}

		if (state.tabStack.length === 0) {
			commit('CHANGE_ACTIVE_TAB', null);

			/**  Start : EvolveV3TA Code */	
			/** if All tab close then open root page */
			this.$router.push({
				path: '/root',  
				query: {}
			});
			/**  End : EvolveV3TA Code */

		}

 

	},

	setActiveTab ({ state, commit }, tabUrl) {
		const exists = state.tabStack.findIndex(item => item.url === tabUrl);

		if (exists !== -1) {
			commit('CHANGE_ACTIVE_TAB', tabUrl);
		}
		// if (state.tabStack.includes(tabName)) {
		// }
	},

	async addToFavouriteClick ({ state, commit }, id) {
		try {
			 
			let FavouriteObj = await this.$axios.$post('/api/v1/evolve/setFavourite', { EvolveMenu_Id: id, EvolveUser_ID : this.$auth.$state.user.EvolveUser_ID}).catch(e => { 
			});
		 
			if(FavouriteObj){
				commit('CHANGE_FAV', true);
				// this.$root.$emit("onChangeFavourite");
			}

		} catch (error) {
			console.log(error);
		}
	},

	clearAllTab ({ state, commit }) {
		commit('CLEAR_ALL_TAB');
	},

	async userUnits ({ state, commit }, id) {
		try {
			commit('CLEAR_ALL_TAB');
			commit('CLEAR_USER_UNIT');
			let userUnitsObj = await this.$axios.$get('/api/v1/evolve/getUserUnits').catch(e => { 
			});	
			if(userUnitsObj.result != null){
				for (let i=0; i < userUnitsObj.result.length; i++) {
					commit('ADD_USER_UNIT', userUnitsObj.result[i]);
				}
			}
		} catch (error) {
			console.log(error);
		}
	},
	async handleUnitSwitchAction ({ state, commit }, id) {
		try {
			console.log("User Unit >>>>>>>", id);
			// commit('CLEAR_ALL_TAB');
			// let userUnitsObj = await this.$axios.$get('/api/v1/evolve/getUserUnits').catch(e => { 
			// });	
			// if(userUnitsObj.result != null){
			// 	for (let i=0; i < userUnitsObj.result.length; i++) {
			// 		commit('ADD_USER_UNIT', userUnitsObj.result[i]);
			// 	}
			// }
		} catch (error) {
			console.log(error);
		}
	},
	evolveNotification ({ state, commit }, data) {
		//console.log("Msg>>>>>>>>>>>", data);
		commit('NOTIFICAION_MSG', data);
	},

	
	async fullscreen ({ state, commit }, fullscreen) {
		console.log("fullscreen >>>>>", fullscreen);
 		commit('FULL_SCREEN_MODE', fullscreen);
		 
	},

};

export const getters = {
	getSidebarState: state => state.sidebarMainExpanded,
	authenticated (state) { return state.auth.loggedIn },
	evolveUser (state) { return state.auth.user },

	appCode (state) {
		return state.activeAppCode;
	},

	activeApp (state) {
		return state.activeApp;
	},

	focusedMode (state) {
		return state.activeFocusedMode;
	},

	finderView (state) {
		return state.activeFinder;
	},

	tabs (state) {
		return state.tabStack;
	},

	tabParams (state) {
		return state.tabStackParams;
	},

	userUnitList (state) {
		return state.userUnit;
	},

	notificationMsgAction (state) {
		return state.notificationMsg;
	},

	
	fullscreen (state) {
		return state.enableFullscreen;
	},



};
