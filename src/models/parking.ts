import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user"
import { ParkingLog } from "./parkingLog"

@Entity({ name: 'parkings' })
export class Parking {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  location: string

  @Column()
  avaliableSpaces: number

  @Column()
  totalSpaces: number

  @ManyToOne(() => User, partner => partner.parkings)
  partner: User

  @OneToMany(() => ParkingLog, parkingLog => parkingLog.parking)
  parkingLogs: ParkingLog[]
}