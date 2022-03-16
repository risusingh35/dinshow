<template>
	<svg 
		class="app-secondary-loader" 
		height="50" 
		width="50"
	>
        
		<circle 
			:class="circleClasses" 
			cx="25" 
			cy="25" 
			r="20" 
			fill="none" 
			stroke-width="6" 
			stroke-miterlimit="10"
		/>
	</svg>
</template>

<script>
export default {
	name: 'AppSecondaryLoader',

	props: {
		color: {
			type: String,
			default: 'primary'
		}
	},

	computed: {
		circleClasses () {
			const color = this.color;

			return ['path', color];
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

.app-secondary-loader {
    position: relative;
    width: 50px; 
    height: 50px;
    animation: rotate 2s linear infinite;
    
    .path {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0;
        animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
        stroke-linecap: round;

        @include use-filled-style();
    }
}
</style>