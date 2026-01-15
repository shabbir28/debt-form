import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sendFormSubmissionEmail } from "./emailService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Form submission endpoint
app.post("/api/submit-form", async (req, res) => {
  try {
    const formData = req.body;

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Send email
    await sendFormSubmissionEmail(formData);

    res.json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process form submission",
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
