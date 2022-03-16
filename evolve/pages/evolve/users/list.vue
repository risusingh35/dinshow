<template>
	<div id="sc-page-wrapper" class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600" @click="getUserList()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
			</div>
			<div v-if="EvolveMenu_Id" class="evolve-page-header-icons">
				<a href="javascript:void(0)" data-uk-tooltip="title: Add To Favourite; pos: right" class="sc-actions-icon mdi mdi-star md-color-yellow-600" @click="$store.dispatch('addToFavouriteClick', EvolveMenu_Id)"></a>
			</div>
			<div class="evolve-page-header-icons evolve-float-right"> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click="$store.dispatch('removeOneTab', '/evolve/users/list')"></a>
			</div>

			<div class="evolve-page-header-icons evolve-float-right"> 
				<button
					class="sc-button datatable-print-button"
					type="button"
					@click="onEditUser(null)"
				>
					{{ translate.create_user }}
				</button>
			</div>
			 
			<div class="evolve-page-header-icons evolve-float-right">
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-excel md-color-indigo-600" @click="downloadCsv()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-pdf md-color-red-600" @click="downloadPdf()"></a>
			</div>
		</div>
		<div id="sc-page-content ">
			<div id="nav-mdi" class="uk-card">
				<div class="uk-card-body min-height-back">
					<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
						<div>
							<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
								<div>
									<div class="uk-overflow-auto">
										<client-only>
											<select v-model="displayRecord" @change="onDisplayRecordChange($event)">
												<option v-for="dr in displayRow" :key="dr" :value="dr">
													{{ dr }}
												</option>
											</select>
										</client-only>
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
											<table id="evolveUserMaster" class="uk-table uk-table-striped">
												<thead>
													<tr>
														<th>{{ translate.name }}</th>
														<th>{{ translate.login }}</th>
														<th>{{ translate.email_id }}</th>
														<th>{{ translate.created_date }}</th>
														<th>{{ translate.options }}</th>
													</tr>
												</thead>
												<tbody>
													<tr v-for="(user,index) in userList" :key="index">
														<td>{{ user.EvolveUser_Name }}</td>
														<td>{{ user.EvolveUser_login }}</td>
														<td>{{ user.EvolveUser_EmailID }}</td>
														<td>{{ getCreatedDate(user.EvolveUser_CreatedAt) }}</td>
														<td>
															<button
																title="Edit"
																class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
																@click="onEditUser(user.EvolveUser_ID)"
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
			</div>
		</div>
	</div>
</template>
<style>
.uk-position-top-right {
  top: 24px;
}
</style>
<script>
const rows = "";
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
		Paginate,
		EvolvePDF: process.client
			? () => import("~/components/jspdf/evolvePDF")
			: null,
	},
	props: {
		params: {
			type: Object,
			default: () => {}
		}
	},
	data () {
		return {
			EvolveMenu_Id :this.$route.query.EvolveMenu_Id,
			userId: this.$store.state.auth.user.EvolveUser_ID,
			token: this.$auth.getToken("local"),
			deleteApi: "/api/v1/evolve/deleteUser",
			editUrl: "/evolve/users/",
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
			csvExportColums: [0, 1, 2],
			pdfExportColums: [0, 1, 2],
			/** End : EvolveDataTable */

			translate: {
				users_list: "Users List",
				create_user: "Create User",
				name: "Name",
				login: "Login",
				email_id: "Email ID",
				created_date: "Created Date",
				options: "Options",
			},

			userList: [],
		};
	},
	computed: {},
	mounted () {
		this.$root.$on("onChangeLanguage", () => {
			console.log("Language Changed.....");
			this.translateLanguage();
		});

		console.log("PARAMS", this.params);
	},
	beforeMount () {
		this.translateLanguage();
	},
	created: async function () {
		this.getUserList();
		this.removeModal();
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
			$(".uk-modal").remove(); // Remove Old Model From DOM
		},
		/* Datatable Methods -- Start */
		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getUserList();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getUserList();
		},

		async downloadPdf () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolveUserMaster").outerHTML;
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
					title: "Evolve User Master",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveUserMaster",
				},
			};
		},
		async downloadCsv () {
			let filename = "evolveUserMaster";
			let csv = [];
			let html = document.getElementById("evolveUserMaster").outerHTML;
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

		async getUserList () {
			let list = await this.$axios
				.$post("/api/v1/evolve/user/getUsersList", {
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
					this.userList = list.result.records;
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
			this.getUserList();
			this.paginateClick(1);
		},
		testing: async function (id) {
			console.log(
				"Funcation Called ##################################################################"
			);
			console.log("ID", id);
			this.testLink = this.testLink + id;
			console.log("this.testLink", this.testLink);
		},
		delete_user: async function () {
			let delete_id = localStorage.getItem("delete_id");
			localStorage.removeItem("delete_id");
			let user_data = await this.$axios.$post(
				"/api/v1/evolve/user/deleteUser",
				{ id: delete_id }
			);
			if (user_data) {
				if (user_data.statusCode == 200) {
					this.notification("success", 3000, user_data.message);
					this.dtDOptions.ajax.data = {};
				} else {
					this.notification("danger", 3000, user_data.message);
				}
			}
		},
		getCreatedDate (EvolveUser_CreatedAt) {
			if (
				EvolveUser_CreatedAt != "" &&
        EvolveUser_CreatedAt != null &&
        EvolveUser_CreatedAt != undefined
			) {
				let dt = new Date(EvolveUser_CreatedAt);
				let date = dt.getDate();
				let month = parseInt(dt.getMonth() + 1);
				let year = dt.getFullYear();
				let hours = dt.getHours();
				let minutes = dt.getMinutes();
				let ampm = hours >= 12 ? "pm" : "am";
				hours = hours % 12;
				hours = hours ? hours : 12;
				minutes = minutes < 10 ? "0" + minutes : minutes;
				let createdAt =
          date +
          "/" +
          month +
          "/" +
          year +
          " " +
          hours +
          ":" +
          minutes +
          " " +
          ampm;
				return createdAt;
			} else {
				return "";
			}
		},
		onEditUser: async function (id) {
			let title 
			if (id == null) {
				title = "Creat User"
			}else{
				title = "Edit User'"
			}
			this.$store.dispatch('addNewTab', {
				title,
				url: '/evolve/users/_edit',
				params: {
					uid: id,
					name: 'TEST'
				}
			});
		},
	},
};
</script>
<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>