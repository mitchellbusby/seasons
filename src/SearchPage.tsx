import { useState } from "react";
import { Link } from "react-router-dom";
import { Season } from "./SeasonData";
import { getAllSeasons } from "./seasons";

// this doesn't actually tell you what the produce was lol; I'll need some regexes for this
const findProduce = (
  searchTerm: string
): { produce: string; seasons: Season[] }[] => {
  const results = getAllSeasons()
    .map((m) => {
      // parse the html, get all lis, extract their contents,
      // return all possible matches
      const parsedHtml = new DOMParser().parseFromString(m.html, "text/html");
      const allListItems = parsedHtml.querySelectorAll("li");
      const matches = [...allListItems]
        .map((m) => m.textContent)
        .filter((t) => t?.includes(searchTerm));

      return {
        attributes: m.attributes,
        matches: matches,
      };
    })
    .filter((f) => f.matches.length > 0);

  const produceAndSeason = results.flatMap((s) =>
    s.matches.map((m) => ({
      produce: m,
      season: (s.attributes["title"] as string).toLowerCase(),
    }))
  );

  const produceAndSeasons = produceAndSeason.reduce((acc, curr) => {
    if (!curr.produce) {
      return acc;
    }
    if (!acc[curr.produce]) {
      acc[curr.produce] = { seasons: [curr.season as Season] };
    } else {
      acc[curr.produce].seasons.push(curr.season as Season);
    }

    return acc;
  }, {} as { [key: string]: { seasons: Season[] } });

  return [...Object.entries(produceAndSeasons)].map((m) => ({
    produce: m[0],
    seasons: m[1].seasons,
  }));
};

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchResults = findProduce(searchTerm);
  return (
    <div>
      <div>
        <Link to="/">{"<"} go back</Link>
      </div>
      <h1>Search by produce</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label></label>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </form>
      {searchTerm && (
        <div>
          <h3>Search results</h3>
          {searchResults.length > 0 ? (
            <div>results found! {JSON.stringify(searchResults)}</div>
          ) : (
            <div>No results found</div>
          )}
        </div>
      )}
    </div>
  );
};
