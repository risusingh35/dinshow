'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getLocationList: async function () {
        try {
            return await Evolve.SqlPool.request()
            .query("select EvolveLocation_Name,EvolveLocation_ID FROM EvolveLocation");
        } catch (error) {
            Evolve.Log.error(" EERR1847: Error while getting Location List "+error.message);
            return new Error(" EERR1847: Error while getting Location List "+error.message);
        }
    },

    getOperatorList: async function () {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT EvolveOperator_Name,EvolveOperator_ID,EvolveUser_ID FROM EvolveOperator WHERE EvolveOperator_Status = 1");
        } catch (error) {
            Evolve.Log.error(" EERR1848: Error while getting Operator List "+error.message);
            return new Error(" EERR1848: Error while getting Operator List "+error.message);
        }
    },

    getMachineAndSection: async function (EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
                .query("SELECT em.EvolveMachine_ID,em.EvolveMachine_Name, es.EvolveSection_ID, es.EvolveSection_Name from EvolveMachine em, EvolveMachineToUser ema, EvolveMachineToUser emtu, EvolveSection es WHERE em.EvolveMachine_ID = ema.EvolveMachine_ID AND emtu.EvolveUser_ID = @EvolveUser_ID AND em.EvolveMachine_ID = emtu.EvolveMachine_ID AND es.EvolveSection_ID =  ema.EvolveSection_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1849: Error while getting Machine And Section "+error.message);
            return new Error(" EERR1849: Error while getting Machine And Section "+error.message);
        }
    },

    getWorkCenterList: async function () {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT EvolveSection_ID,EvolveSection_Name  FROM EvolveSection");
        } catch (error) {
            Evolve.Log.error(" EERR1850: Error while getting Work Center List "+error.message);
            return new Error(" EERR1850: Error while getting Work Center List "+error.message);
        }
    },

    getMachineListBySectionId: async function (workCenterId, EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input("workCenterId", Evolve.Sql.Int, workCenterId)
            // .input("EvolveUser_ID", Evolve.Sql.Int, EvolveUser_ID)
                .query("SELECT em.EvolveMachine_ID,em.EvolveMachine_Name from EvolveMachine em, EvolveMachineToUser ema WHERE em.EvolveMachine_ID = ema.EvolveMachine_ID AND ema.EvolveSection_ID = @workCenterId");
        
                // .query("SELECT em.EvolveMachine_ID,em.EvolveMachine_Name from EvolveMachine em, EvolveMachineToUser ema, EvolveMachineToUser emtu WHERE em.EvolveMachine_ID = ema.EvolveMachine_ID AND ema.EvolveSection_ID = @workCenterId AND emtu.EvolveUser_ID = @EvolveUser_ID AND em.EvolveMachine_ID = emtu.EvolveMachine_ID  ");
        } catch (error) {
          Evolve.Log.error(" EERR1851: Error while getting Machine List By Section Id "+error.message);
          return new Error(" EERR1851: Error while getting Machine List By Section Id "+error.message);
        }
    },

    getLocationByMachine: async function (EvolveMachine_ID) {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT el.EvolveLocation_ID FROM EvolveMachine em , EvolveLocation el WHERE em.EvolveMachine_Name = el.EvolveLocation_Code AND em.EvolveMachine_ID = " +EvolveMachine_ID);
        } catch (error) {
            Evolve.Log.error(" EERR1852: Error while getting Location By Machine "+error.message);
            return new Error(" EERR1852: Error while getting Location By Machine "+error.message);
        }
    },

    getItemListByWorkOrder: async function (EvolveProdOrders_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input("EvolveProdOrders_ID", Evolve.Sql.Int, EvolveProdOrders_ID)
            .query("SELECT ei.EvolveItem_ID,ei.EvolveItem_Code , ei.EvolveItem_CustPart , ei.EvolveItem_Desc  FROM EvolveProdOrders epo, EvolveItem ei WHERE epo.EvolveProdOrders_ID =@EvolveProdOrders_ID AND epo.EvolveItem_ID = ei.EvolveItem_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1853: Error while getting Item List By Work Order "+error.message);
            return new Error(" EERR1853: Error while getting Item List By Work Order "+error.message);
        }
    },

    checkPickList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
            .query("SELECT  SUM(EvolvePickList_QtyReq) as req_qty , SUM(EvolvePickList_QtyIss) as iss_qty FROM EvolvePickList WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1854: Error while checking Pick List "+error.message);
            return new Error(" EERR1854: Error while checking Pick List "+error.message);
        }
    },

    checkWoInShift: async function (data) {
        try {
            let bufferTime = await Evolve.SqlPool.request()
            .query("SELECT EvolveUnitConfig_Value FROM EvolveUnitConfig WHERE EvolveUnitConfig_Key = 'prodbookingbuffertime'");
            return await Evolve.SqlPool.request()
            .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
            .query("SELECT COUNT(epo.EvolveProdOrders_ID) as count FROM EvolveProdOrders epo , EvolveProdPlan epp , EvolveShift es WHERE epo.EvolveProdOrders_Status != 'completed' AND epo.EvolveProdPlan_ID = epp.EvolveProdPlan_ID  AND epp.EvolveProdPlan_ProdDate = FORMAT(getdate(), 'yyyy-MM-dd') AND es.EvolveShift_ID = epp.EvolveShift_ID AND es.EvolveShift_Start <= (SELECT CONVERT (time(0), CURRENT_TIMESTAMP)) AND (select dateadd(HOUR, " +bufferTime.recordset[0].EvolveUnitConfig_Value +
                " , es.EvolveShift_End)) >= (SELECT CONVERT (time(0), CURRENT_TIMESTAMP)) AND epo.EvolveProdOrders_ID = @EvolveProdOrders_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1855: Error while checking Wo In Shift "+error.message);
            return new Error(" EERR1855: Error while checking Wo In Shift "+error.message);
        }
    },

    getProdOrdersBom: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
            .query("Select ei.EvolveItem_Code, ei.EvolveItem_Desc, uom.EvolveUom_Type, pbom.EvolveProdOrderBom_CompItem_ID , pbom.EvolveProdOrderBom_QtyIss FROM EvolveItem ei,  EvolveUom uom , EvolveProdOrderBom pbom,EvolveProdOrders pod WHERE pbom.EvolveProdOrderBom_CompItem_ID = ei.EvolveItem_ID and pbom.EvolveUom_ID = uom.EvolveUom_ID and pbom.EvolveProdOrders_ID = pod.EvolveProdOrders_ID and pbom.EvolveProdOrders_ID = @EvolveProdOrders_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1856: Error while getting Prod Orders Bom "+error.message);
            return new Error(" EERR1856: Error while getting Prod Orders Bom "+error.message);
        }
    },

    getWorkOrderByItem: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
            .input("EvolveMachine_ID", Evolve.Sql.Int, data.machineId)
            .query("SELECT epo.EvolveProdOrders_ID , epo.EvolveProdOrders_Order , epo.EvolveProdOrders_OrderId FROM EvolveProdOrders epo WHERE epo.EvolveItem_ID = @EvolveItem_ID AND EvolveMachine_ID = @EvolveMachine_ID ORDER BY epo.EvolveProdOrders_ID  ASC");
        } catch (error) {
            Evolve.Log.error(" EERR1857: Error while getting Work Order By Item "+error.message);
            return new Error(" EERR1857: Error while getting Work Order By Item "+error.message);
        }
    },

    createOperator: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input("EvoleCompany_ID", Evolve.Sql.Int, data.EvoleCompany_ID)
            .input("EvolveOperator_Name",Evolve.Sql.NVarChar,data.EvolveOperator_Name)
            .query("INSERT INTO EvolveOperator(EvoleCompany_ID,EvolveOperator_Name,EvolveOperator_Status) VALUES(@EvoleCompany_ID,@EvolveOperator_Name,1)");
        } catch (error) {
            Evolve.Log.error(" EERR1858: Error while creating Operator "+error.message);
            return new Error(" EERR1858: Error while creating Operator "+error.message);
        }
    },

    createProductionOrders: async function (data) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear() +"-" + (date.getMonth() + 1) +"-" +date.getDate() +" " +date.getHours() +":" +date.getMinutes() +":" + date.getSeconds();
            var str = "" + 1;
            var pad = "0000";
            var wocount = pad.substring(0, pad.length - str.length) + str; //0001
            var dateObj = new Date();
            var month = dateObj.getMonth() + 1; //months from 1-12
            var day = dateObj.getDate();
            var year = dateObj.getFullYear().toString().substr(-2);
            if (month == 10) {
            month = "X";
            } else if (month == 11) {
            month = "Y";
            } else if (month == 12) {
            month = "Z";
            }
            let newdate = day + "" + month + "" + year; //28219
            let wo_nbr = "WO" + newdate + "" + wocount; //WO292190001
            let check_wo = await Evolve.SqlPool.request()
            .query("SELECT TOP 1 EvolveProdOrders_Order From EvolveProdOrders ORDER BY EvolveProdOrders_ID DESC");

            if (check_wo.rowsAffected > 0) {
            let last_wo = check_wo.recordset[0].EvolveProdOrders_Order; //WO282190001
            if (last_wo.indexOf(newdate) > -1) {
                let wo_new = parseInt(last_wo.substr(-4)) + 1; //0002 => 2
                let tmp = "" + wo_new;
                wocount = pad.substring(0, pad.length - tmp.length) + tmp;
                wo_nbr = "WO" + newdate + "" + wocount;
            }
            }

            let wo_ins = await Evolve.SqlPool.request()
            .input("EvolveProdOrders_OrderId",Evolve.Sql.NVarChar,newdate + "" + wocount)
            .input("EvolveProdOrders_Order", Evolve.Sql.NVarChar, wo_nbr)
            .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
            .input("EvolveProdOrders_Status", Evolve.Sql.NVarChar, "open")
            .input("EvolveProdOrders_Quantity",Evolve.Sql.Int,data.EvolveInventory_Weight)
            .input("EvolveProdOrders_CreatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
            .input("EvolveProdOrders_CreatedAt", Evolve.Sql.NVarChar, dataTime)
            .input("EvolveProdOrders_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
            .input("EvolveProdOrders_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
            .query("INSERT INTO EvolveProdOrders (EvolveProdOrders_OrderId,EvolveProdOrders_Order,EvolveItem_ID,EvolveProdOrders_Status,EvolveProdOrders_Quantity,EvolveProdOrders_CreatedUser,EvolveProdOrders_CreatedAt,EvolveProdOrders_UpdatedUser,EvolveProdOrders_UpdatedAt) VALUES(@EvolveProdOrders_OrderId,@EvolveProdOrders_Order,@EvolveItem_ID,@EvolveProdOrders_Status,@EvolveProdOrders_Quantity,@EvolveProdOrders_CreatedUser,@EvolveProdOrders_CreatedAt,@EvolveProdOrders_UpdatedUser,@EvolveProdOrders_UpdatedAt);select @@IDENTITY AS 'inserted_id'");    
            if (wo_ins instanceof Error || wo_ins.rowsAffected < 1) {
                Evolve.Log.Error(" EERR1859:  Error In insert EvolveProd Orders ", wo_ins);
                return new Error(" EERR1859:  Error In insert EvolveProd Orders ");
            } else {
                return wo_ins;
            }
        } catch (error) {
            Evolve.Log.error(" EERR1860: Error while creating Production Orders "+error.message);
            return new Error(" EERR1860: Error while creating Production Orders "+error.message);
        }
    },

    saveInventoryAndHistory: async function (data) {
        try {
            let EvolveItem = await Evolve.SqlPool.request()
            .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
            .query("select EvolveUom_ID from EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID");
            
            if (EvolveItem instanceof Error || EvolveItem.rowsAffected < 1) {
            return new Error("Error In Item Id");
            } else {
            let date = new Date();
            let dataTime = date.getFullYear() +"-" +(date.getMonth() + 1) +"-" +date.getDate() +" " +date.getHours() +":" +date.getMinutes() +":"+date.getSeconds();

            let saveInventory_inv = await Evolve.SqlPool.request()
                .input("EvolveCompany_ID", Evolve.Sql.Int, data.EvolveCompany_ID)
                .input("EvolveUnit_ID", Evolve.Sql.Int, data.EvolveUnit_ID)
                .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
                .input("EvolveLocation_ID", Evolve.Sql.Int, data.EvolveLocation_ID)
                .input("EvolveInventory_QtyOnHand", Evolve.Sql.Int, data.EvolveInventory_Weight)
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                .input("EvolveInventory_CreatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvolveInventory_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvolveInventory_RefNumber", Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
                .input("EvolveInventoryStatus_ID", Evolve.Sql.Int, data.EvolveInventoryStatus_ID)
                .input("EvolveInventory_LotNotes", Evolve.Sql.NVarChar,data.EvolveInventory_LotNotes)
                .query("INSERT INTO EvolveInventory(EvolveCompany_ID,EvolveUnit_ID,EvolveItem_ID,EvolveLocation_ID,EvolveInventory_QtyOnHand,EvolveInventory_LotNumber,EvolveInventory_CreatedAt,EvolveInventory_CreatedUser,EvolveInventoryStatus_ID,EvolveInventory_LotNotes,EvolveInventory_RefNumber) VALUES(@EvolveCompany_ID,@EvolveUnit_ID,@EvolveItem_ID,@EvolveLocation_ID,@EvolveInventory_QtyOnHand,@EvolveInventory_LotNumber,@EvolveInventory_CreatedAt,@EvolveInventory_CreatedUser,@EvolveInventoryStatus_ID,@EvolveInventory_LotNotes,@EvolveInventory_RefNumber)select @@IDENTITY AS 'inserted_id'"
                );

            if (
                saveInventory_inv instanceof Error ||
                saveInventory_inv.rowsAffected < 1
            ) {
                Evolve.Log.Error(" EERR1861: Error saveInventory ", saveInventory_inv);
                return new Error(" EERR1861: Error saveInventory ");
            } else {
                let inventory_id = saveInventory_inv.recordset[0].inserted_id;
                let history_Data = {
                EvolveCompany_ID: data.EvolveUnit_ID,
                EvolveUnit_ID: data.EvolveUnit_ID,
                EvolveApplication_ID: 4,
                EvolveTranstype_code: "prodBooking",
                EvolveTransitionHistory_DocumentID: inventory_id,
                EvolveTransitionHistory_DocumentDetailID: inventory_id,
                EvolveLocation_ID: null,
                EvolveItem_ID: parseInt(data.EvolveItem_ID),
                EvolveUOM_ID: null,
                EvolveInventoryStatus_ID: null,
                EvolveTransitionHistory_AddressID: null,
                EvolveInventory_ID: inventory_id,
                EvolveTransitionHistory_Quantity: parseInt(data.EvolveInventory_Weight),
                EvolveTransitionHistory_Shiptype: null,
                EvolveTransitionHistory_SequenceId: null,
                EvolveTransitionHistory_UserID: data.EvolveUser_ID,
                EvolveMachine_ID: null,
                EvolveReason_ID: null,
                EvolveTool_ID: null,
                EvolveActivity_ID: null,
                EvolveTransitionHistory_Description: null
                };

                let EvolveTranstionHistoryResult = Evolve.App.Controllers.Unit.unitControllers.addTranstionHistory( history_Data);
                if (EvolveTranstionHistoryResult instanceof Error || EvolveTranstionHistoryResult.rowsAffected < 1)
                {
                    Evolve.Log.Error(" EERR1862: Error EvolveTranstionHistoryResult ",EvolveTranstionHistoryResult);
                    return new Error(" EERR1862: Error EvolveTranstionHistoryResult ");
                } else {
                return await Evolve.SqlPool.request()
                    .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
                    .input("EvolveProdOrdersDetail_Qty",Evolve.Sql.Int, parseInt(data.EvolveInventory_Weight))
                    .input("EvolveProdOrdersDetail_Status",Evolve.Sql.NVarChar,"completed")
                    .input("EvolveProdOrdersDetail_CreatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
                    .input("EvolveProdOrdersDetail_LotNotes",Evolve.Sql.NVarChar,data.EvolveInventory_LotNotes)
                    .input("EvolveProdOrdersDetail_LotNumber",Evolve.Sql.NVarChar,data.EvolveInventory_LotNumber)
                    .input("EvolveProdOrdersDetail_CreatedAt",Evolve.Sql.NVarChar,dataTime)
                    .input("EvolveProdOrdersDetail_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
                    .input("EvolveProdOrdersDetail_UpdatedAt",Evolve.Sql.NVarChar,dataTime)
                    .input("EvolveUom_ID",Evolve.Sql.Int,EvolveItem.recordset[0].EvolveUom_ID)
                    .input("EvolveLocation_ID",Evolve.Sql.Int,data.EvolveLocation_ID)
                    .input("EvolveProdOrdersDetail_RefNumber",Evolve.Sql.NVarChar,data.EvolveInventory_RefNumber)
                    .input("EvolveInventory_ID", Evolve.Sql.INT, inventory_id)
                    .query("INSERT INTO EvolveProdOrdersDetail (EvolveProdOrders_ID,EvolveProdOrdersDetail_Qty,EvolveProdOrdersDetail_Status,EvolveProdOrdersDetail_CreatedUser,EvolveProdOrdersDetail_LotNotes,EvolveProdOrdersDetail_LotNumber,EvolveProdOrdersDetail_CreatedAt,EvolveProdOrdersDetail_UpdatedUser,EvolveProdOrdersDetail_UpdatedAt,EvolveUom_ID,EvolveLocation_ID,EvolveProdOrdersDetail_RefNumber,EvolveInventory_ID) VALUES (@EvolveProdOrders_ID,@EvolveProdOrdersDetail_Qty,@EvolveProdOrdersDetail_Status,@EvolveProdOrdersDetail_CreatedUser,@EvolveProdOrdersDetail_LotNotes,@EvolveProdOrdersDetail_LotNumber,@EvolveProdOrdersDetail_CreatedAt,@EvolveProdOrdersDetail_UpdatedUser,@EvolveProdOrdersDetail_UpdatedAt,@EvolveUom_ID,@EvolveLocation_ID,@EvolveProdOrdersDetail_RefNumber,@EvolveInventory_ID);select @@IDENTITY AS 'inserted_id'");
                }
            }
            }
        } catch (error) {
            Evolve.Log.error(" EERR1863: Error while saving Inventory And History "+error.message);
            return new Error(" EERR1863: Error while saving Inventory And History "+error.message);
        }
    },

    getProductionBookingList: async function (data) {
        try {
          return await Evolve.SqlPool.request()
            .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
            .query("SELECT epd.*  , el.EvolveLocation_Code FROM EvolveProdOrdersDetail epd , EvolveLocation el   WHERE epd.EvolveProdOrders_ID = @EvolveProdOrders_ID AND EvolveProdOrdersDetail_Status = 'Completed' AND epd.EvolveLocation_ID = el.EvolveLocation_ID ORDER BY epd.EvolveProdOrdersDetail_ID DESC");
        } catch (error) {
          Evolve.Log.error(" EERR1864: Error while getting Production Booking List "+error.message);
          return new Error(" EERR1864: Error while getting Production Booking List  "+error.message);
        }
    },

    moveMachine: async function (data) {
        try {
            let dateTime = new Date();
            let dataTime = dateTime.getFullYear()+"-" +(dateTime.getMonth() + 1) +"-" +dateTime.getDate()+" "+dateTime.getHours() +":"+dateTime.getMinutes()+":" +dateTime.getSeconds();
            //console.log(data);
            let EvolveTransType = await Evolve.SqlPool.request()
            .query("SELECT EvolveTranstype_ID FROM EvolveTranstype WHERE EvolveTranstype_code = 'Move_Machine'");
            let history_Data = {
            EvolveCompany_ID: data.EvolveUnit_ID,
            EvolveUnit_ID: data.EvolveUnit_ID,
            EvolveApplication_ID: 4,
            EvolveTranstype_code: "Move_Machine",
            EvolveTransitionHistory_DocumentID: null,
            EvolveTransitionHistory_DocumentDetailID: null,
            EvolveLocation_ID: null,
            EvolveItem_ID: data.EvolveItem_ID,
            EvolveUOM_ID: null,
            EvolveInventoryStatus_ID: null,
            EvolveTransitionHistory_AddressID: null,
            EvolveInventory_ID: null,
            EvolveTransitionHistory_Quantity: null,
            EvolveTransitionHistory_Shiptype: null,
            EvolveTransitionHistory_SequenceId: null,
            EvolveTransitionHistory_UserID: data.EvolveUser_ID,
            EvolveMachine_ID: data.EvolveMachine_ID,
            EvolveReason_ID: data.EvolveReason_ID,
            EvolveTool_ID: null,
            EvolveActivity_ID: null,
            EvolveTransitionHistory_Description: null
            };
            let EvolveTranstionHistoryResult = Evolve.App.Controllers.Unit.unitControllers.addTranstionHistory( history_Data);

            if (EvolveTranstionHistoryResult instanceof Error || EvolveTranstionHistoryResult.rowsAffected < 1)
            {
                Evolve.Log.Error(" EERR1865: Error EvolveTranstionHistoryResult ",EvolveTranstionHistoryResult);
                return new Error(" EERR1865: Error EvolveTranstionHistoryResult ");
            } else {
                return EvolveTranstionHistoryResult;
            }
        } catch (error) {
            Evolve.Log.error(" EERR1866: Error while moving Machine "+error.message);
            return new Error(" EERR1866: Error while moving Machine "+error.message);
        }
    },
    
    updateProdMachine: async function (data) {
        let dateTime = new Date();
        let dataTime = dateTime.getFullYear()+"-" +(dateTime.getMonth() + 1) +"-" +dateTime.getDate()+" "+dateTime.getHours() +":"+dateTime.getMinutes()+":" +dateTime.getSeconds();
        return Evolve.SqlPool.request()
            .input("EvolveProdOrders_ID",Evolve.Sql.Int,data.EvolveProdOrders_ID)
            .input("EvolveMachine_ID",Evolve.Sql.Int,data.EvolveMachine_ID)
            .input("EvolveProdOrders_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
            .input("EvolveProdOrders_UpdatedAt",Evolve.Sql.NVarChar,dataTime)
            .query("UPDATE EvolveProdOrders SET EvolveMachine_ID = @EvolveMachine_ID , EvolveProdOrders_UpdatedUser = @EvolveProdOrders_UpdatedUser , EvolveProdOrders_UpdatedAt = @EvolveProdOrders_UpdatedAt WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID ");
    },

    getWorkOrderList: async function (data) {
        try {
          return await Evolve.SqlPool.request()
              .input("EvolveMachine_ID",Evolve.Sql.Int,data.machineId)  
              .query("SELECT epo.EvolveProdOrders_ID , epo.EvolveProdOrders_Order , ei.EvolveItem_Code FROM EvolveProdOrders epo , EvolveItem ei WHERE epo.Evolveprodorders_status ='open' AND ei.EvolveItem_ID = epo.EvolveItem_ID AND EvolveMachine_ID = @EvolveMachine_ID");
        } catch (error) {
          Evolve.Log.error(" EERR1867:  Error while getting Work Order List "+error.message);
          return new Error(" EERR1867:  Error while getting Work Order List "+error.message);
        }
      },
    

}