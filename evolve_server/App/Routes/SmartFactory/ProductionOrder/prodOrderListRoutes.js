'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title : So Pick List API List
     *  Desc  :    
     */


        Evolve.Router.post("/api/v1/smartFactory/ProductionOrder/getSoTableData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionOrder.ConList.getAllProdOrderList);

        Evolve.Router.post("/api/v1/smartFactory/ProductionOrder/updateProdOrderStatus", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionOrder.ConList.updateProdOrderStatus);

        Evolve.Router.post("/api/v1/smartFactory/ProductionOrder/getWoDetails", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionOrder.ConList.getWoDetails);

        Evolve.Router.post("/api/v1/smartFactory/ProductionOrder/updateWoStatus", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionOrder.ConList.updateWoStatus);

        Evolve.Router.post("/api/v1/smartFactory/ProductionOrder/getSalesOrderData", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionOrder.ConList.getSalesOrderData);

        Evolve.Router.get("/api/v1/smartFactory/ProductionOrder/getMachineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionOrder.ConList.getMachineList);

        Evolve.Router.get("/api/v1/smartFactory/ProductionOrder/getToolList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionOrder.ConList.getToolList);

        Evolve.Router.get("/api/v1/smartFactory/ProductionOrder/getCoreList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionOrder.ConList.getCoreList);

        Evolve.Router.get("/api/v1/smartFactory/ProductionOrder/getLdpList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionOrder.ConList.getLdpList);

        Evolve.Router.get("/api/v1/smartFactory/ProductionOrder/getPaperList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionOrder.ConList.getPaperList);

        Evolve.Router.post("/api/v1/smartFactory/ProductionOrder/updateProOrder", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.SmartFactory.ProductionOrder.ConList.updateProOrder);

        


        /** End  : SO Pick List  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in SmartFactory SO Pick List Router :", error)
}


module.exports = Evolve.Router