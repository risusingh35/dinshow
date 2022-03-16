'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {


	getSuppliersList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query("select EvolveSupplier_ID , EvolveSupplier_Name  FROM EvolveSupplier WHERE EvolveSupplier_Type= 'supplier' AND EvolveSupplier_IsActive= 1 ")
		} catch (error) {

			Evolve.Log.error(" EERR2131: Error while getting Suppliers List "+error.message);
			return new Error(" EERR2131: Error while getting SuppliersList "+error.message);

		}
	},
	getLocationList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('SELECT el.EvolveLocation_ID ,el.EvolveLocation_Name , scm.EvolveStatusCodeMstr_Code as EvolveLocation_Status  FROM  EvolveLocation el  , EvolveStatusCodeMstr scm WHERE el.EvolveStatusCodeMstr_Id = scm.EvolveStatusCodeMstr_Id')
		} catch (error) {
			Evolve.Log.error(" EERR2132: Error while getting Location List "+error.message);
			return new Error(" EERR2132: Error while getting Location List "+error.message);
		}
	},

	getPoList: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveSupplier_ID', Evolve.Sql.Int, data.EvolveSupplier_ID)

				.query("  select po.EvolvePurchaseOrder_ID , po.EvolvePurchaseOrder_Number , esup.EvolveSupplier_Currency  FROM EvolvePurchaseOrder po  ,  EvolveSupplier esup WHERE po.EvolveSupplier_ID = @EvolveSupplier_ID AND (po.EvolvePurchaseOrder_Status='open') AND po.EvolveSupplier_ID = esup.EvolveSupplier_ID")
		} catch (error) {

			Evolve.Log.error(" EERR2133: Error while getting Po List "+error.message);
			return new Error(" EERR2133: Error while getting Po List "+error.message);
		}
	},

	getSinglePoDetails: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolvePurchaseOrder_ID', Evolve.Sql.Int, data.EvolvePurchaseOrder_ID)

				.query("SELECT  'true' as rowSelected ,    epod.EvolvePurchaseOrderDetail_ID ,epod.EvolvePurchaseOrderDetail_UOMConv,epod.EvolvePurchaseOrderDetail_Line , epod.EvolveItem_ID ,	epod.EvolvePurchaseOrderDetail_QuantityOrdered , ei.EvolveItem_Code ,ei.EvolveItem_Desc , euom.EvolveUom_Uom , epo.EvolvePurchaseOrder_Sheduled	FROM EvolvePurchaseOrderDetail epod , EvolveItem ei , [EvolveUom] euom   , EvolvePurchaseOrder epo WHERE epod.EvolvePurchaseOrder_ID = @EvolvePurchaseOrder_ID AND  ei.EvolveItem_ID = epod.EvolveItem_ID AND   euom.EvolveUom_ID = epod.EvolveUOM_ID  AND  EvolvePurchaseOrderDetail_Status='' AND epod.EvolvePurchaseOrder_ID = epo.EvolvePurchaseOrder_ID ")
		} catch (error) {

			Evolve.Log.error(" EERR2134: Error while getting Single Po Details "+error.message);
			return new Error(" EERR2134: Error while getting Single Po Details "+error.message);
		}
	},

	getAllPoDetails: async function (data) {
		try {
			return await Evolve.SqlPool.request()

				.query('SELECT euom.EvolveUom_Uom , epo.EvolvePurchaseOrder_Status , epod.EvolvePurchaseOrderDetail_ID ,epod.EvolvePurchaseOrderDetail_UOMConv,epod.EvolvePurchaseOrderDetail_Line , epod.EvolveItem_ID , epod.EvolvePurchaseOrderDetail_QuantityOrdered , ei.EvolveItem_Code , ei.EvolveItem_Lotserial, ei.EvolveItem_Desc, epo.EvolvePurchaseOrder_Number , esp.EvolveSupplier_Code , epod.EvolvePurchaseOrderDetail_QuantityReceived , el.EvolveLocation_Name FROM EvolvePurchaseOrderDetail epod , EvolveItem ei ,  EvolvePurchaseOrder epo , EvolveSupplier esp, EvolveLocation el , EvolveUom euom WHERE  ei.EvolveItem_ID = epod.EvolveItem_ID AND epo.EvolvePurchaseOrder_ID = epod.EvolvePurchaseOrder_ID AND esp.EvolveSupplier_ID = epo.EvolveSupplier_ID  AND epod.EvolveLocation_ID = el.EvolveLocation_ID AND epod.EvolveUOM_ID=euom.EvolveUom_ID')
		} catch (error) {

			Evolve.Log.error(" EERR2135: Error while getting All Po Details "+error.message);
			return new Error(" EERR2135: Error while getting All Po Details "+error.message);
		}
	},
	getPodetails: async function (condition) {
		try {
		
			return await Evolve.SqlPool.request()
				.query("  SELECT epod.* ,euom.EvolveUom_Type , epo.EvolvePurchaseOrder_Number   ,ei.EvolveItem_Code , ei.EvolveItem_Desc , ei.EvolveQc_IsRequired ,ei.EvolveItem_ShelfLife	, ((ei.EvolveItem_Tolerence/100)*100) as toleranceQty ,epo.EvolvePurchaseOrder_Status ,epo.EvolvePurchaseOrder_Sheduled ,euom.EvolveUom_Uom	FROM EvolvePurchaseOrderDetail epod , EvolvePurchaseOrder epo , EvolveItem ei , EvolveUom euom WHERE epo.EvolvePurchaseOrder_ID=epod.EvolvePurchaseOrder_ID	AND epod.EvolveItem_ID = ei.EvolveItem_ID 	AND (EvolvePurchaseOrderDetail_Status='') AND epod.EvolveUOM_ID = euom.EvolveUom_ID" + condition)
		} catch (error) {

			Evolve.Log.error(" EERR2136: Error while getting Podetails "+error.message);
			return new Error(" EERR2136: Error while getting Podetails "+error.message);
		}
	},


	getPalletDetails: async function (data) {
		try {
		
			return await Evolve.SqlPool.request()
				.input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
				.input('EvolveInventory_LotNumber', Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
				.query("SELECT  ei.EvolveInventory_PostingStatus , ei.EvolveInventory_CustLotRef ,ei.EvolveItem_ID ,ei.EvolveInventory_LotNumber ,ei.EvolveInventory_ID ,ei.EvolveLocation_ID   ,el.EvolveLocation_Name ,  ei.EvolveInventory_QtyOnHand  , ei.EvolveInventory_RefNumber ,ei.EvolveInventory_IsPrinted as EvolvePOTrans_ISPrinted, 'false' AS is_editable FROM  EvolveInventory  ei  , EvolveLocation el  WHERE el.EvolveLocation_ID = ei.EvolveLocation_ID   AND   ei.EvolveInventory_LotNumber= @EvolveInventory_LotNumber AND   ei.EvolveItem_ID  = @EvolveItem_ID  ORDER BY ei.EvolveInventory_ID DESC ")
		} catch (error) {

			Evolve.Log.error(" EERR2137: Error while getting Pallet Details "+error.message);
			return new Error(" EERR2137: Error while getting Pallet Details "+error.message);
		}
	},

	getUomList: async function (data) {
		try {
			return await Evolve.SqlPool.request()

				.query('SELECT [EvolveUom_ID] , [EvolveUom_Type] , [EvolveUom_Uom]  FROM EvolveUom')
		} catch (error) {

			Evolve.Log.error(" EERR2138: Error while getting Uom List "+error.message);
			return new Error(" EERR2138: Error while getting Uom List "+error.message);
		}
	},
	gateEntryNoList: async function (search) {
		try {

			let query = "SELECT EvolveGate_RefNumber as title, EvolveGate_ID as id FROM   EvolveGate WHERE  EvolveGate_RefNumber  LIKE '%" + search + "%'  AND  EvolveGate_ModuleType='MATRL '"

			return await Evolve.SqlPool.request().query(query);
		} catch (error) {

			Evolve.Log.error(" EERR2139: Error while gate Entry No List "+error.message);
			return new Error(" EERR2139: Error while gate Entry No List "+error.message);
		}
	},
	receivePurchaseOrder: async function (data) {
		try {


			data.EvolvePOTransReceiptDate =data.EvolvePOTransReceiptDate.split("-").reverse().join("-").replace("-", "-");
			if( data.EvolvePOTransExpriryDate.trim() == '')
			{
				data.EvolvePOTransExpriryDate = null
			}else{
				data.EvolvePOTransExpriryDate =data.EvolvePOTransExpriryDate.split("-").reverse().join("-").replace("-", "-");
			}
			if( data.EvolvePOHead_BOEDate.trim() == '')
			{
				
				data.EvolvePOHead_BOEDate = null
			}else{
				data.EvolvePOHead_BOEDate =data.EvolvePOHead_BOEDate.split("-").reverse().join("-").replace("-", "-");
			}
			data.EvolvePOHead_GateEntryDate =data.EvolvePOHead_GateEntryDate.split("-").reverse().join("-").replace("-", "-");
			data.EvolvePOHead_ShipDate =data.EvolvePOHead_ShipDate.split("-").reverse().join("-").replace("-", "-");
			

			let po_details = await Evolve.SqlPool.request()
				.input('EvolvePurchaseOrderDetail_ID', Evolve.Sql.Int, parseInt(data.EvolvePurchaseOrderDetail_ID))
				.query("  SELECT epo.EvolvePurchaseOrder_Number , pod.EvolvePurchaseOrderDetail_Line , pod.EvolvePurchaseOrderDetail_QuantityReceived , pod.EvolvePurchaseOrderDetail_QuantityOrdered   ,pod.EvolveItem_ID, ei.EvolveQc_IsRequired  FROM  EvolvePurchaseOrderDetail pod ,  [EvolveItem] ei , EvolvePurchaseOrder epo  WHERE pod.EvolvePurchaseOrderDetail_ID =@EvolvePurchaseOrderDetail_ID AND pod.EvolveItem_ID=ei.EvolveItem_ID AND epo.EvolvePurchaseOrder_ID = pod.EvolvePurchaseOrder_ID");

			if (po_details instanceof Error || po_details.rowsAffected < 1) {
				return new Error('Error In Getting PO Details');
			} else {
				let item_id = po_details.recordset[0].EvolveItem_ID;
					let date = new Date();
					let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
					let inserted_inventory = await Evolve.SqlPool.request()

						.input('EvolveCompany_ID', Evolve.Sql.Int, parseInt(data.EvolveCompany_ID))
						.input('EvolveUnit_ID', Evolve.Sql.Int, parseInt(data.EvolveUnit_ID))
						.input('EvolvePurchaseOrderDetail_ID', Evolve.Sql.Int, parseInt(data.EvolvePurchaseOrderDetail_ID))
						.input('EvolveInventory_QtyOnHand', Evolve.Sql.Int, data.EvolvePurchaseOrderDetail_QuantityReceived)
						.input('EvolveInventory_RefNumber', Evolve.Sql.NVarChar, data.EvolveInventory_Refnumber)
						.input('EvolveInventory_CustLotRef', Evolve.Sql.NVarChar, data.EvolveInventory_CustLotRef)
						.input('EvolveInventory_LotNumber', Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
						.input('EvolveItem_ID', Evolve.Sql.Int, parseInt(item_id))
						.input('EvolveInventory_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
						.input('EvolveInventory_CreatedAt', Evolve.Sql.NVarChar, dataTime)
						.input('EvolveInventory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
						.input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
						.input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
						.input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUOM_ID)

						.input('EvolveInventory_Status', Evolve.Sql.NVarChar, data.EvolveInventory_Status)
						.input('EvolveInventory_ExpireDateTime', Evolve.Sql.NVarChar, data.EvolvePOTransExpriryDate)
						.input('EvolveInventory_ReceiptDate', Evolve.Sql.NVarChar, data.EvolvePOTransReceiptDate)
						.input('EvolveTranstype_ID', Evolve.Sql.NVarChar, data.EvolveTranstype_ID)
						.input('EvolveInventory_IsPrinted', Evolve.Sql.Int, 0)

						.input('EvolveInventory_PostingStatus', Evolve.Sql.NVarChar, 'PENDING')
						.query('INSERT INTO EvolveInventory (EvolveInventory_IsPrinted,EvolveCompany_ID ,EvolveUnit_ID,EvolveInventory_LotNumber ,EvolveInventory_CustLotRef ,EvolveItem_ID,EvolveInventory_QtyOnHand,EvolveInventory_RefNumber,EvolveInventory_CreatedUser,EvolveInventory_CreatedAt,EvolveLocation_ID,EvolveUom_ID, EvolveInventory_Status,EvolveInventory_ExpireDateTime,EvolveInventory_ReceiptDate , EvolveTranstype_ID,EvolveInventory_PostingStatus) VALUES (@EvolveInventory_IsPrinted,@EvolveCompany_ID ,@EvolveUnit_ID,@EvolveInventory_LotNumber ,@EvolveInventory_CustLotRef ,@EvolveItem_ID,@EvolveInventory_QtyOnHand,@EvolveInventory_RefNumber,@EvolveInventory_CreatedUser,@EvolveInventory_CreatedAt,@EvolveLocation_ID,@EvolveUom_ID,@EvolveInventory_Status,@EvolveInventory_ExpireDateTime , @EvolveInventory_ReceiptDate,@EvolveTranstype_ID,@EvolveInventory_PostingStatus);select @@IDENTITY AS \'inserted_id\'');

					if (inserted_inventory instanceof Error || inserted_inventory.rowsAffected < 1) {
						return new Error('Error In Getting while Invetory updating');
					} else {
						let date = new Date();
						let recieveDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
						let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

						let addPoTrans =   await Evolve.SqlPool.request()
							.input('EvolvePurchaseOrderDetail_ID', Evolve.Sql.Int, parseInt(data.EvolvePurchaseOrderDetail_ID))
							.input('EvolvePOTransPalletQTY', Evolve.Sql.Int, data.EvolvePurchaseOrderDetail_QuantityReceived)
							.input('EvolvePOTransPalletNum', Evolve.Sql.NVarChar, data.EvolveInventory_Refnumber)
							.input('EvolvePOTrans_Status', Evolve.Sql.NVarChar, 'PENDING')
							.input('EvolvePOTransGst_number', Evolve.Sql.NVarChar, data.EvolvePOTransGst_number)
							.input('EvolvePOTrans_ISPrinted', Evolve.Sql.NVarChar, '0')
							.input('EvolvePOTransInvoice_number', Evolve.Sql.NVarChar, data.EvolvePOTransInvoice_number)
							.input('EvolvePOTransExpriryDate', Evolve.Sql.NVarChar, data.EvolvePOTransExpriryDate)
							.input('EvolvePOTransReceiptDate', Evolve.Sql.NVarChar, data.EvolvePOTransReceiptDate)
							.input('EvolvePOTrans_PackingSlipNO', Evolve.Sql.NVarChar, data.EvolvePOTrans_PackingSlipNO)
							.input('EvolvePoTrans_LotNumber', Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
							.input('EvolvePoTrans_CustLotRef', Evolve.Sql.NVarChar, data.EvolveInventory_CustLotRef)
							.input('EvolvePOTrans_ShipDate', Evolve.Sql.NVarChar, data.EvolvePOHead_ShipDate)
							.input('EvolvePOTransEffDate', Evolve.Sql.NVarChar, recieveDate)
							.input('EvolvePoTrans_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
							.input('EvolvePoTrans_CreatedAt', Evolve.Sql.NVarChar, dataTime)
							.input('EvolvePoTrans_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
							.input('EvolvePoTrans_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
							.input('EvolveLocationID', Evolve.Sql.Int, data.EvolveLocation_ID)
							.input('EvolvePOTrans_BoeNo', Evolve.Sql.NVarChar, data.EvolvePOHead_BOENO)
							.input('EvolvePOTrans_BoeDate', Evolve.Sql.NVarChar, data.EvolvePOHead_BOEDate)
							.input('EvolvePOTrans_GateEntryDate', Evolve.Sql.NVarChar, data.EvolvePOHead_GateEntryDate)
							.input('EvolvePOTrans_GateEntryNumber', Evolve.Sql.NVarChar, data.EvoveGate_ID)
							.input('EvolvePOTrans_EWaybillNUm', Evolve.Sql.NVarChar, data.EvolvePOHead_EWaybillNUm)

							.query("INSERT INTO EvolvePOTrans (EvolvePOTrans_ShipDate ,EvolvePOTransGst_number ,EvolvePOTrans_Status ,EvolvePOTransExpriryDate ,EvolvePurchaseOrderDetail_ID,EvolvePOTransPalletQTY,EvolvePOTransPalletNum,EvolvePOTrans_ISPrinted,EvolvePOTransInvoice_number,EvolvePOTransEffDate,EvolvePoTrans_CreatedUser,EvolvePoTrans_CreatedAt,EvolvePoTrans_UpdatedUser,EvolvePoTrans_UpdatedAt,EvolveLocationID,EvolvePOTrans_BoeNo, EvolvePOTrans_BoeDate,EvolvePOTrans_GateEntryDate ,EvolvePOTrans_GateEntryNumber,EvolvePOTrans_EWaybillNUm,EvolvePOTransReceiptDate , EvolvePOTrans_PackingSlipNO,EvolvePoTrans_LotNumber,EvolvePoTrans_CustLotRef) VALUES (@EvolvePOTrans_ShipDate,@EvolvePOTransGst_number ,@EvolvePOTrans_Status ,@EvolvePOTransExpriryDate ,@EvolvePurchaseOrderDetail_ID,@EvolvePOTransPalletQTY,@EvolvePOTransPalletNum,@EvolvePOTrans_ISPrinted,@EvolvePOTransInvoice_number,@EvolvePOTransEffDate,@EvolvePoTrans_CreatedUser,@EvolvePoTrans_CreatedAt,@EvolvePoTrans_UpdatedUser,@EvolvePoTrans_UpdatedAt,@EvolveLocationID,@EvolvePOTrans_BoeNo,@EvolvePOTrans_BoeDate,@EvolvePOTrans_GateEntryDate,@EvolvePOTrans_GateEntryNumber,@EvolvePOTrans_EWaybillNUm,@EvolvePOTransReceiptDate , @EvolvePOTrans_PackingSlipNO,@EvolvePoTrans_LotNumber,@EvolvePoTrans_CustLotRef);select @@IDENTITY AS 'inserted_id'");
			
						if (addPoTrans instanceof Error || addPoTrans.rowsAffected < 1) {
							return new Error('Error while adding po transaction ');
						} else {
							let history_Data = {
							'EvolveCompany_ID': data.EvolveCompany_ID,
							'EvolveUnit_ID': data.EvolveUnit_ID,
							'EvolveTranstype_code': 'PO-RCPT',
							'EvolveItem_ID': parseInt(item_id),
							'EvolveInventoryTransHistory_Number' :  po_details.recordset[0].EvolvePurchaseOrder_Number, // WO / PO / SO NUMBER 
							'EvolveInventoryTransHistory_Line' : po_details.recordset[0].EvolvePurchaseOrderDetail_Line, // PO / SO LINE NUMBER
							'EvolveInventoryTransHistory_LotSerial' :  data.EvolveInventory_LotNumber,
							'EvolveInventoryTransHistory_RefNumber' : data.EvolveInventory_Refnumber,
							'EvolveInventoryTransHistory_FromRefNumber' : null,
							'EvolveInventoryTransHistory_QtyRequire' :  po_details.recordset[0].EvolvePurchaseOrderDetail_QuantityOrdered,
							'EvolveInventoryTransHistory_Qty' :data.EvolvePurchaseOrderDetail_QuantityReceived,
							'EvolveUom_ID':data.EvolveUOM_ID,
							'EvolveLocation_FromID': data.EvolveLocation_ID,
							'EvolveLocation_ToID': null,
							'EvolveReason_ID' : null,
							'EvolveInventoryTransHistory_InventoryStatus' : data.EvolveInventory_Status,
							'EvolveInventoryTransHistory_PostingStatus' : 'PENDING',
							'EvolveInventoryTransHistory_Remark' : null,
							'EvolveUser_ID' : data.EvolveUser_ID,
							'EvolveInventoryTransHistory_ShipDate' : data.EvolvePOHead_ShipDate,

						};
						let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data);
						return(add_history)
						}

					}

			}
		} catch (error) {

			Evolve.Log.error(" EERR2140: Error while receiving Purchase Order "+error.message);
			return new Error(" EERR2140: Error while receiving Purchase Order "+error.message);
		}
	},
	updatePurchaseOrder: async function (po_detail_id, po_receive_qty, data) {
		try {
			let EvolvePurchaseOrderDetail_Status
			if (data.poLineClose == true) {
				EvolvePurchaseOrderDetail_Status = "C"
			}
			else {
				EvolvePurchaseOrderDetail_Status = ""
			}
	
			let date = new Date();
			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
			let po_details = await Evolve.SqlPool.request()
				.input('EvolvePurchaseOrderDetail_ID', Evolve.Sql.Int, parseInt(po_detail_id))
				.query('SELECT EvolvePurchaseOrderDetail_QuantityReceived , EvolvePurchaseOrderDetail_QuantityOrdered FROM EvolvePurchaseOrderDetail WHERE EvolvePurchaseOrderDetail_ID = @EvolvePurchaseOrderDetail_ID')
			if (po_details instanceof Error || po_details.rowsAffected < 1) {
				return new Error('Error In Getting PO Details');
			} else {
				let podetails_receive_qty = po_details.recordset[0].EvolvePurchaseOrderDetail_QuantityReceived;
				// let po_qty = po_details.recordset[0].EvolvePurchaseOrderDetail_QuantityOrdered;
				let po_qty_final = parseInt(podetails_receive_qty) + parseInt(po_receive_qty);
				// if (po_receive_qty > po_qty || po_qty_final > po_qty) // 0 > 25 || 1 > 25
				// {
				// 	return new Error('PO received QTY must be less then ordered QTY');
				// }
				// else {
					return await Evolve.SqlPool.request()
						.input('EvolvePurchaseOrderDetail_ID', Evolve.Sql.Int, po_detail_id)
						.input('EvolvePurchaseOrderDetail_QuantityReceived', Evolve.Sql.Int, po_qty_final)
						.input('EvolvePurchaseOrderDetail_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
						.input('EvolvePurchaseOrderDetail_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
						.input('EvolvePurchaseOrderDetail_Status', Evolve.Sql.NVarChar, EvolvePurchaseOrderDetail_Status)

						.query('Update EvolvePurchaseOrderDetail set EvolvePurchaseOrderDetail_QuantityReceived = @EvolvePurchaseOrderDetail_QuantityReceived,EvolvePurchaseOrderDetail_UpdatedUser =@EvolvePurchaseOrderDetail_UpdatedUser, EvolvePurchaseOrderDetail_UpdatedAt =@EvolvePurchaseOrderDetail_UpdatedAt  , EvolvePurchaseOrderDetail_Status=@EvolvePurchaseOrderDetail_Status where EvolvePurchaseOrderDetail_ID = @EvolvePurchaseOrderDetail_ID ');
				// }
			}
		} catch (error) {

			Evolve.Log.error(" EERR2141: Error while updating Purchase Order "+error.message);
			return new Error(" EERR2141: Error while updating Purchase Order "+error.message);
		}
	},

	updateBarcodePrint: async function (id) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolvePurchaseOrderDetail_ID', Evolve.Sql.Int, id)
				.query("UPDATE EvolvePurchaseOrderDetail SET EvolvePurchaseOrderDetail_IsPrint = 1 WHERE EvolvePurchaseOrderDetail_ID=@EvolvePurchaseOrderDetail_ID")
		} catch (error) {

			Evolve.Log.error(" EERR2142: Error while updating Barcode Print "+error.message);
			return new Error(" EERR2142: Error while updating Barcode Print "+error.message);
		}
	},

	updatePoTrans: async function (EvolvePOTransPalletNum) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolvePOTransPalletNum', Evolve.Sql.NVarChar, EvolvePOTransPalletNum)

				.query("UPDATE EvolvePOTrans SET EvolvePOTrans_ISPrinted = 1 WHERE EvolvePOTransPalletNum =EvolvePOTransPalletNum")
		} catch (error) {

			Evolve.Log.error(" EERR2143: Error while updating Po Trans "+error.message);
			return new Error(" EERR2143: Error while updating Po Trans "+error.message);
		}
	},
	updateInvPrintStatus: async function (EvolveInventory_RefNumber) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveInventory_RefNumber', Evolve.Sql.NVarChar, EvolveInventory_RefNumber)

				.query("UPDATE EvolveInventory SET EvolveInventory_IsPrinted = 1 WHERE EvolveInventory_RefNumber=@EvolveInventory_RefNumber")
		} catch (error) {

			Evolve.Log.error(" EERR3227: Error while updating Po Trans "+error.message);
			return new Error(" EERR3227: Error while updating Po Trans "+error.message);
		}
	},

	checkUomConv: async function (data) {
		try {
			let responce = await Evolve.SqlPool.request()
				.input('CurrentUOM', Evolve.Sql.Int, data.CurrentUOM)
				.input('ContverUOM', Evolve.Sql.Int, data.ContverUOM)
				.input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
				.query('SELECT ec.*,em.EvolveUom_Type FROM EvolveUomConv ec, EvolveUom em  WHERE  ec.EvolveItem_ID =@EvolveItem_ID AND ec.EvolveUomConv_AlternateUom_ID = em.EvolveUom_ID AND ec.EvolveUom_ID = @CurrentUOM AND ec.EvolveUomConv_AlternateUom_ID =@ContverUOM ');
			if (responce.rowsAffected < 1) {
				return await Evolve.SqlPool.request()
					.input('CurrentUOM', Evolve.Sql.Int, data.CurrentUOM)
					.input('ContverUOM', Evolve.Sql.Int, data.ContverUOM)
					.input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
					.query('SELECT ec.*,em.EvolveUom_Type FROM EvolveUomConv ec, EvolveUom em  WHERE ec.EvolveItem_ID IS NULL AND ec.EvolveUomConv_AlternateUom_ID = em.EvolveUom_ID AND ec.EvolveUom_ID = @CurrentUOM AND ec.EvolveUomConv_AlternateUom_ID =@ContverUOM ');
			} else {
				return responce;
			}

		} catch (error) {

			Evolve.Log.error(" EERR2144: Error while checking Uom Conv "+error.message);
			return new Error(" EERR2144: Error while checking Uom Conv "+error.message);
		}
	},
	getPalletCount: async function (condition) {
		try {
			return await Evolve.SqlPool.request()
				.query("SELECT COUNT(EvolveInventory_ID) as count FROM EvolveInventory " + condition)
		} catch (error) {

			Evolve.Log.error(" EERR2145: Error while getting Pallet Count "+error.message);
			return new Error(" EERR2145: Error while getting Pallet Count "+error.message);
		}
	},

	getSummary: async function (data) {
		try {
			let condition = "";
		   if (data.EvolveInventory_LotNumber != '') {
				 condition += "  AND  ( epotr.EvolvePoTrans_LotNumber LIKE '%" + data.EvolveInventory_LotNumber + "%' OR epo.EvolvePurchaseOrder_Number LIKE '%"+ data.EvolveInventory_LotNumber + "%')"
			}
			if(data.EvolveInventory_LotNumber=='')
			{
				
				condition += "  AND   CONVERT(VARCHAR(10), epotr.EvolvePoTrans_CreatedAt, 111) =  CONVERT(VARCHAR(10), getdate(), 111) "


			}

			return await Evolve.SqlPool.request()
				.query("SELECT CONVERT(VARCHAR(10), CAST(epotr.EvolvePOTransReceiptDate AS DATETIME), 103) AS EvolvePOTransReceiptDate , convert(varchar, epotr.EvolvePOTransExpriryDate, 103)  as EvolvePOTransExpriryDate , convert(varchar, epotr.EvolvePoTrans_CreatedAt, 103) as EvolvePoTrans_CreatedAt,epotr.EvolvePOTrans_ID,epo.EvolvePurchaseOrder_Number, epod.EvolvePurchaseOrderDetail_Line,	ei.EvolveItem_Code, ei.EvolveItem_Desc,	epotr.EvolvePoTrans_CustLotRef,  euom.EvolveUom_Uom	, epod.EvolvePurchaseOrderDetail_QuantityOrdered, epotr.EvolvePoTrans_LotNumber,	epotr.EvolvePOTransPalletQTY, epotr.EvolvePOTransPalletNum,  eloc.EvolveLocation_Name, epotr.EvolvePOTrans_Status FROM	EvolvePurchaseOrder epo, EvolvePurchaseOrderDetail epod, EvolveItem ei,	EvolveUom euom, EvolveLocation eloc, EvolvePOTrans epotr 	WHERE epod.EvolvePurchaseOrder_ID =	epo.EvolvePurchaseOrder_ID AND ei.EvolveItem_ID = epod.EvolveItem_ID    	 AND epod.EvolveUOM_ID = euom.EvolveUom_ID AND epotr.EvolveLocationID = eloc.EvolveLocation_ID 	 AND epotr.EvolvePurchaseOrderDetail_ID = epod.EvolvePurchaseOrderDetail_ID  " + condition + "order by epotr.EvolvePoTrans_CreatedAt desc  ")
		} catch (error) {

			Evolve.Log.error(" EERR2146: Error while getting Summary "+error.message);
			return new Error(" EERR2146: Error while getting Summary "+error.message);
		}
	},

	getpoDetailId: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.query("SELECT [EvolvePurchaseOrderDetail_ID] FROM [EvolvePOTrans] WHERE [EvolvePOTransPalletNum] ='" + data.EvolvePOTransPalletNum + "'")
		} catch (error) {

			Evolve.Log.error(" EERR2147: Error while getting po Detail Id "+error.message);
			return new Error(" EERR2147: Error while getting po Detail Id "+error.message);
		}
	},
	updateInventory: async function (EvolveInventory_ID, EvolveInventory_QtyOnHand, EvolveUser_ID) {
		try {
			let date = new Date();

			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();


			return await Evolve.SqlPool.request()

				.input('EvolveInventory_QtyOnHand', Evolve.Sql.Int, EvolveInventory_QtyOnHand)
				.input('EvolveInventory_ID', Evolve.Sql.Int, EvolveInventory_ID)
				.input('EvolveInventory_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
				.input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
				.query("  UPDATE [EvolveInventory] SET [EvolveInventory_QtyOnHand] =@EvolveInventory_QtyOnHand ,EvolveInventory_UpdatedUser=@EvolveInventory_UpdatedUser ,EvolveInventory_UpdatedAt=@EvolveInventory_UpdatedAt WHERE  [EvolveInventory_ID] =@EvolveInventory_ID ")
		} catch (error) {

			Evolve.Log.error(" EERR2148: Error while updating Inventory "+error.message);
			return new Error(" EERR2148: Error while updating Inventory "+error.message);
		}


	},
	updatePoDetails: async function (data) {
		try {
			let date = new Date();

			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();


			return await Evolve.SqlPool.request()

				.input('updatedQty', Evolve.Sql.Int, data.updatedQty)
				.input('currentQty', Evolve.Sql.Int, data.currentQty)
				.input('EvolvePurchaseOrderDetail_ID', Evolve.Sql.Int, data.EvolvePurchaseOrderDetail_ID)
				.input('EvolvePurchaseOrderDetail_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.input('EvolvePurchaseOrderDetail_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
				.query("  UPDATE EvolvePurchaseOrderDetail SET EvolvePurchaseOrderDetail_QuantityReceived = EvolvePurchaseOrderDetail_QuantityReceived-@currentQty+@updatedQty  , EvolvePurchaseOrderDetail_UpdatedUser=@EvolvePurchaseOrderDetail_UpdatedUser ,EvolvePurchaseOrderDetail_UpdatedAt=@EvolvePurchaseOrderDetail_UpdatedAt WHERE EvolvePurchaseOrderDetail_ID=@EvolvePurchaseOrderDetail_ID")
		} catch (error) {

			Evolve.Log.error(" EERR2149: Error while updating Po Details "+error.message);
			return new Error(" EERR2149: Error while updating Po Details "+error.message);
		}
	},
	deletePallet: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.query("DELETE  FROM  [EvolveInventory] WHERE EvolveInventory_ID=" + data.EvolveInventory_ID)
		} catch (error) {

			Evolve.Log.error(" EERR2150: Error while deleteing Pallet "+error.message);
			return new Error(" EERR2150: Error while deleteing Pallet "+error.message);
		}
	},
	updatePoQty: async function (data) {
		try {
			let date = new Date();

			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();


			return await Evolve.SqlPool.request()

				.input('removeQty', Evolve.Sql.Int, data.removeQty)
				.input('EvolvePurchaseOrderDetail_ID', Evolve.Sql.Int, data.EvolvePurchaseOrderDetail_ID)
				.input('EvolvePurchaseOrderDetail_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.input('EvolvePurchaseOrderDetail_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
				.query("  UPDATE [EvolvePurchaseOrderDetail] SET EvolvePurchaseOrderDetail_QuantityReceived = [EvolvePurchaseOrderDetail_QuantityReceived]-@removeQty  , EvolvePurchaseOrderDetail_UpdatedUser=@EvolvePurchaseOrderDetail_UpdatedUser ,EvolvePurchaseOrderDetail_UpdatedAt=@EvolvePurchaseOrderDetail_UpdatedAt WHERE [EvolvePurchaseOrderDetail_ID]=@EvolvePurchaseOrderDetail_ID")

		} catch (error) {

			Evolve.Log.error(" EERR2151: Error while updating Po Qty "+error.message);
			return new Error(" EERR2151: Error while updating Po Qty "+error.message);
		}
	},

	deletePoTrans: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.query("DELETE  FROM  [EvolvePOTrans] WHERE EvolvePOTransPalletNum='" + data.EvolvePOTransPalletNum + "'")
		} catch (error) {

			Evolve.Log.error(" EERR2152: Error while deleting Po Trans "+error.message);
			return new Error(" EERR2152: Error while deleting Po Trans "+error.message);
		}
	},
	updatePalletPoTrans: async function (data) {
		try {
			let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

			return await Evolve.SqlPool.request(data)
			.input("EvolvePoTrans_UpdatedUser",Evolve.Sql.Int,data.EvolveUser_ID)
            .input("EvolvePoTrans_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
			.query("UPDATE EvolvePOTrans SET  EvolvePoTrans_UpdatedAt=@EvolvePoTrans_UpdatedAt ,EvolvePoTrans_UpdatedUser=@EvolvePoTrans_UpdatedUser ,  EvolvePOTransPalletQTY =" + data.updatedQty + "  WHERE EvolvePOTransPalletNum='" + data.EvolvePOTransPalletNum + "'")
		} catch (error) {

			Evolve.Log.error(" EERR2153: Error while updating Pallet Po Trans "+error.message);
			return new Error(" EERR2153: Error while updating Pallet Po Trans "+error.message);
		}

	},
	getPoByGateNumber: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveGate_ID', Evolve.Sql.Int, data.EvolveGate_ID)
				.query(" SELECT  esp.EvolveSupplier_ID  FROM   EvolveGate eg  , EvolveSupplier esp WHERE  esp.EvolveSupplier_Code = eg.EvolveGate_Orgenization AND EvolveGate_ID =@EvolveGate_ID ");
		} catch (error) {

			Evolve.Log.error(" EERR2154: Error while getting Po By Gate Number "+error.message);
			return new Error(" EERR2154: Error while getting Po By Gate Number "+error.message);
		}
	},
	getPodetailsbyGate: async function (po) {
		try {
			return await Evolve.SqlPool.request()
			.query("SELECT epo.EvolveSupplier_ID , euom.EvolveUom_ID,euom.EvolveUom_Type, epod.EvolveLocation_ID ,epo.EvolvePurchaseOrder_Status ,epo.EvolvePurchaseOrder_Sheduled, epod.EvolvePurchaseOrderDetail_ID ,epod.EvolvePurchaseOrderDetail_UOMConv,epod.EvolvePurchaseOrderDetail_Line , epod.EvolveItem_ID , epod.EvolvePurchaseOrderDetail_QuantityOrdered , ei.EvolveItem_Code , ei.EvolveItem_Desc,ei.EvolveItem_Lotserial, epo.EvolvePurchaseOrder_Number ,esp.EvolveSupplier_Code , epod.EvolvePurchaseOrderDetail_QuantityReceived , el.EvolveLocation_Name ,euom.EvolveUom_Uom   FROM EvolvePurchaseOrderDetail epod , EvolveItem ei ,  EvolvePurchaseOrder epo , EvolveSupplier esp, EvolveLocation el , [EvolveUom] euom WHERE  ei.EvolveItem_ID = epod.EvolveItem_ID AND epo.EvolvePurchaseOrder_ID = epod.EvolvePurchaseOrder_ID AND esp.EvolveSupplier_ID = epo.EvolveSupplier_ID AND epod.EvolveLocation_ID = el.EvolveLocation_ID   AND  euom.EvolveUom_ID = epod.EvolveUOM_ID  AND epo.EvolvePurchaseOrder_Number   like '%" + po + "%'")
		} catch (error) {

			Evolve.Log.error(" EERR2155: Error while getting Po details by Gate "+error.message);
			return new Error(" EERR2155: Error while getting Po details by Gate "+error.message);
		}
	},
	getUnpostedTransaction: async function (data) {
		try {

			data.EvolveInventory_LotNumber  =data.EvolveInventory_LotNumber.trim()
			data.EvolvePurchaseOrder_Number = data.EvolvePurchaseOrder_Number.trim()
			let condition = ""
			if (data.startDate != '' && data.endDate != '') {

				condition += "AND  cast(epotr.EvolvePoTrans_CreatedAt as date) >=" +
					"'" + data.startDate + "'" + " and cast(epotr.EvolvePoTrans_CreatedAt as date) <=" + "'" + data.endDate + "'";


			}
			if (data.EvolvePurchaseOrder_Number != '') {


				condition += "  AND  epo.EvolvePurchaseOrder_Number LIKE '%" + data.EvolvePurchaseOrder_Number + "%' "


			}
			if (data.EvolveInventory_LotNumber != '') {

				condition += "  AND  epotr.EvolvePoTrans_LotNumber LIKE '%" + data.EvolveInventory_LotNumber + "%' "


			}
			if (data.EvolvePurchaseOrder_ID != '') {

				condition += "  AND  epo.EvolvePurchaseOrder_ID=" + data.EvolvePurchaseOrder_ID 
			}
			if (data.EvolvePurchaseOrderDetail_Line != '') {

				condition += "  AND  epod.EvolvePurchaseOrderDetail_Line=" + data.EvolvePurchaseOrderDetail_Line 
			}
			return await Evolve.SqlPool.request()
				.query("SELECT  'true' as rowSelected ,  CONVERT(VARCHAR(10), CAST(epotr.EvolvePOTransReceiptDate AS DATETIME), 103) AS EvolvePOTransReceiptDate ,  eu.EvolveUser_Name , epotr.EvolvePOTrans_ID,	epo.EvolvePurchaseOrder_Number , epod.EvolvePurchaseOrderDetail_Line 	, ei.EvolveItem_Code ,ei.EvolveItem_Desc,	 epotr.EvolvePoTrans_CustLotRef, euom.EvolveUom_Uom  	, 	epotr.EvolvePOTransExpriryDate, epod.EvolvePurchaseOrderDetail_QuantityOrdered  ,epotr.EvolvePoTrans_LotNumber, 	epotr.EvolvePOTransPalletQTY , 	epotr.EvolvePOTransPalletNum , 	eloc.EvolveLocation_Name , epotr.EvolvePOTrans_Status	 		,  convert(varchar, epotr.EvolvePoTrans_CreatedAt, 103)  as EvolvePoTrans_CreatedAt	, 	LTRIM(SUBSTRING(CONVERT(VARCHAR(20), 	CONVERT(DATETIME, epotr.EvolvePoTrans_CreatedAt), 22), 10, 5) + RIGHT(CONVERT(VARCHAR(20),		CONVERT(DATETIME, epotr.EvolvePoTrans_CreatedAt),	22), 3)) as time   	FROM  EvolvePurchaseOrder epo , EvolvePurchaseOrderDetail epod  , 	EvolveItem ei  ,   EvolveUom euom , EvolveLocation eloc ,	EvolvePOTrans epotr 	, EvolveUser eu		WHERE epod.EvolvePurchaseOrder_ID = epo.EvolvePurchaseOrder_ID AND ei.EvolveItem_ID = epod.EvolveItem_ID  AND epod.EvolveUOM_ID = euom.EvolveUom_ID AND epotr.EvolveLocationID = eloc.EvolveLocation_ID AND eu.EvolveUser_ID = epotr.EvolvePoTrans_CreatedUser AND epotr.EvolvePOTrans_Status='PENDING' AND epotr.EvolvePurchaseOrderDetail_ID=epod.EvolvePurchaseOrderDetail_ID " + condition + "	ORDER BY  epotr.EvolvePOTrans_ID")
		} catch (error) {

			Evolve.Log.error(" EERR2156: Error while getting Unposted Transaction "+error.message);
			return new Error(" EERR2156: Error while getting Unposted Transaction "+error.message);
		}
	},
	postToErp: async function (EvolvePOTrans_ID, body) {
		try {
			let error;
			let date = new Date();
			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

			let getPallet  =  await Evolve.SqlPool.request()
			.query("  SELECT pot.EvolvePOTransPalletNum ,einv.EvolveLocation_ID ,einv.EvolveInventory_LotNumber,einv.EvolveInventory_QtyOnHand ,einv.EvolveInventory_RefNumber,	pod.EvolveUOM_ID  ,pod.EvolveItem_ID ,  pod.EvolvePurchaseOrderDetail_Line , po.EvolvePurchaseOrder_Number , pod.EvolvePurchaseOrderDetail_QuantityOrdered  , einv.EvolveInventory_Status , pod.EvolvePurchaseOrderDetail_QuantityReceived FROM 	EvolvePOTrans pot ,  EvolvePurchaseOrderDetail pod  ,  EvolvePurchaseOrder  po   , EvolveInventory einv	WHERE   pot.EvolvePurchaseOrderDetail_ID = pod.EvolvePurchaseOrderDetail_ID  AND pod.EvolvePurchaseOrder_ID = po.EvolvePurchaseOrder_ID	AND einv.EvolveInventory_RefNumber = pot.EvolvePOTransPalletNum AND EvolvePOTrans_ID ="+EvolvePOTrans_ID )

		
			if (getPallet instanceof Error) {
                error=true;
			}
			else
			{
				 let poTransStatus =  await Evolve.SqlPool.request()
				.input('EvolvePoTrans_UpdatedUser', Evolve.Sql.Int, body.EvolveUser_ID)
				.input('EvolvePoTrans_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
				.query("UPDATE EvolvePOTrans SET EvolvePOTrans_Status='ERPPOSTED'  ,EvolvePoTrans_UpdatedUser=@EvolvePoTrans_UpdatedUser ,EvolvePoTrans_UpdatedAt=@EvolvePoTrans_UpdatedAt  WHERE  EvolvePOTrans_ID ="+EvolvePOTrans_ID )
			
				if (poTransStatus instanceof Error) {
					error=true;
				}
				else{
					if(Evolve.Config.PostToErpTransManual == 'PORECEIVE')
					{				
					let inventoryStatus =  await Evolve.SqlPool.request()
					.input('EvolveInventory_UpdatedUser', Evolve.Sql.Int, body.EvolveUser_ID)
					.input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
					.input('EvolveInventory_RefNumber', Evolve.Sql.NVarChar,  getPallet.recordset[0].EvolvePOTransPalletNum)
					.query("UPDATE EvolveInventory SET EvolveInventory_PostingStatus='ERPPOSTED'  ,EvolveInventory_UpdatedUser=@EvolveInventory_UpdatedUser ,EvolveInventory_UpdatedAt=@EvolveInventory_UpdatedAt  WHERE  EvolveInventory_RefNumber=@EvolveInventory_RefNumber" )	
					if (inventoryStatus instanceof Error) {
						error=true;
					}
					else{
						let  data = getPallet.recordset[0];
						let history_Data = {
                            'EvolveCompany_ID': body.EvolveCompany_ID,
                            'EvolveUnit_ID': body.EvolveUnit_ID,
                            'EvolveTranstype_code': 'PO-RCPT',
                            'EvolveItem_ID': data.EvolveItem_ID,
                            'EvolveInventoryTransHistory_Number' :data.EvolvePurchaseOrder_Number, // WO / PO / SO NUMBER 
                            'EvolveInventoryTransHistory_Line' :data.EvolvePurchaseOrderDetail_Line, // PO / SO LINE NUMBER
                            'EvolveInventoryTransHistory_LotSerial' :  data.EvolveInventory_LotNumber,
                            'EvolveInventoryTransHistory_RefNumber' : data.EvolveInventory_RefNumber,
                            'EvolveInventoryTransHistory_FromRefNumber' : null,
                            'EvolveInventoryTransHistory_QtyRequire' :  data.EvolvePurchaseOrderDetail_QuantityOrdered,
                            'EvolveInventoryTransHistory_Qty' :data.EvolveInventory_QtyOnHand,
                            'EvolveUom_ID':data.EvolveUOM_ID,
                            'EvolveLocation_FromID': data.EvolveLocation_ID,
                            'EvolveLocation_ToID': null,
                            'EvolveReason_ID' : null,
                            'EvolveInventoryTransHistory_InventoryStatus' : data.EvolveInventory_Status,
                            'EvolveInventoryTransHistory_PostingStatus' : 'ERPPOSTED',
                            'EvolveInventoryTransHistory_Remark' : null,
                            'EvolveUser_ID' : body.EvolveUser_ID
                          };
                          let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data);
                            if (add_history instanceof Error) {
                                let obj = { statusCode: 400, status: "fail", message: "Error while adding  history", result: null };
							}
							else
							{

								return inventoryStatus
							}
					// }
				}
				}
				else
				{
					return poTransStatus
				}


				}

			}
		
		} catch (error) {

			Evolve.Log.error(" EERR2157: Error while posting To Erp "+error.message);
			return new Error(" EERR2157: Error while posting To Erp "+error.message);
		}
	},

	getPreviosdatTranCount: async function () {
		try {

			return await Evolve.SqlPool.request()
				.query(" SELECT COUNT(EvolvePOTrans_ID) as count from EvolvePOTrans WHERE   EvolvePOTrans_Status='PENDING'   AND CONVERT(VARCHAR(10), getdate(), 111) != CONVERT(VARCHAR(10),EvolvePoTrans_CreatedAt, 111) ");
		} catch (error) {

			Evolve.Log.error(" EERR2158: Error while getting Previos dat Tran Count "+error.message);
			return new Error(" EERR2158: Error while getting Previos dat Tran Count "+error.message);
		}
	},

	closePO: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.query("UPDATE EvolvePurchaseOrder SET EvolvePurchaseOrder_Status ='closed' WHERE EvolvePurchaseOrder_ID =" + data.EvolvePurchaseOrder_ID);
		} catch (error) {

			Evolve.Log.error(" EERR2159: Error while closing PO "+error.message);
			return new Error(" EERR2159: Error while closing PO "+error.message);
		}
	},
	addIOData: async function (data) {
		try {
		  let date = new Date();
		  let dataTime =
			date.getFullYear() +
			"-" +
			(date.getMonth() + 1) +
			"-" +
			date.getDate() +
			" " +
			date.getHours() +
			":" +
			date.getMinutes() +
			":" +
			date.getSeconds();
	
		  let createIORecord = await Evolve.SqlPool.request()
			.input(
			  "EvolveIO_Data",
			  Evolve.Sql.NVarChar,
			  JSON.stringify(data.EvolveIO_Data)
			)
			.input(
			  "EvolveIO_File_Data",
			  Evolve.Sql.NVarChar,
			  JSON.stringify(data.EvolveIO_File_Data)
			)
			.input("EvolveIO_File_InTime", Evolve.Sql.NVarChar, dataTime)
			.input(
			  "EvolveIO_Data_Formate",
			  Evolve.Sql.NVarChar,
			  data.EvolveIO_Data_Formate
			)
			.input("EvolveIO_Code", Evolve.Sql.NVarChar, data.EvolveIO_Code)
			.input("EvolveIO_Direction", Evolve.Sql.Bit, data.EvolveIO_Direction)
			.input("EvolveIO_Status", Evolve.Sql.Bit, data.EvolveIO_Status)
			.input("EvolveIO_ERP_Type", Evolve.Sql.NVarChar, data.EvolveIO_ERP_Type)
			.query(
			  "INSERT INTO EvolveIO(EvolveIO_Data,EvolveIO_File_Data,EvolveIO_File_InTime,EvolveIO_Data_Formate,EvolveIO_Code,EvolveIO_Direction,EvolveIO_Status,EvolveIO_ERP_Type) VALUES (@EvolveIO_Data,@EvolveIO_File_Data,@EvolveIO_File_InTime,@EvolveIO_Data_Formate,@EvolveIO_Code,@EvolveIO_Direction,@EvolveIO_Status,@EvolveIO_ERP_Type)"
			);
		  if (createIORecord instanceof Error || createIORecord.rowsAffected < 1) {
			Evolve.Log.error(" EERR2160: Error on add IO Data ");
			return new Error(" EERR2160: Error on add IO Data ");
		  } else {
			return createIORecord;
		  }
		} catch (error) {
		  Evolve.Log.error(" EERR2161: Error while adding IO Data "+error.message);
		  return new Error(" EERR2161: Error while adding IO Data "+error.message);
		}
	  },
    getTransTypeID :  async function (EvolveTranstype_Code) {
		try {
		  return await Evolve.SqlPool.request()
			.input("EvolveTranstype_Code", Evolve.Sql.NVarChar, EvolveTranstype_Code)
			.query("SELECT EvolveTranstype_ID FROM EvolveTranstype WHERE EvolveTranstype_Code = @EvolveTranstype_Code");
		} catch (error) {
		  Evolve.Log.error(" EERR2162: Error while getting Trans Type ID "+error.message);
		  return new Error(" EERR2162: Error while getting Trans Type ID "+error.message);
		}
	  },
	getSinglePalletData :  async function (EvolvePOTrans_ID) {
		try {
		
		  return await Evolve.SqlPool.request()
			.input("EvolvePOTrans_ID", Evolve.Sql.Int, EvolvePOTrans_ID)
			.query("  SELECT eunit.EvolveUnit_Code , eunit.EvolveUnit_entity ,eunit.EvolveUnit_domain,   ei.EvolveItem_ShelfLife ,ei.EvolveItem_Code ,  pod.EvolvePurchaseOrderDetail_WoOp ,  pod.EvolvePurchaseOrderDetail_WoLot,  convert(varchar, pot.EvolvePOTrans_ShipDate, 23) as EvolvePOTrans_ShipDate,  convert(varchar, pot.EvolvePOTrans_GateEntryDate, 23) as EvolvePOTrans_GateEntryDate, pot.EvolvePOTrans_GateEntryNumber,pot.EvolvePOTrans_EWaybillNUm, convert(varchar, pot.EvolvePOTrans_BoeDate, 23) as EvolvePOTrans_BoeDate,pot.EvolvePOTrans_BoeNo ,pot.EvolvePoTrans_CustLotRef , pot.EvolvePoTrans_LotNumber , pot.EvolvePOTrans_PackingSlipNO ,   convert(varchar, pot.EvolvePOTransEffDate, 23) as EvolvePOTransEffDate ,convert(varchar, pot.EvolvePOTransExpriryDate, 23) as EvolvePOTransExpriryDate , pot.EvolvePOTransGst_number , pot.EvolvePOTransInvoice_number , pot.EvolvePOTransPalletNum , pot.EvolvePOTransPalletQTY   ,convert(varchar, pot.EvolvePOTransReceiptDate, 23) as EvolvePOTransReceiptDate ,loc.EvolveLocation_Code , pod.EvolvePurchaseOrderDetail_Line , po.* , pod.EvolvePurchaseOrderDetail_QuantityOrdered , pod.EvolvePurchaseOrderDetail_QuantityReceived , eu.EvolveUom_Uom  FROM EvolvePOTrans pot   ,  EvolvePurchaseOrderDetail pod   , 	EvolvePurchaseOrder po , EvolveLocation loc , EvolveUom eu  , EvolveItem ei ,EvolveInventory einv , EvolveUnit eunit	WHERE EvolvePOTrans_ID=@EvolvePOTrans_ID AND pot.EvolvePurchaseOrderDetail_ID = pod.EvolvePurchaseOrderDetail_ID AND pod.EvolvePurchaseOrder_ID = po.EvolvePurchaseOrder_ID AND pot.EvolveLocationID = loc.EvolveLocation_ID AND eu.EvolveUom_ID = pod.EvolveUOM_ID AND pod.EvolveItem_ID = ei.EvolveItem_ID AND pot.EvolvePOTransPalletNum = einv.EvolveInventory_RefNumber AND einv.EvolveUnit_ID = eunit.EvolveUnit_ID ");
		} catch (error) {
		  Evolve.Log.error(" EERR2163: Error while getting Single Pallet Data "+error.message);
		  return new Error(" EERR2163: Error while getting Single Pallet Data "+error.message);
		}
	  },

    getUnpostedPoList: async function (data) {
		try {
			return await Evolve.SqlPool.request()
			.query("SELECT DISTINCT  po.EvolvePurchaseOrder_ID , po.EvolvePurchaseOrder_Number	FROM EvolvePurchaseOrderDetail pod , EvolvePurchaseOrder po  , EvolvePOTrans pot	WHERE pot.EvolvePurchaseOrderDetail_ID =pod.EvolvePurchaseOrderDetail_ID AND  pod.EvolvePurchaseOrder_ID = po.EvolvePurchaseOrder_ID AND pot.EvolvePOTrans_Status = 'PENDING'  ORDER BY po.EvolvePurchaseOrder_Number ")
		} catch (error) {

			Evolve.Log.error(" EERR2164: Error while getting Unposted PoList "+error.message);
			return new Error(" EERR2164: Error while getting Unposted PoList "+error.message);
		}
	},
	
	getPoLineList: async function (EvolvePurchaseOrder_ID) {
		try {
			return await Evolve.SqlPool.request()
			.query("  SELECT DISTINCT pod.EvolvePurchaseOrderDetail_Line	FROM EvolvePurchaseOrderDetail pod , EvolvePurchaseOrder po  , EvolvePOTrans pot	WHERE pot.EvolvePurchaseOrderDetail_ID =pod.EvolvePurchaseOrderDetail_ID AND  pod.EvolvePurchaseOrder_ID = po.EvolvePurchaseOrder_ID AND pot.EvolvePOTrans_Status = 'PENDING' AND  po.EvolvePurchaseOrder_ID="+EvolvePurchaseOrder_ID+"  ORDER BY pod.EvolvePurchaseOrderDetail_Line" )
		} catch (error) {

			Evolve.Log.error(" EERR2165: Error while getting Po Line List "+error.message);
			return new Error(" EERR2165: Error while getting Po Line List "+error.message);
		}
	},
	checkPoStatus: async function (EvolvePurchaseOrder_ID) {
		try {
			return await Evolve.SqlPool.request()
			.input("EvolvePurchaseOrder_ID", Evolve.Sql.Int, EvolvePurchaseOrder_ID)

			.query(" SELECT EvolvePurchaseOrder_Status FROM  EvolvePurchaseOrder WHERE EvolvePurchaseOrder_ID=@EvolvePurchaseOrder_ID" )
		} catch (error) {
			Evolve.Log.error(" EERR2631: Error while check po status "+error.message);
			return new Error(" EERR2631: Error while check po status "+error.message);
		}
	},

	getLocationStatus: async function (EvolveLocation_ID) {
		try {
			return await Evolve.SqlPool.request()
			.input("EvolveLocation_ID", Evolve.Sql.Int, EvolveLocation_ID)

			.query("SELECT  scm.EvolveStatusCodeMstr_Code  FROM  EvolveLocation el  , EvolveStatusCodeMstr scm WHERE el.EvolveStatusCodeMstr_Id = scm.EvolveStatusCodeMstr_Id AND el.EvolveLocation_ID = @EvolveLocation_ID" )
		} catch (error) {
			Evolve.Log.error(" EERR3224: Error while check po status "+error.message);
			return new Error(" EERR3224: Error while check po status "+error.message);
		}
	},

	checkAprvStatus: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolvePurchaseOrder_ID', Evolve.Sql.Int, data.EvolvePurchaseOrder_ID)
				.query("SELECT  EvolvePurchaseOrder_IsApproved FROM  EvolvePurchaseOrder WHERE EvolvePurchaseOrder_ID=@EvolvePurchaseOrder_ID ")
		} catch (error) {

			Evolve.Log.error("EERR3225 : Error while check  approve status of purchase order "+error.message);
			return new Error("EERR3225 : Error while check  approve status of purchase order "+error.message);
		}
	},
	

	


}