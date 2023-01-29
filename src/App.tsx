import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { IndexPage } from "./IndexPage";
import { SeasonPage, seasonPageLoader } from "./SeasonPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/season/:seasonId",
    loader: seasonPageLoader,
    element: <SeasonPage />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
