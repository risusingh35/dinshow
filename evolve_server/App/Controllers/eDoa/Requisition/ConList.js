"use strict";
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
  getRequisitionList: async function (req, res) {
    try {
      let start = parseInt(req.body.startFrom);
      let length = parseInt(req.body.displayRecord);
      let search = req.body.search;
      let releasedSq = req.body.releasedSq;
      let error = false;
      let errorMessage = "Error while getting getRequisitionList";
      let resObj;
      let getUserUnit =
        await Evolve.App.Services.eDoa.Requisition.SrvList.getUserUnitDetails(
          req.EvolveUser_ID
        );
      if (getUserUnit instanceof Error || getUserUnit.rowsAffected < 1) {
        Evolve.Log.error(" EERR####: Error while get user branch details ");
        error = true;
        error = "Error while get user branch details";
      } else {
        let isBuyer = true;

        let roleList =
          await Evolve.App.Services.eDoa.Requisition.SrvList.getUserRoleDetails(
            req.EvolveUser_ID
          );
        // console.log("getUserRoleDetails>>>>>>>>>>>>>>>>>", roleList);
        if (roleList instanceof Error || roleList.rowsAffected < 1) {
          Evolve.Log.error(" EERR####: Error while get User Role Details ");
          error = true;
          error = "Error while get User Role Details";
        } else {
          let unitList = getUserUnit.recordset;
          roleList = roleList.recordset;

          for (let i = 0; i < roleList.length; i++) {
            if (roleList[i].EvolveRole_Name.toLowerCase() == "buyer") {
              isBuyer = true;
            }
          }
          let subQuery = "";
          if (!isBuyer) {
            subQuery += " AND (";
            for (let i = 0; i < unitList.length; i++) {
              if (i != unitList.length - 1) {
                subQuery +=
                  " epr.EvolveUnit_ID =" + unitList[i].EvolveUnit_ID + " OR ";
              } else {
                subQuery +=
                  " epr.EvolveUnit_ID =" + unitList[i].EvolveUnit_ID + ")";
              }
            }
          } else {
            subQuery += " AND epr.EvolvePR_BuyerID=" + req.EvolveUser_ID;
          }
          let count =
            await Evolve.App.Services.eDoa.Requisition.SrvList.getRequisitionListCount(
              search,
              subQuery
            );
          let list =
            await Evolve.App.Services.eDoa.Requisition.SrvList.getRequisitionList(
              start,
              length,
              search,
              subQuery
            );
          if (list instanceof Error) {
            Evolve.Log.error(" EERR####: Error while get Requisition list ");
            error = true;
            error = "Error while get Requisition list";
          } else {
            for (let i = 0; i < list.recordset.length; i++) {
              list.recordset[i].EvolvePR_TotalCost = (
                list.recordset[i].EvolvePR_TotalCost + ""
              )
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

              if (
                list.recordset[i].EvolvePR_Status != "SAVED" &&
                list.recordset[i].EvolvePR_Status != "QADSUBMITED" &&
                list.recordset[i].EvolvePR_Status != "INRELEASE" &&
                list.recordset[i].EvolvePR_Status != "QADRELEASED" &&
                req.body.releasedSq == false &&
                list.recordset[i].EvolvePR_Status != "ERRORQADRELEASE"
              ) {
                list.recordset[i].EvolveApprovalMatrix_Type =
                  "PURCHASEREQUISITION";
                list.recordset[i].EvolveApprovalProcess_PrimaryID =
                  list.recordset[i].EvolvePR_ID;

                let processDetails =
                  await Evolve.App.Services.eDoa.Requisition.SrvList.getApprovalProccessDetails(
                    list.recordset[i]
                  );

                // console.log("processDetails>> ", processDetails);

                if (list instanceof Error || list.rowsAffected < 1) {
                  error = true;
                  error = "Error while get A[pprpoval Proccess Details";
                } else {
                  list.recordset[i].proccessDetails =
                    processDetails.recordset[0];
                  let indexList =
                    await Evolve.App.Services.eDoa.Requisition.SrvList.getMatrixIndexList(
                      list.recordset[i].proccessDetails.EvolveApprovalMatrix_ID
                    );
                  if (list instanceof Error) {
                    erorr = true;
                    errorMessage = "Error While Get Matrix Index List";
                  } else {
                    list.recordset[i].indexList = indexList.recordset;

                    if (indexList.rowsAffected > 0) {
                      for (let j = 0; j < indexList.recordset.length; j++) {
                        let ApproverDetails = "";
                        let getUserDetails =
                          await Evolve.App.Services.eDoa.MyApproval.SrvList.getApproverUserDetails(
                            indexList.recordset[j].EvolveApprovalMatrixIndex_ID
                          );
                        if (getUserDetails instanceof Error) {
                          error = true;
                          errorMessage = "Error While Get Approvers User List";
                        } else {
                          if (
                            indexList.recordset[j]
                              .EvolveApprovalMatrixIndex_Seq <
                            list.recordset[i].proccessDetails
                              .EvolveApprovalProcess_CurrentIndex
                          ) {
                            ApproverDetails = "Approved by ";
                          } else {
                            ApproverDetails = "To be approved by ";
                          }
                          for (
                            let k = 0;
                            k < getUserDetails.recordset.length;
                            k++
                          ) {
                            if (k == getUserDetails.recordset.length - 1) {
                              ApproverDetails +=
                                getUserDetails.recordset[k].EvolveUser_EmailID;
                            } else {
                              ApproverDetails +=
                                getUserDetails.recordset[k].EvolveUser_EmailID +
                                " OR ";
                            }
                          }
                        }

                        list.recordset[i].indexList[j].ApproverDetails =
                          ApproverDetails;
                      }
                    }
                  }

                  let currentActionList = [];

                  if (
                    list.recordset[i].proccessDetails
                      .EvolveApprovalMatrix_IsEmailNotif == true
                  ) {
                    currentActionList.push({
                      key: "EMAILSEND",
                      icon: "mdi mdi-email-check",
                      action: "Email Send",
                      status:
                        list.recordset[i].proccessDetails
                          .EvolveApprovalProcess_ErrorCode == "ERROREMAILSEND"
                          ? "ERROR"
                          : list.recordset[i].proccessDetails
                              .EvolveApprovalProcess_Status == "EMAILSEND"
                          ? "INPROCESS"
                          : list.recordset[i].proccessDetails
                              .EvolveApprovalProcess_Status == "MESSAGESEND" ||
                            list.recordset[i].proccessDetails
                              .EvolveApprovalProcess_Status == "WHATSAPPSEND" ||
                            list.recordset[i].proccessDetails
                              .EvolveApprovalProcess_Status == "QEXTEND" ||
                            list.recordset[i].proccessDetails
                              .EvolveApprovalProcess_Status == "COMPLETED" ||
                            list.recordset[i].proccessDetails
                              .EvolveApprovalProcess_Status == "ERRORQADSUBMIT"
                          ? "SUCCESS"
                          : "PENDING",
                    });
                  }
                  if (
                    list.recordset[i].proccessDetails
                      .EvolveApprovalMatrix_IsMessageNotif == true
                  ) {
                    currentActionList.push({
                      key: "MESSAGESEND",
                      icon: "mdi  mdi-message-text",
                      action: "Message Notification",
                      status:
                        list.recordset[i].proccessDetails
                          .EvolveApprovalProcess_ErrorCode == "ERRORMESSAGESEND"
                          ? "ERROR"
                          : list.recordset[i].proccessDetails
                              .EvolveApprovalProcess_Status == "MESSAGESEND"
                          ? "INPROCESS"
                          : list.recordset[i].proccessDetails
                              .EvolveApprovalProcess_Status == "WHATSAPPSEND" ||
                            list.recordset[i].proccessDetails
                              .EvolveApprovalProcess_Status == "QEXTEND" ||
                            list.recordset[i].proccessDetails
                              .EvolveApprovalProcess_Status == "COMPLETED"
                          ? "SUCCESS"
                          : "PENDING",
                    });
                  }
                  if (
                    list.recordset[i].proccessDetails
                      .EvolveApprovalMatrix_IsWPMessageNotif == true
                  ) {
                    currentActionList.push({
                      key: "WHATSAPPSEND",
                      icon: "mdi mdi-whatsapp",
                      action: "Whatsapp Notification",
                      status:
                        list.recordset[i].proccessDetails
                          .EvolveApprovalProcess_ErrorCode ==
                        "ERRORWHATSAPPSEND"
                          ? "ERROR"
                          : list.recordset[i].proccessDetails
                              .EvolveApprovalProcess_Status == "WHATSAPPSEND"
                          ? "INPROCESS"
                          : list.recordset[i].proccessDetails
                              .EvolveApprovalProcess_Status == "QEXTEND" ||
                            list.recordset[i].proccessDetails
                              .EvolveApprovalProcess_Status == "COMPLETED"
                          ? "SUCCESS"
                          : "PENDING",
                    });
                  }
                  if (
                    list.recordset[i].proccessDetails
                      .EvolveApprovalMatrix_IsQxtendReq == true
                  ) {
                    currentActionList.push({
                      key: "QEXTEND",
                      icon: "mdi  mdi-cloud-upload",
                      action: "Send TO QAD",
                      status:
                        list.recordset[i].proccessDetails
                          .EvolveApprovalProcess_ErrorCode == "ERRORQADSUBMIT"
                          ? "ERROR"
                          : list.recordset[i].proccessDetails
                              .EvolveApprovalProcess_Status == "QEXTEND"
                          ? "INPROCESS"
                          : list.recordset[i].proccessDetails
                              .EvolveApprovalProcess_Status == "COMPLETED"
                          ? "SUCCESS"
                          : "PENDING",
                    });
                  }

                  list.recordset[i].currentActionList = currentActionList;
                }
              }
            }

            resObj = {
              noOfRecord: count.recordset[0].count,
              records: list.recordset,
              isBuyer: isBuyer,
            };
          }
        }
      }
      if (error) {
        let obj = {
          statusCode: 400,
          status: "Fail",
          message: errorMessage,
          result: resObj,
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Requisition List",
          result: resObj,
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(
        " EERR###ssssssssssssssssssss#: Error while get Requisition list " +
          error.message
      );
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR####: Error while get Requisition list " + error.message,
        result: null,
      };
      res.send(obj);
    }
  },

  submitToApprovelProcess: async function (req, res) {
    console.log("req.body>>>>>>>>>>>>>",req.body);
    try {
      let error = false;
      let errorMessage = "Error While Submit Sales Quote";
      let successMessage = "";
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      req.body.EvolveApprovalMatrix_ID = 0;
      req.body.EvolveApprovalMatrix_Type = "PURCHASEREQUISITION";
      req.body.EvolveApprovalProcess_PrimaryID = req.body.EvolvePR_ID;

      let prLineDetails =
        await Evolve.App.Services.eDoa.Requisition.SrvOption.getPrLineDetails(
          req.body.EvolvePR_ID
        );
        console.log("PR LINE DETAILES>>>>>>>>>>>>>>>>>>>",prLineDetails);
      if (prLineDetails instanceof Error || prLineDetails.rowsAffected < 1) {
        error = true;
        errorMessage = "ERROR WHILE GET REQUIESITION LINE DETAILS";
      } else {
        for (let i = 0; i < prLineDetails.recordset.length; i++) {
          if (!error) {
            if (
              prLineDetails.recordset[i].EvolvePRDetails_Qty == null ||
              prLineDetails.recordset[i].EvolvePRDetails_Qty == "" ||
              prLineDetails.recordset[i].EvolvePRDetails_Qty == undefined ||
              prLineDetails.recordset[i].EvolvePRDetails_Qty == NaN
            ) {
              error = true;
              errorMessage =
                "QTY NOT ENTERED FOR LINE NO " +
                prLineDetails.recordset[i].EvolvePRDetails_LineNo;
            }

            if (
              prLineDetails.recordset[i].EvolvePRDetails_ItemUnitPrice ==
                null ||
              prLineDetails.recordset[i].EvolvePRDetails_ItemUnitPrice == "" ||
              prLineDetails.recordset[i].EvolvePRDetails_ItemUnitPrice ==
                undefined ||
              prLineDetails.recordset[i].EvolvePRDetails_ItemUnitPrice == NaN
            ) {
              error = true;
              errorMessage =
                "ITEM UNIT PRICE NOT ENTERED FOR LINE NO " +
                prLineDetails.recordset[i].EvolvePRDetails_LineNo;
            }

            if (
              prLineDetails.recordset[i].EvolvePRDetails_ItemTotalPrice ==
                null ||
              prLineDetails.recordset[i].EvolvePRDetails_ItemTotalPrice == "" ||
              prLineDetails.recordset[i].EvolvePRDetails_ItemTotalPrice ==
                undefined ||
              prLineDetails.recordset[i].EvolvePRDetails_ItemTotalPrice == NaN
            ) {
              error = true;
              errorMessage =
                "TOTAL PRICE NOT ENTERED LINE NO " +
                prLineDetails.recordset[i].EvolvePRDetails_LineNo;
            }
            if (
              prLineDetails.recordset[i].EvolveSupplier_ID == null ||
              prLineDetails.recordset[i].EvolveSupplier_ID == "" ||
              prLineDetails.recordset[i].EvolveSupplier_ID == undefined ||
              prLineDetails.recordset[i].EvolveSupplier_ID == NaN
            ) {
              error = true;
              errorMessage =
                "SUPPLIER NOT ENTERED LINE NO " +
                prLineDetails.recordset[i].EvolvePRDetails_LineNo;
            }
          }
        }
      }

      if (error == false) {
        if (req.body.EvolvePR_Status == "SUBMITED") {
          successMessage = "Requsition Submitted Successfully";
          let matrixList =
            await Evolve.App.Controllers.Common.ConCommon.getApprovalMatrixRootDetails(
              req.body.EvolveApprovalMatrix_Type
            );
          if (matrixList instanceof Error) {
            error = true;
          } else {
            for (let i = 0; i < matrixList.length; i++) {
              if (matrixList[i].roolList.length == 0) {
                req.body.EvolveApprovalMatrix_ID =
                  matrixList[i].EvolveApprovalMatrix_ID;
              } else {
                let queryStr = "";
                for (let j = 0; j < matrixList[i].roolList.length; j++) {
                  if (matrixList[i].roolList[j].case == "==") {
                    matrixList[i].roolList[j].case = "=";
                  }

                  // matrixList[i].roolList[j].caseValue
                  let caseValueList =
                    matrixList[i].roolList[j].caseValue.split(",");

                  queryStr += " AND (";

                  for (let k = 0; k < caseValueList.length; k++) {
                    if (k == caseValueList.length - 1) {
                      queryStr +=
                        matrixList[i].roolList[j].tableField +
                        " " +
                        matrixList[i].roolList[j].case +
                        " " +
                        caseValueList[k] +
                        " ) ";
                    } else {
                      queryStr +=
                        matrixList[i].roolList[j].tableField +
                        " " +
                        matrixList[i].roolList[j].case +
                        " " +
                        caseValueList[k] +
                        " OR ";
                    }
                  }
                }

                let details = {
                  EvolveSalesQuote_ID: req.body.EvolveSalesQuote_ID,
                  queryStr: queryStr,
                };

                let matchSqDetaiks =
                  await Evolve.App.Services.eDoa.Requisition.SrvList.matchRequsitionDetails(
                    details
                  );

                if (matchSqDetaiks instanceof Error) {
                  error = true;
                } else if (matchSqDetaiks.rowsAffected > 0) {
                  req.body.EvolveApprovalMatrix_ID =
                    matrixList[i].EvolveApprovalMatrix_ID;
                }
              }
            }

            if (req.body.EvolveApprovalMatrix_ID != 0) {
              let checkProcess =
                await Evolve.App.Services.eDoa.Requisition.SrvList.checkApprovalProcess(
                  req.body
                );

              if (checkProcess instanceof Error) {
                error = true;
              } else if (checkProcess.rowsAffected > 0) {
                req.body.EvolveApprovalProcess_ID =
                  checkProcess.recordset[0].EvolveApprovalProcess_ID;
                let updateSeq =
                  await Evolve.App.Services.eDoa.Requisition.SrvList.updateApprovalProcessSeq(
                    req.body
                  );
                if (updateSeq instanceof Error || updateSeq.rowsAffected < 1) {
                  error = true;
                } else {
                  req.body.EvolveApprovalProcess_ID =
                    req.body.EvolveApprovalProcess_ID;
                  req.body.EvolveUser_ID = req.EvolveUser_ID;
                  req.body.EvolveApprovalProcessDetails_Status = "RESUBMITED";

                  let addProcessDetails =
                    await Evolve.App.Services.eDoa.Requisition.SrvList.addApprovalProcessetails(
                      req.body
                    );
                  if (
                    addProcessDetails instanceof Error ||
                    addProcessDetails.rowsAffected < 1
                  ) {
                    error = true;
                  }
                }
              } else {
                req.body.EvolveApprovalProcess_PrimaryID = req.body.EvolvePR_ID;
                let result =
                  await Evolve.App.Services.eDoa.Requisition.SrvList.submitToApprovelProcess(
                    req.body
                  );
                if (result instanceof Error || result.rowsAffected < 1) {
                  error = true;
                } else {
                  req.body.EvolveApprovalProcess_ID =
                    result.recordset[0].inserted_id;
                  req.body.EvolveUser_ID = req.EvolveUser_ID;
                  req.body.EvolveApprovalProcessDetails_Status = "SUBMITED";

                  let addProcessDetails =
                    await Evolve.App.Services.eDoa.Requisition.SrvList.addApprovalProcessetails(
                      req.body
                    );
                  if (
                    addProcessDetails instanceof Error ||
                    addProcessDetails.rowsAffected < 1
                  ) {
                    error = true;
                  }
                }
              }
            } else {
              error = true;
              errorMessage = "No Approval Matrix Matched For Sales Quote";
            }
          }
        } else {
          successMessage = "Sales Quote Status Changed TO INRELEASE";
        }
      }

      if (error == false) {
        let updatePr =
          await Evolve.App.Services.eDoa.Requisition.SrvList.updateRequisitionStatus(
            req.body
          );
        if (updatePr instanceof Error || updatePr.rowsAffected < 1) {
          Evolve.Log.error(" EERR####: Error while update sales quate status ");
          error = true;
        }
      }

      if (error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: errorMessage,
          result: null,
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Sales Quote Submited Successfully",
          result: null,
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(
        " EERR####: Error while sales quote submit to approvel process! " +
          error.message
      );
      let obj = {
        statusCode: 400,
        status: "fail",
        message:
          " EERR####: Error while sales quote submit to approvel process! " +
          error.message,
        result: null,
      };
      res.send(obj);
    }
  },
  uploadSqByCsv: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      if (req.files.fileData) {
        let csv = req.files.fileData;
        let UnitStateCode = "";
        let custStateCode = "";

        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(csv.name)[1];
        let date = new Date();
        let fileName =
          "SalesQuote_" +
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

        // Use the mv() method to place the file somewhere on your server
        csv.mv("./csv/doa/" + fileName, async function (error) {
          if (error) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: error.message,
              result: null,
            };
            res.send(obj);
          } else {
            // let csvDataArray = await Evolve.Csv({
            //     trim:false,
            //     ignoreEmpty : true ,
            // }).fromFile('./csv/doa/' + fileName);
            let csvDataArray = await Evolve.Csv({
              trim: false,
              ignoreEmpty: true,
            }).fromFile("./csv/doa/" + fileName);
            let errorMessage = "";
            let errorStatus = false;

            let getUnitStateCode =
              await Evolve.App.Services.eDoa.Requisition.SrvList.getUnitStateCode(
                req.EvolveUnit_ID
              );
            if (
              getUnitStateCode instanceof Error ||
              getUnitStateCode.rowsAffected < 1
            ) {
              errorStatus = true;
              errorMessage = "Error While Get Unit State Code";
            } else {
              if (
                getUnitStateCode.recordset[0].EvolveUnit_State == null ||
                getUnitStateCode.recordset[0].EvolveUnit_State == undefined ||
                getUnitStateCode.recordset[0].EvolveUnit_State == ""
              ) {
                errorStatus = true;
                errorMessage = "State Code Not Found For logged In Unit";
              } else {
                UnitStateCode = getUnitStateCode.recordset[0].EvolveUnit_State;
              }
            }

            if (errorStatus == false) {
              for (let i = 0; i < csvDataArray.length; i++) {
                csvDataArray[i]["ITEM CODE"] =
                  csvDataArray[i]["ITEM CODE"].trimEnd();
                csvDataArray[i]["BILL-TO"] = csvDataArray[i]["BILL-TO"].trim();
                csvDataArray[i]["SHIP-TO"] = csvDataArray[i]["SHIP-TO"].trim();
                csvDataArray[i]["CHANNEL"] = csvDataArray[i]["CHANNEL"].trim();
                csvDataArray[i]["PROJECT"] = csvDataArray[i]["PROJECT"].trim();
                csvDataArray[i]["LINE NO"] = csvDataArray[i]["LINE NO"].trim();
                csvDataArray[i]["ITEM CODE"] =
                  csvDataArray[i]["ITEM CODE"].trim();
                csvDataArray[i]["REXEL UNIT PRICE"] =
                  csvDataArray[i]["REXEL UNIT PRICE"].trim();
                csvDataArray[i]["QTY"] = csvDataArray[i]["QTY"].trim();

                csvDataArray[i]["CUST UNIT PRICE"] =
                  csvDataArray[i]["CUST UNIT PRICE"].trim();
                csvDataArray[i]["CUST DISCOUNT"] =
                  csvDataArray[i]["CUST DISCOUNT"].trim();

                if (
                  csvDataArray[i]["CUSTOMER CODE"] == "" ||
                  csvDataArray[i]["CUSTOMER CODE"] == undefined
                ) {
                  errorStatus = true;
                  errorMessage = "CUSTOMER CODE Not  Found In Row " + i + 1;
                } else if (
                  csvDataArray[i]["BILL-TO"] == "" ||
                  csvDataArray[i]["BILL-TO"] == undefined
                ) {
                  errorStatus = true;
                  errorMessage = "BILL-TO Not  Found In Row " + i + 1;
                } else if (
                  csvDataArray[i]["SHIP-TO"] == "" ||
                  csvDataArray[i]["SHIP-TO"] == undefined
                ) {
                  errorStatus = true;
                  errorMessage = "SHIP-TO Not  Found In Row " + i + 1;
                } else if (
                  csvDataArray[i]["CHANNEL"] == "" ||
                  csvDataArray[i]["CHANNEL"] == undefined
                ) {
                  errorStatus = true;
                  errorMessage = "CHANNEL Not  Found In Row " + i + 1;
                } else if (
                  csvDataArray[i]["PROJECT"] == "" ||
                  csvDataArray[i]["PROJECT"] == undefined
                ) {
                  errorStatus = true;
                  errorMessage = "PROJECT Not  Found In Row " + i + 1;
                } else if (
                  csvDataArray[i]["SALESPERSON CODE"] == "" ||
                  csvDataArray[i]["SALESPERSON CODE"] == undefined
                ) {
                  errorStatus = true;

                  errorMessage = "SALESPERSON CODE Not  Found In Row " + i + 1;
                } else if (
                  csvDataArray[i]["LINE NO"] == "" ||
                  csvDataArray[i]["LINE NO"] == undefined
                ) {
                  errorStatus = true;

                  errorMessage = "LINE NO Not  Found In Row " + i + 1;
                } else if (
                  csvDataArray[i]["ITEM CODE"] == "" ||
                  csvDataArray[i]["ITEM CODE"] == undefined
                ) {
                  errorStatus = true;
                  errorMessage = "ITEM CODE Not  Found In Row " + i + 1;
                } else if (
                  csvDataArray[i]["REXEL UNIT PRICE"] == "" ||
                  csvDataArray[i]["REXEL UNIT PRICE"] == undefined
                ) {
                  errorStatus = true;

                  errorMessage = "REXEL UNIT PRICE Not  Found In Row " + i + 1;
                } else if (
                  csvDataArray[i]["QTY"] == "" ||
                  csvDataArray[i]["QTY"] == undefined
                ) {
                  errorStatus = true;
                  errorMessage = "QTY Not  Found In Row " + i + 1;
                } else if (
                  csvDataArray[i]["CUST UNIT PRICE"] == "" ||
                  csvDataArray[i]["CUST UNIT PRICE"] == undefined
                ) {
                  errorStatus = true;
                  errorMessage = "CUST UNIT PRICE Not  Found In Row " + i + 1;
                } else if (
                  csvDataArray[i]["CUST DISCOUNT"] == "" ||
                  csvDataArray[i]["CUST DISCOUNT"] == undefined
                ) {
                  errorStatus = true;
                  errorMessage = "CUST DISCOUNT Not  Found In Row " + i + 1;
                }
              }
            }

            let bulkSqList = [];

            if (errorStatus == false) {
              for (let i = 0; i < csvDataArray.length; i++) {
                if (errorStatus == false) {
                  bulkSqList.push({
                    headDetails: {},
                    EvolveSalesQuote_Details: {},
                    isTaken: false,
                  });
                  let index = bulkSqList.length - 1;
                  bulkSqList[index].headDetails.EvolveSalesQuote_ReleaseDate =
                    "";
                  bulkSqList[index].headDetails.EvolveSalesQuote_PoDate =
                    csvDataArray[i]["PO DATE"];

                  bulkSqList[index].headDetails.EvolveSalesQuote_Comments =
                    csvDataArray[i]["HEAD COMMENTS"];

                  bulkSqList[index].headDetails.EvolveSalesQuote_Freight =
                    csvDataArray[i]["INWARD FREIGHT"] == "" ||
                    csvDataArray[i]["INWARD FREIGHT"] == undefined
                      ? 0
                      : parseFloat(csvDataArray[i]["INWARD FREIGHT"]);

                  bulkSqList[
                    index
                  ].headDetails.EvolveSalesQuote_OutWardFreight =
                    csvDataArray[i]["OUTWARD FREIGHT"] == "" ||
                    csvDataArray[i]["OUTWARD FREIGHT"] == undefined
                      ? 0
                      : parseFloat(csvDataArray[i]["OUTWARD FREIGHT"]);

                  bulkSqList[index].headDetails.EvolveSalesQuote_Pnf =
                    csvDataArray[i]["PNF"] == "" ||
                    csvDataArray[i]["PNF"] == undefined
                      ? 0
                      : parseFloat(csvDataArray[i]["PNF"]);
                  bulkSqList[index].headDetails.EvolvePR_Status = "SAVED";
                  bulkSqList[
                    index
                  ].headDetails.EvolveSalesQuote_CurrentOutstanding =
                    csvDataArray[i]["CURRENT OUT"] == "" ||
                    csvDataArray[i]["CURRENT OUT"] == undefined
                      ? 0
                      : parseFloat(csvDataArray[i]["CURRENT OUT"]);
                  bulkSqList[
                    index
                  ].headDetails.EvolveSalesQuote_ThirtyOutstanding =
                    csvDataArray[i]["1-30 DAYS OUT"] == "" ||
                    csvDataArray[i]["1-30 DAYS OUT"] == undefined
                      ? 0
                      : parseFloat(csvDataArray[i]["1-30 DAYS OUT"]);
                  bulkSqList[
                    index
                  ].headDetails.EvolveSalesQuote_SixtyOutstanding =
                    csvDataArray[i]["30-60 DAYS OUT"] == "" ||
                    csvDataArray[i]["30-60 DAYS OUT"] == undefined
                      ? 0
                      : parseFloat(csvDataArray[i]["30-60 DAYS OUT"]);
                  bulkSqList[
                    index
                  ].headDetails.EvolveSalesQuote_NinetyOutstanding =
                    csvDataArray[i]["60-90 DAYS OUT"] == "" ||
                    csvDataArray[i]["60-90 DAYS OUT"] == undefined
                      ? 0
                      : parseFloat(csvDataArray[i]["60-90 DAYS OUT"]);

                  bulkSqList[
                    index
                  ].headDetails.EvolveSalesQuote_OneEightyOutstanding =
                    csvDataArray[i]["90-180 DAYS OUT"] == "" ||
                    csvDataArray[i]["90-180 DAYS OUT"] == undefined
                      ? 0
                      : parseFloat(csvDataArray[i]["90-180 DAYS OUT"]);

                  bulkSqList[index].headDetails.EvolveSalesQuote_LandedCost =
                    null;
                  bulkSqList[index].headDetails.EvolveSalesQuote_ProfitMargin =
                    null;
                  bulkSqList[index].headDetails.EvolveSalesQuote_PurchaseOrder =
                    csvDataArray[i]["PO NO"];
                  bulkSqList[index].headDetails.EvolvePR_TotalCost = null;

                  //line details

                  bulkSqList[
                    index
                  ].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_LineNo = parseInt(
                    csvDataArray[i]["LINE NO"]
                  );
                  bulkSqList[
                    index
                  ].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_Qty = parseFloat(
                    csvDataArray[i]["QTY"]
                  );
                  bulkSqList[
                    index
                  ].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_CustomerUnitPrice =
                    parseFloat(csvDataArray[i]["CUST UNIT PRICE"]);
                  bulkSqList[
                    index
                  ].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_CustomerDiscount =
                    parseFloat(csvDataArray[i]["CUST DISCOUNT"]);
                  bulkSqList[
                    index
                  ].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_ReqdDate =
                    csvDataArray[i]["REQD DATE"];
                  bulkSqList[
                    index
                  ].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_PromiseDate =
                    csvDataArray[i]["PROMISE DATE"];
                  bulkSqList[
                    index
                  ].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_DueDate =
                    csvDataArray[i]["DUE DATE"];
                  bulkSqList[
                    index
                  ].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_Comments =
                    csvDataArray[i]["LINE COMMENTS"];
                  bulkSqList[
                    index
                  ].EvolveSalesQuote_Details.EvolveItem_ItemUnitPrice = parseFloat(
                    csvDataArray[i]["REXEL UNIT PRICE"]
                  );
                  bulkSqList[
                    index
                  ].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_TotalPrice =
                    null;
                  bulkSqList[
                    index
                  ].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_AfterDiscountCustUnitPrice =
                    null;
                  bulkSqList[
                    index
                  ].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_AfterDiscountCustTotalPrice =
                    null;

                  let getCusDetails =
                    await Evolve.App.Services.eDoa.Requisition.SrvList.getCustomerDetails(
                      csvDataArray[i]["CUSTOMER CODE"]
                    );

                  if (
                    getCusDetails instanceof Error ||
                    getCusDetails.rowsAffected < 1
                  ) {
                    errorStatus = true;
                    errorMessage =
                      "CUSTOMER CODE " +
                      csvDataArray[i]["CUSTOMER CODE"] +
                      " Not Found  In Master Data";
                  } else {
                    let custDetails = getCusDetails.recordset[0];

                    bulkSqList[index].headDetails.EvolveSalesQuote_Customer_ID =
                      custDetails.EvolveCustomer_ID;

                    if (
                      custDetails.EvolveCreditTerms_ID == null ||
                      custDetails.EvolveCreditTerms_ID == undefined ||
                      custDetails.EvolveCreditTerms_ID == ""
                    ) {
                      errorStatus = true;
                      errorMessage =
                        "Credit Terms Not Found For CUSTOMER CODE " +
                        csvDataArray[i]["CUSTOMER CODE"] +
                        " In Master Data";
                    } else if (
                      custDetails.EvolveShipTo_State == null ||
                      custDetails.EvolveShipTo_State == undefined ||
                      custDetails.EvolveShipTo_State == ""
                    ) {
                      errorStatus = true;
                      errorMessage =
                        "State Code Not Found For CUSTOMER CODE " +
                        csvDataArray[i]["CUSTOMER CODE"] +
                        " In Master Data";
                    } else {
                      bulkSqList[
                        index
                      ].headDetails.EvolveSalesQuote_SalesPerson = [
                        {
                          id: custDetails.EvolveSalesPerson_ID,
                          name: custDetails.EvolveSalesPerson_Code,
                          commission: "0",
                        },
                      ];

                      bulkSqList[
                        index
                      ].headDetails.EvolveSalesQuote_TaxClass_ID =
                        custDetails.EvolveTaxClass_ID == "" ||
                        custDetails.EvolveTaxClass_ID == null ||
                        custDetails.EvolveTaxClass_ID == undefined
                          ? null
                          : custDetails.EvolveTaxClass_ID;
                      bulkSqList[index].headDetails.EvolveCreditTerms_ID =
                        custDetails.EvolveCreditTerms_ID;
                      custStateCode = custDetails.EvolveShipTo_State;
                      if (custStateCode == UnitStateCode) {
                        csvDataArray[i]["HEAD TAX ENV"] = "WST";
                      } else {
                        csvDataArray[i]["HEAD TAX ENV"] = "OST";
                      }

                      let getBillToId =
                        await Evolve.App.Services.eDoa.Requisition.SrvList.getBillToShipToID(
                          csvDataArray[i]["BILL-TO"]
                        );

                      if (
                        getBillToId instanceof Error ||
                        getBillToId.rowsAffected < 1
                      ) {
                        errorStatus = true;
                        errorMessage =
                          "BILL-TO CODE" +
                          csvDataArray[i]["BILL-TO"] +
                          " Not Found In Master Data";
                      } else {
                        bulkSqList[index].headDetails.EvolveSalesQuote_BillTo =
                          getBillToId.recordset[0].EvolveShipTo_ID;

                        let getShipToId =
                          await Evolve.App.Services.eDoa.Requisition.SrvList.getBillToShipToID(
                            csvDataArray[i]["SHIP-TO"]
                          );

                        if (
                          getShipToId instanceof Error ||
                          getShipToId.rowsAffected < 1
                        ) {
                          errorStatus = true;
                          errorMessage =
                            "SHIP TO CODE " +
                            csvDataArray[i]["SHIP-TO"] +
                            " Not Found In Master Data";
                        } else {
                          bulkSqList[
                            index
                          ].headDetails.EvolveSalesQuote_ShipTo =
                            getShipToId.recordset[0].EvolveShipTo_ID;
                          let channelId =
                            await Evolve.App.Services.eDoa.Requisition.SrvList.getChannelId(
                              csvDataArray[i]["CHANNEL"]
                            );

                          if (
                            channelId instanceof Error ||
                            channelId.rowsAffected < 1
                          ) {
                            errorStatus = true;
                            errorMessage =
                              "CHANNEL " +
                              csvDataArray[i]["CHANNEL"] +
                              " Not Found In Master Data";
                          } else {
                            bulkSqList[
                              index
                            ].headDetails.EvolveSalesQuote_Channel_ID =
                              channelId.recordset[0].EvolveGenericCodeMaster_ID;

                            let getTaxEnvID =
                              await Evolve.App.Services.eDoa.Requisition.SrvList.getTaxEnvID(
                                csvDataArray[i]["HEAD TAX ENV"]
                              );

                            if (
                              getTaxEnvID instanceof Error ||
                              getTaxEnvID.rowsAffected < 1
                            ) {
                              errorStatus = true;
                              errorMessage =
                                "HEAD TAX ENV " +
                                csvDataArray[i]["HEAD TAX ENV"] +
                                " Not Found In Master Data";
                            } else {
                              bulkSqList[
                                index
                              ].headDetails.EvolveSalesQuote_TaxEnv_ID =
                                getTaxEnvID.recordset[0].EvolveGenericCodeMaster_ID;
                              let itemId =
                                await Evolve.App.Services.eDoa.Requisition.SrvList.getItemID(
                                  csvDataArray[i]["ITEM CODE"]
                                );

                              if (
                                itemId instanceof Error ||
                                itemId.rowsAffected < 1
                              ) {
                                errorStatus = true;
                                errorMessage =
                                  "ITEM CODE " +
                                  csvDataArray[i]["ITEM CODE"] +
                                  " Not Found For In Master Data";
                              } else {
                                bulkSqList[
                                  index
                                ].EvolveSalesQuote_Details.EvolveItem_ID =
                                  itemId.recordset[0].EvolveItem_ID;

                                if (
                                  itemId.recordset[0].EvolveTaxClass_ID ==
                                    null ||
                                  itemId.recordset[0].EvolveTaxClass_ID ==
                                    undefined ||
                                  itemId.recordset[0].EvolveTaxClass_ID == ""
                                ) {
                                  errorStatus = true;
                                  errorMessage =
                                    "Tax Class Not Found For ITEM CODE" +
                                    csvDataArray[i]["ITEM CODE"];
                                } else {
                                  bulkSqList[
                                    index
                                  ].EvolveSalesQuote_Details.EvolveTaxClass_ID =
                                    itemId.recordset[0].EvolveTaxClass_ID;

                                  bulkSqList[
                                    index
                                  ].EvolveSalesQuote_Details.EvolveSalesQuoteDetails_TaxEnv_ID =
                                    bulkSqList[
                                      index
                                    ].headDetails.EvolveSalesQuote_TaxEnv_ID;

                                  let projectId =
                                    await Evolve.App.Services.eDoa.Requisition.SrvList.getProjectId(
                                      csvDataArray[i]["PROJECT"]
                                    );

                                  if (
                                    projectId instanceof Error ||
                                    projectId.rowsAffected < 1
                                  ) {
                                    errorStatus = true;
                                    errorMessage =
                                      "PROJECT " +
                                      csvDataArray[i]["PROJECT"] +
                                      " Not Found In Master Data";
                                  } else {
                                    bulkSqList[
                                      index
                                    ].headDetails.EvolveSalesQuote_Project_ID =
                                      projectId.recordset[0].EvolveProject_ID;

                                    let salesPersonID =
                                      await Evolve.App.Services.eDoa.Requisition.SrvList.getSalesPersonId(
                                        csvDataArray[i]["SALESPERSON CODE"]
                                      );

                                    if (
                                      salesPersonID instanceof Error ||
                                      salesPersonID.rowsAffected < 1
                                    ) {
                                      errorStatus = true;
                                      errorMessage =
                                        "SALESPERSON CODE " +
                                        csvDataArray[i]["SALESPERSON CODE"] +
                                        " Not Found In Master Data";
                                    } else {
                                      bulkSqList[
                                        index
                                      ].headDetails.EvolveSalesQuote_SalesPerson =
                                        [
                                          {
                                            id: salesPersonID.recordset[0]
                                              .EvolveSalesPerson_ID,
                                            name: salesPersonID.recordset[0]
                                              .EvolveSalesPerson_Code,
                                            commission: "0",
                                            email:
                                              salesPersonID.recordset[0]
                                                .EvolveSalesPerson_Email,
                                          },
                                        ];

                                      if (
                                        csvDataArray[i]["SHIP VIA"] !=
                                          undefined &&
                                        csvDataArray[i]["SHIP VIA"] != ""
                                      ) {
                                        let modId =
                                          await Evolve.App.Services.eDoa.Requisition.SrvList.getModeOfDelivery(
                                            csvDataArray[i]["SHIP VIA"]
                                          );

                                        if (modId instanceof Error) {
                                          errorStatus = true;
                                          errorMessage =
                                            "SHIP VIA " +
                                            csvDataArray[i]["SHIP VIA"] +
                                            " Not Found In Master Data";
                                        } else if (modId.rowsAffected > 0) {
                                          bulkSqList[
                                            index
                                          ].headDetails.EvolveSalesQuote_DeliveryMode_ID =
                                            modId.recordset[0].EvolveGenericCodeMaster_ID;
                                        } else {
                                          bulkSqList[
                                            index
                                          ].headDetails.EvolveSalesQuote_DeliveryMode_ID =
                                            null;
                                        }
                                      } else {
                                        bulkSqList[
                                          index
                                        ].headDetails.EvolveSalesQuote_DeliveryMode_ID =
                                          null;
                                      }

                                      // }
                                    }
                                  }
                                }
                              }
                            }

                            // }
                            // }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            let mergedQoteList = [];

            if (errorStatus == false) {
              let matchSq = [];
              for (let i = 0; i < bulkSqList.length; i++) {
                if (bulkSqList[i].isTaken == false) {
                  let sameSq = [];
                  sameSq.push(i);
                  bulkSqList[i].isTaken = true;

                  for (let j = i + 1; j < bulkSqList.length; j++) {
                    if (bulkSqList[j].isTaken == false) {
                      if (
                        JSON.stringify(bulkSqList[i].headDetails) ==
                        JSON.stringify(bulkSqList[j].headDetails)
                      ) {
                        sameSq.push(j);
                        bulkSqList[j].isTaken = true;
                      }
                    }
                  }

                  matchSq.push(sameSq);
                }
              }

              for (let i = 0; i < matchSq.length; i++) {
                mergedQoteList.push({
                  headDetails: bulkSqList[matchSq[i][0]].headDetails,
                  EvolveSalesQuote_Details: [],
                });
                let index = mergedQoteList.length - 1;
                for (let j = 0; j < matchSq[i].length; j++) {
                  mergedQoteList[index].EvolveSalesQuote_Details.push(
                    bulkSqList[matchSq[i][j]].EvolveSalesQuote_Details
                  );
                }
              }

              for (let i = 0; i < mergedQoteList.length; i++) {
                // mergedQoteList[i].sameLines = [] ;
                for (
                  let j = 0;
                  j < mergedQoteList[i].EvolveSalesQuote_Details.length;
                  j++
                ) {
                  for (
                    let k = j + 1;
                    k < mergedQoteList[i].EvolveSalesQuote_Details.length;
                    k++
                  ) {
                    if (
                      mergedQoteList[i].EvolveSalesQuote_Details[j]
                        .EvolveSalesQuoteDetails_LineNo ==
                      mergedQoteList[i].EvolveSalesQuote_Details[k]
                        .EvolveSalesQuoteDetails_LineNo
                    ) {
                      errorStatus = true;
                      errorMessage =
                        "Line Number Cant  be Same For Same Head Details of Sales Quote";
                    }
                  }
                }
              }

              for (let i = 0; i < mergedQoteList.length; i++) {
                for (
                  let j = 1;
                  j < mergedQoteList[i].EvolveSalesQuote_Details.length;
                  j++
                ) {
                  if (
                    j + 1 !=
                    mergedQoteList[i].EvolveSalesQuote_Details[j]
                      .EvolveSalesQuoteDetails_LineNo
                  ) {
                    errorStatus = true;
                    errorMessage =
                      "Enter Line Number In Sequience Start From 1";
                  }
                }
              }
            }

            if (errorStatus == false) {
              for (let i = 0; i < mergedQoteList.length; i++) {
                let LineDetails = mergedQoteList[i].EvolveSalesQuote_Details;
                let totalCustCost = 0;
                let totalCost = 0;

                let profitMargin = 0;
                let landedCost = 0;

                for (let j = 0; j < LineDetails.length; j++) {
                  LineDetails[j].EvolveSalesQuoteDetails_TotalPrice =
                    parseFloat(
                      LineDetails[j].EvolveItem_ItemUnitPrice *
                        LineDetails[j].EvolveSalesQuoteDetails_Qty
                    ).toFixed(2);

                  LineDetails[
                    j
                  ].EvolveSalesQuoteDetails_AfterDiscountCustUnitPrice = parseFloat(
                    LineDetails[j].EvolveSalesQuoteDetails_CustomerUnitPrice -
                      (LineDetails[j].EvolveSalesQuoteDetails_CustomerDiscount /
                        100) *
                        LineDetails[j].EvolveSalesQuoteDetails_CustomerUnitPrice
                  ).toFixed(2);

                  LineDetails[
                    j
                  ].EvolveSalesQuoteDetails_AfterDiscountCustTotalPrice = parseFloat(
                    LineDetails[j]
                      .EvolveSalesQuoteDetails_AfterDiscountCustUnitPrice *
                      LineDetails[j].EvolveSalesQuoteDetails_Qty
                  ).toFixed(2);

                  totalCost += parseFloat(
                    LineDetails[j].EvolveSalesQuoteDetails_TotalPrice
                  );
                  totalCustCost += parseFloat(
                    LineDetails[j]
                      .EvolveSalesQuoteDetails_AfterDiscountCustTotalPrice
                  );
                }

                landedCost = parseFloat(totalCost).toFixed(2);

                profitMargin = parseFloat(
                  ((totalCustCost - landedCost) / totalCustCost) * 100
                ).toFixed(2);

                mergedQoteList[i].headDetails.EvolveSalesQuote_LandedCost =
                  landedCost;
                mergedQoteList[i].headDetails.EvolveSalesQuote_ProfitMargin =
                  profitMargin;
                mergedQoteList[i].headDetails.EvolvePR_TotalCost =
                  totalCustCost;
              }
            }

            if (errorStatus == false) {
              for (let i = 0; i < mergedQoteList.length; i++) {
                let salesQuoteNo =
                  await Evolve.App.Controllers.Common.ConCommon.getSerialNumber(
                    "SALESQUOTE"
                  );
                if (salesQuoteNo == 0) {
                  errorStatus = true;
                  errorMessage = "Error While Allocate Sales Quote No";
                } else {
                  let poDate =
                    mergedQoteList[i].headDetails.EvolveSalesQuote_PoDate;

                  poDate =
                    poDate == "" || poDate == null ? null : poDate.split("-");

                  poDate =
                    poDate == null
                      ? null
                      : poDate[0] + "-" + poDate[1] + "-" + poDate[2];

                  mergedQoteList[i].headDetails.EvolveSalesQuote_PoDate =
                    poDate;
                  mergedQoteList[i].headDetails.EvolveSalesQuote_Serial =
                    salesQuoteNo;
                  mergedQoteList[i].headDetails.EvolveApprovalMatrix_ID = null;
                  mergedQoteList[i].headDetails.EvolveSalesQuote_SubmitDate =
                    null;
                  mergedQoteList[i].headDetails.EvolveSalesQuote_ReleaseDate =
                    null;
                  mergedQoteList[i].headDetails.EvolveUnit_ID =
                    req.EvolveUnit_ID;
                  mergedQoteList[i].headDetails.EvolveUser_ID =
                    req.EvolveUser_ID;
                  mergedQoteList[i].headDetails.EvolveSalesQuote_SalesPerson =
                    JSON.stringify(
                      mergedQoteList[i].headDetails.EvolveSalesQuote_SalesPerson
                    );

                  let saveQuoteHead =
                    await Evolve.App.Services.eDoa.Requisition.SrvOption.saveQuoteHeadDetails(
                      mergedQoteList[i].headDetails
                    );

                  if (
                    saveQuoteHead instanceof Error ||
                    saveQuoteHead.rowsAffected < 1
                  ) {
                    errorStatus = true;
                    errorMessage = "Error While Upload Sales Quote";
                  } else {
                    let EvolveSalesQuote_ID =
                      saveQuoteHead.recordset[0].inserted_id;

                    for (
                      let j = 0;
                      j < mergedQoteList[i].EvolveSalesQuote_Details.length;
                      j++
                    ) {
                      if (errorStatus == false) {
                        let reqdate =
                          mergedQoteList[i].EvolveSalesQuote_Details[j]
                            .EvolveSalesQuoteDetails_ReqdDate;

                        let promiseDate =
                          mergedQoteList[i].EvolveSalesQuote_Details[j]
                            .EvolveSalesQuoteDetails_PromiseDate;

                        let dueate =
                          mergedQoteList[i].EvolveSalesQuote_Details[j]
                            .EvolveSalesQuoteDetails_DueDate;

                        reqdate =
                          reqdate == "" || reqdate == null
                            ? null
                            : reqdate.split("-");

                        reqdate =
                          reqdate == null
                            ? null
                            : reqdate[0] + "-" + reqdate[1] + "-" + reqdate[2];

                        promiseDate =
                          promiseDate == "" || promiseDate == null
                            ? null
                            : promiseDate.split("-");

                        promiseDate =
                          promiseDate == null
                            ? null
                            : promiseDate[0] +
                              "-" +
                              promiseDate[1] +
                              "-" +
                              promiseDate[2];

                        dueate =
                          dueate == "" || dueate == null
                            ? null
                            : dueate.split("-");
                        dueate =
                          dueate == null
                            ? null
                            : dueate[0] + "-" + dueate[1] + "-" + dueate[2];

                        mergedQoteList[i].EvolveSalesQuote_Details[
                          j
                        ].EvolveSalesQuoteDetails_ReqdDate = reqdate;
                        mergedQoteList[i].EvolveSalesQuote_Details[
                          j
                        ].EvolveSalesQuoteDetails_PromiseDate = promiseDate;
                        mergedQoteList[i].EvolveSalesQuote_Details[
                          j
                        ].EvolveSalesQuoteDetails_DueDate = dueate;

                        mergedQoteList[i].EvolveSalesQuote_Details[
                          j
                        ].EvolveUser_ID = req.EvolveUser_ID;

                        let saveQuoteLineDetails =
                          await Evolve.App.Services.eDoa.Requisition.SrvOption.saveQuoteLineDetails(
                            mergedQoteList[i].EvolveSalesQuote_Details[j],
                            EvolveSalesQuote_ID
                          );

                        if (
                          saveQuoteLineDetails instanceof Error ||
                          saveQuoteLineDetails.rowsAffected < 1
                        ) {
                          errorStatus = true;
                          errorMessage =
                            "Error While Add Line Details Please Take Demo Csv And Match  Line etails format of Promise date , Req date etc";

                          let deleteHeadDetails =
                            Evolve.App.Services.eDoa.Requisition.SrvList.deleteSQHeadDetails(
                              EvolveSalesQuote_ID
                            );

                          let deleteLineDetails =
                            Evolve.App.Services.eDoa.Requisition.SrvList.deleteSQLineDetails(
                              EvolveSalesQuote_ID
                            );

                          break;
                        }
                      }
                    }
                  }
                }
              }
            }

            if (errorStatus) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: errorMessage,
                result: null,
              };
              res.send(obj);
            } else {
              let obj = {
                statusCode: 200,
                status: "success",
                message: "Sales Quotes Uploade Successfully",
                result: null,
              };
              res.send(obj);
            }
          }
        });
      }
    } catch (error) {
      Evolve.Log.error(
        " EERR####: Error While Amend Sales Quote" + error.message
      );
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR####: Error While Amend Sales Quote " + error.message,
        result: null,
      };
      res.send(obj);
    }
  },
};
