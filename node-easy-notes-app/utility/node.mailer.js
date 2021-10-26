var nodemailer = require('nodemailer');

class nodeMailer{
  mailer = (email,token) =>{
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sender@email.com',
        pass: 'senderPassword'
      }
    });
    
    var mailOptions = {
      from: 'sender@email.com',
      to: email,
      subject: 'Sending Email using Node.js',
      html: `<a>${token}</a>`,
      text: "password reset"
    };
    
    return transporter
      .sendMail(mailOptions)
      .then((data) => {
        return "Email sent successfully!!";
      })
      .catch((err) => {
        return err;
      });

  }
}


module.exports = new nodeMailer();