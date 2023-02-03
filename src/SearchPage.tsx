import { useRef, useState } from "react";
import {
  Form,
  json,
  Link,
  LoaderFunction,
  useLoaderData,
} from "react-router-dom";
import { Season } from "./SeasonData";
import { getAllSeasons } from "./seasons";

type ProduceQuery = {
  searchTerm: string;
  results: { produce: string; seasons: Season[] }[];
};

const findProduce = (
  searchTerm: string
): { produce: string; seasons: Season[] }[] => {
  const results = getAllSeasons()
    .map((m) => {
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

export const searchLoader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("searchTerm");

  if (!searchTerm) {
    return json({ searchTerm: "" });
  }
  const searchResults = findProduce(searchTerm);
  const result: ProduceQuery = { results: searchResults, searchTerm };
  return json(result);
};

export const SearchPage = () => {
  const { results: searchResults, searchTerm } =
    useLoaderData() as ProduceQuery;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div>
        <Link to="/">{"<"} go back</Link>
      </div>
      <h1>Search by produce</h1>
      <Form method="get">
        <div>
          <label>Search term</label>
          <input
            name="searchTerm"
            type="search"
            placeholder="apple"
            defaultValue={searchTerm}
          />
          <button type="submit">Search</button>
        </div>
      </Form>
      {searchResults && (
        <div>
          <h3>Search results</h3>
          {searchResults.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <td>Produce</td>
                  <td>Summer</td>
                  <td>Autumn</td>
                  <td>Winter</td>
                  <td>Spring</td>
                </tr>
              </thead>
              {searchResults.map((s) => (
                <tr key={s.produce}>
                  <td>{s.produce}</td>
                  <td>{s.seasons.includes("summer") && "x"}</td>
                  <td>{s.seasons.includes("autumn") && "x"}</td>
                  <td>{s.seasons.includes("winter") && "x"}</td>
                  <td>{s.seasons.includes("spring") && "x"}</td>
                </tr>
              ))}
            </table>
          ) : (
            <div>No results found</div>
          )}
          {/* 
          {searchResults.length > 0 ? (
            <div>results found! {JSON.stringify(searchResults)}</div>
          ) : (
            <div>No results found</div>
          )} */}
        </div>
      )}
    </div>
  );
};
