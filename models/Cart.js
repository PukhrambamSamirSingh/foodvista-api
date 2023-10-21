const mongoose = require("mongoose")
const { Schema } = mongoose

const CartSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    itemId: {
        type: Schema.Types.ObjectId,
        ref: "Item"
    },
    option: {
        key: String,
        value: Number
    },
    flavour: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
}, { timestamps: true })

module.exports = mongoose.model("Cart", CartSchema)