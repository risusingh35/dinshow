'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getScrewParent: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.parentItem_id)
                .query("SELECT EvolveItem_Type , EvolveItem_Screw FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },

    checkParentScanQty: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_ID', Evolve.Sql.Int, data.parentSerial_id)
                .query("SELECT EvolveProdOrders_ScannedRequired , EvolveProdOrders_TotalScanned FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
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
    updateProdOrderDetailChild: async function (data) {
        try {
            let prodOrderDetailsChildData =  await Evolve.SqlPool.request()
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
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    
    updateParentBarcode: async function (data,NewQty) {
        try {
            NewQty = NewQty + 1
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_ID', Evolve.Sql.Int, data.parentSerial_id)
                .input('EvolveProdOrders_TotalScanned', Evolve.Sql.Int, NewQty)
                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrders_TotalScanned = @EvolveProdOrders_TotalScanned WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    printData: async function (EvolveProdOrdersDetail_Serial) {
        try {
          return await Evolve.SqlPool.request()
            .input("EvolveProdOrdersDetail_Serial",Evolve.Sql.NVarChar,EvolveProdOrdersDetail_Serial)
            .query("SELECT epod.EvolveProdOrdersDetail_Serial , ei.EvolveItem_Code , ei.EvolveItem_Type  , ei.EvolveItem_Desc , ei.EvolveItem_CustPart FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei WHERE epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    
    getIpFoamingWoList: async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("SELECT epod.EvolveProdOrdersDetail_Serial,ei.EvolveItem_Code,epo.EvolveProdOrders_OrderId FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq = 21 AND EvolveProdOrdersDetail_NxtSeq = 22 AND (EvolveProdOrdersDetail_Status ='In Process' OR EvolveProdOrdersDetail_Status ='In Queue') AND epo.EvolveItem_ID = ei.EvolveItem_ID ")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
        
    getIpFoamingChildList: async function (EvolveProdOrdersDetail_ID) {
        try {
          return await Evolve.SqlPool.request()
            .input("EvolveProdOrdersDetail_ID",Evolve.Sql.Int,EvolveProdOrdersDetail_ID)
            .query(" SELECT einv.EvolveInventory_RefNumber, ei.EvolveItem_ID , ei.EvolveItem_Code , epoc.EvolveProdOrdersDetailChild_QtyPer , epoc.EvolveProdOrdersDetailChild_QtyScanned , epoc.EvolveProdOrdersDetailChild_Scanned , ei.EvolveItem_CustPart , ei.EvolveItem_Desc , ei.EvolveItem_Unique FROM  EvolveItem ei, EvolveProdOrdersDetailChild epoc LEFT JOIN EvolveInventory einv ON  epoc.EvolveInventory_ID = einv.EvolveInventory_ID    WHERE epoc.EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID AND ei.EvolveItem_ID = epoc.EvolveProdOrdersDetailChild_ChildItemId AND epoc.EvolveProdOrdersDetailChild_parentSequenceId = 22    ORDER BY EvolveProdOrdersDetailChild_Scanned DESC ")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    startIpFoaming: async function (EvolveProdOrdersDetail_Serial) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrdersDetail_Serial",Evolve.Sql.NVarChar,EvolveProdOrdersDetail_Serial)
                .input("EvolveProdOrdersDetail_InProcess",Evolve.Sql.NVarChar,dataTime)
                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_Status = 'In Process' , EvolveProdOrdersDetail_InProcess = @EvolveProdOrdersDetail_InProcess WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial and EvolveProdOrdersDetail_PrvSeq = 21 and EvolveProdOrdersDetail_NxtSeq = 22 and ( EvolveProdOrdersDetail_Status != 'In Completed' or  EvolveProdOrdersDetail_Status != 'Completed')")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getIpFoamingCompletedTriggers: async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("SELECT count(epod.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq = 22 AND EvolveProdOrdersDetail_NxtSeq= 24 AND EvolveProdOrdersDetail_Status ='Completed' AND epo.EvolveItem_ID = ei.EvolveItem_ID AND CAST(epod.EvolveProdOrdersDetail_UpdatedAt as date) >= FORMAT(getdate(), 'yyyy-MM-dd')")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    checkIpFoamingBarcode: async function (EvolveProdOrdersDetail_Serial) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar, EvolveProdOrdersDetail_Serial)
            .query("SELECT DATEDIFF(day, epod.EvolveProdOrdersDetail_UpdatedAt, GETDATE() ) as daysFromFlaming , epo.EvolveProdOrders_ID , epod.EvolveProdOrdersDetail_ID , epod.EvolveProdOrdersDetail_Status,epod.EvolveProdOrdersDetail_Serial,ei.EvolveItem_ID,ei.EvolveItem_Code,ei.EvolveItem_Desc,ei.EvolveItem_CustPart , epod.EvolveProdOrders_ScannedRequired , epod.EvolveProdOrders_TotalScanned  , EvolveProdOrdersDetail_PrvSeq ,EvolveProdOrdersDetail_NxtSeq FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epod.EvolveProdOrdersDetail_PrvSeq = 21 AND epod.EvolveProdOrdersDetail_NxtSeq = 22 AND epo.EvolveItem_ID = ei.EvolveItem_ID AND  (epod.EvolveProdOrdersDetail_Status != 'In Completed' or epod.EvolveProdOrdersDetail_Status  != 'Completed') AND (epod.EvolveProdOrdersDetail_Status = 'In Process' or epod.EvolveProdOrdersDetail_Status  = 'In Queue') ")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    
    insertIpFoamingBarcode: async function (data) {
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
    
    addIpFoamingAudit: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveIpFoamingAudit_Barcode', Evolve.Sql.NVarChar, data.parentSerial)
                .query("INSERT INTO EvolveIpFoamingAudit (EvolveIpFoamingAudit_Barcode ) VALUES(@EvolveIpFoamingAudit_Barcode)")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    ipFoamingCheckAudit: async function () {
        try {
          return await Evolve.SqlPool.request()
          
            .query("SELECT * FROM EvolveIpFoamingAudit")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    checkBarcodeInFoamingAudit: async function (data) {
        try {
          return await Evolve.SqlPool.request()
          .input('EvolveIpFoamingAudit_Barcode', Evolve.Sql.NVarChar, data.parentSerial)

            .query("SELECT * FROM EvolveIpFoamingAudit WHERE EvolveIpFoamingAudit_Barcode=@EvolveIpFoamingAudit_Barcode ")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    TruncateipFoamingAudit: async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("TRUNCATE TABLE EvolveIpFoamingAudit")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    changeSequenceToAssembly: async function (SerialNo , data) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

            
            if(data.EvolveIpFoamingAudit_PolyMaterialStatus == true && data.EvolveIpFoamingAudit_ISOMaterialStatus == true  ){
                // status = 'Completed'
                // Sequance = 24
                return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_Status',Evolve.Sql.NVarChar,'Completed')
                .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,SerialNo)
                .input('EvolveProdOrdersDetail_NxtSeq', Evolve.Sql.Int, 24)
                .input('EvolveProdOrdersDetail_PrvSeq', Evolve.Sql.Int, 22)
                .input('EvolveProdOrdersDetail_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveProdOrdersDetail_UpdatedAt', Evolve.Sql.NVarChar, dataTime) 
            
                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = @EvolveProdOrdersDetail_PrvSeq ,  EvolveProdOrdersDetail_NxtSeq = @EvolveProdOrdersDetail_NxtSeq  , EvolveProdOrdersDetail_Status = @EvolveProdOrdersDetail_Status , EvolveProdOrdersDetail_UpdatedUser=@EvolveProdOrdersDetail_UpdatedUser ,  EvolveProdOrdersDetail_UpdatedAt=@EvolveProdOrdersDetail_UpdatedAt  WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial")


            }else{
                return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_Status',Evolve.Sql.NVarChar,'Rejected')
                .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,SerialNo)
                .input('EvolveProdOrdersDetail_NxtSeq', Evolve.Sql.Int, 22)
                .input('EvolveProdOrdersDetail_PrvSeq', Evolve.Sql.Int, 21)
                .input('EvolveProdOrdersDetail_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveProdOrdersDetail_UpdatedAt', Evolve.Sql.NVarChar, dataTime) 
            
                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = @EvolveProdOrdersDetail_PrvSeq ,  EvolveProdOrdersDetail_NxtSeq = @EvolveProdOrdersDetail_NxtSeq  , EvolveProdOrdersDetail_Status = @EvolveProdOrdersDetail_Status , EvolveProdOrdersDetail_UpdatedUser=@EvolveProdOrdersDetail_UpdatedUser ,  EvolveProdOrdersDetail_UpdatedAt=@EvolveProdOrdersDetail_UpdatedAt  WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial")
                // status = 'Rejected'
            }

 
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getIpFoamingNextBarcode: async function (prvBarcode) {
        try {
            //console.log(prvBarcode);
          return await Evolve.SqlPool.request()
            .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,prvBarcode)
            .query("SELECT TOP(1) * FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Serial > @EvolveProdOrdersDetail_Serial AND EvolveProdOrdersDetail_PrvSeq = 21 AND EvolveProdOrdersDetail_NxtSeq = 22 AND EvolveProdOrdersDetail_Status = 'In Queue' AND (EvolveProdOrdersDetail_Status != 'In Completed' OR EvolveProdOrdersDetail_Status = 'Completed') ");
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    checkInventory: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.childItem_id)
                .input('EvolveProdOrdersDetail_ID', Evolve.Sql.Int, data.EvolveProdOrdersDetail_ID)
                .query("SELECT  einv.*  FROM EvolveProdOrdersDetailChild epocd  , EvolveInventory einv WHERE epocd.EvolveProdOrdersDetail_ID=@EvolveProdOrdersDetail_ID AND epocd.EvolveProdOrdersDetailChild_ChildItemId = @EvolveItem_ID AND einv.EvolveInventory_ID = epocd.EvolveInventory_ID AND einv.EvolveInventory_IsScanned = 1 AND einv.EvolveInventory_QtyAvailable > 0")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    updateProdOrderDetailChildFoaming: async function (data) {
        try {
            let prodOrderDetailsChildData =  await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetailChild_ParentItemID', Evolve.Sql.Int, data.parentItem_id)
                .input('EvolveProdOrdersDetailChild_ChildItemId', Evolve.Sql.Int, data.childItem_id)
                .input('EvolveProdOrdersDetail_ID', Evolve.Sql.Int, data.parentSerial_id)
                .query("SELECT EvolveProdOrdersDetailChild_ID , EvolveProdOrdersDetailChild_QtyPer , EvolveProdOrdersDetailChild_QtyScanned FROM EvolveProdOrdersDetailChild WHERE EvolveProdOrdersDetailChild_ParentItemID = @EvolveProdOrdersDetailChild_ParentItemID AND EvolveProdOrdersDetailChild_ChildItemId = @EvolveProdOrdersDetailChild_ChildItemId AND EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID")
                let NewQty = parseInt(prodOrderDetailsChildData.recordset[0].EvolveProdOrdersDetailChild_QtyScanned) + data.qtyToUpdate
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetailChild_ID', Evolve.Sql.Int, prodOrderDetailsChildData.recordset[0].EvolveProdOrdersDetailChild_ID)
                .input('EvolveInventory_ID', Evolve.Sql.Int, data.EvolveInventory_ID)
                .input('EvolveProdOrdersDetailChild_QtyScanned', Evolve.Sql.Int, NewQty)
                .query("UPDATE EvolveProdOrdersDetailChild SET EvolveProdOrdersDetailChild_QtyScanned = @EvolveProdOrdersDetailChild_QtyScanned ,EvolveInventory_ID=@EvolveInventory_ID  WHERE EvolveProdOrdersDetailChild_ID = @EvolveProdOrdersDetailChild_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    updateParentBarcodeFoaming: async function (data,NewQty) {
        try {
            NewQty = NewQty + data.qtyToUpdate;
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_ID', Evolve.Sql.Int, data.parentSerial_id)
                .input('EvolveProdOrders_TotalScanned', Evolve.Sql.Int, NewQty)
                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrders_TotalScanned = @EvolveProdOrders_TotalScanned WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    updateInvDetails: async function (data) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            // let EvolveInventory_QtyAllocated = 
            return await Evolve.SqlPool.request()
                .input('EvolveInventory_ID', Evolve.Sql.NVarChar, data.EvolveInventory_ID)
                .input('qty', Evolve.Sql.NVarChar, data.qtyToUpdate)
                .input('EvolveInventory_UpdatedUser', Evolve.Sql.Int,data.EvolveUser_ID)
                .input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dataTime)


                .query("UPDATE EvolveInventory SET EvolveInventory_QtyAllocated =EvolveInventory_QtyAllocated + @qty , EvolveInventory_QtyAvailable = EvolveInventory_QtyAvailable-@qty  , EvolveInventory_IsScanned =1  WHERE EvolveInventory_ID = @EvolveInventory_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getInventory: async function (data) {
        try {
            // let EvolveInventory_QtyAllocated = 
            console.log("data>>>" ,  data)
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.childItem_id)
                .input('EvolveInventory_RefNumber', Evolve.Sql.NVarChar, data.EvolveProdOrdersDetail_Serial)

                .query("SELECT * FROM  EvolveInventory WHERE EvolveItem_ID=@EvolveItem_ID   AND EvolveInventory_QtyAvailable > 0 AND EvolveInventory_RefNumber=@EvolveInventory_RefNumber")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    addFoamingAuditHistory: async function (data) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveIpFoaming_Barcode', Evolve.Sql.NVarChar, data.EvolveIpFoamingAudit_Barcode)
                .input('EvolveIpFoaming_MachineStatus', Evolve.Sql.Bit, data.EvolveIpFoamingAudit_MachineStatus)
                .input('EvolveIpFoaming_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveIpFoaming_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveIpFoaming_PolyMaterialStatus', Evolve.Sql.Bit, data.EvolveIpFoamingAudit_PolyMaterialStatus)
                .input('EvolveIpFoaming_ISOMaterialStatus', Evolve.Sql.Bit, data.EvolveIpFoamingAudit_ISOMaterialStatus)
                .input('EvolveIpFoaming_PartOkTime', Evolve.Sql.NVarChar, data.EvolveIpFoamingAudit_PartOkTime)

        
                .query("INSERT INTO EvolveIpFoaming (EvolveIpFoaming_Barcode   ,EvolveIpFoaming_MachineStatus,EvolveIpFoaming_CreatedUser,EvolveIpFoaming_CreatedAt , EvolveIpFoaming_PolyMaterialStatus ,EvolveIpFoaming_ISOMaterialStatus ,EvolveIpFoaming_PartOkTime) VALUES (@EvolveIpFoaming_Barcode ,@EvolveIpFoaming_MachineStatus ,@EvolveIpFoaming_CreatedUser ,@EvolveIpFoaming_CreatedAt ,@EvolveIpFoaming_PolyMaterialStatus ,@EvolveIpFoaming_ISOMaterialStatus,@EvolveIpFoaming_PartOkTime)")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    partMoveToReFlaming: async function (data) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

                    return await Evolve.SqlPool.request()
                    .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,data.EvolveProdOrdersDetail_Serial)
                    .input('EvolveProdOrdersDetail_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                    .input('EvolveProdOrdersDetail_UpdatedAt', Evolve.Sql.NVarChar, dataTime) 
                    .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = '21' ,  EvolveProdOrdersDetail_NxtSeq = '21' ,EvolveProdOrdersDetail_Status ='In Queue' ,EvolveProdOrdersDetail_UpdatedUser=@EvolveProdOrdersDetail_UpdatedUser ,EvolveProdOrdersDetail_UpdatedAt=@EvolveProdOrdersDetail_UpdatedAt    WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial")

        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    
    getLastFoamedSerialNo: async function () {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT TOP(1) *   FROM    (select top 2 * from EvolveProdOrdersDetail  WHERE  EvolveProdOrdersDetail_PrvSeq = 22 AND EvolveProdOrdersDetail_NxtSeq = 24 ORDER BY   EvolveProdOrdersDetail_ID DESC) x ORDER BY   EvolveProdOrdersDetail_ID ")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
}
// 