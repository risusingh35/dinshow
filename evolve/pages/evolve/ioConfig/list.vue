<template>
	<div class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="getConfigList()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
			</div>
			 
			<div v-if="params.EvolveMenu_Id" class="evolve-page-header-icons">
				<a href="javascript:void(0)" data-uk-tooltip="title: Add To Favourite; pos: right" class="sc-actions-icon mdi mdi-star md-color-yellow-600" @click="$store.dispatch('addToFavouriteClick', params.EvolveMenu_Id)"></a>
			</div>
			<div class="evolve-page-header-icons evolve-float-right"> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click="$store.dispatch('removeOneTab', '/evolve/ioConfig/list')"></a>
			</div>

			<div class="evolve-page-header-icons evolve-float-right"> 
				<button
					class="sc-button datatable-print-button"
					type="button"
					@click="clearData()"
				>
					{{ translate.add_config }}
				</button>
			</div>
			 
			<div class="evolve-page-header-icons evolve-float-right">
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-excel md-color-indigo-600" @click="downloadCsv()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-pdf md-color-red-600" @click="downloadPdf()"></a>
			</div>
		</div>
		<client-only>
			<div id="sc-page-content" class="evolve-page-body">
				<div id="nav-mdi" class="uk-card">
					<div class="uk-card-body min-height-back">
						<div id="configModel"
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
											{{ translate.io_configuration }}
										</h2>
									</div>
									<div class="uk-modal-body">
										<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
											<div>
												<label>{{ translate.io_configuration_key }}* </label>
												<ScInput v-model="$v.configKey.$model"
													mode="outline"
													:placeholder="translate.enter_configuration_key"
													name="configKey"
													:error-class="$v.configKey.$error"
													:validator="$v.configKey"
												>
												</ScInput>
												<ul class="sc-vue-errors">
													<li v-if="!$v.configKey.required">
														{{ translate.io_configuration_key_required }}*
													</li>
												</ul>
											</div>
											<div>
												<label>{{ translate.io_configuration_value }}* </label>
												<ScInput v-model="$v.configValue.$model"
													mode="outline"
													:placeholder="translate.enter_configuration_value"
													name="configValue"
													:error-class="$v.configValue.$error"
													:validator="$v.configValue"
												>
												</ScInput>
												<ul class="sc-vue-errors">
													<li v-if="!$v.configValue.required">
														{{ translate.io_configuration_value_required }}*
													</li>
												</ul>
											</div>
										</div>
										<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
											<div>
												<label>{{ translate.io_configuration_discription }}</label>
												<ScTextarea v-model="configDesc"
													mode="outline"
													:placeholder="translate.enter_configuration_discription"
													name="configDesc"
													:rows="1"
												>
												</sctextarea>
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
										<button class="sc-button " type="button" :disabled="responseSendTime == false" @click="addOrEditConfig($event)">
											{{ translate.save }}
										</button>
									</div>
								</form>
							</div>
						</div>
						<div class="uk-child-width-1-5@m uk-grid" data-uk-grid>
							<div>
								<div>
									<button class="sc-button sc-button-primary full-width" type="button" @click="downloadSample()">
										{{ translate.csv_demo_download }}
									</button>
								</div>
							</div>
							<div></div>
							<div></div>
							<div>
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
								<div>
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
									<input v-model="search"
										type="text"
										:placeholder="translate.search_here"
										style="float: right !important;"
										@input="onInputSearch()"
									>
								</client-only>
								<client-only>
									<table id="evolveIOConfiguration" class="uk-table uk-table-striped">
										<thead>
											<tr>
												<th>{{ translate.configration_key }}</th>
												<th>{{ translate.configration_value }}</th>
												<th>{{ translate.configration_description }}</th>
												<th>{{ translate.action }}</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="ck in configList" :key="ck.EvolveConfig_ID">
												<td>{{ ck.EvolveIOConfig_Key }}</td>
												<td>{{ ck.EvolveIOConfig_Value }}</td>
												<td>{{ ck.EvolveIOConfig_Desc }}</td>
												<td>
													<button 
														class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
														@click="getSingleConfigData(ck.EvolveIOConfig_ID)"
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
									<client-only>
										<EvolvePDF :reqdata="pdfData"></EvolvePDF>
									</client-only>
								</client-only>
							</div>
						</div>
					</div>
				</div>
			</div>
			<table id="sampleIOConfigData" style="display : none !important">
				<tr>
					<th>{{ translate.key }}</th>
					<th>{{ translate.value }}</th>
					<th>{{ translate.description }}</th>
				</tr>
				<tr>
					<td>EMAIL</td>
					<td>evolve@admin.com</td>
					<td>Evolve Email ID</td>
				</tr>
			</table>
		</client-only>
	</div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import ScInput from '~/components/Input'
