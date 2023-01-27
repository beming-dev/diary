import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { diaryType } from "../global";
import { withSessionSsr } from "../lib/withSession";

const defaultDiary = {
  description: "",
  id: 0,
  point: "",
  title: "",
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }: any) {
    if (req.session.user && req.session.user.login) {
      return {
        props: {
          user: req.session.user,
        },
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props: {},
      };
    }
  }
);

export default function Diary() {
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
    setTitle(diary.title);
    setDescription(diary.description);
  }, [diary]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/diary",
      params: { date: formatDate(selectedDate) },
    }).then(({ data }: { data: diaryType }) => {
      if (!data) setDiary(defaultDiary);
      else {
        setDiary(data);
      }
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
    })
      .then(() => {
        alert("저장이 완료됐습니다.");
      })
      .catch((err) => {
        console.log(err);
        alert("저장에 실패했습니다.");
      });
  };

  return (
    <Flex w="100vw" h="calc(100vh - 60px)" align="center" justify="center">
      <Flex
        flexDir="column"
        w="600px"
        h={["500px", "610px", "610px"]}
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
          <Image
            src="/calendar.png"
            width={30}
            height={30}
            alt="calendar"
            onClick={() => setIsCalendarOn(!isCalendarOn)}
          />
        </Flex>
        <Input
          w="100%"
          h={["50px", "80px", "80px"]}
          borderRadius="15px"
          bgColor="brand"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <Input
          w="100%"
          h={["300px", "400px", "400px"]}
          borderRadius="15px"
          bgColor="brand"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <Button w="70px" alignSelf="end" bgColor="brand" onClick={onSaveClick}>
          저장
        </Button>
      </Flex>
    </Flex>
  );
}
