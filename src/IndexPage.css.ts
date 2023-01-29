import { style } from "@vanilla-extract/css";

export const card = style({
  border: "1px solid grey",
  padding: 16,
  height: "300px",
  display: "grid",
  color: "white",
  background: "#5D8D42",
  borderRadius: 0,
  vars: {
    "--h3-color": "white",
  },
});

export const cardsLayout = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 16,
  "@media": {
    "screen and (min-width: 800px)": {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
});
