const express = require("express");

const { get, getById, update, remove } = require("./postDb");
const { validatePost } = require("../users/userRouter.js");

const router = express.Router();

router.get("/", async (req, res) => {
  // do your magic!
  return res.status(200).json(await get());
});

router.get("/:id", validatePostId, async (req, res) => {
  // do your magic!
  return res.status(200).json(await getById(req.params.id));
});

router.delete("/:id", validatePostId, async (req, res) => {
  // do your magic!
  await remove(req.params.id);
  return res.status(202).json({ message: "Post deleted" });
});

router.put("/:id", validatePostId, validatePost, async (req, res) => {
  // do your magic!
  await update(req.params.id, req.body);
  return res.status(202).json({
    message: "Updated post",
  });
});

// custom middleware

async function validatePostId(req, res, next) {
  // do your magic!
  const foundPost = await getById(req.params.id);
  if (!foundPost) {
    return res.status(400).json({
      message: "Invalid post id",
    });
  }
  next();
}

module.exports = router;
