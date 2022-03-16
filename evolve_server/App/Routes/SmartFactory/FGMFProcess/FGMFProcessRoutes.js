'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  PDIMFProcess API List
     *  Desc  :    
     */

    // PDIMFProcess List Api

    Evolve.Router.post('/api/v1/smartFactory/FGMFProcess/getProdOrderDetailsList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.FGMFProcess.ConList.getProdOrderDetailsList);
    
    Evolve.Router.post('/api/v1/smartFactory/FGMFProcess/getBarcodeData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.FGMFProcess.ConList.getBarcodeData);

    Evolve.Router.post('/api/v1/smartFactory/FGMFProcess/MoveBarcode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.FGMFProcess.ConList.MoveBarcode);

    Evolve.Router.post('/api/v1/smartFactory/FGMFProcess/DeleteBarcode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.SmartFactory.FGMFProcess.ConList.DeleteBarcode);


    /** End  : PDIMFProcess */

 
} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Item Router :", error)
}

module.exports = Evolve.Router