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
		<div class="evolve-page-body">
			<div id="nav-mdi" class="uk-card">
				<div class="uk-card-body min-height-back">
					<!-- <div class="uk-child-width-1-6@m uk-grid" data-uk-grid> -->
					<div class="uk-modal-body">
						<div class="uk-grid" data-uk-grid>
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.type_code }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="$v.menuType.$model"
											mode="outline"
											:placeholder="translate.asn_number"
											name="menuType"
											:error-class="$v.menuType.$error"
											:validator="$v.menuType"
											class="evolve-input"
											tabindex="1"
											autofocus
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.description }} :</label>
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="$v.menuTypeDesc.$model"
											mode="outline"
											:placeholder="translate.asn_number"
											name="menuTypeDesc"
											:error-class="$v.menuTypeDesc.$error"
											:validator="$v.menuTypeDesc"
											class="evolve-input"
											tabindex="1"
											autofocus
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.search_icon }} :  </label> 
									</div>
									<div class="uk-width-1-2@m">
										<ScInput
											v-model="mdIconsSearch"
											mode="outline"
											name="mdIconsSearch"
											class="evolve-input"
											tabindex="1"
											autofocus
											:type="'search'"
											:placeholder="translate.search_here"
										></ScInput>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>

							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.selected_icon }} :  </label> 
									</div>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable"><i :class="slectedMenuIcon"></i></label>
										<!-- <ScInput
											v-model="mdIconsSearch"
											mode="outline"
											name="mdIconsSearch"
											class="evolve-input"
											tabindex="1"
											autofocus
											:type="'search'"
											:placeholder="translate.search_here"
										></ScInput> -->
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>


							<!-- <div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable">{{ translate.selected_icon }} : </label> 
									</div>
									<div class="uk-width-1-2@m">
										<label for="table lable" class="evolve-input-lable"><i :class="slectedMenuIcon"></i></label>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div> -->
							<div class="uk-width-1-1@m">
								<div>
									<div class="icons_selections">
										<div class="uk-child-width-auto uk-flex uk-flex-wrap">
											<div v-for="icon in mdIcons" :key="icon.hex">
												<div
													v-if="icon.visible == true"
													class="uk-flex sc-js-mdi-code sc-el-clickable sc-el-hoverable sc-padding-medium uk-border-rounded"
													:title="icon.name"
													:data-uk-tooltip="icon.name"
													@click="onIconSelections('mdi mdi-'+icon.name)"
												>
													<i class="mdi" :class="'mdi-' + icon.name"></i>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
					
							<div class="uk-width-1-2@m">
								<div class="uk-grid" data-uk-grid>
									<div class="uk-width-1-2@m">
									</div>
									<div class="uk-width-1-2@m">
										<div class="uk-modal-footer uk-margin-top uk-text-right">
											<button
												class="sc-button sc-button-flat sc-button-flat-danger uk-modal-close"
												type="button"
												@click="$destroy() ; $store.dispatch('removeOneTab', '/evolve/menuType/options')"
											>
												{{ translate.cancel }}
											</button>
											<button class="sc-button" type="button" @click="createOrUpateManuType()">
												{{ translate.save }}
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="uk-width-1-2@m">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
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
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import ScInput from "~/components/Input";
if (process.client) {
	require("~/plugins/flatpickr");
	require("~/assets/js/vendor/jquery.quicksearch.js");
}

