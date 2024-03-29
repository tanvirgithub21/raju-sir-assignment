/* eslint-disable no-const-assign */
import React, { useContext } from "react";
import google from "../../Images/google.svg";
import sing_up from "../../Images/sing_up.png";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { FirebaseAuth } from "../../Context/FirebaseAuthProvider/FirebaseAuthProvider";

const SingUp = () => {
  const { register, handleSubmit, reset } = useForm();
  const { CreateAccountEmailAndPass, LoginAndSignInWithGoogle, currentUser } =
    useContext(FirebaseAuth);

  //get current user
  const [user] = currentUser;

  // navigate home targeted route
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (user) {
    navigate(from, { replace: true });
  }

  // handle create new account
  const handleCreateEmailPass = async (data) => {
    const { name, email, username, password, confirm_password } = data;

    // make server post data formate
    const postData = {
      name,
      email,
      username: username.toLowerCase(),
      loginRecords: [{ provider: "email" }],
    };

    if (email && name && password && confirm_password) {
      if (password === confirm_password) {
        CreateAccountEmailAndPass(email, password, postData);
        reset();
      }
    }
  };

  return (
    <div className="md:flex h-screen">
      {/* image  */}
      <div className="flex-1 h-[calc(100vh-70px)] flex justify-center items-center">
        <img className="w-auto h-auto" src={sing_up} alt="login img" />
      </div>

      {/* login form  */}
      <div className="flex-1 h-[calc(100vh-70px)] flex justify-center items-center ">
        <div className="max-w-[26rem] min-w-[25rem] p-4 bg-gray-50 rounded-md">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              Create a new account
            </h2>
          </div>

          <form onSubmit={handleSubmit(handleCreateEmailPass)}>
            <div className="flex flex-col mb-2">
              <label htmlFor="name" className="text-gray-600 text-base ">
                Full Name
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                name="name"
                id="name"
                className="border-none"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="email" className="text-gray-600 text-base ">
                Email Address
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                id="email"
                className="border-none"
              />
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="username" className="text-gray-600 text-base ">
                Username
              </label>
              <input
                {...register("username", { required: true })}
                type="text"
                name="username"
                id="username"
                className="border-none"
              />
            </div>

            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="text-gray-600 text-base ">
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                name="password"
                id="password"
                className="border-none"
              />
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="confirm_password"
                className="text-gray-600 text-base "
              >
                Confirm Password
              </label>
              <input
                {...register("confirm_password", { required: true })}
                type="password"
                name="confirm_password"
                id="confirm_password"
                className="border-none"
              />
            </div>

            <div className="mb-6">
              <button
                type="submit"
                className="bg-[#2563EB] w-full text-white text-lg font-medium py-2 rounded-md"
              >
                Sing Up
              </button>
            </div>

            <div className="mb-2">
              <p>
                You already have a account?
                <span className="text-[#2563EB]"> Login</span>
              </p>
            </div>

            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                OR
              </p>
            </div>
          </form>

          <div className="mb-2">
            <button
              onClick={LoginAndSignInWithGoogle}
              type="submit"
              className="bg-[#2563EB] w-full h-14 text-white text-lg font-medium border-2 border-[#2563EB] rounded-md flex items-center"
            >
              <img
                className="w-16 h-full rounded-l-md bg-white mr-6"
                src={google}
                alt="google icon"
              />
              <span className="text-lg">Sign in with google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
