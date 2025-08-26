/**
 * @swagger
 *   components:
 *    schemas:
 *      Classroom:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Classroom name.
 *            createdAt:
 *              type: string
 *              format: date-time
 *            updatedAt:
 *              type: string
 *              format: date-time
 *      ClassroomInput:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: Classroom name.
 */
import express, { NextFunction, Request, Response } from 'express';
import classroomService from '../service/classroom.service';
import { ClassroomInput } from '../types/index';

const classroomRouter = express.Router();

/**
 * @swagger
 * /classrooms:
 *   post:
 *     summary: Create a new classroom (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassroomInput'
 *     responses:
 *       201:
 *         description: The created classroom
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Classroom'
 */
classroomRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as any;
        // Check if user is admin
        if (!authReq.auth || authReq.auth.role !== 'admin') {
            return res.status(403).json({
                status: 'forbidden',
                message: 'Admin access required',
            });
        }

        const classroomInput = req.body as ClassroomInput;

        // Validate input
        if (!classroomInput.name || !classroomInput.name.trim()) {
            return res.status(400).json({
                status: 'error',
                message: 'Classroom name is required',
            });
        }

        const classroom = await classroomService.createClassroom(classroomInput.name.trim());
        res.status(201).json(classroom);
    } catch (error) {
        if (error.message.includes('already exists')) {
            res.status(400).json({
                status: 'error',
                message: error.message,
            });
        } else {
            next(error);
        }
    }
});

export { classroomRouter };
