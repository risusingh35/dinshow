'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  Assets Beds API List
    *  Desc  :     
    */

  // Beds 

  Evolve.Router.post('/api/v1/eAssets/bed/addBeds', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.eAssets.Bed.MidBed.addBeds, Evolve.App.Controllers.eAssets.Bed.ConBed.addBeds);

  Evolve.Router.post('/api/v1/eAssets/bed/getBeds', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.eAssets.Bed.MidBed.getBeds, Evolve.App.Controllers.eAssets.Bed.ConBed.getBeds);

  Evolve.Router.get('/api/v1/eAssets/bed/getBedsList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.Bed.ConBed.getBedsList);

  Evolve.Router.post('/api/v1/eAssets/bed/getSingleBeds', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.Bed.ConBed.getSingleBeds);

  Evolve.Router.post('/api/v1/eAssets/bed/editBeds', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.eAssets.Bed.MidBed.editBeds, Evolve.App.Controllers.eAssets.Bed.ConBed.editBeds);

  Evolve.Router.post('/api/v1/eAssets/bed/deleteBeds', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.Bed.ConBed.deleteBeds);

  Evolve.Router.get('/api/v1/eAssets/bed/getallSizes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.Bed.ConBed.getallSizes);

  Evolve.Router.get('/api/v1/eAssets/bed/getallTypes', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.Bed.ConBed.getallTypes);

  // History

  Evolve.Router.post('/api/v1/eAssets/bed/getBedsHistory', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.eAssets.Bed.MidBed.getBedsHistory,Evolve.App.Controllers.eAssets.Bed.ConBed.getBedsHistory);

  Evolve.Router.get('/api/v1/eAssets/bed/getBedsHistorylist', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.Bed.ConBed.getBedsHistorylist);

  // Evolve.Router.post('/api/v1/eAssets/bed/addBedHistory',  Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eAssets.Bed.ConBed.addBedHistory);

  Evolve.Router.post('/api/v1/eAssets/bed/getSingleBedHistory', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.Bed.ConBed.getSingleBedHistory);

  Evolve.Router.get('/api/v1/eAssets/bed/getAllRoom', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.Bed.ConBed.getAllRoom);

  Evolve.Router.post('/api/v1/eAssets/bed/editBedHistory', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eAssets.Bed.ConBed.editBedHistory);


  // Today History For Mail

  Evolve.Router.get('/api/v1/eAssets/bed/todayHistory', Evolve.App.Controllers.eAssets.MqttController.ConMqttAssets.todayHistory);



  /** End  : Assets Beds  */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Assets Beds Router :", error)
}


module.exports = Evolve.Router