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
						{{ translate.item_master }}
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
							type="button"
							data-uk-toggle="target : #addOrEditItem"
							@click="resetItemData()"
						>
							{{ translate.add_item }}
						</button>
					</div>
				</div>
			</div>
		</client-only>

		<div id="addOrEditItem"
			ref="m"
			class="uk-modal"
			data-uk-modal
			bg-close="false"
		>
			<div class="uk-modal-dialog">
				<button class="uk-modal-close-default" type="button" data-uk-close></button>
				<div class="uk-modal-header">
					<div
						id="sc-page-top-bar"
						class="sc-top-bar"
						data-uk-sticky="offset:48; show-on-up: true; animation: uk-animation-slide-top-medium"
					>
						<div class="sc-top-bar-content uk-flex uk-flex-1">
							<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
								{{ translate.add_edit_item }}
							</h1>
						</div>
					</div>
				</div>
				<div class="uk-modal-body">
					<div id="nav-mdi" class="uk-card">
						<div class="uk-card-body">
							<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
								<div>
									<label>{{ translate.item_name }}:</label>
									<client-only>
										<ScInput
											v-model="$v.itemName.$model"
											:validator="$v.itemName"
											:error-class="$v.itemName.$error"
											mode="outline"
											:placeholder="translate.item_name"
										></ScInput>
										<ul class="sc-vue-errors">
											<li v-if="!$v.itemName.required">
												{{ translate.item_name }}
											</li>
										</ul>
									</client-only>
								</div>

								<div>
									<label>{{ translate.item_code }}:</label>
									<client-only>
										<ScInput
											v-model="$v.itemCode.$model"
											:validator="$v.itemCode"
											:error-class="$v.itemCode.$error"
											mode="outline"
											:placeholder="translate.item_code"
										></ScInput>
										<ul class="sc-vue-errors">
											<li v-if="!$v.itemCode.required">
												{{ translate.item_code }}
											</li>
										</ul>
									</client-only>
								</div>
							</div>

							<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
								<div>
									<label>{{ translate.item_desc }}:</label>
									<client-only>
										<ScInput
											v-model="$v.itemDesc.$model"
											:validator="$v.itemDesc"
											:error-class="$v.itemDesc.$error"
											mode="outline"
											:placeholder="translate.enter_label_name"
										></ScInput>
										<ul class="sc-vue-errors">
											<li v-if="!$v.itemDesc.required">
												{{ translate.item_desc }}
											</li>
										</ul>
									</client-only>
								</div>
							</div>

							<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
								<div>
									<label>{{ translate.customer_item_code }}:</label>
									<client-only>
										<ScInput
											v-model="$v.customerItemCode.$model"
											:validator="$v.customerItemCode"
											:error-class="$v.customerItemCode.$error"
											mode="outline"
											:placeholder="translate.customer_item_code"
										></ScInput>
										<ul class="sc-vue-errors">
											<li v-if="!$v.customerItemCode.required">
												{{ translate.customer_item_code }}
											</li>
										</ul>
									</client-only>
								</div>
								<div>
									<label>{{ translate.select_unit }}:</label>
									<Select2
										v-model="$v.selectedUnit.$model"
										:validator="$v.selectedUnit"
										:error-class="$v.selectedUnit.$error"
										:settings="{
											width: '100%',
											placeholder: translate.select_unit,
											allowClear: true,
										}"
									>
										<option key value>
											{{ translate.select_unit }}
										</option>
										<option
											v-for="ul in unitList"
											:key="ul.EvolveUnit_ID"
											:value="ul.EvolveUnit_ID"
										>
											{{ ul.EvolveUnit_Code }}
										</option>
									</Select2>
									<ul class="sc-vue-errors">
										<li v-if="!$v.selectedUnit.required">
											{{ translate.select_unit }}
										</li>
									</ul>
								</div>
							</div>

							<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
								<div>
									<label>{{ translate.select_label_formate }}:</label>
									<Select2
										v-model="$v.selectedLabelFormate.$model"
										:validator="$v.selectedLabelFormate"
										:error-class="$v.selectedLabelFormate.$error"
										:settings="{
											width: '100%',
											placeholder: translate.select_label_formate,
											allowClear: true,
										}"
									>
										<option key value>
											{{ translate.select_label_formate }}
										</option>
										<option
											v-for="lfl in labelFormateList"
											:key="lfl.EvolveSticker_ID"
											:value="lfl.EvolveSticker_ID"
										>
											{{ lfl.EvolveSticker_Name }}
										</option>
									</Select2>
									<ul class="sc-vue-errors">
										<li
											v-if="!$v.selectedLabelFormate.required"
										>
											{{ translate.select_label_formate }}
										</li>
									</ul>
								</div>
								<div></div>
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
									@click="addOrEditItem()"
								>
									{{ translate.save }}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div id="sc-page-content ">
			<div id="nav-mdi" class="uk-card">
				<div class="uk-card-body min-height-back">
					<div class="uk-child-width-1-5@m uk-grid" data-uk-grid>
						<div></div>
						<div></div>
						<div>
							<div class="uk-margin-top">
								<button
									class="sc-button sc-button-primary full-width"
									type="button"
									@click="downloadSample()"
								>
									{{ translate.csv_demo_download }}
								</button>
							</div>
						</div>
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

					<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
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
								<table id="evolveItemMaster" class="uk-table uk-table-striped">
									<thead>
										<tr>
											<th>{{ translate.item_name }}</th>
											<th>{{ translate.item_code }}</th>
											<th>{{ translate.item_desc }}</th>
											<th>{{ translate.customer_item_no }}</th>
											<th>{{ translate.unit_code }}</th>
											<th>{{ translate.label_format }}</th>
											<th>{{ translate.actions }}</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(row,index) in itemList" :key="index">
											<td>{{ row.EvolveItem_Name }}</td>
											<td>{{ row.EvolveItem_Code }}</td>
											<td>{{ row.EvolveItem_Desc }}</td>
											<td>{{ row.EvolveCustItem_Code }}</td>
											<td>{{ row.EvolveUnit_Code }}</td>
											<td>{{ row.EvolveSticker_Name }}</td>
											<td>
												<button
													title="Edit"
													class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
													data-uk-toggle="target : #addOrEditItem"
													@click="selectSingleItem(index)"
												>
													<i class="mdi mdi-square-edit-outline"></i>
												</button>
												<button
													title="Delete"
													class="sc-button sc-button-danger waves-effect sc-button-mini waves-button waves-light"
													@click="deleteItem(row.EvolveItem_ID)"
												>
													<i class="mdi mdi-delete"></i>
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

					<table id="sampleItemData" style="display : none !important">
						<tr>
							<th>ITEM NAME</th>
							<th>ITEM CODE</th>
							<th>ADIENT ITEM DESCRIPTION</th>
							<th>UNIT CODE</th>
							<th>CUST ITEM CODE</th>
							<th>MODEL CODE</th>
							<th>MODEL NAME</th>
							<th>MODEL DESC</th>
							<th>MODEL SR PREFIX</th>
							<th>MODEL ON/OFF</th>
							<th>MODEL SR WIDTH</th>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</table>
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
if (process.client) {
	// // require(~/plugins/daterangepicker);
	require("~/plugins/flatpickr");
	// require('~/assets/js/vendor/jquery.quicksearch.js');
	var Paginate = require("vuejs-paginate");
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
		Paginate,
		EvolvePDF: process.client
			? () => import("~/components/jspdf/evolvePDF")
			: null,
		Select2: process.client ? () => import("~/components/Select2") : null,
	},

	mixins: [validationMixin],

	data () {
		return {
			translate: {
				item_master: "ITEM MASTER",
				csv: "CSV",
				pdf: "PDF",
				add_item: "ADD ITEM",
				add_edit_item: "ADD / EDIT ITEM",
				csv_demo_download: "CSV DEMO DOWNLOAD",
				csv_upload: "CSV UPLOAD",
				upload: "UPLOAD",
				item_name: "ADIENT PART NO",
				item_code: "ITEM CODE",
				item_desc: "ITEM DESC",
				customer_item_no: "CUSTOMER ITEM NO",
				unit_code: "UNIT CODE",
				label_format: "LABEL FORMAT",
				actions: "ACTIONS",
				select_label_formate: "SELECT LABLE FORMATE",
				customer_item_code: "CUSTOMER ITEM CODE",
				select_model: "SELECT MODEL",
				select_unit: "SELECT UNIT",
				cancel: "CANCLE",
				save: "SAVE",
			},

			itemId: null,
			itemList: [],
			selectedLabelFormate: "",
			labelFormateList: [],
			modelList: [],
			unitList: [],
			// selectedModel : "",
			selectedUnit: "",
			itemName: "",
			itemCode: "",
			itemDesc: "",
			customerItemCode: "",

			/** Start : EvolveDataTable */
			search: "", // For making dynamic search
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1, 2, 3, 4, 5],
			pdfExportColums: [0, 1, 2, 3, 4, 5],
			/** End : EvolveDataTable */

			itemCsv: "",
		};
	},
	computed: {},
	mounted () {
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
		this.getAllItemList();
		this.getLabelFormateList();
		this.getModelList();
		this.getUnitList();
	},
	beforeMount () {
		this.translateLanguage();
	},

	validations: {
		itemName: {
			required,
		},
		itemCode: {
			required,
		},
		itemDesc: {
			required,
		},
		customerItemCode: {
			required,
		},
		selectedUnit: {
			required,
		},
		selectedLabelFormate: {
			required,
		},
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
			this.getAllItemList();
		},

		paginateClick: async function (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getAllItemList();
		},

		onInputSearch: function () {
			this.currentPage = 1;
			this.getAllItemList();
			this.paginateClick(1);
		},

		downloadPdf: function () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolveItemMaster").outerHTML;
			let rows = document.querySelectorAll("#evolveItemMaster tr");
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
					title: "Evolve Item Master",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveItemMaster",
				},
			};
		},

		downloadCsv: function () {
			let filename = "evolveItemMaster";
			let csv = [];
			let html = document.getElementById("evolveItemMaster").outerHTML;
			let rows = document.querySelectorAll("#evolveItemMaster tr");
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

		async handleFileUpload () {
			this.itemCsv = this.$refs.csvFile.files[0];
		},

		async uploadFile () {
			if (this.itemCsv != "") {
				this.loaderShow();
				let formData = new FormData();
				formData.append("csvFile", this.itemCsv);
				const config = { headers: { "Content-Type": "multipart/form-data" } };
				let csvUploadData = await this.$axios
					.$post("/api/v1/evolve/itemv1/csvItemsUpload", formData, config)
					.catch((e) => {
						this.notification(
							"danger",
							3000,
							"Problem with connecting to server!"
						);
					});
				if (csvUploadData) {
					if (csvUploadData.statusCode == 200) {
						this.notification("success", 3000, csvUploadData.message);
						this.getAllItemList();
						this.loaderHide();
						this.$refs.csvFile.files[0].value = "";
						document.getElementById("csvFile").value = "";
						this.itemCsv = "";
					} else {
						if (Array.isArray(csvUploadData.message)) {
							for (let j = 0; j < csvUploadData.message.length; j++) {
								this.notification("danger", 3000, csvUploadData.message[j]);
							}
						} else {
							this.$refs.csvFile.files[0].value = "";
							document.getElementById("csvFile").value = "";
							this.itemCsv = "";
							this.notification("danger", 3000, csvUploadData.message);
						}
						this.loaderHide();
					}
				}
			} else {
				this.notification("danger", 3000, "File Must Required!");
			}
		},

		async downloadSample () {
			var csv = [];
			var rows = document.querySelectorAll("table#sampleItemData tr");
			for (var i = 0; i < rows.length; i++) {
				var row = [];
				var cols = rows[i].querySelectorAll("td, th");
				for (var j = 0; j < cols.length; j++) {
					row.push(cols[j].innerText);
				}
				csv.push(row.join(","));
			}

			// Download CSV file
			downloadCSV(csv.join("\n"), "EvolveItemMaster.csv");
		},

		getAllItemList: async function () {
			let getAllItemList = await this.$axios
				.$post("/api/v1/evolve/itemv1/getItemsList", {
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
			if (getAllItemList) {
				if (getAllItemList.statusCode == 200) {
					this.itemList = getAllItemList.result.records;

					if (getAllItemList.result.noOfRecord > 0) {
						this.pageCount = Math.ceil(
							getAllItemList.result.noOfRecord / this.displayRecord
						);
						if (this.currentPage > this.pageCount) {
							this.paginateClick(this.pageCount);
						}
					} else {
						this.pageCount = 0;
					}
				} else {
					this.notification("danger", 3000, getAllItemList.message);
				}
			}
		},

		getModelList: async function () {
			let getModelList = await this.$axios
				.$post("/api/v1/evolve/itemv1/getModelList")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});

			if (getModelList.statusCode == 200) {
				this.modelList = getModelList.result;
			} else {
				this.notification("danger", 3000, getModelList.message);
			}
		},

		getUnitList: async function () {
			let getUnitList = await this.$axios
				.$post("/api/v1/evolve/itemv1/getUnitList")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (getUnitList.statusCode == 200) {
				this.unitList = getUnitList.result;
			} else {
				this.notification("danger", 3000, getUnitList.message);
			}
		},

		getLabelFormateList: async function () {
			let getLabelFormateList = await this.$axios
				.$post("/api/v1/evolve/itemv1/getLabelFormateList")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (getLabelFormateList.statusCode == 200) {
				this.labelFormateList = getLabelFormateList.result;
			} else {
				this.notification("danger", 3000, getLabelFormateList.message);
			}
		},

		resetItemData: async function () {
			this.$v.$reset();
			(this.itemId = null), (this.selectedLabelFormate = "");
			this.selectedModel = "";
			this.selectedUnit = "";
			this.itemName = "";
			this.itemCode = "";
			this.itemDesc = "";
			this.customerItemCode = "";
		},

		selectSingleItem: async function (index) {
			this.itemName = this.itemList[index].EvolveItem_Name;
			this.itemCode = this.itemList[index].EvolveItem_Code;
			this.itemDesc = this.itemList[index].EvolveItem_Desc;
			this.customerItemCode = this.itemList[index].EvolveCustItem_Code;
			// this.selectedModel = this.itemList[index].EvolveModel_Name;
			this.selectedUnit = this.itemList[index].EvolveUnit_ID;
			this.selectedLabelFormate = this.itemList[index].EvolveSticker_ID;
			this.itemId = this.itemList[index].EvolveItem_ID;
		},

		addOrEditItem: async function () {
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.notification("danger", 3000, "Please Fill All Required Fileds");
			} else {
				if (this.itemId == null) {
					let addtItem = await this.$axios
						.$post("/api/v1/evolve/itemv1/addtItem", {
							EvolveItem_Name: this.itemName,
							EvolveItem_Code: this.itemCode,
							EvolveItem_Desc: this.itemDesc,
							EvolveCustItem_Code: this.customerItemCode,
							// EvolveModel_ID : this.selectedModel,
							EvolveUnit_ID: this.selectedUnit,
							EvolveSticker_ID: this.selectedLabelFormate,
						})
						.catch((e) => {
							this.notification(
								"danger",
								3000,
								"Problem with connecting to server!"
							);
						});
					if (addtItem.statusCode == 200) {
						this.notification("success", 3000, "Item Added Successfully");
						this.itemName = "";
						this.itemCode = "";
						this.itemDesc = "";
						this.customerItemCode = "";
						this.selectedUnit = "";
						this.selectedLabelFormate = "";
						UIkit.modal("#addOrEditItem").hide();
						this.getAllItemList();
					} else {
						this.notification("danger", 3000, addtItem.message);
					}
				} else {
					this.$v.$reset();
					let editItem = await this.$axios
						.$post("/api/v1/evolve/itemv1/editItem", {
							EvolveItem_ID: this.itemId,
							EvolveItem_Name: this.itemName,
							EvolveItem_Code: this.itemCode,
							EvolveItem_Desc: this.itemDesc,
							EvolveCustItem_Code: this.customerItemCode,
							// EvolveModel_ID : this.selectedModel,
							EvolveUnit_ID: this.selectedUnit,
							EvolveSticker_ID: this.selectedLabelFormate,
						})
						.catch((e) => {
							this.notification(
								"danger",
								3000,
								"Problem with connecting to server!"
							);
						});
					if (editItem.statusCode == 200) {
						this.notification("success", 3000, "Item Updated Successfully");
						UIkit.modal("#addOrEditItem").hide();
						this.getAllItemList();
					} else {
						this.notification("danger", 3000, editItem.message);
					}
				}
			}
		},

		deleteItem: async function (EvolveItem_ID) {
			var deleteItem = confirm("Delete Item??");
			if (deleteItem == true) {
				let deleteItem = await this.$axios
					.$post("/api/v1/evolve/itemv1/deleteItem", {
						EvolveItem_ID: EvolveItem_ID,
					})
					.catch((e) => {
						this.notification(
							"danger",
							3000,
							"Problem with connecting to server!"
						);
					});
				if (deleteItem.statusCode == 200) {
					this.notification("success", 3000, "Item Deleted Successfully");
					this.getAllItemList();
				} else {
					this.notification("danger", 3000, deleteItem.message);
				}
			}
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