import jwt from "jsonwebtoken";
import Express from "express";
import { query } from "../db/connection";

declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

export const authMiddleware = async (
    req: Express.Request,
    res: Express.Response,
    next: () => void
) => {
    if (!req.header("Authorization")) {
        next();
        return;
    }

    try {
        interface TokenPayload {
            id: number;
        }

        const [, token] = req.header("Authorization").split(" ");
        const { id } = <TokenPayload>(
            await jwt.verify(token, process.env.JWT_SECRET)
        );

        const { rows } = await query(`SELECT id FROM users WHERE id=$1`, [id]);

        if (rows.length === 0) {
            next();
            return;
        }

        req.userId = id;
        next();
    } catch (e) {
        next();
        return;
    }
};

export const requireAuth = (
    req: Express.Request,
    res: Express.Response,
    next: () => void
) => {
    if (req.userId !== undefined && req.userId !== null) {
        next();
    } else {
        res.send({
            error: "No Authorization"
        });
    }
};
