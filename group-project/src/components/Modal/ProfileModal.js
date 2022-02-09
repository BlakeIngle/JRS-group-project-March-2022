import * as React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import './ProfileModal.css';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ProfileModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <EditIcon onClick={handleOpen} className="editIcon">Edit Profile</EditIcon>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text inside the modal
          </Typography>
          <TextField required id="firstName" label="First Name" />
          <TextField required id="lastName" label="Last Name" />
          <Button>Exit</Button>
          <Button>Save</Button>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Lorem ipsum or something like that :) :).
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
