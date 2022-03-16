'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getInvoiceConfigCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query('  SELECT COUNT(EvolveEinvoiceConfig_ID) as count  FROM EvolveEinvoiceConfig  WHERE EvolveEinvoiceConfig_Key LIKE @search OR EvolveEinvoiceConfig_Value LIKE @search');
        } catch (error) {
            Evolve.Log.error(" EERR3120: Error while getting config count " + error.message);
            return new Error(" EERR3120: Error while getting config count " + error.message);
        }
    },
    getConfigList: async function (start, length, search) {
        try {
            let offsetQry = '';
            if(search==''){
                offsetQry = 'OFFSET @start ROWS FETCH NEXT @length ROWS ONLY';
            }
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT * FROM EvolveEinvoiceConfig WHERE EvolveEinvoiceConfig_Key LIKE @search OR EvolveEinvoiceConfig_Value LIKE @search ORDER BY EvolveEinvoiceConfig_ID DESC "+offsetQry);
        } catch (error) {
            Evolve.Log.error("EERR3121 : Error while getting eInvoice Config list " + error.message);
            return new Error("EERR3121 : Error while getting eInvoice Config list " + error.message);
        }
    },
    addConfig: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoiceConfig_Key', Evolve.Sql.NVarChar, data.EvolveEinvoiceConfig_Key)
                .input('EvolveEinvoiceConfig_Value', Evolve.Sql.NVarChar, data.EvolveEinvoiceConfig_Value)
                .input('EvolveEinvoiceConfig_Desc', Evolve.Sql.NVarChar, data.EvolveEinvoiceConfig_Desc)
                .input('EvolveEinvoiceConfig_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveEinvoiceConfig_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveEinvoiceConfig_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveEinvoiceConfig_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .query("INSERT INTO EvolveEinvoiceConfig (EvolveEinvoiceConfig_Key, EvolveEinvoiceConfig_Value, EvolveEinvoiceConfig_Desc,EvolveEinvoiceConfig_CreatedUser,EvolveEinvoiceConfig_CreatedAt,EvolveEinvoiceConfig_UpdatedUser,EvolveEinvoiceConfig_UpdatedAt)VALUES(@EvolveEinvoiceConfig_Key, @EvolveEinvoiceConfig_Value, @EvolveEinvoiceConfig_Desc,@EvolveEinvoiceConfig_CreatedUser,@EvolveEinvoiceConfig_CreatedAt,@EvolveEinvoiceConfig_UpdatedUser,@EvolveEinvoiceConfig_UpdatedAt)");

        } catch (error) {
            Evolve.Log.error("EERR3122 : Error while adding E-Invoice config " + error.message);
            return new Error("EERR3122 : Error while adding E-Invoice config " + error.message);
        }
    },

    getSingleConfigData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoiceConfig_ID', Evolve.Sql.Int, data.EvolveEinvoiceConfig_ID)
                .query('SELECT * FROM EvolveEinvoiceConfig WHERE EvolveEinvoiceConfig_ID = @EvolveEinvoiceConfig_ID')
        } catch (error) {
            Evolve.Log.error("EERR3123 : Error while getting single eInvoice config " + error.message);
            return new Error("EERR3123 : Error while getting single eInvoice config " + error.message);
        }
    },

    updateConfig: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoiceConfig_ID', Evolve.Sql.Int, data.EvolveEinvoiceConfig_ID)
                .input('EvolveEinvoiceConfig_Key', Evolve.Sql.NVarChar, data.EvolveEinvoiceConfig_Key)
                .input('EvolveEinvoiceConfig_Value', Evolve.Sql.NVarChar, data.EvolveEinvoiceConfig_Value)
                .input('EvolveEinvoiceConfig_Desc', Evolve.Sql.NVarChar, data.EvolveEinvoiceConfig_Desc)
                .input('EvolveEinvoiceConfig_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveEinvoiceConfig_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveEinvoiceConfig SET EvolveEinvoiceConfig_Key = @EvolveEinvoiceConfig_Key, EvolveEinvoiceConfig_Value = @EvolveEinvoiceConfig_Value, EvolveEinvoiceConfig_Desc = @EvolveEinvoiceConfig_Desc , EvolveEinvoiceConfig_UpdatedAt = @EvolveEinvoiceConfig_UpdatedAt ,  EvolveEinvoiceConfig_UpdatedUser = @EvolveEinvoiceConfig_UpdatedUser WHERE EvolveEinvoiceConfig_ID = @EvolveEinvoiceConfig_ID');
        } catch (error) {
            Evolve.Log.error("EERR3124 : Error while updating eInvoice Config " + error.message);
            return new Error("EERR3124 : Error while updating eInvoice Config " + error.message);
        }
    },

    checkConfig: async function (data, action) {
        try {
            if (action == "add") {
                return await Evolve.SqlPool.request()
                    .input('EvolveEinvoiceConfig_Key', Evolve.Sql.NVarChar, data.EvolveEinvoiceConfig_Key)
                    .query('SELECT * FROM EvolveEinvoiceConfig WHERE EvolveEinvoiceConfig_Key LIKE @EvolveEinvoiceConfig_Key')
            }
            else {
                return await Evolve.SqlPool.request()
                    .input('EvolveEinvoiceConfig_Key', Evolve.Sql.NVarChar, data.EvolveEinvoiceConfig_Key)
                    .input('EvolveEinvoiceConfig_ID', Evolve.Sql.Int, data.EvolveEinvoiceConfig_ID)
                    .query('SELECT * FROM EvolveEinvoiceConfig WHERE EvolveEinvoiceConfig_Key LIKE @EvolveEinvoiceConfig_Key AND EvolveEinvoiceConfig_ID != @EvolveEinvoiceConfig_ID ')
            }
        } catch (error) {
            Evolve.Log.error("EERR3125 : Error while checking E-Invoice Config " + error.message);
            return new Error("EERR3125 : Error while checking E-Invoice Config " + error.message);
        }
    },
    checkConfigExits: async function (EvolveEinvoiceConfig_Key) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoiceConfig_Key', Evolve.Sql.NVarChar, EvolveEinvoiceConfig_Key)
                .query('SELECT * FROM EvolveEinvoiceConfig WHERE EvolveEinvoiceConfig_Key LIKE @EvolveEinvoiceConfig_Key')
        } catch (error) {
            Evolve.Log.error("EERR3125 : Error while checking E-Invoice Config " + error.message);
            return new Error("EERR3125 : Error while checking E-Invoice Config " + error.message);
        }
    },
    addConfigCsv: async function (data, table) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoiceConfig_Key', Evolve.Sql.NVarChar, table['KEY'])
                .input('EvolveEinvoiceConfig_Value', Evolve.Sql.NVarChar, table['VALUE'])
                .input('EvolveEinvoiceConfig_Desc', Evolve.Sql.NVarChar, table['DESCRIPTION'])
                .input('EvolveEinvoiceConfig_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveEinvoiceConfig_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveEinvoiceConfig_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveEinvoiceConfig_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .query("INSERT INTO EvolveEinvoiceConfig (EvolveEinvoiceConfig_Key, EvolveEinvoiceConfig_Value, EvolveEinvoiceConfig_Desc,EvolveEinvoiceConfig_CreatedUser,EvolveEinvoiceConfig_CreatedAt,EvolveEinvoiceConfig_UpdatedUser,EvolveEinvoiceConfig_UpdatedAt)VALUES(@EvolveEinvoiceConfig_Key, @EvolveEinvoiceConfig_Value, @EvolveEinvoiceConfig_Desc,@EvolveEinvoiceConfig_CreatedUser,@EvolveEinvoiceConfig_CreatedAt,@EvolveEinvoiceConfig_UpdatedUser,@EvolveEinvoiceConfig_UpdatedAt)");

        } catch (error) {
            Evolve.Log.error("EERR3122 : Error while adding E-Invoice config " + error.message);
            return new Error("EERR3122 : Error while adding E-Invoice config " + error.message);
        }
    },
    UpdateConfigCsv: async function (data, table) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoiceConfig_ID', Evolve.Sql.Int, table.EvolveEinvoiceConfig_ID)
                .input('EvolveEinvoiceConfig_Key', Evolve.Sql.NVarChar, table['KEY'])
                .input('EvolveEinvoiceConfig_Value', Evolve.Sql.NVarChar, table['VALUE'])
                .input('EvolveEinvoiceConfig_Desc', Evolve.Sql.NVarChar, table['DESCRIPTION'])
                .input('EvolveEinvoiceConfig_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveEinvoiceConfig_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveEinvoiceConfig SET EvolveEinvoiceConfig_Key = @EvolveEinvoiceConfig_Key, EvolveEinvoiceConfig_Value = @EvolveEinvoiceConfig_Value, EvolveEinvoiceConfig_Desc = @EvolveEinvoiceConfig_Desc , EvolveEinvoiceConfig_UpdatedAt = @EvolveEinvoiceConfig_UpdatedAt ,  EvolveEinvoiceConfig_UpdatedUser = @EvolveEinvoiceConfig_UpdatedUser WHERE EvolveEinvoiceConfig_ID = @EvolveEinvoiceConfig_ID');
        } catch (error) {
            Evolve.Log.error("EERR3124 : Error while updating eInvoice Config " + error.message);
            return new Error("EERR3124 : Error while updating eInvoice Config " + error.message);
        }
    }
}