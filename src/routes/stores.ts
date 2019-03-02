import { Router } from "express";
import { query } from "../db/connection";

const router = Router({});

router.post("/get", async (req, res) => {
    const { id } = req.body;

    const result = await query("SELECT");

    const store = result.rows[0];

    res.send(store);
});

router.post("/create", async (req, res) => {});

router.post("/update", async (req, res) => {
    const { id } = req.body;
});

router.post("/delete", async (req, res) => {
    const { id } = req.body;
});

export default router;
