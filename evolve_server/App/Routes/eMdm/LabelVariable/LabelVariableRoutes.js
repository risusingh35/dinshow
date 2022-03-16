'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Address API List
     *  Desc  :    
     */
    
    // Evolve.Router.get('/api/v1/eMdm/HarshMaster/GetStickerCode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.HarshMaster.ConList.GetStickerCode);

    // Evolve.Router.post('/api/v1/eMdm/HarshMaster/GetStickerDetail', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.HarshMaster.ConList.GetStickerDetail);

    // Evolve.Router.post('/api/v1/eMdm/HarshMaster/setStickerDetail', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.HarshMaster.ConList.setStickerDetail);
    
    /** End  :Address  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router