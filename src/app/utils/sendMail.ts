import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async(to: string, html: string) => {
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: config.node_env === 'production',
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "emonhasan7650@gmail.com",
    pass: "ocqp qdjz hclg qfxk",
  },
});

 await transporter.sendMail({
    from: 'emonhasan7650@gmail.com', // sender address
    to, // list of receivers
    subject: "Please change your password ✔", // Subject line
    text: "You are need change password? Reset your password within 10 mins!", // plain text body
    html, // html body
  });

}