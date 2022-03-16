'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Machine Calender
     *  Desc  :    
     */

    // Evolve.Router.post('/api/v1/smartFactory/downTime/getAndonReportList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.DownTime.ConDownTimeList.getAndonReportList , Evolve.App.Controllers.SmartFactory.DownTime.ConDownTimeList.getAndonReportList);

    Evolve.Router.get('/api/v1/smartFactory/MachineCalender/getMachineList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization , Evolve.App.Controllers.SmartFactory.MachineCalendar.ConIndex.getMachineList);

    Evolve.Router.post('/api/v1/smartFactory/MachineCalender/saveMachineCalendar',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization ,Evolve.App.Middlewares.SmartFactory.MachineCalendar.MidIndex.saveMachineCalendar,  Evolve.App.Controllers.SmartFactory.MachineCalendar.ConIndex.saveMachineCalendar);

    Evolve.Router.post('/api/v1/smartFactory/MachineCalender/checkAlreadyExistCal',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization ,Evolve.App.Middlewares.SmartFactory.MachineCalendar.MidIndex.checkAlreadyExistCal,  Evolve.App.Controllers.SmartFactory.MachineCalendar.ConIndex.checkAlreadyExistCal);

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart Factory Machine Calender Router :", error)
}


module.exports = Evolve.Router