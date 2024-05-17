import React from "react";
import TextField from "@mui/material/TextField";

interface TextboxProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "number"; // Define type prop to indicate input type
}

export const CenterAlignedNumTextbox = (props: TextboxProps) => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
    }}>
      <TextField
        id="outlined-number"
        label={props.label}
        variant="outlined"
        type={props.type} // Set input type
        inputProps={{ min: 0 }}
        value={props.value}
        onChange={props.onChange}
        sx={{
          minWidth: "150px", // Adjust width as needed
          maxWidth: "220px",
          minHeight: "75px",
        }}
      />
    </div>
  );
};
