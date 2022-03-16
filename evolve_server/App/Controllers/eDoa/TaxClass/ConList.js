'use strict';
const Evolve = require('../../../../Boot/Evolve');

module.exports = {
    
    getTaxClassList: async function (req, res) {
        let start = parseInt(req.body.startFrom);
        let length = parseInt(req.body.displayRecord);
        let search = req.body.search;

        try {
            let count = await Evolve.App.Services.eDoa.taxClass.SrvList.getTaxClassListCount(search);
            let result = await Evolve.App.Services.eDoa.taxClass.SrvList.getTaxClassList(start, length, search);

            if (result instanceof Error) {
            
                Evolve.Log.error(" EERR####: Error while get tax class list ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get tax class list!",
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
        }
        catch (err) {
            Evolve.Log.error("Error while get tax class list",err);

            return res.json({
                statusCode: 500,
                status: 'fail',
                message: "Error while get tax class list",
                result: null
            });
        }
    },

    async addTaxClassList (req, res) {
        req.body.EvolveUser_ID = req.EvolveUser_ID;
    
        try {
            const result = await Evolve.App.Services.eDoa.TaxClass.SrvList.addTaxClassItem(req.body);

            if (result instanceof Error || result.rowsAffected < 1) {
                Evolve.Log.error(" EERR####: Error while add tax class item");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while add tax class item",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "tax class added successfully ",
                    result: null
                };
                res.send(obj);
            }
        }
        catch (error) {
            Evolve.Log.error(" EERR####: Error while add tax class item "+error.message);

            return res.json({
                statusCode: 500,
                status: 'fail',
                message: "Error while add tax class item",
                result: null
            });
        }
    },

    updateClassListItem: async function (req, res) {
        req.body.EvolveUser_ID = req.EvolveUser_ID;

        try {
            let result = await Evolve.App.Services.eDoa.TaxClass.SrvList.updateTaxClassItem(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                Evolve.Log.error(" EERR####: Error while update tax class item");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while update tax class item" ,
                    result: null 
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "tax class updated successfully  ",
                    result: null
                };
                res.send(obj);
            }
        }
        catch (error) {
            Evolve.Log.error(" EERR####: Error while update tax class item "+error.message);

            return res.json({
                statusCode: 500,
                status: 'fail',
                message: "Error while update tax class item",
                result: null
            });
        }
    },

    removeClassItem: async function (req, res) {
        const id = req.body.EvolveTaxClass_ID;

        try {
            let result = await Evolve.App.Services.eDoa.TaxClass.SrvList.deleteTaxClassItem(id);
            if (result instanceof Error || result.rowsAffected < 1) {
                Evolve.Log.error(" EERR####: Error while delete tax class item");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while delete tax class item" ,
                    result: null 
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "tax class deleted successfully",
                    result: null
                };
                res.send(obj);
            }
        }
        catch (error) {
            Evolve.Log.error(" EERR####: Error while delete tax class item "+error.message);

            return res.json({
                statusCode: 500,
                status: 'fail',
                message: "Error while delete tax class item",
                result: null
            });
        }
    },

    onUploadTaxClassFile : async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.fileData) {
                let csv = req.files.fileData;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'taxClassMaster_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;
                
                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/doa/' + fileName, async function (error) {
                    if (error) {
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let csvDataArray = await Evolve.Csv().fromFile('./csv/doa/' + fileName);
                    
                        let errorMessage = 'Error While Upload Tax Class!!';
                        let errorStatus = false;
                        // if (errorStatus == false) {
                        //     for (let i = 0; i < csvDataArray.length; i++) {
                        //         if (csvDataArray[i]['Class'] == '' || csvDataArray[i]['Class'] == undefined) {
                        //             errorStatus = true;
                        //             errorMessage = 'Error In Upload Tax Class !! File Is Not Proper !! '
                        //         }
                        //     }
                        // }
                        if (errorStatus == false) {
                            for (let i = 0; i < csvDataArray.length; i++) {
                                // if (csvDataArray[i]['Class'] != '' && csvDataArray[i]['Class'] == undefined && csvDataArray[i]['Class'] != null){
                                    let checkTaxClassExist = await Evolve.App.Services.eDoa.taxClass.SrvList.checkTaxClassExist(csvDataArray[i]['Class']);
                                    if (checkTaxClassExist instanceof Error) {
                                        errorStatus = true;
                                        Evolve.Log.error(checkTaxClassExist.message);
                                    }
                                    else if (checkTaxClassExist.rowsAffected > 0) {
                                        csvDataArray[i]['EvolveTaxClass_ID'] = checkTaxClassExist.recordset[0].EvolveTaxClass_ID;
                                        let updateTaxClassCode = await Evolve.App.Services.eDoa.taxClass.SrvList.updateTaxClass(req.EvolveUser_ID, csvDataArray[i]);
                                        if (updateTaxClassCode instanceof Error || updateTaxClassCode.rowsAffected < 1) {
                                            errorStatus = true;
                                            Evolve.Log.error("Error In Update Tax Class");
                                        }
                                    }
                                    else {
                                        let addTaxClass = await Evolve.App.Services.eDoa.taxClass.SrvList.addTaxClass(req.EvolveUser_ID, csvDataArray[i]);
                                        if (addTaxClass instanceof Error || addTaxClass.rowsAffected < 1) {
                                            errorStatus = true;
                                            Evolve.Log.error("Error In Add Tax Class");
                                        }
                                    }
                                // }
                            }

                        }
                        else {
                            errorStatus = true;
                        }
                        if (errorStatus == true) {
                            let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
                            res.send(obj);
                        }
                        else {
                            let obj = { statusCode: 200, status: "success", message: 'Tax Class uploaded succsessfully', result: null };
                            res.send(obj);
                        }
                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while uploading CSV Tax Class " + error.message);
            let obj = {
                statusCode: 400, status: "fail",
                message: " EERR####: Error while uploading CSV Tax Class ", result: null
            };
            res.send(obj);
        }
    }
}