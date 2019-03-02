import { Router } from "express";
import { query } from "../db/connection";
import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";
import { requireAuth } from "../middleware/auth";

const router = Router({});

router.get("/get_password", requireAuth, async (req, res) => {
    const { password } = req.query;
    const hashPassword = await bcyrpt.hash(password, 8);
    res.send(hashPassword);
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await query(
            "SELECT id,hash_password FROM users WHERE username=$1",
            [username]
        );

        const user = result.rows[0];

        if (!user) {
            throw "Couldnt find username";
        }

        const validPassword = await bcyrpt.compare(
            password,
            user.hash_password
        );

        if (!validPassword) {
            throw "Invalid Password";
        }

        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET
        );

        res.send({
            payload: token
        });
    } catch (e) {
        console.error(e);
        res.send({
            error: "Invalid credentials"
        });
    }
});

router.post("/profile", (req, res) => {});

export default router;
