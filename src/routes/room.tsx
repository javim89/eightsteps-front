import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { GET_ROOM_BY_ID } from "../querys/querys.tsx";
import Step from "../components/Step/Step.tsx";

const Room = () => {
  const { id } = useParams();
  const [appbarHeight, setAppbarHeight] = useState<number | undefined>(0);
  const { loading, error, data } = useQuery(GET_ROOM_BY_ID, {
    variables: { id },
  });

  useEffect(() => {
    setAppbarHeight(document?.getElementById("appBar")?.clientHeight);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Box sx={[{
      display: "flex",
      flexDirection: "column",
      height: `calc(100dvh - ${appbarHeight}px)`,
    },
    ]}>
      {data?.getRoomById.steps.map((step: Step) => (
        <Step
          {...step}
        />
      ))}
    </Box>
  );
};

export default Room;
