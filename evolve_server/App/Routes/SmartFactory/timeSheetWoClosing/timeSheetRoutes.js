'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Timesheet Woclosing API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getMachineList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getMachineList);

    Evolve.Router.get('/api/v1/smartFactory/timeSheetWoClosing/getSectionList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getSectionList);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getTimesheetList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.getTimesheetListAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getTimesheetList);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/onTimeSheetApprove', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.onTimeSheetApproveAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.onTimeSheetApprove);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/onTsPostToErp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.onTsPostToErpAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.onTsPostToErp);

    
    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/deleteTimeSheet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.deleteTimeSheetAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.deleteTimeSheet);

        
    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getOperatorData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getOperatorData);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getWoList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.getWoListAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getWoList);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getTsShiftList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.getTsShiftListAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getTsShiftList);

    
    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/addSubTimeSheet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.addSubTimeSheetAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.addSubTimeSheet);
    

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getWoDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.getWoDetailsAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getWoDetails);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/addEditedTimeSheet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.addEditedTimeSheetAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.addEditedTimeSheet);

    
    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getTsDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.getTsDetailsAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getTsDetails);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getWcWOList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.getWcWOListAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getWcWOList);

    
    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getWcDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.getWcDetailsAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getWcDetails);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getWcSummary', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.getWcSummaryAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getWcSummary);

    
    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/closeWorkOrder', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.closeWorkOrderAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.closeWorkOrder);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/closeAllWo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.closeAllWoAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.closeAllWo);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getWcIssueSummary', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.getWcIssueSummaryAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getWcIssueSummary);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getRtsUomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.getRtsUomListAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getRtsUomList);
    
    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getRtsLocationList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getRtsLocationList);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/rtsQty', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.rtsQtyAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.rtsQty);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getWcBookingSummary', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.getWcBookingSummaryAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getWcBookingSummary);

    
    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/addVarianceGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.addVarianceGroupAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.addVarianceGroup);

        
    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getVarianceGroupList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getVarianceGroupList);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/deleteVarianceGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.deleteVarianceGroupAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.deleteVarianceGroup);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getVarGroupDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.getVarGroupDetailsAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getVarGroupDetails);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/updateVarianceGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.updateVarianceGroupAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.updateVarianceGroup);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getSubReasonCodeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.getSubReasonCodeListAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getSubReasonCodeList);

    
    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getRtsReasonCodeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getRtsReasonCodeList);

    
    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getItemSecUomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.getItemSecUomListAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getItemSecUomList);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/checkPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.checkPalletAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.checkPallet);
    
    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getWoClosingValidations', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getWoClosingValidations);


    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/confirmPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.confirmPalletAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.confirmPallet);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/updateBookedPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.updateBookedPalletAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.updateBookedPallet);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/deleteBookedPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.deleteBookedPalletAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.deleteBookedPallet);

    
    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getNewPallteNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getNewPallteNumber);

     
    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/addNewBookingPallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.addNewBookingPalletAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.addNewBookingPallet);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/getWcTimesheetSumary', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.getWcTimesheetSumaryAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.getWcTimesheetSumary);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/addTsSummary', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.addTsSummaryAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.addTsSummary);

    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/updateWcTsSummary', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.updateWcTsSummaryAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.updateWcTsSummary);
    // new api  
    Evolve.Router.post('/api/v1/smartFactory/timeSheetWoClosing/issuePallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.SmartFactory.timeSheetWoClosing.timeSheetMid.issuePalletAuth,Evolve.App.Controllers.SmartFactory.timeSheetWoClosing.ConTimeSheetIndex.issuePallet);
    
    // Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/updateBookedPallet", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.updateBookedPallet);

    // Evolve.Router.post("/api/v1/smartFactory/ProductionBooking/v1/getTsShiftList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.SmartFactory.ProductionBooking.ConV1.getTsShiftList);


    /** End  : Timesheet Woclosing  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Timesheet Woclosing Router :", error)
}
module.exports = Evolve.Router