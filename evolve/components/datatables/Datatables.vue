<template>
	<div>
		<table :id="id" class="uk-table uk-table-striped">
			<thead>
				<tr>
					<th v-for="header in headers" :key="header" class="uk-text-nowrap">
						{{ header }}
					</th>
				</tr>
			</thead>
			<slot name="footer"></slot>
		</table>
	</div>
</template>
<script>
require('~/plugins/jquery');
require('datatables.net/js/jquery.dataTables');
require('datatables.net-responsive');
require('./dataTables.uikit');
require('./dataTables.responsive.uikit');
export default {
	name: 'Datatable',
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
		}
	},
	computed: {
		dtData () {
			return JSON.parse(JSON.stringify(this.data))
		},
		headers () {
			let names = [];
			Object.keys(this.data[0]).map(k => {
				let name = k.replace(/_/g, ' ');
				names.push(name.charAt(0).toUpperCase() + name.slice(1))
			});
			return names
		},
		columns () {
			let columns = [];
			Object.keys(this.data[0]).map(k => {
				columns.push({
					data: k
				})
			});
			return columns;
		}
	},
	watch: {
		dtData (newVal, oldVal) {
			const newLength = newVal.length;
			const oldLength = oldVal.length;
			const newIds = newVal.map(k => {
				return k.id
			});
			const oldIds = oldVal.map(k => {
				return k.id
			});
			if(newLength > oldLength) {
				let uniq = newIds.filter(k => {
					return !oldIds.includes(k)
				});
				if (uniq.length) {
					const newEl = newVal.filter(obj => {
						return obj.id === uniq[0]
					});
					this.$dt.row.add(newEl[0]).draw('full-hold');
				}
			} else {
				let uniq = oldIds.filter(k => {
					return !newIds.includes(k)
				});
				if (uniq.length) {
					this.$dt.row(':eq('+ uniq[0] +')').remove().draw('full-hold')
				}
			}
		}
	},
	mounted () {
		if(this.buttons) {
			const pdfMake = require('~/assets/js/vendor/pdfmake/pdfmake');
			const pdfFonts =require('~/assets/js/vendor/pdfmake/vfs_fonts');
			pdfMake.vfs = pdfFonts.pdfMake.vfs;
			window.JSZip = require("~/assets/js/vendor/jszip");
			require('datatables.net-buttons');
			require('datatables.net-buttons/js/buttons.html5');
			require('datatables.net-buttons/js/buttons.print');
		}
		let _options = {
			data: this.data,
			columns: this.columns
		};
		if(this.options) {
			if('responsive' in this.options && this.options.responsive === 'responsiveModal') {
				_options.responsive = {
					details:  {
						display: $.fn.dataTable.Responsive.display.modal({
							header: function (row) {
								var data = row.data();
								return 'Details for ' + data[0] + ' ' + data[1];
							}
						}),
						renderer: $.fn.dataTable.Responsive.renderer.tableAll({
							tableClass: 'table'
						})
					}
				}
			}
		}
		const options = $.extend(_options, this.options);
		this.$dt = $('#' + this.id).DataTable(options);
		this.$emit('dtInitialized');
	}
}
</script>
