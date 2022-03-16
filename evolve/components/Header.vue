<template>
	<header id="sc-header" ref="header">
		<nav class="uk-navbar uk-navbar-container" data-uk-navbar="mode: click; duration: 360">
			<div class="uk-navbar-left nav-overlay-small uk-margin-right">
				<a id="sc-sidebar-main-toggle" href="javascript:void(0)" @click="toggleMainMenu">
					<i v-if="sidebarExpanded" class="mdi mdi-backburger"></i>
					<i v-if="!sidebarExpanded" class="mdi mdi-menu"></i>
				</a>
				<div class="sc-brand uk-visible@m">
					<nuxt-link to="/">
						<img v-rjs="require('~/assets/img/logo@2x.png')" :src="logo" alt="">
					</nuxt-link>
				</div>
			</div>
			<div class="nav-overlay nav-overlay-small uk-navbar-right uk-flex-1" hidden>
				<a class="uk-navbar-toggle uk-visible@l" data-uk-toggle="target: .nav-overlay; animation: uk-animation-slide-top" href="javascript:void(0)">
					<i class="mdi mdi-close sc-icon-24"></i>
				</a>
				<a class="uk-navbar-toggle uk-hidden@l uk-padding-remove-left" data-uk-toggle="target: .nav-overlay-small; animation: uk-animation-slide-top" href="javascript:void(0)">
					<i class="mdi mdi-close sc-icon-24"></i>
				</a>
				<div class="uk-navbar-item uk-width-expand uk-padding-remove-right">
					<form class="uk-search uk-search-navbar uk-width-1-1 uk-flex">
						<input class="uk-search-input" type="search" placeholder="Search..." autofocus>
						<button class="sc-button sc-button-small sc-button-icon sc-button-flat uk-margin-small-left" type="button">
							<i class="mdi mdi-magnify sc-icon-24 md-color-white"></i>
						</button>
					</form>
				</div>
			</div>
			<div class="nav-overlay nav-overlay-small uk-navbar-right">
				<ul class="uk-navbar-nav">
					<li>
						<a class="uk-navbar-toggle uk-visible@l" href="javascript:void(0)" data-uk-toggle="target: .nav-overlay; animation: uk-animation-slide-top">
							<i class="mdi mdi-magnify"></i>
						</a>
						<a id="sc-search-main-toggle-mobile" class="uk-navbar-toggle uk-hidden@l" href="javascript:void(0)" data-uk-toggle="target: .nav-overlay-small; animation: uk-animation-slide-top">
							<i class="mdi mdi-magnify"></i>
						</a>
					</li>
					<li class="uk-visible@l">
						<a id="sc-js-fullscreen-toggle" href="javascript:void(0)" @click="toggleFullscreen">
							<i v-if="!isFullscreen" class="mdi mdi-fullscreen"></i><i v-if="isFullscreen" class="mdi mdi-fullscreen-exit"></i>
						</a>
					</li>
					<!-- <li class="uk-visible@l">
						<a href="javascript:void(0)" class="sc-text-semibold ">
							EN
						</a>
						<div class="uk-navbar-dropdown uk-dropdown-small">
							<ul class="uk-nav uk-navbar-dropdown-nav">
								<li>
									<a href="javascript:void(0)">
										Deutsch
									</a>
								</li>
								<li>
									<a href="javascript:void(0)">
										Español
									</a>
								</li>
								<li>
									<a href="javascript:void(0)">
										Français
									</a>
								</li>
							</ul>
						</div>
					</li> -->
					<!-- <li>
						<a href="javascript:void(0)">
							<span class="mdi mdi-email"></span>
						</a>
						<div class="uk-navbar-dropdown sc-padding-remove">
							<div class="uk-panel uk-panel-scrollable uk-height-medium">
								<ul class="uk-list uk-list-divider">
									<li v-for="message in user.messages" :key="message.id" class="sc-list-group">
										<div class="sc-list-addon">
											<img v-if="message.avatar.image" :src="message.avatar.image" class="sc-avatar" alt="">
											<span v-if="!message.avatar.image" :title="message.from" :class="message.avatar.color" class="sc-avatar-initials">
												{{ message.from | initials }}
											</span>
										</div>
										<a href="javascript:void(0)" class="sc-list-body">
											<span class="uk-text-small uk-text-muted uk-width-expand">
												{{ message.date }}
											</span>
											<span class="uk-display-block uk-text-truncate">
												{{ message.content }}
											</span>
										</a>
									</li>
								</ul>
							</div>
							<nuxt-link to="/pages/mailbox" class="uk-flex uk-text-small sc-padding-small-ends sc-padding">
								Show all in mailbox
							</nuxt-link>
						</div>
					</li> -->
					<!-- <li class="uk-visible@l">
						<a href="javascript:void(0)">
							<span class="mdi mdi-bell uk-display-inline-block">
								<span v-show="!alertsEmpty" class="sc-indicator md-bg-color-red-600"></span>
							</span>
						</a>
						<div class="uk-navbar-dropdown md-bg-grey-100">
							<div class="sc-padding sc-padding-small-ends">
								<ul id="sc-header-alerts" class="uk-list uk-margin-remove">
									<li v-for="(alert, index) in user.alerts" :key="alert.id" :style="{'--index': index}" class="uk-margin-small-top sc-border sc-round md-bg-white">
										<div class="uk-flex uk-flex-middle">
											<div class="uk-margin-right uk-margin-small-left">
												<i class="mdi" :class="[alert.icon, alert.color]"></i>
											</div>
											<div class="uk-flex-1 uk-text-small">
												{{ alert.text }}
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</li> -->
					<li>
						<a href="javascript:void(0)">
							<img v-rjs="require('~/assets/img/profile.png')" :src="user.avatar" alt="">
						</a>
						<div class="uk-navbar-dropdown uk-dropdown-small">
							<ul class="uk-nav uk-nav-navbar">
								<!-- <li>
									<nuxt-link to="/pages/user_profile">
										Profile
									</nuxt-link>
								</li>
								<li>
									<nuxt-link to="/pages/settings">
										Settings
									</nuxt-link>
								</li> -->
								<li>
									<nuxt-link to="/logout">
										Log Out
									</nuxt-link>
								</li>
							</ul>
						</div>
					</li>
				</ul>
				<a v-if="offcanvasPresent" href="javascript:void(0)" class="md-color-white uk-margin-left uk-hidden@l" @click="toggleOffcanvas">
					<i v-if="!offcanvasActive" class="mdi mdi-menu"></i><i v-if="offcanvasActive" class="mdi mdi-arrow-right"></i>
				</a>
			</div>
		</nav>
	</header>
