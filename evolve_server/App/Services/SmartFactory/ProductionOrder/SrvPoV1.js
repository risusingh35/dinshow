'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  getProductionOrderCountList: async function (data) {
    try {

        console.log("Entered  in count  >>>>")
        let startDate ;
        let endDate ;
        if(data.startDate != '' && data.endDate != '' ){
            
            let dt = data.startDate.split("/")
            let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
            startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
            dt = data.endDate.split("/")
            let edt = new Date(dt[2], dt[1] - 1, dt[0]);
            endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
        }else{
            startDate = '';
            endDate = '';


        }

        return await Evolve.SqlPool.request()
            .input('startDate', Evolve.Sql.NVarChar, startDate)
            .input('endDate', Evolve.Sql.NVarChar, endDate)
            .query("SELECT count(EvolveProdOrders_ID) AS count FROM EvolveProdOrders  WHERE CAST(EvolveProdOrders_CreatedAt as date) >= FORMAT(getdate(), @startDate) AND CAST(EvolveProdOrders_CreatedAt as date) <= FORMAT(getdate(), @endDate)");


        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },

    

getProductionOrderDatatableList: async function (start,length,data) {
try {
    let startDate ;
    let endDate ;
    if(data.startDate != '' && data.endDate != '' ){
        
        let dt = data.startDate.split("/")
        let sdt = new Date(dt[2], dt[1] - 1, dt[0]);
        startDate = sdt.getFullYear() + '-' + (sdt.getMonth() + 1) + '-' + sdt.getDate();
        dt = data.endDate.split("/")
        let edt = new Date(dt[2], dt[1] - 1, dt[0]);
        endDate = edt.getFullYear() + '-' + (edt.getMonth() + 1) + '-' + edt.getDate();
    }else{
        startDate = '';
        endDate = '';


    }
    return await Evolve.SqlPool.request()
        .input('start', Evolve.Sql.Int, start)
        .input('length', Evolve.Sql.Int, length)
        .input('startDate', Evolve.Sql.NVarChar, startDate)
        .input('endDate', Evolve.Sql.NVarChar, endDate)
        .query("SELECT epo.EvolveProdOrders_ID,epo.EvolveProdOrders_Order , epo.EvolveProdOrders_OrderId,epo.EvolveProdOrders_CreatedAt,ei.EvolveItem_Code , epo.EvolveProdOrders_Quantity , epo.EvolveProdOrders_Status , (SELECT epp.EvolveProdPlan_ProdDate FROM EvolveProdPlan epp WHERE epp.EvolveProdPlan_ID = epo.EvolveProdPlan_ID) as plan_date ,(SELECT epp.EvolveProdPlan_Code FROM EvolveProdPlan epp WHERE epp.EvolveProdPlan_ID = epo.EvolveProdPlan_ID) as plan_code ,(SELECT es.EvolveSection_Name FROM EvolveSection es WHERE  es.EvolveSection_ID = epo.EvolveSection_ID) as section FROM EvolveProdOrders epo , EvolveItem ei   WHERE CAST(epo.EvolveProdOrders_CreatedAt as date) >= FORMAT(getdate(), @startDate) AND CAST(epo.EvolveProdOrders_CreatedAt as date) <= FORMAT(getdate(), @endDate) AND ei.EvolveItem_ID = epo.EvolveItem_ID ORDER BY epo.EvolveProdOrders_ID DESC  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");

    } catch (error) {
        Evolve.Log.error(error.message);
        return new Error(error.message);
    }
},
getWorkCenterList: async function () {
  try {
      return await Evolve.SqlPool.request()
      .query('SELECT EvolveSection_ID,EvolveSection_Name  FROM EvolveSection')
  } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
  }
},
getAllItem: async function () {
  try {
      return await Evolve.SqlPool.request()
      .query('SELECT EvolveItem_ID , EvolveItem_Code FROM EvolveItem')
  } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
  }
},
printProdOrderSerial: async function (EvolveProdOrdersDetail_ID) {
  try {
      return await Evolve.SqlPool.request()
      .input('EvolveProdOrdersDetail_ID', Evolve.Sql.Int, EvolveProdOrdersDetail_ID)
      .query("SELECT epod.EvolveProdOrdersDetail_Serial,epo.EvolveItem_ID,ei.EvolveItem_Code FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_ID =@EvolveProdOrdersDetail_ID AND epo.EvolveItem_ID = ei.EvolveItem_ID")
  } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
  }
},
printProdOrder: async function (data) {
  try {

      console.log("data>>>" ,  data)
      return await Evolve.SqlPool.request()
      .input('EvolveProdOrders_ID',Evolve.Sql.Int,data.EvolveProdOrders_ID)
      .query("SELECT TOP(1) epo.EvolveProdOrders_Order , epod.EvolveProdOrdersDetail_Serial , epo.EvolveProdOrders_Quantity FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo WHERE epo.EvolveProdOrders_Status = 'started' AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID AND epod.EvolveProdOrders_ID = @EvolveProdOrders_ID")
  } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
  }
},

