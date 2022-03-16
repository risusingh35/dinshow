'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  PRODUCTION BOOKING API List
     *  Desc  :    
     */
    Evolve.Router.get("/api/v1/smartFactory/ProductionBooking/getLocationList", Evolve.App.Middlewares.EvolveCommonApiValidator.
    apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getLocationList);

    Evolve.Router.get("/api/v1/smartFactory/ProductionBooking/getOperatorList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getOperatorList);

    Evolve.Router.get("/api/v1/smartFactory/ProductionBooking/getMachineAndSection", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getMachineAndSection);

    Evolve.Router.get("/api/v1/smartFactory/ProductionBooking/getWorkCenterList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getWorkCenterList);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/getMachineListBySectionId", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getMachineListBySectionIdAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getMachineListBySectionId);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/getLocationByMachine", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getLocationByMachine);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/getItemListByWorkOrder", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getItemListByWorkOrderAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getItemListByWorkOrder);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/checkPickList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.checkPickList);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/checkWoInShift", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.checkWoInShift);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/getProdOrdersBom", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getProdOrdersBomAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getProdOrdersBom);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/getWorkOrderByItem", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getWorkOrderByItemAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getWorkOrderByItem);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/createOperator", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.createOperatorAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.createOperator);


    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/saveInventory", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.saveInventoryAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.saveInventory);


    
    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/getProductionBookingList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getProductionBookingListAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getProductionBookingList);

        
    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/moveMachine", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.moveMachine);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/getWorkOrderList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.conIndex.getWorkOrderList);

    //  PRODUCTION BOOKING V1 API List  start

    // production  issue 
    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getSectionList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getSectionList);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getMachineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getMachineListAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getMachineList);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getWoList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getWoListAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getWoList);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getWoDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getWoDetailsAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getWoDetails);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/checkPallet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.checkPalletAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.checkPallet);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/issuePallet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.issuePalletAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.issuePallet);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getRtsLocationList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getRtsLocationList);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/rtsQty", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.rtsQtyAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.rtsQty);

    // production booking apis
    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getProdBookingDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getProdBookingDetailsAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getProdBookingDetails);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/completeProductionBooking", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.completeProductionBookingAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.completeProductionBooking);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/deleteBookedPallet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.deleteBookedPalletAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.deleteBookedPallet);

    
    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/confirmBooking", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.confirmBookingAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.confirmBooking);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/updateBookedPallet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.updateBookedPalletAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.updateBookedPallet);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getRtsUomList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getRtsUomListAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getRtsUomList);

    
    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getTsShiftList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getTsShiftListAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getTsShiftList);

    // Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getCurrentShiftQty", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getCurrentShiftQty);


    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getRtsReasonCodeList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getRtsReasonCodeList);

    
    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getSubReasonCodeList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getSubReasonCodeListAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getSubReasonCodeList);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getOperatorData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getOperatorData);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/addTimeSheet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.addTimeSheetAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.addTimeSheet);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getTimesheetList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getTimesheetListAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getTimesheetList);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getItemSecUomList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getItemSecUomListAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getItemSecUomList);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/deleteTimeSheet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.deleteTimeSheetAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.deleteTimeSheet);

    
    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/addSubTimeSheet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.addSubTimeSheetAuth,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.addSubTimeSheet);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/addProdComments", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.addProdCommentsAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.addProdComments);
    
    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getMachinePlanDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getMachinePlanDetailsAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getMachinePlanDetails);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getPlanMtIssueDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getPlanMtIssueDetailsAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getPlanMtIssueDetails);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/completeJob", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.completeJobAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.completeJob);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/addEditedTimeSheet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.addEditedTimeSheetAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.addEditedTimeSheet);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getMachineSheduleComments", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.ProductionBooking.MidProductionBooking.getMachineSheduleCommentsAuth ,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getMachineSheduleComments);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getPlcDevice", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getPlcDevice);

    Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getWoDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getWoDetails);








    








    //  PRODUCTION BOOKING V1 API List end



    /** End  : PRODUCTION BOOKING API List */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Smart Factory Production Booking   Router :", error)
}


module.exports = Evolve.Router
