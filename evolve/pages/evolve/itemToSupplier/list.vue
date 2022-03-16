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
						{{ translate.item_to_supplier_assignmnet }}
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
							data-uk-toggle="target: #add_newAssign"
							@click="clearData()"
						>
							{{ translate.new_assign }}
						</button>
						<button id="edit_url" style="display : none" @click="selectSingleItemData()"></button>
						<button id="active_url" style="display : none" @click="changeReasonStatus()"></button>
					</div>
				</div>
			</div>
		</client-only>
		<div id="sc-page-content ">
			<div id="nav-mdi" class="uk-card">
				<div id="add_newAssign" class="uk-modal" data-uk-modal bg-close="false">
					<div class="uk-modal-dialog">
						<button class="uk-modal-close-default" type="button" data-uk-close></button>
						<div class="uk-modal-header">
							<h2 class="uk-modal-title">
								{{ translate.item_to_supplier_assign }}
							</h2>
						</div>
						<div class="uk-modal-body">
							<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
								<div>
									<label>{{ translate.item_code }}: {{ itemCode }}</label>
									<client-only>
										<Select2Search
											v-model="itemId"
											:error-class="$v.itemId.$error"
											:validator="$v.itemId"
											name="EvolveItem"
											:settings="{ 'width': '100%', 'placeholder': 'Select Item Code...', allowClear: true }"
											:ajax-url="ItemAjaxUrl"
											:minimum-input-length="3"
										></Select2Search>
									</client-only>
									<ul class="sc-vue-errors">
										<li v-if="!$v.itemId.required" class="li_error">
											{{ translate.item_required }} *
										</li>
									</ul>
								</div>
							</div>
							<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
								<div>
									<label>{{ translate.supplier }} :</label>

									<Select2
										v-model=" supplierId"
										:settings="{ 'width': '100%', 'placeholder': 'Select supplier ...', allowClear: true }"
										name="supplierId"
										@change="onSelectSupplier(supplierId)"
									>
										<option key value selected>
											{{ translate.select_supplier }}
										</option>
										<option
											v-for="sp in supplierList"
											:key="sp.EvolveSupplier_ID"
											:value="sp.EvolveSupplier_ID"
										>
											{{ sp.EvolveSupplier_Name }}
										</option>
									</Select2>
								</div>
								<div>
									<table>
										<tr
											v-for="sl in selectedSupplierList"
											:key="sl.EvolveSupplier_ID"
											:value="sl.EvolveSupplier_ID"
										>
											<td>{{ sl.EvolveSupplier_Name }}</td>
											<td>
												<button
													class="sc-button sc-button-mini sc-button-danger waves-button waves-light uk-width-1-1"
													@click="supplierDelete(sl.EvolveSupplier_ID)"
												>
													<i class="mdi mdi-delete-forever"></i>
												</button>
											</td>
										</tr>
									</table>
								</div>
							</div>
							<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
								<div>
									<label>{{ translate.customer_item }}:</label>
									<client-only>
										<ScInput
											v-model="$v.customerItem.$model"
											name="customerItem"
											mode="outline"
											placeholder="Enter Customer's Item Name"
											:error-class="$v.customerItem.$error"
											:validator="$v.customerItem"
										></ScInput>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.customerItem.required"
												class="li_error"
											>
												{{ translate.customer_item_is_required }} *
											</li>
										</ul>
									</client-only>
								</div>
							</div>

							<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
								<div>
									<label>{{ translate.uom }}:</label>
									<client-only>
										<Select2
											v-model="uomId"
											:settings="{ 'width': '100%', 'placeholder': 'Select location ...', allowClear: true }"
											name="uomId"
											:error-class="$v.uomId.$error"
											:validator="$v.uomId"
										>
											<option key value selected>
												{{ translate.uom }}
											</option>
											<option
												v-for="lo in uomList"
												:key="lo.EvolveUom_ID"
												:value="lo.EvolveUom_ID"
											>
												{{ lo.EvolveUom_Uom }}
											</option>
										</Select2>
									</client-only>
									<ul class="sc-vue-errors">
										<li v-if="!$v.uomId.required">
											{{ translate.uom_is_required }}*
										</li>
									</ul>
								</div>
								<div>
									<label>{{ translate.remarks }}:</label>

									<ScInput
										v-model="remarks"
										name="Remarks"
										mode="outline"
										placeholder="Enter Remarks"
									></ScInput>
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
								@click="addNewAssignment($event)"
							>
								{{ translate.save }}
							</button>
						</div>
					</div>
				</div>

				<div class="uk-card-body min-height-back">
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
									<table id="evolveAssingItemToSupp" class="uk-table uk-table-striped">
										<thead>
											<tr>
												<th>{{ translate.item_code }}</th>
												<th>{{ translate.supplier_name }}</th>
												<th>{{ translate.customer_item }}</th>
												<th>{{ translate.uom }}</th>
												<th>{{ translate.remarks }}</th>
												<th>{{ translate.action }}</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(item,index) in assinglist" :key="index">
												<td>{{ item.EvolveItem_Code }}</td>
												<td>{{ item.EvolveSupplier_Name }}</td>
												<td>{{ item.EvolveItemSupLink_CustomerItem }}</td>
												<td>{{ item.EvolveUom_Uom }}</td>

												<td>{{ item.EvolveItemSupLink_Comments }}</td>

												<td>
													<button
														title="Edit"
														class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
														@click="selectSingleItemData(item.EvolveItemSupLink_id)"
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
// import PrettyCheck from 'pretty-checkbox-vue/check';
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
		// ScTextarea,
		ScInput,
		// PrettyCheck,
		Paginate,
		Select2: process.client ? () => import("~/components/Select2") : null,
		Select2Search: process.client
			? () => import("~/components/ajaxSearch/Select2Search")
			: null,
		EvolvePDF: process.client
			? () => import("~/components/jspdf/evolvePDF")
			: null,
		// DefaultDatatable: process.client ? () => import('~/components/datatables/DefaultDatatables') : null,
	},
	mixins: [validationMixin],
	data () {
		return {
			ItemAjaxUrl:
        this.$axios.defaults.baseURL + "/api/v1/evolve/ItemToSupplier/getItem",
			itemCode: "",
			InventoryStatus: false,
			uomId: null,
			config_key: "",
			itemId: null,
			remarks: "",
			supplierId: null,
			templateId: null,
			reason_description: "",
			reason_color: "#039be5",
			approvedStatus: false,
			itemToSuppId: null,
			selectMachineList: [],
			supplierList: [],
			selectedSupplierList: [],
			itemList: [],
			locationList: [],
			locationId: null,
			customerItem: "",
			templateList: [],
			machinename: [],
			selectMachineArray: [],
			uomList: [],
			dateRange: "",
			userId: this.$store.state.auth.user.EvolveUser_ID,
			token: this.$auth.getToken("local"),
			deleteApi:
        this.$axios.defaults.baseURL +
        "/api/v1/evolve/ItemToSupplier/deleteAssignment",
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
			csvExportColums: [0, 1, 2, 3, 4, 5],
			pdfExportColums: [0, 1, 2, 3, 4, 5],
			/** End : EvolveDataTable */
			assinglist: [],
			translate: {
				customer_item_is_required: "Customer Item Is Required",
				customer_item: "Customer Item",
				uom: "Uom",
				remarks: "Remarks",
				item_to_supplier_assignmnet: "Item To Supllier Assignment",
				new_assign: "New Assign",
				item_to_supplier_assign: "Item to Supplier Assign",
				item_code: "Item Code",
				item_required: "Item  Required",
				supplier: "Supplier",
				select_supplier: "Select Supplier",
				approve_not_approved: "Approved Not Approved",
				is_active: "Is Active",
				select_template: "Select Template",
				template_is_required: "Template is required",
				inventory_status: "Inventory Status",
				select_location: "Select Location",
				uom_is_required: "Uom is required",
				cancel: "Cancel",
				save: "Save",
				item_code: "Item Code",
				supplier_name: "Supllier Name",
				template: "Template",
				approve_status: "Aprrove Status",
				inventory_status: "Inventory Status",
				location: "Location",
				action: "Action",
				select_location: "Select Location",
				is_approve: "Is Approve",
				csv: "CSV",
				pdf: "PDF",
				active: "Active",
				deactive: "De-Active",
			},
		};
	},
	computed: {},
	validations: {
		itemId: {
			required,
		},
		customerItem: {
			required,
		},
		uomId: {
			required,
		},
	},
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
		this.getAssignedList();
		this.getSuppList();
		this.removeModal();
		this.getTemplateList();
		this.getUomList();

		// this.getItemList();
	},

	beforeMount () {
		this.translateLanguage();
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

		async notification (type = "danger", timeout = 3000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},

		getDate (dt) {
			return this.$moment(dt).format("DD/MM/YYYY");
		},

		removeModal: async function (e) {
			$(".uk-modal").remove(); // Remove Old Model From DOM
		},
		// Table Method
		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getAssignedList();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getAssignedList();
		},
		async downloadPdf () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolveAssingItemToSupp").outerHTML;
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
					title: "Evolve Item To Supplier List",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveItemToSupplierList",
				},
			};
		},
		async downloadCsv () {
			let filename = "evolveItemToSupplierList";
			let csv = [];
			let html = document.getElementById("evolveAssingItemToSupp").outerHTML;
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
		//  Table Method End

		// Datatable
		dtBasicInitialized () {
			this.$refs.basicTable.$dt
				.buttons()
				.container()
				.appendTo(document.getElementById("sc-dt-buttons"));
		},

		async clearData () {
			this.$v.$reset();
			this.itemId = null;
			this.supplierId = null;
			this.selectedSupplierList = [];
			this.approvedStatus = false;
			this.itemCode = "";
			this.templateId = null;
			this.itemToSuppId = null;
			this.uomId = null;
			this.customerItem = "";
			this.remarks = "";
		},

		async getAssignedList () {
			let getAssignedList = await this.$axios
				.$post("/api/v1/evolve/ItemToSupplier/getAssignedList", {
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
			if (getAssignedList) {
				if (getAssignedList.statusCode == 200) {
					this.assinglist = getAssignedList.result.records;
					if (getAssignedList.result.noOfRecord > 0) {
						this.pageCount = Math.ceil(
							getAssignedList.result.noOfRecord / this.displayRecord
						);
					} else {
						this.pageCount = 0;
					}
				} else {
					this.notification("danger", 3000, getAssignedList.message);
				}
			}
		},
		onInputSearch () {
			this.currentPage = 1;
			this.getAssignedList();
			this.paginateClick(1);
		},
		getSuppList: async function () {
			const supList = await this.$axios
				.$get("/api/v1/evolve/ItemToSupplier/getSupplierList")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (supList) {
				if (supList.statusCode == 200) {
					this.supplierList = supList.result;
				} else {
					this.notification("danger", 3000, supList.message);
				}
			}
		},
		getTemplateList: async function () {
			const tempList = await this.$axios
				.$get("/api/v1/evolve/ItemToSupplier/getTemplateList")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (tempList) {
				if (tempList.statusCode == 200) {
					this.templateList = tempList.result;
				} else {
					this.notification("danger", 3000, tempList.message);
				}
			}
		},
		async addNewAssignment (e) {
			e.preventDefault();
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.notification("danger", 3000, "Please Fill All Required Fileds");
			} else {
				if (this.selectedSupplierList.length == 0) {
					this.notification(
						"danger",
						3000,
						"Please select at least one supplier !"
					);
				} else {
					if (this.itemToSuppId == null) {
						let assign = await this.$axios
							.$post("/api/v1/evolve/ItemToSupplier/assignItemToSuppliers", {
								EvolveItem_ID: this.itemId,
								// EvolveReason_Code : this.supplierId,

								selectedSuppliers: this.selectedSupplierList,
								EvolveItemSupLink_CustomerItem: this.customerItem,
								EvolveItemSupLink_Comments: this.remarks,
								EvolveUom_ID: this.uomId,

								// selectedMachineArray : this.selectMachineArray,
							})
							.catch((e) => {
								this.notification(
									"danger",
									3000,
									"Problem with connecting to server!"
								);
							});
						if (assign.statusCode == 200) {
							this.notification("success", 3000, assign.message);

							UIkit.modal("#add_newAssign").hide();
							this.getAssignedList();
						} else {
							this.notification("danger", 3000, assign.message);
							//this.$router.push('/evolve/MachineMaster/companies/list')
						}
					} else {
						let assign = await this.$axios
							.$post("/api/v1/evolve/ItemToSupplier/updateItemToSuppliers", {
								EvolveItem_ID: this.itemId,

								selectedSuppliers: this.selectedSupplierList,
								EvolveItemSupLink_CustomerItem: this.customerItem,
								EvolveItemSupLink_Comments: this.remarks,
								EvolveUom_ID: this.uomId,
								// selectedMachineArray : this.selectMachineArray,
							})
							.catch((e) => {
								this.notification(
									"danger",
									3000,
									"Problem with connecting to server!"
								);
							});
						if (assign.statusCode == 200) {
							this.notification("success", 3000, assign.message);
							this.clearData();

							UIkit.modal("#add_newAssign").hide();
							this.getAssignedList();
						} else {
							this.notification("danger", 3000, assign.message);
							//this.$router.push('/evolve/MachineMaster/companies/list')
						}
					}
				}
			}
		},

		selectSingleItemData: async function (id) {
			try {
				// this.notification('danger', 3000, 'fun call');
				let itemid = id;
				const AssignData = await this.$axios
					.$post("/api/v1/evolve/ItemToSupplier/getSingleAssignData", {
						EvolveItem_ID: itemid,
					})
					.catch((e) => {
						this.notification(
							"danger",
							3000,
							"Problem with connecting to server!"
						);
					});
				if (AssignData) {
					if (AssignData.statusCode == 200) {
						(this.itemToSuppId = AssignData.result[0].EvolveItemSupLink_id),
						(this.itemId = AssignData.result[0].EvolveItem_ID + "");
						this.supplierId = AssignData.result[0].EvolveSupplier_ID + "";
						this.templateId = AssignData.result[0].EvolveQCTemp_ID + "";
						this.selectedSupplierList = AssignData.result;
						(this.approvedStatus =
              AssignData.result[0].EvolveItemSupLink_Approved),
						(this.itemCode = AssignData.result[0].EvolveItem_Code),
						(this.locationId =
                AssignData.result[0].EvolveItemSupLink_recInvetory_Location +
                ""),
						(this.InventoryStatus =
                AssignData.result[0].EvolveItemSupLink_recInvetory_Status),
						(this.uomId = AssignData.result[0].EvolveUom_ID),
						(this.customerItem =
                AssignData.result[0].EvolveItemSupLink_CustomerItem),
						(this.remarks = AssignData.result[0].EvolveItemSupLink_Comments),
						UIkit.modal("#add_newAssign").show();
					} else {
						this.notification("danger", 3000, AssignData.message);
					}
				} else {
					this.notification("danger", 3000, "assigndata null");
				}
			} catch (error) {
				this.notification("danger", 3000, error);
			}
		},

		async changeReasonStatus () {
			let changeReasonStatusReq = {
				EvolveReason_ID: localStorage.getItem("active_id"),
				EvolveReason_Status:
          localStorage.getItem("active_status") == "true" ? 0 : 1,
			};
			const changeStatus = await this.$axios.$post(
				"/api/v1/evolve/reason/changeReasonStatus",
				changeReasonStatusReq
			);
			if (changeStatus) {
				if (changeStatus.statusCode == 200) {
					this.notification("success", 3000, changeStatus.message);
					this.getAssignedList();
				} else {
					this.notification("danger", 3000, changeStatus.message);
				}
			}
		},

		async onSelectSupplier (suppId) {
			let supplier_id = suppId;
			let supplierTrue = true;
			let supplierName = "";
			if (supplier_id != "" && supplier_id != null) {
				for (let i = 0; i < this.selectedSupplierList.length; i++) {
					if (this.selectedSupplierList[i].EvolveSupplier_ID == supplier_id) {
						supplierTrue = false;
					}
				}
				if (supplierTrue == true) {
					for (let b = 0; b < this.supplierList.length; b++) {
						if (this.supplierList[b].EvolveSupplier_ID == supplier_id) {
							supplierName = this.supplierList[b].EvolveSupplier_Name;
							break;
						}
					}

					this.selectedSupplierList.push({
						EvolveSupplier_ID: supplier_id,
						EvolveSupplier_Name: supplierName,
					});
					// console.log('table data-- ', this.selectedList);
				} else {
					// console.log('alrady Exit ');
				}
			}
		},

		async supplierDelete (suppId) {
			for (let i = 0; i < this.selectedSupplierList.length; i++) {
				if (this.selectedSupplierList[i].EvolveSupplier_ID == suppId) {
					this.selectedSupplierList.splice(i, 1);
					break;
				}
			}
		},

		getItemList: async function () {
			const items = await this.$axios
				.$get("/api/v1/evolve/ItemToSupplier/getItemList")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (items) {
				if (items.statusCode == 200) {
					this.itemList = items.result;
				} else {
					this.notification("danger", 3000, items.message);
				}
			}
		},
		getLocationList: async function () {
			console.log("location list called >> ");
			const locations = await this.$axios
				.$get("/api/v1/evolve/ItemToSupplier/getLocationList")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (locations) {
				if (locations.statusCode == 200) {
					this.locationList = locations.result;
					console.log("Location  result >>  , ", this.locationList);
				} else {
					this.notification("danger", 3000, locations.message);
				}
			}
		},

		getUomList: async function () {
			const uoms = await this.$axios
				.$get("/api/v1/evolve/ItemToSupplier/getUomList")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (uoms) {
				if (uoms.statusCode == 200) {
					this.uomList = uoms.result;
				} else {
					this.notification("danger", 3000, uoms.message);
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
