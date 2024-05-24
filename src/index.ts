import "reflect-metadata"
import app from './app'
import { AppDataSource } from "./data-source"

async function main() {
  await AppDataSource.initialize()
  app.listen(3000, () => {
    console.log(`app running in port 3000`)
  })
}

main()