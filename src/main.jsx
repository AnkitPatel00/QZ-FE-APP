import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import QuizContext from "./Context/QuizContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Score from "./Component/Score.jsx";
import store from "./app/store.js";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/score",
    element: <Score />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
