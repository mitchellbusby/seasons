import {
  Link,
  LoaderFunction,
  ScrollRestoration,
  useLoaderData,
} from "react-router-dom";
import { Season } from "./SeasonData";
import { getSeasonPage } from "./seasons";
import * as styles from "./SeasonPage.css";
import { useEffect, useRef, useState } from "react";

export const seasonPageLoader: LoaderFunction = ({ params }) => {
  const data = params["seasonId"];
  return data ?? "";
};

export const SeasonPage = () => {
  const currentSeason = useLoaderData() as Season;
  const currentSeasonPage = currentSeason
    ? getSeasonPage(currentSeason)
    : undefined;

  const markdownRef = useRef<HTMLDivElement>(null);

  const [footnoteElement, setFootnoteElement] = useState<
    HTMLElement | undefined
  >(undefined);

  const footnoteCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanupEffects: VoidFunction[] = [];
    markdownRef.current?.querySelectorAll("li").forEach((node) => {
      let cardIsOpen = false;
      if (node.textContent?.includes("*")) {
        const footnoteButton = document.createElement("button");
        footnoteButton.textContent = "···";
        footnoteButton.classList.add(styles.footnoteButton);
        node.appendChild(footnoteButton);
        const onClick = () => {
          setFootnoteElement((prevValue) => {
            if (prevValue === footnoteButton) {
              return undefined;
            }
            return footnoteButton;
          });
        };
        footnoteButton.addEventListener("click", onClick);
        cleanupEffects.push(() =>
          footnoteButton.removeEventListener("click", onClick)
        );
        cleanupEffects.push(() => footnoteButton.remove());
      }
    });
    return () => {
      cleanupEffects.forEach((c) => c());
    };
  }, []);

  useEffect(() => {
    // If the user clicks outside of the popover, close the popover
    const onClick = (event: MouseEvent) => {
      if (
        !(event.target as Element).contains(footnoteCardRef.current) &&
        !(event.target as Element).contains(footnoteElement!)
      ) {
        setFootnoteElement(undefined);
      }
    };
    if (footnoteElement) {
      document.addEventListener("click", onClick);
    }
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [footnoteElement]);

  return (
    <div>
      <ScrollRestoration />
      <div>
        <Link to="/">{"<"} go back</Link>
      </div>
      <h1>{currentSeasonPage?.attributes["title"] as string}</h1>
      <div
        className={styles.seasonPageHtml}
        dangerouslySetInnerHTML={{
          __html: currentSeasonPage?.html ?? "empty html",
        }}
        ref={markdownRef}
      ></div>
      {footnoteElement && (
        <div className={styles.footnoteCard} ref={footnoteCardRef}>
          hello hello hello
        </div>
      )}
    </div>
  );
};
