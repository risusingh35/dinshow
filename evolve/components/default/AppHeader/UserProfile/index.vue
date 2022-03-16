<template>
	<div ref="contextRoot" class="nav-menu-item">
		<!-- Icon -->
		<app-icon-button
			id="app-view-active-user-profile-button"
			:src="userAvatar"
			tooltip="Profile"
			:active="viewContext"
			@click="handleIconAction"
		/>

		<!-- Context -->
		<app-user-profile-context v-if="viewContext" />
	</div>
</template>

<script>
import UserProfileContext from './Context';
import SkippableContext from '~/mixins/skippable-context';
import DefaultUserAvatar from '~/assets/logo/logo.png';

export default {
	name: 'AppHeaderUserProfile',

	components: {
		'app-user-profile-context': UserProfileContext
	},
	mixins: [SkippableContext],

	data () {
		return {
			DefaultUserAvatar
		}
	},

	computed: {
		userAvatar () {
			let avatar;

			try {
				avatar = this.$auth.$state.user.avatar || this.DefaultUserAvatar;
			}
			catch (error) {
				avatar = this.DefaultUserAvatar;
			}

			return avatar;
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../index.scss";
</style>