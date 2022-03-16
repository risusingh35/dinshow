const Evolve = require("../../../Boot/Evolve");

module.exports = {

getCountryList: async function(req, res) {
    try {
        let countryList = await Evolve.App.Services.Evolve.CountryServices.getCountryList();
        //console.log("countryList :", countryList)
        let obj = { statusCode: 200, status: "success", message: "country List", result: countryList.recordsets[0] };
        res.send(obj);
    } catch (error) {
        Evolve.Log.error(" EERR0463: Error while getting Country list "+error.message);
        let obj = { statusCode: 400, status: "fail", message: " EERR0463: Error while getting Country list "+error.message, result: null };
        res.send(obj);
    }
},
getLangugeList: async function(req, res) {
    try {
        let languageList = await Evolve.App.Services.Evolve.CountryServices.getLanguageList(); //req.body.EvolveCountry_ID
     
        let obj = { statusCode: 200, status: "success", message: "language List", result: languageList.recordsets[0] };
        res.send(obj);
    } catch (error) {
        Evolve.Log.error(" EERR0464: Error while getting language list "+error.message);
        let obj = { statusCode: 400, status: "fail", message: " EERR0464: Error while getting language list "+error.message, result: null };
        res.send(obj);
    }
},
getTranslate: async function(req, res) {
    try {
        let translate = await Evolve.App.Services.Evolve.CountryServices.getTranslate(req.body.languageId, req.body.translate);
        //console.log("translate >>>>", translate)
        let obj = { statusCode: 200, status: "success", message: "translate data", result: translate.recordsets[0] };
        res.send(obj);
    } catch (error) {
        Evolve.Log.error(" EERR0465: Error while getting translate "+error.message);
        let obj = { statusCode: 400, status: "fail", message: " EERR0465: Error while getting translate "+error.message, result: null };
        res.send(obj);
    }
},
}