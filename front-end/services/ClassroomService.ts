const createClassroom = (classroomData: { name: string }) => {
  const loggedInUser = sessionStorage.getItem("loggedInUser")
    ? JSON.parse(sessionStorage.getItem("loggedInUser"))
    : null;

  return fetch(process.env.NEXT_PUBLIC_API_URL + "/classrooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loggedInUser?.token}`,
    },
    body: JSON.stringify(classroomData),
  });
};

const ClassroomService = {
  createClassroom,
};

export default ClassroomService;
