<template>
	<div 
		class="app-lazy-image"
		:data-load-status="loaded"
		:style="customContainerStyles"
	>
		<img 
			:id="id" 
			:src="src"
			:alt="alt"
			:title="title"
			:class="classes"
			:style="styles"
			@load="handleImageLoadEnd"
		>

		<template v-if="loaded === false">
			<app-icon 
				name="wallpaper"
				color="inherit"
				size="35px"
			/>
		</template>
	</div>
</template>

<script>
export default {
	name: 'AppLazyImage',

	props: {
		id: {
			type: String,
			default: null
		},
		src: {
			type: String,
			default: null
		},
		alt: {
			type: String,
			required: true
		},
		title: {
			type: String,
			default: null
		},
		width: {
			type: String,
			default: 'auto'
		},
		height: {
			type: String,
			default: 'auto'
		},
		classes: {
			type: String,
			default: ''
		},
		styles: {
			type: Object,
			default: function () {
				return {};
			}
		}
	},

	data () {
		return {
			loaded: false
		}
	},

	computed: {
		customContainerStyles () {
			return {
				width: this.width,
				height: this.height
			}
		}
	},
 
	created () {
		this.startImageLoading();
	},

	methods: {
		startImageLoading () {
			this.loaded = false;
		},
		handleImageLoadEnd () {
			this.loaded = true;
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

@keyframes blink {
    from {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
    to {
        opacity: 1;
    }
}

.app-lazy-image {
    width: 100%;
    color: $fr-5;
    fill: $fr-5;
    border-radius: inherit;

    &:not([data-load-status]) {
        animation-name: blink;
        animation-duration: 1.4s;
        animation-delay: 500ms;
        animation-iteration-count: infinite;

        img {
            display: none;
        }
    }

    &[data-load-status] {
        img {
            display: block;
        }
    }

    img {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        height: 100%;
        border-radius: inherit;
    }
}
</style>