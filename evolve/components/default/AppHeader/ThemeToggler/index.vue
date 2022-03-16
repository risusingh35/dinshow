<template>
	<div class="nav-menu-item">
		<!-- Icon -->
		<app-icon-button
			id="app-theme-toggle-button"
			:icon="togglerIcon"
			:tooltip="toggleTooltip" 
			@click="toggleTheme"
		/>
	</div>
</template>

<script>
export default {
	name: 'AppHeaderThemeToggler',

	data () {
		return {

			/** @type {string} */
			mode: 'light'
		}
	},

	computed: {

		/**
         * Provide toggler icon name
         * @returns {string}
         */
		togglerIcon () {
			const mode = this.mode;
			let icon;

			if (mode === 'light') {
				icon = 'dark_mode';
			}
			else if (mode === 'dark') {
				icon = 'light_mode';
			}

			return icon;
		},

		/**
         * Tooltip message
         * @returns {string}
         */
		toggleTooltip () {
			const mode = this.mode;
			let msg;

			if (mode === 'light') {
				msg = 'Set dark theme';
			}
			else if (mode === 'dark') {
				msg = 'Set light theme';
			}
			else {
				msg = 'Toggle theme';
			}

			return msg;
		}
	},

	watch: {

		/**
         * Watch theme changes
         * @param {string} newTheme - New theme
         * @param {string} oldTheme - Old theme
         */
		mode (newTheme, oldTheme) {
			const body = document.body;

			// remove existing theme
			if (body.classList.contains(oldTheme)) {
				body.classList.remove(oldTheme);
			}

			// set new theme
			if (body.classList.contains(newTheme) !== true) {
				body.classList.add(newTheme);
			}
		}
	},

	created () {
		const savedMode = this.$auth.$storage.getLocalStorage("EvolveAppThemeMode") || 'light';
		this.mode = savedMode;
	},

	methods: {

		/**
         * Toogle theme mode
         */
		toggleTheme () {
			const current = this.mode; 
			let mode;

			if (current === 'light') {
				mode = 'dark';
			}
			else if (current === 'dark') {
				mode = 'light';
			}
			this.$auth.$storage.setLocalStorage("EvolveAppThemeMode", mode, true);

			this.mode = mode;
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>