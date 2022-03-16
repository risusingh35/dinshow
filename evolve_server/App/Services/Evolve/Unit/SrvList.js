'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    unitListCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
          .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
          .query("SELECT COUNT(EvolveUnit_ID) as count FROM EvolveUnit WHERE EvolveUnit_Name LIKE @search OR EvolveUnit_Code LIKE @search")
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
    getUnitList: async function  (start ,length,search) {
        try {
            return await Evolve.SqlPool.request()
            .input('start',Evolve.Sql.Int,start)
            .input('length',Evolve.Sql.Int,length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT eu.*, ec.EvolveCompany_Name, ec.EvolveCompany_Code FROM EvolveUnit eu LEFT JOIN EvolveCompany ec ON eu.EvolveCompany_ID = ec.EvolveCompany_ID WHERE EvolveUnit_Name LIKE @search OR EvolveUnit_Code LIKE @search ORDER BY [EvolveUnit_ID] DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1443: Error while creating unit list "+error.message);
            return new Error(" EERR1443: Error while creating unit list "+error.message);
        }
    },
    getCompanyList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("  SELECT * FROM EvolveCompany ORDER BY EvolveCompany_ID DESC ");
        } catch (error) {
            Evolve.Log.error(" EERR1444: Error while getting Company List "+error.message);
            return new Error(" EERR1444: Error while getting Company List "+error.message);
        }
    },

    deleteSection: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSection_ID', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveSection WHERE EvolveSection_ID =@EvolveSection_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1445: Error while deleting Section "+error.message);
            return new Error(" EERR1445: Error while deleting Section "+error.message);
        }
    },

    updateUnit: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
         
            return await Evolve.SqlPool.request()
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
                .input('EvolveUnit_Description', Evolve.Sql.NVarChar, data.EvolveUnit_Description)
                .input('EvolveUnit_Location', Evolve.Sql.NVarChar, data.EvolveUnit_Location)
                .input('EvolveUnit_LogoImage', Evolve.Sql.NVarChar, data.EvolveUnit_LogoImage)
                .input('EvolveUnit_IsActive', Evolve.Sql.NVarChar, data.EvolveUnit_IsActive)
                .input('EvolveUnit_Email', Evolve.Sql.NVarChar, data.EvolveUnit_Email)
                .input('EvolveUnit_Gstin', Evolve.Sql.NVarChar, data.EvolveUnit_Gstin)
                .input('EvolveUnit_MachingField', Evolve.Sql.NVarChar, data.EvolveUnit_MachingField)
                .input('EvolveUnit_Identifier', Evolve.Sql.NVarChar, data.EvolveUnit_Identifier)
                .input('EvolveUnit_Code', Evolve.Sql.NVarChar, data.EvolveUnit_Code)

                .input('EvolveUnit_Pin', Evolve.Sql.Int, data.EvolveUnit_Pin == '' ? null : data.EvolveUnit_Pin)
                .input('EvolveUnit_Address', Evolve.Sql.NVarChar, data.EvolveUnit_Address)
                .input('EvolveUnit_StateCode', Evolve.Sql.Int, data.EvolveUnit_StateCode == '' ? null : data.EvolveUnit_StateCode)
                .input('EvolveUnit_Phone', Evolve.Sql.NVarChar, data.EvolveUnit_Phone)
                .input('EvolveUnit_GstnUser', Evolve.Sql.NVarChar, data.EvolveUnit_GstnUser)
                .input('EvolveUnit_GstnPass', Evolve.Sql.NVarChar, data.EvolveUnit_GstnPass)
                .input('EvolveUnit_Rek', Evolve.Sql.NVarChar, data.EvolveUnit_Rek)
                .input('EvolveUnit_Country', Evolve.Sql.NVarChar, data.EvolveUnit_Country)

                .input('EvolveUnit_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveUnit_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("UPDATE EvolveUnit SET EvolveUnit_Description = @EvolveUnit_Description, EvolveUnit_Location = @EvolveUnit_Location, EvolveUnit_LogoImage = @EvolveUnit_LogoImage, EvolveUnit_IsActive = @EvolveUnit_IsActive ,EvolveUnit_UpdatedAt=@EvolveUnit_UpdatedAt ,  EvolveUnit_UpdatedUser=@EvolveUnit_UpdatedUser, EvolveUnit_Email = @EvolveUnit_Email, EvolveUnit_Gstin = @EvolveUnit_Gstin, EvolveUnit_MachingField = @EvolveUnit_MachingField, EvolveUnit_Identifier = @EvolveUnit_Identifier, EvolveUnit_Code = @EvolveUnit_Code, EvolveUnit_Pin = @EvolveUnit_Pin, EvolveUnit_Address = @EvolveUnit_Address, EvolveUnit_StateCode = @EvolveUnit_StateCode, EvolveUnit_Phone = @EvolveUnit_Phone, EvolveUnit_GstnUser = @EvolveUnit_GstnUser, EvolveUnit_GstnPass = @EvolveUnit_GstnPass, EvolveUnit_Rek = @EvolveUnit_Rek, EvolveUnit_Country = @EvolveUnit_Country, EvolveCompany_ID = @EvolveCompany_ID WHERE EvolveUnit_ID = @EvolveUnit_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1446: Error while updating Unit "+error.message);
            return new Error(" EERR1446: Error while updating Unit "+error.message);
        }
    },


    createUnit: async function (data) {
        try {
            // let sqlConfig = {
            //     server: data.EvolveUnit_Instance,
            //     port: data.EvolveUnit_Port,
            //     user: data.EvolveUnit_DBUser,
            //     password: data.EvolveUnit_Password,
            //     //database: 'master',
            //     pool: {
            //         max: 100,
            //         min: 0,
            //         idleTimeoutMillis: 30000
            //     },
            //     options: {
            //         encrypt: false // Use this if you're on Windows Azure
            //     }
            // }


            // var str = data.EvolveUnit_Name;
            // var matches = str.match(/\b(\w)/g);
            // // let EvolveUnit_Code = matches.join('').toUpperCase();
            // let company_data = await Evolve.SqlPool.request()
            //     .input('EvolveCompany_ID', Evolve.Sql.NVarChar, data.EvolveCompany_ID)
            //     .query("SELECT EvolveCompany_Code FROM EvolveCompany WHERE EvolveCompany_ID = @EvolveCompany_ID")
            // let company_code = company_data.recordset[0].EvolveCompany_Code

            console.log(data)
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            
            return await Evolve.SqlPool.request()
                .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
                .input('EvolveUnit_Code', Evolve.Sql.NVarChar, data.EvolveUnit_Code)
                .input('EvolveUnit_Name', Evolve.Sql.NVarChar, data.EvolveUnit_Name)
                .input('EvolveUnit_Description', Evolve.Sql.NVarChar, data.EvolveUnit_Description)
                .input('EvolveUnit_Location', Evolve.Sql.NVarChar, data.EvolveUnit_Location)
                .input('EvolveUnit_LogoImage', Evolve.Sql.NVarChar, data.EvolveUnit_LogoImage)
                // .input('EvolveUnit_DBName', Evolve.Sql.NVarChar, 'Evolve_' + company_code + '_' + data.EvolveUnit_Code)
                // .input('EvolveUnit_DBUser', Evolve.Sql.NVarChar, data.EvolveUnit_DBUser)
                // .input('EvolveUnit_Password', Evolve.Sql.NVarChar, data.EvolveUnit_Password)
                // .input('EvolveUnit_Instance', Evolve.Sql.NVarChar, data.EvolveUnit_Instance)
                // .input('EvolveUnit_Port', Evolve.Sql.Int, data.EvolveUnit_Port)
                .input('EvolveUnit_IsActive', Evolve.Sql.Bit, data.EvolveUnit_IsActive)
                .input('EvolveUnit_Email', Evolve.Sql.NVarChar, data.EvolveUnit_Email)
                .input('EvolveUnit_Gstin', Evolve.Sql.NVarChar, data.EvolveUnit_Gstin)
                .input('EvolveUnit_MachingField', Evolve.Sql.NVarChar, data.EvolveUnit_MachingField)
                .input('EvolveUnit_Identifier', Evolve.Sql.NVarChar, data.EvolveUnit_Identifier)
                .input('EvolveUnit_Pin', Evolve.Sql.Int, data.EvolveUnit_Pin == '' ? null :  data.EvolveUnit_Pin)
                .input('EvolveUnit_Address', Evolve.Sql.NVarChar, data.EvolveUnit_Address)
                .input('EvolveUnit_StateCode', Evolve.Sql.Int, data.EvolveUnit_StateCode == '' ? null :  data.EvolveUnit_StateCode )
                .input('EvolveUnit_Phone', Evolve.Sql.NVarChar, data.EvolveUnit_Phone)
                .input('EvolveUnit_GstnUser', Evolve.Sql.NVarChar, data.EvolveUnit_GstnUser)
                .input('EvolveUnit_GstnPass', Evolve.Sql.NVarChar, data.EvolveUnit_GstnPass)
                .input('EvolveUnit_Rek', Evolve.Sql.NVarChar, data.EvolveUnit_Rek)
                .input('EvolveUnit_Country', Evolve.Sql.NVarChar, data.EvolveUnit_Country)

                .input('EvolveUnit_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveUnit_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveUnit_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveUnit_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query('INSERT INTO EvolveUnit (EvolveCompany_ID,EvolveUnit_Code,EvolveUnit_Name,EvolveUnit_Description,EvolveUnit_Location,EvolveUnit_LogoImage,EvolveUnit_IsActive,EvolveUnit_CreatedUser,EvolveUnit_CreatedAt,EvolveUnit_UpdatedUser,EvolveUnit_UpdatedAt, EvolveUnit_Email, EvolveUnit_Gstin, EvolveUnit_MachingField, EvolveUnit_Identifier, EvolveUnit_Pin, EvolveUnit_Address, EvolveUnit_StateCode, EvolveUnit_Phone, EvolveUnit_GstnUser, EvolveUnit_GstnPass, EvolveUnit_Rek, EvolveUnit_Country) VALUES (@EvolveCompany_ID,@EvolveUnit_Code,@EvolveUnit_Name,@EvolveUnit_Description,@EvolveUnit_Location,@EvolveUnit_LogoImage,@EvolveUnit_IsActive,@EvolveUnit_CreatedUser,@EvolveUnit_CreatedAt,@EvolveUnit_UpdatedUser,@EvolveUnit_UpdatedAt, @EvolveUnit_Email, @EvolveUnit_Gstin, @EvolveUnit_MachingField , @EvolveUnit_Identifier, @EvolveUnit_Pin, @EvolveUnit_Address, @EvolveUnit_StateCode, @EvolveUnit_Phone, @EvolveUnit_GstnUser, @EvolveUnit_GstnPass, @EvolveUnit_Rek, @EvolveUnit_Country);select @@IDENTITY AS \'inserted_id\'');

            // if (create_unit instanceof Error || create_unit.rowsAffected < 1) {
            //     Evolve.Log.Error(" EERR1447: Error in Create Unit ", create_unit);
            //     return new Error(" EERR1447: Error in Create Unit ")
            // } else {
            //     // let connectSql = new Evolve.Sql.ConnectionPool(sqlConfig);
            //     // connectSql.connect().then(pool => {
            //     //     let query = 'CREATE DATABASE Evolve_' + company_code + '_' + EvolveUnit_Code;
            //     //     let test = pool.request()
            //     //         .query(query);
            //     //     // Add Query Here for Create Tables in Company Tables.

            //     //     return test;
            //     // }).catch(err => {
            //     //     // Evolve.Log.Error(" EERR1448: Error In Create EvolveUserCompanyLink ");
            //     //     return new Error(" EERR1448: Error in Create EvolveUserCompanyLink ")
            //     // })
            //     return create_unit;
            // }

        } catch (error) {
            Evolve.Log.error(" EERR1449: Error while creating Unit "+error.message);
            return new Error(" EERR1449: Error while creating Unit "+error.message);
        }
    },

    selectSingleUnit: async function (data) {
        try {
            let unitRes = {};
            let unitData = await Evolve.SqlPool.request()

                .query('select * From EvolveUnit WHERE EvolveUnit_ID = ' + data.EvolveUnit_ID)
            if (unitData.rowsAffected > 0) {
                unitRes = unitData.recordset[0]
                return unitRes;
            }
            else {

            }
        } catch (error) {
            Evolve.Log.error(" EERR1450: Error while selecting Single Unit "+error.message);
            return new Error(" EERR1450: Error while selecting Single Unit "+error.message);
        }
    },

    checkUnitCodeExist: async function (EvolveUnit_Code) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveUnit_Code', Evolve.Sql.NVarChar, EvolveUnit_Code)

            .query('select * From EvolveUnit WHERE EvolveUnit_Code = @EvolveUnit_Code')
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check unit code "+error.message);
            return new Error(" EERR####: Error while check unit code "+error.message);
        }
    },

    updateUnitMaster : async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
         
            return await Evolve.SqlPool.request()
                .input('EvolveUnit_ID', Evolve.Sql.NVarChar, data['EvolveUnit_ID'])
                .input('EvolveUnit_Code', Evolve.Sql.NVarChar, data['Site'])
                .input('EvolveUnit_Description', Evolve.Sql.NVarChar, data['Description'])
                .input('EvolveCompany_ID', Evolve.Sql.NVarChar, data['EvolveCompany_ID'])
                .input('EvolveUnit_State', Evolve.Sql.NVarChar, data['State code'])
                .input('EvolveUnit_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveUnit_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .query("UPDATE EvolveUnit SET EvolveUnit_Description = @EvolveUnit_Description, EvolveCompany_ID = @EvolveCompany_ID, EvolveUnit_State = @EvolveUnit_State, EvolveUnit_UpdatedAt = @EvolveUnit_UpdatedAt,  EvolveUnit_UpdatedUser = @EvolveUnit_UpdatedUser WHERE EvolveUnit_ID = @EvolveUnit_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1446: Error while updating Unit "+error.message);
            return new Error(" EERR1446: Error while updating Unit "+error.message);
        }
    },

    addUnitMaster : async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
         
            return await Evolve.SqlPool.request()
                .input('EvolveUnit_Code', Evolve.Sql.NVarChar, data['Site'])
                .input('EvolveUnit_Description', Evolve.Sql.NVarChar, data['Description'])
                .input('EvolveCompany_ID', Evolve.Sql.NVarChar, data['EvolveCompany_ID'])
                .input('EvolveUnit_State', Evolve.Sql.NVarChar, data['State code'])
                .input('EvolveUnit_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .input('EvolveUnit_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveUnit_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .input('EvolveUnit_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query(" INSERT INTO EvolveUnit (EvolveUnit_Code, EvolveUnit_Description, EvolveCompany_ID, EvolveUnit_State, EvolveUnit_CreatedUser, EvolveUnit_CreatedAt, EvolveUnit_UpdatedUser, EvolveUnit_UpdatedAt) VALUES (@EvolveUnit_Code, @EvolveUnit_Description, @EvolveCompany_ID, @EvolveUnit_State, @EvolveUnit_CreatedUser, @EvolveUnit_CreatedAt, @EvolveUnit_UpdatedUser, @EvolveUnit_UpdatedAt) ");
        } catch (error) {
            Evolve.Log.error(" EERR1446: Error while adding Unit "+error.message);
            return new Error(" EERR1446: Error while adding Unit "+error.message);
        }
    },

    checkCompanyExist : async function (EvolveCompany_Code) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveCompany_Code', Evolve.Sql.NVarChar, EvolveCompany_Code)

            .query('select * From EvolveCompany WHERE EvolveCompany_Code = @EvolveCompany_Code')
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check company "+error.message);
            return new Error(" EERR####: Error while check company "+error.message);
        }
    },

    addCompany : async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
         
            return await Evolve.SqlPool.request()
                .input('EvolveCompany_Code', Evolve.Sql.NVarChar, data['Entity'])
                .input('EvolveCompany_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .input('EvolveCompany_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveCompany_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .input('EvolveCompany_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query(" INSERT INTO EvolveCompany (EvolveCompany_Code, EvolveCompany_CreatedUser, EvolveCompany_CreatedAt, EvolveCompany_UpdatedUser, EvolveCompany_UpdatedAt) VALUES (@EvolveCompany_Code, @EvolveCompany_CreatedUser, @EvolveCompany_CreatedAt, @EvolveCompany_UpdatedUser, @EvolveCompany_UpdatedAt) ;select @@IDENTITY AS \'inserted_id\' ");
        } catch (error) {
            Evolve.Log.error(" EERR1446: Error while adding company "+error.message);
            return new Error(" EERR1446: Error while adding company "+error.message);
        }
    },



}