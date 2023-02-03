import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, ScrollRestoration } from "react-router-dom";
import * as styles from "./IndexPage.css";
import { Season, seasons } from "./SeasonData";

const Card = ({ season }: { season: { icon: IconProp; name: Season } }) => (
  <Link
    key={season.name}
    className={styles.card({ season: season.name })}
    to={`/season/${season.name}`}
  >
    <div className={styles.cardIcon}>
      <FontAwesomeIcon icon={season.icon} size={"4x"} />
    </div>
    <h3 className={styles.cardContents}>{season.name}</h3>
  </Link>
);

export const IndexPage = () => (
  <div style={{ display: "grid", gap: 24 }}>
    <ScrollRestoration />
    <h1>Seasons</h1>
    <p>
      This is a micro-site with the aim of easy-to-navigate information on
      seasons. While a work in progress, my aim is to catalogue fun activities
      and produce that is in season, similar to{" "}
      <a target="_blank" href="https://seasons.melanie-richards.com/">
        Melanie Richard's equivalent for North America
      </a>
      . Guidance is given for the east coast of Australia, though it may
      generalise for similar climates the southern hemisphere.
    </p>
    <div className={styles.cardsLayout}>
      {seasons.map((season) => {
        return <Card season={season} />;
      })}
    </div>
    <div>
      <Link to="/search">Search by produce</Link>
    </div>
  </div>
);
