<template>
	<div :options="options" :data="data" class="v-bb-chart"></div>
</template>

<script>
import bb from '~/plugins/billboard.js'
export default {
	name: "BBChart",
	props: {
		options: {
			type: Object,
			required: true
		},
		data: {
			type: Array,
			required: true
		},
	},
	watch: {
		"data": {
			deep: true,
			handler (newData) {
				this.loadDataChart(newData);
			}
		}
	},
	created () {
		// instance methods
		this.generateChart = this.createGenerateChart(this);
		this.destoryChart = this.createDestoryChart(this);
		this.loadDataChart = this.createLoadDataChart(this);
	},
	mounted () {
		this.$chart = this.generateChart();
	},
	unmounted () {
		this.destoryChart();
	},
	methods: {
		createGenerateChart (instance) {
			/**
			 * @function generateChart
			 *
			 * @description
			 * generates the charts bases on the options instance
			 *
			 * @returns {Object} the generated chart instance
			 */
			return () => {
				const options = Object.assign({
					bindto: instance.$el,
				}, instance.options);
				return bb.generate(options);
			}
		},
		createDestoryChart (instance) {
			/**
			 * @function destoryChart
			 *
			 * @description
			 * destorys the chart and sets ref to null
			 */
			return () => {
				try {
					instance.$chart.destory();
					instance.$chart = null;
				} catch (error) {
					console.error('Internal Billboard.js error', error);
				}
			}
		},
		createLoadDataChart (instance) {
			/**
			 * @function loadDataChart
			 *
			 * @description
			 * Updates the chart with the new data
			 *
			 * @param {object} options from instance to update the chart with
			 */
			return (data) => {
				if(!instance.$chart){
					instance.$chart = instance.generateChart(instance.options);
				}
				instance.$chart.load(data);
			}
		}
	},
};
</script>
