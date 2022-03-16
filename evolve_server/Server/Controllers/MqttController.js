
const Evolve = require('../../Boot/Evolve');

module.exports = { 
    
    filterRequestData: async function(topic, reqData){
        try {
           
                let	data =  JSON.parse(reqData.toString());
                
                console.log("/............................................./")
                //console.log("Message Recived.....",topic)
                //console.log("Message Recived.....",data)
                
                // let jsonData = JSON.stringify({

                //     device_id : '123',
                //     msg : '0',
                //     task : 'beep',
                //     counter : '123'
                // });
                // console.log("Task Sent :",jsonData)
                
                //console.log("Task Sent :",Evolve.TaskCounter)
                //Evolve.MqttClient.publish('cmd',jsonData);
                //console.log("Array :",data.konnectIds)
                //console.log("topic :",topic)
                console.log("Mqtt Type ::",data.type)
                console.log("Data :::",data)
                //console.log("data.konnectIds.length       :",data.konnectIds.length)
                console.log("Task  Que  :: -> ",Evolve.Task)
                if(data.konnectIds != undefined  && topic == 'yan29182' &&  data.type == "poll"){
               
                if(data.konnectIds.length > 0){

                    for(let i=0; i < Evolve.Task.length; i++){
                        if(data.konnectIds.includes(Evolve.Task[i].konnectId) &&  Evolve.Task[i].status == 0){
                            console.log("Found & Send.......")
                            Evolve.Task[i].status = 1;
                            //Evolve.TaskCounter++;
                            let jsonData = JSON.stringify({
                                fcuId       : data.fcuId,
                                konnectId   : Evolve.Task[i].konnectId,
                                userId      : data.userId,                               
                                key         : data.key,
                                task        : Evolve.Task[i].task,
                                action      : Evolve.Task[i].msg,
                                // counter : Evolve.TaskCounter
                            });
                            console.log("Task Sent :",jsonData)
                            //  console.log("Task Sent :",Evolve.TaskCounter)
                            Evolve.MqttClient.publish(data.fcuId,jsonData);
                        }
                    }
                }
            }
                if(data.konnectId != undefined && topic == 'yan29182' &&  data.type == 'ack-kts'){
                    //console.log("ACK By Device :",data.device_id)
                    for(let i=0; i < Evolve.Task.length; i++){
                        if(Evolve.Task[i].konnectId == data.konnectId && Evolve.Task[i].status == 1){
                            //Evolve.Task.splice(i, 1);
                            //console.log("Task Done :",data.device_id)
                            console.log("/########################################################33/");
                            console.log("Task Start ::",data.konnectId);
                            console.log("/########################################################33/");
                            Evolve.Task[i].status = 2;
                        }
                    }
                }


                if(data.konnectId != undefined && topic == 'yan29182' &&  data.type == 'ack-ktd'){
                   
                    for(let i=0; i < Evolve.Task.length; i++){
                        if(Evolve.Task[i].konnectId == data.konnectId && Evolve.Task[i].status == 2){
                            Evolve.Task.splice(i, 1);
                            console.log("/*********************************************************/");
                            console.log(" Task Done ::",data.konnectId);
                            console.log("/*********************************************************/");

                            //Evolve.Task[i].status = 2;
                        }
                    }
                }


        } catch (error) {
            Evolve.Log.info('Error in filter Request Data : ' + error);
        }
    }
}