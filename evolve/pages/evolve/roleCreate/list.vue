<template>
	<div class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="getRoleList();"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
			</div>
			 
			<div v-if="EvolveMenu_Id" class="evolve-page-header-icons">
				<a href="javascript:void(0)" data-uk-tooltip="title: Add To Favourite; pos: right" class="sc-actions-icon mdi mdi-star md-color-yellow-600" @click="$store.dispatch('addToFavouriteClick', EvolveMenu_Id)"></a>
			</div>
			
			<div class="evolve-page-header-icons">
				{{ translate.role_list }}
			</div>
			<div class="evolve-page-header-icons evolve-float-right"> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click="$destroy(); $store.dispatch('removeOneTab', '/evolve/roleCreate/list')"></a>
			</div>

			<div class="evolve-page-header-icons evolve-float-right"> 
				<button
					class="sc-button datatable-print-button"
					type="button"
					@click="onClickAddOrEdit('')"
				>
					{{ translate.add_role }}
				</button>
			</div>
			 
			<div class="evolve-page-header-icons evolve-float-right">
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-excel md-color-indigo-600" @click="downloadCsv()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-pdf md-color-red-600" @click="downloadPdf()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-printer md-color-cyan-600"></a>
			</div>
		</div>
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
															@click="onClickAddOrEdit(rl.EvolveRole_ID)"
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
		// ScInput,
		// ScTextarea,
		// PrettyCheck,
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
				role_list : "Role List",
				add_role : "Add Role",
				role_name : "Role Name",
				role_description : "Role Description",
				role_status : "Role Status",
				actions : "Action",
				active : "Active",
				deactive : "Deactive",

				update: "Update",
				role_menu_list: "Role Menu List ",
			
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
			csvExportColums: [0, 1, 2],
			pdfExportColums: [0, 1, 2],
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
			editUrl : '/evolve/roleCreate/option',
 
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
		// roleDescription: {
		// 	required,
		// },
		// defaultAppMenu: {
		// 	required,
		// },
		// defaultMenu: {
		// 	required,
		// },
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
				.$post("/api/v1/evolve/roleCreate/getAppMenuByAppId", {
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
				.$post("/api/v1/evolve/roleCreate/getAllRoleList", {
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
			// console.log("selNodes>>>>", selNodes);
			// let selectedMenuArray = $.map(selNodes, function (node) {
			// 	return  node.key;
			// });
			let selectedMenuArray = []
			for (let i = 0; i < selNodes.length; i++) {
				selectedMenuArray.push(selNodes[i].key)
				const found = selectedMenuArray.some(element =>parseInt(element) == parseInt(selNodes[i].data.menuParent))
				console.log("found>>>", found);

				if (found == false && selNodes[i].data.menuParent != 0 ) {
					selectedMenuArray.push(selNodes[i].data.menuParent)
				}
			}
			
			console.log("selectedMenuArray>>>>>", selectedMenuArray);
			const menuUpdates = await this.$axios
				.$post("/api/v1/evolve/role/updateRoleToMenu", {
					EvolveRole_ID: this.roleId,
					selectedMenuArray: selectedMenuArray,
					EvolveApp_ID: menuParent,
				})
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});

			if (menuUpdates) {
				if (menuUpdates.statusCode == 200) {
					this.notification("success", 3000, "Role Updated");
					this.$refs.treeTable.tree.reload([]);
					UIkit.modal("#modal-role-menu").hide();
					this.menuParent = "";
				} else {
					// this.$refs.treeTable.tree.reload([])
					this.notification("danger", 3000, menuUpdates.message);
				}
			} else {
				this.$refs.treeTable.tree.reload([]);

				this.notification("danger", 3000, "Role Not Updated!");
			}
		},


		onClickAddOrEdit : async function (EvolveRole_ID) {
			this.$store.dispatch('removeOneTab', this.editUrl)
			let pageName = EvolveRole_ID == '' ? 'Add Role' : 'Edit Role'
			this.$store.dispatch('addNewTab', {
				title: pageName, 
				url: this.editUrl,
				params: {
					EvolveRole_ID: EvolveRole_ID,
				}
			});
		}


	},
};
</script>
<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>