import teacherDb from '../repository/teacher.db';
import { Teacher } from '../model/teacher';

const getAllTeachers = async (): Promise<Teacher[]> => {
    try {
        const teachersPrisma = await database.teacher.findMany({
            include: { user: true },
        });
        return teachersPrisma.map((teacherPrisma) => Teacher.from(teacherPrisma));
    } catch (error) {
        throw new Error('Database error while fetching teachers.');
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
