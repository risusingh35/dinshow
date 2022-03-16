<template>
	<div id="evolve-page">
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
		<div id="evolve-page-body">
			<div id="nav-mdi" class="uk-card">
				<div class="uk-card-body min-height-back">
					<!-- <div class="uk-child-width-1-6@m uk-grid" data-uk-grid> -->
					<div class="uk-modal-body">
						<div class="uk-grid" data-uk-grid>
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.user_login }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="$v.userLogin.$model"
											mode="outline"
											:placeholder="translate.user_login"
											name="userLogin"
											:error-class="$v.userLogin.$error"
											:validator="$v.userLogin"
											class="evolve-input"
											tabindex="1"
											autofocus
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.user_email }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="$v.userEmail.$model"
											mode="outline"
											:placeholder="translate.user_email"
											name="userEmail"
											:error-class="$v.userEmail.$error"
											:validator="$v.userEmail"
											class="evolve-input"
											tabindex="1"
											autofocus
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.user_name }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="$v.userName.$model"
											mode="outline"
											:placeholder="translate.user_name"
											name="userEmail"
											:error-class="$v.userName.$error"
											:validator="$v.userName"
											class="evolve-input"
											tabindex="1"
											autofocus
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>
							<!-- <div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.user_company }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<Select2
											v-model="$v.userCompany.$model"
											:settings="{ 'width': '100%', 'placeholder': translate.user_company, allowClear: true }"
											name="userCompany"
											:error-class="$v.userCompany.$error"
											:validator="$v.userCompany"
											class="evolve-input"
											tabindex="1"
											autofocus
										>
											<option key value>
												Select Company
											</option>
											<option
												v-for="company in companies"
												:key="company.EvolveCompany_ID"
												:value="company.EvolveCompany_ID"
											>
												{{ company.EvolveCompany_Name }}
											</option>
										</Select2>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div> -->
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.password }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="userPassword"
											mode="outline"
											:placeholder="translate.password"
											name="userPassword"
											type="password"
											pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
											class="evolve-input"
											tabindex="1"
											autofocus
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.repeat_password }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="$v.repeatPassword.$model"
											mode="outline"
											:placeholder="translate.repeat_password"
											:error-class="$v.repeatPassword.$error"
											:validator="$v.repeatPassword"
											name="repeatPassword"
											type="password"
											class="evolve-input"
											tabindex="1"
											autofocus
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.isActive }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<PrettyCheck v-model="userIsActive" class="p-icon evolve-input" name="isActive">
											<i slot="extra" class="icon mdi mdi-check"></i>
											{{ translate.is_active }}
										</PrettyCheck>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
									</div>
									<div class="uk-width-1-2@m">
										<div class="uk-modal-footer uk-margin-top uk-text-right">
											<button
												class="sc-button sc-button-flat sc-button-flat-danger uk-modal-close"
												type="button"
												@click="$destroy(); $store.dispatch('removeOneTab', '/evolve/users/_edit')"
											>
												{{ translate.cancel }}
											</button>
											<button class="sc-button" type="button" @click="CreateOrUpdateUser($event)">
												{{ translate.save }}
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>
						</div>
					</div>
					<!-- </div>	 -->
				</div>
			</div>
		</div>
	</div>
