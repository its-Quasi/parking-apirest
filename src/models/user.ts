import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn
} from 'typeorm'
import { Role } from '../utils/role'
import { Parking } from './parking'

@Entity({ name: 'users' })
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
    default: Role.PARTNER,
  })
  role: Role

  @OneToMany(() => Parking, parking => parking.partner)
  parkings: Parking[]
}