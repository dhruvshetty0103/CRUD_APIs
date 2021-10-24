var nodemailer = require('nodemailer');

class nodeMailer{
  mailer = (email,token) =>{
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sender mail',
        pass: 'not to mention'
      }
    });
    
    var mailOptions = {
      from: 'sender mail',
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