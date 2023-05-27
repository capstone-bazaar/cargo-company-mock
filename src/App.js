import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./Pages/Main";
import Product from "./Pages/Product";

/* existing imports */

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/tracking/:id",
    element: <Product />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
