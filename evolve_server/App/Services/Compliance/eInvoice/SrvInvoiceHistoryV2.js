'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

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
    getInvoiceListCount: async function (search, data) {
        try {
            if(data.EvolveUnit_ID=='')
            {
                let getUnitFromUser =  await Evolve.SqlPool.request()
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("select EvolveUnit_ID from EvolveUserUnitLink WHERE EvolveUser_ID = @EvolveUser_ID");
                if(getUnitFromUser.rowsAffected > 0){
                    let UnitIdArray = [];
                    for(let i=0;i<getUnitFromUser.rowsAffected;i++)
                    {
                        UnitIdArray.push(getUnitFromUser.recordset[i].EvolveUnit_ID)
                    }
                    // console.log("UnitIdArray :",UnitIdArray.join(','));
                    data.EvolveUnit_ID = UnitIdArray.join(',')
                }
            }
            let query = "SELECT COUNT(ei.EvolveInvoice_ID) AS count FROM EvolveDocument ed, EvolveInvoice ei LEFT JOIN EvolveUnit eu ON eu.EvolveUnit_ID = ei.EvolveUnit_ID LEFT JOIN EvolveSupplier es ON ei.EvolveSupplier_ID = es.EvolveSupplier_ID WHERE ed.EvolveDocument_ID = ei.EvolveDocument_ID";
            if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID == '' && data.EvolveSupplier_ID == '') {
                // let dt = data.searchStartDate.split("/")
                // let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                // dt = data.searchEndDate.split("/")
                // let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                // query = query + " AND cast(EvolveInvoice_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveInvoice_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "')";

                query = query + " AND convert(datetime, EvolveInvoice_Date, 103)  BETWEEN CONVERT(DATE, '"+data.searchStartDate+"', 103) AND CONVERT(DATE, '"+data.searchEndDate+"', 103) ";

            } else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID == '') {
                // let dt = data.searchStartDate.split("/")
                // let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                // dt = data.searchEndDate.split("/")
                // let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                // query = query + " AND cast(EvolveInvoice_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveInvoice_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID.toString() + ") ";

                query = query + " AND convert(datetime, EvolveInvoice_Date, 103)  BETWEEN CONVERT(DATE, '"+data.searchStartDate+"', 103) AND CONVERT(DATE, '"+data.searchEndDate+"', 103) AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID.toString() + ") ";
            }
            else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID != '') {
                // let dt = data.searchStartDate.split("/")
                // let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                // dt = data.searchEndDate.split("/")
                // let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                // query = query + " AND cast(EvolveInvoice_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveInvoice_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID.toString() + ") AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";

                query = query + " AND convert(datetime, EvolveInvoice_Date, 103)  BETWEEN CONVERT(DATE, '"+data.searchStartDate+"', 103) AND CONVERT(DATE, '"+data.searchEndDate+"', 103) AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID.toString() + ") AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID == '' && data.EvolveSupplier_ID != '') {
                // let dt = data.searchStartDate.split("/")
                // let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                // dt = data.searchEndDate.split("/")
                // let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                // query = query + " AND cast(EvolveInvoice_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveInvoice_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";

                query = query + " AND convert(datetime, EvolveInvoice_Date, 103)  BETWEEN CONVERT(DATE, '"+data.searchStartDate+"', 103) AND CONVERT(DATE, '"+data.searchEndDate+"', 103) AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID == '' && data.EvolveSupplier_ID != '') {
                query = query + " AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID != '') {
                query = query + " AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "' AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID.toString() + ") ";
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

    getInvoiceList: async function (start, length, search, data) {
        try {
            // console.log("data====", data)
            if(data.EvolveUnit_ID=='')
            {
                let getUnitFromUser =  await Evolve.SqlPool.request()
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("select EvolveUnit_ID from EvolveUserUnitLink WHERE EvolveUser_ID = @EvolveUser_ID");
                if(getUnitFromUser.rowsAffected > 0){
                    let UnitIdArray = [];
                    for(let i=0;i<getUnitFromUser.rowsAffected;i++)
                    {
                        UnitIdArray.push(getUnitFromUser.recordset[i].EvolveUnit_ID)
                    }
                    // console.log("UnitIdArray :",UnitIdArray.join(','));
                    data.EvolveUnit_ID = UnitIdArray.join(',')
                }
            }
            let query = 'SELECT ei.*, ed.EvolveDocument_Name, ed.EvolveDocument_IsEmail_Process, ed.EvolveDocument_SignatureSetting, ed.EvolveDocument_SignatureSettingDetails, ed.EvolveDocument_DS_Setting, DATEDIFF(mi, ei.EvolveInvoice_CreatedAt, ei.EvolveInvoice_UpdatedAt) AS TimeDuartion, eu.EvolveUnit_Name, eu.EvolveUnit_Code, es.EvolveSupplier_Name FROM EvolveDocument ed, EvolveInvoice ei LEFT JOIN EvolveUnit eu ON eu.EvolveUnit_ID = ei.EvolveUnit_ID LEFT JOIN EvolveSupplier es ON ei.EvolveSupplier_ID = es.EvolveSupplier_ID WHERE ei.EvolveDocument_ID = ed.EvolveDocument_ID';
            if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID == '' && data.EvolveSupplier_ID == '') {
                // let dt = data.searchStartDate.split("/")
                // let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                // dt = data.searchEndDate.split("/")
                // let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                // query = query + " AND cast(EvolveInvoice_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveInvoice_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "')";

                query = query + " AND convert(datetime, EvolveInvoice_Date, 103)  BETWEEN CONVERT(DATE, '"+data.searchStartDate+"', 103) AND CONVERT(DATE, '"+data.searchEndDate+"', 103)";

            } else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID == '') {
                // let dt = data.searchStartDate.split("/")
                // let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                // dt = data.searchEndDate.split("/")
                // let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                // query = query + " AND cast(EvolveInvoice_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveInvoice_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID.toString() + ") ";

                query = query + " AND convert(datetime, EvolveInvoice_Date, 103)  BETWEEN CONVERT(DATE, '"+data.searchStartDate+"', 103) AND CONVERT(DATE, '"+data.searchEndDate+"', 103) AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID.toString() + ") ";
            }
            else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID != '') {
                // let dt = data.searchStartDate.split("/")
                // let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                // dt = data.searchEndDate.split("/")
                // let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                // query = query + " AND cast(EvolveInvoice_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveInvoice_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID.toString() + ") AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";

                query = query + " AND convert(datetime, EvolveInvoice_Date, 103)  BETWEEN CONVERT(DATE, '"+data.searchStartDate+"', 103) AND CONVERT(DATE, '"+data.searchEndDate+"', 103) AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID.toString() + ") AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate != '' && data.searchEndDate != '' && data.EvolveUnit_ID == '' && data.EvolveSupplier_ID != '') {
                // let dt = data.searchStartDate.split("/")
                // let startDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                // dt = data.searchEndDate.split("/")
                // let endDate = dt[2] + "-" + dt[1] + "-" + dt[0];

                // query = query + " AND cast(EvolveInvoice_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveInvoice_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "') AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";

                query = query + " AND convert(datetime, EvolveInvoice_Date, 103)  BETWEEN CONVERT(DATE, '"+data.searchStartDate+"', 103) AND CONVERT(DATE, '"+data.searchEndDate+"', 103) AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID == '' && data.EvolveSupplier_ID != '') {
                query = query + " AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "'  ";
            }
            else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID != '') {
                query = query + " AND ei.EvolveSupplier_ID = '" + data.EvolveSupplier_ID + "' AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID.toString() + ") ";
            } else if (data.searchStartDate == '' && data.searchEndDate == '' && data.EvolveUnit_ID != '' && data.EvolveSupplier_ID == '') {
                query = query + " AND ei.EvolveUnit_ID IN (" + data.EvolveUnit_ID.toString() + ")";
            } else {

            }
            // console.log('Query>>',query);
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




    updateEInvoice: async function (data) {
        try {
            console.log(data)
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
            console.log(data)
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
}