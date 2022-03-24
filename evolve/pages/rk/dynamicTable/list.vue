<template>
	<div id="sc-page-wrapper" class="uk-flex uk-flex-column">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<a
					class="sc-actions-icon mdi mdi-refresh md-color-light-green-600"
					@click="refreshPage()"
				></a>
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"
				></a>
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-window-minimize"
				></a>
			</div>

			<div v-if="EvolveMenu_Id" class="evolve-page-header-icons">
				<a
					href="javascript:void(0)"
					data-uk-tooltip="title: Add To Favourite; pos: right"
					class="sc-actions-icon mdi mdi-star md-color-yellow-600"
					@click="$store.dispatch('addToFavouriteClick', EvolveMenu_Id)"
				></a>
			</div>
			<div class="evolve-page-header-icons evolve-float-right">
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-close-box md-color-red-600"
					@click="$store.dispatch('removeOneTab', pageURL)"
				></a>
			</div>

			<div class="evolve-page-header-icons evolve-float-right">
				<button
					class="sc-button sc-button-mini header-button-evolve"
					type="button"
					@click="onCreateOrEdit('')"
				>
					{{ translate.create }}
				</button>
			</div>

			<div class="evolve-page-header-icons evolve-float-right">
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-file-excel md-color-indigo-600"
					@click="downloadCsv()"
				></a>
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-file-pdf md-color-red-600"
					@click="downloadPdf()"
				></a>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	head () {
		return {
			title: "Evolve - " + this.$route.name,
		};
	},
	layout: "eDefault",
	data () {
		return {
			EvolveMenu_Id: this.$route.query.EvolveMenu_Id,
			pageURL: "/rk/dynamicTable/list",
			listData:[],
			/** Start : EvolveDataTable */
			search : '', // For making dynamic search
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1, 2, 3, 4, 5],
			pdfExportColums: [0, 1, 2, 3, 4, 5],
			/** End : EvolveDataTable */
			custCsv : '',
			translate: {
				create: "Create",
				action: "Action",
				cancel: "Cancel",
				save: "Save",
				search_here: "Search Here",
			},
		};
	},
	computed: {},
	beforeMount () {},
	mounted () {},
	beforeDestroy () {},
	created: async function () {
		// this.getList();	 
	},

	methods: {
		refreshPage: async function () {
			this.removeModal();
			this.isCalling = true;
			await this.getList();
		},
		getList: async function (){
			let getList =  await this.$axios.$post('/api/v1/evolve/supplierMaster/getSupplierList', {
				displayRecord: this.displayRecord,
				startFrom: this.startFrom,
				search : this.search,
			}).catch(e => { 
				this.notification('danger', 3000, 'Problem with connecting to server!');
			});
			if (getList) {
				if (getList.statusCode == 200) {
					this.listData = getList.result.records;
					if (getList.result.noOfRecord > 0) {
						this.pageCount = Math.ceil(
							getList.result.noOfRecord / this.displayRecord
						);
					}else{
						this.pageCount = 0
					}
				} else {
					this.notification("danger", 3000, getList.message);
				}
			}
		},
		onCreateOrEdit: async function (PR_ID) {
			//this.$root.$emit("onCloseTabCalled", '/evolve/menus/options');
			// this.$store.dispatch('removeOneTab', '/evolve/menus/options')
			if (PR_ID != "") {
				this.$store.dispatch("addNewTab", {
					title: "Update",
					url: "/rk/dynamicTable/option",
					params: {
						PR_ID: PR_ID,
					},
				});
			} else {
				this.$store.dispatch("addNewTab", {
					title: "Create",
					url: "/rk/dynamicTable/option",
				});
			}
		},
		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getCustomerList();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getCustomerList();
		},
	},
};
</script>
<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>