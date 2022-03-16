<template>
	<div class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="getItemList()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
			</div>
			 
			<div v-if="EvolveMenu_Id" class="evolve-page-header-icons">
				<a href="javascript:void(0)" data-uk-tooltip="title: Add To Favourite; pos: right" class="sc-actions-icon mdi mdi-star md-color-yellow-600" @click="$store.dispatch('addToFavouriteClick', EvolveMenu_Id)"></a>
			</div>
			<div class="evolve-page-header-icons evolve-float-right"> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click="$store.dispatch('removeOneTab', '/mdm/item/list')"></a>
			</div>

			<!-- <div class="evolve-page-header-icons evolve-float-right"> 
				<button class="sc-button datatable-print-button" type="button" @click="onCreateOrEditItem('')">
					{{ translate.create_Item }}
				</button>
			</div> -->
			 
			<div class="evolve-page-header-icons evolve-float-right">
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-excel md-color-indigo-600" @click="downloadCsv()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-pdf md-color-red-600" @click="downloadPdf()"></a>
			</div>
		</div>
		<client-only>
			<div id="sc-page-content" class="evolve-page-body">
				<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
					<div class="uk-card">
						<div class="uk-card-body">
							<div class="uk-overflow-auto">
								<select v-model="displayRecord" @change="onDisplayRecordChange($event)">
									<option v-for="dr in displayRow" :key="dr" :value="dr">
										{{ dr }}
									</option>
								</select>
								<client-only>
									<input
										v-model="search"
										type="text"
										:placeholder="translate.search_here"
										style="float: right !important;"
										@input="onInputSearch()"
									>
								</client-only>
								<client-only>
									<table id="ItemTable" class="uk-table uk-table-striped">
										<thead>
											<tr>
												<th>{{ translate.item_Part }}</th>
												<th>{{ translate.Item_desc1 }}</th>
												<th>{{ translate.item_Group }}</th>
												<th>{{ translate.item_PartType }}</th>
												<th>{{ translate.ProductLine_name }}</th>
												<th>{{ translate.invStatus_code }}</th>
												<th> {{ translate.actions }} </th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(row, index) in ItemList" :key="index">
												<td>{{ row.EvolveItem_Part }}</td>
												<td>{{ row.EvolveItem_Desc1 }}</td>
												<td>{{ row.EvolveItem_Group }}</td>
												<td>{{ row.EvolveItem_PartType }}</td>
												<td>{{ row.EvolveProductLine_Name }}</td>
												<td>{{ row.EvolveInvStatus_Code }}</td>
												<button
													title="Edit"
													class="sc-button sc-button-primary sc-button-mini waves-effect sc-button-mini waves-button waves-light"
													
													@click="editItem(row.EvolveItem_ID)"
												>
													<i class="mdi mdi-square-edit-outline"></i>
												</button>
											</tr>
										</tbody>
									</table>
									<div class="paginate">
										<Paginate
											:page-count="pageCount"
											:click-handler="paginateClick"
											:prev-text="'<'"
											:next-text="'>'"
											:value="currentPage"
											:container-class="'evolve_paginate'"
										></Paginate>
									</div>
									<client-only>
										<EvolvePDF :reqdata="pdfData"></EvolvePDF>
									</client-only>
								</client-only>
							</div>
						</div>
					</div>
				</div>
			</div>
		</client-only>
	</div>
</template>

<style>
.icons_selections {
  height: 200px !important;
  overflow: auto;
}
</style>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";


if (process.client) {
	// // require(~/plugins/daterangepicker);
	require("~/plugins/flatpickr");
	require("~/assets/js/vendor/jquery.quicksearch.js");
	var Paginate = require("vuejs-paginate");
}

