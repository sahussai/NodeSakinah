const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


var Tests = mongoose.model("Test", testSchema);

module.exports = Tests;