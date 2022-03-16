<template>
	<div id="sc-page-wrapper" class="uk-flex uk-flex-column">
		<client-only>
			<div
				id="sc-page-top-bar"
				class="sc-top-bar"
				data-uk-sticky="offset:48; show-on-up: true; animation: uk-animation-slide-top-medium"
			>
				<div class="sc-top-bar-content uk-flex uk-flex-1">
					<h1
						class="sc-top-bar-title uk-text-uppercase uk-flex-1"
					>
						{{ translate.page_configuration }}
					</h1>
					<div class="sc-actions uk-margin-left">
						<div id="sc-dt-buttons"></div>
						<button
							class="sc-button datatable-print-button"
							@click="downloadCsv()"
						>
							{{ translate.csv }}
						</button>
						<button
							class="sc-button datatable-print-button"
							@click="downloadPdf()"
						>
							{{ translate.pdf }}
						</button>
						<button
							class="sc-button datatable-print-button"
							type="button"
							@click="clearData()"
						>
							{{ translate.add_page_config }}
						</button>
					</div>
				</div>
			</div>
		</client-only>
		<div id="sc-page-content ">
			<div id="addEditPageConfig"
				ref="m"
				class="uk-modal"
				data-uk-modal
				bg-close="false"
			>
				<div class="uk-modal-dialog">
					<form class="sc-padding">
						<button class="uk-modal-close-default" type="button" data-uk-close></button>
						<div class="uk-modal-header">
							<h2 class="uk-modal-title">
								{{ translate.page_configuration }}
							</h2>
						</div>
						<div class="uk-modal-body">
							<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
								<div>
									<label>{{ translate.menu_url }}</label>
									<client-only>
										<Select2
											v-model="$v.menu_id.$model"
											:settings="{ 'width': '100%', 'placeholder' : translate.select_menu_url , allowClear: true }"
											:error-class="$v.menu_id.$error"
											:validator="$v.menu_id"
											name="menu_id"
										>
											<option key value>
												{{ translate.select_menu_url }}
											</option>
											<option
												v-for="mul in menuUrlList"
												:key="mul.EvolveMenu_Id"
												:value="mul.EvolveMenu_Id"
											>
												{{ mul.EvolveMenu_Url }}
											</option>
										</Select2>
									</client-only>
									<ul class="sc-vue-errors">
										<li
											v-if="!$v.menu_id.required"
											class="li_error"
										>
											{{ translate.menu_url }} {{ translate.is_required }} *
										</li>
									</ul>
								</div>
							</div>
							<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
								<div>
									<label>{{ translate.page_key }}</label>
									<ScInput
										v-model="$v.config_key.$model"
										mode="outline"
										:placeholder="translate.page_key"
										name="config_key"
										:error-class="$v.config_key.$error"
										:validator="$v.config_key"
									></ScInput>
									<ul class="sc-vue-errors">
										<li
											v-if="!$v.config_key.required"
										>
											{{ translate.page_key }} {{ translate.is_required }}
										</li>
									</ul>
								</div>
							</div>

							<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
								<div>
									<label>{{ translate.description }}</label>
									<ScTextarea
										v-model="$v.description.$model"
										mode="outline"
										name="description"
										:error-class="$v.description.$error"
										:validator="$v.description"
										:rows="2"
										:placeholder="translate.description"
									></ScTextarea>
									<ul class="sc-vue-errors">
										<li
											v-if="!$v.description.required"
										>
											{{ translate.description }}{{ translate.is_required }}
										</li>
									</ul>
								</div>
							</div>
							<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
								<div>
									<PrettyCheck v-model="config_value" class="p-icon" name="config_value">
										<i slot="extra" class="icon mdi mdi-check"></i>
										{{ translate.page_key }} {{ translate.is_active }}
									</PrettyCheck>
								</div>
							</div>
							<div class="uk-modal-footer uk-text-right">
								<button
									class="sc-button sc-button-flat sc-button-flat-danger uk-modal-close"
									type="button"
								>
									{{ translate.cancel }}
								</button>
								<button
									class="sc-button"
									type="button"
									@click="addEditPageConfig($event)"
								>
									{{ translate.save }}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div id="nav-mdi" class="uk-card">
				<div class="uk-card-body min-height-back">
					<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
						<div>
							<div class="uk-overflow-auto">
								<!-- <client-only>
									<input id="deleteApi" v-model="deleteApi" type="hidden">
									<input id="closeApi" type="hidden" value>
									<input id="baseURL" v-model="baseURL" type="hidden">
									<input id="token" v-model="token" type="hidden">
									<Datatable
										id="sc-dt-buttons-table"
										ref="basicTable"
										:data="dtAData"
										:options="dtDOptions"
										:reqdata="dtDOptions.ajax.data"
										:buttons="true"
										@dtInitialized="dtBasicInitialized"
									>
										<thead slot="header">
											<tr>
												<th>{{ translate.menu_name }}</th>
												<th>{{ translate.menu_url }}</th>
												<th>{{ translate.config_key }}</th>
												<th>{{ translate.status }}</th>
												<th>{{ translate.action }}</th>
											</tr>
										</thead>
									</Datatable>
                </client-only>-->

								<select v-model="displayRecord" @change="onDisplayRecordChange($event)">
									<option v-for="dr in displayRow" :key="dr" :value="dr">
										{{ dr }}
									</option>
								</select>
								<client-only>
									<input
										v-model="search"
										type="text"
										placeholder="Search Here"
										style="float: right !important;"
										@input="onInputSearch()"
									>
								</client-only>
								<client-only>
									<table id="evolvePageConfigList" class="uk-table uk-table-striped">
										<thead>
											<tr>
												<th>{{ translate.menu_name }}</th>
												<th>{{ translate.menu_url }}</th>
												<th>{{ translate.config_key }}</th>
												<th>{{ translate.status }}</th>
												<th>{{ translate.action }}</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(pcl ,index) in pageConfigList" :key="index">
												<td>{{ pcl.EvolveMenu_Name }}</td>
												<td>{{ pcl.EvolveMenu_Url }}</td>
												<td>{{ pcl.EvolvePageConfig_Key }}</td>
												<td v-if="pcl.EvolvePageConfig_Value==true">
													<span class="uk-label uk-label-success">{{ translate.active }}</span>
												</td>
												<td v-else>
													<span class="uk-label uk-label-danger">{{ translate.deactive }}</span>
												</td>
												<td>
													<button
														title="Edit"
														class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
														@click="getSingleEdit(pcl.EvolvePageConfig_ID)"
													>
														<i class="mdi mdi-square-edit-outline"></i>
													</button>
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
								</client-only>
								<client-only>
									<EvolvePDF :reqdata="pdfData"></EvolvePDF>
								</client-only>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
