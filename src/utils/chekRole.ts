import { Request, Response } from "express";

export const checkRole = (req : Request, res : Response, next: () => void) => {
    console.log('Verified')
    next();
 }