</template>


					
							<!-- <div>
						<label>{{ translate.user_role }}</label>
						<client-only>
							<Select2
								v-model="$v.userRole.$model"
								:settings="{ 'width': '100%', 'placeholder': 'Select Role...', 'closeOnSelect': false }"
								name="userRole"
								:error-class="$v.userRole.$error"
								:validator="$v.userRole"
								multiple
							>
								<option
									v-for="role in roles"
									:key="role.EvolveRole_ID"
									:value="role.EvolveRole_ID"
									:selected="userRole.includes(role.EvolveRole_ID)"
								>
									{{ role.EvolveRole_Name }}
								</option>
							</Select2>
						</client-only>
						<ul class="sc-vue-errors">
							<li v-if="!$v.userRole.required">
								{{ translate.role_selection_is_require }}
							</li>
						</ul>
					</div> -->

							<!-- <div>
						<label>{{ translate.user_unit }}</label>
						<client-only>
							<Select2
								v-model="userUnit"
								:settings="{ 'width': '100%', 'placeholder': 'Select Unit(s)...', allowClear: false }"
								name="userUnit"
								multiple
								@change="selectAllUnit()"
							>
								<option key="0" selected value="0">
									No Unit Selected
								</option>
								<option v-if="unitSelectAll == true" key="ALL" value="ALL">
									Select All
								</option>
								<option
									v-for="unit in units"
									:key="unit.EvolveUnit_ID"
									:value="unit.EvolveUnit_ID"
									:selected="userUnit.includes(unit.EvolveUnit_ID)"
								>
									{{ unit.EvolveUnit_Code }} - {{ unit.EvolveUnit_Name }}
								</option>
							</Select2>
						</client-only>
					</div> -->
							<!-- <div>
						<label>{{ translate.app_menu }}</label>
						<Select2
							v-model="defaultAppMenu"
							name="appMenu"
							:settings="{ 'width': '100%', 'placeholder': 'Select Applicaion...', allowClear: true }"
							@change="changeDefaultAppMenu($event)"
						>
							<option key value>
								{{ translate.select_app_menu }}
							</option>
							<option
								v-for="apps in appList"
								:key="apps.EvolveApp_ID"
								:value="apps.EvolveApp_ID"
							>
								{{ apps.EvolveApp_Name }}
							</option>
						</Select2>
					</div> -->
							<!-- <div>
						<label>{{ translate.default_menu }}</label>
						<Select2
							v-model="defaultMenu"
							name="appMenu"
							:settings="{ 'width': '100%', 'placeholder': 'Select Menu...', allowClear: true }"
						>
							<option key value>
								{{ translate.select_menu }}
							</option>
							<option
								v-for="ml in defaultMenuList"
								:key="ml.EvolveMenu_Id"
								:value="ml.EvolveMenu_Id"
							>
								{{ ml.EvolveMenu_Name }}
							</option>
						</Select2>
					</div> -->
							
						<!-- <div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
					<client-only>
						<div id="message">
							<span id="letter" class="invalid">
								A
								<b>lowercase</b> letter
							</span>
							<span id="capital" class="invalid">
								A
								<b>capital (uppercase)</b> letter
							</span>
							<span id="number" class="invalid">
								A
								<b>number</b>
							</span>
							<span id="specialChar" class="invalid">
								A
								<b>special characters</b>
							</span>
							<span id="length" class="invalid">
								Minimum
								<b>6 characters</b>
							</span>
						</div>
					</client-only>
				</div> -->
						<!-- <div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
							
								<PrettyCheck v-model="userPrintAllow" class="p-icon" name="isActive">
							<i slot="extra" class="icon mdi mdi-check"></i>
							Print Allow
						</PrettyCheck>
								<PrettyCheck
							v-model="userCreateWorkOrderAllow"
							class="p-icon"
							name="userCreateWorkOrderAllow"
						>
							<i slot="extra" class="icon mdi mdi-check"></i>
							Create Work Order Allow
						</PrettyCheck>
								<PrettyCheck v-model="userToBranchAssign" class="p-icon" name="userToBranchAssign">
							<i slot="extra" class="icon mdi mdi-check"></i>
							Assign Branch
						</PrettyCheck>
								<PrettyCheck v-model="userIsActive" class="p-icon" name="isActive">
									<i slot="extra" class="icon mdi mdi-check"></i>
									{{ translate.is_active }}
								</PrettyCheck>
								<PrettyCheck
							v-model="userIsActiveDirectory"
							class="p-icon"
							name="userIsActiveDirectory"
						>
							<i slot="extra" class="icon mdi mdi-check"></i>
							{{ translate.is_anableActiveDirectory }}
						</PrettyCheck>

								<PrettyCheck
							v-model="userIsActiveDirectorySetting"
							class="p-icon"
							name="userIsActiveDirectorySetting"
						>
							<i slot="extra" class="icon mdi mdi-check"></i>
							{{ translate.is_activeDirectory }}
							</PrettyCheck>
						</div> -->
							<!-- <div v-if="userToBranchAssign == true">
								<label>Select Branch</label>
								<client-only>
									<Select2
										v-model="branchId"
										:settings="{ 'width': '100%', 'placeholder': 'Select Branch(s)...', allowClear: false }"
										name="branchId"
										multiple
									>
										<option key selected value>
											No Branch Selected
										</option>
										<option
											v-for="branch in branchList"
											:key="branch.EvolveBranch_ID"
											:value="branch.EvolveBranch_ID"
											:selected="branchId.includes(branch.EvolveBranch_ID)"
										>
											{{ branch.EvolveBranch_Code }}
										</option>
									</Select2>
								</client-only>
							</div> -->
						<!-- <div
					v-if="userIsActiveDirectorySetting == true"
					class="uk-child-width-1-2@m uk-grid"
					data-uk-grid
				>
					<div>
						<label>{{ translate.activeDirectoryUrl }}</label>
						<ScInput
							v-model="activeDirectoryUrl"
							mode="outline"
							placeholder="Active Directory Url"
							name="activeDirectoryUrl"
						></ScInput>
					</div>
					<div>
						<label>{{ translate.activeDirectoryBaseDN }}</label>
						<ScInput
							v-model="activeDirectoryBaseDN"
							mode="outline"
							placeholder="Active Directory Base DN"
							name="activeDirectoryBaseDN"
						></ScInput>
					</div>
				</div>
				<div
					v-if="userIsActiveDirectorySetting == true"
					class="uk-child-width-1-2@m uk-grid"
					data-uk-grid
				>
					<div>
						<label>{{ translate.activeDirectoryUserName }}</label>
						<ScInput
							v-model="activeDirectoryUserName"
							mode="outline"
							placeholder="Active Directory User Name"
							name="activeDirectoryUserName"
						></ScInput>
					</div>
					<div>
						<label>{{ translate.activeDirectoryPassword }}</label>
						<ScInput
							v-model="activeDirectoryPassword"
							mode="outline"
							placeholder="Active Directory Password"
							type="password"
							name="activeDirectoryPassword"
						></ScInput>
					</div>
				</div> -->
