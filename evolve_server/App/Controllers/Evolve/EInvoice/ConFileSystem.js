'use strict';
const Evolve = require("../../../../Boot/Evolve");
// const  Evolve.FsTree = require("directory-tree");
// const path = require("path");

module.exports = {

    getDirectoryTree: async function (req, res) {
        try {
            let Originalpath = '../' + Evolve.EvolveEinvoiceConfig.EINVIOFOLDERNAME + '/EINV/';
            let tree = Evolve.FsTree(Originalpath, { attributes: ['mode', 'mtime'] });
            Originalpath = Originalpath.slice(0, -1);
            let baseUrl = Evolve.EvolveEinvoiceConfig.EINVBASEURL;
            let currentList = tree.children;
            currentList.sort((a, b) => {
                return new Date(b.mtime) - new Date(a.mtime);
            });
            tree.children = currentList

            let dtails = {
                path: Originalpath,
                tree: tree,
                baseUrl: baseUrl

            }
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Directory tree gotted successfully",
                result: dtails
            };
            res.send(obj);

        } catch (error) {
            Evolve.Log.error("EERR32719 : error while get directory tree " + error.message);

            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR32719 : error while get directory tree " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getDirectoryTreeByPath: async function (req, res) {
        try {

            let tree = Evolve.FsTree(req.body.path, { attributes: ['mode', 'mtime'] })
            if (req.body.search != "" && req.body.search != undefined) {
                let fileList = tree.children;
                let finalList = [];

                for (let i = 0; i < fileList.length; i++) {
                    if ((fileList[i].name.toLowerCase()).includes((req.body.search).toLowerCase())) {
                        finalList.push(fileList[i])
                    }
                }
                tree.children = finalList;
            }

            let currentList = tree.children;
            currentList.sort((a, b) => {
                return new Date(b.mtime) - new Date(a.mtime);
            });
            tree.children = currentList

            let obj = {
                statusCode: 200,
                status: "success",
                message: "Directory tree gotted successfully",
                result: tree
            };
            res.send(obj);

        } catch (error) {
            Evolve.Log.error("EERR32720 : error while get directory tree " + error.message);

            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR32720 : error while get directory tree " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    deleteResource: async function (req, res) {
        try {
            if (req.body.type == 'directory') {
                let error = false;

                await Evolve.Fs.rmdirSync(req.body.path, { recursive: true })
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Directory deleted successfully",
                    result: null
                };
                res.send(obj);
            } else {
                await Evolve.Fs.unlinkSync(req.body.path)

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "File deleted successfully",
                    result: null
                };
                res.send(obj);

            }

        } catch (error) {
            Evolve.Log.error("EERR32721 : error while delete resource" + error.message);

            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR32721 : error while delete resource " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    renameSource: async function (req, res) {
        try {
            let renameSource = Evolve.App.Controllers.Evolve.EInvoice.ConFileSystem.copyRecursiveSync(req.body.pathFrom, req.body.pathTo)
            if (renameSource == 1) {
                await Evolve.Fs.rmdirSync(req.body.pathFrom, { recursive: true })
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Resource  renamed successfully",
                    result: null
                };
                res.send(obj);
            } else {
                Evolve.Log.error("EERR32722 : Error while rename resource");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR32722 : Error while rename resource",
                    result: null
                };
                res.send(obj);

            }

        } catch (error) {
            Evolve.Log.error("EERR32723 : error while rename source" + error.message);

            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR32723 : error while rename source " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    moveSource: async function (req, res) {
        try {
            if (req.body.operationType == 'copy') {
                if (req.body.moveFromPath == req.body.moveToPath) {
                    req.body.moveToPath += '-copy'
                }
                let copySource = Evolve.App.Controllers.Evolve.EInvoice.ConFileSystem.copyRecursiveSync(req.body.moveFromPath, req.body.moveToPath)
                if (copySource == 1) {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Resource  copied successfully",
                        result: null
                    };
                    res.send(obj);
                } else {

                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error while copy resource",
                        result: null
                    };
                    res.send(obj);

                }
            } else {
                let success = false;
                if (req.body.moveFromPath == req.body.moveToPath) {
                    success = true
                }
                if (success == false) {
                    let moveSource = Evolve.App.Controllers.Evolve.EInvoice.ConFileSystem.copyRecursiveSync(req.body.moveFromPath, req.body.moveToPath)
                    if (moveSource == 1) {
                        await Evolve.Fs.rmdirSync(req.body.moveFromPath, { recursive: true })
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Resource  moved successfully",
                            result: null
                        };
                        res.send(obj);
                    } else {
                        Evolve.Log.error("EERR32724 : Error while copy resource");
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "EERR32724 : Error while copy resource",
                            result: null
                        };
                        res.send(obj);

                    }
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Resource  moved successfully",
                        result: null
                    };
                    res.send(obj);

                }

            }

        } catch (error) {
            Evolve.Log.error("EERR32726 : error while move or copy resource" + error.message);

            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR32726 : error while move or copy resource " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    copyRecursiveSync(src, dest) {
        var exists = Evolve.Fs.existsSync(src);
        var stats = exists && Evolve.Fs.statSync(src);
        var isDirectory = exists && stats.isDirectory();
        if (isDirectory) {
            Evolve.Fs.mkdirSync(dest);
            Evolve.Fs.readdirSync(src).forEach(function (childItemName) {
                Evolve.App.Controllers.Evolve.EInvoice.ConFileSystem.copyRecursiveSync(Evolve.path.join(src, childItemName),
                    Evolve.path.join(dest, childItemName));
            });
        } else {
            Evolve.Fs.copyFileSync(src, dest);
        }
        return 1


    },
    createResourse: async function (req, res) {
        try {
            if (req.body.sourseType == 'file') {
                // Evolve.Fs.writeFile(req.body.path , '')
                Evolve.Fs.writeFile(req.body.path, '', function (err) { })
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "file created successfully",
                    result: null
                };
                res.send(obj);

            } else {
                Evolve.Fs.mkdirSync(req.body.path)
                // if(error = false){
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "folder created successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32727 : error while get directory tree " + error.message);

            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR32727 : error while get directory tree " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    onUploadFile: async function (req, res) {
        try {

            if (req.files.fileData) {
                let fileData = req.files.fileData;

                fileData.mv(req.body.pathToUpload, async function (error) {
                    if (error) {
                        Evolve.Log.error(" EERR32728 : Error while upload file  " + error.message);
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        // Evolve.Log.error(" EERR32465 :  "+error.message);
                        let obj = { statusCode: 200, status: "Success", message: 'File upoaded successfully', result: null };
                        res.send(obj);
                    }
                });


            }
        } catch (error) {
            Evolve.Log.error(" EERR32729: Error while upload file  " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR32729: Error while upload file  " + error.message, result: null };
            res.send(obj);
        }
    },


}