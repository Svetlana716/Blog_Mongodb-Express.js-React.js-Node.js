import nodemailer, { Transporter } from "nodemailer";

const {
  SMTP_HOST = "",
  SMTP_PORT = 0,
  SMTP_USER = "",
  SMTP_PASSWORD = "",
  CLIENT_URL = "",
} = process.env;

class MailService {
  transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: +SMTP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    const message = {
      from: SMTP_USER, // sender address
      to, // list of receivers
      subject: `Активация аккаунта на ${CLIENT_URL}`, // Subject line
      text: "Hello world?", // plain text body
      html: `
            <div>
              <h1>Для активации аккаунта перейдите по ссылке</h1>
              <a href="${link}">${link}</a>
            </div>
      `, // html body
    };
    try {
      const info = await this.transporter.sendMail(message);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.error("Error sending email: ", error);
    }
  }
}

export default new MailService();
