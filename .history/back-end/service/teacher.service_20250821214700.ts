import teacherDb from '../repository/teacher.db';
import { Teacher } from '../model/teacher';

const getAllTeachers = async (): Promise<Teacher[]> => {
    try {
        return await teacherDb.getAllTeachers();
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

const updateLearningPath = async (
    teacherId: number,
    learningPath: string
): Promise<Teacher | null> => {
    try {
        return await teacherDb.updateLearningPath(teacherId, learningPath);
    } catch (error) {
        throw new Error('Database error while updating teacher.');
    }
};

export default { getAllTeachers, updateLearningPath };
