import React from "react";
import TextField from "@mui/material/TextField";

interface TextboxProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password"; // Define type prop to indicate input type
}

const Textbox: React.FC<TextboxProps> = ({ label, value, onChange, type }) => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
    }}>
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        type={type} // Set input type
        value={value}
        onChange={onChange}
        style={{
          margin: "1vw",
          width: "200px", // Adjust width as needed
        }}
      />
    </div>
  );
};

export default Textbox;
