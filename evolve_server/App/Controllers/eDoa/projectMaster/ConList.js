'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getProjectMasterList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.eDoa.projectMaster.SrvList.getProjectMasterListCount(search, req.EvolveUser_ID);
            let result = await Evolve.App.Services.eDoa.projectMaster.SrvList.getCustomerMasterList(start, length, search, req.EvolveUser_ID);
            if (result instanceof Error) {

                Evolve.Log.error(" EERR####: Error while get project master list ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get project master list!",
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
            Evolve.Log.error(" EERR####: Error while get project master list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get project master list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addProjectMaster: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.projectMaster.SrvList.addProject(req.EvolveUser_ID, req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while add project master ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "project master added Succesfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while add project master " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while add project master " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateProjectMaster: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.projectMaster.SrvList.updateProject(req.EvolveUser_ID, req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while update project master ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "project master updated Succesfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update project master " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while update project master " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    onUploadProjectMasterFile: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.fileData) {
                let csv = req.files.fileData;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'projectMaster_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/doa/' + fileName, async function (error) {
                    if (error) {
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let csvDataArray = await Evolve.Csv().fromFile('./csv/doa/' + fileName);
                        // console.log("csvDataArray>>>>>", csvDataArray);
                        let errorMessage = 'Error While Upload project Master!!';
                        let errorStatus = false;
                        // if (errorStatus == false) {
                        //     for (let i = 0; i < csvDataArray.length; i++) {
                        //         if (csvDataArray[i]['Project'] == '' && csvDataArray[i]['Project'] == undefined) {
                        //             errorStatus = true;
                        //             errorMessage = 'Error In Upload Project Master !! File Is Not Proper !! '
                        //         }
                        //     }
                        // }
                        if (errorStatus == false) {
                            for (let i = 0; i < csvDataArray.length; i++) {
                                // if (csvDataArray[i]['Project'] != '' && csvDataArray[i]['Project'] != undefined && csvDataArray[i]['Project'] == null) {
                                    let checkProjectExist = await Evolve.App.Services.eDoa.projectMaster.SrvList.checkProjectExist(csvDataArray[i]['Project']);
                                    if (checkProjectExist instanceof Error) {
                                        errorStatus = true;
                                        Evolve.Log.error(checkProjectExist.message);
                                    }
                                    else if (checkProjectExist.rowsAffected > 0) {
                                        csvDataArray[i]['EvolveProject_ID'] = checkProjectExist.recordset[0].EvolveProject_ID;
                                        let updateProject = await Evolve.App.Services.eDoa.projectMaster.SrvList.updateProject(req.EvolveUser_ID, csvDataArray[i]);
                                        if (updateProject instanceof Error || updateProject.rowsAffected < 1) {
                                            errorStatus = true;
                                            Evolve.Log.error(updateProject.message);
                                        }
                                    }
                                    else {
                                        let addProject = await Evolve.App.Services.eDoa.projectMaster.SrvList.addProject(req.EvolveUser_ID, csvDataArray[i]);
                                        if (addProject instanceof Error || addProject.rowsAffected < 1) {
                                            errorStatus = true;
                                            Evolve.Log.error(addProject.message);
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
                            let obj = { statusCode: 200, status: "success", message: 'Project Master uploaded succsessfully', result: null };
                            res.send(obj);
                        }
                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while uploading CSV Project Master " + error.message);
            let obj = {
                statusCode: 400, status: "fail",
                message: " EERR####: Error while uploading CSV Project Master ", result: null
            };
            res.send(obj);
        }
    }

}