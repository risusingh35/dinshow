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
						{{ translate.unit_options }}
					</h1>
					<div class="sc-actions uk-margin-left">
						<div id="sc-dt-buttons"></div>
						<nuxt-link
							to="/evolve/units/list"
							class="sc-button datatable-print-button sc-button-primary"
						>
							<i class="mdi mdi-keyboard-backspace"></i>
							{{ translate.back }}
						</nuxt-link>
					</div>
				</div>
			</div>
		</client-only>
		<div id="sc-page-content">
			<div>
				<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.unit_name }}</label>
						<ScInput
							v-model="$v.unitName.$model"
							name="unitName"
							mode="outline"
							placeholder="Unit Name"
							:error-class="$v.unitName.$error"
							:validator="$v.unitName"
						></ScInput>
						<ul class="sc-vue-errors">
							<li v-if="!$v.unitName.required">
								{{ translate.unit_name_is_required }}
							</li>
							<li
								v-if="!$v.unitName.minLength"
							>
								Unit Name must have at least {{ $v.unitName.$params.minLength.min }} letters.
							</li>
						</ul>
					</div>
					<div>
						<label>{{ translate.unit_code }}</label>
						<ScInput
							v-model="$v.unitCode.$model"
							name="unitCode"
							mode="outline"
							placeholder="Unit Code"
							:error-class="$v.unitCode.$error"
							:validator="$v.unitCode"
						></ScInput>
						<ul class="sc-vue-errors">
							<li v-if="!$v.unitName.required">
								{{ translate.unit_code_is_required }}
							</li>
						</ul>
					</div>
					<div>
						<client-only>
							<label>{{ translate.select_company }}</label>
							<Select2
								v-model="$v.unitCompany.$model"
								name="unitCompany"
								:error-class="$v.unitCompany.$error"
								:validator="$v.unitCompany"
								:settings="{ 'width': '100%', 'placeholder': 'Select Company...', allowClear: true }"
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
						</client-only>
						<ul class="sc-vue-errors">
							<li v-if="!$v.unitCompany.required">
								{{ translate.company_selection_is_require }}
							</li>
						</ul>
					</div>
				</div>
				<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.unit_location }}</label>
						<ScInput
							v-model="$v.unitLocation.$model"
							mode="outline"
							placeholder="Unit Location"
							name="unitLocation"
							:error-class="$v.unitLocation.$error"
							:validator="$v.unitLocation"
						></ScInput>
					</div>
					<div>
						<label>{{ translate.pin_zip_code }}</label>
						<ScInput
							v-model="pinCode"
							mode="outline"
							:placeholder="translate.pin_zip_code"
							name="pinCode"
							type="number"
						></ScInput>
					</div>
					<div>
						<label>{{ translate.state_code }}</label>
						<ScInput
							v-model="stateCode"
							mode="outline"
							:placeholder="translate.state_code"
							name="stateCode"
							type="number"
						></ScInput>
					</div>
				</div>
				<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.gstn_user_name }}</label>
						<ScInput
							v-model="gstNUser"
							mode="outline"
							:placeholder="translate.gstn_user_name"
							name="gstNUser"
						></ScInput>
					</div>
					<div>
						<label>{{ translate.gstn_password }}</label>
						<ScInput
							v-model="gstNPassword"
							mode="outline"
							:placeholder="translate.gstn_password"
							name="gstNPassword"
							type="password"
						></ScInput>
					</div>
					<div>
						<label>{{ translate.phone_number }}</label>
						<ScInput
							v-model="phoneNumber"
							mode="outline"
							:placeholder="translate.phone_number"
							name="phoneNumber"
							type="number"
						></ScInput>
					</div>
				</div>
				<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.unit_rank }}</label>
						<ScInput
							v-model="unitRek"
							mode="outline"
							:placeholder="translate.unit_rank"
							name="unitRek"
						></ScInput>
					</div>
					<div>
						<label>{{ translate.country }}</label>
						<ScInput
							v-model="country"
							mode="outline"
							:placeholder="translate.country"
							name="unitRek"
						></ScInput>
					</div>
					<div>
						<label>{{ translate.email_id }}</label>
						<ScInput v-model="email" name="email" mode="outline" placeholder="Enter Email ID"></ScInput>
					</div>
				</div>
				<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.unit_maching_field }}</label>
						<ScInput
							v-model="$v.machingField.$model"
							name="machingField"
							mode="outline"
							:placeholder="translate.unit_maching_field"
							:error-class="$v.machingField.$error"
							:validator="$v.machingField"
						></ScInput>
						<ul class="sc-vue-errors">
							<li
								v-if="!$v.machingField.required"
							>
								{{ translate.unit_maching_field }} {{ translate.is_required }}
							</li>
						</ul>
					</div>
					<div>
						<label>{{ translate.unit_identifier }}</label>
						<ScInput
							v-model="$v.unitIdentifier.$model"
							name="unitIdentifier"
							mode="outline"
							:placeholder="translate.unit_identifier_field"
							:error-class="$v.unitIdentifier.$error"
							:validator="$v.unitIdentifier"
						></ScInput>
						<ul class="sc-vue-errors">
							<li
								v-if="!$v.unitIdentifier.required"
							>
								{{ translate.unit_identifier }} {{ translate.is_required }}
							</li>
						</ul>
					</div>
					<div>
						<label>{{ translate.gst_in }}</label>
						<ScInput
							v-model="$v.gstIn.$model"
							name="gstIn"
							mode="outline"
							placeholder="Enter GST IN"
							:error-class="$v.gstIn.$error"
							:validator="$v.gstIn"
						></ScInput>
						<ul class="sc-vue-errors">
							<li v-if="!$v.gstIn.required">
								{{ translate.gst_in }} {{ translate.is_required }}
							</li>
						</ul>
					</div>
				</div>

				<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.upload_unit_logo }}</label>
						<br>
						<input
							id="unit_logo"
							:ref="'unit_logo'"
							type="file"
							accept="image/*"
							style="float: left;width: 150px;"
							@change="handleFileUpload()"
						>
						<span v-if="unitLogo != ''">
							<img :src="baseUrl+'/img/'+unitLogo" height="50" width="100">
						</span>
					</div>
					<div>
						<PrettyCheck v-model="unitIsActive" class="p-icon button-margin-top" name="isActive">
							<i slot="extra" class="icon mdi mdi-check"></i>
							{{ translate.is_active }}
						</PrettyCheck>
					</div>
				</div>
				<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
					<div class="button-margin-top">
						<label>{{ translate.address }}</label>
						<ScInput
							v-model="address"
							mode="outline"
							:placeholder="translate.address"
							name="address"
						></ScInput>
					</div>
					<div>
						<label>{{ translate.unit_description }}</label>
						<ScTextarea
							v-model="$v.unitDescription.$model"
							mode="outline"
							placeholder="Unit Description"
							:rows="2"
							name="unitDescription"
							:error-class="$v.unitDescription.$error"
							:validator="$v.unitDescription"
						></ScTextarea>
					</div>
				</div>

				<!-- <h5 class="uk-heading-line uk-margin-medium-bottom md-color-indigo-500">
					<span>{{ translate.server_details }}</span>
				</h5>
				<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.sql_instance }}</label>
						<ScInput v-model="$v.sqlInstant.$model"
							mode="outline"
							placeholder="SQL Instance"
							name="sqlInstant"
							:error-class="$v.sqlInstant.$error"
							:validator="$v.sqlInstant"
							:disabled="unitId != ''"
						>
						</ScInput>
						<ul class="sc-vue-errors">
							<li v-if="!$v.sqlInstant.required">
								{{ translate.sql_instant_is_require }}
							</li>
						</ul>
					</div>
					<div>
						<label>SQL Port</label>
						<ScInput v-model="$v.sqlPort.$model"
							mode="outline"
							placeholder="SQL Port"
							name="sqlPort"
							:error-class="$v.sqlPort.$error"
							:validator="$v.sqlPort"
							:disabled="unitId != ''"
						>
						</ScInput>
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
						<ScInput v-model="$v.sqlUser.$model"
							mode="outline"
							placeholder="SQL User"
							name="sqlUser"
							:error-class="$v.sqlUser.$error"
							:validator="$v.sqlUser"
							:disabled="unitId != ''"
						>
						</ScInput>
						<ul class="sc-vue-errors">
							<li v-if="!$v.sqlUser.required">
								{{ translate.sql_user_is_require }}
							</li>
						</ul>
					</div>
					<div>
						<ScInput v-model="$v.sqlPass.$model"
							name="sqlPass"
							:error-class="$v.sqlPass.$error"
							:validator="$v.sqlPass"
							type="password"
							:disabled="unitId != ''"
						>
							<label>{{ translate.sql_password }}</label>
						</ScInput>
						<ul class="sc-vue-errors">
							<li v-if="!$v.sqlPass.required">
								{{ translate.sql_password_is_require }}
							</li>
						</ul>
					</div>
					<div>
						<button class="sc-button sc-button-primary sc-button-small" type="button" @click="testConnection($event)">
							{{ translate.test_connection }}
						</button>
					</div>
        </div>-->
				<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
					<div></div>
					<div></div>
					<div>
						<button
							type="button"
							class="sc-button"
							@click="updateUnit($event)"
						>
							{{ translate.update_unit }}
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
			title: "Evolve - " + this.$route.path,
		};
	},
	layout: "eDefaultV2",
	components: {
		ScInput,
		ScTextarea,
		Select2: process.client ? () => import("~/components/Select2") : null,
		PrettyCheck,
	},
	mixins: [validationMixin],
	data () {
		return {
			baseUrl: this.$axios.defaults.baseURL,
			unitId: "",
			companies: [],
			unitName: "",
			unitCode: "",
			unitCompany: [],
			unitLogo: "",
			unitLocation: "",
			unitDescription: "",
			unitIsActive: false,
			sqlInstant: "",
			sqlPort: "",
			sqlUser: "",
			sqlPass: "",
			imageChanged: false,
			email: "",
			gstIn: "",
			machingField: "",
			unitIdentifier: "",

			pinCode: "",
			address: "",
			stateCode: "",
			phoneNumber: "",
			gstNUser: "",
			gstNPassword: "",
			unitRek: "",
			country: "",

			translate: {
				//new
				unit_code: "Unit Code",
				unit_code_is_required: "Unit Code Is Require",

				back: "Back",
				update_unit: "Update Unit",
				test_connection: "Test Connection",
				sql_password_is_require: "SQL Password Is Require",
				sql_password: "SQL Password",
				sql_user_is_require: "SQL User Is Require",
				sql_user: "SQL User",
				sql_port_is_require: "SQL Port Is Require",
				sql_port: "SQL Port",
				sql_instant_is_require: "SQL Instant Is Require",
				sql_instance: "SQL Instance",
				server_details: "Server Details",
				is_active: "Is Active",
				upload_unit_logo: "Upload Unit Logo",
				unit_location: "Unit Location",
				unit_description: "Unit Description",
				company_selection_is_require: "Company Selection Is Require",
				unit_name_is_required: "Unit Name is required",
				unit_name: "Unit Name",
				unit_details: "Unit Details",
				unit_options: "Unit Options",
				selected_company: "Selected Company",
				cancel: "Cancel",
				email_id: "Email ID",
				is_required: "Is Required",
				gst_in: "GST IN",
				unit_maching_field: "Unit Matching Field [E-invoice]",
				unit_identifier: "Unit Identifier",
				unit_identifier_field: "Unit Identifier Field",
				pin_zip_code: "Pin/Zip Code",
				address: "Address",
				phone_number: "Phone Number",
				state_code: "State Code",
				gstn_user_name: "GSTN User Name",
				gstn_password: "GSTN Password",
				unit_rank: "Unit Rank",
				country: "Country",
				select_company: "Select Company",
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
		this.unitId = this.$route.params.edit;
		if (this.unitId == null) {
			this.$router.push("/evolve/units/list");
		}
		const all_companies = await this.$axios.$get(
			"/api/v1/evolve/Unit/getCompanyList"
		);
		if (all_companies) {
			if (all_companies.statusCode == 200) {
				this.companies = all_companies.result;
			} else {
				this.notification("danger", 3000, all_companies.message);
			}
		}
		//back_to_list
		let unitGetReq = { EvolveUnit_ID: this.unitId };
		const unit_data = await this.$axios.$post(
			"/api/v1/evolve/Unit/selectSingleUnit",
			unitGetReq
		);
		if (unit_data) {
			if (unit_data.statusCode == 200) {
				//this.unitId = this.$route.params.id;
				this.unitName = unit_data.result.EvolveUnit_Name;
				this.unitCompany = unit_data.result.EvolveCompany_ID + "";
				this.unitDescription = unit_data.result.EvolveUnit_Description;
				this.unitLocation = unit_data.result.EvolveUnit_Location;
				this.unitLogo = unit_data.result.EvolveUnit_LogoImage;
				this.unitIsActive = unit_data.result.EvolveUnit_IsActive;
				// this.sqlInstant = unit_data.result.EvolveUnit_Instance;
				// this.sqlPort = unit_data.result.EvolveUnit_Port;
				// this.sqlUser = unit_data.result.EvolveUnit_DBUser;
				// this.sqlPass = unit_data.result.EvolveUnit_Password;
				this.email = unit_data.result.EvolveUnit_Email;
				this.gstIn = unit_data.result.EvolveUnit_Gstin;
				this.machingField = unit_data.result.EvolveUnit_MachingField;
				this.unitIdentifier = unit_data.result.EvolveUnit_Identifier;
				this.unitCode = unit_data.result.EvolveUnit_Code;
				this.pinCode =
          unit_data.result.EvolveUnit_Pin == null ||
          unit_data.result.EvolveUnit_Pin == "NULL"
          	? ""
          	: unit_data.result.EvolveUnit_Pin + "";
				this.address =
          unit_data.result.EvolveUnit_Address == null ||
          unit_data.result.EvolveUnit_Address == "NULL"
          	? ""
          	: unit_data.result.EvolveUnit_Address;
				this.stateCode =
          unit_data.result.EvolveUnit_StateCode == null ||
          unit_data.result.EvolveUnit_StateCode == "NULL"
          	? ""
          	: unit_data.result.EvolveUnit_StateCode + "";
				this.phoneNumber =
          unit_data.result.EvolveUnit_Phone == null ||
          unit_data.result.EvolveUnit_Phone == "NULL"
          	? ""
          	: unit_data.result.EvolveUnit_Phone;
				this.gstNUser =
          unit_data.result.EvolveUnit_GstnUser == null ||
          unit_data.result.EvolveUnit_GstnUser == "NULL"
          	? ""
          	: unit_data.result.EvolveUnit_GstnUser;
				this.gstNPassword =
          unit_data.result.EvolveUnit_GstnPass == null ||
          unit_data.result.EvolveUnit_GstnPass == "NULL"
          	? ""
          	: unit_data.result.EvolveUnit_GstnPass;
				this.unitRek =
          unit_data.result.EvolveUnit_Rek == null ||
          unit_data.result.EvolveUnit_Rek == "NULL"
          	? ""
          	: unit_data.result.EvolveUnit_Rek;
				this.country =
          unit_data.result.EvolveUnit_Country == null ||
          unit_data.result.EvolveUnit_Country == "NULL"
          	? ""
          	: unit_data.result.EvolveUnit_Country;
			} else {
				this.notification("danger", 3000, unit_data.message);
			}
		} else {
		}
	},
	validations: {
		unitName: {
			required,
			minLength: minLength(3),
		},
		unitCompany: {
			required,
		},
		unitLogo: {
			// required
		},
		unitLocation: {
			required,
		},
		unitDescription: {
			required,
		},
		// sqlInstant : {
		// 	required
		// },
		// sqlPort : {
		// 	required
		// },
		// sqlUser : {
		// 	required
		// },
		// sqlPass : {
		// 	required
		// },
		gstIn: {
			required,
		},
		machingField: {
			required,
		},
		// email : {
		// 	required,
		// 	email,
		// },
		unitIdentifier: {
			required,
		},
		unitCode: {
			required,
		},
	},
	methods: {
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

		async updateUnit (e) {
			e.preventDefault();
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.notification("danger", 3000, "Please Fill Require Fields !");
			} else {
				let unitDetails = {
					EvolveUnit_ID: parseInt(this.unitId),
					EvolveUnit_Name: this.unitName,
					EvolveCompany_ID: this.unitCompany,
					EvolveUnit_LogoImage: this.unitLogo,
					EvolveUnit_Location: this.unitLocation,
					EvolveUnit_Description: this.unitDescription,
					EvolveUnit_IsActive: this.unitIsActive,
					// EvolveUnit_Instance : this.sqlInstant,
					// EvolveUnit_Port : this.sqlPort,
					// EvolveUnit_DBUser : this.sqlUser,
					// EvolveUnit_Password : this.sqlPass,
					imageChanged: this.imageChanged,
					EvolveUnit_Email: this.email,
					EvolveUnit_Gstin: this.gstIn,
					EvolveUnit_MachingField: this.machingField,
					EvolveUnit_Identifier: this.unitIdentifier,
					EvolveUnit_Code: this.unitCode,
					EvolveUnit_Pin: this.pinCode,
					EvolveUnit_Address: this.address,
					EvolveUnit_StateCode: this.stateCode,
					EvolveUnit_Phone: this.phoneNumber,
					EvolveUnit_GstnUser: this.gstNUser,
					EvolveUnit_GstnPass: this.gstNPassword,
					EvolveUnit_Rek: this.unitRek,
					EvolveUnit_Country: this.country,
				};
				let response = await this.$axios.$post(
					"/api/v1/evolve/Unit/updateUnit",
					unitDetails
				);
				if (response.statusCode != 200) {
					this.notification("danger", 3000, response.message);
				} else {
					this.notification("success", 3000, response.message);
					this.$router.push("/evolve/units/list");
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
				let response = await this.$axios.$post(
					"/api/v1/evolve/testConnection",
					testDetails
				);

				if (response.statusCode != 200) {
					this.notification("danger", 3000, response.message);
				} else {
					this.notification("success", 3000, response.message);

					//this.$router.push('/evolve/companies/list')
				}

				// //this.$router.push('/dashboard/companies/list')
			}
		},
		handleFileUpload () {
			let fileData = document.getElementById("unit_logo");
			let imageData = fileData.files[0];
			if (fileData.files[0].size < 100000) {
				let reader = new FileReader();
				reader.addEventListener(
					"load",
					async function () {
						this.unitLogo = reader.result;
						this.imageChanged = true;
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