</template>

<script>
import { mapState } from 'vuex'
import { scVars, scMq } from '~/assets/js/scutum_common'
console.log("Default Header is Called....")
export default {
	data () {
		return {
			user: {
				avatar: require('~/assets/img/profile.png'),
				messages: [
					{
						"id": 1,
						"from": "Aaron Jensen",
						"avatar": {
							"image": require("~/assets/img/profile.png")
						},
						"date": "24-10-2019",
						"content": "Zelnavo dej foten tu bivgal wi lonuh cow wuvelo atilid taza wucacto uwa."
					}, {
						"id": 2,
						"from": "Eugenia Thompson",
						"avatar": {
							"image": require("~/assets/img/profile.png")
						},
						"date": "23-10-2019",
						"content": "Zopessud rodga here okuofe atvof el belildo bakah deud upanuuf usu ufava."
					}, {
						"id": 3,
						"from": "Roxie Ortega",
						"avatar": {
							"color": "md-bg-red-500 md-color-white"
						},
						"date": "24-10-2019",
						"content": "Hub bo zejwawad pocmep li lubov vofnomzug ali akohe hoarla orhak ludafu bic zarajik ufpoeha."
					}, {
						"id": 4,
						"from": "Ethan Perry",
						"avatar": {
							"image": require("~/assets/img/aprofile.png")
						},
						"date": "22-10-2019",
						"content": "Rucakes na vutnis jos lukse nis figulu zuw tisbu poh ufucas acoaz rubetlih miraetu atoolule sov rives."
					}, {
						"id": 5,
						"from": "Daisy Hopkins",
						"avatar": {
							"color": "md-bg-purple-500 md-color-white"
						},
						"date": "21-10-2019",
						"content": "Cabhilzi seajofi he bami joglaceg manob cune zilpu jore melmoffuj kilahwog mehsilmuc vorlislu."
					}, {
						"id": 6,
						"from": "Leo Singleton",
						"avatar": {
							"image": require("~/assets/img/profile.png")
						},
						"date": "21-10-2019",
						"content": "Uh esegivad umu gegmused vejgafpe nurlo luzreh zedleg he wisus buvnukik ga heeh gudafki ta za."
					}
				],
				alerts: [
					{
						id: 1,
						text: 'Information Page Not Found!',
						icon: 'mdi-alert-outline',
						color: 'md-color-red-600'
					},
					{
						id: 2,
						text: 'A new password has been sent to your e-mail address.',
						icon: 'mdi-email-check-outline',
						color: 'md-color-blue-600'
					},
					{
						id: 3,
						text: 'You do not have permission to access the API!',
						icon: 'mdi-alert-outline',
						color: 'md-color-red-600'
					},
					{
						id: 4,
						text: 'Your enquiry has been successfully sent.',
						icon: 'mdi-check-all',
						color: 'md-color-light-green-600'
					}
				]
			},
			sidebarExpanded: true,
			isFullscreen: false,
			logo: require('~/assets/img/logo.png'),
			alertsEmpty: null
		}
	},
	computed: mapState([
		'sidebarMainExpanded',
		'offcanvasPresent',
		'offcanvasActive'
	]),
	watch: {
		'sidebarMainExpanded' (state) {
			this.sidebarExpanded = state
		}
	},
	mounted () {
		this.$nextTick(() => {
			this.sidebarExpanded = this.sidebarMainExpanded;
		});
		if(scMq.smallMax()) {
			this.$store.commit('sidebarMainToggle', false);
		}
		// sticky header
		var options = scMq.mediumMax() ? { showOnUp: true, animation: "uk-animation-slide-top" } : {};
		UIkit.sticky(this.$refs.header, options);
	},
	methods: {
		toggleMainMenu: function (e) {
			e.preventDefault();
			if(scMq.mediumMin()) {
				this.$store.commit('sidebarMainToggle')
			} else {
				if (document.getElementsByTagName("html")[0].classList.contains('sc-sidebar-main-visible')) {
					UIkit.offcanvas(document.getElementById('sc-sidebar-main')).hide();
					this.$store.commit('sidebarMainToggle', false);
				} else {
					UIkit.offcanvas(document.getElementById('sc-sidebar-main')).show();
					this.$store.commit('sidebarMainToggle', true);
				}
			}
		},
		toggleOffcanvas: function () {
			if(scMq.mediumMax()) {
				if (this.offcanvasActive) {
					UIkit.offcanvas(document.getElementById('sc-offcanvas')).hide();
				} else {
					UIkit.offcanvas(document.getElementById('sc-offcanvas')).show();
				}
			}
		},
		toggleFullscreen: function (event) {
			var elem = document.documentElement;
			if (
				document.fullscreenEnabled ||
				document.webkitFullscreenEnabled ||
				document.mozFullScreenEnabled ||
				document.msFullscreenEnabled
			) {
				if(!this.isFullscreen){
					if (elem.requestFullscreen) {
						elem.requestFullscreen();
						this.isFullscreen = true;
					} else if (elem.webkitRequestFullscreen) {
						elem.webkitRequestFullscreen();
						this.isFullscreen = true;
					} else if (elem.mozRequestFullScreen) {
						elem.mozRequestFullScreen();
						this.isFullscreen = true;
					} else if (elem.msRequestFullscreen) {
						elem.msRequestFullscreen();
						this.isFullscreen = true;
					}
				} else {
					if (document.exitFullscreen) {
						document.exitFullscreen();
						this.isFullscreen = false;
					} else if (document.webkitExitFullscreen) {
						document.webkitExitFullscreen();
						this.isFullscreen = false;
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
						this.isFullscreen = false;
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen();
						this.isFullscreen = false;
					}
				}
			}
		}
	}
}
</script>
