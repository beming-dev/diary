import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const Nav = () => {
  return (
    <Flex justifyContent="space-between" padding="10px">
      <Text as="b" fontSize="2xl">
        <Link href="/diary">Diary</Link>
      </Text>
      <Button>Logout</Button>
    </Flex>
  );
};

export default Nav;
