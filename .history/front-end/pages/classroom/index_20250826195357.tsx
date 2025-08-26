import Header from "@components/header";
import ClassroomForm from "@components/classroom/ClassroomForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { User } from "@types";

const Classroom: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser")
      ? JSON.parse(sessionStorage.getItem("loggedInUser"))
      : null;
    setLoggedInUser(user);
    setIsLoading(false);
  }, []);

  // Still loading user data
  if (isLoading) {
    return (
      <>
        <Head>
          <title>{t("classroom.title")}</title>
        </Head>
        <Header />
        <main className="p-6 min-h-screen flex flex-col items-center">
          <p>Loading...</p>
        </main>
      </>
    );
  }

  // Check if user is admin
  if (!loggedInUser || loggedInUser?.role !== "admin") {
    return (
      <>
        <Head>
          <title>{t("classroom.title")}</title>
        </Head>
        <Header />
        <main className="p-6 min-h-screen flex flex-col items-center">
          <div className="mt-10 p-6 bg-red-100 border border-red-300 rounded-md">
            <p className="text-red-800">{t("errors.unauthorized")}</p>
          </div>
        </main>
      </>
    );
  }

  const handleSuccess = (classroom: any) => {
    setErrorMessage("");
    setSuccessMessage(
      t("classroom.form.success").replace("{id}", classroom.id)
    );
  };

  const handleError = (message: string) => {
    setSuccessMessage("");
    setErrorMessage(message);
  };

  return (
    <>
      <Head>
        <title>{t("classroom.title")}</title>
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">{t("classroom.title")}</h1>

        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-md max-w-md w-full">
            <p className="text-green-800">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded-md max-w-md w-full">
            <p className="text-red-800">{errorMessage}</p>
          </div>
        )}

        <ClassroomForm onSuccess={handleSuccess} onError={handleError} />
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Classroom;
