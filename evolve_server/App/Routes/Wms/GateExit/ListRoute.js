'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  GateExit API List
     *  Desc  :    
     */
	Evolve.Router.get('/api/v1/wms/gateExit/getallInvoice', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.GateExit.ConList.getallInvoice);

	Evolve.Router.post('/api/v1/wms/gateExit/getallInvoiceDo', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.GateExit.MidList.getallInvoiceDo, Evolve.App.Controllers.Wms.GateExit.ConList.getallInvoiceDo);

	Evolve.Router.post('/api/v1/wms/gateExit/getDoSoInvoice', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.GateExit.MidList.getDoSoInvoice, Evolve.App.Controllers.Wms.GateExit.ConList.getDoSoInvoice);

	Evolve.Router.post('/api/v1/wms/gateExit/getExitTableDate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.GateExit.ConList.getExitTableDate);

	Evolve.Router.post('/api/v1/wms/gateExit/addGetExit', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.GateExit.MidList.addGetExit, Evolve.App.Controllers.Wms.GateExit.ConList.addGetExit);
	/** End  : GateExit  */

	// gste Exit cooper

	Evolve.Router.get('/api/v1/wms/gateExit/cooper/getDocumentTypeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.GateExit.ConCooper.getDocumentTypeList);
	
	Evolve.Router.get('/api/v1/wms/gateExit/cooper/getSupplierList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.GateExit.ConCooper.getSupplierList);

	Evolve.Router.get('/api/v1/wms/gateExit/cooper/getGateTransactionList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.GateExit.ConCooper.getGateTransactionList);

	Evolve.Router.post('/api/v1/wms/gateExit/cooper/addGateEntry', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.GateExit.ConCooper.addGateEntry);

	Evolve.Router.post('/api/v1/wms/gateExit/cooper/getSingleEnteryData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Wms.GateExit.ConCooper.getSingleEnteryData);





	// gate exit cooper end 

} catch (error) {
	Evolve.Log.error(error.message);
	console.log("Error in Evolve Dashboard Router :", error)
}


module.exports = Evolve.Router