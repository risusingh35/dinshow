'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  getSingleDoData: async function (data) {
      try {
        return await Evolve.SqlPool.request()
          .input("id", Evolve.Sql.Int, data.id)
          .query(
            "SELECT do.* , so.*  , esb.EvolveSupplier_City as bill_to_city , esb.EvolveSupplier_City as ship_to_city FROM EvolveDo do , EvolveSalesOrder so INNER JOIN EvolveSupplier esb ON esb.EvolveSupplier_Code LIKE so.EvolveSalesOrder_Billto INNER JOIN EvolveSupplier ess ON ess.EvolveSupplier_Code LIKE so.EvolveSalesOrder_Shipto WHERE do.EvolveDO_ID = @id  AND do.EvolveDO_SONumber = so.EvolveSalesOrder_Number"
          );
      } catch (error) {
        Evolve.Log.error(" EERR1619: Error while getting Single Do Data "+error.message);
        return new Error(" EERR1619: Error while getting Single Do Data "+error.message);
      }
  },

  getdoidpdftabledata: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("id", Evolve.Sql.Int, data.id)
        .query(
          "SELECT edl.EvolveDOLine_Part as item_code, ei.EvolveItem_Desc, edl.EvolveDOLine_QtyDO as Qty FROM EvolveDoLine edl LEFT JOIN EvolveItem ei ON ei.EvolveItem_Code = edl.EvolveDOLine_Part WHERE edl.EvolveDO_ID = @id"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1620: Error while getting do id pdf table data "+error.message);
      return new Error(" EERR1620: Error while getting do id pdf table data "+error.message);
    }
  },

      
  getDoDataTableList: async function (data) {
    try {
      if (data.Do_Id != "" && data.So_Id == "" && data.Customer_Code == "") {
        return await Evolve.SqlPool.request()
          .input("EvolveDO_ID", Evolve.Sql.Int, data.Do_Id)
          .query(
            "select do.* , so.EvolveSalesOrder_Cust from EvolveDo do ,EvolveSalesOrder so where so.EvolveSalesOrder_Number = do.EvolveDO_SONumber AND do.EvolveDO_ID = @EvolveDO_ID ORDER BY do.EvolveDO_ID"
          );
      } else if (
        data.Do_Id == "" &&
        data.So_Id != "" &&
        data.Customer_Code == ""
      ) {
        return await Evolve.SqlPool.request()
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.So_Id)
          .query(
            "select do.* , so.EvolveSalesOrder_Cust from EvolveDo do ,EvolveSalesOrder so where so.EvolveSalesOrder_Number = do.EvolveDO_SONumber AND so.EvolveSalesOrder_ID = @EvolveSalesOrder_ID ORDER BY do.EvolveDO_ID"
          );
      } else if (
        data.Do_Id == "" &&
        data.So_Id == "" &&
        data.Customer_Code != ""
      ) {
        return await Evolve.SqlPool.request()
          .input("Customer_Code", Evolve.Sql.NVarChar, data.Customer_Code)
          .query(
            "select do.* , so.EvolveSalesOrder_Cust from EvolveDo do ,EvolveSalesOrder so where so.EvolveSalesOrder_Number = do.EvolveDO_SONumber AND so.EvolveSalesOrder_Cust = @Customer_Code ORDER BY do.EvolveDO_ID"
          );
      } else if (
        data.Do_Id != "" &&
        data.So_Id != "" &&
        data.Customer_Code == ""
      ) {
        return await Evolve.SqlPool.request()
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.So_Id)
          .input("EvolveDO_ID", Evolve.Sql.Int, data.Do_Id)
          .query(
            "select do.* , so.EvolveSalesOrder_Cust from EvolveDo do ,EvolveSalesOrder so where so.EvolveSalesOrder_Number = do.EvolveDO_SONumber AND so.EvolveSalesOrder_ID = @EvolveSalesOrder_ID AND do.EvolveDO_ID = @EvolveDO_ID ORDER BY do.EvolveDO_ID"
          );
      } else if (
        data.Do_Id != "" &&
        data.So_Id == "" &&
        data.Customer_Code != ""
      ) {
        return await Evolve.SqlPool.request()
          .input("Customer_Code", Evolve.Sql.NVarChar, data.Customer_Code)
          .input("EvolveDO_ID", Evolve.Sql.Int, data.Do_Id)
          .query(
            "select do.* , so.EvolveSalesOrder_Cust from EvolveDo do ,EvolveSalesOrder so where so.EvolveSalesOrder_Number = do.EvolveDO_SONumber AND so.EvolveSalesOrder_Cust = @Customer_Code AND do.EvolveDO_ID = @EvolveDO_ID ORDER BY do.EvolveDO_ID"
          );
      } else if (
        data.Do_Id == "" &&
        data.So_Id != "" &&
        data.Customer_Code != ""
      ) {
        return await Evolve.SqlPool.request()
          .input("Customer_Code", Evolve.Sql.NVarChar, data.Customer_Code)
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.So_Id)
          .query(
            "select do.* , so.EvolveSalesOrder_Cust from EvolveDo do ,EvolveSalesOrder so where so.EvolveSalesOrder_Number = do.EvolveDO_SONumber AND so.EvolveSalesOrder_Cust = @Customer_Code AND so.EvolveSalesOrder_ID = @EvolveSalesOrder_ID ORDER BY do.EvolveDO_ID"
          );
      } else if (
        data.Do_Id != "" &&
        data.So_Id != "" &&
        data.Customer_Code != ""
      ) {
        return await Evolve.SqlPool.request()
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.So_Id)
          .input("EvolveDO_ID", Evolve.Sql.Int, data.Do_Id)
          .input("Customer_Code", Evolve.Sql.NVarChar, data.Customer_Code)
          .query(
            "select do.* , so.EvolveSalesOrder_Cust from EvolveDo do ,EvolveSalesOrder so where so.EvolveSalesOrder_Number = do.EvolveDO_SONumber AND so.EvolveSalesOrder_ID = @EvolveSalesOrder_ID AND do.EvolveDO_ID = @EvolveDO_ID AND so.EvolveSalesOrder_Cust = @Customer_Code ORDER BY do.EvolveDO_ID"
          );
      } else {
        return await Evolve.SqlPool.request().query(
          "select do.* , so.EvolveSalesOrder_Cust from EvolveDo do ,EvolveSalesOrder so where so.EvolveSalesOrder_Number = do.EvolveDO_SONumber ORDER BY do.EvolveDO_ID"
        );
      }
    } catch (error) {
      Evolve.Log.error(" EERR1621: Error while getting Do Data Table List "+error.message);
      return new Error(" EERR1621: Error while getting Do Data Table List "+error.message);
    }
  },

  getallCustomer: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "select * from  EvolveSupplier where EvolveSupplier_Type = 'Customer' "
      );
    } catch (error) {
      Evolve.Log.error(" EERR1622: Error while getting all Customer "+error.message);
      return new Error(" EERR1622: Error while getting all Customer "+error.message);
    }
  },
  getSingleDoSoLine: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .query(
          "SELECT dol.EvolveDOLine_ID , dol.EvolveDOLine_QtyDO , sol.*   FROM EvolveDo do, EvolveDoLine dol , EvolveSalesOrderLine sol WHERE do.EvolveDO_ID = dol.EvolveDO_ID AND dol.EvolveSalesOrderLine_ID = sol.EvolveSalesOrderLine_ID AND do.EvolveDO_ID = @EvolveDO_ID  ORDER BY sol.EvolveSalesOrderLine_ID ASC"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1623: Error while getting Single Do So Line "+error.message);
      return new Error(" EERR1623: Error while getting Single Do So Line "+error.message);
    }
  },

  getSalesOrderDetails: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.EvolveSalesOrder_ID)
        .query(
          "select * from EvolveSalesOrder where EvolveSalesOrder_ID = @EvolveSalesOrder_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1624: Error while getting Sales Order Details "+error.message);
      return new Error(" EERR1624: Error while getting Sales Order Details "+error.message);
    }
  },
  getDoDetails: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.EvolveSalesOrder_ID)

        .query(
          "select EvolveSalesOrderLine_ID ,EvolveSalesOrderLine_Number,EvolveSalesOrderLine_Part, EvolveSalesOrderLine_Custpart,EvolveSalesOrderLine_OrderQty,EvolveSalesOrderLine_InvQty,EvolveSalesOrderLine_DOQty,EvolveSalesOrderLine_Status from EvolveSalesOrderLine where EvolveSalesOrder_ID = @EvolveSalesOrder_ID AND EvolveSalesOrderLine_Status ='open' ORDER BY EvolveSalesOrderLine_ID ASC"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1625: Error while getting Do Details "+error.message);
      return new Error(" EERR1625: Error while getting Do Details "+error.message);
    }
  },
  getSoNumberList: async function () {
    try {
      let status = "open";
      return await Evolve.SqlPool.request()
        .input("status", Evolve.Sql.NVarChar, status)
        .query(
          "select * from  EvolveSalesOrder where EvolveSalesOrder_Status = @status "
        );
    } catch (error) {
      Evolve.Log.error(" EERR1626: Error while getting So Number List "+error.message);
      return new Error(" EERR1626: Error while getting So Number List "+error.message);
    }
  },

  getSoNumberById: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.EvolveSalesOrder_ID)
        .query(
          " select EvolveSalesOrder_Number from EvolveSalesOrder where EvolveSalesOrder_ID = @EvolveSalesOrder_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1627: Error while getting So Number By Id "+error.message);
      return new Error(" EERR1627: Error while getting So Number By Id "+error.message);
    }
  },

  addDoList: async function (data, soNumber) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveDo_Number", Evolve.Sql.NVarChar, data.EvolveDo_Number)
        .input("soNumber", Evolve.Sql.NVarChar, soNumber)
        .input("EvolveDO_ShipDate", Evolve.Sql.NVarChar, data.EvolveDO_ShipDate)
        .input(
          "EvolveDO_VehicelNumber",
          Evolve.Sql.NVarChar,
          data.EvolveDO_VehicelNumber
        )
        .input(
          "EvolveDO_Transporter",
          Evolve.Sql.NVarChar,
          data.EvolveDO_Transporter
        )
        .input("EvolveDO_CreatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDO_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDO_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolveDO_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .query(
          "INSERT INTO EvolveDo  (  EvolveDO_Number ,EvolveDO_SONumber, EvolveDO_ShipDate,EvolveDO_VehicelNumber, EvolveDO_Transporter ,EvolveDO_Status ,EvolveDO_CreatedAt ,EvolveDO_UpdatedAt,EvolveDO_CreatedUser,EvolveDO_UpdatedUser) VALUES (@EvolveDO_Number ,@soNumber, @EvolveDO_ShipDate,@EvolveDO_VehicelNumber, @EvolveDO_Transporter ,'open',@EvolveDO_CreatedAt ,@EvolveDO_UpdatedAt ,@EvolveDO_CreatedUser,@EvolveDO_UpdatedUser);select @@IDENTITY AS 'inserted_id'"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1628: Error while adding Do List "+error.message);
      return new Error(" EERR1628: Error while adding Do List "+error.message);
    }
  },

  getTempId: async function (part) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_Code", Evolve.Sql.NVarChar, part)
        .query(
          "  SELECT EvolvePDITemplate_ID FROM EvolveItem WHERE EvolveItem_Code = @EvolveItem_Code"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1629: Error while getting Temp Id "+error.message);
      return new Error(" EERR1629: Error while getting Temp Id "+error.message);
    }
  },

  
  addDoLineData: async function (data) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

      return await Evolve.SqlPool.request()
        .input(
          "EvolveSalesOrderLine_ID",
          Evolve.Sql.Int,
          data.EvolveSalesOrderLine_ID
        )
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .input(
          "EvolveDOLine_Number",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_Number
        )
        .input(
          "EvolveDOLine_Custpart",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_Custpart
        )
        .input(
          "EvolveDOLine_QtyInv",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_QtyInv
        )
        .input(
          "EvolveDOLine_QtyDO",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_QtyDO
        )
        .input("EvolveDOLine_Part", Evolve.Sql.NVarChar, data.EvolveDOLine_Part)
        .input(
          "EvolvePDITemplate_ID",
          Evolve.Sql.Int,
          data.EvolvePDITemplate_ID
        )
        .input("EvolveDOLine_CreatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDOLine_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolveDOLine_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDOLine_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
  
        .query(
          "INSERT INTO EvolveDoLine  (EvolveDO_ID, EvolveDOLine_Number,EvolveDOLine_Part, EvolveDOLine_Custpart ,EvolveDOLine_QtyDO, EvolveDOLine_QtyInv,EvolveDOLine_Status,EvolveSalesOrderLine_ID,EvolvePDITemplate_ID,EvolveDOLine_CreatedAt,EvolveDOLine_CreatedUser,EvolveDOLine_UpdatedAt ,EvolveDOLine_UpdatedUser) VALUES (@EvolveDO_ID, @EvolveDOLine_Number,@EvolveDOLine_Part, @EvolveDOLine_Custpart ,@EvolveDOLine_QtyDO,@EvolveDOLine_QtyInv , 'open',@EvolveSalesOrderLine_ID,@EvolvePDITemplate_ID,@EvolveDOLine_CreatedAt,@EvolveDOLine_CreatedUser,@EvolveDOLine_UpdatedAt,@EvolveDOLine_UpdatedUser)"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1630: Error while adding  Do Line Data "+error.message);
      return new Error(" EERR1630: Error while adding  Do Line Data "+error.message);
    }
  },

  updateSaesOrder: async function (id, qty) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

      let getDoQty = await Evolve.SqlPool.request()
        .input("EvolveSalesOrderLine_ID", Evolve.Sql.Int, id)
        .query(
          "SELECT EvolveSalesOrderLine_DOQty FROM  EvolveSalesOrderLine WHERE EvolveSalesOrderLine_ID=@EvolveSalesOrderLine_ID"
        );
      if (getDoQty.recordset[0].EvolveSalesOrderLine_DOQty == null) {
        let srDefault = await Evolve.SqlPool.request()
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, id)
          .input("initialqty", Evolve.Sql.NVarChar, "0")
          .query(
            "UPDATE EvolveSalesOrderLine SET  EvolveSalesOrderLine_DOQty = @initialqty  where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID"
          );

        let updateSolineNullDoQTY = await Evolve.SqlPool.request()
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, id)
          .input("qty", Evolve.Sql.Int, qty)
          .input("EvolveSalesOrderLine_UpdatedAt", Evolve.Sql.NVarChar, datetime)
          

          .query(
            "UPDATE EvolveSalesOrderLine SET  EvolveSalesOrderLine_DOQty =  EvolveSalesOrderLine_DOQty +@qty ,EvolveSalesOrderLine_UpdatedAt=@EvolveSalesOrderLine_UpdatedAt  where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID"
          );

        return updateSolineNullDoQTY;
      } else {
        let updateSoline = await Evolve.SqlPool.request()
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, id)
          .input("qty", Evolve.Sql.Int, qty)
          .query(
            "UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_DOQty =  EvolveSalesOrderLine_DOQty +@qty  where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID"
          );
        return updateSoline;
      }
    } catch (error) {
      Evolve.Log.error(" EERR1631: Error while updating Sales Order "+error.message);
      return new Error(" EERR1631: Error while updating Sales Order "+error.message);
    }
  },

  addDoHistory: async function (indexdata, data, soNumber) {
    try {
      indexdata.EvolveSoLine_Number;
    
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveDo_Number", Evolve.Sql.NVarChar, data.EvolveDo_Number)
        .input("EvolveSo_Number", Evolve.Sql.NVarChar, soNumber)
        .input(
          "EvolveDoLine_Number",
          Evolve.Sql.Int,
          indexdata.EvolveDOLine_Number
        )
        .input(
          "EvolveDoLine_Status",
          Evolve.Sql.NVarChar,
          data.doLineArrayData[0].EvolveSalesOrderLine_Status
        )
        .input(
          "EvolveDoLine_Part",
          Evolve.Sql.NVarChar,
          indexdata.EvolveDOLine_Part
        )
        .input(
          "EvolveDoLine_CustPart",
          Evolve.Sql.NVarChar,
          indexdata.EvolveDOLine_Custpart
        )
        .input(
          "EvolveDoLine_DoQty",
          Evolve.Sql.Int,
          indexdata.EvolveDOLine_QtyDO
        )
        .input(
          "EvolveDoLine_InvQty",
          Evolve.Sql.Int,
          data.doLineArrayData[0].EvolveSalesOrderLine_InvQty
        )
        .input(
          "EvolveSoLine_Number",
          Evolve.Sql.Int,
          indexdata.EvolveSoLine_Number
        )
        .input(
          "EvolveDo_VehicelNumber",
          Evolve.Sql.NVarChar,
          data.EvolveDO_VehicelNumber
        )
        .input(
          "EvolveDo_Transporter",
          Evolve.Sql.NVarChar,
          data.EvolveDO_Transporter
        )
        .input("EvolveDo_ShipDate", Evolve.Sql.NVarChar, data.EvolveDO_ShipDate)
        .input("EvolveDoHistory_CreatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDoHistory_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input(
          "EvolveDoHistory_CreatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input(
          "EvolveDoHistory_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input(
          "EvolveDo_PDITemplate",
          Evolve.Sql.Int,
          indexdata.EvolvePDITemplate_ID
        )

        .query(
          "INSERT INTO EvolveDoHistory (EvolveDo_Number,EvolveSo_Number,EvolveDoLine_Number,EvolveDoLine_Status,EvolveDoLine_Part,EvolveDoLine_CustPart,EvolveDoLine_DoQty,EvolveDoLine_InvQty,EvolveSoLine_Number,EvolveDo_VehicelNumber,EvolveDo_Transporter,EvolveDo_ShipDate,EvolveDoHistory_CreatedAt,EvolveDoHistory_UpdatedAt,EvolveDoHistory_CreatedUser,EvolveDoHistory_UpdatedUser,EvolveDo_PDITemplate) VALUES (@EvolveDo_Number,@EvolveSo_Number,@EvolveDoLine_Number,@EvolveDoLine_Status,@EvolveDoLine_Part,@EvolveDoLine_CustPart,@EvolveDoLine_DoQty,@EvolveDoLine_InvQty,@EvolveSoLine_Number,@EvolveDo_VehicelNumber,@EvolveDo_Transporter,@EvolveDo_ShipDate,@EvolveDoHistory_CreatedAt,@EvolveDoHistory_UpdatedAt,@EvolveDoHistory_CreatedUser,@EvolveDoHistory_UpdatedUser,@EvolveDo_PDITemplate)"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1632: Error while adding Do History "+error.message);
      return new Error(" EERR1632: Error while adding Do History "+error.message);
    }
  },

  addDolineNullPDI: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveSalesOrderLine_ID",
          Evolve.Sql.Int,
          data.EvolveSalesOrderLine_ID
        )
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .input(
          "EvolveDOLine_Number",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_Number
        )
        .input(
          "EvolveDOLine_Custpart",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_Custpart
        )
        .input(
          "EvolveDOLine_QtyInv",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_QtyInv
        )
        .input(
          "EvolveDOLine_QtyDO",
          Evolve.Sql.NVarChar,
          data.EvolveDOLine_QtyDO
        )
        .input("EvolveDOLine_Part", Evolve.Sql.NVarChar, data.EvolveDOLine_Part)
        .input("EvolveDOLine_CreatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDOLine_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolveDOLine_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDOLine_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
  

        // .input('EvolvePDITemplate_ID', Evolve.Sql.Int, data.EvolvePDITemplate_ID)

        .query(
          "INSERT INTO EvolveDoLine  (EvolveDO_ID, EvolveDOLine_Number,EvolveDOLine_Part, EvolveDOLine_Custpart ,EvolveDOLine_QtyDO, EvolveDOLine_QtyInv,EvolveDOLine_Status,EvolveSalesOrderLine_ID ,EvolveDOLine_QtyPDI,EvolveDOLine_CreatedAt,EvolveDOLine_CreatedUser,EvolveDOLine_UpdatedAt,EvolveDOLine_UpdatedUser) VALUES (@EvolveDO_ID, @EvolveDOLine_Number,@EvolveDOLine_Part, @EvolveDOLine_Custpart ,@EvolveDOLine_QtyDO,@EvolveDOLine_QtyInv , 'open',@EvolveSalesOrderLine_ID,@EvolveDOLine_QtyDO,@EvolveDOLine_CreatedAt,@EvolveDOLine_CreatedUser,@EvolveDOLine_UpdatedAt,@EvolveDOLine_UpdatedUser)"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1633: Error while adding Do line Null PDI "+error.message);
      return new Error(" EERR1633: Error while adding Do line Null PDI "+error.message);
    }
  },

  updateSONullPDI: async function (id, qty) {
    try {
      let getDoQty = await Evolve.SqlPool.request()
        .input("EvolveSalesOrderLine_ID", Evolve.Sql.Int, id)
        .query(
          "SELECT EvolveSalesOrderLine_DOQty FROM  EvolveSalesOrderLine WHERE EvolveSalesOrderLine_ID=@EvolveSalesOrderLine_ID"
        );
      if (getDoQty.recordset[0].EvolveSalesOrderLine_DOQty == null) {
        let srDefault = await Evolve.SqlPool.request()
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, id)
          .input("initialqty", Evolve.Sql.NVarChar, "0")
          .query(
            "UPDATE EvolveSalesOrderLine SET  EvolveSalesOrderLine_DOQty = @initialqty  where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID"
          );

        let updateSolineNullDoQTY = await Evolve.SqlPool.request()
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, id)
          .input("qty", Evolve.Sql.Int, qty)

          .query(
            "UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_DOQty =  EvolveSalesOrderLine_DOQty +@qty ,EvolveSalesOrderLine_PDIQty =EvolveSalesOrderLine_DOQty +@qty where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID"
          );

        return updateSolineNullDoQTY;
      } else {
        let solineUpdate = await Evolve.SqlPool.request()
          .input("EvolveSalesOrder_ID", Evolve.Sql.Int, id)
          .input("qty", Evolve.Sql.Int, qty)
          .query(
            "UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_DOQty =  EvolveSalesOrderLine_DOQty +@qty ,EvolveSalesOrderLine_PDIQty =EvolveSalesOrderLine_DOQty +@qty where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID"
          );

        return solineUpdate;
      }
    } catch (error) {
      Evolve.Log.error(" EERR1634: Error while updating SO Null PDI "+error.message);
      return new Error(" EERR1634: Error while updating SO Null PDI "+error.message);
    }
  },

  addDoHistoryNullPDI: async function (indexdata, data, soNumber) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveDo_Number", Evolve.Sql.NVarChar, data.EvolveDo_Number)
        .input("EvolveSo_Number", Evolve.Sql.NVarChar, soNumber)
        .input(
          "EvolveDoLine_Number",
          Evolve.Sql.Int,
          indexdata.EvolveDOLine_Number
        )
        .input(
          "EvolveDoLine_Status",
          Evolve.Sql.NVarChar,
          data.doLineArrayData[0].EvolveSalesOrderLine_Status
        )
        .input(
          "EvolveDoLine_Part",
          Evolve.Sql.NVarChar,
          indexdata.EvolveDOLine_Part
        )
        .input(
          "EvolveDoLine_CustPart",
          Evolve.Sql.NVarChar,
          indexdata.EvolveDOLine_Custpart
        )
        .input(
          "EvolveDoLine_DoQty",
          Evolve.Sql.Int,
          indexdata.EvolveDOLine_QtyDO
        )
        .input(
          "EvolveDoLine_InvQty",
          Evolve.Sql.Int,
          data.doLineArrayData[0].EvolveSalesOrderLine_InvQty
        )
        .input(
          "EvolveSoLine_Number",
          Evolve.Sql.Int,
          indexdata.EvolveSoLine_Number
        )
        .input(
          "EvolveDo_VehicelNumber",
          Evolve.Sql.NVarChar,
          data.EvolveDO_VehicelNumber
        )
        .input(
          "EvolveDo_Transporter",
          Evolve.Sql.NVarChar,
          data.EvolveDO_Transporter
        )
        .input("EvolveDo_ShipDate", Evolve.Sql.NVarChar, data.EvolveDO_ShipDate)
        .input("EvolveDoHistory_CreatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDoHistory_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input(
          "EvolveDoHistory_CreatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        .input(
          "EvolveDoHistory_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )
        // .input('EvolveDo_PDITemplate', Evolve.Sql.Int, indexdata.EvolvePDITemplate_ID)

        .query(
          "INSERT INTO EvolveDoHistory (EvolveDo_Number,EvolveSo_Number,EvolveDoLine_Number,EvolveDoLine_Status,EvolveDoLine_Part,EvolveDoLine_CustPart,EvolveDoLine_DoQty,EvolveDoLine_InvQty,EvolveSoLine_Number,EvolveDo_VehicelNumber,EvolveDo_Transporter,EvolveDo_ShipDate,EvolveDoHistory_CreatedAt,EvolveDoHistory_UpdatedAt,EvolveDoHistory_CreatedUser,EvolveDoHistory_UpdatedUser,EvolveDoLine_PDIQty) VALUES (@EvolveDo_Number,@EvolveSo_Number,@EvolveDoLine_Number,@EvolveDoLine_Status,@EvolveDoLine_Part,@EvolveDoLine_CustPart,@EvolveDoLine_DoQty,@EvolveDoLine_InvQty,@EvolveSoLine_Number,@EvolveDo_VehicelNumber,@EvolveDo_Transporter,@EvolveDo_ShipDate,@EvolveDoHistory_CreatedAt,@EvolveDoHistory_UpdatedAt,@EvolveDoHistory_CreatedUser,@EvolveDoHistory_UpdatedUser,@EvolveDoLine_DoQty)"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1635: Error while adding Do History Null PDI "+error.message);
      return new Error(" EERR1635: Error while adding Do History Null PDI "+error.message);
    }
  },

  updateDoList: async function (data) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input(
          "EvolveDO_VehicelNumber",
          Evolve.Sql.NVarChar,
          data.EvolveDO_VehicelNumber
        )
        .input(
          "EvolveDO_Transporter",
          Evolve.Sql.NVarChar,
          data.EvolveDO_Transporter
        )
        .input("EvolveDO_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .query(
          "UPDATE EvolveDo  SET EvolveDO_VehicelNumber =@EvolveDO_VehicelNumber, EvolveDO_Transporter =@EvolveDO_Transporter  ,EvolveDO_Status='open'  ,EvolveDO_UpdatedAt=@EvolveDO_UpdatedAt  WHERE EvolveDO_ID=@EvolveDO_ID "
        );
    } catch (error) {
      Evolve.Log.error(" EERR1636: Error while updating Do List "+error.message);
      return new Error(" EERR1636: Error while updating Do List "+error.message);
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
      Evolve.Log.error(" EERR1637: Error while getting Do Number By Id "+error.message);
      return new Error(" EERR1637: Error while getting Do Number By Id "+error.message);
    }
  },

  getPDITemplateID: async function (EvolveDOLine_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, EvolveDOLine_ID)
        .query(
          "SELECT EvolvePDITemplate_ID FROM EvolveDoLine WHERE EvolveDOLine_ID=@EvolveDOLine_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1638: Error while getting PDI Template ID "+error.message);
      return new Error(" EERR1638: Error while getting PDI Template ID "+error.message);
    }
  },

  updateNonPdiSaesOrder: async function (id, qty, oldQty) {
    try {
      let updateSoLine = await Evolve.SqlPool.request()
        .input("EvolveSalesOrderLine_ID", Evolve.Sql.Int, id)
        .input("qty", Evolve.Sql.Int, qty)
        .input("oldQty", Evolve.Sql.Int, oldQty)
        .query(
          "UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_DOQty =  EvolveSalesOrderLine_DOQty +@qty - @oldQty  where EvolveSalesOrderLine_ID =  @EvolveSalesOrderLine_ID"
        );

      let updateSoLinePDIQty = await Evolve.SqlPool.request()
        .input("EvolveSalesOrderLine_ID", Evolve.Sql.Int, id)

        .query(
          "UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_PDIQty=EvolveSalesOrderLine_DOQty  where EvolveSalesOrderLine_ID =  @EvolveSalesOrderLine_ID"
        );
      return updateSoLinePDIQty;
    } catch (error) {
      Evolve.Log.error(" EERR1639: Error while updating Non Pdi Sales Order "+error.message);
      return new Error(" EERR1639: Error while updating Non Pdi Sales Order "+error.message);
    }
  },

  updateNonPDIDoHistory: async function (indexData, newQty, data, doNumber) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

      return await Evolve.SqlPool.request()
        .input(
          "EvolveSalesOrderLine_ID",
          Evolve.Sql.Int,
          indexData.EvolveSalesOrderLine_ID
        )
        .input("EvolveDoLine_DoQty", Evolve.Sql.Int, newQty)
        .input(
          "EvolveDO_VehicelNumber",
          Evolve.Sql.NVarChar,
          data.EvolveDO_VehicelNumber
        )
        .input(
          "EvolveDo_Transporter",
          Evolve.Sql.NVarChar,
          data.EvolveDO_Transporter
        )
        .input("EvolveDoHistory_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .input("EvolveDo_Number", Evolve.Sql.NVarChar, doNumber)
        .input(
          "EvolveDoLine_Number",
          Evolve.Sql.Int,
          indexData.EvolveDOLine_Number
        )
        .input(
          "EvolveDoHistory_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )

        // .query("UPDATE EvolveDoLine SET EvolveDoLine_DoQty = @EvolveDoLine_DoQty where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID");
        .query(
          "  UPDATE EvolveDoHistory  SET EvolveDoLine_DoQty = @EvolveDoLine_DoQty , EvolveDo_VehicelNumber = @EvolveDO_VehicelNumber , EvolveDo_Transporter = @EvolveDo_Transporter ,  EvolveDoHistory_UpdatedAt = @EvolveDoHistory_UpdatedAt , EvolveDoHistory_UpdatedUser = @EvolveDoHistory_UpdatedUser , EvolveDoLine_PDIQty=@EvolveDoLine_DoQty WHERE EvolveDoLine_Number = @EvolveDoLine_Number AND EvolveDo_Number = @EvolveDo_Number"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1640: Error while updating Non PDI Do History "+error.message);
      return new Error(" EERR1640: Error while updating Non PDI Do History "+error.message);
    }
  },

  updateSalesOrderAtUpdate: async function (id, qty, oldQty) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveSalesOrder_ID", Evolve.Sql.Int, id)
        .input("qty", Evolve.Sql.Int, qty)
        .input("oldQty", Evolve.Sql.Int, oldQty)
        .query(
          "UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_DOQty =  EvolveSalesOrderLine_DOQty +@qty - @oldQty where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1641: Error while updating Sales Order At Update "+error.message);
      return new Error(" EERR1641: Error while updating Sales Order At Update "+error.message);
    }
  },

  updateDoLineAtUpdate: async function (data, newQty, EvolveDO_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveSalesOrder_ID",
          Evolve.Sql.Int,
          data.EvolveSalesOrderLine_ID
        )
        .input("EvolveDOLine_QtyDO", Evolve.Sql.Int, newQty)
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .input("EvolveDO_ID", Evolve.Sql.Int, EvolveDO_ID)
        .query(
          "UPDATE EvolveDoLine SET EvolveDOLine_QtyDO = @EvolveDOLine_QtyDO where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID AND   EvolveDOLine_ID = @EvolveDOLine_ID  AND EvolveDO_ID=@EvolveDO_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1642: Error while updating Do Line At Update "+error.message);
      return new Error(" EERR1642: Error while updating Do Line At Update "+error.message);
    }
  },

  
  updateDoHistory: async function (indexData, newQty, data, doNumber) {
    try {
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

      return await Evolve.SqlPool.request()
        .input(
          "EvolveSalesOrderLine_ID",
          Evolve.Sql.Int,
          indexData.EvolveSalesOrderLine_ID
        )
        .input("EvolveDoLine_DoQty", Evolve.Sql.Int, newQty)
        .input(
          "EvolveDO_VehicelNumber",
          Evolve.Sql.NVarChar,
          data.EvolveDO_VehicelNumber
        )
        .input(
          "EvolveDo_Transporter",
          Evolve.Sql.NVarChar,
          data.EvolveDO_Transporter
        )
        .input("EvolveDoHistory_UpdatedAt", Evolve.Sql.NVarChar, datetime)
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .input("EvolveDo_Number", Evolve.Sql.NVarChar, doNumber)
        .input(
          "EvolveDoLine_Number",
          Evolve.Sql.Int,
          indexData.EvolveDOLine_Number
        )
        .input(
          "EvolveDoHistory_UpdatedUser",
          Evolve.Sql.Int,
          data.EvolveUser_ID
        )

        // .query("UPDATE EvolveDoLine SET EvolveDoLine_DoQty = @EvolveDoLine_DoQty where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID");
        .query(
          "  UPDATE EvolveDoHistory  SET EvolveDoLine_DoQty = @EvolveDoLine_DoQty , EvolveDo_VehicelNumber = @EvolveDO_VehicelNumber , EvolveDo_Transporter = @EvolveDo_Transporter ,  EvolveDoHistory_UpdatedAt = @EvolveDoHistory_UpdatedAt , EvolveDoHistory_UpdatedUser = @EvolveDoHistory_UpdatedUser WHERE EvolveDoLine_Number = @EvolveDoLine_Number AND EvolveDo_Number = @EvolveDo_Number"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1643: Error while updating Do History "+error.message);
      return new Error(" EERR1643: Error while updating Do History "+error.message);
    }
  },

  getDoSoLineDetails: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .query(
          "SELECT edl.* , esl.*  FROM EvolveDoLine edl , EvolveSalesOrderLine esl  WHERE edl.EvolveDOLine_ID = @EvolveDOLine_ID AND edl.EvolveSalesOrderLine_ID = esl.EvolveSalesOrderLine_ID "
        );
    } catch (error) {
      Evolve.Log.error(" EERR1644: Error while getting Do So Line Details "+error.message);
      return new Error(" EERR1644: Error while getting Do So Line Details "+error.message);
    }
  },

  deletePDIHistoryDoLine: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .query(
          "DELETE FROM EvolvePDIHistory WHERE EvolveDOLine_ID = @EvolveDOLine_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1645: Error while deleting PDI History Do Line "+error.message);
      return new Error(" EERR1645: Error while deleting PDI History Do Line "+error.message);
    }
  },

  updateSoLineDetails: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveSalesOrderLine_ID",
          Evolve.Sql.Int,
          data.EvolveSalesOrderLine_ID
        )
        .input(
          "EvolveSalesOrderLine_DOQty",
          Evolve.Sql.Int,
          parseInt(data.EvolveSalesOrderLine_DOQty) -
          parseInt(data.EvolveDOLine_QtyDO)
        )
        .input(
          "EvolveSalesOrderLine_PDIQty",
          Evolve.Sql.Int,
          parseInt(data.EvolveSalesOrderLine_PDIQty) -
          parseInt(data.EvolveDOLine_QtyPDI)
        )
        .query(
          "UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_DOQty = @EvolveSalesOrderLine_DOQty , EvolveSalesOrderLine_PDIQty = @EvolveSalesOrderLine_PDIQty WHERE EvolveSalesOrderLine_ID = @EvolveSalesOrderLine_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1646: Error while updating So Line Details "+error.message);
      return new Error(" EERR1646: Error while updating So Line Details "+error.message);
    }
  },

  deleteDoLine: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .query(
          "DELETE FROM EvolveDoLine WHERE EvolveDOLine_ID = @EvolveDOLine_ID"
        );
    } catch (error) {
      Evolve.Log.error("  "+error.message);
      return new Error("  "+error.message);
    }
  },
  getDoList: async function () {
    try {
      let status = "open";
      return await Evolve.SqlPool.request()
        .input("status", Evolve.Sql.NVarChar, status)
        .query("select * from  EvolveDo where EvolveDO_Status = @status ");
    } catch (error) {
      Evolve.Log.error(" EERR1648: Error while getting Do List "+error.message);
      return new Error(" EERR1648: Error while getting Do List "+error.message);
    }
  },

  updateSoLineData: async function (id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDO_ID", Evolve.Sql.Int, id)
        .query(
          "UPDATE esol SET  esol.EvolveSalesOrderLine_DOQty =  CONVERT(INT , esol.EvolveSalesOrderLine_DOQty ) -  CONVERT(INT , edol.EvolveDOLine_QtyDO )   FROM  EvolveSalesOrderLine esol , EvolveDoLine  edol WHERE edol.EvolveDO_ID = @EvolveDO_ID And edol.EvolveSalesOrderLine_ID = esol.EvolveSalesOrderLine_ID  "
        );
    } catch (error) {
      Evolve.Log.error(" EERR1649: Error while updating So Line Data "+error.message);
      return new Error(" EERR1649: Error while updating So Line Data "+error.message);
    }
  },

  deleteDoLineData: async function (id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDO_ID", Evolve.Sql.Int, id)
        .query(
          " Delete EvolveDoLine WHERE EvolveDoLine.EvolveDO_ID = @EvolveDO_ID "
        );
    } catch (error) {
      Evolve.Log.error(" EERR1650: Error while deleting Do Line Data "+error.message);
      return new Error(" EERR1650: Error while deleting Do Line Data "+error.message);
    }
  },
  deleteDoData: async function (id) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDO_ID", Evolve.Sql.Int, id)
        .query("DELETE EvolveDo WHERE  EvolveDo.EvolveDO_ID = @EvolveDO_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1651: Error while deleting Do Data "+error.message);
      return new Error(" EERR1651: Error while deleting Do Data "+error.message);
    }
  },

  updateNonPDIDoLineAtUpdate: async function (data, newQty, EvolveDO_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input(
          "EvolveSalesOrder_ID",
          Evolve.Sql.Int,
          data.EvolveSalesOrderLine_ID
        )
        .input("updatedQty", Evolve.Sql.Int, newQty)
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .input("EvolveDO_ID", Evolve.Sql.Int, EvolveDO_ID)
        .query(
          "UPDATE EvolveDoLine SET EvolveDOLine_QtyDO = @updatedQty , EvolveDOLine_QtyPDI = @updatedQty where EvolveSalesOrderLine_ID =  @EvolveSalesOrder_ID AND   EvolveDOLine_ID = @EvolveDOLine_ID  AND EvolveDO_ID=@EvolveDO_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1652: Error while updating Non PDI Do Line At Update "+error.message);
      return new Error(" EERR1652: Error while updating Non PDI Do Line At Update "+error.message);
    }
  },











}