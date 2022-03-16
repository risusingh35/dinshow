<template>
	<div class="app-fake-search-bar" @click="handleSearchAction">
		<!-- For medium or large screen -->
		<div class="search-input-container">
			<i class="material-icons icon">search</i>
			<span class="hint">{{ hint }}</span>
			<span class="trigger-key-hint"><small>/</small></span>
		</div>

		<!-- For small screen -->
		<div class="search-target-button">
			<app-icon-button icon="search" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'AppHeaderFakeSearchBar',

	props: {
		hint: {
			type: String,
			default: 'Search here'
		}
	},

	methods: {
        
		/**
         * Handle search action
         * @description Emits 'click' event
         * @param {object} event - Event
         */
		handleSearchAction (event) {
			this.$emit('click', event);
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

.app-fake-search-bar {

    .search-input-container {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 240px;
        background-color: $bg-1;
        border-width: 1px;
        border-style: solid;
        border-color: $stroke-1;
        height: 35px;
        padding-left: 16px;
        padding-right: 16px;
        border-radius: 8px;
        transition: background-color 80ms linear;
        cursor: pointer;

        @media screen and (max-width: 767px) {
            display: none;
        }

        &:hover {
            background-color: $bg-2;
        }

        .icon {
            vertical-align: middle;
            font-size: 18px;
            color: $fr-4;
        }

        .hint {
            font-size: 14px;
            margin-left: 12px;
            color: $fr-4;
        }

        .trigger-key-hint {
            position: absolute;
            display: inline-block;
            right: 8px;
            top: 50%;
            width: 1em;
            border-radius: 4px;
            text-align: center;
            transform: translateY(-50%);
            border-width: 1px;
            border-style: solid;
            border-color: $stroke-1;
            color: $fr-3;
        }
    }

    .search-target-button {
        margin-right: 1rem;
    
        @media screen and (min-width: 767px) {
            display: none;
        }
    }
} 

@include use-dark {
    .app-fake-search-bar {
        .search-input-container {
            border-color: $stroke-dark-2;
            background-color: $bg-dark-3;

            &:hover {
                background-color: $bg-dark-2;
            }

            .icon,
            .hint {
                color: $fr-dark-4;
            }
            
            .trigger-key-hint {
                border-color: $stroke-dark-2;
                color: $fr-dark-4;
            }
        }
    }
}
</style>