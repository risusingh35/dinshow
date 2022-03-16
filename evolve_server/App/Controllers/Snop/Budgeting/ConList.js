'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

xlsBudgeting: async function (req, res) {
		try {
			req.body.EvolveUser_ID = req.EvolveUser_ID;
			if (req.files.budget_upload) {
				let xls = req.files.budget_upload;
				var re = /(?:\.([^.]+))?$/;
				var ext = re.exec(xls.name)[1];
				let date = new Date();
				let fileName = date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate() + "_" + date.getHours() + "_" + date.getMinutes() + "_" + date.getSeconds() + "." + ext;
				let datetime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
				// let fileName = date.getTime()+'.'+ext;
				// Use the mv() method to place the file somewhere on your server
				xls.mv("./csv/" + fileName, async function (error) {
					if (error) {
						let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
						res.send(obj);
					} else {
						let workbook = await Evolve.Xlsx.readFile('./csv/' + fileName);
						var sheet_name_list = workbook.SheetNames;
						var data = [];
						sheet_name_list.forEach(function (y) {
							var worksheet = workbook.Sheets[y];
							var headers = {};

							for (let z in worksheet) {
								if (z[0] === '!') continue;
								//parse out the column, row, and value
								var tt = 0;
								for (var i = 0; i < z.length; i++) {
									if (!isNaN(z[i])) {
										tt = i;
										break;
									}
								};
								var col = z.substring(0, tt);
								var row = parseInt(z.substring(tt));
								var value = worksheet[z].v;

								//store header names
								if (row == 1 && value) {
									headers[col] = value;
									continue;
								}

								if (!data[row]) data[row] = {};
								data[row][headers[col]] = value;
							}
							//drop those first two rows which are empty
							data.shift();
							data.shift();

						});
						//console.log("data :", data);
						let save_error = false;
						let error_msg = "";
            let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            // let checkbudgetStatus = await Evolve.App.Services.Snop.Budgeting.SrvList.checkbudgetStatus(data[0]['Year']);
            // if(checkbudgetStatus.recordset[0].count < 1 )
            // {
              for (let k = 0; k < data.length; k++) 
              {
                //console.log("data :", data[k]);
                let getBusinessLineID = await Evolve.App.Services.Snop.Budgeting.SrvList.getBusinessLineID(data[k]['Business Line']);
                if (getBusinessLineID instanceof Error || getBusinessLineID.rowsAffected < 1) {
                  Evolve.Log.error('Business Line Does Not Exist');
                  save_error = true;
                  error_msg = "Business Line Does Not Exist";
                } else {
                  // console.log("Business line: ", data[k]['Business Line']);
                  let getBranchId = await Evolve.App.Services.Snop.Budgeting.SrvList.getBranchId(data[k]['Branch name']);
                  if (getBranchId instanceof Error || getBranchId.rowsAffected < 1) {
                    Evolve.Log.error('Branch Does Not Exist');
                    save_error = true;
                    error_msg = "Branch Does Not Exist";
                  } else {
                    for (let m = 0; m < monthNames.length; m++) {
                      //console.log(monthNames[m] in data[k]);
                      let budget_amount = data[k][monthNames[m]]; // budget amount value
                      let budget_amount_so = data[k]["SO"+monthNames[m]];
                      let budget_amount_cm = data[k]["CM"+monthNames[m]];
                      if (monthNames[m] in data[k]) {
                        let checkBudgetExistArray = {
                          "EvolveBusinessLine_ID": getBusinessLineID.recordset[0].EvolveBusinessLine_ID,
                          "EvolveBranch_ID": getBranchId.recordset[0].EvolveBranch_ID,
                          "EvolveBudget_Year": data[k]['Year'],
                          "EvolveBudget_Month": monthNames[m],
                        }
                        //console.log(" checkBudgetExistArray ::", checkBudgetExistArray);
                        let checkBudgetExist = await Evolve.App.Services.Snop.Budgeting.SrvList.checkBudgetExist(checkBudgetExistArray);
                        let addOrUpdateBudget = "";
                        if (checkBudgetExist.rowsAffected < 1) {
                          let addBudgetArray = {
                            "EvolveBusinessLine_ID": getBusinessLineID.recordset[0].EvolveBusinessLine_ID,
                            "EvolveBranch_ID": getBranchId.recordset[0].EvolveBranch_ID,
                            "EvolveBudget_Value": budget_amount,
                            "EvolveBudget_Year": data[k]['Year'],
                            "EvolveBudget_Month": monthNames[m],
                            "EvolveBudget_SOValue": budget_amount_so,
                            "EvolveBudget_ComMargin": budget_amount_cm,
                            "EvolveBudget_Status": 'uploaded',
                            "EvolveBudget_CreatedAt": datetime,
                            "EvolveBudget_CreatedUser": req.EvolveUser_ID,
                            "EvolveBudget_UpdatedAt": datetime,
                            "EvolveBudget_UpdatedUser": req.EvolveUser_ID
                          }
                          let addOrUpdateBudget = await Evolve.App.Services.Snop.Budgeting.SrvList.addBudget(addBudgetArray);
                          if (addOrUpdateBudget instanceof Error || addOrUpdateBudget.rowsAffected < 1) {
                            Evolve.Log.error('Error During Add Budget');
                            save_error = true;
                            error_msg = "Error During Add Budget";
                          } else {
                            save_error = false;
                            error_msg = "Budget uploaded successfully";
                          }
                        } else {
                          let currentMonthIndex = date.getMonth();
                          if(m > currentMonthIndex)
                          {
                            let updateBudgetArray = {
                              "EvolveBudget_ID": checkBudgetExist.recordset[0].EvolveBudget_ID,
                              "EvolveBudget_Value": budget_amount,
                              "EvolveBudget_SOValue": budget_amount_so,
                              "EvolveBudget_ComMargin": budget_amount_cm,
                              "EvolveBudget_UpdatedAt": datetime,
                              "EvolveBudget_UpdatedUser": req.EvolveUser_ID
                            }
                            let addOrUpdateBudget = await Evolve.App.Services.Snop.Budgeting.SrvList.updateBudget(updateBudgetArray);
                            if (addOrUpdateBudget instanceof Error || addOrUpdateBudget.rowsAffected < 1) {
                              Evolve.Log.error('Error During Add Budget');
                              save_error = true;
                              error_msg = "Error During Add Budget";
                            } else {
                              if(checkBudgetExist.recordset[0].EvolveBudget_Status == "freezed")
                              {
                                let getBudgetBranchLinkArray = {
                                  "EvolveBusinessLine_ID": getBusinessLineID.recordset[0].EvolveBusinessLine_ID,
                                  "EvolveBranch_ID": getBranchId.recordset[0].EvolveBranch_ID,
                                  "EvolveBudgetBranchLink_Year": data[k]['Year'],
                                  "EvolveBudgetBranchLink_Month": monthNames[m],
                                  "EvolveBudgetBranchLink_UpdatedAt": datetime,
                                  "EvolveBudgetBranchLink_MonthBudget": budget_amount,
                                  "EvolveBudgetBranchLink_UpdatedUser": req.EvolveUser_ID
                                }
                                let getBudgetBranchLink_ID = await Evolve.App.Services.Snop.Budgeting.SrvList.getBudgetBrachLink_ID(getBudgetBranchLinkArray);
                                if (getBudgetBranchLink_ID instanceof Error || getBudgetBranchLink_ID.rowsAffected < 1) {
                                  Evolve.Log.error('Budget Branch Link Not Found !');
                                  save_error = true;
                                  error_msg = "Budget Branch Link Not Found !";
                                } else {
                                  let updateBudgetBranchLinkArray = {
                                    "EvolveBudgetBranchLink_ID": getBudgetBranchLink_ID.recordset[0].EvolveBudgetBranchLink_ID,
                                    "EvolveBudgetBranchLink_MonthBudget": budget_amount,
                                    "EvolveBudgetBranchLink_SOValue" : budget_amount_so,
                                    "EvolveBudgetBranchLink_ComMargin" : budget_amount_cm,
                                    "EvolveBudgetBranchLink_UpdatedAt": datetime,
                                    "EvolveBudgetBranchLink_UpdatedUser": req.EvolveUser_ID
                                  }
                                  let updateBudgetBranchLink = await Evolve.App.Services.Snop.Budgeting.SrvList.updateBudgetBranchLink(updateBudgetBranchLinkArray);
                                  if (updateBudgetBranchLink instanceof Error || updateBudgetBranchLink.rowsAffected < 1) {
                                    Evolve.Log.error('Error During Update BudgetBranchLink');
                                    save_error = true;
                                    error_msg = "Error During update BudgetBranchLink";
                                  } else {
                                    let updateBranchForecastArray = {
                                      "EvolveBudgetBranchLink_ID": getBudgetBranchLink_ID.recordset[0].EvolveBudgetBranchLink_ID,
                                      "EvolveBranchForecast_Value": budget_amount,
                                      "EvolveBranchForecast_UpdatedAt": datetime,
                                      "EvolveBranchForecast_UpdatedUser": req.EvolveUser_ID
                                    }
                                    let updateBranchForecast = await Evolve.App.Services.Snop.Budgeting.SrvList.updateBranchForecast(updateBranchForecastArray);
                                    if (updateBranchForecast instanceof Error || updateBranchForecast.rowsAffected < 1) {
                                      Evolve.Log.error('Error During Update Branch Forecast');
                                      save_error = true;
                                      error_msg = "Error During Update Branch Forecast";
                                    } else {
                                      save_error = false;
                                      error_msg = "Budget uploaded successfully";
                                    }
                                  }
                                }
                              }
                              else
                              {
                                save_error = false;
                                error_msg = "Budget uploaded successfully";
                              }
                            }
                          }
                          else
                          {
                            save_error = false;
                            error_msg = "Budget uploaded successfully";
                          }
                        }
                      }

                    }
                  }
                }
              }
              if (save_error == false) {
                let obj = { statusCode: 200, status: "success", message: error_msg, result: data[0]['Year'] };
                res.send(obj);
              } else {
                let obj = { statusCode: 400, status: "fail", message: error_msg, result: null };
                res.send(obj);
              }
            // } 
            // else
            // {
            //   let obj = { statusCode: 400, status: "fail", message: "Already status is freezed for "+data[0]['Year'], result: null };
            //   res.send(obj);
            // }
					}
				});
			}
		} catch (error) {
			Evolve.Log.error(error.message);
			let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
			res.send(obj);
		}
 
},

