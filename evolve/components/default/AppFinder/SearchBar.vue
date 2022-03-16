<template>
	<div class="search-input">
		<label for="app-finder-search-input" class="material-icons icon">search</label>
		<input 
			id="app-finder-search-input"
			ref="finderInputSearch" 
			type="search"
			placeholder="Search evolve"
			class="finder-search-input"
			autocomplete="off"
			spellcheck="off"
			:value="value"
			@input="handleInput"
		>
	</div>
</template>

<script>
export default {
	name: 'FinderSearchBar',

	props: {
		value: {
			type: String,
			default: ''
		},
		focus: {
			type: Boolean,
			default: true
		}
	},

	mounted () {
		const input = this.$refs.finderInputSearch;

		if (this.focus === true) {
			input.focus();
		}
	},

	methods: {
		handleInput (event) {
			const val = event.target.value;

			this.$emit('input', val, event);
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

.search-input {
    @include regular-x-padding();
    width: $avg-content-width;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    background-color: $bg;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: $stroke;

    @media screen and (max-width: 767px) {
        width: $total-content-width - 300;
    }

    .icon {
        color: $gray-600;
        font-size: 28px;
        font-weight: 100;
    }
    
    .finder-search-input {
        height: inherit;
        width: 100%;
        margin-left: 12px;
        border: none;
        outline: none;
        font-family: $primary-font-stack;
        font-size: 22px;
        font-weight: 400;

        &::placeholder {
            color: $gray-500;
        }
    }
}

@include use-dark {
    .search-input {
        background-color: inherit;
        border-bottom-color: $stroke-dark-1;

        .finder-search-input {
            background-color: inherit;
            color: $fr-dark;
        }
    }
}
</style>