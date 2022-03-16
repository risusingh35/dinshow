
'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


  // getWoList: async function () {
  // 	try {
  //           return await Evolve.SqlPool.request()
  //           .query("  SELECT EvolveProdOrders_ID , EvolveProdOrders_Order ,  EvolveProdOrders_OrderId FROM EvolveProdOrders WHERE EvolveProdOrders_Status='OPEN'")
  // 	} catch (error) {
  // 		Evolve.Log.error("  "+error.message);
  // 		return new Error("  "+error.message);
  // 	}
  //   },
  // WOAjaxUrl: async function (search) {
  //   try {
  //     let query = "SELECT TOP(20) EvolveProdOrders_Order as title, EvolveProdOrders_ID as id FROM   EvolveProdOrders WHERE  EvolveProdOrders_Order  LIKE '%" + search + "%'  AND  EvolveProdOrders_Status='OPEN'"
  //     return await Evolve.SqlPool.request().query(query);
  //   } catch (error) {

  //     Evolve.Log.error(" EERR1775: Error in WO Ajax Url "+error.message);
  //     return new Error(" EERR1775: Error in WO Ajax Url "+error.message);
  //   }
  // },
  getSoList: async function (search) {
    try {
      let query = "SELECT TOP(20) (EvolveSalesOrder_Number) as title, EvolveSalesOrder_ID as id FROM   EvolveSalesOrder  WHERE  (EvolveSalesOrder_Number  LIKE '%" + search + "%')"
      return await Evolve.SqlPool.request().query(query);
    } catch (error) {

      Evolve.Log.error(" EERR1775: Error in So List Ajax Url " + error.message);
      return new Error(" EERR1775: Error in So List Ajax Url " + error.message);
    }
  },

  getLocationList: async function () {
    try {
      return await Evolve.SqlPool.request()
        .query("SELECT el.EvolveLocation_ID ,el.EvolveLocation_Name ,  el.EvolveLocation_Status  FROM  EvolveLocation el  , EvolveStatusCodeMstr scm WHERE  el.EvolveLocation_Status = 'GOOD'")
    } catch (error) {
      Evolve.Log.error(" EERR1776: Error while getting Location List " + error.message);
      return new Error(" EERR1776: Error while getting Location List " + error.message);
    }
  },
  // getWoProduceDetails: async function (EvolveProdOrders_ID) {s
  // try {
  //         return await Evolve.SqlPool.request()
  //         .input("EvolveProdOrders_ID", Evolve.Sql.Int, EvolveProdOrders_ID)
  //         .query("SELECT epod.EvolveItem_ID, epod.EvolveProdOrders_IsBom , epod.EvolveProdOrders_ID , ei.EvolveItem_Code , ei.EvolveItem_Desc , epod.EvolveProdOrders_Quantity , EvolveUom_Uom  , ema.EvolveLocation_ID  FROM EvolveProdOrders epod , EvolveItem ei , EvolveUom euom  , EvolveMachineAssign ema   WHERE epod.EvolveItem_ID =    ei.EvolveItem_ID  AND ei.EvolveUom_ID = euom.EvolveUom_ID AND epod.EvolveProdOrders_ID=1 AND ema.EvolveMachine_ID = epod.EvolveMachine_ID AND ema.EvolveMachineAssign_Code='LOCATION' ")
  // } catch (error) {
  // 	Evolve.Log.error(" EERR1799: Erorr while getting Wo Produce Details "+error.message);
  // 	return new Error(" EERR1799: Erorr while getting Wo Produce Details "+error.message);
  // }
  // },


  getSoDetails: async function (EvolveSalesOrder_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveSalesOrder_ID", Evolve.Sql.Int, EvolveSalesOrder_ID)
        .query("select es.* , ec.EvolveCustomer_Name ,(select ea.EvolveAddress_Code   from EvolveAddress ea  where ea.EvolveAddress_ID = es.EvolveBillTo_ID  ) as 'BillTo' ,(select ea.EvolveAddress_Code   from EvolveAddress ea  where ea.EvolveAddress_ID = es.EvolveShipTo_ID  ) as 'ShipTo' from EvolveSalesOrder es , EvolveCustomer ec  where es.EvolveSalesOrder_ID  = @EvolveSalesOrder_ID")
        // .query("SELECT  epl.EvolvePickList_Number ,  euom.EvolveUom_Uom ,   ei.EvolveItem_Desc1 ,  ei.EvolveItem_Part ,  epo.*   , esec.EvolveSection_Code ,  em.EvolveMachine_Code   FROM EvolveUom euom ,  EvolveItem ei ,    EvolveProdOrders epo  LEFT JOIN  EvolveSection esec ON  epo.EvolveSection_ID  = esec.EvolveSection_ID LEFT JOIN   EvolveMachine em   ON epo.EvolveMachine_ID = em.EvolveMachine_ID LEFT JOIN  EvolvePickList epl ON epo.EvolvePickList_ID = epl.EvolvePickList_ID WHERE  epo.EvolveProdOrders_ID  = @EvolveProdOrders_ID AND euom.EvolveUom_ID = ei.EvolveUom_ID AND epo.EvolveItem_ID = ei.EvolveItem_ID")
    } catch (error) {
      Evolve.Log.error(" EERR1799: Erorr while getting Wo  Details " + error.message);
      return new Error(" EERR1799: Erorr while getting Wo  Details " + error.message);
    }
  },

  getSoLineDetails: async function (EvolveSalesOrder_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveSalesOrder_ID", Evolve.Sql.Int, EvolveSalesOrder_ID)
        .query("select esl.* , ei.EvolveItem_Part from EvolveSalesOrderLine esl , EvolveSalesOrder es , EvolveItem ei where es.EvolveSalesOrder_ID  = @EvolveSalesOrder_ID and es.EvolveSalesOrder_ID = esl.EvolveSalesOrder_ID AND ei.EvolveItem_ID = esl.EvolveItem_ID")
        // .query("SELECt epod.*  ,ei.EvolveItem_Part   ,  ei.EvolveItem_Desc1 , ei.EvolveItem_Desc2   FROM  EvolveProdOrdersDetail epod   ,  EvolveItem ei  WHERE epod.EvolveProdOrders_ID = @EvolveProdOrders_ID AND epod.EvolveItem_ID = ei.EvolveItem_ID")
    } catch (error) {
      Evolve.Log.error(" EERR1799: Erorr while getting Wo  Details " + error.message);
      return new Error(" EERR1799: Erorr while getting Wo  Details " + error.message);
    }
  },

  generatePickList: async function (data) {
    try {
      let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();


      return await Evolve.SqlPool.request()
        .input("EvolvePickList_Number", Evolve.Sql.NVarChar, data.EvolvePickList_Number)
        .input("EvolvePickList_Status", Evolve.Sql.NVarChar, data.EvolvePickList_Status)
        .input("EvolvePickList_Type", Evolve.Sql.NVarChar, data.EvolvePickList_Type)
        .input("EvolvePickList_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolvePickList_UpdateUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolvePickList_CreatedAt', Evolve.Sql.NVarChar, dateTime)
        .input('EvolvePickList_UpdateAt', Evolve.Sql.NVarChar, dateTime)
        .query("INSERT INTO  EvolvePickList (EvolvePickList_Number ,EvolvePickList_Status ,EvolvePickList_Type ,EvolvePickList_CreatedUser,EvolvePickList_UpdateUser,EvolvePickList_CreatedAt,EvolvePickList_UpdateAt) VALUES (@EvolvePickList_Number , @EvolvePickList_Status ,@EvolvePickList_Type  ,@EvolvePickList_CreatedUser,@EvolvePickList_UpdateUser,@EvolvePickList_CreatedAt,@EvolvePickList_UpdateAt)select @@IDENTITY AS \'inserted_id\'")
    } catch (error) {
      Evolve.Log.error(" EERR1799: Erorr while generate Pick list " + error.message);
      return new Error(" EERR1799: Erorr while generate Pick list " + error.message);
    }
  },

  updateWorkOrderPickListStatus: async function (data) {
    try {
      let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int,data.EvolveProdOrders_ID)
        .input("EvolvePickList_ID", Evolve.Sql.Int, data.EvolvePickList_ID)
        .input("EvolveProdOrders_IsPicklistGenerated", Evolve.Sql.Int, 1)
        .input("EvolveProdOrders_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolveProdOrders_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolveProdOrders_CreatedAt', Evolve.Sql.NVarChar, dateTime)
        .input('EvolveProdOrders_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
        .query("UPDATE EvolveProdOrders SET  EvolvePickList_ID=@EvolvePickList_ID , EvolveProdOrders_IsPicklistGenerated=@EvolveProdOrders_IsPicklistGenerated  , EvolveProdOrders_CreatedUser = @EvolveProdOrders_CreatedUser  , EvolveProdOrders_UpdatedUser =@EvolveProdOrders_UpdatedUser ,  EvolveProdOrders_CreatedAt =@EvolveProdOrders_CreatedAt ,  EvolveProdOrders_UpdatedAt =@EvolveProdOrders_UpdatedAt WHERE EvolveProdOrders_ID=@EvolveProdOrders_ID ")
    } catch (error) {
      Evolve.Log.error(" EERR1799: Erorr while update work order picklist status " + error.message);
      return new Error(" EERR1799: Erorr while update work order picklist status " + error.message);
    }
  },




  addPickListDetails: async function (data) {
    try {
      let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolvePickList_ID", Evolve.Sql.Int, data.EvolvePickList_ID)
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .input("EvolvePickListDetail_ReqQty", Evolve.Sql.NVarChar, data.EvolveProdOrdersDetails_QtyReq)
        .input("EvolvePickListDetail_IssueQty", Evolve.Sql.NVarChar, 0)
        .input("EvolvePickListDetail_ReturnQty", Evolve.Sql.NVarChar, 0)
        .input("EvolvePickListDetail_Status", Evolve.Sql.NVarChar,'OPEN')
        .input("EvolvePickListDetail_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolvePickListDetail_UpdateUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolvePickListDetail_CreatedAt', Evolve.Sql.NVarChar, dateTime)
        .input('EvolvePickListDetail_UpdateAt', Evolve.Sql.NVarChar, dateTime)
        .query("INSERT INTO  EvolvePickListDetail (EvolvePickList_ID ,EvolveItem_ID ,EvolvePickListDetail_ReqQty ,EvolvePickListDetail_IssueQty,EvolvePickListDetail_ReturnQty,EvolvePickListDetail_Status,EvolvePickListDetail_CreatedUser,EvolvePickListDetail_UpdateUser,EvolvePickListDetail_CreatedAt,EvolvePickListDetail_UpdateAt) VALUES (@EvolvePickList_ID , @EvolveItem_ID ,@EvolvePickListDetail_ReqQty  ,@EvolvePickListDetail_IssueQty,@EvolvePickListDetail_ReturnQty,@EvolvePickListDetail_Status,@EvolvePickListDetail_CreatedUser,@EvolvePickListDetail_UpdateUser,@EvolvePickListDetail_CreatedAt,@EvolvePickListDetail_UpdateAt)select @@IDENTITY AS \'inserted_id\'")
    } catch (error) {
      Evolve.Log.error(" EERR1799: Erorr while add picklist details " + error.message);
      return new Error(" EERR1799: Erorr while add picklist details " + error.message);
    }
  },





  getWoissueDetails: async function (EvolveProdOrders_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, EvolveProdOrders_ID)
        .query("SELECT  epl.EvolveItem_ID , epl.EvolvePickList_ID , epl.EvolvePickList_QtyIss , epl.EvolvePickList_QtyReq  , ei.EvolveItem_Code  , ei.EvolveItem_Desc FROM  [EvolvePickList]  epl  , EvolveItem ei     WHERE  epl.EvolveItem_ID = ei.EvolveItem_ID AND epl.EvolveProdOrders_ID =@EvolveProdOrders_ID")
    } catch (error) {
      Evolve.Log.error(" EERR1777: Error while getting Wo issue Details " + error.message);
      return new Error(" EERR1777: Error while getting Wo issue Details " + error.message);
    }
  },
  getAvailablePallets: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .query("SELECT 'false' AS availSelected , einv.EvolveItem_ID , einv.EvolveInventory_ID ,  einv.EvolveInventory_RefNumber ,  einv.EvolveInventory_QtyOnHand  ,ei.EvolveItem_Code , ei.EvolveItem_Desc , eloc.EvolveLocation_Name   FROM  EvolveInventory einv , EvolveLocation eloc , EvolveItem ei   WHERE einv.EvolveItem_ID = ei.EvolveItem_ID AND einv.EvolveLocation_ID = eloc.EvolveLocation_ID AND  einv.EvolveItem_ID = @EvolveItem_ID  AND einv.EvolveInventory_Status='GOOD' AND einv.EvolveInventory_PostingStatus='ERPPOSTED' AND einv.EvolveInventory_IsPicked != 1")
    } catch (error) {
      Evolve.Log.error(" EERR1778: Error while getting Available Pallets " + error.message);
      return new Error(" EERR1778: Error while getting Available Pallets " + error.message);
    }
  },

  checkExistPick: async function (EvolveProdOrders_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, EvolveProdOrders_ID)
        .query("SELECT  EvolvePickList_ID FROM EvolvePickList WHERE EvolveProdOrders_ID=@EvolveProdOrders_ID")
    } catch (error) {
      Evolve.Log.error(" EERR1779: Error while checking Exist Pick " + error.message);
      return new Error(" EERR1779: Error while checking Exist Pick " + error.message);
    }
  },
  issueDetail: async function (EvolveProdOrders_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, EvolveProdOrders_ID)
        .query("  SELECT epod.EvolveItem_ID , epod.EvolveProdOrders_IsBom , epod.EvolveProdOrders_ID , ei.EvolveItem_Code , ei.EvolveItem_Desc , epod.EvolveProdOrders_Quantity , EvolveUom_Uom  ,   (SELECT  COUNT(einv.EvolveInventory_ID)  FROM EvolveSubItem esi  , EvolveInventory einv  WHERE esi.EvolveSubItem_ActualItemID = epod.EvolveItem_ID AND esi.EvolveSubItem_SubItem_ID = einv.EvolveItem_ID  AND einv.EvolveInventory_Status='ACCEPTED' AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED') as subitem  FROM EvolveProdOrders epod , EvolveItem ei , EvolveUom euom  WHERE epod.EvolveItem_ID =  ei.EvolveItem_ID  AND ei.EvolveUom_ID = euom.EvolveUom_ID AND epod.EvolveProdOrders_ID=@EvolveProdOrders_ID")
    } catch (error) {
      Evolve.Log.error(" EERR1780: Error in issue Detail " + error.message);
      return new Error(" EERR1780: Error in issue Detail " + error.message);
    }
  },
  changePalletStatus: async function (EvolveInventory_ID, data) {
    try {
      let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveInventory_ID", Evolve.Sql.Int, EvolveInventory_ID)
        .input("EvolveInventory_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
        .input("EvolveLocation_ID", Evolve.Sql.Int, data.pickToLoc)
        .input("EvolveInventory_Status", Evolve.Sql.NVarChar, data.EvolveInventory_Status)
        .input("EvolveInventory_IsPicked", Evolve.Sql.Int, 1)
        .input("EvolveWoSchedule_OrderID", Evolve.Sql.Int, data.EvolveWoSchedule_OrderID)

        .query("UPDATE EvolveInventory SET EvolveInventory_Status=@EvolveInventory_Status , EvolveInventory_IsPicked=@EvolveInventory_IsPicked,EvolveWoSchedule_OrderID=@EvolveWoSchedule_OrderID,EvolveInventory_UpdatedUser=@EvolveInventory_UpdatedUser ,EvolveInventory_UpdatedAt=@EvolveInventory_UpdatedAt ,EvolveLocation_ID=@EvolveLocation_ID  WHERE EvolveInventory_ID=@EvolveInventory_ID")

    } catch (error) {
      Evolve.Log.error(" EERR1781: Error while changing Pallet Status " + error.message);
      return new Error(" EERR1781: Error while changing Pallet Status " + error.message);
    }
  },
  addPickList: async function (data, EvolveProdOrders_ID, EvolveUser_ID) {
    try {
      let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, EvolveProdOrders_ID)
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
        .input("EvolvePickList_QtyPick", Evolve.Sql.Int, data.EvolveInventory_QtyOnHand)
        .input("EvolvePickList_CreatedUser", Evolve.Sql.Int, EvolveUser_ID)
        .input("EvolvePickList_UpdateUser", Evolve.Sql.Int, EvolveUser_ID)
        .input('EvolvePickList_CreatedAt', Evolve.Sql.NVarChar, dateTime)
        .input('EvolvePickList_UpdateAt', Evolve.Sql.NVarChar, dateTime)
        .query("INSERT INTO  EvolvePickList (EvolveProdOrders_ID ,EvolveItem_ID ,EvolveInventory_ID ,EvolvePickList_QtyPick,EvolvePickList_CreatedUser,EvolvePickList_UpdateUser,EvolvePickList_CreatedAt,EvolvePickList_UpdateAt) VALUES (@EvolveProdOrders_ID , @EvolveItem_ID ,@EvolveInventory_ID ,@EvolvePickList_QtyPick ,@EvolvePickList_CreatedUser,@EvolvePickList_UpdateUser,@EvolvePickList_CreatedAt,@EvolvePickList_UpdateAt)")

    } catch (error) {
      Evolve.Log.error(" EERR1782: Error while adding Pick List " + error.message);
      return new Error(" EERR1782: Error while adding Pick List " + error.message);
    }
  },

  getpickedPallets: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .query("SELECT  'false' AS pickedSelected  , epld.EvolveSubItem_SubItem_ID as EvolveItem_ID,  epld.EvolvePickListDetail_ID, einv.EvolveInventory_ID  ,  einv.EvolveInventory_RefNumber ,  einv.EvolveInventory_QtyOnHand ,  el.EvolveLocation_Name , ei.EvolveItem_Code , ei.EvolveItem_Desc FROM  EvolvePickListDetail epld  , EvolvePickList epl , EvolveInventory einv  , EvolveItem ei  , EvolveLocation el WHERE  epld.EvolvePickList_ID = epl.EvolvePickList_ID AND epl.EvolveProdOrders_ID =@EvolveProdOrders_ID  AND epld.EvolveSubItem_SubItem_ID = einv.EvolveItem_ID  AND epld.EvolveItem_ID =@EvolveItem_ID AND  epld.EvolveInventory_ID = einv.EvolveInventory_ID AND epld.EvolveSubItem_SubItem_ID = ei.EvolveItem_ID AND epld.EvolveLocation_ID = el.EvolveLocation_ID AND epld.EvolvePickListDetail_Status='PICKED'")
    } catch (error) {
      Evolve.Log.error(" EERR1783: Error while getting picked Pallets " + error.message);
      return new Error(" EERR1783: Error while getting picked Pallets " + error.message);
    }
  },
  getPickedCount: async function (EvolveProdOrders_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, EvolveProdOrders_ID)
        .query("SELECT SUM(EvolvePickList_QtyPick) as totalPicked  , SUM(EvolvePickList_QtyIss) as totalIssued  FROM EvolvePickList WHERE EvolveProdOrders_ID =@EvolveProdOrders_ID")

    } catch (error) {
      Evolve.Log.error(" EERR1784: Error while getting Picked Count " + error.message);
      return new Error(" EERR1784: Error while getting Picked Count " + error.message);
    }
  },
  deletePicklist: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolvePickListDetail_ID", Evolve.Sql.Int, data.EvolvePickListDetail_ID)
        .input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
        .input("EvolveSubItem_SubItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .input("EvolvePickListDetail_QtyPick", Evolve.Sql.Int, data.EvolveInventory_QtyOnHand)
        .query(" DELETE FROM  EvolvePickListDetail WHERE      EvolvePickListDetail_ID=@EvolvePickListDetail_ID  AND EvolveSubItem_SubItem_ID=@EvolveSubItem_SubItem_ID AND EvolveInventory_ID=@EvolveInventory_ID AND EvolvePickListDetail_QtyPick=@EvolvePickListDetail_QtyPick")

    } catch (error) {
      Evolve.Log.error(" EERR1785: Error while deleting Pick list " + error.message);
      return new Error(" EERR1785: Error while deleting Pick list " + error.message);
    }
  },
  updatePallet: async function (data, EvolveLocation_ID, EvolveUser_ID, EvolveInventory_Status) {
    try {
      let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveInventory_QtyOnHand", Evolve.Sql.Int, data.EvolveInventory_QtyOnHand)
        .input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .input("EvolveLocation_ID", Evolve.Sql.Int, EvolveLocation_ID)
        .input("EvolveInventory_UpdatedUser", Evolve.Sql.Int, EvolveUser_ID)
        .input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
        .input('EvolveInventory_Status', Evolve.Sql.NVarChar, EvolveInventory_Status)
        .input('EvolveInventory_IsPicked', Evolve.Sql.Int, 0)
        .input('EvolveWoSchedule_OrderID', Evolve.Sql.Int, null)

        .query("UPDATE EvolveInventory SET EvolveInventory_Status = @EvolveInventory_Status ,EvolveInventory_IsPicked=@EvolveInventory_IsPicked, EvolveLocation_ID=@EvolveLocation_ID ,EvolveWoSchedule_OrderID=@EvolveWoSchedule_OrderID ,EvolveInventory_UpdatedUser=@EvolveInventory_UpdatedUser ,EvolveInventory_UpdatedAt=@EvolveInventory_UpdatedAt  WHERE  EvolveInventory_ID=@EvolveInventory_ID AND EvolveItem_ID=@EvolveItem_ID AND EvolveInventory_QtyOnHand=@EvolveInventory_QtyOnHand ")

    } catch (error) {
      Evolve.Log.error(" EERR1786: Error while updating Pallet " + error.message);
      return new Error(" EERR1786: Error while updating Pallet " + error.message);
    }
  },
  getSubItemList: async function (EvolveItem_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.Int, EvolveItem_ID)
        .query("SELECT distinct esi.EvolveSubItem_SubItem_ID, ei.EvolveItem_Code FROM EvolveSubItem esi , EvolveItem ei, EvolveInventory einv  WHERE esi.EvolveSubItem_SubItem_ID = ei.EvolveItem_ID AND esi.EvolveSubItem_ActualItemID = @EvolveItem_ID AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED' AND einv.EvolveInventory_Status = 'ACCEPTED' AND esi.EvolveSubItem_SubItem_ID = einv.EvolveItem_ID")

    } catch (error) {
      Evolve.Log.error(" EERR1787: Error while getting Sub Item List " + error.message);
      return new Error(" EERR1787: Error while getting Sub Item List " + error.message);
    }
  },
  getsubItems: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
        .query("SELECT EvolveSubItem_SubItem_ID  FROM EvolveSubItem  WHERE EvolveSubItem_ActualItemID = @EvolveItem_ID ")

    } catch (error) {
      Evolve.Log.error(" EERR1788: Error while getting sub Items " + error.message);
      return new Error(" EERR1788: Error while getting sub Items " + error.message);
    }
  },
  createPickList: async function (data) {
    try {
      let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
        .input("EvolveItem_ID", Evolve.Sql.Int, data.itemToMade)
        .input("EvolvePickList_QtyReq", Evolve.Sql.Int, data.itemToMadeQty)
        .input("EvolvePickList_QtyPick", Evolve.Sql.Int, 0)
        .input("EvolvePickList_QtyIss", Evolve.Sql.Int, 0)
        .input('EvolvePickList_Number', Evolve.Sql.NVarChar, data.EvolvePickList_Number)
        .input("EvolvePickList_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input("EvolvePickList_UpdateUser", Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolvePickList_CreatedAt', Evolve.Sql.NVarChar, dateTime)
        .input('EvolvePickList_UpdateAt', Evolve.Sql.NVarChar, dateTime)
        .query("INSERT INTO  EvolvePickList (EvolveProdOrders_ID ,EvolveItem_ID ,EvolvePickList_QtyReq ,EvolvePickList_QtyPick,EvolvePickList_QtyIss,EvolvePickList_Number,EvolvePickList_CreatedUser,EvolvePickList_UpdateUser,EvolvePickList_CreatedAt,EvolvePickList_UpdateAt) VALUES (@EvolveProdOrders_ID , @EvolveItem_ID ,@EvolvePickList_QtyReq ,@EvolvePickList_QtyPick ,@EvolvePickList_QtyIss,@EvolvePickList_Number,@EvolvePickList_CreatedUser,@EvolvePickList_UpdateUser,@EvolvePickList_CreatedAt,@EvolvePickList_UpdateAt)select @@IDENTITY AS \'inserted_id\'")

    } catch (error) {
      Evolve.Log.error(" EERR1789: Error while creating Pick List " + error.message);
      return new Error(" EERR1789: Error while creating Pick List " + error.message);
    }
  },
  // addPickListDetails: async function (data, body) {
  //   try {
  //     let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
  //     return await Evolve.SqlPool.request()
  //       .input("EvolvePickList_ID", Evolve.Sql.Int, body.EvolvePickList_ID)
  //       .input("EvolveWoSchedule_ID", Evolve.Sql.Int, body.EvolveProdOrders_ID)
  //       .input("EvolveItem_ID", Evolve.Sql.Int, body.selectedItem)
  //       .input("EvolveSubItem_SubItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
  //       .input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
  //       .input("EvolvePickListDetail_Status", Evolve.Sql.NVarChar, 'PICKED')
  //       .input("EvolvePickListDetail_QtyPick", Evolve.Sql.Int, data.EvolveInventory_QtyOnHand)
  //       .input("EvolveLocation_ID", Evolve.Sql.Int, body.pickToLoc)
  //       .input("EvolvePickListDetail_CreatedUser", Evolve.Sql.Int, body.EvolveUser_ID)
  //       .input("EvolvePickListDetail_UpdateUser", Evolve.Sql.Int, body.EvolveUser_ID)
  //       .input('EvolvePickListDetail_CreatedAt', Evolve.Sql.NVarChar, dateTime)
  //       .input('EvolvePickListDetail_UpdateAt', Evolve.Sql.NVarChar, dateTime)
  //       .query("INSERT INTO  EvolvePickListDetail (EvolvePickList_ID ,EvolveItem_ID ,EvolveSubItem_SubItem_ID ,EvolveInventory_ID ,EvolvePickListDetail_QtyPick,EvolveLocation_ID,EvolvePickListDetail_CreatedUser,EvolvePickListDetail_UpdateUser,EvolvePickListDetail_CreatedAt,EvolvePickListDetail_UpdateAt,EvolvePickListDetail_Status,EvolveWoSchedule_ID) VALUES (@EvolvePickList_ID , @EvolveItem_ID ,@EvolveSubItem_SubItem_ID ,@EvolveInventory_ID ,@EvolvePickListDetail_QtyPick ,@EvolveLocation_ID ,@EvolvePickListDetail_CreatedUser,@EvolvePickListDetail_UpdateUser,@EvolvePickListDetail_CreatedAt,@EvolvePickListDetail_UpdateAt,@EvolvePickListDetail_Status,@EvolveWoSchedule_ID)")

  //   } catch (error) {
  //     Evolve.Log.error(" EERR1790: Error while adding Pick List Details " + error.message);
  //     return new Error(" EERR1790: Error while adding Pick List Details " + error.message);
  //   }
  // },
  updatePickList: async function (EvolvePickList_ID, EvolveUser_ID, selectedQty) {
    try {
      let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolvePickList_ID", Evolve.Sql.Int, EvolvePickList_ID)
        .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
        .input("selectedQty", Evolve.Sql.Int, selectedQty)
        .input("EvolvePickList_UpdateUser", Evolve.Sql.Int, EvolveUser_ID)
        .input('EvolvePickList_UpdateAt', Evolve.Sql.NVarChar, dateTime)
        .query("UPDATE EvolvePickList SET  EvolvePickList_QtyPick = EvolvePickList_QtyPick +@selectedQty WHERE  EvolvePickList_ID=@EvolvePickList_ID")

    } catch (error) {
      Evolve.Log.error(" EERR1791: Error while updating Pick List " + error.message);
      return new Error(" EERR1791: Error while updating Pick List " + error.message);
    }
  },
  issueDetailWhilePickGenerated: async function (EvolveProdOrders_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, EvolveProdOrders_ID)
        .query("SELECT epl.EvolvePickList_QtyIss , epl.EvolvePickList_QtyPick ,epl.EvolveItem_ID  , epl.EvolveProdOrders_ID , ei.EvolveItem_Code , ei.EvolveItem_Desc , epl.EvolvePickList_QtyReq , EvolveUom_Uom  ,   (SELECT  COUNT(einv.EvolveInventory_ID)  FROM EvolveSubItem esi  , EvolveInventory einv  WHERE esi.EvolveSubItem_ActualItemID = epl.EvolveItem_ID AND esi.EvolveSubItem_SubItem_ID = einv.EvolveItem_ID  AND einv.EvolveInventory_Status='ACCEPTED' AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED') as subitem  FROM EvolvePickList epl , EvolveItem ei , EvolveUom euom  WHERE epl.EvolveItem_ID =  ei.EvolveItem_ID  AND ei.EvolveUom_ID = euom.EvolveUom_ID AND epl.EvolveProdOrders_ID=@EvolveProdOrders_ID")

    } catch (error) {
      Evolve.Log.error(" EERR1792: Error in issue Detail While Pick Generated " + error.message);
      return new Error(" EERR1792: Error in issue Detail While Pick Generated " + error.message);
    }
  },
  // getWobomIssueDetails: async function (EvolveProdOrders_ID) {
  // try {
  //         return await Evolve.SqlPool.request()
  //         .input("EvolveProdOrders_ID", Evolve.Sql.Int,EvolveProdOrders_ID)
  //         .query(" SELECT epob.EvolveProdOrderBom_CompItem_ID as EvolveItem_ID,   epob.EvolveProdOrderBom_ID , epob.EvolveProdOrderBom_QtyReq as EvolvePickList_QtyReq , epob.EvolveProdOrderBom_QtyIss as EvolvePickList_QtyIss , epob.EvolveProdOrderBom_QtyPick as EvolvePickList_QtyPick , ei.EvolveItem_Code , ei.EvolveItem_Desc ,(SELECT  COUNT(einv.EvolveInventory_ID)  FROM EvolveSubItem esi  , EvolveInventory einv  WHERE esi.EvolveSubItem_ActualItemID = epob.EvolveProdOrderBom_CompItem_ID AND esi.EvolveSubItem_SubItem_ID = einv.EvolveItem_ID  AND einv.EvolveInventory_Status='ACCEPTED' AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED') as subitem FROM EvolveProdOrderBom epob  , EvolveItem ei   WHERE epob.EvolveProdOrders_ID=@EvolveProdOrders_ID AND epob.EvolveProdOrderBom_CompItem_ID = ei.EvolveItem_ID")

  // } catch (error) {
  //   Evolve.Log.error(" EERR1793: Error while getting Wo bom Issue Details "+error.message);
  //   return new Error(" EERR1793: Error while getting Wo bom Issue Details "+error.message);
  // }
  // },

  getWobomIssueDetails: async function (EvolveWoSchedule_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input('EvolveWoSchedule_ID', Evolve.Sql.Int, EvolveWoSchedule_ID)
        .query("SELECT   'false' AS orgSelected , (SELECT SUM(einv.EvolveInventory_QtyOnHand) FROM EvolveInventory einv WHERE  einv.EvolveItem_ID = epob.EvolveSchedulingBom_CompItem_ID AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED'  AND einv.EvolveInventory_Status = 'GOOD') as qtyHand , epob.EvolveSchedulingBom_ParentItem_ID , epob.EvolveSchedulingBom_CompItem_ID , epob.EvolveSchedulingBom_CompItem_ID as EvolveItem_ID,   epob.EvolveSchedulingBom_ID , epob.EvolveSchedulingBom_QtyReq , epob.EvolveSchedulingBom_QtyIss , epob.EvolveSchedulingBom_QtyPick , ei.EvolveItem_Code , ei.EvolveItem_Desc  , euom.EvolveUom_Uom    FROM EvolveSchedulingBom epob  , EvolveItem ei , EvolveUom euom   WHERE epob.EvolveWoSchedule_ID=@EvolveWoSchedule_ID AND epob.EvolveSchedulingBom_CompItem_ID = ei.EvolveItem_ID AND ei.EvolveUom_ID = euom.EvolveUom_ID ORDER BY EvolveSchedulingBom_DispSeq")
    } catch (error) {
      Evolve.Log.error(" EERR1793: Error while getting Wo bom Issue Details " + error.message);
      return new Error(" EERR1793: Error while getting Wo bom Issue Details " + error.message);
    }
  },
  getSubItems: async function (EvolveSubItem_ActualItemID) {
    try {
      return await Evolve.SqlPool.request()
        .input('EvolveSubItem_ActualItemID', Evolve.Sql.Int, EvolveSubItem_ActualItemID)
        .query(" SELECT esbi.EvolveSubItem_SubItem_ID ,  ei.EvolveItem_Code ,  ei.EvolveItem_Desc    , euom.EvolveUom_Uom  FROM EvolveSubItem esbi  , EvolveItem ei   , EvolveUom euom  WHERE  EvolveSubItem_ActualItemID = @EvolveSubItem_ActualItemID AND  ei.EvolveItem_ID = esbi.EvolveSubItem_SubItem_ID AND ei.EvolveUom_ID = euom.EvolveUom_ID")
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  getQtyOnHAnd: async function (EvolveItem_ID, EvolveWoSchedule_ID) {
    try {
      let qtyHand = await Evolve.SqlPool.request()
        .input('EvolveItem_ID', Evolve.Sql.Int, EvolveItem_ID)
        //  .query("SELECT SUM(einv.EvolveInventory_QtyOnHand) as qtyHand FROM EvolveInventory einv  ,EvolveLocation eloc WHERE  einv.EvolveItem_ID = @EvolveItem_ID AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED'  AND einv.EvolveItem_ID = @EvolveItem_ID AND einv.EvolveLocation_ID=eloc.EvolveLocation_ID AND eloc.EvolveLocation_Status='GOOD' AND EvolveInventory_Status != 'WOPICKED' AND EvolveInventory_Status != 'WOISSUED'");
        .query("SELECT SUM(einv.EvolveInventory_QtyOnHand) as qtyHand FROM EvolveInventory einv   WHERE  einv.EvolveItem_ID = @EvolveItem_ID AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED'  AND einv.EvolveItem_ID =@EvolveItem_ID  AND einv.EvolveInventory_Status = 'GOOD'");

      let qtyPick = await Evolve.SqlPool.request()

        .input('EvolveItem_ID', Evolve.Sql.Int, EvolveItem_ID)
        .input('EvolveWoSchedule_ID', Evolve.Sql.Int, EvolveWoSchedule_ID)
        .query("SELECT SUM(EvolvePickListDetail_QtyPick) as qtyPick  FROM EvolvePickListDetail  WHERE  EvolvePickListDetail_Status='PICKED' AND EvolveItem_ID != EvolveSubItem_SubItem_ID AND EvolveSubItem_SubItem_ID= @EvolveItem_ID AND EvolveWoSchedule_ID=@EvolveWoSchedule_ID");

      let qtyIssue = await Evolve.SqlPool.request()
        .input('EvolveItem_ID', Evolve.Sql.Int, EvolveItem_ID)
        .input('EvolveWoSchedule_ID', Evolve.Sql.Int, EvolveWoSchedule_ID)
        .query("SELECT SUM(EvolvePickListDetail_IssQty) as qtyIssue FROM EvolvePickListDetail   WHERE  EvolvePickListDetail_Status='ISSUED' AND EvolveItem_ID != EvolveSubItem_SubItem_ID AND EvolveSubItem_SubItem_ID= @EvolveItem_ID AND EvolveWoSchedule_ID=@EvolveWoSchedule_ID");

      let qtyDetails = {
        qtyHand: qtyHand.recordset[0].qtyHand,
        qtyPick: qtyPick.recordset[0].qtyPick,
        qtyIssue: qtyIssue.recordset[0].qtyIssue,
      }

      return qtyDetails
    } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
    }
  },
  updatePickQty: async function (qty, id) {
    try {
      return await Evolve.SqlPool.request()
        .input("qty", Evolve.Sql.Int, qty)
        .input("id", Evolve.Sql.Int, id)
        .query("UPDATE EvolvePickList SET  EvolvePickList_QtyPick =EvolvePickList_QtyPick-@qty  WHERE EvolveProdOrders_ID=@id ")

    } catch (error) {
      Evolve.Log.error(" EERR1794: Error while updating Pick Qty " + error.message);
      return new Error(" EERR1794: Error while updating Pick Qty " + error.message);
    }
  },
  getBompickedPallets: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
        .query("SELECT epld.EvolvePickListDetail_ID, einv.EvolveItem_ID , einv.EvolveInventory_ID  ,  einv.EvolveInventory_RefNumber ,  einv.EvolveInventory_QtyOnHand ,  el.EvolveLocation_Name , ei.EvolveItem_Code , ei.EvolveItem_Desc   FROM EvolvePickList epl , EvolveInventory  einv, EvolveLocation el , EvolveItem ei ,EvolvePickListDetail epld    WHERE  epld.EvolveInventory_ID = einv.EvolveInventory_ID AND einv.EvolveLocation_ID = el.EvolveLocation_ID   AND epl.EvolveProdOrders_ID=@EvolveProdOrders_ID   AND einv.EvolveItem_ID = ei.EvolveItem_ID AND epld.EvolvePickList_ID=epl.EvolvePickList_ID")
    } catch (error) {
      Evolve.Log.error(" EERR1795: Error while getting Bom picked Pallets " + error.message);
      return new Error(" EERR1795: Error while getting Bom picked Pallets " + error.message);
    }
  },
  updateBomPickList: async function (EvolveProdOrderBom_ID, EvolveUser_ID, qty) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveSchedulingBom_ID", Evolve.Sql.Int, EvolveProdOrderBom_ID)
        .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
        .input("qty", Evolve.Sql.Int, qty)
        .query("UPDATE EvolveSchedulingBom SET EvolveSchedulingBom_QtyPick = EvolveSchedulingBom_QtyPick+@qty  WHERE  EvolveSchedulingBom_ID=@EvolveSchedulingBom_ID")
    } catch (error) {
      Evolve.Log.error(" EERR1796: Error while updating Bom Pick List " + error.message);
      return new Error(" EERR1796: Error while updating Bom Pick List " + error.message);
    }
  },
  updateBomPickListOnUnpick: async function (qty, EvolveProdOrderBom_ID, EvolveUser_ID) {
    try {
      let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      return await Evolve.SqlPool.request()
        .input("EvolveSchedulingBom_ID", Evolve.Sql.Int, EvolveProdOrderBom_ID)
        .input("EvolveSchedulingBom_UpdatedUser", Evolve.Sql.Int, EvolveUser_ID)
        .input("qty", Evolve.Sql.Int, qty)
        .input('EvolveSchedulingBom_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
        .query("UPDATE EvolveSchedulingBom SET EvolveSchedulingBom_QtyPick = EvolveSchedulingBom_QtyPick-@qty, EvolveSchedulingBom_UpdatedUser=@EvolveSchedulingBom_UpdatedUser ,EvolveSchedulingBom_UpdatedAt=@EvolveSchedulingBom_UpdatedAt   WHERE  EvolveSchedulingBom_ID=@EvolveSchedulingBom_ID ")
    } catch (error) {
      Evolve.Log.error(" EERR1797: Error while updating Bom Pick List On Unpick " + error.message);
      return new Error(" EERR1797: Error while updating Bom Pick List On Unpick " + error.message);
    }
  },
  getLocationStatus: async function (EvolveLocation_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveLocation_ID", Evolve.Sql.Int, EvolveLocation_ID)
        .query("SELECT  scm.EvolveStatusCodeMstr_Code  FROM  EvolveLocation el  , EvolveStatusCodeMstr scm WHERE el.EvolveStatusCodeMstr_Id = scm.EvolveStatusCodeMstr_Id AND el.EvolveLocation_ID = @EvolveLocation_ID")
    } catch (error) {
      Evolve.Log.error(" EERR2631: Error while check po status " + error.message);
      return new Error(" EERR2631: Error while check po status " + error.message);
    }
  },
  getWoNumber: async function (EvolveWoSchedule_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveWoSchedule_ID", Evolve.Sql.Int, EvolveWoSchedule_ID)
        .query("SELECT EvolveWoSchedule_OrderID  FROM  EvolveWoSchedule WHERE EvolveWoSchedule_ID = @EvolveWoSchedule_ID")
    } catch (error) {
      Evolve.Log.error(" EERR3090: Error while get wo number " + error.message);
      return new Error(" EERR3090: Error while get wo number " + error.message);
    }
  },







}