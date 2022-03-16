'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Sub Item List Master  API List
     *  Desc  :    
     */

    

    Evolve.Router.get('/api/v1/evolve/SubReason/getReasonParentList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.SubReason.MidSubReasonList.getSubReasonFinalListAuth
    ,Evolve.App.Controllers.Evolve.SubReason.ConSubReasonList.getReasonParentList);

    Evolve.Router.post('/api/v1/evolve/SubReason/getReasonTypeChildList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Controllers.Evolve.SubReason.ConSubReasonList.getReasonTypeChildList);

    Evolve.Router.post('/api/v1/evolve/SubReason/insertSubReason', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.SubReason.MidSubReasonList.insertSubReasonAuth,Evolve.App.Controllers.Evolve.SubReason.ConSubReasonList.insertSubReason);
    Evolve.Router.post('/api/v1/evolve/SubReason/getSubReasonFinalList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Evolve.SubReason.ConSubReasonList.getSubReasonFinalList);
    Evolve.Router.post('/api/v1/evolve/SubReason/updateSubReasons',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Evolve.SubReason.ConSubReasonList.updateSubReasons);
    Evolve.Router.post('/api/v1/evolve/SubReason/selectSingleSubReason',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Evolve.SubReason.ConSubReasonList.selectSingleSubReason);
    Evolve.Router.post('/api/v1/evolve/SubReason/delete_SubReason',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    Evolve.App.Controllers.Evolve.SubReason.ConSubReasonList.delete_SubReason);
    


    //     Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization

//    /insertSubReason
     /** End  :  Sub Item List Master   */
    
} catch (error) {
    Evolve.Log.error(error.message);
    console.log(" Error in Evolve  Sub Reason Master Router :", error)
}


module.exports = Evolve.Router

