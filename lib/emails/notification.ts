/**
 * bienzoli — Admin notification email
 * Sent to bienzolistudio@gmail.com when a new lead submits the contact form.
 * Design: dark card on white background, lagoon accent — matches bienzoli brand.
 */

export type LeadData = {
  name: string
  company?: string
  email: string
  phone?: string
  whatsapp?: string
  serviceNeeded: string
  monthlyAdBudget?: string
  message: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

export function buildNotificationEmail(lead: LeadData) {
  const subject = `New lead: ${lead.name}${lead.company ? ` — ${lead.company}` : ""}`

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

          <!-- Header -->
          <tr>
            <td style="background:#0c0d12;border-radius:16px 16px 0 0;padding:32px 36px;text-align:center;">
              <div style="display:inline-block;">
                <span style="font-family:'Space Grotesk',Arial,sans-serif;font-size:22px;font-weight:600;color:#ffffff;letter-spacing:0.03em;">bienzoli</span>
              </div>
              <div style="margin-top:8px;display:inline-block;background:#10b4e8;border-radius:100px;padding:3px 12px;">
                <span style="font-size:11px;font-weight:600;color:#ffffff;letter-spacing:0.08em;">NEW LEAD</span>
              </div>
            </td>
          </tr>

          <!-- Body card -->
          <tr>
            <td style="background:#ffffff;padding:36px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">

              <h1 style="margin:0 0 8px;font-family:'Space Grotesk',Arial,sans-serif;font-size:24px;font-weight:700;color:#0f1117;letter-spacing:-0.025em;">
                ${lead.name}
              </h1>
              ${lead.company ? `<p style="margin:0 0 24px;font-size:14px;color:#6b7280;">${lead.company}</p>` : '<div style="margin-bottom:24px;"></div>'}

              <!-- Contact details -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-radius:12px;border:1px solid #e9eaec;overflow:hidden;margin-bottom:24px;">
                ${buildRow("Service needed", lead.serviceNeeded, true)}
                ${buildRow("Email", `<a href="mailto:${lead.email}" style="color:#10b4e8;text-decoration:none;">${lead.email}</a>`)}
                ${lead.phone ? buildRow("Phone", lead.phone, true) : ""}
                ${lead.whatsapp ? buildRow("WhatsApp", `<a href="https://wa.me/${lead.whatsapp.replace(/\D/g, "")}" style="color:#10b4e8;text-decoration:none;">${lead.whatsapp}</a>`) : ""}
                ${lead.monthlyAdBudget ? buildRow("Budget", lead.monthlyAdBudget, true) : ""}
              </table>

              <!-- Message -->
              <div style="background:#f9fafb;border-radius:12px;border:1px solid #e9eaec;padding:20px;margin-bottom:28px;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#9ca3af;letter-spacing:0.1em;text-transform:uppercase;">Message</p>
                <p style="margin:0;font-size:14px;line-height:1.65;color:#374151;white-space:pre-wrap;">${escapeHtml(lead.message)}</p>
              </div>

              <!-- Quick actions -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-right:8px;" width="50%">
                    <a href="mailto:${lead.email}?subject=Re: Your enquiry to bienzoli" style="display:block;background:#10b4e8;color:#ffffff;text-align:center;text-decoration:none;font-size:14px;font-weight:600;padding:12px 20px;border-radius:100px;">
                      Reply by email
                    </a>
                  </td>
                  ${lead.whatsapp ? `
                  <td style="padding-left:8px;" width="50%">
                    <a href="https://wa.me/${lead.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${lead.name}! Thanks for reaching out to bienzoli. I saw your enquiry and would love to discuss your project.`)}" style="display:block;background:#0f1117;color:#ffffff;text-align:center;text-decoration:none;font-size:14px;font-weight:600;padding:12px 20px;border-radius:100px;">
                      Message on WhatsApp
                    </a>
                  </td>` : `
                  <td style="padding-left:8px;" width="50%">
                    <a href="https://bienzoli.com/crm" style="display:block;border:1px solid #e5e7eb;color:#374151;text-align:center;text-decoration:none;font-size:14px;font-weight:600;padding:12px 20px;border-radius:100px;">
                      Open CRM
                    </a>
                  </td>`}
                </tr>
              </table>

              ${lead.utmSource || lead.utmMedium || lead.utmCampaign ? `
              <!-- UTM tracking -->
              <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f3f4f6;">
                <p style="margin:0 0 6px;font-size:11px;font-weight:600;color:#d1d5db;letter-spacing:0.1em;text-transform:uppercase;">Source</p>
                <p style="margin:0;font-size:12px;color:#9ca3af;font-family:monospace;">
                  ${[lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / ")}
                </p>
              </div>` : ""}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0c0d12;border-radius:0 0 16px 16px;padding:20px 36px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#6b7280;">
                bienzoli — vincedotcode ltd, Mauritius &nbsp;·&nbsp;
                <a href="https://bienzoli.com" style="color:#10b4e8;text-decoration:none;">bienzoli.com</a>
              </p>
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
New lead from bienzoli.com

Name: ${lead.name}
${lead.company ? `Company: ${lead.company}` : ""}
Email: ${lead.email}
${lead.phone ? `Phone: ${lead.phone}` : ""}
${lead.whatsapp ? `WhatsApp: ${lead.whatsapp}` : ""}
Service: ${lead.serviceNeeded}
${lead.monthlyAdBudget ? `Budget: ${lead.monthlyAdBudget}` : ""}

Message:
${lead.message}
`.trim()

  return { subject, html, text }
}

function buildRow(label: string, value: string, shaded = false) {
  return `
    <tr>
      <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;width:38%;${shaded ? "background:#f9fafb;" : "background:#ffffff;"}border-bottom:1px solid #f3f4f6;">
        ${label}
      </td>
      <td style="padding:12px 16px;font-size:14px;color:#111827;${shaded ? "background:#f9fafb;" : "background:#ffffff;"}border-bottom:1px solid #f3f4f6;">
        ${value}
      </td>
    </tr>
  `
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
