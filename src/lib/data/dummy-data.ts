/**
 * DUMMY DATA FOR DEVELOPMENT
 *
 * This file contains mock data to use when the backend is unavailable.
 * To switch between real and dummy data, set USE_DUMMY_DATA=true in .env
 */

export const dummyData = {
  // PRODUCTS
  products: {
    products: [
      {
        id: "prod_01",
        title: "Premium Wireless Headphones",
        handle: "premium-wireless-headphones",
        description: "High-quality wireless headphones with noise cancellation",
        thumbnail: "https://via.placeholder.com/300x300?text=Headphones",
        variants: [
          {
            id: "variant_01",
            title: "Black",
            prices: [{ amount: 29999, currency_code: "usd" }],
            inventory_quantity: 50,
            options: [{ value: "Black" }],
          },
        ],
        options: [{ id: "opt_01", title: "Color", values: [{ value: "Black" }] }],
        images: [{ url: "https://via.placeholder.com/600x600?text=Headphones" }],
        reviews: [
          {
            id: "rev_01",
            rating: 5,
            content: "Amazing quality!",
            customer: { first_name: "John", last_name: "Doe" },
          },
        ],
        seller: {
          id: "seller_01",
          name: "TechStore",
          handle: "techstore",
        },
      },
      {
        id: "prod_02",
        title: "Smart Watch Pro",
        handle: "smart-watch-pro",
        description: "Advanced smartwatch with health tracking",
        thumbnail: "https://via.placeholder.com/300x300?text=Watch",
        variants: [
          {
            id: "variant_02",
            title: "Silver",
            prices: [{ amount: 39999, currency_code: "usd" }],
            inventory_quantity: 30,
            options: [{ value: "Silver" }],
          },
        ],
        options: [{ id: "opt_02", title: "Color", values: [{ value: "Silver" }] }],
        images: [{ url: "https://via.placeholder.com/600x600?text=Watch" }],
        reviews: [],
        seller: {
          id: "seller_01",
          name: "TechStore",
          handle: "techstore",
        },
      },
      {
        id: "prod_03",
        title: "Laptop Stand",
        handle: "laptop-stand",
        description: "Ergonomic laptop stand for better posture",
        thumbnail: "https://via.placeholder.com/300x300?text=Stand",
        variants: [
          {
            id: "variant_03",
            title: "Default",
            prices: [{ amount: 4999, currency_code: "usd" }],
            inventory_quantity: 100,
            options: [{ value: "Default" }],
          },
        ],
        options: [{ id: "opt_03", title: "Size", values: [{ value: "Default" }] }],
        images: [{ url: "https://via.placeholder.com/600x600?text=Stand" }],
        reviews: [],
        seller: {
          id: "seller_02",
          name: "HomeGoods",
          handle: "homegoods",
        },
      },
    ],
    count: 3,
    limit: 20,
    offset: 0,
  },

  // CART
  cart: {
    id: "cart_01",
    email: null,
    region_id: "reg_01",
    region: {
      id: "reg_01",
      name: "United States",
      currency_code: "usd",
      countries: [{ id: "country_01", iso_2: "us", display_name: "United States" }],
    },
    items: [
      {
        id: "item_01",
        cart_id: "cart_01",
        variant_id: "variant_01",
        product_id: "prod_01",
        title: "Premium Wireless Headphones",
        quantity: 1,
        unit_price: 29999,
        total: 29999,
        thumbnail: "https://via.placeholder.com/100x100?text=Headphones",
        variant: {
          id: "variant_01",
          title: "Black",
          product: {
            id: "prod_01",
            title: "Premium Wireless Headphones",
            thumbnail: "https://via.placeholder.com/100x100?text=Headphones",
          },
        },
      },
    ],
    shipping_address: null,
    billing_address: null,
    shipping_methods: [],
    payment_sessions: [],
    subtotal: 29999,
    tax_total: 0,
    shipping_total: 0,
    discount_total: 0,
    total: 29999,
  },

  // CUSTOMER
  customer: {
    id: "cus_01",
    email: "john.doe@example.com",
    first_name: "John",
    last_name: "Doe",
    phone: "+1234567890",
    has_account: true,
    addresses: [
      {
        id: "addr_01",
        first_name: "John",
        last_name: "Doe",
        address_1: "123 Main St",
        address_2: "Apt 4B",
        city: "New York",
        province: "NY",
        postal_code: "10001",
        country_code: "us",
        phone: "+1234567890",
      },
    ],
    orders: [],
  },

  // ORDERS
  orders: [
    {
      id: "order_01",
      display_id: 1001,
      email: "john.doe@example.com",
      created_at: new Date().toISOString(),
      status: "completed",
      fulfillment_status: "fulfilled",
      payment_status: "captured",
      total: 32999,
      subtotal: 29999,
      tax_total: 0,
      shipping_total: 3000,
      items: [
        {
          id: "item_01",
          title: "Premium Wireless Headphones",
          quantity: 1,
          unit_price: 29999,
          total: 29999,
          thumbnail: "https://via.placeholder.com/100x100?text=Headphones",
          variant: {
            title: "Black",
            product: {
              title: "Premium Wireless Headphones",
              thumbnail: "https://via.placeholder.com/100x100?text=Headphones",
            },
          },
        },
      ],
      shipping_address: {
        first_name: "John",
        last_name: "Doe",
        address_1: "123 Main St",
        city: "New York",
        province: "NY",
        postal_code: "10001",
        country_code: "us",
      },
    },
  ],

  // REVIEWS
  reviews: [
    {
      id: "rev_01",
      product_id: "prod_01",
      customer_id: "cus_01",
      rating: 5,
      content: "Excellent product! Highly recommended.",
      created_at: new Date().toISOString(),
      customer: {
        first_name: "John",
        last_name: "Doe",
      },
    },
    {
      id: "rev_02",
      product_id: "prod_01",
      customer_id: "cus_02",
      rating: 4,
      content: "Good quality, fast shipping.",
      created_at: new Date().toISOString(),
      customer: {
        first_name: "Jane",
        last_name: "Smith",
      },
    },
  ],

  // WISHLIST
  wishlist: [
    {
      id: "wish_01",
      customer_id: "cus_01",
      product_id: "prod_02",
      product: {
        id: "prod_02",
        title: "Smart Watch Pro",
        handle: "smart-watch-pro",
        thumbnail: "https://via.placeholder.com/300x300?text=Watch",
        variants: [
          {
            id: "variant_02",
            prices: [{ amount: 39999, currency_code: "usd" }],
          },
        ],
      },
    },
  ],

  // SELLERS
  seller: {
    id: "seller_01",
    name: "TechStore",
    handle: "techstore",
    description: "Premium electronics and gadgets",
    logo: "https://via.placeholder.com/200x200?text=TechStore",
    banner: "https://via.placeholder.com/1200x300?text=TechStore+Banner",
    rating: 4.8,
    total_reviews: 150,
  },

  // REGIONS
  regions: [
    {
      id: "reg_01",
      name: "United States",
      currency_code: "usd",
      tax_rate: 0,
      countries: [
        {
          id: "country_01",
          iso_2: "us",
          iso_3: "usa",
          name: "United States",
          display_name: "United States",
        },
      ],
      payment_providers: [
        { id: "pp_stripe", is_installed: true },
      ],
    },
    {
      id: "reg_02",
      name: "Europe",
      currency_code: "eur",
      tax_rate: 0.2,
      countries: [
        {
          id: "country_02",
          iso_2: "de",
          iso_3: "deu",
          name: "Germany",
          display_name: "Germany",
        },
      ],
      payment_providers: [
        { id: "pp_stripe", is_installed: true },
      ],
    },
  ],

  // CATEGORIES
  categories: [
    {
      id: "cat_01",
      name: "Electronics",
      handle: "electronics",
      description: "Electronic devices and accessories",
      parent_category_id: null,
      category_children: [
        {
          id: "cat_02",
          name: "Audio",
          handle: "audio",
          parent_category_id: "cat_01",
        },
        {
          id: "cat_03",
          name: "Wearables",
          handle: "wearables",
          parent_category_id: "cat_01",
        },
      ],
    },
    {
      id: "cat_04",
      name: "Home & Office",
      handle: "home-office",
      description: "Home and office essentials",
      parent_category_id: null,
      category_children: [],
    },
  ],

  // COLLECTIONS
  collections: [
    {
      id: "col_01",
      title: "Summer Sale",
      handle: "summer-sale",
      products: [],
    },
    {
      id: "col_02",
      title: "New Arrivals",
      handle: "new-arrivals",
      products: [],
    },
  ],

  // PAYMENT PROVIDERS
  paymentProviders: [
    {
      id: "pp_stripe",
      is_installed: true,
    },
    {
      id: "pp_manual",
      is_installed: true,
    },
  ],

  // SHIPPING OPTIONS
  shippingOptions: [
    {
      id: "so_01",
      name: "Standard Shipping",
      price_incl_tax: 500,
      amount: 500,
      provider_id: "manual",
    },
    {
      id: "so_02",
      name: "Express Shipping",
      price_incl_tax: 1500,
      amount: 1500,
      provider_id: "manual",
    },
  ],

  // NOTIFICATIONS
  notifications: [
    {
      id: "notif_01",
      title: "Order Shipped",
      message: "Your order #1001 has been shipped!",
      type: "order",
      read: false,
      created_at: new Date().toISOString(),
    },
    {
      id: "notif_02",
      title: "Welcome!",
      message: "Welcome to our marketplace!",
      type: "system",
      read: true,
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ],

  // RETURN REASONS
  returnReasons: [
    {
      id: "rr_01",
      value: "defective",
      label: "Defective Item",
      description: "The item is defective or damaged",
    },
    {
      id: "rr_02",
      value: "wrong_item",
      label: "Wrong Item",
      description: "Received wrong item",
    },
    {
      id: "rr_03",
      value: "not_as_described",
      label: "Not as Described",
      description: "Item doesn't match description",
    },
  ],

  // ORDER SET (for order details)
  orderSet: {
    id: "order_set_01",
    order_id: "order_01",
    order: {
      id: "order_01",
      display_id: 1001,
      email: "john.doe@example.com",
      created_at: new Date().toISOString(),
      status: "completed",
      fulfillment_status: "fulfilled",
      payment_status: "captured",
      total: 32999,
      subtotal: 29999,
      tax_total: 0,
      shipping_total: 3000,
      items: [
        {
          id: "item_01",
          title: "Premium Wireless Headphones",
          quantity: 1,
          unit_price: 29999,
          total: 29999,
          thumbnail: "https://via.placeholder.com/100x100?text=Headphones",
          variant: {
            title: "Black",
            product: {
              title: "Premium Wireless Headphones",
              thumbnail: "https://via.placeholder.com/100x100?text=Headphones",
            },
          },
        },
      ],
      shipping_address: {
        first_name: "John",
        last_name: "Doe",
        address_1: "123 Main St",
        city: "New York",
        province: "NY",
        postal_code: "10001",
        country_code: "us",
      },
    },
  },
}
