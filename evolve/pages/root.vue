<template>
	<evolve-module>
		<evolve-module-content>
			<!-- Start : EvolveV3TAB -->
			<!-- <div id="evolve_tabs_root">
				<evolve-tabs />
			</div>
			<div id="evolve_tabs_contecnt_root">
				<evolve-tab-content v-if="activeTab" :name="activeTab" />
			</div> -->
			<!-- END : EvolveV3TAB -->
		</evolve-module-content>
		<div v-if="!activeTab" id="root-default">
			<p class="root-title">
				{{ translate.welcome_eap }} <small>({{ translate.eap_version }})</small>
			</p>
			<p class="root-title-details">
				{{ translate.iot_enable_platform }}
			</p>
			{{ $config.EVOLVE_SERVER_URL }}
		</div>
	</evolve-module>
</template>

<script>
 


import { mapGetters, mapState } from 'vuex';

export default {
	name: 'EvolveAutomationPlatform',
	layout: 'default',
	data () {
		return {
			EvolveMenu_Id :this.$route.query.EvolveMenu_Id,		
			translate : {
				welcome_eap : "Welcome to Evolve Automation Platform",
				eap_version : "V2.1.0",
				iot_enable_platform : "IOT Enabled Automation Platform"
			},
		}
	},
	 computed: {
		 
		...mapGetters(['tabs']),
		...mapState(['activeTab'])
	},
	watch: {
		tabs (newTabs) {
			console.log("UPDATE TABS", newTabs);
		}
	},
	beforeMount () {
		this.translateLanguage();
	},
	mounted () {
		this.$root.$on('onChangeLanguage', () =>{
			console.log("Language Changed.....")
			try {
				console.log(this.$config.EVOLVE_SERVER_URL);
			} catch (error) {
				console.log(error);
			}
			
			this.translateLanguage()
		});
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
	}
}
</script>
<style lang="scss" scoped>
#root-default {
    background: white;
    padding: 5%;
    height: 100%;
    text-align: center;
}
 
</style>