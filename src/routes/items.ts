import { Router } from "express";
import { query } from "../db/connection";
import { requireAuth } from "../middleware/auth";

const router = Router({});

router.post("/get", async (req, res) => {
    const { id } = req.body;

    const result = await query(
        "SELECT id,name,price,picture,stock FROM items WHERE id=$1",
        [id]
    );

    const item = result.rows[0];

    res.send(item);
});

router.post("/create", requireAuth, async (req, res) => {
    const { name, price, stock } = req.body;

    const { userId } = req;

    console.log(req.body);

    const result = await query(
        "INSERT INTO items (name,price,stock,user_id) VALUES ($1,$2,$3,$4) RETURNING id",
        [name, price, stock, userId]
    );

    const id = result.rows[0].id;

    res.send({ id });
});

router.post("/update", async (req, res) => {
    const { id, name, price, stock } = req.body;

    const { userId } = req;

    await query(
        "UPDATE items SET name=$1,price=$2,stock=$3 WHERE id=$4 AND user_id=$5",
        [name, price, stock, id, userId]
    );

    res.send({ success: true });
});

router.post("/delete", async (req, res) => {
    const { id } = req.body;

    const { userId } = req;

    await query("DELETE FROM items WHERE id=$1 AND  user_id=$2", [id, userId]);

    res.send({ success: true });
});

router.post("/add_item_to_store", async (req, res) => {
    const { itemId, storeId } = req.body;

    await query(
        "INSERT INTO item_stores (item_id,store_id) VALUES ($1,$2) ON CONFLICT DO NOTHING",
        [itemId, storeId]
    );

    res.send({ success: true });
});

router.post("/remove_item_from_store", async (req, res) => {
    const { itemId, storeId } = req.body;

    await query("DELETE FROM item_stores WHERE item_id=$1 AND store_id=$2", [
        itemId,
        storeId
    ]);

    res.send({ success: true });
});

export default router;
