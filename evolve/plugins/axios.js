export default function ({ $axios, redirect }) {
	$axios.onRequest(config => {
		// console.log("config.headers", config.headers)
		// console.log('Making request to ' + config.url)
		// config.headers.head['Shiv'] = 'Shankar'
		// config.headers.common['header1'] = 'value' 
	})
	$axios.onError(error => {
		if(error.response.status === 500) {
			console.log("Error in API")
			redirect('/sorry')
		}
		// const code = parseInt(error.response && error.response.status)
		// if (code === 400) {
		//   redirect('/400')
		// }
	})
}