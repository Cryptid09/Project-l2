import mongoose from "mongoose";

const connection = {};

export const connectToDb = async () => {
  if (connection.isConnected) {
    console.log("Using existing connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to connect to the database");
  }
};

export function generateCsrfToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 32; 
  let csrfToken = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    csrfToken += characters[randomIndex];
  }

  return csrfToken;
}
