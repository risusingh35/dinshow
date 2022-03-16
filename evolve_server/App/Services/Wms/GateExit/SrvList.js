'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

	//  <<<<---------- Get Exit  ---------->>>>>

	getallInvoice: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query("SELECT * from EvolveInvoice where EvolveInvoice_Status = 'open' ");
		} catch (error) {
			Evolve.Log.error(" EERR2092: Error while getting all Invoice "+error.message);
			return new Error(" EERR2092: Error while getting all Invoice "+error.message);
		}
	},
	getSingleInvoice: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveInvoice_ID', Evolve.Sql.Int, data.EvolveInvoice_ID)
				.query('SELECT * from EvolveInvoice where EvolveInvoice_ID = @EvolveInvoice_ID');

		} catch (error) {
			Evolve.Log.error(" EERR2093: Error while getting Single Invoice "+error.message);
			return new Error(" EERR2093: Error while getting Single Invoice "+error.message);
		}
	},
	getDoSoNo: async function (EvolveInvoice_SONumber) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveInvoice_SONumber', Evolve.Sql.NVarChar, EvolveInvoice_SONumber)
				.query("SELECT * from EvolveDo where EvolveDO_SONumber = @EvolveInvoice_SONumber AND EvolveDO_Status = 'open' ");

		} catch (error) {
			Evolve.Log.error(" EERR2094: Error while getting Do So No "+error.message);
			return new Error(" EERR2094: Error while getting Do So No "+error.message);
		}
	},
	getSingleSalesOrder: async function (EvolveInvoice_SONumber) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveInvoice_SONumber', Evolve.Sql.NVarChar, EvolveInvoice_SONumber)
				.query("SELECT eso.*, esup.EvolveSupplier_Name FROM EvolveSalesOrder eso join EvolveSupplier esup ON esup.EvolveSupplier_Code = eso.EvolveSalesOrder_Billto WHERE eso.EvolveSalesOrder_Number = @EvolveInvoice_SONumber AND EvolveSalesOrder_Status = 'open'");
		} catch (error) {
			Evolve.Log.error(" EERR2095: Error while getting Single Sales Order "+error.message);
			return new Error(" EERR2095: Error while getting Single Sales Order "+error.message);
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
					.query("Select edol.EvolveDOLine_ID, einv.EvolveInvoice_Number,einv.EvolveInvoice_CustCode,einv.EvolveInvoice_CustName, einvl.EvolveInvoiceItemList_PrdCode,einvl.EvolveInvoiceItemList_Qty, eso.EvolveSalesOrder_Number,edol.EvolveDOLine_Part, edol.EvolveDOLine_QtyDO,edol.EvolveDOLine_QtyPDI, edol.EvolveDOLine_Status FROM EvolveInvoice einv INNER JOIN EvolveInvoiceItemList einvl on einv.EvolveInvoice_ID = einvl.EvolveInvoice_ID INNER JOIN EvolveSalesOrder eso on einv.EvolveInvoice_SONumber = eso.EvolveSalesOrder_Number LEFT JOIN EvolveDO edo on einv.EvolveInvoice_SONumber = edo.EvolveDO_SONumber LEFT JOIN EvolveDoLine edol on edo.EvolveDO_ID = edol.EvolveDO_ID AND edol.EvolveDOLine_Part = einvl.EvolveInvoiceItemList_PrdCode where einv.EvolveInvoice_ID = @EvolveInvoice_ID AND edo.EvolveDO_ID = @EvolveDO_ID AND edo.EvolveDO_SONumber = eso.EvolveSalesOrder_Number order by einvl.EvolveInvoiceLine_ID asc");
			}

		} catch (error) {
			Evolve.Log.error(" EERR2096: Error while getting Exit Table Date "+error.message);
			return new Error(" EERR2096: Error while getting Exit Table Date "+error.message);
		}
	},
	getdoNumber: async function (EvolveDO_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveDO_ID', Evolve.Sql.NVarChar, EvolveDO_ID)
				.query("SELECT EvolveDO_Number FROM EvolveDo WHERE EvolveDO_ID = @EvolveDO_ID ");
		} catch (error) {
			Evolve.Log.error(" EERR2097: Error while getting do Number "+error.message);
			return new Error(" EERR2097: Error while getting do Number "+error.message);
		}
	},
	getdolineNumber: async function (EvolveDOLine_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveDOLine_ID', Evolve.Sql.NVarChar, EvolveDOLine_ID)
				.query("SELECT EvolveDOLine_Number FROM EvolveDoLine WHERE EvolveDOLine_ID = @EvolveDOLine_ID ");
		} catch (error) {
			Evolve.Log.error(" EERR2098: Error while getting do line Number "+error.message);
			return new Error(" EERR2098: Error while getting do line Number "+error.message);
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
				.input('EvolveGateExit_IsWayBill', Evolve.Sql.NVarChar, data.EvolveGateExit_IsWayBill)
				.input('EvolveGateExit_EwayShipValue', Evolve.Sql.NVarChar, data.EvolveGateExit_EwayShipValue)
				.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
				.input('dataTime', Evolve.Sql.NVarChar, dataTime)
				.query("INSERT INTO EvolveGateExitHistory (EvolveGateExit_SerialNo, EvolveDO_Number, EvolveDOLine_Number, EvolveGateExit_SoNumber, EvolveGateExit_InvoiceNo,EvolveGateExit_Transporter, EvolveGateExit_VehicleNumber,EvolveGateExit_IsWayBill,EvolveGateExit_EwayShipValue, EvolveGateExit_CreatedUser, EvolveGateExit_CreatedAt, EvolveGateExit_UpdatedUser, EvolveGateExit_UpdatedAt) VALUES (@EvolveGateExit_SerialNo, @EvolveDO_Number, @EvolveDOLine_Number, @EvolveGateExit_SoNumber, @EvolveGateExit_InvoiceNo, @EvolveGateExit_Transporter, @EvolveGateExit_VehicleNumber,@EvolveGateExit_IsWayBill,@EvolveGateExit_EwayShipValue, @EvolveUser_ID, @dataTime, @EvolveUser_ID, @dataTime)  ");
		} catch (error) {
			Evolve.Log.error(" EERR2099: Error while adding Get Exit "+error.message);
			return new Error(" EERR2099: Error while adding Get Exit "+error.message);
		}
	},
	updateInvoiceStatus: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveGateExit_InvoiceNo', Evolve.Sql.Int, data.EvolveGateExit_InvoiceNo)
				.query("UPDATE EvolveInvoice SET EvolveInvoice_Status = 'close' WHERE  EvolveInvoice_ID = @EvolveGateExit_InvoiceNo");
		} catch (error) {
			Evolve.Log.error(" EERR2100: Error while updating Invoice Status "+error.message);
			return new Error(" EERR2100: Error while updating Invoice Status "+error.message);
		}
	},

	updateInvoiceLineStatus: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveGateExit_InvoiceNo', Evolve.Sql.Int, data.EvolveGateExit_InvoiceNo)
				.query("UPDATE EvolveInvoiceItemList SET EvolveInvoiceItemList_Status = 'close' WHERE  EvolveInvoice_ID = @EvolveGateExit_InvoiceNo");
		} catch (error) {
			Evolve.Log.error(" EERR2100: Error while updating Invoice Line Status "+error.message);
			return new Error(" EERR2100: Error while updating Invoice Line Status "+error.message);
		}
	},

	updateDOStatus: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveDO_ID', Evolve.Sql.Int, data.EvolveDO_ID)
				.query("UPDATE EvolveDo SET EvolveDO_Status = 'close' WHERE  EvolveDO_ID = @EvolveDO_ID");
		} catch (error) {
			Evolve.Log.error(" EERR2101: Error while updating DO Status "+error.message);
			return new Error(" EERR2101: Error while updating DO Status "+error.message);
		}
	},
	updateDOLineStatus: async function (EvolveDOLine_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveDOLine_ID', Evolve.Sql.Int, EvolveDOLine_ID)
				.query("UPDATE EvolveDoLine SET EvolveDOLine_Status = 'close' WHERE EvolveDOLine_ID = @EvolveDOLine_ID");
		} catch (error) {
			Evolve.Log.error(" EERR2102: Error while updating DO Line Status "+error.message);
			return new Error(" EERR2102: Error while updating DO Line Status "+error.message);
		}
	},
	getSOLine_Id: async function (EvolveDOLine_ID) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveDOLine_ID', Evolve.Sql.Int, EvolveDOLine_ID)
				.query("SELECT EvolveSalesOrderLine_ID FROM EvolveDoLine WHERE EvolveDOLine_ID = @EvolveDOLine_ID");
		} catch (error) {
			Evolve.Log.error(" EERR2103: Error while getting SO Line_Id "+error.message);
			return new Error(" EERR2103: Error while getting SO Line_Id "+error.message);
		}
	},
	updateSOLineStatus: async function (SOLine_Id) {
		try {
			return await Evolve.SqlPool.request()
				.input('SOLine_Id', Evolve.Sql.Int, SOLine_Id)
				.query("UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_Status = 'close' WHERE EvolveSalesOrderLine_ID = @SOLine_Id");
		} catch (error) {
			Evolve.Log.error(" EERR2104: Error while updating SO Line Status "+error.message);
			return new Error(" EERR2104: Error while updating SO Line Status "+error.message);
		}
	},
	getOpenSOLineCnt: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveDO_ID', Evolve.Sql.Int, data.EvolveDO_ID)
				.query("SELECT COUNT(esol.EvolveSalesOrderLine_ID) AS openSoLines FROM EvolveDo ed , EvolveSalesOrder eso , EvolveSalesOrderLine esol WHERE ed.EvolveDO_ID = @EvolveDO_ID AND eso.EvolveSalesOrder_Number = ed.EvolveDO_SONumber AND esol.EvolveSalesOrder_ID = eso.EvolveSalesOrder_ID AND esol.EvolveSalesOrderLine_Status = 'open'");
		} catch (error) {
			Evolve.Log.error(" EERR2105: Error while getting Open SO Line Cnt "+error.message);
			return new Error(" EERR2105: Error while getting Open SO Line Cnt "+error.message);
		}
	},
	updateSoStatusByNumber: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveSalesOrder_Number', Evolve.Sql.NVarChar, data.EvolveGateExit_SoNumber)
				.query("UPDATE EvolveSalesOrder SET EvolveSalesOrder_Status = 'close' WHERE EvolveSalesOrder_Number = @EvolveSalesOrder_Number");
		} catch (error) {
			Evolve.Log.error(" EERR2106: Error while updating So Status By Number "+error.message);
			return new Error(" EERR2106: Error while updating So Status By Number "+error.message);
		}
	},
}