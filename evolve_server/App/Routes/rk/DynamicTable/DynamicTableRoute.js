'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {

    Evolve.Router.get("/api/v1/Snop/Branch/getbusinessLineList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Branch.ConBranchList.getbusinessLineList);

    /** End  : budgeting  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Dynamic Table  Router :", error)
}


module.exports = Evolve.Router