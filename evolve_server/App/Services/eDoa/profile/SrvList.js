'use strict';

const Evolve = require('../../../../Boot/Evolve');

module.exports = {
    async getProfileListCount (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveProfile_ID) AS count FROM EvolveProfile WHERE  EvolveProfile_code LIKE @search");
        }
        catch (err) {
            console.log(err);
            Evolve.Log.error("Error while get profile list "+error.message);
            return new Error("Error while get profile list "+error.message);
        }
    },

    async getProfileList (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
            .input('start', Evolve.Sql.Int, start)
            .input('length', Evolve.Sql.Int, length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT * FROM EvolveProfile WHERE EvolveProfile_code LIKE @search ORDER BY EvolveProfile_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY;");
        }
        catch (err) {
            console.log(err);
            Evolve.Log.error("Error while get tax class list "+error.message);
            return new Error("Error while get tax class list "+error.message);
        }
    },

    async addTaxClassItem (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

        try {
            const pool = Evolve.SqlPool.request()
                .input('EvolveTaxClass_Code', Evolve.Sql.NVarChar, data.EvolveTaxClass_Code)
                .input('EvolveTaxClass_Description', Evolve.Sql.NVarChar, data.EvolveTaxClass_Description)
                .input('EvolveTaxClass_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveTaxClass_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveTaxClass_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveTaxClass_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID);

            return await pool.query("INSERT INTO EvolveTaxClass (EvolveTaxClass_Code, EvolveTaxClass_Description, EvolveTaxClass_CreatedAt, EvolveTaxClass_CreatedUser, EvolveTaxClass_UpdatedUser, EvolveTaxClass_UpdatedAt) VALUES (@EvolveTaxClass_Code, @EvolveTaxClass_Description, @EvolveTaxClass_CreatedAt, @EvolveTaxClass_CreatedUser, @EvolveTaxClass_UpdatedUser, @EvolveTaxClass_UpdatedAt);");
        }
        catch (error) {
            console.log(error)
            Evolve.Log.error(" EERR3039: Erorr while add Tax class item "+error.message);
            return new Error(" EERR3039: Erorr while add Tax class item "+error.message);
        }
    },

    checkprofileExits : async function (EvolveDBSet_code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDBSet_code', Evolve.Sql.NVarChar, EvolveDBSet_code)
                .query(" SELECT * FROM EvolveDBSet WHERE EvolveDBSet_code = @EvolveDBSet_code ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check day book set exits "+error.message);
            return new Error(" EERR####: Error while check day book set exits "+error.message);
        }
    },

    addprofile: async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        // data.EvolveCreditTerms_BaseDate = data.EvolveCreditTerms_BaseDate.split("/").reverse().join("/").replace("/", "/");
        // data.EvolveCreditTerms_BaseDays = data.EvolveCreditTerms_BaseDays.split("/").reverse().join("/").replace("/", "/");
        // data.EvolveCreditTerms_DiscountDate = data.EvolveCreditTerms_DiscountDate.split("/").reverse().join("/").replace("/", "/");
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProfile_code', Evolve.Sql.NVarChar, data['Profile Code'])
                .input('EvolveProfile_desc', Evolve.Sql.NVarChar, data['Description'])
                .input('EvolveProfile_isActive', Evolve.Sql.NVarChar, (data['Act'] != undefined && data['Act'] != "" && data['Act'] != null ) ? data['Act'].toLowerCase() :'' )
                .input('EvolveProfile_Type', Evolve.Sql.NVarChar, data['Profile Type'])
                .input('EvolveProfile_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveProfile_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .input('EvolveProfile_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveProfile_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .query(' INSERT INTO EvolveProfile (EvolveProfile_code, EvolveProfile_desc, EvolveProfile_isActive , EvolveProfile_Type , EvolveProfile_UpdatedAt, EvolveProfile_UpdatedUser, EvolveProfile_CreatedAt, EvolveProfile_CreatedUser) VALUES (@EvolveProfile_code, @EvolveProfile_desc, @EvolveProfile_isActive , @EvolveProfile_Type , @EvolveProfile_UpdatedAt, @EvolveProfile_UpdatedUser, @EvolveProfile_CreatedAt, @EvolveProfile_CreatedUser) ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add Day Book Set "+error.message);
            return new Error(" EERR####: Erorr while add Day Book Set "+error.message);
        }
    },

    updateDayBookSet : async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        // data.EvolveCreditTerms_BaseDate = data.EvolveCreditTerms_BaseDate.split("/").reverse().join("/").replace("/", "/");
        // data.EvolveCreditTerms_BaseDays = data.EvolveCreditTerms_BaseDays.split("/").reverse().join("/").replace("/", "/");
        // data.EvolveCreditTerms_DiscountDate = data.EvolveCreditTerms_DiscountDate.split("/").reverse().join("/").replace("/", "/");
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProfile_ID', Evolve.Sql.Int, data.EvolveProfile_ID)
                .input('EvolveProfile_code', Evolve.Sql.NVarChar, data['Profile Code'])
                .input('EvolveProfile_desc', Evolve.Sql.NVarChar, data['Description'])
                .input('EvolveProfile_isActive', Evolve.Sql.NVarChar, (data['Act'] != undefined && data['Act'] != "" && data['Act'] != null ) ? data['Act'].toLowerCase() :'' )
                .input('EvolveProfile_Type', Evolve.Sql.NVarChar, data['Profile Type'])
                .input('EvolveProfile_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('    ', Evolve.Sql.Int, EvolveUser_ID)
                .query(' UPDATE EvolveProfile SET EvolveProfile_code = @EvolveProfile_code, EvolveProfile_desc = @EvolveProfile_desc,EvolveProfile_UpdatedAt = @EvolveProfile_UpdatedAt, EvolveProfile_UpdatedUser = @EvolveProfile_UpdatedUser , EvolveProfile_Type = @EvolveProfile_Type , EvolveProfile_isActive = @EvolveProfile_isActive WHERE EvolveProfile_ID = @EvolveProfile_ID ');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while Update Day Book Set "+error.message);
            return new Error(" EERR####:  Erorr while Update Day Book Set "+error.message);
        }
    },
};