# Dummy Data Mode - Development Guide

This project includes a **Dummy Data Mode** that allows you to develop the frontend without relying on a live backend. This is useful when:
- Your backend is temporarily down or unreliable
- You want to focus on UI/UX design
- You're working offline
- You want consistent data for testing

## 🚀 Quick Start

### Enable Dummy Data Mode

1. Open your `.env` or `.env.local` file (create one if it doesn't exist)
2. Add this line:
   ```bash
   USE_DUMMY_DATA=true
   ```
3. Restart your development server:
   ```bash
   npm run dev
   ```

You should see console messages like `🎭 Using dummy data (API calls disabled)` confirming dummy mode is active.

### Disable Dummy Data Mode (Return to Real API)

1. Open your `.env` or `.env.local` file
2. Either:
   - Remove the `USE_DUMMY_DATA` line entirely, OR
   - Change it to:
     ```bash
     USE_DUMMY_DATA=false
     ```
3. Restart your development server

---

## 📁 File Structure

All dummy data functionality is contained in:

```
src/lib/data/
├── dummy-data.ts       # All mock data (products, orders, users, etc.)
├── use-dummy.ts        # Utility to switch between real/dummy data
├── cart.ts             # Updated with dummy data support
├── customer.ts         # Updated with dummy data support
├── products.ts         # Updated with dummy data support
├── orders.ts           # Updated with dummy data support
├── reviews.ts          # Updated with dummy data support
├── wishlist.ts         # Updated with dummy data support
├── seller.ts           # Updated with dummy data support
├── regions.ts          # Updated with dummy data support
├── categories.ts       # Updated with dummy data support
├── collections.ts      # Updated with dummy data support
├── payment.ts          # Updated with dummy data support
├── fulfillment.ts      # Updated with dummy data support
└── notification.ts     # Updated with dummy data support
```

---

## 🎨 Customizing Dummy Data

### Editing Existing Data

Open [src/lib/data/dummy-data.ts](src/lib/data/dummy-data.ts) and modify any section:

```typescript
// Example: Add more products
export const dummyData = {
  products: {
    products: [
      {
        id: "prod_04",
        title: "Your New Product",
        handle: "your-new-product",
        description: "Description here",
        thumbnail: "https://via.placeholder.com/300x300?text=NewProduct",
        // ... rest of product data
      },
      // ... existing products
    ],
    count: 4, // Update count
  },
  // ... other data
}
```

### Available Dummy Data Sections

The dummy data file includes:

- **Products** - Sample products with variants, images, sellers, reviews
- **Cart** - Shopping cart with items
- **Customer** - User profile with addresses
- **Orders** - Order history with items and shipping info
- **Reviews** - Product/seller reviews
- **Wishlist** - Saved items
- **Sellers** - Seller profiles with ratings
- **Regions** - Geographic regions and currencies
- **Categories** - Product categories
- **Collections** - Product collections
- **Payment Providers** - Payment methods
- **Shipping Options** - Delivery methods
- **Notifications** - User notifications
- **Return Reasons** - Reasons for returns

---

## 🔧 How It Works

### The `withDummyData` Wrapper

All API calls are wrapped with the `withDummyData()` function:

```typescript
// Before (original code)
export const getProducts = async () => {
  return sdk.client.fetch('/store/products')
}

// After (with dummy data support)
export const getProducts = async () => {
  return withDummyData(
    () => sdk.client.fetch('/store/products'),  // Real API call
    dummyData.products                           // Dummy data fallback
  )
}
```

When `USE_DUMMY_DATA=true`:
- The real API call is **skipped**
- Dummy data is returned instead
- A simulated 300ms delay is added for realism

When `USE_DUMMY_DATA=false` (or not set):
- The real API call executes normally
- Dummy data is ignored

---

## ✅ Testing Your Changes

1. **With Dummy Data** (for UI development):
   ```bash
   # .env
   USE_DUMMY_DATA=true
   ```
   - Test UI components
   - Verify layouts and styling
   - Check responsive design
   - Test user flows

2. **With Real API** (before deployment):
   ```bash
   # .env
   USE_DUMMY_DATA=false
   ```
   - Test actual backend integration
   - Verify data transformations
   - Check error handling
   - Test with real authentication

---

## 🛠️ Common Use Cases

### Scenario 1: Backend is Down
```bash
# Enable dummy data immediately
USE_DUMMY_DATA=true
npm run dev
```
Continue working on frontend while backend is being fixed.

### Scenario 2: Designing New Features
```bash
# Use dummy data for consistent results
USE_DUMMY_DATA=true
```
Add mock data to `dummy-data.ts` that matches your new feature requirements.

### Scenario 3: Presenting to Stakeholders
```bash
# Use dummy data for reliable demos
USE_DUMMY_DATA=true
```
Ensure the demo always shows consistent, polished data.

### Scenario 4: Writing Tests
```typescript
// In your test file
process.env.USE_DUMMY_DATA = 'true'
// Now your tests use predictable dummy data
```

---

## ⚠️ Important Notes

### What Dummy Mode Does NOT Do

1. **Does not create actual database records** - Write operations (create, update, delete) are skipped when dummy mode is active
2. **Does not test backend logic** - Always test with real API before production
3. **Does not handle authentication** - Auth flows may not work properly in dummy mode
4. **Does not validate forms** - Server-side validation is bypassed

### Mutation Operations (Create/Update/Delete)

Some operations like `addToCart`, `createOrder`, `updateCustomer` will appear to work but won't persist data. They're primarily for UI testing.

### Before Deploying to Production

**ALWAYS** test with `USE_DUMMY_DATA=false` to ensure:
- Real API integration works
- Data transformations are correct
- Error handling is robust
- Authentication flows work

---

## 🐛 Troubleshooting

### Dummy Mode Not Activating

**Problem**: API calls are still hitting the backend

**Solutions**:
1. Check your `.env` file has `USE_DUMMY_DATA=true`
2. Restart your dev server (`npm run dev`)
3. Check for typos in the environment variable name
4. Verify the file is named `.env` or `.env.local`, not `.env.txt`

### Console Shows "Using dummy data" But Data is Wrong

**Problem**: Seeing dummy data confirmation but unexpected results

**Solutions**:
1. Check [src/lib/data/dummy-data.ts](src/lib/data/dummy-data.ts) matches your expectations
2. Clear Next.js cache: `rm -rf .next` then restart
3. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)