export default {
	head () {
		return {
			title: "Evolve - " + this.$route.path,
		};
	},
	layout: "eDefaultV2",

	components: {
		Paginate,
		EvolvePDF: process.client
			? () => import("~/components/jspdf/evolvePDF")
			: null,
		// Select2: process.client ? () => import("~/components/Select2") : null,
	},
	mixins: [validationMixin],
	props: {
		params: {
			type: Object,
			default: () => {}
		}
	},
	data () {
		return {
			EvolveMenu_Id :this.$route.query.EvolveMenu_Id,
			translate: {
				item_Part:'Item Part',
				item_Group:'Item Group',
				item_PartType:'Item PartType',
				invStatus_code:'InvStatus Code',
				ProductLine_name : "ProductLine Name",
				Item_desc1 : "Item Desc 1",
				search_here : 'Search Here',
				actions:"Action",
			    options :"Options",
			},
		
			baseUrl: this.$axios.defaults.baseURL,
			ItemList: [],

			/** Start : EvolveDataTable */
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1, 2, 3, 4, 5],
			pdfExportColums: [0, 1, 2, 3, 4, 5],
			search: "",
			/** End : EvolveDataTable */
		};
	},

	computed: {},

	watch: {
	},

	beforeDestroy () {
		clearInterval(this.ramUpdateInterval);
	},

	created: async function () {
		this.removeModal();
		this.getItemList();
	},
	validations: {
	},
	mounted () {
		this.$root.$on("onChangeLanguage", () => {
			console.log("Language Changed.....");
			this.translateLanguage();
		});
	},
	beforeMount () {
		this.translateLanguage();
	},

	methods: {
		// defult evolve functions
		translateLanguage: async function () {
			let languageId = this.$auth.$storage.getLocalStorage("EvolveLanguage_ID");
			if (languageId != undefined) {
				const languageTranstale = await this.$axios
					.$post("/api/v1/evolve/translate", {
						languageId: languageId,
						translate: this.translate,
					})
					.catch((e) => {});
				if (languageTranstale) {
					let tra = this.translate;
					Object.keys(this.translate).forEach(function (key) {
						languageTranstale.result.forEach(function (obj) {
							if (obj.EvolvelLabel_KeyWord == key) {
								tra[key] = obj.EvolveLabel_Term;
							}
						});
					});
				}
			}
		},

		removeModal: async function (e) {
			$(".uk-modal").remove(); // Remove Old Model From DOM
		},

		notification: async function (type = "danger", timeout = 10000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},
		// defult evolve functions end

		/* Datatable Methods -- Start */
		onDisplayRecordChange: async function (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getItemList();
		},

		paginateClick: async function (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getItemList();
		},

		onInputSearch: function () {
			this.currentPage = 1;
			this.getItemList();
			this.paginateClick(1);
		},

		downloadPdf: function () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("ItemTable").outerHTML;
			let rows = document.querySelectorAll("table tr");
			for (let i = 0; i < rows.length; i++) {
				let row = [],
					cols = rows[i].querySelectorAll("td, th");
				for (let j = 0; j < cols.length; j++) {
					if (this.pdfExportColums.indexOf(j) != -1) {
						if (i == 0) {
							header.push(cols[j].innerText);
						} else {
							row.push(cols[j].innerText);
						}
					}
				}
				if (i != 0) {
					data.push(row);
				}
			}
			this.pdfData = {
				code: "pdfDemo",
				logo: img,
				printData: {
					title: "Evolve Item List",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "EvolveItemList",
				},
			};
		},

		downloadCsv: function () {
			let filename = "EvolveItemList";
			let csv = [];
			let html = document.getElementById("ItemTable").outerHTML;
			let rows = document.querySelectorAll("table tr");
			for (let i = 0; i < rows.length; i++) {
				let row = [],
					cols = rows[i].querySelectorAll("td, th");
				for (let j = 0; j < cols.length; j++) {
					if (this.pdfExportColums.indexOf(j) != -1) {
						let rowData = cols[j].innerText;
						rowData = rowData.split(",").join(" ");
						row.push(rowData);
					}
				}
				csv.push(row);
			}

			let csvContent = csv.map((e) => e.join(",")).join("\n");
			let csvFile;
			let downloadLink;
			// CSV FILE
			csvFile = new Blob([csvContent], { type: "text/csv" });
			// Download link
			downloadLink = document.createElement("a");
			// File name
			downloadLink.download = filename + ".csv";
			// We have to create a link to the file
			downloadLink.href = window.URL.createObjectURL(csvFile);
			// Make sure that the link is not displayed
			downloadLink.style.display = "none";
			// Add the link to your DOM
			document.body.appendChild(downloadLink);
			// Lanzamos
			downloadLink.click();
		},
		/* Datatable Methods -- End */
		getItemList: async function () {
			let list = await this.$axios.$post("/api/v1/eMdm/Item/getItemList", {
				displayRecord: this.displayRecord,
				startFrom: this.startFrom,
				search: this.search,
			}).catch((e) => { this.notification("danger", 10000, "Problem With Connecting Server!!");
			});
			if (list.statusCode == 200) {
				console.log("list.result.records ????????????", list.result.records);
				this.ItemList = list.result.records;
				if (list.result.noOfRecord > 0) {
					this.pageCount = Math.ceil(
						list.result.noOfRecord / this.displayRecord
					);
				} else {
					this.pageCount = 0;
				}
			} else {
				this.notification("danger", 10000, list.message);
			}
		},

		// onCreateOrEditItem: async function (EvolveAddress_ID) {
		// 	this.$store.dispatch('addNewTab', {
		// 		title: EvolveAddress_ID == '' ? this.translate.address_create  :  this.translate.address_update, 
		// 		url: '/mdm/address/options',
		// 		// params: {
		// 		// 	EvolveAddress_ID: EvolveAddress_ID,
		// 		// }
		// 	});
		// },
		onDeleteAddress: async function (index) {
			let thisl = this;
			UIkit.modal
				.confirm(
					"Are You Sure To Delete Menu Type " +thisl.menuTypeList[index].EvolveMenuType_Type +" ?")
				.then(
					async function () {

						console.log("skskkskskksksksks")
						thisl.loaderShow();
						let response = await thisl.$axios
							.$post("/api/v1/evolve/MenuType/deleteMenuType", {
								EvolveMenuType_ID : thisl.menuTypeList[index].EvolveMenuType_ID,
							})
							.catch((e) => {
								thisl.notification(
									"danger",
									10000,
									"Problem with connecting to server!"
								);
							});
						
						console.log("response???", response)
						if (response) {
							if (response.statusCode == 200) {
								thisl.notification("success", 10000, response.message);
							} else {
								thisl.notification("danger", 10000, response.message);
							}
						}

						thisl.getItemList();
						thisl.loaderHide();
					},
					function () {
						thisl.notification("danger", 10000, "User decline process.");
					}
				);
		},

		editItem: async function (EvolveItem_ID) {

			this.$store.dispatch('addNewTab', {
				title: 'Update Item', 
				url: '/mdm/item/option',
				params: {
					EvolveItem_ID: EvolveItem_ID,
				}
			});
		}
	},
};
</script>

<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>