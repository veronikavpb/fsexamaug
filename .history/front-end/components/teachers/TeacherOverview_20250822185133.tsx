import LearningPath from "@components/learning-path";
import { Teacher, User } from "@types";
import { useEffect, useState } from "react";

type Props = {
  teachers: Teacher[];
};

const TeacherOverview: React.FC<Props> = ({ teachers }: Props) => {
  const [loggedInUser, setLoggedInUser] = useState<User>(null);

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedInUser")));
  }, []);

  return (
    <>
      <section className="mt-5">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th
                scope="col"
                className="border border-gray-300 px-4 py-2 text-left"
              >
                Name
              </th>
              <th
                scope="col"
                className="border border-gray-300 px-4 py-2 text-left"
              >
                Learning path
              </th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {teacher.user.firstName} {teacher.user.lastName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {loggedInUser?.role === "admin" ? (
                    <LearningPath
                      teacherId={teacher.id}
                      learningPath={teacher.learningPath}
                    />
                  ) : (
                    teacher.learningPath
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default TeacherOverview;
