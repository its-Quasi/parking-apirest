import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Parking } from "./parking";

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

  @Column({ default: 0 })
  profit: number

  @ManyToOne(() => Parking, parking => parking.parkingLogs)
  parking: Parking
}