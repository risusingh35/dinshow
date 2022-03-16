<script>
import { Bar } from 'vue-chartjs'
export default {
	name: 'ChartJsBar',
	extends: Bar,
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
	 watch: {
		data: function () {
			console.log("Data Updated.....", this.data);
			// this._chart.destroy();
			this.renderChart(this.data, this.options);
			//this.renderLineChart();
		}
	},
	mounted () {
		this.renderChart(this.data, this.options)
	}
}
</script>
