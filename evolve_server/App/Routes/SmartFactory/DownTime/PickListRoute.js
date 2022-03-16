'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Down Time API List
     *  Desc  :    
     */


     // Andon Report
    Evolve.Router.post('/api/v1/smartFactory/downTime/getAndonReportList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.DownTime.ConDownTimeList.getAndonReportList , Evolve.App.Controllers.SmartFactory.DownTime.ConDownTimeList.getAndonReportList);

   
     /** End  : Plan Upload  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart Factory Down Time Router :", error)
}


module.exports = Evolve.Router