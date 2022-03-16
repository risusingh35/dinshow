<template>
	<div class="evolve-accordion">
		<div class="container">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "EvolveFunctions"
}
</script>

<style lang="scss" scoped>
.evolve-accordion {
   width: 100%;
	position: relative;

   .container {
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 760px;

      @media screen and (max-width: 767px) {
         width: 100%;
      }
   }
}
</style>