'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    
    getSerialNumberCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
          .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
          .query("SELECT COUNT(es.EvolveSerial_ID) as count FROM EvolveSerial es, EvolveUnit eu, EvolveModel em WHERE es.EvolveModel_ID = em.EvolveModel_ID AND es.EvolveUnit_ID = eu.EvolveUnit_ID AND EvolveSerial_Code LIKE @search")
        } catch (error) {
            Evolve.Log.error(" EERR32701: Error while getting Serial Number List Count "+error.message);
            return new Error(" EERR32701: Error while getting Serial Number List Count "+error.message);
        }
      },

    getSerialNumberList: async function (start, length,search) {
        try {
            console.log(search , 'search string');
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query('SELECT es.*, eu.EvolveUnit_Code, em.EvolveModel_Code FROM EvolveSerial es, EvolveUnit eu, EvolveModel em WHERE es.EvolveModel_ID = em.EvolveModel_ID AND es.EvolveUnit_ID = eu.EvolveUnit_ID AND es.EvolveSerial_Code LIKE @search ORDER BY es.EvolveSerial_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR32702: Error while getting Serial Number List "+error.message);
            return new Error(" EERR32702: Error while getting Serial Number List "+error.message);
        }
    },

    getUnitId: async function (EvolveUnit_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUnit_Code', Evolve.Sql.NVarChar, EvolveUnit_Code)
                .query('SELECT EvolveUnit_ID FROM EvolveUnit WHERE EvolveUnit_Code = @EvolveUnit_Code')
        } catch (error) {
            Evolve.Log.error(" EERR32703: Error while get unit id " + error.message);
            return new Error(" EERR32703: Error while get unit id " + error.message);
        }
    },

    addSerialNumber: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveSerial_Code', Evolve.Sql.NVarChar, data.EvolveSerial_Code)
                .input('EvolveSerial_Desc', Evolve.Sql.NVarChar, data.EvolveSerial_Desc)
                .input('EvolveSerial_Prefix', Evolve.Sql.NVarChar, data.EvolveSerial_Prefix)
                .input('EvolveSerial_Start', Evolve.Sql.Int, data.EvolveSerial_Start)
                .input('EvolveSerial_Next', Evolve.Sql.Int, data.EvolveSerial_Next)
                .input('EvolveSerial_Width', Evolve.Sql.Int, data.EvolveSerial_Width)
                .input('EvolveSerial_Reset', Evolve.Sql.NVarChar, data.EvolveSerial_Reset)
                .input('Evolveunit_ID', Evolve.Sql.NVarChar, data.Evolveunit_ID)
                .input('EvolveModel_ID', Evolve.Sql.NVarChar, data.EvolveModel_ID)
                .input('EvolveSerial_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveSerial_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveSerial_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveSerial_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveSerial (EvolveSerial_Code, EvolveSerial_Desc, EvolveSerial_Prefix, EvolveSerial_Start, EvolveSerial_Next, EvolveSerial_Width, EvolveSerial_Reset, Evolveunit_ID, EvolveModel_ID, EvolveSerial_CreatedAt, EvolveSerial_CreatedUser, EvolveSerial_UpdatedAt, EvolveSerial_UpdatedUser) VALUES (@EvolveSerial_Code, @EvolveSerial_Desc, @EvolveSerial_Prefix, @EvolveSerial_Start, @EvolveSerial_Next,  @EvolveSerial_Width, @EvolveSerial_Reset, @Evolveunit_ID, @EvolveModel_ID, @EvolveSerial_CreatedAt, @EvolveSerial_CreatedUser, @EvolveSerial_UpdatedAt, @EvolveSerial_UpdatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR32704: Error while adding Serial Number "+error.message);
            return new Error(" EERR32704: Error while adding Serial Number "+error.message);
        }
    },

    editSerialNumber: async function (data) {
        try {
           let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
           return await Evolve.SqlPool.request()
               .input('EvolveSerial_ID', Evolve.Sql.Int, data.EvolveSerial_ID)
               .input('EvolveSerial_Code', Evolve.Sql.NVarChar, data.EvolveSerial_Code)
               .input('EvolveSerial_Desc', Evolve.Sql.NVarChar, data.EvolveSerial_Desc)
               .input('EvolveSerial_Prefix', Evolve.Sql.NVarChar, data.EvolveSerial_Prefix)
               .input('EvolveSerial_Start', Evolve.Sql.Int, data.EvolveSerial_Start)
               .input('EvolveSerial_Next', Evolve.Sql.Int, data.EvolveSerial_Next)
               .input('EvolveSerial_Width', Evolve.Sql.Int, data.EvolveSerial_Width)
               .input('EvolveSerial_Reset', Evolve.Sql.NVarChar, data.EvolveSerial_Reset)
               .input('Evolveunit_ID', Evolve.Sql.NVarChar, data.Evolveunit_ID)
               .input('EvolveModel_ID', Evolve.Sql.NVarChar, data.EvolveModel_ID)
               .input('EvolveSerial_UpdatedAt', Evolve.Sql.NVarChar, datetime)
               .input('EvolveSerial_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
               .query('UPDATE EvolveSerial SET EvolveSerial_Code = @EvolveSerial_Code, EvolveSerial_Desc = @EvolveSerial_Desc, EvolveSerial_Prefix = @EvolveSerial_Prefix, EvolveSerial_Start = @EvolveSerial_Start, EvolveSerial_Next = @EvolveSerial_Next, EvolveSerial_Width = @EvolveSerial_Width, EvolveSerial_Reset = @EvolveSerial_Reset, Evolveunit_ID = @Evolveunit_ID, EvolveModel_ID = @EvolveModel_ID, EvolveSerial_UpdatedAt = @EvolveSerial_UpdatedAt, EvolveSerial_UpdatedUser = @EvolveSerial_UpdatedUser WHERE EvolveSerial_ID = @EvolveSerial_ID');
            } catch (error) {
                Evolve.Log.error(" EERR32705: Error while updating Serial Number "+error.message);
                return new Error(" EERR32705: Error while updating Serial Number "+error.message);
            }
   },

    getSingleSerialNumber: async function (EvolveSerial_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSerial_ID', Evolve.Sql.Int, EvolveSerial_ID)
                .query('SELECT es.*, eu.EvolveUnit_Code, em.EvolveModel_Code FROM EvolveSerial es, EvolveUnit eu, EvolveModel em WHERE es.EvolveModel_ID = em.EvolveModel_ID AND es.EvolveUnit_ID = eu.EvolveUnit_ID AND EvolveSerial_ID = @EvolveSerial_ID');
        } catch (error) {
            Evolve.Log.error(" EERR32706: Error while getting Single Serial Number "+error.message);
            return new Error(" EERR32706: Error while getting Single Serial Number "+error.message);
        }
    },

    deleteSerialNumber: async function (EvolveSerial_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSerial_ID', Evolve.Sql.Int, EvolveSerial_ID)
                .query('DELETE FROM EvolveSerial WHERE EvolveSerial_ID =@EvolveSerial_ID')
        } catch (error) {
            Evolve.Log.error(" EERR32707: Error while deleting Serial Number "+error.message);
            return new Error(" EERR32707: Error while deleting Serial Number "+error.message);
        }
    },

    getModelList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query(" SELECT EvolveModel_ID, EvolveModel_Code FROM EvolveModel ");
        } catch (error) {
            Evolve.Log.error(" EERR32708: Error while getting Model List "+error.message);
            return new Error(" EERR32708: Error while getting Model List "+error.message);
        }
    },

    getUnitList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query(" SELECT EvolveUnit_ID, EvolveUnit_Code FROM EvolveUnit ");
        } catch (error) {
            Evolve.Log.error(" EERR32709: Error while getting Unit List "+error.message);
            return new Error(" EERR32709: Error while getting Unit List "+error.message);
        }
    },

}