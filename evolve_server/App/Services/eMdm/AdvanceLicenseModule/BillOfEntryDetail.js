'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getBilOfEntrryDetailListCount: async function(search, condition) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT COUNT(ebod.EvolveBillOfEntryDetail_ID) as count  FROM EvolveBillOfEntryDetail ebod , EvolveLicence el , EvolveLicenceItemGroup  elig WHERE" + condition + " el.EvolveLicence_ID = ebod.EvolveLicence_ID AND elig.EvolveLicenceItemGroup_ID = ebod.EvolveLicenceItemGroup_ID AND  el.EvolveLicence_Number LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get BilOfEntrry Detail List Count " + error.message);
            return new Error(" EERR####: Error while get BilOfEntrry Detail List Count " + error.message);
        }
    },

    getBilOfEntrryDetailList: async function(start, length, search, condition) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT el.EvolveLicence_Number ,  elig.EvolveLicenceItemGroup_Code , convert(varchar, ebod.EvolveBillOfEntryDetail_Date, 23) as  EvolveBillOfEntryDetail_Date  , ebod.EvolveBillOfEntryDetail_ValueInINR ,  ebod.EvolveBillOfEntryDetail_ValueInForeign , ebod.EvolveBillOfEntryDetail_ExchangeRate , ebod.EvolveBillOfEntryDetail_ID FROM EvolveBillOfEntryDetail ebod , EvolveLicence el , EvolveLicenceItemGroup  elig WHERE " + condition + " el.EvolveLicence_ID = ebod.EvolveLicence_ID AND elig.EvolveLicenceItemGroup_ID = ebod.EvolveLicenceItemGroup_ID AND  el.EvolveLicence_Number LIKE @search  ORDER BY el.EvolveLicence_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get BilOfEntrry Detail List " + error.message);
            return new Error(" EERR####: Error while get BilOfEntrry Detail List " + error.message);
        }
    },

    selectSingleBillOfentry: async function(EvolveBillOfEntryDetail_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveBillOfEntryDetail_ID', Evolve.Sql.Int, EvolveBillOfEntryDetail_ID)
                .query("Select EvolveLicence_ID , EvolveLicenceItemGroup_ID , convert(varchar, EvolveBillOfEntryDetail_Date, 23) as  EvolveBillOfEntryDetail_Date , EvolveBillOfEntryDetail_ValueInINR , EvolveBillOfEntryDetail_ValueInForeign , EvolveBillOfEntryDetail_ExchangeRate , EvolveBillOfEntryDetail_Number    from EvolveBillOfEntryDetail where EvolveBillOfEntryDetail_ID = @EvolveBillOfEntryDetail_ID ")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get BilOfEntrry Detail List " + error.message);
            return new Error(" EERR####: Error while get BilOfEntrry Detail List " + error.message);
        }
    },

    getlicencelNumber: async function() {
        try {
            return await Evolve.SqlPool.request()
                .query("select EvolveLicence_Number , EvolveLicence_ID  from EvolveLicence")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get licencel Number list " + error.message);
            return new Error(" EERR####: Error while get licencel Number list " + error.message);
        }
    },

    getLicenceItemDetailCode: async function() {
        try {
            return await Evolve.SqlPool.request()
                .query("select EvolveLicenceItemGroup_Code , EvolveLicenceItemGroup_ID  from EvolveLicenceItemGroup")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get licence Item Group Code " + error.message);
            return new Error(" EERR####: Error while get licence Item Group Code " + error.message);
        }
    },

    getLicenceItemDetailCodeByLicenceNumber: async function(EvolveLicence_ID) {
        try {
            console.log("EvolveLicence_ID>>>>>>>", EvolveLicence_ID);
            return await Evolve.SqlPool.request()
                .input('EvolveLicence_ID', Evolve.Sql.Int, EvolveLicence_ID)
                .query("  select elig.EvolveLicenceItemGroup_Code , elig.EvolveLicenceItemGroup_ID  from EvolveLicenceItemGroup elig , EvolveLicenceDetail eld  Where eld.EvolveLicence_ID = @EvolveLicence_ID AND eld.EvolveLicenceItemGroup_ID = elig.EvolveLicenceItemGroup_ID")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get licence Item Group Code By Licence Number " + error.message);
            return new Error(" EERR####: Error while get licence Item Group Code By Licence Number " + error.message);
        }
    },


    getLicenceDetail: async function(data) {
        try {
            console.log("data>>>>>>>>>>", data);
            return await Evolve.SqlPool.request()
                .input('EvolveLicence_ID', Evolve.Sql.Int, data.EvolveLicence_ID)
                .input('EvolveLicenceItemGroup_ID', Evolve.Sql.Int, data.EvolveLicenceItemGroup_ID)
                .query("Select el.EvolveLicence_Number  , convert(varchar,  el.EvolveLicence_ExpiryDate , 23) as  EvolveLicence_ExpiryDate, el.EvolveLicence_ValueInINR , el.EvolveLicence_ValueInForeign ,  el.EvolveLicence_RemaingValueInINR ,el.EvolveLicence_RemaingValueInForeign ,eld.EvolveLicenceDetail_RemaingValueInINR , eld.EvolveLicenceDetail_RemaingValueInForeign , eld.EvolveLicenceDetail_ValueInINR , eld.EvolveLicenceDetail_ValueInForeign from EvolveLicence el , EvolveLicenceDetail eld  where el.EvolveLicence_ID = @EvolveLicence_ID  AND eld.EvolveLicenceItemGroup_ID = @EvolveLicenceItemGroup_ID AND el.EvolveLicence_ID = eld.EvolveLicence_ID")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get licence Detail " + error.message);
            return new Error(" EERR####: Error while get licence Detail " + error.message);
        }
    },

    updateLicenceDetailValue: async function(data) {
        try {
            console.log("data>>>>>>>>>>??????????????", data);

            return await Evolve.SqlPool.request()
                .input('EvolveLicence_ID', Evolve.Sql.Int, data.EvolveLicence_ID)
                .input('EvolveLicenceItemGroup_ID', Evolve.Sql.Int, data.EvolveLicenceItemGroup_ID)
                .input('EvolveLicenceDetail_RemaingValueInINR', Evolve.Sql.NVarChar, parseFloat(data.EvolveBillOfEntryDetail_ValueInINR))
                .input('EvolveLicenceDetail_RemaingValueInForeign', Evolve.Sql.NVarChar, parseFloat(data.EvolveBillOfEntryDetail_ValueInForeign))
                .query("UPDATE EvolveLicenceDetail SET EvolveLicenceDetail_RemaingValueInINR += @EvolveLicenceDetail_RemaingValueInINR , EvolveLicenceDetail_RemaingValueInForeign += @EvolveLicenceDetail_RemaingValueInForeign  where EvolveLicence_ID = @EvolveLicence_ID  AND EvolveLicenceItemGroup_ID = @EvolveLicenceItemGroup_ID ")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Update licence Detail Value " + error.message);
            return new Error(" EERR####: Error while Update licence Detail Value " + error.message);
        }
    },

    updateLicenceValue: async function(data) {
        try {
            console.log("data>>>>>>>>>>::::::::::::::", data);

            return await Evolve.SqlPool.request()
                .input('EvolveLicence_ID', Evolve.Sql.Int, data.EvolveLicence_ID)
                .input('EvolveLicence_RemaingValueInINR', Evolve.Sql.NVarChar, parseFloat(data.EvolveBillOfEntryDetail_ValueInINR))
                .input('EvolveLicence_RemaingValueInForeign', Evolve.Sql.NVarChar, parseFloat(data.EvolveBillOfEntryDetail_ValueInForeign))
                .query("UPDATE EvolveLicence SET EvolveLicence_RemaingValueInINR += @EvolveLicence_RemaingValueInINR , EvolveLicence_RemaingValueInForeign += @EvolveLicence_RemaingValueInForeign  where EvolveLicence_ID = @EvolveLicence_ID")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Update licence remaing Value " + error.message);
            return new Error(" EERR####: Error while Update licence remaing Value " + error.message);
        }
    },

    addBillOfEntry: async function(data) {
        try {
            console.log("data>>>>>>>>>><<<<<<<<<<<<<<<<<<", data);

            let date = new Date();
            let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveLicence_ID', Evolve.Sql.Int, data.EvolveLicence_ID)
                .input('EvolveLicenceItemGroup_ID', Evolve.Sql.Int, data.EvolveLicenceItemGroup_ID)
                .input('EvolveBillOfEntryDetail_Number', Evolve.Sql.NVarChar, data.EvolveBillOfEntryDetail_Number)
                .input('EvolveBillOfEntryDetail_ValueInINR', Evolve.Sql.NVarChar, parseFloat(data.EvolveBillOfEntryDetail_ValueInINR))
                .input('EvolveBillOfEntryDetail_ValueInForeign', Evolve.Sql.NVarChar, parseFloat(data.EvolveBillOfEntryDetail_ValueInForeign))
                .input('EvolveBillOfEntryDetail_Date', Evolve.Sql.NVarChar, data.EvolveBillOfEntryDetail_Date)
                .input('EvolveBillOfEntryDetail_ExchangeRate', Evolve.Sql.NVarChar, data.EvolveBillOfEntryDetail_ExchangeRate)
                .input('EvolveBillOfEntryDetail_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveBillOfEntryDetail_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query(" INSERT  INTO EvolveBillOfEntryDetail (EvolveLicence_ID , EvolveLicenceItemGroup_ID , EvolveBillOfEntryDetail_ValueInINR , EvolveBillOfEntryDetail_ValueInForeign , EvolveBillOfEntryDetail_Date, EvolveBillOfEntryDetail_ExchangeRate , EvolveBillOfEntryDetail_CreatedAt , EvolveBillOfEntryDetail_CreatedUser , EvolveBillOfEntryDetail_Number ) VALUES  (@EvolveLicence_ID , @EvolveLicenceItemGroup_ID , @EvolveBillOfEntryDetail_ValueInINR , @EvolveBillOfEntryDetail_ValueInForeign , @EvolveBillOfEntryDetail_Date , @EvolveBillOfEntryDetail_ExchangeRate , @EvolveBillOfEntryDetail_CreatedAt , @EvolveBillOfEntryDetail_CreatedUser , @EvolveBillOfEntryDetail_Number ) ")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while ADD Bill OfEntry " + error.message);
            return new Error(" EERR####: Error while ADD Bill OfEntry " + error.message);
        }
    },

    getLicenceAndItemGroupDetail: async function(data) {
        try {
            console.log("data>>>>>>>>>>", data);
            return await Evolve.SqlPool.request()
                .input('EvolveLicence_ID', Evolve.Sql.Int, data.EvolveLicence_ID)
                .input('EvolveLicenceItemGroup_ID', Evolve.Sql.Int, data.EvolveLicenceItemGroup_ID)
                .input('EvolveBillOfEntryDetail_ID', Evolve.Sql.Int, data.EvolveBillOfEntryDetail_ID)
                .query("Select el.EvolveLicence_Number  , convert(varchar,  el.EvolveLicence_ExpiryDate , 23) as  EvolveLicence_ExpiryDate, el.EvolveLicence_ValueInINR , el.EvolveLicence_ValueInForeign ,  eboed.EvolveBillOfEntryDetail_ValueInINR , eboed.EvolveBillOfEntryDetail_ValueInForeign , el.EvolveLicence_RemaingValueInINR ,el.EvolveLicence_RemaingValueInForeign ,eld.EvolveLicenceDetail_RemaingValueInINR , eld.EvolveLicenceDetail_RemaingValueInForeign , eld.EvolveLicenceDetail_ValueInINR , eld.EvolveLicenceDetail_ValueInForeign from EvolveLicence el , EvolveLicenceDetail eld , EvolveBillOfEntryDetail eboed  where el.EvolveLicence_ID = @EvolveLicence_ID  AND eld.EvolveLicenceItemGroup_ID = @EvolveLicenceItemGroup_ID AND el.EvolveLicence_ID = eld.EvolveLicence_ID AND eboed.EvolveBillOfEntryDetail_ID = @EvolveBillOfEntryDetail_ID")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get licence AND Item Group Detail " + error.message);
            return new Error(" EERR####: Error while get licence AND Item Group Detail " + error.message);
        }
    },

    updateBillOfEntry: async function(data) {
        try {
            let date = new Date();
            let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveBillOfEntryDetail_ID', Evolve.Sql.Int, data.EvolveBillOfEntryDetail_ID)
                .input('EvolveLicence_ID', Evolve.Sql.Int, data.EvolveLicence_ID)
                .input('EvolveLicenceItemGroup_ID', Evolve.Sql.Int, data.EvolveLicenceItemGroup_ID)
                .input('EvolveBillOfEntryDetail_Number', Evolve.Sql.NVarChar, data.EvolveBillOfEntryDetail_Number)
                .input('EvolveBillOfEntryDetail_ValueInINR', Evolve.Sql.NVarChar, parseFloat(data.EvolveBillOfEntryDetail_ValueInINR))
                .input('EvolveBillOfEntryDetail_ValueInForeign', Evolve.Sql.NVarChar, parseFloat(data.EvolveBillOfEntryDetail_ValueInForeign))
                .input('EvolveBillOfEntryDetail_Date', Evolve.Sql.NVarChar, data.EvolveBillOfEntryDetail_Date)
                .input('EvolveBillOfEntryDetail_ExchangeRate', Evolve.Sql.NVarChar, data.EvolveBillOfEntryDetail_ExchangeRate)
                .input('EvolveBillOfEntryDetail_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveBillOfEntryDetail_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("UPDATE EvolveBillOfEntryDetail SET EvolveLicence_ID = @EvolveLicence_ID , EvolveLicenceItemGroup_ID = @EvolveLicenceItemGroup_ID , EvolveBillOfEntryDetail_Number = @EvolveBillOfEntryDetail_Number ,       EvolveBillOfEntryDetail_ValueInINR += @EvolveBillOfEntryDetail_ValueInINR , EvolveBillOfEntryDetail_ValueInForeign += @EvolveBillOfEntryDetail_ValueInForeign , EvolveBillOfEntryDetail_Date = @EvolveBillOfEntryDetail_Date , EvolveBillOfEntryDetail_UpdatedAt = @EvolveBillOfEntryDetail_UpdatedAt , EvolveBillOfEntryDetail_UpdatedUser = @EvolveBillOfEntryDetail_UpdatedUser  where EvolveBillOfEntryDetail_ID = @EvolveBillOfEntryDetail_ID")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Update BillOfEntry " + error.message);
            return new Error(" EERR####: Error while Update BillOfEntry " + error.message);
        }
    }

}