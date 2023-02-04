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

globalStyle(":root:not([data-theme='dark'])", {
  vars: {
    "--primary": "#fb8c00",
    "--primary-hover": "#c56e00",
    "--primary-focus": "#c1a11020",
  },
});
