const nodemailer = require('nodemailer');
const pug = require('pug');

class EmailTransporter {
  constructor() {
    if (!EmailTransporter.instance) {
      EmailTransporter.instance = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });
    }
    return EmailTransporter.instance;
  }
}

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = process.env.EMAIL;
    this.transporter = new EmailTransporter();
  }

  async sendMail(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html
      // html:
    };
    await this.transporter.sendMail(mailOptions);
  }

  async sendForgotPasswordMail() {
    await this.sendMail(
      'forgotPassword',
      'Your password reset token (valid for 10 min)'
    );
  }

  async sendWelcomeMail() {
    await this.sendMail('welcome', 'Welcome to the Natours Family!');
  }
};
