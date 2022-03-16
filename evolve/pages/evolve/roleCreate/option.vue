<template>
	<div class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<!-- <a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="refreshClick()"></a> -->
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
			</div>
			<div class="evolve-page-header-icons evolve-float-right"> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click="$destroy(); $store.dispatch('removeOneTab', '/evolve/roleCreate/option')"></a>
			</div>
			 
			<div class="evolve-page-header-icons evolve-float-right">
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-excel md-color-indigo-600" @click="downloadCsv()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-pdf md-color-red-600" @click="downloadPdf()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-printer md-color-cyan-600"></a>
			</div>
		</div>
		<client-only>
			<div id="sc-page-content" class="evolve-page-body">
				<div id="nav-mdi" class="uk-card">
					<div class="uk-width-1-3@m">
						<div class="uk-grid" data-uk-grid>
							<div class="uk-width-1-2@m">
								<label for="table lable" class="evolve-input-lable">Role Code</label>
							</div>
							<div class="uk-width-1-2@m">
								<ScInput
									v-model="$v.roleCode.$model"
									mode="outline"
									:placeholder="'Role Code'"
									name="roleCode"
									:error-class="$v.roleCode.$error"
									:validator="$v.roleCode"
									class="evolve-input"
									tabindex="1"
									autofocus
									:disabled="isEditMode"
								></ScInput> 
							</div>
						</div>
					</div>


					<div class="uk-width-1-3@m">
						<div class="uk-grid" data-uk-grid>
							<div class="uk-width-1-2@m">
								<label for="table lable" class="evolve-input-lable">{{ translate.role_name }}</label>
							</div>
							<div class="uk-width-1-2@m">
								<ScInput
									v-model="$v.roleName.$model"
									mode="outline"
									:placeholder="translate.role_name"
									name="roleName"
									:error-class="$v.roleName.$error"
									:validator="$v.roleName"
									class="evolve-input"
									tabindex="1"
									autofocus
									:disabled="isRoleNameDisable == true"
								></ScInput> 
							</div>
						</div>
					</div>

					<div class="uk-width-1-3@m">
						<div class="uk-grid" data-uk-grid>
							<div class="uk-width-1-2@m">
								<label for="table lable" class="evolve-input-lable">{{ translate.role_description }} :</label>
							</div>
							<div class="uk-width-1-2@m">
								<ScInput
									v-model="$v.roleDescription.$model"
									mode="outline"
									:placeholder="'Role Description'"
									name="roleDescription"
									:error-class="$v.roleDescription.$error"
									:validator="$v.roleDescription"
									class="evolve-input"
									tabindex="1"
									autofocus
								></ScInput> 
							</div>
						</div>
					</div>

					<div class="uk-width-1-3@m">
						<div class="uk-grid" data-uk-grid>
							<div class="uk-width-1-2@m">
							</div>
							<div class="uk-width-1-2@m">
								<div class="uk-modal-footer uk-text-right">
									<PrettyCheck
										v-model="roleIsActive"
										class="p-icon"
										name="roleIsActive"
									>
										<i slot="extra" class="icon mdi mdi-check"></i>
										Is Active
									</PrettyCheck>
								</div>
							</div>
						</div>
					</div>

					<div class="uk-width-1-3@m">
						<div class="uk-grid" data-uk-grid>
							<div class="uk-width-1-2@m">
							</div>
							<div class="uk-width-1-2@m">
								<div class="uk-modal-footer uk-margin-top uk-text-right">
									<button
										class="sc-button sc-button-flat-danger uk-modal-close"
										type="button"
										@click="$destroy(); $store.dispatch('removeOneTab', '/evolve/roleCreate/option')"
									>
										{{ translate.reset }}
									</button>
									<button class="sc-button" type="button" @click="saveRoleData()">    
										{{ translate.save }}
									</button>
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
.icons_selections {
  height: 200px !important;
  overflow: auto;
}
</style>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";

import ScInput from "~/components/Input";

import PrettyCheck from "pretty-checkbox-vue/check";
if (process.client) {
	require("~/plugins/flatpickr");
	require("~/assets/js/vendor/jquery.quicksearch.js");
}

