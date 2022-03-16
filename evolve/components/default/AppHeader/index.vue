<template>
	<div id="app-header" ref="header">
		<!-- Container -->
		<div class="app-header-container">
			<!-- App sidebar toggler -->
			<app-icon-button 
				id="app-mobile-sidebar-toggler" 
				:icon="mobileSidebarTogglerIcon"
				@click="handleMobileSidebarToggleAction"
			/>

			<!-- <div class="aria-left"> -->
			<!-- App header logo -->
			<app-header-logo :url="logo" />

			<!-- App finder invoker -->
			<!-- <app-header-fake-search-bar @click="handleSearchAction" />  -->

			<!-- -->
			<app-evolve-bar />
			<!--</div> -->

			<!-- App navigation bar -->
			<nav class="app-header-navmenu">
				<!-- Theme toggler -->
				<app-header-theme-toggler />  

				<!-- Screen resizer -->
				<app-header-screen-resizer /> 

				<!-- Focused mode -->
				<app-header-focused-mode class="hide-mobile" /> 

				<!-- For choose language -->
				<app-header-translate />

				<!-- App notifications -->
				<app-header-notifications />

				<!-- Apps by evolve -->
				<app-header-appbar /> 

				<!-- User profile -->
				<app-header-user-profile />
			</nav>
		</div>
		<!-- End app-header-container -->
	</div>
</template>

<script>
import AppLogo from './Logo.vue';
// import AppFakeSearchBar from './FakeSearchBar.vue';
import AppHeaderAppbar from './Appbar';
import AppUserProfile from './UserProfile';
import AppNotifications from './Notifications';
import AppTranslate from './Translate';
import AppEvolveBar from './EvolveBar';
import AppThemeToggler from './ThemeToggler';
import AppScreenResizer from './ScreenResizer';
import AppFocusedMode from './FocusedMode';
import { mapActions, mapState } from "vuex";

export default {
	name: 'AppHeader',

	components: {
		'app-header-logo': AppLogo,
		// 'app-header-fake-search-bar': AppFakeSearchBar,
		'app-header-appbar': AppHeaderAppbar,
		'app-header-user-profile': AppUserProfile,
		'app-header-notifications': AppNotifications,
		'app-header-translate': AppTranslate,
		'app-evolve-bar':AppEvolveBar,
		'app-header-theme-toggler': AppThemeToggler,
		'app-header-screen-resizer': AppScreenResizer,
		'app-header-focused-mode': AppFocusedMode
	},

	filters: {
		useActive (val) {
			if (val === true) {
				return 'primary';
			}
			return undefined;
		}
	},

	props: {
		logo: {
			type: String,
			required: true
		}
	},

	

	data () {
		return {
			appTitle: 'Evolve',
			mobileSidebarTogglerIcon: 'menu'
		}
	},
	computed: mapState(["collapsedSidebar"]),
	watch: {
		"collapsedSidebar" (newState) {
			let icon;

			if (newState=== true) {
				icon = 'menu'
			}
			else {
				icon = 'close';
			}

			this.mobileSidebarTogglerIcon = icon;
		}
	},

	methods: {
		...mapActions(['toggleSidebar']),
    
		handleSearchAction (event) {
			this.$emit('triggersearch', event);
		},
		handleMobileSidebarToggleAction () {
			this.toggleSidebar();
		}
	}
}
</script>

<style lang="scss">
@import './index.scss';

#app-header {

     display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 55px;
    z-index: 500;
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    box-shadow: 0 2px 12px #ddd;
    transition: background-color .12s linear,box-shadow 80ms ease;

   /*  display: flex;
    // flex-direction: column;
    // position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 30px;
    z-index: 500;
    // border-bottom-left-radius: 24px;
    // border-bottom-right-radius: 24px;
    border-width: 2px;
    border-style: solid;
    border-color: #000000; // $stroke-1;
    background-color:#1565c0;// $bg;
    box-shadow: 0 2px 12px #DDD;
    transition: background-color 120ms linear, box-shadow 80ms ease; */

    @media screen and (max-width: 767px) {
        height: 60px;
    }

    .app-header-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: inherit;
        height: inherit;

		.aria-left {
			width: auto;
			display: flex;
			height: inherit;
		}

        #app-mobile-sidebar-toggler {
			  	display: none;
            margin-left: 1rem;

    			@media screen and (max-width: 767px) {
					 display: flex;
				}
        }
    }

    .extended-bar {
        position: relative;
    }

    .app-header-navmenu {
        margin-right: 1.3rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

        @media screen and (max-width: 767px) {
            justify-content: space-evenly;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            border-top-width: 1px;
            border-top-style: solid;
            border-top-color: $stroke-1;
            background-color: $bg;
        }
    }
}

@include use-dark {
    #app-header {
        border-bottom-color: $stroke-dark-1;
        background-color: #1565c0; // $bg-dark-2;
        box-shadow: none;

        &:hover {
            box-shadow: none;
        }

        .app-header-navmenu {
            @media screen and (max-width: 767px) {
                border-top-color: $stroke-dark-1;
                background-color: $bg-dark;
            }
        }
    }
}
</style>