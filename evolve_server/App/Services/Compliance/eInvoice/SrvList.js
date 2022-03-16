'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getInvoiceListCount: async function (search, data) {
        try {
            if (data.EvolveUnit_ID == '') {
                let getUnitFromUser = await Evolve.SqlPool.request()
                    .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                    .query("select EvolveUnit_ID from EvolveUserUnitLink WHERE EvolveUser_ID = @EvolveUser_ID");
                if (getUnitFromUser.rowsAffected > 0) {
                    let UnitIdArray = [];
                    for (let i = 0; i < getUnitFromUser.rowsAffected; i++) {
                        UnitIdArray.push(getUnitFromUser.recordset[i].EvolveUnit_ID)
                    }
                    // console.log("UnitIdArray :",UnitIdArray.join(','));
                    data.EvolveUnit_ID = UnitIdArray.join(',')
                }
            }
            let query = "SELECT COUNT(ei.EvolveInvoice_ID) AS count FROM EvolveDocument ed, EvolveInvoice ei LEFT JOIN EvolveUnit eu ON eu.EvolveUnit_ID = ei.EvolveUnit_ID LEFT JOIN EvolveSupplier es ON ei.EvolveSupplier_ID = es.EvolveSupplier_ID WHERE ed.EvolveDocument_ID = ei.EvolveDocument_ID";
            if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID == '' && data.EvolveSupplier_ID == '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND cast(EvolveInvoice_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveInvoice_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "')";

            } else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID == '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND cast(EvolveInvoice_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveInvoice_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveUnit_ID = '" + data.EvolveUnit_ID + "'  ";
            }
            else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID != '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND cast(EvolveInvoice_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveInvoice_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveUnit_ID = '" + data.EvolveUnit_ID + "' AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID == '' && data.EvolveSupplier_ID != '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND cast(EvolveInvoice_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveInvoice_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID == '' && data.EvolveSupplier_ID != '') {
                query = query + " AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID != '') {
                query = query + " AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "' AND ei.EvolveUnit_ID = '" + data.EvolveUnit_ID + "' ";
            }
            else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID == '') {
                query = query + " AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID + ")";
            } else {

            }
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query(query + " AND ei.EvolveInvoice_Number LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR1061: Error while getting E-Invoice List Count " + error.message);
            return new Error(" EERR1061: Error while getting E-Invoice List Count " + error.message);
        }
    },
    getInvoiceList: async function (start, length, search, data) {
        try {
            if (data.EvolveUnit_ID == '') {
                let getUnitFromUser = await Evolve.SqlPool.request()
                    .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                    .query("select EvolveUnit_ID from EvolveUserUnitLink WHERE EvolveUser_ID = @EvolveUser_ID");
                if (getUnitFromUser.rowsAffected > 0) {
                    let UnitIdArray = [];
                    for (let i = 0; i < getUnitFromUser.rowsAffected; i++) {
                        UnitIdArray.push(getUnitFromUser.recordset[i].EvolveUnit_ID)
                    }
                    // console.log("UnitIdArray :",UnitIdArray.join(','));
                    data.EvolveUnit_ID = UnitIdArray.join(',')
                }
            }
            let query = 'SELECT ei.*, ed.EvolveDocument_Name, ed.EvolveDocument_IsEmail_Process, ed.EvolveDocument_SignatureSetting, ed.EvolveDocument_SignatureSettingDetails, ed.EvolveDocument_DS_Setting, ed.EvolveDocument_IsEWayBill, ed.EvolveDocument_IsGST_Process, DATEDIFF(mi, ei.EvolveInvoice_CreatedAt, ei.EvolveInvoice_UpdatedAt) AS TimeDuartion, eu.EvolveUnit_Name, eu.EvolveUnit_Code, es.EvolveSupplier_Name FROM EvolveDocument ed, EvolveInvoice ei LEFT JOIN EvolveUnit eu ON eu.EvolveUnit_ID = ei.EvolveUnit_ID LEFT JOIN EvolveSupplier es ON ei.EvolveSupplier_ID = es.EvolveSupplier_ID WHERE ei.EvolveDocument_ID = ed.EvolveDocument_ID';
            if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID == '' && data.EvolveSupplier_ID == '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND cast(EvolveInvoice_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveInvoice_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "')";

            } else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID == '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND cast(EvolveInvoice_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveInvoice_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveUnit_ID = '" + data.EvolveUnit_ID + "'  ";
            }
            else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID != '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND cast(EvolveInvoice_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveInvoice_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveUnit_ID = '" + data.EvolveUnit_ID + "' AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID == '' && data.EvolveSupplier_ID != '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND cast(EvolveInvoice_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveInvoice_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID == '' && data.EvolveSupplier_ID != '') {
                query = query + " AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID != '') {
                query = query + " AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "' AND ei.EvolveUnit_ID = '" + data.EvolveUnit_ID + "' ";
            } else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID == '') {
                query = query + " AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID + ")";
            } else {

            }

            // console.log("start============",start)
            // console.log("length============",length)
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query(query + " AND ei.EvolveInvoice_Number LIKE @search ORDER BY ei.EvolveInvoice_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");

        } catch (error) {
            Evolve.Log.error(" EERR1062: Error while getting E-Invoice List " + error.message);
            return new Error(" EERR1062: Error while getting E-Invoice List " + error.message);
        }
    },
    getSingleInvoiceData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvoice_ID', Evolve.Sql.Int, data.EvolveInvoice_ID)
                .query("SELECT ei.*, ed.EvolveDocument_IsEmail_Process FROM EvolveInvoice ei, EvolveDocument ed WHERE ed.EvolveDocument_ID = ei.EvolveDocument_ID AND EvolveInvoice_ID = @EvolveInvoice_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1063: Error while getting Single Evolve Invoice data " + error.message);
            return new Error(" EERR1063: Error while getting Single Evolve Invoice data " + error.message);
        }
    },
    getUnitCustomerLink: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDocument_ID', Evolve.Sql.Int, data.EvolveDocument_ID)
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveSupplier_ID', Evolve.Sql.Int, data.EvolveSupplier_ID)
                .query("SELECT * FROM EvolveUnitToCustomerLink WHERE EvolveDocument_ID = @EvolveDocument_ID AND EvolveUnit_ID = @EvolveUnit_ID AND EvolveSupplier_ID = @EvolveSupplier_ID AND EvolveUnitToCustomerLink_Status = '1' ");
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getGlobleVariableEInv: async function (EvolveEinvoiceConfig_Key) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoiceConfig_Key', Evolve.Sql.NVarChar, EvolveEinvoiceConfig_Key)
                .query("SELECT EvolveEinvoiceConfig_Value FROM EvolveEinvoiceConfig WHERE EvolveEinvoiceConfig_Key LIKE @EvolveEinvoiceConfig_Key");
        } catch (error) {
            Evolve.Log.error("Error While getting E Invoice globle variable " + error.message);
            return new Error("Error While getting E Invoice globle variable " + error.message);
        }
    },
    getGlobleVariableIo: async function (EvolveIOConfig_Key) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveIOConfig_Key', Evolve.Sql.NVarChar, EvolveIOConfig_Key)
                .query("SELECT EvolveIOConfig_Value FROM EvolveIOConfig WHERE EvolveIOConfig_Key LIKE @EvolveIOConfig_Key");
        } catch (error) {
            Evolve.Log.error("Error While getting IO globle variable " + error.message);
            return new Error("Error While getting IO globle variable " + error.message);
        }
    },
    getEInvoiceList: async function (EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
                .query("SELECT ei.*, ed.*,eu.EvolveUnit_Code, edt.EvolveDocumentType_Name, eg.EvolveGSP_Code FROM EvolveEinvoice ei, EvolveDocument ed, EvolveDocumentType edt, EvolveGSP eg, EvolveUnit eu , EvolveUserUnitLink eul WHERE ed.EvolveDocument_ID = ei.EvolveDocument_ID AND ed.EvolveDocumentType_ID = edt.EvolveDocumentType_ID AND eg.EvolveGSP_ID = ed.EvolveGSP_ID AND eu.EvolveUnit_ID = ei.EvolveUnit_ID AND eul.EvolveUnit_ID = eu.EvolveUnit_ID AND  eul.EvolveUser_ID = @EvolveUser_ID ORDER BY ei.EvolveEinvoice_ID DESC");
        } catch (error) {
            Evolve.Log.error(" EERR1063: Error while getting Single Gst " + error.message);
            return new Error(" EERR1063: Error while getting Single Gst " + error.message);
        }
    },
    updateEInvoice: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoice_ID', Evolve.Sql.Int, data.EvolveEinvoice_ID)
                .input('EvolveEinvoice_CurrentAction', Evolve.Sql.NVarChar, data.EvolveEinvoice_CurrentAction)
                .input('EvolveEinvoice_Status', Evolve.Sql.NVarChar, 'PROCESS')
                .query("UPDATE EvolveEinvoice SET EvolveEinvoice_ErrorCode = null, EvolveEinvoice_ErrorMessage = null,EvolveEinvoice_CurrentAction = @EvolveEinvoice_CurrentAction, EvolveEinvoice_Status = @EvolveEinvoice_Status WHERE EvolveEinvoice_ID = @EvolveEinvoice_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1063: Error while getting Single Gst " + error.message);
            return new Error(" EERR1063: Error while getting Single Gst " + error.message);
        }
    },
    updateEInvoiceError: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoice_ID', Evolve.Sql.Int, data.EvolveEinvoice_ID)
                .input('EvolveEinvoice_CurrentAction', Evolve.Sql.NVarChar, data.EvolveEinvoice_CurrentAction)
                .input('EvolveEinvoice_Status', Evolve.Sql.NVarChar, 'ERROR')
                .query("UPDATE EvolveEinvoice SET EvolveEinvoice_ErrorCode = null, EvolveEinvoice_ErrorMessage = null,EvolveEinvoice_CurrentAction = @EvolveEinvoice_CurrentAction WHERE EvolveEinvoice_ID = @EvolveEinvoice_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1063: Error while getting Single Gst " + error.message);
            return new Error(" EERR1063: Error while getting Single Gst " + error.message);
        }
    },
    getUnitList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveUnit");
        } catch (error) {
            Evolve.Log.error(" EERR1063: Error while getting Unit List " + error.message);
            return new Error(" EERR1063: Error while getting Unit List " + error.message);
        }
    },
    getSupplierList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveSupplier");
        } catch (error) {
            Evolve.Log.error(" EERR1063: Error while getting Supplier List " + error.message);
            return new Error(" EERR1063: Error while getting Supplier List " + error.message);
        }
    },
    onClearInvoice: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoice_ID', Evolve.Sql.Int, data.EvolveEinvoice_ID)
                .query("UPDATE EvolveEinvoice SET  EvolveEinvoice_Status = 'CANCELLED' ,	EvolveEinvoice_CurrentAction = 'SENDEMAIL' WHERE EvolveEinvoice_ID=@EvolveEinvoice_ID");
        } catch (error) {
            Evolve.Log.error(" EERR32745: Error while clear invoice " + error.message);
            return new Error(" EERR32745: Error while clear invoice " + error.message);
        }
    },

    getInvoiceHistoryList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvoice_Number', Evolve.Sql.NVarChar, data.EvolveInvoice_Number)
                .query("SELECT eeih.*, es.EvolveSupplier_Name, eu.EvolveUnit_Name, ed.EvolveDocument_Name, DATEDIFF(mi, eeih.EvolveEinvoiceHistory_CreatedAt, eeih.EvolveEinvoiceHistory_UpdatedAt) AS TimeDuartion FROM EvolveInvoice ei, EvolveUnit eu, EvolveDocument ed, EvolveEinvoiceHistory eeih LEFT JOIN EvolveSupplier es ON eeih.EvolveSupplier_ID = es.EvolveSupplier_ID WHERE eeih.EvolveEinvoiceHistory_Number = ei.EvolveInvoice_Number and eeih.EvolveDocument_ID = ed.EvolveDocument_ID and eu.EvolveUnit_ID = eeih.EvolveUnit_ID and ei.EvolveInvoice_Number = @EvolveInvoice_Number");
        } catch (error) {
            Evolve.Log.error(" EERR32748: Error while getting E-Invoice History List " + error.message);
            return new Error(" EERR32748: Error while getting E-Invoice History List " + error.message);
        }
    },

    getItemHistoryList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoiceHistory_ID', Evolve.Sql.NVarChar, data.EvolveEinvoiceHistory_ID)
                .query(" select * from EvolveEinvoiceItemListHistory where EvolveEinvoiceHistory_ID = @EvolveEinvoiceHistory_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR32749: Error while getting E-Invoice Item History List " + error.message);
            return new Error(" EERR32749: Error while getting E-Invoice Item History List " + error.message);
        }
    },

    updateEwayBillDetail: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoice_ID', Evolve.Sql.Int, data.EvolveEinvoice_ID)
                .input('EvolveEinvoiceEwbDtls_TransId', Evolve.Sql.NVarChar, data.EvolveEinvoiceEwbDtls_TransId)
                .input('EvolveEinvoiceEwbDtls_TransName', Evolve.Sql.NVarChar, data.EvolveEinvoiceEwbDtls_TransName)
                .input('EvolveEinvoiceEwbDtls_TransDocNo', Evolve.Sql.NVarChar, data.EvolveEinvoiceEwbDtls_TransDocNo)
                .input('EvolveEinvoiceEwbDtls_TransDocDt', Evolve.Sql.NVarChar, data.EvolveEinvoiceEwbDtls_TransDocDt)
                .input('EvolveEinvoiceEwbDtls_VehNo', Evolve.Sql.NVarChar, data.EvolveEinvoiceEwbDtls_VehNo)
                .input('EvolveEinvoice_Status', Evolve.Sql.NVarChar, 'PROCESS')
                .input('EvolveEinvoice_CurrentAction', Evolve.Sql.NVarChar, data.EvolveEinvoice_CurrentAction)
                .input('EvolveEinvoiceEwbDtls_Distance', Evolve.Sql.NVarChar, data.EvolveEinvoiceEwbDtls_Distance)
                .query("UPDATE EvolveEinvoice SET EvolveEinvoice_ErrorCode = null, EvolveEinvoice_ErrorMessage = null,EvolveEinvoiceEwbDtls_TransId = @EvolveEinvoiceEwbDtls_TransId, EvolveEinvoiceEwbDtls_TransName = @EvolveEinvoiceEwbDtls_TransName , EvolveEinvoiceEwbDtls_TransDocNo = @EvolveEinvoiceEwbDtls_TransDocNo , EvolveEinvoiceEwbDtls_TransDocDt = @EvolveEinvoiceEwbDtls_TransDocDt , EvolveEinvoiceEwbDtls_VehNo = @EvolveEinvoiceEwbDtls_VehNo , EvolveEinvoice_Status = @EvolveEinvoice_Status, EvolveEinvoice_CurrentAction = @EvolveEinvoice_CurrentAction, EvolveEinvoiceEwbDtls_Distance = @EvolveEinvoiceEwbDtls_Distance WHERE EvolveEinvoice_ID = @EvolveEinvoice_ID");

        } catch (error) {
            Evolve.Log.error("Error while Invoice Update Eway Bill Detail! " + error.message);
            return new Error("Error while Invoice Update Eway Bill Detail! " + error.message);
        }
    },

    getEwayBillDetailByID: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoice_ID', Evolve.Sql.Int, data.EvolveEinvoice_ID)
                .query("SELECT EvolveEinvoiceEwbDtls_TransId , EvolveEinvoiceEwbDtls_TransName , EvolveEinvoiceEwbDtls_TransDocNo , EvolveEinvoiceEwbDtls_TransDocDt, EvolveEinvoiceEwbDtls_VehNo, EvolveEinvoiceEwbDtls_Distance FROM EvolveEinvoice WHERE EvolveEinvoice_ID = @EvolveEinvoice_ID");

        } catch (error) {
            Evolve.Log.error("Error while Invoice Get Eway Bill Detail! " + error.message);
            return new Error("Error while Invoice Get Eway Bill Detail! " + error.message);
        }
    },

    getEwayBillDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvoice_ID', Evolve.Sql.Int, data.EvolveInvoice_ID)
                .query(" SELECT * FROM EvolveInvoice WHERE EvolveInvoice_ID = @EvolveInvoice_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR32751: Error while getting E-Way Bill Details " + error.message);
            return new Error(" EERR32751: Error while getting E-Way Bill Details " + error.message);
        }
    },

    cancelEwayBill: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvoice_ID', Evolve.Sql.Int, data.EvolveInvoice_ID)
                .input('EvolveInvoiceEwbDtls_cancelEwbRsn', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_cancelEwbRsn)
                .input('EvolveInvoiceEwbDtls_cancelEwbRemarks', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_cancelEwbRemarks)
                .query("UPDATE EvolveInvoice SET EvolveInvoiceEwbDtls_cancelEwbRsn = @EvolveInvoiceEwbDtls_cancelEwbRsn , EvolveInvoiceEwbDtls_cancelEwbRemarks = @EvolveInvoiceEwbDtls_cancelEwbRemarks  WHERE EvolveInvoice_ID = @EvolveInvoice_ID");

        } catch (error) {
            Evolve.Log.error("Error while Invoice Cancel Eway Bill Detail! " + error.message);
            return new Error("Error while Invoice Cancel Eway Bill Detail! " + error.message);
        }
    },

    changeInvoiceEwayBillCancelStatus: async function (EvolveInvoice_ID, EvolveInvoice_EwayBillStatus, EvolveEinvoiceEwbDtls_cancelDate) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvoice_ID', Evolve.Sql.Int, EvolveInvoice_ID)
                .input('EvolveInvoice_EwayBillStatus', Evolve.Sql.NVarChar, EvolveInvoice_EwayBillStatus)
                .input('EvolveEinvoiceEwbDtls_cancelDate', Evolve.Sql.NVarChar, EvolveEinvoiceEwbDtls_cancelDate)
                .query("UPDATE EvolveInvoice SET EvolveInvoice_EwayBillStatus = @EvolveInvoice_EwayBillStatus , EvolveEinvoiceEwbDtls_cancelDate = @EvolveEinvoiceEwbDtls_cancelDate WHERE EvolveInvoice_ID = @EvolveInvoice_ID");

        } catch (error) {
            Evolve.Log.error("Error while Invoice Cancel Eway Bill Detail! " + error.message);
            return new Error("Error while Invoice Cancel Eway Bill Detail! " + error.message);
        }
    },

    updateEInvoiceHistory: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvoice_ID', Evolve.Sql.Int, data.EvolveInvoice_ID)
                .input('EvolveEinvoiceHistoryEwbDtls_cancelEwbRsn', Evolve.Sql.NVarChar, data.EvolveEinvoiceHistoryEwbDtls_cancelEwbRsn)
                .input('EvolveEinvoiceHistoryEwbDtls_cancelEwbRemarks', Evolve.Sql.NVarChar, data.EvolveEinvoiceHistoryEwbDtls_cancelEwbRemarks)
                .input('EvolveEinvoiceHistory_EwayBillStatus', Evolve.Sql.NVarChar, data.EvolveEinvoiceHistory_EwayBillStatus)
                .input('EvolveEinvoiceHistoryEwbDtls_cancelDate', Evolve.Sql.NVarChar, data.EvolveEinvoiceHistoryEwbDtls_cancelDate)
                .query("UPDATE EvolveEinvoiceHistory SET EvolveEinvoiceHistoryEwbDtls_cancelEwbRsn = @EvolveEinvoiceHistoryEwbDtls_cancelEwbRsn , EvolveEinvoiceHistoryEwbDtls_cancelEwbRemarks = @EvolveEinvoiceHistoryEwbDtls_cancelEwbRemarks , EvolveEinvoiceHistory_EwayBillStatus = @EvolveEinvoiceHistory_EwayBillStatus , EvolveEinvoiceHistoryEwbDtls_cancelDate = @EvolveEinvoiceHistoryEwbDtls_cancelDate WHERE EvolveEinvoiceHistory_Number LIKE (SELECT TOP(1) EvolveInvoice_Number from EvolveInvoice where EvolveInvoice_ID = @EvolveInvoice))");

        } catch (error) {
            Evolve.Log.error("Error while Invoice Update Ewaybill History " + error.message);
            return new Error("Error while Invoice Update Ewaybill History " + error.message);
        }
    },

    extendEwayBillInvoice: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvoice_ID', Evolve.Sql.Int, data.EvolveInvoice_ID)
                .input('EvolveInvoice_EwayBillNumber', Evolve.Sql.NVarChar, data.EvolveInvoice_EwayBillNumber)
                .input('EvolveInvoiceEwbDtls_VehNo', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_VehNo)
                .input('EvolveInvoiceSellerDtls_Pin', Evolve.Sql.NVarChar, data.EvolveInvoiceSellerDtls_Pin)
                .input('EvolveInvoiceEwbDtls_Distance', Evolve.Sql.Int, data.EvolveInvoiceEwbDtls_Distance)
                .input('EvolveInvoiceSellerDtls_Loc', Evolve.Sql.NVarChar, data.EvolveInvoiceSellerDtls_Loc)
                .input('EvolveInvoiceSellerDtls_State', Evolve.Sql.NVarChar, data.EvolveInvoiceSellerDtls_State)
                .input('EvolveInvoiceSellerDtls_StateCode', Evolve.Sql.Int, data.EvolveInvoiceSellerDtls_StateCode)
                .input('EvolveInvoiceEwbDtls_TransDocNo', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_TransDocNo)
                .input('EvolveInvoiceEwbDtls_TransDocDt', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_TransDocDt)
                .input('EvolveInvoiceEwbDtls_ExtendRsnCode', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_ExtendRsnCode)
                .input('EvolveInvoiceEwbDtls_TransMode', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_TransMode)
                .input('EvolveInvoiceEwbDtls_ExtendRemarks', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_ExtendRemarks)
                .input('EvolveInvoiceEwbDtls_ConsignmentStatus', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_ConsignmentStatus)
                .query(" UPDATE EvolveInvoice SET EvolveInvoice_EwayBillNumber = @EvolveInvoice_EwayBillNumber, EvolveInvoiceEwbDtls_VehNo = @EvolveInvoiceEwbDtls_VehNo, EvolveInvoiceSellerDtls_Pin = @EvolveInvoiceSellerDtls_Pin, EvolveInvoiceEwbDtls_Distance = @EvolveInvoiceEwbDtls_Distance, EvolveInvoiceSellerDtls_Loc = @EvolveInvoiceSellerDtls_Loc, EvolveInvoiceSellerDtls_State = @EvolveInvoiceSellerDtls_State, EvolveInvoiceSellerDtls_StateCode = @EvolveInvoiceSellerDtls_StateCode, EvolveInvoiceEwbDtls_TransDocNo = @EvolveInvoiceEwbDtls_TransDocNo, EvolveInvoiceEwbDtls_TransDocDt = @EvolveInvoiceEwbDtls_TransDocDt, EvolveInvoiceEwbDtls_ExtendRsnCode = @EvolveInvoiceEwbDtls_ExtendRsnCode,  EvolveInvoice_cancelInvRsnCode = @EvolveInvoice_cancelInvRsnCode, EvolveInvoiceEwbDtls_TransMode = @EvolveInvoiceEwbDtls_TransMode, EvolveInvoiceEwbDtls_ExtendRemarks = @EvolveInvoiceEwbDtls_ExtendRemarks, EvolveInvoiceEwbDtls_ConsignmentStatus = @EvolveInvoiceEwbDtls_ConsignmentStatus WHERE EvolveInvoice_ID = @EvolveInvoice_ID ; SELECT EvolveInvoice_Number FROM EvolveInvoice WHERE EvolveInvoice_ID = @EvolveInvoice_ID");
        } catch (error) {
            Evolve.Log.error(" EERR32757 : Error while Extend E-Way Bill Invoice " + error.message);
            return new Error(" EERR32757 : Error while Extend E-Way Bill Invoice " + error.message);
        }
    },

    extendEwayBillEInvoiceHistory: async function (EvolveInvoice_Number, data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoiceHistory_Number', Evolve.Sql.NVarChar, EvolveInvoice_Number)
                .input('EvolveEinvoiceHistory_EwayBillNumber', Evolve.Sql.NVarChar, data.EvolveInvoice_EwayBillNumber)
                .input('EvolveEinvoiceHistoryEwbDtls_VehNo', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_VehNo)
                .input('EvolveEinvoiceHistorySellerDtls_Pin', Evolve.Sql.NVarChar, data.EvolveInvoiceSellerDtls_Pin)
                .input('EvolveEinvoiceHistoryEwbDtls_Distance', Evolve.Sql.Int, data.EvolveInvoiceEwbDtls_Distance)
                .input('EvolveEinvoiceHistorySellerDtls_Loc', Evolve.Sql.NVarChar, data.EvolveInvoiceSellerDtls_Loc)
                .input('EvolveEinvoiceHistorySellerDtls_State', Evolve.Sql.NVarChar, data.EvolveInvoiceSellerDtls_State)
                .input('EvolveEinvoiceHistorySellerDtls_StateCode', Evolve.Sql.Int, data.EvolveInvoiceSellerDtls_StateCode)
                .input('EvolveEinvoiceHistoryEwbDtls_TransDocNo', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_TransDocNo)
                .input('EvolveEinvoiceHistoryEwbDtls_TransDocDt', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_TransDocDt)
                .input('EvolveEinvoiceHistoryEwbDtls_ExtendRsnCode', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_ExtendRsnCode)
                .input('EvolveEinvoiceHistoryEwbDtls_TransMode', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_TransMode)
                .input('EvolveEinvoiceHistoryEwbDtls_ExtendRemarks', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_ExtendRemarks)
                .input('EvolveEinvoiceHistoryEwbDtls_ConsignmentStatus', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_ConsignmentStatus)
                .query(" UPDATE EvolveEinvoiceHistory SET EvolveEinvoiceHistory_EwayBillNumber = @EvolveEinvoiceHistory_EwayBillNumber, EvolveEinvoiceHistoryEwbDtls_VehNo = @EvolveEinvoiceHistoryEwbDtls_VehNo, EvolveEinvoiceHistorySellerDtls_Pin = @EvolveEinvoiceHistorySellerDtls_Pin, EvolveEinvoiceHistoryEwbDtls_Distance = @EvolveEinvoiceHistoryEwbDtls_Distance, EvolveEinvoiceHistorySellerDtls_Loc = @EvolveEinvoiceHistorySellerDtls_Loc, EvolveEinvoiceHistorySellerDtls_State = @EvolveEinvoiceHistorySellerDtls_State, EvolveEinvoiceHistorySellerDtls_StateCode = @EvolveEinvoiceHistorySellerDtls_StateCode, EvolveEinvoiceHistoryEwbDtls_TransDocNo = @EvolveEinvoiceHistoryEwbDtls_TransDocNo, EvolveEinvoiceHistoryEwbDtls_TransDocDt = @EvolveEinvoiceHistoryEwbDtls_TransDocDt, EvolveEinvoiceHistoryEwbDtls_ExtendRsnCode = @EvolveEinvoiceHistoryEwbDtls_ExtendRsnCode, EvolveEinvoiceHistoryEwbDtls_TransMode = @EvolveEinvoiceHistoryEwbDtls_TransMode, EvolveEinvoiceHistoryEwbDtls_ExtendRemarks = @EvolveEinvoiceHistoryEwbDtls_ExtendRemarks, EvolveEinvoiceHistoryEwbDtls_ConsignmentStatus = @EvolveEinvoiceHistoryEwbDtls_ConsignmentStatus WHERE EvolveEinvoiceHistory_Number = @EvolveEinvoiceHistory_Number");
        } catch (error) {
            Evolve.Log.error(" EERR32758 : Error while Extend E-Way Bill EInvoice History " + error.message);
            return new Error(" EERR32758 : Error while Extend E-Way Bill EInvoice History " + error.message);
        }
    },

    changeVehicleInvoice: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvoice_ID', Evolve.Sql.Int, data.EvolveInvoice_ID)
                .input('EvolveInvoice_EwayBillNumber', Evolve.Sql.NVarChar, data.EvolveInvoice_EwayBillNumber)
                .input('EvolveInvoiceEwbDtls_ChangeVehGrpNo', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_ChangeVehGrpNo)
                .input('EvolveInvoiceEwbDtls_VehNo', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_VehNo)
                .input('EvolveInvoiceEwbDtls_TransDocNo', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_TransDocNo)
                .input('EvolveInvoiceSellerDtls_Loc', Evolve.Sql.NVarChar, data.EvolveInvoiceSellerDtls_Loc)
                .input('EvolveInvoiceSellerDtls_State', Evolve.Sql.NVarChar, data.EvolveInvoiceSellerDtls_State)
                .input('EvolveInvoiceEwbDtls_ChangeVehRsnCode', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_ChangeVehRsnCode)
                .input('EvolveInvoiceEwbDtls_ChangeVehRemarks', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_ChangeVehRemarks)

                .query(" UPDATE EvolveInvoice SET EvolveInvoice_EwayBillNumber =@EvolveInvoice_EwayBillNumber, EvolveInvoiceEwbDtls_ChangeVehGrpNo = @EvolveInvoiceEwbDtls_ChangeVehGrpNo, EvolveInvoiceEwbDtls_VehNo = @EvolveInvoiceEwbDtls_VehNo, EvolveInvoiceEwbDtls_TransDocNo = @EvolveInvoiceEwbDtls_TransDocNo, EvolveInvoiceSellerDtls_Loc = @EvolveInvoiceSellerDtls_Loc, EvolveInvoiceSellerDtls_State = @EvolveInvoiceSellerDtls_State, EvolveInvoiceEwbDtls_ChangeVehRsnCode = @EvolveInvoiceEwbDtls_ChangeVehRsnCode, EvolveInvoiceEwbDtls_ChangeVehRemarks = @EvolveInvoiceEwbDtls_ChangeVehRemarks WHERE EvolveInvoice_ID = @EvolveInvoice_ID ; SELECT EvolveInvoice_Number FROM EvolveInvoice WHERE EvolveInvoice_ID = @EvolveInvoice_ID");
        } catch (error) {
            Evolve.Log.error(" EERR32759 : Error while Change E-Way Bill " + error.message);
            return new Error(" EERR32759 : Error while Change E-Way Bill " + error.message);
        }
    },

    changeVehicleEInvoiceHistory: async function (EvolveInvoice_Number, data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoiceHistory_Number', Evolve.Sql.NVarChar, EvolveInvoice_Number)
                .input('EvolveEinvoiceHistory_EwayBillNumber', Evolve.Sql.NVarChar, data.EvolveInvoice_EwayBillNumber)
                .input('EvolveEinvoiceHistoryEwbDtls_ChangeVehGrpNo', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_ChangeVehGrpNo)
                .input('EvolveEinvoiceHistoryEwbDtls_VehNo', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_VehNo)
                .input('EvolveEinvoiceHistoryEwbDtls_TransDocNo', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_TransDocNo)
                .input('EvolveEinvoiceHistorySellerDtls_Loc', Evolve.Sql.NVarChar, data.EvolveInvoiceSellerDtls_Loc)
                .input('EvolveEinvoiceHistorySellerDtls_State', Evolve.Sql.NVarChar, data.EvolveInvoiceSellerDtls_State)
                .input('EvolveEinvoiceHistoryEwbDtls_ChangeVehRsnCode', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_ChangeVehRsnCode)
                .input('EvolveEinvoiceHistoryEwbDtls_ChangeVehRemarks', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_ChangeVehRemarks)

                .query(" UPDATE EvolveEinvoiceHistory SET EvolveEinvoiceHistory_EwayBillNumber = @EvolveEinvoiceHistory_EwayBillNumber, EvolveEinvoiceHistoryEwbDtls_ChangeVehGrpNo = @EvolveEinvoiceHistoryEwbDtls_ChangeVehGrpNo, EvolveEinvoiceHistoryEwbDtls_VehNo = @EvolveEinvoiceHistoryEwbDtls_VehNo, EvolveEinvoiceHistoryEwbDtls_TransDocNo = @EvolveEinvoiceHistoryEwbDtls_TransDocNo, EvolveEinvoiceHistorySellerDtls_Loc = @EvolveEinvoiceHistorySellerDtls_Loc, EvolveEinvoiceHistorySellerDtls_State = @EvolveEinvoiceHistorySellerDtls_State, EvolveEinvoiceHistoryEwbDtls_ChangeVehRsnCode = @EvolveEinvoiceHistoryEwbDtls_ChangeVehRsnCode, EvolveEinvoiceHistoryEwbDtls_ChangeVehRemarks = @EvolveEinvoiceHistoryEwbDtls_ChangeVehRemarks WHERE EvolveEinvoiceHistory_Number = @EvolveEinvoiceHistory_Number ");
        } catch (error) {
            Evolve.Log.error(" EERR32760 : Error while Change Vehicle EInvoice History " + error.message);
            return new Error(" EERR32760 : Error while Change Vehicle EInvoice History " + error.message);
        }
    },

    getSingleInvoiceDetail: async function (EvolveInvoice_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvoice_ID', Evolve.Sql.Int, EvolveInvoice_ID)

                .query(" SELECT * FROM EvolveInvoice WHERE EvolveInvoice_ID = @EvolveInvoice_ID");
        } catch (error) {
            Evolve.Log.error(" EERR32761 : Error while get Single Invoice Details " + error.message);
            return new Error(" EERR32761 : Error while get Single Invoice Details " + error.message);
        }
    },

    cancelEInvoice: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvoice_ID', Evolve.Sql.Int, data.EvolveInvoice_ID)
                .input('EvolveInvoice_cancelInvRsnCode', Evolve.Sql.Int, data.EvolveInvoice_cancelInvRsnCode)
                .input('EvolveInvoice_cancelInvRemarks', Evolve.Sql.NVarChar, data.EvolveInvoice_cancelInvRemarks)

                .query(" UPDATE EvolveInvoice SET EvolveInvoice_cancelInvRsnCode = @EvolveInvoice_cancelInvRsnCode, EvolveInvoice_cancelInvRemarks = @EvolveInvoice_cancelInvRemarks WHERE EvolveInvoice_ID = @EvolveInvoice_ID ; SELECT EvolveInvoice_Number FROM EvolveInvoice WHERE EvolveInvoice_ID = @EvolveInvoice_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR32762: Error while Cancel E-Invoice " + error.message);
            return new Error(" EERR32762: Error while Cancel E-Invoice " + error.message);
        }
    },

    cancelEInvoiceEinvoiceHistory: async function (EvolveInvoice_Number, data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoiceHistory_Number', Evolve.Sql.NVarChar, EvolveInvoice_Number)
                .input('EvolveEinvoiceHistory_cancelInvRsnCode', Evolve.Sql.Int, data.EvolveInvoice_cancelInvRsnCode)
                .input('EvolveEinvoiceHistory_cancelInvRemarks', Evolve.Sql.NVarChar, data.EvolveInvoice_cancelInvRemarks)

                .query(" UPDATE EvolveEinvoiceHistory SET EvolveEinvoiceHistory_cancelInvRsnCode = @EvolveEinvoiceHistory_cancelInvRsnCode, EvolveEinvoiceHistory_cancelInvRemarks = @EvolveEinvoiceHistory_cancelInvRemarks WHERE EvolveEinvoiceHistory_Number = @EvolveEinvoiceHistory_Number ");
        } catch (error) {
            Evolve.Log.error(" EERR32763 : Error while Cancel E-Invoice EInvoice History " + error.message);
            return new Error(" EERR32763 : Error while Cancel E-Invoice EInvoice History " + error.message);
        }
    },

    getStateList : async function () {
        try {
            return await Evolve.SqlPool.request()
                .query(" SELECT * FROM EvolveState ");
        } catch (error) {
            Evolve.Log.error(" EERR32764 : Error while Getting State List " + error.message);
            return new Error(" EERR32764 : Error while Getting State List " + error.message);
        }
    },

    getStateCode : async function (EvolveInvoiceSellerDtls_State) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvoiceSellerDtls_State', Evolve.Sql.NVarChar, EvolveInvoiceSellerDtls_State)
                .query(" SELECT * FROM EvolveState WHERE EvolveState_Name = @EvolveInvoiceSellerDtls_State ");
        } catch (error) {
            Evolve.Log.error(" EERR#### : Error while Getting State Code " + error.message);
            return new Error(" EERR#### : Error while Getting State Code " + error.message);
        }
    },
    
    updateEwayBillInvoice : async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvoice_ID', Evolve.Sql.Int, data.EvolveInvoice_ID)
                .input('EvolveInvoice_EwayBillNumber', Evolve.Sql.NVarChar, data.EvolveInvoice_EwayBillNumber)
                .input('EvolveInvoiceEwbDtls_VehNo', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_VehNo)
                .input('EvolveInvoiceSellerDtls_Loc', Evolve.Sql.NVarChar, data.EvolveInvoiceSellerDtls_Loc)
                .input('EvolveInvoiceSellerDtls_State', Evolve.Sql.NVarChar, data.EvolveInvoiceSellerDtls_State)
                .input('EvolveInvoiceSellerDtls_StateCode', Evolve.Sql.Int, data.EvolveInvoiceSellerDtls_StateCode)
                .input('EvolveInvoiceEwbDtls_TransDocNo', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_TransDocNo)
                .input('EvolveInvoiceEwbDtls_TransDocDt', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_TransDocDt)
                .input('EvolveInvoiceEwbDtls_UpdateRsnCode', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_UpdateRsnCode)
                .input('EvolveInvoiceEwbDtls_UpdateRsnRemark', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_UpdateRsnRemark)

                .query(" UPDATE EvolveInvoice SET EvolveInvoice_EwayBillNumber = @EvolveInvoice_EwayBillNumber, EvolveInvoiceEwbDtls_VehNo = @EvolveInvoiceEwbDtls_VehNo, EvolveInvoiceSellerDtls_Loc = @EvolveInvoiceSellerDtls_Loc, EvolveInvoiceSellerDtls_State = @EvolveInvoiceSellerDtls_State, EvolveInvoiceSellerDtls_StateCode = @EvolveInvoiceSellerDtls_StateCode, EvolveInvoiceEwbDtls_TransDocNo = @EvolveInvoiceEwbDtls_TransDocNo, EvolveInvoiceEwbDtls_TransDocDt = @EvolveInvoiceEwbDtls_TransDocDt, EvolveInvoiceEwbDtls_UpdateRsnCode = @EvolveInvoiceEwbDtls_UpdateRsnCode, EvolveInvoiceEwbDtls_UpdateRsnRemark = @EvolveInvoiceEwbDtls_UpdateRsnRemark ; SELECT EvolveInvoice_Number FROM EvolveInvoice WHERE EvolveInvoice_ID = @EvolveInvoice_ID");
        } catch (error) {
            Evolve.Log.error(" EERR32757 : Error while Extend E-Way Bill Invoice " + error.message);
            return new Error(" EERR32757 : Error while Extend E-Way Bill Invoice " + error.message);
        }
    },

    updateEwayBillEInvoiceHistory : async function (EvolveInvoice_Number, data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoiceHistory_Number', Evolve.Sql.NVarChar, EvolveInvoice_Number)
                .input('EvolveEinvoiceHistory_EwayBillNumber', Evolve.Sql.NVarChar, data.EvolveInvoice_EwayBillNumber)
                .input('EvolveEinvoiceHistoryEwbDtls_VehNo', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_VehNo)
                .input('EvolveEinvoiceHistorySellerDtls_Loc', Evolve.Sql.NVarChar, data.EvolveInvoiceSellerDtls_Loc)
                .input('EvolveEinvoiceHistorySellerDtls_State', Evolve.Sql.NVarChar, data.EvolveInvoiceSellerDtls_State)
                .input('EvolveEinvoiceHistorySellerDtls_StateCode', Evolve.Sql.Int, data.EvolveInvoiceSellerDtls_StateCode)
                .input('EvolveEinvoiceHistoryEwbDtls_TransDocNo', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_TransDocNo)
                .input('EvolveEinvoiceHistoryEwbDtls_TransDocDt', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_TransDocDt)
                .input('EvolveEinvoiceHistoryEwbDtls_UpdateRsnCode', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_UpdateRsnCode)
                .input('EvolveEinvoiceHistoryEwbDtls_UpdateRsnRemark', Evolve.Sql.NVarChar, data.EvolveInvoiceEwbDtls_UpdateRsnRemark)

                .query(" UPDATE EvolveInvoice SET EvolveEinvoiceHistory_EwayBillNumber = @EvolveEinvoiceHistory_EwayBillNumber, EvolveEinvoiceHistoryEwbDtls_VehNo = @EvolveEinvoiceHistoryEwbDtls_VehNo, EvolveEinvoiceHistorySellerDtls_Loc = @EvolveEinvoiceHistorySellerDtls_Loc, EvolveEinvoiceHistorySellerDtls_State = @EvolveEinvoiceHistorySellerDtls_State, EvolveEinvoiceHistorySellerDtls_StateCode = @EvolveEinvoiceHistorySellerDtls_StateCode, EvolveEinvoiceHistoryEwbDtls_TransDocNo = @EvolveEinvoiceHistoryEwbDtls_TransDocNo, EvolveEinvoiceHistoryEwbDtls_TransDocDt = @EvolveEinvoiceHistoryEwbDtls_TransDocDt, EvolveEinvoiceHistoryEwbDtls_UpdateRsnCode = @EvolveEinvoiceHistoryEwbDtls_UpdateRsnCode, EvolveEinvoiceHistoryEwbDtls_UpdateRsnRemark = @EvolveEinvoiceHistoryEwbDtls_UpdateRsnRemark ");
        } catch (error) {
            Evolve.Log.error(" EERR32757 : Error while Extend E-Way Bill Invoice " + error.message);
            return new Error(" EERR32757 : Error while Extend E-Way Bill Invoice " + error.message);
        }
    },

    
    // POD start

    getPodDetails: async function (EvolveInvoice_Number) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvoice_Number', Evolve.Sql.NVarChar, EvolveInvoice_Number)
                .query("SELECT *, convert(varchar, EvolveInvoice_Date, 23)  as minInvDate, convert(varchar, EvolveInvoice_podDeliveryDate, 103) as podDeliveryDate FROM EvolveInvoice WHERE EvolveInvoice_Number = @EvolveInvoice_Number");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting invoice list " + error.message);
            return new Error(" EERR####: Error while getting invoice list " + error.message);
        }
    },

    savePodDetails: async function (data, fileName) {
        data.podDeliveryDate =data.podDeliveryDate.split("/").reverse().join("/").replace("/", "/");

        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvoice_Number', Evolve.Sql.NVarChar, data.invoiceNo)
                .input('EvolveInvoice_podDeliveryDate', Evolve.Sql.NVarChar, data.podDeliveryDate)
                .input('EvolveInvoice_PodDocName', Evolve.Sql.NVarChar, fileName)
                .query("UPDATE EvolveInvoice SET EvolveInvoice_podDeliveryDate = @EvolveInvoice_podDeliveryDate, EvolveInvoice_PodDocName = @EvolveInvoice_PodDocName, EvolveInvoice_irnCnlStatus = null WHERE EvolveInvoice_Number = @EvolveInvoice_Number");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while save POD Details " + error.message);
            return new Error(" EERR####: Error while save POD Details " + error.message);
        }
    },

    getInvoiceListCountPod: async function (search, data) {
        try {
            if (data.EvolveUnit_ID == '') {
                let getUnitFromUser = await Evolve.SqlPool.request()
                    .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                    .query("select EvolveUnit_ID from EvolveUserUnitLink WHERE EvolveUser_ID = @EvolveUser_ID");
                if (getUnitFromUser.rowsAffected > 0) {
                    let UnitIdArray = [];
                    for (let i = 0; i < getUnitFromUser.rowsAffected; i++) {
                        UnitIdArray.push(getUnitFromUser.recordset[i].EvolveUnit_ID)
                    }
                    // console.log("UnitIdArray :",UnitIdArray.join(','));
                    data.EvolveUnit_ID = UnitIdArray.join(',')
                }
            }

            let query = "SELECT COUNT(ei.EvolveInvoice_ID) AS count FROM EvolveDocument ed, EvolveInvoice ei LEFT JOIN EvolveUnit eu ON eu.EvolveUnit_ID = ei.EvolveUnit_ID LEFT JOIN EvolveSupplier es ON ei.EvolveSupplier_ID = es.EvolveSupplier_ID WHERE ed.EvolveDocument_ID = ei.EvolveDocument_ID";
            if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID.length == 0 && data.EvolveSupplier_ID == '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND convert(date, ei.EvolveInvoice_Date, 103) >= FORMAT(getDate(), '" + startDate + "') AND convert(date, ei.EvolveInvoice_Date, 103) <= FORMAT(getDate(), '" + endDate + "')";

            } else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID == '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND convert(date, ei.EvolveInvoice_Date, 103) >= FORMAT(getDate(), '" + startDate + "') AND convert(date, ei.EvolveInvoice_Date, 103) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID.toString() + ")";
            }
            else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID != '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND convert(date, ei.EvolveInvoice_Date, 103) >= FORMAT(getDate(), '" + startDate + "') AND convert(date, ei.EvolveInvoice_Date, 103) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID + ") AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID.length == 0 && data.EvolveSupplier_ID != '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND convert(date, ei.EvolveInvoice_Date, 103) >= FORMAT(getDate(), '" + startDate + "') AND convert(date, ei.EvolveInvoice_Date, 103) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID.length == 0 && data.EvolveSupplier_ID != '') {
                query = query + " AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID != '') {
                query = query + " AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "' AND ei.EvolveUnit_ID = '" + data.EvolveUnit_ID + "' ";
            }
            else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID == '') {
                query = query + " AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID.toString() + ")";
            } else {

            }
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query(query + " AND ei.EvolveInvoice_Number LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR1061: Error while getting E-Invoice List Count " + error.message);
            return new Error(" EERR1061: Error while getting E-Invoice List Count " + error.message);
        }
    },

    getInvoiceListPod: async function (start, length, search, data) {
        try {
            if (data.EvolveUnit_ID == '') {
                let getUnitFromUser = await Evolve.SqlPool.request()
                    .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                    .query("select EvolveUnit_ID from EvolveUserUnitLink WHERE EvolveUser_ID = @EvolveUser_ID");
                if (getUnitFromUser.rowsAffected > 0) {
                    let UnitIdArray = [];
                    for (let i = 0; i < getUnitFromUser.rowsAffected; i++) {
                        UnitIdArray.push(getUnitFromUser.recordset[i].EvolveUnit_ID)
                    }
                    // console.log("UnitIdArray :",UnitIdArray.join(','));
                    data.EvolveUnit_ID = UnitIdArray.join(',')
                }
            }

            let query = 'SELECT ei.*, convert(varchar, EvolveInvoice_podDeliveryDate, 103)  as podDeliveryDate, DATEDIFF(dy, (CONVERT(DATE, ei.EvolveInvoice_Date, 103)), (CONVERT(DATE, ei.EvolveInvoice_podDeliveryDate, 103))) AS podDayDiff, ed.EvolveDocument_Name, ed.EvolveDocument_IsEmail_Process, ed.EvolveDocument_SignatureSetting, ed.EvolveDocument_SignatureSettingDetails, ed.EvolveDocument_DS_Setting, DATEDIFF(mi, ei.EvolveInvoice_CreatedAt, ei.EvolveInvoice_UpdatedAt) AS TimeDuartion, eu.EvolveUnit_Code, es.EvolveSupplier_Name FROM EvolveDocument ed, EvolveInvoice ei LEFT JOIN EvolveUnit eu ON eu.EvolveUnit_ID = ei.EvolveUnit_ID LEFT JOIN EvolveSupplier es ON ei.EvolveSupplier_ID = es.EvolveSupplier_ID WHERE ei.EvolveDocument_ID = ed.EvolveDocument_ID';
            if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID.length == 0 && data.EvolveSupplier_ID == '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND convert(date, ei.EvolveInvoice_Date, 103) >= FORMAT(getDate(), '" + startDate + "') AND convert(date, ei.EvolveInvoice_Date, 103) <= FORMAT(getDate(), '" + endDate + "')";

            } else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID == '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                // query = query + " AND cast(EvolveInvoice_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveInvoice_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveUnit_ID = '" + data.EvolveUnit_ID + "'  ";

                query = query + " AND convert(date, ei.EvolveInvoice_Date, 103) >= FORMAT(getDate(), '" + startDate + "') AND convert(date, ei.EvolveInvoice_Date, 103) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID.toString() + ")";
            }
            else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID != '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND convert(date, ei.EvolveInvoice_Date, 103) >= FORMAT(getDate(), '" + startDate + "') AND convert(date, ei.EvolveInvoice_Date, 103) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveUnit_ID = (" + data.EvolveUnit_ID + ") AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            
            else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID.length == 0 && data.EvolveSupplier_ID != '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND convert(date, ei.EvolveInvoice_Date, 103) >= FORMAT(getDate(), '" + startDate + "') AND convert(date, ei.EvolveInvoice_Date, 103) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID.length == 0 && data.EvolveSupplier_ID != '') {
                query = query + " AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID != '') {
                query = query + " AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "' AND ei.EvolveUnit_ID = '" + data.EvolveUnit_ID + "' ";
            } else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID == '') {
                query = query + " AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID.toString() + ")";
            } else {

            }

            // console.log("start============",start)
            // console.log("length============",length)
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query(query + " AND (ei.EvolveInvoice_Number LIKE @search OR ei.EvolveProject_Name LIKE @search) ORDER BY ei.EvolveInvoice_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
            

        } catch (error) {
            Evolve.Log.error(" EERR1062: Error while getting E-Invoice List " + error.message);
            return new Error(" EERR1062: Error while getting E-Invoice List " + error.message);
        }
    },

    onClickClnIrnPod : async function (EvolveInvoice_Number) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInvoice_Number', Evolve.Sql.NVarChar, EvolveInvoice_Number)
                .query("UPDATE EvolveInvoice SET EvolveInvoice_irnCnlStatus = 'CANCELED', EvolveInvoice_podDeliveryDate = null, EvolveInvoice_PodDocName = null WHERE EvolveInvoice_Number = @EvolveInvoice_Number");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while cancel Invoice pod " + error.message);
            return new Error(" EERR####: Error while cancel Invoice pod " + error.message);
        }
    },

    getUnitListPod : async function (EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
                .query("SELECT * FROM EvolveUnit eu, EvolveUserUnitLink euul WHERE eu.EvolveUnit_ID = euul.EvolveUnit_ID AND euul.EvolveUser_ID = @EvolveUser_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR1063: Error while getting Unit List " + error.message);
            return new Error(" EERR1063: Error while getting Unit List " + error.message);
        }
    },

    getInvoiceListPodDownloadCsv: async function (start, length, search, data) {
        try {
            if (data.EvolveUnit_ID == '') {
                let getUnitFromUser = await Evolve.SqlPool.request()
                    .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                    .query("select EvolveUnit_ID from EvolveUserUnitLink WHERE EvolveUser_ID = @EvolveUser_ID");
                if (getUnitFromUser.rowsAffected > 0) {
                    let UnitIdArray = [];
                    for (let i = 0; i < getUnitFromUser.rowsAffected; i++) {
                        UnitIdArray.push(getUnitFromUser.recordset[i].EvolveUnit_ID)
                    }
                    // console.log("UnitIdArray :",UnitIdArray.join(','));
                    data.EvolveUnit_ID = UnitIdArray.join(',')
                }
            }

            let query = 'SELECT ei.*, convert(varchar, EvolveInvoice_podDeliveryDate, 103)  as podDeliveryDate, DATEDIFF(dy, (CONVERT(DATE, ei.EvolveInvoice_Date, 103)), (CONVERT(DATE, ei.EvolveInvoice_podDeliveryDate, 103))) AS podDayDiff, ed.EvolveDocument_Name, ed.EvolveDocument_IsEmail_Process, ed.EvolveDocument_SignatureSetting, ed.EvolveDocument_SignatureSettingDetails, ed.EvolveDocument_DS_Setting, DATEDIFF(mi, ei.EvolveInvoice_CreatedAt, ei.EvolveInvoice_UpdatedAt) AS TimeDuartion, eu.EvolveUnit_Code, es.EvolveSupplier_Name FROM EvolveDocument ed, EvolveInvoice ei LEFT JOIN EvolveUnit eu ON eu.EvolveUnit_ID = ei.EvolveUnit_ID LEFT JOIN EvolveSupplier es ON ei.EvolveSupplier_ID = es.EvolveSupplier_ID WHERE ei.EvolveDocument_ID = ed.EvolveDocument_ID';
            if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID.length == 0 && data.EvolveSupplier_ID == '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND convert(date, ei.EvolveInvoice_Date, 103) >= FORMAT(getDate(), '" + startDate + "') AND convert(date, ei.EvolveInvoice_Date, 103) <= FORMAT(getDate(), '" + endDate + "')";

            } else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID == '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                // query = query + " AND cast(EvolveInvoice_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveInvoice_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveUnit_ID = '" + data.EvolveUnit_ID + "'  ";

                query = query + " AND convert(date, ei.EvolveInvoice_Date, 103) >= FORMAT(getDate(), '" + startDate + "') AND convert(date, ei.EvolveInvoice_Date, 103) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID.toString() + ")";
            }
            else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID != '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND convert(date, ei.EvolveInvoice_Date, 103) >= FORMAT(getDate(), '" + startDate + "') AND convert(date, ei.EvolveInvoice_Date, 103) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveUnit_ID = (" + data.EvolveUnit_ID + ") AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            
            else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID.length == 0 && data.EvolveSupplier_ID != '') {
                let dt = data.searchStartDate.split("/")
                let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                dt = data.searchEndDate.split("/")
                let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                query = query + " AND convert(date, ei.EvolveInvoice_Date, 103) >= FORMAT(getDate(), '" + startDate + "') AND convert(date, ei.EvolveInvoice_Date, 103) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID.length == 0 && data.EvolveSupplier_ID != '') {
                query = query + " AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID != '') {
                query = query + " AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "' AND ei.EvolveUnit_ID = '" + data.EvolveUnit_ID + "' ";
            } else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID == '') {
                query = query + " AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID.toString() + ")";
            } else {

            }

            // console.log("start============",start)
            // console.log("length============",length)
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query(query + " AND (ei.EvolveInvoice_Number LIKE @search OR ei.EvolveProject_Name LIKE @search) ORDER BY ei.EvolveInvoice_ID desc ");
            

        } catch (error) {
            Evolve.Log.error(" EERR1062: Error while getting E-Invoice List " + error.message);
            return new Error(" EERR1062: Error while getting E-Invoice List " + error.message);
        }
    },


}