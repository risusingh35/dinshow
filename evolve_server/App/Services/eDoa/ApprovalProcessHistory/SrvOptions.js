'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getApprovalProcessHistory: async function (data) {
        try {
              return await Evolve.SqlPool.request()
                .input('EvolveApprovalProcessHistory_ID', Evolve.Sql.Int, data.EvolveApprovalProcessHistory_ID)

                .query(" SELECT  epd.*  , eu.EvolveUser_Name , convert(varchar, epd.EvolveApprovalProcessDetailsHistory_CreatedAt, 103)  as date ,  LTRIM(SUBSTRING(CONVERT(VARCHAR(20),  CONVERT(DATETIME, epd.EvolveApprovalProcessDetailsHistory_CreatedAt), 22), 10, 5)     + RIGHT(CONVERT(VARCHAR(20),      CONVERT(DATETIME, epd.EvolveApprovalProcessDetailsHistory_CreatedAt), 22), 3))  as time FROM   EvolveApprovalProcessDetailsHistory epd  , EvolveUser eu      WHERE epd.EvolveUser_ID = eu.EvolveUser_ID  AND epd.EvolveApprovalProcessHistory_ID = @EvolveApprovalProcessHistory_ID  ORDER BY  epd.EvolveApprovalProcessDetailsHistory_ID DESC")

    
        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get approval process history "+error.message);
            return new Error(" EERR#### : Error while get approval process history "+error.message);
        }
    },
    getApprovalMatrixDetails: async function (data) {
        try {
              return await Evolve.SqlPool.request()
                .input('EvolveApprovalProcessHistory_ID', Evolve.Sql.Int, data.EvolveApprovalProcessHistory_ID)

                .query("SELECT eapm.* , eap.*  FROM  EvolveApprovalMatrix eapm , EvolveApprovalProcessHistory eap WHERE eapm.EvolveApprovalMatrix_ID = eap.EvolveApprovalMatrix_ID  AND eap.EvolveApprovalProcessHistory_ID = @EvolveApprovalProcessHistory_ID")

    
        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get approval matrix details "+error.message);
            return new Error(" EERR#### : Error while get approval matrix details "+error.message);
        }
    },
    getquoteDetails: async function (EvolveSalesQuote_ID) {
        try {
              return await Evolve.SqlPool.request()
                .input('EvolveSalesQuote_ID', Evolve.Sql.Int, EvolveSalesQuote_ID)

                .query("SELECT esq.EvolveSalesQuote_Serial  , ec.EvolveCustomer_name , eship.EvolveShipTo_Code  as billtoAdress FROM  EvolveSalesQuote esq , EvolveCustomer ec , EvolveShipTo eship  WHERE esq.EvolveSalesQuote_ID   = @EvolveSalesQuote_ID   AND esq.EvolveSalesQuote_Customer_ID = ec.EvolveCustomer_ID  AND esq.EvolveSalesQuote_BillTo = eship.EvolveShipTo_ID")

    
        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get quote details "+error.message);
            return new Error(" EERR#### : Error while get quote details "+error.message);
        }
    },
    getApprovalProcessDetails: async function (data) {
        try {
              return await Evolve.SqlPool.request()
                .input('EvolveApprovalProcessHistory_ID', Evolve.Sql.Int, data.EvolveApprovalProcessHistory_ID)

                .query("SELECT * FROM  EvolveApprovalProcessHistory eaph , EvolveApprovalMatrix eapm  WHERE  eaph.EvolveApprovalProcessHistory_ID =@EvolveApprovalProcessHistory_ID AND eaph.EvolveApprovalMatrix_ID = eapm.EvolveApprovalMatrix_ID")

    
        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while get Approval Process Details "+error.message);
            return new Error(" EERR#### : Error while get Approval Process Details "+error.message);
        }
    },
    getSingelSalesQuoteHead : async function (data) {
        try {
          return await Evolve.SqlPool.request()
          .input('EvolveSalesQuote_ID', Evolve.Sql.Int, data.EvolveSalesQuote_ID)
          .input('EvolveApprovalProcess_ID', Evolve.Sql.Int, data.EvolveApprovalProcess_ID)

          .query("  SELECT ecust.EvolveCustomer_code , ecust.EvolveCustomer_name ,  esq.*  ,convert(varchar,esq.EvolveSalesQuoteAPHistory_CreatedAt, 105)  as dateRaised, convert(varchar,esq.EvolveSalesQuoteAPHistory_PoDate, 105)  as poDate , convert(varchar,esq.EvolveSalesQuoteAPHistory_SubmitDate, 105)  as dateSubmited,  eu.EvolveUnit_Code FROM EvolveSalesQuoteAPHistory esq  ,   EvolveUnit eu , EvolveCustomer ecust  WHERE EvolveSalesQuote_ID = @EvolveSalesQuote_ID AND EvolveApprovalProcess_ID=@EvolveApprovalProcess_ID  AND eu.EvolveUnit_ID = esq.EvolveUnit_ID   AND esq.EvolveSalesQuoteAPHistory_Customer_ID = ecust.EvolveCustomer_ID");
        } catch (error) {
          Evolve.Log.error(" EERR####: Error While Get Single Sales Quote  "+error.message);
          return new Error(" EERR####: Error While Get Single Sales Quote  "+error.message);
        }
      },
      getSingelSalesQuoteDetails : async function (EvolveSalesQuoteAPHistory_ID) {
        try {
          return await Evolve.SqlPool.request()
          .input('EvolveSalesQuoteAPHistory_ID', Evolve.Sql.Int, EvolveSalesQuoteAPHistory_ID)
          .query("  SELECT esqd.EvolvePriceListDetails_ID , esqd.EvolveSalesQuoteAPHistoryDetails_ItemUnitPrice as EvolveItem_ItemUnitPrice , esqd.EvolveSalesQuoteAPHistoryDetails_ID , esqd.EvolveSalesQuoteAPHistory_ID ,esqd.EvolveSalesQuoteAPHistoryDetails_LineNo ,esqd.EvolveSalesQuoteAPHistoryDetails_TaxEnv_ID , esqd.EvolveItem_ID ,esqd.EvolveSalesQuoteAPHistoryDetails_Qty,esqd.EvolveSalesQuoteAPHistoryDetails_CustomerUnitPrice ,esqd.EvolveSalesQuoteAPHistoryDetails_CustomerDiscount,esqd.EvolveTaxClass_ID ,esqd.EvolveSalesQuoteAPHistoryDetails_Comments , convert(varchar, esqd.EvolveSalesQuoteAPHistoryDetails_ReqdDate, 105)  as EvolveSalesQuoteAPHistoryDetails_ReqdDate ,   convert(varchar, esqd.EvolveSalesQuoteAPHistoryDetails_PromiseDate, 105)  as EvolveSalesQuoteAPHistoryDetails_PromiseDate,   convert(varchar, esqd.EvolveSalesQuoteAPHistoryDetails_DueDate, 105)  as EvolveSalesQuoteAPHistoryDetails_DueDate  , ei.EvolveItem_Code FROM EvolveSalesQuoteAPHistoryDetails  esqd , EvolveItem ei  WHERE esqd.EvolveSalesQuoteAPHistory_ID = @EvolveSalesQuoteAPHistory_ID   AND esqd.EvolveItem_ID = ei.EvolveItem_ID");
        } catch (error) {
          Evolve.Log.error(" EERR####: Error While Get Single Sales Quote Detail  "+error.message);
          return new Error(" EERR####: Error While Get Single Sales Quote Detail  "+error.message);
        }
      },
  







}