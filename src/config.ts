export const config = {
  port: process.env.PORT,
  mongo: {
    url: process.env.MONGO_URL!,
    db: process.env.MONGO_DB!,
  },
};
