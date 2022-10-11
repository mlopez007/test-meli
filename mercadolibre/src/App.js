import { useRoutes } from "react-router-dom";
import Index from "./views/Index";
import Products from "./views/ProductList";
import Product from "./views/Product";

function App() {
  let routes = useRoutes([
    { path: "/", element: <Index /> },
    { path: "/items", element: <Products /> },
    { path: "/items/:id", element: <Product /> },
  ]);
  return routes;
}

export default App;
