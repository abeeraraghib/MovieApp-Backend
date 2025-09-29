import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASS, 
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    return await this.transporter.sendMail({
      from: `"Movie App " <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
  }
}
