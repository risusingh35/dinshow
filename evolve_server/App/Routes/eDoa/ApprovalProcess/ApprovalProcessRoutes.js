'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */
    // List  Apis
    Evolve.Router.post('/api/v1/eDoa/approvalProcess/getApprovalList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.ApprovalProcess.ConList.getApprovalList);
    
    Evolve.Router.post('/api/v1/eDoa/approvalProcess/addApprovalProcessDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.ApprovalProcess.ConList.addApprovalProcessDetails);

        
    Evolve.Router.post('/api/v1/eDoa/approvalProcess/reProcessApprovalProcess', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.ApprovalProcess.ConList.reProcessApprovalProcess);

        
    Evolve.Router.post('/api/v1/eDoa/approvalProcess/getGateInDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.ApprovalProcess.ConList.getGateInDetails);


    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Status Code Master Router :", error)
}
module.exports = Evolve.Router