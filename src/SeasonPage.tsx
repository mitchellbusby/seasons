import {
  Link,
  LoaderFunction,
  ScrollRestoration,
  useLoaderData,
} from "react-router-dom";
import { Season } from "./SeasonData";
import { getSeasonPage } from "./seasons";

export const seasonPageLoader: LoaderFunction = ({ params }) => {
  const data = params["seasonId"];
  return data ?? "";
};

export const SeasonPage = () => {
  const currentSeason = useLoaderData() as Season;
  const currentSeasonPage = currentSeason
    ? getSeasonPage(currentSeason)
    : undefined;

  return (
    <div>
      <ScrollRestoration />

      <div>
        <Link to="/">{"<"} go back</Link>
      </div>
      <h1>{currentSeasonPage?.attributes["title"] as string}</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: currentSeasonPage?.html ?? "empty html",
        }}
      ></div>
    </div>
  );
};
