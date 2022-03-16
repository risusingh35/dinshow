'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  DS Token API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/DSToken/getDSTokenList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DSToken.MidDSToken.getDSTokenList, Evolve.App.Controllers.Evolve.DSToken.ConList.getDSTokenList);

    Evolve.Router.post('/api/v1/evolve/DSToken/addDSToken', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DSToken.MidDSToken.addDSToken, Evolve.App.Controllers.Evolve.DSToken.ConList.addDSToken);

    Evolve.Router.post('/api/v1/evolve/DSToken/updateDSToken', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DSToken.MidDSToken.updateDSToken, Evolve.App.Controllers.Evolve.DSToken.ConList.updateDSToken);
    
    Evolve.Router.post('/api/v1/evolve/DSToken/getSingleDSToken', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.DSToken.MidDSToken.getSingleDSToken, Evolve.App.Controllers.Evolve.DSToken.ConList.getSingleDSToken);
    
    Evolve.Router.get('/api/v1/evolve/DSToken/getUserList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Evolve.DSToken.ConList.getUserList);

   

    /** End  :DS Token  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve DS Token Master Router :", error)
}
module.exports = Evolve.Router