.uk-position-top-right {
  top: 24px;
}
</style>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import customValidators from "~/plugins/vuelidateValidators";
import ScInput from "~/components/Input";
import moment from "~/plugins/moment";
import ScTextarea from "~/components/Textarea";
import PrettyCheck from "pretty-checkbox-vue/check";
if (process.client) {
	// // require(~/plugins/daterangepicker);
	require("~/plugins/flatpickr");
	var Paginate = require("vuejs-paginate");
	// require('~/assets/js/vendor/jquery.quicksearch.js');
}

export default {
	head () {
		return {
			title: "Evolve - " + this.$route.name,
		};
	},
	layout: "eDefaultV2",
	components: {
		ScInput,
		ScTextarea,
		PrettyCheck,
		Paginate,
		EvolvePDF: process.client
			? () => import("~/components/jspdf/evolvePDF")
			: null,
		Select2: process.client ? () => import("~/components/Select2") : null,
		// Datatable: process.client? () => import("~/components/datatables/DatatablesEvolve"): null,
	},
	mixins: [validationMixin],

	data () {
		return {
			translate: {
				page_configuration: "Page Configuration",
				add_new_field: "Add New Field",
				add_page_config: "Add Page Config",
				select_menu_url: "Select Menu Url",
				menu_url: "Menu Url",
				is_required: "Is Required",
				page_key: "Page Key",
				description: "Description",
				status: "Status",
				is_active: "Is Active",
				save: "Save",
				menu_name: "Menu Name",
				menu_url: "Menu Url",
				config_key: "Config Key",
				action: "Action",
				cancel: "Cancel",
				active: "Active",
				deactive: "De-Active",
				csv: "CSV",
				pdf: "PDF",
			},
			// dtDData: [],
			// dateRange: "",
			// userId: this.$store.state.auth.user.EvolveUser_ID,
			// token: this.$auth.getToken("local"),
			// deleteApi: "",
			// baseURL: this.$axios.defaults.baseURL,
			// dtAData: [],
			// dtBOptions: {
			// 	scrollY: "200px",
			// 	scrollCollapse: true,
			// 	paging: false,
			// 	responsive: "responsiveModal"
			// },
			// dtCOptions: {
			// 	pagingType: "full_numbers"
			// },
			// dtDOptions: {
			// 	ajax: {
			// 		url: this.$axios.defaults.baseURL + "/api/v1/evolve/pageConfig/getPageConfigList",
			// 		dataType: "json",
			// 		type: "get",
			// 		data: {
			// 		},
			// 		headers: {
			// 			Authorization: this.$auth.getToken("local")
			// 		}
			// 	},
			// 	columns: [
			// 		{ data: "EvolveMenu_Name", mData: "EvolveMenu_Name" },
			// 		{ data: "EvolveMenu_Url", mData: "EvolveMenu_Url" },
			// 		{ data: "EvolvePageConfig_Key", mData: "EvolvePageConfig_Key" },
			// 		{data: "EvolvePageConfig_Value",
			// 			render : function (data, type, row){
			// 				if(row.EvolvePageConfig_Value == true){
			// 					return 'Active';
			// 				}else{
			// 					return 'De-Active';
			// 				}
			// 			}
			// 		},

			// 		{data: "EvolvePageConfig_ID",
			// 			render: function (data, type, row) {
			// 				return '<button class="sc-button sc-button-mini sc-button-primary waves-button waves-light edit_pageConfig" data-id="' +row.EvolvePageConfig_ID +'">Edit</button>&nbsp;<button class="sc-button sc-button-mini sc-button-danger waves-button waves-light delete_pageConfig" data-id="'+row.EvolvePageConfig_ID +'">Delete</button>';
			// 			}
			// 		}
			// 	],
			// 	ordering: false,
			// 	searching: true,
			// 	pageLength: 10,
			// 	aLengthMenu: [
			// 		[10, 25, 50, 75, -1],
			// 		[10, 25, 50, 75, "All"]
			// 	],
			// 	iDisplayLength: 0,
			// 	buttons: [
			// 		{
			// 			extend: "copyHtml5",
			// 			className: "sc-button datatable-print-button",
			// 			text: "Copy"
			// 		},
			// 		{
			// 			extend: "csvHtml5",
			// 			className: "sc-button datatable-print-button",
			// 			text: "CSV "
			// 		},
			// 		{
			// 			extend: "excelHtml5",
			// 			className: "sc-button datatable-print-button",
			// 			text: "Excel "
			// 		},
			// 		{
			// 			extend: "pdfHtml5",
			// 			className: "sc-button sc-button-icon datatable-print-button",
			// 			text: '<i class="mdi mdi-file-pdf md-color-red-800"></i>'
			// 		},
			// 		{
			// 			extend: "print",
			// 			className: "sc-button sc-button-icon datatable-print-button",
			// 			text: '<i class="mdi mdi-printer"></i>',
			// 			title: "Custom Title",
			// 			messageTop: "Custom message on the top",
			// 			messageBottom: "Custom message on the bottom",
			// 			autoPrint: true
			// 		}
			// 	]
			// },
			// // Datatable End

			/** Start : EvolveDataTable */
			search: "", // For making dynamic search
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [2, 10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1, 2],
			pdfExportColums: [0, 1, 2],
			/** End : EvolveDataTable */
			pageConfigList: [],
			menuUrlList: [],
			menu_id: "",
			config_key: "",
			config_value: true,
			description: "",
			pageConfig_ID: "",
		};
	},
	computed: {},
	computed: {},
	mounted () {
		const self = this;
		$(document).on("click", ".edit_pageConfig", function () {
			let edit_id = $(this).attr("data-id");
			self.getSingleEdit(edit_id);
		});
		$(document).on("click", ".delete_pageConfig", function () {
			let get_id = $(this).attr("data-id");
			self.deletePageConfigKey(get_id);
		});

		this.$root.$on("onChangeLanguage", () => {
			console.log("Language Changed.....");
			this.translateLanguage();
		});
	},
	beforeDestroy () {
		clearInterval(this.ramUpdateInterval);
	},
	created: async function () {
		this.removeModal();
		this.getMenuUrl();
		this.getPageConfigList();
	},
	beforeMount () {
		this.translateLanguage();
	},
	validations: {
		menu_id: {
			required,
		},
		config_key: {
			required,
		},
		description: {
			required,
		},
		config_value: {
			required,
		},
	},

	methods: {
		/** Default Method For All Pages : Start Here */
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
		async notification (type = "danger", timeout = 3000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},
		/* Default Method For All Pages : End Here */
		/* Datatable Methods -- Start */
		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getPageConfigList();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getPageConfigList();
		},

		async downloadPdf () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolvePageConfigList").outerHTML;
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
					title: "Evolve PageConfig List",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolvePageConfigList",
				},
			};
		},
		async downloadCsv () {
			let filename = "evolvePageConfigList";
			let csv = [];
			let html = document.getElementById("evolvePageConfigList").outerHTML;
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
		clearData: async function (e) {
			this.$v.$reset();
			this.pageConfig_ID = "";
			this.menu_id = "";
			this.config_key = "";
			this.config_value = true;
			this.description = "";
			UIkit.modal("#addEditPageConfig").show();
		},
		getPageConfigList: async function () {
			let list = await this.$axios
				.$post("/api/v1/evolve/pageConfig/getPageConfigList", {
					displayRecord: this.displayRecord,
					startFrom: this.startFrom,
					search: this.search,
				})
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (list) {
				if (list.statusCode == 200) {
					this.pageConfigList = list.result.records;
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
			}
		},
		onInputSearch () {
			this.currentPage = 1;
			this.getPageConfigList();
			this.paginateClick(1);
		},
		getMenuUrl: async function (e) {
			let response = await this.$axios
				.$get("/api/v1/evolve/pageConfig/getMenuUrl")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (response.statusCode == 200) {
				this.menuUrlList = response.result;
			} else {
				this.notification("danger", 3000, update.message);
			}
		},
		addEditPageConfig: async function (e) {
			e.preventDefault();
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.notification("danger", 3000, "All validation Is Required!");
			} else {
				if (this.pageConfig_ID == "") {
					const response = await this.$axios
						.$post("/api/v1/evolve/pageConfig/addPageConfig", {
							EvolveMenu_Id: this.menu_id,
							EvolvePageConfig_Key: this.config_key,
							EvolvePageConfig_Value: this.config_value,
							EvolvePageConfig_Desc: this.description,
						})
						.catch((e) => {
							this.notification(
								"danger",
								3000,
								"Problem with connecting to server!"
							);
						});
					if (response.statusCode == 200) {
						// this.dtDOptions.ajax.data = {};
						this.pageConfig_ID = "";
						this.menu_id = "";
						this.config_key = "";
						this.config_value = true;
						this.description = "";
						UIkit.modal("#addEditPageConfig").hide();
						this.getPageConfigList();
						this.notification("success", 3000, response.message);
					} else {
						this.notification("danger", 3000, response.message);
					}
				} else {
					const response = await this.$axios
						.$post("/api/v1/evolve/pageConfig/updatePageConfig", {
							EvolvePageConfig_ID: this.pageConfig_ID,
							EvolveMenu_Id: this.menu_id,
							EvolvePageConfig_Key: this.config_key,
							EvolvePageConfig_Value: this.config_value,
							EvolvePageConfig_Desc: this.description,
						})
						.catch((e) => {
							this.notification(
								"danger",
								3000,
								"Problem with connecting to server!"
							);
						});
					if (response.statusCode == 200) {
						// this.dtDOptions.ajax.data = {};
						this.pageConfig_ID = "";
						this.menu_id = "";
						this.config_key = "";
						this.config_value = "";
						this.description = "";
						UIkit.modal("#addEditPageConfig").hide();
						this.getPageConfigList();
						this.notification("success", 3000, response.message);
					} else {
						this.notification("danger", 3000, response.message);
					}
				}
			}
		},
		getSingleEdit: async function (edit_id) {
			const response = await this.$axios
				.$post("/api/v1/evolve/pageConfig/getSinglePageConfig", {
					EvolvePageConfig_ID: edit_id,
				})
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (response.statusCode == 200) {
				this.pageConfig_ID = response.result[0].EvolvePageConfig_ID + "";
				this.menu_id = response.result[0].EvolveMenu_Id + "";
				this.config_key = response.result[0].EvolvePageConfig_Key;
				this.config_value = response.result[0].EvolvePageConfig_Value;
				this.description = response.result[0].EvolvePageConfig_Desc;
				UIkit.modal("#addEditPageConfig").show();
			} else {
				this.notification("danger", 3000, response.message);
			}
		},
		deletePageConfigKey: async function (delete_id) {
			let error = false;
			$(this).prop("disabled", true);
			await UIkit.modal.confirm("Are You Sure..!").then(
				function () {
					error = true;
				},
				function () {
					$(this).prop("disabled", false);
					console.log("Rejected.");
				}
			);
			if (error == true) {
				const response = await this.$axios
					.$post("/api/v1/evolve/pageConfig/deletePageConfig", {
						EvolvePageConfig_ID: delete_id,
					})
					.catch((e) => {
						this.notification(
							"danger",
							3000,
							"Problem with connecting to server!"
						);
					});
				if (response.statusCode == 200) {
					this.dtDOptions.ajax.data = {};
					this.notification("success", 3000, response.message);
				} else {
					this.notification("danger", 3000, response.message);
				}
			}
		},

		// Datatable
		dtBasicInitialized () {
			this.$refs.basicTable.$dt
				.buttons()
				.container()
				.appendTo(document.getElementById("sc-dt-buttons"));
		},
	},
};
</script>
<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>