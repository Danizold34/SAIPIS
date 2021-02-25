const router = require("express")
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const app = router()
const Worker = require("../models/worker")

app.get("/", (req, res) => {
    res.render("form", {
        title: 'Лаба 9',
    })
})


app.post("/", urlencodedParser, async (req, res) => {
    const worker = new Worker({
        name: req.body.name,
        position: req.body.position,
        salary: req.body.salary,
        idn: req.body.idn
    })
    console.log(worker)
    await worker.save()
})

module.exports = app