getAllBudget: async function(req, res) {
    try {

        // console.log("YEAR :",req.body.year)

        
        let ForecastvsActualData = await Evolve.App.Services.Snop.Budgeting.SrvList.getAllBudget(req.body.year);
        if (ForecastvsActualData instanceof Error) {
            Evolve.Log.error('Error on get Budget data!');
            let obj = { statusCode: 400, status: "fail", message: "Error on get budget data!", result: null }; 
            res.send(obj);
          } else if(ForecastvsActualData.rowsAffected < 1){
            let obj = { statusCode: 400, status: "fail", message: "No budget found for year "+req.body.year, result: null }; 
            res.send(obj);
          } else {
            // let RootData = {};
            let RootData = {};
            let BranchData = [];
            let headerRow = [];
            let totalRow = [];
            headerRow.push("Business Line" , "Region" , "Branch name" , "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")
            for(let i=0; i < ForecastvsActualData.recordsets[0].length; i++)
            {
              BranchData.push(
                { 
                  "EvolveBranch_ID" :  ForecastvsActualData.recordsets[0][i].EvolveBranch_ID,
                  "EvolveBusinessLine_ID" :  ForecastvsActualData.recordsets[0][i].EvolveBusinessLine_ID,
                  "Business Line" : ForecastvsActualData.recordsets[0][i].EvolveBusinessLine_Code,
                  "Region" : ForecastvsActualData.recordsets[0][i].EvolveBranch_Region,
                  "Branch name" : ForecastvsActualData.recordsets[0][i].EvolveBranch_Code, 
                  "Status" : ForecastvsActualData.recordsets[0][i].EvolveBudget_Status,
                }
              );
            }
            for(let j = 0; j < BranchData.length; j++)
            {
              let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              for(let k = 0; k < monthNames.length; k++)
              {
                let monthReqData = {
                  "EvolveBranch_ID" : BranchData[j].EvolveBranch_ID,
                  "EvolveBusinessLine_ID" : BranchData[j].EvolveBusinessLine_ID,
                  "EvolveBudget_Month" : monthNames[k],
                  "EvolveBudget_Year" : req.body.year
                }
                let getmonthBudgetData = await Evolve.App.Services.Snop.Budgeting.SrvList.getmonthBudgetData(monthReqData);
                if (getmonthBudgetData instanceof Error) {
                  Evolve.Log.error('Error on get Budget monthly budget data!');
                } else if(getmonthBudgetData.rowsAffected < 1){
                  BranchData[j][monthNames[k]] = 0;
                } else {
                  BranchData[j][monthNames[k]] = parseFloat(getmonthBudgetData.recordset[0].EvolveBudget_Value).toFixed(2);
                  let monthIndex = monthNames.indexOf(monthNames[k]);
                  if(totalRow[monthIndex] === undefined){
                    totalRow[monthIndex] = getmonthBudgetData.recordset[0].EvolveBudget_Value;
                  } else {
                    totalRow[monthIndex] = totalRow[monthIndex] + getmonthBudgetData.recordset[0].EvolveBudget_Value;
                  }
                }
              } 
            }
            RootData.headers = headerRow;
            RootData.total = totalRow;
            RootData.BranchData = BranchData;
            // console.log("totalRow :",totalRow);
            // console.log("branchNameArray :",branchNameArray);
            // let branch = [];
            // let businessLine = [];
            // let businessLineBudgetTotal = [];
            // let businessLineBudgetRegionTotal = [];
            // businessLine.push("BRANCH") // Title of Rows
            // //Get Uniq Branch & Business Line
            // for(let i=0; i < ForecastvsActualData.recordsets[0].length; i++){
            //   // For Region
            //   if(!branch.includes(ForecastvsActualData.recordsets[0][i].EvolveBranch_Region)){
            //     branch.push(ForecastvsActualData.recordsets[0][i].EvolveBranch_Region);
            //   }
            //   // For Branch
            //   if(!branch.includes(ForecastvsActualData.recordsets[0][i].EvolveBranch_Code)){
            //     branch.push(ForecastvsActualData.recordsets[0][i].EvolveBranch_Code);
            //   }
            //   // For Business Line
            //   if(!businessLine.includes(ForecastvsActualData.recordsets[0][i].EvolveBusinessLine_Code)){
            //     businessLine.push(ForecastvsActualData.recordsets[0][i].EvolveBusinessLine_Code);
            //   }


            //   // For Total of Budget Value
            //   let key = ForecastvsActualData.recordsets[0][i].EvolveBusinessLine_Code+ForecastvsActualData.recordsets[0][i].EvolveBranch_Code;
            //   if(businessLineBudgetTotal[key]){
            //     businessLineBudgetTotal[key] = businessLineBudgetTotal[key] + parseFloat(ForecastvsActualData.recordsets[0][i].EvolveBudget_Value);
            //   }else{
            //     businessLineBudgetTotal[key] = parseFloat(ForecastvsActualData.recordsets[0][i].EvolveBudget_Value);
            //   }
              
              

            //   // For Get Toatal of Business Line Budget & Actual AS region wise
            //   key = key+ForecastvsActualData.recordsets[0][i].EvolveBranch_Region;
              
            //   if(businessLineBudgetRegionTotal[key]){
            //     businessLineBudgetRegionTotal[key] = businessLineBudgetRegionTotal[key] + parseFloat(ForecastvsActualData.recordsets[0][i].EvolveBudget_Value);
            //   }else{
            //     businessLineBudgetRegionTotal[key] = parseFloat(ForecastvsActualData.recordsets[0][i].EvolveBudget_Value);
            //   }

            //   // Branch Budget & Actual Value

            // }

            // businessLine.push("TOTAL BILLING") // Title of Rows

            // // console.log("branch :", branch)
            // // console.log("businessLine :", businessLine)
            // // console.log("businessLineBudgetTotal :", businessLineBudgetTotal)
            // // console.log("businessLineBudgetRegionTotal :", businessLineBudgetRegionTotal)

            // // Get Uniq Sum of Budget as Per Business Line
            // let businessLineSum = [];
            // let branchSum = [];
            // let totalBudget = 0;
            // for(let a=0; a < businessLine.length; a++){
            //   for(let b=0; b < branch.length; b++){ 
            //     if(businessLineBudgetTotal[businessLine[a]+branch[b]] != undefined){
            //         totalBudget = totalBudget + parseFloat(businessLineBudgetTotal[businessLine[a]+branch[b]]);
            //       if(businessLineSum[a]){
            //         businessLineSum[a] = businessLineSum[a] + parseFloat(businessLineBudgetTotal[businessLine[a]+branch[b]]);
            //       }else{
            //         businessLineSum[a] = parseFloat(businessLineBudgetTotal[businessLine[a]+branch[b]]);
            //       }
            //       // For Branch Budget Value
            //       if(branchSum[b]){ 
            //           branchSum[b].push(parseFloat(businessLineBudgetTotal[businessLine[a]+branch[b]]));
            //       }else{
            //         branchSum[b] = [];
            //         branchSum[b].push(parseFloat(businessLineBudgetTotal[businessLine[a]+branch[b]]));
            //       }
            //     }
            //   }
            // }
            // businessLineSum.push(totalBudget);
            // // console.log("branchSum :", branchSum)
            // // Add Branch total sume
            // for(let i=0; i < branchSum.length; i++){
            //     if(branchSum[i]){
            //         let sum = 0;
            //         for(let j=0; j < branchSum[i].length; j++){
            //             sum = sum + parseFloat(branchSum[i][j]);
            //         }
            //         // console.log("branchSum[i]",branchSum[i])
            //         if(branchSum[i] && branchSum[i].length != undefined){
            //             branchSum[i].push(sum);
            //         }
            //     }
            // }
            // // console.log("businessLineSum :", businessLineSum)
            // // console.log("branchSum :", branchSum)

            // // For Branch Budget & Actual Value
            // totalBudget = 0;
            // // Region Code
            // let region = ['EAST','WEST','NORTH','SOUTH'];
            // let businessLineBudgetRegionSumEAST = [];
            // let businessLineBudgetRegionSumWEST = [];
            // let businessLineBudgetRegionSumNORTH = [];
            // let businessLineBudgetRegionSumSOUTH = [];


            // for(let a=0; a < businessLine.length; a++){
            //   for(let b=0; b < branch.length; b++){ 
            //     for(let r=0; r < region.length; r++){ 
          
            //       if(businessLineBudgetRegionTotal[businessLine[a]+branch[b]+region[r]] != undefined){

            //         if(region[r] == 'EAST'){
            //           if(businessLineBudgetRegionSumEAST[a]){
            //             businessLineBudgetRegionSumEAST[a] = businessLineBudgetRegionSumEAST[a] + parseFloat(businessLineBudgetRegionTotal[businessLine[a]+branch[b]+region[r]]);
            //           }else{
            //             businessLineBudgetRegionSumEAST[a] = parseFloat(businessLineBudgetRegionTotal[businessLine[a]+branch[b]+region[r]]);
            //           }
            //         }


            //         if(region[r] == 'WEST'){
            //           if(businessLineBudgetRegionSumWEST[a]){
            //             businessLineBudgetRegionSumWEST[a] = businessLineBudgetRegionSumWEST[a] + parseFloat(businessLineBudgetRegionTotal[businessLine[a]+branch[b]+region[r]]);
            //           }else{
            //             businessLineBudgetRegionSumWEST[a] = parseFloat(businessLineBudgetRegionTotal[businessLine[a]+branch[b]+region[r]]);
            //           }
            //         }

            //         if(region[r] == 'NORTH'){
            //           if(businessLineBudgetRegionSumNORTH[a]){
            //             businessLineBudgetRegionSumNORTH[a] = businessLineBudgetRegionSumNORTH[a] + parseFloat(businessLineBudgetRegionTotal[businessLine[a]+branch[b]+region[r]]);
            //           }else{
            //             businessLineBudgetRegionSumNORTH[a] = parseFloat(businessLineBudgetRegionTotal[businessLine[a]+branch[b]+region[r]]);
            //           }
            //         }


            //         if(region[r] == 'SOUTH'){
            //           if(businessLineBudgetRegionSumSOUTH[a]){
            //             businessLineBudgetRegionSumSOUTH[a] = businessLineBudgetRegionSumSOUTH[a] + parseFloat(businessLineBudgetRegionTotal[businessLine[a]+branch[b]+region[r]]);
            //           }else{
            //             businessLineBudgetRegionSumSOUTH[a] = parseFloat(businessLineBudgetRegionTotal[businessLine[a]+branch[b]+region[r]]);
            //           }
            //         }
            //       }
            //     }
            //   }
            // }


            // // console.log("businessLineBudgetRegionSumEAST :", businessLineBudgetRegionSumEAST)
            // // console.log("businessLineBudgetRegionSumWEST :", businessLineBudgetRegionSumWEST)
            // // console.log("businessLineBudgetRegionSumNORTH :", businessLineBudgetRegionSumNORTH)
            // // console.log("businessLineBudgetRegionSumSOUTH :", businessLineBudgetRegionSumSOUTH)

            // // Add Last Sum 

              
            // let sum = 0;
            // for(let j=0; j < businessLineBudgetRegionSumEAST.length; j++){
            //     sum = sum + parseFloat((businessLineBudgetRegionSumEAST[j]>0) ? businessLineBudgetRegionSumEAST[j] : 0);
            // }
            // businessLineBudgetRegionSumEAST.push(sum);
            // sum = 0;
            // for(let j=0; j < businessLineBudgetRegionSumWEST.length; j++){
            //     sum = sum + parseFloat((businessLineBudgetRegionSumWEST[j]>0) ? businessLineBudgetRegionSumWEST[j] : 0);
            // }
            // businessLineBudgetRegionSumWEST.push(sum);
            // sum = 0;
            // for(let j=0; j < businessLineBudgetRegionSumNORTH.length; j++){
            //     sum = sum + parseFloat((businessLineBudgetRegionSumNORTH[j]>0) ? businessLineBudgetRegionSumNORTH[j] : 0);
            // }
            // businessLineBudgetRegionSumNORTH.push(sum);
            // sum = 0;
            // for(let j=0; j < businessLineBudgetRegionSumSOUTH.length; j++){
            //     sum = sum + parseFloat((businessLineBudgetRegionSumSOUTH[j]>0) ? businessLineBudgetRegionSumSOUTH[j] : 0);
            // }
            // businessLineBudgetRegionSumSOUTH.push(sum);


            // // console.log("businessLineBudgetRegionSumEAST :", businessLineBudgetRegionSumEAST)
            // // console.log("businessLineBudgetRegionSumWEST :", businessLineBudgetRegionSumWEST)
            // // console.log("businessLineBudgetRegionSumNORTH :", businessLineBudgetRegionSumNORTH)
            // // console.log("businessLineBudgetRegionSumSOUTH :", businessLineBudgetRegionSumSOUTH)


            // RootData.branch = branch;
            // RootData.businessLine = businessLine;
            // RootData.businessLineSum =  businessLineSum;
            // RootData.branchSum = branchSum;
            

            // // Region Sum Data
            // RootData.businessLineBudgetRegionSumEAST =  businessLineBudgetRegionSumEAST;
            // RootData.businessLineBudgetRegionSumWEST =  businessLineBudgetRegionSumWEST;
            // RootData.businessLineBudgetRegionSumNORTH =  businessLineBudgetRegionSumNORTH;
            // RootData.businessLineBudgetRegionSumSOUTH =  businessLineBudgetRegionSumSOUTH;
            // console.log("RootData :", RootData)

            let obj = { statusCode: 200, status: "success",  message: " Budget Data Successfully.", result: RootData };
            res.send(obj);
          }
    } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
    }
},

