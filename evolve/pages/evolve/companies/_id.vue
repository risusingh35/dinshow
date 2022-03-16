<template>
	<div id="sc-page-wrapper">
		<client-only>
			<div
				id="sc-page-top-bar"
				class="sc-top-bar"
				data-uk-sticky="offset:48; show-on-up: true; animation: uk-animation-slide-top-medium"
			>
				<div class="sc-top-bar-content uk-flex uk-flex-1">
					<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
						{{ translate.company_options }}
					</h1>
					<div class="sc-actions uk-margin-left">
						<div id="sc-dt-buttons"></div>
						<!-- <nuxt-link
							to="/evolve/companies/list"
							class="sc-button datatable-print-button sc-button-primary"
						>
							<i class="mdi mdi-keyboard-backspace"></i>
							{{ translate.back }}
						</nuxt-link> -->
						<button
							to="/evolve/companies/_id"
							class="sc-button datatable-print-button sc-button-primary"
							@click="$destroy(); $store.dispatch('removeOneTab', '/evolve/companies/_id')"
						>
							<i class="mdi mdi-keyboard-backspace"></i>
							{{ translate.back }}
						</button>
					</div>
				</div>
			</div>
		</client-only>
		<div id="sc-page-content">
			<div>
				<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.company_name }}</label>
						<ScInput
							v-model="$v.companyName.$model"
							mode="outline"
							name="companyName"
							:error-class="$v.companyName.$error"
							:validator="$v.companyName"
						></ScInput>
						<ul class="sc-vue-errors">
							<li v-if="!$v.companyName.required">
								{{ translate.company_name_is_required }}
							</li>
							<li
								v-if="!$v.companyName.minLength"
							>
								Company Name must have at least {{ $v.companyName.$params.minLength.min }} letters.
							</li>
						</ul>
					</div>
					<div>
						<label>{{ translate.upload_company_logo }}</label>
						<br>
						<!-- <ScInput v-model="$v.companyLogo.$model"
							mode="outline"
							name="companyLogo"
							:error-class="$v.companyLogo.$error"
							:validator="$v.companyLogo"
							type="file"
						>
            </ScInput>-->

						<input
							id="company_logo"
							:ref="'company_logo'"
							type="file"
							accept="image/*"
							style="float: left;width: 150px;"
							@change="handleFileUpload()"
						>
						<span v-if="companyLogo != ''">
							<img :src="baseUrl+'/img/'+companyLogo" height="50" width="100">
						</span>
						<ul class="sc-vue-errors">
							<li v-if="!$v.companyLogo.required">
								{{ translate.file_upload_is_required }}
							</li>
						</ul>
					</div>
				</div>
				<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.company_location }}</label>
						<ScTextarea v-model="companyLocation" mode="outline" name="companyLocation" :rows="2"></ScTextarea>
					</div>
					<div>
						<label>{{ translate.company_description }}</label>
						<ScTextarea v-model="companyDesc" mode="outline" name="companyDesc" :rows="2"></ScTextarea>
					</div>
				</div>
				<h5 class="uk-heading-line uk-margin-medium-bottom md-color-indigo-500">
					<span>{{ translate.server_details }}</span>
				</h5>
				<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.select_application_storage }}</label>
						<client-only>
							<Select2
								v-model="$v.sqlHost.$model"
								:options="hostType"
								:settings="{ 'width': '100%', 'placeholder': 'Select Application Storage ...', allowClear: true }"
								name="sqlHost"
								:error-class="$v.sqlHost.$error"
								:validator="$v.sqlHost"
								@change="change_host($event)"
							></Select2>
						</client-only>
						<ul class="sc-vue-errors">
							<li v-if="!$v.sqlHost.required">
								{{ translate.application_storage_is_require }}
							</li>
						</ul>
					</div>
					<div>
						<!-- <ScInput v-model="$v.sqlInstant.$model" name="sqlInstant" :error-class="sqlHost == 'cloud' ? $v.sqlInstant.$error : ''" :validator="sqlHost != 'cloud' ? $v.sqlInstant : ''" :disabled="sqlHost == 'cloud'"> -->
						<label>{{ translate.sql_instance }}</label>
						<ScInput
							v-model="$v.sqlInstant.$model"
							mode="outline"
							name="sqlInstant"
							:error-class="$v.sqlInstant.$error"
							:validator="$v.sqlInstant"
							:disabled="sqlHost == 'cloud'"
						></ScInput>
						<ul class="sc-vue-errors">
							<li v-if="!$v.sqlInstant.required">
								{{ translate.sql_instant_is_require }}
							</li>
						</ul>
					</div>
				</div>
				<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.sql_server }}</label>
						<ScInput
							v-model="$v.sqlServer.$model"
							mode="outline"
							name="sqlServer"
							:error-class="$v.sqlServer.$error"
							:validator="$v.sqlServer"
							:disabled="sqlHost == 'cloud'"
						></ScInput>
						<ul class="sc-vue-errors">
							<li v-if="!$v.sqlServer.required">
								{{ translate.sql_server_is_require }}
							</li>
						</ul>
					</div>
					<div>
						<label>{{ translate.sql_port }}</label>
						<ScInput
							v-model="$v.sqlPort.$model"
							mode="outline"
							name="sqlPort"
							:error-class="$v.sqlPort.$error"
							:validator="$v.sqlPort"
							:disabled="sqlHost == 'cloud'"
						></ScInput>
						<ul class="sc-vue-errors">
							<li v-if="!$v.sqlPort.required">
								{{ translate.sql_port_is_require }}
							</li>
						</ul>
					</div>
				</div>
				<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.sql_user }}</label>
						<ScInput
							v-model="$v.sqlUser.$model"
							mode="outline"
							name="sqlUser"
							:error-class="$v.sqlUser.$error"
							:validator="$v.sqlUser"
							:disabled="sqlHost == 'cloud'"
						></ScInput>
						<ul class="sc-vue-errors">
							<li v-if="!$v.sqlUser.required">
								{{ translate.sql_user_is_require }}
							</li>
						</ul>
					</div>
					<div>
						<label>{{ translate.sql_password }}</label>
						<ScInput
							v-model="$v.sqlPass.$model"
							mode="outline"
							name="sqlPass"
							:error-class="$v.sqlPass.$error"
							:validator="$v.sqlPass"
							type="password"
							:disabled="sqlHost == 'cloud'"
						></ScInput>
						<ul class="sc-vue-errors">
							<li v-if="!$v.sqlPass.required">
								{{ translate.sql_password_is_require }}
							</li>
						</ul>
					</div>
					<div>
						<button
							class="sc-button sc-button-primary sc-button-small"
							type="button"
							:disabled="sqlHost == 'cloud'"
							@click="testConnection($event)"
						>
							{{ translate.test_connection }}
						</button>
					</div>
				</div>
				<h5 class="uk-heading-line uk-margin-medium-bottom md-color-indigo-500">
					<span>{{ translate.select_applications }}</span>
				</h5>
				<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
					<div v-for="(section,index) in appLists" :key="section.EvolveApp_Name">
						<PrettyCheck
							v-model="$v.appSelection.$model"
							:value="section.EvolveApp_ID"
							class="p-icon"
							name="appSelection[]"
							:error-class="$v.appSelection.$error"
							:validator="$v.appSelection"
						>
							<i slot="extra" class="icon mdi mdi-check"></i>
							{{ section.EvolveApp_Name }}
						</PrettyCheck>
						<br>
						<ScInput
							v-model="appKeys[index]"
							mode="outline"
							:placeholder="'Key For '+section.EvolveApp_Name"
						></ScInput>
					</div>
				</div>
				<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
					<div>
						<ul class="sc-vue-errors">
							<li v-if="!$v.appSelection.required">
								{{ translate.application_selection_is_required }}
							</li>
						</ul>
					</div>
				</div>

				<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
					<div></div>
					<div></div>
					<div>
						<button
							type="button"
							class="sc-button"
							@click="updateCompany($event)"
						>
							{{ translate.update_Company }}
						</button>
						<nuxt-link to="/evolve/units/list">
							<button
								class="sc-button sc-button-flat sc-button-flat-danger uk-modal-close"
								type="button"
							>
								{{ translate.cancel }}
							</button>
						</nuxt-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import customValidators from "~/plugins/vuelidateValidators";
