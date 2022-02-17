import { Button, Divider, TextField } from "@mui/material";
import React, { useState } from "react";
import Outlet from "../../outlet";
import { useApi } from "../../services/api.service";
import { ConfirmationProvider } from "../ConfirmDialog/ConfirmConfirmationService";
import { ToastProvider, useToasts } from "../Toasts/ToastService";

export default function ChangePasswordForm({ user, close }) {
  const http = useApi();
  const toast = useToasts()
  const [inputs, setInputs] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    //name property on input form
    let name = e.target.name;
    //value property on input form
    let value = e.target.value;

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputs.newPassword === inputs.confirmPassword) {
      // they match now
      // send a req to API - send current and new
      http
        .changePassword(user, inputs.currentPassword, inputs.newPassword)
        .then((results) => {
          //    on success -> give notification that password was updated
          // password changed
          toast.success('Password has been updated!')
          setInputs({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          close();
        })
        .catch((err) => {
          //    on fail -> give error notification
          console.error(err.response);
          toast.error('Password did not update!')
        });
    }
    if (inputs.newPassword !== inputs.confirmPassword) {
      toast.error('New Passwords do not match!')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="dropDownContent">
        <TextField
          type="text"
          name="currentPassword"
          value={inputs.currentPassword}
          onChange={handleChange}
          required
          sx={{ display: "flex", marginTop: "1rem" }}
          label="Current Password"
          variant="outlined"
        />
        <TextField
          type="text"
          name="newPassword"
          value={inputs.newPassword}
          onChange={handleChange}
          required
          sx={{ display: "flex", marginTop: "1rem" }}
          label="New Password"
          variant="outlined"
        />
        <TextField
          type="text"
          name="confirmPassword"
          value={inputs.confirmPassword}
          onChange={handleChange}
          required
          sx={{ display: "flex", marginTop: "1rem" }}
          label="Confirm New Password"
          variant="outlined"
        />
        <br />
        <Button variant="contained" type="submit">
          Save
        </Button>
        <Divider />
        <ToastProvider>
          <ConfirmationProvider>
            <Outlet />
          </ConfirmationProvider>
        </ToastProvider>
      </div>
    </form>
  );
}



