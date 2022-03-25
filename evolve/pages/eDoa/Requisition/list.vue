<template>
	<div id="sc-page-wrapper" class="uk-flex uk-flex-column">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<a
					class="sc-actions-icon mdi mdi-refresh md-color-light-green-600"
					@click="refreshPage()"
				></a>
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"
				></a>
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-window-minimize"
				></a>
			</div>
			<div v-if="EvolveMenu_Id" class="evolve-page-header-icons">
				<a
					href="javascript:void(0)"
					data-uk-tooltip="title: Add To Favourite; pos: right"
					class="sc-actions-icon mdi mdi-star md-color-yellow-600"
					@click="$store.dispatch('addToFavouriteClick', EvolveMenu_Id)"
				></a>
			</div>
			<div class="evolve-page-header-icons evolve-float-right">
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-close-box md-color-red-600"
					@click="$store.dispatch('removeOneTab', pageURL)"
				></a>
			</div>

			<div class="evolve-page-header-icons evolve-float-right">
				<button
					class="sc-button sc-button-mini header-button-evolve"
					type="button"
					@click="onCreateOrEdit('')"
				>
					{{ translate.create }}
				</button>
			</div>

			<div class="evolve-page-header-icons evolve-float-right">
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-file-excel md-color-indigo-600"
					@click="downloadCsv()"
				></a>
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-file-pdf md-color-red-600"
					@click="downloadPdf()"
				></a>
			</div>
		</div>

		<client-only>
			<div id="sc-page-content" class="evolve-page-body">
				<div id="nav-mdi" class="uk-card">
					<div class="uk-card-body min-height-back">
						<div id="error_details" class="uk-modal" data-uk-modal>
							<div class="uk-modal-dialog" style="width: 3000px">
								<button
									class="uk-modal-close-default"
									type="button"
									data-uk-close
								></button>
								<div class="uk-modal-header">
									<h2 class="uk-modal-title">
										Error Details
									</h2>
								</div>
								<div class="uk-modal-body">
									<div class="uk-child-width-1-1@m uk-grid" data-ul-grid>
										<div>
											{{ errorDetails }}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
							<div>
								<div class="uk-overflow-auto">
									<client-only>
										<select
											v-model="displayRecord"
											@change="onDisplayRecordChange($event)"
										>
											<option v-for="dr in displayRow" :key="dr" :value="dr">
												{{ dr }}
											</option>
										</select>
									</client-only>
									<client-only>
										<input
											v-model="search"
											type="text"
											placeholder="Search Here"
											style="float: right !important"
											@input="onInputSearch()"
										>
									</client-only>
									<client-only>
										<table
											id="evolveSalesQuoteMaster"
											class="uk-table uk-table-striped"
										>
											<thead>
												<tr>
													<th>REQUISITION NO</th>
													<th>CREATED DATE</th>
													<th>CREATED BY</th>
													<th>PROCESS</th>
													<th>STATUS</th>
													<th>ACTIONS</th>
													<th>DETAILS</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(row, index) in prList" :key="index">
													<td>{{ row.EvolvePR_NO }}</td>
													<td>{{ row.dateCreated }} {{ row.timeCreated }}</td>

													<td>{{ row.EvolveUser_Name }}</td>
													<td>
														<span
															v-if="
																row.EvolvePR_Status == 'SAVED' ||
																	row.EvolvePR_Status == 'QADSUBMITED' ||
																	row.EvolvePR_Status == 'INRELEASE'
															"
														>
															<span v-if="row.EvolvePR_Status == 'SAVED'">
																NOT SUBMITED
															</span>
															<span v-else>{{ row.EvolvePR_Status }}</span>
														</span>
														<span v-else>
															<span
																v-for="il in row.indexList"
																:key="il.EvolveApprovalMatrixIndex_ID"
															>
																<span>
																	<button
																		type="button"
																		class="
                                      sc-button
                                      waves-effect
                                      sc-button-mini
                                      waves-button waves-light
                                    "
																		:style="
																			row.proccessDetails
																				.EvolveApprovalProcess_Status !=
																				'PROCESS' &&
																				row.proccessDetails
																					.EvolveApprovalProcess_Status !=
																				'SENDBACK' &&
																				row.proccessDetails
																					.EvolveApprovalProcess_Status !=
																				'REJECTED'
																				? 'background-color:GREEN'
																				: row.proccessDetails
																					.EvolveApprovalProcess_CurrentIndex >
																					il.EvolveApprovalMatrixIndex_Seq
																					? 'background-color:GREEN'
																					: row.proccessDetails
																						.EvolveApprovalProcess_CurrentIndex <
																						il.EvolveApprovalMatrixIndex_Seq
																						? 'background-color:#a3a375'
																						: row.proccessDetails
																							.EvolveApprovalProcess_CurrentIndex ==
																							il.EvolveApprovalMatrixIndex_Seq &&
																							row.proccessDetails
																								.EvolveApprovalProcess_Status ==
																							'ERROR'
																							? 'background-color:RED;'
																							: row.proccessDetails
																								.EvolveApprovalProcess_CurrentIndex ==
																								il.EvolveApprovalMatrixIndex_Seq &&
																								row.proccessDetails
																									.EvolveApprovalProcess_Status ==
																								'PROCESS'
																								? 'background-color:#d2d239;'
																								: row.proccessDetails
																									.EvolveApprovalProcess_CurrentIndex ==
																									il.EvolveApprovalMatrixIndex_Seq &&
																									row.proccessDetails
																										.EvolveApprovalProcess_Status ==
																									'SENDBACK'
																									? 'background-color:BLUE;'
																									: row.proccessDetails
																										.EvolveApprovalProcess_CurrentIndex ==
																										il.EvolveApprovalMatrixIndex_Seq &&
																										row.proccessDetails
																											.EvolveApprovalProcess_Status ==
																										'REJECT'
																										? 'background-color:PINK;'
																										: 'background-color:GREEN'
																		"
																		:data-uk-tooltip="il.ApproverDetails"
																	>
																		<i
																			:class="
																				row.proccessDetails
																					.EvolveApprovalProcess_Status !=
																					'PROCESS' &&
																					row.proccessDetails
																						.EvolveApprovalProcess_Status !=
																					'SENDBACK' &&
																					row.proccessDetails
																						.EvolveApprovalProcess_Status !=
																					'REJECTED'
																					? 'mdi mdi-checkbox-marked-circle'
																					: row.proccessDetails
																						.EvolveApprovalProcess_CurrentIndex >
																						il.EvolveApprovalMatrixIndex_Seq
																						? 'mdi mdi-checkbox-marked-circle'
																						: row.proccessDetails
																							.EvolveApprovalProcess_CurrentIndex <
																							il.EvolveApprovalMatrixIndex_Seq
																							? 'mdi mdi-arrow-right-bold-circle'
																							: row.proccessDetails
																								.EvolveApprovalProcess_CurrentIndex ==
																								il.EvolveApprovalMatrixIndex_Seq &&
																								row.proccessDetails
																									.EvolveApprovalProcess_Status ==
																								'ERROR'
																								? 'mdi mdi-close-circle'
																								: row.proccessDetails
																									.EvolveApprovalProcess_CurrentIndex ==
																									il.EvolveApprovalMatrixIndex_Seq &&
																									row.proccessDetails
																										.EvolveApprovalProcess_Status ==
																									'PROCESS'
																									? 'mdi mdi-sync'
																									: row.proccessDetails
																										.EvolveApprovalProcess_CurrentIndex ==
																										il.EvolveApprovalMatrixIndex_Seq &&
																										row.proccessDetails
																											.EvolveApprovalProcess_Status ==
																										'SENDBACK'
																										? 'mdi  mdi-arrow-left-bold-circle'
																										: row.proccessDetails
																											.EvolveApprovalProcess_CurrentIndex ==
																											il.EvolveApprovalMatrixIndex_Seq &&
																											row.proccessDetails
																												.EvolveApprovalProcess_Status ==
																											'REJECT'
																											? 'mdi mdi-checkbox-marked-circle'
																											: ''
																			"
																			style="color: white"
																			:data-uk-tooltip="il.ApproverDetails"
																		></i>
																	</button>
																</span>
															</span>

															<span
																v-for="ca in row.currentActionList"
																:key="ca.key"
																:data-uk-tooltip="ca.action"
															>
																<span>
																	<button
																		type="button"
																		class="
                                      sc-button
                                      waves-effect
                                      sc-button-mini
                                      waves-button waves-light
                                    "
																		:style="
																			ca.status == 'ERROR'
																				? 'background-color: RED ;'
																				: ca.status == 'SUCCESS'
																					? 'background-color: GREEN ;'
																					: ca.status == 'INPROCESS'
																						? 'background-color:#d2d239;'
																						: 'background-color:#a3a375'
																		"
																	>
																		<i
																			:class="ca.icon"
																			style="color: white"
																		></i>
																	</button>
																</span>
															</span>
														</span>
													</td>
													<td v-if="row.EvolvePR_Status == 'SUBMITED'">
														<span
															v-if="
																row.proccessDetails
																	.EvolveApprovalProcess_Status == 'SENDBACK' &&
																	row.proccessDetails
																		.EvolveApprovalProcess_IsOnGroundLevel == 1
															"
														>
															<span class="uk-label-warning">SENDBACK</span>
														</span>
														<span
															v-else-if="
																row.proccessDetails
																	.EvolveApprovalProcess_Status == 'REJECTED'
															"
														>
															<span class="uk-label uk-label-danger">REJECTED</span>
														</span>
														<span v-else>
															<span class="uk-label uk-label-success">SUBMITED</span>
														</span>
													</td>
													<td v-if="row.EvolvePR_Status == 'SAVED'">
														<span class="uk-label uk-label-primary">NOT SUBMITED</span>
													</td>
													<td v-if="row.EvolvePR_Status == 'APPROVED'">
														<span class="uk-label uk-label-success">APPROVED</span>
													</td>
													<td v-if="row.EvolvePR_Status == 'RELEASED'">
														<span class="uk-label uk-label-success">RELEASED</span>
													</td>
													<td v-if="row.EvolvePR_Status == 'QADSUBMITED'">
														<span class="uk-label uk-label-success">QADSUBMITED</span>
													</td>
													<td v-if="row.EvolvePR_Status == 'INRELEASE'">
														<span class="uk-label uk-label-primary">INRELEASE</span>
													</td>
													<td v-if="row.EvolvePR_Status == 'QADRELEASED'">
														<span class="uk-label uk-label-success">QADRELEASED</span>
													</td>
													<td v-if="row.EvolvePR_Status == 'ERRORQADSUBMIT'">
														<span class="uk-label uk-label-danger">ERRORQADSUBMIT</span>
													</td>
													<td v-if="row.EvolvePR_Status == 'ERRORQADRELEASE'">
														<span
															class="uk-label uk-label-danger"
															@click="onShowError(row.EvolvePR_ErrorDetails)"
														>ERRORQADRELEASE</span>
													</td>
													<td>
														<button
															title="Edit"
															class="
                                sc-button sc-button-primary
                                waves-effect
                                sc-button-mini
                                waves-button waves-light
                              "
															@click="onCreateOrEdit(row.EvolvePR_ID)"
														>
															<i class="mdi mdi-square-edit-outline"></i>
														</button>
														<!-- getSinglePrDetails -->
														<button
															v-if="isBuyer && row.isSubmitAllow"
															class="
                                sc-button sc-button-success
                                waves-effect
                                sc-button-mini
                                waves-button waves-light
                              "
															@click="
																submitOrReleaseSalesQuote(
																	row.EvolvePR_ID,
																	'SUBMITED',
																	row.EvolvePR_NO
																)
															"
														>
															SUBMIT PR
														</button>
													</td>
													<td>
														<button
															title="Show"
															class="
                                sc-button sc-button-primary sc-button-mini
                                waves-effect
                                sc-button-mini
                                waves-button waves-light
                              "
															@click="onCreateOrEditshowonly(row.EvolvePR_ID)"
														>
															<i class="mdi mdi-eye"></i>
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
										<!-- <EvolvePDF :reqdata="pdfData"></EvolvePDF>
										<JsPdf :reqdata="sqPdfData"></JsPdf> -->
									</client-only>
								</div>
							</div>
						</div>
					</div>

					<table id="sampleSQCsv" style="display: none !important">
						<tr>
							<th>CUSTOMER CODE</th>
							<th>BILL-TO</th>
							<th>SHIP-TO</th>
							<th>CURRENT OUT</th>
							<th>1-30 DAYS OUT</th>
							<th>30-60 DAYS OUT</th>
							<th>60-90 DAYS OUT</th>
							<th>90-180 DAYS OUT</th>

							<th>PO NO</th>
							<th>PO DATE</th>

							<th>CHANNEL</th>
							<th>PROJECT</th>
							<th>SALESPERSON CODE</th>
							<!-- <th>HEAD TAX CLASS</th> -->
							<!-- <th>CREDIT TERMS</th> -->
							<!-- <th>HEAD TAX ENV</th> -->
							<th>INWARD FREIGHT</th>
							<th>OUTWARD FREIGHT</th>

							<th>SHIP VIA</th>
							<th>PNF</th>

							<th>HEAD COMMENTS</th>
							<th>LINE NO</th>
							<th>ITEM CODE</th>
							<th>REXEL UNIT PRICE</th>
							<th>QTY</th>
							<th>CUST UNIT PRICE</th>
							<th>CUST DISCOUNT</th>
							<!-- <th>LINE TAX CLASS</th> -->
							<!-- <th>LINE TAX ENV</th> -->
							<th>REQD DATE</th>
							<th>PROMISE DATE</th>
							<th>DUE DATE</th>
							<th>LINE COMMENTS</th>
						</tr>
						<tr>
							<td>CUS00001</td>
							<td>CUS00001</td>
							<td>CUS00001</td>
							<td>1234</td>
							<td>123124</td>
							<td>123214</td>
							<td>213213</td>
							<td>111</td>
							<td>potest1234</td>
							<td>19-04-2021</td>

							<td>NORMAL</td>
							<td>Schneide</td>
							<td>Abhilash</td>
							<!-- <td>A18</td>
						<td>D010</td>
						<td>OST</td> -->
							<td></td>
							<td></td>
							<td></td>
							<td></td>

							<td>test head comments</td>
							<td>1</td>
							<td>04173</td>
							<td>500</td>
							<td>50</td>
							<td>800</td>
							<td>5</td>
							<!-- <td>A18</td>
						<td>OST</td> -->
							<td>19-04-2021</td>
							<td>20-04-2021</td>
							<td>21-04-2021</td>
							<td>line 1 comments</td>
						</tr>
					</table>
				</div>
			</div>
		</client-only>
	</div>
