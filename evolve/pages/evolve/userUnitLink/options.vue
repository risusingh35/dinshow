<template>
	<div class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<!-- <a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="refreshClick()"></a> -->
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
			</div>
						
			<div class="evolve-page-header-icons evolve-float-right"> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click="$destroy() ; $store.dispatch('removeOneTab', '/evolve/userUnitLink/options')"></a>
			</div>
		</div>
		<div class="evolve-page-body">
			<div id="nav-mdi" class="uk-card">
				<div class="uk-card-body min-height-back">
					<!-- <div class="uk-child-width-1-6@m uk-grid" data-uk-grid> -->
					<div class="uk-modal-body">
						<div class="uk-grid" data-uk-grid>
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">User :</label>
									</div>
									<div class="uk-width-1-2@m">
										<Select2Search
											v-model="userId"
											name="userId"
											:settings="{ 'width': '100%', 'placeholder': 'User', allowClear: true }"
											:ajax-url="getUserList"
											:error-class="$v.userId.$error"
											:validator="$v.userId"
											class="evolve-input"
											mode="outline"
											:minimum-input-length="2"
											@change="getAssignedRoleList()"
										></Select2Search>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">Unit :</label>
									</div>
									<div class="uk-width-1-2@m">
										<Select2Search
											v-model="unitId"
											name="unitId"
											:settings="{ 'width': '100%', 'placeholder': 'Unit', allowClear: true }"
											:ajax-url="getUnitList"
											:error-class="$v.unitId.$error"
											:validator="$v.unitId"
											class="evolve-input"
											mode="outline"
											:minimum-input-length="2"
											@change="getAssignedRoleList()"
										></Select2Search>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>

							<!-- <div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">Role :</label>
									</div>
									<div class="uk-width-1-2@m">
										<Select2Search
											v-model="roleId"
											name="roleId"
											:settings="{ 'width': '100%', 'placeholder': 'Role', allowClear: true }"
											:ajax-url="getRoleList"
											:error-class="$v.roleId.$error"
											:validator="$v.roleId"
											class="evolve-input"
											mode="outline"
											:minimum-input-length="3"
										></Select2Search>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div> -->
							
						
					
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
									</div>
									<div class="uk-width-1-2@m">
										<div class="uk-modal-footer uk-margin-top uk-text-right">
											<button
												class="sc-button sc-button-flat sc-button-flat-danger uk-modal-close"
												type="button"
												@click="$destroy() ; $store.dispatch('removeOneTab', '/evolve/userUnitLink/options')"
											>
												{{ translate.cancel }}
											</button>
											<button class="sc-button" type="button" @click="createOrUpateUserUnitLink()">
												{{ translate.save }}
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
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
										<table id="evolveUserMaster" class="uk-table uk-table-striped">
											<thead>
												<tr>
													<th>Select</th>

													<th>Role Name </th>
													<th>Description</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(role,index) in roleList" :key="index">
													<td>
														<PrettyCheck
															v-model="role.isSelected"
															class="p-icon"
															name="roleIsActive"
														>
															<i slot="extra" class="icon mdi mdi-check"></i>
															{{ translate.available }}
														</PrettyCheck>
													</td>

													<td>{{ role.EvolveRole_Name }}</td>
													<td>{{ role.EvolveRole_Description }}</td>
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

if (process.client) {
	require("~/plugins/flatpickr");
	require("~/assets/js/vendor/jquery.quicksearch.js");
	// var Paginate = require("vuejs-paginate");

}

export default {
	head () {
		return {
			title: "Evolve - " + this.$route.path,
		};
	},

	components: {

		PrettyCheck,
		// ScInput,
		Select2Search: process.client ? () => import("~/components/ajaxSearch/Select2Search") : null,
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
		
			baseUrl: this.$axios.defaults.baseURL,
			// slectedMenuIcon: "",
			userId : '',
			unitId : '',
			// roleId : '',
			getUserList	: this.$axios.defaults.baseURL+'api/v1/evolve/UserUnitLink/getUserList',
			getUnitList	: this.$axios.defaults.baseURL+'api/v1/evolve/UserUnitLink/getUnitList',
			// getRoleList	: this.$axios.defaults.baseURL+'api/v1/evolve/UserUnitLink/getRoleList',
			roleList : [],




			/** Start : EvolveDataTable */
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
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

		console.log("CREAYED>>>>")
		this.getRoleList()

		// this.removeModal();

		// this.clearData()

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
			this.unitId = "";
			this.userId = "";
			this.roleId = "";

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
				let createOrEdit = await this.$axios.$post("/api/v1/evolve/UserUnitLink/addUserUnitLink", data)
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
						this.$store.dispatch('removeOneTab', '/evolve/userUnitLink/options')

						this.notification("success", 3000, createOrEdit.message);
					} else {
						this.notification("danger", 3000, createOrEdit.message);
					}
				}
            
			}

			// c
		},

		getRoleList : async function (){
			let list = await this.$axios
				.$post("/api/v1/evolve/UserUnitLink/getRoleList", {
				}).catch((e) => {
					this.notification("danger", 3000, 'Problem With Connecting Server!!');
				});

			console.log("list????", list)

			if(list.statusCode == 200){
				this.roleList = list.result
			}else{
				this.notification("danger", 3000, list.message);
			}
		},

		
		onInputSearch : function () {
			// this.currentPage = 1;
			// this.getUserUnitLink();
			// this.paginateClick(1);
			// this.g
			this.getRoleList()
		},

		
		getAssignedRoleList : async function (){
			if(this.userId != '' &&  this.unitId != '' )
			{
				let list = await this.$axios
					.$post("/api/v1/evolve/UserUnitLink/getAssignedRoleList", {

						EvolveUser_ID : this.userId,
						EvolveUnit_ID : this.unitId,


					}).catch((e) => {
						this.notification("danger", 3000, 'Problem With Connecting Server!!');
					});
				if(list.statusCode == 200){

					let assignedList = list.result ;
					for(let i=0 ; i<this.roleList.length ; i++){
						

						this.roleList[i].isSelected = false ;


						for(let j=0 ; j<assignedList.length ; j++){

							if(this.roleList[i].EvolveRole_ID == assignedList[j].EvolveRole_ID ){

								this.roleList[i].isSelected = true ;
							}
						}
						
					}
				}else{
					this.notification("danger", 3000, list.message);
				}
			}else{

				for(let i=0 ; i<this.roleList.length ; i++){
					this.roleList[i].isSelected = false ;

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