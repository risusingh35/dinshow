'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getStateListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('SELECT COUNT(EvolveState_ID) as count FROM EvolveState WHERE (EvolveState_Name LIKE @search OR EvolveState_City LIKE @search OR EvolveState_Code LIKE @search)');
        } catch (error) {
            Evolve.Log.error(" EERR3037: Error while get State count "+error.message);
            return new Error(" EERR3037: Error while get State count "+error.message);
        }
    },

    getStateList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query('SELECT * FROM EvolveState WHERE EvolveState_Name LIKE @search OR EvolveState_City LIKE @search OR EvolveState_Code LIKE @search ORDER BY EvolveState_ID DESC  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR3038: Error while get State list "+error.message);
            return new Error(" EERR3038: Error while get State list "+error.message);
        }
    },
    addState: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveState_Name', Evolve.Sql.NVarChar, data.EvolveState_Name)
                .input('EvolveState_Code', Evolve.Sql.NVarChar, data.EvolveState_Code)
                .input('EvolveState_City', Evolve.Sql.NVarChar, data.EvolveState_City)
                .input('EvolveState_Pin', Evolve.Sql.NVarChar, data.EvolveState_Pin)
                .input('EvolveState_Status', Evolve.Sql.Bit, data.EvolveState_Status)
                .input('EvolveState_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveState_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveState_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveState_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveState (EvolveState_Name, EvolveState_Code, EvolveState_City, EvolveState_Pin, EvolveState_Status, EvolveState_CreatedAt, EvolveState_CreatedUser, EvolveState_UpdatedAt, EvolveState_UpdatedUser) VALUES (@EvolveState_Name, @EvolveState_Code, @EvolveState_City, @EvolveState_Pin, @EvolveState_Status, @EvolveState_CreatedAt, @EvolveState_CreatedUser, @EvolveState_UpdatedAt, @EvolveState_UpdatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR3039: Erorr while add state code "+error.message);
            return new Error(" EERR3039: Erorr while add state code "+error.message);
        }
    },
    getSingleState: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveState_ID', Evolve.Sql.Int, data.EvolveState_ID)
                .query('SELECT * FROM EvolveState WHERE EvolveState_ID=@EvolveState_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR3040: Error while get single State "+error.message);
            return new Error(" EERR3040: Error while get single State "+error.message);
        }
    },

    updateState: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveState_ID', Evolve.Sql.Int, data.EvolveState_ID)
                .input('EvolveState_Name', Evolve.Sql.NVarChar, data.EvolveState_Name)
                .input('EvolveState_Code', Evolve.Sql.NVarChar, data.EvolveState_Code)
                .input('EvolveState_City', Evolve.Sql.NVarChar, data.EvolveState_City)
                .input('EvolveState_Pin', Evolve.Sql.NVarChar, data.EvolveState_Pin)
                .input('EvolveState_Status', Evolve.Sql.Bit, data.EvolveState_Status)
                .input('EvolveState_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveState_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveState SET  EvolveState_Name = @EvolveState_Name,EvolveState_Code = @EvolveState_Code, EvolveState_City = @EvolveState_City, EvolveState_Pin = @EvolveState_Pin, EvolveState_Status = @EvolveState_Status, EvolveState_UpdatedAt = @EvolveState_UpdatedAt, EvolveState_UpdatedUser = @EvolveState_UpdatedUser WHERE EvolveState_ID = @EvolveState_ID');
        } catch (error) {
            Evolve.Log.error(" EERR3041: Error while update State "+error.message);
            return new Error(" EERR3041: Error while update State "+error.message);
        }
    },
    
    checkDataExits: async function (EvolveState_Pin) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveState_Pin', Evolve.Sql.Int, EvolveState_Pin)
                .query('SELECT * FROM EvolveState WHERE EvolveState_Pin=@EvolveState_Pin');
        } catch (error) {
            Evolve.Log.error(" EERR3040: Error while get single State "+error.message);
            return new Error(" EERR3040: Error while get single State "+error.message);
        }
    },
    addStateCsv: async function (data, table) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()  
                .input('EvolveState_Name', Evolve.Sql.NVarChar, table['STATE NAME'])
                .input('EvolveState_Code', Evolve.Sql.NVarChar, table['STATE CODE'])
                .input('EvolveState_City', Evolve.Sql.NVarChar, table['CITY'])
                .input('EvolveState_Pin', Evolve.Sql.NVarChar, table['PIN CODE'])
                .input('EvolveState_Status', Evolve.Sql.Bit, true)
                .input('EvolveState_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveState_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveState_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveState_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveState (EvolveState_Name, EvolveState_Code, EvolveState_City, EvolveState_Pin, EvolveState_Status, EvolveState_CreatedAt, EvolveState_CreatedUser, EvolveState_UpdatedAt, EvolveState_UpdatedUser) VALUES (@EvolveState_Name, @EvolveState_Code, @EvolveState_City, @EvolveState_Pin, @EvolveState_Status, @EvolveState_CreatedAt, @EvolveState_CreatedUser, @EvolveState_UpdatedAt, @EvolveState_UpdatedUser)');

        } catch (error) {
            Evolve.Log.error("EERR3122 : Error while adding State "+error.message);
            return new Error("EERR3122 : Error while adding State "+error.message);
        }
    },
    UpdateStateCsv: async function (data, table) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveState_ID', Evolve.Sql.Int, table.EvolveState_ID)
                .input('EvolveState_Name', Evolve.Sql.NVarChar, table['STATE NAME'])
                .input('EvolveState_Code', Evolve.Sql.NVarChar, table['STATE CODE'])
                .input('EvolveState_City', Evolve.Sql.NVarChar, table['CITY'])
                .input('EvolveState_Pin', Evolve.Sql.NVarChar, table['PIN CODE'])
                .input('EvolveState_Status', Evolve.Sql.Bit, true)
                .input('EvolveState_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveState_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveState SET  EvolveState_Name = @EvolveState_Name,EvolveState_Code = @EvolveState_Code, EvolveState_City = @EvolveState_City, EvolveState_Pin = @EvolveState_Pin, EvolveState_Status = @EvolveState_Status, EvolveState_UpdatedAt = @EvolveState_UpdatedAt, EvolveState_UpdatedUser = @EvolveState_UpdatedUser WHERE EvolveState_ID = @EvolveState_ID');
        } catch (error) {
            Evolve.Log.error("EERR3124 : Error while updating State "+error.message);
            return new Error("EERR3124 : Error while updating State "+error.message);
        }
    },
    
}