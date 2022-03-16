<template>
	<div id="sc-page-wrapper" class="uk-flex uk-flex-column">
		<div
			id="sc-page-top-bar"
			class="sc-top-bar"
			data-uk-sticky="offset:48; show-on-up: true; animation: uk-animation-slide-top-medium"
		>
			<div class="sc-top-bar-content uk-flex uk-flex-1">
				<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
					{{ translate.uom_list }}
				</h1>
				<div class="sc-actions uk-margin-left">
					<div>
						<button class="sc-button datatable-print-button" @click="downloadSample()">
							<i class="mdi mdi-file-download"></i>
							Demo UOM Master
						</button>
					</div>
					<button class="sc-button datatable-print-button" @click="onFileUpload()">
						<i class="mdi mdi-file-upload"></i>
						{{ translate.upload_csv }}
					</button>
					<input
						id="uploadFile"
						ref="uploadFile"
						style="display:none;"
						dispay="none"
						type="file"
						accept=".csv"
						class="uk-input"
						multiple
						@change="onSelectFile()"
					>
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
						data-uk-toggle="target : #CreateOrEditUom"
						@click="clearData()"
					>
						{{ translate.add_uom }}
					</button>
				</div>
			</div>
		</div>
		<div id="sc-page-content ">
			<div id="nav-mdi" class="uk-card">
				<div class="uk-card-body min-height-back">
					<div>
						<div id="CreateOrEditUom"
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
											{{ translate.uom_details }}
										</h2>
									</div>
									<div class="uk-modal-body">
										<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
											<div>
												<label>{{ translate.uom_type }}</label>

												<Select2
													v-model="$v.uomType.$model"
													name="uomType"
													:settings="{ 'width': '100%', 'placeholder': translate.select_uom_type, allowClear: true }"
													:error-class="$v.uomType.$error"
													:validator="$v.uomType"
												>
													<option key value selected>
														{{ translate.select_uom_type }}
													</option>
													<option key="scale" value="Scale">
														{{ translate.scale }}
													</option>
													<option key="number" value="Number">
														{{ translate.number }}
													</option>
												</Select2>
												<ul class="sc-vue-errors">
													<li v-if="!$v.uomType.required">
														{{ translate.uom_type_is_required }}
													</li>
												</ul>
											</div>
										</div>
										<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
											<div>
												<label>{{ translate.uom }}</label>
												<ScInput
													v-model="$v.uom.$model"
													mode="outline"
													:placeholder="translate.enter_uom"
													name="uom"
													:error-class="$v.uom.$error"
													:validator="$v.uom"
												></ScInput>
												<ul class="sc-vue-errors">
													<li v-if="!$v.uom.required">
														{{ translate.uom_is_required }} *
													</li>
												</ul>
											</div>
										</div>
										<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
											<div>
												<label>{{ translate.uom_domain }}</label>
												<ScInput
													v-model="$v.uom_domain.$model"
													mode="outline"
													:placeholder="translate.enter_uom"
													name="uomDomain"
													:error-class="$v.uom_domain.$error"
													:validator="$v.uom_domain"
												></ScInput>
												<ul class="sc-vue-errors">
													<li
														v-if="!$v.uom_domain.required"
													>
														{{ translate.uom_domain_is_required }} *
													</li>
												</ul>
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
												@click="CreateOrUpdateRole($event)"
											>
												{{ translate.save }}
											</button>
										</div>
									</div>
								</form>
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
										:placeholder="translate.search_here"
										style="float: right !important;"
										@input="onInputSearch()"
									>
								</client-only>

								<table id="evolveUomMaster" class="uk-table uk-table-striped">
									<thead>
										<tr>
											<!-- <th>{{ translate.uom_type }}</th> -->
											<th>{{ translate.uom }}</th>
											<!-- <th>{{ translate.uom_domain }}</th> -->
											<th>{{ translate.options }}</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(ul,index) in uomList" :key="index">
											<!-- <td>{{ ul.EvolveUom_Type }}</td> -->
											<td>{{ ul.EvolveUom_Uom }}</td>
											<!-- <td>{{ ul.EvolveUom_Domain }}</td> -->
											<td>
												<button
													title="Edit"
													class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
													@click="getSingleUomData(ul.EvolveUom_ID)"
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

								<client-only>
									<EvolvePDF :reqdata="pdfData"></EvolvePDF>
								</client-only>

								<table id="sampleUOMData" style="display : none !important">
									<tr>
										<th>UM</th>
										<th>Alternate UM</th>
										<th>UM Conversion</th>
									</tr>
									<tr>
										<td>EA</td>
										<td>BX</td>
										<td>10</td>
									</tr>
								</table>
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
if (process.client) {
	var Paginate = require("vuejs-paginate");
}
//import ScTextarea from '~/components/Textarea'
export default {
	head () {
		return {
			title: "Evolve - " + this.$route.name,
		};
	},
	layout: "eDefaultV2",
	components: {
		ScInput,
		Select2: process.client ? () => import("~/components/Select2") : null,
		// DefaultDatatable: process.client ? () => import('~/components/datatables/DefaultDatatables') : null,
		Paginate,
		EvolvePDF: process.client
			? () => import("~/components/jspdf/evolvePDF")
			: null,
	},
	mixins: [validationMixin],
	data () {
		return {
			translate: {
				uom_domain_is_required: "Uom Domain Is Required",
				uom_domain: "Uom Domain",
				uom_list: "Uom List",
				add_uom: "Add Uom",
				uom_details: "Uom Details",
				uom_type: "Uom Type",
				select_uom_type: "Select Uom Type",
				scale: "Scale",
				number: "Number",
				uom_type_is_required: "Uom Type Is Required",
				uom: "Uom",
				uom_is_required: "Uom is required",
				cancel: "Cancel",
				save: "Save",
				uom_type: "Uom Type",
				options: "Options",
				csv: "CSV",
				pdf: "PDF",
				enter_uom: "Enter Uom",
				search_here: "Search Here",
				upload_csv: "UPLOAD CSV",
			},
			/** Start : EvolveDataTable */
			search: "", // For making dynamic search
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1],
			pdfExportColums: [0, 1],
			/** End : EvolveDataTable */

			ip: "",
			uomType: "",
			uom: "",
			uom_domain: "",
			uomId: null,
			uomList: [],
		};
	},
	computed: {},
	mounted () {
		this.$root.$on("onChangeLanguage", () => {
			console.log("Language Changed.....");
			this.translateLanguage();
		});
	},

	created () {
		this.removeModal();
		this.getUomList();
	},
	validations: {
		uomType: {
			required,
		},
		uom: {
			required,
		},
		uom_domain: {
			required,
		},
	},
	beforeMount () {
		this.translateLanguage();
	},
	methods: {
		// common functions for all pages
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
		//common function  end
		/* Datatable Methods -- Start */
		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getUomList();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getUomList();
		},

		async downloadPdf () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolveUomMaster").outerHTML;
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
					title: "Evolve Uom Master",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveUomMaster",
				},
			};
		},
		async downloadCsv () {
			let filename = "evolveUomMaster";
			let csv = [];
			let html = document.getElementById("evolveUomMaster").outerHTML;
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

		async clearData () {
			this.$v.$reset();
			this.uomType = "";
			this.uom = "";
			this.uomId = null;
			this.uom_domain = "";
		},
		async getUomList () {
			let list = await this.$axios
				.$post("/api/v1/evolve/uom/getAllUomList", {
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
					this.uomList = list.result.records;
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
			this.getUomList();
			this.paginateClick(1);
		},
		async CreateOrUpdateRole (e) {
			e.preventDefault();
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.notification("danger", 3000, "Please fill in the required fields");
			} else {
				if (this.uomId == null) {
					let uomDetails = {
						EvolveUom_Type: this.uomType,
						EvolveUom_Uom: this.uom,
						EvolveUom_Domain: this.uom_domain,
					};
					let createUom = await this.$axios.$post(
						"/api/v1/evolve/uom/createUom",
						uomDetails
					);
					if (createUom.statusCode != 200) {
						this.notification("danger", 3000, createUom.message);
					} else {
						this.notification("success", 3000, createUom.message);
						UIkit.modal("#CreateOrEditUom").hide();
						this.clearData();
						this.getUomList();
					}
				} else {
					let uomDetails = {
						EvolveUom_ID: parseInt(this.uomId),
						EvolveUom_Type: this.uomType,
						EvolveUom_Uom: this.uom,
						EvolveUom_Domain: this.uom_domain,
					};
					let updateUom = await this.$axios.$post(
						"/api/v1/evolve/uom/updateUom",
						uomDetails
					);
					if (updateUom.statusCode != 200) {
						this.notification("danger", 3000, updateUom.message);
					} else {
						this.notification("success", 3000, updateUom.message);
						UIkit.modal("#CreateOrEditUom").hide();
						this.clearData();
						this.getUomList();
					}
				}
			}
		},

		getSingleUomData: async function (id) {
			this.uomId = id;
			const uomData = await this.$axios.$post(
				"/api/v1/evolve/uom/selectSingleUom",
				{ EvolveUom_ID: this.uomId }
			);
			if (uomData) {
				if (uomData.statusCode == 200) {
					UIkit.modal("#CreateOrEditUom").show();
					this.uomType = uomData.result.EvolveUom_Type;
					this.uom = uomData.result.EvolveUom_Uom;
					this.uom_domain = uomData.result.EvolveUom_Domain;
				} else {
					this.notification("danger", 3000, uomData.message);
				}
			}
		},

		onFileUpload: async function () {
			document.getElementById("uploadFile").click(); //do something}
		},

		onSelectFile: async function () {
			let fileData = this.$refs.uploadFile.files[0];
			if (fileData != "" && fileData != undefined) {
				if (fileData.type == "application/vnd.ms-excel") {
					this.loaderShow();
					let formData = new FormData();
					formData.append("fileData", fileData);
					let config = { headers: { "Content-Type": "multipart/form-data" } };

					let fileUpload = await this.$axios
						.$post("/api/v1/evolve/uom/onUploadUomCsvFile", formData, config)
						.catch((e) => {
							this.notification(
								"danger",
								3000,
								"Problem with connecting to server!"
							);
						});
					if (fileUpload) {
						if (fileUpload.statusCode == 200) {
							this.notification("success", 3000, fileUpload.message);
							this.getUomList();
						} else {
							this.notification("danger", 3000, fileUpload.message);
							this.getUomList();
						}
					}
					this.loaderHide();
				} else {
					this.notification(
						"danger",
						3000,
						"Please Upload Only Valid CSV File"
					);
				}
			}
		},

		async downloadSample () {
			var csv = [];
			var rows = document.querySelectorAll("table#sampleUOMData tr");
			for (var i = 0; i < rows.length; i++) {
				var row = [];
				var cols = rows[i].querySelectorAll("td, th");
				for (var j = 0; j < cols.length; j++) {
					row.push(cols[j].innerText);
				}
				csv.push(row.join(","));
			}

			// Download CSV file
			downloadCSV(csv.join("\n"), "sampleUOMData.csv");
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