import ScTextarea from '~/components/Textarea'
import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators'
import moment from '~/plugins/moment'
if (process.client) {
	var Paginate = require("vuejs-paginate");
}
export default {
	head () {
		return {
			'title': 'Evolve - ' + this.$route.name
		}
	},
	layout: 'eDefaultV2',
	components: {
		ScInput,
		ScTextarea,
		Paginate,
		EvolvePDF: process.client
			? () => import("~/components/jspdf/evolvePDF")
			: null,
	},
	mixins: [validationMixin],
	props: {
		params: {
			type: Object,
			default: () => {}
		}
	},
	data () {
		return {
			translate: {
				cancel: "Cancel",
				save: "Save",
				configration_key: "Configration Key",
				configration_value : "Configration Value",
				configration_description : "Configration Description",
				action : "Action",
				csv : "CSV",
				pdf : "PDF",
				add_config : "ADD Config",
				io_configuration : "IO Configuration",
				io_configuration_key : "IO CONFIGURATION KEY",
				enter_configuration_key : "Please Enter IO Congiguration Key",
				io_configuration_key_required : "IO Configuration Key Is Required",
				io_configuration_value : "IO Configuration Value",
				enter_configuration_value : "Please Enter IO Configuration Value",
				io_configuration_value_required : "IO Configuration Value Required",
				io_configuration_discription : "IO Configuration Discription",
				enter_configuration_discription : "Plaese Enter Configuration Discription",
				search_here : "Search Here",
				csv_demo_download: "Csv Demo Download ",
				csv_upload: "CSV Upload",
				upload: "UPLOAD",
				key: "KEY",
				value: "VALUE",
				description: "DESCRIPTION",
			},
			ip : "",
			configList : [],
			configKey : '',
			configValue : '',
			configDesc : '',
			configId : null,
			ConfigCsv: "",

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
			unitConfigList : [],
			search : '',			
			responseSendTime : true,
			/** End : EvolveDataTable */
		}
	},
	computed: {
	},
	mounted () {
		this.$root.$on('onChangeLanguage', () => {
			console.log("Language Changed.....")
			this.translateLanguage()
		});
	},
	created () {
		 this.removeModal();
		this.getConfigList();
		// this.getBusinessLineList();
	},
	beforeMount () {
		this.translateLanguage()
	},
	validations: {
		configKey: {
			required,
		},
		configValue: {
			required
		},
	},
	methods: {
		// defult functions
		translateLanguage: async function () {
			let languageId = this.$auth.$storage.getLocalStorage('EvolveLanguage_ID');
			if (languageId != undefined) {
				const languageTranstale = await this.$axios.$post('/api/v1/evolve/translate', { languageId: languageId, translate: this.translate }).catch(e => {
				});
				if (languageTranstale) {
					let tra = this.translate;
					Object.keys(this.translate).forEach(function (key) {
						languageTranstale.result.forEach(function (obj) {
							if (obj.EvolvelLabel_KeyWord == key) {
								tra[key] = obj.EvolveLabel_Term;
							}
						})
					});
				}
			}
		},

		removeModal: async function (e) {
			$(".uk-modal").remove(); // Remove Old Model From DOM
		},
		async notification (type = 'danger', timeout = 3000, message = '') {
			let config = {
				timeout: timeout,
				status: type
			};
			UIkit.notification(message, config);
		},
		// defult functiond end
		getConfigList : async function (){
			let list = await this.$axios.$post('/api/v1/evolve/ioConfig/getConfigList', {
				displayRecord: this.displayRecord,
				startFrom: this.startFrom,
				search : this.search
			}).catch(e => 
			{
				this.notification('danger', 3000, 'Problem with connecting to server!');
			});
			if (list.statusCode == 200) {
				this.configList = list.result.records;
				if (list.result.noOfRecord > 0) {
					this.pageCount = Math.ceil(
						list.result.noOfRecord / this.displayRecord
					);
				}else{
					this.pageCount=0
				}
		
			} else {
				this.notification('danger', 3000, list.message)
			}
		},
		clearData : async function (){
			this.$v.$reset();
			this.configId = null ;
			this.configKey = '';
			this.configValue = '';
			this.configDesc = '';
			UIkit.modal("#configModel").show();
		},
		addOrEditConfig: async function (e) {
			e.preventDefault();
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.notification("danger", 3000, "Please Fill All Required Fileds");
			}
			else 
			{
				if(this.configId == null)
				{
					this.responseSendTime = false;
					let addConfig = await this.$axios.$post('/api/v1/evolve/ioConfig/addConfig', 
						{ 
							EvolveIOConfig_Key: this.configKey, 
							EvolveIOConfig_Value : this.configValue,
							EvolveIOConfig_Desc : this.configDesc
						}).catch(e => 
					{ 
						this.notification('danger', 3000, 'Problem with connecting to server!');
					});
					if(addConfig.statusCode == 200){
						this.notification('success', 3000, addConfig.message);
						this.getConfigList();
						this.responseSendTime = true;
						UIkit.modal("#configModel").hide();
					}
					else
					{
						this.responseSendTime = true;
						this.notification('danger', 3000, addConfig.message);
					}
				}
				else{
					this.responseSendTime = false;
					let updateConfig = await this.$axios.$post('/api/v1/evolve/ioConfig/updateConfig', 
						{
							EvolveIOConfig_ID: this.configId, 
                         	EvolveIOConfig_Key: this.configKey, 
							EvolveIOConfig_Value : this.configValue,
							EvolveIOConfig_Desc : this.configDesc   
						}).catch(e => 
					{
						 this.notification('danger', 3000, 'Problem with connecting to server!');
					});
					if(updateConfig.statusCode == 200){
						this.notification('success', 3000, updateConfig.message);
						this.getConfigList();
						this.responseSendTime = true;
						UIkit.modal("#configModel").hide();
					}
					else
					{
						this.responseSendTime = true;
						this.notification('danger', 3000, updateConfig.message);
					}
				}
			}
			
		},
		getSingleConfigData: async function (id){
			this.configId = parseInt(id)
			let data = await this.$axios.$post('/api/v1/evolve/ioConfig/getSingleConfigData', { EvolveIOConfig_ID : this.configId});
			if(data.statusCode == 200){
				this.configKey = data.result.EvolveIOConfig_Key
				this.configValue = data.result.EvolveIOConfig_Value
				this.configDesc = data.result.EvolveIOConfig_Desc
				UIkit.modal("#configModel").show();
			}else{
				this.notification('danger', 3000, data.message);
			}
		},

		//Data Table -- Start

		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getConfigList();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getConfigList();
		},

		async downloadPdf () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolveIOConfiguration").outerHTML;
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
					title: "Evolve IO Configuration",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "EvolveIOConfiguration",
				},
			};
		},
		
		async downloadCsv () {
			let filename = "EvolveIOConfiguration";
			let csv = [];
			let html = document.getElementById("evolveIOConfiguration").outerHTML;
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
		async handleFileUpload () {
			this.ConfigCsv = this.$refs.csvFile.files[0];
		},
		async uploadFile () {
			if (this.ConfigCsv != "") {
				this.loaderShow();
				let formData = new FormData();
				formData.append("csvFile", this.ConfigCsv);
				const config = { headers: { "Content-Type": "multipart/form-data" } };
				let csvUploadData = await this.$axios.$post("/api/v1/evolve/ioConfig/CsvConfigUpload", formData, config)
					.catch((e) => {this.notification("danger", 3000, "Problem with connecting to server!");});
				if (csvUploadData) {
					if (csvUploadData.statusCode == 200) {
						this.notification("success", 3000, csvUploadData.message);
						this.getConfigList();
						this.loaderHide();
						this.$refs.csvFile.files[0].value = "";
						document.getElementById("csvFile").value = "";
						this.ConfigCsv = "";
					} else {
						if (Array.isArray(csvUploadData.message)) {
							for (let j = 0; j < csvUploadData.message.length; j++) {
								this.notification("danger", 3000, csvUploadData.message[j]);
							}
						} else {
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
			var rows = document.querySelectorAll("table#sampleIOConfigData tr");
			for (var i = 0; i < rows.length; i++) {
				var row = [];
				var cols = rows[i].querySelectorAll("td, th");
				for (var j = 0; j < cols.length; j++) {
					row.push(cols[j].innerText);
				}
				csv.push(row.join(","));
			}
			downloadCSVSample(csv.join("\n"), "EvolveIOConfig.csv");
		},
		onInputSearch (){
			this.currentPage = 1
			this.getConfigList();
			this.paginateClick(1);
		},

		//Data Table -- End
	}
}
function downloadCSVSample (csv, filename) {
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

<style>

    /* .uk-position-top-right{
        top : 24px;
    }
	#languageList {
		width: 100%;
	}

	#languageList thead tr th {
		text-transform: uppercase;
		background-color: #5b9bd5;
		color: white;
		padding: 2px;
		font-size: 14px;
	}

	#languageList tbody tr {
		background-color: #d2deef;
		padding: 2px;
		font-size: 14px;
	}

	#languageList tbody tr:nth-child(even) {
		background-color: #f2f2f2;
	}

	#languageList .total {
		background-color: #9cc0ff !important;
	}

	#languageList .zone {
		background-color: #a9d18e !important;
	}

	#languageList .zone th {
		text-decoration: underline;
	}

	#languageList tbody tr td {
		font-weight: bold;
		padding-left: 5px;
		font-size: 12px;
		text-align: left;
	}

	#languageList tbody tr th {
		padding: 2px;
		font-size: 14px;
		font-weight: bold;
		text-transform: uppercase;
		text-align: center;
	} */
</style>