<style>
.invalid {
  color: red;
}

.invalid:before {
  position: relative;
  left: -35px;
  content: "✖";
}

.valid {
  color: green;
}

.valid:before {
  position: relative;
  left: -35px;
  content: "✔";
}

#message {
  display: none;
  color: #000;
  position: relative;
  padding: 20px;
  margin-top: 10px;
}

#message span {
  padding: 0px 35px;
  font-size: 16px;
}
</style>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import customValidators from "~/plugins/vuelidateValidators";
import ScInput from "~/components/Input";
import ScTextarea from "~/components/Textarea";
import PrettyCheck from "pretty-checkbox-vue/check";
if (process.client) {
	require("~/plugins/flatpickr");
	require("~/assets/js/vendor/jquery.quicksearch.js");
}
const chance = require("chance").Chance();
export default {
	head () {
		return {
			title: "Evolve - " + this.$route.path,
		};
	},
	components: {
		ScInput,
		//ScTextarea,
		// Select2: process.client ? () => import("~/components/Select2") : null,
		PrettyCheck,
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
			userId: "",
			userLogin: "",
			userEmail: "",
			userName: "",
			userPassword: "",
			repeatPassword: "",
			userRole: [1],
			userUnit: [],
			userCompany: "",
			userIsActive: false,
			userPrintAllow: false,
			userCreateWorkOrderAllow: false,
			userToBranchAssign: false,
			companies: [],
			units: [],
			roles: [],
			branchList: [],
			branchId: [],
			userIsActiveDirectorySetting: false,
			userIsActiveDirectory: false,
			activeDirectoryUrl: "",
			activeDirectoryBaseDN: "",
			activeDirectoryUserName: "",
			activeDirectoryPassword: "",

			defaultAppMenu: "",
			defaultMenu: "",
			defaultMenuList: [],
			appList: [],
			unitSelectAll: true,
			pageURL : '/evolve/users/_edit',

			translate: {
				//new

				users: "Users",
				back: "Back",
				user_details: "User Details",
				user_login: "User Login ",
				unit_login_must_have_at_least: "Unit Login must have at least",
				letters: "letters",
				user_email: "User Email",
				user_email_is_required: "User Email is required",
				unit_email_must_be_email_id: "Unit Email must be email id",
				user_name: "User Name",
				user_name_is_required: "User Name is required",
				unit_name_must_have_at_least: "Unit Name must have at least",
				role_selection_is_require: "Role Selection Is Require",
				password: "Password",
				characters: "characters",
				repeat_password: "Repeat Password",
				passwords_must_be_identical: "Passwords must be identical",
				is_active: "Is Active",
				save: "Save",
				user_login_is_required: "User Login is required",
				cancel: "Cancel",
				user_details: "User Details",
				is_anableActiveDirectory: "Enable Active directory",
				is_activeDirectory: "Active directory Custom Setting",
				activeDirectoryUrl: "Active Directory URL",
				activeDirectoryBaseDN: "Active Directory Base DN",
				activeDirectoryUserName: "Active Directory User Name",
				activeDirectoryPassword: "Active Directory Password",
				app_menu: "App Menu",
				default_menu: "Default Menu",
				app_menu_is_required: "App Menu IS Required",
				menu_is_required: "Menu IS Required",
				select_app_menu: "Select App Menu",
				select_menu: "Select Menu",
				user_role: "User Role",
				// user_company: "User Company",
				user_unit: "User Unit",
				isActive : "isActive",
			},
		};
	},
	computed: {
		userRoles () {
			return userRoles.map(function (obj) {
				obj.id = obj.id || obj.val;
				obj.text = obj.text || obj.name;
				return obj;
			});
		},
	},
	created: async function () {
		this.removeModal();
		// this.getAppList();
		// this.getAllCompanies();
		// this.getAllRoles();
		// this.getBranchList();
		this.checkCreateOrEdit();
	},
	validations: {
		userEmail: {
			required,
			email,
		},
		userLogin: {
			required,
			minLength: minLength(3),
		},
		userName: {
			required,
			minLength: minLength(3),
		},
		// userRole: {
		// 	required,
		// },
		// userCompany: {
		// 	required,
		// },
		repeatPassword: {
			sameAsPassword: sameAs("userPassword"),
		},
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
		removeModal: async function (e) {
			$(".uk-modal").remove(); // Remove Old Model From DOM
		},

		getAllCompanies: async function () {
			let all_companies = await this.$axios.$get(
				"/api/v1/evolve/user/companyList"
			);
			if (all_companies) {
				if (all_companies.statusCode == 200) {
					this.companies = all_companies.result;
				} else {
					this.notification("danger", 3000, all_companies.message);
				}
			}
		},
		async onChange_company (event) {
			this.units = [];
			this.userUnit = [];
			if (this.userCompany != "") {
				const all_unit = await this.$axios.$post(
					"/api/v1/evolve/user/getCompanyListById",
					{ EvolveCompany_ID: this.userCompany }
				);
				if (all_unit) {
					if (all_unit.statusCode == 200) {
						if (all_unit.result.length > 0) {
							this.units = all_unit.result;
						} else {
							this.notification(
								"danger",
								3000,
								"No Unit Found For This Company"
							);
						}
					} else {
						this.notification("danger", 3000, all_unit.message);
					}
				}
			} else {
				this.notification("danger", 3000, "Please Select Company");
			}
		},
		getAllRoles: async function () {
			const all_roles = await this.$axios.$get(
				"/api/v1/evolve/user/getRoleList"
			);
			if (all_roles) {
				if (all_roles.statusCode == 200) {
					this.roles = all_roles.result;
				} else {
					this.notification("danger", 3000, all_roles.message);
				}
			} else {
			}
		},
		getBranchList: async function () {
			const branchList = await this.$axios.$get(
				"/api/v1/evolve/user/getBranchList"
			);
			if (branchList) {
				if (branchList.statusCode == 200) {
					this.branchList = branchList.result;
				} else {
					this.notification("danger", 3000, branchList.message);
				}
			} else {
			}
		},
		checkCreateOrEdit: async function () {
			
			// this.userId = this.$route.params.edit;
			this.userId = this.$route.query.uid;
			console.log("Edit ID:", this.userId);
			if (this.userId != null) {
				const user_data = await this.$axios.$post(
					"/api/v1/evolve/user/selectSingleUser",
					{ EvolveUser_ID: this.userId }
				);
				if (user_data) {
					if (user_data.statusCode == 200) {
						// 			this.userToBranchAssign =
						//   user_data.result.user.EvolveUser_IsBranchUser;
						this.userLogin = user_data.result.user.EvolveUser_login;
						this.userEmail = user_data.result.user.EvolveUser_EmailID;
						this.userName = user_data.result.user.EvolveUser_Name;
						this.userIsActive = user_data.result.user.EvolveUser_IsActive
						//   user_data.result.user.EvolveUser_IsActive == 1 ? true : false;
						// 			this.userPrintAllow =
						//   user_data.result.user.EvolveUser_PrintAllow == 1 ? true : false;
						// 			this.userCreateWorkOrderAllow =
						//   user_data.result.user.EvolveUser_CreatePoAllow == 1
						//   	? true
						//   	: false;

						// 			this.userIsActiveDirectory =
						//   user_data.result.user.EvolveUser_ActiveDirIsActive == 1
						//   	? true
						//   	: false;
						// 			this.activeDirectoryUrl =
						//   user_data.result.user.EvolveUser_ActiveDirUrl == null
						//   	? ""
						//   	: user_data.result.user.EvolveUser_ActiveDirUrl;
						// 			this.activeDirectoryBaseDN =
						//   user_data.result.user.EvolveUser_ActiveDirBaseDN == null
						//   	? ""
						//   	: user_data.result.user.EvolveUser_ActiveDirBaseDN;
						// 			this.activeDirectoryUserName =
						//   user_data.result.user.EvolveUser_ActiveDirUserName == null
						//   	? ""
						//   	: user_data.result.user.EvolveUser_ActiveDirUserName;
						// 			this.activeDirectoryPassword =
						//   user_data.result.user.EvolveUser_ActiveDirPassword == null
						//   	? ""
						//   	: user_data.result.user.EvolveUser_ActiveDirPassword;
						// let cmpData = user_data.result.company
						// console.log("cmpData[i].EvolveCompany_ID", cmpData[0].EvolveCompany_ID);
						// this.userCompany =user_data.result.company[0].EvolveCompany_ID + "";
						// for(let i=0;i<cmpData.length;i++){
						// 	this.userCompany[i] = cmpData[i].EvolveCompany_ID
						// }
						// 			await this.onChange_company(
						// 				user_data.result.company[0].EvolveCompany_ID
						// 			);
						// 			let unitData = user_data.result.unit;
						// 			for (let i = 0; i < unitData.length; i++) {
						// 				this.userUnit[i] = unitData[i].EvolveUnit_ID;
						// 			}
						// 			this.userUnit.push();
						// 			console.log("userUnit ==", this.userUnit);
						// 			let roleData = user_data.result.role;
						// 			this.userRole = [];
						// 			for (let i = 0; i < roleData.length; i++) {
						// 				this.userRole[i] = roleData[i].EvolveRole_ID;
						// 			}
						// 			let brachData = user_data.result.Branch;
						// 			for (let i = 0; i < brachData.length; i++) {
						// 				this.branchId[i] = brachData[i].EvolveBranch_ID;
						// 			}

						// 			this.defaultAppMenu = user_data.result.user.EvolveMenu_AppId + "";
						// 			console.log("defaultAppMenu", this.defaultAppMenu);
						// 			await this.changeDefaultAppMenu();
						// 			this.defaultMenu =
						//   user_data.result.user.EvolveUser_DefaultMenu_ID + "";
					}
					 else {
						this.notification("danger", 3000, user_data.message);
					}
				} else {
				}
			}
		},
		async CreateOrUpdateUser (e) {
			if (this.userId != null) {
				// for Update  User
				this.UpdateUser(e);
			} else {
				this.CreateUser(e);
			}
		},
		UpdateUser: async function (e) {
			if (this.userToBranchAssign == null) {
				this.userToBranchAssign = false;
			}
			e.preventDefault();
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.notification("danger", 3000, "Please Fill Require Fields");
			} else {
				if (this.userToBranchAssign == true && this.branchId.length == 0) {
					this.notification("danger", 3000, "Please select branch");
				} else {
					let userDetails = {
						EvolveUser_ID: this.userId,
						EvolveUser_login: this.userLogin,
						EvolveUser_EmailID: this.userEmail,
						EvolveUser_Name: this.userName,
						EvolveUser_password: this.userPassword,
						// EvolveRole_ID: this.userRole,
						// EvolveUnit_ID: this.userUnit,
						EvoleCompany_ID: this.userCompany,
						EvolveUser_IsActive: this.userIsActive,
						// EvolveUser_PrintAllow: this.userPrintAllow,
						// EvolveUser_CreatePoAllow: this.userCreateWorkOrderAllow,
						// EvolveUser_IsBranchUser: this.userToBranchAssign,
						// EvolveUser_ActiveDirIsActive: this.userIsActiveDirectory,
						// EvolveUser_ActiveDirUrl: this.activeDirectoryUrl,
						// EvolveUser_ActiveDirBaseDN: this.activeDirectoryBaseDN,
						// EvolveUser_ActiveDirUserName: this.activeDirectoryUserName,
						// EvolveUser_ActiveDirPassword: this.activeDirectoryPassword,
						// EvolveUser_DefaultMenu_ID: this.defaultMenu,
					};

					let response = await this.$axios.$post(
						"/api/v1/evolve/user/updateUser",
						userDetails
					);
					if (response.statusCode != 200) {
						this.notification("danger", 3000, response.message);
					} else {
						// 			if (this.userToBranchAssign == true && this.branchId.length == 0) {
						// 				this.notification("danger", 3000, "Please select branch");
						// 			} else if (
						// 				this.userToBranchAssign == true &&
						//   this.branchId.length > 0
						// 			) {
						// 				let asssignBranch = await this.$axios.$post(
						// 					"/api/v1/evolve/user/updateBranch",
						// 					{
						// 						EvolveBranch_ID: this.branchId,
						// 						insertUser_ID: parseInt(this.userId),
						// 					}
						// 				);
						// 				if (asssignBranch.statusCode != 200) {
						// 					this.notification(
						// 						"danger",
						// 						3000,
						// 						"User Assignment to branch failed"
						// 					);
						// 				}
						// 			}
						this.notification("success", 3000, response.message);
						this.$destroy() ;
						this.$store.dispatch('removeOneTab', '/evolve/users/_edit')
						// this.$router.push("/evolve/users/list");

					}
				}
			}
		},
		CreateUser: async function (e) {
			e.preventDefault();
			this.$v.$touch();

			if (this.$v.$invalid) {
				this.notification("danger", 3000, "Please Fill Require Fields");
			} else {
				if (this.userToBranchAssign == true && this.branchId.length == 0) {
					this.notification("danger", 3000, "Please select branch");
				} else {
					let userDetails = {
						EvolveUser_login: this.userLogin,
						EvolveUser_EmailID: this.userEmail,
						EvolveUser_Name: this.userName,
						EvolveUser_password: this.userPassword,
						// EvoleRole_ID: this.userRole,
						// EvoleUnit_ID: this.userUnit,
						// EvoleCompany_ID: parseInt(this.userCompany),
						EvolveUser_IsActive: this.userIsActive,
						// EvolveUser_PrintAllow: this.userPrintAllow,
						// EvolveUser_CreatePoAllow: this.userCreateWorkOrderAllow,
						// EvolveUser_IsBranchUser: this.userToBranchAssign,
						// EvolveUser_ActiveDirIsActive: this.userIsActiveDirectory,
						// EvolveUser_ActiveDirUrl: this.activeDirectoryUrl,
						// EvolveUser_ActiveDirBaseDN: this.activeDirectoryBaseDN,
						// EvolveUser_ActiveDirUserName: this.activeDirectoryUserName,
						// EvolveUser_ActiveDirPassword: this.activeDirectoryPassword,
						// EvolveUser_DefaultMenu_ID: this.defaultMenu,
					};
					let response = await this.$axios.$post(
						"/api/v1/evolve/user/createUser",
						userDetails
					);
					if (response.statusCode != 200) {
						this.notification("danger", 3000, "User Creation Failed");
					} else {
						// let insertedUserId = response.result.inserted_id;
						// if (this.userToBranchAssign == true && this.branchId.length == 0) {
						// 	this.notification("danger", 3000, "Please select branch");
						// } else if (
						// 	this.userToBranchAssign == true &&
              			// 		this.branchId.length > 0
						// ) {
						// 	console.log("wfdwscsdfsbdnbfbjf");
						// 	let asssignBranch = await this.$axios.$post(
						// 		"/api/v1/evolve/user/assignBranch",
						// 		{
						// 			EvolveBranch_ID: this.branchId,
						// 			insertUser_ID: parseInt(insertedUserId),
						// 		}
						// 	);
						// 	if (asssignBranch.statusCode != 200) {
						// 		this.notification(
						// 			"danger",
						// 			3000,
						// 			"User Assignment to branch failed"
						// 		);
						// 	}
						// }
						this.notification("success", 3000, response.message);
						// this.$router.push("/evolve/users/list");

						this.$store.dispatch('removeOneTab', '/evolve/users/_edit')
					}
				}
			}
		},
		// checkNewPassword: async function () {
		// 	if (this.userPassword.length > 0) {
		// 		document.getElementById("message").style.display = "block";
		// 	} else {
		// 		document.getElementById("message").style.display = "none";
		// 	}
		// 	var myInput = document.getElementById("psw");
		// 	var letter = document.getElementById("letter");
		// 	var capital = document.getElementById("capital");
		// 	var number = document.getElementById("number");
		// 	var specialChar = document.getElementById("specialChar");
		// 	var length = document.getElementById("length");

		// 	// Validate lowercase letters
		// 	var lowerCaseLetters = /[a-z]/g;
		// 	if (this.userPassword.match(lowerCaseLetters)) {
		// 		letter.classList.remove("invalid");
		// 		letter.classList.add("valid");
		// 		this.newPassOk = true;
		// 	} else {
		// 		letter.classList.remove("valid");
		// 		letter.classList.add("invalid");
		// 		this.newPassOk = false;
		// 	}

		// 	// Validate capital letters
		// 	var upperCaseLetters = /[A-Z]/g;
		// 	if (this.userPassword.match(upperCaseLetters)) {
		// 		capital.classList.remove("invalid");
		// 		capital.classList.add("valid");
		// 		this.newPassOk = true;
		// 	} else {
		// 		capital.classList.remove("valid");
		// 		capital.classList.add("invalid");
		// 		this.newPassOk = false;
		// 	}

		// 	// Validate numbers
		// 	var numbers = /[0-9]/g;
		// 	if (this.userPassword.match(numbers)) {
		// 		number.classList.remove("invalid");
		// 		number.classList.add("valid");
		// 		this.newPassOk = true;
		// 	} else {
		// 		number.classList.remove("valid");
		// 		number.classList.add("invalid");
		// 		this.newPassOk = false;
		// 	}

		// 	var specialCr = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
		// 	if (this.userPassword.match(specialCr)) {
		// 		specialChar.classList.remove("invalid");
		// 		specialChar.classList.add("valid");
		// 		this.newPassOk = true;
		// 	} else {
		// 		specialChar.classList.remove("valid");
		// 		specialChar.classList.add("invalid");
		// 		this.newPassOk = false;
		// 	}

		// 	// Validate length
		// 	if (this.userPassword.length >= 6) {
		// 		length.classList.remove("invalid");
		// 		length.classList.add("valid");
		// 		this.newPassOk = true;
		// 	} else {
		// 		length.classList.remove("valid");
		// 		length.classList.add("invalid");
		// 		this.newPassOk = false;
		// 	}
		// },
		async changeDefaultAppMenu (e) {
			this.defaultMenuList = [];
			this.defaultMenu = "";
			if (this.defaultAppMenu != "" && this.defaultAppMenu != "null") {
				let response = await this.$axios
					.$post("/api/v1/evolve/user/getDefaultMenuList", {
						EvolveMenu_AppId: this.defaultAppMenu,
					})
					.catch((e) => {
						this.notification(
							"danger",
							3000,
							"Problem with connecting to server!"
						);
					});
				if (response) {
					if (response.statusCode == 200) {
						this.defaultMenuList = response.result;
					} else {
						this.notification("danger", 3000, response.message);
					}
				}
			}
		},
		getAppList: async function () {
			const response = await this.$axios.$get("/api/v1/evolve/user/getAppList");
			if (response) {
				if (response.statusCode == 200) {
					this.appList = response.result;
				} else {
					this.notification("danger", 3000, response.message);
				}
			}
		},
		async selectAllUnit () {
			for (let j = 0; j < this.userUnit.length; j++) {
				if (this.userUnit[j] == "ALL") {
					this.userUnit = [];
					for (let i = 0; i < this.units.length; i++) {
						this.userUnit.push(this.units[i].EvolveUnit_ID + "");
					}
					this.unitSelectAll = false;
					break;
				} else {
					this.unitSelectAll = true;
				}
			}
		},
	},
};
</script>
<style lang="scss">
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>