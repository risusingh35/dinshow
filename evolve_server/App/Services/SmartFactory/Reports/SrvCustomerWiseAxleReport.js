'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  // old-----
  // getCustomerWiseReportCount: async function (condition) {
  //     try {
  //       let query =
  //         "SELECT COUNT(epoh.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersHistory epoh INNER JOIN EvolveItem ei ON ei.EvolveItem_Code LIKE epoh.EvolveItem_Code INNER JOIN EvolvePDIHistory eph ON eph.EvolvePDIHistory_ParaValue LIKE epoh.EvolveProdOrdersDetail_Serial INNER JOIN EvolveDo ed ON ed.EvolveDO_ID = eph.EvolveDO_ID INNER JOIN EvolveSalesOrder eso ON eso.EvolveSalesOrder_Number LIKE ed.EvolveDO_SONumber INNER JOIN EvolveSupplier es ON es.EvolveSupplier_Code LIKE eso.EvolveSalesOrder_Cust INNER JOIN EvolveInvoice eic ON eic.EvolveInvoice_SONumber LIKE eso.EvolveSalesOrder_Number WHERE epoh.EvolveProdOrderHistoryType_Code = 'PRODORD' AND epoh.EvolveProdOrdersDetails_Status = 'Completed'" +
  //         condition;
  //       return await Evolve.SqlPool.request().query(query);
  //     } catch (error) {
  //       Evolve.Log.error("  "+error.message);
  //       return new Error("  "+error.message);
  //     }
  //   },

  // getCustomerWiseReportDatatableList: async function (start, length, condition) {
  //   try {
  //     let query =
  //       "SELECT epoh.EvolveProdOrdersDetail_Serial , epoh.EvolveItem_Code , ei.EvolveItem_Desc , ed.EvolveDO_Number , ed.EvolveDO_SONumber , es.EvolveSupplier_Code , es.EvolveSupplier_Name , es.EvolveSupplier_City , eph.EvolvePDIHistory_CreatedAt , eic.EvolveInvoice_Number , eic.EvolveInvoice_Date FROM EvolveProdOrdersHistory epoh INNER JOIN EvolveItem ei ON ei.EvolveItem_Code LIKE epoh.EvolveItem_Code INNER JOIN EvolvePDIHistory eph ON eph.EvolvePDIHistory_ParaValue LIKE epoh.EvolveProdOrdersDetail_Serial        INNER JOIN EvolveDo ed ON ed.EvolveDO_ID = eph.EvolveDO_ID INNER JOIN EvolveSalesOrder eso ON eso.EvolveSalesOrder_Number LIKE ed.EvolveDO_SONumber INNER JOIN EvolveSupplier es ON es.EvolveSupplier_Code LIKE eso.EvolveSalesOrder_Cust INNER JOIN EvolveInvoice eic ON eic.EvolveInvoice_SONumber LIKE eso.EvolveSalesOrder_Number WHERE epoh.EvolveProdOrderHistoryType_Code = 'PRODORD' AND epoh.EvolveProdOrdersDetails_Status = 'Completed' " +
  //       condition +
  //       " ORDER BY epoh.EvolveProdOrdersDetail_Serial DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY";
  //     return await Evolve.SqlPool.request()
  //       .input("start", Evolve.Sql.Int, start)
  //       .input("length", Evolve.Sql.Int, length)
  //       .query(query);
  //   } catch (error) {
  //     Evolve.Log.error("  "+error.message);
  //     return new Error("  "+error.message);
  //   }
  // },


  getCustomerWiseReportCount: async function () {
    try {
      let query = "SELECT COUNT(egeh.EvolveGateExit_ID) as count FROM EvolveGateExitHistory egeh, EvolveProdOrdersHistory epoh, EvolveSalesOrder eso, EvolveItem ei, EvolveSupplier es, EvolveInvoice ein WHERE egeh.EvolveGateExit_SerialNo = epoh.EvolveProdOrdersDetail_Serial AND egeh.EvolveGateExit_SoNumber = eso.EvolveSalesOrder_Number AND ei.EvolveItem_Code LIKE epoh.EvolveItem_Code AND es.EvolveSupplier_Code LIKE eso.EvolveSalesOrder_Cust AND ein.EvolveInvoice_ID LIKE egeh.EvolveGateExit_InvoiceNo AND eso.EvolveSalesOrder_Status = 'close'";
      return await Evolve.SqlPool.request().query(query);
    } catch (error) {
      Evolve.Log.error(" EERR1955: Error while getting Customer Wise Report Count "+error.message);
      return new Error(" EERR1955: Error while getting Customer Wise Report Count "+error.message);
    }
  },

  getCustomerWiseReportDatatableList: async function (start, length) {
    try {
      let query = "SELECT epoh.EvolveItem_Code, ei.EvolveItem_Desc, egeh.EvolveGateExit_SerialNo, ein.EvolveInvoice_Number, ein.EvolveInvoice_Date, egeh.EvolveDO_Number, egeh.EvolveGateExit_SoNumber, es.EvolveSupplier_Name, eso.EvolveSalesOrder_Cust, es.EvolveSupplier_City FROM EvolveGateExitHistory egeh, EvolveProdOrdersHistory epoh, EvolveSalesOrder eso, EvolveItem ei, EvolveSupplier es, EvolveInvoice ein WHERE egeh.EvolveGateExit_SerialNo = epoh.EvolveProdOrdersDetail_Serial AND egeh.EvolveGateExit_SoNumber = eso.EvolveSalesOrder_Number AND ei.EvolveItem_Code LIKE epoh.EvolveItem_Code AND es.EvolveSupplier_Code LIKE eso.EvolveSalesOrder_Cust AND ein.EvolveInvoice_ID LIKE egeh.EvolveGateExit_InvoiceNo AND eso.EvolveSalesOrder_Status = 'close' ORDER BY egeh.EvolveGateExit_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY";
      return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(query);
    } catch (error) {
      Evolve.Log.error(" EERR1956: Error while getting Customer Wise Report Datatable List "+error.message);
      return new Error(" EERR1956: Error while getting Customer Wise Report Datatable List "+error.message);
    }
  },


  getItem: async function (search) {
    try {
      let query =
        "SELECT TOP(20) EvolveItem_Code as title , EvolveItem_ID as id FROM EvolveItem WHERE EvolveItem_Code LIKE  '%" +
        search +
        "%'";
      return await Evolve.SqlPool.request().query(query);
    } catch (error) {
      Evolve.Log.error(" EERR1957: Error while getting Item "+error.message);
      return new Error(" EERR1957: Error while getting Item "+error.message);
    }
  },

  getCustCode: async function (search) {
    try {
      let query =
        "SELECT TOP(20) EvolveSupplier_Code as title , EvolveSupplier_ID as id FROM EvolveSupplier WHERE EvolveSupplier_Code LIKE  '%" +
        search +
        "%'";
      return await Evolve.SqlPool.request().query(query);
    } catch (error) {
      Evolve.Log.error(" EERR1958: Error while getting Cust Code "+error.message);
      return new Error(" EERR1958: Error while getting Cust Code "+error.message);
    }
  },

  getMachineList: async function (id, start, length) {
    try {
      return await Evolve.SqlPool.request()
        //   .input('EvolveShift_CreatedUser', Evolve.Sql.Int, id)
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(
          "  SELECT EvolveMachine_ID , EvolveMachine_Name from EvolveMachine ORDER BY EvolveMachine_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1959: Error while getting Machine List "+error.message);
      return new Error(" EERR1959: Error while getting Machine List "+error.message);
    }
  },

  getshiftList: async function (id, start, length) {
    try {
      return await Evolve.SqlPool.request()
        //   .input('EvolveShift_CreatedUser', Evolve.Sql.Int, id)
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(
          "SELECT EvolveShift_ID , EvolveShift_Name from EvolveShift ORDER BY EvolveShift_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1960: Error while getting shift List "+error.message);
      return new Error(" EERR1960: Error while getting shift List "+error.message);
    }
  },

  getProcessList: async function (id, start, length) {
    try {
      return await Evolve.SqlPool.request()
        //   .input('EvolveShift_CreatedUser', Evolve.Sql.Int, id)
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(
          "SELECT EvolveProcess_ID , EvolveProcess_Name from EvolveProcess ORDER BY EvolveProcess_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1961: Error while getting Process List "+error.message);
      return new Error(" EERR1961: Error while getting Process List "+error.message);
    }
  },






}