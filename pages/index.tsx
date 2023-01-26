import { Button, Flex, Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  const onStartClick = () => {
    if (input1.length && input2.length && input3.length) {
      axios({
        method: "POST",
        url: "/api/login",
        data: {
          input1,
          input2,
          input3,
        },
      });
    }
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      flexDir="column"
      justify="center"
      alignItems="center"
    >
      <Input
        w="70%"
        m="10px 0"
        onChange={(e) => setInput1(e.target.value)}
      ></Input>
      <Input
        type="password"
        w="70%"
        m="10px 0"
        onChange={(e) => setInput2(e.target.value)}
      ></Input>
      <Input
        type="password"
        w="70%"
        m="10px 0"
        onChange={(e) => setInput3(e.target.value)}
      ></Input>
      <Button onClick={onStartClick}>start</Button>
    </Flex>
  );
}
