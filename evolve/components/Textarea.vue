<template>
	<div
		class="sc-input-wrapper"
		:class="{
			'sc-input-wrapper-outline': mode === 'outline',
			'sc-input-wrapper-danger': state === 'danger',
			'sc-input-wrapper-success': state === 'success',
		}"
	>
		<slot></slot>
		<textarea
			:id="id"
			ref="textarea"
			v-autosize
			:name="name"
			:disabled="disabled"
			:value="value"
			:placeholder="placeholder"
			:rows="rows"
			:class="[
				'uk-textarea',
				'sc-vue-input',
				modeClass,
				dangerClass,
				successClass,
				extraClasses,
			]"
			@focus="focus"
			@blur="blur"
			@change="change"
			@input="updateModel"
			@keyup="keyUp"
		>
    </textarea>
		<span v-if="mode !== 'outline'" class="sc-input-bar"></span>
	</div>
</template>
<script>
import jQuery from "~/plugins/jquery";
var autosize = require("autosize");
export default {
	name: "ScTextarea",
	directives: {
		autosize: {
			bind: function (el, binding, vnode) {
				if (vnode.context.$props.autosize) {
					vnode.context.$nextTick(() => {
						autosize(el);
					});
				}
			},
			componentUpdated: function (el, binding, vnode) {
				if (vnode.context.$props.autosize) {
					autosize.update(el);
				}
			},
			unbind: function (el) {
				autosize.destroy(el);
			},
		},
	},
	props: {
		id: {
			type: String,
			default: null,
		},
		name: {
			type: String,
			default: "",
		},
		value: {
			type: String,
			default: "",
		},
		mode: {
			type: String,
			default: "",
		},
		state: {
			type: String,
			default: "",
		},
		extraClasses: {
			type: String,
			default: "",
		},
		rows: {
			type: Number,
			default: 5,
		},
		cols: {
			type: Number,
			default: 10,
		},
		placeholder: {
			type: String,
			default: null,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		autosize: {
			type: Boolean,
			default: false,
		},
		ukTooltip: {
			type: Object,
			default: null,
		},
		focus: {
			type: Function,
			default: () => {},
		},
		blur: {
			type: Function,
			default: () => {},
		},
		change: {
			type: Function,
			default: () => {},
		},
		keyUp: {
			type: Function,
			default: () => {},
		},
	},
	computed: {
		modeClass () {
			return this.$props.mode === "outline" ? "sc-textarea-outline" : "";
		},
		dangerClass () {
			return this.$props.state === "danger" ? "uk-form-danger" : "";
		},
		successClass () {
			return this.$props.state === "success" ? "uk-form-success" : "";
		},
	},
	mounted () {
		var self = this;
		var $textarea = $(this.$refs.textarea);
		if (this.ukTooltip) {
			UIkit.tooltip($textarea, self.ukTooltip);
		}
		$textarea
			.on("focus", function () {
				$(this).closest(".sc-input-wrapper").addClass("sc-input-focus");
			})
			.on("blur", function () {
				$(this).closest(".sc-input-wrapper").removeClass("sc-input-focus");
				if (!$(this).hasClass("sc-label-fixed")) {
					if ($(this).val() !== "") {
						$(this).closest(".sc-input-wrapper").addClass("sc-input-filled");
					} else {
						$(this).closest(".sc-input-wrapper").removeClass("sc-input-filled");
					}
				}
			})
			.on("keyup change input", function () {
				if (!$(this).hasClass("sc-label-fixed")) {
					if ($(this).val() !== "") {
						$(this).closest(".sc-input-wrapper").addClass("sc-input-filled");
					} else {
						$(this).closest(".sc-input-wrapper").removeClass("sc-input-filled");
					}
				}
			})
			.on("change", function () {
				self.updateInput();
			})
			.on("validationClassChanged", "[data-sc-input]", function () {
				if ($(this).hasClass("uk-form-danger")) {
					$(this)
						.closest(".sc-input-wrapper")
						.addClass("sc-input-wrapper-danger");
				}
			});
	},
	destroy () {
		this.$refs.textarea.style.visibility = "hidden";
	},
	methods: {
		updateInput () {
			var $el = $(this.$refs.textarea);
			// clear wrapper classes
			$el
				.closest(".uk-input-group")
				.removeClass("uk-input-group-danger uk-input-group-success");
			$el
				.closest(".sc-input-wrapper")
				.removeClass(
					"sc-input-wrapper-danger sc-input-wrapper-success sc-input-wrapper-disabled"
				);

			if ($el.hasClass("uk-form-danger")) {
				if ($el.closest(".uk-input-group").length) {
					$el.closest(".uk-input-group").addClass("sc-input-group-danger");
				}
				$el.closest(".sc-input-wrapper").addClass("sc-input-wrapper-danger");
			}
			if ($el.hasClass("uk-form-success")) {
				if ($el.closest(".uk-input-group").length) {
					$el.closest(".uk-input-group").addClass("sc-input-group-success");
				}
				$el.closest(".sc-input-wrapper").addClass("sc-input-wrapper-success");
			}
			if ($el.prop("disabled")) {
				$el.closest(".sc-input-wrapper").addClass("md-input-wrapper-disabled");
			}
			if ($el.val() !== "") {
				$el.closest(".sc-input-wrapper").addClass("sc-input-filled");
			} else {
				$el.closest(".sc-input-wrapper").removeClass("sc-input-filled");
			}
			if ($el.hasClass("label-fixed")) {
				$el.closest(".sc-input-wrapper").addClass("sc-input-filled");
			}
		},
		updateModel () {
			this.$emit("input", this.$refs.textarea.value);
		},
	},
};
</script>
