'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  getRejectionWorkOrderDatatableList: async function (start, length) {
    // getRejectionWorkOrderDatatableList
    try {
      return await Evolve.SqlPool.request()
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(
          "SELECT ers.* , eu.EvolveUser_Name, ep.EvolveProcess_Name ,ei.EvolveItem_Code ,ept.EvolveProcessTemp_Name FROM EvolveReworkSrNo ers INNER JOIN EvolveUser eu ON eu.EvolveUser_ID = ers.EvolveReworkSrNo_CreatedUser INNER JOIN EvolveProcessTempSeq epts ON  epts.Evolveprocesstemp_seq = ers.EvolveReworkSrNo_Seq INNER JOIN EvolveProcess ep on epts.Evolveprocesstemp_seq = ep.EvolveProcess_ID AND epts.Evolveprocesstemp_id = ers.EvolveProcessTemp_ID INNER JOIN EvolveItem ei ON ei.EvolveItem_ID = ers.EvolveItem_ID INNER JOIN EvolveProcessTemp ept ON ept.EvolveProcessTemp_ID = ers.EvolveProcessTemp_ID WHERE ers.EvolveReworkSrNo_Status = 'Rejected' ORDER BY ers.EvolveReworkSrNo_ID DESC"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1983: Error while getting Rejection Work Order Datatable List "+error.message);
      return new Error(" EERR1983: Error while getting Rejection Work Order Datatable List "+error.message);
    }
  },

  getSinglePodProceess: async function (data) {
    try {
      return await Evolve.SqlPool.request()
      .input('EvolveProdOrdersDetail_ID',Evolve.Sql.Int,data.EvolveProdOrdersDetail_ID)
      .query("SELECT ep.EvolveProcess_Name , ep.EvolveProcess_ID FROM evolveprodordersdetail epod, EvolveProdOrders epo , EvolveItem ei , EvolveProcessTemp ept , EvolveProcessTempSeq epts , EvolveProcess ep where epod.EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID AND ept.EvolveProcessTemp_ID = ei.EvolveProcessTemp_Id AND epts.EvolveProcessTemp_ID = ept.EvolveProcessTemp_ID AND epts.EvolveProcessTemp_Seq <=  epod.Evolveprodordersdetail_nxtseq AND ep.EvolveProcess_ID = epts.EvolveProcess_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1984: Error while getting Single Pod Proceess "+error.message);
      return new Error(" EERR1984: Error while getting Single Pod Proceess "+error.message);
    }
  },

  updateEpodReworkstatus: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_ID",
          Evolve.Sql.Int,
          data.EvolveProdOrdersDetail_ID
        )
        .input(
          "EvolveProdOrdersDetail_NxtSeq",
          Evolve.Sql.Int,
          data.EvolveProdOrdersDetail_NxtSeq
        )
        .query(
          "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_NxtSeq = @EvolveProdOrdersDetail_NxtSeq, EvolveProdOrdersDetail_Status = 'In Process' WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1985: Error while updating Epod Rework status "+error.message);
      return new Error(" EERR1985: Error while updating Epod Rework status "+error.message);
    }
  },

  updateReworkRemarkStatus: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveReworkSrNo_ID", Evolve.Sql.Int, data.EvolveReworkSrNo_ID)
        .input(
          "EvolveReworkSrNo_Remarks",
          Evolve.Sql.NVarChar,
          data.EvolveReworkSrNo_Remarks
        )
        .query(
          "UPDATE EvolveReworkSrNo SET EvolveReworkSrNo_Remarks = @EvolveReworkSrNo_Remarks, EvolveReworkSrNo_Status = 'Reworked' WHERE EvolveReworkSrNo_ID = @EvolveReworkSrNo_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1986: Error while updating Rework Remark Status "+error.message);
      return new Error(" EERR1986: Error while updating Rework Remark Status "+error.message);
    }
  },

  getScrapDetails: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveProdOrdersDetail_ID",
          Evolve.Sql.Int,
          data.EvolveProdOrdersDetail_ID
        )
        .query(
          "  SELECT EvolveProdOrdersDetail_Serial  ,EvolveProdOrdersDetail_NxtSeq FROM EvolveProdOrdersDetail  WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1987: Error while getting Scrap Details "+error.message);
      return new Error(" EERR1987: Error while getting Scrap Details "+error.message);
    }
  },

  addScrapDetails: async function (data, record) {
    try {
      let dateTime = new Date();
      let dataTime =
        dateTime.getFullYear() +
        "-" +
        (dateTime.getMonth() + 1) +
        "-" +
        dateTime.getDate() +
        " " +
        dateTime.getHours() +
        ":" +
        dateTime.getMinutes() +
        ":" +
        dateTime.getSeconds();
      return await Evolve.SqlPool.request()
        .input(
          "EvolveReworkSrNo_Remarks",
          Evolve.Sql.NVarChar,
          data.EvolveReworkSrNo_Remarks
        )
        .input(
          "EvolveProdOrdersDetail_Serial",
          Evolve.Sql.NVarChar,
          record.EvolveProdOrdersDetail_Serial
        )
        .input(
          "EvolveProdOrdersDetail_NxtSeq",
          Evolve.Sql.Int,
          record.EvolveProdOrdersDetail_NxtSeq
        )
        .input(
          "EvolveProdOrdersDetail_ID",
          Evolve.Sql.Int,
          data.EvolveProdOrdersDetail_ID
        )
        .input("EvolveScrap_From", Evolve.Sql.NVarChar, data.EvolveScrap_From)
        .input(
          "EvolveScrap_SupplierCode",
          Evolve.Sql.NVarChar,
          data.EvolveScrap_SupplierCode
        )
        .input("EvolveScrap_CreatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolveScrap_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolveScrap_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
        .input("EvolveScrap_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .query(
          " INSERT INTO EvolveScrap (EvolveProdOrderDetails_ID,EvolveScrap_Serial,EvolveProcess_ID,EvolveScrap_Remark,EvolveScrap_Status,EvolveScrap_In,EvolveScrap_From,EvolveScrap_SupplierCode,EvolveScrap_CreatedUser,EvolveScrap_UpdatedUser,EvolveScrap_CreatedAt , EvolveScrap_UpdatedAt)  VALUES (@EvolveProdOrdersDetail_ID, @EvolveProdOrdersDetail_Serial, @EvolveProdOrdersDetail_NxtSeq,@EvolveReworkSrNo_Remarks,'In Queue','true',@EvolveScrap_From,@EvolveScrap_SupplierCode,@EvolveScrap_CreatedUser,@EvolveScrap_UpdatedUser,@EvolveScrap_CreatedAt ,@EvolveScrap_UpdatedAt)"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1988: Error while adding Scrap Details "+error.message);
      return new Error(" EERR1988: Error while adding Scrap Details "+error.message);
    }
  },

  updateEpodScrapStatus: async function (data) {
    try {
      return await Evolve.SqlPool.request()

        .input(
          "EvolveProdOrdersDetail_ID",
          Evolve.Sql.Int,
          data.EvolveProdOrdersDetail_ID
        )
        .input(
          "EvolveProdOrdersDetail_NxtSeq",
          Evolve.Sql.Int,
          data.EvolveProdOrdersDetail_NxtSeq
        )
        .query(
          "UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_Status = 'Scrapped' WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1989: Error while updating Epod Scrap Status "+error.message);
      return new Error(" EERR1989: Error while updating Epod Scrap Status "+error.message);
    }
  },

  updateScrapRemarkStatus: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveReworkSrNo_ID", Evolve.Sql.Int, data.EvolveReworkSrNo_ID)
        .input(
          "EvolveReworkSrNo_Remarks",
          Evolve.Sql.NVarChar,
          data.EvolveReworkSrNo_Remarks
        )
        .query(
          "UPDATE EvolveReworkSrNo SET EvolveReworkSrNo_Remarks = @EvolveReworkSrNo_Remarks, EvolveReworkSrNo_Status = 'Scrapped' WHERE EvolveReworkSrNo_ID = @EvolveReworkSrNo_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1990: Error while updating Scrap Remark Status "+error.message);
      return new Error(" EERR1990: Error while updating Scrap Remark Status "+error.message);
    }
  },



}