export default {
	head () {
		return {
			title: "Evolve - " + this.$route.path,
		};
	},

	components: {
		ScInput,
	},
	mixins: [validationMixin],
	props: {
		params: {
			type: Object,
			default: () => {}
		}
	},
	layout: "eDefaultV2",

	data () {
		return {
			translate: {
		
				type_code :"Type Code",
				description :"Description",
				icon :"Icon",
				create_menu :"Create Menu",
				description :"Description",
				search_icon :"Search Icon",
				selected_icon :"Selected Icon",
				search_here : 'Search Here',
				cancel : 'Cancel',
				save : 'Save',

		

			},
			typeIcon : '', 
			baseUrl: this.$axios.defaults.baseURL,
			isImageChanged  : false,
			slectedMenuIcon: "mdi mdi-view-list",
			menuIcon: "view-list",
			mdIconsSearch: "",
			mdIcons: [],
			iconList: [],
			// slectedMenuIcon: "",
			menuType : '',
			menuTypeDesc : '',
			menuTypeId : '',
			pageURL : '/evolve/menuType/options',



			/** Start : EvolveDataTable */
			currentPage: 1,
			pageCount: 0,
			displayRecord: 10,
			noOfRecord: 0,
			startFrom: 0,
			displayRow: [10, 25, 50, 100, 200],
			pdfData: {},
			csvExportColums: [0, 1, 2, 3, 4, 5],
			pdfExportColums: [0, 1, 2, 3, 4, 5],
			search: "",
			/** End : EvolveDataTable */
		};
	},

	computed: {},

	watch: {
		mdIconsSearch (val) {
			this.mdIcons.forEach((icon) => {
				if (val !== "" && val.length > 2) {
					//console.log("icon.name :", icon.name);
					icon.visible = icon.name.toLowerCase().includes(val.toLowerCase());
					//console.log("icon.visible :", icon.visible);
				} else {
					icon.visible = true;
				}
			});
		},
	},

	beforeDestroy () {
		// clearInterval(this.ramUpdateInterval);
	},

	created: async function () {
		this.asyncData();
		this.removeModal();
		this.menuTypeId = this.$route.query.EvolveMenuType_ID;

		console.log(">????? ",  this.menuTypeId)
		// console.log("this.menuTypeId???",  this.menuTypeId)
		if(this.menuTypeId ==  undefined ||  this.menuTypeId ==  '' ){
			this.clearData()
		}else{
			await this.getSingleMenuTypeDetails();
		}
	},
	validations: {
		menuType : {
			required
		},
		menuTypeDesc : {
			required
		}
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

		notification: async function (
			type = "danger",
			timeout = 3000,
			message = ""
		) {
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
			this.getAllAppList();
		},

		paginateClick: async function (pageNum) {
			this.currentPage = pageNum;
			this.startFrom = parseInt(
				pageNum * this.displayRecord - this.displayRecord
			);
			this.getAllAppList();
		},

		onInputSearch: function () {
			this.currentPage = 1;
			this.getAllAppList();
			this.paginateClick(1);
		},

		downloadPdf: function () {
			let header = [];
			let data = [];
			let img = require("~/assets/img/aliter_logo.png");
			let html = document.getElementById("appMaster").outerHTML;
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
					title: "Evolve App Master",
					tableData: {
						header: header,
						data: data,
					},
					fileName: "evolveAppMaster",
				},
			};
		},

		downloadCsv: function () {
			let filename = "evolveAppMaster";
			let csv = [];
			let html = document.getElementById("appMaster").outerHTML;
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

		clearData: async function () {
			this.$v.$reset();
			this.menuTypeId = "";
			this.menuTypeDesc = "";
			this.menuType = "";
		},
		getSingleMenuTypeDetails: async function () {
			// this.newSeqAdd = false;
			let details = await this.$axios
				.$post("/api/v1/evolve/MenuType/getSingleMenuTypeDetails", {
					EvolveMenuType_ID: this.menuTypeId,
				})
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (details.statusCode == 200) {
				this.menuTypeId = details.result.EvolveMenuType_ID;
				this.menuType = details.result.EvolveMenuType_Type;
				this.menuTypeDesc = details.result.EvolveMenuType_Description;
				this.slectedMenuIcon = details.result.EvolveMenuType_Icon;
			} else {
				this.notification("danger", 3000, details.message);
			}
		},
		onIconSelections: async function (iconName) {
			this.slectedMenuIcon = iconName;
		},

		asyncData: async function () {
			let data = require("~/assets/js/utils/mdIcons.js").default;
			//console.log("data :", data);
			this.mdIcons = data;
			return { mdIcons: data };
		},

		getIconList: async function () {
			let responce = await this.$axios
				.$post("/api/v1/evolve/MenuType/getMdiIconLis")
				.catch((e) => {
					this.notification(
						"danger",
						3000,
						"Problem with connecting to server!"
					);
				});
			if (responce) {
				if (responce.statusCode == 200) {
					this.iconList = responce.result;
				} else {
					this.notification("danger", 3000, responce.message);
				}
			}
		},
		createOrUpateManuType: async function () {
			this.$v.$touch();
			if (this.$v.$invalid) {

				this.notification("danger", 3000, "Fill All Required Fileds");

			} else if(this.menuType.length > 18){

				this.notification("danger", 3000, "Menu type  should not be greter than 18 character");

			}else if(this.menuTypeDesc.length > 60){

				this.notification("danger", 3000, "Description  should not be greter than 60 character");

			}else if(this.slectedMenuIcon  == ''){
				this.notification("danger", 3000, "Please Select Icon");
            
			}else{
				let data = {
					EvolveMenuType_Type: this.menuType,
					EvolveMenuType_Description: this.menuTypeDesc,
					EvolveMenuType_Icon: this.slectedMenuIcon,
					EvolveMenuType_ID: this.menuTypeId,

				};
				let createOrEdit 

				if(this.menuTypeId == ''){

					createOrEdit = await this.$axios.$post("/api/v1/evolve/MenuType/createMenuType", data)
						.catch((e) => {
							this.notification(
								"danger",
								3000,
								"Problem With Connecting Server!!"
							);
						});
                    
                    
				}else{
					createOrEdit = await this.$axios.$post("/api/v1/evolve/MenuType/upateMenuType", data)
						.catch((e) => {
							this.notification(
								"danger",
								3000,
								"Problem With Connecting Server!!"
							);
						});
				}

				console.log('createOrEdit.>>>',  createOrEdit)
				if (createOrEdit) {
					if (createOrEdit.statusCode == 200) {
						this.$destroy() ;
						this.$store.dispatch('removeOneTab', '/evolve/menuType/options')

						this.notification("success", 3000, createOrEdit.message);
					} else {
						this.notification("danger", 3000, createOrEdit.message);
					}
				}
            
			}

			// c
		},
	},
};
</script>

<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>