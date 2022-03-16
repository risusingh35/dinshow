'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
	getUsersList: async function (req, res) {
		try {
			// let start = parseInt(req.query.start);
			// let length = parseInt(req.query.length);
			let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
			let count = await  Evolve.App.Services.Evolve.User.SrvList.getUserCount(search);
			let list = await Evolve.App.Services.Evolve.User.SrvList.getUsersDatatableList(start, length ,search);
			if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3069 : Error while get user list !",
                    result: list.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: list.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "User list",
                    result: resObj
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
			let result = await Evolve.App.Services.Evolve.User.SrvList.deleteUser(req.body.id);
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
			let result = await Evolve.App.Services.Evolve.User.SrvList.getCompanyListById(req.body);
			if (result instanceof Error || result.rowsAffected < 1) {
				let obj = {
					statusCode: 400,
					status: "fail",
					message: "Error while get Unit List",
					result: null
				};
				res.send(obj);
			}
			else {
				let obj = {
					statusCode: 200,
					status: "success",
					message: "success",
					result: result.recordset
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
			let result = await Evolve.App.Services.Evolve.User.SrvList.CompanyList();
			if (result instanceof Error || result.rowsAffected < 1) {
				let obj = {
					statusCode: 400,
					status: "fail",
					message: "Error while get Company List",
					result: null
				};
				res.send(obj);
			}
			else {
				let obj = {
					statusCode: 200,
					status: "success",
					message: "company List",
					result: result.recordset
				};
				res.send(obj);
			}
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
			let result = await Evolve.App.Services.Evolve.User.SrvList.getRoleList();
			if (result instanceof Error || result.rowsAffected < 1) {
				let obj = {
					statusCode: 400,
					status: "fail",
					message: "Error while get Role List",
					result: null
				};
				res.send(obj);
			}
			else {
				let obj = {
					statusCode: 200,
					status: "success",
					message: "Role List",
					result: result.recordset
				};
				res.send(obj);
			}
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
			let userData = await Evolve.App.Services.Evolve.User.SrvList.selectSingleUser(req.body);
			console.log("userData::::::::::::::::", userData)
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
			// if (req.body.EvolveUser_DefaultMenu_ID == '' || req.body.EvolveUser_DefaultMenu_ID == 'null') {
			// 	req.body.EvolveUser_DefaultMenu_ID = null
			// }
			let passwordMatch = false;
			let noError = false;
			if (req.body.EvolveUser_password != "") {
				let getLastPassword = await Evolve.App.Services.Evolve.User.SrvList.getLastPassword(req.body);
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
				let result = await Evolve.App.Services.Evolve.User.SrvList.updateUser(req.body);
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
			// if (req.body.EvolveUser_DefaultMenu_ID == '' || req.body.EvolveUser_DefaultMenu_ID == 'null') {
			// 	req.body.EvolveUser_DefaultMenu_ID = null
			// }
			let result = await Evolve.App.Services.Evolve.User.SrvList.createUser(req.body);
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
			let result = await Evolve.App.Services.Evolve.User.SrvList.getBranchList();
			if (result instanceof Error || result.rowsAffected < 1) {
				let obj = {
					statusCode: 400,
					status: "fail",
					message: "Error while get Branch List",
					result: null
				};
				res.send(obj);
			}
			else {
				let obj = {
					statusCode: 200,
					status: "success",
					message: "Branch List",
					result: result.recordset
				};
				res.send(obj);
			}
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
			let result = await Evolve.App.Services.Evolve.User.SrvList.getAppList();
			if (result instanceof Error || result.rowsAffected < 1) {
				let obj = {
					statusCode: 400,
					status: "fail",
					message: "error on get App List",
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
			let result = await Evolve.App.Services.Evolve.User.SrvList.getDefaultMenuList(req.body);
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
				let assignBranch = await Evolve.App.Services.Evolve.User.SrvList.assignBranch(req.body, req.body.EvolveBranch_ID[i]);
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
			let deleteBranchData = await Evolve.App.Services.Evolve.User.SrvList.deleteBranchAssignment(req.body);
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
					let assignBranch = await Evolve.App.Services.Evolve.User.SrvList.assignBranch(req.body, req.body.EvolveBranch_ID[i]);
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
}