<template>
	<div class="nav-menu-item">
		<!-- Icon -->
		<app-icon-button 
			id="app-language-select-button"
			icon="translate" 
			tooltip="Languages" 
			:fill="viewContext | useActive"
			:active="viewContext"
			@click="showContext"
		/>

		<!-- Context -->
		<app-header-translate-context 
			v-if="viewContext" 
			:languages="lanaguages"
			@close="hideContext"
		/>
	</div>
</template>

<script>
 
import TranslateContext from './Context';
import SkippableContext from '~/mixins/skippable-context';

export default {
	name: 'AppHeaderTranslate',
	components: {
		'app-header-translate-context': TranslateContext
	},
	mixins: [SkippableContext],

	data () {
		return {
			selectedCountry: {
				EvolveCountry_ID: 1,
				EvolveCountry_Name: "ind",
				EvolveCountry_Flag: require("~/assets/icons/flags/countries/in.png"),
			},
			selectedLanguage: {
				EvolveLanguage_ID: 1,
				EvolveLanguage_Code: "en",
				EvolveLanguage_Title: "English",
			},

			countries: [
				{
					EvolveCountry_ID: 1,
					EvolveCountry_Name: "ind",
					EvolveCountry_Flag: require("~/assets/icons/flags/countries/in.png"),
				},
			],
			lanaguages: [
				{
					EvolveCountry_ID: 1,
					EvolveLanguage_Code: "en",
					EvolveLanguage_Title: "English",
				},
			],
		 
		}
	},
	computed: {
 
 
	},
	created: async function () {
 
		let lanaguages = await this.$axios
			.$post("/api/v1/evolve/language") // , { EvolveCountry_ID: EvolveCountry_ID }
			.catch((e) => {});
		if (lanaguages) {
			let languageList = [];
			for (let i = 0; i < lanaguages.result.length; i++) {
				languageList.push({
					EvolveLanguage_ID: lanaguages.result[i].EvolveLanguage_ID,
					EvolveCountry_ID: lanaguages.result[i].EvolveCountry_ID,
					EvolveLanguage_Code: lanaguages.result[i].EvolveLanguage_Code,
					EvolveLanguage_Title: lanaguages.result[i].EvolveLanguage_Title,
					EvolveLanguage_Directory: require("~/assets/icons/flags/countries/"+lanaguages.result[i].EvolveLanguage_Directory),
				});
			}
			this.lanaguages = languageList;
		}
	},
	methods: {
	 
		handleUnitSwitchAction (event) {
			// Change Unit 
			console.log("######>>>>>", event.target.value);

			//this.$store.dispatch('setActiveTab', event.target.value);
		}
	}
}
</script>
