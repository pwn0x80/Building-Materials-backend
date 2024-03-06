import {Express} from "express"
import { connectMongoDB } from "./database";
export function initializeDatabase() {
  connectMongoDB();
}

export function startServer(app:Express, port:number) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
