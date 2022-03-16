'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getContainerTypeList: async function () {
        try {
            return await Evolve.SqlPool.request()
          
                .query('SELECT * FROM EvolveContainerType');
        } catch (error) {
            Evolve.Log.error(" EERR1194: Error while getting Container Type List "+error.message);
            return new Error(" EERR1194: Error while getting Container Type List "+error.message);
        }
    },

    getContainerMasterListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('SELECT COUNT(EvolveContainer_ID) as count FROM EvolveContainer WHERE EvolveContainer_Name LIKE @search OR EvolveContainer_Code LIKE @search ');
        } catch (error) {
            Evolve.Log.error(" EERR1195: Error while getting Container Master List Count "+error.message);
            return new Error(" EERR1195: Error while getting Container Master List Count "+error.message);
        }
    },
    
    getContainerMasterList: async function (start,length,search) {
        try {
            return await Evolve.SqlPool.request()
                .input("start",Evolve.Sql.Int,start)
                .input("length",Evolve.Sql.Int,length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query('SELECT ect.EvolveContainerType_code , ec.* FROM EvolveContainer ec, EvolveContainerType ect WHERE ect.EvolveContainerType_ID = ec.EvolveContainerType_ID AND    (ec.EvolveContainer_Name LIKE @search OR ec.EvolveContainer_Code LIKE @search)  ORDER BY ec.EvolveContainer_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR1196: Error while getting Container Master List "+error.message);
            return new Error(" EERR1196: Error while getting Container Master List "+error.message);
        }
    },
    
    createContainer : async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveContainerType_ID',Evolve.Sql.Int,data.EvolveContainerType_ID)
                .input('EvolveContainer_Name',Evolve.Sql.NVarChar,data.EvolveContainer_Name)
                .input('EvolveContainer_Code',Evolve.Sql.NVarChar,data.EvolveContainer_Code)
                .input('EvolveContainer_Desc',Evolve.Sql.NVarChar,data.EvolveContainer_Desc)
                .input('EvolveContainer_Weight',Evolve.Sql.NVarChar,data.EvolveContainer_Weight)
                .input('EvolveContainer_Colour',Evolve.Sql.NVarChar,data.EvolveContainer_Colour)
                .input('EvolveContainer_Status',Evolve.Sql.Bit,data.EvolveContainer_Status)
                .input('EvolveContainer_CreatedUser',Evolve.Sql.Int,data.EvolveUser_ID)
                .input('EvolveContainer_CreatedAt',Evolve.Sql.NVarChar,datetime)
                .input('EvolveContainer_UpdatedUser',Evolve.Sql.Int,data.EvolveUser_ID)
                .input('EvolveContainer_UpdatedAt',Evolve.Sql.NVarChar,datetime)
                .query("INSERT INTO EvolveContainer(EvolveContainerType_ID,EvolveContainer_Name,EvolveContainer_Code,EvolveContainer_Desc,EvolveContainer_Weight,EvolveContainer_Colour,EvolveContainer_Status,EvolveContainer_CreatedUser,EvolveContainer_CreatedAt,EvolveContainer_UpdatedUser,EvolveContainer_UpdatedAt) VALUES(@EvolveContainerType_ID,@EvolveContainer_Name,@EvolveContainer_Code,@EvolveContainer_Desc,@EvolveContainer_Weight,@EvolveContainer_Colour,@EvolveContainer_Status,@EvolveContainer_CreatedUser,@EvolveContainer_CreatedAt,@EvolveContainer_UpdatedUser,@EvolveContainer_UpdatedAt)"); 
        } catch (error) {
            Evolve.Log.error(" EERR1197: Error while creating container "+error.message);
            return new Error(" EERR1197: Error while creating container "+error.message);
        }
    },

    getSingleContainer: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveContainer_ID', Evolve.Sql.Int, id)
                .query('SELECT * FROM EvolveContainer WHERE EvolveContainer_ID = @EvolveContainer_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1198: Error while getting Single Container "+error.message);
            return new Error(" EERR1198: Error while getting Single Container "+error.message);
        }
    },
    
    updateContainer : async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveContainer_ID',Evolve.Sql.Int,data.EvolveContainer_ID)
                .input('EvolveContainerType_ID',Evolve.Sql.Int,data.EvolveContainerType_ID)
                .input('EvolveContainer_Name',Evolve.Sql.NVarChar,data.EvolveContainer_Name)
                .input('EvolveContainer_Code',Evolve.Sql.NVarChar,data.EvolveContainer_Code)
                .input('EvolveContainer_Desc',Evolve.Sql.NVarChar,data.EvolveContainer_Desc)
                .input('EvolveContainer_Weight',Evolve.Sql.NVarChar,data.EvolveContainer_Weight)
                .input('EvolveContainer_Colour',Evolve.Sql.NVarChar,data.EvolveContainer_Colour)
                .input('EvolveContainer_Status',Evolve.Sql.Bit,data.EvolveContainer_Status)
                .input('EvolveContainer_UpdatedUser',Evolve.Sql.Int,data.EvolveUser_ID)
                .input('EvolveContainer_UpdatedAt',Evolve.Sql.NVarChar,datetime)
                .query("UPDATE EvolveContainer SET EvolveContainerType_ID = @EvolveContainerType_ID , EvolveContainer_Name = @EvolveContainer_Name , EvolveContainer_Code = @EvolveContainer_Code , EvolveContainer_Desc = @EvolveContainer_Desc , EvolveContainer_Weight = @EvolveContainer_Weight , EvolveContainer_Colour = @EvolveContainer_Colour , EvolveContainer_Status = @EvolveContainer_Status , EvolveContainer_UpdatedUser = @EvolveContainer_UpdatedUser , EvolveContainer_UpdatedAt = @EvolveContainer_UpdatedAt WHERE EvolveContainer_ID = @EvolveContainer_ID "); 
        } catch (error) {
            Evolve.Log.error(" EERR1199: Error while updating Container "+error.message);
            return new Error(" EERR1199: Error while updating Container "+error.message);
        }
    },
}