'use strict';
const Evolve = require('../../../Boot/Evolve');
module.exports = {
    getCountryList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('select EvolveCountry_ID,EvolveCountry_Name,EvolveCountry_Flag from EvolveCountry WHERE EvolveCountry_Active = 1')
        } catch (error) {
            Evolve.Log.error(" EERR1494: Error while getting country list "+error.message);
            return new Error(" EERR1494: Error while getting country list "+error.message);
        }
    },
    getLanguageList: async function () {
        try {
            return await Evolve.SqlPool.request()
            //.input('EvolveCountry_ID', Evolve.Sql.Int, EvolveCountry_ID)
            .query('SELECT * FROM EvolveLanguage')
        } catch (error) {
            Evolve.Log.error(" EERR1495: Error while getting Language List "+error.message);
            return new Error(" EERR1495: Error while getting Language List "+error.message);
        }
    },
    getTranslate: async function (languageId,translate) {
        try {


            //console.log("languageId :", languageId)
            //console.log("translate :", translate)

           // let keywords = Object.keys(translate).toString();

            let keywordArray = [];
            Object.keys(translate).forEach(function (item) {
               // console.log(item); // key
                keywordArray.push("'"+item+"'");
            });

           
            //console.log("keywords :", keywords)
           let keywords = keywordArray.toString()
          // console.log("keywordArray >>>", keywords);

            let query = "Select EvolvelLabel_KeyWord,EvolveLabel_Term From EvolveLabel el WHERE el.EvolveLanguage_ID ="+languageId+" AND el.EvolvelLabel_KeyWord  in ("+keywords+")";

           // console.log("query >>>>>>", query)

            return await Evolve.SqlPool.request()
            .query(query);

            
        } catch (error) {
            Evolve.Log.error(" EERR1496: Error while getting Translate "+error.message);
            return new Error(" EERR1496: Error while getting Translate "+error.message);
        }
    },
}