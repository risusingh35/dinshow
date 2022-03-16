'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addCustQRTemplate: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveCustQRTemplate_Name', Evolve.Sql.NVarChar, data.EvolveCustQRTemplate_Name)
                .input('EvolveCustQRTemplate_Code', Evolve.Sql.NVarChar, data.EvolveCustQRTemplate_Code)
                .input('EvolveCustQRTemplate_Type', Evolve.Sql.NVarChar, data.EvolveCustQRTemplate_Type)
                .input('EvolveCustQRTemplate_Status', Evolve.Sql.Bit, data.EvolveCustQRTemplate_Status)

                .input('EvolveCustQRTemplate_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCustQRTemplate_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveCustQRTemplate_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCustQRTemplate_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveCustQRTemplate (EvolveCustQRTemplate_Name, EvolveCustQRTemplate_Code, EvolveCustQRTemplate_Type, EvolveCustQRTemplate_Status, EvolveCustQRTemplate_CreatedAt, EvolveCustQRTemplate_CreatedUser, EvolveCustQRTemplate_UpdatedAt, EvolveCustQRTemplate_UpdatedUser)VALUES(@EvolveCustQRTemplate_Name, @EvolveCustQRTemplate_Code, @EvolveCustQRTemplate_Type, @EvolveCustQRTemplate_Status, @EvolveCustQRTemplate_CreatedAt, @EvolveCustQRTemplate_CreatedUser, @EvolveCustQRTemplate_UpdatedAt, @EvolveCustQRTemplate_UpdatedUser)");

        } catch (error) {
            Evolve.Log.error(" EERR1218: Error while adding Cust QR Template"+error.message);
            return new Error(" EERR1218: Error while adding Cust QR Template "+error.message);
        }
    },


    getCustQRTemplateListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT COUNT(EvolveCustQRTemplate_ID) AS count FROM EvolveCustQRTemplate WHERE EvolveCustQRTemplate_Name LIKE @search OR EvolveCustQRTemplate_Code LIKE @search OR EvolveCustQRTemplate_Type LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR1219: Error while getting Cust QR Template List Count "+error.message);
            return new Error(" EERR1219: Error while getting Cust QR Template List Count "+error.message);
        }
    },

    getCustQRTemplateList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT * FROM EvolveCustQRTemplate WHERE EvolveCustQRTemplate_Name LIKE @search OR EvolveCustQRTemplate_Code LIKE @search OR EvolveCustQRTemplate_Type LIKE @search ORDER BY EvolveCustQRTemplate_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");

        } catch (error) {
            Evolve.Log.error(" EERR1220: Error while getting Cust QR Template list "+error.message);
            return new Error(" EERR1220: Error while getting Cust QR Template list "+error.message);
        }
    },

  
    getSingleCustQRTemplate: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCustQRTemplate_ID', Evolve.Sql.Int, data.EvolveCustQRTemplate_ID)
                .query("SELECT * FROM EvolveCustQRTemplate WHERE EvolveCustQRTemplate_ID = @EvolveCustQRTemplate_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1226: Error while getting Single Cust QR Template "+error.message);
            return new Error(" EERR1226: Error while getting Single Cust QR Template "+error.message);
        }
    },
    updateCustQRTemplate: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveCustQRTemplate_ID', Evolve.Sql.Int, data.EvolveCustQRTemplate_ID)
                .input('EvolveCustQRTemplate_Name', Evolve.Sql.NVarChar, data.EvolveCustQRTemplate_Name)
                .input('EvolveCustQRTemplate_Code', Evolve.Sql.NVarChar, data.EvolveCustQRTemplate_Code)
                .input('EvolveCustQRTemplate_Type', Evolve.Sql.NVarChar, data.EvolveCustQRTemplate_Type)
                .input('EvolveCustQRTemplate_Status', Evolve.Sql.Bit, data.EvolveCustQRTemplate_Status)
                
                .input('EvolveCustQRTemplate_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveCustQRTemplate_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("UPDATE EvolveCustQRTemplate SET EvolveCustQRTemplate_Name = @EvolveCustQRTemplate_Name, EvolveCustQRTemplate_Code = @EvolveCustQRTemplate_Code, EvolveCustQRTemplate_Type = @EvolveCustQRTemplate_Type, EvolveCustQRTemplate_Status = @EvolveCustQRTemplate_Status, EvolveCustQRTemplate_UpdatedAt = @EvolveCustQRTemplate_UpdatedAt, EvolveCustQRTemplate_UpdatedUser = @EvolveCustQRTemplate_UpdatedUser WHERE EvolveCustQRTemplate_ID = @EvolveCustQRTemplate_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1227: Error while updating Cust QR Template "+error.message);
            return new Error(" EERR1227: Error while updating Cust QR Template "+error.message);
        }
    },



}