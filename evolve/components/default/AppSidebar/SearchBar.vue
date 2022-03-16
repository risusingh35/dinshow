<template>
	<div class="search-bar">
		<label for="app-sidebar-menu-search-bar" class="material-icons icon">search</label>  
		 
		<input 
			id="app-sidebar-menu-search-bar" 
			v-model="search" 
			type="search" 
			placeholder="Search menu"
			class="menu-search-bar"
			spellcheck="off"
			autocomplete="off"
			@input="handleSearchInput"
		>
	</div>
</template>

<script>
export default {
	name: 'AppSidebarSearch',

	data () {
		return {

			/**
             * Search value
             * @type {string}
             */
			search: ''
		}
	},

	methods: {
		/**
         * Handle key press event
         * @description Emit the 'searchinput' event
         * @param {InputEvent} event - Event
         */
		handleSearchInput (event) {
			const value = this.search;
            
			this.$emit('searchinput', value, event);
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

.search-bar {
    display: flex;
     width: 100%;
     padding-left: 24px;
     padding-top: 12px 1rem;
    //padding: 7px 6px 6px 3px;
    margin-bottom: 15px;
    margin-top: 15px;
    .icon {
        padding-left: 10px;
        padding-right: 10px;
        font-size: 18px;
        color: $gray-600;
    }

    .menu-search-bar {
        border: none;
        outline: none;
        // width: 100% ;
        &::placeholder {
            color: $fr-4;
        }
    }
}

@include use-dark {
    .search-bar {
        .icon {
            color: $fr-dark-4;
        }

        .menu-search-bar {
            background-color: transparent;
            color: inherit;

            &::placeholder {
                color: $fr-dark-4;
            }
        }
    }
}
</style>