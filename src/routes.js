import { AddTaskPage, DetailTaskPage, HomePage, SignInPage, SignUpPage, TasksListPage } from "./pages";
import PrivateRoute from "./utils/PrivateRoute";

const withPrivateRoute = (Component) => {
    return () => (
      <PrivateRoute>
        <Component />
      </PrivateRoute>
    )
  }

export const routes = [
    { path: '*', element: <HomePage />, title: 'Trang chủ' },
    { path: '/sign-up', element: <SignUpPage />, title: 'Đăng ký' },
    { path: '/sign-in', element: <SignInPage />, title: 'Đăng nhập' },
    { path: '/list-tasks', element: withPrivateRoute(TasksListPage)(), title: 'Danh sách công việc'},
    { path: '/add-task', element: withPrivateRoute(AddTaskPage)(), title: 'Thêm mới công việc'},
    { path: '/detail-task/:id', element: withPrivateRoute(DetailTaskPage)(), title: 'Chi tiết công việc'}
]