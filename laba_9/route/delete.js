const router = require("express")
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = router()
const Worker = require("../models/worker")

app.post("/remove", urlencodedParser, async (req, res) => {
    // let workerOld = await Worker.find({ position: req.body.positionOld }).then((worker) => {
    //     const context = {
    //         workerList: worker.map((worker) => {
    //             return {
    //                 name: worker.name,
    //                 position: worker.position,
    //                 salary: worker.salary,
    //                 idn: worker.idn,
    //             }
    //         }),
    //     }

    // })

    await Worker.remove({ position: req.body.positionOld })


})

module.exports = app