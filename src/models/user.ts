import {
  Column,
  Entity,
  PrimaryColumn
} from 'typeorm'
import { Role } from '../utils/role'

@Entity()
export class User {
  @PrimaryColumn()
  email: string

  @Column()
  name: string

  @Column()
  password: string

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  role: Role
}