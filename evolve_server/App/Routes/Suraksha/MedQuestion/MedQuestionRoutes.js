'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {

    Evolve.Router.post('/api/v1/suraksha/medQuestion/getQuestionList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Suraksha.MedQuestion.MidMedQuestion.getQuestionListAuth,Evolve.App.Controllers.Suraksha.MedQuestion.ConList.getQuestionList);

    Evolve.Router.post('/api/v1/suraksha/medQuestion/addQuestion', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Suraksha.MedQuestion.MidMedQuestion.addQuestionAuth,  Evolve.App.Controllers.Suraksha.MedQuestion.ConList.addQuestion);

    Evolve.Router.post('/api/v1/suraksha/medQuestion/getSingalQuestionDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Suraksha.MedQuestion.MidMedQuestion.getSingalQuestionDetailsAuth,  Evolve.App.Controllers.Suraksha.MedQuestion.ConList.getSingalQuestionDetails);

    Evolve.Router.post('/api/v1/suraksha/medQuestion/updatQuestionDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Suraksha.MedQuestion.MidMedQuestion.updatQuestionDetailsAuth,  Evolve.App.Controllers.Suraksha.MedQuestion.ConList.updatQuestionDetails);
    Evolve.Router.post('/api/v1/suraksha/medQuestion/deleteQuestion', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,Evolve.App.Middlewares.Suraksha.MedQuestion.MidMedQuestion.deleteQuestionAuth, Evolve.App.Controllers.Suraksha.MedQuestion.ConList.deleteQuestion);


} catch (error) {
    Evolve.Log.error(error.message);
    console.log("Error in Evolve Suraksha Med Question Routes :", error)
}


module.exports = Evolve.Router