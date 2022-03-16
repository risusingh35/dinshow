<script>
import { Line } from 'vue-chartjs'
export default {
	name: 'ChartJsLine',
	extends: Line,
	props: {
		data: {
			type: Object,
			default: function () { return {} }
		},
		options: {
			type: Object,
			default: function () { return {} }
		}
	},
	mounted () {
		this.renderChart(this.data, this.options)
	}
}
</script>
