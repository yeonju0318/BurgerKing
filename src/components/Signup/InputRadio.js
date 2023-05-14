import React from "react";

function InputRadio({ options }) {
  return (
    <div className="pl-10">
      {options.map((option, index) => (
        <label className="mr-10" key={index}>
          <input type="checkbox" value={option} />
          {option}
        </label>
      ))}
    </div>
  );
}

export default InputRadio;
