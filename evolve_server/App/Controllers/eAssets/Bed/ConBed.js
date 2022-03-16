'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    // bed

    addBeds: async function (req, res) {
        try {
            if (req.body.EvolveBed_RFID.length == 24) {
                let twoChar = req.body.EvolveBed_RFID.charAt(0) + req.body.EvolveBed_RFID.charAt(1);
                if (twoChar == 'e2') {
                    let rfidCompare = await Evolve.App.Services.eAssets.Bed.SrvBed.rfidCompare(req.body);
                    if (rfidCompare instanceof Error || rfidCompare.recordset[0].rfidcount < 1) {
                        let BedMaxId = await Evolve.App.Services.eAssets.Bed.SrvBed.getbedcode(req.body);
                        if (BedMaxId instanceof Error || BedMaxId.rowsAffected < 1) {
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "Error On Get Bad Code",
                                result: null
                            };
                            res.send(obj);
                        } else {
                            let num = parseInt(BedMaxId.recordset[0].EvolveBed_Id) + 1;
                            var str = "" + num;
                            var pad = "0000";
                            var EvolveBed_Code = pad.substring(0, pad.length - str.length) + str; //0001
                            EvolveBed_Code = "BykeThane" + EvolveBed_Code;
                            // let EvolveBedid = BedMaxId.recordset[0].EvolveBed_Id + 1;
                            // let EvolveBed_Code = "BedCode" + EvolveBedid;
                            let result = await Evolve.App.Services.eAssets.Bed.SrvBed.addBeds(req.body, EvolveBed_Code);
                            if (result instanceof Error || result.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: "Error On Add Bed",
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                // Save Data into RAM.
                                await Evolve.App.Controllers.eAssets.MqttController.ConMqttAssets.saveAllbedsIntoRAM();
                                let obj = {
                                    statusCode: 200,
                                    status: "success",
                                    message: "Beds Created Success",
                                    result: null
                                };
                                res.send(obj);
                            }

                        }
                    } else {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "RFID Already Exists",
                            result: null
                        };
                        res.send(obj);
                    }
                }
                else {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "RFID not valid",
                        result: null
                    };
                    res.send(obj);
                }

            }
            else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "RFID not valid",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0099: Error while adding the beds "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0099: Error while adding the beds "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getBeds: async function (req, res) {
        try {
            let start = parseInt(req.body.start);
            let length = parseInt(req.body.length);
            let searchdate = {
                bedCode: req.body.bedCode,
            }

            let getBedsCount = await Evolve.App.Services.eAssets.Bed.SrvBed.getBedsCount(searchdate);
            let getBeds = await Evolve.App.Services.eAssets.Bed.SrvBed.getBedsDatatableList(start, length, searchdate);

            // console.log("getBeds ?>>>", getBeds)
            var obj = {
                'draw': req.body.draw,
                'recordsTotal': getBedsCount.recordset[0].count,
                'recordsFiltered': getBedsCount.recordset[0].count,
                'data': getBeds.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0106: Error while getting the beds "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0106: Error while getting the beds "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getBedsList: async function (req, res) {
        try {

            let getBeds = await Evolve.App.Services.eAssets.Bed.SrvBed.getBedsList();
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Process",
                result: getBeds.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0107: Error while getting the bed list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0107: Error while getting the bed list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleBeds: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eAssets.Bed.SrvBed.getSingleBeds(req.body.EvolveBed_ID);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on single beds",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process",
                    result: result.recordset

                };;
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0108: Error while getting the Single bed "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0108: Error while getting the Single bed "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    editBeds: async function (req, res) {
        try {
            // req.body.EvolveUser_ID = req.EvolveUser_ID
            let result = await Evolve.App.Services.eAssets.Bed.SrvBed.editBeds(req.body);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Bed Updated Successfully",
                result: null
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0109: Error while editing Beds "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0109: Error while editing Beds "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteBeds: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eAssets.Bed.SrvBed.deleteBeds(req.body.id);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Process",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process Deleted Successfully!",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0110: Error while deleting Beds "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0110: Error while deleting Beds "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getallSizes: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eAssets.Bed.SrvBed.getallSizes(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on all size",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0111: Error while getting all sizes "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0111: Error while getting all sizes "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getallTypes: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eAssets.Bed.SrvBed.getallTypes(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on all types",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process",
                    result: result.recordset

                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0112: Error while getting all types "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0112: Error while getting all types "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // bed History
    getBedsHistorylist: async function (req, res) {
        console.log("bed id", req.body.bed_id);
        try {
            let result = await Evolve.App.Services.eAssets.Bed.SrvBed.getBedsHistorylist(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on select process",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0113: Error while getting Beds History List "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0113: Error while getting Beds History List "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getBedsHistory: async function (req, res) {
        try {
            let start = parseInt(req.body.start);
            let length = parseInt(req.body.length);
            let id = parseInt(req.body.bed_id);

            let searchdate = {
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                bed_id: req.body.bed_id,
                inorouttime: req.body.inorouttime,
            }

            // res.send(searchdate);
            //let search = req.body.search.value;
            let getBedsHistoryCount = await Evolve.App.Services.eAssets.Bed.SrvBed.getBedsHistoryCount(searchdate);
            let getBedsHistory = await Evolve.App.Services.eAssets.Bed.SrvBed.getBedsHistoryDatatableList(start, length, searchdate);

            var obj = {
                'draw': req.body.draw,
                'recordsTotal': getBedsHistoryCount.recordset[0].count,
                'recordsFiltered': getBedsHistoryCount.recordset[0].count,
                'data': getBedsHistory.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0114: Error while getting Beds History "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0114: Error while getting Beds History "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // addBedHistory: async function (req, res) {
    //   try {

    //     let result = await Evolve.App.Services.eAssets.Bed.SrvBed.addBedHistory(req.body);
    //     if (result instanceof Error || result.rowsAffected < 1) {
    //       let obj = {
    //         statusCode: 400,
    //         status: "fail",
    //         message: "Error on Query",
    //         result: null
    //       };
    //       res.send(obj);
    //     } else {
    //       let obj = {
    //         statusCode: 200,
    //         status: "success",
    //         message: "Beds history Created Success",
    //         result: null
    //       };
    //       res.send(obj);
    //     }
    //   } catch (error) {
    //     Evolve.Log.error(error.message);
    //     let obj = {
    //       statusCode: 400,
    //       status: "fail",
    //       message: error.message,
    //       result: null
    //     };
    //     res.send(obj);
    //   }
    // },

    getSingleBedHistory: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eAssets.Bed.SrvBed.getSingleBedHistory(req.body.EvolveBedHistory_ID);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on bed History",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process",
                    result: result.recordset

                };;
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0115: Error while getting single bed history "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message:" EERR0115: Error while getting single bed history "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    editBedHistory: async function (req, res) {
        try {
            // req.body.EvolveUser_ID = req.EvolveUser_ID
            let userResponse = await Evolve.App.Services.eAssets.Bed.SrvBed.editBedHistory(req.body);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Process Updated Successfully",
                result: null
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0116: Error while editing bed history "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0116: Error while editing bed history "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getAllRoom: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eAssets.Bed.SrvBed.getAllRoom(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on all room",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process",
                    result: result.recordset

                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0117: Error while getting all room "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0117: Error while getting all room "+error.message,
                result: null
            };
            res.send(obj);
        }
    },







}