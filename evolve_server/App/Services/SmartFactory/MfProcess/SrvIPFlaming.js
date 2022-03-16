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

    getIpFlamingWoList: async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("SELECT epod.EvolveProdOrdersDetail_Serial,ei.EvolveItem_Code,epo.EvolveProdOrders_OrderId FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq = 21 AND EvolveProdOrdersDetail_NxtSeq = 21 AND (EvolveProdOrdersDetail_Status ='In Process' OR EvolveProdOrdersDetail_Status ='In Queue') AND epo.EvolveItem_ID = ei.EvolveItem_ID ")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
        
    getIpFlamingChildList: async function (EvolveProdOrdersDetail_ID) {
        try {
          return await Evolve.SqlPool.request()
            .input("EvolveProdOrdersDetail_ID",Evolve.Sql.Int,EvolveProdOrdersDetail_ID)
            .query("SELECT ei.EvolveItem_ID , ei.EvolveItem_Code , epoc.EvolveProdOrdersDetailChild_QtyPer , epoc.EvolveProdOrdersDetailChild_QtyScanned , epoc.EvolveProdOrdersDetailChild_Scanned , ei.EvolveItem_CustPart , ei.EvolveItem_Desc,ei.EvolveItem_Unique FROM EvolveProdOrdersDetailChild epoc , EvolveItem ei WHERE epoc.EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID AND ei.EvolveItem_ID = epoc.EvolveProdOrdersDetailChild_ChildItemId AND epoc.EvolveProdOrdersDetailChild_parentSequenceId = 21  ORDER BY EvolveProdOrdersDetailChild_Scanned DESC")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    startIpFlaming: async function (EvolveProdOrdersDetail_Serial) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrdersDetail_Serial",Evolve.Sql.NVarChar,EvolveProdOrdersDetail_Serial)
                .input("EvolveProdOrdersDetail_InProcess",Evolve.Sql.NVarChar,dataTime)
                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_Status = 'In Process' , EvolveProdOrdersDetail_InProcess = @EvolveProdOrdersDetail_InProcess WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial and EvolveProdOrdersDetail_PrvSeq = 21 and EvolveProdOrdersDetail_NxtSeq = 21 and ( EvolveProdOrdersDetail_Status != 'In Completed' or  EvolveProdOrdersDetail_Status != 'Completed')")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getIpFlamingCompletedTriggers: async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("SELECT count(epod.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq = 21 AND ( EvolveProdOrdersDetail_NxtSeq= 22 OR EvolveProdOrdersDetail_NxtSeq= 23 )AND (EvolveProdOrdersDetail_Status ='In Process' OR  EvolveProdOrdersDetail_Status ='In Queue') AND epo.EvolveItem_ID = ei.EvolveItem_ID AND CAST(epod.EvolveProdOrdersDetail_UpdatedAt as date) >= FORMAT(getdate(), 'yyyy-MM-dd')")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    checkIpFlamingBarcode: async function (EvolveProdOrdersDetail_Serial) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar, EvolveProdOrdersDetail_Serial)
            .query("  SELECT  (SELECT  SUM(EvolveProdOrdersDetailChild_QtyPer) FROM  EvolveProdOrdersDetailChild epoc WHERE epod.EvolveProdOrdersDetail_ID = epoc.EvolveProdOrdersDetail_ID AND epoc.EvolveProdOrdersDetailChild_parentSequenceId = 21) as EvolveProdOrders_ScannedRequired   , epod.EvolveProdOrders_TotalScanned , epo.EvolveProdOrders_ID , epod.EvolveProdOrdersDetail_ID , epod.EvolveProdOrdersDetail_Status,epod.EvolveProdOrdersDetail_Serial,ei.EvolveItem_ID,ei.EvolveItem_Code,ei.EvolveItem_Desc,ei.EvolveItem_CustPart FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial   AND epod.EvolveProdOrdersDetail_PrvSeq = 21 AND epod.EvolveProdOrdersDetail_NxtSeq = 21 AND epo.EvolveItem_ID = ei.EvolveItem_ID AND  (epod.EvolveProdOrdersDetail_Status != 'In Completed' or epod.EvolveProdOrdersDetail_Status  != 'Completed') AND (epod.EvolveProdOrdersDetail_Status = 'In Process' or epod.EvolveProdOrdersDetail_Status  = 'In Queue')")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    
    insertIpFlamingBarcode: async function (data) {
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
    
    addIpFlamingAudit: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveIpFlamingAudit_Barcode', Evolve.Sql.NVarChar, data.parentSerial)
                // .input('EvolveIpFlamingAudit_S1', Evolve.Sql.Int, s1)
                // .input('EvolveIpFlamingAudit_S2', Evolve.Sql.Int, s2)
                .query("INSERT INTO EvolveIpFlamingAudit (EvolveIpFlamingAudit_Barcode ) VALUES(@EvolveIpFlamingAudit_Barcode )")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    ipFlamingCheckAudit: async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("SELECT * FROM EvolveIpFlamingAudit")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    checkBarcodeInFlamingAudit: async function (data) {
        try {
          return await Evolve.SqlPool.request()
          .input('EvolveIpFlamingAudit_Barcode', Evolve.Sql.NVarChar, data.parentSerial)

            .query("SELECT * FROM EvolveIpFlamingAudit WHERE EvolveIpFlamingAudit_Barcode=@EvolveIpFlamingAudit_Barcode ")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    TruncateipFlamingAudit: async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("TRUNCATE TABLE EvolveIpFlamingAudit")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    changeSequenceToFoaming: async function (SerialNo , partOk) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            // let status ;
            if(partOk == true){
                // let prvSequence ;
                let nxtSequence ;

                let getParenItemDetails =   await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,SerialNo)
                .query("SELECT ei.* , eig.*,  ept.EvolveprocessTemp_Name , es.EvolveSerial_SeqID FROM EvolveItem ei , EvolveProcessTemp ept , EvolveSerial es , EvolveProdOrdersDetail epod   ,EvolveProdOrders epo  ,EvolveItemGroup eig WHERE ept.EvolveprocessTemp_ID = ei.EvolveProcessTemp_Id AND es.EvolveSerial_ID = ei.EvolveSerial_ID   AND epo.EvolveProdOrders_ID  = epod.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND ei.EvolveItem_ID = epo.EvolveItem_ID AND ei.EvolveItemGroup_ID = eig.EvolveItemGroup_ID")
                
                if(getParenItemDetails instanceof Error || getParenItemDetails.rowsAffected < 0){
    
                    return getParenItemDetails
                }else{
                if(getParenItemDetails.recordset[0].EvolveItemGroup_Name == 'HP Lamination'){
                    nxtSequence = 23;
                }else{
                    nxtSequence = 22;
    
                }
                    return await Evolve.SqlPool.request()
                    .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,SerialNo)
                    .input('EvolveProdOrdersDetail_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                    .input('EvolveProdOrdersDetail_PrvSeq', Evolve.Sql.Int, 21) 
                    .input('EvolveProdOrdersDetail_NxtSeq', Evolve.Sql.Int, nxtSequence) 

                    .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = @EvolveProdOrdersDetail_PrvSeq,  EvolveProdOrdersDetail_NxtSeq = @EvolveProdOrdersDetail_NxtSeq ,EvolveProdOrdersDetail_Status ='In Queue'  ,EvolveProdOrdersDetail_UpdatedAt=@EvolveProdOrdersDetail_UpdatedAt    WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial")
            }
            }else{
                return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,SerialNo)
                .input('EvolveProdOrdersDetail_UpdatedAt', Evolve.Sql.NVarChar, dataTime) 

                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_PrvSeq = '21' ,  EvolveProdOrdersDetail_NxtSeq = '21' , EvolveProdOrdersDetail_Status ='Rejected' ,EvolveProdOrdersDetail_UpdatedAt=@EvolveProdOrdersDetail_UpdatedAt   WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial")

            }
        

        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getIpFlamingNextBarcode: async function (prvBarcode) {
        try {
            //console.log(prvBarcode);
          return await Evolve.SqlPool.request()
            .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,prvBarcode)
            .query("SELECT TOP(1) * FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Serial > @EvolveProdOrdersDetail_Serial AND EvolveProdOrdersDetail_PrvSeq = 21 AND EvolveProdOrdersDetail_NxtSeq = 21 AND EvolveProdOrdersDetail_Status = 'In Queue' AND (EvolveProdOrdersDetail_Status != 'In Completed' OR EvolveProdOrdersDetail_Status = 'Completed') ");
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    addFlamingAuditHistory: async function (data) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveIpFlaming_Barcode', Evolve.Sql.NVarChar, data.EvolveIpFlamingAudit_Barcode)
                // .input('EvolveIpFlaming_S1', Evolve.Sql.Bit, data.EvolveIpFlamingAudit_S1)
                // .input('EvolveIpFlaming_S2', Evolve.Sql.Bit, data.EvolveIpFlamingAudit_S2)
                // .input('EvolveIpFlaming_S3', Evolve.Sql.Bit, data.EvolveIpFlamingAudit_S3)
                // .input('EvolveIpFlaming_S4', Evolve.Sql.Bit, data.EvolveIpFlamingAudit_S4)
                .input('EvolveIpFlaming_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveIpFlaming_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveIpFlaming_MachineStatus', Evolve.Sql.NVarChar, data.EvolveIpFlamingAudit_MachineStatus)
                .input('EvolveIpFlaming_ToolNo', Evolve.Sql.NVarChar, data.EvolveIpFlamingAudit_ToolNo)
                .input('EvolveIpFlaming_StartMachineProcess', Evolve.Sql.NVarChar, data.EvolveIpFlamingAudit_StartMachineProcess)
                .input('EvolveIpFlaming_CycleStarted', Evolve.Sql.NVarChar, data.EvolveIpFlamingAudit_CycleStarted)
                .input('EvolveIpFlaming_MESRunning', Evolve.Sql.NVarChar, data.EvolveIpFlamingAudit_MESRunning)
                .input('EvolveIpFlaming_CycleReset', Evolve.Sql.NVarChar, data.EvolveIpFlamingAudit_CycleReset)
                .input('EvolveIpFlaming_CycleRunning', Evolve.Sql.NVarChar, data.EvolveIpFlamingAudit_CycleRunning)
                .input('EvolveIpFlaming_IsPartOk', Evolve.Sql.Bit, data.EvolveIpFlamingAudit_IsPartOk)
                .input('EvolveIpFlaming_IsPartNotOk', Evolve.Sql.Bit, data.EvolveIpFlamingAudit_IsPartNotOk)
                .input('EvolveIpFlaming_CycleCompleted', Evolve.Sql.NVarChar, data.EvolveIpFlamingAudit_CycleCompleted)
                .input('EvolveIpFlaming_PartFinish', Evolve.Sql.NVarChar, data.EvolveIpFlamingAudit_PartFinish)
                .input('EvolveIpFlaming_PartOkTime', Evolve.Sql.NVarChar, data.EvolveIpFlamingAudit_PartOkTime)
                .query("INSERT INTO EvolveIpFlaming (EvolveIpFlaming_Barcode ,EvolveIpFlaming_CreatedUser,EvolveIpFlaming_CreatedAt,EvolveIpFlaming_MachineStatus , EvolveIpFlaming_ToolNo ,EvolveIpFlaming_StartMachineProcess , EvolveIpFlaming_CycleStarted ,EvolveIpFlaming_MESRunning ,EvolveIpFlaming_CycleReset ,EvolveIpFlaming_CycleRunning ,EvolveIpFlaming_IsPartOk ,EvolveIpFlaming_IsPartNotOk , EvolveIpFlaming_CycleCompleted ,EvolveIpFlaming_PartFinish,EvolveIpFlaming_PartOkTime) VALUES (@EvolveIpFlaming_Barcode  , @EvolveIpFlaming_CreatedUser ,@EvolveIpFlaming_CreatedAt ,@EvolveIpFlaming_MachineStatus ,@EvolveIpFlaming_ToolNo ,@EvolveIpFlaming_StartMachineProcess ,@EvolveIpFlaming_CycleStarted ,@EvolveIpFlaming_MESRunning ,@EvolveIpFlaming_CycleReset,@EvolveIpFlaming_CycleRunning ,@EvolveIpFlaming_IsPartOk ,@EvolveIpFlaming_IsPartNotOk ,@EvolveIpFlaming_CycleCompleted ,@EvolveIpFlaming_PartFinish,@EvolveIpFlaming_PartOkTime)")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    checkFlamingParentScanQty: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_ID', Evolve.Sql.Int, data.parentSerial_id)
                .query("  SELECT  epod.EvolveProdOrders_TotalScanned , (SELECT  SUM(EvolveProdOrdersDetailChild_QtyPer) FROM  EvolveProdOrdersDetailChild epoc WHERE epod.EvolveProdOrdersDetail_ID = epoc.EvolveProdOrdersDetail_ID AND epoc.EvolveProdOrdersDetailChild_parentSequenceId = 21) as EvolveProdOrders_ScannedRequired FROM EvolveProdOrdersDetail epod WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID")
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

}

// 