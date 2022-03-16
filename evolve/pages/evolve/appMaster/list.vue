<template>
	<div id="sc-page-wrapper" class="uk-flex uk-flex-column">
		<client-only>
			<div
				id="sc-page-top-bar"
				class="sc-top-bar"
				data-uk-sticky="offset:48; show-on-up: true; animation: uk-animation-slide-top-medium"
			>
				<div class="sc-top-bar-content uk-flex uk-flex-1">
					<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
						{{ translate.app_master }}
					</h1>
					<div class="sc-actions uk-margin-left">
						<button class="sc-button datatable-print-button" @click="downloadCsv()">
							CSV
						</button>
						<button class="sc-button datatable-print-button" @click="downloadPdf()">
							PDF
						</button>
						<button
							class="sc-button datatable-print-button"
							type="button"
							data-uk-toggle="target: #addEditAppMaster"
							@click="clearData()"
						>
							{{ translate.add_app_master }}
						</button>
					</div>
				</div>
			</div>
		</client-only>
		<client-only>
			<div id="sc-page-content">
				<div id="addEditAppMaster"
					ref="m"
					class="uk-modal"
					data-uk-modal
					bg-close="false"
				>
					<div class="uk-modal-dialog">
						<button class="uk-modal-close-default" type="button" data-uk-close></button>
						<div class="uk-modal-header">
							<h2 class="uk-modal-title">
								{{ translate.add_edit_app }}
							</h2>
						</div>
						<div class="uk-modal-body">
							<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
								<div>
									<client-only>
										<label>{{ translate.app_code }}</label>
										<ScInput
											v-model="$v.appCode.$model"
											:validator="$v.appCode"
											:error-class="$v.appCode.$error"
											mode="outline"
											:placeholder="translate.app_code"
										></ScInput>
										<ul class="sc-vue-errors">
											<li v-if="!$v.appCode.required">
												{{ translate.app_code }}
											</li>
										</ul>
									</client-only>
								</div>
								<div>
									<client-only>
										<label>{{ translate.app_name }}</label>
										<ScInput
											v-model="$v.appName.$model"
											:validator="$v.appName"
											:error-class="$v.appName.$error"
											mode="outline"
											:placeholder="translate.app_name"
										></ScInput>
										<ul class="sc-vue-errors">
											<li v-if="!$v.appName.required">
												{{ translate.app_name }}
											</li>
										</ul>
									</client-only>
								</div>
							</div>

							<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
								<div>
									<client-only>
										<label>{{ translate.app_description }}</label>
										<ScInput
											v-model="$v.appDescription.$model"
											:validator="$v.appDescription"
											:error-class="$v.appDescription.$error"
											mode="outline"
											:placeholder="translate.app_description"
										></ScInput>
										<ul class="sc-vue-errors">
											<li v-if="!$v.appDescription.required">
												{{ translate.app_description }}
											</li>
										</ul>
									</client-only>
								</div>
								<div>
									<client-only>
										<label>{{ translate.app_url }}</label>
										<ScInput
											v-model="$v.appUrl.$model"
											:validator="$v.appUrl"
											:error-class="$v.appUrl.$error"
											mode="outline"
											:placeholder="translate.app_url"
										></ScInput>
										<ul class="sc-vue-errors">
											<li v-if="!$v.appUrl.required">
												{{ translate.app_url }}
											</li>
										</ul>
									</client-only>
								</div>
							</div>

							<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
								<div>
									<client-only>
										<label>{{ translate.app_seq }}</label>
										<ScInput
											v-model="appSeq"
											mode="outline"
											type="number"
											:disabled="newSeqAdd"
											:placeholder="translate.app_seq"
										></ScInput>
									</client-only>
								</div>
								<div>
									<client-only>
										<label>{{ translate.app_status }}</label>
										<br>
										<PrettyCheck
											v-model="appStatus"
											:validator="$v.appStatus"
											:error-class="$v.appStatus.$error"
											class="p-icon"
										>
											{{ translate.app_status }}
											<i slot="extra" class="icon mdi mdi-check"></i>
										</PrettyCheck>
										<ul class="sc-vue-errors">
											<li v-if="!$v.appStatus.required">
												{{ translate.app_status }}
											</li>
										</ul>
									</client-only>
								</div>
							</div>

							<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
								<div>
									<label>
										{{ translate.menu_icon }} ::
										<i :class=" slectedAppIcon"></i>
									</label>
									<div class="icons_selections">
										<div class="uk-child-width-auto uk-flex uk-flex-wrap">
											<div v-for="icon in mdIcons" :key="icon.hex">
												<div
													v-show="icon.visible"
													class="uk-flex sc-js-mdi-code sc-el-clickable sc-el-hoverable sc-padding-medium uk-border-rounded"
													:title="icon.name"
													@click="onIconSelections('mdi mdi-'+icon.name)"
												>
													<i class="mdi" :class="'mdi-' + icon.name"></i>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="uk-modal-footer uk-margin-top uk-text-right">
								<button
									class="sc-button sc-button-flat sc-button-flat-danger uk-modal-close"
									type="button"
								>
									{{ translate.cancel }}
								</button>
								<button class="sc-button" type="button" @click="addOrEditApp">
									{{ translate.save }}
								</button>
							</div>
						</div>
					</div>
				</div>

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
										placeholder="Search Here"
										style="float: right !important;"
										@input="onInputSearch()"
									>
								</client-only>
								<client-only>
									<table id="appMaster" class="uk-table uk-table-striped">
										<thead>
											<tr>
												<th>{{ translate.app_code }}</th>
												<th>{{ translate.app_name }}</th>
												<th>{{ translate.app_description }}</th>
												<th>{{ translate.app_url }}</th>
												<th>{{ translate.app_seq }}</th>
												<th>{{ translate.app_status }}</th>
												<th>{{ translate.actions }}</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(row, index) in applist" :key="index">
												<td>{{ row.EvolveApp_Code }}</td>
												<td>{{ row.EvolveApp_Name }}</td>
												<td>{{ row.EvolveApp_Description }}</td>
												<td>{{ row.EvolveApp_Url }}</td>
												<td>{{ row.EvolveApp_SEQ }}</td>
												<td>{{ row.EvolveApp_Status }}</td>
												<td>
													<button
														title="Edit"
														class="sc-button sc-button-primary sc-button-mini waves-effect sc-button-mini waves-button waves-light"
														data-uk-toggle="target: #addEditAppMaster"
														@click="selectSingleApp(row.EvolveApp_ID)"
													>
														<i class="mdi mdi-square-edit-outline"></i>
													</button>
													<!-- <button
														title="Delete"
														class="sc-button sc-button-danger waves-effect sc-button-mini waves-button waves-light"
													>
														<i class="mdi mdi-delete"></i>
                          </button>-->
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
import customValidators from "~/plugins/vuelidateValidators";
import ScInput from "~/components/Input";
import ScTextarea from "~/components/Textarea";
import moment from "~/plugins/moment";
import PrettyCheck from "pretty-checkbox-vue/check";
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
		ScInput,
		// ScTextarea,
		Paginate,
		EvolvePDF: process.client
			? () => import("~/components/jspdf/evolvePDF")
			: null,
		PrettyCheck,
		// Select2: process.client ? () => import("~/components/Select2") : null,
	},
	mixins: [validationMixin],

	data () {
		return {
			translate: {
				app_master: "APP MASTER",
				add_app_master: "ADD APP MASTER",
				add_edit_app: "ADD / EDIT APP MASTER",
				app_code: "APP CODE",
				app_name: "APP NAME",
				app_description: "APP DESCRIPTION",
				app_url: "APP URL",
				app_seq: "APP SEQ",
				app_status: "APP STATUS",
				save: "SAVE",
				cancel: "CANCLE",
				actions: "ACTIONS",
				menu_icon: "APP ICON",
			},

			appId: "",
			appCode: "",
			appName: "",
			appDescription: "",
			appUrl: "",
			appSeq: null,
			appStatus: false,
			applist: [],
			slectedAppIcon: "mdi mdi-view-list",
			mdIconsSearch: "",
			mdIcons: [],
			newSeqAdd: true,

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
		clearInterval(this.ramUpdateInterval);
	},

	created: async function () {
		this.asyncData();
		this.removeModal();
		this.getAllAppList();
	},
	validations: {
		appCode: {
			required,
		},
		appName: {
			required,
		},
		appDescription: {
			required,
		},
		appUrl: {
			required,
		},

		appStatus: {
			required,
		},
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
			this.getAllAppList();
		},

		paginateClick: async function (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getAllAppList();
		},

		onInputSearch: function () {
			this.currentPage = 1;
			this.getAllAppList();
			this.paginateClick(1);
		},

		downloadPdf: function () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("appMaster").outerHTML;
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
					title: "Evolve App Master",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveAppMaster",
				},
			};
		},

		downloadCsv: function () {
			let filename = "evolveAppMaster";
			let csv = [];
			let html = document.getElementById("appMaster").outerHTML;
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

		clearData: async function () {
			this.$v.$reset();
			this.appCode = "";
			this.appName = "";
			this.appDescription = "";
			this.appUrl = "";
			this.appStatus = false;
		},

		getAllAppList: async function () {
			let getAllAppList = await this.$axios
				.$post("/api/v1/evolve/AppMaster/getAllAppList", {
					displayRecord: this.displayRecord,
					startFrom: this.startFrom,
					search: this.search,
				})
				.catch((e) => {
					this.notification("danger", 3000, "Problem With Connecting Server!!");
				});
			if (getAllAppList.statusCode == 200) {
				this.applist = getAllAppList.result.records;
				if (getAllAppList.result.noOfRecord > 0) {
					this.pageCount = Math.ceil(
						getAllAppList.result.noOfRecord / this.displayRecord
					);
				} else {
					this.pageCount = 0;
				}
			} else {
				this.notification("danger", 3000, getAllAppList.message);
			}
		},

		selectSingleApp: async function (EvolveApp_ID) {
			this.newSeqAdd = false;
			let selectSingleApp = await this.$axios
				.$post("/api/v1/evolve/AppMaster/selectSingleApp", {
					EvolveApp_ID: EvolveApp_ID,
				})
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (selectSingleApp.statusCode == 200) {
				this.appId = selectSingleApp.result[0].EvolveApp_ID;
				this.appCode = selectSingleApp.result[0].EvolveApp_Code;
				this.appName = selectSingleApp.result[0].EvolveApp_Name;
				this.appDescription = selectSingleApp.result[0].EvolveApp_Description;
				this.appUrl = selectSingleApp.result[0].EvolveApp_Url;
				this.appSeq = selectSingleApp.result[0].EvolveApp_SEQ;
				this.appStatus = selectSingleApp.result[0].EvolveApp_Status;
				this.slectedAppIcon = selectSingleApp.result[0].EvolveApp_Icon;
			} else {
				this.notification("danger", 3000, selectSingleApp.message);
			}
		},

		addOrEditApp: async function () {
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.notification("danger", 3000, "Please Fill All Required Fileds");
			} else {
				if (this.appId == "") {
					let addNewApp = await this.$axios
						.$post("/api/v1/evolve/AppMaster/addNewApp", {
							EvolveApp_Code: this.appCode,
							EvolveApp_Name: this.appName,
							EvolveApp_Description: this.appDescription,
							EvolveApp_Url: this.appUrl,
							EvolveApp_SEQ: this.appSeq,
							EvolveApp_Status: this.appStatus,
							EvolveApp_Icon: this.slectedAppIcon,
						})
						.catch((e) => {
							this.notification(
								"danger",
								3000,
								"Problem With Connecting Server!!"
							);
						});
					if (addNewApp.statusCode == 200) {
						this.notification("success", 3000, "App Added Successfully!!");
						UIkit.modal("#addEditAppMaster").hide();
						this.getAllAppList();
					} else {
						this.notification("danger", 3000, "Error While Add App !!");
					}
				} else {
					let updateApp = await this.$axios
						.$post("/api/v1/evolve/AppMaster/updateApp", {
							EvolveApp_ID: this.appId,
							EvolveApp_Code: this.appCode,
							EvolveApp_Name: this.appName,
							EvolveApp_Description: this.appDescription,
							EvolveApp_Url: this.appUrl,
							EvolveApp_SEQ: this.appSeq,
							EvolveApp_Status: this.appStatus,
							EvolveApp_Icon: this.slectedAppIcon,
						})
						.catch((e) => {
							this.notification(
								"danger",
								3000,
								"Problem With Connecting Server!!"
							);
						});
					if (updateApp.statusCode == 200) {
						this.notification("success", 3000, "App Updated Successfully!!");
						UIkit.modal("#addEditAppMaster").hide();
						this.getAllAppList();
					} else {
						this.notification("danger", 3000, "Error While Update App !!");
					}
				}
			}
		},

		onIconSelections: async function (iconName) {
			this.slectedAppIcon = iconName;
		},

		asyncData: async function () {
			let data = require("~/assets/js/utils/mdIcons.js").default;
			//console.log("data :", data);
			this.mdIcons = data;
			return { mdIcons: data };
		},
	},
};
</script>

<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>