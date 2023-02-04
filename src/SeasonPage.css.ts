import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const seasonPageHtml = style({});

globalStyle(`${seasonPageHtml} ul`, {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  "@media": {
    "screen and (min-width: 600px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
});

export const footnoteButton = style({
  fontSize: 10,
  padding: "4px 8px",
  width: "auto",
  display: "inline-block",
  lineHeight: "10px",
  marginLeft: 8,
  marginBottom: 0,
});

export const footnoteTransitionDuration = 200;

export const footnoteCard = recipe({
  base: {
    position: "fixed",
    top: "0",
    left: "0",
    background: "var(--card-background-color)",
    border: "1px solid var(--card-border-color)",
    boxShadow: "var(--card-box-shadow)",
    padding: 8,
    width: "max-content",
    // should be max width of:
    // 95vw and 500px
    maxWidth: "min(90vw, 500px)",
    opacity: 0,
    transition: `opacity ${footnoteTransitionDuration}ms`,
  },
  variants: {
    status: {
      entering: {
        opacity: 1,
      },
      entered: {
        opacity: 1,
      },
      exiting: {
        opacity: 0,
      },
      exited: {
        opacity: 0,
      },
      unmounted: {},
    },
  },
});

export const footnoteCaret = style({
  position: "absolute",
  width: 14,
  height: 14,
  background: "var(--card-background-color)",
  transform: "rotate(45deg)",
});
