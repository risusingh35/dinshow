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
						{{ translate.location_group }}
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
							@click="addLocationGroup()"
						>
							{{ translate.add_location_group }}
						</button>
					</div>
				</div>
			</div>
		</client-only>
		<div id="sc-page-content ">
			<div id="nav-mdi" class="uk-card">
				<div class="uk-card-body min-height-back">
					<!--  Creation And Edit Model Start -->
					<div id="addEditLocationGroup" class="uk-modal" data-uk-modal bg-close="false">
						<div class="uk-modal-dialog">
							<button class="uk-modal-close-default" type="button" data-uk-close></button>
							<div class="uk-modal-header">
								<h2 class="uk-modal-title">
									{{ translate.location_group }}
								</h2>
							</div>
							<div class="uk-modal-body">
								<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
									<div>
										<label>{{ translate.location_group_name }}</label>
										<client-only>
											<ScInput
												v-model="$v.groupName.$model"
												name="groupName"
												mode="outline"
												placeholder="Enter Location Group Name"
												:error-class="$v.groupName.$error"
												:validator="$v.groupName"
											></ScInput>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.groupName.required"
												class="li_error"
											>
												{{ translate.group_name_is_required }} *
											</li>
										</ul>
									</div>
								</div>

								<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
									<div>
										<label>{{ translate.group_code }}</label>
										<client-only>
											<ScInput
												v-model="$v.groupCode.$model"
												name="groupCode"
												mode="outline"
												placeholder="Enter Group Code"
												:error-class="$v.groupCode.$error"
												:validator="$v.groupCode"
											></ScInput>
										</client-only>
										<ul class="sc-vue-errors">
											<li
												v-if="!$v.groupCode.required"
												class="li_error"
											>
												{{ translate.group_code_is_required }}*
											</li>
										</ul>
									</div>
								</div>
								<div class="uk-child-width-1-1@m uk-grid" data-uk-grid>
									<div>
										<PrettyCheck
											v-model="groupStatus"
											name="groupStatus"
											class="p-icon button-margin-top"
										>
											<i slot="extra" class="icon mdi mdi-check"></i>
											{{ translate.group_status }}
										</PrettyCheck>
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
									@click="addUpdate($event)"
								>
									{{ translate.save }}
								</button>
							</div>
						</div>
					</div>
					<!--  Creation and Edit Model Finished  -->
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
										@input="onInputSearch();"
									>
								</client-only>
								<client-only>
									<table id="evolveLocationGroupMaster" class="uk-table uk-table-striped">
										<thead>
											<tr>
												<th>{{ translate.group_name }}</th>
												<th>{{ translate.group_code }}</th>
												<th>{{ translate.status }}</th>
												<th>{{ translate.create_date }}</th>
												<th>{{ translate.options }}</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(lg,index) in locationgroupList " :key="index">
												<td>{{ lg.EvolveLocationGroup_Name }}</td>
												<td>{{ lg.EvolveLocationGroup_Code }}</td>
												<td>
													<span v-if="lg.EvolveLocationGroup_Status">Active</span>
													<span v-else>IN Active</span>
												</td>
												<td>{{ cretedDate(lg.EvolveLocationGroup_CreatedAt) }}</td>

												<td>
													<button
														title="Edit"
														class="sc-button sc-button-primary waves-effect sc-button-mini waves-button waves-light"
														@click="edit_SingleLocationGroup(lg.EvolveLocationGroup_ID)"
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
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import customValidators from "~/plugins/vuelidateValidators";
import ScInput from "~/components/Input";
import moment from "~/plugins/moment";
import ScTextarea from "~/components/Textarea";
import PrettyCheck from "pretty-checkbox-vue/check";
if (process.client) {
	// // require(~/plugins/daterangepicker);
	var Paginate = require("vuejs-paginate");
}
require("~/plugins/jquery");
export default {
	head () {
		return {
			title: "evolve - " + this.$route.name,
		};
	},
	layout: "eDefaultV2",
	components: {
		ScInput,
		PrettyCheck,
		Paginate,
		EvolvePDF: process.client
			? () => import("~/components/jspdf/evolvePDF")
			: null,
	},
	mixins: [validationMixin],
	data () {
		return {
			translate: {
				location_group: "Location Group",
				add_location_group: "Add Location Group",
				location_group: "Location Group",
				location_group_name: "Location Group Name",
				group_name_is_required: "Group Name Is Required",
				group_code: "Group Code",
				group_code_is_required: "Group Code Is Required",
				group_status: "Group Status",
				cancel: "Cancel",
				save: "Save",
				group_name: "Group Name",
				group_code: "Group Code",
				status: "Status",
				create_date: "Create Date",
				options: "Options",
			},
			dateRange: "",
			userId: this.$store.state.auth.user.EvolveUser_ID,
			token: this.$auth.getToken("local"),
			deleteApi: "/api/v1/evolve/deleteItem",
			baseURL: this.$axios.defaults.baseURL,
			// dtBOptions: {
			// 	"scrollY": "200px",
			// 	"scrollCollapse": true,
			// 	"paging": false,
			// 	responsive: 'responsiveModal'
			// },
			// dtCOptions: {
			// 	"pagingType": "full_numbers"
			// },
			// dtAData: [],
			// dtDOptions: {
			// 	ajax : {
			// 		url :  this.$axios.defaults.baseURL+'/api/v1/evolve/locationGroup/getLocationGroupList',
			// 		dataType : "json",
			// 		type : "post",
			// 		data :{
			// 		},
			// 		headers : {
			// 			'Authorization': this.$auth.getToken('local')
			// 		},
			// 	},
			// 	ajaxReqData :{},
			// 	columns: [
			// 		{data: "EvolveLocationGroup_Name", mData: "EvolveLocationGroup_Name"},
			// 		{data: "EvolveLocationGroup_Code", mData: "EvolveLocationGroup_Code"},

			// 		{ data: "EvolveLocationGroup_Status",
			// 			render: function (data, type, row) {
			// 				if(row.EvolveLocationGroup_Status == true){
			// 					return 'Active';
			// 				}else{
			// 					return 'IN Active';
			// 				}
			// 			}
			// 		},
			// 		{data: "EvolveLocationGroup_CreatedAt",
			// 			render: function (data, type, row){
			// 				let dt = new Date(row.EvolveLocationGroup_CreatedAt);
			// 				let date = ('0' + dt.getDate()).slice(-2);
			// 				let month = ('0' + parseInt(dt.getMonth()+1)).slice(-2);
			// 				let year = dt.getUTCFullYear();
			// 				let createdAt = date + '/' + month + '/' + year; // + ' ' + hours + ':' + minutes ;
			// 				return createdAt;
			// 			}
			// 		},
			// 		{data: "EvolveLocationGroup_ID",
			// 			render : function (data, type, row){
			// 				return '<button class="sc-button sc-button-mini sc-button-primary  waves-button waves-light edit_loc_group" data-id="'+row.EvolveLocationGroup_ID+'">Edit';
			// 			}
			// 		}
			// 	],
			// 	ordering: false,
			// 	searching: false,
			// 	pageLength : 10,
			// 	aLengthMenu: [[10, 25, 50, 75], [10, 25, 50, 75]],
			// 	iDisplayLength: 0,
			// 	buttons: [
			// 		{
			// 			extend: "copyHtml5",
			// 			className: "sc-button datatable-print-button",
			// 			text: 'Copy'
			// 		},
			// 		{
			// 			extend: "csvHtml5",
			// 			className: "sc-button datatable-print-button",
			// 			text: 'CSV '
			// 		},
			// 		{
			// 			extend: "excelHtml5",
			// 			className: "sc-button datatable-print-button",
			// 			text: 'Excel '
			// 		},
			// 		{
			// 			extend: "pdfHtml5",
			// 			className: "sc-button sc-button-icon datatable-print-button",
			// 			text: '<i class="mdi mdi-file-pdf md-color-red-800"></i>'
			// 		},
			// 		{
			// 			extend: "print",
			// 			className: "sc-button sc-button-icon datatable-print-button",
			// 			text: '<i class="mdi mdi-printer"></i>',
			// 			title: 'Custom Title',
			// 			messageTop: 'Custom message on the top',
			// 			messageBottom: 'Custom message on the bottom',
			// 			autoPrint: true
			// 		}
			// 	]
			// },
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

			groupName: "",
			groupCode: "",
			groupStatus: true,
			groupID: "0",
			locationgroupList: [],
		};
	},
	computed: {},
	beforeDestroy () {
		clearInterval(this.ramUpdateInterval);
	},
	created: async function () {
		this.removeModal();
		this.getLocationGroupList();
	},
	validations: {
		groupName: {
			required,
		},
		groupCode: {
			required,
		},
	},
	beforeMount () {
		this.translateLanguage();
	},
	mounted () {
		// const self = this;
		// $(document).on('click', '.edit_loc_group', function () {
		// 	let id = $(this).attr('data-id');
		// 	self.edit_SingleLocationGroup(id)
		// });

		this.$root.$on("onChangeLanguage", () => {
			console.log("Language Changed.....");
			this.translateLanguage();
		});
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
		async notification (type = "danger", timeout = 3000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},
		dtBasicInitialized () {
			this.$refs.basicTable.$dt
				.buttons()
				.container()
				.appendTo(document.getElementById("sc-dt-buttons"));
		},
		removeModal: async function (e) {
			$(".uk-modal").remove(); // Remove Old Model From DOM
		},
		// defult evolve functions end
		/* Datatable Methods -- Start */
		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getLocationGroupList();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getLocationGroupList();
		},

		async downloadPdf () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("evolveLocationGroupMaster").outerHTML;
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
					title: "Evolve Location Group Master",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveLocationGroupMaster",
				},
			};
		},
		async downloadCsv () {
			let filename = "evolveLocationGroupMaster";
			let csv = [];
			let html = document.getElementById("evolveLocationGroupMaster").outerHTML;
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

		addLocationGroup: async function () {
			this.$v.$reset();
			(this.groupName = ""),
			(this.groupCode = ""),
			(this.groupStatus = true),
			(this.groupID = "0"),
			UIkit.modal("#addEditLocationGroup").show();
		},
		addUpdate: async function (e) {
			e.preventDefault();
			this.$v.$touch();
			if (this.$v.$invalid) {
				this.notification("danger", 3000, "Please Fill All Required Fileds");
			} else {
				if (this.groupID == "0") {
					let response = await this.$axios
						.$post("/api/v1/evolve/locationGroup/addLocationGroup", {
							EvolveLocationGroup_Name: this.groupName,
							EvolveLocationGroup_Code: this.groupCode,
							EvolveLocationGroup_Status: this.groupStatus,
						})
						.catch((e) => {});
					if (response.statusCode == 200) {
						this.notification("success", 3000, response.message);
						this.getLocationGroupList();
						UIkit.modal("#addEditLocationGroup").hide();
					} else {
						this.notification("danger", 3000, response.message);
					}
				} else {
					let response = await this.$axios
						.$post("/api/v1/evolve/locationGroup/updateLocationGroup", {
							EvolveLocationGroup_ID: this.groupID,
							EvolveLocationGroup_Name: this.groupName,
							EvolveLocationGroup_Code: this.groupCode,
							EvolveLocationGroup_Status: this.groupStatus,
						})
						.catch((e) => {});
					if (response.statusCode == 200) {
						this.notification("success", 3000, response.message);
						this.getLocationGroupList();
						UIkit.modal("#addEditLocationGroup").hide();
					} else {
						this.notification("danger", 3000, response.message);
					}
				}
			}
		},
		edit_SingleLocationGroup: async function (id) {
			this.groupID = id;
			const responce = await this.$axios.$post(
				"/api/v1/evolve/locationGroup/getSingleLocationGroup",
				{ EvolveLocationGroup_ID: this.groupID }
			);
			if (responce) {
				if (responce.statusCode == 200) {
					UIkit.modal("#addEditLocationGroup").show();

					this.groupName = responce.result[0].EvolveLocationGroup_Name;
					this.groupCode = responce.result[0].EvolveLocationGroup_Code;
					this.groupStatus = responce.result[0].EvolveLocationGroup_Status;
				} else {
					this.notification("danger", 3000, response.message);
				}
			}
		},
		async getLocationGroupList () {
			let groupList = await this.$axios
				.$post("/api/v1/evolve/locationGroup/getLocationGroupList", {
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
			if (groupList) {
				if (groupList.statusCode == 200) {
					this.locationgroupList = groupList.result.records;
					if (groupList.result.noOfRecord > 0) {
						this.pageCount = Math.ceil(
							groupList.result.noOfRecord / this.displayRecord
						);
					}
				} else {
					this.notification("danger", 3000, groupList.message);
				}
			}
		},
		onInputSearch () {
			this.currentPage = 1;
			this.getLocationGroupList();
			this.paginateClick(1);
		},
		cretedDate (EvolveLocationGroup_CreatedAt) {
			let dt = new Date(EvolveLocationGroup_CreatedAt);
			let date = ("0" + dt.getDate()).slice(-2);
			let month = ("0" + parseInt(dt.getMonth() + 1)).slice(-2);
			let year = dt.getUTCFullYear();
			let createdAt = date + "/" + month + "/" + year; // + ' ' + hours + ':' + minutes ;
			return createdAt;
		},
	},
};
</script>	
<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>
