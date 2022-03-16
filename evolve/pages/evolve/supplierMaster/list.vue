<template>
	<div id="sc-page-wrapper" class="uk-flex uk-flex-column">
		<no-ssr> 
			<div id="sc-page-top-bar"
				class="sc-top-bar"
				data-uk-sticky="offset:48; show-on-up: true; animation: uk-animation-slide-top-medium"
			>
				<div class="sc-top-bar-content uk-flex uk-flex-1">
					<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
						{{ translate.supplier_master }}
					</h1>
					<button class="sc-button datatable-print-button" @click="downloadCsv()">
						CSV
					</button>
					<button class="sc-button datatable-print-button" @click="downloadPdf()">
						PDF
					</button>
				</div>
			</div>
		</no-ssr>
		<div id="sc-page-content ">
			<div id="nav-mdi" class="uk-card">
				<div class="uk-card-body min-height-back">
					<!-- <div class="uk-child-width-1-5@m uk-grid" data-uk-grid>
						<div class=" uk-margin-top "> 
							<no-ssr>                                
								<button class="sc-button sc-button-primary full-width" type="button" @click="downloadSample()">
									{{ translate.download_sample }}
								</button>
							</no-ssr>
						</div>
						<div>
						</div>    
						<div>
						</div>    
						<div>
							<label> {{ translate.csv_upload }}</label>
							<input ref="csvFile" type="file" class="uk-input" @change="handleFileUpload()">
						</div>
						<div>
							<div class=" uk-margin-top ">
								<button class="sc-button sc-button-primary full-width" type="button" @click="uploadFile()">
									{{ translate.upload_suppliers }}
								</button>
							</div>
						</div>
					</div> -->
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
									<input v-model="search"
										type="text"
										placeholder="Search Here"
										style="float: right !important;"
										@input="onInputSearch()"
									>
								</client-only>
								<client-only>
									<div id="evolveSupplier">
										<table id="evolveCustomerMaster" class="uk-table uk-table-striped">
											<thead>
												<tr>
													<th style="width: 200px !important;">
														{{ translate.supplier_name }}
													</th>
													<th>{{ translate.supplier_code }}</th>
													<!-- <th>{{ translate.customer_city }}</th> -->
													<th>{{ translate.supplier_state }}</th>
													<!-- <th>{{ translate.customer_country }}</th> -->
													<!-- <th>{{ translate.customer_zip }}</th> -->
													<!-- <th>{{ translate.customer_contact_person }}</th> -->
													<!-- <th>{{ translate.customer_contact_number }}</th> -->
													<!-- <th>{{ translate.email }}</th> -->
													<!-- <th>{{ translate.gstin }}</th> -->
													<th>{{ translate.supplier_is_active }}</th>
													<th>{{ translate.supplier_currency }}</th>
													<th>{{ translate.supplier_shipvia }}</th>
													<th>{{ translate.supplier_remarks }}</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(cust,index) in customerList" :key="index">
													<td>{{ cust.EvolveSupplier_Name }}</td>
													<td>{{ cust.EvolveSupplier_Code }}</td>
													<!-- <td>{{ cust.EvolveSupplier_City }}</td> -->
													<td>{{ cust.EvolveSupplier_State }}</td>
													<!-- <td>{{ cust.EvolveSupplier_Country }}</td> -->
													<!-- <td>{{ cust.EvolveSupplier_Zip }}</td> -->
													<!-- <td>{{ cust.EvolveSupplier_ContactPerson }}</td> -->
													<!-- <td>{{ cust.EvolveSupplier_Phone }}</td> -->
													<!-- <td>{{ cust.EvolveSupplier_Email }}</td> -->
													<!-- <td>{{ cust.EvolveSupplier_Gstin }}</td> -->
													<td>{{ cust.EvolveSupplier_IsActive }}</td>
													<td>{{ cust.EvolveSupplier_Currency }}</td>
													<td>{{ cust.EvolveSupplier_ShipVia }}</td>
													<td>{{ cust.EvolveSupplier_Remarks }}</td>
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
									</div>
								</client-only>
								<no-ssr>
									<EvolvePDF :reqdata="pdfData"></EvolvePDF>
								</no-ssr>
							</div>
						</div>
					</div>
					<table id="sampleCustData" style="display : none !important">
						<tr>
							<th> {{ translate.supplier_name }}</th>
							<th> {{ translate.supplier_code }}</th>
							<th> {{ translate.supplier_address }}</th>
							<th> {{ translate.supplier_city }}</th>
							<th> {{ translate.supplier_state }}</th>
							<th> {{ translate.supplier_country }}</th>
							<th> {{ translate.email }}</th>
							<th> {{ translate.supplier_zip }}</th>
							<th> {{ translate.supplier_contact_person }}</th>
							<th> {{ translate.supplier_contact_number }}</th>
							<th> {{ translate.gstin }}</th>
						</tr>
						<tr>
							<td> {{ translate.aliter_solutions }}</td>
							<td>{{ translate.alimum }}</td>
							<td> {{ translate.malad_west }}</td>
							<td>{{ translate.mumbai }}</td>
							<td>{{ translate.maharastra }}</td>
							<td>{{ translate.india }}</td>
							<td>supplier@gmail.com</td>
							<td>400064</td>
							<td> {{ translate.vijay_sabarwal }}</td>
							<td>8879389324</td>
							<td>Gst212211</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
