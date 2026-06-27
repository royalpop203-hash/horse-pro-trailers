import { serverSupabaseServiceRole } from '#supabase/server'
import nodemailer from 'nodemailer'

const DELIVERY_LABELS: Record<string, string> = {
  pickup:   'Pickup (free)',
  delivery: 'Delivery (quote to be arranged)',
}

const PAYMENT_LABELS: Record<string, string> = {
  bank_transfer: 'Bank Transfer',
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const supabase = serverSupabaseServiceRole(event)
  const config = useRuntimeConfig()

  const orderId = crypto.randomUUID().slice(0, 9).toUpperCase()

  const address = body.address ?? {}
  const addressText = [
    address.line1,
    address.line2,
    `${address.city}, ${address.state} ${address.postalCode}`,
    address.country,
  ].filter(Boolean).join('\n')

  // 1. Persist order
  const { error: insertError } = await supabase
    .from('orders')
    .insert([{
      id: orderId,
      product_id: body.product_id || null,
      product_title: body.product_title || null,
      product_price: body.product_price || null,
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone,
      address,
      delivery_method: body.delivery_method,
      payment_method: body.payment_method,
      status: 'pending',
    }])

  if (insertError) {
    throw createError({ statusCode: 500, statusMessage: insertError.message })
  }

  // 2. Fetch notification email from site settings
  const { data: settings } = await supabase
    .from('site_settings')
    .select('notification_email')
    .single()

  const ownerEmail = settings?.notification_email || 'info@horseprotrailersltd.com'

  const deliveryLabel = DELIVERY_LABELS[body.delivery_method] ?? body.delivery_method
  const paymentLabel = PAYMENT_LABELS[body.payment_method] ?? body.payment_method
  const priceText = body.product_price
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(body.product_price)
    : 'Call for Price'

  // 3. Send emails
  if (config.smtpHost && config.smtpUser) {
    try {
      const transporter = nodemailer.createTransport({
        host: config.smtpHost,
        port: parseInt(config.smtpPort),
        secure: parseInt(config.smtpPort) === 465,
        auth: {
          user: config.smtpUser,
          pass: config.smtpPass,
        },
      })

      const productSection = body.product_title ? `
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:20px;">
          <h3 style="margin:0 0 12px;color:#1e293b;font-size:15px;font-weight:600;">Trailer Reserved</h3>
          <p style="margin:6px 0;color:#475569;"><strong>Unit:</strong> ${body.product_title}</p>
          <p style="margin:6px 0;color:#475569;"><strong>Price:</strong> ${priceText}</p>
          <p style="margin:6px 0;color:#475569;"><strong>Delivery:</strong> ${deliveryLabel}</p>
          <p style="margin:6px 0;color:#475569;"><strong>Payment Method:</strong> ${paymentLabel}</p>
        </div>` : ''

      const addressLabel = body.delivery_method === 'pickup' ? 'Pickup Address' : 'Delivery Address'

      // Customer email: include name + phone here since they don't appear elsewhere in the body
      const addressSectionCustomer = `
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:20px;">
          <h3 style="margin:0 0 12px;color:#1e293b;font-size:15px;font-weight:600;">${addressLabel}</h3>
          <p style="margin:6px 0;color:#475569;"><strong>Name:</strong> ${body.customer_name}</p>
          <p style="margin:6px 0;color:#475569;"><strong>Phone:</strong> ${body.customer_phone}</p>
          <p style="margin:6px 0 0;color:#475569;white-space:pre-line;">${addressText}</p>
        </div>`

      // Owner email: name + phone already shown in the Customer section above, so just show the address
      const addressSectionOwner = `
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:20px;">
          <h3 style="margin:0 0 12px;color:#1e293b;font-size:15px;font-weight:600;">${addressLabel}</h3>
          <p style="margin:0;color:#475569;white-space:pre-line;">${addressText}</p>
        </div>`

      // Customer confirmation email
      const customerHtml = `
        <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
          <div style="background:#1e293b;padding:28px 24px;text-align:center;border-radius:8px 8px 0 0;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">Horse Pro Trailers</h1>
            <p style="margin:8px 0 0;color:#94a3b8;font-size:13px;">Order Confirmation</p>
          </div>
          <div style="padding:28px 24px;">
            <p style="color:#334155;font-size:16px;margin:0 0 20px;">
              Hi <strong>${body.customer_name}</strong>, your trailer has been reserved!
            </p>
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
              <p style="margin:0;color:#15803d;font-weight:600;font-size:15px;">Order # ${orderId}</p>
              <p style="margin:6px 0 0;color:#166534;font-size:13px;">Include this number in your payment memo.</p>
            </div>
            ${productSection}
            ${addressSectionCustomer}
            <div style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:20px;margin-bottom:24px;">
              <h3 style="margin:0 0 10px;color:#92400e;font-size:15px;font-weight:600;">Next step — send payment</h3>
              <p style="margin:0;color:#78350f;font-size:13px;line-height:1.6;">
                Please send your full payment via <strong>${paymentLabel}</strong> and include
                <strong>Order # ${orderId}</strong> in the payment note. We'll confirm your order
                once payment is received.
              </p>
            </div>
            <p style="color:#475569;font-size:13px;">
              Questions? Call us at <a href="tel:2817796484" style="color:#1e293b;font-weight:600;">(281) 779-6484</a>
              or visit <a href="https://www.horseprotrailersltd.com" style="color:#1e293b;">horseprotrailersltd.com</a>.
            </p>
          </div>
          <div style="text-align:center;padding:16px 24px;color:#94a3b8;font-size:12px;border-top:1px solid #f1f5f9;">
            Horse Pro Trailers · Automated order confirmation
          </div>
        </div>`

      // Owner notification email
      const ownerHtml = `
        <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
          <div style="background:#1e293b;padding:28px 24px;text-align:center;border-radius:8px 8px 0 0;">
            <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">New Order — ${orderId}</h1>
          </div>
          <div style="padding:28px 24px;">
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:20px;">
              <h3 style="margin:0 0 12px;color:#1e293b;font-size:15px;font-weight:600;">Customer</h3>
              <p style="margin:6px 0;color:#475569;"><strong>Name:</strong> ${body.customer_name}</p>
              <p style="margin:6px 0;color:#475569;"><strong>Email:</strong> <a href="mailto:${body.customer_email}" style="color:#0284c7;">${body.customer_email}</a></p>
              <p style="margin:6px 0;color:#475569;"><strong>Phone:</strong> <a href="tel:${body.customer_phone}" style="color:#0284c7;">${body.customer_phone}</a></p>
            </div>
            ${productSection}
            ${addressSectionOwner}
          </div>
        </div>`

      await Promise.all([
        transporter.sendMail({
          from: `"Horse Pro Trailers" <${config.smtpUser}>`,
          to: body.customer_email,
          subject: `Order Confirmed — #${orderId} | Horse Pro Trailers`,
          html: customerHtml,
        }),
        transporter.sendMail({
          from: `"Horse Pro Trailers" <${config.smtpUser}>`,
          to: ownerEmail,
          subject: `[New Order] #${orderId} — ${body.product_title ?? 'Trailer'}`,
          html: ownerHtml,
        }),
      ])
    } catch (emailError) {
      console.error('Failed to send order emails:', emailError)
    }
  }

  return { success: true, orderId }
})
