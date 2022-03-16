'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    checkDoorAssyBarcode: async function (EvolveProdOrdersDetail_Serial) {
        try {        
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar, EvolveProdOrdersDetail_Serial)
                .query("SELECT epo.EvolveProdOrders_ID , epod.EvolveProdOrdersDetail_ID , epod.EvolveProdOrdersDetail_Status,epod.EvolveProdOrdersDetail_Serial,ei.EvolveItem_ID,ei.EvolveItem_Code,ei.EvolveItem_Desc,ei.EvolveItem_CustPart , epod.EvolveProdOrders_ScannedRequired , epod.EvolveProdOrders_TotalScanned FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epod.EvolveProdOrdersDetail_PrvSeq = 11 AND epod.EvolveProdOrdersDetail_NxtSeq = 11 AND epo.EvolveItem_ID = ei.EvolveItem_ID AND  (epod.EvolveProdOrdersDetail_Status != 'In Completed' or epod.EvolveProdOrdersDetail_Status  != 'Completed') AND (epod.EvolveProdOrdersDetail_Status = 'In Process' or epod.EvolveProdOrdersDetail_Status  = 'In Queue') ")
        } catch (error) {
            Evolve.Log.error(" EERR1687: Error while checking Door Assy Barcode "+error.message);
            return new Error(" EERR1687: Error while checking Door Assy Barcode "+error.message);
        }
    },

    checkParentScanQty: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_ID', Evolve.Sql.Int, data.parentSerial_id)
                .query("SELECT EvolveProdOrders_ScannedRequired , EvolveProdOrders_TotalScanned FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1688: Error while checking Parent Scan Qty "+error.message);
            return new Error(" EERR1688: Error while checking Parent Scan Qty "+error.message);
        }
    },
    getScrewParent: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.parentItem_id)
                .query("SELECT EvolveItem_Type , EvolveItem_Screw FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1689: Error while getting Screw Parent "+error.message);
            return new Error(" EERR1689: Error while getting Screw Parent "+error.message);
        }
    },

    addDoorAssyAudit: async function (data, s1, s2) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDoorAudit_Barcode', Evolve.Sql.NVarChar, data.parentSerial)
                .input('EvolveDoorAudit_S1', Evolve.Sql.Int, s1)
                .input('EvolveDoorAudit_S2', Evolve.Sql.Int, s2)
                .query("INSERT INTO EvolveDoorAudit (EvolveDoorAudit_Barcode , EvolveDoorAudit_S1 , EvolveDoorAudit_S2) VALUES(@EvolveDoorAudit_Barcode , @EvolveDoorAudit_S1 , @EvolveDoorAudit_S2)")
        } catch (error) {
            Evolve.Log.error(" EERR1690: Error while adding Door Assy Audit "+error.message);
            return new Error(" EERR1690: Error while adding Door Assy Audit "+error.message);
        }
    },
    updateProdOrderDetailChild: async function (data) {
        try {
            let prodOrderDetailsChildData = await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetailChild_ParentItemID', Evolve.Sql.Int, data.parentItem_id)
                .input('EvolveProdOrdersDetailChild_ChildItemId', Evolve.Sql.Int, data.childItem_id)
                .input('EvolveProdOrdersDetail_ID', Evolve.Sql.Int, data.parentSerial_id)
                .query("SELECT EvolveProdOrdersDetailChild_ID , EvolveProdOrdersDetailChild_QtyPer , EvolveProdOrdersDetailChild_QtyScanned FROM EvolveProdOrdersDetailChild WHERE EvolveProdOrdersDetailChild_ParentItemID = @EvolveProdOrdersDetailChild_ParentItemID AND EvolveProdOrdersDetailChild_ChildItemId = @EvolveProdOrdersDetailChild_ChildItemId AND EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID")
            let NewQty = parseInt(prodOrderDetailsChildData.recordset[0].EvolveProdOrdersDetailChild_QtyScanned) + 1

            return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetailChild_ID', Evolve.Sql.Int, prodOrderDetailsChildData.recordset[0].EvolveProdOrdersDetailChild_ID)
                .input('EvolveProdOrdersDetailChild_QtyScanned', Evolve.Sql.Int, NewQty)
                .query("UPDATE EvolveProdOrdersDetailChild SET EvolveProdOrdersDetailChild_QtyScanned = @EvolveProdOrdersDetailChild_QtyScanned  WHERE EvolveProdOrdersDetailChild_ID = @EvolveProdOrdersDetailChild_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1691: Error while updating Prod Order Detail Child "+error.message);
            return new Error(" EERR1691: Error while updating Prod Order Detail Child "+error.message);
        }
    },
    insertDoorAssyBarcode: async function (data) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveDCDetailsChild_Barcode', Evolve.Sql.NVarChar, data.EvolveProdOrdersDetail_Serial)
                .input('EvolveDCDetailsChild_ParentID', Evolve.Sql.Int, data.parentItem_id)
                .input('EvolveProdOrder_ID', Evolve.Sql.Int, data.parentWo_id)
                .input('EvolveProdOrderDetails_ID', Evolve.Sql.Int, data.parentSerial_id)
                .input('EvolveDCDetailsChild_ItemID', Evolve.Sql.Int, data.childItem_id)
                .input('EvolveDCDetailsChild_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveDCDetailsChild_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .query("INSERT INTO EvolveDCDetailsChild (EvolveDCDetailsChild_Barcode , EvolveDCDetailsChild_ParentID , EvolveProdOrder_ID , EvolveProdOrderDetails_ID,EvolveDCDetailsChild_ItemID,EvolveDCDetailsChild_CreatedUser,EvolveDCDetailsChild_CreatedAt) VALUES (@EvolveDCDetailsChild_Barcode , @EvolveDCDetailsChild_ParentID , @EvolveProdOrder_ID , @EvolveProdOrderDetails_ID , @EvolveDCDetailsChild_ItemID ,@EvolveDCDetailsChild_CreatedUser ,@EvolveDCDetailsChild_CreatedAt)")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },

    updateParentBarcode: async function (data, NewQty) {
        try {
            NewQty = NewQty + 1
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_ID', Evolve.Sql.Int, data.parentSerial_id)
                .input('EvolveProdOrders_TotalScanned', Evolve.Sql.Int, NewQty)
                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrders_TotalScanned = @EvolveProdOrders_TotalScanned WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1693: Error while updating Parent Barcode "+error.message);
            return new Error(" EERR1693: Error while updating Parent Barcode "+error.message);
        }
    },
    getDoorAssyChildList: async function (EvolveProdOrdersDetail_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrdersDetail_ID", Evolve.Sql.Int, EvolveProdOrdersDetail_ID)
                .query("SELECT ei.EvolveItem_ID , ei.EvolveItem_Code , epoc.EvolveProdOrdersDetailChild_QtyPer , epoc.EvolveProdOrdersDetailChild_QtyScanned , epoc.EvolveProdOrdersDetailChild_Scanned , ei.EvolveItem_CustPart , ei.EvolveItem_Desc FROM EvolveProdOrdersDetailChild epoc , EvolveItem ei WHERE epoc.EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID AND ei.EvolveItem_ID = epoc.EvolveProdOrdersDetailChild_ChildItemId ORDER BY EvolveProdOrdersDetailChild_Scanned DESC ")
        } catch (error) {
            Evolve.Log.error(" EERR1694: Error while getting Door Assy Child List "+error.message);
            return new Error(" EERR1694: Error while getting Door Assy Child List "+error.message);
        }
    },

    startDoorAssy: async function (EvolveProdOrdersDetail_Serial) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrdersDetail_Serial",Evolve.Sql.NVarChar,EvolveProdOrdersDetail_Serial)
                .input("EvolveProdOrdersDetail_InProcess",Evolve.Sql.NVarChar,dataTime)
                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_Status = 'In Process' , EvolveProdOrdersDetail_InProcess = @EvolveProdOrdersDetail_InProcess WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial and EvolveProdOrdersDetail_PrvSeq = 11 and EvolveProdOrdersDetail_NxtSeq = 11 and ( EvolveProdOrdersDetail_Status != 'In Completed' or  EvolveProdOrdersDetail_Status != 'Completed')")
        } catch (error) {
            Evolve.Log.error(" EERR1695: Error while starting Door Assy "+error.message);
            return new Error(" EERR1695: Error while starting Door Assy "+error.message);
        }
    },

    printData: async function (EvolveProdOrdersDetail_Serial) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, EvolveProdOrdersDetail_Serial)
                .query("SELECT epod.EvolveProdOrdersDetail_Serial , ei.EvolveItem_Code , ei.EvolveItem_Type  , ei.EvolveItem_Desc , ei.EvolveItem_CustPart FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1696: Error while printing Data "+error.message);
            return new Error(" EERR1696: Error while printing Data "+error.message);
        }
    },
    getDoorAssyWoList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT epod.EvolveProdOrdersDetail_Serial,ei.EvolveItem_Code,epo.EvolveProdOrders_OrderId FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq = 11 AND EvolveProdOrdersDetail_NxtSeq = 11 AND (EvolveProdOrdersDetail_Status ='In Process' OR EvolveProdOrdersDetail_Status ='In Queue') AND epo.EvolveItem_ID = ei.EvolveItem_ID ")
        } catch (error) {
            Evolve.Log.error(" EERR1697: Error while geting Door Assy Wo List "+error.message);
            return new Error(" EERR1697: Error while geting Door Assy Wo List "+error.message);
        }
    },
    getDoorAssyCompletedTriggers: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT count(epod.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq = 11 AND EvolveProdOrdersDetail_NxtSeq= 11 AND EvolveProdOrdersDetail_Status ='Completed' AND epo.EvolveItem_ID = ei.EvolveItem_ID AND CAST(epod.EvolveProdOrdersDetail_CreatedAt as date) >= FORMAT(getdate(), 'yyyy-MM-dd')")
        } catch (error) {
            Evolve.Log.error(" EERR1698: Error while getting Door Assy Completed Triggers "+error.message);
            return new Error(" EERR1698: Error while getting Door Assy Completed Triggers "+error.message);
        }
    },
    checkUniqueItem: async function (EvolveItem_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, EvolveItem_ID)
                .query("SELECT EvolveItem_Unique FROM EvolveItem where EvolveItem_ID = @EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    
    checkUniqueChildBarcode: async function (serial_no) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDCDetailsChild_Barcode', Evolve.Sql.NVarChar, serial_no)
                .query("SELECT EvolveDCDetailsChild_ID FROM EvolveDCDetailsChild where EvolveDCDetailsChild_Barcode LIKE @EvolveDCDetailsChild_Barcode")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    doorAssyCheckAudit: async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("SELECT * FROM EvolveDoorAudit")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    TruncateDoorAudit: async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("TRUNCATE TABLE EvolveDoorAudit")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    ComplateDoorParentBarcode: async function (SerialNo) {
        try {
          
          let cmpSerial =  await Evolve.SqlPool.request()
            .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,SerialNo)
            .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_Status = 'Completed' WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial")
            if(cmpSerial.rowsAffected[0] > 0){
                let cmpSerialCount =  await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,SerialNo)
                .query("SELECT epod.EvolveProdOrders_ID , epo.EvolveProdOrders_Quantity , (SELECT COUNT(epodl.EvolveProdOrdersDetail_ID) from EvolveProdOrdersDetail epodl WHERE epodl.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND epodl.EvolveProdOrdersDetail_Status = 'Completed') as cmpQty FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID")
                if(cmpSerialCount.recordset[0].EvolveProdOrders_Quantity == cmpSerialCount.recordset[0].cmpQty){    
                    return  await Evolve.SqlPool.request()
                        .input('EvolveProdOrders_ID',Evolve.Sql.Int,cmpSerialCount.recordset[0].EvolveProdOrders_ID)
                        .query("UPDATE EvolveProdOrders SET EvolveProdOrders_Status = 'Completed' WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID")
                } else {
                    return cmpSerial;    
                }
            } else {
                return cmpSerial;
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getDoorNextBarcode: async function (prvBarcode) {
        try {
            //console.log(prvBarcode);
          return await Evolve.SqlPool.request()
            .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,prvBarcode)
            .query("SELECT TOP(1) * FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Serial > @EvolveProdOrdersDetail_Serial AND EvolveProdOrdersDetail_PrvSeq = 11 AND EvolveProdOrdersDetail_NxtSeq = 11 AND EvolveProdOrdersDetail_Status = 'In Queue' AND (EvolveProdOrdersDetail_Status != 'In Completed' OR EvolveProdOrdersDetail_Status = 'Completed') ");
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },




}
