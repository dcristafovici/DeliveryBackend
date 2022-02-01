export const processPaymentConfig = (uuid) => ({
  auth: {
    username: process.env.PAYMENT_SHOP_ID,
    password: process.env.PAYMENT_SECRET_KEY,
  },
  headers: {
    'Idempotence-Key': uuid,
  },
});
