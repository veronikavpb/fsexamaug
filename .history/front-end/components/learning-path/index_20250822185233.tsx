import TeacherService from "@services/TeacherService";
import { useState } from "react";
import { mutate } from "swr";

type Props = {
  teacherId: number;
  learningPath: string;
};

const LearningPath: React.FC<Props> = ({ teacherId, learningPath }: Props) => {
  const [currentLearningPath, setCurrentLearningPath] = useState(learningPath);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleLearningPathChange = async (event: {
    target: { value: string };
  }) => {
    const newLearningPath = event.target.value;
    setCurrentLearningPath(newLearningPath);
    setIsUpdating(true);

    try {
      const response = await TeacherService.updateLearningPath(
        teacherId,
        newLearningPath
      );

      if (response.ok) {
        mutate("Teachers");
      } else {
        setCurrentLearningPath(learningPath);
        console.error("Failed to update learning path");
      }
    } catch (error) {
      setCurrentLearningPath(learningPath);
      console.error("Error updating learning path:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="ml-6">
      <select
        id="learningPath"
        className="ml-2 p-1 border border-gray-300 rounded"
        value={currentLearningPath}
        onChange={handleLearningPathChange}
        disabled={isUpdating}
      >
        <option value="Infrastructure">Infrastructure</option>
        <option value="Software development">Software development</option>
        <option value="Cybersecurity">Cybersecurity</option>
      </select>
      {isUpdating && (
        <span className="ml-2 text-sm text-gray-500">Updating...</span>
      )}
    </div>
  );
};

export default LearningPath;
