'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getCustQRListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT COUNT(cqr.EvolveCustQR_ID) as count FROM EvolveCustQR cqr, EvolveCustQRTemplate cqrt WHERE cqr.EvolveCustQRTemplate_ID = cqrt.EvolveCustQRTemplate_ID AND (cqrt.EvolveCustQRTemplate_Name LIKE @search OR cqr.EvolveCustQR_Name LIKE @search OR cqr.EvolveCustQR_Code LIKE @search)");
        } catch (error) {
            Evolve.Log.error(" EERR2600: Error while Cust QR list count " + error.message);
            return new Error(" EERR2600: Error while Cust QR list count " + error.message);
        }
    },

    getCustQRListDatatable: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT cqr.*, cqrt.EvolveCustQRTemplate_Name FROM EvolveCustQR cqr, EvolveCustQRTemplate cqrt WHERE cqr.EvolveCustQRTemplate_ID = cqrt.EvolveCustQRTemplate_ID AND (cqrt.EvolveCustQRTemplate_Name LIKE @search OR cqr.EvolveCustQR_Name LIKE @search OR cqr.EvolveCustQR_Code LIKE @search) order by cqr.EvolveCustQR_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR2601: Error while Cust QR list " + error.message);
            return new Error(" EERR2601: Error while Cust QR list " + error.message);
        }
    },

    getCustQRTempList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT * FROM EvolveCustQRTemplate');
        } catch (error) {
            Evolve.Log.error(" EERR2602: Error while get Cust QR Template list " + error.message);
            return new Error(" EERR2602: Error while get Cust QR Template list " + error.message);
        }
    },
    getEvolveTableList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT name,crdate FROM SYSOBJECTS WHERE xtype = 'U'");
        } catch (error) {
            Evolve.Log.error(" EERR2604: Error while get table list " + error.message);
            return new Error(" EERR2604: Error while get table list " + error.message);
        }
    },
    getTableFields: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('Table', Evolve.Sql.NVarChar, data.table)
                .query("SELECT COLUMN_NAME as columnName FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @Table");
        } catch (error) {
            Evolve.Log.error(" EERR2605: Error while get get tahble fields " + error.message);
            return new Error(" EERR2605: Error while get get tahble fields " + error.message);
        }
    },
    addCustQR: async function (data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveCustQRTemplate_ID', Evolve.Sql.Int, data.EvolveCustQRTemplate_ID)
                .input('EvolveCustQR_Name', Evolve.Sql.NVarChar, data.EvolveCustQR_Name)
                .input('EvolveCustQR_Code', Evolve.Sql.NVarChar, data.EvolveCustQR_Code)
                .input('EvolveCustQR_IndexNumber', Evolve.Sql.NVarChar, data.EvolveCustQR_IndexNumber)
                .input('EvolveCustQR_Separator', Evolve.Sql.NVarChar, data.EvolveCustQR_Separator)
                .input('EvolveCustQR_ValueType', Evolve.Sql.Int, data.EvolveCustQR_ValueType)
                .input('EvolveCustQR_Static_Value', Evolve.Sql.NVarChar, data.EvolveCustQR_Static_Value)
                .input('EvolveCustQR_IsSingle', Evolve.Sql.Bit, data.EvolveCustQR_IsSingle)
                .input('EvolveCustQR_Table', Evolve.Sql.NVarChar, data.EvolveCustQR_Table)
                .input('EvolveCustQR_Field', Evolve.Sql.NVarChar, data.EvolveCustQR_Field)
                .input('EvolveCustQR_MatchFeild', Evolve.Sql.NVarChar, data.EvolveCustQR_MatchFeild)
                .input('EvolveCustQR_Status', Evolve.Sql.Bit, data.EvolveCustQR_Status)

                .input('EvolveCustQR_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveCustQR_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveCustQR_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('EvolveCustQR_CreatedAt', Evolve.Sql.NVarChar, dateTime)

                .query('INSERT INTO EvolveCustQR (EvolveCustQRTemplate_ID,EvolveCustQR_Name,EvolveCustQR_Code,EvolveCustQR_IndexNumber,EvolveCustQR_Separator,EvolveCustQR_ValueType,EvolveCustQR_Static_Value,EvolveCustQR_IsSingle,EvolveCustQR_Table,EvolveCustQR_Field, EvolveCustQR_MatchFeild, EvolveCustQR_Status, EvolveCustQR_UpdatedUser, EvolveCustQR_CreatedUser, EvolveCustQR_UpdatedAt, EvolveCustQR_CreatedAt) VALUES(@EvolveCustQRTemplate_ID,@EvolveCustQR_Name,@EvolveCustQR_Code,@EvolveCustQR_IndexNumber,@EvolveCustQR_Separator,@EvolveCustQR_ValueType,@EvolveCustQR_Static_Value,@EvolveCustQR_IsSingle,@EvolveCustQR_Table,@EvolveCustQR_Field, @EvolveCustQR_MatchFeild, @EvolveCustQR_Status, @EvolveCustQR_UpdatedUser, @EvolveCustQR_CreatedUser, @EvolveCustQR_UpdatedAt, @EvolveCustQR_CreatedAt)');
        } catch (error) {
            Evolve.Log.error(" EERR2606: Error while add Cust QR " + error.message);
            return new Error(" EERR2606: Error while add Cust QR " + error.message);
        }
    },
    updateCustQR: async function (data) {
        try {
            console.log("data==",data)
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveCustQR_ID', Evolve.Sql.Int, data.EvolveCustQR_ID)
            .input('EvolveCustQRTemplate_ID', Evolve.Sql.Int, data.EvolveCustQRTemplate_ID)
            .input('EvolveCustQR_Name', Evolve.Sql.NVarChar, data.EvolveCustQR_Name)
            .input('EvolveCustQR_Code', Evolve.Sql.NVarChar, data.EvolveCustQR_Code)
            .input('EvolveCustQR_IndexNumber', Evolve.Sql.NVarChar, data.EvolveCustQR_IndexNumber)
            .input('EvolveCustQR_Separator', Evolve.Sql.NVarChar, data.EvolveCustQR_Separator)
            .input('EvolveCustQR_ValueType', Evolve.Sql.Int, data.EvolveCustQR_ValueType)
            .input('EvolveCustQR_Static_Value', Evolve.Sql.NVarChar, data.EvolveCustQR_Static_Value)
            .input('EvolveCustQR_IsSingle', Evolve.Sql.Bit, data.EvolveCustQR_IsSingle)
            .input('EvolveCustQR_Table', Evolve.Sql.NVarChar, data.EvolveCustQR_Table)
            .input('EvolveCustQR_Field', Evolve.Sql.NVarChar, data.EvolveCustQR_Field)
            .input('EvolveCustQR_MatchFeild', Evolve.Sql.NVarChar, data.EvolveCustQR_MatchFeild)
            .input('EvolveCustQR_Status', Evolve.Sql.Bit, data.EvolveCustQR_Status)

            .input('EvolveCustQR_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolveCustQR_UpdatedAt', Evolve.Sql.NVarChar, dateTime)

                .query("UPDATE EvolveCustQR SET EvolveCustQRTemplate_ID=@EvolveCustQRTemplate_ID ,EvolveCustQR_Name = @EvolveCustQR_Name ,  EvolveCustQR_Code = @EvolveCustQR_Code, EvolveCustQR_IndexNumber = @EvolveCustQR_IndexNumber, EvolveCustQR_Separator = @EvolveCustQR_Separator, EvolveCustQR_ValueType = @EvolveCustQR_ValueType,EvolveCustQR_Static_Value = @EvolveCustQR_Static_Value, EvolveCustQR_IsSingle = @EvolveCustQR_IsSingle, EvolveCustQR_Table = @EvolveCustQR_Table, EvolveCustQR_Field =@EvolveCustQR_Field, EvolveCustQR_MatchFeild = @EvolveCustQR_MatchFeild, EvolveCustQR_Status = @EvolveCustQR_Status, EvolveCustQR_UpdatedUser = @EvolveCustQR_UpdatedUser, EvolveCustQR_UpdatedAt = @EvolveCustQR_UpdatedAt WHERE EvolveCustQR_ID = @EvolveCustQR_ID");
        } catch (error) {
            Evolve.Log.error(" EERR2607: Error while update Cust QR " + error.message);
            return new Error(" EERR2607: Error while update Cust QR " + error.message);
        }
    },
    getSingleCustQR: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCustQR_ID', Evolve.Sql.Int, data.EvolveCustQR_ID)
                .query('SELECT * FROM EvolveCustQR WHERE EvolveCustQR_ID = @EvolveCustQR_ID');
        } catch (error) { 
            Evolve.Log.error(" EERR2608: Error while get Cust QR " + error.message);
            return new Error(" EERR2608: Error while get Cust QR " + error.message);
        }
    },
   


}