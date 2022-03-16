<template>
	<div data-accordion-subitem-id="id" class="evolve-accordion-subitem">
		<div class="left">
			<span class="sub-func-item">{{ label }}</span>
			<template v-if="desc">
				<br>
				<small class="sub-func-value">
					<i>{{ desc }}</i>
				</small>
			</template>
		</div>
		<div class="right">
			<span v-if="status" :class="statusType | statusClass" :aria-label="status">{{ status }}</span>
			<slot name="status"></slot>
			<slot name="action"></slot>
		</div>
	</div>
</template>

<script>
import localMixin from "./mixin";

export default {
	name: "EvolveSubFunctionItem",

	mixins: [localMixin],

	props: {
		// eslint-disable-next-line vue/require-default-prop
		id: {
			type: [Number, String],
			required: false,
		},
		label: {
			type: String,
			required: true
		},
		// eslint-disable-next-line vue/require-default-prop
		desc: {
			type: String,
			required: false
		},
		status: {
			type: String,
			default: null
		},
		statusType: {
			type: String,
			default: 'primary'
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

.evolve-accordion-subitem {
  margin-top: 8px;
  margin-bottom: 8px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 8px;
  height: 70px;
  display: flex;
  background-color: transparent;
  flex-direction: row;
  box-shadow: 0 4px 12px #ddd;
  justify-content: space-between;
  align-items: center;

  .status-badge {
    margin-right: 22px;
  }

  .right {
    padding-right: 16px;
    display: flex;
    align-items: center;
  }
}

@include use-dark {
  .evolve-accordion-subitem {
    box-shadow: none;
  }
}
</style>