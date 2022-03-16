<template>
	<div class="uk-flex uk-flex-center" :class="{ 'uk-flex-1': !columnVisible }">
		<a v-show="columnVisible"
			href="javascript:void(0)"
			class="sc-actions-icon mdi"
			data-uk-tooltip
			:class="[hideIcon]"
			:title="hideTitle"
			@click="columnHide($event)"
		></a>
		<a v-show="!columnVisible"
			href="javascript:void(0)"
			class="sc-actions-icon mdi sc-js-el-show"
			:class="[showIcon]"
			data-uk-tooltip
			:title="showTitle"
			@click="columnShow($event)"
		></a>
	</div>
</template>

<script>
import jQuery from '~/plugins/jquery'
import { scHelpers } from '~/assets/js/scutum_common.js'
export default {
	props: {
		hideTitle: {
			type: String,
			default: 'Hide List'
		},
		hideIcon: {
			type: String,
			default: 'mdi-arrow-collapse-horizontal'
		},
		showTitle: {
			type: String,
			default: 'Show List'
		},
		showIcon: {
			type: String,
			default: 'mdi-arrow-expand-horizontal'
		},
		columnClass: {
			type: String,
			default: 'sc-column-collapsed'
		},
		collapsed: {
			type: Boolean,
			default: false
		},
		collapseCallback: {
			type: Function,
			default: null
		},
		expandCallback: {
			type: Function,
			default: null
		}
	},
	data () {
		return {
			columnVisible: true
		}
	},
	mounted () {
		this.$nextTick(() => {
			if(this.collapsed) {
				$(this.$el).closest('.sc-js-column').addClass(this.columnClass);
				this.columnVisible = false;
			}
		});
	},
	methods: {
		'columnHide': function (e) {
			e.preventDefault();
			var $this = $(e.target).closest('.sc-js-column');
			scHelpers.hideDuringTransform($this);
			$this.addClass(this.columnClass);
			this.columnVisible = false;
			if (this.collapseCallback) {
				setTimeout(() => {
					this.collapseCallback();
				}, 300)
			}
		},
		'columnShow': function (e) {
			e.preventDefault();
			var $this = $(e.target).closest('.sc-js-column');
			scHelpers.hideDuringTransform($this);
			$this.removeClass(this.columnClass);
			this.columnVisible = true;
			if (this.expandCallback) {
				setTimeout(() => {
					this.expandCallback();
				}, 300)
			}
		}
	}
}
</script>
