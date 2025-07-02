async function dbConnect() {
  if (cached.conn) {
    // Return existing connection if available
    return { db: cached.conn, isConnected: cached.conn.readyState === 1 };
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    return { db: cached.conn, isConnected: true };
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}