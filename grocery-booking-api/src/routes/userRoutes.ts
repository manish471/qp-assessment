import { Router } from 'express';
import { viewGroceryItems, bookGroceryItems } from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * /user/view:
 *   get:
 *     summary: View available grocery items
 *     tags: [User]
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
 * /user/book:
 *   post:
 *     summary: Book multiple grocery items in a single order
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *             example:
 *               userId: 1
 *               items:
 *                 - id: 1
 *                   quantity: 3
 *                 - id: 2
 *                   quantity: 2
 *     responses:
 *       201:
 *         description: Order created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       quantity:
 *                         type: integer
 */
router.post('/book', bookGroceryItems);

export default router;
