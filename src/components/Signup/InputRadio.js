import React from "react";

function InputRadio({ name, options }) {
  return (
    <div className="pl-10">
      {options.map((option, index) => (
        <label className="mr-10" key={index}>
          <input type="radio" name={name} value={option} />
          {option}
        </label>
      ))}
    </div>
  );
}

export default InputRadio;
