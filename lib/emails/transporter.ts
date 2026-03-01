import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export const FROM_ADDRESS = `"bienzoli" <${process.env.GMAIL_USER}>`
export const ADMIN_EMAIL = process.env.GMAIL_USER as string
