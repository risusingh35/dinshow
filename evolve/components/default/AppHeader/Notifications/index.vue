<template>
	<div ref="contextRoot" class="nav-menu-item">
		<!-- Icon -->
		<app-icon-button
			id="app-view-notification-button"
			icon="notifications"
			tooltip="Notifications"
			badge="1"
			:fill="viewContext | useActive"
			:active="viewContext"
			@click="handleIconAction"
		/>


		<!-- Context -->
		<app-notifications-context 
			v-if="viewContext"
			:notifications="notificationList"
			@clearall="clearNotifications"
		/>
	</div>
</template>

<script>
import NotificationsContext from './Context';
import SkippableContext from '~/mixins/skippable-context';

export default {
	name: 'AppHeaderNotifications',

	components: {
		'app-notifications-context': NotificationsContext
	},

	mixins: [SkippableContext],

	data () {
		return {
			notificationList: [
				{
					key: '45757675675',
					badge: {
						icon: 'check_circle',
						color: 'success'
					},
					message: "Login successfully.",
					time: 'Recently'
				}
			]
		}
	},

	methods: {
		clearNotifications () {
			this.notificationList = [];
		}
	}
}
</script>