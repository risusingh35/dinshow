import Vue from 'vue'

import { mapGetters } from 'vuex';


const Validation = {
	install (Vue, options) {
		Vue.mixin({
			computed: {
				...mapGetters({
					users: 'evolveUser',
					authenticated: 'authenticated'
				})
			},
		})
	}
}

Vue.use(Validation);
