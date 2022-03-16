'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  PRODUCTION BOOKING API List
     *  Desc  :    
     */

    Evolve.Router.post("/api/v1/smartFactory/V3/getMachineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getMachineList);

    Evolve.Router.post("/api/v1/smartFactory/V3/getSectionList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getSectionList);

    Evolve.Router.post("/api/v1/smartFactory/V3/getMachineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getMachineList);

    Evolve.Router.post("/api/v1/smartFactory/V3/getWoList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getWoList);


    Evolve.Router.post("/api/v1/smartFactory/V3/getWoDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getWoDetails);

    Evolve.Router.post("/api/v1/smartFactory/V3/onInventoryIssue", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.onInventoryIssue);

    Evolve.Router.post("/api/v1/smartFactory/V3/completeProductionBooking", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.completeProductionBooking);



    Evolve.Router.post("/api/v1/smartFactory/V3/checkInventory", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.checkInventory);

    Evolve.Router.post("/api/v1/smartFactory/V3/updateIssuedQty", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.updateIssuedQty);


    Evolve.Router.post("/api/v1/smartFactory/V3/getTransHistory", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getTransHistory);

    Evolve.Router.post("/api/v1/smartFactory/V3/getSlittingItemList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getSlittingItemList);






    // Evolve.Router.get("/api/v1/smartFactory/ProductionBooking/getLocationList", Evolve.App.Middlewares.EvolveCommonApiValidator.
    // apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getLocationList);

    // Evolve.Router.get("/api/v1/smartFactory/ProductionBooking/getOperatorList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getOperatorList);

    // Evolve.Router.get("/api/v1/smartFactory/ProductionBooking/getMachineAndSection", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getMachineAndSection);

    // Evolve.Router.get("/api/v1/smartFactory/ProductionBooking/getWorkCenterList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getWorkCenterList);

    // Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/getMachineListBySectionId", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getMachineListBySectionIdAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getMachineListBySectionId);

    // Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/getLocationByMachine", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getLocationByMachine);

    // Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/getItemListByWorkOrder", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getItemListByWorkOrderAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getItemListByWorkOrder);

    // Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/checkPickList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.checkPickList);

    // Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/checkWoInShift", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.checkWoInShift);

    // Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/getProdOrdersBom", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getProdOrdersBomAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getProdOrdersBom);

    // Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/getWorkOrderByItem", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getWorkOrderByItemAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getWorkOrderByItem);

    // Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/createOperator", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.createOperatorAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.createOperator);


    // Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/saveInventory", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.saveInventoryAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.saveInventory);



    // Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/getProductionBookingList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getProductionBookingListAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getProductionBookingList);


    // Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/moveMachine", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.moveMachine);

    // Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/getWorkOrderList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getWorkOrderList);

    // //  PRODUCTION BOOKING V1 API List  start

    // // production  issue 
    // Evolve.Router.post("/api/v1/smartFactory/V3/getSectionList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getSectionList);


    // Evolve.Router.post("/api/v1/smartFactory/V3/getWoList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getWoListAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getWoList);

    // Evolve.Router.post("/api/v1/smartFactory/V3/getWoDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getWoDetailsAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getWoDetails);

    // Evolve.Router.post("/api/v1/smartFactory/V3/checkPallet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.checkPalletAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.checkPallet);

    // Evolve.Router.post("/api/v1/smartFactory/V3/issuePallet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.issuePalletAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.issuePallet);

    // Evolve.Router.post("/api/v1/smartFactory/V3/getRtsLocationList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getRtsLocationList);

    // Evolve.Router.post("/api/v1/smartFactory/V3/rtsQty", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.rtsQtyAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.rtsQty);

    // // production booking apis
    // Evolve.Router.post("/api/v1/smartFactory/V3/getProdBookingDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getProdBookingDetailsAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getProdBookingDetails);

    // Evolve.Router.post("/api/v1/smartFactory/V3/completeProductionBooking", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.completeProductionBookingAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.completeProductionBooking);

    // Evolve.Router.post("/api/v1/smartFactory/V3/deleteBookedPallet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.deleteBookedPalletAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.deleteBookedPallet);


    // Evolve.Router.post("/api/v1/smartFactory/V3/confirmBooking", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.confirmBookingAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.confirmBooking);

    // Evolve.Router.post("/api/v1/smartFactory/V3/updateBookedPallet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.updateBookedPalletAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.updateBookedPallet);

    // Evolve.Router.post("/api/v1/smartFactory/V3/getRtsUomList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getRtsUomListAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getRtsUomList);


    // Evolve.Router.post("/api/v1/smartFactory/V3/getTsShiftList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getTsShiftListAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getTsShiftList);

    // // Evolve.Router.post("/api/v1/smartFactory/V3/getCurrentShiftQty", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getCurrentShiftQty);


    // Evolve.Router.post("/api/v1/smartFactory/V3/getRtsReasonCodeList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getRtsReasonCodeList);


    // Evolve.Router.post("/api/v1/smartFactory/V3/getSubReasonCodeList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getSubReasonCodeListAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getSubReasonCodeList);

    // Evolve.Router.post("/api/v1/smartFactory/V3/getOperatorData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getOperatorData);

    // Evolve.Router.post("/api/v1/smartFactory/V3/addTimeSheet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.addTimeSheetAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.addTimeSheet);

    // Evolve.Router.post("/api/v1/smartFactory/V3/getTimesheetList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getTimesheetListAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getTimesheetList);

    // Evolve.Router.post("/api/v1/smartFactory/V3/getItemSecUomList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getItemSecUomListAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getItemSecUomList);

    // Evolve.Router.post("/api/v1/smartFactory/V3/deleteTimeSheet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.deleteTimeSheetAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.deleteTimeSheet);


    // Evolve.Router.post("/api/v1/smartFactory/V3/addSubTimeSheet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.addSubTimeSheetAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.addSubTimeSheet);

    // Evolve.Router.post("/api/v1/smartFactory/V3/addProdComments", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.addProdCommentsAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.addProdComments);

    // Evolve.Router.post("/api/v1/smartFactory/V3/getMachinePlanDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getMachinePlanDetailsAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getMachinePlanDetails);

    // Evolve.Router.post("/api/v1/smartFactory/V3/getPlanMtIssueDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getPlanMtIssueDetailsAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getPlanMtIssueDetails);

    // Evolve.Router.post("/api/v1/smartFactory/V3/completeJob", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.completeJobAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.completeJob);

    // Evolve.Router.post("/api/v1/smartFactory/V3/addEditedTimeSheet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.addEditedTimeSheetAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.addEditedTimeSheet);

    // Evolve.Router.post("/api/v1/smartFactory/V3/getMachineSheduleComments", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getMachineSheduleCommentsAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getMachineSheduleComments);

    // Evolve.Router.post("/api/v1/smartFactory/V3/getPlcDevice", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getPlcDevice);

    // Evolve.Router.post("/api/v1/smartFactory/V3/getWoDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV3.getWoDetails);

















    //  PRODUCTION BOOKING V1 API List end



    /** End  : PRODUCTION BOOKING API List */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart Factory Production Booking   Router :", error)
}


module.exports = Evolve.Router