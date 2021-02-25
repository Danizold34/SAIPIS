const router = require("express")
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = router()
const Worker = require("../models/worker")

app.post("/show", urlencodedParser, (req, res) => {
    const worker = Worker.find({}).then((worker) => {
        const context = {
            workerList: worker.map((worker) => {
                return {
                    name: worker.name,
                    position: worker.position,
                    salary: worker.salary,
                    idn: worker.idn,
                }
            }),
        }
        res.render("show", {
            title: "Лаба 9",
            worker: context.workerList,
        })
    })
})

module.exports = app