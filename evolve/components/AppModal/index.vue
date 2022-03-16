<template>
	<transition name="fade">
		<div 
			ref="appModalContainer" 
			:class="{ 'app-modal': true, 'backlayer': backlayer }"
			@mousedown="handleBacklayerAction"
		>
			<div class="container" :style="containerStyles">
				<div class="title-bar">
					<h4 class="title">
						{{ title || '&nbsp;' }}
					</h4>

					<div class="actions">
						<app-icon-button 
							icon="close"
							@click="handleCloseEvent"
						/>
					</div>
				</div>

				<div class="body">
					<slot name="body"></slot>
				</div>

				<div v-if="hasActions" class="footer-actions">
					<slot name="actions"></slot>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'AppModal',

	props: {
		title: {
			type: String,
			default: null
		},
		width: {
			type: String,
			default: '460px'
		},
		height: {
			type: String,
			default: '140px'
		},
		backlayer: {
			type: Boolean,
			default: true
		}
	},

	computed: {
		hasActions () {
			return !!this.$slots.actions;
		},

		/**
         * App modal container
         * @returns {Element}
         */
		appModalContainer () {
			return this.$refs['appModalContainer'];
		},

		containerStyles () {
			const styles = {
				'width': this.width,
				'height': this.height
			};

			return styles;
		}
	},

	mounted () {

		// use keyup
		document.addEventListener('keyup', this.handleEscapeKeyEvent);
	},

	destroyed () {

		// use keyup
		document.removeEventListener('keyup', this.handleEscapeKeyEvent);
	},

	methods: {

		/**
         * Handle backlayer action
         * @param {MouseEvent} $event - Event
         */
		handleBacklayerAction ($event) {
			const target = $event.target;
			const container = this.appModalContainer;

			if (target instanceof Element && target === container) {
				this.$emit('blur', $event);
			}
		},

		/**
         * Handle escape key event
         * @param {KeyboardEvent} $event - Event
         */
		handleEscapeKeyEvent ($event) {
			const code = $event.code;

			if (code === 'Escape') {
				this.$emit('escape', $event);
			}
		},

		/**
         * Handle modal close event
         * @description Emits 'close' event
         * @param {object} event - Event
         */
		handleCloseEvent ($event) {
			this.$emit('close', $event);
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

.fade-enter-active, .fade-leave-active {
    transition: opacity 290ms ease;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

@keyframes modal-init {
    from {
        opacity: 0;
        transform: scale(0.95) translateY(-12px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.app-modal {
    @include xy-center-col();
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 400;

    &.backlayer {
        background-color: rgba(0, 0, 0, 0.2);
    }

    &:not(.backlayer) {
        .container {
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
    }

    .container {
        display: flex;
        flex-direction: column;
        height: auto;
        min-height: 80px;
        border-radius: 12px;
        background-color: $bg;
        animation-name: modal-init;
        animation-duration: 200ms;

        @media screen and (max-width: 767px) {
            width: 100% !important;
            height: 100vh !important;
        }

        .title-bar {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            height: 60px;
            border-top-left-radius: inherit;
            border-top-right-radius: inherit;
            background-color: $bg;
            border-bottom-width: 1px;
            border-bottom-style: solid;
            border-bottom-color: $stroke;

            .title {
                margin-left: 10px;
            }
        }

        .body {
            @extend .regular-scroll;
            overflow: auto;
            height: 100%;
        }

        .body,
        .footer-actions {
            padding: 4px 1rem;
        }

        .footer-actions {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            padding-top: 8px;
            padding-bottom: 8px;
            border-top: 1px solid $stroke-1;
            border-bottom-left-radius: inherit;
            border-bottom-right-radius: inherit;
        }
    }
}

@include use-dark {
    .app-modal {
        .container {
            background-color: $bg-dark-2;
            box-shadow: none;

            .title-bar {
                border-bottom-color: transparent;
                background-color: $bg-dark-3;

                .title {
                    color: $fr-dark-1;
                }
            }
        }
    }
}
</style>