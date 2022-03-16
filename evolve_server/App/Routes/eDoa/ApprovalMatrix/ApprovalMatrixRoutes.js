'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */
    // List  Apis
    Evolve.Router.post('/api/v1/eDoa/approvalMatrix/getApprovalMatrixList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.ApprovalMatrix.ConList.getApprovalMatrixList);

    Evolve.Router.post('/api/v1/eDoa/approvalMatrix/addApprovalMatrix', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization ,Evolve.App.Middlewares.eDoa.ApprovalMatrix.ApprovalMatrixMid.addApprovalMatrixAuth, Evolve.App.Controllers.eDoa.ApprovalMatrix.ConList.addApprovalMatrix);

    Evolve.Router.post('/api/v1/eDoa/approvalMatrix/getSingleMatrixDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.eDoa.ApprovalMatrix.ApprovalMatrixMid.getSingleMatrixDetailsAuth, Evolve.App.Controllers.eDoa.ApprovalMatrix.ConList.getSingleMatrixDetails);

    Evolve.Router.post('/api/v1/eDoa/approvalMatrix/updateApprovalMatrixDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.eDoa.ApprovalMatrix.ApprovalMatrixMid.updateApprovalMatrixDetailsAuth, Evolve.App.Controllers.eDoa.ApprovalMatrix.ConList.updateApprovalMatrixDetails);

    // // Options Apis

    Evolve.Router.post('/api/v1/eDoa/options/approvalMatrix/getMatrixDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization , Evolve.App.Middlewares.eDoa.ApprovalMatrix.ApprovalMatrixMid.getMatrixDetailsAuth, Evolve.App.Controllers.eDoa.ApprovalMatrix.ConOption.getMatrixDetails);

    Evolve.Router.post('/api/v1/eDoa/options/approvalMatrix/getTableColumnList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization ,Evolve.App.Middlewares.eDoa.ApprovalMatrix.ApprovalMatrixMid.getTableColumnListAuth, Evolve.App.Controllers.eDoa.ApprovalMatrix.ConOption.getTableColumnList);
    
    Evolve.Router.post('/api/v1/eDoa/options/approvalMatrix/saveMatrixDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization , Evolve.App.Middlewares.eDoa.ApprovalMatrix.ApprovalMatrixMid.saveMatrixDetailsAuth, Evolve.App.Controllers.eDoa.ApprovalMatrix.ConOption.saveMatrixDetails);

    Evolve.Router.post('/api/v1/eDoa/options/approvalMatrix/getMatrixDetailsList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization ,Evolve.App.Middlewares.eDoa.ApprovalMatrix.ApprovalMatrixMid.getMatrixDetailsListAuth, Evolve.App.Controllers.eDoa.ApprovalMatrix.ConOption.getMatrixDetailsList);

    Evolve.Router.post('/api/v1/eDoa/options/approvalMatrix/getMatrixIndexList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization ,Evolve.App.Middlewares.eDoa.ApprovalMatrix.ApprovalMatrixMid.getMatrixIndexListAuth,  Evolve.App.Controllers.eDoa.ApprovalMatrix.ConOption.getMatrixIndexList);

    //Apis For Sequence greter than 1

    Evolve.Router.post('/api/v1/eDoa/options/approvalMatrix/getSectionList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization , Evolve.App.Controllers.eDoa.ApprovalMatrix.ConOption.getSectionList);
    
    Evolve.Router.post('/api/v1/eDoa/options/approvalMatrix/getRoleList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization , Evolve.App.Controllers.eDoa.ApprovalMatrix.ConOption.getRoleList);

    Evolve.Router.post('/api/v1/eDoa/options/approvalMatrix/getUserList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization , Evolve.App.Controllers.eDoa.ApprovalMatrix.ConOption.getUserList);

    
    Evolve.Router.post('/api/v1/eDoa/options/approvalMatrix/getHighSequenceMAtDetailList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization ,Evolve.App.Middlewares.eDoa.ApprovalMatrix.ApprovalMatrixMid.getHighSequenceMAtDetailListAuth,  Evolve.App.Controllers.eDoa.ApprovalMatrix.ConOption.getHighSequenceMAtDetailList);





    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Status Code Master Router :", error)
}
module.exports = Evolve.Router