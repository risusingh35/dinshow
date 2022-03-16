<template>
	<div
		id="sc-page-top-bar"
		class="sc-top-bar"
		data-uk-sticky="offset:48; show-on-up: true; animation: uk-animation-slide-top-medium"
	>
		<div class="sc-top-bar-content uk-flex uk-flex-1">
			<h1 class="sc-top-bar-title uk-text-uppercase uk-flex-1">
				{{ title }}
			</h1>
			<div v-if="actions.length > 0" class="sc-actions uk-margin-left">
				<button 
					v-for="(action, actionIndex) in actions"
					:key="actionIndex"
					class="sc-button datatable-print-button" 
					@click="action.onclick"
				>
					{{ action.label }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'EvolveTopActionBar',

	props: {
		title: {
			type: String,
			default: null,
			required: false
		},
		actions: {
			type: Array,
			default: () => {
				return [];
			}
		}
	}
}
</script>