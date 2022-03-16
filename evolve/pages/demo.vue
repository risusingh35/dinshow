<template>
	<div class="evolve-page">
		<div class="evolve-page-header">
			<div class="evolve-page-header-icons">
				<a
					class="sc-actions-icon mdi mdi-refresh md-color-light-green-600"
					@click="refreshClick()"
				></a>  
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-fullscreen mdi-fullscreen"
				></a>
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-window-minimize"
				></a>
			</div>

			<div v-if="EvolveMenu_Id" class="evolve-page-header-icons">
				<a
					href="javascript:void(0)"
					data-uk-tooltip="title: Add To Favourite; pos: right"
					class="sc-actions-icon mdi mdi-star md-color-yellow-600"
					@click="$store.dispatch('addToFavouriteClick', EvolveMenu_Id)"
				></a>
			</div>
			<!-- <div class="evolve-page-header-icons evolve-float-right">
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-close-box md-color-red-600"
					@click="$store.dispatch('removeOneTab', '/demo')"
				></a>
			</div> -->

			<div class="evolve-page-header-icons evolve-float-right">
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-file-excel md-color-indigo-600"
				></a>
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-file-pdf md-color-red-600"
				></a>
				<a
					href="javascript:void(0)"
					class="sc-actions-icon mdi mdi-printer md-color-cyan-600"
				></a>
			</div>
			<!-- <div class="evolve-page-header-icons evolve-float-right">
				<button title="" class="sc-button sc-button-mini" @click="onGetData()">
					Get Device Data
				</button>
			</div> -->
		</div>
		<client-only>
			<div id="sc-page-content" class="evolve-page-body">
				<!-- <div>
					<div data-uk-form-custom="target: true">
						<select>
							<option value="1">
								Option 01
							</option>
							<option value="2">
								Option 02
							</option>
							<option value="3">
								Option 03
							</option>
							<option value="4">
								Option 04
							</option>
						</select>
						<span></span>
					</div>
				</div> -->

				<!-- <client-only>
					<GmapMap
						:center="map1.center"
						:zoom="map1.zoom"
						:options="map1.options"
						class="sc-gmap"
						style="height: 450px;"
					>
						<GmapMarker
							v-for="m in markers"
							:key="m.id"
							:position="m.position"
							:title="m.title" 
							:clickable="true"
							:icon="markerIcon"
						/>
					</GmapMap>
				</client-only> -->



				<!-- <client-only>
					<GmapMap
						:center="map1.center"
						:zoom="map1.zoom"
						:options="map1.options"
						class="sc-gmap"
					>
						<GmapMarker
							v-for="m in markers"
							:key="m.id"
							:position="m.position"
							title="m.title"
							:clickable="true"
							:icon="markerIcon"
						/>
					</GmapMap>
				</client-only> -->




				<ul id="sc-contact-list" class="uk-child-width-1-1 uk-child-width-1-2@m uk-child-width-1-3@l uk-grid" data-uk-grid>
					<li>
						<div class="uk-card uk-card-hover">
							<sccardbody class="sc-padding-remove">
								<div class="uk-grid-divider uk-grid-collapse" data-uk-grid>
									<div class="uk-width-1-3@l uk-flex uk-flex-middle uk-flex-center " style="background: #76cbc5 !important;">
										<div class="sc-padding-medium uk-text-center">
											<p class="sc-text-semibold uk-margin uk-margin-remove-bottom md-color-white">
												Mixing
											</p>
											<div class="uk-display-inline-block">
												<img :src="(deviceLogo!='')?deviceLogo : ''">
											</div>
											<p class="sc-text-semibold uk-margin uk-margin-remove-bottom md-color-white">
											</p>
											<p class="uk-margin-remove sc-color-secondary uk-text-medium">
											</p>
										</div>
									</div>
									<div class="uk-width-2-3@l">
										<div class="sc-padding-medium">
											<ul class="uk-list uk-list-divider" style="margin-left: -30px;margin-bottom: 0px;">
												<li class="sc-list-group">
													<div class="sc-list-addon">
														<i class="mdi mdi-account-card-details"></i>
													</div>
													<div class="sc-list-body">
														<p class="uk-margin-remove sc-text-semibold">
															Mixing 0001
														</p>
														<span class="sc-list-secondary-text">
															Mixing Departmnet  
														</span>
													</div>
												</li>
												<li class="sc-list-group">
													<div class="sc-list-addon">
														<i class="mdi mdi-alarm-light"></i>
													</div>
													<div class="sc-list-body">
														<p class="uk-margin-remove">
															Buzzer 
														</p>
													</div>
												</li>
												<!-- <li class="sc-list-group">
													<div class="sc-list-addon">
														<i class="mdi mdi-shield-key"></i>
													</div>
													<div class="sc-list-body">
														<p class="uk-margin-remove uk-text-wrap">
															********** 
														</p>
													</div>
												</li> -->
												<li class="sc-list-group">
													<div class="sc-list-addon">
														<i class="mdi mdi-progress-clock"></i>
													</div>
													<div class="sc-list-body">
														<p class="uk-margin-remove uk-text-wrap" style="font-size: 12px;">
															31/01/2022 1:46:48 PM 
														</p>
													</div>
												</li>
												<li class="sc-list-group">
													<div class="sc-list-body">
														<table>
															<tr>
																<td><span class="uk-label uk-label-danger" style="border: 1px solid rgba(0, 0, 0, 0.12);text-align: center">CYCLE</span></td>
																<td><span class="uk-label uk-label-success" style="border: 1px solid rgba(0, 0, 0, 0.12);text-align: center">HIGH SPEED</span></td>
															</tr>
														</table>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</sccardbody>
						</div>
					</li>
				</ul>     

				<!-- <div class="uk-grid" data-uk-grid>
					<div class="uk-width-1-4@l">  
						<client-only>
							<div v-sc-sticky="sideMenu">
								<h4 class="uk-heading-line ">
									<span>h3:4j:54:89:98</span>
								</h4>
								<div class="">
									<div class="sc-round sc-padding md-bg-green-300">
										<h2 class="uk-margin-remove">
											<b>LINE STATUS</b>
										</h2>
									</div>
								</div>

								<div class="">
									<div class="sc-round sc-padding md-bg-grey-100">
										<p class="sc-color-secondary uk-margin-remove">
											LENGTH OF PRODUCT 
										</p>
										<h1 class="uk-margin-remove md-color-green-500">
											<b>50</b> Meter
										</h1>
									</div>
								</div>
								 
								<ul class="uk-list uk-list-divider" style="margin-left: -30px !important;">
									<li class="sc-list-group">
										<div class="sc-list-addon">
											<i class="mdi mdi-alarm-light"></i>
										</div>
										<div class="sc-list-body">
											<div class="sc-list-body">
												<p class="uk-margin-remove sc-text-semibold">
													TRIP SIGNAL
												</p>
												<span class="sc-list-secondary-text">
													live Trip Signal list
												</span>
											</div>
										</div>
									</li>
									<li class="sc-list-group">
										<div class="sc-list-addon">
											<i class="mdi mdi-alarm-light-outline md-color-red-500"></i>
										</div>
										<div class="sc-list-body">
											Accumulator
										</div>
									</li>
									<li class="sc-list-group">
										<div class="sc-list-addon">
											<i class="mdi mdi-alarm-light-outline"></i>
										</div>
										<div class="sc-list-body">
											Infeed
										</div>
									</li>
									<li class="sc-list-group">
										<div class="sc-list-addon">
											<i class="mdi mdi-alarm-light-outline"></i>
										</div>
										<div class="sc-list-body">
											Cooling down 1
										</div>
									</li>
								</ul>
							</div>
						</client-only> 
					</div> 
					<div class="uk-width-expand@l">
						<div name="name4">
							<h4 class="uk-heading-line ">
								<span>TOP COAT OVEN PANEL</span>
							</h4>
							 
							<div data-uk-grid="" class="uk-child-width-1-3@m uk-text-center uk-grid">
								<div class="uk-first-column">
									<div class="sc-round miter_box md-bg-grey-100">
										<p class="sc-color-secondary uk-margin-remove">
											RPM Drive 1
										</p>
										<h1 class="uk-margin-remove md-color-green-500">
											348
										</h1>
									</div>
								</div><div>
									<div class="sc-round miter_box md-bg-grey-100">
										<p class="sc-color-secondary uk-margin-remove">
											RPM Drive 2
										</p>
										<h1 class="uk-margin-remove md-color-green-500">
											23
										</h1> 
									</div>
								</div><div>
									<div class="sc-round miter_box md-bg-grey-100">
										<p class="sc-color-secondary uk-margin-remove">
											RPM Drive 3
										</p>
										<h1 class="uk-margin-remove md-color-red-500">
											148
										</h1> 
									</div>
								</div>
							</div>
						</div>
						<div name="name5">
							<h4 class="uk-heading-line ">
								<span>MIDDLE COAT HOT OVEN BLOWER</span>
							</h4>
							 
							<div data-uk-grid="" class="uk-child-width-1-5@m uk-text-center uk-grid">
								<div class="uk-first-column">
									<div class="sc-round miter_box md-bg-grey-100">
										<p class="sc-color-secondary uk-margin-remove">
											RPM Drive 1
										</p>
										<h1 class="uk-margin-remove md-color-green-500">
											348
										</h1>
									</div>
								</div><div>
									<div class="sc-round miter_box md-bg-grey-100">
										<p class="sc-color-secondary uk-margin-remove">
											RPM Drive 2
										</p>
										<h1 class="uk-margin-remove md-color-green-500">
											23
										</h1> 
									</div>
								</div>
								<div>
									<div class="sc-round miter_box md-bg-grey-100">
										<p class="sc-color-secondary uk-margin-remove">
											RPM Drive 3
										</p>
										<h1 class="uk-margin-remove md-color-red-500">
											223
										</h1> 
									</div>
								</div>
								<div>
									<div class="sc-round miter_box md-bg-grey-100">
										<p class="sc-color-secondary uk-margin-remove">
											RPM Drive 4
										</p>
										<h1 class="uk-margin-remove md-color-green-500">
											34
										</h1> 
									</div>
								</div>
								<div>
									<div class="sc-round miter_box md-bg-grey-100">
										<p class="sc-color-secondary uk-margin-remove">
											RPM Drive 5
										</p>
										<h1 class="uk-margin-remove md-color-red-500">
											89
										</h1> 
									</div>
								</div>
							</div>
						</div>
						<div name="name6">
							<h4 class="uk-heading-line ">
								<span>ADHESIVE COAT HOT OVEN BLOWER</span>
							</h4>
							 
							<div data-uk-grid="" class="uk-child-width-1-5@m uk-text-center uk-grid">
								<div class="uk-first-column">
									<div class="sc-round miter_box md-bg-grey-100">
										<p class="sc-color-secondary uk-margin-remove">
											RPM Drive 1
										</p>
										<h1 class="uk-margin-remove md-color-green-500">
											34
										</h1>
									</div>
								</div><div>
									<div class="sc-round miter_box md-bg-grey-100">
										<p class="sc-color-secondary uk-margin-remove">
											RPM Drive 2
										</p>
										<h1 class="uk-margin-remove md-color-green-500">
											678
										</h1> 
									</div>
								</div>
								<div>
									<div class="sc-round miter_box md-bg-grey-100">
										<p class="sc-color-secondary uk-margin-remove">
											RPM Drive 3
										</p>
										<h1 class="uk-margin-remove md-color-red-500">
											223
										</h1> 
									</div>
								</div>
								<div>
									<div class="sc-round miter_box md-bg-grey-100">
										<p class="sc-color-secondary uk-margin-remove">
											RPM Drive 4
										</p>
										<h1 class="uk-margin-remove md-color-green-500">
											34
										</h1> 
									</div>
								</div>
								<div>
									<div class="sc-round miter_box md-bg-grey-100">
										<p class="sc-color-secondary uk-margin-remove">
											RPM Drive 5
										</p>
										<h1 class="uk-margin-remove md-color-red-500">
											89
										</h1> 
									</div>
								</div>
							</div>
						</div>
					</div>  
				</div>    -->

				<!-- <div class="uk-card-body min-height-back">
					<div
						:style="{ position: 'absolute', width: floorPlanWidth+'px',height:floorPlanHeight+'px', background: 'url(' + floorPlan + ')' }"
					>
						<img
							v-for="pObj in pointerPosition"
							:key="pObj.pointer"
							:src="(pObj.pointer == 'RED' ? redPointer : (pObj.pointer == 'BLUE' ? bluePointer :(pObj.pointer == 'BLACK' ? blackPointer :(pObj.pointer == 'YELLOW' ? yellowPointer :greenPointer))))"
							:alt="pObj.pointer"
							:data-uk-tooltip="pObj.type"
							:style="{ height : '20px',position: 'absolute', 'margin-left' : pObj.marginLeft+'px', 'margin-top' : pObj.marginTop+'px' }"
						>
					</div>
				</div> -->

				<!-- <div>
					<ChartJsBar ref="basicChart" chart-id="cjsBarChartData" :data="evolveBarChart.data" :options="evolveBarChart.options"></ChartJsBar>
				</div> -->
				<!--  <div>
					<ChartJsLine chart-id="cjsBarChartData" :data="lineChart.data" :options="lineChart.options"></ChartJsLine>
				</div> -->
				<!-- <client-only>
					<BillboardChart :options="bb.barChart"></BillboardChart>
				</client-only> -->
			</div>
		</client-only>
	</div>
