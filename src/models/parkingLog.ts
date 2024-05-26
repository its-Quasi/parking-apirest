import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'parking_logs' })
export class ParkingLog {
  @PrimaryColumn()
  id: number
  
  @Column()
  placa: string
  
  @Column()
  entryTime: Date
  
  @Column({ nullable: true })
  exitTime: Date
  
  @Column()
  vehiclePlate: string
}