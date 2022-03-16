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
						{{ translate.item_master }}
					</h1>
					<div class="sc-actions uk-margin-left">
						<div id="sc-dt-buttons"></div>
						<!-- <nuxt-link
							to="/evolve/items/list"
							class="sc-button datatable-print-button sc-button-primary"
						>
							<i class="mdi mdi-keyboard-backspace"></i>
							{{ translate.back }}
						</nuxt-link> -->
						<button
							to="/evolve/items/_options"
							class="sc-button datatable-print-button sc-button-primary"
							@click="$destroy(); $store.dispatch('removeOneTab', '/evolve/items/_options')"
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
				<div id="addEditItemToSupllier" class="uk-modal" data-uk-modal bg-close="false">
					<div class="uk-modal-dialog">
						<button class="uk-modal-close-default" type="button" data-uk-close></button>
						<div class="uk-modal-header">
							<h2 class="uk-modal-title">
								{{ translate.item_to_supplier_assign }}
							</h2>
						</div>
						<div class="uk-modal-body">
							<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
								<div>
									<label>{{ translate.item_code }}</label>
									<client-only>
										<ScInput
											v-model="itemCode"
											mode="outline"
											name="itemCode"
											placeholder="Item Code"
											disabled
										></ScInput>
									</client-only>
								</div>
								<div>
									<label>{{ translate.approve_not_approved }}:</label>
									<client-only>
										<br>
										<PrettyCheck v-model="approvedStatus" class="p-icon" name="approvedStatus">
											<i slot="extra" class="icon mdi mdi-check"></i>
											{{ translate.is_approve }}
										</PrettyCheck>
									</client-only>
								</div>
								<div>
									<label>{{ translate.inventory_status }}</label>
									<client-only>
										<br>
										<PrettyCheck v-model="InventoryStatus" class="p-icon" name="InventoryStatus">
											<i slot="extra" class="icon mdi mdi-check"></i>
											{{ translate.is_active }}
										</PrettyCheck>
									</client-only>
								</div>
							</div>
							<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
								<div>
									<label>{{ translate.select_template }}</label>
									<client-only>
										<Select2
											v-model=" qCTempID"
											:settings="{ 'width': '100%', 'placeholder': 'Select Template ...', allowClear: true }"
											name="qCTempID"
										>
											<option key value selected>
												{{ translate.select_template }}
											</option>
											<option
												v-for="tp in QCTempList"
												:key="tp.EvolveQCTemp_ID"
												:value="tp.EvolveQCTemp_ID"
											>
												{{ tp.EvolveQCTemp_Name }}
											</option>
										</Select2>
									</client-only>
								</div>
								<div>
									<label>{{ translate.select_location }}</label>
									<client-only>
										<Select2
											v-model="locationId"
											:settings="{ 'width': '100%', 'placeholder': 'Select location ...', allowClear: true }"
											name="locationId"
										>
											<option key value selected>
												{{ translate.select_location }}
											</option>
											<option
												v-for="lo in locationList"
												:key="lo.EvolveLocation_ID"
												:value="lo.EvolveLocation_ID"
											>
												{{ lo.EvolveLocation_Name }}
											</option>
										</Select2>
									</client-only>
								</div>
							</div>
							<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
								<div>
									<label>{{ translate.supplier }}</label>
									<Select2
										v-model=" supplierId"
										:settings="{ 'width': '100%', 'placeholder': 'Select supplier ...', allowClear: true }"
										name="supplierId"
										@change="onSelectSupplier(supplierId)"
									>
										<option key value selected>
											{{ translate.select_supplier }}
										</option>
										<option
											v-for="sp in supplierList"
											:key="sp.EvolveSupplier_ID"
											:value="sp.EvolveSupplier_ID"
										>
											{{ sp.EvolveSupplier_Name }}
										</option>
									</Select2>
								</div>
								<div>
									<table>
										<tr
											v-for="sl in selectedSupplierList"
											:key="sl.EvolveSupplier_ID"
											:value="sl.EvolveSupplier_ID"
										>
											<td>{{ sl.EvolveSupplier_Name }}</td>
											<td>
												<button
													class="sc-button sc-button-mini sc-button-danger waves-button waves-light uk-width-1-1"
													@click="supplierDelete(sl.EvolveSupplier_ID)"
												>
													<i class="mdi mdi-delete-forever"></i>
												</button>
											</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
						<div class="uk-modal-footer uk-text-right">
							<button
								class="sc-button sc-button-flat sc-button-flat-danger uk-modal-close"
								type="button"
							>
								{{ translate.cancel }}
							</button>
							<button
								class="sc-button"
								type="button"
								@click="addItemAssignment($event)"
							>
								{{ translate.save }}
							</button>
						</div>
					</div>
				</div>

				<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.item_code }}</label>
						<client-only>
							<ScInput
								v-model="$v.itemCode.$model"
								:error-class="$v.itemCode.$error"
								:validator="$v.itemCode"
								mode="outline"
								name="itemCode"
								placeholder="Item Code"
							></ScInput>
						</client-only>
						<ul class="sc-vue-errors">
							<li v-if="!$v.itemCode.required">
								{{ translate.item_code_is_required }} *
							</li>
						</ul>
					</div>
					<div>
						<label>{{ translate.item_type }}</label>
						<client-only>
							<Select2
								v-model="$v.itemType.$model"
								:error-class="$v.itemType.$error"
								:validator="$v.itemType"
								name="itemType"
								:settings="{ 'width': '100%', 'placeholder': 'Select Item Type...', allowClear: true }"
							>
								<option key="1" value="PARENT">
									PARENT
								</option>
								<option key="2" value="CHILD">
									CHILD
								</option>
							</Select2>
						</client-only>
						<ul class="sc-vue-errors">
							<li v-if="!$v.itemType.required">
								{{ translate.item_type_is_required }} *
							</li>
						</ul>
					</div>
				</div>
				<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.uom }}</label>
						<client-only>
							<Select2
								v-model="$v.uom.$model"
								:error-class="$v.uom.$error"
								:validator="$v.uom"
								name="uom"
								:settings="{ 'width': '100%', 'placeholder': 'Select UOM...', allowClear: true }"
							>
								<option key value selected>
									{{ translate.uom }}
								</option>
								<option
									v-for="ul in uomList"
									:key="ul.EvolveUom_ID"
									:value="ul.EvolveUom_ID"
								>
									{{ ul.EvolveUom_Uom }}
								</option>
							</Select2>
						</client-only>
						<ul class="sc-vue-errors">
							<li v-if="!$v.uom.required">
								{{ translate.uom_is_required }}*
							</li>
						</ul>
					</div>
					<div>
						<label>{{ translate.item_description }}</label>
						<client-only>
							<ScTextarea
								v-model="$v.itemDesc.$model"
								name="itemDesc"
								mode="outline"
								:rows="1"
								placeholder="Enter Item Description"
								:error-class="$v.itemDesc.$error"
								:validator="$v.itemDesc"
							></ScTextarea>
						</client-only>
						<ul class="sc-vue-errors">
							<li v-if="!$v.itemDesc.required">
								{{ translate.item_description_is_required }} *
							</li>
						</ul>
					</div>
				</div>
				<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.break_number }}</label>
						<client-only>
							<ScInput
								v-model="itemBreakNo"
								mode="outline"
								name="itemBreakNo"
								placeholder="Item Break Number"
							></ScInput>
						</client-only>
					</div>
					<div>
						<label>{{ translate.break_approval_number }}</label>
						<client-only>
							<ScInput
								v-model="itemBreakAppNo"
								mode="outline"
								name="itemBreakAppNo"
								placeholder="Item Break Approval Number"
							></ScInput>
						</client-only>
					</div>
				</div>
				<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.process_template }}</label>
						<client-only>
							<Select2
								v-model="$v.itemProcessTemp.$model"
								name="itemProcessTemp"
								:settings="{ 'width': '100%', 'placeholder': 'Select Process Template...', allowClear: true }"
								:error-class="$v.itemProcessTemp.$error"
								:validator="$v.itemProcessTemp"
							>
								<option key value>
									{{ translate.select_process_template }}
								</option>
								<option
									v-for="ps in processTemps"
									:key="ps.EvolveprocessTemp_ID"
									:value="ps.EvolveprocessTemp_ID"
								>
									{{ ps.EvolveprocessTemp_Name }}
								</option>
							</Select2>
						</client-only>
						<ul class="sc-vue-errors">
							<li v-if="!$v.itemProcessTemp.required">
								{{ translate.process_template_is_required }} *
							</li>
						</ul>
					</div>
					<div>
						<label>{{ translate.serial_number }}</label>
						<client-only>
							<Select2
								v-model="$v.itemSerial.$model"
								:error-class="$v.itemSerial.$error"
								:validator="$v.itemSerial"
								name="itemSerial"
								:settings="{ 'width': '100%', 'placeholder': 'Select Serial Number...', allowClear: true }"
							>
								<option key value selected>
									{{ translate.select_serial_number }}
								</option>
								<option
									v-for="sm in serialMaster"
									:key="sm.EvolveSerial_ID"
									:value="sm.EvolveSerial_ID"
								>
									{{ sm.EvolveSerial_SeqID }}
								</option>
							</Select2>
						</client-only>
						<ul class="sc-vue-errors">
							<li v-if="!$v.itemProcessTemp.required">
								{{ translate.process_template_is_required }}*
							</li>
						</ul>
					</div>
				</div>
				<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.item_customize_number }}</label>
						<client-only>
							<ScInput
								v-model="itemCustNo"
								mode="outline"
								name="itemCustNo"
								placeholder="Item Customize Number"
							></ScInput>
						</client-only>
					</div>
					<div>
						<label>{{ translate.customer_part_number }}</label>
						<client-only>
							<ScInput
								v-model="$v.itemCustPart.$model"
								:error-class="$v.itemCustPart.$error"
								:validator="$v.itemCustPart"
								mode="outline"
								name="itemCustPart"
								placeholder="Item Customer Part Number"
							></ScInput>
						</client-only>
						<ul class="sc-vue-errors">
							<li
								v-if="!$v.itemCustPart.required"
							>
								{{ translate.customer_part_number_is_required }} *
							</li>
						</ul>
					</div>
				</div>
				<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.item_load_capacity }}</label>
						<client-only>
							<ScInput
								v-model="itemLoadCap"
								mode="outline"
								name="itemLoadCap"
								type="number"
								placeholder="Item Load Capacity"
							></ScInput>
						</client-only>
					</div>
					<div>
						<label>{{ translate.item_cycle_time }}</label>
						<client-only>
							<ScInput
								v-model="itemCycleTime"
								:error-class="$v.itemCycleTime.$error"
								:validator="$v.itemCycleTime"
								mode="outline"
								name="itemCycleTime"
								placeholder="Item Cycle Time"
								type="number"
							></ScInput>
						</client-only>
						<ul class="sc-vue-errors">
							<li v-if="!$v.itemCycleTime.required">
								{{ translate.item_cycle_time_is_required }} *
							</li>
						</ul>
					</div>
				</div>
				<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
					<div>
						<label>{{ translate.item_group }}</label>
						<client-only>
							<Select2
								v-model="$v.itemGroup.$model"
								:error-class="$v.itemGroup.$error"
								:validator="$v.itemGroup"
								name="itemGroup"
								:settings="{ 'width': '100%', 'placeholder': 'Select Item Group...', allowClear: true }"
							>
								<option key value selected>
									{{ translate.select_item_group }}
								</option>
								<option
									v-for="im in itemGroups"
									:key="im.EvolveItemGroup_ID"
									:value="im.EvolveItemGroup_ID"
								>
									{{ im.EvolveItemGroup_Name }}
								</option>
							</Select2>
						</client-only>
						<ul class="sc-vue-errors">
							<li v-if="!$v.itemGroup.required">
								{{ translate.item_group_is_required }}*
							</li>
						</ul>
					</div>

					<div>
						<label>{{ translate.pdi_template }}</label>
						<client-only>
							<Select2
								v-model="$v.pdiTemplate.$model"
								:error-class="$v.pdiTemplate.$error"
								:validator="$v.pdiTemplate"
								name="pdiTemplate"
								:settings="{ 'width': '100%', 'placeholder': 'Select PDI Template...', allowClear: true }"
							>
								<option key value selected>
									{{ translate.select_pdi_template }}
								</option>
								<option
									v-for="pd in pdiTemplateGroup"
									:key="pd.EvolvePDITemplate_ID"
									:value="pd.EvolvePDITemplate_ID"
								>
									{{ pd.EvolvePDITemplate_Code }}
								</option>
							</Select2>
						</client-only>
						<ul class="sc-vue-errors">
							<li v-if="!$v.pdiTemplate.required">
								{{ translate.pdi_template_is_required }}*
							</li>
						</ul>
					</div>
				</div>
				<!-- <div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
					<div>
						<label>Defualt location</label> 
						<client-only>
							<Select2
								v-model="$v.defultLocation.$model" 
								:error-class="$v.defultLocation.$error" 
								:validator="$v.defultLocation" 
								name="defultLocation" 
								:settings="{ 'width': '100%', 'placeholder': translate.select_location, allowClear: true }"
							>
								<option key="" value="" selected>
									{{ translate.select_location }}
								</option>
								<option v-for="lo in locationList" :key="lo.EvolveLocation_ID" :value="lo.EvolveLocation_ID">
									{{ lo.EvolveLocation_Name }}
								</option>
							</Select2>
						</client-only>
					</div>
					<div>
						<label> {{ translate.item_domain }}</label>
						<client-only>
							<ScInput v-model="itemDomain" 
								:error-class="$v.itemDomain.$error" 
								:validator="$v.itemDomain" 
								mode="outline" 
								name="itemCycleTime"
								placeholder="Iteam Domain"
								type="number"
							>
							</ScInput>
						</client-only>
						<ul class="sc-vue-errors">
							<li v-if="!$v.itemDomain.required">
								{{ translate.item_domain }} *
							</li>
						</ul>
					</div>
				</div>

				
				<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
					<div>
						<label> {{ translate.purchase_menufacture }}</label>
						<client-only>
							<ScInput v-model="purchaseManufacture" 
								:error-class="$v.purchaseManufacture.$error" 
								:validator="$v.purchaseManufacture" 
								mode="outline" 
								name="itemCycleTime"
								placeholder="Purchase / Manufacture"
								type="number"
							>
							</ScInput>
							<ul class="sc-vue-errors">
								<li v-if="!$v.purchaseManufacture.required">
									{{ translate.purchase_menufacture }} *
								</li>
							</ul>
						</client-only>
					</div>
					
					<div>
						<label>{{ translate.is_active }}:</label>
						<client-only>
							<br>
							<PrettyCheck v-model="isActive" class="p-icon" name="approvedStatus">
								<i slot="extra" class="icon mdi mdi-check"></i>
								{{ translate.is_active }}
							</PrettyCheck>
						</client-only>
					</div>
				</div>
				
				<div class="uk-child-width-1-3@m uk-grid" data-uk-grid>
					<div>
						<PrettyCheck
							v-model="qcIsRequired"
							class="p-switch button-margin-top"
							color="primary"
							@change="qcIsRequiredClick()"
						>
							Is QC Required
						</PrettyCheck>
					</div>
					<div v-if="qcIsRequired == true">
						<label>Item Approval/Regular</label> 
						<client-only>
							<Select2
								v-model="qcTempStatus" 
								name="qcTempStatus" 
								:settings="{ 'width': '100%', 'placeholder': 'Select Approval/Regular', allowClear: true }"
								@change="qcTempStatusClick()"
							>
								<option key="" value="">
									Select
								</option>
								<option key="Approval" value="Approval">
									Approval
								</option>
								<option key="Regular" value="Regular">
									Regular
								</option>
							</Select2>
						</client-only>
					</div>
					<div v-if="qcTempStatus == 'Regular'">
						<label>{{ translate.quality_check_template }}</label> 
						<client-only>
							<Select2
								v-model="qCTempID" 
								name="qCTempID" 
								:settings="{ 'width': '100%', 'placeholder': 'Select QC Template...', allowClear: true }"
							>
								<option key="" value="">
									{{ translate.select_qc_template }}
								</option>
								<option v-for="qctl in QCTempList" :key="qctl.EvolveQCTemp_ID" :value="qctl.EvolveQCTemp_ID">
									{{ qctl.EvolveQCTemp_Name }}
								</option>
							</Select2>
						</client-only>
					</div>
					<div v-if="qcTempStatus == 'Approval' && itemId != ''">
						<button class="sc-button datatable-print-button sc-button-primary button-margin-top" data-uk-toggle="target: #addEditItemToSupllier">
							Item To Supplier
						</button>    
					</div>
        </div>-->
				<br>
				<center>
					<button
						class="sc-button"
						type="button"
						@click="editOrCreateItem($event)"
					>
						{{ translate.save }}
					</button>
					<nuxt-link to="/evolve/items/list">
						<button
							class="sc-button sc-button-flat sc-button-flat-danger uk-modal-close"
							type="button"
						>
							{{ translate.cancel }}
						</button>
					</nuxt-link>
				</center>
			</div>
		</div>
	</div>
