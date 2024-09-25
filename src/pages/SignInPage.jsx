import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "../api";
import { useMutation } from "@tanstack/react-query";

const SignInPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const { mutate } = useMutation({ mutationFn: useSignIn })

  const onSubmit = (data) => {
    setIsLoading(true);
    mutate(data, {
      onSuccess: (res) => {
        setIsLoading(false);
        if (res.token) {
          localStorage.setItem('token', res.token);
          navigate('/list-tasks');
        }
      },
      onError: (err) => {
        setMessage(err.response.data.message);
        setIsLoading(false)
      }
    })
  }

  return (
    <div className="flex mt-10 flex-col">
      <div className="flex justify-center">
        <p className="font-inter text-3xl font-bold">Đăng nhập</p>
      </div>
      
      <form className="flex flex-col gap-5 w-1/3 border border-black p-8 mx-auto mt-8 rounded-md" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-gray-700">
            Email/Username
          </label>
          <input
            type="text"
            id="username"
            className="p-2 border rounded-lg"
            placeholder="Enter your username"
            {...register("username", { required: "Trường bắt buộc" })}
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="p-2 border rounded-lg"
            placeholder="Enter your password"
            {...register("password", { required: "Trường bắt buộc" })}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <div className="flex flex-col items-center gap-5">
          <button
            className="text-xl text-white w-full py-2 rounded-lg"
            type="submit"
            style={{
              background: "linear-gradient(to right, #7FC7D9, #365486, #0F1035)",
            }}
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            Đăng nhập
          </button>

          <p className="flex gap-2 base-semibold">
            Bạn chưa có tài khoản?
            <Link to={'/sign-up'} className="text-red-500">
              Đăng ký
            </Link>
          </p>
        </div>
      </form>
      <p className="text-red-500 text-center mt-2">{message}</p>
    </div>
  )
}

export default SignInPage