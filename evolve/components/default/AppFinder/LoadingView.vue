<template>
	<div class="loading-view">
		<app-primary-loader :height="2" color="gray" />
	</div>
</template>

<style lang="scss" scoped>
@import "./index.scss";

.loading-view {
    border-radius: 25px;
    width: $total-content-width - 5px;
    background-color: $white;
}
</style>