</template>
<style>
.miter_box{
	    padding: 10px;
    margin: 0px 10px;
}
</style>
<script>
// import { uniqueID } from "~/assets/js/scutum_common";
// import ScInput from "~/components/Input";
// import { scColors } from "~/assets/js/utils";
// import ChartJsBar from "~/components/chartjs/Bar";
// import ChartJsLine from "~/components/chartjs/Line";
// import DateRangePicker from '~/components/DateRangePicker'
if (process.client) {
	// var Paginate = require("vuejs-paginate");
	// require("~/plugins/flatpickr");
	// require('~/plugins/gmaps')
}

import draggable from "vuedraggable";
export default {
	components: {
		// BillboardChart: process.client
		// 	? () => import("~/components/billboard-charts/Chart")
		// 	: null,
		// ChartJsBar,
		// ChartJsLine,
		// DateRangePicker,
		// ScInput
	},

	head () {
		return {
			title: "Evolve - " + this.$route.name,
		};
	},
	props: {
		params: {
			type: Object,
			default: () => {},
		},
	},
	layout: "eDefaultV2",
	data () {
		return {
			pageURL : '/formV3',
			EvolveMenu_Id :this.$route.query.EvolveMenu_Id,

			deviceLogo : require("~/assets/img/IOT.png"),
			// map1: {
			// 	center: {
			// 		lat: 23.053672,
			// 		lng: 72.453313
			// 	},
			// 	zoom: 3
			// },
			// markerIcon: require('~/assets/img/map-marker-outline.png'),
			// markers: [
			// 	{
			// 		id: 1,
			// 		title: 'Device one',
			// 		position: {
			// 			lat: 23.053672,
			// 			lng: 72.453313
			// 		}
			// 	},
			// 	{
			// 		id: 2,
			// 		title: 'Device two',
			// 		position: {
			// 			lat: 21.053672,
			// 			lng: 72.453313
			// 		}
			// 	}
			// ],


			// sideMenu: {
			// 	media: "largeMin",
			// 	options: {
			// 		offset_top: "inPlace",
			// 	},
			// 	on: {
			// 		"sticky_kit:stick" (e) {
			// 			// console.log("has stuck!", e.target);
			// 		},
			// 		"sticky_kit:unstick" (e) {
			// 			// console.log("has unstuck!", e.target);
			// 		},
			// 	},
			// },
			// drpTime : "",
			// floorPlan: require("~/assets/test/floor_plan.jpg"),
			// floorPlanWidth: 200,
			// floorPlanHeight: 200,
			// humanIcon: require("~/assets/test/pointer.png"),
			// redPointer: require("~/assets/test/red.png"),
			// bluePointer: require("~/assets/test/blue.png"),
			// blackPointer: require("~/assets/test/black.png"),
			// yellowPointer: require("~/assets/test/yellow.png"),
			// greenPointer: require("~/assets/test/green.png"),
			// pointerPosition: [],

			// barChartData: [],
			// intervalObj: "",
			// barChartDatavar: {},
			// dataCount: 0,

			// bb: {
			// 	barChart: {
			// 		data: {
			// 			columns: [],
			// 			type: "bar",
			// 		},
			// 		bar: {
			// 			width: {
			// 				ratio: 0.5,
			// 			},
			// 		},
			// 		color: {
			// 			pattern: scColors.multi,
			// 		},
			// 		grid: {
			// 			y: {
			// 				show: true,
			// 			},
			// 		},
			// 	},
			// },
			// cjs: {
			// 	barChart: {
			// 		data: {
			// 			labels: [],
			// 			datasets: [],
			// 		},
			// 		options: {
			// 			responsive: true,
			// 			maintainAspectRatio: false,
			// 			legend: {
			// 				//position: 'top'
			// 			},
			// 			title: {
			// 				display: true,
			// 				text: "MT Autocraft",
			// 			},
			// 		},
			// 	},
			// },
			// seed: Date.now(),
			// color: process.client ? Chart.helpers.color : "#fff",
			// chartDataType: "YEAR",
			// evolveBarChart: {
			// 	data: {
			// 		labels: [],
			// 		datasets: [],
			// 	},
			// 	options: {
			// 		responsive: true,
			// 		maintainAspectRatio: false,
			// 		legend: {
			// 			//position: 'top'
			// 		},
			// 		title: {
			// 			display: true,
			// 			text: "MT Autocraft",
			// 		},
			// 		onClick: this.chartClick,
			// 	},
			// },

			// lineChart: {
			// 	name:"test",
			// 	options: {
			// 		responsive: true,
			// 		maintainAspectRatio: false,
					 
			// 		tooltips: {
			// 			mode: "index",
			// 			intersect: false,
			// 		},
			// 		hover: {
			// 			mode: "nearest",
			// 			intersect: true,
			// 		},
			// 		scales: {
			// 			xAxes: [
			// 				{
			// 					display: true,
			// 					scaleLabel: {
			// 						display: true,
			// 						labelString: "Time HH:MM:SS",
			// 					},
			// 				},
			// 			],
			// 			yAxes: [
			// 				{
								 
			// 					ticks: {
			// 						stepSize: 1
			// 					},
			// 					display: true,
			// 					scaleLabel: {
			// 						display: true,
			// 						labelString: "Status",
			// 					},
			// 				},
			// 			],
			// 		},
			// 	},
			// },
		};
	},
	computed: {
		// cjsBarChartData () {
		// 	//this.barChartDatavar;
		// 	return {
		// 		labels: ["January", "February", "March", "April", "May", "June"],
		// 		datasets: [
		// 			{
		// 				label: "Dataset 1",
		// 				backgroundColor: "#195BFF",

		// 				data: [1.1, 2, 3, 4, 5, 6],
		// 			},
		// 		],
		// 	};
		// },
		// cjsLineChartData () {
		// 	return {
		// 		labels: ["January", "February", "March", "April", "May", "June"],
		// 		datasets: [
		// 			{
		// 				label: "My First dataset",
		// 				backgroundColor: scColors.multi[4],
		// 				borderColor: scColors.multi[4],
		// 				data: this.cjsRandData[5],
		// 				fill: false,
		// 			},
		// 			{
		// 				label: "My Second dataset",
		// 				fill: false,
		// 				backgroundColor: scColors.multi[5],
		// 				borderColor: scColors.multi[5],
		// 				data: this.cjsRandData[6],
		// 			},
		// 		],
		// 	};
		// },
	},
	mounted () {},
	beforeDestroy () {
		// clearInterval(this.intervalObj);
		// this.$socket.off("GetDeviceData");
	},
	created: async function () {
		// console.log("Created Called... Created");
		// console.log("this.params>>>", this.$route.params);
		//clearInterval(this.intervalObj);
		// UIkit.modal("#modal1").show();
		//UIkit('#modal1').modal({backdrop: 'static', keyboard: false})
		// this.testFunction();
		// this.changeLoc();
		// this.getMeta("/_nuxt/assets/test/floor_plan.jpg");

		// let thisObj = this;
		// thisObj.changeChartData(0);
		// this.intervalObj=setInterval(function (){
		// 	thisObj.changeChartData(1);
		// }, 3000);
 
		// console.log("ChartJsBar", this.ChartJsBar);
	},

	beforeMount () {
		//clearInterval(this.intervalObj);
		// this.$socket.on("DeviceData", (data) => {
		// 	console.log("data :", data.count);
		// 	this.dataCount = data.count;
		// });
	},

	methods: {
		refreshClick: async function () {
			let time = new Date().getTime();
			let randNbr = Math.floor(Math.random() * 10);
			//console.log("randNbr>>>>>>", randNbr);
			this.$store.dispatch('addNewTab', {
				title: `Page Sample `+randNbr, 
				url: '/testPage/page?temp='+time,
				params: {
					isDynamicPage : 1,
					machineID : randNbr
				}
			});


			// let details = {
			// 	msg: "Your transaction cannot be completed",
			// 	time: 5000,
			// };

			// this.$store.dispatch("evolveNotification", details);
		},
		async notification (type = "danger", timeout = 3000, message = "") {
			let config = {
				timeout: timeout,
				status: type,
			};
			UIkit.notification(message, config);
		},

		testFunction () {
			this.pointerPosition.push({
				pointer: "RED",
				marginLeft: 180,
				marginTop: 80,
				type: "Kaushal Patel",
			});
			this.pointerPosition.push({
				pointer: "GREEN",
				marginLeft: 280,
				marginTop: 240,
				type: "MHimanshu Raval",
			});
			this.pointerPosition.push({
				pointer: "BLUE",
				marginLeft: 50,
				marginTop: 130,
				type: "Mayank Updadhyay",
			});
			this.pointerPosition.push({
				pointer: "BLACK",
				marginLeft: 100,
				marginTop: 180,
				type: "Rajubhai",
			});
			this.pointerPosition.push({
				pointer: "REDE",
				marginLeft: 150,
				marginTop: 130,
				type: "Ankit Darji",
			});
			this.pointerPosition.push({
				pointer: "YELLOW",
				marginLeft: 180,
				marginTop: 170,
				type: "Ravatraj",
			});
		},
		changeLoc () {
			// for Testing Only
			setInterval(() => {
				for (let i = 0; i < this.pointerPosition.length; i++) {
					if (Math.floor(Math.random() * 3) == 1) {
						this.pointerPosition[i].marginTop = parseInt(
							parseInt(this.pointerPosition[i].marginTop) + 1
						);

						if (this.pointerPosition[i].marginTop + 20 > this.naturalHeight) {
							this.pointerPosition[i].marginTop = Math.floor(
								Math.random() * (this.naturalHeight - 70)
							);
						}
					}
					if (Math.floor(Math.random() * 3) == 2) {
						this.pointerPosition[i].marginLeft = parseInt(
							parseInt(this.pointerPosition[i].marginLeft) + 1
						);
						if (this.pointerPosition[i].marginLeft + 20 > this.naturalWidth) {
							this.pointerPosition[i].marginLeft = Math.floor(
								Math.random() * (this.naturalWidth - 70)
							);
						}
					}
				}
			}, 1000);
		},
		getMeta (url) {
			let thisObj = this;
			var img = new Image();
			img.addEventListener("load", function () {
				thisObj.floorPlanWidth = this.naturalWidth;
				thisObj.floorPlanHeight = this.naturalHeight;
				// alert(this.naturalWidth + " " + this.naturalHeight);
			});
			img.src = url;
		},
		changeChartData () {
			let CbarChartData = [];
			let labels = ["2019", "2020", "2021", "2022", "2023", "2024"];
			this.chartDataType = "YEAR";

			this.evolveBarChart.data = {
				labels: labels,
				datasets: [
					{
						label: "ON",
						backgroundColor: "#7eff66",

						borderColor: "#9b9696",
						borderWidth: 1,
						data: [12, 34, 56, 7, 88, 89],
					},
					{
						label: "OFF",
						backgroundColor: "#f14d4d",
						borderColor: "#9b9696",
						borderWidth: 1,
						data: [14, 54, 76, 17, 80, 9],
					},
				],
			};
			this.evolveBarChart.options.title.text = "Year Data";

			this.lineChart.data = {
				labels: ["10:00", "10:03", "10:05", "10:07", "10:08", "10:09"],
				datasets: [
					{
						label: "MQTT",
						backgroundColor: "#2196f3",
						borderColor: "#2196f3",
						data: [0, 0, 1, 0, 1, 0],
						fill: false,
					},
					{
						label: "RTC",
						fill: false,
						backgroundColor: "#ef5350",
						borderColor: "#ef5350",
						data: [0, 0, 0, 0, 1, 1],
					},
					{
						label: "WIFI",
						fill: false,
						backgroundColor: "#e91e63",
						borderColor: "#e91e63",
						data: [0, 0, 0, 0, 1, 1],
					},
					{
						label: "ETHERNET",
						fill: false,
						backgroundColor: "#9c27b0",
						borderColor: "#9c27b0",
						data: [0, 0, 0, 0, 1, 1],
					},
					{
						label: "MODEBUS",
						fill: false,
						backgroundColor: "#64b5f6",
						borderColor: "#64b5f6",
						data: [0, 0, 0, 0, 1, 1],
					},
					{
						label: "SD CARD",
						fill: false,
						backgroundColor: "#26a69a",
						borderColor: "#26a69a",
						data: [0, 0, 0, 0, 1, 1],
					},
					{
						label: "RSSI",
						fill: false,
						backgroundColor: "#cddc39",
						borderColor: "#cddc39",
						data: [0, 0, 0, 0, 1, 1],
					} 
				],
			};


			

		 




			// datasets: [
			// 	{
			// 		label: "Cycle Count",
			// 		backgroundColor: "#195BFF",
			// 		data: CbarChartData,
			// 	},
			// ],
			// const random = Math.floor((Math.random() * 3) + 1);
			// console.log("random>>>", random);

			// if(random == 1){
			// 	labels = ['ONE'];
			// 	CbarChartData = [ 10];
			// }
			// if(random == 2){
			// 	labels = ['ONE', 'TWO'];
			// 	CbarChartData = [ 2, 20];
			// }
			// if(random == 3){
			// 	labels = ['ONE', 'TWO', 'THREE'];
			// 	CbarChartData = [3, 2, 30];
			// }

			//this.cjs.barChart.data.labels =  ['ABC', 'February', 'March', 'April', 'May', 'June'];
			// this.cjs.barChart.data.datasets[0].data =  [10, 20, 30];

			// this.$data.cjsBarChartData.update();

			// console.log(">>>>>", this.$refs.basicChart);

			// this.$refs.basicChart.update();

			//this.barChartDatavar.update();
			//	console.log("this.barChartDatavar>>>>>", this.barChartDatavar);
			// this.bb.barChart.data.columns.pop();
			// this.bb.barChart.data.columns.push(CbarChartData);

			// console.log("this.bb.barChart.data.columns>>>", this.bb.barChart.data.columns);
		},
		onGetData: async function () {
			try {
				console.log(">>>>>>>>>>>>>>>>>>>>>>");
				console.log("Data lables>>", this.lineChart.data.labels);


				this.lineChart.data = {
					labels: ["10:00", "10:03", "10:05", "10:97", "11:08", "11:99"],
					datasets: [
						{
							label: "MQTT",
							backgroundColor: "#2196f3",
							borderColor: "#2196f3",
							data: [1, 1, 1, 1, 1, 0],
							fill: false,
						},
						{
							label: "RTC",
							fill: false,
							backgroundColor: "#ef5350",
							borderColor: "#ef5350",
							data: [0, 0, 0, 0, 1, 1],
						},
						{
							label: "WIFI",
							fill: false,
							backgroundColor: "#e91e63",
							borderColor: "#e91e63",
							data: [0, 0, 0, 0, 1, 1],
						},
						{
							label: "ETHERNET",
							fill: false,
							backgroundColor: "#9c27b0",
							borderColor: "#9c27b0",
							data: [0, 0, 0, 0, 1, 1],
						},
						{
							label: "MODEBUS",
							fill: false,
							backgroundColor: "#64b5f6",
							borderColor: "#64b5f6",
							data: [0, 0, 0, 0, 1, 1],
						},
						{
							label: "SD CARD",
							fill: false,
							backgroundColor: "#26a69a",
							borderColor: "#26a69a",
							data: [0, 0, 0, 0, 1, 1],
						},
						{
							label: "RSSI",
							fill: false,
							backgroundColor: "#cddc39",
							borderColor: "#cddc39",
							data: [0, 0, 0, 0, 1, 1],
						} 
					],
				};

				console.log("Data lables>>", this.lineChart.data.labels);
				
				//clearInterval(this.intervalObj);
				// let thisObj = this;
				// let count = 1;
				// this.$socket.emit("GetDeviceData", { count: count });
				// this.intervalObj = setInterval(function () {
				// 	thisObj.$socket.emit("GetDeviceData", { count: count++ });
				// }, 3000);
			} catch (error) {
				console.log("error", error.message);
			}
		},
		chartClick: async function (event, array) {
			try {
				//  console.log("Chart Click....");
				//  console.log("array ....", array);
				let selectedIndex = array[0]._index;
				console.log(selectedIndex);
				console.log(this.evolveBarChart.data.labels);

				console.log(
					"Clicked Lable :",
					this.evolveBarChart.data.labels[selectedIndex]
				);
				if (this.chartDataType == "MINUTES") {
					let newLable = Array(60)
						.fill()
						.map((element, index) => index + 1);
					this.evolveBarChart.data = {
						labels: newLable,
						datasets: [
							{
								label: "ON",
								backgroundColor: "#7eff66",
								borderColor: "#9b9696",
								borderWidth: 1,
								data: Array.from({ length: 60 }, () =>
									Math.floor(Math.random() * 60)
								),
							},
							{
								label: "OFF",
								backgroundColor: "#f14d4d",
								borderColor: "#9b9696",
								borderWidth: 1,
								data: Array.from({ length: 60 }, () =>
									Math.floor(Math.random() * 60)
								),
							},
						],
					};

					this.chartDataType = "SECOND";
					this.evolveBarChart.options.title.text = "Second Data";
				}

				if (this.chartDataType == "HOURS") {
					let newLable = Array(60)
						.fill()
						.map((element, index) => index + 1);
					this.evolveBarChart.data = {
						labels: newLable,
						datasets: [
							{
								label: "ON",
								backgroundColor: "#7eff66",
								borderColor: "#9b9696",
								borderWidth: 1,
								data: Array.from({ length: 60 }, () =>
									Math.floor(Math.random() * 60)
								),
							},
							{
								label: "OFF",
								backgroundColor: "#f14d4d",
								borderColor: "#9b9696",
								borderWidth: 1,
								data: Array.from({ length: 60 }, () =>
									Math.floor(Math.random() * 60)
								),
							},
						],
					};

					this.chartDataType = "MINUTES";
					this.evolveBarChart.options.title.text = "MINUTES Data";
				}

				if (this.chartDataType == "DAYS") {
					let newLable = Array(24)
						.fill()
						.map((element, index) => index + 1);
					this.evolveBarChart.data = {
						labels: newLable,
						datasets: [
							{
								label: "ON",
								backgroundColor: "#7eff66",
								borderColor: "#9b9696",
								borderWidth: 1,
								data: Array.from({ length: 24 }, () =>
									Math.floor(Math.random() * 24)
								),
							},
							{
								label: "OFF",
								backgroundColor: "#f14d4d",
								borderColor: "#9b9696",
								borderWidth: 1,
								data: Array.from({ length: 24 }, () =>
									Math.floor(Math.random() * 24)
								),
							},
						],
					};

					this.chartDataType = "HOURS";
					this.evolveBarChart.options.title.text = "Hours Data";
				}

				if (this.chartDataType == "MONTH") {
					let newLable = Array(30)
						.fill()
						.map((element, index) => index + 1);
					this.evolveBarChart.data = {
						labels: newLable,
						datasets: [
							{
								label: "ON",
								backgroundColor: "#7eff66",
								borderColor: "#9b9696",
								borderWidth: 1,
								data: Array.from({ length: 30 }, () =>
									Math.floor(Math.random() * 30)
								),
							},
							{
								label: "OFF",
								backgroundColor: "#f14d4d",
								borderColor: "#9b9696",
								borderWidth: 1,
								data: Array.from({ length: 30 }, () =>
									Math.floor(Math.random() * 30)
								),
							},
						],
					};

					this.chartDataType = "DAYS";
					this.evolveBarChart.options.title.text = "Days Data";
				}

				// Month Data
				if (this.chartDataType == "YEAR") {
					let newLable = Array(12)
						.fill()
						.map((element, index) => index + 1);

					this.evolveBarChart.data = {
						labels: newLable,
						datasets: [
							{
								label: "ON",
								backgroundColor: "#7eff66",
								borderColor: "#9b9696",
								borderWidth: 1,
								data: Array.from({ length: 12 }, () =>
									Math.floor(Math.random() * 12)
								),
							},
							{
								label: "OFF",
								backgroundColor: "#f14d4d",
								borderColor: "#9b9696",
								borderWidth: 1,
								data: Array.from({ length: 12 }, () =>
									Math.floor(Math.random() * 12)
								),
							},
						],
					};

					this.chartDataType = "MONTH";
					this.evolveBarChart.options.title.text = "Month Data";
				}
			} catch (error) {}
		},
	},
};
</script>
<style lang="scss">
</style>