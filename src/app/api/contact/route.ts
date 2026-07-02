import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    // Basic server-side validation
    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,   // e.g. yoursenderemail@gmail.com
        pass: process.env.EMAIL_PASS,   // Gmail App Password (not your login password)
      },
    });

    await transporter.sendMail({
      from: `"Triveni Gau Sewa Trust" <${process.env.EMAIL_USER}>`,
      to: "trivenigausewa2026@gmail.com",
      subject: `New Inquiry from ${name} — Triveni Gau Sewa Trust`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #1a0f00; color: #fbbf24; padding: 32px; border-radius: 8px; border: 1px solid #92400e;">
          <h2 style="color: #f59e0b; margin-top: 0; font-size: 24px;">🐄 New Contact Form Submission</h2>
          <p style="color: #fde68a; font-size: 14px; margin-bottom: 24px;">Triveni Gau Sewa Trust Website</p>
          <hr style="border-color: #92400e; margin-bottom: 24px;" />

          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            <tr>
              <td style="padding: 10px 0; color: #d97706; font-weight: bold; width: 120px;">Name</td>
              <td style="padding: 10px 0; color: #fef3c7;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #d97706; font-weight: bold;">Email</td>
              <td style="padding: 10px 0; color: #fef3c7;"><a href="mailto:${email}" style="color: #fbbf24;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #d97706; font-weight: bold;">Phone</td>
              <td style="padding: 10px 0; color: #fef3c7;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #d97706; font-weight: bold; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #fef3c7; white-space: pre-wrap;">${message || "—"}</td>
            </tr>
          </table>

          <hr style="border-color: #92400e; margin-top: 24px;" />
          <p style="color: #92400e; font-size: 12px; margin: 0; text-align: center;">
            🙏 Gau Sewa · God Sewa — Triveni Gau Sewa Trust
          </p>
        </div>
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
