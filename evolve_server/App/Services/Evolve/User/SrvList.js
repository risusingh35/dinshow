'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
	getUserCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('select COUNT(EvolveUser_ID) as count  from EvolveUser WHERE  EvolveUser_Name LIKE @search');
        } catch (error) {
            Evolve.Log.error(" EERR3070: Error while get user list count "+error.message);
            return new Error(" EERR3070: Error while get user list count "+error.message);
        }
    },
	getUsersDatatableList: async function (start, length, search) {
		try {
			return await Evolve.SqlPool.request()
				.input('start', Evolve.Sql.Int, start)
				.input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

				.query('select EvolveUser_ID,EvolveUser_login,EvolveUser_Name,EvolveUser_EmailID,EvolveUser_CreatedAt from  EvolveUser WHERE EvolveUser_Name LIKE @search ORDER BY EvolveUser_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
		} catch (error) {
			Evolve.Log.error(" EERR1470: Error while getting Users Datatable List "+error.message);
			return new Error(" EERR1470: Error while getting Users Datatable List "+error.message);
		}
	},
	deleteUser: async function (id) {
		try {
			return await Evolve.SqlPool.request()
				.input('id', Evolve.Sql.Int, id)
				.query('DELETE FROM EvolveUser WHERE EvolveUser_ID = @id')
		} catch (error) {
			Evolve.Log.error(" EERR1471: Error while deleting User "+error.message);
			return new Error(" EERR1471: Error while deleting User "+error.message);
		}
	},

	getCompanyListById: async function (data) {
		try {
			
			return await Evolve.SqlPool.request()
				.input('EvolveCompany_ID', Evolve.Sql.Int, data.EvolveCompany_ID)
				.query('SELECT eut.EvolveUnit_ID , eut.EvolveUnit_Name ,  eut.EvolveUnit_Code FROM EvolveCompany ec , EvolveUnit eut WHERE ec.EvolveCompany_ID = eut.EvolveCompany_ID  AND ec.EvolveCompany_ID = @EvolveCompany_ID')
		} catch (error) {
			Evolve.Log.error(" EERR1472: Error while gettting Company List By Id "+error.message);
			return new Error(" EERR1472: Error while gettting Company List By Id "+error.message);
		}
	},

	CompanyList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('select EvolveCompany_ID,EvolveCompany_Name from EvolveCompany')
		} catch (error) {
			Evolve.Log.error(" EERR1473: Error in Company List "+error.message);
			return new Error(" EERR1473: Error in Company List "+error.message);
		}
	},

	getRoleList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('SELECT EvolveRole_ID,EvolveRole_Name FROM EvolveRole WHERE EvolveRole_IsActive = 1')
		} catch (error) {
			Evolve.Log.error(" EERR1474: Error while getting Role List "+error.message);
			return new Error(" EERR1474: Error while getting Role List "+error.message);
		}
	},

	selectSingleUser: async function (data) {
		try {
			let userRes = {};
			let userData = await Evolve.SqlPool.request()
				.query('SELECT eu.EvolveUser_ID , eu.EvolveUser_Name , eu.EvolveUser_EmailID , eu.EvolveUser_login , eu.EvolveUser_IsActive , eu.EvolveUser_UserType , eu.EvolveUser_PrintAllow , eu.EvolveUser_CreatePoAllow , eu.EvolveUser_IsBranchUser , eu.EvolveLanguage_ID , eu.EvolveUser_ActiveDirIsActive , eu.EvolveUser_ActiveDirUrl , eu.EvolveUser_ActiveDirBaseDN , eu.EvolveUser_ActiveDirUserName , eu.EvolveUser_ActiveDirPassword , eu.EvolveUser_DefaultMenu_ID , em.EvolveMenu_AppId FROM EvolveUser eu LEFT JOIN EvolveMenu em ON em.EvolveMenu_Id = eu.EvolveUser_DefaultMenu_ID WHERE EvolveUser_ID = ' + data.EvolveUser_ID)
			if (userData.rowsAffected > 0) {
				userRes['user'] = userData.recordset[0]
				// let userRole = await Evolve.SqlPool.request()
				// 	.query('select EvolveRole_ID From EvolveUserRoleLink WHERE EvolveUser_ID = ' + data.EvolveUser_ID)
				// if (userRole.rowsAffected > 0) {
				// 	userRes['role'] = userRole.recordset
				// }
				// else {
				// 	Evolve.Log.error(" EERR1475: Error : User Role Not Found ");
				// 	return new Error(" EERR1475: Error : User Role Not Found ");
				// }
				// let userUnit = await Evolve.SqlPool.request()
				// 	.query('select EvolveUnit_ID From EvolveUserUnitLink WHERE EvolveUser_ID = ' + data.EvolveUser_ID)
				// if (userUnit.rowsAffected > 0) {
				// 	userRes['unit'] = userUnit.recordset
				// }
				// else {
				// 	Evolve.Log.error(" EERR1476: Error : User Unit Not Found ");
				// 	return new Error(" EERR1476: Error : User Unit Not Found ");
				// }
				let userCompany = await Evolve.SqlPool.request()
					.query('select EvolveCompany_ID From EvolveUserCompanyLink WHERE EvolveUser_ID = ' + data.EvolveUser_ID)
				if (userCompany.rowsAffected > 0) {
					userRes['company'] = userCompany.recordset
				}
				else {
					Evolve.Log.error(" EERR1477: Error : User Company Link Not Found ");
					return new Error(" EERR1477: Error : User Company Link Not Found ");
				}
				// let assignedBranch = await Evolve.SqlPool.request()
				// 	.query('select EvolveBranch_ID FROM EvolveUserToBranch WHERE EvolveUser_ID = ' + data.EvolveUser_ID)
				// userRes['Branch'] = assignedBranch.recordset

				return userRes;
			}
			else {
				Evolve.Log.error(" EERR1478: Error : User Not Found");
				return new Error(" EERR1478: Error : User Not Found");
			}
		} catch (error) {
			Evolve.Log.error(" EERR1479: Error while selecting single user "+error.message);
			return new Error(" EERR1479: Error while selecting single user "+error.message);
		}
	},

	getLastPassword: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
				.query("SELECT EvolveUser_OldPassword from EvolveUser where EvolveUser_ID = @EvolveUser_ID");
		} catch (error) {
			Evolve.Log.error(" EERR1480: Error while getting Last Password "+error.message);
			return new Error(" EERR1480: Error while getting Last Password "+error.message);
		}
	},

	updateUser: async function (data) {
		try {
			let dataTime = new Date();
			let update_user = '';
			if (data.EvolveUser_password == '') {
				update_user = await Evolve.SqlPool.request()
					.input('EvolveUser_ID', Evolve.Sql.NVarChar, data.EvolveUser_ID)
					.input('EvolveUser_login', Evolve.Sql.NVarChar, data.EvolveUser_login)
					// .input('EvolveUser_EmailID', Evolve.Sql.NVarChar, data.EvolveUser_EmailID)
					.input('EvolveUser_Name', Evolve.Sql.NVarChar, data.EvolveUser_Name)
					.input('EvolveUser_IsActive', Evolve.Sql.Bit, data.EvolveUser_IsActive)
					.input('EvolveUser_UpdatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
					.input('EvolveUser_UpdatedAt', Evolve.Sql.DateTime, dataTime)
					// .input('EvolveUser_PrintAllow', Evolve.Sql.Bit, data.EvolveUser_PrintAllow)
					// .input('EvolveUser_CreatePoAllow', Evolve.Sql.Bit, data.EvolveUser_CreatePoAllow)
					// .input('EvolveUser_IsBranchUser', Evolve.Sql.Bit, data.EvolveUser_IsBranchUser)
					// .input('EvolveUser_ActiveDirIsActive', Evolve.Sql.Bit, data.EvolveUser_ActiveDirIsActive)
					// .input('EvolveUser_ActiveDirUrl', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirUrl)
					// .input('EvolveUser_ActiveDirBaseDN', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirBaseDN)
					// .input('EvolveUser_ActiveDirUserName', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirUserName)
					// .input('EvolveUser_ActiveDirPassword', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirPassword)
					// .input('EvolveUser_DefaultMenu_ID', Evolve.Sql.Int, data.EvolveUser_DefaultMenu_ID)
					.query('UPDATE EvolveUser SET EvolveUser_login=@EvolveUser_login,EvolveUser_Name=@EvolveUser_Name,EvolveUser_IsActive=@EvolveUser_IsActive,EvolveUser_UpdatedUser=@EvolveUser_UpdatedUser,EvolveUser_UpdatedAt=@EvolveUser_UpdatedAt WHERE EvolveUser_ID=@EvolveUser_ID');
			} else {
				let user_pass = Evolve.Bcrypt.hashSync(data.EvolveUser_password, 10)
				update_user = await Evolve.SqlPool.request()
					.input('EvolveUser_ID', Evolve.Sql.NVarChar, data.EvolveUser_ID)
					.input('EvolveUser_login', Evolve.Sql.NVarChar, data.EvolveUser_login)
					// .input('EvolveUser_EmailID', Evolve.Sql.NVarChar, data.EvolveUser_EmailID)
					.input('EvolveUser_Name', Evolve.Sql.NVarChar, data.EvolveUser_Name)
					.input('EvolveUser_password', Evolve.Sql.NVarChar, user_pass)
					.input('EvolveUser_IsActive', Evolve.Sql.Bit, data.EvolveUser_IsActive)
					.input('EvolveUser_UpdatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
					.input('EvolveUser_UpdatedAt', Evolve.Sql.DateTime, dataTime)
					// .input('EvolveUser_PrintAllow', Evolve.Sql.Bit, data.EvolveUser_PrintAllow)
					// .input('EvolveUser_CreatePoAllow', Evolve.Sql.Bit, data.EvolveUser_CreatePoAllow)
					// .input('EvolveUser_IsBranchUser', Evolve.Sql.Bit, data.EvolveUser_IsBranchUser)
					// .input('EvolveUser_ActiveDirIsActive', Evolve.Sql.Bit, data.EvolveUser_ActiveDirIsActive)
					// .input('EvolveUser_ActiveDirUrl', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirUrl)
					// .input('EvolveUser_ActiveDirBaseDN', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirBaseDN)
					// .input('EvolveUser_ActiveDirUserName', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirUserName)
					// .input('EvolveUser_ActiveDirPassword', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirPassword)
					// .input('EvolveUser_DefaultMenu_ID', Evolve.Sql.Int, data.EvolveUser_DefaultMenu_ID)
					.query('UPDATE EvolveUser SET EvolveUser_login=@EvolveUser_login,EvolveUser_Name=@EvolveUser_Name,EvolveUser_password=@EvolveUser_password,EvolveUser_IsActive=@EvolveUser_IsActive,EvolveUser_UpdatedUser=@EvolveUser_UpdatedUser,EvolveUser_UpdatedAt=@EvolveUser_UpdatedAt WHERE EvolveUser_ID=@EvolveUser_ID');
			}
			if (update_user instanceof Error || update_user.rowsAffected < 1) {
				Evolve.Log.Error(" EERR1481: Error In Create User ", result);
				return new Error(" EERR1481: Error In Create User ")
			}else{

				return update_user;

			}
			//  else {
			// 	let update_userToCmp = await Evolve.SqlPool.request()
			// 		.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
			// 		.input('EvolveCompany_ID', Evolve.Sql.Int, data.EvoleCompany_ID)
			// 		.input('EvolveUserCompanyLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
			// 		.input('EvolveUserCompanyLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
			// 		.query('UPDATE EvolveUserCompanyLink SET EvolveCompany_ID=@EvolveCompany_ID,EvolveUserCompanyLink_UpdatedUser=@EvolveUserCompanyLink_UpdatedUser,EvolveUserCompanyLink_UpdatedAt=@EvolveUserCompanyLink_UpdatedAt WHERE EvolveUser_ID = @EvolveUser_ID');

			// 	if (update_userToCmp instanceof Error || update_userToCmp.rowsAffected < 1) {
			// 		Evolve.Log.Error(" EERR1482: Error In Update User To Company Link ", update_userToCmp);
			// 		return new Error(" EERR1482: Error In Update User To Company Link")
			// 	}
			// 	else {
			// 		// let userUnits = await Evolve.SqlPool.request()
			// 		// 	.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
			// 		// 	.input('EvolveCompany_ID', Evolve.Sql.Int, data.EvoleCompany_ID)
			// 		// 	.query('select EvolveUnit_ID From EvolveUserUnitLink WHERE EvolveUser_ID = @EvolveUser_ID AND  EvolveCompany_ID = @EvolveCompany_ID')
			// 		// if (userUnits) {
			// 		// 	if (userUnits.rowsAffected > 0) {
			// 		// 		let unitData = userUnits.recordset
			// 		// 		let unitAll = []
			// 		// 		let unitGet = []
			// 		// 		for (let i = 0; i < unitData.length; i++) {
			// 		// 			unitAll[i] = unitData[i]['EvolveUnit_ID']
			// 		// 		}
			// 		// 		for (let i = 0; i < data.EvolveUnit_ID.length; i++) {
			// 		// 			unitGet[i] = parseInt(data.EvolveUnit_ID[i])
			// 		// 		}
			// 		// 		var removed_unit = unitAll.filter(function (obj) { return unitGet.indexOf(obj) == -1; });
			// 		// 		var added_unit = unitGet.filter(function (obj) { return unitAll.indexOf(obj) == -1; });
			// 		// 		for (let i = 0; i < removed_unit.length; i++) {
			// 		// 			let remove_unit = await Evolve.SqlPool.request()
			// 		// 				.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
			// 		// 				.input('EvolveCompany_ID', Evolve.Sql.Int, data.EvoleCompany_ID)
			// 		// 				.input('EvolveUnit_ID', Evolve.Sql.Int, removed_unit[i])
			// 		// 				.query('DELETE FROM EvolveUserUnitLink WHERE EvolveUser_ID = @EvolveUser_ID AND EvolveCompany_ID = @EvolveCompany_ID AND EvolveUnit_ID = @EvolveUnit_ID')
			// 		// 		}
			// 		// 		for (let i = 0; i < added_unit.length; i++) {
			// 		// 			let add_unit = await Evolve.SqlPool.request()
			// 		// 				.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
			// 		// 				.input('EvolveCompany_ID', Evolve.Sql.Int, data.EvoleCompany_ID)
			// 		// 				.input('EvolveUnit_ID', Evolve.Sql.Int, added_unit[i])
			// 		// 				.input('EvolveUserUnitLink_CreatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
			// 		// 				.input('EvolveUserUnitLink_CreatedAt', Evolve.Sql.DateTime, dataTime)
			// 		// 				.input('EvolveUserUnitLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
			// 		// 				.input('EvolveUserUnitLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
			// 		// 				.query('INSERT INTO EvolveUserUnitLink (EvolveUser_ID,EvolveCompany_ID,EvolveUnit_ID,EvolveUserUnitLink_CreatedUser,EvolveUserUnitLink_CreatedAt,EvolveUserUnitLink_UpdatedUser,EvolveUserUnitLink_UpdatedAt) VALUES (@EvolveUser_ID,@EvolveCompany_ID,@EvolveUnit_ID,@EvolveUserUnitLink_CreatedUser,@EvolveUserUnitLink_CreatedAt,@EvolveUserUnitLink_UpdatedUser,@EvolveUserUnitLink_UpdatedAt)');
			// 		// 		}
			// 		// 	}
			// 		// } else {
			// 		// 	Evolve.Log.Error(" EERR1483: Error In Get User Units ", userUnits);
			// 		// 	return new Error(" EERR1483: Error In Get User Units ")
			// 		// }
			// 		// let userRoles = await Evolve.SqlPool.request()
			// 		// 	.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
			// 		// 	.query('select EvolveRole_ID From EvolveUserRoleLink WHERE EvolveUser_ID = @EvolveUser_ID')
			// 		// if (userRoles) {
			// 		// 	if (userRoles.rowsAffected > 0) {
			// 		// 		let roleData = userRoles.recordset
			// 		// 		let roleAll = []
			// 		// 		let roleGet = []
			// 		// 		for (let i = 0; i < roleData.length; i++) {
			// 		// 			roleAll[i] = roleData[i]['EvolveRole_ID']
			// 		// 		}
			// 		// 		for (let i = 0; i < data.EvolveRole_ID.length; i++) {
			// 		// 			roleGet[i] = parseInt(data.EvolveRole_ID[i])
			// 		// 		}
			// 		// 		var removed_role = roleAll.filter(function (obj) { return roleGet.indexOf(obj) == -1; });
			// 		// 		var added_role = roleGet.filter(function (obj) { return roleAll.indexOf(obj) == -1; });
			// 		// 		for (let i = 0; i < removed_role.length; i++) {
			// 		// 			let remove_unit = await Evolve.SqlPool.request()
			// 		// 				.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
			// 		// 				.input('EvolveRole_ID', Evolve.Sql.Int, removed_role[i])
			// 		// 				.query('DELETE FROM EvolveUserRoleLink WHERE EvolveUser_ID = @EvolveUser_ID AND EvolveRole_ID = @EvolveRole_ID')
			// 		// 		}
			// 		// 		for (let i = 0; i < added_role.length; i++) {
			// 		// 			let add_role = await Evolve.SqlPool.request()
			// 		// 				.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
			// 		// 				.input('EvolveRole_ID', Evolve.Sql.Int, added_role[i])
			// 		// 				.input('EvolveUserRoleLink_CreatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
			// 		// 				.input('EvolveUserRoleLink_CreatedAt', Evolve.Sql.DateTime, dataTime)
			// 		// 				.input('EvolveUserRoleLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
			// 		// 				.input('EvolveUserRoleLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
			// 		// 				.query('INSERT INTO EvolveUserRoleLink (EvolveUser_ID,EvolveRole_ID,EvolveUserRoleLink_CreatedUser,EvolveUserRoleLink_CreatedAt,EvolveUserRoleLink_UpdatedUser,EvolveUserRoleLink_UpdatedAt) VALUES (@EvolveUser_ID,@EvolveRole_ID,@EvolveUserRoleLink_CreatedUser,@EvolveUserRoleLink_CreatedAt,@EvolveUserRoleLink_UpdatedUser,@EvolveUserRoleLink_UpdatedAt)');
			// 		// 		}
			// 		// 	}
			// 		// } else {
			// 		// 	Evolve.Log.Error(" EERR1484: Error In Get User Units ", userUnits);
			// 		// 	return new Error(" EERR1484: Error In Get User Units ")
			// 		// }
			// 	}
			// 	return update_user;
			// }
		} catch (error) {
			Evolve.Log.error(" EERR1485: Error while updating user "+error.message);
			return new Error(" EERR1485: Error while updating user "+error.message);
		}
	},

	createUser: async function (data) {
		try {
			let dataTime = new Date();
			let user_pass = Evolve.Bcrypt.hashSync(data.EvolveUser_password, 10)
			let create_user = await Evolve.SqlPool.request()
				.input('EvolveUser_login', Evolve.Sql.NVarChar, data.EvolveUser_login)
				.input('EvolveUser_EmailID', Evolve.Sql.NVarChar, data.EvolveUser_EmailID)
				.input('EvolveUser_Name', Evolve.Sql.NVarChar, data.EvolveUser_Name)
				.input('EvolveUser_password', Evolve.Sql.NVarChar, user_pass)
				.input('EvolveUser_IsActive', Evolve.Sql.Bit, data.EvolveUser_IsActive)
				.input('EvolveUser_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.input('EvolveUser_CreatedAt', Evolve.Sql.DateTime, dataTime)
				.input('EvolveUser_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.input('EvolveUser_UpdatedAt', Evolve.Sql.DateTime, dataTime)
				// .input('EvolveUser_PrintAllow', Evolve.Sql.Bit, data.EvolveUser_PrintAllow)
				// .input('EvolveUser_CreatePoAllow', Evolve.Sql.Bit, data.EvolveUser_CreatePoAllow)
				// .input('EvolveUser_IsBranchUser', Evolve.Sql.Bit, data.EvolveUser_IsBranchUser)
				.input('EvolveUser_OldPassword', Evolve.Sql.NVarChar, '0,0,' + user_pass)
				// .input('EvolveUser_ActiveDirIsActive', Evolve.Sql.Bit, data.EvolveUser_ActiveDirIsActive)
				// .input('EvolveUser_ActiveDirUrl', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirUrl)
				// .input('EvolveUser_ActiveDirBaseDN', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirBaseDN)
				// .input('EvolveUser_ActiveDirUserName', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirUserName)
				// .input('EvolveUser_ActiveDirPassword', Evolve.Sql.NVarChar, data.EvolveUser_ActiveDirPassword)
				// .input('EvolveUser_DefaultMenu_ID', Evolve.Sql.Int, data.EvolveUser_DefaultMenu_ID)

				.query('INSERT INTO EvolveUser (EvolveUser_login,EvolveUser_EmailID,EvolveUser_Name,EvolveUser_password,EvolveUser_IsActive,EvolveUser_CreatedUser,EvolveUser_CreatedAt,EvolveUser_UpdatedUser,EvolveUser_UpdatedAt,EvolveUser_OldPassword ) VALUES (@EvolveUser_login,@EvolveUser_EmailID,@EvolveUser_Name,@EvolveUser_password,@EvolveUser_IsActive,@EvolveUser_CreatedUser,@EvolveUser_CreatedAt,@EvolveUser_UpdatedUser,@EvolveUser_UpdatedAt,@EvolveUser_OldPassword);select @@IDENTITY AS \'inserted_id\'');

			if (create_user instanceof Error || create_user.rowsAffected < 1) {
				Evolve.Log.Error(" EERR1486: Error In Create User ", result);
				return new Error(" EERR1486: Error In Create User ")
			} else {
				// let inserted_id_user = create_user.recordset[0].inserted_id;

				// let create_userToCmp = await Evolve.SqlPool.request()
				// 	.input('EvolveUser_ID', Evolve.Sql.Int, inserted_id_user)
				// 	.input('EvolveCompany_ID', Evolve.Sql.Int, data.EvoleCompany_ID)
				// 	.input('EvolveUserCompanyLink_IsDefault', Evolve.Sql.Bit, false)
				// 	.input('EvolveUserCompanyLink_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				// 	.input('EvolveUserCompanyLink_CreatedAt', Evolve.Sql.DateTime, dataTime)
				// 	.input('EvolveUserCompanyLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				// 	.input('EvolveUserCompanyLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
				// 	.query('INSERT INTO EvolveUserCompanyLink (EvolveUser_ID,EvolveCompany_ID,EvolveUserCompanyLink_IsDefault,EvolveUserCompanyLink_CreatedUser,EvolveUserCompanyLink_CreatedAt,EvolveUserCompanyLink_UpdatedUser,EvolveUserCompanyLink_UpdatedAt) VALUES (@EvolveUser_ID,@EvolveCompany_ID,@EvolveUserCompanyLink_IsDefault,@EvolveUserCompanyLink_CreatedUser,@EvolveUserCompanyLink_CreatedAt,@EvolveUserCompanyLink_UpdatedUser,@EvolveUserCompanyLink_UpdatedAt);select @@IDENTITY AS \'inserted_id\'');

				// if (create_userToCmp instanceof Error || create_userToCmp.rowsAffected < 1) {
				// 	Evolve.Log.Error(" EERR1487: Error In Create User To Company Link ", result);
				// 	return new Error(" EERR1487: Error In Create User To Company Link ")
				// } else {
				// 	for (let i = 0; i < data.EvoleUnit_ID.length; i++) {
				// 		await Evolve.SqlPool.request()
				// 			.input('EvolveUser_ID', Evolve.Sql.Int, inserted_id_user)
				// 			.input('EvolveCompany_ID', Evolve.Sql.Int, data.EvoleCompany_ID)
				// 			.input('EvolveUnit_ID', Evolve.Sql.Int, data.EvoleUnit_ID[i])
				// 			.input('EvolveUserUnitLink_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				// 			.input('EvolveUserUnitLink_CreatedAt', Evolve.Sql.DateTime, dataTime)
				// 			.input('EvolveUserUnitLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				// 			.input('EvolveUserUnitLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
				// 			.query('INSERT INTO EvolveUserUnitLink (EvolveUser_ID,EvolveCompany_ID,EvolveUnit_ID,EvolveUserUnitLink_CreatedUser,EvolveUserUnitLink_CreatedAt,EvolveUserUnitLink_UpdatedUser,EvolveUserUnitLink_UpdatedAt) VALUES (@EvolveUser_ID,@EvolveCompany_ID,@EvolveUnit_ID,@EvolveUserUnitLink_CreatedUser,@EvolveUserUnitLink_CreatedAt,@EvolveUserUnitLink_UpdatedUser,@EvolveUserUnitLink_UpdatedAt)');
				// 	}

				// 	for (let i = 0; i < data.EvoleRole_ID.length; i++) {
				// 		await Evolve.SqlPool.request()
				// 			.input('EvolveUser_ID', Evolve.Sql.Int, inserted_id_user)
				// 			.input('EvolveRole_ID', Evolve.Sql.Int, data.EvoleRole_ID[i])
				// 			.input('EvolveUserRoleLink_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				// 			.input('EvolveUserRoleLink_CreatedAt', Evolve.Sql.DateTime, dataTime)
				// 			.input('EvolveUserRoleLink_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				// 			.input('EvolveUserRoleLink_UpdatedAt', Evolve.Sql.DateTime, dataTime)
				// 			.query('INSERT INTO EvolveUserRoleLink (EvolveUser_ID,EvolveRole_ID,EvolveUserRoleLink_CreatedUser,EvolveUserRoleLink_CreatedAt,EvolveUserRoleLink_UpdatedUser,EvolveUserRoleLink_UpdatedAt) VALUES (@EvolveUser_ID,@EvolveRole_ID,@EvolveUserRoleLink_CreatedUser,@EvolveUserRoleLink_CreatedAt,@EvolveUserRoleLink_UpdatedUser,@EvolveUserRoleLink_UpdatedAt)');
				// 	}
				// }
				return create_user;
			}
		} catch (error) {
			Evolve.Log.error(" EERR1488: Error while creating user "+error.message);
			return new Error(" EERR1488: Error while creating user "+error.message);
		}
	},

	getBranchList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query('SELECT * FROM EvolveBranch')
		} catch (error) {
			Evolve.Log.error(" EERR1489: Error while getting branch list "+error.message);
			return new Error(" EERR1489: Error while getting branch list "+error.message);
		}
	},

	assignBranch: async function (data, branch_id) {
		try {
			let dataTime = new Date();
			return await Evolve.SqlPool.request()
				.input('EvolveBranch_ID', Evolve.Sql.Int, branch_id)
				.input('EvolveUser_ID', Evolve.Sql.Int, data.insertUser_ID)
				.input('EvolveUserToBranch_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.input('EvolveUserToBranch_CreatedAt', Evolve.Sql.DateTime, dataTime)
				.input('EvolveUserToBranch_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
				.input('EvolveUserToBranch_UpdatedAt', Evolve.Sql.DateTime, dataTime)
				.query('INSERT INTO EvolveUserToBranch (EvolveBranch_ID ,EvolveUser_ID,EvolveUserToBranch_CreatedUser,EvolveUserToBranch_CreatedAt,EvolveUserToBranch_UpdatedUser,EvolveUserToBranch_UpdatedAt)VALUES (@EvolveBranch_ID,@EvolveUser_ID,@EvolveUserToBranch_CreatedUser,@EvolveUserToBranch_CreatedAt,@EvolveUserToBranch_UpdatedUser,@EvolveUserToBranch_UpdatedAt) ');
		} catch (error) {
			Evolve.Log.error(" EERR1490: Error while assigning Branch "+error.message);
			return new Error(" EERR1490: Error while assigning Branch "+error.message);
		}
	},


	// updateBranch: async function (data) {
	// 	try {
	// 		let dataTime = new Date();
	// 		return await Evolve.SqlPool.request()
	// 			.input('EvolveBranch_ID', Evolve.Sql.Int, data.EvolveBranch_ID)
	// 			.input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
	// 			.input('EvolveUserToBranch_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
	// 			.input('EvolveUserToBranch_CreatedAt', Evolve.Sql.DateTime, dataTime)
	// 			.input('EvolveUserToBranch_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
	// 			.input('EvolveUserToBranch_UpdatedAt', Evolve.Sql.DateTime, dataTime)
	// 			.query('INSERT INTO EvolveUserToBranch (EvolveBranch_ID ,EvolveUser_ID,EvolveUserToBranch_CreatedUser,EvolveUserToBranch_CreatedAt,EvolveUserToBranch_UpdatedUser,EvolveUserToBranch_UpdatedAt)VALUES (@EvolveBranch_ID,@EvolveUser_ID,@EvolveUserToBranch_CreatedUser,@EvolveUserToBranch_CreatedAt,@EvolveUserToBranch_UpdatedUser,@EvolveUserToBranch_UpdatedAt) ');

	// 	} catch (error) {
	// 		Evolve.Log.error("  "+error.message);
	// 		return new Error("  "+error.message);
	// 	}
	// },


	deleteBranchAssignment: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveUser_ID', Evolve.Sql.Int, data.insertUser_ID)
				.query('DELETE FROM EvolveUserToBranch WHERE EvolveUser_ID = @EvolveUser_ID')
		} catch (error) {
			Evolve.Log.error(" EERR1491: Error while  deleting Branch Assignment "+error.message);
			return new Error(" EERR1491: Error while  deleting Branch Assignment "+error.message);
		}
	},

	getAppList: async function () {
		try {
			return await Evolve.SqlPool.request()
				.query("SELECT * FROM EvolveApp");
		} catch (error) {
			Evolve.Log.error(" EERR1492: Error while getting App List "+error.message);
			return new Error(" EERR1492: Error while getting App List "+error.message);
		}
	},
	getDefaultMenuList: async function (data) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveMenu_AppId', Evolve.Sql.Int, data.EvolveMenu_AppId)
				.query("SELECT EvolveMenu_Id, EvolveMenu_Name FROM EvolveMenu WHERE EvolveMenu_AppId = @EvolveMenu_AppId AND EvolveMenu_IsActive = 'true'");
		} catch (error) {
			Evolve.Log.error(" EERR1493: Error while getting Default Menu List "+error.message);
			return new Error(" EERR1493: Error while getting Default Menu List "+error.message);
		}
	},





}