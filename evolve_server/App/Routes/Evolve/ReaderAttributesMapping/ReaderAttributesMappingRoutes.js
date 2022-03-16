'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Reason API List
     *  Desc  :    
     */

Evolve.Router.post('/api/v1/evolve/ReaderAttributesMapping/getReaderAttMappingList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ReaderAttributesMapping.MidReaderAttributesMapping.getReaderAttMappingList, Evolve.App.Controllers.Evolve.ReaderAttributesMapping.ConList.getReaderAttMappingList);

Evolve.Router.post('/api/v1/evolve/ReaderAttributesMapping/getReaderAttCode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ReaderAttributesMapping.ConList.getReaderAttCode);

Evolve.Router.post('/api/v1/evolve/ReaderAttributesMapping/addReaderAttMapping', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ReaderAttributesMapping.MidReaderAttributesMapping.addReaderAttMapping, Evolve.App.Controllers.Evolve.ReaderAttributesMapping.ConList.addReaderAttMapping);

Evolve.Router.post('/api/v1/evolve/ReaderAttributesMapping/editReaderAttMapping', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.ReaderAttributesMapping.MidReaderAttributesMapping.editReaderAttMapping, Evolve.App.Controllers.Evolve.ReaderAttributesMapping.ConList.editReaderAttMapping);

Evolve.Router.post('/api/v1/evolve/ReaderAttributesMapping/deleteReaderAttMappingData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.ReaderAttributesMapping.ConList.deleteReaderAttMappingData);

    /** End  : Reason  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Role Router :", error)
}

module.exports = Evolve.Router