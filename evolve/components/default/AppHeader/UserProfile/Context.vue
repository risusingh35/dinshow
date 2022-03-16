<template>
	<transition name="context">
		<div id="profile-context" class="context">
			<div class="context-container">
				<div class="title-bar">
					<div class="context-title">
						Profile
					</div>
				</div>

				<hr>

				<div v-if="user" class="profile-data">
					<div class="profile-data-container">
						<div class="profile-image-container">
							<app-lazy-image
								:src="DefaultUserAvatar"
								:alt="user.EvolveUser_Name"
							/>	
						</div>

						<div class="profile-info">
							<h4 class="profile-name">
								{{ user.EvolveUser_Name }}
							</h4>
							<a :href="user.EvolveUser_EmailID | toMailRef"><small>{{ user.EvolveUser_EmailID }}</small></a>
						</div>
					</div>

					<div class="profile-manual">
						<!-- General manual -->
						<nuxt-link to="/settings" class="manual-item">
							<app-icon name="settings" color="inherit" size="25px" />
							<div class="item-name">
								General
							</div>
						</nuxt-link>
                        
						<!-- Account manual -->
						<div class="manual-item">
							<app-icon name="account_circle" color="inherit" size="25px" />
							<div class="item-name">
								Account
							</div>
						</div>

						<!-- Privacy manual -->
						<div class="manual-item">
							<app-icon name="verified_user" color="inherit" size="25px" />
							<div class="item-name">
								Privacy
							</div>
						</div>
					</div>

					<div class="profile-actions">
						<nuxt-link to="/logout">
							<app-button type="text" color="error" size="small">
								Sign out
							</app-button>
						</nuxt-link>
					</div>
				</div>

				<app-process-result
					v-else 
					icon="person"
					title="No profile"
					message="Can't get profile data"
					height="400px"
				/>
			</div>
		</div>
	</transition>
</template>

<script>
import DefaultUserAvatar from '~/assets/logo/logo.png';

export default {
	name: 'AppUserProfileContext',
	filters: {
		toMailRef (val) {
			return `mailto:${val}`;
		}
	},

	data () {
		return {
			DefaultUserAvatar
		}
	},

	computed: {
		user () {
			return this.$auth.$state.user;
		},
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

<style lang="scss">
@import "../index.scss";

#profile-context {
    width: 400px;

	@media screen and (max-width: 767px) {
		height: auto !important;
	}

    .profile-data {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 4px;
        padding-bottom: 4px;

		.profile-data-container {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 70px;
		}
 
        .profile-image-container {
            width: 56px;
            height: 56px;
            border-radius: 50px;
			margin-right: 12px;
        }

        .profile-info {
			height: inherit;
			display: flex;
			flex-direction: column;
			justify-content: center;

            .profile-name {
				margin: 0;
				padding: 0;
				line-height: 1.4rem;
            }

            .profile-email {
                color: $fr-4;
            }
        }

        .profile-manual {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            width: 100%;
          //  margin-top: 1em;
           // margin-bottom: 1em;
            color: $fr-3;

            .manual-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                
                .icon {
                    color: $primary;
                }

                .item-name {
                    padding-top: 6px;
                    padding-bottom: 6px;
                    font-size: 13px;
                }
            }
        }
    }
}

@include use-dark {
    #profile-context {
        .profile-data {
            .profile-info {
                .profile-name {
                    color: $fr-dark-1;
                }
                .profile-email {
                    color: $fr-dark-4;
                }
            }

            .profile-manual {
                color: $fr-dark-2;
                
                .icon {
                    color: $fr-dark-1;
                }
            }
        }
    }
}
</style>
