'use strict';
const Evolve = require("../../../../Boot/Evolve");

var insertedid = "";

module.exports = {

    // Generate TruBot Token : start

    generateTrubotToken: async function () {
        try {
            var config = {
                method: 'post',
                url: Evolve.Config.TRUBOTURL + 'CockpitPublicWebApi/api/Account/Login',
                headers: {
                    'Content-Type': 'application/json',
    
                },
                auth: {
                    username: 'Admin',
                    password: 'Admin'
                }
            };
    
            let response = await Evolve.Axios(config);
            Evolve.Config.TRUBOTTOKEN = {
                token: response.data.token,
                sid: response.data.sid,
            }
    
            // console.log("token>>>", response);
            if (response.status == 200) {
                Evolve.Log.info("TruBot Token Generated Successfully")
            }
            else {
                Evolve.Log.error("Error in Generate TruBot Token")
            }
        } catch (error) {
            Evolve.Log.error("Error in Generate TruBot Token Come in Catch")
            console.log("Error in generate Trubot token in catch >>>>>", error);
        }
        

    },

    // Generate TruBot Token : end



    // Dashboard : start

    getBotListForDashabord: async function (req, res) {
        try {
            let getBotListForDashabord = await Evolve.App.Services.eTrubot.Report.SrvList.getBotListForDashabord();
            if (getBotListForDashabord instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR####: Error while get BOT  List For Dashabord " + error.message,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: " BOT List for Dashabord get Successfully ",
                    result: getBotListForDashabord.recordset
                };

                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get bot List For Dashabord " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get BOT List For Dashabord " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    SearchDatewiseBotForBatchart: async function (req, res) {
        try {
            let getDateWiseCountForCompletedForBarChart = await Evolve.App.Services.eTrubot.Report.SrvList.getDateWiseCountForCompletedForBarChart(req.body);

            if (getDateWiseCountForCompletedForBarChart instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR111: Error while get count for comleted ",
                    result: null
                };
                res.send(obj);
            } else {
                let getDateWiseCountForFailedForBarChart = await Evolve.App.Services.eTrubot.Report.SrvList.getDateWiseCountForFailedForBarChart(req.body);

                if (getDateWiseCountForFailedForBarChart instanceof Error) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: " EERR111: Error while get count for failed ",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let strtDate = new Date(req.body.StartDate)
                    let endDate = new Date(req.body.EndDate)
                    let initialTime = new Date(strtDate)
                    let endTime = new Date(endDate)
                    let arrTime = [];
                    let successCountArray = ["SUCCESS"]
                    let failedCountArray = ["FAIL"]
                    for (let q = initialTime; q <= endTime; q.setDate(q.getDate() + 1)) {
                        arrTime.push(q.toString());
                    }
                    for (let i = 0; i < arrTime.length; i++) {
                        let datetime = new Date(arrTime[i])
                        let format_year = datetime.getFullYear()
                        let format_Month = (datetime.getMonth() + 1)
                        let format_date = datetime.getDate()
                        if (format_Month.toString().length == 1) {
                            format_Month = "0" + (datetime.getMonth() + 1)
                        }
                        if (format_date.toString().length == 1) {
                            format_date = "0" + datetime.getDate()
                        }
                        let formatted_date = format_year + "-" + format_Month + "-" + format_date
                        arrTime[i] = formatted_date
                        let CompletedArrayresult = getDateWiseCountForCompletedForBarChart.recordset
                        let CompletedArrayindex = CompletedArrayresult.findIndex((element) => element.date == arrTime[i])
                        if (CompletedArrayindex == -1) {
                            successCountArray.push(0)
                        } else {
                            successCountArray.push(CompletedArrayresult[CompletedArrayindex].Completed)
                        }
                        let FailedArrayresult = getDateWiseCountForFailedForBarChart.recordset
                        let FailoedArrayindex = FailedArrayresult.findIndex((element) => element.date == arrTime[i])
                        if (FailoedArrayindex == -1) {
                            failedCountArray.push(0)
                        } else {
                            failedCountArray.push(FailedArrayresult[FailoedArrayindex].Failed)
                        }
                    }
                    let obj = {
                        statusCode: 200,
                        status: "Success",
                        message: " count get Successfully ",
                        result: [successCountArray, failedCountArray, arrTime]
                    };

                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get count for barchart  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR1111: Error while get count for barchart " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    SearchMonthWiseBotForBatchart : async function (req, res){
        try{
            console.log("req:::::::::::::", req.body)
            let getMonthWiseCountForCompletedForBarChart = await Evolve.App.Services.eTrubot.Report.SrvList.getMonthWiseCountForCompletedForBarChart(req.body);
            if (getMonthWiseCountForCompletedForBarChart instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR1112: Error while get count for comleted ",
                    result: null
                };
                res.send(obj);
            }else{
                let getMonthWiseCountForFailedForBarChart = await Evolve.App.Services.eTrubot.Report.SrvList.getMonthWiseCountForFailedForBarChart(req.body);
                if (getMonthWiseCountForFailedForBarChart instanceof Error) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: " EERR1112: Error while get count for Failed ",
                        result: null
                    };
                    res.send(obj);
                }else{
                    console.log("getMonthWiseCountForCompletedForBarChart:::::", getMonthWiseCountForCompletedForBarChart.recordset);
                    console.log("getMonthWiseCountForFailedForBarChart:::::", getMonthWiseCountForFailedForBarChart.recordset);

                    let year = req.body.SelectedYear
                    let month = req.body.SelectedMonth
                    let successCountArray = ["SUCCESS"]
                    let failedCountArray = ["FAIL"]
                    let d = new Date(year, month, 0);

                    let count = d.getDate();

                    let allDateArray = [];
                    for (let i = 0; i < count; i++) {
                        let da = `${i+1}`
                    if (month.toString().length == 1) {
                        month = "0" + req.body.SelectedMonth
                    }
                    if (da.toString().length == 1) {
                        da = "0" + `${i+1}`                       
                    }
                    allDateArray.push(`${year}-${month}-${da}`)
                    }
                    for (let i = 0; i < allDateArray.length; i++) {
                     let CompletedArrayresult = getMonthWiseCountForCompletedForBarChart.recordset
                     let CompletedArrayindex = CompletedArrayresult.findIndex((element) => element.date == allDateArray[i])
                     if (CompletedArrayindex == -1) {
                         successCountArray.push(0)
                     } else {
                         successCountArray.push(CompletedArrayresult[CompletedArrayindex].Completed)
                     }

                     let FailedArrayresult = getMonthWiseCountForFailedForBarChart.recordset
                     let FailedArrayindex = FailedArrayresult.findIndex((element) => element.date == allDateArray[i])    
                     if (FailedArrayindex == -1) {
                        failedCountArray.push(0)
                     } else {
                        failedCountArray.push(FailedArrayresult[FailedArrayindex].Failed)
                     }
                    }
                    let obj = {
                        statusCode: 200,
                        status: "Success",
                        message: " count get Successfully ",
                        result: [successCountArray, failedCountArray, allDateArray]
                    };
                    res.send(obj);
                }
            }
        }
        catch(error){
            Evolve.Log.error(" EERR####: Error while Get count for areachart  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR1111: Error while get count for areachart " + error.message,
                result: null
            };
            res.send(obj);
        }

        
          
    },

    SearchDateWiseBotForAreachart: async function (req, res) {
        try {
            let getDateWiseCountForCompletedForAreaChart = await Evolve.App.Services.eTrubot.Report.SrvList.getDateWiseCountForCompletedForAreaChart(req.body);
            if (getDateWiseCountForCompletedForAreaChart instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR1112: Error while get count for comleted ",
                    result: null
                };
                res.send(obj);
            } else {
                let getDateWiseCountForFailedAreaChart = await Evolve.App.Services.eTrubot.Report.SrvList.getDateWiseCountForFailedAreaChart(req.body);
                if (getDateWiseCountForFailedAreaChart instanceof Error) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: " EERR1112: Error while get count for failed ",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let strtDate = new Date(req.body.StartDate)
                    let endDate = new Date(req.body.EndDate)
                    let initialTime = new Date(strtDate)
                    let endTime = new Date(endDate)
                    let arrTime = [];
                    let successCountArray = ["SUCCESS"]
                    let failedCountArray = ["FAIL"]
                    for (let q = initialTime; q <= endTime; q.setDate(q.getDate() + 1)) {
                        arrTime.push(q.toString());
                    }
                    for (let i = 0; i < arrTime.length; i++) {
                        let datetime = new Date(arrTime[i])
                        let format_year = datetime.getFullYear()
                        let format_Month = (datetime.getMonth() + 1)
                        let format_date = datetime.getDate()
                        if (format_Month.toString().length == 1) {
                            format_Month = "0" + (datetime.getMonth() + 1)
                        }
                        if (format_date.toString().length == 1) {
                            format_date = "0" + datetime.getDate()
                        }
                        let formatted_date = format_year + "-" + format_Month + "-" + format_date
                        arrTime[i] = formatted_date
                        let CompletedArrayresult = getDateWiseCountForCompletedForAreaChart.recordset
                        let CompletedArrayindex = CompletedArrayresult.findIndex((element) => element.date == arrTime[i])
                        if (CompletedArrayindex == -1) {
                            successCountArray.push(0)
                        } else {
                            successCountArray.push(CompletedArrayresult[CompletedArrayindex].Completed)
                        }
                        let FailedArrayresult = getDateWiseCountForFailedAreaChart.recordset
                        let FailedArrayindex = FailedArrayresult.findIndex((element) => element.date == arrTime[i])
                        if (FailedArrayindex == -1) {
                            failedCountArray.push(0)
                        } else {
                            failedCountArray.push(FailedArrayresult[FailedArrayindex].Failed)
                        }
                    }
                    let obj = {
                        statusCode: 200,
                        status: "Success",
                        message: " count get Successfully ",
                        result: [successCountArray, failedCountArray, arrTime]
                    };

                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get count for areachart  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR1111: Error while get count for areachart " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    SearchMonthWiseBotForAreachart : async function(req, res){
        try {
            console.log("req:::::::::::::", req.body)
            let getMonthWiseCountForCompletedForAreaChart = await Evolve.App.Services.eTrubot.Report.SrvList.getMonthWiseCountForCompletedForAreaChart(req.body);
            if (getMonthWiseCountForCompletedForAreaChart instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR1112: Error while get count for comleted ",
                    result: null
                };
                res.send(obj);
            }else{
                let getMonthWiseCountForFailedForAreaChart = await Evolve.App.Services.eTrubot.Report.SrvList.getMonthWiseCountForFailedForAreaChart(req.body);
                if (getMonthWiseCountForFailedForAreaChart instanceof Error) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: " EERR1112: Error while get count for Failed ",
                        result: null
                    };
                    res.send(obj);
                }else{
                    console.log("getMonthWiseCountForCompletedForAreaChart:::::", getMonthWiseCountForCompletedForAreaChart.recordset);
                    console.log("getMonthWiseCountForFailedForAreaChart:::::", getMonthWiseCountForFailedForAreaChart.recordset);

                    let year = req.body.SelectedYear
                    let month = req.body.SelectedMonth
                    let successCountArray = ["SUCCESS"]
                    let failedCountArray = ["FAIL"]
                    let d = new Date(year, month, 0);

                    let count = d.getDate();

                    let allDateArray = [];
                    for (let i = 0; i < count; i++) {
                        let da = `${i+1}`
                    if (month.toString().length == 1) {
                        month = "0" + req.body.SelectedMonth
                    }
                    if (da.toString().length == 1) {
                        da = "0" + `${i+1}`                       
                    }
                    allDateArray.push(`${year}-${month}-${da}`)
                    }
                    for (let i = 0; i < allDateArray.length; i++) {
                     let CompletedArrayresult = getMonthWiseCountForCompletedForAreaChart.recordset
                     let CompletedArrayindex = CompletedArrayresult.findIndex((element) => element.date == allDateArray[i])
                     if (CompletedArrayindex == -1) {
                         successCountArray.push(0)
                     } else {
                         successCountArray.push(CompletedArrayresult[CompletedArrayindex].Completed)
                     }

                     let FailedArrayresult = getMonthWiseCountForFailedForAreaChart.recordset
                     let FailedArrayindex = FailedArrayresult.findIndex((element) => element.date == allDateArray[i])    
                     if (FailedArrayindex == -1) {
                        failedCountArray.push(0)
                     } else {
                        failedCountArray.push(FailedArrayresult[FailedArrayindex].Failed)
                     }
                    }
                    let obj = {
                        statusCode: 200,
                        status: "Success",
                        message: " count get Successfully ",
                        result: [successCountArray, failedCountArray, allDateArray]
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get count for areachart  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR1111: Error while get count for areachart " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // Dashboard : end



    // Bot List : start

    getBotList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let getBotListCount = await Evolve.App.Services.eTrubot.Report.SrvList.getBotListCount(search);
            let getBotList = await Evolve.App.Services.eTrubot.Report.SrvList.getBotList(start, length, search);
            if (getBotList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR####: Error while get BOT  List ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: " BOT List get Successfully ",
                    noOfRecord: getBotListCount.recordset[0].count,
                    result: getBotList.recordset
                };

                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR3329: Error while Get bot List  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3329: Error while get BOT List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    onClickTrueButton: async function (req, res) {
        console.log("Bot ID For RunBot>>>>>>>", req);
        try {
            let BotId = '';
            if (req.chatBot == true) {
                BotId = req.BotId;
            }
            else{
                req.body.EvolveUser_ID = req.EvolveUser_ID;
                BotId = req.body.BotId
            }
            let config = {
                method: 'post',
                url: Evolve.Config.TRUBOTURL + 'CockpitPublicWebApi/api/Bot/RunBot',
                headers: {
                    'UD-MS': Evolve.Config.TRUBOTTOKEN.sid,
                    'Authorization': 'Bearer ' + Evolve.Config.TRUBOTTOKEN.token,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    "BotId": BotId
                })
            }
            let response = await Evolve.Axios(config);
            console.log("RunBot Response>>>>>>>", response.data);
            if (response.status == 200) {
                if (response.data.status == 200) {
                    Evolve.Config.JOBID = response.data.jobExecutionId;
                    let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
                    let insartStartTime = await Evolve.App.Services.eTrubot.Report.SrvList.insartStartTime(BotId, datetime);
                    
                    if (insartStartTime instanceof Error || insartStartTime.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Error on adding insartStartTime!",
                            result: insartStartTime.message
                        };
                    }
                    else {
                        insertedid = insartStartTime.recordset[0].inserted_id;
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "new Bot added",
                            result: null
                        };
                    }
                    if (req.chatBot == true) {
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: response.data.message,
                            result: null
                        };
                        return obj;
                    }
                    else{
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: response.data.message,
                            result: null
                        };
                        res.send(obj);
                    }
                    
                } else {
                    if (req.chatBot == true) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: response.data.message,
                            result: null
                        };
                        return obj;
                    }
                    else{
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: response.data.message,
                            result: null
                        };
                        res.send(obj);
                    }
                    
                }
            } else if (response.status == 409) {
                if (req.chatBot == true) {
                    let obj = {
                        statusCode: 400,
                        status: "success",
                        message: response.data,
                        result: null
                    };
                    return obj;
                }
                else{
                    let obj = {
                        statusCode: 400,
                        status: "success",
                        message: response.data,
                        result: null
                    };
                    res.send(obj);
                }
            } else {
                if (req.chatBot == true) {
                    let obj = {
                        statusCode: 400,
                        status: "success",
                        message: "Issue in RunBot",
                        result: null
                    };
                    return obj;
                }
                else{
                    let obj = {
                        statusCode: 400,
                        status: "success",
                        message: "Issue in RunBot",
                        result: null
                    };
                    res.send(obj);
                }
                
            }
        } 
        catch (error) {
            if (req.chatBot == true) {
                let obj = {
                    statusCode: 400,
                    status: "success",
                    message: "Issue in RunBot",
                    result: null
                };
                return obj;
            }
            else{
                let obj = {
                    statusCode: 400,
                    status: "success",
                    message: "Issue in RunBot",
                    result: null
                };
                res.send(obj);
            }
            
        }

    },

    getBotstatus: async function (req, res) {
        try {
            let config = {
                method: 'post',
                url: Evolve.Config.TRUBOTURL + 'CockpitPublicWebApi/api/Bot/GetJobStatus',
                headers: {
                    'UD-MS': Evolve.Config.TRUBOTTOKEN.sid,
                    'Authorization': 'Bearer ' + Evolve.Config.TRUBOTTOKEN.token,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    "JobExecutionId": Evolve.Config.JOBID
                })
            }

            let response = await Evolve.Axios(config);
            console.log("Job Status for Trubot >>>>>", response.data);
            if (response.status == 200) {
                let botStatus = response.data.status
                let botMsg = response.data.message
                let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
                let statusUpdate = await Evolve.App.Services.eTrubot.Report.SrvList.statusUpdate(req.body, datetime, botStatus, botMsg, insertedid);
                if (statusUpdate instanceof Error || statusUpdate.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error on adding Bot Status::::::::::: !",
                        result: statusUpdate.message
                    };
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "adding Bot Status",
                        result: null
                    };
                }

                if (req.chatBot == true) {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Get RunBot Status",
                        result: response.data
                    };
                    return obj;
                }
                else{
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Get RunBot Status",
                        result: response.data
                    };
                    res.send(obj);
                }

                
            }
            else if (response.status == 409) {
                if (req.chatBot == true) {
                    let obj = {
                        statusCode: 400,
                        status: "success",
                        message: response.data,
                        result: null
                    };
                    return obj;
                }
                else{
                    let obj = {
                        statusCode: 400,
                        status: "success",
                        message: response.data,
                        result: null
                    };
                    res.send(obj)
                }
                
            }
            else {
                if (req.chatBot == true) {
                    let obj = {
                        statusCode: 400,
                        status: "success",
                        message: "Issue in Get RunBot Status ",
                        result: null
                    };
                    return obj;
                }
                else{
                    let obj = {
                        statusCode: 400,
                        status: "success",
                        message: "Issue in Get RunBot Status ",
                        result: null
                    };
                    res.send(obj);
                }
                
            }
        } catch (error) {
            if (req.chatBot == true) {
                let obj = {
                    statusCode: 400,
                    status: "success",
                    message: "Issue in Get RunBot Status ",
                    result: null
                };
                return obj;
            }
            else{
                let obj = {
                    statusCode: 400,
                    status: "success",
                    message: "Issue in Get RunBot Status ",
                    result: null
                };
                res.send(obj);
            }
            
        }
    },

    getStatusAndLastrunTime: async function (req, res) {
        try {
            let getLastrunTime = await Evolve.App.Services.eTrubot.Report.SrvList.getLastrunTime();
            if (getLastrunTime instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR####: Error while get Status And Last runTime" + error.message,
                    result: null
                };
                res.send(obj);
            } else {
                let StatusAndLastrunTime = [];
                let statusandtime = {};
                for (let i = 0; i < getLastrunTime.recordset.length; i++) {
                    let lastTime = getLastrunTime.recordset[i]
                    let getStatus = await Evolve.App.Services.eTrubot.Report.SrvList.getStatus(lastTime);
                    if (getStatus instanceof Error || getStatus.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: " EERR####: Error while get Status And Last runTime " + error.message,
                            result: null
                        };
                        res.send(obj);
                    } else {
                        statusandtime = {
                            LastTime: getLastrunTime.recordset[i].LastRunTime,
                            Status: getStatus.recordset[0].EvolveBotHistory_Status,
                            Botid: getStatus.recordset[0].EvolveBot_UrlID,
                        }
                        StatusAndLastrunTime.push(statusandtime)
                    }
                }

                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: " Status And Last runTime get Successfully ",
                    result: StatusAndLastrunTime
                };

                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get Status And Last runTime  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Status And Last runTime " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // Bot List : end



    // Add Bot : start

    updateRoleToUser: async function (req, res) {
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        try {
            let error = false

            for (let i = 0; i < req.body.selectedUserArray.length; i++) {
                if (error == false) {
                    let usrename = req.body.selectedUserArray[i]
                    let selectUser = await Evolve.App.Services.eTrubot.Report.SrvList.selectUser(usrename);
                    if (selectUser instanceof Error || selectUser.rowsAffected < 1) {
                        error = true

                    } else {
                        req.body.selectedUserArray[i] = selectUser.recordset[0].EvolveUser_ID;

                    }
                }
            }
            if (error == false) {
                let deletedbotID = await Evolve.App.Services.eTrubot.Report.SrvList.deletedbotID(req.body);
                // if (deletedbotID instanceof Error || deletedbotID.rowsAffected < 1) {
                //     error = true
                // }
                // else {
                // }
            }
            if (error == false) {
                for (let j = 0; j < req.body.selectedUserArray.length; j++) {
                    let userId = req.body.selectedUserArray[j]
                    let updateRoleToUser = await Evolve.App.Services.eTrubot.Report.SrvList.updateRoleToUser(req.body, userId);

                    if (updateRoleToUser instanceof Error || updateRoleToUser.rowsAffected < 1) {
                        error = true
                    } else { }

                }
            }
            if (error == false) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Role updated successfully",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update Role to user !",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0392: Error while updating Role To user " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0392: Error while updating Role To User " + error.message,
                result: null
            };
            res.send(obj);
        }

    },

    getUserByRoleId: async function (req, res) {
        try {

            let getRoleWiseUserId = await Evolve.App.Services.eTrubot.Report.SrvList.getRoleWiseUserId(req.body);
            if (getRoleWiseUserId instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR####: Error while get User  List ",
                    result: null
                };
                res.send(obj);
            } else {
                let getUserByRoleId = await Evolve.App.Services.eTrubot.Report.SrvList.getUserByRoleId(req.body);
                if (getUserByRoleId instanceof Error || getUserByRoleId.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: " EERR####: Error while get User  List ",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let data = []
                    let user = {}
                    for (let i = 0; i < getUserByRoleId.recordset.length; i++) {
                        let matchedUserID = getRoleWiseUserId.recordset.some(userId => {
                            if (userId.EvolveUser_ID == getUserByRoleId.recordset[i].EvolveUser_ID) {
                                return true;
                            } else {
                                return false;
                            }

                        })

                        if (matchedUserID == true) {
                            user = {
                                expanded: true,
                                folder: true,
                                icon: 'mdi mdi-folder-move',
                                selected: true,
                                title: getUserByRoleId.recordset[i].EvolveUser_Name,
                            }
                        } else {
                            user = {
                                expanded: true,
                                folder: true,
                                icon: 'mdi mdi-folder-move',
                                selected: false,
                                title: getUserByRoleId.recordset[i].EvolveUser_Name,
                            }
                        }

                        data.push(user)

                    }
                    let obj = {
                        statusCode: 200,
                        status: "Success",
                        message: " User List get Successfully ",
                        result: data
                    };

                    res.send(obj);
                }
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get User List  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get USer List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getRoleList: async function (req, res) {
        try {
            let getRoleList = await Evolve.App.Services.eTrubot.Report.SrvList.getRoleList();
            if (getRoleList instanceof Error || getRoleList.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR####: Error while get Role  List " + error.message,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: " Role List get Successfully ",
                    result: getRoleList.recordset
                };

                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get Role List  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Role List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    selectSingleBot: async function (req, res) {
        try {

            let selectSingleBot = await Evolve.App.Services.eTrubot.Report.SrvList.selectSingleBot(req.body);
            if (selectSingleBot instanceof Error || selectSingleBot.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on select single BOt list !",
                    result: selectSingleBot.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "single Bot",
                    result: selectSingleBot.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR32520: Error while getting single Bot  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32520: Error while getting single Bot  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    createBot: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let createBot = await Evolve.App.Services.eTrubot.Report.SrvList.createBot(req.body);
            if (createBot instanceof Error || createBot.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on adding new Bot !",
                    result: createBot.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "new Bot added",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR32521: Error while adding Bot  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32521: Error while adding Bot  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateBot: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let updateBot = await Evolve.App.Services.eTrubot.Report.SrvList.updateBot(req.body);
            if (updateBot instanceof Error || updateBot.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on updating  Bot !",
                    result: updateBot.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Bot updated",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR32521: Error while updating Bot  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32521: Error while updating Bot  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // Add Bot : end



    // Chat Bot : start

    getVoiceRecognizeData : async function (req, res) {
        try {

            if (req.body) {

                // res.send("Evolve Get Data Successfully")
                // await Evolve.Io.emit('botIdFromVoiceCommand', {
                //     message: 'Bot ID Get From Voice Command',
                //     botId: req.body.botId
                // });
                Evolve.Log.info("Voice Recognized Data Command Send Suucessfully")

                let result = await Evolve.App.Controllers.eTrubot.Report.ConList.onClickTrueButton({
                    BotId : req.body.botId,
                    chatBot : true
                });
                console.log("chat response>>>>>>>>", result);
                res.send(result);
            }



        } catch (error) {
            Evolve.Log.error("Error getVoiceRecognizeData>>>>>>>>>>>>>>>", error);
        }

    },

    getBotStatusByVoiceCommand : async function (req, res) {
        try {

            let result = await Evolve.App.Controllers.eTrubot.Report.ConList.getBotstatus({
                chatBot : true
            });
            console.log("bot status by voice response>>>>>>>>", result);
            res.send(result);


        } catch (error) {
            Evolve.Log.error("Error getBotStatusByVoiceCommand>>>>>>>>>>>>>>>", error);
        }

    },

    // Chat Bot : end 
  

}