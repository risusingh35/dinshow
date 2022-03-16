<template>
	<div id="app" :aria-expanded="focusedMode" :style="(fullscreen != undefined && fullscreen != 0)?'padding: 0px;' : ''">
		<!-- App header -->
		<app-header
			v-show="!focusedMode"
			:logo="AppLogo"
			:style="(fullscreen != undefined && fullscreen != 0)?'display: none;' : ''"
			@triggersearch="openFinder"
		></app-header>

		<div class="container">
			<!-- App sidebar -->
			<!-- <Sidebar /> -->
			<app-sidebar v-show="!focusedMode" enable-menu-search :style="(fullscreen != undefined && fullscreen != 0)?'display: none;' : ''"></app-sidebar>

			<!-- App main section -->
			<app-main>
				<div id="evolve_tabs_root">
					<div class="evolve-tabs-container">
						<ul class="evolve-tabs">
							<li 
								v-for="(tabItem, tabItemIndex) in tabs" 
								:key="tabItemIndex" 
								:class="{'evolve-tab-item': true, 'active': tabItem.url === activeTab}"
								@click="handleTabSwitchAction(tabItem.url)"
							>
								<span class="evolve-tab-item-content">
									<span class="label">{{ tabItem.title }}</span>
									<span 
										class="close-icon close-icon-area" 
										title="Close this tab"
										:data-tab-name="tabItem.title" 
										:data-tab-index="tabItemIndex"
										@click.stop="handleCloseTabAction(tabItem.url)"
									>
										<i class="close-icon-area mdi mdi-close" style="color: #000 !important;"></i>
									</span>
								</span>
							</li>
						</ul>
					</div>
				</div>
				<div id="evolve_tabs_contecnt_root">
					<nuxt keep-alive />
				</div>
				<!-- </app-main> -->
			</app-main>
		</div>

		<!-- App Finder -->
		<template v-if="finderView">
			<app-finder :autofocus="finderView" @blur="closeFinder" @escape="closeFinder" />
		</template>

		<template v-if="focusedMode">
			<div class="focused-mode-exit-button">
				<app-icon-button
					icon="close"
					tooltip="Escape"
					size="small"
					@click="exitFocusedMode"
				/>
			</div>
		</template>
		<div id="user-name-label">
			<div class="notification_area">
				<span v-if="notificationDiv">{{ notificationMsgAction.msg }}</span>
			</div>
			<div class="server_datetime">
				{{ timer }}
			</div>
			<div class="user_name">
				{{ user.EvolveUser_Name }}
			</div>
		</div>
	</div>
</template>
<script>
import AppHeader from "~/components/default/AppHeader";
import AppSidebar from '~/components/default/AppSidebar'
import AppMain from "~/components/default/AppMain";
import AppLogo from "~/assets/logo/logo.png";
import AppFinder from "~/components/default/AppFinder";
// import Sidebar from "~/components/Sidebar.vue";
import { mapState, mapGetters } from "vuex";
import socket from "~/plugins/socket.io.js";
const keyStroke = new Set();
var captureSession = false;

// main styles
require("assets/scss/main.scss");
require("assets/scss/custom.scss");

