'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getLogInListCount: async function (search , condition) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('SELECT COUNT(el.EvolveLogin_ID) as count FROM EvolveLogin el, EvolveUser eu WHERE el.EvolveUser_ID = eu.EvolveUser_ID ' +condition+ ' AND  eu.EvolveUser_Name LIKE @search');
        } catch (error) {
            Evolve.Log.error(" EERR1171: Error while getting Business Group Count "+error.message);
            return new Error(" EERR1171: Error while getting Business Group Count "+error.message);
        }
    },

    getLogInList: async function (start, length ,search , condition) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT el.* , convert(varchar, el.EvolveLogin_InTime, 20) as intime , convert(varchar, el.EvolveLogin_OutTime, 20) as outtime, eu.EvolveUser_Name ,CONVERT(varchar(6), DATEDIFF(second, el.EvolveLogin_InTime, el.EvolveLogin_OutTime)/3600) + ':'+ RIGHT('0' + CONVERT(varchar(2), (DATEDIFF(second, el.EvolveLogin_InTime, el.EvolveLogin_OutTime) % 3600) / 60), 2)+ ':' + RIGHT('0' + CONVERT(varchar(2), DATEDIFF(second, el.EvolveLogin_InTime, el.EvolveLogin_OutTime) % 60), 2) AS 'totaltime' FROM EvolveLogin el , EvolveUser eu WHERE el.EvolveUser_ID = eu.EvolveUser_ID "+condition+" AND eu.EvolveUser_Name LIKE @search ORDER BY el.EvolveLogin_ID  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
                // .query("SELECT el.* , eu.EvolveUser_Name FROM EvolveLogin el , EvolveUser eu WHERE el.EvolveUser_ID = eu.EvolveUser_ID "+condition+" AND eu.EvolveUser_Name LIKE @search ORDER BY el.EvolveLogin_ID  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1172: Error while getting Business Group "+error.message);
            return new Error(" EERR1172: Error while getting Business Group "+error.message);
        }
    },

}
