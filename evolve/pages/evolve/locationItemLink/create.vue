<template>
	<div class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<!-- <a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="refreshClick()"></a> -->
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
			</div>
			<div v-if="EvolveMenu_Id" class="evolve-page-header-icons">
				<a href="javascript:void(0)" data-uk-tooltip="title: Add To Favourite; pos: right" class="sc-actions-icon mdi mdi-star md-color-yellow-600" @click="$store.dispatch('addToFavouriteClick', EvolveMenu_Id)"></a>
			</div>
						
			<div class="evolve-page-header-icons evolve-float-right"> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click="$destroy() ; $store.dispatch('removeOneTab', '/mdm/itemLocationLink/create')"></a>
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
										<label for="table lable" class="evolve-input-lable">{{ translate.item_code }}:</label>
									</div>
									<div class="uk-width-1-2@m">
										<Select2Search
											v-model="ItemId"
											name="ItemId"
											:settings="{ 'width': '100%', 'placeholder': 'item', allowClear: true }"
											:ajax-url="getItemList"
											:minimum-input-length="3"
											@change="onChangeItem()"
										></Select2Search>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.item_description }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="itemDesc"
											name="itemDesc"
											mode="outline"
											:placeholder="translate.item_description"
											disabled
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.location }}:</label>
									</div>
									<div class="uk-width-1-2@m">
										<Select2
											v-model="locationId"
											name="locationId"
											:settings="{ 'width': '100%', 'placeholder': translate.select_location, allowClear: true }"
											@change="OnChangeLocation()"
										>
											<option key value>
												{{ translate.select_location }}
											</option>
											<option
												v-for="ll in LocationList"
												:key="ll.EvolveLocation_ID"
												:value="ll.EvolveLocation_ID"
												:selected="ll.EvolveLocation_ID == locationId"
											>
												{{ ll.EvolveLocation_Code }}
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
										<label for="table lable" class="evolve-input-lable">{{ translate.capacity }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="Capacity"
											name="Capacity"
											mode="outline"
											:placeholder="translate.capacity "
											disabled
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
								</div>
							</div>

							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.um }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="UM"
											name="UM"
											mode="outline"
											:placeholder="translate.um"
											disabled
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
								</div>
							</div>

							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.height }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="Height"
											name="Height"
											mode="outline"
											:placeholder="translate.height"
											disabled
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>

							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.length }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="Length"
											name="Length"
											mode="outline"
											:placeholder="translate.length"
											disabled
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>
					
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.width }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="Width"
											name="Width"
											mode="outline"
											:placeholder="translate.width"
											disabled
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>

							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.dimensional_unit_of_measure }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="DUom"
											name="DUom"
											mode="outline"
											:placeholder="translate.dimensional_unit_of_measure"
											disabled
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>

							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.persent_full }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="PersentFull"
											name="PersentFull"
											mode="outline"
											:placeholder="translate.persent_full"
											disabled
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>

							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<!-- <label for="table lable" class="evolve-input-lable">Location :</label> -->
									</div>
									<div class="uk-width-1-2@m">
										<!-- <center> -->
										<button
											class="sc-button sc-button-flat-danger uk-modal-close"
											type="button"
											@click="$destroy() ; $store.dispatch('removeOneTab', '/mdm/itemLocationLink/create')"
										>
											{{ translate.cancel }}
										</button>
										<button class="sc-button" type="button" @click="SaveLocationItemLink()">
											{{ translate.save }}
										</button>
										<!-- </center> -->
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

	components: {
		ScInput,
		Select2Search: process.client ? () => import("~/components/ajaxSearch/Select2Search") : null,
		Select2: process.client ? () => import("~/components/Select2") : null,

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
			EvolveMenu_Id :this.$route.query.EvolveMenu_Id,
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

				download_sample_erp_location : 'Download Sample Erp Location',
				upload_erp_location: 'Upload Erp Location',				
				location_type: 'Location Type',				
				select_warehouse: 'Select WareHouse',				
				select_system_location: 'Select System Location',				
				item_code: 'Item Code',				
				item_description: 'Item Description',				
				location: 'Location',				
				select_location: 'Select Location',				
				capacity: 'Capacity',				
				um: 'UM',				
				height: 'Height',				
				length: 'Length',				
				width: 'Width',				
				dimensional_unit_of_measure: 'Dimensional Unit Of Measure',				
				persent_full: 'Persent Full',
			},
		
			baseUrl: this.$axios.defaults.baseURL,
			// slectedMenuIcon: "",
			userId : '',
			ItemId : '',
			itemDesc : '',
			locationId : '',
			Capacity : '',
			UM : '',
			Height : '',
			Length : '',
			Width : '',
			DUom : '',
			PersentFull : '',
			locationCode : '',
			LocationList : [],

			// getUserList	: this.$axios.defaults.baseURL+'api/v1/mdm/locationItemLink/getUserList',
			// getLocationList	: this.$axios.defaults.baseURL+'/api/v1/eMdm/LocationItemLink/getLocationList',
			getItemList	: this.$axios.defaults.baseURL+'api/v1/eMdm/LocationItemLink/getItemSearch',
		};
	},

	computed: {},

	watch: {
	},

	beforeDestroy () {
		// clearInterval(this.ramUpdateInterval);
	},

	created: async function () {
		console.log("ENTERED IN LOCATION ITRM:::::::::::")
		this.removeModal();
		this.clearData()
		this.getLocationList()
	},
	validations: {
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
			this.locationId = "";
			this.ItemId = "";
			this.itemDesc = "";
			this.Capacity = "";
			this.UM = "";
			this.Height = "";
			this.Length = "";
			this.Width = "";
			this.DUom = "";
			this.PersentFull = "";
			this.locationCode = "";
		},

		getLocationList: async function () {
			let responce = await this.$axios.$get("/api/v1/eMdm/LocationItemLink/getLocationList")
				.catch((e) => { this.notification("danger", 10000, "Problem With Connecting Server!!");
				});
			if (responce) {
				if (responce.statusCode == 200) {
					this.LocationList = responce.result
				} else {
					this.notification("danger", 10000, responce.message);
				}
			}
		},
		onChangeItem: async function () {
			if(this.ItemId != ''){
				let responce = await this.$axios.$post("/api/v1/eMdm/LocationItemLink/getSingleItemDetails", {EvolveItem_ID : this.ItemId})
					.catch((e) => { this.notification("danger", 10000, "Problem With Connecting Server!!");
					});
				if (responce) {
					if (responce.statusCode == 200) {
						this.itemDesc = responce.result[0].EvolveItem_Desc;
						console.log("responce.result[0].EvolveLocation_ID", responce.result[0].EvolveLocation_ID)
						if(responce.result[0].EvolveLocation_ID != '' && responce.result[0].EvolveLocation_ID != null){
							this.locationId = responce.result[0].EvolveLocation_ID+"";
							this.OnChangeLocation();
						}
					} else {
						this.notification("danger", 10000, responce.message);
					}
				}
			}else{
				this.notification("danger", 10000, "Please Select Item");
			}
		},
		OnChangeLocation: async function () {
			if(this.locationId != ''){
				let responce = await this.$axios.$post("/api/v1/eMdm/LocationItemLink/getSingleLocationDetails", {EvolveLocation_ID : this.locationId})
					.catch((e) => { this.notification("danger", 10000, "Problem With Connecting Server!!");
					});
				if (responce) {
					if (responce.statusCode == 200) {
						this.Capacity = responce.result[0].EvolveLocation_Capacity+"";
						this.UM = responce.result[0].EvolveUom_Uom;
						this.Height = responce.result[0].EvolveLocation_Height+"";
						this.Length = responce.result[0].EvolveLocation_Length+"";
						this.Width = responce.result[0].EvolveLocation_Width+"";
						this.DUom = responce.result[0].DimensionUom;
						this.PersentFull = responce.result[0].EvolveLocation_PercentFull+"";
					} else {
						this.notification("danger", 10000, responce.message);
					}
				}
			}else{
				this.notification("danger", 10000, "Please Select Location");
			}
		},
		SaveLocationItemLink: async function () {
			if(this.locationId != '' && this.ItemId != ''){
				let responce = await this.$axios.$post("/api/v1/eMdm/LocationItemLink/AddLocationItemLink", {
					EvolveLocation_ID : this.locationId,
					EvolveItem_ID : this.ItemId
				}).catch((e) => { this.notification("danger", 10000, "Problem With Connecting Server!!");
				});
				if (responce) {
					if (responce.statusCode == 200) {
						this.notification("success", 10000, responce.message);
						this.$destroy() ;
						this.clearData();
						this.$store.dispatch('removeOneTab', '/mdm/locationItemLink/create')
					} else {
						this.notification("danger", 10000, responce.message);
					}
				}
			}else{
				this.notification("danger", 10000, "Please Select Item And Location");
			}
		},

	},
};
</script>

<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>