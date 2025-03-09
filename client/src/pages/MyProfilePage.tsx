import { IoArrowBackOutline } from "react-icons/io5";
import { Outlet, useNavigate } from "react-router";

import NavBar from "../components/NavBar";

const MyProfilePage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const navLinks = [
    {
      heading: "Основное",
      link: "/myProfile/core",
    },
    {
      heading: "Учетные данные",
      link: "/myProfile/credentials",
    },
  ];

  return (
    <>
      <IoArrowBackOutline
        className="text-primary text-hover"
        size={25}
        onClick={handleBackClick}
      />
      <div className="flex flex-col gap-10 my-8 pt-8 rounded-2xl">
        <NavBar links={navLinks} styles={"mx-auto"} />

        <Outlet />
      </div>
    </>
  );
};
export default MyProfilePage;
