const express = require("express");
const { createRecord, getRecords, updateRecord, deleteRecord } = require("./record.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/", upload.single("archivo"), createRecord); // Manejar un solo archivo
router.put("/:id", upload.single("archivo"), updateRecord);
router.get("/", getRecords);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);

module.exports = router;




