export default async function ({ store, route, redirect }) {
	if (route.path === '/' || route.path === '') {
		if(store.getters['authenticated'] == true){
			redirect('/root');
		}else{
			redirect('/login');
		}
		
	}
}
