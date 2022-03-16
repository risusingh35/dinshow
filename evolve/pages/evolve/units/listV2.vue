<template>
	<div class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="getunitList()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
			</div>
			<div v-if="EvolveMenu_Id" class="evolve-page-header-icons">
				<a href="javascript:void(0)" data-uk-tooltip="title: Add To Favourite; pos: right" class="sc-actions-icon mdi mdi-star md-color-yellow-600" @click="$store.dispatch('addToFavouriteClick', EvolveMenu_Id)"></a>
			</div>
			<div class="evolve-page-header-icons evolve-float-right"> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click="$store.dispatch('removeOneTab', '/evolve/units/listV2')"></a>
			</div>

			<div class="evolve-page-header-icons evolve-float-right"> 
				<button
					class="sc-button datatable-print-button"
					type="button"
					:disabled="true"
					@click="onCreateOrEditUnits('')"
				>
					{{ translate.create_unit }}
				</button>
			</div>
			 
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
									<table id="menu_type" class="uk-table uk-table-striped">
										<thead>
											<tr>
												<th>{{ translate.Unit_Code }}</th>
												<th>{{ translate.Unit_Name }}</th>
												<th>{{ translate.company_code }}</th>
												<th>{{ translate.address_code }}</th>
												<th>{{ translate.status }}</th>

												<!-- <th>{{ translate.options }}</th> -->
											</tr>
										</thead>
										<tbody>
											<tr v-for="(row, index) in unitList" :key="index">
												<td>{{ row.EvolveUnit_Code }}</td>
												<td>{{ row.EvolveUnit_Name }}</td>
												<td>{{ row.EvolveCompany_Code }}</td>
												<td>{{ row.EvolveAddress_Code }}</td>

												<td>
													<span v-if="row.EvolveUnit_IsActive == 1">
														<span class="uk-label uk-label-success">active</span>
													</span>
													<span v-else>
														<span class="uk-label uk-label-danger">deactive</span>
													</span>
												</td>

												<!-- <td>
													<button
														title="Edit"
														class="sc-button sc-button-primary sc-button-mini waves-effect sc-button-mini waves-button waves-light"
														data-uk-toggle="target: #addEditAppMaster"
														@click="onCreateOrEditUnits(row.EvolveUnit_ID)"
													>
														<i class="mdi mdi-square-edit-outline"></i>
													</button>
												</td> -->
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
			translate: {
				Unit_Code :"Unit Code",
				address_code : "Address Code", 
				Unit_Name :"Unit Name",
				create_unit :"Create Unit",
				search_here : 'Search Here',
				update_unit : 'Update Unit',
				menu_type_create : 'Menu Type  Create',
				options : "Options",
				company_code : 'Company Code',
				status : 'Status'


			},
			EvolveMenu_Id : this.$route.query.EvolveMenu_Id,
			baseUrl: this.$axios.defaults.baseURL,
			unitList: [],
			newSeqAdd: true,

			/** Start : EvolveDataTable */
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1],
			pdfExportColums: [0, 1],
			search: "",
			/** End : EvolveDataTable */
		};
	},

	computed: {},

	watch: {
		mdIconsSearch (val) {
			this.mdIcons.forEach((icon) => {
				if (val !== "" && val.length > 2) {
					//console.log("icon.name :", icon.name);
					icon.visible = icon.name.toLowerCase().includes(val.toLowerCase());
					//console.log("icon.visible :", icon.visible);
				} else {
					icon.visible = true;
				}
			});
		},
	},

	beforeDestroy () {
		// clearInterval(this.ramUpdateInterval);
	},

	created: async function () {
		// this.asyncData();
		this.removeModal();
		this.getunitList();
		// this.getIconList();
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

		notification: async function (
			type = "danger",
			timeout = 3000,
			message = ""
		) {
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
			this.getunitList();
		},

		paginateClick: async function (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getunitList();
		},

		onInputSearch: function () {
			this.currentPage = 1;
			this.getunitList();
			this.paginateClick(1);
		},

		downloadPdf: function () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("menu_type").outerHTML;
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
					title: "Evolve Menu Type List",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "EvolveMenuTypeList",
				},
			};
		},

		downloadCsv: function () {
			let filename = "evolveAppMaster";
			let csv = [];
			let html = document.getElementById("menu_type").outerHTML;
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
		getunitList: async function () {
			let list = await this.$axios
				.$post("/api/v1/evolve/Unit/getunitListV2", {
					displayRecord: this.displayRecord,
					startFrom: this.startFrom,
					search: this.search,
				})
				.catch((e) => {
					this.notification("danger", 3000, "Problem With Connecting Server!!");
				});
			if (list.statusCode == 200) {
				console.log("list.result.records:::::::::::", list.result.records);
				this.unitList = list.result.records;
				console.log("this.unitList::::::", this.unitList)
				if (list.result.noOfRecord > 0) {
					this.pageCount = Math.ceil(
						list.result.noOfRecord / this.displayRecord
					);
				} else {
					this.pageCount = 0;
				}
			} else {
				this.notification("danger", 3000, list.message);
			}
		},


		onCreateOrEditUnits: async function (EvolveUnit_ID) {
			// this.$router.push(this.editUrl + EvolveSalesQuote_ID);

			this.$store.dispatch('addNewTab', {
				title: EvolveUnit_ID == '' ? this.translate.create_unit  :  this.translate.update_unit, 
				url: '/evolve/units/optionsV2',
				params: {
					EvolveUnit_ID: EvolveUnit_ID,
				}
			});
		},
		onDeleteBusinessGroup: async function (index) {
			let thisl = this;
			UIkit.modal
				.confirm(
					"Are You Sure To Delete Menu Type " +thisl.unitList[index].EvolveBusinessGroup_Name +" ?")
				.then(
					async function () {

						console.log("skskkskskksksksks")
						thisl.loaderShow();
						let response = await thisl.$axios
							.$post("/api/v1/evolve/MenuType/deleteMenuType", {
								EvolveUnit_ID : thisl.unitList[index].EvolveUnit_ID,
							})
							.catch((e) => {
								thisl.notification(
									"danger",
									3000,
									"Problem with connecting to server!"
								);
							});
						
						console.log("response???", response)
						if (response) {
							if (response.statusCode == 200) {
								thisl.notification("success", 3000, response.message);
							} else {
								thisl.notification("danger", 3000, response.message);
							}
						}

						thisl.getAllMenuTypeList();
						thisl.loaderHide();
					},
					function () {
						thisl.notification("danger", 3000, "User decline process.");
					}
				);
		},
	},
};
</script>

<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>