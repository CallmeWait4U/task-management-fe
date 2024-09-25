import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useGetTask, useUpdateTask } from "../api";
import { useMutation } from "@tanstack/react-query";

const DetailTaskPage = () => {
    const location = useLocation()
    const id = location.pathname.split('/')[2]

    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const { data: task, refetch } = useGetTask(id);
    const { mutate } = useMutation({ mutationFn: useUpdateTask })

    useEffect(() => {
        if (task) {
            const deadline = new Date(task.deadline)
            reset({...task, deadline: `${deadline.getFullYear()}-${deadline.getMonth() + 1 < 10 ? '0' + (deadline.getMonth() + 1) : deadline.getMonth() + 1}-${deadline.getDate()}`});
        }
    }, [task, reset])
  
    const onSubmit = (data) => {
        mutate(data, {
            onSuccess: (res) => {
                alert(res);
                refetch();
            }
        })
    }
    
    return (
        <div className="flex mt-10 flex-col">
            <div className="flex justify-center">
                <p className="font-inter text-3xl font-bold">Chi tiết công việc</p>
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
                            placeholder="Deadline..."
                            {...register("deadline", { required: "Trường bắt buộc" })}
                        />
                        {errors.deadline && <p className="text-red-500">{errors.deadline.message}</p>}
                        {!errors.deadline && <p className="text-red-500 text-white">.</p>}
                    </div>
                </div>
                <div className="flex flex-row gap-2">
                    <label htmlFor="status" className="text-gray-700 w-1/3">
                        Trạng thái
                    </label>
                    <div className="flex flex-col gap-2 w-2/3">
                        <select
                            id="status"
                            className="p-2 border rounded-lg"
                            {...register("status", { required: "Trường bắt buộc" })}
                        >
                            <option value="completed">Hoàn thành</option>
                            <option value="incompleted">Chưa hoàn thành</option>
                        </select>
                        {errors.status && <p className="text-red-500">{errors.status.message}</p>}
                        {!errors.status && <p className="text-red-500 text-white">.</p>}
                    </div>
                </div>
                    
                <div className="flex flex-row justify-center gap-5">
                    <button
                        className="text-xl border py-2 rounded-lg w-1/3"
                        style={{background: "rgb(0, 255, 72)"}}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Lưu
                    </button>
                </div>
            </form>
        </div>
    )
}

export default DetailTaskPage