'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
	getItemList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('SELECT EvolveItem_Desc1 ,  EvolveItem_ID, EvolveItem_Part ,  EvolveItem_IsUnloadingReq  FROM EvolveItem');
		} catch (error) {
			Evolve.Log.error(" EERR1112: Error while getting Item List "+error.message);
			return new Error(" EERR1112: Error while getting Item List "+error.message);
		}
	},

	getUomList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('SELECT EvolveUom_ID , EvolveUom_Uom   FROM EvolveUom');
		} catch (error) {
			Evolve.Log.error(" EERR1113: Error while getting Uom List "+error.message);
			return new Error(" EERR1113: Error while getting Uom List "+error.message);
		}
	},


	getSupplierList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('SELECT EvolveSupplier_ID , EvolveSupplier_Name , EvolveSupplier_Code FROM EvolveSupplier');
		} catch (error) {
			Evolve.Log.error(" EERR1114: Error while getting Supplier List "+error.message);
			return new Error(" EERR1114: Error while getting Supplier List "+error.message);
		}
	},

	getDocument: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query("SELECT EvolveDocumentType_ID , EvolveDocumentType_Name , EvolveDocumentType_Code FROM EvolveDocumentType WHERE EvolveDocument_Group = 'GATEIN'");
		} catch (error) {
			Evolve.Log.error(" EERR1115: Error while getting Document "+error.message);
			return new Error(" EERR1115: Error while getting Document "+error.message);
		}
	},

	checkEwayBillNoExist : async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveGate_EWBNumber", Evolve.Sql.NVarChar, data.ewbNo.toString())
				.query(" SELECT * FROM EvolveGate WHERE EvolveGate_EWBNumber = @EvolveGate_EWBNumber ");
		} catch (error) {
			Evolve.Log.error(" EERR####: Error while getting Check Eway Bill No Exist "+error.message);
			return new Error(" EERR####: Error while getting Check Eway Bill No Exist "+error.message);
		}
	},

	addGateDataMaterialIn: async function (data) {
		// console.log("addGateDataMaterialIn====================>", data);
		let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveGate_EWBNumber", Evolve.Sql.NVarChar, data.ewbNo.toString())
				.input("EvolveGate_RefNumber", Evolve.Sql.NVarChar, data.docNo)
				.input("EvolveGate_ModuleType", Evolve.Sql.NVarChar, data.EvolveGate_ModuleType)
				.input("EvolveGate_Direction", Evolve.Sql.Bit, 0)
				.input("EvolveGate_VehicleNumber", Evolve.Sql.NVarChar, data.VehiclListDetails[0].vehicleNo)
				.input("EvolveGate_Transpoter", Evolve.Sql.NVarChar, data.transporterName)
				.input("EvolveGate_DriverName", Evolve.Sql.NVarChar, data.EvolveGate_DriverName)
				.input("EvolveGate_DriverContact", Evolve.Sql.NVarChar, data.EvolveGate_DriverContact)
				.input("EvolveGate_Weight", Evolve.Sql.NVarChar, data.EvolveGate_Weight)
				.input("EvolveGate_Image", Evolve.Sql.NVarChar, data.EvolveGate_Image)
				.input("EvolveGate_IsMaterialUnload", Evolve.Sql.NVarChar, 0)
				.input("EvolveGate_PassNumber", Evolve.Sql.NVarChar, data.EvolveGate_PassNumber)
				.input("EvolveGate_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
				.input("EvolveGate_CreatedAt", Evolve.Sql.NVarChar, datetime)
				.input("EvolveGate_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
				.input("EvolveGate_UpdatedAt", Evolve.Sql.NVarChar, datetime)
				.query("INSERT INTO EvolveGate (EvolveGate_EWBNumber,EvolveGate_RefNumber,EvolveGate_ModuleType,EvolveGate_Direction,EvolveGate_VehicleNumber,EvolveGate_Transpoter,EvolveGate_DriverName,EvolveGate_DriverContact,EvolveGate_Image,EvolveGate_Weight, EvolveGate_IsMaterialUnload, EvolveGate_PassNumber, EvolveGate_UpdatedUser,EvolveGate_CreatedUser,EvolveGate_CreatedAt,EvolveGate_UpdatedAt) VALUES (@EvolveGate_EWBNumber , @EvolveGate_RefNumber,@EvolveGate_ModuleType,@EvolveGate_Direction,@EvolveGate_VehicleNumber,@EvolveGate_Transpoter,@EvolveGate_DriverName,@EvolveGate_DriverContact,@EvolveGate_Image,@EvolveGate_Weight,@EvolveGate_IsMaterialUnload, @EvolveGate_PassNumber, @EvolveGate_UpdatedUser,@EvolveGate_CreatedUser,@EvolveGate_CreatedAt,@EvolveGate_UpdatedAt);select @@IDENTITY AS 'inserted_id'");
		} catch (error) {
			Evolve.Log.error(" EERR1116: Error while adding Gate Data Material In "+error.message);
			return new Error(" EERR1116: Error while adding Gate Data Material In "+error.message);
		}
	},

	addGateDataDetailMaterialIn: async function (data, itemArray) {
		// console.log("addGateDataDetailMaterialIn2>>>>>>>>>>>", data);
		let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveGate_ID", Evolve.Sql.Int, data.EvolveGate_ID)
				.input("EvolveItem_ID", Evolve.Sql.Int, itemArray.EvolveItem_ID)
				.input("EvolveUom_ID", Evolve.Sql.Int, itemArray.EvolveUom_ID)
				.input('EvolveDocument_ID', Evolve.Sql.NVarChar, data.EvolveDocument_ID)
				.input("EvolveGateDetails_DocRefNum", Evolve.Sql.NVarChar, data.docNo)
				.input("EvolveGateDetails_Qty", Evolve.Sql.NVarChar, itemArray.quantity)
				.input("EvolveGateDetails_Status", Evolve.Sql.NVarChar, 'IN')
				.input("EvolveGateDetails_CreatedAt", Evolve.Sql.NVarChar, datetime)
				.input("EvolveGateDetails_CreatedUser", Evolve.Sql.NVarChar, data.EvolveUser_ID)
				.input("EvolveGateDetails_UpdatedAt", Evolve.Sql.NVarChar, datetime)
				.input("EvolveGateDetails_UpdatedUser", Evolve.Sql.NVarChar, data.EvolveUser_ID)
				.query("INSERT INTO EvolveGateDetails (EvolveGate_ID,EvolveItem_ID,EvolveUom_ID,EvolveDocument_ID,EvolveGateDetails_DocRefNum,EvolveGateDetails_Qty,EvolveGateDetails_Status,EvolveGateDetails_CreatedAt,EvolveGateDetails_CreatedUser,EvolveGateDetails_UpdatedAt,EvolveGateDetails_UpdatedUser) VALUES (@EvolveGate_ID,@EvolveItem_ID,@EvolveUom_ID,@EvolveDocument_ID,@EvolveGateDetails_DocRefNum,@EvolveGateDetails_Qty,@EvolveGateDetails_Status,@EvolveGateDetails_CreatedAt,@EvolveGateDetails_CreatedUser,@EvolveGateDetails_UpdatedAt,@EvolveGateDetails_UpdatedUser)");
		} catch (error) {
			Evolve.Log.error(" EERR1117: Error while adding Gate Data Detail Material In "+error.message);
			return new Error(" EERR1117: Error while adding Gate Data Detail Material In "+error.message);
		}
	},

	getSupplierPo: async function (EvolveSupplier_Code) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolveSupplier_Code", Evolve.Sql.NVarChar, EvolveSupplier_Code)
				.query("SELECT epo.EvolvePurchaseOrder_ID , epo.EvolvePurchaseOrder_Number FROM EvolveSupplier es , EvolvePurchaseOrder epo   WHERE es.EvolveSupplier_Code LIKE @EvolveSupplier_Code AND epo.EvolveSupplier_ID = es.EvolveSupplier_ID");
		} catch (error) {
			Evolve.Log.error(" EERR1118: Error while getting Supplier Po "+error.message);
			return new Error(" EERR1118: Error while getting Supplier Po "+error.message);
		}
	},

	getPoDetails: async function (EvolvePurchaseOrder_Number) {
		try {
			return await Evolve.SqlPool.request()
				.input("EvolvePurchaseOrder_Number", Evolve.Sql.NVarChar, EvolvePurchaseOrder_Number)
				.query("SELECT epo.EvolvePurchaseOrder_Number , epod.EvolveItem_ID , ei.EvolveItem_Code , ei.EvolveItem_Desc, epod.EvolveUOM_ID , eu.EvolveUom_Uom , epod.EvolvePurchaseOrderDetail_QuantityOrdered ,epod.EvolvePurchaseOrderDetail_Line, (SELECT SUM(egd.EvolveGateDetails_Qty) FROM EvolveGateDetails egd WHERE egd.EvolveGateDetails_DocRefNum LIKE epo.EvolvePurchaseOrder_Number AND egd.EvolveItem_ID = ei.EvolveItem_ID ) as already_received FROM EvolvePurchaseOrder epo , EvolvePurchaseOrderDetail epod INNER JOIN EvolveItem ei ON ei.EvolveItem_ID = epod.EvolveItem_ID INNER JOIN EvolveUom eu ON eu.EvolveUom_ID = epod.EvolveUOM_ID WHERE epo.EvolvePurchaseOrder_Number LIKE @EvolvePurchaseOrder_Number AND epod.EvolvePurchaseOrder_ID = epo.EvolvePurchaseOrder_ID");
		} catch (error) {
			Evolve.Log.error(" EERR1119: Error while getting Po Details "+error.message);
			return new Error(" EERR1119: Error while getting Po Details "+error.message);
		}
	},

	//Material In by Eway Bill Api

	getDocumentDetails : async function (EvolveDocument_Code) {
		try {
			console.log("code is>>>>" , EvolveDocument_Code);
			return await Evolve.SqlPool.request()
				.input('EvolveDocument_Code', Evolve.Sql.NVarChar, EvolveDocument_Code)
				.query(" SELECT * FROM EvolveDocument WHERE EvolveDocument_Code = @EvolveDocument_Code ");

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getEInvoiceGSPApiData: async function (EvolveGSP_ID, EvolveDocument_ID, EvolveGSPApi_Code) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveGSP_ID', Evolve.Sql.Int, EvolveGSP_ID)
				.input('EvolveGSPApi_Code', Evolve.Sql.NVarChar, EvolveGSPApi_Code)
				.query("SELECT  EGA.EvolveGSPApiAttributes_Datatype AS eGDT,EGA.EvolveGSPApiAttributes_ID AS eGID,EGA.EvolveGSPApiAttributes_Default AS eGDV, EGA.EvolveGSPApiAttributes_Parent AS eGP,EGA.EvolveGSPApiAttributes_Code AS eCD,EA.EvolveGSPApi_URL,EA.EvolveGSPApi_Method,EGA.EvolveGSPApiAttributes_Group AS eGRP ,EGA.EvolveGSPApiAttributes_IsDefault AS eGD FROM EvolveGSPApi EA,EvolveGSPApiAttributes EGA WHERE EA.EvolveGSP_ID = @EvolveGSP_ID AND EA.EvolveGSPApi_Code = @EvolveGSPApi_Code AND EGA.EvolveGSPApi_ID = EA.EvolveGSPApi_ID");

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getInvoiceHeaderValueFromUnit: async function (Feild_Key, EvolveUnit_ID) {
		try {
			let unitData = await Evolve.SqlPool.request()
				.input('EvolveUnit_ID', Evolve.Sql.Int, EvolveUnit_ID)
				.query("SELECT * FROM EvolveUnit WHERE EvolveUnit_ID = @EvolveUnit_ID");
			if (unitData.rowsAffected > 0) {
				if (Feild_Key == 'EvolveUnit_Gstin') {
					return unitData.recordset[0].EvolveUnit_Gstin;
				}
				if (Feild_Key == 'EvolveUnit_GstnUser') {
					return unitData.recordset[0].EvolveUnit_GstnUser;
				}
				if (Feild_Key == 'EvolveUnit_GstnPassEnc') {
					return unitData.recordset[0].EvolveUnit_GstnPassEnc;
				}
				if (Feild_Key == 'EvolveUnit_Rek') {
					return unitData.recordset[0].EvolveUnit_Rek;
				}
			} else {
				return "";
			}
		} catch (error) {
			Evolve.Log.error(error.message);
			return "";
		}
	},

	getAllActiveGsp: async function () {
		return await Evolve.SqlPool.request()
			.query("SELECT * FROM EvolveGSP WHERE EvolveGSP_Status = 'Active' ");
	},

	checkItemName : async function (EvolveItem_Code) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveItem_Code', Evolve.Sql.NVarChar, EvolveItem_Code)
				
				.query("SELECT * FROM EvolveItem WHERE EvolveItem_Desc1 = @EvolveItem_Code ");

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	checkItemNameDesc : async function (EvolveItem_Desc) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveItem_Desc', Evolve.Sql.NVarChar, EvolveItem_Desc)
				
				.query(" select * from EvolveItem where EvolveItem_Desc LIKE @EvolveItem_Desc");

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	checkUom : async function (EvolveUom_Uom) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveUom_Uom', Evolve.Sql.NVarChar, EvolveUom_Uom)
				
				.query("SELECT * FROM EvolveUom WHERE EvolveUom_Uom = @EvolveUom_Uom");

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	addUom : async function (EvolveUom_Uom, EvolveUser_ID) {
		try {
			let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
			return await Evolve.SqlPool.request()
				.input('EvolveUom_Uom', Evolve.Sql.NVarChar, EvolveUom_Uom)
				.input("EvolveUom_CreatedAt", Evolve.Sql.NVarChar, datetime)
				.input("EvolveUom_CreatedUser", Evolve.Sql.Int, EvolveUser_ID)
				.input("EvolveUom_UpdateAt", Evolve.Sql.NVarChar, datetime)
				.input("EvolveUom_UpdateUser", Evolve.Sql.Int, EvolveUser_ID)
				
				.query("INSERT INTO EvolveUom (EvolveUom_Uom, EvolveUom_CreatedAt, EvolveUom_CreatedUser, EvolveUom_UpdateAt, EvolveUom_UpdateUser) VALUES (@EvolveUom_Uom, @EvolveUom_CreatedAt, @EvolveUom_CreatedUser, @EvolveUom_UpdateAt, @EvolveUom_UpdateUser)");

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getDocumentTypeId : async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveDocumentType_Code', Evolve.Sql.NVarChar, data.EvolveDocumentType_Code)
				
				.query(" SELECT * FROM EvolveDocumentType WHERE EvolveDocumentType_Code = @EvolveDocumentType_Code ");

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getIdCount: async function () {
        try {
          
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveGate_ID) as count FROM EvolveGate ");
             } catch (error) {
            Evolve.Log.error(" EERR1122: Error while getting Id count "+error.message);
            return new Error(" EERR1122: Error while getting Id count "+error.message);
        }
    },

	getLastReference: async function () {
        try {
          
            console.log("get table called ")

            return await Evolve.SqlPool.request()
                .query("SELECT TOP(1) EvolveGate_RefNumber FROM EvolveGate ORDER BY EvolveGate_ID DESC "); 

        } catch (error) {
            Evolve.Log.error(" EERR1121: Error while getting last reference "+error.message);
            return new Error(" EERR1121: Error while getting last reference "+error.message);
        }
    },

	deleteLastGateEntry : async function (EvolveGate_ID) {
        try {
          
            return await Evolve.SqlPool.request()
				.input('EvolveGate_ID', Evolve.Sql.Int, EvolveGate_ID)
                .query(" DELETE FROM EvolveGate WHERE EvolveGate_ID = @EvolveGate_ID ");
             } catch (error) {
            Evolve.Log.error(" EERR1122: Error while Delete Gate ID "+error.message);
            return new Error(" EERR1122: Error while Delete Gate ID "+error.message);
        }
    },


	checkDeliveryChallan : async function (EvolvePurchaseOrder_Number) {
        try {
			
            return await Evolve.SqlPool.request()
				.input('EvolvePurchaseOrder_Number', Evolve.Sql.NVarChar, EvolvePurchaseOrder_Number)
                .query("SELECT ei.EvolveItem_IsUnloadingReq ,  euom.EvolveUom_ID  , euom.EvolveUom_Uom ,   PO.EvolveSupplier_ID , POD.EvolvePurchaseOrderDetails_QtyOrdered,POD.EvolvePurchaseOrderDetails_ID,POD.EvolvePurchaseOrderDetails_QtyRecieved,EI.EvolveItem_Desc1,EI.EvolveItem_ID,(POD.EvolvePurchaseOrderDetails_QtyOrdered - POD.EvolvePurchaseOrderDetails_QtyRecieved) AS Remining  FROM EvolvePurchaseOrder AS PO JOIN EvolvePurchaseOrderDetails AS POD ON PO.EvolvePurchaseOrder_ID = POD.EvolvePurchaseOrder_ID AND PO.EvolvePurchaseOrder_ID = @EvolvePurchaseOrder_Number JOIN EvolveItem as EI ON POD.EvolveItem_ID = EI.EvolveItem_ID LEFT JOIN  EvolveUom euom ON POD.EvolveUom_ID  = euom.EvolveUom_ID");
             } catch (error) {
            Evolve.Log.error(" EERR1122: Error while get check Delivery Challan "+error.message);
            return new Error(" EERR1122: Error while get check Delivery Challan "+error.message);
        }
    },

	createOrUpateGateIn: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
            .input("EvolveLocationGroup_ID", Evolve.Sql.Int, data.EvolveLocationGroup_ID)
            .input("EvolveLocation_Name", Evolve.Sql.NVarChar, data.EvolveLocation_Name)
            .input("EvolveLocation_Code", Evolve.Sql.NVarChar, data.EvolveLocation_Code)
            .input("EvolveLocation_Desc", Evolve.Sql.NVarChar, data.EvolveLocation_Desc)
            .input("EvolveLocation_Type", Evolve.Sql.NVarChar, data.EvolveLocation_Type)
            .input("EvolveLocation_Status", Evolve.Sql.Bit, data.EvolveLocation_Status)
            .input("EvolveLocation_ParentID", Evolve.Sql.Int, data.EvolveLocation_ParentID)
            .input("EvolveLocation_Capacity", Evolve.Sql.NVarChar, data.EvolveLocation_Capacity)
            .input("EvolveLocation_Height", Evolve.Sql.NVarChar, data.EvolveLocation_Height)
            .input("EvolveLocation_Length", Evolve.Sql.NVarChar, data.EvolveLocation_Length)
            .input("EvolveLocation_Width", Evolve.Sql.NVarChar, data.EvolveLocation_Width)
            .input("EvolveLocation_PercentFull", Evolve.Sql.NVarChar, data.EvolveLocation_PercentFull)
            .input('EvolveLocation_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolveLocation_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolveLocation_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveLocation_UpdatedAt', Evolve.Sql.NVarChar, datetime)

            .query("INSERT INTO EvolveLocation (EvolveLocationGroup_ID,EvolveLocation_Name, EvolveLocation_Code, EvolveLocation_Desc, EvolveLocation_Type,EvolveLocation_Status,EvolveLocation_ParentID,EvolveLocation_Capacity, EvolveLocation_Height, EvolveLocation_Length, EvolveLocation_Width,EvolveLocation_PercentFull, EvolveLocation_CreatedUser, EvolveLocation_UpdatedUser, EvolveLocation_CreatedAt,EvolveLocation_UpdatedAt)VALUES (@EvolveLocationGroup_ID,@EvolveLocation_Name,@EvolveLocation_Code,@EvolveLocation_Desc,@EvolveLocation_Type,@EvolveLocation_Status,@EvolveLocation_ParentID,@EvolveLocation_Capacity,@EvolveLocation_Height,@EvolveLocation_Length,@EvolveLocation_Width,@EvolveLocation_PercentFull,@EvolveLocation_CreatedUser,@EvolveLocation_UpdatedUser,@EvolveLocation_CreatedAt,@EvolveLocation_UpdatedAt)")
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while GateIn "+error.message);
            return new Error(" EERR####: Error while GateIn "+error.message);
        }
    },
	
	
	createGateIn : async function (data) {
        try {
			let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
				.input('EvolveGate_RefNumber', Evolve.Sql.NVarChar, data.EvolveGate_RefNumber)
				.input('EvolveGate_IsMaterialUnload', Evolve.Sql.Int, data.EvolveGate_IsMaterialUnload)

				.input('EvolveGate_ModuleType', Evolve.Sql.NVarChar, data.EvolveGate_ModuleType)
				.input('EvolveGate_VehicleNumber', Evolve.Sql.NVarChar, data.EvolveGate_VehicleNumber)
				.input('EvolveGate_Transpoter', Evolve.Sql.NVarChar, data.EvolveGate_Transpoter)
				.input('EvolveGate_EWBNumber', Evolve.Sql.NVarChar, data.EvolveGate_EWBNumber)
				.input('EvolveGate_DriverContact', Evolve.Sql.NVarChar, data.EvolveGate_DriverContact)
				.input('EvolveGate_DriverName', Evolve.Sql.NVarChar, data.EvolveGate_DriverName)
				.input('EvolveGate_TotalDocValue', Evolve.Sql.Float, data.EvolveGate_TotalDocValue)
				.input('EvolveGate_Remarks', Evolve.Sql.NVarChar, data.EvolveGate_Remarks)
				.input('EvolveGate_IsRefillTruck', Evolve.Sql.NVarChar, data.EvolveGate_IsRefillTruck)
				.input('EvolveGate_TruckWeight', Evolve.Sql.NVarChar, data.EvolveGate_TruckWeight)
				
				.input('EvolveGate_Status', Evolve.Sql.NVarChar, data.EvolveGate_ModuleType == 'OTHER' ? 'APPROVALPENDING' : 'APPROVED' )
				.input("EvolveUnit_ID", Evolve.Sql.Int, data.EvolveUnit_ID)
				.input("EvolveGate_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
				.input("EvolveGate_CreatedAt", Evolve.Sql.NVarChar, datetime)
				.input("EvolveGate_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
				.input("EvolveGate_UpdatedAt", Evolve.Sql.NVarChar, datetime)
                .query("INSERT INTO EvolveGate	(EvolveGate_Status ,EvolveGate_RefNumber ,EvolveGate_IsMaterialUnload	,EvolveGate_ModuleType	,EvolveGate_VehicleNumber, EvolveGate_DriverContact , EvolveGate_DriverName , EvolveGate_TotalDocValue , EvolveGate_Remarks , EvolveGate_IsRefillTruck , EvolveGate_TruckWeight , EvolveGate_Transpoter	,EvolveGate_EWBNumber	,EvolveGate_CreatedAt	,EvolveGate_CreatedUser	,EvolveGate_UpdatedAt	,EvolveGate_UpdatedUser , EvolveUnit_ID) VALUES	(@EvolveGate_Status , @EvolveGate_RefNumber	,@EvolveGate_IsMaterialUnload ,@EvolveGate_ModuleType	,@EvolveGate_VehicleNumber,@EvolveGate_DriverContact , @EvolveGate_DriverName , @EvolveGate_TotalDocValue , @EvolveGate_Remarks , @EvolveGate_IsRefillTruck , @EvolveGate_TruckWeight , @EvolveGate_Transpoter	,@EvolveGate_EWBNumber	,@EvolveGate_CreatedAt	,@EvolveGate_CreatedUser	,@EvolveGate_UpdatedAt	,@EvolveGate_UpdatedUser , @EvolveUnit_ID); SELECT * FROM EvolveGate WHERE EvolveGate_ID =  @@IDENTITY ");

             } catch (error) {
            Evolve.Log.error(" EERR1122: Error while Add Gate Data "+error.message);
            return new Error(" EERR1122: Error while Add Gate Data "+error.message);
        }
    },

	
	createGateInDetails : async function (data , EvolveGate_ID , EvolveUser_ID) {
        try {
			let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
				.input('EvolveGate_ID', Evolve.Sql.Int, EvolveGate_ID)
				.input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
				.input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
				.input('EvolveGateDetails_IsMaterialUnloaded', Evolve.Sql.Bit,!(data.EvolveItem_IsUnloadingReq))
				.input('EvolvePurchaseOrderDetails_ID', Evolve.Sql.Int, data.EvolvePurchaseOrderDetails_ID)
				.input('EvolveItem_Desc', Evolve.Sql.NVarChar, data.EvolveItem_Desc1)
				.input('EvolveGateDetails_Qty', Evolve.Sql.Float, data.incomingQty)
				.input("EvolveGateDetails_CreatedUser", Evolve.Sql.Int, EvolveUser_ID)
				.input("EvolveGateDetails_CreatedAt", Evolve.Sql.NVarChar, datetime)
				.input("EvolveGateDetails_UpdatedUser", Evolve.Sql.Int, EvolveUser_ID)
				.input("EvolveGateDetails_UpdatedAt", Evolve.Sql.NVarChar, datetime)
                .query("INSERT INTO EvolveGateDetails (EvolveGate_ID,EvolveItem_ID,EvolveUom_ID,EvolveGateDetails_IsMaterialUnloaded  , EvolveItem_Desc,EvolveGateDetails_Qty,EvolvePurchaseOrderDetails_ID ,EvolveGateDetails_CreatedAt,EvolveGateDetails_CreatedUser,EvolveGateDetails_UpdatedAt,EvolveGateDetails_UpdatedUser)VALUES	(@EvolveGate_ID,@EvolveItem_ID,@EvolveUom_ID,@EvolveGateDetails_IsMaterialUnloaded  , @EvolveItem_Desc	,@EvolveGateDetails_Qty,@EvolvePurchaseOrderDetails_ID,@EvolveGateDetails_CreatedAt,@EvolveGateDetails_CreatedUser,@EvolveGateDetails_UpdatedAt,@EvolveGateDetails_UpdatedUser)");

             } catch (error) {
            Evolve.Log.error(" EERR1122: Error while Add Gate Data "+error.message);
            return new Error(" EERR1122: Error while Add Gate Data "+error.message);
        }
    },

	getSupplierDetails : async function (EvolveSupplier_Gstin) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveSupplier_Gstin', Evolve.Sql.NVarChar, EvolveSupplier_Gstin)
				
				.query("SELECT * FROM EvolveSupplier WHERE EvolveSupplier_Gstin = @EvolveSupplier_Gstin ");

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getPruchaseOrderList : async function (query) {
		try {
			return await Evolve.SqlPool.request()
				.query(`SELECT * FROM  EvolvePurchaseOrder ${query}`);

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	getStickerId : async function (data) {
		try {
			return await Evolve.SqlPool.request()
			.input("EvolveSticker_Name", Evolve.Sql.NVarChar, data)
				.query("SELECT * FROM EvolveSticker WHERE EvolveSticker_Name = @EvolveSticker_Name ");

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
	
	checkEwayBillExist : async function (eWayBillNo) {
		try {
			return await Evolve.SqlPool.request()
			.input("EvolveGate_EWBNumber", Evolve.Sql.NVarChar, eWayBillNo)
			.query("SELECT * FROM EvolveGate WHERE EvolveGate_EWBNumber = @EvolveGate_EWBNumber ");

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

	checkDuplicateEntry : async function (data) {
		try {
			return await Evolve.SqlPool.request()
			.input("EvolveGate_EWBNumber", Evolve.Sql.NVarChar, data.EvolveGate_EWBNumber)
			.input("EvolveGate_VehicleNumber", Evolve.Sql.NVarChar, data.EvolveGate_VehicleNumber)
			.query("SELECT * FROM EvolveGate WHERE EvolveGate_EWBNumber = @EvolveGate_EWBNumber AND EvolveGate_VehicleNumber = @EvolveGate_VehicleNumber ");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	}
	

}