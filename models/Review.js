const mongoose = require("mongoose")
const { Schema } = mongoose

const ReviewSchema = new Schema({
    itemId: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    desc: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    }
}, { timestamps: true })

module.exports = mongoose.model("Review", ReviewSchema)
