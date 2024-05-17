import { Router } from 'express';
import {
    addGroceryItem,
    viewGroceryItems,
    removeGroceryItem,
    updateGroceryItem,
    updateInventory
} from '../controllers/adminController';

const router = Router();

/**
 * @swagger
 * /admin/add:
 *   post:
 *     summary: Add a new grocery item
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               inventory_count:
 *                 type: integer
 *             example:
 *               name: Apple
 *               price: 1.99
 *               inventory_count: 100
 *     responses:
 *       201:
 *         description: Grocery item added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 inventory_count:
 *                   type: integer
 */
router.post('/add', addGroceryItem);

/**
 * @swagger
 * /admin/view:
 *   get:
 *     summary: View existing grocery items
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of grocery items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   inventory_count:
 *                     type: integer
 */
router.get('/view', viewGroceryItems);

/**
 * @swagger
 * /admin/remove/{id}:
 *   delete:
 *     summary: Remove a grocery item
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the grocery item to remove
 *     responses:
 *       200:
 *         description: Grocery item removed
 *       404:
 *         description: Grocery item not found
 */
router.delete('/remove/:id', removeGroceryItem);

/**
 * @swagger
 * /admin/update/{id}:
 *   put:
 *     summary: Update details of an existing grocery item
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the grocery item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               inventory_count:
 *                 type: integer
 *             example:
 *               name: Banana
 *               price: 1.50
 *               inventory_count: 200
 *     responses:
 *       200:
 *         description: Grocery item updated
 *       404:
 *         description: Grocery item not found
 */
router.put('/update/:id', updateGroceryItem);

/**
 * @swagger
 * /admin/inventory/{id}:
 *   patch:
 *     summary: Update inventory levels of a grocery item
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the grocery item to update inventory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               inventory_count:
 *                 type: integer
 *             example:
 *               inventory_count: 150
 *     responses:
 *       200:
 *         description: Inventory updated
 *       404:
 *         description: Grocery item not found
 */
router.patch('/inventory/:id', updateInventory);

export default router;
