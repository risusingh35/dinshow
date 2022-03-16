'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
	getUsersList: async function (req, res) {
		try {
			let start = parseInt(req.query.start);
			let length = parseInt(req.query.length);
			let users = await Evolve.App.Services.Wms.SoShipment.SrvList.getUsersDatatableList(req.EvolveUser_ID, start, length);
			if (users instanceof Error) {
				let obj = {
					statusCode: 400,
					status: "fail",
					message: "Error while get user list !",
					result: users.message
				};
				res.send(obj);
			} else {
				let obj = {
					statusCode: 200,
					result: users.recordsets[0]
				};
				res.send(obj);
			}
		} catch (error) {
			Evolve.Log.error(" EERR0450: Error while getting users list "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: " EERR0450: Error while getting users list "+error.message,
				result: null
			};
			res.send(obj);
		}
	},

	deleteUser: async function (req, res) {
		try {
			let result = await Evolve.App.Services.Wms.SoShipment.SrvList.deleteUser(req.body.id);
			if (result instanceof Error || result.rowsAffected < 1) {
				let obj = {
					statusCode: 400,
					status: "fail",
					message: "Error while delete User !",
					result: null
				};
				res.send(obj);
			} else {
				let obj = {
					statusCode: 200,
					status: "success",
					message: "User deleted Succsessfully ",
					result: null
				};
				res.send(obj);
			}
		} catch (error) {
			Evolve.Log.error(" EERR0451: Error while deleting the user "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: " EERR0451: Error while deleting the user "+error.message,
				result: null
			};
			res.send(obj);
		}
	},

	getCompanyListById: async function (req, res) {
		try {
			let result = await Evolve.App.Services.Wms.SoShipment.SrvList.getCompanyListById(req.body);
			if (result instanceof Error || result.rowsAffected < 1) {
				let obj = {
					statusCode: 400,
					status: "fail",
					message: "Error while get company cist",
					result: null
				};
				res.send(obj);
			}
			else {
				let obj = {
					statusCode: 200,
					status: "success",
					message: "success get company list ",
					result: result.recordsets[0]
				};
				res.send(obj);
			}
		} catch (error) {
			Evolve.Log.error(" EERR0452: Error while getting company list by Id "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: " EERR0452: Error while getting company list by Id "+error.message,
				result: null
			};
			res.send(obj);
		}
	},

	companyList: async function (req, res) {
		try {
			let companyList = await Evolve.App.Services.Wms.SoShipment.SrvList.CompanyList();
			let obj = {
				statusCode: 200,
				status: "success",
				message: "company List",
				result: companyList.recordsets[0]
			};
			res.send(obj);
		} catch (error) {
			Evolve.Log.error(" EERR0453: Error while getting company list "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: " EERR0453: Error while getting company list "+error.message,
				result: null
			};
			res.send(obj);
		}
	},

	getRoleList: async function (req, res) {
		try {
			let roleList = await Evolve.App.Services.Wms.SoShipment.SrvList.getRoleList();
			let obj = {
				statusCode: 200,
				status: "success",
				message: "Role List",
				result: roleList.recordset
			};
			res.send(obj);
		} catch (error) {
			Evolve.Log.error(" EERR0454: Error while getting role list "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: " EERR0454: Error while getting role list "+error.message,
				result: null
			};
			res.send(obj);
		}
	},

	selectSingleUser: async function (req, res) {
		try {
			let userData = await Evolve.App.Services.Wms.SoShipment.SrvList.selectSingleUser(req.body);
			if (userData instanceof Error || userData.rowsAffected < 1) {
				let obj = {
					statusCode: 400,
					status: "fail",
					message: "Error while get single user",
					result: null
				};
				res.send(obj);
			}
			else {
				let obj = {
					statusCode: 200,
					status: "success",
					message: "User List",
					result: userData
				};
				res.send(obj);
			}
		} catch (error) {
			Evolve.Log.error(" EERR0455: Error while selecting single user "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: " EERR0455: Error while selecting single user "+error.message,
				result: null
			};
			res.send(obj);
		}
	},

	updateUser: async function (req, res) {
		try {
			req.body.EvolveUpdatedUser_ID = req.EvolveUser_ID;
			if (req.body.EvolveUser_DefaultMenu_ID == '' || req.body.EvolveUser_DefaultMenu_ID == 'null') {
				req.body.EvolveUser_DefaultMenu_ID = null
			}
			let passwordMatch = false;
			let noError = false;
			if (req.body.EvolveUser_password != "") {
				let getLastPassword = await Evolve.App.Services.Wms.SoShipment.SrvList.getLastPassword(req.body);
				if (getLastPassword instanceof Error || getLastPassword.rowsAffected < 1) {
					let obj = {
						statusCode: 400,
						status: "fail",
						message: "No user found !",
						result: null
					};
					res.send(obj);
				} else {
					let lastPassword = getLastPassword.recordset[0].EvolveUser_OldPassword;
					let lastPasswordArray = lastPassword.split(",");
					let newPassword = Evolve.Bcrypt.hashSync(req.body.EvolveUser_password, 10);
					for (let i = 0; i < lastPasswordArray.length; i++) {
						if (Evolve.Bcrypt.compareSync(req.body.EvolveUser_password, lastPasswordArray[i])) {
							passwordMatch = true;
						}
					}
					if (passwordMatch == true) {
						let obj = {
							statusCode: 400,
							status: "fail",
							message: "New password does not equal to last three password !",
							result: null
						};
						res.send(obj);
					} else {
						let newPasswordArray = lastPasswordArray;
						newPasswordArray.splice(0, 1);
						newPasswordArray.push(newPassword);
						req.body.EvolveUser_OldPassword = newPasswordArray.toString();
						noError = true;
					}
				}
			} else {
				noError = true;
			}
			if (noError == true) {
				let result = await Evolve.App.Services.Wms.SoShipment.SrvList.updateUser(req.body);
				if (result instanceof Error || result.rowsAffected < 1) {
					let obj = {
						statusCode: 400,
						status: "fail",
						message: "Error while update user !",
						result: null
					};
					res.send(obj);
				} else {
					let obj = {
						statusCode: 200,
						status: "success",
						message: "User updated successfully",
						result: null
					};
					res.send(obj);
				}
			}
		} catch (error) {
			Evolve.Log.error(" EERR0456: Error while updating user "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: " EERR0456: Error while updating user "+error.message,
				result: null
			};
			res.send(obj);
		}
	},

	createUser: async function (req, res) {
		try {
			req.body.EvolveUser_ID = req.EvolveUser_ID;
			if (req.body.EvolveUser_DefaultMenu_ID == '' || req.body.EvolveUser_DefaultMenu_ID == 'null') {
				req.body.EvolveUser_DefaultMenu_ID = null
			}
			let result = await Evolve.App.Services.Wms.SoShipment.SrvList.createUser(req.body);
			if (result instanceof Error || result.rowsAffected < 1) {
				let obj = {
					statusCode: 400,
					status: "fail",
					message: "Error while create user !",
					result: null
				};
				res.send(obj);
			} else {
				let obj = {
					statusCode: 200,
					status: "success",
					message: "User created successfully",
					result: result.recordset[0]
				};
				res.send(obj);
			}
		} catch (error) {
			Evolve.Log.error(" EERR0457: Error while creating user "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: " EERR0457: Error while creating user "+error.message,
				result: null
			};
			res.send(obj);
		}
	},

	getBranchList: async function (req, res) {
		try {
			let getBranchList = await Evolve.App.Services.Wms.SoShipment.SrvList.getBranchList();
			let obj = {
				statusCode: 200,
				status: "success",
				message: "success",
				result: getBranchList.recordset
			};
			res.send(obj);
		} catch (error) {
			Evolve.Log.error(" EERR0458: Error while getting branch list "+error.message);
			let obj = {
				statusCode: 400,
				status: "Erro while getting branch list",
				message: " EERR0458: Error while getting branch list "+error.message,
				result: null
			};
			res.send(obj);
		}
	},
	getAppList: async function (req, res) {
		try {
			let result = await Evolve.App.Services.Wms.SoShipment.SrvList.getAppList();
			let obj = {
				statusCode: 200,
				status: "success",
				message: "success",
				result: result.recordset
			};
			res.send(obj);
		} catch (error) {
			Evolve.Log.error(" EERR0459: Error while getting app list "+error.message);
			let obj = {
				statusCode: 400,
				status: "Erro while getting App list",
				message: " EERR0459: Error while getting app list "+error.message,
				result: null
			};
			res.send(obj);
		}
	},
	getDefaultMenuList: async function (req, res) {
		try {
			let result = await Evolve.App.Services.Wms.SoShipment.SrvList.getDefaultMenuList(req.body);
			if (result instanceof Error || result.rowsAffected < 1) {
				let obj = {
					statusCode: 400,
					status: "fail",
					message: "error on get Menu List",
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
			Evolve.Log.error(" EERR0460: Error while getting default menu list "+error.message);
			let obj = {
				statusCode: 400,
				status: "Erro while getting App list",
				message: " EERR0460: Error while getting default menu list "+error.message,
				result: null
			};
			res.send(obj);
		}
	},

	assignBranch: async function (req, res) {
		try {
			let error = false;
			req.body.EvolveUser_ID = req.EvolveUser_ID;
			for (let i = 0; i < req.body.EvolveBranch_ID.length; i++) {
				let assignBranch = await Evolve.App.Services.Wms.SoShipment.SrvList.assignBranch(req.body, req.body.EvolveBranch_ID[i]);
				if (assignBranch instanceof Error || assignBranch.rowsAffected < 1) {
					let obj = {
						statusCode: 400,
						status: "fail",
						message: "Error while Assigning Branch !",
						result: null
					};
					res.send(obj);
				} else {
					error = false;
				}
			}
			if (error == false) {
				let obj = {
					statusCode: 200,
					status: "success",
					message: "Branch Assigned Succsessfully ",
					result: null
				};
				res.send(obj);
			}
		} catch (error) {
			Evolve.Log.error(" EERR0461: Error while assigning branch "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: " EERR0461: Error while assigning branch "+error.message,
				result: null
			};
			res.send(obj);
		}
	},

	updateBranch: async function (req, res) {
		try {
			let deleteBranchData = await Evolve.App.Services.Wms.SoShipment.SrvList.deleteBranchAssignment(req.body);
			if (deleteBranchData instanceof Error) {
				let obj = {
					statusCode: 400,
					status: "fail",
					message: "Error while update Branch !",
					result: null
				};
				res.send(obj);

			}
			else {
				let error = false;
				req.body.EvolveUser_ID = req.EvolveUser_ID;
				for (let i = 0; i < req.body.EvolveBranch_ID.length; i++) {
					let assignBranch = await Evolve.App.Services.Wms.SoShipment.SrvList.assignBranch(req.body, req.body.EvolveBranch_ID[i]);
					if (assignBranch instanceof Error || assignBranch.rowsAffected < 1) {
						let obj = {
							statusCode: 400,
							status: "fail",
							message: "Error while Assigning Branch !",
							result: null
						};
						res.send(obj);
					} else {
						error = false;
					}
				}
				if (error == false) {
					let obj = {
						statusCode: 200,
						status: "success",
						message: "Branch Assigned Succsessfully ",
						result: null
					};
					res.send(obj);
				}
			}
		} catch (error) {
			Evolve.Log.error(" EERR0462: Error while updating branch "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: " EERR0462: Error while updating branch "+error.message,
				result: null
			};
			res.send(obj);
		}
	},

	demoInsert : async function (req,res){
		try {
			let demoInsert = await Evolve.App.Services.Wms.SoShipment.SrvList.demoInsert(req.body);
			if(demoInsert instanceof Error || demoInsert.rowsAffected < 1) {
				let obj = {
					statusCode : 400 , status : 'fail' , message : "Error While demo insert"  , result : null
				}
				res.send(obj);
			} else {
				let obj = {
					statusCode : 200 , status : 'success' , message : "Demo inserted successfully"  , result : null
				}
				res.send(obj);
			}
		} catch (error) {
			Evolve.Log.error("Error while demo inserting "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: "Error while demo inserting "+error.message,
				result: null
			};
			res.send(obj);
		}
	},

	demoAnkitFormData : async function(req,res) {
		try {
			let demoAnkitFormData = await Evolve.App.Services.Wms.SoShipment.SrvList.demoAnkitFormData(req.body);
		if(demoAnkitFormData instanceof Error || demoAnkitFormData.rowsAffected < 1){
			let obj ={
				statusCode : 400, status : 'fail', message: "Error while Insert Form Data", result:null
			}
			res.send(obj)
		}else{
			let obj={
				statusCode:200, status: 'success', message:'form Data Inserted Successfully', result:null
			}
			res.send(obj)
		}
		} catch (error) {
			Evolve.Log.error("Error while inserting Form Data "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: "Error while inserting Form Data "+error.message,
				result: null
			};
			res.send(obj);
		}
	},

	// SO Shipment -- start
	getShipDetails : async function(req, res) {
		try {
			let displayRecord = parseInt(req.body.displayRecord);
			let startFrom = parseInt(req.body.startFrom);
			let count = await Evolve.App.Services.Wms.SoShipment.SrvList.getShipDetailsCount(req.body.EvolveSoPickList_ShipID);
			let getShipDetails = await Evolve.App.Services.Wms.SoShipment.SrvList.getShipDetails(req.body.EvolveSoPickList_ShipID,displayRecord,startFrom);
		if(getShipDetails instanceof Error || getShipDetails.rowsAffected < 1){
			let obj ={
				statusCode : 400, status : 'fail', message: "Error while get ShipmentData", result:null
			}
			res.send(obj)
		}else{
			let resObj = {
				noOfRecord: count.recordset[0].count,
				records: getShipDetails.recordset
			}
			let obj={
				statusCode:200, status: 'success', message:'SO Shipment Data get Successfully', result:resObj
			}
			res.send(obj)
		}
		} catch (error) {
			Evolve.Log.error("Error while geting SO ShipData "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: "Error while getting SO ShipData "+error.message,
				result: null
			};
			res.send(obj);
		}
	},

	confirmShipment : async function(req, res) {
		try {
			let confirmShipment = await Evolve.App.Services.Wms.SoShipment.SrvList.confirmShipment(req.body);
			if(confirmShipment instanceof Error || confirmShipment.rowsAffected < 1){
				let obj ={
					statusCode : 400, status : 'fail', message: "Error while Confirm Shipment", result:null
				}
				res.send(obj)
			}else{
				let obj={
					statusCode:200, status: 'success', message:'SO Shipment Confirm Sucessfully', result:null
				}
				res.send(obj)
			}
		} catch (error) {
			Evolve.Log.error("Error while inserting Shipment Data--con "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: "Error while inserting Shipment Data--con "+error.message,
				result: null
			};
			res.send(obj);
		}
	},

	getShipmentReport : async function(req,res) {
		try {
			let displayRecord = parseInt(req.body.displayRecord);
			let startFrom = parseInt(req.body.startFrom)
			console.log('display record: '+ displayRecord)
			console.log('startFrom: '+ startFrom)
			let count = await Evolve.App.Services.Wms.SoShipment.SrvList.getShipmentReportCount();
			let getShipmentReport = await Evolve.App.Services.Wms.SoShipment.SrvList.getShipmentReport(displayRecord,startFrom);
			if(getShipmentReport instanceof Error || getShipmentReport.rowsAffected < 1){
				let obj ={
					statusCode : 400, status : 'fail', message: "Error while getting Shipment Report", result:null
				}
				res.send(obj)
			}else{
				let resObj = {
					noOfRecord: count.recordset[0].count,
					records: getShipmentReport.recordset
				}
				
				let obj={
					statusCode:200, status: 'success', message:'SO Shipment get Shipment Report Successfuly', result:resObj
				}
				res.send(obj)
			}
		} catch (error) {
			Evolve.Log.error("Error while getting Shipment Report--con "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: "Error while getting Shipment Report--con "+error.message,
				result: null
			};
			res.send(obj);
		}
	},
	getshipmentReportDetail : async function(req, res) {
		try {
			let getshipmentReportDetail = await Evolve.App.Services.Wms.SoShipment.SrvList.getshipmentReportDetail(req.body.shipID);
			if(getshipmentReportDetail instanceof Error || getshipmentReportDetail.rowsAffected < 1){
				let obj ={
					statusCode : 400, status : 'fail', message: "Error while getting Shipment Report Details", result:null
				}
				res.send(obj)
			}else{
				let obj={
					statusCode:200, status: 'success', message:' get SO Shipment Report Details Successfuly', result:getshipmentReportDetail.recordset
				}
				res.send(obj)
			}
		} catch (error) {
			Evolve.Log.error("Error while getting Shipment Report Details--con "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: "Error while getting Shipment Report Details--con "+error.message,
				result: null
			};
			res.send(obj);
		}
	},

	getshipmentPrintReportDetails : async function(req,res){
			try {
				let report = await Evolve.App.Services.Wms.SoShipment.SrvList.getshipmentPrintReportDetails(req.body.shipID);
				console.log(report);
				if(report instanceof Error || report.rowsAffected < 1){
					let obj ={
						statusCode : 400, status : 'fail', message: "Error while getting print Shipment Report Details", result:null
					}
					res.send(obj)
				}
				else{
					let mydata = report.recordset
					for (let i in mydata){
						let palletdata = await Evolve.App.Services.Wms.SoShipment.SrvList.getprintPalletdata(mydata[i].EvolveSalesOrderLine_Number)
						if(palletdata instanceof Error || palletdata.rowsAffected < 1){
							let obj ={
								statusCode : 400, status : 'fail', message: "Error while getting print Shipment Report pallet Details", result:null
							}
							res.send(obj)
						}
						else{
							mydata[i].palletdetail = palletdata.recordset
						}
					}
					let obj={
						statusCode:200, status: 'success', message:' get print SO Shipment Report Details Successfuly', result:mydata
					}
					res.send(obj)

				}

			} catch (error) {
				Evolve.Log.error("Error while getting print Shipment Report Details--con "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: "Error while getting print Shipment Report Details--con "+error.message,
				result: null
			};
			res.send(obj);
			}

	},
	getstaticshipmentPrintReportDetails : async function(req,res){
		try {
			
			let getcustomerShiptodetail = await Evolve.App.Services.Wms.SoShipment.SrvList.getcustomerShiptodetail(req.body.shipID);
			let getcustomerBilltodetail = await Evolve.App.Services.Wms.SoShipment.SrvList.getcustomerBilltodetail(req.body.shipID);
			let basicdetail = await Evolve.App.Services.Wms.SoShipment.SrvList.getbasicDetail(req.body.shipID);
		
			if(getcustomerShiptodetail instanceof Error || getcustomerShiptodetail.rowsAffected < 1 || getcustomerBilltodetail instanceof Error || getcustomerBilltodetail.rowsAffected < 1 || basicdetail instanceof Error || basicdetail.rowsAffected < 1 ){
				let obj ={
					statusCode : 400, status : 'fail', message: "Error while getting get static shipment Print Report Details", result:null
				}
				res.send(obj)
			}
			else{
				let resObj = {
					shipto : getcustomerShiptodetail.recordset,
					billto : getcustomerBilltodetail.recordset,
					basicdetail : basicdetail.recordset
				}
				let obj={
					statusCode:200, status: 'success', message:' get print SO Shipment Report Details Successfuly', result:resObj
				}
				res.send(obj)
			}

		} catch (error) {
			Evolve.Log.error("Error while getting static print Shipment Report Details--con "+error.message);
			let obj = {
				statusCode: 400,
				status: "fail",
				message: "Error while getting static print Shipment Report Details--con "+error.message,
				result: null
			};
			res.send(obj);
		}
	}
	//So Shipment -- End

}