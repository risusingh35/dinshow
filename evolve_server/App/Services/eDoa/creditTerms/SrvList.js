'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getCreditTermsListCount: async function (search ,EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
            .query(" SELECT COUNT(EvolveCreditTerms_ID) AS count FROM EvolveCreditTerms WHERE  EvolveCreditTerms_Code LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get credit terms list count "+error.message);
            return new Error(" EERR####: Error while get credit terms list count "+error.message);
        }
    },

    getCreditTermsList: async function (start, length ,search , EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
                .query(" SELECT *, convert(varchar, EvolveCreditTerms_BaseDate, 103)  as creditTermsBaseDate, convert(varchar, EvolveCreditTerms_BaseDays, 103)  as creditTermsBaseDays, convert(varchar, EvolveCreditTerms_DiscountDate, 103)  as creditTermsDiscountDate  FROM EvolveCreditTerms WHERE EvolveCreditTerms_Code LIKE @search ORDER BY EvolveCreditTerms_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get credit terms ist "+error.message);
            return new Error(" EERR####: Error while get credit terms ist "+error.message);
        }
    },

    checkCreditTermsCodeExist : async function (EvolveCreditTerms_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCreditTerms_Code', Evolve.Sql.NVarChar, EvolveCreditTerms_Code)
                .query(" SELECT * FROM EvolveCreditTerms WHERE EvolveCreditTerms_Code = @EvolveCreditTerms_Code");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check credit terms code exist or not "+error.message);
            return new Error(" EERR####: Error while check credit terms code exist or not "+error.message);
        }
    },

    addCreditTerms: async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        // data.EvolveCreditTerms_BaseDate = data.EvolveCreditTerms_BaseDate.split("/").reverse().join("/").replace("/", "/");
        // data.EvolveCreditTerms_BaseDays = data.EvolveCreditTerms_BaseDays.split("/").reverse().join("/").replace("/", "/");
        // data.EvolveCreditTerms_DiscountDate = data.EvolveCreditTerms_DiscountDate.split("/").reverse().join("/").replace("/", "/");
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCreditTerms_Code', Evolve.Sql.NVarChar, data['Credit Terms Code'])
                .input('EvolveCreditTerms_Description', Evolve.Sql.NVarChar, data['Description'])
                .input('EvolveCreditTerms_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveCreditTerms_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .input('EvolveCreditTerms_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveCreditTerms_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .query(' INSERT INTO EvolveCreditTerms (EvolveCreditTerms_Code, EvolveCreditTerms_Description, EvolveCreditTerms_CreatedAt, EvolveCreditTerms_CreatedUser, EvolveCreditTerms_UpdatedAt, EvolveCreditTerms_UpdatedUser) VALUES (@EvolveCreditTerms_Code, @EvolveCreditTerms_Description, @EvolveCreditTerms_CreatedAt, @EvolveCreditTerms_CreatedUser, @EvolveCreditTerms_UpdatedAt, @EvolveCreditTerms_UpdatedUser) ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add credit terms "+error.message);
            return new Error(" EERR####: Erorr while add credit terms "+error.message);
        }
    },

    updateCreditTerms : async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        // data.EvolveCreditTerms_BaseDate = data.EvolveCreditTerms_BaseDate.split("/").reverse().join("/").replace("/", "/");
        // data.EvolveCreditTerms_BaseDays = data.EvolveCreditTerms_BaseDays.split("/").reverse().join("/").replace("/", "/");
        // data.EvolveCreditTerms_DiscountDate = data.EvolveCreditTerms_DiscountDate.split("/").reverse().join("/").replace("/", "/");
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCreditTerms_ID', Evolve.Sql.Int, data.EvolveCreditTerms_ID)
                .input('EvolveCreditTerms_Code', Evolve.Sql.NVarChar, data['Credit Terms Code'])
                .input('EvolveCreditTerms_Description', Evolve.Sql.NVarChar, data['Description'])
                .input('EvolveCreditTerms_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveCreditTerms_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .query(' UPDATE EvolveCreditTerms SET EvolveCreditTerms_Code = @EvolveCreditTerms_Code, EvolveCreditTerms_Description = @EvolveCreditTerms_Description,EvolveCreditTerms_UpdatedAt = @EvolveCreditTerms_UpdatedAt, EvolveCreditTerms_UpdatedUser = @EvolveCreditTerms_UpdatedUser WHERE EvolveCreditTerms_ID = @EvolveCreditTerms_ID ');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while update credit terms "+error.message);
            return new Error(" EERR####:  Erorr while update credit terms "+error.message);
        }
    },

    // addCreditTerms: async function (EvolveUser_ID, data) {
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     data.EvolveCreditTerms_BaseDate = data.EvolveCreditTerms_BaseDate.split("/").reverse().join("/").replace("/", "/");
    //     data.EvolveCreditTerms_BaseDays = data.EvolveCreditTerms_BaseDays.split("/").reverse().join("/").replace("/", "/");
    //     data.EvolveCreditTerms_DiscountDate = data.EvolveCreditTerms_DiscountDate.split("/").reverse().join("/").replace("/", "/");
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveCreditTerms_Code', Evolve.Sql.NVarChar, data.EvolveCreditTerms_Code)
    //             .input('EvolveCreditTerms_BaseDate', Evolve.Sql.NVarChar, data.EvolveCreditTerms_BaseDate)
    //             .input('EvolveCreditTerms_BaseDays', Evolve.Sql.NVarChar, data.EvolveCreditTerms_BaseDays)
    //             .input('EvolveCreditTerms_Description', Evolve.Sql.NVarChar, data.EvolveCreditTerms_Description)
    //             .input('EvolveCreditTerms_MultipleDueDates', Evolve.Sql.Bit, data.EvolveCreditTerms_MultipleDueDates)
    //             .input('EvolveCreditTerms_DiscountDate', Evolve.Sql.NVarChar, data.EvolveCreditTerms_DiscountDate)
    //             .input('EvolveCreditTerms_DiscountDays', Evolve.Sql.Int, data.EvolveCreditTerms_DiscountDays)
    //             .input('EvolveCreditTerms_DiscountPercent', Evolve.Sql.Float, data.EvolveCreditTerms_DiscountPercent)
    //             .input('EvolveCreditTerms_DueDate', Evolve.Sql.Int, data.EvolveCreditTerms_DueDate)
    //             .input('EvolveCreditTerms_DueDays', Evolve.Sql.Int, data.EvolveCreditTerms_DueDays)
    //             .input('EvolveCreditTerms_DueDateFrom', Evolve.Sql.Int, data.EvolveCreditTerms_DueDateFrom)
    //             .input('EvolveCreditTerms_DiscDateFrom', Evolve.Sql.Int, data.EvolveCreditTerms_DiscDateFrom)
    //             .input('EvolveCreditTerms_GraceDays', Evolve.Sql.Int, data.EvolveCreditTerms_GraceDays)
    //             .input('EvolveCreditTerms_DailyOverdueInPercent', Evolve.Sql.Float, data.EvolveCreditTerms_DailyOverdueInPercent)
    //             .input('EvolveCreditTerms_MinDueDays', Evolve.Sql.Int, data.EvolveCreditTerms_MinDueDays)
    //             .input('EvolveCreditTerms_CreatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveCreditTerms_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
    //             .input('EvolveCreditTerms_UpdatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveCreditTerms_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                
    //             .query(' INSERT INTO EvolveCreditTerms (EvolveCreditTerms_Code, EvolveCreditTerms_BaseDate, EvolveCreditTerms_BaseDays, EvolveCreditTerms_Description, EvolveCreditTerms_MultipleDueDates, EvolveCreditTerms_DiscountDate, EvolveCreditTerms_DiscountDays, EvolveCreditTerms_DiscountPercent, EvolveCreditTerms_DueDate, EvolveCreditTerms_DueDays, EvolveCreditTerms_DueDateFrom, EvolveCreditTerms_DiscDateFrom, EvolveCreditTerms_GraceDays, EvolveCreditTerms_DailyOverdueInPercent, EvolveCreditTerms_MinDueDays, EvolveCreditTerms_CreatedAt, EvolveCreditTerms_CreatedUser, EvolveCreditTerms_UpdatedAt, EvolveCreditTerms_UpdatedUser) VALUES (@EvolveCreditTerms_Code, @EvolveCreditTerms_BaseDate, @EvolveCreditTerms_BaseDays, @EvolveCreditTerms_Description, @EvolveCreditTerms_MultipleDueDates, @EvolveCreditTerms_DiscountDate, @EvolveCreditTerms_DiscountDays, @EvolveCreditTerms_DiscountPercent, @EvolveCreditTerms_DueDate, @EvolveCreditTerms_DueDays, @EvolveCreditTerms_DueDateFrom, @EvolveCreditTerms_DiscDateFrom, @EvolveCreditTerms_GraceDays, @EvolveCreditTerms_DailyOverdueInPercent, @EvolveCreditTerms_MinDueDays, @EvolveCreditTerms_CreatedAt, @EvolveCreditTerms_CreatedUser, @EvolveCreditTerms_UpdatedAt, @EvolveCreditTerms_UpdatedUser) ');

    //     } catch (error) {
    //         Evolve.Log.error(" EERR####: Erorr while add credit terms "+error.message);
    //         return new Error(" EERR####: Erorr while add credit terms "+error.message);
    //     }
    // },

    // updateCreditTerms : async function (EvolveUser_ID, data) {
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     data.EvolveCreditTerms_BaseDate = data.EvolveCreditTerms_BaseDate.split("/").reverse().join("/").replace("/", "/");
    //     data.EvolveCreditTerms_BaseDays = data.EvolveCreditTerms_BaseDays.split("/").reverse().join("/").replace("/", "/");
    //     data.EvolveCreditTerms_DiscountDate = data.EvolveCreditTerms_DiscountDate.split("/").reverse().join("/").replace("/", "/");
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveCreditTerms_ID', Evolve.Sql.Int, data.EvolveCreditTerms_ID)
    //             .input('EvolveCreditTerms_Code', Evolve.Sql.NVarChar, data.EvolveCreditTerms_Code)
    //             .input('EvolveCreditTerms_BaseDate', Evolve.Sql.NVarChar, data.EvolveCreditTerms_BaseDate)
    //             .input('EvolveCreditTerms_BaseDays', Evolve.Sql.NVarChar, data.EvolveCreditTerms_BaseDays)
    //             .input('EvolveCreditTerms_Description', Evolve.Sql.NVarChar, data.EvolveCreditTerms_Description)
    //             .input('EvolveCreditTerms_MultipleDueDates', Evolve.Sql.Bit, data.EvolveCreditTerms_MultipleDueDates)
    //             .input('EvolveCreditTerms_DiscountDate', Evolve.Sql.NVarChar, data.EvolveCreditTerms_DiscountDate)
    //             .input('EvolveCreditTerms_DiscountDays', Evolve.Sql.Int, data.EvolveCreditTerms_DiscountDays)
    //             .input('EvolveCreditTerms_DiscountPercent', Evolve.Sql.Float, data.EvolveCreditTerms_DiscountPercent)
    //             .input('EvolveCreditTerms_DueDate', Evolve.Sql.Int, data.EvolveCreditTerms_DueDate)
    //             .input('EvolveCreditTerms_DueDays', Evolve.Sql.Int, data.EvolveCreditTerms_DueDays)
    //             .input('EvolveCreditTerms_DueDateFrom', Evolve.Sql.Int, data.EvolveCreditTerms_DueDateFrom)
    //             .input('EvolveCreditTerms_DiscDateFrom', Evolve.Sql.Int, data.EvolveCreditTerms_DiscDateFrom)
    //             .input('EvolveCreditTerms_GraceDays', Evolve.Sql.Int, data.EvolveCreditTerms_GraceDays)
    //             .input('EvolveCreditTerms_DailyOverdueInPercent', Evolve.Sql.Float, data.EvolveCreditTerms_DailyOverdueInPercent)
    //             .input('EvolveCreditTerms_MinDueDays', Evolve.Sql.Int, data.EvolveCreditTerms_MinDueDays)
    //             .input('EvolveCreditTerms_UpdatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveCreditTerms_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
            
    //             .query(' UPDATE EvolveCreditTerms SET EvolveCreditTerms_Code = @EvolveCreditTerms_Code, EvolveCreditTerms_BaseDate = @EvolveCreditTerms_BaseDate, EvolveCreditTerms_BaseDays = @EvolveCreditTerms_BaseDays, EvolveCreditTerms_Description = @EvolveCreditTerms_Description, EvolveCreditTerms_MultipleDueDates = @EvolveCreditTerms_MultipleDueDates, EvolveCreditTerms_DiscountDate = @EvolveCreditTerms_DiscountDate, EvolveCreditTerms_DiscountDays = @EvolveCreditTerms_DiscountDays, EvolveCreditTerms_DiscountPercent = @EvolveCreditTerms_DiscountPercent, EvolveCreditTerms_DueDate = @EvolveCreditTerms_DueDate, EvolveCreditTerms_DueDays = @EvolveCreditTerms_DueDays, EvolveCreditTerms_DueDateFrom = @EvolveCreditTerms_DueDateFrom, EvolveCreditTerms_DiscDateFrom = @EvolveCreditTerms_DiscDateFrom, EvolveCreditTerms_GraceDays = @EvolveCreditTerms_GraceDays, EvolveCreditTerms_DailyOverdueInPercent = @EvolveCreditTerms_DailyOverdueInPercent, EvolveCreditTerms_MinDueDays = @EvolveCreditTerms_MinDueDays, EvolveCreditTerms_UpdatedAt = @EvolveCreditTerms_UpdatedAt, EvolveCreditTerms_UpdatedUser = @EvolveCreditTerms_UpdatedUser WHERE EvolveCreditTerms_ID = @EvolveCreditTerms_ID ');

    //     } catch (error) {
    //         Evolve.Log.error(" EERR####:  Erorr while update credit terms "+error.message);
    //         return new Error(" EERR####:  Erorr while update credit terms "+error.message);
    //     }
    // },
}