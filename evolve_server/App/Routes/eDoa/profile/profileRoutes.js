const Evolve = require('../../../../Boot/Evolve');
try {


Evolve.Router.post('/api/v1/eDoa/profile/getProfileList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.profile.ConList.getProfileList);

Evolve.Router.post('/api/v1/eDoa/profile/uploadProfileList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.profile.ConList.uploadProfileList);

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Credit Terms Router :", error)
}
module.exports = Evolve.Router