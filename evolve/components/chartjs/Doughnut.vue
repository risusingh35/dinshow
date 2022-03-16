<script>
import { Doughnut } from 'vue-chartjs'
export default {
	name: 'ChartJsDoughnut',
	extends: Doughnut,
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