</template>
<script>
// eslint-disable-next-line
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import customValidators from "~/plugins/vuelidateValidators";
import ScInput from "~/components/Input";
import PrettyCheck from "pretty-checkbox-vue/check";
import ScTextarea from "~/components/Textarea";
const chance = require("chance").Chance();
export default {
	head () {
		return {
			title: "Evolve - " + this.$route.name,
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
	props: {
		params: {
			type: Object,
			default: () => {}
		}
	},
	data () {
		return {
			translate: {
				//new
				select_item_group: "Select Item Group",
				select_pdi_template: "select pdi template",
				select_qc_template: "Select QC Template",
				back: "Back",
				create_menu: "Create Menu",
				cancel: "Cancel",

				item_master: "Item Master",
				item_code: "Item Code",
				item_code_is_required: "Item Code Is Required",
				item_type: "Item Type",
				item_type_is_required: "Item Type Is Required",
				item_description: "Item Description",
				item_description_is_required: "Item Description Is Required ",
				break_number: "Break Number",
				break_approval_number: "Break Approval Number",
				process_template: "Process Template",
				select_process_template: "Select Process Template",
				process_template_is_required: "Process Template Is Required",
				serial_number: "Serial Number",
				select_serial_number: "Select Serial Number",
				process_template_is_required: "Process Template Is Required",
				item_customize_number: "Item Customize Number",
				customer_part_number: "Customer Part Number",
				customer_part_number_is_required: "Customer Part Number Is Required",
				item_load_capacity: "Item Load Capacity",
				item_cycle_time: "Item Cycle Time",
				item_cycle_time_is_required: "Item Cycle Time Is Required",
				item_group: "Item Group",
				item_group_is_required: "Item Group Is Required ",
				pdi_template: "PDI TEMPLATE",
				pdi_template_is_required: "PDI Template Is Required ",
				quality_check_template: "Quality Check Template",
				qc_template_is_required: "QC Template Is Required",
				save: "Save",

				// new

				tem_to_supplier_assignmnet: "Item To Supllier Assignment",
				new_assign: "New Assign",
				item_to_supplier_assign: "Item to Supplier Assign",
				item_code: "Item Code",
				item_required: "Item  Required",
				supplier: "Supplier",
				select_supplier: "Select Supplier",
				approve_not_approved: "Approved & Not Approved",
				is_active: "Is Active",
				select_template: "Select Template",
				template_is_required: "Template is required",
				inventory_status: "Inventory Status",
				select_location: "Select Location",
				location_is_required: "Location is required",
				cancel: "Cancel",
				save: "Save",
				item_code: "Item Code",
				supplier_name: "Supllier Name",
				template: "Template",
				approve_status: "Aprrove Status",
				inventory_status: "Inventory Status",
				location: "Location",
				action: "Action",
				select_location: "Select Location",
				is_approve: "Is Approve",
				uom: "Uom",
				uom_is_required: "Uom Is Required",
				item_domain: "Item Domain",
				purchase_menufacture: "Purchase / Manufacture",
			},
			itemId: "",
			itemCode: "",
			itemDesc: "",
			itemBreakNo: "",
			itemBreakAppNo: "",
			itemProcessTemp: "",
			itemType: "",
			itemCustNo: "",
			itemCustPart: "",
			itemLoadCap: "",
			itemCycleTime: "",
			itemSerial: "",
			pdiTemplate: "",
			itemGroup: "",
			processTemps: [],
			serialMaster: [],
			itemGroups: [],
			pdiTemplateGroup: [],
			qCTempID: "",
			QCTempList: [],
			qcIsRequired: false,
			qcTempStatus: "",
			itemToSupplier: "",
			isActive: false,

			//new

			InventoryStatus: false,
			config_key: "",
			supplierId: "",
			templateId: "",
			reason_description: "",
			reason_color: "#039be5",
			approvedStatus: false,
			itemToSuppId: "",
			selectMachineList: [],
			supplierList: [],
			selectedSupplierList: [],
			itemList: [],
			locationList: [],
			locationId: "",
			templateList: [],
			machinename: [],
			selectMachineArray: [],
			uomList: [],
			uom: "",
			itemDomain: "",
			purchaseManufacture: "",
		};
	},
	computed: {},
	mounted () {
		this.$root.$on("onChangeLanguage", () => {
			console.log("Language Changed.....");
			this.translateLanguage();
		});
	},
	created: async function () {
		await this.removeModal();
		await this.getProcessTemplate();
		await this.getSerialMaster();
		await this.getItemGroup();
		await this.getPdiTemplateGroup();
		await this.getQCTempList();
		await this.getSuppList();
		await this.getLocationList();
		await this.getUomList();
		await this.getSingleItem();
		// this.getLocationList();
	},
	validations: {
		itemCode: {
			required,
		},
		itemDesc: {
			required,
		},
		itemProcessTemp: {
			required,
		},
		itemType: {
			required,
		},
		itemCustPart: {
			required,
		},
		itemCycleTime: {
			required,
		},
		itemSerial: {
			required,
		},
		pdiTemplate: {
			required,
		},
		itemGroup: {
			required,
		},
		uom: {
			required,
		},
		// defultLocation : {
		// 	required,
		// },
		// itemDomain : {
		// 	required,
		// },
		// purchaseManufacture : {
		// 	required,
		// }
	},

	beforeMount () {
		this.translateLanguage();
	},
	methods: {
		/** Default Method For All Pages : Start Here */

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
			$("#itemForm").remove(); // Remove Old Model From DOM
		},
		/** Default Method For All Pages : End Here */

		getSingleItem: async function () {
			this.itemId = this.params.itemId;
			if (this.itemId != null) {
				let response = await this.$axios
					.$post("/api/v1/evolve/item/getSingleItem", {
						EvolveItem_ID: this.itemId,
					})
					.catch((e) => {
						this.notification(
							"danger",
							3000,
							"Problem with connecting to server!"
						);
					});
				if (response.statusCode == 200) {
					this.itemGroup = response.result.itemData[0].EvolveItemGroup_ID + "";
					this.uom = response.result.itemData[0].EvolveUom_ID + "";
					this.itemCode = response.result.itemData[0].EvolveItem_Code + "";
					this.itemType =
            response.result.itemData[0].EvolveItem_Type != null
            	? response.result.itemData[0].EvolveItem_Type + ""
            	: "";
					this.itemDesc = response.result.itemData[0].EvolveItem_Desc + "";
					this.itemBreakNo =
            response.result.itemData[0].EvolveItem_BrakeNum != null
            	? response.result.itemData[0].EvolveItem_BrakeNum + ""
            	: "";
					this.itemBreakAppNo =
            response.result.itemData[0].EvolveItem_BrakeApprovalNum != null
            	? response.result.itemData[0].EvolveItem_BrakeApprovalNum
            	: "";
					this.itemProcessTemp =
            response.result.itemData[0].EvolveProcessTemp_Id + "";
					this.itemSerial = response.result.itemData[0].EvolveSerial_ID + "";
					this.itemCustNo =
            response.result.itemData[0].EvolveItem_CustomizeNum != null
            	? response.result.itemData[0].EvolveItem_CustomizeNum + ""
            	: "";
					this.itemCustPart =
            response.result.itemData[0].EvolveItem_CustPart != null
            	? response.result.itemData[0].EvolveItem_CustPart + ""
            	: "";
					this.itemLoadCap =
            response.result.itemData[0].EvolveItem_load_capacity != null
            	? response.result.itemData[0].EvolveItem_load_capacity + ""
            	: "";
					this.itemCycleTime =
            response.result.itemData[0].EvolveItem_load_capacity != null
            	? response.result.itemData[0].EvolveItem_CycleTime + ""
            	: "0";
					this.pdiTemplate =
            response.result.itemData[0].EvolvePDITemplate_ID + "";
					this.qCTempID = response.result.itemData[0].EvolveQCTemp_ID + "";
					this.qcIsRequired =
            response.result.itemData[0].EvolveQc_IsRequired == null
            	? false
            	: response.result.itemData[0].EvolveQc_IsRequired;
					this.qcTempStatus =
            response.result.itemData[0].EvolveQc_TempStatus == null
            	? ""
            	: response.result.itemData[0].EvolveQc_TempStatus;
					this.defultLocation =
            response.result.itemData[0].EvolveLocation_ID + "";
					if (this.qcTempStatus == "Approval") {
						this.supplierId =
              response.result.ItemSupp[0].EvolveSupplier_ID + "";
						this.qCTempID = response.result.ItemSupp[0].EvolveQCTemp_ID + "";
						this.approvedStatus =
              response.result.ItemSupp[0].EvolveItemSupLink_Approved;
						this.locationId =
              response.result.ItemSupp[0]
              	.EvolveItemSupLink_recInvetory_Location + "";
						this.InventoryStatus =
              response.result.ItemSupp[0].EvolveItemSupLink_recInvetory_Status;
						for (let i = 0; i < response.result.ItemSupp.length; i++) {
							this.selectedSupplierList.push({
								EvolveSupplier_ID:
                  response.result.ItemSupp[i].EvolveSupplier_ID,
								EvolveSupplier_Name:
                  response.result.ItemSupp[i].EvolveSupplier_Name,
							});
						}
					}
				} else {
					this.notification("danger", 3000, response.message);
				}
			} else {
				this.itemId = "";
				this.itemCode = "";
				this.itemType = "";
				this.itemDesc = "";
				this.itemBreakNo = "";
				this.itemBreakAppNo = "";
				this.itemProcessTemp = "";
				this.itemSerial = "";
				this.itemCustNo = "";
				this.itemCustPart = "";
				this.itemLoadCap = "";
				this.itemCycleTime = "";
				this.pdiTemplate = "";
				this.itemGroup = "";
				this.qCTempID = "";
				this.uom = "";
				(this.defultLocation = 0), (this.supplierId = "");
				this.selectedSupplierList = [];
				this.approvedStatus = "";
				this.locationId = "";
				this.InventoryStatus = "";
			}
		},

		editOrCreateItem: async function (e) {
			e.preventDefault();
			this.$v.$touch();
			let validationError = false;

			if (this.qcIsRequired == true) {
				if (
					this.$v.$invalid ||
          this.EvolveQc_TempStatus == "" ||
          this.qCTempID == "" ||
          this.qCTempID == undefined
				) {
					this.notification("danger", 3000, "Please Fill All Required Fileds");
					validationError = false;
				} else {
					validationError = true;
				}
			} else {
				if (this.$v.$invalid) {
					this.notification("danger", 3000, "Please Fill All Required Fileds");
					validationError = false;
				} else {
					validationError = true;
				}
			}

			if (validationError == true) {
				if (this.itemId == "") {
					let itemDetails = {
						EvolveItem_Code: this.itemCode,
						EvolveUom_ID: this.uom,
						EvolveItem_Desc: this.itemDesc,
						EvolveProcessTemp_Id: this.itemProcessTemp,
						EvolveItem_BrakeNum: this.itemBreakNo,
						EvolveItem_BrakeApprovalNum: this.itemBreakAppNo,
						EvolveItem_Type: this.itemType,
						EvolveItem_CustomizeNum: this.itemCustNo,
						EvolveItem_CustPart: this.itemCustPart,
						EvolveItem_load_capacity: parseInt(this.itemLoadCap),
						EvolveItem_CycleTime: this.itemCycleTime,
						EvolveSerial_ID: this.itemSerial,
						EvolveItemGroup_ID: this.itemGroup,
						EvolvePDITemplate_ID: this.pdiTemplate,
						EvolveQCTemp_ID: this.qCTempID,
						EvolveQc_IsRequired: this.qcIsRequired,
						EvolveQc_TempStatus: this.qcTempStatus,
						selectedSuppliers: this.selectedSupplierList,
						EvolveItemSupLink_recInvetory_Location: this.locationId,
						EvolveItemSupLink_Approved: this.approvedStatus,
						EvolveItemSupLink_recInvetory_Status: this.InventoryStatus,
						EvolveLocation_ID: null,
					};
					const itemRes = await this.$axios
						.$post("/api/v1/evolve/item/createItem", itemDetails)
						.catch((e) => {
							this.notification(
								"danger",
								3000,
								"Problem with connecting to server!"
							);
						});
					if (itemRes.statusCode == 200) {
						this.notification("success", 3000, itemRes.message);
						this.itemId = "";
						this.itemCode = "";
						this.uom = "";
						this.itemType = "";
						this.itemDesc = "";
						this.itemBreakNo = "";
						this.itemBreakAppNo = "";
						this.itemProcessTemp = "";
						this.itemSerial = "";
						this.itemCustNo = "";
						this.itemCustPart = "";
						this.itemLoadCap = "";
						this.itemCycleTime = "";
						this.pdiTemplate = "";
						this.itemGroup = "";
						this.qCTempID = "";
						this.qcIsRequired = "";
						this.qcTempStatus = "";
						this.$router.push("/evolve/items/list");
					} else {
						this.notification("danger", 3000, itemRes.message);
					}
				} else {
					let itemDetails = {
						EvolveItem_ID: this.itemId,
						EvolveItem_Code: this.itemCode,
						EvolveUom_ID: this.uom,
						EvolveItem_Desc: this.itemDesc,
						EvolveProcessTemp_Id: this.itemProcessTemp,
						EvolveItem_BrakeNum: this.itemBreakNo,
						EvolveItem_BrakeApprovalNum: this.itemBreakAppNo,
						EvolveItem_Type: this.itemType,
						EvolveItem_CustomizeNum: this.itemCustNo,
						EvolveItem_CustPart: this.itemCustPart,
						EvolveItem_load_capacity: this.itemLoadCap,
						EvolveItem_CycleTime: this.itemCycleTime,
						EvolveSerial_ID: this.itemSerial,
						EvolvePDITemplate_ID: this.pdiTemplate,
						EvolveQCTemp_ID: this.qCTempID,
						EvolveQc_IsRequired: this.qcIsRequired,
						EvolveQc_TempStatus: this.qcTempStatus,
						EvolveItemGroup_ID: parseInt(this.itemGroup),
						selectedSuppliers: this.selectedSupplierList,
						EvolveItemSupLink_recInvetory_Location: this.locationId,
						EvolveItemSupLink_Approved: this.approvedStatus,
						EvolveItemSupLink_recInvetory_Status: this.InventoryStatus,
						EvolveLocation_ID: null,
					};
					const itemRes = await this.$axios
						.$post("/api/v1/evolve/item/updateItem", itemDetails)
						.catch((e) => {
							this.notification(
								"danger",
								3000,
								"Problem with connecting to server!"
							);
						});
					if (itemRes.statusCode == 200) {
						this.notification("success", 3000, itemRes.message);
						this.itemId = "";
						this.itemCode = "";
						this.uom = "";
						this.itemType = "";
						this.itemDesc = "";
						this.itemBreakNo = "";
						this.itemBreakAppNo = "";
						this.itemProcessTemp = "";
						this.itemSerial = "";
						this.itemCustNo = "";
						this.itemCustPart = "";
						this.itemLoadCap = "";
						this.itemCycleTime = "";
						this.pdiTemplate = "";
						this.itemGroup = "";
						this.qCTempID = "";
						this.qcIsRequired = "";
						this.qcTempStatus = "";
						this.$router.push("/evolve/items/list");
					} else {
						this.notification("danger", 3000, itemRes.message);
					}
				}
			}
		},

		getProcessTemplate: async function () {
			let getProcessTemp = await this.$axios
				.$get("/api/v1/evolve/item/getProcessTemp")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (getProcessTemp.statusCode == 200) {
				this.processTemps = getProcessTemp.result;
			} else {
				this.notification("danger", 3000, getProcessTemp.message);
			}
		},

		getSerialMaster: async function () {
			let getSerialMaster = await this.$axios
				.$get("/api/v1/evolve/item/getSerialMaster")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (getSerialMaster.statusCode == 200) {
				this.serialMaster = getSerialMaster.result;
			} else {
				this.notification("danger", 3000, getSerialMaster.message);
			}
		},

		getItemGroup: async function () {
			let getItemGroup = await this.$axios
				.$get("/api/v1/evolve/item/getItemGroup")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (getItemGroup.statusCode == 200) {
				this.itemGroups = getItemGroup.result;
			} else {
				this.notification("danger", 3000, getItemGroup.message);
			}
		},

		getPdiTemplateGroup: async function () {
			let getPdiTemplates = await this.$axios
				.$get("/api/v1/evolve/item/getPdiTemplates")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (getPdiTemplates.statusCode == 200) {
				this.pdiTemplateGroup = getPdiTemplates.result;
			} else {
				this.notification("danger", 3000, getPdiTemplates.message);
			}
		},

		getQCTempList: async function () {
			const response = await this.$axios.$get(
				"/api/v1/evolve/item/getAllQCTemplateList"
			);
			if (response.statusCode == 200) {
				this.QCTempList = response.result;
			} else {
				this.notification("danger", 3000, response.message);
			}
		},

		getSuppList: async function () {
			const supList = await this.$axios
				.$get("/api/v1/evolve/ItemToSupplier/getSupplierList")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (supList) {
				if (supList.statusCode == 200) {
					this.supplierList = supList.result;
				} else {
					this.notification("danger", 3000, supList.message);
				}
			}
		},

		getLocationList: async function () {
			const locations = await this.$axios
				.$get("/api/v1/evolve/ItemToSupplier/getLocationList")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (locations) {
				if (locations.statusCode == 200) {
					this.locationList = locations.result;
				} else {
					this.notification("danger", 3000, locations.message);
				}
			}
		},

		getUomList: async function () {
			const response = await this.$axios
				.$get("/api/v1/evolve/item/getUomList")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (response) {
				if (response.statusCode == 200) {
					this.uomList = response.result;
				} else {
					this.notification("danger", 3000, response.message);
				}
			}
		},

		qcIsRequiredClick: async function () {
			if (this.qcIsRequired != true) {
				this.qcTempStatus = "";
				this.itemToSupplier = "";
			}
		},

		qcTempStatusClick: async function () {
			if (this.qcTempStatus == "Regular") {
				this.itemToSupplier = "";
			} else if (this.qcTempStatus == "Approval") {
				UIkit.modal("#addEditItemToSupllier").show();
			} else {
				this.qcTempStatus = "";
				this.itemToSupplier = "";
			}
		},

		async onSelectSupplier (suppId) {
			let supplier_id = suppId;
			let supplierTrue = true;
			let supplierName = "";
			if (supplier_id != "" && supplier_id != null) {
				for (let i = 0; i < this.selectedSupplierList.length; i++) {
					if (this.selectedSupplierList[i].EvolveSupplier_ID == supplier_id) {
						supplierTrue = false;
					}
				}
				if (supplierTrue == true) {
					for (let b = 0; b < this.supplierList.length; b++) {
						if (this.supplierList[b].EvolveSupplier_ID == supplier_id) {
							supplierName = this.supplierList[b].EvolveSupplier_Name;
							break;
						}
					}
					this.selectedSupplierList.push({
						EvolveSupplier_ID: supplier_id,
						EvolveSupplier_Name: supplierName,
					});
				} else {
				}
			}
		},

		async addItemAssignment (e) {
			e.preventDefault();
			this.$v.$touch();
			if (
				this.qCTempID == "" ||
        this.selectedSupplierList == "" ||
        this.locationId == "" ||
        this.approvedStatus == "" ||
        this.InventoryStatus == ""
			) {
				this.notification("danger", 3000, "Please Fill All Required Fileds");
			} else {
				if (this.selectedSupplierList.length == 0) {
					this.notification(
						"danger",
						3000,
						"Please select at least one supplier !"
					);
				} else {
					UIkit.modal("#addEditItemToSupllier").hide();
					this.notification(
						"success",
						3000,
						"Item To Supplier Assignment Success !"
					);
				}
			}
		},

		async supplierDelete (suppId) {
			for (let i = 0; i < this.selectedSupplierList.length; i++) {
				if (this.selectedSupplierList[i].EvolveSupplier_ID == suppId) {
					this.selectedSupplierList.splice(i, 1);
					break;
				}
			}
		},
	},
};
</script>
<style lang="scss">
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>
