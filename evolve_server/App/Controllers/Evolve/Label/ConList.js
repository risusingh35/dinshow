'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getLabelList: async function (req, res) {
        try {
            let LanguageList = await Evolve.App.Services.Evolve.Label.SrvList.getLanguageList();
            if (LanguageList instanceof Error || LanguageList.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Language list.",
                    result: null
                };
                res.send(obj);
            } else {
                let LabelList = await Evolve.App.Services.Evolve.Label.SrvList.getLabelList(req.body);
                if (LabelList instanceof Error) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error while get Label list !",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let lanArray = [];
                    let keywordArray = [];
                    let keywordValueArray = [];

                    lanArray.push({
                        languageTitle: 'KeyWord',
                        id: 0
                    })
                    for (let i = 0; i < LanguageList.recordset.length; i++) {
                        lanArray.push({
                            languageTitle: LanguageList.recordset[i].EvolveLanguage_Title,
                            id: LanguageList.recordset[i].EvolveLanguage_ID
                        })
                    }
                    lanArray.push({
                        languageTitle: 'Option',
                        id: -1
                    })
                    for (let i = 0; i < LabelList.recordset.length; i++) {
                        if (!keywordArray.includes(LabelList.recordset[i].EvolvelLabel_KeyWord)) {
                            keywordArray.push(LabelList.recordset[i].EvolvelLabel_KeyWord);
                        }
                    }

                    for (let i = 0; i < LabelList.recordset.length; i++) {
                        let index = 0;
                        if (keywordArray.includes(LabelList.recordset[i].EvolvelLabel_KeyWord)) {
                            index = keywordArray.indexOf(LabelList.recordset[i].EvolvelLabel_KeyWord);
                        } else {
                            keywordArray.push(LabelList.recordset[i].EvolvelLabel_KeyWord);
                            index = keywordArray.indexOf(LabelList.recordset[i].EvolvelLabel_KeyWord);
                        }
                        if (keywordValueArray[index]) {
                            keywordValueArray[index][LabelList.recordset[i].EvolveLanguage_ID] = LabelList.recordset[i].EvolveLabel_Term;
                        } else {
                            keywordValueArray[index] = [];
                            keywordValueArray[index][LabelList.recordset[i].EvolveLanguage_ID] = LabelList.recordset[i].EvolveLabel_Term;
                        }
                    }
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "get Lable list ",
                        result: {
                            tableHeader: lanArray,
                            tableBody: keywordValueArray,
                            keywordArray: keywordArray,
                        }
                    };
                    console.log('Parent jason >>>>' , obj.result )
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0280: Error while getting label list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0280: Error while getting label list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSingleLabelDetails: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Label.SrvList.getSingleLabelDetails(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Single Label list !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0281: Error while getting single label list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0281: Error while getting single label list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    deleteLabel: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Label.SrvList.deleteLabel(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Delete Label keyword !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Keyword Delete successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0282: Error while deleting label "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0282: Error while deleting label "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    checkKeywordExists: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Label.SrvList.checkKeywordExists(req.body);
            if (result.rowsAffected >= 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Keyword already Exists !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Keyword not Exists",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0283: Error while checking keyword exists "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0283: Error while checking keyword exists "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getAllLanguageList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Label.SrvList.getAllLanguageList();
            let obj = {
                statusCode: 200,
                status: "success",
                message: "success",
                result: result.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0284: Error while getting language list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0284: Error while getting language list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getKeywordUrl: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Label.SrvList.getKeywordUrl(req.body.term);
            let obj = { statusCode: 200, status: "success", message: "Get keyword", result: result.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0286: Error while getting keyword Url "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0286: Error while getting keyword Url "+error.message, result: null };
            res.send(obj);
        }
    },


    updateLabelList: async function (req, res) {
        try {
            let error = false ;            // console.log("UPDATE LOST <<<<<<,")
                for (let i = 0; i < req.body.languageList.length; i++) {

                    // console.log("req.body.languageList[i]" , req.body.languageList[i])
                    let data = {
                        EvolveUser_ID : req.EvolveUser_ID , 
                        EvolveLabel_ID: req.body.languageList[i].EvolveLabel_ID,
                        EvolvelLabel_KeyWord: req.body.EvolvelLabel_KeyWord,
                        EvolveLanguage_ID: req.body.languageList[i].EvolveLanguage_ID,
                        EvolveLabel_Term: req.body.languageList[i].term == "" ? null : req.body.languageList[i].term ,
                    }

                    console.log("data???" ,  data)
                    let result = await Evolve.App.Services.Evolve.Label.SrvList.updateLabelList(data);


                    console.log('result/????'  ,  result)
                    if (result instanceof Error || result.rowsAffected < 1) {
                        error = true ;
                        // let obj = {
                        //     statusCode: 400,
                        //     status: "fail",
                        //     message: "Error while add Label list !",
                        //     result: null
                        // };
                        // res.send(obj);
                    }
                // }
    
            }

            let obj = {
                statusCode: error ? 400 :  200,
                status: error ? "fail" : "success",
                message: error ? "Error While Update Label " : "Label Add Success",
                result: null
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0287: Error while adding label list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0287: Error while adding label list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },



    addLabelList: async function (req, res) {
        try {
            let checkKeyword = await Evolve.App.Services.Evolve.Label.SrvList.checkKeywordExists(req.body);
            if (checkKeyword.rowsAffected >= 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Keyword Already Exists",
                    result: null
                };
                res.send(obj);
            }
            else {
                let error = false  ;
                for (let i = 0; i < req.body.languageList.length; i++) {
                    let data = {
                        EvolveUser_ID  :  req.EvolveUser_ID ,
                        EvolvelLabel_KeyWord: req.body.EvolvelLabel_KeyWord,
                        EvolveLanguage_ID: req.body.languageList[i].EvolveLanguage_ID,
                        EvolveLabel_Term: req.body.languageList[i].term == "" ? null : req.body.languageList[i].term ,
                    }
                    let result = await Evolve.App.Services.Evolve.Label.SrvList.addLabelList(data);
                    if (result instanceof Error || result.rowsAffected < 1) {
                        // let obj = {
                        //     statusCode: 400,
                        //     status: "fail",
                        //     message: "Error while add Label list !",
                        //     result: null
                        // };
                        // res.send(obj);
                        error = true 
                    }
                }
                let obj = {
                    statusCode: error == true ? 400 : 200,
                    status: error == true ? "fail"  : "success",
                    message: error == true ? "Error while add label " : "Label Add Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0287: Error while adding label list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0287: Error while adding label list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },


    ExportCsvFile: async function (req, res) {
        try {
            let LanguageList = await Evolve.App.Services.Evolve.Label.SrvList.getLanguageList();
            let lanArray = [];
            let keywordArray = [];
            let keywordValueArray = [];
            let fields = [];
            let queryLan = [];
            fields.push('KeyWord')
            for (let i = 0; i < LanguageList.recordset.length; i++) {
                for (let j = 0; j < req.body.languageList.length; j++) {
                    if (LanguageList.recordset[i].EvolveLanguage_ID == req.body.languageList[j].EvolveLanguage_ID) {
                        fields.push(LanguageList.recordset[i].EvolveLanguage_Code)
                    }
                }
            }
            for (let j = 0; j < req.body.languageList.length; j++) {
                queryLan.push(req.body.languageList[j].EvolveLanguage_ID)
            }
            let LabelList = await Evolve.App.Services.Evolve.Label.SrvList.getLableFilterData(queryLan);
            if (LabelList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get export list data!",
                    result: null
                };
                res.send(obj);
            } else {
                for (let i = 0; i < LabelList.recordset.length; i++) {
                    if (!keywordArray.includes(LabelList.recordset[i].EvolvelLabel_KeyWord)) {
                        keywordArray.push(LabelList.recordset[i].EvolvelLabel_KeyWord);
                    }
                }
                for (let i = 0; i < LabelList.recordset.length; i++) {
                    let index = 0;
                    if (keywordArray.includes(LabelList.recordset[i].EvolvelLabel_KeyWord)) {
                        index = keywordArray.indexOf(LabelList.recordset[i].EvolvelLabel_KeyWord);
                    } else {
                        keywordArray.push(LabelList.recordset[i].EvolvelLabel_KeyWord);
                        index = keywordArray.indexOf(LabelList.recordset[i].EvolvelLabel_KeyWord);
                    }
                    if (keywordValueArray[index]) {
                        keywordValueArray[index][LabelList.recordset[i].EvolveLanguage_ID] = LabelList.recordset[i].EvolveLabel_Term;
                    } else {
                        keywordValueArray[index] = [];
                        keywordValueArray[index][LabelList.recordset[i].EvolveLanguage_ID] = LabelList.recordset[i].EvolveLabel_Term;
                        keywordValueArray[index][0] = LabelList.recordset[i].EvolvelLabel_KeyWord;
                    }
                }

                let xlsxData = [];
                xlsxData.push(fields)
                for (let i = 0; i < keywordValueArray.length; i++) {
                    xlsxData.push(keywordValueArray[i])
                }
                let ws = Evolve.Xlsx.utils.aoa_to_sheet(xlsxData);
                let wb = Evolve.Xlsx.utils.book_new();
                let dt = new Date();
                let xlsxName = dt.getTime() + '.xlsx';

                Evolve.Xlsx.utils.book_append_sheet(wb, ws, "Evolve Lable Translate");
                Evolve.Xlsx.writeFile(wb, Evolve.Config.translateDir + '/' + xlsxName);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Xlsx Download Success",
                    result: Evolve.Config.translateDirDownloadPath + '/' + xlsxName
                };
                res.send(obj);
            }
        }

        catch (error) {
            Evolve.Log.error(" EERR0288: Error while exporting Csv fie "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0288: Error while exporting Csv fie "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    ImportCsvFile: async function (req, res) {
        try {

            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.csvFile) {
                let csv = req.files.csvFile;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'Language_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

                // Use the mv() method to place the file somewhere on your server
                let label_errorStatus = false;
                csv.mv(Evolve.Config.csvReportPath + '/' + fileName, async function (error) {
                    if (error) {
                        // console.log("Error in File Upload ::", error.message);
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        // Read Xlsx 

                        let workbook = await Evolve.Xlsx.readFile(Evolve.Config.csvReportPath + '/' + fileName);
                        let sheet_name_list = workbook.SheetNames;
                        //Start : Default Code Don't Try To Edit
                        let data = [];
                        sheet_name_list.forEach(function (y) {
                            var worksheet = workbook.Sheets[y];
                            var headers = {};

                            for (let z in worksheet) {
                                if (z[0] === '!') continue;
                                //parse out the column, row, and value
                                var tt = 0;
                                for (var i = 0; i < z.length; i++) {
                                    if (!isNaN(z[i])) {
                                        tt = i;
                                        break;
                                    }
                                };
                                var col = z.substring(0, tt);
                                var row = parseInt(z.substring(tt));
                                var value = worksheet[z].v;

                                //store header names
                                if (row == 1 && value) {
                                    headers[col] = value;
                                    continue;
                                }

                                if (!data[row]) data[row] = {};
                                data[row][headers[col]] = value;
                            }
                            //drop those first two rows which are empty
                            data.shift();
                            data.shift();

                        });
                        //End : Default Code Don't Try To Edit


                        let LanguageList = await Evolve.App.Services.Evolve.Label.SrvList.getLanguageList();
                        let LanguageData = [];
                        for (let i = 0; i < LanguageList.recordset.length; i++) {
                            LanguageData.push({
                                'code': LanguageList.recordset[i].EvolveLanguage_Code,
                                'id': LanguageList.recordset[i].EvolveLanguage_ID,
                            })
                        }


                        for (let singleRecord of data) {
                            //   console.log("singleRecord,", singleRecord)

                            let keyword = singleRecord['KeyWord'];

                            if (keyword != '' && keyword != undefined) {
                                for (let ld of LanguageData) {
                                    let term = singleRecord[ld.code];
                                    if (term != undefined) {
                                        let importXlsx = await Evolve.App.Services.Evolve.Label.SrvList.updateLanguageLable(keyword, ld.id, term);
                                        if (importXlsx.rowsAffected < 1) {
                                            label_errorStatus = true;
                                        } else {
                                            label_errorStatus = false;
                                        }
                                    }
                                }
                            }

                        }
                        //  console.log('Done!');
                    }
                    if (label_errorStatus == true) {
                        let obj = { statusCode: 400, status: "fail", message: 'Error while upload Labe; !', result: null };
                        res.send(obj);
                    } else {
                        let obj = { statusCode: 200, status: "success", message: 'Xlsx File uploaded succsessfully', result: null };
                        res.send(obj);
                    }

                });
            }

        } catch (error) {
            Evolve.Log.error(" EERR0289: Error while importing Csv file "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0289: Error while importing Csv file "+error.message, result: null };
            res.send(obj);
        }
    },

    addChildLabel: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID ;
            // let checkKeyword = await Evolve.App.Services.Evolve.Label.SrvList.checkKeywordExists(req.body);
            // if (checkKeyword.rowsAffected >= 1) {
            //     let obj = {
            //         statusCode: 400,
            //         status: "fail",
            //         message: "Keyword Already Exists",
            //         result: null
            //     };
            //     res.send(obj);
            // }
            // else {
                // for (let i = 0; i < req.body.languageList.length; i++) {
                    // let data = {
                    //     EvolvelLabel_KeyWord: req.body.EvolvelLabel_KeyWord,
                    //     EvolveLanguage_ID: req.body.languageList[i].EvolveLanguage_ID,
                    //     EvolveLabel_Term: req.body.languageList[i].term == "" ? null : req.body.languageList[i].term ,
                    // }
                    let addChildLabel = await Evolve.App.Services.Evolve.Label.SrvList.addChildLabel(req.body);
                    if (addChildLabel instanceof Error || addChildLabel.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Error while add Label list !",
                            result: null
                        };
                        res.send(obj);
                    }
                // }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Child Label Added Successfully",
                    result: null
                };
                res.send(obj);
            // }
        } catch (error) {
            Evolve.Log.error(" EERR0287: Error while adding label list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0287: Error while adding label list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },


    getChildLabelList: async function (req, res) {
        try {

            let LanguageList = await Evolve.App.Services.Evolve.Label.SrvList.getLanguageList();
            if (LanguageList instanceof Error || LanguageList.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Language list.",
                    result: null
                };
                res.send(obj);
            } else {
                let LabelList = await Evolve.App.Services.Evolve.Label.SrvList.getChildLabelList(req.body);
                if (LabelList instanceof Error) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error while get Label list !",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let lanArray = [];
                    let keywordArray = [];
                    let keywordValueArray = [];

                    lanArray.push({
                        languageTitle: 'KeyWord',
                        id: 0
                    })
                    for (let i = 0; i < LanguageList.recordset.length; i++) {
                        lanArray.push({
                            languageTitle: LanguageList.recordset[i].EvolveLanguage_Title,
                            id: LanguageList.recordset[i].EvolveLanguage_ID
                        })
                    }
                    lanArray.push({
                        languageTitle: 'Option',
                        id: -1
                    })
                    for (let i = 0; i < LabelList.recordset.length; i++) {
                        if (!keywordArray.includes(LabelList.recordset[i].EvolvelLabel_KeyWord)) {
                            keywordArray.push(LabelList.recordset[i].EvolvelLabel_KeyWord);
                        }
                    }

                    for (let i = 0; i < LabelList.recordset.length; i++) {
                        let index = 0;
                        if (keywordArray.includes(LabelList.recordset[i].EvolvelLabel_KeyWord)) {
                            index = keywordArray.indexOf(LabelList.recordset[i].EvolvelLabel_KeyWord);
                        } else {
                            keywordArray.push(LabelList.recordset[i].EvolvelLabel_KeyWord);
                            index = keywordArray.indexOf(LabelList.recordset[i].EvolvelLabel_KeyWord);
                        }
                        if (keywordValueArray[index]) {
                            keywordValueArray[index][LabelList.recordset[i].EvolveLanguage_ID] = LabelList.recordset[i].EvolveLabelDetails_Term;
                        } else {
                            keywordValueArray[index] = [];
                            keywordValueArray[index][LabelList.recordset[i].EvolveLanguage_ID] = LabelList.recordset[i].EvolveLabelDetails_Term;
                        }
                    }
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "get Lable list ",
                        result: {
                            tableHeader: lanArray,
                            tableBody: keywordValueArray,
                            keywordArray: keywordArray,
                        }
                    };

                    console.log('Child jason >>>>' , obj.result )

                    res.send(obj);

                }
            }



            // let checkKeyword = await Evolve.App.Services.Evolve.Label.SrvList.checkKeywordExists(req.body);
            // if (checkKeyword.rowsAffected >= 1) {
            //     let obj = {
            //         statusCode: 400,
            //         status: "fail",
            //         message: "Keyword Already Exists",
            //         result: null
            //     };
            //     res.send(obj);
            // }
            // else {
                // for (let i = 0; i < req.body.languageList.length; i++) {
                    // let data = {
                    //     EvolvelLabel_KeyWord: req.body.EvolvelLabel_KeyWord,
                    //     EvolveLanguage_ID: req.body.languageList[i].EvolveLanguage_ID,
                    //     EvolveLabel_Term: req.body.languageList[i].term == "" ? null : req.body.languageList[i].term ,
                    // }
                //     let getChildLabelList = await Evolve.App.Services.Evolve.Label.SrvList.getChildLabelList(req.body);
                //     if (getChildLabelList instanceof Error || getChildLabelList.rowsAffected < 1) {
                //         let obj = {
                //             statusCode: 400,
                //             status: "fail",
                //             message: "Error while add Label list !",
                //             result: null
                //         };
                //         res.send(obj);
                //     }
                // // }
                // let obj = {
                //     statusCode: 200,
                //     status: "success",
                //     message: "Child Label Added Successfully",
                //     result: null
                // };
                // res.send(obj);
            // }
        } catch (error) {
            Evolve.Log.error(" EERR0287: Error while adding label list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0287: Error while adding label list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },





}