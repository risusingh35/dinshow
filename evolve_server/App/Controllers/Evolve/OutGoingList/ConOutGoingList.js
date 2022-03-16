'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getOutGoingList : async function (req,res){
        try {
            let getOutGoingList = await Evolve.App.Services.Evolve.OutGoingList.SrvList.getOutGoingList();
            if (getOutGoingList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get OutGoingList !",
                    result: getOutGoingList.message
                };
                res.send(obj);
            } else {
                
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "OutGoingList Get Successfully",
                    result: getOutGoingList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32578: Error while Get OutGoingList Data ! "+error.message);
            let obj = {
              statusCode: 400,
              status: "fail",
              message: " EERR32578: Error while Get OutGoingList Data ! "+error.message,
              result: null
            };
            res.send(obj);
          
        }
    }
}