const Evolve = require("../../../../Boot/Evolve");
const JPG = require('jpeg-js');

module.exports = {

    getAllLabelList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let count = await Evolve.App.Services.Evolve.labelMaster.SrvList.getAllLabelListCount(search);

            let list = await Evolve.App.Services.Evolve.labelMaster.SrvList.getAllLabelList(start, length, search);

            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get label list list",
                    result: list.message
                };
                res.send(obj);
            } else {
                for (let i = 0; i < list.recordset.length; i++) {
                    if (list.recordset[i].EvolveStickerSize_Wdt != null || list.recordset[i].EvolveStickerSize_Wdt != undefined || list.recordset[i].EvolveStickerSize_Ht != null || list.recordset[i].EvolveStickerSize_Ht != undefined) {
                        list.recordset[i].EvolveStickerSize = list.recordset[i].EvolveStickerSize_Wdt + '*' + list.recordset[i].EvolveStickerSize_Ht
                    }
                    else {
                        list.recordset[i].EvolveStickerSize = null;
                    }

                }
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: list.recordset
                }

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "label master List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32555: Error while getting label master list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32555: Error while getting label master list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addNewLabel: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let addNewLabel = await Evolve.App.Services.Evolve.labelMaster.SrvList.addNewLabel(req.body);
            if (addNewLabel instanceof Error || addNewLabel.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in Add Label Master !",
                    result: addNewLabel.message
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Label Added Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32556: Error while add new label " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32556: Error while add new label " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteLabel: async function (req, res) {
        try {
            let deleteLabel = await Evolve.App.Services.Evolve.labelMaster.SrvList.deleteLabel(req.body);
            if (deleteLabel instanceof Error || deleteLabel.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in Delete Master !",
                    result: deleteLabel.message
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Label Deleted Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32557: Error while delete label master " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32557: Error while delete label master " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getAllVariables: async function (req, res) {
        try {
            let getAllVariables = await Evolve.App.Services.Evolve.labelMaster.SrvList.getAllVariables(req.body);
            if (getAllVariables instanceof Error || getAllVariables.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in getting variables!",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Variables Getting Successfully",
                    result: getAllVariables.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32558: Error while getting variables " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32558: Error while getting variables " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteVariable: async function (req, res) {
        try {
            let deleteVariable = await Evolve.App.Services.Evolve.labelMaster.SrvList.deleteVariable(req.body);
            if (deleteVariable instanceof Error || deleteVariable.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in Delete variable!",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Variable Delete Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32559: Error while delete variable " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32559: Error while delete variable " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addNewVariable: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            req.body.EvolveStickerVar_TableName = ""
            if (req.body.EvolveStickerVar_Value == "EvolveItem_Code" || req.body.EvolveStickerVar_Value == "EvolveItem_Desc") {
                req.body.EvolveStickerVar_TableName = "EvolveItem"
            }
            if (req.body.EvolveStickerVar_Value == "EvolveItemSupLink_CustomerItem") {
                req.body.EvolveStickerVar_TableName = "EvolveItemSupLink"
            }
            if (req.body.EvolveStickerVar_Value == "EvolveShift_Code") {
                req.body.EvolveStickerVar_TableName = "EvolveShift"
            }
            if (req.body.EvolveStickerVar_Value == "EvolveSerial_Prefix") {
                req.body.EvolveStickerVar_TableName = "EvolveSerial"
            }
            let addNewVariable = await Evolve.App.Services.Evolve.labelMaster.SrvList.addNewVariable(req.body);
            if (addNewVariable instanceof Error || addNewVariable.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in Add New variable!",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Variable Added Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32560: Error while Add New variable " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32560: Error while Add New variable " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getPrinterList: async function (req, res) {
        try {
            let getPrinterList = await Evolve.App.Services.Evolve.labelMaster.SrvList.getPrinterList();
            if (getPrinterList instanceof Error || getPrinterList.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in getting printer list!",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Printer List",
                    result: getPrinterList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32561: Error while Getting Printer List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32561: Error while Getting Printer List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getLabelSizeList: async function (req, res) {
        try {
            let getLabelSizeList = await Evolve.App.Services.Evolve.labelMaster.SrvList.getLabelSizeList();
            if (getLabelSizeList instanceof Error || getLabelSizeList.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in getting label size list!",
                    result: null
                };
                res.send(obj);
            }
            else {
                for (let i = 0; i < getLabelSizeList.recordset.length; i++) {
                    getLabelSizeList.recordset[i].showString = getLabelSizeList.recordset[i].EvolveStickerSize_Name + "-[" + getLabelSizeList.recordset[i].EvolveStickerSize_Wdt + "*" + getLabelSizeList.recordset[i].EvolveStickerSize_Ht + " " + getLabelSizeList.recordset[i].EvolveStickerSize_UOM + "]"
                }

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Label Size List",
                    result: getLabelSizeList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32562: Error while Getting Label Size List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32562: Error while Getting Label Size List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    removeLabelSize: async function (req, res) {
        try {
            let removeLabelSize = await Evolve.App.Services.Evolve.labelMaster.SrvList.removeLabelSize(req.body);
            if (removeLabelSize instanceof Error || removeLabelSize.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in remove label size!",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Label Size Remove Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32563: Error while Remove Label Size " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32563: Error while Remove Label Size " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addLabelSize: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let addLabelSize = await Evolve.App.Services.Evolve.labelMaster.SrvList.addLabelSize(req.body);
            if (addLabelSize instanceof Error || addLabelSize.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in Add New Label Size!",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Label Size Added Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32564: Error while Adding Label Size " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32564: Error while Adding Label Size " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    clickPreviewActual: async function (req, res) {
        try {
            let str = req.body.EvolveSticker_Code
            if (req.body.EvolveSticker_ID != null) {
                let variableArray = await Evolve.App.Services.Evolve.labelMaster.SrvList.getAllVariables(req.body);
                if (variableArray instanceof Error || variableArray.rowsAffected < 1) {
                    finalVariableList = null;
                }
                let finalVariableList = variableArray.recordset;
                if (finalVariableList != null) {
                    for (let i = 0; i < finalVariableList.length; i++) {
                        if (str.match("{~" + finalVariableList[i].EvolveStickerVar_Key + "~}")) {
                            let getItemsToLabel = await Evolve.App.Services.Evolve.labelMaster.SrvList.getItemsToLabel(req.body.EvolveSticker_ID);
                            if (getItemsToLabel instanceof Error || getItemsToLabel.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: "No Item Found Linked With Selected Label",
                                    result: null
                                };
                                res.send(obj);
                            }
                            else {
                                let itemToLabelList = getItemsToLabel.recordset[0].EvolveItem_ID;
                                let itemColumnName = finalVariableList[i].EvolveStickerVar_Value;
                                let getFinalVariableValue = await Evolve.App.Services.Evolve.labelMaster.SrvList.getFinalVariableValue(itemToLabelList, itemColumnName);
                                if (getFinalVariableValue instanceof Error || getFinalVariableValue.rowsAffected < 1) {
                                    let obj = {
                                        statusCode: 400,
                                        status: "fail",
                                        message: "Error In Getting Final Variable Value",
                                        result: null
                                    };
                                    res.send(obj);
                                }
                                else {
                                    let replaceString = getFinalVariableValue.recordset[0][Object.keys(getFinalVariableValue.recordset[0])[0]]

                                    str = str.replace("{~" + finalVariableList[i].EvolveStickerVar_Key + "~}", replaceString)
                                    i--;
                                }
                            }

                        }
                    }
                }
            }
            let labelsizeformat
            let getLabelSizeById = await Evolve.App.Services.Evolve.labelMaster.SrvList.getLabelSizeById(req.body.EvolveStickerSize_ID);
            if (getLabelSizeById instanceof Error || getLabelSizeById.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "No Label Size Found",
                    result: null
                };
                res.send(obj);
            }
            else {
                if (getLabelSizeById.recordset[0].EvolveStickerSize_UOM == "cm") {
                    getLabelSizeById.recordset[0].EvolveStickerSize_Wdt = (getLabelSizeById.recordset[0].EvolveStickerSize_Wdt) * 0.393701
                    getLabelSizeById.recordset[0].EvolveStickerSize_Ht = (getLabelSizeById.recordset[0].EvolveStickerSize_Ht) * 0.393701
                }
                if (getLabelSizeById.recordset[0].EvolveStickerSize_UOM == "mm") {
                    getLabelSizeById.recordset[0].EvolveStickerSize_Wdt = (getLabelSizeById.recordset[0].EvolveStickerSize_Wdt) * 0.0393701
                    getLabelSizeById.recordset[0].EvolveStickerSize_Ht = (getLabelSizeById.recordset[0].EvolveStickerSize_Ht) * 0.0393701
                }
                labelsizeformat = getLabelSizeById.recordset[0].EvolveStickerSize_Wdt + 'x' + getLabelSizeById.recordset[0].EvolveStickerSize_Ht
                let previewImg = Evolve.App.Controllers.Evolve.labelMaster.ConList.getPNGImg(str, req.body.EvolveSticker_Dpmm, labelsizeformat)
                if (previewImg instanceof Error) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: previewImg + 'error',
                        result: null
                    };
                    res.send(obj);
                }
                else {
                    let obj = {
                        statusCode: 200,
                        status: "Success",
                        message: "Preview Get Successfully!",
                        result: null
                    };
                    res.send(obj);
                }
            }


        } catch (error) {
            Evolve.Log.error(" EERR32565: Error while Preview Label " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32565: Error while Preview Label " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    clickPreview: async function (req, res) {
        try {
            let str = req.body.EvolveSticker_Code
            if (req.body.EvolveSticker_ID != null) {
                let finalVariableList;
                let variableArray = await Evolve.App.Services.Evolve.labelMaster.SrvList.getAllVariables(req.body);
                if (variableArray instanceof Error || variableArray.rowsAffected < 1) {
                    finalVariableList = null;
                }
                finalVariableList = variableArray.recordset;
                if (finalVariableList != null) {
                    for (let i = 0; i < finalVariableList.length; i++) {
                        if (str.match("{~" + finalVariableList[i].EvolveStickerVar_Key + "~}")) {
                            str = str.replace("{~" + finalVariableList[i].EvolveStickerVar_Key + "~}", finalVariableList[i].EvolveStickerVar_DummyValue)
                            i--;
                        }
                    }
                }
            }
            let labelsizeformat
            let getLabelSizeById = await Evolve.App.Services.Evolve.labelMaster.SrvList.getLabelSizeById(req.body.EvolveStickerSize_ID);
            if (getLabelSizeById instanceof Error || getLabelSizeById.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "No Label Size Found",
                    result: null
                };
                res.send(obj);
            }
            else {
                if (getLabelSizeById.recordset[0].EvolveStickerSize_UOM == "cm") {
                    getLabelSizeById.recordset[0].EvolveStickerSize_Wdt = (getLabelSizeById.recordset[0].EvolveStickerSize_Wdt) * 0.393701
                    getLabelSizeById.recordset[0].EvolveStickerSize_Ht = (getLabelSizeById.recordset[0].EvolveStickerSize_Ht) * 0.393701
                }
                if (getLabelSizeById.recordset[0].EvolveStickerSize_UOM == "mm") {
                    getLabelSizeById.recordset[0].EvolveStickerSize_Wdt = (getLabelSizeById.recordset[0].EvolveStickerSize_Wdt) * 0.0393701
                    getLabelSizeById.recordset[0].EvolveStickerSize_Ht = (getLabelSizeById.recordset[0].EvolveStickerSize_Ht) * 0.0393701
                }
                labelsizeformat = getLabelSizeById.recordset[0].EvolveStickerSize_Wdt + 'x' + getLabelSizeById.recordset[0].EvolveStickerSize_Ht;

                let previewImg = await Evolve.App.Controllers.Evolve.labelMaster.ConList.getPNGImg(str, req.body.EvolveSticker_Dpmm, labelsizeformat);
                if (previewImg.statusCode == 200) {
                    let obj = {
                        statusCode: 200,
                        status: "Success",
                        message: "Preview Get Successfully!",
                        result: null
                    };
                    res.send(obj);
                }
                else if (previewImg instanceof Error) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: previewImg.message,
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR32566: Error while Preview Label " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32566: Error while Preview Label " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getPNGImg: async function (zplCode, dpmm, size) {
        return new Promise(function (resolve, reject) {
            let options = {
                encoding: null,
                formData: { file: zplCode },
                // omit this line to get PNG images back
                // headers: { 'Accept': 'application/pdf' },
                // adjust print density (8dpmm), label width (4 inches), label height (6 inches), and label index (0) as necessary
                url: `http://api.labelary.com/v1/printers/${dpmm}/labels/${size}/0/`
            };
            Evolve.request.post(options, async function (err, resp, body) {
                if (err) {
                    Evolve.Log.error(" EERR32567: Error While Get Responce From API : " + err);
                    resolve(new Error("Error While Get Responce From API"))
                }
                console.log(body);
                var filename = Evolve.Config.labelImagePath + 'label.png'; // change file name for PNG images
                await Evolve.Fs.writeFile(filename, body, function (error) {
                    if (error) {
                        Evolve.Log.error(" EERR32567: Error while  Write Image" + error.message);
                        resolve(new Error("Error while Write Image"))
                    } else {
                        let obj = {
                            statusCode: 200,
                            message: 'Preview Get SuccessFully'
                        }
                        resolve(obj)
                    }
                });
            });
        })
    },

    saveLabelDesign: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let saveLabelDesign = await Evolve.App.Services.Evolve.labelMaster.SrvList.saveLabelDesign(req.body);
            if (saveLabelDesign instanceof Error || saveLabelDesign.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in save Label Design!",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Label Design Save Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32568: Error while Save Label Desing " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32568: Error while Save Label Desing " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getAllZplCmdList: async function (req, res) {
        try {
            let getAllZplCmdList = await Evolve.App.Services.Evolve.labelMaster.SrvList.getAllZplCmdList();
            if (getAllZplCmdList instanceof Error || getAllZplCmdList.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Get Zpl Command List!",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Zpl Command List Get Successfully",
                    result: getAllZplCmdList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32569: Error while Get Zpl Command List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32569: Error while Get Zpl Command List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getAllZplCmdParamList: async function (req, res) {
        try {
            let getAllZplCmdParamList = await Evolve.App.Services.Evolve.labelMaster.SrvList.getAllZplCmdParamList(req.body.EvovleStickerCmd_ID);
            if (getAllZplCmdParamList instanceof Error || getAllZplCmdParamList.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Get Zpl Command Param List!",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Zpl Command Param List Get Successfully",
                    result: getAllZplCmdParamList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32570: Error while Get Zpl Command Param List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32570: Error while Get Zpl Command Param List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addImgageInZpl: async function (req, res) {
        try {
            if (req.files.pngFile) {
                let png = req.files.pngFile;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(png.name)[1];
                if (ext.toLowerCase() == 'png') {
                    let date = new Date();
                    let fileName = 'LogoImage_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;
    
                    // Use the mv() method to place the file somewhere on your server
                    png.mv('./public/LabelLogoUpload/' + fileName, async function (error) {
                        if (error) {
                            // console.log("Error in File Upload ::", error.message);
                            let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                            res.send(obj);
                        } else {
                            Evolve.Fs.createReadStream('./public/LabelLogoUpload/' + fileName)
                                .pipe(new Evolve.PNG({ filterType: 4 }))
                                .on('parsed', function () {
                                    // res is the same as above
                                    let zplcode = Evolve.rgbaToZ64(this.data, this.width, { black: 52 });
                                    let zpl = `^FO50,50^GFA,${zplcode.length},${zplcode.length},${zplcode.rowlen},${zplcode.z64}`
                                    let obj = {
                                        statusCode: 200,
                                        status: "Success",
                                        message: " Add Image Successfully ! ",
                                        result: zpl
                                    };
                                    res.send(obj);
                                });
                            // res.length is the uncompressed GRF length.
                            // res.rowlen is the GRF row length.
                            // res.z64 is the Z64 encoded string.
                        }
                    }
                    )
                }
                else if (ext.toLowerCase() == 'jpg') {
                    let date = new Date();
                    let fileName = 'LogoImage_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;
    
                    // Use the mv() method to place the file somewhere on your server
                    png.mv('./public/LabelLogoUpload/' + fileName, async function (error) {
                        if (error) {
                            // console.log("Error in File Upload ::", error.message);
                            let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                            res.send(obj);
                        } else {
                            let buf = Evolve.Fs.readFileSync('./public/LabelLogoUpload/' + fileName);
                            let jpg = JPG.decode(buf);
                            let zplcode = Evolve.rgbaToZ64(jpg.data, jpg.width, { black: 0 });
                            let zpl = `^FO50,50^GFA,${zplcode.length},${zplcode.length},${zplcode.rowlen},${zplcode.z64}`
                            let obj = {
                                statusCode: 200,
                                status: "Success",
                                message: " Image Add Successfully ! ",
                                result: zpl
                            };
                            res.send(obj);
                        }
                    });
    
                   
                }else{
                    let obj = {
                        statusCode: 400,
                        status: "Fail",
                        message: " Please Upload Only PNG or JPG Image ! ",
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR32571: Error while Add Image In ZPL " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error While Upload Image : Please Do Not Upload Converted Image!",
                result: null
            };
            res.send(obj);
        }


    },

    printLabel : async function (req,res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let printLabel = await Evolve.App.Services.Evolve.labelMaster.SrvList.printLabel(req.body);
            if (printLabel instanceof Error || printLabel.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Print Label!",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Label Print Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32570: Error while Print Label! " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32570: Error while Print Label! " + error.message,
                result: null
            };
            res.send(obj);
        }
    }

}
