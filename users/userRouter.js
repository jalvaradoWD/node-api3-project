const express = require("express");

const {
  get,
  getById,
  getUserPosts,
  insert: userInsert,
  update,
  remove,
} = require("./userDb.js");

const { insert: postInsert } = require("../posts/postDb.js");

const router = express.Router();

router.post("/", validateUser, async (req, res) => {
  // do your magic!
  try {
    const createdUser = await userInsert(req.body);

    return res.json({
      createdUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error,
    });
  }
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  // do your magic!
  try {
    const { id: user_id } = req.params;
    const { text } = req.body;
    const createdPost = await postInsert({ text, user_id });

    return res.status(201).json(createdPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errorMessage: error,
    });
  }
});

router.get("/", async (req, res) => {
  // do your magic!
  res.json(await get());
});

router.get("/:id", validateUserId, async (req, res) => {
  // do your magic!
  res.json(await getById(req.params.id));
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  // do your magic!
  return res.status(200).json(await getUserPosts(req.params.id));
});

router.delete("/:id", validateUserId, async (req, res) => {
  // do your magic!
  await remove(req.params.id);
  return res.status(202).json({ message: "User deleted" });
});

router.put("/:id", validateUserId, validateUser, async (req, res) => {
  // do your magic!
  await update(req.params.id, req.body);
  return res.status(202).json({
    message: "User updated",
  });
});

//custom middleware

async function validateUserId(req, res, next) {
  // do your magic!
  try {
    const result = await getById(req.params.id);

    if (!result) {
      return res.status(400).json({
        message: "Invalid user id",
      });
    }

    req.user = result;
    next();
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    return res.status(400).json({ message: "Missing user data." });
  } else if (!req.body.name) {
    return res.status(400).json({ messge: "Missing required name field." });
  }
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    return res.status(400).json({
      message: "Missing post data.",
    });
  } else if (!req.body.text) {
    return res.status(400).json({
      message: "Missing required text field.",
    });
  }
  next();
}

module.exports = { router, validatePost };
