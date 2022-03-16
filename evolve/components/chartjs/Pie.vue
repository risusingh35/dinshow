<script>
import { Pie } from 'vue-chartjs'
export default {
	name: 'ChartJsPie',
	extends: Pie,
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
