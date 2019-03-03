import { Router } from "express";
import { query } from "../db/connection";
import { requireAuth } from "../middleware/auth";

const router = Router({});

router.post("/get_all", async (req, res) => {
    const { userId } = req;

    let result;

    if (userId) {
        result = await query(
            "SELECT id,address,name,store_layout FROM stores WHERE user_id=$1 ORDER BY name ASC",
            [userId]
        );
    } else {
        result = await query(
            "SELECT id,address,name,store_layout FROM stores ORDER BY name ASC"
        );
    }

    res.send(result.rows);
});

router.post("/get", async (req, res) => {
    const { id } = req.body;

    const result = await query(
        "SELECT id,address,name,store_layout FROM stores WHERE id=$1",
        [id]
    );

    const store = result.rows[0];

    res.send(store);
});

router.post("/create", requireAuth, async (req, res) => {
    const { name, address } = req.body;
    const { userId } = req;

    const result = await query(
        "INSERT INTO stores (name,address,user_id) VALUES ($1,$2,$3) RETURNING id",
        [name, address, userId]
    );

    const id = result.rows[0].id;

    res.send({ id });
});

router.post("/update", async (req, res) => {
    const { id, name, address } = req.body;

    const { userId } = req;

    await query(
        "UPDATE stores SET name=$1,address=$2 WHERE id=$3 AND user_id=$4",
        [name, address, id, userId]
    );

    res.send({ success: true });
});

router.post("/store_layout", async (req, res) => {
    const { id, storeLayout } = req.body;

    const { userId } = req;

    await query(
        "UPDATE stores SET store_layout=$1 WHERE id=$2 AND user_id=$3",
        [storeLayout, id, userId]
    );

    res.send({ success: true });
});

router.post("/delete", async (req, res) => {
    const { id } = req.body;

    const { userId } = req;

    await query("DELETE FROM stores WHERE id=$1 AND  user_id=$2", [id, userId]);

    res.send({ success: true });
});

export default router;
