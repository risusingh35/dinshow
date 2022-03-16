const Evolve = require('../../Boot/Evolve');
var fs = require('fs');
try {

    Evolve.Router.get('/', function (req, res) {
        res.send('This is Evolve.')
    })


    Evolve.Router.post('/testAndon', function (req, res) {
        console.log("Body ::", req.body)
        let obj = { statusCode: 200, status: "success", message: "PB done", result: req.body };
        console.log("/*****************************************/")
        console.log(obj)
        console.log("/*****************************************/")
        res.send(obj);
    })

    /** 
     *  Title :  Dashboard API List
     *  Desc  :    
     */

    Evolve.Router.post('/api/v1/evolve/getSerialChartData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
        Evolve.App.Controllers.Evolve.EvolveDashboardController.getSerialChartData);



    /** End  : Dashboard  */





    Evolve.Router.post('/chart', function (req, res) {
        console.log("Req.Body :", req.body.period);
        let result = [];
        result.push({
            date: "2019-04-10",
            Completed: 80,
            Rework: 2
        });
        let obj = { statusCode: 200, status: "success", message: "done", result: result };
        console.log("/*****************************************/")
        console.log(obj)
        console.log("/*****************************************/")
        res.send(obj);
    });



    //Evolve.Router.post('/api/v1/evolve/auth/register',Evolve.App.Controllers.Evolve.evolveControllers.evolveRegister);


    // ,Evolve.App.Controllers.Evolve.evolveControllers.evolveGetData

    Evolve.Router.get('/api/v1/evolve/appList', Evolve.App.Controllers.Evolve.evolveControllers.evolveAppList);

    Evolve.Router.get('/api/v1/evolve/appMenuList', Evolve.App.Controllers.Evolve.evolveControllers.evolveAppMenuList);

    Evolve.Router.post('/api/v1/evolve/getDetailByCode', Evolve.App.Controllers.Evolve.evolveControllers.getDetailByCode);

    Evolve.Router.get('/api/v1/evolve/sidebarMenuList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.sidebarMenuList);

    Evolve.Router.post('/api/v1/evolve/getEncPass', Evolve.App.Controllers.Evolve.evolveControllers.getEncPass);

    // Process To Machine  

    // Evolve.Router.get('/api/v1/evolve/processlist', Evolve.App.Controllers.Evolve.evolveControllers.evolveProcessList);

    // Evolve.Router.get('/api/v1/evolve/machinelist', Evolve.App.Controllers.Evolve.evolveControllers.evolveMachineList);

    // Evolve.Router.post('/api/v1/evolve/createProcessToMachine', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.createProcessToMachineAuth, Evolve.App.Controllers.Evolve.evolveControllers.createProcessToMachine);

    // Evolve.Router.get('/api/v1/evolve/getprocesstomachine', Evolve.App.Controllers.Evolve.evolveControllers.evolvegetprocesstomachine);

    // Evolve.Router.get('/api/v1/evolve/getProcessToMachineList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.getProcessToMachineList);

    // Evolve.Router.post('/api/v1/evolve/selectSingleProcessMachine', Evolve.App.Controllers.Evolve.evolveControllers.selectSingleProcessMachine);

    // Evolve.Router.post('/api/v1/evolve/updateprocessmachine', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.updateprocessmachine);

    // Evolve.Router.post('/api/v1/evolve/deleteProcessToMachine', Evolve.App.Controllers.Evolve.evolveControllers.deleteProcessToMachine);

    // Section 

    // Evolve.Router.post('/api/v1/evolve/addsection', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.addsection, Evolve.App.Controllers.Evolve.evolveControllers.addsection);

    // Evolve.Router.get('/api/v1/evolve/getSectionList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.getSectionList);

    // Evolve.Router.post('/api/v1/evolve/selectSingleSection', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.selectSingleSection, Evolve.App.Controllers.Evolve.evolveControllers.selectSingleSection);

    // Evolve.Router.post('/api/v1/evolve/updateSection', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.updateSection, Evolve.App.Controllers.Evolve.evolveControllers.updateSection);

    // Evolve.Router.post('/api/v1/evolve/deleteSection', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.deleteSection, Evolve.App.Controllers.Evolve.evolveControllers.deleteSection);

    // serial Number  

    // Evolve.Router.post('/api/v1/evolve/addserialnumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.addserialnumber, Evolve.App.Controllers.Evolve.evolveControllers.addserialnumber);

    // Evolve.Router.get('/api/v1/evolve/getserialnumberList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.getserialnumberList);

    // Evolve.Router.post('/api/v1/evolve/selectSingleserialnumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.selectSingleserialnumber, Evolve.App.Controllers.Evolve.evolveControllers.selectSingleserialnumber);

    // Evolve.Router.post('/api/v1/evolve/updateserialnumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.updateserialnumber, Evolve.App.Controllers.Evolve.evolveControllers.updateserialnumber);

    // Evolve.Router.post('/api/v1/evolve/deleteserialnumber', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.deleteserialnumber, Evolve.App.Controllers.Evolve.evolveControllers.deleteserialnumber);

    // Shift Master 

    // Evolve.Router.post('/api/v1/evolve/addshift', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.addshift, Evolve.App.Controllers.Evolve.evolveControllers.addshift);

    // Evolve.Router.get('/api/v1/evolve/getshiftList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.getshiftList);

    // Evolve.Router.post('/api/v1/evolve/selectSingleshift', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.selectSingleshift, Evolve.App.Controllers.Evolve.evolveControllers.selectSingleshift);

    // Evolve.Router.post('/api/v1/evolve/updateshift', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.updateshift, Evolve.App.Controllers.Evolve.evolveControllers.updateshift);

    // Evolve.Router.post('/api/v1/evolve/deleteshift', Evolve.App.Controllers.Evolve.evolveControllers.deleteshift);

    // Process Template 

    // Evolve.Router.post('/api/v1/evolve/addprocesstemplate', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.addprocesstemplate, Evolve.App.Controllers.Evolve.evolveControllers.addprocesstemplate);

    // Evolve.Router.get('/api/v1/evolve/getprocesstemplateList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.getprocesstemplateList);


    // Evolve.Router.post('/api/v1/evolve/selectSingleprocesstempalte', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.selectSingleprocesstempalte, Evolve.App.Controllers.Evolve.evolveControllers.selectSingleprocesstempalte);

    // Evolve.Router.post('/api/v1/evolve/updateprocesstempalte', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.updateprocesstempalte, Evolve.App.Controllers.Evolve.evolveControllers.updateprocesstempalte);

    // Evolve.Router.post('/api/v1/evolve/deleteprocesstempalte', Evolve.App.Controllers.Evolve.evolveControllers.deleteprocesstempalte);

    // Process template -> process Sequence 

    // Evolve.Router.get('/api/v1/evolve/selectprocesssequencePTN', Evolve.App.Controllers.Evolve.evolveControllers.selectprocesssequencePTN);

    // Evolve.Router.get('/api/v1/evolve/selectprocesssequencePN', Evolve.App.Controllers.Evolve.evolveControllers.selectprocesssequencePN);

    // Evolve.Router.post('/api/v1/evolve/selectprocesssequenceON', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.selectprocesssequenceON, Evolve.App.Controllers.Evolve.evolveControllers.selectprocesssequenceON);

    // Evolve.Router.post('/api/v1/evolve/checksequenceprocessname', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.checksequenceprocessname, Evolve.App.Controllers.Evolve.evolveControllers.checksequenceprocessname);

    // Evolve.Router.post('/api/v1/evolve/addprocesssequence', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.addprocesssequence, Evolve.App.Controllers.Evolve.evolveControllers.addprocesssequence);

    // Evolve.Router.post('/api/v1/evolve/selectprocessteplatesequence', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.selectprocessteplatesequence, Evolve.App.Controllers.Evolve.evolveControllers.selectprocessteplatesequence);

    // Evolve.Router.post('/api/v1/evolve/selectprocessvalidations', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.selectprocessvalidations, Evolve.App.Controllers.Evolve.evolveControllers.selectprocessvalidations);

    // Part Bom Master 

    // Evolve.Router.post('/api/v1/evolve/addpartbommaster', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.addpartbommaster, Evolve.App.Controllers.Evolve.evolveControllers.addpartbommaster);

    // Evolve.Router.get('/api/v1/evolve/getItemSearch', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.getItemSearch);

    Evolve.Router.get('/api/v1/evolve/getChildItemSearch', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.getChildItemSearch);

    // Evolve.Router.post('/api/v1/evolve/getpartbom_dispseq', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.getpartbom_dispseq, Evolve.App.Controllers.Evolve.evolveControllers.getpartbom_dispseq);

    // Evolve.Router.get('/api/v1/evolve/getpartbommaster', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.getpartbommaster);

    // Evolve.Router.post('/api/v1/evolve/selectSinglePartBomMaster', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.selectSinglePartBomMaster, Evolve.App.Controllers.Evolve.evolveControllers.selectSinglePartBomMaster);

    // Evolve.Router.post('/api/v1/evolve/updatepartbommaster', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.updatepartbommaster, Evolve.App.Controllers.Evolve.evolveControllers.updatepartbommaster);

    // Evolve.Router.post('/api/v1/evolve/deletepartbommaster', Evolve.App.Controllers.Evolve.evolveControllers.deletepartbommaster);

    // Company

    // Evolve.Router.post('/api/v1/evolve/createCompany', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.createCompanyAuth, Evolve.App.Controllers.Evolve.evolveControllers.createCompany);

    // Evolve.Router.post('/api/v1/evolve/companyList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.companyList);

    Evolve.Router.post('/api/v1/evolve/userCompanyList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.userCompanyListAuth, Evolve.App.Controllers.Evolve.evolveControllers.userCompanyList);

    Evolve.Router.get('/api/v1/evolve/getCompanyList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.getCompanyList);

    Evolve.Router.post('/api/v1/evolve/deleteCompany', Evolve.App.Controllers.Evolve.evolveControllers.deleteCompany);

    // Evolve.Router.post('/api/v1/evolve/getCompanyListById', Evolve.App.Middlewares.EvolveApiValidator.getCompanyListById, Evolve.App.Controllers.Evolve.evolveControllers.getCompanyListById);

    Evolve.Router.post('/api/v1/evolve/testConnection', Evolve.App.Middlewares.EvolveApiValidator.testConnectionAuth, Evolve.App.Controllers.Evolve.evolveControllers.testConnection);

    // Unit

    Evolve.Router.post('/api/v1/evolve/createUnit', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.createUnitAuth, Evolve.App.Controllers.Evolve.evolveControllers.createUnit);

    Evolve.Router.get('/api/v1/evolve/getUnitsList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.getUnitsList);

    Evolve.Router.post('/api/v1/evolve/deleteUnit', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.deleteUnit);

    Evolve.Router.post('/api/v1/evolve/selectSingleUnit', Evolve.App.Middlewares.EvolveApiValidator.selectSingleUnitAuth, Evolve.App.Controllers.Evolve.evolveControllers.selectSingleUnit);

    Evolve.Router.post('/api/v1/evolve/updateUnit', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.updateUnitAuth, Evolve.App.Controllers.Evolve.evolveControllers.updateUnit);

    // Users

    // Evolve.Router.post('/api/v1/evolve/createUser', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.createUserAuth, Evolve.App.Controllers.Evolve.evolveControllers.createUser);

    // Evolve.Router.get('/api/v1/evolve/getUsersList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.getUsersList);

    // Evolve.Router.post('/api/v1/evolve/deleteUser', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization,
    // Evolve.App.Middlewares.EvolveApiValidator.deleteUser, Evolve.App.Controllers.Evolve.evolveControllers.deleteUser);

    // Evolve.Router.post('/api/v1/evolve/selectSingleUser', Evolve.App.Middlewares.EvolveApiValidator.selectSingleUserAuth, Evolve.App.Controllers.Evolve.evolveControllers.selectSingleUser);

    // Evolve.Router.post('/api/v1/evolve/updateUser', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.updateUserAuth, Evolve.App.Controllers.Evolve.evolveControllers.updateUser);


    // Roles
    // Evolve.Router.post('/api/v1/evolve/createRole', Evolve.App.Middlewares.EvolveApiValidator.createRoleAuth, Evolve.App.Controllers.Evolve.evolveControllers.createRole);

    // Evolve.Router.get('/api/v1/evolve/appListForRole', Evolve.App.Controllers.Evolve.evolveControllers.appListForRole);

    // Evolve.Router.get('/api/v1/evolve/getRoleList', Evolve.App.Controllers.Evolve.evolveControllers.getRoleList);

    // Evolve.Router.get('/api/v1/evolve/getAllRole', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.getAllRole);

    // Evolve.Router.post('/api/v1/evolve/deleteRole', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.deleteRole, Evolve.App.Controllers.Evolve.evolveControllers.deleteRole);

    // Evolve.Router.post('/api/v1/evolve/selectSingleRole', Evolve.App.Middlewares.EvolveApiValidator.selectSingleRoleAuth, Evolve.App.Controllers.Evolve.evolveControllers.selectSingleRole);

    // Evolve.Router.post('/api/v1/evolve/updateRole', Evolve.App.Middlewares.EvolveApiValidator.updateRoleAuth, Evolve.App.Controllers.Evolve.evolveControllers.updateRole);

    // Evolve.Router.post('/api/v1/evolve/updateRoleToMenu', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.updateRoleToMenu);


    // Menus


    Evolve.Router.get('/api/v1/evolve/countries', Evolve.App.Controllers.Evolve.countryControllers.getCountryList);
    Evolve.Router.post('/api/v1/evolve/language', Evolve.App.Controllers.Evolve.countryControllers.getLangugeList);
    // Evolve.Router.post('/api/v1/evolve/translate', Evolve.App.Controllers.Evolve.countryControllers.getTranslate);


    //Add Unit Configuration

    Evolve.Router.post('/api/v1/evolve/addUnitConfiguration', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.addUnitConfigurationAuth, Evolve.App.Controllers.Evolve.evolveControllers.addUnitConfiguration);

    Evolve.Router.post('/api/v1/evolve/getUnitConfigList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.getUnitConfigListAuth, Evolve.App.Controllers.Evolve.evolveControllers.getUnitConfigList);

    Evolve.Router.post('/api/v1/evolve/deleteUnitConfiguration', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.deleteUnitConfiguration);

    Evolve.Router.post('/api/v1/evolve/selectSingleUnitConfig', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.selectSingleUnitConfig);

    Evolve.Router.post('/api/v1/evolve/updateUnitConfiguration', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.updateUnitConfigurationAuth, Evolve.App.Controllers.Evolve.evolveControllers.updateUnitConfiguration);

    //Machine Master made By ravat



    //PDI Template 

    // Evolve.Router.post('/api/v1/evolve/addPDITempCode', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.addPDITempCode, Evolve.App.Controllers.Evolve.evolveControllers.addPDITempCode);
    // Evolve.Router.get('/api/v1/evolve/getPDITempCode', Evolve.App.Controllers.Evolve.evolveControllers.getPDITempCode);

    // Evolve.Router.post('/api/v1/evolve/addPDITemp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.addPDITemp, Evolve.App.Controllers.Evolve.evolveControllers.addPDITemp);


    // Evolve.Router.get('/api/v1/evolve/getPDITempDetail', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.getPDITempDetail);

    // Evolve.Router.post('/api/v1/evolve/selectSinglePDITemp', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.selectSinglePDITemp, Evolve.App.Controllers.Evolve.evolveControllers.selectSinglePDITemp);

    // Evolve.Router.post('/api/v1/evolve/updatePDITempDetail', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.updatePDITempDetail, Evolve.App.Controllers.Evolve.evolveControllers.updatePDITempDetail);

    // Evolve.Router.post('/api/v1/evolve/deletePDITempDetail', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.deletePDITempDetail);

    // Evolve User Setting 
    Evolve.Router.get('/api/v1/evolve/getProfileData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.getProfileData);

    //Sub Item List

    // Evolve.Router.get('/api/v1/evolve/getItemNumber', Evolve.App.Controllers.Evolve.evolveControllers.getItemNumber);
    // Evolve.Router.get('/api/v1/evolve/getSubItemListDt', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.getSubItemListDt);
    // Evolve.Router.post('/api/v1/evolve/deleteSubItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.deleteSubItem);
    // Evolve.Router.post('/api/v1/evolve/addSubItemList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.addSubItemList, Evolve.App.Controllers.Evolve.evolveControllers.addSubItemList);

    // Evolve.Router.post('/api/v1/evolve/selectSingleSubItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.selectSingleSubItem, Evolve.App.Controllers.Evolve.evolveControllers.selectSingleSubItem);

    // Evolve.Router.post('/api/v1/evolve/updateSubItem', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.updateSubItem, Evolve.App.Controllers.Evolve.evolveControllers.updateSubItem);

    // Do List

    Evolve.Router.get('/api/v1/evolve/getSoNumberList', Evolve.App.Controllers.Evolve.evolveControllers.getSoNumberList);
    Evolve.Router.post('/api/v1/evolve/getSalesOrderDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.getSalesOrderDetails);
    Evolve.Router.post('/api/v1/evolve/getDoDetails', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.getDoDetails);
    Evolve.Router.post('/api/v1/evolve/addDoList', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.addDoList);


    // Settings 

    Evolve.Router.post('/api/v1/evolve/changePassword', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.changePassword);

    //io data 

    Evolve.Router.post('/api/v1/evolve/getIoReportData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.getIoReportData, Evolve.App.Controllers.Evolve.evolveControllers.getIoReportData);
    Evolve.Router.post('/api/v1/evolve/getSingleIoCodeData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.getSingleIoCodeData, Evolve.App.Controllers.Evolve.evolveControllers.getSingleIoCodeData);

    Evolve.Router.post('/api/v1/evolve/changeIoCodeStatus', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Middlewares.EvolveApiValidator.changeIoCodeStatus, Evolve.App.Controllers.Evolve.evolveControllers.changeIoCodeStatus);

    Evolve.Router.get('/api/v1/evolve/getActiveDirectorySecurity', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.getActiveDirectorySecurity);

    Evolve.Router.post('/api/v1/evolve/updateActiveDirectorySecurity', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.updateActiveDirectorySecurity);


    // Evolve.Router.post('/api/v1/evolve/addDoLineData', Evolve.App.Middlewares.EvolveCommonApiValidator.apiAuthorization, Evolve.App.Controllers.Evolve.evolveControllers.addDoLineData);

    // Evolve.Router.post('/api/v1/evolve/CaptureWeight',function (req, res) {
    //     let weight = 0;
    //     // console.log("#############################################################")
    //     // console.log("req.body.weightScaleId:", req.body.weightScaleId)
    //     if(req.body.weightScaleId != undefined){
    //         //console.log("Evolve.EvolveWsM[req.body.weightScaleId]:", Evolve.EvolveWsM[req.body.weightScaleId])
    //         if(Evolve.EvolveWsM[req.body.weightScaleId] != undefined){
    //             weight = Evolve.EvolveWsM[req.body.weightScaleId];
    //         }
    //     }
    //     //console.log("#############################################################")

    // difital signature 

    // Evolve.Router.get('/api/v1/evolve/digitalSignature',Evolve.App.Controllers.Evolve.evolveControllers.digitalSignature);

    // Evolve.Router.post('/api/v1/evolve/digitalSignature',Evolve.App.Controllers.Evolve.evolveControllers.digitalSignature);

    // Evolve.Router.get('/api/v1/evolve/getFiles',Evolve.App.Controllers.Evolve.evolveControllers.getFiles);


    // Capture Weight

    // Evolve.Router.post('/api/v1/evolve/CaptureWeight',function (req, res) {
    //     let weight = 0;
    //     // console.log("#############################################################")
    //     // console.log("req.body.weightScaleId:", req.body.weightScaleId)
    //     if(req.body.weightScaleId != undefined){
    //         //console.log("Evolve.EvolveWsM[req.body.weightScaleId]:", Evolve.EvolveWsM[req.body.weightScaleId])
    //         if(Evolve.EvolveWsM[req.body.weightScaleId] != undefined){
    //             weight = Evolve.EvolveWsM[req.body.weightScaleId];
    //         }
    //     }
    //     //console.log("#############################################################")

    //     let obj = { statusCode: 200, status: "success", message: "done", result: weight };
    //     // console.log("/*****************************************/")
    //     // console.log(obj)
    //     // console.log("/*****************************************/")
    //     res.json(obj);





    /**
     * Title : 
     * Desc  :
     **/

    // Evolve.Router.post('/language',function (req, res) {
    //     let responce = [];
    //     if(req.body.language == 'gu'){
    //         responce.push({
    //             'processor' : 'ભારત' 
    //         })
    //     }else if(req.body.language == 'hn'){
    //         responce.push({
    //             'processor' : 'भारत' 
    //         })
    //     }else{
    //         // Default is Englis
    //         responce.push({
    //             'processor' : 'india' 
    //         })
    //     }
    //     console.log(responce)
    //     res.json(responce);
    //     });

    // Evolve.Router.post('/test', Evolve.App.Controllers.Evolve.evolveControllers.test);


    //Evolve.Router.post('/evolveLogin', Evolve.App.Controllers.Evolve.evolveControllers.evolveLogin);


    // XML Generate 

    Evolve.Router.get('/xml/:xml', function (req, res) {
        // console.log("Req.Body :", req.params.weight);
        console.log("/*****************************************/")
        //console.log("Evolve.Weight ::", Evolve.Weight)


        let xml = Evolve.Xml.create('DocumentElement', { version: "1.0", encoding: 'utf-8' });
        xml.ele('CHLDBKFLSH')
            .ele('DANO', 86279).up()
            .ele('ITEMNO', 86279).up()
            .ele('CPART', 86279).up()
            .ele('WONO', 86279).up()
            .ele('PLINE', 86279).up()
            .ele('INVQTY', 86279).up()
            .ele('PSERIAL', 86279).up()
            .ele('FZ1862276_TIME', 86279).up()
            .ele('FZ1862276_PartOK', 86279).up()
            .ele('K3220_InputParameter09', 86279).up()
            .ele('K3220_InputParameter10', 86279).up()
            .ele('K3220_InputParameter11', 86279).up()
            .ele('K3220_InputParameter12', 86279).up()
            .ele('K3220_TIME', 86279).up().end();
        xml.ele('PRNTBKFLSH')
            .ele('DANO', 86279).up()
            .ele('ITEMNO', 86279).up()
            .ele('CPART', 86279).up()
            .ele('WONO', 86279).up()
            .ele('PLINE', 86279).up()
            .ele('INVQTY', 86279).up().end();
        let xmldoc = xml.end({ pretty: true });

        console.log("xmldoc::", xmldoc)
        let fileName = req.params.xml + "_xml.xml";
        Evolve.Fs.writeFile(Evolve.Config.dirPath + '/' + fileName, xmldoc, function (err) {
            if (err) {
                console.log(err);
                res.json(0);
                // return console.log(err); 
            } else {
                console.log("The file was saved!");
                res.json(1);
            }
        });
        console.log("/*****************************************/")
    });






    /** Evolve Add User to IOT Platform. */
    Evolve.Router.post('/eiot_test_add',
        Evolve.App.Middlewares.EvolveApiValidator.validateEvolveUserTest,
        Evolve.App.Controllers.Evolve.evolveControllers.test
    );

    /** Evolve Get Prod Orders */
    Evolve.Router.post('/esf_get_prodorders',
        //  Evolve.App.Middlewares.EvolveApiValidator.validateEsfProdDetails,
        Evolve.App.Controllers.Evolve.evolveControllers.getProdOrder
    );

    /** Evolve Get Prod Triggers */
    Evolve.Router.post('/esf_get_prodtriggers',
        //  Evolve.App.Middlewares.EvolveApiValidator.validateEsfProdDetails,
        Evolve.App.Controllers.Evolve.evolveControllers.getProdTriggers
    );
    /** Evolve create Prod Orders */
    Evolve.Router.post('/esf_get_createorder',
        Evolve.App.Middlewares.EvolveApiValidator.validateEsfProdDetails,
        Evolve.App.Controllers.Evolve.evolveControllers.getProdTriggers
    );


    Evolve.Router.get('/weight/:weight', function (req, res) {
        console.log("Req.Body :", req.params.weight);
        Evolve.Weight = req.params.weight;
        console.log("/*****************************************/")
        console.log("Evolve.Weight ::", Evolve.Weight)
        console.log("/*****************************************/")
        res.json(1);
    });

    Evolve.Router.get('/icard/:id', function (req, res) {
        console.log("Req.Body :", req.params.id);
        let obj = { statusCode: 200, status: "success", message: "done", result: req.params.id };
        console.log("/*****************************************/")
        console.log(obj)
        console.log("/*****************************************/")
        res.json(1);
    });

    Evolve.Router.get('/fingerId/:id', function (req, res) {
        console.log("Req.Body :", req.params.id);
        let obj = { statusCode: 200, status: "success", message: "done", result: req.params.id };
        console.log("/*****************************************/")
        console.log(obj)
        console.log("/*****************************************/")
        res.json(5);
    });



    Evolve.Router.get('/printer/:id', function (req, res) {
        // console.log("Req.Body :", req.params.id);
        let fileName = req.params.id;

        if (fs.existsSync("D:/node_app/evolve_server/print/" + fileName + ".pdf")) {
            fs.unlink('D:/node_app/evolve_server/print/' + fileName + '.pdf', (err) => {
                //if (err) throw err;
                //console.log('successfully deleted');
            });
        }

        var dateObj = new Date();
        var crnt_date = dateObj.getDate() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getFullYear();
        var crnt_time = dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds();
        console.log("crnt_time :", crnt_time)
        var child = require('child_process').spawn('java', ['-jar', 'EvolvePIPL.jar', fileName, 'D:/node_app/evolve_server/print/', "Shiv", "ID" + fileName, 'Date: ' + crnt_date + ' Time: ' + crnt_time]);

        console.log("/*****************************************/")
        //console.log(child)
        console.log("/*****************************************/")
        res.json("Printing......3");
    });

    /**
     * Title :  Evolve Api List
     * Desc  :
     **/


    Evolve.Router.post('/testPrinter', function (req, res) {
        let obj = { statusCode: 200, status: "success", message: "done", result: req.body };
        console.log("/*****************************************/")
        console.log("Req.Body :", req.body);
        console.log("/*****************************************/")
        res.json(obj);
    });


    Evolve.Router.get('/plcTest', function (req, res) {
        // console.log("Req.Body :", req.params.id);
        let obj = { statusCode: 200, status: "success", message: "done", result: req.query };
        console.log("/*****************************************/")
        console.log(req.query)


        Object.entries(req.query).forEach(([key, value]) => {
            console.log("Key =>" + key, " | Value =>" + value);
        });
        console.log("/*****************************************/")
        res.json(obj);
    });



} catch (error) {
    console.log("Error in Evolve Api Router :", error)
}


module.exports = Evolve.Router