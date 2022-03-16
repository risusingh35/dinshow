<template>
	<transition name="fade">
		<div id="app-finder" @mousedown="handleFinderAction">
			<div class="app-finder-container">
				<!-- Finder search bar -->
				<finder-search-bar 
					:value="preinput"
					:focus="autofocus" 
					@input="handleSearchInput"
				/>

				<!-- Finder loading view -->
				<finder-loading-view v-if="false" />

				<!-- Finder search results -->
				<finder-search-results :results="results" />
			</div>
		</div>
	</transition>
</template>

<script>
import SearchBar from './SearchBar.vue';
import LoadingView from './LoadingView.vue';
import SearchResults from './SearchResults.vue';

export default {
	name: 'AppFinder',

	components: {
		'finder-search-bar': SearchBar,
		'finder-loading-view': LoadingView,
		'finder-search-results': SearchResults
	},

	props: {
		preinput: {
			type: String,
			default: ''
		},

		autofocus: {
			type: Boolean,
			default: true
		}
	},

	data () {
		return {
			loaded: false,

			results: []
		}
	},

	mounted () {

		this.getSearchResults('');

		// on keyup
		document.addEventListener('keyup', this.handleEscapeKeyEvent);
	},

	destroyed () {

		// on keyup
		document.removeEventListener('keyup', this.handleEscapeKeyEvent);
	},

	methods: {
		handleFinderAction (event) {
			const target = event.target;
			const targetId = 'app-finder';

			if (target instanceof Element && target.id === targetId) {
				this.$emit('blur', event);
			}
		},

		/**
         * Handle escape key event
         * @param {KeyboardEvent} $event - Event
         */
		handleEscapeKeyEvent ($event) {
			const code = $event.code;

			if (code === 'Escape') {
				this.$emit('escape', $event);
				return;
			}
		},

		async getSearchResults (query = '') {
			if (query.length === 0) {
				this.results = [];
				return;
			}

			this.loaded = true;

			const response = await this
				.$axios.$post('/api/v1/evolve/menu/getAllMenulist', {
					displayRecord: 10,
					startFrom: 0,
					search: query
				})
				.catch((e) => {
					this.notification("danger", 3000, "Problem with connecting to server!");
				});

			if (response.statusCode === 200) {
				this.results = response.result.records;
			}
			else {
				this.notification("danger", 3000, response.message);
			}

			this.loaded = false;
		},

		handleSearchInput (val) {
			this.getSearchResults(val);
		},

		notification (type = "danger", timeout = 3000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

.fade-enter-active, .fade-leave-active {
    transition: opacity 290ms ease;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

#app-finder {
    @include x-center-col();
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 1200;

    .app-finder-container {
        display: flex;
        width: $total-content-width;
        height: fit-content;
        flex-direction: column;
        align-items: center;
        margin-top: 90px;
        background-color: $bg;
        border-radius: 12px;
        box-shadow: 0 6px 22px $bg-4;
        transition: 90ms box-shadow ease;

        @media screen and (max-width: 767px) {
            width: $total-content-width - 300 + $avg-left-padding + $avg-right-padding;
            margin-top: 40px;
        }
    }
}

@include use-dark {
    #app-finder {
        background-color: rgba(0, 0, 0, 0.7);

        .app-finder-container {
            background-color: $bg-dark-1;
            box-shadow: 0 6px 22px $bg-dark;
        }
    }
}
</style>