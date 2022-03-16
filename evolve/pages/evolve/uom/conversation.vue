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
						{{ translate.uom_conversion_list }}
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
							data-uk-toggle="target : #CreateOrEditConversation"
							@click="clearData()"
						>
							{{ translate.add_conversion }}
						</button>
					</div>
				</div>
			</div>
		</client-only>
		<client-only>
			<div>
				<div id="CreateOrEditConversation"
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
									{{ translate.uom_conversion_details }}
								</h2>
							</div>
							<div class="uk-modal-body">
								<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
									<div>
										<label>{{ translate.item_code }}</label>
										<client-only>
											<Select2Search
												v-model="itemId"
												name="EvolveItem"
												:settings="{ 'width': '100%', 'placeholder': translate.select_item_code, allowClear: true }"
												:ajax-url="ItemAjaxUrl"
												:minimum-input-length="3"
												@change="onSelectItem()"
											></Select2Search>
										</client-only>
										<ul class="sc-vue-errors">
											<li v-if="!$v.itemId.required">
												{{ translate.item_code_is_required }}
											</li>
										</ul>
									</div>
								</div>
								<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
									<div>
										<label>{{ translate.from_conversion }}</label>
										<ScInput
											v-model="$v.fromConversation.$model"
											mode="outline"
											name="fromConversation"
											:error-class="$v.fromConversation.$error"
											:validator="$v.fromConversation"
											disabled
										></ScInput>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.fromConversation.required"
											>
												{{ translate.from_conversion_required }}*
											</li>
										</ul>
									</div>
									<div>
										<label>{{ translate.to_conversion }}</label>
										<Select2
											v-model="$v.toConversionId.$model"
											name="toConversionId"
											:settings="{ 'width': '100%', 'placeholder': translate.select_to_validation, allowClear: true }"
											:error-class="$v.toConversionId.$error"
											:validator="$v.toConversionId"
										>
											<option key value selected>
												{{ translate.select_to_conversion }}
											</option>
											<option
												v-for="uom in uomList"
												:key="uom.EvolveUom_ID"
												:value="uom.EvolveUom_ID"
											>
												{{ uom.EvolveUom_Uom }}
											</option>
										</Select2>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.toConversionId.required"
											>
												{{ translate.to_conversion_is_required }}
											</li>
										</ul>
									</div>
								</div>

								<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
									<div>
										<label>{{ translate.conversation_value }}</label>
										<ScInput
											v-model="$v.conversationValue.$model"
											mode="outline"
											:placeholder="translate.enter_uom_conversation_value"
											name="conversationValue"
											:error-class="$v.conversationValue.$error"
											:validator="$v.conversationValue"
										></ScInput>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.conversationValue.required"
											>
												{{ translate.conversation_value_is_required }} *
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
										@click="CreateOrUpdateConversation($event)"
									>
										{{ translate.save }}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
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
										<table id="evolveUomConvMaster" class="uk-table uk-table-striped">
											<thead>
												<tr>
													<th>{{ translate.item_code }}</th>
													<th>{{ translate.from_conversion }}</th>
													<th>{{ translate.to_conversion }}</th>
													<th>{{ translate.conversion_value }}</th>
													<th>{{ translate.options }}</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(uc,index) in uomConvList" :key="index">
													<td>{{ uc.EvolveItem_Code }}</td>
													<td>{{ uc.Uom }}</td>
													<td>{{ uc.AlternateUom }}</td>

													<td>{{ uc.EvolveUomConv_Conversion }}</td>
													<td>
														<button
															title="Edit"
															class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
															@click="getSingleUomConversation(uc.EvolveUomConv_ID)"
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
		</client-only>
	</div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import customValidators from "~/plugins/vuelidateValidators";
