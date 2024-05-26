import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user"

@Entity({ name: 'parkings' })
export class Parking {
  @PrimaryColumn()
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