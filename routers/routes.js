const router = require("express").Router();
const { storeDataInS3 } = require("../requests");

router.post("/storedata", storeDataInS3);

module.exports = router;
