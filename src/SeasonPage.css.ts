import { globalStyle, style } from "@vanilla-extract/css";

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
});

export const footnoteCard = style({
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
});
