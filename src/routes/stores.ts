import { Router } from "express";
import { query } from "../db/connection";

const router = Router({});

router.post("/get", async (req, res) => {
    const { id } = req.body;

    const result = await query("SELECT id,address,name WHERE id=$1", [id]);

    const store = result.rows[0];

    res.send(store);
});

router.post("/create", async (req, res) => {
    const { name,address } = req.body;

    const result = await query("INSERT INTO stores (name,address) VALUES ($1,$2) RETURNING id", [name,address])

    const id = result.rows[0].id;

    res.send({id});
});

router.post("/update", async (req, res) => {
    const { id,name,address } = req.body;
  
    await query("UPDATE stores SET name=$1,address WHERE id=$1", [name,address,id]);

    res.send({success: true});
});

router.post("/delete", async (req, res) => {
    const { id } = req.body;

    await query("DELETE FROM stores WHERE id=$1", [id]);

    res.send({success: true});
});

export default router;
