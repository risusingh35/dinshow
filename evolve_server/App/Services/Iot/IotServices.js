'use strict';
const Evolve = require('../../../Boot/Evolve');
module.exports = {

    getIotSidebarMenuList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveMenu_AppId', Evolve.Sql.Int, 5)
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('SELECT em.EvolveMenu_Name,em.EvolveMenu_Id,em.EvolveMenu_Icon,em.EvolveMenu_Url FROM EvolveMenu em, EvolveRoleToMenu erm , EvolveUserRoleLink eurl, EvolveRole er WHERE eurl.EvolveUser_ID =@EvolveUser_ID AND eurl.EvolveRole_ID = er.EvolveRole_ID AND erm.EvolveRole_ID = eurl.EvolveRole_ID AND erm.EvolveMenu_ID = em.EvolveMenu_ID AND em.EvolveMenu_IsActive = 1 AND em.EvolveMenu_AppId =@EvolveMenu_AppId AND erm.EvolveApp_ID =@EvolveMenu_AppId ORDER BY em.EvolveMenu_Index');
        } catch (error) {

            Evolve.Log.error(" EERR1598: Error while getting  Iot Sidebar Menu List "+error.message);
            return new Error(" EERR1598: Error while getting  Iot Sidebar Menu List "+error.message);
        }
    },
    getDeviceType: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveDeviceType_ID, EvolveDevice_Name FROM EvolveDeviceType");
        } catch (error) {

            Evolve.Log.error(" EERR1599: Error while getting Device Type "+error.message);
            return new Error(" EERR1599: Error while getting Device Type "+error.message);
        }
    },
    deviceLocations: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveLocation");
        } catch (error) {

            Evolve.Log.error(" EERR1600: Error while getting device Locations "+error.message);
            return new Error(" EERR1600: Error while getting device Locations "+error.message);
        }
    },
    getDeviceLocations: async function (EvolveLocation_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveLocation_ID', Evolve.Sql.Int, EvolveLocation_ID)
                .query("SELECT * FROM EvolveLocation WHERE EvolveLocation_ID =@EvolveLocation_ID");
        } catch (error) {

            Evolve.Log.error(" EERR1601: Error while in Device Locations "+error.message);
            return new Error(" EERR1601: Error while in Device Locations "+error.message);
        }
    },
    getDeviceData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT ed.*, edt.EvolveDevice_Name as deviceType, ei.EvolveLocation_Code FROM EvolveDevice ed JOIN EvolveDeviceType edt ON ed.EvolveDeviceType_ID = edt.EvolveDeviceType_ID INNER JOIN EvolveLocation ei ON ed.EvolveLocation_ID = ei.EvolveLocation_ID      order by ed.EvolveDevice_ID desc");
        } catch (error) {

            Evolve.Log.error(" EERR1602: Error while getting Device Data "+error.message);
            return new Error(" EERR1602: Error while getting Device Data "+error.message);
        }
    },
    addDevice: async function (data) {
        console.log("addDevice>>>>", data);
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDevice_Name', Evolve.Sql.NVarChar, data.EvolveDevice_Name)
                .input('EvolveDeviceType_ID', Evolve.Sql.Int, data.EvolveDeviceType_ID)
                .input('EvolveDevice_Code', Evolve.Sql.NVarChar, data.EvolveDevice_Code)
                .input('EvolveDevice_String', Evolve.Sql.NVarChar, data.EvolveDevice_String)
                .input('EvolveDevice_MqttIP', Evolve.Sql.NVarChar, data.EvolveDevice_MqttIP)
                .input('EvolveDevice_Port', Evolve.Sql.NVarChar, data.EvolveDevice_Port)
                .input('EvolveDevice_Subscriber', Evolve.Sql.NVarChar, data.EvolveDevice_Subscriber)
                .input('EvolveDevice_API', Evolve.Sql.NVarChar, data.EvolveDevice_API)
                .input('EvolveDevice_Status', Evolve.Sql.NVarChar, data.EvolveDevice_Status)
                .input('EvolveDevice_SendOption', Evolve.Sql.NVarChar, data.EvolveDevice_SendOption)
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
                .input('EvolveDevice_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveDevice_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveDevice_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveDevice_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query("INSERT INTO EvolveDevice (EvolveDevice_Name, EvolveDeviceType_ID, EvolveDevice_Code, EvolveDevice_String, EvolveDevice_MqttIP, EvolveDevice_Port, EvolveDevice_Subscriber, EvolveDevice_API, EvolveDevice_CreatedUser, EvolveDevice_CreatedAt, EvolveDevice_UpdatedUser, EvolveDevice_UpdatedAt, EvolveDevice_Status, EvolveDevice_SendOption,EvolveLocation_ID) VALUES (@EvolveDevice_Name, @EvolveDeviceType_ID, @EvolveDevice_Code, @EvolveDevice_String, @EvolveDevice_MqttIP, @EvolveDevice_Port, @EvolveDevice_Subscriber, @EvolveDevice_API, @EvolveDevice_CreatedUser, @EvolveDevice_CreatedAt, @EvolveDevice_UpdatedUser, @EvolveDevice_UpdatedAt, @EvolveDevice_Status, @EvolveDevice_SendOption,@EvolveLocation_ID)");
        } catch (error) {

            Evolve.Log.error(" EERR1603: Error while adding Device "+error.message);
            return new Error(" EERR1603: Error while adding Device "+error.message);
        }
    },

    getSingleDeviceData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDevice_ID', Evolve.Sql.Int, data.EvolveDevice_ID)
                .query("SELECT * FROM EvolveDevice WHERE EvolveDevice_ID = @EvolveDevice_ID");
        } catch (error) {

            Evolve.Log.error(" EERR1604: Error while getting Single Device Data "+error.message);
            return new Error(" EERR1604: Error while getting Single Device Data "+error.message);
        }
    },
    updateDevice: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDevice_ID', Evolve.Sql.Int, data.EvolveDevice_ID)
                .input('EvolveDevice_Name', Evolve.Sql.NVarChar, data.EvolveDevice_Name)
                .input('EvolveDeviceType_ID', Evolve.Sql.Int, data.EvolveDeviceType_ID)
                .input('EvolveDevice_Code', Evolve.Sql.NVarChar, data.EvolveDevice_Code)
                .input('EvolveDevice_String', Evolve.Sql.NVarChar, data.EvolveDevice_String)
                .input('EvolveDevice_MqttIP', Evolve.Sql.NVarChar, data.EvolveDevice_MqttIP)
                .input('EvolveDevice_Port', Evolve.Sql.NVarChar, data.EvolveDevice_Port)
                .input('EvolveDevice_Subscriber', Evolve.Sql.NVarChar, data.EvolveDevice_Subscriber)
                .input('EvolveDevice_API', Evolve.Sql.NVarChar, data.EvolveDevice_API)
                .input('EvolveDevice_Status', Evolve.Sql.NVarChar, data.EvolveDevice_Status)
                .input('EvolveDevice_SendOption', Evolve.Sql.NVarChar, data.EvolveDevice_SendOption)
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
                .input('EvolveDevice_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveDevice_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query("UPDATE EvolveDevice SET EvolveDevice_Name = @EvolveDevice_Name, EvolveDeviceType_ID = @EvolveDeviceType_ID, EvolveDevice_Code = @EvolveDevice_Code, EvolveDevice_String = @EvolveDevice_String, EvolveDevice_MqttIP = @EvolveDevice_MqttIP, EvolveDevice_Port = @EvolveDevice_Port, EvolveDevice_Subscriber = @EvolveDevice_Subscriber, EvolveDevice_API = @EvolveDevice_API, EvolveDevice_UpdatedUser = @EvolveDevice_UpdatedUser, EvolveDevice_UpdatedAt = @EvolveDevice_UpdatedAt, EvolveDevice_Status = @EvolveDevice_Status, EvolveDevice_SendOption = @EvolveDevice_SendOption , EvolveLocation_ID = @EvolveLocation_ID WHERE EvolveDevice_ID = @EvolveDevice_ID");
        } catch (error) {

            Evolve.Log.error(" EERR1605: Error while updating Device "+error.message);
            return new Error(" EERR1605: Error while updating Device "+error.message);
        }
    },
    deleteDevice: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDevice_ID', Evolve.Sql.Int, data.id)
                .query("DELETE FROM EvolveDevice WHERE EvolveDevice_ID = @EvolveDevice_ID");
        } catch (error) {

            Evolve.Log.error(" EERR1606: Error while deleting Device "+error.message);
            return new Error(" EERR1606: Error while deleting Device "+error.message);
        }
    },

    /** Andon System */
    getWOList: async function (machineId) {
        try {
            return await Evolve.SqlPool.request().query(
                "SELECT epo.EvolveProdOrders_ID , epo.EvolveProdOrders_OrderId , epo.EvolveProdOrders_Order , epo.EvolveProdOrders_Quantity , ei.EvolveItem_Code , epo.EvolveProdOrders_Status FROM EvolveProdOrders epo ,  EvolveItem ei  WHERE epo.EvolveItem_ID = ei.EvolveItem_ID  AND epo.EvolveProdOrders_Status = 'open'");
        } catch (error) {
            Evolve.Log.error(" EERR1607: Error while getting WO List "+error.message);
            return new Error(" EERR1607: Error while getting WO List "+error.message);
        }
    },
    getReason: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveReason_ID,EvolveReason_Name,EvolveReason_Code FROM EvolveReason");
        } catch (error) {

            Evolve.Log.error(" EERR1608: Error while getting Reason "+error.message);
            return new Error(" EERR1608: Error while getting Reason "+error.message);
        }
    },


    addBreakDown: async function (data) {
        try {
            console.log("Data :", data);
            let date = new Date();
            let startTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveBreakDownReport_Type', Evolve.Sql.NVarChar, data.EvolveBreakDownReport_Type)
                .input('EvolveBreakDownReport_Msg', Evolve.Sql.NVarChar, data.EvolveBreakDownReport_Msg)
                .input('EvolveBreakDownReport_EvolveMachine_ID', Evolve.Sql.Int, data.EvolveBreakDownReport_EvolveMachine_ID)
                .input('EvolveBreakDownReport_StartTime', Evolve.Sql.NVarChar, startTime)
                .query('INSERT INTO EvolveBreakDownReport (EvolveBreakDownReport_Type,EvolveBreakDownReport_Msg,EvolveBreakDownReport_StartTime,EvolveBreakDownReport_EvolveMachine_ID) VALUES (@EvolveBreakDownReport_Type,@EvolveBreakDownReport_Msg,@EvolveBreakDownReport_StartTime,@EvolveBreakDownReport_EvolveMachine_ID)');
        } catch (error) {

            Evolve.Log.error(" EERR1609: Error while adding BreakDown "+error.message);
            return new Error(" EERR1609: Error while adding BreakDown "+error.message);
        }
    },
    updateBreakDownACK: async function () {
        try {
            let date = new Date();
            let endTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            let lastId = await Evolve.SqlPool.request()
                .query('SELECT TOP(1) EvolveBreakDownReport_ID,EvolveBreakDownReport_StartTime FROM EvolveBreakDownReport WHERE EvolveBreakDownReport_EndTime IS NULL  ORDER BY EvolveBreakDownReport_ID DESC');
            return await Evolve.SqlPool.request()
                .input('EvolveBreakDownReport_ID', Evolve.Sql.Int, lastId.recordset[0].EvolveBreakDownReport_ID)
                .input('EvolveBreakDownReport_ACKTime', Evolve.Sql.NVarChar, endTime)
                .query('UPDATE EvolveBreakDownReport SET EvolveBreakDownReport_ACKTime = @EvolveBreakDownReport_ACKTime WHERE EvolveBreakDownReport_ID = @EvolveBreakDownReport_ID');
        } catch (error) {

            Evolve.Log.error(" EERR1610: Error while updating Break Down ACK "+error.message);
            return new Error(" EERR1610: Error while updating Break Down ACK "+error.message);
        }
    },

    updateBreakDown: async function () {
        try {
            let date = new Date();
            let endTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            let lastId = await Evolve.SqlPool.request()
                .query('SELECT TOP(1) EvolveBreakDownReport_ID,EvolveBreakDownReport_StartTime FROM EvolveBreakDownReport WHERE EvolveBreakDownReport_EndTime IS NULL  ORDER BY EvolveBreakDownReport_ID DESC');
            console.log("Last ID :", lastId.recordset[0].EvolveBreakDownReport_ID);
            let d1 = new Date(lastId.recordset[0].EvolveBreakDownReport_StartTime);
            let date1 = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds());
            let date2 = new Date(date);
            let res = Math.abs(date2.getTime() - date1.getTime()) / 1000;
            let minutes = Math.floor(res / 60);
            if (minutes < 1) {
                minutes = 1;
            }

            minutes = '0.0' + minutes;
            console.log("Seocnd :: ", res)
            // get seconds
            console.log("minutes :: ", minutes)

            return await Evolve.SqlPool.request()
                .input('EvolveBreakDownReport_ID', Evolve.Sql.Int, lastId.recordset[0].EvolveBreakDownReport_ID)
                .input('EvolveBreakDownReport_EndTime', Evolve.Sql.NVarChar, endTime)
                .input('EvolveBreakDownReport_Duration', Evolve.Sql.NVarChar, minutes)
                .query('UPDATE EvolveBreakDownReport SET EvolveBreakDownReport_EndTime = @EvolveBreakDownReport_EndTime, EvolveBreakDownReport_Duration =@EvolveBreakDownReport_Duration WHERE EvolveBreakDownReport_ID = @EvolveBreakDownReport_ID');
        } catch (error) {

            Evolve.Log.error(" EERR1611: Error while updating BreakDown "+error.message);
            return new Error(" EERR1611: Error while updating BreakDown "+error.message);
        }
    },


    productionBooking: async function (data) {
        try {
            let EvolveItem = await Evolve.SqlPool.request()
                .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
                .query("SELECT EvolveUom_ID from EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID");
            if (EvolveItem instanceof Error || EvolveItem.rowsAffected < 1) {
                return new Error(" Error In Item Id ");
            } else {
                let date = new Date();
                let dataTime =
                    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() +
                    ":" + date.getMinutes() + ":" + date.getSeconds();

                let saveInventory_inv = await Evolve.SqlPool.request()
                    .input("EvolveCompany_ID", Evolve.Sql.Int, data.EvolveCompany_ID)
                    .input("EvolveUnit_ID", Evolve.Sql.Int, data.EvolveUnit_ID)
                    .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
                    .input("EvolveLocation_ID", Evolve.Sql.Int, data.EvolveLocation_ID)
                    .input("EvolveInventory_QtyOnHand", Evolve.Sql.Int, data.EvolveInventory_Qty)
                    .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                    .input("EvolveInventory_CreatedAt", Evolve.Sql.NVarChar, dataTime)
                    .input("EvolveInventory_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                    .input("EvolveInventory_RefNumber", Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
                    .input("EvolveInventoryStatus_ID", Evolve.Sql.Int, data.EvolveInventoryStatus_ID)
                    .input("EvolveInventory_LotNotes", Evolve.Sql.NVarChar, data.EvolveInventory_LotNotes)
                    .query("INSERT INTO EvolveInventory(EvolveCompany_ID,EvolveUnit_ID,EvolveItem_ID,EvolveLocation_ID,EvolveInventory_QtyOnHand,EvolveInventory_LotNumber,EvolveInventory_CreatedAt,EvolveInventory_CreatedUser,EvolveInventoryStatus_ID,EvolveInventory_LotNotes,EvolveInventory_RefNumber) VALUES(@EvolveCompany_ID,@EvolveUnit_ID,@EvolveItem_ID,@EvolveLocation_ID,@EvolveInventory_QtyOnHand,@EvolveInventory_LotNumber,@EvolveInventory_CreatedAt,@EvolveInventory_CreatedUser,@EvolveInventoryStatus_ID,@EvolveInventory_LotNotes,@EvolveInventory_RefNumber)select @@IDENTITY AS 'inserted_id'"
                    );

                if (
                    saveInventory_inv instanceof Error ||
                    saveInventory_inv.rowsAffected < 1
                ) {
                    Evolve.Log.Error(" EERR1612: Error saveInventory ", saveInventory_inv);
                    return new Error(" EERR1612: Error saveInventory ");
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
                    let EvolveTranstionHistoryResult = Evolve.App.Controllers.Unit.unitControllers.addTranstionHistory(
                        history_Data
                    );

                    if (EvolveTranstionHistoryResult instanceof Error || EvolveTranstionHistoryResult.rowsAffected < 1) {
                        Evolve.Log.Error(" EERR1613: Error EvolveTranstionHistoryResult ", EvolveTranstionHistoryResult);
                        return new Error(" EERR1613: Error EvolveTranstionHistoryResult ");
                    } else {
                        return await Evolve.SqlPool.request()
                            .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
                            .input("EvolveProdOrdersDetail_Qty", Evolve.Sql.Int, parseInt(data.EvolveInventory_Weight))
                            .input("EvolveProdOrdersDetail_Status", Evolve.Sql.NVarChar, "completed")
                            .input("EvolveProdOrdersDetail_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                            .input("EvolveProdOrdersDetail_LotNotes", Evolve.Sql.NVarChar, data.EvolveInventory_LotNotes)
                            .input("EvolveProdOrdersDetail_LotNumber", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                            .input("EvolveProdOrdersDetail_CreatedAt", Evolve.Sql.NVarChar, dataTime)
                            .input("EvolveProdOrdersDetail_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                            .input("EvolveProdOrdersDetail_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
                            .input("EvolveUom_ID", Evolve.Sql.Int, EvolveItem.recordset[0].EvolveUom_ID)
                            .input("EvolveLocation_ID", Evolve.Sql.Int, data.EvolveLocation_ID)
                            .input("EvolveProdOrdersDetail_RefNumber", Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
                            .input("EvolveInventory_ID", Evolve.Sql.INT, inventory_id)
                            .query("INSERT INTO EvolveProdOrdersDetail (EvolveProdOrders_ID,EvolveProdOrdersDetail_Qty,EvolveProdOrdersDetail_Status,EvolveProdOrdersDetail_CreatedUser,EvolveProdOrdersDetail_LotNotes,EvolveProdOrdersDetail_LotNumber,EvolveProdOrdersDetail_CreatedAt,EvolveProdOrdersDetail_UpdatedUser,EvolveProdOrdersDetail_UpdatedAt,EvolveUom_ID,EvolveLocation_ID,EvolveProdOrdersDetail_RefNumber,EvolveInventory_ID) VALUES (@EvolveProdOrders_ID,@EvolveProdOrdersDetail_Qty,@EvolveProdOrdersDetail_Status,@EvolveProdOrdersDetail_CreatedUser,@EvolveProdOrdersDetail_LotNotes,@EvolveProdOrdersDetail_LotNumber,@EvolveProdOrdersDetail_CreatedAt,@EvolveProdOrdersDetail_UpdatedUser,@EvolveProdOrdersDetail_UpdatedAt,@EvolveUom_ID,@EvolveLocation_ID,@EvolveProdOrdersDetail_RefNumber,@EvolveInventory_ID);select @@IDENTITY AS 'inserted_id'"
                            );
                    }
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR1614: Error in production Booking "+error.message);
            return new Error(" EERR1614: Error in production Booking "+error.message);
        }
    },

      getDeviceDataByCode: async function (EvolveDevice_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDevice_Code', Evolve.Sql.NVarChar, EvolveDevice_Code)
                .query("SELECT * FROM EvolveDevice WHERE EvolveDevice_Code = @EvolveDevice_Code");
        } catch (error) {

            Evolve.Log.error(" EERR1615: Error while getting Device Data By Code "+error.message);
            return new Error(" EERR1615: Error while getting Device Data By Code "+error.message);
        }
    },

    updateDeviceAPI: async function (EvolveDevice_ID,EvolveDevice_API) {
        try {
            console.log("EvolveDevice_ID :", EvolveDevice_ID)
            console.log("EvolveDevice_API :", EvolveDevice_API)
            return await Evolve.SqlPool.request()
                .input('EvolveDevice_ID', Evolve.Sql.Int, EvolveDevice_ID)
                .input('EvolveDevice_API', Evolve.Sql.NVarChar, EvolveDevice_API)
                .query("UPDATE EvolveDevice SET EvolveDevice_API = @EvolveDevice_API WHERE EvolveDevice_ID = @EvolveDevice_ID");
        } catch (error) {

            Evolve.Log.error(" EERR1616: Error while updating Device API "+error.message);
            return new Error(" EERR1616: Error while updating Device API "+error.message);
        }
    },


    // getDeviceDatils : async function (device){
	// 	try {
	// 		return await Evolve.SqlPool.request()
	// 			.input('EvolveDevice_Code', Evolve.Sql.NVarChar, device)
	// 			.query("SELECT ed.EvolveDevice_ID , em.EvolveMachine_ID  FROM EvolveDevice ed , EvolveMachine em where ed.EvolveDevice_Code = @EvolveDevice_Code AND ed.EvolveDevice_ID = em.EvolveDevice_ID AND ed.EvolveDevice_Status  = 'active'");
	// 	} catch (error) {
	// 		Evolve.Log.error(" EERR####: Error while Get DeviceDatils " + error.message);
	// 		return new Error(" EERR####: Error while Get DeviceDatils " + error.message);
	// 	}
	// },

	// getProdOrderList : async function (machineID){
	// 	try {
	// 		return await Evolve.SqlPool.request()
	// 			.input('EvolveMachine_ID', Evolve.Sql.Int, machineID)
	// 			.query("Select epo.EvolveProdOrders_ID , epo.EvolveItem_ID ,  epo.EvolveProdOrders_OrderNo from EvolveProdOrders epo where epo.EvolveMachine_ID = @EvolveMachine_ID and epo.EvolveProdOrders_Status = 'published'");
	// 	} catch (error) {
	// 		Evolve.Log.error(" EERR####: Error while Get ProdOrderList " + error.message);
	// 		return new Error(" EERR####: Error while Get ProdOrderList " + error.message);
	// 	}
	// },

	updateTime : async function (machineID , prodOrderID , query){
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveMachine_ID', Evolve.Sql.Int, machineID)
				.input('EvolveProdOrders_ID', Evolve.Sql.Int, prodOrderID)
				.query("UPDATE EvolveMixingParameter set " + query + " where EvolveMachine_ID = @EvolveMachine_ID AND EvolveProdOrders_ID = @EvolveProdOrders_ID ");
		} catch (error) {
			Evolve.Log.error(" EERR####: Error while Get updateTime " + error.message);
			return new Error(" EERR####: Error while Get updateTime " + error.message);
		}
	},

	// getHighSpeedTime : async function (itemId){
	// 	try {
	// 		return await Evolve.SqlPool.request()
	// 			.input('EvolveItem_ID', Evolve.Sql.Int, itemId)
	// 			.query("SELECT EvolveItem_HighSpeedTime , EvolveItem_Part FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID");
	// 	} catch (error) {
	// 		Evolve.Log.error(" EERR####: Error while Get HighSpeedTime " + error.message);
	// 		return new Error(" EERR####: Error while Get HighSpeedTime " + error.message);
	// 	}
	// },

    addMqtttDeviceLog : async function (data, topic , deviceID) {
        let date = new Date();
		let datetime = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2) + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
		try {
			return await Evolve.SqlPool.request()
            .input('EvolveDevice_ID', Evolve.Sql.Int, deviceID)
            .input('EvolveMachineDataLogs_Data', Evolve.Sql.NVarChar, JSON.stringify(data))
            .input('EvolveMachineDataLogs_Topic', Evolve.Sql.NVarChar, topic)
            .input('EvolveMachineDataLogs_CreatedAt', Evolve.Sql.NVarChar, datetime)
			.query(` INSERT INTO EvolveMachineDataLogs (EvolveDevice_ID, EvolveMachineDataLogs_Data, EvolveMachineDataLogs_Topic,  EvolveMachineDataLogs_CreatedAt) VALUES (@EvolveDevice_ID, @EvolveMachineDataLogs_Data, @EvolveMachineDataLogs_Topic, @EvolveMachineDataLogs_CreatedAt) `);

		} catch (error) {
			Evolve.Log.error(" EERR####: Error while Inserting MQTT Device Log " + error.message);
			return new Error(" EERR####: Error while Inserting MQTT Device Log " + error.message);
		}
	},

}