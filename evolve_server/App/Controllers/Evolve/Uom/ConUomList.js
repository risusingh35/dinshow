'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getAppMenuByAppId: async function (req, res) {
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        try {
            let menus = await Evolve.App.Services.Evolve.Uom.SrvUomList.getAppMenuByAppId(req.body);
            if (menus instanceof Error || menus.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "No menu found !",
                    result: null
                };
                res.send(obj);
            } else {
                var obj = {
                    draw: req.query.draw,
                    result: [],
                    statusCode: 200,
                    message: "success"
                };
                let menuList = [];
                let records = menus.recordsets[0];

                for (let i = records.length - 1; i >= 0; i--) {
                    let assingned = false;
                    if (records[i].assigned >= 1) {
                        assingned = true;
                    } else {
                        assingned = false;
                    }
                    if (records[i].EvolveMenu_Parent == 0) {
                        menuList.push({
                            title: records[i].EvolveMenu_Name,
                            expanded: true,
                            folder: true,
                            selected: assingned,
                            menuIndex: records[i].EvolveMenu_Index,
                            menuParent: records[i].EvolveMenu_Parent,
                            icon: records[i].EvolveMenu_Icon,
                            key: records[i].EvolveMenu_Id
                        });
                        records.splice(i, 1);
                    }
                }
                for (let i = 0; i < records.length; i++) {
                    for (let j = 0; j < menuList.length; j++) {
                        if (records[i].EvolveMenu_Parent == menuList[j].menuIndex) {
                            if (menuList[j].children == undefined) {
                                menuList[j].children = [];
                            }
                            menuList[j].children.push({
                                title: records[i].EvolveMenu_Name,
                                expanded: true,
                                folder: true,
                                menuIndex: records[i].EvolveMenu_Index,
                                menuParent: records[i].EvolveMenu_Parent,
                                icon: records[i].EvolveMenu_Icon
                            });
                            records.splice(i, 1);
                        }
                    }
                }
                for (let i = 0; i < records.length; i++) {
                    for (let k = 0; k < menuList.length; k++) {
                        if (menuList[k].children !== undefined) {
                            for (l = 0; l < menuList[k].children.length; l++) {
                                if (records[i].EvolveMenu_Parent == menuList[k].children[l].menuIndex) {
                                    if (menuList[k].children[l].children == undefined) {
                                        menuList[k].children[l].children = [];
                                    }
                                    menuList[k].children[l].children.push({ title: records[i].EvolveMenu_Name, expanded: true, folder: true, icon: records[i].EvolveMenu_Icon });
                                    records.splice(i, 1);
                                }
                            }
                        }
                    }
                }
                obj.result = menuList;
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0442: Error while getting app Menu by app id " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0442: Error while getting app Menu by app id " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getAllUomList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let uomListCount = await Evolve.App.Services.Evolve.Uom.SrvUomList.getAllUomListCount(search);
            let uomList = await Evolve.App.Services.Evolve.Uom.SrvUomList.getAllUomList(start, length, search);
            if (uomList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get uom list !",
                    result: uomList.message
                };
                res.send(obj);
            }
            if (uomList.rowsAffected < 1) {
                let obj = {
                    statusCode: 200,
                    status: "no uom available",
                    message: " ",
                    result: []
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: uomListCount.recordset[0].count,
                    records: uomList.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "uom list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0443: Error while getting all Uom List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0443: Error while getting all Uom List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    appListForRole: async function (req, res) {
        try {
            let apps = await Evolve.App.Services.Evolve.Uom.SrvUomList.appListForRole();
            let obj = {
                statusCode: 200,
                status: "success",
                message: "App List",
                result: apps.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0444: Error while app list for role " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0444: Error while app list for role " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateRoleToMenu: async function (req, res) {
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        try {
            let result = await Evolve.App.Services.Evolve.Uom.SrvUomList.updateRoleToMenu(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update Rrle to menu !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "menu updated successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0445: Error while updating role to menu " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0445: Error while updating role to menu " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    createUom: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let createUom = await Evolve.App.Services.Evolve.Uom.SrvUomList.createUom(req.body);
            if (createUom instanceof Error || createUom.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while create uom !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Uom Created Successfully",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0446: Error while creating Uom " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0446: Error while creating Uom " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    selectSingleUom: async function (req, res) {
        try {
            let uomData = await Evolve.App.Services.Evolve.Uom.SrvUomList.selectSingleUom(req.body.EvolveUom_ID);
            if (uomData instanceof Error || uomData.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get uom data !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "uom data",
                    result: uomData.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0447: Error while selecting single Uom " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0447: Error while selecting single Uom " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateUom: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let updateUom = await Evolve.App.Services.Evolve.Uom.SrvUomList.updateUom(req.body);
            if (updateUom instanceof Error || updateUom.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update uom !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Uom updated successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0448: Error while updating Uom " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0448: Error while updating Uom " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteRole: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Uom.SrvUomList.deleteRole(req.body.id);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while delete role !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Role deleted succsessfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0449: Error while deleting role " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0449: Error while deleting role " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // for DOA csv file upload -- start

    onUploadUomCsvFile: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.fileData) {
                let csv = req.files.fileData;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'uomMaster_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/doa/' + fileName, async function (error) {
                    if (error) {
                        // console.log("Error in File Upload ::", error.message);
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let csvDataArray = await Evolve.Csv().fromFile('./csv/doa/' + fileName);
                        // console.log("csvDataArray>>>>>", csvDataArray);
                        let errorMessage = 'Error While Upload Uom Master!!';
                        let errorStatus = false;
                        // if (errorStatus == false) {
                        //     for (let i = 0; i < csvDataArray.length; i++) {
                        //         if (csvDataArray[i]['UM'] == '' || csvDataArray[i]['UM'] == undefined) {
                        //             errorStatus = true;
                        //             errorMessage = 'Error In Upload UOM Master !! File Is Not Proper !! '
                        //         }
                        //     }
                        // }
                        if (errorStatus == false) {
                            for (let i = 0; i < csvDataArray.length; i++) {
                                if (csvDataArray[i]['UM'] != '' && csvDataArray[i]['UM'] != undefined && csvDataArray[i]['UM'] != null) {

                                    // Item Part
                                    if (csvDataArray[i]['Item Number'] != '' && csvDataArray[i]['UM'] != undefined && csvDataArray[i]['UM'] != null) {
                                        let getItemId = await Evolve.App.Services.Evolve.Uom.SrvUomList.getItemId(csvDataArray[i]['Item Number']);
                                        if (getItemId instanceof Error || getItemId.rowsAffected < 1) {
                                            // errorStatus = true;
                                            Evolve.Log.error(csvDataArray[i]['Item Number'] + "Item Not Found");
                                        }
                                        else {
                                            csvDataArray[i]['EvolveItem_ID'] = getItemId.rowsAffected[0].EvolveItem_ID;
                                        }
                                    }
                                    
                                    // UOM Party
                                    let checkUomExist = await Evolve.App.Services.Evolve.Uom.SrvUomList.checkUomExist(csvDataArray[i]['UM']);
                                    if (checkUomExist instanceof Error) {
                                        errorStatus = true;
                                        Evolve.Log.error(checkUomExist.message);
                                    }
                                    else if (checkUomExist.rowsAffected > 0) {
                                        Evolve.Log.info(csvDataArray[i]['UM'] + " UOM is already available");
                                        csvDataArray[i]['EvolveUom_ID'] = checkUomExist.recordset[0].EvolveUom_ID;
                                        let updateUomCsv = await Evolve.App.Services.Evolve.Uom.SrvUomList.updateUomCsv(csvDataArray[i]);
                                        if (updateUomCsv instanceof Error) {
                                            errorStatus = true;
                                            Evolve.Log.error(updateUomCsv.message);
                                        }
                                    }
                                    else {
                                        let addUom = await Evolve.App.Services.Evolve.Uom.SrvUomList.addUom(req.EvolveUser_ID, csvDataArray[i]);
                                        if (addUom instanceof Error || addUom.rowsAffected < 1) {
                                            errorStatus = true;
                                            Evolve.Log.error("Error in Add UOM");
                                        }
                                        // else {
                                        //     csvDataArray[i]['EvolveUom_ID'] = addUom.recordset[0].inserted_id
                                        //     let addUomConv = await Evolve.App.Services.Evolve.Uom.SrvUomList.addUomConv(req.EvolveUser_ID, csvDataArray[i]);
                                        //     if (addUomConv instanceof Error) {
                                        //         errorStatus = true;
                                        //         Evolve.Log.error("Error In Add UOM Conversion");
                                        //     }

                                        // }
                                    }
                                }
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
                            let obj = { statusCode: 200, status: "success", message: 'UOM Master uploaded succsessfully', result: null };
                            res.send(obj);
                        }
                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while uploading CSV UOM Master " + error.message);
            let obj = {
                statusCode: 400, status: "fail",
                message: " EERR####: Error while uploading CSV UOM Master ", result: null
            };
            res.send(obj);
        }
    },

    // for DOA csv file upload -- end




}