</template>
<style>
</style>
<script>
import { contains } from "jquery";
if (process.client) {
	require("~/plugins/daterangepicker");
	require("~/plugins/flatpickr");
	var Paginate = require("vuejs-paginate");
}
export default {
	head () {
		return {
			title: "Evolve - " + this.$route.name,
		};
	},
	layout: "eDefault",
	components: {
		// ScInput,
		Paginate,
		// EvolvePDF: process.client
		// 	? () => import("~/components/jspdf/evolvePDF")
		// 	: null,
		// JsPdf: process.client ? () => import('~/components/jspdf/sqDetails') : null,
	},

	data () {
		return {
			EvolveMenu_Id: this.$route.query.EvolveMenu_Id,
			pageURL: "/eDoa/Requisition/list",
			translate: {
				create: "Create",
				action: "Action",
				cancel: "Cancel",
				save: "Save",
				search_here: "Search Here",
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
			csvExportColums: [0, 1, 2, 3, 4, 5, 6],
			pdfExportColums: [0, 1, 2, 3, 4, 5, 6],
			/** End : EvolveDataTable */
			prList: [],
			editUrl: "/eDoa/Requisition/",
			showUrl: "/eDoa/Requisition/prDetails/",
			isCalling: false,
			errorDetails: "",
			sqPdfData: {},
			isBuyer: false,
		};
	},
	computed: {},
	mounted () {},
	beforeDestroy () {
		this.isCalling = false;
		// clearInterval(this.ramUpdateInterval);
	},
	created: async function () {
		this.removeModal();
		this.isCalling = true;
		this.getRequisitionList();
		// setInterval(() => this.getRequisitionList(), 5000);
	},
	beforeMount () {
		this.translateLanguage();
	},
	methods: {
		refreshPage: async function () {
			this.removeModal();
			this.isCalling = true;
			this.getRequisitionList();
		},
		onCreateOrEdit: async function (PR_ID) {
			//this.$root.$emit("onCloseTabCalled", '/evolve/menus/options');
			// this.$store.dispatch('removeOneTab', '/evolve/menus/options')
			if (PR_ID != "") {
				this.$store.dispatch("addNewTab", {
					title: "Update",
					url: "/eDoa/Requisition/option",
					params: {
						PR_ID: PR_ID,
					},
				});
			} else {
				this.$store.dispatch("addNewTab", {
					title: "Create",
					url: "/eDoa/Requisition/option",
				});
			}
		},
		onCreateOrEditshowonly: async function (PR_ID) {
			this.$store.dispatch("addNewTab", {
				title: "Show Only",
				url: "/eDoa/Requisition/showOnly",
				params: {
					PR_ID: PR_ID,
				},
			});
		},
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
		async notification (type = "danger", timeout = 3000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},
		/** Default Method For All Pages : End Here */
		/* Datatable Methods -- Start */
		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getRequisitionList();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getRequisitionList();
		},

		async downloadPdf () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolveSalesQuoteMaster").outerHTML;
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
					title: "EVOLVE SALES QUOTE LIST",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "sqList",
				},
			};
		},
		async downloadCsv () {
			let filename = "evolveSalesQuoteMaster";
			let csv = [];
			let html = document.getElementById("evolveSalesQuoteMaster").outerHTML;
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
		getRequisitionList: async function () {
			if (this.isCalling) {
				let list = await this.$axios
					.$post("/api/v1/eDoa/Requisition/getRequisitionList", {
						displayRecord: this.displayRecord,
						startFrom: this.startFrom,
						search: this.search,
						releasedSq: false,
					})
					.catch((e) => {
						this.notification(
							"danger",
							3000,
							"Problem with connecting to server!"
						);
					});
				console.log("list/???", list);
				if (list) {
					if (list.statusCode == 200) {
						this.isBuyer = list.result.isBuyer;
						this.prList = list.result.records;
						console.log("list.result>>>>>>>>>>>>>>>>>>>>>>>>>", list.result);

						for (let i = 0; i < this.prList.length; i++) {
							if (this.prList[i].EvolvePR_Status == "SAVED") {
								this.prList[i].isSubmitAllow = true;
								this.prList[i].isSaveAllow = true;
								this.prList[i].isReleaseAllow = false;
								this.prList[i].isAmendAllow = false;
							} else if (
								this.prList[i].EvolvePR_Status == "QADSUBMITED" ||
                this.prList[i].EvolvePR_Status == "ERRORQADRELEASE"
							) {
								this.prList[i].isSaveAllow = false;
								this.prList[i].isReleaseAllow = true;
								this.prList[i].isSubmitAllow = false;
								this.prList[i].isAmendAllow = true;
							} else if (this.prList[i].EvolvePR_Status == "SUBMITED") {
								this.prList[i].isSaveAllow = true;
								this.prList[i].isReleaseAllow = false;
								this.prList[i].isSubmitAllow = false;
								this.prList[i].isAmendAllow = false;
							} else if (
								this.prList[i].EvolvePR_Status == "RELEASED" ||
                this.prList[i].EvolvePR_Status == "APPROVED" ||
                this.prList[i].EvolvePR_Status == "INRELEASE"
							) {
								this.prList[i].isSaveAllow = false;
								this.prList[i].isReleaseAllow = false;
								this.prList[i].isSubmitAllow = false;
								this.prList[i].isAmendAllow = false;
							} else if (this.prList[i].EvolvePR_Status == "QADRELEASED") {
								this.prList[i].isSaveAllow = false;
								this.prList[i].isReleaseAllow = false;
								this.prList[i].isSubmitAllow = false;
								this.prList[i].isAmendAllow = true;
							}
						}

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
				console.log("list.result.isBuyer>>>", list);
			}
		},
		onInputSearch () {
			this.currentPage = 1;
			this.getRequisitionList();
			this.paginateClick(1);
		},

		// getSinglePrDetails: async function (EvolvePR_ID) {
		// 	this.$router.push(this.editUrl + EvolvePR_ID);

		// 	console.log("this.editUrl + EvolvePR_ID????? , this.editUrl + EvolvePR_ID",  this.editUrl + EvolvePR_ID)
		// },

		onShowError: async function (details) {
			this.errorDetails = details;

			UIkit.modal("#error_details").show();
		},
		submitOrReleaseSalesQuote: async function (EvolvePR_ID, type, EvolvePR_NO) {
			let message = "";
			if (type == "SUBMITED") {
				message = "Are You Sure To Submit Requisition No ";
			} else {
				message = "Are You Sure To Release Requisition No ";
			}

			let thisl = this;
			UIkit.modal.confirm(message + EvolvePR_NO + ".......!").then(
				async function () {
					thisl.loaderShow();
					let response = await thisl.$axios
						.$post("/api/v1/eDoa/Requisition/submitToApprovelProcess", {
							EvolvePR_ID: EvolvePR_ID,
							EvolveApprovalMatrix_ID: null,
							EvolvePR_Status: type,
						})
						.catch((e) => {
							thisl.notification(
								"danger",
								3000,
								"Problem with connecting to server!"
							);
						});
					if (response) {
						if (response.statusCode == 200) {
							// await thisl.onBackClick();
							thisl.notification("success", 3000, response.message);
						} else {
							thisl.notification("danger", 3000, response.message);
						}
					}
					// thisl.isSubmiting = false ;

					thisl.getRequisitionList();
					thisl.loaderHide();
				},
				function () {
					thisl.notification("danger", 3000, "User decline process.");
				}
			);
		},
		onAmendSQ: async function (EvolvePR_ID, EvolvePR_NO) {
			let thisl = this;
			UIkit.modal
				.confirm(
					"Are You Sure To Amend Sales Quote No " + EvolvePR_NO + ".......!"
				)
				.then(
					async function () {
						thisl.loaderShow();
						let response = await thisl.$axios
							.$post("/api/v1/eDoa/Requisition/changeSqStatusOnAmend", {
								EvolvePR_ID: EvolvePR_ID,
							})
							.catch((e) => {
								thisl.notification(
									"danger",
									3000,
									"Problem with connecting to server!"
								);
							});
						if (response) {
							if (response.statusCode == 200) {
								thisl.notification("success", 3000, response.message);
								thisl.$router.push(thisl.editUrl + EvolvePR_ID);
							} else {
								thisl.notification("danger", 3000, response.message);
							}
						}

						thisl.getRequisitionList();
						thisl.loaderHide();
					},
					function () {
						thisl.notification("danger", 3000, "User decline process.");
					}
				);
		},

		// SQ BY CSV

		onFileUpload: async function () {
			document.getElementById("uploadFile").click(); //do something}
		},

		onSelectFile: async function () {
			let fileData = this.$refs.uploadFile.files[0];

			// if(this.codeMasterKey != "" && this.codeMasterKey != undefined){
			if (fileData != "" && fileData != undefined) {
				if (fileData.type == "application/vnd.ms-excel") {
					this.loaderShow();
					let formData = new FormData();
					formData.append("fileData", fileData);
					// formData.append("keyValue", this.codeMasterKey);
					let config = { headers: { "Content-Type": "multipart/form-data" } };

					let fileUpload = await this.$axios
						.$post("/api/v1/eDoa/Requisition/uploadSqByCsv", formData, config)
						.catch((e) => {
							this.notification(
								"danger",
								3000,
								"Problem with connecting to server!"
							);
						});
					if (fileUpload) {
						if (fileUpload.statusCode == 200) {
							this.getRequisitionList();
							this.notification("success", 3000, fileUpload.message);
							// this.getGenericConfigMasterList();
							// this.codeMasterKey = "";
						} else {
							this.notification("danger", 3000, fileUpload.message);
							// this.codeMasterKey = "";
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
			// }
			// else{
			// 	this.notification("danger", 3000, "Please Select Key Data");
			// }
		},

		async downloadSample () {
			var csv = [];
			var rows = document.querySelectorAll("table#sampleSQCsv tr");
			for (var i = 0; i < rows.length; i++) {
				var row = [];
				var cols = rows[i].querySelectorAll("td, th");
				for (var j = 0; j < cols.length; j++) {
					row.push(cols[j].innerText);
				}
				csv.push(row.join(","));
			}

			// Download CSV file
			downloadCSV(csv.join("\n"), "sampleSQCsv.csv");
		},
		getSqPdf: async function (EvolvePR_ID) {
			let sqDetails = await this.$axios
				.$post("/api/v1/eDoa/Requisition/getSingleSqDetailsForPdf", {
					EvolvePR_ID: EvolvePR_ID,
				})
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (sqDetails.statusCode == 200) {
				let details = sqDetails.result;

				let columns = [{ title: "SQ NO", dataKey: "sqNo" }];

				this.sqPdfData = {
					type: "SQDetails",
					printData: {
						title: "Sales Quote Details",
						footer: "",
						sqHeadDetails: details.salesQuoteHead[0],
						tblColumns: columns,
						sqLineDetails: details.salesQuoteDetails,
						// colWidth : columnWidth,
						file_name: details.salesQuoteHead[0].EvolvePR_NO + ".pdf",
					},
				};
			} else {
				this.notification("danger", 3000, list.message);
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