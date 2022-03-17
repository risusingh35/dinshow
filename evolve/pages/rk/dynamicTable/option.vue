<template>
	<div id="sc-page-wrapper" class="uk-flex uk-flex-column">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons evolve-float-right">
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-close-box md-color-red-600"
					@click="$store.dispatch('removeOneTab', pageURL)"
				></a>
			</div>
		</div>
		<div id="sc-page-content ">
			<client-only>
				<div id="nav-mdi" class="uk-card">
					<div class="uk-card-body min-height-back">
						<div class="uk-child-width-1-4@m uk-grid" data-uk-grid>
							<div>
								<label for="">{{ translate.user_name }} </label>
								<ScInput
									v-model="$v.userName.$model"
									mode="outline"
									:error-class="$v.userName.$error"
									:validator="$v.userName"
									name="userName"
									:placeholder="translate.user_name"
								></ScInput>
							</div>
							<div>
								<label for="">{{ translate.user_age }} </label>
								<ScInput
									v-model="$v.userAge.$model"
									mode="outline"
									:error-class="$v.userAge.$error"
									:validator="$v.userAge"
									name="userAge"
									type="number"
									:placeholder="translate.user_age"
								></ScInput>
							</div>
							<div>
								<label for="">{{ translate.select_db_table }}</label>
								<Select2
									v-model="$v.selectedTable.$model"
									mode="outline"
									:error-class="$v.selectedTable.$error"
									:validator="$v.selectedTable"
									:settings="{
										width: '100%',
										placeholder: translate.select_db_table,
										allowClear: true,
									}"
									name="endUserId"
								>
									<option key="" value="" selected>
										{{ translate.select_db_table }}
									</option>
									<option v-for="(table, i) in dbTableList" :key="i" :value="i">
										{{ table }}
									</option>
								</Select2>
							</div>
						</div>
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
									@click="onCreateOrEdit($event)"
								>
									{{ translate.save }}
								</button>
							</center>
						</div>
					</div>
				</div>
			</client-only>
		</div>
	</div>
</template>
<script>
import ScInput from "~/components/Input";
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
export default {
	head () {
		return {
			title: "Evolve - " + this.$route.name,
		};
	},
	layout: "eDefault",
	components: {
		ScInput,
		Select2: process.client ? () => import("~/components/Select2") : null,
	},
	mixins: [validationMixin],
	data () {
		return {
			EvolveMenu_Id: this.$route.query.EvolveMenu_Id,
			pageURL: "/rk/dynamicTable/option",
			translate: {
				create: "Create",
				action: "Action",
				cancel: "Cancel",
				save: "Save",
				search_here: "Search Here",
				user_name: "User Name",
				user_age: "User Age",
				select_db_table: "Select DB Table",
			},
			userName: "",
			userAge: "",
			selectedTable: "",
			dbTableList: ["User", "Admin", "Other"],
		};
	},
	computed: {},
	beforeMount () {},
	mounted () {},
	beforeDestroy () {},
	created: async function () {},
	validations: {
		userName: {
			required,
		},
		userAge: {
			required,
		},
		selectedTable: {
			required,
		},
	},

	methods: {
		async notification (type = "danger", timeout = 3000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},
		refreshPage: async function () {
			this.removeModal();
			this.isCalling = true;
			this.getList();
		},
		onCreateOrEdit: async function (e) {
			if (this.$v.$invalid) {
				// this.notification("success", 3000, "Success-green ");
				this.notification("danger", 3000, "Please Field All Required fields");
				// this.notification("", 5000, "blank(default)-dark");
				// this.notification("secondary", 6000, "secondary");
				// this.notification("primary", 6000, "primary");
			} else {
				// console.log(	this.userName,
				// 	this.userAge,
				// 	this.selectedTable);
				// let saveList=await this.$axios.$post('/api/v1/rk/dynamicTable/saveList', {
				// 	EvolveUserName:this.userName,
				// 	EvolveUseAge:this.userAge,
				// 	tableName:this.selectedTable
				// }).catch((e)=>{
				// 	this.notification(
				// 		"danger",
				// 		3000,
				// 		"Problem with connecting to server!"
				// 	);
				// })
				// this.notification("danger", 3000, "Please Add Line Details");
			}
		},
	},
};
</script>
<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>