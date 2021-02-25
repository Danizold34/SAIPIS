const { Schema, model } = require("mongoose");

const worker = new Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    idn: {
        type: String,
        required: true,
    },
});
module.exports = model("Worker", worker);
