const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/send-email', async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    
    let transporter = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: '<useremail>', // mail wont reveal due to secuirty reasons, will be send upon request
        pass: 'ayqu wfih ohza sssd' // google app password
      }
    });

   
    let message = {
      from: '<useremail>', 
      to: to, 
      subject: subject, 
      text: text, 
      html: html
    };

    
    let info = await transporter.sendMail(message);

    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error) {
    console.error('Error occurred while sending email:', error.message);
    res.status(500).json({ error: 'Failed to send email', message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
