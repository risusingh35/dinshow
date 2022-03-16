<template>
	<main id="app-main" class="space-around-top">
		<slot></slot>
	</main>
</template>

<script>
export default {
	name: 'AppMain'
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

#app-main {
    @extend .regular-scroll;
    margin-top: 7px;
    //padding-left: 0;
    padding-right: 0;
    // overflow: auto;
    padding-bottom: 3rem;
    // width: 100%; //width: 100vw;
    // height: 100%; //width: 100vw;
    width: 100vw;
    height: 1000px;
//   object-fit: cover;
//   object-position: bottom;




    margin-top: 1rem !important;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    margin-left: 10px !important;
    background-color: #FFFFFF;
}

</style>