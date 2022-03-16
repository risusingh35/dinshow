import Vue from "vue"

export default Vue.extend({
	filters: {
		statusClass(val) {
			const classes = ["status-badge", "uk-label"];
			classes.push('uk-label-' + val);
			return classes;
		},
		statusMessage(val) {
			return val ? "ENABLE" : "DISABLED";
		}
	}
})

