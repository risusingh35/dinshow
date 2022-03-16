'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getBedHistoryReportCount: async function (data) {
        try {
            let query = "";
            // console.log("data-----------", data);
            if (data.bedCode != '') {
                console.log("bed code------------");
                query = "AND eb.EvolveBed_Code = '" + data.bedCode + "'";
            }
            if (data.startDate != '' && data.endDate != '' && (data.inorouttime == 'intime' || data.inorouttime == 'outtime')) {
                console.log("date------------");
                let dt = data.startDate.split("/")
                let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                dt = data.endDate.split("/");
                let edt = new Date(dt[2], dt[1] - 1, dt[0]);
                let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
                // if (query != "") { query = query + " AND " }
                if (data.inorouttime == 'intime') {
                    console.log("intime--------------");
                    query = query + " AND cast(ebh.EvolveBedHistory_InTime as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(ebh.EvolveBedHistory_InTime as date) <= FORMAT(getDate(), '" + endDate + "')";
                }
                else {
                    console.log("out time--------------");
                    query = query + " AND cast(ebh.EvolveBedHistory_OutTime as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(ebh.EvolveBedHistory_OutTime as date) <= FORMAT(getDate(), '" + endDate + "')";
                }
            }
            let SqlQuery = "SELECT count(ebh.EvolveBedHistory_ID) AS count FROM EvolveBedsHistory ebh , EvolveBeds eb WHERE ebh.EvolveBed_ID = eb.EvolveBed_ID " + query;
            return await Evolve.SqlPool.request().query(SqlQuery);

        } catch (error) {
            Evolve.Log.error(" EERR1081: Error while getting Bed History Report Count "+error.message);
            return new Error(" EERR1081: Error while getting Bed History Report Count "+error.message);
        }
    },

    getBedHistoryReportDatatableList: async function (start, length, data) {
        try {
            let query = "";
            // console.log("data-----------", data);
            if (data.bedCode != '') {
                // console.log("bed code------------");
                query = "AND eb.EvolveBed_Code = '" + data.bedCode + "'";
            }
            if (data.startDate != '' && data.endDate != '' && (data.inorouttime == 'intime' || data.inorouttime == 'outtime')) {
                // console.log("date------------");
                let dt = data.startDate.split("/")
                let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                dt = data.endDate.split("/");
                let edt = new Date(dt[2], dt[1] - 1, dt[0]);
                let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
                // if (query != "") { query = query + " AND " }
                if (data.inorouttime == 'intime') {
                    console.log("intime--------------");
                    query = query + " AND cast(ebh.EvolveBedHistory_InTime as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(ebh.EvolveBedHistory_InTime as date) <= FORMAT(getDate(), '" + endDate + "')";
                }
                else {
                    console.log("out time--------------");
                    query = query + " AND cast(ebh.EvolveBedHistory_OutTime as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(ebh.EvolveBedHistory_OutTime as date) <= FORMAT(getDate(), '" + endDate + "')";
                }
            }
            let SqlQuery = "SELECT ebh.*, ebh.EvolveRoom_No, eb.EvolveBed_Code,(SELECT er.EvolveRoom_Name FROM EvolveRoom er WHERE er.EvolveRoom_Id = ebh.EvolveRoom_No ) AS EvolveRoom_Name FROM EvolveBedsHistory ebh , EvolveBeds eb WHERE ebh.EvolveBed_ID = eb.EvolveBed_ID " + query + " ORDER BY ebh.EvolveBedHistory_ID DESC OFFSET " + start + " ROWS FETCH NEXT " + length + " ROWS ONLY";

            // console.log("SqlQuery >>>>>>>>>>>>>", SqlQuery)

            return await Evolve.SqlPool.request().query(SqlQuery);

        } catch (error) {
            Evolve.Log.error(" EERR1082: Error while getting Bed History  Report Datatable List "+error.message);
            return new Error(" EERR1082: Error while getting Bed History  Report Datatable List "+error.message);
        }
    },


}