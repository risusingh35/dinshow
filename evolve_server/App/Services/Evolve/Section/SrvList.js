'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    
    getSectionListCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
          .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
          .query("SELECT COUNT(es.EvolveSection_ID) as count from EvolveSection es LEFT JOIN EvolveUnit eu on eu.EvolveUnit_ID = es.EvolveUnit_ID LEFT JOIN EvolveDepartment ed on ed.EvolveDepartment_ID = es.EvolveDepartment_ID WHERE (es.EvolveSection_Name LIKE @search or eu.EvolveUnit_Code LIKE @search or ed.EvolveDepartment_Code LIKE @search )" )
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
    getSectionList: async function (start, length,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query('SELECT es.* , eu.EvolveUnit_Code , ed.EvolveDepartment_Code from EvolveSection es LEFT JOIN EvolveUnit eu on eu.EvolveUnit_ID = es.EvolveUnit_ID LEFT JOIN EvolveDepartment ed on ed.EvolveDepartment_ID = es.EvolveDepartment_ID WHERE (es.EvolveSection_Name LIKE @search or eu.EvolveUnit_Code LIKE @search or ed.EvolveDepartment_Code LIKE @search ) ORDER BY EvolveSection_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ');
        } catch (error) {
            Evolve.Log.error(" EERR1414: Error while getting section list "+error.message);
            return new Error(" EERR1414: Error while getting section list "+error.message);
        }
    },

    addsection: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSection_Name', Evolve.Sql.NVarChar, data.EvolveSection_Name)
                .input('EvolveSection_Desc', Evolve.Sql.NVarChar, data.EvolveSection_Desc)
                .input('EvolveSection_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveSection_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveSection_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveSection_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveSection (EvolveSection_Name,EvolveSection_Desc,EvolveSection_CreatedUser,EvolveSection_CreatedAt,EvolveSection_UpdatedAt,EvolveSection_UpdatedUser) VALUES (@EvolveSection_Name,@EvolveSection_Desc,@EvolveSection_CreatedUser,@EvolveSection_CreatedAt,@EvolveSection_UpdatedAt,@EvolveSection_UpdatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR1415: Error while adding single section "+error.message);
            return new Error(" EERR1415: Error while adding single section "+error.message);
        }
    },
    getSingleSection: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSection_ID', Evolve.Sql.Int, data.id)
                .query('SELECT * FROM EvolveSection WHERE EvolveSection_ID = @EvolveSection_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1416: Error while getting Single Section "+error.message);
            return new Error(" EERR1416: Error while getting Single Section "+error.message);
        }
    },

    deleteSection: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSection_ID', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveSection WHERE EvolveSection_ID =@EvolveSection_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1417: Error while deleting Section "+error.message);
            return new Error(" EERR1417: Error while deleting Section "+error.message);
        }
    },

    updateSection: async function (data) {

        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSection_ID', Evolve.Sql.Int, data.EvolveSection_ID)
                .input('EvolveSection_Name', Evolve.Sql.NVarChar, data.EvolveSection_Name)
                .input('EvolveSection_Desc', Evolve.Sql.NVarChar, data.EvolveSection_Desc)
                .input('EvolveSection_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveSection_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveSection_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveSection SET EvolveSection_Name = @EvolveSection_Name, EvolveSection_Desc = @EvolveSection_Desc, EvolveSection_UpdatedAt = @EvolveSection_UpdatedAt, EvolveSection_UpdatedUser = @EvolveSection_UpdatedUser WHERE EvolveSection_ID = @EvolveSection_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1418: Error while updating Section "+error.message);
            return new Error(" EERR1418: Error while updating Section "+error.message);
        }
    },
}