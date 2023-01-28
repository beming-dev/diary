import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: "#D9D9D9",
};

const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "80em",
};

const theme = extendTheme({ colors, breakpoints });

export default theme;
