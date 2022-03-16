<template>
	<div :class="classes" :style="styles">
		<template v-if="wait">
			<app-secondary-loader :color="color" />
		</template>

		<template v-else>
			<div class="icon-container">
				<i class="material-icons icon">{{ icon }}</i>
			</div>
			<h3 class="title">
				{{ title }}
			</h3>
			<div v-if="message" class="message">
				<small>{{ message }}</small>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	name: 'AppProcessResult',

	props: {
		wait: {
			type: Boolean,
			default: false
		},
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '100%'
		},
		icon: {
			type: String,
			default: 'info'
		},
		title: {
			type: String,
			default: 'Info'
		},
		message: {
			type: String,
			default: ''
		},
		color: {
			type: String,
			default: ''
		}
	},

	computed: {
		styles () {
			return {
				width: this.width,
				height: this.height
			}
		},
		classes () {
			const color = this.color;

			return ['process-result', color];
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

@keyframes render-icon {
    from {
        transform: scale(0.7) rotate(-25deg);
    }
    to {
        transform: scale(1) rotate(0);
    }
}

.process-result {
    @include xy-center-col();
    color: $fr-5;
    user-select: none;

    .icon-container {
        animation-name: render-icon;
        animation-duration: 340ms;

        .icon {
            font-size: 64px;
        }
    }

    .title {
        @include animate-fadein(540ms);
        margin-top: 12px;
        line-height: 13px;
    }

    .message {
        @include animate-fadein(850ms);
    }

	@include use-color-style();
}

@include use-dark {
    .process-result {
        color: $fr-dark-5;
    }
}
</style>