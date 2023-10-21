const express = require("express")
const verifyToken = require("../middleware/verifyToken")
const { setImage, setAdmin, updatePassword, getUser, setDesc } = require("../controllers/user")
const router = express.Router()

router.get("/get", verifyToken, getUser)
router.put("/setimage", verifyToken, setImage)
router.put("/setadmin", verifyToken, setAdmin)
router.put("/setdesc", verifyToken, setDesc)
router.put("/updatepassword", updatePassword)

module.exports = router