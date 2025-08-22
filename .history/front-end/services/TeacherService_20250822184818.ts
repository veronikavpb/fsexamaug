const getAllTeachers = () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/teachers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const updateLearningPath = (teacherId: number, learningPath: string) => {
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  return fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/teachers/${teacherId}/learningpath?learningPath=${encodeURIComponent(
        learningPath
      )}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInUser?.token}`,
      },
    }
  );
};

const TeacherService = {
  getAllTeachers,
  updateLearningPath,
};

export default TeacherService;
