const Evolve = require("../../../Boot/Evolve");

module.exports = {
  smartFactorySidebarMenuList: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let sidebarMenuList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.smartFactorySidebarMenuList(
        req.body
      );
      let menuList = [];
      for (let i = 0; i < sidebarMenuList.recordsets[0].length; i++) {
        // Find Child Link
        let childLink = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getsmartFactorySidebarMenuChildList(
          sidebarMenuList.recordsets[0][i].EvolveMenu_Id
        );
        let childs = [];
        let submenu = [];
        for (let j = 0; j < childLink.recordset.length; j++) {
          // console.log(sidebarMenuList.recordsets[0][i].EvolveMenu_Url);
          if (sidebarMenuList.recordsets[0][i].EvolveMenu_Url == null) {
            submenu.push({
              id: j + "" + sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
              title: childLink.recordset[j].EvolveMenu_Name,
              page: childLink.recordset[j].EvolveMenu_Url,
              icon: childLink.recordset[j].EvolveMenu_Icon
            });
          } else {
            childs.push(childLink.recordset[j].EvolveMenu_Url);
          }
        }
        // console.log(submenu);
        // if(i==0){
        //   menuList.push({
        //     id: sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
        //     title: sidebarMenuList.recordsets[0][i].EvolveMenu_Name,
        //     icon:sidebarMenuList.recordsets[0][i].EvolveMenu_Icon,
        //     page: '',
        //     childs : childs,
        //     isOpen: false,
        //     level: 0,
        //     submenu: [
        //       {
        //         id: 110,
        //         title: "Dashboard 1",
        //         page: ""
        //       },
        //       {
        //         id: 120,
        //         title: "Dashboard 2",
        //         page: ""
        //       }
        //     ]
        //   });
        // }else{
        menuList.push({
          id: sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
          title: sidebarMenuList.recordsets[0][i].EvolveMenu_Name,
          icon: sidebarMenuList.recordsets[0][i].EvolveMenu_Icon,
          page: sidebarMenuList.recordsets[0][i].EvolveMenu_Url,
          childs: childs,
          submenu: submenu
        });
        // }
      }

      let testing = [
        {
          id: 6,
          title: "Multi level Shiv",
          page: "",
          icon: "mdi mdi-format-line-weight",
          isOpen: false,
          level: 0,
          childs: [],
          submenu: [
            {
              id: 61,
              title: "Submenu 1",
              page: ""
            }
            // {
            //   id: 62,
            //   title: "Submenu 2",
            //   page: "",
            //   isOpen: false,
            //   level: 1,
            //   submenu: [
            //     {
            //       id: 7621,
            //       title: "Submenu 2.1",
            //       page: ""
            //     },
            //     {
            //       id: 622,
            //       title: "Submenu 2.2",
            //       page: "",
            //       isOpen: false,
            //       level: 2,
            //       submenu: [
            //         {
            //           id: 76221,
            //           title: "Submenu 2.2.1",
            //           page: ""
            //         },
            //         {
            //           id: 66222,
            //           title: "Submenu 2.2.2",
            //           page: ""
            //         },
            //         {
            //           id: 62623,
            //           title: "Submenu 2.2.3",
            //           page: ""
            //         }
            //       ]
            //     },
            //     {
            //       id: 6523,
            //       title: "Submenu 2.3",
            //       page: ""
            //     },
            //     {
            //       id: 6244,
            //       title: "Submenu 2.4",
            //       page: ""
            //     }
            //   ]
            // },
            // {
            //   id: 63,
            //   title: "Submenu 3",
            //   page: ""
            // },
            // {
            //   id: 64,
            //   title: "Submenu 4",
            //   page: "",
            //   isOpen: false,
            //   level: 1,
            //   submenu: [
            //     {
            //       id: 641,
            //       title: "Submenu 4.1",
            //       page: ""
            //     },
            //     {
            //       id: 642,
            //       title: "Submenu 4.2",
            //       page: ""
            //     },
            //     {
            //       id: 643,
            //       title: "Submenu 4.3",
            //       page: ""
            //     }
            //   ]
            // }
          ]
        }
      ];

      let obj = {
        statusCode: 200,
        status: "success",
        message: "Menu List",
        result: menuList
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0765: Error in smart Factory Sidebar Menu List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0765: Error in smart Factory Sidebar Menu List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  csvPlanUpload: async function (req, res) {
    try {
      // console.log("req.File >>>>", req.files.csvFile)
      req.body.EvolveUser_ID = req.EvolveUser_ID;

      if (req.files.csvFile) {
        let csv = req.files.csvFile;
        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(csv.name)[1];
        let date = new Date();
        let fileName =
          date.getFullYear() +
          "_" +
          date.getMonth() +
          "_" +
          date.getDate() +
          "_" +
          date.getHours() +
          "_" +
          date.getMinutes() +
          "_" +
          date.getSeconds() +
          "." +
          ext;
        // let fileName = date.getTime()+'.'+ext;
        // Use the mv() method to place the file somewhere on your server
        csv.mv("./public/csv/" + fileName, async function (error) {
          if (error) {
            // console.log("Error in File Upload ::", " "+error.message);
            let obj = {
              statusCode: 400,
              status: "fail",
              message: " "+error.message,
              result: null
            };
            res.send(obj);
          } else {
            let planeArray = await Evolve.Csv().fromFile(
              "./public/csv/" + fileName
            );
            let planCode_errorStatus = false;
            let planCode_error = [];
            let planCode_error_tmp = [];
            for (let i = 0; i < planeArray.length; i++) {
              let check_planCode = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.check_planCode(
                planeArray[i].Plan_Code
              );
              if (check_planCode.recordset[0].count >= 1) {
                if (!planCode_error_tmp.includes(planeArray[i].Plan_Code)) {
                  planCode_error.push(
                    "Plan Code " + planeArray[i].Plan_Code + " Already Exist!"
                  );
                  planCode_error_tmp.push(planeArray[i].Plan_Code);
                }
                planCode_errorStatus = true;
              }
            }
            if (planCode_errorStatus == true) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: planCode_error,
                result: null
              };
              res.send(obj);
            } else {
              let machineCode_errorStatus = false;
              let macgineCode_error = [];
              let macgineCode_error_tmp = [];
              for (let i = 0; i < planeArray.length; i++) {
                let check_machineCode = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.check_machine(
                  planeArray[i].Machine_Code
                );
                if (check_machineCode.recordset[0].count == 0) {
                  if (
                    !macgineCode_error_tmp.includes(planeArray[i].Machine_Code)
                  ) {
                    macgineCode_error.push(
                      "Machine Code " +
                      planeArray[i].Machine_Code +
                      " Not Found !"
                    );
                    macgineCode_error_tmp.push(planeArray[i].Machine_Code);
                  }
                  machineCode_errorStatus = true;
                }
              }
              if (machineCode_errorStatus == true) {
                let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: macgineCode_error,
                  result: null
                };
                res.send(obj);
              } else {
                let shift_errorStatus = false;
                let shift_error = [];
                let shift_error_tmp = [];
                for (let i = 0; i < planeArray.length; i++) {
                  let check_shift = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.check_shift(
                    planeArray[i].Plan_Shift
                  );
                  if (check_shift.recordset[0].count == 0) {
                    if (!shift_error_tmp.includes(planeArray[i].Plan_Shift)) {
                      shift_error.push(
                        "Shift " + planeArray[i].Plan_Shift + " Not Found !"
                      );
                      shift_error_tmp.push(planeArray[i].Plan_Shift);
                    }
                    shift_errorStatus = true;
                  }
                }
                if (shift_errorStatus == true) {
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: shift_error,
                    result: null
                  };
                  res.send(obj);
                } else {
                  let item_errorStatus = false;
                  let item_error = [];
                  let item_error_tmp = [];
                  for (let i = 0; i < planeArray.length; i++) {
                    let check_item = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.check_item(
                      planeArray[i].Item_Code
                    );
                    if (check_item.recordset[0].count == 0) {
                      if (!item_error_tmp.includes(planeArray[i].Item_Code)) {
                        item_error.push(
                          "Item " + planeArray[i].Item_Code + " Not Found !"
                        );
                        item_error_tmp.push(planeArray[i].Item_Code);
                      }
                      item_errorStatus = true;
                    }
                  }
                  if (item_errorStatus == true) {
                    let obj = {
                      statusCode: 400,
                      status: "fail",
                      message: item_error,
                      result: null
                    };
                    res.send(obj);
                  } else {
                    let bom_errorStatus = false;
                    let bom_error = [];
                    let bom_error_tmp = [];
                    for (let i = 0; i < planeArray.length; i++) {
                      let check_bom = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.check_bom(
                        planeArray[i].Item_Code
                      );
                      if (check_bom.recordset[0].count == 0) {
                        if (!bom_error_tmp.includes(planeArray[i].Item_Code)) {
                          bom_error.push(
                            "BOM Not Found For " +
                            planeArray[i].Item_Code +
                            " !"
                          ); // BOM Not Found For
                          bom_error_tmp.push(planeArray[i].Item_Code);
                        }
                        bom_errorStatus = true;
                      }
                    }
                    if (bom_errorStatus == true) {
                      let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: bom_error,
                        result: null
                      };
                      res.send(obj);
                    } else {
                      let section_errorStatus = false;
                      let section_error = [];
                      let section_error_tmp = [];
                      for (let i = 0; i < planeArray.length; i++) {
                        let check_section = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.check_section(
                          planeArray[i].Plan_Section
                        );
                        if (check_section.recordset[0].count == 0) {
                          if (
                            !section_error_tmp.includes(
                              planeArray[i].Plan_Section
                            )
                          ) {
                            section_error.push(
                              "Section " +
                              planeArray[i].Plan_Section +
                              " Not Found !"
                            );
                            section_error_tmp.push(planeArray[i].Plan_Section);
                          }
                          section_errorStatus = true;
                        }
                      }
                      if (section_errorStatus == true) {
                        let obj = {
                          statusCode: 400,
                          status: "fail",
                          message: section_error,
                          result: null
                        };
                        res.send(obj);
                      } else {
                        let planeError = false;
                        let EvolveProdPlan_ID;
                        let planeDetailsError = false;
                        let planeDetailsErrorMessage = [];
                        let saveplan = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.savePlan(
                          planeArray[0],
                          req.body.EvolveUser_ID,
                          fileName
                        );
                        if (
                          saveplan instanceof Error ||
                          saveplan.rowsAffected < 1
                        ) {
                          planeError = true;
                          let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: saveplan.message,
                            result: null
                          };
                          res.send(obj);
                        } else {
                          EvolveProdPlan_ID = saveplan.recordset[0].inserted_id;
                        }
                        if (planeError == false) {
                          // Get Plan Details
                          for (let i = 0; i < planeArray.length; i++) {
                            let saveplanDetails = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.savePlanDetails(
                              planeArray[i],
                              EvolveProdPlan_ID,
                              req.body.EvolveUser_ID
                            );
                            if (
                              saveplanDetails instanceof Error ||
                              saveplanDetails.rowsAffected < 1
                            ) {
                              planeDetailsError = true;
                              planeDetailsErrorMessage =
                                saveplanDetails.message;
                            }
                          }

                          if (planeDetailsError == true) {
                            let obj = {
                              statusCode: 400,
                              status: "fail",
                              message: planeDetailsErrorMessage,
                              result: null
                            };
                            res.send(obj);
                          }
                        }
                        if (planeError == false) {
                          let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Csv upload Successfully",
                            result: []
                          };
                          res.send(obj);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        });
      }
    } catch (error) {
      Evolve.Log.error(" EERR0766: Error in CSV plan upload "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0766: Error in CSV plan upload "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getProductionPlanList: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let search = req.query.search.value;
      // console.log("------------------------------------------------------------")
      // console.log(" Req    : ",req.query);
      // console.log("------------------------------------------------------------")
      let searchData = {
        startDate: req.query.startDate,
        endDate: req.query.endDate
      };
      let proPlanCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getProductionPlanListCountList(
        searchData
      );
      let proPlan = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getProductionPlanListDatatableList(
        start,
        length,
        searchData
      );

      // console.log("proPlanCount>>", proPlanCount.recordset[0].count)

      var obj = {
        draw: req.query.draw,
        recordsTotal: proPlanCount.recordset[0].count,
        recordsFiltered: proPlanCount.recordset[0].count,
        data: proPlan.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0767: Error in getting production plan list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0767: Error in getting production plan list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // Production Orders

  getProductionOrderList: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let search = req.query.search.value;

      let searchData = {
        startDate: req.query.startDate,
        endDate: req.query.endDate
      };
      let proOrdsCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getProductionOrderCountList(
        searchData
      );
      let proOrds = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getProductionOrderDatatableList(
        start,
        length,
        searchData
      );

      var obj = {
        draw: req.query.draw,
        recordsTotal: proOrdsCount.recordset[0].count,
        recordsFiltered: proOrdsCount.recordset[0].count,
        data: proOrds.recordset
      };
      //console.log(obj);
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0768: Error in getting production order list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0768: Error in getting production order list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getItemDescCustPart: async function (req, res) {
    try {
      let getItemDescCustPart = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getItemDescCustPart(
        req.body
      );
      if (
        getItemDescCustPart instanceof Error ||
        getItemDescCustPart.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error To Get Item Desc. And Cust Part",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "getItemList List",
          result: getItemDescCustPart.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0769: Error while getting Item Desc CustPart "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0769: Error while getting Item Desc CustPart "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  createWorkOrder: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      req.body.EvolveCompany_ID = req.EvolveCompany_ID;
      req.body.EvolveUnit_ID = req.EvolveUnit_ID;
      let createWorkOrder = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.createWorkOrder(
        req.body
      );
      if (
        createWorkOrder instanceof Error ||
        createWorkOrder.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error While Create Work Order",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Work Order Created Successfully !",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0770: Error while creating work order "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0770: Error while creating work order "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  startWorkOrder: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      req.body.EvolveCompany_ID = req.EvolveCompany_ID;
      req.body.EvolveUnit_ID = req.EvolveUnit_ID;
      let checkPickListGenerated = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.checkPickListGenerated(
        req.body
      );
      if (
        checkPickListGenerated instanceof Error ||
        checkPickListGenerated.recordset[0].count < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Picklist Not Generated !",
          result: null
        };
        res.send(obj);
      } else {
        let getWorkOrderData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getWorkOrderData(
          req.body
        );
        if (
          getWorkOrderData instanceof Error ||
          getWorkOrderData.rowsAffected < 1
        ) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error While Getting Work Order !",
            result: null
          };
          res.send(obj);
        } else {
          let getWorkOrderItemData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getWorkOrderItemData(
            getWorkOrderData.recordset[0].EvolveItem_ID
          );
          if (
            getWorkOrderItemData instanceof Error ||
            getWorkOrderItemData.rowsAffected < 1
          ) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error While Getting Work Order Item !",
              result: null
            };
            res.send(obj);
          } else {
            if (
              getWorkOrderItemData.recordset[0].EvolveSerial_ID == null ||
              getWorkOrderItemData.recordset[0].EvolveProcessTemp_Id == null
            ) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message:
                  "Serial Master / Process Template Not Assign To Item !",
                result: null
              };
              res.send(obj);
            } else {
              let countStartedWo = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.countStartedWo(
                getWorkOrderData.recordset[0].EvolveItem_ID
              );
              if (
                countStartedWo instanceof Error ||
                countStartedWo.rowsAffected < 1
              ) {
                let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: "Error While Work Order Count",
                  result: null
                };
                res.send(obj);
              } else {
                if (
                  parseInt(countStartedWo.recordset[0].EvolveSerial_WoLimit) >
                  parseInt(countStartedWo.recordset[0].started_Wo)
                ) {
                  let startWorkOrder = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.startWorkOrder(
                    req.body
                  );
                  if (
                    startWorkOrder instanceof Error ||
                    startWorkOrder.rowsAffected < 1
                  ) {
                    let obj = {
                      statusCode: 400,
                      status: "fail",
                      message: "Error While Start Work Order",
                      result: null
                    };
                    res.send(obj);
                  } else {
                    let obj = {
                      statusCode: 200,
                      status: "success",
                      message: "Work Order Started Successfully !",
                      result: null
                    };
                    res.send(obj);
                  }
                } else {
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message:
                      "Only " +
                      countStartedWo.recordset[0].EvolveSerial_WoLimit +
                      " Work Order Limit To Started At A Time ! ",
                    result: null
                  };
                  res.send(obj);
                }
              }
              // let startWorkOrder = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.startWorkOrder(req.body);
              // if (startWorkOrder instanceof Error || startWorkOrder.rowsAffected < 1) {
              //   let obj = { statusCode: 400, status: "fail", message: "Error While Start Work Order", result: null };
              //   res.send(obj);
              // } else {

              //   let obj = { statusCode: 200, status: "success", message: "Work Order Started Successfully !", result: null };
              //   res.send(obj);
              // }
            }
          }
        }
      } //if (checkPickListGenerated instanceof Error || checkPickListGenerated.recordset[0].count < 0) {
    } catch (error) {
      Evolve.Log.error(" EERR0771: Error while starting work order  "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0771: Error while starting work order  "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  detailWorkOrder: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      req.body.EvolveCompany_ID = req.EvolveCompany_ID;
      req.body.EvolveUnit_ID = req.EvolveUnit_ID;
      let detailWorkOrder = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.detailWorkOrder(
        req.body
      );
      if (
        detailWorkOrder instanceof Error ||
        detailWorkOrder.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error While Get Work Order Detail",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Work Order Started Successfully !",
          result: detailWorkOrder.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0772: Error in detail work order "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0772: Error in detail work order "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getMillingChart: async function (req, res) {
    try {
      let totalTriggers = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMillingCount();
      let completed = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMillingCompletedTriggers();
      let inProcess = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMillingInProcess();
      let rejected = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMillingRejected();

      let dataReturn = {
        totalTriggers: totalTriggers.recordset[0].count,
        completed: completed.recordset[0].count,
        inProcess: inProcess.recordset[0].count,
        rejected: rejected.recordset[0].count
      };
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Get Milling Chart List",
        result: dataReturn
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0773: Error while getting milling chart "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0773: Error while getting milling chart "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getVibrationChart: async function (req, res) {
    try {
      let totalTriggers = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getVibrationCount();
      let completed = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getVibrationCompletedTriggers();
      let inProcess = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getVibrationInProcess();
      let rejected = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getVibrationRejected();

      let dataReturn = {
        totalTriggers: totalTriggers.recordset[0].count,
        completed: completed.recordset[0].count,
        inProcess: inProcess.recordset[0].count,
        rejected: rejected.recordset[0].count
      };

      let obj = {
        statusCode: 200,
        status: "success",
        message: "Get Vibaration Chart List",
        result: dataReturn
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0774: Error while getting vibration chart "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0774: Error while getting vibration chart "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getIntigrationStatus: async function (req, res) {
    try {
      let totalTriggers = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getIntigrationStatusTotal();
      let completed = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getIntigrationStatusLoad();
      let inProcess = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getIntigrationStatusQueue();

      let dataReturn = {
        total: totalTriggers.recordset[0].count,
        load: completed.recordset[0].count,
        queue: inProcess.recordset[0].count
      };

      let obj = {
        statusCode: 200,
        status: "success",
        message: "Get Intigartion Chart List",
        result: dataReturn
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0775: Error while getting integration status "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0775: Error while getting integration status "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getDashboardTopStatus: async function (req, res) {
    try {
      let total = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getDashboardTopStatusTotal();
      let completed = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getDashboardTopStatusCompleted();
      let rejected = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getDashboardTopStatusRejected();

      let dataReturn = {
        total: total.recordset[0].count,
        completed: completed.recordset[0].count,
        rejected: rejected.recordset[0].count
      };

      let obj = {
        statusCode: 200,
        status: "success",
        message: "Get Intigartion Chart List",
        result: dataReturn
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0776: Error while getting Dashboard Top Status "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0776: Error while getting Dashboard Top Status "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getWorkOrderDetail: async function (req, res) {
    try {
      let detailWorkOrder = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getWorkOrderDetail(
        req.body.EvolveProdOrdersDetail_ID
      );
      if (
        detailWorkOrder instanceof Error ||
        detailWorkOrder.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error While Get Work Order Detail",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Work Order Started Successfully !",
          result: detailWorkOrder.recordset[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0777: Error while getting Work Order Detail "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0777: Error while getting Work Order Detail "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  printProdOrderSerial: async function (req, res) {
    try {
      let detailWorkOrder = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.printProdOrderSerial(
        req.body.EvolveProdOrdersDetail_ID
      );
      if (
        detailWorkOrder instanceof Error ||
        detailWorkOrder.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error While Get Work Order Detail",
          result: null
        };
        res.send(obj);
      } else {
        let barcode =
          detailWorkOrder.recordset[0].EvolveProdOrdersDetail_Serial;
        let itemCode = detailWorkOrder.recordset[0].EvolveItem_Code;
        let ZplData =
          "^XA\r\n" +
          "^MMT^PW360\r\n" +
          "^LL0160^LS10\r\n" +
          "^FX\r\n" +
          "^BY2,2,100\r\n" +
          "^FO10,20^BY0,5,5^BQ,3,6^FDQA," +
          barcode +
          "^FS\r\n" +
          "^CF0,30 \r\n" +
          "^FO10,170^FD" +
          barcode +
          "^FS\r\n" +
          "^XZ";
        Evolve.Fs.writeFile(
          Evolve.Config.dirWorkOrderPrint + "/" + barcode + ".txt",
          ZplData,
          function (err) {
            if (err) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error In Print Barcode",
                result: null
              };
              res.send(obj);
            } else {
              let obj = {
                statusCode: 200,
                status: "success",
                message: "Barcode Printed",
                result: null
              };
              res.send(obj);
            }
          }
        );
      }
    } catch (error) {
      Evolve.Log.error(" EERR0778: Error while printing Prod Order Serial "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0778: Error while printing Prod Order Serial "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  printAssyBarcode: async function (req, res) {
    try {
      let child_barcode = req.body.child_barcode;
      let parent_barcode = req.body.parent_barcode;
      let ZplData =
        "^XA^FO40,30^GB540,260,8^FS\r\n" +
        "^FO40,160^GB540,0,8^FS\r\n" +
        "^LL100,^PW900^LH0,0\r\n" +
        "^MD3\r\n" +
        "^CF0,30\r\n" +
        "^FO180,70^FDFG PART NO:^FS^FO70,180^FDCHILD PART NO:^FS\r\n" +
        "^CF0,30\r\n" +
        "^FO180,110^SN" +
        parent_barcode +
        ",1,Y^FS\r\n" +
        "^FO70,220^SN" +
        child_barcode +
        ",1,Y^FS\r\n" +
        "^FT80,150^BQN,2,4^SN###" +
        parent_barcode +
        ",1,Y^FS\r\n" +
        "^FT450,280^BQN,2,4^SN###" +
        child_barcode +
        ",1,Y^FS\r\n" +
        "^PQ1\r\n" +
        "^XZ";
      // let ZplData = "^XA^FO40,30^GB540,260,8^FS^FO40,160^GB540,0,8^FS^LL100,^PW900^LH0,0^MD3^CF0,30^FO180,70^FDFG PART NO:^FS^FO70,180^FDCHILD PART NO:^FS^CF0,30^FO180,110^SN"+parent_barcode+",1,Y^FS^FO70,220^SN"+child_barcode+",1,Y^FS^FT80,150^BQN,2,4^SN###"+parent_barcode+",1,Y^FS^FT450,280^BQN,2,4^SN###"+child_barcode+",1,Y^FS^PQ1^XZ";
      Evolve.Fs.writeFile(
        Evolve.Config.dirAssemblyPrint + "/" + parent_barcode + ".txt",
        ZplData,
        function (err) {
          if (err) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error In Print Barcode",
              result: null
            };
            res.send(obj);
          } else {
            let obj = {
              statusCode: 200,
              status: "success",
              message: "Barcode Printed",
              result: null
            };
            res.send(obj);
          }
        }
      );
    } catch (error) {
      Evolve.Log.error(" EERR0779: Error while printing Assy Barcode "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0779: Error while printing Assy Barcode "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  printProdOrder: async function (req, res) {
    try {
      let detailWorkOrder = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.printProdOrder(
        req.body
      );
      // console.log(detailWorkOrder);
      if (
        detailWorkOrder instanceof Error ||
        detailWorkOrder.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error While Get Work Order Detail",
          result: null
        };
        res.send(obj);
      } else {
        // for (let i = 0; i < detailWorkOrder.rowsAffected; i++) {
        let barcode =
          detailWorkOrder.recordset[0].EvolveProdOrdersDetail_Serial;
        let itemCode = detailWorkOrder.recordset[0].EvolveItem_Code;
        let ZplData =
          "^XA\r\n" +
          "^MMT^PW360\r\n" +
          "^LL0160^LS10\r\n" +
          "^FX\r\n" +
          "^BY2,2,100\r\n" +
          "^FO10,20^BY0,5,5^BQ,3,6^SN###" +
          barcode +
          ",1,Y^FS\r\n" +
          "^CF0,30 \r\n" +
          "^FO10,170^FD^SN" +
          barcode +
          ",1,Y^FS\r\n" +
          "^PQ" +
          detailWorkOrder.rowsAffected +
          ",0,1,Y\r\n" +
          "^XZ";
        Evolve.Fs.writeFile(
          Evolve.Config.dirWorkOrderPrint + "/" + barcode + ".txt",
          ZplData,
          function (err) {
            if (err) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error In Print Barcode",
                result: null
              };
              res.send(obj);
            } else {
              let obj = {
                statusCode: 200,
                status: "success",
                message: "Barcode Printed",
                result: null
              };
              res.send(obj);
            }
          }
        );
        // }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0780: Error while print Prod Order "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0780: Error while print Prod Order "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getMFSerialList: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let result = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMFSerialList(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "MF Process Serial List",
        result: result.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0781: Error while getting MF Serial List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0781: Error while getting MF Serial List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getCompletedTrigger: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let result = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getCompletedTrigger(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "MF Completed Trigger",
        result: result.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0782: Error while getting Completed Trigger "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0782: Error while getting Completed Trigger "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getMFProcessValidations: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let result = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMFProcessValidations(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "MF Process Validations",
        result: result.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0783: Error while getting MF Process Validations "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0783: Error while getting MF Process Validations "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getMFBarcodeDetails: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let result = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMFBarcodeDetails(
        req.body
      );
      if (result.rowsAffected > 0) {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Barcode Details",
          result: result.recordset[0]
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 400,
          status: "success",
          message: "Invalid Barcode Scan",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0784: Error while getting MF Barcode Details "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0784: Error while getting MF Barcode Details "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  printMfProcessDetails: async function (req, res) {
    try {
      // console.log("print rejection  running and data is >> ", req.body);

      let detailSerialNo = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.printMfProcessDetails(
        req.body.EvolveProdOrdersDetail_Serial
      );
      // console.log(
      //   "item code is >>>   >>> ",
      //   detailSerialNo.recordset[0].EvolveItem_Code
      // );
      if (detailSerialNo instanceof Error || detailSerialNo.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error While Get Item Code  ",
          result: null
        };
        res.send(obj);
      } else {
        let barcode = req.body.EvolveProdOrdersDetail_Serial;
        let itemCode = detailSerialNo.recordset[0].EvolveItem_Code;
        let ZplData =
          "^XA\r\n" +
          "^MMT^PW360\r\n" +
          "^LL0160^LS10\r\n" +
          "^FX\r\n" +
          "^BY2,2,100\r\n" +
          "^FO50,50^BC^FD" +
          barcode +
          "^FS\r\n" +
          "^CFA,14 \r\n" +
          "^FO10,180^FDItem code :" +
          itemCode +
          "^FS\r\n" +
          "^XZ";
        // ZplData = ZplData + "\n" + itemCode

        //           ^XA
        // ^MMT^PW360
        // ^LL0160^LS10
        // ^FX
        // ^BY2,2,100
        // ^FO50,50^BC^FDH22000004^FS
        // ^CFA,14
        // ^FO10,180^FDItem code : 2021=TS000SP0K1850^FS
        // ^XZ
        Evolve.Fs.writeFile(
          Evolve.Config.dirWorkOrderPrint + "/" + barcode + ".txt",
          ZplData,
          function (err) {
            if (err) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error In Print Barcode",
                result: null
              };
              res.send(obj);
            } else {
              let obj = {
                statusCode: 200,
                status: "success",
                message: "Barcode Printed",
                result: null
              };
              res.send(obj);
            }
          }
        );
      }
    } catch (error) {
      Evolve.Log.error(" EERR0785: Error while printing Mf Process Details "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0785: Error while printing Mf Process Details "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  printRejectionDetails: async function (req, res) {
    try {
      console.log("rejection print  running and data is >> ", req.body);

      let detailSerialNo = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.printRejectionDetails(
        req.body.EvolveProdOrdersDetail_Serial
      );

      console.log(
        "user name and rejected serial no is ? ",
        detailSerialNo.recordsets[0]
      );

      if (detailSerialNo instanceof Error || detailSerialNo.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error While Get Item Code  ",
          result: null
        };
        res.send(obj);
      } else {
        let rejectedSerialNO =
          detailSerialNo.recordset[0].EvolveReworkSrNo_Serial;
        let serialNO = req.body.EvolveProdOrdersDetail_Serial;
        let userName = detailSerialNo.recordset[0].EvolveUser_Name;

        let ZplData =
          "^XA\r\n" +
          "^CFA,14 \r\n" +
          "^FO45,100^FDRejected Serial No :" +
          rejectedSerialNO +
          "^FS\r\n" +
          "^CFA,14 \r\n" +
          "^FO45,120^FDSerial No :" +
          serialNO +
          "^FS\r\n" +
          "^CFA,14 \r\n" +
          "^FO45,140^FDUser Name :" +
          userName +
          "^FS\r\n" +
          "^XZ";

        Evolve.Fs.writeFile(
          Evolve.Config.dirWorkOrderPrint + "/" + rejectedSerialNO + ".txt",
          ZplData,
          function (err) {
            if (err) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error In Print Barcode",
                result: null
              };
              res.send(obj);
            } else {
              let obj = {
                statusCode: 200,
                status: "success",
                message: "Barcode Printed",
                result: null
              };
              res.send(obj);
            }
          }
        );
      }
    } catch (error) {
      Evolve.Log.error(" EERR0786: Error while printing Rejection Details "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0786: Error while printing Rejection Details "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  moveMfProcess: async function (req, res) {
    // moveMfProcess Start
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let getNxtProcessSeq = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getNxtProcessSeq(
        req.body
      ); // Get Next Process Seq.
      let getMachineId = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMachineId(
        req.body.EvolveUser_ID
      );
      if (req.body.finished == true) {
        if (
          getNxtProcessSeq.recordset[0].EvolveProdOrdersDetail_PrvSeq == 5 &&
          getNxtProcessSeq.recordset[0].EvolveProdOrdersDetail_NxtSeq == 6
        ) {
          getNxtProcessSeq.recordset[0].Evolveprocesstemp_seq =
            parseInt(getNxtProcessSeq.recordset[0].Evolveprocesstemp_seq) + 2;
          getNxtProcessSeq.recordset[0].EvolveProdOrdersDetail_NxtSeq =
            parseInt(
              getNxtProcessSeq.recordset[0].EvolveProdOrdersDetail_NxtSeq
            ) + 2;
        }
      }

      // console.log("Sequence is >>. " ,getNxtProcessSeq.recordset[0].Evolveprocesstemp_seq )
      if (getNxtProcessSeq.rowsAffected > 0) {
        //getNxtProcessSeq.rowsAffected >0 Start
        let updateSerialNxtProcess = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateSerialNxtProcess(
          req.body,
          getNxtProcessSeq.recordset[0].Evolveprocesstemp_seq,
          getNxtProcessSeq.recordset[0].EvolveProdOrdersDetail_NxtSeq
        );

        if (updateSerialNxtProcess.rowsAffected < 1) {
          //updateSerialNxtProcess instanceof error Start
          Evolve.Log.error(updateSerialNxtProcess.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error While Move Serial Number !",
            result: null
          };
          res.send(obj);
        }
        let getSerialNoData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getSerialNoData(
          req.body
        );

        let updatePoHistory = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updatePoHistory(
          req.body,
          getMachineId.recordset[0].EvolveMachine_ID,
          getNxtProcessSeq.recordset[0],
          getNxtProcessSeq.recordset[0].EvolveProdOrdersDetail_NxtSeq
        );
        if (
          updatePoHistory instanceof Error ||
          updatePoHistory.rowsAffected < 1
        ) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error While Move Serial Number !",
            result: null
          };
          res.send(obj);
        } else {
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Serial Number Completed Successfully !",
            result: null
          };
          res.send(obj);
        }
      } else {
        let completeSerialNxtProcess = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.completeSerialNxtProcess(
          req.body,
          getMachineId.recordset[0].EvolveMachine_ID
        );
        if (completeSerialNxtProcess.rowsAffected < 1) {
          //completeSerialNxtProcess instanceof error Start
          Evolve.Log.error(completeSerialNxtProcess.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error While Complete Serial Number !",
            result: null
          };
          res.send(obj);
        } else {
          // Send Data to QAD/SAP/ETC

          let getWoDetails = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getWoDetails(
            req.body.EvolveProdOrdersDetail_Serial
          );
          console.log("getWoDetails ::", getWoDetails);
          if (getWoDetails.rowsAffected > 0) {
            let ioData = {
              EvolveIO_Data: {
                EvolveProdOrdersDetail_Serial:
                  getWoDetails.recordset[0].EvolveProdOrdersDetail_Serial,
                EvolveProdOrders_Order:
                  getWoDetails.recordset[0].EvolveProdOrders_Order,
                EvolveProdOrders_OrderId:
                  getWoDetails.recordset[0].EvolveProdOrders_OrderId,
                EvolveProdOrdersDetail_Qty:
                  getWoDetails.recordset[0].EvolveProdOrdersDetail_Qty,
                EvolveItem_Code: getWoDetails.recordset[0].EvolveItem_Code
              },
              EvolveIO_Direction: 0, // 1 Means IN Direction , 0 Means Out Direction
              EvolveIO_Code: "EVOLVEPB",
              EvolveIO_Data_Formate: "XML",
              EvolveIO_ERP_Type: "QAD",
              EvolveIO_Status: 1, // 1 Means Loaded in IO DB , 0 Means Error on Loading , 2 Successfully loaded in Evolve DB
              EvolveIO_File_Data: ""
            };
            console.log("ioData ::", ioData);
            await Evolve.App.Services.SmartFactory.EsmartFactoryServices.addIOData(
              ioData
            );
          }

          // End Send Data

          let getCompletedWoCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getCompletedWoCount(
            req.body
          );
          if (
            parseInt(getCompletedWoCount.recordset[0].order_qty) ==
            parseInt(getCompletedWoCount.recordset[0].cmp_serial)
          ) {
            let CompleteWO = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.CompleteWO(
              req.body
            );
          }
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Serial Number Completed Successfully !",
            result: null
          };
          res.send(obj);
        } // completeSerialNxtProcess instanceof error End
      } //getNxtProcessSeq.rowsAffected >0 End
    } catch (error) {
      Evolve.Log.error(" EERR0787: Error in moving Mf process "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0787: Error in moving Mf process "+error.message,
        result: null
      };
      res.send(obj);
    }
  }, // moveMfProcess End

  saveMfProcess: async function (req, res) {
    // saveMfProcess Start
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;

      let errorProcess = false;
      for (let i = 0; i < req.body.saveProcess.length; i++) {
        if (errorProcess == false) {
          req.body.saveProcess[i].EvolveProdOrderHistoryType_Code = "MFPROCESS";
          req.body.saveProcess[i].remark = req.body.remark;
          req.body.saveProcess[i].operator = req.body.operator;


          if (req.body.saveProcess[i].old_value != null) {
            if (req.body.saveProcess[i].EvolveProcessVal_Type == 'Image') {
              if (req.body.saveProcess[i].selected_value != '') {


                let d = new Date();
                let time = d.getTime();
                let extention = req.body.saveProcess[i].selected_value.substring(
                  "data:image/".length,
                  req.body.saveProcess[i].selected_value.indexOf(";base64")
                );
                let fileName = time + "_process_validation." + extention;
                req.body.imageName = fileName;
                let base64Data = req.body.saveProcess[i].selected_value.replace(/^data:image\/png;base64,/, "");
                base64Data = base64Data.replace(/^data:image\/jpeg;base64,/, "");
                Evolve.Fs.writeFile(
                  Evolve.Config.imageUploadPath + fileName,
                  base64Data,
                  "base64",
                  function (err) {
                    if (err) {
                      console.log(err);
                      // res.json(0);
                    } else {
                      console.log("The file was saved!");
                      // res.json(fileName);
                    }
                  }
                );
                req.body.saveProcess[i].selected_value = req.body.imageName;
              }
              else {
                req.body.saveProcess[i].selected_value = '';
              }
            }




            let addHistory = await Evolve.App.Controllers.Unit.unitControllers.updateProdOrdersHistory(
              req.body.saveProcess[i],
              req.body.EvolveUser_ID
            );
            if (addHistory.rowsAffected[0] < 1) {
              errorProcess = true;
            }
          }
          else {

            if (req.body.saveProcess[i].EvolveProcessVal_Type == 'Image') {

              if (req.body.saveProcess[i].selected_value != '') {


                let d = new Date();
                let time = d.getTime();
                let extention = req.body.saveProcess[i].selected_value.substring(
                  "data:image/".length,
                  req.body.saveProcess[i].selected_value.indexOf(";base64")
                );
                let fileName = time + "_process_validation." + extention;
                req.body.imageName = fileName;
                let base64Data = req.body.saveProcess[i].selected_value.replace(/^data:image\/png;base64,/, "");
                base64Data = req.body.saveProcess[i].selected_value.replace(/^data:image\/jpeg;base64,/, "");
                Evolve.Fs.writeFile(
                  Evolve.Config.imageUploadPath + fileName,
                  base64Data,
                  "base64",
                  function (err) {
                    if (err) {
                      console.log(err);
                      // res.json(0);
                    } else {
                      console.log("The file was saved!");
                      // res.json(fileName);
                    }
                  }
                );
                req.body.saveProcess[i].selected_value = req.body.imageName;
              }
              else {
                req.body.saveProcess[i].selected_value = '';
              }
            }
            let addHistory = await Evolve.App.Controllers.Unit.unitControllers.addProdOrdersHistory(
              req.body.saveProcess[i],
              req.body.EvolveUser_ID
            );
            if (addHistory.rowsAffected[0] < 1) {
              errorProcess = true;
            }

          }

        }
      }
      if (errorProcess == false) {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Validations Saved Successfully",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error While Save Process Validations",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0788: Error in saving Mf Process  "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0788: Error in saving Mf Process  "+error.message,
        result: null
      };
      res.send(obj);
    }
  }, // saveMfProcess End

  rejectMfProcess: async function (req, res) {
    // rejectMfProcess Start
    try {
      console.log("Body data while rejection ", req.body);
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let getReworkedSrData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getReworkedSrData(
        req.body
      ); // Get Serial data.
      if (getReworkedSrData.rowsAffected < 1) {
        //getReworkedSrData.rowsAffected < 1 Start
        Evolve.Log.error(" EERR0791: Error in get reworked Sr Data "+getReworkedSrData.message);
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error Get Reject Serial Number Data !",
          result: null
        };
        res.send(obj);
      } else {
        let addReworkSrData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.addReworkSrData(
          req.body,
          getReworkedSrData.recordset[0]
        ); // Add Data In Rework Table.
        if (addReworkSrData.rowsAffected < 1) {
          //addReworkSrData.rowsAffected < 1 Start
          Evolve.Log.error(" EERR0789: Error in get reworked Sr Data "+ getReworkedSrData.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error While Add Data In Rework!",
            result: null
          };
          res.send(obj);
        } else {
          let updateRejectSrNo = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateRejectSrNo(
            req.body
          ); // Update Rejected Serial Number.
          if (updateRejectSrNo.rowsAffected < 1) {
            //updateRejectSrNo.rowsAffected < 1 Start
            Evolve.Log.error(" EERR0790: Error in get reworked Sr Data "+getReworkedSrData.message);
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error While Reject Serial Number!",
              result: null
            };
            res.send(obj);
          } else {
            let getSequenceData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getSequenceData(
              req.body
            );
            let getMachineId = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMachineId(
              req.body.EvolveUser_ID
            );
            let getSerialNoData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getSerialNoData(
              req.body
            );
            let getNxtProcessSeq = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getNxtProcessSeq(
              req.body
            );
            let insertItemRejectHistory = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.insertItemRejectHistory(
              req.body,
              getSerialNoData.recordset[0],
              getMachineId.recordset[0].EvolveMachine_ID,
              getSequenceData.recordset[0],
              getNxtProcessSeq.recordset[0]
            );

            if (
              insertItemRejectHistory instanceof Error ||
              insertItemRejectHistory.rowsAffected < 1
            ) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error While Reject Serial Number !",
                result: null
              };
              res.send(obj);
            } else {
              let obj = {
                statusCode: 200,
                status: "success",
                message: "Rejected  Succsessfully",
                result: ""
              };
              res.send(obj);
            }
          } // updateRejectSrNo.rowsAffected < 1 End
        } // addReworkSrData.rowsAffected < 1 Start
      } //getReworkedSrData.rowsAffected < 1 End
    } catch (error) {
      Evolve.Log.error(" EERR0792: Error in rejecting Mf process "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0792: Error in rejecting Mf process "+error.message,
        result: null
      };
      res.send(obj);
    }
  }, // rejectMfProcess End

  getAllItem: async function (req, res) {
    try {
      let getItemList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getAllItem();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "getItemList List",
        result: getItemList.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0793: Error while getting all Item "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0793: Error while getting all Item "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // Production Booking

  checkAllowCreatWo: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let checkAllowCreatWo = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.checkAllowCreatWo(
        req.body.EvolveUser_ID
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "",
        result: checkAllowCreatWo.recordset[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0794: Error while checking Allow Creat Wo "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0794: Error while checking Allow Creat Wo "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getWorkCenterList: async function (req, res) {
    try {
      let getWorkCenterList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getWorkCenterList();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "getWorkCenter List",
        result: getWorkCenterList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0795: Error while getting Work Center List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0795: Error while getting Work Center List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getWorkOrderList: async function (req, res) {
    try {
      let workOrderList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getWorkOrderList();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Work Order List",
        result: workOrderList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0796: Error while getting Work Order List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0796: Error while getting Work Order List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getWorkOrderListIssue: async function (req, res) {
    try {
      let workOrderList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getWorkOrderListIssue();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Work Order List",
        result: workOrderList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0797: Error while getting Work Order List Issue "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0797: Error while getting Work Order List Issue "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getSalesOrderListIssue: async function (req, res) {
    try {
      let workOrderList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getSalesOrderList();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Sales Order List",
        result: workOrderList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0798: Error while getting Sales Order List Issue "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0798: Error while getting Sales Order List Issue "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  //Scanning Screen :get prod orders bom details based on Work order selection
  getProdOrdersBom: async function (req, res) {
    try {
      // console.log(req.body);
      let scanningList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getProdOrdersBom(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Prodcution Order BOM List",
        result: scanningList.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0799: Error while getting Prod Orders Bom "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0799: Error while getting Prod Orders Bom "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  //Scanning Screen :issued QTY verification
  getbarcodeIssuedQty: async function (req, res) {
    try {
      let issuedQty = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getbarcodeIssuedQty(
        req.body
      );
      req.body.EvolveCompany_ID = req.EvolveCompany_ID;
      req.body.EvolveUnit_ID = req.EvolveUnit_ID;
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      if (issuedQty instanceof Error || issuedQty.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: issuedQty.message,
          result: null
        };
        res.send(obj);
      } else {
        //console.log("issuedQty :",issuedQty);
        if (issuedQty.rowsAffected >= 1) {
          let refData = issuedQty.recordset[0];
          if (
            refData.EvolveInventory_QtyOnHand >=
            refData.EvolveProductionOrderBom_QtyReq
          ) {
            // let updateInv = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateInvBarcode(refData.EvolveInventory_ID);
            let updateHistory = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateScannigHistory(
              refData,
              req.body
            );
            if (
              updateHistory instanceof Error ||
              updateHistory.rowsAffected < 1
            ) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: updateHistory.message,
                result: null
              };
              res.send(obj);
            } else {
              let updateProdBom = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateProdBom(
                refData
              );
              if (
                updateProdBom instanceof Error ||
                updateProdBom.rowsAffected < 1
              ) {
                let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: updateProdBom.message,
                  result: null
                };
                res.send(obj);
              } else {
                let updateInv = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateInvBarcode(
                  refData.EvolveInventory_ID
                );
                if (updateInv instanceof Error || updateInv.rowsAffected < 1) {
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: updateInv.message,
                    result: null
                  };
                  res.send(obj);
                } else {
                  let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Barcode Scanned Successfully !",
                    result: null
                  };
                  res.send(obj);
                }
              }
            }
          } else {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Qty Is Not Equal",
              result: null
            };
            res.send(obj);
          }
        }
      }

      //res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0800: Error while getting barcode Issued Qty "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0800: Error while getting barcode Issued Qty "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getMaterialIssued: async function (req, res) {
    try {
      let machineList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMaterialIssued(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Material Issued List",
        result: machineList.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0801: Error while getting material issued "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0801: Error while getting material issued "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getMachineListBySectionId: async function (req, res) {
    try {
      req.body.EvolveUnit_ID = req.EvolveUnit_ID;
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let machineList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMachineListBySectionId(
        req.body.workCenterId,
        req.body.EvolveUser_ID
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Machine List",
        result: machineList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0802: Error while getting Machine List By Section Id "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0802: Error while getting Machine List By Section Id "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getMachineAndSection: async function (req, res) {
    try {
      req.body.EvolveUnit_ID = req.EvolveUnit_ID;
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let getMachineAndSection = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMachineAndSection(
        req.body.EvolveUser_ID
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Machine List",
        result: getMachineAndSection.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0803: Error while getting machine and section "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0803: Error while getting machine and section "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getItemListByWorkOrder: async function (req, res) {
    try {
      let itemList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getItemListByWorkOrder(
        req.body.EvolveProdOrders_ID
      );
      // console.log("itemList::", itemList)
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Item List",
        result: itemList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0804 Error while getting Item List By Work Order "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0804 Error while getting Item List By Work Order "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getWorkOrderByItem: async function (req, res) {
    try {
      let wo_lists = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getWorkOrderByItem(
        req.body.EvolveItem_ID
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "WO list",
        result: wo_lists.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0805: Error while getting work order by item "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0805: Error while getting work order by item "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getItemDetails: async function (req, res) {
    try {
      let itemDetails = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getItemDetails(
        req.body.EvolveItem_ID
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Issue List",
        result: itemDetails.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0806: Error while getting Item Details  "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0806: Error while getting Item Details  "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getProdPlanDetails: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let response = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getProdPlanDetails(
        req.body.EvolveProdPlan_ID
      );
      if (response instanceof Error || response.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: response.message,
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Production Plan Details",
          result: response.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0807: Error while getting Prod Plan Details "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0807: Error while getting Prod Plan Details "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getLocationList: async function (req, res) {
    try {
      let locationList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getLocationList();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "location List",
        result: locationList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0808: Error while getting location list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0808: Error while getting location list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getLocationByMachine: async function (req, res) {
    try {
      let locationList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getLocationByMachine(
        req.body.EvolveMachine_ID
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "location List",
        result: locationList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0809: Error while getting Location By Machine "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0809: Error while getting Location By Machine "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getOperatorList: async function (req, res) {
    try {
      let opratorList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getOperatorList();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Oprator List",
        result: opratorList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0810: Error while getting Operator list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0810: Error while getting Operator list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  createOperator: async function (req, res) {
    try {
      //req.body.EvoleCompany_ID = 1;
      let createOperator = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.createOperator(
        req.body
      );
      if (createOperator instanceof Error || createOperator.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: createOperator.message,
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Operator Add Successfully",
          result: createOperator.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0811: Error while creating operator "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0811: Error while creating operator "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getToolList: async function (req, res) {
    try {
      let toolList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getToolList();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Tool List",
        result: toolList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0812: Error while getting getting Tool List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0812: Error while getting getting Tool List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  saveInventory: async function (req, res) {
    try {
      req.body.EvolveInventoryStatus_ID = 1;
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      req.body.EvolveCompany_ID = req.EvolveCompany_ID;
      req.body.EvolveUnit_ID = req.EvolveUnit_ID;

      req.body.EvolveInventoryStatus_ID = 1; // Set Default Status ID
      req.body.EvolveTransitionHistory_TypeID = 1;

      let po_barcode = "";
      let get_barcode_details = await Evolve.App.Services.Wms.EwsServices.getBarcodeDetails(); // get po barcode details
      if (
        get_barcode_details instanceof Error ||
        get_barcode_details.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: get_barcode_details.message,
          result: null
        };
        res.send(obj);
        get_barcode_details = {};
      } else {
        let settings = get_barcode_details.recordsets[0];
        let barcode_num = settings[0].EvolveWMS_SettingsPallateBarEnd; // add 000 zero before digit , if digit would be 1 letter
        po_barcode = "PB" + pad(barcode_num, 4); // Generet New Barcode for Purchase Order Receive
        last_num = parseInt(settings[0].EvolveWMS_SettingsPallateBarEnd) + 1;
        let update_bar = await Evolve.App.Services.Wms.EwsServices.updateNextNumBarcode(
          last_num,
          settings[0].EvolveWMS_SettingID
        ); // Update EvolveWMSSeting table for next barcode
        if (update_bar instanceof Error || update_bar.rowsAffected < 1) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: update_bar.message,
            result: null
          };
          res.send(obj);
        } else {
          // console.log("po_barcode :::", po_barcode)

          req.body.EvolveInventory_RefNumber = po_barcode;

          console.log("req.body >>>>", req.body);
          let error = false;
          if (req.body.EvolveProdOrders_ID == 0) {
            // no Workorder Avilable So Create new Work Orders
            // console.log("Create new workorder")
            let EvolveProdOrdersresult = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.createProductionOrders(
              req.body
            );
            if (
              EvolveProdOrdersresult instanceof Error ||
              EvolveProdOrdersresult.rowsAffected < 1
            ) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: EvolveProdOrdersresult.message,
                result: null
              };
              res.send(obj);
              error = true;
            } else {
              req.body.EvolveProdOrders_ID =
                EvolveProdOrdersresult.recordset[0].inserted_id;
            }
          }
          if (error == false) {
            let saveInventory = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.saveInventoryAndHistory(
              req.body
            );
            if (
              saveInventory instanceof Error ||
              saveInventory.rowsAffected < 1
            ) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: saveInventory.message,
                result: null
              };
              res.send(obj);
            } else {
              let obj = {
                statusCode: 200,
                status: "success",
                message: "Inventory Added Successfully",
                result: req.body.EvolveProdOrders_ID
              };
              res.send(obj);
            }
          }
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0813: Error in saving Inventory "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0813: Error in saving Inventory "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getProductionBookingList: async function (req, res) {
    try {
      let productionBookingList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getProductionBookingList(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Production Booking List",
        result: productionBookingList.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0814: Error while getting Production Booking List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0814: Error while getting Production Booking List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  checkPickList: async function (req, res) {
    try {
      let checkPickList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.checkPickList(
        req.body
      );
      if (
        checkPickList.recordset[0].iss_qty != null &&
        checkPickList.recordset[0].req_qty != null
      ) {
        if (
          checkPickList.recordset[0].iss_qty >=
          checkPickList.recordset[0].req_qty
        ) {
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Pick List",
            result: "Picklist Issued"
          };
          res.send(obj);
        } else {
          let obj = {
            statusCode: 400,
            status: "error",
            message: "Pick List",
            result: "Picklist Not Issued"
          };
          res.send(obj);
        }
      } else {
        let obj = {
          statusCode: 400,
          status: "error",
          message: "Pick List",
          result: "Picklist Not Generated"
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0815: Error while checking Pick List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0815: Error while checking Pick List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  checkWoInShift: async function (req, res) {
    try {
      let checkWoInShift = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.checkWoInShift(
        req.body
      );
      if (checkWoInShift.rowsAffected[0] > 0) {
        let obj = {
          statusCode: 200,
          status: "error",
          message: "Check Shift",
          result: "Work Order Is In Shift"
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 400,
          status: "error",
          message: "Check Shift",
          result: "Work Order Not Is In Shift"
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0816: Error while checking Wo In Shift "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0816: Error while checking Wo In Shift "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getLotNumber: async function (req, res) {
    try {
      let lotNumber = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getLotNumber();
      if (lotNumber instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: lotNumber.message,
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Production Booking List",
          result: lotNumber
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0817: Error while getting Lot Number "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0817: Error while getting Lot Number "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  publishPlan: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let response = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.publishPlan(
        req.body
      );
      if (response instanceof Error || response.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: response.message,
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Plan Published Successfully",
          result: []
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0818: Error while publishing plan "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0818: Error while publishing plan "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  deletePlan: async function (req, res) {
    try {
      let response = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.deletePlan(
        req.body.id
      );
      if (response instanceof Error || response.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: response.message,
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Plan Delete Successfully",
          result: []
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0819: Error while delete Plan "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0819: Error while delete Plan "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  closeWorkOrder: async function (req, res) {
    try {
      console.log("close work order is running>>>");
      console.log("body data is ???? >>> ", req.body.EvolveProdOrders_ID);
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let response = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.closeWorkOrder(
        req,
        res,
        req.body.EvolveProdOrders_ID
      );
      if (response instanceof Error || response.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: response.message,
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Work Order Close Successfully",
          result: []
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0820: Error while closing Work Order "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0820: Error while closing Work Order "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  printBarcode: async function (req, res) {
    try {
      let ProdOrdersDetail = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getProdOrdersDetail(
        req.body.EvolveProdOrdersDetail_ID
      );
      // console.log("ProdOrdersDetail:::", ProdOrdersDetail)
      if (
        ProdOrdersDetail instanceof Error ||
        ProdOrdersDetail.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: ProdOrdersDetail.message,
          result: null
        };
        res.send(obj);
      } else {
        // console.log("ProdOrdersDetail.recordset[0].EvolveItem_ID ::", ProdOrdersDetail.recordset[0].EvolveItem_ID)
        let item = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getItemDetails(
          ProdOrdersDetail.recordset[0].EvolveItem_ID
        );
        if (item instanceof Error || item.rowsAffected < 1) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: item.message,
            result: null
          };
          res.send(obj);
        } else {
          let EvolveItem_Code = item.recordset[0].EvolveItem_Code;
          let EvolveItem_Desc = item.recordset[0].EvolveItem_Desc;
          let EvolveProdOrdersDetail_LotNumber =
            ProdOrdersDetail.recordset[0].EvolveProdOrdersDetail_LotNumber;
          let fileName =
            ProdOrdersDetail.recordset[0].EvolveProdOrdersDetail_ID;
          let Barcode_ID =
            ProdOrdersDetail.recordset[0].EvolveProdOrdersDetail_RefNumber;
          let Receive_Qty =
            ProdOrdersDetail.recordset[0].EvolveProdOrdersDetail_Qty;

          // console.log("EvolveItem_Code :", EvolveItem_Code)
          // console.log("EvolveItem_Desc :", EvolveItem_Desc)
          // console.log("fileName :", EvolveProdOrdersDetail_LotNumber)
          // console.log("Barcode_ID :", Barcode_ID)
          // console.log("Receive_Qty :", Receive_Qty)
          // console.log("fileName :", fileName)

          Evolve.PrintJob.push({
            type: "EVLBARTEMP1",
            barcode: Barcode_ID,
            itemCode: EvolveItem_Code,
            itemDesc: EvolveItem_Desc,
            lotNumber: EvolveProdOrdersDetail_LotNumber,
            recvQty: Receive_Qty
          });

          let obj = {
            statusCode: 200,
            status: "success",
            message: "Barcode Printed Successfuly",
            result: ProdOrdersDetail.recordset[0]
          };
          res.send(obj);
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0821: Error while printing Bar code "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0821: Error while printing Bar code "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  moveMachine: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      req.body.EvolveCompany_ID = req.EvolveCompany_ID;
      req.body.EvolveUnit_ID = req.EvolveUnit_ID;
      let response = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.moveMachine(
        req.body
      );
      if (response instanceof Error || response.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: response.message,
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Move Machine Successfully !",
          result: []
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0822: Error in moving machine "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0822: Error in moving machine "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  moveTool: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      req.body.EvolveCompany_ID = req.EvolveCompany_ID;
      req.body.EvolveUnit_ID = req.EvolveUnit_ID;
      let response = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.moveTool(
        req.body
      );
      if (response instanceof Error || response.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: response.message,
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Tool Changed Successfully !",
          result: []
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0823: Error while moving tool "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0823: Error while moving tool "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getTimeManagemetWorkOrderList: async function (req, res) {
    try {
      let getWorkOrderList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getTimeManagemetWorkOrderList(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Pick List",
        result: getWorkOrderList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0824: Error while getting Time Managemet Work Order List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0824: Error while getting Time Managemet Work Order List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  addTimeManagemet: async function (req, res) {
    try {
      let response = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.addTimeManagemet(
        req.body
      );
      if (response instanceof Error || response.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: response.message,
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Time Management Add Successfully !",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0825: Error while adding Time Managemet "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0825: Error while adding Time Managemet "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getReturnList: async function (req, res) {
    try {
      let returnList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getReturnList(
        req.body
      );
      // console.log("productionBookingList :", returnList);
      let obj = {
        statusCode: 200,
        status: "success",
        message: "To be Return List",
        result: returnList.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0826: Error while getting Return List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0826: Error while getting Return List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // Pick List Generate

  getPickListByWorkOrderCount: async function (req, res) {
    try {
      let picklistCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getPickListByWorkOrderCountList(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Item List",
        result: picklistCount.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0827: Error while get Pick List By Work Order Count "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0827: Error while get Pick List By Work Order Count "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getPickListByWorkOrder: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let searchData = {
        EvolveProdOrders_ID: req.query.EvolveProdOrders_ID
      };
      if (req.query.EvolveProdOrders_ID != "") {
        let pickListCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getPickListByWorkOrderCount(
          searchData
        );
        let pickList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getPickListByWorkOrderDatatableList(
          start,
          length,
          searchData
        );
        let obj = {
          draw: req.query.draw,
          recordsTotal: pickListCount.recordset[0].count,
          recordsFiltered: pickListCount.recordset[0].count,
          data: pickList.recordset
        };
        res.send(obj);
      } else {
        let obj = {
          draw: req.query.draw,
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0828: Error while getting Pick List By Work Order "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0828: Error while getting Pick List By Work Order "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getPickListForIssue: async function (req, res) {
    try {
      let pickList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getPickListForIssue(
        req.body
      );
      if (pickList instanceof Error || pickList.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "No Pick List Generated",
          result: null
        };
        res.send(obj);
      } else {
        let getPickListItem = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getPickListItemForIssue(
          req.body
        );
        if (
          getPickListItem instanceof Error ||
          getPickListItem.rowsAffected < 1
        ) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "No Pick Item Found",
            result: null
          };
          res.send(obj);
        } else {
          let result = {
            pickList: pickList.recordsets[0],
            getPickListItem: getPickListItem.recordsets[0]
          };
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Pick List",
            result: result
          };
          res.send(obj);
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0829: Error while getting Pick List For Issue "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0829: Error while getting Pick List For Issue "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  generatePickList: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      req.body.EvolveCompany_ID = req.EvolveCompany_ID;
      req.body.EvolveUnit_ID = req.EvolveUnit_ID;
      let generatePickList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.generatePickList(
        req.body
      );
      if (
        generatePickList instanceof Error ||
        generatePickList.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: generatePickList.message,
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Picklist Generated Successfully !",
          result: []
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0830: Error while generating Pick List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0830: Error while generating Pick List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getInventoryItemFormBarcode: async function (req, res) {
    try {
      let inventoryItemFormBarcode = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getInventoryItemFormBarcode(
        req.body
      );
      //console.log("inventoryItemFormBarcode.recordsets >>", inventoryItemFormBarcode.recordsets)
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Item List",
        result: inventoryItemFormBarcode.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0831: Error while getting Inventory Item Form Bar code "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0831: Error while getting Inventory Item Form Bar code "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getAlternateItem: async function (req, res) {
    try {
      let inventoryItemFormBarcode = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getAlternateItem(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Alternate Item List",
        result: inventoryItemFormBarcode.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0832: Error while getting Alternative Item "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0832: Error while getting Alternative Item "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  addPickListDetails: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let obj;
      let error = false;
      for (i = 0; i < req.body.resultArray.length; i++) {
        if (error == false) {
          obj = req.body.resultArray[i];
          let addPickListDetails = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.addPickListDetails(
            req.body.EvolveUser_ID,
            obj
          );
          if (
            addPickListDetails instanceof Error ||
            addPickListDetails.rowsAffected < 1
          ) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error on Query",
              result: null
            };
            res.send(obj);
            error = true;
          } else {
            let updatePickList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updatePickList(
              req.body.EvolveUser_ID,
              obj
            );
            if (
              updatePickList instanceof Error ||
              updatePickList.rowsAffected < 1
            ) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error on Query",
                result: null
              };
              res.send(obj);
              error = true;
            }
          }
        } //if(error == false)
      }
      if (error == false) {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Pick List Updated Successfully",
          result: ""
        };
        res.send(obj);
      } //if(error==false)
    } catch (error) {
      Evolve.Log.error(" EERR0833: Error while adding Pick List Details "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0833: Error while adding Pick List Details"+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  itemTransfer: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      req.body.EvolveCompany_ID = req.EvolveCompany_ID;
      req.body.EvolveUnit_ID = req.EvolveUnit_ID;
      let EvolveReason_ID = 4;
      let ErrorOnInsert = false;

      // Get Location Code From MAchiine ID Machine Code.
      let loc = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getLocationByMachine(
        req.body.EvolveMachine_ID
      );
      if (loc instanceof Error || loc.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on Query",
          result: null
        };
        res.send(obj);
      } else {
        let pickList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getPickListById(
          req.body.EvolvePickList_ID
        );
        if (pickList instanceof Error || pickList.rowsAffected < 1) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error on Query",
            result: null
          };
          res.send(obj);
        } else {
          for (let i = 0; i < req.body.EvolveInventory_IDS.length; i++) {
            let invnt = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getInventoryById(
              req.body.EvolveInventory_IDS[i]
            );
            let pickListMovePalletUpdate = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.pickListMovePalletUpdate(
              req.body.EvolveInventory_IDS[i],
              EvolveReason_ID,
              req.body.EvolveUser_ID,
              loc.recordsets[0][0].EvolveLocation_ID
            );
            let pickListMovePalletHistory = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.pickListMovePalletHistory(
              req.body,
              invnt.recordsets[0][0],
              EvolveReason_ID
            );
            let pickListDetailsHistory = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.pickListDetailsHistory(
              req.body,
              invnt.recordsets[0][0],
              EvolveReason_ID
            );
            // console.log("History Id ", pickListDetailsHistory.recordset[0].inserted_id);
            let addPickListDetailsHistory = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.addPickListDetailsHistory(
              req.body,
              invnt.recordsets[0][0],
              pickListDetailsHistory.recordset[0].inserted_id
            );
            let EvolvePickList_QtyIss =
              parseFloat(pickList.recordsets[0][0].EvolvePickList_QtyIss) +
              parseFloat(invnt.recordsets[0][0].EvolveInventory_QtyOnHand);
            let pickListUpdate = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.pickListUpdate(
              req.body.EvolvePickList_ID,
              EvolvePickList_QtyIss,
              req.body.EvolveUser_ID
            );
          }
        }

        let obj = {
          statusCode: 200,
          status: "success",
          message: "Transfer Successfully !",
          result: []
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0834: Error in item transfer "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0834: Error in item transfer "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  reverceInv: async function (req, res) {
    try {
      let response = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.reverceInv(
        req.body
      );
      if (response instanceof Error || response.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: response.message,
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Plan Delete Successfully",
          result: []
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0835: Error while reverce Inv  "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0835: Error while reverce Inv  "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  returnToStoreUpdate: async function (req, res) {
    // let picklistID = req.body.pickListID;
    // let rtosActivity = req.body.rtosActivity;
    // let rtosQty = req.body.rtosQty;
    // let rtosReasonID = req.body.rtosReasonID
    // let rtosItem = req.body.itemId;
    // let retoBarcode = req.body.transferBarcode;
    // let allowcatedQty = req.body.allocatedQty;

    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      req.body.EvolveCompany_ID = req.EvolveCompany_ID;
      req.body.EvolveUnit_ID = req.EvolveUnit_ID;
      let check_invFromBarcode = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.check_invFromBarcode(
        req.body
      );
      if (
        check_invFromBarcode instanceof Error ||
        check_invFromBarcode.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Wrong Barcode Scan",
          result: null
        };
        res.send(obj);
      } else {
        //UPDATE INVENTORY
        let inv_qty =
          parseFloat(
            check_invFromBarcode.recordset[0].EvolveInventory_QtyOnHand
          ) + parseFloat(req.body.EvolvePickListDetail_ReturnQty);
        let rtos_updateInv = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.rtos_updateInv(
          req.body,
          check_invFromBarcode,
          inv_qty
        );
        if (
          rtos_updateInv instanceof Error ||
          rtos_updateInv.rowsAffected < 1
        ) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: rtos_updateInv.message,
            result: null
          };
          res.send(obj);
        } else {
          let get_picklist_returnQty = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.get_picklist_returnQty(
            req.body.EvolvePickList_ID
          );
          let picklist_returnQty =
            parseFloat(
              get_picklist_returnQty.recordset[0].EvolvePickList_QtyReturn
            ) + parseFloat(req.body.EvolvePickListDetail_ReturnQty);
          // Update PickList
          let update_picklistQty = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.update_picklistQty(
            req.body.EvolvePickList_ID,
            picklist_returnQty
          );
          if (
            update_picklistQty instanceof Error ||
            update_picklistQty.rowsAffected < 1
          ) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: update_picklistQty.message,
              result: null
            };
            res.send(obj);
          } else {
            let get_picklistDetail_returnQty = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.get_picklistDetail_returnQty(
              req.body.EvolvePickList_ID,
              req.body.EvolveInventory_RefNumber
            );
            let pickDetailList_returnQty =
              parseFloat(
                get_picklistDetail_returnQty.recordset[0]
                  .EvolvePickListDetail_ReturnQty
              ) + parseFloat(req.body.EvolvePickListDetail_ReturnQty);
            // Update PickListDetail
            let update_picklistDetailQty = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.update_picklistDetailQty(
              get_picklistDetail_returnQty.recordset[0].EvolvePickListDetail_ID,
              pickDetailList_returnQty
            );
            if (
              update_picklistDetailQty instanceof Error ||
              update_picklistDetailQty.rowsAffected < 1
            ) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: update_picklistDetailQty.message,
                result: null
              };
              res.send(obj);
            } else {
              //Add in history
              let add_historyForRTOS = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.add_historyForRTOS(
                req.body,
                check_invFromBarcode.recordset[0]
              );
              if (
                add_historyForRTOS instanceof Error ||
                add_historyForRTOS.rowsAffected < 1
              ) {
                let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: add_historyForRTOS.message,
                  result: null
                };
                res.send(obj);
              } else {
                let obj = {
                  statusCode: 200,
                  status: "success",
                  message: "Stock Returned To Store Successfully !",
                  result: null
                };
                res.send(obj);
              }
            }
          }
        }
      }

      // 	// let obj = { statusCode: 200, status: "success", message: "Successfully", result: storeLocID.recordsets[0] };
      // 	// console.log(obj);
      // 	//res.send(obj);
      // 	let response = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.rtosUpdateInventory(req.body);
      // 	if(response instanceof Error || response.rowsAffected < 1){
      // 		let obj = { statusCode: 400, status: "fail", message: response.message, result: null };
      // 		res.send(obj);
      // 	}else{
      // 		let obj = { statusCode: 200, status: "success", message: "Plan Delete Successfully", result: [] };
      // 		res.send(obj);
      // 	}
      // }
    } catch (error) {
      Evolve.Log.error(" EERR0836: Error while returning To Store Update "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0836: Error while returning To Store Update "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  // Assembly screen
  getParentItems: async function (req, res) {
    try {
      let response = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getParentItems();
      if (response instanceof Error || response.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: response.message,
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Parent Items get successfully",
          result: response.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0837: Error while getting parent items "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0837: Error while getting parent items "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getAssemblyBarcodeList: async function (req, res) {
    try {
      let response = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getAssemblyBarcodeList();
      if (response instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: response.message,
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Barcode details getted successfully",
          result: response.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0838: Error while getting Assembly Barcode List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0838: Error while getting Assembly Barcode List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getOnchangeParent: async function (req, res) {
    try {
      let response = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getOnchangeParent(
        req.body
      );
      if (response instanceof Error || response.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: response.message,
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Parent Description Get Successfully",
          result: response.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0839: Error while getting on change parent  "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0839: Error while getting on change parent  "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getParentSerial: async function (req, res) {
    try {
      req.body.EvolveCompany_ID = req.EvolveCompany_ID;
      req.body.EvolveUnit_ID = req.EvolveUnit_ID;
      let child_barcode = req.body.child_barcode;
      let check_validbarcode = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.checkValidChildBarcode(
        req.body
      );
      if (
        check_validbarcode instanceof Error ||
        check_validbarcode.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: check_validbarcode.message,
          result: null
        };
        res.send(obj);
      } else {
        if (check_validbarcode.recordset[0].is_valid_barcode == "true") {
          let response = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getParentSerial(
            req.body
          );
          if (response instanceof Error || response.rowsAffected < 1) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Parent Work order does not exist",
              result: null
            };
            res.send(obj);
          } else {
            let child_serial_id =
              check_validbarcode.recordset[0].EvolveProdOrdersDetail_ID;
            let update_child = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateChildParentSerial(
              req.body,
              response.recordset[0]
            );
            if (update_child.rowsAffected > 0) {
              let updateChildWo = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateChildWo(
                req.body
              );
              let updateParentWo = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateParentWo(
                response.recordset[0]
              );
              let update_assembly = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.insertAssebmly(
                response.recordset[0],
                child_serial_id
              );

              if (update_assembly.rowsAffected > 0) {
                let getChildWoData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getChildWoData(
                  req.body
                );
                let getParentWoData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getParentWoData(
                  response.recordset[0]
                );
                let getMilling = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMillingData(
                  req.body
                );
                let getVibrationData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getVibrationData(
                  req.body
                );
                let millingPartTOK = new Date(
                  getMilling.recordset[0].Evolve_Milling_Cycle_Part_OK_TIMESTAMP
                );
                let millingPartTime =
                  millingPartTOK.getFullYear() +
                  "-" +
                  (millingPartTOK.getMonth() + 1) +
                  "-" +
                  millingPartTOK.getDate() +
                  " " +
                  millingPartTOK.getHours() +
                  ":" +
                  millingPartTOK.getMinutes() +
                  ":" +
                  millingPartTOK.getSeconds() +
                  "." +
                  millingPartTOK.getMilliseconds();
                let vibrationPartOK = new Date(
                  getVibrationData.recordset[0].EvolveVibration_Machine_at_Home_TIMESTAMP
                );
                let vibrationPartTime =
                  vibrationPartOK.getFullYear() +
                  "-" +
                  (vibrationPartOK.getMonth() + 1) +
                  "-" +
                  vibrationPartOK.getDate() +
                  " " +
                  vibrationPartOK.getHours() +
                  ":" +
                  vibrationPartOK.getMinutes() +
                  ":" +
                  vibrationPartOK.getSeconds() +
                  "." +
                  vibrationPartOK.getMilliseconds();

                // Insert One Record With For get index Number...

                let dataInTrans = {
                  ITEMNO: getChildWoData.recordset[0].EvolveItem_Code,
                  CPART: req.body.child_barcode,
                  WONO: getChildWoData.recordset[0].EvolveProdOrders_Order,
                  PSERIAL: response.recordset[0].EvolveProdOrdersDetail_Serial,
                  FZ1862276_TIME: millingPartTime,
                  FZ1862276_PartOK:
                    getMilling.recordset[0].Evolve_Milling_Cycle_Part_OK == true
                      ? 1
                      : 0,
                  K3220_InputParameter09: getVibrationData.recordset[0].EvolveVibration_Input_Parameter_09_VALUE.toFixed(
                    3
                  ),
                  K3220_InputParameter10: getVibrationData.recordset[0].EvolveVibration_Input_Parameter_10_VALUE.toFixed(
                    3
                  ),
                  K3220_InputParameter11: getVibrationData.recordset[0].EvolveVibration_Input_Parameter_11_VALUE.toFixed(
                    3
                  ),
                  K3220_InputParameter12: getVibrationData.recordset[0].EvolveVibration_Input_Parameter_12_VALUE.toFixed(
                    3
                  ),
                  K3220_TIME: vibrationPartTime,
                  PPART: response.recordset[0].EvolveProdOrdersDetail_Serial
                };

                let inBoundResult = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.saveInTrans(
                  req.body,
                  dataInTrans
                );

                if (inBoundResult instanceof Error) {
                  // console.log("Error in Insert Data into InBound Data :", inBoundResult)

                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in XML",
                    result: null
                  };
                  res.send(obj);
                } else {
                  // console.log("ID ::", inBoundResult)

                  let xml = Evolve.Xml.create("DocumentElement", {
                    version: "1.0",
                    encoding: "UTF-8"
                  });
                  xml
                    .ele("CHLDBKFLSH")
                    .ele("DANO", Math.floor(Math.random() * 100000 + 1))
                    .up()
                    .ele("ITEMNO", getChildWoData.recordset[0].EvolveItem_Code)
                    .up()
                    .ele("CPART", req.body.child_barcode)
                    .up()
                    .ele(
                      "WONO",
                      getChildWoData.recordset[0].EvolveProdOrders_Order
                    )
                    .up()
                    .ele("PLINE", "IMM15")
                    .up()
                    .ele("INVQTY", 1)
                    .up()
                    .ele(
                      "PSERIAL",
                      response.recordset[0].EvolveProdOrdersDetail_Serial
                    )
                    .up()
                    .ele("FZ1862276_TIME", millingPartTime)
                    .up()
                    .ele(
                      "FZ1862276_PartOK",
                      getMilling.recordset[0].Evolve_Milling_Cycle_Part_OK ==
                        true
                        ? 1
                        : 0
                    )
                    .up()
                    .ele(
                      "K3220_InputParameter09",
                      getVibrationData.recordset[0].EvolveVibration_Input_Parameter_09_VALUE.toFixed(
                        3
                      )
                    )
                    .up()
                    .ele(
                      "K3220_InputParameter10",
                      getVibrationData.recordset[0].EvolveVibration_Input_Parameter_10_VALUE.toFixed(
                        3
                      )
                    )
                    .up()
                    .ele(
                      "K3220_InputParameter11",
                      getVibrationData.recordset[0].EvolveVibration_Input_Parameter_11_VALUE.toFixed(
                        3
                      )
                    )
                    .up()
                    .ele(
                      "K3220_InputParameter12",
                      getVibrationData.recordset[0].EvolveVibration_Input_Parameter_12_VALUE.toFixed(
                        3
                      )
                    )
                    .up()
                    .ele("K3220_TIME", vibrationPartTime)
                    .up()
                    .end();
                  xml
                    .ele("PRNTBKFLSH")
                    .ele("DANO", Math.floor(Math.random() * 100000 + 1))
                    .up()
                    .ele("ITEMNO", getParentWoData.recordset[0].EvolveItem_Code)
                    .up()
                    .ele(
                      "PPART",
                      response.recordset[0].EvolveProdOrdersDetail_Serial
                    )
                    .up()
                    .ele(
                      "WONO",
                      getParentWoData.recordset[0].EvolveProdOrders_Order
                    )
                    .up()
                    .ele("PLINE", "IP2RH")
                    .up()
                    .ele("INVQTY", 1)
                    .up()
                    .end();
                  let xmldoc = xml.end({ pretty: true });
                  //console.log(xmldoc);
                  //console.log("xmldoc::", xmldoc)
                  let fileName = req.body.child_barcode + "_xml.xml";
                  Evolve.Fs.writeFile(
                    Evolve.Config.dirPath + "/" + fileName,
                    xmldoc,
                    function (err) {
                      if (err) {
                        console.log(err);
                      } else {
                        // console.log("The file was saved!");
                        // Update status of XML.

                        Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateInTransStatus(
                          inBoundResult,
                          "L"
                        );
                        Evolve.Fs.writeFile(
                          Evolve.Config.dirPath_mounted + "/" + fileName,
                          xmldoc,
                          function (err) {
                            if (err) {
                              console.log(err);
                            } else {
                              console.log(
                                "The file was saved to Mounted Folder! "
                              );
                            }
                          }
                        );
                      }
                    }
                  );

                  let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Parent Barcode Get Successfully !",
                    result: response.recordset
                  };
                  res.send(obj);
                }
              } else {
                let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: "Barcode not ready for reprint option",
                  result: null
                };
                res.send(obj);
              }
            } else {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "Barcodes not updated",
                result: null
              };
              res.send(obj);
            }
          }
        } else {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Scanned Barcode not in assembly queue",
            result: null
          };
          res.send(obj);
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0840: Error while get Parent Serial "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0840: Error while get Parent Serial "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  checkBarcodePrinted: async function (req, res) {
    try {
      let response = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.checkBarcodePrinted(
        req.body
      );
      // console.log("Check Print Barcode ", response.recordsets);
      if (response instanceof Error || response.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: response.message,
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Reprint barcode is valid",
          result: response.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0841: Error while checking barcode printed "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0841: Error while checking barcode printed "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // Report Dump
  getReportDump: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      //let search = req.query.search.value;
      let searchData = {
        SerialNo: req.query.SerialNo
      };

      let getReportDumpCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getReportDumpCountList(
        searchData
      );
      let getReportDump = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getReportDumpDatatableList(
        start,
        length,
        searchData
      );

      var obj = {
        draw: req.query.draw,
        recordsTotal: getReportDump.length,
        recordsFiltered: getReportDump.length,
        data: getReportDump
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0842: Error while getting report dum "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0842: Error while getting report dum "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  // Ip Trace Report
  getIpTraceReport: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      //let search = req.query.search.value;
      let searchdate = {
        startDate: req.query.startDate,
        endDate: req.query.endDate
      };
      let searchSerialNo = {
        SerialNo: req.query.SerialNo
      };

      if (req.query.startDate != "" && req.query.endDate != "") {
        let getIpTraceReportCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getIpTraceReportCountListDateWise(
          searchdate
        );
        let getIpTraceReport = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getIpTraceReportDatatableListDateWise(
          start,
          length,
          searchdate
        );
        var obj = {
          draw: req.query.draw,
          recordsTotal: getIpTraceReportCount.recordset[0].count,
          recordsFiltered: getIpTraceReportCount.recordset[0].count,
          data: getIpTraceReport.recordset
        };
        console;
        res.send(obj);
      } else {
        let getIpTraceReportCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getIpTraceReportCountListSerialWise(
          searchSerialNo
        );
        let getIpTraceReport = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getIpTraceReportDatatableListSerialWise(
          start,
          length,
          searchSerialNo
        );

        var obj = {
          draw: req.query.draw,
          recordsTotal: getIpTraceReportCount.recordset[0].count,
          recordsFiltered: getIpTraceReportCount.recordset[0].count,
          data: getIpTraceReport.recordset
        };

        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0843: Error while getting Ip Trace Report "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0843: Error while getting Ip Trace Report "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // Ip Trace Report
  getXmlReport: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      //let search = req.query.search.value;
      let searchdate = {
        startDate: req.query.startDate,
        endDate: req.query.endDate
      };
      let searchSerialNo = {
        SerialNo: req.query.SerialNo
      };

      let getIpTraceReportCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getXmlReportCountList();
      let getIpTraceReport = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getXmlReportDatatableList(
        start,
        length
      );

      var obj = {
        draw: req.query.draw,
        recordsTotal: getIpTraceReportCount.recordset[0].count,
        recordsFiltered: getIpTraceReportCount.recordset[0].count,
        data: getIpTraceReport.recordset
      };

      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0844: Error while getting Xml Report  "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0844: Error while getting Xml Report  "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // Milling Vibration Report
  getMillingVibrationReport: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let search = req.query.search.value;
      let searchData = {
        machine: req.query.machine,
        SerialNo: req.query.SerialNo,
        startDate: req.query.startDate,
        endDate: req.query.endDate
      };

      let getMillingVibrationReportCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMillingVibrationCountList(
        searchData
      );
      let getMillingVibrationReport = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMillingVibrationDatatableList(
        start,
        length,
        searchData
      );

      var obj = {
        draw: req.query.draw,
        recordsTotal: getMillingVibrationReportCount.recordset[0].count,
        recordsFiltered: getMillingVibrationReportCount.recordset[0].count,
        data: getMillingVibrationReport.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0845: Error while getting Milling Vibration Report "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0845: Error while getting Milling Vibration Report "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  // Vibration Report
  getVibrationMachineReport: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let search = req.query.search.value;
      let searchData = {
        startDate: req.query.startDate,
        endDate: req.query.endDate
      };

      let getVibrationMachineReportCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getVibrationMachineReportCountList(
        searchData
      );
      let getVibrationMachineReport = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getVibrationMachineReportDatatableList(
        start,
        length,
        searchData
      );

      var obj = {
        draw: req.query.draw,
        recordsTotal: getVibrationMachineReportCount.recordset[0].count,
        recordsFiltered: getVibrationMachineReportCount.recordset[0].count,
        data: getVibrationMachineReport.recordset
      };

      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0846: Error while getting Vibration Machine Report "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0846: Error while getting Vibration Machine Report "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  //Rejection Report
  getRejectionReport: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let search = req.query.search.value;
      let searchData = {
        startDate: req.query.startDate,
        endDate: req.query.endDate
      };
      let getRejectionReportCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getRejectionReportCountList(
        searchData
      );
      let getRejectionReport = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getRejectionReportDatatableList(
        start,
        length,
        searchData
      );
      var obj = {
        draw: req.query.draw,
        recordsTotal: getRejectionReportCount.recordset[0].count,
        recordsFiltered: getRejectionReportCount.recordset[0].count,
        data: getRejectionReport.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0847: Error while getting Rejection Report "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0847: Error while getting Rejection Report "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  //Rejection Work Order
  getRejectionWorkOrder: async function (req, res) {
    try {
      let getRejectionWorkOrder = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getRejectionWorkOrderDatatableList();
      if (
        getRejectionWorkOrder instanceof Error ||
        getRejectionWorkOrder.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 200,
          status: "fail",
          message: "Rejection Order Not Found",
          result: getRejectionWorkOrder.recordsets[0]
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: getRejectionWorkOrder.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0848: Error while getting Rejection Work Order "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0848: Error while getting Rejection Work Order "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getSinglePodProceess: async function (req, res) {
    try {
      let result = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getSinglePodProceess(req.body);
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on single select",
          result: result.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: result.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0849: Error while get Single Pod Proceess "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0849: Error while get Single Pod Proceess "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  updateEpodErework: async function (req, res) {
    try {
      let updateEpodReworkstatus = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateEpodReworkstatus(
        req.body
      );
      let updateReworkRemarkStatus = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateReworkRemarkStatus(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Serial Number Reworked",
        result: updateEpodReworkstatus.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0850: Error while updating Epod Ere work "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0850: Error while updating Epod Ere work "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  updateEpodEreworkScrap: async function (req, res) {
    req.body.EvolveUser_ID = req.EvolveUser_ID;
    try {
      let getScrapDetails = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getScrapDetails(
        req.body
      );
      if (
        getScrapDetails instanceof Error ||
        getScrapDetails.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on single select",
          result: getScrapDetails.message
        };
        res.send(obj);
      } else {
        let addScrapDetails = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.addScrapDetails(
          req.body,
          getScrapDetails.recordset[0]
        );
        if (
          addScrapDetails instanceof Error ||
          addScrapDetails.rowsAffected < 1
        ) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error While Create Scrap Data",
            result: addScrapDetails.message
          };
          res.send(obj);
        } else {
          let updateEpodScrapStatus = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateEpodScrapStatus(
            req.body
          );
          let updateScrapRemarkStatus = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateScrapRemarkStatus(
            req.body
          );
          if (
            updateScrapRemarkStatus instanceof Error ||
            updateScrapRemarkStatus.rowsAffected < 1
          ) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error While Scrap Serial Number",
              result: addScrapDetails.message
            };
          } else {
            let obj = {
              statusCode: 200,
              status: "success",
              message: "Scrapped Successfully !",
              result: ""
            };
            res.send(obj);
          }
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0851: Error while updating Epod Ere work Scrap "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0851: Error while updating Epod Ere work Scrap "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getAllDoSup: async function (req, res) {
    try {
      let getAllDoSup = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getAllDoSup();
      if (getAllDoSup instanceof Error || getAllDoSup.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "not Found DO And Sup",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: getAllDoSup.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0852: Error while getting All Do Sup "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0852: Error while getting All Do Sup "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getSingleDOSOData: async function (req, res) {
    try {
      // console.log(req.body.EvolveDO_ID);
      let getSingleDOSOData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getSingleDOSOData(
        req.body
      );
      if (
        getSingleDOSOData instanceof Error ||
        getSingleDOSOData.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Data Not Found",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: getSingleDOSOData.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0853: Error while get Single DO SO Data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0853: Error while get Single DO SO Data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getDoLine: async function (req, res) {
    try {
      // console.log(req.body.EvolveDO_ID);
      let getDoLine = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getDoLine(
        req.body
      );
      if (getDoLine instanceof Error || getDoLine.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "DO Line Data Not Found",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: getDoLine.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0854: Error while getting Do Line "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0854: Error while getting Do Line "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // PDI edit

  getPDISingleData: async function (req, res) {
    try {
      // console.log("EvolveDOLine_ID_c", req.body.EvolveDOLine_ID);
      let result = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getPDISingleData(
        req.body
      );
      // console.log("result", result);
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "not do found",
          result: result.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: result.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0855: Error while getting PDI Single Data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0855: Error while getting PDI Single Data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getPDIData: async function (req, res) {
    try {
      // console.log("EvolveDOLine_ID_c", req.body.EvolveDOLine_ID);
      let result = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getPDIData(
        req.body.EvolveDOLine_ID
      );
      // console.log("result", result);
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "not do found",
          result: result.message
        };
        res.send(obj);
      } else {
        console.log("result >>", result);
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: result.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0856: Error while getting PDI Data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0856: Error while getting PDI Data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getAllPdiTempDetail: async function (req, res) {
    // console.log("EvolveDOLine_ID_c", req.body.EvolveDOLine_ID);
    try {
      let result = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getAllPdiTempDetail(
        req.body
      );
      // console.log("result", result);
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "not getAllPdiTempDetail found",
          result: result.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: result.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0857: Error while get All Pdi Temp Detail "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0857: Error while get All Pdi Temp Detail "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  addRejectSerialNo: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let ProdOrderDetailSerial = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getProdOrderSerialId(
        req.body
      );

      if (
        ProdOrderDetailSerial instanceof Error ||
        ProdOrderDetailSerial.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Serial No Not Found",
          result: ProdOrderDetailSerial.message
        };
        res.send(obj);
      } else {
        console.log("ProdOrderDetailSerialGetALL", ProdOrderDetailSerial);
        console.log(
          "ProdOrderDetailSerial",
          ProdOrderDetailSerial.recordset[0]
        );
        let result = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.addRejectSerialNo(
          req.body,
          ProdOrderDetailSerial.recordset[0]
        );
        if (result instanceof Error || result.rowsAffected < 1) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Rework Data Not Add",
            result: result.message
          };
          res.send(obj);
        } else {
          let podUpdateStatus = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.pdiPODUpdateStatus(
            req.body
          );
          if (
            podUpdateStatus instanceof Error ||
            podUpdateStatus.rowsAffected < 1
          ) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "pod Status Not Update",
              result: podUpdateStatus.message
            };
            res.send(obj);
          } else {
            let obj = {
              statusCode: 200,
              status: "success",
              message: "Successfully Add!",
              result: podUpdateStatus.recordsets[0]
            };
            res.send(obj);
          }
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0858: Error while add Reject Serial  No "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0858: Error while add Reject Serial  No "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  pdiReportdataPrint: async function (req, res) {
    try {
      console.log("array Data", req.body.Array);
      for (let i = 0; i < req.body.Array.length; i++) {
        Evolve.PrintJob.push({
          ParaLabel: req.body.Array[i].ParaLabel,
          ParaType: req.body.Array[i].ParaType,
          ParaValue: req.body.Array[i].ParaValue,
          EvolveDOLine_ID: req.body.EvolveDOLine_ID,
          EvolvePDIHistory_Status: req.body.EvolvePDIHistory_Status,
          EvolveProdOrdersDetail_Serial: req.body.EvolveProdOrdersDetail_Serial
        });
      }
      // Evolve.PrintJob.push({
      //   datas: data
      // });

      let obj = {
        statusCode: 200,
        status: "success",
        message: "print suceess Successfuly",
        result: "Success"
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0859: Error while pdi Report data Print "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0859: Error while pdi Report data Print "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  //Do List Controllers made by ravat

  getDoList: async function (req, res) {
    try {
      let result = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getDoList(
        req.body
      );
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on Query",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully",
          result: result.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0860: Error while getting Do List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0860: Error while getting Do List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getallCustomer: async function (req, res) {
    try {
      let result = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getallCustomer(
        req.body
      );
      if (result instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on Query ",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully",
          result: result.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0861: Error while getting all Customer "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0861: Error while getting all Customer "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getSoNumberList: async function (req, res) {
    try {
      let itemNumberList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getSoNumberList();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Item Number List",
        result: itemNumberList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0862: Error while getting So Number List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0862: Error while getting So Number List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getSalesOrderDetails: async function (req, res) {
    try {
      let getDate = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getSalesOrderDetails(
        req.body
      );
      if (getDate instanceof Error || getDate.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on Query",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "So Date gate Successfully",
          result: getDate.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0863: Error while getting Sales Order Details "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0863: Error while getting Sales Order Details "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getDoDetails: async function (req, res) {
    try {
      let getDoDetails = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getDoDetails(
        req.body
      );
      if (getDoDetails.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "So Line Does not exist",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "So Date gate Successfully",
          result: getDoDetails.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0864: Error while getting Do Details "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0864: Error while getting Do Details "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  addDoList: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let doNumber = await Evolve.App.Controllers.Unit.unitControllers.getDoNumber();
      req.body.EvolveDo_Number = doNumber.recordset[0].EvolveUnitConfig_Value;
      let getSoNumber = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getSoNumberById(
        req.body
      );
      if (getSoNumber instanceof Error || getSoNumber.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "error",
          result: null
        };
        res.send(obj);
      }
      let soNumber = getSoNumber.recordset[0].EvolveSalesOrder_Number;
      let addDoList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.addDoList(
        req.body,
        soNumber
      );
      if (addDoList instanceof Error || addDoList.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on Query",
          result: null
        };
        res.send(obj);
      }

      let doLineError = false;
      let array = req.body.doLineArrayData;

      // console.log("length of array >>> " ,array.length )
      // console.log("Arraya is >>>>> " , array)

      for (let i = 0; i < array.length; i++) {
        // console.log("part id is >>>> " , array[i].EvolveSalesOrderLine_Part )
        let part = array[i].EvolveSalesOrderLine_Part;

        // let checkItemAvailable = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.checkItemAvailable(part);
        // console.log("recordset>> checkitem " , checkItemAvailable.rowsAffected)
        // if( checkItemAvailable.rowsAffected <1 )
        // {
        //   console.log("no template id >>")
        // }

        let getTempId = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getTempId(
          part
        );
        if (getTempId.rowsAffected < 1) {
          array[i].EvolvePDITemplate_ID = "";
        } else {
          let tempId = getTempId.recordset[0].EvolvePDITemplate_ID;
          array[i].EvolvePDITemplate_ID = tempId;
        }
        console.log("template id is >>>> ", array[i].EvolvePDITemplate_ID);
      }
      console.log("length of array >> ", array.length);
      for (let i = 0; i < array.length; i++) {
        if (doLineError == false) {
          let indexData = {
            EvolveDO_ID: addDoList.recordset[0].inserted_id,
            EvolveDOLine_Number: i + 1,
            EvolveDOLine_Part: array[i].EvolveSalesOrderLine_Part,
            EvolveDOLine_Custpart: array[i].EvolveSalesOrderLine_Custpart,

            EvolveDOLine_QtyInv: array[i].EvolveSalesOrderLine_InvQty,
            EvolveDOLine_QtyDO: array[i].newDoQty,
            EvolveSalesOrderLine_ID: array[i].EvolveSalesOrderLine_ID,
            EvolvePDITemplate_ID: array[i].EvolvePDITemplate_ID,
            EvolveSoLine_Number: array[i].EvolveSalesOrderLine_Number
          };

          console.log(
            "sales order line id >> ",
            indexData.EvolveSalesOrderLine_ID
          );

          if (indexData.EvolvePDITemplate_ID != "") {
            let addDolineData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.addDoLineData(
              indexData
            );
            // if (addDolineData instanceof Error || addDolineData.rowsAffected < 1) {
            //   doLineError = true;
            // }

            // console.log("Enteri g in salesorder line update in ")

            let updateSaesOrder = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateSaesOrder(
              indexData.EvolveSalesOrderLine_ID,
              parseInt(indexData.EvolveDOLine_QtyDO)
            );

            if (
              updateSaesOrder instanceof Error ||
              updateSaesOrder.rowsAffected < 1
            ) {
              doLineError = true;
            }

            let addDoHistory = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.addDoHistory(
              indexData,
              req.body,
              soNumber
            );
            if (
              addDoHistory instanceof Error ||
              addDoHistory.rowsAffected < 1
            ) {
              doLineError = true;
            }
          } else {
            let addDolineNullPDI = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.addDolineNullPDI(
              indexData
            );
            if (
              addDolineNullPDI instanceof Error ||
              addDolineNullPDI.rowsAffected < 1
            ) {
              doLineError = true;
            }

            let updateSONullPDI = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateSONullPDI(
              indexData.EvolveSalesOrderLine_ID,
              parseInt(indexData.EvolveDOLine_QtyDO)
            );
            // if (addDolineData instanceof Error || addDolineData.rowsAffected < 1) {
            //   doLineError = true;
            // }
            if (
              updateSONullPDI instanceof Error ||
              updateSONullPDI.rowsAffected < 1
            ) {
              doLineError = true;
            }

            let addDoHistoryNullPDI = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.addDoHistoryNullPDI(
              indexData,
              req.body,
              soNumber
            );
            if (
              addDoHistoryNullPDI instanceof Error ||
              addDoHistoryNullPDI.rowsAffected < 1
            ) {
              doLineError = true;
            }
          }
        }
      }
      if (doLineError == false) {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Do Number : " + req.body.EvolveDo_Number
        };
        res.send(obj);
        let doNumber = await Evolve.App.Controllers.Unit.unitControllers.updateDoNumber();
      } else {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error While Add Do Line Data !"
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0865: Error while adding do list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0865: Error while adding do list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getSingleDoData: async function (req, res) {
    try {
      let doData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getSingleDoData(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Shift Single List",
        result: doData.recordset
      };

      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0866: Error while get Single Do Data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0866: Error while get Single Do Data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getSingleDoSoLine: async function (req, res) {
    try {
      let getSingleDoSoLine = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getSingleDoSoLine(
        req.body
      );
      if (
        getSingleDoSoLine instanceof Error ||
        getSingleDoSoLine.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on Query",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "So Date gate Successfully",
          result: getSingleDoSoLine.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0867: Error while getting Single Do So Line "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0867: Error while getting Single Do So Line "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getdoidpdftabledata: async function (req, res) {
    try {
      let result = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getdoidpdftabledata(
        req.body
      );
      if (result instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on Query",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Success",
          result: result.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0868: Error while getting do id pdf table data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0868: Error while getting do id pdf table data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  updateDoList: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;

      let updateDoList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateDoList(
        req.body
      );
      if (updateDoList instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on Query",
          updateDoList: null
        };
        res.send(obj);
      }
      let doLineError = false;
      let array = req.body.doLineArrayData;
      console.log("LEngth of arrry is >> ");
      for (let i = 0; i < array.length; i++) {
        if (doLineError == false) {
          let indexData = {
            EvolveDO_ID: req.body.EvolveDO_ID,
            EvolveDOLine_Number: i + 1,
            EvolveDOLine_Part: array[i].EvolveSalesOrderLine_Part,
            EvolveDOLine_Custpart: array[i].EvolveSalesOrderLine_Custpart,
            EvolveDOLine_QtyInv: array[i].EvolveSalesOrderLine_InvQty,
            EvolveDOLine_QtyDO: array[i].newDoQty,
            EvolveSalesOrderLine_ID: array[i].EvolveSalesOrderLine_ID,
            EvolveDOLine_QtyDOOld: array[i].EvolveDOLine_QtyDO,
            EvolveDOLine_ID: array[i].EvolveDOLine_ID
          };
          let getDoNumberById = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getDoNumberById(
            req.body
          );

          let getPDITemplateID = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getPDITemplateID(
            indexData.EvolveDOLine_ID
          );

          // console.log("recordset of temlate id is >> ", getPDITemplateID.recordsets[0])
          console.log(
            "template id is >> ",
            getPDITemplateID.recordset[0].EvolvePDITemplate_ID
          );
          if (
            getPDITemplateID.recordset[0].EvolvePDITemplate_ID == null ||
            getPDITemplateID.recordset[0].EvolvePDITemplate_ID == "" ||
            getPDITemplateID.recordset[0].EvolvePDITemplate_ID == 0 ||
            getPDITemplateID.recordset[0].EvolvePDITemplate_ID == "NULL"
          ) {
            let updateNonPdiSaesOrder = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateNonPdiSaesOrder(
              indexData.EvolveSalesOrderLine_ID,
              parseInt(indexData.EvolveDOLine_QtyDO),
              indexData.EvolveDOLine_QtyDOOld
            );
            if (
              updateNonPdiSaesOrder instanceof Error ||
              updateNonPdiSaesOrder.rowsAffected < 1
            ) {
              doLineError = true;
            }
            let updateDoQuantity = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateNonPDIDoLineAtUpdate(
              indexData,
              parseInt(indexData.EvolveDOLine_QtyDO),
              req.body.EvolveDO_ID
            );
            if (
              updateDoQuantity instanceof Error ||
              updateDoQuantity.rowsAffected < 1
            ) {
              doLineError = true;
            }

            let updateNonPDIDoHistory = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateNonPDIDoHistory(
              indexData,
              parseInt(indexData.EvolveDOLine_QtyDO),
              req.body,
              getDoNumberById.recordset[0].EvolveDO_Number
            );
            if (
              updateNonPDIDoHistory instanceof Error ||
              updateNonPDIDoHistory.rowsAffected < 1
            ) {
              doLineError = true;
            }
          } else {
            let updateSaesOrder = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateSalesOrderAtUpdate(
              indexData.EvolveSalesOrderLine_ID,
              parseInt(indexData.EvolveDOLine_QtyDO),
              indexData.EvolveDOLine_QtyDOOld
            );
            if (
              updateSaesOrder instanceof Error ||
              updateSaesOrder.rowsAffected < 1
            ) {
              doLineError = true;
            }
            let updateDoQuantity = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateDoLineAtUpdate(
              indexData,
              parseInt(indexData.EvolveDOLine_QtyDO),
              req.body.EvolveDO_ID
            );
            if (
              updateDoQuantity instanceof Error ||
              updateDoQuantity.rowsAffected < 1
            ) {
              doLineError = true;
            }

            let updateDoHistory = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateDoHistory(
              indexData,
              parseInt(indexData.EvolveDOLine_QtyDO),
              req.body,
              getDoNumberById.recordset[0].EvolveDO_Number
            );
            if (
              updateDoHistory instanceof Error ||
              updateDoHistory.rowsAffected < 1
            ) {
              doLineError = true;
            }
          }
        }
      }

      if (doLineError == false) {
        let obj = {
          statusCode: 200,
          status: "success",
          message:
            " Do Number :" + req.body.EvolveDO_Number + " Updated Successfully"
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error While Add Do Line Data !"
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0869: Error while updating Do List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0869: Error while updating Do List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  deleteDoData: async function (req, res) {
    try {
      console.log("do data dekete  ")
      let updateSoLineData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateSoLineData(
        req.body.id
      );
      if (
        updateSoLineData instanceof Error ||
        updateSoLineData.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on deleted Shift",
          result: null
        };
        res.send(obj);
      }
      let deleteDoLineData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.deleteDoLineData(
        req.body.id
      );

      if (
        deleteDoLineData instanceof Error ||
        deleteDoLineData.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on Delete Do Line Data",
          result: null
        };
        res.send(obj);
      }
      let deleteDoData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.deleteDoData(
        req.body.id
      );

      if (deleteDoData instanceof Error || deleteDoData.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error On Delete Do Data ",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "DO Deleted Succsess fully ",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0870: Error while delete Do Data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0870: Error while delete Do Data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getDoDataTable: async function (req, res) {
    try {
      let doItems = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getDoDataTableList(
        req.body
      );
      if (doItems instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Data Not Found",
          result: doItems.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Item List Successfully !",
          result: doItems.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0871: Error while getting Do Data Table "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0871: Error while getting Do Data Table "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getScrap: async function (req, res) {
    try {
      //  console.log("EvolveUser_ID :", req.EvolveUser_ID)
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let search = req.query.search.value;

      let processtomachineCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getScrapCount();
      let processtomachine = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getScrapList(
        start,
        length
      );

      var obj = {
        draw: req.query.draw,
        recordsTotal: processtomachineCount.recordset[0].count,
        recordsFiltered: processtomachineCount.recordset[0].count,
        data: processtomachine.recordset
      };

      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0872: Error while getting Scrap "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0872: Error while getting Scrap "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  changeScrapStatus: async function (req, res) {
    try {
      let changeScrapStatus = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.changeScrapStatus(
        req.body.EvolveScrap_ID
      );
      if (
        changeScrapStatus instanceof Error ||
        changeScrapStatus.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while change the Scrap Status",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Scrap Item Goted Successfully",
          result: changeScrapStatus.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0873: Error while changing scrap status "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0873: Error while changing scrap status "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  addPdiHistory: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let getDoId = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getDoId(
        req.body.EvolveDOLine_ID
      );
      if (getDoId instanceof Error || getDoId.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error",
          result: getDoId.message
        };
        res.send(obj);
      }

      // IF PDI History Have OLD Record So get OLD Serial Number
      let oldSerial = [];
      let getPdiHistorySerialNoData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getPdiHistorySerialNo(
        req.body.EvolveDOLine_ID
      );
      if (
        getPdiHistorySerialNoData instanceof Error ||
        getPdiHistorySerialNoData.rowsAffected < 1
      ) {
        // IT's for New Record.
      } else {
        // It's for Edit Request
        for (let i = 0; i < getPdiHistorySerialNoData.recordset.length; i++) {
          oldSerial.push(
            getPdiHistorySerialNoData.recordset[i].EvolveProdOrdersDetail_Serial
          );
        }
        // console.log("getPdiHistorySerialNoData ::", oldSerial)
        // // let oldSerial
      }

      // Remove All History Data.
      await Evolve.App.Services.SmartFactory.EsmartFactoryServices.deletePdiHistory(
        req.body.EvolveDOLine_ID
      );

      let countSerial = 0;
      let serialNo = "";
      for (let i = 0; i < req.body.pdiDataRecords.length; i++) {
        if (
          req.body.pdiDataRecords[i].ParaLabel == "Axle Serial Number" &&
          req.body.pdiDataRecords[i].ParaValue != ""
        ) {
          countSerial++;
          serialNo = req.body.pdiDataRecords[i].ParaValue;
          // Save Production Order History PDI status 1
          await Evolve.App.Services.SmartFactory.EsmartFactoryServices.changePdiStatus(
            serialNo,
            1
          );
        }
        if (-1 != oldSerial.indexOf(serialNo)) {
          oldSerial.splice(oldSerial.indexOf(serialNo), 1);
        }

        // console.log("serial no is ??? " ,serialNo )
        console.log(
          "pdi line id >> ",
          req.body.pdiDataRecords[i].EvolvePDILine_ID
        );
        if (
          serialNo != "" ||
          req.body.pdiDataRecords[i].EvolvePDILine_ID == 0
        ) {
          console.log("eneter in >> sr  no ", serialNo);
          let data = {
            EvolvePDIHistory_Key:
              req.body.pdiDataRecords[i].EvolvePDIHistory_Key,
            ParaLabel: req.body.pdiDataRecords[i].ParaLabel,
            ParaType: req.body.pdiDataRecords[i].ParaType,
            ParaValue: req.body.pdiDataRecords[i].ParaValue,
            EvolvePDILine_ID: req.body.pdiDataRecords[i].EvolvePDILine_ID,
            EvolveDOLine_ID: req.body.EvolveDOLine_ID,
            EvolvePDIHistory_Status: req.body.EvolvePDIHistory_Status,
            EvolveDO_ID: getDoId.recordset[0].EvolveDO_ID,
            EvolvePDITemplate_ID: getDoId.recordset[0].EvolvePDITemplate_ID,
            EvolveProdOrdersDetail_Serial:
              req.body.EvolveProdOrdersDetail_Serial
          };
          let addPdiHistoryData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.addPdiHistoryData(
            data,
            req.body.EvolveUser_ID,
            serialNo
          );
          if (
            addPdiHistoryData instanceof Error ||
            addPdiHistoryData.rowsAffected < 1
          ) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "PDI Data Update failed",
              result: "Data Update failed"
            };
            res.send(obj);
          }
        }
      }

      // Remove Serial number Form PDI History
      for (let h = 0; h < oldSerial.length; h++) {
        await Evolve.App.Services.SmartFactory.EsmartFactoryServices.changePdiStatus(
          oldSerial[h],
          0
        );
      }
      let getDoNumberById = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getDoNumberById(
        getDoId.recordset[0]
      );
      if (
        getDoNumberById instanceof Error ||
        getDoNumberById.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Data Update failed",
          result: "Data Update failed"
        };
        res.send(obj);
      }

      let getCurrentQty = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getCurrentQty(
        getDoNumberById.recordset[0].EvolveDO_Number,
        getDoId.recordset[0].EvolveDOLine_Number
      );
      if (getCurrentQty instanceof Error || getCurrentQty.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Data Update failed",
          result: "Data Update failed"
        };
        res.send(obj);
      }

      if (getCurrentQty.recordset[0].EvolveDoLine_DoQty >= countSerial) {
        let updateDoHistoryPdiQty = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateDoHistoryPdiQty(
          getDoNumberById.recordset[0].EvolveDO_Number,
          getDoId.recordset[0].EvolveDOLine_Number,
          countSerial,
          getDoId.recordset[0].EvolvePDITemplate_ID,
          req.body
        );

        if (
          updateDoHistoryPdiQty instanceof Error ||
          updateDoHistoryPdiQty.rowsAffected < 1
        ) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Data Update failed",
            result: "Data Update failed"
          };
          res.send(obj);
        }
      }
      let obj = {
        statusCode: 200,
        status: "success",
        message: "PDI Data add Suucessfully",
        result: "Data add Suucessfully"
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0874: Error while adding Pdi History "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0874: Error while adding Pdi History "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  pdiImageUpload: async function (req, res) {
    try {
      console.log("Req.Body :>>>>", req.body.base64);
      let d = new Date();
      let time = d.getTime();
      let extention = req.body.base64.substring(
        "data:image/".length,
        req.body.base64.indexOf(";base64")
      );
      let fileName = time + "_pdi." + extention;
      let base64Data = req.body.base64.replace(/^data:image\/png;base64,/, "");
      base64Data = req.body.base64.replace(/^data:image\/jpeg;base64,/, "");
      Evolve.Fs.writeFile(
        Evolve.Config.imageUploadPath + fileName,
        base64Data,
        "base64",
        function (err) {
          if (err) {
            console.log(err);
            res.json(0);
          } else {
            console.log("The file was saved!");
            res.json(fileName);
          }
        }
      );
    } catch (error) {
      Evolve.Log.error(" EERR0875: Error while pdi Image Upload "+error.message);
      res.json(0);
    }
  },

  checkSerialNo: async function (req, res) {
    try {
      let checkSerialNoInPdiHistory = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.checkSerialNoInPdiHistory(
        req.body.EvolveProdOrdersDetail_Serial
      );

      if (checkSerialNoInPdiHistory.rowsAffected >= 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Serial No Already Exist "
        };
        res.send(obj);
      }

      let checkSerialNo = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.checkSerialNo(
        req.body
      );
      if (checkSerialNo.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Invalid Serial Number"
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "succsess",
          message: "Valid Serial Number",
          result: checkSerialNo.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0876: Error while checking serial no "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0876: Error while checking serial no "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  deleteDoLine: async function (req, res) {
    try {
      let getDoLineDetails = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getDoSoLineDetails(
        req.body
      );
      if (
        getDoLineDetails instanceof Error ||
        getDoLineDetails.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error While Found DO Line"
        };
        res.send(obj);
      } else {
        let doLineData = getDoLineDetails.recordset[0];
        doLineData.EvolveDOLine_QtyPDI = 0;
        if (parseInt(doLineData.EvolveDOLine_QtyPDI) > 0) {
          pdiQty = doLineData.EvolveDOLine_QtyPDI;
          // Delete PDI History based on Do Line ID
          let deletePDIHistoryDoLine = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.deletePDIHistoryDoLine(
            req.body
          );
          if (
            deletePDIHistoryDoLine instanceof Error ||
            deletePDIHistoryDoLine.rowsAffected < 1
          ) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error on Delete PDI Qty",
              result: null
            };
            res.send(obj);
          }
        } else {
          doLineData.EvolveDOLine_QtyPDI = 0;
        }

        //Update SO Qty
        let updateSoLineDetails = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateSoLineDetails(
          doLineData
        );
        if (
          updateSoLineDetails instanceof Error ||
          updateSoLineDetails.rowsAffected < 1
        ) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error on Update SO Line",
            result: null
          };
          res.send(obj);
        } else {
          //DO Line
          let deleteDoLine = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.deleteDoLine(
            doLineData
          );
          if (deleteDoLine instanceof Error || deleteDoLine.rowsAffected < 1) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error on Delete DO Line",
              result: null
            };
            res.send(obj);
          } else {
            let obj = {
              statusCode: 200,
              status: "success",
              message: "DO Line Deleted Successfully !",
              result: null
            };
            res.send(obj);
          }
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0877: Error while deleting Do line "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0877: Error while deleting Do line "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  printDoLable: async function (req, res) {
    try {
      let getDoLineDetails = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getDoLineDetails(
        req.body
      );
      if (
        getDoLineDetails instanceof Error ||
        getDoLineDetails.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while change the Scrap Status",
          result: null
        };
        res.send(obj);
      } else {
        // ^XA
        // ^FX
        // ^CF0,25
        // ^FO10,10^FDDO Number : DR190533^FS
        // ^FO10,40^FDCustomer : Seamless Autotech Pvt Ltd.^FS
        // ^FO10,70^FDVehicle Number : MH14DM-7403^FS
        // ^FO10,95^FDItem Code : 5023=KTX17AF0K1850^FS
        // ^FO10,120
        // ^FB450,4,,
        // ^FDItem Description : AXLE 6"SQ,ISOM22x2.510*335,420*180,I/B,TM-A^FS
        // ^FO156,220^FDQuality Inspected^FS
        // ^PQ2,0,1,Y
        console.log(
          "qty----->>>>>>>",
          parseInt(getDoLineDetails.recordset[0].EvolveDOLine_QtyDO)
        );
        let ZplData =
          "^XZ\r\n" +
          "^XA\r\n" +
          "^FX\r\n" +
          "^CF0,25\r\n" +
          "^FO10,10^FDDO Number : " +
          getDoLineDetails.recordset[0].EvolveDO_Number +
          "^FS\r\n" +
          "^FO10,40^FDCustomer : " +
          getDoLineDetails.recordset[0].EvolveSupplier_Name +
          "^FS\r\n" +
          "^FO10,70^FDVehicle Number : " +
          getDoLineDetails.recordset[0].EvolveDO_VehicelNumber +
          "^FS\r\n" +
          "^FO10,95^FDItem Code : " +
          getDoLineDetails.recordset[0].EvolveItem_Code +
          "^FS\r\n" +
          "^FO10,120\r\n" +
          "^FB450,4,,\r\n" +
          "^FDItem Description : " +
          getDoLineDetails.recordset[0].EvolveItem_Desc +
          "^FS\r\n" +
          "^FO156,220^FDQuality Inspected^FS\r\n" +
          "^PQ" +
          parseInt(getDoLineDetails.recordset[0].EvolveDOLine_QtyDO) +
          ",0,1,Y\r\n" +
          "^XZ";
        Evolve.Fs.writeFile(
          Evolve.Config.dirWorkOrderPrint +
          "/" +
          getDoLineDetails.recordset[0].EvolveDO_Number +
          ".txt",
          ZplData,
          function (err) {
            if (err) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error In Do Lable",
                result: null
              };
              res.send(obj);
            } else {
              let obj = {
                statusCode: 200,
                status: "success",
                message: "Do Lable Printed",
                result: null
              };
              res.send(obj);
            }
          }
        );
      }
    } catch (error) {
      Evolve.Log.error(" EERR0878: Error while printing Do Lable "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0878: Error while printing Do Lable "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  //production booking

  getWorkOrders: async function (req, res) {
    try {
      let getWorkOrders = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getWorkOrders();
      if (getWorkOrders instanceof Error || getWorkOrders.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Data Not Found",
          result: getWorkOrders.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Work Order get  Successfully !",
          result: getWorkOrders.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0879: Error while getting Work Orders "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0879: Error while getting Work Orders "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getProductionOrdersItemNumber: async function (req, res) {
    try {
      let productionOrdersItemNumberList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getProductionOrdersItemNumber();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Production Orders Item Number List",
        result: productionOrdersItemNumberList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0880: Error while getting Production Orders Item Number "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0880: Error while getting Production Orders Item Number "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  workOrderByItem: async function (req, res) {
    try {
      let workOrderByID = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.workOrderByItem(
        req.body.EvolveItem_ID
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Production Orders Item Number List",
        result: workOrderByID.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0881: Error while work Order By Item "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0881: Error while work Order By Item "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  ItemByWorkOrder: async function (req, res) {
    // console.log(" select item by work order     " , req.body)
    try {
      let itemByWorkOrder = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.ItemByWorkOrder(
        req.body.EvolveProdOrders_ID
      );

      let obj = {
        statusCode: 200,
        status: "success",
        message: "",
        result: itemByWorkOrder.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0882: Error in Item By Work Order "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0882: Error in Item By Work Order "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getItemDetailsById: async function (req, res) {
    try {
      let getItemData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getItemDetailsById(
        req.body.EvolveItem_ID
      );

      // console.log( getItemData.recordsets[0])
      let obj = {
        statusCode: 200,
        status: "success",
        message: "",
        result: getItemData.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0883: Error while getting Item Details By Id "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0883: Error while getting Item Details By Id "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  checkTotalSerialNo: async function (req, res) {
    try {
      let checkTotalSerialNo = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.checkTotalSerialNo(
        req.body.EvolveProdOrders_ID
      );

      // console.log( "serial no record set >>>> " , checkTotalSerialNo.recordsets[0])
      let obj = {
        statusCode: 200,
        status: "success",
        message: "",
        result: checkTotalSerialNo.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0884: Error while check Total Serial No "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0884: Error while check Total Serial No "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  changeWorkOrderStatus: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let changeWorkOrderStatus = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.changeWorkOrderStatus(
        req.body.EvolveProdOrders_ID,
        req.body.EvolveUser_ID
      );

      // console.log( "change work order status  " , changeWorkOrderStatus.recordsets[0])
      let obj = {
        statusCode: 200,
        status: "success",
        message: "",
        result: changeWorkOrderStatus.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0885: Error while changing Work Order Status "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0885: Error while changing Work Order Status "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getItem: async function (req, res) {
    // console.log("SEARCH TERM IS >>>>> " , req.body.term)
    try {
      let poList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getItem(
        req.body.term
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Item List",
        result: poList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0886: Error while getting Item "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0886: Error while getting Item "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getCustCode: async function (req, res) {
    // console.log("SEARCH TERM IS >>>>> " , req.body.term)
    try {
      let poList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getCustCode(
        req.body.term
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Item List",
        result: poList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0887: Error while getting cust code "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0887: Error while getting cust code "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getMachine: async function (req, res) {
    // console.log("SEARCH TERM IS >>>>> " , req.body.term)
    try {
      let poList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMachine(
        req.body.term
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Item List",
        result: poList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0888: Error while getting Machine "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0888: Error while getting Machine "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  /** Reports Start Here */
  // Production Reports

  getProductionReports: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let searchData = {
        startDate: req.query.startDate,
        endDate: req.query.endDate
      };
      let andkey = true;
      let condition = "";
      if (req.query.startDate != "" && req.query.endDate != "") {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition =
          condition +
          "cast(epodh.EvolveProdOrderHistory_CreatedAt as date) >=" +
          "'" +
          req.query.startDate +
          "'" +
          " and cast(epodh.EvolveProdOrderHistory_UpdatedAt as date) <=" +
          "'" +
          req.query.endDate +
          "'";
        andkey = true;
      }
      if (req.query.processId != "") {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition += " epodh.EvolveProcess_ID=" + parseInt(req.query.processId);
        andkey = true;
      }

      if (req.query.machineId != "") {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition += " epodh.EvolveMachine_ID=" + parseInt(req.query.machineId);
        andkey = true;
      }
      if (req.query.fromSerial != '' && req.query.toSerial != '') {
        if (andkey == true) { condition = condition + " AND "; }
        condition += " epodh.EvolveProdOrdersDetail_Serial LIKE BETWEEN  " + "'" + req.query.fromSerial + "'" + " AND " + "'" + req.query.toSerial + "'";
        andkey = true;
      }
      if (req.query.itemId != "") {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition += " epodh.EvolveItem_ID=" + parseInt(req.query.itemId);
        andkey = true;
      }
      if (
        req.query.radioValue != "" &&
        req.query.radioValue == "Completed OR Rejected"
      ) {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition +=
          " epodh.EvolveProdOrdersDetails_Status=" +
          "'" +
          req.query.radioValue.slice(0, 9) +
          "'" +
          "  OR  epodh.EvolveProdOrdersDetails_Status=" +
          "'" +
          req.query.radioValue.slice(13, 21) +
          "'";
        andkey = true;
      }
      if (req.query.radioValue != "" && req.query.radioValue == "In Process") {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition +=
          " epodh.EvolveProdOrdersDetails_Status= '" +
          req.query.radioValue +
          "'";
        andkey = true;
      }

      let dataTblCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getProductionReportsCount(
        searchData,
        condition,
        req.query.radioValue
      );
      if (length == -1) {
        length = dataTblCount.recordset[0].count;
      }
      let dataTblRecord = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getProductionReportsDatatableList(
        start,
        length,
        condition,
        req.query.radioValue
      );

      var obj = {
        draw: req.query.draw,
        recordsTotal: dataTblCount.recordset[0].count,
        recordsFiltered: dataTblCount.recordset[0].count,
        data: dataTblRecord.recordset
      };

      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0889: Error while getting Production Reports "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0889: Error while getting Production Reports "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getDoStatusReport: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let searchData = {
        startDate: req.query.startDate,
        endDate: req.query.endDate
      };

      let andkey = false;
      let condition = "";

      if (req.query.radioValue != "") {
        condition = condition + " AND ";
        if (req.query.radioValue == "All") {
          condition +=
            "(edoh.EvolveDoLine_Status= 'close'  OR  edoh.EvolveDoLine_Status = 'open')";
        } else {
          condition +=
            "edoh.EvolveDoLine_Status= '" + req.query.radioValue + "'";
        }

        andkey = true;
      } else {
        andkey = true;
      }

      if (req.query.doNumber != "") {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition += " edoh.EvolveDo_Number LIKE '" + req.query.doNumber + "'";
        andkey = true;
      }

      if (req.query.soNumber != "") {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition += " edoh.EvolveSo_Number LIKE '" + req.query.soNumber + "'";
        andkey = true;
      }
      if (req.query.custId != "") {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition +=
          " ( (SELECT es.EvolveSupplier_ID FROM EvolveSupplier es WHERE es.EvolveSupplier_Code LIKE  eso.EvolveSalesOrder_Billto) = " +
          req.query.custId +
          ")";
        andkey = true;
      }

      let dataTblCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getDoStatusReportCount(
        condition
      );
      if (length == -1) {
        length = dataTblCount.recordset[0].count;
      }
      let dataTblRecord = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getDoStatusReportDatatableList(
        start,
        length,
        condition
      );

      var obj = {
        draw: req.query.draw,
        recordsTotal: dataTblCount.recordset[0].count,
        recordsFiltered: dataTblCount.recordset[0].count,
        data: dataTblRecord.recordset
      };
      // console.log(obj);
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0890: Error while getting Do Status Report "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0890: Error while getting Do Status Report "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getRejectedSrNo: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let searchData = {
        startDate: req.query.startDate,
        endDate: req.query.endDate
      };
      let andkey = false;
      let condition = "WHERE";
      if (req.query.startDate != "" && req.query.endDate != "") {
        // condition = condition+" AND ";
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition =
          condition +
          " cast(ers.EvolveReworkSrNo_CreatedAt as date) >=" +
          "'" +
          req.query.startDate +
          "'" +
          " and cast(ers.EvolveReworkSrNo_UpdatedAt as date) <=" +
          "'" +
          req.query.endDate +
          "'";
        andkey = true;
      }

      if (req.query.serialNo != "") {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition +=
          " ers.EvolveProdOrdersDetail_Serial='" + req.query.serialNo + "'";
        andkey = true;
      }
      let dataTblCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getRejectedSrNoCount(
        searchData,
        condition
      );
      if (length == -1) {
        length = dataTblCount.recordset[0].count;
      }
      let dataTblRecord = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getRejectedSrNoDatatableList(
        start,
        length,
        condition
      );
      var obj = {
        draw: req.query.draw,
        recordsTotal: dataTblCount.recordset[0].count,
        recordsFiltered: dataTblCount.recordset[0].count,
        data: dataTblRecord.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0891: Error while getting Rejected Sr No "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0891: Error while getting Rejected Sr No "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getCustomerWiseReport: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let searchData = {
        startDate: req.query.startDate,
        endDate: req.query.endDate
      };
      let andkey = false;
      let condition = "";
      // if (req.query.startDate != '' && req.query.endDate != '') {
      //   // condition = condition+" AND ";
      //   if (andkey == true) { condition = condition + " AND "; }
      //   condition = condition + " cast(ers.EvolveReworkSrNo_CreatedAt as date) >=" + "'" + req.query.startDate + "'" + " and cast(ers.EvolveReworkSrNo_UpdatedAt as date) <=" + "'" + req.query.endDate + "'";
      //   andkey = true;
      // }

      // if (req.query.serialNo != '') {
      //   if (andkey == true) { condition = condition + " AND "; }
      //   condition += " ers.EvolveProdOrdersDetail_Serial='" + req.query.serialNo + "'"
      //   andkey = true;
      // }
      let dataTblCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getCustomerWiseReportCount(
        condition
      );
      if (length == -1) {
        length = dataTblCount.recordset[0].count;
      }
      let dataTblRecord = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getCustomerWiseReportDatatableList(
        start,
        length,
        condition
      );
      var obj = {
        draw: req.query.draw,
        recordsTotal: dataTblCount.recordset[0].count,
        recordsFiltered: dataTblCount.recordset[0].count,
        data: dataTblRecord.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0892: Error while getting Customer Wise Report "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0892: Error while getting Customer Wise Report "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getAllItemList: async function (req, res) {
    try {
      let poList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getAllItemList(
        req.body.term
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Item List",
        result: poList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0893: Error while getting All Item List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0893: Error while getting All Item List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getshiftList: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let getshiftList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getshiftList(
        req.EvolveUser_ID,
        start,
        length
      );
      if (getshiftList instanceof Error || getshiftList.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on  Item LIst",
          result: getshiftList.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Shift List Successfully !",
          result: getshiftList.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0894: Error while getting shift list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0894: Error while getting shift list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getMachineList: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let getMachineList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMachineList(
        req.EvolveUser_ID,
        start,
        length
      );
      if (getMachineList instanceof Error || getMachineList.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on  Item LIst",
          result: getMachineList.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: " Machine list Successfully !",
          result: getMachineList.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0895: Error while getting machine list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0895: Error while getting machine list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getProcessList: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let getProcessListData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getProcessList(
        req.EvolveUser_ID,
        start,
        length
      );
      if (
        getProcessListData instanceof Error ||
        getProcessListData.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on  Item LIst",
          result: getProcessListData.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: " Machine list Successfully !",
          result: getProcessListData.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0896: Error while getting Process List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0896: Error while getting Process List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // getCustCode: async function (req, res) {
  //   try {
  //     let start = parseInt(req.query.start);
  //     let length = parseInt(req.query.length);
  //     let getCustCodeData = await  Evolve.App.Services.SmartFactory.EsmartFactoryServices.getCustCode(req.EvolveUser_ID, start, length);
  //     if (getCustCodeData instanceof Error || getCustCodeData.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on  Item LIst",
  //         result: getCustCodeData.message
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: " Machine list Successfully !",
  //         result: getCustCodeData.recordsets[0]
  //       };
  //       res.send(obj);
  //     }

  //   } catch (error) {
  //     Evolve.Log.error(" "+error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: " "+error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  getProductionHistoryReport: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let search = req.query.search.value;
      let searchData = {
        startDate: req.query.startDate,
        endDate: req.query.endDate
      };

      let andkey = false;
      let condition = "AND ";
      if (req.query.startDate != "" && req.query.endDate != "") {
        // condition = condition+" AND ";
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition =
          condition +
          "cast(epodh.EvolveProdOrderHistory_CreatedAt as date) >=" +
          "'" +
          req.query.startDate +
          "'" +
          " and cast(epodh.EvolveProdOrderHistory_UpdatedAt as date) <=" +
          "'" +
          req.query.endDate +
          "'";
        andkey = true;
      }

      if (req.query.processId != "") {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition +=
          " epodh.EvolveProcess_ID = " + parseInt(req.query.processId);
        andkey = true;
      }

      if (req.query.fromSerial != "") {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition +=
          " epodh.EvolveProdOrdersDetail_Serial >= '" +
          req.query.fromSerial +
          "'";
        andkey = true;
      }

      if (req.query.itemId != "") {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition += " epodh.EvolveItem_ID=" + parseInt(req.query.itemId);
        andkey = true;
      }

      let dataTblCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getProductionHistoryReportsCount(
        searchData,
        condition
      );
      if (length == -1) {
        length = dataTblCount.recordset[0].count;
      }
      let dataTblRecord = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getProductionHistoryReportsDatatableList(
        start,
        length,
        condition
      );

      var obj = {
        draw: req.query.draw,
        recordsTotal: dataTblCount.recordset[0].count,
        recordsFiltered: dataTblCount.recordset[0].count,
        data: dataTblRecord.recordset
      };
      // console.log(obj);
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0897: Error while getting Production History Report "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0897: Error while getting Production History Report "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getMachineWiseProdReports: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);

      let search = req.query.search.value;
      let searchData = {
        startDate: req.query.startDate,
        endDate: req.query.endDate
      };

      let andkey = false;
      let condition = "AND ";
      if (req.query.startDate != "" && req.query.endDate != "") {
        // condition = condition+" AND ";
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition =
          condition +
          "cast(epoh.EvolveProdOrderHistory_CreatedAt as date) >=" +
          "'" +
          req.query.startDate +
          "'" +
          " and cast(epoh.EvolveProdOrderHistory_CreatedAt as date) <=" +
          "'" +
          req.query.endDate +
          "'";
        andkey = true;
      }

      if (req.query.itemId != "") {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition += " epoh.EvolveItem_ID = " + parseInt(req.query.itemId);
        andkey = true;
      }

      if (req.query.machineId != "") {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition +=
          " epoh.EvolveMachine_ID = " + parseInt(req.query.machineId);
        andkey = true;
      }

      let dataTblCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMachineWiseProdReportsCount(
        searchData,
        condition
      );
      if (length == -1) {
        length = dataTblCount.recordset.length;
      }
      let dataTblRecord = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMachineWiseProdReportsDatatableList(
        start,
        length,
        condition
      );

      var obj = {
        draw: req.query.draw,
        recordsTotal: dataTblCount.recordset.length,
        recordsFiltered: dataTblCount.recordset.length,
        data: dataTblRecord.recordset
      };
      // console.log(obj);
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0898: Error while getting Machine Wise Prod Reports "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0898: Error while getting Machine Wise Prod Reports "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  // History Tracking Report

  getHistoryTrackReport: async function (req, res) {
    try {
      let condition = "WHERE";
      let andkey = false;
      if (req.body.fromSerialNo != "" && req.body.toSerialNo != "") {
        if (andkey == true) {
          condition = condition + " AND";
        }
        condition =
          condition +
          " epoh.EvolveProdOrdersDetail_Serial > = '" +
          req.body.fromSerialNo +
          "' AND epoh.EvolveProdOrdersDetail_Serial < = '" +
          req.body.toSerialNo +
          "'";
        andkey = true;
      } else if (req.body.fromdate != "" && req.body.todate != "") {
        if (andkey == true) {
          condition = condition + " AND";
        }
        condition =
          condition +
          " CAST(epoh.EvolveProdOrderHistory_CreatedAt AS date) > = '" +
          req.body.fromdate +
          "' AND CAST(epoh.EvolveProdOrderHistory_UpdatedAt AS date) < = '" +
          req.body.todate +
          "'";
        andkey = true;
      }
      let result = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getHistoryTrackReport(
        condition
      );

      if (result.rowsAffected instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "No History Found",
          result: null
        };
        res.send(obj);
      } else {
        let historydata = [];
        for (let i = 0; i < result.recordset.length; i++) {
          let processStartTime;
          if (result.recordset[i].start_time != null) {
            processStartTime = result.recordset[i].start_time;
          } else {
            processStartTime = "-";
          }
          let processEndTime;
          if (result.recordset[i].end_time != null) {
            processEndTime = result.recordset[i].end_time;
          } else {
            processEndTime = "-";
          }
          let status;
          if (result.recordset[i].prod_status != null) {
            status = result.recordset[i].prod_status;
          } else {
            status = "-";
          }

          historydata.push({
            "Serial Number": result.recordset[i].EvolveProdOrdersDetail_Serial,
            "Work Order Number": result.recordset[i].EvolveProdOrders_Order,
            "Item Code": result.recordset[i].EvolveItem_Code,
            Template: result.recordset[i].EvolveProcessTemp_Name,
            Status: status,
            Section: result.recordset[i].EvolveSection_Name,
            Machine: result.recordset[i].EvolveMachine_Name,
            "Process Name": result.recordset[i].EvolveProcess_Name,
            "Process Start Time": processStartTime,
            "Process End Time": processEndTime,
            "Process Action":
              result.recordset[i].EvolveProdOrderHistoryType_Code,
            "Validation Name": result.recordset[i].EvolveProcessVal_Desc,
            Value: result.recordset[i].EvolveProcess_Value
          });
        }

        Evolve.CsvExport(historydata, function (err, csv) {
          if (err) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "CSV Report Failed",
              result: null
            };
            res.send(obj);
          } else {
            let d = new Date();
            let CsvName = "history_report_" + d.getTime() + ".csv";
            Evolve.Fs.writeFile(
              Evolve.Config.csvReportPath + "/" + CsvName,
              csv,
              function (err) {
                if (err) {
                  let obj = {
                    statusCode: 200,
                    status: "faild",
                    message: "CSV Report Generation Fail ..!",
                    result: ""
                  };
                  res.send(obj);
                } else {
                  let obj = {
                    statusCode: 200,
                    status: "succsess",
                    message: "CSV Report",
                    result: "/" + CsvName
                  };
                  res.send(obj);
                }
              }
            );
          }
        });
      }
    } catch (error) {
      Evolve.Log.error(" EERR0899: Error while getting History Track Report "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0899: Error while getting History Track Report "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  csvReport: async function (req, res) {
    try {
      let csvData = [
        {
          name: "Evolve",
          city: "Ahmedabad City"
        }
      ];

      Evolve.CsvExport(csvData, function (err, csv) {
        if (err) {
          let obj = {
            statusCode: 200,
            status: "faild",
            message: "CSV Report Failed",
            result: ""
          };
          res.send(obj);
        } else {
          let d = new Date();
          let CsvName = "csv_report_" + d.getTime() + ".csv";
          Evolve.Fs.writeFile(
            Evolve.Config.csvReportPath + "/" + CsvName,
            csv,
            function (err) {
              if (err) {
                let obj = {
                  statusCode: 200,
                  status: "faild",
                  message: "CSV Report Failed",
                  result: ""
                };
                res.send(obj);
              } else {
                let obj = {
                  statusCode: 200,
                  status: "succsess",
                  message: "CSV Report",
                  result: "/" + CsvName
                };
                res.send(obj);
              }
            }
          );
        }
      });
    } catch (error) {
      Evolve.Log.error(" EERR0900: Error in CSV report "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0900: Error in CSV report "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getComponantItemList: async function (req, res) {
    try {
      let getComponantList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getComponantItemList(
        req.body
      );
      if (
        getComponantList instanceof Error ||
        getComponantList.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Componant List Not Found",
          result: getComponantList.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Componant List Goted Successfully !",
          result: getComponantList.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0901: Error while getting component item list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0901: Error while getting component item list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  rejectComponantItem: async function (req, res) {
    req.body.EvolveUser_ID = req.EvolveUser_ID;
    try {
      let getComponantItem = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getComponantItem(
        req.body
      );
      if (
        getComponantItem instanceof Error ||
        getComponantItem.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error While Reject Componant",
          result: getComponantItem.message
        };
        res.send(obj);
      } else {
        let totalIssueQty =
          parseInt(getComponantItem.recordset[0].EvolvePickList_QtyIss) -
          parseInt(getComponantItem.recordset[0].EvolvePickList_QtyReturn);
        if (totalIssueQty >= req.body.EvolvePickList_QtyReturn) {
          req.body.EvolvePickList_ID =
            getComponantItem.recordset[0].EvolvePickList_ID;
          let updateRejectedComponantQty = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.updateRejectedComponantQty(
            req.body
          );
          if (
            updateRejectedComponantQty instanceof Error ||
            updateRejectedComponantQty.rowsAffected < 1
          ) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error While Reject Componant",
              result: updateRejectedComponantQty.message
            };
            res.send(obj);
          } else {
            let addComponentHistory = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.addComponentHistory(getComponantItem.recordset[0], req.body);
            if (addComponentHistory instanceof Error || addComponentHistory.rowsAffected < 1) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error While Add Reject Componant History",
                result: addComponentHistory.message
              };
              res.send(obj);
            } else {
              let obj = {
                statusCode: 200,
                status: "success",
                message: "Componant Item Rejected Successfully ",
                result: null
              };
              res.send(obj);
            }
          } // if (updateRejectedComponantQty instanceof Error || updateRejectedComponantQty.rowsAffected < 1)
        } else {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Return Qty Should Be Less Than Issue Qty",
            result: getComponantItem.message
          };
          res.send(obj);
        } //if(totalIssueQty >= req.body.EvolvePickList_QtyReturn)
      } //if (getComponantItem instanceof Error || getComponantItem.rowsAffected < 1)
    } catch (error) {
      Evolve.Log.error(" EERR0902: Error while rejecting Componant Item "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0902: Error while rejecting Componant Item "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getSalesOrderList: async function (req, res) {
    try {
      let getSalesOrderList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getSalesOrderList();
      if (
        getSalesOrderList instanceof Error ||
        getSalesOrderList.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Sales Order Not Found",
          result: getSalesOrderList.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Sales Order Goted Successfully !",
          result: getSalesOrderList.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0903: Error while getting sales order list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0903: Error while getting sales order list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getPickListBySoNumberCount: async function (req, res) {
    try {
      let picklistCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getPickListBySoNumberCountList(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Item List",
        result: picklistCount.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0904: Error while getting Pick List By So Number Count "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0904: Error while getting Pick List By So Number Count "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  generateSoPickList: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      req.body.EvolveCompany_ID = req.EvolveCompany_ID;
      req.body.EvolveUnit_ID = req.EvolveUnit_ID;
      let generateSoPickList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.generateSoPickList(
        req.body
      );
      if (
        generateSoPickList instanceof Error ||
        generateSoPickList.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: generateSoPickList.message,
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Picklist Generated Successfully !",
          result: []
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0905: Error while generating So Pick List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0905: Error while generating So Pick List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getPickListBySalesOrder: async function (req, res) {
    try {
      // console.log("req.query.EvolveSection_ID ::", req.query)
      let start = parseInt(req.body.start);
      let length = parseInt(req.body.length);
      let searchData = {
        EvolveSalesOrder_ID: req.body.EvolveSalesOrder_ID
      };
      if (req.body.EvolveSalesOrder_ID != "") {
        let pickListCount = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getPickListBySalesOrderCount(
          searchData
        );
        let pickList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getPickListBySalesOrderDatatableList(
          start,
          length,
          searchData
        );
        let obj = {
          draw: req.body.draw,
          recordsTotal: pickListCount.recordset[0].count,
          recordsFiltered: pickListCount.recordset[0].count,
          data: pickList.recordset
        };
        console.log(obj);
        res.send(obj);
      } else {
        let obj = {
          draw: req.query.draw,
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0906: Error while getting Pick List By Sales Order "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0906: Error while getting Pick List By Sales Order "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  // getMillingCompletedTriggers: async function(req, res) {
  //   try {
  //     let woList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getMillingCompletedTriggers();
  //       if(woList instanceof Error || woList.rowsAffected < 1){
  //         let obj = { statusCode: 400, status: "fail", message: "No Work Order Found!", result: null };
  //         res.send(obj);
  //       } else {
  //         let obj = { statusCode: 200, status: "success", message: "Work Order List Successfully", result: woList.recordset[0] };
  //         res.send(obj);
  //       }
  //   } catch (error) {
  //       Evolve.Log.error(error.message);
  //       let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
  //       res.send(obj);
  //   }
  // },
  // getVibrationCompletedTriggers: async function(req, res) {
  //   try {
  //     let woList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getVibrationCompletedTriggers();
  //       if(woList instanceof Error || woList.rowsAffected < 1){
  //         let obj = { statusCode: 400, status: "fail", message: "No Work Order Found!", result: null };
  //         res.send(obj);
  //       } else {
  //         let obj = { statusCode: 200, status: "success", message: "Work Order List Successfully", result: woList.recordset[0] };
  //         res.send(obj);
  //       }
  //   } catch (error) {
  //       Evolve.Log.error(error.message);
  //       let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
  //       res.send(obj);
  //   }
  // },
   

  /** Reports End Here */
};

function pad(number, length) {
  var str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
}
