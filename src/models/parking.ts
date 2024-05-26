import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user"

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
}