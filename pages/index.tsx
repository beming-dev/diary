import { Button, Flex, Input } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  const onStartClick = () => {
    if (input1.length && input2.length && input3.length) {
      axios
        .post("/api/login", {
          input1,
          input2,
          input3,
        })
        .then(() => {
          router.push("/diary");
        });
    }
  };

  return (
    <Flex
      w="100vw"
      h="calc(100vh - 60px)"
      flexDir="column"
      justify="center"
      alignItems="center"
    >
      <Input
        w="70%"
        m="10px 0"
        onChange={(e) => setInput1(e.target.value)}
        maxLength={100}
      ></Input>
      <Input
        type="password"
        w="70%"
        m="10px 0"
        onChange={(e) => setInput2(e.target.value)}
        maxLength={100}
      ></Input>
      <Input
        type="password"
        w="70%"
        m="10px 0"
        onChange={(e) => setInput3(e.target.value)}
        maxLength={100}
      ></Input>
      <Button onClick={onStartClick}>start</Button>
    </Flex>
  );
}
