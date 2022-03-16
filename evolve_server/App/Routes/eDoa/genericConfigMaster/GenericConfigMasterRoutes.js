const Evolve = require('../../../../Boot/Evolve');
try {


Evolve.Router.post('/api/v1/eDoa/genericConfigMaster/getGenericConfigMasterList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.genericConfigMaster.ConList.getGenericConfigMasterList);

Evolve.Router.post('/api/v1/eDoa/genericConfigMaster/onUploadGenericConfigMasterFile', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.genericConfigMaster.ConList.onUploadGenericConfigMasterFile);

Evolve.Router.post('/api/v1/eDoa/genericConfigMaster/addGenericCode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.genericConfigMaster.ConList.addGenericConfig);

Evolve.Router.post('/api/v1/eDoa/genericConfigMaster/updateGenericCode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.genericConfigMaster.ConList.updateGenericConfig);

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Generic Config Master Router :", error)
}
module.exports = Evolve.Router