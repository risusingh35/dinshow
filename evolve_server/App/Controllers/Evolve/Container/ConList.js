'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getContainerTypeList: async function(req, res) {
        try {
        
            let getContainerType = await Evolve.App.Services.Evolve.Container.SrvList.getContainerTypeList();
            if(getContainerType instanceof Error || getContainerType.rowsAffected < 1){
                let obj = { statusCode: 400, status: "fail", message: "No container type Found", result: null  };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Container types", result: getContainerType.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0219: Error while getting Container type list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0219: Error while getting Container type list "+error.message, result: null };
            res.send(obj);
        }
    },


    getContainerMasterList: async function(req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let containerCount = await Evolve.App.Services.Evolve.Container.SrvList.getContainerMasterListCount(search);
            let container = await Evolve.App.Services.Evolve.Container.SrvList.getContainerMasterList(start,length,search);
            let resObj = {
                noOfRecord: containerCount.recordset[0].count,
                records: container.recordset
            }
            let obj = { statusCode: 200, status: "success", message: "Container List", result: resObj  };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0220: Error while getting Container Master list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0220: Error while getting Container Master list "+error.message, result: null };
            res.send(obj);
        }
    },

    createContainer: async function(req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let createContainer = await Evolve.App.Services.Evolve.Container.SrvList.createContainer(req.body);
            if(createContainer instanceof Error || createContainer.rowsAffected < 1){
            let obj = { statusCode: 400, status: "fail", message: "Error while container create", result: null  };
            res.send(obj);  
            } else {
            let obj = { statusCode: 200, status: "success", message: "Container created", result: null  };
            res.send(obj);
            }
        } catch (error) {
          Evolve.Log.error(" EERR0221: Error while creating Container "+error.message);
          let obj = { statusCode: 400, status: "fail", message: " EERR0221: Error while creating Container "+error.message, result: null };
          res.send(obj);
        }
    },
    
    getSingleContainer: async function(req, res) {
    try {
        let getSingleContainer = await Evolve.App.Services.Evolve.Container.SrvList.getSingleContainer(req.body.EvolveContainer_ID);
        if(getSingleContainer instanceof Error || getSingleContainer.rowsAffected < 1){
        let obj = { statusCode: 400, status: "fail", message: "No Container Found", result: null  };
        res.send(obj);
        } else {
        let obj = { statusCode: 200, status: "success", message: "Container List", result: getSingleContainer.recordset[0] };
        res.send(obj);
        }
    } catch (error) {
        Evolve.Log.error(" EERR0222: Error while getting Single Container "+error.message);
        let obj = { statusCode: 400, status: "fail", message: " EERR0222: Error while getting Single Container "+error.message, result: null };
        res.send(obj);
    }
    },
    
    updateContainer: async function(req, res) {
    try {
        req.body.EvolveUser_ID = req.EvolveUser_ID
        let updateContainer = await Evolve.App.Services.Evolve.Container.SrvList.updateContainer(req.body);
        if(updateContainer instanceof Error || updateContainer.rowsAffected < 1){
            let obj = { statusCode: 400, status: "fail", message: "Error while container update", result: null  };
            res.send(obj);  
        } else {
            let obj = { statusCode: 200, status: "success", message: "Container update", result: null  };
            res.send(obj);
        }
    } catch (error) {
        Evolve.Log.error(" EERR0223: Error while updating container "+error.message);
        let obj = { statusCode: 400, status: "fail", message: " EERR0223: Error while updating container "+error.message, result: null };
        res.send(obj);
    }
    },
}