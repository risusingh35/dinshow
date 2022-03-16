'use strict';

const Evolve = require('../../../Boot/Evolve');
//const EIOT_UserMasterModel  = Evolve.Mongoose.model('EIOT_UserMaster');

module.exports = {
    getSidebarMenuList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveMenu_AppId', Evolve.Sql.Int, 1)
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('SELECT em.EvolveMenu_Name,em.EvolveMenu_Id,em.EvolveMenu_Icon,em.EvolveMenu_Url FROM EvolveMenu em, EvolveRoleToMenu erm , EvolveUserRoleLink eurl, EvolveRole er WHERE eurl.EvolveUser_ID =@EvolveUser_ID AND eurl.EvolveRole_ID = er.EvolveRole_ID AND erm.EvolveRole_ID = eurl.EvolveRole_ID AND erm.EvolveMenu_ID = em.EvolveMenu_ID AND em.EvolveMenu_IsActive = 1 AND em.EvolveMenu_AppId =@EvolveMenu_AppId AND erm.EvolveApp_ID =@EvolveMenu_AppId   ORDER BY CONVERT(INT,EvolveMenu_Index) ASC');
        } catch (error) {
            Evolve.Log.error(" EERR1498: Error while getting Side bar menu list "+error.message);
            return new Error(" EERR1498: Error while getting Side bar menu list "+error.message);
        }
    },
    getSidebarMenuChildLinkList: async function (EvolveMenu_Id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveMenu_Id', Evolve.Sql.Int, EvolveMenu_Id)
                .query('SELECT EvolveMenu_Url FROM EvolveMenu WHERE EvolveMenu_Parent =@EvolveMenu_Id AND EvolveMenu_Index = 0');
        } catch (error) {
            Evolve.Log.error(" EERR1499: Error while getting Sidebar Menu Child Link List "+error.message);
            return new Error(" EERR1499: Error while getting Sidebar Menu Child Link List "+error.message);
        }
    },
    getAppCount: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query('select count(EvolveApp_ID) AS count from EvolveApp')
        } catch (error) {
            Evolve.Log.error(" EERR1500: Error while getting App Count "+error.message);
            return new Error(" EERR1500: Error while getting App Count "+error.message);
        }
    },

    getAppList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query('select * from EvolveApp WHERE EvolveApp_ID != 1')
        } catch (error) {
            Evolve.Log.error(" EERR1501: Error while getting App List "+error.message);
            return new Error(" EERR1501: Error while getting App List "+error.message);
        }
    },

    getAppByCode: async function (EvolveApp_Url) {
        try {
            // console.log("EvolveApp_Url>>>>" , EvolveApp_Url)
            return await Evolve.SqlPool.request()
                .input('EvolveApp_Url', Evolve.Sql.NVarChar, '%' + EvolveApp_Url + '%')
                .query("SELECT * FROM EvolveApp WHERE EvolveApp_Url LIKE @EvolveApp_Url;");
        } catch (error) {
            Evolve.Log.error("Error while getting App Detail "+error.message);
            return new Error("Error while getting App Detail "+error.message);
        }
    },








    // appListForRole: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query('select * from EvolveApp')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    getTopMenuAppList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query('select * from EvolveApp ORDER BY  EvolveApp_SEQ '); // WHERE EvolveApp_ID != 1 
        } catch (error) {
            Evolve.Log.error(" EERR1502: Error while getting Top Menu App List "+error.message);
            return new Error(" EERR1502: Error while getting Top Menu App List "+error.message);
        }
    },

    getAppDatatableList: async function (start, length) {
        try {

            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .query('select EvolveApp_ID,EvolveApp_Code,EvolveApp_Name,EvolveApp_Icon from EvolveApp ORDER BY EvolveApp_ID OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR1503: Error while getting App Datatable List "+error.message);
            return new Error(" EERR1503: Error while getting App Datatable List "+error.message);
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
                Evolve.Log.Error(" EERR1504: Error In Create Company ", result);
                return new Error(" EERR1504: Error In Create Company ")
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
                    Evolve.Log.Error(" EERR1505: Error In Create EvolveUserCompanyLink ", companyRelationResult);
                    return new Error(" EERR1505: Error In Create EvolveUserCompanyLink ")
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
                            return new Error("Error in Create EvolveUserCompanyLink")
                        })
                    }

                    return companyRelationResult;
                }
            }
            //  }




        } catch (error) {
            Evolve.Log.error(" EERR1506: Error in creating company "+error.message);
            return new Error(" EERR1506: Error in creating company "+error.message);
        }
    },

    getCompanyCount: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCompany_CreatedUser', Evolve.Sql.Int, id)
                .query('select count(EvolveCompany_ID) AS count from EvolveCompany WHERE EvolveCompany_CreatedUser =@EvolveCompany_CreatedUser')
        } catch (error) {
            Evolve.Log.error(" EERR1507: Error while getting company count "+error.message);
            return new Error(" EERR1507: Error while getting company count "+error.message);
        }
    },

    getCompanyDatatableList: async function (id, start, length) {
        try {

            return await Evolve.SqlPool.request()
                .input('EvolveCompany_CreatedUser', Evolve.Sql.Int, id)
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .query('select EvolveCompany_ID,EvolveCompany_Code,EvolveCompany_Name,EvolveCompany_Location,EvolveCompany_CreatedAt from EvolveCompany WHERE EvolveCompany_CreatedUser =@EvolveCompany_CreatedUser ORDER BY EvolveCompany_ID OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR1508: Error while getting Company Datatable List "+error.message);
            return new Error(" EERR1508: Error while getting Company Datatable List "+error.message);
        }
    },

    deleteCompany: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveCompany WHERE EvolveCompany_ID =@id')
        } catch (error) {
            Evolve.Log.error(" EERR1509: Error while deleting Company "+error.message);
            return new Error(" EERR1509: Error while deleting Company "+error.message);
        }
    },

    // getCompanyList: async function () {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query('select EvolveCompany_ID,EvolveCompany_Name from EvolveCompany')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    userCompanyList: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCompany_CreatedUser', Evolve.Sql.Int, id)
                .query('select EvolveCompany_ID,EvolveCompany_Name from EvolveCompany WHERE EvolveCompany_CreatedUser =@EvolveCompany_CreatedUser')
        } catch (error) {
            Evolve.Log.error(" EERR1510: Error in user Company list "+error.message);
            return new Error(" EERR1510: Error in user Company list "+error.message);
        }
    },

    // getCompanyListById: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
    //             .query('SELECT eut.EvolveUnit_ID , eut.EvolveUnit_Name FROM EvolveCompany ec , EvolveUnit eut WHERE ec.EvolveCompany_ID = eut.EvolveCompany_ID  AND ec.EvolveCompany_ID = @EvolveCompany_ID')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },


    // Units

    createUnit: async function (data) {
        try {
            let sqlConfig = {
                server: data.EvolveUnit_Instance,
                port: data.EvolveUnit_Port,
                user: data.EvolveUnit_DBUser,
                password: data.EvolveUnit_Password,
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


            var str = data.EvolveUnit_Name;
            var matches = str.match(/\b(\w)/g);
            let EvolveUnit_Code = matches.join('').toUpperCase();
            let company_data = await Evolve.SqlPool.request()
                .input('EvolveCompany_ID', Evolve.Sql.NVarChar, data.EvolveCompany_ID)
                .query("SELECT EvolveCompany_Code FROM EvolveCompany WHERE EvolveCompany_ID = @EvolveCompany_ID")
            let company_code = company_data.recordset[0].EvolveCompany_Code
            let dataTime = new Date();
            let create_unit = await Evolve.SqlPool.request()
                .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
                .input('EvolveUnit_Code', Evolve.Sql.NVarChar, EvolveUnit_Code)
                .input('EvolveUnit_Name', Evolve.Sql.NVarChar, data.EvolveUnit_Name)
                .input('EvolveUnit_Description', Evolve.Sql.NVarChar, data.EvolveUnit_Description)
                .input('EvolveUnit_Location', Evolve.Sql.NVarChar, data.EvolveUnit_Location)
                .input('EvolveUnit_LogoImage', Evolve.Sql.NVarChar, data.EvolveUnit_LogoImage)
                .input('EvolveUnit_DBName', Evolve.Sql.NVarChar, 'Evolve_' + company_code + '_' + EvolveUnit_Code)
                .input('EvolveUnit_DBUser', Evolve.Sql.NVarChar, data.EvolveUnit_DBUser)
                .input('EvolveUnit_Password', Evolve.Sql.NVarChar, data.EvolveUnit_Password)
                .input('EvolveUnit_Instance', Evolve.Sql.NVarChar, data.EvolveUnit_Instance)
                .input('EvolveUnit_Port', Evolve.Sql.Int, data.EvolveUnit_Port)
                .input('EvolveUnit_IsActive', Evolve.Sql.Bit, data.EvolveUnit_IsActive)
                .input('EvolveUnit_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveUnit_CreatedAt', Evolve.Sql.DateTime, dataTime)
                .input('EvolveUnit_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveUnit_UpdatedAt', Evolve.Sql.DateTime, dataTime)
                .query('INSERT INTO EvolveUnit (EvolveCompany_ID,EvolveUnit_Code,EvolveUnit_Name,EvolveUnit_Description,EvolveUnit_Location,EvolveUnit_LogoImage,EvolveUnit_DBName,EvolveUnit_DBUser,EvolveUnit_Password,EvolveUnit_Instance,EvolveUnit_Port,EvolveUnit_IsActive,EvolveUnit_CreatedUser,EvolveUnit_CreatedAt,EvolveUnit_UpdatedUser,EvolveUnit_UpdatedAt) VALUES (@EvolveCompany_ID,@EvolveUnit_Code,@EvolveUnit_Name,@EvolveUnit_Description,@EvolveUnit_Location,@EvolveUnit_LogoImage,@EvolveUnit_DBName,@EvolveUnit_DBUser,@EvolveUnit_Password,@EvolveUnit_Instance,@EvolveUnit_Port,@EvolveUnit_IsActive,@EvolveUnit_CreatedUser,@EvolveUnit_CreatedAt,@EvolveUnit_UpdatedUser,@EvolveUnit_UpdatedAt);select @@IDENTITY AS \'inserted_id\'');

            if (create_unit instanceof Error || create_unit.rowsAffected < 1) {
                Evolve.Log.Error(" EERR1511: Error In Create Unit ", create_unit);
                return new Error(" EERR1511: Error In Create Unit ")
            } else {
                let connectSql = new Evolve.Sql.ConnectionPool(sqlConfig);
                connectSql.connect().then(pool => {
                    let query = 'CREATE DATABASE Evolve_' + company_code + '_' + EvolveUnit_Code;
                    let test = pool.request()
                        .query(query);
                    // Add Query Here for Create Tables in Company Tables.

                    return test;
                }).catch(err => {
                    // Evolve.Log.Error("Error In Create EvolveUserCompanyLink");
                    return new Error("Error in Create EvolveUserCompanyLink")
                })
                return create_unit;
            }

        } catch (error) {
            Evolve.Log.error(" EERR1512: Error while creating unit "+error.message);
            return new Error(" EERR1512: Error while creating unit "+error.message);
        }
    },

    getUnitsCount: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUnit_CreatedUser', Evolve.Sql.Int, id)
                .query('select count(EvolveUnit_ID) AS count from EvolveUnit WHERE EvolveUnit_CreatedUser =@EvolveUnit_CreatedUser');
        } catch (error) {
            Evolve.Log.error(" EERR1513: Error while getting Units Count "+error.message);
            return new Error(" EERR1513: Error while getting Units Count "+error.message);
        }
    },

    getUnitsDatatableList: async function (id, start, length) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUnit_CreatedUser', Evolve.Sql.Int, id)
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .query('select EvolveUnit_ID,EvolveUnit_Code,EvolveUnit_Name,EvolveUnit_Location,EvolveUnit_CreatedAt from EvolveUnit WHERE EvolveUnit_CreatedUser =@EvolveUnit_CreatedUser ORDER BY EvolveUnit_ID OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR1514: Error while getting Units Datatable List "+error.message);
            return new Error(" EERR1514: Error while getting Units Datatable List "+error.message);
        }
    },

    getUserByData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, 1)
                .query('select * from EvolveUser where EvolveUser_ID = @id')

        } catch (error) {
            Evolve.Log.error(" EERR1515: Error while getting User By Data "+error.message);
            return new Error(" EERR1515: Error while getting User By Data "+error.message);
        }
    },

    getProdOrder: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                //    .input('id', Evolve.Sql.Int, 177)
                .query("SELECT distinct epd.EpodSerial , ep.EpoOrdersID, ep.EpoLMDT, ep.EpoNo, im.EitemCode, im.EitemDesc FROM  ESFprodOrderDetails epd , ESFprodOrders ep, ESFitemMaster im, ESFbomMaster ebom WHERE  epd.EpodStatus = 'In Process' AND epd.EpoID = ep.EpoID AND ep.EitemID = im.EitemID and ebom.EbomParent = im.EitemID")

        } catch (error) {
            Evolve.Log.error(" EERR1516: Error while getting Prod Order "+error.message);
            return new Error(" EERR1516: Error while getting Prod Order "+error.message);
        }
    },

    getProdTriggers: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                //    .input('id', Evolve.Sql.Int, 177)
                .query("Select distinct  (SELECT distinct count(epd.EpodSerial) FROM ESFprodOrderDetails epd where epd.EpodStatus = 'In Process') as Pending,(SELECT distinct count(epd.EpodSerial) as Total FROM ESFprodOrderDetails epd) as Total,(SELECT distinct count(epd.EpodSerial) as Total FROM ESFprodOrderDetails epd where epd.EpodStatus ='Completed') as Completed from ESFprodOrderDetails epod")

        } catch (error) {
            Evolve.Log.error(" EERR1517: Error while getting Prod Triggers "+error.message);
            return new Error(" EERR1517: Error while getting Prod Triggers "+error.message);
        }
    },

    deleteUnit: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveUnit WHERE EvolveUnit_ID =@id')
        } catch (error) {
            Evolve.Log.error(" EERR1518: Error while delete Unit "+error.message);
            return new Error(" EERR1518: Error while delete Unit "+error.message);
        }
    },

    // Users

    // createUser: async function (data) {
    //     try {
    //         //let data = req.body;
    //         let dataTime = new Date();
    //         let user_pass = Evolve.Bcrypt.hashSync(data.EvolveUser_password, 10)
    //         let create_user = await Evolve.SqlPool.request()
    //             .input('EvolveUser_login', Evolve.Sql.NVarChar, data.EvolveUser_login)
    //             .input('EvolveUser_EmailID', Evolve.Sql.NVarChar, data.EvolveUser_EmailID)
    //             .input('EvolveUser_Name', Evolve.Sql.NVarChar, data.EvolveUser_Name)
    //             .input('EvolveUser_password', Evolve.Sql.NVarChar, user_pass)
    //             .input('EvolveUser_IsActive', Evolve.Sql.Bit, data.EvolveUser_IsActive)
    //             .input('EvolveUser_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveUser_CreatedAt', Evolve.Sql.DateTime, dataTime)
    //             .input('EvolveUser_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveUser_UpdatedAt', Evolve.Sql.DateTime, dataTime)
    //             .input('EvolveUser_PrintAllow', Evolve.Sql.Bit, data.EvolveUser_PrintAllow)
    //             .input('EvolveUser_CreatePoAllow', Evolve.Sql.Bit, data.EvolveUser_CreatePoAllow)

    //             .input('EvolveUser_OldPassword', Evolve.Sql.NVarChar, '0,0,' + user_pass)
    //             .query('INSERT INTO EvolveUser (EvolveUser_login,EvolveUser_EmailID,EvolveUser_Name,EvolveUser_password,EvolveUser_IsActive,EvolveUser_CreatedUser,EvolveUser_CreatedAt,EvolveUser_UpdatedUser,EvolveUser_UpdatedAt,EvolveUser_PrintAllow,EvolveUser_CreatePoAllow,EvolveUser_OldPassword) VALUES (@EvolveUser_login,@EvolveUser_EmailID,@EvolveUser_Name,@EvolveUser_password,@EvolveUser_IsActive,@EvolveUser_CreatedUser,@EvolveUser_CreatedAt,@EvolveUser_UpdatedUser,@EvolveUser_UpdatedAt,@EvolveUser_PrintAllow,@EvolveUser_CreatePoAllow,@EvolveUser_OldPassword);select @@IDENTITY AS \'inserted_id\'');

    //         if (create_user instanceof Error || create_user.rowsAffected < 1) {
    //             Evolve.Log.Error("Error In Create User", result);
    //             return new Error("Error in Create User")
    //         } else {
    //             let inserted_id_user = create_user.recordset[0].inserted_id;

    //             let create_userToCmp = await Evolve.SqlPool.request()
    //                 .input('EvolveUser_ID', Evolve.Sql.Int, inserted_id_user)
    //                 .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvoleCompany_ID)
    //                 .input('EvolveUserCompanyLink_IsDefault', Evolve.Sql.Bit, false)
    //                 .input('EvolveUserCompanyLink_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //                 .input('EvolveUserCompanyLink_CreatedAt', Evolve.Sql.DateTime, dataTime)
    //                 .input('EvolveUserCompanyLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //                 .input('EvolveUserCompanyLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
    //                 .query('INSERT INTO EvolveUserCompanyLink (EvolveUser_ID,EvolveCompany_ID,EvolveUserCompanyLink_IsDefault,EvolveUserCompanyLink_CreatedUser,EvolveUserCompanyLink_CreatedAt,EvolveUserCompanyLink_UpdatedUser,EvolveUserCompanyLink_UpdatedAt) VALUES (@EvolveUser_ID,@EvolveCompany_ID,@EvolveUserCompanyLink_IsDefault,@EvolveUserCompanyLink_CreatedUser,@EvolveUserCompanyLink_CreatedAt,@EvolveUserCompanyLink_UpdatedUser,@EvolveUserCompanyLink_UpdatedAt);select @@IDENTITY AS \'inserted_id\'');

    //             if (create_userToCmp instanceof Error || create_userToCmp.rowsAffected < 1) {
    //                 Evolve.Log.Error("Error In Create User To Company Link", result);
    //                 return new Error("Error In Create User To Company Link")
    //             } else {
    //                 for (let i = 0; i < data.EvoleUnit_ID.length; i++) {
    //                     await Evolve.SqlPool.request()
    //                         .input('EvolveUser_ID', Evolve.Sql.Int, inserted_id_user)
    //                         .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvoleCompany_ID)
    //                         .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvoleUnit_ID[i])
    //                         .input('EvolveUserUnitLink_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //                         .input('EvolveUserUnitLink_CreatedAt', Evolve.Sql.DateTime, dataTime)
    //                         .input('EvolveUserUnitLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //                         .input('EvolveUserUnitLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
    //                         .query('INSERT INTO EvolveUserUnitLink (EvolveUser_ID,EvolveCompany_ID,EvolveUnit_ID,EvolveUserUnitLink_CreatedUser,EvolveUserUnitLink_CreatedAt,EvolveUserUnitLink_UpdatedUser,EvolveUserUnitLink_UpdatedAt) VALUES (@EvolveUser_ID,@EvolveCompany_ID,@EvolveUnit_ID,@EvolveUserUnitLink_CreatedUser,@EvolveUserUnitLink_CreatedAt,@EvolveUserUnitLink_UpdatedUser,@EvolveUserUnitLink_UpdatedAt)');
    //                 }

    //                 for (let i = 0; i < data.EvoleRole_ID.length; i++) {
    //                     await Evolve.SqlPool.request()
    //                         .input('EvolveUser_ID', Evolve.Sql.Int, inserted_id_user)
    //                         .input('EvolveRole_ID', Evolve.Sql.Int, data.EvoleRole_ID[i])
    //                         .input('EvolveUserRoleLink_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //                         .input('EvolveUserRoleLink_CreatedAt', Evolve.Sql.DateTime, dataTime)
    //                         .input('EvolveUserRoleLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //                         .input('EvolveUserRoleLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
    //                         .query('INSERT INTO EvolveUserRoleLink (EvolveUser_ID,EvolveRole_ID,EvolveUserRoleLink_CreatedUser,EvolveUserRoleLink_CreatedAt,EvolveUserRoleLink_UpdatedUser,EvolveUserRoleLink_UpdatedAt) VALUES (@EvolveUser_ID,@EvolveRole_ID,@EvolveUserRoleLink_CreatedUser,@EvolveUserRoleLink_CreatedAt,@EvolveUserRoleLink_UpdatedUser,@EvolveUserRoleLink_UpdatedAt)');
    //                 }
    //             }
    //             return create_user;
    //         }
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    getUsersCount: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUser_CreatedUser', Evolve.Sql.Int, id)
                .query('select count(EvolveUser_ID) AS count from EvolveUser WHERE EvolveUser_CreatedUser =@EvolveUser_CreatedUser');
        } catch (error) {
            Evolve.Log.error(" EERR1519: Error while getting users count "+error.message);
            return new Error(" EERR1519: Error while getting users count "+error.message);
        }
    },

    // getUsersDatatableList: async function (id, start, length) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('start', Evolve.Sql.Int, start)
    //             .input('length', Evolve.Sql.Int, length)
    //             .query('select EvolveUser_ID,EvolveUser_login,EvolveUser_Name,EvolveUser_EmailID,EvolveUser_CreatedAt from EvolveUser ORDER BY EvolveUser_ID ');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // deleteUser: async function (id) {

    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, id)
    //             .query('DELETE FROM EvolveUser WHERE EvolveUser_ID = @id')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },


    // Role

    // createRole: async function (data) {
    //     try {
    //         let dataTime = new Date();
    //         let create_role = await Evolve.SqlPool.request()
    //             .input('EvolveRole_Name', Evolve.Sql.NVarChar, data.EvolveRole_Name)
    //             .input('EvolveRole_Description', Evolve.Sql.NVarChar, data.EvolveRole_Description)
    //             .input('EvolveRole_IsActive', Evolve.Sql.Bit, data.EvolveRole_IsActive)
    //             .input('EvolveRole_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveRole_CreatedAt', Evolve.Sql.DateTime, dataTime)
    //             .input('EvolveRole_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveRole_UpdatedAt', Evolve.Sql.DateTime, dataTime)
    //             .query('INSERT INTO EvolveRole (EvolveRole_Name,EvolveRole_Description,EvolveRole_IsActive,EvolveRole_CreatedUser,EvolveRole_CreatedAt,EvolveRole_UpdatedUser,EvolveRole_UpdatedAt) VALUES (@EvolveRole_Name,@EvolveRole_Description,@EvolveRole_IsActive,@EvolveRole_CreatedUser,@EvolveRole_CreatedAt,@EvolveRole_UpdatedUser,@EvolveRole_UpdatedAt);select @@IDENTITY AS \'inserted_id\'');

    //         if (create_role instanceof Error || create_role.rowsAffected < 1) {
    //             Evolve.Log.Error("Error In Create Role", create_role);
    //             return new Error("Error in Create Role")
    //         } else {
    //             return create_role;
    //         }
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // getRoleList: async function () {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query('SELECT EvolveRole_ID,EvolveRole_Name FROM EvolveRole WHERE EvolveRole_IsActive = 1')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // selectSingleUser: async function (data) {

    //     try {
    //         let userRes = {};
    //         let userData = await Evolve.SqlPool.request()
    //             .query('select * From EvolveUser WHERE EvolveUser_ID = ' + data.EvolveUser_ID)
    //         if (userData.rowsAffected > 0) {
    //             userRes['user'] = userData.recordset[0]
    //             let userRole = await Evolve.SqlPool.request()
    //                 .query('select EvolveRole_ID From EvolveUserRoleLink WHERE EvolveUser_ID = ' + data.EvolveUser_ID)
    //             if (userRole.rowsAffected > 0) {
    //                 userRes['role'] = userRole.recordset
    //             }
    //             else {
    //                 Evolve.Log.error("  "+error.message);
    //                 return new Error("  "+error.message);
    //             }

    //             let userUnit = await Evolve.SqlPool.request()
    //                 .query('select EvolveUnit_ID From EvolveUserUnitLink WHERE EvolveUser_ID = ' + data.EvolveUser_ID)
    //             if (userUnit.rowsAffected > 0) {
    //                 userRes['unit'] = userUnit.recordset
    //             }
    //             else {
    //                 Evolve.Log.error("  "+error.message);
    //                 return new Error("  "+error.message);
    //             }

    //             let userCompany = await Evolve.SqlPool.request()
    //                 .query('select EvolveCompany_ID From EvolveUserCompanyLink WHERE EvolveUser_ID = ' + data.EvolveUser_ID)
    //             if (userCompany.rowsAffected > 0) {
    //                 userRes['company'] = userCompany.recordset
    //             }
    //             else {
    //                 Evolve.Log.error("  "+error.message);
    //                 return new Error("  "+error.message);
    //             }

    //             return userRes;
    //         }
    //         else {
    //             Evolve.Log.error("  "+error.message);
    //             return new Error("  "+error.message);
    //         }
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // updateUser: async function (data) {
    //     try {
    //         // let data = req.body
    //         let dataTime = new Date();
    //         let update_user = '';
    //         if (data.EvolveUser_password == '') {
    //             update_user = await Evolve.SqlPool.request()
    //                 .input('EvolveUser_ID', Evolve.Sql.NVarChar, data.EvolveUser_ID)
    //                 .input('EvolveUser_login', Evolve.Sql.NVarChar, data.EvolveUser_login)
    //                 .input('EvolveUser_EmailID', Evolve.Sql.NVarChar, data.EvolveUser_EmailID)
    //                 .input('EvolveUser_Name', Evolve.Sql.NVarChar, data.EvolveUser_Name)
    //                 .input('EvolveUser_IsActive', Evolve.Sql.Bit, data.EvolveUser_IsActive)
    //                 .input('EvolveUser_UpdatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
    //                 .input('EvolveUser_UpdatedAt', Evolve.Sql.DateTime, dataTime)
    //                 .input('EvolveUser_PrintAllow', Evolve.Sql.Bit, data.EvolveUser_PrintAllow)
    //                 .input('EvolveUser_CreatePoAllow', Evolve.Sql.Bit, data.EvolveUser_CreatePoAllow)

    //                 .query('UPDATE EvolveUser SET EvolveUser_login=@EvolveUser_login,EvolveUser_EmailID=@EvolveUser_EmailID,EvolveUser_Name=@EvolveUser_Name,EvolveUser_IsActive=@EvolveUser_IsActive,EvolveUser_UpdatedUser=@EvolveUser_UpdatedUser,EvolveUser_UpdatedAt=@EvolveUser_UpdatedAt , EvolveUser_PrintAllow = @EvolveUser_PrintAllow  , EvolveUser_CreatePoAllow = @EvolveUser_CreatePoAllow WHERE EvolveUser_ID=@EvolveUser_ID');
    //         } else {
    //             let user_pass = Evolve.Bcrypt.hashSync(data.EvolveUser_password, 10)
    //             update_user = await Evolve.SqlPool.request()
    //                 .input('EvolveUser_ID', Evolve.Sql.NVarChar, data.EvolveUser_ID)
    //                 .input('EvolveUser_login', Evolve.Sql.NVarChar, data.EvolveUser_login)
    //                 .input('EvolveUser_EmailID', Evolve.Sql.NVarChar, data.EvolveUser_EmailID)
    //                 .input('EvolveUser_Name', Evolve.Sql.NVarChar, data.EvolveUser_Name)
    //                 .input('EvolveUser_password', Evolve.Sql.NVarChar, user_pass)
    //                 .input('EvolveUser_IsActive', Evolve.Sql.Bit, data.EvolveUser_IsActive)
    //                 .input('EvolveUser_UpdatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
    //                 .input('EvolveUser_UpdatedAt', Evolve.Sql.DateTime, dataTime)
    //                 .input('EvolveUser_CreatePoAllow', Evolve.Sql.Bit, data.EvolveUser_CreatePoAllow)

    //                 .query('UPDATE EvolveUser SET EvolveUser_login=@EvolveUser_login,EvolveUser_EmailID=@EvolveUser_EmailID,EvolveUser_Name=@EvolveUser_Name,EvolveUser_password=@EvolveUser_password,EvolveUser_IsActive=@EvolveUser_IsActive,EvolveUser_UpdatedUser=@EvolveUser_UpdatedUser,EvolveUser_UpdatedAt=@EvolveUser_UpdatedAt ,EvolveUser_PrintAllow = @EvolveUser_PrintAllow , EvolveUser_CreatePoAllow=@EvolveUser_CreatePoAllow  WHERE EvolveUser_ID=@EvolveUser_ID');
    //         }

    //         if (update_user instanceof Error || update_user.rowsAffected < 1) {
    //             Evolve.Log.Error("Error In Create User", result);
    //             return new Error("Error in Create User")
    //         } else {
    //             let update_userToCmp = await Evolve.SqlPool.request()
    //                 .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
    //                 .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvoleCompany_ID)
    //                 .input('EvolveUserCompanyLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
    //                 .input('EvolveUserCompanyLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
    //                 .query('UPDATE EvolveUserCompanyLink SET EvolveCompany_ID=@EvolveCompany_ID,EvolveUserCompanyLink_UpdatedUser=@EvolveUserCompanyLink_UpdatedUser,EvolveUserCompanyLink_UpdatedAt=@EvolveUserCompanyLink_UpdatedAt WHERE EvolveUser_ID = @EvolveUser_ID');

    //             if (update_userToCmp instanceof Error || update_userToCmp.rowsAffected < 1) {
    //                 Evolve.Log.Error("Error In Update User To Company Link", update_userToCmp);
    //                 return new Error("Error In Update User To Company Link")
    //             }
    //             else {
    //                 let userUnits = await Evolve.SqlPool.request()
    //                     .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
    //                     .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvoleCompany_ID)
    //                     .query('select EvolveUnit_ID From EvolveUserUnitLink WHERE EvolveUser_ID = @EvolveUser_ID AND  EvolveCompany_ID = @EvolveCompany_ID')
    //                 if (userUnits) {
    //                     if (userUnits.rowsAffected > 0) {
    //                         let unitData = userUnits.recordset
    //                         let unitAll = []
    //                         let unitGet = []
    //                         for (let i = 0; i < unitData.length; i++) {
    //                             unitAll[i] = unitData[i]['EvolveUnit_ID']
    //                         }
    //                         for (let i = 0; i < data.EvolveUnit_ID.length; i++) {
    //                             unitGet[i] = parseInt(data.EvolveUnit_ID[i])
    //                         }
    //                         var removed_unit = unitAll.filter(function (obj) { return unitGet.indexOf(obj) == -1; });
    //                         var added_unit = unitGet.filter(function (obj) { return unitAll.indexOf(obj) == -1; });
    //                         for (let i = 0; i < removed_unit.length; i++) {
    //                             let remove_unit = await Evolve.SqlPool.request()
    //                                 .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
    //                                 .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvoleCompany_ID)
    //                                 .input('EvolveUnit_ID', Evolve.Sql.Int, removed_unit[i])
    //                                 .query('DELETE FROM EvolveUserUnitLink WHERE EvolveUser_ID = @EvolveUser_ID AND EvolveCompany_ID = @EvolveCompany_ID AND EvolveUnit_ID = @EvolveUnit_ID')
    //                         }
    //                         for (let i = 0; i < added_unit.length; i++) {
    //                             let add_unit = await Evolve.SqlPool.request()
    //                                 .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
    //                                 .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvoleCompany_ID)
    //                                 .input('EvolveUnit_ID', Evolve.Sql.Int, added_unit[i])
    //                                 .input('EvolveUserUnitLink_CreatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
    //                                 .input('EvolveUserUnitLink_CreatedAt', Evolve.Sql.DateTime, dataTime)
    //                                 .input('EvolveUserUnitLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
    //                                 .input('EvolveUserUnitLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
    //                                 .query('INSERT INTO EvolveUserUnitLink (EvolveUser_ID,EvolveCompany_ID,EvolveUnit_ID,EvolveUserUnitLink_CreatedUser,EvolveUserUnitLink_CreatedAt,EvolveUserUnitLink_UpdatedUser,EvolveUserUnitLink_UpdatedAt) VALUES (@EvolveUser_ID,@EvolveCompany_ID,@EvolveUnit_ID,@EvolveUserUnitLink_CreatedUser,@EvolveUserUnitLink_CreatedAt,@EvolveUserUnitLink_UpdatedUser,@EvolveUserUnitLink_UpdatedAt)');
    //                         }
    //                     }
    //                 } else {
    //                     Evolve.Log.Error("Error In Get User Units", userUnits);
    //                     return new Error("Error In Get User Units")
    //                 }


    //                 let userRoles = await Evolve.SqlPool.request()
    //                     .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
    //                     .query('select EvolveRole_ID From EvolveUserRoleLink WHERE EvolveUser_ID = @EvolveUser_ID')
    //                 if (userRoles) {
    //                     if (userRoles.rowsAffected > 0) {
    //                         let roleData = userRoles.recordset
    //                         let roleAll = []
    //                         let roleGet = []
    //                         for (let i = 0; i < roleData.length; i++) {
    //                             roleAll[i] = roleData[i]['EvolveRole_ID']
    //                         }
    //                         for (let i = 0; i < data.EvolveRole_ID.length; i++) {
    //                             roleGet[i] = parseInt(data.EvolveRole_ID[i])
    //                         }
    //                         var removed_role = roleAll.filter(function (obj) { return roleGet.indexOf(obj) == -1; });
    //                         var added_role = roleGet.filter(function (obj) { return roleAll.indexOf(obj) == -1; });
    //                         for (let i = 0; i < removed_role.length; i++) {
    //                             let remove_unit = await Evolve.SqlPool.request()
    //                                 .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
    //                                 .input('EvolveRole_ID', Evolve.Sql.Int, removed_role[i])
    //                                 .query('DELETE FROM EvolveUserRoleLink WHERE EvolveUser_ID = @EvolveUser_ID AND EvolveRole_ID = @EvolveRole_ID')
    //                         }
    //                         for (let i = 0; i < added_role.length; i++) {
    //                             let add_role = await Evolve.SqlPool.request()
    //                                 .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
    //                                 .input('EvolveRole_ID', Evolve.Sql.Int, added_role[i])
    //                                 .input('EvolveUserRoleLink_CreatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
    //                                 .input('EvolveUserRoleLink_CreatedAt', Evolve.Sql.DateTime, dataTime)
    //                                 .input('EvolveUserRoleLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
    //                                 .input('EvolveUserRoleLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
    //                                 .query('INSERT INTO EvolveUserRoleLink (EvolveUser_ID,EvolveRole_ID,EvolveUserRoleLink_CreatedUser,EvolveUserRoleLink_CreatedAt,EvolveUserRoleLink_UpdatedUser,EvolveUserRoleLink_UpdatedAt) VALUES (@EvolveUser_ID,@EvolveRole_ID,@EvolveUserRoleLink_CreatedUser,@EvolveUserRoleLink_CreatedAt,@EvolveUserRoleLink_UpdatedUser,@EvolveUserRoleLink_UpdatedAt)');
    //                         }
    //                     }
    //                 } else {
    //                     Evolve.Log.Error("Error In Get User Units", userUnits);
    //                     return new Error("Error In Get User Units")
    //                 }
    //             }
    //             return update_user;
    //         }
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

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
            Evolve.Log.error(" EERR1520: Error while selecting Single Unit "+error.message);
            return new Error(" EERR1520: Error while selecting Single Unit "+error.message);
        }
    },

    updateUnit: async function (req) {
        try {
            let data = req.body;
            let dataTime = new Date();
            let update_unit = await Evolve.SqlPool.request()
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveUnit_Description', Evolve.Sql.NVarChar, data.EvolveUnit_Description)
                .input('EvolveUnit_Location', Evolve.Sql.NVarChar, data.EvolveUnit_Location)
                .input('EvolveUnit_LogoImage', Evolve.Sql.NVarChar, data.EvolveUnit_LogoImage)
                .input('EvolveUnit_IsActive', Evolve.Sql.Bit, data.EvolveUnit_IsActive)
                .input('EvolveUnit_UpdatedUser', Evolve.Sql.Int, req.EvolveUser_ID)
                .input('EvolveUnit_UpdatedAt', Evolve.Sql.DateTime, dataTime)
                .query('UPDATE EvolveUnit SET EvolveUnit_Description=@EvolveUnit_Description,EvolveUnit_Location=@EvolveUnit_Location,EvolveUnit_LogoImage=@EvolveUnit_LogoImage , EvolveUnit_IsActive = @EvolveUnit_IsActive , EvolveUnit_UpdatedUser=@EvolveUnit_UpdatedUser  ,EvolveUnit_UpdatedAt=@EvolveUnit_UpdatedAt WHERE EvolveUnit_ID = @EvolveUnit_ID');

            if (update_unit instanceof Error || update_unit.rowsAffected < 1) {
                Evolve.Log.Error(" EERR1521: Error In Update Unit ", update_unit);
                return new Error(" EERR1522: Error In Update Unit ")
            } else {
                return update_unit;
            }
        } catch (error) {
            Evolve.Log.error("  "+error.message);
            return new Error(" EERR1522: Error while update Unit "+error.message);
        }
    },

    // getAppMenuByAppId: async function (data) {
    //     try {
    //         let dataTime = new Date();
    //         // let MenuList = await Evolve.SqlPool.request()
    //         //     .input('EvolveMenu_AppId', Evolve.Sql.Int, data.EvolveMenu_AppId)
    //         //     .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
    //         //     .query('SELECT EvolveMenu_Id, EvolveMenu_Desc, EvolveMenu_Name , EvolveMenu_Index, EvolveMenu_Parent, EvolveMenu_Url, EvolveMenu_IsActive, EvolveMenu_AppId,EvolveMenu_Icon FROM EvolveMenu WHERE EvolveMenu_AppId=@EvolveMenu_AppId AND EvolveMenu_CreatedUser=@EvolveUser_ID')




    //         let MenuList = await Evolve.SqlPool.request()
    //             .input('EvolveMenu_AppId', Evolve.Sql.Int, data.EvolveMenu_AppId)
    //             .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
    //             .query('SELECT em.EvolveMenu_Id, em.EvolveMenu_Desc, em.EvolveMenu_Name , em.EvolveMenu_Index, em.EvolveMenu_Parent, em.EvolveMenu_Url, em.EvolveMenu_IsActive, em.EvolveMenu_AppId,em.EvolveMenu_Icon , (SELECT COUNT(erm.EvolveMenu_ID) FROM EvolveRoleToMenu erm WHERE erm.EvolveRole_ID = @EvolveRole_ID AND erm.EvolveApp_ID = @EvolveMenu_AppId AND erm.EvolveMenu_ID = em.EvolveMenu_Id) as assigned FROM EvolveMenu em WHERE em.EvolveMenu_AppId=@EvolveMenu_AppId AND (em.EvolveMenu_CreatedUser=@EvolveUser_ID OR em.EvolveMenu_CreatedUser=0) AND em.EvolveMenu_IsActive = 1 ORDER BY em.EvolveMenu_Index asc')
    //         if (MenuList instanceof Error || MenuList.rowsAffected < 1) {
    //             return new Error("Error on Get Menu List")
    //         } else {
    //             return MenuList;
    //         }
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // createMenu: async function (data) {
    //     try {
    //         let dataTime = new Date();
    //         let parent = '';
    //         let newIndex = '';
    //         if (data.EvolveMenu_Parent == 0) {
    //             parent = '0'
    //             let getLastIndex = await Evolve.SqlPool.request()
    //                 .query("SELECT TOP(1) EvolveMenu_Index FROM EvolveMenu WHERE EvolveMenu_Parent = '0' ORDER BY EvolveMenu_Id Desc")
    //             if (getLastIndex.rowsAffected >= 1) {
    //                 newIndex = parseInt(getLastIndex.recordset[0].EvolveMenu_Index) + 1

    //             } else {
    //                 newIndex = 1

    //             }
    //         } else {
    //             parent = data.EvolveMenu_Parent
    //             let getLastIndex = await Evolve.SqlPool.request()
    //                 .input('EvolveMenu_Parent', Evolve.Sql.NVarChar, data.EvolveMenu_Parent)
    //                 .query("SELECT TOP(1) EvolveMenu_Index FROM EvolveMenu WHERE EvolveMenu_Parent = @EvolveMenu_Parent ORDER BY EvolveMenu_Id Desc")
    //             if (getLastIndex.rowsAffected[0] >= 1) {
    //                 newIndex = getLastIndex.recordset[0].EvolveMenu_Index.split(".")
    //                 newIndex = parseInt(newIndex[newIndex.length - 1]) + 1
    //                 newIndex = data.EvolveMenu_Parent + '.' + newIndex

    //             } else {
    //                 newIndex = data.EvolveMenu_Parent + '.' + 1

    //             }
    //         }

    //         let createMenu = await Evolve.SqlPool.request()
    //             .input('EvolveMenu_Name', Evolve.Sql.NVarChar, data.EvolveMenu_Name)
    //             .input('EvolveMenu_Desc', Evolve.Sql.NVarChar, data.EvolveMenu_Desc)
    //             .input('EvolveMenu_Url', Evolve.Sql.NVarChar, data.EvolveMenu_Url)
    //             .input('EvolveMenu_IsActive', Evolve.Sql.Bit, data.EvolveMenu_IsActive)
    //             .input('EvolveMenu_Index', Evolve.Sql.NVarChar, newIndex)
    //             .input('EvolveMenu_Parent', Evolve.Sql.NVarChar, parent)
    //             .input('EvolveMenu_AppId', Evolve.Sql.Int, data.EvolveMenu_AppId)
    //             .input('EvolveMenu_Icon', Evolve.Sql.NVarChar, data.EvolveMenu_Icon)
    //             .input('EvolveMenu_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveMenu_CreatedAt', Evolve.Sql.DateTime, dataTime)
    //             .input('EvolveMenu_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveMenu_UpdatedAt', Evolve.Sql.DateTime, dataTime)
    //             .query('INSERT INTO EvolveMenu (EvolveMenu_Name,EvolveMenu_Desc,EvolveMenu_Url,EvolveMenu_IsActive,EvolveMenu_Index,EvolveMenu_Parent,EvolveMenu_AppId,EvolveMenu_Icon,EvolveMenu_CreatedUser,EvolveMenu_CreatedAt,EvolveMenu_UpdatedUser,EvolveMenu_UpdatedAt) VALUES (@EvolveMenu_Name,@EvolveMenu_Desc,@EvolveMenu_Url,@EvolveMenu_IsActive,@EvolveMenu_Index,@EvolveMenu_Parent,@EvolveMenu_AppId,@EvolveMenu_Icon,@EvolveMenu_CreatedUser,@EvolveMenu_CreatedAt,@EvolveMenu_UpdatedUser,@EvolveMenu_UpdatedAt)')
    //         if (createMenu instanceof Error || createMenu.rowsAffected < 1) {
    //             Evolve.Log.Error("Error on Create Menu", createMenu);
    //             return new Error("Error on Create Menu")
    //         } else {
    //             return createMenu;
    //         }
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    getMenusCount: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUser_id', Evolve.Sql.Int, id)
                .query('SELECT COUNT(EvolveMenu_Id) as count FROM EvolveMenu WHERE (EvolveMenu_CreatedUser =@EvolveUser_id OR EvolveMenu_CreatedUser IS NULL )');
        } catch (error) {
            Evolve.Log.error(" EERR1523: Error while getting Menus Count "+error.message);
            return new Error(" EERR1523: Error while getting Menus Count "+error.message);
        }
    },

    // getMenusDatatableList: async function (id, start, length) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveUser_id', Evolve.Sql.Int, id)
    //             .input('start', Evolve.Sql.Int, start)
    //             .input('length', Evolve.Sql.Int, length)
    //             .query('SELECT em.EvolveMenu_Id,em.EvolveMenu_Name,em.EvolveMenu_Desc,em.EvolveMenu_Url,em.EvolveMenu_IsActive,em.EvolveMenu_Index,em.EvolveMenu_Parent,em.EvolveMenu_AppId , ea.EvolveApp_Name , (SELECT emj.EvolveMenu_Name FROM EvolveMenu emj WHERE emj.EvolveMenu_Index = em.EvolveMenu_Parent AND emj.EvolveMenu_AppId = em.EvolveMenu_AppId) as parent  FROM EvolveMenu em , EvolveApp ea WHERE ea.EvolveApp_ID = em.EvolveMenu_AppId AND (em.EvolveMenu_CreatedUser =@EvolveUser_id OR em.EvolveMenu_CreatedUser IS NULL ) ORDER BY em.EvolveMenu_Index ');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },
    // getMenusByAppId: async function (id) {
    //     try {

    //         return await Evolve.SqlPool.request()
    //             .input('Menu_AppID', Evolve.Sql.Int, id)
    //             .query('SELECT em.EvolveMenu_Id,em.EvolveMenu_Name,em.EvolveMenu_Desc,em.EvolveMenu_Url,em.EvolveMenu_IsActive,em.EvolveMenu_Index,em.EvolveMenu_Parent,em.EvolveMenu_AppId , ea.EvolveApp_Name , (SELECT emj.EvolveMenu_Name FROM EvolveMenu emj WHERE emj.EvolveMenu_Index = em.EvolveMenu_Parent AND emj.EvolveMenu_AppId = em.EvolveMenu_AppId) as parent  FROM EvolveMenu em , EvolveApp ea WHERE ea.EvolveApp_ID = em.EvolveMenu_AppId AND em.EvolveMenu_AppId = @Menu_AppID ORDER BY em.EvolveMenu_Index ');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },
    getRolesCount: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT COUNT(EvolveRole_ID) as count FROM EvolveRole');
        } catch (error) {
            Evolve.Log.error(" EERR1524: Error while getting Roles Count "+error.message);
            return new Error(" EERR1524: Error while getting Roles Count "+error.message);
        }
    },

    getRolesDatatableList: async function (id, start, length) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .query('SELECT EvolveRole_ID , EvolveRole_Name , EvolveRole_Description , EvolveRole_IsActive FROM EvolveRole  ORDER BY EvolveRole_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR1525: Error while getting Roles Datatable List "+error.message);
            return new Error(" EERR1525: Error while getting Roles Datatable List "+error.message);
        }
    },


    // deleteRole: async function (id) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, id)
    //             .query('DELETE FROM EvolveRole WHERE EvolveRole_ID =@id')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // selectSingleRole: async function (id) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, id)
    //             .query('SELECT EvolveRole_ID,EvolveRole_Name,EvolveRole_Description , EvolveRole_IsActive FROM EvolveRole WHERE EvolveRole_ID = @id')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // updateRole: async function (data) {
    //     try {
    //         let dataTime = new Date();
    //         let update_role = await Evolve.SqlPool.request()
    //             .input('EvolveRole_ID', Evolve.Sql.NVarChar, data.EvolveRole_ID)
    //             .input('EvolveRole_Name', Evolve.Sql.NVarChar, data.EvolveRole_Name)
    //             .input('EvolveRole_Description', Evolve.Sql.NVarChar, data.EvolveRole_Description)
    //             .input('EvolveRole_IsActive', Evolve.Sql.Bit, data.EvolveRole_IsActive)
    //             .input('EvolveRole_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveRole_UpdatedAt', Evolve.Sql.DateTime, dataTime)
    //             .query('UPDATE EvolveRole SET EvolveRole_Name = @EvolveRole_Name , EvolveRole_Description = @EvolveRole_Description , EvolveRole_IsActive = @EvolveRole_IsActive , EvolveRole_UpdatedUser = @EvolveRole_UpdatedUser , EvolveRole_UpdatedAt = @EvolveRole_UpdatedAt WHERE EvolveRole_ID = @EvolveRole_ID');

    //         if (update_role instanceof Error || update_role.rowsAffected < 1) {
    //             Evolve.Log.Error("Error In Update Role", create_role);
    //             return new Error("Error in Update Role")
    //         } else {
    //             return update_role;
    //         }
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // updateRoleToMenu: async function (data) {
    //     try {
    //         let date = new Date();
    //         let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    //         let error = false;
    //         let roleToMenu = await Evolve.SqlPool.request()
    //             .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
    //             .input('EvolveApp_ID', Evolve.Sql.Int, data.EvolveApp_ID)
    //             .query('SELECT * FROM EvolveRoleToMenu WHERE EvolveRole_ID=@EvolveRole_ID AND EvolveApp_ID = @EvolveApp_ID ');

    //         let already_role = roleToMenu.recordset;
    //         let old_menus = [];
    //         let new_menus = [];
    //         for (let i = 0; i < already_role.length; i++) {
    //             old_menus[i] = parseInt(already_role[i].EvolveMenu_ID);
    //         }
    //         for (let i = 0; i < data.selectedMenuArray.length; i++) {
    //             new_menus[i] = parseInt(data.selectedMenuArray[i])
    //         }

    //         var removed_menus = old_menus.filter(function (obj) { return new_menus.indexOf(obj) == -1; });
    //         var added_menus = new_menus.filter(function (obj) { return old_menus.indexOf(obj) == -1; });

    //         if (removed_menus.length > 0 || added_menus.length > 0) {
    //             for (let i = 0; i < removed_menus.length; i++) {
    //                 let remove_unit = await Evolve.SqlPool.request()
    //                     .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
    //                     .input('EvolveMenu_ID', Evolve.Sql.Int, removed_menus[i])
    //                     .input('EvolveApp_ID', Evolve.Sql.Int, data.EvolveApp_ID)
    //                     .query('DELETE FROM EvolveRoleToMenu WHERE EvolveRole_ID = @EvolveRole_ID AND EvolveMenu_ID = @EvolveMenu_ID AND EvolveApp_ID = @EvolveApp_ID')
    //                 if (remove_unit instanceof Error || remove_unit.rowsAffected < 1) {
    //                     error = true;
    //                 }
    //             }
    //             for (let i = 0; i < added_menus.length; i++) {
    //                 let roleToMenuCreate = await Evolve.SqlPool.request()
    //                     .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
    //                     .input('EvolveMenu_ID', Evolve.Sql.Int, added_menus[i])
    //                     .input('EvolveApp_ID', Evolve.Sql.Int, data.EvolveApp_ID)
    //                     .input('EvolveRoleToMenu_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //                     .input('EvolveRoleToMenu_CreatedAt', Evolve.Sql.NVarChar, dataTime)
    //                     .query('INSERT INTO EvolveRoleToMenu(EvolveRole_ID,EvolveMenu_ID,EvolveApp_ID,EvolveRoleToMenu_CreatedUser,EvolveRoleToMenu_CreatedAt) VALUES (@EvolveRole_ID,@EvolveMenu_ID,@EvolveApp_ID,@EvolveRoleToMenu_CreatedUser,@EvolveRoleToMenu_CreatedAt)');
    //                 if (roleToMenuCreate instanceof Error || roleToMenuCreate.rowsAffected < 1) {
    //                     error = true;
    //                 }
    //             }
    //         }

    //         return true;

    //         // let update_role = await Evolve.SqlPool.request()
    //         //     .input('EvolveRole_ID', Evolve.Sql.NVarChar, data.EvolveRole_ID)
    //         //     .input('EvolveRole_Name', Evolve.Sql.NVarChar, data.EvolveRole_Name)
    //         //     .input('EvolveRole_Description', Evolve.Sql.NVarChar, data.EvolveRole_Description)
    //         // 	.input('EvolveRole_IsActive', Evolve.Sql.Bit, data.EvolveRole_IsActive)
    //         //     .input('EvolveRole_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //         // 	.input('EvolveRole_UpdatedAt', Evolve.Sql.DateTime, dataTime)
    //         //     .query('UPDATE EvolveRole SET EvolveRole_Name = @EvolveRole_Name , EvolveRole_Description = @EvolveRole_Description , EvolveRole_IsActive = @EvolveRole_IsActive , EvolveRole_UpdatedUser = @EvolveRole_UpdatedUser , EvolveRole_UpdatedAt = @EvolveRole_UpdatedAt WHERE EvolveRole_ID = @EvolveRole_ID');

    //         // if(update_role instanceof Error || update_role.rowsAffected < 1){
    //         //     Evolve.Log.Error("Error In Update Role",create_role);
    //         //     return new Error("Error in Update Role")
    //         // }else{
    //         //     return update_role;
    //         // }
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // selectSingleMenu: async function (data) {
    //     try {
    //         let menuRes = {};
    //         let menuData = await Evolve.SqlPool.request()
    //             .input('EvolveMenu_ID', Evolve.Sql.Int, data.EvolveMenu_ID)
    //             .input('EvolveMenu_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .query('SELECT em.EvolveMenu_Id,em.EvolveMenu_Name,em.EvolveMenu_Desc,em.EvolveMenu_Url,em.EvolveMenu_AppId,em.EvolveMenu_IsActive,em.EvolveMenu_Index,em.EvolveMenu_Parent, em.EvolveMenu_Icon FROM EvolveMenu em WHERE em.EvolveMenu_Id= @EvolveMenu_ID')
    //         if (menuData.rowsAffected > 0) {
    //             menuRes = menuData.recordset[0]
    //             return menuRes;
    //         }
    //         else {

    //         }
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // updateMenu: async function (data) {
    //     try {
    //         console.log("BOdy data in services >>>> ", data)
    //         let dataTime = new Date();
    //         let parent = '';
    //         let newIndex = '';
    //         let old_parent = '';
    //         let getParet = await Evolve.SqlPool.request()
    //             .input('EvolveMenu_Id', Evolve.Sql.Int, data.EvolveMenu_Id)
    //             .query("SELECT EvolveMenu_Parent FROM EvolveMenu WHERE EvolveMenu_Id = @EvolveMenu_Id")
    //         if (getParet.recordset[0].EvolveMenu_Parent == '') {
    //             old_parent = 0
    //         } else {
    //             old_parent = getParet.recordset[0].EvolveMenu_Parent
    //         }

    //         if (old_parent != data.EvolveMenu_Parent) {
    //             if (data.EvolveMenu_Parent == 0) {
    //                 parent = ''
    //                 let getLastIndex = await Evolve.SqlPool.request()
    //                     .query("SELECT TOP(1) EvolveMenu_Index FROM EvolveMenu WHERE (EvolveMenu_Parent = '' OR EvolveMenu_Parent IS NULL) ORDER BY EvolveMenu_Id Desc")
    //                 if (getLastIndex.rowsAffected >= 1) {
    //                     newIndex = parseInt(getLastIndex.recordset[0].EvolveMenu_Index) + 1
    //                 } else {
    //                     newIndex = 1
    //                 }
    //             } else {
    //                 parent = data.EvolveMenu_Parent
    //                 let getLastIndex = await Evolve.SqlPool.request()
    //                     .input('EvolveMenu_Parent', Evolve.Sql.NVarChar, data.EvolveMenu_Parent)
    //                     .query("SELECT TOP(1) EvolveMenu_Index FROM EvolveMenu WHERE EvolveMenu_Parent = @EvolveMenu_Parent ORDER BY EvolveMenu_Id Desc")
    //                 if (getLastIndex.rowsAffected[0] >= 1) {
    //                     newIndex = getLastIndex.recordset[0].EvolveMenu_Index.split(".")
    //                     newIndex = parseInt(newIndex[newIndex.length - 1]) + 1
    //                     newIndex = data.EvolveMenu_Parent + '.' + newIndex
    //                 } else {
    //                     newIndex = data.EvolveMenu_Parent + '.' + 1
    //                 }
    //             }

    //             let updateMenu = await Evolve.SqlPool.request()
    //                 .input('EvolveMenu_Id', Evolve.Sql.Int, data.EvolveMenu_Id)
    //                 .input('EvolveMenu_Name', Evolve.Sql.NVarChar, data.EvolveMenu_Name)
    //                 .input('EvolveMenu_Desc', Evolve.Sql.NVarChar, data.EvolveMenu_Desc)
    //                 .input('EvolveMenu_Url', Evolve.Sql.NVarChar, data.EvolveMenu_Url)
    //                 .input('EvolveMenu_IsActive', Evolve.Sql.Bit, data.EvolveMenu_IsActive)
    //                 .input('EvolveMenu_Parent', Evolve.Sql.NVarChar, parent)
    //                 .input('EvolveMenu_Index', Evolve.Sql.NVarChar, newIndex)
    //                 .input('EvolveMenu_Icon', Evolve.Sql.NVarChar, data.EvolveMenu_Icon)
    //                 .input('EvolveMenu_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //                 .input('EvolveMenu_UpdatedAt', Evolve.Sql.DateTime, dataTime)
    //                 .query('UPDATE evolveMenu SET EvolveMenu_Name = @EvolveMenu_Name , EvolveMenu_Desc = @EvolveMenu_Desc , EvolveMenu_Url = @EvolveMenu_Url , EvolveMenu_IsActive = @EvolveMenu_IsActive , EvolveMenu_Parent = @EvolveMenu_Parent , EvolveMenu_Index = @EvolveMenu_Index , EvolveMenu_Icon = @EvolveMenu_Icon , EvolveMenu_UpdatedUser = @EvolveMenu_UpdatedUser , EvolveMenu_UpdatedAt = @EvolveMenu_UpdatedAt WHERE EvolveMenu_Id = @EvolveMenu_Id')

    //             if (updateMenu instanceof Error || updateMenu.rowsAffected < 1) {
    //                 Evolve.Log.Error("Error on Update Menu", createMenu);
    //                 return new Error("Error on Update Menu")
    //             } else {
    //                 return updateMenu;
    //             }

    //         } else {
    //             let updateMenu = await Evolve.SqlPool.request()
    //                 .input('EvolveMenu_Id', Evolve.Sql.Int, data.EvolveMenu_Id)
    //                 .input('EvolveMenu_Name', Evolve.Sql.NVarChar, data.EvolveMenu_Name)
    //                 .input('EvolveMenu_Desc', Evolve.Sql.NVarChar, data.EvolveMenu_Desc)
    //                 .input('EvolveMenu_Url', Evolve.Sql.NVarChar, data.EvolveMenu_Url)
    //                 .input('EvolveMenu_IsActive', Evolve.Sql.Bit, data.EvolveMenu_IsActive)
    //                 .input('EvolveMenu_Icon', Evolve.Sql.NVarChar, data.EvolveMenu_Icon)
    //                 .input('EvolveMenu_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //                 .input('EvolveMenu_UpdatedAt', Evolve.Sql.DateTime, dataTime)
    //                 .query('UPDATE evolveMenu SET EvolveMenu_Name = @EvolveMenu_Name , EvolveMenu_Desc = @EvolveMenu_Desc , EvolveMenu_Url = @EvolveMenu_Url , EvolveMenu_IsActive = @EvolveMenu_IsActive , EvolveMenu_Icon = @EvolveMenu_Icon , EvolveMenu_UpdatedUser = @EvolveMenu_UpdatedUser , EvolveMenu_UpdatedAt = @EvolveMenu_UpdatedAt WHERE EvolveMenu_Id = @EvolveMenu_Id')
    //             if (updateMenu instanceof Error || updateMenu.rowsAffected < 1) {
    //                 Evolve.Log.Error("Error on Update Menu", updateMenu);
    //                 return new Error("Error on Update Menu")
    //             } else {
    //                 return updateMenu;
    //             }
    //         }
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // deleteMenu: async function (id) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, id)
    //             .query('DELETE FROM EvolveMenu WHERE EvolveMenu_Id =@id')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },
    //process To Machine Darshan

    getProcessList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query('select * from EvolveProcess')
        } catch (error) {
            Evolve.Log.error(" EERR1526: Error while getting Process List "+error.message);
            return new Error(" EERR1526: Error while getting Process List "+error.message);
        }
    },

    // getMachineList: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query('select * from EvolveMachine')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // createProcessToMachine: async function (data, userid) {
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveMachine_id', Evolve.Sql.Int, data.EvolveMachine_id)
    //             .input('EvolveProcess_id', Evolve.Sql.Int, data.EvolveProcess_id)
    //             .input('EvolveProcessToMachine_CreatedUser', Evolve.Sql.Int, userid)
    //             .input('EvolveProcessToMachine_CreatedAt', Evolve.Sql.NVarChar, datetime)
    //             .query('INSERT INTO EvolveProcessToMachine (EvolveProcess_id,EvolveMachine_id,EvolveProcessToMachine_CreatedUser,EvolveProcessToMachine_CreatedAt) VALUES (@EvolveProcess_id,@EvolveMachine_id,@EvolveProcessToMachine_CreatedUser,@EvolveProcessToMachine_CreatedAt)');

    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }

    // },


    // checkProcessToMachine: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveMachine_id', Evolve.Sql.Int, data.EvolveMachine_id)
    //             .input('EvolveProcess_id', Evolve.Sql.Int, data.EvolveProcess_id)
    //             .query('SELECT EvolveProcessToMachine_ID FROM EvolveProcessToMachine WHERE EvolveMachine_id = @EvolveMachine_id AND EvolveProcess_id = @EvolveProcess_id');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }

    // },

    // evolvegetprocesstomachine: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query('SELECT EvolveProcess.EvolveProcess_Name, EvolveMachine.EvolveMachine_Name, EvolveProcess_To_Machines.EvolveProcessMachine_ID from EvolveProcess_To_Machines INNER JOIN EvolveProcess ON EvolveProcess_To_Machines.EvolveProcess_ID = EvolveProcess.EvolveProcess_ID INNER JOIN EvolveMachine ON EvolveMachine.EvolveMachine_ID = EvolveProcess_To_Machines.EvolveMachine_ID');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // getProcessToMachineDt: async function () {
    //     try {

    //         return await Evolve.SqlPool.request()
    //             .query('SELECT ep.EvolveProcess_Name, EvolveMachine.EvolveMachine_Name, epm.EvolveProcessToMachine_ID FROM EvolveProcessToMachine epm INNER JOIN EvolveProcess ep ON epm.EvolveProcess_ID = ep.EvolveProcess_ID INNER JOIN EvolveMachine ON EvolveMachine.EvolveMachine_ID = epm.EvolveMachine_ID ORDER BY epm.EvolveProcessToMachine_ID DESC');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // selectSingleProcessMachine: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveProcessToMachine_ID', Evolve.Sql.Int, data.EvolveProcessMachine_ID)
    //             .query('SELECT EvolveProcess_id, EvolveMachine_id FROM EvolveProcessToMachine WHERE EvolveProcessToMachine_ID =  @EvolveProcessToMachine_ID');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // updateprocessmachine: async function (data) {
    //     console.log(data);
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveProcessToMachine_ID', Evolve.Sql.Int, data.EvolveProcessToMachine_ID)
    //             .input('EvolveMachine_id', Evolve.Sql.Int, parseInt(data.EvolveMachine_id))
    //             .input('EvolveProcess_id', Evolve.Sql.Int, parseInt(data.EvolveProcess_id))
    //             .query('UPDATE EvolveProcessToMachine SET  EvolveMachine_id = @EvolveMachine_id ,  EvolveProcess_id = @EvolveProcess_id WHERE EvolveProcessToMachine_ID = @EvolveProcessToMachine_ID');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // checkProcessToMachineUpdate: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveProcessToMachine_ID', Evolve.Sql.Int, data.EvolveProcessToMachine_ID)
    //             .input('EvolveMachine_id', Evolve.Sql.Int, data.EvolveMachine_id)
    //             .input('EvolveProcess_id', Evolve.Sql.Int, data.EvolveProcess_id)
    //             .query('SELECT EvolveProcessToMachine_ID FROM EvolveProcessToMachine WHERE  EvolveMachine_id = @EvolveMachine_id AND  EvolveProcess_id = @EvolveProcess_id AND EvolveProcessToMachine_ID != @EvolveProcessToMachine_ID');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // deleteProcessToMachine: async function (id) {

    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, id)
    //             .query('DELETE FROM EvolveProcess_To_Machines WHERE EvolveProcessMachine_ID =@id')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },


    // Section Darshan                                      

    // addsection: async function (data) {

    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveSection_Name', Evolve.Sql.NVarChar, data.EvolveSection_Name)
    //             .input('EvolveSection_Desc', Evolve.Sql.NVarChar, data.EvolveSection_Desc)
    //             .input('EvolveSection_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveSection_CreatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveSection_UpdatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveSection_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .query('INSERT INTO EvolveSection (EvolveSection_Name,EvolveSection_Desc,EvolveSection_CreatedUser,EvolveSection_CreatedAt,EvolveSection_UpdatedAt,EvolveSection_UpdatedUser) VALUES (@EvolveSection_Name,@EvolveSection_Desc,@EvolveSection_CreatedUser,@EvolveSection_CreatedAt,@EvolveSection_UpdatedAt,@EvolveSection_UpdatedUser)');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    getSectionListCount: async function (id) {
        try {

            return await Evolve.SqlPool.request()

                .query('select count(EvolveSection_ID) AS count from EvolveSection');
        } catch (error) {
            Evolve.Log.error(" EERR1527: Error while getting Section List Count "+error.message);
            return new Error(" EERR1527: Error while getting Section List Count "+error.message);
        }
    },

    // getSectionDatatableList: async function (id, start, length) {

    //     console.log("Services is running >>> ")
    //     try {

    //         return await Evolve.SqlPool.request()

    //             .input('start', Evolve.Sql.Int, start)
    //             .input('length', Evolve.Sql.Int, length)
    //             .query('SELECT EvolveSection_ID, EvolveSection_Name, EvolveSection_Desc from EvolveSection ORDER BY EvolveSection_ID ');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // updateSection: async function (data) {

    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveSection_ID', Evolve.Sql.Int, data.EvolveSection_ID)
    //             .input('EvolveSection_Name', Evolve.Sql.NVarChar, data.EvolveSection_Name)
    //             .input('EvolveSection_Desc', Evolve.Sql.NVarChar, data.EvolveSection_Desc)
    //             .input('EvolveSection_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveSection_UpdatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveSection_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .query('UPDATE EvolveSection SET EvolveSection_Name = @EvolveSection_Name, EvolveSection_Desc = @EvolveSection_Desc, EvolveSection_UpdatedAt = @EvolveSection_UpdatedAt, EvolveSection_UpdatedUser = @EvolveSection_UpdatedUser WHERE EvolveSection_ID = @EvolveSection_ID');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // deleteSection: async function (id) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveSection_ID', Evolve.Sql.Int, id)
    //             .query('DELETE FROM EvolveSection WHERE EvolveSection_ID =@EvolveSection_ID')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // serial Number Darshan                                      

    // addserialnumber: async function (data) {
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveSerial_SeqID', Evolve.Sql.NVarChar, data.EvolveSerial_SeqID)
    //             .input('EvolveSerial_Desc', Evolve.Sql.NVarChar, data.EvolveSerial_Desc)
    //             .input('EvolveSerial_Active', Evolve.Sql.Int, data.EvolveSerial_Active)
    //             .input('EvolveSerial_Prefix', Evolve.Sql.NVarChar, data.EvolveSerial_Prefix)
    //             .input('EvolveSerial_Start', Evolve.Sql.Int, data.EvolveSerial_Start)
    //             .input('EvolveSerial_Next', Evolve.Sql.Int, data.EvolveSerial_Next)
    //             .input('EvolveSerial_WoLimit', Evolve.Sql.Int, data.EvolveSerial_WoLimit)
    //             .input('EvolveSerial_CreatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveSerial_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .query('INSERT INTO EvolveSerial (EvolveSerial_SeqID, EvolveSerial_Desc, EvolveSerial_Active, EvolveSerial_Prefix, EvolveSerial_Start, EvolveSerial_Next, EvolveSerial_WoLimit , EvolveSerial_CreatedAt, EvolveSerial_CreatedUser) VALUES (@EvolveSerial_SeqID, @EvolveSerial_Desc, @EvolveSerial_Active, @EvolveSerial_Prefix, @EvolveSerial_Start, @EvolveSerial_Next ,@EvolveSerial_WoLimit , @EvolveSerial_CreatedAt, @EvolveSerial_CreatedUser)');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // getserialnumberListCount: async function (id) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             // .input('EvolveSerial_CreatedUser', Evolve.Sql.Int, id)
    //             .query('select count(EvolveSerial_ID) AS count from EvolveSerial');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },


    // getserialnumberDatatableList: async function (start, length) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             // .input('EvolveSerial_CreatedUser', Evolve.Sql.Int, id)
    //             .input('start', Evolve.Sql.Int, start)
    //             .input('length', Evolve.Sql.Int, length)
    //             .query('SELECT * from EvolveSerial ORDER BY EvolveSerial_ID');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // selectSingleserialnumber: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, data.id)
    //             .query('SELECT * FROM EvolveSerial WHERE EvolveSerial_ID = @id');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // updateserialnumber: async function (data) {

    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveSerial_ID', Evolve.Sql.NVarChar, data.EvolveSerial_ID)
    //             .input('EvolveSerial_SeqID', Evolve.Sql.NVarChar, data.EvolveSerial_SeqID)
    //             .input('EvolveSerial_Desc', Evolve.Sql.NVarChar, data.EvolveSerial_Desc)
    //             .input('EvolveSerial_Active', Evolve.Sql.Int, data.EvolveSerial_Active)
    //             .input('EvolveSerial_Prefix', Evolve.Sql.NVarChar, data.EvolveSerial_Prefix)
    //             .input('EvolveSerial_Start', Evolve.Sql.Int, data.EvolveSerial_Start)
    //             .input('EvolveSerial_Next', Evolve.Sql.Int, data.EvolveSerial_Next)
    //             .input('EvolveSerial_WoLimit', Evolve.Sql.Int, data.EvolveSerial_WoLimit)
    //             .input('EvolveSerial_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .query('UPDATE EvolveSerial SET EvolveSerial_SeqID = @EvolveSerial_SeqID, EvolveSerial_Desc = @EvolveSerial_Desc, EvolveSerial_Active = @EvolveSerial_Active, EvolveSerial_Prefix = @EvolveSerial_Prefix, EvolveSerial_Start = @EvolveSerial_Start, EvolveSerial_Next = @EvolveSerial_Next , EvolveSerial_WoLimit = @EvolveSerial_WoLimit WHERE EvolveSerial_ID = @EvolveSerial_ID');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // deleteserialnumber: async function (id) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveSerial_ID', Evolve.Sql.Int, id)
    //             .query('DELETE FROM EvolveSerial WHERE EvolveSerial_ID =@EvolveSerial_ID')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },


    // getProcessses made by ravatraj  for select process in process validation page
    // getProcesses: async function () {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query('select  EvolveProcess_ID ,EvolveProcess_Name  from EvolveProcess ')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },


    // Shift Master Darshan                                      

    // addshift: async function (data) {
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveShift_Name', Evolve.Sql.NVarChar, data.EvolveShift_Name)
    //             .input('EvolveShift_Desc', Evolve.Sql.NVarChar, data.EvolveShift_Desc)
    //             .input('EvolveShift_Start', Evolve.Sql.NVarChar, data.EvolveShift_Start)
    //             .input('EvolveShift_End', Evolve.Sql.NVarChar, data.EvolveShift_End)
    //             .input('EvolveShift_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveShift_CreatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveShift_UpdatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveShift_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

    //             .query('INSERT INTO EvolveShift (EvolveShift_Name, EvolveShift_Desc, EvolveShift_Start, EvolveShift_End, EvolveShift_CreatedUser, EvolveShift_CreatedAt, EvolveShift_UpdatedAt, EvolveShift_UpdatedUser) VALUES (@EvolveShift_Name, @EvolveShift_Desc, @EvolveShift_Start, @EvolveShift_End, @EvolveShift_CreatedUser, @EvolveShift_CreatedAt, @EvolveShift_UpdatedAt, @EvolveShift_UpdatedUser)');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },



    getshiftList: async function (id, start, length) {
        try {
            return await Evolve.SqlPool.request()
                //   .input('EvolveShift_CreatedUser', Evolve.Sql.Int, id)
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .query('SELECT * from EvolveShift ORDER BY EvolveShift_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1528: Error while getting shift list "+error.message);
            return new Error(" EERR1528: Error while getting shift list "+error.message);
        }
    },

    // selectSingleshift: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, data.id)
    //             .query('SELECT * FROM EvolveShift WHERE EvolveShift_ID = @id');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // updateshift: async function (data) {

    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveShift_ID', Evolve.Sql.NVarChar, data.EvolveShift_ID)
    //             .input('EvolveShift_Name', Evolve.Sql.NVarChar, data.EvolveShift_Name)
    //             .input('EvolveShift_Desc', Evolve.Sql.NVarChar, data.EvolveShift_Desc)
    //             .input('EvolveShift_Start', Evolve.Sql.NVarChar, data.EvolveShift_Start)
    //             .input('EvolveShift_End', Evolve.Sql.NVarChar, data.EvolveShift_End)
    //             .input('EvolveShift_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveShift_UpdatedAt', Evolve.Sql.NVarChar, datetime)


    //             .query('UPDATE EvolveShift SET EvolveShift_Name = @EvolveShift_Name, EvolveShift_Desc = @EvolveShift_Desc, EvolveShift_Start = @EvolveShift_Start, EvolveShift_End = @EvolveShift_End, EvolveShift_UpdatedAt = @EvolveShift_UpdatedAt WHERE EvolveShift_ID = @EvolveShift_ID');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // deleteshift: async function (id) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveShift_ID', Evolve.Sql.Int, id)
    //             .query('DELETE FROM EvolveShift WHERE EvolveShift_ID =@EvolveShift_ID')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // Process Template Darshan                             

    // addprocesstemplate: async function (data) {
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveprocessTemp_Name', Evolve.Sql.NVarChar, data.EvolveprocessTemp_Name)
    //             .input('EvolveprocessTemp_Desc', Evolve.Sql.NVarChar, data.EvolveprocessTemp_Desc)
    //             .input('EvolveprocessTemp_CreatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveprocessTemp_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

    //             .query('INSERT INTO EvolveProcessTemp (EvolveprocessTemp_Name, EvolveprocessTemp_Desc, EvolveprocessTemp_CreatedAt, EvolveprocessTemp_CreatedUser) VALUES (@EvolveprocessTemp_Name, @EvolveprocessTemp_Desc, @EvolveprocessTemp_CreatedAt, @EvolveprocessTemp_CreatedUser)');

    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },
    // getProcessses made by ravatraj  for select process in process validation page
    getProcesses: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('select  EvolveProcess_ID ,EvolveProcess_Name  from EvolveProcess ')
        } catch (error) {
            Evolve.Log.error(" EERR1529: Error while getting Processes "+error.message);
            return new Error(" EERR1529: Error while getting Processes "+error.message);
        }
    },

    // addProcessVal: async function (data) {
    //     try {
    //         let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveProcess_ID', Evolve.Sql.Int, data.selected_process)
    //             .input('EvolveProcessVal_Seq', Evolve.Sql.Int, data.validation_sequence_number)
    //             .input('EvolveProcessVal_Desc', Evolve.Sql.NVarChar, data.validation_description)
    //             .input('EvolveProcessVal_Type', Evolve.Sql.NVarChar, data.selected_validation_type)
    //             .input('EvolveProcessVal_Value', Evolve.Sql.NVarChar, data.process_default_value)
    //             .input('EvolveProcessVal_Compare_Type', Evolve.Sql.NVarChar, data.selected_process_validation_type)
    //             .input('EvolveProcessVal_Compare_Value', Evolve.Sql.NVarChar, data.process_validation_value)
    //             .input('EvolveProcessVal_required', Evolve.Sql.NVarChar, data.is_required)
    //             .input('EvolveProcessVal_auto', Evolve.Sql.NVarChar, data.is_auto)
    //             .input('EvolveProcessVal_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveProcessVal_CreatedAt', Evolve.Sql.NVarChar, dataTime)
    //             .query('INSERT INTO EvolveProcessVal (EvolveProcess_ID ,EvolveProcessVal_Seq ,EvolveProcessVal_Desc ,EvolveProcessVal_Type,EvolveProcessVal_Value,EvolveProcessVal_Compare_Type,EvolveProcessVal_Compare_Value,EvolveProcessVal_required,EvolveProcessVal_auto,EvolveProcessVal_CreatedAt,EvolveProcessVal_CreatedUser)VALUES (@EvolveProcess_ID,@EvolveProcessVal_Seq,@EvolveProcessVal_Desc,@EvolveProcessVal_Type,@EvolveProcessVal_Value,@EvolveProcessVal_Compare_Type,@EvolveProcessVal_Compare_Value,@EvolveProcessVal_required,@EvolveProcessVal_auto ,@EvolveProcessVal_CreatedAt ,@EvolveProcessVal_CreatedUser) ');

    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },
    // below function for check machine to user is already exist or not made by Ravat
    // checkMachineToUser: async function (data) {
    //     try {
    //         let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
    //             // .input('EvolveMachineToUser_DefaultMenu', Evolve.Sql.Int,data.EvolveMachineToUser_DefaultMenu)

    //             .query('SELECT EvolveMachineToUser_ID FROM EvolveMachineToUser WHERE EvolveUser_ID = @EvolveUser_ID AND EvolveMachine_ID = @EvolveMachine_ID ');

    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    //// below function for Add machine to user  made by Ravat
    // addMachineToUser: async function (data) {
    //     try {

    //         let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
    //             .input('EvolveMachineToUser_CreatedAt', Evolve.Sql.NVarChar, dataTime)
    //             .input('EvolveMachineToUser_CreatedUser', Evolve.Sql.Int, data.EvolveCreatedUser_ID)
    //             .input('EvolveMachineToUser_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
    //             .input('EvolveMachineToUser_UpdatedUser', Evolve.Sql.Int, data.EvolveCreatedUser_ID)
    //             .input('EvolveMenu_ID', Evolve.Sql.Int, data.EvolveMachineToUser_DefaultMenu)
    //             .query('INSERT INTO EvolveMachineToUser (EvolveUser_ID ,EvolveMachine_ID ,EvolveMachineToUser_CreatedAt ,EvolveMachineToUser_CreatedUser,EvolveMachineToUser_UpdatedAt,EvolveMachineToUser_UpdatedUser,EvolveMenu_ID)VALUES (@EvolveUser_ID ,@EvolveMachine_ID ,@EvolveMachineToUser_CreatedAt ,@EvolveMachineToUser_CreatedUser,@EvolveMachineToUser_UpdatedAt,@EvolveMachineToUser_UpdatedUser,@EvolveMenu_ID) ');

    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    getProcessValDataCount: async function () {
        try {

            return await Evolve.SqlPool.request()
                // .input('SEARCH', Evolve.Sql.NVarChar, data.search_data)
                .query("SELECT COUNT (EvolveProcess_ID) as count from EvolveProcessVal");
        } catch (error) {
            Evolve.Log.error(" EERR1530: Error while getting Process Val Data Count "+error.message);
            return new Error(" EERR1530: Error while getting Process Val Data Count "+error.message);
        }


    },

    // getProcessValData: async function (start, length) {
    //     try {

    //         return await Evolve.SqlPool.request()
    //             .input('start', Evolve.Sql.Int, start)
    //             .input('length', Evolve.Sql.Int, length)
    //             .query("SELECT  epv.EvolveProcessVal_ID, ep.EvolveProcess_Name , epv.EvolveProcessVal_Seq , epv.EvolveProcessVal_Desc , epv.EvolveProcessVal_Type , epv.EvolveProcessVal_Value , epv.EvolveProcessVal_Compare_Type , epv.EvolveProcessVal_Compare_Value , epv.EvolveProcessVal_required FROM EvolveProcess ep ,EvolveProcessVal epv WHERE ep.EvolveProcess_ID = epv.EvolveProcess_ID order by epv.EvolveProcessVal_ID desc ");
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }

    // },
    //for process validation page for delete the process

    // deleteProcessval: async function (id) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, id)
    //             .query('DELETE FROM EvolveProcessVal WHERE EvolveProcessVal_ID = @id')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // selectSingleProcessVal: async function (id) {
    //     try {

    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, id)
    //             .query('SELECT  epv.EvolveProcessVal_ID, epv.EvolveProcess_ID,ep.EvolveProcess_Name, epv.EvolveProcessVal_Seq , epv.EvolveProcessVal_Desc , epv.EvolveProcessVal_Type , epv.EvolveProcessVal_Value,epv.EvolveProcessVal_Compare_Type , epv.EvolveProcessVal_Compare_Value , epv.EvolveProcessVal_required, epv.EvolveProcessVal_Auto FROM EvolveProcess ep ,EvolveProcessVal epv WHERE ep.EvolveProcess_ID = epv.EvolveProcess_ID  AND EvolveProcessVal_ID = @id')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },
    // updateProcessVal: async function (data) {
    //     try {
    //         let update_role = await Evolve.SqlPool.request()
    //             .input('EvolveProcessVal_ID', Evolve.Sql.Int, data.EvolveProcessVal_ID)
    //             .input('EvolveProcess_ID', Evolve.Sql.Int, data.EvolveProcess_ID)
    //             .input('EvolveProcessVal_Desc', Evolve.Sql.NVarChar, data.EvolveProcessVal_Desc)
    //             .input('EvolveProcessVal_Seq', Evolve.Sql.Int, data.EvolveProcessVal_Seq)
    //             .input('EvolveProcessVal_Type', Evolve.Sql.NVarChar, data.EvolveProcessVal_Type)
    //             .input('EvolveProcessVal_Value', Evolve.Sql.NVarChar, data.EvolveProcessVal_Value)
    //             .input('EvolveProcessVal_Compare_Type', Evolve.Sql.NVarChar, data.EvolveProcessVal_Compare_Type)
    //             .input('EvolveProcessVal_Compare_Value', Evolve.Sql.NVarChar, data.EvolveProcessVal_Compare_Value)
    //             .input('EvolveProcessVal_required', Evolve.Sql.Int, data.EvolveProcessVal_required)
    //             .input('EvolveProcessVal_auto', Evolve.Sql.Int, data.EvolveProcessVal_auto)
    //             .query('UPDATE EvolveProcessVal SET EvolveProcessVal_Desc = @EvolveProcessVal_Desc ,EvolveProcessVal_Seq = @EvolveProcessVal_Seq,EvolveProcessVal_Type = @EvolveProcessVal_Type,EvolveProcessVal_Value = @EvolveProcessVal_Value,EvolveProcessVal_Compare_Type = @EvolveProcessVal_Compare_Type,EvolveProcessVal_Compare_Value = @EvolveProcessVal_Compare_Value ,EvolveProcessVal_required = @EvolveProcessVal_required ,EvolveProcessVal_auto = @EvolveProcessVal_auto,EvolveProcess_ID=@EvolveProcess_ID  WHERE EvolveProcessVal_ID = @EvolveProcessVal_ID');

    //         if (update_role instanceof Error || update_role.rowsAffected < 1) {
    //             Evolve.Log.Error("Error In Update Process", create_role);
    //             return new Error("Error in Update Process")
    //         } else {
    //             return update_role;
    //         }
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // getUsers: async function () {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query('select  EvolveUser_ID ,EvolveUser_Name  from EvolveUser ')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // getmachines: async function () {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query('select  EvolveMachine_ID ,EvolveMachine_Name  from EvolveMachine ')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    getMachinetoUserListCount: async function () {
        try {

            return await Evolve.SqlPool.request()
                // .input('SEARCH', Evolve.Sql.NVarChar, data.search_data)
                .query("SELECT COUNT (EvolveMachineToUser_ID) as count from EvolveMachineToUser");
        } catch (error) {
            Evolve.Log.error(" EERR1531: Error while getting Machine to User List Count "+error.message);
            return new Error(" EERR1531: Error while getting Machine to User List Count  "+error.message);
        }


    },

    getUserToMachineData: async function (start, length) {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT emu.EvolveMachineToUser_ID ,eu.EvolveUser_Name , em.EvolveMachine_Name  FROM EvolveMachineToUser emu , EvolveUser eu,EvolveMachine em WHERE emu.EvolveUser_ID = eu.EvolveUser_ID AND em.EvolveMachine_ID = emu.EvolveMachine_ID order by EvolveMachineToUser_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1532: Error while getting User To Machine Data "+error.message);
            return new Error(" EERR1532: Error while getting User To Machine Data "+error.message);
        }
    },

    getProcesscount: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveProcess_ID) as count FROM EvolveProcess");
        } catch (error) {
            Evolve.Log.error(" EERR1533: Error while getting Process count "+error.message);
            return new Error(" EERR1533: Error while getting Process count "+error.message);
        }

    },

    // getProcessListDatabase: async function (start, length) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('start', Evolve.Sql.Int, start)
    //             .input('length', Evolve.Sql.Int, length)
    //             .query("SELECT EvolveProcess_ID , EvolveProcess_Name,EvolveProcess_Description  FROM EvolveProcess order by  EvolveProcess_ID ");
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }

    // },

    // getProcessList: async function () {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query("SELECT EvolveProcess_ID , EvolveProcess_Name FROM EvolveProcess");
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }

    // },

    // Section Darshan                                      
    // addsection: async function (data) {

    //         let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //         try {
    //             return await Evolve.SqlPool.request()
    //                 // .input('EvolveprocessTemp_CreatedUser', Evolve.Sql.Int, id)
    //                 .query('select count(EvolveprocessTemp_ID) AS count from EvolveProcessTemp');
    //         } catch (error) {
    //             Evolve.Log.error("  "+error.message);
    //             return new Error("  "+error.message);
    //         }
    // },

    // getprocesstemplateList: async function (id) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             // .input('EvolveprocessTemp_CreatedUser', Evolve.Sql.Int, id)

    //             .query('SELECT * from EvolveProcessTemp ORDER BY EvolveprocessTemp_ID ');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // selectSingleprocesstempalte: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, data.id)
    //             .query('SELECT * FROM EvolveProcessTemp WHERE EvolveprocessTemp_ID = @id');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // updateprocesstempalte: async function (data) {

    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveprocessTemp_ID', Evolve.Sql.NVarChar, data.EvolveprocessTemp_ID)
    //             .input('EvolveprocessTemp_Name', Evolve.Sql.NVarChar, data.EvolveprocessTemp_Name)
    //             .input('EvolveprocessTemp_Desc', Evolve.Sql.NVarChar, data.EvolveprocessTemp_Desc)
    //             .input('EvolveprocessTemp_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

    //             .query('UPDATE EvolveProcessTemp SET EvolveprocessTemp_Name = @EvolveprocessTemp_Name, EvolveprocessTemp_Desc = @EvolveprocessTemp_Desc WHERE EvolveprocessTemp_ID = @EvolveprocessTemp_ID');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // getLastProcessValSeqNum: async function (id) {

    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, id)
    //             .query('SELECT TOP(1) EvolveProcessVal_Seq FROM EvolveProcessVal WHERE EvolveProcess_ID = @id ORDER BY EvolveProcessVal_ID DESC')

    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // deleteprocesstempalte: async function (id) {

    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, id)
    //             .query('DELETE FROM EvolveProcessTemp WHERE EvolveprocessTemp_ID = @id')

    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // deleteprocesstempalteSeq: async function (id) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, id)
    //             .query('DELETE FROM EvolveProcessTempSeq WHERE EvolveProcessTemp_ID =@id')

    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    //Process tempalte -> Process Template Sequence  Darshan

    // selectprocesssequencePTN: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query('select EvolveprocessTemp_ID, EvolveprocessTemp_Name from EvolveProcessTemp')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // selectprocesssequencePN: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query('select EvolveProcess_ID, EvolveProcess_Name from EvolveProcess')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // selectprocesssequenceON: async function (data) {

    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveProcessTemp_ID', Evolve.Sql.Int, data.id)
    //             .query('SELECT TOP(1) EvolveProcessTemp_Seq FROM EvolveProcessTempSeq WHERE EvolveProcessTemp_ID = @EvolveProcessTemp_ID ORDER BY EvolveProcessTempSeq_ID DESC')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // checksequenceprocessname: async function (data) {

    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveProcess_ID', Evolve.Sql.Int, data.EvolveProcess_ID)
    //             .input('EvolveProcessTemp_ID', Evolve.Sql.Int, data.EvolveProcessTemp_ID)
    //             .query('SELECT * FROM EvolveProcessTempSeq WHERE EvolveProcess_ID = @EvolveProcess_ID AND EvolveProcessTemp_ID = @EvolveProcessTemp_ID')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // addprocesssequence: async function (data) {
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveProcess_ID', Evolve.Sql.Int, data.EvolveProcess_ID)
    //             .input('EvolveProcessTemp_ID', Evolve.Sql.Int, data.EvolveProcessTemp_ID)
    //             .input('EvolveProcessTemp_Seq', Evolve.Sql.Int, data.EvolveProcessTemp_Seq)
    //             .input('EvolveProcessTempSeq_CreatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveProcessTempSeq_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .query('INSERT INTO EvolveProcessTempSeq (EvolveProcess_ID,EvolveProcessTemp_ID,EvolveProcessTemp_Seq,EvolveProcessTempSeq_CreatedAt,EvolveProcessTempSeq_CreatedUser) VALUES (@EvolveProcess_ID, @EvolveProcessTemp_ID, @EvolveProcessTemp_Seq, @EvolveProcessTempSeq_CreatedAt, @EvolveProcessTempSeq_CreatedUser)');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }

    // },

    // selectprocessteplatesequence: async function (data) {

    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, data.EvolveProcessTemp_ID)
    //             .query('SELECT EvolveProcessTempSeq.EvolveProcessTempSeq_ID, EvolveProcessTemp.EvolveprocessTemp_Name, EvolveProcess.EvolveProcess_Name, EvolveProcessTempSeq.EvolveProcessTemp_Seq FROM EvolveProcessTempSeq INNER JOIN EvolveProcessTemp ON EvolveProcessTempSeq.EvolveProcessTemp_ID = EvolveProcessTemp.EvolveprocessTemp_ID INNER JOIN EvolveProcess ON EvolveProcessTempSeq.EvolveProcess_ID = EvolveProcess.EvolveProcess_ID WHERE EvolveProcessTemp.EvolveProcessTemp_ID = @id ORDER BY EvolveProcessTemp_Seq ASC');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },
    // selectprocessvalidations: async function (data) {

    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, data.EvolveProcess_ID)
    //             .query('SELECT epv.EvolveProcessVal_Seq, ep.EvolveProcess_Name,epv.EvolveProcessVal_Desc, epv.EvolveProcessVal_Type, EvolveProcessVal_Value, epv.EvolveProcessVal_Required, epv.EvolveProcessVal_Compare_Type,epv.EvolveProcessVal_Compare_Value 		from EvolveProcess ep, EvolveProcessVal epv	where ep.EvolveProcess_ID = @id and epv.EvolveProcess_ID = ep.EvolveProcess_ID');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },


    // Process Template Darshan                             
    // checkBomMaster: async function (data) {
    //     try {

    //         return await Evolve.SqlPool.request()
    //             .input('EvolvePartBom_ParentItem_ID', Evolve.Sql.Int, data.EvolvePartBom_ParentItem_ID)
    //             .input('EvolvePartBom_CompItem_ID', Evolve.Sql.Int, data.EvolvePartBom_CompItem_ID)
    //             .query('select COUNT (EvolvePartBom_ID) as count from EvolvePartBom where  EvolvePartBom_ParentItem_ID = @EvolvePartBom_ParentItem_ID AND  EvolvePartBom_CompItem_ID=@EvolvePartBom_CompItem_ID');

    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },
    // Process Template Darshan                             
    // checkBomMasterEdit: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolvePartBom_ID', Evolve.Sql.Int, data.EvolvePartBom_ID)
    //             .input('EvolvePartBom_ParentItem_ID', Evolve.Sql.Int, data.EvolvePartBom_ParentItem_ID)
    //             .input('EvolvePartBom_CompItem_ID', Evolve.Sql.Int, data.EvolvePartBom_CompItem_ID)
    //             .query('select COUNT (EvolvePartBom_ID) as count from EvolvePartBom where  EvolvePartBom_ParentItem_ID = @EvolvePartBom_ParentItem_ID AND  EvolvePartBom_CompItem_ID=@EvolvePartBom_CompItem_ID AND EvolvePartBom_ID!=@EvolvePartBom_ID');

    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },
    // addpartbommaster: async function (data) {
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolvePartBom_ParentItem_ID', Evolve.Sql.Int, data.EvolvePartBom_ParentItem_ID)
    //             .input('EvolvePartBom_CompItem_ID', Evolve.Sql.Int, data.EvolvePartBom_CompItem_ID)
    //             .input('EvolvePartBom_QtyPer', Evolve.Sql.Int, data.EvolvePartBom_QtyPer)
    //             .input('EvolvePartBom_DispSeq', Evolve.Sql.Int, data.EvolvePartBom_DispSeq)
    //             .input('EvolvePartBom_CreatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolvePartBom_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolvePartBom_UpdatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolvePartBom_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

    //             .query('INSERT INTO EvolvePartBom (EvolvePartBom_ParentItem_ID, EvolvePartBom_CompItem_ID, EvolvePartBom_QtyPer, EvolvePartBom_DispSeq, EvolvePartBom_CreatedAt, EvolvePartBom_CreatedUser, EvolvePartBom_UpdatedAt, EvolvePartBom_UpdatedUser) VALUES (@EvolvePartBom_ParentItem_ID, @EvolvePartBom_CompItem_ID, @EvolvePartBom_QtyPer, @EvolvePartBom_DispSeq, @EvolvePartBom_CreatedAt, @EvolvePartBom_CreatedUser, @EvolvePartBom_UpdatedAt, @EvolvePartBom_UpdatedUser)');

    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // getItemSearch: async function (search) {
    //     try {
    //         let query = "SELECT EvolveItem_Code as title , EvolveItem_ID as id FROM EvolveItem WHERE EvolveItem_Code LIKE '%" + search + "%' "
    //         return await Evolve.SqlPool.request().query(query);
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },
    // Item search datatable. 
    // getItemsListDtList: async function () {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query("SELECT ei.* , ept.EvolveProcessTemp_Name , es.EvolveSerial_SeqID , eig.EvolveItemGroup_Name FROM EvolveItem ei LEFT OUTER JOIN EvolveProcessTemp ept ON ept.EvolveProcessTemp_ID = ei.EvolveProcessTemp_Id LEFT OUTER JOIN EvolveSerial es ON es.EvolveSerial_ID = ei.EvolveSerial_ID LEFT OUTER JOIN EvolveItemGroup eig ON eig.EvolveItemGroup_ID = ei.EvolveItemGroup_ID ORDER BY ei.EvolveItem_ID DESC ");
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },
    // addProcess: async function (data) {
    //     try {

    //         return await Evolve.SqlPool.request()
    //             // .input('EvolveEmployee_ID', Evolve.Sql.Int, data.id)
    //             .input('processName', Evolve.Sql.NVarChar, data.processName)
    //             .input('processDescription', Evolve.Sql.NVarChar, data.processDescription)
    //             // .input('EvolveEmployee_CardNumber', Evolve.Sql.NVarChar, data.cardnumber)
    //             // .input('EvolveEmployee_Status', Evolve.Sql.Int, data.status)

    //             .query('INSERT INTO EvolveProcess (EvolveProcess_Name ,EvolveProcess_Description)VALUES (@processName,@processDescription) ');

    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    getChildItemSearch: async function (search) {
        try {
            let query = "SELECT EvolveItem_Code as title , EvolveItem_ID as id FROM EvolveItem WHERE EvolveItem_Code LIKE '%" + search + "%' AND EvolveItem_Type = 'CHILD'"
            return await Evolve.SqlPool.request().query(query);
        } catch (error) {
            Evolve.Log.error(" EERR1534: Error while getting Child Item Search "+error.message);
            return new Error(" EERR1534: Error while getting Child Item Search "+error.message);
        }
    },

    // deleteProcess: async function (id) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, id)
    //             .query('DELETE FROM EvolveProcess WHERE EvolveProcess_ID =@id')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // getProcessTemp: async function () {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query('SELECT EvolveprocessTemp_ID , EvolveprocessTemp_Name FROM EvolveProcessTemp')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // getItemGroup: async function () {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query('SELECT * FROM EvolveItemGroup')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },
    // getPdiTemplates: async function () {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query('SELECT * FROM EvolvePDITemplate')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // getSerialMaster: async function () {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query('SELECT EvolveSerial_ID , EvolveSerial_SeqID FROM EvolveSerial')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },


    // selectSingleProcess: async function (id) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, id)
    //             .query('SELECT EvolveProcess_ID,EvolveProcess_Name,EvolveProcess_Description  FROM EvolveProcess WHERE EvolveProcess_ID = @id')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },


    // createItem: async function (data) {
    //     try {
    //         let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

    //         return await Evolve.SqlPool.request()

    //             .input('EvolveItem_CreatedAt', Evolve.Sql.NVarChar, dataTime)
    //             .input('EvolveItem_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveItem_Code', Evolve.Sql.NVarChar, data.EvolveItem_Code)
    //             .input('EvolveItem_Desc', Evolve.Sql.NVarChar, data.EvolveItem_Desc)
    //             .input('EvolveProcessTemp_Id', Evolve.Sql.Int, data.EvolveProcessTemp_Id)
    //             .input('EvolveItem_BrakeNum', Evolve.Sql.NVarChar, data.EvolveItem_BrakeNum)
    //             .input('EvolveItem_BrakeApprovalNum', Evolve.Sql.NVarChar, data.EvolveItem_BrakeApprovalNum)
    //             .input('EvolveItem_Type', Evolve.Sql.NVarChar, data.EvolveItem_Type)
    //             .input('EvolveItem_CustomizeNum', Evolve.Sql.NVarChar, data.EvolveItem_CustomizeNum)
    //             .input('EvolveItem_CustPart', Evolve.Sql.NVarChar, data.EvolveItem_CustPart)
    //             .input('EvolveItem_load_capacity', Evolve.Sql.NVarChar, data.EvolveItem_load_capacity)
    //             .input('EvolveItem_CycleTime', Evolve.Sql.NVarChar, data.EvolveItem_CycleTime)
    //             .input('EvolveSerial_ID', Evolve.Sql.Int, data.EvolveSerial_ID)
    //             .input('EvolveItem_UpdateAt', Evolve.Sql.NVarChar, dataTime)
    //             .input('EvolveItem_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveItemGroup_ID', Evolve.Sql.Int, data.EvolveItemGroup_ID)
    //             .input('EvolvePDITemplate_ID', Evolve.Sql.NVarChar, data.EvolvePDITemplate_ID)

    //             .query('INSERT INTO EvolveItem (EvolveItem_Code , EvolveItem_Desc , EvolveProcessTemp_Id ,EvolveItem_BrakeNum , EvolveItem_BrakeApprovalNum,EvolveItem_Type , EvolveItem_CustomizeNum, EvolveItem_CustPart,EvolveItem_load_capacity,EvolveItem_CycleTime,EvolveSerial_ID,EvolveItem_CreatedAt,EvolveItem_CreatedUser,EvolveItem_UpdateAt , EvolveItem_UpdateUser,EvolveItemGroup_ID,EvolvePDITemplate_ID ) VALUES(@EvolveItem_Code , @EvolveItem_Desc , @EvolveProcessTemp_Id , @EvolveItem_BrakeNum ,@EvolveItem_BrakeApprovalNum,@EvolveItem_Type , @EvolveItem_CustomizeNum ,@EvolveItem_CustPart,@EvolveItem_load_capacity,@EvolveItem_CycleTime,@EvolveSerial_ID,@EvolveItem_CreatedAt,@EvolveItem_CreatedUser,@EvolveItem_UpdateAt , @EvolveItem_UpdateUser , @EvolveItemGroup_ID,@EvolvePDITemplate_ID )')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // updateProcess: async function (data) {
    //     try {
    //         let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

    //         let updateProcess = await Evolve.SqlPool.request()
    //             .input('EvolveProcess_ID', Evolve.Sql.NVarChar, data.EvolveProcess_ID)
    //             .input('EvolveProcess_Name', Evolve.Sql.NVarChar, data.EvolveProcess_Name)
    //             .input('EvolveProcess_Description', Evolve.Sql.NVarChar, data.EvolveProcess_Description)


    //             .query('UPDATE EvolveProcess SET EvolveProcess_Name = @EvolveProcess_Name , EvolveProcess_Description = @EvolveProcess_Description  WHERE EvolveProcess_ID = @EvolveProcess_ID');

    //         if (updateProcess instanceof Error || updateProcess.rowsAffected < 1) {
    //             Evolve.Log.Error("Error In Update Process", create_role);
    //             return new Error("Error in Update Process")
    //         } else {
    //             return updateProcess;
    //         }

    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // getpartbommasterCount: async function (id) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query('select count(EvolvePartBom_ID) AS count from EvolvePartBom');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // getpartbommaster: async function (id, start, length) {
    //     try {
    //         return await Evolve.SqlPool.request()

    //             .input('start', Evolve.Sql.Int, start)
    //             .input('length', Evolve.Sql.Int, length)
    //             .query('SELECT epb.EvolvePartBom_ID ,(SELECT EvolveItem_Code FROM EvolveItem WHERE EvolveItem_ID = epb.EvolvePartBom_ParentItem_ID) as parent_item,(SELECT EvolveItem_Code FROM EvolveItem WHERE EvolveItem_ID = epb.EvolvePartBom_CompItem_ID) as child_item, epb.EvolvePartBom_QtyPer, epb.EvolvePartBom_DispSeq FROM EvolvePartBom epb ORDER BY epb.EvolvePartBom_ID');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },


    // getSingleItemData: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
    //             .query("SELECT  EvolveItem_ID  ,EvolveItem_Code,EvolveItem_Desc   ,EvolveProcessTemp_Id,EvolveSerial_ID,EvolveItem_BrakeNum,EvolveItem_BrakeApprovalNum,EvolveItem_Type,EvolveItem_CustomizeNum ,EvolveItem_load_capacity,EvolveItem_CustPart,EvolveItem_CycleTime,EvolveItem_CreatedAt,EvolveItem_CreatedUser,EvolveItem_UpdateAt,EvolveItem_UpdateUser,EvolveItemGroup_ID ,EvolvePDITemplate_IDFROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID");

    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },


    // deleteItem: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveItem_ID', Evolve.Sql.Int, data.id)
    //             .query('DELETE FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // selectSingleSection: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveSection_ID', Evolve.Sql.Int, data.id)
    //             .query('SELECT * FROM EvolveSection WHERE EvolveSection_ID = @EvolveSection_ID')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // getMachinetoUserDataTableList: async function () {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query("SELECT eml.EvolveMenu_Id , eml.EvolveMenu_Name ,emu.EvolveMachineToUser_ID ,eu.EvolveUser_Name , em.EvolveMachine_Name  FROM EvolveMachineToUser emu , EvolveUser eu,EvolveMachine em ,EvolveMenu eml WHERE emu.EvolveUser_ID = eu.EvolveUser_ID AND em.EvolveMachine_ID = emu.EvolveMachine_ID AND  eml.EvolveMenu_Id = emu.EvolveMenu_Id order by EvolveMachineToUser_ID desc");
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    getMachinetoUserListCount: async function () {
        try {

            return await Evolve.SqlPool.request()
                // .input('SEARCH', Evolve.Sql.NVarChar, data.search_data)
                .query("SELECT COUNT (EvolveMachineToUser_ID) as count from EvolveMachineToUser");
        } catch (error) {
            Evolve.Log.error(" EERR1535: Error while getting Machine to User List Count "+error.message);
            return new Error(" EERR1535: Error while getting Machine to User List Count "+error.message);
        }
    },

    // getMenuList: async function () {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query('select  EvolveMenu_Id ,EvolveMenu_Name  from EvolveMenu ')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // selectSingleMachineToUser: async function (id) {
    //     try {

    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, id)
    //             .query('  SELECT EvolveMachineToUser_ID , EvolveUser_ID , EvolveMachine_ID , EvolveMenu_ID FROM EvolveMachineToUser  WHERE EvolveMachineToUser_ID = @id')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    checkMachineToUserUpdate: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
                .input('EvolveMachineToUser_ID', Evolve.Sql.Int, data.EvolveMachineToUser_ID)
                .query('SELECT EvolveMachineToUser_ID FROM EvolveMachineToUser WHERE EvolveUser_ID = @EvolveUser_ID AND EvolveMachine_ID = @EvolveMachine_ID AND EvolveMachineToUser_ID != @EvolveMachineToUser_ID');

        } catch (error) {
            Evolve.Log.error(" EERR1536: Error while checking Machine To User Update "+error.message);
            return new Error(" EERR1536: Error while checking Machine To User Update "+error.message);
        }
    },

    // updateMachineToUser: async function (data) {
    //     try {
    //         let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //         let update_machine_to_user = await Evolve.SqlPool.request()
    //             .input('EvolveMachineToUser_ID', Evolve.Sql.Int, data.EvolveMachineToUser_ID)
    //             .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
    //             .input('EvolveMachineToUser_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
    //             .input('EvolveMachineToUser_UpdatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
    //             .input('EvolveMenu_ID', Evolve.Sql.Int, data.EvolveMachineToUser_DefaultMenu)
    //             .query('UPDATE EvolveMachineToUser SET EvolveUser_ID=@EvolveUser_ID ,EvolveMachine_ID =@EvolveMachine_ID ,EvolveMachineToUser_UpdatedAt=@EvolveMachineToUser_UpdatedAt,EvolveMachineToUser_UpdatedUser=@EvolveMachineToUser_UpdatedUser,EvolveMenu_ID=@EvolveMenu_ID  WHERE EvolveMachineToUser_ID=@EvolveMachineToUser_ID ');

    //         if (update_machine_to_user instanceof Error || update_machine_to_user.rowsAffected < 1) {
    //             Evolve.Log.Error("Error In Update Machine to User", create_role);
    //             return new Error("Error in Update Process")
    //         } else {
    //             return update_machine_to_user;
    //         }
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // deleteMachineToUser: async function (id) {
    //     try {

    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, id)
    //             .query('DELETE FROM EvolveMachineToUser WHERE EvolveMachineToUser_ID =@id')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // selectSinglePartBomMaster: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, data.id)
    //             .query('SELECT epb.EvolvePartBom_ID, epb.EvolvePartBom_ParentItem_ID, epb.EvolvePartBom_CompItem_ID,(SELECT EvolveItem_Code FROM EvolveItem WHERE EvolveItem_ID = epb.EvolvePartBom_ParentItem_ID) as parent_item, (SELECT EvolveItem_Code FROM EvolveItem WHERE EvolveItem_ID = epb.EvolvePartBom_CompItem_ID) as child_item,epb.EvolvePartBom_QtyPer, epb.EvolvePartBom_DispSeq FROM EvolvePartBom epb WHERE epb.EvolvePartBom_ID = @id ');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // updatepartbommaster: async function (data) {

    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolvePartBom_ID', Evolve.Sql.Int, data.EvolvePartBom_ID)
    //             .input('EvolvePartBom_ParentItem_ID', Evolve.Sql.Int, data.EvolvePartBom_ParentItem_ID)
    //             .input('EvolvePartBom_CompItem_ID', Evolve.Sql.Int, data.EvolvePartBom_CompItem_ID)
    //             .input('EvolvePartBom_QtyPer', Evolve.Sql.Int, data.EvolvePartBom_QtyPer)
    //             .input('EvolvePartBom_DispSeq', Evolve.Sql.Int, data.EvolvePartBom_DispSeq)
    //             .input('EvolvePartBom_UpdatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolvePartBom_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .query('UPDATE EvolvePartBom SET EvolvePartBom_ParentItem_ID = @EvolvePartBom_ParentItem_ID, EvolvePartBom_CompItem_ID = @EvolvePartBom_CompItem_ID,EvolvePartBom_QtyPer = @EvolvePartBom_QtyPer, EvolvePartBom_DispSeq = @EvolvePartBom_DispSeq, EvolvePartBom_UpdatedAt = @EvolvePartBom_UpdatedAt, EvolvePartBom_UpdatedUser = @EvolvePartBom_UpdatedUser WHERE EvolvePartBom_ID = @EvolvePartBom_ID');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // deletepartbommaster: async function (id) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, id)
    //             .query('DELETE FROM EvolvePartBom WHERE EvolvePartBom_ID =@id')

    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    getItemsCountList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT count(EvolveItem_ID) AS count FROM EvolveItem");
        } catch (error) {
            Evolve.Log.error(" EERR1537: Error while getting Items Count List "+error.message);
            return new Error(" EERR1537: Error while getting Items Count List "+error.message);
        }
    },

    getItemsDatatableList: async function (start, length) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .query("SELECT ei.* , ept.EvolveProcessTemp_Name , es.EvolveSerial_SeqID FROM EvolveItem ei LEFT OUTER JOIN EvolveProcessTemp ept ON ept.EvolveProcessTemp_ID = ei.EvolveProcessTemp_Id LEFT OUTER JOIN EvolveSerial es ON es.EvolveSerial_ID = ei.EvolveSerial_ID ORDER BY ei.EvolveItem_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1538: Error while getting Items Datatable List "+error.message);
            return new Error(" EERR1538: Error while getting Items Datatable List "+error.message);
        }
    },
    getMenuList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('select  EvolveMenu_Id ,EvolveMenu_Name  from EvolveMenu ')
        } catch (error) {
            Evolve.Log.error(" EERR1539: Error while getting Menu List "+error.message);
            return new Error(" EERR1539: Error while getting Menu List "+error.message);
        }
    },

    checkMachineToUserUpdate: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
                .input('EvolveMachineToUser_ID', Evolve.Sql.Int, data.EvolveMachineToUser_ID)
                .query('SELECT EvolveMachineToUser_ID FROM EvolveMachineToUser WHERE EvolveUser_ID = @EvolveUser_ID AND EvolveMachine_ID = @EvolveMachine_ID AND EvolveMachineToUser_ID != @EvolveMachineToUser_ID');

        } catch (error) {
            Evolve.Log.error(" EERR1540: Error while checking Machine To User Update "+error.message);
            return new Error(" EERR1540: Error while checking Machine To User Update "+error.message);
        }
    },

    // getSingleItemData: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
    //             .query("SELECT * FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID");

    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // updateItem: async function (data) {
    //     try {
    //         let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

    //         return await Evolve.SqlPool.request()
    //             .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
    //             .input('EvolveItem_Code', Evolve.Sql.NVarChar, data.EvolveItem_Code)
    //             .input('EvolveItem_Desc', Evolve.Sql.NVarChar, data.EvolveItem_Desc)
    //             .input('EvolveProcessTemp_Id', Evolve.Sql.Int, data.EvolveProcessTemp_Id)
    //             .input('EvolveItem_BrakeNum', Evolve.Sql.NVarChar, data.EvolveItem_BrakeNum)
    //             .input('EvolveItem_BrakeApprovalNum', Evolve.Sql.NVarChar, data.EvolveItem_BrakeApprovalNum)
    //             .input('EvolveItem_Type', Evolve.Sql.NVarChar, data.EvolveItem_Type)
    //             .input('EvolveItem_CustomizeNum', Evolve.Sql.NVarChar, data.EvolveItem_CustomizeNum)
    //             .input('EvolveItem_CustPart', Evolve.Sql.NVarChar, data.EvolveItem_CustPart)
    //             .input('EvolveItem_load_capacity', Evolve.Sql.NVarChar, data.EvolveItem_load_capacity)
    //             .input('EvolveItem_CycleTime', Evolve.Sql.NVarChar, data.EvolveItem_CycleTime)
    //             .input('EvolveSerial_ID', Evolve.Sql.Int, data.EvolveSerial_ID)
    //             .input('EvolveItem_UpdateAt', Evolve.Sql.NVarChar, dataTime)
    //             .input('EvolveItem_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveItemGroup_ID', Evolve.Sql.Int, data.EvolveItemGroup_ID)
    //             .input('EvolvePDITemplate_ID', Evolve.Sql.NVarChar, data.EvolvePDITemplate_ID)
    //             .query('UPDATE EvolveItem SET EvolveItem_Code = @EvolveItem_Code , EvolveItem_Desc = @EvolveItem_Desc , EvolveProcessTemp_Id = @EvolveProcessTemp_Id , EvolveItem_BrakeNum = @EvolveItem_BrakeNum , EvolveItem_BrakeApprovalNum = @EvolveItem_BrakeApprovalNum , EvolveItem_Type = @EvolveItem_Type , EvolveItem_CustomizeNum = @EvolveItem_CustomizeNum , EvolveItem_CustPart = @EvolveItem_CustPart , EvolveItem_load_capacity = @EvolveItem_load_capacity ,EvolveItem_CycleTime = @EvolveItem_CycleTime , EvolveSerial_ID = @EvolveSerial_ID ,  EvolveItem_UpdateAt = @EvolveItem_UpdateAt , EvolveItem_UpdateUser = @EvolveItem_UpdateUser  ,EvolveItemGroup_ID = @EvolveItemGroup_ID  , EvolvePDITemplate_ID = @EvolvePDITemplate_ID WHERE EvolveItem_ID = @EvolveItem_ID')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    deleteItem: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.id)
                .query('DELETE FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1541: Error while deleting Item "+error.message);
            return new Error(" EERR1541: Error while deleting Item "+error.message);
        }
    },

    // selectSingleSection: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveSection_ID', Evolve.Sql.Int, data.id)
    //             .query('SELECT * FROM EvolveSection WHERE EvolveSection_ID = @EvolveSection_ID')
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    checkUnitConfig: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUnitConfig_Key', Evolve.Sql.NVarChar, data.EvolveUnitConfig_Key)
                .input('EvolveUnitConfig_Value', Evolve.Sql.NVarChar, data.EvolveUnitConfig_Value)
                .query('SELECT EvolveUnitConfig_ID FROM EvolveUnitConfig WHERE EvolveUnitConfig_Key = @EvolveUnitConfig_Key AND EvolveUnitConfig_Value = @EvolveUnitConfig_Value ');

        } catch (error) {
            Evolve.Log.error(" EERR1542: Error while checking Unit Config "+error.message);
            return new Error(" EERR1542: Error while checking Unit Config "+error.message);
        }
    },
    addUnitConfiguration: async function (data) {
        try {

            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveUnitConfig_Key', Evolve.Sql.NVarChar, data.EvolveUnitConfig_Key)
                .input('EvolveUnitConfig_Value', Evolve.Sql.NVarChar, data.EvolveUnitConfig_Value)
                .input('EvolveUnitConfig_CreatedUser', Evolve.Sql.Int, data.EvolveCreatedUser_ID)
                .input('EvolveUnitConfig_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveUnitConfig_UpdatedUser', Evolve.Sql.Int, data.EvolveCreatedUser_ID)
                .input('EvolveUnitConfig_UpdatedAt', Evolve.Sql.NVarChar, dataTime)

                .query('INSERT INTO EvolveUnitConfig (EvolveUnitConfig_Key ,EvolveUnitConfig_Value ,EvolveUnitConfig_CreatedUser ,EvolveUnitConfig_CreatedAt,EvolveUnitConfig_UpdatedUser,EvolveUnitConfig_UpdatedAt)VALUES (@EvolveUnitConfig_Key ,@EvolveUnitConfig_Value ,@EvolveUnitConfig_CreatedUser ,@EvolveUnitConfig_CreatedAt,@EvolveUnitConfig_UpdatedUser,@EvolveUnitConfig_UpdatedAt) ');

        } catch (error) {
            Evolve.Log.error(" EERR1543: Error while adding Unit Configuration  "+error.message);
            return new Error(" EERR1543: Error while adding Unit Configuration  "+error.message);
        }
    },
    getUnitConfigListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT COUNT (EvolveUnitConfig_ID) as count from EvolveUnitConfig WHERE EvolveUnitConfig_Key LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR1544: Error while getting Unit Config List Count "+error.message);
            return new Error(" EERR1544: Error while getting Unit Config List Count "+error.message);
        }
    },
    getUnitConfigList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT EvolveUnitConfig_ID , EvolveUnitConfig_Key,EvolveUnitConfig_Value  FROM EvolveUnitConfig WHERE EvolveUnitConfig_Key LIKE @search order by  EvolveUnitConfig_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1545: Error while getting Unit Config List "+error.message);
            return new Error(" EERR1545: Error while getting Unit Config List "+error.message);
        }

    },

    deleteUnitConfiguration: async function (id) {

        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveUnitConfig WHERE EvolveUnitConfig_ID =@id')
        } catch (error) {
            Evolve.Log.error(" EERR1546: Error while deleting Unit Configuration "+error.message);
            return new Error(" EERR1546: Error while deleting Unit Configuration "+error.message);
        }
    },
    selectSingleUnitConfig: async function (id) {
        try {

            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('  SELECT EvolveUnitConfig_ID , EvolveUnitConfig_Key , EvolveUnitConfig_Value  FROM EvolveUnitConfig  WHERE EvolveUnitConfig_ID = @id')
        } catch (error) {
            Evolve.Log.error(" EERR1547: Error while selecting Single Unit Config "+error.message);
            return new Error(" EERR1547: Error while selecting Single Unit Config "+error.message);
        }
    },
    checkUpdateUnitConfig: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUnitConfig_Key', Evolve.Sql.NVarChar, data.EvolveUnitConfig_Key)
                .input('EvolveUnitConfig_ID', Evolve.Sql.NVarChar, data.EvolveUnitConfig_ID)
                .input('EvolveUnitConfig_Value', Evolve.Sql.NVarChar, data.EvolveUnitConfig_Value)
                .query('SELECT EvolveUnitConfig_ID FROM EvolveUnitConfig WHERE EvolveUnitConfig_Key = @EvolveUnitConfig_Key AND EvolveUnitConfig_Value = @EvolveUnitConfig_Value AND EvolveUnitConfig_ID!=@EvolveUnitConfig_ID ');

        } catch (error) {
            Evolve.Log.error(" EERR1548: Error while checking Update Unit Config "+error.message);
            return new Error(" EERR1548: Error while checking Update Unit Config "+error.message);
        }
    },
    updateUnitConfiguration: async function (data) {
        try {

            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveUnitConfig_ID', Evolve.Sql.NVarChar, data.EvolveUnitConfig_ID)
                .input('EvolveUnitConfig_Key', Evolve.Sql.NVarChar, data.EvolveUnitConfig_Key)
                .input('EvolveUnitConfig_Value', Evolve.Sql.NVarChar, data.EvolveUnitConfig_Value)
                .input('EvolveUnitConfig_UpdatedUser', Evolve.Sql.Int, data.EvolveCreatedUser_ID)
                .input('EvolveUnitConfig_UpdatedAt', Evolve.Sql.NVarChar, dataTime)

                .query('UPDATE EvolveUnitConfig SET EvolveUnitConfig_Key=@EvolveUnitConfig_Key ,EvolveUnitConfig_Value=@EvolveUnitConfig_Value ,EvolveUnitConfig_UpdatedUser =@EvolveUnitConfig_UpdatedUser ,EvolveUnitConfig_UpdatedAt = @EvolveUnitConfig_UpdatedAt WHERE EvolveUnitConfig_ID=@EvolveUnitConfig_ID ');

        } catch (error) {
            Evolve.Log.error(" EERR1549: Error while updating Unit Configuration "+error.message);
            return new Error(" EERR1549: Error while updating Unit Configuration "+error.message);
        }
    },

    getMachineMasterSection: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('select  EvolveSection_ID ,EvolveSection_Name  from EvolveSection ')
        } catch (error) {
            Evolve.Log.error(" EERR1550: Error while getting Machine Master Section "+error.message);
            return new Error(" EERR1550: Error while getting Machine Master Section "+error.message);
        }
    },
    addMachineMaster: async function (data) {
        try {

            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveMachine_Name', Evolve.Sql.NVarChar, data.EvolveMachine_Name)
                .input('EvolveMachine_Desc', Evolve.Sql.NVarChar, data.EvolveMachine_Desc)
                .input('EvolveMachine_Capacity', Evolve.Sql.NVarChar, data.EvolveMachine_Capacity)
                .input('EvolveSection_ID', Evolve.Sql.Int, data.EvolveSection_ID)
                .input('EvolveMachine_Supplier', Evolve.Sql.NVarChar, data.EvolveMachine_Supplier)
                .input('EvolveMachine_Address', Evolve.Sql.NVarChar, data.EvolveMachine_Address)
                .input('EvolveMachine_Contact', Evolve.Sql.NVarChar, data.EvolveMachine_Contact)
                .input('EvolveMachine_Email', Evolve.Sql.NVarChar, data.EvolveMachine_Email)
                .input('EvolveMachine_Status', Evolve.Sql.Int, data.EvolveMachine_Status)
                .input('EvolveMachine_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvovleMachine_CreatedUser', Evolve.Sql.Int, data.EvolveCreatedUser_ID)
                .input('EvolveMachine_UpdatedUser', Evolve.Sql.Int, data.EvolveCreatedUser_ID)
                .input('EvovleMachine_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .query('INSERT INTO EvolveMachine (EvolveMachine_Name ,EvolveMachine_Desc ,EvolveMachine_Capacity ,EvolveSection_ID,EvolveMachine_Supplier,EvolveMachine_Address,EvolveMachine_Contact,EvolveMachine_Email,EvolveMachine_Status,EvolveMachine_CreatedAt,EvovleMachine_CreatedUser,EvolveMachine_UpdatedUser,EvovleMachine_UpdatedAt)VALUES (@EvolveMachine_Name,@EvolveMachine_Desc,@EvolveMachine_Capacity,@EvolveSection_ID,@EvolveMachine_Supplier,@EvolveMachine_Address,@EvolveMachine_Contact,@EvolveMachine_Email,@EvolveMachine_Status,@EvolveMachine_CreatedAt,@EvovleMachine_CreatedUser,@EvolveMachine_UpdatedUser,@EvovleMachine_UpdatedAt) ');

        } catch (error) {
            Evolve.Log.error(" EERR1551: Error while adding Machine Master "+error.message);
            return new Error(" EERR1551: Error while adding Machine Master "+error.message);
        }
    },
    getmachineMasterListCount: async function () {
        try {

            return await Evolve.SqlPool.request()
                // .input('SEARCH', Evolve.Sql.NVarChar, data.search_data)
                .query("SELECT COUNT (EvolveMachine_ID) as count from EvolveMachine");
        } catch (error) {
            Evolve.Log.error(" EERR1552: Error while getting machine Master List Count "+error.message);
            return new Error(" EERR1552: Error while getting machine Master List Count "+error.message);
        }


    },
    getmachineMasterList: async function (start, length) {
        try {
            console.log("Entering in services ...... >>>> ")
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .query("SELECT em.* , es.EvolveSection_Name FROM EvolveMachine em , EvolveSection es WHERE em.EvolveSection_ID = es.EvolveSection_ID order by em.EvolveMachine_ID desc ");
        } catch (error) {
            Evolve.Log.error(" EERR1553: Error while getting machine Master List "+error.message);
            return new Error(" EERR1553: Error while getting machine Master List "+error.message);
        }
    },

    deleteMachineMaster: async function (id) {

        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveMachine WHERE EvolveMachine_ID =@id')
        } catch (error) {
            Evolve.Log.error(" EERR1554: Error while deleting Machine Master "+error.message);
            return new Error(" EERR1554: Error while deleting Machine Master "+error.message);
        }
    },
    selectSingleMaster: async function (id) {
        try {

            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('  SELECT * FROM EvolveMachine  WHERE EvolveMachine_ID = @id')
        } catch (error) {
            Evolve.Log.error(" EERR1555: Error while selecting Single Master "+error.message);
            return new Error(" EERR1555: Error while selecting Single Master "+error.message);
        }
    },

    updateMachineMaster: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            let updateMachineMaster = await Evolve.SqlPool.request()

                .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
                .input('EvolveMachine_Name', Evolve.Sql.NVarChar, data.EvolveMachine_Name)
                .input('EvolveMachine_Desc', Evolve.Sql.NVarChar, data.EvolveMachine_Desc)
                .input('EvolveMachine_Capacity', Evolve.Sql.NVarChar, data.EvolveMachine_Capacity)
                .input('EvolveSection_ID', Evolve.Sql.Int, data.EvolveSection_ID)
                .input('EvolveMachine_Supplier', Evolve.Sql.NVarChar, data.EvolveMachine_Supplier)
                .input('EvolveMachine_Address', Evolve.Sql.NVarChar, data.EvolveMachine_Address)
                .input('EvolveMachine_Contact', Evolve.Sql.NVarChar, data.EvolveMachine_Contact)
                .input('EvolveMachine_Email', Evolve.Sql.NVarChar, data.EvolveMachine_Email)
                .input('EvolveMachine_Status', Evolve.Sql.Int, data.EvolveMachine_Status)
                .input('EvolveMachine_UpdatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
                .input('EvovleMachine_UpdatedAt', Evolve.Sql.NVarChar, dataTime)


                .query('UPDATE EvolveMachine SET EvolveMachine_Name=@EvolveMachine_Name ,EvolveMachine_Desc =@EvolveMachine_Desc ,EvolveMachine_Capacity=@EvolveMachine_Capacity,EvolveSection_ID=@EvolveSection_ID,EvolveMachine_Supplier=@EvolveMachine_Supplier,EvolveMachine_Address=@EvolveMachine_Address,EvolveMachine_Contact=@EvolveMachine_Contact,EvolveMachine_Email=@EvolveMachine_Email,EvolveMachine_Status=@EvolveMachine_Status,EvolveMachine_UpdatedUser=@EvolveMachine_UpdatedUser,EvovleMachine_UpdatedAt=@EvovleMachine_UpdatedAt WHERE EvolveMachine_ID=@EvolveMachine_ID ');

            if (updateMachineMaster instanceof Error || updateMachineMaster.rowsAffected < 1) {
                Evolve.Log.Error(" EERR1556: Error In Update Machine to User ", create_role);
                return new Error("Error in Update Process")
            } else {
                return updateMachineMaster;
            }
        } catch (error) {
            Evolve.Log.error(" EERR1557: Error while updating machine master "+error.message);
            return new Error(" EERR1557: Error while updating machine master "+error.message);
        }
    },

    // getpartbom_dispseq: async function (data) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('id', Evolve.Sql.Int, data.id)
    //             .query('SELECT TOP(1) EvolvePartBom_DispSeq FROM EvolvePartBom WHERE EvolvePartBom_ParentItem_ID = @id ORDER BY EvolvePartBom_DispSeq DESC')

    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    // getprocesstemplateListCount: async function (id) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             // .input('EvolveprocessTemp_CreatedUser', Evolve.Sql.Int, id)
    //             .query('select count(EvolveprocessTemp_ID) AS count from EvolveProcessTemp');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },



    resetSerialMaster: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('UPDATE EvolveSerial SET EvolveSerial_Next = 1');
        } catch (error) {
            Evolve.Log.error(" EERR1558: Error while resetting Serial Master "+error.message);
            return new Error(" EERR1558: Error while resetting Serial Master "+error.message);
        }
    },


    //PDI Template Code Create By DK                                  

    addPDITempCode: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePDITemplate_Code', Evolve.Sql.NVarChar, data.EvolvePDITemplate_Code)
                .query('INSERT INTO EvolvePDITemplate (EvolvePDITemplate_Code) VALUES (@EvolvePDITemplate_Code)');
        } catch (error) {
            Evolve.Log.error(" EERR1559: Error while adding PDI Temp Code "+error.message);
            return new Error(" EERR1559: Error while adding PDI Temp Code "+error.message);
        }
    },
    getPDITempCode: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT * FROM EvolvePDITemplate')
        } catch (error) {
            Evolve.Log.error(" EERR1560: Error while getting PDI Temp Code "+error.message);
            return new Error(" EERR1560: Error while getting PDI Temp Code "+error.message);
        }
    },
    addPDITemp: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePDITemplate_ID', Evolve.Sql.Int, data.EvolvePDITemplate_ID)
                .input('EvolvePDITemplateDetail_Label', Evolve.Sql.NVarChar, data.EvolvePDITemplateDetail_Label)
                .input('EvolvePDITemplateDetail_Type', Evolve.Sql.NVarChar, data.EvolvePDITemplateDetail_Type)
                .input('EvolvePDITemplateDetail_Value', Evolve.Sql.NVarChar, data.EvolvePDITemplateDetail_Value)
                .query('INSERT INTO EvolvePDITemplateDetail (EvolvePDITemplate_ID,EvolvePDITemplateDetail_Label,EvolvePDITemplateDetail_Type,EvolvePDITemplateDetail_Value) VALUES (@EvolvePDITemplate_ID, @EvolvePDITemplateDetail_Label,@EvolvePDITemplateDetail_Type, @EvolvePDITemplateDetail_Value)');
        } catch (error) {
            Evolve.Log.error(" EERR1561: Error while adding PDI Temp Code "+error.message);
            return new Error(" EERR1561: Error while adding PDI Temp Code "+error.message);
        }
    },

    getPDITempDetailList: async function (start, length) {
        try {
            return await Evolve.SqlPool.request()
                // .input('start', Evolve.Sql.Int, start)
                // .input('length', Evolve.Sql.Int, length)
                .query('SELECT pditd.*, pdit.EvolvePDITemplate_Code from EvolvePDITemplateDetail pditd join EvolvePDITemplate pdit ON pditd.EvolvePDITemplate_ID = pdit.EvolvePDITemplate_ID ORDER BY EvolvePDITemplateDetail_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1562: Error while getting PDI Temp Detail List "+error.message);
            return new Error(" EERR1562: Error while getting PDI Temp Detail List "+error.message);
        }
    },

    selectSinglePDITemp: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePDITemplateDetail_ID', Evolve.Sql.Int, data.EvolvePDITemplateDetail_ID)
                .query('  SELECT * FROM EvolvePDITemplateDetail  WHERE EvolvePDITemplateDetail_ID = @EvolvePDITemplateDetail_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1563: Error while selecting Single PDI Temp "+error.message);
            return new Error(" EERR1563: Error while selecting Single PDI Temp "+error.message);
        }
    },

    updatePDITempDetail: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePDITemplateDetail_ID', Evolve.Sql.Int, data.EvolvePDITemplateDetail_ID)
                .input('EvolvePDITemplate_ID', Evolve.Sql.Int, data.EvolvePDITemplate_ID)
                .input('EvolvePDITemplateDetail_Label', Evolve.Sql.NVarChar, data.EvolvePDITemplateDetail_Label)
                .input('EvolvePDITemplateDetail_Type', Evolve.Sql.NVarChar, data.EvolvePDITemplateDetail_Type)
                .input('EvolvePDITemplateDetail_Value', Evolve.Sql.NVarChar, data.EvolvePDITemplateDetail_Value)
                .query('UPDATE EvolvePDITemplateDetail SET EvolvePDITemplate_ID = @EvolvePDITemplate_ID, EvolvePDITemplateDetail_Label = @EvolvePDITemplateDetail_Label, EvolvePDITemplateDetail_Type = @EvolvePDITemplateDetail_Type, EvolvePDITemplateDetail_Value = @EvolvePDITemplateDetail_Value WHERE EvolvePDITemplateDetail_ID = @EvolvePDITemplateDetail_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1564: Error while updating PDI Temp Detail "+error.message);
            return new Error(" EERR1564: Error while updating PDI Temp Detail "+error.message);
        }
    },

    deletePDITempDetail: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePDITemplateDetail_ID', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolvePDITemplateDetail WHERE EvolvePDITemplateDetail_ID =@EvolvePDITemplateDetail_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1565: Error while deleting PDI Temp Detail "+error.message);
            return new Error(" EERR1565: Error while deleting PDI Temp Detail "+error.message);
        }
    },


    // Evolve User Settings
    getProfileData: async function (data) {

        // let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()

                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('select * from EvolveUser where EvolveUser_ID = @EvolveUser_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1566: Error while getting Profile Data "+error.message);
            return new Error(" EERR1566: Error while getting Profile Data "+error.message);
        }
    },
    //sub item list made by ravat

    getItemNumber: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('select  EvolveItem_ID ,EvolveItem_Code from EvolveItem ')
        } catch (error) {
            Evolve.Log.error(" EERR1567: Error while getting Item Number "+error.message);
            return new Error(" EERR1567: Error while getting Item Number "+error.message);
        }
    },

    getSubItemListDtList: async function (id, start, length) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .query(" select es.* ,(select ei.EvolveItem_Code from [EvolveItem] ei where es.EvolveSubItem_ActualItemID = ei.EvolveItem_ID) as item, (select ei.EvolveItem_Code from EvolveItem ei where es.EvolveSubItem_SubItem_ID = ei.EvolveItem_ID) as subitem from EvolveSubItem es  ORDER BY es.EvolveSubItem_ID DESC  ");
        } catch (error) {
            Evolve.Log.error(" EERR1568: Error while getting Sub Item List Dt List "+error.message);
            return new Error(" EERR1568: Error while getting Sub Item List Dt List "+error.message);
        }
    },

    deleteSubItem: async function (id) {
        try {
            console.log("Body data in services ", id);
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveSubItem WHERE EvolveSubItem_ID = @id')
        } catch (error) {
            Evolve.Log.error(" EERR1569: Error while deleting Sub Item "+error.message);
            return new Error(" EERR1569: Error while deleting Sub Item "+error.message);
        }
    },
    addSubItemList: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSubItem_ActualItemID', Evolve.Sql.Int, data.EvolveSubItem_ActualItemID)
                .input('EvolveSubItem_SubItem_ID', Evolve.Sql.Int, data.EvolveSubItem_SubItem_ID)
                .input('EvolveSubItem_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveSubItem_CreateUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveSubItem (EvolveSubItem_ActualItemID, EvolveSubItem_SubItem_ID,  EvolveSubItem_CreatedAt, EvolveSubItem_CreateUser) VALUES (@EvolveSubItem_ActualItemID, @EvolveSubItem_SubItem_ID, @EvolveSubItem_CreatedAt, @EvolveSubItem_CreateUser)');
        } catch (error) {
            Evolve.Log.error(" EERR1570: Error while adding Sub Item List "+error.message);
            return new Error(" EERR1570: Error while adding Sub Item List "+error.message);
        }
    },
    checkSubItem: async function (data) {
        try {
            console.log("CheckmSub item ");

            return await Evolve.SqlPool.request()
                .input('EvolveSubItem_ActualItemID', Evolve.Sql.Int, data.EvolveSubItem_ActualItemID)
                .input('EvolveSubItem_SubItem_ID', Evolve.Sql.Int, data.EvolveSubItem_SubItem_ID)
                .query('select COUNT (EvolveSubItem_ID) as count from EvolveSubItem where  EvolveSubItem_ActualItemID = @EvolveSubItem_ActualItemID AND  EvolveSubItem_SubItem_ID=@EvolveSubItem_SubItem_ID');

        } catch (error) {
            Evolve.Log.error(" EERR1571: Error while checking Sub Item "+error.message);
            return new Error(" EERR1571: Error while checking Sub Item "+error.message);
        }
    },

    selectSingleSubItem: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, data.id)
                // .query('select es.* ,(select ei.[EvolveItem_Code] from [EvolveItem] ei where es.[EvolveSubItem_ActualItemID] = ei.[EvolveItem_ID]) as item, (select ei.[EvolveItem_Code] from [EvolveItem] ei where es.[EvolveSubItem_SubItem_ID] = ei.[EvolveItem_ID]) as subitem from EvolveSubItem es  WHERE [EvolveSubItem_ID] = @id');
                .query('select * from EvolveSubItem where EvolveSubItem_ID = @id ')
        } catch (error) {
            Evolve.Log.error(" EERR1572: Error while selecting Single Sub Item "+error.message);
            return new Error(" EERR1572: Error while selecting Single Sub Item "+error.message);
        }
    },

    updateSubItem: async function (data) {

        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSubItem_ID', Evolve.Sql.Int, data.EvolveSubItem_ID)
                .input('EvolveSubItem_ActualItemID', Evolve.Sql.Int, data.EvolveSubItem_ActualItemID)
                .input('EvolveSubItem_SubItem_ID', Evolve.Sql.Int, data.EvolveSubItem_SubItem_ID)

                .input('EvolveSubItem_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveSubItem_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveSubItem SET EvolveSubItem_ActualItemID = @EvolveSubItem_ActualItemID, EvolveSubItem_SubItem_ID = @EvolveSubItem_SubItem_ID, EvolveSubItem_UpdatedAt = @EvolveSubItem_UpdatedAt, EvolveSubItem_UpdateUser = @EvolveSubItem_UpdateUser WHERE EvolveSubItem_ID = @EvolveSubItem_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1573: Error while updating Sub Item "+error.message);
            return new Error(" EERR1573: Error while updating Sub Item "+error.message);
        }
    },
    checkSubItemEdit: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSubItem_ID', Evolve.Sql.Int, data.EvolveSubItem_ID)
                .input('EvolveSubItem_ActualItemID', Evolve.Sql.Int, data.EvolveSubItem_ActualItemID)
                .input('EvolveSubItem_SubItem_ID', Evolve.Sql.Int, data.EvolveSubItem_SubItem_ID)
                .query('select COUNT (EvolveSubItem_ID) as count from EvolveSubItem where  EvolveSubItem_ActualItemID = @EvolveSubItem_ActualItemID AND  EvolveSubItem_SubItem_ID=@EvolveSubItem_SubItem_ID AND EvolveSubItem_ID!=@EvolveSubItem_ID');

        } catch (error) {
            Evolve.Log.error(" EERR1574: Error while checking Sub Item Edit "+error.message);
            return new Error(" EERR1574: Error while checking Sub Item Edit "+error.message);
        }
    },

    // Do List for York made By Ravat 
    getSoNumberList: async function () {
        try {
            let status = 'open';
            return await Evolve.SqlPool.request()
                .input('status', Evolve.Sql.NVarChar, status)
                .query('select * from  EvolveSalesOrder where EvolveSalesOrder_Status = @status ')
        } catch (error) {
            Evolve.Log.error(" EERR1575: Error while getting So Number List "+error.message);
            return new Error(" EERR1575: Error while getting So Number List "+error.message);
        }
    },
    getSalesOrderDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSalesOrder_ID', Evolve.Sql.Int, data.EvolveSalesOrder_ID)
                .query('select * from EvolveSalesOrder where EvolveSalesOrder_ID = @EvolveSalesOrder_ID');

        } catch (error) {
            Evolve.Log.error(" EERR1576: Error while getting Sales Order Details "+error.message);
            return new Error(" EERR1576: Error while getting Sales Order Details "+error.message);
        }
    },
    getDoDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSalesOrder_ID', Evolve.Sql.Int, data.EvolveSalesOrder_ID)

                .query('select EvolveSalesOrderLine_ID ,EvolveSalesOrderLine_Number,EvolveSalesOrderLine_Part, EvolveSalesOrderLine_Custpart,EvolveSalesOrderLine_OrderQty,EvolveSalesOrderLine_InvQty,EvolveSalesOrderLine_DOQty,EvolveSalesOrderLine_Status from EvolveSalesOrderLine where EvolveSalesOrder_ID = @EvolveSalesOrder_ID ORDER BY EvolveSalesOrderLine_ID ASC');

        } catch (error) {
            Evolve.Log.error(" EERR1577: Error while getting Do Details "+error.message);
            return new Error(" EERR1577: Error while getting Do Details "+error.message);
        }
    },
    addDoList: async function (data, soNumber) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDO_Number', Evolve.Sql.NVarChar, '123')
                .input('soNumber', Evolve.Sql.NVarChar, soNumber)
                .input('EvolveDO_ShipDate', Evolve.Sql.NVarChar, data.EvolveDO_ShipDate)
                .input('EvolveDO_VehicelNumber', Evolve.Sql.NVarChar, data.EvolveDO_VehicelNumber)
                .input('EvolveDO_Transporter', Evolve.Sql.NVarChar, data.EvolveDO_Transporter)
                .query("INSERT INTO EvolveDo  (  EvolveDO_Number ,EvolveDO_SONumber, EvolveDO_ShipDate,EvolveDO_VehicelNumber, EvolveDO_Transporter ,EvolveDO_Status) VALUES (@EvolveDO_Number ,@soNumber, @EvolveDO_ShipDate,@EvolveDO_VehicelNumber, @EvolveDO_Transporter ,'open');select @@IDENTITY AS \'inserted_id\'");

        } catch (error) {
            Evolve.Log.error(" EERR1578: Error while adding Do List "+error.message);
            return new Error(" EERR1578: Error while adding Do List "+error.message);
        }
    },
    getSoNumberById: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSalesOrder_ID', Evolve.Sql.Int, data.EvolveSalesOrder_ID)
                .query(' select EvolveSalesOrder_Number from EvolveSalesOrder where EvolveSalesOrder_ID = @EvolveSalesOrder_ID');

        } catch (error) {
            Evolve.Log.error(" EERR1579: Error while getting So Number By Id "+error.message);
            return new Error(" EERR1579: Error while getting So Number By Id "+error.message);
        }
    },
    addDoLineData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSalesOrderLine_ID', Evolve.Sql.Int, data.EvolveSalesOrderLine_ID)
                .input('EvolveDO_ID', Evolve.Sql.Int, data.EvolveDO_ID)
                .input('EvolveDOLine_Number', Evolve.Sql.NVarChar, data.EvolveDOLine_Number)
                .input('EvolveDOLine_Custpart', Evolve.Sql.NVarChar, data.EvolveDOLine_Custpart)
                .input('EvolveDOLine_QtyInv', Evolve.Sql.NVarChar, data.EvolveDOLine_QtyInv)
                .input('EvolveDOLine_QtyDO', Evolve.Sql.NVarChar, data.EvolveDOLine_QtyDO)
                .input('EvolveDOLine_Part', Evolve.Sql.NVarChar, data.EvolveDOLine_Part)
                .query("INSERT INTO EvolveDoLine  (EvolveDO_ID, EvolveDOLine_Number,EvolveDOLine_Part, EvolveDOLine_Custpart ,EvolveDOLine_QtyDO, EvolveDOLine_QtyInv,EvolveDOLine_Status,EvolveSalesOrderLine_ID ) VALUES (@EvolveDO_ID, @EvolveDOLine_Number,@EvolveDOLine_Part, @EvolveDOLine_Custpart ,@EvolveDOLine_QtyDO,@EvolveDOLine_QtyInv , 'open',@EvolveSalesOrderLine_ID)");

        } catch (error) {
            Evolve.Log.error(" EERR1580: Error while adding Do Line Data "+error.message);
            return new Error(" EERR1580: Error while adding Do Line Data "+error.message);
        }
    },
    updateSaesOrder: async function (id, qty) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSalesOrder_ID', Evolve.Sql.Int, id)
                .input('qty', Evolve.Sql.Int, qty)
                .query("UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_DOQty =  EvolveSalesOrderLine_DOQty +@qty  where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1581: Error while update Sales Order "+error.message);
            return new Error(" EERR1581: Error while update Sales Order "+error.message);
        }
    },
    getallInvoice: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * from EvolveInvoice where EvolveInvoice_Status = 'open' ");
        } catch (error) {
            Evolve.Log.error(" EERR1582: Error while getting all Invoice "+error.message);
            return new Error(" EERR1582: Error while getting all Invoice "+error.message);
        }
    },

    addGetExit: async function (data, EvolveDOLine_ID) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveGateExit_SerialNo', Evolve.Sql.NVarChar, data.EvolveGateExit_SerialNo)
                .input('EvolveDO_ID', Evolve.Sql.Int, data.EvolveDO_ID)
                .input('EvolveDOLine_ID', Evolve.Sql.Int, EvolveDOLine_ID)
                .input('EvolveGateExit_SoNumber', Evolve.Sql.Int, data.EvolveGateExit_SoNumber)
                .input('EvolveGateExit_InvoiceNo', Evolve.Sql.Int, data.EvolveGateExit_InvoiceNo)
                .input('EvolveGateExit_Transporter', Evolve.Sql.Int, data.EvolveGateExit_Transporter)
                .input('EvolveGateExit_VehicleNumber', Evolve.Sql.Int, data.EvolveGateExit_VehicleNumber)
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('dataTime', Evolve.Sql.NVarChar, dataTime)
                .query("INSERT INTO EvolveGateExit (EvolveGateExit_SerialNo, EvolveDO_ID, EvolveDOLine_ID, EvolveGateExit_SoNumber, EvolveGateExit_InvoiceNo,EvolveGateExit_Transporter, EvolveGateExit_VehicleNumber, EvolveGateExit_CreatedUser, EvolveGateExit_CreatedAt, EvolveGateExit_UpdatedUser, EvolveGateExit_UpdatedAt) VALUES (@EvolveGateExit_SerialNo, @EvolveDO_ID, @EvolveDOLine_ID, @EvolveGateExit_SoNumber, @EvolveGateExit_InvoiceNo, @EvolveGateExit_Transporter, @EvolveGateExit_VehicleNumber, @EvolveUser_ID, @dataTime, @EvolveUser_ID, @dataTime)  ");
        } catch (error) {
            Evolve.Log.error(" EERR1583: Error while adding Get Exit "+error.message);
            return new Error(" EERR1583: Error while adding Get Exit "+error.message);
        }
    },
    updateInvoiceStatus: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGateExit_InvoiceNo', Evolve.Sql.Int, data.EvolveGateExit_InvoiceNo)
                .query("UPDATE EvolveInvoice SET EvolveInvoice_Status = 'close' WHERE  EvolveInvoice_ID = @EvolveGateExit_InvoiceNo");
        } catch (error) {
            Evolve.Log.error(" EERR1584: Error while updating Invoice Status "+error.message);
            return new Error(" EERR1584: Error while updating Invoice Status "+error.message);
        }
    },

    updateDOStatus: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDO_ID', Evolve.Sql.Int, data.EvolveDO_ID)
                .query("UPDATE EvolveDo SET EvolveDO_Status = 'close' WHERE  EvolveDO_ID = @EvolveDO_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1585: Error while updating DO Status "+error.message);
            return new Error(" EERR1585: Error while updating DO Status "+error.message);
        }
    },
    updateDOLineStatus: async function (EvolveDOLine_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDOLine_ID', Evolve.Sql.Int, EvolveDOLine_ID)
                .query("UPDATE EvolveDoLine SET EvolveDOLine_Status = 'close' WHERE EvolveDOLine_ID = @EvolveDOLine_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1586: Error while updating DO Line Status "+error.message);
            return new Error(" EERR1586: Error while updating DO Line Status "+error.message);
        }
    },
    getSOLine_Id: async function (EvolveDOLine_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDOLine_ID', Evolve.Sql.Int, EvolveDOLine_ID)
                .query("SELECT EvolveSalesOrderLine_ID FROM EvolveDoLine WHERE EvolveDOLine_ID = @EvolveDOLine_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1587: Error while getting SO Line_Id "+error.message);
            return new Error(" EERR1587: Error while getting SO Line_Id "+error.message);
        }
    },
    updateSOLineStatus: async function (SOLine_Id) {
        try {
            return await Evolve.SqlPool.request()
                .input('SOLine_Id', Evolve.Sql.Int, SOLine_Id)
                .query("UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_Status = 'close' WHERE EvolveSalesOrderLine_ID = @SOLine_Id");
        } catch (error) {
            Evolve.Log.error(" EERR1588: Error while updating SO Line Status "+error.message);
            return new Error(" EERR1588: Error while updating SO Line Status "+error.message);
        }
    },
    getOpenSOLineCnt: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDO_ID', Evolve.Sql.Int, data.EvolveDO_ID)
                .query("SELECT COUNT(esol.EvolveSalesOrderLine_ID) AS openSoLines FROM EvolveDo ed , EvolveSalesOrder eso , EvolveSalesOrderLine esol WHERE ed.EvolveDO_ID = @EvolveDO_ID AND eso.EvolveSalesOrder_Number = ed.EvolveDO_SONumber          AND esol.EvolveSalesOrder_ID = eso.EvolveSalesOrder_ID AND esol.EvolveSalesOrderLine_Status = 'open'");
        } catch (error) {
            Evolve.Log.error(" EERR1589: Error while getting Open SO Line Cnt "+error.message);
            return new Error(" EERR1589: Error while getting Open SO Line Cnt "+error.message);
        }
    },

    updateSoStatusByNumber: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSalesOrder_Number', Evolve.Sql.NVarChar, data.EvolveGateExit_SoNumber)
                .query("UPDATE EvolveSalesOrder SET EvolveSalesOrder_Status = 'close' WHERE EvolveSalesOrder_Number = @EvolveSalesOrder_Number");
        } catch (error) {
            Evolve.Log.error(" EERR1590: Error while updating So Status By Number "+error.message);
            return new Error(" EERR1590: Error while updating So Status By Number "+error.message);
        }
    },

    getLastPassword: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("SELECT EvolveUser_password , EvolveUser_OldPassword from EvolveUser where EvolveUser_ID = @EvolveUser_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1591: Error while getting Last Password "+error.message);
            return new Error(" EERR1591: Error while getting Last Password "+error.message);
        }
    },


    updateUserPassword: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveUser_password', Evolve.Sql.NVarChar, data.newPassword)
                .input('EvolveUser_OldPassword', Evolve.Sql.NVarChar, data.newPasswordArray)
                .query("UPDATE EvolveUser SET EvolveUser_password = @EvolveUser_password , EvolveUser_OldPassword = @EvolveUser_OldPassword  where EvolveUser_ID = @EvolveUser_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1592: Error while updating User Password "+error.message);
            return new Error(" EERR1592: Error while updating User Password "+error.message);
        }
    },

    // io Data

    getIoReportDataCountList: async function (condition) {
        try {

            return await Evolve.SqlPool.request()
                // .input('startDate', Evolve.Sql.NVarChar, startDate)
                // .input('endDate', Evolve.Sql.NVarChar, endDate)
                .query("SELECT COUNT(EvolveIO_ID) AS count from EvolveIO " + condition);
        } catch (error) {
            Evolve.Log.error(" EERR1593: Error while getting Io Report Data Count List "+error.message);
            return new Error(" EERR1593: Error while getting Io Report Data Count List "+error.message);
        }
    },

    getIoReportDataDatatableList: async function (start, length, condition) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .query("SELECT * FROM EvolveIO  " + condition + "  ORDER BY EvolveIO_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1594: Error while getting Io Report Data Datatable List "+error.message);
            return new Error(" EERR1594: Error while getting Io Report Data Datatable List "+error.message);
        }
    },

    getSingleIoCodeData: async function (ioDataId) {

        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveIO WHERE [EvolveIO_ID] =" + ioDataId);
        } catch (error) {
            Evolve.Log.error(" EERR1595: Error while getting Single Io Code Data "+error.message);
            return new Error(" EERR1595: Error while getting Single Io Code Data "+error.message);
        }
    },

    changeIoCodeStatus: async function (ioDataId) {
        try {
            return await Evolve.SqlPool.request()
                .query("  UPDATE EvolveIO SET EvolveIO_Status = 1 WHERE EvolveIO_ID =" + ioDataId);
        } catch (error) {
            Evolve.Log.error(" EERR1596: Error while changing Io Code Status "+error.message);
            return new Error(" EERR1596: Error while changing Io Code Status "+error.message);
        }
    },

    updateActiveDirectorySecurity : async function (data) {
        try {
            let activedirectory =  await Evolve.SqlPool.request()
                .input('activedirectory',Evolve.Sql.NVarChar,data.activedirectory)
                .query("UPDATE EvolveConfig SET EvolveConfig_Value = @activedirectory Where EvolveConfig_Key = 'activedirectory'");
            if(activedirectory.rowsAffected < 1)
            {
                return activedirectory;
            }
            else
            {
                let url =  await Evolve.SqlPool.request()
                    .input('url',Evolve.Sql.NVarChar,data.url)
                    .query("update EvolveConfig set EvolveConfig_Value = @url Where EvolveConfig_Key = 'url'");
                if(url.rowsAffected < 1)
                {
                    return url;
                }
                else
                {
                    let baseDN =  await Evolve.SqlPool.request()
                        .input('baseDN',Evolve.Sql.NVarChar,data.baseDN)
                        .query("update EvolveConfig set EvolveConfig_Value = @baseDN Where EvolveConfig_Key = 'baseDN'");
                    if(baseDN.rowsAffected < 1)
                    {
                        return baseDN;
                    }
                    else
                    {
                        let username =  await Evolve.SqlPool.request()
                            .input('username',Evolve.Sql.NVarChar,data.username)
                            .query("update EvolveConfig set EvolveConfig_Value = @username Where EvolveConfig_Key = 'username'");
                        if(username.rowsAffected < 1)
                        {
                            return username;
                        }
                        else
                        {
                            let password =  await Evolve.SqlPool.request()
                                .input('password',Evolve.Sql.NVarChar,data.password)
                                .query("update EvolveConfig set EvolveConfig_Value = @password Where EvolveConfig_Key = 'password'");
                            if(password.rowsAffected < 1)
                            {
                                return password;
                            }
                            else
                            {
                                return password;
                            }
                        }
                    }
                }
            }

        } catch (error) {
            Evolve.Log.error(" EERR1597: Error while updating Active Directory Security "+error.message);
            return new Error(" EERR1597: Error while updating Active Directory Security` "+error.message);
        }
    },

    async getIOServerInfo () {
        try {
            return await Evolve.SqlPool.request()
                .query("select * from EvolveConfig where EvolveConfig_Key = 'IOSERVERURL';")
        }
        catch (error) {
            Evolve.Log.error(" EERR1498: Error while getting IO Server Information "+error.message);
            return new Error(" EERR1498: Error while getting IO Server Information "+error.message);
        }
    },

}