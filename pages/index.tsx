import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Home() {
  const [value, onChange] = useState(new Date());
  const [isCalendarOn, setIsCalendarOn] = useState(false);

  const formatDate = (date: Date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const onCalendarChange = (v: Date) => {
    onChange(v);
    setIsCalendarOn(false);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        flexDir="column"
        w="600px"
        h="610px"
        justify="space-between"
        p="0 10px"
      >
        <Flex w="100%" justify="space-between" position="relative">
          <Box position="absolute" top="40px" right="0" zIndex="1">
            <Box display={isCalendarOn ? "flex" : "none"}>
              <Calendar
                value={value}
                onChange={(v: Date) => onCalendarChange(v)}
              />
            </Box>
          </Box>
          <Text
            w="100px"
            h="30px"
            borderRadius="10px"
            bgColor="brand"
            textAlign="center"
            lineHeight="30px"
            as="b"
          >
            {formatDate(value)}
          </Text>
          <Flex cursor="pointer" w="70px" justify="space-between">
            <Image
              src="/calendar.png"
              width={30}
              height={30}
              alt="calendar"
              onClick={() => setIsCalendarOn(!isCalendarOn)}
            />
            <Image src="/plus.png" width={30} height={30} alt="calendar" />
          </Flex>
        </Flex>
        <Input w="100%" h="80px" borderRadius="15px" bgColor="brand" />
        <Input w="100%" h="400px" borderRadius="15px" bgColor="brand" />
      </Flex>
    </Flex>
  );
}
