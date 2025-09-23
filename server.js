// server.js
// Simple Node.js backend to send OneSignal push notifications

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Replace with your OneSignal App ID and REST API Key
const ONESIGNAL_APP_ID = '76443416-6742-4c31-b806-916bc5e5085f';
const ONESIGNAL_REST_API_KEY = 'bqypjazgguc5mrynvpjwdawa4';

app.use(bodyParser.json());

app.post('/send-notification', async (req, res) => {
  try {
    const { title, message, url } = req.body;
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + ONESIGNAL_REST_API_KEY
      },
      body: JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        included_segments: ['All'],
        headings: { en: title || 'Sample Notification' },
        contents: { en: message || 'This is a demo notification for all users!' },
        url: url || 'https://yourdomain.com'
      })
    });
    const data = await response.json();
    if (data.errors) {
      return res.status(400).json({ success: false, errors: data.errors });
    }
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
