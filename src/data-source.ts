// Database connection config
import { DataSource } from 'typeorm'
import { User } from './models/user'
import { Parking } from './models/parking'
import { ParkingLog } from './models/parkingLog'

// al momento de usar las env variables no se tomaban, me vi obligado a usar strings :c

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.PORT ? parseInt(process.env.PORT) : 5432,
  username: 'test',
  password: 'test',
  database: 'parking',
  synchronize: true,
  entities: [User, Parking, ParkingLog]
})