'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    uploadCustCsv: async function(req, res) {
        try {
        
           // console.log("req.File >>>>", req.files.csvFile)
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.csvFile) {
                let csv = req.files.csvFile;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'Customer_'+date.getFullYear()+'_'+date.getMonth()+'_'+date.getDate()+'_'+date.getHours()+'_'+date.getMinutes()+'_'+date.getSeconds()+'.'+ext;
                // let fileName = date.getTime()+'.'+ext;
                // Use the mv() method to place the file somewhere on your server
                csv.mv('./public/csv/customers/'+fileName, async function(error) {
                  if (error){
                    // console.log("Error in File Upload ::", error.message);
                    let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                    res.send(obj);
                  }else{
                    let custArray = await Evolve.Csv().fromFile('./public/csv/customers/'+fileName);
                    let cust_errorStatus = false;
                    for(let i=0; i < custArray.length; i++)
                    {
                        if(cust_errorStatus == false)
                        {
                            let checkCustExits = await Evolve.App.Services.Evolve.CustomerMaster.SrvList.checkCustExits(custArray[i]['Customer Code']);
                            if(checkCustExits.rowsAffected > 0)
                            {
                                custArray[i].EvolveSupplier_ID = checkCustExits.recordset[0].EvolveSupplier_ID;
                                let updateCustomer = await Evolve.App.Services.Evolve.CustomerMaster.SrvList.updateCustomer(custArray[i]);
                                if(updateCustomer.rowsAffected <= 0){
                                    cust_errorStatus = true;
                                    Evolve.Log.error(updateCustomer.message);
                                }
                            }
                            else
                            {
                                let addCustomer = await Evolve.App.Services.Evolve.CustomerMaster.SrvList.addCustomer(custArray[i]);
                                if(addCustomer.rowsAffected <= 0){
                                    cust_errorStatus = true;
                                    Evolve.Log.error(addCustomer.message);
                                }
                            }
                        }
                    }

                    if(cust_errorStatus == true)
                    {
                        let obj = { statusCode: 400, status: "fail", message: '', result: null };
                        res.send(obj);
                    }
                    else
                    {
                        let obj = { statusCode: 200, status: "success", message: 'Customer uploaded succsessfully', result: null };
                        res.send(obj);
                    }
                    // if(item_errorStatus == true){
                    //   let obj = { statusCode: 400, status: "fail", message: item_error, result: null };
                    //   res.send(obj);
                    // } else {
                    //   let uom_errorStatus = false;
                    //   let uom_error = [];
                    //   let uom_error_tmp = [];
                    //   for(let i=0; i < itemArray.length; i++){
                    //     let uomData = await Evolve.App.Services.Evolve.EvolveServices.uomIdByUomCode(itemArray[i].UOM);
                    //     if(uomData.rowsAffected > 0)
                    //     {
                    //       itemArray[i].UOM = uomData.recordset[0].EvolveUom_ID;
                    //     }
                    //     else 
                    //     {
                    //       if(!uom_error_tmp.includes(itemArray[i].UOM)){
                    //         uom_error.push("UOM "+itemArray[i].UOM+" Not Found!");
                    //         uom_error_tmp.push(itemArray[i].UOM);
                    //       }
                    //       uom_errorStatus = true;
                    //     }
                    //   }
                    //   if(uom_errorStatus == true){
                    //     let obj = { statusCode: 400, status: "fail", message: uom_error, result: null };
                    //     res.send(obj);
                    //   } else {
                    //     let tool_errorStatus = false;
                    //     let tool_error = [];
                    //     let tool_error_tmp = [];
                    //     for(let i=0; i < itemArray.length; i++){
                    //       let toolData = await Evolve.App.Services.Evolve.EvolveServices.toolIdByToolCode(itemArray[i].DefaultTool);
                    //       if(toolData.rowsAffected > 0)
                    //       {
                    //         itemArray[i].DefaultTool = toolData.recordset[0].EvolveTool_ID;
                    //       }
                    //       else 
                    //       {
                    //         if(!tool_error_tmp.includes(itemArray[i].DefaultTool)){
                    //           tool_error.push("Tool "+itemArray[i].DefaultTool+" Not Found!");
                    //           tool_error_tmp.push(itemArray[i].DefaultTool);
                    //         }
                    //         tool_errorStatus = true;
                    //       }
                    //     }
                    //     if(tool_errorStatus == true){
                    //       let obj = { statusCode: 400, status: "fail", message: tool_error, result: null };
                    //       res.send(obj);
                    //     } else {
                    //       let location_errorStatus = false;
                    //       let location_error = [];
                    //       let location_error_tmp = [];
                    //       for(let i=0; i < itemArray.length; i++){
                    //         let locationData = await Evolve.App.Services.Evolve.EvolveServices.locationIdByLocationCode(itemArray[i].DefaultLocation);
                    //         if(locationData.rowsAffected > 0)
                    //         {
                    //           itemArray[i].DefaultLocation = locationData.recordset[0].EvolveLocation_ID;
                    //         }
                    //         else 
                    //         {
                    //           if(!location_error_tmp.includes(itemArray[i].DefaultLocation)){
                    //             location_error.push("Location "+itemArray[i].DefaultLocation+" Not Found!");
                    //             location_error_tmp.push(itemArray[i].DefaultLocation);
                    //           }
                    //           location_errorStatus = true;
                    //         }
                    //       }
                    //       if(location_errorStatus == true){
                    //         let obj = { statusCode: 400, status: "fail", message: location_error, result: null };
                    //         res.send(obj);
                    //       } else {
                    //         let addItemError = false;
                    //         let addItemErrorCode = [];
                    //         for(let i=0; i < itemArray.length; i++){
                    //           if(addItemError == false){
                    //             let locationData = await Evolve.App.Services.Evolve.EvolveServices.addItemsCSV(itemArray[i]);
                    //             if(locationData instanceof Error || locationData.rowsAffected < 1){
                    //               location_error.push("Error While Create Item No."+itemArray[i].ItemNumber);
                    //               addItemError = true;
                    //             }
                    //           }
                    //         }
                    //         if(addItemError == true){
                    //           let obj = { statusCode: 400, status: "fail", message: addItemErrorCode, result: null };
                    //           res.send(obj);
                    //         } else {
                    //           let obj = { statusCode: 200, status: "success", message: 'Item Created Successfully !', result: null };
                    //           res.send(obj);
                    //         }
                    //       }
                    //     }
                    //   }
                    // }
                  }
                });
              }
        } catch (error) {
            Evolve.Log.error(" EERR0233: Error while uploading custom csv "+error.message);
            let obj = { statusCode: 400, status: "fail !", message: " EERR0233: Error while uploading custom csv "+error.message, result: null };
            res.send(obj);
        }
    },

    getSupplierList : async function(req, res) {
        try{
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let customerCount = await Evolve.App.Services.Evolve.supplierMaster.SrvList.getCustomerCount(search);
            let customers = await Evolve.App.Services.Evolve.supplierMaster.SrvList.getCustomerList(start ,length , search);
            if (customers instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3065 :  Error While get customer list !",
                    result: customers.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: customerCount.recordset[0].count,
                    records: customers.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Customer list",
                    result: resObj
                };
                res.send(obj);
            }
        }catch (error){
            Evolve.Log.error("EERR3066 : Error While get customer list "+error.message);
            let obj = { statusCode: 400, status: "fail !", message: "EERR3066 : Error While get customer list "+error.message, result: null };
            res.send(obj);
        }
    }
}