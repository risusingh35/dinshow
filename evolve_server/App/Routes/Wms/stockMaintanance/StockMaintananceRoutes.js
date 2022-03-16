'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  stock maintanance routes API List
     *  Desc  :    
     */

    // stock maintanance  Api

    Evolve.Router.post('/api/v1/wms/stockMaintanance/getStockList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Wms.stockMaintanance.StockMaintananceMid.getStockListAuth,Evolve.App.Controllers.Wms.stockMaintanance.ConList.getStockList);

    Evolve.Router.post('/api/v1/wms/stockMaintanance/uploadStock', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.stockMaintanance.ConList.uploadStock);

    //history routes

    Evolve.Router.post('/api/v1/wms/stockMaintananceHist/getStockList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Middlewares.Wms.stockMaintanance.StockMaintananceMid.getStockListHistAuth,Evolve.App.Controllers.Wms.stockMaintanance.ConHistory.getStockList);
    // Evolve.Router.post('/api/v1/wms/stockMaintananceHist/getStockList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.stockMaintanance.ConHistory.getStockList);


    
    // Evolve.Router.post('/api/v1/wms/stockMaintananceHist/getUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.stockMaintanance.ConHistory.getUnitList);

        
    // Evolve.Router.post('/api/v1/wms/stockMaintananceHist/getItemSearch', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.stockMaintanance.ConHistory.getItemSearch);


    Evolve.Router.post('/api/v1/wms/stockMaintanance/getInvDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.stockMaintanance.StockMaintananceMid.getInvDetailsAuth, Evolve.App.Controllers.Wms.stockMaintanance.ConList.getInvDetails);

    Evolve.Router.post('/api/v1/wms/stockMaintanance/updateInvQty', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.stockMaintanance.StockMaintananceMid.updateInvQtyAuth, Evolve.App.Controllers.Wms.stockMaintanance.ConList.updateInvQty);

    Evolve.Router.post('/api/v1/wms/stockMaintanance/addOrUpdateStock', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.stockMaintanance.StockMaintananceMid.addOrUpdateStockAuth, Evolve.App.Controllers.Wms.stockMaintanance.ConList.addOrUpdateStock);


    Evolve.Router.post('/api/v1/wms/stockMaintananceHist/getWareHouseNameList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.stockMaintanance.ConHistory.getWareHouseNameList);

    Evolve.Router.post('/api/v1/wms/stockMaintananceHist/getUploadedDateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.stockMaintanance.ConHistory.getUploadedDateList);

    Evolve.Router.post('/api/v1/wms/stockMaintananceHist/getStockDetailList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Wms.stockMaintanance.ConHistory.getStockDetailList);

    
    Evolve.Router.post('/api/v1/wms/stockMaintananceHist/getStockDetaisByDate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.stockMaintanance.StockMaintananceMid.getStockDetaisByDateAuth,Evolve.App.Controllers.Wms.stockMaintanance.ConHistory.getStockDetaisByDate);

        
    Evolve.Router.post('/api/v1/wms/stockMaintananceHist/getLastDatearomWHName', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Wms.stockMaintanance.StockMaintananceMid.getLastDatearomWHNameAuth,Evolve.App.Controllers.Wms.stockMaintanance.ConHistory.getLastDatearomWHName);
    









    /** End  : stock maintanance routes  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in ewms-stock maintanance Router :", error)
}

module.exports = Evolve.Router