freezeBudget: async function (req, res) {
  try {
    //console.log("req.body : : ", req.body)
    let getUploadedBudget = await Evolve.App.Services.Snop.Budgeting.SrvList.getUploadedBudget(req.body.EvolveBudget_Year);
    // console.log("getUploadedBudget :",getUploadedBudget.recordset);
    if (getUploadedBudget instanceof Error) {
      let obj = { statusCode: 400, status: "fail", message: "Error while get uploaded budget", result: getUploadedBudget.message };
      res.send(obj);
    } else {
      let save_error = false;
      let error_msg = "";
      let date = new Date();
			let datetime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
      // let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      for (let k = 0; k < getUploadedBudget.rowsAffected ; k++) {
        let data = getUploadedBudget.recordset[k];
        let addBudgetBranchLinkArray = {
        	"EvolveBusinessLine_ID": data.EvolveBusinessLine_ID,
        	"EvolveBranch_ID": data.EvolveBranch_ID,
        	"EvolveBudgetBranchLink_MonthBudget": data.EvolveBudget_Value,
        	"EvolveBudgetBranchLink_Month": data.EvolveBudget_Month ,
        	"EvolveBudgetBranchLink_Carry": 0.0,
          "EvolveBudgetBranchLink_Year": data.EvolveBudget_Year ,
          "EvolveBudgetBranchLink_SOValue" : data.EvolveBudget_SOValue,
          "EvolveBudgetBranchLink_ComMargin" : data.EvolveBudget_ComMargin,
        	"EvolveBudgetBranchLink_Status": 'uploaded',
        	"EvolveBudgetBranchLink_CreatedAt": datetime,
        	"EvolveBudgetBranchLink_CreatedUser": req.EvolveUser_ID,
        	"EvolveBudgetBranchLink_UpdatedAt": datetime,
        	"EvolveBudgetBranchLink_UpdatedUser": req.EvolveUser_ID
        }
        let addBudgetBranchLink = await Evolve.App.Services.Snop.Budgeting.SrvList.addBudgetBranchLink(addBudgetBranchLinkArray);
        if (addBudgetBranchLink instanceof Error || addBudgetBranchLink.rowsAffected < 1) {
          Evolve.Log.error('Error During Add BudgetBranchLink');
          save_error = true;
          error_msg = "Error During Add BudgetBranchLink";
        } 
        else {
            let addBranchForecastArray = {
          		"EvolveBudgetBranchLink_ID": addBudgetBranchLink.recordset[0].inserted_id,
          		// "EvolveBranchForecast_Value": data.EvolveBudget_Value,
          		"EvolveBranchForecast_Value": 0,
          		"EvolveBranchForecast_ActualValue": 0,
          		"EvolveBranchForecast_Slot": 1 ,
          		"EvolveBranchForecast_Status": 'uploaded',
          		"EvolveBranchForecast_CreatedAt": datetime,
          		"EvolveBranchForecast_CreatedUser": req.EvolveUser_ID,
          		"EvolveBranchForecast_UpdatedAt": datetime,
          		"EvolveBranchForecast_UpdatedUser": req.EvolveUser_ID
            }
            let addBranchForecast = await Evolve.App.Services.Snop.Budgeting.SrvList.addBranchForecast(addBranchForecastArray);
            if (addBranchForecast instanceof Error || addBranchForecast.rowsAffected < 1) {
              Evolve.Log.error('Error During Add BranchForecast');
              save_error = true;
              error_msg = "Error During Add BranchForecast";
            } else {
              let addBranchForecastHistoryArray = {
                "EvolveBudgetBranchLink_ID": addBudgetBranchLink.recordset[0].inserted_id,
                "EvolveBranchForecastHistory_Forecast": 0,
                "EvolveBranchForecastHistory_Actual": 0,
                "EvolveBranchForecastHistory_Margin": 0 ,
                "EvolveBranchForecastHistory_Month": data.EvolveBudget_Month ,
                "EvolveBranchForecastHistory_Year": data.EvolveBudget_Year  ,
                "EvolveBranchForecastHistory_Actual_Non_Million": 0,
                "EvolveBranchForecastHistory_Margin_Non_Million": 0 ,
                "EvolveBranchForecastHistory_CreatedAt": datetime,
                "EvolveBranchForecastHistory_CreatedUser": req.EvolveUser_ID,
                "EvolveBranchForecastHistory_UpdatedAt": datetime,
                "EvolveBranchForecastHistory_UpdatedUser": req.EvolveUser_ID
              }
              let addBranchForecastHistory = await Evolve.App.Services.Snop.Budgeting.SrvList.addBranchForecastHistory(addBranchForecastHistoryArray);
              if (addBranchForecastHistory instanceof Error || addBranchForecastHistory.rowsAffected < 1) {
                Evolve.Log.error('Error During Add BranchForecast History');
                save_error = true;
                error_msg = "Error During Add BranchForecast History";
              } else {
                save_error = false;
                error_msg = "Budget uploaded successfully";
              }
            }
        }

      }
      if(save_error == true) {
         let obj = { statusCode: 400, status: "fail", message: error_msg, result: null};
         res.send(obj);
      } else {
        let freezeBudget = await Evolve.App.Services.Snop.Budgeting.SrvList.freezeBudget(req.body);
        if (freezeBudget instanceof Error) {
          let obj = { statusCode: 400, status: "fail", message: "Error while freeze Budget", result: freezeBudget.message };
          res.send(obj);
        } else {
          let obj = { statusCode: 200, status: "success", message: "Budget Is Freezed !", result: freezeBudget.recordset };
          res.send(obj);
        }
      }
      
    }
    // let freezeBudget = await Evolve.App.Services.Snop.Budgeting.SrvList.freezeBudget(req.body);

    // if (freezeBudget instanceof Error) {
    //   let obj = { statusCode: 400, status: "fail", message: "Error while freeze Budget", result: freezeBudget.message };
    //   res.send(obj);
    // } else {
    //   let obj = { statusCode: 200, status: "success", message: "Budget Is Freezed !", result: freezeBudget.recordset };
    //   res.send(obj);
    // }
  } catch (error) {
    Evolve.Log.error(error.message);
    let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
    res.send(obj);
  }
},

}