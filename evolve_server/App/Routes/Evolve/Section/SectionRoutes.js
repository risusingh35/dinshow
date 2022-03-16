'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
    /** 
     *  Title :  Section  API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/section/getSectionList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Evolve.Section.SectionMid.getSectionListAuth, Evolve.App.Controllers.Evolve.Section.ConList.getSectionList);

    Evolve.Router.post('/api/v1/evolve/section/addsection', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Section.SectionMid.addsection, Evolve.App.Controllers.Evolve.Section.ConList.addsection);

    Evolve.Router.post('/api/v1/evolve/section/getSingleSection', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Section.SectionMid.getSingleSection, Evolve.App.Controllers.Evolve.Section.ConList.getSingleSection);

    Evolve.Router.post('/api/v1/evolve/section/deleteSection', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Section.SectionMid.deleteSection, Evolve.App.Controllers.Evolve.Section.ConList.deleteSection);

    Evolve.Router.post('/api/v1/evolve/section/updateSection', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.Evolve.Section.SectionMid.updateSection, Evolve.App.Controllers.Evolve.Section.ConList.updateSection);

    /** End  : Section  */

} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Section Router :", error)
}
module.exports = Evolve.Router