'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getParcelList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let Count = await  Evolve.App.Services.eGateControl.Reports.SrvParcel.getParcelCount(search, req.body);

            let parselList = await Evolve.App.Services.eGateControl.Reports.SrvParcel.getParcelList(start, length, search,req.body);
            if (parselList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get parcel list !",
                    parselList: null
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: Count.recordset[0].count,
                    records: parselList.recordset
                }

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Parcel List",
                    result: resObj,
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0197: Error while getting parcel list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0197: Error while getting parcel list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getImageUrl: async function (req, res) {
        try {
            console.log("image body data >>> " , req.body)
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            
            let imageUrl = await Evolve.App.Services.eGateControl.Reports.SrvParcel.getImageUrl(req.body.id);
            if (imageUrl instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " Error while get parcel Image !",
                    imageUrl: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: " ",
                    message: "",
                    result: imageUrl.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0198: Error while getting image url "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0198: Error while getting image url "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

 

    





}