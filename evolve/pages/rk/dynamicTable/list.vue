<template>
	<div id="sc-page-wrapper" class="uk-flex uk-flex-column">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<a
					class="sc-actions-icon mdi mdi-refresh md-color-light-green-600"
					@click="refreshPage()"
				></a>
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"
				></a>
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-window-minimize"
				></a>
			</div>

			<div v-if="EvolveMenu_Id" class="evolve-page-header-icons">
				<a
					href="javascript:void(0)"
					data-uk-tooltip="title: Add To Favourite; pos: right"
					class="sc-actions-icon mdi mdi-star md-color-yellow-600"
					@click="$store.dispatch('addToFavouriteClick', EvolveMenu_Id)"
				></a>
			</div>
			<div class="evolve-page-header-icons evolve-float-right">
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-close-box md-color-red-600"
					@click="$store.dispatch('removeOneTab', pageURL)"
				></a>
			</div>

			<div class="evolve-page-header-icons evolve-float-right">
				<button
					class="sc-button sc-button-mini header-button-evolve"
					type="button"
					@click="onCreateOrEdit('')"
				>
					{{ translate.create }}
				</button>
			</div>

			<div class="evolve-page-header-icons evolve-float-right">
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-file-excel md-color-indigo-600"
					@click="downloadCsv()"
				></a>
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-file-pdf md-color-red-600"
					@click="downloadPdf()"
				></a>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	head () {
		return {
			title: "Evolve - " + this.$route.name,
		};
	},
	layout: "eDefault",
	data () {
		return {
			EvolveMenu_Id: this.$route.query.EvolveMenu_Id,
			pageURL: "/rk/dynamicTable/list",
			translate: {
				create: "Create",
				action: "Action",
				cancel: "Cancel",
				save: "Save",
				search_here: "Search Here",
			},
		};
	},
	computed: {},
	beforeMount () {},
	mounted () {},
	beforeDestroy () {},
	created: async function () {},

	methods: {
        		refreshPage: async function () {
			this.removeModal();
			this.isCalling = true;
			this.getList();
		},
		onCreateOrEdit: async function (PR_ID) {
			//this.$root.$emit("onCloseTabCalled", '/evolve/menus/options');
			// this.$store.dispatch('removeOneTab', '/evolve/menus/options')
			if (PR_ID != "") {
				this.$store.dispatch("addNewTab", {
					title: "Update",
					url: "/rk/dynamicTable/option",
					params: {
						PR_ID: PR_ID,
					},
				});
			} else {
				this.$store.dispatch("addNewTab", {
					title: "Create",
					url: "/rk/dynamicTable/option",
				});
			}
		},
	},
};
</script>
<style lang="scss">
@import "assets/scss/plugins/datatables";
@import "~pretty-checkbox/src/pretty-checkbox.scss";
</style>