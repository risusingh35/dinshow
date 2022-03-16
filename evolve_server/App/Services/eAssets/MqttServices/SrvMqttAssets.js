'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getAllBeds: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveBed_ID, EvolveBed_RFID FROM EvolveBeds');
        } catch (error) {
            Evolve.Log.error(" EERR1100: Error while getting all beds "+error.message);
            return new Error(" EERR1100: Error while getting all beds "+error.message);
        }
    },
    todayHistory: async function () {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('date', Evolve.Sql.NVarChar, datetime)
                .query('SELECT (SELECT eb.EvolveBed_Code  FROM EvolveBeds eb WHERE eb.EvolveBed_ID = ebh.EvolveBed_ID) as EvolveBed_Code, (SELECT er.EvolveRoom_Name  FROM EvolveRoom er WHERE er.EvolveRoom_Id = ebh.EvolveRoom_No) as EvolveRoom_Name,ebh.EvolveBedHistory_InTime , ebh.EvolveBedHistory_OutTime, ebh.EvolveBedHistory_Duration FROM EvolveBedsHistory ebh where cast(ebh.EvolveBedHistory_OutTime as date) = @date OR cast(ebh.EvolveBedHistory_InTime as date) =  @date');
        } catch (error) {
            Evolve.Log.error(" EERR1101: Error in today history "+error.message);
            return new Error(" EERR1101: Error in today history "+error.message);
        }
    },
    saveOutBed: async function (EvolveBed_ID) {
        try {
            let date = new Date();
            let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            let outFound = await Evolve.SqlPool.request()
                .input('EvolveBed_ID', Evolve.Sql.NVarChar, EvolveBed_ID)
                .query("SELECT * FROM EvolveBedsHistory WHERE EvolveBed_ID =@EvolveBed_ID AND EvolveBedHistory_InTime IS NULL");
            if (outFound instanceof Error || outFound.rowsAffected >= 1) {
                return new Error('Old Record Found So not Save new Record..');
            } else {
                console.log("Insert New Record....")
                // Set Beds Out
                await Evolve.SqlPool.request()
                    .input('EvolveBed_ID', Evolve.Sql.NVarChar, EvolveBed_ID)
                    .query('UPDATE  EvolveBeds SET EvolveBed_Status = 0 WHERE EvolveBed_ID =@EvolveBed_ID');
                return await Evolve.SqlPool.request()
                    .input('EvolveBed_ID', Evolve.Sql.NVarChar, EvolveBed_ID)
                    .input('EvolveBedHistory_OutTime', Evolve.Sql.NVarChar, datetime)
                    .query('INSERT INTO EvolveBedsHistory (EvolveBed_ID, EvolveBedHistory_OutTime) VALUES (@EvolveBed_ID, @EvolveBedHistory_OutTime)');
            }

        } catch (error) {
            Evolve.Log.error(" EERR1102: Error while saving out bed "+error.message);
            return new Error(" EERR1102: Error while saving out bed "+error.message);
        }
    },

    saveInBed: async function (EvolveBed_ID) {
        try {
            let date = new Date();
            let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

            let outFound = await Evolve.SqlPool.request()
                .input('EvolveBed_ID', Evolve.Sql.NVarChar, EvolveBed_ID)
                .query("SELECT * FROM EvolveBedsHistory WHERE EvolveBed_ID =@EvolveBed_ID AND EvolveBedHistory_InTime IS NULL");
            if (outFound instanceof Error || outFound.rowsAffected == 0) {
                // Bed already in store.
                return new Error('Already Record Avilable.....');
            } else {
                // console.log("outFound ::", outFound.recordset[0])


                let date1 = new Date(outFound.recordset[0].EvolveBedHistory_OutTime);
                let date2 = new Date(datetime);
                let res = Math.abs(date1 - date2) / 1000;

                // get seconds
                let EvolveBedHistory_Duration = res % 60;

                // Update Beds Status

                await Evolve.SqlPool.request()
                    .input('EvolveBed_ID', Evolve.Sql.NVarChar, outFound.recordset[0].EvolveBed_ID)
                    .query('UPDATE  EvolveBeds SET EvolveBed_Status = 1 WHERE EvolveBed_ID =@EvolveBed_ID');

                return await Evolve.SqlPool.request()
                    .input('EvolveBedHistory_ID', Evolve.Sql.NVarChar, outFound.recordset[0].EvolveBedHistory_ID)
                    .input('EvolveBedHistory_InTime', Evolve.Sql.NVarChar, datetime)
                    .input('EvolveBedHistory_Duration', Evolve.Sql.NVarChar, EvolveBedHistory_Duration)
                    .query('UPDATE  EvolveBedsHistory SET  EvolveBedHistory_InTime =@EvolveBedHistory_InTime, EvolveBedHistory_Duration =@EvolveBedHistory_Duration WHERE EvolveBedHistory_ID =@EvolveBedHistory_ID');
            }




        } catch (error) {
            Evolve.Log.error(" EERR1103: Error while save in bed "+error.message);
            return new Error(" EERR1103: Error while save in bed "+error.message);
        }
    },

    saveBedInOut: async function (EvolveBed_ID) {
        try {
            let date = new Date();
            let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            // let isInStatus = false;
            // let isOutstatus = false;
            // Check IF Already OUt Status

            let outFound = await Evolve.SqlPool.request()
                .input('EvolveBed_ID', Evolve.Sql.NVarChar, EvolveBed_ID)
                .query("SELECT * FROM EvolveBedsHistory WHERE EvolveBed_ID =@EvolveBed_ID AND EvolveBedHistory_InTime IS NULL");
            if (outFound.rowsAffected == 0) {
                // Bed OUt
                console.log("BED OUT")

                // Update Beds Status

                await Evolve.SqlPool.request()
                    .input('EvolveBed_ID', Evolve.Sql.NVarChar, EvolveBed_ID)
                    .query('UPDATE  EvolveBeds SET EvolveBed_Status = 0 WHERE EvolveBed_ID =@EvolveBed_ID');

                return await Evolve.SqlPool.request()
                    .input('EvolveBed_ID', Evolve.Sql.NVarChar, EvolveBed_ID)
                    .input('EvolveBedHistory_OutTime', Evolve.Sql.NVarChar, datetime)
                    .query('INSERT INTO EvolveBedsHistory (EvolveBed_ID, EvolveBedHistory_OutTime) VALUES (@EvolveBed_ID, @EvolveBedHistory_OutTime)');
            } else {
                //  console.log("BED IN")
                //  console.log(" >>>", outFound.recordset[0].EvolveBedHistory_OutTime)
                // console.log(" >>>", datetime)
                let d1 = new Date(outFound.recordset[0].EvolveBedHistory_OutTime);
                let date1 = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds());
                let date2 = new Date(datetime);
                // console.log("date2 >>>", date2)
                // console.log("date1 >>>", date1)
                let res = Math.abs(date2.getTime() - date1.getTime()) / 1000;

                // console.log("res >>>", res)
                // get seconds
                let EvolveBedHistory_Duration = res;

                //console.log("EvolveBedHistory_Duration >>>", EvolveBedHistory_Duration)
                // Update Beds Status

                await Evolve.SqlPool.request()
                    .input('EvolveBed_ID', Evolve.Sql.NVarChar, outFound.recordset[0].EvolveBed_ID)
                    .query('UPDATE  EvolveBeds SET EvolveBed_Status = 1 WHERE EvolveBed_ID =@EvolveBed_ID');

                return await Evolve.SqlPool.request()
                    .input('EvolveBedHistory_ID', Evolve.Sql.NVarChar, outFound.recordset[0].EvolveBedHistory_ID)
                    .input('EvolveBedHistory_InTime', Evolve.Sql.NVarChar, datetime)
                    .input('EvolveBedHistory_Duration', Evolve.Sql.NVarChar, EvolveBedHistory_Duration)
                    .query('UPDATE  EvolveBedsHistory SET  EvolveBedHistory_InTime =@EvolveBedHistory_InTime, EvolveBedHistory_Duration =@EvolveBedHistory_Duration WHERE EvolveBedHistory_ID =@EvolveBedHistory_ID');
            }
        } catch (error) {
            Evolve.Log.error(" EERR1104: Error while save Bed in out "+error.message);
            return new Error(" EERR1104: Error while save Bed in out "+error.message);
        }
    },

    saveBedIn: async function (EvolveBed_ID) {
        try {
            let date = new Date();
            let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

            let outFound = await Evolve.SqlPool.request()
                .input('EvolveBed_ID', Evolve.Sql.Int, EvolveBed_ID)
                .query("SELECT * FROM EvolveBedsHistory WHERE EvolveBed_ID =@EvolveBed_ID AND EvolveBedHistory_InTime IS NULL");
            if (outFound.rowsAffected > 0) {
                // Bed IN
                let d1 = new Date(outFound.recordset[0].EvolveBedHistory_OutTime);
                let date1 = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds());
                let date2 = new Date(datetime);
                let res = Math.abs(date2.getTime() - date1.getTime()) / 1000;
                let EvolveBedHistory_Duration = res;
                await Evolve.SqlPool.request()
                    .input('EvolveBed_ID', Evolve.Sql.NVarChar, outFound.recordset[0].EvolveBed_ID)
                    .query('UPDATE  EvolveBeds SET EvolveBed_Status = 1 WHERE EvolveBed_ID =@EvolveBed_ID');

                return await Evolve.SqlPool.request()
                    .input('EvolveBedHistory_ID', Evolve.Sql.NVarChar, outFound.recordset[0].EvolveBedHistory_ID)
                    .input('EvolveBedHistory_InTime', Evolve.Sql.NVarChar, datetime)
                    .input('EvolveBedHistory_Duration', Evolve.Sql.NVarChar, EvolveBedHistory_Duration)
                    .query('UPDATE  EvolveBedsHistory SET  EvolveBedHistory_InTime =@EvolveBedHistory_InTime, EvolveBedHistory_Duration =@EvolveBedHistory_Duration WHERE EvolveBedHistory_ID =@EvolveBedHistory_ID');
            } else {
                console.log("BED Already IN")
            }
        } catch (error) {
            Evolve.Log.error(" EERR1105: Error while save Bed In "+error.message);
            return new Error(" EERR1105: Error while save Bed In "+error.message);
        }
    },
    saveBedOut: async function (EvolveBed_ID) {
        try {
            //console.log("saveBedOut Called 333333333333333333333333333333333")
            let date = new Date();
            let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

            let outFound = await Evolve.SqlPool.request()
                .input('EvolveBed_ID', Evolve.Sql.NVarChar, EvolveBed_ID)
                .query("SELECT * FROM EvolveBedsHistory WHERE EvolveBed_ID =@EvolveBed_ID AND EvolveBedHistory_InTime IS NULL");
            if (outFound.rowsAffected == 0) {
                // Bed OUt
                console.log("BED  OUT")
                // Update Beds Status
                await Evolve.SqlPool.request()
                    .input('EvolveBed_ID', Evolve.Sql.NVarChar, EvolveBed_ID)
                    .query('UPDATE  EvolveBeds SET EvolveBed_Status = 0 WHERE EvolveBed_ID =@EvolveBed_ID');

                return await Evolve.SqlPool.request()
                    .input('EvolveBed_ID', Evolve.Sql.NVarChar, EvolveBed_ID)
                    .input('EvolveBedHistory_OutTime', Evolve.Sql.NVarChar, datetime)
                    .query('INSERT INTO EvolveBedsHistory (EvolveBed_ID, EvolveBedHistory_OutTime) VALUES (@EvolveBed_ID, @EvolveBedHistory_OutTime)');
            } else {
                console.log("BED Already OUT")
            }
        } catch (error) {
            Evolve.Log.error(" EERR1106: Error while save bed out "+error.message);
            return new Error(" EERR1106: Error while save bed out "+error.message);
        }
    },



}