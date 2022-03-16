export default function ({store, redirect}) {
	console.log("checkLogOut :  authenticated :", store.getters['authenticated'])
	console.log("checkLogOut :  users :", store.getters['evolveUser']);
	if(store.getters['authenticated']){
		return redirect('/');
	}
}
