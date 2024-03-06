import 'dotenv/config'
import mongoose from "mongoose";

export function connectMongoDB() {
  mongoose.connection.on('connected', () => console.log('db connected..'));
  mongoose.connection.on('open', () => console.log('open'));
  mongoose.connection.on('disconnected', () => console.log('disconnected'));
  mongoose.connection.on('reconnected', () => console.log('reconnected'));
  mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
  mongoose.connection.on('close', () => console.log('close'));
  if (process.env.mongodb) {
    mongoose.connect(process.env.mongodb);
  } else {
    console.error('MongoDB connection string is undefined.');
  }

}
