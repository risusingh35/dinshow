'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Reason API List
     *  Desc  :    
     */

Evolve.Router.post('/api/v1/evolve/ReaderAttributes/getReaderAttributesList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ReaderAttributes.MidReaderAttributes.getReaderAttributesList,Evolve.App.Controllers.Evolve.ReaderAttributes.ConList.getReaderAttributesList);

Evolve.Router.get('/api/v1/evolve/ReaderAttributes/getReaderCode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ReaderAttributes.ConList.getReaderCode);

Evolve.Router.get('/api/v1/evolve/ReaderAttributes/getParentReaderAttList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ReaderAttributes.ConList.getParentReaderAttList);

Evolve.Router.post('/api/v1/evolve/ReaderAttributes/getSingleReaderAttributesData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ReaderAttributes.ConList.getSingleReaderAttributesData);

Evolve.Router.post('/api/v1/evolve/ReaderAttributes/addReaderAttributesData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ReaderAttributes.MidReaderAttributes.addReaderAttributesData, Evolve.App.Controllers.Evolve.ReaderAttributes.ConList.addReaderAttributesData);

Evolve.Router.post('/api/v1/evolve/ReaderAttributes/editReaderAttributesData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ReaderAttributes.MidReaderAttributes.editReaderAttributesData, Evolve.App.Controllers.Evolve.ReaderAttributes.ConList.editReaderAttributesData);

Evolve.Router.post('/api/v1/evolve/ReaderAttributes/deleteReaderAttributesData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Evolve.ReaderAttributes.ConList.deleteReaderAttributesData);


Evolve.Router.post('/api/v1/evolve/ReaderAttributes/checkReaderAttrCode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.Evolve.ReaderAttributes.ConList.checkReaderAttrCode);


    /** End  : Reason  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Role Router :", error)
}

module.exports = Evolve.Router