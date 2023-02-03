import { globalStyle } from "@vanilla-extract/css";

globalStyle(":root", {
  vars: {
    "--font-family": "Courier",
  },
});

globalStyle("h1, h2, h3, h4, h5, h6, p", {
  vars: {
    "--typography-spacing-vertical": "0 !important",
  },
});
