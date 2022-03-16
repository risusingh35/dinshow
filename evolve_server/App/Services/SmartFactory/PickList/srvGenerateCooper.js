'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    generatePickList: async function (data) {
        try {
            let dateTime = new Date();
            let dataTime = dateTime.getFullYear()+'-'+(dateTime.getMonth()+1)+'-'+dateTime.getDate()+' '+dateTime.getHours()+':'+dateTime.getMinutes()+':'+dateTime.getSeconds();

            let EvolveProdOrders = await Evolve.SqlPool.request()
                .input('EvolveProdOrders_ID', Evolve.Sql.Int, data.EvolveProdOrders_ID)
                .query("SELECT * From EvolveProdOrders WHERE EvolveProdOrders_ID =@EvolveProdOrders_ID")
            if (EvolveProdOrders.rowsAffected < 1) {
                return new Error('Error In Production Orders');
            }else{ 

                let plln = await Evolve.SqlPool.request()
                .query("SELECT TOP 1 EvolvePickList_Number From EvolvePickList ORDER BY EvolvePickList_ID DESC");
                let last_pln = 'PL0001';
                if (plln.rowsAffected > 0) {
                    last_pln = plln.recordset[0].EvolvePickList_Number 
                }
                let pad = "0000";
                let pl_new = parseInt(last_pln.substr(-4)) + 1 //0002 => 2
                let tmp = "" + pl_new
                let plcount = pad.substring(0, pad.length - tmp.length) + tmp;

                var dateObj = new Date();
                var month = dateObj.getUTCMonth() + 1; //months from 1-12
                var day = dateObj.getUTCDate();
                var year = dateObj.getUTCFullYear().toString().substr(-2)
                if (month == 10) {
                    month = 'X';
                } else if (month == 11) {
                    month = 'Y';
                } else if (month == 12) {
                    month = 'Z';
                }
                let newdate = day + "" + month + "" + year; //28219 
                let EvolvePickList_Number = "PL"+ newdate +""+ plcount;

                let child_items = await Evolve.SqlPool.request()
				.input('EvolveItem_ID', Evolve.Sql.Int, EvolveProdOrders.recordset[0].EvolveItem_ID)
				.input('EvolveProdOrders_ID', Evolve.Sql.Int, EvolveProdOrders.recordset[0].EvolveProdOrders_ID)
                .query("select pbom.EvolveProductionOrderBom_CompItem_ID from EvolveProductionOrderBom pbom where pbom.EvolveProductionOrderBom_ParentItem_ID = @EvolveItem_ID and EvolveProdOrders_ID = @EvolveProdOrders_ID");

                if(child_items instanceof Error || child_items.rowsAffected < 1){
					return new Error(child_items.message);
				}else{
                    for(let i=0; i< child_items.recordsets[0].length; i++){
                        let issue_qty = 0;
                        let InvTrac = await Evolve.SqlPool.request()
                            .input('EvolveItem_ID', Evolve.Sql.Int, child_items.recordsets[0][i].EvolveProductionOrderBom_CompItem_ID)
                            .query('SELECT EvolveItem_InventoryTrackable  FROM EvolveItem  WHERE EvolveItem_ID = @EvolveItem_ID');
                        
                        if(InvTrac.recordset[0].EvolveItem_InventoryTrackable != true){
                            issue_qty = EvolveProdOrders.recordset[0].EvolveProdOrders_Quantity
                        } 
                        await Evolve.SqlPool.request()
                        .input('EvolveSection_ID', Evolve.Sql.Int, EvolveProdOrders.recordset[0].EvolveSection_ID)
                        .input('EvolveMachine_ID', Evolve.Sql.Int, EvolveProdOrders.recordset[0].EvolveMachine_ID)
                        .input('EvolveProdOrders_ID', Evolve.Sql.Int, data.EvolveProdOrders_ID)
                        .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                        .input('EvolveItem_ID', Evolve.Sql.Int, child_items.recordsets[0][i].EvolveProductionOrderBom_CompItem_ID)
                        .input('EvolvePickList_QtyIss', Evolve.Sql.Int, issue_qty)
                        .input('EvolvePickList_QtyReq', Evolve.Sql.Int, EvolveProdOrders.recordset[0].EvolveProdOrders_Quantity)
                        .input('EvolvePickList_Status', Evolve.Sql.Int, 1)
                        .input('EvolvePickList_Number', Evolve.Sql.NVarChar, EvolvePickList_Number)
                        .input('EvolvePickList_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                        .input('EvolvePickList_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                        .input('EvolvePickList_UpdateAt', Evolve.Sql.NVarChar, dataTime)
                        .input('EvolvePickList_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
                        .query('INSERT INTO EvolvePickList (EvolveSection_ID,EvolveMachine_ID,EvolveProdOrders_ID,EvolveUser_ID,EvolveItem_ID,EvolvePickList_QtyIss,EvolvePickList_QtyReq,EvolvePickList_Status,EvolvePickList_Number,EvolvePickList_CreatedAt,EvolvePickList_CreatedUser,EvolvePickList_UpdateAt,EvolvePickList_UpdateUser) VALUES (@EvolveSection_ID,@EvolveMachine_ID,@EvolveProdOrders_ID,@EvolveUser_ID,@EvolveItem_ID,@EvolvePickList_QtyIss,@EvolvePickList_QtyReq,@EvolvePickList_Status,@EvolvePickList_Number,@EvolvePickList_CreatedAt,@EvolvePickList_CreatedUser,@EvolvePickList_UpdateAt,@EvolvePickList_UpdateUser);');
                    }
                    return child_items;
                }

        }

        } catch (error) {
            Evolve.Log.error(" EERR1729: Error while getting Pick List Details "+error.message);
            return new Error(" EERR1729: Error while getting Pick List Details "+error.message);
        }
    },

    getWorkOrderList: async function () {
        try {
            return await Evolve.SqlPool.request()
         
            // .query("SELECT epo.EvolveProdOrders_ID,epo.EvolveProdOrders_Order from EvolveProdOrders epo, EvolveProdPlan epp WHERE epo.Evolveprodorders_status ='open' AND epp.EvolveProdPlan_ID = epo.EvolveProdPlan_ID AND epp.EvolveSection_ID = @workCenterId  AND CAST(epo.EvolveProdOrders_CreatedAt as date) >= FORMAT(getdate(), 'yyyy-MM-dd')") 

            .query("SELECT * FROM EvolveProdOrders ") 


        } catch (error) {
            Evolve.Log.error(" EERR1730: Error while getting Work Order List "+error.message);
            return new Error(" EERR1730: Error while getting Work Order List "+error.message);
        }
    },

    getMachineList: async function () {
        try {
            return await Evolve.SqlPool.request()
        
            .query('SELECT * FROM  EvolveMachine ');
        } catch (error) {
            Evolve.Log.error(" EERR1731: Error while getting Machine List "+error.message);
            return new Error(" EERR1731: Error while getting Machine List "+error.message);
        }
    },

    
    getWorkCenterList: async function () {
        try {
            return await Evolve.SqlPool.request()
            .query('SELECT EvolveSection_ID,EvolveSection_Name  FROM EvolveSection')
        } catch (error) {
            Evolve.Log.error(" EERR1732: Error while getting Work Center List "+error.message);
            return new Error(" EERR1732: Error while getting Work Center List "+error.message);
        }
    },
    getPickListByWorkOrderCountList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveSection_ID', Evolve.Sql.Int, data.EvolveSection_ID)
            .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
            .input('EvolveProdOrders_ID', Evolve.Sql.Int, data.EvolveProdOrders_ID)
            .query("SELECT epl.EvolvePickList_ID,ei.EvolveItem_Code, epl.EvolvePickList_QtyReq, epl.EvolvePickList_QtyIss,epl.EvolvePickList_Number  FROM EvolvePickList epl, EvolveItem ei WHERE epl.EvolveSection_ID =@EvolveSection_ID AND epl.EvolveMachine_ID =@EvolveMachine_ID AND epl.EvolveProdOrders_ID =@EvolveProdOrders_ID AND ei.EvolveItem_ID = epl.EvolveItem_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1733: Error while getting Pick List By Work Order Count List "+error.message);
            return new Error(" EERR1733: Error while getting Pick List By Work Order Count List "+error.message);
        }
    },
    getPickListByWorkOrderDatatableList: async function (start,length,data) {
        try {
           return await Evolve.SqlPool.request()
                    .input('start', Evolve.Sql.Int, start)
                    .input('length', Evolve.Sql.Int, length)
                    .input('EvolveSection_ID', Evolve.Sql.Int, data.EvolveSection_ID)
                    .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
                    .input('EvolveProdOrders_ID', Evolve.Sql.Int, data.EvolveProdOrders_ID)
                    .query("SELECT epl.EvolvePickList_ID,ei.EvolveItem_Code, epl.EvolvePickList_QtyReq, epl.EvolvePickList_QtyIss,epl.EvolvePickList_Number  FROM EvolvePickList epl, EvolveItem ei WHERE epl.EvolveSection_ID =@EvolveSection_ID AND epl.EvolveMachine_ID =@EvolveMachine_ID AND epl.EvolveProdOrders_ID =@EvolveProdOrders_ID AND ei.EvolveItem_ID = epl.EvolveItem_ID order by epl.EvolvePickList_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
            } catch (error) {
                Evolve.Log.error(" EERR1734: Error while getting Pick List By Work Order Datatable List "+error.message);
                return new Error(" EERR1734: Error while getting Pick List By Work Order Datatable List "+error.message);
            }
    },
    
    getPickListByWorkOrderCountList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveSection_ID', Evolve.Sql.Int, data.EvolveSection_ID)
            .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
            .input('EvolveProdOrders_ID', Evolve.Sql.Int, data.EvolveProdOrders_ID)
            .query("SELECT epl.EvolvePickList_ID,ei.EvolveItem_Code, epl.EvolvePickList_QtyReq, epl.EvolvePickList_QtyIss,epl.EvolvePickList_Number  FROM EvolvePickList epl, EvolveItem ei WHERE epl.EvolveSection_ID =@EvolveSection_ID AND epl.EvolveMachine_ID =@EvolveMachine_ID AND epl.EvolveProdOrders_ID =@EvolveProdOrders_ID AND ei.EvolveItem_ID = epl.EvolveItem_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1735: Error while getting Pick List By Work Order Count List "+error.message);
            return new Error(" EERR1735: Error while getting Pick List By Work Order Count List "+error.message);
        }
    },

    getShiftList: async function () {
        try {
              return await Evolve.SqlPool.request()
                .query( "SELECT * FROM EvolveShift");
        } catch (error) {
          Evolve.Log.error(" EERR1736: Error while getting Shift List "+error.message);
          return new Error(" EERR1736: Error while getting Shift List "+error.message);
        }
      },

      getMachineListBySectionId: async function (workCenterId) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveSection_ID', Evolve.Sql.Int, workCenterId)
            .query('SELECT em.EvolveMachine_ID , em.EvolveMachine_Name FROM  EvolveMachine em WHERE em.EvolveSection_ID = @EvolveSection_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1737: Error while getting Machine List By Section Id "+error.message);
            return new Error(" EERR1737: Error while getting Machine List By Section Id "+error.message);
        }
    },
    getWorkOrdersByMachineId: async function (machineId) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveMachine_ID', Evolve.Sql.Int, machineId)
            .query('SELECT *   FROM  EvolveProdOrders  WHERE  EvolveMachine_ID = @EvolveMachine_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1738: Error while getting Work Orders By Machine Id "+error.message);
            return new Error(" EERR1738: Error while getting Work Orders By Machine Id "+error.message);
        }
    },
    getWoDetails: async function (condition) {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT epo.EvolveProdOrders_ID  ,epo.EvolveProdOrders_OrderId , epo.EvolveProdOrders_Quantity ,epo.EvolveProdOrders_Order  ,  convert(varchar, epo.EvolveProdOrders_CreatedAt, 22)  as EvolveProdOrders_CreatedAt , ei.EvolveItem_ID ,ei.EvolveItem_Code ,ei.EvolveItem_Desc , em.EvolveMachine_ID , em.EvolveMachine_Name  FROM EvolveProdOrders epo , EvolveItem ei , EvolveMachine em  WHERE  ei.EvolveItem_ID = epo.EvolveItem_ID AND em.EvolveMachine_ID = epo.EvolveMachine_ID "+condition);
        } catch (error) {
            Evolve.Log.error(" EERR1739: Error while getting Wo Details "+error.message);
            return new Error(" EERR1739: Error while getting Wo Details "+error.message);
        }
    },

    getChildItems: async function (EvolveProdOrders_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveProdOrders_ID', Evolve.Sql.Int, EvolveProdOrders_ID)
            .query('SELECT epl.EvolvePickList_ID , ei.EvolveItem_ID ,ei.EvolveItem_Code , ei.EvolveItem_Desc , epl.EvolvePickList_QtyReq , epl.EvolvePickList_QtyIss FROM EvolvePickList epl , EvolveProdOrderBom epob , EvolveItem ei WHERE epl.EvolveProdOrders_ID = epob.EvolveProdOrders_ID AND epl.EvolveItem_ID = epob.EvolveProdOrderBom_CompItem_ID AND ei.EvolveItem_id = epob.EvolveProdOrderBom_CompItem_ID AND epl.EvolveProdOrders_ID = @EvolveProdOrders_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1740: Error while getting Child Items "+error.message);
            return new Error(" EERR1740: Error while getting Child Items "+error.message);
        }
    },

    availableToPick: async function (EvolveItem_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveItem_ID', Evolve.Sql.Int, EvolveItem_ID)
            .query('SELECT ei.EvolveInventory_RefNumber , ei.EvolveInventory_QtyOnHand , ei.EvolveLocation_ID , el.EvolveLocation_Code        FROM EvolveInventory ei , EvolveLocation el , EvolvePickListDetail epld WHERE ei.EvolveItem_ID = @EvolveItem_ID AND el.EvolveLocation_ID = ei.EvolveLocation_ID AND epld.EvolvePickListDetail_Barcode != ei.EvolveInventory_RefNumber');
        } catch (error) {
            Evolve.Log.error(" EERR1741: Error while available To Pick "+error.message);
            return new Error(" EERR1741: Error while available To Pick "+error.message);
        }
    },

    alreadyPicked : async function (EvolveItem_ID,EvolvePickList_ID) 
    {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveItem_ID', Evolve.Sql.Int, EvolveItem_ID)
            .input('EvolvePickList_ID', Evolve.Sql.Int, EvolvePickList_ID)
            .query('SELECT ei.EvolveInventory_RefNumber , ei.EvolveInventory_QtyOnHand , ei.EvolveLocation_ID , el.EvolveLocation_Code        FROM EvolveInventory ei , EvolveLocation el , EvolvePickListDetail epld WHERE ei.EvolveItem_ID = @EvolveItem_ID AND el.EvolveLocation_ID = ei.EvolveLocation_ID AND epld.EvolvePickListDetail_Barcode LIKE ei.EvolveInventory_RefNumber AND epld.EvolvePickList_ID = @EvolvePickList_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1742: Error while already Picked "+error.message);
            return new Error(" EERR1742: Error while already Picked "+error.message);
        }
    },

    getPickListDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
            .input('EvolveProdOrders_ID', Evolve.Sql.Int, data.EvolveProdOrders_ID)
            .query("SELECT * , ei.EvolveItem_Code  FROM  EvolvePickList  epl  , EvolveItem ei  WHERE epl.EvolveItem_ID = ei.EvolveItem_ID AND EvolveProdOrders_ID =@EvolveProdOrders_ID  AND   epl.EvolveItem_ID = @EvolveItem_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1743: Error while getting Pick List Details "+error.message);
            return new Error(" EERR1743: Error while getting Pick List Details "+error.message);
        }
    },
    





}