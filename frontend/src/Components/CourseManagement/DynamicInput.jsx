import React, {useState, useRef, useEffect} from "react";

const DynamicInput = ({ defaultValue, onChange, className, maxLength }) => {
    const [value, setValue] = useState(defaultValue);
    const inputRef = useRef(null);
    const maxWidth = 600;
    useEffect(() => {
      if (inputRef.current) {
        let newWidth = Math.max(value.length, defaultValue.length) * 12;
        if (newWidth > maxWidth) {
          newWidth = maxWidth;
        }
        inputRef.current.style.width = `${newWidth}px`;
      }
    }, [value, defaultValue]);
  
    const handleChange = (e) => {
      setValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };
  
    return (
      <input 
        type="text"
        ref={inputRef}
        value={value}
        onChange={handleChange}
        className={className}
        maxLength={maxLength}
        autoFocus
      />
    );
  };

export default DynamicInput;