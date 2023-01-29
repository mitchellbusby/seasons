import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as styles from "./App.css";
import { faWheatAwn, faSeedling } from "@fortawesome/free-solid-svg-icons";
import { faSun, faSnowflake } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { getSeasonPage } from "./seasons";

export type Season = "summer" | "winter" | "spring" | "autumn";

const seasons: { icon: IconProp; name: Season }[] = [
  { name: "summer", icon: faSun },
  { name: "autumn", icon: faWheatAwn },
  { name: "winter", icon: faSnowflake },
  { name: "spring", icon: faSeedling },
];

function App() {
  const [currentSeason, setCurrentSeason] = useState<undefined | Season>(
    undefined
  );
  const currentSeasonPage = currentSeason
    ? getSeasonPage(currentSeason)
    : undefined;

  return (
    <div>
      {!!currentSeason ? (
        <div>
          <button
            className="outline"
            onClick={() => setCurrentSeason(undefined)}
          >
            {"<"} go back
          </button>
          <div
            dangerouslySetInnerHTML={{
              __html: currentSeasonPage?.html ?? "empty html",
            }}
          ></div>
        </div>
      ) : (
        <div className={styles.cardsLayout}>
          {seasons.map((s) => {
            return (
              <button
                key={s.name}
                className={styles.card}
                onClick={() => setCurrentSeason(s.name)}
              >
                <div
                  style={{
                    position: "absolute",
                    justifySelf: "center",
                    alignSelf: "center",
                  }}
                >
                  <FontAwesomeIcon icon={s.icon} size={"4x"} />
                </div>
                <h3>{s.name}</h3>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
