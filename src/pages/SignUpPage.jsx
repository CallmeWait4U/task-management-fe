import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'
import { useSignUp } from "../api";

const SignUpPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const { mutate } = useMutation({ mutationFn: useSignUp })

  const onSubmit = (data) => {
    setIsLoading(true);
    mutate(data, {
      onSuccess: (res) => {
        alert(res)
        setIsLoading(false);
        navigate('/sign-in')
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
        <p className="font-inter text-3xl font-bold">Đăng ký</p>
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
          {!errors.username && <p className="text-red-500 text-white">.</p>}
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
          {!errors.password && <p className="text-red-500 text-white">.</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="passwordConfirm" className="text-gray-700">
            Confirm password
          </label>
          <input
            type="password"
            id="passwordConfirm"
            className="p-2 border rounded-lg"
            placeholder="Confirm your password"
            {...register("passwordConfirm", { required: "Trường bắt buộc" })}
          />
          {errors.passwordConfirm && <p className="text-red-500">{errors.passwordConfirm.message}</p>}
          {!errors.passwordConfirm && <p className="text-red-500 text-white">.</p>}
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
            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </div>
      </form>
      <p className="text-red-500 text-center mt-2">{message}</p>
    </div>
  )
}

export default SignUpPage