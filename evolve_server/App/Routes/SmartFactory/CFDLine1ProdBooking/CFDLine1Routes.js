'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  PRODUCTION BOOKING API List
     *  Desc  :    
     */

    Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getWoListAndSectionCodeByMachinCode", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getWoListAndSectionCodeByMachinCode);

    Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getMachineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getMachineList);

    Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getSectionList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getSectionList);

    Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getMachineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getMachineList);

    Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getWoList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getWoList);


    Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getWoDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getWoDetails);

    Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/onInventoryIssue", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.onInventoryIssue);

    Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/completeProductionBooking", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.completeProductionBooking);


    Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/checkInventory", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.checkInventory);

    Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/updateIssuedQty", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.updateIssuedQty);


    Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getTransHistory", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getTransHistory);

    Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getSlittingItemList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getSlittingItemList);

    Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/RePrintMaterialProduced", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.RePrintMaterialProduced);






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
    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getSectionList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getSectionList);


    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getWoList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getWoListAuth ,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getWoList);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getWoDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getWoDetailsAuth ,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getWoDetails);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/checkPallet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.checkPalletAuth ,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.checkPallet);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/issuePallet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.issuePalletAuth ,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.issuePallet);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getRtsLocationList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getRtsLocationList);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/rtsQty", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.rtsQtyAuth ,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.rtsQty);

    // // production booking apis
    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getProdBookingDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getProdBookingDetailsAuth,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getProdBookingDetails);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/completeProductionBooking", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.completeProductionBookingAuth,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.completeProductionBooking);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/deleteBookedPallet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.deleteBookedPalletAuth,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.deleteBookedPallet);


    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/confirmBooking", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.confirmBookingAuth,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.confirmBooking);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/updateBookedPallet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.updateBookedPalletAuth,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.updateBookedPallet);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getRtsUomList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getRtsUomListAuth,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getRtsUomList);


    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getTsShiftList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getTsShiftListAuth,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getTsShiftList);

    // // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getCurrentShiftQty", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getCurrentShiftQty);


    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getRtsReasonCodeList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getRtsReasonCodeList);


    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getSubReasonCodeList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getSubReasonCodeListAuth,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getSubReasonCodeList);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getOperatorData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getOperatorData);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/addTimeSheet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.addTimeSheetAuth,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.addTimeSheet);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getTimesheetList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getTimesheetListAuth,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getTimesheetList);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getItemSecUomList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getItemSecUomListAuth,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getItemSecUomList);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/deleteTimeSheet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.deleteTimeSheetAuth,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.deleteTimeSheet);


    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/addSubTimeSheet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.addSubTimeSheetAuth,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.addSubTimeSheet);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/addProdComments", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.addProdCommentsAuth ,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.addProdComments);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getMachinePlanDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getMachinePlanDetailsAuth ,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getMachinePlanDetails);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getPlanMtIssueDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getPlanMtIssueDetailsAuth ,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getPlanMtIssueDetails);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/completeJob", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.completeJobAuth ,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.completeJob);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/addEditedTimeSheet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.addEditedTimeSheetAuth ,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.addEditedTimeSheet);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getMachineSheduleComments", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getMachineSheduleCommentsAuth ,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getMachineSheduleComments);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getPlcDevice", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getPlcDevice);

    // Evolve.Router.post("/api/v1/smartFactory/CFDLine1ProdBooking/getWoDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.CFDLine1ProdBooking.ConCFDLine1.getWoDetails);

















    //  PRODUCTION BOOKING V1 API List end



    /** End  : PRODUCTION BOOKING API List */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart Factory Production Booking   Router :", error)
}


module.exports = Evolve.Router