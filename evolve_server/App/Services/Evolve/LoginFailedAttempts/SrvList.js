'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getLoginFailedAttemptsCount: async function (search , condition) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('SELECT COUNT(EvolveLoginFailedAttempts_ID) as count FROM EvolveLoginFailedAttempts WHERE '  +condition+ ' EvolveLoginFailedAttempts_UserID LIKE @search');
        } catch (error) {
            Evolve.Log.error(" EERR1171: Error while get Login Failed Attempts Count "+error.message);
            return new Error(" EERR1171: Error while get Login Failed Attempts Count "+error.message);
        }
    },

    getLoginFailedAttempts: async function (start, length ,search , condition) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT * FROM EvolveLoginFailedAttempts WHERE  " +condition+ " EvolveLoginFailedAttempts_UserID LIKE @search ORDER BY EvolveLoginFailedAttempts_ID  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1172: Error while get Login Failed Attempts "+error.message);
            return new Error(" EERR1172: Error while get Login Failed Attempts "+error.message);
        }
    },

}