export default {
	name: "Default",
	middleware: "checkLogin",
	components: {
		"app-header": AppHeader,
		"app-sidebar": AppSidebar,
		"app-main": AppMain,
		"app-finder": AppFinder,
		// Sidebar,
	},

	data () {
		return {
			timerInt : "",
			timer:"HH:MM:SS",
			appsList: [],
			appCode: this.$auth.$storage.getLocalStorage("EvolveAppCode"),
			AppLogo,
			notificationDiv : false
		};
	},
	computed: {
		user () {
			return this.$auth.$state.user;
		},
		...mapState(["appTheme", "cardFixed", "pageFixed", "headerExpanded", "activeTab"]), /**  Start : EvolveV3TA */
		...mapGetters(["focusedMode", "finderView", "notificationMsgAction", "tabs", "fullscreen"]), /**  Start : EvolveV3TA */
	},
	watch: {
		$route (newRoute) {
			this.updateCurrentApp();
		},
		appTheme (theme) {
			const $html = $("html");
			const themes =
        "sc-theme-a sc-theme-b sc-theme-c sc-theme-d sc-theme-e sc-theme-f sc-theme-g sc-theme-h";
			$html.removeClass(themes);
			if (theme !== "theme-default") {
				$html.addClass("sc-" + theme);
			}
		},
		pageFixed () {
			const $html = $("html");
			$html.toggleClass("sc-page-fixed");
		},
		cardFixed () {
			const $html = $("html");
			$html.toggleClass("sc-card-fixed");
		},
		headerExpanded () {
			const $html = $("html");
			$html.toggleClass("sc-header-expanded");
		},
		notificationMsgAction (data){
			this.notificationDiv = true;
			let thisObj = this;
			setTimeout(function (){ 
				thisObj.notificationDiv = false;
			 }, data.time);
		}
	},
	async created () {
 
		await this.updateCurrentApp();

		/**
		 * Get Default Units List
		 */
		// this.$store.dispatch('getuserCompanyList'); 
		this.$store.dispatch('userUnits'); 


	},
	mounted () {
		// Reserve key events
		this.reserveKeyEvents();
		// var _this = this; //Declare a variable pointing to the Vue instance this, guarantee the scope
		// this.timerInt = setInterval(function () {
		// 	_this.dateFormat();
		// }, 1000);
	},
	  beforeDestroy () {
		// if(this.timer) {
		// 	clearInterval(this.timer);//In the Vue instance destroyed money, clear our timer
		// }
	},
	beforeMount () {
 
		let thisObj = this;
		this.$socket.on("timeDates", (data) => {
	 		 thisObj.timer = data.dateTime;
		});
	},
	methods: {

		handleCloseTabAction (tabName) {
			this.$root.$emit("onCloseTabCalled", tabName);
			this.$store.dispatch('removeOneTab', tabName);
		},
		handleTabSwitchAction (tabName) {
			this.$store.dispatch('setActiveTab', tabName);
		},


   		// 	dateFormat () {
		// 	let date=new Date();
                
		// 	let hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
		// 	let minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
		// 	let seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
		// 	//  Splicing
		// 	this.timer = hours+":"+minutes+":"+seconds;
		// },

		async updateCurrentApp () {
			const path = this.$route.path;
			let urlPrefix, appCode, activeApp;

			urlPrefix = path
				.split("/")
				.filter((item) => typeof item === "string" && item.length > 0)[0];

			if (
				typeof urlPrefix === "string" &&
        urlPrefix.length > 0 &&
        urlPrefix.indexOf("/") === -1
			) {
				urlPrefix = "/" + urlPrefix + "/";
			}

			if (this.$store.state.appUrlPrefix === urlPrefix) {
				return;
			}

			activeApp = await this.getAppDetail(urlPrefix);

			if (typeof activeApp === "object") {
				appCode = activeApp.EvolveApp_Code || "EAC";

				this.$store.commit("changeActiveAppCode", appCode);
				this.$store.commit("changeActiveApp", activeApp);
			}
		},

		/**
     * Fetch detail about specific Evolve app
     * @async
     * @param {object} axios - Axios instance
     * @param {string} url - App code
     * @returns {Promise<object>}
     */
		async getAppDetail (url) {
			const payload = {
				EvolveApp_Url: url,
			};

			const response = await this.$axios.$post(
				"/api/v1/evolve/getDetailByCode",
				payload
			);

			if (response.statusCode === 200) {
				const result = response.result;

				if (Array.isArray(result)) {
					return result[0];
				}

				return null;
			} else {
				this.notification("success", 3000, "Error while getting app detail");
			}
		},

		/** Reserve regular key events */
		reserveKeyEvents () {
			// Toggle finder with key events
			window.addEventListener("keydown", (event) => {
				const key = event.key;

				captureSession = true;

				if (event.target === document.body) {
					// Ignore escape key event
					if (key !== "Escape") {
						keyStroke.add(key);
					} else {
						// exit focused mode
						if (this.focusedMode) {
							this.exitFocusedMode();
						}
					}

					if (captureSession === false) {
						return;
					}

					// handle Ctrl + b
					if (
						keyStroke.has("Control") &&
            (keyStroke.has("B") || keyStroke.has("b"))
					) {
						keyStroke.clear();

						this.$store.dispatch("toggleSidebar");
						return;
					}

					// handle Ctrl + Shift + f key
					else if (
						keyStroke.has("Control") &&
            keyStroke.has("Shift") &&
            (keyStroke.has("F") || keyStroke.has("f"))
					) {
						keyStroke.clear();

						if (this.finderView === false) {
							this.openFinder();
						}

						return;
					}

					// handle Ctrl + Shift + 1
					else if (event.altKey && (keyStroke.has("1") || keyStroke.has("!"))) {
						keyStroke.clear();

						return this.$tapOnElement("#app-theme-toggle-button");
					}

					// handle Ctrl + Shift + 2
					else if (event.altKey && (keyStroke.has("2") || keyStroke.has("@"))) {
						keyStroke.clear();

						return this.$tapOnElement("#app-screen-resizer-button");
					}

					// handle Ctrl + Shift + 3
					else if (event.altKey && (keyStroke.has("3") || keyStroke.has("#"))) {
						keyStroke.clear();

						this.$store.dispatch("toggleFocusedMode");
						return;
					}

					// handle Ctrl + Shift + 4
					else if (event.altKey && (keyStroke.has("4") || keyStroke.has("$"))) {
						keyStroke.clear();

						return this.$tapOnElement("#app-language-select-button");
					}

					// handle Ctrl + Shift + 5
					else if (event.altKey && (keyStroke.has("5") || keyStroke.has("%"))) {
						keyStroke.clear();

						return this.$tapOnElement("#app-view-notification-button");
					}

					// handle Ctrl + Shift + 6
					else if (event.altKey && (keyStroke.has("6") || keyStroke.has("^"))) {
						keyStroke.clear();

						return this.$tapOnElement("#app-active-app-selector-button");
					}

					// handle Ctrl + Shift + 7
					else if (event.altKey && (keyStroke.has("7") || keyStroke.has("&"))) {
						keyStroke.clear();

						return this.$tapOnElement("#app-app-selector-button");
					}

					// handle Ctrl + Shift + 8
					else if (event.altKey && (keyStroke.has("8") || keyStroke.has("*"))) {
						keyStroke.clear();

						return this.$tapOnElement("#app-view-active-user-profile-button");
					}
				}
			});

			window.addEventListener("keyup", (event) => {
				const key = event.key;
				captureSession = false;
				keyStroke.clear();

				// handle single key events
				if (event.target === document.body) {
					switch (key) {
					// handle '/' key for finder
					case "/": {
						if (this.finderView === false) {
							this.openFinder();
						}

						break;
					}
					}
				}
			});
		},

		openFinder () {
			this.$store.commit("CHANGE_FINDER_VIEW", true);
		},
		closeFinder () {
			this.$store.commit("CHANGE_FINDER_VIEW", false);
		},
		exitFocusedMode () {
			this.$store.commit("changeFocusedMode", false);
		},

		async notification (type = "danger", timeout = 3000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},
	},
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/v2/vars";
@import "../assets/scss/v2/mixins";
@import "../assets/scss/v2/utils/scroll";

#app {
 padding-top: 6vh;
  width: inherit;
  height: 94vh;
  background-color: #d7dde2; //$bg-1;
 // background-image: linear-gradient(to bottom, #dfe9f3 0%, white 100%);
  background-size: 100%;
  transition: background-color 120ms linear;
  color: $fr;
  height: 100% !important;

  &[aria-expanded] {
    padding-top: 0;
 //   height: 100vh;
  }

  .container {
  	display: flex;
    flex-direction: row;
    height: inherit;
    overflow: hidden;
	height: 100%;
  }

  .focused-mode-exit-button {
    position: fixed;
    top: 2px;
    right: 6px;
    z-index: 1000;
  }
  #user-name-label {
    position: fixed;
    bottom: 0px;
    font-size: 14px;
    width: 100% !important;
    text-align: right;
    font-family: sans-serif;
    // border: 2px solid;
    background-color: white;
    border-color: #051717;
	border-radius: 15px 15px 0px 0px;
    height: 30px;
	box-shadow: 0 2px 12px #ddd;
    transition: background-color .12s linear,box-shadow 80ms ease;
    padding: 8px 0px 0px 5px;


		.server_datetime {
			float: right;
			margin-left: 14px;
			margin-right: 12px;
		}
		.user_name {
			float: right;	
		}
		.notification_area {
			float: left;
			font-size: 12px;
		}
	}
}

