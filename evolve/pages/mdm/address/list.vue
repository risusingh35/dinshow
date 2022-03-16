<template>
	<div class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="getAddressList()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
			</div>
			 
			<div v-if="EvolveMenu_Id" class="evolve-page-header-icons">
				<a href="javascript:void(0)" data-uk-tooltip="title: Add To Favourite; pos: right" class="sc-actions-icon mdi mdi-star md-color-yellow-600" @click="$store.dispatch('addToFavouriteClick', EvolveMenu_Id)"></a>
			</div>
			<div class="evolve-page-header-icons evolve-float-right"> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click="$store.dispatch('removeOneTab', '/mdm/address/list')"></a>
			</div>

			<div class="evolve-page-header-icons evolve-float-right"> 
				<button class="sc-button datatable-print-button" type="button" @click="onCreateOrEditAddress('')">
					{{ translate.create_address }}
				</button>
			</div>
			 
			<div class="evolve-page-header-icons evolve-float-right">
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-excel md-color-indigo-600" @click="downloadCsv()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-pdf md-color-red-600" @click="downloadPdf()"></a>
			</div>
		</div>
		<client-only>
			<div id="sc-page-content" class="evolve-page-body">
				<!-- <div class="uk-child-width-1-6@m uk-grid" data-uk-grid>
					<div>
						<label>Business Group :</label>
						<Select2
							v-model="BusinessGroup"
							name="BusinessGroup"
							:settings="{ 'width': '100%', 'placeholder': 'Select Business Group...', allowClear: true }"
							@change="getCompanyList()"
						>
							<option key value>
								Select Business Group
							</option>
							<option
								v-for="bg in BusinessGroupList"
								:key="bg.EvolveBusinessGroup_ID"
								:value="bg.EvolveBusinessGroup_ID"
							>
								{{ bg.EvolveBusinessGroup_Code }}
							</option>
						</Select2>
					</div>
					<div>
						<label>Company :</label>
						<Select2
							v-model="Company"
							name="Company"
							:settings="{ 'width': '100%', 'placeholder': 'Select Company...', allowClear: true }"
							@change="getUnitList()"
						>
							<option key value>
								Select Comapny
							</option>
							<option
								v-for="cl in CompanyList"
								:key="cl.EvolveCompany_ID"
								:value="cl.EvolveCompany_ID"
							>
								{{ cl.EvolveCompany_Code }}
							</option>
						</Select2>
					</div>
					<div>
						<label>Unit :</label>
						<Select2
							v-model="Unit"
							name="Unit"
							:settings="{ 'width': '100%', 'placeholder': 'Select Unit...', allowClear: true }"
						>
							<option key value>
								Select Unit
							</option>
							<option
								v-for="ul in UnitList"
								:key="ul.EvolveUnit_ID"
								:value="ul.EvolveUnit_ID"
							>
								{{ ul.EvolveUnit_Code }}
							</option>
						</Select2>
					</div>
					<div>
						<button class="sc-button sc-button-mini sc-button-primary waves-button waves-light button-margin-top"
							type="button"
							@click="getAddressList()"
						>
							Search
						</button>
						<button class="sc-button sc-button-mini sc-button-primary waves-button waves-light button-margin-top"
							type="button"
							@click="SearchBoxReset()"
						>
							Reset
						</button>
					</div>
				</div>     -->
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
									<table id="AddressTable" class="uk-table uk-table-striped">
										<thead>
											<tr>
												<th>{{ translate.address_code }}</th>
												<!-- <th>{{ translate.company }}</th> -->
												<!-- <th>{{ translate.unit }}</th> -->
												<th>{{ translate.address1 }}</th>
												<th>{{ translate.address2 }}</th>
												<th>{{ translate.address3 }}</th>
												<th>{{ translate.country }}</th>
												<th>{{ translate.state }}</th>
												<th>{{ translate.city }}</th>
												<th>{{ translate.zip_code }}</th>
												<!-- <th>{{ translate.county }}</th> -->
												<th>{{ translate.taxclass }}</th>
												<th>{{ translate.TaxUsage }}</th>
												<th>{{ translate.TaxZone }}</th>
												<th>{{ translate.IsTaxable }}</th>
												<!-- <th>{{ translate.gst_in }}</th> -->
												<!-- <th>{{ translate.pan_no }}</th> -->
												<th>{{ translate.type }}</th>
												<th>{{ translate.options }}</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(row, index) in AddressList" :key="index">
												<td>{{ row.EvolveAddress_Code }}</td>
												<!-- <td>{{ row.EvolveCompany_Code }}</td> -->
												<!-- <td>{{ row.EvolveUnit_Code }}</td> -->
												<td>{{ row.EvolveAddress_Street1 }}</td>
												<td>{{ row.EvolveAddress_Street2 }}</td>
												<td>{{ row.EvolveAddress_Street3 }}</td>
												<td>{{ row.EvolveCountry_Code }}</td>
												<td>{{ row.EvolveState_Code }}</td>
												<td>{{ row.EvolveAddress_City }}</td>
												<td>{{ row.EvolveAddress_Zip }}</td>
												<!-- <td>{{ row.EvolveAddress_County }}</td> -->
												<td>{{ row.EvolveAddress_TxclTaxCls }}</td>
												<td>{{ row.EvolveAddress_TxuTaxUsage }}</td>
												<td>{{ row.EvolveAddress_TxzTaxZone }}</td>
												<td>{{ row.EvolveAddress_IsTaxable }}</td>
												<!-- <td>{{ row.EvolveAddress_GstIn }}</td> -->
												<!-- <td>{{ row.EvolveAddress_PanNumber }}</td> -->
												<td>{{ row.EvolveAddress_Type }}</td>
												<td>
													<button
														title="Edit"
														class="sc-button sc-button-primary sc-button-mini waves-effect sc-button-mini waves-button waves-light"
														@click="onCreateOrEditAddress(row.EvolveAddress_ID)"
													>
														<i class="mdi mdi-square-edit-outline"></i>
													</button>
													<!-- <button
                                                    title="Delete"
                                                    class="sc-button sc-button-danger waves-effect sc-button-mini waves-button waves-light"
                                                    @click="onDeleteAddress(index)"
                                                >
                                                    <i class="mdi mdi-delete"></i>
                                                </button> -->
												</td>
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
				address_code : "Address Code",
				search_here : 'Search Here',
				address1 :"Address-1",
				address2 :"Address-2",
				address3 :"Address-3",
				country :"Country",
				county :"County",
				state :"State",
				city :"City",
				zip_code :"ZIP Code",
				gst_in :"GST In",
				pan_no :"PAN No.",
				type :"Type",
				options :"Options",
				taxclass :"Tax Class",
				TaxUsage :"Tax Usage",
				TaxZone :"Tax Zone",
				IsTaxable :"Is Taxable",
				create_address :"Create Address",
			    address_create :"Address Create",
			    address_update :"Address Update",
			    BusinessGroup :"Business Group",
			    company :"Company",
			    unit :"Unit",
			},
		
			baseUrl: this.$axios.defaults.baseURL,
			AddressList: [],
			BusinessGroup: '',
			BusinessGroupList: [],
			Company: '',
			CompanyList: [],
			Unit: '',
			UnitList: [],
			newSeqAdd: true,

			/** Start : EvolveDataTable */
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
			pdfExportColums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
			search: "",
			/** End : EvolveDataTable */
		};
	},

	computed: {},

	watch: {
	},

	beforeDestroy () {
		// clearInterval(this.ramUpdateInterval);
	},

	created: async function () {
		this.removeModal();
		this.getAddressList();
		this.getBusinessGroupList();
		this.getCompanyList();
		this.getUnitList();
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
			this.getAddressList();
		},

		paginateClick: async function (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getAddressList();
		},

		onInputSearch: function () {
			this.currentPage = 1;
			this.getAddressList();
			this.paginateClick(1);
		},

		downloadPdf: function () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("AddressTable").outerHTML;
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
					title: "Evolve Address List",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "EvolveAddressList",
				},
			};
		},

		downloadCsv: function () {
			let filename = "EvolveAddressList";
			let csv = [];
			let html = document.getElementById("AddressTable").outerHTML;
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
		getAddressList: async function () {
			let list = await this.$axios.$post("/api/v1/eMdm/Address/getAddressList", {
				displayRecord: this.displayRecord,
				startFrom: this.startFrom,
				search: this.search,
				EvolveBusinessGroup_ID : this.BusinessGroup,
				EvolveCompany_ID : this.Company,
				EvolveUnit_ID : this.Unit,
			}).catch((e) => { this.notification("danger", 10000, "Problem With Connecting Server!!");
			});
			if (list.statusCode == 200) {
				this.AddressList = list.result.records;
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
		onCreateOrEditAddress: async function (EvolveAddress_ID) {
			this.$store.dispatch('addNewTab', {
				title: EvolveAddress_ID == '' ? this.translate.address_create  :  this.translate.address_update, 
				url: '/mdm/address/options',
				params: {
					EvolveAddress_ID: EvolveAddress_ID,
				}
			});
		},
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

						thisl.getAddressList();
						thisl.loaderHide();
					},
					function () {
						thisl.notification("danger", 10000, "User decline process.");
					}
				);
		},
		getBusinessGroupList: async function () {
			let responce = await this.$axios.$get("/api/v1/eMdm/Address/getBusinessGroupList", {
		    }).catch((e) => { this.notification("danger", 10000, "Problem With Connecting Server!!");
			});
			if (responce.statusCode == 200) {
				this.BusinessGroupList = responce.result;
			} else {
				this.notification("danger", 10000, list.message);
			}
		},
		getCompanyList: async function () {
			this.CompanyList = [];
			let responce = await this.$axios.$post("/api/v1/eMdm/Address/getCompanyList", { EvolveBusinessGroup_ID : this.BusinessGroup
		    }).catch((e) => { this.notification("danger", 10000, "Problem With Connecting Server!!");
			});
			if (responce.statusCode == 200) {
				this.CompanyList = responce.result;
			} else {
				this.notification("danger", 10000, list.message);
			}
		},
		getUnitList: async function () {
			this.UnitList = [];
			let responce = await this.$axios.$post("/api/v1/eMdm/Address/getUnitList", { EvolveCompany_ID : this.Company
		    }).catch((e) => { this.notification("danger", 10000, "Problem With Connecting Server!!");
			});
			if (responce.statusCode == 200) {
				this.UnitList = responce.result;
			} else {
				this.notification("danger", 10000, list.message);
			}
		},
		SearchBoxReset: async function () {
			this.BusinessGroup = '';
			this.Company = '';
			this.Unit = '';
			await this.getBusinessGroupList();
			await this.getCompanyList();
			await this.getUnitList();
			this.getAddressList();
			
		},
	},
};
</script>

<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>