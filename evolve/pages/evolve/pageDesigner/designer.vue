<template>
	<div class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<!-- <a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="refreshClick()"></a> -->
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
			</div>
						
			<div class="evolve-page-header-icons evolve-float-right"> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click="$destroy() ; $store.dispatch('removeOneTab', pageURL)"></a>
			</div>
		</div>
		<div id="sc-page-content" class="evolve-page-body">
			<div id="nav-mdi" class="uk-card">
				<div class="uk-card-body min-height-back">
					<!-- <div class="uk-child-width-1-6@m uk-grid" data-uk-grid> -->
					<div class="uk-modal-body">
						<div class="uk-grid" data-uk-grid>
							<div class="uk-width-1-4@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable" data-uk-tooltip="title: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam; delay: 500">Table Name :</label>
									</div>
									<div class="uk-width-1-2@m">
										<Select2
											v-model="tableName"
											:disabled="tablenamedisable == true"
											name="tableName"
											:settings="{ 'width': '100%', 'placeholder': 'Table Name', allowClear: true }"
											@change="getTableDetails(1)"
										>
											<option key value>
												Table Name 
											</option>
											<option
												v-for="tbl in tableList"
												:key="tbl.TABLE_NAME"
												:value="tbl.TABLE_NAME"
											>
												{{ tbl.TABLE_NAME }}
											</option>
										</Select2>
									</div>
								</div>
							</div>
							<div class="uk-width-1-4@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable"> Page Name :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="pageName"
											name="pageName"
											mode="outline"
											placeholder="Page Name"
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-4@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable"> ADD :</label>
									</div>
									<div class="uk-width-1-2@m">
										<PrettyCheck v-model="isAddEnable " class="p-icon" name="isAddEnable">
											<i slot="extra" class="icon mdi mdi-check"></i>
										</PrettyCheck>
									</div>
								</div>
							</div>
							<div class="uk-width-1-4@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable"> Edit :</label>
									</div>
									<div class="uk-width-1-2@m">
										<PrettyCheck v-model="isEditEnable " class="p-icon" name="isEditEnable">
											<i slot="extra" class="icon mdi mdi-check"></i>
										</PrettyCheck>
									</div>
								</div>
							</div>
							<div class="uk-width-1-4@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable"> DELETE :</label>
									</div>
									<div class="uk-width-1-2@m">
										<PrettyCheck v-model="isDeleteEnable " class="p-icon" name="isDeleteEnable">
											<i slot="extra" class="icon mdi mdi-check"></i>
										</PrettyCheck>
									</div>
								</div>
							</div>
							<div class="uk-width-1-4@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable"> View :</label>
									</div>
									<div class="uk-width-1-2@m">
										<PrettyCheck v-model="isViewEnable " class="p-icon" name="isViewEnable">
											<i slot="extra" class="icon mdi mdi-check"></i>
										</PrettyCheck>
									</div>
								</div>
							</div>
							<div class="uk-width-1-4@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable"> PDF :</label>
									</div>
									<div class="uk-width-1-2@m">
										<PrettyCheck v-model="isPdfEnable " class="p-icon" name="isPdfEnable">
											<i slot="extra" class="icon mdi mdi-check"></i>
										</PrettyCheck>
									</div>
								</div>
							</div>

							<div class="uk-width-1-4@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable"> Exel :</label>
									</div>
									<div class="uk-width-1-2@m">
										<PrettyCheck v-model="isExelEnable " class="p-icon" name="isExelEnable">
											<i slot="extra" class="icon mdi mdi-check"></i>
										</PrettyCheck>
									</div>
								</div>
							</div>
							<div class="uk-width-1-4@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable"> No Of records :</label>
									</div>
									<div class="uk-width-1-2@m">
										<!-- <PrettyCheck v-model="noOfRecord " class="p-icon" name="noOfRecord">
											<i slot="extra" class="icon mdi mdi-check"></i>
										</PrettyCheck> -->

										<ScInput
											v-model="noOfRecord"
											name="noOfRecord"
											mode="outline"
											type="number"
											placeholder="Seq"
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-4@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable"> Primary Column :</label>
									</div>
									<div class="uk-width-1-2@m">
										<Select2
											v-model="primaryColumn"
											name="primaryColumn"
											:settings="{ 'width': '100%', 'placeholder': 'Primary Column', allowClear: true }"
										>
											<option key value>
												Primary Column
											</option>
											<option
												v-for="pc in primaryColumnList"
												:key="pc.COLUMN_NAME"
												:value="pc.COLUMN_NAME"
											>
												{{ pc.COLUMN_NAME }}
											</option>
										</Select2>
									</div>
								</div>
							</div>

							<div class="uk-width-1-4@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<!-- <label for="table lable" class="evolve-input-lable"> No Of records :</label> -->
									</div>
									<div class="uk-width-1-2@m">
										<button class="sc-button" type="button" @click="savePageDetails()">
											{{ translate.save }}
										</button>
									</div>
								</div>
							</div>
						</div>

						<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
							<div>
								<div class="uk-overflow-auto">
									<client-only>
										<!-- <select v-model="displayRecord" @change="onDisplayRecordChange($event)">
												<option v-for="dr in displayRow" :key="dr" :value="dr">
													{{ dr }}
												</option>
											</select> -->
									</client-only>
									<!-- <client-only>
										<input
											v-model="search"
											type="text"
											placeholder="Search Here"
											style="float: right !important;"
											@input="onInputSearch()"
										>
									</client-only> -->
									<client-only>
										<table id="evolveUserMaster" class="uk-table uk-table-striped">
											<thead>
												<tr>
													<th>Select</th>
													<th>Read Only</th>
													<th> List Seq</th>
													<th>Column Name </th>
													<th>Data Type</th>
													<th>Input Type</th>
													<th>Select Query</th>
													<th>Is Mandatory</th>
													
													<th> From Seq</th>
												
													<th> From Label</th>
													<th> Search Type</th>

													<th>Default Value</th>
													<th>Default Value Code</th>
													<th>validation Code</th>
													<th>Custom Function</th>
													<th>Field Desc</th>
													<th>Success Msg</th>
													<th>Failure Msg</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(tbd,index) in tableDetails" :key="index">
													<td>
														<PrettyCheck
															v-model="tbd.isSelected"
															class="p-icon"
															name="isSelected"
														>
															<i slot="extra" class="icon mdi mdi-check"></i>
															{{ translate.available }}
														</PrettyCheck>
													</td>

													<td>
														<PrettyCheck
															v-model="tbd.isReadOnly"
															class="p-icon"
															name="isReadonly"
															:disabled="!tbd.isSelected"
														>
															<i slot="extra" class="icon mdi mdi-check"></i>
															{{ translate.available }}
														</PrettyCheck>
													</td>

													<td>
														<ScInput
															v-model="tbd.listIndex"
															name="listIndex"
															mode="outline"
															type="number"
															placeholder="Seq"
															:disabled="!tbd.isSelected"
														></ScInput>
													</td>

													<td>{{ tbd.COLUMN_NAME }}</td>
													<td>{{ tbd.DATA_TYPE }}</td>

													<td>
														<Select2
															v-model="tbd.inputType"
															name="tbd.inputType"
															:settings="{ 'width': '100%', 'placeholder': 'Input Type', allowClear: true }"
															:disabled="!tbd.isSelected"
														>
															<option key="" value="">
																SELECT
															</option>
															<option
																v-for="it in inputTypeList"
																:key="it.value"
																:value="it.value"
															>
																{{ it.value }}
															</option>
														</Select2>
													</td>
													<td>
														<textarea
															v-model="tbd.SelectQuery"
															mode="outline"
															placeholder=""
															name="SQL"
															:rows="2"

															:disabled="tbd.inputType != 'SELECT'"
														></textarea>
													</td>
													


													<td>
														<PrettyCheck
															v-model="tbd.isMandatory"
															class="p-icon"
															name="isReadonly1"
															:disabled="!tbd.isSelected"
														>
															<i slot="extra" class="icon mdi mdi-check"></i>
															{{ translate.available }}
														</PrettyCheck>
													</td>

													<td>
														<ScInput
															v-model="tbd.formSeq"
															name="formSeq"
															mode="outline"
															type="number"
															placeholder="Seq"
															:disabled="!tbd.isSelected"
														></ScInput>
													</td>

													<td>
														<ScInput
															v-model="tbd.formLabel"
															name="formSeq"
															mode="outline"
															:disabled="!tbd.isSelected"

															
															placeholder="Label"
														></ScInput>
													</td>

													<td>
														<Select2
															v-model="tbd.searchType"
															name="tbd.searchType"
															:settings="{ 'width': '100%', 'placeholder': 'Search Type', allowClear: true }"
															:disabled="!tbd.isSelected"
														>
															<option key="" value="">
																SELECT
															</option>
															<option
																v-for="it in searchTypeList"
																:key="it.value"
																:value="it.value"
															>
																{{ it.value }}
															</option>
														</Select2>
													</td>

													<td>
														<ScInput
															v-model="tbd.defaultValue"
															name="defaultValue"
															mode="outline"
															:disabled="!tbd.isSelected"

															
															placeholder="Default Value"
														></ScInput>
													</td>

													<td>
														<Select2
															v-model="tbd.defaultValueCode"
															name="tbd.defaultValueCode"
															:settings="{ 'width': '100%', 'placeholder': 'Default Value Code', allowClear: true }"
															:disabled="!tbd.isSelected"
														>
															<option key="" value="">
																SELECT
															</option>
															<option
																v-for="dl in defaultValueCodeList"
																:key="dl.value"
																:value="dl.value"
															>
																{{ dl.value }}
															</option>
														</Select2>
													</td>

													<td>
														<Select2
															v-model="tbd.validationCode"
															name="tbd.validationCode"
															:settings="{ 'width': '100%', 'placeholder': 'Validation Code', allowClear: true }"
															:disabled="!tbd.isSelected"
														>
															<option key="" value="">
																SELECT
															</option>
															<option
																v-for="dv in validationCodeList"
																:key="dv.value"
																:value="dv.value"
															>
																{{ dv.value }}
															</option>
														</Select2>
													</td>

													<td>
														<Select2
															v-model="tbd.customFunction"
															name="tbd.customFunction"
															:settings="{ 'width': '100%', 'placeholder': 'Custom Function', allowClear: true }"
															:disabled="!tbd.isSelected"
														>
															<option key="" value="">
																SELECT
															</option>
															<option
																v-for="cf in customFunctionList"
																:key="cf.value"
																:value="cf.value"
															>
																{{ cf.value }}
															</option>
														</Select2>
													</td>
													<td>
														<ScInput
															v-model="tbd.fieldDesc"
															name="fieldDesc"
															mode="outline"
															:disabled="!tbd.isSelected"

															
															placeholder="Desc"
														></ScInput>
													</td>
													<td>
														<ScInput
															v-model="tbd.successMsg"
															name="successMsg"
															mode="outline"
															:disabled="!tbd.isSelected"

															
															placeholder="Success Msg"
														></ScInput>
													</td>
													<td>
														<ScInput
															v-model="tbd.failureMsg"
															name="failureMsg"
															mode="outline"
															:disabled="!tbd.isSelected"

															
															placeholder="Failure Msg"
														></ScInput>
													</td>





													<!-- <td>{{ tbd.EvolveRole_Description }}</td> -->
												</tr>
											</tbody>
										</table>
										<!-- <div class="paginate">
											<Paginate
												:page-count="pageCount"
												:click-handler="paginateClick"
												:prev-text="'<'"
												:next-text="'>'"
												:value="currentPage"
												:container-class="'evolve_paginate'"
											></Paginate>
										</div> -->
									</client-only>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
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
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import PrettyCheck from 'pretty-checkbox-vue/check';
import ScInput from "~/components/Input";

