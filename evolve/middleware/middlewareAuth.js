export default function ({store, redirect}) {
	// console.log("store.getters['authenticated'] :", store.getters['authenticated'])
	// console.log("store.getters['evolveUser'] :", store.getters['evolveUser']);
	if(store.getters['authenticated']){
		return redirect('/');
	}
}
