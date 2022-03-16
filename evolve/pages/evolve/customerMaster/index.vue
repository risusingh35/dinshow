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
						{{ translate.customer_master }}
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
							@click="addCustomer()"
						>
							{{ translate.add_customer }}
						</button>
					</div>
				</div>
			</div>
		</client-only>
		<div id="sc-page-content ">
			<div id="nav-mdi" class="uk-card">
				<div class="uk-card-body min-height-back">
					<!--  Creation And Edit Model Start -->
					<div id="addEditDocumentStamp" class="uk-modal" data-uk-modal bg-close="false">
						<div class="uk-modal-dialog">
							<button class="uk-modal-close-default" type="button" data-uk-close></button>
							<div class="uk-modal-header">
								<h2 class="uk-modal-title">
									{{ translate.document_stamp }}
								</h2>
							</div>
							<div class="uk-modal-body">
								<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
									<div>
										<label>{{ translate.document_name }}</label>
										<client-only>
											<Select2
												v-model="$v.document.$model"
												:settings="{ 'width': '100%', 'placeholder' : translate.document_name, allowClear: true }"
												name="document"
												:error-class="$v.document.$error"
												:validator="$v.document"
											>
												<option key value>
													{{ translate.select_document_type }}
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
												{{ translate.document_name }} {{ translate.is_required }}
											</li>
										</ul>
									</div>
									<div>
										<label>{{ translate.document_stamp_code }}</label>
										<client-only>
											<ScInput
												v-model="$v.stampCode.$model"
												name="stampCode"
												mode="outline"
												:placeholder="translate.document_stamp_code"
												:error-class="$v.stampCode.$error"
												:validator="$v.stampCode"
												@blur="CheckDocumentStampingCode()"
											></ScInput>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.stampCode.required"
												class="li_error"
											>
												{{ translate.document_stamp_code }} {{ translate.is_required }}
											</li>
										</ul>
									</div>
								</div>

								<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
									<div>
										<label>{{ translate.start_x }}</label>
										<client-only>
											<ScInput
												v-model="$v.startX.$model"
												name="startX"
												mode="outline"
												:placeholder="translate.start_x"
												:error-class="$v.startX.$error"
												:validator="$v.startX"
												type="number"
											></ScInput>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.startX.required"
												class="li_error"
											>
												{{ translate.start_x }} {{ translate.is_required }}
											</li>
										</ul>
									</div>
									<div>
										<label>{{ translate.start_y }}</label>
										<client-only>
											<ScInput
												v-model="$v.startY.$model"
												name="startY"
												mode="outline"
												:placeholder="translate.start_y"
												:error-class="$v.startY.$error"
												:validator="$v.startY"
												type="number"
											></ScInput>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.startY.required"
												class="li_error"
											>
												{{ translate.start_y }} {{ translate.is_required }}
											</li>
										</ul>
									</div>
								</div>
								<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
									<div>
										<label>{{ translate.end_x }}</label>
										<client-only>
											<ScInput
												v-model="$v.endX.$model"
												name="endX"
												mode="outline"
												:placeholder="translate.end_x"
												:error-class="$v.endX.$error"
												:validator="$v.endX"
												type="number"
											></ScInput>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.startX.required"
												class="li_error"
											>
												{{ translate.end_x }} {{ translate.is_required }}
											</li>
										</ul>
									</div>
									<div>
										<label>{{ translate.end_y }}</label>
										<client-only>
											<ScInput
												v-model="$v.endY.$model"
												name="endY"
												mode="outline"
												:placeholder="translate.end_y"
												:error-class="$v.endY.$error"
												:validator="$v.endY"
												type="number"
											></ScInput>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.endY.required"
												class="li_error"
											>
												{{ translate.end_y }} {{ translate.is_required }}
											</li>
										</ul>
									</div>
								</div>
								<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
									<div>
										<PrettyCheck
											v-model="status"
											class="p-switch button-margin-top"
											color="primary"
										>
											{{ translate.status }}
										</PrettyCheck>
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
					<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
						<div>
							<input
								id="csvFile"
								ref="csvFile"
								type="file"
								accept=".csv"
								class="uk-input"
								style="width: 203px;"
								@change="handleFileUpload()"
							>
							<button
								class="sc-button sc-button-primary waves-button waves-light"
								type="button"
								@click="uploadFile()"
							>
								{{ translate.upload_customers }}
							</button>
						</div>
						<div>
							<button
								style="float: right;"
								class="sc-button sc-button-primary waves-button waves-light"
								type="button"
								@click="downloadSample()"
							>
								{{ translate.download_sample }}
							</button>
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
										@input="getCustomerList()"
									>
								</client-only>
								<client-only>
									<table id="evolveCustomerMaster" class="uk-table uk-table-striped">
										<thead>
											<tr>
												<th>{{ translate.customer_name }}</th>
												<th>{{ translate.code }}</th>
												<th>{{ translate.address }}</th>
												<th>{{ translate.city }}</th>
												<th>{{ translate.state }}</th>
												<th>{{ translate.country }}</th>
												<th>{{ translate.zip }}</th>
												<th>{{ translate.email }}</th>
												<th>{{ translate.gstin }}</th>
												<th>{{ translate.contact_person }}</th>
												<th>{{ translate.contact_number }}</th>
												<th>{{ translate.print_type }}</th>
												<!-- <th>{{ translate.options }}</th> -->
											</tr>
										</thead>
										<tbody>
											<tr v-for="(doc,index) in customerList" :key="index">
												<td>{{ doc.EvolveSupplier_Name }}</td>
												<td>{{ doc.EvolveSupplier_Code }}</td>
												<td>{{ doc.EvolveSupplier_Address }}</td>
												<td>{{ doc.EvolveSupplier_City }}</td>
												<td>{{ doc.EvolveSupplier_State }}</td>
												<td>{{ doc.EvolveSupplier_Country }}</td>
												<td>{{ doc.EvolveSupplier_Zip }}</td>
												<td>{{ doc.EvolveSupplier_Email }}</td>
												<td>{{ doc.EvolveSupplier_Gstin }}</td>
												<td>{{ doc.EvolveSupplier_ContactPerson }}</td>
												<td>{{ doc.EvolveSupplier_Phone }}</td>
												<td>{{ doc.EvolveSupplier_PrintType }}</td>
												<!-- <td>
													<button title="Edit" class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light" @click="editSingleDocumentStamping(doc.EvolveSupplier_ID)">
														<i class="mdi mdi-square-edit-outline"></i>
													</button>
                        </td>-->
											</tr>
										</tbody>
									</table>

									<div class="paginate">
										<Paginate
											:page-count="pageCount"
											:click-handler="paginateClick"
											:prev-text="'<'"
											:next-text="'>'"
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
					<table id="sampleCustData" style="display : none !important">
						<tr>
							<th>{{ translate.customer_name }}</th>
							<th>{{ translate.code }}</th>
							<th>{{ translate.address }}</th>
							<th>{{ translate.city }}</th>
							<th>{{ translate.state }}</th>
							<th>{{ translate.country }}</th>
							<th>{{ translate.zip }}</th>
							<th>{{ translate.email }}</th>
							<th>{{ translate.gstin }}</th>
							<th>{{ translate.contact_person }}</th>
							<th>{{ translate.contact_number }}</th>
							<th>{{ translate.print_type }}</th>
						</tr>
						<tr>
							<td>{{ translate.aliter_solutions }}</td>
							<td>{{ translate.alimum }}</td>
							<td>{{ translate.malad_west }}</td>
							<td>{{ translate.mumbai }}</td>
							<td>{{ translate.maharastra }}</td>
							<td>{{ translate.india }}</td>
							<td>400064</td>
							<td>vijay@alitersolutions.com</td>
							<td>GST123456789</td>
							<td>{{ translate.vijay_sabarwal }}</td>
							<td>8879389324</td>
							<td>NMRP</td>
						</tr>
					</table>
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
		// ScTextarea,
		EvolvePDF: process.client
			? () => import("~/components/jspdf/evolvePDF")
			: null,
	},
	mixins: [validationMixin],
	data () {
		return {
			translate: {
				india: "INDIA",
				customer_master: "Customer Master",
				add_customer: "Add Customer",
				download_sample: "Download Sample",
				csv_upload: " CSV Upload",
				upload_customers: "Upload Customers",
				customer_name: "Customer Name",
				code: "Code",
				address: "Address",
				city: "City",
				state: "State",
				country: "Country",
				zip: "Customer Zip",
				customer_contact_person: "Customer Contact Person",
				customer_contact_number: "Customer Contact Number",
				contact_person: "Contact Person",
				contact_number: "Contact Number",
				aliter_solutions: "Aliter Solutions",
				alimum: "ALIMUM",
				malad_west: "MALAD WEST",
				mumbai: "MUMBAI",
				maharastra: "MAHARASTRA",
				vijay_sabarwal: "Vijay Sabarwal",
				is_required: "Is Required",
				cancel: "Cancel",
				save: "Save",
				template: "Template",
				status: "Status",
				create_date: "Create Date",
				options: "Options",
				email: "Email",
				gstin: "GST IN",
				print_type: "Print Type",
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
			csvExportColums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
			pdfExportColums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
			/** End : EvolveDataTable */

			documentStampingList: [],
			documentList: [],
			stampingID: "",
			document: "",
			stampCode: "",
			startX: "",
			startY: "",
			endX: "",
			endY: "",
			status: true,

			//new

			customerList: [],
		};
	},
	computed: {},
	beforeDestroy () {
		clearInterval(this.ramUpdateInterval);
	},
	created: async function () {
		this.removeModal();
		this.getCustomerList();
	},
	validations: {
		document: {
			required,
		},
		stampCode: {
			required,
		},
		startX: {
			required,
		},
		startY: {
			required,
		},
		endX: {
			required,
		},
		endY: {
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
			this.getCustomerList();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getCustomerList();
		},

		async downloadPdf () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolveCustomerMaster").outerHTML;
			let rows = document.querySelectorAll("table#evolveCustomerMaster tr");
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
					title: "Evolve Customer Master",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveCustomerMaster",
				},
			};
		},
		async downloadCsv () {
			let filename = "evolveCustomerMaster";
			let csv = [];
			let html = document.getElementById("evolveCustomerMaster").outerHTML;
			let rows = document.querySelectorAll("table#evolveCustomerMaster tr");
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

		async getCustomerList () {
			let list = await this.$axios
				.$post("api/v1/evolve/customerMaster/getCustomerList", {
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
					this.customerList = list.result.records;
					if (list.result.noOfRecord > 0) {
						this.pageCount = Math.ceil(
							list.result.noOfRecord / this.displayRecord
						);
					}
				} else {
					this.notification("danger", 3000, list.message);
				}
			}
			console.log("list>>>>>>>>>>>>>>>>>>>>>>>>>>>", list);
		},

		addDocumentStamp: async function () {
			this.$v.$reset();
			this.stampingID = "";
			this.document = "";
			this.stampCode = "";
			this.startX = "";
			this.startY = "";
			this.endX = "";
			this.endY = "";
			this.status = true;
			UIkit.modal("#addEditDocumentStamp").show();
		},
		addUpdate: async function (e) {
			e.preventDefault();
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.notification("danger", 3000, "Please Fill All Required Fileds");
			} else {
				if (this.stampingID == "") {
					let response = await this.$axios
						.$post("/api/v1/evolve/documentStamping/addDocumentStamping", {
							EvolveDocument_ID: this.document,
							EvolveDocumentStamping_Code: this.stampCode,
							EvolveDocumentStamping_StartX: this.startX,
							EvolveDocumentStamping_StartY: this.startY,
							EvolveDocumentStamping_EndX: this.endX,
							EvolveDocumentStamping_EndY: this.endY,
							EvolveDocumentStamping_Status: this.status,
						})
						.catch((e) => {});
					if (response.statusCode == 200) {
						this.notification("success", 3000, response.message);
						this.getDocumentStampingList();
						UIkit.modal("#addEditDocumentStamp").hide();
					} else {
						this.notification("danger", 3000, response.message);
					}
				} else {
					let response = await this.$axios
						.$post("/api/v1/evolve/documentStamping/updateDocumentStamping", {
							EvolveDocumentStamping_ID: this.stampingID,
							EvolveDocument_ID: this.document,
							EvolveDocumentStamping_Code: this.stampCode,
							EvolveDocumentStamping_StartX: this.startX,
							EvolveDocumentStamping_StartY: this.startY,
							EvolveDocumentStamping_EndX: this.endX,
							EvolveDocumentStamping_EndY: this.endY,
							EvolveDocumentStamping_Status: this.status,
						})
						.catch((e) => {});
					if (response.statusCode == 200) {
						this.notification("success", 3000, response.message);
						this.getDocumentStampingList();
						UIkit.modal("#addEditDocumentStamp").hide();
					} else {
						this.notification("danger", 3000, response.message);
					}
				}
			}
		},
		editSingleDocumentStamping: async function (id) {
			this.stampingID = id;
			const responce = await this.$axios.$post(
				"/api/v1/evolve/documentStamping/getSingleDocumentStamping",
				{
					EvolveDocumentStamping_ID: this.stampingID,
				}
			);
			if (responce) {
				if (responce.statusCode == 200) {
					this.document = responce.result[0].EvolveDocument_ID + "";
					this.stampCode = responce.result[0].EvolveDocumentStamping_Code;
					this.startX = responce.result[0].EvolveDocumentStamping_StartX;
					this.startY = responce.result[0].EvolveDocumentStamping_StartY;
					this.endX = responce.result[0].EvolveDocumentStamping_EndX;
					this.endY = responce.result[0].EvolveDocumentStamping_EndY;
					this.status = responce.result[0].EvolveDocumentStamping_Status;
					UIkit.modal("#addEditDocumentStamp").show();
				} else {
					this.notification("danger", 3000, response.message);
				}
			}
		},
		async downloadSample () {
			var csv = [];
			var rows = document.querySelectorAll("table#sampleCustData tr");
			for (var i = 0; i < rows.length; i++) {
				var row = [];
				var cols = rows[i].querySelectorAll("td, th");
				for (var j = 0; j < cols.length; j++) {
					row.push(cols[j].innerText);
				}
				csv.push(row.join(","));
			}
			// Download CSV file
			downloadCSV(csv.join("\n"), "EvolveCustMaster.csv");
		},
		async handleFileUpload () {
			this.custCsv = this.$refs.csvFile.files[0];
		},
		async uploadFile () {
			// this.loaderShow();
			if (this.custCsv != "") {
				let formData = new FormData();
				formData.append("csvFile", this.custCsv);
				const config = { headers: { "Content-Type": "multipart/form-data" } };
				let csvUploadData = await this.$axios
					.$post(
						"/api/v1/evolve/customerMaster/uploadCustCsv",
						formData,
						config
					)
					.catch((e) => {
						this.notification(
							"danger",
							3000,
							"Problem with connecting to server!"
						);
					});
				if (csvUploadData) {
					if (csvUploadData.statusCode == 200) {
						this.notification("success", 3000, "Customer(s) Uploaded");
						this.getCustomerList();
					} else {
						this.notification("danger", 3000, csvUploadData.message);
					}
				}
			} else {
				this.notification("danger", 3000, "File Must Required!");
			}
			// this.loaderHide();
		},
	},
};
function downloadCSV (csv, filename) {
	var csvFile;
	var downloadLink;

	// CSV file
	csvFile = new Blob([csv], { type: "text/csv" });

	// Download link
	downloadLink = document.createElement("a");

	// File name
	downloadLink.download = filename;

	// Create a link to the file
	downloadLink.href = window.URL.createObjectURL(csvFile);

	// Hide download link
	downloadLink.style.display = "none";

	// Add the link to DOM
	document.body.appendChild(downloadLink);

	// Click download link
	downloadLink.click();
}
</script>	
<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>
