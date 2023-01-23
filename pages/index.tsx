import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface diaryType {
  description: string;
  id: number;
  point: string;
  title: string;
}

const defaultDiary = {
  description: "",
  id: 0,
  point: "",
  title: "",
};

export default function Home() {
  const [diary, setDiary] = useState<diaryType>(defaultDiary);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOn, setIsCalendarOn] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const formatDate = (date: Date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/diary",
      params: { date: formatDate(selectedDate) },
    }).then(({ data }) => {
      if (!data) setDiary(defaultDiary);
      else setDiary(data);
    });
  }, [selectedDate]);

  const onCalendarChange = (v: Date) => {
    setSelectedDate(v);
    setIsCalendarOn(false);
  };

  const onSaveClick = () => {
    axios({
      method: "POST",
      url: "/api/diary",
      data: { date: formatDate(selectedDate), title, description },
    });
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
                onChange={(v: Date) => onCalendarChange(v)}
                value={selectedDate}
                locale="KO"
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
            {formatDate(selectedDate)}
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
        <Input
          w="100%"
          h="80px"
          borderRadius="15px"
          bgColor="brand"
          onChange={(e) => setTitle(e.target.value)}
          value={diary?.title}
        />
        <Input
          w="100%"
          h="400px"
          borderRadius="15px"
          bgColor="brand"
          onChange={(e) => setDescription(e.target.value)}
          value={diary?.description}
        />
        <Button w="70px" alignSelf="end" bgColor="brand" onClick={onSaveClick}>
          저장
        </Button>
      </Flex>
    </Flex>
  );
}
