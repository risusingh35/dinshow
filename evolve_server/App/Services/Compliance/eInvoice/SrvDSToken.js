'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    
    getDSTokenList: async function (EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUser_ID',Evolve.Sql.Int,EvolveUser_ID)
                // .query("SELECT dst.*, DATEDIFF(SECOND,EvolveDSToken_PingType,getdate()) AS DiffDate FROM EvolveDSToken dst ORDER BY dst.EvolveDSToken_ID DESC");                
                .query("SELECT dst.EvolveDSToken_ID, eu.EvolveUser_Name, dst.EvolveDSToken_Token,DATEDIFF(SECOND,EvolveDSToken_PingType,getdate()) AS DiffDate, CONVERT(VARCHAR, dst.EvolveDSToken_ExpiryDate , 103) AS 'ExpiryDate', STUFF((SELECT DISTINCT ',   ' + CAST(eunit.EvolveUnit_Code AS VARCHAR(MAX)) FROM EvolveUnit eunit, EvolveUserUnitLink euul WHERE eunit.EvolveUnit_ID = euul.EvolveUnit_ID AND euul.EvolveUser_ID = eu.EvolveUser_ID FOR XML PATH('')), 1, 1, '') 'Unit' FROM EvolveDSToken dst, EvolveUser eu WHERE eu.EvolveUser_ID = dst.EvolveUser_ID ORDER BY dst.EvolveDSToken_ID DESC");
        } catch (error) {
            Evolve.Log.error(" EERR1063: Error while getting DS Token List " + error.message);
            return new Error(" EERR1063: Error while getting DS Token List " + error.message);
        }
    },

}