### Type Errors After Updating Dummy Data

**Problem**: TypeScript errors when modifying dummy data

**Solutions**:
1. Ensure dummy data structure matches real API response structure
2. Use `as any` type assertion if needed (already done in code)
3. Check that required fields are present in dummy objects

### Can't Switch Back to Real API

**Problem**: Real API calls not working after disabling dummy mode

**Solutions**:
1. Ensure `.env` has `USE_DUMMY_DATA=false` or line is removed
2. Restart dev server
3. Check that backend URL is correct in `.env`
4. Verify backend is actually running and accessible

---

## 📚 Additional Resources

- **Environment Variables**: `.env.template` - Template for all env vars
- **Dummy Data Source**: [src/lib/data/dummy-data.ts](src/lib/data/dummy-data.ts)
- **API Switch Utility**: [src/lib/data/use-dummy.ts](src/lib/data/use-dummy.ts)

---

## 💡 Tips for Best Results

1. **Keep dummy data realistic** - Use data that resembles production
2. **Update dummy data regularly** - As your API changes, update the mocks
3. **Test both modes** - Before committing, verify code works with both real and dummy data
4. **Use for development only** - Never enable dummy mode in production
5. **Document changes** - If you modify dummy data structure, update this guide

---

## 🤝 Contributing

When adding new API endpoints:

1. Add dummy data to [src/lib/data/dummy-data.ts](src/lib/data/dummy-data.ts)
2. Wrap API call with `withDummyData()` in the data file
3. Test with both `USE_DUMMY_DATA=true` and `false`
4. Update this README if needed

---

**Questions?** Check the code comments in [src/lib/data/use-dummy.ts](src/lib/data/use-dummy.ts) for more details on how the system works.
