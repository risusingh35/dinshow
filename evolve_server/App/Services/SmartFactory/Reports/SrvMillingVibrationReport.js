'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  getMillingVibrationCountList: async function (data) {
    try {
            if (data.machine == "milling" && data.SerialNo != "" && data.startDate == "" && data.endDate == "") {
                return await Evolve.SqlPool.request()
                    .input('SerialNo', Evolve.Sql.NVarChar, data.SerialNo)
                    .query("SELECT count(Evolve_Milling_ID) AS count FROM EvolveMilling  WHERE Evolve_Milling_Cycle_Part_OK = '1' AND Evolve_Milling_Barcode = @SerialNo");

            } else if (data.machine == "milling" && data.startDate != "" && data.endDate != "" && data.SerialNo == "") {
                let dt = data.startDate.split("/")
                let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                dt = data.endDate.split("/")
                let edt = new Date(dt[2], dt[1] - 1, dt[0]);
                let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
                return await Evolve.SqlPool.request()
                    .input('startDate', Evolve.Sql.NVarChar, startDate)
                    .input('endDate', Evolve.Sql.NVarChar, endDate)
                    .query("SELECT count(Evolve_Milling_ID) AS count FROM EvolveMilling  WHERE Evolve_Milling_Cycle_Part_OK = '1' AND CAST(Evolve_Milling_Cycle_Start_TIMESTAMP as date) >= FORMAT(getdate(), @startDate) AND CAST(Evolve_Milling_Cycle_Finished_TIMESTAMP as date) <= FORMAT(getdate(), @endDate)");
            } else if (data.machine == "vibration" && data.SerialNo != "" && data.startDate == "" && data.endDate == "") {
                return await Evolve.SqlPool.request()
                    .input('SerialNo', Evolve.Sql.NVarChar, data.SerialNo)
                    .query("SELECT count(EvolveVibration_ID) AS count FROM EvolveVibration  WHERE EvolveVibration_Part_Ok_VALUE = '1' AND EvolveVibration_K3220_Barcode_VALUE = @SerialNo");

            } else if (data.machine == "vibration" && data.startDate != "" && data.endDate != "" && data.SerialNo == "") {
                let dt = data.startDate.split("/")
                let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                dt = data.endDate.split("/")
                let edt = new Date(dt[2], dt[1] - 1, dt[0]);
                let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
                return await Evolve.SqlPool.request()
                    .input('startDate', Evolve.Sql.NVarChar, startDate)
                    .input('endDate', Evolve.Sql.NVarChar, endDate)
                    .query("SELECT count(EvolveVibration_ID) AS count FROM EvolveVibration  WHERE EvolveVibration_Part_Ok_VALUE = '1' AND CAST(EvolveVibration_CycleStart_TIMESTAMP as date) >= FORMAT(getdate(), @startDate) AND CAST(EvolveVibration_CycleStop_TIMESTAMP as date) <= FORMAT(getdate(), @endDate)");
            }

        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
  },
  getMillingVibrationDatatableList: async function (start, length, data) {
  try {
      if (data.machine == "milling" && data.SerialNo != "" && data.startDate == "" && data.endDate == "") {
          return await Evolve.SqlPool.request()
              .input('start', Evolve.Sql.Int, start)
              .input('length', Evolve.Sql.Int, length)
              .input('SerialNo', Evolve.Sql.NVarChar, data.SerialNo)
              .query("SELECT Evolve_Milling_Barcode as SerialNo,Evolve_Milling_Cycle_Start_TIMESTAMP as CycleStartTimetamp,Evolve_Milling_Cycle_Finished_TIMESTAMP as CycleFinishedTimetamp, Evolve_Milling_Cycle_Finished as CycleFinished,Evolve_Milling_Cycle_Part_OK as PartOk, Evolve_Milling_Cycle_Part_OK_TIMESTAMP as PartOkTimetemp FROM EvolveMilling WHERE Evolve_Milling_Cycle_Part_OK = '1' AND Evolve_Milling_Barcode = @SerialNo  ORDER BY Evolve_Milling_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ")
      } else if (data.machine == "milling" && data.startDate != "" && data.endDate != "" && data.SerialNo == "") {
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
              .query("SELECT Evolve_Milling_Barcode as SerialNo,Evolve_Milling_Cycle_Start_TIMESTAMP as CycleStartTimetamp,Evolve_Milling_Cycle_Finished_TIMESTAMP as CycleFinishedTimetamp, Evolve_Milling_Cycle_Finished as CycleFinished,Evolve_Milling_Cycle_Part_OK as PartOk, Evolve_Milling_Cycle_Part_OK_TIMESTAMP as PartOkTimetemp FROM EvolveMilling WHERE Evolve_Milling_Cycle_Part_OK = '1' AND CAST(Evolve_Milling_Cycle_Start_TIMESTAMP as date) >= FORMAT(getdate(), @startDate) AND CAST (Evolve_Milling_Cycle_Finished_TIMESTAMP as date) <= FORMAT(getdate(), @endDate) ORDER BY Evolve_Milling_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ")
      } else if (data.machine == "vibration" && data.SerialNo != "" && data.startDate == "" && data.endDate == "") {
          return await Evolve.SqlPool.request()
              .input('start', Evolve.Sql.Int, start)
              .input('length', Evolve.Sql.Int, length)
              .input('SerialNo', Evolve.Sql.NVarChar, data.SerialNo)
              .query("SELECT EvolveVibration_K3220_Barcode_VALUE as SerialNo, EvolveVibration_CycleStart_TIMESTAMP as CycleStartTimetamp,EvolveVibration_CycleStop_TIMESTAMP as CycleFinishedTimetamp, EvolveVibration_Cycle_Stop_VALUE as CycleFinished,EvolveVibration_Part_Ok_VALUE as PartOk,EvolveVibration_Machine_at_Home_TIMESTAMP as PartOkTimetemp FROM EvolveVibration WHERE EvolveVibration_Part_Ok_VALUE = '1' AND EvolveVibration_K3220_Barcode_VALUE = @SerialNo ORDER BY EvolveVibration_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ")
      } else if (data.machine == "vibration" && data.startDate != "" && data.endDate != "" && data.SerialNo == "") {
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
              .query("SELECT EvolveVibration_K3220_Barcode_VALUE as SerialNo, EvolveVibration_CycleStart_TIMESTAMP as CycleStartTimetamp, EvolveVibration_CycleStop_TIMESTAMP as CycleFinishedTimetamp, EvolveVibration_Cycle_Stop_VALUE as CycleFinished, EvolveVibration_Part_Ok_VALUE as PartOk, EvolveVibration_Machine_at_Home_TIMESTAMP as PartOkTimetemp FROM EvolveVibration WHERE EvolveVibration_Part_Ok_VALUE = '1' AND CAST(EvolveVibration_CycleStart_TIMESTAMP as date) >= FORMAT(getdate(), @startDate) AND CAST(EvolveVibration_CycleStop_TIMESTAMP as date) <= FORMAT(getdate(), @endDate) ORDER BY EvolveVibration_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ")
      }
  } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
  }
  },


}