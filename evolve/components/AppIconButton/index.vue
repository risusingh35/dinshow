<template>
	<a :href="url" :class="styles" @click="handleClick">
		<i v-if="icon" class="material-icons icon">{{ icon }}</i>
		<img v-else :src="src" class="icon">

		<span v-if="badge" class="badge">{{ badge }}</span>
		<span v-if="tooltip && active === false" class="tooltip-content">{{ tooltip | truncateString }}</span>

		<slot name="dropdown"></slot>
	</a>
</template>

<script>
export default {
	name: 'IconButton',
    
	props: {
		icon: {
			type: String,
			default: null
		},
		src: {
			type: String,
			default: null
		},
		badge: {
			type: String,
			default: null
		},
		fill: {
			type: String,
			default: null
		},
		size: {
			type: String,
			default: 'regular'
		},
		url: {
			type: String,
			default: null
		},
		active: {
			type: Boolean,
			default: false
		},
		tooltip: {
			type: String,
			default: null
		}
	},

	computed: {
		styles () {
			const classes = ['app-icon-button', 'primary-hoverable-icon', 'tooltip'];
			const fill = this.fill,
				size = this.size;

			if (fill) {
				classes.push('filled', fill);
			}

			if (size) {
				classes.push(size);
			}

			return classes;
		}
	},

	methods: {
        
		/**
         * Handle button click event
         * @param {object} event
         */
		handleClick (event) {
			this.$emit('click', event);
		}
	}
}
</script>

<style lang="scss">
@import "./index.scss";

.app-icon-button {
    position: relative;
    width: 32px;
    height: 32px;
    display: inline-flex;
    background-color: transparent;
    justify-content: center;
    align-items: center;
    margin: 8px;
   // border-radius: 25px;

    &:hover {
        opacity: 0.7;
    }

    .icon {
        font-size: 26px;
        color: #FFF; //$gray-600;
    }

    img.icon {
        width: 27px;
        height: auto;
        border-radius: inherit;
    }

    @media screen and (max-width: 767px) {
        .icon {
            font-size: 22px;
        }
        img.icon {
            width: 24px;
        }
    }

    .badge {
        position: absolute;
        top: 3px;
        right: 0px;
        padding: 1px;
        display: inline-block;
        min-width: 11px;
        width: auto;
        height: 11px;
        border-radius: 25px;
        font-size: 9px;
        text-align: center;
        background-color:#96a0b9; // $primary;
        color: $white;
    }

    &.small {
        width: 38px;
        height: 38px;

        .icon {
            font-size: 20px;
        }

        img.icon {
            width: 21px;
        }
    }

    &.large {
        width: 65px;
        height: 65px;
        border-radius: 50px;

        .icon {
            font-size: 34px;
        }

        img.icon {
            width: 35px;
        }
    }

    @include use-filled-style;
}

@include use-dark {
    .app-icon-button {
        background-color: transparent;

        .icon {
            color: $fr-dark-3;
        }

        &:hover {
            opacity: 1;
        }
    }
}
</style>