<template>
	<div id="sc-page-wrapper" class="uk-flex uk-flex-column">
		<client-only>
			<div
				id="sc-page-top-bar"
				class="sc-top-bar"
				data-uk-sticky="offset:48; show-on-up: true; animation: uk-animation-slide-top-medium"
			>
				<div class="sc-top-bar-content uk-flex uk-flex-1">
					<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
						{{ translate.role_list }}
					</h1>
					<div class="sc-actions uk-margin-left">
						<button class="sc-button datatable-print-button" @click="downloadCsv()">
							CSV
						</button>
						<button class="sc-button datatable-print-button" @click="downloadPdf()">
							PDF
						</button>
						<button
							class="sc-button datatable-print-button"
							data-uk-toggle="target : #CreateOrEditRole"
							@click="clearData()"
						>
							{{ translate.create_role }}
						</button>
					</div>
				</div>
			</div>
		</client-only>
		<client-only>
			<div id="sc-page-content ">
				<div id="nav-mdi" class="uk-card">
					<div class="uk-card-body min-height-back">
						<!--Start Here :  Role Menus Popup -->
						<div>
							<div id="modal-role-menu"
								ref="m"
								class="uk-modal"
								data-uk-modal
								bg-close="false"
							>
								<div class="uk-modal-dialog">
									<form class="sc-padding">
										<button class="uk-modal-close-default" type="button" data-uk-close></button>
										<div class="uk-modal-header">
											<h2 class="uk-modal-title">
												{{ translate.role_menu_list }}
											</h2>
										</div>
										<div class="uk-modal-body">
											<client-only>
												<Select2
													v-model="menuParent"
													name="menuParent"
													:settings="{ 'width': '100%', 'placeholder': 'Select Applicaion...', allowClear: true }"
													@change="onChangeApplication($event)"
												>
													<option
														v-for="apps in appLists"
														:key="apps.EvolveApp_ID"
														:value="apps.EvolveApp_ID"
													>
														{{ apps.EvolveApp_Name }}
													</option>
												</Select2>
												<client-only></client-only>
												<client-only></client-only>
												<FancyTree ref="treeTable" :options="treeMSel" :reloadtree="reloadMenu"></FancyTree>
												<client-only></client-only>
											</client-only>
										</div>
										<div class="uk-modal-footer uk-text-right">
											<button
												class="sc-button sc-button-flat-danger uk-modal-close"
												type="button"
											>
												{{ translate.cancel }}
											</button>
											<button
												class="sc-button"
												type="button"
												@click="onUpdateRoleToMenu(menuParent)"
											>
												{{ translate.update }}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
						<!--End Here : Role Menus Popup -->
						<!-- // create or Uodate Role popup started -->
						<div>
							<div id="CreateOrEditRole"
								ref="m"
								class="uk-modal"
								data-uk-modal
								bg-close="false"
							>
								<div class="uk-modal-dialog">
									<form class="sc-padding">
										<button class="uk-modal-close-default" type="button" data-uk-close></button>
										<div class="uk-modal-header">
											<h2 class="uk-modal-title">
												{{ translate.role_master }}
											</h2>
										</div>
										<div class="uk-modal-body">
											<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
												<div>
													<label>{{ translate.role_name }}</label>
													<ScInput
														v-model="$v.roleName.$model"
														mode="outline"
														placeholder="Role Name"
														name="roleName"
														:error-class="$v.roleName.$error"
														:validator="$v.roleName"
													></ScInput>
													<ul class="sc-vue-errors">
														<li v-if="!$v.roleName.required">
															{{ translate.role_name_is_required }}
														</li>
														<li
															v-if="!$v.roleName.minLength"
														>
															{{ translate.role_name_must_have_at_least }} {{ $v.roleName.$params.minLength.min }} {{ translate.letters }}.
														</li>
													</ul>
												</div>
											</div>
											<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
												<div>
													<label>{{ translate.role_description }}</label>
													<ScTextarea
														v-model="$v.roleDescription.$model"
														mode="outline"
														placeholder="Role Description"
														name="roleDescription"
														:error-class="$v.roleDescription.$error"
														:rows="2"
													></ScTextarea>
													<ul class="sc-vue-errors">
														<li
															v-if="!$v.roleDescription.required"
														>
															{{ translate.role_discription_is_required }} *
														</li>
													</ul>
												</div>
											</div>
											<div class="uk-child-width-1-2@m uk-grid" data-uk-grid>
												<div>
													<label>{{ translate.app_menu }}</label>
													<Select2
														v-model="defaultAppMenu"
														name="appMenu"
														:settings="{ 'width': '100%', 'placeholder': 'Select Applicaion...', allowClear: true }"
														:error-class="$v.defaultAppMenu.$error"
														:validator="$v.defaultAppMenu"
														@change="changeDefaultAppMenu($event)"
													>
														<option key value>
															{{ translate.select_app_menu }}
														</option>
														<option
															v-for="apps in appLists"
															:key="apps.EvolveApp_ID"
															:value="apps.EvolveApp_ID"
														>
															{{ apps.EvolveApp_Name }}
														</option>
													</Select2>
													<ul class="sc-vue-errors">
														<li
															v-if="!$v.defaultAppMenu.required"
														>
															{{ translate.app_menu_is_required }} *
														</li>
													</ul>
												</div>
												<div>
													<label>{{ translate.default_menu }}</label>
													<Select2
														v-model="defaultMenu"
														name="appMenu"
														:settings="{ 'width': '100%', 'placeholder': 'Select Menu...', allowClear: true }"
														:error-class="$v.defaultMenu.$error"
														:validator="$v.defaultMenu"
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
													<ul class="sc-vue-errors">
														<li v-if="!$v.defaultMenu.required">
															{{ translate.menu_is_required }} *
														</li>
													</ul>
												</div>
											</div>
											<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
												<div>
													<PrettyCheck v-model="roleIsActive" class="p-icon" name="roleIsActive">
														<i slot="extra" class="icon mdi mdi-check"></i>
														{{ translate.is_active }}
													</PrettyCheck>
												</div>
											</div>

											<div class="uk-modal-footer uk-text-right">
												<button
													class="sc-button sc-button-flat-danger uk-modal-close"
													type="button"
												>
													{{ translate.cancel }}
												</button>
												<button
													class="sc-button"
													type="button"
													@click="CreateOrUpdateRole($event)"
												>
													{{ translate.save }}
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
							<div>
								<div class="uk-overflow-auto">
									<select v-model="displayRecord" @change="onDisplayRecordChange($event)">
										<option v-for="dr in displayRow" :key="dr" :value="dr">
											{{ dr }}
										</option>
									</select>
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
										<table id="evolveRoleMaster" class="uk-table uk-table-striped">
											<thead>
												<tr>
													<th>{{ translate.role_name }}</th>
													<th>{{ translate.role_description }}</th>
													<th>{{ translate.role_active }}</th>
													<th>{{ translate.default_menu }}</th>
													<th>{{ translate.role_to_menu }}</th>
													<th>{{ translate.options }}</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(rl,index) in roleList" :key="index">
													<td>{{ rl.EvolveRole_Name }}</td>
													<td>{{ rl.EvolveRole_Description }}</td>
													<td>{{ rl.EvolveRole_IsActive }}</td>
													<td>{{ rl.EvolveMenu_Name }}</td>
													<td>
														<a
															class="uk-label uk-label-primary"
															data-uk-toggle="target: #modal-role-menu"
															@click="clearList(rl.EvolveRole_ID)"
														>Show Menu</a>
													</td>
													<td>
														<button
															title="Edit"
															class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
															@click="getSingleRoleData(rl.EvolveRole_ID)"
														>
															<i class="mdi mdi-square-edit-outline"></i>
														</button>
													</td>
												</tr>
											</tbody>
										</table>
										<div class="paginate">
											<Paginate
												:page-count="pageCount"
												:click-handler="paginateClick"
												:prev-text="'<'"
												:next-text="'>'"
												:value="currentPage"
												:container-class="'evolve_paginate'"
											></Paginate>
										</div>
									</client-only>
									<client-only>
										<EvolvePDF :reqdata="pdfData"></EvolvePDF>
									</client-only>
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
.uk-position-top-right {
  top: 24px;
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
	var Paginate = require("vuejs-paginate");
}
const rows = "";
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
		PrettyCheck,
		// DefaultDatatable: process.client ? () => import('~/components/datatables/DefaultDatatables') : null,
		FancyTree: process.client
			? () => import("~/components/FancyTreeMenu")
			: null,
		Select2: process.client ? () => import("~/components/Select2") : null,
		Paginate,
		EvolvePDF: process.client
			? () => import("~/components/jspdf/evolvePDF")
			: null,
		//	PrettyCheck
	},
	mixins: [validationMixin],
	data () {
		return {
			EvolveMenu_Id :this.$route.query.EvolveMenu_Id,
			translate: {
				update: "Update",
				cancel: "Cancel",
				role_menu_list: "Role Menu List ",
				create_role: "Create Role",
				role_list: "Role List",
				role_master: "Role Master",
				role_name: "Role Name ",
				role_name_is_required: "Role Name Is Required",
				role_name_must_have_at_least: "Role Name must have at least",
				letters: "letters",
				role_description: "Role Description",
				role_discription_is_required: " Role Discription is required ",
				is_active: "Is Active",
				cancel: "Cancel",
				save: "Save",
				role_active: "Role Active",
				role_to_menu: "Role To Menu",
				options: "Options",
				app_menu: "App Menu",
				default_menu: "Default Menu",
				app_menu_is_required: "App Menu IS Required",
				menu_is_required: "Menu IS Required",
				select_app_menu: "Select App Menu",
				select_menu: "Select Menu",
			},

			/** Start : EvolveDataTable */
			search: "", // For making dynamic search
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1, 2, 3],
			pdfExportColums: [0, 1, 2, 3],
			/** End : EvolveDataTable */
			dateRange: "",
			userId: this.$auth.$state.user.EvolveUser_ID, // this.$store.state.auth.user.EvolveUser_ID,
			token: this.$auth.getToken("local"),
			deleteApi: "/api/v1/evolve/deleteRole",
			baseURL: this.$axios.defaults.baseURL,
			treeMenuApi: "/api/v1/evolve/getAppMenuByAppId",

			roleName: "",
			roleDescription: "",
			roleIsActive: true,
			roleId: "",
			questions: [],
			appLists: [],
			menuParent: "",

			treeMSel: {
				extensions: ["glyph"],
				checkbox: true,
				selectMode: 3,
				debugLevel: 0,
				glyph: true,
				source: [],
			},
			reloadMenu: true,
			defaultAppMenu: "",
			defaultMenu: "",
			defaultMenuList: [],
			roleList: [],
		};
	},
	computed: {},
	watch: {
		questions: {
			handler: function (val, oldVal) {
				this.foo(); // call it in the context of your component object
			},

			deep: true,
		},
	},
	mounted () {
		this.$root.$on("onChangeLanguage", () => {
			console.log("Language Changed.....");
			this.translateLanguage();
		});
	},
	created: async function () {
		this.getRoleList();
		this.getAppList();
		this.removeModal();
	},
	validations: {
		roleName: {
			required,
			minLength: minLength(3),
		},
		roleDescription: {
			required,
		},
		defaultAppMenu: {
			required,
		},
		defaultMenu: {
			required,
		},
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
		async notification (type = "danger", timeout = 10000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},
		// defult evolve functions end
		/* Datatable Methods -- Start */
		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getRoleList();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getRoleList();
		},

		async downloadPdf () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolveRoleMaster").outerHTML;
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
					title: "Evolve Role Master",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveRoleMaster",
				},
			};
		},
		async downloadCsv () {
			let filename = "evolveRoleMaster";
			let csv = [];
			let html = document.getElementById("evolveRoleMaster").outerHTML;
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

		clearList: async function (id) {
			this.roleId = id;
			this.$refs.treeTable.tree.reload([]);
		},
		async onChangeApplication (event) {
			// let roleId = localStorage.getItem("roleId")

			const treeMSelSource = await this.$axios
				.$post("/api/v1/evolve/role/getAppMenuByAppId", {
					EvolveMenu_AppId: event,
					EvolveRole_ID: this.roleId,
				})
				.catch((e) => {
					this.notification(
						"danger",
						10000,
						"Problem with connecting to server!"
					);
				});

			if (treeMSelSource) {
				if (treeMSelSource.statusCode == 200) {
					this.$refs.treeTable.tree.reload(treeMSelSource.result);
				} else {
					this.$refs.treeTable.tree.reload([]);

					this.notification("danger", 10000, treeMSelSource.message);
				}
			} else {
				this.$refs.treeTable.tree.reload([]);

				this.notification("danger", 10000, "No Menu Found");
			}
		},
		async getRoleList () {
			let list = await this.$axios
				.$post("/api/v1/evolve/role/getAllRole", {
					displayRecord: this.displayRecord,
					startFrom: this.startFrom,
					search: this.search,
				})
				.catch((e) => {
					this.notification(
						"danger",
						10000,
						"Problem with connecting to server!"
					);
				});

			if (list) {
				if (list.statusCode == 200) {
					this.roleList = list.result.records;
					if (list.result.noOfRecord > 0) {
						this.pageCount = Math.ceil(
							list.result.noOfRecord / this.displayRecord
						);
					} else {
						this.pageCount = 0;
					}
				} else {
					this.notification("danger", 10000, list.message);
				}
			}
		},
		onInputSearch () {
			this.currentPage = 1;
			this.getRoleList();
			this.paginateClick(1);
		},
		async changeDefaultAppMenu (e) {
			if (this.defaultAppMenu != "" && this.defaultAppMenu != "null") {
				this.defaultMenuList = [];
				this.defaultMenu = "";
				let response = await this.$axios
					.$post("/api/v1/evolve/role/getDefaultMenuList", {
						EvolveMenu_AppId: this.defaultAppMenu,
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
						this.defaultMenuList = response.result;
					} else {
						this.notification("danger", 10000, response.message);
					}
				}
			} else {
				this.notification("danger", 10000, "Select App Menu!");
			}
		},
		getAppList: async function () {
			const getAppList = await this.$axios.$get(
				"/api/v1/evolve/role/appListForRole"
			);
			if (getAppList) {
				if (getAppList.status == "success") {
					this.appLists = getAppList.result;
				}
			}
		},
		clearData: async function () {
			this.$v.$reset();
			this.roleId = "";
			this.roleName = "";
			this.roleDescription = "";
			this.defaultMenu = "";
			this.defaultAppMenu = "";
		},
		async onUpdateRoleToMenu (menuParent) {
			let selNodes = this.$refs.treeTable.tree.getSelectedNodes();
			let selectedMenuArray = $.map(selNodes, function (node) {
				return node.key;
			});
			const menuUpdates = await this.$axios
				.$post("/api/v1/evolve/role/updateRoleToMenu", {
					EvolveRole_ID: this.roleId,
					selectedMenuArray: selectedMenuArray,
					EvolveApp_ID: menuParent,
				})
				.catch((e) => {
					this.notification(
						"danger",
						10000,
						"Problem with connecting to server!"
					);
				});

			if (menuUpdates) {
				if (menuUpdates.statusCode == 200) {
					this.notification("success", 10000, "Role Updated");
					this.$refs.treeTable.tree.reload([]);
					UIkit.modal("#modal-role-menu").hide();
					this.menuParent = "";
				} else {
					//this.$refs.treeTable.tree.reload([])
					this.notification("danger", 10000, menuUpdates.message);
				}
			} else {
				this.$refs.treeTable.tree.reload([]);

				this.notification("danger", 10000, "Role Not Updated!");
			}
		},
		async CreateOrUpdateRole (e) {
			if (this.roleId == "") {
				this.CreateRole(e);
			} else {
				this.UpdateRole(e);
			}
		},
		CreateRole: async function (e) {
			e.preventDefault();
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.notification("danger", 10000, "Please fill in the required fields");
			} else {
				let roleDetails = {
					EvolveRole_Name: this.roleName,
					EvolveRole_Description: this.roleDescription,
					EvolveRole_IsActive: this.roleIsActive,
					EvolveRole_DefaultMenu_ID: this.defaultMenu,
				};
				let createRole = await this.$axios.$post(
					"/api/v1/evolve/role/createRole",
					roleDetails
				);
				if (createRole.statusCode != 200) {
					this.notification("danger", 10000, createRole.message);
				} else {
					this.$router.push("/evolve/roles/list");
					this.notification("success", 10000, createRole.message);
					UIkit.modal("#CreateOrEditRole").hide();
					this.roleId = "";
					this.roleName = "";
					this.roleDescription = "";
					this.getRoleList();
				}
			}
		},
		getSingleRoleData: async function (id) {
			this.roleId = id;
			let roleGetReq = { EvolveRole_ID: this.roleId };
			const role_data = await this.$axios.$post(
				"/api/v1/evolve/role/selectSingleRole",
				roleGetReq
			);
			if (role_data) {
				if (role_data.statusCode == 200) {
					this.roleName = role_data.result.EvolveRole_Name;
					this.roleDescription = role_data.result.EvolveRole_Description;
					this.roleIsActive = role_data.result.EvolveRole_IsActive;
					this.defaultAppMenu = role_data.result.EvolveMenu_AppId + "";

					await this.changeDefaultAppMenu();
					this.defaultMenu = role_data.result.EvolveRole_DefaultMenu_ID + "";
					UIkit.modal("#CreateOrEditRole").show();
				} else {
					this.notification("danger", 10000, role_data.message);
				}
			}
		},
		UpdateRole: async function (e) {
			e.preventDefault();
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.notification("danger", 10000, "Please Fill All Required Fileds");
			} else {
				let roleDetails = {
					EvolveRole_ID: this.roleId,
					EvolveRole_Name: this.roleName,
					EvolveRole_Description: this.roleDescription,
					EvolveRole_IsActive: this.roleIsActive,
					EvolveRole_DefaultMenu_ID: this.defaultMenu,
				};
				let updaterole = await this.$axios.$post(
					"/api/v1/evolve/role/updateRole",
					roleDetails
				);
				if (updaterole.statusCode != 200) {
					this.notification("danger", 10000, updaterole.message);
				} else {
					this.notification("success", 10000, updaterole.message);
					UIkit.modal("#CreateOrEditRole").hide();
					this.getRoleList();
					this.$router.push("/evolve/roles/list");
					this.roleId = "";
					this.roleName = "";
					this.roleDescription = "";
				}
			}
		},
		delete_role: async function () {
			let delete_id = localStorage.getItem("delete_id");
			localStorage.removeItem("delete_id");
			let role_data = await this.$axios.$post(
				"/api/v1/evolve/role/deleteRole",
				{ id: delete_id }
			);
			if (role_data) {
				if (role_data.statusCode == 200) {
					this.notification("success", 10000, role_data.message);
					this.getRoleList();
				} else {
					this.notification("danger", 10000, role_data.message);
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