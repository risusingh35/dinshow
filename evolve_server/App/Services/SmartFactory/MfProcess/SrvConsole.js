'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    checkConsoleAssyBarcode: async function (EvolveProdOrdersDetail_Serial) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar, EvolveProdOrdersDetail_Serial)
                .query("SELECT epo.EvolveProdOrders_ID , epod.EvolveProdOrdersDetail_ID , epod.EvolveProdOrdersDetail_Status,epod.EvolveProdOrdersDetail_Serial,ei.EvolveItem_ID,ei.EvolveItem_Code,ei.EvolveItem_Desc,ei.EvolveItem_CustPart FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epod.EvolveProdOrdersDetail_PrvSeq = 12 AND epod.EvolveProdOrdersDetail_NxtSeq = 12 AND epo.EvolveItem_ID = ei.EvolveItem_ID AND  (epod.EvolveProdOrdersDetail_Status != 'In Completed' or epod.EvolveProdOrdersDetail_Status  != 'Completed') AND (epod.EvolveProdOrdersDetail_Status = 'In Process' or epod.EvolveProdOrdersDetail_Status  = 'In Queue')")
        } catch (error) {
            Evolve.Log.error(" EERR1675: Error while  checking Console Assy Barcode "+error.message);
            return new Error(" EERR1675: Error while  checking Console Assy Barcode "+error.message);
        }
    },
    checkParentScanQty: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_ID', Evolve.Sql.Int, data.parentSerial_id)
                .query("SELECT EvolveProdOrders_ScannedRequired , EvolveProdOrders_TotalScanned FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1676: Error while checking Parent Scan Qty "+error.message);
            return new Error(" EERR1676: Error while checking Parent Scan Qty "+error.message);
        }
    },

    updateProdOrderDetailChild: async function (data) {
        console.log(data)
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
            Evolve.Log.error(" EERR1677: Error while  updating Prod Order Detail Child "+error.message);
            return new Error(" EERR1677: Error while  updating Prod Order Detail Child "+error.message);
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
            Evolve.Log.error(" EERR1678: Error while  insert Door Assy Barcode "+error.message);
            return new Error(" EERR1678: Error while  insert Door Assy Barcode "+error.message);
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
            Evolve.Log.error(" EERR1679: Error while  updating Parent Barcode "+error.message);
            return new Error(" EERR1679: Error while  updating Parent Barcode "+error.message);
        }
    },
    getScrewParent: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.parentItem_id)
                .query("SELECT EvolveItem_Type , EvolveItem_Screw FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1680: Error while  getting Screw Parent "+error.message);
            return new Error(" EERR1680: Error while  getting Screw Parent "+error.message);
        }
    },
    addConsoleAssyAudit: async function (data, s5, s6) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveConsoleAudit_Barcode', Evolve.Sql.NVarChar, data.parentSerial)
                .input('EvolveConsoleAudit_S5', Evolve.Sql.Int, s5)
                .input('EvolveConsoleAudit_S6', Evolve.Sql.Int, s6)
                .query("INSERT INTO EvolveConsoleAudit (EvolveConsoleAudit_Barcode , EvolveConsoleAudit_S5 , EvolveConsoleAudit_S6) VALUES(@EvolveConsoleAudit_Barcode , @EvolveConsoleAudit_S5 , @EvolveConsoleAudit_S6)")
        } catch (error) {
            Evolve.Log.error(" EERR1681: Error while  adding Console Assy Audit "+error.message);
            return new Error(" EERR1681: Error while  adding Console Assy Audit "+error.message);
        }
    },
    getConsoleAssyChildList: async function (EvolveProdOrdersDetail_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrdersDetail_ID", Evolve.Sql.Int, EvolveProdOrdersDetail_ID)
                .query("SELECT ei.EvolveItem_ID , ei.EvolveItem_Code , epoc.EvolveProdOrdersDetailChild_QtyPer , epoc.EvolveProdOrdersDetailChild_QtyScanned , epoc.EvolveProdOrdersDetailChild_Scanned , ei.EvolveItem_CustPart , ei.EvolveItem_Desc FROM EvolveProdOrdersDetailChild epoc , EvolveItem ei WHERE epoc.EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID AND ei.EvolveItem_ID = epoc.EvolveProdOrdersDetailChild_ChildItemId ORDER BY EvolveProdOrdersDetailChild_Scanned DESC")
        } catch (error) {
            Evolve.Log.error(" EERR1682: Error while  getting Console Assy Child List "+error.message);
            return new Error(" EERR1682: Error while  getting Console Assy Child List "+error.message);
        }
    },
    startConsoleAssy: async function (EvolveProdOrdersDetail_Serial) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, EvolveProdOrdersDetail_Serial)
                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_Status = 'In Process' WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial and EvolveProdOrdersDetail_PrvSeq = 12 and EvolveProdOrdersDetail_NxtSeq = 12 and ( EvolveProdOrdersDetail_Status != 'In Completed' or  EvolveProdOrdersDetail_Status != 'Completed')")
        } catch (error) {
            Evolve.Log.error(" EERR1683: Error while  start Console Assy "+error.message);
            return new Error(" EERR1683: Error while  start Console Assy "+error.message);
        }
    },
    printData: async function (EvolveProdOrdersDetail_Serial) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, EvolveProdOrdersDetail_Serial)
                .query("SELECT epod.EvolveProdOrdersDetail_Serial , ei.EvolveItem_Code , ei.EvolveItem_Type  , ei.EvolveItem_Desc , ei.EvolveItem_CustPart FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1684: Error while  printing Data "+error.message);
            return new Error(" EERR1684: Error while  printing Data "+error.message);
        }
    },
    getConsoleAssyWoList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT epod.EvolveProdOrdersDetail_Serial,ei.EvolveItem_Code,epo.EvolveProdOrders_OrderId FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq = 12 AND EvolveProdOrdersDetail_NxtSeq = 12 AND (EvolveProdOrdersDetail_Status ='In Process' OR EvolveProdOrdersDetail_Status ='In Queue') AND epo.EvolveItem_ID = ei.EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1685: Error while  getting Console Assy Wo List "+error.message);
            return new Error(" EERR1685: Error while  getting Console Assy Wo List "+error.message);
        }
    },
    getConsoleAssyCompletedTriggers: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT count(epod.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq = 12 AND EvolveProdOrdersDetail_NxtSeq= 12 AND EvolveProdOrdersDetail_Status ='Completed' AND epo.EvolveItem_ID = ei.EvolveItem_ID AND CAST(epod.EvolveProdOrdersDetail_CreatedAt as date) >= FORMAT(getdate(), 'yyyy-MM-dd')")
        } catch (error) {
            Evolve.Log.error(" EERR1686: Error while  getting Console Assy Completed Triggers "+error.message);
            return new Error(" EERR1686: Error while  getting Console Assy Completed Triggers "+error.message);
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
    consoleAssyCheckAudit: async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("SELECT * FROM EvolveConsoleAudit")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },

    TruncateConsoleAudit: async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("TRUNCATE TABLE EvolveConsoleAudit")
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
    getConsoleNextBarcode: async function (prvBarcode) {
        try {
            //console.log(prvBarcode);
          return await Evolve.SqlPool.request()
            .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,prvBarcode)
            .query("SELECT TOP(1) * FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Serial > @EvolveProdOrdersDetail_Serial AND EvolveProdOrdersDetail_PrvSeq = 12 AND EvolveProdOrdersDetail_NxtSeq = 12 AND EvolveProdOrdersDetail_Status = 'In Queue'");
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    printData: async function (EvolveProdOrdersDetail_Serial) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, EvolveProdOrdersDetail_Serial)
                .query("SELECT epod.EvolveProdOrdersDetail_Serial , ei.EvolveItem_Code , ei.EvolveItem_Type  , ei.EvolveItem_Desc , ei.EvolveItem_CustPart FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1684: Error while  printing Data "+error.message);
            return new Error(" EERR1684: Error while  printing Data "+error.message);
        }
    },
    










}