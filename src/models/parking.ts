import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user"
import { ParkingLog } from "./parkingLog"

@Entity({ name: 'parkings' })
export class Parking {
  @PrimaryGeneratedColumn()
  id: number

  @Column() 
  name: string

  @Column()
  location: string

  @Column()
  priceByHour: number

  @Column()
  totalSpaces: number

  @Column({ default: 0 })
  avaliableSpaces: number

  @Column({
    default: true
  })
  active: boolean

  @ManyToOne(() => User, partner => partner.parkings)
  partner: User

  @OneToMany(() => ParkingLog, parkingLog => parkingLog.parking)
  parkingLogs: ParkingLog[]
}