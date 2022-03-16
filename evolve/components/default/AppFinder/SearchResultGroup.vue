<template>
	<div class="group-result">
		<div class="group-name">
			<strong><small>{{ title }}</small></strong>
		</div>

		<nav class="result-menu">
			<finder-result-menu-item 
				v-for="item in menu" 
				:key="item.key" 
				:data="item"
			/>
		</nav>
	</div>
</template>

<script>
import SearchResultMenuItem from './SearchResultMenuItem.vue';

export default {
	name: 'FinderResultGroup',

	components: {
		'finder-result-menu-item': SearchResultMenuItem
	},

	props: {
		title: {
			type: String,
			default: null
		},

		menu: {
			type: Array,
			default: function () {
				return [];
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

.group-result {
    background-color: $bg;

    .group-name {
        @include regular-x-padding();
        padding-top: 6px;
        padding-bottom: 6px;
        background-color: $bg-1;
        color: $fr-4;
        font-size: 13px;
        text-transform: uppercase;
    }

    .result-menu {
        display: flex;
        flex-direction: column;
    }
}

@include use-dark {
    .group-result {
        background-color: inherit;
        
        .group-name {
            background-color: $bg-dark-2;
            color: $fr-dark-3;
        }
    }
}
</style>