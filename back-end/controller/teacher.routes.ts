/**
 * @swagger
 *   components:
 *    schemas:
 *      Teacher:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            learningPath:
 *              type: string
 *              description: Learning path.
 *            user:
 *              $ref: '#/components/schemas/User'
 */
import express, { NextFunction, Request, Response } from 'express';
import teacherService from '../service/teacher.service';

const teacherRouter = express.Router();

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get the list of teachers
 *     responses:
 *       200:
 *         description: The list of teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Teacher'
 */
teacherRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {});

/**
 * @swagger
 * /teachers/{teacherId}/learningPath:
 *   put:
 *     summary: Update the learning path of a teacher
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The teacher ID
 *       - in: query
 *         name: learningPath
 *         required: true
 *         schema:
 *           type: string
 *         description: The learning path
 *     responses:
 *       200:
 *         description: The teacher with the updated learning path
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 */
teacherRouter.put(
    '/:teacherId/learningpath',
    async (req: Request, res: Response, next: NextFunction) => {}
);

export { teacherRouter };
