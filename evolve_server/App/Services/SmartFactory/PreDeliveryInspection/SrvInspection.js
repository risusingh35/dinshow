'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


  getPDISingleData: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .query("SELECT edo.EvolveDO_Number, edo.EvolveDO_CreatedAt, edo.EvolveDO_SONumber,EvolveDOLine_QtyDO,(SELECT DISTINCT es.EvolveSupplier_Name FROM EvolveSupplier es  WHERE es.EvolveSupplier_Code = eso.EvolveSalesOrder_Cust) as 'Customer_Name',eso.EvolveSalesOrder_Shipto, eso.EvolveSalesOrder_Billto,edol.EvolveDOLine_Part,(select GETDATE() ) as 'date', edo.EvolveDO_LRDate , edo.EvolveDO_VehicelNumber, edo.EvolveDO_Transporter , ei.EvolveItem_ID ,(SELECT eit.EvolveItem_Code FROM EvolveSubItem esi , EvolveItem eit WHERE esi.EvolveSubItem_ActualItemID = ei.EvolveItem_ID AND eit.EvolveItem_ID = esi.EvolveSubItem_SubItem_ID) as 'sub_item' FROM EvolveDoLine edol, EvolveDo edo, EvolveSalesOrder eso , EvolveItem ei WHERE edol.EvolveDOLine_ID = @EvolveDOLine_ID AND edol.EvolveDO_ID = edo.EvolveDO_ID AND eso.EvolveSalesOrder_Number = edo.EvolveDO_SONumber AND ei.EvolveItem_Code = edol.EvolveDOLine_Part"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1824: Error while getting PDI Single Data "+error.message);
      return new Error(" EERR1824: Error while getting PDI Single Data "+error.message);
    }
  },

  getAllPdiTempDetail: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .query(
          "SELECT eptd.* FROM EvolveDoLine edol, EvolveItem ei, EvolvePDITemplateDetail eptd WHERE edol.EvolveDOLine_ID = @EvolveDOLine_ID AND edol.EvolveDOLine_Part = ei.EvolveItem_Code AND ei.EvolvePDITemplate_ID = eptd.EvolvePDITemplate_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1825: Error while getting All Pdi Temp Detail "+error.message);
      return new Error(" EERR1825: Error while getting All Pdi Temp Detail "+error.message);
    }
  },

  addRejectSerialNo: async function (data, srData) {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_Order",Evolve.Sql.NVarChar,srData.EvolveProdOrders_Order)
        .input("EvolveProdOrdersDetail_Serial",Evolve.Sql.NVarChar,srData.EvolveProdOrdersDetail_Serial)
        .input("EvolveReworkSrNo_Serial",Evolve.Sql.NVarChar,"R" + srData.EvolveProdOrdersDetail_Serial)
        .input("EvolveProcessTemp_ID",Evolve.Sql.Int,srData.EvolveProcessTemp_Id)
        .input("EvolveItem_ID",Evolve.Sql.Int,srData.EvolveItem_ID)
        .input("EvolveProdOrdersDetail_ID",Evolve.Sql.Int,srData.EvolveProdOrdersDetail_ID)
        .input("EvolveReworkSrNo_Remarks",Evolve.Sql.NVarChar,data.EvolveReworkSrNo_Remarks)
        .input("EvolveReworkSrNo_Status", Evolve.Sql.NVarChar, "Rejected")
        .input("EvolveReworkSrNo_CreatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolveReworkSrNo_CreatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
        .input("EvolveReworkSrNo_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolveReworkSrNo_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
        .query("INSERT INTO EvolveReworkSrNo (EvolveProdOrders_Order, EvolveProdOrdersDetail_Serial, EvolveReworkSrNo_Serial, EvolveProcessTemp_ID,EvolveItem_ID,EvolveProdOrdersDetail_ID,EvolveReworkSrNo_Status, EvolveReworkSrNo_Remarks, EvolveReworkSrNo_CreatedAt, EvolveReworkSrNo_CreatedUser, EvolveReworkSrNo_UpdatedAt, EvolveReworkSrNo_UpdatedUser) VALUES (@EvolveProdOrders_Order, @EvolveProdOrdersDetail_Serial, @EvolveReworkSrNo_Serial, @EvolveProcessTemp_Id,@EvolveItem_ID,@EvolveProdOrdersDetail_ID, @EvolveReworkSrNo_Status, @EvolveReworkSrNo_Remarks, @EvolveReworkSrNo_CreatedAt, @EvolveReworkSrNo_CreatedUser,  @EvolveReworkSrNo_UpdatedAt, @EvolveReworkSrNo_UpdatedUser)");
    } catch (error) {
      Evolve.Log.error(" EERR1826: Error while adding Reject Serial No "+error.message);
      return new Error(" EERR1826: Error while adding Reject Serial No "+error.message);
    }
  },

  pdiPODUpdateStatus: async function (data) {
    try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()

        .input("EvolveProdOrdersDetail_Serial",Evolve.Sql.NVarChar,
          data.EvolveProdOrdersDetail_Serial
        )
        .input(
          "EvolveProdOrdersDetail_Status",
          Evolve.Sql.NVarChar,
          "PDI Rejected"
        )
        .input(
          "EvolveProdOrdersDetail_UpdatedAt",
          Evolve.Sql.NVarChar,
          dataTime
        )
        .input(
          "EvolveProdOrdersDetail_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .query(
          "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_Status = @EvolveProdOrdersDetail_Status, EvolveProdOrdersDetail_UpdatedAt = @EvolveProdOrdersDetail_UpdatedAt, EvolveProdOrdersDetail_UpdatedUser = @EvolveProdOrdersDetail_UpdatedUser , EvolveProdOrdersDetail_IsRejected = 1 WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1827: Error in pdi POD Update Status "+error.message);
      return new Error(" EERR1827: Error in pdi POD Update Status "+error.message);
    }
  },

  getPDIData: async function (EvolveDOLine_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, EvolveDOLine_ID)
        .query(
          "SELECT * FROM EvolvePDIHistory WHERE EvolveDOLine_ID = @EvolveDOLine_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1828: Error while getting PDI Data "+error.message);
      return new Error(" EERR1828: Error while getting PDI Data "+error.message);
    }
  },

  checkSerialNo: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.NVarChar, data.EvolveItem_ID)
        .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, data.EvolveProdOrdersDetail_Serial)
        // .query("SELECT EvolveProdOrdersDetail_Serial FROM EvolveProdOrdersDetail  WHERE EvolveProdOrders_ID IN (SELECT EvolveProdOrders_ID  FROM EvolveProdOrders WHERE EvolveItem_ID = @EvolveItem_ID )AND  EvolveProdOrdersDetail_Status = 'Completed'");
        .query(" SELECT *  FROM EvolveProdOrdersDetail  WHERE EvolveProdOrders_ID IN (SELECT EvolveProdOrders_ID  FROM EvolveProdOrders WHERE EvolveItem_ID = @EvolveItem_ID ) AND  EvolveProdOrdersDetail_Status = 'Completed' AND EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND EvolveProdOrdersDetail_IsExported = 0");
    } catch (error) {
      Evolve.Log.error(" EERR1829: Error while checking Serial No "+error.message);
      return new Error(" EERR1829: Error while checking Serial No "+error.message);
    }
  },

  getDoId: async function (id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, id)
        .query("SELECT EvolveDO_ID , EvolvePDITemplate_ID , EvolveDOLine_Number  FROM EvolveDoLine WHERE EvolveDOLine_ID = @EvolveDOLine_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1830: Error while getting Do Id "+error.message);
      return new Error(" EERR1830: Error while getting Do Id "+error.message);
    }
  },


  getPdiHistorySerialNo: async function (EvolveDOLine_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, EvolveDOLine_ID)
        .query(
          "SELECT distinct(EvolveProdOrdersDetail_Serial) FROM EvolvePDIHistory  WHERE EvolveDOLine_ID = @EvolveDOLine_ID AND EvolveProdOrdersDetail_Serial != ''"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1831: Error while getting Pdi History Serial No "+error.message);
      return new Error(" EERR1831: Error while getting Pdi History Serial No "+error.message);
    }
  },

  deletePdiHistory: async function (EvolveDOLine_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, EvolveDOLine_ID)
        .query(
          "Delete From EvolvePDIHistory WHERE EvolveDOLine_ID = @EvolveDOLine_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1832: Error while deleting Pdi History "+error.message);
      return new Error(" EERR1832: Error while deleting Pdi History "+error.message);
    }
  },
  changePdiStatus: async function (serialNo, EvolvePDI_Status) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, serialNo)
        .input("EvolvePDI_Status", Evolve.Sql.Int, EvolvePDI_Status)
        .query(
          "UPDATE EvolveProdOrdersHistory  SET EvolvePDI_Status = @EvolvePDI_Status WHERE EvolveProdOrderHistoryType_Code = 'PRODORD' AND EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial "
        );
    } catch (error) {
      Evolve.Log.error(" EERR1833: Error while changing Pdi Status "+error.message);
      return new Error(" EERR1833: Error while changing Pdi Status "+error.message);
    }
  },

  addPdiHistoryData: async function (data, loginId, serialNo) {
    try {
      // Check if record already presen to

      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .input(
          "EvolvePDITemplate_ID",
          Evolve.Sql.Int,
          data.EvolvePDITemplate_ID
        )
        .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, serialNo)
        .input(
          "EvolvePDIHistory_Key",
          Evolve.Sql.NVarChar,
          data.EvolvePDIHistory_Key
        )
        .input("ParaLabel", Evolve.Sql.NVarChar, data.ParaLabel)
        .input("ParaType", Evolve.Sql.NVarChar, data.ParaType)
        .input("ParaValue", Evolve.Sql.NVarChar, data.ParaValue)
        .input("EvolvePDILine_ID", Evolve.Sql.Int, data.EvolvePDILine_ID)
        .input(
          "EvolvePDIHistory_Status",
          Evolve.Sql.NVarChar,
          data.EvolvePDIHistory_Status
        )
        // .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar, data.EvolveProdOrdersDetail_Serial)
        .input("EvolvePDIHistory_CreatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolvePDIHistory_CreatedUser", Evolve.Sql.Int, loginId)
        .input("EvolvePDIHistory_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolvePDIHistory_UpdatedUser", Evolve.Sql.Int, loginId)
        .query(
          "INSERT INTO EvolvePDIHistory (EvolveDO_ID ,EvolveDOLine_ID,EvolvePDITemplate_ID ,EvolveProdOrdersDetail_Serial ,EvolvePDIHistory_ParaLabel,EvolvePDIHistory_ParaType ,EvolvePDIHistory_ParaValue ,EvolvePDIHistory_Status ,EvolvePDIHistory_CreatedUser,EvolvePDIHistory_CreatedAt  ,EvolvePDIHistory_UpdatedUser, EvolvePDIHistory_UpdatedAt, EvolvePDILine_ID,EvolvePDIHistory_Key)     VALUES   (@EvolveDO_ID, @EvolveDOLine_ID,@EvolvePDITemplate_ID,@EvolveProdOrdersDetail_Serial,@ParaLabel,@ParaType,@ParaValue,@EvolvePDIHistory_Status,@EvolvePDIHistory_CreatedUser,@EvolvePDIHistory_CreatedAt,@EvolvePDIHistory_UpdatedUser,@EvolvePDIHistory_UpdatedAt, @EvolvePDILine_ID,@EvolvePDIHistory_Key)   "
        );
    } catch (error) {
      Evolve.Log.error(" EERR1834: Error while adding Pdi History Data "+error.message);
      return new Error(" EERR1834: Error while adding Pdi History Data "+error.message);
    }
  },

  changePdiStatus: async function (serialNo, EvolvePDI_Status) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, serialNo)
        .input("EvolvePDI_Status", Evolve.Sql.Int, EvolvePDI_Status)
        .query(
          "UPDATE EvolveProdOrdersHistory  SET EvolvePDI_Status = @EvolvePDI_Status WHERE EvolveProdOrderHistoryType_Code = 'PRODORD' AND EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial "
        );
    } catch (error) {
      Evolve.Log.error(" EERR1835: Error while changing Pdi Status "+error.message);
      return new Error(" EERR1835: Error while changing Pdi Status "+error.message);
    }
  },

  getDoNumberById: async function (data) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .query(
          "SELECT EvolveDO_Number FROM EvolveDo WHERE EvolveDO_ID = @EvolveDO_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1836: Error while getting Do Number By Id "+error.message);
      return new Error(" EERR1836: Error while getting Do Number By Id "+error.message);
    }
  },

  getCurrentQty: async function (EvolveDO_Number, EvolveDOLine_Number) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveDoLine_Number", Evolve.Sql.Int, EvolveDOLine_Number)
        .input("EvolveDo_Number", Evolve.Sql.NVarChar, EvolveDO_Number)

        .query(
          " SELECT EvolveDoLine_DoQty FROM EvolveDoHistory WHERE EvolveDo_Number= @EvolveDo_Number AND  EvolveDoLine_Number=EvolveDoLine_Number"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1837: Error while getting Current Qty "+error.message);
      return new Error(" EERR1837: Error while getting Current Qty "+error.message);
    }
  },

  updateDoHistoryPdiQty: async function (doNumber, doLineNumber,qty,EvolvePDITemplate_ID,data) 
  {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      let updateDoHistory = await Evolve.SqlPool.request()
        .input("EvolveDoHistory_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDoHistory_UpdatedUser", Evolve.Sql.Int,data.EvolveUser_ID)
        .input("EvolveDoLine_PDIQty", Evolve.Sql.Int, qty)
        .input("EvolveDo_PDITemplate", Evolve.Sql.NVarChar, EvolvePDITemplate_ID )
        .input("EvolveDo_Number", Evolve.Sql.NVarChar, doNumber)
        .input("EvolveDoLine_Number", Evolve.Sql.Int, doLineNumber)
        .query("UPDATE EvolveDoHistory SET  EvolveDoLine_PDIQty = @EvolveDoLine_PDIQty , EvolveDo_PDITemplate =@EvolveDo_PDITemplate , EvolveDoHistory_UpdatedAt = @EvolveDoHistory_UpdatedAt , EvolveDoHistory_UpdatedUser = @EvolveDoHistory_UpdatedUser  WHERE EvolveDoLine_Number = @EvolveDoLine_Number AND EvolveDo_Number = @EvolveDo_Number");
      if(updateDoHistory instanceof Error || updateDoHistory.rowsAffected < 1)
      {
        return updateDoHistory;
      }
      else
      {
        return await Evolve.SqlPool.request()
        .input("EvolveDOLine_QtyPDI", Evolve.Sql.Int, qty)
        .input("EvolveDo_Number", Evolve.Sql.NVarChar, doNumber)
        .input("EvolveDoLine_Number", Evolve.Sql.Int, doLineNumber)
        .query("UPDATE EvolveDoLine SET  EvolveDOLine_QtyPDI = @EvolveDOLine_QtyPDI WHERE EvolveDoLine_Number LIKE @EvolveDoLine_Number AND EvolveDO_ID = (SELECT EvolveDO_ID FROM EvolveDo WHERE EvolveDO_Number LIKE @EvolveDo_Number)");
      }
    } catch (error) {
      Evolve.Log.error(" EERR1838: Error while updating Do History Pdi Qty "+error.message);
      return new Error(" EERR1838: Error while updating Do History Pdi Qty "+error.message);
    }
  },

  checkSerialNoInPdiHistory: async function (EvolveProdOrdersDetail_Serial) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, EvolveProdOrdersDetail_Serial)
        .query("SELECT EvolveProdOrdersDetail_Serial FROM EvolvePDIHistory WHERE EvolveProdOrdersDetail_Serial= @EvolveProdOrdersDetail_Serial");
    } catch (error) {
      Evolve.Log.error(" EERR1839: Error while checking Serial No In Pdi History "+error.message);
      return new Error(" EERR1839: Error while checking Serial No In Pdi History "+error.message);
    }
  },

  getProdOrderSerialId: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrdersDetail_Serial",Evolve.Sql.NVarChar,data.EvolveProdOrdersDetail_Serial)
        .query("SELECT epo.EvolveProdOrders_ID ,epo.EvolveProdOrders_Order, epod.EvolveProdOrdersDetail_ID,epod.EvolveProdOrdersDetail_Serial , ei.EvolveProcessTemp_Id , ei.EvolveItem_ID FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID AND epod.EvolveProdOrdersDetail_Status = 'Completed'");
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },





}