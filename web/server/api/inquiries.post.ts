import { serverSupabaseServiceRole } from '#supabase/server'
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const supabase = serverSupabaseServiceRole(event)
  const config = useRuntimeConfig()

  // 1. Insert into Supabase
  const { data: inquiry, error: insertError } = await supabase
    .from('inquiries')
    .insert([{
      product_id: body.product_id || null,
      customer_name: body.name,
      customer_email: body.email,
      customer_phone: body.phone,
      message: body.message,
      type: body.type || 'General'
    }])
    .select()
    .single()

  if (insertError) {
    throw createError({ statusCode: 500, statusMessage: insertError.message })
  }

  // 2. Fetch Notification Email from Settings
  const { data: settings } = await supabase
    .from('site_settings')
    .select('notification_email')
    .single()

  const toEmail = settings?.notification_email || 'info@horseprotrailers.com'

  // 3. Send Email using Nodemailer
  if (config.smtpHost && config.smtpUser) {
    try {
      const transporter = nodemailer.createTransport({
        host: config.smtpHost,
        port: parseInt(config.smtpPort),
        secure: parseInt(config.smtpPort) === 465,
        auth: {
          user: config.smtpUser,
          pass: config.smtpPass
        }
      })

      const mailOptions = {
        from: `"Horse Pro Trailers" <${config.smtpUser}>`,
        to: toEmail,
        subject: `New ${body.type} Request from ${body.name}`,
        html: `
          <h3>New Request Received</h3>
          <p><strong>Type:</strong> ${body.type}</p>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone || 'N/A'}</p>
          ${body.product_id ? `<p><strong>Product ID:</strong> ${body.product_id}</p>` : ''}
          <p><strong>Message:</strong><br/>${body.message}</p>
        `
      }

      await transporter.sendMail(mailOptions)
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // We don't throw an error here because the inquiry was successfully saved to the database.
    }
  } else {
    console.warn('SMTP credentials not configured. Skipping email dispatch.')
  }

  return { success: true, data: inquiry }
})
