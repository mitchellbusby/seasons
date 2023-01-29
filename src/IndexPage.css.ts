import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const card = recipe({
  base: {
    border: "1px solid grey",
    padding: 16,
    height: "300px",
    display: "grid",
    color: "white",
    background: "#5D8D42",
    borderRadius: 0,
    position: "relative",
    textDecoration: "none",
    vars: {
      "--h3-color": "white",
    },
    ":focus-visible": {
      outline: "3px solid blue",
    },
  },
  variants: {
    season: {
      summer: {
        background: "#DD3D00",
        color: "#ededed",
        borderColor: "#DD3D00",
      },
      autumn: {
        background: "#D8AB38",
        color: "#494949",
        borderColor: "#D8AB38",
        vars: {
          "--h3-color": "#494949",
        },
      },
      winter: {
        background: "#42FFFF",
        color: "#0F2BD4",
        borderColor: "#42FFFF",
        vars: {
          "--h3-color": "#0F2BD4",
        },
      },
      spring: {},
    },
  },
});

export const cardContents = style({
  gridArea: "1 / 1",
});

export const cardIcon = style(
  [
    {
      justifySelf: "center",
      alignSelf: "center",
      position: "absolute",
    },
  ],
  cardContents
);

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
