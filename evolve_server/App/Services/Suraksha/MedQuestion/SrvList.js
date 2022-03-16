'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

	getQuestionCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query(" SELECT   COUNT(EvolveMedQuests_ID) as count FROM  EvolveTravelMedQuests  WHERE EvolveMedQuests_Name LIKE @search  ");
        } catch (error) {
            Evolve.Log.error(" EERR32825: Error while get question count " + error.message);
            return new Error(" EERR32825: Error while get question count " + error.message);
        }
    },
    getQuestionList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT   * FROM  EvolveTravelMedQuests WHERE EvolveMedQuests_Name LIKE @search  ORDER BY EvolveMedQuests_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR32826: Error while getting question List " + error.message);
            return new Error(" EERR32826: Error while getting question List " + error.message);
        }
    },

	addQuestion: async function (data) {
		try {
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
	
			return await Evolve.SqlPool.request()
			  .input('EvolveMedQuests_Name', Evolve.Sql.NVarChar, data.EvolveMedQuests_Name)
			  .input('EvolveMedQuests_FieldType', Evolve.Sql.NVarChar, data.EvolveMedQuests_FieldType)
			  .input('EvolveMedQuests_Type', Evolve.Sql.NVarChar, data.EvolveMedQuests_Type)
			  .input('EvolveMedQuests_Options', Evolve.Sql.NVarChar, data.EvolveMedQuests_Options)
			  .input('EvolveMedQuests_IsActive', Evolve.Sql.Int, data.EvolveMedQuests_IsActive)
			  .input('EvolveMedQuests_CreatedAt', Evolve.Sql.NVarChar, dataTime)
			  .input('EvolveMedQuests_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
			  .input('EvolveMedQuests_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
			  .input('EvolveMedQuests_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.query('INSERT INTO EvolveTravelMedQuests (  EvolveMedQuests_Name,EvolveMedQuests_FieldType ,EvolveMedQuests_Type, EvolveMedQuests_Options ,EvolveMedQuests_IsActive ,EvolveMedQuests_CreatedAt ,EvolveMedQuests_CreatedUser , EvolveMedQuests_UpdatedUser , EvolveMedQuests_UpdatedAt )  VALUES ( @EvolveMedQuests_Name,@EvolveMedQuests_FieldType ,@EvolveMedQuests_Type, @EvolveMedQuests_Options ,@EvolveMedQuests_IsActive ,@EvolveMedQuests_CreatedAt ,@EvolveMedQuests_CreatedUser , @EvolveMedQuests_UpdatedUser , @EvolveMedQuests_UpdatedAt) ;');
		} catch (error) {
			Evolve.Log.error(" EERR32827 : Error while add Question "+error.message);
			return new Error(" EERR32827 : Error while add Question "+error.message);
		}
    },
    
    deleteQuestion: async function (data) {
		try {
            return await Evolve.SqlPool.request()
				.input('EvolveMedQuests_ID', Evolve.Sql.Int, data.EvolveMedQuests_ID)
				
				.query('DELETE FROM  EvolveTravelMedQuests WHERE EvolveMedQuests_ID = @EvolveMedQuests_ID');
		} catch (error) {
			Evolve.Log.error("EERR32829 : Error while delete question "+error.message);
			return new Error("EERR32829 : Error while delete question "+error.message);
		}
	},
	getSingalQuestionDetails: async function (data) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveMedQuests_ID', Evolve.Sql.Int, data.EvolveMedQuests_ID)
			
                .query(" SELECT   * FROM  EvolveTravelMedQuests WHERE EvolveMedQuests_ID = @EvolveMedQuests_ID  ");
        } catch (error) {
            Evolve.Log.error("EERR32830: Error while get question details " + error.message);
            return new Error("EERR32830: Error while get question details " + error.message);
        }
	},
	updatQuestionDetails: async function (data) {
        try {
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

			return await Evolve.SqlPool.request()
				.input('EvolveMedQuests_ID', Evolve.Sql.Int, data.EvolveMedQuests_ID)
				.input('EvolveMedQuests_Name', Evolve.Sql.NVarChar, data.EvolveMedQuests_Name)
				.input('EvolveMedQuests_FieldType', Evolve.Sql.NVarChar, data.EvolveMedQuests_FieldType)
				.input('EvolveMedQuests_Type', Evolve.Sql.NVarChar, data.EvolveMedQuests_Type)
				.input('EvolveMedQuests_Options', Evolve.Sql.NVarChar, data.EvolveMedQuests_Options)
				.input('EvolveMedQuests_IsActive', Evolve.Sql.Int, data.EvolveMedQuests_IsActive)

				.input('EvolveMedQuests_UpdatedUser', Evolve.Sql.NVarChar,data.EvolveUser_ID)
				.input('EvolveMedQuests_UpdatedAt', Evolve.Sql.Int, dataTime)

				.query(" UPDATE EvolveTravelMedQuests SET EvolveMedQuests_Name=@EvolveMedQuests_Name ,  EvolveMedQuests_FieldType=@EvolveMedQuests_FieldType ,EvolveMedQuests_Type=@EvolveMedQuests_Type , EvolveMedQuests_Options=@EvolveMedQuests_Options , EvolveMedQuests_IsActive=@EvolveMedQuests_IsActive ,EvolveMedQuests_UpdatedUser=@EvolveMedQuests_UpdatedUser ,EvolveMedQuests_UpdatedAt=@EvolveMedQuests_UpdatedAt    WHERE EvolveMedQuests_ID = @EvolveMedQuests_ID  ");
        } catch (error) {
            Evolve.Log.error(" EERR32831: Error while update question details " + error.message);
            return new Error(" EERR32831: Error while update question details " + error.message);
        }
	},
	checkQuestion: async function (data) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveMedQuests_Name', Evolve.Sql.NVarChar, data.EvolveMedQuests_Name)
			.input('EvolveMedQuests_FieldType', Evolve.Sql.NVarChar, data.EvolveMedQuests_FieldType)
			.input('EvolveMedQuests_Type', Evolve.Sql.NVarChar, data.EvolveMedQuests_Type)
			.input('EvolveMedQuests_Options', Evolve.Sql.NVarChar, data.EvolveMedQuests_Options)


			.query(" SELECT   * FROM  EvolveTravelMedQuests WHERE EvolveMedQuests_Name=@EvolveMedQuests_Name AND EvolveMedQuests_FieldType=@EvolveMedQuests_FieldType AND  EvolveMedQuests_Type=@EvolveMedQuests_Type AND CONVERT(VARCHAR, EvolveMedQuests_Options)=@EvolveMedQuests_Options");
        } catch (error) {
            Evolve.Log.error(" EERR32832: Error while check question details " + error.message);
            return new Error(" EERR32832: Error while check question details " + error.message);
        }
	},
	checkQuestionOnUpdate: async function (data) {
        try {
			return await Evolve.SqlPool.request()
			.input('EvolveMedQuests_Name', Evolve.Sql.NVarChar, data.EvolveMedQuests_Name)
			.input('EvolveMedQuests_FieldType', Evolve.Sql.NVarChar, data.EvolveMedQuests_FieldType)
			.input('EvolveMedQuests_Type', Evolve.Sql.NVarChar, data.EvolveMedQuests_Type)
			.input('EvolveMedQuests_ID', Evolve.Sql.Int, data.EvolveMedQuests_ID)
			.input('EvolveMedQuests_Options', Evolve.Sql.NVarChar, data.EvolveMedQuests_Options)


			.query(" SELECT   * FROM  EvolveTravelMedQuests WHERE EvolveMedQuests_Name=@EvolveMedQuests_Name AND EvolveMedQuests_FieldType=@EvolveMedQuests_FieldType AND  EvolveMedQuests_Type=@EvolveMedQuests_Type AND CONVERT(VARCHAR, EvolveMedQuests_Options)=@EvolveMedQuests_Options  AND EvolveMedQuests_ID != @EvolveMedQuests_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR32833: Error while check question details " + error.message);
            return new Error(" EERR32833: Error while check question details " + error.message);
        }
	},

    


}