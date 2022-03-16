const Evolve = require('../../../../Boot/Evolve');
try {


Evolve.Router.post('/api/v1/eDoa/taxClass/getTaxClassList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.TaxClass.ConList.getTaxClassList);

Evolve.Router.post('/api/v1/eDoa/taxClass/addTaxClassItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.TaxClass.ConList.addTaxClassList);

Evolve.Router.put('/api/v1/eDoa/taxClass/updateClassListItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.TaxClass.ConList.updateClassListItem);

Evolve.Router.post('/api/v1/eDoa/taxClass/removeClassItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.TaxClass.ConList.removeClassItem);

Evolve.Router.post('/api/v1/eDoa/taxClass/onUploadTaxClassFile', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.eDoa.TaxClass.ConList.onUploadTaxClassFile);

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Credit Terms Router :", error)
}
module.exports = Evolve.Router