.uk-position-top-right{
	top : 24px;
}
</style>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import customValidators from "~/plugins/vuelidateValidators";
import moment from '~/plugins/moment'
if(process.client) {
	require('~/plugins/daterangepicker');
	require('~/plugins/flatpickr');
	var Paginate = require("vuejs-paginate");

}
export default {
	head () {
		return {
			'title': 'Evolve - ' + this.$route.name
		}
	},
	layout: 'eDefault',
	components: {
		Paginate,
		EvolvePDF: process.client
			? () => import("~/components/jspdf/evolvePDF")
			: null,

	},
	 	mixins: [validationMixin],
 

	data () {
		return {
			translate :{
				india : "INDIA",
				supplier_master	:"Supplier Master",
				download_sample	:"Download Sample",
				csv_upload	 : " CSV Upload",
				upload_suppliers	:"Upload Suppliers",
				supplier_name	:"Supplier Name",
				supplier_code	:"Supplier Code",
				supplier_address	:"Supplier Address",
				supplier_city	:"Supplier City",
				supplier_state	:"Supplier State",
				supplier_country	:"Supplier Country",
				supplier_zip	:"Supplier Zip",
				supplier_contact_person	:"Supplier Contact Person",
				supplier_contact_number:	"Supplier Contact Number",
				supplier_is_active : "Is Active",
				supplier_remarks : "Remarks",
				supplier_shipvia : "Ship Via",
				supplier_currency : "Currency",

				aliter_solutions	:"Aliter Solutions",
				alimum	:"ALIMUM",
				malad_west	:"MALAD WEST",
				mumbai	:"MUMBAI",
				maharastra	:"MAHARASTRA",
				vijay_sabarwal	:"Vijay Sabarwal",
				email	:"Email",
				gstin	:"GST IN",
			},
			dateRange : '',
			userId : this.$store.state.auth.user.EvolveUser_ID,
			token : this.$auth.getToken('local'),
			deleteApi : '/api/v1/evolve/MachineMaster/deleteMachineMaster',
			baseURL : this.$axios.defaults.baseURL,

			/** Start : EvolveDataTable */
			search : '', // For making dynamic search
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1, 2, 3, 4, 5],
			pdfExportColums: [0, 1, 2, 3, 4, 5],
			/** End : EvolveDataTable */
			custCsv : '',
			customerList : [],
		
		}
	},
	computed: {
	},
	mounted () {
		this.$root.$on('onChangeLanguage', () =>{
			console.log("Language Changed.....")
			this.translateLanguage()
		});
	},
	beforeDestroy () {
		clearInterval(this.ramUpdateInterval);
	},
	created: async function () {
		this.getCustomerList();	 
		this.removeModal();

	},

	beforeMount (){
		this.translateLanguage()
	},
 
	methods : {
		/** Default Method For All Pages : Start Here */
		translateLanguage : async function () {
			let languageId =  this.$auth.$storage.getLocalStorage('EvolveLanguage_ID');
			if(languageId != undefined){
				const languageTranstale = await this.$axios.$post('/api/v1/evolve/translate', { languageId: languageId, translate : this.translate}).catch(e => { 
				});
				if(languageTranstale){
					let tra = this.translate;
	 				Object.keys(this.translate).forEach(function (key) {
						languageTranstale.result.forEach(function (obj){
							if(obj.EvolvelLabel_KeyWord == key){
								tra[key] = obj.EvolveLabel_Term;
							}
						})
					});
				}
			}
		},
		removeModal: async function (e) {
			$(".uk-modal").remove(); // Remove Old Model From DOM
		},
		async notification (type='danger', timeout=3000, message=''){
			let config = {
				timeout : timeout,
				status : type
			};
			UIkit.notification(message, config);
		},
		// getDate (dt) {
		// 	return this.$moment(dt).format('DD/MM/YYYY')
		// },

		// Datatable 	
		/* Datatable Methods -- Start */
		async onDisplayRecordChange (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getCustomerList();
		},
		async paginateClick (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getCustomerList();
		},

		async downloadPdf () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			// let html = document.getElementById("evolveCustomerMaster").outerHTML;
			let rows = document.querySelectorAll("#evolveSupplier table tr");
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
					title: "Evolve Supplier Master",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "EvolveSupplierMaster",
				},
			};
		},
		async downloadCsv () {
			let filename = "EvolveSupplierMaster";
			let csv = [];
			// let html = document.getElementById("evolveCustomerMaster").outerHTML;
			let rows = document.querySelectorAll("#evolveSupplier table tr");
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
		// dtBasicInitialized () {
		// 	this.$refs.basicTable.$dt.buttons().container().appendTo(document.getElementById('sc-dt-buttons'))
		// },		

		async getCustomerList () {
		
			let getCustomerList =  await this.$axios.$post('/api/v1/evolve/supplierMaster/getSupplierList', {
				displayRecord: this.displayRecord,
				startFrom: this.startFrom,
				search : this.search,
			}).catch(e => { 
				this.notification('danger', 3000, 'Problem with connecting to server!');
			});
			if (getCustomerList) {
				if (getCustomerList.statusCode == 200) {
					this.customerList = getCustomerList.result.records;
					if (getCustomerList.result.noOfRecord > 0) {
						this.pageCount = Math.ceil(
							getCustomerList.result.noOfRecord / this.displayRecord
						);
					}else{
						this.pageCount = 0
					}
				} else {
					this.notification("danger", 3000, getCustomerList.message);
				}
			}
		},
		onInputSearch () {
			this.currentPage = 1;
			this.getCustomerList();
			this.paginateClick(1)
		},
		async downloadSample (){
			var csv = [];
			var rows = document.querySelectorAll("table#sampleCustData tr");
			for (var i = 0; i < rows.length; i++) {
				var row = [];
				var cols = rows[i].querySelectorAll("td, th");	
				for (var j = 0; j < cols.length; j++) 
				{
					row.push(cols[j].innerText);
				}
				csv.push(row.join(","));        
			}

			// Download CSV file
			downloadCSV(csv.join("\n"), 'EvolveCustMaster.csv');
		},

		async handleFileUpload (){
			this.custCsv = this.$refs.csvFile.files[0];
		},
        
		async uploadFile (){
			// this.loaderShow();
			if(this.custCsv != ''){
				let formData = new FormData();
				formData.append('csvFile', this.custCsv);
				const config = { headers: { 'Content-Type': 'multipart/form-data' } };
				let csvUploadData =  await this.$axios.$post('/api/v1/evolve/customerMaster/uploadCustCsv', formData, config).catch(e => { 
					this.notification('danger', 3000, 'Problem with connecting to server!')
				});
				if(csvUploadData){
					if(csvUploadData.statusCode == 200){
						this.notification('success', 3000, "Customer(s) Uploaded");
						this.getCustomerList();	 
					} else {
						this.notification('danger', 3000, csvUploadData.message);
					}
				}
			}else{
				this.notification('danger', 3000,  "File Must Required!")
			}
			// this.loaderHide();
		},


        
	}
}
function downloadCSV (csv, filename) {
	var csvFile;
	var downloadLink;

	// CSV file
	csvFile = new Blob([csv], {type: "text/csv"});

	// Download link
	downloadLink = document.createElement("a");

	// File name
	downloadLink.download = filename;

	// Create a link to the file
	downloadLink.href = window.URL.createObjectURL(csvFile);

	// Hide download link
	downloadLink.style.display = "none";

	// Add the link to DOM
	document.body.appendChild(downloadLink);

	// Click download link
	downloadLink.click();
}
</script>
<style lang="scss">
	@import "assets/scss/plugins/datatables";
	@import '~pretty-checkbox/src/pretty-checkbox.scss';
</style>
