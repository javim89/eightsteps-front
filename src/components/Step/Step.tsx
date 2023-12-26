import React from "react";
import {
  Box, Stack, Avatar, Typography, Badge,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { UserStatusEnum } from "../../constants/constants.tsx";

const getShortName = (participant: User): String => {
  let shortName = (participant.alias && participant.alias[0]) || "";
  if (participant.name && participant.surname) {
    shortName = `${participant.name[0]} ${participant.surname[0]}`;
  }
  return shortName;
};

const Step: React.FC<Step> = ({
  category,
  participants,
}) => (
  <Box sx={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    bgcolor: category.mainColor,
    color: "white",
  }}>
    <Stack
      spacing={2}
      alignItems="center"
    >
      <Box>
        <Typography
          fontSize={24}
          fontWeight={600}
          fontFamily={"Roboto"}>
          {category.name}
        </Typography>
      </Box>
      <Box>
        <Stack direction="row" spacing={3}>
          {participants.filter((participant) => participant.status !== UserStatusEnum.WINNER).map((participant, index) => (
            <Badge
              badgeContent={participant.answers !== undefined && participant.answers.filter((a) => a.isAnswerCorrect).length}
              color={"success"}
              key={index}
              anchorOrigin={{
                vertical: "top", horizontal: "right",
              }}
            >
              <Badge
                badgeContent={participant.answers !== undefined && participant.answers.filter((a) => !a.isAnswerCorrect).length}
                color={"error"}
                key={index}
                anchorOrigin={{
                  vertical: "top", horizontal: "left",
                }}
              >
                <Avatar key={index} sx={{ bgcolor: deepPurple[500], width: 32, height: 32 }}>
                  <Typography fontSize={14}>{participant.user ? getShortName(participant.user) : getShortName(participant.bot)}</Typography>
                </Avatar>
              </Badge>
            </Badge>
          ))}
        </Stack>
      </Box>
    </Stack>
  </Box>
);

export default Step;
