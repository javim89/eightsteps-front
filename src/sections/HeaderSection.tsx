import React from "react";
import {
  Box, Stack, Typography, Button,
} from "@mui/material";

interface HeaderSectionI {
  name: string;
  createAction: () => void;
}
const HeaderSection: React.FC<HeaderSectionI> = ({ name, createAction }) => (
    <Box>
        <Stack direction="row" alignItems="center">
          <Box sx={{
            flex: 1,
          }}>
            <Typography fontWeight={700} fontSize={17}>{name}</Typography>
          </Box>
          <Box>
            <Button variant="contained" onClick={createAction}>
              Crear sala
            </Button>
          </Box>
        </Stack>
      </Box>
);

export default HeaderSection;