createWorkOrder: async function (data) {
  try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      var str = "" + 1;
      var pad = "0000";
      var wocount = pad.substring(0, pad.length - str.length) + str; //0001
      var dateObj = new Date();
      var month = dateObj.getMonth() + 1; //months from 1-12
      var day = dateObj.getDate();
      var year = dateObj.getFullYear().toString().substr(-2)
      // if (month == 10) {
      //     month = 'X';
      // } else if (month == 11) {
      //     month = 'Y';
      // } else if (month == 12) {
      //     month = 'Z';
      // }
      let newdate = day + "" + month + "" + year; //28219 
      let wo_nbr = "WO" + newdate + "" + wocount //WO292190001
      let wo_id = newdate + "" + wocount //WO292190001
      let check_wo = await Evolve.SqlPool.request()
          .query("SELECT TOP 1 EvolveProdOrders_Order From EvolveProdOrders ORDER BY EvolveProdOrders_ID DESC")
      if (check_wo.rowsAffected > 0) {
          var last_wo = check_wo.recordset[0].EvolveProdOrders_Order
          if (last_wo.indexOf(newdate) > -1) {
              let wo_new = parseInt(last_wo.substr(-4)) + 1 //0002 => 2
              let tmp = "" + wo_new
              wocount = pad.substring(0, pad.length - tmp.length) + tmp
              wo_nbr = "WO" + newdate + "" + wocount
              wo_id = newdate + "" + wocount
          }
          else{
              wo_nbr = "WO" + newdate + "" + wocount
              wo_id = newdate + "" + wocount 
          }
      } else {
          wo_nbr = "WO" + newdate + "" + wocount
          wo_id = newdate + "" + wocount
      }

      let wo_ins = await Evolve.SqlPool.request()
          .input('EvolveProdOrders_OrderId', Evolve.Sql.NVarChar,wo_id)
          .input('EvolveProdOrders_Order', Evolve.Sql.NVarChar, wo_nbr)
          .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
          .input('EvolveProdOrders_Status', Evolve.Sql.NVarChar, 'open')
          .input('EvolveProdOrders_Quantity', Evolve.Sql.Int, data.EvolveProdOrders_Quantity)
          .input('EvolveProdOrders_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
          .input('EvolveProdOrders_CreatedAt', Evolve.Sql.NVarChar, dataTime)
          .input('EvolveProdOrders_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
          .input('EvolveProdOrders_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
          .input('EvolveProdPlan_ID', Evolve.Sql.Int, null)
          .input('EvolveProdPlanDetail_ID', Evolve.Sql.Int, null)
          .input('EvolveSection_ID', Evolve.Sql.Int, data.EvolveSection_ID)
          .query("INSERT INTO EvolveProdOrders (EvolveProdOrders_OrderId,EvolveProdOrders_Order,EvolveItem_ID,EvolveProdOrders_Status,EvolveProdOrders_Quantity,EvolveProdOrders_CreatedUser,EvolveProdOrders_CreatedAt,EvolveProdOrders_UpdatedUser,EvolveProdOrders_UpdatedAt,EvolveProdPlan_ID,EvolveProdPlanDetail_ID,EvolveSection_ID) VALUES(@EvolveProdOrders_OrderId,@EvolveProdOrders_Order,@EvolveItem_ID,@EvolveProdOrders_Status,@EvolveProdOrders_Quantity,@EvolveProdOrders_CreatedUser,@EvolveProdOrders_CreatedAt,@EvolveProdOrders_UpdatedUser,@EvolveProdOrders_UpdatedAt,@EvolveProdPlan_ID,@EvolveProdPlanDetail_ID,@EvolveSection_ID);select @@IDENTITY AS \'inserted_id\'")
      return wo_ins;
  } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
  }
},
detailWorkOrder: async function (data) {
  try {
      return await Evolve.SqlPool.request()
      .input('EvolveProdOrders_ID',Evolve.Sql.Int,data.EvolveProdOrders_ID)
      .query("SELECT epd.EvolveProdOrdersDetail_ID , epo.EvolveProdOrders_Order , epd.EvolveProdOrdersDetail_Serial , epd.EvolveProdOrdersDetail_Status , et.EvolveprocessTemp_Name , epd.EvolveProdOrdersDetail_Qty , (SELECT ep.Evolveprocess_name  FROM EvolveProcessTempSeq epts, EvolveProcess ep WHERE epts.Evolveprocesstemp_seq = epd.EvolveProdOrdersDetail_NxtSeq AND ep.Evolveprocess_id=epts.Evolveprocess_id AND           epts.Evolveprocesstemp_id=et.Evolveprocesstemp_id) as 'Current_Sequence_Name' FROM EvolveProdOrdersDetail epd , EvolveProdOrders epo , EvolveItem ei , EvolveProcessTemp et WHERE epd.EvolveProdOrders_ID = @EvolveProdOrders_ID  AND epd.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID AND ei.EvolveProcessTemp_Id = et.EvolveprocessTemp_ID")
  } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
  }
},
startWorkOrder: async function (data) {
  try {
      let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

      let wo_data = await Evolve.SqlPool.request()
          .input('EvolveProdOrders_ID',Evolve.Sql.Int,data.EvolveProdOrders_ID)
          .query('SELECT epo.EvolveProdOrders_ID  ,  epo.EvolveProdOrders_Quantity , ei.EvolveItem_ID , ei.EvolveItem_CustPart , ei.EvolveItem_Type , ei.EvolveSerial_ID , ei.EvolveProcessTemp_Id , epo.EvolveSection_ID , eig.EvolveItemGroup_Name , eig.EvolveItemGroup_ID  , es.* FROM EvolveProdOrders epo , EvolveItem ei , EvolveItemGroup eig ,  EvolveSerial es WHERE epo.EvolveProdOrders_ID = @EvolveProdOrders_ID AND epo.EvolveItem_ID = ei.EvolveItem_ID  AND es.EvolveSerial_ID = ei.EvolveSerial_ID AND ei.EvolveItemGroup_ID = eig.EvolveItemGroup_ID')

          // console.log("wo_data???? ,  wo_data" ,wo_data )

      if(wo_data instanceof Error || wo_data.rowsAffected < 1) {
  
          Evolve.Log.error("Error while get  wo  data")
          return wo_data;
      } else {
          let get_processTemp = await Evolve.SqlPool.request()
              .input('EvolveProcessTemp_Id',Evolve.Sql.Int, wo_data.recordset[0].EvolveProcessTemp_Id)
              .query('SELECT TOP (1) EvolveProcessTemp_Seq FROM EvolveProcessTempSeq WHERE EvolveProcessTemp_ID = @EvolveProcessTemp_Id ORDER BY EvolveProcessTemp_Seq ASC')
 

          if(get_processTemp instanceof Error || get_processTemp.rowsAffected < 1){
 
            
            Evolve.Log.error("Error while get  Process temp")
            return get_processTemp;

          } else {
              var seq = get_processTemp.recordset[0].EvolveProcessTemp_Seq;
              var str = "" + wo_data.recordset[0].EvolveSerial_Next;
              var pad = "00000";
              var sr_end = pad.substring(0, pad.length - str.length) + str; //0001
              var dateObj = new Date();
              var month = dateObj.getMonth() + 1; //months from 1-12
              var day = dateObj.getDate();
              var year = dateObj.getFullYear().toString().substr(-2);
              let nxt_sr = 0;
              for (var qty = 1; qty <= wo_data.recordset[0].EvolveProdOrders_Quantity; qty++) {
                  if(wo_data.recordset[0].EvolveItemGroup_ID == 2 || wo_data.recordset[0].EvolveItemGroup_ID == 3 || wo_data.recordset[0].EvolveItemGroup_ID == 4 ){
                      let scanReq = 0;
                      if (month == 10) {
                          month = "A";
                      } else if (month == 11) {
                          month = "B";
                      } else if (month == 12) {
                          month = "C";
                      }
                      
                      // Match Day
                      if (day == 1) {
                          day = "01";
                      }else if (day == 2) {
                          day = "02";
                      }else if (day == 3) {
                          day = "03";
                      }else if (day == 4) {
                          day = "04";
                      }else if (day == 5) {
                          day = "05";
                      }else if (day == 6) {
                          day = "06";
                      }else if (day == 7) {
                          day = "07";
                      }else if (day == 8) {
                          day = "08";
                      }else if (day == 9) {
                          day = "09";
                      }

                      if (year == 19){
                          year = "K";
                      } else if (year == 20) {
                          year = "L";
                      } else if (year == 21) {
                          year = "M";
                      } else if (year == 22) {
                          year = "N";
                      } else if (year == 23) {
                          year = "P";
                      } else if (year == 24) {
                          year = "Q";
                      } else if (year == 25) {
                          year = "R";
                      } else if (year == 26) {
                          year = "S";
                      } else if (year == 27) {
                          year = "T";
                      }
                      let prefix = '';
                      if(wo_data.recordset[0].EvolveItem_Type == 'FRRH') {
                          prefix = '5';
                      } else if(wo_data.recordset[0].EvolveItem_Type == 'FRLH') {
                          prefix = '6';
                      } else if(wo_data.recordset[0].EvolveItem_Type == 'RRRH') {
                          prefix = '7';
                      } else if(wo_data.recordset[0].EvolveItem_Type == 'RRLH') {
                          prefix = '8';
                      } else if(wo_data.recordset[0].EvolveItem_Type == 'CONSOLE1') {
                          prefix = '1';
                      } else if(wo_data.recordset[0].EvolveItem_Type == 'CONSOLE2') {
                          prefix = '1';
                      }  else if(wo_data.recordset[0].EvolveItem_Type == 'Knee1') {
                          prefix = '1';
                      }  else if(wo_data.recordset[0].EvolveItem_Type == 'Knee2') {
                          prefix = '1';
                      }
                      let newdate = year + "" + month + "" + day; //28219
                      //let sr_nbr = wo_data.recordset[0].EvolveSerial_Prefix + newdate + "" + sr_end; 
                      let sr_nbr = newdate + "" + sr_end; 
                      let refNumber = "0"+prefix+"0100065"+wo_data.recordset[0].EvolveItem_CustPart+"00"+sr_nbr;
                      console.log("Add serial  number called >>> ")
                      let add_serialNo = await Evolve.SqlPool.request()
                          .input('EvolveProdOrders_ID',Evolve.Sql.Int,data.EvolveProdOrders_ID)
                          .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,sr_nbr)
                          .input('EvolveProdOrdersDetail_Qty',Evolve.Sql.Int,'1')
                          .input('EvolveProdOrdersDetail_PrvSeq',Evolve.Sql.Int, seq)
                          .input('EvolveProdOrdersDetail_NxtSeq',Evolve.Sql.Int, seq)
                          .input('EvolveProdOrdersDetail_Status',Evolve.Sql.NVarChar, 'In Queue')
                          .input('EvolveProdOrdersDetail_RefNumber',Evolve.Sql.NVarChar, refNumber)
                          .input('EvolveProdOrdersDetail_CreatedUser',Evolve.Sql.NVarChar, data.EvolveUser_ID)
                          .input('EvolveProdOrdersDetail_CreatedAt',Evolve.Sql.NVarChar, dataTime)
                          .input('EvolveProdOrdersDetail_UpdatedUser',Evolve.Sql.NVarChar, data.EvolveUser_ID)
                          .input('EvolveProdOrdersDetail_UpdatedAt',Evolve.Sql.NVarChar, dataTime)
                          .query('INSERT INTO EvolveProdOrdersDetail (EvolveProdOrders_ID , EvolveProdOrdersDetail_Serial , EvolveProdOrdersDetail_Qty , EvolveProdOrdersDetail_PrvSeq , EvolveProdOrdersDetail_NxtSeq , EvolveProdOrdersDetail_Status,EvolveProdOrdersDetail_RefNumber,EvolveProdOrdersDetail_CreatedUser , EvolveProdOrdersDetail_CreatedAt , EvolveProdOrdersDetail_UpdatedUser , EvolveProdOrdersDetail_UpdatedAt) VALUES (@EvolveProdOrders_ID , @EvolveProdOrdersDetail_Serial , @EvolveProdOrdersDetail_Qty , @EvolveProdOrdersDetail_PrvSeq , @EvolveProdOrdersDetail_NxtSeq , @EvolveProdOrdersDetail_Status , @EvolveProdOrdersDetail_RefNumber , @EvolveProdOrdersDetail_CreatedUser , @EvolveProdOrdersDetail_CreatedAt , @EvolveProdOrdersDetail_UpdatedUser , @EvolveProdOrdersDetail_UpdatedAt);select @@IDENTITY AS \'inserted_id\'');

                          console.log("get  part bom  called >>> for item  >" , wo_data.recordset[0].EvolveItem_ID)

                      let get_partBom = await Evolve.SqlPool.request()
                          .input('EvolvePartBom_ParentItem_ID',Evolve.Sql.Int,wo_data.recordset[0].EvolveItem_ID)
                          .query('SELECT * FROM EvolvePartBom WHERE EvolvePartBom_ParentItem_ID = @EvolvePartBom_ParentItem_ID ORDER BY EvolvePartBom_DispSeq ASC');

                          console.log("get_partBom>>> result "  , get_partBom)

                      for(let j=0;j < get_partBom.rowsAffected ; j++) {
                          let check_scan = await Evolve.SqlPool.request()
                              .input('EvolveItem_ID',Evolve.Sql.Int,get_partBom.recordset[j].EvolvePartBom_CompItem_ID)
                              .query('SELECT EvolveItem_IsScan FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID');
          let cmp_Qty = 0;
          console.log('item_scan :',check_scan.recordset[0].EvolveItem_IsScan);
                          if(check_scan.recordset[0].EvolveItem_IsScan == true){
                              cmp_Qty = 0;
                              scanReq = parseInt(scanReq) + parseInt(get_partBom.recordset[j].EvolvePartBom_QtyPer);
                          } else {
                              cmp_Qty = get_partBom.recordset[j].EvolvePartBom_QtyPer
                              //console.log(cmp_Qty)
                          }

                          console.log("Entered  in EvolveProdOrdersDetailChild_ParentItemID>>>>>>. ")
                          let insert_ChPartBom = await Evolve.SqlPool.request()
                              .input('EvolveProdOrdersDetailChild_ParentItemID',Evolve.Sql.Int,get_partBom.recordset[j].EvolvePartBom_ParentItem_ID)
                              .input('EvolveProdOrdersDetailChild_ChildItemId',Evolve.Sql.Int,get_partBom.recordset[j].EvolvePartBom_CompItem_ID)
                              .input('EvolveProdOrdersDetail_ID',Evolve.Sql.Int,add_serialNo.recordset[0].inserted_id)
                              .input('EvolveProdOrdersDetailChild_QtyPer',Evolve.Sql.Int,get_partBom.recordset[j].EvolvePartBom_QtyPer)
                              .input('EvolveProdOrdersDetailChild_QtyScanned',Evolve.Sql.Int,cmp_Qty)
                              .input('EvolveProdOrdersDetailChild_Scanned',Evolve.Sql.Bit,check_scan.recordset[0].EvolveItem_IsScan)
                              .input('EvolveProdOrdersDetailChild_CreatedUser',Evolve.Sql.Int, data.EvolveUser_ID)
                              .input('EvolveProdOrdersDetailChild_CreatedAt',Evolve.Sql.NVarChar, dataTime)
                              .input('EvolveProdOrdersDetailChild_UpdatedUser',Evolve.Sql.Int, data.EvolveUser_ID)
                              .input('EvolveProdOrdersDetailChild_UpdatedAt',Evolve.Sql.NVarChar, dataTime)
                              .query('INSERT INTO EvolveProdOrdersDetailChild (EvolveProdOrdersDetailChild_ParentItemID , EvolveProdOrdersDetailChild_ChildItemId , EvolveProdOrdersDetail_ID , EvolveProdOrdersDetailChild_QtyPer , EvolveProdOrdersDetailChild_QtyScanned , EvolveProdOrdersDetailChild_Scanned , EvolveProdOrdersDetailChild_CreatedUser , EvolveProdOrdersDetailChild_CreatedAt , EvolveProdOrdersDetailChild_UpdatedUser , EvolveProdOrdersDetailChild_UpdatedAt) VALUES (@EvolveProdOrdersDetailChild_ParentItemID , @EvolveProdOrdersDetailChild_ChildItemId , @EvolveProdOrdersDetail_ID , @EvolveProdOrdersDetailChild_QtyPer ,@EvolveProdOrdersDetailChild_QtyScanned , @EvolveProdOrdersDetailChild_Scanned , @EvolveProdOrdersDetailChild_CreatedUser , @EvolveProdOrdersDetailChild_CreatedAt , @EvolveProdOrdersDetailChild_UpdatedUser , @EvolveProdOrdersDetailChild_UpdatedAt)');
                          //console.log(get_partBom.recordset[j].EvolvePartBom_CompItem_ID+" "+cmp_Qty)
                      }
                      let updateProdSerial = await Evolve.SqlPool.request()
                          .input('EvolveProdOrdersDetail_ID',Evolve.Sql.Int,add_serialNo.recordset[0].inserted_id)
                          .input('EvolveProdOrders_ScannedRequired',Evolve.Sql.Int, scanReq)
                          .query('UPDATE EvolveProdOrdersDetail SET EvolveProdOrders_ScannedRequired = @EvolveProdOrders_ScannedRequired , EvolveProdOrders_TotalScanned = 0 WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID');
                  }else {
                      // if (month == 10) {
                      //     month = "X";
                      // } else if (month == 11) {
                      //     month = "Y";
                      // } else if (month == 12) {
                      //     month = "Z";
                      // }
                       // Match Day
                       if (day == 1) {
                          day = "01";
                      }else if (day == 2) {
                          day = "02";
                      }else if (day == 3) {
                          day = "03";
                      }else if (day == 4) {
                          day = "04";
                      }else if (day == 5) {
                          day = "05";
                      }else if (day == 6) {
                          day = "06";
                      }else if (day == 7) {
                          day = "07";
                      }else if (day == 8) {
                          day = "08";
                      }else if (day == 9) {
                          day = "09";
                      }

                      if (month == 1) {
                          month = "01";
                      }else if (month == 2) {
                          month = "02";
                      }else if (month == 3) {
                          month = "03";
                      }else if (month == 4) {
                          month = "04";
                      }else if (month == 5) {
                          month = "05";
                      }else if (month == 6) {
                          month = "06";
                      }else if (month == 7) {
                          month = "07";
                      }else if (month == 8) {
                          month = "08";
                      }else if (month == 9) {
                          month = "09";
                      }
                      
                      let newdate = year + "" + month + "" + day; //28219
                      let sr_nbr = wo_data.recordset[0].EvolveSerial_Prefix + newdate + "" + sr_end; 
                      let add_serialNo = await Evolve.SqlPool.request()
                          .input('EvolveProdOrders_ID',Evolve.Sql.Int,data.EvolveProdOrders_ID)
                          .input('EvolveProdOrdersDetail_Serial',Evolve.Sql.NVarChar,sr_nbr)
                          .input('EvolveProdOrdersDetail_Qty',Evolve.Sql.Int,'1')
                          .input('EvolveProdOrdersDetail_PrvSeq',Evolve.Sql.Int, seq)
                          .input('EvolveProdOrdersDetail_NxtSeq',Evolve.Sql.Int, seq)
                          .input('EvolveProdOrdersDetail_Status',Evolve.Sql.NVarChar, 'In Process')
                          .input('EvolveProdOrdersDetail_CreatedUser',Evolve.Sql.NVarChar, data.EvolveUser_ID)
                          .input('EvolveProdOrdersDetail_CreatedAt',Evolve.Sql.NVarChar, dataTime)
                          .input('EvolveProdOrdersDetail_UpdatedUser',Evolve.Sql.NVarChar, data.EvolveUser_ID)
                          .input('EvolveProdOrdersDetail_UpdatedAt',Evolve.Sql.NVarChar, dataTime)
                          .query('INSERT INTO EvolveProdOrdersDetail (EvolveProdOrders_ID , EvolveProdOrdersDetail_Serial , EvolveProdOrdersDetail_Qty , EvolveProdOrdersDetail_PrvSeq , EvolveProdOrdersDetail_NxtSeq , EvolveProdOrdersDetail_Status,EvolveProdOrdersDetail_CreatedUser , EvolveProdOrdersDetail_CreatedAt , EvolveProdOrdersDetail_UpdatedUser , EvolveProdOrdersDetail_UpdatedAt) VALUES (@EvolveProdOrders_ID , @EvolveProdOrdersDetail_Serial , @EvolveProdOrdersDetail_Qty , @EvolveProdOrdersDetail_PrvSeq , @EvolveProdOrdersDetail_NxtSeq , @EvolveProdOrdersDetail_Status , @EvolveProdOrdersDetail_CreatedUser , @EvolveProdOrdersDetail_CreatedAt , @EvolveProdOrdersDetail_UpdatedUser , @EvolveProdOrdersDetail_UpdatedAt);select @@IDENTITY AS \'inserted_id\'');
                  }
                  
                  nxt_sr = parseInt(sr_end) + 1;
                  str = "" + nxt_sr;
                  pad = "00000";
                  sr_end = pad.substring(0, pad.length - str.length) + str;
              }

              let update_wp = await Evolve.SqlPool.request()
                  .input('EvolveProdOrders_ID',Evolve.Sql.Int,data.EvolveProdOrders_ID)
                  .input('EvolveProdOrders_Status',Evolve.Sql.NVarChar, 'started')
                  .query('UPDATE EvolveProdOrders SET EvolveProdOrders_Status = @EvolveProdOrders_Status WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID')

              let update_serial = await Evolve.SqlPool.request()
                  .input('EvolveSerial_ID',Evolve.Sql.Int, wo_data.recordset[0].EvolveSerial_ID)
                  .input('EvolveSerial_Next',Evolve.Sql.NVarChar, nxt_sr)
                  .query('UPDATE EvolveSerial SET EvolveSerial_Next = @EvolveSerial_Next WHERE EvolveSerial_ID = @EvolveSerial_ID')

              return update_serial
          }
      }

  } catch (error) {
      Evolve.Log.error(error.message);
      return new Error(error.message);
  }
},
closeWorkOrder : async function (data){
    try {
        let updateProdOrdersDetails =  await Evolve.SqlPool.request()
            .input('EvolveProdOrders_ID', Evolve.Sql.Int, parseInt(data.id))
            .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_Status = 'In Completed' where EvolveProdOrders_ID = @EvolveProdOrders_ID AND (EvolveProdOrdersDetail_Status = 'In Process' OR EvolveProdOrdersDetail_Status = 'In Queue')");
        
        if(updateProdOrdersDetails instanceof Error || updateProdOrdersDetails.rowsAffected < 1){
            let obj = { statusCode: 400, status: "fail", message: updateProdOrdersDetails.message, result: null };
            res.send(obj);
        }else{
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrders_ID', Evolve.Sql.Int, parseInt(data.id))
                .query("update EvolveProdOrders set EvolveProdOrders_Status = 'close' where EvolveProdOrders_ID = @EvolveProdOrders_ID");    
        }    
        
    } catch (error) {
        Evolve.Log.error(error.message);
        return new Error(error.message);
    }
},

 
}