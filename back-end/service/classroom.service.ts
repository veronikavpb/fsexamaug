import classroomDb from '../repository/classroom.db';
import { Classroom } from '../model/classroom';

const createClassroom = async (name: string): Promise<Classroom> => {
    // Check if classroom already exists
    const existingClassroom = await classroomDb.getClassroomByName(name);

    if (existingClassroom) {
        throw new Error(`Classroom with name "${name}" already exists.`);
    }

    // Create new classroom
    const classroom = new Classroom({ name });
    return await classroomDb.createClassroom(classroom);
};

export default {
    createClassroom,
};
