const router = require("express")
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = router()
const Worker = require("../models/worker")


app.post("/filtration", urlencodedParser, async (req, res) => {
    let worker = await Worker.find({}).then((worker) => {
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
        const filtr = context.workerList.filter(function (el) {
            return el.salary <= req.body.salary
        })
        res.send(filtr)
    })
})

module.exports = app