<template>
	<div class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="getIoData()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
			</div>
			 
			<div v-if="params.EvolveMenu_Id" class="evolve-page-header-icons">
				<a href="javascript:void(0)" data-uk-tooltip="title: Add To Favourite; pos: right" class="sc-actions-icon mdi mdi-star md-color-yellow-600" @click="$store.dispatch('addToFavouriteClick', params.EvolveMenu_Id)"></a>
			</div>
			<div class="evolve-page-header-icons evolve-float-right"> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click="$store.dispatch('removeOneTab', '/evolve/io/queue')"></a>
			</div>

			<!-- <div class="evolve-page-header-icons evolve-float-right"> 
				<button class="sc-button datatable-print-button" type="button" @click="onCreateOrEditItem('')">
					{{ translate.create_Item }}
				</button>
			</div> -->
			 
			<div class="evolve-page-header-icons evolve-float-right">
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-excel md-color-indigo-600" @click="downloadCsv()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-pdf md-color-red-600" @click="downloadPdf()"></a>
			</div>
		</div>
		<client-only>
			<div id="sc-page-content ">
				<div id="nav-mdi" class="uk-card">
					<div class="uk-card-body min-height-back">
						<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
							<div id="err_msg" ref="l" class="uk-modal" data-uk-modal>
								<div class="uk-modal-dialog">
									<button class="uk-modal-close-default" type="button" data-uk-close></button>
									<div class="uk-modal-header">
										<h2 class="uk-modal-title">
											Error Message
										</h2>
									</div>
									<div class="uk-modal-body">
										<pre>{{ errmessage }}</pre>	
									</div>
									<div class="uk-modal-footer uk-text-right">
										<button class="sc-button sc-button-primary" type="button" @click="copyToClipboard(errmessage)">
											COPY
										</button>
									</div>
								</div>
							</div>
							<div>
								<div class="uk-child-width-1-4@m uk-grid" data-uk-grid>
									<div>
										<client-only>
											<label>{{ translate.from_date }}-{{ translate.to_date }}</label>
											<ScInput
												id="dateRange"
												v-date-range-picker="{format: 'DD/MM/YYYY', autoClose: true, time: { enabled: false }}"
												mode="outline"
												:placeholder="translate.pick_start_end_date"
											></ScInput>
										</client-only>
									</div>

									<div>
										<button
											class="sc-button sc-button-mini sc-button-primary waves-button waves-light button-margin-top"
											@click="searchFilterList()"
										>
											{{ translate.search }}
										</button>
										<button
											class="sc-button sc-button-mini sc-button-primary waves-button waves-light button-margin-top"
											@click="clearData()"
										>
											{{ translate.reset }}
										</button>
									</div>
									<div></div>
									<div></div>
								</div>
								<div class="uk-margin-top">
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
										<div class=" uk-overflow-auto" tabindex="0" style="top: 174px; height: 370px;">
											<table id="evolveIoQueue" class="uk-table uk-table-striped">
												<thead>
													<tr>
														<th>{{ translate.code }}</th>
														<th>{{ translate.data }}</th>
														<th>{{ translate.status }}</th>
														<!-- <th>{{ translate.responce }}</th> -->
														<th>{{ translate.responce_code }}</th>
														<th>{{ translate.erp_type }}</th>
														<th>{{ translate.date }}</th>
														<th>{{ translate.file_data }}</th>
														<th>{{ translate.options }}</th>
													</tr>
												</thead>
												<tbody class="ps__thumb-y">
													<tr v-for="(iod,index) in IoData" :key="index">
														<td>{{ iod.EvolveIO_Code }}</td>
														<td>
															<button
																title="Edit"
																class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
																@click="getIoCodeData(iod.EvolveIO_ID)"
															>
																{{ translate.data }}
															</button>
														</td>
														<td v-if="iod.EvolveIO_Status==0">
															<span class="uk-label uk-label-danger">{{ translate.error }}</span>
														</td>
														<td v-else-if="iod.EvolveIO_Status==1">
															<span class="uk-label uk-label-primary">{{ translate.pending }}</span>
														</td>
														<td v-else>
															<span class="uk-label uk-label-success">{{ translate.success_span }}</span>
														</td>

														<!-- <td>
															<button
																title="error"
																class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
																@click="getErrMsg(iod.EvolveIO_Error_Responce)"
															>
																{{ translate.err_msg }}
															</button>
														</td> -->
														<td>{{ iod.EvolveIO_Error_Responce_Code }}</td>
														<td>{{ iod.EvolveIO_ERP_Type }}</td>
														<td>{{ createdDate(iod.EvolveIO_File_InTime) }}</td>

														<td>
															<button
																title="Edit"
																class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
																@click="getIoFileData(iod.EvolveIO_ID)"
															>
																{{ translate.file_data }}
															</button>
														</td>

														<td v-if="iod.EvolveIO_Re_Queue==0">
															<button
																class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
																disabled
															>
																{{ translate.requeue }}
															</button>
														</td>
														<td v-else>
															<button
																class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
																@click="editQueue(iod.EvolveIO_ID)"
															>
																{{ translate.requeue }}
															</button>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
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
			</div>
		</client-only>
	</div>
