'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
	getForecastList: async function (req, res) {
		//	console.log("req.EvolveUser_ID ############### : ", req.body.branchId);
		let forecastList = await Evolve.App.Services.Snop.Forecasting.SrvBranch.getForecastList(req.EvolveUser_ID, req.body.branchId);
		if (forecastList instanceof Error) {
			let obj = { statusCode: 400, status: "fail", message: "Error While Fetch Forecast List", result: forecastList.message };
			res.send(obj);
		} else {
			let obj = { statusCode: 200, status: "success", message: "Forecast goted Successfully !", result: forecastList.recordset };
			res.send(obj);
		}
	},

	getForecastListFilter: async function (req, res) {
		let slotCondition = '';
		if (req.body.EvolveBranchForecast_Slot == '0' || req.body.EvolveBranchForecast_Slot == null) {
			slotCondition = "(SELECT MAX(ebbf.EvolveBranchForecast_Slot) FROM EvolveBranchForecast ebbf , EvolveBudgetBranchLink ebbll WHERE ebbll.EvolveBudgetBranchLink_ID = ebbf.EvolveBudgetBranchLink_ID AND ebbll.EvolveBudgetBranchLink_Month = " + req.body.EvolveBudgetBranchLink_Month + " AND ebbll.EvolveBudgetBranchLink_Year = " + req.body.EvolveBudgetBranchLink_Year + ")";
		} else {
			slotCondition = req.body.EvolveBranchForecast_Slot
		}
		let forecastList = await Evolve.App.Services.Snop.Forecasting.SrvBranch.getForecastListFilter(req.body, slotCondition);
		if (forecastList instanceof Error) {
			let obj = { statusCode: 400, status: "fail", message: "Error While Fetch Forecast List", result: forecastList.message };
			res.send(obj);
		} else {
			let obj = { statusCode: 200, status: "success", message: "Forecast goted Successfully !", result: forecastList.recordset };
			res.send(obj);
		}
	},

	saveForecastList: async function (req, res) {
		// req.body.EvolveUser_ID = req.EvolveUser_ID;
		let reqData = req.body;
		let foreCast_error = false;
		for (let i = 0; i < reqData.length; i++) {
			if (foreCast_error == false) {
				reqData[i].EvolveUser_ID = req.EvolveUser_ID;
				let saveforecastList = await Evolve.App.Services.Snop.Forecasting.SrvBranch.saveForecastList(reqData[i]);
				if (saveforecastList instanceof Error) {
					foreCast_error = true;
				}
			}
		}
		if (foreCast_error == true) {
			let obj = { statusCode: 400, status: "fail", message: "Error While save Forecast List", result: "" };
			res.send(obj);
		} else {
			let obj = { statusCode: 200, status: "success", message: "Forecast saved successfully !", result: null };
			res.send(obj);
		}
	},

	updateForecastList: async function (req, res) {
		// req.body.EvolveUser_ID = req.EvolveUser_ID;
		let reqData = req.body.forcastLists;
		let branchId = req.body.branchID;
		//console.log("Branch###########################################", branchId)
		let foreCast_error = false;
		let foreCast_msg = '';
		for (let i = 0; i < reqData.length; i++) {
			if (foreCast_error == false) {
				reqData[i].EvolveUser_ID = req.EvolveUser_ID;
				let checkForecastStatus = await Evolve.App.Services.Snop.Forecasting.SrvBranch.checkForecastStatus(reqData[i]);
				if (checkForecastStatus.recordset[0].EvolveBranchForecast_Status == 'open') {
					let saveforecastList = await Evolve.App.Services.Snop.Forecasting.SrvBranch.updateForecastList(reqData[i]);
					if (saveforecastList instanceof Error) {
						foreCast_error = true;
						foreCast_msg = 'Error While save Forecast List';
					} else {
						let updateForecastHistoryListArray = {
							"EvolveBudgetBranchLink_ID": checkForecastStatus.recordset[0].EvolveBudgetBranchLink_ID,
							"EvolveBranchForecastHistory_Forecast": reqData[i].EvolveBranchForecast_Value,
							"EvolveUser_ID": reqData[i].EvolveUser_ID
						};
						let updateForecastHistoryList = await Evolve.App.Services.Snop.Forecasting.SrvBranch.updateForecastHistoryList(updateForecastHistoryListArray);
						if (updateForecastHistoryList instanceof Error) {
							foreCast_error = true;
							foreCast_msg = 'Error While save Forecast history List';
						}
					}
				} else {
					foreCast_error = true;
					foreCast_msg = 'Forecast is freezed';
				}
			}
		}
		if (foreCast_error == true) {
			let obj = { statusCode: 400, status: "fail", message: foreCast_msg, result: "" };
			res.send(obj);
		} else {
			let obj = { statusCode: 200, status: "success", message: "Forecast saved successfully", result: null };
			res.send(obj);
		}
	},


	closeForecastList: async function (req, res) {
		// req.body.EvolveUser_ID = req.EvolveUser_ID;
		let reqData = req.body;
		let foreCast_error = false;
		for (let i = 0; i < reqData.length; i++) {
			if (foreCast_error == false) {
				reqData[i].EvolveUser_ID = req.EvolveUser_ID;
				let closeBudgetBranch = await Evolve.App.Services.Snop.Forecasting.SrvBranch.closeBudgetBranch(reqData[i]);
				if (closeBudgetBranch instanceof Error) {
					foreCast_error = true;
				} else {
					let closeForecastList = await Evolve.App.Services.Snop.Forecasting.SrvBranch.closeForecastList(reqData[i]);
					if (closeForecastList instanceof Error) {
						foreCast_error = true;
					}
				}
			}
		}
		if (foreCast_error == true) {
			let obj = { statusCode: 400, status: "fail", message: "Error While close Forecast List", result: "" };
			res.send(obj);
		} else {
			let obj = { statusCode: 200, status: "success", message: "Forecast closed successfully", result: null };
			res.send(obj);
		}
	},

	getUserBranchData: async function (req, res) {
		try {
			//	console.log("Req.body #################################", req.body.branchId)
			let getUserBranchData = await Evolve.App.Services.Snop.Forecasting.SrvBranch.getUserBranchData(req.EvolveUser_ID, req.body.branchId);
			if (getUserBranchData instanceof Error || getUserBranchData.recordset < 0) {
				let obj = { statusCode: 400, status: "fail", message: "Branch not found", result: null };
				res.send(obj);
			}
			else {
				let obj = { statusCode: 200, status: "success", message: "Branch Found", result: getUserBranchData.recordset };
				res.send(obj);
			}
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},


	/** Start  : Old Forecasting */

	getOldForecastList: async function (req, res) {
		//	console.log("req.EvolveUser_ID ############### : ", req.body.branchId);
		let oldForecastList = await Evolve.App.Services.Snop.Forecasting.SrvBranch.getOldForecastList(req.EvolveUser_ID, req.body.branchId, req.body.selectedMonth, req.body.selectedYear);
		if (oldForecastList instanceof Error) {
			let obj = { statusCode: 400, status: "fail", message: "Error While Fetch Old Forecast List", result: oldForecastList.message };
			res.send(obj);
		} else {
			let obj = { statusCode: 200, status: "success", message: "Old Forecast goted Successfully !", result: oldForecastList.recordset };
			res.send(obj);
		}
	},


	/** End  : Old Forecasting */

}    