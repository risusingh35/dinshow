<template>
	<div>Logout.....</div>
</template>
<script>
export default {
	head () {
		return {
			'title': 'Evolve - ' + this.$route.path
		}
	},
	layout: 'logout',
	created: async function () {
 
		let logOutObj =  await this.$axios.$get('/api/v1/evolve/auth/logout').catch(e => { 
			 console.log("Error in Logout...")
		});
		this.$auth.logout(); // Delete Data
		this.$store.dispatch('clearAllTab'); // Clear All Tab for Memory 
		this.$router.push('/login');
	}
	 
}
</script>
