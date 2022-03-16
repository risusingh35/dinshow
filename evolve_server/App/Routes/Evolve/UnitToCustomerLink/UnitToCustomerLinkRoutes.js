'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Unit To Customer Link
     *  Desc  :    
     */

    Evolve.Router.get('/api/v1/evolve/unitToCustomerLink/getDocumentList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.UnitToCustomerLink.ConList.getDocumentList);

    Evolve.Router.get('/api/v1/evolve/unitToCustomerLink/getUnitList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.UnitToCustomerLink.ConList.getUnitList);

    Evolve.Router.get('/api/v1/evolve/unitToCustomerLink/getCustomerList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.UnitToCustomerLink.ConList.getCustomerList);

    Evolve.Router.post('/api/v1/evolve/unitToCustomerLink/addUnitToCustomerLink', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.UnitToCustomerLink.MidUnitToCustomerLink.addUnitToCustomerLink, Evolve.App.Controllers.Evolve.UnitToCustomerLink.ConList.addUnitToCustomerLink);

    Evolve.Router.post('/api/v1/evolve/unitToCustomerLink/getUnitToCustomerLinkList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.UnitToCustomerLink.MidUnitToCustomerLink.getUnitToCustomerLinkList, Evolve.App.Controllers.Evolve.UnitToCustomerLink.ConList.getUnitToCustomerLinkList);

    Evolve.Router.post('/api/v1/evolve/unitToCustomerLink/getSingleUnitToCustomerLink', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.UnitToCustomerLink.MidUnitToCustomerLink.getSingleUnitToCustomerLink, Evolve.App.Controllers.Evolve.UnitToCustomerLink.ConList.getSingleUnitToCustomerLink);

    Evolve.Router.post('/api/v1/evolve/unitToCustomerLink/updateUnitToCustomerLink', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.UnitToCustomerLink.MidUnitToCustomerLink.updateUnitToCustomerLink, Evolve.App.Controllers.Evolve.UnitToCustomerLink.ConList.updateUnitToCustomerLink);

    Evolve.Router.post('/api/v1/evolve/unitToCustomerLink/checkDuplicate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.UnitToCustomerLink.MidUnitToCustomerLink.checkDuplicate, Evolve.App.Controllers.Evolve.UnitToCustomerLink.ConList.checkDuplicate);


    /** End  : Unit To Customer Link  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Unit To Customer Link Router :", error)
}
module.exports = Evolve.Router