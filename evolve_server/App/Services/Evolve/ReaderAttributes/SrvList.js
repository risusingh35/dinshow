'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getReaderAttributesListCount : async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query(' SELECT COUNT(EvolveReaderAttributes_ID) as count FROM EvolveReaderAttributes WHERE EvolveReaderAttributes_Code LIKE @search ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Reader Attributes Count "+error.message);
            return new Error(" EERR####: Error while getting Reader Attributes Count "+error.message);
        }
    },

    getReaderAttributesList : async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
            .input('start',Evolve.Sql.Int,start)
            .input('length',Evolve.Sql.Int,length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('SELECT ea.*, (SELECT ea1.EvolveReaderAttributes_Code FROM EvolveReaderAttributes ea1 WHERE ea.EvolveReaderAttributes_Parent = ea1.EvolveReaderAttributes_ID) AS parentReaderAttribute  FROM EvolveReaderAttributes ea WHERE EvolveReaderAttributes_Code LIKE @search ORDER BY EvolveReaderAttributes_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Reader Attributes List "+error.message);
            return new Error(" EERR####: Error while getting Reader Attributes List "+error.message);
        }
    },

    getReaderCode : async function () {
        try {
            return await Evolve.SqlPool.request()
            .query('SELECT * FROM EvolveReader');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting reader codes "+error.message);
            return new Error(" EERR####: Error while getting reader codes "+error.message);
        }
    },

    getParentReaderAttList : async function () {
        try {
            return await Evolve.SqlPool.request()
            .query(` SELECT * FROM EvolveReaderAttributes WHERE EvolveReaderAttributes_Datatype = 'OBJECT' OR EvolveReaderAttributes_Datatype = 'ARRAY' `);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting reader attributes "+error.message);
            return new Error(" EERR####: Error while getting reader attributes "+error.message);
        }
    },

    addReaderAttributesData : async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveReader_ID', Evolve.Sql.Int, data.EvolveReader_ID)
            .input('EvolveReaderAttributes_Code', Evolve.Sql.NVarChar, data.EvolveReaderAttributes_Code)
            .input('EvolveReaderAttributes_Parent', Evolve.Sql.NVarChar, data.EvolveReaderAttributes_Parent)
            .input('EvolveReaderAttributes_Datatype', Evolve.Sql.NVarChar, data.EvolveReaderAttributes_Datatype)
            .input('EvolveReaderAttributes_Replace', Evolve.Sql.NVarChar, data.EvolveReaderAttributes_Replace)
            .input('EvolveReaderAttributes_Default', Evolve.Sql.NVarChar, data.EvolveReaderAttributes_Default)
            .input('EvolveReaderAttributes_IsDefault', Evolve.Sql.Bit, data.EvolveReaderAttributes_IsDefault)
            .input('EvolveReaderAttributes_Status', Evolve.Sql.Bit, data.EvolveReaderAttributes_Status)
            .input('EvolveReaderAttributes_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveReaderAttributes_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolveReaderAttributes_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveReaderAttributes_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .query('INSERT INTO EvolveReaderAttributes (EvolveReader_ID, EvolveReaderAttributes_Code, EvolveReaderAttributes_Parent, EvolveReaderAttributes_Datatype, EvolveReaderAttributes_Replace, EvolveReaderAttributes_Default,EvolveReaderAttributes_IsDefault, EvolveReaderAttributes_Status, EvolveReaderAttributes_UpdatedAt, EvolveReaderAttributes_UpdatedUser, EvolveReaderAttributes_CreatedAt, EvolveReaderAttributes_CreatedUser) VALUES (@EvolveReader_ID, @EvolveReaderAttributes_Code, @EvolveReaderAttributes_Parent, @EvolveReaderAttributes_Datatype, @EvolveReaderAttributes_Replace, @EvolveReaderAttributes_Default, @EvolveReaderAttributes_IsDefault, @EvolveReaderAttributes_Status, @EvolveReaderAttributes_UpdatedAt, @EvolveReaderAttributes_UpdatedUser, @EvolveReaderAttributes_CreatedAt, @EvolveReaderAttributes_CreatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while add reader attribute "+error.message);
            return new Error(" EERR####: Error while add reader attribute "+error.message);
        }
    },

    editReaderAttributesData : async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveReader_ID', Evolve.Sql.Int, data.EvolveReader_ID)
            .input('EvolveReaderAttributes_ID', Evolve.Sql.Int, data.EvolveReaderAttributes_ID)
            .input('EvolveReaderAttributes_Code', Evolve.Sql.NVarChar, data.EvolveReaderAttributes_Code)
            .input('EvolveReaderAttributes_Parent', Evolve.Sql.NVarChar, data.EvolveReaderAttributes_Parent)
            .input('EvolveReaderAttributes_Datatype', Evolve.Sql.NVarChar, data.EvolveReaderAttributes_Datatype)
            .input('EvolveReaderAttributes_Replace', Evolve.Sql.NVarChar, data.EvolveReaderAttributes_Replace)
            .input('EvolveReaderAttributes_Default', Evolve.Sql.NVarChar, data.EvolveReaderAttributes_Default)
            .input('EvolveReaderAttributes_IsDefault', Evolve.Sql.Bit, data.EvolveReaderAttributes_IsDefault)
            .input('EvolveReaderAttributes_Status', Evolve.Sql.Bit, data.EvolveReaderAttributes_Status)
            .input('EvolveReaderAttributes_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveReaderAttributes_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .query('UPDATE EvolveReaderAttributes SET EvolveReader_ID = @EvolveReader_ID, EvolveReaderAttributes_Code = @EvolveReaderAttributes_Code, EvolveReaderAttributes_Parent = @EvolveReaderAttributes_Parent, EvolveReaderAttributes_Datatype = @EvolveReaderAttributes_Datatype, EvolveReaderAttributes_Replace = @EvolveReaderAttributes_Replace, EvolveReaderAttributes_Default = @EvolveReaderAttributes_Default, EvolveReaderAttributes_IsDefault = @EvolveReaderAttributes_IsDefault, EvolveReaderAttributes_Status = @EvolveReaderAttributes_Status, EvolveReaderAttributes_UpdatedAt = @EvolveReaderAttributes_UpdatedAt, EvolveReaderAttributes_UpdatedUser = @EvolveReaderAttributes_UpdatedUser WHERE EvolveReaderAttributes_ID = @EvolveReaderAttributes_ID');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while edit reader "+error.message);
            return new Error(" EERR####: Error while edit reader "+error.message);
        }
    },

    checkReaderAttributesId : async function (EvolveReaderAttributes_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveReaderAttributes_ID', Evolve.Sql.Int, EvolveReaderAttributes_ID)
            .query(' SELECT * FROM EvolveReaderAttrMapping WHERE EvolveReaderAttributes_ID = @EvolveReaderAttributes_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check reader attribute id "+error.message);
            return new Error(" EERR####: Error while check reader attribute id "+error.message);
        }
    },

    deleteReaderAttributesId : async function (EvolveReaderAttributes_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveReaderAttributes_ID', Evolve.Sql.Int, EvolveReaderAttributes_ID)
            .query(' DELETE FROM EvolveReaderAttrMapping WHERE EvolveReaderAttributes_ID = @EvolveReaderAttributes_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while delete reader attribute id "+error.message);
            return new Error(" EERR####: Error while delete reader attribute id "+error.message);
        }
    },

    deleteReaderAttributesData : async function (EvolveReaderAttributes_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveReaderAttributes_ID', Evolve.Sql.Int, EvolveReaderAttributes_ID)
            .query(' DELETE FROM EvolveReaderAttributes WHERE EvolveReaderAttributes_ID = @EvolveReaderAttributes_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while delete reader attribute "+error.message);
            return new Error(" EERR####: Error while delete reader attribute "+error.message);
        }
    },

    getSingleReaderAttributesData : async function (EvolveReaderAttributes_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveReaderAttributes_ID', Evolve.Sql.Int, EvolveReaderAttributes_ID)
            .query(' SELECT * FROM EvolveReaderAttributes WHERE EvolveReaderAttributes_ID = @EvolveReaderAttributes_ID');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while select single reader attribute "+error.message);
            return new Error(" EERR####: Error while select single reader attribute "+error.message);
        }
    },

    checkReaderAttrCode : async function (data) {
        try {
            if(data.EvolveReaderAttributes_ID = null){
                return await Evolve.SqlPool.request()
            .input('EvolveReader_ID', Evolve.Sql.Int, data.EvolveReader_ID)
            .input('EvolveReaderAttributes_Code', Evolve.Sql.NVarChar, data.EvolveReaderAttributes_Code)
            .input('EvolveReaderAttributes_Parent', Evolve.Sql.NVarChar, data.EvolveReaderAttributes_Parent)
            .query(' SELECT * FROM EvolveReaderAttributes WHERE EvolveReaderAttributes_Code = @EvolveReaderAttributes_Code AND EvolveReaderAttributes_ID = @EvolveReaderAttributes_ID AND EvolveReaderAttributes_Parent = @EvolveReaderAttributes_Parent');
            }
            else{
                return await Evolve.SqlPool.request()
            .input('EvolveReader_ID', Evolve.Sql.Int, data.EvolveReader_ID)
            .input('EvolveReaderAttributes_Code', Evolve.Sql.NVarChar, data.EvolveReaderAttributes_Code)
            .input('EvolveReaderAttributes_Parent', Evolve.Sql.NVarChar, data.EvolveReaderAttributes_Parent)
            .input('EvolveReaderAttributes_ID', Evolve.Sql.Int, data.EvolveReaderAttributes_ID)
            .query(' SELECT * FROM EvolveReaderAttributes WHERE EvolveReaderAttributes_Code = @EvolveReaderAttributes_Code AND EvolveReaderAttributes_ID = @EvolveReaderAttributes_ID AND EvolveReaderAttributes_Parent = @EvolveReaderAttributes_Parent  AND EvolveReaderAttributes_ID != @EvolveReaderAttributes_ID');
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while checking reader attribute code "+error.message);
            return new Error(" EERR####: Error while checking reader attribute code "+error.message);
        }
    }, 

}