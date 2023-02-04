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
import { autoUpdate, computePosition } from "@floating-ui/dom";
import { arrow, flip, offset, shift } from "@floating-ui/core";
import { TransitionGroup, Transition } from "react-transition-group";

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
  const footnoteCaretRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanupEffects: VoidFunction[] = [];
    markdownRef.current?.querySelectorAll("li").forEach((node) => {
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
        !footnoteCardRef.current?.contains(event.target as Element) &&
        !footnoteElement?.contains(event.target as Element)
      ) {
        setFootnoteElement(undefined);
      }
    };

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFootnoteElement(undefined);
      }
    };
    if (footnoteElement) {
      document.addEventListener("mousedown", onClick);
      document.addEventListener("keydown", onKeydown);
    }
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKeydown);
    };
  }, [footnoteElement]);

  useEffect(() => {
    const updateFootnotePosition = () => {
      if (footnoteElement && footnoteCardRef.current) {
        computePosition(footnoteElement, footnoteCardRef.current, {
          strategy: "fixed",
          placement: "top",
          middleware: [
            offset(16),
            flip({ crossAxis: false }),
            shift({ padding: 8 }),
            arrow({ element: footnoteCaretRef.current }),
          ],
        }).then(({ x, y, ...rest }) => {
          if (footnoteCardRef.current) {
            Object.assign(footnoteCardRef.current.style, {
              left: `${x}px`,
              top: `${y}px`,
            });
          }

          if (rest.middlewareData.arrow && footnoteCaretRef.current) {
            const side = rest.placement.split("-")[0];

            const staticSide = {
              top: "bottom",
              right: "left",
              bottom: "top",
              left: "right",
            }[side];

            const { x, y } = rest.middlewareData.arrow;

            Object.assign(footnoteCaretRef.current.style, {
              left: x != null ? `${x}px` : "",
              top: y != null ? `${y}px` : "",
              right: "",
              bottom: "",
              [staticSide as any]: `${-14 / 2}px`,
            });
          }
        });
      }
    };

    if (footnoteElement && footnoteCardRef.current) {
      return autoUpdate(
        footnoteElement,
        footnoteCardRef.current,
        updateFootnotePosition
      );
    }
  }, [footnoteElement, footnoteCardRef.current, footnoteCardRef.current]);

  useEffect(() => {
    setFootnoteElement(undefined);
  }, []);

  return (
    <div>
      <ScrollRestoration />
      <div>
        <Link to="/">{"<"} go back</Link>
      </div>
      <h1>{currentSeasonPage?.attributes.title}</h1>
      <div
        className={styles.seasonPageHtml}
        dangerouslySetInnerHTML={{
          __html: currentSeasonPage?.html ?? "empty html",
        }}
        ref={markdownRef}
      ></div>
      <div style={{ display: "grid", gap: 16 }}>
        <h3>Notes</h3>
        {currentSeasonPage?.attributes.notes?.map((m) => (
          <p>{m}</p>
        ))}
      </div>
      <TransitionGroup component={null}>
        {footnoteElement && (
          <Transition
            timeout={styles.footnoteTransitionDuration}
            onEnter={(node: HTMLElement) => node && node.scrollTop}
          >
            {(status) => (
              <div
                className={styles.footnoteCard({ status })}
                ref={footnoteCardRef}
                data-status={status}
                key={footnoteElement?.previousSibling?.textContent}
              >
                {getMatchingNote(
                  footnoteElement?.previousSibling?.textContent ?? "",
                  currentSeasonPage?.attributes.notes ?? []
                )}
                <div
                  ref={footnoteCaretRef}
                  className={styles.footnoteCaret}
                ></div>
              </div>
            )}
          </Transition>
        )}
      </TransitionGroup>
    </div>
  );
};

const getMatchingNote = (produce: string, notes: string[]) => {
  return notes.find((f) => f.includes(produce))?.replace(produce, "");
};
