'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
	/** 
	  *  Title :  Budgeting API List
	  *  Desc  :    
	  */


	Evolve.Router.post('/api/v1/Snop/Budgeting/xlsBudgeting', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Budgeting.ConList.xlsBudgeting);


	Evolve.Router.post('/api/v1/Snop/Budgeting/getAllBudget', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Budgeting.ConList.getAllBudget);

	Evolve.Router.post("/api/v1/Snop/Budgeting/freezeBudget", Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Snop.Budgeting.ConList.freezeBudget);

	/** End  : Budgeting  */

} catch (error) {
	Evolve.Log.error(error.message);
	console.log("Error in Evolve Budgeting Router :", error)
}


module.exports = Evolve.Router