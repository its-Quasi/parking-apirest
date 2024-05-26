// Database connection config
import { DataSource } from 'typeorm'
import { User } from './models/user'
import { Parking } from './models/parking'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'parking',
  synchronize: true,
  entities: [User, Parking],
  // logging: true,
})