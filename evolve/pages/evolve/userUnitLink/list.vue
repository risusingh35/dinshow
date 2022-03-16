<template>
	<div class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="getUserUnitLink()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
			</div>
			 
			<div class="evolve-page-header-icons">
				<a href="javascript:void(0)" data-uk-tooltip="title: Add To Favourite; pos: right" class="sc-actions-icon mdi mdi-star md-color-yellow-600" @click="$store.dispatch('addToFavouriteClick', '/evolve/userUnitLink/list')"></a>
			</div>

			<div class="evolve-page-header-icons">
				<client-only>
					<Select2Search
						v-model="userId"
						name="userId"
						:settings="{ 'width': '100%', 'placeholder': 'User', allowClear: true }"
						:ajax-url="getUserList"
						:minimum-input-length="3"
					></Select2Search>
					<Select2Search
						v-model="unitId"
						name="unitId"
						:settings="{ 'width': '100%', 'placeholder': 'Unit', allowClear: true }"
						:ajax-url="getUnitList"
						:minimum-input-length="3"
					></Select2Search>

					<Select2Search
						v-model="roleId"
						name="unitId"
						:settings="{ 'width': '100%', 'placeholder': 'Role', allowClear: true }"
						:ajax-url="getRoleList"
						:minimum-input-length="3"
					></Select2Search>
					<div class="evolve-page-header-icons">
						<a href="javascript:void(0)" data-uk-tooltip="title: Search; pos: right" class="sc-actions-icon mdi mdi-file-search-outline md-color-blue-600" @click="getUserUnitLink()"></a>
					</div>
				</client-only>
			</div>


			<div class="evolve-page-header-icons evolve-float-right"> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click=" $destroy();$store.dispatch('removeOneTab', '/evolve/userUnitLink/list')"></a>
			</div>
			<div class="evolve-page-header-icons evolve-float-right"> 
				<button
					class="sc-button datatable-print-button"
					type="button"
					data-uk-toggle="target: #addEditAppMaster"
					@click="addUserToUnitLink('')"
				>
					LINK USER TO SITE
				</button>
			</div>
			<div class="evolve-page-header-icons evolve-float-right">
				<a class="sc-actions-icon mdi mdi-file-excel md-color-indigo-600" @click="downloadCsv()"></a>
				<a class="sc-actions-icon mdi mdi-file-pdf md-color-red-600" @click="downloadPdf()"></a>
				<!-- <a href="javascript:void(0)" class="sc-actions-icon mdi mdi-printer md-color-cyan-600"></a> -->
			</div>
		</div>
		<client-only>
			<div class="evolve-page-body">
				<div id="settings" class="uk-modal" data-uk-modal>
					<div class="uk-modal-dialog">
						<button
							class="uk-modal-close-default"
							type="button"
							data-uk-close
						></button>
						<div class="uk-modal-header">
							<h2 class="uk-modal-title">
								FIELDS TO BE DISPLAYED
							</h2>
						</div>
						<div class="uk-modal-body">
							<div class="uk-child-width-1-1@m uk-grid" data-ul-grid>
								<div>
									<tr v-for="(row, index) in settingList" :key="index">
										<PrettyCheck v-model="row.isShow" class="p-icon" name="isActive">
											<i slot="extra" class="icon mdi mdi-check"></i>
										</PrettyCheck>	{{ row.label }}
									</tr>
								</div>
							</div>
						</div>
					</div>
				</div>	
				<div id="filteration" class="uk-modal" data-uk-modal>
					<div class="uk-modal-dialog">
						<button
							class="uk-modal-close-default"
							type="button"
							data-uk-close
						></button>
						<div class="uk-modal-header">
							<h2 class="uk-modal-title">
								FILTERATION
							</h2>
						</div>
						<div class="uk-modal-body">
							<div class="uk-child-width-1-1@m uk-grid" data-ul-grid>
								<div>
									<div class="uk-child-width-1-3@m uk-grid" data-ul-grid>
										<div>
											<label>FIELD NAME</label>
											<client-only>
												<Select2
													v-model="$v.searchField.$model"
													:settings="{ 'width': '100%', 'placeholder': 'Field Name...', 'closeOnSelect': false }"
													name="searchField"
													:error-class="$v.searchField.$error"
													:validator="$v.searchField"
												>
													<option
														
														key=""
														value=""
													>
													</option>
													<option
														v-for="field in settingList"
														:key="field.value"
														:value="field.value"
													>
														{{ field.label }}
													</option>
												</Select2>
												<ul class="sc-vue-errors">
													<li
														v-if="!$v.searchField.required"
													>
														SEARCH FIELD REQUIRED
													</li>
												</ul>
											</client-only>
										</div>
										<div>
											<label>OPERATION</label>
											<client-only>
												<Select2
													v-model="$v.searchOperation.$model"
													:settings="{ 'width': '100%', 'placeholder': 'Operation...', 'closeOnSelect': false }"
													name="searchOperation"
													:error-class="$v.searchOperation.$error"
													:validator="$v.searchOperation"
												>
													<option
														
														key=""
														value=""
													>
													</option>
													<option
														v-for="operator in operatorList"
														:key="operator.key"
														:value="operator.key"
													>
														{{ operator.value }}
													</option>
												</Select2>
												<ul class="sc-vue-errors">
													<li
														v-if="!$v.searchOperation.required"
													>
														OPERATION REQUIRED
													</li>
												</ul>
											</client-only>
										</div>
										<div>
											<label>VALUE</label>
											<ScInput
												v-model="$v.searchValue.$model"
												name="searchValue"
												mode="outline"
												placeholder="Value"
												:error-class="$v.searchValue.$error"
												:validator="$v.searchValue"
											></ScInput>
											<ul class="sc-vue-errors">
												<li
													v-if="!$v.searchValue.required"
												>
													SEARCH VALUE REQUIRED
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div class="uk-modal-footer uk-margin-top uk-text-right">
								<button
									class="sc-button sc-button-flat sc-button-flat-danger uk-modal-close"
									type="button"
								>
									CANCEL
								</button>
								<button class="sc-button" type="button" @click="addSearchList($event)">
									SAVE
								</button>
							</div>
						</div>
					</div>
				</div>

				<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
					<div class="uk-overflow-auto">
						<select
							v-model="displayRecord"
							@change="onDisplayRecordChange($event)"
						>
							<option v-for="dr in displayRow" :key="dr" :value="dr">
								{{ dr }}
							</option>
						</select>
						<button
							title="Edit"
							class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
							style="float: right !important"
							@click="viewSetting()"
						>
							<i class="mdi mdi-settings"></i>
						</button>

						
						<input
							v-model="search"
							type="text"
							placeholder="Search Here"
							style="float: right !important"
							@input="onInputSearch()"
						>

						<client-only>
							<table id="evolveUserUnitRoleLinkTable" class="uk-table uk-table-striped">
								<thead>
									<tr>
										<no-ssr v-for="(row, index) in settingList" :key="index">
											<th v-if="row.isShow">
												{{ row.label }}
											</th>
										</no-ssr>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(row, index) in userUnitLink" :key="index">
										<no-ssr v-for="(label, indexlabel) in settingList" :key="indexlabel">
											<td v-if="label.isShow && ((label.label).toLowerCase() !='options') && (label.label).toLowerCase() !='status'">
												{{ row[`${label.value}`] }}
											</td>
											<td v-if="label.isShow && (label.label).toLowerCase() == 'status'">
												<span v-if="row[`${label.value}`] == true">
													<span class="uk-label uk-label-success">active</span>
												</span>
												<span v-else>
													<span class="uk-label uk-label-danger">deactive</span>
												</span>
											</td>
											<td v-if="label.isShow && (label.label).toLowerCase() == 'options'">
												<span v-if="row[`${label.value}`]">


													<button
														class="sc-button sc-button-small sc-button-danger  datatable-print-button"
														type="button"
														@click="ActiveDeActiveLink(index ,0)"
													>
														De-Active
													</button>
												</span>
												<span v-else>
													<button
														class="sc-button sc-button-small sc-button-success datatable-print-button"
														type="button"
														@click="ActiveDeActiveLink(index ,1)"
													>
														Active
														
													</button>
												</span>
											</td>
										</no-ssr>
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
							<no-ssr>
								<EvolvePDF :reqdata="pdfData"></EvolvePDF>
							</no-ssr>
						</client-only>
					</div>
				</div>
			</div>
		</client-only>
	</div>
