/* ******************************** Import Packages ***************************** */
import React, { useState } from "react";

/* ******************************** Import Components **************************** */
import SideBar from "./sidebar";
import Content from "./content";
import Modal from "../components/modal";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="Background">
      <div className="grid grid-cols-5 gap-x-4 gap-y-4 p-4">
        <div
          className={`col-span-1 w-full `}
        >
          <div className="w-full ">
            <div
              className="h-[95vh] bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl px-8 pt-5 pb-5 w-full max-w-md border border-white/30 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/30 before:to-transparent before:pointer-events-none"
            >
              <SideBar
                setIsOpen={setIsOpen}
              />
            </div>
          </div>
        </div>
        <div className="col-span-4 w-full">
          <div className="w-full">
            <div
              className="h-[95vh] bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl px-8 pt-5 pb-5 w-full border border-white/30 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/30 before:to-transparent before:pointer-events-none"
            >
              <Content />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={"Logout"}
        centerModal={true}
        SubmitTxt={"Logout"}
        onSubmit={() => {
          localStorage.removeItem("loggedUser");
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          // navigate("/login");
          window.location.href = "/login";
          setIsOpen(false);
        }}
        width={"w-[350px]"}
      >
        <p className='text-center px-3 pb-4'>Are you sure you want to logout?</p>
      </Modal>
    </div>
  );
};

export default Layout;
