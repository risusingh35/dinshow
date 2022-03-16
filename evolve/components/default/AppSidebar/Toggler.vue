<template>
	<div :class="{ 'toggler': true, 'rotate': !collapsed }">
		<app-icon-button 
			icon="keyboard_arrow_left"
			fill="primary"
			size="small"
			@click="updateTogglerState"
		/>
	</div>
</template>

<script>
export default {
	name: 'AppSidebarToggler',
	props: {
		collapsed: {
			type: Boolean,
			default: false
		}
	},

	methods: {
		updateTogglerState (event) {
			this.$emit('toggle', !this.collapsed, event);
		}
	}
}
</script>

<style lang="scss" scoped>
.toggler {
    display: none;
    position: absolute;
    right: -28px;
    top: 50%;
	z-index: 120;
	opacity: 0.7;
    transform: translateY(-50%);
	transition: opacity 120ms linear;

    @media screen and (max-width: 767px) {
		 opacity: 0;
	 }

	&:hover {
		opacity: 1;
	}

    .app-icon-button {
        transition: transform 120ms ease;
    }

    &.rotate .app-icon-button {
        transform: rotate(180deg);
    }
}
</style>