'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Evolve Suraksha Approval Master
     *  Desc  :    
     */
    Evolve.Router.get('/api/v1/suraksha/approval/getRoleList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Suraksha.Approval.ConList.getRoleList);

    Evolve.Router.post('/api/v1/suraksha/approval/getUserList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Suraksha.Approval.MidApproval.getUserListAuth, Evolve.App.Controllers.Suraksha.Approval.ConList.getUserList);

    Evolve.Router.post('/api/v1/suraksha/approval/addMatrix', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Suraksha.Approval.MidApproval.addMatrixAuth, Evolve.App.Controllers.Suraksha.Approval.ConList.addMatrix);

    Evolve.Router.post('/api/v1/suraksha/approval/getMatrixList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Suraksha.Approval.MidApproval.getMatrixListAuth,  Evolve.App.Controllers.Suraksha.Approval.ConList.getMatrixList);

    
    Evolve.Router.post('/api/v1/suraksha/approval/getSingleMatrixDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Suraksha.Approval.MidApproval.getSingleMatrixDetailsAuth,  Evolve.App.Controllers.Suraksha.Approval.ConList.getSingleMatrixDetails);

    
    Evolve.Router.post('/api/v1/suraksha/approval/updateMatrixDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Suraksha.Approval.MidApproval.updateMatrixDetailsAuth, Evolve.App.Controllers.Suraksha.Approval.ConList.updateMatrixDetails);

    Evolve.Router.post('/api/v1/suraksha/approval/deleteMatrixDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Suraksha.Approval.MidApproval.deleteMatrixDetailsAuth, Evolve.App.Controllers.Suraksha.Approval.ConList.deleteMatrixDetails);



    /** End  : gsp Api  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Suraksha Approval Router :", error)
}


module.exports = Evolve.Router