#sc-page-wrapper {
  padding-left: 0;
}

.evolve-tabs {
	display: flex;
	list-style-type: none;
	margin: 0;
	padding: 0;
	overflow: auto;
}

.evolve-tab-item {
   min-width: 150px;
	padding: 6px 10px;
   text-align: left;
   text-transform: capitalize;
	border-width: 1px;
	border-style: solid;
	border-color: $stroke-1;
   font-size: 13px;
	background-color: $bg;
	font-family: sans-serif;
	cursor: pointer;
	transition: background-color 90ms linear;
	border-radius: 11px 11px 0px 0px !important;

	&:first-child {
		// border-top-left-radius: 6px;
		// border-bottom-left-radius: 6px;
		border-radius: 0px;
	}

	&:last-child {
		// border-top-right-radius: 6px;
		// border-bottom-right-radius: 6px;
		border-radius: 0px;
	}

	&.active {
		background-color: $primary;
		border-color: $primary;
		color: $primary-fr;
		border-radius: 0px;
	}

   &:hover .close-icon {
      opacity: 1;
   }
}
.evolve-tab-item-content {
   display: flex;
   width: inherit;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   text-align: inherit;
   text-transform: inherit;
   font-size: inherit;
	background-color: inherit;
	color: inherit;

   .close-icon {
      opacity: 0.3;
		color: #000 !important;
		.mdi::before {
			font-size: 14px;
		}

      &:hover {
         transform: scale(1.15);
      }
   }
}

@include use-dark {
  #app {
    background-image: none;
    background-color: $bg-dark;
    color: $fr-dark;
  }
}

</style>