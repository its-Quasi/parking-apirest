// Database connection config
import { DataSource } from 'typeorm'
import { User } from './models/user'
import { Parking } from './models/parking'
import { ParkingLog } from './models/parkingLog'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'parking',
  synchronize: true,
  entities: [User, Parking, ParkingLog],
  // logging: true,
})