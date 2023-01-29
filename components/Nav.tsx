import { Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();

  const onLogoutClick = () => {
    axios.post("/api/logout", {}).then(() => {
      router.push("/");
    });
  };

  return (
    <Flex justifyContent="space-between" padding="10px">
      <Text as="b" fontSize="2xl">
        <Link href="/diary">Diary</Link>
      </Text>
      <Button onClick={onLogoutClick}>Logout</Button>
    </Flex>
  );
};

export default Nav;
