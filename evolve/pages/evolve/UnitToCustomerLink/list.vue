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
						{{ translate.unit_to_customer_link }}
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
							@click="addLink()"
						>
							{{ translate.add_link }}
						</button>
						<!-- <button id="edit_url" style="display:none;" @click="edit_SingleDocument()">
            </button>-->
					</div>
				</div>
			</div>
		</client-only>
		<div id="sc-page-content ">
			<div id="nav-mdi" class="uk-card">
				<div class="uk-card-body min-height-back">
					<!--  Creation And Edit Model Start -->
					<div id="AddEditUnitToCustomerLinkModal" class="uk-modal" data-uk-modal bg-close="false">
						<div class="uk-modal-dialog">
							<button class="uk-modal-close-default" type="button" data-uk-close></button>
							<div class="uk-modal-header">
								<h2 class="uk-modal-title">
									{{ translate.document }}
								</h2>
							</div>
							<div class="uk-modal-body">
								<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
									<div>
										<label>{{ translate.select_document }}</label>
										<client-only>
											<Select2
												v-model="$v.document.$model"
												:settings="{ 'width': '100%', 'placeholder' : translate.select_document, allowClear: true }"
												name="document"
												:error-class="$v.document.$error"
												:validator="$v.document"
											>
												<option key value>
													{{ translate.select_document }}
												</option>
												<option
													v-for=" dl in documentList"
													:key="dl.EvolveDocument_ID"
													:value="dl.EvolveDocument_ID"
												>
													{{ dl.EvolveDocument_Name }}
												</option>
											</Select2>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.document.required"
												class="li_error"
											>
												{{ translate.select_document }} {{ translate.is_required }} *
											</li>
										</ul>
									</div>
									<div>
										<label>{{ translate.select_unit }}</label>
										<client-only>
											<Select2
												v-model="$v.unit.$model"
												:settings="{ 'width': '100%', 'placeholder' : translate.select_unit, allowClear: true }"
												name="unit"
												:error-class="$v.unit.$error"
												:validator="$v.unit"
												@change="onClickUnit()"
											>
												<option key value>
													{{ translate.select_unit }}
												</option>
												<option
													v-for=" ul in unitList"
													:key="ul.EvolveUnit_ID"
													:value="ul.EvolveUnit_ID"
												>
													{{ ul.EvolveUnit_Name }}
												</option>
											</Select2>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.unit.required"
												class="li_error"
											>
												{{ translate.select_unit }} {{ translate.is_required }} *
											</li>
										</ul>
									</div>
								</div>
								<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
									<div>
										<label>{{ translate.select_customer }}</label>
										<client-only>
											<Select2
												v-model="$v.customer.$model"
												:settings="{ 'width': '100%', 'placeholder' : translate.select_customer, allowClear: true }"
												name="customer"
												:error-class="$v.customer.$error"
												:validator="$v.customer"
												@change="onClickCustomer()"
											>
												<option key value>
													{{ translate.select_customer }}
												</option>
												<option
													v-for=" cl in customerList"
													:key="cl.EvolveSupplier_ID"
													:value="cl.EvolveSupplier_ID"
												>
													{{ cl.EvolveSupplier_Name }}
												</option>
											</Select2>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.customer.required"
												class="li_error"
											>
												{{ translate.select_customer }} {{ translate.is_required }} *
											</li>
										</ul>
									</div>
									<div>
										<label>{{ translate.status }}</label>
										<br>
										<PrettyCheck v-model="status" name="status" class="p-icon">
											<i slot="extra" class="icon mdi mdi-check"></i>
										</PrettyCheck>
									</div>
								</div>
								<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
									<div>
										<client-only>
											<label>{{ translate.from_email }}</label>
											<ScInput
												v-model="$v.fromEmail.$model"
												name="fromEmail"
												mode="outline"
												placeholder="Enter Email ID"
												:error-class="$v.fromEmail.$error"
												:validator="$v.fromEmail"
												@blur="chackSameEmailID()"
											></ScInput>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.fromEmail.required"
												class="li_error"
											>
												{{ translate.from_email }} {{ translate.is_required }}*
											</li>
										</ul>
									</div>
									<div>
										<client-only>
											<label>{{ translate.to_email }}</label>
											<ScInput
												v-model="$v.toEmail.$model"
												name="toEmail"
												mode="outline"
												placeholder="Enter Email ID"
												:error-class="$v.toEmail.$error"
												:validator="$v.toEmail"
												@blur="chackSameEmailID()"
											></ScInput>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.toEmail.required"
												class="li_error"
											>
												{{ translate.to_email }} {{ translate.is_required }}*
											</li>
										</ul>
									</div>
								</div>
								<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
									<div>
										<client-only>
											<label>
												{{ translate.email_cc }}
												<span style="color:red">Note: Comma (,) Seprated Value</span>
											</label>
											<ScInput
												v-model="$v.ccEmail.$model"
												name="ccEmail"
												mode="outline"
												placeholder="Enter Email ID"
												:error-class="$v.ccEmail.$error"
												:validator="$v.ccEmail"
											></ScInput>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.ccEmail.required"
												class="li_error"
											>
												{{ translate.email_cc }} {{ translate.is_required }}*
											</li>
										</ul>
									</div>
									<div>
										<client-only>
											<label>{{ translate.email_subject }}</label>
											<ScInput
												v-model="$v.emailSubject.$model"
												name="emailSubject"
												mode="outline"
												placeholder="Enter Email ID"
												:error-class="$v.emailSubject.$error"
												:validator="$v.emailSubject"
											></ScInput>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.emailSubject.required"
												class="li_error"
											>
												{{ translate.email_subject }} {{ translate.is_required }}*
											</li>
										</ul>
									</div>
								</div>
								<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
									<div>
										<client-only>
											<label>{{ translate.email_body }}</label>
											<ScTextarea
												v-model="emailBody"
												mode="outline"
												placeholder="Please Enter Email Description "
												name="emailBody"
												:rows="2"
											></ScTextarea>
										</client-only>
									</div>
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
										placeholder="Search Here"
										style="float: right !important;"
										@input="onInputSearch()"
									>
								</client-only>
								<client-only>
									<table id="evolveUnitToCustomerLinkMaster" class="uk-table uk-table-striped">
										<thead>
											<tr>
												<th>{{ translate.documents }}</th>
												<th>{{ translate.unit }}</th>
												<th>{{ translate.customer }}</th>
												<th>{{ translate.from_email }}</th>
												<th>{{ translate.to_email }}</th>
												<th>{{ translate.email_subject }}</th>
												<th>{{ translate.status }}</th>
												<th>{{ translate.options }}</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(ucl,index) in unitToCustomerLinkList" :key="index">
												<td>{{ ucl.EvolveDocument_Name }}</td>
												<td>{{ ucl.EvolveUnit_Name }}</td>
												<td>{{ ucl.EvolveSupplier_Name }}</td>
												<td>{{ ucl.EvolveUnitToCustomerLink_FromEmail_ID }}</td>
												<td>{{ ucl.EvolveUnitToCustomerLink_ToEmail_ID }}</td>
												<td>{{ ucl.EvolveUnitToCustomerLink_EmailSubject }}</td>
												<td>{{ getUnitToCustomerLinkStatus(ucl.EvolveUnitToCustomerLink_Status) }}</td>

												<td>
													<button
														title="Edit"
														class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
														@click="edit_SingleLink(ucl.EvolveUnitToCustomerLink_ID)"
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
		Paginate,
		ScTextarea,
		EvolvePDF: process.client
			? () => import("~/components/jspdf/evolvePDF")
			: null,
	},
	mixins: [validationMixin],
	data () {
		return {
			translate: {
				unit_to_customer_link: "Unit To Customer Link",
				documents: "Documents",
				add_link: "Add Link",
				select_document: "Select Document",
				document: "Document",
				select_unit: "Select Unit",
				unit: "Unit",
				select_customer: "Select Customer",
				customer: "Customer",
				from_email: "From Email",
				to_email: "To Email",
				email_cc: "Email CC",
				email_subject: "Email Subject",
				email_body: "Email Body {{ DATE}}",

				email: "Email",
				email_is_required: "Email Is Required",
				email_cc: "Email CC",
				cancel: "Cancel",
				save: "Save",
				template: "Template",
				status: "Status",
				create_date: "Create Date",
				options: "Options",
				is_required: "Is Required",

				customer_qrCode: "Cust QR Code",
				irn_required: "IRN Required",
				irn_qr_code: "IRN QR Code",
			},
			dateRange: "",
			userId: this.$store.state.auth.user.EvolveUser_ID,
			token: this.$auth.getToken("local"),
			deleteApi: "/api/v1/evolve/deleteItem",
			baseURL: this.$axios.defaults.baseURL,
			/** Start : EvolveDataTable */
			search: "", // For making dynamic search
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1, 2, 3, 4, 5, 6],
			pdfExportColums: [0, 1, 2, 3, 4, 5, 6],
			/** End : EvolveDataTable */

			linkID: "",
			document: "",
			unit: "",
			customer: "",
			status: true,
			fromEmail: "",
			toEmail: "",
			ccEmail: "",
			emailSubject: "",
			emailBody: "",

			documentList: [],
			unitList: [],
			customerList: [],
			unitToCustomerLinkList: [],
		};
	},
	computed: {},
	beforeDestroy () {
		clearInterval(this.ramUpdateInterval);
	},
	created: async function () {
		this.removeModal();
		this.getDocumentList();
		this.getUnitList();
		this.getCustomerList();
		this.getUnitToCustomerLinkList();
	},
	validations: {
		document: {
			required,
		},
		unit: {
			required,
		},
		customer: {
			required,
		},
		fromEmail: {
			required,
			email,
		},
		toEmail: {
			required,
		},
		ccEmail: {
			required,
		},
		emailSubject: {
			required,
		},
		emailBody: {
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
		async notification (type = "danger", timeout = 3000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},

		removeModal: async function (e) {
			$(".uk-modal").remove(); // Remove Old Model From DOM
		},
		// defult evolve functions end
		/* Datatable Methods -- Start */
		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getUnitToCustomerLinkList();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getUnitToCustomerLinkList();
		},
		async downloadPdf () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolveUnitToCustomerLinkMaster")
				.outerHTML;
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
					title: "Evolve Unit To Customer Link Master",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveUnitToCustomerLinkMaster",
				},
			};
		},
		async downloadCsv () {
			let filename = "evolveUnitToCustomerLinkMaster";
			let csv = [];
			let html = document.getElementById("evolveUnitToCustomerLinkMaster")
				.outerHTML;
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
		getUnitToCustomerLinkList: async function () {
			let list = await this.$axios
				.$post("/api/v1/evolve/unitToCustomerLink/getUnitToCustomerLinkList", {
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
					this.unitToCustomerLinkList = list.result.records;
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
			this.getUnitToCustomerLinkList();
			this.paginateClick(1);
		},
		getDocumentList: async function () {
			let responce = await this.$axios.$get(
				"/api/v1/evolve/unitToCustomerLink/getDocumentList",
				{}
			);
			if (responce) {
				if (responce.statusCode == 200) {
					this.documentList = responce.result;
					console.log("this.documentList", this.documentList);
				} else {
					this.notification("danger", 3000, response.message);
				}
			}
		},
		getUnitList: async function () {
			let responce = await this.$axios.$get(
				"/api/v1/evolve/unitToCustomerLink/getUnitList",
				{}
			);
			if (responce) {
				if (responce.statusCode == 200) {
					this.unitList = responce.result;
				} else {
					this.notification("danger", 3000, response.message);
				}
			}
		},
		getCustomerList: async function () {
			let responce = await this.$axios.$get(
				"/api/v1/evolve/unitToCustomerLink/getCustomerList",
				{}
			);
			if (responce) {
				if (responce.statusCode == 200) {
					this.customerList = responce.result;
				} else {
					this.notification("danger", 3000, response.message);
				}
			}
		},
		onClickUnit: async function () {
			if (this.unit != "") {
				let error = true;
				for (let i = 0; i < this.unitList.length; i++) {
					if (this.unitList[i].EvolveUnit_ID == parseInt(this.unit)) {
						if (
							this.unitList[i].EvolveUnit_Email != "null" &&
              this.unitList[i].EvolveUnit_Email != null &&
              this.unitList[i].EvolveUnit_Email != ""
						) {
							this.fromEmail = this.unitList[i].EvolveUnit_Email;
							error = false;
							console.log("from Email", this.fromEmail);
						}
					}
				}
				if (error == true) {
					this.notification("danger", 3000, "Unit Email ID Not Found");
					this.fromEmail = "";
				}
			} else {
				this.notification("danger", 3000, "Please select Unit");
				this.fromEmail = "";
			}
			this.checkDuplicate();
		},
		onClickCustomer: async function () {
			if (this.customer != "") {
				let error = true;
				for (let i = 0; i < this.customerList.length; i++) {
					if (
						this.customerList[i].EvolveSupplier_ID == parseInt(this.customer)
					) {
						if (
							this.customerList[i].EvolveSupplier_Email != "null" &&
              this.customerList[i].EvolveSupplier_Email != null &&
              this.customerList[i].EvolveSupplier_Email != ""
						) {
							console.log(
								"this.customerList[i].EvolveSupplier_Email",
								this.customerList[i].EvolveSupplier_Email
							);
							this.toEmail = this.customerList[i].EvolveSupplier_Email;
							error = false;
							console.log("toEmail", this.toEmail);
						}
					}
				}
				if (error == true) {
					this.notification("danger", 3000, "Customer Email ID Not Found");
					this.toEmail = "";
				}
			} else {
				this.notification("danger", 3000, "Please select Customer");
				this.toEmail = "";
			}
			this.checkDuplicate();
		},
		addLink: async function () {
			this.$v.$reset();
			this.linkID = "";
			this.document = "";
			this.unit = "";
			this.customer = "";
			this.fromEmail = "";
			this.toEmail = "";
			this.ccEmail = "";
			this.emailSubject = "";
			this.emailBody = "";
			this.status = true;
			UIkit.modal("#AddEditUnitToCustomerLinkModal").show();
		},
		addUpdate: async function (e) {
			e.preventDefault();
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.notification("danger", 3000, "Please Fill All Required Fileds");
			} else {
				if (this.linkID == "") {
					let response = await this.$axios
						.$post("/api/v1/evolve/unitToCustomerLink/addUnitToCustomerLink", {
							EvolveDocument_ID: this.document,
							EvolveUnit_ID: this.unit,
							EvolveSupplier_ID: this.customer,
							EvolveUnitToCustomerLink_FromEmail_ID: this.fromEmail,
							EvolveUnitToCustomerLink_ToEmail_ID: this.toEmail,
							EvolveUnitToCustomerLink_CCEmail_IDS: this.ccEmail,
							EvolveUnitToCustomerLink_EmailSubject: this.emailSubject,
							EvolveUnitToCustomerLink_EmailBody: this.emailBody,
							EvolveUnitToCustomerLink_Status: this.status,
						})
						.catch((e) => {});
					if (response.statusCode == 200) {
						UIkit.modal("#AddEditUnitToCustomerLinkModal").hide();
						this.notification("success", 3000, response.message);
						this.getUnitToCustomerLinkList();
					} else {
						this.notification("danger", 3000, response.message);
					}
				} else {
					let response = await this.$axios
						.$post(
							"/api/v1/evolve/unitToCustomerLink/updateUnitToCustomerLink",
							{
								EvolveUnitToCustomerLink_ID: this.linkID,
								EvolveDocument_ID: this.document,
								EvolveUnit_ID: this.unit,
								EvolveSupplier_ID: this.customer,
								EvolveUnitToCustomerLink_FromEmail_ID: this.fromEmail,
								EvolveUnitToCustomerLink_ToEmail_ID: this.toEmail,
								EvolveUnitToCustomerLink_CCEmail_IDS: this.ccEmail,
								EvolveUnitToCustomerLink_EmailSubject: this.emailSubject,
								EvolveUnitToCustomerLink_EmailBody: this.emailBody,
								EvolveUnitToCustomerLink_Status: this.status,
							}
						)
						.catch((e) => {});
					if (response.statusCode == 200) {
						UIkit.modal("#AddEditUnitToCustomerLinkModal").hide();
						this.notification("success", 3000, response.message);
						this.getUnitToCustomerLinkList();
					} else {
						this.notification("danger", 3000, response.message);
					}
				}
			}
		},
		edit_SingleLink: async function (id) {
			this.linkID = id;
			let responce = await this.$axios.$post(
				"/api/v1/evolve/unitToCustomerLink/getSingleUnitToCustomerLink",
				{ EvolveUnitToCustomerLink_ID: this.linkID }
			);
			if (responce) {
				if (responce.statusCode == 200) {
					this.document = responce.result[0].EvolveDocument_ID + "";
					this.unit = responce.result[0].EvolveUnit_ID + "";
					this.customer = responce.result[0].EvolveSupplier_ID + "";
					this.fromEmail =
            responce.result[0].EvolveUnitToCustomerLink_FromEmail_ID;
					this.toEmail = responce.result[0].EvolveUnitToCustomerLink_ToEmail_ID;
					this.ccEmail =
            responce.result[0].EvolveUnitToCustomerLink_CCEmail_IDS;
					this.emailSubject =
            responce.result[0].EvolveUnitToCustomerLink_EmailSubject;
					this.emailBody =
            responce.result[0].EvolveUnitToCustomerLink_EmailBody;
					this.status = responce.result[0].EvolveUnitToCustomerLink_Status;
					UIkit.modal("#AddEditUnitToCustomerLinkModal").show();
				} else {
					this.notification("danger", 3000, response.message);
				}
			}
		},
		checkDuplicate: async function () {
			if (this.document != "" && this.unit != "" && this.customer != "") {
				let responce = await this.$axios.$post(
					"/api/v1/evolve/unitToCustomerLink/checkDuplicate",
					{
						EvolveUnitToCustomerLink_ID: this.linkID,
						EvolveDocument_ID: this.document,
						EvolveUnit_ID: this.unit,
						EvolveSupplier_ID: this.customer,
					}
				);
				if (responce) {
					if (responce.statusCode == 200) {
					} else {
						this.notification("danger", 3000, responce.message);
						this.customer = "";
						this.toEmail = "";
					}
				}
			}
		},
		chackSameEmailID: async function () {
			if (this.fromEmail == this.toEmail) {
				this.toEmail = "";
				this.notification("danger", 3000, "Email ID Same Not Allow");
			}
		},
		createdDate (data) {
			let dt = new Date(data);
			let date = dt.getUTCDate();
			let month = parseInt(dt.getUTCMonth() + 1);
			let year = dt.getUTCFullYear();
			let createdAt = date + "/" + month + "/" + year; // + ' ' + hours + ':' + minutes ;
			return createdAt;
		},
		getUnitToCustomerLinkStatus (status) {
			if (status == true) {
				return "Active";
			} else {
				return "DeActive";
			}
		},
	},
};
</script>	
<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>
