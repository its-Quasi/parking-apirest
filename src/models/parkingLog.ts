import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'parking_logs' })
export class ParkingLog {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  vehiclePlate: string

  @Column()
  entryTime: Date

  @Column({ nullable: true })
  exitTime: Date
}