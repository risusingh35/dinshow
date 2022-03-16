'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
	checkSlotStatus: async function (req, res) {
		// console.log("req.EvolveUser_ID : ", req.EvolveUser_ID);
		let checkSlotStatus = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.checkSlotStatus(req.body);
		if (checkSlotStatus instanceof Error) {
			let obj = { statusCode: 400, status: "fail", message: "Error While Fetch Forecast List", result: checkSlotStatus.message };
			res.send(obj);
		} else {
			let obj = { statusCode: 200, status: "success", message: "Forecast goted Successfully !", result: checkSlotStatus.recordset };
			res.send(obj);
		}
    },
    
    openSlotStatus: async function (req, res) {
        // console.log("req.EvolveUser_ID : ", req.EvolveUser_ID);
        if(req.body.EvolveBranchForecast_Slot == 1)
        {
            let openSlotStatus = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.openSlotStatus(req.body);
            if (openSlotStatus instanceof Error || openSlotStatus.rowsAffected < 1 ) {
                let obj = { statusCode: 400, status: "fail", message: "Error open slot", result: openSlotStatus.message };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Slot open successfully", result: null };
                res.send(obj);
            }
        } else {
            let prvSlotData = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.prvSlotData(req.body);
            if (prvSlotData instanceof Error || prvSlotData.rowsAffected < 1 ) {
                let obj = { statusCode: 400, status: "fail", message: "Error while get previos slot data", result: prvSlotData.message };
                res.send(obj);
            } else {
                if(prvSlotData.recordset[0].EvolveBranchForecast_Status != 'freeze')
                {
                    let obj = { statusCode: 400, status: "fail", message: "Previous slot is open", result: prvSlotData.message };
                    res.send(obj);
                }
                else
                {
                    let date = new Date();
                    let save_error = false;
                    let error_msg = "";
                    for(let i = 0 ; i < prvSlotData.rowsAffected ; i++){
                        let data = prvSlotData.recordset[i];
                        let addBranchForecastArray = {
                          "EvolveBudgetBranchLink_ID" : data.EvolveBudgetBranchLink_ID,
                          "EvolveBranchForecast_Value" : data.EvolveBranchForecast_Value,
                          "EvolveBranchForecast_ActualValue" : data.EvolveBranchForecast_ActualValue,
                          "EvolveBranchForecast_Slot" : req.body.EvolveBranchForecast_Slot,
                          "EvolveBranchForecast_Status" : 'open',
                          "EvolveBranchForecast_CreatedAt" : date.getFullYear() +"-"+(date.getMonth() + 1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"."+date.getMilliseconds(),
                          "EvolveBranchForecast_CreatedUser" : req.EvolveUser_ID ,
                          "EvolveBranchForecast_UpdatedAt" : date.getFullYear() +"-"+(date.getMonth() + 1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"."+date.getMilliseconds(),
                          "EvolveBranchForecast_UpdatedUser" : req.EvolveUser_ID
                        }
                        let addBranchForecast = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.addBranchForecast(addBranchForecastArray);
                        if (addBranchForecast instanceof Error || addBranchForecast.rowsAffected < 1) {
                            Evolve.Log.error('Error During Add BranchForecast');
                            save_error = true;
                            error_msg = "Error During Add BranchForecast";
                        } else {
                            save_error = false;
                            error_msg = "Slot open successfully";
                        }
                    }
                    if(save_error == true) {
                        let obj = { statusCode: 400, status: "fail", message: error_msg, result: null};
                        res.send(obj);
                    } else {
                        let obj = { statusCode: 200, status: "success", message: error_msg, result: null};
                        res.send(obj);
                    }
                }
            }

        }
    },
    
    freezeSlotStatus: async function (req, res) {
        // console.log("req.EvolveUser_ID : ", req.EvolveUser_ID);
        // if(req.body.EvolveBranchForecast_Slot == "1")
        // {
        //     let updateSlotForecast = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.updateSlotForecast(req.body);
        // }
        let freezeSlotStatus = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.freezeSlotStatus(req.body);
        if (freezeSlotStatus instanceof Error || freezeSlotStatus.rowsAffected < 1 ) {
            let obj = { statusCode: 400, status: "fail", message: "Error freeze slot", result: freezeSlotStatus.message };
            res.send(obj);
        } else {
            let obj = { statusCode: 200, status: "success", message: "Slot Freeze successfully", result: null };
            res.send(obj);
        }
    },
    
    closeForecast: async function (req, res) {
        // console.log("req.EvolveUser_ID : ", req.EvolveUser_ID);
        let closeForecast = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.closeForecast(req.body);
        if (closeForecast instanceof Error || closeForecast.rowsAffected < 1 ) {
            let obj = { statusCode: 400, status: "fail", message: "Error forecast close", result: closeForecast.message };
            res.send(obj);
        } else {
            let getForeCastCarry = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.getForeCastCarry(req.body);
            if(getForeCastCarry instanceof Error || getForeCastCarry.rowsAffected < 1)
            {
                let obj = { statusCode: 400, status: "fail", message: "Error while get carry data for next month", result: freezeSlotStatus.message };
                res.send(obj);
            }
            else
            {
                let errorCarry = false;
                if(req.body.EvolveBudgetBranchLink_Month != "Dec")
                {
                    for(let i = 0 ; i < getForeCastCarry.rowsAffected;i++)
                    {
                        if(errorCarry == false)
                        {
                            let carry = getForeCastCarry.recordset[i];
                            let carryValue = parseFloat(carry.EvolveBranchForecast_Value) - parseFloat(carry.EvolveBranchForecast_ActualValue);
                            if(carryValue < 0){
                                carryValue = 0;
                            }
                            let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                            let monthIndex = monthNames.indexOf(req.body.EvolveBudgetBranchLink_Month);
                            monthIndex = monthIndex + 1;
                            let nxtMonth = monthNames[monthIndex];
                            let nxtMonthCarryArray = {
                                "EvolveBudgetBranchLink_Month" : nxtMonth ,
                                "EvolveBudgetBranchLink_Year" : req.body.EvolveBudgetBranchLink_Year,
                                "EvolveBudgetBranchLink_Carry" : carryValue,
                                "EvolveBusinessLine_ID" : carry.EvolveBusinessLine_ID,
                                "EvolveBranch_ID" : carry.EvolveBranch_ID,
                            };
                            let updateCarryBudget = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.updateCarryBudget(nxtMonthCarryArray);
                            if(updateCarryBudget instanceof Error || updateCarryBudget.rowsAffected < 1){
                                Evolve.Log.error("Budget Carry Have Some Issue");
                                errorCarry = true;
                            }
                        }
                    }
                    if(errorCarry == false)
                    {
                        let obj = { statusCode: 200, status: "success", message: "Forecast closed", result: null };
                        res.send(obj);
                    }
                    else
                    {
                        let obj = { statusCode: 400, status: "fail", message: "Budget carry have some issue", result: null };
                        res.send(obj);
                    }

                }
                else
                {
                    let obj = { statusCode: 200, status: "success", message: "Forecast closed", result: null };
                    res.send(obj);
                }
            }
            // console.log("getForeCastCarry ::",getForeCastCarry);
        }
    },
    
    closeForecastSchedularTest : async function () {
        let date = new Date();
        let currentMonth = date.getMonth();
        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let data = {};
        currentMonth = currentMonth - 1;
        if(currentMonth < 0)
        {
            data.EvolveBudgetBranchLink_Month = "Dec";
            data.EvolveBudgetBranchLink_Year = (date.getFullYear() - 1);
        }
        else
        {
            data.EvolveBudgetBranchLink_Month = monthNames[currentMonth]
            data.EvolveBudgetBranchLink_Year = date.getFullYear();
        }
        // console.log(data.EvolveBudgetBranchLink_Month+"-"+data.EvolveBudgetBranchLink_Year);
    },

    closeForecastSchedular : async function () {
        // console.log("req.EvolveUser_ID : ", req.EvolveUser_ID);
        let date = new Date();
        let currentMonth = date.getMonth();
        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let data = {};
        currentMonth = currentMonth - 1;
        if(currentMonth < 0)
        {
            data.EvolveBudgetBranchLink_Month = "Dec";
            data.EvolveBudgetBranchLink_Year = (date.getFullYear() - 1);
        }
        else
        {
            data.EvolveBudgetBranchLink_Month = monthNames[currentMonth]
            data.EvolveBudgetBranchLink_Year = date.getFullYear();
        }
        let closeForecast = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.closeForecast(data);
        if (closeForecast instanceof Error || closeForecast.rowsAffected < 1 ) {
            // let obj = { statusCode: 400, status: "fail", message: "Error forecast close", result: closeForecast.message };
            // res.send(obj);
            Evolve.Log.info("Error forecast close");
            Error.Log.error(closeForecast.message)
        } else {
            let getForeCastCarry = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.getForeCastCarry(data);
            if(getForeCastCarry instanceof Error || getForeCastCarry.rowsAffected < 1)
            {
                // let obj = { statusCode: 400, status: "fail", message: "Error while get carry data for next month", result: freezeSlotStatus.message };
                // res.send(obj);
                Evolve.Log.error("Error while get carry data for next month");
                Evolve.Log.error(getForeCastCarry.message)
            }
            else
            {
                let errorCarry = false;
                if(data.EvolveBudgetBranchLink_Month != "Dec")
                {
                    for(let i = 0 ; i < getForeCastCarry.rowsAffected;i++)
                    {
                        if(errorCarry == false)
                        {
                            let carry = getForeCastCarry.recordset[i];
                            let carryValue = parseFloat(carry.EvolveBranchForecast_Value) - parseFloat(carry.EvolveBranchForecast_ActualValue);
                            // if(carryValue < 0){
                            //     carryValue = 0;
                            // }
                            // let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                            let monthIndex = monthNames.indexOf(data.EvolveBudgetBranchLink_Month);
                            monthIndex = monthIndex + 1;
                            let nxtMonth = monthNames[monthIndex];
                            let nxtMonthCarryArray = {
                                "EvolveBudgetBranchLink_Month" : nxtMonth ,
                                "EvolveBudgetBranchLink_Year" : data.EvolveBudgetBranchLink_Year,
                                "EvolveBudgetBranchLink_Carry" : carryValue,
                                "EvolveBusinessLine_ID" : carry.EvolveBusinessLine_ID,
                                "EvolveBranch_ID" : carry.EvolveBranch_ID,
                            };
                            let updateCarryBudget = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.updateCarryBudget(nxtMonthCarryArray);
                            if(updateCarryBudget instanceof Error || updateCarryBudget.rowsAffected < 1){
                                Evolve.Log.error("Budget Carry Have Some Issue");
                                Evolve.Log.error(updateCarryBudget.message);
                                errorCarry = true;
                            }
                        }
                    }
                    if(errorCarry == false)
                    {
                        // let obj = { statusCode: 200, status: "success", message: "Forecast closed", result: null };
                        // res.send(obj);
                        Evolve.Log.info("Forecast closed");
                    }
                    else
                    {
                        // let obj = { statusCode: 400, status: "fail", message: "Budget carry have some issue", result: null };
                        // res.send(obj);
                        Evolve.Log.error("Budget carry have some issue");
                    }

                }
                else
                {
                    // let obj = { statusCode: 200, status: "success", message: "Forecast closed", result: null };
                    // res.send(obj);
                    Evolve.Log.info("Forecast closed");
                }
            }
            let addBranchForecastHistory = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.addBranchForecastHistory(data);
            if(addBranchForecastHistory instanceof Error || addBranchForecastHistory.rowsAffected < 1)
            {
                Evolve.Log.error("Error while add data to forecast history");
                Evolve.Log.error(addBranchForecastHistory.message);
            }
            else
            {
                Evolve.Log.info("Forecast History Added Successfully");
            }
            // console.log("getForeCastCarry ::",getForeCastCarry);
        }
    },

    /** Start  : Old Forecasting */

    openOldSlotStatus: async function (req, res) {
        let openOldSlot = true;
        let checkCurrentSlot = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.checkSlotStatus(req.body);
        if (checkCurrentSlot instanceof Error) {
            let obj = { statusCode: 400, status: "fail", message: "Error in check current slot status", result: null };
            res.send(obj);
        }
        else if (checkCurrentSlot.rowsAffected > 0) {
            if (checkCurrentSlot.recordset[0].EvolveBranchForecast_Status == 'freeze' || checkCurrentSlot.recordset[0].EvolveBranchForecast_Status == 'open' || checkCurrentSlot.recordset[0].EvolveBranchForecast_Status == 'close') {

                let obj = { statusCode: 400, status: "success", message: "Opps You Already Used This Slot !!", result: null };
                res.send(obj);
                openOldSlot = false;
            }
            else{
                openOldSlot = true;
            }
        }
        if (openOldSlot == true) {
            if (req.body.EvolveBranchForecast_Slot == 1) {
                let openSlotStatus = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.openSlotStatus(req.body);
                if (openSlotStatus instanceof Error || openSlotStatus.rowsAffected < 1) {
                    let obj = { statusCode: 400, status: "fail", message: "Error open slot", result: openSlotStatus.message };
                    res.send(obj);
                } else {
                    let obj = { statusCode: 200, status: "success", message: "Slot open successfully", result: null };
                    res.send(obj);
                }
            } else {
                let prvSlotData = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.prvSlotData(req.body);
                
                if (prvSlotData instanceof Error || prvSlotData.rowsAffected < 1) {
                    let obj = { statusCode: 400, status: "fail", message: "Error while get previos slot data", result: prvSlotData.message };
                    res.send(obj);
                } else {
                    if (prvSlotData.recordset[0].EvolveBranchForecast_Status == 'open') {
                        let obj = { statusCode: 400, status: "fail", message: "Previous slot is open", result: prvSlotData.message };
                        res.send(obj);
                    }
                    else {
                        let date = new Date();
                        let save_error = false;
                        let error_msg = "";
                        for (let i = 0; i < prvSlotData.rowsAffected; i++) {
                            let data = prvSlotData.recordset[i];
                            let addBranchForecastArray = {
                                "EvolveBudgetBranchLink_ID": data.EvolveBudgetBranchLink_ID,
                                "EvolveBranchForecast_Value": 0,
                                "EvolveBranchForecast_ActualValue": data.EvolveBranchForecast_ActualValue,
                                "EvolveBranchForecast_Slot": req.body.EvolveBranchForecast_Slot,
                                "EvolveBranchForecast_Status": 'open',
                                "EvolveBranchForecast_CreatedAt": date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds(),
                                "EvolveBranchForecast_CreatedUser": req.EvolveUser_ID,
                                "EvolveBranchForecast_UpdatedAt": date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds(),
                                "EvolveBranchForecast_UpdatedUser": req.EvolveUser_ID
                            }
                            let addBranchForecast = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.addBranchForecast(addBranchForecastArray);
                            if (addBranchForecast instanceof Error || addBranchForecast.rowsAffected < 1) {
                                Evolve.Log.error(' EERR0938: Error During Add BranchForecast ');
                                save_error = true;
                                error_msg = "Error During Add BranchForecast";
                            } else {
                                save_error = false;
                                error_msg = "Slot open successfully";
                            }
                        }
                        if (save_error == true) {
                            let obj = { statusCode: 400, status: "fail", message: error_msg, result: null };
                            res.send(obj);
                        } else {
                            let obj = { statusCode: 200, status: "success", message: error_msg, result: null };
                            res.send(obj);
                        }
                    }
                }

            }
        }
    },

    closeOldSlotStatus : async function (req, res) {
        var data = {
            EvolveBudgetBranchLink_Month : req.body.EvolveBudgetBranchLink_Month,
            EvolveBudgetBranchLink_Year : req.body.EvolveBudgetBranchLink_Year,
            EvolveBranchForecast_Slot : 1
        }
        let responseSlot1 = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.checkSlotStatus(data);
        
        if (responseSlot1 instanceof Error || responseSlot1.rowsAffected < 1) {
            let obj = { statusCode: 400, status: "fail", message: "Error While check old slot Status", result: null };
            res.send(obj)
        }
        else if (responseSlot1.rowsAffected > 0){
            
            if (responseSlot1.recordset[0].EvolveBranchForecast_Status == 'open' && responseSlot1.recordset[0].EvolveBranchForecast_Status != 'freeze') {
                let obj = { statusCode: 400, status: "fail", message: "1st slot is not open", result: null };
                res.send(obj)
            }
            else{
                data = {
                    EvolveBudgetBranchLink_Month : req.body.EvolveBudgetBranchLink_Month,
                    EvolveBudgetBranchLink_Year : req.body.EvolveBudgetBranchLink_Year,
                    EvolveBranchForecast_Slot : 2
                }
                let responseSlot2 = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.checkSlotStatus(data);
            

                if (responseSlot2 instanceof Error || responseSlot2.rowsAffected < 1) {
                    let obj = { statusCode: 400, status: "fail", message: "Error While check old slot Status", result: null };
                    res.send(obj)
                }
                else if (responseSlot2.rowsAffected > 0) {
                    if (responseSlot2.recordset[0].EvolveBranchForecast_Status == 'open' && responseSlot2.recordset[0].EvolveBranchForecast_Status != 'freeze') {
                        let obj = { statusCode: 400, status: "fail", message: "2nd slot is open", result: null };
                        res.send(obj)
                    }
                    else{
                       data = {
                            EvolveBudgetBranchLink_Month : req.body.EvolveBudgetBranchLink_Month,
                            EvolveBudgetBranchLink_Year : req.body.EvolveBudgetBranchLink_Year,
                            EvolveBranchForecast_Slot : 3
                        }
                        let responseSlot3 = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.checkSlotStatus(data);
                        
                        if (responseSlot3 instanceof Error || responseSlot3.rowsAffected < 1) {
                            let obj = { statusCode: 400, status: "fail", message: "Error While check old slot Status", result: null };
                            res.send(obj)
                        }
                        else if (responseSlot3.rowsAffected > 0) {
                            if (responseSlot3.recordset[0].EvolveBranchForecast_Status == 'open' && responseSlot3.recordset[0].EvolveBranchForecast_Status != 'freeze') {
                                let obj = { statusCode: 400, status: "fail", message: "3rd slot is open", result: null };
                                res.send(obj)
                            }
                            else if (responseSlot3.recordset[0].EvolveBranchForecast_Status == 'close') {
                                let obj = { statusCode: 400, status: "fail", message: "slot is already closed", result: null };
                                res.send(obj)
                            }
                            else if(responseSlot3.recordset[0].EvolveBranchForecast_Status == 'freeze'){
                                let response = await Evolve.App.Services.Snop.Forecasting.SrvSlotManagement.closeForecast(req.body);
                                if (response instanceof Error || response.rowsAffected < 1) {
                                    let obj = { statusCode: 400, status: "fail", message: "Error While Close Old Slot Status", result: null };
                                    res.send(obj);
                                } else {
                                    let obj = { statusCode: 200, status: "success", message: `${req.body.EvolveBudgetBranchLink_Month}-${req.body.EvolveBudgetBranchLink_Year} Slot Closed Successfully !`, result: null };
                                    res.send(obj);
                                }
                            }
                        }
                    }
                }
            }

            
        }
        
    },

      /** End  : Old Forecasting */
}       