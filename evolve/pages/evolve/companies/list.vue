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
						{{ translate.companies_list }}
					</h1>
					<div class="sc-actions uk-margin-left">
						<!-- <nuxt-link id="option_link" to="/evolve/users/edit">
            </nuxt-link>-->
						<button class="sc-button datatable-print-button" @click="downloadCsv()">
							CSV
						</button>
						<button class="sc-button datatable-print-button" @click="downloadPdf()">
							PDF
						</button>
						<!-- <nuxt-link id="option_link" to="/evolve/companies/options"> -->
						<button class="sc-button datatable-print-button" @click="onEditCompany(null)">
							{{ translate.create_company }}
						</button>
						<!-- </nuxt-link> -->
					</div>
				</div>
			</div>
		</client-only>
		<div id="sc-page-content ">
			<div id="nav-mdi" class="uk-card">
				<div class="uk-card-body min-height-back">
					<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
						<div>
							<div class="uk-overflow-auto">
								<client-only>
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
											<table id="evolveCompanyMaster" class="uk-table uk-table-striped">
												<thead>
													<tr>
														<th>{{ translate.company_code }}</th>
														<th>{{ translate.company_name }}</th>
														<th>{{ translate.created_date }}</th>
														<th>{{ translate.options }}</th>
													</tr>
												</thead>
												<tbody>
													<tr v-for="(cmp,index) in getCompanyListData" :key="index">
														<td>{{ cmp.EvolveCompany_Code }}</td>
														<td>{{ cmp.EvolveCompany_Name }}</td>
														<td>{{ getDates(cmp.EvolveCompany_CreatedAt) }}</td>
														<td>
															<button
																title="Edit"
																class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
																@click="onEditCompany(cmp.EvolveCompany_ID)"
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
								</client-only>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
</style>
<script>
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
	data () {
		return {
			translate: {
				company_code: "Company Code",
				company_name: "Company Name",
				created_date: "Created Date",
				option: "Options",
				companies_list: "Companies List",
				//new
				create_company: "Create Company",
			},
			ip: "",
			editUrl: "/evolve/companies/",
			getCompanyListData: [],
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
		};
	},
	computed: {},
	mounted () {
		this.$root.$on("onChangeLanguage", () => {
			this.translateLanguage();
		});
	},
	created: async function () {
		this.getCompanyList();
	},
	beforeMount () {
		this.translateLanguage();
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
		removeModal: async function (e) {
			$(".uk-modal").remove(); // Remove Old Model From DOM
		},
		async notification (type = "danger", timeout = 3000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},
		/* Datatable Methods -- Start */
		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getCompanyList();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getCompanyList();
		},

		async downloadPdf () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolveCompanyMaster").outerHTML;
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
					title: "Evolve Bom Master",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveCompanyMaster",
				},
			};
		},
		async downloadCsv () {
			let filename = "evolveCompanyMaster";
			let csv = [];
			let html = document.getElementById("evolveCompanyMaster").outerHTML;
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
		async getCompanyList () {
			let getCompanyList = await this.$axios
				.$post("/api/v1/evolve/company/getCompanyList", {
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
			if (getCompanyList) {
				if (getCompanyList.statusCode == 200) {
					// this.dtData = getCompanyList.result;
					this.getCompanyListData = getCompanyList.result.records;
					if (getCompanyList.result.noOfRecord > 0) {
						this.pageCount = Math.ceil(
							getCompanyList.result.noOfRecord / this.displayRecord
						);
					} else {
						this.pageCount = 0;
					}
				} else {
					this.notification("danger", 3000, getCompanyList.message);
				}
			}
		},
		onInputSearch () {
			this.currentPage = 1;
			this.getCompanyList();
			this.paginateClick(1);
		},
		getDates (dt) {
			if (dt != "" && dt != null && dt != undefined) {
				console.log(dt, ">>>>>>>>>>>>>>>>>>>>>");
				let date = dt.slice(8, 10);
				let month = dt.slice(5, 7);
				let year = dt.slice(0, 4);
				let fomateddate = date + "/" + month + "/" + year;

				console.log(fomateddate, "<<<<<<<<<<<>>>>>>>>>>>>");
				// return this.$moment(dt).format("DD/MM/YYYY");
				return fomateddate;
			} else {
				return "";
			}
		},
		async onEditCompany (id) {
			// this.$router.push(this.editUrl + id);
			this.$store.dispatch('addNewTab', {
				title: 'EDIT COMPANY', 
				url:  id==null ?  '/evolve/companies/options' : '/evolve/companies/_id',
				params: {
					companyId: id,
				}
			});
		},
	},
};
</script>
