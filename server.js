const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔹 Replace with your OneSignal keys
const ONESIGNAL_APP_ID = "76443416-6742-4c31-b806-916bc5e5085f";
const REST_API_KEY = "bqypjazgguc5mrynvpjwdawa4";

// ✅ Send notification to all users
app.post("/send-notification", async (req, res) => {
  const { title, message } = req.body;

  try {
    const response = await axios.post(
      "https://onesignal.com/api/v1/notifications",
      {
        app_id: ONESIGNAL_APP_ID,
        included_segments: ["All"], // Sends to ALL subscribers
        headings: { en: title },
        contents: { en: message },
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Basic ${REST_API_KEY}`,
        },
      }
    );

    res.json({ success: true, data: response.data });
  } catch (err) {
    console.error("Error sending notification:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Run server
app.listen(3000, () => {
  console.log("🚀 Backend running on http://localhost:3000");
});
