import express from "express";
import { UserDto } from "../../dto/userDto";

declare global {
  namespace Express {
    interface Request {
      user: UserDto
    }
  }
}