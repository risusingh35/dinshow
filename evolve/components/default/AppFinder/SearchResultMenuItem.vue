<template>
	<nuxt-link 
		:to="data.EvolveMenu_Url" 
		:data-finder-menu-item-key="data.key" 
		:data-finder-menu-item-appid="data.EvolveMenu_AppId"
		class="menu-item"
		@click.native="handleItemClickAction"
	>
		<div class="icon-container">
			<i v-if="data.EvolveMenu_Icon" :class="data.EvolveMenu_Icon"></i>
			<i v-else class="mdi mdi-menu"></i>
		</div>
        
		<div class="detail">
			<div :class="labelClasses">
				{{ data.EvolveMenu_Name }}
			</div>
			<div v-if="data.EvolveMenu_Desc" class="desc item-text">
				{{ data.EvolveMenu_Desc }}
			</div>
		</div>
	</nuxt-link>
</template>

<script>

/**
 * @typedef SearchResultMenuItemData
 * @property {string} key - Key 
 * @property {string} label - Label
 * @property {string} icon - Icon
 * @property {string} [desc] - Description
 * @property {string} [url] - Url
 */

export default {
	name: 'FinderResultMenuItem',

	props: {
		/**
         * @type {SearchResultMenuItemData}
         */
		data: {
			type: Object,
			required: true
		}
	},

	computed: {
		labelClasses () {
			let classes = ['label', 'item-text'];

			if (!this.data.desc) {
				classes.push('regular-font');
			}

			return classes;
		}
	},

	methods: {
		handleItemClickAction () {
			this.$store.commit('CHANGE_FINDER_VIEW', false);
		}
	}
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

.menu-item {
    @include regular-x-padding();
    display: flex;
    height: auto;
    padding-top: 10px;
    padding-bottom: 10px;
    flex-direction: row;
    align-items: center;
    color: $fr-3;
    transition: background-color 60ms linear;

    &:hover {
        background-color: $primary-lighten;

        .item-text,
        .icon {
            color: $primary;
        }
    }

    .icon-container .icon, 
    .icon-container .mdi::before {
        vertical-align: middle;
        font-size: 20px;
    }

    .detail {
        margin-left: 1rem;

        .label {
            font-size: 16px;
            line-height: 1.4rem;

            &.regular-font {
                font-size: 15px;
            }
        }

        .desc {
            font-size: 10px;
            line-height: 1rem;
            color: $fr-4;
        }
    }
}

@include use-dark {
    .menu-item {
        color: $fr-dark-3;

        &:hover {
            background-color: $bg-dark-2;

            .item-text,
            .icon {
                color: $fr-dark;
            }
        }

        .detail {
            .desc {
                color: $fr-dark-5;
            }
        }
    }
}
</style>