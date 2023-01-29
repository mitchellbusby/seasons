import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { faWheatAwn, faSeedling } from "@fortawesome/free-solid-svg-icons";
import { faSun, faSnowflake } from "@fortawesome/free-regular-svg-icons";
export type Season = "summer" | "winter" | "spring" | "autumn";

export const seasons: { icon: IconProp; name: Season }[] = [
  { name: "summer", icon: faSun },
  { name: "autumn", icon: faWheatAwn },
  { name: "winter", icon: faSnowflake },
  { name: "spring", icon: faSeedling },
];
