import { Link } from "react-router-dom"
import { TaskTag } from "../components"
import { useState } from "react";
import { useGetAllTasks, useSignOut } from "../api";
import { useMutation } from "@tanstack/react-query";

const TasksListPage = () => {
  const [searchWord, setSearchWord] = useState('');
  const [filter, setFilter] = useState('all');
  const [order, setOrder] = useState('createdDate');

  const page = localStorage.getItem('pageNumber');
  const [pageNumber, setPageNumber] = useState(page !== null ? Number(localStorage.getItem('pageNumber')) : 1);
  const [highlightNumber, setHighlightNumber] = useState(pageNumber === 1 ? 2 : pageNumber);

  const { data: dataTasks, refetch } = useGetAllTasks(searchWord, filter, order, pageNumber)
  const [ numPages, setNumPages ] = useState(dataTasks?.total)

  const { mutate } = useMutation({ mutationFn: useSignOut })

  const signOut = () => {
    mutate({}, {
      onSuccess: (res) => {
        localStorage.removeItem('token');
      }
    })
  }

  const changePage = (pageNum) => {
    setNumPages(Math.ceil(dataTasks.total/6))
    if (pageNum <= numPages) {
      localStorage.setItem('pageNumber', pageNum.toString());
      setPageNumber(pageNum);
      setHighlightNumber(pageNum === 1 ? 2 : pageNum);
    }
  }
  const search = (event) => {
    setSearchWord(event.target.value);
  }
  const onChangeFilter = (value) => {
    const index = value.target.selectedIndex;
    if (index === 0) setFilter('all');
    if (index === 1) setFilter('completed');
    if (index === 2) setFilter('incompleted');
  }
  const onChangeOrder = (value) => {
    const index = value.target.selectedIndex;
    if (index === 0) setOrder('createdDate');
    if (index === 1) setOrder('deadline');
  }

  return (
    <div className="flex mt-10 flex-col">
      <div className="flex justify-center">
        <p className="font-inter text-3xl font-bold">Danh sách công việc</p>
      </div>
            
      <div className="mx-36 mt-8">
        <div className="flex flex-row">
          <input 
            type="text" 
            id="search" 
            className="p-2 border border-black rounded-md w-80 mr-8" 
            placeholder="Tìm kiếm..." 
            onChange={(value) => search(value)}
          />

          <select onChange={(value) => onChangeFilter(value)} name="status" className="p-2 border border-black rounded-md w-48 mr-8 text-center">
            <option value="all">Tất cả</option>
            <option value="completed">Hoàn thành</option>
            <option value="incompleted">Chưa hoàn thành</option>
          </select>

          <select onChange={(value) => onChangeOrder(value)} name="status" className="p-2 border border-black rounded-md w-48 mr-8 text-center">
            <option value="createdDate">Ngày tạo</option>
            <option value="deadline">Deadline</option>
          </select>

          <div className="w-2/3"></div>

          <Link
            className="p-2 border border-black rounded-md w-48 mr-8 text-center"
            to={'/add-task'}
          >
            Thêm mới
          </Link>

          <Link
            className="p-2 border border-black rounded-md w-48 mr-8 text-center"
            to={'/'}
            onClick={() => signOut()}
          >
            Đăng xuất
          </Link>
        </div>

        <div className="flex flex-col mt-8">
          <div className="flex flex-row">
            <div className="w-1/2">
              {dataTasks?.data[0] && <TaskTag
                key={0}
                id={dataTasks?.data[0].id}
                title={dataTasks?.data[0].title}
                description={dataTasks?.data[0].description}
                status={dataTasks?.data[0].status}
                createdDate={dataTasks?.data[0].createdDate}
                deadline={dataTasks?.data[0].deadline}
                refetch={refetch}
              >
              </TaskTag>}
            </div>
            <div className="w-1/2">
              {dataTasks?.data[1] && <TaskTag
                key={1}
                id={dataTasks?.data[1].id}
                title={dataTasks?.data[1].title}
                description={dataTasks?.data[1].description}
                status={dataTasks?.data[1].status}
                createdDate={dataTasks?.data[1].createdDate}
                deadline={dataTasks?.data[1].deadline}
              >
              </TaskTag>}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-1/2">
              {dataTasks?.data[2] && <TaskTag
                key={2}
                id={dataTasks?.data[2].id}
                title={dataTasks?.data[2].title}
                description={dataTasks?.data[2].description}
                status={dataTasks?.data[2].status}
                createdDate={dataTasks?.data[2].createdDate}
                deadline={dataTasks?.data[2].deadline}
              >
              </TaskTag>}
            </div>
            <div className="w-1/2">
              {dataTasks?.data[3] && <TaskTag
                key={3}
                id={dataTasks?.data[3].id}
                title={dataTasks?.data[3].title}
                description={dataTasks?.data[3].description}
                status={dataTasks?.data[3].status}
                createdDate={dataTasks?.data[3].createdDate}
                deadline={dataTasks?.data[3].deadline}
              >
              </TaskTag>}
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-1/2">
              {dataTasks?.data[4] && <TaskTag
                key={4}
                id={dataTasks?.data[4].id}
                title={dataTasks?.data[4].title}
                description={dataTasks?.data[4].description}
                status={dataTasks?.data[4].status}
                createdDate={dataTasks?.data[4].createdDate}
                deadline={dataTasks?.data[4].deadline}
              >
              </TaskTag>}
            </div>
            <div className="w-1/2">
              {dataTasks?.data[5] && <TaskTag
                key={5}
                id={dataTasks?.data[5].id}
                title={dataTasks?.data[5].title}
                description={dataTasks?.data[5].description}
                status={dataTasks?.data[5].status}
                createdDate={dataTasks?.data[5].createdDate}
                deadline={dataTasks?.data[5].deadline}
              >
              </TaskTag>}
            </div>
          </div>
        </div>

        <div className="flex flex-row mt-6 gap-3 justify-center">
          <button
            className="font-inter text-xl border border-black py-1 px-1.5" 
            onClick={() => {
              if (pageNumber !== 1) changePage(highlightNumber - 1);
            }}
            disabled={pageNumber === 1}
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            className="font-inter text-xl border border-black py-1 px-3"
            style={pageNumber === 1 ? {background: "rgb(160, 228, 230)"} : {}}
            onClick={() => {
              if (pageNumber !== 1) changePage(highlightNumber - 1);
              if (highlightNumber === numPages) changePage(highlightNumber - 2);
            }}
          >
            {highlightNumber === numPages ? highlightNumber - 2 : highlightNumber - 1}
          </button>
          <button
            className="font-inter text-xl border border-black py-1 px-3"
            style={pageNumber !== 1 && highlightNumber !== numPages ? {background: "rgb(160, 228, 230)"} : {}}
            onClick={() => {
              if (pageNumber === 1) changePage(highlightNumber);
              if (highlightNumber === numPages) changePage(highlightNumber - 1);
            }}
          >
            {highlightNumber === numPages ? highlightNumber - 1 : highlightNumber}
          </button>
          <button
            className="font-inter text-xl border border-black py-1 px-3"
            style={highlightNumber === numPages ? {background: "rgb(160, 228, 230)"} : {}}
            onClick={() => {
              if (highlightNumber !== numPages) changePage(highlightNumber + 1)
            }}
          >
            {highlightNumber === numPages ? highlightNumber : highlightNumber + 1}
          </button>
          <button
            className="font-inter text-xl border border-black py-1 px-1.5"
            onClick={() => {
              changePage(pageNumber + 1)
            }}
            disabled={pageNumber === numPages}
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    )
}

export default TasksListPage