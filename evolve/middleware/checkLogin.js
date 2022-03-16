export default function ({store, redirect}) {
	if(store.getters['authenticated'] == false){
		return redirect('/login');
	}
}
