'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */
    // // List  Apis
    // Evolve.Router.post('/api/v1/eDoa/approval/getApprovalList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.eDoa.MyApproval.MyApprovalMid.getApprovalListAuth , Evolve.App.Controllers.eDoa.MyApproval.ConList.getApprovalList);

    Evolve.Router.post('/api/v1/eDoa/approval/getApprovalList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.MyApproval.ConList.getApprovalList);
    
    Evolve.Router.post('/api/v1/eDoa/approval/addApprovalProcessDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.MyApproval.ConList.addApprovalProcessDetails);

    // Approval Options Api


    Evolve.Router.post('/api/v1/eDoa/approval/getApprovalProcessHistory', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.MyApproval.ConOptions.getApprovalProcessHistory);

    Evolve.Router.post('/api/v1/eDoa/approval/getApprovalDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.MyApproval.ConOptions.getApprovalDetails);

    Evolve.Router.post('/api/v1/eDoa/approval/getApprovalProcessDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.MyApproval.ConOptions.getApprovalProcessDetails);

    // PRICE LIST DATA

    Evolve.Router.post('/api/v1/eDoa/approval/getPriceListData', Evolve.App.Controllers.eDoa.MyApproval.ConOptions.getPriceListData);

    Evolve.Router.post('/api/v1/eDoa/approval/getItemListByDesignGroup', Evolve.App.Controllers.eDoa.MyApproval.ConOptions.getItemListByDesignGroup);




    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Status Code Master Router :", error)
}
module.exports = Evolve.Router