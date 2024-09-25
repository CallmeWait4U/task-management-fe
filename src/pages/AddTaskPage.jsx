import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAddTask } from "../api";
import { useNavigate } from "react-router-dom";

const AddTaskPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { mutate } = useMutation({ mutationFn: useAddTask })
    const navigate = useNavigate()
  
    const onSubmit = (data) => {
        mutate(data, {
            onSuccess: (res) => {
                alert(res);
                navigate('/list-tasks');
            }
        })
    }
    return (
        <div className="flex mt-10 flex-col">
            <div className="flex justify-center">
                <p className="font-inter text-3xl font-bold">Thêm mới công việc</p>
            </div>
            
            <form className="flex flex-col gap-5 w-1/3 border border-black p-8 mx-auto mt-8 rounded-md" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row gap-2">
                    <label htmlFor="title" className="text-gray-700 w-1/3">
                        Tiêu đề
                    </label>
                    <div className="flex flex-col gap-2 w-2/3">
                        <input
                            type="text"
                            id="title"
                            className="p-2 border rounded-lg"
                            placeholder="Tiêu đề..."
                            {...register("title", { required: "Trường bắt buộc" })}
                        />
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                        {!errors.title && <p className="text-red-500 text-white">.</p>}
                    </div>
                </div>
                <div className="flex flex-row gap-2">
                    <label htmlFor="description" className="text-gray-700 w-1/3">
                        Mô tả
                    </label>
                    <div className="flex flex-col gap-2 w-2/3">
                        <textarea
                            id="description"
                            className="p-2 border rounded-lg h-20"
                            placeholder="Mô tả..."
                            {...register("description", { required: "Trường bắt buộc" })}
                        />
                        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                        {!errors.description && <p className="text-red-500 text-white">.</p>}
                    </div>
                </div>
                <div className="flex flex-row gap-2">
                    <label htmlFor="deadline" className="text-gray-700 w-1/3">
                        Deadline
                    </label>
                    <div className="flex flex-col gap-2 w-2/3">
                        <input
                            type="date"
                            id="deadline"
                            className="p-2 border rounded-lg"
                            placeholder="Dedline..."
                            {...register("deadline", { required: "Trường bắt buộc" })}
                        />
                        {errors.deadline && <p className="text-red-500">{errors.deadline.message}</p>}
                        {!errors.deadline && <p className="text-red-500 text-white">.</p>}
                    </div>
                </div>

                <div className="flex flex-col items-center gap-5">
                <button
                    className="text-xl text-white w-full py-2 rounded-lg"
                    type="submit"
                    style={{
                    background: "rgba(230, 45, 45, 0.8)",
                    }}
                    onClick={handleSubmit(onSubmit)}
                >
                    Thêm mới
                </button>
                </div>
            </form>
        </div>
    )
}

export default AddTaskPage