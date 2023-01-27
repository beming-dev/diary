import { Box } from "@chakra-ui/react";
import React from "react";
import Nav from "./Nav";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Box h="100vh">
      <Nav></Nav>
      {children}
    </Box>
  );
};

export default Layout;
