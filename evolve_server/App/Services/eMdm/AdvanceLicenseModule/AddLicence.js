'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getLicenceItemGroupList: async function() {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveLicenceItemGroup_ID , EvolveLicenceItemGroup_Code FROM EvolveLicenceItemGroup")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Licence Item Group" + error.message);
            return new Error(" EERR####: Error while get Licence Item Group" + error.message);
        }
    },

    creactLicence: async function(data) {
        try {
            let date = new Date();
            let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveLicence_Number', Evolve.Sql.NVarChar, data.EvolveLicence_Number)
                .input('EvolveLicence_Desc', Evolve.Sql.NVarChar, data.EvolveLicence_Desc)
                .input('EvolveLicence_PortCode', Evolve.Sql.NVarChar, data.EvolveLicence_PortCode)
                .input('EvolveLicence_PortName', Evolve.Sql.NVarChar, data.EvolveLicence_PortName)
                .input('EvolveLicence_PortType', Evolve.Sql.NVarChar, data.EvolveLicence_PortType)
                .input('EvolveLicence_ValueInINR', Evolve.Sql.NVarChar, parseFloat(data.EvolveLicence_ValueInINR).toFixed(2))
                .input('EvolveLicence_ValueInForeign', Evolve.Sql.NVarChar, parseFloat(data.EvolveLicence_ValueInForeign).toFixed(2))
                .input('EvolveLicence_RemaingValueInINR', Evolve.Sql.NVarChar, 0)
                .input('EvolveLicence_RemaingValueInForeign', Evolve.Sql.NVarChar, 0)
                .input('EvolveLicence_ExpiryDate', Evolve.Sql.NVarChar, data.EvolveLicence_ExpiryDate)
                .input('EvolveLicence_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveLicence_UpdatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .query("INSERT INTO EvolveLicence (EvolveLicence_Number , EvolveLicence_Desc , EvolveLicence_PortCode, EvolveLicence_PortName , EvolveLicence_PortType , EvolveLicence_ValueInINR , EvolveLicence_ValueInForeign , EvolveLicence_ExpiryDate , EvolveLicence_CreatedAt , EvolveLicence_UpdatedUser , EvolveLicence_RemaingValueInForeign , EvolveLicence_RemaingValueInINR ) VALUES  (@EvolveLicence_Number , @EvolveLicence_Desc , @EvolveLicence_PortCode , @EvolveLicence_PortName , @EvolveLicence_PortType , @EvolveLicence_ValueInINR , @EvolveLicence_ValueInForeign , @EvolveLicence_ExpiryDate  ,@EvolveLicence_CreatedAt , @EvolveLicence_UpdatedUser , @EvolveLicence_RemaingValueInForeign , @EvolveLicence_RemaingValueInINR );select @@IDENTITY AS \'inserted_id\'")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Add data " + error.message);
            return new Error(" EERR####: Error while Add data " + error.message);
        }
    },

    addLicenceDetail: async function(data, licenceId) {
        try {
            console.log("data>>>>>>>>>>>>>>>>>....", data);
            let date = new Date();
            let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveLicence_ID', Evolve.Sql.Int, licenceId)
                .input('EvolveLicenceItemGroup_ID', Evolve.Sql.Int, data.licenceItemGroupId)
                .input('EvolveLicenceDetail_ValueInINR', Evolve.Sql.NVarChar, parseFloat(data.datileValueInInr).toFixed(2))
                .input('EvolveLicenceDetail_ValueInForeign', Evolve.Sql.NVarChar, parseFloat(data.datileValueInForeign).toFixed(2))
                .input('EvolveLicenceDetail_RemaingValueInINR', Evolve.Sql.NVarChar, 0)
                .input('EvolveLicenceDetail_RemaingValueInForeign', Evolve.Sql.NVarChar, 0)
                .input('EvolveLicenceDetail_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveLicenceDetail_CreatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .query("INSERT INTO EvolveLicenceDetail (EvolveLicence_ID , EvolveLicenceItemGroup_ID ,  EvolveLicenceDetail_ValueInINR , EvolveLicenceDetail_ValueInForeign ,  EvolveLicenceDetail_CreatedAt , EvolveLicenceDetail_CreatedUser , EvolveLicenceDetail_RemaingValueInINR , EvolveLicenceDetail_RemaingValueInForeign) VALUES  (@EvolveLicence_ID  , @EvolveLicenceItemGroup_ID , @EvolveLicenceDetail_ValueInINR , @EvolveLicenceDetail_ValueInForeign , @EvolveLicenceDetail_CreatedAt , @EvolveLicenceDetail_CreatedUser  , @EvolveLicenceDetail_RemaingValueInINR , @EvolveLicenceDetail_RemaingValueInForeign )")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Add LicenceDetail data " + error.message);
            return new Error(" EERR####: Error while Add LicenceDetail data " + error.message);
        }
    },

    selectSingleLicenceAndLicenceDetaliData: async function(licenceId) {
        try {
            console.log("licenceId>>>>>>>", licenceId);
            return await Evolve.SqlPool.request()
                .input('EvolveLicence_ID', Evolve.Sql.Int, licenceId)
                .query("select el.EvolveLicence_Desc , el.EvolveLicence_ID , el.EvolveLicence_Number , el.EvolveLicence_PortCode , el.EvolveLicence_PortName , el.EvolveLicence_PortType ,  el.EvolveLicence_ValueInForeign , el.EvolveLicence_ValueInINR , el.EvolveLicence_ExpiryDate , eld.EvolveLicenceDetail_ID , eld.EvolveLicenceDetail_ValueInForeign , eld.EvolveLicenceDetail_ValueInINR , eld.EvolveLicenceItemGroup_ID  from EvolveLicence el LEFT JOIN EvolveLicenceDetail eld ON  el.EvolveLicence_ID = eld.EvolveLicence_ID where  el.EvolveLicence_ID = @EvolveLicence_ID ")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Single Licence And Licence Detali Data " + error.message);
            return new Error(" EERR####: Error while get Single Licence And Licence Detali Data " + error.message);
        }
    },

    updateLicence: async function(data) {
        try {
            let date = new Date();
            let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveLicence_ID', Evolve.Sql.Int, data.EvolveLicence_ID)
                .input('EvolveLicence_Number', Evolve.Sql.NVarChar, data.EvolveLicence_Number)
                .input('EvolveLicence_Desc', Evolve.Sql.NVarChar, data.EvolveLicence_Desc)
                .input('EvolveLicence_PortCode', Evolve.Sql.NVarChar, data.EvolveLicence_PortCode)
                .input('EvolveLicence_PortName', Evolve.Sql.NVarChar, data.EvolveLicence_PortName)
                .input('EvolveLicence_PortType', Evolve.Sql.NVarChar, data.EvolveLicence_PortType)
                .input('EvolveLicence_ValueInINR', Evolve.Sql.NVarChar, parseFloat(data.EvolveLicence_ValueInINR).toFixed(2))
                .input('EvolveLicence_ValueInForeign', Evolve.Sql.NVarChar, parseFloat(data.EvolveLicence_ValueInForeign).toFixed(2))
                .input('EvolveLicence_ExpiryDate', Evolve.Sql.NVarChar, data.EvolveLicence_ExpiryDate)
                .input('EvolveLicence_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveLicence_UpdatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .query("UPDATE EvolveLicence SET EvolveLicence_Number = @EvolveLicence_Number , EvolveLicence_Desc = @EvolveLicence_Desc ,  EvolveLicence_PortCode = @EvolveLicence_PortCode, EvolveLicence_PortName = @EvolveLicence_PortName , EvolveLicence_PortType = @EvolveLicence_PortType , EvolveLicence_ValueInINR = @EvolveLicence_ValueInINR ,  EvolveLicence_ValueInForeign = @EvolveLicence_ValueInForeign , EvolveLicence_ExpiryDate = @EvolveLicence_ExpiryDate  , EvolveLicence_UpdatedAt = @EvolveLicence_UpdatedAt , EvolveLicence_UpdatedUser = @EvolveLicence_UpdatedUser  where EvolveLicence_ID = @EvolveLicence_ID")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update Licence data " + error.message);
            return new Error(" EERR####: Error while update Licence data " + error.message);
        }
    },

    deleteOldLicenceDetali: async function(licenceItemGroupId, licenceId) {
        try {
            console.log("licenceId>>>>>>>", licenceId);
            return await Evolve.SqlPool.request()
                .input('EvolveLicence_ID', Evolve.Sql.Int, licenceId)
                .input('EvolveLicenceItemGroup_ID', Evolve.Sql.Int, licenceItemGroupId)

            .query("DELETE FROM EvolveLicenceDetail WHERE EvolveLicence_ID = @EvolveLicence_ID AND EvolveLicenceItemGroup_ID = @EvolveLicenceItemGroup_ID ")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Delete Licence Detali " + error.message);
            return new Error(" EERR####: Error while Delete Licence Detali " + error.message);
        }
    },

    checkLicenceDetail: async function(licenceItemGroupId, licenceId) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveLicence_ID', Evolve.Sql.Int, licenceId)
                .input('EvolveLicenceItemGroup_ID', Evolve.Sql.Int, licenceItemGroupId)
                .query("Select EvolveLicenceDetail_ID FROM EvolveLicenceDetail WHERE EvolveLicence_ID = @EvolveLicence_ID AND EvolveLicenceItemGroup_ID = @EvolveLicenceItemGroup_ID ")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check Licence Detail Data " + error.message);
            return new Error(" EERR####: Error while check Licence Detail Data " + error.message);
        }
    },

    updateLicenceDetail: async function(data, licenceId) {
        try {
            console.log("data>>>>>>>>>>>>>>>>>....", data);
            let date = new Date();
            let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveLicence_ID', Evolve.Sql.Int, licenceId)
                .input('EvolveLicenceItemGroup_ID', Evolve.Sql.Int, data.licenceItemGroupId)
                .input('EvolveLicenceDetail_ValueInINR', Evolve.Sql.NVarChar, parseFloat(data.datileValueInInr).toFixed(2))
                .input('EvolveLicenceDetail_ValueInForeign', Evolve.Sql.NVarChar, parseFloat(data.datileValueInForeign).toFixed(2))
                .input('EvolveLicenceDetail_RemaingValueInINR', Evolve.Sql.NVarChar, 0)
                .input('EvolveLicenceDetail_RemaingValueInForeign', Evolve.Sql.NVarChar, 0)
                .input('EvolveLicenceDetail_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveLicenceDetail_UpdatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .query("UPDATE EvolveLicenceDetail SET EvolveLicenceDetail_ValueInINR = @EvolveLicenceDetail_ValueInINR , EvolveLicenceDetail_ValueInForeign = @EvolveLicenceDetail_ValueInForeign , EvolveLicenceDetail_UpdatedAt = @EvolveLicenceDetail_UpdatedAt ,EvolveLicenceDetail_UpdatedUser = @EvolveLicenceDetail_UpdatedUser WHERE  EvolveLicence_ID = @EvolveLicence_ID AND EvolveLicenceItemGroup_ID = @EvolveLicenceItemGroup_ID ")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update LicenceDetail data " + error.message);
            return new Error(" EERR####: Error while update LicenceDetail data " + error.message);
        }
    }



}