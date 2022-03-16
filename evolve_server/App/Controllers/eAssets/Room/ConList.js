'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addRooms: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eAssets.Room.SrvList.addRooms(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Query",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Sizes Created Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0136: Error while adding rooms "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0136: Error while adding rooms "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getRooms: async function (req, res) {
        try {
            let start = parseInt(req.body.start);
            let length = parseInt(req.body.length);
            let search = req.body.search.value;

            let getRoomsCount = await Evolve.App.Services.eAssets.Room.SrvList.getRoomsCount();
            let getRooms = await Evolve.App.Services.eAssets.Room.SrvList.getRoomsDatatableList(start, length);

            var obj = {
                'draw': req.body.draw,
                'recordsTotal': getRoomsCount.recordset[0].count,
                'recordsFiltered': getRoomsCount.recordset[0].count,
                'data': getRooms.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0137: Error while getting rooms "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0137: Error while getting rooms "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleRoom: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eAssets.Room.SrvList.getSingleRoom(req.body.EvolveRoom_Id);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on single rooms",
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
            Evolve.Log.error(" EERR0138: Error while getting Single room "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0138: Error while getting Single room "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    editRoom: async function (req, res) {
        try {
            // req.body.EvolveUser_ID = req.EvolveUser_ID
            let userResponse = await Evolve.App.Services.eAssets.Room.SrvList.editRoom(req.body);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Process Updated Successfully",
                result: null
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0139: Error while editing room "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0139: Error while editing room "+error.message,
                result: null
            };
            res.send(obj);
        }
    },


}