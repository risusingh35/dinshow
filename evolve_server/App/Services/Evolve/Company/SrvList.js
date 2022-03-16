'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getCompanyListCount: async function (search) 
    {
        try {
            return await Evolve.SqlPool.request()
          .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
          .query("SELECT COUNT(EvolveCompany_ID) as count FROM EvolveCompany WHERE  EvolveCompany_Name LIKE @search OR EvolveCompany_Code LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR1181: Error while  getting Company List Count "+error.message);
            return new Error(" EERR1181: Error while  getting Company List Count "+error.message);
        }
    },

    getCompanyList: async function (start , length,search) 
    {
        try {
            return await Evolve.SqlPool.request()
                .input('start',Evolve.Sql.Int,start)
                .input('length',Evolve.Sql.Int,length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT * FROM EvolveCompany WHERE  EvolveCompany_Name LIKE @search OR EvolveCompany_Code LIKE @search ORDER BY EvolveCompany_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1182: Error while getting Company List "+error.message);
            return new Error(" EERR1182: Error while getting Company List "+error.message);
        }
    },

    createCompany: async function (data) {
        try {
            let sqlConfig = {
                server: data.EvolveCompany_Host,
                port: data.EvolveCompany_Port,
                user: data.EvolveCompany_DBUser,
                password: data.EvolveCompany_Password,
                //database: 'master',
                pool: {
                    max: 100,
                    min: 0,
                    idleTimeoutMillis: 30000
                },
                options: {
                    encrypt: false // Use this if you're on Windows Azure
                }
            }
            let lastCompanyCode = await Evolve.SqlPool.request()
                .query('select EvolveSetting_CompanyCode from EvolveSetting');
            let EvolveCompany_Code = parseInt(lastCompanyCode.recordset[0].EvolveSetting_CompanyCode) + 1;
            let update = await Evolve.SqlPool.request()
                .input('EvolveSetting_CompanyCode', Evolve.Sql.Int, EvolveCompany_Code)
                .query('update EvolveSetting SET EvolveSetting_CompanyCode =@EvolveSetting_CompanyCode');
            let dataTime = new Date();
            let result = await Evolve.SqlPool.request()
                .input('EvolveCompany_Code', Evolve.Sql.NVarChar, EvolveCompany_Code)
                .input('EvolveCompany_Name', Evolve.Sql.NVarChar, data.EvolveCompany_Name)
                .input('EvolveCompany_Location', Evolve.Sql.NVarChar, data.EvolveCompany_Location)
                .input('EvolveCompany_Description', Evolve.Sql.NVarChar, data.EvolveCompany_Description)
                .input('EvolveCompany_LogoImage', Evolve.Sql.NVarChar, data.EvolveCompany_LogoImage)
                .input('EvolveCompany_DBName', Evolve.Sql.NVarChar, 'Evolve_' + EvolveCompany_Code)
                .input('EvolveCompany_DBUser', Evolve.Sql.NVarChar, data.EvolveCompany_DBUser)
                .input('EvolveCompany_Password', Evolve.Sql.NVarChar, data.EvolveCompany_Password)
                .input('EvolveCompany_Host', Evolve.Sql.NVarChar, data.EvolveCompany_Host)
                .input('EvolveCompany_Deployment', Evolve.Sql.NVarChar, data.EvolveCompany_Deployment)
                .input('EvolveCompany_Instance', Evolve.Sql.NVarChar, data.EvolveCompany_Instance)
                .input('EvolveCompany_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveCompany_CreatedAt', Evolve.Sql.DateTime, dataTime)
                .input('EvolveCompany_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveCompany_UpdatedAt', Evolve.Sql.DateTime, dataTime)
                .query('INSERT INTO EvolveCompany (EvolveCompany_Code,EvolveCompany_Name,EvolveCompany_Location,EvolveCompany_Description,EvolveCompany_LogoImage,EvolveCompany_DBName,EvolveCompany_DBUser,EvolveCompany_Password,EvolveCompany_Host,EvolveCompany_Deployment,EvolveCompany_Instance,EvolveCompany_CreatedUser,EvolveCompany_CreatedAt,EvolveCompany_UpdatedUser,EvolveCompany_UpdatedAt) VALUES (@EvolveCompany_Code,@EvolveCompany_Name,@EvolveCompany_Location,@EvolveCompany_Description,@EvolveCompany_LogoImage,@EvolveCompany_DBName,@EvolveCompany_DBUser,@EvolveCompany_Password,@EvolveCompany_Host,@EvolveCompany_Deployment,@EvolveCompany_Instance,@EvolveCompany_CreatedUser,@EvolveCompany_CreatedAt,@EvolveCompany_UpdatedUser,@EvolveCompany_UpdatedAt);select @@IDENTITY AS \'inserted_id\'');

            if (result instanceof Error || result.rowsAffected < 1) {
                Evolve.Log.Error(" EERR1183: Error In Create Company ", result);
                return new Error(" EERR1183: Error in Create Company ")
            } else {

                let inserted_id = result.recordset[0].inserted_id;
                let companyRelationResult = await Evolve.SqlPool.request()
                    .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                    .input('EvolveCompany_ID', Evolve.Sql.Int, inserted_id)
                    .input('EvolveUserCompanyLink_IsDefault', Evolve.Sql.Int, 0)
                    .input('EvolveUserCompanyLink_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                    .input('EvolveUserCompanyLink_CreatedAt', Evolve.Sql.DateTime, dataTime)
                    .input('EvolveUserCompanyLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                    .input('EvolveUserCompanyLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
                    .query('INSERT INTO EvolveUserCompanyLink (EvolveUser_ID,EvolveCompany_ID,EvolveUserCompanyLink_IsDefault,EvolveUserCompanyLink_CreatedUser,EvolveUserCompanyLink_CreatedAt,EvolveUserCompanyLink_UpdatedUser,EvolveUserCompanyLink_UpdatedAt) VALUES (@EvolveUser_ID,@EvolveCompany_ID,@EvolveUserCompanyLink_IsDefault,@EvolveUserCompanyLink_CreatedUser,@EvolveUserCompanyLink_CreatedAt,@EvolveUserCompanyLink_UpdatedUser,@EvolveUserCompanyLink_UpdatedAt)');

                if (companyRelationResult instanceof Error || companyRelationResult.rowsAffected < 1) {
                    Evolve.Log.Error(" EERR1184: Error In Create EvolveUserCompanyLink ", companyRelationResult);
                    return new Error(" EERR1184: Error In Create EvolveUserCompanyLink ")
                } else {
                    for (let i = 0; i < data.Evolve_Apps.length; i++) {
                        await Evolve.SqlPool.request()
                            .input('EvolveApp_ID', Evolve.Sql.Int, data.Evolve_Apps[i].EvolveApp_ID)
                            .input('EvoleCompany_ID', Evolve.Sql.Int, inserted_id)
                            .input('EvolveAppCompLink_Active', Evolve.Sql.Int, 1)
                            .input('EvolveApp_Key', Evolve.Sql.NVarChar, data.Evolve_Apps[i].EvolveApp_Key)
                            .input('EvolveAppCompLink_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                            .input('EvolveAppCompLink_CreatedAt', Evolve.Sql.DateTime, dataTime)
                            .input('EvolveAppCompLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                            .input('EvolveAppCompLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
                            .query('INSERT INTO EvolveAppCompLink (EvolveApp_ID,EvoleCompany_ID,EvolveAppCompLink_Active,EvolveApp_Key,EvolveAppCompLink_CreatedUser,EvolveAppCompLink_CreatedAt,EvolveAppCompLink_UpdatedUser,EvolveAppCompLink_UpdatedAt) VALUES (@EvolveApp_ID,@EvoleCompany_ID,@EvolveAppCompLink_Active,@EvolveApp_Key,@EvolveAppCompLink_CreatedUser,@EvolveAppCompLink_CreatedAt,@EvolveAppCompLink_UpdatedUser,@EvolveAppCompLink_UpdatedAt)');
                    }

                    if (data.EvolveCompany_Deployment == 'OnPremise') {
                        let connectSql = new Evolve.Sql.ConnectionPool(sqlConfig);
                        connectSql.connect().then(pool => {

                            let query = 'CREATE DATABASE Evolve_' + EvolveCompany_Code;
                            let test = pool.request()
                                .query(query);


                            return test;

                        }).catch(err => {
                            // Evolve.Log.Error("Error In Create EvolveUserCompanyLink");
                            return new Error(" EERR1185: Error in Create EvolveUserCompanyLink ")
                        })
                    }

                    return companyRelationResult;
                }
            }
            //  }




        } catch (error) {
            Evolve.Log.error("  "+error.message);
            return new Error("  "+error.message);
        }
    },

    getSingleSection: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSection_ID', Evolve.Sql.Int, data.id)
                .query('SELECT * FROM EvolveSection WHERE EvolveSection_ID = @EvolveSection_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1186: Error while  getting Single Section "+error.message);
            return new Error(" EERR1186: Error while  getting Single Section "+error.message);
        }
    },

    deleteSection: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSection_ID', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveSection WHERE EvolveSection_ID =@EvolveSection_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1187: Error while  deleting Section "+error.message);
            return new Error(" EERR1187: Error while  deleting Section "+error.message);
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
            Evolve.Log.error(" EERR1188: Error while updating Section "+error.message);
            return new Error(" EERR1188: Error while updating Section "+error.message);
        }
    },
    selectSingleCompany : async function (EvolveCompany_ID){
        try {
            let CompanyData = await Evolve.SqlPool.request()
                .input('EvolveCompany_ID', Evolve.Sql.Int, EvolveCompany_ID)
                .query('SELECT * FROM EvolveCompany WHERE EvolveCompany_ID = @EvolveCompany_ID')

            let appComData =  await Evolve.SqlPool.request()
            .input('EvolveCompany_ID', Evolve.Sql.Int, EvolveCompany_ID)
            .input('EvolveAppCompLink_Active',  Evolve.Sql.Int, 1)
            .query('SELECT EvolveApp_ID FROM EvolveAppCompLink WHERE EvoleCompany_ID = @EvolveCompany_ID AND EvolveAppCompLink_Active=@EvolveAppCompLink_Active')
                
            let appArray = []
            for (let i in appComData.recordset){
                appArray.push(appComData.recordset[i].EvolveApp_ID)
            }
            CompanyData.recordset[0].App_ID = appArray
            return CompanyData
            
        } catch (error) {
            Evolve.Log.error("  Error while get single company"+error.message);
            return new Error("  Error while get single company "+error.message);
        }
    },
    updateCompany : async function (data){
        try {
            let dataTime = new Date();
            let result = await Evolve.SqlPool.request()
            .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
            .input('EvolveCompany_Name', Evolve.Sql.NVarChar, data.EvolveCompany_Name)
            .input('EvolveCompany_Location', Evolve.Sql.NVarChar, data.EvolveCompany_Location)
            .input('EvolveCompany_Description', Evolve.Sql.NVarChar, data.EvolveCompany_Description)
            .input('EvolveCompany_LogoImage', Evolve.Sql.NVarChar, data.EvolveCompany_LogoImage)
            .input('EvolveCompany_DBUser', Evolve.Sql.NVarChar, data.EvolveCompany_DBUser)
            .input('EvolveCompany_Password', Evolve.Sql.NVarChar, data.EvolveCompany_Password)
            .input('EvolveCompany_Host', Evolve.Sql.NVarChar, data.EvolveCompany_Host)
            .input('EvolveCompany_Deployment', Evolve.Sql.NVarChar, data.EvolveCompany_Deployment)
            .input('EvolveCompany_Instance', Evolve.Sql.NVarChar, data.EvolveCompany_Instance)
            .input('EvolveCompany_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolveCompany_UpdatedAt', Evolve.Sql.DateTime, dataTime)
            .query('UPDATE EvolveCompany SET EvolveCompany_Name=@EvolveCompany_Name , EvolveCompany_Location=@EvolveCompany_Location , EvolveCompany_Description=@EvolveCompany_Description , EvolveCompany_LogoImage=@EvolveCompany_LogoImage , EvolveCompany_DBUser=@EvolveCompany_DBUser , EvolveCompany_Password=@EvolveCompany_Password ,EvolveCompany_Host=@EvolveCompany_Host , EvolveCompany_Deployment=@EvolveCompany_Deployment , EvolveCompany_Instance=@EvolveCompany_Instance , EvolveCompany_UpdatedUser=@EvolveCompany_UpdatedUser , EvolveCompany_UpdatedAt=@EvolveCompany_UpdatedAt WHERE EvolveCompany_ID=@EvolveCompany_ID');
            
            if (result instanceof Error || result.rowsAffected < 1) {
                Evolve.Log.Error(" Error In Update Company ", result);
                return new Error("Error in Upadate Company ")
            } else {
                let AppDataClear = await Evolve.SqlPool.request()
                        .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
                        .input('EvolveAppCompLink_Active', Evolve.Sql.Int, 0)
                        .query("UPDATE EvolveAppCompLink SET EvolveAppCompLink_Active=@EvolveAppCompLink_Active WHERE EvoleCompany_ID=@EvolveCompany_ID")
                    for (let i in data.Evolve_Apps){
                        let checkAppDataExist = await Evolve.SqlPool.request()
                        .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
                        .input('EvolveApp_ID', Evolve.Sql.Int, data.Evolve_Apps[i].EvolveApp_ID)
                        .query("SELECT EvolveAppCompLink_ID FROM EvolveAppCompLink WHERE EvolveApp_ID=@EvolveApp_ID AND EvoleCompany_ID=@EvolveCompany_ID")
                    
                        if(checkAppDataExist.rowsAffected < 1){
                            let addEvolveAppCompLink = await Evolve.SqlPool.request()
                            .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
                            .input('EvolveApp_ID', Evolve.Sql.Int, data.Evolve_Apps[i].EvolveApp_ID)
                            .input('EvolveApp_Key', Evolve.Sql.NVarChar, data.Evolve_Apps[i].EvolveApp_Key)
                            .input('EvolveAppCompLink_Active', Evolve.Sql.Int, 1)
                            .input('EvolveAppCompLink_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                            .input('EvolveAppCompLink_CreatedAt', Evolve.Sql.DateTime, dataTime)
                            .input('EvolveAppCompLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                            .input('EvolveAppCompLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
                            .query('INSERT INTO EvolveAppCompLink (EvolveApp_ID,EvoleCompany_ID,EvolveAppCompLink_Active,EvolveApp_Key,EvolveAppCompLink_CreatedUser,EvolveAppCompLink_CreatedAt,EvolveAppCompLink_UpdatedUser,EvolveAppCompLink_UpdatedAt) VALUES (@EvolveApp_ID,@EvolveCompany_ID,@EvolveAppCompLink_Active,@EvolveApp_Key,@EvolveAppCompLink_CreatedUser,@EvolveAppCompLink_CreatedAt,@EvolveAppCompLink_UpdatedUser,@EvolveAppCompLink_UpdatedAt)');
                            if (addEvolveAppCompLink instanceof Error || addEvolveAppCompLink.rowsAffected < 1) {
                                Evolve.Log.Error(" Error In Add EvolveAppCompLink ", addEvolveAppCompLink);
                                return new Error("Error in Add EvolveAppCompLink ")
                            }
                        }
                        else{
                            let updateEvolveAppCompLink = await Evolve.SqlPool.request()
                            .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
                            .input('EvolveApp_ID', Evolve.Sql.Int, data.Evolve_Apps[i].EvolveApp_ID)
                            .input('EvolveApp_Key', Evolve.Sql.NVarChar, data.Evolve_Apps[i].EvolveApp_Key)
                            .input('EvolveAppCompLink_Active', Evolve.Sql.Int, 1)
                            .input('EvolveAppCompLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                            .input('EvolveAppCompLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
                            .query("UPDATE EvolveAppCompLink SET EvolveApp_Key=@EvolveApp_Key , EvolveAppCompLink_Active=@EvolveAppCompLink_Active , EvolveAppCompLink_UpdatedUser=@EvolveAppCompLink_UpdatedUser , EvolveAppCompLink_UpdatedAt=@EvolveAppCompLink_UpdatedAt WHERE EvoleCompany_ID=@EvolveCompany_ID AND EvolveApp_ID=@EvolveApp_ID")
                            if (updateEvolveAppCompLink instanceof Error || updateEvolveAppCompLink.rowsAffected < 1) {
                                Evolve.Log.Error(" Error In Update EvolveAppCompLink ", updateEvolveAppCompLink);
                                return new Error("Error in Update EvolveAppCompLink ")
                            }
                        }
                    }
                
            }
            return {
                StatusCode : 200,
                message : "Company Updated Successfully"
            }
        } catch (error) {
            Evolve.Log.error("  Error while update company"+error.message);
            return new Error("  Error while update company "+error.message);
        }
    }
}