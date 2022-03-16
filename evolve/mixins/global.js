import io from 'socket.io-client'
const socket = io(process.env.EVOLVE_WS_URL)

socket.on('connect', function () {
	console.log("Socket Connected..");
});
//socket.on('event', function (data){});
socket.on('disconnect', function () {
	console.log("Socket Disconnected..");
});

// export default socket

/**
 * Global mixins
 */
export default {
	computed: {
		$socket () {
			return socket;
		}
	},
	methods: {
		/**
		 * Provide UI Notification
		 * @param {string} [type] - Notification Type 
		 * @param {number} [timeout] - Notification Timeout 
		 * @param {string} [message] - Notification  Message
		 */
		notification (type = 'danger', timeout = 3000, message = '') {
			const options = {
				status: type,
				timeout
			};  
			console.log('message>>>>>', message);
			// @ts-ignore
			UIkit.notification(message, options);
		},

		globalFunction (message){
			console.log('Global Msg :', message);
		},

		/**
		 * Set value to localStorage
		 * @param {string} key - Storage item Key
		 * @param {string} value - Storage item value
		 */
		$setLocalState (key, value = '') {
			this.$auth.$storage.setLocalStorage(key, value);
		},

		/**
		 * Get value from localStorage
		 * @param {string} key - Storage item key
		 * @param {any} defaultVal - Default value
		 * @returns {string|any}
		 */
		$getLocalState (key, defaultVal = undefined) {
			return this.$auth.$storage.getLocalStorage(key) || defaultVal;
		},

		/**
		 * Remove value from localStorage
		 * @param {string} key - Storage item key
		 */
		$removeLocalState (key) {
			this.$auth.$storage.removeLocalStorage(key);
		},

		/**
		 * Apply click action on element
		 * @param {string} selector - Element selector
		 * @returns {boolean}
		 */
		$tapOnElement (selector) {
			const elem = document.querySelector(selector);

			if (elem instanceof Element) {
				// @ts-ignore
				elem.click();
				return true;
			}
			return false;
		}
	}
}