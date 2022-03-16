const Evolve = require('../../Boot/Evolve');

try {

	// Purchase Order API

	Evolve.Router.get('/api/v1/wms/getAllPoList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.getAllPoList);


	Evolve.Router.get('/api/v1/wms/getPo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.getPo);

	Evolve.Router.get('/api/v1/wms/getUomList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.getUomList);

	Evolve.Router.post('/api/v1/wms/checkUomConv', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.WmsApiValidator.checkUomConvAuth, Evolve.App.Controllers.Wms.wmsControllers.checkUomConv);

	Evolve.Router.post('/api/v1/wms/getPoDetailsByPoId', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.WmsApiValidator.getPoDetailsByPoIdAuth, Evolve.App.Controllers.Wms.wmsControllers.getPoDetailsByPoId);

	Evolve.Router.post('/api/v1/wms/getPoDetailsByLineNumberAndPoId', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.WmsApiValidator.getPoDetailsByLineNumberAndPoIdAuth, Evolve.App.Controllers.Wms.wmsControllers.getPoDetailsByLineNumberAndPoId);

	Evolve.Router.post('/api/v1/wms/receivePurchaseOrder', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
		Evolve.App.Middlewares.WmsApiValidator.receivePurchaseOrderAuth, Evolve.App.Controllers.Wms.wmsControllers.revicePurchaseOrder);

	Evolve.Router.get('/api/v1/wms/getLocationList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
		Evolve.App.Controllers.Wms.wmsControllers.getLocationList);

	Evolve.Router.post('/api/v1/wms/updateBarcodePrint', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.updateBarcodePrint);



	// // Move Pallet API

	Evolve.Router.get('/api/v1/wms/getInventoryItemNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.getInventoryItemNumber);

	Evolve.Router.post('/api/v1/wms/getPalletList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.getPalletList);

	Evolve.Router.get('/api/v1/wms/getReasonList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.getReasonList);

	// Evolve.Router.post('/api/v1/wms/movePallet', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.movePallet); // Evolve.App.Middlewares.WmsApiValidator.movePalletAuth

	Evolve.Router.post('/api/v1/wms/getToLocationList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.getToLocationList);


	// Inventory Adjustment

	Evolve.Router.post('/api/v1/wms/getIssueList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.getIssueList);

	Evolve.Router.post('/api/v1/wms/addIssue', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.addIssue);

	// Production Booking

	Evolve.Router.get('/api/v1/wms/getProductionOrdersItemNumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.getProductionOrdersItemNumber);

	// Evolve.Router.post('/api/v1/wms/csvPlanUpload',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Wms.wmsControllers.csvPlanUpload);

	// Evolve.Router.get('/api/v1/wms/getProductionPlanList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Wms.wmsControllers.getProductionPlanList);



	// Evolve.Router.post('/api/v1/wms/publishPlan',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Wms.wmsControllers.publishPlan);


	//SUB CONTRACTOR ISSUE

	// Evolve.Router.post('/api/v1/wms/getPalletListExternal',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.WmsApiValidator.getPalletListExternalAuth,Evolve.App.Controllers.Wms.wmsControllers.getPalletListExternal);

	Evolve.Router.get('/api/v1/wms/getItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.getItem);


	Evolve.Router.post('/api/v1/wms/getPalletListExternal', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.getPalletListExternal);

	Evolve.Router.post('/api/v1/wms/subContractorIssue', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.subContractorIssue);

	Evolve.Router.post('/api/v1/wms/getExternalLocationList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.getExternalLocationList);

	Evolve.Router.post('/api/v1/wms/checkItemTrackable', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.checkItemTrackable);

	// HISTORY REPORT

	Evolve.Router.post('/api/v1/wms/getHistoryReportToday', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.WmsApiValidator.getHistoryReportToday, Evolve.App.Controllers.Wms.wmsControllers.getHistoryReportToday);

	Evolve.Router.post('/api/v1/wms/getHistoryReportFilterd', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.getHistoryReportFilterd);


	// Menu Link

	Evolve.Router.get('/api/v1/wms/wmsSidebarMenuList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.wmsSidebarMenuList);


	// Inventory Report

	Evolve.Router.post('/api/v1/wms/getInventoryReport', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.WmsApiValidator.getInventoryReport, Evolve.App.Controllers.Wms.wmsControllers.getInventoryReport);


	// Print


	Evolve.Router.post('/api/v1/wms/printBarcode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.printBarcode);


	Evolve.Router.post('/api/v1/wms/getPrintJobList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.getPrintJobList);

	// Sub Contractor Report

	Evolve.Router.post('/api/v1/wms/subContractorReport', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.WmsApiValidator.subContractorReport, Evolve.App.Controllers.Wms.wmsControllers.subContractorReport);

	// get Exit

	// Evolve.Router.get('/api/v1/wms/getallInvoice', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.getallInvoice);

	// Evolve.Router.post('/api/v1/wms/getallInvoiceDo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.WmsApiValidator.getallInvoiceDo, Evolve.App.Controllers.Wms.wmsControllers.getallInvoiceDo);

	// Evolve.Router.post('/api/v1/wms/getDoSoInvoice', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.WmsApiValidator.getDoSoInvoice, Evolve.App.Controllers.Wms.wmsControllers.getDoSoInvoice);

	Evolve.Router.post('/api/v1/wms/getSingleDo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.WmsApiValidator.getSingleDo, Evolve.App.Controllers.Wms.wmsControllers.getSingleDo);

	// Evolve.Router.post('/api/v1/wms/getExitTableDate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.wmsControllers.getExitTableDate);

	// Evolve.Router.post('/api/v1/wms/addGetExit', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.WmsApiValidator.addGetExit, Evolve.App.Controllers.Wms.wmsControllers.addGetExit);

} catch (error) {
	console.log("Error in Evolve Wms Router :", error)
}

module.exports = Evolve.Router