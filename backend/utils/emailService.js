const nodemailer = require('nodemailer');

// Send order confirmation email
const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword',
      },
    });

    const mailOptions = {
      from: 'youremail@gmail.com',
      to: email,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };
