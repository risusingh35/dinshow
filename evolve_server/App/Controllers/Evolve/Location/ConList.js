'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addLocation: async function (req, res) {
        try {
            if(req.body.EvolveLocation_Rule == "")
            {

                req.body.EvolveLocation_Rule = "NO RULE"
            }
            
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Location.SrvList.addLocation(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while add Location!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Location Added Successfully",
                    result: "Success"
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0290: Error while adding location "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0290: Error while adding location "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getAllLocationGroup: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Location.SrvList.getAllLocationGroup();
            if (result instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Location Group!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0291: Error while getting all location group "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0291: Error while getting all location group "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getLocationList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.Location.SrvList.getLocationListCount(search);
            let result = await Evolve.App.Services.Evolve.Location.SrvList.getLocationList(start, length,search);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Location !",
                    result: null
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: result.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Location list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0292: Error while getting location list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0292: Error while getting location list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSingleLocation: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Location.SrvList.getSingleLocation(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Single Location!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0293: Error while getting single location "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0293: Error while getting single location "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateLocation: async function (req, res) {
        try {

            if(req.body.EvolveLocation_Rule == "")
            {

                req.body.EvolveLocation_Rule = "NO RULE"
            }
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Location.SrvList.updateLocation(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update Location!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Location Updated Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0294: Error while updating location "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0294: Error while updating location "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getStatusCodeTypeList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.Evolve.Location.SrvList.getStatusCodeTypeList();
            if (list instanceof Error ) {
               Evolve.Log.error(" EERR3043: Error while get status code type list ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3043 : Error while get status code type list",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR3044: Error while get status code type list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3044: Error while get status code type list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getStatusCodeList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.Evolve.Location.SrvList.getStatusCodeList(req.body);
            if (list instanceof Error ) {
               Evolve.Log.error(" EERR3045: Error while get status code list ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3045 : Error while get status code list",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR3046: Error while get status code list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3046: Error while get status code list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    csvLocationsUpload : async function(req,res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.csvFile) {
                let csv = req.files.csvFile;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'Item_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/locations/' + fileName, async function (error) {
                    if (error) {
                        // console.log("Error in File Upload ::", error.message);
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let locationArray = await Evolve.Csv().fromFile('./csv/locations/' + fileName);
                        let finalStatus =[]; 
                        for (let i = 0; i < locationArray.length; i++) {
                            let checkLocationStatusCodeExits = await Evolve.App.Services.Evolve.Location.SrvList.checkLocationStatusCodeExits(locationArray[i]['Location Status']);
                            if (checkLocationStatusCodeExits.rowsAffected < 1 || checkLocationStatusCodeExits instanceof Error) {
                                let obj = {
                                    statusCode : 400,
                                     message : 'Invalid Location Status Code For Location ' + locationArray[i]['Location Code'] + '!!!'
                                }
                                finalStatus.push(obj)
                            }
                            else {
                                  let checkLocationExits = await Evolve.App.Services.Evolve.Location.SrvList.checkLocationExits(locationArray[i]['Location Code']);
                                  if (checkLocationExits.rowsAffected < 1 || checkLocationExits instanceof Error) {
                                    let obj = {
                                        statusCode : 400,
                                         message : locationArray[i]['Location Code'] + ' Location Not Found!!!'
                                    }
                                    finalStatus.push(obj)
                                }
                                else{
                                    let locationId = checkLocationExits.recordset[0].EvolveLocation_ID
                                    let statusCodeId = checkLocationStatusCodeExits.recordset[0].EvolveStatusCodeMstr_Id
                                    let updateStatusCode =  await Evolve.App.Services.Evolve.Location.SrvList.updateStatusCode(statusCodeId,locationId)
                                    if (updateStatusCode.rowsAffected < 1 || updateStatusCode instanceof Error) {
                                        let obj = {
                                            statusCode : 400,
                                             message : 'Error While Updating Location ' + locationArray[i]['Location Code'] + '!!!'
                                        }
                                        finalStatus.push(obj)
                                    }
                                    else{
                                        let obj = {
                                            statusCode : 200,
                                             message : 'Update Successsfull for Location ' + locationArray[i]['Location Code'] + '!!!'
                                        }
                                        finalStatus.push(obj)
                                    }
                                }  
                            }
                        }
                        let myobj = {
                            statusCode : 200,
                            status : "Success",
                            message : "Location Updated Successfully",
                            result : finalStatus
                        }
                        res.send(myobj)
                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(" Error while uploading csv locations "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " Error while uploading csv locations "+error.message, result: null };
            res.send(obj);
        }
    }

}