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
						{{ translate.units_list }}
					</h1>
					<div class="sc-actions uk-margin-left">
						<div>
							<button class="sc-button datatable-print-button" @click="downloadSample()">
								<i class="mdi mdi-file-download"></i>
								Demo Unit Master 
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
						<button class="sc-button datatable-print-button" @click="downloadCsv()">
							{{ translate.csv }}
						</button>
						<button class="sc-button datatable-print-button" @click="downloadPdf()">
							{{ translate.pdf }}
						</button>
						<!-- <nuxt-link id="option_link" to="/evolve/units/options">
							<button class="sc-button datatable-print-button">
								{{ translate.create_unit }}
							</button>
						</nuxt-link> -->
					</div>
				</div>
			</div>
		</client-only>
		<div id="sc-page-content ">
			<div id="nav-mdi" class="uk-card">
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
									<input v-model="search"
										type="text"
										placeholder="Search Here"
										style="float: right !important;"
										@input="onInputSearch()"
									>
								</client-only>
								<client-only>
									<table id="evolveUnitMaster" class="uk-table uk-table-striped">
										<thead>
											<tr>
												<th>{{ translate.unit_id }}</th>
												<th>{{ translate.company_code }}</th>
												<!-- <th>{{ translate.company }}</th> -->
												<th>{{ translate.unit_code }}</th>
												<th>{{ translate.unit_desc }}</th>
												<!-- <th>{{ translate.unit_name }}</th> -->
												<th>{{ translate.unit_statecode }}</th>
												<!-- <th>{{ translate.location }}</th> -->
												<!-- <th>{{ translate.email }}</th>
												<th>{{ translate.gst_no }}</th> -->
												<!-- <th>{{ translate.created_date }}</th> -->
												<!-- <th>{{ translate.option }}</th> -->
											</tr>
										</thead>
										<tbody>
											<tr v-for="(ul,index) in unitList" :key="index">
												<td>{{ ul.EvolveUnit_ID }}</td>
												<td>{{ ul.EvolveCompany_Code }}</td>
												<!-- <td>{{ ul.EvolveCompany_Name }}</td> -->
												<td>{{ ul.EvolveUnit_Code }}</td>
												<td>{{ ul.EvolveUnit_Description }}</td>
												<!-- <td>{{ ul.EvolveUnit_Name }}</td> -->
												<td>{{ ul.EvolveUnit_State }}</td>
												<!-- <td>{{ ul.EvolveUnit_Location }}</td> -->
												<!-- <td>{{ ul.EvolveUnit_Email }}</td>
												<td>{{ ul.EvolveUnit_Gstin }}</td> -->
												<!-- <td>{{ getDateFormat( ul.EvolveUnit_UpdatedAt) }}</td> -->
												<!-- <td>
													<button
														title="Edit"
														class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
														@click="onEditUnit(ul.EvolveUnit_ID)"
													>
														<i class="mdi mdi-square-edit-outline"></i>
													</button>
												</td> -->
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

								<table id="sampleUnitData" style="display : none !important">
									<tr>
										<th>Site</th>
										<th>Description</th>
										<th>Entity</th>
									</tr>
									<tr>
										<td>SAHM01</td>
										<td>AHMEDABAD</td>
										<td>REXELIND</td>
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
import ScInput from "~/components/Input";
//import ScTextarea from '~/components/Textarea'
if (process.client) {
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
			translate: {
				create_unit: "Create Unit",
				units_list: "Units List",
				csv : "CSV",
				pdf : "PDF",
				unit_name : "Unit Name",
				created_date : "Created Date",
				option : "Option",
				unit_code : "Unit Code",
				location : "Location",
				email : "Email",
				company : "Company",
				gst_no : "GST No",
				upload_csv : "UPLOAD CSV",
				unit_id : "Unit ID",
				company_code : "Company Code",
				unit_statecode : "State Code",
				unit_desc : "Unit Description"
			},
			ip: "",

			userId: this.$store.state.auth.user.EvolveUser_ID,
			editUrl: "/evolve/units/",
			token: this.$auth.getToken("local"),
			deleteApi: "/api/v1/evolve/deleteUser",
			baseURL: this.$axios.defaults.baseURL,
			/** Start : EvolveDataTable */
			search : '', // For making dynamic search
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1, 2],
			pdfExportColums: [0, 1, 2],
			/** End : EvolveDataTable */
			unitList: [],
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
		this.getUnitList();
	},
	methods: {
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
		// defult evolve functions end
		/* Datatable Methods -- Start */
		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getUnitList();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getUnitList();
		},

		async downloadPdf () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolveUnitMaster").outerHTML;
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
					title: "Evolve Unit Master",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveUnitMaster",
				},
			};
		},
		async downloadCsv () {
			let filename = "evolveUnitMaster";
			let csv = [];
			let html = document.getElementById("evolveUnitMaster").outerHTML;
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

		async getUnitList () {
			let list = await this.$axios
				.$post("/api/v1/evolve/Unit/getUnitList", {
					displayRecord: this.displayRecord,
					startFrom: this.startFrom,
					search : this.search,
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
					this.unitList = list.result.records;
					if (list.result.noOfRecord > 0) {
						this.pageCount = Math.ceil(
							list.result.noOfRecord / this.displayRecord
						);
					}else{
						this.pageCount = 0
					}
				} else {
					this.notification("danger", 3000, list.message);
				}
			}
		},
		onInputSearch () {
			this.currentPage = 1;
			this.getUnitList();
			this.paginateClick(1)
		},
		getDateFormat (EvolveUnit_UpdatedAt) {
			let dt = new Date(EvolveUnit_UpdatedAt);
			let date = ("0" + dt.getDate()).slice(-2);
			let month = ("0" + parseInt(dt.getMonth() + 1)).slice(-2);
			let year = dt.getFullYear();
			let hours = dt.getHours();
			let minutes = dt.getMinutes();
			let ampm = hours >= 12 ? "pm" : "am";
			hours = hours % 12;
			hours = hours ? hours : 12;
			minutes = minutes < 10 ? "0" + minutes : minutes;
			let createdAt =
        date +
        "/" +
        month +
        "/" +
        year +
        " " +
        hours +
        ":" +
        minutes +
        " " +
        ampm;
			return createdAt;
		},
		async onEditUnit (id) {
			this.$router.push(this.editUrl + id);
		},

		onFileUpload: async function () {
			document.getElementById("uploadFile").click(); //do something}
		},

		onSelectFile: async function () {
			let fileData = this.$refs.uploadFile.files[0];
			if (fileData != "" && fileData != undefined) {
				if(fileData.type == "application/vnd.ms-excel"){
					this.loaderShow();
					let formData = new FormData();
					formData.append("fileData", fileData);
					let config = { headers: { "Content-Type": "multipart/form-data" } };

					let fileUpload = await this.$axios
						.$post("/api/v1/evolve/Unit/uploadUnitMasterCsv", formData, config)
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
							this.getUnitList();
						} else {
							this.notification("danger", 3000, fileUpload.message);
							this.getUnitList();
						}
					}
					this.loaderHide();
				}else{
					this.notification("danger", 3000, "Please Upload Only Valid CSV File");
				}
			}
		},

		async downloadSample () {
			var csv = [];
			var rows = document.querySelectorAll("table#sampleUnitData tr");
			for (var i = 0; i < rows.length; i++) {
				var row = [];
				var cols = rows[i].querySelectorAll("td, th");
				for (var j = 0; j < cols.length; j++) {
					row.push(cols[j].innerText);
				}
				csv.push(row.join(","));
			}

			// Download CSV file
			downloadCSV(csv.join("\n"), "sampleUnitData.csv");
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
