'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title : WoScheduling API List
     *  Desc  :    
     */

    Evolve.Router.post("/api/v1/smartFactory/scheduling/getItemSearch", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.WoScheduling.ConList.getItemSearch);

    Evolve.Router.get("/api/v1/smartFactory/scheduling/getWorkOrderList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.WoScheduling.ConList.getWorkOrderList);

    Evolve.Router.get("/api/v1/smartFactory/scheduling/getShiftList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.WoScheduling.ConList.getShiftList);

    Evolve.Router.get("/api/v1/smartFactory/scheduling/getMachineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.WoScheduling.ConList.getMachineList);

    Evolve.Router.get("/api/v1/smartFactory/scheduling/getWoSchedulingList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.WoScheduling.ConList.getWoSchedulingList);

    Evolve.Router.get("/api/v1/smartFactory/scheduling/getDepartmentList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.WoScheduling.ConList.getDepartmentList);

    Evolve.Router.get("/api/v1/smartFactory/scheduling/getItemList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.WoScheduling.ConList.getItemList);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/addWOScheduling", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoScheduling.addWOScheduling, Evolve.App.Controllers.SmartFactory.WoScheduling.ConList.addWOScheduling);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/deleteWos", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoScheduling.deleteWos, Evolve.App.Controllers.SmartFactory.WoScheduling.ConList.deleteWos);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/updateWOSSqc", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoScheduling.updateWOSSqc, Evolve.App.Controllers.SmartFactory.WoScheduling.ConList.updateWOSSqc);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/getPreviousShiftAvailableTime", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoScheduling.getPreviousShiftAvailableTime, Evolve.App.Controllers.SmartFactory.WoScheduling.ConList.getPreviousShiftAvailableTime);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/getItemWorkOrderList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoScheduling.getItemWorkOrderList, Evolve.App.Controllers.SmartFactory.WoScheduling.ConList.getItemWorkOrderList);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/getListByWorkOrderID", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoScheduling.getListByWorkOrderID, Evolve.App.Controllers.SmartFactory.WoScheduling.ConList.getListByWorkOrderID);

    Evolve.Router.get("/api/v1/smartFactory/scheduling/getShiftMinMaxTime", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.WoScheduling.ConList.getShiftMinMaxTime);




    /** End  :WoScheduling  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in SmartFactory WoScheduling Router :", error)
}


module.exports = Evolve.Router