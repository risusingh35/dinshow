'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getMenuMonitorListCount: async function (search , condition) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('SELECT COUNT(emm.EvolveMenuMonitor_ID) as count FROM EvolveMenuMonitor emm, EvolveUser eu WHERE emm.EvolveUser_ID =  eu.EvolveUser_ID ' +condition+'  AND  eu.EvolveUser_Name LIKE @search');
        } catch (error) {
            Evolve.Log.error(" EERR1171: Error while get Menu Monitor List Count "+error.message);
            return new Error(" EERR1171: Error while get Menu Monitor List Count "+error.message);
        }
    },

    getMenuMonitorList: async function (start, length ,search , condition) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT emm.* , convert(varchar, emm.EvolveMenuMonitor_InTime, 20) as intime, convert(varchar, emm.EvolveMenuMonitor_OutTime, 20) as outtime , CONVERT(varchar(6), DATEDIFF(second, emm.EvolveMenuMonitor_InTime, emm.EvolveMenuMonitor_OutTime)/3600)+ ':'+ RIGHT('0' + CONVERT(varchar(2), (DATEDIFF(second, emm.EvolveMenuMonitor_InTime, emm.EvolveMenuMonitor_OutTime) % 3600) / 60), 2) + ':'+ RIGHT('0' + CONVERT(varchar(2), DATEDIFF(second, emm.EvolveMenuMonitor_InTime, emm.EvolveMenuMonitor_OutTime) % 60), 2) AS 'totaltime' ,   eu.EvolveUser_Name , em.EvolveMenu_Name FROM EvolveMenuMonitor emm , EvolveUser eu , EvolveMenu em WHERE emm.EvolveUser_ID = eu.EvolveUser_ID AND emm.EvolveMenu_Id = em.EvolveMenu_Id "+condition+" AND eu.EvolveUser_Name LIKE @search ORDER BY emm.EvolveMenuMonitor_ID  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
                // .query("SELECT emm.* , convert(varchar, emm.EvolveMenuMonitor_InTime, 20) as intime, convert(varchar, emm.EvolveMenuMonitor_OutTime, 20) as outtime ,  eu.EvolveUser_Name , em.EvolveMenu_Name FROM EvolveMenuMonitor emm , EvolveUser eu , EvolveMenu em WHERE emm.EvolveUser_ID = eu.EvolveUser_ID AND emm.EvolveMenu_Id = em.EvolveMenu_Id "+condition+" AND eu.EvolveUser_Name LIKE @search ORDER BY emm.EvolveMenuMonitor_ID  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1172: Error while get Menu Monitor List "+error.message);
            return new Error(" EERR1172: Error while get Menu Monitor List "+error.message);
        }
    },

}
