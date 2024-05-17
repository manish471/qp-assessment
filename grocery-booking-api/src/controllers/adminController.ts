import { Request, Response } from 'express';
import pool from '../models/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const addGroceryItem = async (req: Request, res: Response) => {
    const { name, price, inventory_count } = req.body;
    try {
        const [result] = await pool.query<ResultSetHeader>('INSERT INTO grocery_items (name, price, inventory_count) VALUES (?, ?, ?)', [name, price, inventory_count]);
        res.status(201).json({ id: result.insertId, name, price, inventory_count });
    } catch (error) {
        res.status(500).json({ error: 'Database connection error' });
    }
};

export const viewGroceryItems = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM grocery_items');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database connection error' });
    }
};

export const removeGroceryItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query<ResultSetHeader>('DELETE FROM grocery_items WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Grocery item not found' });
        }
        res.status(200).json({ message: 'Grocery item removed' });
    } catch (error) {
        res.status(500).json({ error: 'Database connection error' });
    }
};

export const updateGroceryItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, inventory_count } = req.body;
    try {
        const [result] = await pool.query<ResultSetHeader>('UPDATE grocery_items SET name = ?, price = ?, inventory_count = ? WHERE id = ?', [name, price, inventory_count, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Grocery item not found' });
        }
        res.status(200).json({ message: 'Grocery item updated' });
    } catch (error) {
        res.status(500).json({ error: 'Database connection error' });
    }
};

export const updateInventory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { inventory_count } = req.body;
    try {
        const [result] = await pool.query<ResultSetHeader>('UPDATE grocery_items SET inventory_count = ? WHERE id = ?', [inventory_count, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Grocery item not found' });
        }
        res.status(200).json({ message: 'Inventory updated' });
    } catch (error) {
        res.status(500).json({ error: 'Database connection error' });
    }
};
