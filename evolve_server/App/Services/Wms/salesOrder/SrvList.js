'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getSalesOrderListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                        .query("SELECT COUNT(EvolveSalesOrder_ID) as count FROM EvolveSalesOrder WHERE EvolveSalesOrder_Number LIKE '%" + search + "%'");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get Sales Order List Count  "+error.message);
            return new Error(" EERR####: Error in get Sales Order List Count  "+error.message);
        }
    },

    getSalesOrderList: async function (start, length,search) {
        try {
            return await Evolve.SqlPool.request()
            .input('start', Evolve.Sql.Int, start)
            .input('length', Evolve.Sql.Int, length)
            .query("SELECT eso.* , eu.EvolveUnit_Code FROM EvolveSalesOrder eso , EvolveUnit eu WHERE eso.EvolveSalesOrder_Site = eu.EvolveUnit_ID AND EvolveSalesOrder_Number LIKE '%" + search + "%' ORDER BY EvolveSalesOrder_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get Sales Order List  "+error.message);
            return new Error(" EERR####: Error in get Sales Order List  "+error.message);
        }
    },

    addSalesOrder : async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            data.EvolveSalesOrder_Date = data.EvolveSalesOrder_Date.split("/").reverse().join("/").replace("/", "/");
            return await Evolve.SqlPool.request()
            .input('EvolveSalesOrder_Number', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Number)
            .input('EvolveSalesOrder_Remark', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Remark)
            .input('EvolveSalesOrder_Site', Evolve.Sql.NVarChar, data.EvolveUnit_ID)
            .input('EvolveSalesOrder_Cust', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Cust)
            .input('EvolveSalesOrder_Billto', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Billto)
            .input('EvolveSalesOrder_Shipto', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Shipto)
            .input('EvolveSalesOrder_Date', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Date)
            .input('EvolveSalesOrder_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveSalesOrder_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            // .input('EvolveSalesOrder_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            // .input('EvolveSalesOrder_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .query("INSERT INTO EvolveSalesOrder (EvolveSalesOrder_Number , EvolveSalesOrder_Remark , EvolveSalesOrder_Site , EvolveSalesOrder_Cust , EvolveSalesOrder_Billto , EvolveSalesOrder_Shipto , EvolveSalesOrder_Date , EvolveSalesOrder_CreatedAt , EvolveSalesOrder_CreatedUser) VALUES (@EvolveSalesOrder_Number , @EvolveSalesOrder_Remark , @EvolveSalesOrder_Site , @EvolveSalesOrder_Cust , @EvolveSalesOrder_Billto , @EvolveSalesOrder_Shipto , @EvolveSalesOrder_Date , @EvolveSalesOrder_CreatedAt , @EvolveSalesOrder_CreatedUser)");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get Sales Order List  "+error.message);
            return new Error(" EERR####: Error in get Sales Order List  "+error.message);
        }
    },

    getAllUnitList : async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT EvolveUnit_ID , EvolveUnit_Code , EvolveUnit_Name FROM EvolveUnit");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get Sales Order List  "+error.message);
            return new Error(" EERR####: Error in get Sales Order List  "+error.message);
        }
    },

    getAllCustomerList : async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT EvolveSupplier_ID , EvolveSupplier_Code , EvolveSupplier_Name FROM EvolveSupplier");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get Sales Order List  "+error.message);
            return new Error(" EERR####: Error in get Sales Order List  "+error.message);
        }
    },

    editSalesOrder : async function (data) {
        try {
            // let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            data.EvolveSalesOrder_Date = data.EvolveSalesOrder_Date.split("/").reverse().join("/").replace("/", "/");
            return await Evolve.SqlPool.request()
            .input('EvolveSalesOrder_ID', Evolve.Sql.NVarChar, data.EvolveSalesOrder_ID)
            .input('EvolveSalesOrder_Number', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Number)
            .input('EvolveSalesOrder_Remark', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Remark)
            .input('EvolveSalesOrder_Site', Evolve.Sql.NVarChar, data.EvolveUnit_ID)
            .input('EvolveSalesOrder_Cust', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Cust)
            .input('EvolveSalesOrder_Billto', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Billto)
            .input('EvolveSalesOrder_Shipto', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Shipto)
            .input('EvolveSalesOrder_Date', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Date)
            // .input('EvolveSalesOrder_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            // .input('EvolveSalesOrder_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .query("UPDATE EvolveSalesOrder SET EvolveSalesOrder_Number = @EvolveSalesOrder_Number , EvolveSalesOrder_Remark = @EvolveSalesOrder_Remark , EvolveSalesOrder_Site = @EvolveSalesOrder_Site , EvolveSalesOrder_Cust = @EvolveSalesOrder_Cust , EvolveSalesOrder_Billto = @EvolveSalesOrder_Billto , EvolveSalesOrder_Shipto = @EvolveSalesOrder_Shipto , EvolveSalesOrder_Date = @EvolveSalesOrder_Date WHERE EvolveSalesOrder_ID = @EvolveSalesOrder_ID");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get Sales Order List  "+error.message);
            return new Error(" EERR####: Error in get Sales Order List  "+error.message);
        }
    },

    getAllItemList : async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT EvolveItem_ID , EvolveItem_Code FROM EvolveItem");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get Item List  "+error.message);
            return new Error(" EERR####: Error in get Item List  "+error.message);
        }
    },

    getAllUomList : async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT EvolveUom_ID , EvolveUom_Uom FROM EvolveUom");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get UOM List  "+error.message);
            return new Error(" EERR####: Error in get UOM List  "+error.message);
        }
    },

    addSalesOrderDetails : async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveSalesOrder_ID', Evolve.Sql.Int, data.EvolveSalesOrder_ID)
            .input('EvolveSalesOrderLine_Number', Evolve.Sql.NVarChar, "123")
            .input('EvolveSalesOrderLine_Part', Evolve.Sql.NVarChar, data.EvolveSalesOrderLine_Part)
            .input('EvolveSalesOrderLine_InvQty', Evolve.Sql.NVarChar, data.EvolveSalesOrderLine_InvQty)
            .input('EvolveSalesOrderLine_UM', Evolve.Sql.NVarChar, data.EvolveSalesOrderLine_UM)
            .input('EvolveSalesOrderLine_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveSalesOrderLine_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            // .input('EvolveSalesOrder_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            // .input('EvolveSalesOrder_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .query("INSERT INTO EvolveSalesOrderLine (EvolveSalesOrder_ID , EvolveSalesOrderLine_Number , EvolveSalesOrderLine_Part , EvolveSalesOrderLine_InvQty , EvolveSalesOrderLine_UM , EvolveSalesOrderLine_CreatedAt , EvolveSalesOrderLine_CreatedUser) VALUES (@EvolveSalesOrder_ID , @EvolveSalesOrderLine_Number , @EvolveSalesOrderLine_Part , @EvolveSalesOrderLine_InvQty , @EvolveSalesOrderLine_UM , @EvolveSalesOrderLine_CreatedAt , @EvolveSalesOrderLine_CreatedUser)");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in add Sales Order line List  "+error.message);
            return new Error(" EERR####: Error in add Sales Order line List  "+error.message);
        }
    },

    editSalesOrderDetails : async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveSalesOrderLine_ID', Evolve.Sql.Int, data.EvolveSalesOrderLine_ID)
            .input('EvolveSalesOrderLine_Part', Evolve.Sql.NVarChar, data.EvolveSalesOrderLine_Part)
            .input('EvolveSalesOrderLine_InvQty', Evolve.Sql.NVarChar, data.EvolveSalesOrderLine_InvQty)
            .input('EvolveSalesOrderLine_UM', Evolve.Sql.NVarChar, data.EvolveSalesOrderLine_UM)
            // .input('EvolveSalesOrder_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            // .input('EvolveSalesOrder_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .query("UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_Part = @EvolveSalesOrderLine_Part , EvolveSalesOrderLine_InvQty = @EvolveSalesOrderLine_InvQty , EvolveSalesOrderLine_UM = @EvolveSalesOrderLine_UM WHERE EvolveSalesOrderLine_ID = @EvolveSalesOrderLine_ID");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in Update Sales Order Line List  "+error.message);
            return new Error(" EERR####: Error in Update Sales Order Line List  "+error.message);
        }
    },

    getSalesOrderDetailsList : async function (id) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveSalesOrder_ID', Evolve.Sql.Int, id)
            .query("SELECT esol.* , ei.EvolveItem_Code , eu.EvolveUom_Uom FROM EvolveSalesOrderLine esol , EvolveItem ei , EvolveUom eu WHERE EvolveSalesOrder_ID = @EvolveSalesOrder_ID AND ei.EvolveItem_ID = esol.EvolveSalesOrderLine_Part AND eu.EvolveUom_ID = esol.EvolveSalesOrderLine_UM");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in Update Sales Order Line List  "+error.message);
            return new Error(" EERR####: Error in Update Sales Order Line List  "+error.message);
        }
    },

}