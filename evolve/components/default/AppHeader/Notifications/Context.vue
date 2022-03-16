<template>
	<transition name="context">
		<div id="notification-bar" class="context">
			<div class="context-container">
				<div class="title-bar">
					<div class="context-title">
						Notifications
					</div>

					<!-- Notification action -->
					<div v-if="notifications.length > 0" class="actions">
						<!-- Clear all notification button -->
						<app-button 
							type="text" 
							size="small" 
							color="error"
							@click="handleClearNotificationAction"
						>
							Clear all
						</app-button>
					</div>
				</div>

				<hr>

				<div v-if="notifications.length > 0" class="notification-list">
					<!-- Notification item -->
					<div 
						v-for="notification in notifications" 
						:key="notification.key"
						class="notification-item"
					>
						<!-- Notification badge -->
						<div class="symbol">
							<app-icon-button 
								:icon="notification.badge.icon" 
								:fill="notification.badge.color" 
								size="small"
							/>
						</div>

						<!-- Notification detail -->
						<div class="detail">
							<div class="message">
								{{ notification.message }}
							</div>
							<div v-if="notification.time" class="time">
								<small>{{ notification.time }}</small>
							</div>
						</div>
					</div>
				</div>

				<!-- Notification process result -->
				<app-process-result 
					v-else
					icon="notifications_none"
					title="No notifications"
					height="400px"
				/>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'AppNotificationsContext',

	props: {
		notifications: {
			type: Array,
			default: function () {
				return [];
			}
		}
	},

	methods: {
		/**
         * Handle clear notification action
         * @param {MouseEvent} $event - Event
         */
		handleClearNotificationAction ($event) {
			this.$emit('clearall', $event);
		}
	}

}
</script>

<style lang="scss">
@import "../index.scss";

#notification-bar {
    width: 420px;

    .notification-list {
        @extend .regular-scroll;
        display: flex;
        height: 60vh;
        overflow-y: auto;
        flex-direction: column;

        .notification-item {
            display: flex;
            width: inherit;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            height: 60px;
            border-radius: 8px;
            border-width: 1px;
            border-style: solid;
            border-color: transparent;
            cursor: default;
            transition: background-color 50ms linear;

            &:hover {
                background-color: $bg-1;
                border-color: $stroke-1;
            }

            .symbol {
                pointer-events: none;
            }

            .detail {
                width: inherit;
                margin-left: 10px;

                .message {
                    font-size: 1rem;
                    font-weight: 400;
                }

                .time {
                    width: inherit;
                    color: $fr-4;
                }
            }
        }
    }
}

@include use-dark {
    #notification-bar {
        .notification-list {
            .notification-item {
                &:hover {
                    border-color: $stroke-3;
                    background-color: $bg-dark-4;
                }

                .detail {
                    .message {
                        color: $fr-dark-1;
                    }
                    .time {
                        color: $fr-dark-4;
                    }
                }
            }
        }
    }
}
</style>
