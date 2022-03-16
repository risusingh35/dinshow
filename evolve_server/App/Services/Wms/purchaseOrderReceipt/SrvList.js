'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getPoListCount: async function (search , condition) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT COUNT(epod.EvolvePurchaseOrderDetail_ID) as count FROM  EvolveSupplier esup , EvolvePurchaseOrderDetail epod  ,EvolveItem ei ,  EvolvePurchaseOrder epo LEFT JOIN EvolveUnit eunit  ON  epo.EvolveUnit_ID = eunit.EvolveUnit_ID , EvolveUom euom   WHERE   epo.EvolveSupplier_ID = esup.EvolveSupplier_ID AND epo.EvolvePurchaseOrder_ID = epod.EvolvePurchaseOrder_ID AND epod.EvolveItem_ID  = ei.EvolveItem_ID  AND ei.EvolveUom_ID = euom.EvolveUom_ID   AND (epo.EvolvePurchaseOrder_Number LIKE @search OR   esup.EvolveSupplier_Code  LIKE @search OR esup.EvolveSupplier_Name   LIKE @search)"+condition);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get total po count " + error.message);
            return new Error(" EERR####: Error while get total po count " + error.message);
        }
    },

    getPoList: async function (start, length, search ,condition) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT euom.EvolveUom_Uom ,   ei.EvolveItem_Code , ei.EvolveItem_Desc ,  eunit.EvolveUnit_Code ,  eunit.EvolveUnit_Name ,epo.EvolvePurchaseOrder_Status  , epo.EvolvePurchaseOrder_Number ,   convert(varchar, epo.EvolvePurchaseOrder_StartDate, 105) as EvolvePurchaseOrder_StartDate ,  convert(varchar, epo.EvolvePurchaseOrder_EndDate, 105) as EvolvePurchaseOrder_EndDate , esup.EvolveSupplier_Code , esup.EvolveSupplier_Name , epod.* , convert(varchar, epod.EvolvePurchaseOrderDetail_DueDate, 105) as dueDate ,  convert(varchar, epod.EvolvePurchaseOrderDetail_NeedDate, 105) as needDate FROM  EvolveSupplier esup , EvolvePurchaseOrderDetail epod  ,EvolveItem ei ,  EvolvePurchaseOrder epo LEFT JOIN EvolveUnit eunit  ON  epo.EvolveUnit_ID = eunit.EvolveUnit_ID , EvolveUom euom   WHERE   epo.EvolveSupplier_ID = esup.EvolveSupplier_ID AND epo.EvolvePurchaseOrder_ID = epod.EvolvePurchaseOrder_ID AND epod.EvolveItem_ID  = ei.EvolveItem_ID  AND ei.EvolveUom_ID = euom.EvolveUom_ID AND (epo.EvolvePurchaseOrder_Number LIKE @search OR   esup.EvolveSupplier_Code  LIKE @search OR esup.EvolveSupplier_Name LIKE @search) "+condition+"  ORDER BY epo.EvolvePurchaseOrder_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while po ist " + error.message);
            return new Error(" EERR####: Error while po ist " + error.message);
        }
    },

    getAsnDetails : async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveASN_Number', Evolve.Sql.NVarChar, data.EvolveASN_Number)
                .query("SELECT easn.* , easnd.* , ei.EvolveItem_Code FROM EvolveASN easn , EvolveASNDetails easnd , EvolveItem ei WHERE easn.EvolveASN_ID = easnd.EvolveASN_ID AND easn.EvolveASN_Number = @EvolveASN_Number AND ei.EvolveItem_ID = easnd.EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error While Get ASN Details List !! " + error.message);
            return new Error(" EERR####: Error While Get ASN Details List !! " + error.message);
        }
    }


}