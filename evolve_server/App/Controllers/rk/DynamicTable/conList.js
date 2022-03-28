'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.rk.DynamicTable.srvList.getList();
               console.log("listtttttttttttttttttttttttttttttttttttttttttt",list)
     
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR####: Error while get EvolveDynamicTable_Admins ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "EvolveDynamicTable_Admins ",
                    result: list
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get EvolveDynamicTable_Admins " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR####: Error while get EvolveDynamicTable_Admins ",
                result: null
            };
            res.send(obj);
        }
    },
    
}