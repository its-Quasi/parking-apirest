import { Expose, Type } from "class-transformer";
import { Parking } from "../models/parking"
import { UserDto } from "./userDto";

export class ParkingDto extends Parking {
  @Expose()
  location: string;

  @Expose()
  avaliableSpaces: number;

  @Expose()
  totalSpaces: number;

  @Expose()
  @Type(() => UserDto)
  partner: UserDto;
}