'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getParentItems: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("select EvolveItem_Code,EvolveItem_Desc, EvolveItem_ID from EvolveItem where EvolveItem_Type = 'PARENT'");
        } catch (error) {
            Evolve.Log.error(" EERR1659: Error while getting Parent Items "+error.message);
            return new Error(" EERR1659: Error while getting Parent Items "+error.message);
        }
    },

    getAssemblyBarcodeList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("select epd.EvolveProdOrdersDetail_ID, epd.EvolveProdOrdersDetail_Serial, ep.EvolveProdOrders_Order, ep.EvolveProdOrders_OrderId, eim.EvolveItem_Code from EvolveProdOrdersDetail epd, EvolveProdOrders ep, EvolveItem eim 	where ep.EvolveItem_ID = eim.EvolveItem_ID and ep.EvolveProdOrders_ID = epd.EvolveProdOrders_ID and epd.EvolveProdOrdersDetail_PrvSeq = 2 and epd.EvolveProdOrdersDetail_NxtSeq = 3 and epd.EvolveProdOrdersDetail_Status = 'Completed'");
        } catch (error) {
            Evolve.Log.error(" EERR1660: Error while getting Assembly Barcode List "+error.message);
            return new Error(" EERR1660: Error while getting Assembly Barcode List "+error.message);
        }
    },

    getOnchangeParent: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .query("select eim.EvolveItem_ID, eim.EvolveItem_Desc, eim.EvolveItem_Code from EvolveItem eim where eim.EvolveItem_ID = @EvolveItem_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1661: Error while getting On change Parent "+error.message);
            return new Error(" EERR1661: Error while getting On change Parent "+error.message);
        }
    },

    checkValidChildBarcode: async function (data) {
        try {
            console.log("data>>>" ,  data)
            return await Evolve.SqlPool.request()
                .input("Evolveprodordersdetail_serial", Evolve.Sql.NVarChar, data.child_barcode)
                .query("SELECT TOP 1  epd.EvolveProdOrdersDetail_ID ,iif(epd.Evolveprodordersdetail_serial = @Evolveprodordersdetail_serial, 'true','false') is_valid_barcode from EvolveProdOrders ep, EvolveProdOrdersDetail epd where epd.Evolveprodordersdetail_serial =@Evolveprodordersdetail_serial  and ep.EvolveProdOrders_ID= epd.EvolveProdOrders_ID and epd.EvolveProdOrdersDetail_Status = 'Completed' and epd.EvolveProdOrdersDetail_PrvSeq = 2 and epd.EvolveProdOrdersDetail_NxtSeq = 3");
        } catch (error) {
            Evolve.Log.error(" EERR1662: Error while checking Valid Child Barcode "+error.message);
            return new Error(" EERR1662: Error while checking Valid Child Barcode "+error.message);
        }
    },

    getParentSerial: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveItem_ID", Evolve.Sql.Int, data.parent_item_id)
                .query("SELECT TOP 1  epd.EvolveProdOrdersDetail_Serial,epd.EvolveProdOrdersDetail_ID, im.EvolveItem_Code from EvolveProdOrders ep, EvolveProdOrdersDetail epd, EvolveItem im where ep.EvolveItem_ID = @EvolveItem_ID and ep.EvolveProdOrders_ID= epd.EvolveProdOrders_ID and epd.EvolveProdOrdersDetail_Status = 'In Process' and im.EvolveItem_ID = ep.EvolveItem_ID  and epd.EvolveProdOrdersDetail_PrvSeq = 3 and epd.EvolveProdOrdersDetail_NxtSeq = 3");
        } catch (error) {
            Evolve.Log.error(" EERR1663: Error while getting Parent Serial  "+error.message);
            return new Error(" EERR1663: Error while getting Parent Serial  "+error.message);
        }
    },

    updateChildParentSerial: async function (child_data, parent_data) {
        try {
            let child_update = await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar, child_data.child_barcode)
                .input('EvolveProdOrdersDetail_Status', Evolve.Sql.NVarChar, 'Completed')
                .input('EvolveProdOrdersDetail_NxtSeq', Evolve.Sql.Int, 3)
                .input('EvolveProdOrdersDetail_PrvSeq', Evolve.Sql.Int, 3)
                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_NxtSeq = @EvolveProdOrdersDetail_NxtSeq, EvolveProdOrdersDetail_PrvSeq = @EvolveProdOrdersDetail_PrvSeq , EvolveProdOrdersDetail_Status = @EvolveProdOrdersDetail_Status where EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial ")

            let parent_update = await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar, parent_data.EvolveProdOrdersDetail_Serial)
                .input('EvolveProdOrdersDetail_Status', Evolve.Sql.NVarChar, 'Completed')
                .input('EvolveProdOrdersDetail_NxtSeq', Evolve.Sql.Int, 3)
                .input('EvolveProdOrdersDetail_PrvSeq', Evolve.Sql.Int, 3)
                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_NxtSeq = @EvolveProdOrdersDetail_NxtSeq, EvolveProdOrdersDetail_PrvSeq = @EvolveProdOrdersDetail_PrvSeq , EvolveProdOrdersDetail_Status = @EvolveProdOrdersDetail_Status where EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial ")

            return parent_update;

        } catch (error) {
            Evolve.Log.error(" EERR1664: Error while updating Child Parent Serial "+error.message);
            return new Error(" EERR1664: Error while updating Child Parent Serial "+error.message);
        }
    },
    updateChildWo: async function (child_data) {
        try {
            let getWo_Id = await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar, child_data.child_barcode)
                .query("SELECT EvolveProdOrders_ID FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial")

            let checkCmp_Qty = await Evolve.SqlPool.request()
                .query("SELECT EvolveProdOrders_Quantity , EvolveProdOrders_Status ,(SELECT COUNT(EvolveProdOrdersDetail_ID) FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Status = 'Completed' AND EvolveProdOrdersDetail_PrvSeq = 3 AND EvolveProdOrdersDetail_NxtSeq = 3 AND EvolveProdOrders_ID = " + getWo_Id.recordset[0].EvolveProdOrders_ID + ") as cmp_qty FROM EvolveProdOrders WHERE EvolveProdOrders_ID = " + getWo_Id.recordset[0].EvolveProdOrders_ID)

            if (checkCmp_Qty.recordset[0].EvolveProdOrders_Quantity == checkCmp_Qty.recordset[0].cmp_qty) {
                let updateWo = await Evolve.SqlPool.request()
                    .query("UPDATE EvolveProdOrders SET EvolveProdOrders_Status = 'Completed' WHERE EvolveProdOrders_ID = " + getWo_Id.recordset[0].EvolveProdOrders_ID)
            }
        } catch (error) {
            Evolve.Log.error(" EERR1665: Error while updating Child Wo "+error.message);
            return new Error(" EERR1665: Error while updating Child Wo "+error.message);
        }
    },
    updateParentWo: async function (parent_data) {
        try {
            // console.log(parent_data);
            let getWo_Id = await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_ID', Evolve.Sql.NVarChar, parent_data.EvolveProdOrdersDetail_ID)
                .query("SELECT EvolveProdOrders_ID FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID")

            let checkCmp_Qty = await Evolve.SqlPool.request()
                .query("SELECT EvolveProdOrders_Quantity , EvolveProdOrders_Status ,(SELECT COUNT(EvolveProdOrdersDetail_ID) FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Status = 'Completed' AND EvolveProdOrdersDetail_PrvSeq = 3 AND EvolveProdOrdersDetail_NxtSeq = 3 AND EvolveProdOrders_ID = " + getWo_Id.recordset[0].EvolveProdOrders_ID + ") as cmp_qty FROM EvolveProdOrders WHERE EvolveProdOrders_ID = " + getWo_Id.recordset[0].EvolveProdOrders_ID)

            if (checkCmp_Qty.recordset[0].EvolveProdOrders_Quantity == checkCmp_Qty.recordset[0].cmp_qty) {
                let updateWo = await Evolve.SqlPool.request()
                    .query("UPDATE EvolveProdOrders SET EvolveProdOrders_Status = 'Completed' WHERE EvolveProdOrders_ID = " + getWo_Id.recordset[0].EvolveProdOrders_ID)
            }
            //return parent_update; 

        } catch (error) {
            Evolve.Log.error(" EERR1666: Error while updating Parent Wo "+error.message);
            return new Error(" EERR1666: Error while updating Parent Wo "+error.message);
        }
    },
    insertAssebmly: async function (data, child_serial_id) {
        try {
            // console.log("Child Data" ,child_data)
            // console.log("Parent data : ",parent_data.Evolveprodordersdetail_serial)
            let insert_assembly = await Evolve.SqlPool.request()
                .input('Evolve_Assy_Barcode_VALUE', Evolve.Sql.NVarChar, data.EvolveProdOrdersDetail_Serial)
                .input('Evolve_Assy_Part_OK_VALUE', Evolve.Sql.Int, 1)
                .input('Evolve_Assy_Parent_ordersdetail_id', Evolve.Sql.Int, data.EvolveProdOrdersDetail_ID)
                .input('Evolve_Assy_Child_ordersdetail_id', Evolve.Sql.Int, child_serial_id)
                .query("Insert into Evolve_Assy(Evolve_Assy_Barcode_VALUE,Evolve_Assy_Part_OK_VALUE,Evolve_Assy_Parent_ordersdetail_id,Evolve_Assy_Child_ordersdetail_id) values(@Evolve_Assy_Barcode_VALUE,@Evolve_Assy_Part_OK_VALUE,@Evolve_Assy_Parent_ordersdetail_id,@Evolve_Assy_Child_ordersdetail_id) ")
            return insert_assembly;

        } catch (error) {
            Evolve.Log.error(" EERR1667: Error in insert Assebmly "+error.message);
            return new Error(" EERR1667: Error in insert Assebmly "+error.message);
        }
    },

    getChildWoData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, data.child_barcode)
                .query("SELECT epo.EvolveProdOrders_Order , ei.EvolveItem_Code FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei WHERE epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID                   AND epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial");
        } catch (error) {
            Evolve.Log.error(" EERR1668: Error while getting Child Wo Data "+error.message);
            return new Error(" EERR1668: Error while getting Child Wo Data "+error.message);
        }
    },

    getParentWoData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, data.EvolveProdOrdersDetail_Serial)
                .query("SELECT epo.EvolveProdOrders_Order , ei.EvolveItem_Code FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei WHERE epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID                   AND epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial");
        } catch (error) {
            Evolve.Log.error(" EERR1669: Error while getting Parent Wo Data "+error.message);
            return new Error(" EERR1669: Error while getting Parent Wo Data "+error.message);
        }
    },

    getMillingData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("Evolve_Milling_Barcode", Evolve.Sql.NVarChar, data.child_barcode)
                .query("SELECT * FROM EvolveMilling WHERE Evolve_Milling_Barcode = @Evolve_Milling_Barcode");
        } catch (error) {
            Evolve.Log.error(" EERR1670: Error while getting Milling Data "+error.message);
            return new Error(" EERR1670: Error while getting Milling Data "+error.message);
        }
    },

    getVibrationData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveVibration_K3220_Barcode_VALUE", Evolve.Sql.NVarChar, data.child_barcode)
                .query("SELECT * FROM EvolveVibration WHERE EvolveVibration_K3220_Barcode_VALUE = @EvolveVibration_K3220_Barcode_VALUE");
        } catch (error) {
            Evolve.Log.error(" EERR1671: Error while getting Vibration Data "+error.message);
            return new Error(" EERR1671: Error while getting Vibration Data "+error.message);
        }
    },

    saveInTrans: async function (data, dataInTrans) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

            let inTranQue = await Evolve.SqlPool.request()
                .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveInTransQueue_TransType', Evolve.Sql.NVarChar, 'ASSEMBLY')
                .input('EvolveInTransQueue_LoadStatus', Evolve.Sql.NVarChar, 'P')
                .input('EvolveInTransQueue_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveInTransQueue_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveInTransQueue_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveInTransQueue_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .query("INSERT INTO EvolveInTransQueue (EvolveCompany_ID,EvolveUnit_ID,EvolveInTransQueue_TransType,EvolveInTransQueue_LoadStatus,EvolveInTransQueue_CreatedUser,EvolveInTransQueue_CreatedAt,EvolveInTransQueue_UpdatedUser,EvolveInTransQueue_UpdatedAt) VALUES(@EvolveCompany_ID,@EvolveUnit_ID,@EvolveInTransQueue_TransType,@EvolveInTransQueue_LoadStatus,@EvolveInTransQueue_CreatedUser,@EvolveInTransQueue_CreatedAt,@EvolveInTransQueue_UpdatedUser,@EvolveInTransQueue_UpdatedAt);select @@IDENTITY AS \'inserted_id\'")

            // inTranQue.recordset[0].inserted_id

            if (inTranQue instanceof Error || inTranQue.rowsAffected < 1) {
                return new Error('Error In Create Wo');
            } else {
                // Insert into Details Table.
                let EvolveInTransQueue_ID = inTranQue.recordset[0].inserted_id;

                await Evolve.SqlPool.request()
                    .input('EvolveInTransQueue_ID', Evolve.Sql.Int, EvolveInTransQueue_ID)
                    .input('EvolveInTransDetail_FieldName', Evolve.Sql.NVarChar, 'ITEMNO')
                    .input('EvolveInTransDetail_Value', Evolve.Sql.NVarChar, dataInTrans.ITEMNO)
                    .query("INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)")
                await Evolve.SqlPool.request()
                    .input('EvolveInTransQueue_ID', Evolve.Sql.Int, EvolveInTransQueue_ID)
                    .input('EvolveInTransDetail_FieldName', Evolve.Sql.NVarChar, 'CPART')
                    .input('EvolveInTransDetail_Value', Evolve.Sql.NVarChar, dataInTrans.CPART)
                    .query("INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)")
                await Evolve.SqlPool.request()
                    .input('EvolveInTransQueue_ID', Evolve.Sql.Int, EvolveInTransQueue_ID)
                    .input('EvolveInTransDetail_FieldName', Evolve.Sql.NVarChar, 'WONO')
                    .input('EvolveInTransDetail_Value', Evolve.Sql.NVarChar, dataInTrans.WONO)
                    .query("INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)")
                await Evolve.SqlPool.request()
                    .input('EvolveInTransQueue_ID', Evolve.Sql.Int, EvolveInTransQueue_ID)
                    .input('EvolveInTransDetail_FieldName', Evolve.Sql.NVarChar, 'PSERIAL')
                    .input('EvolveInTransDetail_Value', Evolve.Sql.NVarChar, dataInTrans.PSERIAL)
                    .query("INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)")
                await Evolve.SqlPool.request()
                    .input('EvolveInTransQueue_ID', Evolve.Sql.Int, EvolveInTransQueue_ID)
                    .input('EvolveInTransDetail_FieldName', Evolve.Sql.NVarChar, 'FZ1862276_TIME')
                    .input('EvolveInTransDetail_Value', Evolve.Sql.NVarChar, dataInTrans.FZ1862276_TIME)
                    .query("INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)")
                await Evolve.SqlPool.request()
                    .input('EvolveInTransQueue_ID', Evolve.Sql.Int, EvolveInTransQueue_ID)
                    .input('EvolveInTransDetail_FieldName', Evolve.Sql.NVarChar, 'FZ1862276_PartOK')
                    .input('EvolveInTransDetail_Value', Evolve.Sql.NVarChar, dataInTrans.FZ1862276_PartOK)
                    .query("INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)")
                await Evolve.SqlPool.request()
                    .input('EvolveInTransQueue_ID', Evolve.Sql.Int, EvolveInTransQueue_ID)
                    .input('EvolveInTransDetail_FieldName', Evolve.Sql.NVarChar, 'K3220_InputParameter09')
                    .input('EvolveInTransDetail_Value', Evolve.Sql.NVarChar, dataInTrans.K3220_InputParameter09)
                    .query("INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)")
                await Evolve.SqlPool.request()
                    .input('EvolveInTransQueue_ID', Evolve.Sql.Int, EvolveInTransQueue_ID)
                    .input('EvolveInTransDetail_FieldName', Evolve.Sql.NVarChar, 'K3220_InputParameter10')
                    .input('EvolveInTransDetail_Value', Evolve.Sql.NVarChar, dataInTrans.K3220_InputParameter10)
                    .query("INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)")
                await Evolve.SqlPool.request()
                    .input('EvolveInTransQueue_ID', Evolve.Sql.Int, EvolveInTransQueue_ID)
                    .input('EvolveInTransDetail_FieldName', Evolve.Sql.NVarChar, 'K3220_InputParameter11')
                    .input('EvolveInTransDetail_Value', Evolve.Sql.NVarChar, dataInTrans.K3220_InputParameter11)
                    .query("INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)")
                await Evolve.SqlPool.request()
                    .input('EvolveInTransQueue_ID', Evolve.Sql.Int, EvolveInTransQueue_ID)
                    .input('EvolveInTransDetail_FieldName', Evolve.Sql.NVarChar, 'K3220_InputParameter12')
                    .input('EvolveInTransDetail_Value', Evolve.Sql.NVarChar, dataInTrans.K3220_InputParameter12)
                    .query("INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)")
                await Evolve.SqlPool.request()
                    .input('EvolveInTransQueue_ID', Evolve.Sql.Int, EvolveInTransQueue_ID)
                    .input('EvolveInTransDetail_FieldName', Evolve.Sql.NVarChar, 'K3220_TIME')
                    .input('EvolveInTransDetail_Value', Evolve.Sql.NVarChar, dataInTrans.K3220_TIME)
                    .query("INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)")
                await Evolve.SqlPool.request()
                    .input('EvolveInTransQueue_ID', Evolve.Sql.Int, EvolveInTransQueue_ID)
                    .input('EvolveInTransDetail_FieldName', Evolve.Sql.NVarChar, 'PPART')
                    .input('EvolveInTransDetail_Value', Evolve.Sql.NVarChar, dataInTrans.PPART)
                    .query("INSERT INTO EvolveInTransDetail (EvolveInTransQueue_ID,EvolveInTransDetail_FieldName,EvolveInTransDetail_Value) VALUES(@EvolveInTransQueue_ID,@EvolveInTransDetail_FieldName,@EvolveInTransDetail_Value)")

                return EvolveInTransQueue_ID;

            }
        } catch (error) {
            Evolve.Log.error(" EERR1672: Error while saving In Trans "+error.message);
            return new Error(" EERR1672: Error while saving In Trans "+error.message);
        }
    },

    updateInTransStatus: async function (EvolveInTransQueue_ID, status) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInTransQueue_ID', Evolve.Sql.Int, EvolveInTransQueue_ID)
                .input('EvolveInTransQueue_LoadStatus', Evolve.Sql.NVarChar, status)
                .query('UPDATE EvolveInTransQueue SET EvolveInTransQueue_LoadStatus = @EvolveInTransQueue_LoadStatus WHERE EvolveInTransQueue_ID = @EvolveInTransQueue_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1673: Error while updating In Trans Status "+error.message);
            return new Error(" EERR1673: Error while updating In Trans Status "+error.message);
        }
    },
    checkBarcodePrinted: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("Evolveprodordersdetail_serial", Evolve.Sql.NVarChar, data.child_barcode)
                .query("SELECT ea.*, epd.EvolveProdOrdersDetail_Serial,eim.EvolveItem_Code, (SELECT im.EvolveItem_Code from EvolveItem im, EvolveProdOrders epo, EvolveProdOrdersDetail epod where epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID and epo.EvolveItem_ID = im.EvolveItem_ID and epod.EvolveProdOrdersDetail_ID = ea.Evolve_Assy_Parent_ordersdetail_id) as Parent_Item_Code FROM Evolve_Assy ea, EvolveProdOrdersDetail epd, EvolveProdOrders ep, EvolveItem eim WHERE epd.EvolveProdOrdersDetail_Serial = @Evolveprodordersdetail_serial and ea.Evolve_Assy_Child_ordersdetail_id = epd.EvolveProdOrdersDetail_ID  and ep.EvolveItem_ID = eim.EvolveItem_ID  and epd.EvolveProdOrders_ID = ep.EvolveProdOrders_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR1674: Error while checking Barcode Printed "+error.message);
            return new Error(" EERR1674: Error while checking Barcode Printed "+error.message);
        }
    },







}