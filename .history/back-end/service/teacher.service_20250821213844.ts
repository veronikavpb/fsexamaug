import teacherDb from '../repository/teacher.db';
import { Teacher } from '../model/teacher';

const getAllTeachers = async (): Promise<Teacher[]> => {
    try {
        // teacherDb should return prisma rows with { user } included
        const rows = await teacherDb.getAllTeachers();
        return rows.map(Teacher.from);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

const updateLearningPath = async (
    teacherId: number,
    learningPath: string
): Promise<Teacher | null> => {
    try {
        const updated = await database.teacher.update({
            where: { id: teacherId },
            data: { learningPath },
            include: { user: true },
        });
        return Teacher.from(updated);
    } catch (error) {
        throw new Error('Database error while updating teacher.');
    }
};

export default { getAllTeachers, updateLearningPath };
