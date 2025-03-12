import React, { useEffect, useState } from "react";
import loginbg from "../assets/images/LOGIN-BG.jpeg";
import error from "../assets/svgs/error.svg";
import { setUser, updateUser } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../redux/slices/notificationSlice";
import { config } from "../lib/config";
const SignIn = () => {
  const userAvailable = useSelector((state) => state.user.user);

  useEffect(() => {
    if (userAvailable?.name) navigate("/");
  }, [window.onload]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async () => {
    if (email.length < 3 || !emailFormatChecker(email) || password.length < 3) {
      setValid(false);
      setTimeout(() => {
        setValid(true);
      }, 3000);
      return;
    }

    const API = config.server;
    const SERVER_SECRET = config.serverSecret;
    try {
      const r = await fetch(`${API}/api/user/signin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          secret: SERVER_SECRET,
        },
        body: JSON.stringify({ email, password }),
      });
      const d = await r.json();
      if (d.success === false) {
        setValid(false);
        setTimeout(() => {
          setValid(true);
        }, 5000);
        return;
      }

      const response = await fetch(`${API}/api/user/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          secret: SERVER_SECRET,
          authToken: d.authToken,
        },
      });
      const data = await response.json();
      if (data.success === false) {
        setValid(false);
        setTimeout(() => {
          setValid(true);
        }, 5000);
        return;
      }
      console.log("1")
      dispatch(setUser(data));
      dispatch(updateUser());
      localStorage.setItem("authy", d.authToken);
      dispatch(
        setNotification({
          message: `Welcome back ${data.name}`,
          type: "success",
          logo: "tick",
        }),
      );
      navigate("/");
      window.location.reload();
    } catch (err) {
      dispatch(
        setNotification({
          message: " Unable to login, please try again",
          type: "error",
          logo: "error",
        }),
      );
    }
  };

  const fill = () => {
    setPassword("fakepassword");
    setEmail("fakemail@email.com");
  }

  const emailFormatChecker = (email) => {
    if (email.length === 0) return true;
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="flex h-[90vh] w-screen items-center justify-center gap-6 lg:gap-12 xl:gap-20">
      <div className="w-fit">
        <img
          src={loginbg}
          alt="LOGIN BACKGROUND"
          className="w-0 rounded-3xl md:block md:w-[40vw] lg:w-[30vw]"
        />
      </div>

      <div className="h-[80vh] w-[90vw] md:h-[70vh] md:w-[40vw] lg:h-[60vh]">
        <div className="flex h-full flex-col items-center justify-center">
          <h2 className="sub-heading mb-12 ml-4 tracking-tight">
            WELCOME BACK TO VEGAN CORNER!
          </h2>
          <h3 className="mb-8 ml-4 text-center font-janime text-2xl font-semibold tracking-widest text-brown md:text-3xl">
            SIGN IN
          </h3>

          <form onSubmit={submit} className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <h2 className="group ml-4 text-3xl font-bold text-brown">😊</h2>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="h-12 w-[60vw] rounded-2xl border-2 border-brown px-4 py-2 ring-orange focus:ring-4 md:w-[30vw]"
              />
            </div>
            <label htmlFor="email" className="font-semibold text-red-600">
              {!emailFormatChecker(email) && "Invalid Email"}
            </label>

            <div className="flex items-center gap-2">
              <h2 className="group ml-4 text-3xl font-bold text-brown">🔒</h2>
              <input
                onKeyDown={(e) => e.key === "Enter" && submit()}
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="h-12 w-[60vw] rounded-2xl border-2 border-brown px-4 py-2 ring-orange focus:ring-4 md:w-[30vw]"
              />
            </div>

            <div className="ml-4 mt-2 flex w-full flex-col items-center gap-4 md:mt-4">
              <div className={` ${valid && "hidden"} flex items-center gap-6`}>
                <img
                  src={error}
                  alt="error"
                  className="h-4 w-4 animate-ping md:h-6 md:w-6"
                />
                <h2 className="font-bold text-red-700">
                  Invalid Email or Password
                </h2>
              </div>
              <div className="flex w-[85%] flex-col justify-end">
                <h2
                  className="cursor-pointer text-end font-bold text-orange transition-all hover:text-purple-700"
                  onClick={() => navigate("/signup")}
                >
                  New User? SIGN UP
                </h2>
                <h2
                  className="cursor-pointer text-end font-bold text-orange transition-all hover:text-purple-700"
                  onClick={() =>
                    window.open(
                      "https://veganseller.princekb.tech",
                      "_blank",
                      "noopener",
                    )
                  }
                >
                  Seller SIGNIN
                </h2>
              </div>
              <div
                onClick={submit}
                className="mx-2 mt-0 cursor-pointer rounded-2xl bg-darkbrown px-4 py-2 font-bold text-white transition-all hover:scale-105 hover:bg-brown"
              >
                SIGN IN &#8702;
              </div>
              <div
                onClick={()=>{fill();}}
                className="mx-2 mt-0 cursor-pointer rounded-2xl bg-darkbrown px-4 py-2 font-bold text-white transition-all hover:scale-105 hover:bg-brown"
              >
                QUICK SIGN IN &#8702;
                <p className="mt-1 text-center text-xs font-thin tracking-tight">
                  No password required
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
