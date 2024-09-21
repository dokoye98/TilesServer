const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()
const dotenv = require('dotenv')

dotenv.config()
router.use(express.json())

router.post('/api/send-email', (req, res) => {
  console.log('Request received at /api/send-email') // Log to check if the endpoint is hit
  const { name, email, subject, message } = req.body

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const mailOptions = {
    from: `${name} <${email}>`,
    to: process.env.EMAIL_USER,
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error)
      res.status(500).send('Error sending email')
    } else {
      console.log('Email sent:', info.response)
      res.status(200).send('Email sent ')
    }
  })
})

module.exports = router 
