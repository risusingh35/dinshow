<template>
	<div class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<a class="sc-actions-icon mdi mdi-refresh  md-color-light-green-600"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"></a> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi  mdi-window-minimize"></a>
			</div>
			<div class="evolve-page-header-icons evolve-float-right"> 
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-close-box md-color-red-600" @click="$store.dispatch('removeOneTab', pageURL)"></a>
			</div>
			<!-- <div class="evolve-page-header-icons evolve-float-right">
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-excel md-color-indigo-600" @click="downloadCsv()"></a>
				<a href="javascript:void(0)" class="sc-actions-icon mdi mdi-file-pdf md-color-red-600" @click="downloadPdf()"></a>
			</div> -->
		</div>
		<client-only>
			<div id="sc-page-content" class="evolve-page-body">
				<div class="uk-grid" data-uk-grid>
					<div v-for="obj in listData" :key="'99'+obj.EvolvePageFields_ID" class="uk-width-1-3@m">
						<div class="uk-grid" data-uk-grid>
							<div class="uk-width-1-2@m">
								<label for="table lable" class="evolve-input-lable" data-uk-tooltip="title: test; delay: 500">{{ obj.EvolvePageFields_Label }} :</label>
							</div>
							<div class="uk-width-1-2@m">
								<span v-if="obj.EvolvePageFields_InputType == 'SELECT'"> 
									<select v-model="pageData[obj.EvolvePageFields_Code]">
										<option 
											v-for="ss in obj.option"
											:key="ss.keys"
											:value="ss.value"
										>
											{{ ss.label }}</option>
									</select>
									
								</span>
								<span v-if="obj.EvolvePageFields_InputType == 'INPUT'"> 
									<input v-model="pageData[obj.EvolvePageFields_Code]" type="text" class="uk-input evolve-input ">
								</span>
								<span v-if="obj.EvolvePageFields_InputType == 'NUMBER'"> 
									<input v-model="pageData[obj.EvolvePageFields_Code]" type="number" class="uk-input evolve-input ">
								</span>
								<span v-if="obj.EvolvePageFields_InputType == 'CHECKBOX'"> 
									<input v-model="pageData[obj.EvolvePageFields_Code]"
										type="checkbox"
									>
								</span>
								<span v-if="obj.EvolvePageFields_InputType == 'TEXTAREA'"> 
									<textarea v-model="pageData[obj.EvolvePageFields_Code]" class="evolve-textarea" rows="3"></textarea>
								</span>
								<span v-if="obj.EvolvePageFields_InputType == 'DATE'"> 
									<ScInput 
										v-model="pageData[obj.EvolvePageFields_Code]"
										v-flatpickr="{ 'altInput': true, 'altFormat': 'Y-m-d' }" 
										placeholder="Pick a date..."
										mode="outline"
									></ScInput>
								</span>
							</div>
						</div>
					</div>
				</div>
				<div class="uk-grid" data-uk-grid>
					<div class="uk-width-1-3@m">
					</div>
					<div class="uk-width-1-3@m">
					</div>
					<div class="uk-width-1-3@m">
						<div class="uk-grid" data-uk-grid>
							<div class="uk-width-1-2@m">
							</div>
							<div class="uk-width-1-2@m">
								<button class="sc-button uk-margin-small-right" type="button" @click="saveOrUpdateData()">
									{{ isEdit == "true" ? 'UPDATE' : 'SAVE' }}
								</button>
								<button class="sc-button uk-margin-small-right" type="button">
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</client-only>
	</div>
</template>

<style>
.icons_selections {
  height: 200px !important;
  overflow: auto;
}
</style>

<script>
import { validationMixin } from "vuelidate";
import ScInput from "~/components/Input";

