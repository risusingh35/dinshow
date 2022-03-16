'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

  getProductionPlanList: async function (req, res) {
    try {
      let start = parseInt(req.body.start);
      let length = parseInt(req.body.length);
      // let search = req.body.search.value;
      let searchData = {
        startDate: req.body.startDate,
        endDate: req.body.endDate
      };
      let proPlanCount = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.getProductionPlanListCountList(searchData);
      let proPlan = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.getProductionPlanListDatatableList(start, length, searchData);


      var obj = {
        draw: req.body.draw,
        recordsTotal: proPlanCount.recordset[0].count,
        recordsFiltered: proPlanCount.recordset[0].count,
        data: proPlan.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0651: Error while getting Production Plan List "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0651: Error while getting Production Plan List  "+error.message, result: null };
      res.send(obj);
    }
  },

  getOperatorList: async function (req, res) {
    try {
      let opratorList = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.getOperatorList();
      if (opratorList instanceof Error || opratorList.rowsAffected < 1) {
        Evolve.Log.error(' EERR0652: Error on get operator list ');
        let obj = { statusCode: 400, status: "fail", message: "Error on get operator list", result: null };
        res.send(obj);
      } else {
        let obj = { statusCode: 200, status: "success", message: "Get oprator list", result: opratorList.recordsets[0] };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0653: Error on getting operator list "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0653: Error on getting operator list "+error.message, result: null };
      res.send(obj);
    }
  },


  getProdPlanDetails: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let response = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.getProdPlanDetails(req.body.EvolveProdPlan_ID);
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
          message: "Production plan details",
          result: response.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0654: Error while getting Prod Plan Details "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0654: Error while getting Prod Plan Details "+error.message,
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
        let fileName = date.getFullYear() +
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
        csv.mv(Evolve.Config.csvReportPath + "/" + fileName, async function (error) {
          if (error) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "  "+error.message,
              result: null
            };
            res.send(obj);
          } else {

            if (Evolve.Config.project == 'Cooper') 
            {
              let planeArray = await Evolve.Csv().fromFile(
                Evolve.Config.csvReportPath + "/" + fileName
              );


              let machineCode_errorStatus = false;
              let macgineCode_error = [];
              let macgineCode_error_tmp = [];
              for (let i = 0; i < planeArray.length; i++) {
                let check_machineCode = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.check_machine(
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
              }
              else {
                let shift_errorStatus = false;
                let shift_error = [];
                let shift_error_tmp = [];
                for (let i = 0; i < planeArray.length; i++) {
                  let check_shift = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.check_shift(
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
                    let check_item = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.check_item(
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
                    let site_errorStatus = false;
                    let site_error = [];
                    let site_error_tmp = [];
                    for (let i = 0; i < planeArray.length; i++) {
                      let checkSiteCode = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.checkSiteCode(
                        planeArray[i].Site
                      );
                      if (checkSiteCode.recordset[0].count == 0) {
                        if (!site_error_tmp.includes(planeArray[i].Site)) {
                          site_error.push(
                            "Site " + planeArray[i].Site + " Not Found !"
                          );
                          site_error_tmp.push(planeArray[i].Site);
                        }
                        site_errorStatus = true;
                      }
                    }
                    if (site_errorStatus == true) {
                      let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: site_error,
                        result: null
                      };
                      res.send(obj);
                    } else {


                      let section_errorStatus = false;
                      let section_error = [];
                      let section_error_tmp = [];
                      for (let i = 0; i < planeArray.length; i++) {
                        let checkSectionCode = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.checkSectionCode(
                          planeArray[i].Plan_Section);
                        if (checkSectionCode.recordset[0].count == 0) {
                          if (!section_error_tmp.includes(planeArray[i].Plan_Section)) {
                            section_error.push(
                              "Section " + planeArray[i].Plan_Section + " Not Found !"
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
                      }
                      else {
                        let date = new Date();
                        let getLastProdPlanCode = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.getLastProdPlanCode();
                        if (getLastProdPlanCode instanceof Error) {
                          let obj = { statusCode: 400, status: "fail", message: "Error on get plan code list", result: null };
                          res.send(obj);
                        }
                        else {

                          let planCode = "";
                          if (getLastProdPlanCode.rowsAffected < 1) {
                            planCode = date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate() + "01";
                            // planCode = "P"+planCode
                            //2020032201
                          } else {
                            let lastProdCode = getLastProdPlanCode.recordset[0].EvolveProdPlan_Code;
                            lastProdCode = lastProdCode.substring(1)

                            // 202032301


                            let tempCode = date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate(); //2020323
                            if (lastProdCode.includes(tempCode)) {
                              planCode = parseInt(lastProdCode) + 1;
                              // planCode = "P"+planCode

                            }
                            else {
                              planCode = date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate() + "01";
                              // planCode = "P"+planCode

                            }


                          }
                          let planeError = false;
                          let EvolveProdPlan_ID;
                          let planeDetailsError = false;
                          let planeDetailsErrorMessage = [];
                          planeArray[0].plancode = planCode;
                          let saveplan = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.savePlan(
                            planeArray[0],
                            req.body.EvolveUser_ID,
                            fileName ,
                          );
                          console.log("saveplan :",saveplan);
                          if (saveplan instanceof Error || saveplan.rowsAffected < 1) {
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
                              let saveplanDetails = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.savePlanDetails(
                                planeArray[i],
                                EvolveProdPlan_ID,
                                req.body.EvolveUser_ID
                              );
                              if (saveplanDetails instanceof Error || saveplanDetails.rowsAffected < 1) {
                                planeDetailsError = true;
                                planeDetailsErrorMessage =  saveplanDetails.message;
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
                              message: "Csv upload successfully",
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
            else {
              let planeArray = await Evolve.Csv().fromFile(
                Evolve.Config.csvReportPath + "/" + fileName
              );
              let planCode_errorStatus = false;
              let planCode_error = [];
              let planCode_error_tmp = [];
              for (let i = 0; i < planeArray.length; i++) {
                let check_planCode = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.check_planCode(
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
                  let check_machineCode = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.check_machine(planeArray[i].Machine_Code);
                  if (check_machineCode.recordset[0].count == 0) {
                    if (
                      !macgineCode_error_tmp.includes(planeArray[i].Machine_Code)
                    ) {
                      macgineCode_error.push("Machine Code "+planeArray[i].Machine_Code+" Not Found !");
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
                    let check_shift = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.check_shift(
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
                      let check_item = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.check_item(
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
                        let check_bom = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.check_bom(
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
                          let check_section = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.check_section(
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
                          let saveplan = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.savePlan(
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
                              let saveplanDetails = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.savePlanDetails(
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
                              message: "Csv upload successfully",
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
          }
        });

      }

    } catch (error) {
      Evolve.Log.error(" EERR0655: Error while csv Plan Upload "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0655: Error while csv Plan Upload "+error.message,
        result: null
      };
      res.send(obj);
    }
  },


  publishPlan: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let response = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.publishPlan(
        req.body
      );
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
          message: "Plan published successfully",
          result: []
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0656: Error while publishing Plan "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0656: Error while publishing Plan "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getMachineList: async function (req, res) {
    try {
      let machineList = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.getMachineList();
      if (machineList instanceof Error) {
        Evolve.Log.error(' EERR0657: Error on get machine list');
        let obj = { statusCode: 400, status: "fail", message: "Error on get machine list", result: null };
        res.send(obj);
      } else {
        let obj = { statusCode: 200, status: "success", message: "Get machine list", result: machineList.recordset };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0658: Error while getting Machine List "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0658: Error while getting Machine List "+error.message, result: null };
      res.send(obj);
    }
  },

  getShiftList: async function (req, res) {
    try {
      let shiftList = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.getShiftList();
      if (shiftList instanceof Error) {
        Evolve.Log.error(' EERR0659: Error on get shift list');
        let obj = { statusCode: 400, status: "fail", message: "Error on get shift list", result: null };
        res.send(obj);
      } else {
        let obj = { statusCode: 200, status: "success", message: "Get shift list", result: shiftList.recordset };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0660: Error while getting shift list "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0660: Error while getting shift list "+error.message, result: null };
      res.send(obj);
    }
  },

  getItemList: async function (req, res) {
    try {
      let itemList = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.getItemList();
      if (itemList instanceof Error) {
        Evolve.Log.error(' EERR0661: Error on get item list');
        let obj = { statusCode: 400, status: "fail", message: "Error on get item list", result: null };
        res.send(obj);
      } else {
        let obj = { statusCode: 200, status: "success", message: "Get item list", result: itemList.recordset };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0662: Error while getting Item list "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0662: Error while getting Item list "+error.message, result: null };
      res.send(obj);
    }
  },

  createProdPlan: async function (req, res) {
    try {
      let date = new Date();
      let getLastProdPlanCode = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.getLastProdPlanCode();
      if (getLastProdPlanCode instanceof Error) {
        let obj = { statusCode: 400, status: "fail", message: "Error on get item list", result: null };
        res.send(obj);
      } else {
        let planCode = "";
        if (getLastProdPlanCode.rowsAffected < 1) {
          planCode = date.getFullYear() + "" + ('0' + (date.getMonth() + 1)).slice(-2) + "" + ('0' + date.getDate()).slice(-2) + "01"; //2020032201
        }
        else {
          let lastProdCode = getLastProdPlanCode.recordset[0].EvolveProdPlan_Code; // 202032301
          let tempCode = date.getFullYear() + "" + ('0' + (date.getMonth() + 1)).slice(-2) + "" + ('0' + date.getDate()).slice(-2); //2020323
          if (lastProdCode.includes(tempCode)) {
            planCode = parseInt(lastProdCode) + 1;
          }
          else {
            planCode = date.getFullYear() + "" + ('0' + (date.getMonth() + 1)).slice(-2) + "" + ('0' + date.getDate()).slice(-2) + "01";
          }
        }
        let addProdPlanArray = {
          "EvolveProdPlan_ProdDate": date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
          "EvolveProdPlan_Code": planCode,
          "EvolveUser_ID": req.EvolveUser_ID
        }
        let addProdPlan = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.addProdPlan(addProdPlanArray);
        if (addProdPlan instanceof Error || addProdPlan.rowsAffected < 1) {
          Evolve.Log.error(" EERR0663: Error while create production plan :" + addProdPlan.message)
          let obj = { statusCode: 400, status: "fail", message: "Error create production plan", result: addProdPlan.message };
          res.send(obj);
        }
        else {
          let EvolveProdPlan_ID = addProdPlan.recordset[0].inserted_id;
          let prodPlanDetailArrays = req.body.productionPlanDetails;
          let prodPlanDetailError = false;
          for (let i = 0; i < prodPlanDetailArrays.length; i++) {
            if (prodPlanDetailError == false) {
              let prodPlanDetailArray = prodPlanDetailArrays[i];
              let addProdPlanDetailArray = {
                "EvolveMachine_ID": prodPlanDetailArray['EvolveMachine_ID'],
                "EvolveItem_ID": prodPlanDetailArray['EvolveItem_ID'],
                "EvolveShift_ID": prodPlanDetailArray['EvolveShift_ID'],
                "EvolveProdPlanDetail_Site": prodPlanDetailArray['EvolveProdPlanDetail_Site'],
                "EvolveProdPlanDetail_PlanQuantity": prodPlanDetailArray['EvolveProdPlanDetail_PlanQuantity'],
                "EvolveProdPlanDetail_ShiftQuantity": prodPlanDetailArray['EvolveProdPlanDetail_ShiftQuantity'],
                "EvolveProdPlanDetail_OrderDate": prodPlanDetailArray['EvolveProdPlanDetail_OrderDate'],
                "EvolveProdPlanDetail_CloseDate": prodPlanDetailArray['EvolveProdPlanDetail_CloseDate'],
                "EvolveProdPlan_ID": EvolveProdPlan_ID,
                "EvolveUser_ID": prodPlanDetailArray['EvolveUser_ID'],
              };
              let addProdPlanDetail = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.addProdPlanDetail(addProdPlanDetailArray);
              if (addProdPlanDetail instanceof Error || addProdPlanDetail.rowsAffected < 1) {
                Evolve.Log.error("Error while create production plan detail");
                Evolve.Log.error(addProdPlanArray.message);
                prodPlanDetailError = false;
              }
            }
          }
          if (prodPlanDetailError == true) {
            let obj = { statusCode: 400, status: "fail", message: "Error while create production plan", result: null };
            res.send(obj);
          }
          else {
            let obj = { statusCode: 200, status: "success", message: "Production plan publish successfully", result: null };
            res.send(obj);
          }
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0664: Error while creating prod plan "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0664: Error while creating prod plan "+error.message, result: null };
      res.send(obj);
    }
  },

  updatePlanDetails: async function (req, res) {
    try {

      let error = false;

      for (let i = 0; i < req.body.updatedArray.length; i++) {
        if (error == false) {
          req.body.updatedArray[i].EvolveUser_ID = req.EvolveUser_ID;
          let updatePlanDetails = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.updatePlanDetails(
            req.body.updatedArray[i]
          );
          if (updatePlanDetails instanceof Error) {
            error = true;
            let obj = {
              statusCode: 400,
              status: "fail",
              message: updatePlanDetails.message,
              result: null
            };
            res.send(obj);
          }
        }
      }
      if (error == false) {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Plan updated successfully",
          result: []
        };

        res.send(obj);

      }

    } catch (error) {
      Evolve.Log.error(" EERR0665: Error while updating Plan Details "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0665: Error while updating Plan Details "+error.message,
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
      Evolve.Log.error(" EERR0666: Error while deleting plan "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0666: Error while deleting plan "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getSectionList: async function (req, res) {
    try {
      let sectionList = await Evolve.App.Services.SmartFactory.PlanUpload.SrvPlanUpload.getSectionList();
      if (sectionList instanceof Error) {
        Evolve.Log.error(' EERR0667: Error on get Section list ');
        let obj = { statusCode: 400, status: "fail", message: "Error on get Section list", result: null };
        res.send(obj);
      } else {
        let obj = { statusCode: 200, status: "success", message: "Get Section list", result: sectionList.recordset };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0668: Error while getting Section list "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0668: Error while getting Section list "+error.message, result: null };
      res.send(obj);
    }
  },

}