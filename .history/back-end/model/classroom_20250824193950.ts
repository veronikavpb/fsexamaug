import { Classroom as ClassroomPrisma } from '@prisma/client';

export class Classroom {
    readonly id?: number;
    readonly name: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;

    constructor(classroom: { id?: number; name: string; createdAt?: Date; updatedAt?: Date }) {
        this.validate(classroom);

        this.id = classroom.id;
        this.name = classroom.name;
        this.createdAt = classroom.createdAt;
        this.updatedAt = classroom.updatedAt;
    }

    validate(classroom: { name: string }) {
        if (!classroom.name?.trim()) {
            throw new Error('Classroom name is required');
        }
    }

    equals(other: Classroom): boolean {
        return this.id === other.id && this.name === other.name;
    }

    static from(classroom: ClassroomPrisma): Classroom {
        return new Classroom({
            id: classroom.id,
            name: classroom.name,
            createdAt: classroom.createdAt,
            updatedAt: classroom.updatedAt,
        });
    }
}
