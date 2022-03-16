'use strict';
const Evolve = require("../../../Boot/Evolve");
module.exports = {
    evolveLogin: async function(req, res) {
        try {
            let user = await Evolve.App.Services.Common.SrvCommon.getUserByEmail(req.body.EvolveUser_EmailID);
            if (user.recordset.length >= 1) {
                let EvolveUserData = user.recordset[0];
                let lastPassword = EvolveUserData.EvolveUser_password;
                EvolveUserData.EvolveUnit_ID = null;
                EvolveUserData.EvolveUnitList = [];
                EvolveUserData.EvolveRole_ID = null;
                EvolveUserData.EvolveCompany_ID = null;

                EvolveUserData.EvolveRoleList = [];

                let activedirectory = 0;
                if (Evolve.Config.activedirectory != undefined && Evolve.Config.activedirectory == 1 && EvolveUserData.EvolveUser_ActiveDirIsActive == true) {
                    activedirectory = 1;
                }
                // console.log(" Evolve.Config.activedirectory:: ", Evolve.Config.activedirectory)
                console.log(" activedirectory:: ", activedirectory)
                    // console.log(" EvolveUser_ActiveDirIsActive :: ", EvolveUserData.EvolveUser_ActiveDirIsActive)
                let authenticated = false;
                if (activedirectory == 0 && Evolve.Bcrypt.compareSync(req.body.EvolveUser_password, lastPassword)) {
                    authenticated = true;
                } else {

                    if (activedirectory == 1) {
                        if (Evolve.ADQueue[EvolveUserData.EvolveUser_ID] == undefined) {
                            Evolve.ADQueue[EvolveUserData.EvolveUser_ID] = 0;
                        }

                        // 1 = valid, 2 = invalid, 3 = queue, 0 = idle
                        if (Evolve.ADQueue[EvolveUserData.EvolveUser_ID] == 0) {
                            Evolve.ADQueue[EvolveUserData.EvolveUser_ID] = 3;
                            let ad = new Evolve.AD(Evolve.Config.url, Evolve.Config.baseDN, Evolve.Config.username, Evolve.Config.password);
                            console.log("Ad :>>>>>>>>", ad)

                            ad.authenticate(req.body.EvolveUser_EmailID, req.body.EvolveUser_password, function(err, auth) {
                                if (err) {
                                    console.log('ERROR: ' + JSON.stringify(err));
                                    Evolve.ADQueue[EvolveUserData.EvolveUser_ID] = 2;
                                    return;
                                }
                                if (auth) {
                                    console.log('Authenticated!');
                                    Evolve.ADQueue[EvolveUserData.EvolveUser_ID] = 1;
                                } else {
                                    console.log('Authentication failed!');
                                    Evolve.ADQueue[EvolveUserData.EvolveUser_ID] = 2;
                                }
                            });

                        }

                        // console.log("Before::", Evolve.ADQueue);
                        if (Evolve.ADQueue[EvolveUserData.EvolveUser_ID] == 1) {
                            authenticated = true;
                            Evolve.ADQueue[EvolveUserData.EvolveUser_ID] = 0; // Make idle
                        }
                        if (Evolve.ADQueue[EvolveUserData.EvolveUser_ID] == 2) {
                            authenticated = false;
                            activedirectory = 0;
                            Evolve.ADQueue[EvolveUserData.EvolveUser_ID] = 0;
                        }
                        // console.log("After :::", Evolve.ADQueue);
                    } else {
                        authenticated = false;
                    }


                }

                if (authenticated) {


                    // console.log("I am here ");
                    // let lastPasswordChngDate = EvolveUserData.EvolveUser_PassWordChangeAt
                    // const date1 = new Date(lastPasswordChngDate+"".slice(0,10));
                    // const date2 = new Date();
                    // const diffTime = Math.abs(date2 - date1);
                    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    // if(diffDays < 90)
                    // {


                    let logData = {
                        'EvolveUser_ID': EvolveUserData.EvolveUser_ID,
                        'EvolveLogin_IP': req.headers.origin,
                        'EvolveLogin_Device': req.headers['user-agent'],
                        'EvolveLogin_Mac': 'NULL'
                    }

                    let onFailedAttempts = await Evolve.App.Services.Common.SrvCommon.onLogin(logData);


                    // let EvolveCompany_ID = await Evolve.App.Services.Common.SrvCommon.getEvolveCompanyID(EvolveUserData.EvolveUser_ID);
                    // if (EvolveCompany_ID instanceof Error || EvolveCompany_ID.rowsAffected < 1) {
                    //   EvolveCompany_ID = 0;
                    // } else {
                    //   EvolveCompany_ID = EvolveCompany_ID.recordset[0].EvolveCompany_ID;
                    // }

                    // let EvolveUserUrl = await Evolve.App.Services.Common.SrvCommon.getEvolveUserDefaultUrl(EvolveUserData.EvolveUser_ID);
                    // if (EvolveUserUrl instanceof Error || EvolveUserUrl.rowsAffected < 1) {
                    //   EvolveUserUrl = "root";
                    // } else {
                    //   EvolveUserUrl = EvolveUserUrl.recordset[0].EvolveMenu_Url;
                    // }


                    let userLink = await Evolve.App.Services.Common.SrvCommon.getEvolveUnitID(EvolveUserData.EvolveUser_ID);
                    if (userLink instanceof Error || userLink.rowsAffected < 1) {
                        userLink = 0;
                    } else {
                        EvolveUserData.EvolveCompany_ID = userLink.recordset[0].EvolveCompany_ID;
                        EvolveUserData.EvolveUnit_ID = userLink.recordset[0].EvolveUnit_ID;
                        EvolveUserData.EvolveRole_ID = userLink.recordset[0].EvolveRole_ID;




                        // EvolveUserData.EvolveUnitList = EvolveUnit_ID.recordset ;

                    }

                    // let EvolveRole_ID = await Evolve.App.Services.Common.SrvCommon.getEvolveRoleID(EvolveUserData.EvolveUser_ID ,  EvolveUserData.EvolveUnit_ID);
                    // if (EvolveRole_ID instanceof Error || EvolveRole_ID.rowsAffected < 1) {
                    //   EvolveRole_ID = 0;
                    // } else {
                    //   EvolveUserData.EvolveRole_ID = EvolveRole_ID.recordset[0].EvolveRole_ID;
                    //   // EvolveUserData.EvolveRoleList = EvolveRole_ID.recordset ;

                    // }




                    // Evolve V3 Token New Code
                    /** Start Here  */
                    let EvolveUserAvailabe = false;
                    let token = Evolve.UUID.v4();
                    for (let Euser in Evolve.EvolveUsersAuth) {
                        if (Evolve.EvolveUsersAuth[Euser].EvolveUser_ID == EvolveUserData.EvolveUser_ID) {
                            // Evolve.Log.info("Evolve User Found....");
                            EvolveUserAvailabe = true;
                            Evolve.EvolveUsersAuth[Euser].EvolveUserToken = token;
                        }
                    }


                    let EvolveUserUrl = 'root';

                    if (EvolveUserAvailabe == false) {
                        Evolve.Log.info("Evolve User Add New Record....");
                        Evolve.EvolveUsersAuth.push({
                            EvolveUserToken: token,
                            EvolveUser_ID: EvolveUserData.EvolveUser_ID,
                            EvolveCompany_ID: EvolveUserData.EvolveCompany_ID,
                            EvolveUnit_ID: EvolveUserData.EvolveUnit_ID,
                            EvolveRole_ID: EvolveUserData.EvolveRole_ID,
                            EvolveUser_EmailID: EvolveUserData.EvolveUser_EmailID,
                            EvolveUser_Name: EvolveUserData.EvolveUser_Name,
                            EvolveUser_IsActive: EvolveUserData.EvolveUser_IsActive,
                            EvolveTest: "Hi There...",
                            EvolveUser_DefaultUrl: EvolveUserUrl,
                            // EvolveUnitList : EvolveUserData.EvolveUnitList ,
                            // EvolveRoleList : EvolveUserData.EvolveRoleList ,
                        })
                    }

                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "User Successfully Logged in.",
                        success: true,
                        EvolveToken: token,
                        result: {
                            EvolveToken: token,
                            EvolveUser_ID: EvolveUserData.EvolveUser_ID,
                            EvolveUser_EmailID: EvolveUserData.EvolveUser_EmailID,
                            EvolveUser_Name: EvolveUserData.EvolveUser_Name,
                            EvolveBranch_ID: EvolveUserData.EvolveBranch_ID,
                            EvolveUnitList: EvolveUserData.EvolveUnitList,
                            EvolveRoleList: EvolveUserData.EvolveRoleList,
                            EvolveUnit_ID: EvolveUserData.EvolveUnit_ID,
                            EvolveRole_ID: EvolveUserData.EvolveRole_ID,


                        }
                    };
                    res.send(obj);



                    /** End Here  */

                    /**


        // Let Generate Token
          let loginData = {
            EvolveUser_ID: EvolveUserData.EvolveUser_ID,
            EvolveUser_EmailID: EvolveUserData.EvolveUser_EmailID,
            EvolveUser_Name: EvolveUserData.EvolveUser_Name,
            EvolveUser_IsActive: EvolveUserData.EvolveUser_IsActive,
            EvolveCompany_ID: EvolveCompany_ID,
            EvolveUnit_ID: EvolveUnit_ID,
            EvolveRole_ID: EvolveRole_ID,
            EvolveTest: "Evolve Testing.....",
            //EvolveUser_UserType :  EvolveUserData.EvolveUser_UserType,
            EvolveUser_DefaultUrl: EvolveUserUrl,
          }

          loginData = JSON.stringify(loginData);

                    let dateObj = new Date();
                    let timeStamp = dateObj.getTime();
                    //  console.log(">>>", Evolve.Md5Enc(req.body.EvolveUser_EmailID)) 
                    let token = Evolve.Md5Enc(req.body.EvolveUser_EmailID) + timeStamp + Evolve.Md5Enc(EvolveUserData.EvolveUser_password)
                    // console.log("token >>>", token)
                    let EvolveTokenObj = await Evolve.App.Services.Common.SrvCommon.setEvolveToken(EvolveUserData.EvolveUser_ID, token, loginData);
                    // console.log("EvolveTokenObj>>>", EvolveTokenObj)
                    if (EvolveTokenObj instanceof Error || EvolveTokenObj.rowsAffected < 1) {
          
                      Evolve.Log.error("Invalid Credentials! Token Save.");
                      let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Incorrect Paswword. Please re-enter",
                        result: null
                      };
                      res.send(obj);
          
                    } else {
                      let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "User Successfully Logged in.",
                        success: true,
                        EvolveToken: token,
                        result: {
                          EvolveToken: token,
                          EvolveUser_ID: EvolveUserData.EvolveUser_ID,
                          EvolveUser_EmailID: EvolveUserData.EvolveUser_EmailID,
                          EvolveUser_Name: EvolveUserData.EvolveUser_Name,
                          EvolveBranch_ID: EvolveUserData.EvolveBranch_ID
                        }
                      };
                      res.send(obj);
                    }
          
          */


                } else {


                    let lfAttData = {
                        'EvolveLoginFailedAttempts_UserID': req.body.EvolveUser_EmailID,
                        'EvolveLoginFailedAttempts_IP': req.headers.origin,
                        'EvolveLoginFailedAttempts_Device': req.headers['user-agent'],
                        'EvolveLoginFailedAttempts_Mac': 'NULL'
                    }

                    let onFailedAttempts = await Evolve.App.Services.Common.SrvCommon.onFailedAttempts(lfAttData);

                    Evolve.Log.error("Invalid Credentials!...........");
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Incorrect Paswword. Please re-enter",
                        result: null,
                        activedirectory: activedirectory
                    };
                    res.send(obj);
                }


            } else {


                let lfAttData = {
                    'EvolveLoginFailedAttempts_UserID': req.body.EvolveUser_EmailID,
                    'EvolveLoginFailedAttempts_IP': req.headers.origin,
                    'EvolveLoginFailedAttempts_Device': req.headers['user-agent'],
                    'EvolveLoginFailedAttempts_Mac': 'NULL'
                }

                let onFailedAttempts = await Evolve.App.Services.Common.SrvCommon.onFailedAttempts(lfAttData);


                Evolve.Log.error("No User Found!");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "User Not Found",
                    result: 1
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0064: Error while logging in " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0064: Error while logging in " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getLoginPageStyle: async function(req, res) {
        try {
            let pageLogo = await Evolve.App.Services.Unit.UnitServices.getUnitConfigValue('login_page_logo');
            let loginRes = {};
            if (pageLogo instanceof Error || pageLogo.rowAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Login page logo not found", result: null };
                res.send(obj);
            } else {
                loginRes.logo = pageLogo.recordset[0].EvolveUnitConfig_Value;
                let pageBg = await Evolve.App.Services.Unit.UnitServices.getUnitConfigValue('login_page_background');
                if (pageBg instanceof Error || pageBg.rowAffected < 1) {
                    let obj = { statusCode: 400, status: "fail", message: "Login page background not found", result: null };
                    res.send(obj);
                } else {
                    loginRes.bg = pageBg.recordset[0].EvolveUnitConfig_Value;
                    let pageBgType = await Evolve.App.Services.Unit.UnitServices.getUnitConfigValue('login_page_backgroundType');
                    if (pageBgType instanceof Error || pageBgType.rowAffected < 1) {
                        let obj = { statusCode: 400, status: "fail", message: "Login page background type not found", result: null };
                        res.send(obj);
                    } else {
                        loginRes.bgType = pageBgType.recordset[0].EvolveUnitConfig_Value;
                        let obj = { statusCode: 200, status: "success", message: "Login style fetch", result: loginRes };
                        res.send(obj);
                    }
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0065: Error while get Login Page Style " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0065: Error while get Login Page Style " + error.message, result: null };
            res.send(obj);
        }
    },

    getCountryList: async function(req, res) {
        try {
            let countryList = await Evolve.App.Services.Common.SrvCommon.getCountryList();
            let obj = { statusCode: 200, status: "success", message: "country List", result: countryList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0066: Error while getting Country List " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0066: Error while getting Country List " + error.message, result: null };
            res.send(obj);
        }
    },
    getLangugeList: async function(req, res) {
        try {
            let languageList = await Evolve.App.Services.Common.SrvCommon.getLanguageList(req.body.EvolveCountry_ID);
            let obj = { statusCode: 200, status: "success", message: "language List", result: languageList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0067: Error while getting language List " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0067: Error while getting language List " + error.message, result: null };
            res.send(obj);
        }
    },
    getTranslate: async function(req, res) {
        try {
            let translate = await Evolve.App.Services.Common.SrvCommon.getTranslate(req.body.languageId, req.body.translate);
            let obj = { statusCode: 200, status: "success", message: "translate data", result: translate.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0068: Error while translating " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0068: Error while translating " + error.message, result: null };
            res.send(obj);
        }
    },

    getTranslateForMobile: async function(req, res) {
        try {
            let translate = await Evolve.App.Services.Common.SrvCommon.getTranslate(req.body.languageId, req.body.translate);
            let arrayToSend = []
            for (let i = 0; i < translate.recordset.length; i++) {
                let key = translate.recordset[i].EvolvelLabel_KeyWord;
                let value = translate.recordset[i].EvolveLabel_Term;
                let objcon = {};
                objcon[key] = value;
                console.log("objcon ", objcon);
                arrayToSend.push(objcon)
            }
            let obj = { statusCode: 200, status: "success", message: "translate data", result: arrayToSend };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0068: Error while translating " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0068: Error while translating " + error.message, result: null };
            res.send(obj);
        }
    },
    evolveMenuList: async function(req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let uniqAppID = 1;
            let appList = '';
            if (req.body.EvolveApp_Code != undefined && (req.body.EvolveApp_Code == 'EAC' || req.body.EvolveApp_Code == '')) {
                appList = await Evolve.App.Services.Common.SrvCommon.evolveAllAppList();
            } else {
                appList = await Evolve.App.Services.Common.SrvCommon.evolveAllAppList(req.body.EvolveApp_Code);
            }
            let menuList = [];
            let EvolveRoleList = [];
            let EvolveRole_ID = await Evolve.App.Services.Common.SrvCommon.getEvolveRoleID(req.EvolveUser_ID, req.EvolveUnit_ID);
            if (EvolveRole_ID instanceof Error || EvolveRole_ID.rowsAffected < 1) {
                EvolveRole_ID = 0;
            } else {
                EvolveRoleList = EvolveRole_ID.recordset;
            }
            if (EvolveRoleList.length > 0) {
                let isAdmin = false;

                for (let i = 0; i < EvolveRoleList.length; i++) {
                    if (EvolveRoleList[i].EvolveRole_Code == 'EVOLVEADMIN') {
                        isAdmin = true;
                    }
                }
                for await (let app of appList.recordsets[0]) {

                    req.body.EvolveApp_Code = app.EvolveApp_Code;
                    req.body.EvolveApp_ID = app.EvolveApp_ID;
                    let appChild = [];
                    let appSubmenu = [];

                    let sidebarMenuList;
                    if (isAdmin) {

                        sidebarMenuList = await Evolve.App.Services.Common.SrvCommon.evolveMenuListForAdmin(req.body);
                    } else {

                        let condition = ' AND (';
                        for (let i = 0; i < EvolveRoleList.length; i++) {

                            if (i == 0 && i != EvolveRoleList.length - 1) {

                                condition += " erm.EvolveRole_ID = " + EvolveRoleList[i].EvolveRole_ID


                            } else if (i != 0 && i == EvolveRoleList.length - 1) {

                                condition += " OR erm.EvolveRole_ID = " + EvolveRoleList[i].EvolveRole_ID


                            } else if (i == 0 && i == EvolveRoleList.length - 1) {

                                condition += " erm.EvolveRole_ID = " + EvolveRoleList[i].EvolveRole_ID + " )"


                            } else {

                                condition += "OR  erm.EvolveRole_ID = " + EvolveRoleList[i].EvolveRole_ID

                            }
                        }
                        sidebarMenuList = await Evolve.App.Services.Common.SrvCommon.evolveMenuListV2(req.body, condition);
                    }

                    for (let i = 0; i < sidebarMenuList.recordsets[0].length; i++) {
                        let childs = [];
                        let submenu = [];

                        let condition = ' AND (';
                        for (let i = 0; i < EvolveRoleList.length; i++) {

                            if (i == 0 && i != EvolveRoleList.length - 1) {

                                condition += " erm.EvolveRole_ID = " + EvolveRoleList[i].EvolveRole_ID


                            } else if (i != 0 && i == EvolveRoleList.length - 1) {

                                condition += " OR erm.EvolveRole_ID = " + EvolveRoleList[i].EvolveRole_ID


                            } else if (i == 0 && i == EvolveRoleList.length - 1) {

                                condition += " erm.EvolveRole_ID = " + EvolveRoleList[i].EvolveRole_ID + " )"


                            } else {

                                condition += "OR  erm.EvolveRole_ID = " + EvolveRoleList[i].EvolveRole_ID

                            }
                        }
                        let childLink = await Evolve.App.Services.Common.SrvCommon.evolveMenuChildList(sidebarMenuList.recordsets[0][i].EvolveMenu_Id, condition);
                        for (let j = 0; j < childLink.recordset.length; j++) {
                            submenu.push({
                                EvolveMenu_Id: childLink.recordset[j].EvolveMenu_Id,
                                id: uniqAppID++, //j + "" + sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
                                title: childLink.recordset[j].EvolveMenu_Name,
                                page: childLink.recordset[j].EvolveMenu_Url,
                                icon: childLink.recordset[j].EvolveMenu_Icon
                            });
                            childs.push(childLink.recordset[j].EvolveMenu_Url);
                        }

                        appSubmenu.push({
                            EvolveMenu_Id: sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
                            id: uniqAppID++, // sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
                            title: sidebarMenuList.recordsets[0][i].EvolveMenu_Name,
                            icon: sidebarMenuList.recordsets[0][i].EvolveMenu_Icon,
                            page: sidebarMenuList.recordsets[0][i].EvolveMenu_Url,
                            childs: childs,
                            submenu: submenu
                        });
                        appChild.push(sidebarMenuList.recordsets[0][i].EvolveMenu_Url);
                    }

                    menuList.push({
                        id: uniqAppID++, //app.EvolveApp_ID,
                        title: app.EvolveApp_Name,
                        icon: app.EvolveApp_Icon,
                        page: '', // app.EvolveApp_Url
                        childs: appChild,
                        submenu: appSubmenu,
                        code: app.EvolveApp_Code
                    });


                }
            }
            // console.log("menuList??????" ,  menuList)
            let obj = { statusCode: 200, status: "success", message: "Menu List", result: menuList };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0069: Error while showing menu list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0069: Error while showing menu list " + error.message, result: null };
            res.send(obj);
        }
    },

    // Page Paramiter

    pageParameter: async function(req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            console.log("menu URL", req.body.menuUrl)
            let pageData = await Evolve.App.Services.Common.SrvCommon.pageParameter(req.body);
            if (pageData instanceof Error || pageData.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No record Found", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Page Data", result: pageData.recordsets[0] };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0070: Error while getting page parameters " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0070: Error while getting page parameters " + error.message, result: null };
            res.send(obj);
        }
    },

    getBranchList: async function(req, res) {
        try {

            let BranchData = await Evolve.App.Services.Common.SrvCommon.getBranchList(req.EvolveUser_ID);
            if (BranchData instanceof Error || BranchData.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No record Found", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Page Data", result: BranchData.recordsets[0] };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0071: Error while getting branch list" + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0071: Error while getting branch list " + error.message, result: null };
            res.send(obj);
        }
    },
    updateEvolveConfig: async function() {
        try {
            console.log(" Evolve Config Called....... ")
            console.log(" Evolve.Config.activedirectory:: ", Evolve.Config.activedirectory)
            let EvolveConfig = await Evolve.App.Services.Common.SrvCommon.getEvolveConfig();
            if (EvolveConfig instanceof Error || EvolveConfig.rowsAffected < 1) {
                Evolve.Log.error('Evolve Config Not Found!');
            } else {
                Evolve.Log.info('Updating.... Evolve Config');
                EvolveConfig = EvolveConfig.recordsets[0];
                // Evolve.Config = {};
                for (let i = 0; i < EvolveConfig.length; i++) {
                    Evolve.Config[EvolveConfig[i].EvolveConfig_Key] = EvolveConfig[i].EvolveConfig_Value;
                }
            }
            console.log(" Evolve.Config.activedirectory:: ", Evolve.Config.activedirectory)
        } catch (error) {
            Evolve.Log.error(" EERR0072: Error while updating evolve config " + error.message);
        }
    },


    planningSidebarMenuList: async function(req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let sidebarMenuList = await Evolve.App.Services.Common.SrvCommon.planningSidebarMenuList(
                req.body
            );
            let menuList = [];
            for (let i = 0; i < sidebarMenuList.recordsets[0].length; i++) {
                // Find Child Link
                let childLink = await Evolve.App.Services.Common.SrvCommon.getPlanningSidebarMenuChildList(
                    sidebarMenuList.recordsets[0][i].EvolveMenu_Id
                );
                let childs = [];
                let submenu = [];
                for (let j = 0; j < childLink.recordset.length; j++) {
                    // console.log(sidebarMenuList.recordsets[0][i].EvolveMenu_Url);
                    if (sidebarMenuList.recordsets[0][i].EvolveMenu_Url == null) {
                        submenu.push({
                            id: j + "" + sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
                            title: childLink.recordset[j].EvolveMenu_Name,
                            page: childLink.recordset[j].EvolveMenu_Url,
                            icon: childLink.recordset[j].EvolveMenu_Icon
                        });
                    } else {
                        childs.push(childLink.recordset[j].EvolveMenu_Url);
                    }
                }
                // console.log(submenu);
                // if(i==0){
                //   menuList.push({
                //     id: sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
                //     title: sidebarMenuList.recordsets[0][i].EvolveMenu_Name,
                //     icon:sidebarMenuList.recordsets[0][i].EvolveMenu_Icon,
                //     page: '',
                //     childs : childs,
                //     isOpen: false,
                //     level: 0,
                //     submenu: [
                //       {
                //         id: 110,
                //         title: "Dashboard 1",
                //         page: ""
                //       },
                //       {
                //         id: 120,
                //         title: "Dashboard 2",
                //         page: ""
                //       }
                //     ]
                //   });
                // }else{
                menuList.push({
                    id: sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
                    title: sidebarMenuList.recordsets[0][i].EvolveMenu_Name,
                    icon: sidebarMenuList.recordsets[0][i].EvolveMenu_Icon,
                    page: sidebarMenuList.recordsets[0][i].EvolveMenu_Url,
                    childs: childs,
                    submenu: submenu
                });
                // }
            }


            let obj = {
                statusCode: 200,
                status: "success",
                message: "Menu List",
                result: menuList
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0073: Error while planning Sidebar Menu List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0073: Error while planning Sidebar Menu List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    complianceSidebarMenuList: async function(req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let sidebarMenuList = await Evolve.App.Services.Common.SrvCommon.complianceSidebarMenuList(req.body);
            let menuList = [];
            for (let i = 0; i < sidebarMenuList.recordsets[0].length; i++) {
                // Find Child Link
                let childLink = await Evolve.App.Services.Common.SrvCommon.getcomplianceSidebarMenuChildList(
                    sidebarMenuList.recordsets[0][i].EvolveMenu_Id
                );
                let childs = [];
                let submenu = [];
                for (let j = 0; j < childLink.recordset.length; j++) {
                    // console.log(sidebarMenuList.recordsets[0][i].EvolveMenu_Url);
                    if (sidebarMenuList.recordsets[0][i].EvolveMenu_Url == null) {
                        submenu.push({
                            id: j + "" + sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
                            title: childLink.recordset[j].EvolveMenu_Name,
                            page: childLink.recordset[j].EvolveMenu_Url,
                            icon: childLink.recordset[j].EvolveMenu_Icon
                        });
                    } else {
                        childs.push(childLink.recordset[j].EvolveMenu_Url);
                    }
                }
                // console.log(submenu);
                // if(i==0){
                //   menuList.push({
                //     id: sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
                //     title: sidebarMenuList.recordsets[0][i].EvolveMenu_Name,
                //     icon:sidebarMenuList.recordsets[0][i].EvolveMenu_Icon,
                //     page: '',
                //     childs : childs,
                //     isOpen: false,
                //     level: 0,
                //     submenu: [
                //       {
                //         id: 110,
                //         title: "Dashboard 1",
                //         page: ""
                //       },
                //       {
                //         id: 120,
                //         title: "Dashboard 2",
                //         page: ""
                //       }
                //     ]
                //   });
                // }else{
                menuList.push({
                    id: sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
                    title: sidebarMenuList.recordsets[0][i].EvolveMenu_Name,
                    icon: sidebarMenuList.recordsets[0][i].EvolveMenu_Icon,
                    page: sidebarMenuList.recordsets[0][i].EvolveMenu_Url,
                    childs: childs,
                    submenu: submenu
                });
                // }
            }


            let obj = {
                statusCode: 200,
                status: "success",
                message: "Menu List",
                result: menuList
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0074: Error while planning Sidebar Menu List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0074: Error while planning Sidebar Menu List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    eAssetsSidebarMenuList: async function(req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let sidebarMenuList = await Evolve.App.Services.Common.SrvCommon.eAssetsSidebarMenuList(req.body);
            let menuList = [];
            for (let i = 0; i < sidebarMenuList.recordsets[0].length; i++) {
                // Find Child Link
                let childLink = await Evolve.App.Services.Common.SrvCommon.eAssetsSidebarMenuListChildList(
                    sidebarMenuList.recordsets[0][i].EvolveMenu_Id
                );
                let childs = [];
                let submenu = [];
                for (let j = 0; j < childLink.recordset.length; j++) {
                    // console.log(sidebarMenuList.recordsets[0][i].EvolveMenu_Url);
                    if (sidebarMenuList.recordsets[0][i].EvolveMenu_Url == null) {
                        submenu.push({
                            id: j + "" + sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
                            title: childLink.recordset[j].EvolveMenu_Name,
                            page: childLink.recordset[j].EvolveMenu_Url,
                            icon: childLink.recordset[j].EvolveMenu_Icon
                        });
                    } else {
                        childs.push(childLink.recordset[j].EvolveMenu_Url);
                    }
                }
                // console.log(submenu);
                // if(i==0){
                //   menuList.push({
                //     id: sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
                //     title: sidebarMenuList.recordsets[0][i].EvolveMenu_Name,
                //     icon:sidebarMenuList.recordsets[0][i].EvolveMenu_Icon,
                //     page: '',
                //     childs : childs,
                //     isOpen: false,
                //     level: 0,
                //     submenu: [
                //       {
                //         id: 110,
                //         title: "Dashboard 1",
                //         page: ""
                //       },
                //       {
                //         id: 120,
                //         title: "Dashboard 2",
                //         page: ""
                //       }
                //     ]
                //   });
                // }else{
                menuList.push({
                    id: sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
                    title: sidebarMenuList.recordsets[0][i].EvolveMenu_Name,
                    icon: sidebarMenuList.recordsets[0][i].EvolveMenu_Icon,
                    page: sidebarMenuList.recordsets[0][i].EvolveMenu_Url,
                    childs: childs,
                    submenu: submenu
                });
                // }
            }


            let obj = {
                statusCode: 200,
                status: "success",
                message: "Menu List",
                result: menuList
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0075: Error while compliance Sidebar MenuList " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0075: Error while compliance Sidebar MenuList " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    eGateControlSidebarMenuList: async function(req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let sidebarMenuList = await Evolve.App.Services.Common.SrvCommon.eGateControlSidebarMenuList(req.body);
            let menuList = [];
            for (let i = 0; i < sidebarMenuList.recordsets[0].length; i++) {
                // Find Child Link
                let childLink = await Evolve.App.Services.Common.SrvCommon.eGateControlSidebarMenuListChildList(
                    sidebarMenuList.recordsets[0][i].EvolveMenu_Id
                );
                let childs = [];
                let submenu = [];
                for (let j = 0; j < childLink.recordset.length; j++) {
                    // console.log(sidebarMenuList.recordsets[0][i].EvolveMenu_Url);
                    if (sidebarMenuList.recordsets[0][i].EvolveMenu_Url == null) {
                        submenu.push({
                            id: j + "" + sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
                            title: childLink.recordset[j].EvolveMenu_Name,
                            page: childLink.recordset[j].EvolveMenu_Url,
                            icon: childLink.recordset[j].EvolveMenu_Icon
                        });
                    } else {
                        childs.push(childLink.recordset[j].EvolveMenu_Url);
                    }
                }

                menuList.push({
                    id: sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
                    title: sidebarMenuList.recordsets[0][i].EvolveMenu_Name,
                    icon: sidebarMenuList.recordsets[0][i].EvolveMenu_Icon,
                    page: sidebarMenuList.recordsets[0][i].EvolveMenu_Url,
                    childs: childs,
                    submenu: submenu
                });
                // }
            }


            let obj = {
                statusCode: 200,
                status: "success",
                message: "Menu List",
                result: menuList
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0076: Error while eGate Control Sidebar MenuList " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0076: Error while eGate Control Sidebar MenuList " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    /* Inventory Trans History Start */
    addInvTransHistory: async function(data) {
        let getTransType_ID = await Evolve.App.Services.Common.SrvCommon.getTransTypeID(data.EvolveTranstype_code);
        if (getTransType_ID instanceof Error || getTransType_ID.rowAffected < 1) {
            Evolve.Log.error(getTransType_ID.message);
            Evolve.Log.error(" EERR0077: Transaction type not found for " + data.EvolveTranstype_Code)
            return getTransType_ID;
        } else {
            console.log("getTransType_ID ", getTransType_ID);
            data.EvolveTransType_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
            return await Evolve.App.Services.Common.SrvCommon.addInvTransHistory(data);
        }
    },
    /* Inventory Trans History End */

    /*** Serial Number Generate : START */
    getSerialNumber: async function(code) {
        try {
            console.log("code >>>", code);

            let SerialDetails = await Evolve.App.Services.Common.SrvCommon.getSerialDetails(code);
            if (SerialDetails instanceof Error || SerialDetails.rowsAffected < 1) {
                Evolve.Log.error(" EERR0003 : Serial Details Not Found! ")
                return 0;
            } else {

                let SerialNumber = await Evolve.App.Services.Common.SrvCommon.getSerialNumber(code);
                if (SerialNumber instanceof Error || SerialNumber.rowsAffected < 1) {
                    Evolve.Log.error(" EERR0002 : Serial Number Not Created ")
                    return 0;
                } else {

                    let incNumber = SerialNumber.recordset[0].inserted_id;
                    let width = SerialDetails.recordset[0].EvolveSerial_Width; // Width of Serial Number
                    incNumber = incNumber + '';
                    let newSerialNumber = incNumber.length >= width ? incNumber : new Array(width - incNumber.length + 1).join(0) + incNumber;

                    if (code == 'PALLET') {
                        newSerialNumber = SerialDetails.recordset[0].EvolveSerial_Prefix + newSerialNumber
                    }
                    if (code == 'PORECIEVEPALLET') {
                        newSerialNumber = SerialDetails.recordset[0].EvolveSerial_Prefix + newSerialNumber
                    }
                    if (code == 'WOSSEQUENCE') {
                        newSerialNumber = SerialDetails.recordset[0].EvolveSerial_Prefix + newSerialNumber
                    }
                    if (code == 'PICKLISTNUMBER') {
                        newSerialNumber = SerialDetails.recordset[0].EvolveSerial_Prefix + newSerialNumber
                    }
                    if (code == 'WOSORDERID') {
                        newSerialNumber = SerialDetails.recordset[0].EvolveSerial_Prefix + newSerialNumber
                    }
                    if (code == 'QCORDER') {
                        newSerialNumber = SerialDetails.recordset[0].EvolveSerial_Prefix + newSerialNumber
                    }
                    if (code == 'QCNCR') {
                        newSerialNumber = SerialDetails.recordset[0].EvolveSerial_Prefix + newSerialNumber
                    }
                    if (code == 'SALESQUOTE') {

                        newSerialNumber = SerialDetails.recordset[0].EvolveSerial_Prefix + newSerialNumber


                    }
                    return newSerialNumber;
                }
            }



        } catch (error) {
            Evolve.Log.error(' EERR0001: When Serial Number Not Found ' + error.message);
            return 0;
        }
    },
    /*** Serial Number Generate  : END  */

    // Navbar Theme Color
    getNavThemeColor: async function(req, res) {
        try {
            let getNavThemeColor = await Evolve.App.Services.Common.SrvCommon.getNavThemeColor();
            if (getNavThemeColor instanceof Error || getNavThemeColor.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get nav theme color",
                    result: null
                };
                res.send(obj);
            } else if (getNavThemeColor.rowsAffected == 1) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Theme Color",
                    result: getNavThemeColor.recordset
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Found more then One Defined Environment",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error('EERR32517: Error in Get Theme Color ' + error.message);
        }
    },

    sendNotificationToUser: async function(data) {
        try {
            if (data.notifType != undefined && data.notifType != "" && data.notifType != null && data.notifCode != undefined && data.notifCode != "" && data.notifCode != null) {
                let notifDetails = await Evolve.App.Services.Common.SrvCommon.getNotifDetails(data.notifType, data.notifCode)
                let EvolveNotif_ID = null;

                if (notifDetails.rowsAffected > 0) {

                    EvolveNotif_ID = notifDetails.recordset[0].EvolveNotif_ID
                }


                if (notifDetails instanceof Error) {

                    return 1

                } else {

                    if (data.notifType == 'TRAVEL' || data.notifType == 'REQUEST') {
                        if (data.headUserId != null && data.headUserId != undefined && data.headUserId != '') {

                            let loggedUserDetails = await Evolve.App.Services.Common.SrvCommon.getUserDetails(data.loggedUserID)

                            loggedUserDetails = loggedUserDetails.recordset[0];

                            let headUserDetails = await Evolve.App.Services.Common.SrvCommon.getUserDetails(data.headUserId)
                            headUserDetails = headUserDetails.recordset[0];

                            let notifMsg = notifDetails.recordset[0].EvolveNotif_Msg + ''

                            if ((notifMsg.toLowerCase()).includes("{user name}")) {

                                notifMsg = (notifMsg.toLowerCase()).replace("{user name}", loggedUserDetails.EvolveUser_Name + '')

                            }

                            if (data.EvolveTravelReq_id != undefined && data.EvolveTravelReq_id != "" && data.EvolveTravelReq_id != null) {


                                if ((notifMsg.toLowerCase()).includes("{id}")) {

                                    notifMsg = (notifMsg.toLowerCase()).replace("{id}", data.EvolveTravelReq_id + '')



                                }
                            }
                            let serverKey = 'AAAADiw4ZBA:APA91bGV2avgDoJF0otzoWix8BjCHGNmlyCGSjboqbHZan4YrhCyz-xNkxyXDMi_ekaDwULDmUH7nfpndq6FXRsk1v5TO33Lym3oBmHRvGOQLpIse2ZH6HQM4Dao2uLDR8-Wes3KBkNj';
                            let fcm = new Evolve.FCM(serverKey);

                            let message = { "notification": { "body": notifMsg, "title": 'Travel Request' }, "priority": "high", "data": { "click_action": "FLUTTER_NOTIFICATION_CLICK", "id": "1", "status": "done" }, "to": headUserDetails.EvolveUser_DeviceID, 'notifType': data.notifType, 'notifCode': data.notifCode }

                            let notDetail = {

                                EvolveNotif_ID: EvolveNotif_ID,
                                EvolveTravelReq_id: data.EvolveTravelReq_id,
                                EvolveUser_ID: headUserDetails.EvolveUser_ID,
                                EvolveNotifDetails_Read: 0,
                                message: message,
                                notifType: data.notifType,
                                notifCode: data.notifCode

                            }
                            Evolve.App.Services.Common.SrvCommon.addNotifDetails(notDetail)

                            fcm.send(message, function(err, response) {
                                if (err) {
                                    console.log(err)
                                        // return 0
                                }
                            });

                            if (data.sentToLoggedUser == true) {
                                message = { "notification": { "body": (data.notifType == 'REQUEST' && data.notifCode == 'RAISE') ? 'You have raised a new travel request ' + data.EvolveTravelReq_id : (data.notifType == 'TRAVEL' && data.notifCode == 'TRIPCANCELLED') ? ' You have successfully cancelled trip ' + data.EvolveTravelReq_id : (data.notifType == 'TRAVEL' && data.notifCode == 'TRIPSTARTED') ? 'You have started a trip ' + data.EvolveTravelReq_id + '. Have a safe trip.' : notifMsg, "title": 'Travel Request' }, "priority": "high", "data": { "click_action": "FLUTTER_NOTIFICATION_CLICK", "id": "1", "status": "done" }, "to": loggedUserDetails.EvolveUser_DeviceID, 'notifType': data.notifType, 'notifCode': data.notifCode }

                                fcm.send(message, function(err, response) {
                                    if (err) {
                                        console.log(err)
                                    }
                                })
                                notDetail = {

                                    EvolveNotif_ID: EvolveNotif_ID,
                                    EvolveTravelReq_id: data.EvolveTravelReq_id,
                                    EvolveUser_ID: loggedUserDetails.EvolveUser_ID,
                                    EvolveNotifDetails_Read: 0,
                                    message: message,
                                    notifType: data.notifType,
                                    notifCode: data.notifCode


                                }
                                Evolve.App.Services.Common.SrvCommon.addNotifDetails(notDetail)
                            }

                        }

                    } else if (data.notifType == 'ADDHISTORY') {


                        let loggedUserDetails = await Evolve.App.Services.Common.SrvCommon.getUserDetails(data.loggedUserID)

                        loggedUserDetails = loggedUserDetails.recordset[0];
                        let serverKey = 'AAAADiw4ZBA:APA91bGV2avgDoJF0otzoWix8BjCHGNmlyCGSjboqbHZan4YrhCyz-xNkxyXDMi_ekaDwULDmUH7nfpndq6FXRsk1v5TO33Lym3oBmHRvGOQLpIse2ZH6HQM4Dao2uLDR8-Wes3KBkNj';
                        let fcm = new Evolve.FCM(serverKey);


                        let message = { "notification": { "body": 'Travel History Added Successfully', "title": 'Travel History' }, "priority": "high", "data": { "click_action": "FLUTTER_NOTIFICATION_CLICK", "id": "1", "status": "done" }, "to": loggedUserDetails.EvolveUser_DeviceID, 'notifType': data.notifType, 'notifCode': data.notifCode }

                        fcm.send(message, function(err, response) {
                            if (err) {
                                console.log(err)
                                    // return 0
                            }
                        })
                        let notifDetails = {

                            EvolveNotif_ID: EvolveNotif_ID,
                            EvolveTravelReq_id: data.EvolveTravelReq_id,
                            EvolveUser_ID: loggedUserDetails.EvolveUser_ID,
                            EvolveNotifDetails_Read: 0,
                            message: message,
                        }
                        Evolve.App.Services.Common.SrvCommon.addNotifDetails(notifDetails)


                    } else if (data.notifType == 'REMINDER') {

                        let loggedUserDetails = await Evolve.App.Services.Common.SrvCommon.getUserDetails(data.loggedUserID)
                        loggedUserDetails = loggedUserDetails.recordset[0];
                        let notifMsg = notifDetails.recordset[0].EvolveNotif_Msg + ''

                        if ((notifMsg.toLowerCase()).includes("{user name}")) {

                            notifMsg = (notifMsg.toLowerCase()).replace("{user name}", loggedUserDetails.EvolveUser_Name + '')

                        }

                        if (data.EvolveTravelReq_id != undefined && data.EvolveTravelReq_id != "" && data.EvolveTravelReq_id != null) {

                            if ((notifMsg.toLowerCase()).includes("{id}")) {

                                notifMsg = (notifMsg.toLowerCase()).replace("{id}", data.EvolveTravelReq_id + '')

                            }
                        }
                        let serverKey = 'AAAADiw4ZBA:APA91bGV2avgDoJF0otzoWix8BjCHGNmlyCGSjboqbHZan4YrhCyz-xNkxyXDMi_ekaDwULDmUH7nfpndq6FXRsk1v5TO33Lym3oBmHRvGOQLpIse2ZH6HQM4Dao2uLDR8-Wes3KBkNj';
                        let fcm = new Evolve.FCM(serverKey);

                        let message = { "notification": { "body": notifMsg, "title": 'Reminder' }, "priority": "high", "data": { "click_action": "FLUTTER_NOTIFICATION_CLICK", "id": "1", "status": "done" }, "to": loggedUserDetails.EvolveUser_DeviceID, 'notifType': data.notifType, 'notifCode': data.notifCode }

                        fcm.send(message, function(err, response) {
                            if (err) {
                                console.log(err)
                                    // return 0
                            }
                        })
                        let notDetail = {

                            EvolveNotif_ID: EvolveNotif_ID,
                            EvolveTravelReq_id: data.EvolveTravelReq_id,
                            EvolveUser_ID: loggedUserDetails.EvolveUser_ID,
                            EvolveNotifDetails_Read: 0,
                            message: message,
                            notifType: data.notifType,
                            notifCode: data.notifCode

                        }
                        Evolve.App.Services.Common.SrvCommon.addNotifDetails(notDetail)

                    } else if (data.notifType == 'HEADNOTIF') {

                        if (data.loggedUserID != null && data.headUserId != null) {
                            let loggedUserDetails = await Evolve.App.Services.Common.SrvCommon.getUserDetails(data.loggedUserID)
                            loggedUserDetails = loggedUserDetails.recordset[0];

                            let headUserDetails = await Evolve.App.Services.Common.SrvCommon.getUserDetails(data.headUserId)
                            headUserDetails = headUserDetails.recordset[0];


                            let notifMsg = data.notifCode == 'APPROVED' ? 'Trip ' + data.EvolveTravelReq_id + ' was approved by ' + loggedUserDetails.EvolveUser_Name + ' and is now awaiting your approval.' : 'Approver ' + loggedUserDetails.EvolveUser_Name + ' has sent back trip request ' + data.EvolveTravelReq_id + ' back to you for further review. Click here to review and take action. '

                            let serverKey = 'AAAADiw4ZBA:APA91bGV2avgDoJF0otzoWix8BjCHGNmlyCGSjboqbHZan4YrhCyz-xNkxyXDMi_ekaDwULDmUH7nfpndq6FXRsk1v5TO33Lym3oBmHRvGOQLpIse2ZH6HQM4Dao2uLDR8-Wes3KBkNj';
                            let fcm = new Evolve.FCM(serverKey);

                            let message = { "notification": { "body": notifMsg, "title": 'Travel Request' }, "priority": "high", "data": { "click_action": "FLUTTER_NOTIFICATION_CLICK", "id": "1", "status": "done" }, "to": headUserDetails.EvolveUser_DeviceID, 'notifType': data.notifType, 'notifCode': data.notifCode }

                            fcm.send(message, function(err, response) {
                                if (err) {
                                    console.log(err)
                                        // return 0
                                }
                            })
                            let notDetail = {

                                EvolveNotif_ID: EvolveNotif_ID,
                                EvolveTravelReq_id: data.EvolveTravelReq_id,
                                EvolveUser_ID: headUserDetails.EvolveUser_ID,
                                EvolveNotifDetails_Read: 0,
                                message: message,
                                notifType: data.notifType,
                                notifCode: data.notifCode

                            }
                            Evolve.App.Services.Common.SrvCommon.addNotifDetails(notDetail)
                        }

                    } else if (data.notifType == 'APROVAL') {

                        let loggedUserDetails = await Evolve.App.Services.Common.SrvCommon.getUserDetails(data.loggedUserID)

                        loggedUserDetails = loggedUserDetails.recordset[0];

                        let headUserDetails = await Evolve.App.Services.Common.SrvCommon.getUserDetails(data.headUserId)
                        headUserDetails = headUserDetails.recordset[0];

                        let notifMsg;
                        if (data.isHeadSend == false) {
                            notifMsg = notifDetails.recordset[0].EvolveNotif_Msg + ''

                            if ((notifMsg.toLowerCase()).includes("{user name}")) {

                                notifMsg = (notifMsg.toLowerCase()).replace("{user name}", headUserDetails.EvolveUser_Name + '')

                            }

                            if (data.EvolveTravelReq_id != undefined && data.EvolveTravelReq_id != "" && data.EvolveTravelReq_id != null) {

                                if ((notifMsg.toLowerCase()).includes("{id}")) {

                                    notifMsg = (notifMsg.toLowerCase()).replace("{id}", data.EvolveTravelReq_id + '')
                                }
                            }

                        } else {

                            if (data.notifCode == 'APPROVED') {
                                notifMsg = 'Approver ' + loggedUserDetails.EvolveUser_Name + ' has rejected the travel request ' + data.EvolveTravelReq_id + '. Click here to review why? ';
                            } else if (data.notifCode == 'JOIN') {


                                let reqUserDetails = await Evolve.App.Services.Common.SrvCommon.getUserDetails(data.reqUserId)

                                reqUserDetails = reqUserDetails.recordset[0];

                                notifMsg = 'Medic ' + loggedUserDetails.EvolveUser_Name + ' has reviewed travel ' + data.EvolveTravelReq_id + ' and recommended  requester ' + reqUserDetails.EvolveUser_Name + ' to JOIN. ';
                            } else if (data.notifCode == 'JOIN') {


                                let reqUserDetails = await Evolve.App.Services.Common.SrvCommon.getUserDetails(data.reqUserId)

                                reqUserDetails = reqUserDetails.recordset[0];

                                notifMsg = 'Medic ' + loggedUserDetails.EvolveUser_Name + ' has reviewed travel ' + data.EvolveTravelReq_id + ' and recommended  requester ' + reqUserDetails.EvolveUser_Name + ' to home QUARANTINE for ' + data.quarDays + ' days. ';


                            } else if (data.notifCode == 'COVIDTEST') {


                                let reqUserDetails = await Evolve.App.Services.Common.SrvCommon.getUserDetails(data.reqUserId)

                                reqUserDetails = reqUserDetails.recordset[0];

                                notifMsg = 'Medic ' + loggedUserDetails.EvolveUser_Name + ' has reviewed travel ' + data.EvolveTravelReq_id + ' and recommended  requester ' + reqUserDetails.EvolveUser_Name + ' to take a COVID TEST and upload the results asap'
                            } else if (data.notifCode == 'COVIDTESTUPLOAD') {

                                notifMsg = loggedUserDetails.EvolveUser_Name + ' has uploaded covid test results for travel request ' + data.EvolveTravelReq_id + '. Click here to review and take action on it.'
                            } else if (data.notifCode == 'TRIPENDED') {

                                notifMsg = loggedUserDetails.EvolveUser_Name + ' has ended a trip ' + data.EvolveTravelReq_id + '. Please review and take an action. '

                            }

                        }

                        let serverKey = 'AAAADiw4ZBA:APA91bGV2avgDoJF0otzoWix8BjCHGNmlyCGSjboqbHZan4YrhCyz-xNkxyXDMi_ekaDwULDmUH7nfpndq6FXRsk1v5TO33Lym3oBmHRvGOQLpIse2ZH6HQM4Dao2uLDR8-Wes3KBkNj';
                        let fcm = new Evolve.FCM(serverKey);


                        let message = { "notification": { "body": notifMsg, "title": 'Travel Request' }, "priority": "high", "data": { "click_action": "FLUTTER_NOTIFICATION_CLICK", "id": "1", "status": "done" }, "to": data.isHeadSend == false ? loggedUserDetails.EvolveUser_DeviceID : headUserDetails.EvolveUser_DeviceID, 'notifType': data.notifType, 'notifCode': data.notifCode }

                        fcm.send(message, function(err, response) {
                            if (err) {
                                console.log(err)
                            }
                        });

                        let notDetail = {

                            EvolveNotif_ID: EvolveNotif_ID,
                            EvolveTravelReq_id: data.EvolveTravelReq_id,
                            EvolveUser_ID: data.isHeadSend == false ? loggedUserDetails.EvolveUser_ID : headUserDetails.EvolveUser_ID,
                            EvolveNotifDetails_Read: 0,
                            message: message,
                            notifType: data.notifType,
                            notifCode: data.notifCode

                        }
                        Evolve.App.Services.Common.SrvCommon.addNotifDetails(notDetail)
                    }
                }
            }

            return 1

        } catch (error) {
            Evolve.Log.error('Error in While send notifiction ' + error.message);
        }
    },

    getApprovalMatrixRootDetails: async function(EvolveApprovalMatrix_Type) {
        try {
            let error = false;
            let rootList = [];
            let details = {

                EvolveApprovalMatrix_Type: EvolveApprovalMatrix_Type,
                EvolveApprovalMatrixIndex_Seq: 1,
            }
            let getMatrixList = await Evolve.App.Services.Common.SrvCommon.getSalesQouteMatrixList(details);

            if (getMatrixList instanceof Error) {

                error = true;

            } else {

                let matrixList = getMatrixList.recordset;

                for (let i = 0; i < matrixList.length; i++) {
                    if (error == false) {
                        details.EvolveApprovalMatrix_ID = matrixList[i].EvolveApprovalMatrix_ID;
                        let matrixDetails = await Evolve.App.Services.Common.SrvCommon.getMatrixDetailsList(details);
                        if (matrixDetails instanceof Error) {
                            error = true;
                        } else {
                            let array = matrixDetails.recordset;
                            let currentField;
                            let currentTable;

                            let resultArray = [];
                            let arrayIndexData = {
                                tableField: '',
                                isMandatory: '',
                                case: '',
                                caseValue: '',
                                tableName: '',
                            }

                            for (let i = 0; i < array.length; i++) {


                                if (array[i].EvolveApprovalMatrixDetails_Key == 'field') {

                                    currentField = array[i].EvolveApprovalMatrixDetails_Value;



                                } else if (array[i].EvolveApprovalMatrixDetails_Key == 'case') {

                                    arrayIndexData.isMandatory = array[i].EvolveApprovalMatrixDetails_IsMandatory == 1 ? true : false
                                    arrayIndexData.case = array[i].EvolveApprovalMatrixDetails_Value



                                } else if (array[i].EvolveApprovalMatrixDetails_Key == 'value') {

                                    arrayIndexData.caseValue = array[i].EvolveApprovalMatrixDetails_Value


                                } else if (array[i].EvolveApprovalMatrixDetails_Key == 'table') {

                                    currentTable = array[i].EvolveApprovalMatrixDetails_Value
                                }
                                if (currentField != '' && currentField != null && currentField != undefined) {

                                    arrayIndexData.tableField = currentField;


                                }
                                if (currentTable != '' && currentTable != null && currentTable != undefined) {

                                    arrayIndexData.tableName = currentTable;


                                }

                                if (i == array.length - 1) {}

                                if (arrayIndexData.tableField !== '' && arrayIndexData.isMandatory !== '' && arrayIndexData.case !== '' && arrayIndexData.caseValue !== '' && arrayIndexData.tableName !== '') {
                                    resultArray.push({

                                        tableField: arrayIndexData.tableField,
                                        isMandatory: arrayIndexData.isMandatory,
                                        case: arrayIndexData.case,
                                        caseValue: arrayIndexData.caseValue,
                                        tableName: arrayIndexData.tableName
                                    })

                                    arrayIndexData.tableField = '';
                                    arrayIndexData.isMandatory = '';
                                    arrayIndexData.case = '';
                                    arrayIndexData.caseValue = '';
                                    arrayIndexData.tableName = '';

                                }

                            }

                            rootList.push({

                                EvolveApprovalMatrix_ID: matrixList[i].EvolveApprovalMatrix_ID,
                                roolList: resultArray

                            })

                        }
                    }
                }
            }


            return rootList;

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Error While Get Matrix Root Details" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Error While Get Matrix Root Details" + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    mailSend: async function(data) {
        console.log("############################### Evolve Doa Email Send ###############################");
        try {

            let mailList;
            let toMailId = '';
            let ccMailId = '';

            let sqetails;
            let emailBody;
            let subject = '';
            let sqCreatorMailList = [];
            let previousApproverList = [];


            if (data.isSendBack == true || data.isRejected == true) {


                mailList = await Evolve.App.Services.Common.SrvCommon.senBackRequestDetails(data);


            } else {

                sqCreatorMailList = await Evolve.App.Services.Common.SrvCommon.senBackRequestDetails(data);
                mailList = await Evolve.App.Services.Common.SrvCommon.getUserDetailsToMail(data);


            }
            mailList = mailList.recordset;
            sqCreatorMailList = sqCreatorMailList.recordset;

            if (mailList.length > 0) {
                toMailId = '';


                for (let i = 0; i < mailList.length; i++) {

                    toMailId = (toMailId == '') ? toMailId + mailList[i].EvolveUser_EmailID : toMailId + ',' + mailList[i].EvolveUser_EmailID

                }

                sqetails = mailList[0];
                let processDetails = {
                    EvolveApprovalProcess_PrimaryID: sqetails.EvolveSalesQuote_ID,
                    EvolveApprovalMatrix_Type: 'SALESQUOTE'
                }
                let aprovalHistory = await Evolve.App.Services.Common.SrvCommon.getApprovalProcessHistory(processDetails);

                aprovalHistory = aprovalHistory.recordset;

                let approvalHistoryTable = '';

                if (aprovalHistory.length > 0) {

                    approvalHistoryTable += `
          <p>\n <table style ="border: 1px solid black;">
          <thead>
          <tr>
          <td colspan="5" style ="border: 1px solid black;">
          
          <center><b> APPROVAL PROCESS HISTORY </b></center>
          
          </td>
          
          </tr>
          <th style ="border: 1px solid black;"> ACTION </th>
          <th style ="border: 1px solid black;"> USER NAME </th>        
          <th style ="border: 1px solid black;"> REMARKS </th>        
          <th style ="border: 1px solid black;"> DATE-TIME </th>        
          </thead>
          <tbody>
          `
                    for (let i = 0; i < aprovalHistory.length; i++) {
                        approvalHistoryTable += `
            <tr>
            <td style ="border: 1px solid black;"> ${aprovalHistory[i].EvolveApprovalProcessDetails_Status} BY  </td>
            <td style ="border: 1px solid black;"> ${aprovalHistory[i].EvolveUser_Name} </td>
            <td style ="border: 1px solid black;"> ${aprovalHistory[i].EvolveApprovalProcessDetails_Remarks} </td>
            <td style ="border: 1px solid black;"> ${aprovalHistory[i].date}-${aprovalHistory[i].time} </td>
            </tr>
            `
                    }
                    approvalHistoryTable += `
          </tbody>
          </table> \n
          `
                }


                let documentList = (sqetails.EvolveSalesQuote_AttachedDocument == null || sqetails.EvolveSalesQuote_AttachedDocument == '') ? [] : JSON.parse(sqetails.EvolveSalesQuote_AttachedDocument);
                let attachments = [];

                for (let i = 0; i < documentList.length; i++) {
                    if (Evolve.Fs.existsSync(documentList[i].filePath)) {
                        let fileData = Evolve.Fs.readFileSync(documentList[i].filePath);
                        attachments.push({
                            filename: documentList[i].fileName, // Change Name of File as you like
                            content: fileData
                        })

                    }
                }



                let salesPersonList = JSON.parse(sqetails.EvolveSalesQuote_SalesPerson)

                for (let i = 0; i < salesPersonList.length; i++) {

                    ccMailId = (ccMailId == '') ? ccMailId + (salesPersonList[i].email == '' || salesPersonList[i].email == undefined || salesPersonList[i].email == null ? '' : salesPersonList[i].email) : ccMailId + ',' + (salesPersonList[i].email == '' || salesPersonList[i].email == undefined || salesPersonList[i].email == null ? '' : salesPersonList[i].email)

                }


                sqetails.EvolveSalesQuote_TotalCustomerPrice = (sqetails.EvolveSalesQuote_TotalCustomerPrice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

                sqetails.EvolveSalesQuote_ProfitMargin = (sqetails.EvolveSalesQuote_ProfitMargin).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

                sqetails.EvolveSalesQuote_CurrentOutstanding = sqetails.EvolveSalesQuote_CurrentOutstanding == '' || sqetails.EvolveSalesQuote_CurrentOutstanding == undefined || sqetails.EvolveSalesQuote_CurrentOutstanding == null ? 0 : sqetails.EvolveSalesQuote_CurrentOutstanding
                sqetails.EvolveSalesQuote_ThirtyOutstanding = sqetails.EvolveSalesQuote_ThirtyOutstanding == '' || sqetails.EvolveSalesQuote_ThirtyOutstanding == undefined || sqetails.EvolveSalesQuote_ThirtyOutstanding == null ? 0 : sqetails.EvolveSalesQuote_ThirtyOutstanding
                sqetails.EvolveSalesQuote_SixtyOutstanding = sqetails.EvolveSalesQuote_SixtyOutstanding == '' || sqetails.EvolveSalesQuote_SixtyOutstanding == undefined || sqetails.EvolveSalesQuote_SixtyOutstanding == null ? 0 : sqetails.EvolveSalesQuote_SixtyOutstanding
                sqetails.EvolveSalesQuote_NinetyOutstanding = sqetails.EvolveSalesQuote_NinetyOutstanding == '' || sqetails.EvolveSalesQuote_NinetyOutstanding == undefined || sqetails.EvolveSalesQuote_NinetyOutstanding == null ? 0 : sqetails.EvolveSalesQuote_NinetyOutstanding

                sqetails.EvolveSalesQuote_OneEightyOutstanding = sqetails.EvolveSalesQuote_OneEightyOutstanding == '' || sqetails.EvolveSalesQuote_OneEightyOutstanding == undefined || sqetails.EvolveSalesQuote_OneEightyOutstanding == null ? 0 : sqetails.EvolveSalesQuote_OneEightyOutstanding

                sqetails.totalOts = ((parseFloat(parseFloat(sqetails.EvolveSalesQuote_CurrentOutstanding) + parseFloat(sqetails.EvolveSalesQuote_ThirtyOutstanding) + parseFloat(sqetails.EvolveSalesQuote_SixtyOutstanding) + parseFloat(sqetails.EvolveSalesQuote_NinetyOutstanding) + parseFloat(sqetails.EvolveSalesQuote_OneEightyOutstanding)).toFixed(2)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));


                sqetails.EvolveSalesQuote_CurrentOutstanding = ((parseFloat(sqetails.EvolveSalesQuote_CurrentOutstanding).toFixed(2)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                sqetails.EvolveSalesQuote_ThirtyOutstanding = (parseFloat(sqetails.EvolveSalesQuote_ThirtyOutstanding).toFixed(2)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

                sqetails.EvolveSalesQuote_NinetyOutstanding = (parseFloat(sqetails.EvolveSalesQuote_NinetyOutstanding).toFixed(2)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");


                sqetails.EvolveSalesQuote_OneEightyOutstanding = (parseFloat(sqetails.EvolveSalesQuote_OneEightyOutstanding).toFixed(2)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");


                sqetails.EvolveSalesQuote_SixtyOutstanding = (parseFloat(sqetails.EvolveSalesQuote_SixtyOutstanding).toFixed(2)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");


                if (data.isSendBack == true) {


                    subject = "REQUEST SENT BACK FOR SALES QUOTE NO : " + sqetails.EvolveSalesQuote_Serial + "-" + sqetails.EvolveCustomer_Name;


                    emailBody = `<p>Dear Sir , <br> <pre> Your sales quote has been sent back to you.Plaese review the details and re-submit it.</pre> </p> <p> <b>SALES QUOTE NUMBER :</b> ${sqetails.EvolveSalesQuote_Serial}  <br></br> <b>CUSTOMER NAME :</b> ${sqetails.EvolveCustomer_Name} <br></br> <b>TOTAL CUSTOMER PRICE :</b> ${sqetails.EvolveSalesQuote_TotalCustomerPrice}  <br></br> <b>PROFIT MARGIN :</b> ${sqetails.EvolveSalesQuote_ProfitMargin} %`


                } else if (data.isRejected == true) {


                    subject = "REQUEST REJECTED FOR SALES QUOTE NO : " + sqetails.EvolveSalesQuote_Serial + "-" + sqetails.EvolveCustomer_Name;


                    emailBody = `<p>Dear Sir , <br> <pre> Your sales quote request has been rejected.Plaese see approval history for more details.</pre> </p> <p> <b>SALES QUOTE NUMBER :</b> ${sqetails.EvolveSalesQuote_Serial}  <br></br> <b>CUSTOMER NAME :</b> ${sqetails.EvolveCustomer_Name} <br></br> <b>TOTAL CUSTOMER PRICE :</b> ${sqetails.EvolveSalesQuote_TotalCustomerPrice}  <br></br> <b>PROFIT MARGIN :</b> ${sqetails.EvolveSalesQuote_ProfitMargin} %`


                } else {

                    subject = "REQUEST FOR APPROVE SALES QUOTE NO : " + sqetails.EvolveSalesQuote_Serial + "-" + sqetails.EvolveCustomer_Name;

                    emailBody = `<p>Dear Sir , <br> <pre> The following sales quote has come for your approval.</pre> </p> <p> <b>SALES QUOTE NUMBER :</b> ${sqetails.EvolveSalesQuote_Serial}  <br></br> <b>CUSTOMER NAME :</b> ${sqetails.EvolveCustomer_Name} <br></br> <b>TOTAL CUSTOMER PRICE :</b> ${sqetails.EvolveSalesQuote_TotalCustomerPrice}  <br></br> <b>PROFIT MARGIN :</b> ${sqetails.EvolveSalesQuote_ProfitMargin} %`
                }

                emailBody += `<br></br> <b>CREDIT TERMS :</b> ${sqetails.EvolveCreditTerms_Code} (${sqetails.EvolveCreditTerms_Description})`

                emailBody += `<br></br> <b>ADDITIONAL REMARKS :</b> ${sqetails.EvolveSalesQuote_Comments}</p>`



                emailBody += `<table style ="border: 1px solid black;">
      
      <thead>

      <th style ="border: 1px solid black;">CURRENT<br></br> OUTSTANDING
      </th>
      <th style ="border: 1px solid black;">1-30 DAYS <br></br> OUTSTANDING
      </th>
      <th style ="border: 1px solid black;">30-60 DAYS <br></br> OUTSTANDING
      </th>
      <th style ="border: 1px solid black;">60-90 DAYS <br></br> OUTSTANDING
      </th>
      <th style ="border: 1px solid black;">90-180 DAYS <br></br> OUTSTANDING
      </th>
      <th style ="border: 1px solid black;">TOTAL <br></br> OUTSTANDING
      </th>
      </thead>
      <tbody>

      <tr>
      <td style ="border: 1px solid black;">${sqetails.EvolveSalesQuote_CurrentOutstanding == 0 ? '-' : sqetails.EvolveSalesQuote_CurrentOutstanding}</td>
      <td style ="border: 1px solid black;">${sqetails.EvolveSalesQuote_ThirtyOutstanding == 0 ? '-' : sqetails.EvolveSalesQuote_ThirtyOutstanding}</td>
      <td style ="border: 1px solid black;">${sqetails.EvolveSalesQuote_SixtyOutstanding == 0 ? '-' : sqetails.EvolveSalesQuote_SixtyOutstanding}</td>
      <td style ="border: 1px solid black;">${sqetails.EvolveSalesQuote_NinetyOutstanding == 0 ? '-' : sqetails.EvolveSalesQuote_NinetyOutstanding}</td>
      <td style ="border: 1px solid black;">${sqetails.EvolveSalesQuote_OneEightyOutstanding == 0 ? '-' : sqetails.EvolveSalesQuote_OneEightyOutstanding}</td>
      <td style ="border: 1px solid black;">${sqetails.totalOts == 0 ? '-' : sqetails.totalOts}</td>

      
      </tr>
      
      
      </tbody>
      
      
      
      </table>`

                emailBody += approvalHistoryTable;
                if ((!data.isSendBack) || (!data.isRejected)) {

                    emailBody += `<p><br></br> <b>CLICK HERE FOR ACTION :</b> <href>${Evolve.Config.DOAMYAPPROVALURL}</href></p>`

                }
                // emailBody += `<p><br></br> <b>CLICK HERE FOR ACTION :</b> <href>${Evolve.Config.DOAMYAPPROVALURL}</href></p>`
                let transporter = '';
                if (Evolve.Config.DOAEMAILPASSWORD == 'NA') {
                    transporter = Evolve.Mailer.createTransport({
                        host: Evolve.Config.DOAEMAILHOST,
                        port: Evolve.Config.DOAEMAILPORT,
                        secureConnection: false, // Special Added for Office36
                        //secure: false, // true for 465, false for other ports
                        tls: {
                            rejectUnauthorized: false,
                            ciphers: 'SSLv3' // Special Added for Office36
                        },
                    });
                } else {
                    transporter = Evolve.Mailer.createTransport({
                        host: Evolve.Config.DOAEMAILHOST,
                        port: Evolve.Config.DOAEMAILPORT,
                        secureConnection: false, // Special Added for Office36
                        //secure: false, // true for 465, false for other ports
                        tls: {
                            rejectUnauthorized: false,
                            ciphers: 'SSLv3' // Special Added for Office36
                        },
                        auth: { /* Commit it when use port other then 465 */
                            user: Evolve.Config.DOAEMAILUSERNAME, // generated ethereal user
                            pass: Evolve.Config.DOAEMAILPASSWORD, // generated ethereal password
                        },
                    });
                }


                try {
                    // info = {};
                    let info = await transporter.sendMail({
                        from: Evolve.Config.DOAEMAILUSERNAME, // sender address
                        secure: (Evolve.Config.DOAEMAILSECURE == 0) ? false : true, // 
                        to: toMailId, // list of receivers
                        cc: ccMailId,
                        subject: subject, // Subject line
                        //text: "Hello world?", // plain text body
                        html: emailBody, // html body
                        attachments: attachments,
                    });



                    console.log("info>>>>>", info)
                } catch (error) {
                    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>HHHHH>>>>>>>>>>" + error.message);

                }
            }

            if (sqCreatorMailList.length > 0 && data.isSubmited == false) {

                toMailId = '';


                for (let i = 0; i < sqCreatorMailList.length; i++) {

                    toMailId = (toMailId == '') ? toMailId + sqCreatorMailList[i].EvolveUser_EmailID : toMailId + ',' + sqCreatorMailList[i].EvolveUser_EmailID

                }

                sqetails = sqCreatorMailList[0];

                let processDetails = {
                    EvolveApprovalProcess_PrimaryID: sqetails.EvolveSalesQuote_ID,
                    EvolveApprovalMatrix_Type: 'SALESQUOTE'
                }
                let aprovalHistory = await Evolve.App.Services.Common.SrvCommon.getApprovalProcessHistory(processDetails);

                aprovalHistory = aprovalHistory.recordset;

                let approvalHistoryTable = '';

                if (aprovalHistory.length > 0) {

                    approvalHistoryTable += `
          <p>\n <table style ="border: 1px solid black;">
          <thead>
          <tr>
          <td colspan="5" style ="border: 1px solid black;">
          
          <center><b> APPROVAL PROCESS HISTORY </b></center>
          
          </td>
          
          </tr>
          <th style ="border: 1px solid black;"> ACTION </th>
          <th style ="border: 1px solid black;"> USER NAME </th>        
          <th style ="border: 1px solid black;"> REMARKS </th>        
          <th style ="border: 1px solid black;"> DATE-TIME </th>        
          </thead>
          <tbody>
          `
                    for (let i = 0; i < aprovalHistory.length; i++) {
                        approvalHistoryTable += `
            <tr>
            <td style ="border: 1px solid black;"> ${aprovalHistory[i].EvolveApprovalProcessDetails_Status} BY  </td>
            <td style ="border: 1px solid black;"> ${aprovalHistory[i].EvolveUser_Name} </td>
            <td style ="border: 1px solid black;"> ${aprovalHistory[i].EvolveApprovalProcessDetails_Remarks} </td>
            <td style ="border: 1px solid black;"> ${aprovalHistory[i].date}-${aprovalHistory[i].time} </td>
            </tr>
            `
                    }
                    approvalHistoryTable += `
          </tbody>
          </table> \n
          `
                }

                let documentList = (sqetails.EvolveSalesQuote_AttachedDocument == null || sqetails.EvolveSalesQuote_AttachedDocument == '') ? [] : JSON.parse(sqetails.EvolveSalesQuote_AttachedDocument);
                let attachments = [];

                for (let i = 0; i < documentList.length; i++) {
                    if (Evolve.Fs.existsSync(documentList[i].filePath)) {
                        let fileData = Evolve.Fs.readFileSync(documentList[i].filePath);
                        attachments.push({
                            filename: documentList[i].fileName, // Change Name of File as you like
                            content: fileData
                        })

                    }
                }


                let salesPersonList = JSON.parse(sqetails.EvolveSalesQuote_SalesPerson)

                for (let i = 0; i < salesPersonList.length; i++) {

                    ccMailId = (ccMailId == '') ? ccMailId + (salesPersonList[i].email == '' || salesPersonList[i].email == undefined || salesPersonList[i].email == null ? '' : salesPersonList[i].email) : ccMailId + ',' + (salesPersonList[i].email == '' || salesPersonList[i].email == undefined || salesPersonList[i].email == null ? '' : salesPersonList[i].email)

                }

                let lastApproveretails = await Evolve.App.Services.Common.SrvCommon.getLastApproverDetails(data);

                let approverName = lastApproveretails.recordset[0].EvolveUser_Name + "(" + lastApproveretails.recordset[0].EvolveUser_EmailID + ")"
                sqetails.EvolveSalesQuote_TotalCustomerPrice = (sqetails.EvolveSalesQuote_TotalCustomerPrice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

                sqetails.EvolveSalesQuote_ProfitMargin = (sqetails.EvolveSalesQuote_ProfitMargin).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");



                sqetails.EvolveSalesQuote_CurrentOutstanding = sqetails.EvolveSalesQuote_CurrentOutstanding == '' || sqetails.EvolveSalesQuote_CurrentOutstanding == undefined || sqetails.EvolveSalesQuote_CurrentOutstanding == null ? 0 : sqetails.EvolveSalesQuote_CurrentOutstanding
                sqetails.EvolveSalesQuote_ThirtyOutstanding = sqetails.EvolveSalesQuote_ThirtyOutstanding == '' || sqetails.EvolveSalesQuote_ThirtyOutstanding == undefined || sqetails.EvolveSalesQuote_ThirtyOutstanding == null ? 0 : sqetails.EvolveSalesQuote_ThirtyOutstanding
                sqetails.EvolveSalesQuote_SixtyOutstanding = sqetails.EvolveSalesQuote_SixtyOutstanding == '' || sqetails.EvolveSalesQuote_SixtyOutstanding == undefined || sqetails.EvolveSalesQuote_SixtyOutstanding == null ? 0 : sqetails.EvolveSalesQuote_SixtyOutstanding
                sqetails.EvolveSalesQuote_NinetyOutstanding = sqetails.EvolveSalesQuote_NinetyOutstanding == '' || sqetails.EvolveSalesQuote_NinetyOutstanding == undefined || sqetails.EvolveSalesQuote_NinetyOutstanding == null ? 0 : sqetails.EvolveSalesQuote_NinetyOutstanding

                sqetails.EvolveSalesQuote_OneEightyOutstanding = sqetails.EvolveSalesQuote_OneEightyOutstanding == '' || sqetails.EvolveSalesQuote_OneEightyOutstanding == undefined || sqetails.EvolveSalesQuote_OneEightyOutstanding == null ? 0 : sqetails.EvolveSalesQuote_OneEightyOutstanding


                sqetails.totalOts = ((parseFloat(parseFloat(sqetails.EvolveSalesQuote_CurrentOutstanding) + parseFloat(sqetails.EvolveSalesQuote_ThirtyOutstanding) + parseFloat(sqetails.EvolveSalesQuote_SixtyOutstanding) + parseFloat(sqetails.EvolveSalesQuote_NinetyOutstanding) + parseFloat(sqetails.EvolveSalesQuote_OneEightyOutstanding)).toFixed(2)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));


                sqetails.EvolveSalesQuote_CurrentOutstanding = ((parseFloat(sqetails.EvolveSalesQuote_CurrentOutstanding).toFixed(2)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));

                sqetails.EvolveSalesQuote_ThirtyOutstanding = (parseFloat(sqetails.EvolveSalesQuote_ThirtyOutstanding).toFixed(2)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

                sqetails.EvolveSalesQuote_NinetyOutstanding = (parseFloat(sqetails.EvolveSalesQuote_NinetyOutstanding).toFixed(2)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");


                sqetails.EvolveSalesQuote_OneEightyOutstanding = (parseFloat(sqetails.EvolveSalesQuote_OneEightyOutstanding).toFixed(2)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");


                sqetails.EvolveSalesQuote_SixtyOutstanding = (parseFloat(sqetails.EvolveSalesQuote_SixtyOutstanding).toFixed(2)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

                subject = "REQUEST APPROVED FOR SALES QUOTE NO : " + sqetails.EvolveSalesQuote_Serial + "-" + sqetails.EvolveCustomer_Name;


                emailBody = `<p>Dear Sir , <br> <pre> Your sales quote has been approved by ${approverName}.</pre> </p> <p> <b>SALES QUOTE NUMBER :</b> ${sqetails.EvolveSalesQuote_Serial}  <br></br> <b>CUSTOMER NAME :</b> ${sqetails.EvolveCustomer_Name} <br></br> <b>TOTAL CUSTOMER PRICE :</b> ${sqetails.EvolveSalesQuote_TotalCustomerPrice}  <br></br> <b>PROFIT MARGIN :</b> ${sqetails.EvolveSalesQuote_ProfitMargin} %`


                emailBody += `<br></br> <b>CREDIT TERMS :</b> ${sqetails.EvolveCreditTerms_Code} (${sqetails.EvolveCreditTerms_Description})`
                emailBody += `<br></br> <b>ADDITIONAL REMARKS :</b> ${sqetails.EvolveSalesQuote_Comments}</p>`
                emailBody += `<table style ="border: 1px solid black;">
      
      <thead>

      <th style ="border: 1px solid black;">CURRENT<br></br> OUTSTANDING
      </th>
      <th style ="border: 1px solid black;">1-30 DAYS <br></br> OUTSTANDING
      </th>
      <th style ="border: 1px solid black;">30-60 DAYS <br></br> OUTSTANDING
      </th>
      <th style ="border: 1px solid black;">60-90 DAYS <br></br> OUTSTANDING
      </th>
      <th style ="border: 1px solid black;">90-180 DAYS <br></br> OUTSTANDING
      </th>
      <th style ="border: 1px solid black;">TOTAL <br></br> OUTSTANDING
      </th>
      </thead>
      <tbody>

      <tr>
      <td style ="border: 1px solid black;">${sqetails.EvolveSalesQuote_CurrentOutstanding == 0 ? '-' : sqetails.EvolveSalesQuote_CurrentOutstanding}</td>
      <td style ="border: 1px solid black;">${sqetails.EvolveSalesQuote_ThirtyOutstanding == 0 ? '-' : sqetails.EvolveSalesQuote_ThirtyOutstanding}</td>
      <td style ="border: 1px solid black;">${sqetails.EvolveSalesQuote_SixtyOutstanding == 0 ? '-' : sqetails.EvolveSalesQuote_SixtyOutstanding}</td>
      <td style ="border: 1px solid black;">${sqetails.EvolveSalesQuote_NinetyOutstanding == 0 ? '-' : sqetails.EvolveSalesQuote_NinetyOutstanding}</td>
      <td style ="border: 1px solid black;">${sqetails.EvolveSalesQuote_OneEightyOutstanding == 0 ? '-' : sqetails.EvolveSalesQuote_OneEightyOutstanding}</td>
      <td style ="border: 1px solid black;">${sqetails.totalOts == 0 ? '-' : sqetails.totalOts}</td>

      
      </tr>
      
      
      </tbody>
    
      </table>`

                emailBody += approvalHistoryTable;
                let transporter = '';
                if (Evolve.Config.DOAEMAILPASSWORD == 'NA') {
                    transporter = Evolve.Mailer.createTransport({
                        host: Evolve.Config.DOAEMAILHOST,
                        port: Evolve.Config.DOAEMAILPORT,
                        secureConnection: false, // Special Added for Office36
                        //secure: false, // true for 465, false for other ports
                        tls: {
                            rejectUnauthorized: false,
                            ciphers: 'SSLv3' // Special Added for Office36
                        },
                    });
                } else {
                    transporter = Evolve.Mailer.createTransport({
                        host: Evolve.Config.DOAEMAILHOST,
                        port: Evolve.Config.DOAEMAILPORT,
                        secureConnection: false, // Special Added for Office36
                        //secure: false, // true for 465, false for other ports
                        tls: {
                            rejectUnauthorized: false,
                            ciphers: 'SSLv3' // Special Added for Office36
                        },
                        auth: { /* Commit it when use port other then 465 */
                            user: Evolve.Config.DOAEMAILUSERNAME, // generated ethereal user
                            pass: Evolve.Config.DOAEMAILPASSWORD, // generated ethereal password
                        },
                    });
                }


                try {
                    // info = {};
                    let info = await transporter.sendMail({
                        from: Evolve.Config.DOAEMAILUSERNAME, // sender address
                        secure: (Evolve.Config.DOAEMAILSECURE == 0) ? false : true, // 
                        to: toMailId, // list of receivers
                        cc: ccMailId,
                        subject: subject, // Subject line
                        //text: "Hello world?", // plain text body
                        html: emailBody, // html body
                        attachments: attachments,


                    });
                    console.log("Email send info >>>>", info)
                        // console.log("toMailId//////////////////>>>>" ,  toMailId)

                } catch (error) {
                    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>HHHHH>>>>>>>>>>" + error.message);

                }

            }

        } catch (error) {
            //Evolve.Log.info('Error in eInvoiceDownloadEwaybillPDF : ' + error);
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>HHHHH>>>>>>>>>>" + error.message);

        }

    },

    generateSurakshaAuthToken: async function(req, res) {
        try {
            let config = {
                headers: {
                    "accept": "application/json",
                    "x-api-key": "WYkIfMNnAH7WAI2ir7M895krA9NYyVg03yWGf5TP",
                    "Content-Type": "application/json",

                }
            }
            let body = {
                "username": "vijay@alitersolutions.com",
                "password": "Suraksha@123#"
            }
            let responce = await Evolve.Axios.post("https://api.aarogyasetu.gov.in/token", body, config);

            console.log("responce.data.token<", responce.data.token)

            if (responce.status == 200) {

                Evolve.SurakshaToken = responce.data.token;

                // setInterval(function () {
                //   Evolve.App.Controllers.Common.ConCommon.generateSurakshaAuthToken();
                // }, 1800000);
                setTimeout(function() {
                    Evolve.App.Controllers.Einvoice.einvoiceControllers.readEInvoiceFolder(true);
                }, 5400000);

            } else {
                setTimeout(function() {
                    Evolve.App.Controllers.Einvoice.einvoiceControllers.readEInvoiceFolder(true);
                }, 5000);
                // Evolve.App.Controllers.Common.ConCommon.generateSurakshaAuthToken();

            }
            // setInterval(function () {
            //   Evolve.App.Controllers.Common.ConCommon.generateSurakshaAuthToken();
            // }, 1800000);


        } catch (error) {

            // setInterval(function () {
            //   Evolve.App.Controllers.Common.ConCommon.generateSurakshaAuthToken();
            // }, 30000);
            setTimeout(function() {
                Evolve.App.Controllers.Einvoice.einvoiceControllers.readEInvoiceFolder(true);
            }, 5000);
            Evolve.Log.error(" EERR####:Error While Genetrate Aarogyasetu  auth token " + error.message);

        }
    },

    setFavourite: async function(req, res) {
        try {
            let setFavourite = await Evolve.App.Services.Common.SrvCommon.setFavourite(req.body);
            if (setFavourite instanceof Error || setFavourite.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Error in set Favourite", result: "" };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Menu successfully added to favorites", result: "" };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR0068: Error while setFavourite " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0068: Error while setFavourite " + error.message, result: null };
            res.send(obj);
        }
    },

    getFavourite: async function(req, res) {
        try {
            let getFavourite = await Evolve.App.Services.Common.SrvCommon.getFavourite(req.EvolveUser_ID);
            if (getFavourite instanceof Error || getFavourite.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Error in get Favourite", result: "" };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "favorites list", result: getFavourite.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR0068: Error while getFavourite " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0068: Error while getFavourite " + error.message, result: null };
            res.send(obj);
        }
    },
    getUserUnits: async function(req, res) {
        try {
            let getUserUnits = await Evolve.App.Services.Common.SrvCommon.getUserUnits(req.EvolveUser_ID);
            if (getUserUnits instanceof Error || getUserUnits.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Error in get getUserUnits", result: "" };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "favorites list", result: getUserUnits.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR0068: Error while getUserUnits " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0068: Error while getUserUnits " + error.message, result: null };
            res.send(obj);
        }
    },

    addAction: async function(req, res) {
        try {
            let addAction = await Evolve.App.Services.Common.SrvCommon.addAction(req.EvolveUser_ID, req.body.menuUrl, req.body.EvolveMenu_Id, req.headers.origin, req.headers['user-agent'], req.body.actionType);
            if (addAction instanceof Error || addAction.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Error in get addAction", result: "" };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "favorites list", result: addAction.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR0068: Error while addAction " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0068: Error while addAction " + error.message, result: null };
            res.send(obj);
        }
    },

    changeUserUnit: async function(req, res) {
        try {

            for (let Euser in Evolve.EvolveUsersAuth) {
                if (Evolve.EvolveUsersAuth[Euser].EvolveUser_ID == req.EvolveUser_ID) {
                    Evolve.EvolveUsersAuth[Euser].EvolveUnit_ID = req.body.EvolveUnit_ID;

                }
            }
            res.send({ statusCode: 200, status: "success", message: "favorites list", result: null });

        } catch (error) {
            Evolve.Log.error("EERR####: Error while Change User unit " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while Change User unit " + error.message, result: null };
            res.send(obj);
        }
    },

    getuserCompanyList: async function(req, res) {
        try {

            console.log("getuserCompanyList CALLES >>>>>>>>.?????")
            let companyList = await Evolve.App.Services.Common.SrvCommon.getuserCompanyList(req.EvolveUser_ID);

            console.log("companyList?????", companyList)
            if (companyList instanceof Error || companyList.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Error in get companyList", result: "" };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "favorites list", result: companyList.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR####: Error while companyList " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while companyList " + error.message, result: null };
            res.send(obj);
        }
    },


    testTExt: async function(req, res) {
        try {

            // for (let Euser in Evolve.EvolveUsersAuth) {
            //   if (Evolve.EvolveUsersAuth[Euser].EvolveUser_ID ==  req.EvolveUser_ID) {
            //     Evolve.EvolveUsersAuth[Euser].EvolveUnit_ID = req.body.EvolveUnit_ID;

            //   }
            // }

            console.log("req>>>>>>", req)
            res.send({ statusCode: 200, status: "success", message: "favorites list", result: null });

        } catch (error) {
            Evolve.Log.error("EERR####: Error while Change User unit " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while Change User unit " + error.message, result: null };
            res.send(obj);
        }
    },


    getApprovalMatrixList: async function(data) {
        try {

            console.log("CALLED??????")
            let error = false;
            let rootList = [];
            let details = {
                EvolveApprovalMatrixIndex_Seq: 1,

                condition: data.ACTION == 'GENERATE' ? '' : 'AND eapm.EvolveApprovalMatrix_ID =' + data.EvolveApprovalMatrix_ID


            }
            let getMatrixList = await Evolve.App.Services.Common.SrvCommon.getApprovalMatrixList(details);
            if (getMatrixList instanceof Error) {

                error = true;

            } else {

                let matrixList = getMatrixList.recordset;

                for (let i = 0; i < matrixList.length; i++) {
                    if (error == false) {
                        details.EvolveApprovalMatrix_ID = matrixList[i].EvolveApprovalMatrix_ID;
                        let matrixDetails = await Evolve.App.Services.Common.SrvCommon.getMatrixDetailsList(details);
                        if (matrixDetails instanceof Error) {
                            error = true;
                        } else {
                            let array = matrixDetails.recordset;
                            let currentField;
                            let currentTable;

                            let resultArray = [];
                            let arrayIndexData = {
                                tableField: '',
                                isMandatory: '',
                                case: '',
                                caseValue: '',
                                tableName: '',
                            }

                            for (let i = 0; i < array.length; i++) {


                                if (array[i].EvolveApprovalMatrixDetails_Key == 'field') {

                                    currentField = array[i].EvolveApprovalMatrixDetails_Value;



                                } else if (array[i].EvolveApprovalMatrixDetails_Key == 'case') {

                                    arrayIndexData.isMandatory = array[i].EvolveApprovalMatrixDetails_IsMandatory == 1 ? true : false
                                    arrayIndexData.case = array[i].EvolveApprovalMatrixDetails_Value
                                    let findIndex = array.findIndex(x => x.EvolveApprovalMatrixDetails_ID == array[i].EvolveApprovalMatrixDetails_ParentID);

                                    currentField = array[findIndex].EvolveApprovalMatrixDetails_Value;



                                } else if (array[i].EvolveApprovalMatrixDetails_Key == 'value') {

                                    arrayIndexData.caseValue = array[i].EvolveApprovalMatrixDetails_Value


                                } else if (array[i].EvolveApprovalMatrixDetails_Key == 'table') {

                                    currentTable = array[i].EvolveApprovalMatrixDetails_Value
                                }
                                if (currentField != '' && currentField != null && currentField != undefined) {

                                    arrayIndexData.tableField = currentField;


                                }
                                if (currentTable != '' && currentTable != null && currentTable != undefined) {

                                    arrayIndexData.tableName = currentTable;


                                }

                                if (i == array.length - 1) {}

                                if (arrayIndexData.tableField !== '' && arrayIndexData.isMandatory !== '' && arrayIndexData.case !== '' && arrayIndexData.caseValue !== '' && arrayIndexData.tableName !== '') {
                                    resultArray.push({

                                        tableField: arrayIndexData.tableField,
                                        isMandatory: arrayIndexData.isMandatory,
                                        case: arrayIndexData.case,
                                        caseValue: arrayIndexData.caseValue,
                                        tableName: arrayIndexData.tableName
                                    })

                                    arrayIndexData.tableField = '';
                                    arrayIndexData.isMandatory = '';
                                    arrayIndexData.case = '';
                                    arrayIndexData.caseValue = '';
                                    arrayIndexData.tableName = '';

                                }

                            }

                            rootList.push({
                                EvolveApprovalMatrix_ID: matrixList[i].EvolveApprovalMatrix_ID,
                                EvolveApprovalMatrix_Type: matrixList[i].EvolveApprovalMatrix_Type,
                                EvolveApprovalMatrix_Name: matrixList[i].EvolveApprovalMatrix_Name,
                                EvolveApprovalMatrix_Code: matrixList[i].EvolveApprovalMatrix_Code,
                                EvolveApprovalMatrix_IsEmailNotif: matrixList[i].EvolveApprovalMatrix_IsEmailNotif,
                                EvolveApprovalMatrix_IsMessageNotif: matrixList[i].EvolveApprovalMatrix_IsMessageNotif,
                                EvolveApprovalMatrix_IsWPMessageNotif: matrixList[i].EvolveApprovalMatrix_IsWPMessageNotif,
                                EvolveApprovalMatrix_IsQxtendReq: matrixList[i].EvolveApprovalMatrix_IsQxtendReq,
                                EvolveApprovalMatrix_Status: matrixList[i].EvolveApprovalMatrix_Status,





                                roolList: resultArray
                            })


                        }
                    }
                }
            }


            if (!error) {

                if (data.ACTION == 'GENERATE') {

                    Evolve.approvalMatrixList = rootList;


                } else {

                    if (rootList.length != 0) {

                        let currentIndex = Evolve.approvalMatrixList.findIndex((element) => element.EvolveApprovalMatrix_ID == data.EvolveApprovalMatrix_ID)

                        if (currentIndex == -1) {

                            Evolve.approvalMatrixList.push(rootList[0]);

                        } else {

                            Evolve.approvalMatrixList[currentIndex] = rootList[0]

                        }
                    }
                }
            }


            return Evolve.approvalMatrixList;

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Error While Get Matrix Root Details" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Error While Get Matrix Root Details" + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    assignApprovalMatrix: async function(data) {
        try {

            let EvolveApprovalMatrix_ID = 0;

            let EvolveApprovalMatrix_Type = data.EvolveApprovalMatrix_Type;

            let detailsToBeMatch = data.details;

            let matrixList = [];
            Evolve.approvalMatrixList = await Evolve.approvalMatrixList.map(v => {

                if (v.EvolveApprovalMatrix_Type == EvolveApprovalMatrix_Type) {

                    matrixList.push(v)

                }
                return v
            })
            for (let i = 0; i < matrixList.length; i++) {

                if (matrixList[i].roolList.length == 0) {

                    EvolveApprovalMatrix_ID = matrixList[i].EvolveApprovalMatrix_ID;

                } else {
                    let queryStr = "";
                    for (let j = 0; j < matrixList[i].roolList.length; j++) {
                        let caseValueList = matrixList[i].roolList[j].caseValue.split(',');

                        queryStr += j == 0 ? '(' : " && (";

                        for (let k = 0; k < caseValueList.length; k++) {

                            let tableField = matrixList[i].roolList[j].tableField
                            if (k == caseValueList.length - 1) {

                                queryStr += detailsToBeMatch[tableField] + " " + matrixList[i].roolList[j].case+" " + caseValueList[k] + ' ) ';

                            } else {

                                queryStr += detailsToBeMatch[tableField] + " " + matrixList[i].roolList[j].case+" " + caseValueList[k] + ' || ';


                            }
                        }
                    }

                    if (eval(queryStr)) {
                        EvolveApprovalMatrix_ID = matrixList[i].EvolveApprovalMatrix_ID;
                    }
                }

            }
            return EvolveApprovalMatrix_ID
        } catch (error) {
            Evolve.Log.error(" EERR####: Error While Assign ApprovalProcess" + error.message);
            return 0;
        }
    },

    // Get ZPL Code For Label - Start

    getZplCode: async function(data) {
        return new Promise(async function(resolve, reject) {
            // console.log("Get ZPL code called=============>");
            // console.log("data",data.EvolveSticker_ID);
            let ZplCode = ""
            let getLabelData = await Evolve.App.Services.Evolve.printQueue.SrvList.getLabelData(data.EvolveSticker_ID);
            // console.log("getlabeldata=====>", getLabelData);
            if (getLabelData instanceof Error || getLabelData.rowsAffected <= 0) {
                Evolve.Log.error(" EERR32594: Error On Get Label Data");
                resolve(new Error('Error On Get Label Data'));
            } else {
                let str = getLabelData.recordset[0].EvolveSticker_Code
                let getAllVariable = await Evolve.App.Services.Evolve.printQueue.SrvList.getAllVariables(getLabelData.recordset[0].EvolveSticker_ID);
                // console.log("getallvariablwee===========>", getAllVariable);
                if (getAllVariable instanceof Error) {
                    Evolve.Log.error(" EERR32594: Error On Get Variables");
                    resolve(new Error('Error On Get Variables'));
                } else if (getAllVariable.rowsAffected <= 0) {
                    ZplCode = getLabelData.recordset[0].EvolveSticker_Code
                        // console.log("zpl code from zpl func =========>", ZplCode);
                    resolve(ZplCode);
                } else {
                    console.log("Enter in replace else part=====>");
                    for (let i = 0; i < getAllVariable.recordset.length; i++) {
                        if (str.match("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}")) {
                            console.log("getAllVariable.recordset[i].EvolveStickerVar_CustomFunation", getAllVariable.recordset[i].EvolveStickerVar_CustomFunction);
                            if (getAllVariable.recordset[i].EvolveStickerVar_CustomFunction == null || getAllVariable.recordset[i].EvolveStickerVar_CustomFunction == 'null' || getAllVariable.recordset[i].EvolveStickerVar_CustomFunction == undefined || getAllVariable.recordset[i].EvolveStickerVar_CustomFunction == '') {
                                console.log("data[`${getAllVariable.recordset[i].EvolveStickerVar_Value}`]", data[`${getAllVariable.recordset[i].EvolveStickerVar_Value}`]);
                                str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", data[`${getAllVariable.recordset[i].EvolveStickerVar_Value}`])
                            } else {
                                let functionPath = getAllVariable.recordset[i].EvolveStickerVar_CustomFunction;
                                // let variableValue = '';
                                let variableValue = await eval(functionPath);
                                // console.log("functionPath",functionPath);
                                // await eval(functionPath)
                                if (variableValue instanceof Error) {
                                    resolve(new Error(`Error ON Get Variablle Value From Function : ${functionPath}`));
                                } else {
                                    str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", variableValue)
                                }

                            }

                            i--;
                        }
                    }
                    console.log("zpl code from zpl func =========>", str);
                    resolve(str);
                }
            }
        })
    },

    getDateTime: async function(data) {
        let date = new Date();
        let datetime = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2) + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        return datetime
    },

    getWeightPerQty: async function(data) {
        let weightPerQty = (data.EvolveAsnLineDetailsLabel_NetWeight / data.EvolveAsnLabelDetails_Qty);
        return weightPerQty;
    },

    // Get ZPL Code For Label - End


    // Get Printer Task - Start

    getPrintTask: async function(req, res) {
        try {

            console.log("Body ", req.body);
            let obj = "";

            if (req.body.ACK_ID != undefined && req.body.ACK_ID != "" && req.body.ACK_ID != 0) {
                console.log("Enter in Get ACK:::::::::::::::::::::::::::::::::::::::::::::::::", req.body);
                if (req.body.Error_Code != undefined && req.body.Error_Code != "") {
                    await Evolve.Mongo.collection('EvolvePrintDetails').updateOne({ '_id': Evolve.ObjectID(req.body.ACK_ID) }, { $set: { EvolvePrintProcess_ErrorMessage: req.body.Error_Msg, EvolvePrintProcess_ErrorCode: req.body.Error_Code, EvolvePrintProcess_Status: 2 } });
                } else {
                    await Evolve.Mongo.collection('EvolvePrintDetails').updateOne({ '_id': Evolve.ObjectID(req.body.ACK_ID) }, { $set: { EvolvePrintProcess_Status: 1 } });
                }
                let findTaskIndex = Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_JobList.findIndex(data => data.EvolvePrintProcess_ID == req.body.ACK_ID);
                if (findTaskIndex != -1) {
                    Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_JobList.splice(findTaskIndex, 1);
                }
            }

            if (req.body.EvolvePrinter_Code != undefined || req.body.EvolvePrinter_Code != "") {
                if (typeof(Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_JobList) == 'object') {
                    if (Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_JobList.length > 0) {
                        obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Print Data",
                            result: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_JobList[0]
                        };
                    } else {
                        obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "No Task Found",
                            result: "No task For Printer " + req.body.EvolvePrinter_Code
                        };
                    }
                } else {
                    obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "No Task Found",
                        result: "No task For Printer " + req.body.EvolvePrinter_Code
                    };
                }
            }
            res.send(obj);

        } catch (error) {
            Evolve.Log.error(" EERR32587: Error while Reprint Label " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32587: Error while Get Task " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getPrinterList: async function(req, res) {
        try {
            let getPrinterList = await Evolve.App.Services.Common.SrvCommon.getPrinterList();
            let obj = { statusCode: 200, status: "success", message: "Printer List", result: getPrinterList.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0142: Error while getting Uom list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while getting Printer list " + error.message, result: null };
            res.send(obj);
        }
    },

    changeUserLang: async function(req, res) {
        try {
            for (let Euser in Evolve.EvolveUsersAuth) {
                if (Evolve.EvolveUsersAuth[Euser].EvolveUser_ID == req.EvolveUser_ID) {
                    Evolve.EvolveUsersAuth[Euser].EvolveLanguage_ID = req.body.EvolveLanguage_ID;
                    let changeUserLangInDB = await Evolve.App.Services.Common.SrvCommon.changeUserLangInDB(req.body.EvolveLanguage_ID, req.EvolveUser_ID);
                    console.log("changeUserLangInDB", changeUserLangInDB);
                }
            }
            res.send({ statusCode: 200, status: "success", message: "Lang change list", result: null });

        } catch (error) {
            Evolve.Log.error("EERR####: Error while Change User lang " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while Change Lang  " + error.message, result: null };
            res.send(obj);
        }
    },

    // Get Printer Task - End


}