<template>
	<div class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<!-- <a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="refreshClick()"></a> -->
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
			</div>
						
			<div class="evolve-page-header-icons evolve-float-right"> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click="$destroy() ; $store.dispatch('removeOneTab', '/evolve/units/optionsV2')"></a>
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
										<label for="table lable" class="evolve-input-lable">{{ translate.company }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<Select2
											v-model="$v.company.$model"
											:settings="{ 'width': '100%', 'placeholder': translate.company, allowClear: true }"
											name="company"
											:error-class="$v.company.$error"
											:validator="$v.company"
											class="evolve-input"
											tabindex="1"
											autofocus	
											@change="onChangeCompany()"
										>
											<option key="" value="">
											</option>
											<option
												v-for="cl in companyList"
												:key="cl.EvolveCompany_ID"
												:value="cl.EvolveCompany_ID"
											>
												{{ cl.EvolveCompany_Name }} - {{ cl.EvolveCompany_Code }}
											</option>
										</Select2>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.unit_code }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="$v.unitcode.$model"
											mode="outline"
											:placeholder="translate.unit_code"
											name="unitcode"
											:error-class="$v.unitcode.$error"
											:validator="$v.unitcode"
											class="evolve-input"
											tabindex="1"
											autofocus
											:disabled="unitCodeISDesable"
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.unit_name }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="$v.unitname.$model"
											mode="outline"
											:placeholder="translate.unit_name"
											name="unitname"
											:error-class="$v.unitname.$error"
											:validator="$v.unitname"
											class="evolve-input"
											tabindex="1"
											autofocus
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>
						</div>


						<div class="uk-first-column">
							<div class="uk-card">
								<!-- <h3 class="uk-card-title">
									Default
								</h3>  -->
								<div class="uk-card-body">
									<ul data-uk-tab="" class="uk-tab">
										<li class="uk-active">
											<a href="javascript:void(0)">Address</a>
										</li> 
										<li>
											<a href="javascript:void(0)">Tax Details</a>
										</li> 
										<li>
											<a href="javascript:void(0)">
												Contact
											</a>
										</li> 
									</ul> 
									<ul class="uk-switcher">
										<li class="uk-active">
											<div class="uk-grid" data-uk-grid>
												<div class="uk-width-1-3@m">
													<div class="uk-grid" data-uk-grid>
														<div class="uk-width-1-2@m">
															<label for="table lable" class="evolve-input-lable">{{ translate.Address_1 }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<ScInput
																v-model="$v.Address1.$model"
																mode="outline"
																:placeholder="translate.Address_1"
																name="Address1"
																:error-class="$v.Address1.$error"
																:validator="$v.Address1"
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
															<label for="table lable" class="evolve-input-lable">{{ translate.Address_2 }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<ScInput
																v-model="$v.Address2.$model"
																mode="outline"
																:placeholder="translate.Address_2"
																name="Address2"
																:error-class="$v.Address2.$error"
																:validator="$v.Address2"
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
															<label for="table lable" class="evolve-input-lable">{{ translate.Address_3 }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<ScInput
																v-model="$v.Address3.$model"
																mode="outline"
																:placeholder="translate.Address_3"
																name="Address3"
																:error-class="$v.Address3.$error"
																:validator="$v.Address3"
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
															<label for="table lable" class="evolve-input-lable">{{ translate.country }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<Select2
																v-model="$v.country.$model"
																:settings="{ 'width': '100%', 'placeholder': translate.country, allowClear: true }"
																name="country"
																:error-class="$v.country.$error"
																:validator="$v.country"
																class="evolve-input"
																tabindex="1"
																autofocus
															>
																<option key="" value="">
																</option>
																<option
																	v-for="c in country_list"
																	:key="c.value"
																	:value="c.value"
																>
																	{{ c.value }}
																</option>
															</Select2>
														</div>
													</div>
												</div>
												<div class="uk-width-1-3@m">
													<div class="uk-grid" data-uk-grid>
														<div class="uk-width-1-2@m">
															<label for="table lable" class="evolve-input-lable">{{ translate.state }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<Select2
																v-model="$v.state.$model"
																:settings="{ 'width': '100%', 'placeholder': translate.state, allowClear: true }"
																name="state"
																:error-class="$v.state.$error"
																:validator="$v.state"
																class="evolve-input"
																tabindex="1"
																autofocus
															>
																<option key="" value="">
																</option>
																<option
																	v-for="s in state_list"
																	:key="s.value"
																	:value="s.value"
																>
																	{{ s.value }}
																</option>
															</Select2>
														</div>
													</div>
												</div>
												<div class="uk-width-1-3@m">
													<div class="uk-grid" data-uk-grid>
														<div class="uk-width-1-2@m">
															<label for="table lable" class="evolve-input-lable">{{ translate.city }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<Select2
																v-model="$v.city.$model"
																:settings="{ 'width': '100%', 'placeholder': translate.city, allowClear: true }"
																name="city"
																:error-class="$v.city.$error"
																:validator="$v.city"
																class="evolve-input"
																tabindex="1"
																autofocus
															>
																<option key="" value="">
																</option>
																<option
																	v-for="c in city_list"
																	:key="c.value"
																	:value="c.value"
																>
																	{{ c.value }}
																</option>
															</Select2>
														</div>
													</div>
												</div>
												<div class="uk-width-1-3@m">
													<div class="uk-grid" data-uk-grid>
														<div class="uk-width-1-2@m">
															<label for="table lable" class="evolve-input-lable">{{ translate.zip_code }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<ScInput
																v-model="$v.zipcode.$model"
																mode="outline"
																:placeholder="translate.zip_code"
																name="zipcode"
																:error-class="$v.zipcode.$error"
																:validator="$v.zipcode"
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
															<label for="table lable" class="evolve-input-lable">{{ translate.county }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<ScInput
																v-model="$v.county.$model"
																mode="outline"
																:placeholder="translate.county"
																name="county"
																:error-class="$v.county.$error"
																:validator="$v.county"
																class="evolve-input"
																tabindex="1"
																autofocus
															></ScInput>
														</div>
													</div>
												</div>
											</div>
										</li>       
										<li>
											<div class="uk-grid" data-uk-grid>
												<div class="uk-width-1-3@m">
													<div class="uk-grid" data-uk-grid>
														<div class="uk-width-1-2@m">
															<label for="table lable" class="evolve-input-lable">{{ translate.tax_class }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<Select2
																v-model="$v.taxclass.$model"
																:settings="{ 'width': '100%', 'placeholder': translate.tax_class, allowClear: true }"
																name="taxclass"
																:error-class="$v.taxclass.$error"
																:validator="$v.taxclass"
																class="evolve-input"
																tabindex="1"
																autofocus
															>
																<option key="" value="">
																</option>
																<option
																	v-for="Classlist in TaxClassList"
																	:key="Classlist.EvolveTaxClass_Code"
																	:value="Classlist.EvolveTaxClass_Code"
																>
																	{{ Classlist.EvolveTaxClass_Code }}
																</option>
															</Select2>
														</div>
													</div>
												</div>
												<div class="uk-width-1-3@m">
													<div class="uk-grid" data-uk-grid>
														<div class="uk-width-1-2@m">
															<label for="table lable" class="evolve-input-lable">{{ translate.tax_usage }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<Select2
																v-model="$v.taxusage.$model"
																:settings="{ 'width': '100%', 'placeholder': translate.tax_usage, allowClear: true }"
																name="taxusage"
																:error-class="$v.taxusage.$error"
																:validator="$v.taxusage"
																class="evolve-input"
																tabindex="1"
																autofocus
															>
																<option key="" value="">
																</option>
																<option
																	v-for="tu in Tax_Usage"
																	:key="tu.value"
																	:value="tu.value"
																>
																	{{ tu.value }}
																</option>
															</Select2>
														</div>
													</div>
												</div>
												<div class="uk-width-1-3@m">
													<div class="uk-grid" data-uk-grid>
														<div class="uk-width-1-2@m">
															<label for="table lable" class="evolve-input-lable">{{ translate.tax_zone }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<Select2
																v-model="$v.taxzone.$model"
																:settings="{ 'width': '100%', 'placeholder': translate.tax_zone, allowClear: true }"
																name="taxzone"
																:error-class="$v.taxzone.$error"
																:validator="$v.taxzone"
																class="evolve-input"
																tabindex="1"
																autofocus
															>
																<option key="" value="">
																</option>
																<option
																	v-for="txz in TaxZoneList"
																	:key="txz.EvolveGenericCodeMaster_Value"
																	:value="txz.EvolveGenericCodeMaster_Value"
																>
																	{{ txz.EvolveGenericCodeMaster_Value }}
																</option>
															</Select2>
														</div>
													</div>
												</div>
												<div class="uk-width-1-3@m">
													<div class="uk-grid" data-uk-grid>
														<div class="uk-width-1-2@m">
															<label for="table lable" class="evolve-input-lable">{{ translate.pan_no }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<ScInput
																v-model="$v.panno.$model"
																mode="outline"
																:placeholder="translate.pan_no"
																name="panno"
																:error-class="$v.panno.$error"
																:validator="$v.panno"
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
															<label for="table lable" class="evolve-input-lable">{{ translate.gst_no }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<ScInput
																v-model="$v.gstno.$model"
																mode="outline"
																:placeholder="translate.gst_no"
																name="gstno"
																:error-class="$v.gstno.$error"
																:validator="$v.gstno"
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
															<label for="table lable" class="evolve-input-lable">{{ translate.is_taxble }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<PrettyCheck v-model="istaxble" class="p-icon evolve-input" name="istaxble">
																<i slot="extra" class="icon mdi mdi-check"></i>
																{{ translate.is_taxble }}
															</PrettyCheck>
														</div>
													</div>
													<div class="uk-width-1-3@m">
													</div>
												</div>
											</div>
										</li> 
										<li>
											<div class="uk-grid" data-uk-grid>
												<div class="uk-width-1-3@m">
													<div class="uk-grid" data-uk-grid>
														<div class="uk-width-1-2@m">
															<label for="table lable" class="evolve-input-lable">{{ translate.name }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<ScInput
																v-model="$v.name.$model"
																mode="outline"
																:placeholder="translate.name"
																name="name"
																:error-class="$v.name.$error"
																:validator="$v.name"
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
															<label for="table lable" class="evolve-input-lable">{{ translate.designation }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<ScInput
																v-model="$v.designation.$model"
																mode="outline"
																:placeholder="translate.designation"
																name="designation"
																:error-class="$v.designation.$error"
																:validator="$v.designation"
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
															<label for="table lable" class="evolve-input-lable">{{ translate.department }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<ScInput
																v-model="$v.department.$model"
																mode="outline"
																:placeholder="translate.department"
																name="department"
																:error-class="$v.department.$error"
																:validator="$v.department"
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
															<label for="table lable" class="evolve-input-lable">{{ translate.email }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<ScInput
																v-model="$v.email.$model"
																mode="outline"
																:placeholder="translate.email"
																name="email"
																:error-class="$v.email.$error"
																:validator="$v.email"
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
															<label for="table lable" class="evolve-input-lable">{{ translate.number }} :</label>
														</div>
														<div class="uk-width-1-2@m">
															<ScInput
																v-model="$v.number.$model"
																mode="outline"
																:placeholder="translate.number"
																name="number"
																:error-class="$v.number.$error"
																:validator="$v.number"
																class="evolve-input"
																tabindex="1"
																autofocus
															></ScInput>
														</div>
													</div>
												</div>
											</div>
										</li>
									</ul>
								</div> <!---->
							</div>
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
											@click="$destroy() ; $store.dispatch('removeOneTab', '/evolve/units/optionsV2')"
										>
											{{ translate.cancel }}
										</button>
										<button class="sc-button" type="button" @click="createOrUpateUnit()">
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
		Select2: process.client ? () => import("~/components/Select2") : null,
		PrettyCheck,
	},
	mixins: [validationMixin],
	props: {
		params: {
			type: Object
		}
	},
	layout: "eDefaultV2",

	data () {
		return {
			translate: {
		
				unit_code : "unit Code",
				unit_name :"unit Name",
				search_here : 'Search Here',
				cancel : 'Cancel',
				save : 'Save',
				Address_1 : "Address 1",
				Address_2 : "Address 2",
				Address_3 : "Address 3",
				country : "Country",
				state : "State",
				city : "City",
				zip_code : "Zip Code",
				county : "County",
				is_taxble : "Is Taxble",
				tax_class : "Tax Class",
				tax_usage : "Tax Usage",
				tax_zone : "Tax Zone",
				pan_no : "Pan  Number",
				gst_no : "GST Number",
				name : "Name",
				designation : "Designation",
				email : "E-Mail",
				department : "Department",
				number : "Number",
				company : "Company",
                
		

			},
			baseUrl: this.$axios.defaults.baseURL,
			isImageChanged  : false,
			slectedMenuIcon: "mdi mdi-view-list",
			menuIcon: "view-list",
			mdIconsSearch: "",
			mdIcons: [],
			iconList: [],
			// slectedMenuIcon: "",
			menuType : '',
			menuTypeDesc : '',

			companyList : [],
			TaxClassList :[],
			TaxZoneList : [],

			city_list : [
				{
					key  : 'Ahmedabad',
					value  : 'Ahmedabad'

				}
			],
			state_list : [
				{
					key  : 'gujarat',
					value  : 'gujarat'

				}
			],
			country_list : [
				{
					key  : 'India',
					value  : 'India'

				}
			],
			Tax_Usage : [
				{
					key  : 'TaxUsage001',
					value  : 'TaxUsage001'

				}
			],

			unitid : "",
			Address1 : "",
			Address2 : "",
			Address3 : "",
			country : "",
			state : "",
			city : "",
			zipcode : "",
			county : "",
			istaxble : false,
			taxclass : "",
			taxusage : "",
			taxzone : "",
			panno : "",
			gstno : "",
			name : "",
			designation : "",
			email : "",
			department : "",
			number : "",
			company : "",
			unitcode : "",
			unitname : "",
			addressId : "",
			contactId : "",
			unitCodeISDesable : false,
 

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
		this.asyncData();
		this.removeModal();
		this.getCompanyList();
		this.getTaxClassList();
		this.getTaxZoneList();
		this.unitid = this.params.EvolveUnit_ID;
		// console.log("this.unitid???",  this.unitid)
		if(this.unitid ==  undefined ||  this.unitid ==  '' ){
			this.clearData()
		}else{
			await this.getSingleCompanyDetails();
		}
	},
	validations: {
		company : {
			required
		},
		unitcode : {
			required
		},
		unitname : {
			required
		},
		Address1 : {
			required
		},
		Address2 : {
			required
		},
		Address3 : {
			// required
		},
		country : {
			required
		},
		city : {
			required
		},
		state : {
			required
		},
		zipcode : {
			required
		},
		county : {
			required
		},
		istaxble : {
			required
		},
		taxclass : {
			required
		},
		taxusage : {
			required
		},
		taxzone : {
			required
		},
		panno : {
			required
		},
		gstno : {
			required
		},
		name : {
			required
		},
		designation : {
			required
		},   
		email : {
			required,
			email,
		}, 
		department : {
			required
		},
		number : {
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

		onInputSearch: function () {
			this.currentPage = 1;
			this.getAllAppList();
			this.paginateClick(1);
		},

		downloadPdf: function () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("appMaster").outerHTML;
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
					title: "Evolve App Master",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveAppMaster",
				},
			};
		},

		downloadCsv: function () {
			let filename = "evolveAppMaster";
			let csv = [];
			let html = document.getElementById("appMaster").outerHTML;
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

		clearData: async function () {
			this.$v.$reset();
			this.unitid = "";
			this.unitcode = "";
			this.unitname = "";
			this.company = "";
			this.addressId = "";
			this.contactId = ""; 
			this.Address1 = "";
			this.Address2 = "";
			this.Address3 = "";
			this.country = "";
			this.state = "";
			this.city = "";
			this.zipcode = "";
			this.county = "";
			this.istaxble = false;
			this.taxclass = "";
			this.taxusage = "";
			this.taxzone = "";
			this.panno = "";
			this.gstno = "";
			this.name = "";
			this.designation = "";
			this.email = "";
			this.department = "";
			this.number = "";
		},

		getSingleCompanyDetails: async function () {
			this.unitCodeISDesable = true
			// this.newSeqAdd = false;
			let details = await this.$axios
				.$post("/api/v1/evolve/Unit/getSingleUnitDetails", {
					EvolveUnit_ID: this.unitid,
				})
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (details.statusCode == 200) {
				this.unitid = details.result[0].EvolveUnit_ID;
				this.company = details.result[0].EvolveCompany_ID;
				this.unitcode = details.result[0].EvolveUnit_Code;
				this.unitname = details.result[0].EvolveUnit_Name;
				this.addressId =  details.result[0].EvolveAddress_ID;
				this.Address1 = details.result[0].EvolveAddress_Address1;
				this.Address2 = details.result[0].EvolveAddress_Address2;
				this.Address3 = details.result[0].EvolveAddress_Address3;
				this.state = details.result[0].EvolveAddress_State;
				this.city = details.result[0].EvolveAddress_City;
				this.zipcode = details.result[0].EvolveAddress_ZipCode;
				this.country = details.result[0].EvolveAddress_Country;
				this.county = details.result[0].EvolveAddress_County;
				this.taxclass = details.result[0].EvolveAddress_TaxClass;
				this.taxusage = details.result[0].EvolveAddress_TaxUsage;
				this.taxzone = details.result[0].EvolveAddress_TaxZone;
				this.istaxble = details.result[0].EvolveAddress_IsTaxable;
				this.panno = details.result[0].EvolveAddress_PanNumber;
				this.gstno = details.result[0].EvolveAddress_GstIn;
				this.contactId = details.result[0].EvolveContact_ID;
				this.name = details.result[0].EvolveContact_Name;
				this.designation = details.result[0].EvolveContact_Designation;
				this.department = details.result[0].EvolveContact_Department;
				this.email = details.result[0].EvolveContact_Email;
				this.number = details.result[0].EvolveContact_Contactumber;
			} else {
				this.notification("danger", 3000, details.message);
			}
		},


		onIconSelections: async function (iconName) {
			this.slectedMenuIcon = iconName;
		},

		asyncData: async function () {
			let data = require("~/assets/js/utils/mdIcons.js").default;
			//console.log("data :", data);
			this.mdIcons = data;
			return { mdIcons: data };
		},

		getIconList: async function () {
			let responce = await this.$axios
				.$post("/api/v1/evolve/MenuType/getMdiIconLis")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (responce) {
				if (responce.statusCode == 200) {
					this.iconList = responce.result;
				} else {
					this.notification("danger", 3000, responce.message);
				}
			}
		},

		getTaxClassList : async function (){
			let details = await this.$axios
				.$post("/api/v1/evolve/Company/getTaxClassList")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (details.statusCode == 200) {
				this.TaxClassList = details.result
			} else {
				this.notification("danger", 3000, details.message);
			}
		},

		getTaxZoneList : async function (){
			let details = await this.$axios
				.$post("/api/v1/evolve/Company/getTaxZoneList")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (details.statusCode == 200) {
				this.TaxZoneList = details.result
			} else {
				this.notification("danger", 3000, details.message);
			}
		}, 

		getCompanyList : async function (){
			let details = await this.$axios
				.$post("/api/v1/evolve/Unit/getCompanyList")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (details.statusCode == 200) {
				this.companyList = details.result
			} else {
				this.notification("danger", 3000, details.message);
			}
		},


		createOrUpateUnit: async function () {
			this.$v.$touch();
			if (this.$v.$invalid) {

				this.notification("danger", 3000, "Fill All Required Fileds");
			}else{
				let data = {
					EvolveUnit_ID : this.unitid,
					EvolveUnit_Code: this.unitcode,
					EvolveUnit_Name: this.unitname,
					EvolveCompany_ID: this.company,
					Address : {
						"EvolveAddress_ID" : this.addressId,
						"EvolveAddress_Address1" : this.Address1,
						"EvolveAddress_Address2" : this.Address2,
						"EvolveAddress_Address3" : this.Address3,
						"EvolveAddress_State" : this.state,
						"EvolveAddress_City" : this.city,
						"EvolveAddress_ZipCode" : this.zipcode,
						"EvolveAddress_Country" : this.country,
						"EvolveAddress_County" : this.county,
					},
					tax : {
						"EvolveAddress_TaxClass" : this.taxclass,
						"EvolveAddress_TaxUsage" : this.taxusage,
						"EvolveAddress_TaxZone" : this.taxzone,
						"EvolveAddress_IsTaxable" : this.istaxble,
						"EvolveAddress_PanNumber" : this.panno,
						"EvolveAddress_GstIn" : this.gstno,
					},
					Contact : {
						"EvolveContact_ID" : this.contactId,
						"EvolveContact_Name" : this.name,
						"EvolveContact_Designation" : this.designation,
						"EvolveContact_Department" : this.department,
						"EvolveContact_Email" : this.email,
						"EvolveContact_Contactumber" : this.number,
					}
				};
				let createOrEdit 

				if(this.unitid == ''){

					createOrEdit = await this.$axios.$post("/api/v1/evolve/Unit/createUnitV2", data)
						.catch((e) => {
							this.notification(
								"danger",
								3000,
								"Problem With Connecting Server!!"
							);
						});
                    
                    
				}else{
					createOrEdit = await this.$axios.$post("/api/v1/evolve/Unit/upateUnitV2", data)
						.catch((e) => {
							this.notification(
								"danger",
								3000,
								"Problem With Connecting Server!!"
							);
						});
				}
				if (createOrEdit) {
					if (createOrEdit.statusCode == 200) {
						this.$destroy() ;
						this.$store.dispatch('removeOneTab', '/evolve/units/optionsV2')

						this.notification("success", 3000, createOrEdit.message);
					} else {
						this.notification("danger", 3000, createOrEdit.message);
					}
				}
            
			}

			// c
		},

		onChangeCompany: async function () {

			if(this.company != '' && this.company != null ){

				let details = await this.$axios
					.$post("/api/v1/evolve/Company/getSingleCompanyDetailsV2", {
						EvolveCompany_ID: this.company,
					})
					.catch((e) => {
						this.notification(
							"danger",
							3000,
							"Problem with connecting to server!"
						);
					});
				if (details.statusCode == 200) {
					if(details.result.length >0){
						// this.companyid = details.result[0].EvolveCompany_ID;
						// this.companycode = details.result[0].EvolveCompany_Code;
						// this.companyname = details.result[0].EvolveCompany_Name;
						// this.businessGroup = details.result[0].EvolveBusinessGroup_ID;
						// this.addressId =  details.result[0].EvolveAddress_ID;
						this.Address1 = details.result[0].EvolveAddress_Address1;
						this.Address2 = details.result[0].EvolveAddress_Address2;
						this.Address3 = details.result[0].EvolveAddress_Address3;
						this.state = details.result[0].EvolveAddress_State;
						this.city = details.result[0].EvolveAddress_City;
						this.zipcode = details.result[0].EvolveAddress_ZipCode;
						this.country = details.result[0].EvolveAddress_Country;
						this.county = details.result[0].EvolveAddress_County;
						this.taxclass = details.result[0].EvolveAddress_TaxClass;
						this.taxusage = details.result[0].EvolveAddress_TaxUsage;
						this.taxzone = details.result[0].EvolveAddress_TaxZone;
						this.istaxble = details.result[0].EvolveAddress_IsTaxable;
						this.panno = details.result[0].EvolveAddress_PanNumber;
						this.gstno = details.result[0].EvolveAddress_GstIn;
						this.contactId = details.result[0].EvolveContact_ID;
						this.name = details.result[0].EvolveContact_Name;
						this.designation = details.result[0].EvolveContact_Designation;
						this.department = details.result[0].EvolveContact_Department;
						this.email = details.result[0].EvolveContact_Email;
						this.number = details.result[0].EvolveContact_Contactumber;
					}else{


						this.Address1 = '';
						this.Address2 = '';
						this.Address3 = '';
						this.state = '';
						this.city = '';
						this.zipcode = '';
						this.country = '';
						this.county = '';
						this.taxclass = '';
						this.taxusage = '';
						this.taxzone = '';
						this.istaxble = '';
						this.panno = '';
						this.gstno = '';
						this.contactId = '';
						this.name = '';
						this.designation = '';
						this.department = '';
						this.email = '';
						this.number = '';
					}



				} else {
					this.notification("danger", 3000, details.message);
				}

			}else{
				this.Address1 = '';
				this.Address2 = '';
				this.Address3 = '';
				this.state = '';
				this.city = '';
				this.zipcode = '';
				this.country = '';
				this.county = '';
				this.taxclass = '';
				this.taxusage = '';
				this.taxzone = '';
				this.istaxble = '';
				this.panno = '';
				this.gstno = '';
				this.contactId = '';
				this.name = '';
				this.designation = '';
				this.department = '';
				this.email = '';
				this.number = '';

			}

		},

	},
};
</script>

<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>