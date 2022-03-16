const Evolve = require('../../Boot/Evolve');
module.exports = {
	loginAuth: function (req, res, next) {
		const rulesSchema = Evolve.Joi.object({
			EvolveUser_EmailID: Evolve.Joi.string().required(),
			EvolveUser_password: Evolve.Joi.string().required(),
		});
		const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
			allowUnknown: false,
			abortEarly: false
		});

		if (validateEvolveData.error) {
			Evolve.Log.error(validateEvolveData.error.toString());
			res.send({
				statusCode: 400,
				status: 'fail',
				message: validateEvolveData.error.toString(),
				result: null
			});
		} else {
			next();
		}
	},
	apiAuth: async function (req, res, next) {
		// console.log("Me Called for Get User Data.......")
		let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
		// console.log("Token:", token)
		if (token.startsWith('Bearer ')) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}
		if (token) {
			try {
				/** Evolve V3 Login Validate code Start Here */
				let EvolveUserAvailabe = false;
				let UserData = {};
				for (let Euser in Evolve.EvolveUsersAuth) {
					if (Evolve.EvolveUsersAuth[Euser].EvolveUserToken == token) {
						//Evolve.Log.info("Evolve User Found....ME");
						//console.log(Evolve.EvolveUsersAuth[Euser]);
						EvolveUserAvailabe = true;
						// Save some Data into Req Object 
						UserData = {
							EvolveUser_ID: Evolve.EvolveUsersAuth[Euser].EvolveUser_ID,
							EvolveUser_EmailID: Evolve.EvolveUsersAuth[Euser].EvolveUser_EmailID,
							EvolveUser_Name: Evolve.EvolveUsersAuth[Euser].EvolveUser_Name,
							EvolveUser_IsActive: Evolve.EvolveUsersAuth[Euser].EvolveUser_IsActive,
							EvolveTest: Evolve.EvolveUsersAuth[Euser].EvolveTest,
							EvolveUnit_ID: Evolve.EvolveUsersAuth[Euser].EvolveUnit_ID,
							//EvolveUser_UserType : Evolve.EvolveUsersAuth[Euser].EvolveUser_UserType,
							EvolveUser_DefaultUrl: Evolve.EvolveUsersAuth[Euser].EvolveUser_DefaultUrl,
							EvolveLanguage_ID: Evolve.EvolveUsersAuth[Euser].EvolveLanguage_ID,
						}
					}
				}

				if (EvolveUserAvailabe) {

					res.send({
						success: true,
						data: UserData
					});
				} else {
					return res.json({
						success: false,
						message: 'Token is not valid'
					});
				}


				/** End Here */






				/** 

				// Let Chek Token Form DB
				let userObj = await Evolve.App.Services.Common.SrvCommon.verifyUserToken(token);
				// console.log("EvolveTokenObj>>>", userObj)
				if (userObj instanceof Error || userObj.rowsAffected < 1) {
					// console.log("Token Not Valid.....")
					return res.json({
						success: false,
						message: 'Token is not valid'
					});
				} else {
					let dataObj = JSON.parse(userObj.recordset[0].EvolveToken_Data);
					res.send({
						success: true,
						data: {
							EvolveUser_ID: dataObj.EvolveUser_ID,
							EvolveUser_EmailID: dataObj.EvolveUser_EmailID,
							EvolveUser_Name: dataObj.EvolveUser_Name,
							EvolveUser_IsActive: dataObj.EvolveUser_IsActive,
							EvolveTest: dataObj.EvolveTest,
							//EvolveUser_UserType : dataObj.EvolveUser_UserType,
							EvolveUser_DefaultUrl: dataObj.EvolveUser_DefaultUrl,
						}
					});
				}

				*/
			} catch (error) {
				Evolve.Log.error(error.message);
				res.send({ statusCode: 400, status: 'fail', message: 'Invalid token', result: null });
			}
		} else {
			console.log("Token Error..")
			return res.json({
				success: false,
				message: 'Auth token is not supplied'
			});
		}

	},
	apiAuthLogout: async function (req, res, next) {
		console.log("Logout Api Called.......", req.headers)
		try {
			let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to 
			if (token.startsWith('Bearer ')) {
				// Remove Bearer from string
				token = token.slice(7, token.length);
			}
			if (token) {
				try {


					for (let Euser in Evolve.EvolveUsersAuth) {
						if (Evolve.EvolveUsersAuth[Euser].EvolveUserToken == token) {
							// Evolve.Log.info("Evolve User Found....");
							 console.log("Evolve.EvolveUsersAuth[Euser].EvolveUser_ID >>>",Evolve.EvolveUsersAuth[Euser].EvolveUser_ID);
							// req.EvolveUser_ID = Evolve.EvolveUsersAuth[Euser].EvolveUser_ID;


							let logData = {
								'EvolveUser_ID' : Evolve.EvolveUsersAuth[Euser].EvolveUser_ID,
								'EvolveLogin_IP' : req.headers.origin,
								'EvolveLogin_Device' : req.headers['user-agent'],
								'EvolveLogin_Mac' : 'NULL'
							}
					
							let onFailedAttempts = await Evolve.App.Services.Common.SrvCommon.onLogOut(logData);

							 
						}
					}

				


					// Let Chek Token Form DB
					let userObj = await Evolve.App.Services.Common.SrvCommon.logoutUserToken(token);
					// console.log("EvolveTokenObj>>>", userObj)
					if (userObj instanceof Error || userObj.rowsAffected < 1) {
						// console.log("Token Not Valid.....")
						res.send({ statusCode: 400, status: 'fail', message: 'Invalid token', result: null });
					} else {
						console.log("Logout Success....")
						res.send({ statusCode: 200, status: 'sucess', message: 'Logout success', result: null });
					}
				} catch (error) {
					Evolve.Log.error(error.message);
					res.send({ statusCode: 400, status: 'fail', message: 'Invalid token', result: null });
				}
			}
		} catch (error) {
			Evolve.Log.error(error.message);
			return res.json({
				success: false,
				message: 'Auth token is not supplied'
			});
		}
	},
	apiAuthorization: async function (req, res, next) {

		// console.log("ENTEREE IPO @@@@@@@@@@#####################")
		let origin = (req.headers.origin == undefined) ? "http://" + req.headers.host : req.headers.origin;
		let menuUrl = req.headers.referer;

		let token = req.headers['x-access-token'] || req.headers['authorization']; // get Token From Header
		if (token.startsWith('Bearer ')) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}
		if (token) {
			try {

				/** Evolve v3 Login Validate code Start Here */

				let EvolveUserAvailabe = true;
				let EvolveUserObj = {};
				for (let Euser in Evolve.EvolveUsersAuth) {
					if (Evolve.EvolveUsersAuth[Euser].EvolveUserToken == token) {
						// Evolve.Log.info("Evolve User Found....");
						EvolveUserAvailabe = true;
						EvolveUserObj = Evolve.EvolveUsersAuth[Euser];
						// Save some Data into Req Object 
						req.EvolveUser_ID = Evolve.EvolveUsersAuth[Euser].EvolveUser_ID;
						req.EvolveCompany_ID = Evolve.EvolveUsersAuth[Euser].EvolveCompany_ID;
						req.EvolveUnit_ID = Evolve.EvolveUsersAuth[Euser].EvolveUnit_ID;
						req.EvolveRole_ID = Evolve.EvolveUsersAuth[Euser].EvolveRole_ID;
						req.EvolveLanguage_ID = Evolve.EvolveUsersAuth[Euser].EvolveLanguage_ID;
						
						req.EvolveRoleList = Evolve.EvolveUsersAuth[Euser].EvolveRoleList;
						req.EvolveUnitList = Evolve.EvolveUsersAuth[Euser].EvolveUnitList;

					}
				}
				if (EvolveUserAvailabe) {

					if (menuUrl != undefined) {
						let rootCheck = menuUrl.replace(origin, "");
						if (rootCheck == '/root') {
							next();
						} else {
							let menuUrlString = req.headers.referer.split("/");
							if (menuUrlString.length < 5) {
								// menuUrl = menuUrlString.join('/')+"%";
								menuUrl = menuUrl.replace(origin, "")
							}
							else {
								menuUrl = "/" + menuUrlString[3] + "/" + menuUrlString[4] + "%"
							}

							let pageData = await Evolve.App.Services.Common.SrvCommon.checkUserPageRights(EvolveUserObj.EvolveUser_ID, EvolveUserObj.EvolveRole_ID, menuUrl);
		
							if (pageData instanceof Error || pageData.rowsAffected < 1) {
								// console.log("you don't have permission to access this api>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
								// res.send({
								// 	statusCode: 400, status: 'fail', message: 'you don\'t have permission to access this api', result: null, redirect: true
								// });
								next(); // Allow Every one to Access All Page 
							} else {
								// console.log("You have Rights ___________________________________________- ");
								next();
							}

						}

					} else {
						res.send({
							statusCode: 400, status: 'fail', message: 'you don\'t have permission to access this api', result: null, redirect: true
						});
						// next(); // Allow Every one to Access All Page 
					}

				} else {
					console.log("Invalid token For Menu Access");
					res.send({ statusCode: 400, status: 'fail', message: 'Invalid token', result: null });
				}


				/** End Here */

				/*
								let userObj = await Evolve.App.Services.Common.SrvCommon.verifyUserToken(token);
								// console.log("EvolveTokenObj>>>", userObj)
								if (userObj instanceof Error || userObj.rowsAffected < 1) {
									// console.log("Token Not Valid.....")
									res.send({ statusCode: 400, status: 'fail', message: 'Invalid token', result: null });
								} else {
									let dataObj = JSON.parse(userObj.recordset[0].EvolveToken_Data);
									req.EvolveUser_ID = dataObj.EvolveUser_ID;
									req.EvolveCompany_ID = dataObj.EvolveCompany_ID;
									req.EvolveUnit_ID = dataObj.EvolveUnit_ID;
									req.EvolveRole_ID = dataObj.EvolveRole_ID;
									if (menuUrl != undefined) {
										let menuUrlString = req.headers.referer.split("/");
										if (menuUrlString.length < 5) {
											// menuUrl = menuUrlString.join('/')+"%";
											menuUrl = menuUrl.replace(origin, "")
										}
										else {
											menuUrl = "/" + menuUrlString[3] + "/" + menuUrlString[4] + "%"
										}
				
										let pageData = await Evolve.App.Services.Common.SrvCommon.checkUserPageRights(dataObj.EvolveUser_ID, dataObj.EvolveRole_ID, menuUrl);
										if (pageData instanceof Error || pageData.rowsAffected < 1) {
											console.log("you don't have permission to access this api")
											res.send({
												statusCode: 400, status: 'fail', message: 'you don\'t have permission to access this api', result: null, redirect: true
											});
											//next(); // Allow Every one to Access All Page 
										} else {
											console.log("You have Rights ")
											next();
										}
				
									} else {
										res.send({
											statusCode: 400, status: 'fail', message: 'you don\'t have permission to access this api', result: null, redirect: true
										});
										// next(); // Allow Every one to Access All Page 
									}
								}
				
								*/
			} catch (error) {
				Evolve.Log.error(error.message);
				res.send({ statusCode: 400, status: 'fail', message: 'Invalid token', result: null });
			}
		} else {
			Evolve.Log.error('Invalid token');
			res.send({ statusCode: 400, status: 'fail', message: 'Invalid token', result: null });
		}
	},
}