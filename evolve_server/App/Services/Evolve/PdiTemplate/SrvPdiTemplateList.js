'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

        addPDITemp: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePDITemplate_ID', Evolve.Sql.Int, data.EvolvePDITemplate_ID)
                .input('EvolvePDITemplateDetail_Label', Evolve.Sql.NVarChar, data.EvolvePDITemplateDetail_Label)
                .input('EvolvePDITemplateDetail_Type', Evolve.Sql.NVarChar, data.EvolvePDITemplateDetail_Type)
                .input('EvolvePDITemplateDetail_Value', Evolve.Sql.NVarChar, data.EvolvePDITemplateDetail_Value)
                .query('INSERT INTO EvolvePDITemplateDetail (EvolvePDITemplate_ID,EvolvePDITemplateDetail_Label,EvolvePDITemplateDetail_Type,EvolvePDITemplateDetail_Value) VALUES (@EvolvePDITemplate_ID, @EvolvePDITemplateDetail_Label,@EvolvePDITemplateDetail_Type, @EvolvePDITemplateDetail_Value)');
        } catch (error) {
            Evolve.Log.error(" EERR1348: Error while adding PDI Template "+error.message);
            return new Error(" EERR1348: Error while adding PDI Template "+error.message);
        }
    },

    updatePDITempDetail: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePDITemplateDetail_ID', Evolve.Sql.Int, data.EvolvePDITemplateDetail_ID)
                .input('EvolvePDITemplate_ID', Evolve.Sql.Int, data.EvolvePDITemplate_ID)
                .input('EvolvePDITemplateDetail_Label', Evolve.Sql.NVarChar, data.EvolvePDITemplateDetail_Label)
                .input('EvolvePDITemplateDetail_Type', Evolve.Sql.NVarChar, data.EvolvePDITemplateDetail_Type)
                .input('EvolvePDITemplateDetail_Value', Evolve.Sql.NVarChar, data.EvolvePDITemplateDetail_Value)
                .query('UPDATE EvolvePDITemplateDetail SET EvolvePDITemplate_ID = @EvolvePDITemplate_ID, EvolvePDITemplateDetail_Label = @EvolvePDITemplateDetail_Label, EvolvePDITemplateDetail_Type = @EvolvePDITemplateDetail_Type, EvolvePDITemplateDetail_Value = @EvolvePDITemplateDetail_Value WHERE EvolvePDITemplateDetail_ID = @EvolvePDITemplateDetail_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1349: Error while updating PDI Temp Detail "+error.message);
            return new Error(" EERR1349: Error while updating PDI Temp Detail "+error.message);
        }
    },

    
    addPDITempCode: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePDITemplate_Code', Evolve.Sql.NVarChar, data.EvolvePDITemplate_Code)
                .query('INSERT INTO EvolvePDITemplate (EvolvePDITemplate_Code) VALUES (@EvolvePDITemplate_Code)');
        } catch (error) {
            Evolve.Log.error(" EERR1350: Error while adding PDI Temp Code "+error.message);
            return new Error(" EERR1350: Error while adding PDI Temp Code "+error.message);
        }
    },
    selectSinglePDITemp: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePDITemplateDetail_ID', Evolve.Sql.Int, data.EvolvePDITemplateDetail_ID)
                .query('  SELECT * FROM EvolvePDITemplateDetail  WHERE EvolvePDITemplateDetail_ID = @EvolvePDITemplateDetail_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1351: Error while selecting Single PDI Temp "+error.message);
            return new Error(" EERR1351: Error while selecting Single PDI Temp "+error.message);
        }
    },

    getPDITempCode: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT * FROM EvolvePDITemplate')
        } catch (error) {
            Evolve.Log.error(" EERR1352: Error while getting PDI Temp Code "+error.message);
            return new Error(" EERR1352: Error while getting PDI Temp Code "+error.message);
        }
    },
    getPDITempDetailListCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
          .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
          .query("SELECT COUNT(pditd.EvolvePDITemplate_ID) as count from EvolvePDITemplateDetail pditd join EvolvePDITemplate pdit ON pditd.EvolvePDITemplate_ID = pdit.EvolvePDITemplate_ID WHERE  pdit.EvolvePDITemplate_Code LIKE @search OR pditd.EvolvePDITemplateDetail_Label LIKE @search")
        } catch (error) {
          Evolve.Log.error(" EERR3063: Error while get pdi template Count "+error.message);
          return new Error(" EERR3063: Error while get pdi template Count "+error.message);
        }
      },

    getPDITempDetailList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

                .query('SELECT pditd.*, pdit.EvolvePDITemplate_Code from EvolvePDITemplateDetail pditd join EvolvePDITemplate pdit ON pditd.EvolvePDITemplate_ID = pdit.EvolvePDITemplate_ID WHERE  pdit.EvolvePDITemplate_Code LIKE @search OR pditd.EvolvePDITemplateDetail_Label LIKE @search  ORDER BY EvolvePDITemplateDetail_ID OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR1353: Error while getting PDI Temp Detail List "+error.message);
            return new Error(" EERR1353: Error while getting PDI Temp Detail List "+error.message);
        }
    },

    deletePDITempDetail: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePDITemplateDetail_ID', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolvePDITemplateDetail WHERE EvolvePDITemplateDetail_ID =@EvolvePDITemplateDetail_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1354: Error while deleting PDI Temp Detail "+error.message);
            return new Error(" EERR1354: Error while deleting PDI Temp Detail "+error.message);
        }
    },








}