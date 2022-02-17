import React, { useState } from "react";

function useLog() {

  const [value, setValue] = useState("");

  return {
      value,

      update: (newValue) => {
        setValue(newValue);
      },
      print: () => {
          console.log(value);
      }
  };
}

export default useLog;
