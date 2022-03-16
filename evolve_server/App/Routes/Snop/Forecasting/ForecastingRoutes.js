'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Forecasting API List
     *  Desc  :    
     */

    // forecast Actual 

    Evolve.Router.post('/api/v1/Snop/Forecasting/getAllForecastvsActual', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Forecasting.ConForecastActual.getAllForecastvsActual);


    // forecast Branch
    Evolve.Router.post('/api/v1/Snop/Forecast/branch/getForecastList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Forecasting.ConBranch.getForecastList);

    Evolve.Router.post('/api/v1/Snop/Forecast/branch/getForecastListFilter', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Forecasting.ConBranch.getForecastListFilter);

    Evolve.Router.post('/api/v1/Snop/Forecast/branch/saveForecastList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Forecasting.ConBranch.saveForecastList);


    Evolve.Router.post('/api/v1/Snop/Forecast/branch/updateForecastList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Forecasting.ConBranch.updateForecastList);


    Evolve.Router.post('/api/v1/Snop/Forecast/branch/closeForecastList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Forecasting.ConBranch.closeForecastList);

    Evolve.Router.post('/api/v1/Snop/Forecast/slotManagement/checkSlotStatus', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Forecasting.ConSlotManagement.checkSlotStatus);


    Evolve.Router.post('/api/v1/Snop/Forecast/slotManagement/openSlotStatus', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Forecasting.ConSlotManagement.openSlotStatus);


    Evolve.Router.post('/api/v1/Snop/Forecast/slotManagement/freezeSlotStatus', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Forecasting.ConSlotManagement.freezeSlotStatus);

    Evolve.Router.post('/api/v1/Snop/Forecast/slotManagement/closeForecast', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Forecasting.ConSlotManagement.closeForecast);


    Evolve.Router.post('/api/v1/Snop/Forecast/branch/getUserBranchData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Forecasting.ConBranch.getUserBranchData);

    /** End  : Forecasting  */

        /** Start  : Old Forecasting */

        Evolve.Router.post('/api/v1/Snop/Forecast/branch/getOldForecastList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Forecasting.ConBranch.getOldForecastList);

        Evolve.Router.post('/api/v1/Snop/Forecast/slotManagement/openOldSlotStatus', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Forecasting.ConSlotManagement.openOldSlotStatus);
    
        Evolve.Router.post('/api/v1/Snop/Forecast/slotManagement/closeOldSlotStatus', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Forecasting.ConSlotManagement.closeOldSlotStatus);
    
        /** End  : Old Forecasting */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Forecasting Router :", error)
}


module.exports = Evolve.Router