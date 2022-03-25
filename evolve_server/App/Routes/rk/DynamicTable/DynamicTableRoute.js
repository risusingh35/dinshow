'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {

    // D:\RISU SINGH\aliter\dinshow\evolve_server\App\Controllers\rk\DynamicTable\conList.js
    Evolve.Router.get("/api/v1/rk/DynamicTable/getList", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.rk.DynamicTable.conList.getList);

    /** End  : budgeting  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Dynamic Table  Router :", error)
}


module.exports = Evolve.Router