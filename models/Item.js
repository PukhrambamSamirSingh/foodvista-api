const mongoose = require("mongoose")
const { Schema } = mongoose

const ItemSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    images: {
        type: [String],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    flavours: {
        type: [String]
    },
    discount: {
        type: Number
    },
    available: {
        type: Number
    },
    options: [{
        key: String,
        value: Number
    }],
    totalStars: {
        type: Number,
        default: 0
    },
    starNumber: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model("Item", ItemSchema)