<template>
	<div id="sc-page-wrapper" class="uk-flex uk-flex-column">
		<client-only>
			<div class="sc-error-page">
				<div class="uk-flex uk-flex-center uk-height-1-1">
					<div class="uk-width-1-2@l uk-width-2-3@m">
						<!-- <div v-if="error.statusCode === 404">
							<h1 class="sc-error-title sc-padding-large">
								<i class="mdi mdi-alert-outline"></i>
								ERROR 404
							</h1>
							<div class="sc-padding-large">
								<p>
									The requested URL
									<span class="md-color-red-800">{{ $route.path }}</span> was not found on this server.
								</p>
								<nuxt-link to="/">
									Go To Evolve Home Page
								</nuxt-link>
							</div>
            </div>-->
						<div>
							<h1 class="sc-error-title sc-padding-large">
								<i class="mdi mdi-alert-outline"></i>
								ERROR - 500
							</h1>
							<div class="sc-padding-large">
								<p class="sc-text-semibold">
									Oops! Something went wrong&hellip;
								</p>
								<p>There was an error. Please try again later.</p>
								<nuxt-link to="/root">
									Go To Evolve Home Page
								</nuxt-link>
							</div>
						</div>
						<!-- <div>
							<h1 class="sc-error-title sc-padding-large">
								<i class="mdi mdi-alert-outline"></i>
								An error occurred
							</h1>
							<div class="sc-padding-large">
								<nuxt-link to="/">
									Go To Evolve Home Page
								</nuxt-link>
							</div>
            </div>-->
					</div>
				</div>
			</div>
		</client-only>
	</div>
</template>
<style>
</style>
<script>
export default {
	head () {
		return {
			title: "Evolve - " + this.$route.name,
		};
	},
	components: {},
	props: {
		// error: {
		// 	type: Object,
		// 	default: () => {},
		// },
		// statusCode: {
		// 	type: String,
		// 	default: "400",
		// },
	},
	layout: "eDefaultV2",
	data () {
		return {
			EvolveMenu_Id :this.$route.query.EvolveMenu_Id, };
	},
	computed: {},
	mounted () {},
	beforeDestroy () {},
	created: async function () {},

	beforeMount () {},

	methods: {},
};
</script>
<style lang="scss">
</style>