'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getGSPApiList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveGSPApi_ID, EvolveGSPApi_Code FROM EvolveGSPApi");
        } catch (error) {
            Evolve.Log.error(" EERR1229: Error while getting Gsp Api List" + error.message);
            return new Error(" EERR1229: Error while getting Gsp Api List" + error.message);
        }
    },

    getGSPApiAttributesListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT count(ea.EvolveGSPApiAttributes_ID) AS count FROM EvolveGSPApiAttributes ea, EvolveGSPApi ega WHERE ea.EvolveGSPApi_ID = ega.EvolveGSPApi_ID AND (ea.EvolveGSPApiAttributes_Code LIKE @search OR ega.EvolveGSPApi_Code LIKE @search)");
        } catch (error) {
            Evolve.Log.error(" EERR1229: Error while getting Gsp Api Attributes List Count " + error.message);
            return new Error(" EERR1229: Error while getting Gsp Api Attributes List Count " + error.message);
        }
    },
    getGSPApiAttributesList: async function (start, length, search) {
        try {

            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT ea.*, ega.EvolveGSPApi_Code, (select ea1.EvolveGSPApiAttributes_Code from EvolveGSPApiAttributes ea1 where ea.EvolveGSPApiAttributes_Parent = ea1.EvolveGSPApiAttributes_ID) as parentAttribute FROM EvolveGSPApiAttributes ea, EvolveGSPApi ega WHERE ea.EvolveGSPApi_ID = ega.EvolveGSPApi_ID AND (ea.EvolveGSPApiAttributes_Code LIKE @search OR ega.EvolveGSPApi_Code LIKE @search) ORDER BY ea.EvolveGSPApiAttributes_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1230: Error while getting Gsp Api Attributes List " + error.message);
            return new Error(" EERR1230: Error while getting Gsp Api Attributes List " + error.message);
        }
    },
    addGspApiAttributes: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveGSPApi_ID', Evolve.Sql.Int, data.EvolveGSPApi_ID)
                .input('EvolveGSPApiAttributes_Parent', Evolve.Sql.Int, data.EvolveGSPApiAttributes_Parent)
                .input('EvolveGSPApiAttributes_Code', Evolve.Sql.NVarChar, data.EvolveGSPApiAttributes_Code)
                .input('EvolveGSPApiAttributes_Type', Evolve.Sql.NVarChar, data.EvolveGSPApiAttributes_Type)
                .input('EvolveGSPApiAttributes_Datatype', Evolve.Sql.NVarChar, data.EvolveGSPApiAttributes_Datatype)
                .input('EvolveGSPApiAttributes_Default', Evolve.Sql.NVarChar, data.EvolveGSPApiAttributes_Default)
                .input('EvolveGSPApiAttributes_Group', Evolve.Sql.NVarChar, data.EvolveGSPApiAttributes_Group)
                .input('EvolveGSPApiAttributes_Status', Evolve.Sql.Bit, data.EvolveGSPApiAttributes_Status)
                .input('EvolveGSPApiAttributes_IsDefault', Evolve.Sql.Bit, data.EvolveGSPApiAttributes_IsDefault)

                .input('EvolveGSPApiAttributes_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveGSPApiAttributes_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveGSPApiAttributes_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveGSPApiAttributes_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query('INSERT INTO EvolveGSPApiAttributes (EvolveGSPApi_ID , EvolveGSPApiAttributes_Parent ,EvolveGSPApiAttributes_Code , EvolveGSPApiAttributes_Type,EvolveGSPApiAttributes_Datatype, EvolveGSPApiAttributes_Default, EvolveGSPApiAttributes_Group, EvolveGSPApiAttributes_Status, EvolveGSPApiAttributes_CreatedAt, EvolveGSPApiAttributes_CreatedUser, EvolveGSPApiAttributes_UpdatedAt, EvolveGSPApiAttributes_UpdatedUser, EvolveGSPApiAttributes_IsDefault) VALUES(@EvolveGSPApi_ID , @EvolveGSPApiAttributes_Parent, @EvolveGSPApiAttributes_Code ,@EvolveGSPApiAttributes_Type,@EvolveGSPApiAttributes_Datatype, @EvolveGSPApiAttributes_Default, @EvolveGSPApiAttributes_Group, @EvolveGSPApiAttributes_Status, @EvolveGSPApiAttributes_CreatedAt, @EvolveGSPApiAttributes_CreatedUser, @EvolveGSPApiAttributes_UpdatedAt, @EvolveGSPApiAttributes_UpdatedUser, @EvolveGSPApiAttributes_IsDefault)')
        } catch (error) {
            Evolve.Log.error(" EERR1228: Error while adding GSP Api Attributes" + error.message);
            return new Error(" EERR1228: Error while adding GSP Api Attributes" + error.message);
        }
    },

    getSingleGSPApiAttributesData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGSPApiAttributes_ID', Evolve.Sql.Int, data.EvolveGSPApiAttributes_ID)
                .query("SELECT * FROM EvolveGSPApiAttributes WHERE EvolveGSPApiAttributes_ID = @EvolveGSPApiAttributes_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1231: Error while getting Single Gsp Api Attributes " + error.message);
            return new Error(" EERR1231: Error while getting Single Gsp Api Attributes " + error.message);
        }
    },


    updateGspApiAttributes: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveGSPApiAttributes_ID', Evolve.Sql.Int, data.EvolveGSPApiAttributes_ID)
                .input('EvolveGSPApi_ID', Evolve.Sql.Int, data.EvolveGSPApi_ID)
                .input('EvolveGSPApiAttributes_Parent', Evolve.Sql.Int, data.EvolveGSPApiAttributes_Parent)
                .input('EvolveGSPApiAttributes_Code', Evolve.Sql.NVarChar, data.EvolveGSPApiAttributes_Code)
                .input('EvolveGSPApiAttributes_Type', Evolve.Sql.NVarChar, data.EvolveGSPApiAttributes_Type)
                .input('EvolveGSPApiAttributes_Datatype', Evolve.Sql.NVarChar, data.EvolveGSPApiAttributes_Datatype)
                .input('EvolveGSPApiAttributes_Default', Evolve.Sql.NVarChar, data.EvolveGSPApiAttributes_Default)
                .input('EvolveGSPApiAttributes_Group', Evolve.Sql.NVarChar, data.EvolveGSPApiAttributes_Group)
                .input('EvolveGSPApiAttributes_Status', Evolve.Sql.Bit, data.EvolveGSPApiAttributes_Status)
                .input('EvolveGSPApiAttributes_IsDefault', Evolve.Sql.Bit, data.EvolveGSPApiAttributes_IsDefault)


                .input('EvolveGSPApiAttributes_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveGSPApiAttributes_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)


                .query('UPDATE EvolveGSPApiAttributes SET EvolveGSPApi_ID = @EvolveGSPApi_ID , EvolveGSPApiAttributes_Parent = @EvolveGSPApiAttributes_Parent, EvolveGSPApiAttributes_Code = @EvolveGSPApiAttributes_Code, EvolveGSPApiAttributes_Type = @EvolveGSPApiAttributes_Type, EvolveGSPApiAttributes_Datatype = @EvolveGSPApiAttributes_Datatype, EvolveGSPApiAttributes_Default = @EvolveGSPApiAttributes_Default, EvolveGSPApiAttributes_Group = @EvolveGSPApiAttributes_Group,EvolveGSPApiAttributes_Status = @EvolveGSPApiAttributes_Status, EvolveGSPApiAttributes_UpdatedAt = @EvolveGSPApiAttributes_UpdatedAt, EvolveGSPApiAttributes_UpdatedUser = @EvolveGSPApiAttributes_UpdatedUser, EvolveGSPApiAttributes_IsDefault = @EvolveGSPApiAttributes_IsDefault WHERE EvolveGSPApiAttributes_ID = @EvolveGSPApiAttributes_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1232: Error while updating Gsp Api Attributes " + error.message);
            return new Error(" EERR1232: Error while updating Gsp Api Attributes" + error.message);
        }
    },

    checkAttributesCode: async function (data) {
        try {
            console.log("data.EvolveGSPApiAttributes_ID", data.EvolveGSPApiAttributes_ID)
            if (data.EvolveGSPApiAttributes_ID != '') {
                return await Evolve.SqlPool.request()
                    .input('EvolveGSPApiAttributes_ID', Evolve.Sql.Int, data.EvolveGSPApiAttributes_ID)
                    .input('EvolveGSPApi_ID', Evolve.Sql.Int, data.EvolveGSPApi_ID)
                    .input('EvolveGSPApiAttributes_Parent', Evolve.Sql.Int, data.EvolveGSPApiAttributes_Parent)
                    .input('EvolveGSPApiAttributes_Code', Evolve.Sql.NVarChar, data.EvolveGSPApiAttributes_Code)
                    .query("SELECT EvolveGSPApiAttributes_Code FROM EvolveGSPApiAttributes WHERE EvolveGSPApiAttributes_Code = @EvolveGSPApiAttributes_Code  AND EvolveGSPApiAttributes_Parent = @EvolveGSPApiAttributes_Parent AND EvolveGSPApi_ID = @EvolveGSPApi_ID AND EvolveGSPApiAttributes_ID != @EvolveGSPApiAttributes_ID");
            } else {
                return await Evolve.SqlPool.request()
                    .input('EvolveGSPApi_ID', Evolve.Sql.Int, data.EvolveGSPApi_ID)
                    .input('EvolveGSPApiAttributes_Parent', Evolve.Sql.Int, data.EvolveGSPApiAttributes_Parent)
                    .input('EvolveGSPApiAttributes_Code', Evolve.Sql.NVarChar, data.EvolveGSPApiAttributes_Code)
                    .query("SELECT EvolveGSPApiAttributes_Code FROM EvolveGSPApiAttributes WHERE EvolveGSPApiAttributes_Code = @EvolveGSPApiAttributes_Code AND EvolveGSPApiAttributes_Parent = @EvolveGSPApiAttributes_Parent AND EvolveGSPApi_ID = @EvolveGSPApi_ID");
            }
        } catch (error) {
            Evolve.Log.error(" EERR1231: Error while check code " + error.message);
            return new Error(" EERR1231: Error while check code " + error.message);
        }
    },
    checkAttributesCodeUpdate: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGSPApi_ID', Evolve.Sql.Int, data.EvolveGSPApi_ID)
                .input('EvolveGSPApiAttributes_ID', Evolve.Sql.Int, data.EvolveGSPApiAttributes_ID)
                .input('EvolveGSPApiAttributes_Parent', Evolve.Sql.Int, data.EvolveGSPApiAttributes_Parent)
                .input('EvolveGSPApiAttributes_Code', Evolve.Sql.NVarChar, data.EvolveGSPApiAttributes_Code)
                .query("SELECT EvolveGSPApiAttributes_Code FROM EvolveGSPApiAttributes WHERE EvolveGSPApiAttributes_Parent = @EvolveGSPApiAttributes_Parent AND EvolveGSPApiAttributes_Code = @EvolveGSPApiAttributes_Code AND EvolveGSPApi_ID = @EvolveGSPApi_ID AND EvolveGSPApiAttributes_ID != @EvolveGSPApiAttributes_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1231: Error while getting Single Gsp " + error.message);
            return new Error(" EERR1231: Error while getting Single Gsp " + error.message);
        }
    },
    getParentAttributeList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGSPApi_ID', Evolve.Sql.Int, data.EvolveGSPApi_ID)
                .input('EvolveGSPApiAttributes_Group', Evolve.Sql.NVarChar, data.EvolveGSPApiAttributes_Group)
                .query("SELECT EvolveGSPApiAttributes_ID, EvolveGSPApiAttributes_Code FROM EvolveGSPApiAttributes WHERE EvolveGSPApi_ID = @EvolveGSPApi_ID AND EvolveGSPApiAttributes_Group = @EvolveGSPApiAttributes_Group AND (EvolveGSPApiAttributes_Type = 'OBJECT' OR EvolveGSPApiAttributes_Type = 'ARRAY' OR EvolveGSPApiAttributes_Type = 'LIST')");
        } catch (error) {
            Evolve.Log.error(" EERR1231: Error while getting Gsp Parent Api Attributes" + error.message);
            return new Error(" EERR1231: Error while getting Gsp Parent Api Attributes" + error.message);
        }
    },
    checkChildExits: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGSPApiAttributes_ID', Evolve.Sql.Int, data.EvolveGSPApiAttributes_ID)
                .query("SELECT * FROM EvolveGSPApiAttributes WHERE EvolveGSPApiAttributes_Parent = @EvolveGSPApiAttributes_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1231: Error while getting Check Gsp Api Attributes " + error.message);
            return new Error(" EERR1231: Error while getting Check Gsp Api Attributes " + error.message);
        }
    },
    deleteGspApiAttributes: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGSPApiAttributes_ID', Evolve.Sql.Int, data.EvolveGSPApiAttributes_ID)
                .query("DELETE FROM EvolveGSPApiAttributes WHERE EvolveGSPApiAttributes_ID = @EvolveGSPApiAttributes_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1231: Error while Delete Gsp Api Attributes " + error.message);
            return new Error(" EERR1231: Error while Delete Gsp Api Attributes " + error.message);
        }
    },


}