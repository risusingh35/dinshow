'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
      *  Title :  Assets Bed Type API List
      *  Desc  :     
      */

    Evolve.Router.post('/api/v1/eAssets/bedType/addTypes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.eAssets.BedType.MidBedType.addTypes, Evolve.App.Controllers.eAssets.BedType.ConList.addTypes);

    Evolve.Router.post('/api/v1/eAssets/bedType/getTypes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.eAssets.BedType.MidBedType.getTypes,Evolve.App.Controllers.eAssets.BedType.ConList.getTypes);

    Evolve.Router.post('/api/v1/eAssets/bedType/getSingleTypes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.BedType.ConList.getSingleTypes);

    Evolve.Router.post('/api/v1/eAssets/bedType/editTypes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.eAssets.BedType.MidBedType.editTypes, Evolve.App.Controllers.eAssets.BedType.ConList.editTypes);

    Evolve.Router.post('/api/v1/eAssets/bedType/deleteTypes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.BedType.ConList.deleteTypes);


    /** End  : Assets Bed Type  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Assets Room Router :", error)
}


module.exports = Evolve.Router