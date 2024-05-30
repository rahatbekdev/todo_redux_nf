


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import TodoListPage from "./components/TodoListPage";
import Confirm from "./components/Confirm";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/confirm",
    element: <Confirm />,
  },
  {
    path: "/todo",
    element: <TodoListPage />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router}/>
  );
};

export default App;
