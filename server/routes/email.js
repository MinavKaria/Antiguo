import nodemailer from 'nodemailer';
import express from 'express';

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'minav.karia@somaiya.edu', 
      pass: 'seqc hryr jduv bghu', 
    },
  });
  

  const sendMail = (to, subject, text) => {
    const mailOptions = {
      from: 'Antiguo', 
      to,                          
      subject,                      
      text,                         
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(`Error: ${error}`);
      }
      console.log('Email sent: ' + info.response);
    });
  };

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;
    console.log(req.body);
    sendMail(to, subject, text);
    res.json({ message: 'Email sent' });
});
   
export default router;