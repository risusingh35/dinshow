'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getConfigListCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
          .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
          .query("SELECT COUNT(EvolveIOConfig_ID) as count FROM EvolveIOConfig WHERE EvolveIOConfig_Key LIKE @search OR EvolveIOConfig_Value LIKE @search")
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
    },

    getConfigList: async function (start, length,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start',Evolve.Sql.Int,start)
                .input('length',Evolve.Sql.Int,length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT * FROM EvolveIOConfig WHERE EvolveIOConfig_Key LIKE @search OR EvolveIOConfig_Value LIKE @search ORDER BY EvolveIOConfig_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error("Error while getting IO Config List Config list "+error.message);
            return new Error("Error while getting IO Config List Config list "+error.message);
        }
    },

    addConfig: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()  
                .input('EvolveIOConfig_Key', Evolve.Sql.NVarChar, data.EvolveIOConfig_Key)
                .input('EvolveIOConfig_Value', Evolve.Sql.NVarChar, data.EvolveIOConfig_Value)
                .input('EvolveIOConfig_Desc', Evolve.Sql.NVarChar, data.EvolveIOConfig_Desc)
                .input('EvolveIOConfig_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveIOConfig_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveIOConfig_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveIOConfig_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .query("INSERT INTO EvolveIOConfig (EvolveIOConfig_Key, EvolveIOConfig_Value, EvolveIOConfig_Desc,EvolveIOConfig_CreatedUser,EvolveIOConfig_CreatedAt,EvolveIOConfig_UpdatedUser,EvolveIOConfig_UpdatedAt)VALUES(@EvolveIOConfig_Key, @EvolveIOConfig_Value, @EvolveIOConfig_Desc,@EvolveIOConfig_CreatedUser,@EvolveIOConfig_CreatedAt,@EvolveIOConfig_UpdatedUser,@EvolveIOConfig_UpdatedAt)");

        } catch (error) {
            Evolve.Log.error("Error while adding E-Invoice config "+error.message);
            return new Error("Error while adding E-Invoice config "+error.message);
        }
    },

    getSingleConfigData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveIOConfig_ID', Evolve.Sql.Int, data.EvolveIOConfig_ID)
                .query('SELECT * FROM EvolveIOConfig WHERE EvolveIOConfig_ID = @EvolveIOConfig_ID')
        } catch (error) {
            Evolve.Log.error("Error while getting single eInvoice config "+error.message);
            return new Error("Error while getting single eInvoice config "+error.message);
        }
    },

    updateConfig: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveIOConfig_ID', Evolve.Sql.Int, data.EvolveIOConfig_ID)
                .input('EvolveIOConfig_Key', Evolve.Sql.NVarChar, data.EvolveIOConfig_Key)
                .input('EvolveIOConfig_Value', Evolve.Sql.NVarChar, data.EvolveIOConfig_Value)
                .input('EvolveIOConfig_Desc', Evolve.Sql.NVarChar, data.EvolveIOConfig_Desc)
                .input('EvolveIOConfig_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveIOConfig_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveIOConfig SET EvolveIOConfig_Key = @EvolveIOConfig_Key, EvolveIOConfig_Value = @EvolveIOConfig_Value, EvolveIOConfig_Desc = @EvolveIOConfig_Desc , EvolveIOConfig_UpdatedAt = @EvolveIOConfig_UpdatedAt ,  EvolveIOConfig_UpdatedUser = @EvolveIOConfig_UpdatedUser WHERE EvolveIOConfig_ID = @EvolveIOConfig_ID');
        } catch (error) {
            Evolve.Log.error("Error while updating eInvoice Config "+error.message);
            return new Error("Error while updating eInvoice Config "+error.message);
        }
    },

    checkConfig: async function (data , action) {
        try {
            if(action == "add")
            {
                return await Evolve.SqlPool.request()
                    .input('EvolveIOConfig_Key', Evolve.Sql.NVarChar, data.EvolveIOConfig_Key)
                    .query('SELECT * FROM EvolveIOConfig WHERE EvolveIOConfig_Key LIKE @EvolveIOConfig_Key')
            }
            else{
                return await Evolve.SqlPool.request()
                    .input('EvolveIOConfig_Key', Evolve.Sql.NVarChar, data.EvolveIOConfig_Key)
                    .input('EvolveIOConfig_ID', Evolve.Sql.Int, data.EvolveIOConfig_ID)
                    .query('SELECT * FROM EvolveIOConfig WHERE EvolveIOConfig_Key LIKE @EvolveIOConfig_Key AND EvolveIOConfig_ID != @EvolveIOConfig_ID ')
            }
        } catch (error) {
            Evolve.Log.error("Error while checking E-Invoice Config "+error.message);
            return new Error("Error while checking E-Invoice Config "+error.message);
        }
    },
    checkConfigExits: async function (EvolveIOConfig_Key) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveIOConfig_Key', Evolve.Sql.NVarChar, EvolveIOConfig_Key)
                .query('SELECT * FROM EvolveIOConfig WHERE EvolveIOConfig_Key LIKE @EvolveIOConfig_Key')
        } catch (error) {
            Evolve.Log.error("EERR3125 : Error while checking IO Config "+error.message);
            return new Error("EERR3125 : Error while checking IO Config "+error.message);
        }
    },
    addConfigCsv: async function (table, data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()  
                .input('EvolveIOConfig_Key', Evolve.Sql.NVarChar, table['KEY'])
                .input('EvolveIOConfig_Value', Evolve.Sql.NVarChar, table['VALUE'])
                .input('EvolveIOConfig_Desc', Evolve.Sql.NVarChar, table['DESCRIPTION'])

                .input('EvolveIOConfig_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveIOConfig_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveIOConfig_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveIOConfig_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .query("INSERT INTO EvolveIOConfig (EvolveIOConfig_Key, EvolveIOConfig_Value, EvolveIOConfig_Desc, EvolveIOConfig_CreatedUser, EvolveIOConfig_CreatedAt, EvolveIOConfig_UpdatedUser, EvolveIOConfig_UpdatedAt)VALUES(@EvolveIOConfig_Key, @EvolveIOConfig_Value, @EvolveIOConfig_Desc, @EvolveIOConfig_CreatedUser, @EvolveIOConfig_CreatedAt, @EvolveIOConfig_UpdatedUser, @EvolveIOConfig_UpdatedAt)");

        } catch (error) {
            Evolve.Log.error("EERR3122 : Error while adding IO config  "+error.message);
            return new Error("EERR3122 : Error while adding IO config  "+error.message);
        }
    },
    UpdateConfigCsv: async function (table, data) {
        let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveIOConfig_ID', Evolve.Sql.Int, table.EvolveIOConfig_ID)
                .input('EvolveIOConfig_Key', Evolve.Sql.NVarChar, table['KEY'])
                .input('EvolveIOConfig_Value', Evolve.Sql.NVarChar, table['VALUE'])
                .input('EvolveIOConfig_Desc', Evolve.Sql.NVarChar, table['DESCRIPTION'])

                .input('EvolveIOConfig_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveIOConfig_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
                .query('UPDATE EvolveIOConfig SET EvolveIOConfig_Key = @EvolveIOConfig_Key, EvolveIOConfig_Value = @EvolveIOConfig_Value, EvolveIOConfig_Desc = @EvolveIOConfig_Desc, EvolveIOConfig_UpdatedUser = @EvolveIOConfig_UpdatedUser, EvolveIOConfig_UpdatedAt = @EvolveIOConfig_UpdatedAt WHERE EvolveIOConfig_ID = @EvolveIOConfig_ID');
        } catch (error) {
            Evolve.Log.error("EERR3124 : Error while updating IO Config "+error.message);
            return new Error("EERR3124 : Error while updating IO Config "+error.message);
        }
    },
}