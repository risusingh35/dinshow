'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :   Machine To User API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/businessGroup/getAllBusinessGroupList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.BusinessGroup.ConList.getAllBusinessGroupList);

    Evolve.Router.post('/api/v1/evolve/businessGroup/getTaxZoneList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.BusinessGroup.ConList.getTaxZoneList);

    Evolve.Router.post('/api/v1/evolve/businessGroup/getTaxClassList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.BusinessGroup.ConList.getTaxClassList);

    Evolve.Router.post('/api/v1/evolve/businessGroup/getSinglebusinessGroupDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.BusinessGroup.ConList.getSinglebusinessGroupDetails);

    Evolve.Router.post('/api/v1/evolve/businessGroup/createbusinessGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.BusinessGroup.ConList.createbusinessGroup);

    Evolve.Router.post('/api/v1/evolve/businessGroup/updatebusinessGroup', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.BusinessGroup.ConList.updatebusinessGroup);


    /** End  : Machine To User  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Machine To User Router :", error)
}
module.exports = Evolve.Router