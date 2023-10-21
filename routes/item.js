const express = require("express")
const {
    createItem, getItems, getItem, getDisItems, deleteItem
} = require("../controllers/item")
const verifyToken = require("../middleware/verifyToken")
const router = express.Router()

router.post("/create", verifyToken, createItem)
router.get("/get", getItems)
router.get("/getdis", getDisItems)
router.get("/get/:title", getItem)
router.delete("/delete/:id", verifyToken, deleteItem)

module.exports = router