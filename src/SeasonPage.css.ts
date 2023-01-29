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
