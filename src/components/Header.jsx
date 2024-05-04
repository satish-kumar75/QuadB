import React, { useState, useEffect } from "react";
import { MdMyLocation } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../store/firebase";
import { addUser, removeUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = ({ onAddTask, onFetchUserLocation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/home");
        toast.success("Logged in successfully");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="bg-haiti-900/20 p-4 relative">
      <Toaster position="top-center" richColors />
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">To-Do App</h1>
        {user ? (
          <div>
            <RxHamburgerMenu
              className={`block sm:hidden text-3xl cursor-pointer ${
                menuOpen ? "hidden" : "block"
              }`}
              onClick={toggleMenu}
            />
            <IoMdClose
              className={`block sm:hidden text-3xl cursor-pointer ${
                menuOpen ? "block" : "hidden"
              }`}
              onClick={toggleMenu}
            />
            {menuOpen && (
              <div
                className="fixed max-w-screen-sm h-full inset-0 bg-black bg-opacity-25 z-10"
                onClick={closeMenu}
              ></div>
            )}
            <div
              className={`menu sm:flex items-center gap-4 ${
                menuOpen ? "menuactive" : ""
              }`}
            >
              <button
                className="flex items-center px-4 py-2 bg-purple-heart-500 text-white rounded hover:bg-purple-heart-600 focus:outline-none transition duration-300"
                onClick={onFetchUserLocation}
              >
                <MdMyLocation size={20} />
              </button>
              <button
                className="px-4 py-2 bg-purple-heart-500 text-white rounded hover:bg-purple-heart-600 focus:outline-none transition duration-300"
                onClick={onAddTask}
              >
                Add Task
              </button>
              <button
                className="px-4 py-2 bg-purple-heart-500 text-white rounded hover:bg-purple-heart-600 focus:outline-none transition duration-300"
                onClick={handleSignout}
              >
                Logout
              </button>
            </div>{" "}
          </div>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-purple-heart-500 text-white rounded hover:bg-purple-heart-600 focus:outline-none transition duration-300"
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
