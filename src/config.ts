export const config = {
  port: process.env.PORT,
  mongo: {
    url: process.env.MONGO_URL!,
    db: process.env.MONGO_DB!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiry: +process.env.JWT_EXPIRY!,
  },
};
