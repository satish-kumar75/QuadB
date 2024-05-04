import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkValidData } from "../store/validate";
import { auth } from "../store/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import Header from "../components/Header";
import login from "../assets/login.svg";
import { Toaster, toast } from "sonner";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = async () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    const message = checkValidData(emailValue, passwordValue);
    setErrorMessage(message);

    try {
      if (!isSignIn) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          emailValue,
          passwordValue
        );
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: name.current.value,
        });
        const { uid, email, displayName } = auth.currentUser;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/home");
      } else {
        await signInWithEmailAndPassword(auth, emailValue, passwordValue);
        navigate("/home");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Invalid credentials");
    }
  };

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div>
      <Toaster position="top-center" richColors />
      <Header />
      <div className="login flex flex-col items-center justify-center p-7 sm:p-0">
        <div className="w-full md:w-3/4 lg:w-8/12 bg-purple-heart-950 p-10 rounded-lg text-purple-heart-200">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="w-full md:w-8/12 mb-6 md:mb-0">
              <img className="w-full h-auto" src={login} alt="" />
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full md:w-8/12 flex flex-col justify-center text-white"
            >
              <div>
                <p className="text-4xl mb-4">
                  {isSignIn ? "Sign In" : "Sign Up"}
                </p>
                {!isSignIn && (
                  <input
                    ref={name}
                    className="w-full bg-transparent border border-purple-heart-700 rounded-md px-3 py-3 outline-none mb-5"
                    type="text"
                    placeholder="Full Name"
                  />
                )}
                <input
                  ref={email}
                  className="w-full bg-transparent border border-purple-heart-700 rounded-md px-3 py-3 outline-none"
                  type="text"
                  placeholder="Email or Phone Number"
                />
                <input
                  ref={password}
                  className="w-full bg-transparent border border-purple-heart-700 rounded-md px-3 py-3 outline-none my-5"
                  type="password"
                  placeholder="Password"
                />
                <p className="text-red-500 font-semibold">{errorMessage}</p>
                <div className="w-1/2 m-auto">
                  <button
                    className="px-4 py-2 w-full bg-purple-heart-500 text-white rounded hover:bg-purple-heart-600 focus:outline-none transition duration-300"
                    onClick={handleSubmit}
                  >
                    {isSignIn ? "Sign In" : "Sign Up"}
                  </button>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="flex items-center gap-2">
                    <input type="checkbox" />
                    Remember me
                  </span>
                  <p>Need help?</p>
                </div>
                <div className="mt-9">
                  <span>{isSignIn ? "New User?" : "Already registered"}</span>
                  <Link
                    to={"/"}
                    className="font-medium ml-2 text-purple-400"
                    onClick={toggleSignIn}
                  >
                    {isSignIn ? "Sign Up now" : "Sign In now"}
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
