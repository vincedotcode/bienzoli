/**
 * bienzoli — Lead auto-reply / confirmation email
 * Sent to the prospect who just submitted the contact form.
 * Design: light mode, lagoon accent, professional-but-warm bienzoli voice.
 */

export type ConfirmationData = {
  name: string
  serviceNeeded: string
}

export function buildConfirmationEmail({ name, serviceNeeded }: ConfirmationData) {
  const firstName = name.split(" ")[0]
  const subject = `We got your message, ${firstName} — bienzoli`

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f5f6f8;font-family:'DM Sans',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f6f8;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" style="max-width:600px;width:100%;" cellspacing="0" cellpadding="0">

          <!-- Header with lagoon top accent -->
          <tr>
            <td style="background:#0c0d12;border-radius:16px 16px 0 0;padding:0;">
              <div style="height:3px;background:linear-gradient(90deg,transparent,#10b4e8,transparent);border-radius:16px 16px 0 0;"></div>
              <div style="padding:28px 36px;text-align:center;">
                <span style="font-family:'Space Grotesk',Arial,sans-serif;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:0.03em;">bienzoli</span>
                <p style="margin:4px 0 0;font-size:12px;color:#6b7280;letter-spacing:0.05em;">Modern websites that grow your business.</p>
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px 36px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">

              <!-- Greeting -->
              <h1 style="margin:0 0 16px;font-family:'Space Grotesk',Arial,sans-serif;font-size:26px;font-weight:700;color:#0f1117;letter-spacing:-0.025em;">
                Hi ${firstName}! 👋
              </h1>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#374151;">
                Thanks for reaching out. We've received your enquiry about <strong style="color:#0f1117;">${escapeHtml(serviceNeeded)}</strong> and we'll get back to you within <strong style="color:#0f1117;">24 hours</strong>.
              </p>
              <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#374151;">
                In the meantime, take a look at some of the work we've shipped recently — it might give you a feel for what we can build together.
              </p>

              <!-- Featured work callout -->
              <div style="background:#f0fbff;border:1px solid #bae6fd;border-radius:14px;padding:24px;margin-bottom:32px;">
                <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#10b4e8;letter-spacing:0.12em;text-transform:uppercase;">Latest work</p>
                <p style="margin:0 0 8px;font-family:'Space Grotesk',Arial,sans-serif;font-size:17px;font-weight:600;color:#0f1117;">Frisco Creamery</p>
                <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#374151;">
                  Full brand website for a premium ice cream creamery — vibrant product showcase, location finder, and a conversion-led order flow.
                </p>
                <a href="https://friscocreamery.org" style="display:inline-block;background:#10b4e8;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:9px 20px;border-radius:100px;">
                  View live site →
                </a>
              </div>

              <!-- What happens next -->
              <div style="margin-bottom:32px;">
                <p style="margin:0 0 16px;font-family:'Space Grotesk',Arial,sans-serif;font-size:16px;font-weight:600;color:#0f1117;">What happens next</p>
                ${buildStep("1", "We review your project", "We read every message personally and assess the best approach for your goals.")}
                ${buildStep("2", "We reach out within 24h", "You'll hear from us by email or WhatsApp — whichever works best for you.")}
                ${buildStep("3", "Free consultation call", "A quick call to align on scope, timeline and package. No commitment, no pressure.")}
              </div>

              <!-- Direct contact -->
              <div style="background:#f9fafb;border-radius:12px;border:1px solid #e9eaec;padding:20px;margin-bottom:32px;">
                <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#374151;">Need to reach us sooner?</p>
                <p style="margin:0;font-size:13px;color:#6b7280;">
                  WhatsApp us at <a href="https://wa.me/23057901383" style="color:#10b4e8;text-decoration:none;">+230 5790 1383</a> — we respond fast.
                </p>
              </div>

              <!-- CTA -->
              <div style="text-align:center;margin-bottom:8px;">
                <a href="https://bienzoli.com/#projects" style="display:inline-block;background:#0f1117;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:13px 28px;border-radius:100px;">
                  See our work
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0c0d12;border-radius:0 0 16px 16px;padding:24px 36px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-family:'Space Grotesk',Arial,sans-serif;font-size:15px;font-weight:600;color:#ffffff;letter-spacing:0.03em;">bienzoli</p>
                    <p style="margin:0;font-size:12px;color:#6b7280;">vincedotcode ltd · Port Louis, Mauritius</p>
                  </td>
                  <td style="text-align:right;vertical-align:top;">
                    <a href="https://bienzoli.com" style="color:#10b4e8;text-decoration:none;font-size:12px;">bienzoli.com</a>
                  </td>
                </tr>
              </table>
              <div style="margin-top:16px;padding-top:16px;border-top:1px solid #1c1d24;">
                <p style="margin:0;font-size:11px;color:#4b5563;text-align:center;">
                  You received this email because you submitted a contact form on bienzoli.com.<br/>
                  If this wasn't you, please ignore this message.
                </p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

  const text = `
Hi ${firstName},

Thanks for reaching out to bienzoli! We've received your enquiry about "${serviceNeeded}" and will get back to you within 24 hours.

WHAT HAPPENS NEXT
1. We review your project details
2. We reach out within 24h by email or WhatsApp
3. Free consultation call — no commitment, no pressure

LATEST WORK
Check out our most recent project: Frisco Creamery — https://friscocreamery.org

Need to reach us sooner?
WhatsApp: +230 5790 1383

bienzoli — vincedotcode ltd
Port Louis, Mauritius
https://bienzoli.com
`.trim()

  return { subject, html, text }
}

function buildStep(number: string, title: string, description: string) {
  return `
    <div style="display:flex;align-items:flex-start;gap:16px;margin-bottom:14px;">
      <div style="flex-shrink:0;width:26px;height:26px;background:#10b4e8;border-radius:50%;display:flex;align-items:center;justify-content:center;text-align:center;">
        <span style="font-family:'Space Grotesk',Arial,sans-serif;font-size:12px;font-weight:700;color:#ffffff;line-height:26px;">${number}</span>
      </div>
      <div>
        <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#0f1117;">${title}</p>
        <p style="margin:0;font-size:13px;line-height:1.5;color:#6b7280;">${description}</p>
      </div>
    </div>
  `
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