</template>
<style>
.uk-position-top-right {
  top: 24px;
}
</style>
<script>
const rows = "";
import ScTextarea from "~/components/Textarea";
import PrettyRadio from "pretty-checkbox-vue/radio";
import ScInput from "~/components/Input";
import moment from "~/plugins/moment";
import { async } from "q";
if (process.client) {
	// // require(~/plugins/daterangepicker);
}

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
		ScInput,
		Paginate,
		EvolvePDF: process.client
			? () => import("~/components/jspdf/evolvePDF")
			: null,
	},
	// mixins: [validationMixin],
	props: {
		params: {
			type: Object,
			default: () => {}
		}
	},
	data () {
		return {
			ioDataId: null,
			codeData: "",
			fileData: "",
			dtDData: [],
			startDate: "",
			endDate: "",
			userId: this.$store.state.auth.user.EvolveUser_ID,
			isJson: false,

			errmessage : "",
			// Evolve Data Table - start
			IoData: [],
			search: "", // For making dynamic search
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1, 2, 3, 4, 5, 6, 7],
			pdfExportColums: [0, 1, 2, 3, 4, 5, 6, 7],

			// Language
			translate: {
				// Titile
				ioqueue: "IO Queue",

				// Table title
				file_data: "File Data",
				data: "Data",
				status: "Status",
				err_msg : "Error Message ",
				error: "Error",
				error_code: "Error Code",
				erp_type: "ERP Type",
				code: "Code",
				options: "Options",
				reset: "Reset",
				search: "Search",
				from_date: "From Date",
				to_date: "To Date",
				io_file_data: "IO File Data",
				io_data: "IO Data",
				copy: "Copy",
				data: "Data",
				status: "Status",
				error: "Error",
				error_code: "Error Code",
				erp_type: "ERP Type",
				file_data: "File Data",
				options: "Option",
				pending: "Pending",
				success_span: "Success/Span",
				csv: "CSV",
				pdf: "PDF",
				requeue: "Requeue",
				pick_start_end_date: "Pick Start To End Date",
				search_here: "Search Here",
				responce: "Responce",
				responce_code: "Responce Code",
				date: "Date",
			},
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
		this.getIoData();
	},

	beforeMount () {
		this.translateLanguage();
	},
	methods: {
		removeModal: async function (e) {
			$(".uk-modal").remove(); // Remove Old Model From DOM
		},

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
			let config = { timeout: timeout, status: type };
			UIkit.notification(message, config);
		},
		clearData: async function () {
			this.startDate = "";
			this.endDate = "";
			this.getIoData();
		},

		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getIoData();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getIoData();
		},
		async getIoData () {
			const getIoData = await this.$axios
				.$post("/api/v1/evolve/IoHistory/getIoReportData", {
					displayRecord: this.displayRecord,
					startFrom: this.startFrom,
					search: this.search,
					startDate: this.startDate,
					endDate: this.endDate,
				})
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});

			if (getIoData) {
				if (getIoData.statusCode == 200) {
					this.IoData = getIoData.result.records;
					console.log(this.IoData)
					if (getIoData.result.noOfRecord > 0) {
						this.pageCount = Math.ceil(
							getIoData.result.noOfRecord / this.displayRecord
						);
					} else {
						this.pageCount = 0;
					}
				} else {
					this.notification("danger", 3000, getIoData.message);
				}
			}
		},
		onInputSearch () {
			this.currentPage = 1;
			this.getIoData();
			this.paginateClick(1);
		},
		async downloadPdf () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			// let html = document.getElementById("evolveIOHistorydata").outerHTML;
			let rows = document.querySelectorAll(
				"#evolveIOHistorydataTable table tr"
			);
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
					title: "Evolve IO History",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveIOHistory",
				},
			};
		},
		async downloadCsv () {
			let filename = "evolveIOHistory";
			let csv = [];
			// let html = document.getElementById("evolveIOHistorydata").outerHTML;
			let rows = document.querySelectorAll(
				"#evolveIOHistorydataTable table tr"
			);
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
		// Datatables

		getIoCodeData: async function (id) {
			this.ioDataId = id;
			let ioCodeData = await this.$axios.$post(
				"/api/v1/evolve/IoHistory/getSingleIoCodeData",
				{ id: this.ioDataId }
			);
			this.codeData = ioCodeData.result.EvolveIOHistory_Data;
			if (
				/^[\],:{}\s]*$/.test(
					this.codeData
						.replace(/\\["\\\/bfnrtu]/g, "@")
						.replace(
							/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
							"]"
						)
						.replace(/(?:^|:|,)(?:\s*\[)+/g, "")
				)
			) {
				this.codeData = JSON.parse(ioCodeData.result.EvolveIOHistory_Data);
				this.isJson = true;
			} else {
				this.codeData = ioCodeData.result.EvolveIOHistory_Data;
				this.isJson = false;
			}
			UIkit.modal("#code_data").show();
		},
		getIoFileData: async function (id) {
			this.ioDataId = id;
			let ioCodeData = await this.$axios.$post(
				"/api/v1/evolve/IoHistory/getSingleIoCodeData",
				{ id: this.ioDataId }
			);
			this.fileData = ioCodeData.result.EvolveIOHistory_File_Data;
			if (
				/^[\],:{}\s]*$/.test(
					this.fileData
						.replace(/\\["\\\/bfnrtu]/g, "@")
						.replace(
							/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
							"]"
						)
						.replace(/(?:^|:|,)(?:\s*\[)+/g, "")
				)
			) {
				this.fileData = JSON.parse(ioCodeData.result.EvolveIOHistory_File_Data);
				this.isJson = true;
			} else {
				this.fileData = ioCodeData.result.EvolveIOHistory_File_Data;
				this.isJson = false;
			}
			UIkit.modal("#file_data").show();
		},
		copyToClipboard: async function (data) {
			if (this.isJson == true) {
				data = JSON.stringify(data);
			}
			var el = document.createElement("textarea");
			el.value = data;
			document.body.appendChild(el);
			el.select();
			document.execCommand("copy");
			document.body.removeChild(el);
			this.notification("success", 3000, "Data copied to clipboard");
		},
		async searchFilterList () {
			let dateRang = document.getElementById("dateRange").value;
			dateRang = dateRang.split("~");
			this.startDate =
        dateRang[0] == undefined
        	? ""
        	: dateRang[0].split("/").reverse().join("-");
			this.endDate =
        dateRang[1] == undefined
        	? ""
        	: dateRang[1].split("/").reverse().join("-");

			this.getIoData();
		},

		createdDate (data) {
			let dt = new Date(data);
			let date = dt.getUTCDate();
			let month = parseInt(dt.getUTCMonth() + 1);
			let year = dt.getUTCFullYear();
			let createdAt = date + "/" + month + "/" + year; // + ' ' + hours + ':' + minutes ;
			return createdAt;
		},
	},
};
</script>
<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>