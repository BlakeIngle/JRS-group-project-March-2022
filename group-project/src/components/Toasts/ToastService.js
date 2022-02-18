import React, { createContext, useContext, useState } from "react";
import Toast from "./Toast";
import "./ToastParent.css";

const ToastContext = createContext(null);
let id = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function removeToast(id) {
    setToasts(
      toasts.filter((t) => {
        return t.id != id;
      })
    );
  }

  return (
    <ToastContext.Provider value={{ toasts, setToasts }}>
      <ToastMessenger toasts={toasts} removeToast={removeToast} />
      {children}
    </ToastContext.Provider>
  );
}

export function useToasts() {
  const { toasts, setToasts } = useContext(ToastContext);

  function addToast(toast) {
    setToasts([...toasts, { id: id++, ...toast }]);
  }

  return {
    success: (message, summary) => {
      let status = "success";
      addToast({ message, summary, status, sticky: false });
    },
    error: (message, summary) => {
      let status = "error";
      addToast({ message, summary, status, sticky: false });
    },
    warn: (message, summary) => {
      let status = "warn";
      addToast({ message, summary, status, sticky: false });
    },
    info: (message, summary) => {
      let status = "info";
      addToast({ message, summary, status, sticky: false });
    },
    add: ({ message, summary, status, sticky, position }) => {
      if (!message) {
        return;
      }

      addToast({
        message,
        summary,
        status,
        sticky: true,
        position,
      });
    },
  };
}

export function ToastMessenger({ toasts, removeToast }) {
  return (
    <div className="toast-parent">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} removeToast={removeToast} />
      ))}
    </div>
  );
}
