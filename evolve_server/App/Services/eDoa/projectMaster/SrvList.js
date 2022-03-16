'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getProjectMasterListCount: async function (search ,EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
            .query(" SELECT COUNT(EvolveProject_ID) AS count FROM EvolveProject WHERE EvolveProject_Code LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get project master count "+error.message);
            return new Error(" EERR####: Error while get project master count "+error.message);
        }
    },

    getCustomerMasterList: async function (start, length ,search , EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
                .query(" SELECT *, convert(varchar, EvolveProject_BeginDate, 103)  as projectBeginDate, convert(varchar, EvolveProject_ActualCompDate, 103)  as projectActualCompDate, convert(varchar, EvolveProject_OrgCompDate, 103)  as projectOrgCompDate, convert(varchar, EvolveProject_DateRevised, 103)  as projectDateRevised, convert(varchar, EvolveProject_RevisedCompDate, 103)  as projectRevisedCopmDate FROM EvolveProject WHERE EvolveProject_Code LIKE @search ORDER BY EvolveProject_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get project master list "+error.message);
            return new Error(" EERR####: Error while get project master list "+error.message);
        }
    },

    // addProjectMaster: async function (EvolveUser_ID, data) {
    //     data.EvolveProject_BeginDate = data.EvolveProject_BeginDate.split("/").reverse().join("/").replace("/", "/");
    //     data.EvolveProject_ActualCompDate = data.EvolveProject_ActualCompDate.split("/").reverse().join("/").replace("/", "/");
    //     data.EvolveProject_OrgCompDate = data.EvolveProject_OrgCompDate.split("/").reverse().join("/").replace("/", "/");
    //     data.EvolveProject_DateRevised = data.EvolveProject_DateRevised.split("/").reverse().join("/").replace("/", "/");
    //     data.EvolveProject_RevisedCompDate = data.EvolveProject_RevisedCompDate.split("/").reverse().join("/").replace("/", "/");
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
            
    //             .input('EvolveProject_Code', Evolve.Sql.NVarChar, data.EvolveProject_Code)
    //             .input('EvolveProject_Description', Evolve.Sql.NVarChar, data.EvolveProject_Description)
    //             .input('EvolveProject_BeginDate', Evolve.Sql.NVarChar, data.EvolveProject_BeginDate)
    //             .input('EvolveProject_ActualCompDate', Evolve.Sql.NVarChar, data.EvolveProject_ActualCompDate)
    //             .input('EvolveProject_OrgCompDate', Evolve.Sql.NVarChar, data.EvolveProject_OrgCompDate)
    //             .input('EvolveProject_DateRevised', Evolve.Sql.NVarChar, data.EvolveProject_DateRevised)
    //             .input('EvolveProject_RevisedCompDate', Evolve.Sql.NVarChar, data.EvolveProject_RevisedCompDate)
    //             .input('EvolveProject_StatusCode', Evolve.Sql.NVarChar, data.EvolveProject_StatusCode)
    //             .input('EvolveProject_Type', Evolve.Sql.NVarChar, data.EvolveProject_Type)
    //             .input('EvolveProject_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
    //             .input('EvolveProject_CreatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveProject_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
    //             .input('EvolveProject_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                
    //             .query(' INSERT INTO EvolveProject (EvolveProject_Code, EvolveProject_Description, EvolveProject_BeginDate, EvolveProject_ActualCompDate, EvolveProject_OrgCompDate, EvolveProject_DateRevised, EvolveProject_RevisedCompDate, EvolveProject_StatusCode, EvolveProject_Type, EvolveProject_CreatedUser, EvolveProject_CreatedAt, EvolveProject_UpdatedUser, EvolveProject_UpdatedAt) VALUES (@EvolveProject_Code, @EvolveProject_Description, @EvolveProject_BeginDate, @EvolveProject_ActualCompDate, @EvolveProject_OrgCompDate, @EvolveProject_DateRevised, @EvolveProject_RevisedCompDate, @EvolveProject_StatusCode, @EvolveProject_Type, @EvolveProject_CreatedUser, @EvolveProject_CreatedAt, @EvolveProject_UpdatedUser, @EvolveProject_UpdatedAt) ');

    //     } catch (error) {
    //         Evolve.Log.error(" EERR####: Erorr while add project master "+error.message);
    //         return new Error(" EERR####: Erorr while add project master "+error.message);
    //     }
    // },

    // updateProjectMaster : async function (EvolveUser_ID, data) {
    //     data.EvolveProject_BeginDate = data.EvolveProject_BeginDate.split("/").reverse().join("/").replace("/", "/");
    //     data.EvolveProject_ActualCompDate = data.EvolveProject_ActualCompDate.split("/").reverse().join("/").replace("/", "/");
    //     data.EvolveProject_OrgCompDate = data.EvolveProject_OrgCompDate.split("/").reverse().join("/").replace("/", "/");
    //     data.EvolveProject_DateRevised = data.EvolveProject_DateRevised.split("/").reverse().join("/").replace("/", "/");
    //     data.EvolveProject_RevisedCompDate = data.EvolveProject_RevisedCompDate.split("/").reverse().join("/").replace("/", "/");
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

    //     try {
    //         return await Evolve.SqlPool.request()
            
    //         .input('EvolveProject_ID', Evolve.Sql.Int, data.EvolveProject_ID)
    //         .input('EvolveProject_Code', Evolve.Sql.NVarChar, data.EvolveProject_Code)
    //         .input('EvolveProject_Description', Evolve.Sql.NVarChar, data.EvolveProject_Description)
    //         .input('EvolveProject_BeginDate', Evolve.Sql.NVarChar, data.EvolveProject_BeginDate)
    //         .input('EvolveProject_ActualCompDate', Evolve.Sql.NVarChar, data.EvolveProject_ActualCompDate)
    //         .input('EvolveProject_OrgCompDate', Evolve.Sql.NVarChar, data.EvolveProject_OrgCompDate)
    //         .input('EvolveProject_DateRevised', Evolve.Sql.NVarChar, data.EvolveProject_DateRevised)
    //         .input('EvolveProject_RevisedCompDate', Evolve.Sql.NVarChar, data.EvolveProject_RevisedCompDate)
    //         .input('EvolveProject_StatusCode', Evolve.Sql.NVarChar, data.EvolveProject_StatusCode)
    //         .input('EvolveProject_Type', Evolve.Sql.NVarChar, data.EvolveProject_Type)
    //         .input('EvolveProject_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
    //         .input('EvolveProject_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            
    //             .query(' UPDATE EvolveProject SET EvolveProject_Code = @EvolveProject_Code, EvolveProject_Description = @EvolveProject_Description, EvolveProject_BeginDate = @EvolveProject_BeginDate, EvolveProject_ActualCompDate = @EvolveProject_ActualCompDate, EvolveProject_OrgCompDate = @EvolveProject_OrgCompDate, EvolveProject_DateRevised = @EvolveProject_DateRevised, EvolveProject_RevisedCompDate = @EvolveProject_RevisedCompDate, EvolveProject_StatusCode = @EvolveProject_StatusCode, EvolveProject_Type = @EvolveProject_Type, EvolveProject_UpdatedUser = @EvolveProject_UpdatedUser, EvolveProject_UpdatedAt = @EvolveProject_UpdatedAt WHERE EvolveProject_ID = @EvolveProject_ID ');

    //     } catch (error) {
    //         Evolve.Log.error(" EERR####:  Erorr while update project master "+error.message);
    //         return new Error(" EERR####:  Erorr while update project master "+error.message);
    //     }
    // },

    checkProjectExist : async function (EvolveProject_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProject_Code', Evolve.Sql.NVarChar, EvolveProject_Code)
                .query(" SELECT * FROM EvolveProject WHERE EvolveProject_Code = @EvolveProject_Code ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check project code exist or not "+error.message);
            return new Error(" EERR####: Error while check project code exist or not "+error.message);
        }
    },

    addProject: async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        if (data.isFromCsvFile == 'NO') {
            try {
                return await Evolve.SqlPool.request()
                    .input('EvolveProject_Code', Evolve.Sql.NVarChar, data.EvolveProject_Code)
                    .input('EvolveProject_Description', Evolve.Sql.NVarChar, data.EvolveProject_Description)
                    .input('EvolveProject_CreatedAt', Evolve.Sql.NVarChar, datetime)
                    .input('EvolveProject_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
                    .input('EvolveProject_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                    .input('EvolveProject_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                    .query(' INSERT INTO EvolveProject (EvolveProject_Code, EvolveProject_Description, EvolveProject_CreatedAt, EvolveProject_CreatedUser, EvolveProject_UpdatedAt, EvolveProject_UpdatedUser) VALUES (@EvolveProject_Code, @EvolveProject_Description, @EvolveProject_CreatedAt, @EvolveProject_CreatedUser, @EvolveProject_UpdatedAt, @EvolveProject_UpdatedUser) ');
    
            } catch (error) {
                Evolve.Log.error(" EERR####: Erorr while add project "+error.message);
                return new Error(" EERR####: Erorr while add project "+error.message);
            }
        }
        else{
            try {
                return await Evolve.SqlPool.request()
                    .input('EvolveProject_Code', Evolve.Sql.NVarChar, data['Project'].trim())
                    .input('EvolveProject_Description', Evolve.Sql.NVarChar, data['Description'])
                    .input('EvolveProject_CreatedAt', Evolve.Sql.NVarChar, datetime)
                    .input('EvolveProject_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
                    .input('EvolveProject_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                    .input('EvolveProject_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                    .query(' INSERT INTO EvolveProject (EvolveProject_Code, EvolveProject_Description, EvolveProject_CreatedAt, EvolveProject_CreatedUser, EvolveProject_UpdatedAt, EvolveProject_UpdatedUser) VALUES (@EvolveProject_Code, @EvolveProject_Description, @EvolveProject_CreatedAt, @EvolveProject_CreatedUser, @EvolveProject_UpdatedAt, @EvolveProject_UpdatedUser) ');
    
            } catch (error) {
                Evolve.Log.error(" EERR####: Erorr while add project "+error.message);
                return new Error(" EERR####: Erorr while add project "+error.message);
            }
        }
        
       
    },

    updateProject : async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        if (data.isFromCsvFile == 'NO') {
            try {
                return await Evolve.SqlPool.request()
                    .input('EvolveProject_ID', Evolve.Sql.Int, data.EvolveProject_ID)
                    .input('EvolveProject_Code', Evolve.Sql.NVarChar, data.EvolveProject_Code)
                    .input('EvolveProject_Description', Evolve.Sql.NVarChar, data.EvolveProject_Description)
                    .input('EvolveProject_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                    .input('EvolveProject_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                    .query(' UPDATE EvolveProject SET EvolveProject_Code = @EvolveProject_Code, EvolveProject_Description = @EvolveProject_Description,EvolveProject_UpdatedAt = @EvolveProject_UpdatedAt, EvolveProject_UpdatedUser = @EvolveProject_UpdatedUser WHERE EvolveProject_ID = @EvolveProject_ID ');
    
            } catch (error) {
                Evolve.Log.error(" EERR####:  Erorr while update project "+error.message);
                return new Error(" EERR####:  Erorr while update project "+error.message);
            }
        }
        else{
            try {
                return await Evolve.SqlPool.request()
                    .input('EvolveProject_ID', Evolve.Sql.Int, data.EvolveProject_ID)
                    .input('EvolveProject_Code', Evolve.Sql.NVarChar, data['Project'].trim())
                    .input('EvolveProject_Description', Evolve.Sql.NVarChar, data['Description'])
                    .input('EvolveProject_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                    .input('EvolveProject_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                    .query(' UPDATE EvolveProject SET EvolveProject_Code = @EvolveProject_Code, EvolveProject_Description = @EvolveProject_Description,EvolveProject_UpdatedAt = @EvolveProject_UpdatedAt, EvolveProject_UpdatedUser = @EvolveProject_UpdatedUser WHERE EvolveProject_ID = @EvolveProject_ID ');
    
            } catch (error) {
                Evolve.Log.error(" EERR####:  Erorr while update project "+error.message);
                return new Error(" EERR####:  Erorr while update project "+error.message);
            }
        }
        
    },

}