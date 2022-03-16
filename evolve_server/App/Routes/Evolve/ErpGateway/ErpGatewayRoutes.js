'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Erp Gateway API List
     *  Desc  :    
     */

    Evolve.Router.get('/api/v1/evolve/ErpGateway/getAllErp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ErpGateway.ConList.getAllErp);

    Evolve.Router.post('/api/v1/evolve/ErpGateway/addErpGateWay', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ErpGateway.ErpGatewayMid.addErpGateWay, Evolve.App.Controllers.Evolve.ErpGateway.ConList.addErpGateWay);

    Evolve.Router.post('/api/v1/evolve/ErpGateway/getErpGatewayList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ErpGateway.ConList.getErpGatewayList);

    Evolve.Router.post('/api/v1/evolve/ErpGateway/getSingleErpGateWay', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ErpGateway.ErpGatewayMid.getSingleErpGateWay, Evolve.App.Controllers.Evolve.ErpGateway.ConList.getSingleErpGateWay);

    Evolve.Router.post('/api/v1/evolve/ErpGateway/updateErpGateWay', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ErpGateway.ErpGatewayMid.updateErpGateWay, Evolve.App.Controllers.Evolve.ErpGateway.ConList.updateErpGateWay);


    /** End  : Erp Gateway  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Erp Gateway Router :", error)
}
module.exports = Evolve.Router