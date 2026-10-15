import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Cache the connection so hot reloads in dev don't open a new one each time.
const globalWithCache = globalThis as typeof globalThis & {
  _mongoose?: MongooseCache;
};
const cache: MongooseCache = (globalWithCache._mongoose ??= {
  conn: null,
  promise: null,
});

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local.");
  }
  if (cache.conn) return cache.conn;

  cache.promise ??= mongoose.connect(uri, { bufferCommands: false });
  try {
    cache.conn = await cache.promise;
  } catch (err) {
    cache.promise = null;
    throw err;
  }
  return cache.conn;
}
