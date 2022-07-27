import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Dispatch, FC, SetStateAction } from "react";

type LoggedInModalType = {
  isMember: Dispatch<SetStateAction<boolean>>;
};

const LoggedInModal: FC<LoggedInModalType> = ({ isMember }) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
    backgroundColor: "white",
  };

  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Account is created!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Go to the log in page
        </Typography>

        <Button
          variant="contained"
          color="warning"
          sx={{ mt: 2 }}
          onClick={() => {
            isMember(true);
          }}
        >
          Log in
        </Button>
      </Box>
    </Modal>
  );
};

export default LoggedInModal;
