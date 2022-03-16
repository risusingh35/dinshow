'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
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
    
    getHPLaminationWoList: async function () {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT epod.EvolveProdOrdersDetail_Serial,ei.EvolveItem_Code,epo.EvolveProdOrders_OrderId FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq = 21 AND EvolveProdOrdersDetail_NxtSeq = 23 AND (EvolveProdOrdersDetail_Status ='In Process' OR EvolveProdOrdersDetail_Status ='In Queue') AND epo.EvolveItem_ID = ei.EvolveItem_ID ")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
        
    getHPLaminationChildList: async function (EvolveProdOrdersDetail_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input("EvolveProdOrdersDetail_ID",Evolve.Sql.Int,EvolveProdOrdersDetail_ID)
            .query("SELECT ei.EvolveItem_ID , ei.EvolveItem_Code , epoc.EvolveProdOrdersDetailChild_QtyPer , epoc.EvolveProdOrdersDetailChild_QtyScanned , epoc.EvolveProdOrdersDetailChild_Scanned , ei.EvolveItem_CustPart , ei.EvolveItem_Desc,ei.EvolveItem_Unique FROM EvolveProdOrdersDetailChild epoc , EvolveItem ei WHERE epoc.EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID AND ei.EvolveItem_ID = epoc.EvolveProdOrdersDetailChild_ChildItemId AND epoc.EvolveProdOrdersDetailChild_parentSequenceId = 23  ORDER BY EvolveProdOrdersDetailChild_Scanned DESC")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    startHPLamination: async function (EvolveProdOrdersDetail_Serial) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrdersDetail_Serial",Evolve.Sql.NVarChar,EvolveProdOrdersDetail_Serial)
                .input("EvolveProdOrdersDetail_InProcess",Evolve.Sql.NVarChar,dataTime)
                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_Status = 'In Process' , EvolveProdOrdersDetail_InProcess = @EvolveProdOrdersDetail_InProcess WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial and EvolveProdOrdersDetail_PrvSeq = 21 and EvolveProdOrdersDetail_NxtSeq = 23 and ( EvolveProdOrdersDetail_Status != 'In Completed' or  EvolveProdOrdersDetail_Status != 'Completed')")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getHPLaminationCompletedTriggers: async function () {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT count(epod.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq = 23 AND EvolveProdOrdersDetail_NxtSeq= 24 AND (EvolveProdOrdersDetail_Status ='Completed') AND epo.EvolveItem_ID = ei.EvolveItem_ID AND CAST(epod.EvolveProdOrdersDetail_CreatedAt as date) >= FORMAT(getdate(), 'yyyy-MM-dd')")

        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    checkHPLaminationBarcode: async function (EvolveProdOrdersDetail_Serial) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar, EvolveProdOrdersDetail_Serial)
            // .query("  SELECT  (SELECT  SUM(EvolveProdOrdersDetailChild_QtyPer) FROM  EvolveProdOrdersDetailChild epoc WHERE epod.EvolveProdOrdersDetail_ID = epoc.EvolveProdOrdersDetail_ID AND epoc.EvolveProdOrdersDetailChild_parentSequenceId = 23) as EvolveProdOrders_ScannedRequired   , epod.EvolveProdOrders_TotalScanned , epo.EvolveProdOrders_ID , epod.EvolveProdOrdersDetail_ID , epod.EvolveProdOrdersDetail_Status,epod.EvolveProdOrdersDetail_Serial,ei.EvolveItem_ID,ei.EvolveItem_Code,ei.EvolveItem_Desc,ei.EvolveItem_CustPart FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial   AND epod.EvolveProdOrdersDetail_PrvSeq = 21 AND epod.EvolveProdOrdersDetail_NxtSeq = 23 AND epo.EvolveItem_ID = ei.EvolveItem_ID AND  (epod.EvolveProdOrdersDetail_Status != 'In Completed' or epod.EvolveProdOrdersDetail_Status  != 'Completed') AND (epod.EvolveProdOrdersDetail_Status = 'In Process' or epod.EvolveProdOrdersDetail_Status  = 'In Queue')")
            .query("  SELECT  epod.EvolveProdOrders_ScannedRequired   , epod.EvolveProdOrders_TotalScanned , epo.EvolveProdOrders_ID , epod.EvolveProdOrdersDetail_ID , epod.EvolveProdOrdersDetail_Status,epod.EvolveProdOrdersDetail_Serial,ei.EvolveItem_ID,ei.EvolveItem_Code,ei.EvolveItem_Desc,ei.EvolveItem_CustPart FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial   AND epod.EvolveProdOrdersDetail_PrvSeq = 21 AND epod.EvolveProdOrdersDetail_NxtSeq = 23 AND epo.EvolveItem_ID = ei.EvolveItem_ID AND  (epod.EvolveProdOrdersDetail_Status != 'In Completed' or epod.EvolveProdOrdersDetail_Status  != 'Completed') AND (epod.EvolveProdOrdersDetail_Status = 'In Process' or epod.EvolveProdOrdersDetail_Status  = 'In Queue')")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    
    insertHPLaminationBarcode: async function (data) {
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
    checkBarcodeInHPLaminationAudit: async function (data) {
        try {
          return await Evolve.SqlPool.request()
          .input('EvolveHPLaminationAudit_Barcode', Evolve.Sql.NVarChar, data.parentSerial)

            .query("SELECT * FROM EvolveHPLaminationAudit WHERE EvolveHPLaminationAudit_Barcode=@EvolveHPLaminationAudit_Barcode ")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    
    addHPLaminationAudit: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveHPLaminationAudit_Barcode', Evolve.Sql.NVarChar, data.parentSerial)
                .query("INSERT INTO EvolveHPLaminationAudit (EvolveHPLaminationAudit_Barcode ) VALUES(@EvolveHPLaminationAudit_Barcode)")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    HPLaminationCheckAudit: async function () {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT * FROM EvolveHPLaminationAudit")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    TruncateHPLaminationAudit: async function () {
        try {
            return await Evolve.SqlPool.request()
            .query("TRUNCATE TABLE EvolveHPLaminationAudit")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    changeSequenceToLaminationComplete: async function (SerialNo , partOk) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
        
            if(partOk == true){
                    return await Evolve.SqlPool.request()
                    .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,SerialNo)
                    .input('EvolveProdOrdersDetail_UpdatedAt', Evolve.Sql.NVarChar, dataTime) 
                    .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = '23' ,  EvolveProdOrdersDetail_NxtSeq = '23' ,EvolveProdOrdersDetail_Status ='Completed'  ,EvolveProdOrdersDetail_UpdatedAt=@EvolveProdOrdersDetail_UpdatedAt    WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial")
            }else{
                return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,SerialNo)
                .input('EvolveProdOrdersDetail_UpdatedAt', Evolve.Sql.NVarChar, dataTime) 

                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = '21' ,  EvolveProdOrdersDetail_NxtSeq = '23' , EvolveProdOrdersDetail_Status ='Rejected' ,EvolveProdOrdersDetail_UpdatedAt=@EvolveProdOrdersDetail_UpdatedAt   WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial")

            }
        
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getHPLaminationNextBarcode: async function (prvBarcode) {
        try {
            //console.log(prvBarcode);
            return await Evolve.SqlPool.request()
            .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,prvBarcode)
            .query("SELECT TOP(1) * FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Serial > @EvolveProdOrdersDetail_Serial AND EvolveProdOrdersDetail_PrvSeq = 21 AND EvolveProdOrdersDetail_NxtSeq = 23 AND EvolveProdOrdersDetail_Status = 'In Queue' AND (EvolveProdOrdersDetail_Status != 'In Completed' OR EvolveProdOrdersDetail_Status = 'Completed') ");
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    addHPLaminationAuditHistory: async function (data) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveHPLamination_Barcode', Evolve.Sql.NVarChar, data.EvolveHPLaminationAudit_Barcode)
                .input('EvolveHPLamination_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveHPLamination_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveHPLamination_MachineStatus', Evolve.Sql.NVarChar, data.EvolveHPLaminationAudit_MachineStatus)
                .input('EvolveHPLamination_ToolNo', Evolve.Sql.NVarChar, data.EvolveHPLaminationAudit_ToolNo)
                .input('EvolveHPLamination_StartMachineProcess', Evolve.Sql.NVarChar, data.EvolveHPLaminationAudit_StartMachineProcess)
                .input('EvolveHPLamination_CycleStarted', Evolve.Sql.NVarChar, data.EvolveHPLaminationAudit_CycleStarted)
                .input('EvolveHPLamination_MESRunning', Evolve.Sql.NVarChar, data.EvolveHPLaminationAudit_MESRunning)
                .input('EvolveHPLamination_CycleReset', Evolve.Sql.NVarChar, data.EvolveHPLaminationAudit_CycleReset)
                .input('EvolveHPLamination_CycleRunning', Evolve.Sql.NVarChar, data.EvolveHPLaminationAudit_CycleRunning)
                .input('EvolveHPLamination_IsPartOk', Evolve.Sql.Bit, data.EvolveHPLaminationAudit_IsPartOk)
                .input('EvolveHPLamination_IsPartNotOk', Evolve.Sql.Bit, data.EvolveHPLaminationAudit_IsPartNotOk)
                .input('EvolveHPLamination_CycleCompleted', Evolve.Sql.Bit, data.EvolveHPLaminationAudit_CycleCompleted)
                .input('EvolveHPLamination_PartFinish', Evolve.Sql.NVarChar, data.EvolveHPLaminationAudit_PartFinish)
                .input('EvolveHPLamination_PartOkTime', Evolve.Sql.NVarChar, data.EvolveHPLaminationAudit_PartOkTime)
                .query("INSERT INTO EvolveHPLamination (EvolveHPLamination_Barcode  ,EvolveHPLamination_CreatedUser,EvolveHPLamination_CreatedAt,EvolveHPLamination_MachineStatus , EvolveHPLamination_ToolNo ,EvolveHPLamination_StartMachineProcess , EvolveHPLamination_CycleStarted ,EvolveHPLamination_MESRunning ,EvolveHPLamination_CycleReset ,EvolveHPLamination_CycleRunning ,EvolveHPLamination_IsPartOk ,EvolveHPLamination_IsPartNotOk , EvolveHPLamination_CycleCompleted ,EvolveHPLamination_PartFinish ,EvolveHPLamination_PartOkTime) VALUES (@EvolveHPLamination_Barcode , @EvolveHPLamination_CreatedUser ,@EvolveHPLamination_CreatedAt ,@EvolveHPLamination_MachineStatus ,@EvolveHPLamination_ToolNo ,@EvolveHPLamination_StartMachineProcess ,@EvolveHPLamination_CycleStarted ,@EvolveHPLamination_MESRunning ,@EvolveHPLamination_CycleReset,@EvolveHPLamination_CycleRunning ,@EvolveHPLamination_IsPartOk ,@EvolveHPLamination_IsPartNotOk ,@EvolveHPLamination_CycleCompleted ,@EvolveHPLamination_PartFinish,@EvolveHPLamination_PartOkTime)")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
  
    checkHPLaminationParentScanQty: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_ID', Evolve.Sql.Int, data.parentSerial_id)
                .query("  SELECT  epod.EvolveProdOrders_TotalScanned , epod.EvolveProdOrders_ScannedRequired FROM EvolveProdOrdersDetail epod WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },


}

// 