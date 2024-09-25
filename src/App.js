import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { routes } from './routes';
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  const location = useLocation();
  
  useEffect(() => {
    const route = routes.find((route) => route.path === location.pathname);
    if (route && route.title) document.title = route.title;
      else document.title = "Trang chủ";
  }, [location]);
  
  return (
    <div className="App mb-12">
        <Routes>
          {routes.map((item, index) => {
            return <Route key={index} path={item.path} element={item.element} />
          })}
        </Routes>
      <ScrollToTop />
    </div>
  )
}

export default App;
