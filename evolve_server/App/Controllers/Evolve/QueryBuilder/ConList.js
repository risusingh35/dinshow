'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getEvolveTableList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.Evolve.QueryBuilder.SrvList.getEvolveTableList();
            if (list instanceof Error || list.rowsAffected < 1 ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2589: Error while get table list !",
                    result: null
                };
                res.send(obj);
            } else{
                // console.log(list.recordset);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "tables",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2590: Error while get table list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2590: Error while get tables "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getTableFields: async function (req, res) {
        try {
            // console.log(req.body)
            let list = await Evolve.App.Services.Evolve.QueryBuilder.SrvList.getTableFields(req.body);
            if (list instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2591: Error while get table fields !",
                    result: null
                };
                res.send(obj);
            } else if(list.rowsAffected < 1){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "tables not found",
                    result: null
                };
                res.send(obj);

            }else{
                list.recordset.reverse();
                for(let i =0 ; i<req.body.table.length ; i++){
                    list.recordset.push({
                        Table_Name : req.body.table[i],
                        COLUMN_NAME : '*'
                    })
                }
                list.recordset.reverse();
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "tables",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2592: Error while get table fields "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2592: Error while get tables fields "+error.message,
                result: null
            };
            res.send(obj);
        }
    },   

    getQueryData: async function (req, res) {
        try {
            // let start = parseInt(req.body.startFrom);
            // let length = parseInt(req.body.displayRecord);
            // let search = req.body.search;
            // let count = await Evolve.App.Services.Evolve.QueryBuilder.SrvList.getQueryDataCount(req.body);
            let list = await Evolve.App.Services.Evolve.QueryBuilder.SrvList.getQueryDataList(req.body);
            if (list instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: list.message,
                    result: []
                };
                res.send(obj);
            } else if(list.rowsAffected < 1){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: list.message,
                    result: []
                };
                res.send(obj);
            }
            else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Suuccess",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2584: Error while Get Query Data "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2584: Error while Get Query Data "+error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
    
}