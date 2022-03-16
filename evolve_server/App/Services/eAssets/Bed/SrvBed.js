'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    rfidCompare: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveBed_RFID', Evolve.Sql.NVarChar, data.EvolveBed_RFID)
                .query('SELECT count(EvolveBed_ID) AS rfidcount FROM EvolveBeds WHERE EvolveBed_RFID = @EvolveBed_RFID');
        } catch (error) {
            Evolve.Log.error(" EERR1064: Error in rfid compare "+error.message);
            return new Error(" EERR1064: Error in rfid compare "+error.message);
        }
    },
    getbedcode: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT COUNT(EvolveBed_ID) as EvolveBed_Id FROM EvolveBeds');
        } catch (error) {
            Evolve.Log.error(" EERR1065: Error while getting bed code "+error.message);
            return new Error(" EERR1065: Error while getting bed code "+error.message);
        }
    },
    addBeds: async function (data, EvolveBed_Code) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveBed_Code', Evolve.Sql.NVarChar, EvolveBed_Code)
                .input('EvolveBed_RFID', Evolve.Sql.NVarChar, data.EvolveBed_RFID)
                .input('EvolveBedType_ID', Evolve.Sql.NVarChar, data.EvolveBedType_ID)
                .input('EvolveBedSize_ID', Evolve.Sql.NVarChar, data.EvolveBedSize_ID)
                .input('EvolveBed_Desc', Evolve.Sql.NVarChar, data.EvolveBed_Desc)
                .input('EvolveBed_Make', Evolve.Sql.NVarChar, data.EvolveBed_Make)
                .input('EvolveBed_Status', Evolve.Sql.Int, 1)
                .input('EvolveBed_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveBed_UpdateAt', Evolve.Sql.NVarChar, datetime)
                .query('INSERT INTO EvolveBeds (EvolveBed_Code, EvolveBed_RFID, EvolveBedType_ID, EvolveBedSize_ID, EvolveBed_Desc, EvolveBed_Make, EvolveBed_Status, EvolveBed_CreatedAt, EvolveBed_UpdateAt) VALUES (@EvolveBed_Code, @EvolveBed_RFID, @EvolveBedType_ID, @EvolveBedSize_ID, @EvolveBed_Desc, @EvolveBed_Make, @EvolveBed_Status, @EvolveBed_CreatedAt, @EvolveBed_UpdateAt)');
        } catch (error) {
            Evolve.Log.error(" EERR1066: Error while adding beds "+error.message);
            return new Error(" EERR1066: Error while adding beds "+error.message);
        }
    },
    getBedsCount: async function (data) {
        try {
            if (data.bedCode != "") {
                return await Evolve.SqlPool.request()
                    .input('bedCode', Evolve.Sql.NVarChar, data.bedCode)
                    .query('select count(EvolveBed_ID) AS count from EvolveBeds where EvolveBed_Code = @bedCode');
            } else {
                return await Evolve.SqlPool.request()
                    .query('select count(EvolveBed_ID) AS count from EvolveBeds');
            }

        } catch (error) {
            Evolve.Log.error(" EERR1067: Error while getting beds count "+error.message);
            return new Error(" EERR1067: Error while getting beds count "+error.message);
        }
    },
    getBedsDatatableList: async function (start, length, data) {
        try {
            if (data.bedCode != "") {
                return await Evolve.SqlPool.request()
                    .input('start', Evolve.Sql.Int, start)
                    .input('length', Evolve.Sql.Int, length)
                    .input('bedCode', Evolve.Sql.NVarChar, data.bedCode)
                    .query('SELECT eb.EvolveBed_ID, eb.EvolveBed_Code, eb.EvolveBed_RFID, eb.EvolveBed_Make, es.EvolveSize_Name, et.EvolveType_Name, eb.EvolveBed_Status from EvolveBeds eb join EvolveSize es on eb.EvolveBedSize_ID = es.EvolveSize_ID join EvolveType et on eb.EvolveBedType_ID = et.EvolveType_ID WHERE eb.EvolveBed_Code = @bedCode ORDER BY eb.EvolveBed_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
            } else {
                return await Evolve.SqlPool.request()
                    .input('start', Evolve.Sql.Int, start)
                    .input('length', Evolve.Sql.Int, length)
                    .query('SELECT eb.EvolveBed_ID, eb.EvolveBed_Code, eb.EvolveBed_RFID, eb.EvolveBed_Make, es.EvolveSize_Name, et.EvolveType_Name, eb.EvolveBed_Status from EvolveBeds eb join EvolveSize es on eb.EvolveBedSize_ID = es.EvolveSize_ID join EvolveType et on eb.EvolveBedType_ID = et.EvolveType_ID ORDER BY eb.EvolveBed_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
            }

        } catch (error) {
            Evolve.Log.error(" EERR1068: Error while getting Beds Datatable List "+error.message);
            return new Error(" EERR1068: Error while getting Beds Datatable List "+error.message);
        }
    },
    getBedsList: async function (start, length) {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT eb.EvolveBed_ID, eb.EvolveBed_Code, eb.EvolveBed_RFID, eb.EvolveBed_Make, es.EvolveSize_Name, et.EvolveType_Name, eb.EvolveBed_Status from EvolveBeds eb join EvolveSize es on eb.EvolveBedSize_ID = es.EvolveSize_ID join EvolveType et on eb.EvolveBedType_ID = et.EvolveType_ID ORDER BY eb.EvolveBed_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1069: Error while getting beds list "+error.message);
            return new Error(" EERR1069: Error while getting beds list "+error.message);
        }
    },
    getSingleBeds: async function (EvolveBed_ID) {

        try {
            return await Evolve.SqlPool.request()
                .input('EvolveBed_ID', Evolve.Sql.Int, EvolveBed_ID)
                .query('SELECT * FROM EvolveBeds WHERE EvolveBed_ID = @EvolveBed_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1070: Error while getting single beds "+error.message);
            return new Error(" EERR1070: Error while getting single beds "+error.message);
        }
    },
    editBeds: async function (data) {

        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveBed_ID', Evolve.Sql.NVarChar, data.EvolveBed_ID)
                .input('EvolveBed_RFID', Evolve.Sql.NVarChar, data.EvolveBed_RFID)
                .input('EvolveBedType_ID', Evolve.Sql.NVarChar, data.EvolveBedType_ID)
                .input('EvolveBedSize_ID', Evolve.Sql.NVarChar, data.EvolveBedSize_ID)
                .input('EvolveBed_Desc', Evolve.Sql.NVarChar, data.EvolveBed_Desc)
                .input('EvolveBed_Make', Evolve.Sql.NVarChar, data.EvolveBed_Make)
                .input('EvolveBed_UpdateAt', Evolve.Sql.NVarChar, datetime)

                .query('UPDATE EvolveBeds SET EvolveBed_RFID = @EvolveBed_RFID, EvolveBedType_ID = @EvolveBedType_ID, EvolveBedSize_ID = @EvolveBedSize_ID, EvolveBed_Desc = @EvolveBed_Desc, EvolveBed_Make = @EvolveBed_Make, EvolveBed_UpdateAt = @EvolveBed_UpdateAt WHERE EvolveBed_ID = @EvolveBed_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1071: Error while editing beds "+error.message);
            return new Error(" EERR1071: Error while editing beds "+error.message);
        }
    },
    deleteBeds: async function (id) {

        try {
            return await Evolve.SqlPool.request()
                .input('EvolveBed_ID', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveBeds WHERE EvolveBed_ID =@EvolveBed_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1072: Error while deleting beds "+error.message);
            return new Error(" EERR1072: Error while deleting beds "+error.message);
        }
    },

    //History

    getBedsHistorylist: async function (data) {
        try {
            if (data.startDate != '' && data.endDate != '' && data.startDate != undefined && data.endDate != undefined) {
                if (data.inorouttime == 'intime' || data.inorouttime == 'outtime') {
                    if (data.inorouttime == 'intime') {
                        let dt = data.startDate.split("/")
                        let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                        let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                        dt = data.endDate.split("/")
                        let edt = new Date(dt[2], dt[1] - 1, dt[0]);
                        let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
                        return await Evolve.SqlPool.request()
                            .input('start', Evolve.Sql.Int, start)
                            .input('length', Evolve.Sql.Int, length)
                            .input('id', Evolve.Sql.Int, data.bed_id)
                            .input('startDate', Evolve.Sql.NVarChar, startDate)
                            .input('endDate', Evolve.Sql.NVarChar, endDate)
                            .query('SELECT  eb.EvolveBed_Code, (SELECT er.EvolveRoom_Name  FROM EvolveRoom er WHERE er.EvolveRoom_Id = ebh.EvolveRoom_No) as EvolveRoom_Name ,ebh.EvolveBedHistory_InTime , ebh.EvolveBedHistory_OutTime , ebh.EvolveBedHistory_Duration, ebh.EvolveBedHistory_ID, ebh.EvolveBed_ID FROM EvolveBeds eb , EvolveBedsHistory ebh WHERE ebh.EvolveBed_ID = eb.EvolveBed_ID AND ebh.EvolveBed_ID = @id AND cast(ebh.EvolveBedHistory_InTime as date) >= FORMAT(getDate(), @startDate) AND cast(ebh.EvolveBedHistory_InTime as date) <= FORMAT(getDate(), @endDate) ORDER BY EvolveBedHistory_ID DESC OFFSET  @start ROWS FETCH NEXT @length ROWS ONLY ');
                    } else {
                        let dt = data.startDate.split("/")
                        let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                        let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                        dt = data.endDate.split("/")
                        let edt = new Date(dt[2], dt[1] - 1, dt[0]);
                        let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
                        return await Evolve.SqlPool.request()
                            .input('start', Evolve.Sql.Int, start)
                            .input('length', Evolve.Sql.Int, length)
                            .input('id', Evolve.Sql.Int, data.bed_id)
                            .input('startDate', Evolve.Sql.NVarChar, startDate)
                            .input('endDate', Evolve.Sql.NVarChar, endDate)
                            .query('SELECT  eb.EvolveBed_Code, (SELECT er.EvolveRoom_Name  FROM EvolveRoom er WHERE er.EvolveRoom_Id = ebh.EvolveRoom_No) as EvolveRoom_Name ,ebh.EvolveBedHistory_InTime , ebh.EvolveBedHistory_OutTime , ebh.EvolveBedHistory_Duration, ebh.EvolveBedHistory_ID, ebh.EvolveBed_ID FROM EvolveBeds eb , EvolveBedsHistory ebh WHERE ebh.EvolveBed_ID = eb.EvolveBed_ID AND ebh.EvolveBed_ID = @id AND cast(ebh.EvolveBedHistory_OutTime as date) >= FORMAT(getDate(), @startDate) AND cast(ebh.EvolveBedHistory_OutTime as date) <= FORMAT(getDate(), @endDate) ORDER BY EvolveBedHistory_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ');
                    }
                }
            } else {
                return await Evolve.SqlPool.request()
                    .input('id', Evolve.Sql.Int, data.bed_id)
                    .query('SELECT  eb.EvolveBed_Code, (SELECT er.EvolveRoom_Name  FROM EvolveRoom er WHERE er.EvolveRoom_Id = ebh.EvolveRoom_No) as EvolveRoom_Name ,ebh.EvolveBedHistory_InTime , ebh.EvolveBedHistory_OutTime, ebh.EvolveBedHistory_Duration, ebh.EvolveBedHistory_ID,  ebh.EvolveBed_ID FROM EvolveBeds eb , EvolveBedsHistory ebh WHERE ebh.EvolveBed_ID = eb.EvolveBed_ID AND ebh.EvolveBed_ID = @id ORDER BY EvolveBedHistory_ID DESC');
            }
        } catch (error) {
            Evolve.Log.error(" EERR1073: Error while getting Beds History list "+error.message);
            return new Error(" EERR1073: Error while getting Beds History list "+error.message);
        }
    },

    getBedsHistoryCount: async function (data) {

        try {
            if (data.startDate != '' && data.endDate != '' && data.startDate != undefined && data.endDate != undefined) {
                if (data.inorouttime == 'intime' || data.inorouttime == 'outtime') {
                    if (data.inorouttime == 'intime') {

                        let dt = data.startDate.split("/")
                        let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                        let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                        dt = data.endDate.split("/")
                        let edt = new Date(dt[2], dt[1] - 1, dt[0]);
                        let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
                        return await Evolve.SqlPool.request()
                            .input('id', Evolve.Sql.Int, data.bed_id)
                            .input('startDate', Evolve.Sql.NVarChar, startDate)
                            .input('endDate', Evolve.Sql.NVarChar, endDate)
                            .query('select count(EvolveBedHistory_ID) AS count from EvolveBedsHistory where EvolveBed_ID = @id AND cast(EvolveBedHistory_InTime as date) >= FORMAT(getDate(), @startDate) AND cast(EvolveBedHistory_InTime as date) <= FORMAT(getDate(), @endDate)');

                    } else {

                        let dt = data.startDate.split("/")
                        let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                        let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                        dt = data.endDate.split("/")
                        let edt = new Date(dt[2], dt[1] - 1, dt[0]);
                        let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
                        return await Evolve.SqlPool.request()
                            .input('id', Evolve.Sql.Int, data.bed_id)
                            .input('startDate', Evolve.Sql.NVarChar, startDate)
                            .input('endDate', Evolve.Sql.NVarChar, endDate)
                            .query('select count(EvolveBedHistory_ID) AS count from EvolveBedsHistory where EvolveBed_ID = @id AND cast(EvolveBedHistory_OutTime as date) >= FORMAT(getDate(), @startDate) AND cast(EvolveBedHistory_OutTime as date) <= FORMAT(getDate(), @endDate)');
                    }
                }
            } else {

                return await Evolve.SqlPool.request()
                    .input('id', Evolve.Sql.Int, data.bed_id)
                    .query('select count(EvolveBedHistory_ID) AS count from EvolveBedsHistory where EvolveBed_ID = @id');
            }

        } catch (error) {
            Evolve.Log.error(" EERR1074: Error while getting Beds History Count "+error.message);
            return new Error(" EERR1074: Error while getting Beds History Count "+error.message);
        }
    },

    getBedsHistoryDatatableList: async function (start, length, data) {

        try {
            if (data.startDate != '' && data.endDate != '' && data.startDate != undefined && data.endDate != undefined) {
                if (data.inorouttime == 'intime' || data.inorouttime == 'outtime') {
                    if (data.inorouttime == 'intime') {
                        let dt = data.startDate.split("/")
                        let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                        let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                        dt = data.endDate.split("/")
                        let edt = new Date(dt[2], dt[1] - 1, dt[0]);
                        let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
                        return await Evolve.SqlPool.request()
                            .input('start', Evolve.Sql.Int, start)
                            .input('length', Evolve.Sql.Int, length)
                            .input('id', Evolve.Sql.Int, data.bed_id)
                            .input('startDate', Evolve.Sql.NVarChar, startDate)
                            .input('endDate', Evolve.Sql.NVarChar, endDate)
                            .query('SELECT  eb.EvolveBed_Code, (SELECT er.EvolveRoom_Name  FROM EvolveRoom er WHERE er.EvolveRoom_Id = ebh.EvolveRoom_No) as EvolveRoom_Name ,ebh.EvolveBedHistory_InTime , ebh.EvolveBedHistory_OutTime , ebh.EvolveBedHistory_Duration, ebh.EvolveBedHistory_ID, ebh.EvolveBed_ID FROM EvolveBeds eb , EvolveBedsHistory ebh WHERE ebh.EvolveBed_ID = eb.EvolveBed_ID AND ebh.EvolveBed_ID = @id AND cast(ebh.EvolveBedHistory_InTime as date) >= FORMAT(getDate(), @startDate) AND cast(ebh.EvolveBedHistory_InTime as date) <= FORMAT(getDate(), @endDate) ORDER BY EvolveBedHistory_ID DESC OFFSET  @start ROWS FETCH NEXT @length ROWS ONLY ');
                    } else {

                        let dt = data.startDate.split("/")
                        let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                        let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                        dt = data.endDate.split("/")
                        let edt = new Date(dt[2], dt[1] - 1, dt[0]);
                        let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
                        return await Evolve.SqlPool.request()
                            .input('start', Evolve.Sql.Int, start)
                            .input('length', Evolve.Sql.Int, length)
                            .input('id', Evolve.Sql.Int, data.bed_id)
                            .input('startDate', Evolve.Sql.NVarChar, startDate)
                            .input('endDate', Evolve.Sql.NVarChar, endDate)
                            .query('SELECT  eb.EvolveBed_Code, (SELECT er.EvolveRoom_Name  FROM EvolveRoom er WHERE er.EvolveRoom_Id = ebh.EvolveRoom_No) as EvolveRoom_Name ,ebh.EvolveBedHistory_InTime , ebh.EvolveBedHistory_OutTime , ebh.EvolveBedHistory_Duration, ebh.EvolveBedHistory_ID, ebh.EvolveBed_ID FROM EvolveBeds eb , EvolveBedsHistory ebh WHERE ebh.EvolveBed_ID = eb.EvolveBed_ID AND ebh.EvolveBed_ID = @id AND cast(ebh.EvolveBedHistory_OutTime as date) >= FORMAT(getDate(), @startDate) AND cast(ebh.EvolveBedHistory_OutTime as date) <= FORMAT(getDate(), @endDate) ORDER BY EvolveBedHistory_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ');
                    }
                }
            } else {

                return await Evolve.SqlPool.request()
                    .input('start', Evolve.Sql.Int, start)
                    .input('length', Evolve.Sql.Int, length)
                    .input('id', Evolve.Sql.Int, data.bed_id)
                    .query('SELECT  eb.EvolveBed_Code, (SELECT er.EvolveRoom_Name  FROM EvolveRoom er WHERE er.EvolveRoom_Id = ebh.EvolveRoom_No) as EvolveRoom_Name ,ebh.EvolveBedHistory_InTime , ebh.EvolveBedHistory_OutTime, ebh.EvolveBedHistory_Duration, ebh.EvolveBedHistory_ID,  ebh.EvolveBed_ID FROM EvolveBeds eb , EvolveBedsHistory ebh WHERE ebh.EvolveBed_ID = eb.EvolveBed_ID AND ebh.EvolveBed_ID = @id ORDER BY EvolveBedHistory_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');

            }
        } catch (error) {
            Evolve.Log.error(" EERR1075: Error while getting Beds History Datatable List "+error.message);
            return new Error(" EERR1075: Error while getting Beds History Datatable List "+error.message);
        }
    },

    // addBedHistory: async function (data) {
    //     // console.log("rfid", data.EvolveBed_RFID);
    //     // console.log("type", data.EvolveBedType_ID);
    //     // console.log("size", data.EvolveBedSize_ID);
    //     // console.log("desc", data.EvolveBed_Desc);
    //     // console.log("make", data.EvolveBed_Make);
    //     // console.log("status", data.EvolveBed_Status);
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveBed_ID', Evolve.Sql.NVarChar, data.EvolveBed_ID)
    //             .input('EvolveBedHistory_InTime', Evolve.Sql.NVarChar, data.EvolveBedHistory_InTime)
    //             .input('EvolveBedHistory_OutTime', Evolve.Sql.NVarChar, data.EvolveBedHistory_OutTime)
    //             .input('EvolveBedHistory_Duration', Evolve.Sql.NVarChar, data.EvolveBedHistory_Duration)

    //             .query('INSERT INTO EvolveBedsHistory (EvolveBed_ID, EvolveBedHistory_InTime, EvolveBedHistory_OutTime, EvolveBedHistory_Duration) VALUES (@EvolveBed_ID, @EvolveBedHistory_InTime, @EvolveBedHistory_OutTime, @EvolveBed_Desc, @EvolveBedHistory_Duration)');
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    getSingleBedHistory: async function (EvolveBedHistory_ID) {

        try {
            return await Evolve.SqlPool.request()
                .input('EvolveBedHistory_ID', Evolve.Sql.Int, EvolveBedHistory_ID)
                .query('SELECT * FROM EvolveBedsHistory WHERE EvolveBedHistory_ID = @EvolveBedHistory_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1076: Error while getting Single Bed History "+error.message);
            return new Error(" EERR1076: Error while getting Single Bed History "+error.message);
        }
    },

    editBedHistory: async function (data) {

        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveBedHistory_ID', Evolve.Sql.NVarChar, data.EvolveBedHistory_ID)
                .input('EvolveBedHistory_Comment', Evolve.Sql.NVarChar, data.EvolveBedHistory_Comment)
                .input('EvolveRoom_No', Evolve.Sql.NVarChar, data.EvolveRoom_No)

                .query('UPDATE EvolveBedsHistory SET EvolveRoom_No = @EvolveRoom_No, EvolveBedHistory_Comment = @EvolveBedHistory_Comment WHERE EvolveBedHistory_ID = @EvolveBedHistory_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1077: Error while editing Bed History "+error.message);
            return new Error(" EERR1077: Error while editing Bed History "+error.message);
        }
    },

    getAllRoom: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveRoom_Id,EvolveRoom_Name from EvolveRoom where EvolveRoom_Status = 1');
        } catch (error) {
            Evolve.Log.error(" EERR1078: Error while getting All Room "+error.message);
            return new Error(" EERR1078: Error while getting All Room "+error.message);
        }
    },

    getallSizes: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveSize_ID,EvolveSize_Name from EvolveSize');
        } catch (error) {
            Evolve.Log.error(" EERR1079: Error while getting all Sizes "+error.message);
            return new Error(" EERR1079: Error while getting all Sizes "+error.message);
        }
    },

    getallTypes: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveType_ID,EvolveType_Name from EvolveType');
        } catch (error) {
            Evolve.Log.error(" EERR1080: Error while getting all Types "+error.message);
            return new Error(" EERR1080: Error while getting all Types "+error.message);
        }
    },





}