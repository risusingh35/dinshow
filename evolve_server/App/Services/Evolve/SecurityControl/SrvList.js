'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    saveSecurityControl: async function (data) {
        console.log("saveSecurityControl>>>", data);
        try {
            let date = new Date();
			let dateTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
			
            return await Evolve.SqlPool.request()
                .input('EvolveGeneralSecurityControl_ID', Evolve.Sql.Int, data.EvolveGeneralSecurityControl_ID) 
                .input('EvolveGeneralSecurityControl_IdealTimeOutMins', Evolve.Sql.Int, data.EvolveGeneralSecurityControl_IdealTimeOutMins) 
                .input('EvolveGeneralSecurityControl_SessionExpMins', Evolve.Sql.Int, data.EvolveGeneralSecurityControl_SessionExpMins) 
                .input('EvolveGeneralSecurityControl_EnforcedLiceUserCount', Evolve.Sql.Bit, data.EvolveGeneralSecurityControl_EnforcedLiceUserCount) 
                .input('EvolveGeneralSecurityControl_EnforcedOsUserid', Evolve.Sql.Bit, data.EvolveGeneralSecurityControl_EnforcedOsUserid) 
                .input('EvolveGeneralSecurityControl_headerDisplayMode', Evolve.Sql.NVarChar, data.EvolveGeneralSecurityControl_headerDisplayMode) 
                .input('EvolveGeneralSecurityControl_MaxAccessFailures', Evolve.Sql.NVarChar, data.EvolveGeneralSecurityControl_MaxAccessFailures) 
                .input('EvolveGeneralSecurityControl_AdministratorRole', Evolve.Sql.Int, data.EvolveGeneralSecurityControl_AdministratorRole) 
                .input('EvolveGeneralSecurityControl_EmailSystem', Evolve.Sql.Int, data.EvolveGeneralSecurityControl_EmailSystem) 
                .input('EvolveGeneralSecurityControl_LogonHistoryLevel', Evolve.Sql.Int, data.EvolveGeneralSecurityControl_LogonHistoryLevel) 
                .input('EvolveGeneralSecurityControl_EnableReasonType', Evolve.Sql.NVarChar, data.EvolveGeneralSecurityControl_EnableReasonType) 
                .input('EvolveGeneralSecurityControl_AutoDisablementReason', Evolve.Sql.Int, data.EvolveGeneralSecurityControl_AutoDisablementReason) 
                .input('EvolveGeneralSecurityControl_ClientId', Evolve.Sql.Int, data.EvolveGeneralSecurityControl_ClientId) 
                .input('EvolveGeneralSecurityControl_PassMinLength', Evolve.Sql.Int, data.EvolveGeneralSecurityControl_PassMinLength) 
                .input('EvolveGeneralSecurityControl_PassCreationLength', Evolve.Sql.Int, data.EvolveGeneralSecurityControl_PassCreationLength) 
                .input('EvolveGeneralSecurityControl_PassMinNumericChars', Evolve.Sql.Int, data.EvolveGeneralSecurityControl_PassMinNumericChars) 
                .input('EvolveGeneralSecurityControl_PassExpirationDays', Evolve.Sql.Int, data.EvolveGeneralSecurityControl_PassExpirationDays) 
                .input('EvolveGeneralSecurityControl_PassMinNonNumericChars', Evolve.Sql.Int, data.EvolveGeneralSecurityControl_PassMinNonNumericChars) 
                .input('EvolveGeneralSecurityControl_PassWarningDays', Evolve.Sql.Int, data.EvolveGeneralSecurityControl_PassWarningDays) 
                .input('EvolveGeneralSecurityControl_PassMinReuseDays', Evolve.Sql.Int, data.EvolveGeneralSecurityControl_PassMinReuseDays) 
                .input('EvolveGeneralSecurityControl_PassMinReuseChanges', Evolve.Sql.Int, data.EvolveGeneralSecurityControl_PassMinReuseChanges) 
                // .input('EvolveGeneralSecurityControl_CreatedAt', Evolve.Sql.NVarChar, dateTime) 
                // .input('EvolveGeneralSecurityControl_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID) 
                .input('EvolveGeneralSecurityControl_UpdatedAt', Evolve.Sql.NVarChar, dateTime) 
                .input('EvolveGeneralSecurityControl_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID) 
                .query(' UPDATE EvolveGeneralSecurityControl SET EvolveGeneralSecurityControl_IdealTimeOutMins = @EvolveGeneralSecurityControl_IdealTimeOutMins, EvolveGeneralSecurityControl_SessionExpMins = @EvolveGeneralSecurityControl_SessionExpMins, EvolveGeneralSecurityControl_EnforcedLiceUserCount = @EvolveGeneralSecurityControl_EnforcedLiceUserCount, EvolveGeneralSecurityControl_EnforcedOsUserid = @EvolveGeneralSecurityControl_EnforcedOsUserid, EvolveGeneralSecurityControl_headerDisplayMode = @EvolveGeneralSecurityControl_headerDisplayMode, EvolveGeneralSecurityControl_MaxAccessFailures = @EvolveGeneralSecurityControl_MaxAccessFailures, EvolveGeneralSecurityControl_AdministratorRole = @EvolveGeneralSecurityControl_AdministratorRole, EvolveGeneralSecurityControl_EmailSystem = @EvolveGeneralSecurityControl_EmailSystem, EvolveGeneralSecurityControl_LogonHistoryLevel = @EvolveGeneralSecurityControl_LogonHistoryLevel, EvolveGeneralSecurityControl_EnableReasonType = @EvolveGeneralSecurityControl_EnableReasonType, EvolveGeneralSecurityControl_AutoDisablementReason = @EvolveGeneralSecurityControl_AutoDisablementReason, EvolveGeneralSecurityControl_ClientId = @EvolveGeneralSecurityControl_ClientId, EvolveGeneralSecurityControl_PassMinLength = @EvolveGeneralSecurityControl_PassMinLength, EvolveGeneralSecurityControl_PassCreationLength = @EvolveGeneralSecurityControl_PassCreationLength, EvolveGeneralSecurityControl_PassMinNumericChars = @EvolveGeneralSecurityControl_PassMinNumericChars, EvolveGeneralSecurityControl_PassExpirationDays = @EvolveGeneralSecurityControl_PassExpirationDays, EvolveGeneralSecurityControl_PassMinNonNumericChars = @EvolveGeneralSecurityControl_PassMinNonNumericChars, EvolveGeneralSecurityControl_PassWarningDays = @EvolveGeneralSecurityControl_PassWarningDays, EvolveGeneralSecurityControl_PassMinReuseDays = @EvolveGeneralSecurityControl_PassMinReuseDays, EvolveGeneralSecurityControl_PassMinReuseChanges = @EvolveGeneralSecurityControl_PassMinReuseChanges,EvolveGeneralSecurityControl_UpdatedAt = @EvolveGeneralSecurityControl_UpdatedAt, EvolveGeneralSecurityControl_UpdatedUser = @EvolveGeneralSecurityControl_UpdatedUser WHERE EvolveGeneralSecurityControl_ID = @EvolveGeneralSecurityControl_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Save Security Control Data - Service "+error.message);
            return new Error(" EERR####: Error while Save Security Control Data - Service "+error.message);
        }
    },

    getSecurityControlData: async function (data) {
        try {
			
            return await Evolve.SqlPool.request()
                .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
                .query(' SELECT TOP 1 * FROM EvolveGeneralSecurityControl ORDER BY EvolveGeneralSecurityControl_ID DESC ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get Security Control Data - Service "+error.message);
            return new Error(" EERR####: Error while Get Security Control Data - Service "+error.message);
        }
    },


}