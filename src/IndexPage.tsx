import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import * as styles from "./IndexPage.css";
import { seasons } from "./SeasonData";

export const IndexPage = () => (
  <div className={styles.cardsLayout}>
    {seasons.map((s) => {
      return (
        <Link key={s.name} className={styles.card} to={`/season/${s.name}`}>
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
        </Link>
      );
    })}
  </div>
);
