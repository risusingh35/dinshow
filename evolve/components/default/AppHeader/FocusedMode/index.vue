<template>
	<div class="nav-menu-item">
		<!-- Icon -->
		<app-icon-button
			id="app-focused-mode-toggle-button"
			icon="center_focus_strong"
			tooltip="Focused Mode" 
			@click="enableFocusedMode"
		/>
	</div>
</template>

<script>
export default {
	name: "AppHeaderFocusedMode",

	methods: {
		enableFocusedMode () {
			this.$store.commit("changeFocusedMode", true);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>