'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllPageDetails: async function(req, res) {
        try {
            let getAllPageDetails = await Evolve.App.Services.Common.pageList.SrvList.getAllPageDetails(req.body.EvolvePage_Code);

            if (getAllPageDetails instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Page Details !",
                    result: getAllPageDetails.message
                };
                res.send(obj);
            } else if (getAllPageDetails.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: `Page Code : ${req.body.EvolvePage_Code} Not Created In Master!!`,
                    result: getAllPageDetails.message
                };
                res.send(obj);
            } else {

                let getPageFieldDetails = await Evolve.App.Services.Common.pageList.SrvList.getPageFieldDetails(getAllPageDetails.recordset[0].EvolvePage_ID);
                if (getPageFieldDetails instanceof Error || getPageFieldDetails.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: `Page Code : ${req.body.EvolvePage_Code}'s Field Detials is not Available In DB!!`,
                        result: getAllPageDetails.message
                    };
                    res.send(obj);
                } else {
                    let showPageFieldDetails = [];
                    for (let i = 0; i < getPageFieldDetails.recordset.length; i++) {
                        if (getPageFieldDetails.recordset[i].EvolvePageFields_InputType == 'SELECT') {

                            let query = getPageFieldDetails.recordset[i].EvolvePageFields_SelectQuery
                            let select = await Evolve.App.Services.Common.pageList.SrvList.selectQuery(query);
                            getPageFieldDetails.recordset[i].option = select.recordset
                        }
                        if (getPageFieldDetails.recordset[i].EvolvePageFields_ListIndex != 0) {
                            showPageFieldDetails.push(getPageFieldDetails.recordset[i]);
                        }
                    }
                    console.log("getPageFieldDetails.recordset[i].option", getPageFieldDetails.recordset);
                    if (getPageFieldDetails instanceof Error || getPageFieldDetails.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: `Page Code : ${req.body.EvolvePage_Code}'s Field Detials is not Available In DB!!`,
                            result: getAllPageDetails.message
                        };
                        res.send(obj);
                    }


                    let resObj = {
                        pageData: getAllPageDetails.recordset[0],
                        showPageFieldDetails: showPageFieldDetails,
                        pageFieldDetails: getPageFieldDetails.recordset
                    }
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: 'Page Details !!',
                        result: resObj
                    };
                    res.send(obj);
                }

            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Page Details !! " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting Page Details !! " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getPageDataList: async function(req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let query = "";
            for (let i = 0; i < req.body.columnList.length; i++) {
                if (req.body.columnList[i].EvolvePageFields_SearchType == null || req.body.columnList[i].EvolvePageFields_SearchType == 'null' || req.body.columnList[i].EvolvePageFields_SearchType == '') {
                    // Do Nothing..................
                } else {
                    if (query == "") {
                        query = `${req.body.columnList[i].EvolvePageFields_Code} LIKE '%${search}%'`
                    } else {
                        query = query + ` OR ${req.body.columnList[i].EvolvePageFields_Code} LIKE '%${search}%'`
                    }
                }
            }

            let getPageDataListCount = await Evolve.App.Services.Common.pageList.SrvList.getPageDataListCount(query, req.body.tableName);
            let getPageDataList = await Evolve.App.Services.Common.pageList.SrvList.getPageDataList(start, length, query, req.body.tableName);

            if (getPageDataList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get app list !",
                    result: getPageDataList.message
                };
                res.send(obj);
            } else {

                for (let i = 0; i < req.body.columnList.length; i++) {
                    if (req.body.columnList[i].EvolvePageFields_DataType.toLowerCase() == 'datetime') {

                        for (let j = 0; j < getPageDataList.recordset.length; j++) {
                            getPageDataList.recordset[j][req.body.columnList[i].EvolvePageFields_Code] = getPageDataList.recordset[j][req.body.columnList[i].EvolvePageFields_Code].toISOString().split('T')[0] + ' ' + getPageDataList.recordset[j][req.body.columnList[i].EvolvePageFields_Code].toISOString().split('T')[1].replace('.000Z', '')
                        }

                    }
                    if (req.body.columnList[i].EvolvePageFields_DataType.toLowerCase() == 'date') {
                        for (let j = 0; j < getPageDataList.recordset.length; j++) {
                            getPageDataList.recordset[j][req.body.columnList[i].EvolvePageFields_Code] = getPageDataList.recordset[j][req.body.columnList[i].EvolvePageFields_Code].toISOString().split('T')[0]
                        }
                    }
                    if (req.body.columnList[i].EvolvePageFields_DataType.toLowerCase() == 'time') {
                        for (let j = 0; j < getPageDataList.recordset.length; j++) {
                            getPageDataList.recordset[j][req.body.columnList[i].EvolvePageFields_Code] = getPageDataList.recordset[j][req.body.columnList[i].EvolvePageFields_Code].toISOString().split('T')[1].replace('.000Z', '')
                        }
                    }
                }


                let resObj = {
                    noOfRecord: getPageDataListCount.recordset[0].count,
                    records: getPageDataList.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Page Data List !!",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Page Data List !! " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting Page Data List !! " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deletePageRow: async function(req, res) {
        try {
            let deletePageRow = await Evolve.App.Services.Common.pageList.SrvList.deletePageRow(req.body);
            if (deletePageRow instanceof Error || deletePageRow.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EER####: Error while Delete Row ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Delete Successfully!!",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EER####: Error while Delete Row " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EER####: Error while Delete Row " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updatePageData: async function(req, res) {
        try {
            let pageDetails = req.body.pageDtails;
            let columnList = req.body.columnList;
            let rowData = req.body.rowData;
            let finalQuery = `UPDATE ${pageDetails.EvolvePage_Table} SET `;
            let query = "";
            for (let i = 0; i < columnList.length; i++) {
                if (columnList[i].EvolvePageFields_Index != 0) {
                    if (query == "") {
                        query = `${columnList[i].EvolvePageFields_Code} = '${rowData[columnList[i].EvolvePageFields_Code]}'`;
                    } else {
                        query = query + ` , ${columnList[i].EvolvePageFields_Code} = '${rowData[columnList[i].EvolvePageFields_Code]}'`;
                    }
                }
            }
            finalQuery = finalQuery + query + ` WHERE ${pageDetails.EvolvePage_PrimaryKeyColumn} = ${rowData[pageDetails.EvolvePage_PrimaryKeyColumn]}`;
            console.log("finalQuery>>>>>>>>>.", finalQuery);
            let updatePageData = await Evolve.App.Services.Common.pageList.SrvList.generalService(finalQuery);
            if (updatePageData instanceof Error || updatePageData.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EER####: Error while Update Page Data !! ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Data Updated Successfully !! ",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EER####: Error while Update Page Data !! " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EER####: Error while Update Page Data !! " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addPageData: async function(req, res) {
        try {

            let pageDetails = req.body.pageDtails;
            let columnList = req.body.columnList;
            let rowData = req.body.rowData;
            let finalQuery = `INSERT INTO ${pageDetails.EvolvePage_Table} ( `;
            let query = "";
            let valueQuery = "";
            let date = new Date();
            let currentTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            let createdQuery = pageDetails.EvolvePage_Table + "_CreatedAt"
            let createdQueryValue = currentTime

            for (let i = 0; i < columnList.length; i++) {
                if (columnList[i].EvolvePageFields_Index != 0) {
                    if (query == "") {
                        query = `${columnList[i].EvolvePageFields_Code}`;
                        valueQuery = `('${rowData[columnList[i].EvolvePageFields_Code]}'`

                    } else {
                        query = query + ` , ${columnList[i].EvolvePageFields_Code}`;
                        valueQuery = valueQuery + ` , '${rowData[columnList[i].EvolvePageFields_Code]}'`
                    }
                }
            }

            query = query + ` , ${createdQuery})`;
            valueQuery = valueQuery + ` , '${createdQueryValue}')`;
            finalQuery = finalQuery + query + ' VALUES ' + valueQuery;
            console.log("final Query is::::::", finalQuery);
            let addPageData = await Evolve.App.Services.Common.pageList.SrvList.generalService(finalQuery);
            if (addPageData instanceof Error || addPageData.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EER####: Error while Add Page Data !! ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Data Updated Successfully !! ",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EER####: Error while Add Page Data !! " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EER####: Error while Add Page Data !! " + error.message,
                result: null
            };
            res.send(obj);
        }
    }

}