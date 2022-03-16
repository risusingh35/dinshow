
export default {
	data () {
		return {

			/**
             * Context flag
             * @type {boolean}
             */
			viewContext: false
		}
	},

	mounted () {

		if (this.contextRoot) {
            
			// on mousedown
			document.addEventListener('mousedown', this.handleContextBlurEvent);
    
			// on keyup
			document.addEventListener('keyup', this.handleKeyEvent);
		}
	},

	destroyed () {

		// on mousedown
		document.removeEventListener('mousedown', this.handleContextBlurEvent);
        
		// on keyup
		document.removeEventListener('keyup', this.handleKeyEvent);
	},

	methods: {

		/**
         * Show context
         */
		showContext () {
			this.viewContext = true;
		},

		/**
         * Hide context
         */
		hideContext () {
			this.viewContext = false;
		},

		/**
         * Handle icon click action
         * @param {MouseEvent} $event - Event
         */
		handleIconAction ($event) {
			const val = this.viewContext;
			const result = !val;

			if (result === true) {
				this.showContext();
				this.$emit('showcontext', $event);
			}
			else {
				this.hideContext();
				this.$emit('hidecontext', $event);
			}
		},

		/**
         * Handle mouse down event
         * @param {MouseEvent} $event - Event 
         */
		handleMouseDownEvent ($event) {
			const target = $event.target;
			const root = this.contextRoot;
            
			if (target instanceof Element && target === root) {
				this.$emit('blur', $event);
				this.hideContext();
			}
		},

		/**
         * Handle click event which occured outside context area
         * @param {MouseEvent} $event - Event
         */
		handleContextBlurEvent ($event) {
			const target = $event.target;
			const exists = this.contextRoot.contains(target);

			if (exists === false) {
				this.$emit('blur', $event);
				this.hideContext();
			}
		},

		/**
         * Handle key event
         * @param {KeyboardEvent} $event - Event
         */
		handleKeyEvent ($event) {
			const target = $event.target;
			const code = $event.key;

			if (code === 'Escape' && target === document.body) {
				this.$emit('blur', $event);
				this.hideContext();
				return;
			}
		}
	},

	computed: {

		/**
         * Context root element
         * @returns {Element}
         */
		contextRoot () {
			return this.$refs['contextRoot'];
		}
	},

	filters: {

		/**
         * Fill for active icon
         * @param {boolean} val - Value
         * @returns {string}
         */
		useActive (val) {
			if (val === true) {
				return 'primary';
			}
			return undefined;
		}
	},
}