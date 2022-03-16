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
						{{ translate.location_master }}
					</h1>
					<div class="sc-actions uk-margin-left">
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
							@click="addLocation()"
						>
							{{ translate.add_location }}
						</button>
					</div>
				</div>
			</div>
		</client-only>
		<div id="sc-page-content ">
			<div id="nav-mdi" class="uk-card">
				<div class="uk-card-body min-height-back">
					<div class="uk-child-width-1-5@m uk-grid" data-uk-grid>
						<div>
							<div class="uk-margin-top">
								<button
									class="sc-button sc-button-primary full-width"
									type="button"
									@click="downloadCsv()"
								>
									{{ translate.csv_demo_download }}
								</button>
							</div>
						</div>
						<div></div>
						<div></div>
						<div>
							<label>{{ translate.csv_upload }}</label>
							<input
								id="csvFile"
								ref="csvFile"
								type="file"
								accept=".csv"
								class="uk-input"
								@change="handleFileUpload()"
							>
						</div>
						<div>
							<div class="uk-margin-top">
								<button
									class="sc-button sc-button-primary full-width"
									type="button"
									@click="uploadFile()"
								>
									{{ translate.upload }}
								</button>
							</div>
						</div>
					</div>
					<!--  Creation And Edit Model Start -->
					<div id="addEditLocation" class="uk-modal" data-uk-modal bg-close="false">
						<div class="uk-modal-dialog">
							<button class="uk-modal-close-default" type="button" data-uk-close></button>
							<div class="uk-modal-header">
								<h2 class="uk-modal-title">
									{{ translate.location_master }}
								</h2>
							</div>
							<div class="uk-modal-body">
								<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
									<div>
										<label>{{ translate.location_name }}*</label>
										<client-only>
											<ScInput
												v-model="$v.locationName.$model"
												name="locationName"
												mode="outline"
												placeholder="Enter Location Name"
												:error-class="$v.locationName.$error"
												:validator="$v.locationName"
												:disabled="locationID ? true : false"
											></ScInput>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.locationName.required"
												class="li_error"
											>
												{{ translate.location_name_is_required }} *
											</li>
										</ul>
									</div>
									<div>
										<label>{{ translate.location_code }}*</label>
										<client-only>
											<ScInput
												v-model="$v.locationCode.$model"
												name="locationCode"
												mode="outline"
												placeholder="Enter Location Code"
												:error-class="$v.locationCode.$error"
												:validator="$v.locationCode"
												:disabled="locationID ? true : false"
											></ScInput>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.locationCode.required"
												class="li_error"
											>
												{{ translate.location_code_is_required }} *
											</li>
										</ul>
									</div>
								</div>
								<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
									<div>
										<label>{{ translate.location_type }}*</label>
										<client-only>
											<Select2
												v-model="$v.locationType.$model"
												name="locationType"
												:error-class="$v.locationType.$error"
												:validator="$v.locationType"
												:settings="{ 'width': '100%', 'placeholder': 'Select Location Type'}"
												:disabled="locationID ? true : false"
											>
												<option key value selected>
													{{ translate.select_location_type }}
												</option>
												<option key="I" value="I">
													Internal
												</option>
												<option key="E" value="E">
													External
												</option>
											</Select2>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.locationType.required"
												class="li_error"
											>
												{{ translate.location_type_is_required }}*
											</li>
										</ul>
									</div>
									<div>
										<label>{{ translate.location_group }}*</label>
										<client-only>
											<Select2
												v-model="$v.locationGroupID.$model"
												name="locationGroupID"
												:error-class="$v.locationGroupID.$error"
												:validator="$v.locationGroupID"
												:settings="{ 'width': '100%', 'placeholder': 'Select Location Group'}"
												:disabled="locationID ? true : false"
											>
												<option key value selected>
													{{ translate.select_location_group }}
												</option>
												<option
													v-for="lgl in locationGroupList"
													:key="lgl.EvolveLocationGroup_ID"
													:value="lgl.EvolveLocationGroup_ID"
												>
													{{ lgl.EvolveLocationGroup_Name }}
												</option>
											</Select2>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.locationGroupID.required"
												class="li_error"
											>
												{{ translate.location_group_is_required }}*
											</li>
										</ul>
									</div>
								</div>
								<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
									<div>
										<label>{{ translate.location_description }}</label>
										<client-only>
											<ScTextarea
												v-model="$v.locationDesc.$model"
												name="locationDesc"
												mode="outline"
												:rows="2"
												placeholder="Enter Location Description"
												:error-class="$v.locationDesc.$error"
												:validator="$v.locationDesc"
												:disabled="locationID ? true : false"
											></ScTextarea>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.locationDesc.required"
												class="li_error"
											>
												{{ translate.location_description_is_required }} *
											</li>
										</ul>
									</div>
									<div>
										<label>{{ translate.location_address }}*</label>
										<client-only>
											<ScTextarea
												v-model="$v.locatonAddress.$model"
												name="locatonAddress"
												mode="outline"
												:rows="2"
												placeholder="Enter Location Address"
												:error-class="$v.locatonAddress.$error"
												:validator="$v.locatonAddress"
												:disabled="locationID ? true : false"
											></ScTextarea>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.locatonAddress.required"
												class="li_error"
											>
												{{ translate.location_address_is_required }}*
											</li>
										</ul>
									</div>
								</div>
								<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
									<div>
										<label>{{ translate.rule_availability }}</label>
										<br>
										<PrettyCheck
											v-model="ruleAvailable"
											class="p-icon"
											name="roleIsActive"
											:disabled="locationID ? true : false"
										>
											<i slot="extra" class="icon mdi mdi-check"></i>
											{{ translate.available }}
										</PrettyCheck>
									</div>
									<div v-if="ruleAvailable==true">
										<label>{{ translate.select_rule }}</label>
										<Select2
											v-model="rule"
											:settings="{ 'width': '100%', allowClear: true }"
											name="active"
											:disabled="locationID ? true : false"
										>
											<option key value>
												{{ translate.select_rule }}
											</option>

											<option
												v-for="rl in ruleList"
												:key="rl.value"
												:value="rl.value"
											>
												{{ rl.value }}
											</option>
										</Select2>
									</div>
								</div>
								<!-- <div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
									<div>
										<label>Location Status*</label>
										<Select2
											v-model="$v.locationStatus.$model"
											:settings="{ 'width': '100%', allowClear: true }"
											name="active"
											:error-class="$v.locationStatus.$error"
											:validator="$v.locationStatus"
										>
											<option key value>
												Select Location Status
											</option>

											<option
												v-for="ls in statusList"
												:key="ls.value"
												:value="ls.value"
											>
												{{ ls.value }}
											</option>
										</Select2>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.locationStatus.required"
												class="li_error"
											>
												{{ translate.location_status_is_required }}*
											</li>
										</ul>
									</div>
                </div>-->
								<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
									<div>
										<label>{{ translate.location_status_type }}*</label>
										<Select2
											v-model="$v.locationStatusType.$model"
											:settings="{ 'width': '100%', allowClear: true ,'placeholder': translate.select_location_status_type}"
											name="active"
											:error-class="$v.locationStatusType.$error"
											:validator="$v.locationStatusType"
											@change="getStatusCodeList()"
										>
											<option key value selected></option>
											<option
												v-for="ls in statusCodeTypeList"
												:key="ls.EvolveStatusCodeMstr_Type"
												:value="ls.EvolveStatusCodeMstr_Type"
											>
												{{ ls.EvolveStatusCodeMstr_Type }}
											</option>
										</Select2>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.locationStatusType.required"
												class="li_error"
											>
												{{ translate.location_status_type_is_required }}
											</li>
										</ul>
									</div>
									<div>
										<label>{{ translate.location_status_code }}*</label>
										<Select2
											v-model="$v.locationStatusCode.$model"
											:settings="{ 'width': '100%', allowClear: true,'placeholder': translate.select_location_status_code }"
											name="active"
											:error-class="$v.locationStatusCode.$error"
											:validator="$v.locationStatusCode"
											:disabled="locationStatusType == '' || locationStatusType == null || locationStatusType == undefined"
										>
											<option key value selected></option>

											<option
												v-for="ls in statusCodeList"
												:key="ls.EvolveStatusCodeMstr_Id"
												:value="ls.EvolveStatusCodeMstr_Id"
											>
												{{ ls.EvolveStatusCodeMstr_Code }}
											</option>
										</Select2>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.locationStatusCode.required"
												class="li_error"
											>
												{{ translate.location_status_code_is_required }}
											</li>
										</ul>
									</div>
								</div>
								<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
									<div>
										<label>{{ translate.is_permanent }}</label>
										<client-only>
											<br>
											<PrettyCheck
												v-model="isPermanent"
												class="p-icon"
												name="isPermanent"
												:disabled="locationID ? true : false"
											>
												<i slot="extra" class="icon mdi mdi-check"></i>
												{{ translate.is_permanent }}
											</PrettyCheck>
										</client-only>
									</div>
									<div></div>
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
									@click="addUpdate($event)"
								>
									{{ translate.save }}
								</button>
							</div>
						</div>
					</div>
					<!--  Creation and Edit Model Finished  -->

					<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
						<div>
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
									<table id="evolveLocationMaster" class="uk-table uk-table-striped">
										<thead>
											<tr>
												<th>{{ translate.location_name }}</th>
												<!-- <th>{{ translate.group_name }}</th> -->
												<th>{{ translate.location_code }}</th>
												<!-- <th>{{ translate.location_type }}</th> -->
												<th>{{ translate.location_status }}</th>
												<th>{{ translate.is_permanent }}</th>
												<!-- <th>{{ translate.address }}</th> -->
												<!-- <th>{{ translate.create_date }}</th> -->
												<th>{{ translate.options }}</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(loc,index) in locationList" :key="index">
												<td>{{ loc.EvolveLocation_Name }}</td>
												<!-- <td>{{ loc.EvolveLocationGroup_Name }}</td> -->
												<td>{{ loc.EvolveLocation_Code }}</td>
												<!-- <td>
													<span v-if="loc.EvolveLocation_Type == 'I'">Internal</span>
													<span v-else>External</span>
                        </td>-->
												<td>{{ loc.EvolveStatusCodeMstr_Code }}</td>
												<td>{{ loc.EvolveLocation_IsPermanent }}</td>
												<!-- <td>{{ loc.EvolveLocation_Address }}</td>
                        <td>{{ getCreatedDate(loc.EvolveLocation_CreatedAt) }}</td>-->
												<td>
													<button
														title="Edit"
														class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
														@click="edit_SingleLocation(loc.EvolveLocation_ID)"
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
	var Paginate = require("vuejs-paginate");
}
require("~/plugins/jquery");
export default {
	head () {
		return {
			title: "evolve - " + this.$route.name,
		};
	},
	layout: "eDefaultV2",
	components: {
		ScInput,
		PrettyCheck,
		Select2: process.client ? () => import("~/components/Select2") : null,
		// Datatable: process.client ? () => import('~/components/datatables/DatatablesEvolve') : null,
		ScTextarea,
		Paginate,
		EvolvePDF: process.client
			? () => import("~/components/jspdf/evolvePDF")
			: null,
		// JsPdf: process.client ? () => import('~/components/jspdf/gstPdf') : null,
	},
	mixins: [validationMixin],
	data () {
		return {
			translate: {
				csv_demo_download: "CSV Demo Dowmload",
				csv_upload: "CSV Upload",
				upload: "Upload",
				is_permanent: "Is Permanent",
				add_location: "Add Location",
				location_master: "Location Master",
				location_name: "Location Name",
				location_name_is_required: "Location Name Is Required",
				location_code: "Location Code",
				location_code_is_required: "Location Code Is Required",
				location_type: "Location Type",
				select_location_type: "Select Location Type",
				location_type_is_required: "Location Type Is Required",
				location_group: "Location Group",
				select_location_group: "Select Location Group",
				location_group_is_required: "Location Group Is Required",
				location_description: "Location Description",
				location_description_is_required: "Location Description Is Required",
				location_address: "Location Address",
				location_address_is_required: "Location Address Is Required",
				cancel: "Cancel",
				save: "Save",
				location_name: "Location Name",
				group_name: "Group Name",
				location_code: "Location Code",
				location_type: "Location Type",
				address: "Address",
				create_date: "Create Date",
				options: "Options",
				location_status: "Location Status",
				location_status_is_required: "Location Status is Required",

				rule_availability: "Rule Availability",
				available: "Available",
				select_rule: "Select Rule",
				location_status_type: "Location Status type",
				select_location_status_type: "Select Location Status Type",
				location_status_type_is_required: "Location Status Type Is Required",
				location_status_code: "Location Status Code",
				select_location_status_code: "Select Location Status Code",
				location_status_code_is_required: "Location Status Code Is Required",
				search_here: "Search Here",
				csv: "CSV",
				pdf: "PDF",
			},
			dateRange: "",
			userId: this.$store.state.auth.user.EvolveUser_ID,
			token: this.$auth.getToken("local"),
			deleteApi: "/api/v1/evolve/deleteItem",
			baseURL: this.$axios.defaults.baseURL,
			/** Start : EvolveDataTable */
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1, 2, 3],
			pdfExportColums: [0, 1, 2, 3],
			/** End : EvolveDataTable */
			search: "", // For making dynamic search
			locationList: [],
			locationName: "",
			locationCode: "",
			locationDesc: "",
			locatonAddress: "",
			locationType: "",
			locationGroupID: "",
			locationGroupList: [],
			ruleAvailable: false,
			isPermanent: false,
			locationID: null,
			rule: "",
			locationStatusType: "",
			locationStatusCode: "",
			statusCodeTypeList: [],
			statusCodeList: [],
			// locationStatus: "",

			ruleList: [{ value: "ITEM" }, { value: "LOT" }, { value: "EXPIRY" }],
			statusList: [
				{ value: "GOOD" },
				{ value: "BAD" },
				{ value: "HOLD" },
				{ value: "OUTWORK" },
			],
			locationCsv: "",
		};
	},
	computed: {},
	beforeDestroy () {
		clearInterval(this.ramUpdateInterval);
	},
	created: async function () {
		this.removeModal();
		this.getLocationGroupList();
		this.getLocationList();
		this.getStatusCodeTypeList();
	},
	validations: {
		locationName: {
			required,
		},
		locationCode: {
			required,
		},
		locationDesc: {
			required,
		},
		locatonAddress: {
			required,
		},
		locationType: {
			required,
		},
		locationGroupID: {
			required,
		},
		locationStatusType: {
			required,
		},
		locationStatusCode: {
			required,
		},
		// locationStatus: {
		// 	required,
		// },
	},
	beforeMount () {
		this.translateLanguage();
	},
	mounted () {
		this.$root.$on("onChangeLanguage", () => {
			console.log("Language Changed.....");
			this.translateLanguage();
		});
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
		async notification (type = "danger", timeout = 3000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},
		// defult evolve functions end
		/* Datatable Methods -- Start */
		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getLocationList();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getLocationList();
		},

		async downloadPdf () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolveLocationMaster").outerHTML;
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
					title: "Evolve Location Master",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveLocationMaster",
				},
			};
		},
		async downloadCsv () {
			let filename = "evolveLocationMaster";
			let csv = [];
			let html = document.getElementById("evolveLocationMaster").outerHTML;
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
		async getLocationList () {
			let list = await this.$axios
				.$post("/api/v1/evolve/location/getLocationList", {
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
					this.locationList = list.result.records;
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
			this.getLocationList();
			this.paginateClick(1);
		},
		addLocation: async function () {
			this.$v.$reset();
			(this.locationName = ""),
			(this.locationCode = ""),
			(this.locationDesc = ""),
			(this.locatonAddress = ""),
			(this.locationType = ""),
			(this.locationGroupID = ""),
			(this.locationID = null),
			(this.ruleAvailable = false);
			this.rule = "";
			this.locationStatus = "";
			this.locationStatusType = "";
			this.locationStatusCode = "";
			this.statusCodeList = [];
			UIkit.modal("#addEditLocation").show();
		},
		addUpdate: async function (e) {
			e.preventDefault();
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.notification("danger", 3000, "Please Fill All Required Fileds");
			} else if (this.ruleAvailable == true && this.rule == "") {
				this.notification("danger", 3000, "Please select rule !");
			} else {
				if (this.ruleAvailable == false) {
					this.rule = "";
				}
				if (this.locationID == null) {
					console.log("add called>>>>>>>>>>>>>>>>>>>");
					let response = await this.$axios
						.$post("/api/v1/evolve/location/addLocation", {
							EvolveLocation_Name: this.locationName,
							EvolveLocation_Code: this.locationCode,
							EvolveLocation_Desc: this.locationDesc,
							EvolveLocation_Type: this.locationType,
							EvolveLocation_Address: this.locatonAddress,
							EvolveLocationGroup_ID: this.locationGroupID,
							EvolveLocation_Rule: this.rule,
							EvolveStatusCodeMstr_Id: parseInt(this.locationStatusCode),
							// EvolveLocation_Status: this.locationStatus,
						})
						.catch((e) => {});
					if (response.statusCode == 200) {
						this.notification("success", 3000, response.message);
						this.getLocationList();
						UIkit.modal("#addEditLocation").hide();
					} else {
						this.notification("danger", 3000, response.message);
					}
				} else {
					console.log("update called>>>>>>>>>>>>>>>>>>>.");
					let response = await this.$axios
						.$post("/api/v1/evolve/location/updateLocation", {
							EvolveLocation_ID: this.locationID,
							EvolveLocation_Name: this.locationName,
							EvolveLocation_Code: this.locationCode,
							EvolveLocation_Desc: this.locationDesc,
							EvolveLocation_Type: this.locationType,
							EvolveLocation_Address: this.locatonAddress,
							EvolveLocationGroup_ID: this.locationGroupID,
							EvolveLocation_Rule: this.rule,
							EvolveStatusCodeMstr_Id: parseInt(this.locationStatusCode),

							// EvolveLocation_Status: this.locationStatus,
						})
						.catch((e) => {});
					if (response.statusCode == 200) {
						this.notification("success", 3000, response.message);
						this.getLocationList();
						UIkit.modal("#addEditLocation").hide();
					} else {
						this.notification("danger", 3000, response.message);
					}
				}
			}
		},
		edit_SingleLocation: async function (id) {
			this.locationID = id;
			let responce = await this.$axios.$post(
				"/api/v1/evolve/location/getSingleLocation",
				{ EvolveLocation_ID: this.locationID }
			);
			if (responce) {
				if (responce.statusCode == 200) {
					UIkit.modal("#addEditLocation").show();
					if (responce.result[0].EvolveLocation_Rule == "NO RULE") {
						this.ruleAvailable = false;
					} else {
						this.ruleAvailable = true;
						this.rule = responce.result[0].EvolveLocation_Rule;
					}
					this.locationName = responce.result[0].EvolveLocation_Name + "";
					this.locationCode = responce.result[0].EvolveLocation_Code + "";
					this.locationDesc = responce.result[0].EvolveLocation_Desc + "";
					this.locationType = responce.result[0].EvolveLocation_Type + "";
					this.locatonAddress = responce.result[0].EvolveLocation_Address + "";
					this.locationGroupID = responce.result[0].EvolveLocationGroup_ID + "";
					this.locationStatusType =
            responce.result[0].EvolveStatusCodeMstr_Type + "";
					this.isPermanent = responce.result[0].EvolveLocation_IsPermanent;
					await this.getStatusCodeList();
					this.locationStatusCode =
            responce.result[0].EvolveStatusCodeMstr_Id + "";

					// this.locationStatus = responce.result[0].EvolveLocation_Status;
				} else {
					this.notification("danger", 3000, response.message);
				}
			}
		},

		getLocationGroupList: async function () {
			let list = await this.$axios
				.$get("/api/v1/evolve/location/getAllLocationGroup")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (list) {
				if (list.statusCode == 200) {
					this.locationGroupList = list.result;
				} else {
					this.notification("danger", 3000, list.message);
				}
			}
		},
		getCreatedDate (EvolveLocation_CreatedAt) {
			let dt = new Date(EvolveLocation_CreatedAt);
			let date = ("0" + dt.getDate()).slice(-2);
			let month = ("0" + parseInt(dt.getMonth() + 1)).slice(-2);
			let year = dt.getUTCFullYear();
			let createdAt = date + "/" + month + "/" + year; // + ' ' + hours + ':' + minutes ;
			return createdAt;
		},
		getStatusCodeTypeList: async function () {
			let list = await this.$axios
				.$post("/api/v1/evolve/location/getStatusCodeTypeList")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (list) {
				if (list.statusCode == 200) {
					this.statusCodeTypeList = list.result;
				} else {
					this.notification("danger", 3000, list.message);
				}
			}
		},
		getStatusCodeList: async function () {
			console.log("this.locationStatusType>>", this.locationStatusType);
			if (
				this.locationStatusType != "" &&
        this.locationStatusType != null &&
        this.locationStatusType != undefined
			) {
				let list = await this.$axios
					.$post("/api/v1/evolve/location/getStatusCodeList", {
						EvolveStatusCodeMstr_Type: this.locationStatusType,
					})
					.catch((e) => {
						this.notification(
							"danger",
							3000,
							"Problem with connecting to server!"
						);
					});
				console.log("list>> ", list);
				if (list) {
					if (list.statusCode == 200) {
						this.statusCodeList = list.result;
					} else {
						this.notification("danger", 3000, list.message);
					}
				}
			} else {
				console.log("entered in else part");
				this.statusCodeList = [];
			}
		},

		// CSV UPLOAD
		handleFileUpload: async function () {
			this.locationCsv = this.$refs.csvFile.files[0];
		},
		async uploadFile () {
			if (this.locationCsv != "") {
				this.loaderShow();
				let formData = new FormData();
				formData.append("csvFile", this.locationCsv);
				const config = { headers: { "Content-Type": "multipart/form-data" } };
				let csvUploadData = await this.$axios
					.$post("/api/v1/evolve/item/csvLocationsUpload", formData, config)
					.catch((e) => {
						this.notification(
							"danger",
							3000,
							"Problem with connecting to server!"
						);
					});
				if (csvUploadData) {
					if (csvUploadData.statusCode == 400) {
						this.notification("danger", 3000, csvUploadData.message);
						// this.getLocationList();
						this.loaderHide();
						// this.$refs.csvFile.files[0].value = "";
						// document.getElementById("csvFile").value = "";
						// this.locationCsv = "";
					} else {
						for (let i in csvUploadData.result) {
							if (csvUploadData.result[i].statusCode == 200) {
								this.notification(
									"success",
									10000,
									csvUploadData.result[i].message
								);
							} else {
								this.notification(
									"danger",
									10000,
									csvUploadData.result[i].message
								);
							}
						}
						this.getLocationList();
						this.loaderHide();
						this.$refs.csvFile.files[0].value = "";
						document.getElementById("csvFile").value = "";
						this.locationCsv = "";
					}
				}
			} else {
				this.notification("danger", 3000, "File Must Required!");
			}
		},
	},
};
</script>	
<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>
