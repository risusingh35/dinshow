'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAddressListCount: async function (search, condition) {

        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(ea.EvolveAddress_ID) as count FROM EvolveAddress ea left join EvolveCountry ec on ec.EvolveCountry_ID = ea.EvolveCountry_ID left join EvolveAddressType eat on eat.EvolveAddressType_ID = ea.EvolveAddressType_ID left join EvolveLanguage el on el.EvolveLanguage_ID = ea.EvolveLanguage_ID left join EvolveState es on es.EvolveState_ID = ea.EvolveState_ID where ea.EvolveAddress_Code like @search OR ea.EvolveAddress_Name like @search OR ea.EvolveAddress_SearchName like @search OR ea.EvolveAddress_Street1 like @search OR es.EvolveState_Code like @search OR ec.EvolveCountry_Code like @search OR eat.EvolveAddressType_Code like @search OR el.EvolveLanguage_Code like @search OR ea.EvolveAddress_City like @search");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Location List "+error.message);
            return new Error(" EERR####: Error while get Location List "+error.message);
        }
    },

    getAddressList: async function (start, length ,search, condition) {
        try {
        // console.log("condition???" , condition)

            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("select ea.* , ec.EvolveCountry_Code , eat.EvolveAddressType_Code , el.EvolveLanguage_Code , es.EvolveState_Code  from EvolveAddress ea left join EvolveCountry ec on ec.EvolveCountry_ID = ea.EvolveCountry_ID left join EvolveAddressType eat on eat.EvolveAddressType_ID = ea.EvolveAddressType_ID left join EvolveLanguage el on el.EvolveLanguage_ID = ea.EvolveLanguage_ID left join EvolveState es on es.EvolveState_ID = ea.EvolveState_ID where ea.EvolveAddress_Code like @search OR ea.EvolveAddress_Name like @search OR ea.EvolveAddress_SearchName like @search OR ea.EvolveAddress_Street1 like @search OR es.EvolveState_Code like @search OR ec.EvolveCountry_Code like @search OR eat.EvolveAddressType_Code like @search OR el.EvolveLanguage_Code like @search OR ea.EvolveAddress_City like @search ORDER BY ea.EvolveAddress_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
                // .query("SELECT (SELECT ebg.EvolveBusinessGroup_Domain FROM EvolveBusinessGroup ebg WHERE (ea.EvolveAddress_ID = ebg.EvolveAddress_ID) OR (ebg.EvolveBusinessGroup_ID = (SELECT ec.EvolveBusinessGroup_ID FROM EvolveCompany ec WHERE ec.EvolveAddress_ID = ea.EvolveAddress_ID)) OR (ebg.EvolveBusinessGroup_ID = (SELECT ec.EvolveBusinessGroup_ID FROM EvolveCompany ec, EvolveUnit eu WHERE eu.EvolveAddress_ID = ea.EvolveAddress_ID AND eu.EvolveCompany_ID = ec.EvolveCompany_ID))) as 'EvolveBusinessGroup_Domain', (SELECT ec.EvolveCompany_Code FROM EvolveCompany ec WHERE (ec.EvolveAddress_ID = ea.EvolveAddress_ID) OR (ec.EvolveCompany_ID = (SELECT eu.EvolveCompany_ID FROM EvolveUnit eu WHERE eu.EvolveAddress_ID = ea.EvolveAddress_ID AND eu.EvolveCompany_ID = ec.EvolveCompany_ID))) as 'EvolveCompany_Code', (SELECT eu.EvolveUnit_Code FROM EvolveUnit eu WHERE eu.EvolveAddress_ID = ea.EvolveAddress_ID ) AS 'EvolveUnit_Code' , ea.* FROM EvolveAddress ea "+condition+" WHERE ea.EvolveAddress_Address1 LIKE @search OR ea.EvolveAddress_Address2 LIKE @search OR ea.EvolveAddress_Address3 LIKE @search OR  ea.EvolveAddress_State LIKE @search OR ea.EvolveAddress_City LIKE @search OR ea.EvolveAddress_Country LIKE @search OR ea.EvolveAddress_Type LIKE @search OR ea.EvolveAddress_ZipCode LIKE @search OR ea.EvolveAddress_GstIn LIKE @search  ORDER BY ea.EvolveAddress_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")

        //         .query("SELECT ebg.EvolveBusinessGroup_Domain, ec.EvolveCompany_Code, eu.EvolveUnit_Code, ea.* FROM EvolveAddress ea LEFT JOIN EvolveBusinessGroup ebg on ea.EvolveAddress_ID = ebg.EvolveAddress_ID LEFT JOIN EvolveCompany ec on ec.EvolveAddress_ID = ea.EvolveAddress_ID LEFT JOIN EvolveUnit eu on eu.EvolveAddress_ID = ea.EvolveAddress_ID WHERE ea.EvolveAddress_Address1 LIKE @search OR ea.EvolveAddress_Address2 LIKE @search OR ea.EvolveAddress_Address3 LIKE @search OR  ea.EvolveAddress_State LIKE @search OR ea.EvolveAddress_City LIKE @search OR ea.EvolveAddress_Country LIKE @search OR ea.EvolveAddress_Type LIKE @search OR ea.EvolveAddress_ZipCode LIKE @search OR ea.EvolveAddress_GstIn LIKE @search OR ea.EvolveAddress_PanNumber LIKE @search ORDER BY ea.EvolveAddress_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Address list"+error.message);
            return new Error(" EERR####: Error while get Address list"+error.message);
        }
    },
    getBusinessGroupList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveBusinessGroup");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Business Group list"+error.message);
            return new Error(" EERR####: Error while get Business Group list"+error.message);
        }
    },
    getCompanyList: async function (data) {
        try {
            console.log("data==",data)
            if(data.EvolveBusinessGroup_ID != '' && data.EvolveBusinessGroup_ID != null){
                return await Evolve.SqlPool.request()
                .input('EvolveBusinessGroup_ID', Evolve.Sql.Int, data.EvolveBusinessGroup_ID)
                .query("SELECT * FROM EvolveCompany WHERE EvolveBusinessGroup_ID = @EvolveBusinessGroup_ID");
            }else{
                return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveCompany");
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get company list"+error.message);
            return new Error(" EERR####: Error while get company list"+error.message);
        }
    },
    getUnitList: async function (data) {
        try {
            console.log("data==",data)
            if(data.EvolveCompany_ID != '' && data.EvolveCompany_ID != null){
                return await Evolve.SqlPool.request()
                .input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
                .query("SELECT * FROM EvolveUnit WHERE EvolveCompany_ID = @EvolveCompany_ID");
            }else{
                return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveUnit");
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Unit list"+error.message);
            return new Error(" EERR####: Error while get Unit list"+error.message);
        }
    },
}