import ScInput from "~/components/Input";
import ScTextarea from "~/components/Textarea";
import PrettyCheck from "pretty-checkbox-vue/check";
const hostType = [
	{ name: "On Premise", val: "OnPremise" },
	{ name: "Cloud", val: "cloud" },
];
const chance = require("chance").Chance();
export default {
	head () {
		return {
			title: "Evolve - " + this.$route.name,
		};
	},
	components: {
		ScInput,
		ScTextarea,
		Select2: process.client ? () => import("~/components/Select2") : null,
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
			baseUrl: this.$axios.defaults.baseURL,
			companyId: "",
			submitStatus: null,
			appLists: [],
			companyName: "",
			companyLogo: "",
			companyLocation: "",
			companyDesc: "",
			sqlHost: "",
			sqlInstant: "",
			sqlUser: "",
			sqlPass: "",
			sqlServer: "",
			sqlPort: "",
			appSelection: [],
			appKeys: [],
			// Language Translate

			translate: {
				company_options: "Company Edit",
				back: "Back",
				update_Company: "Update Company",
				cancel: "Cancel",
				application_selection_is_required: "Application selection is required",
				select_applications: "Select Applications",
				test_connection: "Test Connection",
				sql_password_is_require: "SQL Password Is required",
				sql_password: "SQL Password",
				sql_user_is_require: "SQL User Is required",
				sql_user: "SQL User",
				sql_port_is_require: "SQL Port Is required",
				sql_port: "SQL Port",
				sql_server_is_require: "SQL Server Is required",
				sql_server: "SQL Server",
				sql_instant_is_require: "SQL Instant Is required",
				sql_instance: "SQL Instance",
				application_storage_is_require: "Application Storage Is required",
				select_application_storage: "Select Application Storage",
				server_details: "Server Details",
				company_description: "Complany Description",
				company_location: "Complany Location",
				file_upload_is_required: "File upload is required",
				upload_company_logo: "Upload Company Logo",
				company_name: "Company Name",
				company_name_is_required: "Company Name is required",
				company_options: "Company Options",
				company_details: "Company Details",
			},
		};
	},
	computed: {
		hostType () {
			return hostType.map(function (obj) {
				obj.id = obj.id || obj.val;
				obj.text = obj.text || obj.name;
				return obj;
			});
		},
	},
	created: async function () {
		this.removeModal();
		//console.log(this.$axios) // Axios object
		const responce = await this.$axios.$get("/api/v1/evolve/appList");
		if (responce) {
			if (responce.status == "success") {
				this.appLists = responce.result;
			} else {
			}
		} else {
		}
		// this.companyId = this.$route.params.id;

		this.companyId = this.params.companyId;

		if (this.companyId == null) {
			// this.$router.push("/evolve/companies/list");
			this.$store.dispatch('removeOneTab', '/evolve/companies/_id')
		}
		const company_data = await this.$axios.$post(
			"/api/v1/evolve/Company/selectSingleCompany",
			{ EvolveCompany_ID: this.companyId }
		);
		if (company_data) {
			console.log(company_data);
			if (company_data.statusCode == 200) {
				this.companyName = company_data.result.EvolveCompany_Name;
				this.companyLogo = company_data.result.EvolveCompany_LogoImage;
				this.companyLocation = company_data.result.EvolveCompany_Location;
				this.companyDesc = company_data.result.EvolveCompany_Description;
				this.sqlInstant = company_data.result.EvolveCompany_Instance;
				this.sqlServer = company_data.result.EvolveCompany_Host;
				this.sqlHost = company_data.result.EvolveCompany_Deployment;
				this.sqlUser = company_data.result.EvolveCompany_DBUser;
				this.sqlPass = company_data.result.EvolveCompany_Password;
				for (let i in company_data.result.App_ID) {
					this.appSelection.push(company_data.result.App_ID[i]);
				}
			} else {
				this.notification("danger", 3000, company_data.message);
			}
		}
	},
	validations: {
		companyName: {
			required,
			minLength: minLength(3),
		},
		companyLogo: {
			required,
		},
		sqlHost: {},
		sqlInstant: {},
		sqlUser: {},
		sqlPass: {},
		sqlServer: {},
		sqlPort: {},
		appSelection: {
			required,
		},
		nothing: {},
	},
	mounted () {
		// console.log("UserID :", this.$store.state.auth.user.EvolveUser_ID);
		// console.log("Token :", this.$auth.getToken('local'));
		this.translateLanguage();
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
			console.log("check");
			$(".uk-modal").remove(); // Remove Old Model From DOM
		},

		async change_host (event) {
			if (event == "cloud") {
				this.sqlInstant = "Cloud";
				this.sqlServer = "Cloud";
				this.sqlPort = "Cloud";
				this.sqlUser = "Cloud";
				this.sqlPass = "Cloud";
			} else {
				this.sqlInstant = "";
				this.sqlServer = "";
				this.sqlPort = "";
				this.sqlUser = "";
				this.sqlPass = "";
			}
		},

		async updateCompany (e) {
			e.preventDefault();
			this.$v.$touch();
			if (this.$v.$invalid) {
				UIkit.notification({
					message:
            '<div class="uk-flex uk-flex-middle"><span class="uk-flex-1 uk-text-center">Please Fill Require Field(s)</span></div>',
					timeout: 5000,
					status: "danger",
					pos: "top-center",
				});
			} else {
				let app_keys = [];
				for (let i = 0; i < this.appSelection.length; i++) {
					app_keys[i] = {
						EvolveApp_ID: this.appSelection[i],
						EvolveApp_Key: this.appKeys[i],
					};
				}
				let companyDetails = {
					EvolveCompany_ID: this.companyId,
					EvolveCompany_Name: this.companyName,
					EvolveCompany_LogoImage: this.companyLogo,
					EvolveCompany_Location: this.companyLocation,
					EvolveCompany_Description: this.companyDesc,
					EvolveCompany_Instance: this.sqlInstant,
					EvolveCompany_Host: this.sqlServer,
					EvolveCompany_Deployment: this.sqlHost,
					EvolveCompany_DBName: "Evolve_" + this.companyCode,
					EvolveCompany_DBUser: this.sqlUser,
					EvolveCompany_Password: this.sqlPass,
					Evolve_Apps: app_keys,
				};

				let response = await this.$axios
					.$post("/api/v1/evolve/company/updateCompany", companyDetails)
					.catch((e) => {
						this.notification(
							"danger",
							3000,
							"Problem with connecting to server!"
						);
					});
				if (response.statusCode != 200) {
					UIkit.notification({
						message:
              '<div class="uk-flex uk-flex-middle"><span class="uk-flex-1 uk-text-center">' +
              response.message +
              "</span></div>",
						timeout: 5000,
						status: "danger",
						pos: "top-center",
					});
				} else {
					UIkit.notification({
						message:
              '<div class="uk-flex uk-flex-middle"><span class="uk-flex-1 uk-text-center">' +
              response.message +
              "</span></div>",
						timeout: 5000,
						status: "success",
					});
					this.$router.push("/evolve/companies/list");
				}

				// //this.$router.push('/dashboard/companies/list')
			}
		},
		async testConnection (e) {
			e.preventDefault();
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.notification("danger", 3000, "Please Fill Require Fields!");
			} else {
				let testDetails = {
					EvolveCompany_Instance: this.sqlInstant,
					EvolveCompany_Port: this.sqlPort,
					EvolveCompany_DBUser: this.sqlUser,
					EvolveCompany_Password: this.sqlPass,
				};

				let response = await this.$axios
					.$post("/api/v1/evolve/testConnection", testDetails)
					.catch((e) => {
						this.notification(
							"danger",
							3000,
							"Problem with connecting to server!"
						);
					});

				if (response.statusCode != 200) {
					this.notification("danger", 3000, response.message);
				} else {
					this.notification("success", 3000, response.message);
					//this.$router.push('/evolve/companies/list/list')
				}

				// //this.$router.push('/dashboard/companies/list')
			}
		},
		handleFileUpload () {
			let fileData = document.getElementById("company_logo");
			let imageData = fileData.files[0];
			if (fileData.files[0].size < 100000) {
				let reader = new FileReader();
				reader.addEventListener(
					"load",
					async function () {
						this.companyLogo = reader.result;
						// this.imageChanged = true ;
					}.bind(this),
					false
				);
				if (imageData) {
					if (/\.(jpe?g|png|gif)$/i.test(imageData.name)) {
						reader.readAsDataURL(imageData);
					}
				}
			} else {
				this.notification("danger", 3000, "Image size must be less than 100kb");
			}
		},
	},
};
</script>
<style lang="scss">
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>
