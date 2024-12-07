import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                error: 'Validation error',
            });
        }
        next(error);
    }
};

export const validatePathParams = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.params);
        next();
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({
                error: 'Validation error',
            });
        }
        next(error);
    }
};