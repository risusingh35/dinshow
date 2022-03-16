<template>
	<div class="search-results">
		<finder-search-result-group
			v-for="result in groups"
			:key="result.key"
			:title="result.name" 
			:menu="result.menu"
		/>

		<app-process-result 
			v-if="results.length === 0"
			icon="explore"
			title="Evolve Finder"
			message="Type to search"
		/>
	</div>
</template>

<script>
import SearchResultGroup from './SearchResultGroup.vue';

/**
 * @typedef SearchResultItem
 * @property {string} name - Group name
 * @property {Array} [menu] - Group menu
 */

export default {
	name: 'FinderSearchResults',

	components: {
		'finder-search-result-group': SearchResultGroup
	},

	props: {
		results: {
			type: Array,
			default: function () {
				return [];
			}
		}
	},

	computed: {
		groups () {
			const results = this.results;
			const groups = {};

			for (const result of results) {
				const groupId = String(result.EvolveMenu_AppId);

				if (Reflect.has(groups, groupId)) {
					const group = Reflect.get(groups, groupId);

					if (Array.isArray(group.menu)) {
						group.menu.push(result);
					}
				}
				else {
					const group = {
						name: result.EvolveApp_Name,
						key: groupId,
						menu: [
							result
						]
					};

					Reflect.set(groups, groupId, group);
				}

			}
		
			return groups;
		}
	},
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

.search-results {
    @extend .regular-scroll;
    display: flex;
    height: 420px;
    flex-direction: column;
    width: $total-content-width;
    overflow: auto;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;

	@media screen and (max-width: 767px) {
		width: inherit;
	}
}
</style>