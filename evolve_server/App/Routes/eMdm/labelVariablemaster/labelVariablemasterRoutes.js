'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Address API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/eMdm/labelVariablemaster/getStickerVarList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.labelVariablemaster.ConList.getStickerVarList);
    
    Evolve.Router.post('/api/v1/eMdm/labelVariablemaster/getSticker', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.labelVariablemaster.ConList.getSticker);

    Evolve.Router.post('/api/v1/eMdm/labelVariablemaster/getUnit', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.labelVariablemaster.ConList.getUnit);

    Evolve.Router.post('/api/v1/eMdm/labelVariablemaster/careatStickerVar', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.labelVariablemaster.ConList.careatStickerVar);

    Evolve.Router.post('/api/v1/eMdm/labelVariablemaster/updateStickerVar', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.labelVariablemaster.ConList.updateStickerVar);

    Evolve.Router.post('/api/v1/eMdm/labelVariablemaster/getSinglestickerVarDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eMdm.labelVariablemaster.ConList.getSinglestickerVarDetails);
    
    
    /** End  :Address  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in App Master Router :", error)
}
module.exports = Evolve.Router