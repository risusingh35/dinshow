<template>
	<i 
		:class="iconClasses"
		:style="iconStyles"
	>{{ name }}</i>
</template>

<script>
export default {
	name: 'AppIcon',

	props: {
		name: {
			type: String,
			required: true
		},

		color: {
			type: String,
			default: 'primary'
		},

		size: {
			type: String,
			default: 'inherit'
		}
	},

	computed: {

		/**
         * Classes for icon
         * @returns {string[]}
         */
		iconClasses () {
			const classes = ['material-icons', 'icon'];
			const name = this.name;
			const colorClass = ['text', this.color].join('-');

			if (name) {
				classes.push(colorClass, `icon-${name}`);
			}

			return classes;
		},

		/**
         * Custom icon styles
         * @returns {object}
         */
		iconStyles () {
			const fontSize = this.size;

			return {
				'font-size': fontSize
			}
		}
	}
}
</script>