const Item = require("../models/Item");
const Review = require("../models/Review");
const User = require("../models/User");

const createReview = async (req, res) => {
    if (req.isAdmin) {
        return res.status(400).send("Sellers can't create a review");
    }

    const { itemId, desc, ratings } = req.body;
    if (!ratings || !Number.isInteger(ratings) || ratings < 1 || ratings > 5) {
        return res.status(400).json({ error: "Invalid ratings. Ratings should be a whole number between 1 and 5." });
    }

    const newReview = new Review({
        userId: req.userId,
        itemId: itemId,
        desc: desc,
        ratings: ratings
    });

    try {
        const savedReview = await newReview.save()
        await Item.findByIdAndUpdate(itemId, { $inc: { totalStars: ratings, starNumber: 1 } })
        res.status(200).json(savedReview)
    } catch (error) {
        res.status(500).json({ error: "Error in creating review" })
    }
}

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ itemId: req.params.itemId }).populate("userId", "-password -email")
        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json({ error: "Error in getting reviews" });
    }
}

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById({ _id: req.params.id })
        const user = await User.findById(req.userId)

        if (!review) {
            return res.status(401).json("Review not found")
        }
        if (review.userId.toString() !== user._id.toString()) {
            return res.status(401).json("You can only delete your review")
        }
        await Review.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ message: "Review deleted successfully" })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = {
    createReview,
    getReviews,
    deleteReview
}
