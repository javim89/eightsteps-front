import { Backdrop, Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import useRoom from "../../hooks/useRoom.tsx";
import { UserStatusEnum, RoomStatusEnum } from "../../constants/constants.tsx";

const BackDropSection = () => {
  const { status } = useRoom();
  return (
    <Backdrop
      sx={{ color: "#ffffff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={[UserStatusEnum.WAITING, UserStatusEnum.WINNER].includes(status.user) || status.room === RoomStatusEnum.WAITING_USERS}
    >
      <Box sx={{
        textAlign: "center",
      }}>
        <Typography paddingBottom={5} fontSize={32}>{status.user}</Typography>
        <CircularProgress color="inherit" />
      </Box>
    </Backdrop>
  );
};

export default BackDropSection;
