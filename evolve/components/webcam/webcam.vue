<template>
	<div>
		<video id="hrwebcam"
			ref="video"
			:width="width"
			:height="height"
			:autoplay="autoplay"
		>
			<source :src="src">
			Your browser does not support the video tag.
		</video>  
	</div>
</template>
<style>
#hrwebcam{
 border: 1px solid black;
}
</style>
<script>
export default {
	name: 'VueWebcam',
	props: {
		autoplay: {
			type: Boolean,
			default: true
		},
		width: {
			type: Number,
			default: 400
		},
		height: {
			type: Number,
			default: 300
		},
		mirror: {
			type: Boolean,
			default: true
		},
		screenshotFormat: {
			type: String,
			default: 'image/jpeg'
		}
	},
	data () {
		return {
			video: '',
			src: '',
			stream: '',
			hasUserMedia: false,
			styleObject: {
				transform: 'scale(-1, 1)',
				filter: 'FlipH'
			}
		};
	},
	mounted: function () {
		 
		this.video = this.$refs.video;
		let video = document.querySelector("#hrwebcam");
		if (navigator.mediaDevices.getUserMedia) {
			
			if (navigator.getUserMedia) {
				navigator.getUserMedia({ video: true }, (stream) => {
					video.srcObject = stream;
					this.stream = stream;
					this.hasUserMedia = true;
				}, (error) => {
					console.log(error);
				});
			}
		} 
		
	},
	beforeDestroy: function () {
		this.video.pause();
		this.src = '';
		console.log("this.stream", this.stream)
		if(this.stream != ""){
			console.log("this.stream Called")
			this.stream.getTracks().forEach(function (track) {
				track.stop();
			});
		}
	},
	destroyed: function () {
		console.log('Destroyed');
	},
	methods: {
		getPhoto () {
			if (!this.hasUserMedia) return null;
			const canvas = this.getCanvas();
			return canvas.toDataURL(this.screenshotFormat);
		},
		getCanvas () {
			if (!this.hasUserMedia) return null;
      
			const video = this.$refs.video;
			if (!this.ctx) {
				const canvas = document.createElement('canvas');
				canvas.height = video.clientHeight;
				canvas.width = video.clientWidth;
				this.canvas = canvas;
        
				this.ctx = canvas.getContext('2d');
        
				/*if (this.mirror) {
				const context = canvas.getContext('2d');
				context.translate(canvas.width, 0);
				context.scale(-1, 1);
				this.ctx = context;
				} else {
				this.ctx = canvas.getContext('2d');
				}*/
			}
			const { ctx, canvas } = this;
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
			return canvas;
		}
	},
}
</script>



