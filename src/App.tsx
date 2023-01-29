import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { IndexPage } from "./IndexPage";
import { SeasonPage, seasonPageLoader } from "./SeasonPage";
import * as styles from "./App.css";

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
    <div className={styles.baseLayout}>
      <div>
        <RouterProvider router={router} />
      </div>
      <div>
        A site made by Mitchell Busby. All produce information is sourced from{" "}
        <a href="https://sustainabletable.org.au/all-things-ethical-eating/seasonal-produce-guide/">
          Sustainable Table
        </a>
        .
      </div>
    </div>
  );
}

export default App;
