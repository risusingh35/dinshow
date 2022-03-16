"use strict";
const Evolve = require("../../../Boot/Evolve");
module.exports = {
  // Login

  setEvolveToken: async function (
    EvolveUser_ID,
    EvolveToken_Token,
    EvolveToken_Data
  ) {
    try {
      let resultObj = await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
        .input("EvolveToken_Token", Evolve.Sql.NVarChar, EvolveToken_Token)
        .input("EvolveToken_Data", Evolve.Sql.NVarChar, EvolveToken_Data)
        .query(
          "UPDATE EvolveToken SET EvolveToken_Token=@EvolveToken_Token,EvolveToken_Data=@EvolveToken_Data WHERE EvolveUser_ID =@EvolveUser_ID"
        );
      if (resultObj.rowsAffected < 1) {
        // No Record Found So Insert New
        return await Evolve.SqlPool.request()
          .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
          .input("EvolveToken_Token", Evolve.Sql.NVarChar, EvolveToken_Token)
          .input("EvolveToken_Data", Evolve.Sql.NVarChar, EvolveToken_Data)
          .query(
            "INSERT INTO EvolveToken(EvolveUser_ID,EvolveToken_Token,EvolveToken_Data) VALUES (@EvolveUser_ID,@EvolveToken_Token,@EvolveToken_Data)"
          );
      } else {
        return resultObj;
      }
    } catch (error) {
      Evolve.Log.error(
        " EERR1032: Error while setting evolve token " + error.message
      );
      return new Error(
        " EERR1032: Error while setting evolve token " + error.message
      );
    }
  },

  verifyUserToken: async function (EvolveToken_Token) {
    try {
      //console.log("Token::", EvolveToken_Token)
      return await Evolve.SqlPool.request()
        .input("EvolveToken_Token", Evolve.Sql.NVarChar, EvolveToken_Token)
        .query(
          "SELECT * FROM EvolveToken WHERE EvolveToken_Token =@EvolveToken_Token"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1033: Error while verifying user token " + error.message
      );
      return new Error(
        " EERR1033: Error while verifying user token " + error.message
      );
    }
  },

  logoutUserToken: async function (EvolveToken_Token) {
    try {
      //console.log("Token::", EvolveToken_Token)
      return await Evolve.SqlPool.request()
        .input("EvolveToken_Token", Evolve.Sql.NVarChar, EvolveToken_Token)
        .query(
          "UPDATE EvolveToken SET EvolveToken_Token='logout' WHERE EvolveToken_Token =@EvolveToken_Token"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1034: Error while logout user token " + error.message
      );
      return new Error(
        " EERR1034: Error while logout user token " + error.message
      );
    }
  },

  getUserByEmail: async function (emailID) {
    try {
      return await Evolve.SqlPool.request()
        .input("emailID", Evolve.Sql.NVarChar, emailID)
        .query(
          "select * from EvolveUser WHERE (EvolveUser_EmailID = @emailID OR EvolveUser_login = @emailID)"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1035: Error while getting user by email " + error.message
      );
      return new Error(
        " EERR1035: Error while getting user by email " + error.message
      );
    }
  },

  getEvolveUserDefaultUrl: async function (EvolveUser_ID) {
    try {
      let MachineToUser = await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
        .query(
          "SELECT em.EvolveMenu_Url FROM EvolveMachineAssign emu, EvolveMenu em WHERE emu.EvolveUser_ID = @EvolveUser_ID AND em.EvolveMenu_Id = emu.EvolveMenu_Id"
        );
      if (MachineToUser instanceof Error || MachineToUser.rowsAffected < 1) {
        let User = await Evolve.SqlPool.request()
          .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
          .query(
            "SELECT em.EvolveMenu_Url FROM EvolveUser eu, EvolveMenu em WHERE eu.EvolveUser_ID = @EvolveUser_ID AND em.EvolveMenu_Id = eu.EvolveUser_DefaultMenu_ID"
          );
        if (User instanceof Error || User.rowsAffected < 1) {
          return await Evolve.SqlPool.request()
            .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
            .query(
              "SELECT em.EvolveMenu_Url FROM EvolveUserRoleLink ertl, EvolveRole er, EvolveMenu em WHERE ertl.EvolveUser_ID = @EvolveUser_ID AND er.EvolveRole_ID = ertl.EvolveRole_ID AND em.EvolveMenu_Id = er.EvolveRole_DefaultMenu_ID"
            );
        } else {
          return User;
        }
      } else {
        return MachineToUser;
      }
    } catch (error) {
      Evolve.Log.error(
        " EERR1036: Error while getting Evolve User Default Url " +
          error.message
      );
      return new Error(
        " EERR1036: Error while getting Evolve User Default Url " +
          error.message
      );
    }
  },

  getEvolveCompanyID: async function (EvolveUser_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
        .query(
          "SELECT EvolveCompany_ID from EvolveUserCompanyLink WHERE EvolveUser_ID = @EvolveUser_ID"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1037: Error while getting Evolve Company Id " + error.message
      );
      return new Error(
        " EERR1037: Error while getting Evolve Company Id " + error.message
      );
    }
  },

  // getEvolveUnitID: async function (EvolveUser_ID) {
  // 	try {
  // 		return await Evolve.SqlPool.request()
  // 			.input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
  // 			.query('SELECT EvolveUnit_ID from EvolveUserUnitLink WHERE EvolveUser_ID = @EvolveUser_ID');

  // 	} catch (error) {
  // 		Evolve.Log.error(" EERR1038: Error while getting Evolve Unit id " + error.message);
  // 		return new Error(" EERR1038: Error while getting Evolve Unit id " + error.message);
  // 	}
  // },

  getEvolveUnitID: async function (EvolveUser_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
        .query(
          "SELECT  DISTINCT(euserunit.EvolveUnit_ID) ,eu.EvolveCompany_ID  ,  euserunit.EvolveRole_ID  from EvolveUserUnitLink euserunit ,  EvolveUnit eu  WHERE euserunit.EvolveUser_ID = 4 AND euserunit.EvolveUserUnitLink_IsActive = 1 AND eu.EvolveUnit_ID =  euserunit.EvolveUnit_ID  "
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1038: Error while getting Evolve Unit id " + error.message
      );
      return new Error(
        " EERR1038: Error while getting Evolve Unit id " + error.message
      );
    }
  },

  // getEvolveRoleID: async function (EvolveUser_ID) {
  // 	try {
  // 		return await Evolve.SqlPool.request()
  // 			.input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
  // 			.query('SELECT EvolveRole_ID from EvolveUserRoleLink WHERE EvolveUser_ID = @EvolveUser_ID');

  // 	} catch (error) {
  // 		Evolve.Log.error(" EERR1039: Error while getting Evolve Role ID " + error.message);
  // 		return new Error(" EERR1039: Error while getting Evolve Role ID " + error.message);
  // 	}
  // },

  getEvolveRoleID: async function (EvolveUser_ID, EvolveUnit_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
        .input("EvolveUnit_ID", Evolve.Sql.Int, EvolveUnit_ID)

        .query(
          "  SELECT eurl.EvolveRole_ID , er.EvolveRole_Name from EvolveUserUnitLink eurl ,  EvolveRole er  WHERE eurl.EvolveUser_ID = @EvolveUser_ID AND eurl.EvolveUnit_ID=@EvolveUnit_ID AND eurl.EvolveUserUnitLink_IsActive = 1 AND eurl.EvolveRole_ID = er.EvolveRole_ID "
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1039: Error while getting Evolve Role ID " + error.message
      );
      return new Error(
        " EERR1039: Error while getting Evolve Role ID " + error.message
      );
    }
  },

  getCountryList: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "select EvolveCountry_ID,EvolveCountry_Name,EvolveCountry_Flag from EvolveCountry WHERE EvolveCountry_Active = 1"
      );
    } catch (error) {
      Evolve.Log.error(
        " EERR1040: Error while getting Country list " + error.message
      );
      return new Error(
        " EERR1040: Error while getting Country list " + error.message
      );
    }
  },
  getLanguageList: async function (EvolveCountry_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveCountry_ID", Evolve.Sql.Int, EvolveCountry_ID)
        .query(
          "select * from EvolveLanguage WHERE EvolveCountry_ID =@EvolveCountry_ID"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1041: Error while getting language list " + error.message
      );
      return new Error(
        " EERR1041: Error while getting language list " + error.message
      );
    }
  },
  getTranslate: async function (languageId, translate) {
    try {
      let keywordArray = [];
      Object.keys(translate).forEach(function (item) {
        keywordArray.push("'" + item + "'");
      });
      let keywords = keywordArray.toString();
      let query =
        "Select EvolvelLabel_KeyWord,EvolveLabel_Term From EvolveLabel el WHERE el.EvolveLanguage_ID =" +
        languageId +
        " AND el.EvolvelLabel_KeyWord  in (" +
        keywords +
        ")";
      return await Evolve.SqlPool.request().query(query);
    } catch (error) {
      Evolve.Log.error(
        " EERR1042: Error while getting translate " + error.message
      );
      return new Error(
        " EERR1042: Error while getting translate " + error.message
      );
    }
  },

  // Menu List only

  evolveAllAppList: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT * FROM EvolveApp WHERE EvolveApp_Status = 1 AND EvolveApp_Code != 'SUPPLIER'"
      );
    } catch (error) {
      Evolve.Log.error(" EERR1043: Error in evolve App list " + error.message);
      return new Error(" EERR1043: Error in evolve App list " + error.message);
    }
  },
  evolveGetAppDetails: async function (EvolveApp_Code) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveApp_Code", Evolve.Sql.NVarChar, EvolveApp_Code)
        .query(
          "SELECT * FROM EvolveApp WHERE EvolveApp_Code = @EvolveApp_Code"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1043: Error in evolve App list " + error.message);
      return new Error(" EERR1043: Error in evolve App list " + error.message);
    }
  },

  evolveMenuList: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveApp_ID", Evolve.Sql.NVarChar, data.EvolveApp_ID)
        .query(
          "SELECT em.EvolveMenu_Name,em.EvolveMenu_Id,em.EvolveMenu_Icon,em.EvolveMenu_Url FROM EvolveMenu em WHERE em.EvolveMenu_IsActive = 1 AND em.EvolveMenu_AppId = @EvolveApp_ID AND em.EvolveMenu_Parent = 0 ORDER BY em.EvolveMenu_Index"
        );

      // return await Evolve.SqlPool.request()
      // 	.input("EvolveApp_ID", Evolve.Sql.NVarChar, data.EvolveApp_ID)
      // 	.input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
      // 	.input("EvolveMenu_Name", Evolve.Sql.NVarChar, '%' + data.EvolveMenu_Name + '%')
      // 	.query("SELECT em.EvolveMenu_Name,em.EvolveMenu_Id,em.EvolveMenu_Icon,em.EvolveMenu_Url FROM EvolveMenu em, EvolveRoleToMenu erm , EvolveUserRoleLink eurl, EvolveRole er,EvolveApp ea  WHERE eurl.EvolveUser_ID = @EvolveUser_ID AND eurl.EvolveRole_ID = er.EvolveRole_ID AND erm.EvolveRole_ID = eurl.EvolveRole_ID  AND  ea.EvolveApp_Code LIKE @EvolveApp_Code AND em.EvolveMenu_IsActive = 1 AND em.EvolveMenu_AppId = ea.EvolveApp_ID AND erm.EvolveMenu_ID = em.EvolveMenu_ID AND erm.EvolveApp_ID = ea.EvolveApp_ID AND em.EvolveMenu_Parent = 0 AND em.EvolveMenu_Name LIKE @EvolveMenu_Name ORDER BY em.EvolveMenu_Index");
      //
    } catch (error) {
      Evolve.Log.error(" EERR1043: Error in evolve menu list " + error.message);
      return new Error(" EERR1043: Error in evolve menu list " + error.message);
    }
  },

  evolveMenuListForAdmin: async function (data) {
    try {
      // console.log("ENTERED IN evolveMenuListForAdmin??? ")

      let query =
        "SELECT  eapp.EvolveApp_Code ,  eapp.EvolveApp_Name   ,   em.EvolveMenu_Name,em.EvolveMenu_Id, emt.EvolveMenuType_Icon as  EvolveMenu_Icon,em.EvolveMenu_Url FROM EvolveMenuType emt , EvolveMenu em  , EvolveApp eapp WHERE em.EvolveMenu_IsActive = 1 AND em.EvolveMenu_Parent = 0  AND eapp.EvolveApp_ID = em.EvolveMenu_AppId AND eapp.EvolveApp_Status = 1 AND  em.EvolveMenu_IsActive = 1   AND em.EvolveMenuType_ID = emt.EvolveMenuType_ID  AND eapp.EvolveApp_ID= " +
        data.EvolveApp_ID +
        "    ORDER BY em.EvolveMenu_Index ";

      return await Evolve.SqlPool.request().query(query);
    } catch (error) {
      Evolve.Log.error(" EERR1043: Error in evolve menu list " + error.message);
      return new Error(" EERR1043: Error in evolve menu list " + error.message);
    }
  },

  evolveMenuListV2: async function (data, condition) {
    try {
      let query =
        "SELECT  eapp.EvolveApp_Code ,  eapp.EvolveApp_Name   ,   em.EvolveMenu_Name,em.EvolveMenu_Id, emt.EvolveMenuType_Icon as  EvolveMenu_Icon,em.EvolveMenu_Url FROM EvolveMenuType emt , EvolveMenu em , EvolveRoleToMenu erm  , EvolveApp eapp WHERE em.EvolveMenu_IsActive = 1 AND em.EvolveMenu_Parent = 0  AND eapp.EvolveApp_ID = em.EvolveMenu_AppId AND eapp.EvolveApp_Status = 1 AND erm.EvolveMenu_ID = em.EvolveMenu_Id  AND  em.EvolveMenu_IsActive = 1 AND em.EvolveMenuType_ID = emt.EvolveMenuType_ID" +
        condition +
        " AND eapp.EvolveApp_ID= " +
        data.EvolveApp_ID +
        "    ORDER BY em.EvolveMenu_Index ";
      return await Evolve.SqlPool.request().query(query);
    } catch (error) {
      Evolve.Log.error(" EERR1043: Error in evolve menu list " + error.message);
      return new Error(" EERR1043: Error in evolve menu list " + error.message);
    }
  },

  evolveMenuChildList: async function (EvolveMenu_Id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveMenu_Id", Evolve.Sql.Int, EvolveMenu_Id)
        .query(
          "SELECT em.EvolveMenu_Url,em.EvolveMenu_Index,em.EvolveMenu_Id,em.EvolveMenu_Name,emt.EvolveMenuType_Icon as EvolveMenu_Icon FROM EvolveMenu em LEFT JOIN  EvolveMenuType emt ON em.EvolveMenuType_ID = emt.EvolveMenuType_ID WHERE em.EvolveMenu_Parent =@EvolveMenu_Id AND  em.EvolveMenu_IsActive = 1"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1044: Error in evolve menu child list " + error.message
      );
      return new Error(
        " EERR1044: Error in evolve menu child list " + error.message
      );
    }
  },

  pageParameter: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveMenu_Url", Evolve.Sql.NVarChar, data.menuUrl)
        .query(
          "SELECT epc.EvolvePageConfig_Key,epc.EvolvePageConfig_Value FROM EvolveMenu em,EvolvePageConfig epc WHERE em.EvolveMenu_Url = @EvolveMenu_Url AND epc.EvolveMenu_Id = em.EvolveMenu_Id"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1045: Error in page parameter " + error.message);
      return new Error(" EERR1045: Error in page parameter " + error.message);
    }
  },

  getBranchList: async function (EvolveUser_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
        .query(
          " SELECT eb.EvolveBranch_ID,eb.EvolveBranch_Name FROM EvolveBranch eb, EvolveUserToBranch eutb WHERE eutb.EvolveUser_ID = @EvolveUser_ID AND eb.EvolveBranch_ID = eutb.EvolveBranch_ID"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1046: Error while getting branch list " + error.message
      );
      return new Error(
        " EERR1046: Error while getting branch list " + error.message
      );
    }
  },

  checkUserPageRights: async function (EvolveUser_ID, EvolveRole_ID, menuUrl) {
    try {
      // console.log("EvolveRole_ID>>", EvolveRole_ID)
      // console.log("menuUrl>>", menuUrl)
      return await Evolve.SqlPool.request()
        .input("EvolveMenu_Url", Evolve.Sql.NVarChar, menuUrl)
        .input("EvolveRole_ID", Evolve.Sql.Int, EvolveRole_ID)
        .query(
          "SELECT em.EvolveMenu_Id FROM EvolveMenu em, EvolveRoleToMenu erm WHERE em.EvolveMenu_Url LIKE @EvolveMenu_Url AND em.EvolveMenu_IsActive = 1 AND erm.EvolveRole_ID = @EvolveRole_ID AND erm.EvolveMenu_ID = em.EvolveMenu_Id"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1047: Error while checking User Page Rights " + error.message
      );
      return new Error(
        " EERR1047: Error while checking User Page Rights " + error.message
      );
    }
  },

  planningSidebarMenuList: async function (data) {
    try {
      console.log("data.EvolveUser_ID :", data.EvolveUser_ID);
      console.log("data.EvolveApp_Code :", data.EvolveApp_Code);
      return await Evolve.SqlPool.request()
        .input("EvolveMenu_AppId", Evolve.Sql.Int, 6) // 6 for App ID
        .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
        .query(
          "SELECT em.EvolveMenu_Name,em.EvolveMenu_Id,em.EvolveMenu_Icon,em.EvolveMenu_Url FROM EvolveMenu em, EvolveRoleToMenu erm , EvolveUserRoleLink eurl, EvolveRole er WHERE eurl.EvolveUser_ID =@EvolveUser_ID AND eurl.EvolveRole_ID = er.EvolveRole_ID AND erm.EvolveRole_ID = eurl.EvolveRole_ID AND erm.EvolveMenu_ID = em.EvolveMenu_ID AND em.EvolveMenu_IsActive = 1 AND em.EvolveMenu_AppId =@EvolveMenu_AppId AND erm.EvolveApp_ID =@EvolveMenu_AppId ANd em.EvolveMenu_Parent = 0 ORDER BY em.EvolveMenu_Index"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1048: Error while planning Sidebar Menu List " + error.message
      );
      return new Error(
        " EERR1048: Error while planning Sidebar Menu List " + error.message
      );
    }
  },

  getPlanningSidebarMenuChildList: async function (EvolveMenu_Id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveMenu_Id", Evolve.Sql.Int, EvolveMenu_Id)
        .query(
          "SELECT EvolveMenu_Url,EvolveMenu_Index,EvolveMenu_Name,EvolveMenu_Icon FROM EvolveMenu WHERE EvolveMenu_Parent =@EvolveMenu_Id"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1049: Error while getting Planning Sidebar Menu Child List " +
          error.message
      );
      return new Error(
        " EERR1049: Error while getting Planning Sidebar Menu Child List " +
          error.message
      );
    }
  },

  //Compliance Menu List only
  complianceSidebarMenuList: async function (data) {
    try {
      console.log("data.EvolveUser_ID :", data.EvolveUser_ID);

      return await Evolve.SqlPool.request()
        .input("EvolveMenu_AppId", Evolve.Sql.Int, 7) // 7 for App ID FOR Complainces
        .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
        .query(
          "SELECT em.EvolveMenu_Name,em.EvolveMenu_Id,em.EvolveMenu_Icon,em.EvolveMenu_Url FROM EvolveMenu em, EvolveRoleToMenu erm , EvolveUserRoleLink eurl, EvolveRole er WHERE eurl.EvolveUser_ID =@EvolveUser_ID AND eurl.EvolveRole_ID = er.EvolveRole_ID AND erm.EvolveRole_ID = eurl.EvolveRole_ID AND erm.EvolveMenu_ID = em.EvolveMenu_ID AND em.EvolveMenu_IsActive = 1 AND em.EvolveMenu_AppId =@EvolveMenu_AppId AND erm.EvolveApp_ID =@EvolveMenu_AppId ANd em.EvolveMenu_Parent = 0 ORDER BY em.EvolveMenu_Index"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1050: Error while compliance Sidebar Menu List " + error.message
      );
      return new Error(
        " EERR1050: Error while compliance Sidebar Menu List " + error.message
      );
    }
  },

  getcomplianceSidebarMenuChildList: async function (EvolveMenu_Id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveMenu_Id", Evolve.Sql.Int, EvolveMenu_Id)
        .query(
          "SELECT EvolveMenu_Url,EvolveMenu_Index,EvolveMenu_Name,EvolveMenu_Icon FROM EvolveMenu WHERE EvolveMenu_Parent =@EvolveMenu_Id"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1051: Error while getting compliance Sidebar Menu Child List " +
          error.message
      );
      return new Error(
        " EERR1051: Error while getting compliance Sidebar Menu Child List " +
          error.message
      );
    }
  },

  //Assets Menu List only
  eAssetsSidebarMenuList: async function (data) {
    try {
      console.log("data.EvolveUser_ID :", data.EvolveUser_ID);
      return await Evolve.SqlPool.request()
        .input("EvolveMenu_AppId", Evolve.Sql.Int, 13) // 13 for App ID FOR Assets
        .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
        .query(
          "SELECT em.EvolveMenu_Name,em.EvolveMenu_Id,em.EvolveMenu_Icon,em.EvolveMenu_Url FROM EvolveMenu em, EvolveRoleToMenu erm , EvolveUserRoleLink eurl, EvolveRole er WHERE eurl.EvolveUser_ID =@EvolveUser_ID AND eurl.EvolveRole_ID = er.EvolveRole_ID AND erm.EvolveRole_ID = eurl.EvolveRole_ID AND erm.EvolveMenu_ID = em.EvolveMenu_ID AND em.EvolveMenu_IsActive = 1 AND em.EvolveMenu_AppId =@EvolveMenu_AppId AND erm.EvolveApp_ID =@EvolveMenu_AppId ANd em.EvolveMenu_Parent = 0 ORDER BY em.EvolveMenu_Index"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1052: Error in eAssets Sidebar Menu List " + error.message
      );
      return new Error(
        " EERR1052: Error in eAssets Sidebar Menu List " + error.message
      );
    }
  },

  eAssetsSidebarMenuListChildList: async function (EvolveMenu_Id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveMenu_Id", Evolve.Sql.Int, EvolveMenu_Id)
        .query(
          "SELECT EvolveMenu_Url,EvolveMenu_Index,EvolveMenu_Name,EvolveMenu_Icon FROM EvolveMenu WHERE EvolveMenu_Parent =@EvolveMenu_Id"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1053: Error in eAssets Sidebar Menu List Child List " +
          error.message
      );
      return new Error(
        " EERR1053: Error in eAssets Sidebar Menu List Child List " +
          error.message
      );
    }
  },

  //Gate Control Menu List only
  eGateControlSidebarMenuList: async function (data) {
    try {
      console.log("data.EvolveUser_ID :", data.EvolveUser_ID);
      return await Evolve.SqlPool.request()
        .input("EvolveMenu_AppId", Evolve.Sql.Int, 14) // 14 for App ID FOR Assets
        .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
        .query(
          "SELECT em.EvolveMenu_Name,em.EvolveMenu_Id,em.EvolveMenu_Icon,em.EvolveMenu_Url FROM EvolveMenu em, EvolveRoleToMenu erm , EvolveUserRoleLink eurl, EvolveRole er WHERE eurl.EvolveUser_ID =@EvolveUser_ID AND eurl.EvolveRole_ID = er.EvolveRole_ID AND erm.EvolveRole_ID = eurl.EvolveRole_ID AND erm.EvolveMenu_ID = em.EvolveMenu_ID AND em.EvolveMenu_IsActive = 1 AND em.EvolveMenu_AppId =@EvolveMenu_AppId AND erm.EvolveApp_ID =@EvolveMenu_AppId ANd em.EvolveMenu_Parent = 0 ORDER BY em.EvolveMenu_Index"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1054: Error in eGate Control Sidebar Menu List " + error.message
      );
      return new Error(
        " EERR1054: Error in eGate Control Sidebar Menu List " + error.message
      );
    }
  },

  eGateControlSidebarMenuListChildList: async function (EvolveMenu_Id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveMenu_Id", Evolve.Sql.Int, EvolveMenu_Id)
        .query(
          "SELECT EvolveMenu_Url,EvolveMenu_Index,EvolveMenu_Name,EvolveMenu_Icon FROM EvolveMenu WHERE EvolveMenu_Parent =@EvolveMenu_Id"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1055: Error in eGate Control Sidebar Menu List Child List " +
          error.message
      );
      return new Error(
        " EERR1055: Error in eGate Control Sidebar Menu List Child List " +
          error.message
      );
    }
  },

  getTransTypeID: async function (EvolveTranstype_Code) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveTranstype_Code",
          Evolve.Sql.NVarChar,
          EvolveTranstype_Code
        )
        .query(
          "SELECT EvolveTranstype_ID FROM EvolveTranstype WHERE EvolveTranstype_Code = @EvolveTranstype_Code"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1056: Error while getting Trans Type ID " + error.message
      );
      return new Error(
        " EERR1056: Error while getting Trans Type ID " + error.message
      );
    }
  },

  addInvTransHistory: async function (data) {
    try {
      // console.log(data);
      let date = new Date();
      let datetime =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2) +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
      return await Evolve.SqlPool.request()
        .input("EvolveCompany_ID", Evolve.Sql.Int, data.EvolveUnit_ID)
        .input("EvolveUnit_ID", Evolve.Sql.Int, data.EvolveUnit_ID)
        .input("EvolveTransType_ID", Evolve.Sql.Int, data.EvolveTransType_ID)
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .input(
          "EvolveInventoryTransHistory_Number",
          Evolve.Sql.NVarChar,
          data.EvolveInventoryTransHistory_Number
        )
        .input(
          "EvolveInventoryTransHistory_Line",
          Evolve.Sql.NVarChar,
          data.EvolveInventoryTransHistory_Line
        )
        .input(
          "EvolveInventoryTransHistory_LotSerial",
          Evolve.Sql.NVarChar,
          data.EvolveInventoryTransHistory_LotSerial
        )
        .input(
          "EvolveInventoryTransHistory_RefNumber",
          Evolve.Sql.NVarChar,
          data.EvolveInventoryTransHistory_RefNumber
        )
        .input(
          "EvolveInventoryTransHistory_FromRefNumber",
          Evolve.Sql.NVarChar,
          data.EvolveInventoryTransHistory_FromRefNumber
        )
        .input(
          "EvolveInventoryTransHistory_QtyRequire",
          Evolve.Sql.NVarChar,
          data.EvolveInventoryTransHistory_QtyRequire
        )
        .input(
          "EvolveInventoryTransHistory_Qty",
          Evolve.Sql.NVarChar,
          data.EvolveInventoryTransHistory_Qty
        )
        .input("EvolveUom_ID", Evolve.Sql.Int, data.EvolveUom_ID)
        .input(
          "EvolveLocation_FromID",
          Evolve.Sql.Int,
          data.EvolveLocation_FromID
        )
        .input("EvolveLocation_ToID", Evolve.Sql.Int, data.EvolveLocation_ToID)
        .input("EvolveReason_ID", Evolve.Sql.Int, data.EvolveReason_ID)
        .input(
          "EvolveInventoryTransHistory_InventoryStatus",
          Evolve.Sql.NVarChar,
          data.EvolveInventoryTransHistory_InventoryStatus
        )
        .input(
          "EvolveInventoryTransHistory_PostingStatus",
          Evolve.Sql.NVarChar,
          data.EvolveInventoryTransHistory_PostingStatus
        )
        .input(
          "EvolveInventoryTransHistory_Remark",
          Evolve.Sql.NVarChar,
          data.EvolveInventoryTransHistory_Remark
        )
        .input(
          "EvolveInventoryTransHistory_ShipDate",
          Evolve.Sql.NVarChar,
          data.EvolveInventoryTransHistory_ShipDate
        )
        .input(
          "EvolveInventoryTransHistory_CreatedAt",
          Evolve.Sql.NVarChar,
          datetime
        )
        .input(
          "EvolveInventoryTransHistory_CreatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input(
          "EvolveInventoryTransHistory_UpdatedAt",
          Evolve.Sql.NVarChar,
          datetime
        )
        .input(
          "EvolveInventoryTransHistory_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .query(
          "INSERT INTO EvolveInventoryTransHistory(EvolveCompany_ID,EvolveUnit_ID,EvolveTransType_ID,EvolveItem_ID,EvolveInventoryTransHistory_Number,EvolveInventoryTransHistory_Line,EvolveInventoryTransHistory_LotSerial,EvolveInventoryTransHistory_RefNumber,EvolveInventoryTransHistory_FromRefNumber,EvolveInventoryTransHistory_QtyRequire,EvolveInventoryTransHistory_Qty,EvolveUom_ID,EvolveLocation_FromID,EvolveLocation_ToID,EvolveReason_ID,EvolveInventoryTransHistory_InventoryStatus,EvolveInventoryTransHistory_PostingStatus,EvolveInventoryTransHistory_Remark,EvolveInventoryTransHistory_CreatedAt,EvolveInventoryTransHistory_CreatedUser,EvolveInventoryTransHistory_UpdatedAt,EvolveInventoryTransHistory_UpdatedUser,EvolveInventoryTransHistory_ShipDate) VALUES (@EvolveCompany_ID,@EvolveUnit_ID,@EvolveTransType_ID,@EvolveItem_ID,@EvolveInventoryTransHistory_Number,@EvolveInventoryTransHistory_Line,@EvolveInventoryTransHistory_LotSerial,@EvolveInventoryTransHistory_RefNumber,@EvolveInventoryTransHistory_FromRefNumber,@EvolveInventoryTransHistory_QtyRequire,@EvolveInventoryTransHistory_Qty,@EvolveUom_ID,@EvolveLocation_FromID,@EvolveLocation_ToID,@EvolveReason_ID,@EvolveInventoryTransHistory_InventoryStatus,@EvolveInventoryTransHistory_PostingStatus,@EvolveInventoryTransHistory_Remark,@EvolveInventoryTransHistory_CreatedAt,@EvolveInventoryTransHistory_CreatedUser,@EvolveInventoryTransHistory_UpdatedAt,@EvolveInventoryTransHistory_UpdatedUser,@EvolveInventoryTransHistory_ShipDate) ;select @@IDENTITY AS 'inserted_id'"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1057: Error while adding Inv Trans History " + error.message
      );
      return new Error(
        " EERR1057: Error while adding Inv Trans History " + error.message
      );
    }
  },
  getEvolveConfig: async function () {
    try {
      return await Evolve.SqlPool.request().query("SELECT * FROM EvolveConfig");
    } catch (error) {
      Evolve.Log.error(
        " EERR1058: Error while getting Evolve Config " + error.message
      );
      return new Error(
        " EERR1058: Error while getting Evolve Config " + error.message
      );
    }
  },

  getSerialDetails: async function (code) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveSerial_Code", Evolve.Sql.NVarChar, code)
        .query(
          "SELECT * FROM  EvolveSerial WHERE EvolveSerial_Code =@EvolveSerial_Code"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1059: Error while getting Serial Details " + error.message
      );
      return new Error(
        " EERR1059: Error while getting Serial Details " + error.message
      );
    }
  },
  getSerialNumber: async function (code) {
    try {
      let date = new Date();
      let datetime =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2) +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
      console.log("datetime >>>>>>>>>>>>>>", datetime);
      if (code == "PALLET") {
        return await Evolve.SqlPool.request()
          .input("EvolveSerialPallet_DateTime", Evolve.Sql.NVarChar, datetime)
          .query(
            "INSERT INTO EvolveSerialPallet(EvolveSerialPallet_DateTime) VALUES (@EvolveSerialPallet_DateTime) ;select @@IDENTITY AS 'inserted_id'"
          );
      } else if (code == "PORECIEVEPALLET") {
        return await Evolve.SqlPool.request()
          .input(
            "EvolvePoRecievePallet_DateTime",
            Evolve.Sql.NVarChar,
            datetime
          )
          .query(
            "INSERT INTO EvolvePoRecievePallet(EvolvePoRecievePallet_DateTime) VALUES (@EvolvePoRecievePallet_DateTime) ;select @@IDENTITY AS 'inserted_id'"
          );
      } else if (code == "WOSSEQUENCE") {
        return await Evolve.SqlPool.request()
          .input("EvolveWOSSequence_DateTime", Evolve.Sql.NVarChar, datetime)
          .query(
            "INSERT INTO EvolveWOSSequence(EvolveWOSSequence_DateTime) VALUES (@EvolveWOSSequence_DateTime) ;select @@IDENTITY AS 'inserted_id'"
          );
      } else if (code == "PICKLISTNUMBER") {
        return await Evolve.SqlPool.request()
          .input("EvolveSerialPickList_DateTime", Evolve.Sql.NVarChar, datetime)
          .query(
            "INSERT INTO EvolveSerialPickList(EvolveSerialPickList_DateTime) VALUES (@EvolveSerialPickList_DateTime) ;select @@IDENTITY AS 'inserted_id'"
          );
      } else if (code == "WOSORDERID") {
        return await Evolve.SqlPool.request()
          .input(
            "EvolveWoScheduleOrder_DateTime",
            Evolve.Sql.NVarChar,
            datetime
          )
          .query(
            "INSERT INTO EvolveWoScheduleOrder (EvolveWoScheduleOrder_DateTime) VALUES (@EvolveWoScheduleOrder_DateTime) ;select @@IDENTITY AS 'inserted_id'"
          );
      } else if (code == "QCORDER") {
        return await Evolve.SqlPool.request()
          .input("EvolveQCOrderNumber_DateTime", Evolve.Sql.NVarChar, datetime)
          .query(
            "INSERT INTO EvolveQCOrderNumber (EvolveQCOrderNumber_DateTime) VALUES (@EvolveQCOrderNumber_DateTime) ;select @@IDENTITY AS 'inserted_id'"
          );
      } else if (code == "QCNCR") {
        return await Evolve.SqlPool.request()
          .input("EvolveNCRNumber_DateTime", Evolve.Sql.NVarChar, datetime)
          .query(
            "INSERT INTO EvolveNCRNumber (EvolveNCRNumber_DateTime) VALUES (@EvolveNCRNumber_DateTime) ;select @@IDENTITY AS 'inserted_id'"
          );
      } else if (code == "SALESQUOTE") {
        return await Evolve.SqlPool.request()
          .input(
            "EvolveSalesQuoteSerial_DateTime",
            Evolve.Sql.NVarChar,
            datetime
          )
          .query(
            "INSERT INTO EvolveSalesQuoteSerial (EvolveSalesQuoteSerial_DateTime) VALUES (@EvolveSalesQuoteSerial_DateTime) ;select @@IDENTITY AS 'inserted_id'"
          );
      } else {
        return new error("No Record Found!");
      }
    } catch (error) {
      Evolve.Log.error(
        " EERR1060: Error while getting Serial Number " + error.message
      );
      return new Error(
        " EERR1060: Error while getting Serial Number " + error.message
      );
    }
  },

  // Navbar Theme Color
  getNavThemeColor: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        `SELECT * FROM EvolveConfig WHERE EvolveConfig_Key = 'PRODENVCOLOR' OR EvolveConfig_Key = 'TESTENVCOLOR' OR EvolveConfig_Key = 'DEVENVCOLOR' `
      );
    } catch (error) {
      Evolve.Log.error(
        " EERR32518: Error while getting theme color " + error.message
      );
      return new Error(
        " EERR32518: Error while getting theme color " + error.message
      );
    }
  },

  // functions for suraksha app
  getTravelReqDetails: async function (EvolveTravelReq_id) {
    try {
      let reqDetails = await Evolve.SqlPool.request()
        .input("EvolveTravelReq_id", Evolve.Sql.Int, EvolveTravelReq_id)

        .query(
          "SELECT  etr.* , eu.* FROM  EvolveTravelReq etr , EvolveUser eu  WHERE etr.EvolveTravelReq_id  = @EvolveTravelReq_id  AND etr.EvolveUser_id = eu.EvolveUser_ID  "
        );

      if (reqDetails instanceof Error || reqDetails.rowsAffected < 1) {
        return 0;
      } else {
        let details = {};
        details.travelReqDetails = reqDetails.recordset[0];

        let headDetails = await Evolve.SqlPool.request()
          .query(`SELECT eu1.EvolveUser_Name as primary_name,eu1.EvolveUser_login as primary_login,eu1.EvolveUser_DeviceID as primaryUser_deviceId , 
					eu2.EvolveUser_Name as secondary_name,eu2.EvolveUser_login as secondary_login,eu2.EvolveUser_DeviceID as secondaryUser_deviceId,
					eu3.EvolveUser_Name as tertiary_name,eu3.EvolveUser_login as tertiary_login, eu3.EvolveUser_DeviceID as tertiaryUser_deviceId ,
					EvolveApproval.EvolveApproval_primaryUser_id, EvolveApproval.EvolveApproval_secondUser_id, EvolveApproval.EvolveApproval_tertiaryUser_id ,er.EvolveRole_Name
							FROM EvolveApprovalStatus           
							Left JOIN EvolveApproval ON EvolveApproval.EvolveApproval_id = EvolveApprovalStatus.EvolveApproval_id
							Left JOIN EvolveUser eu1 ON eu1.EvolveUser_ID = EvolveApproval.EvolveApproval_primaryUser_id
							Left JOIN EvolveUser eu2 ON eu2.EvolveUser_ID = EvolveApproval.EvolveApproval_secondUser_id
							Left JOIN EvolveUser eu3 ON eu3.EvolveUser_ID = EvolveApproval.EvolveApproval_tertiaryUser_id
							
							Left JOIN  EvolveUserRoleLink eur ON eur.EvolveUser_ID  = EvolveApproval.EvolveApproval_primaryUser_id
							LEFT JOIN EvolveRole er ON er.EvolveRole_ID = eur.EvolveRole_ID
							where EvolveTravelReq_id =${EvolveTravelReq_id} `);
        if (headDetails instanceof Error || headDetails.rowsAffected < 1) {
          return 0;
        } else {
          details.headDetails = headDetails.recordset;
          return details;
        }
      }
    } catch (error) {
      Evolve.Log.error("Error while get travel req details " + error.message);
      return new Error("Error while get travel req details " + error.message);
    }
  },
  getUserDetails: async function (EvolveUser_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
        .query("SELECT  * FROM EvolveUser WHERE EvolveUser_ID=@EvolveUser_ID");
    } catch (error) {
      Evolve.Log.error(" Error while get user details " + error.message);
      return new Error(" Error while get user details " + error.message);
    }
  },

  getNotifDetails: async function (EvolveNotif_Type, EvolveNotif_Code) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveNotif_Type", Evolve.Sql.NVarChar, EvolveNotif_Type)
        .input("EvolveNotif_Code", Evolve.Sql.NVarChar, EvolveNotif_Code)

        .query(
          "SELECT  * FROM EvolveNotif WHERE EvolveNotif_Type=@EvolveNotif_Type AND EvolveNotif_Code=@EvolveNotif_Code "
        );
    } catch (error) {
      Evolve.Log.error(
        " Error while get notification  details " + error.message
      );
      return new Error(
        " Error while get notification  details " + error.message
      );
    }
  },
  addNotifDetails: async function (data) {
    try {
      let dateTime =
        await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

      return await Evolve.SqlPool.request()
        .input("EvolveNotif_ID", Evolve.Sql.Int, data.EvolveNotif_ID)
        .input("EvolveTravelReq_id", Evolve.Sql.Int, data.EvolveTravelReq_id)
        .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
        .input(
          "EvolveNotifDetails_Read",
          Evolve.Sql.Int,
          data.EvolveNotifDetails_Read
        )
        .input(
          "EvolveNotifDetails_Data",
          Evolve.Sql.NVarChar,
          JSON.stringify(data.message)
        )

        .input("EvolveNotifDetails_CreatedAt", Evolve.Sql.NVarChar, dateTime)
        .input(
          "EvolveNotifDetails_CreatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input("EvolveNotifDetails_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
        .input(
          "EvolveNotifDetails_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )

        .query(
          "INSERT INTO EvolveNotifDetails (EvolveNotif_ID , EvolveTravelReq_id ,EvolveUser_ID ,EvolveNotifDetails_Read,EvolveNotifDetails_CreatedAt,EvolveNotifDetails_CreatedUser,EvolveNotifDetails_UpdatedAt,EvolveNotifDetails_UpdatedUser ,EvolveNotifDetails_Data) VALUES (@EvolveNotif_ID , @EvolveTravelReq_id , @EvolveUser_ID , @EvolveNotifDetails_Read,@EvolveNotifDetails_CreatedAt,@EvolveNotifDetails_CreatedUser,@EvolveNotifDetails_UpdatedAt,@EvolveNotifDetails_UpdatedUser,@EvolveNotifDetails_Data)"
        );
    } catch (error) {
      Evolve.Log.error(
        "EERR#### : Error While Insert Notif Details " + error.message
      );
      return new Error(
        "EERR#### : Error While Insert Notif Details " + error.message
      );
    }
  },
  getApprovalMatrixByType: async function (EvolveApprovalMatrix_Type) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveApprovalMatrix_Type",
          Evolve.Sql.NVarChar,
          EvolveApprovalMatrix_Type
        )
        .query(
          "SELECT * FROM EvolveApprovalMatrix WHERE EvolveApprovalMatrix_Type =@EvolveApprovalMatrix_Type"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR####: Error while get approval matrix details " + error.message
      );
      return new Error(
        " EERR####: Error while get approval matrix details " + error.message
      );
    }
  },
  addApprovalProcess: async function (data) {
    try {
      let dateTime =
        await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

      return await Evolve.SqlPool.request()
        .input(
          "EvolveApprovalMatrix_ID",
          Evolve.Sql.Int,
          data.EvolveApprovalMatrix_ID
        )
        .input(
          "EvolveApprovalProcess_PrimaryID",
          Evolve.Sql.Int,
          data.EvolveApprovalProcess_PrimaryID
        )
        .input(
          "EvolveApprovalProcess_Status",
          Evolve.Sql.NVarChar,
          data.EvolveApprovalProcess_Status
        )
        .input(
          "EvolveApprovalProcess_CurrentIndex",
          Evolve.Sql.Int,
          data.EvolveApprovalProcess_CurrentIndex
        )
        .input("EvolveApprovalProcess_CreatedAt", Evolve.Sql.NVarChar, dateTime)
        .input(
          "EvolveApprovalProcess_CreatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input("EvolveApprovalProcess_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
        .input(
          "EvolveApprovalProcess_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )

        .query(
          "INSERT INTO EvolveApprovalProcess (EvolveApprovalMatrix_ID , EvolveApprovalProcess_PrimaryID ,EvolveApprovalProcess_Status ,EvolveApprovalProcess_CurrentIndex,EvolveApprovalProcess_CreatedAt,EvolveApprovalProcess_CreatedUser,EvolveApprovalProcess_UpdatedAt,EvolveApprovalProcess_UpdatedUser ) VALUES (@EvolveApprovalMatrix_ID , @EvolveApprovalProcess_PrimaryID , @EvolveApprovalProcess_Status , @EvolveApprovalProcess_CurrentIndex,@EvolveApprovalProcess_CreatedAt,@EvolveApprovalProcess_CreatedUser,@EvolveApprovalProcess_UpdatedAt,@EvolveApprovalProcess_UpdatedUser)"
        );
    } catch (error) {
      Evolve.Log.error(
        "EERR#### : Error While Insert Approval Process " + error.message
      );
      return new Error(
        "EERR#### :  Error While Insert Approval Process " + error.message
      );
    }
  },

  getMedicUsersList: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT erl.* FROM EvolveRole er , EvolveUserRoleLink erl  WHERE er.EvolveRole_ID = erl.EvolveRole_ID AND er.EvolveRole_Name = 'medic'"
      );
    } catch (error) {
      Evolve.Log.error(
        "EERR#### : Error While Get Medic User List " + error.message
      );
      return new Error(
        "EERR#### :  Error While Get Medic User List " + error.message
      );
    }
  },

  getApprovalMatrixListByType: async function (EvolveApprovalMatrix_Type) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveApprovalMatrix_Type",
          Evolve.Sql.NVarChar,
          EvolveApprovalMatrix_Type
        )

        .query(
          "SELECT erl.* FROM EvolveRole er , EvolveUserRoleLink erl  WHERE er.EvolveRole_ID = erl.EvolveRole_ID AND er.EvolveRole_Name = 'medic'"
        );
    } catch (error) {
      Evolve.Log.error(
        "EERR#### : Error While Get Medic User List " + error.message
      );
      return new Error(
        "EERR#### :  Error While Get Medic User List " + error.message
      );
    }
  },
  getSalesQouteMatrixList: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        //   .input('EvolveApprovalMatrix_ID', Evolve.Sql.Int, data.EvolveApprovalMatrix_ID)
        .input(
          "EvolveApprovalMatrixIndex_Seq",
          Evolve.Sql.NVarChar,
          data.EvolveApprovalMatrixIndex_Seq
        )
        .input(
          "EvolveApprovalMatrix_Type",
          Evolve.Sql.NVarChar,
          data.EvolveApprovalMatrix_Type
        )

        .query(
          "SELECT eapi.* FROM EvolveApprovalMatrixIndex  eapi  ,EvolveApprovalMatrix eapm WHERE  EvolveApprovalMatrixIndex_Seq=@EvolveApprovalMatrixIndex_Seq  AND eapi.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID AND eapm.EvolveApprovalMatrix_Type=@EvolveApprovalMatrix_Type AND eapm.EvolveApprovalMatrix_Status=1"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR#### : Error while get matrix details list " + error.message
      );
      return new Error(
        " EERR#### : Error while get matrix details list " + error.message
      );
    }
  },
  getMatrixDetailsList: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveApprovalMatrix_ID",
          Evolve.Sql.Int,
          data.EvolveApprovalMatrix_ID
        )
        .input(
          "EvolveApprovalMatrixIndex_Seq",
          Evolve.Sql.NVarChar,
          data.EvolveApprovalMatrixIndex_Seq
        )
        .query(
          "SELECT  * FROM EvolveApprovalMatrixDetails eapd ,  EvolveApprovalMatrixIndex eapi  WHERE eapi.EvolveApprovalMatrix_ID = @EvolveApprovalMatrix_ID AND eapi.EvolveApprovalMatrixIndex_Seq = @EvolveApprovalMatrixIndex_Seq AND eapd.EvolveApprovalMatrixIndex_ID = eapi.EvolveApprovalMatrixIndex_ID"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR#### : Error while get matrix details list " + error.message
      );
      return new Error(
        " EERR#### : Error while get matrix details list " + error.message
      );
    }
  },
  getUserDetailsToMail: async function (data) {
    try {
      let query;

      query =
        "SELECT  ect.EvolveCreditTerms_Code ,ect.EvolveCreditTerms_Description , ecust.EvolveCustomer_Name  ,esq.* , eu.EvolveUser_Name , eu.EvolveUser_EmailID  , eu.EvolveUser_ID, eap.* ,  eapm.EvolveApprovalMatrix_Name , eapm.EvolveApprovalMatrix_Code ,eapm.EvolveApprovalMatrix_Type , eapm.EvolveApprovalMatrix_IsEmailNotif , eapm.EvolveApprovalMatrix_IsMessageNotif , eapm.EvolveApprovalMatrix_IsWPMessageNotif ,       eapm.EvolveApprovalMatrix_IsQxtendReq , eapi.EvolveApprovalMatrixIndex_ID ,  eapi.EvolveApprovalMatrixIndex_Seq   FROM EvolveApprovalProcess eap  ,  EvolveApprovalMatrix eapm , EvolveApprovalMatrixIndex eapi , EvolveApprovalMatrixDetails eapmd  ,  EvolveUser eu , EvolveSalesQuote esq , EvolveCustomer ecust , EvolveCreditTerms ect WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID  AND eapi.EvolveApprovalMatrix_ID = eap.EvolveApprovalMatrix_ID    AND eapi.EvolveApprovalMatrixIndex_Seq = eap.EvolveApprovalProcess_CurrentIndex   AND eapi.EvolveApprovalMatrixIndex_ID =  eapmd.EvolveApprovalMatrixIndex_ID AND eapmd.EvolveApprovalMatrixDetails_Key = 'USERID'   AND  eap.EvolveApprovalProcess_IsOnGroundLevel != 1 AND eu.EvolveUser_ID  =  eapmd.EvolveApprovalMatrixDetails_Value  AND eap.EvolveApprovalProcess_PrimaryID = esq.EvolveSalesQuote_ID AND esq.EvolveSalesQuote_Customer_ID = ecust.EvolveCustomer_ID AND eap.EvolveApprovalProcess_ID=@EvolveApprovalProcess_ID AND ect.EvolveCreditTerms_ID = esq.EvolveCreditTerms_ID";
      return await Evolve.SqlPool.request()
        .input(
          "EvolveApprovalProcess_ID",
          Evolve.Sql.Int,
          data.EvolveApprovalProcess_ID
        )

        .query(query);
    } catch (error) {
      Evolve.Log.error(
        " EERR####: Error while get approval matrix count " + error.message
      );
      return new Error(
        " EERR####: Error while get approval matrix count " + error.message
      );
    }
  },

  senBackRequestDetails: async function (data) {
    try {
      let query;

      query =
        " SELECT  ect.EvolveCreditTerms_Code ,ect.EvolveCreditTerms_Description  ,ecust.EvolveCustomer_Name  , eu.* , esq.* , eap.* ,  eapm.EvolveApprovalMatrix_Name , eapm.EvolveApprovalMatrix_Code ,eapm.EvolveApprovalMatrix_Type ,eapm.EvolveApprovalMatrix_IsEmailNotif , eapm.EvolveApprovalMatrix_IsMessageNotif , eapm.EvolveApprovalMatrix_IsWPMessageNotif ,	eapm.EvolveApprovalMatrix_IsQxtendReq  FROM EvolveApprovalProcess eap  ,  EvolveApprovalMatrix eapm , EvolveSalesQuote esq   , EvolveUser eu , EvolveCustomer ecust ,EvolveCreditTerms ect	WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID AND eap.EvolveApprovalProcess_PrimaryID = esq.EvolveSalesQuote_ID 	AND eap.EvolveApprovalProcess_CreatedUser = eu.EvolveUser_ID AND eap.EvolveApprovalProcess_ID =@EvolveApprovalProcess_ID AND esq.EvolveSalesQuote_Customer_ID = ecust.EvolveCustomer_ID AND ect.EvolveCreditTerms_ID = esq.EvolveCreditTerms_ID";
      return await Evolve.SqlPool.request()
        .input(
          "EvolveApprovalProcess_ID",
          Evolve.Sql.Int,
          data.EvolveApprovalProcess_ID
        )

        .query(query);
    } catch (error) {
      Evolve.Log.error(
        " EERR####: Error while get approval matrix count " + error.message
      );
      return new Error(
        " EERR####: Error while get approval matrix count " + error.message
      );
    }
  },
  getTravelReqApproverUserDetails: async function (EvolveApprovalProcess_ID) {
    try {
      let query;

      query =
        "SELECT   eu.EvolveUser_Name , eu.EvolveUser_EmailID  , eu.EvolveUser_ID, eap.* ,  eapm.EvolveApprovalMatrix_Name , eapm.EvolveApprovalMatrix_Code ,eapm.EvolveApprovalMatrix_Type , eapm.EvolveApprovalMatrix_IsEmailNotif , eapm.EvolveApprovalMatrix_IsMessageNotif , eapm.EvolveApprovalMatrix_IsWPMessageNotif ,       eapm.EvolveApprovalMatrix_IsQxtendReq , eapi.EvolveApprovalMatrixIndex_ID ,  eapi.EvolveApprovalMatrixIndex_Seq   FROM EvolveApprovalProcess eap  ,  EvolveApprovalMatrix eapm , EvolveApprovalMatrixIndex eapi , EvolveApprovalMatrixDetails eapmd  ,  EvolveUser eu  WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID  AND eapi.EvolveApprovalMatrix_ID = eap.EvolveApprovalMatrix_ID    AND eapi.EvolveApprovalMatrixIndex_Seq = eap.EvolveApprovalProcess_CurrentIndex   AND eapi.EvolveApprovalMatrixIndex_ID =  eapmd.EvolveApprovalMatrixIndex_ID AND eapmd.EvolveApprovalMatrixDetails_Key = 'USERID'   AND  eap.EvolveApprovalProcess_IsOnGroundLevel != 1 AND eu.EvolveUser_ID  =  eapmd.EvolveApprovalMatrixDetails_Value  AND eap.EvolveApprovalProcess_PrimaryID = @EvolveApprovalProcess_ID";
      return await Evolve.SqlPool.request()
        .input(
          "EvolveApprovalProcess_ID",
          Evolve.Sql.Int,
          EvolveApprovalProcess_ID
        )

        .query(query);
    } catch (error) {
      Evolve.Log.error(
        " EERR####: Error while get travel req appprovers details " +
          error.message
      );
      return new Error(
        " EERR####: Error while get travel req appprovers details " +
          error.message
      );
    }
  },

  getTravelReqAllSequenceApproverUserDetails: async function (
    EvolveApprovalProcess_ID
  ) {
    try {
      let query;

      query =
        "SELECT   eu.EvolveUser_Name , eu.EvolveUser_EmailID  , eu.EvolveUser_ID, eap.* ,  eapm.EvolveApprovalMatrix_Name , eapm.EvolveApprovalMatrix_Code ,eapm.EvolveApprovalMatrix_Type , eapm.EvolveApprovalMatrix_IsEmailNotif , eapm.EvolveApprovalMatrix_IsMessageNotif , eapm.EvolveApprovalMatrix_IsWPMessageNotif ,       eapm.EvolveApprovalMatrix_IsQxtendReq , eapi.EvolveApprovalMatrixIndex_ID ,  eapi.EvolveApprovalMatrixIndex_Seq   FROM EvolveApprovalProcess eap  ,  EvolveApprovalMatrix eapm , EvolveApprovalMatrixIndex eapi , EvolveApprovalMatrixDetails eapmd  ,  EvolveUser eu  WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID  AND eapi.EvolveApprovalMatrix_ID = eap.EvolveApprovalMatrix_ID    AND eapi.EvolveApprovalMatrixIndex_Seq = eap.EvolveApprovalProcess_CurrentIndex   AND eapi.EvolveApprovalMatrixIndex_ID =  eapmd.EvolveApprovalMatrixIndex_ID AND eapmd.EvolveApprovalMatrixDetails_Key = 'USERID'   AND  eap.EvolveApprovalProcess_IsOnGroundLevel != 1 AND eu.EvolveUser_ID  =  eapmd.EvolveApprovalMatrixDetails_Value  AND eap.EvolveApprovalProcess_PrimaryID = @EvolveApprovalProcess_ID";
      return await Evolve.SqlPool.request()
        .input(
          "EvolveApprovalProcess_ID",
          Evolve.Sql.Int,
          EvolveApprovalProcess_ID
        )

        .query(query);
    } catch (error) {
      Evolve.Log.error(
        " EERR####: Error while get travel req appprovers details " +
          error.message
      );
      return new Error(
        " EERR####: Error while get travel req appprovers details " +
          error.message
      );
    }
  },
  getLastApproverDetails: async function (data) {
    try {
      let query;

      query =
        "SELECT    eu.* FROM  EvolveApprovalProcessDetails eapd , EvolveUser eu  WHERE eapd.EvolveApprovalProcessDetails_Status  = 'APPROVED' AND eapd.EvolveApprovalProcess_ID = @EvolveApprovalProcess_ID AND eapd.EvolveApprovalProcessDetails_CreatedUser = eu.EvolveUser_ID ORDER BY   EvolveApprovalProcessDetails_ID DESC";
      return await Evolve.SqlPool.request()
        .input(
          "EvolveApprovalProcess_ID",
          Evolve.Sql.Int,
          data.EvolveApprovalProcess_ID
        )

        .query(query);
    } catch (error) {
      Evolve.Log.error(
        " EERR####: Error while get last approver details " + error.message
      );
      return new Error(
        " EERR####: Error while get last approver details " + error.message
      );
    }
  },
  getApprovalProcessHistory: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveApprovalProcess_PrimaryID",
          Evolve.Sql.Int,
          data.EvolveApprovalProcess_PrimaryID
        )
        .input(
          "EvolveApprovalMatrix_Type",
          Evolve.Sql.NVarChar,
          data.EvolveApprovalMatrix_Type
        )
        .query(
          "  SELECT  epd.*  , eu.EvolveUser_Name , convert(varchar, epd.EvolveApprovalProcessDetails_CreatedAt, 103)  as date , LTRIM(SUBSTRING(CONVERT(VARCHAR(20),  CONVERT(DATETIME, epd.EvolveApprovalProcessDetails_CreatedAt), 22), 10, 5) + RIGHT(CONVERT(VARCHAR(20),      CONVERT(DATETIME, epd.EvolveApprovalProcessDetails_CreatedAt), 22), 3)) as time FROM   EvolveApprovalProcessDetails epd  , EvolveUser eu , EvolveApprovalProcess eap , EvolveApprovalMatrix eapm      WHERE epd.EvolveUser_ID = eu.EvolveUser_ID  AND eap.EvolveApprovalProcess_PrimaryID = @EvolveApprovalProcess_PrimaryID  AND epd.EvolveApprovalProcess_ID = eap.EvolveApprovalProcess_ID AND eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID AND eapm.EvolveApprovalMatrix_Type = @EvolveApprovalMatrix_Type  ORDER BY  epd.EvolveApprovalProcessDetails_ID   DESC"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR#### : Error while get approval process history " + error.message
      );
      return new Error(
        " EERR#### : Error while get approval process history " + error.message
      );
    }
  },

  setFavourite: async function (data) {
    try {
      let checkfav = await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolveMenu_Id", Evolve.Sql.Int, data.EvolveMenu_Id)
        .query(
          "DELETE FROM EvolveFavourite WHERE EvolveUser_ID=@EvolveUser_ID AND EvolveMenu_Id=@EvolveMenu_Id;"
        );
      if (checkfav instanceof Error || checkfav.rowsAffected < 1) {
        let date = new Date();
        let datetime =
          date.getFullYear() +
          "-" +
          ("0" + (date.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + date.getDate()).slice(-2) +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes() +
          ":" +
          date.getSeconds();
        return await Evolve.SqlPool.request()
          .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
          .input("EvolveMenu_Id", Evolve.Sql.Int, data.EvolveMenu_Id)
          .input("EvolveFavourite_Status", Evolve.Sql.Int, 1)
          .input("EvolveFavourite_CreatedAt", Evolve.Sql.NVarChar, datetime)
          .input(
            "EvolveFavourite_CreatedUser",
            Evolve.Sql.Int,
            data.EvolveUser_ID
          )
          .input("EvolveFavourite_UpdatedAt", Evolve.Sql.NVarChar, datetime)
          .input(
            "EvolveFavourite_UpdatedUser",
            Evolve.Sql.Int,
            data.EvolveUser_ID
          )
          .query(
            "INSERT INTO EvolveFavourite(EvolveUser_ID,EvolveMenu_Id,EvolveFavourite_Status,EvolveFavourite_CreatedAt,EvolveFavourite_CreatedUser,EvolveFavourite_UpdatedAt,EvolveFavourite_UpdatedUser) VALUES (@EvolveUser_ID,@EvolveMenu_Id,@EvolveFavourite_Status,@EvolveFavourite_CreatedAt,@EvolveFavourite_CreatedUser,@EvolveFavourite_UpdatedAt,@EvolveFavourite_UpdatedUser) ;"
          );
      } else {
        return checkfav;
      }
    } catch (error) {
      Evolve.Log.error(
        " EERR1057: Error while adding setFavourite " + error.message
      );
      return new Error(
        " EERR1057: Error while adding setFavourite " + error.message
      );
    }
  },

  getFavourite: async function (EvolveUser_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
        .query(
          "SELECT EF.EvolveFavourite_ID,EM.EvolveMenu_Id,EM.EvolveMenu_Name,EM.EvolveMenu_Url,EM.EvolveMenu_Icon FROM EvolveFavourite EF,EvolveMenu EM WHERE EvolveUser_ID=@EvolveUser_ID AND EM.EvolveMenu_Id = EF.EvolveMenu_Id AND EM.EvolveMenu_IsActive = 1;"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1057: Error while adding getFavourite " + error.message
      );
      return new Error(
        " EERR1057: Error while adding getFavourite " + error.message
      );
    }
  },

  getUserUnits: async function (EvolveUser_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
        .query(
          " SELECT EC.EvolveCompany_Code ,   EUL.EvolveUnit_ID,EU.EvolveUnit_Code,ER.EvolveRole_Name FROM EvolveUserUnitLink EUL,EvolveUnit EU,EvolveRole ER , EvolveCompany EC WHERE EvolveUser_ID = @EvolveUser_ID AND EUL.EvolveUnit_ID = EU.EvolveUnit_ID AND EUL.EvolveRole_ID = ER.EvolveRole_ID AND EU.EvolveCompany_ID = ec.EvolveCompany_ID"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1057: Error while adding getUserUnits " + error.message
      );
      return new Error(
        " EERR1057: Error while adding getUserUnits " + error.message
      );
    }
  },

  addAction: async function (
    EvolveUser_ID,
    menuUrl,
    EvolveMenu_Id,
    EvolveMenuMonitor_IP,
    EvolveMenuMonitor_Device,
    actionType
  ) {
    try {
      console.log("EvolveUser_ID ::", EvolveUser_ID);
      console.log("menuUrl ::", menuUrl);
      console.log("EvolveMenu_Id ::", EvolveMenu_Id);

      let date = new Date();
      let datetime =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2) +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
      if (actionType == "ADD") {
        return await Evolve.SqlPool.request()
          .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
          .input("EvolveMenu_Id", Evolve.Sql.Int, EvolveMenu_Id)
          .input(
            "EvolveMenuMonitor_IP",
            Evolve.Sql.NVarChar,
            EvolveMenuMonitor_IP
          )
          .input("EvolveMenuMonitor_InTime", Evolve.Sql.NVarChar, datetime)
          .input(
            "EvolveMenuMonitor_Device",
            Evolve.Sql.NVarChar,
            EvolveMenuMonitor_Device
          )
          .query(
            "INSERT INTO EvolveMenuMonitor(EvolveUser_ID,EvolveMenu_Id,EvolveMenuMonitor_IP,EvolveMenuMonitor_InTime,EvolveMenuMonitor_Device) VALUES (@EvolveUser_ID,@EvolveMenu_Id,@EvolveMenuMonitor_IP,@EvolveMenuMonitor_InTime,@EvolveMenuMonitor_Device);"
          );
      } else {
        let checkMenuMonit = await Evolve.SqlPool.request()
          .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
          .input("EvolveMenu_Id", Evolve.Sql.Int, EvolveMenu_Id)
          .query(
            "SELECT TOP 1 EvolveMenuMonitor_ID FROM EvolveMenuMonitor WHERE EvolveUser_ID=@EvolveUser_ID AND EvolveMenu_Id=@EvolveMenu_Id ORDER BY EvolveMenuMonitor_ID DESC;"
          );
        if (
          checkMenuMonit instanceof Error ||
          checkMenuMonit.rowsAffected < 1
        ) {
          // Error Log Here
          return new Error("No Record Found.");
        } else {
          return await Evolve.SqlPool.request()
            .input(
              "EvolveMenuMonitor_ID",
              Evolve.Sql.Int,
              checkMenuMonit.recordset[0].EvolveMenuMonitor_ID
            )
            .input("EvolveMenuMonitor_OutTime", Evolve.Sql.NVarChar, datetime)

            .query(
              "UPDATE EvolveMenuMonitor SET EvolveMenuMonitor_OutTime =@EvolveMenuMonitor_OutTime WHERE EvolveMenuMonitor_ID =@EvolveMenuMonitor_ID;"
            );
        }
      }
    } catch (error) {
      Evolve.Log.error(
        " EERR1057: Error while adding getFavourite " + error.message
      );
      return new Error(
        " EERR1057: Error while adding getFavourite " + error.message
      );
    }
  },
  onFailedAttempts: async function (data) {
    try {
      let date = new Date();
      let datetime =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2) +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
      return await Evolve.SqlPool.request()
        .input(
          "EvolveLoginFailedAttempts_UserID",
          Evolve.Sql.NVarChar,
          data.EvolveLoginFailedAttempts_UserID
        )
        .input("EvolveLoginFailedAttempts_Time", Evolve.Sql.NVarChar, datetime)
        .input(
          "EvolveLoginFailedAttempts_IP",
          Evolve.Sql.NVarChar,
          data.EvolveLoginFailedAttempts_IP
        )
        .input(
          "EvolveLoginFailedAttempts_Device",
          Evolve.Sql.NVarChar,
          data.EvolveLoginFailedAttempts_Device
        )
        .input(
          "EvolveLoginFailedAttempts_Mac",
          Evolve.Sql.NVarChar,
          data.EvolveLoginFailedAttempts_Mac
        )
        .query(
          "INSERT INTO EvolveLoginFailedAttempts(EvolveLoginFailedAttempts_UserID,EvolveLoginFailedAttempts_Time,EvolveLoginFailedAttempts_IP,EvolveLoginFailedAttempts_Device,EvolveLoginFailedAttempts_Mac) VALUES (@EvolveLoginFailedAttempts_UserID,@EvolveLoginFailedAttempts_Time,@EvolveLoginFailedAttempts_IP,@EvolveLoginFailedAttempts_Device,@EvolveLoginFailedAttempts_Mac);"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1057: Error while adding onFailedAttempts " + error.message
      );
      return new Error(
        " EERR1057: Error while adding onFailedAttempts " + error.message
      );
    }
  },

  onLogin: async function (data) {
    try {
      let date = new Date();
      let datetime =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2) +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
      return await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.NVarChar, data.EvolveUser_ID)
        .input("EvolveLogin_InTime", Evolve.Sql.NVarChar, datetime)
        .input("EvolveLogin_IP", Evolve.Sql.NVarChar, data.EvolveLogin_IP)
        .input(
          "EvolveLogin_Device",
          Evolve.Sql.NVarChar,
          data.EvolveLogin_Device
        )
        .input("EvolveLogin_Mac", Evolve.Sql.NVarChar, data.EvolveLogin_Mac)
        .query(
          "INSERT INTO EvolveLogin(EvolveUser_ID,EvolveLogin_InTime,EvolveLogin_IP,EvolveLogin_Device,EvolveLogin_Mac) VALUES (@EvolveUser_ID,@EvolveLogin_InTime,@EvolveLogin_IP,@EvolveLogin_Device,@EvolveLogin_Mac);"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1057: Error while adding onLogin " + error.message
      );
      return new Error(
        " EERR1057: Error while adding onLogin " + error.message
      );
    }
  },
  onLogOut: async function (data) {
    try {
      let date = new Date();
      let datetime =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2) +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();

      let checkLogin = await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
        .query(
          "SELECT TOP 1 EvolveLogin_ID FROM EvolveLogin WHERE EvolveUser_ID=@EvolveUser_ID ORDER BY EvolveLogin_ID DESC;"
        );
      if (checkLogin instanceof Error || checkLogin.rowsAffected < 1) {
        // Error Log Here
        return new Error("No Record Found.");
      } else {
        return await Evolve.SqlPool.request()
          .input(
            "EvolveLogin_ID",
            Evolve.Sql.Int,
            checkLogin.recordset[0].EvolveLogin_ID
          )
          .input("EvolveLogin_OutTime", Evolve.Sql.NVarChar, datetime)
          .query(
            "UPDATE EvolveLogin SET EvolveLogin_OutTime =@EvolveLogin_OutTime WHERE EvolveLogin_ID =@EvolveLogin_ID;"
          );
      }
    } catch (error) {
      Evolve.Log.error(
        " EERR1057: Error while adding onLogin " + error.message
      );
      return new Error(
        " EERR1057: Error while adding onLogin " + error.message
      );
    }
  },

  getuserCompanyList: async function (EvolveUser_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
        .query(
          "SELECT  DISTINCT(ec.EvolveCompany_ID) ,ec.EvolveCompany_Code  FROM EvolveUserUnitLink euserUnit , EvolveCompany ec ,  EvolveUnit eunit  WHERE   EvolveUser_ID =@EvolveUser_ID AND euserUnit.EvolveUnit_ID = eunit.EvolveUnit_ID AND eunit.EvolveCompany_ID = ec.EvolveCompany_ID  "
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR####: Error while Get User Comapany List " + error.message
      );
      return new Error(
        " EERR####: Error while Get User Comapany List " + error.message
      );
    }
  },

  addTransHistory: async function (data) {
    try {
      let dateTime =
        await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrders_OrderNo",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrders_OrderNo
        )
        .input(
          "EvolveProdOrders_OrderID",
          Evolve.Sql.NVarChar,
          data.EvolveProdOrders_OrderID
        )
        .input("EvolveItem_Part", Evolve.Sql.NVarChar, data.EvolveItem_Part)
        .input(
          "EvolveLocation_Code",
          Evolve.Sql.NVarChar,
          data.EvolveLocation_Code
        )
        .input(
          "EvolveTransHistory_Qty",
          Evolve.Sql.NVarChar,
          data.EvolveTransHistory_Qty
        )
        .input(
          "EvolveInventory_SerialNo",
          Evolve.Sql.NVarChar,
          data.EvolveInventory_SerialNo
        )

        .input(
          "EvolveTransHistory_BatchNo",
          Evolve.Sql.NVarChar,
          data.EvolveTransHistory_BatchNo
        )
        .input(
          "EvolveTransHistory_LotSerialNo",
          Evolve.Sql.NVarChar,
          data.EvolveTransHistory_LotSerialNo
        )
        .input(
          "EvolveTransHistory_Type",
          Evolve.Sql.NVarChar,
          data.EvolveTransHistory_Type
        )

        .input("EvolveTransHistory_CreatedAt", Evolve.Sql.NVarChar, dateTime)
        .input(
          "EvolveTransHistory_CreatedUser",
          Evolve.Sql.NVarChar,
          data.EvolveUser_ID
        )
        .input("EvolveTransHistory_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
        .input(
          "EvolveTransHistory_UpdatedUser",
          Evolve.Sql.NVarChar,
          data.EvolveUser_ID
        )

        .query(
          "INSERT INTO EvolveTransHistory (EvolveProdOrders_OrderNo , EvolveProdOrders_OrderID ,EvolveItem_Part ,EvolveLocation_Code,EvolveTransHistory_CreatedAt,EvolveTransHistory_CreatedUser,EvolveTransHistory_UpdatedAt,EvolveTransHistory_UpdatedUser ,EvolveTransHistory_Qty,EvolveInventory_SerialNo,EvolveTransHistory_Type,EvolveTransHistory_BatchNo,EvolveTransHistory_LotSerialNo) VALUES (@EvolveProdOrders_OrderNo , @EvolveProdOrders_OrderID , @EvolveItem_Part , @EvolveLocation_Code,@EvolveTransHistory_CreatedAt,@EvolveTransHistory_CreatedUser,@EvolveTransHistory_UpdatedAt,@EvolveTransHistory_UpdatedUser,@EvolveTransHistory_Qty,@EvolveInventory_SerialNo,@EvolveTransHistory_Type,@EvolveTransHistory_BatchNo,@EvolveTransHistory_LotSerialNo)"
        );
    } catch (error) {
      Evolve.Log.error(
        "EERR#### : Error While Insert transaction History " + error.message
      );
      return new Error(
        "EERR#### : Error While Insert transaction History " + error.message
      );
    }
  },
  getApprovalMatrixList: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveApprovalMatrixIndex_Seq",
          Evolve.Sql.NVarChar,
          data.EvolveApprovalMatrixIndex_Seq
        )

        .query(
          "SELECT eapi.* , eapm.EvolveApprovalMatrix_Type  ,  eapm.EvolveApprovalMatrix_Name  ,  eapm.EvolveApprovalMatrix_Code  ,  eapm.EvolveApprovalMatrix_IsEmailNotif  ,  eapm.EvolveApprovalMatrix_IsMessageNotif  ,  eapm.EvolveApprovalMatrix_IsWPMessageNotif , eapm.EvolveApprovalMatrix_IsQxtendReq ,  eapm.EvolveApprovalMatrix_Status  FROM EvolveApprovalMatrixIndex  eapi  ,EvolveApprovalMatrix eapm WHERE  EvolveApprovalMatrixIndex_Seq=@EvolveApprovalMatrixIndex_Seq " +
            data.condition +
            " AND eapi.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID  AND eapm.EvolveApprovalMatrix_Status=1"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR#### : Error while get matrix details list " + error.message
      );
      return new Error(
        " EERR#### : Error while get matrix details list " + error.message
      );
    }
  },

  checkApprovalProcess: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveApprovalProcess_PrimaryID",
          Evolve.Sql.Int,
          data.EvolveApprovalProcess_PrimaryID
        )
        .input(
          "EvolveApprovalMatrix_Type",
          Evolve.Sql.NVarChar,
          data.EvolveApprovalMatrix_Type
        )

        .query(
          "SELECT  eap.* , eapm.EvolveApprovalMatrix_Type FROM EvolveApprovalProcess eap  ,  EvolveApprovalMatrix eapm WHERE eap.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID  AND eap.EvolveApprovalProcess_PrimaryID = @EvolveApprovalProcess_PrimaryID AND  eapm.EvolveApprovalMatrix_Type = @EvolveApprovalMatrix_Type"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR####: Error while check Approval Process " + error.message
      );
      return new Error(
        " EERR####: Error while check Approval Process " + error.message
      );
    }
  },

  updateApprovalProcessSeq: async function (data) {
    try {
      let datetime =
        await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

      return await Evolve.SqlPool.request()
        .input(
          "EvolveApprovalProcess_ID",
          Evolve.Sql.Int,
          data.EvolveApprovalProcess_ID
        )
        .input("EvolveApprovalProcess_CurrentIndex", Evolve.Sql.Int, 2)
        .input("EvolveApprovalProcess_Status", Evolve.Sql.NVarChar, "PROCESS")
        .input("EvolveApprovalProcess_ErrorCode", Evolve.Sql.NVarChar, "")
        .input("EvolveApprovalProcess_ErrorDetails", Evolve.Sql.NVarChar, "")
        .input(
          "EvolveApprovalMatrix_ID",
          Evolve.Sql.NVarChar,
          data.EvolveApprovalMatrix_ID
        )
        .input("EvolveApprovalProcess_IsOnGroundLevel", Evolve.Sql.Int, 0)
        .input("EvolveApprovalProcess_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input(
          "EvolveApprovalProcess_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )

        .query(
          "UPDATE EvolveApprovalProcess SET  EvolveApprovalProcess_CurrentIndex = @EvolveApprovalProcess_CurrentIndex ,EvolveApprovalProcess_Status=@EvolveApprovalProcess_Status ,EvolveApprovalProcess_ErrorCode=@EvolveApprovalProcess_ErrorCode ,EvolveApprovalProcess_ErrorDetails=@EvolveApprovalProcess_ErrorDetails, EvolveApprovalMatrix_ID=@EvolveApprovalMatrix_ID ,EvolveApprovalProcess_IsOnGroundLevel=@EvolveApprovalProcess_IsOnGroundLevel , EvolveApprovalProcess_UpdatedAt=@EvolveApprovalProcess_UpdatedAt ,EvolveApprovalProcess_UpdatedUser=@EvolveApprovalProcess_UpdatedUser WHERE EvolveApprovalProcess_ID=@EvolveApprovalProcess_ID  "
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR####: Error while update approval process seq " + error.message
      );
      return new Error(
        " EERR####: Error while update approval process seq " + error.message
      );
    }
  },
  submitToApprovelProcess: async function (data) {
    try {
      let datetime =
        await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

      return await Evolve.SqlPool.request()
        .input(
          "EvolveApprovalMatrix_ID",
          Evolve.Sql.Int,
          data.EvolveApprovalMatrix_ID
        )
        .input(
          "EvolveApprovalProcess_PrimaryID",
          Evolve.Sql.Int,
          data.EvolveApprovalProcess_PrimaryID
        )
        .input("EvolveApprovalProcess_Status", Evolve.Sql.NVarChar, "PROCESS")
        .input("EvolveApprovalProcess_ErrorCode", Evolve.Sql.NVarChar, "")
        .input("EvolveApprovalProcess_ErrorDetails", Evolve.Sql.NVarChar, "")

        .input("EvolveApprovalProcess_CurrentIndex", Evolve.Sql.Int, 2)
        .input("EvolveApprovalProcess_IsOnGroundLevel", Evolve.Sql.Int, 0)

        .input("EvolveApprovalProcess_CreatedAt", Evolve.Sql.NVarChar, datetime)
        .input(
          "EvolveApprovalProcess_CreatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input("EvolveApprovalProcess_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input(
          "EvolveApprovalProcess_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .query(
          " INSERT INTO EvolveApprovalProcess (EvolveApprovalMatrix_ID, EvolveApprovalProcess_PrimaryID, EvolveApprovalProcess_Status ,EvolveApprovalProcess_ErrorCode,EvolveApprovalProcess_ErrorDetails, EvolveApprovalProcess_CurrentIndex,EvolveApprovalProcess_IsOnGroundLevel ,EvolveApprovalProcess_CreatedAt, EvolveApprovalProcess_CreatedUser, EvolveApprovalProcess_UpdatedAt, EvolveApprovalProcess_UpdatedUser ) VALUES (@EvolveApprovalMatrix_ID, @EvolveApprovalProcess_PrimaryID, @EvolveApprovalProcess_Status ,@EvolveApprovalProcess_ErrorCode , @EvolveApprovalProcess_ErrorDetails , @EvolveApprovalProcess_CurrentIndex ,@EvolveApprovalProcess_IsOnGroundLevel , @EvolveApprovalProcess_CreatedAt,@EvolveApprovalProcess_CreatedUser,@EvolveApprovalProcess_UpdatedAt, @EvolveApprovalProcess_UpdatedUser) ;select @@IDENTITY AS 'inserted_id' "
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR####: Error while sales quote submit to approvel process " +
          error.message
      );
      return new Error(
        " EERR####: Error while sales quote submit to approvel process " +
          error.message
      );
    }
  },

  addApprovalProcessetails: async function (data) {
    try {
      let datetime =
        await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

      return await Evolve.SqlPool.request()
        .input(
          "EvolveApprovalProcess_ID",
          Evolve.Sql.Int,
          data.EvolveApprovalProcess_ID
        )
        .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
        .input(
          "EvolveApprovalProcessDetails_Status",
          Evolve.Sql.NVarChar,
          data.EvolveApprovalProcessDetails_Status
        )
        .input("EvolveApprovalProcessDetails_Remarks", Evolve.Sql.NVarChar, "")

        .input(
          "EvolveApprovalProcessDetails_CreatedAt",
          Evolve.Sql.NVarChar,
          datetime
        )
        .input(
          "EvolveApprovalProcessDetails_CreatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input(
          "EvolveApprovalProcessDetails_UpdatedAt",
          Evolve.Sql.NVarChar,
          datetime
        )
        .input(
          "EvolveApprovalProcessDetails_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .query(
          "INSERT INTO EvolveApprovalProcessDetails (EvolveApprovalProcess_ID, EvolveUser_ID, EvolveApprovalProcessDetails_Status  ,EvolveApprovalProcessDetails_Remarks,EvolveApprovalProcessDetails_CreatedAt, EvolveApprovalProcessDetails_CreatedUser, EvolveApprovalProcessDetails_UpdatedAt, EvolveApprovalProcessDetails_UpdatedUser) VALUES (@EvolveApprovalProcess_ID, @EvolveUser_ID, @EvolveApprovalProcessDetails_Status,@EvolveApprovalProcessDetails_Remarks,@EvolveApprovalProcessDetails_CreatedAt, @EvolveApprovalProcessDetails_CreatedUser, @EvolveApprovalProcessDetails_UpdatedAt, @EvolveApprovalProcessDetails_UpdatedUser)"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR####: Error while add approval process details " + error.message
      );
      return new Error(
        " EERR####: Error while add approval process details " + error.message
      );
    }
  },

  getPrinterList: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT * FROM EvolvePrinter"
      );
    } catch (error) {
      Evolve.Log.error(
        " EERR1114: Error while getting Supplier List " + error.message
      );
      return new Error(
        " EERR1114: Error while getting Supplier List " + error.message
      );
    }
  },

  changeUserUnitInDB: async function (unitId, userId) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveUser_LastSelectedUnit", Evolve.Sql.Int, unitId)
        .input("EvolveUser_ID", Evolve.Sql.Int, userId)
        .query(
          "UPDATE EvolveUser SET EvolveUser_LastSelectedUnit = @EvolveUser_LastSelectedUnit WHERE EvolveUser_ID = @EvolveUser_ID"
        );
    } catch (error) {
      Evolve.Log.error(
        " EERR1114: Error while getting Supplier List " + error.message
      );
      return new Error(
        " EERR1114: Error while getting Supplier List " + error.message
      );
    }
  },

  changeUserLangInDB: async function (EvolveLanguage_ID, EvolveUser_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveLanguage_ID", Evolve.Sql.Int, EvolveLanguage_ID)
        .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
        .query(
          "UPDATE EvolveUser SET EvolveLanguage_ID = @EvolveLanguage_ID WHERE EvolveUser_ID = @EvolveUser_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1114: Error while Chnage Lange  " + error.message);
      return new Error(" EERR1114: Error while Chnage Lange  " + error.message);
    }
  },

  getUomConversion: async function (data) {
    try {
      if (data.EvolveItem_ID != null) {
        return await Evolve.SqlPool.request()
          .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
          .input("EvolveUom_ID", Evolve.Sql.Int, data.EvolveUom_ID)
          .input("EvolveUom_AltID", Evolve.Sql.Int, data.EvolveUom_AltID)
          .query(
            "SELECT EvolveUomConv_Value FROM EvolveUomConv WHERE EvolveItem_ID = @EvolveItem_ID AND EvolveUom_ID =@EvolveUom_ID  AND EvolveUom_AltID = @EvolveUom_AltID"
          );
      } else {
        return await Evolve.SqlPool.request()
          .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
          .input("EvolveUom_ID", Evolve.Sql.Int, data.EvolveUom_ID)
          .input("EvolveUom_AltID", Evolve.Sql.Int, data.EvolveUom_AltID)
          .query(
            "SELECT EvolveUomConv_Value FROM EvolveUomConv WHERE  EvolveUom_ID =@EvolveUom_ID  AND EvolveUom_AltID =@EvolveUom_AltID	"
          );
      }
    } catch (error) {
      Evolve.Log.error(
        " EERR1114: Error while getting Supplier List " + error.message
      );
      return new Error(
        " EERR1114: Error while getting Supplier List " + error.message
      );
    }
  },

  getTranslation: async function (EvolveLanguage_ID, EvolvelLabel_KeyWord) {
    try {
      let translationData = await Evolve.SqlPool.request()
        .input("EvolveLanguage_ID", Evolve.Sql.Int, EvolveLanguage_ID)
        .input(
          "EvolvelLabel_KeyWord",
          Evolve.Sql.NVarChar,
          EvolvelLabel_KeyWord
        )
        .query(
          "SELECT EvolveLabel_Term FROM EvolveLabel WHERE EvolveLanguage_ID = @EvolveLanguage_ID AND EvolvelLabel_KeyWord = @EvolvelLabel_KeyWord"
        );

      if (
        translationData instanceof Error ||
        translationData.rowsAffected < 1
      ) {
        // Error Log Here
        return EvolvelLabel_KeyWord;
      } else {
        return translationData.recordset[0].EvolveLabel_Term;
      }
    } catch (error) {
      Evolve.Log.error(
        " EERR1042: Error while getting translate " + error.message
      );
      return new Error(
        " EERR1042: Error while getting translate " + error.message
      );
    }
  },
};
