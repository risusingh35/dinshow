'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getDirectoryTree: async function (req, res) {
        try {
            let Originalpath;
            if (req.body.selectedServer == "evolveServer") {
                Originalpath = '../' + 'evolve_server' + '/Log/';
            } else {
                Originalpath = '../' + Evolve.EvolveEinvoiceConfig.EINVIOFOLDERNAME + '/Log/';

            }

            let tree = Evolve.FsTree(Originalpath, { attributes: ['mode', 'mtime'] });
            Originalpath = Originalpath.slice(0, -1);
            let baseUrl = Evolve.Config.IOSERVERURL;
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
            Evolve.Log.error(" EERR32741: error while get directory tree  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR32741 : error while get directory tree " + error.message,
                result: tree
            };
            res.send(obj);
        }
    },
    deleteResource: async function (req, res) {
        try {
            if (req.body.type == 'directory') {
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
            Evolve.Log.error(" EERR32742 : Error while delete resource " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR32742 : Error while delete resource " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
}