
import { v4 as uuidv4 } from 'uuid';

export const generateId = (): string => {
    return uuidv4();
};

export const getTTL = (minutes: number) => {
    const now = new Date();
    const ttl = now.getTime() + minutes * 60 * 1000;
    return Math.floor(ttl / 1000);
}