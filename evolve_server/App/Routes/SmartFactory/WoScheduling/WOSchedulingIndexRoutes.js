'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title : WoScheduling API List
     *  Desc  :    
     */

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/getItemSearch", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.getItemSearch);

    Evolve.Router.get("/api/v1/smartFactory/scheduling/index/getWorkOrderList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.getWorkOrderList);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/getMachineShiftList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.getMachineShiftList, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.getMachineShiftList);

    Evolve.Router.get("/api/v1/smartFactory/scheduling/index/getMachineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.getMachineList);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/getWoSchedulingList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.getWoSchedulingList);

    Evolve.Router.get("/api/v1/smartFactory/scheduling/index/getDepartmentList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.getDepartmentList);

    Evolve.Router.get("/api/v1/smartFactory/scheduling/index/getItemList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.getItemList);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/addWOScheduling", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.addWOScheduling, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.addWOScheduling);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/deleteWos", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.deleteWos, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.deleteWos);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/updateWOSSqc", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.updateWOSSqc, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.updateWOSSqc);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/getPreviousShiftAvailableTime", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.getPreviousShiftAvailableTime, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.getPreviousShiftAvailableTime);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/getItemWorkOrderList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.getItemWorkOrderList, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.getItemWorkOrderList);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/getListByWorkOrderID", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.getListByWorkOrderID, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.getListByWorkOrderID);

    Evolve.Router.get("/api/v1/smartFactory/scheduling/index/getShiftMinMaxTime", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.getShiftMinMaxTime);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/getMachineToItemList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.getMachineToItemList, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.getMachineToItemList);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/workOrderSchedulingLock", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.workOrderSchedulingLock, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.workOrderSchedulingLock);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/getWOSDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.getWOSDetails, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.getWOSDetails);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/getWOSSingleData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.getWOSSingleData, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.getWOSSingleData);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/updateWOScheduling", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.updateWOScheduling, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.updateWOScheduling);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/wosPlanPause", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.wosPlanPause, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.wosPlanPause);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/getWosSplitData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.getWosSplitData, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.getWosSplitData);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/addSplitWOS", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.addSplitWOS, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.addSplitWOS);

    // Evolve.Router.post("/api/v1/smartFactory/scheduling/index/addNewMoveJob", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.addNewMoveJob, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.addNewMoveJob);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/getMoveJobData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.getMoveJobData, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.getMoveJobData);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/getDepartmentToMachineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.getDepartmentToMachineList, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.getDepartmentToMachineList);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/excelFileUploadWOScheduling", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.excelFileUploadWOScheduling);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/AddWosPlannerComment", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.AddWosPlannerComment, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.AddWosPlannerComment);

    Evolve.Router.get("/api/v1/smartFactory/scheduling/index/getReaonCodeList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.getReaonCodeList);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/AddWosDownTimeReasonCode", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.AddWosDownTimeReasonCode, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.AddWosDownTimeReasonCode);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/publishPlan", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.publishPlan, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.publishPlan);

    Evolve.Router.post("/api/v1/smartFactory/scheduling/index/AddWosEditPlan", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.SmartFactory.WoScheduling.MidWoSchedulingIndex.AddWosEditPlan, Evolve.App.Controllers.SmartFactory.WoScheduling.ConIndex.AddWosEditPlan);



    /** End  :WoScheduling  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in SmartFactory WoScheduling Router :", error)
}


module.exports = Evolve.Router