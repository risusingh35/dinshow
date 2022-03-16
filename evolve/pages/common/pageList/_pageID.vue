<template>
	<div class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="getPageDataList()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
			</div>
			 
			<div v-if="EvolveMenu_Id" class="evolve-page-header-icons">
				<a href="javascript:void(0)" data-uk-tooltip="title: Add To Favourite; pos: right" class="sc-actions-icon mdi mdi-star md-color-yellow-600" @click="$store.dispatch('addToFavouriteClick', EvolveMenu_Id)"></a>
			</div>
			<div class="evolve-page-header-icons evolve-float-right"> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click="$store.dispatch('removeOneTab', pageURL)"></a>
			</div>
			
			<div v-if="pageDetails.EvolvePage_isAddEnable" class="evolve-page-header-icons evolve-float-right"> 
				<button class="sc-button datatable-print-button" type="button" @click="onClickAdd('')">
					{{ translate.add_new }}
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
					<div class="">
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
									<table id="pageDataTable" class="uk-table uk-table-striped">
										<thead>
											<tr>
												<!-- <th>{{ translate.project_code }}</th>
												<th>{{ translate.company_code }}</th>
												<th>{{ translate.currency_code }}</th>
												<th>{{ translate.unit_code }}</th>
												<th>{{ translate.project_Group }}</th>
												<th>{{ translate.project_Status }}</th> -->

												<th v-for="(row, index) in columnList" :key="index">
													{{ row.EvolvePageFields_ListLabel }}
												</th>
												<th v-if="pageDetails.EvolvePage_isEditEnable || pageDetails.EvolvePage_isViewEnable || pageDetails.EvolvePage_isDeleteEnable">
													{{ translate.options }}
												</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(row, index) in pageDataList" :key="index">
												<td v-for="(rows, index) in columnList" :key="index">
													{{ row[rows.EvolvePageFields_Code] }}
												</td>
												<td>
													<button
														v-if="pageDetails.EvolvePage_isEditEnable"
														title="Edit"
														class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
														@click="onClickEdit(row)"
													>
														<i class="mdi mdi-square-edit-outline"></i>
													</button>
													<button
														v-if="pageDetails.EvolvePage_isViewEnable"
														title="Edit"
														class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
														@click="onClickViewButton(row)"
													>
														<i class="mdi mdi-eye"></i>
													</button>
													<button
														v-if="pageDetails.EvolvePage_isDeleteEnable"
														title="Edit"
														class="sc-button sc-button-danger waves-effect sc-button-mini waves-button waves-light"
														@click="onClickDelete(row)"
													>
														<i class="mdi mdi-delete"></i>
													</button>
												</td>

												<!-- <td>{{ row.EvolveCompany_Code }}</td>
												<td>{{ row.EvolveCurrency_Code }}</td>
												<td>{{ row.EvolveUnit_Code }}</td>
												<td>{{ row.EvolveProject_Group }}</td>
												<td>{{ row.EvolveProject_Status }}</td> -->


												<!-- <td>
													<span v-if="row.EvolveProject_IsActive == 1">
														<span class="uk-label uk-label-success">active</span>
													</span>
													<span v-else>
														<span class="uk-label uk-label-danger">deactive</span>
													</span> -->
												<!-- </td> -->
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
import ScInput from "~/components/Input";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import moment from "~/plugins/moment";


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
		// ScInput,
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
			translate: {
				search_here : 'Search Here',
				create_Project :"Create Project",
			    address_create :"Address Create",
			    address_update :"Address Update",
				project_code:"Project Code",
				company_ID:"Company ID",
				currency_ID:"Currency ID",
				unit_ID:"Unit ID",
				project_Group:"Project Group",
				project_Status:"Project Status",
			    options :"Options",

				company_code:"Company Code",
				currency_code:"Currency Code",
				unit_code:"Unit Code",
				add_new : "ADD NEW"


			},

			EvolveMenu_Id :this.$route.query.EvolveMenu_Id,
			
			baseUrl: this.$axios.defaults.baseURL,
			ProjectList: [],

			/** Start : EvolveDataTable */
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [],
			pdfExportColums: [],
			search: "",
			/** End : EvolveDataTable */


			columnList : [],
			pageDetails : {},
			pageDataList : [],
			allColumnList : [],
		};
	},

	computed: {},

	watch: {
	},

	beforeDestroy () {
		// clearInterval(this.ramUpdateInterval);
	},

	created: async function () {
		console.log("this.params", this.$route.params.pageID);

		this.getAllPageDetails(this.$route.params.pageID);



		this.removeModal();
	},
	validations: {
	},
	mounted () {
		this.$root.$on("onChangeLanguage", () => {
			console.log("Language Changed.....");
			this.translateLanguage();
		});

		this.$root.$on('onCloseTabCalled', (url) =>{
			console.log("Destroy Changed.....", url)
			if(this.pageURL == url){
				this.$destroy();
			} 
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
					// Object.keys(this.translate).forEach(function (key) {
					// 	languageTranstale.result.forEach(function (obj) {
					// 		if (obj.EvolvelLabel_KeyWord == key) {
					// 			tra[key] = obj.EvolveLabel_Term;
					// 		}
					// 	});
					// });
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
			this.getPageDataList();
		},

		paginateClick: async function (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getPageDataList();
		},

		onInputSearch: function () {
			this.currentPage = 1;
			this.getPageDataList();
			this.paginateClick(1);
		},

		downloadPdf: function () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("pageDataTable").outerHTML;
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
					title: `Evolve ${this.$route.query.pageTitle}`,
					tableData: {
						header: header,
						data: data,
					},
					fileName: `Evolve ${this.$route.query.pageTitle}`,
				},
			};
		},

		downloadCsv: function () {
			let filename = `Evolve ${this.$route.query.pageTitle}`;
			let csv = [];
			let html = document.getElementById("pageDataTable").outerHTML;
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



		getAllPageDetails : async function (pageCode) {
			try {
				let list = await this.$axios.$post("/api/v1/Common/pageList/getAllPageDetails", {
					EvolvePage_Code : pageCode
				}).catch((e) => { this.notification("danger", 10000, "Problem With Connecting Server!!");
				});
				if (list.statusCode == 200) {
					console.log("list", list.result);
					this.pageDetails = list.result.pageData;
					this.columnList = list.result.showPageFieldDetails;
					this.allColumnList = list.result.pageFieldDetails;
					this.allColumnList.forEach(object => {
						let col = this.pageDetails.EvolvePage_Table+'_CreatedAt';
						object[col] = "";
					});
					console.log("this.allColumnList", this.allColumnList);
					this.displayRecord = parseInt(this.pageDetails.EvolvePage_NoOfRecords);
					for(let i = 0 ; i < this.columnList.length ; i++) {
						this.csvExportColums.push(i);
						this.pdfExportColums.push(i);
					}
					this.getPageDataList();
				} else {
					this.notification("danger", 10000, list.message);
				}
			} catch (error) {
				this.notification("danger", 10000, 'Error While Get Page Details!!');
			}

			
		},


		getPageDataList: async function () {
			try {
				let list = await this.$axios.$post("/api/v1/Common/pageList/getPageDataList", {
					displayRecord: this.displayRecord,
					startFrom: this.startFrom,
					search: this.search,
					tableName : this.pageDetails.EvolvePage_Table,
					columnList : this.columnList
				}).catch((e) => { this.notification("danger", 10000, "Problem With Connecting Server!!");
				});
				if (list.statusCode == 200) {
					this.pageDataList = list.result.records;

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
			} catch (error) {
				console.log("error", error.message);
				this.notification("danger", 10000, 'Error While Get Page Data List!!');
			}
			
		},

		onClickRefresh : async function () {
			try {
				console.log("this.pageDetails>>>>>>>", this.pageDetails);
				if(this.pageDetails.EvolvePage_isRefreshPage == true) {
					console.log("Called getPageDataList On Refresh ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
					this.getPageDataList();
				}
			} catch (error) {
				this.notification("danger", 10000, "Error While Refresh the Page Data");
			}
		},

		onClickViewButton: async function (data) {
			this.$root.$emit("onCloseTabCalled", '/common/pageList/view');
			
			this.$store.dispatch('removeOneTab', '/common/pageList/view')
			this.$store.dispatch('addNewTab', {
				title: `View ${this.$route.query.pageTitle}`, 
				url: '/common/pageList/view',
				params: {
					rowData : data,
					columnList : this.allColumnList,
				}
			});
		},

		onClickDelete : async function (data) {
			try {

				console.log()
				let thisl = this;
				UIkit.modal.confirm("ARE YOU SURE TO DELETE THIS RECORD").then(async function () {
					data.EvolvePage_PrimaryKeyColumn = thisl.pageDetails.EvolvePage_PrimaryKeyColumn;
					data.EvolvePage_Table = thisl.pageDetails.EvolvePage_Table;
					let list = await thisl.$axios.$post("/api/v1/Common/pageList/deletePageRow", data).catch((e) => { thisl.notification("danger", 10000, "Problem With Connecting Server!!");
					});
					if (list.statusCode == 200) {
						thisl.notification("success", 10000, list.message);
						thisl.getPageDataList()
					} else {
						thisl.notification("danger", 10000, list.message);
					}
				});
			} catch (error) {
				console.log("error", error.message);
				this.notification("danger", 10000, 'Error While Get Page Data List!!');
			}
		},

		onClickEdit : async function (data) {
			try {
				this.$root.$emit("onCloseTabCalled", '/common/pageList/options');
			
				this.$store.dispatch('removeOneTab', '/common/pageList/options')
				this.$store.dispatch('addNewTab', {
					title: `Edit ${this.$route.query.pageTitle}`, 
					url: '/common/pageList/options',
					params: {
						rowData : data,
						columnList : this.allColumnList,
						pageDetails : this.pageDetails,
						isEdit : true
					}
				});
			} catch (error) {
				console.log("error", error.message);
				this.notification("danger", 10000, 'Error While Edit Data!!');
			}
		},

		onClickAdd : async function () {
			try {
				this.$root.$emit("onCloseTabCalled", '/common/pageList/options');
			
				this.$store.dispatch('removeOneTab', '/common/pageList/options')
				this.$store.dispatch('addNewTab', {
					title: `Add ${this.$route.query.pageTitle}`, 
					url: '/common/pageList/options',
					params: {
						rowData : {},
						columnList : this.allColumnList,
						pageDetails : this.pageDetails,
						isEdit : false
					}
				});
			} catch (error) {
				console.log("error", error.message);
				this.notification("danger", 10000, 'Error While Add Data!!');
			}
		}



	},
};
</script>

<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>