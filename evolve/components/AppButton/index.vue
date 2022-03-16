<template>
	<button 
		:class="buttonClasses"
		@click="handleClickAction"
	>
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'AppButton',

	props: {
		type: {
			type: String,
			default: 'flat'
		},
		color: {
			type: String,
			default: 'regular'
		},
		size: {
			type: String,
			default: 'medium'
		}
	},

	computed: {

		/**
         * Button classes
         * @returns {string[]}
         */
		buttonClasses () {
			const classes = ['app-button'];
			const type = this.type,
				color = this.color,
				size = this.size;

			classes.push(type, color, size);

			return classes;
		}
	},

	methods: {

		/**
         * Handle click event
         * @description Emit 'click' event
         * @param {MouseEvent} $event - Event
         */
		handleClickAction ($event) {
			this.$emit('click', $event);
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

.app-button {
    margin: 4px;
    min-width: 140px;
    height: 40px;
    font-family: $secondary-font-stack;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;

    &.small {
        min-width: 110px;
        height: 34px;
        font-size: 15px;
    }

    &.large {
        min-width: 165px;
        height: 48px;
        font-size: 19px;
    }

    // Flat style
    @include flat-style;

    // Outlined style
    @include outlined-style;

    // Text style
    @include text-style;
}
</style>