'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addLocation: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveLocationGroup_ID', Evolve.Sql.Int, data.EvolveLocationGroup_ID)
                .input('EvolveLocation_Name', Evolve.Sql.NVarChar, data.EvolveLocation_Name)
                .input('EvolveLocation_Code', Evolve.Sql.NVarChar, data.EvolveLocation_Code)
                .input('EvolveLocation_Desc', Evolve.Sql.NVarChar, data.EvolveLocation_Desc)
                .input('EvolveLocation_Type', Evolve.Sql.NVarChar, data.EvolveLocation_Type)
                .input('EvolveLocation_Address', Evolve.Sql.NVarChar, data.EvolveLocation_Address)
                .input('EvolveLocation_Rule', Evolve.Sql.NVarChar, data.EvolveLocation_Rule)
                .input('EvolveStatusCodeMstr_Id', Evolve.Sql.Int, data.EvolveStatusCodeMstr_Id)

                // .input('EvolveLocation_Status', Evolve.Sql.NVarChar, data.EvolveLocation_Status)
                .input('EvolveLocation_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveLocation_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveLocation_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveLocation_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveLocation (EvolveLocationGroup_ID, EvolveLocation_Name, EvolveLocation_Code, EvolveLocation_Desc, EvolveLocation_Type, EvolveLocation_Address, EvolveLocation_CreatedAt, EvolveLocation_CreatedUser, EvolveLocation_UpdatedAt, EvolveLocation_UpdatedUser,EvolveLocation_Rule,EvolveStatusCodeMstr_Id)VALUES(@EvolveLocationGroup_ID, @EvolveLocation_Name, @EvolveLocation_Code, @EvolveLocation_Desc, @EvolveLocation_Type, @EvolveLocation_Address,   @EvolveLocation_CreatedAt, @EvolveLocation_CreatedUser, @EvolveLocation_UpdatedAt, @EvolveLocation_UpdatedUser , @EvolveLocation_Rule,@EvolveStatusCodeMstr_Id)");

        } catch (error) {
            Evolve.Log.error(" EERR1287: Error while adding location "+error.message);
            return new Error(" EERR1287: Error while adding location "+error.message);
        }
    },

    getAllLocationGroup: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveLocationGroup");
        } catch (error) {
            Evolve.Log.error(" EERR1288: Error while getting All Location Group "+error.message);
            return new Error(" EERR1288: Error while getting All Location Group "+error.message);
        }
    },
    getLocationListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveLocation_ID) AS count FROM EvolveLocation WHERE EvolveLocation_Name LIKE @search OR EvolveLocation_Code LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR1289: Error while getting Location List Count "+error.message);
            return new Error(" EERR1289: Error while getting Location List Count "+error.message);
        }
    },
    getLocationList: async function (start, length,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT el.*, elg.EvolveLocationGroup_Name , smt.EvolveStatusCodeMstr_Code FROM EvolveLocation el LEFT JOIN EvolveLocationGroup elg ON el.EvolveLocationGroup_ID = elg.EvolveLocationGroup_ID INNER JOIN EvolveStatusCodeMstr smt ON el.EvolveStatusCodeMstr_Id = smt.EvolveStatusCodeMstr_Id WHERE el.EvolveLocation_Name LIKE @search OR el.EvolveLocation_Code LIKE @search ORDER BY el.EvolveLocation_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");

        } catch (error) {
            Evolve.Log.error(" EERR1290: Error while getting Location List "+error.message);
            return new Error(" EERR1290: Error while getting Location List "+error.message);
        }
    },
    getSingleLocation: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
                .query("SELECT el.* , stm.EvolveStatusCodeMstr_Type ,stm.EvolveStatusCodeMstr_Code  FROM  EvolveLocation el  ,EvolveStatusCodeMstr stm  WHERE el.EvolveLocation_ID = @EvolveLocation_ID AND el.EvolveStatusCodeMstr_Id = stm.EvolveStatusCodeMstr_Id");

        } catch (error) {
            Evolve.Log.error(" EERR1291: Error while getting Single Location "+error.message);
            return new Error(" EERR1291: Error while getting Single Location "+error.message);
        }
    },
    updateLocation: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
                .input('EvolveLocationGroup_ID', Evolve.Sql.Int, data.EvolveLocationGroup_ID)
                .input('EvolveLocation_Name', Evolve.Sql.NVarChar, data.EvolveLocation_Name)
                .input('EvolveLocation_Code', Evolve.Sql.NVarChar, data.EvolveLocation_Code)
                .input('EvolveLocation_Desc', Evolve.Sql.NVarChar, data.EvolveLocation_Desc)
                .input('EvolveLocation_Type', Evolve.Sql.NVarChar, data.EvolveLocation_Type)
                .input('EvolveLocation_Address', Evolve.Sql.NVarChar, data.EvolveLocation_Address)
                .input('EvolveLocation_Rule', Evolve.Sql.NVarChar, data.EvolveLocation_Rule)
                .input('EvolveStatusCodeMstr_Id', Evolve.Sql.Int, data.EvolveStatusCodeMstr_Id)

                // .input('EvolveLocation_Status', Evolve.Sql.NVarChar, data.EvolveLocation_Status)
                .input('EvolveLocation_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveLocation_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("UPDATE EvolveLocation SET EvolveLocation_Rule=@EvolveLocation_Rule , EvolveStatusCodeMstr_Id=@EvolveStatusCodeMstr_Id , EvolveLocationGroup_ID = @EvolveLocationGroup_ID, EvolveLocation_Name = @EvolveLocation_Name, EvolveLocation_Code = @EvolveLocation_Code, EvolveLocation_Desc = @EvolveLocation_Desc, EvolveLocation_Type = @EvolveLocation_Type, EvolveLocation_Address = @EvolveLocation_Address, EvolveLocation_UpdatedAt = @EvolveLocation_UpdatedAt, EvolveLocation_UpdatedUser = @EvolveLocation_UpdatedUser WHERE EvolveLocation_ID = @EvolveLocation_ID ");

        } catch (error) {
            Evolve.Log.error(" EERR1292: Error while update Location "+error.message);
            return new Error(" EERR1292: Error while update Location "+error.message);
        }
    },
    getStatusCodeTypeList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("  SELECT DISTINCT EvolveStatusCodeMstr_Type FROM  EvolveStatusCodeMstr");
        } catch (error) {
            Evolve.Log.error(" EERR3047: Error while get status code type list "+error.message);
            return new Error(" EERR3047: Error while get status code type list "+error.message);
        }
    },
    getStatusCodeList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveStatusCodeMstr_Type', Evolve.Sql.NVarChar, data.EvolveStatusCodeMstr_Type)
            .query("SELECT EvolveStatusCodeMstr_Id , EvolveStatusCodeMstr_Code FROM EvolveStatusCodeMstr WHERE EvolveStatusCodeMstr_Type=@EvolveStatusCodeMstr_Type");
        } catch (error) {
            Evolve.Log.error(" EERR3048: Error while get status code list "+error.message);
            return new Error(" EERR3048: Error while get status code list "+error.message);
        }
    },

    checkLocationStatusCodeExits : async function(statusCode){
        try {
            let status = statusCode.toUpperCase()
            return await Evolve.SqlPool.request()
            .input('EvolveStatusCodeMstr_Code', Evolve.Sql.NVarChar, status)
            .query("SELECT EvolveStatusCodeMstr_Id FROM EvolveStatusCodeMstr WHERE EvolveStatusCodeMstr_Code=@EvolveStatusCodeMstr_Code");
        } catch (error) {
            Evolve.Log.error("Error while check location status code exists "+error.message);
            return new Error("Error while check location status code exists "+error.message);
        }
    },

    checkLocationExits : async function (locationCode){
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveLocation_Code', Evolve.Sql.NVarChar, locationCode)
            .query("SELECT EvolveLocation_ID FROM EvolveLocation WHERE EvolveLocation_Code=@EvolveLocation_Code");
        } catch (error) {
            Evolve.Log.error("Error while check location exists "+error.message);
            return new Error("Error while check location exists "+error.message);
        }
    },
    updateStatusCode : async function (statusCodeId , locaionId){
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveLocation_ID', Evolve.Sql.Int, locaionId)
            .input('EvolveStatusCodeMstr_Id', Evolve.Sql.Int, statusCodeId)
            .query("UPDATE EvolveLocation SET EvolveStatusCodeMstr_Id=@EvolveStatusCodeMstr_Id WHERE EvolveLocation_ID=@EvolveLocation_ID");
        } catch (error) {
            Evolve.Log.error("Error while check location exists "+error.message);
            return new Error("Error while check location exists "+error.message);
        }
    }



}