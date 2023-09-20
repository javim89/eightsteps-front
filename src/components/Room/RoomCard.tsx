import {
  Box, Button, Card, Divider, Stack, Typography,
} from "@mui/material";
import React from "react";

interface RoomCardI {
  name: string;
  participants: number;
  onClickJoin: () => void;
}

const RoomCard: React.FC<RoomCardI> = ({ name, participants, onClickJoin }) => (
  <Card>
    <Box sx={{
      p: 2,
    }}>
      <Typography fontWeight={700}>{name}</Typography>
      <Typography variant="body2" color="text.secondary">Participantes: {participants}</Typography>
    </Box>
    <Divider />
    <Stack sx={{
      p: 2,
    }}>
      <Button variant="contained" onClick={onClickJoin}>Unirme</Button>
    </Stack>
  </Card>
);

export default RoomCard;