</template>

<style>
.icons_selections {
  height: 200px !important;
  overflow: auto;
}
</style>

<script>
import { validationMixin } from "vuelidate";
import { uniqueID } from "~/assets/js/scutum_common";
import ScInput from "~/components/Input";
import PrettyCheck from "pretty-checkbox-vue/check";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";




if (process.client) {
	// require("~/plugins/daterangepicker");
	require("~/plugins/flatpickr");
	require("~/assets/js/vendor/jquery.quicksearch.js");
	var Paginate = require("vuejs-paginate");
}

export default {
    
	head () {
		return {
			title: "Evolve - " + this.$route.path,
		};
	},
	layout: "eDefaultV2",
    
	components: {
		Select2Search: process.client ? () => import("~/components/ajaxSearch/Select2Search") : null,

		ScInput,
		Select2: process.client ? () => import("~/components/Select2") : null,
		Paginate,
		EvolvePDF: process.client
			? () => import("~/components/jspdf/evolvePDF")
			: null,
		PrettyCheck,

	},
	mixins: [validationMixin],

	data () {
		return {
			translate : {
			

				user_unit_link : 'User Unit Link',
				user_unit_link_create : 'User Unit Link Create'

                
			},
            
			userUnitLink : [],
			userId : '',
			unitId : '',
			roleId : '',
			// itemId : '',
			companyId : '',
			unitList : [],
			getUserList	: this.$axios.defaults.baseURL+'api/v1/evolve/UserUnitLink/getUserList',
			getUnitList	: this.$axios.defaults.baseURL+'api/v1/evolve/UserUnitLink/getUnitList',
			getRoleList	: this.$axios.defaults.baseURL+'api/v1/evolve/UserUnitLink/getRoleList',


			companyList : [],

			/** Start : EvolveDataTable */
			currentPage: 1,
			pageCount: 0,
			displayRecord: 25,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1, 2, 3, 4, 5, 6, 7, 8],
			pdfExportColums: [0, 1, 2, 3, 4, 5, 6, 7, 8],	
			search : "",		
			/** End : EvolveDataTable */

			searchList : [],
			tableFieldList : [],
			settingList : [],
			searchValue : '',
			searchOperation : '',
			searchField : '',
			operatorList : [
				{
					value : 'GT',
					key : '>'
				},
				{
					value : 'LE',
					key : '<'
				},
				{
					value : 'GET',
					key : '>='
				},
				{
					value : 'LET',
					key : '<='
				},
				{
					value : 'EQUALS',
					key : '='
				}],


		};
	},

	computed: {},
    
	watch: {
		mdIconsSearch (val) {
			this.mdIcons.forEach(icon => {
				if (val !== '' && val.length > 2) {
					//console.log("icon.name :", icon.name);
					icon.visible = icon.name.toLowerCase().includes(val.toLowerCase());
					//console.log("icon.visible :", icon.visible);
				} else {
					icon.visible = true
				}
			})
		}
	},
    
	beforeDestroy () {
		clearInterval(this.ramUpdateInterval);
	},

	created: async function () {
		this.removeModal();
		this.getUserUnitLink();
		// this.getCompanyList();

		
	},
	validations: {

		searchValue: {
			required,
		},
		searchField: {
			required,
		},
		searchOperation: {
			required,

		},

	},
	mounted () {
		this.$root.$on("onChangecustomerLanguage", () => {
			console.log("customerLanguage Changed.....");
			this.translatecustomerLanguage();
		});
	},
	beforeMount () {
		this.translatecustomerLanguage();
	},

	methods : {

		// defult evolve functions
		translatecustomerLanguage: async function () {
			let customerLanguageId = this.$auth.$storage.getLocalStorage("EvolvecustomerLanguage_ID");
			if (customerLanguageId != undefined) {
				const customerLanguageTranstale = await this.$axios
					.$post("/api/v1/evolve/translate", {
						customerLanguageId: customerLanguageId,
						translate: this.translate,
					})
					.catch((e) => {});
				if (customerLanguageTranstale) {
					let tra = this.translate;
					Object.keys(this.translate).forEach(function (key) {
						customerLanguageTranstale.result.forEach(function (obj) {
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
		
		notification : async function (type = "danger", timeout = 3000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},
		// defult evolve functions end

		/* Datatable Methods -- Start */
		onDisplayRecordChange : async function (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getUserUnitLink();
		},
		
		paginateClick : async function (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getUserUnitLink();
		},

		onInputSearch : function () {
			this.currentPage = 1;
			this.getUserUnitLink();
			this.paginateClick(1);
		},

		downloadPdf : function () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolveUserUnitRoleLinkTable").outerHTML;
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
					title: "Evolve User-Unit-Role Link",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveUserUnitRoleLink",
				},
			};
		},
		
		downloadCsv : function () {
			let filename = "evolveUserUnitRoleLink";
			let csv = [];
			let html = document.getElementById("evolveUserUnitRoleLinkTable").outerHTML;
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

		clearData : async function () {
			this.$v.$reset();
			
		},
        
		getUserUnitLink : async function (){
			let response = await this.$axios
				.$post("/api/v1/evolve/UserUnitLink/getUserUnitList", {
					displayRecord: this.displayRecord,
					startFrom: this.startFrom,
					search : this.search,
					EvolveUser_ID : this.userId,
					EvolveUnit_ID : this.unitId,
					EvolveRole_ID: this.roleId,


				}).catch((e) => {
					this.notification("danger", 3000, 'Problem With Connecting Server!!');
				});
			if(response.statusCode == 200){
				this.userUnitLink = response.result.records;
				if(this.settingList.length == 0){
					this.settingList = response.result.settingList
				}
				if (response.result.noOfRecord > 0) {
					this.pageCount = Math.ceil(
						response.result.noOfRecord / this.displayRecord
					);
				}else{
					this.pageCount = 0
				}
			}else{
				this.notification("danger", 3000, response.message);
			}
		},
		getCompanyList : async function (){
			let response = await this.$axios
				.$post("/api/v1/eSupplier/PurchaseOrder/getCompanyList", {
	
				}).catch((e) => {
					this.notification("danger", 3000, 'Problem With Connecting Server!!');
				});
			if(response.statusCode == 200){
				this.companyList = response.result;	
			}else{
				this.notification("danger", 3000, response.message);
			}
		},


		onChangeCompany : async function (){
			if(this.companyId != null && this.companyId != null){

				let list = await this.$axios
					.$post("/api/v1/eSupplier/PurchaseOrder/getUnitList", {

						EvolveCompany_ID: this.companyId,
						
					}).catch((e) => {
						this.notification("danger", 3000, 'Problem With Connecting Server!!');
					});
				if(list.statusCode == 200){
					// this.companyList = list.result;	
					this.unitList  = list.result 
				}else{
					this.notification("danger", 3000, list.message);
				}

			}else{
				this.unitId = '' ;
				this.unitList= [] ;

			}

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
						.$post("/api/v1/eSupplier/PurchaseOrder/onUploadInventryCsv", formData, config)
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
							this.getUserUnitLink();
						} else {
							this.notification("danger", 3000, fileUpload.message);
						}
					}
					this.loaderHide();
				}else{
					this.notification("danger", 3000, "Please Upload Only Valid CSV File");
				}
			}
		},
		addSearchList (e) {
			e.preventDefault();
			this.$v.$touch();

			if (this.$v.$invalid) {
				this.notification("danger", 3000, "Please Fill Require Fields");
			} else {
				this.searchList.push({
					id: uniqueID(),
					tableField : this.searchField,
					operator : this.searchOperation,
					value : this.searchValue,


				});
				UIkit.modal("#filteration").hide();
				this.getUserUnitLink()

			}
		},

		viewSetting: async function () {
			UIkit.modal("#settings").show();
		},

		
		onFilteration: async function () {
			UIkit.modal("#filteration").show();
		},

		addUserToUnitLink: async function (EvolveUserUnitLink_ID) {
			this.$store.dispatch('addNewTab', {
				title: this.translate.user_unit_link_create, 
				url: '/evolve/userUnitLink/options',
				params: {
					EvolveUserUnitLink_ID: EvolveUserUnitLink_ID,
				}
			});
		},

		ActiveDeActiveLink: async function ( index, EvolveUserUnitLink_IsActive) {
			const response = await this.$axios.$post("/api/v1/evolve/UserUnitLink/activeDeactiveLink", {
				EvolveUserUnitLink_ID: this.userUnitLink[index].EvolveUserUnitLink_ID,
				EvolveUserUnitLink_IsActive:  EvolveUserUnitLink_IsActive,
				
			})
				.catch((e) => {
					console.log(e);
					this.notification("danger", 3000, "Problem with connecting to server!");
				});

			if (response) {
				if (response.statusCode == 200) {
					this.notification("success", 3000, response.message);
					this.getUserUnitLink();
				} else {
					this.notification("danger", 3000, response.message);
				}
			}

		
		},

	},	
	
}

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