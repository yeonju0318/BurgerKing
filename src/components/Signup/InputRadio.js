import React from "react";

function InputRadio({ options, selectedOption, onChange }) {
  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    onChange(selectedOption);
  };

  return (
    <div className="pl-6">
      {options.map((option, index) => (
        <label className="mr-10" key={index}>
          <input
            type="radio"
            value={option}
            checked={option === selectedOption}
            onChange={handleOptionChange}
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export default InputRadio;
