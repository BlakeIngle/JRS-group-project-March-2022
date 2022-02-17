import React, { useState } from "react";
import "./toast.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faExclamationTriangle,
  faBan,
  faExclamation,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

export default function Toast({
  id,
  message,
  status,
  summary,
  sticky,
  removeToast,
}) {
  const [isLeaving, setIsLeaving] = useState(false);

  let icon = faExclamation;

  function handleXClicked() {
    setTimeout(() => {
      removeToast(id);
    }, 500);

    setIsLeaving(true);
  }

  if (!sticky) {
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }

  if (status === "success") {
    icon = faCheck;
  } else if (status === "info") {
    icon = faInfoCircle;
  } else if (status === "warn") {
    icon = faExclamationTriangle;
  } else if (status === "error") {
    icon = faBan;
  } else {
    status = "message";
  }

  return (
    <div
      className={`toast-root ${status} ${sticky && "sticky"} ${
        isLeaving && "slide-out"
      }`}
    >
      <FontAwesomeIcon className="icon" size="2x" icon={icon} />
      <div className="summary">{summary || status}</div>
      <div>{message || "..."}</div>
      <FontAwesomeIcon
        className="x-button"
        icon={faTimes}
        onClick={handleXClicked}
      />
    </div>
  );
}