if (process.client) {
	require("~/plugins/flatpickr");
	require("~/assets/js/vendor/jquery.quicksearch.js");
	// var Paginate = require("vuejs-paginate");

}

export default {
	name: 'ScTextarea',
	head () {
		return {
			title: "Evolve - " + this.$route.path,
		};
	},

	components: {

		PrettyCheck,
		ScInput,
		Select2: process.client ? () => import("~/components/Select2") : null,

		// Select2Search: process.client ? () => import("~/components/ajaxSearch/Select2Search") : null,
		// Paginate,


	},
	mixins: [validationMixin],
	props: {
		params: {
			type: Object,
			default: () => {}
		}
	},
	layout: "eDefaultV2",

	data () {
		return {
			translate: {
		
				type_code :"Type Code",
				description :"Description",
				icon :"Icon",
				create_menu :"Create Menu",
				description :"Description",
				search_icon :"Search Icon",
				search_icon :"Selected Icon",
				search_here : 'Search Here',
				cancel : 'Cancel',
				save : 'Save',

		

			},
		
			pageURL : '/evolve/pageDesigner/designer',
			baseUrl: this.$axios.defaults.baseURL,
			// slectedMenuIcon: "",
			userId : '',
			unitId : '',
			// roleId : '',
			getUserList	: this.$axios.defaults.baseURL+'api/v1/evolve/EvolvePageDesigner/getUserList',
			getUnitList	: this.$axios.defaults.baseURL+'api/v1/evolve/EvolvePageDesigner/getUnitList',
			// getRoleList	: this.$axios.defaults.baseURL+'api/v1/evolve/EvolvePageDesigner/getRoleList',
			roleList : [],
			primaryColumn :'',
			SelectQuery:'',

			tableList : [],
			tableDetails : [], 
			tablenamedisable : false,


			tableName : '',
			pageName : '',
			isAddEnable  : 0,
			isEditEnable : 0,
			isDeleteEnable : 0,
			isViewEnable : 0,
			isPdfEnable : 0,
			isExelEnable : 0,
			// noOfRecord : 0,

			inputTypeList : [
				{value :  'SELECT'},
				{ value :  'INPUT'},
				{ value :  'NUMBER'},
				{ value :  'CHECKBOX'},
				{ value :  'TEXTAREA'},
				{ value :  'DATE'},
			],


			
			searchTypeList : [

				{ value :  'LIKE'}
			],

			
			defaultValueCodeList : [

				{ value :  'DATETIME'},
				{ value :  'MACHINEIP'},
				{ value :  'USER ID'},


				
			],

			primaryColumnList : [],

			
			customFunctionList : [

			
			],

			validationCodeList : [

				
			],

			EvolvePage_ID : '',





			/** Start : EvolveDataTable */
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 10,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1, 2, 3, 4, 5],
			pdfExportColums: [0, 1, 2, 3, 4, 5],
			search: "",
			/** End : EvolveDataTable */
		};
	},

	computed: {},

	watch: {
		mdIconsSearch (val) {
			this.mdIcons.forEach((icon) => {
				if (val !== "" && val.length > 2) {
					//console.log("icon.name :", icon.name);
					icon.visible = icon.name.toLowerCase().includes(val.toLowerCase());
					//console.log("icon.visible :", icon.visible);
				} else {
					icon.visible = true;
				}
			});
		},
	},

	beforeDestroy () {
		// clearInterval(this.ramUpdateInterval);
	},

	created: async function () {

		this.getTableList()

		console.log("this.$route.query.EvolvePage_ID???",  this.$route.query.EvolvePage_ID)

		if(this.$route.query.EvolvePage_ID ==  undefined ||  this.$route.query.EvolvePage_ID ==  '' ){
			
	
			this.clearData();


		}else{
			this.EvolvePage_ID = this.$route.query.EvolvePage_ID ;
			
			await this.getSinglePageDetail();
		}

	},
	validations: {
		userId : {
			required
		},
		unitId : {
			required
		},
		// roleId : {
		// 	required
		// }
	},
	mounted () {
		this.$root.$on("onChangeLanguage", () => {
			console.log("Language Changed.....");
			this.translateLanguage();
		});
		this.$root.$on('onCloseTabCalled', (url) =>{
			console.log("Destroy Changed.....", url)
			if(this.pageURL == url){
				this.$destroy();
			} 
		});

	},
	beforeMount () {
		this.translateLanguage();
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
			this.getAllAppList();
		},

		paginateClick: async function (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getAllAppList();
		},

		/* Datatable Methods -- End */

		clearData: async function () {
			this.$v.$reset();

			this.EvolvePage_ID  = '' ;
			this.pageName= ''; 
			this.tableName= ''; 
			this.isExelEnable= false; 
			this.noOfRecord= 10;  
			this.isEditEnable= false; 
			this.isAddEnable= false; 
			this.isViewEnable= false; 
			this.isDeleteEnable= false; 
			this.isPdfEnable = false;
			this.tableDetails =[];
			this.primaryColumn = '' ;
			this.SelectQuery='';


		},


		createOrUpateUserUnitLink: async function () {
			this.$v.$touch();
			if (this.$v.$invalid) {

				this.notification("danger", 3000, "Fill All Required Fileds");

			}else{
				let data = {
					EvolveUser_ID: this.userId,
					EvolveUnit_ID: this.unitId,
					// EvolveRole_ID : this.roleId 
					roleList : this.roleList 
				};
				let createOrEdit = await this.$axios.$post("/api/v1/evolve/EvolvePageDesigner/addUserUnitLink", data)
					.catch((e) => {
						this.notification(
							"danger",
							3000,
							"Problem With Connecting Server!!"
						);
					});
                
				if (createOrEdit) {
					if (createOrEdit.statusCode == 200) {
						this.$destroy() ;
						this.$store.dispatch('removeOneTab', '/evolve/EvolvePageDesigner/options')

						this.notification("success", 3000, createOrEdit.message);
					} else {
						this.notification("danger", 3000, createOrEdit.message);
					}
				}
            
			}

			// c
		},

		getTableList : async function (){
			let list = await this.$axios
				.$post("/api/v1/evolve/EvolvePageDesigner/getTableList", {
				}).catch((e) => {
					this.notification("danger", 3000, 'Problem With Connecting Server!!');
				});

			if(list.statusCode == 200){
				this.tableList = list.result
			}else{
				this.notification("danger", 3000, list.message);
			}
		},

		getTableDetails : async function (isAdd){

			if(this.tableName != ''){
				let list = await this.$axios
					.$post("/api/v1/evolve/EvolvePageDesigner/getTableDetails", {

						tableName : this.tableName
					}).catch((e) => {
						this.notification("danger", 3000, 'Problem With Connecting Server!!');
					});

				if(list.statusCode == 200){

					if(isAdd){

						this.tableDetails = list.result ;
						this.primaryColumnList= list.result ;


					}else{
						this.primaryColumnList= list.result ;
					}

					console.log("this.primaryColumnList????",  this.primaryColumnList)

				}else{
					this.notification("danger", 3000, list.message);
				}
			}
		},


		

		savePageDetails : async function (){

			let details =  {
				headDetails : {
					EvolvePage_ID : this.EvolvePage_ID,
					EvolvePage_Name : this.pageName, 
					EvolvePage_Code : this.pageName,
					EvolvePage_Table : this.tableName, 
					EvolvePage_isExcelExport : this.isExelEnable, 
					EvolvePage_NoOfRecords : this.noOfRecord, 
					EvolvePage_isEditEnable : this.isEditEnable, 
					EvolvePage_isAddEnable : this.isAddEnable, 
					EvolvePage_isViewEnable : this.isViewEnable, 
					EvolvePage_isDeleteEnable : this.isDeleteEnable, 
					EvolvePage_isPdfExport : this.isPdfEnable,
					EvolvePage_PrimaryKeyColumn : this.primaryColumn,
				
				},
				fieldDetails : this.tableDetails
			}

			if(this.tableName == ''){

				this.notification("danger", 3000, 'Table Name Required');


			}else if(this.pageName == ''){

				this.notification("danger", 3000, 'Page Name Required');


			}else{
				if(this.EvolvePage_ID == '' || this.EvolvePage_ID == undefined){
					
					let addPage = await this.$axios
						.$post("/api/v1/evolve/EvolvePageDesigner/addPageDetails", details).catch((e) => {
							this.notification("danger", 3000, 'Problem With Connecting Server!!');
						});

					if(addPage.statusCode == 200){
						this.notification("success", 3000, addPage.message);
						this.$store.dispatch('removeOneTab', this.pageURL)
 
						this.$root.$emit("onCloseTabCalled", this.pageURL);

					}else{
						this.notification("danger", 3000, addPage.message);
					}
				}else{
					let updatePage = await this.$axios
						.$post("/api/v1/evolve/EvolvePageDesigner/updatePageDetails", details).catch((e) => {
							this.notification("danger", 3000, 'Problem With Connecting Server!!');
						});

					if(updatePage.statusCode == 200){
						this.notification("success", 3000, updatePage.message);
						this.$store.dispatch('removeOneTab', this.pageURL)

						this.$root.$emit("onCloseTabCalled", this.pageURL);
					}else{
						this.notification("danger", 3000, updatePage.message);
					}

				}
			}
		},

		async changetype (index){
			index += 1
		},

		getSinglePageDetail : async function (){
			let list = await this.$axios
				.$post("/api/v1/evolve/EvolvePageDesigner/getSinglePageDetail", {
					EvolvePage_ID:this.EvolvePage_ID
				}).catch((e) => {
					this.notification("danger", 3000, 'Problem With Connecting Server!!');
				});

			if(list.statusCode == 200){
				this.tableDetails = list.result.Childvalue
				await this.getTableList();
				this.tableName = list.result.headerValue.EvolvePage_Table+"";
				await  this.getTableDetails(0)
				this.pageName = list.result.headerValue.EvolvePage_Name+""; 
				this.isExelEnable = list.result.headerValue.EvolvePage_isExcelExport; 
				this.noOfRecord = list.result.headerValue.EvolvePage_NoOfRecords+""; 
				this.isEditEnable = list.result.headerValue.EvolvePage_isEditEnable; 
				this.isAddEnable = list.result.headerValue.EvolvePage_isAddEnable; 
				this.isViewEnable = list.result.headerValue.EvolvePage_isViewEnable; 
				this.isPdfEnable = list.result.headerValue.EvolvePage_isPdfExport;
				this.isDeleteEnable = list.result.headerValue.EvolvePage_isDeleteEnable;
				this.primaryColumn = list.result.headerValue.EvolvePage_PrimaryKeyColumn;


				this.tablenamedisable = true
			}else{
				this.notification("danger", 3000, list.message);
			}
		}

	},
};
</script>

<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>