import { useState } from "react";
import { useTranslation } from "next-i18next";
import ClassroomService from "@services/ClassroomService";

type Props = {
  onSuccess: (classroom: any) => void;
  onError: (message: string) => void;
};

const ClassroomForm: React.FC<Props> = ({ onSuccess, onError }: Props) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const validate = (): boolean => {
    setNameError("");

    if (!name || !name.trim()) {
      setNameError(t("classroom.form.validation.nameRequired"));
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await ClassroomService.createClassroom({
        name: name.trim(),
      });

      if (response.ok) {
        const classroom = await response.json();
        onSuccess(classroom);
        setName(""); // Clear input on success
      } else {
        const errorData = await response.json();
        onError(errorData.message || t("classroom.form.error.general"));
      }
    } catch (error) {
      onError(t("classroom.form.error.general"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label
          htmlFor="classroomName"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {t("classroom.form.name")}
        </label>
        <input
          id="classroomName"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        />
        {nameError && <p className="mt-1 text-sm text-red-600">{nameError}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isSubmitting ? "Adding..." : t("classroom.form.submit")}
      </button>
    </form>
  );
};

export default ClassroomForm;
