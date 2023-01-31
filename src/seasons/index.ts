import * as summer from "./summer.md";
import * as winter from "./winter.md";
import * as spring from "./spring.md";
import * as autumn from "./autumn.md";
import { Season } from "../SeasonData";

type SeasonPage = {
  html: string;
  attributes: Record<string, unknown>;
};

const getSeasonPage = (season: Season): SeasonPage => {
  console.log(summer);
  switch (season) {
    case "summer": {
      return summer;
    }
    case "autumn": {
      return autumn;
    }
    case "spring": {
      return spring;
    }
    case "winter": {
      return winter;
    }
    default: {
      throw new Error("no such season");
    }
  }
};

const getAllSeasons = () => [summer, autumn, winter, spring];

export { getSeasonPage, getAllSeasons };
