<template>
	<div class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="getEvolvePageList()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
			</div>
			 
			<div v-if="EvolveMenu_Id" class="evolve-page-header-icons">
				<a href="javascript:void(0)" data-uk-tooltip="title: Add To Favourite; pos: right" class="sc-actions-icon mdi mdi-star md-color-yellow-600" @click="$store.dispatch('addToFavouriteClick', EvolveMenu_Id)"></a>
			</div>
			<div class="evolve-page-header-icons evolve-float-right"> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click="$store.dispatch('removeOneTab', pageURL)"></a>
			</div>

			<div class="evolve-page-header-icons evolve-float-right"> 
				<button class="sc-button datatable-print-button" type="button" @click="onCreateOrEditEvolvePages('')">
					{{ translate.create_page }}
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
					<div>
						<div>
							<select v-model="displayRecord" @change="onDisplayRecordChange($event)">
								<option v-for="dr in displayRow" :key="dr" :value="dr">
									{{ dr }}
								</option>
							</select>
					 
							<input
								v-model="search"
								type="text"
								:placeholder="translate.search_here"
								style="float: right !important;"
								@input="onInputSearch()"
							>
						</div>
						
						<client-only>
							<div>
								<table id="evolvePage" class="uk-table uk-table-striped">
									<thead>
										<tr>
											<th>{{ translate.page_name }}</th>
											<th>{{ translate.page_code }}</th>
											<th>{{ translate.table_name }}</th>
											<th>{{ translate.page_url }}</th>
											<th>{{ translate.is_print_allow }}</th>
											<th>{{ translate.export_excel_allow }}</th>
											<th>{{ translate.export_pdf_allow }}</th>
											<th>{{ translate.no_of_records }}</th>
											<th>{{ translate.is_refresh_allow }}</th>

											<th>{{ translate.is_view_enable }}</th>
											<th>{{ translate.is_add_enable }}</th>


											<th>{{ translate.is_edit_allow }}</th>
											<th>{{ translate.is_delete_allow }}</th>
											<!-- <th>{{ translate.delete_message }}</th> -->
											<th>{{ translate.action }}</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(row, index) in evolvePageList" :key="index">
											<td>{{ row.EvolvePage_Name }}</td>
											<td>{{ row.EvolvePage_Code }}</td>
											<td>{{ row.EvolvePage_Table }}</td>
											<td>{{ row.Evolvepage_Url }}</td>
											<td>
												<span v-if="row.EvolvePage_isPrintPage == 1">
													<span class="uk-label uk-label-success">{{ translate.active }}</span>
												</span>
												<span v-else>
													<span class="uk-label uk-label-danger">{{ translate.deactive }}</span>
												</span>
											</td> 
											<td>
												<span v-if="row.EvolvePage_isExcelExport == 1">
													<span class="uk-label uk-label-success">{{ translate.active }}</span>
												</span>
												<span v-else>
													<span class="uk-label uk-label-danger">{{ translate.deactive }}</span>
												</span>
											</td> 
											<td>
												<span v-if="row.EvolvePage_isPdfExport == 1">
													<span class="uk-label uk-label-success">{{ translate.active }}</span>
												</span>
												<span v-else>
													<span class="uk-label uk-label-danger">{{ translate.deactive }}</span>
												</span>
											</td> 
									
										
										
											<td>{{ row.EvolvePage_NoOfRecords }}</td>
											<td>
												<span v-if="row.EvolvePage_isRefreshPage == 1">
													<span class="uk-label uk-label-success">{{ translate.active }}</span>
												</span>
												<span v-else>
													<span class="uk-label uk-label-danger">{{ translate.deactive }}</span>
												</span>
											</td> 

											
											<td>
												<span v-if="row.EvolvePage_isViewEnable == 1">
													<span class="uk-label uk-label-success">{{ translate.active }}</span>
												</span>
												<span v-else>
													<span class="uk-label uk-label-danger">{{ translate.deactive }}</span>
												</span>
											</td> 


											<td>
												<span v-if="row.EvolvePage_isAddEnable == 1">
													<span class="uk-label uk-label-success">{{ translate.active }}</span>
												</span>
												<span v-else>
													<span class="uk-label uk-label-danger">{{ translate.deactive }}</span>
												</span>
											</td> 

											<td>
												<span v-if="row.EvolvePage_isEditEnable == 1">
													<span class="uk-label uk-label-success">{{ translate.active }}</span>
												</span>
												<span v-else>
													<span class="uk-label uk-label-danger">{{ translate.deactive }}</span>
												</span>
											</td> 
										

											<td>
												<span v-if="row.EvolvePage_isDeleteEnable == 1">
													<span class="uk-label uk-label-success">{{ translate.active }}</span>
												</span>
												<span v-else>
													<span class="uk-label uk-label-danger">{{ translate.deactive }}</span>
												</span>
											</td> 
											<!-- <td>{{ row.EvolvePage_DelateMsg }}</td> -->

											<td>
												<button
													title="Edit"
													class="sc-button sc-button-primary sc-button-mini waves-effect sc-button-mini waves-button waves-light"
													@click="onCreateOrEditEvolvePages(row.EvolvePage_ID)"
												>
													<i class="mdi mdi-square-edit-outline"></i>
												</button>

												<button
													title="Delete"
													class="sc-button sc-button-danger waves-effect sc-button-mini waves-button waves-light"
													@click="onDeleteEvolvePage(row.EvolvePage_ID)"
												>
													<i class="mdi mdi-delete"></i>
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
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
			translate: {
				create_page:'Create page',
				page_name:'Page Name',
				page_code:'Page Code',
				table_name:'Table Name',
				page_url:'Page Url',
				is_print_allow:'IS Print Allow',
				export_excel_allow:'Export Excel Allow',
				export_pdf_allow:'Export Pdf Allow',
				no_of_records:'No Of Records',
				is_refresh_allow:'Is Refresh Allow',
				is_edit_allow:'Is Edit Allow',
				is_delete_allow:'Is Delete Allow',
				delete_message:'Delete Message',
				user_unit_link : 'User Unit Link',
				user_unit_link_create : 'User Unit Link Create',
				page_create:'Page Create',
				page_update:'Page Update',
				active:'Active',
				deactive:'Deactive',
				action:'Action',	
				is_view_enable : 'IS VIEW ENABLE',
				is_add_enable : 'IS ADD ENABLE'
			},

			EvolveMenu_Id :this.$route.query.EvolveMenu_Id,
			baseUrl: this.$axios.defaults.baseURL,
			evolvePageList: [],
			pageURL : '/evolve/evolvePage/list',

			/** Start : EvolveDataTable */
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
			pdfExportColums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
		this.getEvolvePageList();
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

		notification: async function (type = "danger", timeout = 3000, message = "") {
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
			this.getEvolvePageList();
		},

		paginateClick: async function (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getEvolvePageList();
		},

		onInputSearch: function () {
			this.currentPage = 1;
			this.getEvolvePageList();
			this.paginateClick(1);
		},

		downloadPdf: function () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolvePage").outerHTML;
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
					title: "Evolve Page List",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolvepageList",
				},
			};
		},

		downloadCsv: function () {
			let filename = "evolvepageList";
			let csv = [];
			let html = document.getElementById("evolvePage").outerHTML;
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
		getEvolvePageList: async function () {
			let list = await this.$axios.$post("/api/v1/evolve/EvolvePage/getEvolvePageList", {
				displayRecord: this.displayRecord,
				startFrom: this.startFrom,
				search: this.search,
			}).catch((e) => { this.notification("danger", 3000, "Problem With Connecting Server!!");
			});
			if (list.statusCode == 200) {
				this.evolvePageList = list.result.records;
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
		onCreateOrEditEvolvePages: async function (EvolvePage_ID) {

			this.$root.$emit("onCloseTabCalled", '/evolve/pageDesigner/designer');
			
			this.$store.dispatch('removeOneTab', '/evolve/pageDesigner/designer')
			this.$store.dispatch('addNewTab', {
				title: EvolvePage_ID == '' ? 'Page Designer Create'  :  'Page Designer Update', 
				url: '/evolve/pageDesigner/designer',
				params: {
					EvolvePage_ID: EvolvePage_ID,
				}
			});


			// this.$root.$emit("onCloseTabCalled", '/evolve/pageDesigner/designer');
			// this.$store.dispatch('addNewTab', {
			// 	title: EvolvePage_ID == '' ? this.translate.page_create  :  this.translate.page_update, 
			// 	url: '/evolve/pageDesigner/designer',
			// 	params: {
			// 		EvolvePage_ID: EvolvePage_ID,
			// 	}
			// });
		},

		async onDeleteEvolvePage (id){
			let error = false;
			$(this).prop("disabled", true);
			await UIkit.modal.confirm("Are You Sure..!").then(
				function () {
					error = true;
				},
				function () {
					$(this).prop("disabled", false);
					console.log("cancel.");
				}
			);
			if (error == true) {
				let response = await this.$axios.$post("/api/v1/evolve/EvolvePage/deleteEvolvePageList", { 
					EvolvePage_ID : id, 
				}).catch(e => {this.notification("danger", 3000, "Problem with connecting to server!");
				});
				if (response.statusCode == 200) {
					this.getEvolvePageList();
					this.notification('success', 3000, response.message)
				}else{
					this.notification('danger', 3000, response.message)
				}
			}	
		},
		
	},
};
</script>

<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>