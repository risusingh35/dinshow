<script>
import { PolarArea } from 'vue-chartjs'
export default {
	name: 'ChartJsPolarArea',
	extends: PolarArea,
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
