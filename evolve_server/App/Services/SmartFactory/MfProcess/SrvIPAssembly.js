'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getIPAddemblyParentItems: async function () {
        try {
            return await Evolve.SqlPool.request()
            // .query("  select ei.EvolveItem_Code,ei.EvolveItem_Desc, ei.EvolveItem_ID ,eig.EvolveItemGroup_Name from EvolveItem ei  ,EvolveItemGroup eig where ei.EvolveItem_Type = 'PARENT' AND ei.EvolveItemGroup_ID =eig.EvolveItemGroup_ID  AND eig.EvolveItemGroup_Name = 'IP Assmbly'");
            .query("select EvolveItem_Code,EvolveItem_Desc, EvolveItem_ID from EvolveItem where EvolveItem_Type = 'PARENT'")
 
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
	},
	getIPAssemblyBarcodeList : async function(){
		try{
			return await Evolve.SqlPool.request()
            .query("select epd.EvolveProdOrdersDetail_ID, epd.EvolveProdOrdersDetail_Serial, ep.EvolveProdOrders_Order, ep.EvolveProdOrders_OrderId, eim.EvolveItem_Code from EvolveProdOrdersDetail epd, EvolveProdOrders ep, EvolveItem eim 	where ep.EvolveItem_ID = eim.EvolveItem_ID and ep.EvolveProdOrders_ID = epd.EvolveProdOrders_ID and (epd.EvolveProdOrdersDetail_PrvSeq = 22 and epd.EvolveProdOrdersDetail_NxtSeq = 24)  and epd.EvolveProdOrdersDetail_Status = 'Completed'");
            
            // .query("select epd.EvolveProdOrdersDetail_ID, epd.EvolveProdOrdersDetail_Serial, ep.EvolveProdOrders_Order, ep.EvolveProdOrders_OrderId, eim.EvolveItem_Code from EvolveProdOrdersDetail epd, EvolveProdOrders ep, EvolveItem eim 	where ep.EvolveItem_ID = eim.EvolveItem_ID and ep.EvolveProdOrders_ID = epd.EvolveProdOrders_ID and (epd.EvolveProdOrdersDetail_PrvSeq = 2 and epd.EvolveProdOrdersDetail_NxtSeq = 3  OR epd.EvolveProdOrdersDetail_PrvSeq = 22 and epd.EvolveProdOrdersDetail_NxtSeq = 24 OR epd.EvolveProdOrdersDetail_PrvSeq = 23 and epd.EvolveProdOrdersDetail_NxtSeq = 24 ) and epd.EvolveProdOrdersDetail_Status = 'Completed'");
		} catch (error){
			Evolve.Log.error(error.message);
            return new Error(error.message);
		}
	},
	getOnchangeIPAssemblyParent : async function(data){
		try{
			return await Evolve.SqlPool.request()
			.input('EvolveItem_ID' , Evolve.Sql.Int, data.EvolveItem_ID)
			.query("select eim.EvolveItem_ID, eim.EvolveItem_Desc, eim.EvolveItem_Code from EvolveItem eim where eim.EvolveItem_ID = @EvolveItem_ID");
		} catch (error){
			Evolve.Log.error(error.message);
            return new Error(error.message);
		}
    },
    
	getIPAssemblyParentSerial : async function(data){
	 	try{
			 return await Evolve.SqlPool.request()
			 .input("EvolveItem_ID", Evolve.Sql.Int, data.parent_item_id)
			 .query("SELECT TOP 1  epd.EvolveProdOrdersDetail_Serial,epd.EvolveProdOrdersDetail_ID, im.EvolveItem_Code from EvolveProdOrders ep, EvolveProdOrdersDetail epd, EvolveItem im where ep.EvolveItem_ID = @EvolveItem_ID and ep.EvolveProdOrders_ID= epd.EvolveProdOrders_ID and epd.EvolveProdOrdersDetail_Status = 'In Process' and im.EvolveItem_ID = ep.EvolveItem_ID  and epd.EvolveProdOrdersDetail_PrvSeq = 3 and epd.EvolveProdOrdersDetail_NxtSeq = 3");
		} catch (error){
			Evolve.Log.error("22222" ,error.message);
            return new Error(error.message);
		}
	 },
	 checkIPAssemblyValidChildBarcode : async function(data){
		try{
            console.log("data.child_barcode>>" , data.child_barcode)
			return await Evolve.SqlPool.request()
			.input("Evolveprodordersdetail_serial", Evolve.Sql.NVarChar, data.child_barcode)
            .query("SELECT TOP 1  epd.EvolveProdOrdersDetail_ID ,iif(epd.Evolveprodordersdetail_serial = @Evolveprodordersdetail_serial, 'true','false') is_valid_barcode from EvolveProdOrders ep, EvolveProdOrdersDetail epd where epd.Evolveprodordersdetail_serial =@Evolveprodordersdetail_serial  and ep.EvolveProdOrders_ID= epd.EvolveProdOrders_ID and epd.EvolveProdOrdersDetail_Status = 'Completed' and ((epd.EvolveProdOrdersDetail_PrvSeq = 22 and epd.EvolveProdOrdersDetail_NxtSeq = 24) )");
            // .query("SELECT TOP 1  epd.EvolveProdOrdersDetail_ID ,iif(epd.Evolveprodordersdetail_serial = @Evolveprodordersdetail_serial, 'true','false') is_valid_barcode from EvolveProdOrders ep, EvolveProdOrdersDetail epd where epd.Evolveprodordersdetail_serial =@Evolveprodordersdetail_serial  and ep.EvolveProdOrders_ID= epd.EvolveProdOrders_ID and epd.EvolveProdOrdersDetail_Status = 'Completed' and (epd.EvolveProdOrdersDetail_PrvSeq = 2 and epd.EvolveProdOrdersDetail_NxtSeq = 3 OR epd.EvolveProdOrdersDetail_PrvSeq = 22 and epd.EvolveProdOrdersDetail_NxtSeq = 24 OR epd.EvolveProdOrdersDetail_PrvSeq = 23 and epd.EvolveProdOrdersDetail_NxtSeq = 24)");
	   } catch (error){
		   Evolve.Log.error("11111" , error.message);
		   return new Error(error.message);
	   }
	},
	updateIpAssemblyChildParentSerial : async function(child_data, parent_data){
		try{
            let date = new Date();
            let dataTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
			let child_update =  await Evolve.SqlPool.request()
			.input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,child_data.child_barcode)
			.input('EvolveProdOrdersDetail_Status',Evolve.Sql.NVarChar, 'Completed')
			.input('EvolveProdOrdersDetail_NxtSeq',Evolve.Sql.Int, 24)
            .input('EvolveProdOrdersDetail_PrvSeq',Evolve.Sql.Int, 24)
            // .input('EvolveProdOrdersDetail_UpdatedUser', Evolve.Sql.Int, child_data.EvolveUser_ID)
            .input('EvolveProdOrdersDetail_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
            .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_NxtSeq = @EvolveProdOrdersDetail_NxtSeq, EvolveProdOrdersDetail_PrvSeq = @EvolveProdOrdersDetail_PrvSeq , EvolveProdOrdersDetail_Status = @EvolveProdOrdersDetail_Status  ,EvolveProdOrdersDetail_UpdatedAt=@EvolveProdOrdersDetail_UpdatedAt where EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial ")
            
            if(child_update instanceof Error || child_update.rowsAffected < 1){
                return parent_update; 
            }else{
			let parent_update =  await Evolve.SqlPool.request()
			.input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,parent_data.EvolveProdOrdersDetail_Serial)
			.input('EvolveProdOrdersDetail_Status',Evolve.Sql.NVarChar, 'Completed')
			.input('EvolveProdOrdersDetail_NxtSeq',Evolve.Sql.Int, 3)
            .input('EvolveProdOrdersDetail_PrvSeq',Evolve.Sql.Int, 3)
            // .input('EvolveProdOrdersDetail_UpdatedUser', Evolve.Sql.Int, child_data.EvolveUser_ID)
            .input('EvolveProdOrdersDetail_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
			.query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_NxtSeq = @EvolveProdOrdersDetail_NxtSeq, EvolveProdOrdersDetail_PrvSeq = @EvolveProdOrdersDetail_PrvSeq , EvolveProdOrdersDetail_Status = @EvolveProdOrdersDetail_Status  ,EvolveProdOrdersDetail_UpdatedAt=@EvolveProdOrdersDetail_UpdatedAt where EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial ")

             return parent_update; 
            }

	   } catch (error){
		   Evolve.Log.error("3333333333" ,error.message);
		   return new Error(error.message);
	   }
    },
    
    updateIpAssemblyChildWo : async function(child_data){
		try{
            let date = new Date();
            let dataTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
			let getWo_Id =  await Evolve.SqlPool.request()
			    .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,child_data.child_barcode)
                .query("SELECT EvolveProdOrders_ID FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial")

            let checkCmp_Qty =  await Evolve.SqlPool.request()
                .query("SELECT EvolveProdOrders_Quantity , EvolveProdOrders_Status ,(SELECT COUNT(EvolveProdOrdersDetail_ID) FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Status = 'Completed' AND EvolveProdOrdersDetail_PrvSeq = 24 AND EvolveProdOrdersDetail_NxtSeq = 24 AND EvolveProdOrders_ID = "+getWo_Id.recordset[0].EvolveProdOrders_ID+") as cmp_qty FROM EvolveProdOrders WHERE EvolveProdOrders_ID = " + getWo_Id.recordset[0].EvolveProdOrders_ID)
            
            if(checkCmp_Qty.recordset[0].EvolveProdOrders_Quantity == checkCmp_Qty.recordset[0].cmp_qty)
            {
                let updateWo =  await Evolve.SqlPool.request()
                            // .input('EvolveProdOrders_UpdatedUser', Evolve.Sql.Int, child_data.EvolveUser_ID)
                            .input('EvolveProdOrders_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                    .query("UPDATE EvolveProdOrders SET EvolveProdOrders_Status = 'Completed' WHERE EvolveProdOrders_ID = " + getWo_Id.recordset[0].EvolveProdOrders_ID)
            }
			//return parent_update; 

	   } catch (error){
		   Evolve.Log.error(error.message);
		   return new Error(error.message);
	   }
    },

    updateIpAssemblyParentWo : async function(parent_data){
		try{
            // console.log(parent_data);
			let getWo_Id =  await Evolve.SqlPool.request()
			    .input('EvolveProdOrdersDetail_ID',Evolve.Sql.NVarChar,parent_data.EvolveProdOrdersDetail_ID)
                .query("SELECT EvolveProdOrders_ID FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID")

            let checkCmp_Qty =  await Evolve.SqlPool.request()
                .query("SELECT EvolveProdOrders_Quantity , EvolveProdOrders_Status ,(SELECT COUNT(EvolveProdOrdersDetail_ID) FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Status = 'Completed' AND EvolveProdOrdersDetail_PrvSeq = 3 AND EvolveProdOrdersDetail_NxtSeq = 3 AND EvolveProdOrders_ID = "+getWo_Id.recordset[0].EvolveProdOrders_ID+") as cmp_qty FROM EvolveProdOrders WHERE EvolveProdOrders_ID = " + getWo_Id.recordset[0].EvolveProdOrders_ID)
            
            if(checkCmp_Qty.recordset[0].EvolveProdOrders_Quantity == checkCmp_Qty.recordset[0].cmp_qty)
            {
                let updateWo =  await Evolve.SqlPool.request()
                    .query("UPDATE EvolveProdOrders SET EvolveProdOrders_Status = 'Completed' WHERE EvolveProdOrders_ID = " + getWo_Id.recordset[0].EvolveProdOrders_ID)
            }
			//return parent_update; 

	   } catch (error){
		   Evolve.Log.error(error.message);
		   return new Error(error.message);
	   }
    },
    
	insertIPAssebmly : async function(data,child_serial_id){
		try{
			// console.log("Child Data" ,child_data)
			// console.log("Parent data : ",parent_data.Evolveprodordersdetail_serial)
			let insert_assembly =  await Evolve.SqlPool.request()
			.input('EvolveIPAssy_Barcode_VALUE',Evolve.Sql.NVarChar,data.EvolveProdOrdersDetail_Serial)
			.input('EvolveIPAssy_Part_OK_VALUE',Evolve.Sql.Int, 1)
			.input('EvolveIPAssy_Parent_ordersdetail_id',Evolve.Sql.Int, data.EvolveProdOrdersDetail_ID)
			.input('EvolveIPAssy_Child_ordersdetail_id',Evolve.Sql.Int, child_serial_id)
			.query("Insert into EvolveIPAssy (EvolveIPAssy_Barcode_VALUE,EvolveIPAssy_Part_OK_VALUE,EvolveIPAssy_Parent_ordersdetail_id,EvolveIPAssy_Child_ordersdetail_id) values(@EvolveIPAssy_Barcode_VALUE,@EvolveIPAssy_Part_OK_VALUE,@EvolveIPAssy_Parent_ordersdetail_id,@EvolveIPAssy_Child_ordersdetail_id) ")
			return insert_assembly;
			
	   } catch (error){
		   Evolve.Log.error(error.message);
		   return new Error(error.message);
	   }
	},
	checkIPAssemblyBarcodePrinted : async function(data){
		try{
			return await Evolve.SqlPool.request()
			.input("Evolveprodordersdetail_serial", Evolve.Sql.NVarChar, data.child_barcode)
			.query("SELECT ea.*, epd.EvolveProdOrdersDetail_Serial,eim.EvolveItem_Code, (SELECT im.EvolveItem_Code from EvolveItem im, EvolveProdOrders epo, EvolveProdOrdersDetail epod where epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID and epo.EvolveItem_ID = im.EvolveItem_ID and epod.EvolveProdOrdersDetail_ID = ea.EvolveIPAssy_Parent_ordersdetail_id) as Parent_Item_Code FROM EvolveIPAssy ea, EvolveProdOrdersDetail epd, EvolveProdOrders ep, EvolveItem eim WHERE epd.EvolveProdOrdersDetail_Serial = @Evolveprodordersdetail_serial and ea.EvolveIPAssy_Child_ordersdetail_id = epd.EvolveProdOrdersDetail_ID  and ep.EvolveItem_ID = eim.EvolveItem_ID  and epd.EvolveProdOrders_ID = ep.EvolveProdOrders_ID ");
	   } catch (error){
		   Evolve.Log.error(error.message);
		   return new Error(error.message);
	   }
    },
    getIpAssemblyChildWoData : async function(data){
        try{
            return await Evolve.SqlPool.request()
            .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, data.child_barcode)
            .query("  SELECT epo.EvolveProdOrders_Order , ei.EvolveItem_Code   ,ept.EvolveprocessTemp_Name  ,eig.EvolveItemGroup_Name FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei , EvolveProcessTemp ept ,EvolveItemGroup eig WHERE epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID AND epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND  ept.EvolveprocessTemp_ID = ei.EvolveProcessTemp_Id AND ei.EvolveItemGroup_ID = eig.EvolveItemGroup_ID");
       } catch (error){
           Evolve.Log.error(error.message);
           return new Error(error.message);
       }
    },
    getIpFlamingData : async function(data){
        try{
            return await Evolve.SqlPool.request()
            .input("EvolveIpFlaming_Barcode", Evolve.Sql.NVarChar, data.child_barcode)
            .query("SELECT * FROM EvolveIpFlaming WHERE EvolveIpFlaming_Barcode = @EvolveIpFlaming_Barcode");
       } catch (error){
           Evolve.Log.error(error.message);
           return new Error(error.message);
       }
    },
    getIpFoamingData : async function(data){
        try{
            return await Evolve.SqlPool.request()
            .input("EvolveIpFoaming_Barcode", Evolve.Sql.NVarChar, data.child_barcode)
            .query("SELECT * FROM EvolveIpFoaming WHERE EvolveIpFoaming_Barcode = @EvolveIpFoaming_Barcode");
       } catch (error){
           Evolve.Log.error(error.message);
           return new Error(error.message);
       }
    },
    getHpLaminationData : async function(data){
        try{
            return await Evolve.SqlPool.request()
            .input("EvolveHPLamination_Barcode", Evolve.Sql.NVarChar, data.child_barcode)
            .query("SELECT * FROM EvolveHPLamination WHERE EvolveHPLamination_Barcode = @EvolveHPLamination_Barcode");
       } catch (error){
           Evolve.Log.error(error.message);
           return new Error(error.message);
       }
    },
    
    saveIpAssemblyInTrans: async function (data,dataInTrans) {
        try {
            let date = new Date();
            let dataTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
           
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

                    if(inTranQue instanceof Error || inTranQue.rowsAffected < 1){
                        return new Error('Error While Insert Trans Queue');
                    }else{
                        // Insert into Details Table.
                        let  EvolveInTransQueue_ID =  inTranQue.recordset[0].inserted_id;

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
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },


    getAssemblyBracodeDetails: async function (EvolveProdOrdersDetail_Serial) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar, EvolveProdOrdersDetail_Serial)
            .query("SELECT DATEDIFF(day, epod.EvolveProdOrdersDetail_UpdatedAt, GETDATE() ) as daysFromFlaming , epo.EvolveProdOrders_ID , epod.EvolveProdOrdersDetail_ID , epod.EvolveProdOrdersDetail_Status,epod.EvolveProdOrdersDetail_Serial,ei.EvolveItem_ID,ei.EvolveItem_Code,ei.EvolveItem_Desc,ei.EvolveItem_CustPart , epod.EvolveProdOrders_ScannedRequired , epod.EvolveProdOrders_TotalScanned  , EvolveProdOrdersDetail_PrvSeq ,EvolveProdOrdersDetail_NxtSeq FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial AND epod.EvolveProdOrdersDetail_PrvSeq = 22 AND epod.EvolveProdOrdersDetail_NxtSeq = 24 AND epo.EvolveItem_ID = ei.EvolveItem_ID AND  epod.EvolveProdOrdersDetail_Status = 'Completed' ")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
        
    addIPAssemblyAudit: async function (data,s1,s2) {
        try {
            console.log("data :",data);
            return await Evolve.SqlPool.request()
                .input('EvolveIPAssemblyAudit_Barcode', Evolve.Sql.NVarChar, data.child_barcode)
                .input('EvolveIPAssemblyAudit_S1', Evolve.Sql.Int, s1)
                .input('EvolveIPAssemblyAudit_S2', Evolve.Sql.Int, s2)
                .input('EvolveIPAssemblyAudit_ParentItemId', Evolve.Sql.Int,data.parent_item_id)

                .query("INSERT INTO EvolveIPAssemblyAudit (EvolveIPAssemblyAudit_Barcode , EvolveIPAssemblyAudit_S1 , EvolveIPAssemblyAudit_S2 ,EvolveIPAssemblyAudit_ParentItemId) VALUES(@EvolveIPAssemblyAudit_Barcode , @EvolveIPAssemblyAudit_S1 , @EvolveIPAssemblyAudit_S2, @EvolveIPAssemblyAudit_ParentItemId)")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    ipAssemblyCheckAudit: async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("SELECT * FROM EvolveIPAssemblyAudit")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    
    TruncateIpAssemblyAudit: async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("TRUNCATE TABLE EvolveIPAssemblyAudit")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getParentWoData : async function(data){
        try{
            return await Evolve.SqlPool.request()
            .input("EvolveProdOrdersDetail_Serial", Evolve.Sql.NVarChar, data.EvolveProdOrdersDetail_Serial)
            .query("SELECT epo.EvolveProdOrders_Order , ei.EvolveItem_Code FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei WHERE epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID                   AND epod.EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial");
       } catch (error){
           Evolve.Log.error(error.message);
           return new Error(error.message);
       }
    },
    updateInTransStatus: async function (EvolveInTransQueue_ID,status) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveInTransQueue_ID',Evolve.Sql.Int,EvolveInTransQueue_ID)
            .input('EvolveInTransQueue_LoadStatus',Evolve.Sql.NVarChar, status)
            .query('UPDATE EvolveInTransQueue SET EvolveInTransQueue_LoadStatus = @EvolveInTransQueue_LoadStatus WHERE EvolveInTransQueue_ID = @EvolveInTransQueue_ID')
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },

    
}

// 