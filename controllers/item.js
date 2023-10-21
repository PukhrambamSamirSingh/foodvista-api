const Item = require("../models/Item")
const Review = require("../models/Review")
const User = require("../models/User")

const createItem = async (req, res) => {
    if (!req.isAdmin) {
        return res.status(401).json("Only sellers can sell it")
    }
    try {
        const newItem = await Item.create({
            userId: req.userId,
            ...req.body
        })
        res.status(200).json(newItem)
    } catch (error) {
        res.status(500).json({ error: "Error in creating item" })
    }
}

const getItems = async (req, res) => {
    const { category } = req.query

    try {
        let items
        if (category) {
            items = await Item.find({ category: category }).populate("userId", "-password -email")
        } else {
            items = await Item.find()
        }
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({ error: "Error in getting items" })
    }
}

const getDisItems = async (req, res) => {
    try {
        const items = await Item.find({ discount: { $gte: 5 } })
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({ error: "Error in getting items" })
    }
}

const getItem = async (req, res) => {
    try {
        const item = await Item.findOne({ title: req.params.title }).populate("userId", "-password -email")
        if (!item) {
            return res.status(401).json("Item not found")
        }
        res.status(200).json(item)
    } catch (error) {
        res.status(500).json({ error: "Error in getting item" })
    }
}

const deleteItem = async (req, res) => {
    const item = await Item.findById(req.params.id);
    const user = await User.findById(req.userId);
    try {
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        if (item.userId.toString() !== user._id.toString()) {
            return res.status(403).json({ error: "Only the seller can delete this item" });
        }
        await Review.deleteMany({ itemId: item._id });
        await Item.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error in deleting item", details: error.message });
    }
}

module.exports = {
    createItem,
    getItems,
    getDisItems,
    getItem,
    deleteItem
}