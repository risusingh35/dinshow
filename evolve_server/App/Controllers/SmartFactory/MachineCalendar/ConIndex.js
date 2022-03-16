'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getMachineList: async function(req , res) {
        try {
            let getMachineList = await  Evolve.App.Services.SmartFactory.MachineCalender.SrvIndex.getMachineList();  
            if(getMachineList instanceof Error || getMachineList.rowsAffected < 1)
            {
                let obj = { statusCode: 400, status: "fail", message: "EERR2487 : Error while getting machine list "+getMachineList.message, result: null };
                res.send(obj);
            }
            else
            {
                let obj = { statusCode: 200, status: "success", message: "Machine List", result: getMachineList.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2487 : Error while getting machine list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR2487 : Error while getting machine list "+error.message, result: null };
            res.send(obj);
        }
    },

    saveMachineCalendar : async function(req , res) {
        try {
            // console.log("req.body.machineCalArray :",req.body.machineCalArray);
            let saveMachineCalendarError = false;
            for(let i = 0;i < req.body.machineCalArray.length ; i++)
            {
                if(saveMachineCalendarError == false)
                {    
                    let data = req.body.machineCalArray[i]
                    data.EvolveUser_ID = req.EvolveUser_ID;
                    data.EvolveMachineCalendar_Shift3 = (data.EvolveMachineCalendar_Shift3 == "") ? 0 : data.EvolveMachineCalendar_Shift3;
                    let getShiftStartTimes = await  Evolve.App.Services.SmartFactory.MachineCalender.SrvIndex.getShiftStartTimes(data.EvolveMachineCalendar_ShiftType);
                    if(getShiftStartTimes instanceof Error) {
                        saveMachineCalendarError = true;
                        Evolve.Log.error("EERR2537: Error while getting shifts start times");
                    } else if (getShiftStartTimes.rowsAffected < 1) {
                        saveMachineCalendarError = true;
                        Evolve.Log.error("EERR2537: Error while getting shifts start times");
                    }
                    else {
                        if(getShiftStartTimes.rowsAffected == 3)
                        {
                            data.EvolveMachineCalendar_Shift1StartTime = getShiftStartTimes.recordset[0].EvolveShift_Start.toISOString().slice(11, 16)
                            data.EvolveMachineCalendar_Shift2StartTime = getShiftStartTimes.recordset[1].EvolveShift_Start.toISOString().slice(11, 16)
                            data.EvolveMachineCalendar_Shift3StartTime = getShiftStartTimes.recordset[2].EvolveShift_Start.toISOString().slice(11, 16)
                        }
                        if(getShiftStartTimes.rowsAffected == 2)
                        {
                            data.EvolveMachineCalendar_Shift1StartTime = getShiftStartTimes.recordset[0].EvolveShift_Start.toISOString().slice(11, 16)
                            data.EvolveMachineCalendar_Shift2StartTime = getShiftStartTimes.recordset[1].EvolveShift_Start.toISOString().slice(11, 16)
                            data.EvolveMachineCalendar_Shift3StartTime = "00:00:00"
                        }
                        // data.EvolveMachineCalendar_Shift0StartTime = "00:00:00"
                        // data.EvolveMachineCalendar_Shift1StartTime = "00:00:00"
                        // data.EvolveMachineCalendar_Shift2StartTime = "00:00:00"
                    }
                    let checkMachineCalAlreadyExit = await  Evolve.App.Services.SmartFactory.MachineCalender.SrvIndex.checkMachineCalAlreadyExit(data);
                    if(checkMachineCalAlreadyExit instanceof Error)
                    {
                        saveMachineCalendarError = true;
                        Evolve.Log.error("EERR2534: Error while getting exit single machine calendar data ");
                    }
                    else if(checkMachineCalAlreadyExit.rowsAffected >= 1)
                    {
                        data.EvolveMachineCalendar_ID = checkMachineCalAlreadyExit.recordset[0].EvolveMachineCalendar_ID;
                        let updateMachineCalendar = await  Evolve.App.Services.SmartFactory.MachineCalender.SrvIndex.updateMachineCalendar(data);
                        if(updateMachineCalendar instanceof Error || updateMachineCalendar.rowsAffected < 1)
                        {
                            saveMachineCalendarError = true;
                            Evolve.Log.error(" EERR2535: Error while update machine calendar ");
                        }
                    }
                    else
                    {
                        let saveMachineCalendar = await  Evolve.App.Services.SmartFactory.MachineCalender.SrvIndex.saveMachineCalendar(data);
                        if(saveMachineCalendar instanceof Error || saveMachineCalendar.rowsAffected < 1)
                        {
                            saveMachineCalendarError = true;
                            Evolve.Log.error(" EERR2490: Error while save machine calendar "+saveMachineCalendar.message);
                        }
                    }
                }
            }
            if(saveMachineCalendarError == true)
            {
                let obj = { statusCode: 400, status: "fail", message: "EERR2490: Error while save machine calendar", result: null };
                res.send(obj);
            }
            else
            {
                let obj = { statusCode: 200, status: "success", message: "Machine calendar saved successfully ", result: null};
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2487 : Error while getting machine list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR2487 : Error while getting machine list "+error.message, result: null };
            res.send(obj);
        }
    },


    checkAlreadyExistCal : async function(req , res) {
        try {
            let checkAlreadyExistCal = await  Evolve.App.Services.SmartFactory.MachineCalender.SrvIndex.checkAlreadyExistCal(req.body);  
            if(checkAlreadyExistCal instanceof Error)
            {
                let obj = { statusCode: 400, status: "fail", message: "EERR2531 : Error while getting exit machine calendar data ", result: null };
                res.send(obj);
            }
            else
            {
                let obj = { statusCode: 200, status: "success", message: "Machine Calendar", result: checkAlreadyExistCal.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2531 : Error while getting exit machine calendar data "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR2531 : Error while getting exit machine calendar data "+error.message, result: null };
            res.send(obj);
        }
    },
  



}