'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllLabelCommandListCount : async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
       .query("  SELECT count(EvolveStickerCmd_ID) as count FROM  EvolveStickerCmd WHERE EvolveStickerCmd_Code LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR32627: Error while  getting Label Command Master List Count "+error.message);
            return new Error(" EERR32627: Error while  getting Label Command Master List Count "+error.message);
        }
    },

    getAllLabelCommandList: async function (start , length ,search) {
        try {
            return await Evolve.SqlPool.request()
      .input('start',Evolve.Sql.Int,start)
      .input('length',Evolve.Sql.Int,length)
      .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
       .query(" SELECT * FROM EvolveStickerCmd WHERE EvolveStickerCmd_Code LIKE @search ORDER BY EvolveStickerCmd_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
       
        } catch (error) {
            Evolve.Log.error(" EERR32628: Error while  getting Label Command List "+error.message);
            return new Error(" EERR32628: Error while  getting Label Command List "+error.message);
        }
    },
    
    getParameters : async function (EvolveStickerCmd_ID) {
        try {
            return await Evolve.SqlPool.request()
      .input('EvolveStickerCmd_ID',Evolve.Sql.Int, EvolveStickerCmd_ID)
       .query(" SELECT * FROM EvolveStickerCmdParams WHERE EvolveStickerCmd_ID = @EvolveStickerCmd_ID ");
       
        } catch (error) {
            Evolve.Log.error(" EERR32629: Error while  getting parameter List "+error.message);
            return new Error(" EERR32629: Error while  getting parameter List "+error.message);
        }
    },

    checkLabelCmdExits : async function (EvolveStickerCmd_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveStickerCmd_Code', Evolve.Sql.NVarChar, EvolveStickerCmd_Code)
                .query('SELECT EvolveStickerCmd_ID FROM EvolveStickerCmd WHERE EvolveStickerCmd_Code = @EvolveStickerCmd_Code')
        } catch (error) {
            Evolve.Log.error(" EERR32630: Error while checking Label Command exits "+error.message);
            return new Error(" EERR32630: Error while checking Label Command exits "+error.message);
        }
    },

    updateLabelCmdCsv : async function (table,data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveStickerCmd_ID', Evolve.Sql.Int, table['EvolveStickerCmd_ID'])
                .input('EvolveStickerCmd_Code', Evolve.Sql.NVarChar, table['EvolveLabelCmdCode'])
                .input('EvolveStickerCmd_Name', Evolve.Sql.NVarChar, table['EvolveLabelCmdName'])
                .input('EvolveStickerCmd_Desc', Evolve.Sql.Text, table['EvolveLabelCmdDesc'])
                .input('EvolveStickerCmd_Usage', Evolve.Sql.NVarChar, table['EvolveLabelUsage'])
                .input('EvolveStickerCmd_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveStickerCmd_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query('UPDATE EvolveStickerCmd SET EvolveStickerCmd_Code = @EvolveStickerCmd_Code, EvolveStickerCmd_Name = @EvolveStickerCmd_Name, EvolveStickerCmd_Desc = @EvolveStickerCmd_Desc, EvolveStickerCmd_Usage = @EvolveStickerCmd_Usage, EvolveStickerCmd_UpdatedUser = @EvolveStickerCmd_UpdatedUser, EvolveStickerCmd_UpdatedAt = @EvolveStickerCmd_UpdatedAt WHERE EvolveStickerCmd_ID = @EvolveStickerCmd_ID');
        } catch (error) {
            Evolve.Log.error(" EERR32631: Error while updating Label Command "+error.message);
            return new Error(" EERR32631: Error while updating Label Command "+error.message);
        }
    },

    addLabelCmdCsv : async function (table,data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()  
            .input('EvolveStickerCmd_Code', Evolve.Sql.NVarChar, table['EvolveLabelCmdCode'])
            .input('EvolveStickerCmd_Name', Evolve.Sql.NVarChar, table['EvolveLabelCmdName'])
            .input('EvolveStickerCmd_Desc', Evolve.Sql.Text, table['EvolveLabelCmdDesc'])
            .input('EvolveStickerCmd_Usage', Evolve.Sql.NVarChar, table['EvolveLabelUsage'])

                .input('EvolveStickerCmd_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveStickerCmd_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveStickerCmd_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveStickerCmd_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query("INSERT INTO EvolveStickerCmd (EvolveStickerCmd_Code, EvolveStickerCmd_Name, EvolveStickerCmd_Desc, EvolveStickerCmd_Usage, EvolveStickerCmd_CreatedUser, EvolveStickerCmd_CreatedAt, EvolveStickerCmd_UpdatedUser, EvolveStickerCmd_UpdatedAt) VALUES (@EvolveStickerCmd_Code, @EvolveStickerCmd_Name, @EvolveStickerCmd_Desc, @EvolveStickerCmd_Usage, @EvolveStickerCmd_CreatedUser, @EvolveStickerCmd_CreatedAt, @EvolveStickerCmd_UpdatedUser, @EvolveStickerCmd_UpdatedAt)");

        } catch (error) {
            Evolve.Log.error(" EERR32632: Error while adding Label Command  "+error.message);
            return new Error(" EERR32632: Error while adding Label Command  "+error.message);
        }
    },

    checkLabelCmdParamExits : async function (EvolveStickerCmdParams_Key,EvolveStickerCmd_ID ) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveStickerCmd_ID', Evolve.Sql.Int, EvolveStickerCmd_ID)
                .input('EvolveStickerCmdParams_Key', Evolve.Sql.NVarChar, EvolveStickerCmdParams_Key)
                .query('SELECT EvolveStickerCmdParams_ID FROM EvolveStickerCmdParams WHERE EvolveStickerCmd_ID = @EvolveStickerCmd_ID AND EvolveStickerCmdParams_Key = @EvolveStickerCmdParams_Key')
        } catch (error) {
            Evolve.Log.error(" EERR32633: Error while checking Label Command Params exits "+error.message);
            return new Error(" EERR32633: Error while checking Label Command Params exits "+error.message);
        }
    },

    addLabelCmdParamsCsv : async function (table, data ) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveStickerCmd_ID', Evolve.Sql.Int, table['EvolveStickerCmd_ID'])
                .input('EvolveStickerCmdParams_Key', Evolve.Sql.NVarChar, table['EvolveLabelCmdUsageKey'])
                .input('EvolveStickerCmdParams_Desc', Evolve.Sql.Text, table['EvolveLabelCmdUsageKeyDesc'])
                .input('EvolveStickerCmdParams_Val', Evolve.Sql.Text, table['EvolveLabelCmdUsageKeyValues'])

                .input('EvolveStickerCmdParams_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveStickerCmdParams_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveStickerCmdParams_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveStickerCmdParams_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query(' INSERT INTO EvolveStickerCmdParams (EvolveStickerCmd_ID, EvolveStickerCmdParams_Key, EvolveStickerCmdParams_Desc, EvolveStickerCmdParams_Val, EvolveStickerCmdParams_CreatedUser, EvolveStickerCmdParams_CreatedAt, EvolveStickerCmdParams_UpdatedUser, EvolveStickerCmdParams_UpdatedAt) VALUES (@EvolveStickerCmd_ID, @EvolveStickerCmdParams_Key, @EvolveStickerCmdParams_Desc, @EvolveStickerCmdParams_Val, @EvolveStickerCmdParams_CreatedUser, @EvolveStickerCmdParams_CreatedAt, @EvolveStickerCmdParams_UpdatedUser, @EvolveStickerCmdParams_UpdatedAt) ')
        } catch (error) {
            Evolve.Log.error(" EERR32634: Error while adding Label Command Params "+error.message);
            return new Error(" EERR32634: Error while adding Label Command Params "+error.message);
        }
    },

    updateLabelCmdParamsCsv : async function (table, data ) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveStickerCmd_ID', Evolve.Sql.Int, table['EvolveStickerCmd_ID'])
                .input('EvolveStickerCmdParams_Key', Evolve.Sql.NVarChar, table['EvolveLabelCmdUsageKey'])
                .input('EvolveStickerCmdParams_Desc', Evolve.Sql.Text, table['EvolveLabelCmdUsageKeyDesc'])
                .input('EvolveStickerCmdParams_Val', Evolve.Sql.Text, table['EvolveLabelCmdUsageKeyValues'])

                .input('EvolveStickerCmdParams_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveStickerCmdParams_UpdatedAt', Evolve.Sql.NVarChar, datetime)

                .query(' UPDATE EvolveStickerCmdParams SET EvolveStickerCmdParams_Desc = @EvolveStickerCmdParams_Desc, EvolveStickerCmdParams_Val = @EvolveStickerCmdParams_Val, EvolveStickerCmdParams_UpdatedUser = @EvolveStickerCmdParams_UpdatedUser, EvolveStickerCmdParams_UpdatedAt = @EvolveStickerCmdParams_UpdatedAt WHERE EvolveStickerCmd_ID = @EvolveStickerCmd_ID AND EvolveStickerCmdParams_Key = @EvolveStickerCmdParams_Key ')
        } catch (error) {
            Evolve.Log.error(" EERR32635: Error while updating Label Command Params csv "+error.message);
            return new Error(" EERR32635: Error while updating Label Command Params csv "+error.message);
        }
    },
}