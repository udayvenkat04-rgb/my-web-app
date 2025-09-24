const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // ✅ Allow frontend to call backend

// 🔹 Replace these with your OneSignal keys
const ONESIGNAL_APP_ID = "76443416-6742-4c31-b806-916bc5e5085f";
const REST_API_KEY = "bqypjazgguc5mrynvpjwdawa4";

// ✅ Endpoint to send push notification to ALL users
app.post("/send-notification", async (req, res) => {
  const { title, message } = req.body;

  try {
    const response = await axios.post(
      "https://onesignal.com/api/v1/notifications",
      {
        app_id: ONESIGNAL_APP_ID,
        included_segments: ["All"], // Send to ALL subscribed users
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

// ✅ Start server
app.listen(3000, () => {
  console.log("🚀 Backend running at http://localhost:3000");
});
