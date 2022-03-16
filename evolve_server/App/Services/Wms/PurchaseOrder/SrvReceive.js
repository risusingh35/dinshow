'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
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
			Evolve.Log.error(" EERR2118: Error while checking Uom Conv "+error.message);
			return new Error(" EERR2118: Error while checking Uom Conv "+error.message);
		}
	},	

	getLocationList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('select EvolveLocation_ID,EvolveLocation_Name,EvolveLocation_Code FROM EvolveLocation')
		} catch (error) {
			Evolve.Log.error(" EERR2119: Error while getting Location list "+error.message);
			return new Error(" EERR2119: Error while getting Location list "+error.message);
		}
	},

	getUomList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query("SELECT * FROM EvolveUom")
		} catch (error) {
			Evolve.Log.error(" EERR2120: Error while getting UomList "+error.message);
			return new Error(" EERR2120: Error while getting UomList "+error.message);
		}
	},

	getPoDetailsByPoId: async function (EvolvePurchaseOrder_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolvePurchaseOrder_ID', Evolve.Sql.Int, EvolvePurchaseOrder_ID)
				.query('select DISTINCT EvolvePurchaseOrderDetail_Line from EvolvePurchaseOrderDetail WHERE EvolvePurchaseOrder_ID =@EvolvePurchaseOrder_ID')
		} catch (error) {
			Evolve.Log.error(" EERR2121: Error while getting Po Details By Po Id "+error.message);
			return new Error(" EERR2121: Error while getting Po Details By Po Id "+error.message);
		}
	},

	getPoById: async function (EvolvePurchaseOrder_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolvePurchaseOrder_ID', Evolve.Sql.Int, EvolvePurchaseOrder_ID)
				.query('select * from EvolvePurchaseOrder WHERE EvolvePurchaseOrder_ID =@EvolvePurchaseOrder_ID')
		} catch (error) {
			Evolve.Log.error(" EERR2122: Error while getting Po By Id "+error.message);
			return new Error(" EERR2122: Error while getting Po By Id "+error.message);
		}
	},

	getSupplierById: async function (EvolveSupplier_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveSupplier_ID', Evolve.Sql.Int, EvolveSupplier_ID)
				.query('select * from EvolveSupplier WHERE EvolveSupplier_ID =@EvolveSupplier_ID')
		} catch (error) {
			Evolve.Log.error(" EERR2123: Error while getting Supplier By Id "+error.message);
			return new Error(" EERR2123: Error while getting Supplier By Id "+error.message);
		}
	},

	getPoDetailsByPurchaseOrderId: async function (EvolvePurchaseOrder_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolvePurchaseOrder_ID', Evolve.Sql.Int, EvolvePurchaseOrder_ID)
				.query('select epod.*,eitm.EvolveItem_Code,eitm.EvolveLocation_ID , eu.EvolveUom_Type,eu.EvolveUom_Uom ,eu.EvolveUom_ID from EvolvePurchaseOrderDetail epod,EvolveItem eitm , EvolveUom eu  WHERE EvolvePurchaseOrder_ID = @EvolvePurchaseOrder_ID AND epod.EvolveItem_ID = eitm.EvolveItem_ID AND epod.EvolveItem_ID = eitm.EvolveItem_ID AND eitm.EvolveUom_ID = eu.EvolveUom_ID')
		} catch (error) {
			Evolve.Log.error(" EERR2124: Error while getting Po Details By Purchase Order Id "+error.message);
			return new Error(" EERR2124: Error while getting Po Details By Purchase Order Id "+error.message);
		}
	},

	getPoDetailsByLineNumberAndPoId: async function (EvolvePurchaseOrder_ID, EvolvePurchaseOrderDetail_Line) {
		try {
			let EvolvePurchaseOrderDetailLine = '';
			for (let i = 0; i < EvolvePurchaseOrderDetail_Line.length; i++) {
				if (EvolvePurchaseOrderDetailLine == '') {
					EvolvePurchaseOrderDetailLine = "'" + EvolvePurchaseOrderDetail_Line[i].toString() + "'";
				} else {
					EvolvePurchaseOrderDetailLine = EvolvePurchaseOrderDetailLine + ",'" + EvolvePurchaseOrderDetail_Line[i].toString() + "'";
				}
			}

			let query = "SELECT eitm.EvolveItem_Code,eitm.EvolveItem_ID,eitm.EvolveLocation_ID,epod.EvolvePurchaseOrderDetail_ID,epod.EvolvePurchaseOrderDetail_Line,epod.EvolvePurchaseOrderDetail_UOMConv,epod.EvolvePurchaseOrderDetail_QuantityOrdered,epod.EvolvePurchaseOrderDetail_QuantityReceived,epod.EvolvePurchaseOrderDetail_IsPrint, eu.EvolveUom_Type,eu.EvolveUom_Uom,eu.EvolveUom_ID FROM EvolvePurchaseOrderDetail epod, EvolveItem eitm , EvolveUom eu WHERE epod.EvolvePurchaseOrder_ID =" + EvolvePurchaseOrder_ID + " AND epod.EvolvePurchaseOrderDetail_Line IN (" + EvolvePurchaseOrderDetailLine + ") AND epod.EvolveItem_ID = eitm.EvolveItem_ID AND eitm.EvolveUom_ID = eu.EvolveUom_ID";
			return await Evolve.SqlPool.request().query(query);
		} catch (error) {
			Evolve.Log.error(" EERR2125: Error while getting Po Details By Line Number And Po Id "+error.message);
			return new Error(" EERR2125: Error while getting Po Details By Line Number And Po Id "+error.message);
		}
	},

	getBarcodeDetails: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('select * from EvolveWMSSetting ');

		} catch (error) {
			Evolve.Log.error(" EERR2126: Error while getting  Barcode Details "+error.message);
			return new Error(" EERR2126: Error while getting  Barcode Details "+error.message);
		}
	},

	updateNextNumBarcode: async function (last_num, id) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveWMS_SettingID', Evolve.Sql.Int, id)
				.input('EvolveWMS_SettingsPallateBarEnd', Evolve.Sql.Int, last_num)
				.query('Update EvolveWMSSetting set EvolveWMS_SettingsPallateBarEnd = @EvolveWMS_SettingsPallateBarEnd where EvolveWMS_SettingID =@EvolveWMS_SettingID');
		} catch (error) {
			Evolve.Log.error(" EERR2127: Error while updating Next Num Barcode "+error.message);
			return new Error(" EERR2127: Error while updating Next Num Barcode "+error.message);
		}
	},

	receivePurchaseOrder: async function (data) {
		try {
			let po_details = await Evolve.SqlPool.request()
				.input('EvolvePurchaseOrderDetail_ID', Evolve.Sql.Int, parseInt(data.EvolvePurchaseOrderDetail_ID))
				.query('SELECT * FROM EvolvePurchaseOrderDetail WHERE EvolvePurchaseOrderDetail_ID = @EvolvePurchaseOrderDetail_ID')
			if (po_details instanceof Error || po_details.rowsAffected < 1) {
				return new Error('Error In Getting PO Details');
			} else {
				let item_id = po_details.recordset[0].EvolveItem_ID;
				let EvolveItem = await Evolve.SqlPool.request()
					.input('EvolveItem_ID', Evolve.Sql.Int, item_id)
					.query('select EvolveLocation_ID from EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID')
				if (EvolveItem instanceof Error || EvolveItem.rowsAffected < 1) {
					return new Error('Error In Getting PO Details');
				} else {
					let po_receive_qty = po_details.recordset[0].EvolvePurchaseOrderDetail_QuantityReceived;
					let po_qty = po_details.recordset[0].EvolvePurchaseOrderDetail_QuantityOrdered;
					let po_qty_final = parseInt(po_receive_qty) + parseInt(data.EvolvePurchaseOrderDetail_QuantityReceived);
					if (po_receive_qty > po_qty || po_qty_final > po_qty) {
						return new Error('PO received QTY must be less then ordered QTY');
					} else {
						let date = new Date();
						let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
						let inserted_inventory = await Evolve.SqlPool.request()
							.input('EvolvePurchaseOrderDetail_ID', Evolve.Sql.Int, parseInt(data.EvolvePurchaseOrderDetail_ID))
							.input('EvolvePurchaseOrderDetail_QuantityReceived', Evolve.Sql.Int, data.EvolvePurchaseOrderDetail_QuantityReceived)
							.input('EvolveInventory_LotNumber', Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
							.input('EvolveInventory_CustLotRef', Evolve.Sql.NVarChar, data.EvolveInventory_CustLotRef)
							.input('EvolveInventory_RefNumber', Evolve.Sql.NVarChar, data.EvolveInventory_Refnumber)
							.input('EvolveItem_ID', Evolve.Sql.Int, parseInt(item_id))
							.input('EvolveInventory_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
							.input('EvolveInventory_CreatedAt', Evolve.Sql.NVarChar, dataTime)
							.input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
							.query('INSERT INTO EvolveInventory (EvolveItem_ID,EvolveInventory_QtyOnHand,EvolveInventory_LotNumber,EvolveInventory_CustLotRef,EvolveInventory_RefNumber,EvolveInventory_CreatedUser,EvolveInventory_CreatedAt,EvolveLocation_ID) VALUES (@EvolveItem_ID,@EvolvePurchaseOrderDetail_QuantityReceived,@EvolveInventory_LotNumber,@EvolveInventory_CustLotRef,@EvolveInventory_RefNumber,@EvolveInventory_CreatedUser,@EvolveInventory_CreatedAt,@EvolveLocation_ID);select @@IDENTITY AS \'inserted_id\'');

						if (inserted_inventory instanceof Error || inserted_inventory.rowsAffected < 1) {
							return new Error('Error In Getting while Invetory updating');
						} else {
							let inventory_id = inserted_inventory.recordset[0].EvolveInventory_ID
							let history_Data = {
								'EvolveCompany_ID': data.EvolveUnit_ID,
								'EvolveUnit_ID': data.EvolveUnit_ID,
								'EvolveApplication_ID': 3,
								'EvolveTranstype_code': 'receivePurchaseOrder',
								'EvolveTransitionHistory_DocumentID': po_details.EvolvePurchaseOrder_ID,
								'EvolveTransitionHistory_DocumentDetailID': po_details.EvolvePurchaseOrderDetail_ID,
								'EvolveLocation_ID': null,
								'EvolveItem_ID': parseInt(item_id),
								'EvolveUOM_ID': data.EvolveUOM_ID,
								'EvolveInventoryStatus_ID': null,
								'EvolveTransitionHistory_AddressID': null,
								'EvolveInventory_ID': inventory_id,
								'EvolveTransitionHistory_Quantity': data.EvolvePurchaseOrderDetail_QuantityReceived,
								'EvolveTransitionHistory_Shiptype': null,
								'EvolveTransitionHistory_SequenceId': null,
								'EvolveTransitionHistory_UserID': data.EvolveUser_ID,
								'EvolveMachine_ID': null,
								'EvolveReason_ID': null,
								'EvolveTool_ID': null,
								'EvolveActivity_ID': null,
								'EvolveTransitionHistory_Description': null,
							};
							let add_history = Evolve.App.Controllers.Unit.unitControllers.addTranstionHistory(history_Data)
							if (add_history instanceof Error || add_history.rowsAffected < 1) {
								return new Error('Error In Getting while Updating History');
							} else {
								return "No Error";
							}

						}
					}
				}
			}
		} catch (error) {
			Evolve.Log.error(" EERR2128: Error while receiving Purchase Order "+error.message);
			return new Error(" EERR2128: Error while receiving Purchase Order "+error.message);
		}
	},

	updatePurchaseOrder: async function (po_detail_id, po_receive_qty, EvolveUser_ID) {
		try {
			let date = new Date();
			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
			let po_details = await Evolve.SqlPool.request()
				.input('EvolvePurchaseOrderDetail_ID', Evolve.Sql.Int, parseInt(po_detail_id))
				.query('SELECT * FROM EvolvePurchaseOrderDetail WHERE EvolvePurchaseOrderDetail_ID = @EvolvePurchaseOrderDetail_ID')
			if (po_details instanceof Error || po_details.rowsAffected < 1) {
				return new Error('Error In Getting PO Details');
			} else {
				let podetails_receive_qty = po_details.recordset[0].EvolvePurchaseOrderDetail_QuantityReceived;
				let po_qty = po_details.recordset[0].EvolvePurchaseOrderDetail_QuantityOrdered;
				let po_qty_final = parseInt(podetails_receive_qty) + parseInt(po_receive_qty);
				if (po_receive_qty > po_qty || po_qty_final > po_qty) // 0 > 25 || 1 > 25
				{
					return new Error('PO received QTY must be less then ordered QTY');
				}
				else 
				{
					return await Evolve.SqlPool.request()
						.input('EvolvePurchaseOrderDetail_ID', Evolve.Sql.Int, po_detail_id)
						.input('EvolvePurchaseOrderDetail_QuantityReceived', Evolve.Sql.Int, po_qty_final)
						.input('EvolvePurchaseOrderDetail_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
						.input('EvolvePurchaseOrderDetail_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
						.query('Update EvolvePurchaseOrderDetail set EvolvePurchaseOrderDetail_QuantityReceived = @EvolvePurchaseOrderDetail_QuantityReceived,EvolvePurchaseOrderDetail_UpdatedUser =@EvolvePurchaseOrderDetail_UpdatedUser, EvolvePurchaseOrderDetail_UpdatedAt =@EvolvePurchaseOrderDetail_UpdatedAt  where EvolvePurchaseOrderDetail_ID = @EvolvePurchaseOrderDetail_ID');
				}
			}
		} catch (error) {
			Evolve.Log.error(" EERR2129: Error while updating Purchase Order "+error.message);
			return new Error(" EERR2129: Error while updating Purchase Order "+error.message);
		}
	},

	updateBarcodePrint: async function (id) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolvePurchaseOrderDetail_ID', Evolve.Sql.Int, id)
				.query("UPDATE EvolvePurchaseOrderDetail SET EvolvePurchaseOrderDetail_IsPrint = 1 WHERE EvolvePurchaseOrderDetail_ID=@EvolvePurchaseOrderDetail_ID")
		} catch (error) {
			Evolve.Log.error(" EERR2130: Error while updating Barcode Print "+error.message);
			return new Error(" EERR2130: Error while updating Barcode Print "+error.message);
		}
	},
}
