const { addAbortSignal } = require("winston-daily-rotate-file");
const Evolve = require("../../../Boot/Evolve");

var machineHighSpeedDataArr = []
module.exports = {

    filterRequestData: async function(topic, reqData) {
        try {
            let data = JSON.parse(reqData.toString());

            console.log("data>>>>>>>.", data);

            // send MQTT ACK ----- for amin stop ACK
            try {
                let revertTopic = topic.split('/');
                revertTopic = revertTopic[0] + '/cmd';
                let ack = { "ts": data.ts ? data.ts : data.ets };
                Evolve.MqttClient.publish(revertTopic, JSON.stringify(ack));
                Evolve.Log.info("sending mqtt ack data")
            } catch (error) {
                Evolve.Log.error("Error while sending mqtt ack data")
                console.log(error.message);;
            }


            /** Code For Store Data into MonogDB Seever */


            // console.log("topic >>>>>>" ,topic);

            // if(topic == 'a8:3:2a:3e:e7:ec/data'){
            //   let DeviceDataObj = {
            //     DeviceCode: "'a8:3:2a:3e:e7:ec",
            //     CreatedAt : new Date(),
            //     DeviceTime: data.ts, // Send By Device 
            //     DocumentType: "", // PO / WO / SO
            //     DocumentNumber:"",
            //     Rssi : data.rssi,
            //     Motor1:{
            //         status: 0, rpm : 0
            //     },Motor2:{
            //         status: 0, rpm : 0
            //     },Motor3:{
            //         status: 0, rpm : 0
            //     }
            //   }
            //   if(data.data[0] != undefined && data.data[3] != undefined){
            //       DeviceDataObj.Motor1.status = parseInt(data.data[0]);
            //       DeviceDataObj.Motor1.rpm = parseInt(data.data[3]);
            //   }
            //   if(data.data[1] != undefined && data.data[4] != undefined){
            //     DeviceDataObj.Motor1.status = parseInt(data.data[1]);
            //     DeviceDataObj.Motor1.rpm = parseInt(data.data[4]);
            //   }
            //   if(data.data[2] != undefined && data.data[5] != undefined){
            //     DeviceDataObj.Motor1.status = parseInt(data.data[2]);
            //     DeviceDataObj.Motor1.rpm = parseInt(data.data[5]);
            //   }

            //   let result = await Evolve.Mongo.collection('GeneralData').insertOne(DeviceDataObj);
            // }




            /** End MongoDB Code */


            /** Start DateTime code */

            let unix_timestamp = data.ts ? data.ts : data.ets;
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            var date = new Date(unix_timestamp * 1000);

            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            let formattedDate = y + '-' + m + '-' + d;

            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            var seconds = "0" + date.getSeconds();

            // Will display time in 10:30:23 format
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            data.formattedDateTime = formattedDate + ' ' + formattedTime;

            /** End DateTime Code */

            /** Start Get DeviceDatils By Memory Code */

            let deviceID = 0
            let machineID = 0
            let prodOrderID = 0
            let OrderNo = 0
            let itemId = 0
            let deviceType = ""
            let deviceCode = ""
            let timer = 0

            if (data.device != undefined) {
                // console.log(">>>>>>>>>>>>>>>>>");
                for (let i = 0; i < Evolve.EvolveDeviceDatils.length; i++) {
                    if (Evolve.EvolveDeviceDatils[i].EvolveDevice_Code == data.device) {
                        deviceID = Evolve.EvolveDeviceDatils[i].EvolveDeviceType_ID
                        machineID = Evolve.EvolveDeviceDatils[i].EvolveMachine_ID
                        deviceType = Evolve.EvolveDeviceDatils[i].EvolveDeviceType_Code
                        deviceCode = Evolve.EvolveDeviceDatils[i].EvolveDevice_Code
                    }
                }
            }

            /** End Get DeviceDatils By Memory Code */

            /** Start DeviceLog Code */

            let addMqtttDeviceLog = await Evolve.App.Services.Iot.IotServices.addMqtttDeviceLog(data, topic, deviceID);
            if (addMqtttDeviceLog instanceof Error) {
                Evolve.Log.error("Error In Store Machine Log");
            } else {
                Evolve.Log.info("Log Stored In Machine Log Table");
            }

            /** End DeviceLog Code */

            /** Start CaptureWeight Code */

            if (deviceType == 'Weight') {
                if (data.data.WEIGHT) {
                    console.log("WEIGHT>>>>>>>>>>>>>>>.", data.data.WEIGHT);
                    await Evolve.Io.emit('WEIGHT', {
                        "message": 'Captured Weight !!',
                        "weight": data.data.WEIGHT,
                    });
                }
            }
            /** End CaptureWeight Code */

            /** Start Mixing DeviceLog Store Code */
            if (data.data != undefined) {
                if (deviceType == 'Mixing') {
                    // let getProdOrderList = await Evolve.App.Services.Iot.IotServices.getProdOrderList(machineID)
                    for (let i = 0; i < Evolve.MixingStartPODatils.length; i++) {
                        if (Evolve.MixingStartPODatils[i].EvolveMachine_ID == machineID) {
                            prodOrderID = Evolve.MixingStartPODatils[i].EvolveProdOrders_ID
                            OrderNo = Evolve.MixingStartPODatils[i].EvolveProdOrders_OrderNo
                            itemId = Evolve.MixingStartPODatils[i].EvolveItem_ID
                            timer = Evolve.MixingStartPODatils[i].EvolveItem_HighSpeedTime
                        }
                    }

                    if (data.data.CYL) {
                        if (data.data.CYL == 1) {
                            for (let i = 0; i < Evolve.MixingStartPODatils.length; i++) {
                                if (Evolve.MixingStartPODatils[i].EvolveDevice_Code == data.device) {
                                    Evolve.MixingStartPODatils[i].CYL = data.data.CYL
                                }
                            }
                            let query = "EvolveMixingParameter_StartTime = '" + data.formattedDateTime + "'"
                            let updateStartTime = await Evolve.App.Services.Iot.IotServices.updateTime(machineID, prodOrderID, query)
                            if (updateStartTime instanceof Error || updateStartTime.rowsAffected < 1) {
                                Evolve.Log.error("Error In Start time update ");
                            } else {
                                Evolve.Log.info("Start time update successfully");
                            }
                        }

                        if (data.data.CYL == 0) {
                            for (let i = 0; i < Evolve.MixingStartPODatils.length; i++) {
                                if (Evolve.MixingStartPODatils[i].EvolveDevice_Code == data.device) {
                                    Evolve.MixingStartPODatils[i].CYL = data.data.CYL
                                    Evolve.MixingStartPODatils[i].HS = data.data.CYL
                                }
                            }
                            let query = "EvolveMixingParameter_StopTime = '" + data.formattedDateTime + "' , EvolveMixingParameter_HighSpeedStopTime = '" + data.formattedDateTime + "'"
                            let updateEndTimeTime = await Evolve.App.Services.Iot.IotServices.updateTime(machineID, prodOrderID, query)
                            if (updateEndTimeTime instanceof Error || updateEndTimeTime.rowsAffected < 1) {
                                Evolve.Log.error("Error In Stop time update ");
                            } else {
                                Evolve.Log.info("Stop time update successfully ");
                            }
                        }

                    } else {
                        if (data.data.HS == 1) {
                            for (let i = 0; i < Evolve.MixingStartPODatils.length; i++) {
                                if (Evolve.MixingStartPODatils[i].EvolveDevice_Code == data.device) {
                                    Evolve.MixingStartPODatils[i].HS = data.data.HS
                                }
                            }
                            let find = machineHighSpeedDataArr.some(e => e.ts == data.ts && e.device == data.device)
                            console.log("find>>>>>>", find);
                            if (find == false) {
                                machineHighSpeedDataArr.push({
                                    device: data.device,
                                    ts: data.ts,
                                    timer: timer
                                });
                            }
                            setTimeout(() => {
                                let hsTimeTopic = data.device + '/cmd'
                                let hsTimeData = { "ets": data.ts, "timer": timer };
                                console.log("hsTimeData??????????????", hsTimeData);
                                Evolve.MqttClient.publish(hsTimeTopic, JSON.stringify(hsTimeData));

                            }, 2000);

                            let query = "EvolveMixingParameter_HighSpeedStartTime = '" + data.formattedDateTime + "'"
                            let updateEndTimeTime = await Evolve.App.Services.Iot.IotServices.updateTime(machineID, prodOrderID, query)
                            if (updateEndTimeTime instanceof Error || updateEndTimeTime.rowsAffected < 1) {
                                Evolve.Log.error("Error in update HighSpeedstart Time ");
                            } else {
                                Evolve.Log.info("update HighSpeedStart Time ");
                            }

                        }
                    }
                }
            } else {
                if (data.ets && data.timer == true) {
                    if (machineHighSpeedDataArr != []) {
                        for (let i = 0; i < machineHighSpeedDataArr.length; i++) {
                            if (machineHighSpeedDataArr[i].ts == data.ets) {
                                machineHighSpeedDataArr.splice(i, 1)
                            }
                        }
                    }
                }

            }
            /** End Mixing DeviceLog Store Code */

            /** Start CFD DeviceLog Store in MongoDB Code */

            if (deviceType == 'CFD') {
                let DeviceDataObj = {}


                DeviceDataObj.deviceCode = ` ${deviceCode}`
                DeviceDataObj.DeviceTimestamp = data.ts
                DeviceDataObj.DeviceTime = new Date(data.ts * 1000) + ""
                DeviceDataObj.CreatedAt = new Date() + "",
                    DeviceDataObj.Rssi = data.rssi
                DeviceDataObj.DocumentType = "WO"

                for (let j = 0; j < Evolve.CFDStartPODatils.length; j++) {
                    if (Evolve.CFDStartPODatils[j].EvolveMachine_ID = machineID) {
                        DeviceDataObj.DocumentNumber = Evolve.CFDStartPODatils[j].EvolveProdOrders_OrderNo
                        DeviceDataObj.MachineCode = Evolve.CFDStartPODatils[j].EvolveMachine_Code
                        DeviceDataObj.ItemPart = Evolve.CFDStartPODatils[j].EvolveItem_Part
                        DeviceDataObj.SectionCode = Evolve.CFDStartPODatils[j].EvolveSection_Code
                    }
                }

                let lenth = parseFloat(data.data.length) / 2
                let MotorStatus = data.data.splice(0, lenth)
                let MotorRPM = data.data
                for (let i = 0; i < MotorStatus.length; i++) {
                    DeviceDataObj["Motor" + (i + 1)] = {
                        status: parseFloat(MotorStatus[i]),
                        rpm: parseFloat(MotorRPM[i])
                    }
                }

                // console.log("DeviceDataObj = ", DeviceDataObj);


                let result = await Evolve.Mongo.collection('GeneralData').insertOne(DeviceDataObj);


            }

            /** End CFD DeviceLog Store in MongoDB Code */




            /** CFD Control Panel */
            console.log("topic>>>>>>>>>>>", data.formattedDateTime);
            if (topic == 'a8:3:2a:3e:e7:ec/data') {
                // console.log("data>>>>" ,data);
                if (data.dbk == 0) {
                    await Evolve.Io.emit('CFDLine1getData', {
                        TC: data,
                        MC: "",
                        AC: "",
                        Time: data.formattedDateTime
                    });
                }
            }

            if (topic == 'a8:3:2a:3b:a9:f4/data') {
                if (data.dbk == 0) {
                    // console.log("data>>>>" ,data);
                    await Evolve.Io.emit('CFDLine1getData', {
                        TC: "",
                        MC: data,
                        AC: "",
                        Time: data.formattedDateTime
                    });
                }

            }

            if (topic == 'a8:3:2a:3b:aa:0/data') {
                console.log("Evolve.CFD >>>", Evolve.CFD);
                console.log("data>>>>", data);
                if (data.dbk == 0) {

                    await Evolve.Io.emit('CFDLine1getData', {
                        TC: "",
                        MC: "",
                        AC: data,
                        Time: data.formattedDateTime
                    });
                }
            }


            // if (topic == '94:3c:c6:c2:c8:58/data') {
            //     // console.log("data>>>>" ,data);
            //     await Evolve.Io.emit('CFDLine1getData', {
            //         TC: "",
            //         MC: "",
            //         AC: data,
            //         Trip: ""

            //     });
            // }


            // Trip 
            if (topic == '94:3c:c6:c2:c8:58/data') {
                // console.log("data>>>>" ,data.data);

                // this.trip.push('Accumulator');
                // this.trip.push('Cooling down 1');
                // this.trip.push('Accumulator');
                if (data.dbk == 0) {

                    let trip = [];
                    trip.push({ msg: "infeed Trip status", status: data.data[0] });
                    trip.push({ msg: "accumulator Trip status", status: data.data[1] });
                    trip.push({ msg: "printing Trip status", status: data.data[2] });
                    trip.push({ msg: "Top Trip status", status: data.data[3] });
                    trip.push({ msg: "Foam Coat Trip status", status: data.data[4] });
                    trip.push({ msg: "Cooling Trip status", status: data.data[5] });
                    trip.push({ msg: "Applicator Trip status", status: data.data[6] });
                    trip.push({ msg: "Laminator Trip status", status: data.data[7] });
                    trip.push({ msg: "Embossing Trip status", status: data.data[8] });
                    trip.push({ msg: "Paper Winder Trip status", status: data.data[9] });
                    trip.push({ msg: "Main Cooling Trip status", status: data.data[10] });
                    trip.push({ msg: "Black Rubber Trip status", status: data.data[11] });
                    trip.push({ msg: "Product Winder 01 Trip status", status: data.data[12] });
                    trip.push({ msg: "Lacquer Trip status", status: data.data[13] });
                    trip.push({ msg: "Back Printing Trip status", status: data.data[14] });
                    trip.push({ msg: "Product Winder 02 Trip status", status: data.data[15] });
                    // trip.push({ msg: "Line Start status", status: data.data[16] });

                    // console.log("trip>>>" ,trip);
                    await Evolve.Io.emit('CFDLine1getData', {
                        Trip: trip,
                        Time: data.formattedDateTime,
                        lineStatus : (data.data[16] == undefined ) ? 0 : data.data[16]
                    });
                }
            }

            if (topic == 'a8:3:2a:3b:b0:b0/data') {
                // console.log("data>>>>" ,data);
                await Evolve.Io.emit('CFDLine1getData', {
                    device: data.device,
                    length: data.data.length,
                    Time: data.formattedDateTime
                });
            }



            /** End : Control Panel */

            /** Star : Mixing Data  */

            /** Star : Mixing Data  */

            if (topic == 'a8:3:2a:3b:a9:fc/data') {
                for (let i = 0; i < Evolve.EvolveIOTDevice.length; i++) {
                    if (Evolve.EvolveIOTDevice[i].Code == data.device) {
                        if (data.data.CYL != undefined) {

                            Evolve.EvolveIOTDevice[i].Data.CYL = data.data.CYL;
                            if (data.data.CYL == 0) {
                                Evolve.EvolveIOTDevice[i].Data.HS = 0;
                            }

                        }
                        if (data.data.HS != undefined) {

                            Evolve.EvolveIOTDevice[i].Data.HS = data.data.HS;

                        }
                        if (data.data.Buzzer != undefined) {

                            Evolve.EvolveIOTDevice[i].Data.Buzzer = 1;

                        }
                        if (data.formattedDateTime != undefined) {
                            Evolve.EvolveIOTDevice[i].Data.Time = data.formattedDateTime;
                        }

                        await Evolve.Io.emit('allMixingData', Evolve.EvolveIOTDevice[i]);
                        await Evolve.Io.emit(Evolve.EvolveIOTDevice[i].Machine_Code, Evolve.EvolveIOTDevice[i]);



                        console.log(">>", Evolve.EvolveIOTDevice[i]);
                    }
                }
            }

            if (topic == 'a8:3:2a:3b:b0:64/data') {
                for (let i = 0; i < Evolve.EvolveIOTDevice.length; i++) {
                    if (Evolve.EvolveIOTDevice[i].Code == data.device) {
                        if (data.data.CYL != undefined) {

                            Evolve.EvolveIOTDevice[i].Data.CYL = data.data.CYL;
                            if (data.data.CYL == 0) {
                                Evolve.EvolveIOTDevice[i].Data.HS = 0;
                            }

                        }
                        if (data.data.HS != undefined) {

                            Evolve.EvolveIOTDevice[i].Data.HS = data.data.HS;

                        }
                        if (data.data.Buzzer != undefined) {

                            Evolve.EvolveIOTDevice[i].Data.Buzzer = 1;

                        }
                        if (data.formattedDateTime != undefined) {
                            Evolve.EvolveIOTDevice[i].Data.Time = data.formattedDateTime;
                        }

                        await Evolve.Io.emit('allMixingData', Evolve.EvolveIOTDevice[i]);
                        await Evolve.Io.emit(Evolve.EvolveIOTDevice[i].Machine_Code, Evolve.EvolveIOTDevice[i]);



                        console.log(">>", Evolve.EvolveIOTDevice[i]);
                    }
                }
            }

            /** End : Mixing Data  */

            /** Start : Weight  */

            if (topic == '94:3c:c6:c2:a5:ac/data') {
                if (data.data) {
                    console.log("WEIGHT>>>>>>>>>>>>>>>.", data.data[0]);
                    console.log("data.device>>>>>.", data.device);
                    await Evolve.Io.emit('Weight', {
                        "device": data.device,
                        "message": 'Captured Weight !!',
                        "weight": data.data[0],
                    });
                    console.log("emit>>>>>>>>>>>>>>>>");
                }
            }

            if (topic == '94:3c:c6:c0:b4:e0/data') {
                if (data.data) {
                    console.log("WEIGHT>>>>>>>>>>>>>>>.", data.data[0]);
                    await Evolve.Io.emit('Weight', {
                        "device": data.device,
                        "message": 'Captured Weight !!',
                        "weight": data.data[0],
                    });
                }
            }

            /** End : Weight */






            /*




                  
                        let unix_timestamp = data.ts ? data.ts : data.ets;
                          // Create a new JavaScript Date object based on the timestamp
                          // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                          var date = new Date(unix_timestamp * 1000);
                          
                          var y = date.getFullYear();
                          var m = date.getMonth() + 1;
                          var d = date.getDate();
                          let formattedDate = y + '-' + m + '-' + d;
                  
                          // Hours part from the timestamp
                          var hours = date.getHours();
                          // Minutes part from the timestamp
                          var minutes = "0" + date.getMinutes();
                          // Seconds part from the timestamp
                          var seconds = "0" + date.getSeconds();
                  
                          // Will display time in 10:30:23 format
                          var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                          data.formattedDateTime = formattedDate + ' ' + formattedTime;
                  
                          let deviceID = 0
                          let machineID = 0
                          let prodOrderID = 0
                          let OrderNo = 0
                          let itemId = 0
                            let device = topic.split('/');
                            let getDeviceDatils = await Evolve.App.Services.Iot.IotServices.getDeviceDatils(device[0])
                            if (getDeviceDatils instanceof Error || getDeviceDatils.rowsAffected < 1) {
                              deviceID = 0
                              machineID = 0
                              Evolve.Log.error("Error while getting DeviceDatils data")
                            }else{
                              deviceID = getDeviceDatils.recordset[0].EvolveDevice_ID
                              machineID = getDeviceDatils.recordset[0].EvolveMachine_ID
                              // console.log("deviceID???????", deviceID);
                            }
                    
                            let getProdOrderList = await Evolve.App.Services.Iot.IotServices.getProdOrderList(machineID)
                            if (getProdOrderList instanceof Error || getProdOrderList.rowsAffected < 1) {
                              prodOrderID = 0
                              OrderNo = 0
                              itemId = 0
                              Evolve.Log.error("Error while getting ProdOrderList data")
                            }else{
                              prodOrderID = getProdOrderList.recordset[0].EvolveProdOrders_ID
                              OrderNo = getProdOrderList.recordset[0].EvolveProdOrders_OrderNo
                              itemId =  getProdOrderList.recordset[0].EvolveItem_ID
                            }
                          

                  
                          let addMqtttDeviceLog = await Evolve.App.Services.Iot.IotServices.addMqtttDeviceLog(data, topic , deviceID);
                          if (addMqtttDeviceLog instanceof Error) {
                            Evolve.Log.error("Error In Store Machine Log");
                          }
                          else{
                            Evolve.Log.info("Log Stored In Machine Log Table");
                          }
                  
                  
                        if (data.data != undefined) {
                          if (data.data.CYL) {
                            if (data.data.CYL == 1) {
                                let query = "EvolveMixingParameter_StartTime = '" + data.formattedDateTime + "'"
                                let updateStartTime = await Evolve.App.Services.Iot.IotServices.updateTime(machineID , prodOrderID , query)
                                if (updateStartTime instanceof Error || updateStartTime.rowsAffected < 1) {
                                  Evolve.Log.error("Error In Start time update ");
                                }else{
                                  Evolve.Log.info("Start time update successfully");
                                }
                            }
                  
                            if (data.data.CYL == 0) {
                              let query = "EvolveMixingParameter_StopTime = '" + data.formattedDateTime + "' , EvolveMixingParameter_HighSpeedStopTime = '" + data.formattedDateTime + "'"
                              let updateEndTimeTime = await Evolve.App.Services.Iot.IotServices.updateTime(machineID , prodOrderID , query)
                              if (updateEndTimeTime instanceof Error || updateEndTimeTime.rowsAffected < 1) {
                                Evolve.Log.error("Error In Stop time update ");
                              }else{
                                Evolve.Log.info("Stop time update successfully ");
                              }
                            }
                  
                          }else{
                            if (data.data.HS == 1) {
                              let timer = ""
                              // machineHighSpeedDataArr.push(data);
                              
                              let getHighSpeedTime = await Evolve.App.Services.Iot.IotServices.getHighSpeedTime(itemId)
                              if (getHighSpeedTime instanceof Error || getHighSpeedTime.rowsAffected < 1) {
                                Evolve.Log.error("Error in getting Item HighSpeed Time ");
                              }else{
                                timer = getHighSpeedTime.recordset[0].EvolveItem_HighSpeedTime
                              }

                              

                              // code for get high speed time 
                              for (let i = 0; i < machineHighSpeedDataArr.length; i++) {
                                if (machineHighSpeedDataArr[i].ts == data.ts && machineHighSpeedDataArr[i].device == data.device ) {
                                  machineHighSpeedDataArr.push({
                                    device : data.device,
                                    ts : data.ts,
                                    timer : timer
                                  });
                                }
                              }
                              setTimeout(() => {
                                let hsTimeTopic = data.device + '/cmd'
                                let hsTimeData = {"ets":data.ts, "timer":timer};
                                console.log("hsTimeData??????????????", hsTimeData);
                                Evolve.MqttClient.publish(hsTimeTopic, JSON.stringify(hsTimeData));
                  
                              }, 2000);
                  
                              let query = "EvolveMixingParameter_HighSpeedStartTime = '" + data.formattedDateTime + "'"
                              let updateEndTimeTime = await Evolve.App.Services.Iot.IotServices.updateTime(machineID , prodOrderID , query)
                              if (updateEndTimeTime instanceof Error || updateEndTimeTime.rowsAffected < 1) {
                                Evolve.Log.error("Error in update HighSpeedstart Time ");
                              }else{
                                Evolve.Log.info("update HighSpeedStart Time ");
                              }
                  
                            }
                          }
                  
                  
                  
                        }
                        else{
                          if (data.ets && data.timer == true) {
                            console.log("data timer ets >>>>>>>>>>>", data);
                            for (let i = 0; i < machineHighSpeedDataArr.length; i++) {
                              if (machineHighSpeedDataArr[i].ts == data.ets) {
                                machineHighSpeedDataArr.unshift(machineHighSpeedDataArr[i]);
                              }
                            }
                          }
                        }
                  
            */

            // if (data.action.length == 24) {
            //   let twoChar = data.action.charAt(0) + data.action.charAt(1);
            //   if (twoChar == 'e2') {
            //     console.log("/............................................./")
            //     console.log("Message Topic.....", topic)
            //     console.log("Message Recived.....", data)
            //     console.log("/............................................./")
            //     // bed  filter Start
            //     let ifTagFound = false;
            //     for (let i = 0; i < Evolve.EvolveRFID.length; i++) {
            //       // iKonnectId
            //       if (Evolve.EvolveRFID[i].EvolveBed_RFID == data.action) {
            //         ifTagFound = true;
            //         if (data.iKonnectId == Evolve.Config.INiKonnectId) {
            //           // IN Device
            //           console.log("IN IN IN IN IN IN IN IN")
            //           // Check if id avilable in OUT Array
            //           if (Evolve.BykeOUT.includes(data.action)) {
            //             console.log(">>>>>> Save Bed In <<<<<<<<", data.action)
            //             // IF avilable meanse > direction in INSIDE
            //             await Evolve.App.Services.eAssets.MqttServices.SrvMqttAssets.saveBedIn(Evolve.EvolveRFID[i].EvolveBed_ID);
            //             // After Save Record Remove ikonnect ID Form Array
            //             let inx = Evolve.BykeIN.indexOf(data.action);
            //             Evolve.BykeIN.splice(inx, 1);
            //             inx = Evolve.BykeOUT.indexOf(data.action);
            //             Evolve.BykeOUT.splice(inx, 1);
            //           } else {
            //             console.log("SAVE IN : ", data.action)
            //             // Save in Array
            //             if (!Evolve.BykeIN.includes(data.action)) {
            //               Evolve.BykeIN.push(data.action)
            //             }
            //           }
            //           console.log("####### End IN Scan  ########");
            //         }

            //         if (data.iKonnectId == Evolve.Config.OUTiKonnectId) {
            //           // OUT Device
            //           console.log("OUT OUT OUT OUT OUT OUT OUT OUT")

            //           // Check if id avilable in OUT Array
            //           if (Evolve.BykeIN.includes(data.action)) {
            //             console.log(">>>>>> Save Bed OUT <<<<<<<<", data.action)
            //             // IF avilable meanse direction in OUTSIDE
            //             await Evolve.App.Services.eAssets.MqttServices.SrvMqttAssets.saveBedOut(Evolve.EvolveRFID[i].EvolveBed_ID);
            //             //After Save Record Remove ikonnect ID Form Array
            //             let inx = Evolve.BykeIN.indexOf(data.action);
            //             Evolve.BykeIN.splice(inx, 1);
            //             inx = Evolve.BykeOUT.indexOf(data.action);
            //             Evolve.BykeOUT.splice(inx, 1);
            //           } else {
            //             // Save in Array
            //             if (!Evolve.BykeOUT.includes(data.action)) {
            //               Evolve.BykeOUT.push(data.action)
            //             }
            //           }
            //           console.log("####### End OUT Scan  ########");
            //         }
            //         console.log("Evolve.BykeIN :", Evolve.BykeIN)
            //         console.log("Evolve.BykeOUT :", Evolve.BykeOUT)
            //       }
            //     }

            //     if (ifTagFound == false) {
            //       console.log(" Bed Not Found so add into databse....")
            //       // create new tage into db
            //       let date = new Date();
            //       let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

            //       let bedsData = {
            //         EvolveBed_RFID: data.action,
            //         EvolveBedType_ID: 1,
            //         EvolveBedSize_ID: 1,
            //         EvolveBed_Desc: "auto Added",
            //         EvolveBed_Make: datetime
            //       }

            //       let rfidCompare = await Evolve.App.Services.eAssets.Bed.SrvBed.rfidCompare(bedsData);
            //       if (rfidCompare instanceof Error || rfidCompare.recordset[0].rfidcount < 1) {
            //         let BedMaxId = await Evolve.App.Services.eAssets.Bed.SrvBed.getbedcode();
            //         if (BedMaxId instanceof Error || BedMaxId.rowsAffected < 1) {
            //           console.log("Error in Beds Code ")
            //         } else {
            //           let num = parseInt(BedMaxId.recordset[0].EvolveBed_Id) + 1;
            //           var str = "" + num;
            //           var pad = "0000";
            //           var EvolveBed_Code = pad.substring(0, pad.length - str.length) + str; //0001
            //           EvolveBed_Code = "BykeThane" + EvolveBed_Code;
            //           let result = await Evolve.App.Services.eAssets.Bed.SrvBed.addBeds(bedsData, EvolveBed_Code);
            //           if (result instanceof Error || result.rowsAffected < 1) {
            //             console.log("Error in inster new Beds ")
            //           } else {
            //             // Save Data into RAM.
            //             await Evolve.App.Controllers.eAssets.MqttController.ConMqttAssets.saveAllbedsIntoRAM();
            //             // Send Again Data
            //             Evolve.App.Controllers.Iot.iotControllers.filterRequestData(topic, reqData);
            //             console.log(" Beds Create successfully")
            //           }
            //         }
            //       } else {
            //         console.log("RFID Already Exists")
            //       }
            //     }
            //   }
            // }






            // -------------- Assets Beds End ------------------

            // Milling 
            // if (topic == 'yfaiMillingSub') {

            //   // {
            //   //   "timestamp": 1569850373778,
            //   //   "values": [
            //   //     {
            //   //       "id": "Milling.Geiss-FZ-18-62276.PLCNCStartDisable",
            //   //       "v": false,
            //   //       "q": true,
            //   //       "t": 1569850372022
            //   //     }
            //   //   ]
            //   // }






            //   if (data.values[0] != undefined) {
            //     if (data.values[0].id == 'Milling.Geiss-FZ-18-62276.Barcode') {
            //       await Evolve.Io.emit('yfaiMillingMessage', {
            //         code: "barcode",
            //         message: "Barcode Scanned successfully"
            //       });
            //     }
            //     // if(data.values[0].id == 'Milling.Geiss-FZ-18-62276.PLCNCStartDisable'){
            //     //   await Evolve.Io.emit('yfaiMillingMessage', {
            //     //     code : "barcode",
            //     //     message : "Barcode Scanned successfully"
            //     //   });
            //     // }

            //     // if(data.values[0].id == 'Milling.Geiss-FZ-18-62276.AutomaticMode'){
            //     //   await Evolve.Io.emit('yfaiMillingMessage', {
            //     //     code : "barcode",
            //     //     message : "Machine Start"
            //     //   });
            //     // }

            //     if (data.values[0].id == 'Milling.Geiss-FZ-18-62276.CycleStart') {
            //       await Evolve.Io.emit('yfaiMillingMessage', {
            //         code: "barcode",
            //         message: "Cycle Start"
            //       });
            //     }

            //     if (data.values[0].id == 'Milling.Geiss-FZ-18-62276.PartNotOK') {
            //       await Evolve.Io.emit('yfaiMillingMessage', {
            //         code: "barcode",
            //         message: "Part Not Ok"
            //       });
            //     }

            //     if (data.values[0].id == 'Milling.Geiss-FZ-18-62276.PartOK') {
            //       await Evolve.Io.emit('yfaiMillingMessage', {
            //         code: "barcode",
            //         message: "Part Ok"
            //       });
            //     }

            //     if (data.values[0].id == 'Milling.Geiss-FZ-18-62276.PLCFeedStop/ReadInDisable') {
            //       await Evolve.Io.emit('yfaiMillingMessage', {
            //         code: "barcode",
            //         message: "Part Completed"
            //       });
            //     }

            //     if (data.values[0].id == 'Milling.Geiss-FZ-18-62276.KnifeTest') {
            //       await Evolve.Io.emit('yfaiMillingMessage', {
            //         code: "barcode",
            //         message: "Knife Test OK"
            //       });
            //     }

            //     if (data.values[0].id == 'Milling.Geiss-FZ-18-62276.CycleFinished') {
            //       await Evolve.Io.emit('yfaiMillingMessage', {
            //         code: "barcode",
            //         message: "Cycle Stop"
            //       });
            //     }

            //     // if(data.values[0].id == 'Milling.Geiss-FZ-18-62276.NCKAlarm'){
            //     //   await Evolve.Io.emit('yfaiMillingMessage', {
            //     //     code : "barcode",
            //     //     message : "NCK Alarm"
            //     //   });
            //     // }







            //   }

            // }


            //   if(data.action == '1'){
            //     await Evolve.Io.emit('DataChange', {
            //       message : "Barcode Scanned successfully"
            //    });
            //   }
            //   if(data.action == '2'){
            //     await Evolve.Io.emit('DataChange', {
            //       message : "Cycle Start"
            //    });
            //   }
            //   if(data.action == '3'){
            //     await Evolve.Io.emit('DataChange', {
            //       message : "Cycle Stop"
            //    });
            //   }
            // }

            // if (data.iKonnectId != undefined) {
            //   //   await Evolve.Io.emit('DataChange', {
            //   //     count : parseFloat(data.weight)
            //   //  });
            //   Evolve.EvolveWsM[data.iKonnectId] = parseFloat(data.weight);
            // }

            // warehouse MQTT code -- start
            //  console.log("iot data topic >>>>>>>>>>>>>>>", topic);
            // console.log("deviceResponse>>>>>################");
            // console.log(data);
            if (topic == 'P2L testPub') {



                if (data.A == 'T1') {
                    Evolve.Log.info("Command Successfully Getting By Device")

                    // TIME INTERVEL AND OFF BLINKING LIGHT AND DO NOTHING 
                }
                if (data.A == 'T2' || data.A == 'T3') {
                    Evolve.Log.info("ACK Received From Device")
                    let deviceResponseToEvolve = await Evolve.App.Controllers.Wms.rack.ConList.deviceResponseToEvolve(data);
                }
            }

            // warehouse MQTT code -- end

            // console.log("Evolve EvolveWsM.....", Evolve.EvolveWsM)

        } catch (error) {
            // Evolve.Log.info(' EERR0538: Error in filter Request Data : ' + error);
        }

    },

    iotSidebarMenuList: async function(req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let sidebarMenuList = await Evolve.App.Services.Iot.IotServices.getIotSidebarMenuList(req.body);
            let menuList = [];
            for (let i = 0; i < sidebarMenuList.recordsets[0].length; i++) {
                menuList.push({
                    id: sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
                    title: sidebarMenuList.recordsets[0][i].EvolveMenu_Name,
                    icon: sidebarMenuList.recordsets[0][i].EvolveMenu_Icon,
                    page: sidebarMenuList.recordsets[0][i].EvolveMenu_Url
                });
            }
            let obj = { statusCode: 200, status: "success", message: "Menu List", result: menuList };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0539: Error while iot Sidebar Menu List " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0539: Error while iot Sidebar Menu List " + error.message, result: null };
            res.send(obj);
        }
    },

    getDeviceType: async function(req, res) {
        try {
            let result = await Evolve.App.Services.Iot.IotServices.getDeviceType();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Not Found Device Type",
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
            Evolve.Log.error(" EERR0540: Error while getting Device Type " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0540: Error while getting Device Type " + error.message, result: null };
            res.send(obj);
        }
    },

    addDevice: async function(req, res) {
        // console.log("addDevice>>>>>>", req.body);
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Iot.IotServices.addDevice(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Not Device Add", result: null };
                res.send(obj);
            } else {

                /** Send MQTT Data to Device */
                let resultLocation = await Evolve.App.Services.Iot.IotServices.getDeviceLocations(req.body.EvolveLocation_ID);
                if (resultLocation instanceof Error || resultLocation.rowsAffected < 1) {

                } else {


                    // send Regiration First then Send Welcome Message
                    let jsonData = JSON.stringify({
                        ID: req.body.EvolveDevice_Code,
                        LID: resultLocation.recordset[0].EvolveLocation_Code, // Location Code
                        Device: 'P2L',
                    });
                    console.log("Task Sent :", jsonData)
                    if (Evolve.Config.mqtt == '1') {
                        Evolve.MqttClient.publish('evolvefcus', jsonData);
                        setTimeout(function() {
                            let jsonData = JSON.stringify({
                                ID: req.body.EvolveDevice_Code,
                                Device: 'P2L',
                                TID: Math.floor(Math.random() * 9999) + 1000,
                                data: [1, 0, 1, 1, 0, 3, "Welcome To Evolve", "Location : " + resultLocation.recordset[0].EvolveLocation_Code, ""]
                            });
                            console.log("Task Sent >>>> :", jsonData)
                            Evolve.MqttClient.publish('evolvefcus', jsonData);
                        }, 1000);
                    }






                }



                /**  */

                let obj = { statusCode: 200, status: "success", message: "Device Add Successfull", result: result.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0541: Error while adding device " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0541: Error while adding device " + error.message, result: null };
            res.send(obj);
        }
    },

    getDeviceData: async function(req, res) {
        try {
            let result = await Evolve.App.Services.Iot.IotServices.getDeviceData();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Not Found Device ",
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
            Evolve.Log.error(" EERR0542: Error while getting Device Data " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0542: Error while getting Device Data " + error.message, result: null };
            res.send(obj);
        }
    },

    getSingleDeviceData: async function(req, res) {
        try {
            let result = await Evolve.App.Services.Iot.IotServices.getSingleDeviceData(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Not Found Device",
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
            Evolve.Log.error(" EERR0543: Error while getting single device data " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0543: Error while getting single device data " + error.message, result: null };
            res.send(obj);
        }
    },

    updateDevice: async function(req, res) {
        try {
            let result = await Evolve.App.Services.Iot.IotServices.updateDevice(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Not Device Update ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Device Update Successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0544: Error while updating device " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0544: Error while updating device " + error.message, result: null };
            res.send(obj);
        }
    },

    deleteDevice: async function(req, res) {
        try {
            let result = await Evolve.App.Services.Iot.IotServices.deleteDevice(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Not Device Delete",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Device Delete Successfull",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0545: Error while deleting device " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0545: Error while deleting device " + error.message, result: null };
            res.send(obj);
        }
    },


    /** Andon Screen  */

    getWOList: async function(req, res) {
        try {
            let machineId = 32;
            let result = await Evolve.App.Services.Iot.IotServices.getWOList(machineId);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Wo List", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Success", result: result.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0546: Error while getting WO List " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0546: Error while getting WO List " + error.message, result: null };
            res.send(obj);
        }
    },

    deviceLocations: async function(req, res) {
        try {
            let result = await Evolve.App.Services.Iot.IotServices.deviceLocations();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Not location found", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Location Found", result: result.recordset };

                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0547: Error in device locations " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0547: Error in device locations " + error.message, result: null };
            res.send(obj);
        }
    },


    getReason: async function(req, res) {
        try {
            let machineId = 32;
            let result = await Evolve.App.Services.Iot.IotServices.getReason(machineId);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Reason List", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Success", result: result.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0548: Error in getting locations " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0548: Error in getting locations " + error.message, result: null };
            res.send(obj);
        }
    },

    downReport: async function(req, res) {
        try {
            console.log("req.body :", req.body)
            let action = req.body.action;
            let machineId = 32;
            let obj = {
                'R1': 'Operation abnormal and will not make take time, assistance has responded and is addressing the situation', // Constant
                'R2': 'Emergency stop, all stations stopped for safety or other reason and assistance is required.', // Blinking
                'Y1': 'Operation abnormal, assistance has responded and addressing situation. ',
                'Y2': 'Operation abnormal, but takt time may be made if assistance arrives in timely manner.',
                'G1': 'Operation Normal, will make takt time and move when count down = 0:00.',
                'G2': 'Scheduled Changeover / Setup / Maintenance / Break / Quality Measuring – no complete within time would delay production throughput',
                'B1': 'Material replenishment required, assistance has responded & addressing situation.',
                'B2': 'Material replenishment required',
            }


            if (action == 'R1' || action == 'Y1' || action == 'B1') {

                let msg = '';
                let light = action.charAt(0)
                if (action == 'R1') {
                    msg = obj.R1;
                } else if (action == 'R2') {
                    msg = obj.R2;
                } else if (action == 'Y1') {
                    msg = obj.Y1;
                } else if (action == 'Y2') {
                    msg = obj.Y2;
                } else if (action == 'G1') {
                    msg = obj.G1;
                } else if (action == 'G2') {
                    msg = obj.G2;
                } else if (action == 'B1') {
                    msg = obj.B1;
                } else if (action == 'B2') {
                    msg = obj.B2;
                } else {
                    msg = "ACK"
                }


                let insertData = {
                    EvolveBreakDownReport_Type: action,
                    EvolveBreakDownReport_Msg: msg,
                    EvolveBreakDownReport_EvolveMachine_ID: machineId
                };

                let addBreakDown = await Evolve.App.Services.Iot.IotServices.addBreakDown(insertData);
                console.log("addBreakDown :", addBreakDown.rowsAffected);
            } else {

                if (action == 'ACK') {
                    await Evolve.App.Services.Iot.IotServices.updateBreakDownACK();
                } else {
                    await Evolve.App.Services.Iot.IotServices.updateBreakDown();
                }

            }



            let objs = { statusCode: 200, status: "success", message: "Down Report", result: null };
            res.send(objs);





        } catch (error) {
            Evolve.Log.error(" EERR0549: Error in down report " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0549: Error in down report " + error.message, result: null };
            res.send(obj);
        }
    },

    productionBooking: async function(req, res) {
        try {

            console.log("req :", req.body)

            let machineId = 32;
            req.body.EvolveCompany_ID = 1;
            req.body.EvolveUnit_ID = 1;
            req.body.EvolveLocation_ID = 1;
            req.body.EvolveInventory_LotNumber = '';
            req.body.EvolveUser_ID = 1;
            req.body.EvolveInventory_RefNumber = '';
            req.body.EvolveInventory_LotNotes = '';

            req.body.EvolveInventoryStatus_ID = 1;
            req.body.EvolveInventoryStatus_ID = 1;


            let result = await Evolve.App.Services.Iot.IotServices.productionBooking(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Reason List", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Success", result: result.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0550: Error in production booking " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0550: Error in production booking " + error.message, result: null };
            res.send(obj);
        }
    },


    registerDevicesIP: async function(req, res) {
        try {
            console.log("req.body :", req.params.iKonnectID)
            console.log("req.body :", req.params.ip)
            let deviceData = await Evolve.App.Services.Iot.IotServices.getDeviceDataByCode(req.params.iKonnectID);
            if (deviceData instanceof Error) {} else {
                console.log("deviceData :", deviceData)
                    // If Device Avilable
                await Evolve.App.Services.Iot.IotServices.updateDeviceAPI(deviceData.recordset[0].EvolveDevice_ID, req.params.ip);
            }
            res.send("ok")

        } catch (error) {
            Evolve.Log.error(" EERR0551: Error in registering Devices IP " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0551: Error in registering Devices IP " + error.message, result: null };
            res.send(obj);
        }
    },

    // warehouse MQTT code start 

    wareHouseTaskDataPublish: async function(data) {
        try {

            // let wareHouseTaskData = {
            //   invId : data.EvolveInventory_ID,
            //   rackId : data.EvolveRack_ID,
            //   devCmd : data.devCommand,
            //   mID : data.macID,
            //   pName : data.productName,
            //   loc : data.location,
            //   qnty : data.quantity,
            //   devState : "",
            //   ackState : ""
            // }

            // {"T":1001,"M":"8857494954550101922","A":"PCK","D1":"Display Line 1","D2":"Display Line 2","D3":"Display Line 3","D4":"Display Line 4","B":20,"W":1000} 
            console.log("data.isTaskAutoComplete>>>>>", data.isTaskAutoComplete);
            let wareHouseTaskData = {
                "T": data.EvolveRack_ID + "," + data.EvolveInventory_ID + "," + data.devCommand + "," + data.quantity,
                "M": data.macID,
                "A": data.isTaskAutoComplete == 1 ? "AACK" : "TACK", // "PCK",
                "D1": data.location,
                "D2": data.quantity,
                "D3": data.productName,
                "D4": "PRESS BUTTON",
                "B": 20,
                "W": Evolve.Config.PTOLWAITTIME

            }

            if (Evolve.Config.mqtt == '1') {
                console.log("wareHouseTaskData====>>>>", wareHouseTaskData);
                Evolve.MqttClient.publish('P2L testSub', JSON.stringify(wareHouseTaskData));
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Ware House Task Data Is Published ",
                    result: null
                };
                return obj;
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " MQTT Server is not Enable ",
                    result: null
                };
                return obj;
            }


        } catch (error) {
            Evolve.Log.error(" EERR####: Error publish data " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error publish data " + error.message,
                result: null
            };
            return obj;
        }
    },

    getLocationSync: async function(data) {
        try {
            console.log("getLocationSync iot con >>>", data);
            let locationSync = {
                "T": data.EvolveRack_ID,
                "M": data.EvolveDevice_Code,
                "A": "REG",
                "D1": data.EvolveLocation_Code,
                "D2": "",
                "D3": "",
                "D4": "",
                "B": "",
                "W": 5000

            }

            if (Evolve.Config.mqtt == '1') {
                console.log("locationSync====>>>>", locationSync);
                Evolve.MqttClient.publish('P2L testSub', JSON.stringify(locationSync));
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " LOCATION SYNC DATA PUBLISHED ",
                    result: null
                };
                return obj;
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " MQTT Server is not Enable ",
                    result: null
                };
                return obj;
            }


        } catch (error) {
            Evolve.Log.error(" EERR####: Error publish data " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error publish data " + error.message,
                result: null
            };
            return obj;
        }
    },

    // getWeight: async function(req, res) {
    //     try {
    //         for (let i = 0; i < Evolve.EvolveDeviceDatils.length; i++) {
    //             if (Evolve.EvolveDeviceDatils[i].EvolveMachine_ID == req.body.machineId && Evolve.EvolveDeviceDatils[i].EvolveDeviceType_Code == 'Weight') {
    //                 let publishTopic = Evolve.EvolveDeviceDatils[i].EvolveDevice_Code + '/cmd'
    //                 let data = { "device": `"${Evolve.EvolveDeviceDatils[i].EvolveDevice_Code}"`, "action": "GET_WEIGHT", }
    //                 console.log("::::::::::::::::::::::", data);
    //                 Evolve.MqttClient.publish(publishTopic, JSON.stringify(data));
    //                 let obj = {
    //                     statusCode: 200,
    //                 };
    //                 res.send(obj)
    //             }
    //         }
    //     } catch (error) {
    //         Evolve.Log.error(" EERR####: Error publish data " + error.message);
    //         let obj = {
    //             statusCode: 400,
    //             status: "fail",
    //             message: " EERR####: Error publish data " + error.message,
    //             result: null
    //         };
    //         res.send(obj)
    //     }
    // },

    getCfdDeviceChartData: async function(req, res) {
        try {
            // console.log("req.body>>>>>>>>>>>", req.body);
            let findResult = []
            if ((req.body.startDateTime != null && req.body.startDateTime != undefined && req.body.startDateTime != "") && (req.body.endDateTime != null && req.body.endDateTime != undefined && req.body.endDateTime != "")) {
                let startDate = new Date(`${req.body.startDateTime}`) + ""
                let endDate = new Date(`${req.body.endDateTime}`) + ""
                findResult = await Evolve.Mongo.collection('GeneralData').find({ deviceCode: req.body.EvolveDevice_Code, DeviceTime: { $gte: startDate, $lt: endDate } }).sort({ _id: -1 }).toArray()
            } else {
                findResult = await Evolve.Mongo.collection('GeneralData').find({ deviceCode: req.body.EvolveDevice_Code }).sort({ _id: -1 }).limit(10).toArray()

            }
            let time = []
            let Motor1rpm = []
            let Motor2rpm = []
            let Motor3rpm = []
            let Motor4rpm = []
            let Motor5rpm = []

            for (let i = findResult.length - 1; i >= 0; i--) {
                let date = new Date(findResult[i].CreatedAt);
                let hours = date.getHours();
                let minutes = "0" + date.getMinutes();
                let seconds = "0" + date.getSeconds();

                // Will display time in 10:30:23 format
                let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                time.push(formattedTime)

                if (findResult[i].Motor1) {

                    Motor1rpm.push(findResult[i].Motor1.rpm)
                }


                if (findResult[i].Motor2) {
                    Motor2rpm.push(findResult[i].Motor2.rpm)
                }

                if (findResult[i].Motor3) {
                    Motor3rpm.push(findResult[i].Motor3.rpm)
                }

                if (findResult[i].Motor4) {
                    Motor4rpm.push(findResult[i].Motor4.rpm)
                }

                if (findResult[i].Motor5) {
                    Motor5rpm.push(findResult[i].Motor5.rpm)
                }

            }

            let arr = [
                labels = time,
                data = [],
            ]

            if (Motor1rpm.length > 0) {
                let List = {
                    label: "Motor1",
                    backgroundColor: "#2196f3",
                    borderColor: "#2196f3",
                    data: Motor1rpm,
                    fill: false,
                }
                arr[1].push(List)

            }
            if (Motor2rpm.length > 0) {
                let List = {
                    label: "Motor2",
                    backgroundColor: "#ef5350",
                    borderColor: "#ef5350",
                    data: Motor2rpm,
                    fill: false,
                }
                arr[1].push(List)
            }

            if (Motor3rpm.length > 0) {
                let List = {
                    label: "Motor3",
                    backgroundColor: "#e91e63",
                    borderColor: "#e91e63",
                    data: Motor3rpm,
                    fill: false,
                }
                arr[1].push(List)
            }

            if (Motor4rpm.length > 0) {
                let List = {
                    label: "Motor4",
                    backgroundColor: "#9c27b0",
                    borderColor: "#9c27b0",
                    data: Motor4rpm,
                    fill: false,
                }
                arr[1].push(List)
            }

            if (Motor5rpm.length > 0) {
                let List = {
                    label: "Motor5",
                    backgroundColor: "#64b5f6",
                    borderColor: "#64b5f6",
                    data: Motor5rpm,
                    fill: false,
                }
                arr[1].push(List)
            }


            if (arr.length > 0) {
                let obj = {
                    statusCode: 200,
                    status: "fail",
                    message: "",
                    result: arr
                };
                res.send(obj)
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While get Chart data !",
                    result: null
                };
                res.send(obj)
            }


        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj)
        }
    },


    getCfdDeviceTableData: async function(req, res) {
        try {
            // console.log("req.body>>>>>>>>>.", req.body);
            let count = ""
            let findResult = []
            if ((req.body.startDateTime != null && req.body.startDateTime != undefined && req.body.startDateTime != "") && (req.body.endDateTime != null && req.body.endDateTime != undefined && req.body.endDateTime != "")) {
                let startDate = new Date(`${req.body.startDateTime}`) + ""
                let endDate = new Date(`${req.body.endDateTime}`) + ""
                console.log("startDate>>>>>>", `${startDate}`);
                console.log("endDate>>>>>>", endDate);
                findResult = await Evolve.Mongo.collection('GeneralData').find({ deviceCode: `${req.body.EvolveDevice_Code}`, DeviceTime: { $gte: `${startDate}`, $lt: `${endDate}` } }).sort({ _id: -1 }).limit(req.body.displayRecord).skip(req.body.startFrom).toArray()

                count = await Evolve.Mongo.collection('GeneralData').countDocuments({ deviceCode: req.body.EvolveDevice_Code, DeviceTime: { $gte: startDate, $lt: endDate } })
            } else {
                findResult = await Evolve.Mongo.collection('GeneralData').find({ deviceCode: req.body.EvolveDevice_Code }).sort({ _id: -1 }).limit(req.body.displayRecord).skip(req.body.startFrom).toArray()
                count = await Evolve.Mongo.collection('GeneralData').countDocuments({ deviceCode: req.body.EvolveDevice_Code })


            }
            for (let i = 0; i < findResult.length; i++) {
                // ts time stame 
                if (findResult[i].DeviceTime != '') {
                    let ts = findResult[i].DeviceTime
                    let tdate = new Date(ts)
                    let ty = tdate.getFullYear();
                    let tm = tdate.getMonth() + 1;
                    let td = tdate.getDate();
                    let tformattedDate = ty + '-' + tm + '-' + td;

                    // Hours part from the timestamp
                    let thours = tdate.getHours();
                    // Minutes part from the timestamp
                    let tminutes = "0" + tdate.getMinutes();
                    // Seconds part from the timestamp
                    let tseconds = "0" + tdate.getSeconds();

                    // Will display time in 10:30:23 format
                    let tformattedTime = thours + ':' + tminutes.substr(-2) + ':' + tseconds.substr(-2);
                    findResult[i].DeviceTime = tformattedDate + ' ' + tformattedTime;
                }

                // LDP Time Stamp
                if (findResult[i].CreatedAt != '') {
                    let createdAt = findResult[i].CreatedAt
                    let date = new Date(createdAt)
                    let y = date.getFullYear();
                    let m = date.getMonth() + 1;
                    let d = date.getDate();
                    let formattedDate = y + '-' + m + '-' + d;

                    // Hours part from the timestamp
                    let hours = date.getHours();
                    // Minutes part from the timestamp
                    let minutes = "0" + date.getMinutes();
                    // Seconds part from the timestamp
                    let seconds = "0" + date.getSeconds();

                    // Will display time in 10:30:23 format
                    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                    findResult[i].CreatedAt = formattedDate + ' ' + formattedTime;
                }

            }
            // console.log("count>>>>>>>>>>>>>.", count);
            // console.log("findResult>>>>>>>>>>>>>>>", findResult);
            let resobj = {
                noOfRecord: count,
                data: findResult
            }

            if (findResult.length > 0) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "get Table Data Successfully ",
                    result: resobj
                }
                res.send(obj)
            } else {
                let obj = {
                    statusCode: 400,
                    status: "success",
                    message: "Error While Get Table Data! ",
                    result: null
                };
                res.send(obj)
            }


        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "success",
                message: "Error While Get Table Data! ",
                result: null
            };
            res.send(obj)
        }
    },

    getlatandlongForMap: async function(req, res) {
        try {
            let list = await Evolve.App.Services.Iot.IotServices.getlatandlongForMap(req.body.EvolveDevice_Code)
            if (list instanceof Error || list.rowsAffected > 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While get Latitude And Longitude !",
                    result: null
                };
                res.send(obj);
            } else {
                console.log(">>>>>>>>..", liat.recordset);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "",
                    result: list.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error While get Latitude And Longitude !",
                result: list.message
            };
            res.send(obj);
        }
    },

    getCfdDeviceChartData: async function(req, res) {
        try {
            // console.log("req.body>>>>>>>>>>>", req.body);
            let findResult = []
            if ((req.body.startDateTime != null && req.body.startDateTime != undefined && req.body.startDateTime != "") && (req.body.endDateTime != null && req.body.endDateTime != undefined && req.body.endDateTime != "")) {
                let startDate = new Date(`${req.body.startDateTime}`) + ""
                let endDate = new Date(`${req.body.endDateTime}`) + ""
                findResult = await Evolve.Mongo.collection('GeneralData').find({ deviceCode: req.body.EvolveDevice_Code, DeviceTime: { $gte: startDate, $lt: endDate } }).sort({ _id: -1 }).toArray()
            } else {
                findResult = await Evolve.Mongo.collection('GeneralData').find({ deviceCode: req.body.EvolveDevice_Code }).sort({ _id: -1 }).limit(10).toArray()

            }
            let time = []
            let Motor1rpm = []
            let Motor2rpm = []
            let Motor3rpm = []
            let Motor4rpm = []
            let Motor5rpm = []

            for (let i = findResult.length - 1; i >= 0; i--) {
                let date = new Date(findResult[i].CreatedAt);
                let hours = date.getHours();
                let minutes = "0" + date.getMinutes();
                let seconds = "0" + date.getSeconds();

                // Will display time in 10:30:23 format
                let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                time.push(formattedTime)

                if (findResult[i].Motor1) {

                    Motor1rpm.push(findResult[i].Motor1.rpm)
                }


                if (findResult[i].Motor2) {
                    Motor2rpm.push(findResult[i].Motor2.rpm)
                }

                if (findResult[i].Motor3) {
                    Motor3rpm.push(findResult[i].Motor3.rpm)
                }

                if (findResult[i].Motor4) {
                    Motor4rpm.push(findResult[i].Motor4.rpm)
                }

                if (findResult[i].Motor5) {
                    Motor5rpm.push(findResult[i].Motor5.rpm)
                }

            }

            let arr = [
                labels = time,
                data = [],
            ]

            if (Motor1rpm.length > 0) {
                let List = {
                    label: "Motor1",
                    backgroundColor: "#2196f3",
                    borderColor: "#2196f3",
                    data: Motor1rpm,
                    fill: false,
                }
                arr[1].push(List)

            }
            if (Motor2rpm.length > 0) {
                let List = {
                    label: "Motor2",
                    backgroundColor: "#ef5350",
                    borderColor: "#ef5350",
                    data: Motor2rpm,
                    fill: false,
                }
                arr[1].push(List)
            }

            if (Motor3rpm.length > 0) {
                let List = {
                    label: "Motor3",
                    backgroundColor: "#e91e63",
                    borderColor: "#e91e63",
                    data: Motor3rpm,
                    fill: false,
                }
                arr[1].push(List)
            }

            if (Motor4rpm.length > 0) {
                let List = {
                    label: "Motor4",
                    backgroundColor: "#9c27b0",
                    borderColor: "#9c27b0",
                    data: Motor4rpm,
                    fill: false,
                }
                arr[1].push(List)
            }

            if (Motor5rpm.length > 0) {
                let List = {
                    label: "Motor5",
                    backgroundColor: "#64b5f6",
                    borderColor: "#64b5f6",
                    data: Motor5rpm,
                    fill: false,
                }
                arr[1].push(List)
            }


            if (arr.length > 0) {
                let obj = {
                    statusCode: 200,
                    status: "fail",
                    message: "",
                    result: arr
                };
                res.send(obj)
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While get Chart data !",
                    result: null
                };
                res.send(obj)
            }


        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj)
        }
    },


    getCfdDeviceTableData: async function(req, res) {
        try {
            // console.log("req.body>>>>>>>>>.", req.body);
            let count = ""
            let findResult = []
            if ((req.body.startDateTime != null && req.body.startDateTime != undefined && req.body.startDateTime != "") && (req.body.endDateTime != null && req.body.endDateTime != undefined && req.body.endDateTime != "")) {
                let startDate = new Date(`${req.body.startDateTime}`) + ""
                let endDate = new Date(`${req.body.endDateTime}`) + ""
                console.log("startDate>>>>>>", `${startDate}`);
                console.log("endDate>>>>>>", endDate);
                findResult = await Evolve.Mongo.collection('GeneralData').find({ deviceCode: `${req.body.EvolveDevice_Code}`, DeviceTime: { $gte: `${startDate}`, $lt: `${endDate}` } }).sort({ _id: -1 }).limit(req.body.displayRecord).skip(req.body.startFrom).toArray()

                count = await Evolve.Mongo.collection('GeneralData').countDocuments({ deviceCode: req.body.EvolveDevice_Code, DeviceTime: { $gte: startDate, $lt: endDate } })
            } else {
                findResult = await Evolve.Mongo.collection('GeneralData').find({ deviceCode: req.body.EvolveDevice_Code }).sort({ _id: -1 }).limit(req.body.displayRecord).skip(req.body.startFrom).toArray()
                count = await Evolve.Mongo.collection('GeneralData').countDocuments({ deviceCode: req.body.EvolveDevice_Code })


            }
            for (let i = 0; i < findResult.length; i++) {
                // ts time stame 
                if (findResult[i].DeviceTime != '') {
                    let ts = findResult[i].DeviceTime
                    let tdate = new Date(ts)
                    let ty = tdate.getFullYear();
                    let tm = tdate.getMonth() + 1;
                    let td = tdate.getDate();
                    let tformattedDate = ty + '-' + tm + '-' + td;

                    // Hours part from the timestamp
                    let thours = tdate.getHours();
                    // Minutes part from the timestamp
                    let tminutes = "0" + tdate.getMinutes();
                    // Seconds part from the timestamp
                    let tseconds = "0" + tdate.getSeconds();

                    // Will display time in 10:30:23 format
                    let tformattedTime = thours + ':' + tminutes.substr(-2) + ':' + tseconds.substr(-2);
                    findResult[i].DeviceTime = tformattedDate + ' ' + tformattedTime;
                }

                // LDP Time Stamp
                if (findResult[i].CreatedAt != '') {
                    let createdAt = findResult[i].CreatedAt
                    let date = new Date(createdAt)
                    let y = date.getFullYear();
                    let m = date.getMonth() + 1;
                    let d = date.getDate();
                    let formattedDate = y + '-' + m + '-' + d;

                    // Hours part from the timestamp
                    let hours = date.getHours();
                    // Minutes part from the timestamp
                    let minutes = "0" + date.getMinutes();
                    // Seconds part from the timestamp
                    let seconds = "0" + date.getSeconds();

                    // Will display time in 10:30:23 format
                    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                    findResult[i].CreatedAt = formattedDate + ' ' + formattedTime;
                }

            }
            // console.log("count>>>>>>>>>>>>>.", count);
            // console.log("findResult>>>>>>>>>>>>>>>", findResult);
            let resobj = {
                noOfRecord: count,
                data: findResult
            }

            if (findResult.length > 0) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "get Table Data Successfully ",
                    result: resobj
                }
                res.send(obj)
            } else {
                let obj = {
                    statusCode: 400,
                    status: "success",
                    message: "Error While Get Table Data! ",
                    result: null
                };
                res.send(obj)
            }


        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "success",
                message: "Error While Get Table Data! ",
                result: null
            };
            res.send(obj)
        }
    },

    getlatandlongForMap: async function(req, res) {
        try {
            let list = await Evolve.App.Services.Iot.IotServices.getlatandlongForMap(req.body.EvolveDevice_Code)
            console.log(">>>>>>>>..", list);
            if (list instanceof Error || list.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While get Latitude And Longitude !",
                    result: null
                };
                res.send(obj);
            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "",
                    result: list.recordset
                };
                console.log("obj>>>>>>>>>>>.", obj);
                res.send(obj);
            }

        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error While get Latitude And Longitude !",
                result: null
            };
            res.send(obj);
        }
    }

    // publishTimer: async function () {
    //   try {
    //     console.log("come in publishTimer?????????");
    //     if (machineHighSpeedDataArr != []) {
    //       for (let i = 0; i < machineHighSpeedDataArr.length; i++) {
    //         let hsTimeTopic = machineHighSpeedDataArr[i].device + '/cmd'
    //         let hsTimeData = { "ets": machineHighSpeedDataArr[i].ts, "timer": machineHighSpeedDataArr[i].timer };
    //         Evolve.MqttClient.publish(hsTimeTopic, JSON.stringify(hsTimeData));
    //       }

    //     } else {
    //       clearInterval(rujul);
    //     }
    //   } catch (error) {
    //     console.log(":errpr >>>>>", error);
    //   }
    // }

}