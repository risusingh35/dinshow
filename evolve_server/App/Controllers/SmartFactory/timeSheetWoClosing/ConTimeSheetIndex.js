'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getMachineList : async function (req, res) {
        try {
            let getMachineList = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getMachineList(req.body);
            if (getMachineList instanceof Error) 
            {
              Evolve.Log.error("EERR2853 : Error while getting machine list ");
              let obj = {statusCode: 400,status: "fail",message: "EERR2853 : Error while getting machine list",result: null};
                res.send(obj);
            } else {
                let obj = {statusCode: 200,status: "success",message: "Machine gotted successfully",result: getMachineList.recordset};
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2854 : Error while getting machine list "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2854 : Error while getting machine list",result: null};
            res.send(obj);
        }
    },

    getSectionList : async function (req, res) {
        try {
            let getSectionList = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getSectionList();
            if (getSectionList instanceof Error) 
            {
                Evolve.Log.error("EERR2855 : Error while getting section list ");
                let obj = {statusCode: 400,status: "fail",message: "EERR2855 : Error while getting section list",result: null};
                res.send(obj);
            } else {
                let obj = {statusCode: 200,status: "success",message: "Section gotted successfully",result: getSectionList.recordset};
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2856 : Error while getting section list "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2856 : Error while getting section list",result: null};
            res.send(obj);
        }
    },

    getTimesheetList: async function (req, res) {
        try {
             let addTs = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getTimesheetList(req.body);
                   if (addTs instanceof Error ) {
                        Evolve.Log.error("EERR2857 : Error while get time sheet list ")
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "EERR2857 : Error while get time sheet list"   ,
                            result: null
                    };
                    res.send(obj);
                     } else {
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Timesheet list getted successfully ",
                            result:addTs.recordset          
                        };
                        res.send(obj);
                //  }
        }
        } catch (error) {
            Evolve.Log.error(" EERR2858: Error while get time sheet list "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2858 : Error while get time sheet list",result: null};
            res.send(obj);
        }
    },
    
    onTimeSheetApprove: async function (req, res) {
        try {
           let addTs = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.onTimeSheetApprove(req.body);
            if (addTs instanceof Error ) {
                Evolve.Log.error("EERR2859 : Error while approve timesheet ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2859 : Error while approve timesheet"   ,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Timesheet approved successfully ",
                    result:addTs.recordset          
                };
                res.send(obj);
    
            }
        } catch (error) {
            Evolve.Log.error(" EERR2860: Error while approve timesheet "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2860 : Error while approve timesheet",result: null};
            res.send(obj);
        }
    },
    onTsPostToErp: async function (req, res) {
        try {
            let error = false ;
            for(let i = 0 ; i<req.body.tsToPostErp.length ; i++){
                if(error == false){
                    let postToErp = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.onTsPostToErp(req.body.tsToPostErp[i].EvolveTimesheet_ID);
                    if (postToErp instanceof Error || postToErp.rowsAffected < 1   ) {
                        error = true ;
                    }
                }
            }   
    
            if (error  == true) {
                Evolve.Log.error("EERR2861 :Error while post to erp ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2861 :Error while post to erp"   ,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "POSTED TO ERP SUCCESSFULLY ",
                    result:null         
                };
                res.send(obj);
    
            }
        } catch (error) {
            Evolve.Log.error(" EERR2862: Error while post to erp "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2862 : Error while post to erp",result: null};
            res.send(obj);
        }
    },
    deleteTimeSheet: async function (req, res) {
        try {
            let error = false ; 
            req.body.EvolveUser_ID = req.EvolveUser_ID;
             let deleteSheet = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.deleteTimeSheet(req.body.deleteSheetId);
                if (deleteSheet instanceof Error || deleteSheet.rowsAffected<1 ){
                    error=true;
                }else{

                    for(let i=0 ; i<req.body.updateArray.length ; i++){
                        if(error == false){
                            let updateSheetOnDelete = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.updateSheetOnDelete(req.body.updateArray[i] , req.body.EvolveUser_ID);
                            if (updateSheetOnDelete instanceof Error || updateSheetOnDelete.rowsAffected<1 ){
                                error=true;
                            }
                        }


                    }
             }
                
            if (error == true) {
                Evolve.Log.error("EERR2863 : Error while delete timesheet ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2863 : Error while delete timesheet"   ,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Timesheet deleted successfully ",
                    result:null          
                };
                res.send(obj);
    
            }
        } catch (error) {
            Evolve.Log.error(" EERR2864: Error while delete timesheet "+error.message);
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2864 : Error while delete timesheet "   ,
                    result: null
                };
                res.send(obj);
        }
    },
    getOperatorData: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let userData = await await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getOperatorData(req.body);
            if (userData instanceof Error ) {
                Evolve.Log.error("EERR2865 : Error while get operator data ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2865 : Error while get operator data"   ,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Operator data",
                    result: userData.recordset[0]            };
                res.send(obj);
    
            }
        } catch (error) {
            Evolve.Log.error(" EERR2866: Error while get operator data "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2866 : Error while get operator data",result: null};
            res.send(obj);
        }
    },

    getWoList: async function (req, res) {
        try {
              let getWoList = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getWoList(req.body);
            
            if (getWoList instanceof Error ) {
                Evolve.Log.error("EERR2867 : Error while get wo list ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2867 : Error while get wo list"   ,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "wo list",
                    result:getWoList.recordset          
                };
                res.send(obj);
    
            }
        } catch (error) {
            Evolve.Log.error(" EERR2868: Error while get wo list "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2868 : Error while get wo list",result: null};
            res.send(obj);
        }
    },
    getSubReasonCodeList: async function (req, res) {
        try {
             let list = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getSubReasonCodeList(req.body);
            if (list instanceof Error ) {
                Evolve.Log.error("EERR2869 : Error while get sub reason code list ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2869 : Error while get sub reason code list"   ,
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "sub Reason list",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2870 : Error while get sub reason code list "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2870 : Error while get sub reason code list",result: null};
            res.send(obj);
        }
    },
    getRtsReasonCodeList: async function (req, res) {
        try {
             let list = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getRtsReasonCodeList();
            if (list instanceof Error ) {
                Evolve.Log.error("EERR2871 : Error while get reason code list ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2871 : Error while get reason code list"   ,
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Reason list",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2872: Error while get reason code list "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2872 : Error while get reason code list",result: null};
            res.send(obj);
        }
    },
    // getTsShiftList: async function (req, res) {
    //     try {
    //        let shiftList = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getTsShiftList(req.body);
    //        let shifts = [];
    //        let count = 0;
    //         if (shiftList instanceof Error ) {
    //             Evolve.Log.error("EERR2873 : Error while get shift list ")
    //               let obj = {
    //                 statusCode: 400,
    //                 status: "fail",
    //                 message: "EERR2873 : Error while get shift list"   ,
    //                 result: null
    //             };
    //             res.send(obj);
    //         } else {
    //             let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime(); 
    //             for(let i=0 ; i<shiftList.recordset.length ; i++){
    //               if(count != 5){
    //                     let getShifTName = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getShifTName(shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime);
    //                     if (getShifTName instanceof Error || getShifTName.rowsAffected<1) {
    //                         Evolve.Log.error("EERR2874 : Error while get shift name ");
    //                         let obj = {
    //                             statusCode: 400,
    //                             status: "fail",
    //                             message: "EERR2874 : Error while get shift name"   ,
    //                             result: null
    //                         };
    //                         res.send(obj)
    //                      }else{ 
    //                 let startDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime+'Z');
    //                 let endDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime+'Z').addHours(parseFloat(shiftList.recordset[i].EvolveMachineCalendar_Shift3))
    //                 let startDate = shiftList.recordset[i].EvolveMachineCalendar_Date;
    //                 let endDate  = endDateTime.getUTCFullYear()+'-'+('0' + (endDateTime.getUTCMonth()+1)).slice(-2)+'-'+('0' + endDateTime.getUTCDate()).slice(-2);
    //                 let cureentDate = new Date().getUTCFullYear()+'-'+('0' + (new Date().getUTCMonth()+1)).slice(-2)+'-'+('0' + new Date().getUTCDate()).slice(-2)
    //                 let currentTime =dateTime.slice(11 ,21) 
    //                 let startTime  = shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime;
    //                 let endTime  =new Date(endDateTime)
    //                 let endedTime = ('0' + (endTime.getUTCHours())).slice(-2)+':'+('0' + (endTime.getUTCMinutes())).slice(-2)+':'+('0' + (endTime.getSeconds())).slice(-2);
    //                 if(cureentDate == startDate || cureentDate == endDate  ){
    //                       if(currentTime>=startTime && currentTime<=endedTime){
    //                     shifts = [] ;
    //                     shifts.push({
    //                         startTime : startTime ,
    //                         endedTime : endedTime,
    //                         date : shiftList.recordset[i].calendarDate,
    //                         dateTime : {
    //                             startDateTime : startDateTime,
    //                             endDateTime : endDateTime,
    //                         },
    //                       shiftNo :3,
    //                       currentShift : true ,
    //                       EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID, 
    //                       shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                       });
    //                       count=0 ;
    //                }else{
    //                     shifts.push({
                            
    //                         startTime : startTime ,
    //                         endedTime : endedTime,
    //                         date : shiftList.recordset[i].calendarDate,
    //                         dateTime : {
    //                             startDateTime : startDateTime,
    //                             endDateTime : endDateTime,
    //                         },
    //                       shiftNo :3,
    //                       currentShift : false , 
    //                       EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID,
    //                       shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                       });
    //                       count+=1 ;
    //                  }
                    
                 
    //                 }else{
    //                     shifts.push({
                            
    //                         startTime : startTime ,
    //                         endedTime : endedTime,
    //                         date : shiftList.recordset[i].calendarDate,
    //                         dateTime : {
    //                             startDateTime : startDateTime,
    //                             endDateTime : endDateTime,
    //                         },
    //                     shiftNo :3,
    //                     EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID, 
    //                     currentShift : false ,
    //                     shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                     });
    //                     count+=1 ;
    //                 }
    //                 }
    //               }
        
    //               if(count != 5){
    //                 let getShifTName = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getShifTName(shiftList.recordset[i].EvolveMachineCalendar_Shift2StartTime);
    //                 if (getShifTName instanceof Error ) {
    //                     Evolve.Log.error("EERR2875 : Error while get shift name ");
    //                     let obj = {
    //                         statusCode: 400,
    //                         status: "fail",
    //                         message: "EERR2875 : Error while get shift name"   ,
    //                         result: null
    //                     };
    //                     res.send(obj)

    //                  }else{
                
                         
    //                     let startDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift2StartTime+'Z');
    //                     let endDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift2StartTime+'Z').addHours(parseFloat(shiftList.recordset[i].EvolveMachineCalendar_Shift2))

    //                     let startDate = shiftList.recordset[i].EvolveMachineCalendar_Date;
    //                     let endDate  = endDateTime.getUTCFullYear()+'-'+('0' + (endDateTime.getUTCMonth()+1)).slice(-2)+'-'+('0' + endDateTime.getUTCDate()).slice(-2);
    //                     let cureentDate = new Date().getUTCFullYear()+'-'+('0' + (new Date().getUTCMonth()+1)).slice(-2)+'-'+('0' + new Date().getUTCDate()).slice(-2)
    //                     let currentTime =dateTime.slice(11 ,21) 
    //                     let startTime  = shiftList.recordset[i].EvolveMachineCalendar_Shift2StartTime;
    //                     let endTime  =new Date(endDateTime)
    //                     let endedTime = ('0' + (endTime.getUTCHours())).slice(-2)+':'+('0' + (endTime.getUTCMinutes())).slice(-2)+':'+('0' + (endTime.getSeconds())).slice(-2);
    //                     if(cureentDate == startDate || cureentDate == endDate  ){
    //                           if(currentTime>=startTime && currentTime<=endedTime){
    //                         shifts = [] ;
    //                         shifts.push({
    //                             startTime : startTime ,
    //                             endedTime : endedTime,
    //                             date : shiftList.recordset[i].calendarDate,
    //                             dateTime : {
    //                                 startDateTime : startDateTime,
    //                                 endDateTime : endDateTime,
    //                             },
    //                           shiftNo :2,
    //                           currentShift : true ,
    //                           EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID, 
    //                           shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                           });
    //                           count=0 ;
    //                    }else{
    //                         shifts.push({
                                
    //                             startTime : startTime ,
    //                             endedTime : endedTime,
    //                             date : shiftList.recordset[i].calendarDate,
    //                             dateTime : {
    //                                 startDateTime : startDateTime,
    //                                 endDateTime : endDateTime,
    //                             },
    //                           shiftNo :2,
    //                           currentShift : false , 
    //                           EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID,
    //                           shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                           });
    //                           count+=1 ;
    //                      }
                        
                     
    //                     }else{
    //                         shifts.push({
                                
    //                             startTime : startTime ,
    //                             endedTime : endedTime,
    //                             date : shiftList.recordset[i].calendarDate,
    //                             dateTime : {
    //                                 startDateTime : startDateTime,
    //                                 endDateTime : endDateTime,
    //                             },
    //                         shiftNo :2,
    //                         EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID, 
    //                         currentShift : false ,
    //                         shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                         });
    //                         count+=1 ;
    //                     }
    //                 }
    //               }
    //               if(count != 5){
    //                 let getShifTName = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getShifTName(shiftList.recordset[i].EvolveMachineCalendar_Shift1StartTime);
    //                 if (getShifTName instanceof Error ) {
    //                     Evolve.Log.error("EERR2876 : Error while get shift name ");
    //                     let obj = {
    //                         statusCode: 400,
    //                         status: "fail",
    //                         message: "EERR2876 : Error while get shift name"   ,
    //                         result: null
    //                     };
    //                     res.send(obj)

    //                  }else{
    //                     let startDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift1StartTime+'Z');
    //                     let endDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift1StartTime+'Z').addHours(parseFloat(shiftList.recordset[i].EvolveMachineCalendar_Shift1))
    //                     let startDate = shiftList.recordset[i].EvolveMachineCalendar_Date;
    //                     let endDate  = endDateTime.getUTCFullYear()+'-'+('0' + (endDateTime.getUTCMonth()+1)).slice(-2)+'-'+('0' + endDateTime.getUTCDate()).slice(-2);
    //                     let cureentDate = new Date().getUTCFullYear()+'-'+('0' + (new Date().getUTCMonth()+1)).slice(-2)+'-'+('0' + new Date().getUTCDate()).slice(-2)

    //                     let startTime  = shiftList.recordset[i].EvolveMachineCalendar_Shift1StartTime;
    //                     let endTime  =new Date(endDateTime)
                    
    //                     let endedTime = ('0' + (endTime.getUTCHours())).slice(-2)+':'+('0' + (endTime.getUTCMinutes())).slice(-2)+':'+('0' + (endTime.getSeconds())).slice(-2);
    //                     console
    //                     let currentTime =dateTime.slice(11 ,22) 
    //                     if(cureentDate == startDate || cureentDate == endDate  ){

    //                          if((currentTime>=startTime) && (currentTime<=endedTime)){
    //                             shifts = [] ;
    //                             shifts.push({
                                    
    //                             startTime : startTime ,
    //                             endedTime : endedTime,
    //                                 date : shiftList.recordset[i].calendarDate,
    //                                 dateTime : {
    //                                     startDateTime : startDateTime,
    //                                     endDateTime : endDateTime,
    //                                 },
    //                             shiftNo :1,
    //                             currentShift : true , 
    //                             EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID,
    //                             shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                             });
    //                             count=1 ;
    //                         }else{
    //                         shifts.push({
    //                             startTime : startTime ,
    //                             endedTime : endedTime,
    //                             date : shiftList.recordset[i].calendarDate,
    //                             dateTime : {
    //                                 startDateTime : startDateTime,
    //                                 endDateTime : endDateTime,
    //                             },
    //                         shiftNo :1,
    //                         currentShift : false , 
    //                         EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID,
    //                         shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                         });
    //                         count+=1 ;
    //                     }
    //                 }else{
    //                         shifts.push({
    //                             startTime : startTime ,
    //                             endedTime : endedTime,
    //                             date : shiftList.recordset[i].calendarDate,
    //                             dateTime : {
    //                                 startDateTime : startDateTime,
    //                                 endDateTime : endDateTime,
    //                             },
    //                         shiftNo :1,
    //                         EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID,
    //                         currentShift : false , 
    //                         shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                         });
    //                         count+=1 ;
    //                     }     
    //                  }
    //             }
    //             }
    //             let obj = {
    //                 statusCode: 200,
    //                 status: "success",
    //                 message: "SHIFT LIST", 
    //                 result: shifts};
    //             res.send(obj);
    
    //         }
    //     } catch (error) {
    //         Evolve.Log.error(" EERR2877: Error while get shift details "+error.message);
    //         let obj = {statusCode: 400,status: "fail",message: "EERR2877 : Error while get shift details",result: null};
    //         res.send(obj);
    //     }
    // },
    addSubTimeSheet: async function (req, res) {
        try {
            let error = false ;
            req.body.tsData.EvolveUser_ID = req.EvolveUser_ID;
           req.body.tsData.EvolveTimesheet_StartDateTime = req.body.tsData.EvolveTimesheet_StartDateTime.slice(6,10)+'-'+req.body.tsData.EvolveTimesheet_StartDateTime.slice(3,5)+'-'+req.body.tsData.EvolveTimesheet_StartDateTime.slice(0,2)+' '+req.body.tsData.EvolveTimesheet_StartDateTime.slice(11,16)+':00';
           req.body.tsData.EvolveTimesheet_StopDateTime = req.body.tsData.EvolveTimesheet_StopDateTime.slice(6,10)+'-'+req.body.tsData.EvolveTimesheet_StopDateTime.slice(3,5)+'-'+req.body.tsData.EvolveTimesheet_StopDateTime.slice(0,2)+' '+req.body.tsData.EvolveTimesheet_StopDateTime.slice(11,16)+':00';

           console.log(req.body)
           let addTs = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.addTimeSheet(req.body.tsData);

           
            if (addTs instanceof Error ) {
                error=true;
        
            } else {
                for(let i=0 ; i<req.body.updateArray.length ; i++){
                    if(error == false){
                        let updateSheetOnAdd = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.updateSheetOnDelete(req.body.updateArray[i] , req.body.tsData.EvolveUser_ID);
                        if (updateSheetOnAdd instanceof Error || updateSheetOnAdd.rowsAffected<1 ){
                            error=true;
                        }
                    }


                }
    
            }
            if (error == true) {
                Evolve.Log.error("EERR2878 : Error while add timesheet ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2878 : Error while add timesheet"   ,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Timesheet Added successfully ",
                    result:null          
                };
                res.send(obj);
    
            }
         } catch (error) {
            Evolve.Log.error(" EERR2879 : Error while add timesheet "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2879 : Error while add timesheet "   ,
                result: null
            };
            res.send(obj);
        }
    },
    getWoDetails: async function (req, res) {
        try {
              let details = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getWoDetails(req.body);
             if (details instanceof Error ) {
                Evolve.Log.error("EERR2880 : Error while get wo details ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2880 : Error while get wo details"   ,
                    result: null
                };
                res.send(obj);
            } else {
              let uomList = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getWoItemSecUomList(details.recordset[0]);
             if (uomList instanceof Error ) {
                Evolve.Log.error("EERR2881 : Error while get uom list ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2881 : Error while get uom list"   ,
                    result: null
                };
                res.send(obj);
            } else {
                details.recordset[0].uomList =  uomList.recordset;
                    let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "uomList ",
                    result:details.recordset[0]          
                };
                res.send(obj);
               }
           }
        } catch (error) {
            Evolve.Log.error(" EERR2882 : Error while get wo details "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2882 : Error while get wo details ",result: null};
            res.send(obj);
        }
    },
    addEditedTimeSheet: async function (req, res) {
        try {
            let error = false ;
           req.body.tsData.EvolveTimesheet_StartDateTime = req.body.tsData.EvolveTimesheet_StartDateTime.slice(6,10)+'-'+req.body.tsData.EvolveTimesheet_StartDateTime.slice(3,5)+'-'+req.body.tsData.EvolveTimesheet_StartDateTime.slice(0,2)+' '+req.body.tsData.EvolveTimesheet_StartDateTime.slice(11,16)+':00';
           req.body.tsData.EvolveTimesheet_StopDateTime = req.body.tsData.EvolveTimesheet_StopDateTime.slice(6,10)+'-'+req.body.tsData.EvolveTimesheet_StopDateTime.slice(3,5)+'-'+req.body.tsData.EvolveTimesheet_StopDateTime.slice(0,2)+' '+req.body.tsData.EvolveTimesheet_StopDateTime.slice(11,16)+':00';
           let addTs = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.addEditedTimeSheet(req.body.tsData , req.EvolveUser_ID);
            if (addTs instanceof Error || addTs.rowsAffected <1 ) {
                error =true;
            } else {
                for(let i=0 ; i<req.body.updateArray.length ; i++){
                    if(error == false){
                            req.body.updateArray[i].EvolveTimesheet_StartDateTime = req.body.updateArray[i].EvolveTimesheet_StartDateTime.slice(6,10)+'-'+req.body.updateArray[i].EvolveTimesheet_StartDateTime.slice(3,5)+'-'+req.body.updateArray[i].EvolveTimesheet_StartDateTime.slice(0,2)+' '+req.body.updateArray[i].EvolveTimesheet_StartDateTime.slice(11,16)+':00';
                            req.body.updateArray[i].EvolveTimesheet_StopDateTime = req.body.updateArray[i].EvolveTimesheet_StopDateTime.slice(6,10)+'-'+req.body.updateArray[i].EvolveTimesheet_StopDateTime.slice(3,5)+'-'+req.body.updateArray[i].EvolveTimesheet_StopDateTime.slice(0,2)+' '+req.body.updateArray[i].EvolveTimesheet_StopDateTime.slice(11,16)+':00';

                        let updateSheetOnDelete = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.updateSheetOnDelete(req.body.updateArray[i] , req.EvolveUser_ID);
                        if (updateSheetOnDelete instanceof Error || updateSheetOnDelete.rowsAffected<1 ){
                            error=true;
                        }
                    }


                }
   
            }
            if(error == true){
                Evolve.Log.error("EERR2883 : Error while update timesheet ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2883 : Error while update timesheet",
                    result:null            };
                res.send(obj);
            }else{
               let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Timesheet updated successfully ",
                    result:null            };
                res.send(obj);
    

            }
        } catch (error) {
            Evolve.Log.error(" EERR2884: Error while update timesheet "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2884: Error while update timesheet ",
                result:null            };
            res.send(obj);
        }
    },
    getTsDetails: async function (req, res) {
        try {
              let details = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getTsDetails(req.body);
             if (details instanceof Error ) {
                Evolve.Log.error("EERR2885 : Error get while time sheet details ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2885 : Error get while time sheet details"   ,
                    result: null
                };
                res.send(obj);
            } else {
                    let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "uomList ",
                    result:details.recordset[0]          
                };
                res.send(obj);
         }
        } catch (error) {
            Evolve.Log.error(" EERR2886: Error get while time sheet details "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2886 : Error get while time sheet details",result: null};
            res.send(obj);
        }
    },
    getWcWOList : async function (req, res) {
        try {
            let list = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getWcWOList(req.body);
            if (list instanceof Error) 
            {
                Evolve.Log.error("EERR2887 : Error while ge wo list");
                let obj = {statusCode: 400,status: "fail",message: "EERR2887 : Error while ge wo list",result: null};
                res.send(obj);
            } else {
                let obj = {statusCode: 200,status: "success",message: "wo list",result: list.recordset};
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2888 : Error while ge wo list "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2888 : Error while ge wo list",result: null};
            res.send(obj);
        }
    },

    getWcDetails : async function (req, res) {
        try {
            let error = false;
            let list = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getWcDetails(req.body);
            if (list instanceof Error) 
            {
                error =true
            } else {
                for(let i=0 ; i<list.recordset.length;i++){
                    if(error == false){
                        let issueVar = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getWoIssueVariance(list.recordset[i].EvolveWoSchedule_ID);
                        // console.log("issueVar>.  , issueVar" ,  issueVar)
                        if (issueVar instanceof Error) 
                        {
                            error =true
                        }else{
                            list.recordset[i].issueVar = issueVar.recordset[0].issueVar;
                            if(list.recordset[i].issueVar == null){
                                list.recordset[i].issueVar =0;
                            }

                            let tsVar = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getWoTsVariance(list.recordset[i].EvolveWoSchedule_ID);
                            if (tsVar instanceof Error) 
                            {
                                error =true
                            }else{
                                
                                list.recordset[i].tsVar = tsVar.recordset[0].tsVar;
                                if(list.recordset[i].tsVar == null){
                                    list.recordset[i].tsVar =0;
                                }

                                list.recordset[i].tsVar = ((parseFloat(list.recordset[i].tsVar) - (parseFloat(list.recordset[i].EvolveWoSchedule_SetupTime)+parseFloat(list.recordset[i].EvolveWoSchedule_CycleTime)*parseFloat(list.recordset[i].EvolveWoSchedule_OrderQty)))/(parseFloat(list.recordset[i].EvolveWoSchedule_SetupTime)+(parseFloat(list.recordset[i].EvolveWoSchedule_CycleTime)*parseFloat(list.recordset[i].EvolveWoSchedule_OrderQty)))) * 100
                                list.recordset[i].tsVar =  Math.abs(list.recordset[i].tsVar) +'';
                                list.recordset[i].tsVar = parseFloat(list.recordset[i].tsVar.slice(0,5))

                                let checlPostingStatus = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.chekErpPostingStatus(list.recordset[i].EvolveWoSchedule_ID);
                                if (checlPostingStatus == 0) 
                                {
                                    error =true
                                }else{
                                    list.recordset[i].upIssuedPallets =  checlPostingStatus.unpIssuePallets;
                                    list.recordset[i].upBookedPallets =  checlPostingStatus.upBookedPallets;
                                    list.recordset[i].upTimeSheets =  checlPostingStatus.upTimeSheets;
                                    if(checlPostingStatus.unpIssuePallets ==0 ){
                                          list.recordset[i].allIssuedPosted = true;
                                     }else{
                                        list.recordset[i].allIssuedPosted = false;
                                     }
                                    
                                    if(checlPostingStatus.upBookedPallets ==0 ){
                                        list.recordset[i].allBookedPosted = true;
                                     }else{
                                        list.recordset[i].allBookedPosted = false;
                                    }
                                    
                                    if(checlPostingStatus.upTimeSheets ==0 ){
                                        list.recordset[i].allTimeSheetsPosted = true;
                                     }else{
                                        list.recordset[i].allTimeSheetsPosted = false;
                                    }
                                }


                            }
                        }
                     }
                 }
             
            
            }

            if(error == true){
                Evolve.Log.error("EERR2889 : Error while get wo details "+error.message);
                let obj = {statusCode: 400,status: "fail",message: "EERR2889 : Error while get wo details",result: null};
                res.send(obj);

            }else if(error == false &&  list.recordset.length == 0){
                let obj = {statusCode: 400,status: "fail",message: "NO RECORDS FOUND",result:[]};
                res.send(obj);


            }else{
                if(req.body.EvolveVarianceGroup_ID == '' || req.body.EvolveVarianceGroup_ID == null ){
                           let obj = {statusCode: 200,status: "success",message: "Machine gotted successfully",result: list.recordset};
                            res.send(obj);
                 }else{
                    let gpDetails = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getVarGroupDetails(req.body.EvolveVarianceGroup_ID);
                    if (gpDetails instanceof Error || gpDetails.rowsAffected<1 )
                    {
                        Evolve.Log.error("EERR2890 : Error while getting machine list ");
                        let obj = {statusCode: 400,status: "fail",message: "EERR2890 : Error while get variance group details",result:[]};
                        res.send(obj);

                    } else{

                        let WoList =[];
                        for(let i=0 ; i<list.recordset.length ;i++){
                            if(eval(list.recordset[i].bookingVariace+gpDetails.recordset[0].EvolveVarianceGroup_BookingVarParam+gpDetails.recordset[0].EvolveVarianceGroup_BookingVarValue)  &&  eval(list.recordset[i].issueVar+gpDetails.recordset[0].EvolveVarianceGroup_IssueVarParam+gpDetails.recordset[0].EvolveVarianceGroup_IssueVarValue) && eval(list.recordset[i].tsVar+gpDetails.recordset[0].EvolveVarianceGroup_TimeSheetVarParam+gpDetails.recordset[0].EvolveVarianceGroup_TimeSheetVarValue) ){
                                WoList.push(list.recordset[i]);
                            }
                         }
                     let obj = {statusCode: 200,status: "success",message: "wo details",result: WoList};
                     res.send(obj);
                      }
                 }

         
            }
        } catch (error) {
            Evolve.Log.error("EERR2891 : Error while get wo details "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2891 : Error while get wo details",result: null};
            res.send(obj);
        }
    },
    getWcSummary : async function (req, res) {
        try {
            let woSumary = {};
            let error  = false;
            let details = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getWcWoDetails(req.body);
            if (details instanceof Error ) {
                  error = true;
        
            }else{
                woSumary.woDetails = {};
                woSumary.woDetails =details.recordset[0] ;
                req.body.EvolveItem_ID =woSumary.woDetails.EvolveItem_ID;
                req.body.EvolveUom_ID =woSumary.woDetails.EvolveUOM_ID;
                let secUom = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getWoItemSecUomList(req.body);
                if (secUom instanceof Error) 
                {
                    error = true;
                } else {
                    let issueSummary = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getIssuedSummary(req.body);
                    if (issueSummary instanceof Error) 
                    {
                        error = true;
                    } else {
                            woSumary.issueSummary = issueSummary.recordset;
                            let bookedPallet = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getBookedPalletCount(req.body);
                            if (bookedPallet instanceof Error) 
                            {
                                error = true;
                            } else {
                                woSumary.bookingSummary = {};
                                woSumary.bookingSummary.bookedPallets = bookedPallet.recordset[0].bookedPallet

                                let unBookedPallet = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getunBookedPalletCount(req.body);
                                if (unBookedPallet instanceof Error) 
                                {
                                    error = true;
                                } else {
                                    
                                woSumary.bookingSummary.unBookedPallets = unBookedPallet.recordset[0].unBookedPallet
                                let bookingSummary = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getBookingSummary(req.body);
                                if (bookingSummary instanceof Error) 
                                {
                                    error = true;
                                } else {
                                woSumary.bookingSummary.summary = bookingSummary.recordset;
                                woSumary.bookingSummary.unBookedPallets = unBookedPallet.recordset[0].unBookedPallet;
                                woSumary.bookingSummary.uomList = [];
                                woSumary.bookingSummary.uomList.push({
                                    uomName : woSumary.bookingSummary.summary[0].EvolveUom_Uom,
                                    qty : woSumary.bookingSummary.summary[0].EvolveWoSchedule_CompletedQty
                                })
                                if(secUom.recordset.length != 0){
                                    for(let i=0 ; i<secUom.recordset.length  ; i++){
                                        let  qty  = woSumary.bookingSummary.summary[0].EvolveWoSchedule_CompletedQty * (secUom.recordset[i].EvolveUomConv_Conversion)
                                        woSumary.bookingSummary.uomList.push({
                                            uomName : secUom.recordset[i].EvolveUom_Uom,
                                            qty : qty
                                        })
                                    }
                                  }

                                  let tsSummary = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getTimesheetSummary(req.body);
                                //   console.log(tsSummary)
                                  if(tsSummary == 0){
                                      error = true
                                  }else{
                                    woSumary.tsSummary = {};

                                    // setup time and variance 

                                    // std setup time 
                                    let ehours = (woSumary.woDetails.EvolveWoSchedule_SetupTime / 60);
                                    let erhours = ('0' + Math.floor(ehours)).slice(-2);
                                    let eminutes = (ehours - erhours) * 60;
                                    let erminutes = ('0' + Math.round(eminutes)).slice(-2);
                                    woSumary.tsSummary.setupTime = erhours+':'+erminutes;

                                    //act setup time 

                                    ehours = (tsSummary.setupTime/ 60);
                                    erhours = ('0' + Math.floor(ehours)).slice(-2);
                                    eminutes = (ehours - erhours) * 60;
                                    erminutes = ('0' + Math.round(eminutes)).slice(-2);
                                    woSumary.tsSummary.actSetupTime= erhours+':'+erminutes;

                                    // variance 
                                    woSumary.tsSummary.setupTimeVar = ((tsSummary.setupTime - woSumary.woDetails.EvolveWoSchedule_SetupTime)/woSumary.woDetails.EvolveWoSchedule_SetupTime)*100
                                    woSumary.tsSummary.setupTimeVar =  Math.abs(woSumary.tsSummary.setupTimeVar) +'';
                                    woSumary.tsSummary.setupTimeVar = parseFloat(woSumary.tsSummary.setupTimeVar.slice(0,5))

                                    // time difference
                                    
                                    ehours = (Math.abs(tsSummary.setupTime  -  woSumary.woDetails.EvolveWoSchedule_SetupTime ))/60;
                                    erhours = ('0' + Math.floor(ehours)).slice(-2);
                                    eminutes = (ehours - erhours) * 60;
                                    erminutes = ('0' + Math.round(eminutes)).slice(-2);
                                    woSumary.tsSummary.setupDiff= erhours+':'+erminutes;
                                    //Run time and variance

                                    //std run time
                                    ehours = (((woSumary.woDetails.EvolveWoSchedule_CycleTime)*woSumary.woDetails.EvolveWoSchedule_OrderQty) / 60);
                                    erhours = ('0' + Math.floor(ehours)).slice(-2);
                                    eminutes = (ehours - erhours) * 60;
                                    erminutes = ('0' + Math.round(eminutes)).slice(-2);
                                    woSumary.tsSummary.stdRunTime = erhours+':'+erminutes;

                                     // actual run time
                                    ehours = (tsSummary.runTime / 60);
                                    erhours = ('0' + Math.floor(ehours)).slice(-2);
                                    eminutes = (ehours - erhours) * 60;
                                    erminutes = ('0' + Math.round(eminutes)).slice(-2);
                                    woSumary.tsSummary.actRunTime= erhours+':'+erminutes;

                                    //run time variance
                                    woSumary.tsSummary.runTimeVar = ((tsSummary.runTime - ((woSumary.woDetails.EvolveWoSchedule_CycleTime)*woSumary.woDetails.EvolveWoSchedule_OrderQty))/((woSumary.woDetails.EvolveWoSchedule_CycleTime)*woSumary.woDetails.EvolveWoSchedule_OrderQty))*100
                                    woSumary.tsSummary.runTimeVar =  Math.abs(woSumary.tsSummary.runTimeVar) +'';
                                    woSumary.tsSummary.runTimeVar = parseFloat(woSumary.tsSummary.runTimeVar.slice(0,5))


                                    ehours = (Math.abs((tsSummary.runTime - ((woSumary.woDetails.EvolveWoSchedule_CycleTime)*woSumary.woDetails.EvolveWoSchedule_OrderQty))))/60;
                                    erhours = ('0' + Math.floor(ehours)).slice(-2);
                                    eminutes = (ehours - erhours) * 60;
                                    erminutes = ('0' + Math.round(eminutes)).slice(-2);
                                    woSumary.tsSummary.runtimrDiff= erhours+':'+erminutes;

                                    // down time
                                    // std down time
                                    woSumary.tsSummary.stdDownTime = '00:00';

                                    // act down time 
                                    ehours = (tsSummary.downTime/ 60);
                                    erhours = ('0' + Math.floor(ehours)).slice(-2);
                                    eminutes = (ehours - erhours) * 60;
                                    erminutes = ('0' + Math.round(eminutes)).slice(-2);
                                    woSumary.tsSummary.actDownTime= erhours+':'+erminutes;

                                    woSumary.tsSummary.downTimeVar = ((tsSummary.downTime-0)/0) *100 ;
                                    woSumary.tsSummary.downTimeVar =  Math.abs(woSumary.tsSummary.downTimeVar) +'';
                                    woSumary.tsSummary.downTimeVar = parseFloat(woSumary.tsSummary.downTimeVar.slice(0,5))
                                  
                                    ehours = (Math.abs(tsSummary.downTime/60-0));
                                    erhours = ('0' + Math.floor(ehours)).slice(-2);
                                    eminutes = (ehours - erhours) * 60;
                                    erminutes = ('0' + Math.round(eminutes)).slice(-2);
                                    woSumary.tsSummary.downTimeDiff= erhours+':'+erminutes;

                                    //total setup time 

                                    // total std time 
                                    ehours = ((woSumary.woDetails.EvolveWoSchedule_CycleTime)*woSumary.woDetails.EvolveWoSchedule_OrderQty / 60 + woSumary.woDetails.EvolveWoSchedule_SetupTime / 60);
                                    erhours = ('0' + Math.floor(ehours)).slice(-2);
                                    eminutes = (ehours - erhours) * 60;
                                    erminutes = ('0' + Math.round(eminutes)).slice(-2);
                                    woSumary.tsSummary.stdTotalTime= erhours+':'+erminutes;

                                    // total actual time 
                                
                                    ehours = (tsSummary.runTime / 60 + tsSummary.downTime / 60 + tsSummary.setupTime/ 60 ) ;
                                    erhours = ('0' + Math.floor(ehours)).slice(-2);
                                    eminutes = (ehours - erhours) * 60;
                                    erminutes = ('0' + Math.round(eminutes)).slice(-2);
                                    woSumary.tsSummary.actTotalTime= erhours+':'+erminutes;

                                    woSumary.tsSummary.totalTimeVar = (((tsSummary.runTime + tsSummary.downTime +tsSummary.setupTime) - ((woSumary.woDetails.EvolveWoSchedule_CycleTime)*woSumary.woDetails.EvolveWoSchedule_OrderQty + woSumary.woDetails.EvolveWoSchedule_SetupTime))/((woSumary.woDetails.EvolveWoSchedule_CycleTime)*woSumary.woDetails.EvolveWoSchedule_OrderQty + woSumary.woDetails.EvolveWoSchedule_SetupTime))*100;
                                    woSumary.tsSummary.totalTimeVar =  Math.abs(woSumary.tsSummary.totalTimeVar) +'';
                                    woSumary.tsSummary.totalTimeVar = parseFloat(woSumary.tsSummary.totalTimeVar.slice(0,5))
                                    ehours = (Math.abs(((tsSummary.runTime + tsSummary.downTime +tsSummary.setupTime)/60)-((woSumary.woDetails.EvolveWoSchedule_CycleTime)*woSumary.woDetails.EvolveWoSchedule_OrderQty)/60)+woSumary.woDetails.EvolveWoSchedule_SetupTime/60)
                                    erhours = ('0' + Math.floor(ehours)).slice(-2);
                                    eminutes = (ehours - erhours) * 60;
                                    erminutes = ('0' + Math.round(eminutes)).slice(-2);
                                    woSumary.tsSummary.totalTimeDiff= erhours+':'+erminutes;
                                    if(tsSummary.tsQty == null || tsSummary.tsQty == '' ){
                                        tsSummary.tsQty = 0;
                                    }

                                    woSumary.tsSummary.uomList = [];
                                    woSumary.tsSummary.uomList.push({
                                        uomName : woSumary.woDetails.EvolveUom_Uom ,
                                        qty : tsSummary.tsQty,
                                    })
                                    if(secUom.recordset.length != 0){
                                        for(let i=0 ; i<secUom.recordset.length  ; i++){
                                            let  qty  = tsSummary.tsQty * (secUom.recordset[i].EvolveUomConv_Conversion)
                                            woSumary.tsSummary.uomList.push({
                                                uomName : secUom.recordset[i].EvolveUom_Uom,
                                                qty : qty
                                            })
                                        }
                                      }
                                  }
                                 }

                                }    
                            }

                    }
                }
       
            }
            if(error == true){
                Evolve.Log.error("EERR2892 : Error while get summary ");

                let obj = {statusCode: 400,status: "fail",message: "EERR2892 : Error while get summary",result:woSumary};
                res.send(obj);

            }else{
                let obj = {statusCode: 200,status: "success",message: "Summary",result:woSumary};
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error("EERR2893 : Error while get summary "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2893 : Error while get summary",result: null};
            res.send(obj);
        }
    },
    closeWorkOrder : async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let closeWo = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.closeWorkOrder(req.body);
            if (closeWo instanceof Error) 
            {
                Evolve.Log.error("EERR2894 : Error while closing work order");
                let obj = {statusCode: 400,status: "fail",message: "EERR2894 : Error while closing work order",result: null};
                res.send(obj);
            } else {
                let obj = {statusCode: 200,status: "success",message: "Work order closed successfully",result: closeWo.recordset};
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2895 : Error while closing work order "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2895 : Error while closing work order",result: null};
            res.send(obj);
        }
    },
    closeAllWo : async function (req, res) {
        try {
            let error = false;
             for(let i=0  ; i <req.body.wcWoToClose.length ; i++)
             {
                 if(error == false){
                        req.body.wcWoToClose[i].EvolveUser_ID = req.EvolveUser_ID
                        let closeWo = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.closeWorkOrder(req.body.wcWoToClose[i]);
                        if (closeWo instanceof Error) 
                        {
                            error = true;
                        }
                 }
             }
             if(error == true){
                     Evolve.Log.error("EERR2896 : Error while closing work order "+error.message);
                      let obj = {statusCode: 400,status: "fail",message: "EERR2896 : Error while closing work orders",result: null};
                    res.send(obj);

             }else{

                    let obj = {statusCode: 200,status: "success",message: "Work orders closed successfully",result: null};
                    res.send(obj);

             }

        } catch (error) {
            Evolve.Log.error("EERR2897 : Error while closing work orders "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2897 : Error while closing work orders",result: null};
            res.send(obj);
        }
    },

    checkPallet: async function (req, res) {
        try {
            let check = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.checkPallet(req.body);
            if (check instanceof Error ) {
                Evolve.Log.error("EERR2898 : Error while check pallet")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR2898 : Error while check pallet "   ,
                    result: check.message
                };
                res.send(obj);
            } else if(check.rowsAffected<1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Cannot issue "+req.body.EvolveInventory_RefNumber+" to this job. Incorrect material."   ,
                    result: check.message
                };
                res.send(obj)
            }else{
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Valid pallet",
                    result: check.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2898: Error while check pallet "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2898 : Error while check pallet",result: null};
            res.send(obj);
        }
    },
    getWcIssueSummary: async function (req, res) {
        try {
            let issuedPallets = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getissuedPallets(req.body);
            if (issuedPallets instanceof Error ) {
                Evolve.Log.error("EERR2900 : Error while get issue summary ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2900 : Error while get issue summary",
                    result: null       
                   };
                    res.send(obj);
            }else{
                let obj = {statusCode: 200,status: "success",message: "issued summary",result: issuedPallets.recordset};
                res.send(obj);                
            }
         } catch (error) {
            Evolve.Log.error(" EERR2901: Error while get issue summary "+error.message);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "EERR2901 : Error while get issue summary",
                result: null       
               };
                res.send(obj);
        }
    },
    getRtsLocationList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getRtsLocationList(req.body);
            if (list instanceof Error ) {
                Evolve.Log.error("EERR2902 :  Error while get location list ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2902 :  Error while get location list "   ,
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "location List",
                    result: list.recordset            };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2903: Error while get location list "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2903 : Error while get location list ",result: null};
            res.send(obj);
        }
    },

    getRtsUomList: async function (req, res) {
        try {
            let uomList = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getWoItemSecUomList(req.body);
            if (uomList instanceof Error ) {
                Evolve.Log.error("EERR2904 :  Error while get secondary uom list ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2904 :  Error while get secondary uom list"   ,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "UOM LIST",
                    result: uomList.recordset            };
                res.send(obj);
    
            }
        } catch (error) {
            Evolve.Log.error(" EERR2905: Error while get secondary uom list "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2905 : Error while get secondary uom list ",result: null};
            res.send(obj);
        }
    },
    rtsQty: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;
            if(req.body.rtsSecUom == ''){
                req.body.rtsSecUom = null ;
            }
            let locStatus = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getLocationStatus(req.body.EvolveLocation_ID);
            if (locStatus instanceof Error) {
            Evolve.Log.error("EERR3091 : Error while get location status ")
            let obj = { statusCode: 400, status: "fail", message: "EERR3091: Error while get location status ", result: null };
                res.send(obj);
            } else{
                req.body.EvolveInventory_Status = locStatus.recordset[0].EvolveStatusCodeMstr_Code;
                let updateIssuedQty = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.updateIssuedQty(req.body );
                if (updateIssuedQty instanceof Error || updateIssuedQty.rowsAffected<1) {
                    Evolve.Log.error("EERR2906 : Error while update issue qty")
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR2906 : Error while update issue qty"   ,
                        result: ''
                    };
                    res.send(obj);
                } else {
                        let updateProdOrder = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.updateProdOrderIssueQty(req.body);
                        if (updateProdOrder instanceof Error || updateProdOrder.rowsAffected<1) {
                            Evolve.Log.error("EERR2907 : Error while update prod order issue qty")
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "EERR2907 : Error while update prod order issue qty"   ,
                                result: ''
                            };
                            res.send(obj);
                        } else {
                            let updateInventoryPallet = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.updateInventoryPallet(req.body);
                            if (updateInventoryPallet instanceof Error || updateInventoryPallet.rowsAffected<1) {
                                Evolve.Log.error("EERR2908 : Error while update inventory")
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: "EERR2908 : Error while update inventory"   ,
                                    result: ''
                                };
                                res.send(obj);
                            } else {
                                let changePalletRtsStatus = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.changePalletRtsStatus(req.body);
                                            if (changePalletRtsStatus instanceof Error || changePalletRtsStatus.rowsAffected<1) {
                                            Evolve.Log.error("EERR2909 : Error while change rts status")
                                                let obj = {
                                                statusCode: 400,
                                                status: "fail",
                                                message: "EERR2909 : Error while change rts status"   ,
                                                result: ''
                                            };
                                            res.send(obj);
                                            } else {
                                                    let obj = {
                                                        statusCode: 200,
                                                        status: "success",
                                                        message: "Return to store successfully ",
                                                        result: ''   
                                                        };
                                                    res.send(obj);        
                                            }
                            }
                        
                        }
                    }
                }
        } catch (error) {
            Evolve.Log.error(" EERR2910: Error while return to inventory"+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2910 : Error while return to inventory ",result: null};
            res.send(obj);
        }
    },
    getWcBookingSummary: async function (req, res) {
        try {
            let  bookingSummary = {};
            let list = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getWcBookingSummary(req.body);
            if (list instanceof Error ) {
                Evolve.Log.error("EERR2911 :  Error while get booking summary")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2911 :  Error while get booking summary"   ,
                    result: list.message
                };
                res.send(obj);
            } else {
                bookingSummary.summary  = list.recordset;
                let secUom = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getWoItemSecUomList(req.body);
                if (secUom instanceof Error ) {
                    Evolve.Log.error("EERR2912 : Error while get secondary uom list")
                      let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR2912 : Error while get secondary uom list"   ,
                        result: null
                    };
                    res.send(obj);
                } else {
                        bookingSummary.secUomList  = secUom.recordset;
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Booking summary",
                            result: bookingSummary            };
                        res.send(obj);
                  }
            
            }
        } catch (error) {
            Evolve.Log.error(" EERR2913: Error while get booking summary "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2913 : Error while get booking summary ",result: null};
            res.send(obj);
        }
    },
    addVarianceGroup: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let checkVarGroup = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.checkVarianceGroup(req.body ,'ADD');
            if (checkVarGroup instanceof Error ) {
                Evolve.Log.error("EERR2914 :  Error while check existing group ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2914 :  Error while check existing group"   ,
                    result: null
                };
                res.send(obj);
            } else if(checkVarGroup.rowsAffected>0){
                let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: "GROUP NAME ALREADY EXIST"   ,
                  result: null
              };
              res.send(obj);
            } else{
                  let addVar = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.addVarianceGroup(req.body);
                    if (addVar instanceof Error ) {
                        Evolve.Log.error("EERR2915 : Error while add variance group ")
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "EERR2915 : Error while add variance group"   ,
                            result: null
                        };
                        res.send(obj);
                    } else {
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Varicance group  added successfully",
                            result: null            };
                        res.send(obj);
            
                    }
            }
        } catch (error) {
            Evolve.Log.error(" EERR2916: Error while add variance group "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2916 : Error while add variance group"   ,
                result: null
            };
            res.send(obj);
        }
    },
    getVarianceGroupList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getVarianceGroupList();
            if (list instanceof Error ) {
                Evolve.Log.error("EERR2917 : Error while get variance group list")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2917 : Error while get variance group list"   ,
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Variance group list ",
                    result: list.recordset            };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2918: Error while get variance group list  "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2918 : Error while get variance group list",result: null};
            res.send(obj);
        }
    },
    deleteVarianceGroup: async function (req, res) {
        try {
            let list = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.deleteVarianceGroup(req.body);
            if (list instanceof Error ) {
                Evolve.Log.error("EERR2919 : Error while get delete variance group")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2919 : Error while get delete variance group"   ,
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Variance group list ",
                    result: list.recordset            };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2920: Error while get delete variance group "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2920 : Error while get delete variance group",result: null};
            res.send(obj);
        }
    },
    getVarGroupDetails: async function (req, res) {
        try {
            let details = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getVarGroupDetails(req.body.EvolveVarianceGroup_ID);
            if (details instanceof Error ) {
                Evolve.Log.error("EERR2921 : Error while get variance grouo  details")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2921 : Error while get variance grouo  details"   ,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Variance group details",
                    result: details.recordset[0]            };
                res.send(obj);
    
            }
        } catch (error) {
            Evolve.Log.error(" EERR2922: Error while get variance grouo  details"+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2922 : Error while get variance grouo  details",result: null};
            res.send(obj);
        }
    },
    updateVarianceGroup: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let checkVarGroup = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.checkVarianceGroup(req.body , 'UPDATE');
            if (checkVarGroup instanceof Error ) {
                Evolve.Log.error("EERR2923 : Error while check existing group ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2923 : Error while check existing group"   ,
                    result: null
                };
                res.send(obj);
            } else if(checkVarGroup.rowsAffected>0){
                let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: "GROUP NAME ALREADY EXIST"   ,
                  result: null
              };
              res.send(obj);
            } else{
                  let addVar = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.updateVarianceGroup(req.body);
                    if (addVar instanceof Error ) {
                        Evolve.Log.error("EERR2924 : Error while update variance group ")
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "EERR2924 : Error while update variance group"   ,
                            result: null
                        };
                        res.send(obj);
                    } else {
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Varicance group  added successfully",
                            result: null            };
                        res.send(obj);
            
                    }
            }
        } catch (error) {
            Evolve.Log.error(" EERR2925: Error while update variance group "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2925 : Error while update variance group"   ,
                result: null
            };
            res.send(obj);
        }
    },

    getItemSecUomList: async function (req, res) {
        try {
           let secUom = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getWoItemSecUomList(req.body);
           
            if (secUom instanceof Error ) {
                Evolve.Log.error("EERR2926 : Error while get secondary uom list ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2926 : Error while get secondary uom list"   ,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "secondary uom list",
                    result:secUom.recordset          
                };
                res.send(obj);
    
            }
        } catch (error) {
            Evolve.Log.error(" EERR2927: Error while get secondary uom list "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2927 : Error while get secondary uom list",result: null};
            res.send(obj);
        }
    },

    getWoClosingValidations: async function (req, res) {
        try {
           let val = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getWoClosingValidations();
           
            if (val instanceof Error ) {
                Evolve.Log.error("EERR2928 : Error get while wo closing validations  ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2928 : Error get while wo closing validations "   ,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "validation gotted",
                    result:val.recordset          
                };
                res.send(obj);
    
            }
        } catch (error) {
            Evolve.Log.error(" EERR2929: Error get while wo closing validations  "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2929 : Error get while wo closing validations",result: null};
            res.send(obj);
        }
    },

    confirmPallet: async function (req, res) {
        try {
            console.log("confirm pallet clled >> ")
           let confirmBookedPallet = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.confirmPallet(req.body.EvolveInventory_ID);
       
            if (confirmBookedPallet instanceof Error  || confirmBookedPallet.rowsAffected <1) {
                Evolve.Log.error("EERR2930 : Error while confirm pallet")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2930 : Error while confirm pallet"   ,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Pallet posterd to erp successfully",
                    result:null          
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error(" EERR2931: Error while confirm pallet  "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2931 : Error while confirm pallet",result: null};
            res.send(obj);
        }
    },
    updateBookedPallet: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;
            let error = false;
            let updateQty = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.updateWoOrderQty(req.body , 'UPDATEPALLET');
            if (updateQty instanceof Error || updateQty.rowsAffected<1  ) {
                 error = true;
            } 
            else {
                 let uodateDetails = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.updatePbPalletDetails(req.body);
                 if (uodateDetails instanceof Error || uodateDetails.rowsAffected<1  ) {
                     error = true;
                }else{
                    let updateInvPbPallet = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.updateInvPbPallet(req.body);
                    if (updateInvPbPallet instanceof Error || updateInvPbPallet.rowsAffected<1  ) {
                          error = true;
                    } 
                }
             }
         if (error == true ) {
                Evolve.Log.error("EERR2932 : Error while update pallet")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2932 : Error while update pallet"   ,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Pallet updated successfully",
                    result: null           
                 };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2933: Error while update pallet  "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2933 : Error while update pallet",result: null};
            res.send(obj);
        }
    },
    deleteBookedPallet: async function (req, res) {
        try {
            let error = false;
            let updateQty = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.updateWoOrderQty(req.body , 'DELETEPALLET');
            if (updateQty instanceof Error || updateQty.rowsAffected<1  ) {
                 error = true;
            } else {
                 let deletePallet = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.deleteProdOrderPallet(req.body.EvolveProdOrdersDetail_ID);
                 if (deletePallet instanceof Error || deletePallet.rowsAffected<1  ) {
                           error = true;
                }else{
                    let deleteInventory = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.deleteInventory(req.body.EvolveInventory_ID);
                    if (deleteInventory instanceof Error || deleteInventory.rowsAffected<1  ) {
                        error = true;
                    } 
                }
             }
            if(error == true){
                Evolve.Log.error("EERR2934 : Error while delete pallet")
                let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: "EERR2934 : Error while delete pallet"   ,
                  result: null
              };
              res.send(obj);
             }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Pallet deleted successfully",
                    result: null            };
                    res.send(obj);
               }
       } catch (error) {
            Evolve.Log.error(" EERR2935: Error while delete pallet "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2935 : Error while delete pallet",result: null};
            res.send(obj);
        }
    },
    getNewPallteNumber: async function (req, res) {
        try {
            let palletNumber =  await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('PORECIEVEPALLET') // get po barcode details 
            if (palletNumber == 0  ) {
                Evolve.Log.error("EERR2936 : Error while get new pallet number")
                let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: "EERR2936 : Error while get new pallet number"   ,
                  result: null
              };
              res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Pallet number",
                    result: palletNumber            };
                    res.send(obj);

            }
       
        } catch (error) {
            Evolve.Log.error(" EERR2937: Error while get new pallet number "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2937 : Error while get new pallet number"   ,
                result: null
            };
            res.send(obj);

        }
    },
    addNewBookingPallet: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;
            let locStatus = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getLocationStatus(req.body.EvolveLocation_ID);
            if (locStatus instanceof Error) {
                 Evolve.Log.error("EERR3092 : Error while get location status ")
                 let obj = { statusCode: 400, status: "fail", message: "EERR3092: Error while get location status ", result: null };
                 res.send(obj);
            } else{
                req.body.EvolveInventory_Status = locStatus.recordset[0].EvolveStatusCodeMstr_Code;
                let error = false ;
                let getTransTypeID = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getTransTypeID('WO-RCPT');
                if (getTransTypeID instanceof Error || getTransTypeID.rowsAffected<1) {
                    error = true;
                }
                else{
                    req.body.EvolveTranstype_ID = getTransTypeID.recordset[0].EvolveTranstype_ID
                    let addInventory = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.addInventory(req.body);
                        if (addInventory instanceof Error || addInventory.rowsAffected<1) {
                            error=true;
                        } else {
                            req.body.EvolveInventory_ID = addInventory.recordset[0].inserted_id;
                            let addProdOrderDetails = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.addProdOrderDetails(req.body);
                            if (addProdOrderDetails instanceof Error || addProdOrderDetails.rowsAffected<1) {
                                error=true;
                            }else{
                                let updateWoQty = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.updateWoCompletedQty(req.body);
                                if (updateWoQty instanceof Error || updateWoQty.rowsAffected<1) {
                                    error=true;
                                }
                            }
                        }
                }
                if(error == true){
                    Evolve.Log.error("EERR2938 : Error while add new pallet")
                    let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2938 : Error while add new pallet"   ,
                    result: null
                };
                res.send(obj);

                }else{
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Pallet added successfully",
                        result: null            };
                        res.send(obj);

                }
           }
        } catch (error) {
            Evolve.Log.error(" EERR2939: Error while add new pallet "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2939 : Error while add new pallet",result: null};
            res.send(obj);
        }
    },
    getWcTimesheetSumary: async function (req, res) {
        try {
            let tsSumaary ={};
            let summary = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getWcTimesheetSumary(req.body);
       
            if (summary instanceof Error  ) {
                Evolve.Log.error("EERR2940 : Error while get timesheet summary")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2940 : Error while get timesheet summary"   ,
                    result: null
                };
                res.send(obj);
            } else {
                tsSumaary.summary = summary.recordset ;
                let woList = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getWoList(req.body);
                if (woList instanceof Error  ) {
                    Evolve.Log.error("EERR2941 : Error while get wo list")
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR2941 : Error while get wo list"   ,
                        result: null
                    };
                    res.send(obj);
                }else{
                tsSumaary.woList = woList.recordset ;

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Timesheet list",
                    result:tsSumaary          
                };
                res.send(obj);
               }

            }
       
       
        } catch (error) {
            Evolve.Log.error("EERR2942: Error while get timesheet list"+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2942: Error while get timesheet list",
                result: null
            };
            res.send(obj);

        }
    },
    addTsSummary: async function (req, res) {
        try {
           let error = false ;
           req.body.tsData.EvolveUser_ID = req.EvolveUser_ID;
           req.body.tsData.EvolveTimesheet_StartDateTime = req.body.tsData.EvolveTimesheet_StartDateTime.slice(6,10)+'-'+req.body.tsData.EvolveTimesheet_StartDateTime.slice(3,5)+'-'+req.body.tsData.EvolveTimesheet_StartDateTime.slice(0,2)+' '+req.body.tsData.EvolveTimesheet_StartDateTime.slice(11,16)+':00';
           req.body.tsData.EvolveTimesheet_StopDateTime = req.body.tsData.EvolveTimesheet_StopDateTime.slice(6,10)+'-'+req.body.tsData.EvolveTimesheet_StopDateTime.slice(3,5)+'-'+req.body.tsData.EvolveTimesheet_StopDateTime.slice(0,2)+' '+req.body.tsData.EvolveTimesheet_StopDateTime.slice(11,16)+':00';
           let addTs = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.addTimeSheetOnSplit(req.body.tsData);
           if (addTs instanceof Error ) {
                error=true;
            } else {
                for(let i=0 ; i<req.body.updateArray.length ; i++){
                    if(error == false){
                        req.body.updateArray[i].EvolveTimesheet_StopDateTime = req.body.updateArray[i].EvolveTimesheet_StopDateTime.slice(6,10)+'-'+req.body.updateArray[i].EvolveTimesheet_StopDateTime.slice(3,5)+'-'+req.body.updateArray[i].EvolveTimesheet_StopDateTime.slice(0,2)+' '+req.body.updateArray[i].EvolveTimesheet_StopDateTime.slice(11,16)+':00';
                        let updateSheetOnAdd = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.updateSheetOnSplit(req.body.updateArray[i] , req.EvolveUser_ID);
                        if (updateSheetOnAdd instanceof Error || updateSheetOnAdd.rowsAffected<1 ){
                            error=true;
                        }
                    }
                 }
    
            }
            if (error == true) {
                Evolve.Log.error("EERR2943 : Error while add timesheet ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2943 : Error while add timesheet"   ,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Timesheet Added successfully ",
                    result:null          
                };
                res.send(obj);
    
            }
         } catch (error) {
            Evolve.Log.error(" EERR2944: Error while add timesheet "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2944: Error while add timesheet "   ,
                result: null
            };
            res.send(obj);
        }
    },
    updateWcTsSummary: async function (req, res) {
        try {
            let updateTs = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.updateWcTsSummary(req.body , req.EvolveUser_ID);
            if (updateTs instanceof Error || updateTs.rowsAffected<1  ) {
                Evolve.Log.error("EERR2945 : Error while update timesheet")
                let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: "EERR2945 : Error while update timesheet"   ,
                  result: null
              };
              res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Time sheet updated successfully",
                    result: null         
                   };
                    res.send(obj);

            }
       
        } catch (error) {
            Evolve.Log.error("EERR2946 : Error while update timesheet  "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2946 : Error while update timesheet"   ,
                result: null
            };
            res.send(obj);

        }
    },
    getTsShiftList: async function (req, res) {
        try {
           let shiftList = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getTsShiftList(req.body);
           let shifts = [];
           let count = 0;
            if (shiftList instanceof Error ) {
                Evolve.Log.error("EERR2873 : Error while get shift list ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2873 : Error while get shift list"   ,
                    result: null
                };
                res.send(obj);
            } else {
                let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime(); 
                for(let i=0 ; i<shiftList.recordset.length ; i++){
                  if(count != 5){
                        let getShifTName = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getShifTName(shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime);
                        if (getShifTName instanceof Error || getShifTName.rowsAffected<1) {
                            Evolve.Log.error("EERR2874 : Error while get shift name ");
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "EERR2874 : Error while get shift name"   ,
                                result: null
                            };
                            res.send(obj)
                         }else{ 
                    let startDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime+'Z');
                  
                    let endDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime+'Z').addHours(parseFloat(shiftList.recordset[i].EvolveMachineCalendar_Shift3))
                    let currentTime = new Date();
                    currentTime = new Date(currentTime.getTime() + parseFloat(330)*60000) ;

                    let startTime  = shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime;
                    let endTime  =new Date(endDateTime)
                    let endedTime = ('0' + (endTime.getUTCHours())).slice(-2)+':'+('0' + (endTime.getUTCMinutes())).slice(-2)+':'+('0' + (endTime.getSeconds())).slice(-2);

                    if(currentTime >= startDateTime &&  currentTime <= endDateTime){
                        shifts = [] ;
                        shifts.push({
                            startTime : startTime ,
                            endedTime : endedTime,
                            date : shiftList.recordset[i].calendarDate,
                            dateTime : {
                                startDateTime : startDateTime,
                                endDateTime : endDateTime,
                            },
                          shiftNo :3,
                          currentShift : true ,
                          EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID, 
                          shiftName : getShifTName.recordset[0].EvolveShift_Name

                          });
                          count=0 ;

                    }else{
                           shifts.push({
                            
                            startTime : startTime ,
                            endedTime : endedTime,
                            date : shiftList.recordset[i].calendarDate,
                            dateTime : {
                                startDateTime : startDateTime,
                                endDateTime : endDateTime,
                            },
                          shiftNo :3,
                          currentShift : false , 
                          EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID,
                          shiftName : getShifTName.recordset[0].EvolveShift_Name

                          });
                          count+=1 ;

                    }
                    }
                  }
        
                  if(count != 5){
                    let getShifTName = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getShifTName(shiftList.recordset[i].EvolveMachineCalendar_Shift2StartTime);
                    if (getShifTName instanceof Error ) {
                        Evolve.Log.error("EERR2875 : Error while get shift name ");
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "EERR2875 : Error while get shift name"   ,
                            result: null
                        };
                        res.send(obj)

                     }else{
                
                         
                        let startDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift2StartTime+'Z');
                       
                        let endDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift2StartTime+'Z').addHours(parseFloat(shiftList.recordset[i].EvolveMachineCalendar_Shift2))

                        let currentTime = new Date();
                        currentTime = new Date(currentTime.getTime() + parseFloat(330)*60000) ;

                        
                        let startTime  = shiftList.recordset[i].EvolveMachineCalendar_Shift2StartTime;
                        let endTime  =new Date(endDateTime)
                        let endedTime = ('0' + (endTime.getUTCHours())).slice(-2)+':'+('0' + (endTime.getUTCMinutes())).slice(-2)+':'+('0' + (endTime.getSeconds())).slice(-2);
    
                        if(currentTime >= startDateTime &&  currentTime <= endDateTime){
                            shifts = [] ;
                            shifts.push({
                                startTime : startTime ,
                                endedTime : endedTime,
                                date : shiftList.recordset[i].calendarDate,
                                dateTime : {
                                    startDateTime : startDateTime,
                                    endDateTime : endDateTime,
                                },
                              shiftNo :2,
                              currentShift : true ,
                              EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID, 
                              shiftName : getShifTName.recordset[0].EvolveShift_Name
    
                              });
                              count=0 ;
    
                        }else{
                               shifts.push({
                                
                                startTime : startTime ,
                                endedTime : endedTime,
                                date : shiftList.recordset[i].calendarDate,
                                dateTime : {
                                    startDateTime : startDateTime,
                                    endDateTime : endDateTime,
                                },
                              shiftNo :2,
                              currentShift : false , 
                              EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID,
                              shiftName : getShifTName.recordset[0].EvolveShift_Name
    
                              });
                              count+=1 ;
    
                        }
                    }
                  }
                  if(count != 5){
                    let getShifTName = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getShifTName(shiftList.recordset[i].EvolveMachineCalendar_Shift1StartTime);
                    if (getShifTName instanceof Error ) {
                        Evolve.Log.error("EERR2876 : Error while get shift name ");
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "EERR2876 : Error while get shift name"   ,
                            result: null
                        };
                        res.send(obj)

                     }else{
                        let startDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift1StartTime+'Z');
                        let endDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift1StartTime+'Z').addHours(parseFloat(shiftList.recordset[i].EvolveMachineCalendar_Shift1))

                        let currentTime = new Date();
                        currentTime = new Date(currentTime.getTime() + parseFloat(330)*60000) ;

                        let startTime  = shiftList.recordset[i].EvolveMachineCalendar_Shift1StartTime;
                        let endTime  =new Date(endDateTime)
                        let endedTime = ('0' + (endTime.getUTCHours())).slice(-2)+':'+('0' + (endTime.getUTCMinutes())).slice(-2)+':'+('0' + (endTime.getSeconds())).slice(-2);
    
                        if(currentTime >= startDateTime &&  currentTime <= endDateTime){
                            shifts = [] ;
                            shifts.push({
                                startTime : startTime ,
                                endedTime : endedTime,
                                date : shiftList.recordset[i].calendarDate,
                                dateTime : {
                                    startDateTime : startDateTime,
                                    endDateTime : endDateTime,
                                },
                              shiftNo :1,
                              currentShift : true ,
                              EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID, 
                              shiftName : getShifTName.recordset[0].EvolveShift_Name
    
                              });
                              count=0 ;
    
                        }else{
                               shifts.push({
                                
                                startTime : startTime ,
                                endedTime : endedTime,
                                date : shiftList.recordset[i].calendarDate,
                                dateTime : {
                                    startDateTime : startDateTime,
                                    endDateTime : endDateTime,
                                },
                              shiftNo :1,
                              currentShift : false , 
                              EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID,
                              shiftName : getShifTName.recordset[0].EvolveShift_Name
    
                              });
                              count+=1 ;
    
                        }
                     }
                  }
                }

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "SHIFT LIST", 
                    result: shifts};
                res.send(obj);
    
            }
        } catch (error) {
            Evolve.Log.error(" EERR2877: Error while get shift details "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2877 : Error while get shift details",result: null};
            res.send(obj);
        }
    },
    issuePallet: async function (req, res) {
        try {
            let error = false;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;
            if(req.body.EvolveSubItem_SubItem_ID == null){
                req.body.EvolveSubItem_SubItem_ID = req.body.EvolveItem_ID
             }
             let woNumber = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.getWoNumber(req.body.EvolveWoSchedule_ID);
             if (woNumber instanceof Error) {
                  Evolve.Log.error("EERR3093 : Error while get wo number ")
                  let obj = { statusCode: 400, status: "fail", message: "EERR3093: Error while get wo number ", result: null };
                  res.send(obj);
             } else
             {
                 req.body.EvolveWoSchedule_OrderID = woNumber.recordset[0].EvolveWoSchedule_OrderID;
                let changePalletStatus = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.changeInvPalletStatus(req.body);
                if (changePalletStatus instanceof Error || changePalletStatus.rowsAffected<1 ) {
                    error = true;
                }else{
                let addIssuedPallet = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.addIssuedPallet(req.body);
                if (addIssuedPallet instanceof Error || addIssuedPallet.rowsAffected<1 ) {
                    error = true;
                }else{
                    let updateProdOrd = await Evolve.App.Services.SmartFactory.timeSheetWoClosing.SrvTimeSheetIndex.updateProdOrderBom(req.body);
                    if (updateProdOrd instanceof Error || updateProdOrd.rowsAffected<1 ) {
                        error = true;
                }
                }
                if(error == true){
                    Evolve.Log.error("EERR3096 : Error while issue pallet")
                    let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3096 : Error while issue pallet "   ,
                    result: check.message
                    };
                    res.send(obj);
                 }else{
                    let obj = {
                            statusCode: 200,
                            status: "Success",
                            message: "Pallet issued successfully",
                            result:"Success"
                        };
                        res.send(obj);
                }
            }
        }
        } catch (error) {
            Evolve.Log.error(" EERR3097 : Error while issue pallet "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR3097 : Error while issue pallet "   ,
                result: null
            };
            res.send(obj);
        }
    },

    
    

}