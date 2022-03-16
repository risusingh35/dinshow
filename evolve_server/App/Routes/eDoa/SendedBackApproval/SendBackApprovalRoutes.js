'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */
    // // List  Apis
    // Evolve.Router.post('/api/v1/eDoa/approval/getApprovalList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.eDoa.SendedBackApproval.MyApprovalMid.getApprovalListAuth , Evolve.App.Controllers.eDoa.SendedBackApproval.ConList.getApprovalList);

    Evolve.Router.post('/api/v1/eDoa/sendedBack/getApprovalList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SendedBackApproval.ConList.getApprovalList);
    
    Evolve.Router.post('/api/v1/eDoa/sendedBack/addApprovalProcessDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SendedBackApproval.ConList.addApprovalProcessDetails);

    // Approval Options Api


    Evolve.Router.post('/api/v1/eDoa/sendedBack/getApprovalProcessHistory', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SendedBackApproval.ConOptions.getApprovalProcessHistory);

    Evolve.Router.post('/api/v1/eDoa/sendedBack/getApprovalDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.SendedBackApproval.ConOptions.getApprovalDetails);



    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Status Code Master Router :", error)
}
module.exports = Evolve.Router