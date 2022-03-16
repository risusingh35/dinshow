'use strict';
const Evolve = require('../../../Boot/Evolve');
module.exports = {

	getWmsSidebarMenuList: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveMenu_AppId', Evolve.Sql.Int, 3)
				.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
				.query('SELECT em.EvolveMenu_Name,em.EvolveMenu_Id,em.EvolveMenu_Icon,em.EvolveMenu_Url FROM EvolveMenu em, EvolveRoleToMenu erm , EvolveUserRoleLink eurl, EvolveRole er WHERE eurl.EvolveUser_ID =@EvolveUser_ID AND eurl.EvolveRole_ID = er.EvolveRole_ID AND erm.EvolveRole_ID = eurl.EvolveRole_ID AND erm.EvolveMenu_ID = em.EvolveMenu_ID AND em.EvolveMenu_IsActive = 1 AND em.EvolveMenu_AppId =@EvolveMenu_AppId AND erm.EvolveApp_ID =@EvolveMenu_AppId ORDER BY em.EvolveMenu_Index');
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getWmsSidebarMenuChildLinkList: async function (EvolveMenu_Id) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveMenu_Id', Evolve.Sql.Int, EvolveMenu_Id)
				.query('SELECT EvolveMenu_Url FROM EvolveMenu WHERE EvolveMenu_Parent =@EvolveMenu_Id AND EvolveMenu_Index = 0');
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	getItemDetails: async function (id) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveItem_ID', Evolve.Sql.Int, id)
				.query('select * from EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID')
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getPo: async function (search) {
		try {
			let query = "SELECT EvolvePurchaseOrder_Number as title, EvolvePurchaseOrder_ID as id FROM EvolvePurchaseOrder WHERE EvolvePurchaseOrder_Status = 'open' AND  EvolvePurchaseOrder_Number LIKE '%" + search + "%'"
			return await Evolve.SqlPool.request().query(query);
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	getUomList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query("SELECT * FROM EvolveUom")
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
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
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	getAllPoList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query("SELECT * FROM EvolvePurchaseOrder WHERE EvolvePurchaseOrder_Status = 'open'")
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getPoById: async function (EvolvePurchaseOrder_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolvePurchaseOrder_ID', Evolve.Sql.Int, EvolvePurchaseOrder_ID)
				.query('select * from EvolvePurchaseOrder WHERE EvolvePurchaseOrder_ID =@EvolvePurchaseOrder_ID')
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getPoDetailsByPoId: async function (EvolvePurchaseOrder_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolvePurchaseOrder_ID', Evolve.Sql.Int, EvolvePurchaseOrder_ID)
				.query('select DISTINCT EvolvePurchaseOrderDetail_Line from EvolvePurchaseOrderDetail WHERE EvolvePurchaseOrder_ID =@EvolvePurchaseOrder_ID')
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getPoDetailsByPurchaseOrderId: async function (EvolvePurchaseOrder_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolvePurchaseOrder_ID', Evolve.Sql.Int, EvolvePurchaseOrder_ID)
				.query('select epod.*,eitm.EvolveItem_Code,eitm.EvolveLocation_ID , eu.EvolveUom_Type,eu.EvolveUom_Uom ,eu.EvolveUom_ID from EvolvePurchaseOrderDetail epod,EvolveItem eitm , EvolveUom eu  WHERE EvolvePurchaseOrder_ID = @EvolvePurchaseOrder_ID AND epod.EvolveItem_ID = eitm.EvolveItem_ID AND epod.EvolveItem_ID = eitm.EvolveItem_ID AND eitm.EvolveUom_ID = eu.EvolveUom_ID')
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
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

			let query = "SELECT eitm.EvolveItem_Code,eitm.EvolveItem_ID,eitm.EvolveLocation_ID,epod.EvolvePurchaseOrderDetail_ID,epod.EvolvePurchaseOrderDetail_Line,epod.EvolvePurchaseOrderDetail_UOMConv,epod.EvolvePurchaseOrderDetail_QuantityOrdered,epod.EvolvePurchaseOrderDetail_QuantityReceived,epod.EvolveLocation_ID,epod.EvolvePurchaseOrderDetail_IsPrint, eu.EvolveUom_Type,eu.EvolveUom_Uom,eu.EvolveUom_ID FROM EvolvePurchaseOrderDetail epod, EvolveItem eitm , EvolveUom eu WHERE epod.EvolvePurchaseOrder_ID =" + EvolvePurchaseOrder_ID + " AND epod.EvolvePurchaseOrderDetail_Line IN (" + EvolvePurchaseOrderDetailLine + ") AND epod.EvolveItem_ID = eitm.EvolveItem_ID AND eitm.EvolveUom_ID = eu.EvolveUom_ID";

			    console.log("EvolvePurchaseOrderDetailLine ::", query)


			return await Evolve.SqlPool.request()
				.query(query);

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},


	getLocationList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('select EvolveLocation_Name,EvolveLocation_ID FROM EvolveLocation')
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
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
				console.log("podetails_receive_qty :", podetails_receive_qty);
				console.log("po_qty_final : ", po_qty_final);
				console.log("po_receive_qty :", po_receive_qty);
				console.log("po_qty : ", po_qty);

				if (po_receive_qty > po_qty || po_qty_final > po_qty) // 0 > 25 || 1 > 25
				{
					return new Error('PO received QTY must be less then ordered QTY');
				}
				else {
					return await Evolve.SqlPool.request()
						.input('EvolvePurchaseOrderDetail_ID', Evolve.Sql.Int, po_detail_id)
						.input('EvolvePurchaseOrderDetail_QuantityReceived', Evolve.Sql.Int, po_qty_final)
						.input('EvolvePurchaseOrderDetail_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
						.input('EvolvePurchaseOrderDetail_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
						.query('Update EvolvePurchaseOrderDetail set EvolvePurchaseOrderDetail_QuantityReceived = @EvolvePurchaseOrderDetail_QuantityReceived,EvolvePurchaseOrderDetail_UpdatedUser =@EvolvePurchaseOrderDetail_UpdatedUser, EvolvePurchaseOrderDetail_UpdatedAt =@EvolvePurchaseOrderDetail_UpdatedAt  where EvolvePurchaseOrderDetail_ID = @EvolvePurchaseOrderDetail_ID');
				}
			}
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getBarcodeDetails: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('select * from EvolveWMSSetting ');

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	updateNextNumBarcode: async function (last_num, id) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveWMS_SettingID', Evolve.Sql.Int, id)
				.input('EvolveWMS_SettingsPallateBarEnd', Evolve.Sql.Int, last_num)
				.query('Update EvolveWMSSetting set EvolveWMS_SettingsPallateBarEnd = @EvolveWMS_SettingsPallateBarEnd where EvolveWMS_SettingID =@EvolveWMS_SettingID');
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	receivePurchaseOrder: async function (data) {
		try {
			//return data;
			console.log("req.body.EvolveInventory_Refnumber :", data.EvolveInventory_Refnumber)
			let po_details = await Evolve.SqlPool.request()
				.input('EvolvePurchaseOrderDetail_ID', Evolve.Sql.Int, parseInt(data.EvolvePurchaseOrderDetail_ID))
				.query('SELECT * FROM EvolvePurchaseOrderDetail WHERE EvolvePurchaseOrderDetail_ID = @EvolvePurchaseOrderDetail_ID')
			if (po_details instanceof Error || po_details.rowsAffected < 1) {
				// console.log(po_details);	   
				//Evolve.Log.Error("Error In Getting PO Details",po_details);
				return new Error('Error In Getting PO Details');
			} else {
				let item_id = po_details.recordset[0].EvolveItem_ID;
				let EvolveItem = await Evolve.SqlPool.request()
					.input('EvolveItem_ID', Evolve.Sql.Int, item_id)
					.query('select EvolveLocation_ID from EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID')
				if (EvolveItem instanceof Error || EvolveItem.rowsAffected < 1) {
					// console.log(EvolveItem);	   
					return new Error('Error In Getting PO Details');
				} else {
					let po_receive_qty = po_details.recordset[0].EvolvePurchaseOrderDetail_QuantityReceived;
					let po_qty = po_details.recordset[0].EvolvePurchaseOrderDetail_QuantityOrdered;
					let po_qty_final = parseInt(po_receive_qty) + parseInt(data.EvolvePurchaseOrderDetail_QuantityReceived);
					// let po_qty_final = parseInt(po_receive_qty) + parseInt(data.EvolvePurchaseOrderDetail_QuantityReceived);
					if (po_receive_qty > po_qty || po_qty_final > po_qty) {
						return new Error('PO received QTY must be less then ordered QTY');
					} else {
						let date = new Date();
						let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
						let inserted_inventory = await Evolve.SqlPool.request()
							.input('EvolvePurchaseOrderDetail_ID', Evolve.Sql.Int, parseInt(data.EvolvePurchaseOrderDetail_ID))
							.input('EvolvePurchaseOrderDetail_QuantityReceived', Evolve.Sql.Int, data.EvolvePurchaseOrderDetail_QuantityReceived)
							.input('EvolveInventory_LotNumber', Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
							.input('EvolveInventory_RefNumber', Evolve.Sql.NVarChar, data.EvolveInventory_Refnumber)
							.input('EvolveItem_ID', Evolve.Sql.Int, parseInt(item_id))
							.input('EvolveInventory_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
							.input('EvolveInventory_CreatedAt', Evolve.Sql.NVarChar, dataTime)
							.input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
							.query('INSERT INTO EvolveInventory (EvolveItem_ID,EvolveInventory_QtyOnHand,EvolveInventory_LotNumber,EvolveInventory_RefNumber,EvolveInventory_CreatedUser,EvolveInventory_CreatedAt,EvolveLocation_ID) VALUES (@EvolveItem_ID,@EvolvePurchaseOrderDetail_QuantityReceived,@EvolveInventory_LotNumber,@EvolveInventory_RefNumber,@EvolveInventory_CreatedUser,@EvolveInventory_CreatedAt,@EvolveLocation_ID);select @@IDENTITY AS \'inserted_id\'');

						if (inserted_inventory instanceof Error || inserted_inventory.rowsAffected < 1) {
							return new Error('Error In Getting while Invetory updating');
						} else {
							// await Evolve.App.Services.Wms.EwsServices.updatePurchaseOrder(data.EvolvePurchaseOrderDetail_ID,po_qty_final);
							let inventory_id = inserted_inventory.recordset[0].EvolveInventory_ID
							// let add_history =  await Evolve.SqlPool.request()
							// .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
							// .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
							// .input('EvolveApplication_ID', Evolve.Sql.Int, 3)
							// .input('EvolveTransitionHistory_TypeID', Evolve.Sql.Int, 1)
							// .input('EvolveTransitionHistory_DocumentID', Evolve.Sql.Int, po_details.EvolvePurchaseOrder_ID)
							// .input('EvolveTransitionHistory_DocumentDetailID', Evolve.Sql.Int, po_details.EvolvePurchaseOrderDetail_ID)
							// //.input('EvolveLocation_ID', Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
							// .input('EvolveItem_ID', Evolve.Sql.Int, parseInt(item_id))
							// //.input('EvolveUOM_ID', )
							// //.input('EvolveTransitionHistory_AddressID' )
							// .input('EvolveInventory_ID',Evolve.Sql.Int,  inventory_id)
							// .input('EvolveTransitionHistory_Quantity',Evolve.Sql.Int, parseInt(data.EvolvePurchaseOrderDetail_QuantityReceived))
							// //.input('EvolveTransitionHistory_Shiptype',Evolve.Sql.Int, data.EvolveUser_ID)
							// .input('EvolveTransitionHistory_createdDatetime',Evolve.Sql.NVarChar, dataTime)
							// .input('EvolveTransitionHistory_UserID',Evolve.Sql.Int, data.EvolveUser_ID)
							// .query('INSERT INTO EvolveTranstionHistory (EvolveCompany_ID,EvolveUnit_ID,EvolveApplication_ID,EvolveTransitionHistory_TypeID,EvolveTransitionHistory_DocumentID,EvolveTransitionHistory_DocumentDetailID,EvolveItem_ID,EvolveInventory_ID,EvolveTransitionHistory_Quantity,EvolveTransitionHistory_UserID,EvolveTransitionHistory_createdDatetime) VALUES (@EvolveCompany_ID,@EvolveUnit_ID,@EvolveApplication_ID,@EvolveTransitionHistory_TypeID,@EvolveTransitionHistory_DocumentID,@EvolveTransitionHistory_DocumentDetailID,@EvolveItem_ID,@EvolveInventory_ID,@EvolveTransitionHistory_Quantity,@EvolveTransitionHistory_UserID,@EvolveTransitionHistory_createdDatetime);select @@IDENTITY AS \'inserted_id\'');

							let history_Data = {
								'EvolveCompany_ID': data.EvolveUnit_ID,
								'EvolveUnit_ID': data.EvolveUnit_ID,
								'EvolveApplication_ID': 3,
								'EvolveTranstype_code': 'receivePurchaseOrder',
								'EvolveTransitionHistory_DocumentID': po_details.EvolvePurchaseOrder_ID,
								'EvolveTransitionHistory_DocumentDetailID': po_details.EvolvePurchaseOrderDetail_ID,
								'EvolveLocation_ID': null,
								'EvolveItem_ID': parseInt(item_id),
								'EvolveUOM_ID': null,
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
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	// Supplier
	getSupplierById: async function (EvolveSupplier_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveSupplier_ID', Evolve.Sql.Int, EvolveSupplier_ID)
				.query('select * from EvolveSupplier WHERE EvolveSupplier_ID =@EvolveSupplier_ID')
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	// Move Pallets

	getInventoryItemNumber: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('select DISTINCT eitm.EvolveItem_Code, eitm.EvolveItem_ID  from EvolveInventory einv, EvolveItem eitm WHERE einv.EvolveItem_ID = eitm.EvolveItem_ID')
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},


	getPalletList: async function () {
		try {
			let query = "SELECT eloc.EvolveLocation_Name,einv.EvolveInventory_ID,einv.EvolveLocation_ID,einv.EvolveInventory_RefNumber,einv.EvolveInventory_QtyOnHand,einv.EvolveInventory_LotNumber , eu.EvolveUom_Type , ei.EvolveItem_Code  from EvolveInventory einv, EvolveLocation eloc , EvolveItem ei , EvolveUom eu WHERE eloc.EvolveLocation_ID = einv.EvolveLocation_ID AND ei.EvolveItem_ID = einv.EvolveItem_ID AND eu.EvolveUom_ID = ei.EvolveUom_ID ORDER BY einv.EvolveInventory_ID DESC";
			return await Evolve.SqlPool.request().query(query);

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getPalletListByRefnumber: async function (EvolveInventory_RefNumber) {
		try {
			let query = "SELECT eloc.EvolveLocation_Name,einv.EvolveInventory_ID,einv.EvolveLocation_ID,einv.EvolveInventory_RefNumber,einv.EvolveInventory_QtyOnHand,einv.EvolveInventory_LotNumber ,eu.EvolveUom_Type , ei.EvolveItem_Code  from EvolveInventory einv, EvolveLocation eloc , EvolveItem ei, EvolveUom eu  WHERE eloc.EvolveLocation_ID = einv.EvolveLocation_ID AND EvolveInventory_RefNumber ='" + EvolveInventory_RefNumber + "' AND ei.EvolveItem_ID = einv.EvolveItem_ID AND eu.EvolveUom_ID = ei.EvolveUom_ID ORDER BY einv.EvolveInventory_ID DESC";
			return await Evolve.SqlPool.request().query(query);

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getPalletListByItemId: async function (EvolveItem_ID) {
		try {

			let EvolveItemIDs = EvolveItem_ID.toString();
			let query = "SELECT eloc.EvolveLocation_Name,einv.EvolveInventory_ID,einv.EvolveLocation_ID,einv.EvolveInventory_RefNumber,einv.EvolveInventory_QtyOnHand,einv.EvolveInventory_LotNumber , eu.EvolveUom_Type , ei.EvolveItem_Code  from EvolveInventory einv, EvolveLocation eloc ,EvolveItem ei, EvolveUom eu  WHERE einv.EvolveItem_ID IN (" + EvolveItemIDs + ") AND eloc.EvolveLocation_ID = einv.EvolveLocation_ID AND ei.EvolveItem_ID = einv.EvolveItem_ID AND eu.EvolveUom_ID = ei.EvolveUom_ID ORDER BY einv.EvolveInventory_ID DESC";

			return await Evolve.SqlPool.request().query(query);

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getPalletListByItemIdAndRefnumber: async function (EvolveItem_ID, EvolveInventory_RefNumber) {
		try {
			let EvolveItemIDs = EvolveItem_ID.toString();

			let query = "SELECT eloc.EvolveLocation_Name,einv.EvolveInventory_ID,einv.EvolveLocation_ID,einv.EvolveInventory_RefNumber,einv.EvolveInventory_QtyOnHand,einv.EvolveInventory_LotNumber , eu.EvolveUom_Type , ei.EvolveItem_Code from EvolveInventory einv, EvolveLocation eloc ,EvolveItem ei, EvolveUom eu WHERE einv.EvolveItem_ID IN (" + EvolveItemIDs + ") AND eloc.EvolveLocation_ID = einv.EvolveLocation_ID AND EvolveInventory_RefNumber ='" + EvolveInventory_RefNumber + "' AND ei.EvolveItem_ID = einv.EvolveItem_ID AND eu.EvolveUom_ID = ei.EvolveUom_ID ORDER BY einv.EvolveInventory_ID DESC";

			return await Evolve.SqlPool.request().query(query);

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	// getPalletListExternalByItemId: async function (EvolveItem_ID) {
	//     try {
	//         // console.log("EvolveItem_ID >>>", EvolveItem_ID)
	//         return await Evolve.SqlPool.request()
	//         .query("SELECT eloc.EvolveLocation_Name,einv.EvolveInventory_ID,einv.EvolveLocation_ID,einv.EvolveInventory_RefNumber,einv.EvolveInventory_QtyOnHand,einv.EvolveInventory_LotNumber , eu.EvolveUom_Type , ei.EvolveItem_Code from EvolveInventory einv, EvolveLocation eloc ,EvolveItem ei, EvolveUom eu WHERE eloc.EvolveLocation_Type = 'I' AND einv.EvolveItem_ID IN ("+EvolveItem_ID+") AND eloc.EvolveLocation_ID = einv.EvolveLocation_ID AND ei.EvolveItem_ID = einv.EvolveItem_ID AND eu.EvolveUom_ID = ei.EvolveUom_ID")
	//     } catch (error) {
	//         Evolve.Log.error(error.message);
	//         return new Error(error.message);
	//     }
	// },

	// getPalletListExternalByItemIdAndRefnumber: async function (EvolveItem_ID,EvolveInventory_RefNumber) {
	//     try {
	//         return await Evolve.SqlPool.request()
	//         .input('EvolveInventory_RefNumber', Evolve.Sql.NVarChar, EvolveInventory_RefNumber)
	//         .query("SELECT eloc.EvolveLocation_Name,einv.EvolveInventory_ID,einv.EvolveLocation_ID,einv.EvolveInventory_RefNumber,einv.EvolveInventory_QtyOnHand,einv.EvolveInventory_LotNumber , eu.EvolveUom_Type , ei.EvolveItem_Code  from EvolveInventory einv, EvolveLocation eloc , EvolveItem ei, EvolveUom eu WHERE eloc.EvolveLocation_Type = 'I' AND einv.EvolveItem_ID IN ("+EvolveItem_ID+") AND eloc.EvolveLocation_ID = einv.EvolveLocation_ID AND EvolveInventory_RefNumber =@EvolveInventory_RefNumber AND ei.EvolveItem_ID = einv.EvolveItem_ID AND eu.EvolveUom_ID = ei.EvolveUom_ID")
	//     } catch (error) {
	//         Evolve.Log.error(error.message);
	//         return new Error(error.message);
	//     }
	// },

	getPalletListExternalByItemIDAndRefnumber: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
				.input('EvolveInventory_RefNumber', Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
				.query("SELECT eloc.EvolveLocation_Name,einv.EvolveInventory_ID,einv.EvolveLocation_ID,einv.EvolveInventory_RefNumber,einv.EvolveInventory_QtyOnHand,einv.EvolveInventory_LotNumber,eu.EvolveUom_Type,ei.EvolveItem_Code  from EvolveInventory einv, EvolveLocation eloc , EvolveItem ei, EvolveUom eu WHERE eloc.EvolveLocation_Type = 'I' AND ei.EvolveItem_ID = @EvolveItem_ID AND einv.EvolveItem_ID = ei.EvolveItem_ID AND eloc.EvolveLocation_ID = einv.EvolveLocation_ID AND EvolveInventory_RefNumber = @EvolveInventory_RefNumber AND ei.EvolveItem_ID = einv.EvolveItem_ID AND eu.EvolveUom_ID = ei.EvolveUom_ID")
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getToLocationList: async function (EvolveLocation_ID) {
		try {
			return await Evolve.SqlPool.request(EvolveLocation_ID)
				.input('EvolveLocation_ID', Evolve.Sql.Int, EvolveLocation_ID)
				.query("select EvolveLocation_Name,EvolveLocation_ID FROM EvolveLocation WHERE EvolveLocation_ID !=@EvolveLocation_ID AND EvolveLocation_Type = 'I'")
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getReasonList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('select EvolveReason_ID,EvolveReason_Name FROM EvolveReason')
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getInventoryById: async function (EvolveInventory_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveInventory_ID', Evolve.Sql.Int, EvolveInventory_ID)
				.query('select EvolveInventory_QtyOnHand , EvolveItem_ID , EvolveInventory_LotNumber , EvolveInventory_RefNumber from EvolveInventory WHERE  EvolveInventory_ID =@EvolveInventory_ID')
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	movePalletCheckInv: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
				.input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveToLocation_ID)
				.input('EvolveInventory_RefNumber', Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
				.query('select EvolveInventory_ID,EvolveInventory_QtyOnHand from EvolveInventory WHERE EvolveItem_ID = @EvolveItem_ID AND EvolveLocation_ID = @EvolveLocation_ID AND EvolveInventory_RefNumber = @EvolveInventory_RefNumber')
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	movePalletInsert: async function (data, inv_data) {
		// console.log(data);
		try {
			let date = new Date();
			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();


			return await Evolve.SqlPool.request()
				.input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
				.input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveToLocation_ID)
				.input('EvolveInventory_QtyOnHand', Evolve.Sql.Int, data.EvolveInventory_QtyAllocated)
				.input('EvolveInventory_LotNumber', Evolve.Sql.NVarChar, inv_data.EvolveInventory_LotNumber)
				.input('EvolveInventory_RefNumber', Evolve.Sql.NVarChar, inv_data.EvolveInventory_RefNumber)
				.input('EvolveReason_ID', Evolve.Sql.Int, inv_data.EvolveReason_ID)

				.input('EvolveInventory_CreatedAt', Evolve.Sql.NVarChar, dataTime)
				.input('EvolveInventory_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
				.input('EvolveInventory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

				.query('INSERT INTO EvolveInventory (EvolveItem_ID,EvolveLocation_ID,EvolveInventory_QtyOnHand,EvolveInventory_LotNumber,EvolveInventory_RefNumber,EvolveReason_ID,EvolveInventory_CreatedAt,EvolveInventory_CreatedUser,EvolveInventory_UpdatedAt,EvolveInventory_UpdatedUser) VALUES(@EvolveItem_ID,@EvolveLocation_ID,@EvolveInventory_QtyOnHand,@EvolveInventory_LotNumber,@EvolveInventory_RefNumber,@EvolveReason_ID,@EvolveInventory_CreatedAt,@EvolveInventory_CreatedUser,@EvolveInventory_UpdatedAt,@EvolveInventory_UpdatedUser)')
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	movePalletHistory: async function (data) {
		let date = new Date();
		let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
		// let add_history =  await Evolve.SqlPool.request()
		// .input('EvolveCompany_ID', Evolve.Sql.Int, 1)
		// .input('EvolveUnit_ID', Evolve.Sql.Int, 1)
		// .input('EvolveApplication_ID', Evolve.Sql.Int, 1)
		// .input('EvolveTransitionHistory_TypeID', Evolve.Sql.Int, 1)
		// .input('EvolveTransitionHistory_DocumentID', Evolve.Sql.Int, data.EvolveInventory_ID)
		// .input('EvolveItem_ID', Evolve.Sql.Int, parseInt(data.EvolveItem_ID))
		// .input('EvolveReason_ID', Evolve.Sql.Int, parseInt(data.EvolveReason_ID))

		// .input('EvolveInventory_ID',Evolve.Sql.Int,  data.EvolveInventory_ID)
		// .input('EvolveTransitionHistory_Quantity',Evolve.Sql.Int, parseInt(data.EvolveInventory_QtyOnHand))
		// .input('EvolveTransitionHistory_createdDatetime',Evolve.Sql.NVarChar, dataTime)
		// .input('EvolveTransitionHistory_UserID',Evolve.Sql.Int, data.EvolveUser_ID)
		// .query('INSERT INTO EvolveTranstionHistory (EvolveCompany_ID,EvolveUnit_ID,EvolveApplication_ID,EvolveTransitionHistory_TypeID,EvolveTransitionHistory_DocumentID,EvolveItem_ID,EvolveReason_ID,EvolveInventory_ID,EvolveTransitionHistory_Quantity,EvolveTransitionHistory_UserID,EvolveTransitionHistory_createdDatetime) VALUES (@EvolveCompany_ID,@EvolveUnit_ID,@EvolveApplication_ID,@EvolveTransitionHistory_TypeID,@EvolveTransitionHistory_DocumentID,@EvolveItem_ID,@EvolveReason_ID,@EvolveInventory_ID,@EvolveTransitionHistory_Quantity,@EvolveTransitionHistory_UserID,@EvolveTransitionHistory_createdDatetime);select @@IDENTITY AS \'inserted_id\'');

		let history_Data = {
			'EvolveCompany_ID': data.EvolveUnit_ID,
			'EvolveUnit_ID': data.EvolveUnit_ID,
			'EvolveApplication_ID': 3,
			'EvolveTranstype_code': 'movePallet',
			'EvolveTransitionHistory_DocumentID': data.EvolveInventory_ID,
			'EvolveTransitionHistory_DocumentDetailID': null,
			'EvolveLocation_ID': null,
			'EvolveItem_ID': parseInt(data.EvolveItem_ID),
			'EvolveUOM_ID': null,
			'EvolveInventoryStatus_ID': null,
			'EvolveTransitionHistory_AddressID': null,
			'EvolveInventory_ID': data.EvolveInventory_ID,
			'EvolveTransitionHistory_Quantity': parseInt(data.EvolveInventory_QtyOnHand),
			'EvolveTransitionHistory_Shiptype': null,
			'EvolveTransitionHistory_SequenceId': null,
			'EvolveTransitionHistory_UserID': data.EvolveUser_ID,
			'EvolveMachine_ID': null,
			'EvolveReason_ID': parseInt(data.EvolveReason_ID),
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
	},

	movePalletUpdate: async function (EvolveInventory_ID, qty, EvolveReason_ID, EvolveUser_ID) {
		try {
			let date = new Date();
			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
			return await Evolve.SqlPool.request()
				.input('EvolveInventory_ID', Evolve.Sql.Int, EvolveInventory_ID)
				.input('EvolveInventory_QtyOnHand', Evolve.Sql.Int, qty)
				.input('EvolveReason_ID', Evolve.Sql.Int, EvolveReason_ID)
				.input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
				.input('EvolveInventory_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
				.query('UPDATE EvolveInventory SET EvolveInventory_QtyOnHand = @EvolveInventory_QtyOnHand , EvolveReason_ID = @EvolveReason_ID, EvolveInventory_UpdatedAt = @EvolveInventory_UpdatedAt, EvolveInventory_UpdatedUser = @EvolveInventory_UpdatedUser  WHERE EvolveInventory_ID = @EvolveInventory_ID')
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	movePallet: async function (data) {
		try {
			let date = new Date();
			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
			return await Evolve.SqlPool.request()
				.input('EvolveInventory_ID', Evolve.Sql.Int, data.EvolveInventory_ID)
				.input('EvolveInventory_QtyOnHand', Evolve.Sql.Int, data.EvolveInventory_QtyOnHand)
				.input('EvolveReason_ID', Evolve.Sql.Int, data.EvolveReason_ID)
				.input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
				.input('EvolveInventory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.query('UPDATE EvolveInventory SET EvolveInventory_QtyOnHand =@EvolveInventory_QtyOnHand , EvolveReason_ID = @EvolveReason_ID WHERE EvolveInventory_ID =@EvolveInventory_ID')
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	movePalletAndDeleteRow: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveInventory_ID', Evolve.Sql.Int, data.EvolveInventory_ID)
				.query('DELETE EvolveInventory WHERE EvolveInventory_ID =@EvolveInventory_ID')
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	// Production Booking




	getIssueListByItemId: async function (EvolveItem_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveItem_ID', Evolve.Sql.Int, EvolveItem_ID)
				.query('SELECT eloc.EvolveLocation_Name,einv.EvolveInventory_ID,einv.EvolveLocation_ID,einv.EvolveInventory_Refnumber,einv.EvolveInventory_QtyOnHand,einv.EvolveInventory_Lotnumber , einv.EvolveReason_ID , eu.EvolveUom_Type , ei.EvolveItem_Code  from EvolveInventory einv, EvolveLocation eloc , EvolveItem ei, EvolveUom eu   WHERE einv.EvolveItem_ID =@EvolveItem_ID AND eloc.EvolveLocation_ID = einv.EvolveLocation_ID AND ei.EvolveItem_ID = einv.EvolveItem_ID AND eu.EvolveUom_ID = ei.EvolveUom_ID') // AND er.EvolveReason_ID = einv.EvolveReason_ID
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},


	getIssueListByItemIdAndRefnumber: async function (EvolveItem_ID, EvolveInventory_Refnumber) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveInventory_Refnumber', Evolve.Sql.NVarChar, EvolveInventory_Refnumber)
				.input('EvolveItem_ID', Evolve.Sql.Int, EvolveItem_ID)
				.query('SELECT eloc.EvolveLocation_Name,einv.EvolveInventory_ID,einv.EvolveLocation_ID,einv.EvolveInventory_Refnumber,einv.EvolveInventory_QtyOnHand,einv.EvolveInventory_Lotnumber , einv.EvolveReason_ID , eu.EvolveUom_Type , ei.EvolveItem_Code  from EvolveInventory einv, EvolveLocation eloc , EvolveItem ei, EvolveUom eu   WHERE einv.EvolveItem_ID =@EvolveItem_ID AND eloc.EvolveLocation_ID = einv.EvolveLocation_ID AND EvolveInventory_Refnumber = @EvolveInventory_Refnumber AND ei.EvolveItem_ID = einv.EvolveItem_ID AND eu.EvolveUom_ID = ei.EvolveUom_ID') //AND er.EvolveReason_ID = einv.EvolveReason_ID

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},


	addIssue: async function (data) {
		try {
			let date = new Date();
			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
			let inv = await Evolve.SqlPool.request()
				.input('EvolveInventory_ID', Evolve.Sql.Int, data.EvolveInventory_ID)
				.query('SELECT * FROM EvolveInventory WHERE EvolveInventory_ID=@EvolveInventory_ID');
			let inv_data = inv.recordset[0]
			let remain_qty = parseInt(inv_data.EvolveInventory_QtyOnHand) - parseInt(data.EvolveInventory_QtyOnHand)
			let inv_update = await Evolve.SqlPool.request()
				.input('EvolveInventory_ID', Evolve.Sql.Int, data.EvolveInventory_ID)
				.input('EvolveInventory_QtyOnHand', Evolve.Sql.Int, remain_qty)
				.input('EvolveReason_ID', Evolve.Sql.Int, data.EvolveReason_ID)
				.input('EvolveInventory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
				.query('UPDATE EvolveInventory SET EvolveInventory_QtyOnHand=@EvolveInventory_QtyOnHand, EvolveReason_ID=@EvolveReason_ID, EvolveInventory_UpdatedAt =@EvolveInventory_UpdatedAt, EvolveInventory_UpdatedUser=@EvolveInventory_UpdatedUser WHERE EvolveInventory_ID= @EvolveInventory_ID');
			// console.log(remain_qty);

			// let add_history =  await Evolve.SqlPool.request()
			//     .input('EvolveCompany_ID', Evolve.Sql.Int, 1)
			//     .input('EvolveUnit_ID', Evolve.Sql.Int, 1)
			//     .input('EvolveApplication_ID', Evolve.Sql.Int, 1)
			//     .input('EvolveTransitionHistory_TypeID', Evolve.Sql.Int, 1)
			//     .input('EvolveTransitionHistory_DocumentID', Evolve.Sql.Int, inv_data.EvolveInventory_ID)
			//     .input('EvolveItem_ID', Evolve.Sql.Int, inv_data.EvolveItem_ID)
			//     .input('EvolveInventory_ID',Evolve.Sql.Int, inv_data.EvolveInventory_ID)
			//     .input('EvolveTransitionHistory_Quantity',Evolve.Sql.Int, parseInt(remain_qty))
			//     .input('EvolveTransitionHistory_createdDatetime',Evolve.Sql.NVarChar, dataTime)
			//     .input('EvolveTransitionHistory_UserID',Evolve.Sql.Int, data.EvolveUser_ID)
			//     .query('INSERT INTO EvolveTranstionHistory (EvolveCompany_ID,EvolveUnit_ID,EvolveApplication_ID,EvolveTransitionHistory_TypeID,EvolveTransitionHistory_DocumentID,EvolveItem_ID,EvolveInventory_ID,EvolveTransitionHistory_Quantity,EvolveTransitionHistory_createdDatetime,EvolveTransitionHistory_UserID) VALUES (@EvolveCompany_ID,@EvolveUnit_ID,@EvolveApplication_ID,@EvolveTransitionHistory_TypeID,@EvolveTransitionHistory_DocumentID,@EvolveItem_ID,@EvolveInventory_ID,@EvolveTransitionHistory_Quantity,@EvolveTransitionHistory_createdDatetime,@EvolveTransitionHistory_UserID);select @@IDENTITY AS \'inserted_id\'');
			let history_Data = {
				'EvolveCompany_ID': data.EvolveUnit_ID,
				'EvolveUnit_ID': data.EvolveUnit_ID,
				'EvolveApplication_ID': 3,
				'EvolveTranstype_code': 'invAdj',
				'EvolveTransitionHistory_DocumentID': inv_data.EvolveInventory_ID,
				'EvolveTransitionHistory_DocumentDetailID': null,
				'EvolveLocation_ID': null,
				'EvolveItem_ID': inv_data.EvolveItem_ID,
				'EvolveUOM_ID': null,
				'EvolveInventoryStatus_ID': null,
				'EvolveTransitionHistory_AddressID': null,
				'EvolveInventory_ID': inv_data.EvolveInventory_ID,
				'EvolveTransitionHistory_Quantity': parseInt(data.EvolveInventory_QtyOnHand),
				'EvolveTransitionHistory_Shiptype': null,
				'EvolveTransitionHistory_SequenceId': null,
				'EvolveTransitionHistory_UserID': data.EvolveUser_ID,
				'EvolveMachine_ID': null,
				'EvolveReason_ID': parseInt(data.EvolveReason_ID),
				'EvolveTool_ID': null,
				'EvolveActivity_ID': null,
				'EvolveTransitionHistory_Description': null,
			};
			let add_history = Evolve.App.Controllers.Unit.unitControllers.addTranstionHistory(history_Data)

			if (add_history instanceof Error || add_history.rowsAffected < 1) {
				return new Error('Error In Getting while Updating History');
			} else {
				return inv_update;
			}
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getProductionOrdersItemNumber: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('select *  from EvolveItem');
			// .query('select DISTINCT eitm.EvolveItem_Code, eitm.EvolveItem_ID  from EvolveProdOrders epo, EvolveItem eitm WHERE epo.EvolveItem_ID = eitm.EvolveItem_ID')

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},






	getProductionPlanList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query("SELECT epp.EvolveProdPlan_ID,epp.EvolveProdPlan_ProdDate,esh.EvolveShift_Name,es.EvolveSection_Name,epp.EvolveProdPlan_Status from EvolveProdPlan epp , EvolveSection es, EvolveShift esh WHERE epp.EvolveProdPlan_Status = 'open' AND epp.EvolveSection_ID = es.EvolveSection_ID AND epp.EvolveShift_ID = esh.EvolveShift_ID")
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},



	subContractorIssue: async function (data) {
		try {
			let date = new Date();
			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
			let pallet = data.pallet;
			let responceDate = [];
			let EvolveSupplier_ID = '';
			for (let i = 0; i < pallet.length; i++) {
				// Get Item Data
				let itemData = await Evolve.SqlPool.request()
					.input('EvolveItem_ID', Evolve.Sql.Int, pallet[i].EvolveItem_ID)
					.query('select ei.EvolveItem_ID,ei.EvolveItem_CODE,ei.EvolveItem_Desc,euom.EvolveUom_Type from EvolveItem ei,EvolveUom euom WHERE ei.EvolveItem_ID = @EvolveItem_ID AND ei.EvolveUom_ID  = euom.EvolveUom_ID')
				itemData = itemData.recordset[0];

				// Get Supplier data
				let get_sup_loc = await Evolve.SqlPool.request()
					.input('EvolveLocation_ID', Evolve.Sql.Int, pallet[i].EvolveLocation_ID)
					.query("select es.EvolveSupplier_ID FROM EvolveLocation el , EvolveSupplier es WHERE el.EvolveLocation_Type = 'E' AND es.EvolveSupplier_Code= el.EvolveLocation_Code AND el.EvolveLocation_ID = @EvolveLocation_ID ");
				let sup_data = get_sup_loc.recordset[0]
				let inv_id = pallet[i].EvolveInventory_ID;
				if (pallet[i].EvolveInventory_ID != '0') {  //Execute if item is traceble
					let inv = await Evolve.SqlPool.request()
						.input('EvolveInventory_ID', Evolve.Sql.Int, pallet[i].EvolveInventory_ID)
						.query('SELECT * FROM EvolveInventory WHERE EvolveInventory_ID=@EvolveInventory_ID');
					let inv_data = inv.recordset[0]
					let remain_qty = parseInt(inv_data.EvolveInventory_QtyOnHand) - parseInt(pallet[i].EvolveInventory_QtyOnHand);
					if (remain_qty == 0) {
						let inv_update = await Evolve.SqlPool.request()
							.input('EvolveInventory_ID', Evolve.Sql.Int, pallet[i].EvolveInventory_ID)
							.input('EvolveLocation_ID', Evolve.Sql.Int, pallet[i].EvolveLocation_ID)
							.input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
							.input('EvolveInventory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
							.query('UPDATE EvolveInventory SET EvolveLocation_ID=@EvolveLocation_ID, EvolveInventory_UpdatedAt =@EvolveInventory_UpdatedAt,EvolveInventory_UpdatedUser =@EvolveInventory_UpdatedUser WHERE EvolveInventory_ID= @EvolveInventory_ID');

						if (inv_update instanceof Error || inv_update.rowsAffected < 1) {
							return new Error('Error In Update Inventory');
						}

						inv_id = pallet[i].EvolveInventory_ID

					} // if(remain_qty == 0)
					else {
						let inv_update = await Evolve.SqlPool.request()
							.input('EvolveInventory_ID', Evolve.Sql.Int, pallet[i].EvolveInventory_ID)
							.input('EvolveInventory_QtyOnHand', Evolve.Sql.Int, remain_qty)
							.query('UPDATE EvolveInventory SET EvolveInventory_QtyOnHand=@EvolveInventory_QtyOnHand WHERE EvolveInventory_ID= @EvolveInventory_ID');

						if (inv_update instanceof Error || inv_update.rowsAffected < 1) {
							return new Error('Error In Update Inventory');
						}

						let inv_insert = await Evolve.SqlPool.request()
							.input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
							.input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
							.input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
							.input('EvolveLocation_ID', Evolve.Sql.Int, pallet[i].EvolveLocation_ID)
							.input('EvolveInventory_QtyOnHand', Evolve.Sql.Int, pallet[i].EvolveInventory_QtyOnHand)
							.input('EvolveInventory_LotNumber', Evolve.Sql.NVarChar, inv_data.EvolveInventory_LotNumber)
							.input('EvolveInventory_CreatedAt', Evolve.Sql.NVarChar, dataTime)
							.input('EvolveInventory_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
							.input('EvolveInventoryStatus_ID', Evolve.Sql.Int, inv_data.EvolveInventoryStatus_ID)
							.input('EvolveInventory_LotNotes', Evolve.Sql.NVarChar, inv_data.EvolveInventory_LotNotes)
							.query('INSERT INTO EvolveInventory(EvolveCompany_ID,EvolveUnit_ID,EvolveItem_ID,EvolveLocation_ID,EvolveInventory_QtyOnHand,EvolveInventory_LotNumber,EvolveInventory_CreatedAt,EvolveInventory_CreatedUser,EvolveInventoryStatus_ID,EvolveInventory_LotNotes) VALUES(@EvolveCompany_ID,@EvolveUnit_ID,@EvolveItem_ID,@EvolveLocation_ID,@EvolveInventory_QtyOnHand,@EvolveInventory_LotNumber,@EvolveInventory_CreatedAt,@EvolveInventory_CreatedUser,@EvolveInventoryStatus_ID,@EvolveInventory_LotNotes);select @@IDENTITY AS \'inserted_id\'');

						if (inv_insert instanceof Error) {
							return new Error('Error In Add Inventory');
						}

						inv_id = inv_insert.recordset[0].inserted_id
					} // if(remain_qty == 0) else 
				} //if(pallet[i].EvolveInventory_ID != '0')

				// Add Sub Contractor History --> EvolveSubConHistory

				let sub_con_add = await Evolve.SqlPool.request()
					.input('EvolveSupplier_ID', Evolve.Sql.Int, sup_data.EvolveSupplier_ID)
					.input('EvolveInventory_ID', Evolve.Sql.Int, inv_id)
					.input('EvolveInventory_Qty', Evolve.Sql.Int, pallet[i].EvolveInventory_QtyOnHand)
					.input('EvolveSubConHistory_CreatedAt', Evolve.Sql.NVarChar, dataTime)
					.input('EvolveSubConHistory_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
					.input('EvolveSubConHistory_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
					.input('EvolveSubConHistory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
					.query('INSERT INTO EvolveSubConHistory (EvolveSupplier_ID,EvolveInventory_ID,EvolveSubConHistory_CreatedAt,EvolveSubConHistory_CreatedUser,EvolveSubConHistory_UpdatedAt,EvolveSubConHistory_UpdatedUser) VALUES (@EvolveSupplier_ID,@EvolveInventory_ID,@EvolveSubConHistory_CreatedAt,@EvolveSubConHistory_CreatedUser,@EvolveSubConHistory_UpdatedAt,@EvolveSubConHistory_UpdatedUser) ');

				if (sub_con_add instanceof Error || sub_con_add.rowsAffected < 1) {
					return new Error('Error In Add Sub Contract History');
				}

				// Create record in history table --> EvolveTranstionHistory

				let history_Data = {
					'EvolveCompany_ID': data.EvolveCompany_ID,
					'EvolveUnit_ID': data.EvolveUnit_ID,
					'EvolveApplication_ID': 3,
					'EvolveTranstype_code': 'subConIssue',
					'EvolveTransitionHistory_DocumentID': inv_id,
					'EvolveTransitionHistory_DocumentDetailID': inv_id,
					'EvolveLocation_ID': pallet[i].EvolveLocation_ID,
					'EvolveItem_ID': parseInt(pallet[i].EvolveItem_ID),
					'EvolveUOM_ID': null,
					'EvolveInventoryStatus_ID': null,
					'EvolveTransitionHistory_AddressID': null,
					'EvolveInventory_ID': inv_id,
					'EvolveTransitionHistory_Quantity': parseInt(pallet[i].EvolveInventory_QtyOnHand),
					'EvolveTransitionHistory_Shiptype': null,
					'EvolveTransitionHistory_SequenceId': null,
					'EvolveTransitionHistory_UserID': data.EvolveUser_ID,
					'EvolveMachine_ID': null,
					'EvolveReason_ID': null,
					'EvolveTool_ID': null,
					'EvolveActivity_ID': null,
					'EvolveTransitionHistory_Description': null,
				};
				let EvolveTranstionHistoryResult = Evolve.App.Controllers.Unit.unitControllers.addTranstionHistory(history_Data)
				if (EvolveTranstionHistoryResult instanceof Error || EvolveTranstionHistoryResult.rowsAffected < 1) {
					Evolve.Log.Error("Error EvolveTranstionHistoryResult", EvolveTranstionHistoryResult);
					return new Error("Error EvolveTranstionHistoryResult")
				}

				responceDate.push({
					"EvolveItem_ID": itemData.EvolveItem_ID,
					"EvolveItem_CODE": itemData.EvolveItem_CODE,
					"EvolveItem_Desc": itemData.EvolveItem_Desc,
					"Qty": pallet[i].EvolveInventory_QtyOnHand,
					"UOM": itemData.EvolveUom_Type
				})

				EvolveSupplier_ID = sup_data.EvolveSupplier_ID;

			}


			let evolveSupplierData = await Evolve.SqlPool.request()
				.input('EvolveSupplier_ID', Evolve.Sql.Int, EvolveSupplier_ID)
				.query('SELECT * FROM EvolveSupplier WHERE EvolveSupplier_ID = @EvolveSupplier_ID')
			evolveSupplierData = evolveSupplierData.recordset[0];
			let result = {
				responceDate: responceDate,
				supplierData: evolveSupplierData
			}
			return result;

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getExternalLocationList: async function (EvolveLocation_ID) {
		try {
			return await Evolve.SqlPool.request()
				// .query("select EvolveLocation_Name,EvolveLocation_ID FROM EvolveLocation WHERE EvolveLocation_Type = 'E'")
				.query("select el.EvolveLocation_Name,el.EvolveLocation_ID FROM EvolveLocation el , EvolveSupplier es WHERE el.EvolveLocation_Type = 'E' AND es.EvolveSupplier_Code= el.EvolveLocation_Code");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},


	publishPlan: async function (data) {
		try {
			let date = new Date();
			let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
			var str = "" + 1;
			var pad = "0000";
			var wocount = pad.substring(0, pad.length - str.length) + str; //0001
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
			let wo_nbr = "WO" + newdate + "" + wocount //WO292190001
			let plan_data = await Evolve.SqlPool.request()
				.input('EvolveProdPlan_ID', Evolve.Sql.Int, data.EvolveProdPlan_ID)
				.query("SELECT * FROM EvolveProdPlan WHERE EvolveProdPlan_ID = @EvolveProdPlan_ID")
			let plan_details = plan_data.recordset[0]

			let planDetail_data = await Evolve.SqlPool.request()
				.input('EvolveProdPlan_ID', Evolve.Sql.Int, data.EvolveProdPlan_ID)
				.query("SELECT * FROM EvolveProdPlanDetail WHERE EvolveProdPlan_ID = @EvolveProdPlan_ID")
			let planDetail_details = planDetail_data.recordset

			for (let i = 0; i < planDetail_details.length; i++) {
				var crnt_datetime = dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate() + " " + dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds() + "." + dateObj.getMilliseconds();
				let planDetail_detail = planDetail_details[i];
				let check_wo = await Evolve.SqlPool.request()
					.query("SELECT TOP 1 EvolveProdOrders_Order From EvolveProdOrders ORDER BY EvolveProdOrders_ID DESC")
				if (check_wo.rowsAffected > 0) {
					var last_wo = check_wo.recordset[0].EvolveProdOrders_Order //WO282190001
					// console.log("last_wo >>>", check_wo)
					if (last_wo.indexOf(newdate) > -1) {
						let wo_new = parseInt(last_wo.substr(-4)) + 1 //0002 => 2
						let tmp = "" + wo_new
						wocount = pad.substring(0, pad.length - tmp.length) + tmp
						wo_nbr = "WO" + newdate + "" + wocount
						let wo_ins = await Evolve.SqlPool.request()
							.input('EvolveProdOrders_OrderId', Evolve.Sql.NVarChar, newdate + "" + wocount)
							.input('EvolveProdOrders_Order', Evolve.Sql.NVarChar, wo_nbr)
							.input('EvolveItem_ID', Evolve.Sql.Int, planDetail_detail.EvolveItem_ID)
							.input('EvolveProdOrders_Status', Evolve.Sql.NVarChar, 'open')
							.input('EvolveProdOrders_Quantity', Evolve.Sql.Int, planDetail_detail.EvolveProdPlanDetail_PlanQuantity)
							.input('EvolveUser_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
							.input('EvolveUser_CreatedAt', Evolve.Sql.NVarChar, dataTime)
							.input('EvolveUser_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
							.input('EvolveUser_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
							.input('EvolveProdPlan_ID', Evolve.Sql.Int, data.EvolveProdPlan_ID)
							.input('EvolveProdPlanDetail_ID', Evolve.Sql.Int, planDetail_detail.EvolveProdPlanDetail_PlanQuantity)
							.query("INSERT INTO EvolveProdOrders (EvolveProdOrders_OrderId,EvolveProdOrders_Order,EvolveItem_ID,EvolveProdOrders_Status,EvolveProdOrders_Quantity,EvolveUser_CreatedUser,EvolveUser_CreatedAt,EvolveUser_UpdatedUser,EvolveUser_UpdatedAt,EvolveProdPlan_ID,EvolveProdPlanDetail_ID) VALUES(@EvolveProdOrders_OrderId,@EvolveProdOrders_Order,@EvolveItem_ID,@EvolveProdOrders_Status,@EvolveProdOrders_Quantity,@EvolveUser_CreatedUser,@EvolveUser_CreatedAt,@EvolveUser_UpdatedUser,@EvolveUser_UpdatedAt,@EvolveProdPlan_ID,@EvolveProdPlanDetail_ID)")

						if (wo_ins instanceof Error || wo_ins.rowsAffected < 1) {
							return new Error('Error In Create Wo');
						}
					} else {
						let wo_ins = await Evolve.SqlPool.request()
							.input('EvolveProdOrders_OrderId', Evolve.Sql.NVarChar, newdate + "" + wocount)
							.input('EvolveProdOrders_Order', Evolve.Sql.NVarChar, wo_nbr)
							.input('EvolveItem_ID', Evolve.Sql.Int, planDetail_detail.EvolveItem_ID)
							.input('EvolveProdOrders_Status', Evolve.Sql.NVarChar, 'open')
							.input('EvolveProdOrders_Quantity', Evolve.Sql.Int, planDetail_detail.EvolveProdPlanDetail_PlanQuantity)
							.input('EvolveUser_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
							.input('EvolveUser_CreatedAt', Evolve.Sql.NVarChar, dataTime)
							.input('EvolveUser_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
							.input('EvolveUser_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
							.input('EvolveProdPlan_ID', Evolve.Sql.Int, data.EvolveProdPlan_ID)
							.input('EvolveProdPlanDetail_ID', Evolve.Sql.Int, planDetail_detail.EvolveProdPlanDetail_PlanQuantity)
							.query("INSERT INTO EvolveProdOrders (EvolveProdOrders_OrderId,EvolveProdOrders_Order,EvolveItem_ID,EvolveProdOrders_Status,EvolveProdOrders_Quantity,EvolveUser_CreatedUser,EvolveUser_CreatedAt,EvolveUser_UpdatedUser,EvolveUser_UpdatedAt,EvolveProdPlan_ID,EvolveProdPlanDetail_ID) VALUES(@EvolveProdOrders_OrderId,@EvolveProdOrders_Order,@EvolveItem_ID,@EvolveProdOrders_Status,@EvolveProdOrders_Quantity,@EvolveUser_CreatedUser,@EvolveUser_CreatedAt,@EvolveUser_UpdatedUser,@EvolveUser_UpdatedAt,@EvolveProdPlan_ID,@EvolveProdPlanDetail_ID)")

						if (wo_ins instanceof Error || wo_ins.rowsAffected < 1) {
							return new Error('Error In Create Wo');
						}
					}
				} else {
					let wo_ins = await Evolve.SqlPool.request()
						.input('EvolveProdOrders_OrderId', Evolve.Sql.NVarChar, newdate + "" + wocount)
						.input('EvolveProdOrders_Order', Evolve.Sql.NVarChar, wo_nbr)
						.input('EvolveItem_ID', Evolve.Sql.Int, planDetail_detail.EvolveItem_ID)
						.input('EvolveProdOrders_Status', Evolve.Sql.NVarChar, 'open')
						.input('EvolveProdOrders_Quantity', Evolve.Sql.Int, planDetail_detail.EvolveProdPlanDetail_PlanQuantity)
						.input('EvolveUser_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
						.input('EvolveUser_CreatedAt', Evolve.Sql.NVarChar, dataTime)
						.input('EvolveUser_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
						.input('EvolveUser_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
						.input('EvolveProdPlan_ID', Evolve.Sql.Int, data.EvolveProdPlan_ID)
						.input('EvolveProdPlanDetail_ID', Evolve.Sql.Int, planDetail_detail.EvolveProdPlanDetail_PlanQuantity)
						.query("INSERT INTO EvolveProdOrders (EvolveProdOrders_OrderId,EvolveProdOrders_Order,EvolveItem_ID,EvolveProdOrders_Status,EvolveProdOrders_Quantity,EvolveUser_CreatedUser,EvolveUser_CreatedAt,EvolveUser_UpdatedUser,EvolveUser_UpdatedAt,EvolveProdPlan_ID,EvolveProdPlanDetail_ID) VALUES(@EvolveProdOrders_OrderId,@EvolveProdOrders_Order,@EvolveItem_ID,@EvolveProdOrders_Status,@EvolveProdOrders_Quantity,@EvolveUser_CreatedUser,@EvolveUser_CreatedAt,@EvolveUser_UpdatedUser,@EvolveUser_UpdatedAt,@EvolveProdPlan_ID,@EvolveProdPlanDetail_ID)")

					if (wo_ins instanceof Error || wo_ins.rowsAffected < 1) {
						return new Error('Error In Create Wo');
					}
				}
			}
			let plan_update = await Evolve.SqlPool.request()
				.input('EvolveProdPlan_ID', Evolve.Sql.Int, data.EvolveProdPlan_ID)
				.input('EvolveProdPlan_Status', Evolve.Sql.NVarChar, 'published')
				.query("UPDATE EvolveProdPlan SET EvolveProdPlan_Status = @EvolveProdPlan_Status WHERE EvolveProdPlan_ID=@EvolveProdPlan_ID")

			if (plan_update instanceof Error || plan_update.rowsAffected < 1) {
				return new Error('Error In Create Wo');
			} else {
				return plan_update;
			}
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},




	getHistoryReportCountToday: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query("select count(EvolveTransitionHistory_ID) AS count from EvolveTranstionHistory WHERE CAST(EvolveTransitionHistory_createdDatetime as date)  = FORMAT(getdate(), 'yyyy-MM-dd')");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getHistoryReportDatatableListToday: async function (start, length) {
		try {
			// WHERE CAST(EvolveTransitionHistory_createdDatetime as date)  = FORMAT(getdate(), 'yyyy-MM-dd')
			return await Evolve.SqlPool.request()
				.input('start', Evolve.Sql.Int, start)
				.input('length', Evolve.Sql.Int, length)
				.query("select * from EvolveTranstionHistory  ORDER BY EvolveTransitionHistory_ID  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getHistoryReportCountFilterd: async function (startDate, endDate) {
		try {
			return await Evolve.SqlPool.request()
				.input('startDate', Evolve.Sql.NVarChar, startDate)
				.input('endDate', Evolve.Sql.NVarChar, endDate)
				.query("select count(EvolveTransitionHistory_ID) AS count from EvolveTranstionHistory WHERE CAST(EvolveTransitionHistory_createdDatetime as date)  >= @startDate AND CAST(EvolveTransitionHistory_createdDatetime as date)  <= @endDate");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getHistoryReportDatatableListFilterd: async function (startDate, endDate) {
		try {
			return await Evolve.SqlPool.request()
				.input('startDate', Evolve.Sql.NVarChar, startDate)
				.input('endDate', Evolve.Sql.NVarChar, endDate)
				.query("select * from EvolveTranstionHistory WHERE CAST(EvolveTransitionHistory_createdDatetime as date)  >= @startDate AND CAST(EvolveTransitionHistory_createdDatetime as date)  <= @endDate ORDER BY EvolveTransitionHistory_ID");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getInventoryReportCountList: async function (data) {
		try {
			let dt = data.startDate.split("/")
			let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
			//let startDate = sdt.getFullYear()+'-'+(sdt.getMonth()+1)+'-'+sdt.getDate();
			let startDate = data.startDate;

			let from = '';
			let where = '';
			if (data.item_code != '0') {
				where += " AND eiy.EvolveItem_ID = '" + data.item_code + "'"
			}
			if (data.location != '0') {
				let locations = data.location.split(',').toString();
				where += " AND eiy.EvolveLocation_ID IN (" + locations + ")"
			}
			if (data.location_type != '0') {
				where += " AND el.EvolveLocation_Type = '" + data.location_type + "'"
			}
			return await Evolve.SqlPool.request()
				.query("SELECT COUNT(eiy.EvolveInventory_ID) as count FROM  EvolveInventory eiy , EvolveLocation el " + from + " WHERE el.EvolveLocation_ID = eiy.EvolveLocation_ID AND (cast(eiy.EvolveInventory_CreatedAt as date) >= FORMAT(getdate(), '" + startDate + "') OR cast(eiy.EvolveInventory_UpdatedAt as date) >= FORMAT(getdate(), '" + startDate + "'))" + where);
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},



	getInventoryReportDatatableList: async function (start, length, data) {
		try {
			let dt = data.startDate.split("/")
			let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
			//let startDate = sdt.getFullYear()+'-'+(sdt.getMonth()+1)+'-'+sdt.getDate();
			let startDate = data.startDate;
			let where = '';
			if (data.item_code != '0') {
				where += " AND eiy.EvolveItem_ID = '" + data.item_code + "'"
			}
			if (data.location != '0') {
				let locations = data.location.split(',').toString();
				where += " AND eiy.EvolveLocation_ID IN (" + locations + ")"
			}
			if (data.location_type != '0') {
				where += " AND el.EvolveLocation_Type = '" + data.location_type + "'"
			}
			return await Evolve.SqlPool.request()
				.input('start', Evolve.Sql.Int, start)
				.input('length', Evolve.Sql.Int, length)
				.query("SELECT eiy.EvolveInventory_CreatedAt , eiy.EvolveInventory_UpdatedAt ,eim.EvolveItem_Code , el.EvolveLocation_Name , eiy.EvolveInventory_RefNumber ,eiy.EvolveInventory_QtyOnHand , eiy.EvolveInventory_LotNumber , eu.EvolveUom_Type ,(SELECT er.EvolveReason_Name FROM EvolveReason er WHERE er.EvolveReason_ID = eiy.EvolveReason_ID) as reason  FROM  EvolveInventory eiy , EvolveItem eim , EvolveLocation el , EvolveUom eu  WHERE eim.EvolveItem_ID = eiy.EvolveItem_ID AND eu.EvolveUom_ID = eim.EvolveUom_ID AND el.EvolveLocation_ID = eiy.EvolveLocation_ID AND (cast(eiy.EvolveInventory_CreatedAt as date) >= FORMAT(getdate(), '" + startDate + "') OR cast(eiy.EvolveInventory_UpdatedAt as date) >= FORMAT(getdate(), '" + startDate + "')) " + where + " ORDER BY eiy.EvolveInventory_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},


	subContractorReportCountList: async function (data) {
		try {
			let dt = data.startDate.split("/")
			let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
			let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
			dt = data.endDate.split("/")
			let edt = new Date(dt[2], dt[1] - 1, dt[0]);
			let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
			return await Evolve.SqlPool.request()
				.input('startDate', Evolve.Sql.NVarChar, startDate)
				.input('endDate', Evolve.Sql.NVarChar, endDate)
				.query("SELECT count(esch.EvolveSubConHistory_CreatedAt)  as count FROM EvolveSubConHistory esch WHERE CAST(esch.EvolveSubConHistory_CreatedAt as date) >= FORMAT(getdate(), @startDate) AND CAST(esch.EvolveSubConHistory_CreatedAt as date) <= FORMAT(getdate(), @endDate)");


		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	subContractorReportDatatableList: async function (start, length, data) {
		try {

			let dt = data.startDate.split("/")
			let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
			let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
			dt = data.endDate.split("/")
			let edt = new Date(dt[2], dt[1] - 1, dt[0]);
			let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
			return await Evolve.SqlPool.request()
				.input('start', Evolve.Sql.Int, start)
				.input('length', Evolve.Sql.Int, length)
				.input('startDate', Evolve.Sql.NVarChar, startDate)
				.input('endDate', Evolve.Sql.NVarChar, endDate)
				.query("SELECT esch.EvolveSubConHistory_ID , esch.EvolveSubConHistory_CreatedAt , es.EvolveSupplier_Code , eim.EvolveItem_Code , ei.EvolveInventory_QtyOnHand , eu.EvolveUom_Type , ei.EvolveInventory_LotNumber , eur.EvolveUser_Name FROM EvolveSubConHistory esch , EvolveInventory ei , EvolveSupplier es , EvolveItem eim , EvolveUom eu , EvolveUser eur WHERE esch.EvolveInventory_ID = ei.EvolveInventory_ID AND es.EvolveSupplier_ID = esch.EvolveSupplier_ID AND eim.EvolveItem_ID = ei.EvolveItem_ID AND eim.EvolveUom_ID = eu.EvolveUom_ID AND eur.EvolveUser_ID = esch.EvolveSubConHistory_CreatedUser AND CAST(esch.EvolveSubConHistory_CreatedAt as date) >= FORMAT(getdate(), @startDate) AND CAST(esch.EvolveSubConHistory_CreatedAt as date) <= FORMAT(getdate(), @endDate) ORDER BY esch.EvolveSubConHistory_ID  DESC  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	updateBarcodePrint: async function (id) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolvePurchaseOrderDetail_ID', Evolve.Sql.Int, id)
				.query("UPDATE EvolvePurchaseOrderDetail SET EvolvePurchaseOrderDetail_IsPrint = 1 WHERE EvolvePurchaseOrderDetail_ID=@EvolvePurchaseOrderDetail_ID")
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	checkItemTrackable: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
				.query('select ei.EvolveItem_Code , ei.EvolveItem_InventoryTrackable , eu.EvolveUom_Type from EvolveItem ei , EvolveUom eu WHERE  ei.EvolveItem_ID = @EvolveItem_ID AND eu.EvolveUom_ID = ei.EvolveUom_ID')
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getItem: async function (search) {
		try {
			let query = "SELECT EvolveItem_Code as title , EvolveItem_ID as id FROM EvolveItem WHERE EvolveItem_Code LIKE  '%" + search + "%'"
			return await Evolve.SqlPool.request().query(query);
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},


	// //  <<<<---------- Get Exit  ---------->>>>>

	// getallInvoice: async function () {
	//     try {
	//         return await Evolve.SqlPool.request()
	//             .query("SELECT * from EvolveInvoice where EvolveInvoice_Status = 'open' ");
	//     } catch (error) {
	//         Evolve.Log.error(error.message);
	//         return new Error(error.message);
	//     }
	// },
	getSingleInvoice: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveInvoice_ID', Evolve.Sql.Int, data.EvolveInvoice_ID)
				.query('SELECT * from EvolveInvoice where EvolveInvoice_ID = @EvolveInvoice_ID');

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	getDoSoNo: async function (EvolveInvoice_SONumber) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveInvoice_SONumber', Evolve.Sql.NVarChar, EvolveInvoice_SONumber)
				.query("SELECT * from EvolveDo where EvolveDO_SONumber = @EvolveInvoice_SONumber AND EvolveDO_Status = 'open' ");

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	getSingleSalesOrder: async function (EvolveInvoice_SONumber) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveInvoice_SONumber', Evolve.Sql.NVarChar, EvolveInvoice_SONumber)
				.query("SELECT eso.*, esup.EvolveSupplier_Name FROM EvolveSalesOrder eso join EvolveSupplier esup ON esup.EvolveSupplier_Code = eso.EvolveSalesOrder_Billto WHERE EvolveSalesOrder_Number = 'S1902673' AND EvolveSalesOrder_Status = 'open'");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	getSingleDo: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveDO_ID', Evolve.Sql.Int, data.EvolveDO_ID)
				.query("SELECT ed.*,edl.* from EvolveDo ed LEFT JOIN EvolveDoLine edl ON edl.EvolveDO_ID = @EvolveDO_ID WHERE ed.EvolveDO_ID = @EvolveDO_ID AND edl.EvolveDOLine_Status = 'open' ");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	getExitTableDate: async function (data) {
		try {
			if (data.EvolveInvoice_ID != '' && data.EvolveDO_ID == '') {
				return await Evolve.SqlPool.request()
					.input('EvolveInvoice_ID', Evolve.Sql.Int, data.EvolveInvoice_ID)
					.query("Select einv.EvolveInvoice_Number,einv.EvolveInvoice_CustCode,einv.EvolveInvoice_CustName, einvl.EvolveInvoiceItemList_PrdCode,einvl.EvolveInvoiceItemList_Qty, eso.EvolveSalesOrder_Number from EvolveInvoice einv inner join EvolveInvoiceItemList einvl on einv.EvolveInvoice_ID = einvl.EvolveInvoice_ID inner join EvolveSalesOrder eso on einv.EvolveInvoice_SONumber = eso.EvolveSalesOrder_Number where einv.EvolveInvoice_ID = @EvolveInvoice_ID");
			}
			else if (data.EvolveInvoice_ID != '' && data.EvolveDO_ID != '') {
				return await Evolve.SqlPool.request()
					.input('EvolveInvoice_ID', Evolve.Sql.Int, data.EvolveInvoice_ID)
					.input('EvolveDO_ID', Evolve.Sql.Int, data.EvolveDO_ID)
					.query("Select edol.EvolveDOLine_ID, einv.EvolveInvoice_Number,einv.EvolveInvoice_CustCode,einv.EvolveInvoice_CustName, einvl.EvolveInvoiceItemList_PrdCode,einvl.EvolveInvoiceItemList_Qty, eso.EvolveSalesOrder_Number,edol.EvolveDOLine_Part , edol.EvolveDOLine_QtyDO,edol.EvolveDOLine_QtyPDI, edol.EvolveDOLine_Status from EvolveInvoice einv inner join EvolveInvoiceItemList einvl on einv.EvolveInvoice_ID = einvl.EvolveInvoice_ID inner join EvolveSalesOrder eso on einv.EvolveInvoice_SONumber = eso.EvolveSalesOrder_Number inner join EvolveDO edo on einv.EvolveInvoice_SONumber = edo.EvolveDO_SONumber inner join EvolveDoLine edol on edo.EvolveDO_ID = edol.EvolveDO_ID where einv.EvolveInvoice_ID = @EvolveInvoice_ID and edo.EvolveDO_ID = @EvolveDO_ID and edo.EvolveDO_SONumber = eso.EvolveSalesOrder_Number and edol.EvolveDOLine_Part = einvl.EvolveInvoiceItemList_PrdCode order by einvl.EvolveInvoiceLine_ID asc ");
			}

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	addGetExit: async function (data) {
		try {
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
			return await Evolve.SqlPool.request()
				.input('EvolveGateExit_SerialNo', Evolve.Sql.NVarChar, data.EvolveGateExit_SerialNo)
				.input('EvolveDO_Number', Evolve.Sql.NVarChar, data.EvolveDO_Number)
				.input('EvolveDOLine_Number', Evolve.Sql.NVarChar, data.EvolveDOLine_Number)
				.input('EvolveGateExit_SoNumber', Evolve.Sql.NVarChar, data.EvolveGateExit_SoNumber)
				.input('EvolveGateExit_InvoiceNo', Evolve.Sql.NVarChar, data.EvolveGateExit_InvoiceNo)
				.input('EvolveGateExit_Transporter', Evolve.Sql.NVarChar, data.EvolveGateExit_Transporter)
				.input('EvolveGateExit_VehicleNumber', Evolve.Sql.NVarChar, data.EvolveGateExit_VehicleNumber)
				.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
				.input('dataTime', Evolve.Sql.NVarChar, dataTime)
				.query("INSERT INTO EvolveGateExitHistory (EvolveGateExit_SerialNo, EvolveDO_Number, EvolveDOLine_Number, EvolveGateExit_SoNumber, EvolveGateExit_InvoiceNo,EvolveGateExit_Transporter, EvolveGateExit_VehicleNumber, EvolveGateExit_CreatedUser, EvolveGateExit_CreatedAt, EvolveGateExit_UpdatedUser, EvolveGateExit_UpdatedAt) VALUES (@EvolveGateExit_SerialNo, @EvolveDO_Number, @EvolveDOLine_Number, @EvolveGateExit_SoNumber, @EvolveGateExit_InvoiceNo, @EvolveGateExit_Transporter, @EvolveGateExit_VehicleNumber, @EvolveUser_ID, @dataTime, @EvolveUser_ID, @dataTime)  ");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	getdoNumber: async function (EvolveDO_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveDO_ID', Evolve.Sql.NVarChar, EvolveDO_ID)
				.query("SELECT EvolveDO_Number FROM EvolveDo WHERE EvolveDO_ID = @EvolveDO_ID ");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	getdolineNumber: async function (EvolveDOLine_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveDOLine_ID', Evolve.Sql.NVarChar, EvolveDOLine_ID)
				.query("SELECT EvolveDOLine_Number FROM EvolveDoLine WHERE EvolveDOLine_ID = @EvolveDOLine_ID ");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	updateInvoiceStatus: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveGateExit_InvoiceNo', Evolve.Sql.Int, data.EvolveGateExit_InvoiceNo)
				.query("UPDATE EvolveInvoice SET EvolveInvoice_Status = 'close' WHERE  EvolveInvoice_ID = @EvolveGateExit_InvoiceNo");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	updateDOStatus: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveDO_ID', Evolve.Sql.Int, data.EvolveDO_ID)
				.query("UPDATE EvolveDo SET EvolveDO_Status = 'close' WHERE  EvolveDO_ID = @EvolveDO_ID");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	updateDOLineStatus: async function (EvolveDOLine_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveDOLine_ID', Evolve.Sql.Int, EvolveDOLine_ID)
				.query("UPDATE EvolveDoLine SET EvolveDOLine_Status = 'close' WHERE EvolveDOLine_ID = @EvolveDOLine_ID");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	getSOLine_Id: async function (EvolveDOLine_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveDOLine_ID', Evolve.Sql.Int, EvolveDOLine_ID)
				.query("SELECT EvolveSalesOrderLine_ID FROM EvolveDoLine WHERE EvolveDOLine_ID = @EvolveDOLine_ID");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	updateSOLineStatus: async function (SOLine_Id) {
		try {
			return await Evolve.SqlPool.request()
				.input('SOLine_Id', Evolve.Sql.Int, SOLine_Id)
				.query("UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_Status = 'close' WHERE EvolveSalesOrderLine_ID = @SOLine_Id");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	getOpenSOLineCnt: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveDO_ID', Evolve.Sql.Int, data.EvolveDO_ID)
				.query("SELECT COUNT(esol.EvolveSalesOrderLine_ID) AS openSoLines FROM EvolveDo ed , EvolveSalesOrder eso , EvolveSalesOrderLine esol WHERE ed.EvolveDO_ID = @EvolveDO_ID AND eso.EvolveSalesOrder_Number = ed.EvolveDO_SONumber AND esol.EvolveSalesOrder_ID = eso.EvolveSalesOrder_ID AND esol.EvolveSalesOrderLine_Status = 'open'");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	updateSoStatusByNumber: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveSalesOrder_Number', Evolve.Sql.NVarChar, data.EvolveGateExit_SoNumber)
				.query("UPDATE EvolveSalesOrder SET EvolveSalesOrder_Status = 'close' WHERE EvolveSalesOrder_Number = @EvolveSalesOrder_Number");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	getLocationDetails: async function (EvolveLocation_ID) {
		try {
			return await Evolve.SqlPool.request()
			.input('EvolveLocation_ID', Evolve.Sql.Int, EvolveLocation_ID)
				.query('SELECT EvolveLocation_Name FROM EvolveLocation WHERE EvolveLocation_ID = @EvolveLocation_ID')
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

}