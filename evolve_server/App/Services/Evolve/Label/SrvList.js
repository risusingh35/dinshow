'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getLanguageList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveLanguage_Title,EvolveLanguage_Code, EvolveLanguage_ID FROM EvolveLanguage WHERE EvolveLanguage_Active = 1');
        } catch (error) {
            Evolve.Log.error(" EERR1275: Error while  getting Language List "+error.message);
            return new Error(" EERR1275: Error while  getting Language List "+error.message);
        }
    },
    getLabelList: async function (data) {
        try {
            if (data.EvolveLabel_Term != '' && data.EvolveLabel_Term != undefined) {
                let getkeyword = await Evolve.SqlPool.request()
                    .input('EvolveLabel_Term', Evolve.Sql.NVarChar, data.EvolveLabel_Term)
                    .query('SELECT EvolvelLabel_KeyWord FROM EvolveLabel WHERE EvolveLanguage_ID = 1 AND EvolveLabel_Term = @EvolveLabel_Term');

                if (getkeyword.rowsAffected > 0) {
                    let EvolvelLabel_KeyWord = getkeyword.recordset[0].EvolvelLabel_KeyWord;
                    return await Evolve.SqlPool.request()
                        .input('EvolvelLabel_KeyWord', Evolve.Sql.NVarChar, EvolvelLabel_KeyWord)
                        .query('SELECT TOP 50 el.EvolveLabel_ID, el.EvolvelLabel_KeyWord,elang.EvolveLanguage_ID,el.EvolveLabel_Term FROM EvolveLabel el, EvolveLanguage elang WHERE el.EvolveLanguage_ID = elang.EvolveLanguage_ID AND el.EvolvelLabel_KeyWord = @EvolvelLabel_KeyWord ORDER BY el.EvolvelLabel_KeyWord DESC');
                }
                else {
                    return await Evolve.SqlPool.request()
                        .input('EvolveLabel_Term', Evolve.Sql.NVarChar, data.EvolveLabel_Term)
                        .query('SELECT TOP 50 el.EvolveLabel_ID, el.EvolvelLabel_KeyWord,elang.EvolveLanguage_ID,el.EvolveLabel_Term FROM EvolveLabel el, EvolveLanguage elang WHERE el.EvolveLanguage_ID = elang.EvolveLanguage_ID AND el.EvolvelLabel_KeyWord = @EvolveLabel_Term ORDER BY el.EvolvelLabel_KeyWord DESC');
                }

            } else {

                console.log("ENTERED IN ELSE???? ")
                return await Evolve.SqlPool.request()
                    .query('SELECT TOP 50 el.EvolveLabel_ID, el.EvolvelLabel_KeyWord,elang.EvolveLanguage_ID,el.EvolveLabel_Term FROM EvolveLabel el, EvolveLanguage elang WHERE el.EvolveLanguage_ID = elang.EvolveLanguage_ID ORDER BY el.EvolvelLabel_KeyWord DESC');
            }

        } catch (error) {
            Evolve.Log.error(" EERR1276: Error while  getting Label List "+error.message);
            return new Error(" EERR1276: Error while  getting Label List "+error.message);
        }
    },
    getSingleLabelDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvelLabel_KeyWord', Evolve.Sql.NVarChar, data.EvolvelLabel_KeyWord)
                .query("  SELECT  elabel.EvolveLabel_ID ,  elabel.EvolvelLabel_KeyWord ,  elang.EvolveLanguage_ID , elang.EvolveLanguage_Code  ,  elang.EvolveLanguage_Title ,   EvolveLabel_Term as term  FROM EvolveLabel elabel , EvolveLanguage elang WHERE elabel.EvolveLanguage_ID = elang.EvolveLanguage_ID AND elabel.EvolvelLabel_KeyWord  = @EvolvelLabel_KeyWord ");
        } catch (error) {
            Evolve.Log.error(" EERR1277: Error while getting Single Label List "+error.message);
            return new Error(" EERR1277: Error while getting Single Label List "+error.message);
        }
    },
    deleteLabel: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvelLabel_KeyWord', Evolve.Sql.NVarChar, data.EvolvelLabel_KeyWord)
                .query('DELETE FROM EvolveLabel WHERE EvolvelLabel_KeyWord = @EvolvelLabel_KeyWord');
        } catch (error) {
            Evolve.Log.error(" EERR1278: Error while deleting Label "+error.message);
            return new Error(" EERR1278: Error while deleting Label "+error.message);
        }
    },

    getAllLanguageList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * , '' as term FROM EvolveLanguage WHERE EvolveLanguage_Active = '1'");
        } catch (error) {
            Evolve.Log.error(" EERR1279: Error while getting All Language List "+error.message);
            return new Error(" EERR1279: Error while getting All Language List "+error.message);
        }
    },

    updateLabelList: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveLabel_ID', Evolve.Sql.Int, data.EvolveLabel_ID)
                // .input('EvolvelLabel_KeyWord', Evolve.Sql.NVarChar, data.EvolvelLabel_KeyWord)
                // .input('EvolveLanguage_ID', Evolve.Sql.Int, data.EvolveLanguage_ID)
                .input('EvolveLabel_Term', Evolve.Sql.NVarChar, data.EvolveLabel_Term)
                .query('UPDATE EvolveLabel SET   EvolveLabel_Term = @EvolveLabel_Term  WHERE EvolveLabel_ID = @EvolveLabel_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1280: Error while updating Label List "+error.message);
            return new Error(" EERR1280: Error while updating Label List "+error.message);
        }
    },
    addLabelList: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvelLabel_KeyWord', Evolve.Sql.NVarChar, data.EvolvelLabel_KeyWord)
                .input('EvolveLanguage_ID', Evolve.Sql.Int, data.EvolveLanguage_ID)
                .input('EvolveLabel_Term', Evolve.Sql.NVarChar, data.EvolveLabel_Term)
                .input('EvolveLabel_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveLabel_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveLabel_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveLabel_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveLabel(EvolvelLabel_KeyWord, EvolveLanguage_ID, EvolveLabel_Term , EvolveLabel_CreatedAt ,EvolveLabel_CreatedUser , EvolveLabel_UpdatedAt , EvolveLabel_UpdatedUser ) VALUES (@EvolvelLabel_KeyWord, @EvolveLanguage_ID, @EvolveLabel_Term , @EvolveLabel_CreatedAt ,@EvolveLabel_CreatedUser ,  @EvolveLabel_UpdatedAt  ,@EvolveLabel_UpdatedUser )');
        } catch (error) {
            Evolve.Log.error(" EERR1281: Error while adding Label List "+error.message);
            return new Error(" EERR1281: Error while adding Label List "+error.message);
        }
    },

    updateLabelList: async function (data) {
        try {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            return await Evolve.SqlPool.request()
                .input('EvolveLabel_ID', Evolve.Sql.Int, data.EvolveLabel_ID)
                .input('EvolveLabel_Term', Evolve.Sql.NVarChar, data.EvolveLabel_Term)
                .input('EvolveLabel_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveLabel_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveLabel SET EvolveLabel_Term=@EvolveLabel_Term  ,  EvolveLabel_UpdatedAt =@EvolveLabel_UpdatedAt  ,EvolveLabel_UpdatedUser=@EvolveLabel_UpdatedUser  WHERE EvolveLabel_ID=@EvolveLabel_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR1281: Error while upate Label List "+error.message);
            return new Error(" EERR1281: Error while upate Label List "+error.message);
        }
    },



    getKeywordUrl: async function (search) {
        try {
            let query = "SELECT EvolvelLabel_KeyWord as title, EvolveLabel_ID as id FROM EvolveLabel WHERE EvolvelLabel_KeyWord LIKE '%" + search + "%'"
            return await Evolve.SqlPool.request().query(query);
        } catch (error) {
            Evolve.Log.error(" EERR1282: Error whle getting Keyword Url "+error.message);
            return new Error(" EERR1282: Error whle getting Keyword Url "+error.message);
        }
    },
    getLanguageName: async function (data) {
        console.log('data', data)
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveLanguage_ID', Evolve.Sql.Int, data.EvolveLanguage_ID)
                .query('SELECT EvolveLanguage_Title, EvolveLanguage_ID FROM EvolveLanguage WHERE EvolveLanguage_ID = @EvolveLanguage_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1283: Error while  getting Language Name "+error.message);
            return new Error(" EERR1283: Error while  getting Language Name "+error.message);
        }
    },
    getLableFilterData: async function (lanArry) {
        try {
            let query = 'SELECT el.EvolveLabel_ID, el.EvolvelLabel_KeyWord,elang.EvolveLanguage_ID,el.EvolveLabel_Term FROM EvolveLabel el, EvolveLanguage elang WHERE el.EvolveLanguage_ID IN (' + lanArry + ') AND el.EvolveLanguage_ID = elang.EvolveLanguage_ID';
            console.log("query :", query)
            return await Evolve.SqlPool.request().query(query);
        } catch (error) {
            Evolve.Log.error(" EERR1284: Error while getting Lable Filter Data "+error.message);
            return new Error(" EERR1284: Error while getting Lable Filter Data "+error.message);
        }
    },
    checkKeywordExists: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvelLabel_KeyWord', Evolve.Sql.NVarChar, data.EvolvelLabel_KeyWord)
                .query('SELECT EvolvelLabel_KeyWord FROM EvolveLabel WHERE EvolvelLabel_KeyWord = @EvolvelLabel_KeyWord');
        } catch (error) {
            Evolve.Log.error(" EERR1285: Error while checking Keyword Exists "+error.message);
            return new Error(" EERR1285: Error while checking Keyword Exists "+error.message);
        }
    },

    updateLanguageLable: async function (EvolvelLabel_KeyWord, EvolveLanguage_ID, EvolveLabel_Term) {
        // let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        // console.log("EvolvelLabel_KeyWord :", EvolvelLabel_KeyWord)
        // console.log("EvolveLanguage_ID :", EvolveLanguage_ID)
        // console.log("EvolveLabel_Term :", EvolveLabel_Term)
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

        try {

            let responce = await Evolve.SqlPool.request()
                .input('EvolvelLabel_KeyWord', Evolve.Sql.NVarChar, EvolvelLabel_KeyWord)
                .input('EvolveLanguage_ID', Evolve.Sql.Int, EvolveLanguage_ID)
                .input('EvolveLabel_Term', Evolve.Sql.NVarChar, EvolveLabel_Term)
                .query('UPDATE EvolveLabel SET EvolveLabel_Term=@EvolveLabel_Term WHERE EvolvelLabel_KeyWord LIKE @EvolvelLabel_KeyWord AND EvolveLanguage_ID=@EvolveLanguage_ID');
            if (responce instanceof Error) {
                return new Error('Error on Insert Lable Data');
            } else if (responce.rowsAffected == 0) {
                // Insert New Record
                return await Evolve.SqlPool.request()
                    .input('EvolvelLabel_KeyWord', Evolve.Sql.NVarChar, EvolvelLabel_KeyWord)
                    .input('EvolveLanguage_ID', Evolve.Sql.Int, EvolveLanguage_ID)
                    .input('EvolveLabel_Term', Evolve.Sql.NVarChar, EvolveLabel_Term)
                    .query('INSERT INTO EvolveLabel(EvolvelLabel_KeyWord, EvolveLanguage_ID, EvolveLabel_Term) VALUES (@EvolvelLabel_KeyWord, @EvolveLanguage_ID, @EvolveLabel_Term)');
            } else {
                return responce;
            }


        } catch (error) {
            Evolve.Log.error(" EERR1286: Error while  updating Language Lable "+error.message);
            return new Error(" EERR1286: Error while  updating Language Lable "+error.message);
        }
    },

    addChildLabel: async function (data) {
        console.log("data///" ,  data)
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveLabel_ID', Evolve.Sql.Int, data.EvolveLabel_ID)
                .input('EvolveLabelDetails_PageUrl', Evolve.Sql.NVarChar, data.EvolveLabelDetails_PageUrl)
                .input('EvolveLabelDetails_Term', Evolve.Sql.NVarChar, data.EvolveLabelDetails_Term)
                .input('EvolveLabelDetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveLabelDetails_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveLabelDetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveLabelDetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
              
                .query('INSERT INTO EvolveLabelDetails(EvolveLabel_ID, EvolveLabelDetails_PageUrl, EvolveLabelDetails_Term ,  EvolveLabelDetails_CreatedAt , EvolveLabelDetails_CreatedUser ,   EvolveLabelDetails_UpdatedAt ,  EvolveLabelDetails_UpdatedUser ) VALUES (@EvolveLabel_ID, @EvolveLabelDetails_PageUrl, @EvolveLabelDetails_Term ,  @EvolveLabelDetails_CreatedAt , @EvolveLabelDetails_CreatedUser ,   @EvolveLabelDetails_UpdatedAt ,  @EvolveLabelDetails_UpdatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR1281: Error while adding Label List "+error.message);
            return new Error(" EERR1281: Error while adding Label List "+error.message);
        }
    },


    
    getChildLabelList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvelLabel_KeyWord', Evolve.Sql.NVarChar, data.EvolvelLabel_KeyWord)
                .query("  SELECT  labeld.EvolveLabelDetails_Id ,  labeld.EvolveLabelDetails_PageUrl ,   el.EvolveLabel_ID, el.EvolvelLabel_KeyWord,elang.EvolveLanguage_ID,labeld.EvolveLabelDetails_Term FROM EvolveLabel el, EvolveLanguage elang  , EvolveLabelDetails labeld  WHERE el.EvolveLanguage_ID = elang.EvolveLanguage_ID AND labeld.EvolveLabel_ID =el.EvolveLabel_ID  AND el.EvolvelLabel_KeyWord = '' ORDER  BY   labeld.EvolveLabelDetails_Id DESC");
        } catch (error) {
            Evolve.Log.error(" EERR1281: Error while get Child Label List "+error.message);
            return new Error(" EERR1281: Error while get Child Label List "+error.message);
        }
    },


    





}