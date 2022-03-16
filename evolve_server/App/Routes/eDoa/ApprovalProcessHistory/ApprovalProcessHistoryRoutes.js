'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */
    // List  Apis
    Evolve.Router.post('/api/v1/eDoa/approvalProcessHistory/getApprovalHistoryList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.ApprovalProcessHistory.ConList.getApprovalList);

    
    Evolve.Router.post('/api/v1/eDoa/approvalProcessHistory/getApprovalProcessHistory', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.ApprovalProcessHistory.ConOptions.getApprovalProcessHistory);

    Evolve.Router.post('/api/v1/eDoa/approvalProcessHistory/getApprovalDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.ApprovalProcessHistory.ConOptions.getApprovalDetails);


    Evolve.Router.post('/api/v1/eDoa/approvalProcessHistory/getApprovalProcessDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.ApprovalProcessHistory.ConOptions.getApprovalProcessDetails);


    Evolve.Router.post('/api/v1/eDoa/approvalProcessHistory/getSQAPHistoryDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.ApprovalProcessHistory.ConOptions.getSQAPHistoryDetails);


    
   

    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Status Code Master Router :", error)
}
module.exports = Evolve.Router