if (process.client) {
	// // require(~/plugins/daterangepicker);
	require("~/plugins/flatpickr");
	require("~/assets/js/vendor/jquery.quicksearch.js");
	// var Paginate = require("vuejs-paginate");
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
		// Paginate,
		// EvolvePDF: process.client
		// 	? () => import("~/components/jspdf/evolvePDF")
		// 	: null,
		// Select2: process.client ? () => import("~/components/Select2") : null,
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
				field_name : "Field Name",
				value : "Value"
			},

			EvolveMenu_Id :this.$route.query.EvolveMenu_Id,

			baseUrl: this.$axios.defaults.baseURL,
			pageURL : '/common/pageList/options',
			/** Start : EvolveDataTable */
			pdfData: {},
			csvExportColums: [0, 1],
			pdfExportColums: [0, 1],
			/** End : EvolveDataTable */

			rujul : true,
			listData : [],
			pageDetails : {},
			pageData : {},
			isEdit : false,
		};
	},

	computed: {},

	watch: {
	},

	beforeDestroy () {
		// clearInterval(this.ramUpdateInterval);
	},

	created: async function () {
		console.log("rujul>>>>>>.", this.rujul);
		this.removeModal();
		this.setDataForPage(this.$route.query);
	},
	validations: {
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
	beforeMount () {
		this.translateLanguage();
		// let vm = this;
		// vm.homeAddress = { ...vm.$store.state.deliveryAddress.home };
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
					// Object.keys(this.translate).forEach(function (key) {
					// 	languageTranstale.result.forEach(function (obj) {
					// 		if (obj.EvolvelLabel_KeyWord == key) {
					// 			tra[key] = obj.EvolveLabel_Term;
					// 		}
					// 	});
					// });
				}
			}
		},

		removeModal: async function (e) {
			$(".uk-modal").remove(); // Remove Old Model From DOM
		},

		notification: async function (type = "danger", timeout = 3000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},
		// defult evolve functions end

		/* Datatable Methods -- Start */
		onDisplayRecordChange: async function (displayRecord) {
			this.startFrom = parseInt(
				this.currentPage * this.displayRecord - this.displayRecord
			);
			this.getProjectList();
		},

		paginateClick: async function (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getProjectList();
		},

		onInputSearch: function () {
			this.currentPage = 1;
			this.getProjectList();
			this.paginateClick(1);
		},

		downloadPdf: function () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("pageDataViewTable").outerHTML;
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
					title: "EvolvePageRowData",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "EvolvePageRowData",
				},
			};
		},

		downloadCsv: function () {
			let filename = "EvolvePageRowData";
			let csv = [];
			let html = document.getElementById("pageDataViewTable").outerHTML;
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

		setDataForPage : async function (data) {
			try {
				this.pageData = data.rowData;
				this.listData = data.columnList;
				this.pageDetails = data.pageDetails
				this.isEdit = data.isEdit
				console.log("this.isEdit>>>>>>>>.", this.isEdit);
				console.log("data>>>>>>>>>>>>>>>>", data);
				console.log("this.listData>>>>>>>>>>>", this.listData);
				
			} catch (error) {
				this.notification("danger", 3000, "Error While Set Data For Page !!");
			}
		},

		saveOrUpdateData : async function () {
			try {
				let validationError = false;
				let validationErrorMessage = "";
				for(let i = 0 ; i < this.listData.length ; i++) {
					if(this.listData[i].EvolvePageFields_Required == true) {
						if(this.pageData[this.listData[i].EvolvePageFields_Code] == '' || this.pageData[this.listData[i].EvolvePageFields_Code] == undefined || this.pageData[this.listData[i].EvolvePageFields_Code] == 'undefined'){
							validationError = true;
							validationErrorMessage = validationErrorMessage + ` ${this.listData[i].EvolvePageFields_Label} Is Required!!`
						}
					}
				}
				if(validationError == true) {
					this.notification("danger", 3000, validationErrorMessage);
				}else {
					console.log("this.isEdit>>>>>>>>>>>>>>>", this.isEdit);
					if(this.isEdit == "true") {
						console.log("come in true>>>>>>>>>>>..");
						let updatePageData = await this.$axios.$post("/api/v1/Common/pageList/updatePageData", {
							pageDtails : this.pageDetails,
							columnList : this.listData,
							rowData : this.pageData
						}).catch((e) => { this.notification("danger", 3000, "Problem With Connecting Server!!");
						});
						if (updatePageData.statusCode == 200) {
							this.$root.$emit("onCloseTabCalled", this.pageURL);
							this.$store.dispatch('removeOneTab', this.pageURL);
							this.notification("success", 3000, 'Data Updated Successfully!!');
						} else {
							this.notification("danger", 3000, updatePageData.message);
						}
					}else {
						console.log("come in else>>>>>>>>.", this.isEdit);
						let addPageData = await this.$axios.$post("/api/v1/Common/pageList/addPageData", {
							pageDtails : this.pageDetails,
							columnList : this.listData,
							rowData : this.pageData
						}).catch((e) => { this.notification("danger", 3000, "Problem With Connecting Server!!");
						});
						if (addPageData.statusCode == 200) {
							this.$root.$emit("onCloseTabCalled", this.pageURL);
							this.$store.dispatch('removeOneTab', this.pageURL);
							this.notification("success", 3000, 'Data Added Successfully!!');
						} else {
							this.notification("danger", 3000, addPageData.message);
						}
					}
				}
			} catch (error) {
				this.notification("danger", 3000, `Error While ${this.isEdit == true ? 'Update' : 'Save'} Data !!`);
			}
		}



	},
};
</script>

<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
