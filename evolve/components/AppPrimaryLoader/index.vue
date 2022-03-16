<template>
	<div :class="['primary-loader', color]" :style="loaderStyles">
		<div class="indeterminate"></div>
	</div>
</template>

<script>
export default {
	name: 'AppPrimaryLoader',

	props: {
		color: {
			type: String,
			default: 'primary'
		},

		height: {
			type: Number,
			default: 6
		}
	},

	computed: {
		loaderStyles () {
			return {
				height: this.height + 'px'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

.primary-loader {
    position: relative;
    display: block;
    border-radius: 2px;
    background-clip: padding-box;
    overflow: hidden;

    .indeterminate, 
    &.primary .indeterminate {
        background-color: $primary;
    }

    &.white .indeterminate {
        background-color: $white;
    }
    &.gray .indeterminate {
        background-color: $gray-500;
    }
    &.black .indeterminate {
        background-color: $black;
    }

    .indeterminate:before {
        content: "";
        position: absolute;
        background-color: inherit;
        top: 0;
        left: 0;
        bottom: 0;
        will-change: left, right;
        -webkit-animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
        animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    .indeterminate:after {
        content: "";
        position: absolute;
        background-color: inherit;
        top: 0;
        left: 0;
        bottom: 0;
        will-change: left, right;
        -webkit-animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
        animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
        -webkit-animation-delay: 1.15s;
        animation-delay: 1.15s;
    }
}

@-webkit-keyframes indeterminate {
   0% {
      left: -35%;
      right: 100%;
   }

   60% {
      left: 100%;
      right: -90%;
   }

   100% {
      left: 100%;
      right: -90%;
   }
}

@keyframes indeterminate {
   0% {
      left: -35%;
      right: 100%;
   }

   60% {
      left: 100%;
      right: -90%;
   }

   100% {
      left: 100%;
      right: -90%;
   }
}

@-webkit-keyframes indeterminate-short {
   0% {
      left: -200%;
      right: 100%;
   }

   60% {
      left: 107%;
      right: -8%;
   }

   100% {
      left: 107%;
      right: -8%;
   }
}

@keyframes indeterminate-short {
   0% {
      left: -200%;
      right: 100%;
   }

   60% {
      left: 107%;
      right: -8%;
   }

   100% {
      left: 107%;
      right: -8%;
   }
}

</style>