'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    generateAuthToken: async function () {
		console.log("######################################### generateAuthToken ##############");
		try {
			let getAllActiveGsp = await Evolve.App.Services.Compliance.eInvoice.SrvGSTReturn.getAllActiveGsp();
			if (getAllActiveGsp instanceof Error || getAllActiveGsp.rowsAffected < 1) {
				Evolve.Log.error("No GSP found");
			} else {
				// console.log("getAllActiveGsp.recordset :",getAllActiveGsp.recordset);
				for (let i = 0; i < getAllActiveGsp.rowsAffected; i++) {
					let getAllActiveGspArr = getAllActiveGsp.recordset[i];
					if (getAllActiveGspArr.EvolveGSP_Code == 'VAYANA') {
						let eInvGD = await Evolve.App.Services.Compliance.eInvoice.SrvGSTReturn.getEInvoiceGSPApi(getAllActiveGspArr.EvolveGSP_ID, 'VAYANAAUTH');
						if (eInvGD instanceof Error || eInvGD.recordset < 1) {
							Evolve.Log.error("Authentication API not found for " + getAllActiveGspArr.EvolveGSP_Code);
						} else {
							let config = {
								headers: {
									'Connection': 'keep-alive',
									'Content-Type': 'application/json'
								}
							}
							let body = {
								"handle": Evolve.EvolveEinvoiceConfig.GSPUSERNAME,
								"password": Evolve.EvolveEinvoiceConfig.GSPPASSWORD,
								"handleType": "email"
							}
							// let responce = await Evolve.Axios.post(eInvGD.recordset[0].EvolveGSPApi_URL, body, config);
                            // Evolve.AuthToken[getAllActiveGspArr.EvolveGSP_Code] = responce.data.data.token;
                            Evolve.AuthToken[getAllActiveGspArr.EvolveGSP_Code] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJBdXRoIiwidWlkIjoiYzEwNTY2NDAtYTMwYS00MGEwLWJkNGItMDY2Y2I3ZWJkN2I2IiwibW9iIjoiKzkxLTkwMzM3MDY2NDMiLCJlbWwiOiJtYXlhbmtAYWxpdGVyc29sdXRpb25zLmNvbSIsImlzcyI6InYtdGhlbyIsIm5hbWUiOiJNYXlhbmsgVXBhZGh5YXkiLCJvcmdzIjpbIntcIm9pZFwiOlwiNGY5YmQ0NTItODc1NS00ODBhLWJmMTAtNDQwZDQ3NmQ5ODM2XCIsXCJwcmltXCI6dHJ1ZSxcImFkbVwiOnRydWUsXCJzZXJ2XCI6W1wiZWFwaVwiXX0iLCJ7XCJvaWRcIjpcIjUzMGQyMGRmLTk2MGYtNDk4OS1iZmQ1LWViMTBmZmQ5YTYxYlwiLFwicHJpbVwiOnRydWUsXCJhZG1cIjp0cnVlLFwic2VydlwiOltcImVhcGlcIl19Iiwie1wib2lkXCI6XCJhYzdlNjc3MS0zNzA2LTQyMjMtODIwNS03MDI5NjQ1ODIzMWNcIixcInByaW1cIjp0cnVlLFwiYWRtXCI6dHJ1ZSxcInNlcnZcIjpbXCJlYXBpXCIsXCJ2c1wiXX0iLCJ7XCJvaWRcIjpcImU1ODQ4MDA5LTY1NTAtNGQ4Zi1hYThhLTEzNDAzMjA2NzUzMlwiLFwicHJpbVwiOnRydWUsXCJhZG1cIjp0cnVlLFwic2VydlwiOltcImVhcGlcIixcInZzXCJdfSJdLCJleHAiOjE2Mjg1NzM2NTIsImlhdCI6MTYyODU3MjQ1Mn0.wuXaxEhy2FfUWX9YhGNO0GmKsfm5jZfh4QDc5PckwtTB_XNVOokhtT4uKCOq58moMqh4g-KSISniaNWMAELpqkEx_NnyTw-pE16HAFGMOAok86v-iVgpSjswlVbtYhnzIEuLbnhVVNbKrJx2yv3m8yZGL5vHfGpG91KGmn31rUoFk0VkYFf8naf1TquP9GbOeBKMI2Z0QhIBookRI9elXVrso1VvwLd3GBQqVkPhDfuRm8g6uMsjjLsMGoNT25UuAUDiye7Lx2PBIeAJKNwZgP4xMrwX_BKgOarm2Fl8H-qzzwU8tThUCd2Q5WnK9SD5E8qF-jIYi3pkIvsSqAK0zQ';
						}
					} else if (getAllActiveGspArr.EvolveGSP_Code == 'CYGNET') {
						let eInvGD = await Evolve.App.Services.Compliance.eInvoice.SrvGSTReturn.getEInvoiceGSPApi(getAllActiveGspArr.EvolveGSP_ID, 'CYGNETAUTH');
						if (eInvGD instanceof Error || eInvGD.recordset < 1) {
							Evolve.Log.error("Authentication API not found for " + getAllActiveGspArr.EvolveGSP_Code);
						} else {
							let config = {
								headers: {
									'client-id': 'oo9Z6eY/pgHeMkJ37mI98yjkGl+I8N4+8KxpzK9HQIs=',
									'client-secret': 'VsjOfezXc16O61FNCIdtZEgpLonGpwdwmq8U5jqv85w9KiX40w5YXb33GrJ9O8O43x/mSAXumikYDr2/oSYoqg==',
									'Content-Type': 'application/json'
								}
							}
							let body = {
								"forceRefresh": false,
								"username": "himanshu@alitersolutions.com",
								"password": "Aliter@123"
							}
							let responce = await Evolve.Axios.post(eInvGD.recordset[0].EvolveGSPApi_URL, body, config);
							Evolve.AuthToken[getAllActiveGspArr.EvolveGSP_Code] = responce.data.token;
							// Evolve.AuthToken[getAllActiveGspArr.EvolveGSP_Code] = "0bb972709b8dd6870345134842dc2ef2821c7915cf249b42182a5ff0bfb4acb6";
						}
					} else if (getAllActiveGspArr.EvolveGSP_Code == 'KPMG') {
						let eInvGD = await Evolve.App.Services.Compliance.eInvoice.SrvGSTReturn.getEInvoiceGSPApi(getAllActiveGspArr.EvolveGSP_ID, 'KPMGAUTH');
						if (eInvGD instanceof Error || eInvGD.recordset < 1) {
							Evolve.Log.error("Authentication API not found for " + getAllActiveGspArr.EvolveGSP_Code);
						} else {
							let config = {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded',
									'Connection': 'keep-alive',
								}
							}
							let body = "client_id=" + getAllActiveGspArr.EvolveGSP_GSPUsername + "&client_secret=" + getAllActiveGspArr.EvolveGSP_GSPSecrateKey + "&grant_type=client_credentials"
							let responce = await Evolve.Axios.post(eInvGD.recordset[0].EvolveGSPApi_URL, body, config);
							Evolve.AuthToken[getAllActiveGspArr.EvolveGSP_Code] = responce.data.access_token
						}
					} else {
						Evolve.Log.error('Please configure api auth token for ' + getAllActiveGspArr.EvolveGSP_Code)
					}
					// console.log('Evolve.AuthToken :', Evolve.AuthToken);
				}
			}
			console.log("responce>>>> Token ", Evolve.AuthToken['VAYANA'])
		} catch (error) {
			Evolve.Log.info('Error in filter Request Data : ' + error);
			// console.log(error.response.data.error.message);
			console.log(error.response.data);

		}
	},

    eInvoiceGenerateGSPJSON: async function (EvolveUnit_ID, EvolveGSPApi_Code) {
		try {
            let eInvGD = await Evolve.App.Services.Compliance.eInvoice.SrvGSTReturn.getEInvoiceGSPApiData(EvolveGSPApi_Code);
            if (eInvGD.rowsAffected > 0) {
                let headersOBJ = {};
                let apiBodyObj = {};
                for (let eGspAPIObj of eInvGD.recordset) {
                    if (eGspAPIObj.eGP == 0 && eGspAPIObj.eGRP == 'REQUEST') {
                        // GET Child :
                        apiBodyObj[eGspAPIObj.eCD] = await Evolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.getTypeAsperDatatype(eGspAPIObj.eCD, eGspAPIObj.eGDT, eGspAPIObj.eGDV, eGspAPIObj.eGD, EvolveUnit_ID, eGspAPIObj.eGID, 0);
                        // Get Child
                        let firstLevel = {};
                        // if (eGspAPIObj.eGDV == 'LIST') {
                        //     console.log("eGspAPIObj >>>>>", eGspAPIObj);

                        //     // let eInvItemList = await Evolve.App.Services.Compliance.eInvoice.SrvGSTReturn.getEinvoiceItemList(EvolveUnit_ID);
                        //     // if (eInvItemList instanceof Error || eInvItemList.rowsAffected < 1) {
                        //     //     Evolve.Log.error("Error / No Item list Found in get eInvItemList Controllers");
                        //     // } else {
                        //     //     //console.log(" eInvItemList.recordset >>>>>", eInvItemList.recordset);
                        //     //     for (let itmObj of eInvItemList.recordset) {
                        //     //         console.log("EvolveEinvoiceLine_ID>>>>>", itmObj.EvolveEinvoiceLine_ID);

                        //     //         for (let eGSC of eInvGD.recordset) {
                        //     //             if (eGSC.eGP == eGspAPIObj.eGID) {
                        //     //                 //console.log("eGSC.eCD>>>", eGSC.eCD);
                        //     //                 firstLeveEvolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.getTypeAsperDatatype(eGSC.eCD, eGSC.eGDT, eGSC.eGDV, eGSC.eGD, EvolveUnit_ID, eGSC.eGID, itmObj.EvolveEinvoiceLine_ID);
                        //     //                 let secondLevel = {};
                        //     //                 for (let eGTC of eInvGD.recordset) {
                        //     //                     // console.log("parentId>>>", parentId);
                        //     //                     if (eGTC.eGP == eGSC.eGID) {
                        //     //                         sEvolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.getTypeAsperDatatype(eGTC.eCD, eGTC.eGDT, eGTC.eGDV, eGTC.eGD, EvolveUnit_ID, eGTC.eGID, itmObj.EvolveEinvoiceLine_ID);
                        //     //                         let fordthLevel = {};
                        //     //                         for (let eGFC of eInvGD.recordset) {
                        //     //                             // console.log("parentId>>>", parentId);
                        //     //                             if (eGFC.eGP == eGTC.eGID) {
                        //     //                          Evolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.getTypeAsperDatatype(eGFC.eCD, eGFC.eGDT, eGFC.eGDV, eGFC.eGD, EvolveUnit_ID, eGFC.eGID, itmObj.EvolveEinvoiceLine_ID);
                        //     //                             }
                        //     //                         }
                        //     //                         if (Object.keys(fordthLevel).length != 0) {
                        //     //                             if (eGTC.eGDV == 'ARRAY') {
                        //     //                                 secondLevel[eGTC.eCD] = new Array(fordthLevel);
                        //     //                             } else {
                        //     //                                 secondLevel[eGTC.eCD] = fordthLevel;
                        //     //                             }
                        //     //                         }
                        //     //                     }
                        //     //                 }

                        //     //                 if (Object.keys(secondLevel).length != 0) {
                        //     //                     if (eGSC.eGDV == 'ARRAY') {
                        //     //                         firstLevel[eGSC.eCD] = new Array(secondLevel);
                        //     //                     } else {
                        //     //                         firstLevel[eGSC.eCD] = secondLevel;
                        //     //                     }
                        //     //                 }
                        //     //             }
                        //     //         }
                        //     //         if (Object.keys(firstLevel).length != 0) {
                        //     //             if (Array.isArray(apiBodyObj[eGspAPIObj.eCD])) {
                        //     //                 apiBodyObj[eGspAPIObj.eCD].push(firstLevel);
                        //     //             } else {
                        //     //                 apiBodyObj[eGspAPIObj.eCD] = new Array;
                        //     //                 apiBodyObj[eGspAPIObj.eCD].push(firstLevel);
                        //     //             }
                        //     //         }
                        //     //         firstLevel = {};
                        //     //     }
                        //     // }


                        // } else {
                        //     for (let eGOC of eInvGD.recordset) {
                        //         if (eGOC.eGP == eGspAPIObj.eGID) {
                        //             firstLevel[eGOC.eCD]Evolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.getTypeAsperDatatype(eGOC.eCD, eGOC.eGDT, eGOC.eGDV, eGOC.eGD, EvolveUnit_ID, eGOC.eGID, 0);
                        //             let secondLevel = {};
                        //             if (eGOC.eGDV == 'LIST') {
                        //                 let eInvItemList = await Evolve.App.Services.Compliance.eInvoice.SrvGSTReturn.getEinvoiceItemList(EvolveUnit_ID);
                        //                 if (eInvItemList instanceof Error || eInvItemList.rowsAffected < 1) {
                        //                     Evolve.Log.error("Error / No Item list Found in get eInvItemList Controllers");
                        //                 } else {
                        //                     //console.log(" eInvItemList.recordset >>>>>", eInvItemList.recordset);
                        //                     for (let itmObj of eInvItemList.recordset) {
                        //                         //console.log("EvolveEinvoiceLine_ID>>>>>", itmObj.EvolveEinvoiceLine_ID);
                        //                         let test = [];
                        //                         for (let eGSC of eInvGD.recordset) {
                        //                             if (eGSC.eGP == eGOC.eGID) {
                        //                                 //console.log("eGSC.eCD>>>", eGSC.eCD);
                        //                                 Evolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.getTypeAsperDatatype(eGSC.eCD, eGSC.eGDT, eGSC.eGDV, eGSC.eGD, EvolveUnit_ID, eGSC.eGID, itmObj.EvolveEinvoiceLine_ID);
                        //                                 let thirdLevel = {};
                        //                                 for (let eGTC of eInvGD.recordset) {
                        //                                     // console.log("parentId>>>", parentId);
                        //                                     if (eGTC.eGP == eGSC.eGID) {
                        //                                 Evolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.getTypeAsperDatatype(eGTC.eCD, eGTC.eGDT, eGTC.eGDV, eGTC.eGD, EvolveUnit_ID, eGTC.eGID, itmObj.EvolveEinvoiceLine_ID);
                        //                                         let fordthLevel = {};
                        //                                         for (let eGFC of eInvGD.recordset) {
                        //                                             // console.log("parentId>>>", parentId);
                        //                                             if (eGFC.eGP == eGTC.eGID) {
                        //                                 Evolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.getTypeAsperDatatype(eGFC.eCD, eGFC.eGDT, eGFC.eGDV, eGFC.eGD, EvolveUnit_ID, eGFC.eGID, itmObj.EvolveEinvoiceLine_ID);
                        //                                             }
                        //                                         }
                        //                                         if (Object.keys(fordthLevel).length != 0) {
                        //                                             if (eGTC.eGDV == 'ARRAY') {
                        //                                                 thirdLevel[eGTC.eCD] = new Array(fordthLevel);
                        //                                             } else {
                        //                                                 thirdLevel[eGTC.eCD] = fordthLevel;
                        //                                             }
                        //                                         }
                        //                                     }
                        //                                 }

                        //                                 if (Object.keys(thirdLevel).length != 0) {
                        //                                     if (eGSC.eGDV == 'ARRAY') {
                        //                                         secondLevel[eGSC.eCD] = new Array(thirdLevel);
                        //                                     } else {
                        //                                         secondLevel[eGSC.eCD] = thirdLevel;
                        //                                     }
                        //                                 }
                        //                             }
                        //                         }
                        //                         if (Object.keys(secondLevel).length != 0) {
                        //                             if (Array.isArray(firstLevel[eGOC.eCD])) {
                        //                                 firstLevel[eGOC.eCD].push(secondLevel);
                        //                             } else {
                        //                                 firstLevel[eGOC.eCD] = new Array;
                        //                                 firstLevel[eGOC.eCD].push(secondLevel);
                        //                             }
                        //                         }
                        //                         secondLevel = {};
                        //                     }
                        //                 }

                        //             } else {
                        //                 for (let eGSC of eInvGD.recordset) {
                        //                     if (eGSC.eGP == eGOC.eGID) {
                        //                         //console.log("eGSC.eGP ::", eGSC.eGP);
                        //                         //console.log("eGOC.eGID ::", eGOC.eGID);

                        //                         secondLeEvolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.getTypeAsperDatatype(eGSC.eCD, eGSC.eGDT, eGSC.eGDV, eGSC.eGD, EvolveUnit_ID, eGSC.eGID, 0);
                        //                         let thirdLevel = {};
                        //                         for (let eGTC of eInvGD.recordset) {
                        //                             // console.log("parentId>>>", parentId);
                        //                             if (eGTC.eGP == eGSC.eGID) {
                        //                                 Evolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.getTypeAsperDatatype(eGTC.eCD, eGTC.eGDT, eGTC.eGDV, eGTC.eGD, EvolveUnit_ID, eGTC.eGID, 0);
                        //                                 let fordthLevel = {};
                        //                                 for (let eGFC of eInvGD.recordset) {
                        //                                     // console.log("parentId>>>", parentId);
                        //                                     if (eGFC.eGP == eGTC.eGID) {
                        //                                 Evolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.getTypeAsperDatatype(eGFC.eCD, eGFC.eGDT, eGFC.eGDV, eGFC.eGD, EvolveUnit_ID, eGFC.eGID, 0);
                        //                                     }
                        //                                 }
                        //                                 if (Object.keys(fordthLevel).length != 0) {
                        //                                     if (eGTC.eGDV == 'ARRAY') {
                        //                                         thirdLevel[eGTC.eCD] = new Array(fordthLevel);
                        //                                     } else {
                        //                                         thirdLevel[eGTC.eCD] = fordthLevel;
                        //                                     }
                        //                                 } else {
                        //                                     if (eGTC.eGDT == 'ARRAY') {
                        //                                         thirdLevel[eGTC.eCD] = new Array(thirdLevel[eGTC.eCD]);
                        //                                     }
                        //                                 }
                        //                             }
                        //                         }
                        //                         if (Object.keys(thirdLevel).length != 0) {
                        //                             console.log("thirdlevel:", thirdLevel);
                        //                             if (eGSC.eGDV == 'ARRAY') {
                        //                                 secondLevel[eGSC.eCD] = new Array(thirdLevel);
                        //                             } else {
                        //                                 secondLevel[eGSC.eCD] = thirdLevel;
                        //                             }
                        //                         } else {
                        //                             if (eGSC.eGDT == 'ARRAY') {
                        //                                 secondLevel[eGSC.eCD] = new Array(secondLevel[eGSC.eCD]);
                        //                             }
                        //                         }
                        //                         //secondLevel = {};

                        //                     }
                        //                 }

                        //                 if (Object.keys(secondLevel).length != 0) {
                        //                     if (eGOC.eGDV == 'ARRAY') {
                        //                         firstLevel[eGOC.eCD] = new Array(secondLevel);
                        //                     } else {
                        //                         firstLevel[eGOC.eCD] = secondLevel;
                        //                     }
                        //                 } else {
                        //                     if (eGOC.eGDT == 'ARRAY') {
                        //                         firstLevel[eGOC.eCD] = new Array(firstLevel[eGOC.eCD]);
                        //                     }
                        //                 }
                        //             }
                        //         }
                        //     }
                        // }

                        if (eGspAPIObj.eGDV == 'ARRAY') {
                            apiBodyObj[eGspAPIObj.eCD] = new Array(firstLevel);
                        }
                        else if (eGspAPIObj.eGDV == 'OBJECT') {
                            apiBodyObj[eGspAPIObj.eCD] = firstLevel;
                        }
                    }
                    if (eGspAPIObj.eGP == 0 && eGspAPIObj.eGRP == 'HEADERS') {
                        headersOBJ[eGspAPIObj.eCD] = await Evolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.getTypeAsperDatatype(eGspAPIObj.eCD, eGspAPIObj.eGDT, eGspAPIObj.eGDV, eGspAPIObj.eGD, EvolveUnit_ID, eGspAPIObj.eGID, 0);
                        
                    }
                }

                // let config = {
                // 	headers: headersOBJ // Orignal 
                // }
                // console.log("config >>>", config);
                // console.log("apiBodyObj >>>", apiBodyObj);
                // console.log("eInvGD.recordset[0].EvolveGSPApi_URL >>>", eInvGD.recordset[0].EvolveGSPApi_URL);

                return {
                    config: { headers: headersOBJ },
                    body: apiBodyObj,
                    url: eInvGD.recordset[0].EvolveGSPApi_URL
                }

            } else {
                return new Error("GSP API DATA NOT FOUND")
            }
				
		} catch (error) {
			Evolve.Log.error('Error in eInvoiceGenerateGSPJSON : ' + error);
			return error;
		}

	},
    getTypeAsperDatatype: async function (code, datatype, defaultValue, isDefault, EvolveUnit_ID, EvolveGSPApiAttributes_ID, EvolveEinvoiceLine_ID) {
		try {
			if (isDefault == true) {
				if (datatype == 'NUMBER') {
					
					return Number(parseFloat(defaultValue).toFixed(2));
				} else {
					if (defaultValue == 'NULL' || defaultValue == 'null') {
						return null;
					} else {
						return defaultValue;
					}
				}
			}
			if (defaultValue == 'X-FLYNN-S-REK') {
				// return Evolve.REKKey;
				return await Evolve.App.Services.Compliance.eInvoice.SrvGSTReturn.getEInvoiceHeaderValueFromUnit(EvolveUnit_ID, 'EvolveUnit_Rek');
			}
			if (defaultValue == 'X-FLYNN-N-IRP-GSTIN' || defaultValue == 'X-FLYNN-N-EWB-GSTIN' || defaultValue == 'X-FLYNN-N-GSTIN') {
				//return Evolve.EvolveEinvoiceConfig.IRPGSTIN;
				return await Evolve.App.Services.Compliance.eInvoice.SrvGSTReturn.getEInvoiceHeaderValueFromUnit(EvolveUnit_ID, 'EvolveUnit_Gstin');
			}
			if (defaultValue == 'X-FLYNN-N-IRP-USERNAME' || defaultValue == 'X-FLYNN-N-EWB-USERNAME') {
				//return Evolve.EvolveEinvoiceConfig.IRPUSERNAME;
				return await Evolve.App.Services.Compliance.eInvoice.SrvGSTReturn.getEInvoiceHeaderValueFromUnit(EvolveUnit_ID, 'EvolveUnit_GstnUser');
			}
			if (defaultValue == 'X-FLYNN-S-IRP-PWD' || defaultValue == 'X-FLYNN-S-EWB-PWD') {
				// return Evolve.AESKey;
				return await Evolve.App.Services.Compliance.eInvoice.SrvGSTReturn.getEInvoiceHeaderValueFromUnit(EvolveUnit_ID, 'EvolveUnit_GstnPassEnc');
			}
			if (defaultValue == 'X-FLYNN-N-ORG-ID') {
				return Evolve.EvolveEinvoiceConfig.ORGANIZATIONID;
			}

			// Auth Token for VAYANA
			if (defaultValue == 'X-FLYNN-N-USER-TOKEN') {
				return Evolve.AuthToken['VAYANA'];
			}

			// Auth Token for CYGNET
			if (defaultValue == 'auth-token') {
				return Evolve.AuthToken['CYGNET'];
			}

			// Auth Token for KPMG
			if (defaultValue == 'Authorization') {
				return "Bearer " + Evolve.AuthToken['KPMG'];
			}

			if (defaultValue == 'OBJECT') {
				return {};
			}
			else if (defaultValue == 'ARRAY') {
				return [];
			} else {
				// let mappingValue = await Evolve.App.Services.Compliance.eInvoice.SrvGSTReturn.getEInvoiceApiAttrValue(EvolveEinvoice_ID, EvolveGSPApiAttributes_ID, EvolveEinvoiceLine_ID);
				// if (mappingValue instanceof Error) {

				// 	if (datatype == 'NUMBER') {
				// 		return Number(parseFloat(defaultValue).toFixed(2));
				// 	} else {
				// 		if (defaultValue == 'NULL' || defaultValue == 'null') {
				// 			return null;
				// 		} else {
				// 			if (isNaN(defaultValue)) {
				// 				defaultValue = defaultValue.replace(new RegExp("'", 'g'), "").trim(); // Remove ' from String.
				// 				defaultValue = defaultValue.replace(new RegExp(",", 'g'), "").trim(); // Remove , from String.
				// 			}
				// 			return defaultValue;
				// 		}
				// 	}

				// } else {
				// 	//console.log("code $$$$$$$$$$$$$$$$$$$$$$$$$$$", code);
				// 	//console.log("mappingValue $$$$$$$$$$$$$$$$$$$$$$$$$$$", mappingValue);
				// 	if (isNaN(mappingValue)) {
				// 		mappingValue = mappingValue.replace(new RegExp("'", 'g'), "").trim(); // Remove ' from String.
				// 		mappingValue = mappingValue.replace(new RegExp(",", 'g'), "").trim(); // Remove , from String.
				// 	}

				// 	if (datatype == 'NUMBER') {
				// 		if (!isNaN(parseFloat(mappingValue)) && isFinite(mappingValue)) {
				// 			console.log("it's number")
				// 			return Number(parseFloat(mappingValue).toFixed(2));
				// 		} else {
				// 			//console.log("is not namber")
				// 			return 0;
				// 		}

				// 	} else {
				// 		// Unit
				// 		if (code == 'Unit' || code == 'uqc' || code == 'qtyUnit') {
				// 			//console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$ UNIT");
				// 			let unitData = await Evolve.App.Services.Compliance.eInvoice.SrvGSTReturn.getEinvoiceUnit(mappingValue);
				// 			if (unitData instanceof Error || unitData.rowsAffected < 1) {
				// 				// return mappingValue;
				// 				return 'UNT'; // For Default
				// 			} else {
				// 				return unitData.recordset[0].EvolveItemUnitMaster_GSPCODE;
				// 			}
				// 		} else {
				// 			return mappingValue;
				// 		}
				// 	}
				// }
			}
		} catch (error) {
			Evolve.Log.info('Error in filter Request Data : ' + error);
			return "";
		}
	},
    SendGSTReturnOTPRequest: async function (req, res) {
        try {
            let errorCode = '';
            let errorMsg = '';
            let ERRORS  = false;
            let EvolveUser_ID = req.EvolveUser_ID;
            let EvolveUnit_ID = req.body.EvolveUnit_ID;
            let OTPRequestID = '';
            console.log("data======",req.body)
            let token = await Evolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.generateAuthToken();
            if(Evolve.AuthToken['VAYANA'] != undefined && Evolve.AuthToken['VAYANA'] != ''){
                let apiObjectData = await Evolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.eInvoiceGenerateGSPJSON(EvolveUnit_ID ,'GSTRETURNOTPREQUEST');
                if (apiObjectData instanceof Error) {
                    errorCode = 'ERRGETAPIJSONDATA';
                    errorMsg = 'Error While Get Api Object Data';
                    ERRORS = true;
                    
                } else {
                    let config = {
                        headers: apiObjectData.config.headers,
                    }
                    let apiBodyObj = apiObjectData.body;
                    
                    console.log("config >>>", config);
                    console.log("apiBodyObj >>>", JSON.stringify(apiBodyObj));
                    console.log("apiObjectData.url >>>", apiObjectData.url);
                    let responce = await Evolve.Axios.post(apiObjectData.url, JSON.stringify(apiBodyObj), config);
                    // console.log("---------------------------------------------");
                    console.log("responce>>>>>>>>>>>>>>>>", responce.data);
                    // console.log("responce>>>>>>>>>>>>>>>>", responce.data.data.otp-request-id);            
                    OTPRequestID = responce.data.data['otp-request-id'];
                }
            }else{
                ERRORS = true;
                errorCode = 'Token Undefined';
                errorMsg = 'Error While Get Token';
            }    
            if (ERRORS == true) {
                let obj = {
                    statusCode: 400,
                    status: errorCode,
                    message: errorMsg,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: OTPRequestID
                };
                res.send(obj);
            }
        } catch (error) {
            console.log("error ====",error)
            // console.log("otp-request-id ====",error.args['otp-request-id'])
            let OTPRequestID = '';
            // if(error.args['otp-request-id'] != undefined){
            //     OTPRequestID = error.args['otp-request-id'];
            // }
            let errorMsgText = "";
			let errorCode = 'GST Return Api Error';
			// if (error.response != undefined) {
			// 	errorMsgText = error.response.data
			// } else {
			// 	errorMsgText = error;
			// }
            if(OTPRequestID != ''){
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: error.message,
                    result: OTPRequestID,
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errorCode,
                    result: errorMsgText,
                };
                res.send(obj);
            }
            console.log("EERR0098: Error while GST OTP Send " + error.message);
        }
    },
    SubmitOTPRequest: async function (req, res) {
        try {
            let errorCode = '';
            let errorMsg = '';
            let ERRORS  = false;
            let EvolveUser_ID = req.EvolveUser_ID;
            let EvolveUnit_ID = req.body.EvolveUnit_ID;
            let OTPRequestID = req.body.OTPRequestID;
            let OTP = req.body.OTP;
            let GSTSessionID = '';
            let GSTTaskID = '';
            let GSTStatusID = '';
            let GSTStatusTotal = '';
            let GSTReturnPage = '';
            let GSTReturnData = [];
            console.log("data======",req.body)
            if(Evolve.AuthToken['VAYANA'] != undefined && Evolve.AuthToken['VAYANA'] != ''){
                let apiObjectData = await Evolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.eInvoiceGenerateGSPJSON(EvolveUnit_ID ,'GSTRETURNSUMBUTOTP');
                if (apiObjectData instanceof Error) {
                    errorCode = 'ERRGETAPIJSONDATA';
                    errorMsg = 'Error While Get GST Submit OTPApi Object';
                    ERRORS = true;
                    
                } else {
                    let config = {
                        headers: apiObjectData.config.headers,
                    }
                    let apiBodyObj = {
                        "otp-request-id" : OTPRequestID,
                        "otp" : OTP
                    };
                    
                    console.log("GSTRETURNSUMBUTOTP config >>>", config);
                    console.log("GSTRETURNSUMBUTOTP apiBodyObj >>>", JSON.stringify(apiBodyObj));
                    console.log("GSTRETURNSUMBUTOTP apiObjectData.url >>>", apiObjectData.url);
                    await Evolve.Axios.post(apiObjectData.url, JSON.stringify(apiBodyObj), config).then(async (error, responce) => {
                        if(error){

                        }else{
                            console.log("GSTRETURNSUMBUTOTP --responce>>>>>>>>>>>>>>>>", responce.data);
                            GSTSessionID = responce.data['gst-session-id'];
                            console.log("GSTSessionID>>>>>>>>>.>>>>>>>", GSTSessionID);
                            let apiObjectData = await Evolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.eInvoiceGenerateGSPJSON(EvolveUnit_ID ,'DOWNLOADGSTRETURNS');
                            if (apiObjectData instanceof Error) {
                                errorCode = 'ERRGETAPIJSONDATA';
                                errorMsg = 'Error While Get Download GST Return Api Object';
                                ERRORS = true;
                            } else {
                                let config = {
                                    headers: apiObjectData.config.headers,
                                }
                                let apiBodyObj = apiObjectData.body;
                                
                                console.log("DOWNLOADGSTRETURNS config >>>", config);
                                console.log("DOWNLOADGSTRETURNS apiBodyObj >>>", JSON.stringify(apiBodyObj));
                                console.log("DOWNLOADGSTRETURNS apiObjectData.url >>>", apiObjectData.url);
                                let responce = await Evolve.Axios.post(apiObjectData.url, JSON.stringify(apiBodyObj), config)
                                console.log("DOWNLOADGSTRETURNS ---responce>>>>>>>>>>>>>>>>", responce.data);
                                GSTTaskID = responce.data['task-id'];
                                console.log("GSTTaskID>>>>>>>>>>>>>>>>", GSTTaskID);  
                            }          

                        }
                    // }).then(async () => {

                    //     let apiObjectData = await Evolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.eInvoiceGenerateGSPJSON(EvolveUnit_ID ,'GETGSTRETURNSTATUS');
                    //     if (apiObjectData instanceof Error) {
                    //         errorCode = 'ERRGETAPIJSONDATA';
                    //         errorMsg = 'Error While Get GST Return Status Api Object';
                    //         ERRORS = true;
                    //     } else {
                    //         let config = {
                    //             headers: apiObjectData.config.headers,
                    //         }
                    //         let apiBodyObj = apiObjectData.body;
                            
                    //         console.log("GETGSTRETURNSTATUS config >>>", config);
                    //         console.log("GETGSTRETURNSTATUS apiBodyObj >>>", JSON.stringify(apiBodyObj));
                    //         console.log("GETGSTRETURNSTATUS apiObjectData.url >>>", apiObjectData.url+GSTTaskID);
                    //         let responce = await Evolve.Axios.post(apiObjectData.url+GSTTaskID, JSON.stringify(apiBodyObj), config)
                    //         console.log("GETGSTRETURNSTATUS ---responce>>>>>>>>>>>>>>>>", responce.data);
                    //         GSTStatusID = responce.data['id'];
                    //         GSTStatusTotal = responce.data.jobs['total'];
                    //         console.log("GSTStatusID>>>>>>>>>>>>>>>>", GSTStatusID);
                    //         console.log("GSTStatusTotal>>>>>>>>>>>>>>>>", GSTStatusTotal);
                    //     }  

                    // }).then(async () => {

                    //     let apiObjectData = await Evolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.eInvoiceGenerateGSPJSON(EvolveUnit_ID ,'GSTRETURNRESULT');
                    //     if (apiObjectData instanceof Error) {
                    //         errorCode = 'ERRGETAPIJSONDATA';
                    //         errorMsg = 'Error While Get GST Return Result Api Object';
                    //         ERRORS = true;
                    //     } else {
                    //         let config = {
                    //             headers: apiObjectData.config.headers,
                    //         }
                    //         let apiBodyObj = apiObjectData.body;
                            
                    //         console.log("GSTRETURNRESULT config >>>", config);
                    //         console.log("GSTRETURNRESULTapiBodyObj >>>", JSON.stringify(apiBodyObj));
                    //         console.log("GSTRETURNRESULT apiObjectData.url >>>", apiObjectData.url+GSTTaskID);
                    //         let responce = await Evolve.Axios.post(apiObjectData.url+GSTTaskID, JSON.stringify(apiBodyObj), config)
                    //         console.log("GSTRETURNRESULT ---responce>>>>>>>>>>>>>>>>", responce.data);
                    //         GSTReturnPage = responce.data.pages;
                    //         console.log("GST Page>>>>>>>>>>>>>>>>", GSTReturnPage);
                    //     }  

                    // }).then(async () => {

                    //     let apiObjectData = await Evolve.App.Controllers.Compliance.eInvoice.ConGSTReturn.eInvoiceGenerateGSPJSON(EvolveUnit_ID ,'GETGSTRETURNDATA');
                    //     if (apiObjectData instanceof Error) {
                    //         errorCode = 'ERRGETAPIJSONDATA';
                    //         errorMsg = 'Error While Get GST Return Result Data Api Object';
                    //         ERRORS = true;
                    //     } else {
                    //         let config = {
                    //             headers: apiObjectData.config.headers,
                    //         }
                    //         let apiBodyObj = apiObjectData.body;
                            
                    //         console.log("GETGSTRETURNDATA config >>>", config);
                    //         console.log("GETGSTRETURNDATA apiBodyObj >>>", JSON.stringify(apiBodyObj));
                    //         console.log("GETGSTRETURNDATA apiObjectData.url >>>", apiObjectData.url+GSTTaskID+'/page/'+GSTReturnPage);
                    //         let responce = await Evolve.Axios.post(apiObjectData.url+GSTTaskID+'/page/'+GSTReturnPage, JSON.stringify(apiBodyObj), config)
                    //         console.log("GETGSTRETURNDATA ---responce>>>>>>>>>>>>>>>>", responce.data);
                    //         GSTReturnData = responce.data;
                    //         // console.log("GST Page>>>>>>>>>>>>>>>>", GSTReturnPage);
                    //     }  

                    // })
                }).catch(err => async function (err) {
						console.log("catch error:::>>>", err.message);
                        ERRORS = true;
                        errorCode = 'API Error';
                        errorMsg = err.message;
						
						
					})
                }
            }else{
                ERRORS = true;
                errorCode = 'Token Undefined';
                errorMsg = 'Error While Get Token';
            }    
            if (ERRORS == true) {
                let obj = {
                    statusCode: 400,
                    status: errorCode,
                    message: errorMsg,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: GSTReturnData
                };
                res.send(obj);
            }
        } catch (error) {
            console.log("error ====",error)
            let errorMsgText = "";
			let errorCode = 'ERROR IN OTP SUBMIT API';
			if (error.response != undefined) {
				errorMsgText = error.response.data
			} else {
				errorMsgText = error;
			}
            let obj = {
                statusCode: 400,
                status: "fail",
                message: errorCode,
                result: errorMsgText,
            };
            res.send(obj);
            console.log("EERR0098: Error while GST OTP Send " + error.message);
        }
    },
}