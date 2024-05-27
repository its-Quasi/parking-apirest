import "reflect-metadata"
import app from './app'
import { AppDataSource } from "./data-source"
import { preloadAdmin } from "./services/auth.service";

async function main() {
  try {
    require('dotenv').config({
      path : './.env',
      debug: true
    });
  } catch (error) {
    console.error('Error loading .env file:', error);
  }
  await AppDataSource.initialize()
  preloadAdmin()
  app.listen(3000, () => {
    console.log(`app running in port 3000`)
  })
}

main()