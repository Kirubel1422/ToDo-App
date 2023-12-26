const express = require("express");
const router = express.Router();
const {
  getHandler,
  postHandler,
  putHandler,
  deleteHandler,
} = require("../controllers/index.js");

router.get("/", getHandler);
router.post("/", postHandler);
router.put("/:id", putHandler);
router.delete("/:id", deleteHandler);

module.exports = router;
