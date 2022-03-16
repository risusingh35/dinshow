'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  Assets Bed Size API List
    *  Desc  :     
    */
  Evolve.Router.post('/api/v1/eAssets/bedSize/addSizes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.eAssets.BedSize.MidBedSize.addSizes, Evolve.App.Controllers.eAssets.BedSize.ConList.addSizes);

  Evolve.Router.post('/api/v1/eAssets/bedSize/getSizes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.eAssets.BedSize.MidBedSize.getSizes, Evolve.App.Controllers.eAssets.BedSize.ConList.getSizes);

  Evolve.Router.post('/api/v1/eAssets/bedSize/getSingleSizes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.BedSize.ConList.getSingleSizes);

  Evolve.Router.post('/api/v1/eAssets/bedSize/editSizes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.eAssets.BedSize.MidBedSize.editSizes, Evolve.App.Controllers.eAssets.BedSize.ConList.editSizes);

  Evolve.Router.post('/api/v1/eAssets/bedSize/deleteSizes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.BedSize.ConList.deleteSizes);


  /** End  : Assets Bed Size  */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Assets Bed Size Router :", error)
}


module.exports = Evolve.Router