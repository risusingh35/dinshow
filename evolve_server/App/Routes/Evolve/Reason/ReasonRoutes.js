'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Reason API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/reason/getAllReasonList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Middlewares.Evolve.Reason.ReasonMid.getAllReasonListAuth,
     Evolve.App.Controllers.Evolve.Reason.ConList.getAllReasonList);

    Evolve.Router.post('/api/v1/evolve/reason/createReason', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Reason.ReasonMid.createReasonAuth, Evolve.App.Controllers.Evolve.Reason.ConList.createReason);

    Evolve.Router.post('/api/v1/evolve/reason/selectSingleReason', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Reason.ReasonMid.selectSingleReasonAuth, Evolve.App.Controllers.Evolve.Reason.ConList.selectSingleReason);

    Evolve.Router.post('/api/v1/evolve/reason/updateReason', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Reason.ReasonMid.updateReasonAuth, Evolve.App.Controllers.Evolve.Reason.ConList.updateReason);
    
    Evolve.Router.post('/api/v1/evolve/reason/changeReasonStatus', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Reason.ReasonMid.changeReasonStatusAuth, Evolve.App.Controllers.Evolve.Reason.ConList.changeReasonStatus);

    Evolve.Router.get('/api/v1/evolve/reason/reasonCodeList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Evolve.Reason.ConList.reasonCodeList);
    /** End  : Reason  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Role Router :", error)
}

module.exports = Evolve.Router