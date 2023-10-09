import React from "react";
import {
  Box, Stack, Avatar, Typography, Badge,
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
          {participants.map((participant, index) => (
            // Cambiar badgecontent a "" y color success o error dependiendo el resultado de la respeusta
            <Badge badgeContent={0} color="error">
              <Avatar key={index} sx={{ bgcolor: deepPurple[500], width: 32, height: 32 }}>
                <Typography fontSize={14}>{getShortName(participant.user)}</Typography>
              </Avatar>
            </Badge>
          ))}
        </Stack>
      </Box>
    </Stack>
  </Box>
);

export default Step;
