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

		<div id="sc-page-content ">
			<div id="nav-mdi" class="uk-card">
				<div class="uk-card-body min-height-back">
					<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
						<div>
							<div class="uk-overflow-auto">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable" class="evolve-input-lable" :data-uk-tooltip="translate.menu_name_tp">{{ translate.menu_name }} </label>
											</div>
											<div class="uk-width-1-2@m">
												<ScInput
													v-model="$v.menuName.$model"
													mode="outline"
													name="menuName"
													:error-class="$v.menuName.$error"
													:validator="$v.menuName"
													placeholder="Menu Name"
												></ScInput>
											</div>
										</div>
									</div>

									<div class="uk-width-1-2@m"></div>

									<div class="uk-width-1-2@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable" class="evolve-input-lable" :data-uk-tooltip="translate.menu_description_tp">{{ translate.menu_description }} </label>
											</div>
											<div class="uk-width-1-2@m">
												<ScInput
													v-model="$v.menuDesc.$model"
													mode="outline"
													name="menuDesc"
													:error-class="$v.menuDesc.$error"
													:validator="$v.menuDesc"
													placeholder="Menu Description"
												></ScInput>
											</div>
										</div>
									</div>

									<div class="uk-width-1-2@m"></div>

									<div class="uk-width-1-2@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable" class="evolve-input-lable" :data-uk-tooltip="translate.menu_url_tp">{{ translate.menu_url }} </label>
											</div>
											<div class="uk-width-1-2@m">
												<ScInput
													v-model="$v.menuUrl.$model"
													mode="outline"
													name="menuUrl"
													:error-class="$v.menuUrl.$error"
													:validator="$v.menuUrl"
													:placeholder="translate.menu_url"
												></ScInput>
											</div>
										</div>
									</div>

									<div class="uk-width-1-2@m"></div>

									<div class="uk-width-1-2@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable" class="evolve-input-lable" :data-uk-tooltip="translate.menu_type_tp">{{ translate.menu_type }} </label>
											</div>
											<div class="uk-width-1-2@m">
												<Select2
													v-model="$v.menuType.$model"
													name="menuType"
													:error-class="$v.menuType.$error"
													:validator="$v.menuType"
													:settings="{ 'width': '100%', 'placeholder': 'Select Menu Type...', allowClear: true }"
												>
													<option key value>
														Select Menu Type
													</option>
													<option
														v-for="menu in menuTypeList"
														:key="menu.EvolveMenuType_Name"
														:value="menu.EvolveMenuType_ID"
													>
														{{ menu.EvolveMenuType_Type }}
													</option>
												</Select2>
											</div>
										</div>
									</div>

									<div class="uk-width-1-2@m"></div>

									<div class="uk-width-1-2@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable" class="evolve-input-lable" :data-uk-tooltip="translate.select_application_tp">{{ translate.select_application }} </label>
											</div>
											<div class="uk-width-1-2@m">
												<Select2
													v-model="$v.menuApp.$model"
													name="menuApp"
													:error-class="$v.menuApp.$error"
													:validator="$v.menuApp"
													:settings="{ 'width': '100%', 'placeholder': 'Select Application...', allowClear: true }"
													@change="onChange_application($event)"
												>
													<option key value>
														{{ translate.no_application_selected }}
													</option>
													<option
														v-for="app in appLists"
														:key="app.EvolveApp_ID"
														:value="app.EvolveApp_ID"
													>
														{{ app.EvolveApp_Name }}
													</option>
												</Select2>
											</div>
										</div>
									</div>

									<div class="uk-width-1-2@m"></div>

									<div class="uk-width-1-2@m">
										<div class="uk-grid" data-uk-grid>
											<div class="uk-width-1-2@m">
												<label for="table lable" class="evolve-input-lable" :data-uk-tooltip="translate.select_parent_menu_tp">{{ translate.select_parent_menu }} </label>
											</div>
											<div class="uk-width-1-2@m">
												<Select2
													v-model="$v.menuParent.$model"
													name="menuParent"
													:error-class="$v.menuParent.$error"
													:validator="$v.menuParent"
													:settings="{ 'width': '100%', 'placeholder': 'Select Parent Menu...', allowClear: true }"
												>
													<option key value>
														Select Parent Menu
													</option>
													<option key="0" value="0">
														{{ translate.root }}
													</option>
													<option
														v-for="menu in all_menu"
														:key="menu.EvolveMenu_Index"
														:value="menu.EvolveMenu_Id"
													>
														{{ menu.EvolveMenu_Index }} {{ menu.EvolveMenu_Name }}
													</option>
												</Select2>
											</div>
										</div>
									</div>

								
									<div class="uk-width-1-2@m"></div>

									<div class="uk-width-1-2@m">
										<div class="uk-width-1-1@m">
											<div class="uk-grid" data-uk-grid>
												<div class="uk-width-1-2@m">
													<label for="table lable"
														class="evolve-input-lable" 
														style="margin-top:3px"
														:data-uk-tooltip="translate.menu_isactive_tp"
													>{{ translate.menu_isactive }} </label>
												</div>
												<div class="uk-width-1-2@m">
													<PrettyCheck v-model="menuIsActive " class="p-icon" name="menuIsActive">
														<i slot="extra" class="icon mdi mdi-check"></i>
													</PrettyCheck>
												</div>
											</div>
										</div>
							
										<div class="uk-width-1-1@m">
											<div class="uk-grid" data-uk-grid>
												<div class="uk-width-1-2@m">
													<label for="table lable"
														class="evolve-input-lable" 
														style="margin-top:3px"
														:data-uk-tooltip="translate.audit_enable"
													>{{ translate.audit_enable }} </label>
												</div>
												<div class="uk-width-1-2@m">
													<PrettyCheck v-model="isAuditEnable " class="p-icon" name="isAuditEnable">
														<i slot="extra" class="icon mdi mdi-check"></i>
													</PrettyCheck>
												</div>
											</div>
										</div>
										

										<div class="uk-width-1-1@m">
											<div class="uk-grid" data-uk-grid>
												<div class="uk-width-1-2@m">
													<label for="table lable"
														class="evolve-input-lable" 
														style="margin-top:3px"
														:data-uk-tooltip="translate.allow_update_to_external_data_tp"
													>{{ translate.allow_update_to_external_data }} </label>
												</div>
												<div class="uk-width-1-2@m">
													<PrettyCheck v-model="isAllowUpdateToExternalData " class="p-icon" name="isAuditEnable">
														<i slot="extra" class="icon mdi mdi-check"></i>
													</PrettyCheck>
												</div>
											</div>
										</div>								
									</div>
									<div class="uk-width-1-2@m"></div>



									<div class="uk-width-1-2@m">
										<center>
											<button
												class="sc-button sc-button-flat-danger uk-modal-close"
												type="button"
											>
												{{ translate.cancel }}
											</button>
											<button
												class="sc-button"
												type="button"
												@click="checkCreateOrEditMenu($event)"
											>
												{{ translate.save }}
											</button>
										</center>
									</div>


									<div class="uk-width-1-2@m"></div>
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
.uk-position-top-right {
  top: 24px;
}
.icons_selections {
  height: 200px !important;
  overflow: auto;
}
</style>
<script>
const rows = "";
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import customValidators from "~/plugins/vuelidateValidators";
import ScInput from "~/components/Input";
import PrettyCheck from "pretty-checkbox-vue/check";
if (process.client) {
	var Paginate = require("vuejs-paginate");
}
export default {
	head () {
		return {
			title: "Evolve - " + this.$route.name,
		};
	},
	layout: "eDefaultV2",
	components: {
		ScInput,
		Select2: process.client ? () => import("~/components/Select2") : null,
		PrettyCheck,
		// Paginate,
		// EvolvePDF: process.client
		// 	? () => import("~/components/jspdf/evolvePDF")
		// 	: null,
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
			// Language
			translate: {
				save: "Save",
				cancel: "Cancel",
				root: "Root",
				no_application_selected: "No Application Selected",
				menu_master: "Menu Master",
				// Titile
				menus_list: "Menus List",
				create_menu: "Create Menu",
				is_active: "Is Active",
				icon: "Icon",
				menu_isactive: "Menu IsActive",
				menu_icon: "Selected Menu Icon",
				menu_url_is_required: "Menu Url is required",
				menu_url: "Menu Url",
				menu_description_is_required: "Menu Description is required",
				menu_description: "Menu Description",
				menu_name_is_required: "Menu Name is required",
				menu_name: "Menu Name",
				parent_selection_is_require: "Parent Selection Is Require",
				select_parent_menu: "Select Parent Menu",
				application_selection_is_require: "Application Selection Is Require",
				select_application: "Select Application",
				menu_details: "Menu Details",
				back: "Back",
				menu_options: "Menu Options",
				name: "Name",
				description: "Description",
				status: "Status",
				url: "URL",
				parent: "Parent",
				options: "Options",
				application: "Application",
				reportpage: "Report Page",
				iframe_url: "iFrame Url",
				select_application_tp : "Please Select Application Of Menu.",
				audit_enable : "Audit Enable",
				allow_update_to_external_data : "Allow Update To External Data",
				menu_type  : "Menu Type",
				menu_name_tp : "Enter Menu Name Here",
				menu_description_tp : "Enter Menu Description Here",
				menu_url_tp : "Enter Menu URL Here",
				menu_type_tp : "Enter Menu Type Here",
				select_application_tp : "Select Application Here",
				select_parent_menu_tp : "Select Parent Menu Here",
			},
			mdIconsSearch: "",
			mdIcons: [],

			appLists: [],
			menuApp: "",
			all_menu: [],
			menuParent: "",
			menuName: "",
			menuDesc: "",
			menuUrl: "",
			menuIcon: "view-list",
			slectedMenuIcon: "mdi mdi-view-list",
			menuIsActive: true,
			isReportPage: false,
			iFrameUrl: "",
			menuId: this.$route.query.EMenuID,
			menuType : "",
			menuList: [],
			iconList: [],
			isAuditEnable : true,
			isAllowUpdateToExternalData : false,
			menuTypeList : [],
			pageURL : '/evolve/menus/options',

			userId: this.$store.state.auth.user.EvolveUser_ID,
			token: this.$auth.getToken("local"),
			deleteApi: "/api/v1/evolve/deleteMenu",
			baseURL: this.$axios.defaults.baseURL,
			/** Start : EvolveDataTable */
			search: "", // For making dynamic search
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1, 2, 3, 5, 6],
			pdfExportColums: [0, 1, 2, 3, 5, 6],
			/** End : EvolveDataTable */
		};
	},
	computed: {},
	watch: {
		mdIconsSearch (val) {
			this.mdIcons.forEach((icon) => {
				if (val !== "" && val.length > 2) {
					icon.visible = icon.name.toLowerCase().includes(val.toLowerCase());
				} else {
					icon.visible = true;
				}
			});
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
	created: async function () {
		this.removeModal();
		await this.getAppList();
		await this.getMenuTypeList();
		console.log("this.menuId>>", this.menuId);
		if(this.menuId != "" && this.menuId != undefined) {
			this.selectSingleMenuData(this.menuId)
		}

	},
	validations: {
		menuApp: {
			required,
		},
		menuParent: {
			required,
		},
		menuName: {
			required,
		},
		menuDesc: {
			required,
		},
		menuUrl: {
			required,
		},
		menuType: {
			required,
		},
		// menuIcon : {
		// 	required
		// }
	},
	beforeMount () {
		this.translateLanguage();
	},
	methods: {
		// Evolve defult functions

		removeModal: async function (e) {
			$(".uk-modal").remove(); // Remove Old Model From DOM
		},

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

		async notification (type = "danger", timeout = 10000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},
		// Evolve defult functions end
		/* Datatable Methods -- Start */
		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			// this.getAllMenuList();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			// this.getAllMenuList();
		},

		async downloadPdf () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolveMenuMaster").outerHTML;
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
					title: "Evolve Menu Master",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveMenuMaster",
				},
			};
		},

		async downloadCsv () {
			let filename = "evolveMenuMaster";
			let csv = [];
			let html = document.getElementById("evolveMenuMaster").outerHTML;
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


		onInputSearch () {
			this.currentPage = 1;
			// this.getAllMenuList();
			this.paginateClick(1);
		},

		async onChange_application (event) {
			let menu_req = { EvolveMenu_AppId: event };
			const all_menu = await this.$axios
				.$post("/api/v1/evolve/menu/getMenusByAppId", menu_req)
				.catch((e) => {
					this.notification(
						"danger",
						10000,
						"Problem with connecting to server!"
					);
				});

			if (all_menu) {
				if (all_menu.statusCode == 200) {
					this.all_menu = all_menu.result;
				} else {
					this.notification("danger", 10000, all_menu.message);
				}
			} else {
			}
		},

		clearData: async function () {
			this.$v.$reset();
			this.mdIconsSearch = "";
			this.menuId = "";
			this.menuApp = "";
			this.menuParent = "";
			this.menuName = "";
			this.menuDesc = "";
			this.menuUrl = "";
			this.menuIsActive = true;
			this.menuIcon = "";
			this.iFrameUrl = "";
			this.isReportPage = false;
			this.all_menu = [];
		},

		getAppList: async function () {
			const responce = await this.$axios
				.$get("/api/v1/evolve/menu/getAppList")
				.catch((e) => {
					this.notification(
						"danger",
						10000,
						"Problem with connecting to server!"
					);
				});
			if (responce) {
				if (responce.status == "success") {
					this.appLists = responce.result;
				} else {
				}
			} else {
			}
		},

		getMenuTypeList: async function () {
			const responce = await this.$axios
				.$get("/api/v1/evolve/menu/getMenuTypeList")
				.catch((e) => {
					this.notification(
						"danger",
						10000,
						"Problem with connecting to server!"
					);
				});
			if (responce) {
				if (responce.statusCode == 200) {
					this.menuTypeList = responce.result;
				} else {
				}
			} else {
			}
		},

		selectSingleMenuData: async function (id) {
			this.mdIconsSearch = "";
			this.menuId = id;
			// if (this.menuId == null) {
			// 	this.$router.push("/evolve/menus/list");
			// }
			const menuResponce = await this.$axios
				.$post("/api/v1/evolve/menu/selectSingleMenu", {
					EvolveMenu_ID: this.menuId,
				})
				.catch((e) => {
					this.notification(
						"danger",
						10000,
						"Problem with connecting to server!"
					);
				});
			// UIkit.modal("#CreditOrUpdateMenu").show();
			this.menuApp_Old = menuResponce.result[0].EvolveMenu_AppId;
			let menuPar = menuResponce.result[0].EvolveMenu_Parent;
			if (menuPar != null && menuPar != "") {
				this.menuParent_Old = menuPar;
			} else {
				this.menuParent_Old = "0";
			}
			await this.onChange_application(this.menuApp_Old);
			this.menuParent = menuResponce.result[0].EvolveMenu_Parent + "";
			console.log("this.menuApp", menuResponce.result[0].EvolveMenu_AppId);
			this.menuApp = menuResponce.result[0].EvolveMenu_AppId + "";
			this.menuName = menuResponce.result[0].EvolveMenu_Name;
			this.menuDesc = menuResponce.result[0].EvolveMenu_Desc;
			this.menuUrl = menuResponce.result[0].EvolveMenu_Url;
			this.menuIsActive = menuResponce.result[0].EvolveMenu_IsActive;
			// this.slectedMenuIcon = menuResponce.result[0].EvolveMenu_Icon;
			this.menuType = menuResponce.result[0].EvolveMenuType_ID;
			this.isAuditEnable = menuResponce.result[0].EvolveMenu_AuditEnable;
			this.isAllowUpdateToExternalData = menuResponce.result[0].EvolveMenu_IsUpdateExtData;
			this.isReportPage =
        menuResponce.result[0].EvolveMenu_IsReportPage == "" ||
        menuResponce.result[0].EvolveMenu_IsReportPage == null ||
        menuResponce.result[0].EvolveMenu_IsReportPage == NULL
        	? false
        	: menuResponce.result[0].EvolveMenu_IsReportPage;
			this.iFrameUrl = menuResponce.result[0].EvolveUser_IframeUrl;
			this.getAppList();
		},

		checkCreateOrEditMenu: async function (e) {
			let error = false;
			e.preventDefault();
			this.$v.$touch();
			if (this.isReportPage == true) {
				if (this.iFrameUrl == "" || this.iFrameUrl == undefined) {
					this.notification("danger", 10000, "Fill All Required Fileds");
					error = true;
				}
			}
			if (this.$v.$invalid) {
				this.notification("danger", 10000, "Fill All Required Fileds");
				error = true;
			} else {
				if (error == false) {
					let menuRes ;
					if (this.menuId == "") {
						let menuDetails = {
							EvolveMenu_AppId: this.menuApp,
							EvolveMenu_Parent: this.menuParent,
							EvolveMenu_Name: this.menuName,
							EvolveMenu_Desc: this.menuDesc,
							EvolveMenu_Url: this.menuUrl,
							EvolveMenu_IsActive: this.menuIsActive,
							// EvolveMenu_Icon: '',
							EvolveMenu_IsReportPage: this.isReportPage,
							EvolveUser_IframeUrl: this.iFrameUrl,
							EvolveMenu_IsUpdateExtData : this.isAllowUpdateToExternalData,
							EvolveMenu_AuditEnable : this.isAuditEnable,
							EvolveMenuType_ID : this.menuType
						};
						menuRes = await this.$axios
							.$post("/api/v1/evolve/menu/createMenu", menuDetails)
							.catch((e) => {
								this.notification(
									"danger",
									10000,
									"Problem with connecting to server!"
								);
							});
					
					} else {
						let menuParent, menuApp;
						if (this.menuParent == "" || this.menuParent == " ") {
							menuParent = this.menuParent_Old;
						} else {
							menuParent = this.menuParent;
						}
						if (this.menuApp == "" || this.menuApp == " ") {
							menuApp = this.menuApp_Old;
						} else {
							menuApp = this.menuApp;
						}
						let menuDetails = {
							EvolveMenu_Id: this.menuId,
							EvolveMenu_AppId: parseInt(menuApp),
							EvolveMenu_Parent: menuParent,
							EvolveMenu_Name: this.menuName,
							EvolveMenu_Desc: this.menuDesc,
							EvolveMenu_Url: this.menuUrl,
							EvolveMenu_IsActive: this.menuIsActive,
							// EvolveMenu_Icon: '',
							EvolveMenu_IsReportPage: this.isReportPage,
							EvolveUser_IframeUrl: this.iFrameUrl,
							EvolveMenu_IsUpdateExtData : this.isAllowUpdateToExternalData,
							EvolveMenu_AuditEnable : this.isAuditEnable,
							EvolveMenuType_ID : this.menuType
						};
						menuRes = await this.$axios
							.$post("/api/v1/evolve/menu/updateMenu", menuDetails)
							.catch((e) => {
								this.notification(
									"danger",
									10000,
									"Problem with connecting to server!"
								);
							});
					
					}

					if (menuRes) {
						if (menuRes.statusCode == 200) {
							let config = {};
							config.timeout = 5000;
							config.status = "success";
							let text = menuRes.message;
							UIkit.notification(text, config);
			
							this.$v.$reset()
							this.menuId = "";
							this.menuApp = "";
							this.menuParent = "";
							this.menuName = "";
							this.menuDesc = "";
							this.menuUrl = "";
							this.menuIsActive = true;
							this.menuIcon = "";
							this.isReportPage = false;
							this.iFrameUrl = "";
							this.$destroy() ;
							this.$store.dispatch('removeOneTab', '/evolve/menus/options')


						} else {
							this.notification("danger", 10000, menuRes.message);
						}
					}else{
						this.notification("danger", 10000, "Error While Create Menu");
					}


				}
			}
		},

		delete_menu: async function () {
			let delete_id = localStorage.getItem("delete_id");
			localStorage.removeItem("delete_id");
			let menu_data = await this.$axios.$post(
				"/api/v1/evolve/menu/deleteMenu",
				{ id: delete_id }
			);
			if (menu_data) {
				if (menu_data.statusCode == 200) {
					this.notification("success", 10000, menu_data.message);
					// this.getAllMenuList();
				} else {
					this.notification("danger", 10000, menu_data.message);
				}
			}
		},

		getIconList: async function () {
			let responce = await this.$axios
				.$get("/api/v1/evolve/menu/getIconList")
				.catch((e) => {
					this.notification(
						"danger",
						10000,
						"Problem with connecting to server!"
					);
				});
			if (responce) {
				if (responce.statusCode == 200) {
					this.iconList = responce.result;
				} else {
					this.notification("danger", 10000, responce.message);
				}
			}
		},

		async asyncData () {
			let data = require("~/assets/js/utils/mdIcons.js").default;
			//console.log("data :", data);
			this.mdIcons = data;

			return { mdIcons: data };
		},

		clearSearch () {
			this.mdIconsSearch = "";
		},

		onIconSelections: async function (iconName) {
			this.slectedMenuIcon = iconName;
		},
	},
};
</script>
<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>