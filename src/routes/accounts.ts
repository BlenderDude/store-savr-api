import { Router } from "express";
import { query } from "../db/connection";
import bcyrpt from "bcrypt";

const router = Router({});

router.get("/get_password", async (req, res) => {
    const { password } = req.query;
    const hashPassword = await bcyrpt.hash(password, 8);
    res.send(hashPassword);
});

export default router;
