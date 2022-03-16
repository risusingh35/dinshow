<template>
	<div class="my-favourite">
		<div class="fav-header">
			<p>
				<i class="mdi mdi-star md-color-yellow-800" />	<span v-if="!collapsed">Favourite</span>  
			</p>
		</div>
		<div class="my-favourite-list">
			<!-- <ul>
				<li
					v-for="fav in favouriteList" 
					:key="fav.EvolveFavourite_ID"
					class="pointer"
					@click="handleClick(fav.EvolveMenu_Name, fav.EvolveMenu_Url,fav.EvolveMenu_Id)"
				>
					<i class="mdi mdi-star md-color-yellow-600" :class="fav.EvolveMenu_Icon"></i> <span class="">{{ fav.EvolveMenu_Name }}</span>
				</li>
			</ul> -->

			<nav class="menu" :aria-collapsed="false">
				<div
					v-for="fav in favouriteList" 
					:key="fav.EvolveFavourite_ID"
					class="menu-item"
				>
					<div 
						class="menu-item-content" 
						aria-label="menu-item"
						@click="handleClick(fav.EvolveMenu_Name, fav.EvolveMenu_Url,fav.EvolveMenu_Id)"
					>
						<i class="mdi mdi-star md-color-yellow-600" :class="fav.EvolveMenu_Ico" :title="fav.EvolveMenu_Name" aria-label="menu-item"></i>
						<span v-if="!collapsed" class="label" aria-label="menu-item">{{ fav.EvolveMenu_Name }}</span>
					</div>
				</div>
			</nav>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'AppSidebarMyFavourite',
	props: {
		list: {
			type: Array,
			default: function () {
				return []
			}
		},
		collapsed: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			favouriteList : []
		}
	},
	computed: {
		...mapState(['favouriteChange'])
	},
	 watch: {
		 favouriteChange (){
			this.getFavourite();
			 let config = {
				timeout: 3000,
				status: 'success',
			};
			UIkit.notification('Favourite Updated', config);
		 }
		 },
	created: async function () {
		this.getFavourite();
	},
	methods: {
		handleClick (title, url, id) {

			if(!url.startsWith("#")){

				this.$store.dispatch('addNewTab', {
					title, url,
					params: {
						EvolveMenu_Id: id,
						pageTitle : title
					}
				});


				/**  Start : EvolveV3TA */
				// this.$store.dispatch('addNewTab', {
				// 	title, url,
				// 	params: {
				// 		EvolveMenu_Id: id
				// 	}
				// });
				/**  Start : EvolveV3TAB  */
			}
		},
		getFavourite: async function () {
			let  getFavourite = await this.$axios.$post("/api/v1/evolve/getFavourite", {}).catch((e) => {});
			if (getFavourite) {
				if (getFavourite.statusCode == 200) {
					this.favouriteList = getFavourite.result;
					console.log(getFavourite.result);
				}
			}
		},
	}
}
</script>
<style lang="scss" scoped>
@import "./index.scss";

.my-favourite {
    
       height: 300px;
     //  border-top: 1.3px solid #887878;
       
       .fav-header{
            padding: 8px 8px;
            background-color:#d7dde2;
            font-size: 14px;
            margin: 0px;
			height: 19px;
			//border-radius: 0px 12px 12px 0px;
       }
       .my-favourite-list{
		   .menu {
			   height:200px;
		   }
           ul{
               list-style-type:none;
               padding-left: 2px;
           }
            .mdi:before {
                font-size: 15px;
            }
           span{
               font-size: 12px;
               font-family: sans-serif;
           }
       }
}


 
</style>
 