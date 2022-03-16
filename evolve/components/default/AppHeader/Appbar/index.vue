<template>
	<div ref="contextRoot" class="nav-menu-item">
		<!-- Icon group -->
		<div class="icon-group">
			<!-- <nuxt-link
				v-if="activeApp"
				id="app-active-app-selector-button"
				tag="a"
				:to="activeApp.EvolveApp_Url"
				:data-active-app-id="activeApp.EvolveApp_ID"
				:data-active-app-code="activeApp.EvolveApp_Code"
				:data-active-app-current-version="activeApp.EvolveApp_Current_Version"
				:data-active-app-previos-version="activeApp.EvolveApp_Previous_Version"
				:data-active-app-seq="activeApp.EvolveApp_SEQ"
				:data-active-app-status="activeApp.EvolveApp_Status"
				:title="activeApp.EvolveApp_Description"
				class="active-app hide-mobile"
			> -->
			<div id="app-active-app-selector-button"
				tag="a"
				class="active-app hide-mobile"
			>
				<i
					:data-app-icon="activeApp.ICON"
					:class="activeApp.ICON"
					style="color: #FFF;"
				></i>
				<!-- activeApp.EvolveApp_Name || -->
				<!-- <app-icon name="widgets" color="inherit" size="20px" />  -->
			 
				<span class="label">{{ activeApp.NAME }}</span>
			</div>
			<!-- </nuxt-link> -->

			<app-icon-button
				id="app-app-selector-button"
				icon="apps"
				tooltip="Apps"
				:fill="viewContext | useActive"
				:active="viewContext"
				@click="handleIconAction"
			/>  
		</div>

		<!-- Context -->
		<app-appbar-context v-if="viewContext" @select="handleAppSelection" />
	</div>
</template>

<script>
import AppbarContext from "./Context";
import SkippableContext from "~/mixins/skippable-context";
import { mapGetters } from "vuex";

export default {
	name: "AppHeaderAppbar",

	components: {
		"app-appbar-context": AppbarContext,
	},
	mixins: [SkippableContext],

	computed: mapGetters(["activeApp"]),

	methods: {
		handleAppSelection () {
			// Clear menu search input
			const searchInputElement = document.getElementById(
				"app-sidebar-menu-search-bar"
			);
			if (searchInputElement instanceof Element) {
				searchInputElement.value = "";
			}

			this.hideContext();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../index.scss";

@media screen and (min-width: 767px) {
  .icon-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-width: 1px;
    border-style: solid;
    border-color: $stroke-1;
    background-color: $bg-1;
    height: 35px;
    border-radius: 50px;

    .active-app {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 28px;
      border-radius: inherit;
      margin-left: 8px;
      padding-left: 1rem;
      padding-right: 1rem;
      background-color: $primary;
      color: $primary-fr !important;
      transition: background-color 120ms linear;

      @media screen and (max-width: 767px) {
        display: none;
      }

      .mdi::before {
        font-size: 14px;
      }

      .label {
        margin-left: 3px;
        font-size: 12px;
    	font-family: sans-serif;
        @media screen and (max-width: 1016px) {
          display: none;
        }
      }

      &:hover {
        background-color: $primary-darken;
      }
    }

    .app-icon-button {
      width: 35px !important;
      height: 35px !important;
    }
  }

  @include use-dark {
    .icon-group {
      border-color: $stroke-dark-2;
      background-color: $bg-dark-3;
    }
  }
}
</style>