'use strict';

const Evolve = require('../../../../Boot/Evolve');

module.exports = {
    async getDayBookSetCount (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query(" SELECT COUNT(edb.EvolveDBSet_ID) as count FROM EvolveDBSet edb LEFT JOIN   EvolveUnit eu  ON edb.EvolveUnit_ID = eu.EvolveUnit_ID WHERE edb.EvolveDBSet_code LIKE @search OR eu.EvolveUnit_Code LIKE @search ");
        }
        catch (err) {
            console.log(err);
            Evolve.Log.error("Error while get tax class list "+error.message);
            return new Error("Error while get tax class list "+error.message);
        }
    },

    async getDayBookSet (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
            .input('start', Evolve.Sql.Int, start)
            .input('length', Evolve.Sql.Int, length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("  SELECT edb.* , eu.EvolveUnit_Code FROM EvolveDBSet edb LEFT JOIN   EvolveUnit eu  ON edb.EvolveUnit_ID = eu.EvolveUnit_ID WHERE edb.EvolveDBSet_code LIKE @search OR eu.EvolveUnit_Code LIKE @search ORDER BY EvolveDBSet_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY;");
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

    checkDayBookSetExits : async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDBSet_code', Evolve.Sql.NVarChar, data['Daybook Set'])
                .input('EvolveDBSet_Type', Evolve.Sql.NVarChar, data['Type'])
                .input('EvolveDBSet_desc', Evolve.Sql.NVarChar, data['Description'])
                .query(" SELECT * FROM EvolveDBSet WHERE EvolveDBSet_code = @EvolveDBSet_code AND EvolveDBSet_Type =@EvolveDBSet_Type  AND EvolveDBSet_desc=@EvolveDBSet_desc");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check day book set exits "+error.message);
            return new Error(" EERR####: Error while check day book set exits "+error.message);
        }
    },

    addDayBookSet: async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        // data.EvolveCreditTerms_BaseDate = data.EvolveCreditTerms_BaseDate.split("/").reverse().join("/").replace("/", "/");
        // data.EvolveCreditTerms_BaseDays = data.EvolveCreditTerms_BaseDays.split("/").reverse().join("/").replace("/", "/");
        // data.EvolveCreditTerms_DiscountDate = data.EvolveCreditTerms_DiscountDate.split("/").reverse().join("/").replace("/", "/");
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDBSet_code', Evolve.Sql.NVarChar, data['Daybook Set'])
                .input('EvolveDBSet_desc', Evolve.Sql.NVarChar, data['Description'])
                .input('EvolveDBSet_isActive', Evolve.Sql.Int, data['Active'].trim() == 'yes' ? 1 : 0)
                .input('EvolveDBSet_Type', Evolve.Sql.NVarChar, data['Type'])
                .input('EvolveDBSet_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveDBSet_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .input('EvolveDBSet_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveDBSet_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)

                .query(' INSERT INTO EvolveDBSet (EvolveDBSet_code, EvolveDBSet_desc, EvolveDBSet_isActive , EvolveDBSet_Type , EvolveDBSet_UpdatedAt, EvolveDBSet_UpdatedUser, EvolveDBSet_CreatedAt, EvolveDBSet_CreatedUser,EvolveUnit_ID) VALUES (@EvolveDBSet_code, @EvolveDBSet_desc, @EvolveDBSet_isActive , @EvolveDBSet_Type , @EvolveDBSet_UpdatedAt, @EvolveDBSet_UpdatedUser, @EvolveDBSet_CreatedAt, @EvolveDBSet_CreatedUser ,@EvolveUnit_ID) ');

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
                .input('EvolveDBSet_ID', Evolve.Sql.Int, data.EvolveDBSet_ID)
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)

                .input('EvolveDBSet_code', Evolve.Sql.NVarChar, data['Daybook Set'])
                .input('EvolveDBSet_desc', Evolve.Sql.NVarChar, data['Description'])
                .input('EvolveDBSet_isActive', Evolve.Sql.Int, data['Active'].trim() == 'yes' ? 1 : 0)
                .input('EvolveDBSet_Type', Evolve.Sql.NVarChar, data['Type'])
                .input('EvolveDBSet_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveDBSet_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .query(' UPDATE EvolveDBSet SET EvolveDBSet_code = @EvolveDBSet_code, EvolveDBSet_desc = @EvolveDBSet_desc,EvolveDBSet_UpdatedAt = @EvolveDBSet_UpdatedAt, EvolveDBSet_UpdatedUser = @EvolveDBSet_UpdatedUser , EvolveDBSet_Type = @EvolveDBSet_Type , EvolveDBSet_isActive = @EvolveDBSet_isActive ,  EvolveUnit_ID=@EvolveUnit_ID  WHERE EvolveDBSet_ID = @EvolveDBSet_ID ');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while Update Day Book Set "+error.message);
            return new Error(" EERR####:  Erorr while Update Day Book Set "+error.message);
        }
    },
    checkUnitCode : async function (EvolveUnit_Code) {
        try {

            console.log("EvolveUnit_Code>>>" , ':::::'+EvolveUnit_Code+':::::'  )
            return await Evolve.SqlPool.request()
            .input('EvolveUnit_Code', Evolve.Sql.NVarChar, EvolveUnit_Code)

                
                .query('SELECT  EvolveUnit_ID FROM  EvolveUnit WHERE EvolveUnit_Code = @EvolveUnit_Code  ');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while get unit details "+error.message);
            return new Error(" EERR####:  Erorr while get unit details "+error.message);
        }
    },
    onActiveDeactiveDS : async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDBSet_ID', Evolve.Sql.Int, data.EvolveDBSet_ID)
                .input('EvolveDBSet_isActive', Evolve.Sql.Int, data.EvolveDBSet_isActive)
                .input('EvolveDBSet_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveDBSet_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query(' UPDATE EvolveDBSet SET EvolveDBSet_UpdatedAt = @EvolveDBSet_UpdatedAt, EvolveDBSet_UpdatedUser = @EvolveDBSet_UpdatedUser  , EvolveDBSet_isActive = @EvolveDBSet_isActive   WHERE EvolveDBSet_ID = @EvolveDBSet_ID ');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while Update Day Book Set "+error.message);
            return new Error(" EERR####:  Erorr while Update Day Book Set "+error.message);
        }
    },
};