export default {
	head () {
		return {
			title: "Evolve - " + this.$route.path,
		};
	},
	layout: "eDefaultV2",

	components: {
		ScInput,
		PrettyCheck,
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
			EvolveMenu_Id :this.$route.query.EvolveMenu_Id,
			translate: {
				role_name : "Role Name",
				role_status : "Role Status",
				role_description : "Role Description",
				reset : "Reset",
				save : "Save"
			},
			roleCode : '',
			roleName : '',
			roleDescription : '',
			roleIsActive : false,
			isRoleNameDisable : false,
			isEditMode : false,



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
		console.log("called destroy=====================");
	},

	created: async function () {
		if(this.$route.query.EvolveRole_ID != undefined && this.$route.query.EvolveRole_ID != 0 && this.$route.query.EvolveRole_ID != '' ){
			this.roleId = this.$route.query.EvolveRole_ID+'' ;
			this.getSingelRoleDataEdit(this.roleId);
		}else{

			this.roleId =  '' ;
			this.roleCode =  '' ;
			this.roleDescription =  '' ;
			this.roleIsActive =  false ;

			
		}
	},
	validations: {
		roleName : {
			required
		},
		roleDescription : {
			required
		},	
		roleCode : {
			required
		},
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
			timeout = 10000,
			message = ""
		) {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},
		// Main Methods : Start
		resetAllData : async function () {
			this.roleName = '';
			this.roleDescription = '';
			this.roleIsActive = false;
			this.$v.$reset();
		},
        
		saveRoleData : async function () {
			if (this.$v.$invalid) {
				this.notification("danger", 10000, "Please fill in the required fields");
			}
			else{
				if (this.roleId == '') {
					let response = await this.$axios
						.$post("/api/v1/evolve/roleCreate/saveRoleData", {
							EvolveRole_Code : this.roleCode,
							EvolveRole_Name : this.roleName,
							EvolveRole_Description : this.roleDescription,
							EvolveRole_IsActive : this.roleIsActive,
						})
						.catch((e) => {
							this.notification(
								"danger",
								10000,
								"Problem with connecting to server!"
							);
						});
					if (response) {
						if (response.statusCode == 200) {
							this.resetAllData();
							this.$destroy();
							this.$store.dispatch('removeOneTab', '/evolve/roleCreate/option')
							this.notification("success", 10000, response.message);
						} else {
							this.notification("danger", 10000, response.message);
						}
					}
				}
				else{
					let response = await this.$axios
						.$post("/api/v1/evolve/roleCreate/modifyRoleData", {
							EvolveRole_ID : this.roleId,
							EvolveRole_Name : this.roleName,
							EvolveRole_Description : this.roleDescription,
							EvolveRole_IsActive : this.roleIsActive,
						})
						.catch((e) => {
							this.notification(
								"danger",
								10000,
								"Problem with connecting to server!"
							);
						});
					if (response) {
						if (response.statusCode == 200) {
							this.resetAllData();
							this.$destroy();
							this.$store.dispatch('removeOneTab', '/evolve/roleCreate/option')
							this.notification("success", 10000, response.message);
						} else {
							this.resetAllData();
							this.$store.dispatch('removeOneTab', '/evolve/roleCreate/option')
							this.notification("danger", 10000, response.message);
						}
					}
				}
			}
			
		},

		getSingelRoleDataEdit : async function (EvolveRole_ID) {
			let response = await this.$axios
				.$post("/api/v1/evolve/roleCreate/getSingelRoleDataEdit", {
					EvolveRole_ID : EvolveRole_ID,
				})
				.catch((e) => {
					this.notification(
						"danger",
						10000,
						"Problem with connecting to server!"
					);
				});
			if (response) {
				if (response.statusCode == 200) {
					this.roleCode = response.result.EvolveRole_Code ;
					this.isEditMode = true ;
					this.roleName = response.result.EvolveRole_Name;
			        this.roleDescription = response.result.EvolveRole_Description;
			        this.roleIsActive = response.result.EvolveRole_IsActive;
					this.isRoleNameDisable = true;
				} else {
					this.notification("danger", 10000, response.message);
				}
			}
		},
		

		// Main Methods : End
	},
};
</script>

<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>\   