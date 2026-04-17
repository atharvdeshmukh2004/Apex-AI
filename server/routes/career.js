import express from "express";
import axios from "axios";

const careerRouter = express.Router();

careerRouter.post("/predict", async (req, res) => {
  try {
    const studentData = req.body;

    // Call Python ML API
    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      studentData,
    );

    res.json(response.data);
  } catch (error) {
    console.error("ML Error:", error);
    res.status(500).json({ message: "Prediction failed" });
  }
});

export default careerRouter;
