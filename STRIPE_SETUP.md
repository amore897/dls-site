# Stripe Integration Setup

## Overview
The DLS website has been fully integrated with Stripe for payment processing. The integration is complete and ready to use - you just need to add your Stripe API keys.

## What's Already Implemented

### Backend (`/app/backend/server.py`)
- ✅ Stripe library installed
- ✅ API endpoint `/api/create-checkout-session` for creating payment sessions
- ✅ API endpoint `/api/config` for serving publishable key to frontend
- ✅ Error handling for Stripe operations

### Frontend (`/app/frontend/src/App.js`)
- ✅ @stripe/stripe-js library installed
- ✅ Checkout buttons for all three plans:
  - Consumer Plan: $100 (price_1SYx4t2Repoud9h4u3pirtla)
  - Maker Plan: $300 (price_1SYx5i2Repoud9h4SrbYrwRm)
  - Store Plan: $1,000 (price_1SYx6e2Repoud9h4fK2i0Q1O)
- ✅ Success and Cancel redirect pages
- ✅ Loading states for buttons

## How to Add Your Stripe Keys

### Step 1: Get Your Stripe Keys
1. Log in to your Stripe Dashboard: https://dashboard.stripe.com
2. Navigate to **Developers** → **API keys**
3. Copy both keys:
   - **Secret key** (starts with `sk_test_...` or `sk_live_...`)
   - **Publishable key** (starts with `pk_test_...` or `pk_live_...`)

### Step 2: Add Keys to Environment File
Edit `/app/backend/.env` and add your keys:

```bash
# Existing configuration
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
CORS_ORIGINS="*"

# Stripe Configuration - Add your keys here
STRIPE_SECRET_KEY="sk_test_YOUR_SECRET_KEY_HERE"
STRIPE_PUBLISHABLE_KEY="pk_test_YOUR_PUBLISHABLE_KEY_HERE"
```

### Step 3: Restart Backend
After adding the keys, restart the backend service:

```bash
sudo supervisorctl restart backend
```

## Testing the Integration

### Test Mode (Recommended First)
1. Use Stripe test keys (starting with `sk_test_` and `pk_test_`)
2. Use Stripe test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Any future expiry date (e.g., 12/34)
   - Any 3-digit CVC

### Live Mode
1. Replace test keys with live keys (starting with `sk_live_` and `pk_live_`)
2. Restart backend
3. Real payments will be processed

## Verifying the Integration

### 1. Check Backend Config Endpoint
```bash
curl http://localhost:8001/api/config
```

Should return:
```json
{
  "stripe_publishable_key": "pk_test_..."
}
```

### 2. Test Checkout Creation
```bash
curl -X POST http://localhost:8001/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{
    "price_id": "price_1SYx4t2Repoud9h4u3pirtla",
    "success_url": "http://localhost:3000/success",
    "cancel_url": "http://localhost:3000/cancel"
  }'
```

Should return:
```json
{
  "checkout_url": "https://checkout.stripe.com/...",
  "session_id": "cs_test_..."
}
```

### 3. Test on Frontend
1. Open the website
2. Scroll to the Pricing section
3. Click any "Pre-order" button
4. You should be redirected to Stripe Checkout

## Price IDs
The following Stripe Price IDs are configured:

| Plan     | Price | Price ID                         |
|----------|-------|----------------------------------|
| Consumer | $100  | price_1SYx4t2Repoud9h4u3pirtla  |
| Maker    | $300  | price_1SYx5i2Repoud9h4SrbYrwRm  |
| Store    | $1000 | price_1SYx6e2Repoud9h4fK2i0Q1O  |

Make sure these Price IDs exist in your Stripe account or update them in the frontend code.

## Troubleshooting

### Error: "Stripe is not configured"
- Check that STRIPE_SECRET_KEY is added to `/app/backend/.env`
- Restart backend: `sudo supervisorctl restart backend`

### Buttons Not Working
- Open browser console (F12) and check for errors
- Verify STRIPE_PUBLISHABLE_KEY is set in backend .env
- Check that price IDs match your Stripe products

### Checkout Not Loading
- Verify price IDs exist in your Stripe Dashboard
- Check Stripe Dashboard → Developers → Logs for API errors

## Security Notes
- ⚠️ Never commit `.env` file to git
- ⚠️ Keep your Secret Key private
- ⚠️ Use test keys for development
- ⚠️ Use live keys only in production

## Support
For Stripe-specific issues, check:
- Stripe Documentation: https://stripe.com/docs
- Stripe Dashboard → Developers → Logs
