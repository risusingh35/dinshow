<template>
	<div
		class="evolve-accordion-menu-item"
		:aria-expanded="expanded"
		:data-accordion-menu-item-id="id"
	>
		<div class="evolve-accordion-menu-item-label" :aria-label="label">
			<div class="left">
				<app-icon-button
					:data-accordion-menu-item-target="id"
					icon="arrow_drop_down"
					@click="toggleExpandedState"
				/>
				<span class="label">{{ label }}</span>
			</div>
			<span class="right">
				<span v-if="status" :class="statusType | statusClass">{{ status }}</span>
				<slot name="action"></slot>
			</span>
		</div>

		<div class="evolve-accordion-subitems">
			<slot name="sub"></slot>
		</div>
	</div>
</template>

<script>
import localMixin from "./mixin";

export default {
	mixins: [localMixin],

	props: {
		// eslint-disable-next-line vue/require-default-prop
		id: {
			type: [Number, String],
			required: false
		},
		label: {
			type: String,
			required: true
		},
		status: {
			type: String,
			default: null
		},
		statusType: {
			type: String,
			default: 'primary'
		}
	},

	data () {
		return {
			expanded: false,
		};
	},

	methods: {
		toggleExpandedState () {
			this.expanded = !this.expanded;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "./index.scss";

.evolve-accordion-menu-item {
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  width: inherit;

  .evolve-accordion-menu-item-label {
    width: inherit;
    padding-left: 12px;
    padding-right: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: transparent;
    box-shadow: 0 6px 20px #ddd;
    border: 1px solid #eee;
    border-radius: 12px;

    .left,
    .right {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .right {
      padding-right: 16px;
    }

    .label {
      font-size: 20px;
      font-weight: 500;
    }

    .status-badge {
      margin-right: 22px;
    }
  }

  .evolve-accordion-subitems {
    display: none;
    flex-direction: column;
    margin-top: 16px;
    margin-left: 4rem;
  }

  .app-icon-button {
    transform: rotate(270deg);
  }

  &[aria-expanded] {
    .app-icon-button {
      transform: rotate(180deg);
    }

    .evolve-accordion-subitems {
      display: flex;
    }
  }
}

@include use-dark {
  .evolve-accordion-menu-item {
    .evolve-accordion-menu-item-label {
      box-shadow: none;
      border: none;
      background-color: $bg-dark-3;
    }
  }
}
</style>