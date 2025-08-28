import { User } from "@types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User>(null);

  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedInUser")));
  }, []);

  const handleClick = () => {
    sessionStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <header className="p-3 mb-3 border-bottom bg-gradient-to-br from-gray-900 to-gray-600 flex flex-col items-center">
      <a className="flex  mb-2 md:mb-5 text-white-50 text-3xl text-gray-300">
        {t("app.title")}
      </a>
      <nav className="items-center flex md:flex-row flex-col">
        <Link
          href="/"
          className=" px-4 text-xl text-white  hover:bg-gray-600 rounded-lg"
        >
          {t("header.nav.home")}
        </Link>

        {loggedInUser?.role === "admin" && (
          <Link
            href="/classroom"
            className="px-4 text-xl text-white hover:bg-gray-600 rounded-lg"
          >
            {t("header.nav.add-classroom")}
          </Link>
        )}

        <Link
          href="/teachers"
          className="px-4 text-xl text-white hover:bg-gray-600 rounded-lg"
        >
          {t("header.nav.teachers")}
        </Link>

        {!loggedInUser && (
          <Link
            href="/login"
            className="px-4  text-white text-xl hover:bg-gray-600 rounded-lg"
          >
            {t("header.nav.login")}
          </Link>
        )}
        {loggedInUser && (
          <a
            href="/login"
            onClick={handleClick}
            className="px-4  text-white text-xl hover:bg-gray-600 rounded-lg"
          >
            {t("header.nav.logout")}
          </a>
        )}
        {loggedInUser && (
          <div className="text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
            {t("header.welcome")}, {loggedInUser.fullname}!
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
