import {
  json,
  LoaderFunction,
  ScrollRestoration,
  useLoaderData,
} from "react-router-dom";
import sanitize from "sanitize-html";
import { GoBack } from "./components/GoBack";
import * as styles from "./MarketUpdatePage.css";

export const loader: LoaderFunction = async () => {
  const response = await fetch(
    "https://seasonal-api.dokku.mitchs.website/api/market-update"
  );

  const data = await response.json();

  return json({
    ...data,
  });
};

export const MarketUpdatePage = () => {
  const marketUpdate = useLoaderData() as { content: string; title: string };
  const sanitisedMarkup = sanitize(marketUpdate.content);
  return (
    <div className={styles.marketUpdatePage}>
      <ScrollRestoration />
      <GoBack />
      <h1>{marketUpdate.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitisedMarkup,
        }}
      ></div>
      <div>
        <i>
          All content on this page is sourced from{" "}
          <a
            href="https://www.harrisfarm.com.au/blogs/daves-market-update"
            target="_blank"
          >
            Harris Farm
          </a>
          .
        </i>
      </div>
    </div>
  );
};
