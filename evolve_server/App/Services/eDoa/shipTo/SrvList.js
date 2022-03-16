'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getShipToListCount: async function (search ,EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
            .query(" SELECT COUNT(est.EvolveShipTo_ID) as count FROM EvolveShipTo est, EvolveCustomer ec WHERE ec.EvolveCustomer_ID = est.EvolveCustomer_ID AND  est.EvolveShipTo_Code LIKE @search  ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get ship to list count "+error.message);
            return new Error(" EERR####: Error while get ship to list count "+error.message);
        }
    },

    getShipToList: async function (start, length ,search , EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .input('EvolveUser_ID', Evolve.Sql.Int, EvolveUser_ID)
                .query(" SELECT est.*, ec.EvolveCustomer_Code FROM EvolveShipTo est, EvolveCustomer ec WHERE ec.EvolveCustomer_ID = est.EvolveCustomer_ID AND  est.EvolveShipTo_Code LIKE @search ORDER BY EvolveShipTo_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get ship to ist "+error.message);
            return new Error(" EERR####: Error while get ship to ist "+error.message);
        }
    },

    // addShipTo: async function (EvolveUser_ID, data) {
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveCustomer_ID', Evolve.Sql.Int, data.EvolveCustomer_ID)
    //             .input('EvolveShipTo_Code', Evolve.Sql.NVarChar, data.EvolveShipTo_Code)
    //             .input('EvolveShipTo_Address1', Evolve.Sql.NVarChar, data.EvolveShipTo_Address1)
    //             .input('EvolveShipTo_Address2', Evolve.Sql.NVarChar, data.EvolveShipTo_Address2)
    //             .input('EvolveShipTo_Address3', Evolve.Sql.NVarChar, data.EvolveShipTo_Address3)
    //             .input('EvolveShipTo_Name', Evolve.Sql.NVarChar, data.EvolveShipTo_Name)
    //             .input('EvolveShipTo_City', Evolve.Sql.NVarChar, data.EvolveShipTo_City)
    //             .input('EvolveShipTo_Email', Evolve.Sql.NVarChar, data.EvolveShipTo_Email)
    //             .input('EvolveShipTo_EmailAlt', Evolve.Sql.NVarChar, data.EvolveShipTo_EmailAlt)
    //             .input('EvolveShipTo_Phone', Evolve.Sql.NVarChar, data.EvolveShipTo_Phone)
    //             .input('EvolveShipTo_PhoneAlt', Evolve.Sql.NVarChar, data.EvolveShipTo_PhoneAlt)
    //             .input('EvolveShipTo_State', Evolve.Sql.NVarChar, data.EvolveShipTo_State)
    //             .input('EvolveShipTo_ZipCode', Evolve.Sql.NVarChar, data.EvolveShipTo_ZipCode)
    //             .input('EvolveShipTo_CreatedUser', Evolve.Sql.Int, EvolveUser_ID)
    //             .input('EvolveShipTo_CreatedAt', Evolve.Sql.NVarChar, datetime)
    //             .input('EvolveShipTo_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
    //             .input('EvolveShipTo_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                
    //             .query(' INSERT INTO EvolveShipTo (EvolveCustomer_ID, EvolveShipTo_Code, EvolveShipTo_Address1, EvolveShipTo_Address2, EvolveShipTo_Address3, EvolveShipTo_Name, EvolveShipTo_City, EvolveShipTo_Email, EvolveShipTo_EmailAlt, EvolveShipTo_Phone, EvolveShipTo_PhoneAlt, EvolveShipTo_State, EvolveShipTo_ZipCode, EvolveShipTo_CreatedUser, EvolveShipTo_CreatedAt, EvolveShipTo_UpdatedUser, EvolveShipTo_UpdatedAt) VALUES (@EvolveCustomer_ID, @EvolveShipTo_Code, @EvolveShipTo_Address1, @EvolveShipTo_Address2, @EvolveShipTo_Address3, @EvolveShipTo_Name, @EvolveShipTo_City, @EvolveShipTo_Email, @EvolveShipTo_EmailAlt, @EvolveShipTo_Phone, @EvolveShipTo_PhoneAlt, @EvolveShipTo_State, @EvolveShipTo_ZipCode, @EvolveShipTo_CreatedUser, @EvolveShipTo_CreatedAt, @EvolveShipTo_UpdatedUser, @EvolveShipTo_UpdatedAt) ');

    //     } catch (error) {
    //         Evolve.Log.error(" EERR####: Erorr while add ship to "+error.message);
    //         return new Error(" EERR####: Erorr while add ship to "+error.message);
    //     }
    // },

    // updateShipTo : async function (EvolveUser_ID, data) {
    //     let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveShipTo_ID', Evolve.Sql.Int, data.EvolveShipTo_ID)
    //             .input('EvolveCustomer_ID', Evolve.Sql.Int, data.EvolveCustomer_ID)
    //             .input('EvolveShipTo_Code', Evolve.Sql.NVarChar, data.EvolveShipTo_Code)
    //             .input('EvolveShipTo_Address1', Evolve.Sql.NVarChar, data.EvolveShipTo_Address1)
    //             .input('EvolveShipTo_Address2', Evolve.Sql.NVarChar, data.EvolveShipTo_Address2)
    //             .input('EvolveShipTo_Address3', Evolve.Sql.NVarChar, data.EvolveShipTo_Address3)
    //             .input('EvolveShipTo_Name', Evolve.Sql.NVarChar, data.EvolveShipTo_Name)
    //             .input('EvolveShipTo_City', Evolve.Sql.NVarChar, data.EvolveShipTo_City)
    //             .input('EvolveShipTo_Email', Evolve.Sql.NVarChar, data.EvolveShipTo_Email)
    //             .input('EvolveShipTo_EmailAlt', Evolve.Sql.NVarChar, data.EvolveShipTo_EmailAlt)
    //             .input('EvolveShipTo_Phone', Evolve.Sql.NVarChar, data.EvolveShipTo_Phone)
    //             .input('EvolveShipTo_PhoneAlt', Evolve.Sql.NVarChar, data.EvolveShipTo_PhoneAlt)
    //             .input('EvolveShipTo_State', Evolve.Sql.NVarChar, data.EvolveShipTo_State)
    //             .input('EvolveShipTo_ZipCode', Evolve.Sql.NVarChar, data.EvolveShipTo_ZipCode)
    //             .input('EvolveShipTo_UpdatedUser', Evolve.Sql.Int, EvolveUser_ID)
    //             .input('EvolveShipTo_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            
    //             .query(' UPDATE EvolveShipTo SET EvolveCustomer_ID = @EvolveCustomer_ID, EvolveShipTo_Code = @EvolveShipTo_Code, EvolveShipTo_Address1 = @EvolveShipTo_Address1, EvolveShipTo_Address2 = @EvolveShipTo_Address2, EvolveShipTo_Address3 = @EvolveShipTo_Address3, EvolveShipTo_Name = @EvolveShipTo_Name, EvolveShipTo_City = @EvolveShipTo_City, EvolveShipTo_Email = @EvolveShipTo_Email, EvolveShipTo_EmailAlt = @EvolveShipTo_EmailAlt, EvolveShipTo_Phone = @EvolveShipTo_Phone, EvolveShipTo_PhoneAlt = @EvolveShipTo_PhoneAlt, EvolveShipTo_State = @EvolveShipTo_State, EvolveShipTo_ZipCode = @EvolveShipTo_ZipCode, EvolveShipTo_UpdatedUser = @EvolveShipTo_UpdatedUser, EvolveShipTo_UpdatedAt = @EvolveShipTo_UpdatedAt WHERE EvolveShipTo_ID = @EvolveShipTo_ID ');

    //     } catch (error) {
    //         Evolve.Log.error(" EERR####:  Erorr while update ship to "+error.message);
    //         return new Error(" EERR####:  Erorr while update ship to "+error.message);
    //     }
    // },

    deleteShipTo : async function (EvolveShipTo_ID) {
        try {
            return await Evolve.SqlPool.request()
            
            .input('EvolveShipTo_ID', Evolve.Sql.Int, EvolveShipTo_ID)
            
                .query(' DELETE FROM EvolveShipTo WHERE EvolveShipTo_ID = @EvolveShipTo_ID ');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while delete ship to "+error.message);
            return new Error(" EERR####:  Erorr while delete ship to "+error.message);
        }
    },

    getCustomerList : async function () {
        try {
            return await Evolve.SqlPool.request()
            .query(' SELECT * FROM EvolveCustomer ');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while getting customer list "+error.message);
            return new Error(" EERR####:  Erorr while getting customer list "+error.message);
        }
    },

    getCustomerId : async function (EvolveCustomer_Code) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveCustomer_Code', Evolve.Sql.NVarChar, EvolveCustomer_Code)
            .query(' SELECT EvolveCustomer_ID FROM EvolveCustomer WHERE EvolveCustomer_Code = @EvolveCustomer_Code ');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while getting customer id "+error.message);
            return new Error(" EERR####:  Erorr while getting customer id "+error.message);
        }
    },

    checkShipToExist : async function (EvolveShipTo_Code) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveShipTo_Code', Evolve.Sql.NVarChar, EvolveShipTo_Code)
            .query(' SELECT * FROM EvolveShipTo WHERE EvolveShipTo_Code = @EvolveShipTo_Code ');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while checking ship to "+error.message);
            return new Error(" EERR####:  Erorr while checking ship to "+error.message);
        }
    },

    updateShipTo : async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveShipTo_ID', Evolve.Sql.NVarChar, data['EvolveShipTo_ID'])
            .input('EvolveShipTo_Code', Evolve.Sql.NVarChar, data['Ship-To Code'])
            .input('EvolveShipTo_Name', Evolve.Sql.NVarChar, data['Ship-To Name'])
            .input('EvolveShipTo_State', Evolve.Sql.NVarChar, data['State'])
            .input('EvolveCustomer_ID', Evolve.Sql.Int, parseInt(data['EvolveCustomer_ID']))
            .input('EvolveShipTo_Address1', Evolve.Sql.NVarChar, data['Address 1'])
            .input('EvolveShipTo_Address2', Evolve.Sql.NVarChar, data['Address 2'])
            .input('EvolveShipTo_Address3', Evolve.Sql.NVarChar, data['Address 3'])
            .input('EvolveShipTo_UpdatedUser', Evolve.Sql.NVarChar, EvolveUser_ID)
            .input('EvolveShipTo_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            .query(' UPDATE EvolveShipTo SET EvolveShipTo_Code = @EvolveShipTo_Code, EvolveShipTo_Name = @EvolveShipTo_Name, EvolveShipTo_State = @EvolveShipTo_State, EvolveCustomer_ID = @EvolveCustomer_ID, EvolveShipTo_Address1 = @EvolveShipTo_Address1, EvolveShipTo_Address2 = @EvolveShipTo_Address2, EvolveShipTo_Address3 = @EvolveShipTo_Address3, EvolveShipTo_UpdatedUser = @EvolveShipTo_UpdatedUser, EvolveShipTo_UpdatedAt = @EvolveShipTo_UpdatedAt WHERE EvolveShipTo_ID = @EvolveShipTo_ID ');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while updating ship to "+error.message);
            return new Error(" EERR####:  Erorr while updating ship to "+error.message);
        }
    },

    addShipTo : async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveShipTo_Code', Evolve.Sql.NVarChar, data['Ship-To Code'])
            .input('EvolveShipTo_Name', Evolve.Sql.NVarChar, data['Ship-To Name'])
            .input('EvolveShipTo_State', Evolve.Sql.NVarChar, data['State'])
            .input('EvolveCustomer_ID', Evolve.Sql.Int, parseInt(data['EvolveCustomer_ID']))
            .input('EvolveShipTo_Address1', Evolve.Sql.NVarChar, data['Address 1'])
            .input('EvolveShipTo_Address2', Evolve.Sql.NVarChar, data['Address 2'])
            .input('EvolveShipTo_Address3', Evolve.Sql.NVarChar, data['Address 3'])
            .input('EvolveShipTo_CreatedUser', Evolve.Sql.NVarChar, EvolveUser_ID)
            .input('EvolveShipTo_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveShipTo_UpdatedUser', Evolve.Sql.NVarChar, EvolveUser_ID)
            .input('EvolveShipTo_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            .query(' INSERT INTO EvolveShipTo (EvolveShipTo_Code, EvolveShipTo_Name, EvolveShipTo_State, EvolveCustomer_ID, EvolveShipTo_Address1, EvolveShipTo_Address2, EvolveShipTo_Address3, EvolveShipTo_CreatedUser, EvolveShipTo_CreatedAt, EvolveShipTo_UpdatedUser, EvolveShipTo_UpdatedAt) VALUES (@EvolveShipTo_Code, @EvolveShipTo_Name, @EvolveShipTo_State, @EvolveCustomer_ID, @EvolveShipTo_Address1, @EvolveShipTo_Address2, @EvolveShipTo_Address3, @EvolveShipTo_CreatedUser, @EvolveShipTo_CreatedAt, @EvolveShipTo_UpdatedUser, @EvolveShipTo_UpdatedAt) ');

        } catch (error) {
            Evolve.Log.error(" EERR####:  Erorr while adding ship to "+error.message);
            return new Error(" EERR####:  Erorr while adding ship to "+error.message);
        }
    },

}