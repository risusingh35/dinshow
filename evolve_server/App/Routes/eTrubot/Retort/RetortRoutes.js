'use strict';
const Evolve = require('../../../../Boot/Evolve');
try {
  /** 
    *  Title :  Tru Bot API List
    *  Desc  :     
    */


  
  // Dashboard : start
  Evolve.Router.post('/api/v1/eTrubot/report/getBotListForDashabord',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eTrubot.Report.ConList.getBotListForDashabord);

  Evolve.Router.post('/api/v1/eTrubot/report/SearchDateWiseBotForBatchart',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eTrubot.Report.ConList.SearchDatewiseBotForBatchart);

  Evolve.Router.post('/api/v1/eTrubot/report/SearchDateWiseBotForAreachart',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eTrubot.Report.ConList.SearchDateWiseBotForAreachart);

  Evolve.Router.post('/api/v1/eTrubot/report/SearchMonthWiseBotForBatchart',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eTrubot.Report.ConList.SearchMonthWiseBotForBatchart);

  Evolve.Router.post('/api/v1/eTrubot/report/SearchMonthWiseBotForAreachart',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eTrubot.Report.ConList.SearchMonthWiseBotForAreachart);

  // Dashboard : end


  // Bot List : start

  Evolve.Router.post('/api/v1/eTrubot/report/getBotList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eTrubot.Report.ConList.getBotList);

  Evolve.Router.post('/api/v1/eTrubot/report/onClickTrueButton',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eTrubot.Report.ConList.onClickTrueButton);

  Evolve.Router.post('/api/v1/eTrubot/report/getBotstatus',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eTrubot.Report.ConList.getBotstatus);

  Evolve.Router.post('/api/v1/eTrubot/report/getStatusAndLastrunTime',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eTrubot.Report.ConList.getStatusAndLastrunTime);

  // Bot List : start




  // Add Bot : start

  Evolve.Router.post('/api/v1/eTrubot/report/updateRoleToUser',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eTrubot.Report.ConList.updateRoleToUser);

  Evolve.Router.post('/api/v1/eTrubot/report/getUserByRoleId',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eTrubot.Report.ConList.getUserByRoleId);

  Evolve.Router.post('/api/v1/eTrubot/report/getRoleList',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eTrubot.Report.ConList.getRoleList);

  Evolve.Router.post('/api/v1/eTrubot/report/selectSingleBot',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eTrubot.Report.ConList.selectSingleBot);

  Evolve.Router.post('/api/v1/eTrubot/report/createBot',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eTrubot.Report.ConList.createBot);

  Evolve.Router.post('/api/v1/eTrubot/report/updateBot',Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,  Evolve.App.Controllers.eTrubot.Report.ConList.updateBot);

  // Add Bot : end


  // Chat Bot : start
  Evolve.Router.post('/api/v1/eTrubot/report/getVoiceRecognizeData', Evolve.App.Controllers.eTrubot.Report.ConList.getVoiceRecognizeData);

  Evolve.Router.get('/api/v1/eTrubot/report/getBotStatusByVoiceCommand', Evolve.App.Controllers.eTrubot.Report.ConList.getBotStatusByVoiceCommand);

  // Chat Bot : end


  /** End  : Tru Bot  */

} catch (error) {
  Evolve.Log.error(error.message);
  console.log("Error in Assets Room Router :", error)
}


module.exports = Evolve.Router
