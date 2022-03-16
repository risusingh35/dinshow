'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getConfigListCount : async function (search) {
          try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
          .query("SELECT COUNT(EvolveConfig_ID) as count from EvolveConfig where EvolveConfig_Key LIKE @search OR EvolveConfig_Value LIKE @search")
          } catch (error) {
            Evolve.Log.error(" Error while getting Config list Count"+error.message);
            return new Error("Error while getting Config list Count"+error.message);
          }
    },

    getConfigList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
            .input('start',Evolve.Sql.Int,start)
            .input('length',Evolve.Sql.Int,length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
          .query("SELECT * FROM [EvolveConfig] WHERE EvolveConfig_Key LIKE @search OR EvolveConfig_Value LIKE @search ORDER BY EvolveConfig_ID DESC OFFSET @start  ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1189: Error while getting Config list "+error.message);
            return new Error(" EERR1189: Error while getting Config list "+error.message);
        }
    },
    addConfig: async function (data) {
        try {
            console.log("entered in add>>> ")
        
            return await Evolve.SqlPool.request()
               
                .input('EvolveConfig_Key', Evolve.Sql.NVarChar, data.EvolveConfig_Key)
                .input('EvolveConfig_Value', Evolve.Sql.NVarChar, data.EvolveConfig_Value)
                .input('EvolveConfig_Desc', Evolve.Sql.NVarChar, data.EvolveConfig_Desc)
              

                .query("INSERT INTO EvolveConfig (EvolveConfig_Key, EvolveConfig_Value, EvolveConfig_Desc)VALUES(@EvolveConfig_Key, @EvolveConfig_Value, @EvolveConfig_Desc)");

        } catch (error) {
            Evolve.Log.error(" EERR1190: Error while adding config "+error.message);
            return new Error(" EERR1190: Error while adding config "+error.message);
        }
    },

  

    getSingleConfigData: async function (data) {
        try {
            console.log("config services valled dd")

            return await Evolve.SqlPool.request()
                .input('EvolveConfig_ID', Evolve.Sql.Int, data.EvolveConfig_ID)
                .query('SELECT * FROM EvolveConfig WHERE EvolveConfig_ID = @EvolveConfig_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1191: Error while getting Single Config Data "+error.message);
            return new Error(" EERR1191: Error while getting Single Config Data "+error.message);
        }
    },

    updateConfig: async function (data) {

        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            console.log("update config  services caled >>> ")

            return await Evolve.SqlPool.request()
                .input('EvolveConfig_ID', Evolve.Sql.Int, data.EvolveConfig_ID)
                .input('EvolveConfig_Key', Evolve.Sql.NVarChar, data.EvolveConfig_Key)
                .input('EvolveConfig_Value', Evolve.Sql.NVarChar, data.EvolveConfig_Value)
                .input('EvolveConfig_Desc', Evolve.Sql.NVarChar, data.EvolveConfig_Desc)
                .query('UPDATE EvolveConfig SET EvolveConfig_Key = @EvolveConfig_Key, EvolveConfig_Value = @EvolveConfig_Value, EvolveConfig_Desc = @EvolveConfig_Desc WHERE EvolveConfig_ID = @EvolveConfig_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1192: Error while updating Config "+error.message);
            return new Error(" EERR1192: Error while updating Config "+error.message);
        }
    },

    checkConfig: async function (data , action) {
        try {
            if(action == "add")
            {
           
            return await Evolve.SqlPool.request()
                .input('EvolveConfig_Key', Evolve.Sql.NVarChar, data.EvolveConfig_Key)
                .query('SELECT * FROM EvolveConfig WHERE EvolveConfig_Key=@EvolveConfig_Key')
            }
            else{
                return await Evolve.SqlPool.request()
                .input('EvolveConfig_Key', Evolve.Sql.NVarChar, data.EvolveConfig_Key)
                .input('EvolveConfig_ID', Evolve.Sql.Int, data.EvolveConfig_ID)

                .query('SELECT * FROM EvolveConfig WHERE EvolveConfig_Key=@EvolveConfig_Key AND EvolveConfig_ID!=@EvolveConfig_ID ')
            }
        } catch (error) {
            Evolve.Log.error(" EERR1193: Error while checking Config "+error.message);
            return new Error(" EERR1193: Error while checking Config "+error.message);
        }
    },
    checkConfigExits: async function (EvolveConfig_Key) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveConfig_Key', Evolve.Sql.NVarChar, EvolveConfig_Key)
                .query('SELECT * FROM EvolveConfig WHERE EvolveConfig_Key LIKE @EvolveConfig_Key')
        } catch (error) {
            Evolve.Log.error("EERR3125 : Error while checking Config "+error.message);
            return new Error("EERR3125 : Error while checking Config "+error.message);
        }
    },
    addConfigCsv: async function (table) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()  
                .input('EvolveConfig_Key', Evolve.Sql.NVarChar, table['KEY'])
                .input('EvolveConfig_Value', Evolve.Sql.NVarChar, table['VALUE'])
                .input('EvolveConfig_Desc', Evolve.Sql.NVarChar, table['DESCRIPTION'])
                .query("INSERT INTO EvolveConfig (EvolveConfig_Key, EvolveConfig_Value, EvolveConfig_Desc)VALUES(@EvolveConfig_Key, @EvolveConfig_Value, @EvolveConfig_Desc)");

        } catch (error) {
            Evolve.Log.error("EERR3122 : Error while adding config "+error.message);
            return new Error("EERR3122 : Error while adding config "+error.message);
        }
    },
    UpdateConfigCsv: async function (table) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveConfig_ID', Evolve.Sql.Int, data.EvolveConfig_ID)
                .input('EvolveConfig_Key', Evolve.Sql.NVarChar, table['KEY'])
                .input('EvolveConfig_Value', Evolve.Sql.NVarChar, table['VALUE'])
                .input('EvolveConfig_Desc', Evolve.Sql.NVarChar, table['DESCRIPTION'])
                .query('UPDATE EvolveConfig SET EvolveConfig_Key = @EvolveConfig_Key, EvolveConfig_Value = @EvolveConfig_Value, EvolveConfig_Desc = @EvolveConfig_Desc WHERE EvolveConfig_ID = @EvolveConfig_ID');
        } catch (error) {
            Evolve.Log.error("EERR3124 : Error while updating Config "+error.message);
            return new Error("EERR3124 : Error while updating Config "+error.message);
        }
    },
}