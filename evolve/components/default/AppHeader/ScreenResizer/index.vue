<template>
	<div class="nav-menu-item">
		<!-- Icon -->
		<app-icon-button
			id="app-screen-resizer-button"
			:icon="togglerIcon"
			:tooltip="togglerTooltip" 
			@click="toggleScreenMode"
		/>
	</div>
</template>

<script>
export default {
	name: 'AppHeaderScreenResizer',

	data () {
		return {
		
			/** @type {boolean} */
			enableFullscreen: false
		}
	},

	computed: {

		/**
         * Tooltip message
         * @returns {string}
         */
		togglerTooltip () {
			const state = this.enableFullscreen;
			let msg;

			if (state === true) {
				msg = 'Exit Fullscreen';
			}
			else {
				msg = 'Set Fullscreen';
			}

			return msg;
		},
	
		/**
		 * Provide toggler icon name
		 * @returns {string}
		 */
		togglerIcon () {
			const state = this.enableFullscreen;
			let icon;

			if (state === true) {
				icon = "fullscreen_exit";
			}
			else {
				icon = "fit_screen";
			}

			return icon;
		}
	},

	methods: {

		/** 
		 * Toggle screen mode
		 */
		toggleScreenMode () {
			const elem = document.documentElement;
			const enabledNativeFullscreen = document.fullscreenEnabled || document.webkitFullscreenEnabled ||
											document.mozFullScreenEnabled || document.msFullscreenEnabled;

			if (enabledNativeFullscreen) {
				if (!this.enableFullscreen) {
					if (elem.requestFullscreen) {
						elem.requestFullscreen();
						this.enableFullscreen = true;
					} else if (elem.webkitRequestFullscreen) {
						elem.webkitRequestFullscreen();
						this.enableFullscreen = true;
					} else if (elem.mozRequestFullScreen) {
						elem.mozRequestFullScreen();
						this.enableFullscreen = true;
					} else if (elem.msRequestFullscreen) {
						elem.msRequestFullscreen();
						this.enableFullscreen = true;
					}
				} else {
					if (document.exitFullscreen) {
						document.exitFullscreen();
						this.enableFullscreen = false;
					} else if (document.webkitExitFullscreen) {
						document.webkitExitFullscreen();
						this.enableFullscreen = false;
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
						this.enableFullscreen = false;
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen();
						this.enableFullscreen = false;
					}
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>