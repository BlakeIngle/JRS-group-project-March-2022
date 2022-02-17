import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import React, { createContext, useContext, useState } from "react";

import "./confirmation.css";

const ConfirmationContext = createContext(null);

export function ConfirmationProvider({ children }) {
  const [contents, setContents] = useState(null);

  return (
    <ConfirmationContext.Provider value={{ contents, setContents }}>
      {children}
      {/* if this is truethy then use this component */}
      {contents && (
        <ConfirmationDialog {...contents} setContents={setContents} />
      )}
    </ConfirmationContext.Provider>
  );
}

export function useConfirmation() {
  let { contents, setContents } = useContext(ConfirmationContext);

  return {
    /**
     * Display a confirmation dialog to perform some action after the confirmation.
     * @param {confirmation} confirmation object to define the confirmation dialog contents
     */

    ask: ({
      question,
      leftButtonText,
      rightButtonText,
      onRightButtonClicked,
      onLeftButtonClicked,
    }) => {
      setContents({
        question,
        rightButtonText,
        leftButtonText,
        onRightButtonClicked,
        onLeftButtonClicked,
      });
    },
  };
}

export function ConfirmationDialog({
  setIsHidden,
  question,
  leftButtonText,
  rightButtonText,
  onRightButtonClicked,
  onLeftButtonClicked,
  setContents,
}) {
  function handleLeftClicked() {
    closeDialog();
    if (onLeftButtonClicked) {
      onLeftButtonClicked();
    }
  }
  function handleRightClicked() {
    closeDialog();
    if (onRightButtonClicked) {
      onRightButtonClicked();
    }
  }

  function closeDialog() {
    setContents(null);
  }

  return (
    <div className="confirm-dialog-parent">
      <div className="dialog">
        <h2>Are you sure?</h2>
        <div className="text">
          <span>{question}</span>
        </div>

        <FontAwesomeIcon
          icon={faTimes}
          onClick={closeDialog}
          className="x-button"
        />

        <div className="buttons">
          <button type="button" className="leftbutton" onClick={handleLeftClicked}>
            {leftButtonText || "No"}
          </button>
          <button type="button" className="rightbutton" onClick={handleRightClicked}>
            {rightButtonText || "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
}
