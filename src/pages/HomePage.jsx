import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex mt-10 flex-col">
      <div className="flex justify-center">
        <p className="font-inter text-3xl font-bold">Quản lý công việc</p>
      </div>

      <div className="flex flex-row mt-12 justify-center">
        <Link className="py-2 px-4 rounded-md bg-gradient-to-r from-orange-200 to to-orange-500 text-xl" to={'/sign-up'}>
          Đăng ký
        </Link>
        <div className="mx-12"></div>
        <Link className="py-2 px-4 rounded-md bg-gradient-to-r from-orange-500 to to-orange-200 text-xl" to={'/sign-in'}>
          Đăng nhập
        </Link>
      </div>
    </div>
  )
};

export default HomePage;
