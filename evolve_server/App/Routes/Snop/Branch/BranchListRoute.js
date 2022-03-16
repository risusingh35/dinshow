'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  budgeting API List
     *  Desc  :    
     */

    Evolve.Router.get("/api/v1/Snop/Branch/getbusinessLineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Branch.ConBranchList.getbusinessLineList);

    Evolve.Router.post("/api/v1/Snop/Branch/getBranchList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Branch.ConBranchList.getBranchList);

    Evolve.Router.post("/api/v1/Snop/Branch/addBranch", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Snop.Branch.MidBranchList.addBranchAuth, Evolve.App.Controllers.Snop.Branch.ConBranchList.addBranch);

    Evolve.Router.post("/api/v1/Snop/Branch/updateBranch", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Snop.Branch.MidBranchList.updateBranchAuth, Evolve.App.Controllers.Snop.Branch.ConBranchList.updateBranch);

    Evolve.Router.post("/api/v1/Snop/Branch/selectSingleBranch", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Snop.Branch.MidBranchList.selectSingleBranchAuth, Evolve.App.Controllers.Snop.Branch.ConBranchList.selectSingleBranch);

    Evolve.Router.post("/api/v1/Snop/Branch/deleteSingleBranch", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Branch.ConBranchList.deleteSingleBranch);

    Evolve.Router.post("/api/v1/Snop/Branch/assignLineToBranch", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Snop.Branch.MidBranchList.assignLineToBranchAuth, Evolve.App.Controllers.Snop.Branch.ConBranchList.assignLineToBranch);

    Evolve.Router.post("/api/v1/Snop/Branch/updateBusinessLineToBranch", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Snop.Branch.MidBranchList.updateBusinessLineToBranchAuth, Evolve.App.Controllers.Snop.Branch.ConBranchList.updateBusinessLineToBranch);





    /** End  : budgeting  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Snop Branch  Router :", error)
}


module.exports = Evolve.Router