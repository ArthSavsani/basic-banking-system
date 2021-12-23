const mongoose = require("mongoose");
const CustomerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true,
    },
});
const Customer = new mongoose.model("Customer", CustomerSchema);
module.exports = Customer;