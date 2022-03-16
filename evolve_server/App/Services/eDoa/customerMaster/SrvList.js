'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getCustomerMasterListCount: async function (search ,EvolveUser_ID, data) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
            // .query(" SELECT COUNT(EvolveCustomer_ID) AS count FROM EvolveCustomer WHERE EvolveCustomer_Code LIKE @search ");
            .query("   SELECT COUNT(ecust.EvolveCustomer_ID) AS count FROM EvolveCustomer ecust , EvolveShipTo esp WHERE  esp.EvolveShipTo_ID = ecust.EvolveCustomer_BillTo AND ecust.EvolveCustomer_Code LIKE @search");

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get customer master count "+error.message);
            return new Error(" EERR####: Error while get customer master count "+error.message);
        }
    },

    getCustomerMasterList: async function (start, length ,search , EvolveUser_ID, data) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
                .query("   SELECT ecust.* ,  esp.EvolveShipTo_State, etc.EvolveTaxClass_Code, ect.EvolveCreditTerms_Code, eu.EvolveUnit_Code FROM EvolveCustomer ecust  LEFT JOIN EvolveTaxClass etc ON ecust.EvolveTaxClass_ID = etc.EvolveTaxClass_ID, EvolveShipTo esp, EvolveUnit eu, EvolveCreditTerms ect  WHERE  esp.EvolveShipTo_ID = ecust.EvolveCustomer_BillTo AND ecust.EvolveCreditTerms_ID = ect.EvolveCreditTerms_ID AND ecust.EvolveUnit_ID = eu.EvolveUnit_ID  AND ecust.EvolveCustomer_Code LIKE @search ORDER BY EvolveCustomer_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY  ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get customer master list "+error.message);
            return new Error(" EERR####: Error while get customer master list "+error.message);
        }
    },

    // addCustomerMaster: async function (EvolveUser_ID, data) {
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
            
    //             .input('EvolveCustomer_Code', Evolve.Sql.NVarChar, data.EvolveCustomer_Code)
    //             .input('EvolveCustomer_IsActive', Evolve.Sql.Bit, data.EvolveCustomer_IsActive)
    //             .input('EvolveCustomer_BillTo', Evolve.Sql.NVarChar, data.EvolveCustomer_BillTo)
    //             .input('EvolveCustomer_ArAcc', Evolve.Sql.NVarChar, data.EvolveCustomer_ArAcc)
    //             .input('EvolveCustomer_ArCostCtr', Evolve.Sql.NVarChar, data.EvolveCustomer_ArCostCtr)
    //             .input('EvolveCustomer_ArSubAcc', Evolve.Sql.NVarChar, data.EvolveCustomer_ArSubAcc)
    //             .input('EvolveCustomer_AvgPay', Evolve.Sql.Int, data.EvolveCustomer_AvgPay)
    //             .input('EvolveCustomer_Bal', Evolve.Sql.Float, data.EvolveCustomer_Bal)
    //             .input('EvolveCustomer_Bank', Evolve.Sql.NVarChar, data.EvolveCustomer_Bank)
    //             .input('EvolveCustomer_Class', Evolve.Sql.NVarChar, data.EvolveCustomer_Class)
    //             .input('EvolveCustomer_CollMthd', Evolve.Sql.NVarChar, data.EvolveCustomer_CollMthd)
    //             .input('EvolveCustomer_CreditTerms', Evolve.Sql.NVarChar, data.EvolveCustomer_CreditTerms)
    //             .input('EvolveCustomer_CreditHold', Evolve.Sql.Bit, data.EvolveCustomer_CreditHold)
    //             .input('EvolveCustomer_CreditLimit', Evolve.Sql.Float, data.EvolveCustomer_CreditLimit)
    //             .input('EvolveCustomer_ItemReqd', Evolve.Sql.Bit, data.EvolveCustomer_ItemReqd)
    //             .input('EvolveCustomer_SelfBilling', Evolve.Sql.Bit, data.EvolveCustomer_SelfBilling)
    //             .input('EvolveCustomer_DataComplete', Evolve.Sql.Bit, data.EvolveCustomer_DataComplete)
    //             .input('EvolveCustomer_DayBookSet', Evolve.Sql.NVarChar, data.EvolveCustomer_DayBookSet)
    //             .input('EvolveCustomer_FixedPrice', Evolve.Sql.Bit, data.EvolveCustomer_FreightList)
    //             .input('EvolveCustomer_FreightList', Evolve.Sql.NVarChar, data.EvolveCustomer_FixedPrice)
    //             .input('EvolveCustomer_MinFreightWt', Evolve.Sql.Float, data.EvolveCustomer_MinFreightWt)
    //             .input('EvolveCustomer_FreightTerms', Evolve.Sql.NVarChar, data.EvolveCustomer_FreightTerms)
    //             .input('EvolveCustomer_Language', Evolve.Sql.NVarChar, data.EvolveCustomer_Language)
    //             .input('EvolveCustomer_LastPaymentDate', Evolve.Sql.NVarChar, data.EvolveCustomer_LastPaymentDate)
    //             .input('EvolveCustomer_PaymentMethod', Evolve.Sql.NVarChar, data.EvolveCustomer_PaymentMethod)
    //             .input('EvolveCustomer_PoReqd', Evolve.Sql.Bit, data.EvolveCustomer_PoReqd)
    //             .input('EvolveCustomer_DiscountTable', Evolve.Sql.NVarChar, data.EvolveCustomer_DiscountTable)
    //             .input('EvolveCustomer_PriceTable', Evolve.Sql.NVarChar, data.EvolveCustomer_PriceTable)
    //             .input('EvolveCustomer_PromoGrp', Evolve.Sql.NVarChar, data.EvolveCustomer_PromoGrp)
    //             .input('EvolveCustomer_Resale', Evolve.Sql.NVarChar, data.EvolveCustomer_Resale)
    //             .input('EvolveCustomer_Remarks', Evolve.Sql.NVarChar, data.EvolveCustomer_Remarks)
    //             .input('EvolveCustomer_SecCurrency', Evolve.Sql.NVarChar, data.EvolveCustomer_SecCurrency)
    //             .input('EvolveCustomer_ShipTo', Evolve.Sql.NVarChar, data.EvolveCustomer_ShipTo)
    //             .input('EvolveCustomer_ServiceTerms', Evolve.Sql.NVarChar, data.EvolveCustomer_SecCurrency)
    //             .input('EvolveCustomer_ShipVia', Evolve.Sql.NVarChar, data.EvolveCustomer_ShipVia)
    //             .input('EvolveCustomer_UnitCode', Evolve.Sql.NVarChar, data.EvolveCustomer_UnitCode)
    //             .input('EvolveCustomer_SalesPerson', Evolve.Sql.NVarChar, data.EvolveCustomer_SalesPerson)
    //             .input('EvolveCustomer_TaxUsage', Evolve.Sql.NVarChar, data.EvolveCustomer_TaxUsage)
    //             .input('EvolveCustomer_TaxZone', Evolve.Sql.NVarChar, data.EvolveCustomer_TaxZone)
    //             .input('EvolveCustomer_Taxable', Evolve.Sql.Bit, data.EvolveCustomer_Taxable)
    //             .input('EvolveCustomer_Type', Evolve.Sql.NVarChar, data.EvolveCustomer_Type)
    //             .input('EvolveCustomer_CreatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveCustomer_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
    //             .input('EvolveCustomer_UpdatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveCustomer_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
    //             .query(' INSERT INTO EvolveCustomer (EvolveCustomer_Code, EvolveCustomer_IsActive, EvolveCustomer_BillTo, EvolveCustomer_ArAcc, EvolveCustomer_ArCostCtr, EvolveCustomer_ArSubAcc, EvolveCustomer_AvgPay, EvolveCustomer_Bal, EvolveCustomer_Bank, EvolveCustomer_Class, EvolveCustomer_CollMthd, EvolveCustomer_CreditTerms, EvolveCustomer_CreditHold, EvolveCustomer_CreditLimit, EvolveCustomer_ItemReqd, EvolveCustomer_SelfBilling, EvolveCustomer_DataComplete, EvolveCustomer_DayBookSet, EvolveCustomer_FixedPrice, EvolveCustomer_FreightList, EvolveCustomer_MinFreightWt, EvolveCustomer_FreightTerms, EvolveCustomer_Language, EvolveCustomer_LastPaymentDate, EvolveCustomer_PaymentMethod, EvolveCustomer_PoReqd, EvolveCustomer_DiscountTable, EvolveCustomer_PriceTable, EvolveCustomer_PromoGrp, EvolveCustomer_Resale, EvolveCustomer_Remarks, EvolveCustomer_SecCurrency, EvolveCustomer_ShipTo, EvolveCustomer_ServiceTerms, EvolveCustomer_ShipVia, EvolveCustomer_UnitCode, EvolveCustomer_SalesPerson, EvolveCustomer_TaxUsage, EvolveCustomer_TaxZone, EvolveCustomer_Taxable, EvolveCustomer_Type, EvolveCustomer_CreatedAt, EvolveCustomer_CreatedUser, EvolveCustomer_UpdatedAt, EvolveCustomer_UpdatedUser) VALUES (@EvolveCustomer_Code, @EvolveCustomer_IsActive, @EvolveCustomer_BillTo, @EvolveCustomer_ArAcc, @EvolveCustomer_ArCostCtr, @EvolveCustomer_ArSubAcc, @EvolveCustomer_AvgPay, @EvolveCustomer_Bal, @EvolveCustomer_Bank, @EvolveCustomer_Class, @EvolveCustomer_CollMthd, @EvolveCustomer_CreditTerms, @EvolveCustomer_CreditHold, @EvolveCustomer_CreditLimit, @EvolveCustomer_ItemReqd, @EvolveCustomer_SelfBilling, @EvolveCustomer_DataComplete, @EvolveCustomer_DayBookSet, @EvolveCustomer_FixedPrice, @EvolveCustomer_FreightList, @EvolveCustomer_MinFreightWt, @EvolveCustomer_FreightTerms, @EvolveCustomer_Language, @EvolveCustomer_LastPaymentDate, @EvolveCustomer_PaymentMethod, @EvolveCustomer_PoReqd, @EvolveCustomer_DiscountTable, @EvolveCustomer_PriceTable, @EvolveCustomer_PromoGrp, @EvolveCustomer_Resale, @EvolveCustomer_Remarks, @EvolveCustomer_SecCurrency, @EvolveCustomer_ShipTo, @EvolveCustomer_ServiceTerms, @EvolveCustomer_ShipVia, @EvolveCustomer_UnitCode, @EvolveCustomer_SalesPerson, @EvolveCustomer_TaxUsage, @EvolveCustomer_TaxZone, @EvolveCustomer_Taxable, @EvolveCustomer_Type, @EvolveCustomer_CreatedAt, @EvolveCustomer_CreatedUser, @EvolveCustomer_UpdatedAt, @EvolveCustomer_UpdatedUser) ');

    //     } catch (error) {
    //         Evolve.Log.error(" EERR####: Erorr while add customer master "+error.message);
    //         return new Error(" EERR####: Erorr while add customer master "+error.message);
    //     }
    // },

    // updateCustomerMaster : async function (data) {
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
            
    //         .input('EvolveCustomer_ID', Evolve.Sql.Int, data.EvolveCustomer_ID)
    //         .input('EvolveCustomer_Code', Evolve.Sql.NVarChar, data.EvolveCustomer_Code)
    //         .input('EvolveCustomer_IsActive', Evolve.Sql.Bit, data.EvolveCustomer_IsActive)
    //         .input('EvolveCustomer_BillTo', Evolve.Sql.NVarChar, data.EvolveCustomer_BillTo)
    //         .input('EvolveCustomer_ArAcc', Evolve.Sql.NVarChar, data.EvolveCustomer_ArAcc)
    //         .input('EvolveCustomer_ArCostCtr', Evolve.Sql.NVarChar, data.EvolveCustomer_ArCostCtr)
    //         .input('EvolveCustomer_ArSubAcc', Evolve.Sql.NVarChar, data.EvolveCustomer_ArSubAcc)
    //         .input('EvolveCustomer_AvgPay', Evolve.Sql.Int, data.EvolveCustomer_AvgPay)
    //         .input('EvolveCustomer_Bal', Evolve.Sql.Float, data.EvolveCustomer_Bal)
    //         .input('EvolveCustomer_Bank', Evolve.Sql.NVarChar, data.EvolveCustomer_Bank)
    //         .input('EvolveCustomer_Class', Evolve.Sql.NVarChar, data.EvolveCustomer_Class)
    //         .input('EvolveCustomer_CollMthd', Evolve.Sql.NVarChar, data.EvolveCustomer_CollMthd)
    //         .input('EvolveCustomer_CreditTerms', Evolve.Sql.NVarChar, data.EvolveCustomer_CreditTerms)
    //         .input('EvolveCustomer_CreditHold', Evolve.Sql.Bit, data.EvolveCustomer_CreditHold)
    //         .input('EvolveCustomer_CreditLimit', Evolve.Sql.Float, data.EvolveCustomer_CreditLimit)
    //         .input('EvolveCustomer_ItemReqd', Evolve.Sql.Bit, data.EvolveCustomer_ItemReqd)
    //         .input('EvolveCustomer_SelfBilling', Evolve.Sql.Bit, data.EvolveCustomer_SelfBilling)
    //         .input('EvolveCustomer_DataComplete', Evolve.Sql.Bit, data.EvolveCustomer_DataComplete)
    //         .input('EvolveCustomer_DayBookSet', Evolve.Sql.NVarChar, data.EvolveCustomer_DayBookSet)
    //         .input('EvolveCustomer_FixedPrice', Evolve.Sql.Bit, data.EvolveCustomer_FreightList)
    //         .input('EvolveCustomer_FreightList', Evolve.Sql.NVarChar, data.EvolveCustomer_FixedPrice)
    //         .input('EvolveCustomer_MinFreightWt', Evolve.Sql.Float, data.EvolveCustomer_MinFreightWt)
    //         .input('EvolveCustomer_FreightTerms', Evolve.Sql.NVarChar, data.EvolveCustomer_FreightTerms)
    //         .input('EvolveCustomer_Language', Evolve.Sql.NVarChar, data.EvolveCustomer_Language)
    //         .input('EvolveCustomer_LastPaymentDate', Evolve.Sql.NVarChar, data.EvolveCustomer_LastPaymentDate)
    //         .input('EvolveCustomer_PaymentMethod', Evolve.Sql.NVarChar, data.EvolveCustomer_PaymentMethod)
    //         .input('EvolveCustomer_PoReqd', Evolve.Sql.Bit, data.EvolveCustomer_PoReqd)
    //         .input('EvolveCustomer_DiscountTable', Evolve.Sql.NVarChar, data.EvolveCustomer_DiscountTable)
    //         .input('EvolveCustomer_PriceTable', Evolve.Sql.NVarChar, data.EvolveCustomer_PriceTable)
    //         .input('EvolveCustomer_PromoGrp', Evolve.Sql.NVarChar, data.EvolveCustomer_PromoGrp)
    //         .input('EvolveCustomer_Resale', Evolve.Sql.NVarChar, data.EvolveCustomer_Resale)
    //         .input('EvolveCustomer_Remarks', Evolve.Sql.NVarChar, data.EvolveCustomer_Remarks)
    //         .input('EvolveCustomer_SecCurrency', Evolve.Sql.NVarChar, data.EvolveCustomer_SecCurrency)
    //         .input('EvolveCustomer_ShipTo', Evolve.Sql.NVarChar, data.EvolveCustomer_ShipTo)
    //         .input('EvolveCustomer_ServiceTerms', Evolve.Sql.NVarChar, data.EvolveCustomer_SecCurrency)
    //         .input('EvolveCustomer_ShipVia', Evolve.Sql.NVarChar, data.EvolveCustomer_ShipVia)
    //         .input('EvolveCustomer_UnitCode', Evolve.Sql.NVarChar, data.EvolveCustomer_UnitCode)
    //         .input('EvolveCustomer_SalesPerson', Evolve.Sql.NVarChar, data.EvolveCustomer_SalesPerson)
    //         .input('EvolveCustomer_TaxUsage', Evolve.Sql.NVarChar, data.EvolveCustomer_TaxUsage)
    //         .input('EvolveCustomer_TaxZone', Evolve.Sql.NVarChar, data.EvolveCustomer_TaxZone)
    //         .input('EvolveCustomer_Taxable', Evolve.Sql.Bit, data.EvolveCustomer_Taxable)
    //         .input('EvolveCustomer_Type', Evolve.Sql.NVarChar, data.EvolveCustomer_Type)
    //         .input('EvolveCustomer_UpdatedAt', Evolve.Sql.NVarChar, datetime)
    //         .input('EvolveCustomer_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
    //             .query(' UPDATE EvolveCustomer SET EvolveCustomer_Code = @EvolveCustomer_Code, EvolveCustomer_IsActive = @EvolveCustomer_IsActive, EvolveCustomer_BillTo = @EvolveCustomer_BillTo, EvolveCustomer_ArAcc = @EvolveCustomer_ArAcc, EvolveCustomer_ArCostCtr = @EvolveCustomer_ArCostCtr, EvolveCustomer_ArSubAcc = @EvolveCustomer_ArSubAcc, EvolveCustomer_AvgPay = @EvolveCustomer_AvgPay, EvolveCustomer_Bal = @EvolveCustomer_Bal, EvolveCustomer_Bank = @EvolveCustomer_Bank, EvolveCustomer_Class = @EvolveCustomer_Class, EvolveCustomer_CollMthd = @EvolveCustomer_CollMthd, EvolveCustomer_CreditTerms = @EvolveCustomer_CreditTerms, EvolveCustomer_CreditHold = @EvolveCustomer_CreditHold, EvolveCustomer_CreditLimit = @EvolveCustomer_CreditLimit, EvolveCustomer_ItemReqd = @EvolveCustomer_ItemReqd, EvolveCustomer_SelfBilling = @EvolveCustomer_SelfBilling, EvolveCustomer_DataComplete = @EvolveCustomer_DataComplete, EvolveCustomer_DayBookSet = @EvolveCustomer_DayBookSet, EvolveCustomer_FixedPrice = @EvolveCustomer_FixedPrice, EvolveCustomer_FreightList = @EvolveCustomer_FreightList, EvolveCustomer_MinFreightWt = @EvolveCustomer_MinFreightWt, EvolveCustomer_FreightTerms = @EvolveCustomer_FreightTerms, EvolveCustomer_Language = @EvolveCustomer_Language, EvolveCustomer_LastPaymentDate = @EvolveCustomer_LastPaymentDate, EvolveCustomer_PaymentMethod = @EvolveCustomer_PaymentMethod, EvolveCustomer_PoReqd = @EvolveCustomer_PoReqd, EvolveCustomer_DiscountTable = @EvolveCustomer_DiscountTable, EvolveCustomer_PriceTable = @EvolveCustomer_PriceTable, EvolveCustomer_PromoGrp = @EvolveCustomer_PromoGrp, EvolveCustomer_Resale = @EvolveCustomer_Resale, EvolveCustomer_Remarks = @EvolveCustomer_Remarks, EvolveCustomer_SecCurrency = @EvolveCustomer_SecCurrency, EvolveCustomer_ShipTo = @EvolveCustomer_ShipTo, EvolveCustomer_ServiceTerms = @EvolveCustomer_ServiceTerms, EvolveCustomer_ShipVia = @EvolveCustomer_ShipVia, EvolveCustomer_UnitCode = @EvolveCustomer_UnitCode, EvolveCustomer_SalesPerson = @EvolveCustomer_SalesPerson, EvolveCustomer_TaxUsage = @EvolveCustomer_TaxUsage, EvolveCustomer_TaxZone = @EvolveCustomer_TaxZone, EvolveCustomer_Taxable = @EvolveCustomer_Taxable, EvolveCustomer_Type = @EvolveCustomer_Type, EvolveCustomer_UpdatedAt = @EvolveCustomer_UpdatedAt, EvolveCustomer_UpdatedUser = @EvolveCustomer_UpdatedUser WHERE EvolveCustomer_ID = @EvolveCustomer_ID ');

    //     } catch (error) {
    //         Evolve.Log.error(" EERR####:  Erorr while update customer master "+error.message);
    //         return new Error(" EERR####:  Erorr while update customer master "+error.message);
    //     }
    // },

    deleteCustomer : async function (EvolveCustomer_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCustomer_ID', Evolve.Sql.Int, EvolveCustomer_ID)
                .query(' DELETE FROM EvolveCustomer WHERE EvolveCustomer_ID = @EvolveCustomer_ID ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while delete customer "+error.message);
            return new Error(" EERR####: Erorr while delete customer "+error.message);
        }
    },

    checkCustomeCodeExist : async function (EvolveCustomer_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCustomer_Code', Evolve.Sql.NVarChar, EvolveCustomer_Code)
                .query(' SELECT * FROM EvolveCustomer WHERE EvolveCustomer_Code = @EvolveCustomer_Code ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while check customer code is exist or not "+error.message);
            return new Error(" EERR####: Erorr while check customer code is exist or not "+error.message);
        }
    },

    addCustomerMaster: async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
            
                .input('EvolveCustomer_Code', Evolve.Sql.NVarChar, data['Customer'])
                .input('EvolveCustomer_Name', Evolve.Sql.NVarChar, data['Sort Name'])
                .input('EvolveCustomer_IsActive', Evolve.Sql.Bit, data['Active'])
                .input('EvolveCustomer_BillTo', Evolve.Sql.Int, data.EvolveCustomer_BillTo)
                .input('EvolveCustomer_Country', Evolve.Sql.NVarChar, data['Country'])
                .input('EvolveCustomer_Currency', Evolve.Sql.NVarChar, data['Currency'])
                .input('EvolveCustomer_Language', Evolve.Sql.NVarChar, data['Language'])
                .input('EvolveCustomer_Type', Evolve.Sql.NVarChar, data['Type'])
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveSalesPerson_ID', Evolve.Sql.Int, data.EvolveSalesPerson_ID)
                .input('EvolveTaxClass_ID', Evolve.Sql.Int, data.EvolveTaxClass_ID)
                .input('EvolveCreditTerms_ID', Evolve.Sql.Int, data.EvolveCreditTerms_ID)
                .input('EvolveCustomer_DataComplete', Evolve.Sql.Bit, data['Data Complete'])
                .input('EvolveCustomer_City', Evolve.Sql.NVarChar, data['City'])
                .input('EvolveCustomer_State', Evolve.Sql.NVarChar, data['State'])
                // .input('EvolveCustomer_State', Evolve.Sql.NVarChar, data.EvolveUnit_State)
                .input('EvolveCustomer_Zipcode', Evolve.Sql.NVarChar, data['Zip Code'])
                .input('EvolveCustomer_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveCustomer_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .input('EvolveCustomer_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveCustomer_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .query(' INSERT INTO EvolveCustomer (EvolveCustomer_Code, EvolveCustomer_Name, EvolveCustomer_IsActive, EvolveCustomer_BillTo, EvolveCustomer_Country, EvolveCustomer_Currency, EvolveCustomer_Language, EvolveCustomer_Type, EvolveUnit_ID, EvolveSalesPerson_ID, EvolveTaxClass_ID, EvolveCreditTerms_ID, EvolveCustomer_DataComplete, EvolveCustomer_City, EvolveCustomer_State, EvolveCustomer_Zipcode, EvolveCustomer_CreatedAt, EvolveCustomer_CreatedUser, EvolveCustomer_UpdatedAt, EvolveCustomer_UpdatedUser) VALUES (@EvolveCustomer_Code, @EvolveCustomer_Name, @EvolveCustomer_IsActive, @EvolveCustomer_BillTo, @EvolveCustomer_Country, @EvolveCustomer_Currency, @EvolveCustomer_Language, @EvolveCustomer_Type, @EvolveUnit_ID, @EvolveSalesPerson_ID, @EvolveTaxClass_ID, @EvolveCreditTerms_ID, @EvolveCustomer_DataComplete, @EvolveCustomer_City, @EvolveCustomer_State, @EvolveCustomer_Zipcode, @EvolveCustomer_CreatedAt, @EvolveCustomer_CreatedUser, @EvolveCustomer_UpdatedAt, @EvolveCustomer_UpdatedUser) ;select @@IDENTITY AS \'inserted_id\'');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add customer master "+error.message);
            return new Error(" EERR####: Erorr while add customer master "+error.message);
        }
    },

    updateCustomerMaster: async function (EvolveUser_ID, data) {
        // console.log("data>>>", data);
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
            
                .input('EvolveCustomer_ID', Evolve.Sql.NVarChar, data['EvolveCustomer_ID'])
                .input('EvolveCustomer_Code', Evolve.Sql.NVarChar, data['Customer'])
                .input('EvolveCustomer_Name', Evolve.Sql.NVarChar, data['Sort Name'])
                .input('EvolveCustomer_IsActive', Evolve.Sql.Bit, data['Active'])
                .input('EvolveCustomer_BillTo', Evolve.Sql.Int, data.EvolveCustomer_BillTo)
                .input('EvolveCustomer_Country', Evolve.Sql.NVarChar, data['Country'])
                .input('EvolveCustomer_Currency', Evolve.Sql.NVarChar, data['Currency'])
                .input('EvolveCustomer_Language', Evolve.Sql.NVarChar, data['Language'])
                .input('EvolveCustomer_Type', Evolve.Sql.NVarChar, data['Type'])
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveSalesPerson_ID', Evolve.Sql.Int, data.EvolveSalesPerson_ID)
                .input('EvolveTaxClass_ID', Evolve.Sql.Int, data.EvolveTaxClass_ID)
                .input('EvolveCreditTerms_ID', Evolve.Sql.Int, data.EvolveCreditTerms_ID)
                .input('EvolveCustomer_DataComplete', Evolve.Sql.Bit, data['Data Complete'])
                .input('EvolveCustomer_City', Evolve.Sql.NVarChar, data['City'])
                .input('EvolveCustomer_State', Evolve.Sql.NVarChar, data['State'])
                // .input('EvolveCustomer_State', Evolve.Sql.NVarChar, data.EvolveUnit_State)
                .input('EvolveCustomer_Zipcode', Evolve.Sql.NVarChar, data['Zip Code'])
                .input('EvolveCustomer_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveCustomer_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
                .query(' UPDATE EvolveCustomer SET EvolveCustomer_Code = @EvolveCustomer_Code, EvolveCustomer_Name = @EvolveCustomer_Name, EvolveCustomer_IsActive = @EvolveCustomer_IsActive, EvolveCustomer_BillTo = @EvolveCustomer_BillTo, EvolveCustomer_Country = @EvolveCustomer_Country, EvolveCustomer_Currency = @EvolveCustomer_Currency, EvolveCustomer_Language = @EvolveCustomer_Language, EvolveCustomer_Type = @EvolveCustomer_Type, EvolveUnit_ID = @EvolveUnit_ID, EvolveSalesPerson_ID = @EvolveSalesPerson_ID, EvolveTaxClass_ID = @EvolveTaxClass_ID, EvolveCreditTerms_ID = @EvolveCreditTerms_ID, EvolveCustomer_DataComplete = @EvolveCustomer_DataComplete, EvolveCustomer_City = @EvolveCustomer_City, EvolveCustomer_State = @EvolveCustomer_State, EvolveCustomer_Zipcode = @EvolveCustomer_Zipcode, EvolveCustomer_UpdatedAt = @EvolveCustomer_UpdatedAt, EvolveCustomer_UpdatedUser = @EvolveCustomer_UpdatedUser WHERE EvolveCustomer_ID = @EvolveCustomer_ID ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while update customer master "+error.message);
            return new Error(" EERR####: Erorr while update customer master "+error.message);
        }
    },

    checkUnitCode : async function (EvolveUnit_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUnit_Code', Evolve.Sql.NVarChar, EvolveUnit_Code)
                .query(' SELECT * FROM EvolveUnit WHERE EvolveUnit_Code = @EvolveUnit_Code ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while check unit code is exist or not "+error.message);
            return new Error(" EERR####: Erorr while check unit code is exist or not "+error.message);
        }
    },

    checkSalesPerson : async function (EvolveSalesPerson_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSalesPerson_Code', Evolve.Sql.NVarChar, EvolveSalesPerson_Code)
                .query(' SELECT * FROM EvolveSalesPerson WHERE EvolveSalesPerson_Code = @EvolveSalesPerson_Code ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while check sales person code is exist or not "+error.message);
            return new Error(" EERR####: Erorr while check sales person code is exist or not "+error.message);
        }
    },

    checkShipTo : async function (EvolveShipTo_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveShipTo_Code', Evolve.Sql.NVarChar, EvolveShipTo_Code)
                .query(' SELECT * FROM EvolveShipTo WHERE EvolveShipTo_Code = @EvolveShipTo_Code ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while check ship to id is exist or not "+error.message);
            return new Error(" EERR####: Erorr while check ship to id is exist or not "+error.message);
        }
    },

    addShipTo : async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveShipTo_Code', Evolve.Sql.NVarChar, data['Bill-To'])
                // .input('EvolveShipTo_State', Evolve.Sql.NVarChar, data['State'])
                .input('EvolveShipTo_CreatedAt', Evolve.Sql.Int, datetime)
                .input('EvolveShipTo_CreatedUser', Evolve.Sql.NVarChar, EvolveUser_ID)
                .input('EvolveShipTo_UpdatedAt', Evolve.Sql.Int, datetime)
                .input('EvolveShipTo_UpdatedUser', Evolve.Sql.NVarChar, EvolveUser_ID)
                .query(' INSERT INTO EvolveShipTo (EvolveShipTo_Code, EvolveShipTo_CreatedAt, EvolveShipTo_CreatedUser, EvolveShipTo_UpdatedAt, EvolveShipTo_UpdatedUser) VALUES (@EvolveShipTo_Code, @EvolveShipTo_CreatedAt, @EvolveShipTo_CreatedUser, @EvolveShipTo_UpdatedAt, @EvolveShipTo_UpdatedUser) ;select @@IDENTITY AS \'inserted_id\' ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add ship to "+error.message);
            return new Error(" EERR####: Erorr while add ship to "+error.message);
        }
    },
    
    updateshipTo : async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCustomer_ID', Evolve.Sql.Int, data.EvolveCustomer_ID)
                .input('EvolveShipTo_ID', Evolve.Sql.Int, data.EvolveCustomer_BillTo)
                .input('EvolveShipTo_State', Evolve.Sql.NVarChar, data['State'])
                .input('EvolveShipTo_Address1', Evolve.Sql.NVarChar, data['Address1'])
                .input('EvolveShipTo_Address2', Evolve.Sql.NVarChar, data['Address2'])
                .input('EvolveShipTo_UpdatedAt', Evolve.Sql.Int, datetime)
                .input('EvolveShipTo_UpdatedUser', Evolve.Sql.NVarChar, EvolveUser_ID)
                .query(' UPDATE EvolveShipTo SET EvolveCustomer_ID = @EvolveCustomer_ID, EvolveShipTo_State = @EvolveShipTo_State, EvolveShipTo_Address1 = @EvolveShipTo_Address1, EvolveShipTo_Address2 = @EvolveShipTo_Address2, EvolveShipTo_UpdatedAt = @EvolveShipTo_UpdatedAt, EvolveShipTo_UpdatedUser = @EvolveShipTo_UpdatedUser WHERE EvolveShipTo_ID = @EvolveShipTo_ID  ')

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while update ship to "+error.message);
            return new Error(" EERR####: Erorr while update ship to "+error.message);
        }
    },

    addSalesPerson : async function (EvolveUser_ID, data) {

        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSalesPerson_Code', Evolve.Sql.NVarChar, data['Salesperson'])
				.input('EvolveSalesPerson_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
				.input('EvolveSalesPerson_CreatedAt', Evolve.Sql.NVarChar, datetime)
				.input('EvolveSalesPerson_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
				.input('EvolveSalesPerson_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query(' INSERT INTO EvolveSalesPerson (EvolveSalesPerson_Code, EvolveSalesPerson_CreatedUser, EvolveSalesPerson_CreatedAt, EvolveSalesPerson_UpdatedUser,EvolveSalesPerson_UpdatedAt) VALUES (@EvolveSalesPerson_Code, @EvolveSalesPerson_CreatedUser, @EvolveSalesPerson_CreatedAt, @EvolveSalesPerson_UpdatedUser, @EvolveSalesPerson_UpdatedAt) ;select @@IDENTITY AS \'inserted_id\'');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add sales person "+error.message);
            return new Error(" EERR####: Erorr while add sales person "+error.message);
        }
    },

    checkCreditTermsCode : async function (EvolveCreditTerms_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCreditTerms_Code', Evolve.Sql.NVarChar, EvolveCreditTerms_Code)
                .query(' SELECT * FROM EvolveCreditTerms WHERE EvolveCreditTerms_Code = @EvolveCreditTerms_Code ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while check credit terms code "+error.message);
            return new Error(" EERR####: Erorr while check credit terms code "+error.message);
        }
    },

    addCreditTermsCode : async function (EvolveUser_ID, data) {
		let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveCreditTerms_Code', Evolve.Sql.NVarChar, data['Terms'])
				.input('EvolveCreditTerms_CreatedAt', Evolve.Sql.NVarChar, datetime)
				.input('EvolveCreditTerms_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
				.input('EvolveCreditTerms_UpdatedAt', Evolve.Sql.NVarChar, datetime)
				.input('EvolveCreditTerms_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
				.query(' INSERT INTO EvolveCreditTerms (EvolveCreditTerms_Code, EvolveCreditTerms_CreatedAt, EvolveCreditTerms_CreatedUser, EvolveCreditTerms_UpdatedAt, EvolveCreditTerms_UpdatedUser) VALUES (@EvolveCreditTerms_Code, @EvolveCreditTerms_CreatedAt, @EvolveCreditTerms_CreatedUser, @EvolveCreditTerms_UpdatedAt, @EvolveCreditTerms_UpdatedUser) ;select @@IDENTITY AS \'inserted_id\' ');

		} catch (error) {
			Evolve.Log.error(" EERR####: Erorr while add credit terms code " + error.message);
			return new Error(" EERR####: Erorr while add credit terms code " + error.message);
		}
	},

    checkTaxClass : async function (EvolveTaxClass_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveTaxClass_Code', Evolve.Sql.NVarChar, EvolveTaxClass_Code)
                .query(' SELECT * FROM EvolveTaxClass WHERE EvolveTaxClass_Code = @EvolveTaxClass_Code ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while check tax class code "+error.message);
            return new Error(" EERR####: Erorr while check tax class code "+error.message);
        }
    },

    addTaxClass : async function (EvolveUser_ID, data) {
		let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveTaxClass_Code', Evolve.Sql.NVarChar, data['Tax Class'])
				.input('EvolveTaxClass_CreatedAt', Evolve.Sql.NVarChar, datetime)
				.input('EvolveTaxClass_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
				.input('EvolveTaxClass_UpdatedAt', Evolve.Sql.NVarChar, datetime)
				.input('EvolveTaxClass_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)

				.query("INSERT INTO EvolveTaxClass (EvolveTaxClass_Code, EvolveTaxClass_CreatedAt, EvolveTaxClass_CreatedUser, EvolveTaxClass_UpdatedUser, EvolveTaxClass_UpdatedAt) VALUES (@EvolveTaxClass_Code, @EvolveTaxClass_CreatedAt, @EvolveTaxClass_CreatedUser, @EvolveTaxClass_UpdatedUser, @EvolveTaxClass_UpdatedAt) ;select @@IDENTITY AS \'inserted_id\' ");

		} catch (error) {
			Evolve.Log.error(" EERR####: Erorr while add tax class code is exist or not " + error.message);
			return new Error(" EERR####: Erorr while add tax class code is exist or not " + error.message);
		}
	},

}