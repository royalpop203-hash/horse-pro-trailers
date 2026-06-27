import { google } from 'googleapis';
import { defineEventHandler } from 'h3';
import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const merchantId = process.env.GOOGLE_MERCHANT_ID;
  
  if (!merchantId) {
    return { success: false, error: 'Merchant ID is missing in environment variables' };
  }

  // 1. Authenticate with the JSON file
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/content'],
  });

  // 2. Initialize Content API client (v2.1 is the current stable version for products)
  const content = google.content({
    version: 'v2.1',
    auth: auth,
  });

  // 3. Fetch all products from Supabase
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images ( url, is_primary )
    `);

  if (error) {
    return { success: false, error: error.message };
  }

  if (!products || products.length === 0) {
    return { success: true, message: 'No products found to sync.' };
  }

  // 4. Sync each product
  const results = [];
  for (const product of products) {
    const primaryImage = product.product_images?.find((img: any) => img.is_primary)?.url || product.product_images?.[0]?.url || 'https://via.placeholder.com/600';
    
    // Map database fields to Google Merchant Center product format
    const googleProduct = {
      offerId: product.id,
      title: product.title,
      description: product.description_html || product.title,
      link: `https://horseprotrailersltd.com/inventory/${product.slug}`, // Update with actual domain
      imageLink: primaryImage,
      contentLanguage: 'en',
      targetCountry: 'US',
      channel: 'online',
      availability: product.status === 'Available' ? 'in stock' : 'out of stock',
      condition: product.condition?.toLowerCase() === 'used' ? 'used' : 'new',
      price: {
        value: product.price ? product.price.toString() : '0.00',
        currency: 'USD',
      },
      brand: product.manufacturer || 'Horse Pro Trailers',
      gtin: '', // Optional, leave blank if not applicable
      mpn: product.stock_number || product.id, // Optional, can use stock number
    };

    try {
      const res = await content.products.insert({
        merchantId,
        requestBody: googleProduct,
      });
      results.push({ id: product.id, status: 'success', data: res.data });
    } catch (err: any) {
      console.error(`Failed to sync product ${product.id}:`, err.message);
      results.push({ id: product.id, status: 'error', error: err.message });
    }
  }

  return { 
    success: true, 
    syncedCount: results.filter(r => r.status === 'success').length,
    failedCount: results.filter(r => r.status === 'error').length,
    results 
  };
});
