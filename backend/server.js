import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { sendFormSubmissionEmail } from "./emailService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve React frontend
app.use(express.static(path.join(__dirname, "dist")));

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.post("/api/submit-form", async (req, res) => {
  try {
    const formData = req.body;

    if (!formData.fullName || !formData.email || !formData.phone) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

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

// ✅ React routing fallback (VERY IMPORTANT)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
