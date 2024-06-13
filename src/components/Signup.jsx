import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../shared/userInputSchema";
import { useNavigate } from "react-router-dom";
import url from "../../config.js";

function Signup({ setUser }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);

  const handleSave = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      setMessage(res.message);

      {
        setTimeout(() => {
          setUser(res.email);
        }, 2000);
      }
      console.log("hereee: ", res);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center py-24 items-center text-xl relative">
        {message && (
          <div className="w-1/4 h-9 bg-green-100 rounded-sm absolute top-20 flex justify-center items-center">
            {message}
          </div>
        )}
        <form
          action=""
          onSubmit={handleSubmit(handleSave)}
          className="w-2/5 h-2/3 flex flex-col items-center justify-center gap-10 bg-zinc-700 p-9 rounded"
        >
          <div className="flex flex-col w-3/5 gap-2 justify-center">
            <label htmlFor="email" className="text-left text-gray-200">
              Email
            </label>
            <input
              type="email"
              className="rounded-sm"
              placeholder="abc@gmail.com"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-left text-orange-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-3/5 gap-2 justify-center">
            <label htmlFor="password" className="text-left text-gray-200">
              Password
            </label>

            <input
              type="password"
              className="rounded-sm"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-left text-orange-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            disabled={isSubmitting}
            className="flex w-3/5 mt-5 justify-center bg-amber-600 py-1 rounded-sm"
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
          {errors && console.log(errors)}
        </form>
      </div>
    </>
  );
}

export default Signup;
