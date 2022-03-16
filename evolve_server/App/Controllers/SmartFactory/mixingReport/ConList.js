'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
  
   


   

      getMixingReportDatatable: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.EvolveProdOrders_OrderNo;
            let condition = "";

            if ((req.body.startDate != '' && req.body.startDate != null && req.body.startDate != undefined )&&  ( req.body.endDate != '' &&  req.body.endDate != null &&  req.body.endDate != undefined)) {
              condition = condition + "AND EvolveMixingParameter_CreatedAt= '" + req.body.startDate + "'OR EvolveMixingParameter_CreatedAt= '" + req.body.endDate + "'  ";
            }
            if (req.body.orderNumber != '' && req.body.orderNumber != null && req.body.orderNumber !=  undefined) {
              condition += " EvolveProdOrders_OrderNo='" + req.body.orderNumber + "' AND "
            }
            if (req.body.machineID != '' && req.body.machineID != null && req.body.machineID != undefined) {
              condition += " AND em.EvolveMachine_ID='" + req.body.machineID + "'  "
            }
            
            console.log("condition????????????", condition );
            
            let Count = await Evolve.App.Services.SmartFactory.mixingReport.SrvList.getMixingReportCount(search,condition);
            let List = await await Evolve.App.Services.SmartFactory.mixingReport.SrvList.getMixingReportDatatableList(start,length,search,condition);
            
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Mixing Report List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: Count.recordset[0].count,
                    records: List.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Mixing Report List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Mixing Report list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Mixing Report list " + error.message,
                result: null
            };
            res.send(obj);
        }
    }, 


      getMachineList: async function (req, res) {
        try {
            let List = await Evolve.App.Services.SmartFactory.mixingReport.SrvList.getMachineList();
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Maachine   List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Maachine   List",
                    result:  List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Maachine  list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Maachine  list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },



  


}
