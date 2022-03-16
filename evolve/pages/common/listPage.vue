<template>
	<div class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="getAllMenuList()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
			</div>
			 
			<div v-if="params.EvolveMenu_Id" class="evolve-page-header-icons">
				<a href="javascript:void(0)" data-uk-tooltip="title: Add To Favourite; pos: right" class="sc-actions-icon mdi mdi-star md-color-yellow-600" @click="$store.dispatch('addToFavouriteClick', params.EvolveMenu_Id)"></a>
			</div>
			<div class="evolve-page-header-icons evolve-float-right"> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click="$store.dispatch('removeOneTab', '/common/listPage')"></a>
			</div>
			
			<div class="evolve-page-header-icons evolve-float-right">
				<button
					class="sc-button sc-button-mini header-button-evolve"
					type="button"
					@click="onCreateOrEditMenu('')"
				>
					{{ pageTitle }}
				</button>
			</div>
			 
			<div class="evolve-page-header-icons evolve-float-right">
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-excel md-color-indigo-600" @click="downloadCsv()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-pdf md-color-red-600" @click="downloadPdf()"></a>
			</div>
		</div>
		<client-only>
			<div id="sc-page-content" class="evolve-page-body">
				<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
					<div class="evolve_table_list">
						<select v-model="displayRecord" @change="onDisplayRecordChange($event)">
							<option v-for="dr in displayRow" :key="dr" :value="dr">
								{{ dr }}
							</option>
						</select>
						<client-only>
							<input
								v-model="search"
								type="text"
								:placeholder="translate.search_here"
								style="float: right !important;"
								@input="onInputSearch()"
							>
						</client-only>
						<client-only>
							<table id="evolveMenuMaster" class="uk-table uk-table-striped">
								<thead>
									<tr>
										<th v-for="(header,ind) in listData.header" :key="ind">
											{{ header }}
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(data,ind) in listData.data" :key="ind">
										<td v-for="(dt,indx) in data" :key="indx">
											{{ dt }}
										</td>
										<td>
											<button
												title="Edit"
												class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
												@click="onCreateOrEditMenu()"
											>
												<i class="mdi mdi-square-edit-outline"></i>
											</button>
										</td>
									</tr>
								</tbody>
							</table>
							<div class="paginate">
								<!-- <Paginate
									:page-count="pageCount"
									:click-handler="paginateClick"
									:prev-text="'<'"
									:next-text="'>'"
									:value="currentPage"
									:container-class="'evolve_paginate'"
								></Paginate> -->
							</div>
							<client-only>
								<!-- <EvolvePDF :reqdata="pdfData"></EvolvePDF> -->
							</client-only>
						</client-only>
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
.icons_selections {
  height: 200px !important;
  overflow: auto;
}
</style>
<script>
 
if (process.client) {
	// var Paginate = require("vuejs-paginate");
}
export default {
	head () {
		return {
			title: "Evolve - " + this.$route.name,
		};
	},
	components: {
		// Paginate,
		// EvolvePDF: process.client
		// 	? () => import("~/components/jspdf/evolvePDF")
		// 	: null,
	},

 
	props: {
		params: {
			type: Object,
			default: () => {}
		}
	},
	layout: "eDefaultV2",
	data () {
		return {

			pageTitle : "List Page",
			listData : {
				header : [],
				data : [],
				options : {
					isPdfExport : false, 
					isCsvExport : false, 
					isPrint : false, 
				}
			},



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
				menu_type  : "Menu Type"
			},

			menuList: [],
			menuTypeList : [],

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
		 
	},
	mounted () {
		this.$root.$on("onChangeLanguage", () => {
			console.log("Language Changed.....");
			this.translateLanguage();
		});
	},
	created: async function () {
		this.removeModal();

		this.getAllMenuList();




		this.listData.header = ['header1', 'header2', 'header3', 'header4', 'options'];
		this.listData.data.push(['data1', 'data2', 'data3', 'data4'])
		 

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

		async notification (type = "danger", timeout = 3000, message = "") {
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
			this.getAllMenuList();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getAllMenuList();
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
		async getAllMenuList () {
			let list = await this.$axios
				.$post("/api/v1/evolve/menu/getAllMenulist", {
					displayRecord: this.displayRecord,
					startFrom: this.startFrom,
					search: this.search,
				})
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (list) {
				if (list.statusCode == 200) {
					this.menuList = list.result.records;
					if (list.result.noOfRecord > 0) {
						this.pageCount = Math.ceil(
							list.result.noOfRecord / this.displayRecord
						);
					} else {
						this.pageCount = 0;
					}
				} else {
					this.notification("danger", 3000, list.message);
				}
			}
		},

		onInputSearch () {
			this.currentPage = 1;
			this.getAllMenuList();
			this.paginateClick(1);
		},

		async onChange_application (event) {
			let menu_req = { EvolveMenu_AppId: event };
			const all_menu = await this.$axios
				.$post("/api/v1/evolve/menu/getMenusByAppId", menu_req)
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});

			if (all_menu) {
				if (all_menu.statusCode == 200) {
					this.all_menu = all_menu.result;
				} else {
					this.notification("danger", 3000, all_menu.message);
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
		onCreateOrEditMenu: async function (EvolveMenu_ID) {
			this.$store.dispatch('removeOneTab', '/evolve/menus/options')
			this.$store.dispatch('addNewTab', {
				title: EvolveMenu_ID == '' ? 'Menu Create'  :  'Menu Update', 
				url: '/evolve/menus/options',
				params: {
					EvolveMenu_ID: EvolveMenu_ID,
				}
			});
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
					this.notification("success", 3000, menu_data.message);
					this.getAllMenuList();
				} else {
					this.notification("danger", 3000, menu_data.message);
				}
			}
		},

		clearSearch () {
			this.mdIconsSearch = "";
		},

	},
};
</script>
<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>