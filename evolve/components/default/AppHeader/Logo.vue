<template>
	<div
		title="Evolve Dashbaord"
		class="app-logo"
		@click="handleLogoClick()"
	>
		<img :src="url" :alt="title" class="app-logo-image">
		<h2 class="app-logo-title">
			{{ title }}
		</h2>
	</div>
</template>

<script>
export default {
	name: "AppHeaderLogo",

	props: {
		url: {
			type: String,
			required: true,
		},

		title: {
			type: String,
			default: "Evolve",
		},
	},
	methods: {
		/**
         * Handle app selection
         * @param {MouseEvent} $event
         */
		handleLogoClick () {
			let obj = {
				ID : 0,
				CODE : 0, // 0 meane all apps
				URL : "URL",
			  NAME : "Evolve Apps",
		    ICON : "mdi mdi-format-list-bulleted"
			}
			console.log("handleLogoClick >>>>>", obj);
		  this.$store.commit("changeActiveApp", obj);
			this.$root.$emit('onAppClick', obj);
		}
	}

};
</script>

<style lang="scss">
@import "./index.scss";

.app-logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
 margin-left: 16px;

  @media screen and (max-width: 767px) {
    margin-left: 0;
  }

  .app-logo-image {
    width: auto;
    height: 100%;
    background: #fff;
    border-radius: 50%;
    @media screen and (max-width: 767px) {
      width: 32px;
    }
  }

  .app-logo-title {
    font-size: 22px;
    font-family: sans-serif;

    @media screen and (max-width: 767px) {
     // font-size: 1.3rem;
      margin-left: 2px;
    }
  }
}

@include use-dark {
  .app-logo {
    .app-logo-title {
      color: $fr-dark;
    }
  }
}
</style>