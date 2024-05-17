import { Request, Response } from 'express';
import pool from '../models/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const viewGroceryItems = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM grocery_items');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database connection error' });
    }
};


export const bookGroceryItems = async (req: Request, res: Response) => {
    try {
        const { userId, items } = req.body;

        // Check if the user exists
        const [userRows] = await pool.query<RowDataPacket[]>('SELECT id FROM users WHERE id = ?', [userId]);
        if (userRows.length === 0) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        const [orderResult] = await pool.query<ResultSetHeader>('INSERT INTO orders (user_id) VALUES (?)', [userId]);
        const orderId = orderResult.insertId;

        for (const item of items) {
            const [rows] = await pool.query<RowDataPacket[]>('SELECT inventory_count FROM grocery_items WHERE id = ?', [item.id]);
            if (rows.length === 0) {
                return res.status(400).json({ error: `Grocery item with id ${item.id} does not exist` });
            }
            if (rows[0].inventory_count < item.quantity) {
                return res.status(400).json({ error: `Insufficient inventory for item with id ${item.id}` });
            }
            await pool.query('INSERT INTO order_items (order_id, grocery_item_id, quantity) VALUES (?, ?, ?)', [orderId, item.id, item.quantity]);
            await pool.query('UPDATE grocery_items SET inventory_count = inventory_count - ? WHERE id = ?', [item.quantity, item.id]);
        }

        res.status(201).json({ orderId, items });
    } catch (error) {
        res.status(500).json({ error: 'Database connection error' });
    }
};