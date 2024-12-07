import { Request, Response } from 'express';
import { CachedUserService } from '../services/cached-user-service';

const userService = new CachedUserService();

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAll();
        res.status(200).json(users);
    } catch (err) {
        console.error("Failed to retrieve all users", err);
        res.status(500).json({ error: "Failed to retrieve all users" });
    }
};
