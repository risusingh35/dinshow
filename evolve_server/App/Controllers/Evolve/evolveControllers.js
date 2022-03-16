const Evolve = require("../../../Boot/Evolve");

module.exports = {
  printJob: async function (req, res) {
    try {
      setInterval(function () {
        var label_variable = { quantity: "1", copy: "1" };
        // console.log("/***********Print JOB***********/")
        // console.log("Evolve.PrintJob ::", Evolve.PrintJob);
        // console.log("Printing ::", Evolve.Print.Printing)
        if (Evolve.Print.Printing == false && Evolve.PrintJob.length > 0) {
          if (
            Evolve.Print.OpenPort(
              {
                ipaddress: Evolve.Config.printer.ipaddress,
                port: Evolve.Config.printer.port,
                delay: Evolve.Config.printer.delay
              },
              true
            )
          ) {
            console.log("Printer is Connected.");
            Evolve.Print.Printing = true;
            console.log("Start.....................................");
            for (let i = Evolve.PrintJob.length - 1; i >= 0; i--) {
              console.log("pj :::>>", Evolve.PrintJob[i].barcode);
              //Evolve.Print.SendCommand('QRCODE 10,10,H,4,M,M1,0,\"Evolve Server\"',true);
              Evolve.Print.ClearBuffer("", true);
              // let msg = 'TEXT 25,120,\"0\",0,12,12,\"EVOLVE TEST PRINT '+Evolve.PrintJob[i].barcode+'\"';
              // Evolve.Print.SendCommand(msg,true);

              let dt = new Date();
              let data =
                dt.getDate() +
                "-" +
                (dt.getMonth() + 1) +
                "-" +
                dt.getFullYear();
              let time =
                dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

              console.log("data ::", data);
              console.log("time ::", time);

              Evolve.Print.SendCommand("SIZE 100mm,100mm");
              Evolve.Print.SendCommand("GAP 3mm,0");
              Evolve.Print.SendCommand("DIRECTION 1");
              Evolve.Print.SendCommand("SPEED 5");
              Evolve.Print.SendCommand("DENSITY 15");
              Evolve.Print.SendCommand("CLS");

              // Evolve.Print.SendCommand('TEXT 25,10,\"0\",0,12,12,\"'+Evolve.PrintJob[i].itemCode+'\"',true);
              // Evolve.Print.SendCommand('BLOCK 20,45,450,100,\"0\",0,7,7,3,\"'+Evolve.PrintJob[i].itemDesc+'\"');
              // Evolve.Print.SendCommand('TEXT 20,95,\"0\",0,7,7,\"LOT NO:'+Evolve.PrintJob[i].lotNumber+'\"',true);
              // Evolve.Print.SendCommand('TEXT 20,120,\"0\",0,7,7,\"QTY: '+Evolve.PrintJob[i].recvQty+' \"',true);
              // Evolve.Print.SendCommand('TEXT 20,145,\"0\",0,7,7,\"DATE:'+data+' \"',true);
              // Evolve.Print.SendCommand('TEXT 250,145,\"0\",0,7,7,\"TIME:'+time+' \"',true);
              // Evolve.Print.SendCommand('BARCODE 50,170,\"128\",40,2,0,2,2,\"'+Evolve.PrintJob[i].barcode+'\"',true);
              // Evolve.Print.PrintLabel(label_variable, true);

              Evolve.Print.SendCommand(
                'TEXT 25,50,"0",0,30,30,"' + Evolve.PrintJob[i].itemCode + '"',
                true
              );
              Evolve.Print.SendCommand(
                'BLOCK 25,150,750,800,"0",0,15,15,3,"' +
                Evolve.PrintJob[i].itemDesc +
                '"'
              );
              Evolve.Print.SendCommand(
                'TEXT 25,350,"0",0,20,20,"LOT/SR NO: ' +
                Evolve.PrintJob[i].lotNumber +
                '"',
                true
              );
              Evolve.Print.SendCommand(
                'TEXT 25,450,"0",0,20,20,"QTY: ' +
                Evolve.PrintJob[i].recvQty +
                ' "',
                true
              );
              Evolve.Print.SendCommand(
                'TEXT 25,530,"0",0,15,15,"DATE: ' + data + ' "',
                true
              );
              Evolve.Print.SendCommand(
                'TEXT 450,530,"0",0,15,15,"TIME: ' + time + ' "',
                true
              );
              Evolve.Print.SendCommand(
                'BARCODE 50,600,"128",150,2,0,3,3,"' +
                Evolve.PrintJob[i].barcode +
                '"',
                true
              );
              Evolve.Print.PrintLabel(label_variable, true);

              Evolve.PrintJob.splice(i, 1);
            }
            Evolve.Print.ClosePort(2000, true);
            console.log("End.....................................");
            Evolve.Print.Printing = false;
          } else {
            console.log("Printer Not Connected!!!!!!!");
          }
        }
      }, Evolve.Config.printer.printJobInterval);
    } catch (error) {
      Evolve.Log.error(" EERR0466: Error while printing job "+error.message);
    }
  },

  testConnection: async function (req, res) {
    try {
      console.log("Body ::", req.body);
      let sqlConfig = {
        server: req.body.EvolveCompany_Instance,
        port: parseInt(req.body.EvolveCompany_Port),
        user: req.body.EvolveCompany_DBUser,
        password: req.body.EvolveCompany_Password,
        database: "master",
        pool: {
          max: 100,
          min: 0,
          idleTimeoutMillis: 30000
        },
        options: {
          encrypt: false // Use this if you're on Windows Azure
        }
      };

      let tempConnectionPool = new Evolve.Sql.ConnectionPool(sqlConfig);
      tempConnectionPool
        .connect()
        .then(pool => {
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Connection success",
            result: null
          };
          res.send(obj);
        })
        .catch(err => {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "EERR0467: Error in Connection. ",
            result: null
          };
          res.send(obj);
        });

      //let obj = { statusCode: 200, status: "success", message: "Connection success", result: null };
      //   res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0468: Error in test connection "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0468: Error in test connection "+getProdTriggers.message,
        result: null
      };
      res.send(obj);
    }
  },

  evolveAppList: async function (req, res) {
    try {
      console.log("----------");
      let apps = await Evolve.App.Services.Evolve.EvolveServices.getAppList();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "App List",
        result: apps.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0469: Error in evolve app list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0469: Error in evolve app list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  appListForRole: async function (req, res) {
    try {
      let apps = await Evolve.App.Services.Evolve.EvolveServices.appListForRole();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "App List",
        result: apps.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0470: Error in app list for role "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0470: Error in app list for role "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  evolveAppMenuList: async function (req, res) {
    try {
      let apps = await Evolve.App.Services.Evolve.EvolveServices.getTopMenuAppList();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "App List",
        result: apps.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0471: Error in evolve app menu list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0471: Error in evolve app menu list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getDetailByCode: async function (req, res) {
    const EvolveApp_Url = req.body.EvolveApp_Url;
  
    try {
      let apps = await Evolve.App.Services.Evolve.EvolveServices.getAppByCode(EvolveApp_Url);
      // console.log("apps>>>" , apps)
  
      let obj = {
        statusCode: 200,
        status: "success",
        message: "App detail",
        result: apps.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error("Error in evolve app detail "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: "Error in evolve app detail "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  sidebarMenuList: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let sidebarMenuList = await Evolve.App.Services.Evolve.EvolveServices.getSidebarMenuList(
        req.body
      );
      let menuList = [];
      for (let i = 0; i < sidebarMenuList.recordsets[0].length; i++) {
        // Find Child Link
        let childLink = await Evolve.App.Services.Evolve.EvolveServices.getSidebarMenuChildLinkList(
          sidebarMenuList.recordsets[0][i].EvolveMenu_Id
        );
        let childs = [];
        for (let i = 0; i < childLink.recordset.length; i++) {
          childs.push(childLink.recordset[i].EvolveMenu_Url);
        }
        menuList.push({
          id: sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
          title: sidebarMenuList.recordsets[0][i].EvolveMenu_Name,
          icon: sidebarMenuList.recordsets[0][i].EvolveMenu_Icon,
          page: sidebarMenuList.recordsets[0][i].EvolveMenu_Url,
          childs: childs
        });
      }
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Menu List",
        result: menuList
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0472: Error in sidebar menu list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0472: Error in sidebar menu list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getEncPass: async function (req, res) {
    try {
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Encripted Password",
        result:
          req.body.password == undefined
            ? ""
            : Evolve.Bcrypt.hashSync(req.body.password, 10)
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0473: Error while getting Enc Pass "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // Unit

  createUnit: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let result = await Evolve.App.Services.Evolve.EvolveServices.createUnit(
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
          message: "Unit Created",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0474: Error while creating unit "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0474: Error while creating unit "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getUnitsList: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let search = req.query.search.value;

      let unitsCount = await Evolve.App.Services.Evolve.EvolveServices.getUnitsCount(
        req.EvolveUser_ID
      );
      let units = await Evolve.App.Services.Evolve.EvolveServices.getUnitsDatatableList(
        req.EvolveUser_ID,
        start,
        length
      );

      var obj = {
        draw: req.query.draw,
        recordsTotal: unitsCount.recordset[0].count,
        recordsFiltered: unitsCount.recordset[0].count,
        data: units.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0475: Error while getting units list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0475: Error while getting units list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  deleteUnit: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.EvolveServices.deleteUnit(
        req.body.id
      );
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on delete Unit",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Unit Deleted",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0476: Error while deleting unit "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0476: Error while deleting unit "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // Company
  createCompany: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;

      let result = await Evolve.App.Services.Evolve.EvolveServices.createCompany(
        req.body
      );

      //  console.log("Result >>>>>",result.recordset[0].inserted_id);

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
          message: "Company Created",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0477: Error while creating company "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0477: Error while creating company "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // companyList: async function (req, res) {
  //   try {
  //     let companyList = await Evolve.App.Services.Evolve.EvolveServices.getCompanyList();
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "company List",
  //       result: companyList.recordsets[0]
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  userCompanyList: async function (req, res) {
    try {
      let companyList = await Evolve.App.Services.Evolve.EvolveServices.userCompanyList(
        req.body.EvolveUser_ID
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "company List",
        result: companyList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0478: Error in user company list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0478: Error in user company list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  deleteCompany: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.EvolveServices.deleteCompany(
        req.body.id
      );
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on delete company",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Company Deleted",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0479: Error in user delete company "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0479: Error in user delete company "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // getCompanyListById: async function (req, res) {
  //   try {
  //     let companyList = await Evolve.App.Services.Evolve.EvolveServices.getCompanyListById(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "company List",
  //       result: companyList.recordset
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  getCompanyList: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let search = req.query.search.value;

      let companysCount = await Evolve.App.Services.Evolve.EvolveServices.getCompanyCount(
        req.EvolveUser_ID
      );
      let companys = await Evolve.App.Services.Evolve.EvolveServices.getCompanyDatatableList(
        req.EvolveUser_ID,
        start,
        length
      );

      var obj = {
        draw: req.query.draw,
        recordsTotal: companysCount.recordset[0].count,
        recordsFiltered: companysCount.recordset[0].count,
        data: companys.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0480: Error while getting company list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0480: Error while getting company list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },


  evolveRegister: async function (req, res) {
    try {
      if (
        req.body.EemailID == "test@evolve.com" &&
        req.body.Epassword == "evolve@123"
      ) {
        let token = Evolve.Jwt.sign(
          { EemailID: req.body.EemailID },
          Evolve.JwtSecret,
          {
            expiresIn: "7d" // expires in 24 hours
          }
        );

        let obj = {
          //statusCode: 200,
          //status: "success",
          //message: "Authentication successful!",
          // result: {
          //   EcustID : "EVO001",
          //   Ename   : "Herry Admin",
          //   Erole   : 1,
          //   Etoken  : token
          // },
          success: true,
          data: {
            email: req.body.EemailID,
            name: "Herry Admin",
            id: 1
          },
          token: token
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Invalid credentials",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0481: Error while evolve register "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0481: Error while evolve register "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  evolveGetData: async function (req, res) {
    try {
      // console.log("Me Called...... ::>", req.body);
      let obj = {
        statusCode: 200,
        status: "success",
        message: "User Data",
        result: {
          Ename: "Shiv"
        },
        data: {
          EcustID: "EVO001",
          Ename: "Herry Admin",
          Erole: 1
        }
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0482: Error while evolve getting data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0482: Error while evolve getting data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  test: async function (req, res) {
    try {
      let user = await Evolve.App.Services.Evolve.EvolveServices.getUserByData({
        EUserID: "123"
      });

      // console.log("User :", user.recordset[0]);

      let obj = {
        statusCode: 200,
        status: "success",
        message: "User Registered Successfully.",
        result: user.recordset[0]
      };
      res.send(obj);

      //     if (!user) {
      //         user = await Evolve.App.Services.Evolve.EvolveServices.setUser({
      //             EUserID: req.body.EUserID,
      //             EUserName: req.body.EUserName,
      //             EUserRole: req.body.EUserRole,
      //             EUserEmail: req.body.EUserEmail,
      //             EUserPass: req.body.EUserPass,
      //             EUserMeta: [],
      //             EStatus: req.body.EStatus
      //         });
      //         if (user) {
      //             let obj = {
      //                 statusCode: 200,
      //                 status: 'success',
      //                 message: "User Registered Successfully.",
      //                 result: user
      //             };
      //             res.send(obj);
      //         } else {

      //             let obj = {
      //                 statusCode: 400,
      //                 status: 'fail',
      //                 message: "Something Went Wrong.",
      //                 result: null
      //             };
      //             res.send(obj);
      //         }

      //     } else {
      //         let obj = {
      //             statusCode: 400,
      //             status: 'fail',
      //             message: "User Already Available.",
      //             result: null
      //         };
      //         res.send(obj);
      //     }
    } catch (error) {
      Evolve.Log.error(" EERR0483: Error in test function "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0483: Error in test function "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getProdOrder: async function (req, res) {
    try {
      let user = await Evolve.App.Services.Evolve.EvolveServices.getProdOrder();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Production Order Get Successfully.",
        result: user.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0484: Error while getting Prod Order "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0484: Error while getting Prod Order "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getProdTriggers: async function (req, res) {
    try {
      let user = await Evolve.App.Services.Evolve.EvolveServices.getProdTriggers();

      // console.log("User :", user.recordset[0]);

      let obj = {
        statusCode: 200,
        status: "success",
        message: "Production Order Get Successfully.",
        result: user.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0485: Error while getting Prod Triggers "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0485: Error while getting Prod Triggers "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // Users

  // createUser: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.createUser(req.body);
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on User Create",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "User Created Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  //  below function is for get userlist for Machine to User asign page made by Ravat
  // getUsersList: async function (req, res) {
  //   try {
  //     let start = parseInt(req.query.start);
  //     let length = parseInt(req.query.length);

  //     // let usersCount = await Evolve.App.Services.Evolve.EvolveServices.getUsersCount(req.EvolveUser_ID);
  //     let users = await Evolve.App.Services.Evolve.EvolveServices.getUsersDatatableList(
  //       req.EvolveUser_ID,
  //       start,
  //       length
  //     );
  //     if (users instanceof Error) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Query",
  //         result: users.message
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,

  //         result: users.recordsets[0]
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // deleteUser: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.deleteUser(
  //       req.body.id
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on delete User",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "User Deleted",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // createRole: async function (req, res) {
  //   try {
  //     let userResponse = await Evolve.App.Services.Evolve.EvolveServices.createRole(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Role Created Successfully",
  //       result: null
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getRoleList: async function (req, res) {
  //   try {
  //     let roleList = await Evolve.App.Services.Evolve.EvolveServices.getRoleList();
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Role List",
  //       result: roleList.recordset
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // selectSingleUser: async function (req, res) {
  //   console.log("Entering in controller >>>> ");
  //   try {
  //     let userData = await Evolve.App.Services.Evolve.EvolveServices.selectSingleUser(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "User List",
  //       result: userData
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // updateUser: async function (req, res) {
  //   try {
  //     req.body.EvolveUpdatedUser_ID = req.EvolveUser_ID;
  //     let passwordMatch = false;
  //     let noError = false;
  //     if (req.body.EvolveUser_password != "") {
  //       let getLastPassword = await Evolve.App.Services.Evolve.EvolveServices.getLastPassword(req.body);
  //       if (getLastPassword instanceof Error || getLastPassword.rowsAffected < 1) {
  //         let obj = {
  //           statusCode: 400,
  //           status: "fail",
  //           message: "No User Found",
  //           result: null
  //         };
  //         res.send(obj);
  //       } else {
  //         let lastPassword =
  //           getLastPassword.recordset[0].EvolveUser_OldPassword;
  //         let lastPasswordArray = lastPassword.split(",");
  //         let newPassword = Evolve.Bcrypt.hashSync(
  //           req.body.EvolveUser_password,
  //           10
  //         );
  //         for (let i = 0; i < lastPasswordArray.length; i++) {
  //           if (
  //             Evolve.Bcrypt.compareSync(
  //               req.body.EvolveUser_password,
  //               lastPasswordArray[i]
  //             )
  //           ) {
  //             passwordMatch = true;
  //           }
  //         }
  //         if (passwordMatch == true) {
  //           let obj = {
  //             statusCode: 400,
  //             status: "fail",
  //             message: "New Password Does not equal to last three password !",
  //             result: null
  //           };
  //           res.send(obj);
  //         } else {
  //           let newPasswordArray = lastPasswordArray;
  //           newPasswordArray.splice(0, 1);
  //           newPasswordArray.push(newPassword);
  //           req.body.EvolveUser_password = newPasswordArray.toString();
  //           noError = true;
  //         }
  //       }
  //     } else {
  //       noError = true;
  //     }
  //     if (noError == true) {
  //       let result = await Evolve.App.Services.Evolve.EvolveServices.updateUser(
  //         req.body
  //       );
  //       if (result instanceof Error || result.rowsAffected < 1) {
  //         let obj = {
  //           statusCode: 400,
  //           status: "fail",
  //           message: "Error on Update User",
  //           result: null
  //         };
  //         res.send(obj);
  //       } else {
  //         let obj = {
  //           statusCode: 200,
  //           status: "success",
  //           message: "User Updated Successfully",
  //           result: null
  //         };
  //         res.send(obj);
  //       }
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  selectSingleUnit: async function (req, res) {
    try {
      let unitData = await Evolve.App.Services.Evolve.EvolveServices.selectSingleUnit(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Unit List",
        result: unitData
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0486: Error while selecting single unit "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0486: Error while selecting single unit "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  updateUnit: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.EvolveServices.updateUnit(
        req
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
          message: "Unit Updated",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0487: Error while updating unit "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0487: Error while updating unit "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  //Menus

  // getMenusByAppId: async function (req, res) {
  //   req.body.EvolveUser_ID = req.EvolveUser_ID;
  //   //req.body.EvolveUser_ID = 2
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.getMenusByAppId(
  //       req.body.EvolveMenu_AppId
  //     );
  //     if (result instanceof Error) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Get Menu List",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else if (result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "No Menus Found For Selected Application",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Menu List",
  //         result: result.recordset
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // createMenu: async function (req, res) {
  //   req.body.EvolveUser_ID = req.EvolveUser_ID;
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.createMenu(
  //       req.body
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on create Menu",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Menu Created Successfully",
  //         result: result.recordset
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getAllMenu: async function (req, res) {
  //   try {
  //     console.log("body data of menu master <<<<  ", req.body);

  //     // console.log(req.EvolveUser_ID)
  //     let start = parseInt(req.query.start);
  //     let length = parseInt(req.query.length);

  //     // console.log("start  is  >>> " , start);
  //     // console.log("ens  is  >>> " , length);

  //     // let search = req.query.search.value;

  //     // let menusCount = await Evolve.App.Services.Evolve.EvolveServices.getMenusCount(req.EvolveUser_ID);

  //     let menus = await Evolve.App.Services.Evolve.EvolveServices.getMenusDatatableList(
  //       req.EvolveUser_ID,
  //       start,
  //       length
  //     );

  //     if (menus instanceof Error) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Query",
  //         result: menus.message
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         result: menus.recordsets[0]
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },
  // getAppMenuByAppId: async function (req, res) {
  //   req.body.EvolveUser_ID = req.EvolveUser_ID;
  //   try {
  //     let menus = await Evolve.App.Services.Evolve.EvolveServices.getAppMenuByAppId(
  //       req.body
  //     );
  //     if (menus instanceof Error || menus.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "No Menu Found!",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       var obj = {
  //         draw: req.query.draw,
  //         result: [],
  //         statusCode: 200,
  //         message: "success"
  //       };
  //       // Three Lavel Menu tree Code Start
  //       let menuList = [];
  //       let records = menus.recordsets[0];

  //       for (let i = records.length - 1; i >= 0; i--) {
  //         let assingned = false;
  //         if (records[i].assigned >= 1) {
  //           assingned = true;
  //         } else {
  //           assingned = false;
  //         }
  //         if (records[i].EvolveMenu_Parent == 0) {
  //           menuList.push({
  //             title: records[i].EvolveMenu_Name,
  //             expanded: true,
  //             folder: true,
  //             selected: assingned,
  //             menuIndex: records[i].EvolveMenu_Index,
  //             menuParent: records[i].EvolveMenu_Parent,
  //             icon: records[i].EvolveMenu_Icon,
  //             key: records[i].EvolveMenu_Id
  //           });
  //           records.splice(i, 1);
  //         }
  //       }

  //       for (let i = 0; i < records.length; i++) {
  //         for (j = 0; j < menuList.length; j++) {
  //           if (records[i].EvolveMenu_Parent == menuList[j].menuIndex) {
  //             if (menuList[j].children == undefined) {
  //               menuList[j].children = [];
  //             }
  //             menuList[j].children.push({
  //               title: records[i].EvolveMenu_Name,
  //               expanded: true,
  //               folder: true,
  //               menuIndex: records[i].EvolveMenu_Index,
  //               menuParent: records[i].EvolveMenu_Parent,
  //               icon: records[i].EvolveMenu_Icon
  //             });
  //             records.splice(i, 1);
  //           }
  //         }
  //       }
  //       for (let i = 0; i < records.length; i++) {
  //         for (k = 0; k < menuList.length; k++) {
  //           if (menuList[k].children !== undefined) {
  //             for (l = 0; l < menuList[k].children.length; l++) {
  //               //console.log(records[i].EvolveMenu_Parent+"::"+menuList[k].children[0].menuIndex );
  //               if (
  //                 records[i].EvolveMenu_Parent ==
  //                 menuList[k].children[l].menuIndex
  //               ) {
  //                 if (menuList[k].children[l].children == undefined) {
  //                   menuList[k].children[l].children = [];
  //                 }
  //                 menuList[k].children[l].children.push({
  //                   title: records[i].EvolveMenu_Name,
  //                   expanded: true,
  //                   folder: true,
  //                   icon: records[i].EvolveMenu_Icon
  //                 });
  //                 records.splice(i, 1);
  //               }
  //             }
  //           }
  //         }
  //       }

  //       obj.result = menuList;
  //       res.send(obj);
  //     }

  //     // Three Lavel Menu tree Code End
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // Roles

  // getAllRole: async function (req, res) {
  //   try {
  //     let start = parseInt(req.query.start);
  //     let length = parseInt(req.query.length);

  //     // let rolesCount = await Evolve.App.Services.Evolve.EvolveServices.getRolesCount(req.EvolveUser_ID);

  //     let roles = await Evolve.App.Services.Evolve.EvolveServices.getRolesDatatableList(
  //       req.EvolveUser_ID,
  //       start,
  //       length
  //     );

  //     if (roles instanceof Error) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on  Role LIst",
  //         result: roles.message
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Role List Geted Successfully !",
  //         result: roles.recordsets[0]
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // deleteRole: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.deleteRole(
  //       req.body.id
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on delete role",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Role Deleted",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // selectSingleRole: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.selectSingleRole(
  //       req.body.EvolveRole_ID
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on select role",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Role Role",
  //         result: result.recordset[0]
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // updateRole: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let userResponse = await Evolve.App.Services.Evolve.EvolveServices.updateRole(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Role Updated Successfully",
  //       result: null
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // updateRoleToMenu: async function (req, res) {
  //   req.body.EvolveUser_ID = req.EvolveUser_ID;
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.updateRoleToMenu(
  //       req.body
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Update Menu",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Menu Updated Successfully",
  //         result: result.recordset
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // selectSingleMenu: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let menuData = await Evolve.App.Services.Evolve.EvolveServices.selectSingleMenu(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Menu List",
  //       result: menuData
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // updateMenu: async function (req, res) {
  //   req.body.EvolveUser_ID = req.EvolveUser_ID;
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.updateMenu(
  //       req.body
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Update Menu",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Menu Updated Successfully",
  //         result: result.recordset
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // deleteMenu: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.deleteMenu(
  //       req.body.id
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on delete Menu",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Menu Deleted",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },
  // getProcessses made by ravatraj  for select process in process validation page
  // getProcesses: async function (req, res) {
  //   try {
  //     let processList = await Evolve.App.Services.Evolve.EvolveServices.getProcesses();
  //     //console.log("countryList :", countryList)
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Process List",
  //       result: processList.recordsets[0]
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // Process To machine Darshan

  // evolveProcessList: async function (req, res) {
  //   try {
  //     let apps = await Evolve.App.Services.Evolve.EvolveServices.getProcessList();
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Process List",
  //       result: apps.recordset
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // evolveMachineList: async function (req, res) {
  //   try {
  //     let apps = await Evolve.App.Services.Evolve.EvolveServices.getMachineList();
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Machine List",
  //       result: apps.recordset
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // createProcessToMachine: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let userid = req.EvolveUser_ID;
  //     for (let i = 0; i < req.body.EvolveMachine_id.length; i++) {
  //       req.body.EvolveMachine_id = req.body.EvolveMachine_id[i];
  //       let checkProcessToMachine = await Evolve.App.Services.Evolve.EvolveServices.checkProcessToMachine(req.body);
  //       if (checkProcessToMachine instanceof Error || checkProcessToMachine.rowsAffected < 1) {
  //         let result = await Evolve.App.Services.Evolve.EvolveServices.createProcessToMachine(req.body, userid);
  //         if (result instanceof Error || result.rowsAffected < 1) {
  //           let obj = {
  //             statusCode: 400,
  //             status: "fail",
  //             message: "Error on Query",
  //             result: null
  //           };
  //           res.send(obj);
  //         } else {
  //           let obj = {
  //             statusCode: 200,
  //             status: "success",
  //             message: "Process to Machine Created Successfully",
  //             result: null
  //           };
  //           res.send(obj);
  //         }
  //       } else {
  //         let obj = {
  //           statusCode: 400,
  //           status: "fail",
  //           message: "This Combination Already Exist !",
  //           result: null
  //         };
  //         res.send(obj);
  //       }
  //     }

  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // evolvegetprocesstomachine: async function (req, res) {
  //   try {
  //     console.log("----------");
  //     let apps = await Evolve.App.Services.Evolve.EvolveServices.evolvegetprocesstomachine();
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Process To machine List",
  //       result: apps.recordset
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // updateprocessmachine: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let checkProcessToMachineUpdate = await Evolve.App.Services.Evolve.EvolveServices.checkProcessToMachineUpdate(req.body);
  //     if (checkProcessToMachineUpdate instanceof Error || checkProcessToMachineUpdate.rowsAffected < 1) {
  //       let result = await Evolve.App.Services.Evolve.EvolveServices.updateprocessmachine(req.body);
  //       if (result instanceof Error || result.rowsAffected < 1) {
  //         let obj = {
  //           statusCode: 400,
  //           status: "fail",
  //           message: "Error on Update Process Machine",
  //           result: null
  //         };
  //         res.send(obj);
  //       } else {
  //         let obj = {
  //           statusCode: 200,
  //           status: "success",
  //           message: "Process To Machine Updated Successfully",
  //           result: null
  //         };
  //         res.send(obj);
  //       }
  //     } else {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "This Combination Already Exist !",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // deleteProcessToMachine: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.deleteProcessToMachine(
  //       req.body.id
  //     );
  //     // console.log("controller d : "+req.body.id)
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on deleted Process Machine",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Process To Machine Deleted Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  //section Darshan

  // addsection: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;

  //     let result = await Evolve.App.Services.Evolve.EvolveServices.addsection(
  //       req.body
  //     );

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Query",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Section Created Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getSectionList: async function (req, res) {
  //   try {
  //     let start = parseInt(req.query.start);
  //     let length = parseInt(req.query.length);
  //     let items = await Evolve.App.Services.Evolve.EvolveServices.getSectionDatatableList(
  //       req.EvolveUser_ID,
  //       start,
  //       length
  //     );
  //     if (items instanceof Error || items.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on  Item LIst",
  //         result: items.message
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Item List Successfully !",
  //         result: items.recordsets[0]
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // selectSingleSection: async function (req, res) {
  //   try {
  //     let processData = await Evolve.App.Services.Evolve.EvolveServices.selectSingleSection(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Section Single List",
  //       result: processData.recordset
  //     };

  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // updateSection: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.updateSection(
  //       req.body
  //     );

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Query",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Section Update Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // deleteSection: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.deleteSection(
  //       req.body.id
  //     );

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on deleted Section",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Section Deleted Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // serial Number Darshan

  // addserialnumber: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;

  //     let result = await Evolve.App.Services.Evolve.EvolveServices.addserialnumber(
  //       req.body
  //     );

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Query",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Serial Number Created Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getserialnumberList: async function (req, res) {
  //   try {
  //     let start = parseInt(req.query.start);
  //     let length = parseInt(req.query.length);
  //     let getSerialNumberData = await Evolve.App.Services.Evolve.EvolveServices.getserialnumberDatatableList(
  //       start,
  //       length
  //     );
  //     if (
  //       getSerialNumberData instanceof Error ||
  //       getSerialNumberData.rowsAffected < 1
  //     ) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on  Item LIst",
  //         result: getSerialNumberData.message
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Item List Successfully !",
  //         result: getSerialNumberData.recordsets[0]
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // selectSingleserialnumber: async function (req, res) {
  //   try {
  //     let processData = await Evolve.App.Services.Evolve.EvolveServices.selectSingleserialnumber(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Serial Single List",
  //       result: processData.recordset
  //     };

  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // updateserialnumber: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.updateserialnumber(
  //       req.body
  //     );

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Query",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Serial Number Update Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // deleteserialnumber: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.deleteserialnumber(
  //       req.body.id
  //     );

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on deleted Section",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Serial Number Deleted Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // Shift Master Darshan

  // addshift: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;

  //     let result = await Evolve.App.Services.Evolve.EvolveServices.addshift(
  //       req.body
  //     );

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Query",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Shift Created Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getshiftList: async function (req, res) {
  //   try {
  //     let start = parseInt(req.query.start);
  //     let length = parseInt(req.query.length);
  //     let getshiftList = await Evolve.App.Services.Evolve.EvolveServices.getshiftList(
  //       req.EvolveUser_ID,
  //       start,
  //       length
  //     );
  //     if (getshiftList instanceof Error || getshiftList.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on  Item LIst",
  //         result: getshiftList.message
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Item List Successfully !",
  //         result: getshiftList.recordsets[0]
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // selectSingleshift: async function (req, res) {
  //   try {
  //     let processData = await Evolve.App.Services.Evolve.EvolveServices.selectSingleshift(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Shift Single List",
  //       result: processData.recordset
  //     };

  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // updateshift: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.updateshift(
  //       req.body
  //     );

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Query",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Shift Update Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // deleteshift: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.deleteshift(
  //       req.body.id
  //     );

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on deleted Shift",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Shift Deleted Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // Process Template Darshan

  // addprocesstemplate: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;

  //     let result = await Evolve.App.Services.Evolve.EvolveServices.addprocesstemplate(
  //       req.body
  //     );

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Query",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Process Template Created Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getprocesstemplateList: async function (req, res) {
  //   try {
  //     let getprocesstemplateList = await Evolve.App.Services.Evolve.EvolveServices.getprocesstemplateList(
  //       req.EvolveUser_ID
  //     );
  //     if (getprocesstemplateList instanceof Error) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Query",
  //         result: getprocesstemplateList.message
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         result: getprocesstemplateList.recordsets[0]
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // selectSingleprocesstempalte: async function (req, res) {
  //   try {
  //     let processData = await Evolve.App.Services.Evolve.EvolveServices.selectSingleprocesstempalte(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Process Template Single List",
  //       result: processData.recordset
  //     };

  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // updateprocesstempalte: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.updateprocesstempalte(
  //       req.body
  //     );

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Query",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Process Template Update Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // deleteprocesstempalte: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.deleteprocesstempalte(
  //       req.body.id
  //     );
  //     let resultseq = await Evolve.App.Services.Evolve.EvolveServices.deleteprocesstempalteSeq(
  //       req.body.id
  //     );

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on deleted Process template",
  //         result: null,
  //         resultseq: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Process Template Deleted Successfully",
  //         result: null,
  //         resultseq: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null,
  //       resultseq: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // Process Template -> Process Template Sequence

  // selectprocesssequencePTN: async function (req, res) {
  //   try {
  //     let apps = await Evolve.App.Services.Evolve.EvolveServices.selectprocesssequencePTN();
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Process Template Name",
  //       result: apps.recordset
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // selectprocesssequencePN: async function (req, res) {
  //   try {
  //     let apps = await Evolve.App.Services.Evolve.EvolveServices.selectprocesssequencePN();
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Process Name",
  //       result: apps.recordset
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // selectprocesssequenceON: async function (req, res) {
  //   try {
  //     let processData = await Evolve.App.Services.Evolve.EvolveServices.selectprocesssequenceON(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Operation Number",
  //       result: processData.recordset
  //     };

  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // checksequenceprocessname: async function (req, res) {
  //   try {
  //     let processData = await Evolve.App.Services.Evolve.EvolveServices.checksequenceprocessname(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Process Sequence Already Created",
  //       result: processData.recordset
  //     };

  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  addprocesssequence: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;

      let result = await Evolve.App.Services.Evolve.EvolveServices.addprocesssequence(
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
          message: "Process Sequence Created Successfully",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0488: Error while adding process sequence "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0488: Error while adding process sequence "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // selectprocessteplatesequence: async function (req, res) {
  //   try {
  //     let processData = await Evolve.App.Services.Evolve.EvolveServices.selectprocessteplatesequence(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Process teplate Single List",
  //       result: processData.recordset
  //     };

  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  evolvegetprocesstomachine: async function (req, res) {
    try {
      console.log("----------");
      let apps = await Evolve.App.Services.Evolve.EvolveServices.evolvegetprocesstomachine();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Process To machine List",
        result: apps.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0489: Error while evolve getting process to machine "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0489: Error while evolve getting process to machine "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  deleteProcessToMachine: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.EvolveServices.deleteProcessToMachine(
        req.body.id
      );
      // console.log("controller d : "+req.body.id)
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on deleted Process Machine",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Process To Machine Deleted Successfully",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0490: Error while deleting process to machine "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0490: Error while deleting process to machine "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // selectSingleSection: async function (req, res) {
  //   try {
  //     let processData = await Evolve.App.Services.Evolve.EvolveServices.selectSingleSection(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Section Single List",
  //       result: processData.recordset
  //     };

  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //   }
  // },
  //add data for process validation by RAVAT

  // addProcessVal: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let proPlan = await Evolve.App.Services.Evolve.EvolveServices.addProcessVal(
  //       req.body
  //     );

  //     if (proPlan instanceof Error || proPlan.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Process Table",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "New Process Added Successfully",
  //         result: proPlan.recordsets[0]
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },
  // getProcessValData: async function (req, res) {
  //   try {
  //     let start = parseInt(req.query.start);
  //     let length = parseInt(req.query.length);
  //     // let proPlanCount = await Evolve.App.Services.Evolve.EvolveServices.getProcessValDataCount();
  //     let getProcessVal = await Evolve.App.Services.Evolve.EvolveServices.getProcessValData(
  //       start,
  //       length
  //     );

  //     // var obj = {
  //     //   'draw': req.query.draw,
  //     //   'recordsTotal': proPlanCount.recordset[0].count,
  //     //   'recordsFiltered': proPlanCount.recordset[0].count,
  //     //   'data': proPlan.recordset
  //     // };
  //     // console.log("PV :",obj);
  //     // res.send(obj);
  //     if (getProcessVal instanceof Error) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on  Query",
  //         result: getProcessVal.message
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,

  //         result: getProcessVal.recordsets[0]
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },
  // deleteProcessval: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.deleteProcessval(
  //       req.body.id
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on delete process",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Process  Deleted",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // selectSingleProcessVal: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.selectSingleProcessVal(
  //       req.body.EvolveProcessVal_ID
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on select Process Validation",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Process Validation",
  //         result: result.recordset[0]
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },
  // updateProcessVal: async function (req, res) {
  //   try {
  //     // req.body.EvolveUser_ID = req.EvolveUser_ID
  //     let userResponse = await Evolve.App.Services.Evolve.EvolveServices.updateProcessVal(
  //       req.body
  //     );
  //     if (userResponse instanceof Error || userResponse.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: userResponse.message,
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Process Validation Updated Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // updateSection: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.updateSection(
  //       req.body
  //     );

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Query",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Section Update Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // deleteSection: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.deleteSection(
  //       req.body.id
  //     );

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on deleted Section",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Section Deleted Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // Addserialnumber

  // Part Bom Master Darshan

  addpartbommaster: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;

      let result = await Evolve.App.Services.Evolve.EvolveServices.addpartbommaster(
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
          message: "Bom Master Created Successfully",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0491: Error while adding part bom master "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0491: Error while adding part bom master "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // getItemSearch: async function (req, res) {
  //   try {
  //     let poList = await Evolve.App.Services.Evolve.EvolveServices.getItemSearch(
  //       req.body.term
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "search List",
  //       result: poList.recordsets[0]
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },
  getChildItemSearch: async function (req, res) {
    try {
      let poList = await Evolve.App.Services.Evolve.EvolveServices.getChildItemSearch(
        req.body.term
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "search Child List",
        result: poList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0492: Error while getting Child item Search "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0492: Error while getting Child item Search "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // getpartbom_dispseq: async function (req, res) {
  //   try {
  //     let processData = await Evolve.App.Services.Evolve.EvolveServices.getpartbom_dispseq(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "sucess",
  //       result: processData.recordset
  //     };

  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getpartbommaster: async function (req, res) {
  //   try {
  //     //  console.log("EvolveUser_ID :", req.EvolveUser_ID)
  //     let start = parseInt(req.query.start);
  //     let length = parseInt(req.query.length);

  //     // let getpartbommasterCount = await Evolve.App.Services.Evolve.EvolveServices.getpartbommasterCount(req.EvolveUser_ID);
  //     let getpartbommaster = await Evolve.App.Services.Evolve.EvolveServices.getpartbommaster(
  //       start,
  //       length
  //     );

  //     if (getpartbommaster instanceof Error) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Query",
  //         result: getpartbommaster.message
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,

  //         result: getpartbommaster.recordsets[0]
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // selectSinglePartBomMaster: async function (req, res) {
  //   try {
  //     let processData = await Evolve.App.Services.Evolve.EvolveServices.selectSinglePartBomMaster(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Part Bom Master Single List",
  //       result: processData.recordset
  //     };

  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // updatepartbommaster: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.updatepartbommaster(
  //       req.body
  //     );

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Query",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Part Bom Master Update Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // deletepartbommaster: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.deletepartbommaster(
  //       req.body.id
  //     );

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on deleted Part Bom Master",
  //         result: null,
  //         resultseq: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Part Bom Master Deleted Successfully",
  //         result: null,
  //         resultseq: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null,
  //       resultseq: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getProcessTemp: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.getProcessTemp();
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Get Process Template",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Process Template",
  //         result: result.recordset
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getItemGroup: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.getItemGroup();
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Get Item Group",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Item Group",
  //         result: result.recordset
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getSerialMaster: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.getSerialMaster();
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Get Serial Master",
  //         result: result.message
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Serial Master",
  //         result: result.recordset
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // createItem: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.createItem(
  //       req.body
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Add Item",
  //         result: result.message
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Item Added Successfully !",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  getItemsList: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let search = req.query.search.value;

      console.log("search ::", search)


      let itemsCount = await Evolve.App.Services.Evolve.EvolveServices.getItemsCountList();
      let items = await Evolve.App.Services.Evolve.EvolveServices.getItemsDatatableList(
        start,
        length
      );
      var obj = {
        draw: req.query.draw,
        recordsTotal: itemsCount.recordset[0].count,
        recordsFiltered: itemsCount.recordset[0].count,
        data: items.recordset
      };

      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0493: Error while getting Items list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0493: Error while getting Items list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  // Item master data table serach
  // getItemsListDt: async function (req, res) {
  //   try {
  //     let items = await Evolve.App.Services.Evolve.EvolveServices.getItemsListDtList();
  //     if (items instanceof Error) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on  Item LIst",
  //         result: items.message
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Item List Successfully !",
  //         result: items.recordsets[0]
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },
  getSingleItemData: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.EvolveServices.getSingleItemData(
        req.body
      );
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on Item",
          result: result.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Item Data",
          result: result.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0494: Error while getting Single Item Data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0494: Error while getting Single Item Data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // updateItem: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.updateItem(
  //       req.body
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Update Item",
  //         result: result.message
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // selectprocessteplatesequence: async function (req, res) {
  //   try {
  //     let processData = await Evolve.App.Services.Evolve.EvolveServices.selectprocessteplatesequence(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Process teplate Single List",
  //       result: processData.recordset
  //     };

  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  evolvegetprocesstomachine: async function (req, res) {
    try {
      console.log("----------");
      let apps = await Evolve.App.Services.Evolve.EvolveServices.evolvegetprocesstomachine();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Process To machine List",
        result: apps.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0495: Error while evolve getting process to machine "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0495: Error while evolve getting process to machine "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // getProcessToMachineList: async function (req, res) {
  //   try {
  //     let processtomachine = await Evolve.App.Services.Evolve.EvolveServices.getProcessToMachineDt();
  //     if (
  //       processtomachine instanceof Error ||
  //       processtomachine.rowsAffected < 1
  //     ) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error While Fatching Process To Machine List",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Process To Machine List ",
  //         result: processtomachine.recordset
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // selectSingleProcessMachine: async function (req, res) {
  //   try {
  //     let processData = await Evolve.App.Services.Evolve.EvolveServices.selectSingleProcessMachine(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Process Single List",
  //       result: processData.recordset
  //     };

  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  deleteProcessToMachine: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.EvolveServices.deleteProcessToMachine(
        req.body.id
      );

      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on deleted Process Machine",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Process To Machine Deleted Successfully",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0496: Error while deleting process to machine "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0496: Error while deleting process to machine "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  //section Darshan

  // addsection: async function (req, res) {
  //   try {

  //     // console.log(req.body.EvolveMachine_Name);
  //     // console.log(req.body.EvolveProcess_Name);
  //     // console.log("User ",req.EvolveUser_ID);
  //     req.body.EvolveUser_ID = req.EvolveUser_ID

  //     let result = await Evolve.App.Services.Evolve.EvolveServices.addsection(req.body);

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Query",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Section Created Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getSectionList: async function (req, res) {
  //   try {
  //     //  console.log("EvolveUser_ID :", req.EvolveUser_ID)
  //     let start = parseInt(req.query.start);
  //     let length = parseInt(req.query.length);
  //     let search = req.query.search.value;

  //     let processtomachineCount = await Evolve.App.Services.Evolve.EvolveServices.getSectionListCount(req.EvolveUser_ID);
  //     let processtomachine = await Evolve.App.Services.Evolve.EvolveServices.getSectionDatatableList(req.EvolveUser_ID, start, length);

  //     var obj = {
  //       'draw': req.query.draw,
  //       'recordsTotal': processtomachineCount.recordset[0].count,
  //       'recordsFiltered': processtomachineCount.recordset[0].count,
  //       'data': processtomachine.recordset
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // selectSingleSection: async function (req, res) {
  //   try {
  //     let processData = await Evolve.App.Services.Evolve.EvolveServices.selectSingleSection(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Section Single List",
  //       result: processData.recordset
  //     };

  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //   }
  // },
  //add data for process validation by RAVAT

  // addProcessVal: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let proPlan = await Evolve.App.Services.Evolve.EvolveServices.addProcessVal(
  //       req.body
  //     );

  //     if (proPlan instanceof Error || proPlan.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Process Table",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "New Process Added Successfully",
  //         result: proPlan.recordsets[0]
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // deleteProcessval: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.deleteProcessval(
  //       req.body.id
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on delete process",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Process  Deleted",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // selectSingleProcessVal: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.selectSingleProcessVal(
  //       req.body.EvolveProcessVal_ID
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on select Process Validation",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Process Validation",
  //         result: result.recordset[0]
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },
  // updateProcessVal: async function (req, res) {
  //   try {
  //     // req.body.EvolveUser_ID = req.EvolveUser_ID
  //     let userResponse = await Evolve.App.Services.Evolve.EvolveServices.updateProcessVal(
  //       req.body
  //     );
  //     if (userResponse instanceof Error || userResponse.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: userResponse.message,
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Process Validation Updated Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // updateSection: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.updateSection(
  //       req.body
  //     );

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Query",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Section Update Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // deleteSection: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.deleteSection(
  //       req.body.id
  //     );

  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on deleted Section",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Section Deleted Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // Addserialnumber

  // Part Bom Master Darshan

  // deletepartbommaster: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.deletepartbommaster(
  //       req.body.id
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on deleted Part Bom Master",
  //         result: null,
  //         resultseq: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Part Bom Master Deleted Successfully",
  //         result: null,
  //         resultseq: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null,
  //       resultseq: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // addpartbommaster: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let checkBomMaster = await Evolve.App.Services.Evolve.EvolveServices.checkBomMaster(
  //       req.body
  //     );
  //     if (checkBomMaster.recordset[0].count > 0) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Data Already Inserted",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let result = await Evolve.App.Services.Evolve.EvolveServices.addpartbommaster(
  //         req.body
  //       );
  //       if (result instanceof Error || result.rowsAffected < 1) {
  //         let obj = {
  //           statusCode: 400,
  //           status: "fail",
  //           message: "Error on Query",
  //           result: null
  //         };
  //         res.send(obj);
  //       } else {
  //         let obj = {
  //           statusCode: 200,
  //           status: "success",
  //           message: "Bom Master Created Successfully",
  //           result: null
  //         };
  //         res.send(obj);
  //       }
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getItemSearch: async function (req, res) {
  //   try {
  //     let poList = await Evolve.App.Services.Evolve.EvolveServices.getItemSearch(
  //       req.body.term
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Item Updated Successfully !",
  //       result: null
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // deleteItem: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.deleteItem(
  //       req.body
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Delete Item",
  //         result: result.message
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Item Deleted Successfully !",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },
  // getUsers: async function (req, res) {
  //   try {
  //     let UserList = await Evolve.App.Services.Evolve.EvolveServices.getUsers();
  //     //console.log("countryList :", countryList)
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "User List",
  //       result: UserList.recordsets[0]
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },
  //  below function is for get Machine  for Machine to User asign page made by Ravat
  // getmachines: async function (req, res) {
  //   try {
  //     let UserList = await Evolve.App.Services.Evolve.EvolveServices.getmachines();
  //     //console.log("countryList :", countryList)
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Machine List",
  //       result: UserList.recordsets[0]
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  //  below function is for add machine to user  for Machine to User asign page made by Ravat
  // addMachineToUser: async function (req, res) {
  //   try {
  //     req.body.EvolveCreatedUser_ID = req.EvolveUser_ID;
  //     //Check Already Exist
  //     let checkMachineToUser = await Evolve.App.Services.Evolve.EvolveServices.checkMachineToUser(
  //       req.body
  //     );
  //     if (checkMachineToUser.rowsAffected > 0) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Machine To User Already Assigned",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let proPlan = await Evolve.App.Services.Evolve.EvolveServices.addMachineToUser(
  //         req.body
  //       );
  //       if (proPlan instanceof Error || proPlan.rowsAffected < 1) {
  //         let obj = {
  //           statusCode: 400,
  //           status: "fail",
  //           message: "Error While Assigned Machine To User",
  //           result: null
  //         };
  //         res.send(obj);
  //       } else {
  //         let obj = {
  //           statusCode: 200,
  //           status: "success",
  //           message: "Machine To User Asssigned Successfully !",
  //           result: proPlan.recordsets[0]
  //         };
  //         res.send(obj);
  //       }
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },
  //  below function is for get list  to user  for Machine to User asign page made by Ravat
  // getMachinetoUserList: async function (req, res) {
  //   try {
  //     // let start = parseInt(req.query.start);
  //     // let length = parseInt(req.query.length);
  //     // let proPlanCount = await Evolve.App.Services.Evolve.EvolveServices.getMachinetoUserListCount();
  //     let getMachineToUser = await Evolve.App.Services.Evolve.EvolveServices.();
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Machine To User Getted",
  //       result: getMachineToUser.recordset
  //     };
  //     res.send(obj);
  //     // var obj = {
  //     //   'draw': req.query.draw,
  //     //   'recordsTotal': proPlanCount.recordset[0].count,
  //     //   'recordsFiltered': proPlanCount.recordset[0].count,
  //     //   'data': proPlan.recordset
  //     // };
  //     // res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getProcessList: async function (req, res) {
  //   try {
  //     let start = parseInt(req.query.start);
  //     let length = parseInt(req.query.length);
  //     // let proPlanCount = await Evolve.App.Services.Evolve.EvolveServices.getProcesscount();
  //     let getProcessList = await Evolve.App.Services.Evolve.EvolveServices.getProcessListDatabase(
  //       start,
  //       length
  //     );
  //     if (getProcessList instanceof Error || getProcessList.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on  Item LIst",
  //         result: getProcessList.message
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Item List Successfully !",
  //         result: getProcessList.recordsets[0]
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getLastProcessValSeqNum: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.getLastProcessValSeqNum(
  //       req.body.EvolveProcess_ID
  //     );
  //     if (result instanceof Error) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Get Last Process Sequence",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Process Sequence",
  //         result: result.recordset
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // addProcess: async function (req, res) {
  //   try {
  //     let searchData = {
  //       processName: req.body.processName,
  //       processDescription: req.body.processDescription
  //     };

  //     let addProcess = await Evolve.App.Services.Evolve.EvolveServices.addProcess(
  //       searchData
  //     );

  //     if (addProcess instanceof Error || addProcess.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Process Table",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "New Process Added Successfully",
  //         result: addProcess.recordsets[0]
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },
  // selectSinglePartBomMaster: async function (req, res) {
  //   try {
  //     let processData = await Evolve.App.Services.Evolve.EvolveServices.selectSinglePartBomMaster(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Part Bom Master Single List",
  //       result: processData.recordset
  //     };

  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // updatepartbommaster: async function (req, res) {
  //   try {
  //     let checkBomMaster = await Evolve.App.Services.Evolve.EvolveServices.checkBomMasterEdit(
  //       req.body
  //     );
  //     if (checkBomMaster.recordset[0].count > 0) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Data Already Inserted",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       req.body.EvolveUser_ID = req.EvolveUser_ID;
  //       let result = await Evolve.App.Services.Evolve.EvolveServices.updatepartbommaster(
  //         req.body
  //       );

  //       if (result instanceof Error || result.rowsAffected < 1) {
  //         let obj = {
  //           statusCode: 400,
  //           status: "fail",
  //           message: "Error on Query",
  //           result: null
  //         };
  //         res.send(obj);
  //       } else {
  //         let obj = {
  //           statusCode: 200,
  //           status: "success",
  //           message: "Part Bom Master Update Successfully",
  //           result: null
  //         };
  //         res.send(obj);
  //       }
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getProcessTemp: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.getProcessTemp();
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Get Process Template",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Process Template",
  //         result: result.recordset
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getItemGroup: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.getItemGroup();
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Get Item Group",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Item Group",
  //         result: result.recordset
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },
  // getPdiTemplates: async function (req, res) {
  //   try {
  //     let getPdiTemplates = await Evolve.App.Services.Evolve.EvolveServices.getPdiTemplates();
  //     if (
  //       getPdiTemplates instanceof Error ||
  //       getPdiTemplates.rowsAffected < 1
  //     ) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Get Item Group",
  //         getPdiTemplates: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Item Group",
  //         result: getPdiTemplates.recordset
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getSerialMaster: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.getSerialMaster();
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Get Serial Master",
  //         result: result.message
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Serial Master",
  //         result: result.recordset
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getUsers: async function (req, res) {
  //   try {
  //     let UserList = await Evolve.App.Services.Evolve.EvolveServices.getUsers();
  //     //console.log("countryList :", countryList)
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "User List",
  //       result: UserList.recordsets[0]
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // createItem: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.createItem(
  //       req.body
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Add Item",
  //         result: result.message
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Item Added Successfully !",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  getItemsList: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let search = req.query.search.value;
      let itemsCount = await Evolve.App.Services.Evolve.EvolveServices.getItemsCountList();
      let items = await Evolve.App.Services.Evolve.EvolveServices.getItemsDatatableList(
        start,
        length
      );
      var obj = {
        draw: req.query.draw,
        recordsTotal: itemsCount.recordset[0].count,
        recordsFiltered: itemsCount.recordset[0].count,
        data: items.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0497: Error while getting Item list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0497: Error while getting Item list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  // Item master data table serach
  getItemsListDt: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let items = await Evolve.App.Services.Evolve.EvolveServices.getItemsListDtList(
        req.EvolveUser_ID,
        start,
        length
      );
      if (items instanceof Error || items.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on  Item LIst",
          result: items.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Item List Successfully !",
          result: items.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0498: Error while getting Items List Dt "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0498: Error while getting Items List Dt "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // io Data
  getIoReportData: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);


      let andkey = true;
      let condition = "";
      if (req.body.startDate != "" && req.body.endDate != "") {
        if (andkey == true) {
          condition = condition + " WHERE  ";
        }
        condition =
          condition +
          "cast(EvolveIO_File_InTime as date) >=" +
          "'" +
          req.body.startDate +
          "'" +
          " and cast(EvolveIO_File_InTime as date) <=" +
          "'" +
          req.body.endDate +
          "'";
        andkey = true;
      }

      let ioDataCount = await Evolve.App.Services.Evolve.EvolveServices.getIoReportDataCountList(
        condition
      );
      let ioDataList = await Evolve.App.Services.Evolve.EvolveServices.getIoReportDataDatatableList(
        start,
        length,
        condition
      );

      var obj = {
        draw: req.query.draw,
        recordsTotal: ioDataCount.recordset[0].count,
        recordsFiltered: ioDataCount.recordset[0].count,
        data: ioDataList.recordset,
        statusCode: 200,
        result: ioDataList.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0499: Error while getting Io Report Data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0499: Error while getting Io Report Data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getSingleIoCodeData: async function (req, res) {
    try {
      let getSingleIoCodeData = await Evolve.App.Services.Evolve.EvolveServices.getSingleIoCodeData(
        req.body.id
      );
      if (
        getSingleIoCodeData instanceof Error ||
        getSingleIoCodeData.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "io Data not found ",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: getSingleIoCodeData.recordset[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0500: Error while getting Single Io Code Data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0500: Error while getting Single Io Code Data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  changeIoCodeStatus: async function (req, res) {
    try {
      let changeIoCodeStatus = await Evolve.App.Services.Evolve.EvolveServices.changeIoCodeStatus(
        req.body.id
      );
      if (changeIoCodeStatus instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "io Data not found ",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: ""
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0501: Error change Io Code Status "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0501: Error change Io Code Status "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // getSingleItemData: async function (req, res) {
  //   try {
  //     let getSingleItemData = await Evolve.App.Services.Evolve.EvolveServices.getSingleItemData(
  //       req.body
  //     );
  //     if (
  //       getSingleItemData instanceof Error ||
  //       getSingleItemData.rowsAffected < 1
  //     ) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: error.message,
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: getSingleItemData.recordset,
  //         result: null
  //       };
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getSingleItemData: async function (req, res) {
  //   try {
  //     let getSingleItemData = await Evolve.App.Services.Evolve.EvolveServices.getSingleItemData(
  //       req.body
  //     );
  //     if (
  //       getSingleItemData instanceof Error ||
  //       getSingleItemData.rowsAffected < 1
  //     ) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Item",
  //         result: getSingleItemData.message
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Item Data",
  //         result: getSingleItemData.recordset
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  updateItem: async function (req, res) {
    try {

      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let updateItem = await Evolve.App.Services.Evolve.EvolveServices.updateItem(
        req.body
      );
      if (updateItem instanceof Error || updateItem.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on Update Item",
          result: updateItem.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Item Updated Successfully !",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0502: Error while updating Item "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0502: Error while updating Item "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  deleteItem: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let deleteItem = await Evolve.App.Services.Evolve.EvolveServices.deleteItem(
        req.body
      );
      if (deleteItem instanceof Error || deleteItem.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on Delete Item",
          result: deleteItem.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Item Deleted Successfully !",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0503: Error while deleting Item "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0503: Error while deleting Item "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // deleteProcess: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.deleteProcess(
  //       req.body.id
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on Process",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Process Deleted Successfully!",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // selectSingleProcess: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.selectSingleProcess(
  //       req.body.EvolveProcess_ID
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on select process",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Process",
  //         result: result.recordset
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // updateProcess: async function (req, res) {
  //   try {
  //     req.body.EvolveUser_ID = req.EvolveUser_ID;
  //     let userResponse = await Evolve.App.Services.Evolve.EvolveServices.updateProcess(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Process Updated Successfully",
  //       result: null
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // deleteMachineToUser: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.deleteMachineToUser(
  //       req.body.id
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on delete Machine to User asignment",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Machine to User asignment deleted",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },
  // selectSingleMachineToUser: async function (req, res) {
  //   try {
  //     let result = await Evolve.App.Services.Evolve.EvolveServices.selectSingleMachineToUser(
  //       req.body.EvolveMachineToUser_ID
  //     );
  //     if (result instanceof Error || result.rowsAffected < 1) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Error on select Machine to User Assignment",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "MAchine to User",
  //         result: result.recordset
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // updateMachineToUser: async function (req, res) {
  //   req.body.EvolveUpdatedUser_ID = req.EvolveUser_ID;
  //   try {
  //     let checkMachineToUser = await Evolve.App.Services.Evolve.EvolveServices.checkMachineToUserUpdate(
  //       req.body
  //     );

  //     if (checkMachineToUser.rowsAffected > 0) {
  //       let obj = {
  //         statusCode: 400,
  //         status: "fail",
  //         message: "Machine To User Already Assigned",
  //         result: null
  //       };
  //       res.send(obj);
  //     } else {
  //       let updateMAchinetoUser = await Evolve.App.Services.Evolve.EvolveServices.updateMachineToUser(
  //         req.body
  //       );
  //       let obj = {
  //         statusCode: 200,
  //         status: "success",
  //         message: "Machine to User Updated Successfully",
  //         result: null
  //       };
  //       res.send(obj);
  //     }
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  // getMenuList: async function (req, res) {
  //   try {
  //     let MenuList = await Evolve.App.Services.Evolve.EvolveServices.getMenuList();
  //     //console.log("countryList :", countryList)
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Menu List",
  //       result: MenuList.recordsets[0]
  //     };
  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // },

  addUnitConfiguration: async function (req, res) {
    try {
      req.body.EvolveCreatedUser_ID = req.EvolveUser_ID;
      //Check Already Exist
      let checkUnitConfig = await Evolve.App.Services.Evolve.EvolveServices.checkUnitConfig(
        req.body
      );
      if (checkUnitConfig.rowsAffected > 0) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Unit Configuration Already Exist",
          result: null
        };
        res.send(obj);
      } else {
        let addunitconfig = await Evolve.App.Services.Evolve.EvolveServices.addUnitConfiguration(
          req.body
        );
        if (addunitconfig instanceof Error || addunitconfig.rowsAffected < 1) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error While Add Unit Configuration",
            result: null
          };
          res.send(obj);
        } else {
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Unit Configuration Added Successfully !",
            result: addunitconfig.recordsets[0]
          };
          res.send(obj);
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0504: Error while adding unit configuration "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0504: Error while adding unit configuration "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getUnitConfigList: async function (req, res) {
    try {
      let start = parseInt(req.body.startFrom);
      let length = parseInt(req.body.displayRecord);
      let search = req.body.search;
      let UnitConfigCount = await Evolve.App.Services.Evolve.EvolveServices.getUnitConfigListCount(search);
      let UnitConfgList = await Evolve.App.Services.Evolve.EvolveServices.getUnitConfigList(
        start,
        length,
        search
      );
        
      if (UnitConfgList instanceof Error) {
        let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error while get UnitConfgList list !",
            result: UnitConfgList.message
        };
        res.send(obj);
    } else {
        let resObj = {
            noOfRecord: UnitConfigCount.recordset[0].count,
            records: UnitConfgList.recordset
        }
        let obj = {
            statusCode: 200,
            status: "success",
            message: "Get Unit Confg List",
            result: resObj
        };
        res.send(obj);
    }
    } catch (error) {
      Evolve.Log.error(" EERR0505: Error while getting unit config list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0505: Error while getting unit config list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  deleteUnitConfiguration: async function (req, res) {
    try {
      let deleteUnitConfig = await Evolve.App.Services.Evolve.EvolveServices.deleteUnitConfiguration(
        req.body.id
      );
      // console.log("controller d : "+req.body.id)
      if (
        deleteUnitConfig instanceof Error ||
        deleteUnitConfig.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on deleted Process Machine",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Process To Machine Deleted Successfully",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0506: Error while deleting unit configuration "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0506: Error while deleting unit configuration "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  selectSingleUnitConfig: async function (req, res) {
    try {
      let selectUnitConfig = await Evolve.App.Services.Evolve.EvolveServices.selectSingleUnitConfig(
        req.body.EvolveUnitConfig_ID
      );
      if (
        selectUnitConfig instanceof Error ||
        selectUnitConfig.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on Select Unit Configuration",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Unit Configuration",
          result: selectUnitConfig.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0507: Error while selecting single Unit Config "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0507: Error while selecting single Unit Config "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  updateUnitConfiguration: async function (req, res) {
    try {
      req.body.EvolveCreatedUser_ID = req.EvolveUser_ID;
      //Check Already Exist
      let checkUpdateUnitConfig = await Evolve.App.Services.Evolve.EvolveServices.checkUpdateUnitConfig(
        req.body
      );
      if (checkUpdateUnitConfig.rowsAffected > 0) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Unit Configuration Already Exist",
          result: null
        };
        res.send(obj);
      } else {
        let updateunitconfig = await Evolve.App.Services.Evolve.EvolveServices.updateUnitConfiguration(
          req.body
        );
        if (
          updateunitconfig instanceof Error ||
          updateunitconfig.rowsAffected < 1
        ) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error While Update Unit Configuration",
            result: null
          };
          res.send(obj);
        } else {
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Unit Configuration Updated Successfully !",
            result: updateunitconfig.recordsets[0]
          };
          res.send(obj);
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0508: Error while updating Unit Configuration "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0508: Error while updating Unit Configuration "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getMachineMasterSection: async function (req, res) {
    try {
      let SectionList = await Evolve.App.Services.Evolve.EvolveServices.getMachineMasterSection();
      //console.log("countryList :", countryList)
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Section List",
        result: SectionList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0509: Error while getting Machine Master Section "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0509: Error while getting Machine Master Section "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  addMachineMaster: async function (req, res) {
    try {
      req.body.EvolveCreatedUser_ID = req.EvolveUser_ID;
      let addmachinemaster = await Evolve.App.Services.Evolve.EvolveServices.addMachineMaster(
        req.body
      );
      if (
        addmachinemaster instanceof Error ||
        addmachinemaster.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error While Add Machine Master",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Machine Master Added Successfully !",
          result: addmachinemaster.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0510: Error while adding machine master "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0510: Error while adding machine master "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getmachineMasterList: async function (req, res) {
    // console.log("Get machine master is running >>>   >  >");
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      // let getMachineMastercount = await Evolve.App.Services.Evolve.EvolveServices.getmachineMasterListCount();
      let getMachineMasterList = await Evolve.App.Services.Evolve.EvolveServices.getmachineMasterList(
        start,
        length
      );
      // console.log("record set is >>  ", getMachineMasterList.recordsets[0]);
      // var obj = {
      //   'draw': req.query.draw,
      //   'recordsTotal': getMachineMastercount.recordset[0].count,
      //   'recordsFiltered': getMachineMastercount.recordset[0].count,
      //   'data': getMachineMasterCount.recordset
      // };
      if (getMachineMasterList instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on  Item LIst",
          result: getMachineMasterList.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          result: getMachineMasterList.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0511: Error while getting machine Master List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0511: Error while getting machine Master List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  deleteMachineMaster: async function (req, res) {
    // console.log("Machine Delete Id Controller : " + req.body.id);
    try {
      let deleteMachineMaster = await Evolve.App.Services.Evolve.EvolveServices.deleteMachineMaster(
        req.body.id
      );
      if (
        deleteMachineMaster instanceof Error ||
        deleteMachineMaster.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on deleted Machine Master",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Machine Master Deleted Successfully",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0512: Error while deleting Machine Master "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0512: Error while deleting Machine Master "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  selectSingleMaster: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.EvolveServices.selectSingleMaster(
        req.body.EvolveMachine_ID
      );
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on select Single Master",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Single Master",
          result: result.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0513: Error while selecting single master "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0513: Error while selecting single master "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  updateMachineMaster: async function (req, res) {
    try {
      req.body.EvolveUpdatedUser_ID = req.EvolveUser_ID;
      let updateMachineMaster = await Evolve.App.Services.Evolve.EvolveServices.updateMachineMaster(
        req.body
      );
      if (
        updateMachineMaster instanceof Error ||
        updateMachineMaster.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error While Update Machine Master",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Machine Master Updated Successfully Successfully !",
          result: updateMachineMaster.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0514: Error while updating Machine Master "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0514: Error while updating Machine Master "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  resetSerialMaster: async function (req, res) {
    try {
      let resetSerialMaster = await Evolve.App.Services.Evolve.EvolveServices.resetSerialMaster();
      // if(updateMachineMaster instanceof Error || updateMachineMaster.rowsAffected < 1){
      //   let obj = { statusCode: 400, status: "fail", message: "Error While Update Machine Master", result: null };
      //   res.send(obj);
      // } else {
      //   let obj = { statusCode: 200, status: "success", message: "Machine Master Updated Successfully Successfully !", result: updateMachineMaster.recordsets[0] };
      //   res.send(obj);
      // }
    } catch (error) {
      Evolve.Log.error(" EERR0515: Error while resetting serial master "+error.message);
      //  let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
      //  res.send(obj);
    }
  },

  //PDI Template Code Create By DK

  addPDITempCode: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.EvolveServices.addPDITempCode(
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
          message: "PDI Template Code Created Successfully",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0516: Error while adding PDI Temp Code "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getPDITempCode: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.EvolveServices.getPDITempCode(
        req.body
      );
      // console.log("get all Code", result);
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on select process",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Process",
          result: result.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0517: Error while getting PDI Temp Code "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0517: Error while getting PDI Temp Code "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  addPDITemp: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.EvolveServices.addPDITemp(
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
          message: "PDI Template Created Successfully",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0518: Error while adding PDI Temp "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0518: Error while adding PDI Temp "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getPDITempDetail: async function (req, res) {
    try {
      let getPDITempDetailList = await Evolve.App.Services.Evolve.EvolveServices.getPDITempDetailList();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Process Template Details",
        result: getPDITempDetailList.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0519: Error while getting PDI Temp Detail "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0519: Error while getting PDI Temp Detail "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  selectSinglePDITemp: async function (req, res) {
    try {
      let processData = await Evolve.App.Services.Evolve.EvolveServices.selectSinglePDITemp(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Single List",
        result: processData.recordset
      };

      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0520: Error while selecting Single PDI Temp "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0520: Error while selecting Single PDI Temp "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  updatePDITempDetail: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.EvolveServices.updatePDITempDetail(
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
          message: "Update Successfully",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0521: Error while updating PDI Temp Detail "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0521: Error while updating PDI Temp Detail "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  deletePDITempDetail: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.EvolveServices.deletePDITempDetail(
        req.body.id
      );

      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on deleted Section",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Deleted Successfully",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0522: Error while deleting PDI Temp Detail "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0522: Error while deleting PDI Temp Detail "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // Evolve User Setting
  getProfileData: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      // console.log("......................", req.body.EvolveUser_ID);
      //console.log("+++++++++++++++++++++",req.query.EvolveUser_ID);
      let result = await Evolve.App.Services.Evolve.EvolveServices.getProfileData(
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
          message: "User Data fetch Successfully Successfully",
          result: result.recordset
        };
        res.send(obj);
        // console.log(result.recordset);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0523: Error while getting profile data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0523: Error while getting profile data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  //Sub Item List
  getItemNumber: async function (req, res) {
    try {
      let itemNumberList = await Evolve.App.Services.Evolve.EvolveServices.getItemNumber();
      //console.log("countryList :", countryList)
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Item Number List",
        result: itemNumberList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0524: Error while getting Item Number "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0524: Error while getting Item Number "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getSubItemListDt: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let items = await Evolve.App.Services.Evolve.EvolveServices.getSubItemListDtList(
        req.EvolveUser_ID,
        start,
        length
      );
      if (items instanceof Error || items.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on  Item LIst",
          result: items.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Item List Successfully !",
          result: items.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0525: Error while getting SubItem List Dt "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0525: Error while getting SubItem List Dt "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  deleteSubItem: async function (req, res) {
    try {
      // console.log("Body data", req.body.id);
      let result = await Evolve.App.Services.Evolve.EvolveServices.deleteSubItem(
        req.body.id
      );

      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on deleted Sub Item ",
          result: null,
          resultseq: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Sub Item Deleted Successfully",
          result: null,
          resultseq: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0526: Error while deleting SubItem "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0526: Error while deleting SubItem "+error.message,
        result: null,
        resultseq: null
      };
      res.send(obj);
    }
  },

  addSubItemList: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let checkSubItem = await Evolve.App.Services.Evolve.EvolveServices.checkSubItem(
        req.body
      );
      if (checkSubItem.recordset[0].count > 0) {
        // console.log(checkSubItem.recordset[0].count > 0);

        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Sub Item Already Exist",
          result: null
        };
        res.send(obj);
      } else {
        let result = await Evolve.App.Services.Evolve.EvolveServices.addSubItemList(
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
            message: "Sub Item Created Successfully",
            result: null
          };
          res.send(obj);
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0527: Error while adding Sub Item list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0527: Error while adding Sub Item list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  selectSingleSubItem: async function (req, res) {
    try {
      let processData = await Evolve.App.Services.Evolve.EvolveServices.selectSingleSubItem(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Sub Item Single List",
        result: processData.recordset
      };

      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0528: Error while selecting Single Sub item "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0528: Error while selecting Single Sub item "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  updateSubItem: async function (req, res) {
    try {
      let checkSubItem = await Evolve.App.Services.Evolve.EvolveServices.checkSubItemEdit(
        req.body
      );
      if (checkSubItem.recordset[0].count > 0) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Sub Item Already Exist",
          result: null
        };
        res.send(obj);
      } else {
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        let result = await Evolve.App.Services.Evolve.EvolveServices.updateSubItem(
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
            message: "Sub Item Updated Successfully",
            result: null
          };
          res.send(obj);
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0529: Error while updating Sub Item "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0529: Error while updating Sub Item "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  // Do LIst For York Made by Ravat
  getSoNumberList: async function (req, res) {
    try {
      let itemNumberList = await Evolve.App.Services.Evolve.EvolveServices.getSoNumberList();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Item Number List",
        result: itemNumberList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0530: Error while getting So Number List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0530: Error while getting So Number List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getSalesOrderDetails: async function (req, res) {
    try {
      let getDate = await Evolve.App.Services.Evolve.EvolveServices.getSalesOrderDetails(
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
      Evolve.Log.error(" EERR0531: Error while getting Sales order details "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0531: Error while getting Sales order details "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getDoDetails: async function (req, res) {
    try {
      let getDoDetails = await Evolve.App.Services.Evolve.EvolveServices.getDoDetails(
        req.body
      );
      if (getDoDetails instanceof Error || getDoDetails.rowsAffected < 1) {
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
          result: getDoDetails.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0532: Error while getting Do details "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0532: Error while getting Do details "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  addDoList: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let getSoNumber = await Evolve.App.Services.Evolve.EvolveServices.getSoNumberById(
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
      } else {
        let soNumber = getSoNumber.recordset[0].EvolveSalesOrder_Number;
        let addDoList = await Evolve.App.Services.Evolve.EvolveServices.addDoList(
          req.body,
          soNumber
        );
        if (addDoList instanceof Error || addDoList.rowsAffected < 1) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error on Query",
            addDoList: null
          };
          res.send(obj);
        } else {
          let doLineError = false;
          let array = req.body.doLineArrayData;
          for (let i = 0; i < array.length; i++) {
            if (doLineError == false) {
              let indexData = {
                EvolveDO_ID: addDoList.recordset[0].inserted_id,
                EvolveDOLine_Number: i + 1,
                EvolveDOLine_Part: array[i].EvolveSalesOrderLine_Part,
                EvolveDOLine_Custpart: array[i].EvolveSalesOrderLine_Custpart,
                EvolveDOLine_QtyInv: array[i].EvolveSalesOrderLine_InvQty,
                EvolveDOLine_QtyDO: array[i].newDoQty,
                EvolveSalesOrderLine_ID: array[i].EvolveSalesOrderLine_ID
              };

              let addDolineData = await Evolve.App.Services.Evolve.EvolveServices.addDoLineData(
                indexData
              );
              let updateSaesOrder = await Evolve.App.Services.Evolve.EvolveServices.updateSaesOrder(
                indexData.EvolveSalesOrderLine_ID,
                parseInt(indexData.EvolveDOLine_QtyDO)
              );
              if (
                addDolineData instanceof Error ||
                addDolineData.rowsAffected < 1
              ) {
                doLineError = true;
              }
              if (
                updateSaesOrder instanceof Error ||
                updateSaesOrder.rowsAffected < 1
              ) {
                doLineError = true;
              }
            }
          }
          if (doLineError == false) {
            let obj = {
              statusCode: 200,
              status: "success",
              message: "Do Line Added Successfully !"
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
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0533: Error while adding Do List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0533: Error while adding Do List "+error.message,
        result: null
      };
      res.send(obj);
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

    for (let i = 0; i < files.length; i++) {
      // console.log("File no " + i + " " + files[i]);
    }
  },

  changePassword: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let getLastPassword = await Evolve.App.Services.Evolve.EvolveServices.getLastPassword(
        req.body
      );
      if (
        getLastPassword instanceof Error ||
        getLastPassword.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "No User Found",
          result: null
        };
        res.send(obj);
      } else {
        if (Evolve.Bcrypt.compareSync(req.body.oldPassword, getLastPassword.recordset[0].EvolveUser_password)) {
          let lastPassword = getLastPassword.recordset[0].EvolveUser_OldPassword;
          let lastPasswordArray = lastPassword.split(",");
          let newPassword = Evolve.Bcrypt.hashSync(req.body.newPassword, 10);
          let passwordMatch = false;
          for (let i = 0; i < lastPasswordArray.length; i++) {
            if (
              Evolve.Bcrypt.compareSync(
                req.body.newPassword,
                lastPasswordArray[i]
              )
            ) {
              passwordMatch = true;
            }
          }
          if (passwordMatch == true) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "New Password Does not equal to last three password !",
              result: null
            };
            res.send(obj);
          } else {
            let newPasswordArray = lastPasswordArray;
            newPasswordArray.splice(0, 1);
            newPasswordArray.push(newPassword);
            req.body.newPasswordArray = newPasswordArray.toString();
            req.body.newPassword = newPassword;
            let updateLastPassword = await Evolve.App.Services.Evolve.EvolveServices.updateUserPassword(
              req.body
            );
            if (
              updateLastPassword instanceof Error ||
              updateLastPassword.rowsAffected < 1
            ) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error While Update Barcode",
                result: null
              };
              res.send(obj);
            } else {
              let obj = {
                statusCode: 200,
                status: "success",
                message: "Password Changed Successfully! Please Login Again",
                result: null
              };
              res.send(obj);
            }
          }
        } else {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Old password does not match.",
            result: null
          };
          res.send(obj);
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0534: Error while changing the password "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0534: Error while changing the password "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  // selectprocessvalidations: async function (req, res) {
  //   try {
  //     console.log("process data ", req.body);
  //     let processData = await Evolve.App.Services.Evolve.EvolveServices.selectprocessvalidations(
  //       req.body
  //     );
  //     let obj = {
  //       statusCode: 200,
  //       status: "success",
  //       message: "Process teplate Single List",
  //       result: processData.recordset
  //     };

  //     res.send(obj);
  //   } catch (error) {
  //     Evolve.Log.error(error.message);
  //     let obj = {
  //       statusCode: 400,
  //       status: "fail",
  //       message: error.message,
  //       result: null
  //     };
  //     res.send(obj);
  //   }
  // }

  getActiveDirectorySecurity: async function (req, res) {
    try {
      let directorySettings = {
        'isDirectoryActive': Evolve.Config.activedirectory,
        'activeDirectoryUrl': Evolve.Config.url,
        'activeDirectorybaseDn': Evolve.Config.baseDN,
        'activeDirectoryUserName': Evolve.Config.username,
        'activeDirectoryPassword': Evolve.Config.password,
      }
      let obj = { statusCode: 200, status: "success", message: "Active Directory Setting", result: directorySettings };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0535: Error while get active directory security " +error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0535: Error while get active directory security " +error.message, result: null };
      res.send(obj);
    }
  },

  updateActiveDirectorySecurity: async function (req, res) {
    try {
      let updateActiveDirectorySecurity = await Evolve.App.Services.Evolve.EvolveServices.updateActiveDirectorySecurity(req.body);
      if (updateActiveDirectorySecurity instanceof Error || updateActiveDirectorySecurity.rowsAffected < 1) {
        console.log(updateActiveDirectorySecurity)
        // Evolve.Log.error(updateActiveDirectorySecurity)
        let obj = { statusCode: 400, status: "fail", message: "Error while update active directory security ", result: null };
        res.send(obj);
      }
      else {
        let obj = { statusCode: 200, status: "success", message: "Active directory saved", result: null };
        // Evolve.Config.activedirectory = req.body.activedirectory;
        // Evolve.Config.url = req.body.url;
        // Evolve.Config.baseDN = req.body.baseDN;
        // Evolve.Config.username = req.body.username;
        // Evolve.Config.password = req.body.password;

        Evolve.App.Controllers.Common.ConCommon.updateEvolveConfig(); // Update Evolve Config Variable

        res.send(obj);

      }
    } catch (error) {
      Evolve.Log.error(" EERR0536: Error while updating active directory security "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0536: Error while updating active directory security "+error.message, result: null };
      res.send(obj);
    }
  },
  printJobYfai: async function (req, res) {
    try {

      setInterval(function () {

        var label_variable = { quantity: '1', copy: '1' };
        // console.log("/***********Print JOB***********/")
        // console.log("Evolve.PrintJob ::", Evolve.PrintJob);
        // console.log("Printing ::", Evolve.Print.Printing)
        if (Evolve.Print.Printing == false && Evolve.PrintJob.length > 0) {
          if (Evolve.Print.OpenPort({
            // ipaddress: Evolve.ConfigData.App.printer.ipaddress,
            // port: Evolve.ConfigData.App.printer.port,
            // delay: Evolve.ConfigData.App.printer.delay,
          }, true)) {
            console.log("Printer is Connected.");
            Evolve.Print.Printing = true;
            console.log("Start.....................................")
            for (let i = Evolve.PrintJob.length - 1; i >= 0; i--) {
              console.log("pj :::>>", Evolve.PrintJob[i].barcode)
              //Evolve.Print.SendCommand('QRCODE 10,10,H,4,M,M1,0,\"Evolve Server\"',true);
              Evolve.Print.ClearBuffer('', true);
              // let msg = 'TEXT 25,120,\"0\",0,12,12,\"EVOLVE TEST PRINT '+Evolve.PrintJob[i].barcode+'\"';
              // Evolve.Print.SendCommand(msg,true);

              let dt = new Date();
              let data = dt.getDate() + '-' + (dt.getMonth() + 1) + '-' + dt.getFullYear();
              let time = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();

              console.log("data ::", data)
              console.log("time ::", time)

              Evolve.Print.SendCommand('SIZE 100mm,100mm');
              Evolve.Print.SendCommand('GAP 3mm,0');
              Evolve.Print.SendCommand('DIRECTION 1');
              Evolve.Print.SendCommand('SPEED 5');
              Evolve.Print.SendCommand('DENSITY 15');
              Evolve.Print.SendCommand('CLS');


              // Evolve.Print.SendCommand('TEXT 25,10,\"0\",0,12,12,\"'+Evolve.PrintJob[i].itemCode+'\"',true);
              // Evolve.Print.SendCommand('BLOCK 20,45,450,100,\"0\",0,7,7,3,\"'+Evolve.PrintJob[i].itemDesc+'\"');
              // Evolve.Print.SendCommand('TEXT 20,95,\"0\",0,7,7,\"LOT NO:'+Evolve.PrintJob[i].lotNumber+'\"',true);
              // Evolve.Print.SendCommand('TEXT 20,120,\"0\",0,7,7,\"QTY: '+Evolve.PrintJob[i].recvQty+' \"',true);
              // Evolve.Print.SendCommand('TEXT 20,145,\"0\",0,7,7,\"DATE:'+data+' \"',true);
              // Evolve.Print.SendCommand('TEXT 250,145,\"0\",0,7,7,\"TIME:'+time+' \"',true);  
              // Evolve.Print.SendCommand('BARCODE 50,170,\"128\",40,2,0,2,2,\"'+Evolve.PrintJob[i].barcode+'\"',true);
              // Evolve.Print.PrintLabel(label_variable, true);


              Evolve.Print.SendCommand('TEXT 25,50,\"0\",0,30,30,\"' + Evolve.PrintJob[i].itemCode + '\"', true);
              Evolve.Print.SendCommand('BLOCK 25,150,750,800,\"0\",0,15,15,3,\"' + Evolve.PrintJob[i].itemDesc + '\"');
              Evolve.Print.SendCommand('TEXT 25,350,\"0\",0,20,20,\"LOT/SR NO: ' + Evolve.PrintJob[i].lotNumber + '\"', true);
              Evolve.Print.SendCommand('TEXT 25,450,\"0\",0,20,20,\"QTY: ' + Evolve.PrintJob[i].recvQty + ' \"', true);
              Evolve.Print.SendCommand('TEXT 25,530,\"0\",0,15,15,\"DATE: ' + data + ' \"', true);
              Evolve.Print.SendCommand('TEXT 450,530,\"0\",0,15,15,\"TIME: ' + time + ' \"', true);
              Evolve.Print.SendCommand('BARCODE 50,600,\"128\",150,2,0,3,3,\"' + Evolve.PrintJob[i].barcode + '\"', true);
              Evolve.Print.PrintLabel(label_variable, true);






              Evolve.PrintJob.splice(i, 1);
            }
            Evolve.Print.ClosePort(2000, true);
            console.log("End.....................................")
            Evolve.Print.Printing = false;
          } else {
            console.log("Printer Not Connected!!!!!!!");
          }
        }

      }, Evolve.ConfigData.App.printer.printJobInterval)


    } catch (error) {
      Evolve.Log.error(error.message);
    }
  },

  async getIOServerInfo (req, res) {
    try {
      const IOServerInfo = await Evolve.App.Services.Evolve.EvolveServices.getIOServerInfo();
      const result = IOServerInfo.recordset;

      res.send({
        statusCode: 200,
        status: "success",
        message: "IO Server Information",
        result
      })
    }
    catch (error) {
      res.send({
        statusCode: 500,
        status: "fail",
        message: "Error while getting IO Server info "+error.message,
        result: null
      });
    }
  },

};
