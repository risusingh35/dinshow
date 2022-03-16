'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    // Product Colour Lisr
    getProductColorList: async function (req, res) {
        try {

            let List = await Evolve.App.Services.Evolve.productConfigrator.SrvOption.getProductColorList();
           
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Product Colour List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Product Colour List",
                    result:  List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Product Colour list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Product Colour list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    // get ProductName List

    getProductNameList: async function (req, res) {
        try {
            
            let List = await Evolve.App.Services.Evolve.productConfigrator.SrvOption.getProductNameList();
           
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While get Product Name List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "get Product Name List",
                    result:  List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Product Name list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Product Name list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // get ProductType List

    getProductTypeList: async function (req, res) {
        try {
            
            let List = await Evolve.App.Services.Evolve.productConfigrator.SrvOption.getProductTypeList();
           
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While get Product Type List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "get Product Type List",
                    result:  List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Product Type list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Product Type list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // get ProductGrade List

    getProductGradeList: async function (req, res) {
        try {
            
            let List = await Evolve.App.Services.Evolve.productConfigrator.SrvOption.getProductGradeList();
           
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While get Product Grade List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "get Product Grade List",
                    result:  List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Product Grade list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Product Grade list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    //   Get Product Design List 
    getProductDesignList: async function (req, res) {
        try {
            
            let List = await Evolve.App.Services.Evolve.productConfigrator.SrvOption.getProductDesignList();
           
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Product Design List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Product Design List",
                    result:  List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Product Design List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Product Design List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // Get Customer List 
    getCustomerList: async function (req, res) {
        try {
            
            let List = await Evolve.App.Services.Evolve.productConfigrator.SrvOption.getCustomerList();
           
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Customer List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Customer List",
                    result:  List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Customer list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Customer list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // BOm List 
    getItemList: async function (req, res) {
        try {
            
            let List = await Evolve.App.Services.Evolve.productConfigrator.SrvOption.getItemList();
           
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Bom List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Bom List",
                    result:  List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Bom list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Bom list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // UOm List 
    getUomList: async function (req, res) {
        try {
            
            let List = await Evolve.App.Services.Evolve.productConfigrator.SrvOption.getUomList();
            
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Uom List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Uom List",
                    result:  List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Uom list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Uom list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getProductQuality: async function (req, res) {
        try {
            

            let List = await Evolve.App.Services.Evolve.productConfigrator.SrvOption.getProductQuality();
            
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Bom List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Bom List",
                    result:  {ProductQuality:List.recordset}
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Bom list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Bom list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // get Product Data
    getProductData: async function (req, res) {
        try {
            let arr = [
                {'Formulation':"JUMBO ROLL","FormulationCode":"-","Required":false},
                {'Formulation':"Top Coat","FormulationCode":"-","Required":false},
                {'Formulation':"Foam Coat","FormulationCode":"-","Required":false},
                {'Formulation':"Adhesive Coat","FormulationCode":"-","Required":false}
                ]
                
            let obj = {
                statusCode: 200,
                status: "success",
                message: "productConfigrator checking",
                result:{FormulationList:arr}
            };
            res.send(obj);
        
        } catch (error) {
         
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0212: Error while Get Product Data "+error.message,
            result: null
          };
          res.send(obj);
        }
    },

    createProductConfigrator: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
             let errorMessage = '';

            let error = false;

            let configratorDetails = []

            let productId = "";

            let preseq = Evolve.Generator.generate("ITEM");
            if (preseq == undefined || preseq.length == 0) {
                error = true;
                errorMessage = "Error While Assing Item Code!!"
            }
            
            let itemDetail =  req.body.EvolveItemAllList;
            for (let i = 0; i < itemDetail.length; i++) {
                let code = itemDetail[i].Item.split('-')[1]
                // let desc1 = await Evolve.App.Controllers.Evolve.productConfigrator.ConOption.createDesc1(itemDetail[i],req.body);
                itemDetail[i].EvolveProductConfigratorDetails_Desc1 = itemDetail[i].ItemDesc1;
                itemDetail[i].EvolveProductConfigratorDetails_Desc2 = itemDetail[i].ItemDesc2;
                if(code == 0){
                    itemDetail[i].ItemType="Local";
                    itemDetail[i].ItemGroup="4000";
                    itemDetail[i].ProductLine="4000";
                    itemDetail[i].Uom="MT";
                    itemDetail[i].Location="FG";
                    itemDetail[i].OrderPolicy="LFL";
                    itemDetail[i].MasterSchedule=true;
                    itemDetail[i].PlannedOrder=true;
                    itemDetail[i].PmCode="M";
                    itemDetail[i].Site="CFD01";
                    itemDetail[i].IssuePolicy="2";
                    itemDetail[i].AllocationPolicy="1";
                    itemDetail[i].TransferPolicy="2";
                    itemDetail[i].ptpMs="true";
                    itemDetail[i].ptpRouting=""

                }else if(code == 1){
                    itemDetail[i].ItemType="Semi";
                    itemDetail[i].ItemGroup="6007";
                    itemDetail[i].ProductLine="6000";
                    itemDetail[i].Uom="MT";
                    itemDetail[i].Location="SFG";
                    itemDetail[i].OrderPolicy="LFL";
                    itemDetail[i].MasterSchedule=false;
                    itemDetail[i].PlannedOrder=true;
                    itemDetail[i].PmCode="M";
                    itemDetail[i].Site="CFD01";
                    itemDetail[i].IssuePolicy="2";
                    itemDetail[i].AllocationPolicy="1";
                    itemDetail[i].TransferPolicy="2";
                    itemDetail[i].ptpMs="false";
                }else{
                    if(itemDetail[i].isQualityItem == true) {
                        itemDetail[i].ItemType="Local";
                    itemDetail[i].ItemGroup="4000";
                    itemDetail[i].ProductLine="4000";
                    itemDetail[i].Uom="MT";
                    itemDetail[i].Location="FG";
                    itemDetail[i].OrderPolicy="LFL";
                    itemDetail[i].MasterSchedule=true;
                    itemDetail[i].PlannedOrder=true;
                    itemDetail[i].PmCode="M";
                    itemDetail[i].Site="CFD01";
                    itemDetail[i].IssuePolicy="2";
                    itemDetail[i].AllocationPolicy="1";
                    itemDetail[i].TransferPolicy="2";
                    itemDetail[i].ptpMs="true";
                    }else {
                        itemDetail[i].ItemType="WIP";
                        itemDetail[i].ItemGroup="4104";
                        itemDetail[i].ProductLine="4900";
                        itemDetail[i].Uom="KG";
                        itemDetail[i].Location="WIP";
                        itemDetail[i].OrderPolicy="LFL";
                        itemDetail[i].MasterSchedule=false;
                        itemDetail[i].PlannedOrder=true;
                        itemDetail[i].PmCode="M";
                        itemDetail[i].Site="CFD01";
                        itemDetail[i].IssuePolicy="2";
                        itemDetail[i].AllocationPolicy="1";
                        itemDetail[i].TransferPolicy="2";
                        itemDetail[i].ptpMs="false";
                    }
                   
                }

            }

            // Add ProductConfigrator
            if(error == false) {
                req.body.EvolveCustomer_ID = req.body.EvolveCustomer_ID == undefined ? null : req.body.EvolveCustomer_ID;
                for (let i = 0; i < req.body.EvolveProduct_List.length; i++) {
                    if(req.body.EvolveProduct_List[i].Formulation == 'Top Coat'){
                        req.body.EvolveProductConfigrator_TopCoat = req.body.EvolveProduct_List[i].FormulationCode
                    }
                    else if(req.body.EvolveProduct_List[i].Formulation == 'Foam Coat'){
                        req.body.EvolveProductConfigrator_FoamCoat = req.body.EvolveProduct_List[i].FormulationCode
                    }
                    else if(req.body.EvolveProduct_List[i].Formulation == 'Adhesive Coat'){
                        req.body.EvolveProductConfigrator_AdhesiveCoat = req.body.EvolveProduct_List[i].FormulationCode
                    }else if(req.body.EvolveProduct_List[i].Formulation == 'JUMBO ROLL') {
                        req.body.EvolveProductConfigrator_SemiFG = req.body.EvolveProduct_List[i].FormulationCode
                    }
                    
                }
                req.body.EvolveProductConfigrator_Lacquer == '' ? null : req.body.EvolveProductConfigrator_Lacquer;
                req.body.EvolveProductConfigrator_Inline == '' ? null : req.body.EvolveProductConfigrator_Inline;
                req.body.EvolveProductConfigrator_Jercy == '' ? null : req.body.EvolveProductConfigrator_Jercy;
                req.body.EvolveProductConfigrator_Paper == '' ? null : req.body.EvolveProductConfigrator_Paper;

                let result = await Evolve.App.Services.Evolve.productConfigrator.SrvOption.createProductConfigrator(req.body);
                if (result instanceof Error) {
                    error = true;
                    errorMessage = "Error on Create productConfigrator";
                
                }else{
                    console.log("te product data:::::",result.recordset);
                    productId = result.recordset[0].inserted_id;
                }
            }
            
                // let today = new Date();
                // let dd = String(today.getDate()).padStart(2, '0');
                // let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                // let yyyy = today.getFullYear();
                let today = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
                
                // today = mm + '/' + dd + '/' + yyyy;

                // XML For ProductConfigrator Details
            
                for (let i = 0; i < itemDetail.length; i++) {
                    let er = false;
                    // 1st //
                        let obj = {};
                        let xmlObj = {
                            "soapenv:Envelope": {
                                "@xmlns": "urn:schemas-qad-com:xml-services",
                                "@xmlns:qcom": "urn:schemas-qad-com:xml-services:common",
                                "@xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
                                "@xmlns:wsa": "http://www.w3.org/2005/08/addressing",
                                "soapenv:Header": {
                                    "wsa:Action": "",
                                    "wsa:To": "urn:services-qad-com:QADERP",
                                    "wsa:MessageID": "urn:services-qad-com::QADERP",
                                    "wsa:ReferenceParameters": {
                                        "qcom:suppressResponseDetail": "true"
                                    },
                                    "wsa:ReplyTo": {
                                        "wsa:Address": "urn:services-qad-com:"
                                    }
                                },
                                "soapenv:Body": {
                                    "maintainItemMaster": {
                                        "qcom:dsSessionContext": {
                                            'qcom:ttContext': [
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "domain",
                                                    'qcom:propertyValue': Evolve.Config.QXTENDDOMAIN
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "scopeTransaction",
                                                    'qcom:propertyValue': "true"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "version",
                                                    'qcom:propertyValue': "ERP3_7"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "mnemonicsRaw",
                                                    'qcom:propertyValue': "false"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "username",
                                                    'qcom:propertyValue': Evolve.Config.QXTENDUSERNAME
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "password",
                                                    'qcom:propertyValue': Evolve.Config.QXTENDPASSWORD == "QXTENDPASSWORD" ? "" : Evolve.Config.QXTENDPASSWORD
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "action",
                                                    'qcom:propertyValue': [""]
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "entity",
                                                    'qcom:propertyValue': "CFD01"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "email",
                                                    'qcom:propertyValue': [""]
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "emailLevel",
                                                    'qcom:propertyValue': [""]
                                                },
                                            ]
                                        },
                                        "dsItemMaster": {
                                            "itemMaster" : {
                                                "operation" : "A",
                                                "ptPart" : itemDetail[i].Item,
                                                "ptUm" : itemDetail[i].Uom,
                                                "ptDesc1" : itemDetail[i].EvolveProductConfigratorDetails_Desc1,
                                                "ptDesc2" : itemDetail[i].EvolveProductConfigratorDetails_Desc2,
                                                "ptProdLine" : itemDetail[i].ProductLine,
                                                "ptAdded" : today,
                                                "ptPartType" : itemDetail[i].ItemType,
                                                "ptStatus" : "ACTIVE",
                                                "ptGroup" : itemDetail[i].ItemGroup,
                                                "ptAbc" : "a",
                                                "ptLotSer" : "L",
                                                "ptSite" : itemDetail[i].Site,
                                                "ptLoc" : itemDetail[i].Location,
                                                "ptArticle" : "",
                                                "ptSnglLot" : "",
                                                "lCommCode" : "",
                                                "ptShipWt" : "",
                                                "ptShipWtUm" : "",
                                                "ptNetWt" : "",
                                                "ptNetWtUm" : "",
                                                "ptSize" : "",
                                                "ptSizeUm" : "",
                                                "allocpolmnemonic" : "Detail",
                                                "xferallocpolmnemonic" : "Drop",
                                                "pickpolicydisp" : "Issue",
                                                "issuepolicydisp" : "Direct",
                                                "ptTaxable" : "true",
                                                "ptTaxc" : "A18",
                                                "ptMs" : itemDetail[i].ptpMs,
                                                "ptPlanOrd" : itemDetail[i].PlannedOrder,
                                                "ptOrdPol" : itemDetail[i].OrderPolicy,
                                                "ptPoSite" : itemDetail[i].Site,
                                                "ptPmCode" : itemDetail[i].PmCode,
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        let xmldoc = Evolve.Xmlbuilder.create(xmlObj);
                        let xmlFileData = xmldoc.end({ pretty: true });
                        xmlFileData = xmlFileData.replace(`<?xml version="1.0"?>`, `<?xml version="1.0" encoding="UTF-8"?>`)
                        
                        let filepath = './public/XML/'+'itemMaster'+'_'+itemDetail[i].Item+'.xml';
                        Evolve.Fs.writeFile(filepath, xmlFileData, (err) => {
                            if (err)
                            console.log(err);
                            else {
                            obj.EvolveProductConfigratorDetails_Code = "ITEMMASTER";
                            obj.EvolveProductConfigratorDetails_Path = filepath;
                            console.log("File written successfully on path : ",filepath);
                            
                            }
                        });



                    

                    // 2nd //
                    let obj1 = {}
                        
                        let xmlObjForConfirmShippper = {
                            "soapenv:Envelope": {
                                "@xmlns": "urn:schemas-qad-com:xml-services",
                                "@xmlns:qcom": "urn:schemas-qad-com:xml-services:common",
                                "@xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
                                "@xmlns:wsa": "http://www.w3.org/2005/08/addressing",
                                "soapenv:Header": {
                                    "wsa:Action": "",
                                    "wsa:To": "urn:services-qad-com:QADERP",
                                    "wsa:MessageID": "urn:services-qad-com::QADERP",
                                    "wsa:ReferenceParameters": {
                                        "qcom:suppressResponseDetail": "true"
                                    },
                                    "wsa:ReplyTo": {
                                        "wsa:Address": "urn:services-qad-com:"
                                    }
                                },
                                "soapenv:Body": {
                                    "maintainItemSitePlanning": {
                                        "qcom:dsSessionContext": {
                                            'qcom:ttContext': [
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "domain",
                                                    'qcom:propertyValue': Evolve.Config.QXTENDDOMAIN
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "scopeTransaction",
                                                    'qcom:propertyValue': "true"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "version",
                                                    'qcom:propertyValue': "ERP3_5"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "mnemonicsRaw",
                                                    'qcom:propertyValue': "false"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "username",
                                                    'qcom:propertyValue': Evolve.Config.QXTENDUSERNAME
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "password",
                                                    'qcom:propertyValue': Evolve.Config.QXTENDPASSWORD == "QXTENDPASSWORD" ? "" : Evolve.Config.QXTENDPASSWORD
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "action",
                                                    'qcom:propertyValue': [""]
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "entity",
                                                    'qcom:propertyValue': "cfd01"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "email",
                                                    'qcom:propertyValue': [""]
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "emailLevel",
                                                    'qcom:propertyValue': [""]
                                                },
                                            ]
                                        },
                                        "dsItemSitePlanning": {
                                            "itemSitePlanning" : {
                                                "operation" : "A",
                                                "ptPart" : itemDetail[i].Item,
                                                "site" : itemDetail[i].Site,
                                                "ptpMs" : itemDetail[i].ptpMs,
                                                "ptpPlanOrd" : itemDetail[i].PlannedOrder,
                                                "ptpOrdPol" : itemDetail[i].OrderPolicy,
                                                "ptpOrdQty" : "",
                                                "ptpOrdPer" : "",
                                                "ptpSftyStk" : "",
                                                "ptpRop" : "",
                                                "ptpBuyer" : "",
                                                "ptpVend" : "",
                                                "ptpPoSite" : itemDetail[i].Site,
                                                "ptpPmCode" : itemDetail[i].PmCode,
                                                "btbType" : "NON-EMT",
                                                "ptpRouting" : "",
                                                "ptpBomCode" : "",
                                                "replenishmentMethod" : "Orders"
                                                
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        let xmldocForConfirmShippper = Evolve.Xmlbuilder.create(xmlObjForConfirmShippper);
                        // console.log(xmldoc.end({ pretty: true }));
                        let xmlFileDataForConfirmShippper = xmldocForConfirmShippper.end({ pretty: true });

                        xmlFileDataForConfirmShippper = xmlFileDataForConfirmShippper.replace(`<?xml version="1.0"?>`, `<?xml version="1.0" encoding="UTF-8"?>`)

                        let filepath1 = './public/XML/'+'itemSitePlanning'+'_'+itemDetail[i].Item+'.xml';

                        Evolve.Fs.writeFile(filepath1, xmlFileDataForConfirmShippper, (err) => {
                            if (err)
                            console.log(err);
                            else {
                                obj1.EvolveProductConfigrator_ID = productId;
                                obj1.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                                obj1.EvolveProductConfigratorDetails_Code = "ITEMSITEPLANNING";
                                obj1.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                                obj1.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                                obj1.EvolveProductConfigratorDetails_Path = filepath1;
                                console.log("File written successfully on path : ",filepath1);
                            
                            }
                        });


                    

                    // 3rd//
                    let obj2 = {}
                   
                        let xmlObjForConfirm = {
                            "soapenv:Envelope": {
                                "@xmlns": "urn:schemas-qad-com:xml-services",
                                "@xmlns:qcom": "urn:schemas-qad-com:xml-services:common",
                                "@xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
                                "@xmlns:wsa": "http://www.w3.org/2005/08/addressing",
                                "soapenv:Header": {
                                    "wsa:Action": "",
                                    "wsa:To": "urn:services-qad-com:QADERP",
                                    "wsa:MessageID": "urn:services-qad-com::QADERP",
                                    "wsa:ReferenceParameters": {
                                        "qcom:suppressResponseDetail": "true"
                                    },
                                    "wsa:ReplyTo": {
                                        "wsa:Address": "urn:services-qad-com:"
                                    }
                                },
                                "soapenv:Body": {
                                    "maintainItemSiteInventoryData": {
                                        "qcom:dsSessionContext": {
                                            'qcom:ttContext': [
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "domain",
                                                    'qcom:propertyValue': Evolve.Config.QXTENDDOMAIN
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "scopeTransaction",
                                                    'qcom:propertyValue': "true"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "version",
                                                    'qcom:propertyValue': "ERP3_2"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "mnemonicsRaw",
                                                    'qcom:propertyValue': "false"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "username",
                                                    'qcom:propertyValue': Evolve.Config.QXTENDUSERNAME
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "password",
                                                    'qcom:propertyValue': Evolve.Config.QXTENDPASSWORD == "QXTENDPASSWORD" ? "" : Evolve.Config.QXTENDPASSWORD
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "action",
                                                    'qcom:propertyValue': [""]
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "entity",
                                                    'qcom:propertyValue': "CFD01"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "email",
                                                    'qcom:propertyValue': [""]
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "emailLevel",
                                                    'qcom:propertyValue': [""]
                                                },
                                            ]
                                        },
                                        "dsItemSiteInventoryData": {
                                            "itemSiteInventoryData" : {
                                                "operation" : "A",
                                                "ptPart" : itemDetail[i].Item,
                                                "site" : itemDetail[i].Site,
                                                "ptiAbc" : "a",
                                                "ptiLotSer" : "L",
                                                "ptiLoc" : itemDetail[i].Location
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        let xmldocForConfirm = Evolve.Xmlbuilder.create(xmlObjForConfirm);
                        // console.log(xmldoc.end({ pretty: true }));
                        let xmldocForConfirms = xmldocForConfirm.end({ pretty: true });

                        xmldocForConfirms = xmldocForConfirms.replace(`<?xml version="1.0"?>`, `<?xml version="1.0" encoding="UTF-8"?>`)

                        let filepath2 = './public/XML/'+'itemSiteInventory'+'_'+itemDetail[i].Item+'.xml';
                        Evolve.Fs.writeFile(filepath2, xmldocForConfirms, (err) => {
                            if (err)
                            console.log(err);
                            else {
                                obj2.EvolveProductConfigrator_ID = productId;
                                obj2.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                                obj2.EvolveProductConfigratorDetails_Code = "ITEMSITEINVENTORY";
                                obj2.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                                obj2.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                                obj2.EvolveProductConfigratorDetails_Path = filepath2;
                                console.log("File written successfully on path : ",filepath2);
                            
                            }
                        });

                    if (er == false) {
                    
                        let config = {
                            headers: {
                                'Accept-Encoding': 'gzip, deflate',
                                'Content-Type': 'text/xml;charset=UTF-8',
                                'SOAPAction': "",
                                'Host': Evolve.Config.QXTENHOST,
                                'Connection': 'Keep - Alive',
                                'User-Agent': 'Apache - HttpClient / 4.1.1(java 1.5)'
                                //'Content-Length': xmldoc.length 
                            }
                        }
                        let responce = await Evolve.Axios.post(Evolve.Config.QXTENDURL, xmlFileData, config).catch((e) => {
                            console.log("Error While Fire Qextend::::::::::::::" , e.message);
                            errorMessage = e.message
                            obj.EvolveProductConfigrator_ID = productId;
                            obj.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                            obj.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                            obj.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                            obj.EvolveProductConfigratorDetails_Code = "ITEMMASTER";
                            obj.EvolveProductConfigratorDetails_Status = false;
                            obj.EvolveProductConfigratorDetails_Message = errorMessage;
                            obj.EvolveProductConfigratorDetails_Path = filepath;
                            error = true;
                            er = true;
                        });
                        if(responce) {
                        
                            Evolve.Xml2JS.parseString(responce.data, async function (err, xmlFileDataNew) {
                                if (err) {
                                    
                                    obj.EvolveProductConfigrator_ID = productId;
                                    obj.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                                    obj.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                                    obj.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                                    obj.EvolveProductConfigratorDetails_Code = "ITEMMASTER";
                                    obj.EvolveProductConfigratorDetails_Status = false;
                                    obj.EvolveProductConfigratorDetails_Message = errorMessage;
                                    obj.EvolveProductConfigratorDetails_Path = filepath;
                                    error = true;
                                    er = true;
                                    console.log("issue in xml formate")
                                } else {
                                
                                    try {


                                        if (xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:maintainItemMasterResponse'][0]['ns1:result'][0] != 'error') {
                                            
                                            obj.EvolveProductConfigrator_ID = productId;
                                            obj.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                                            obj.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                                            obj.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                                            obj.EvolveProductConfigratorDetails_Code = "ITEMMASTER";
                                            obj.EvolveProductConfigratorDetails_Status = true;
                                            obj.EvolveProductConfigratorDetails_Message = null;
                                            obj.EvolveProductConfigratorDetails_Path = filepath;
                                                            
                                        } else {
                                            console.log("item Not done>>>>>>>>>",i);
                                            errorMessage = "Error While Update Data Via Qxtenxd In File ItemMaster";
                                            console.log("itemMaster:::::",xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:maintainItemMasterResponse'][0]['ns1:result'][0]);
                                            
                                            obj.EvolveProductConfigrator_ID = productId;
                                            obj.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                                            obj.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                                            obj.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                                            obj.EvolveProductConfigratorDetails_Code = "ITEMMASTER";
                                            obj.EvolveProductConfigratorDetails_Status = false;
                                            obj.EvolveProductConfigratorDetails_Message = errorMessage;
                                            obj.EvolveProductConfigratorDetails_Path = filepath;
                                            error = true;
                                            er = true;
                                        }
                                    } catch (error) {
                                        console.log("error.message",error.message);
                                    
                                        errorMessage = "Error While Update Data Via Qxtenxd" + error.message;
                                        
                                        obj.EvolveProductConfigrator_ID = productId;
                                        obj.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                                        obj.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                                        obj.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                                        obj.EvolveProductConfigratorDetails_Code = "ITEMMASTER";
                                        obj.EvolveProductConfigratorDetails_Status = false;
                                        obj.EvolveProductConfigratorDetails_Message = errorMessage;
                                        obj.EvolveProductConfigratorDetails_Path = filepath;
                                        error = true;
                                        er = true;
                                    }

                                }
                            });
                        }else{
                            console.log("error.message",error.message);
                        
                            errorMessage = "Error While Update Data Via Qxtenxd" + error.message;
                        
                            obj.EvolveProductConfigrator_ID = productId;
                            obj.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                            obj.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                            obj.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                            obj.EvolveProductConfigratorDetails_Code = "ITEMMASTER";
                            obj.EvolveProductConfigratorDetails_Status = false;
                            obj.EvolveProductConfigratorDetails_Message = errorMessage;
                            obj.EvolveProductConfigratorDetails_Path = filepath;
                            error = true;
                            er = true;
                        }
                        obj.EvolveProductConfigratorDetails_Gsm = itemDetail[i].gsm;
                    }
                                            
                    if(er == false){
                       
                        let config = {
                            headers: {
                                'Accept-Encoding': 'gzip, deflate',
                                'Content-Type': 'text/xml;charset=UTF-8',
                                'SOAPAction': "",
                                'Host': Evolve.Config.QXTENHOST,
                                'Connection': 'Keep - Alive',
                                'User-Agent': 'Apache - HttpClient / 4.1.1(java 1.5)'
                                //'Content-Length': xmldoc.length 
                            }
                        }

                        let responcexmldocForConfirmShippper = await Evolve.Axios.post(Evolve.Config.QXTENDURL, xmlFileDataForConfirmShippper, config).catch((e) => {
                            console.log("Error While Fire Qextend::::::::::::::" , e.message);
                            
                            errorMessage = e.message
                            obj1.EvolveProductConfigrator_ID = productId;
                            obj1.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                            obj1.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                            obj1.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                            obj1.EvolveProductConfigratorDetails_Code = "ITEMSITEPLANNING";
                            obj1.EvolveProductConfigratorDetails_Status = false;
                            obj1.EvolveProductConfigratorDetails_Message = errorMessage;
                            obj1.EvolveProductConfigratorDetails_Path = filepath1;
                            error = true;
                            er = true;
                        });

                        if(responcexmldocForConfirmShippper) {
                            Evolve.Xml2JS.parseString(responcexmldocForConfirmShippper.data, async function (err, xmlFileDataNew) {
                                if (err) {
                                    errorMessage = err.message;
                                    obj1.EvolveProductConfigrator_ID = productId;
                                    obj1.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                                    obj1.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                                    obj1.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                                    obj1.EvolveProductConfigratorDetails_Code = "ITEMSITEPLANNING";
                                    obj1.EvolveProductConfigratorDetails_Status = false;
                                    obj1.EvolveProductConfigratorDetails_Message = errorMessage;
                                    obj1.EvolveProductConfigratorDetails_Path = filepath;
                                    error = true;
                                    er = true;
                                } else {
                                
                                    try {

                                        if (xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:maintainItemSitePlanningResponse'][0]['ns1:result'][0] != 'error') {
                                        
                                            obj1.EvolveProductConfigrator_ID = productId;
                                            obj1.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                                            obj1.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                                            obj1.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                                            obj1.EvolveProductConfigratorDetails_Code = "ITEMSITEPLANNING";
                                            obj1.EvolveProductConfigratorDetails_Status = true;
                                            obj1.EvolveProductConfigratorDetails_Message = null;
                                            obj1.EvolveProductConfigratorDetails_Path = filepath;

                                        }else {

                                            errorMessage = "Error While Update Data Via Qxtenxd";
                                            
                                            obj1.EvolveProductConfigrator_ID = productId;
                                            obj1.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                                            obj1.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                                            obj1.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                                            obj1.EvolveProductConfigratorDetails_Code = "ITEMSITEPLANNING";
                                            obj1.EvolveProductConfigratorDetails_Status = false;
                                            obj1.EvolveProductConfigratorDetails_Message = errorMessage;
                                            obj1.EvolveProductConfigratorDetails_Path = filepath;
                                            error = true;
                                            er = true;
                                        }
                                    } catch (error) {
                                        console.log("error.message",error.message);
                                        errorMessage = "Error While Update Data Via Qxtenxd" + error.message;
                                    
                                        obj1.EvolveProductConfigrator_ID = productId;
                                        obj1.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                                        obj1.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                                        obj1.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                                        obj1.EvolveProductConfigratorDetails_Code = "ITEMSITEPLANNING";
                                        obj1.EvolveProductConfigratorDetails_Status = false;
                                        obj1.EvolveProductConfigratorDetails_Message = errorMessage;
                                        obj1.EvolveProductConfigratorDetails_Path = filepath;
                                        error = true;
                                        er = true;
                                    }
                                };
                            });


                        }else {
                            console.log("error.message",error.message);
                            
                            errorMessage = "Error While Update Data Via Qxtenxd In File ITEMSITEPLANNING" + error.message;
                            
                            obj1.EvolveProductConfigrator_ID = productId;
                            obj1.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                            obj1.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                            obj1.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                            obj1.EvolveProductConfigratorDetails_Code = "ITEMSITEPLANNING";
                            obj1.EvolveProductConfigratorDetails_Status = false;
                            obj1.EvolveProductConfigratorDetails_Message = errorMessage;
                            obj1.EvolveProductConfigratorDetails_Path = filepath;
                            error = true;
                            er = true;
                        }
                        obj1.EvolveProductConfigratorDetails_Gsm = itemDetail[i].gsm;
                    }

                    if(er == false){
                        
                    let config = {
                        headers: {
                            'Accept-Encoding': 'gzip, deflate',
                            'Content-Type': 'text/xml;charset=UTF-8',
                            'SOAPAction': "",
                            'Host': Evolve.Config.QXTENHOST,
                            'Connection': 'Keep - Alive',
                            'User-Agent': 'Apache - HttpClient / 4.1.1(java 1.5)'
                            //'Content-Length': xmldoc.length 
                        }
                    }

                    let responcexmldocForConfirmShippper = await Evolve.Axios.post(Evolve.Config.QXTENDURL, xmldocForConfirms, config).catch((e) => {
                        console.log("Error While Fire Qextend::::::::::::::" , e.message);
                        
                        errorMessage = e.message
                    
                        obj2.EvolveProductConfigrator_ID = productId;
                        obj2.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                        obj2.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                        obj2.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                        obj2.EvolveProductConfigratorDetails_Code = "ITEMSITEINVENTORY";
                        obj2.EvolveProductConfigratorDetails_Status = false;
                        obj2.EvolveProductConfigratorDetails_Message = errorMessage;
                        obj2.EvolveProductConfigratorDetails_Path = filepath2;
                        error = true;
                        er = true;
                    });

                    if(responcexmldocForConfirmShippper) {
                        Evolve.Xml2JS.parseString(responcexmldocForConfirmShippper.data, async function (err, xmlFileDataNew) {
                            if (err) {
                                errorMessage = err.message;
                                obj2.EvolveProductConfigrator_ID = productId;
                                obj2.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                                obj2.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                                obj2.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                                obj2.EvolveProductConfigratorDetails_Code = "ITEMSITEINVENTORY";
                                obj2.EvolveProductConfigratorDetails_Status = false;
                                obj2.EvolveProductConfigratorDetails_Message = errorMessage;
                                obj2.EvolveProductConfigratorDetails_Path = filepath;
                                error = true;
                                er = true;
                                console.log("issue in xml formate")
                            } else {

                                try {

                                    if (xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:maintainItemSiteInventoryDataResponse'][0]['ns1:result'][0] != 'error') {
                                        
                                        obj2.EvolveProductConfigrator_ID = productId;
                                        obj2.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                                        obj2.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                                        obj2.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                                        obj2.EvolveProductConfigratorDetails_Code = "ITEMSITEINVENTORY";
                                        obj2.EvolveProductConfigratorDetails_Status = true;
                                        obj2.EvolveProductConfigratorDetails_Message = null;
                                        obj2.EvolveProductConfigratorDetails_Path = filepath;
                                    }else {
                                    
                                        errorMessage = "Error While Update Data Via Qxtenxd In File ITEMSITEINVENTORY";
                                        
                                        obj2.EvolveProductConfigrator_ID = productId;
                                        obj2.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                                        obj2.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                                        obj2.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                                        obj2.EvolveProductConfigratorDetails_Code = "ITEMSITEINVENTORY";
                                        obj2.EvolveProductConfigratorDetails_Status = false;
                                        obj2.EvolveProductConfigratorDetails_Message = errorMessage;
                                        obj2.EvolveProductConfigratorDetails_Path = filepath;
                                        error = true;
                                        er = true;
                                    }
                                } catch (error) {
                                    console.log("error.message",error.message);
                                    
                                    errorMessage = "Error While Update Data Via Qxtenxd In File ITEMSITEINVENTORY" + error.message;
                                    
                                    obj2.EvolveProductConfigrator_ID = productId;
                                    obj2.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                                    obj2.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                                    obj2.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                                    obj2.EvolveProductConfigratorDetails_Code = "ITEMSITEINVENTORY";
                                    obj2.EvolveProductConfigratorDetails_Status = false;
                                    obj2.EvolveProductConfigratorDetails_Message = errorMessage;
                                    obj2.EvolveProductConfigratorDetails_Path = filepath;
                                    error = true;
                                    er = true;
                                }
                            };
                        });


                    }else {
                        
                        errorMessage = "Error While Update Data Via Qxtenxd In File ITEMSITEINVENTORY" + error.message;
                        
                        obj2.EvolveProductConfigrator_ID = productId;
                        obj2.EvolveProductConfigratorDetails_Item = itemDetail[i].Item;
                        obj2.EvolveProductConfigratorDetails_Desc1 = itemDetail[i].EvolveProductConfigratorDetails_Desc1;
                        obj2.EvolveProductConfigratorDetails_Desc2 = itemDetail[i].EvolveProductConfigratorDetails_Desc2;
                        obj2.EvolveProductConfigratorDetails_Code = "ITEMSITEINVENTORY";
                        obj2.EvolveProductConfigratorDetails_Status = false;
                        obj2.EvolveProductConfigratorDetails_Message = errorMessage;
                        obj2.EvolveProductConfigratorDetails_Path = filepath;
                        error = true;
                        er = true;
                    }
                    obj2.EvolveProductConfigratorDetails_Gsm = itemDetail[i].gsm;
                    
                    }
                    configratorDetails.push(obj)
                    configratorDetails.push(obj1)
                    configratorDetails.push(obj2)
                    
                }

                console.log("configratorDetails>>>>>>>>.",configratorDetails);
                // Add ProductConfigrator Details

                for (let i = 0; i < configratorDetails.length; i++) {
                   
                        let result = await Evolve.App.Services.Evolve.productConfigrator.SrvOption.createProductConfigratorDetails(configratorDetails[i], req.body.EvolveUser_ID);
                        if (result instanceof Error) {
                            errorMessage = "Error on Create productConfigrator";
                        
                        }
                    
                }
                
                if(error == false) {
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: `Item ${itemDetail[0].Item} Created Successfully!!`,
                            result:{EvolveProductConfigrator_ID:productId}
                        };
                        res.send(obj);  
                }else {
                    
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: errorMessage,
                        result: {EvolveProductConfigrator_ID:productId}
                    };
                    res.send(obj);
                }

            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get inventory list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get inventory list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getConfigratorDetailList: async function (req, res) {
        try {

            let List = await Evolve.App.Services.Evolve.productConfigrator.SrvOption.getConfigratorDetailList(req.body);
           
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Configrator Details List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Configrator Details List",
                    result:  List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Configrator Details list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Configrator Details list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    checkProductExistOrNot: async function (req, res) {
        try {

            let List = await Evolve.App.Services.Evolve.productConfigrator.SrvOption.checkProductExistOrNot(req.body);
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Check Product Allready Available!!",
                    result: List.message
                };
                res.send(obj);
            }else if(List.rowsAffected == 0){
                let seq = 0;
                let preseq = (parseInt(Evolve.Generator.keys.ITEM.numbers) + 1).toString();
            let fgItemDesc1 = await  Evolve.App.Controllers.Evolve.productConfigrator.ConOption.createDesc1( preseq+'-'+seq, req.body);
            let fgItemDesc2 = await Evolve.App.Controllers.Evolve.productConfigrator.ConOption.createDesc2(preseq+'-'+seq , req.body);
                // let preseq = Evolve.Generator.generate("ITEM")
                if (preseq == undefined || preseq.length == 0) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error while assign Item Serial Number !",
                        result: null
                    };
                    res.send(obj);
                    Evolve.Log.error(" EERR#### : Error while assign Item Serial Number ")

                } else {
                    console.log("req.body",req.body);
                    // preseq = (preseq.toString()).replace(/ -/g, '')
                    // preseq = preseq.split(" ").join("");
                    let arr = [
                        {'Formulation':"JUMBO ROLL","FormulationCode":"","Required":true},
                        {'Formulation':"Top Coat","FormulationCode":"","Required":true},
                        {'Formulation':"Foam Coat","FormulationCode":"","Required":true},
                        {'Formulation':"Adhesive Coat","FormulationCode":"","Required":true}
                        ]
                        for(let i = 0;i<arr.length;i++){
                            
                            arr[i].FormulationCode = preseq + '-'+ (parseInt(seq)+i+1);
                            let productDesc1 = await  Evolve.App.Controllers.Evolve.productConfigrator.ConOption.createDesc1(arr[i].FormulationCode , req.body);
                            let productDesc2 = await Evolve.App.Controllers.Evolve.productConfigrator.ConOption.createDesc2(arr[i].FormulationCode , req.body);
                            console.log("productDesc1",productDesc1);
                            console.log("productDesc2",productDesc2);
                            arr[i].productDesc1 = productDesc1;
                            arr[i].productDesc2 = productDesc2;
                        }
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Please Configure Remaining Details For Product!!",
                            result:  {FormulationList:arr, fgItemDetails : {productCode:preseq+'-'+seq , fgItemDesc1 : fgItemDesc1 , fgItemDesc2 : fgItemDesc2}}
                        };
                        res.send(obj);
                }
                
               
            }else if(List.rowsAffected >= 1) {
                let obj = {
                    statusCode: 400,
                    status: "success",
                    message: "Item Allready Exists With The Given Combination! Item Code :" + List.recordset[0].EvolveProductConfigrator_Code ,
                    result:  null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Check Configrator " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Check Configrator " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    createDesc1: async function (itemType,prodData) {
        return new Promise(async function (resolve, reject) {
            try {

                let code = itemType.split('-')[1];
                let desc1 = prodData.EvolveProductType_Abbr + ' ' + prodData.EvolveProduct_Abbr + ' ' + prodData.EvolveProductColour_Abbr
                if(code == 1){
                    desc1 = desc1 + ' -S'
                }else if(code == 2){
                    desc1 = desc1 + ' -T'
                }else if(code == 3){
                    desc1 = desc1 + ' -M'
                }else if(code == 4){
                    desc1 = desc1 + ' -A'
                }
                resolve(desc1);
               
            } catch (error) {
                resolve('');
            }
    })
        
    },

    createDesc2: async function (itemType,prodData) {

        return new Promise(async function (resolve, reject) {
            try {
                let code = itemType.split('-')[1];
                let desc2 = prodData.EvolveProductGrade_Abbr + ' ' + prodData.EvolveProductDesign_Width + 'X' + prodData.EvolveProductConfigrator_Thikness
                if(code == 1){
                    desc2 = desc2 + ' -S'
                }else if(code == 2){
                    desc2 = desc2 + ' -T'
                }else if(code == 3){
                    desc2 = desc2 + ' -M'
                }else if(code == 4){
                    desc2 = desc2 + ' -A'
                }
                resolve(desc2);
               
            } catch (error) {
                resolve('');
            }
    })
        
    },

    updateConfigratorDetailAndReque:  async function (req, res) {
        try {
            console.log("updateConfigratorDetailAndReque",req.body);
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let ItemMessage = "";
            let errorMessage = "";
            let ItemStatus = "";
            let error = true;
            let xmldata = await Evolve.App.Controllers.Evolve.productConfigrator.ConOption.readFile(req.body.EvolveProductConfigratorDetails_Path)
            
            if(xmldata){
                let config = {
                    headers: {
                        'Accept-Encoding': 'gzip, deflate',
                        'Content-Type': 'text/xml;charset=UTF-8',
                        'SOAPAction': "",
                        'Host': Evolve.Config.QXTENHOST,
                        'Connection': 'Keep - Alive',
                        'User-Agent': 'Apache - HttpClient / 4.1.1(java 1.5)'
                    }
                }
                let responce = await Evolve.Axios.post(Evolve.Config.QXTENDURL, xmldata, config).catch((e) => {
                    console.log("Error While Fire Qextend::::::::::::::" , e.message);
                    ItemMessage = err.message
                    ItemStatus = false;
                });
                if(responce) {
                
                    Evolve.Xml2JS.parseString(responce.data, async function (err, xmlFileDataNew) {
                        if (err) {
                            ItemMessage = err.message
                            ItemStatus = false;
                            console.log("issue in xml formate")
                        } else {
                        
                            try {

                                if(req.body.EvolveProductConfigratorDetails_Code == 'ITEMMASTER'){
                                    if (xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:maintainItemMasterResponse'][0]['ns1:result'][0] != 'error') {
                                        console.log("done");
                                        ItemMessage = ""
                                        ItemStatus = true;
                                        error = false;
                                                        
                                    } else {
                                        
                                        errorMessage = "Error While Update Data Via Qxtenxd In File ItemMaster";
                                        console.log("itemMaster:::::",xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:maintainItemMasterResponse'][0]['ns1:result'][0]);
                                        ItemMessage = errorMessage
                                        ItemStatus = false;
                                    }
                                }
                                else if(req.body.EvolveProductConfigratorDetails_Code == 'ITEMSITEPLANNING') {
                                    if (xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:maintainItemSitePlanningResponse'][0]['ns1:result'][0] != 'error') {
                                        console.log("done");
                                        ItemMessage = ""
                                        ItemStatus = true;
                                        error = false;
                                                        
                                    } else {
                                        
                                        errorMessage = "Error While Update Data Via Qxtenxd In File ItemMaster";
                                        console.log("itemMaster:::::",xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:maintainItemSitePlanningResponse'][0]['ns1:result'][0]);
                                        ItemMessage = errorMessage
                                        ItemStatus = false;
                                    }
                                }else if(req.body.EvolveProductConfigratorDetails_Code == 'ITEMSITEINVENTORY') {
                                    if (xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:maintainItemSiteInventoryDataResponse'][0]['ns1:result'][0] != 'error') {
                                        console.log("done");
                                        ItemMessage = ""
                                        ItemStatus = true;
                                        error = false;
                                                        
                                    } else {
                                        
                                        errorMessage = "Error While Update Data Via Qxtenxd In File ItemMaster";
                                        console.log("itemMaster:::::",xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:maintainItemSiteInventoryDataResponse'][0]['ns1:result'][0]);
                                        ItemMessage = errorMessage
                                        ItemStatus = false;
                                    }
                                }
                            } catch (error) {
                                console.log("error.message",error.message);
                                errorMessage = "Error While Update Data Via Qxtenxd" + error.message;
                                ItemMessage = errorMessage
                                ItemStatus = false;

                            }

                        }
                    });
                }else{
                    console.log("error.message",error.message);
                    ItemMessage =error.message
                    ItemStatus = false;
                }
            }
            req.body.EvolveProductConfigratorDetails_Message = ItemMessage;
            req.body.EvolveProductConfigratorDetails_Status = ItemStatus;
           
            let List = await Evolve.App.Services.Evolve.productConfigrator.SrvOption.updateProductConfigratorDetails(req.body);
            if(List instanceof Error){
                error = true;
            }else{}
            
            if (error == true) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Update Configrator Detail!",
                    result: List.message
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Configrator Detail Updated Success",
                    result:  null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Update Configrator Detail" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Update Configrator Detail" + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    readFile : async function (path) {
        return new Promise(async function (resolve, reject) {
            await Evolve.Fs.readFile(path, async(err, data) => {
                if(err){
                    resolve(new Error ("Error While Read File!!"))
                }else{
                    resolve(data)
                }
        })
    })
        
    }

}