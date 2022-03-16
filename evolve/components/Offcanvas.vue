<template>
	<div id="sc-offcanvas" data-uk-offcanvas="flip: true">
		<div class="uk-offcanvas-bar" :class="extraClass">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { scMq } from '~/assets/js/scutum_common'
import jQuery from '~/plugins/jquery'

export default {
	name: 'Offcanvas',
	props: {
		extraClass: {
			type: String,
			default: ''
		}
	},
	computed: {
		...mapState([
	         'offcanvasPresent',
	         'offcanvasActive'
		])
	},
	watch: {
		$route () {
			UIkit.offcanvas(document.getElementById('sc-offcanvas')).hide();
		}
	},
	mounted () {
		const self = this;
		self.$store.commit('setOffcanvasPresent', true);
		$('#sc-offcanvas')
			.on('shown', function () {
				self.$store.commit('offcanvasToggle', true);
			})
			.on('hidden', function () {
				self.$store.commit('offcanvasToggle', false);
			});
	},
	beforeDestroy () {
		this.$store.commit('offcanvasToggle', false);
		this.$store.commit('setOffcanvasPresent', false);
	},
	methods: {
		hide () {
			UIkit.offcanvas(document.getElementById('sc-offcanvas')).hide();
		}
	}
}
</script>
