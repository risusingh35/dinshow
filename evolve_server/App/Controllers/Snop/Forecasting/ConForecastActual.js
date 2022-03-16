'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
	getAllForecastvsActual: async function (req, res) {
		try {
			let ForecastvsActualData = await Evolve.App.Services.Snop.Forecasting.SrvForecastActual.getAllForecastvsActual(req.body.month, req.body.year);
			if (ForecastvsActualData instanceof Error || ForecastvsActualData.rowsAffected < 1) {
				// console.log("ForecastvsActualData:", ForecastvsActualData)
				Evolve.Log.error('Error on ForecastvsActual  data');
				let obj = { statusCode: 400, status: "fail", message: "Forecast vs actual data not exist", result: null };
				res.send(obj);
			} else {


				  //console.log("Data :",  ForecastvsActualData.recordsets[0])

				let RootData = {};
				let branch = [];
				let branchName = [];
				let businessLine = [];
				let businessLineForcastTotal = [];
				let businessLineActualTotal = [];

				let businessLineForcastRegionTotal = [];
				let businessLineActualRegionTotal = [];


				businessLine.push("BRANCH") // Title of Rows
				//Get Uniq Branch & Business Line
				for (let i = 0; i < ForecastvsActualData.recordsets[0].length; i++) 
				{
					// For Region
					if (!branch.includes(ForecastvsActualData.recordsets[0][i].EvolveBranch_Region)) {
						branch.push(ForecastvsActualData.recordsets[0][i].EvolveBranch_Region);
					}
					// For Branch
					if (!branch.includes(ForecastvsActualData.recordsets[0][i].EvolveBranch_Code)) {
						branch.push(ForecastvsActualData.recordsets[0][i].EvolveBranch_Code);
					}
					
					// For Business Line
					if (!businessLine.includes(ForecastvsActualData.recordsets[0][i].EvolveBusinessLine_Code)) {
						businessLine.push(ForecastvsActualData.recordsets[0][i].EvolveBusinessLine_Code);
					}


					// For Total of Business Line Forcast & Actual
					let key = ForecastvsActualData.recordsets[0][i].EvolveBusinessLine_Code + ForecastvsActualData.recordsets[0][i].EvolveBranch_Code;
					businessLineForcastTotal[key] = ForecastvsActualData.recordsets[0][i].EvolveBranchForecast_Value + "";
					if(ForecastvsActualData.recordsets[0][i].EvolveBranchForecast_Value == 0 && ForecastvsActualData.recordsets[0][i].EvolveBranchForecast_Slot == 1 && ForecastvsActualData.recordsets[0][i].EvolveBranchForecast_Status == 'uploaded')
					{
						businessLineForcastTotal[key] = (ForecastvsActualData.recordsets[0][i].EvolveBudgetBranchLink_MonthBudget + ForecastvsActualData.recordsets[0][i].EvolveBudgetBranchLink_Carry)+"" ;
					}
					else
					{
						businessLineForcastTotal[key] = ForecastvsActualData.recordsets[0][i].EvolveBranchForecast_Value + "";
					}
					// businessLineForcastTotal[key] = (ForecastvsActualData.recordsets[0][i].EvolveBranchForecast_Value == 0 || ForecastvsActualData.recordsets[0][i].EvolveBranchForecast_Value == null) ? (ForecastvsActualData.recordsets[0][i].EvolveBudgetBranchLink_MonthBudget + ForecastvsActualData.recordsets[0][i].EvolveBudgetBranchLink_Carry) : ForecastvsActualData.recordsets[0][i].EvolveBranchForecast_Value;
					// console.log('key',key);
					// console.log("businessLineForcastTotal[key] ",businessLineForcastTotal[key]);
					businessLineActualTotal[key] = ForecastvsActualData.recordsets[0][i].EvolveBranchForecast_ActualValue + "";

					// For Get Toatal of Business Line Forcast & Actual AS region wise

					// console.log("key : ",key)
					key = key + ForecastvsActualData.recordsets[0][i].EvolveBranch_Region;
					if(ForecastvsActualData.recordsets[0][i].EvolveBranchForecast_Value == 0 && ForecastvsActualData.recordsets[0][i].EvolveBranchForecast_Slot == 1 && ForecastvsActualData.recordsets[0][i].EvolveBranchForecast_Status == 'uploaded')
					{
						businessLineForcastRegionTotal[key] = (ForecastvsActualData.recordsets[0][i].EvolveBudgetBranchLink_MonthBudget + ForecastvsActualData.recordsets[0][i].EvolveBudgetBranchLink_Carry)+"" ;
						// businessLineForcastRegionTotal[key] = "0" ;
					}
					else
					{
						businessLineForcastRegionTotal[key] = ForecastvsActualData.recordsets[0][i].EvolveBranchForecast_Value + "";
					}
					// businessLineForcastRegionTotal[key] = (ForecastvsActualData.recordsets[0][i].EvolveBranchForecast_Value == 0 || ForecastvsActualData.recordsets[0][i].EvolveBranchForecast_Value == null) ? (ForecastvsActualData.recordsets[0][i].EvolveBudgetBranchLink_MonthBudget + ForecastvsActualData.recordsets[0][i].EvolveBudgetBranchLink_Carry) : ForecastvsActualData.recordsets[0][i].EvolveBranchForecast_Value;
					// console.log('key',key);
					// console.log("businessLineForcastRegionTotal[key] ",businessLineForcastRegionTotal[key]);
					businessLineActualRegionTotal[key] = ForecastvsActualData.recordsets[0][i].EvolveBranchForecast_ActualValue + "";

					// Branch forcast & Actual Value

				}

				businessLine.push("TOTAL BILLING") // Title of Rows

				// console.log("branch :", branch)
				// console.log("businessLine :", businessLine)
				// console.log("businessLineForcastTotal :", businessLineForcastTotal)
				// console.log("businessLineActualTotal :", businessLineActualTotal)
				// console.log("businessLineForcastRegionTotal :", businessLineForcastRegionTotal)
				// console.log("businessLineActualRegionTotal :", businessLineActualRegionTotal)

				// Get Uniq Sum of Forcast as Per Business Line
				let businessLineForcastSum = [];
				let branchForcastSum = [];

				for (let a = 0; a < businessLine.length; a++) {
					for (let b = 0; b < branch.length; b++) {
						//console.log("businessLine[a]+branch[b]", businessLine[a] + branch[b])
						//console.log("Val", businessLineForcastTotal[businessLine[a] + branch[b]])
						if (businessLineForcastTotal[businessLine[a] + branch[b]]) {
							if (businessLineForcastSum[a]) {
								businessLineForcastSum[a] = businessLineForcastSum[a] + parseFloat(businessLineForcastTotal[businessLine[a] + branch[b]]);
							} else {
								businessLineForcastSum[a] = parseFloat(businessLineForcastTotal[businessLine[a] + branch[b]]);
							}
							// For Branch Forcast Value
							if (branchForcastSum[b]) {
								branchForcastSum[b].push(parseFloat(businessLineForcastTotal[businessLine[a] + branch[b]]));
							} else {
								branchForcastSum[b] = [];
								branchForcastSum[b].push(parseFloat(businessLineForcastTotal[businessLine[a] + branch[b]]));
							}
						}
					}
				}
				// console.log("businessLineForcastSum :", businessLineForcastSum)
				// console.log("branchForcastSum :", branchForcastSum)

				let businessLineActualSum = [];
				let branchActualSum = [];
				for (let a = 0; a < businessLine.length; a++) {
					for (let b = 0; b < branch.length; b++) {
						if (businessLineActualTotal[businessLine[a] + branch[b]]) {
							if (businessLineActualSum[a]) {
								businessLineActualSum[a] = businessLineActualSum[a] + parseFloat(businessLineActualTotal[businessLine[a] + branch[b]]);
							} else {
								businessLineActualSum[a] = parseFloat(businessLineActualTotal[businessLine[a] + branch[b]]);
							}

							// For Branch Forcast Value
							if (branchActualSum[b]) {
								branchActualSum[b].push(businessLineActualTotal[businessLine[a] + branch[b]]);
							} else {
								branchActualSum[b] = [];
								branchActualSum[b].push(businessLineActualTotal[businessLine[a] + branch[b]]);
							}

						}
					}
				}

				// console.log("businessLineActualSum :", businessLineActualSum)
				// console.log("branchActualSum :", branchActualSum)

				let tortalForcast = 0;
				let tortalActual = 0;

				let businessLineForANDActSum = [];
				businessLineForANDActSum.push('First Blank For Total Title')
				for (let fa = 1; fa < businessLineForcastSum.length; fa++) {
					businessLineForANDActSum.push(businessLineForcastSum[fa]);
					businessLineForANDActSum.push(businessLineActualSum[fa]);
					tortalForcast = tortalForcast + parseFloat(businessLineForcastSum[fa]);
					tortalActual = tortalActual + parseFloat(businessLineActualSum[fa]);
				}
				businessLineForANDActSum.push(tortalForcast);
				businessLineForANDActSum.push(tortalActual);

				//console.log("businessLineForANDActSum :", businessLineForANDActSum)

				// For Branch Forcast & Actual Value

				tortalForcast = 0;
				tortalActual = 0;

				let branchForcastActual = [];
				// branchForANDActSum.push('First Blank For Total Title')
				for (let fa = 1; fa < branchForcastSum.length; fa++) {
					if (branchForcastSum[fa] != undefined) {
						//console.log("is Array ", fa)
						tortalForcast = 0;
						tortalActual = 0;
						let branchFor = [];
						let branchAct = [];
						for (let f = 0; f < branchForcastSum[fa].length; f++) {
							//console.log("branchForcastSum[fa][f] ", branchForcastSum[fa][f])
							let branchForcastSumTemp = branchForcastSum[fa][f];
							branchForcastSum[fa][f] = (branchForcastSumTemp == 0) ? branchForcastSumTemp : branchForcastSumTemp.toFixed(2);
							branchFor.push(branchForcastSum[fa][f]);
							tortalForcast = tortalForcast + parseFloat(branchForcastSum[fa][f]);
						}
						// if forcast is avilable meanse actual also avilable
						for (let f = 0; f < branchActualSum[fa].length; f++) {
							//console.log("branchActualSum[fa][f] ", branchActualSum[fa][f])
							let branchActualSumTemp = branchActualSum[fa][f];
							branchActualSum[fa][f] = (branchActualSumTemp == 0) ? branchActualSumTemp : parseFloat(branchActualSumTemp).toFixed(2);
							branchAct.push(branchActualSum[fa][f]);
							tortalActual = tortalActual + parseFloat(branchActualSum[fa][f]);
						}
						branchForcastActual[fa] = [];
						for (let x = 0; x < businessLine.length - 2; x++) { //  businessLine use for Just For Loop
							branchForcastActual[fa].push(branchFor[x])
							branchForcastActual[fa].push(branchAct[x])
						}
						tortalForcast = tortalForcast.toFixed(2)
						branchForcastActual[fa].push(tortalForcast)
						branchForcastActual[fa].push(tortalActual)


						// console.log("branchFor :", branchFor)
						// console.log("branchAct :", branchAct)
					}
				}
				//	console.log("branchForcastActual :", branchForcastActual)







				// Region Code


				let region = ['EAST', 'WEST', 'NORTH', 'SOUTH'];


				let businessLineForcastRegionSumEAST = [];
				let businessLineForcastRegionSumWEST = [];
				let businessLineForcastRegionSumNORTH = [];
				let businessLineForcastRegionSumSOUTH = [];


				let businessLineActualRegionSumEAST = [];
				let businessLineActualRegionSumWEST = [];
				let businessLineActualRegionSumNORTH = [];
				let businessLineActualRegionSumSOUTH = [];



				for (let a = 0; a < businessLine.length; a++) {
					for (let b = 0; b < branch.length; b++) {
						for (let r = 0; r < region.length; r++) {
							//  console.log("Region >>>>", businessLine[a]+branch[b]+region[r])
							// console.log("Val >>>>", businessLineForcastRegionTotal[businessLine[a]+branch[b]+region[r]])
							if (businessLineForcastRegionTotal[businessLine[a] + branch[b] + region[r]]) {

								if (region[r] == 'EAST') {
									if (businessLineForcastRegionSumEAST[a]) {
										businessLineForcastRegionSumEAST[a] = businessLineForcastRegionSumEAST[a] + parseFloat(businessLineForcastRegionTotal[businessLine[a] + branch[b] + region[r]]);
									} else {
										businessLineForcastRegionSumEAST[a] = parseFloat(businessLineForcastRegionTotal[businessLine[a] + branch[b] + region[r]]);
									}
								}


								if (region[r] == 'WEST') {
									if (businessLineForcastRegionSumWEST[a]) {
										businessLineForcastRegionSumWEST[a] = businessLineForcastRegionSumWEST[a] + parseFloat(businessLineForcastRegionTotal[businessLine[a] + branch[b] + region[r]]);
									} else {
										businessLineForcastRegionSumWEST[a] = parseFloat(businessLineForcastRegionTotal[businessLine[a] + branch[b] + region[r]]);
									}
								}

								if (region[r] == 'NORTH') {
									if (businessLineForcastRegionSumNORTH[a]) {
										businessLineForcastRegionSumNORTH[a] = businessLineForcastRegionSumNORTH[a] + parseFloat(businessLineForcastRegionTotal[businessLine[a] + branch[b] + region[r]]);
									} else {
										businessLineForcastRegionSumNORTH[a] = parseFloat(businessLineForcastRegionTotal[businessLine[a] + branch[b] + region[r]]);
									}
								}


								if (region[r] == 'SOUTH') {
									if (businessLineForcastRegionSumSOUTH[a]) {
										businessLineForcastRegionSumSOUTH[a] = businessLineForcastRegionSumSOUTH[a] + parseFloat(businessLineForcastRegionTotal[businessLine[a] + branch[b] + region[r]]);
									} else {
										businessLineForcastRegionSumSOUTH[a] = parseFloat(businessLineForcastRegionTotal[businessLine[a] + branch[b] + region[r]]);
									}
								}

							}

							if (businessLineActualRegionTotal[businessLine[a] + branch[b] + region[r]]) {

								if (region[r] == 'EAST') {
									if (businessLineActualRegionSumEAST[a]) {
										businessLineActualRegionSumEAST[a] = businessLineActualRegionSumEAST[a] + parseFloat(businessLineActualRegionTotal[businessLine[a] + branch[b] + region[r]]);
									} else {
										businessLineActualRegionSumEAST[a] = parseFloat(businessLineActualRegionTotal[businessLine[a] + branch[b] + region[r]]);
									}
								}


								if (region[r] == 'WEST') {
									if (businessLineActualRegionSumWEST[a]) {
										businessLineActualRegionSumWEST[a] = businessLineActualRegionSumWEST[a] + parseFloat(businessLineActualRegionTotal[businessLine[a] + branch[b] + region[r]]);
									} else {
										businessLineActualRegionSumWEST[a] = parseFloat(businessLineActualRegionTotal[businessLine[a] + branch[b] + region[r]]);
									}
								}

								if (region[r] == 'NORTH') {
									if (businessLineActualRegionSumNORTH[a]) {
										businessLineActualRegionSumNORTH[a] = businessLineActualRegionSumNORTH[a] + parseFloat(businessLineActualRegionTotal[businessLine[a] + branch[b] + region[r]]);
									} else {
										businessLineActualRegionSumNORTH[a] = parseFloat(businessLineActualRegionTotal[businessLine[a] + branch[b] + region[r]]);
									}
								}


								if (region[r] == 'SOUTH') {
									if (businessLineActualRegionSumSOUTH[a]) {
										businessLineActualRegionSumSOUTH[a] = businessLineActualRegionSumSOUTH[a] + parseFloat(businessLineActualRegionTotal[businessLine[a] + branch[b] + region[r]]);
									} else {
										businessLineActualRegionSumSOUTH[a] = parseFloat(businessLineActualRegionTotal[businessLine[a] + branch[b] + region[r]]);
									}
								}

							}

						}
					}
				}

				// console.log("businessLineForcastRegionSumEAST :", businessLineForcastRegionSumEAST)
				// console.log("businessLineForcastRegionSumWEST :", businessLineForcastRegionSumWEST)
				// console.log("businessLineForcastRegionSumNORTH :", businessLineForcastRegionSumNORTH)
				// console.log("businessLineForcastRegionSumSOUTH :", businessLineForcastRegionSumSOUTH)


				// console.log("businessLineActualRegionSumEAST :", businessLineActualRegionSumEAST)
				// console.log("businessLineActualRegionSumWEST :", businessLineActualRegionSumWEST)
				// console.log("businessLineActualRegionSumNORTH :", businessLineActualRegionSumNORTH)
				// console.log("businessLineActualRegionSumSOUTH :", businessLineActualRegionSumSOUTH)



				tortalForcast = 0;
				tortalActual = 0;

				// FOR EAST
				let businessLineEASTForANDActSum = [];
				businessLineEASTForANDActSum.push('First Blank For Total Title')
				for (let fa = 1; fa < businessLine.length - 1; fa++) {
					businessLineEASTForANDActSum.push(businessLineForcastRegionSumEAST[fa]);
					businessLineEASTForANDActSum.push(businessLineActualRegionSumEAST[fa]);
					tortalForcast = tortalForcast + ((businessLineForcastRegionSumEAST[fa] == undefined) ? 0 : businessLineForcastRegionSumEAST[fa]);
					tortalActual = tortalActual + ((businessLineActualRegionSumEAST[fa] == undefined) ? 0 : businessLineActualRegionSumEAST[fa]);
				}
				businessLineEASTForANDActSum.push(tortalForcast);
				businessLineEASTForANDActSum.push(tortalActual);

				// FOR WEST
				tortalForcast = 0;
				tortalActual = 0;
				let businessLineWESTForANDActSum = [];
				businessLineWESTForANDActSum.push('First Blank For Total Title')
				for (let fa = 1; fa < businessLine.length - 1; fa++) {
					businessLineWESTForANDActSum.push(businessLineForcastRegionSumWEST[fa]);
					businessLineWESTForANDActSum.push(businessLineActualRegionSumWEST[fa]);

					tortalForcast = tortalForcast + ((businessLineForcastRegionSumWEST[fa] == undefined) ? 0 : businessLineForcastRegionSumWEST[fa]);
					tortalActual = tortalActual + ((businessLineActualRegionSumWEST[fa] == undefined) ? 0 : businessLineActualRegionSumWEST[fa]);
				}
				businessLineWESTForANDActSum.push(tortalForcast);
				businessLineWESTForANDActSum.push(tortalActual);

				// FOR NORTH
				tortalForcast = 0;
				tortalActual = 0;
				let businessLineNORTHForANDActSum = [];
				businessLineNORTHForANDActSum.push('First Blank For Total Title')
				for (let fa = 1; fa < businessLine.length - 1; fa++) {
					businessLineNORTHForANDActSum.push(businessLineForcastRegionSumNORTH[fa]);
					businessLineNORTHForANDActSum.push(businessLineActualRegionSumNORTH[fa]);
					tortalForcast = tortalForcast + ((businessLineForcastRegionSumNORTH[fa] == undefined) ? 0 : businessLineForcastRegionSumNORTH[fa]);
					tortalActual = tortalActual + ((businessLineActualRegionSumNORTH[fa] == undefined) ? 0 : businessLineActualRegionSumNORTH[fa]);
				}
				businessLineNORTHForANDActSum.push(tortalForcast);
				businessLineNORTHForANDActSum.push(tortalActual);

				// FOR SOUTH
				tortalForcast = 0;
				tortalActual = 0;
				let businessLineSOUTHForANDActSum = [];
				businessLineSOUTHForANDActSum.push('First Blank For Total Title')
				for (let fa = 1; fa < businessLine.length - 1; fa++) {
					businessLineSOUTHForANDActSum.push(businessLineForcastRegionSumSOUTH[fa]);
					businessLineSOUTHForANDActSum.push(businessLineActualRegionSumSOUTH[fa]);
					tortalForcast = tortalForcast + ((businessLineForcastRegionSumSOUTH[fa] == undefined) ? 0 : businessLineForcastRegionSumSOUTH[fa]);
					tortalActual = tortalActual + ((businessLineActualRegionSumSOUTH[fa] == undefined) ? 0 : businessLineActualRegionSumSOUTH[fa]);
				}
				businessLineSOUTHForANDActSum.push(tortalForcast);
				businessLineSOUTHForANDActSum.push(tortalActual);


				RootData.branch = branch;
				RootData.businessLine = businessLine;
				RootData.businessLineForANDActSum = businessLineForANDActSum;

				// Branch Forcast & Actual Value
				RootData.branchForcastActual = branchForcastActual;

				// Region Sum Data
				RootData.businessLineEASTForANDActSum = businessLineEASTForANDActSum;
				RootData.businessLineWESTForANDActSum = businessLineWESTForANDActSum;
				RootData.businessLineNORTHForANDActSum = businessLineNORTHForANDActSum;
				RootData.businessLineSOUTHForANDActSum = businessLineSOUTHForANDActSum;






				//console.log("RootData :", RootData)

				let obj = { statusCode: 200, status: "success", message: " ForecastvsActual Data Successfully.", result: RootData };
				res.send(obj);
			}
		} catch (error) {
			Evolve.Log.error(error.message);
			let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
			res.send(obj);
		}
	},
}