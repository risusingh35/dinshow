'use strict';
const Evolve = require('../../../../Boot/Evolve');

module.exports = {

    getAllRackList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let count = await Evolve.App.Services.Wms.rack.SrvList.getAllRackListCount(search);
            let result = await Evolve.App.Services.Wms.rack.SrvList.getAllRackList(start, length, search);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get rack list !",
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
                    message: "Rack Master List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Rack list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting Rack list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addRack: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID == undefined ? null : req.EvolveUnit_ID;
            let response = await Evolve.App.Services.Wms.rack.SrvList.addRack(req.body);
            if (response instanceof Error || response.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on adding new rack !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "new rack added",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while adding rack  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while adding rack  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    selectSingleRack: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let response = await Evolve.App.Services.Wms.rack.SrvList.selectSingleRack(req.body.EvolveRack_ID);
            if (response instanceof Error || response.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on select single rack !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Git Single Rack",
                    result: response.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting single rack  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting single rack  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateRack: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID == undefined ? null : req.EvolveUnit_ID;

            let response = await Evolve.App.Services.Wms.rack.SrvList.updateRack(req.body);

            if (response instanceof Error || response.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in updating new app !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "new app master updated",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while updating rack  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while updating rack  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getLocationList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let response = await Evolve.App.Services.Wms.rack.SrvList.getLocationList(req.body);

            if (response instanceof Error || response.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in Getting Location List !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Location List",
                    result: response.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting loctaion list  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting loctaion list  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getDeviceList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let response = await Evolve.App.Services.Wms.rack.SrvList.getDeviceList(req.body);

            if (response instanceof Error || response.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error getting Device List !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Device List",
                    result: response.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting device list  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting device list  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getItemList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let response = await Evolve.App.Services.Wms.rack.SrvList.getItemList(req.body);

            if (response instanceof Error || response.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in getting item list !",
                    result: response.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Item List",
                    result: response.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting item list  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting item list  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },


    // Rack Details 

    getAllRackDetailsList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let response = await Evolve.App.Services.Wms.rack.SrvList.getAllRackDetailsList(req.body);

            if (response instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in getting rack details list !",
                    result: response.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Rack Details List",
                    result: response.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting rack details list  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting rack details list  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deviceCommand: async function (req, res) {
        try {
            let data = req.body;
            let error = false;
            let errorMessage = '';
            data.EvolveUser_ID = req.EvolveUser_ID;
            // console.log("command>>>>>>>>>", data);

            let getCurrentCount = await Evolve.App.Services.Wms.rack.SrvList.getCurrentCount(data.EvolveRack_ID);
            // console.log("getCurrentCount>>>", getCurrentCount);
            if (getCurrentCount instanceof Error) {
                error = true;
                errorMessage = "ERROR WHILE GETTING CURRENT COUNT";
            }
            else {
                
                data.deviceId = getCurrentCount.recordset[0].EvolveDevice_ID;
                data.itemId = getCurrentCount.recordset[0].EvolveItem_ID;
                data.locationId = getCurrentCount.recordset[0].EvolveLocation_ID;
                data.remainingCount = getCurrentCount.recordset[0].EvolveRack_Capacity - getCurrentCount.recordset[0].EvolveRack_ActualCount;
                if (data.devCommand == 'IN') {
                    if (data.remainingCount < data.quantity) {
                        error = true;
                        errorMessage = "No Space For Item!";
                    }
                    else {
                        data.EvolveRack_ActualCount =parseInt(getCurrentCount.recordset[0].EvolveRack_ActualCount) + parseInt(data.quantity);
                    }
                }
                else if (data.devCommand == 'OUT') {
                    if (data.quantity > getCurrentCount.recordset[0].EvolveRack_ActualCount) {
                        error = true;
                        errorMessage = "There is Less Item In Rack!";
                    }
                    else {
                        data.EvolveRack_ActualCount = parseInt(getCurrentCount.recordset[0].EvolveRack_ActualCount) - parseInt(data.quantity);
                    }
                }
            }
            
            if (error == false) {
                let getDeviceData = await Evolve.App.Services.Wms.rack.SrvList.getDeviceData(data.deviceId);
                // console.log("getDeviceData>>>", getDeviceData);
                if (getDeviceData instanceof Error || getDeviceData.rowsAffected < 1) {
                    error = true;
                    errorMessage = "Error in getting device data";
                }
                else {
                    data.macID = getDeviceData.recordset[0].EvolveDevice_Code;
                    
                    let getItemData = await Evolve.App.Services.Wms.rack.SrvList.getItemData(data.itemId);
                    // console.log("getItemData>>>", getItemData);
                    if (getItemData instanceof Error || getItemData.rowsAffected < 1) {
                        error = true;
                        errorMessage = "Error in getting item data";
                    }
                    else {
                        data.productName = getItemData.recordset[0].EvolveItem_Desc;
                        data.isTaskAutoComplete = getItemData.recordset[0].EvolveItem_IsTaskAutoComplete;
                        let getLocationData = await Evolve.App.Services.Wms.rack.SrvList.getLocationData(data.locationId);
                        if (getLocationData instanceof Error || getLocationData.rowsAffected < 1) {
                            error = true;
                            errorMessage = "Error in getting location data";
                        }
                        else {
                            data.location = getLocationData.recordset[0].EvolveLocation_Code;

                            // IOT device code -- start
                            if (error == false) {
                                
                                // go to iot controller for publish data on mqtt server
                                let wareHouseTaskDataPublish = await Evolve.App.Controllers.Iot.iotControllers.wareHouseTaskDataPublish(data);
                                if (wareHouseTaskDataPublish.statusCode == 200) {
                                    Evolve.Log.info(wareHouseTaskDataPublish.message + "for Device :" + data.macID);
                                }
                                else{
                                    Evolve.Log.error(wareHouseTaskDataPublish.message + "for Device :" + data.macID);
                                    error = true;
                                    errorMessage = "Command Failed";
                                }
                            }
                        // IOT device code -- end
                            
                        }
                    }
                }
            }

            if (error == false) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Command Getting Successfully",
                    result: null
                };
                res.send(obj);
            }
            else{
                 let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errorMessage,
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update actual count  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while update actual count  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deviceResponseToEvolve : async function (data) {
        let error = false;
        let errorMessage = '';
        let rackData = data.T
        let rackArray = rackData.split(",");
        data.rackData = rackArray;
        // console.log("rackArray>>>>", rackArray);
        console.log("data ===============================>>>>>>>>>>>>>", data);

        if (data.A == 'T2') {
            let getCurrentCount = await Evolve.App.Services.Wms.rack.SrvList.getCurrentCount(data.rackData[0]);
            // console.log("getCurrentCount>>>", getCurrentCount);
            if (getCurrentCount instanceof Error) {
                error = true;
                errorMessage = 'ERROR WHHILE GETTNIGCURRENT COUNT RESPONSE FROM P2L';
            }
            else {
                data.remainingCount = getCurrentCount.recordset[0].EvolveRack_Capacity - getCurrentCount.recordset[0].EvolveRack_ActualCount;
                if (data.rackData[2] == 'IN') {
                    if (data.remainingCount < parseInt(data.rackData[3])) {
                        error = true;
                        errorMessage = 'No Space For Item!';
                    }
                    else {
                        data.EvolveRack_ActualCount =parseInt(getCurrentCount.recordset[0].EvolveRack_ActualCount) + parseInt(data.rackData[3]);
                    }
                }
                else if (data.rackData[2] == 'OUT') {
                    if (parseInt(data.rackData[3]) > getCurrentCount.recordset[0].EvolveRack_ActualCount) {
                        error = true;
                        errorMessage = 'There is Less Item In Rack!';
                    }
                    else {
                        data.EvolveRack_ActualCount = parseInt(getCurrentCount.recordset[0].EvolveRack_ActualCount) - parseInt(data.rackData[3]);
                    }
                }
            }
            // console.log("dtaa >>>>", data);
            if (error == false) {
                if (data.rackData[1] != 'null') {
                    let invResponse = await Evolve.App.Services.Wms.rack.SrvList.updateInventoryTaskCompleted(data.rackData[1]);
                    if (invResponse instanceof Error || invResponse.rowsAffected < 1) {
                        error = true;
                        errorMessage = 'Error in update inventory task !';
                    } 
                }
            }

            if (error == false) {
                let response = await Evolve.App.Services.Wms.rack.SrvList.updateActualCount(data);
                // console.log("response>>", response);
                if (response instanceof Error || response.rowsAffected < 1) {
                    error = true;
                    errorMessage = 'Error in update actual count !';
                } 
                // else {
                //     await Evolve.Io.emit('deviceResponseToEvolve', {
                //         message : 'Material Successfully Moved',
                //         data: data
                //     });
                // }
            }

            if (error == false) {
                await Evolve.Io.emit('deviceResponseToEvolve', {
                    message : 'Material Successfully Moved',
                    data: data
                });
            }
            else{
                await Evolve.Io.emit('deviceResponseToEvolve', {
                    message : 'Error In Material Move',
                    data: data
                });

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errorMessage,
                    result: null
                };
                return obj;
            }

        }
        if (data.A == 'T3') {
            await Evolve.Io.emit('deviceResponseToEvolve', {
                message : 'Task Missed',
                data: data
            });
        }
        else if(data.A == 'T1') {
            Evolve.Log.info(" Command is getted by Device....Waiting for ACK ")
        }
        // else{
        //     Evolve.Log.error(" ACK Not Received from Device ")
        // }
        
    },

    getLocationSync : async function (req, res) {
        try {
            let error = false;
            let getRackData = await Evolve.App.Services.Wms.rack.SrvList.getRackData(req.body);
            if (getRackData instanceof Error) {
                error = true;

            } else {
                let getLocationSync = await Evolve.App.Controllers.Iot.iotControllers.getLocationSync(getRackData.recordset[0]);
                console.log("getLocationSync>>>>", getLocationSync);
                
                // if (getLocationSync instanceof Error) {
                //     let obj = {
                //         statusCode: 400,
                //         status: "fail",
                //         message: "Error in getting rack details list !",
                //         result: getLocationSync.message
                //     };
                //     res.send(obj);
                // } else {
                //     let obj = {
                //         statusCode: 200,
                //         status: "success",
                //         message: "Rack Details List",
                //         result: getLocationSync.recordset
                //     };
                //     res.send(obj);
                // }

            }

            

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting rack details list  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting rack details list  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

   


}