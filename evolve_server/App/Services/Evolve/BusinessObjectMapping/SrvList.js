'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    businessObjectMappingCount : async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query(' SELECT COUNT(EvolveBusinessObjectMapping_ID) as count FROM EvolveBusinessObjectMapping WHERE EvolveBusinessObjectMapping_Name LIKE @search ');
        } catch (error) {
            Evolve.Log.error(" EERR32535: Error while getting Business Object Mapping Count "+error.message);
            return new Error(" EERR32535: Error while getting Business Object Mapping Count "+error.message);
        }
    },

    getBusinessObjectMappingList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
            .input('start',Evolve.Sql.Int,start)
            .input('length',Evolve.Sql.Int,length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('SELECT * FROM EvolveBusinessObjectMapping WHERE EvolveBusinessObjectMapping_Name LIKE @search ORDER BY EvolveBusinessObjectMapping_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR32536: Error while getting Business Object Mapping List "+error.message);
            return new Error(" EERR32536: Error while getting Business Object Mapping List "+error.message);
        }
    },

    checkBusinessObjectName : async function (data){
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveBusinessObjectMapping_Name', Evolve.Sql.NVarChar, data.EvolveBusinessObjectMapping_Name)
            .query(' SELECT * FROM EvolveBusinessObjectMapping WHERE EvolveBusinessObjectMapping_Name = @EvolveBusinessObjectMapping_Name ' );
        } catch (error) {
            Evolve.Log.error(" EERR32537: Error while getting Business Object Name "+error.message);
            return new Error(" EERR32537: Error while getting Business Object Name "+error.message);
        }
    },

    createBusinessObject: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveBusinessObjectMapping_Name', Evolve.Sql.NVarChar, data.EvolveBusinessObjectMapping_Name)
            .input('EvolveBusinessObjectMapping_XmlDataName', Evolve.Sql.NVarChar, data.EvolveBusinessObjectMapping_XmlDataName)
            .query(' INSERT INTO EvolveBusinessObjectMapping (EvolveBusinessObjectMapping_Name, EvolveBusinessObjectMapping_XmlDataName) VALUES (@EvolveBusinessObjectMapping_Name, @EvolveBusinessObjectMapping_XmlDataName)' );
        } catch (error) {
            Evolve.Log.error(" EERR32538: Error while creating Business Object "+error.message);
            return new Error(" EERR32538: Error while createing Business Object "+error.message);
        }
    },

    updateBusinessObject: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveBusinessObjectMapping_Name', Evolve.Sql.NVarChar, data.EvolveBusinessObjectMapping_Name)
            .input('EvolveBusinessObjectMapping_XmlDataName', Evolve.Sql.NVarChar, data.EvolveBusinessObjectMapping_XmlDataName)
            .query(' UPDATE EvolveBusinessObjectMapping SET EvolveBusinessObjectMapping_XmlDataName = @EvolveBusinessObjectMapping_XmlDataName WHERE EvolveBusinessObjectMapping_Name = @EvolveBusinessObjectMapping_Name ' );
        } catch (error) {
            Evolve.Log.error(" EERR32539: Error while updating Business Object "+error.message);
            return new Error(" EERR32539: Error while updating Business Object"+error.message);
        }
    },

    getSingleBusinessObjectMapping: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveBusinessObjectMapping_ID', Evolve.Sql.NVarChar, data.EvolveBusinessObjectMapping_ID)
            .query(' SELECT * FROM EvolveBusinessObjectMapping WHERE EvolveBusinessObjectMapping_ID = @EvolveBusinessObjectMapping_ID ' );
        } catch (error) {
            Evolve.Log.error(" EERR32540: Error while getting Single Business Object "+error.message);
            return new Error(" EERR32540: Error while getting Single Business Object "+error.message);
        }
    },

}