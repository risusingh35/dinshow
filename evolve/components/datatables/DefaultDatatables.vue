<template>
	<div>
		<table :id="id" class="uk-table uk-table-striped">
			<slot name="header"></slot>
			<slot name="footer"></slot>
		</table>
	</div>
</template>
<script>
require("~/plugins/jquery");
require("datatables.net/js/jquery.dataTables");
require("datatables.net-responsive");
require("./dataTables.uikit");
require("./funtions_click.js");
require("./dataTables.responsive.uikit");
export default {
	name: "Datatable",
	props: {
		data: {
			type: Array,
			default: () => [],
			required: true
		},
		options: {
			type: Object,
			default: () => {}
		},
		id: {
			type: String,
			required: true
		},
		buttons: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			$dt: null
		};
	},
	computed: {
		dtData () {
			return JSON.parse(JSON.stringify(this.data));
		},
		headers () {
			let names = [];
			Object.keys(this.data[0]).map(k => {
				let name = k.replace(/_/g, " ");
				names.push(name.charAt(0).toUpperCase() + name.slice(1));
			});
			return names;
		},
		columns () {
			let columns = [];
			Object.keys(this.data[0]).map(k => {
				columns.push({
					data: k
				});
			});
			return columns;
		}
	},
	watch: {
		data (newData) {
			let _options = {
				dom: "Blfrtip",
				data: newData,
				columns: this.options.columns,
				buttons: this.options.buttons,
				ordering: this.options.ordering,
				pageLength: this.options.pageLength,
				destroy: true, // It's For Destroy Old Table & Crete New Table
				aLengthMenu: this.options.aLengthMenu,
				iDisplayLength: this.options.iDisplayLength
			};

			const options = $.extend(_options, this.options);
			this.$dt = $("#" + this.id).DataTable(options);
			this.$emit("dtInitialized");
		},
		dtData (newData) {
			return JSON.parse(JSON.stringify(newData));
		}
		 
	},
	mounted () {
		if (this.buttons) {
			const pdfMake = require("~/assets/js/vendor/pdfmake/pdfmake");
			const pdfFonts = require("~/assets/js/vendor/pdfmake/vfs_fonts");
			pdfMake.vfs = pdfFonts.pdfMake.vfs;
			window.JSZip = require("~/assets/js/vendor/jszip");
			require("datatables.net-buttons");
			require("datatables.net-buttons/js/buttons.html5");
			require("datatables.net-buttons/js/buttons.print");
		}

		let _options = {
			dom: "Blfrtip",
			data: this.data,
			columns: this.options.columns,
			buttons: this.options.buttons,
			ordering: this.options.ordering,
			pageLength: this.options.pageLength,
			aLengthMenu: this.options.aLengthMenu,
			iDisplayLength: this.options.iDisplayLength,
			destroy: true // It's For Destroy Old Table & Crete New Table
		};
		const options = $.extend(_options, this.options);
		this.$dt = $("#" + this.id).DataTable(options);
		this.$emit("dtInitialized");
	}
};
 
</script>
