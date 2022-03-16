<template>
	<div id="evolve-selection-bar">
		<!-- <div data-uk-form-custom="target: > * > span:first-child">
			<b> Scale :</b>
			<select>
				<option value="1">
					Option 01
				</option>
				<option value="2">
					Option 02
				</option>
				<option value="3">
					Option 03
				</option>
				<option value="4">
					Option 04
				</option>
			</select>
			<button class="  sc-button-outline" type="button">
				<span></span>
				<span data-uk-icon="icon: chevron-down"></span>
			</button>
		</div> -->
		 
		<!-- <div data-uk-form-custom="target: > * > span:first-child">
			<b>Label :</b>	<select>
				<option value="1">
					Option 01
				</option>
				<option value="2">
					Option 02
				</option>
				<option value="3">
					Option 03
				</option>
				<option value="4">
					Option 04
				</option>
			</select>
			<button class=" sc-button-outline" type="button">
				<span></span>
				<span data-uk-icon="icon: chevron-down"></span>
			</button>
		</div> -->
		<div class="evolve-unit-bar">
			<select @change="handleUnitSwitchAction($event)">
				<option	v-for="usr in userUnitList" 
					:key="usr.EvolveUnit_ID"
					:value="usr.EvolveUnit_ID"
					:selected="user.EvolveUnit_ID == usr.EvolveUnit_ID" 
				>
					{{ usr.EvolveCompany_Code }} - {{ usr.EvolveUnit_Code }}
				</option>
			</select>
			<!--  data-uk-form-custom="target: > * > span:first-child" <button class="sc-button-outline" type="button" style="width: 165px;">
				<span></span>
				<span data-uk-icon="icon: chevron-down"></span>
			</button> -->
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
 
 

export default {
	name: 'EvolveBar',
	computed: {
		...mapGetters(['userUnitList', 'userCompanyList' ] ),
		user () {
			return this.$auth.$state.user;
		},
 
	},
	// eslint-disable-next-line vue/order-in-components
	components: {
		 
	},
	// eslint-disable-next-line vue/order-in-components
	mixins: [],
	// eslint-disable-next-line vue/order-in-components
	data () {
		return {
		}
	},



	created: async function () {
	 
	},
	methods: {
	 
		handleUnitSwitchAction (event) {
			let changeunitDetails = this.$axios.$post('/api/v1/evolve/changeUserUnit', {

				EvolveUnit_ID : event.target.value

			}).catch(e => { 
			});	
		},
	}
}
</script>
<style lang="scss" scoped>
#evolve-selection-bar {
	display: flex;
	flex-direction: row;
	    width: auto;
		margin-left: 130px;

		[data-uk-form-custom] {
			display: inherit;
			height: 100%;
			align-items: center;
		}

		.evolve-unit-bar{
			float: right;
		}
}
</style>