'use strict';

const Evolve = require('../../../../Boot/Evolve');

module.exports = {
    async getTaxClassListCount (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveTaxClass_ID) AS count FROM EvolveTaxClass WHERE  EvolveTaxClass_Code LIKE @search");
        }
        catch (err) {
            console.log(err);
            Evolve.Log.error("Error while get tax class list "+error.message);
            return new Error("Error while get tax class list "+error.message);
        }
    },

    async getTaxClassList (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
            .input('start', Evolve.Sql.Int, start)
            .input('length', Evolve.Sql.Int, length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT * FROM EvolveTaxClass WHERE EvolveTaxClass_Code LIKE @search ORDER BY EvolveTaxClass_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY;");
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

    checkTaxClassExist : async function (EvolveTaxClass_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveTaxClass_Code', Evolve.Sql.NVarChar, EvolveTaxClass_Code)
                .query(" SELECT * FROM EvolveTaxClass WHERE EvolveTaxClass_Code = @EvolveTaxClass_Code ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check tax class code exist or not "+error.message);
            return new Error(" EERR####: Error while check tax class code exist or not "+error.message);
        }
    },

    addTaxClass: async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        // data.EvolveCreditTerms_BaseDate = data.EvolveCreditTerms_BaseDate.split("/").reverse().join("/").replace("/", "/");
        // data.EvolveCreditTerms_BaseDays = data.EvolveCreditTerms_BaseDays.split("/").reverse().join("/").replace("/", "/");
        // data.EvolveCreditTerms_DiscountDate = data.EvolveCreditTerms_DiscountDate.split("/").reverse().join("/").replace("/", "/");
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveTaxClass_Code', Evolve.Sql.NVarChar, data['Class'])
                .input('EvolveTaxClass_Description', Evolve.Sql.NVarChar, data['Description'])
                .input('EvolveTaxClass_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveTaxClass_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .input('EvolveTaxClass_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveTaxClass_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .query(' INSERT INTO EvolveTaxClass (EvolveTaxClass_Code, EvolveTaxClass_Description, EvolveTaxClass_CreatedAt, EvolveTaxClass_CreatedUser, EvolveTaxClass_UpdatedAt, EvolveTaxClass_UpdatedUser) VALUES (@EvolveTaxClass_Code, @EvolveTaxClass_Description, @EvolveTaxClass_CreatedAt, @EvolveTaxClass_CreatedUser, @EvolveTaxClass_UpdatedAt, @EvolveTaxClass_UpdatedUser) ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add tax class "+error.message);
            return new Error(" EERR####: Erorr while add tax class "+error.message);
        }
    },

    updateTaxClass : async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        // data.EvolveCreditTerms_BaseDate = data.EvolveCreditTerms_BaseDate.split("/").reverse().join("/").replace("/", "/");
        // data.EvolveCreditTerms_BaseDays = data.EvolveCreditTerms_BaseDays.split("/").reverse().join("/").replace("/", "/");
        // data.EvolveCreditTerms_DiscountDate = data.EvolveCreditTerms_DiscountDate.split("/").reverse().join("/").replace("/", "/");
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveTaxClass_ID', Evolve.Sql.Int, data.EvolveTaxClass_ID)
                .input('EvolveTaxClass_Code', Evolve.Sql.NVarChar, data['Class'])
                .input('EvolveTaxClass_Description', Evolve.Sql.NVarChar, data['Description'])
                .input('EvolveTaxClass_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveTaxClass_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .query(' UPDATE EvolveTaxClass SET EvolveTaxClass_Code = @EvolveTaxClass_Code, EvolveTaxClass_Description = @EvolveTaxClass_Description,EvolveTaxClass_UpdatedAt = @EvolveTaxClass_UpdatedAt, EvolveTaxClass_UpdatedUser = @EvolveTaxClass_UpdatedUser WHERE EvolveTaxClass_ID = @EvolveTaxClass_ID ');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while update tax class "+error.message);
            return new Error(" EERR####:  Erorr while update tax class "+error.message);
        }
    },
};