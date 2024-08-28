import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import CreateOrder, {
  action as createOrder,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import Cart from "./features/cart/Cart";
import Applayout from "./ui/Applayout";
const router = createBrowserRouter([
  {
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrder,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        errorElement: <Error />,

        loader: orderLoader,
      },
    ],
  },
]);

function App() {
  //const x = 23;
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;