import React, { useState } from "react";

const SwitchButton = ({ isOn, setIsOn, disabled, inputName }) => {
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSwitch();
    }
  };

  return (
    <div
      role="switch"
      aria-checked={isOn ?? false}
      aria-labelledby={inputName ?? "switch"}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={toggleSwitch}
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 
        ${isOn ? "bg-green-500" : "bg-red-500"}`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? "translate-x-0" : "translate-x-6"
        }`}
      />
      <input type="hidden" name={inputName} value={isOn} />
    </div>
  );
};

export default SwitchButton;
