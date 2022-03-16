'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

	getTravelModeCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query(" SELECT   COUNT(EvolveTravelModes_ID) as count FROM  EvolveTravelModes  WHERE EvolveTravelModes_Name LIKE @search  ");
        } catch (error) {
            Evolve.Log.error("  Error while get travel request medical details" + error.message);
            return new Error("  Error while get travel request medical details" + error.message);
        }
    },
    getTravelMedReqDetails: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT   * FROM  EvolveTravelReqMedDetails");
        } catch (error) {
            Evolve.Log.error("  Error while getting travel request medical details" + error.message);
            return new Error("  Error while getting travel request medical details" + error.message);
        }
    },

	addTravelReqMedDetails: async function (data , id) {
		try {
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
			return await Evolve.SqlPool.request()
			  .input('EvolveTravelReqMedDetails_MedDetails', JSON.stringify(data))
			  .input('EvolveTravelReq_id', Evolve.Sql.Int,id)
			  .input('EvolveTravelReqMedDetails_CreatedAt', Evolve.Sql.NVarChar, dataTime)
			  .input('EvolveTravelReqMedDetails_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
			  .input('EvolveTravelReqMedDetails_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
			  .input('EvolveTravelReqMedDetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
			  .query('INSERT INTO EvolveTravelReqMedDetails (  EvolveTravelReqMedDetails_MedDetails,EvolveTravelReq_id , EvolveTravelReqMedDetails_CreatedAt ,EvolveTravelReqMedDetails_CreatedUser , EvolveTravelReqMedDetails_UpdatedAt , EvolveTravelReqMedDetails_UpdatedUser )  VALUES ( @EvolveTravelReqMedDetails_MedDetails,@EvolveTravelReq_id , @EvolveTravelReqMedDetails_CreatedAt ,@EvolveTravelReqMedDetails_CreatedUser , @EvolveTravelReqMedDetails_UpdatedAt , @EvolveTravelReqMedDetails_UpdatedUser) ;');
		} catch (error) {
			Evolve.Log.error("  Error while add medical details "+error.message);
			return new Error("  Error while add medical details "+error.message);
		}
    },

    deleteTravelReqMedDetails: async function (EvolveTravelReq_id) {
		try {
            return await Evolve.SqlPool.request()
				.input('EvolveTravelReq_id', Evolve.Sql.Int, EvolveTravelReq_id)
				
				.query('DELETE FROM  EvolveTravelReqMedDetails WHERE EvolveTravelReq_id = @EvolveTravelReq_id');
		} catch (error) {
			Evolve.Log.error(" Error while delete travel request medical details "+error.message);
			return new Error(" Error while delete travel request medical details "+error.message);
		}
	},
	getTravelReqMedDetails: async function (data) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveTravelReqMedDetails_id', Evolve.Sql.Int, data.EvolveTravelReqMedDetails_id)
			
                .query(" SELECT   * FROM  EvolveTravelReqMedDetails WHERE EvolveTravelReqMedDetails_id = @EvolveTravelReqMedDetails_id  ");
        } catch (error) {
            Evolve.Log.error(" Error while get travel request medical details details " + error.message);
            return new Error(" Error while get travel request medical details details " + error.message);
        }
	},
	updatTravelReqMedDetails: async function (data) {
        try {
			return await Evolve.SqlPool.request()
				.input('EvolveTravelReqMedDetails_id', Evolve.Sql.Int, data.EvolveTravelReqMedDetails_id)
				.input('EvolveTravelReqMedDetails_MedDetails', Evolve.Sql.NVarChar, data.EvolveTravelReqMedDetails_MedDetails)
				.input('EvolveTravelReq_id', Evolve.Sql.Int, data.EvolveTravelReq_id)
				.input('EvolveTravelReqMedDetails_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
				.input('EvolveTravelReqMedDetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.query(" UPDATE EvolveTravelReqMedDetails SET EvolveTravelReqMedDetails_MedDetails=@EvolveTravelReqMedDetails_MedDetails ,  EvolveTravelReq_id=@EvolveTravelReq_id ,EvolveTravelReqMedDetails_UpdatedAt=@EvolveTravelReqMedDetails_UpdatedAt ,EvolveTravelReqMedDetails_UpdatedUser=@EvolveTravelReqMedDetails_UpdatedUser WHERE EvolveTravelReqMedDetails_id = @EvolveTravelReqMedDetails_id  ");
        } catch (error) {
            Evolve.Log.error("  Error while update travel request medical details details " + error.message);
            return new Error("  Error while update travel request medical details details " + error.message);
        }
	},

	

    


}