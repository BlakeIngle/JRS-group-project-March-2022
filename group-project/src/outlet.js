import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { useConfirmation } from "./components/ConfirmDialog/ConfirmConfirmationService";
import { useToasts } from "./components/Toasts/ToastService";
import useLog from "./Hooks/LogHook";

export default function Outlet() {
  const navigate = useNavigate();
  const toast = useToasts();
  const log = useLog();
  var confirmation = useConfirmation();

  useEffect(() => {
    toast.info("The toast service is set up");
    log.update("i am doing it right");
    confirmation.ask({
      question: "Are you sure you want to change your password?",
      onLeftButtonClicked: () => {
        toast.info('You have been redirected back to the home page')
        navigate("/profile");
      },
    });
  }, []);

  useEffect(() => {
    log.print();
  }, [log.value]);

  return <div></div>;
}
