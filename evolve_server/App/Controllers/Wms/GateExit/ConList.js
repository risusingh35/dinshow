"use strict";
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

	// start function getallInvoice
	getallInvoice: async function (req, res) {
		try {
			let result = await Evolve.App.Services.Wms.GateExit.SrvList.getallInvoice(
				req.body
			);
			if (result instanceof Error || result.rowsAffected < 1) {
				let obj = {
					statusCode: 400,
					status: "fail",
					message: "Not invoice data",
					result: null
				};
				res.send(obj);
			} else {
				let obj = {
					statusCode: 200,
					status: "success",
					message: "Invoice data",
					result: result.recordset
				};
				res.send(obj);
			}
		} catch (error) {
			Evolve.Log.error(" EERR0968: Error while getting all Invoice "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: " EERR0968: Error while getting all Invoice "+error.message,
				result: null
			};
			res.send(obj);
		}
	},
	// end function getallInvoice
	// start function getallInvoiceDo
	getallInvoiceDo: async function (req, res) {
		try {
			let getSingleInvoice = await Evolve.App.Services.Wms.GateExit.SrvList.getSingleInvoice(req.body);
			if (getSingleInvoice instanceof Error || getSingleInvoice.rowsAffected < 1) {
				let obj = {
					statusCode: 400,
					status: "fail",
					message: "Invoice data not found",
					result: null
				};
				res.send(obj);
			}
			else {
				let getDoSoNo = await Evolve.App.Services.Wms.GateExit.SrvList.getDoSoNo(getSingleInvoice.recordset[0].EvolveInvoice_SONumber);
				if (getDoSoNo instanceof Error || getDoSoNo.rowsAffected < 1) {
					let obj = {
						statusCode: 400,
						status: "fail",
						message: "DO not found",
						result: null
					};
					res.send(obj);
				}
				else {
					let obj = {
						statusCode: 200,
						status: "success",
						message: "suceess",
						result: getDoSoNo.recordset
					};
					res.send(obj);
				}
			}
		}
		catch (error) {
			Evolve.Log.error(" EERR0969: Error while getting all Invoice Do "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: " EERR0969: Error while getting all Invoice Do "+error.message,
				result: null
			};
			res.send(obj);
		}
	},
	//end function getallInvoiceDo
	// start function getDoSoInvoice
	getDoSoInvoice: async function (req, res) {
		try {
			let getSingleInvoice = await Evolve.App.Services.Wms.GateExit.SrvList.getSingleInvoice(req.body);
			if (getSingleInvoice instanceof Error || getSingleInvoice.rowsAffected < 1) {
				let obj = {
					statusCode: 400,
					status: "fail",
					message: "Invoice data not found",
					result: null
				};
				res.send(obj);
			}
			else {
				let getDoSoNo = await Evolve.App.Services.Wms.GateExit.SrvList.getDoSoNo(getSingleInvoice.recordset[0].EvolveInvoice_SONumber);
				if (getDoSoNo instanceof Error || getDoSoNo.rowsAffected < 1) {
					let obj = {
						statusCode: 400,
						status: "fail",
						message: "DO line not found",
						result: null
					};
					res.send(obj);
				}
				else {
					let getSingleSalesOrder = await Evolve.App.Services.Wms.GateExit.SrvList.getSingleSalesOrder(getSingleInvoice.recordset[0].EvolveInvoice_SONumber);
					if (getSingleSalesOrder instanceof Error || getSingleSalesOrder.rowsAffected < 1) {
						let obj = {
							statusCode: 400,
							status: "fail",
							message: "SO data not found",
							result: null
						};
						res.send(obj);
					}
					else {
						let result = [getSingleInvoice.recordset, getDoSoNo.recordset, getSingleSalesOrder.recordset];
						let obj = {
							statusCode: 200,
							status: "success",
							message: "suceess",
							result: result
						};
						res.send(obj);
					}
				}
			}
		}
		catch (error) {
			Evolve.Log.error(" EERR0970: Error while getting Do So Invoice "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: " EERR0970: Error while getting Do So Invoice "+error.message,
				result: null
			};
			res.send(obj);
		}
	},
	// end function getDoSoInvoice
	// start function getexit table data
	getExitTableDate: async function (req, res) {
		try {
			let result = await Evolve.App.Services.Wms.GateExit.SrvList.getExitTableDate(req.body);
			if (result instanceof Error || result.rowsAffected < 1) {
				let obj = {
					statusCode: 400,
					status: "fail",
					message: "table data Not found",
					result: null
				};
				res.send(obj);
			} else {
				let obj = {
					statusCode: 200,
					status: "success",
					message: "success",
					result: result.recordset
				};
				res.send(obj);
			}
		} catch (error) {
			Evolve.Log.error(" EERR0971: Error while getting exit table data  "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: " EERR0971: Error while getting exit table data  "+error.message,
				result: null
			};
			res.send(obj);
		}
	},
	// end function get Exit Table data

	//start function addGetExit
	addGetExit: async function (req, res) {
		try {
			req.body.EvolveUser_ID = req.EvolveUser_ID;
			let exitGateNo = await Evolve.App.Controllers.Unit.unitControllers.getExitGateNumber();
			req.body.EvolveGateExit_SerialNo = exitGateNo.recordset[0].EvolveUnitConfig_Value;
			let exitGateError = false;
			let getdoNumber = await Evolve.App.Services.Wms.GateExit.SrvList.getdoNumber(req.body.EvolveDO_ID);
			if (getdoNumber instanceof Error || getdoNumber.rowsAffected < 1) {
				exitGateError = true;
			}
			else {
				req.body.EvolveDO_Number = getdoNumber.recordset[0].EvolveDO_Number;
				for (let i = 0; i < req.body.EvolveDOLine.length; i++) {
					if (exitGateError == false) {
						let EvolveDOLine_ID = req.body.EvolveDOLine[i].EvolveDOLine_ID;
						let getdolineNumber = await Evolve.App.Services.Wms.GateExit.SrvList.getdolineNumber(EvolveDOLine_ID);
						if (getdolineNumber instanceof Error || getdolineNumber.rowsAffected < 1) {
							exitGateError = true;
						}
						else {
							req.body.EvolveDOLine_Number = getdolineNumber.recordset[0].EvolveDOLine_Number;
							let result = await Evolve.App.Services.Wms.GateExit.SrvList.addGetExit(req.body);
							if (result instanceof Error || result.rowsAffected < 1) {
								exitGateError = true;
							}
							else {
								let InvoiceStatus = await Evolve.App.Services.Wms.GateExit.SrvList.updateInvoiceStatus(req.body);
								let InvoiceLineStatus = await Evolve.App.Services.Wms.GateExit.SrvList.updateInvoiceLineStatus(req.body);
								let DOStatus = await Evolve.App.Services.Wms.GateExit.SrvList.updateDOStatus(req.body);
								let DOLineStatus = await Evolve.App.Services.Wms.GateExit.SrvList.updateDOLineStatus(EvolveDOLine_ID);
								let getSOLine_Id = await Evolve.App.Services.Wms.GateExit.SrvList.getSOLine_Id(EvolveDOLine_ID);
								let SOLineStatus = await Evolve.App.Services.Wms.GateExit.SrvList.updateSOLineStatus(getSOLine_Id.recordset[0].EvolveSalesOrderLine_ID);
								let getOpenSOLineCnt = await Evolve.App.Services.Wms.GateExit.SrvList.getOpenSOLineCnt(req.body);
								if (parseInt(getOpenSOLineCnt.recordset[0].openSoLines) == 0) {
									let updateSoStatusByNumber = await Evolve.App.Services.Wms.GateExit.SrvList.updateSoStatusByNumber(req.body);
								}
							}
						}
					}
				}
			}
			if (exitGateError == true) {
				let obj = {
					statusCode: 400,
					status: "fail",
					message: "not data add",
					result: null
				};
				res.send(obj);
			} else {
				let obj = {
					statusCode: 200,
					status: "success",
					message: "Gate exit no : " + req.body.EvolveGateExit_SerialNo,
					result: null
				};
				res.send(obj);
				let updateexitGateNo = await Evolve.App.Controllers.Unit.unitControllers.updateExitGateNumber();
			}
		} catch (error) {
			Evolve.Log.error(" EERR0972: Error while adding get exit "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: " EERR0972: Error while adding get exit "+error.message,
				result: null
			};
			res.send(obj);
		}
	},
	// end function addGetExit
};
