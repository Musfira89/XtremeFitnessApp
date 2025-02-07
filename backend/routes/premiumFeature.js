import express from "express";

const router = express.Router();

// Gold and above users can access this
router.get("/gold-feature", (req, res) => {
  res.json({ message: "You have access to this premium feature!" });
});

// Platinum users can access this
router.get("/platinum-feature", (req, res) => {
  res.json({ message: "You have access to this exclusive feature!" });
});

export default router;
