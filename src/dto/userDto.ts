import { Exclude } from "class-transformer"
import { User } from "../models/user"

export class UserDto extends User {
  @Exclude() password: string
}