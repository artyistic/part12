const express = require("express");
const router = express.Router();
const redis = require("../redis")

const configs = require("../util/config");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

const counterRouter = express.Router();

counterRouter.get("/", async (_req, res) => {
  const ret = parseInt(await redis.getAsync("added_todo") ?? 0);
  res.send({
    added_todo: ret,
  });
});

router.use("/statistics", counterRouter);
module.exports = router;
