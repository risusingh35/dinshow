'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getVisitorListCount: async function (search, searchdate) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            let searchQuery = "";
            if (search != "") {
                searchQuery = "AND EvolveGate_RefNumber + EvolveGate_Email + EvolveGate_VisitorContact + EvolveGate_VisitorName like '%" + search + "%'";
            }
            if (searchdate.startDate != '' && searchdate.endDate != '' && searchdate.startDate != undefined && searchdate.endDate != undefined) {
                let dt = searchdate.startDate.split("/")
                let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                dt = searchdate.endDate.split("/");
                let edt = new Date(dt[2], dt[1] - 1, dt[0]);
                let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
                return await Evolve.SqlPool.request()
                    .input('todayDate', Evolve.Sql.NVarChar, dataTime)
                    .query("SELECT COUNT(EvolveGate_ID) AS count FROM EvolveGate WHERE EvolveGate_ModuleType = 'VISTR' AND cast(EvolveGate_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(EvolveGate_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "')" + searchQuery);
            } else {
                return await Evolve.SqlPool.request()
                    .input('todayDate', Evolve.Sql.NVarChar, dataTime)
                    .query("SELECT COUNT(EvolveGate_ID) AS count FROM EvolveGate WHERE EvolveGate_ModuleType = 'VISTR' AND  EvolveGate_Direction='0' AND CAST(EvolveGate_CreatedAt as date) >= FORMAT(getdate(), @todayDate)" + searchQuery);
            }


        } catch (error) {
            Evolve.Log.error(" EERR1123: Error while getting Visitor List Count " + error.message);
            return new Error(" EERR1123: Error while getting Visitor List Count " + error.message);
        }
    },
    getVisitorList: async function (start, length, search, searchdate) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            let searchQuery = "";
            if (search != "") {
                searchQuery = "AND eg.EvolveGate_RefNumber + eg.EvolveGate_Email + eg.EvolveGate_VisitorContact + eg.EvolveGate_VisitorName like '%" + search + "%'";
            }
            if (searchdate.startDate != '' && searchdate.endDate != '' && searchdate.startDate != undefined && searchdate.endDate != undefined) {
                let dt = searchdate.startDate.split("/")
                let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
                let startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
                dt = searchdate.endDate.split("/");
                let edt = new Date(dt[2], dt[1] - 1, dt[0]);
                let endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
                console.log("start", startDate);
                console.log("endDate", endDate);
                return await Evolve.SqlPool.request()
                    .input('start', Evolve.Sql.Int, start)
                    .input('length', Evolve.Sql.Int, length)
                    .query("SELECT eg.*, es.EvolveSection_Name FROM EvolveGate eg LEFT JOIN EvolveSection es ON es.EvolveSection_ID = eg.EvolveSection_ID  WHERE EvolveGate_ModuleType = 'VISTR' AND cast(eg.EvolveGate_CreatedAt as date) >= FORMAT(getDate(), '" + startDate + "') AND cast(eg.EvolveGate_CreatedAt as date) <= FORMAT(getDate(), '" + endDate + "')" + searchQuery + "  ORDER BY eg.EvolveGate_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
            } else {
                return await Evolve.SqlPool.request()
                    .input('start', Evolve.Sql.Int, start)
                    .input('length', Evolve.Sql.Int, length)
                    .input('todayDate', Evolve.Sql.NVarChar, dataTime)
                    .query("SELECT eg.*, es.EvolveSection_Name FROM EvolveGate eg LEFT JOIN EvolveSection es ON es.EvolveSection_ID = eg.EvolveSection_ID  WHERE EvolveGate_ModuleType = 'VISTR' AND eg.EvolveGate_Direction = '0' AND  CAST(eg.EvolveGate_CreatedAt as date) >= FORMAT(getdate(), @todayDate)" + searchQuery + "  ORDER BY eg.EvolveGate_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
            }

        } catch (error) {
            Evolve.Log.error(" EERR1124: Error while getting Visitor List " + error.message);
            return new Error(" EERR1124: Error while getting Visitor List " + error.message);
        }
    },

    getAllSectionList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveSection");
        } catch (error) {
            Evolve.Log.error(" EERR1125: Error while getting All Section List " + error.message);
            return new Error(" EERR1125: Error while getting All Section List " + error.message);
        }
    },
    getAllPassTypeList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolvePassType");
        } catch (error) {
            Evolve.Log.error(" EERR1126: Error while getting All Pass Type List " + error.message);
            return new Error(" EERR1126: Error while getting All Pass Type List " + error.message);
        }
    },
    getLastRfCode: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT COUNT(EvolveGate_ID) AS count FROM EvolveGate");
        } catch (error) {
            Evolve.Log.error(" EERR1127: Error while getting Last Rf Code " + error.message);
            return new Error(" EERR1127: Error while getting Last Rf Code " + error.message);
        }
    },
    addVisitorIN: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveGate_ModuleType', Evolve.Sql.NVarChar, 'VISTR')
                .input('EvolveGate_Direction', Evolve.Sql.Bit, 0)
                .input('EvolveGate_RefNumber', Evolve.Sql.NVarChar, data.EvolveGate_RefNumber)
                .input('EvolveGate_VisitorName', Evolve.Sql.NVarChar, data.EvolveGate_VisitorName)
                .input('EvolveGate_VisitorContact', Evolve.Sql.NVarChar, data.EvolveGate_VisitorContact)
                .input('EvolveGate_Email', Evolve.Sql.NVarChar, data.EvolveGate_Email)
                .input('EvolveGate_City', Evolve.Sql.NVarChar, data.EvolveGate_City)
                .input('EvolveGate_Address', Evolve.Sql.NVarChar, data.EvolveGate_Address)
                .input('EvolveGate_WhomToMeet', Evolve.Sql.NVarChar, data.EvolveGate_WhomToMeet)
                .input('EvolveGate_Purpose', Evolve.Sql.NVarChar, data.EvolveGate_Purpose)
                .input('EvolveGate_Image', Evolve.Sql.NVarChar, data.EvolveGate_Image)
                .input('EvolveSection_ID', Evolve.Sql.Int, data.EvolveSection_ID)
                .input('ICard_Number', Evolve.Sql.NVarChar, data.ICard_Number)
                .input('EvolveGate_Orgenization', Evolve.Sql.NVarChar, data.EvolveGate_Orgenization)
                .input('EvolveGate_PassType', Evolve.Sql.NVarChar, data.EvolveGate_PassType)
                .input('EvolveGate_PassNumber', Evolve.Sql.NVarChar, data.EvolveGate_PassNumber)

                .input('EvolveGate_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveGate_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveGate_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveGate_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveGate (ICard_Number, EvolveGate_ModuleType, EvolveGate_RefNumber, EvolveGate_Direction, EvolveGate_VisitorName, EvolveGate_VisitorContact , EvolveGate_Email ,EvolveGate_City , EvolveGate_Address,EvolveGate_WhomToMeet , EvolveGate_Purpose, EvolveGate_Image, EvolveSection_ID,EvolveGate_CreatedAt,EvolveGate_CreatedUser,EvolveGate_UpdatedAt, EvolveGate_UpdatedUser, EvolveGate_Orgenization, EvolveGate_PassType, EvolveGate_PassNumber) VALUES (@ICard_Number, @EvolveGate_ModuleType, @EvolveGate_RefNumber, @EvolveGate_Direction, @EvolveGate_VisitorName, @EvolveGate_VisitorContact , @EvolveGate_Email , @EvolveGate_City ,@EvolveGate_Address, @EvolveGate_WhomToMeet, @EvolveGate_Purpose, @EvolveGate_Image, @EvolveSection_ID,@EvolveGate_CreatedAt,@EvolveGate_CreatedUser,@EvolveGate_UpdatedAt, @EvolveGate_UpdatedUser, @EvolveGate_Orgenization, @EvolveGate_PassType, @EvolveGate_PassNumber)')
        } catch (error) {
            Evolve.Log.error(" EERR1128: Error while adding Visitor IN " + error.message);
            return new Error(" EERR1128: Error while adding Visitor IN " + error.message);
        }
    },

    getSingleVisitorData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGate_ID', Evolve.Sql.Int, data.EvolveGate_ID)
                .query("SELECT * FROM EvolveGate WHERE EvolveGate_ID = @EvolveGate_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1129: Error while getting single visitor data " + error.message);
            return new Error(" EERR1129: Error while getting single visitor data " + error.message);
        }
    },
    updateOutVisitor: async function (data) {
        let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGate_ID', Evolve.Sql.Int, data.EvolveGate_ID)
                .input('EvolveGate_Direction', Evolve.Sql.Bit, 1)
                .input('EvolveGate_VisitorOutTime', Evolve.Sql.NVarChar, dataTime)
                .query("UPDATE EvolveGate SET EvolveGate_Direction = @EvolveGate_Direction, EvolveGate_VisitorOutTime = @EvolveGate_VisitorOutTime WHERE EvolveGate_ID = @EvolveGate_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1130: Error while updating out visitor " + error.message);
            return new Error(" EERR1130: Error while updating out visitor " + error.message);
        }
    },
    searchVisitorData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGate_VisitorContact', Evolve.Sql.NVarChar, data.EvolveGate_VisitorContact)
                .query("SELECT TOP(1) * FROM EvolveGate WHERE EvolveGate_VisitorContact = @EvolveGate_VisitorContact ORDER BY EvolveGate_ID DESC ");
        } catch (error) {
            Evolve.Log.error(" EERR1131: Error while searching Visitor Data " + error.message);
            return new Error(" EERR1131: Error while searching Visitor Data " + error.message);
        }
    },

    getImageUrl: async function (EvolveGate_ID) {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveGate_Image FROM EvolveGate WHERE EvolveGate_ID =" + EvolveGate_ID)
        } catch (error) {
            Evolve.Log.error(" EERR1132: Error while getting Image Url " + error.message);
            return new Error(" EERR1132: Error while getting Image Url " + error.message);
        }
    },
    checkVisitorIn: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGate_VisitorContact', Evolve.Sql.NVarChar, data.EvolveGate_VisitorContact)
                .input('EvolveGate_Email', Evolve.Sql.NVarChar, data.EvolveGate_Email)
                .query("SELECT * FROM EvolveGate WHERE (EvolveGate_VisitorContact = @EvolveGate_VisitorContact OR EvolveGate_Email = @EvolveGate_Email) AND EvolveGate_Direction = '0' AND EvolveGate_ModuleType = 'VISTR'")
        } catch (error) {
            Evolve.Log.error(" EERR1133: Error while checking Visitor In " + error.message);
            return new Error(" EERR1133: Error while checking Visitor In " + error.message);
        }
    },
    checkVisitorMobileNo: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGate_VisitorContact', Evolve.Sql.NVarChar, data.EvolveGate_VisitorContact)
                // .input('EvolveGate_Email', Evolve.Sql.NVarChar, data.EvolveGate_Email)
                .query("SELECT * FROM EvolveGate WHERE EvolveGate_VisitorContact = @EvolveGate_VisitorContact AND EvolveGate_Direction = '0' AND EvolveGate_ModuleType = 'VISTR'")
        } catch (error) {
            Evolve.Log.error(" EERR1134: Error while checking visitor mobile number " + error.message);
            return new Error(" EERR1134: Error while checking visitor mobile number " + error.message);
        }
    },
    checkVisitorEmailId: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                // .input('EvolveGate_VisitorContact', Evolve.Sql.NVarChar, data.EvolveGate_VisitorContact)
                .input('EvolveGate_Email', Evolve.Sql.NVarChar, data.EvolveGate_Email)
                .query("SELECT * FROM EvolveGate WHERE EvolveGate_Email = @EvolveGate_Email AND EvolveGate_Direction = '0' AND EvolveGate_ModuleType = 'VISTR'")
        } catch (error) {
            Evolve.Log.error(" EERR1135: Error while checking checking Visitor Email Id " + error.message);
            return new Error(" EERR1135: Error while checking checking Visitor Email Id " + error.message);
        }
    },


}