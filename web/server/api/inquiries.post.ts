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

  const toEmail = settings?.notification_email || 'info@horseprotrailersltd.com'

  // Fetch product details if available
  let productDetails = null
  if (body.product_id) {
    const { data: p } = await supabase
      .from('products')
      .select('title, stock_number, price, location, slug')
      .eq('id', body.product_id)
      .single()
    if (p) productDetails = p
  }

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

      // Determine Theme
      let themeColor = '#1e293b' // Default Dark Blue (slate-800)
      let themeTitle = `New Inquiry from ${body.name}`
      let themeIcon = ''
      
      if (body.type === 'Finance') {
        themeColor = '#16a34a' // Green for finance
        themeTitle = `New Finance Request from ${body.name}`
        themeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: -6px; margin-right: 8px;"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`
      } else if (body.type === 'Info') {
        themeColor = '#0284c7' // Blue for Info
        themeTitle = `New Information Request from ${body.name}`
        themeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: -6px; margin-right: 8px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
      }

      const emailHtml = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px; border-radius: 12px;">
        <!-- Header -->
        <div style="background-color: ${themeColor}; padding: 25px; text-align: center; color: white; border-top-left-radius: 12px; border-top-right-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <h2 style="margin: 0; font-size: 24px; font-weight: 600;">${themeIcon}${themeTitle}</h2>
        </div>
        
        <!-- Customer Details -->
        <div style="background-color: white; padding: 25px; border: 1px solid #e2e8f0; border-top: none;">
          <h3 style="margin-top: 0; color: #334155; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">Customer Details</h3>
          <p style="margin: 8px 0; color: #475569;"><strong>Name:</strong> ${body.name}</p>
          <p style="margin: 8px 0; color: #475569;"><strong>Email:</strong> <a href="mailto:${body.email}" style="color: ${themeColor}; text-decoration: none;">${body.email}</a></p>
          <p style="margin: 8px 0; color: #475569;"><strong>Phone:</strong> ${body.phone ? `<a href="tel:${body.phone}" style="color: ${themeColor}; text-decoration: none;">${body.phone}</a>` : 'N/A'}</p>
        </div>

        <!-- Product Details -->
        ${productDetails ? `
        <div style="background-color: white; padding: 25px; border: 1px solid #e2e8f0; border-top: none;">
          <h3 style="margin-top: 0; color: #334155; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">Product of Interest</h3>
          <p style="margin: 8px 0; color: #475569;"><strong>Title:</strong> ${productDetails.title}</p>
          <p style="margin: 8px 0; color: #475569;"><strong>Stock #:</strong> ${productDetails.stock_number || 'N/A'}</p>
          <p style="margin: 8px 0; color: #475569;"><strong>Price:</strong> ${productDetails.price ? `$${productDetails.price.toLocaleString()}` : 'Call for Price'}</p>
          <p style="margin: 8px 0; color: #475569;"><strong>Location:</strong> ${productDetails.location || 'N/A'}</p>
          <div style="margin-top: 20px;">
            <a href="https://www.horseprotrailersltd.com/inventory/${productDetails.slug}" style="background-color: ${themeColor}; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">View on Website</a>
          </div>
        </div>
        ` : ''}

        <!-- Message -->
        <div style="background-color: white; padding: 25px; border: 1px solid #e2e8f0; border-top: none; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">
          <h3 style="margin-top: 0; color: #334155; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">Additional Message / Comments</h3>
          <p style="white-space: pre-wrap; color: #475569; line-height: 1.6; margin: 0;">${body.message || '<i>No message provided.</i>'}</p>
        </div>
        
        <div style="text-align: center; margin-top: 25px; color: #94a3b8; font-size: 13px;">
          This is an automated notification from the Horse Pro Trailers website platform.
        </div>
      </div>
      `

      const mailOptions = {
        from: `"Horse Pro Trailers" <${config.smtpUser}>`,
        to: toEmail,
        subject: `[${body.type}] New Request from ${body.name}`,
        html: emailHtml
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
