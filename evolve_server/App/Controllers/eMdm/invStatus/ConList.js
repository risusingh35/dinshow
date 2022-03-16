'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getinvStatusList: async function (req, res) {
        try {
            let erroeMs = '';
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.eMdm.invStatus.SrvList.getinvStatusListCount(search);
            let List = await Evolve.App.Services.eMdm.invStatus.SrvList.getinvStatusList(start, length, search);
            if (List instanceof Error) {
                erroeMs = "Error While Get invStatus List !"
            } else {

                for (let i = 0; i < List.recordset.length; i++) {

                    if (erroeMs == '') {

                        let detailsList = await Evolve.App.Services.eMdm.invStatus.SrvList.getinvStatusDetailsList(List.recordset[i].EvolveInvStatus_ID);
                        if (detailsList instanceof Error) {

                            erroeMs = "Error While Get invStatus Details !"


                        } else {

                            List.recordset[i].detailsList = detailsList.recordset;

                        }
                    }
                }
                console.log("erroeMs>>>>" ,  erroeMs)
                if (erroeMs == '') {

                    let resObj = {
                        noOfRecord: Count.recordset[0].count,
                        records: List.recordset
                    }
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "invStatus List",
                        result: resObj
                    };
                    res.send(obj);

                } else {

                    let resObj = {
                        noOfRecord: 0,
                        records: []
                    }
                    let obj = {
                        statusCode: 400,
                        status: "fails",
                        message: erroeMs,
                        result: resObj
                    };
                    res.send(obj);


                }

            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get invStatus list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get invStatus list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
}