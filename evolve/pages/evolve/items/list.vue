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
						<button class="sc-button datatable-print-button" @click="downloadListCsv()">
							CSV
						</button>
						<button class="sc-button datatable-print-button" @click="downloadPdf()">
							PDF
						</button>
						<nuxt-link to="/evolve/items/">
							<button
								class="sc-button datatable-print-button"
								type="button"
							>
								{{ translate.create_item }}
							</button>
						</nuxt-link>
						<button id="delete_url" style="display:none;" @click="delete_item()"></button>
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
									@click="downloadSample()"
								>
									{{ translate.csv_demo_download }}
								</button>
							</div>
						</div>
						<div>
							<label>{{ translate.update_tolerance }}</label>
							<input
								id="updateTolerenceCsv"
								ref="updateTolerenceCsv"
								type="file"
								accept=".csv"
								class="uk-input"
								@change="handleFileUpdateToleranceUpload()"
							>
						</div>
						<div>
							<div class="uk-margin-top">
								<button
									class="sc-button sc-button-primary full-width"
									type="button"
									@click="uploadFileUpdateTolerance()"
								>
									{{ translate.update_tolerance }}
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
									<table id="evolveItemMaster" class="uk-table uk-table-striped">
										<thead>
											<tr>
												<th>{{ translate.item_code }}</th>
												<th>{{ translate.item_desc }}</th>
												<th>{{ translate.customer_code }}</th>
												<th>{{ translate.group }}</th>
												<!-- <th>{{ translate.type }}</th>
                        <th>{{ translate.unit_name }}</th>-->
												<th>{{ translate.process_template }}</th>
												<th>{{ translate.uom }}</th>
												<th>{{ translate.is_active }}</th>
												<!-- <th>{{ translate.sheflife }}</th> -->
												<!-- <th>{{ translate.item_domain }}</th> 
												<th>{{ translate.qc_is_required }}</th>
												<th>{{ translate.item_location }}</th>
												<th>{{ translate.p_m_code }}</th>
                        <th>{{ translate.tolerence }}</th>-->
												<th>{{ translate.options }}</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(il,index) in itemList" :key="index">
												<td>{{ il.EvolveItem_Code }}</td>
												<td>{{ il.EvolveItem_Desc }}</td>
												<td>{{ il.EvolveItem_CustPart }}</td>
												<td>{{ il.EvolveItemGroup_Name }}</td>
												<!-- <td>{{ il.EvolveItem_Type }}</td> -->
												<!-- <td>{{ il.EvolveUnit_Name }}</td> -->
												<td>{{ il.EvolveProcessTemp_Name }}</td>
												<td>{{ il.EvolveUom_Uom }}</td>
												<td>{{ il.EvolveItem_IsActive }}</td>
												<!-- <td>{{ il.EvolveItem_ShelfLife }}</td> -->
												<!-- <td>{{ il.EvolveItem_Domain }}</td> -->
												<!-- <td>{{ il.EvolveQc_IsRequired }}</td> -->
												<!-- <td>{{ il.EvolveLocation_Name }}</td> -->
												<!-- <td>{{ il.EvolveItem_PmCode }}</td> -->
												<!-- <td>{{ il.EvolveItem_Tolerence }}</td> -->
												<td>
													<button
														title="Edit"
														class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
														@click="getEditUrl(il.EvolveItem_ID)"
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
					<table id="sampleItemData" style="display : none !important">
						<tr>
							<th>{{ translate.item_code }}</th>
							<th>{{ translate.description }}</th>
							<th>{{ translate.item_type }}</th>
							<th>{{ translate.load_capacity }}</th>
							<th>{{ translate.unit_of_measure }}</th>
							<th>{{ translate.cust_part }}</th>
							<th>{{ translate.inventory_trackable }}</th>
							<th>{{ translate.is_scan }}</th>
						</tr>
						<tr>
							<td>2021=TS000SP0K0850</td>
							<td>UB AXLE 5"RISO M2210*335 SINGLE TM</td>
							<td>CHILD</td>
							<td>20</td>
							<td>2</td>
							<td>Part</td>
							<td>true</td>
							<td>true</td>
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
// import ScInput from "~/components/Input";
// import moment from "~/plugins/moment";
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
		Paginate,
		EvolvePDF: process.client
			? () => import("~/components/jspdf/evolvePDF")
			: null,
	},

	data () {
		return {
			EvolveMenu_Id :this.$route.query.EvolveMenu_Id,
			translate: {
				type: "type",
				item_master: "Item Master",
				create_item: "Create Item",
				csv_demo_download: "Csv Demo Download ",
				csv_upload: "CSV Upload",
				upload: "UPLOAD",
				item_code: "ITEM CODE",
				item_desc: "ITEM DESC",
				customer_code: "CUSTOMER CODE",
				group: "GROUP",
				process_template: "PROCESS TEMPLATE",
				options: "OPTIONS",
				item_code: "Item Code",
				description: "Description",
				item_type: "Item Type",
				load_capacity: "Load Capacity",
				unit_of_measure: "Unit of Measure",
				cust_part: "Cust Part",
				inventory_trackable: "Inventory Trackable",
				is_scan: "Is Scan",
				uom: "uom",
				is_active: "Is Active",
				sheflife: "Shelf Life",
				// item_domain : "Item Domain",
				qc_is_required: "QC Is Required",
				item_location: "Item Location",
				p_m_code: "P / M",
				unit_name: "Unit Name",
				tolerence: "Tolerence",
				update_tolerance: "Update Tolerence",
			},
			itemList: [],
			editUrl: "/evolve/items/",
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
			csvExportColums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			pdfExportColums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
		this.getItems();
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

		removeModal: async function (e) {
			$(".uk-modal").remove(); // Remove Old Model From DOM
		},

		async notification (type = "danger", timeout = 10000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},
		/** Default Method For All Pages : end Here */

		/* Datatable Methods -- Start */
		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getItems();
		},

		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getItems();
		},

		async downloadPdf () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolveItemMaster").outerHTML;
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
					title: "Evolve Item  Master",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveItemMaster",
				},
			};
		},

		async downloadListCsv () {
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
					.$post("/api/v1/evolve/item/csvItemsUpload", formData, config)
					.catch((e) => {
						this.notification(
							"danger",
							10000,
							"Problem with connecting to server!"
						);
					});
				if (csvUploadData) {
					if (csvUploadData.statusCode == 200) {
						this.notification("success", 10000, csvUploadData.message);
						this.getItems();
						this.loaderHide();
						this.$refs.csvFile.files[0].value = "";
						document.getElementById("csvFile").value = "";
						this.itemCsv = "";
					} else {
						if (Array.isArray(csvUploadData.message)) {
							for (let j = 0; j < csvUploadData.message.length; j++) {
								this.notification("danger", 10000, csvUploadData.message[j]);
							}
						} else {
							this.notification("danger", 10000, csvUploadData.message);
						}
						this.loaderHide();
					}
				}
			} else {
				this.notification("danger", 10000, "File Must Required!");
			}
		},

		async handleFileUpdateToleranceUpload () {
			this.itemCsv = this.$refs.updateTolerenceCsv.files[0];
			console.log("handleFileUpload>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.itemCsv);
		},

		async uploadFileUpdateTolerance () {
			if (this.itemCsv != "") {
				this.loaderShow();
				let formData = new FormData();
				formData.append("csvFile", this.itemCsv);
				const config = { headers: { "Content-Type": "multipart/form-data" } };
				let uploadFileUpdateTolerance = await this.$axios
					.$post(
						"/api/v1/evolve/item/uploadFileUpdateTolerance",
						formData,
						config
					)
					.catch((e) => {
						this.notification(
							"danger",
							10000,
							"Problem with connecting to server!"
						);
					});
				if (uploadFileUpdateTolerance) {
					if (uploadFileUpdateTolerance.statusCode == 400) {
						this.notification(
							"danger",
							10000,
							uploadFileUpdateTolerance.message
						);
						this.loaderHide();
					} else {
						for (let i in uploadFileUpdateTolerance.result) {
							if (uploadFileUpdateTolerance.result[i].statusCode == 200) {
								this.notification(
									"success",
									10000,
									uploadFileUpdateTolerance.result[i].message
								);
							} else {
								this.notification(
									"success",
									10000,
									uploadFileUpdateTolerance.result[i].message
								);
							}
						}
						this.getItems();
						this.loaderHide();
						this.$refs.updateTolerenceCsv.files[0].value = "";
						document.getElementById("updateTolerenceCsv").value = "";
						this.itemCsv = "";
					}
				}
			} else {
				this.notification("danger", 10000, "File Must Required!");
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

		delete_item: async function () {
			let delete_id = localStorage.getItem("delete_id");
			localStorage.removeItem("delete_id");
			let item_data = await this.$axios.$post(
				"/api/v1/evolve/item/deleteItem",
				{ id: delete_id }
			);
			if (item_data) {
				if (item_data.statusCode == 200) {
					this.notification("success", 10000, item_data.message);
					// this.getItems();
				} else {
					this.notification("danger", 10000, item_data.message);
				}
			}
		},

		getEditUrl: async function (id) {
			this.$store.dispatch('addNewTab', {
				title: 'Item Details', 
				url: '/evolve/items/_options',
				params: {
					itemId: id,
				}
			});
		},

		async getItems () {
			this.loaderShow();
			let item_List = await this.$axios
				.$post("/api/v1/evolve/item/getItemsList", {
					displayRecord: this.displayRecord,
					startFrom: this.startFrom,
					search: this.search,
				})
				.catch((e) => {
					this.notification(
						"danger",
						10000,
						"Problem with connecting to server!"
					);
				});
			if (item_List) {
				if (item_List.statusCode == 200) {
					this.itemList = item_List.result.records;
					if (item_List.result.noOfRecord > 0) {
						this.pageCount = Math.ceil(
							item_List.result.noOfRecord / this.displayRecord
						);
					} else {
						this.pageCount = 0;
					}
					this.loaderHide();
				} else {
					this.loaderHide();
					this.notification("danger", 10000, item_List.message);
				}
			}
		},
		onInputSearch () {
			this.currentPage = 1;
			this.getItems();
			this.paginateClick(1);
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