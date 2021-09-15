const router = require("express").Router();
const auth = require("../middlewares/auth");

router.get("/", auth, (req, res) => {
  res.render("profile", { user: req.user });
});

module.exports = router;