import ScInput from "~/components/Input";
import ScTextarea from "~/components/Textarea";
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
		ScInput,
		Select2: process.client ? () => import("~/components/Select2") : null,
		Select2Search: process.client
			? () => import("~/components/ajaxSearch/Select2Search")
			: null,
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
				uom_conversion_list: "Uom Conversion List",
				add_conversion: "Add Conversion",
				uom_conversion_details: "Uom Conversion Details",
				item_code: "Item Code",
				item_code_is_required: "Item Code Is Required",
				from_conversion: "From Conversion",
				from_conversion_required: "From Conversion required ",
				to_conversion: "To Conversion ",
				select_to_conversion: "Select to conversion",
				to_conversion_is_required: "To conversion Is Required",
				conversation_value: "Conversation Value",
				conversation_value_is_required: "Conversation Value is required",
				cancel: "Cancel",
				save: "Save",
				conversion_value: "Conversion Value",
				options: "Options",
				pdf: "PDF",
				csv: "CSV",
				select_item_code: "Select Iteam Code",
				select_to_validation: "Select To Validation...",
				enter_uom_conversation_value: "Enter UOM Conversation Value",
				upload_csv: "UPLOAD CSV",
			},
			ip: "",
			uomConvList: [],
			fromConversationType: "",
			fromConversation: "",
			fromConversationId: null,
			itemId: "",
			ItemAjaxUrl:
        this.$axios.defaults.baseURL + "/api/v1/smartFactory/Reports/getItem",
			uomList: [],
			toConversionId: "",
			conversationId: null,
			conversationValue: "",
			userId: this.$store.state.auth.user.EvolveUser_ID,
			token: this.$auth.getToken("local"),
			deleteApi: "/api/v1/evolve/deleteRole",
			baseURL: this.$axios.defaults.baseURL,
			treeMenuApi: "/api/v1/evolve/getAppMenuByAppId",
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
		};
		// data table end
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
		this.getUomConversationList();
		this.getUomList();
	},
	validations: {
		itemId: {
			required,
		},
		fromConversation: {
			required,
		},
		toConversionId: {
			required,
		},
		conversationValue: {
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
		//common function ended
		/* Datatable Methods -- Start */
		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getUomConversationList();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getUomConversationList();
		},

		async downloadPdf () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolveUomConvMaster").outerHTML;
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
					title: "Evolve Uom Conversion Master",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveUomConvMaster",
				},
			};
		},
		async downloadCsv () {
			let filename = "evolveUomConvMaster";
			let csv = [];
			let html = document.getElementById("evolveUomConvMaster").outerHTML;
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
			this.fromConversationId = null;
			this.toConversionId = "";
			this.fromConversation = "";
			this.itemId = "";
			this.conversationId = null;
			this.conversationValue = "";
		},

		async onSelectItem () {
			let getdefultUom = await this.$axios
				.$post("/api/v1/evolve/uom/getdefaultUom", {
					EvolveItem_ID: this.itemId,
				})
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});

			if (getdefultUom) {
				if (getdefultUom.statusCode == 200) {
					this.fromConversation = getdefultUom.result.EvolveUom_Uom;
					this.fromConversationId = getdefultUom.result.EvolveUom_ID;
				} else {
					this.notification("danger", 3000, getdefultUom.message);
				}
			}
		},

		async getUomConversationList () {
			let list = await this.$axios
				.$post("/api/v1/evolve/uom/getAllConversationList", {
					displayRecord: this.displayRecord,
					startFrom: this.startFrom,
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
					this.uomConvList = list.result.records;
					if (list.result.noOfRecord > 0) {
						this.pageCount = Math.ceil(
							list.result.noOfRecord / this.displayRecord
						);
					}
				} else {
					this.notification("danger", 3000, list.message);
				}
			}
		},

		async getUomList () {
			let getUomList = await this.$axios
				.$get("/api/v1/evolve/uom/getUomList")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});

			if (getUomList) {
				if (getUomList.statusCode == 200) {
					this.uomList = getUomList.result;
				} else {
					this.notification("danger", 3000, getUomList.message);
				}
			}
		},

		async CreateOrUpdateConversation (e) {
			e.preventDefault();
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.notification("danger", 3000, "Please fill in the required fields");
			} else {
				if (this.fromConversationId == this.toConversionId) {
					this.notification(
						"danger",
						3000,
						"From conversion and to conversion can't be same"
					);
				} else {
					if (this.conversationId == null) {
						let data = {
							EvolveItem_ID: parseInt(this.itemId),
							EvolveUomConv_AlternateUom_ID: parseInt(this.toConversionId),
							EvolveUom_ID: parseInt(this.fromConversationId),
							EvolveUomConv_Conversion: this.conversationValue,
						};

						let checkExistConversion = await this.$axios.$post(
							"/api/v1/evolve/uom/checkExistingConversion",
							data
						);

						if (checkExistConversion.result > 0) {
							this.notification("danger", 3000, "Validation already exit ");
						} else {
							let details = {
								EvolveItem_ID: parseInt(this.itemId),
								EvolveUomConv_AlternateUom_ID: parseInt(this.toConversionId),
								EvolveUom_ID: parseInt(this.fromConversationId),
								EvolveUomConv_Conversion: this.conversationValue,
							};
							let createConversation = await this.$axios.$post(
								"/api/v1/evolve/uom/createUomConversation",
								details
							);
							if (createConversation.statusCode != 200) {
								this.notification("danger", 3000, createConversation.message);
							} else {
								this.notification("success", 3000, createConversation.message);
								UIkit.modal("#CreateOrEditConversation").hide();
								this.clearData();
								this.getUomConversationList();
							}
						}
					} else {
						let data = {
							EvolveUomConv_ID: parseInt(this.conversationId),
							EvolveItem_ID: parseInt(this.itemId),
							EvolveUomConv_AlternateUom_ID: parseInt(this.toConversionId),
							EvolveUom_ID: parseInt(this.fromConversationId),
							EvolveUomConv_Conversion: this.conversationValue,
						};

						let checkExistConversion = await this.$axios.$post(
							"/api/v1/evolve/uom/checkExistingConversiononUpdate",
							data
						);

						if (checkExistConversion.result > 0) {
							this.notification("danger", 3000, "Validation already exit ");
						} else {
							let details = {
								EvolveUomConv_ID: parseInt(this.conversationId),
								EvolveItem_ID: parseInt(this.itemId),
								EvolveUomConv_AlternateUom_ID: parseInt(this.toConversionId),
								EvolveUom_ID: parseInt(this.fromConversationId),
								EvolveUomConv_Conversion: this.conversationValue,
							};
							let updateUomConversation = await this.$axios.$post(
								"/api/v1/evolve/uom/updateConversion",
								details
							);
							if (updateUomConversation.statusCode != 200) {
								this.notification(
									"danger",
									3000,
									updateUomConversation.message
								);
							} else {
								this.notification(
									"success",
									3000,
									updateUomConversation.message
								);
								UIkit.modal("#CreateOrEditConversation").hide();
								this.clearData();
								this.getUomConversationList();
							}
						}
					}
				}
			}
		},

		getSingleUomConversation: async function (id) {
			this.conversationId = id;

			const conversationDetails = await this.$axios.$post(
				"/api/v1/evolve/uom/selectSingleConversation",
				{ EvolveUomConv_ID: parseInt(this.conversationId) }
			);
			if (conversationDetails) {
				if (conversationDetails.statusCode == 200) {
					UIkit.modal("#CreateOrEditConversation").show();
					this.fromConversation = conversationDetails.result.fromUom;
					this.fromConversationId =
            conversationDetails.result.EvolveUom_ID + "";
					this.toConversionId =
            conversationDetails.result.EvolveUomConv_AlternateUom_ID + "";
					this.itemId = conversationDetails.result.EvolveItem_ID;
					this.conversationValue =
            conversationDetails.result.EvolveUomConv_Conversion + "";
				} else {
					this.notification("danger", 3000, conversationDetails.message);
				}
			}
		},
	},
};
</script>
