import React from "react";
import {
  Box, Stack, Avatar, Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

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
        <Stack direction="row" spacing={2}>
          {participants.map((participant) => (
            <Avatar sx={{ bgcolor: deepPurple[500], width: 24, height: 24 }}>
              <Typography fontSize={14}>{getShortName(participant)}</Typography>
            </Avatar>
          ))}
        </Stack>
      </Box>
    </Stack>
  </Box>
);

export default Step;
