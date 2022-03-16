'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getErpApiList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveERPApi_ID, EvolveERPApi_Code FROM EvolveERPApi");
        } catch (error) {
            Evolve.Log.error(" EERR1229: Error while getting ERP Api" + error.message);
            return new Error(" EERR1229: Error while getting ERP Api" + error.message);
        }
    },

    getERPApiAttributesListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT count(EAA.EvolveERPApiAttributes_ID) AS count FROM EvolveERPApiAttributes EAA, EvolveERPApi eea WHERE eea.EvolveERPApi_ID = EAA.EvolveERPApi_ID AND (EAA.EvolveERPApiAttributes_Code LIKE @search OR eea.EvolveERPApi_Code  LIKE @search)");
        } catch (error) {
            Evolve.Log.error(" EERR1229: Error while getting ERP api Attribute List Count " + error.message);
            return new Error(" EERR1229: Error while getting ERP api Attribute List Count " + error.message);
        }
    },
    getERPApiAttributesList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT ea.*, eea.EvolveERPApi_Code, (select eeaa1.EvolveERPApiAttributes_Code from EvolveERPApiAttributes eeaa1 where ea.EvolveERPApiAttributes_Parent = eeaa1.EvolveERPApiAttributes_ID) as parentAttribute FROM EvolveERPApiAttributes ea, EvolveERPApi eea WHERE ea.EvolveERPApi_ID = eea.EvolveERPApi_ID AND (ea.EvolveERPApiAttributes_Code LIKE @search OR eea.EvolveERPApi_Code  LIKE @search) ORDER BY eea.EvolveERPApi_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1230: Error while getting ERP api Attribute  List " + error.message);
            return new Error(" EERR1230: Error while getting ERP api Attribute List " + error.message);
        }
    },
    addErpApiAttributes: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveERPApi_ID', Evolve.Sql.Int, data.EvolveERPApi_ID)
                .input('EvolveERPApiAttributes_Parent', Evolve.Sql.Int, data.EvolveERPApiAttributes_Parent)
                .input('EvolveERPApiAttributes_Code', Evolve.Sql.NVarChar, data.EvolveERPApiAttributes_Code)
                .input('EvolveERPApiAttributes_Type', Evolve.Sql.NVarChar, data.EvolveERPApiAttributes_Type)
                .input('EvolveERPApiAttributes_Datatype', Evolve.Sql.NVarChar, data.EvolveERPApiAttributes_Datatype)
                .input('EvolveERPApiAttributes_Default', Evolve.Sql.NVarChar, data.EvolveERPApiAttributes_Default)
                .input('EvolveERPApiAttributes_Group', Evolve.Sql.NVarChar, data.EvolveERPApiAttributes_Group)
                .input('EvolveERPApiAttributes_Status', Evolve.Sql.Bit, data.EvolveERPApiAttributes_Status)
                .input('EvolveERPApiAttributes_IsDefault', Evolve.Sql.Bit, data.EvolveERPApiAttributes_IsDefault)

                .input('EvolveERPApiAttributes_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveERPApiAttributes_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveERPApiAttributes_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveERPApiAttributes_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query('INSERT INTO EvolveERPApiAttributes (EvolveERPApi_ID , EvolveERPApiAttributes_Parent ,EvolveERPApiAttributes_Code , EvolveERPApiAttributes_Type,EvolveERPApiAttributes_Datatype, EvolveERPApiAttributes_Default, EvolveERPApiAttributes_Group, EvolveERPApiAttributes_Status, EvolveERPApiAttributes_CreatedAt, EvolveERPApiAttributes_CreatedUser, EvolveERPApiAttributes_UpdatedAt, EvolveERPApiAttributes_UpdatedUser, EvolveERPApiAttributes_IsDefault) VALUES(@EvolveERPApi_ID , @EvolveERPApiAttributes_Parent, @EvolveERPApiAttributes_Code ,@EvolveERPApiAttributes_Type,@EvolveERPApiAttributes_Datatype, @EvolveERPApiAttributes_Default, @EvolveERPApiAttributes_Group, @EvolveERPApiAttributes_Status, @EvolveERPApiAttributes_CreatedAt, @EvolveERPApiAttributes_CreatedUser, @EvolveERPApiAttributes_UpdatedAt, @EvolveERPApiAttributes_UpdatedUser, @EvolveERPApiAttributes_IsDefault)')
        } catch (error) {
            Evolve.Log.error(" EERR1228: Error while adding Erp Api Attributes " + error.message);
            return new Error(" EERR1228: Error while adding Erp Api Attributes " + error.message);
        }
    },

    getSingleErpApiAttributesData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveERPApiAttributes_ID', Evolve.Sql.Int, data.EvolveERPApiAttributes_ID)
                .query("SELECT * FROM EvolveERPApiAttributes WHERE EvolveERPApiAttributes_ID = @EvolveERPApiAttributes_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1231: Error while getting Single ERP api Attribute " + error.message);
            return new Error(" EERR1231: Error while getting Single ERP api Attribute " + error.message);
        }
    },


    updateERPApiAttributes: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveERPApiAttributes_ID', Evolve.Sql.Int, data.EvolveERPApiAttributes_ID)
                .input('EvolveERPApi_ID', Evolve.Sql.Int, data.EvolveERPApi_ID)
                .input('EvolveERPApiAttributes_Parent', Evolve.Sql.Int, data.EvolveERPApiAttributes_Parent)
                .input('EvolveERPApiAttributes_Code', Evolve.Sql.NVarChar, data.EvolveERPApiAttributes_Code)
                .input('EvolveERPApiAttributes_Type', Evolve.Sql.NVarChar, data.EvolveERPApiAttributes_Type)
                .input('EvolveERPApiAttributes_Datatype', Evolve.Sql.NVarChar, data.EvolveERPApiAttributes_Datatype)
                .input('EvolveERPApiAttributes_Default', Evolve.Sql.NVarChar, data.EvolveERPApiAttributes_Default)
                .input('EvolveERPApiAttributes_Group', Evolve.Sql.NVarChar, data.EvolveERPApiAttributes_Group)
                .input('EvolveERPApiAttributes_Status', Evolve.Sql.Bit, data.EvolveERPApiAttributes_Status)
                .input('EvolveERPApiAttributes_IsDefault', Evolve.Sql.Bit, data.EvolveERPApiAttributes_IsDefault)


                .input('EvolveERPApiAttributes_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveERPApiAttributes_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)


                .query('UPDATE EvolveERPApiAttributes SET EvolveERPApi_ID = @EvolveERPApi_ID , EvolveERPApiAttributes_Parent = @EvolveERPApiAttributes_Parent, EvolveERPApiAttributes_Code = @EvolveERPApiAttributes_Code, EvolveERPApiAttributes_Type = @EvolveERPApiAttributes_Type, EvolveERPApiAttributes_Datatype = @EvolveERPApiAttributes_Datatype, EvolveERPApiAttributes_Default = @EvolveERPApiAttributes_Default, EvolveERPApiAttributes_Group = @EvolveERPApiAttributes_Group,EvolveERPApiAttributes_Status = @EvolveERPApiAttributes_Status, EvolveERPApiAttributes_UpdatedAt = @EvolveERPApiAttributes_UpdatedAt, EvolveERPApiAttributes_UpdatedUser = @EvolveERPApiAttributes_UpdatedUser, EvolveERPApiAttributes_IsDefault = @EvolveERPApiAttributes_IsDefault WHERE EvolveERPApiAttributes_ID = @EvolveERPApiAttributes_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1232: Error while updating Erp Api Attributes " + error.message);
            return new Error(" EERR1232: Error while updating Erp Api Attributes " + error.message);
        }
    },

    checkAttributesCode: async function (data) {
        try {
            console.log("data.EvolveERPApiAttributes_ID",data.EvolveERPApiAttributes_ID)
            if(data.EvolveERPApiAttributes_ID != ''){
                 return await Evolve.SqlPool.request()
                .input('EvolveERPApiAttributes_ID', Evolve.Sql.Int, data.EvolveERPApiAttributes_ID)
                .input('EvolveERPApi_ID', Evolve.Sql.Int, data.EvolveERPApi_ID)
                .input('EvolveERPApiAttributes_Parent', Evolve.Sql.Int, data.EvolveERPApiAttributes_Parent)
                .input('EvolveERPApiAttributes_Code', Evolve.Sql.NVarChar, data.EvolveERPApiAttributes_Code)
                .query("SELECT EvolveERPApiAttributes_Code FROM EvolveERPApiAttributes WHERE EvolveERPApiAttributes_Code = @EvolveERPApiAttributes_Code  AND EvolveERPApiAttributes_Parent = @EvolveERPApiAttributes_Parent AND EvolveERPApi_ID = @EvolveERPApi_ID AND EvolveERPApiAttributes_ID != @EvolveERPApiAttributes_ID");
            }else{
                 return await Evolve.SqlPool.request()
                .input('EvolveERPApi_ID', Evolve.Sql.Int, data.EvolveERPApi_ID)
                .input('EvolveERPApiAttributes_Parent', Evolve.Sql.Int, data.EvolveERPApiAttributes_Parent)
                .input('EvolveERPApiAttributes_Code', Evolve.Sql.NVarChar, data.EvolveERPApiAttributes_Code)
                .query("SELECT EvolveERPApiAttributes_Code FROM EvolveERPApiAttributes WHERE EvolveERPApiAttributes_Code = @EvolveERPApiAttributes_Code AND EvolveERPApiAttributes_Parent = @EvolveERPApiAttributes_Parent AND EvolveERPApi_ID = @EvolveERPApi_ID");
            }
        } catch (error) {
            Evolve.Log.error(" EERR1231: Error while check code " + error.message);
            return new Error(" EERR1231: Error while check code " + error.message);
        }
    },   
    getParentAttributeList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveERPApi_ID', Evolve.Sql.Int, data.EvolveERPApi_ID)
                .input('EvolveERPApiAttributes_Group', Evolve.Sql.NVarChar, data.EvolveERPApiAttributes_Group)
                .query("SELECT EvolveERPApiAttributes_ID, EvolveERPApiAttributes_Code FROM EvolveERPApiAttributes WHERE EvolveERPApi_ID = @EvolveERPApi_ID AND EvolveERPApiAttributes_Group = @EvolveERPApiAttributes_Group");
        } catch (error) {
            Evolve.Log.error(" EERR1231: Error while getting Parent Attribute List " + error.message);
            return new Error(" EERR1231: Error while getting Parent Attribute List " + error.message);
        }
    },
    checkChildExits: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveERPApiAttributes_ID', Evolve.Sql.Int, data.EvolveERPApiAttributes_ID)
                .query("SELECT * FROM EvolveERPApiAttributes WHERE EvolveERPApiAttributes_Parent = @EvolveERPApiAttributes_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1231: Error while getting  check Child " + error.message);
            return new Error(" EERR1231: Error while getting  check Child " + error.message);
        }
    },
    deleteERPApiAttributes: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveERPApiAttributes_ID', Evolve.Sql.Int, data.EvolveERPApiAttributes_ID)
                .query("DELETE FROM EvolveERPApiAttributes WHERE EvolveERPApiAttributes_ID = @EvolveERPApiAttributes_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1231: Error while getting delete ERP api attributes  " + error.message);
            return new Error(" EERR1231: Error while getting delete ERP api attributes  " + error.message);
        }
    },


}