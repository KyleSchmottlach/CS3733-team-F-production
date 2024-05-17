import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

// Styles
const StyledDiv = styled('div')({
  display: "flex",
  justifyContent: "center",
  "& .MuiTextField-root": {
    margin: "1vw",
    width: "200px", // Adjust width as needed
  },
});

interface TextboxProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password"; // Define type prop to indicate input type
}

const Textbox: React.FC<TextboxProps> = ({ label, value, onChange, type }) => {
  return (
    <StyledDiv>
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        type={type} // Set input type
        value={value}
        onChange={onChange}
      />
    </StyledDiv>
  );
};

export default Textbox;
