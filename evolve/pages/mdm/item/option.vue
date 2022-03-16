<template>
	<div class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<!-- <a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="getTexClassList()"></a> -->
				<!-- <a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="refreshClick()"></a> -->
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
			</div>
						
			<div class="evolve-page-header-icons evolve-float-right"> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click="$destroy() ; $store.dispatch('removeOneTab', pageURL)"></a>
			</div>
		</div>
		<div class="evolve-page-body">
			<div id="nav-mdi" class="uk-card">
				<div class="uk-card-body min-height-back">
					<!-- <div class="uk-child-width-1-1@m uk-grid" data-uk-grid> -->
					<div class="uk-modal-body">
						<div class="uk-grid" data-uk-grid>
							<!-- ---- 1 c --- -->
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable"
											class="evolve-input-lable"
											:data-uk-tooltip="translate.item_part"
										>{{ translate.item_part }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="part"
											mode="outline"
											name="Name"
											:disabled="true"
											class="evolve-input"
											tabindex="1"
										></ScInput>
									</div>
								</div>
							</div>
							<!-- ----	2c ----- -->
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable"
											class="evolve-input-lable"
											:data-uk-tooltip="translate.highspeed"
										>{{ translate.highspeed }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="highSpeed"
											mode="outline"
											:placeholder="translate.highspeed"
											name="highspeed"
											class="evolve-input"
											tabindex="1"
											autofocus
										></ScInput>
									</div>
								</div>
							</div>

							<!-- 3c-->
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable"
											class="evolve-input-lable"
											:data-uk-tooltip="translate.qctemp"
										>{{ translate.qctemp }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<Select2
											v-model="qcTemp"
											:settings="{ 'width': '100%', 'placeholder': translate.qctemp, allowClear: true}"
										>
											<option
												v-for="loc in qcTempList"
												:key="loc.EvolveQCTemp_ID"
												:value="loc.EvolveQCTemp_ID"
											>
												{{ loc.EvolveQCTemp_Name }}
											</option>
										</Select2>
									</div>
								</div>
							</div>
							<br>
							<!-- -------- save and cancle btn code ----------- -->
							<div class="uk-width-1-3@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
									</div>
									<div class="uk-width-1-2@m">
										<div>
											<button class="sc-button" type="button" @click="updateItem()">
												{{ translate.save }}
											</button>
											<button
												class="sc-button sc-button-flat sc-button-flat-danger"
												type="button"
												@click="$destroy() ; $store.dispatch('removeOneTab', pageURL)"
											>
												{{ translate.cancel }}
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- </div> -->
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
.box {
	margin-top: 5px;
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
		//PrettyCheck,
		Select2: process.client ? () => import("~/components/Select2") : null,
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
				item_part:"Item Part", 
				highspeed:"High Speed", 
				qctemp:"Select Qc", 
				cancel : 'Cancel',
				save : 'Save',
				
			},
			// --- ScInput name ----
			EvolveItem_ID:"",
			part: "",
			highSpeed:"",
			qcTemp:"",
			pageURL:"/mdm/item/option",
			// array here
			qcTempList:[],
		}
	},

	created: async function () {
		await this.clearData();
		await this.getQcTempList();
		if(this.$route.query.EvolveItem_ID ==  undefined ||  this.$route.query.EvolveItem_ID ==  '' ){
            
		}else{
			this.EvolveItem_ID = this.$route.query.EvolveItem_ID;
			await this.getSingleItemDetail(this.$route.query.EvolveItem_ID)
		}
	},

	validations: {

	},
	methods: {

		clearData: async function () {

			this.EvolveItem_ID = ""
			this.part = "";
			this.highspeed = "";
			this.qcTemp = "";
			this.qcTempList = [];
			this.$destroy();
		
		},

		getQcTempList: async function () {
			try{
				let list = await this.$axios
					.$get("/api/v1/eMdm/Item/getQcTempList")
					.catch((e) => {
						this.notification("danger", 10000, "Problem With Connecting Server!!");
					});
				if (list.statusCode == 200) {
					this.qcTempList = list.result;
			
				} else {
					this.notification("danger", 10000, list.message);
				}
			}catch(error){
				this.notification("danger", 10000, error.message);
			}
		},

		getSingleItemDetail: async function (EvolveItem_ID) {
			try{
				let list = await this.$axios
					.$post("/api/v1/eMdm/Item/getSingleItemDetail", {EvolveItem_ID:EvolveItem_ID})
					.catch((e) => {
						this.notification("danger", 10000, "Problem With Connecting Server!!");
					});
				if (list.statusCode == 200) {

					this.part = list.result.EvolveItem_Part;
					this.highSpeed = list.result.EvolveItem_HighSpeedTime;
					this.qcTemp = list.result.EvolveQCTemp_ID+"";
			
				} else {
					this.notification("danger", 10000, list.message);
				}
			}catch(error){
				this.notification("danger", 10000, error.message);
			}
		},

		updateItem: async function () {
			try{
				let updateItem = await this.$axios
					.$post("/api/v1/eMdm/Item/updateItem", {
						EvolveItem_ID: this.EvolveItem_ID,
						EvolveItem_HighSpeedTime: this.highSpeed,
						EvolveQCTemp_ID: this.qcTemp

					})
					.catch((e) => {
						this.notification("danger", 10000, "Problem With Connecting Server!!");
					});
				if (updateItem.statusCode == 200) {
					this.clearData()
					this.$destroy() ; 
					this.$store.dispatch('removeOneTab', this.pageURL)
					this.notification("success", 10000, updateItem.message);

				} else {
					this.notification("danger", 10000, updateItem.message);
				}
			}catch(error){
				this.notification("danger", 10000, error.message);
			}
		}

	}
}
</script>

<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>