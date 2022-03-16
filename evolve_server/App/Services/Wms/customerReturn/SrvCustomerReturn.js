'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    invoiceLineNoList: async function (search) {
        try {
            let query = "SELECT TOP(20) EvolveInvoiceItemList_SlNo as title , EvolveInvoiceLine_ID as id FROM EvolveInvoiceItemList WHERE EvolveInvoiceItemList_Status = 'shipped' AND EvolveInvoiceItemList_SlNo like '%" + search + "%'"

            return await Evolve.SqlPool.request().query(query);
        } catch (error) {
            Evolve.Log.error(" EERR#####: Error while getting Invoice Line Number List " + error.message);
            return new Error(" EERR#####: Error while getting Invoice Line Number List " + error.message);
        }
    },

    invoiceLineDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvoiceLine_ID', Evolve.Sql.Int, data.EvolveInvoiceLine_ID)
                .query(" SELECT ei.EvolveInvoice_CustName,ei.EvolveInvoice_CustCode, eil.EvolveInvoiceItemList_Qty FROM EvolveInvoice ei, EvolveInvoiceItemList eil WHERE eil.EvolveInvoiceLine_ID = @EvolveInvoiceLine_ID and ei.EvolveInvoice_ID = eil.EvolveInvoice_ID");
        } catch (error) {
            Evolve.Log.error(" EERR#####: Error while getting Invoice Line Details " + error.message);
            return new Error(" EERR#####: Error while getting Invoice Line Details " + error.message);
        }
    },

    holdLocationList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT  eloc.EvolveLocation_ID ,  eloc.EvolveLocation_Name  FROM  EvolveLocation eloc ,  EvolveStatusCodeMstr estcm  WHERE  eloc.EvolveStatusCodeMstr_Id = estcm.EvolveStatusCodeMstr_Id  AND estcm.EvolveStatusCodeMstr_Code= 'HOLD' ");
        } catch (error) {
            Evolve.Log.error(" EERR#####: Error while getting Location List " + error.message);
            return new Error(" EERR#####: Error while getting Location List " + error.message);
        }
    },

    shippedPallets: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvoiceLine_ID', Evolve.Sql.Int, data.EvolveInvoiceLine_ID)
                .query(" SELECT einvt.EvolveInventory_ID, einvc.EvolveInvoice_ID, einvt.EvolveInventory_RefNumber, einvt.EvolveInventory_QtyOnHand, esopl.EvolveSoPickList_ShipID, esol.EvolveSalesOrderLine_Number, einvt.EvolveInventory_LotNumber, convert(varchar, esopld.EvolveSoPickListDetail_CreatedAt , 103) as EvolveSoPickListDetail_CreatedAt,LTRIM(SUBSTRING(CONVERT(VARCHAR(20), CONVERT(DATETIME, esopld.EvolveSoPickListDetail_CreatedAt ), 22), 10, 5) + RIGHT(CONVERT(VARCHAR(20), CONVERT(DATETIME, esopld.EvolveSoPickListDetail_CreatedAt ), 22), 3)) as time FROM EvolveInvoice einvc, EvolveInvoiceItemList einvcl, EvolveInventory einvt, EvolveSalesOrder eso, EvolveSalesOrderLine esol, EvolveSoPickList esopl, EvolveSoPickListDetail esopld WHERE einvcl.EvolveInvoiceLine_ID = @EvolveInvoiceLine_ID and  einvcl.EvolveInvoice_ID = einvc.EvolveInvoice_ID and einvc.EvolveInvoice_SONumber = eso.EvolveSalesOrder_Number and eso.EvolveSalesOrder_ID = esol.EvolveSalesOrder_ID and esol.EvolveSalesOrder_ID = esopl.EvolveSalesOrder_ID and esopl.EvolveSoPickList_ID = esopld.EvolveSoPickList_ID and esopld.EvolveSoPickListDetail_Status='PICKED' and esopld.EvolveInventory_ID = einvt.EvolveInventory_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR#####: Error while getting Shipped Pallets List " + error.message);
            return new Error(" EERR#####: Error while getting Shipped Pallets List " + error.message);
        }
    },

    createNewNcrNo: async function (data) {
        try {
            let dataTime = new Date();
            return await Evolve.SqlPool.request()
                .input('EvolveNCR_No', Evolve.Sql.NVarChar, data.EvolveNCR_No)
                .input('EvolveNCR_Lot_No', Evolve.Sql.NVarChar, data.EvolveNCR_Lot_No)
                .input('EvolveNCR_Qty', Evolve.Sql.NVarChar, data.EvolveNCR_Qty)
                .input('EvolveNCR_CreatedAt', Evolve.Sql.DateTime, dataTime)
                .input('EvolveNCR_UpdatedAt', Evolve.Sql.DateTime, dataTime)
                .query(" INSERT INTO EvolveNcr (EvolveNCR_No, EvolveNCR_Lot_No, EvolveNCR_Qty,EvolveNCR_CreatedAt, EvolveNCR_UpdatedAt) VALUES (@EvolveNCR_No, @EvolveNCR_Lot_No, @EvolveNCR_Qty, @EvolveNCR_CreatedAt, @EvolveNCR_UpdatedAt) ");
        } catch (error) {
            Evolve.Log.error(" EERR#####: Error while Adding New NCR No" + error.message);
            return new Error(" EERR#####: Error while Adding New NCR No" + error.message);
        }
    },

    customerReturnUom: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInventory_ID', Evolve.Sql.Int, data.EvolveInventory_ID)
                .query(" SELECT eu.EvolveUom_Uom FROM EvolveUom eu, EvolveInventory einvt WHERE EvolveInventory_ID = @EvolveInventory_ID AND einvt.EvolveUom_ID = eu.EvolveUom_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR#####: Error while getting Invoice Line Details " + error.message);
            return new Error(" EERR#####: Error while getting Invoice Line Details " + error.message);
        }
    },

    returnPallet: async function (data) {
        
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCustRtnPallet_No', Evolve.Sql.NVarChar, data.EvolveCustRtnPallet_No)
                .input('EvolveCustRtn_Qty', Evolve.Sql.Int, data.EvolveCustRtn_Qty)
                .input('EvolveNcr_No', Evolve.Sql.NVarChar, data.EvolveNcr_No)
                .input('EvolveCustRtn_Uom', Evolve.Sql.NVarChar, data.EvolveCustRtn_Uom)
                .input('EvolveCustRtn_Location', Evolve.Sql.NVarChar, data.EvolveCustRtn_Location)
                .input('EvolveInventory_LotNumber', Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                // .input('EvolveInventory_PrintStatus', Evolve.Sql.DateTime, data.EvolveInventory_PrintStatus)
                .input('EvolveInvoice_ID', Evolve.Sql.Int, data.EvolveInvoice_ID)
                .input('EvolveInvoiceLine_ID', Evolve.Sql.Int, data.EvolveInvoiceLine_ID)
                .query(" INSERT INTO EvolveCustomerReturn (EvolveCustRtnPallet_No, EvolveCustRtn_Qty, EvolveNcr_No, EvolveCustRtn_Uom, EvolveCustRtn_Location, EvolveInventory_LotNumber, EvolveInvoice_ID, EvolveInvoiceLine_ID) VALUES (@EvolveCustRtnPallet_No, @EvolveCustRtn_Qty, @EvolveNcr_No, @EvolveCustRtn_Uom, @EvolveCustRtn_Location, @EvolveInventory_LotNumber, @EvolveInvoice_ID, @EvolveInvoiceLine_ID) ");
        } catch (error) {
            Evolve.Log.error(" EERR#####: Error while Inserting Return Pallet " + error.message);
            return new Error(" EERR#####: Error while Inserting Return Pallet " + error.message);
        }
    },

    returnedPalletsList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvoiceLine_ID', Evolve.Sql.Int, data.EvolveInvoiceLine_ID)
                .query(" SELECT * FROM EvolveCustomerReturn WHERE EvolveInvoiceLine_ID = @EvolveInvoiceLine_ID ORDER BY EvolveCustRtn_ID DESC");
        } catch (error) {
            Evolve.Log.error(" EERR#####: Error while getting Returned Pallets List " + error.message);
            return new Error(" EERR#####: Error while getting Returned Pallets List " + error.message);
        }
    },

}