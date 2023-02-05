import { createHashRouter, RouterProvider } from "react-router-dom";
import { IndexPage } from "./IndexPage";
import { SeasonPage, seasonPageLoader } from "./SeasonPage";
import * as styles from "./App.css";
import { searchLoader, SearchPage } from "./SearchPage";
import * as MarketUpdatePage from "./MarketUpdatePage";

const router = createHashRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/season/:seasonId",
    loader: seasonPageLoader,
    element: <SeasonPage />,
  },
  {
    path: "/search",
    loader: searchLoader,
    element: <SearchPage />,
  },
  {
    path: "/market-update",
    loader: MarketUpdatePage.loader,
    element: <MarketUpdatePage.MarketUpdatePage />,
  },
]);

function App() {
  return (
    <div className={styles.baseLayout}>
      <div>
        <RouterProvider router={router} />
      </div>
      <div>
        <hr />
      </div>
      <div>
        A site made by Mitchell Busby. All produce information is sourced from{" "}
        <a href="https://sustainabletable.org.au/all-things-ethical-eating/seasonal-produce-guide/">
          Sustainable Table
        </a>{" "}
        and{" "}
        <a
          href="https://www.harrisfarm.com.au/blogs/daves-market-update"
          target="_blank"
        >
          Harris Farm
        </a>
        .
      </div>
    </div>
  );
}

export default App;
