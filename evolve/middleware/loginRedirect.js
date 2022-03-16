export default function ({ store, redirect }) {
	//console.log("users :", store.getters['evolveUser']);
	// console.log(">>>>>>", store.auth)
	if (store.getters['authenticated'] == true) {
		if (store.getters['evolveUser'] != undefined) {
			return redirect(store.getters['evolveUser'].EvolveUser_DefaultUrl);
		}
		 
	}
}
