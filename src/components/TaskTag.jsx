import { useState } from "react";
import { Link } from "react-router-dom"
import DeletePopup from "./DeletePopup";
import { useMutation } from "@tanstack/react-query";
import { useDeleteTask } from "../api";

const TaskTag = ({id, title, description, createdDate, deadline, status, refetch }) => {
  const [deletePopup, setDeletePopup] = useState(false);
  const { mutate } = useMutation({ mutationFn: useDeleteTask })
  const toggleDeletePopup = (isDeleted) => {
    setDeletePopup(!deletePopup);
    if (isDeleted === true) {
      mutate({ id }, {
          onSuccess: (res) => {
              alert(res);
              refetch();
          }
      })
    }
  }

  return (
    <div className="flex flex-col gap-5 w-4/5 h-72 border border-black p-4 mx-auto mt-8 rounded-md">
      <div className="flex flex-row">
        <div className="font-inter text-xl font-bold w-3/5">
          {title}
        </div>

        <Link
          to={`/detail-task/${id}`}
          className="p-2 border border-black rounded-md w-20 max-h-12 mr-8 text-center"
        >
          Chi tiết
        </Link>
        <button
          className="p-2 border border-red-500 text-red-500 rounded-md w-20 max-h-12 mr-8 text-center"
          onClick={() => setDeletePopup(true)}
        >
          Xóa
        </button>
      </div>
      <div className="flex flex-row">
        <div className="font-inter text-lg">
          Mô tả công việc: {description}
        </div>
      </div>
      <div className="flex flex-row">
        <div className="font-inter text-lg font-bold">
          Trạng thái: &nbsp;
        </div>
        <div className="font-inter text-lg italic">
          {status === 'completed' ? 'Hoàn thành' : 'Chưa hoàn thành'}
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-row w-1/2">
          <div className="font-inter text-lg font-bold">
            Ngày tạo: &nbsp;
          </div>
          <div className="font-inter text-lg italic">
            {createdDate}
          </div>
        </div>
        <div className="flex flex-row w-1/2">
          <div className="font-inter text-lg font-bold">
            Deadline:&nbsp;
          </div>
          <div className="font-inter text-lg italic">
            {deadline}
          </div>
        </div>
      </div>
            

      { deletePopup && <DeletePopup toggleDeletePopup={toggleDeletePopup} title={title}></DeletePopup>}
    </div>
  )
}

export default TaskTag