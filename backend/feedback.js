const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/send-feedback', async (req, res) => {
  const { feedback } = req.body;

  try {
    await transporter.sendMail({
      from: 'Your feedback with TodoList-app',
      to: process.env.EMAIL_USER,
      subject: 'New Feedback',
      text: feedback,
    });

    res.status(200).json({ message: 'Feedback sent successfully' });
  } catch (error) {
    console.error('Error sending email', error);
    res.status(500).json({ message: 'Failed to send feedback' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
