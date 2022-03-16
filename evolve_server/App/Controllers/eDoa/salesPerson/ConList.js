'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getSalesPersonList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.eDoa.salesPerson.SrvList.getSalesPersonListCount(search ,req.EvolveUser_ID);
            let result = await Evolve.App.Services.eDoa.salesPerson.SrvList.getSalesPersonList(start, length, search ,req.EvolveUser_ID);
            if (result instanceof Error) {
            
                Evolve.Log.error(" EERR####: Error while get sales person list ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get sales person list!",
                    result: result.message
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
                    message: "success",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get sales person list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get sales person list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addSalesPerson: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.salesPerson.SrvList.addSalesPerson(req.EvolveUser_ID, req.body);
            if(result instanceof Error || result.rowsAffected < 1){
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR#### : Error while add sales person ",
                result: null
                };
                res.send(obj);
            }else{   
                let obj = {
                statusCode: 200,
                status: "success",
                message: "sales person added Succesfully",
                result: null
                };
                res.send(obj);          
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while add sales person "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while add sales person "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateSalesPerson : async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.salesPerson.SrvList.updateSalesPerson(req.EvolveUser_ID, req.body);
            if(result instanceof Error || result.rowsAffected < 1){
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR#### : Error while update sales person ",
                result: null
                };
                res.send(obj);
            }else{   
                let obj = {
                statusCode: 200,
                status: "success",
                message: "sales person updated Succesfully",
                result: null
                };
                res.send(obj);          
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update sales person "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while update sales person "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteSalesPerson : async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.salesPerson.SrvList.deleteSalesPerson(req.body.EvolveSalesPerson_ID);
            if(result instanceof Error || result.rowsAffected < 1){
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR#### : Error while delete sales perosn ",
                result: null
                };
                res.send(obj);
            }else{   
                let obj = {
                statusCode: 200,
                status: "success",
                message: "sales perosn deleted Succesfully",
                result: null
                };
                res.send(obj);          
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while delete sales perosn "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while delete sales perosn "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    uploadSalesPersonCsv : async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.fileData) {
                let csv = req.files.fileData;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'salesPerson_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;
                
                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/doa/' + fileName, async function (error) {
                    if (error) {
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let csvDataArray = await Evolve.Csv().fromFile('./csv/doa/' + fileName);
                      
                        let errorMessage = 'Error While Upload Sales Person Master!!';
                        let errorStatus = false;
                        // if (errorStatus == false) {
                        //     for (let i = 0; i < csvDataArray.length; i++) {
                        //         if (csvDataArray[i]['Sort Name'] == '' || csvDataArray[i]['Sort Name'] == undefined) {
                        //             errorStatus = true;
                        //             errorMessage = 'Error In Upload Sales Person !! File Is Not Proper !! '
                        //         }
                        //     }
                        //   }
                        if (errorStatus == false) {
                            for (let i = 0; i < csvDataArray.length; i++) {

                                if (csvDataArray[i]['Slspsn'] != '' && csvDataArray[i]['Slspsn'] != undefined && csvDataArray[i]['Slspsn'] != null)  {
                                    let checkSalesPersonCodeExist = await Evolve.App.Services.eDoa.salesPerson.SrvList.checkSalesPersonCodeExist(csvDataArray[i]['Slspsn']);
                                    if (checkSalesPersonCodeExist instanceof Error) {
                                        errorStatus = true;
                                        Evolve.Log.error(checkSalesPersonCodeExist.message);
                                    }
                                    else if (checkSalesPersonCodeExist.rowsAffected > 0) {
                                        csvDataArray[i]['EvolveSalesPerson_ID'] = checkSalesPersonCodeExist.recordset[0].EvolveSalesPerson_ID;
                                        let updateSalesPerson = await Evolve.App.Services.eDoa.salesPerson.SrvList.updateSalesPerson(req.EvolveUser_ID, csvDataArray[i]);
                                        
                                        if (updateSalesPerson instanceof Error || updateSalesPerson.rowsAffected < 1) {
                                            errorStatus = true;
                                            Evolve.Log.error("Error In Update Sales Person " + csvDataArray[i]['Sort Name']);
                                        }
                                    }
                                    else {
                                       let addSalesPerson = await Evolve.App.Services.eDoa.salesPerson.SrvList.addSalesPerson(req.EvolveUser_ID, csvDataArray[i]);
                                        if (addSalesPerson instanceof Error || addSalesPerson.rowsAffected < 1) {
                                            errorStatus = true;
                                            Evolve.Log.error("Error In Add Sales Person " + csvDataArray[i]['Sort Name']);
                                        }
                                    }
                                }
                                // else {
                                //     errorStatus = true;
                                // }

                            }

                        }
                        if (errorStatus == true) {
                            let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
                            res.send(obj);
                        }
                        else {
                            let obj = { statusCode: 200, status: "success", message: 'Sales Person uploaded succsessfully', result: null };
                            res.send(obj);
                        }
                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while uploading CSV Sales Person " + error.message);
            let obj = {
                statusCode: 400, status: "fail",
                message: " EERR####: Error while uploading CSV Sales Person ", result: null
            };
            res.send(obj);
        }
    },


}